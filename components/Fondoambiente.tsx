"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * FondoAmbiente — capa decorativa fija detrás de todo el sitio.
 * Dos piezas:
 *   1. Un resplandor amarillo que se desplaza despacio con el scroll.
 *   2. Un campo de partículas finas flotando, muy tenue.
 *
 * Va una sola vez, al nivel del layout, detrás del contenido:
 *   <body>
 *     <FondoAmbiente />
 *     <main>...</main>
 *   </body>
 *
 * Es position:fixed y pointer-events:none, así que no estorba clics
 * ni se repite por sección.
 */

const PARTICULAS = Array.from({ length: 28 }, (_, i) => {
  // Valores deterministas: así el servidor y el cliente pintan igual
  const seed = (i * 97) % 100;
  const seed2 = (i * 53) % 100;
  return {
    left: `${seed}%`,
    top: `${seed2}%`,
    size: 1 + (i % 3),
    duration: 9 + (i % 7),
    delay: (i % 5) * 0.8,
    amber: i % 4 === 0, // una de cada cuatro es amarilla, el resto gris
  };
});

export default function FondoAmbiente() {
  const ref = useRef<HTMLDivElement>(null);
  const sinMovimiento = useReducedMotion();

  const { scrollYProgress } = useScroll();
  // El resplandor baja conforme avanzas por la página
  const glowY = useTransform(scrollYProgress, [0, 1], ["-10%", "80%"]);
  const glowX = useTransform(scrollYProgress, [0, 0.5, 1], ["60%", "30%", "55%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void"
    >
      {/* Resplandor amarillo que sigue el scroll */}
      <motion.div
        style={sinMovimiento ? { top: "20%", left: "50%" } : { top: glowY, left: glowX }}
        className="absolute h-[520px] w-[620px] -translate-x-1/2 rounded-full
                   bg-amber opacity-[0.08] blur-[130px]"
      />

      {/* Partículas finas flotando */}
      {!sinMovimiento &&
        PARTICULAS.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.amber ? "var(--color-amber)" : "var(--color-steel)",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, p.amber ? 0.5 : 0.25, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}
