-- Casa de campo · esquema de Supabase
-- Pegalo completo en el SQL Editor de Supabase y ejecutalo una vez.

create extension if not exists btree_gist;

-- ───────── Ajustes (una sola fila) ─────────
create table public.settings (
  id int primary key default 1 check (id = 1),
  price_weekday int check (price_weekday >= 0),   -- lunes a jueves
  price_weekend int check (price_weekend >= 0),   -- viernes a domingo
  price_holiday int check (price_holiday >= 0),   -- feriados y fines de semana largos
  holidays date[] not null default '{}',          -- noches que se cobran como feriado
  deposit_percent int check (deposit_percent between 0 and 100),
  check_in_time text,
  check_out_time text,
  min_nights int not null default 1 check (min_nights >= 1),
  max_guests int check (max_guests >= 1),
  phone text,
  whatsapp text,
  description text
);
insert into public.settings (id) values (1);

-- ───────── Reservas ─────────
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (char_length(guest_name) between 2 and 120),
  guest_phone text not null check (char_length(guest_phone) between 6 and 40),
  guest_email text check (char_length(guest_email) <= 160),
  guests int not null check (guests >= 1),
  check_in date not null,
  check_out date not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'rejected', 'cancelled')),
  deposit_received boolean not null default false,
  notes text check (char_length(notes) <= 1000),
  source text not null default 'web' check (source in ('web', 'admin')),  -- 'admin' = cargada por teléfono
  total_estimate int,                                                      -- total calculado al pedir
  created_at timestamptz not null default now(),
  check (check_out > check_in)
);

-- Dos reservas vivas (pendientes o confirmadas) no pueden pisarse: lo garantiza la base.
alter table public.bookings add constraint bookings_no_overlap
  exclude using gist (daterange(check_in, check_out, '[)') with &&)
  where (status in ('pending', 'confirmed'));

-- ───────── Fechas bloqueadas (mantenimiento / uso personal) ─────────
create table public.blocked_dates (
  id uuid primary key default gen_random_uuid(),
  start_date date not null,
  end_date date not null,               -- inclusive
  reason text,
  check (end_date >= start_date)
);

-- ───────── Eventos locales (los feriados nacionales se traen de una API pública, no se guardan acá) ─────────
create table public.events (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  name text not null check (char_length(name) between 2 and 120),
  text text check (char_length(text) <= 300),
  created_at timestamptz not null default now()
);

-- ───────── Reglas al insertar una reserva ─────────
-- security definer: la persona que reserva no puede leer blocked_dates ni settings, pero el chequeo sí.
create function public.check_new_booking() returns trigger
language plpgsql security definer set search_path = public as $$
declare s public.settings;
begin
  if new.status in ('pending', 'confirmed') and exists (
    select 1 from public.blocked_dates b
    where daterange(b.start_date, b.end_date + 1, '[)') && daterange(new.check_in, new.check_out, '[)')
  ) then
    raise exception 'fechas_bloqueadas';
  end if;

  if new.source = 'web' then
    select * into s from public.settings where id = 1;
    if new.check_in < current_date then raise exception 'fecha_pasada'; end if;
    if (new.check_out - new.check_in) < s.min_nights then raise exception 'estadia_minima'; end if;
    if s.max_guests is not null and new.guests > s.max_guests then raise exception 'capacidad'; end if;
  end if;
  return new;
end $$;

create trigger bookings_check_new before insert on public.bookings
  for each row execute function public.check_new_booking();

-- ───────── Vista pública: solo fechas ocupadas, sin datos personales ─────────
-- Rangos [start, end): `end` es el día de salida (esa noche ya no está ocupada).
create view public.occupied_dates as
  select check_in as start_date, check_out as end_date
    from public.bookings where status in ('pending', 'confirmed')
  union all
  select start_date, end_date + 1 from public.blocked_dates;

-- ───────── Seguridad (RLS) ─────────
alter table public.settings enable row level security;
alter table public.bookings enable row level security;
alter table public.blocked_dates enable row level security;
alter table public.events enable row level security;

-- Público: leer ajustes (precios, horarios...) y las fechas ocupadas.
create policy "ajustes visibles" on public.settings for select to anon, authenticated using (true);
create policy "eventos visibles" on public.events for select to anon, authenticated using (true);
grant select on public.occupied_dates to anon, authenticated;

-- Público: solo puede INSERTAR reservas pendientes, web y sin seña recibida. No puede leer ninguna.
create policy "pedir reserva" on public.bookings for insert to anon
  with check (status = 'pending' and deposit_received = false and source = 'web');

-- Administrador (usuario autenticado): todo.
create policy "admin reservas" on public.bookings for all to authenticated using (true) with check (true);
create policy "admin bloqueos" on public.blocked_dates for all to authenticated using (true) with check (true);
create policy "admin ajustes" on public.settings for update to authenticated using (true) with check (true);
create policy "admin eventos" on public.events for all to authenticated using (true) with check (true);
