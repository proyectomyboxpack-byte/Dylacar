"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function TiltCard({
  icon,
  titulo,
  descripcion,
}: {
  icon: ReactNode;
  titulo: string;
  descripcion: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(700px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) scale3d(1.02,1.02,1.02)`
    );
  }

  function handleMouseLeave() {
    setTransform("perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className="bg-[var(--bg-card)] p-6 will-change-transform"
    >
      {icon}
      <h3 className="mt-4 font-medium">{titulo}</h3>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{descripcion}</p>
    </motion.div>
  );
}
