"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref}>
      {display.toLocaleString("es-MX")}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 10, suffix: "+", label: "Años de experiencia" },
  { value: 3200, suffix: "+", label: "Autos atendidos" },
  { value: 80, suffix: "+", label: "Refacciones en catálogo" },
  { value: 98, suffix: "%", label: "Clientes que regresan" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-card)]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-16 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center sm:text-left"
          >
            <p className="font-display text-4xl font-bold text-[var(--yellow)] sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
