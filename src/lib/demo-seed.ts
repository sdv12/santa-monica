import type { Booking } from "./data";

/**
 * Datos de ejemplo para el modo demo (ALLOW_DEMO_ADMIN=1, sin Supabase).
 *
 * En Netlify (y cualquier hosting "serverless"), el disco del servidor no es confiable entre
 * pedidos: lo que se escribe en un pedido puede no estar en el siguiente. Por eso esto NO es un
 * archivo de datos (que además quedaría fuera del control de versiones): son 3 reservas de
 * ejemplo, escritas como código normal, que solo aparecen cuando no hay ningún dato real guardado
 * todavía — así quien prueba el panel puede ver cómo se ve con reservas cargadas. En cuanto se
 * guarde una reserva real (si el hosting lo permite) o se conecte Supabase, esto deja de usarse.
 *
 * ⚠️ MOCK: nombres, teléfonos y montos inventados.
 */
export const DEMO_BOOKINGS: Booking[] = [
  {
    id: "demo-1",
    guest_name: "Lucía Fernández",
    guest_phone: "3511234567",
    guest_email: null,
    guests: 4,
    check_in: "2026-10-18",
    check_out: "2026-10-21",
    status: "pending",
    deposit_received: false,
    notes: "Vamos con un perro chico, ¿hay problema?",
    source: "web",
    total_estimate: 255_000,
    created_at: "2026-10-05T14:30:00.000Z",
  },
  {
    id: "demo-2",
    guest_name: "Martín Giménez",
    guest_phone: "3515551212",
    guest_email: null,
    guests: 6,
    check_in: "2026-11-06",
    check_out: "2026-11-09",
    status: "confirmed",
    deposit_received: true,
    notes: null,
    source: "admin",
    total_estimate: 285_000,
    created_at: "2026-10-02T11:00:00.000Z",
  },
  {
    id: "demo-3",
    guest_name: "Valentina Rossi",
    guest_phone: "3519876543",
    guest_email: "valen.rossi@example.com",
    guests: 2,
    check_in: "2026-10-30",
    check_out: "2026-11-02",
    status: "confirmed",
    deposit_received: false,
    notes: null,
    source: "web",
    total_estimate: 240_000,
    created_at: "2026-10-07T09:15:00.000Z",
  },
];
