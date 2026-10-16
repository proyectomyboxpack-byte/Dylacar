"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * VideoHero — hero con video de fondo (opción B).
 *
 * Requisitos en /public:
 *   - /hero.mp4       (clip corto, en bucle, sin sonido — ver notas)
 *   - /hero-poster.jpg (primer cuadro, se muestra mientras carga el video)
 *
 * El video:
 *   - arranca solo, en silencio y en bucle (requisito para autoplay móvil)
 *   - lleva un velo oscuro encima para que el texto siempre se lea
 *   - hace un parallax suave: se aleja un poco al hacer scroll
 *   - si el usuario pidió menos movimiento, se queda el poster fijo
 *
 * Reemplaza a <VehiculosHero /> dentro del hero en page.tsx, o puedes
 * usar este como sección completa de ancho total.
 */

export default function VideoHero() {
  const ref = useRef<HTMLDivElement>(null);
  const sinMovimiento = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: el video se escala y sube levemente al hacer scroll
  const escala = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacidadTexto = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[88vh] items-center overflow-hidden"
    >
      {/* Capa de video */}
      <motion.div
        style={sinMovimiento ? undefined : { scale: escala, y }}
        className="absolute inset-0 -z-10"
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          preload="metadata"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Velo oscuro: degradado para que el texto se lea siempre */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10
                   bg-gradient-to-r from-black via-black/80 to-black/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-transparent to-black/40"
      />

      {/* Contenido */}
      <motion.div
        style={sinMovimiento ? undefined : { opacity: opacidadTexto }}
        className="mx-auto w-full max-w-[1280px] px-6 py-[96px] lg:px-10"
      >
        <div className="max-w-[720px]">
          <p className="eyebrow">Servicio automotriz · Refaccionaria</p>

          <h1 className="mt-[24px] text-[48px] leading-[1.05] text-bone sm:text-[78px] lg:text-[96px] xl:text-[113px]">
            Tu auto, en manos que saben.
          </h1>

          <p className="mt-[30px] max-w-[480px] text-[18px] font-extralight leading-[1.5] text-mist">
            Servicio honesto y refacciones originales, sin sorpresas en la
            cuenta ni tiempos de espera eternos. Autos y motos, con el mismo
            nivel de detalle.
          </p>

          <div className="mt-[36px] flex flex-wrap items-center gap-[30px]">
            <Link href="/tienda" className="btn-primary">
              Ver refacciones <ArrowRight size={15} />
            </Link>
            <Link href="/citas" className="btn-ghost">
              Agendar servicio
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
