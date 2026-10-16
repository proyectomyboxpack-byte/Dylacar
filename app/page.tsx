import Link from "next/link";
import VideoHero from "@/components/VideoHero";
import { Reveal, RevealItem } from "@/components/Reveal";
import Contador from "@/components/Contador";
import TestimoniosSection from "@/components/TestimoniosSection";
import FaqSection from "@/components/FaqSection";


const servicios = [
  {
    titulo: "Mantenimiento general",
    descripcion:
      "Afinación, cambio de aceite y revisión completa para mantener tu auto o moto en su mejor condición.",
  },
  {
    titulo: "Frenos y suspensión",
    descripcion:
      "Cambio de balatas, discos y componentes de suspensión con piezas de calidad garantizada.",
  },
  {
    titulo: "Sistema eléctrico",
    descripcion:
      "Diagnóstico y reparación eléctrica, baterías, alternadores y arneses.",
  },
  {
    titulo: "Diagnóstico computarizado",
    descripcion:
      "Escaneo de fallas con equipo especializado para identificar el problema real, sin adivinar.",
  },
];

const cifras = [
  { valor: 15, sufijo: "+", etiqueta: "Años en el oficio" },
  { valor: 24, sufijo: "h", etiqueta: "Respuesta a cotizaciones" },
  { valor: 3, sufijo: " meses", etiqueta: "Garantía en mano de obra" },
];

export default function Home() {
  return (
    <main>
      <VideoHero />

      {/* ================= CIFRAS ================= */}
      <section className="relative mx-auto max-w-[1280px] px-6 py-[72px] lg:px-10 lg:py-[96px]">
        <Reveal stagger className="grid gap-[40px] sm:grid-cols-3">
          {cifras.map((c) => (
            <RevealItem key={c.etiqueta}>
              <p className="text-[44px] leading-[1.05] tracking-[-0.04em] text-bone lg:text-[52px]">
                <Contador valor={c.valor} sufijo={c.sufijo} />
              </p>
              <p className="mt-[8px] text-[15px] font-extralight text-ash">
                {c.etiqueta}
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      {/* ================= SERVICIOS ================= */}
      <section
        id="servicios"
        className="relative mx-auto max-w-[1280px] px-6 pb-[96px] lg:px-10 lg:pb-[120px]"
      >
        <div className="grid gap-[56px] lg:grid-cols-[1fr_1.25fr] lg:gap-[96px]">
          <Reveal className="lg:sticky lg:top-[96px] lg:self-start">
            <h2 className="text-[38px] leading-[1.08] text-bone lg:text-[60px]">
              Lo que resolvemos aquí mismo.
            </h2>
            <p className="mt-[22px] max-w-[400px] text-[18px] font-extralight leading-[1.55] text-mist">
              Sin mandarte a otro taller por la mitad del trabajo.
            </p>
          </Reveal>

          {/* Las líneas separan los servicios; no son pasos, así que no
              van numerados. */}
          <Reveal stagger className="flex flex-col">
            {servicios.map((s, i) => (
              <RevealItem
                key={s.titulo}
                className={
                  i === 0
                    ? "py-[28px]"
                    : "border-t border-white/10 py-[28px]"
                }
              >
                <h3 className="text-[25px] leading-[1.15] text-bone">
                  {s.titulo}
                </h3>
                <p className="mt-[10px] max-w-[460px] text-[17px] font-extralight leading-[1.55] text-mist">
                  {s.descripcion}
                </p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <TestimoniosSection />
      <FaqSection />

      {/* ================= CTA TIENDA ================= */}
      <section className="relative mx-auto max-w-[1280px] px-6 py-[96px] lg:px-10 lg:py-[120px]">
        <Reveal>
          <h2 className="max-w-[720px] text-[38px] leading-[1.08] text-bone lg:text-[60px]">
            ¿Ya sabes qué pieza necesitas?
          </h2>
          <p className="mt-[22px] max-w-[460px] text-[18px] font-extralight leading-[1.55] text-mist">
            Cómprala en línea y recógela en el taller, o te la enviamos.
          </p>
          <div className="mt-[34px]">
            <Link href="/tienda" className="btn-primary">
              Ir a la tienda
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
