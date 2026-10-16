import Link from "next/link";
import { ArrowRight } from "lucide-react";
import VehiculosHero from "@/components/VehiculosHero";
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
  { valor: "15+", etiqueta: "Años en el oficio" },
  { valor: "2", etiqueta: "Autos y motos" },
  { valor: "24h", etiqueta: "Respuesta a cotizaciones" },
];

export default function Home() {
  return (
    <main className="bg-void">
      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-[1280px] px-6 pb-[96px] pt-[60px] lg:px-10 lg:pb-[120px] lg:pt-[96px]">
        <div className="grid items-center gap-[60px] lg:grid-cols-[1fr_1fr] lg:gap-[36px]">
          <div>
            <p className="eyebrow">Servicio automotriz · Refaccionaria</p>

            <h1
              className="mt-[24px] text-[48px] leading-[1.05] text-bone
                         sm:text-[78px] lg:text-[96px] xl:text-[113px]"
            >
              Tu auto, en manos que saben.
            </h1>

            <p className="mt-[30px] max-w-[480px] text-[18px] font-extralight leading-[1.5] text-mist">
              Servicio honesto y refacciones originales, sin sorpresas en la
              cuenta ni tiempos de espera eternos. Autos y motos, con el mismo
              nivel de detalle.
            </p>

            <div className="mt-[36px] flex flex-wrap items-center gap-[30px]">
              <Link href="/tienda" className="btn-primary">
                Ver refacciones <ArrowRight size={15} />
              </Link>
              <Link href="/citas" className="btn-ghost">
                Agendar servicio
              </Link>
            </div>
          </div>

          <div className="relative h-[280px] sm:h-[380px] lg:h-[480px]">
            <VehiculosHero />
          </div>
        </div>
      </section>

      {/* ================= CIFRAS ================= */}
      <section className="mx-auto max-w-[1280px] px-6 py-[60px] lg:px-10">
        <div className="grid gap-[36px] sm:grid-cols-3">
          {cifras.map((c) => (
            <div key={c.etiqueta}>
              <p className="text-[42px] leading-[1.1] tracking-[-0.04em] text-bone lg:text-[48px]">
                {c.valor}
              </p>
              <p className="mt-[6px] text-[14px] font-normal uppercase tracking-[0.025em] text-ash">
                {c.etiqueta}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SERVICIOS ================= */}
      <section
        id="servicios"
        className="mx-auto max-w-[1280px] px-6 py-[96px] lg:px-10 lg:py-[120px]"
      >
        <div className="grid gap-[60px] lg:grid-cols-[1fr_1.1fr] lg:gap-[96px]">
          <div className="lg:sticky lg:top-[96px] lg:self-start">
            <p className="eyebrow">Lo que hacemos</p>
            <h2 className="mt-[24px] text-[42px] leading-[1.1] text-bone lg:text-[78px]">
              Cuatro áreas, un solo taller.
            </h2>
            <p className="mt-[24px] max-w-[420px] text-[18px] font-extralight text-mist">
              Resolvemos la mayoría de lo que tu vehículo necesita, sin mandarte
              a otro lado.
            </p>
          </div>

          {/* Sin tarjetas ni bordes: los bloques flotan sobre el negro */}
          <div className="flex flex-col gap-[60px]">
            {servicios.map((s) => (
              <div key={s.titulo} className="flex gap-[24px]">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIOS Y FAQ ================= */}
      <TestimoniosSection />
      <FaqSection />

      {/* ================= CTA TIENDA ================= */}
      <section className="mx-auto max-w-[1280px] px-6 py-[96px] lg:px-10 lg:py-[120px]">
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
      </section>
    </main>
  );
}
