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

export default function Hero() {
  const zonaRef = useRef<HTMLDivElement>(null);
  const sinMovimiento = useReducedMotion();

  // Posición del cursor normalizada de -0.5 a 0.5 dentro del hero
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
  const desplazaFondo = useTransform(xSuave, [-0.5, 0.5], [18, -18]);

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
  const flotar = sinMovimiento
    ? {}
    : {
        y: [0, -14, 0],
        transition: {
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  const flotarFondo = sinMovimiento
    ? {}
    : {
        y: [0, -9, 0],
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
        opacity: [0.55, 0.32, 0.55],
        transition: {
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <section className="relative overflow-hidden bg-neutral-950">
      {/* Resplandor amarillo detrás de los vehículos */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/4 h-[500px] w-[700px] rounded-full bg-amber-400/15 blur-[120px]"
      />
      {/* Rejilla tenue de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]
                   [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]
                   [background-size:64px_64px]
                   [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div
        ref={zonaRef}
        onMouseMove={moverCursor}
        onMouseLeave={salirCursor}
        className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20
                   lg:grid-cols-[1fr_1.15fr] lg:gap-8 lg:py-28"
      >
        {/* ---------- Columna de texto ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 text-center lg:text-left"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/30
                       bg-amber-400/10 px-4 py-1.5 text-xs font-medium tracking-wide text-amber-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Autos y motos
          </span>

          <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Servicio automotriz{" "}
            <span className="text-amber-400">premium</span> y refaccionaria
          </h1>

          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-neutral-400 lg:text-lg">
            Mantenimiento, diagnóstico y refacciones con garantía. Atendemos
            automóviles y motocicletas con el mismo nivel de detalle.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#citas"
              className="rounded-xl bg-amber-400 px-7 py-3.5 text-center text-sm font-semibold text-neutral-950
                         transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2
                         focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              Agendar cita
            </a>
            <a
              href="#tienda"
              className="rounded-xl border border-white/15 px-7 py-3.5 text-center text-sm font-semibold text-white
                         transition hover:border-white/40 hover:bg-white/5 focus-visible:outline
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            >
              Ver refacciones
            </a>
          </div>
        </motion.div>

        {/* ---------- Columna de vehículos ---------- */}
        <div
          className="relative h-[280px] sm:h-[380px] lg:h-[520px]"
          style={{ perspective: 1200 }}
        >
          {/* Camioneta: atrás, más chica, ángulo más cerrado */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
            style={{ x: desplazaFondo }}
            className="absolute right-0 top-0 w-[72%] sm:w-[68%] lg:w-[64%]"
          >
            <motion.div animate={flotarFondo} style={{ rotateY: rotateYFondo }}>
              <Image
                src="/hero-camioneta.png"
                alt="Camioneta en servicio en DYLACAR"
                width={1600}
                height={900}
                sizes="(max-width: 1024px) 60vw, 460px"
                className="h-auto w-full opacity-75 drop-shadow-2xl"
              />
            </motion.div>
            <motion.div
              aria-hidden
              animate={sombraPulso}
              className="mx-auto h-5 w-[65%] -translate-y-3 rounded-[100%] bg-black/70 blur-xl"
            />
          </motion.div>

          {/* Moto: protagonista, al frente */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="absolute bottom-0 left-0 w-[86%] sm:w-[80%] lg:w-[78%]"
          >
            <motion.div
              animate={flotar}
              style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
            >
              <Image
                src="/hero-moto.png"
                alt="Motocicleta en servicio en DYLACAR"
                width={1600}
                height={900}
                sizes="(max-width: 1024px) 80vw, 620px"
                priority
                className="h-auto w-full drop-shadow-[0_35px_45px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
            <motion.div
              aria-hidden
              animate={sombraPulso}
              className="mx-auto h-7 w-[72%] -translate-y-4 rounded-[100%] bg-black/80 blur-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
