"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";


export default function VideoHero() {
  const ref = useRef<HTMLDivElement>(null);
  const sinMovimiento = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: el video se queda atrás al hacer scroll
  const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacidadTexto = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // Secuencia de entrada: el texto llega después de que el video aparece
  const grupo: Variants = {
    oculto: {},
    visible: { transition: { delayChildren: 0.45, staggerChildren: 0.11 } },
  };

  const pieza: Variants = {
    oculto: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* ---------- Capa 0: video ---------- */}
      <motion.div
        style={sinMovimiento ? undefined : { y: yVideo }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={
            sinMovimiento
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: [1.04, 1.1] }
          }
          transition={
            sinMovimiento
              ? { duration: 0.4 }
              : {
                  opacity: { duration: 1.6, ease: "easeOut" },
                  scale: {
                    duration: 28,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }
          }
        >
          <video
            className="h-full w-full object-cover
                       [filter:brightness(1.5)_contrast(1.06)_saturate(1.12)]"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.jpg"
            preload="auto"
          >
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>

      {/* ---------- Capa 10: solo la sombra necesaria para leer ---------- */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-[62%]
                   bg-gradient-to-t from-black via-black/55 to-transparent"
      />

      {/* ---------- Capa 20: contenido ---------- */}
      <motion.div
        style={sinMovimiento ? undefined : { opacity: opacidadTexto }}
        className="relative z-20 mx-auto w-full max-w-[1280px] px-6 pb-[88px] lg:px-10 lg:pb-[112px]"
      >
        <motion.div
          variants={grupo}
          initial="oculto"
          animate="visible"
          className="max-w-[620px]"
        >
          <motion.h1
            variants={pieza}
            className="text-[40px] leading-[1.04] text-bone sm:text-[56px] lg:text-[72px]"
          >
            El taller al que vuelves.
          </motion.h1>

          <motion.p
            variants={pieza}
            className="mt-[22px] max-w-[460px] text-[18px] font-extralight leading-[1.55] text-mist"
          >
            Autos y motos. Diagnóstico claro, refacciones originales y un
            precio que te decimos antes de empezar.
          </motion.p>

          <motion.div
            variants={pieza}
            className="mt-[34px] flex flex-wrap items-center gap-[28px]"
          >
            <Link href="/citas" className="btn-primary">
              Agendar servicio
            </Link>
            <Link href="/tienda" className="btn-ghost">
              Ver refacciones
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---------- Aviso de scroll ---------- */}
      {!sinMovimiento && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.9 }}
          className="absolute bottom-[34px] left-1/2 z-20 hidden -translate-x-1/2 lg:block"
        >
          <div className="relative h-[46px] w-px overflow-hidden bg-white/18">
            <motion.div
              className="absolute inset-x-0 h-[16px] bg-amber"
              animate={{ y: [-18, 46] }}
              transition={{
                duration: 2.1,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.5,
              }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
