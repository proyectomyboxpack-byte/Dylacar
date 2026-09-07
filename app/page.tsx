import Link from "next/link";
import { Wrench, Disc3, BatteryCharging, Gauge, ArrowRight } from "lucide-react";
import Car3DWrapper from "@/components/Car3DWrapper";
import StatsSection from "@/components/StatsSection";
import TiltCard from "@/components/TiltCard";
import ParallaxHero from "@/components/ParallaxHero";
import TestimoniosSection from "@/components/TestimoniosSection";
import FaqSection from "@/components/FaqSection";

const servicios = [
  {
    icon: Wrench,
    titulo: "Mantenimiento general",
    descripcion:
      "Afinación, cambio de aceite y revisión completa para mantener tu auto en su mejor condición.",
  },
  {
    icon: Disc3,
    titulo: "Frenos y suspensión",
    descripcion:
      "Cambio de balatas, discos y componentes de suspensión con piezas de calidad garantizada.",
  },
  {
    icon: BatteryCharging,
    titulo: "Sistema eléctrico",
    descripcion:
      "Diagnóstico y reparación eléctrica, baterías, alternadores y arneses.",
  },
  {
    icon: Gauge,
    titulo: "Diagnóstico computarizado",
    descripcion:
      "Escaneo de fallas con equipo especializado para identificar el problema real, sin adivinar.",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero con auto 3D */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <ParallaxHero />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-sm font-medium text-[var(--yellow)]">
              Servicio automotriz premium · Refaccionaria
            </p>
            <h1 className="font-display max-w-2xl text-5xl font-bold leading-[1.05] sm:text-6xl">
              Tu auto, en manos de gente que sabe lo que hace.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-[var(--text-muted)]">
              Servicio automotriz honesto y refacciones originales, sin sorpresas
              en la cuenta ni tiempos de espera eternos.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/tienda"
                className="inline-flex items-center gap-2 rounded bg-[var(--yellow)] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[var(--yellow-dim)]"
              >
                Ver refacciones <ArrowRight size={16} />
              </Link>
              <Link
                href="/citas"
                className="inline-flex items-center gap-2 rounded border border-[var(--border)] px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--yellow)]"
              >
                Agendar servicio
              </Link>
            </div>
          </div>

          <div className="relative h-[280px] sm:h-[360px] lg:h-[420px]">
            <Car3DWrapper />
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <StatsSection />

      {/* Servicios */}
      <section id="servicios" className="mx-auto max-w-6xl px-5 py-24">
        <div className="mb-14 max-w-lg">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Lo que hacemos en el taller
          </h2>
          <p className="mt-3 text-[var(--text-muted)]">
            Cuatro áreas donde resolvemos la mayoría de lo que tu auto necesita.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded border border-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((s) => {
            const Icon = s.icon;
            return (
              <TiltCard
                key={s.titulo}
                icon={<Icon size={22} className="text-[var(--yellow)]" />}
                titulo={s.titulo}
                descripcion={s.descripcion}
              />
            );
          })}
        </div>
      </section>

      {/* Testimonios */}
      <TestimoniosSection />

      {/* FAQ */}
      <FaqSection />

      {/* CTA tienda */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-card)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">
              ¿Ya sabes qué pieza necesitas?
            </h2>
            <p className="mt-2 text-[var(--text-muted)]">
              Cómprala directo en línea, con pago seguro y entrega o recolección en taller.
            </p>
          </div>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded bg-[var(--yellow)] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[var(--yellow-dim)]"
          >
            Ir a la tienda <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
