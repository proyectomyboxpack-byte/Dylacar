"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * VehiculosHero — reemplaza a Car3DWrapper en el hero.
 *
 * Requisitos:
 *   - /public/hero-moto.png        (PNG con fondo transparente)
 *   - /public/hero-camioneta.png   (PNG con fondo transparente)
 *
 * Se monta dentro del contenedor que ya existe en page.tsx:
 *   <div className="relative h-[280px] sm:h-[360px] lg:h-[420px]">
 *     <VehiculosHero />
 *   </div>
 */

export default function VehiculosHero() {
  const zonaRef = useRef<HTMLDivElement>(null);
  const sinMovimiento = useReducedMotion();

  // Posición del cursor normalizada de -0.5 a 0.5 dentro del contenedor
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Suavizado: sin esto el tilt se siente brusco
  const xSuave = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const ySuave = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  // Inclinación sutil. Más de 6 grados ya se ve a videojuego.
  const rotateY = useTransform(xSuave, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateX = useTransform(ySuave, [-0.5, 0.5], ["-4deg", "4deg"]);

  // La camioneta va detrás: se mueve menos para dar profundidad
  const rotateYFondo = useTransform(xSuave, [-0.5, 0.5], ["3deg", "-3deg"]);
  const desplazaFondo = useTransform(xSuave, [-0.5, 0.5], [16, -16]);

  function moverCursor(e: React.MouseEvent<HTMLDivElement>) {
    if (sinMovimiento) return;
    const caja = zonaRef.current?.getBoundingClientRect();
    if (!caja) return;
    x.set((e.clientX - caja.left) / caja.width - 0.5);
    y.set((e.clientY - caja.top) / caja.height - 0.5);
  }

  function salirCursor() {
    x.set(0);
    y.set(0);
  }

  // Flotación: el vehículo sube y baja mientras la sombra se encoge
  const flotarMoto = sinMovimiento
    ? {}
    : {
        y: [0, -12, 0],
        transition: {
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  const flotarCamioneta = sinMovimiento
    ? {}
    : {
        y: [0, -8, 0],
        transition: {
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
          delay: 0.8,
        },
      };

  const sombraPulso = sinMovimiento
    ? {}
    : {
        scaleX: [1, 0.88, 1],
        opacity: [0.6, 0.35, 0.6],
        transition: {
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <div
      ref={zonaRef}
      onMouseMove={moverCursor}
      onMouseLeave={salirCursor}
      className="relative h-full w-full"
      style={{ perspective: 1200 }}
    >
      {/* Resplandor amarillo detrás de los vehículos */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[420px]
                   -translate-x-1/2 -translate-y-1/2 rounded-full
                   bg-[var(--yellow)] opacity-[0.12] blur-[110px]"
      />

      {/* Camioneta: atrás, más chica, en segundo plano */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
        style={{ x: desplazaFondo }}
        className="absolute right-0 top-0 w-[70%]"
      >
        <motion.div animate={flotarCamioneta} style={{ rotateY: rotateYFondo }}>
          <Image
            src="/hero-camioneta.png"
            alt="Camioneta en servicio en DYLACAR"
            width={1600}
            height={900}
            sizes="(max-width: 1024px) 55vw, 400px"
            className="h-auto w-full opacity-70 drop-shadow-2xl"
          />
        </motion.div>
        <motion.div
          aria-hidden
          animate={sombraPulso}
          className="mx-auto h-4 w-[62%] -translate-y-2 rounded-[100%] bg-black/70 blur-xl"
        />
      </motion.div>

      {/* Moto: protagonista, al frente */}
      <motion.div
        initial={{ opacity: 0, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-[88%]"
      >
        <motion.div
          animate={flotarMoto}
          style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
        >
          <Image
            src="/hero-moto.png"
            alt="Motocicleta en servicio en DYLACAR"
            width={1600}
            height={900}
            sizes="(max-width: 1024px) 85vw, 560px"
            priority
            className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
          />
        </motion.div>
        <motion.div
          aria-hidden
          animate={sombraPulso}
          className="mx-auto h-6 w-[70%] -translate-y-3 rounded-[100%] bg-black/80 blur-2xl"
        />
      </motion.div>
    </div>
  );
}
