"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Testimonios de ejemplo — reemplazar con reseñas reales de clientes de Dylacar.
const testimonios = [
  {
    nombre: "Laura M.",
    texto:
      "Llevé mi auto por un ruido raro en los frenos y me explicaron todo antes de cobrar. Quedó como nuevo y el precio fue justo.",
    estrellas: 5,
  },
  {
    nombre: "Jorge R.",
    texto:
      "Compré unas balatas en la tienda en línea y me llegaron rápido. Buena atención por WhatsApp cuando tuve dudas.",
    estrellas: 5,
  },
  {
    nombre: "Ana P.",
    texto:
      "Ya es el taller de confianza de toda la familia. Siempre honestos con lo que realmente necesita el carro.",
    estrellas: 5,
  },
];

export default function TestimoniosSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="mb-14 max-w-lg">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Lo que dicen nuestros clientes
        </h2>
        <p className="mt-3 text-[var(--text-muted)]">
          Gente real que ya confió en nosotros para su auto.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {testimonios.map((t, i) => (
          <motion.div
            key={t.nombre}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded border border-[var(--border)] bg-[var(--bg-card)] p-6"
          >
            <div className="flex gap-1">
              {Array.from({ length: t.estrellas }).map((_, idx) => (
                <Star key={idx} size={14} className="fill-[var(--yellow)] text-[var(--yellow)]" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              &ldquo;{t.texto}&rdquo;
            </p>
            <p className="mt-4 text-sm font-medium">{t.nombre}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
