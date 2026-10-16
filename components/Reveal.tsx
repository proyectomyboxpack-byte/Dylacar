"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal — envuelve cualquier bloque y lo anima al entrar a cuadro.
 * Estilo Apple: sube un poco y aparece. Se dispara una sola vez.
 *
 * Uso:
 *   <Reveal><h2>...</h2></Reveal>
 *   <Reveal delay={0.1}>...</Reveal>
 *
 * Para escalonar hijos (que entren uno tras otro), envuelve el
 * contenedor en <Reveal stagger> y cada hijo en <RevealItem>.
 */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
}: RevealProps) {
  const sinMovimiento = useReducedMotion();

  if (sinMovimiento) {
    return <div className={className}>{children}</div>;
  }

  const contenedor: Variants = {
    oculto: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger ? 0.12 : 0,
      },
    },
  };

  const simple: Variants = {
    oculto: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  return (
    <motion.div
      className={className}
      variants={stagger ? contenedor : simple}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/** Hijo de un <Reveal stagger>. Entra escalonado tras sus hermanos. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const sinMovimiento = useReducedMotion();

  if (sinMovimiento) {
    return <div className={className}>{children}</div>;
  }

  const item: Variants = {
    oculto: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
