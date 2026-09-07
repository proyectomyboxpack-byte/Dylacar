import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl font-bold">Contacto</h1>
      <p className="mt-3 text-[var(--text-muted)]">
        Escríbenos o pasa directo al taller, con gusto te atendemos.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <Phone size={18} className="mt-0.5 text-[var(--yellow)]" />
          <div>
            <p className="font-medium">Teléfono</p>
            <p className="text-sm text-[var(--text-muted)]">55 0000 0000</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <Mail size={18} className="mt-0.5 text-[var(--yellow)]" />
          <div>
            <p className="font-medium">Correo</p>
            <p className="text-sm text-[var(--text-muted)]">contacto@dylacar.com</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <MapPin size={18} className="mt-0.5 text-[var(--yellow)]" />
          <div>
            <p className="font-medium">Ubicación</p>
            <p className="text-sm text-[var(--text-muted)]">Ciudad de México</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <Clock size={18} className="mt-0.5 text-[var(--yellow)]" />
          <div>
            <p className="font-medium">Horario</p>
            <p className="text-sm text-[var(--text-muted)]">Lun–Sáb, 9:00–18:00</p>
          </div>
        </div>
      </div>
    </main>
  );
}
