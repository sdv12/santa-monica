import { site } from "../../config/site";
import { formatLong, type ISO } from "./dates";
import { formatMoney, type Settings } from "./settings";

/**
 * Email de confirmación al huésped (no al admin, eso es notify.ts). Usa la API de Resend por
 * fetch directo, sin agregar dependencia nueva.
 *
 * ⚠️ Necesita RESEND_API_KEY en las variables de entorno; sin eso, no manda nada (no rompe la
 * reserva). Mientras no haya un dominio propio verificado en Resend, el remitente usa su dominio
 * de pruebas (onboarding@resend.dev), que igual entrega a cualquier casilla.
 */
export async function sendGuestConfirmation(booking: {
  guest_name: string;
  guest_email: string | null;
  check_in: ISO;
  check_out: ISO;
  total_estimate: number | null;
}, settings: Settings): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !booking.guest_email) return;

  const deposit = booking.total_estimate != null && settings.depositPercent != null ? Math.round((booking.total_estimate * settings.depositPercent) / 100) : null;
  const firstName = booking.guest_name.trim().split(" ")[0] || booking.guest_name.trim();

  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2b2b1f;">
      <p style="font-size: 18px;">¡Hola ${firstName}!</p>
      <p>Gracias por elegir hospedarte en <strong>${site.name}</strong>. Recibimos tu pedido y queda <strong>pendiente</strong>: las fechas quedan apartadas para vos hasta que te confirmemos por WhatsApp o teléfono.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 16px;">
        <tr><td style="padding: 8px 0; color: #6b6b55;">Llegada</td><td style="padding: 8px 0; text-align: right; font-weight: bold;">${formatLong(booking.check_in)}</td></tr>
        <tr><td style="padding: 8px 0; color: #6b6b55;">Salida</td><td style="padding: 8px 0; text-align: right; font-weight: bold;">${formatLong(booking.check_out)}</td></tr>
        ${booking.total_estimate != null ? `<tr><td style="padding: 8px 0; color: #6b6b55;">Total estimado</td><td style="padding: 8px 0; text-align: right; font-weight: bold;">${formatMoney(booking.total_estimate)}</td></tr>` : ""}
        ${deposit != null ? `<tr><td style="padding: 8px 0; color: #6b6b55;">Seña (${settings.depositPercent}%)</td><td style="padding: 8px 0; text-align: right; font-weight: bold;">${formatMoney(deposit)}</td></tr>` : ""}
      </table>
      <p>Cualquier consulta, escribinos por WhatsApp o llamanos al <strong>${site.phone}</strong>. ¡Te esperamos en ${site.name}!</p>
    </div>
  `.trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || `${site.name} <onboarding@resend.dev>`,
        to: [booking.guest_email],
        subject: `Tu pedido de reserva en ${site.name} — pendiente de confirmación`,
        html,
      }),
    });
    if (!res.ok) console.error("[sendGuestConfirmation]", res.status, await res.text());
  } catch (e) {
    console.error("[sendGuestConfirmation]", e);
  }
}
