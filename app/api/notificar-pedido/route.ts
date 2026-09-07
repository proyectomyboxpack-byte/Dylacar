import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const CORREO_DESTINO = process.env.CORREO_PEDIDOS || "pedidos@dylacar.com";

type ItemPedido = {
  nombre: string;
  precio: number;
  cantidad: number;
};

export async function POST(req: NextRequest) {
  try {
    const { datos, items, total } = await req.json();

    const filas = (items as ItemPedido[])
      .map(
        (i) =>
          `<tr>
            <td style="padding:6px 10px;border-bottom:1px solid #333;">${i.nombre}</td>
            <td style="padding:6px 10px;border-bottom:1px solid #333;text-align:center;">${i.cantidad}</td>
            <td style="padding:6px 10px;border-bottom:1px solid #333;text-align:right;">$${i.precio.toLocaleString(
              "es-MX"
            )}</td>
          </tr>`
      )
      .join("");

    const html = `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;">
        <h2 style="color:#111;">Nuevo pedido en Dylacar</h2>
        <p><strong>Cliente:</strong> ${datos.nombre}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono}</p>
        <p><strong>Correo:</strong> ${datos.email}</p>
        <p><strong>Entrega:</strong> ${datos.direccion}</p>
        ${datos.notas ? `<p><strong>Notas:</strong> ${datos.notas}</p>` : ""}
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
          <thead>
            <tr>
              <th style="text-align:left;padding:6px 10px;">Producto</th>
              <th style="text-align:center;padding:6px 10px;">Cant.</th>
              <th style="text-align:right;padding:6px 10px;">Precio</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
        <p style="font-size:18px;margin-top:16px;"><strong>Total: $${total.toLocaleString(
          "es-MX"
        )}</strong></p>
      </div>
    `;

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Dylacar <pedidos@dylacar.com>",
        to: CORREO_DESTINO,
        subject: `Nuevo pedido de ${datos.nombre} — $${total.toLocaleString("es-MX")}`,
        html,
      });
    } else {
      // Mientras no haya API key de Resend configurada, solo lo dejamos
      // registrado en los logs del servidor para no bloquear al cliente.
      console.log("Pedido recibido (correo no configurado):", { datos, items, total });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error notificando pedido:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
