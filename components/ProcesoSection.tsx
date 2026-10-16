"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";


const PASOS = [
  {
    titulo: "Agendas o pasas directo",
    texto:
      "Reservas tu hora en línea o llegas al taller. Con cita no haces fila.",
  },
  {
    titulo: "Revisamos el vehículo",
    texto:
      "Escáner y revisión física para saber qué tiene de verdad, no lo que parece desde afuera.",
  },
  {
    titulo: "Te pasamos el presupuesto",
    texto:
      "Por escrito y antes de empezar. Si en el camino aparece otra cosa, te hablamos antes de seguir.",
  },
  {
    titulo: "Autorizas y trabajamos",
    texto:
      "Nada se toca sin tu visto bueno. Te avisamos en cuanto esté listo.",
  },
];

export default function ProcesoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const sinMovimiento = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });

  const avance = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  });

  return (
    <section
      id="proceso"
      className="relative mx-auto max-w-[1280px] px-6 pb-[96px] lg:px-10 lg:pb-[120px]"
    >
      <h2 className="max-w-[640px] text-[38px] leading-[1.08] text-bone lg:text-[60px]">
        Cómo trabajamos.
      </h2>
      <p className="mt-[22px] max-w-[460px] text-[18px] font-extralight leading-[1.55] text-mist">
        Cuatro pasos, sin sorpresas en el camino.
      </p>

      <div ref={ref} className="relative mt-[56px] lg:mt-[72px]">
        {/* Riel: la línea tenue de fondo */}
        <div
          aria-hidden
          className="absolute left-[19px] top-[14px] bottom-[52px] w-px bg-white/12 lg:left-[27px]"
        />
        {/* Línea amarilla que se dibuja al bajar */}
        <motion.div
          aria-hidden
          style={
            sinMovimiento
              ? { scaleY: 1 }
              : { scaleY: avance, transformOrigin: "top" }
          }
          className="absolute left-[19px] top-[14px] bottom-[52px] w-px origin-top bg-amber lg:left-[27px]"
        />

        <ol className="relative">
          {PASOS.map((p, i) => (
            <Paso
              key={p.titulo}
              avance={avance}
              indice={i}
              total={PASOS.length}
              numero={i + 1}
              titulo={p.titulo}
              texto={p.texto}
              sinMovimiento={!!sinMovimiento}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Paso({
  avance,
  indice,
  total,
  numero,
  titulo,
  texto,
  sinMovimiento,
}: {
  avance: MotionValue<number>;
  indice: number;
  total: number;
  numero: number;
  titulo: string;
  texto: string;
  sinMovimiento: boolean;
}) {
  // El paso se enciende cuando la línea llega a su altura
  const punto = indice / total;
  const encendido = useTransform(avance, [punto, punto + 0.1], [0, 1]);

  return (
    <li className="relative flex gap-[20px] pb-[48px] last:pb-0 lg:gap-[32px] lg:pb-[64px]">
      {/* Número: apagado de base, encendido encima */}
      <div className="relative z-10 shrink-0">
        <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black text-[15px] text-ash lg:h-[55px] lg:w-[55px] lg:text-[17px]">
          {numero}
        </span>
        <motion.span
          aria-hidden
          style={sinMovimiento ? { opacity: 1 } : { opacity: encendido }}
          className="absolute inset-0 flex items-center justify-center rounded-full
                     bg-black text-[15px] text-amber ring-1 ring-amber/50
                     lg:text-[17px]"
        >
          {numero}
        </motion.span>
      </div>

      <div className="pt-[7px] lg:pt-[13px]">
        <h3 className="text-[23px] leading-[1.15] text-bone lg:text-[27px]">
          {titulo}
        </h3>
        <p className="mt-[10px] max-w-[460px] text-[17px] font-extralight leading-[1.55] text-mist">
          {texto}
        </p>
      </div>
    </li>
  );
}
