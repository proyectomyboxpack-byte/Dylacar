import Link from "next/link";
import { ArrowRight } from "lucide-react";
import VideoHero from "@/components/VideoHero";
import { Reveal, RevealItem } from "@/components/Reveal";
import Contador from "@/components/Contador";
import TestimoniosSection from "@/components/TestimoniosSection";
import FaqSection from "@/components/FaqSection";

const servicios = [
  {
    numero: "01",
    titulo: "Mantenimiento general",
    descripcion:
      "Afinación, cambio de aceite y revisión completa para mantener tu auto o moto en su mejor condición.",
  },
  {
    numero: "02",
    titulo: "Frenos y suspensión",
    descripcion:
      "Cambio de balatas, discos y componentes de suspensión con piezas de calidad garantizada.",
  },
  {
    numero: "03",
    titulo: "Sistema eléctrico",
    descripcion:
      "Diagnóstico y reparación eléctrica, baterías, alternadores y arneses.",
  },
  {
    numero: "04",
    titulo: "Diagnóstico computarizado",
    descripcion:
      "Escaneo de fallas con equipo especializado para identificar el problema real, sin adivinar.",
  },
];

const cifras = [
  { valor: 15, sufijo: "+", etiqueta: "Años en el oficio" },
  { valor: 2, sufijo: "", etiqueta: "Autos y motos" },
  { valor: 24, sufijo: "h", etiqueta: "Respuesta a cotizaciones" },
];

export default function Home() {
  return (
    <main className="bg-void">
      {/* ================= HERO CON VIDEO (B) ================= */}
      <VideoHero />

      {/* ================= CIFRAS ================= */}
      <section className="mx-auto max-w-[1280px] px-6 py-[60px] lg:px-10">
        <Reveal stagger className="grid gap-[36px] sm:grid-cols-3">
          {cifras.map((c) => (
            <RevealItem key={c.etiqueta}>
              <p className="text-[42px] leading-[1.1] tracking-[-0.04em] text-bone lg:text-[48px]">
                <Contador valor={c.valor} sufijo={c.sufijo} />
              </p>
              <p className="mt-[6px] text-[14px] font-normal uppercase tracking-[0.025em] text-ash">
                {c.etiqueta}
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      {/* ================= SERVICIOS ================= */}
      <section
        id="servicios"
        className="mx-auto max-w-[1280px] px-6 py-[96px] lg:px-10 lg:py-[120px]"
      >
        <div className="grid gap-[60px] lg:grid-cols-[1fr_1.1fr] lg:gap-[96px]">
          <Reveal className="lg:sticky lg:top-[96px] lg:self-start">
            <p className="eyebrow">Lo que hacemos</p>
            <h2 className="mt-[24px] text-[42px] leading-[1.1] text-bone lg:text-[78px]">
              Cuatro áreas, un solo taller.
            </h2>
            <p className="mt-[24px] max-w-[420px] text-[18px] font-extralight text-mist">
              Resolvemos la mayoría de lo que tu vehículo necesita, sin mandarte
              a otro lado.
            </p>
          </Reveal>

          <Reveal stagger className="flex flex-col gap-[60px]">
            {servicios.map((s) => (
              <RevealItem key={s.titulo} className="flex gap-[24px]">
                <span className="mt-[6px] shrink-0 text-[14px] font-semibold tracking-[0.025em] text-amber">
                  {s.numero}
                </span>
                <div>
                  <h3 className="text-[27px] leading-[1.1] text-bone">
                    {s.titulo}
                  </h3>
                  <p className="mt-[12px] max-w-[460px] text-[18px] font-extralight leading-[1.5] text-mist">
                    {s.descripcion}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= TESTIMONIOS Y FAQ ================= */}
      <TestimoniosSection />
      <FaqSection />

      {/* ================= CTA TIENDA ================= */}
      <section className="mx-auto max-w-[1280px] px-6 py-[96px] lg:px-10 lg:py-[120px]">
        <Reveal>
          <p className="eyebrow">Refaccionaria</p>
          <h2 className="mt-[24px] max-w-[760px] text-[42px] leading-[1.1] text-bone lg:text-[78px]">
            ¿Ya sabes qué pieza necesitas?
          </h2>
          <p className="mt-[24px] max-w-[480px] text-[18px] font-extralight text-mist">
            Cómprala directo en línea, con pago seguro y entrega o recolección en
            taller.
          </p>
          <div className="mt-[36px]">
            <Link href="/tienda" className="btn-primary">
              Ir a la tienda <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
