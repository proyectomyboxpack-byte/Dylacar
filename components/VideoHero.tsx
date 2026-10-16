"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
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

export default function VideoHero() {
  const seccionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sinMovimiento = useReducedMotion();
  const [duracion, setDuracion] = useState(0);

  const { scrollYProgress } = useScroll({
    target: seccionRef,
    offset: ["start start", "end end"],
  });

  // Suavizado: sin esto el video da tirones al mover la rueda del mouse.
  const avance = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 42,
    mass: 0.32,
    restDelta: 0.0008,
  });

  // iOS no deja buscar dentro del video hasta que se reproduce una vez.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    const prender = () => {
      v.play()
        .then(() => v.pause())
        .catch(() => {
          /* el navegador lo bloqueó: el scrub igual suele funcionar */
        });
    };
    if (v.readyState >= 1) prender();
    else v.addEventListener("loadedmetadata", prender, { once: true });
  }, []);

  // El corazón del efecto: la posición del scroll fija el cuadro del video.
  useMotionValueEvent(avance, "change", (p) => {
    const v = videoRef.current;
    if (!v || !duracion || sinMovimiento) return;
    const t = Math.max(0, Math.min(duracion - 0.04, p * duracion));
    if (Math.abs(v.currentTime - t) > 0.012) v.currentTime = t;
  });

  // Sin movimiento: hero normal de una pantalla, sin fijar ni animar.
  if (sinMovimiento) {
    return (
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <img
          src="/hero-poster.jpg"
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-10 h-[60%] bg-gradient-to-t from-black via-black/60 to-transparent"
        />
        <div className="relative z-20 mx-auto w-full max-w-[1280px] px-6 pb-[88px] lg:px-10">
          <h1 className="max-w-[620px] text-[40px] leading-[1.04] text-bone sm:text-[56px] lg:text-[68px]">
            {MENSAJES[0].titulo}
          </h1>
          <p className="mt-[20px] max-w-[440px] text-[18px] font-extralight leading-[1.55] text-mist">
            {MENSAJES[0].texto}
          </p>
          <div className="mt-[32px] flex flex-wrap items-center gap-[28px]">
            <Link href="/citas" className="btn-primary">
              Agendar servicio
            </Link>
            <Link href="/tienda" className="btn-ghost">
              Ver refacciones
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    // Alta: esta altura es el "riel" por el que corre el video.
    // 300vh ≈ tres pantallas de scroll para los 6 segundos de clip.
    <section ref={seccionRef} className="relative h-[300vh]">
      {/* La pantalla que se queda fija mientras recorres el riel */}
      <div className="sticky top-0 isolate flex h-[100svh] items-end overflow-hidden">
        {/* ---------- Capa 0: video ---------- */}
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          onLoadedMetadata={(e) => setDuracion(e.currentTarget.duration || 0)}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* ---------- Capa 10: sombra para leer el texto ---------- */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-10 h-[64%]
                     bg-gradient-to-t from-black via-black/60 to-transparent"
        />

        {/* ---------- Capa 20: los mensajes que se relevan ---------- */}
        <div className="relative z-20 mx-auto w-full max-w-[1280px] px-6 pb-[88px] lg:px-10 lg:pb-[104px]">
          {/* Caja de altura fija: los mensajes se enciman sin saltar */}
          <div className="relative h-[230px] sm:h-[250px] lg:h-[270px]">
            {MENSAJES.map((m, i) => (
              <Mensaje
                key={m.titulo}
                avance={avance}
                indice={i}
                total={MENSAJES.length}
                titulo={m.titulo}
                texto={m.texto}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-[28px]">
            <Link href="/citas" className="btn-primary">
              Agendar servicio
            </Link>
            <Link href="/tienda" className="btn-ghost">
              Ver refacciones
            </Link>
          </div>

          {/* Dónde vas en la secuencia */}
          <div className="mt-[40px] flex gap-[8px]">
            {MENSAJES.map((m, i) => (
              <Marca
                key={m.titulo}
                avance={avance}
                indice={i}
                total={MENSAJES.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Un mensaje que entra y sale según el tramo de scroll que le toca. */
function Mensaje({
  avance,
  indice,
  total,
  titulo,
  texto,
}: {
  avance: MotionValue<number>;
  indice: number;
  total: number;
  titulo: string;
  texto: string;
}) {
  const paso = 1 / total;
  const inicio = indice * paso;
  const fin = inicio + paso;
  const ultimo = indice === total - 1;

  const opacity = useTransform(
    avance,
    ultimo
      ? [inicio, inicio + paso * 0.3, 1]
      : [inicio, inicio + paso * 0.3, fin - paso * 0.3, fin],
    ultimo ? [0, 1, 1] : [0, 1, 1, 0]
  );

  const y = useTransform(
    avance,
    [inicio, inicio + paso * 0.45],
    [34, 0]
  );

  const blur = useTransform(
    avance,
    [inicio, inicio + paso * 0.3],
    ["blur(7px)", "blur(0px)"]
  );

  return (
    <motion.div
      style={{ opacity, y, filter: blur }}
      className="absolute inset-x-0 top-0"
    >
      <h1 className="max-w-[660px] text-[36px] leading-[1.06] text-bone sm:text-[52px] lg:text-[68px]">
        {titulo}
      </h1>
      <p className="mt-[18px] max-w-[440px] text-[17px] font-extralight leading-[1.55] text-mist sm:text-[18px]">
        {texto}
      </p>
    </motion.div>
  );
}

/** Marca de posición: se llena de amarillo conforme avanzas su tramo. */
function Marca({
  avance,
  indice,
  total,
}: {
  avance: MotionValue<number>;
  indice: number;
  total: number;
}) {
  const paso = 1 / total;
  const inicio = indice * paso;
  const scaleX = useTransform(avance, [inicio, inicio + paso], [0, 1]);

  return (
    <div className="h-[2px] w-[44px] overflow-hidden bg-white/20">
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="h-full w-full bg-amber"
      />
    </div>
  );
}
