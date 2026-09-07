import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const CORREO_DESTINO = process.env.CORREO_PEDIDOS || "pedidos@dylacar.com";

export async function POST(req: NextRequest) {
  try {
    const datos = await req.json();

    const html = `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;">
        <h2 style="color:#111;">Nueva solicitud de cita — Dylacar</h2>
        <p><strong>Cliente:</strong> ${datos.nombre}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono}</p>
        <p><strong>Servicio:</strong> ${datos.servicio}</p>
        <p><strong>Fecha solicitada:</strong> ${datos.fecha} — ${datos.hora}</p>
        ${datos.notas ? `<p><strong>Notas:</strong> ${datos.notas}</p>` : ""}
      </div>
    `;

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Dylacar <pedidos@dylacar.com>",
        to: CORREO_DESTINO,
        subject: `Nueva cita: ${datos.nombre} — ${datos.fecha} ${datos.hora}`,
        html,
      });
    } else {
      console.log("Cita recibida (correo no configurado):", datos);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error notificando cita:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
