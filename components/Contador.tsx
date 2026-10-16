"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function Contador({
  valor,
  sufijo = "",
  prefijo = "",
  duracion = 1400,
}: {
  valor: number;
  sufijo?: string;
  prefijo?: string;
  duracion?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const sinMovimiento = useReducedMotion();
  const [n, setN] = useState(0);
  const yaCorrio = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const arrancar = () => {
      if (yaCorrio.current) return;
      yaCorrio.current = true;

      if (sinMovimiento) {
        setN(valor);
        return;
      }

      const inicio = performance.now();
      const tick = (ahora: number) => {
        const t = Math.min((ahora - inicio) / duracion, 1);
        // easeOutExpo: arranca rápido y frena suave
        const suave = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setN(Math.round(suave * valor));
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    // ¿Ya está visible desde que carga la página?
    const caja = el.getBoundingClientRect();
    const alto = window.innerHeight || document.documentElement.clientHeight;
    if (caja.top < alto && caja.bottom > 0) {
      arrancar();
      return () => cancelAnimationFrame(rafRef.current);
    }

    // Navegador sin IntersectionObserver: mostramos el número y ya.
    if (typeof IntersectionObserver === "undefined") {
      arrancar();
      return () => cancelAnimationFrame(rafRef.current);
    }

    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          arrancar();
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [valor, duracion, sinMovimiento]);

  return (
    <span ref={ref}>
      {prefijo}
      {n}
      {sufijo}
    </span>
  );
}
