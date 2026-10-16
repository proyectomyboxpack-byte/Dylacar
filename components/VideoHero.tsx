"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";


const MENSAJES = [
  {
    titulo: "El taller al que vuelves.",
    texto: "Autos y motos, atendidos por gente que lleva años en el oficio.",
  },
  {
    titulo: "El precio, antes de empezar.",
    texto: "Revisamos, te explicamos qué tiene y cuánto cuesta. Tú decides.",
  },
  {
    titulo: "Las refacciones, aquí mismo.",
    texto: "Y si no la tenemos, te decimos en cuánto la conseguimos.",
  },
];

const DURACION = 5500; // ms que dura cada mensaje en pantalla

export default function VideoHero() {
  const seccionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sinMovimiento = useReducedMotion();
  const [activo, setActivo] = useState(0);
  const [pausado, setPausado] = useState(false);

  // Parallax suave: el video se queda un poco atrás al bajar
  const { scrollYProgress } = useScroll({
    target: seccionRef,
    offset: ["start start", "end start"],
  });
  const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const opacidadTexto = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Relevo automático. Sigue corriendo aunque el sistema pida menos
  // movimiento: ahí sólo quitamos el desenfoque y el desplazamiento.
  useEffect(() => {
    if (pausado) return;
    const t = setTimeout(
      () => setActivo((i) => (i + 1) % MENSAJES.length),
      DURACION
    );
    return () => clearTimeout(t);
  }, [activo, pausado]);

  // No gastar batería con la pestaña en segundo plano
  useEffect(() => {
    const alCambiar = () => {
      const v = videoRef.current;
      setPausado(document.hidden);
      if (!v) return;
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", alCambiar);
    return () => document.removeEventListener("visibilitychange", alCambiar);
  }, []);

  const irA = useCallback((i: number) => setActivo(i), []);

  // Sólo el mouse pausa. En táctil nunca llega el "salió el puntero".
  const entroPuntero = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setPausado(true);
  }, []);
  const salioPuntero = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setPausado(false);
  }, []);

  const mensaje = MENSAJES[activo];

  return (
    <section
      ref={seccionRef}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* ---------- Capa 0: video, fluido y en bucle ---------- */}
      <motion.div
        style={sinMovimiento ? undefined : { y: yVideo }}
        className="absolute inset-0 z-0"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ---------- Capa 10: sombra para leer el texto ---------- */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-[64%]
                   bg-gradient-to-t from-black via-black/60 to-transparent"
      />

      {/* ---------- Capa 20: contenido ---------- */}
      <motion.div
        style={sinMovimiento ? undefined : { opacity: opacidadTexto }}
        className="relative z-20 mx-auto w-full max-w-[1280px] px-6 pb-[80px] lg:px-10 lg:pb-[100px]"
      >
        {/* Caja de altura fija: los mensajes se enciman sin empujar nada */}
        <div
          className="relative h-[210px] sm:h-[235px] lg:h-[255px]"
          onPointerEnter={entroPuntero}
          onPointerLeave={salioPuntero}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={activo}
              initial={
                sinMovimiento
                  ? { opacity: 0 }
                  : { opacity: 0, y: 26, filter: "blur(6px)" }
              }
              animate={
                sinMovimiento
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              exit={
                sinMovimiento
                  ? { opacity: 0 }
                  : { opacity: 0, y: -16, filter: "blur(6px)" }
              }
              transition={{
                duration: sinMovimiento ? 0.25 : 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-x-0 top-0"
            >
              <h1 className="max-w-[660px] text-[36px] leading-[1.06] text-bone sm:text-[52px] lg:text-[66px]">
                {mensaje.titulo}
              </h1>
              <p className="mt-[18px] max-w-[440px] text-[17px] font-extralight leading-[1.55] text-mist sm:text-[18px]">
                {mensaje.texto}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap items-center gap-[28px]">
          <Link href="/citas" className="btn-primary">
            Agendar servicio
          </Link>
          <Link href="/tienda" className="btn-ghost">
            Ver refacciones
          </Link>
        </div>

        {/* Marcas: temporizador y además botones para saltar */}
        <div className="mt-[38px] flex gap-[10px]">
          {MENSAJES.map((m, i) => (
            <button
              key={m.titulo}
              type="button"
              onClick={() => irA(i)}
              aria-label={`Ver: ${m.titulo}`}
              className="group py-[10px] focus-visible:outline-none"
            >
              <span className="block h-[2px] w-[46px] overflow-hidden bg-white/20 transition-colors group-hover:bg-white/35 group-focus-visible:bg-white/50">
                <motion.span
                  key={`${i}-${activo}-${pausado}`}
                  className="block h-full w-full origin-left bg-amber"
                  initial={{ scaleX: i < activo ? 1 : 0 }}
                  animate={{ scaleX: i <= activo ? 1 : 0 }}
                  transition={{
                    duration:
                      i === activo && !pausado && !sinMovimiento
                        ? DURACION / 1000
                        : 0.35,
                    ease:
                      i === activo && !pausado && !sinMovimiento
                        ? "linear"
                        : "easeOut",
                  }}
                />
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
