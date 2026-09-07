"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Preguntas de ejemplo — ajustar con las políticas reales de Dylacar.
const preguntas = [
  {
    pregunta: "¿Cuánto tiempo tardan en entregar una refacción comprada en línea?",
    respuesta:
      "Depende de la zona, pero normalmente de 1 a 3 días hábiles. Si prefieres, también puedes recoger tu pedido directo en el taller sin costo de envío.",
  },
  {
    pregunta: "¿Las refacciones tienen garantía?",
    respuesta:
      "Sí, todas nuestras piezas cuentan con garantía. El tiempo varía según el tipo de producto — te lo confirmamos al momento de tu compra.",
  },
  {
    pregunta: "¿Qué formas de pago aceptan?",
    respuesta:
      "Aceptamos pago en línea con tarjeta a través de la tienda, y en el taller también manejamos efectivo y transferencia.",
  },
  {
    pregunta: "¿Necesito cita para el servicio de taller?",
    respuesta:
      "Se recomienda agendar cita para asegurar tu espacio, pero también atendemos sobre la marcha según disponibilidad.",
  },
  {
    pregunta: "¿Atienden todas las marcas de auto?",
    respuesta:
      "Sí, damos servicio general a la mayoría de marcas y modelos. Si tienes dudas sobre tu auto en particular, escríbenos por WhatsApp.",
  },
];

export default function FaqSection() {
  const [abierto, setAbierto] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <div className="mb-10">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Preguntas frecuentes
        </h2>
      </div>

      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {preguntas.map((item, i) => {
          const isOpen = abierto === i;
          return (
            <div key={item.pregunta}>
              <button
                onClick={() => setAbierto(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-medium">{item.pregunta}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[var(--yellow)] transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="pb-5 text-sm leading-relaxed text-[var(--text-muted)]">
                  {item.respuesta}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
