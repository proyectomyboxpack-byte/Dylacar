"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";



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
  const enVista = useInView(ref, { once: true, margin: "-60px" });
  const sinMovimiento = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!enVista) return;
    if (sinMovimiento) {
      setN(valor);
      return;
    }

    let raf = 0;
    const inicio = performance.now();

    const tick = (ahora: number) => {
      const t = Math.min((ahora - inicio) / duracion, 1);
      // easeOutExpo: arranca rápido y frena suave
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setN(Math.round(eased * valor));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enVista, valor, duracion, sinMovimiento]);

  return (
    <span ref={ref}>
      {prefijo}
      {n}
      {sufijo}
    </span>
  );
}
