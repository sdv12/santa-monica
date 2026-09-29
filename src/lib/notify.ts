import type { NewBooking } from "./data";

/**
 * Hook: se llama cada vez que entra un pedido de reserva nuevo.
 * Sin proveedor todavía: acá se conecta un aviso al admin (WhatsApp Cloud API, Resend, etc.).
 */
export async function notifyAdmin(booking: NewBooking): Promise<void> {
  void booking;
}
