"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const servicios = [
  "Mantenimiento general",
  "Frenos y suspensión",
  "Sistema eléctrico",
  "Diagnóstico computarizado",
  "Otro",
];

const horarios = [
  "9:00", "10:00", "11:00", "12:00",
  "13:00", "15:00", "16:00", "17:00",
];

export default function CitasPage() {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(false);
  const [datos, setDatos] = useState({
    nombre: "",
    telefono: "",
    servicio: servicios[0],
    fecha: "",
    hora: horarios[0],
    notas: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setError(false);

    const { error: dbError } = await supabase.from("citas").insert({
      nombre: datos.nombre,
      telefono: datos.telefono,
      servicio: datos.servicio,
      fecha: datos.fecha,
      hora: datos.hora,
      notas: datos.notas || null,
    });

    if (dbError) {
      setError(true);
      setEnviando(false);
      return;
    }

    // Notificar por correo (mismo endpoint que pedidos, reutilizado con otro formato)
    try {
      await fetch("/api/notificar-cita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
    } catch {
      // si falla el correo no bloqueamos al cliente, la cita ya quedó guardada
    }

    setEnviando(false);
    setEnviado(true);
  }

  if (enviado) {
    return (
      <main className="mx-auto max-w-lg px-5 py-24 text-center">
        <CheckCircle2 size={48} className="mx-auto text-[var(--yellow)]" />
        <h1 className="font-display mt-6 text-3xl font-bold">
          ¡Cita solicitada!
        </h1>
        <p className="mt-3 text-[var(--text-muted)]">
          Te contactaremos para confirmar tu horario. Si tienes prisa, también
          puedes escribirnos por WhatsApp.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-display text-4xl font-bold">Agenda tu servicio</h1>
      <p className="mt-3 text-[var(--text-muted)]">
        Llena el formulario y te confirmamos tu cita a la brevedad.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        <div>
          <label className="mb-1.5 block text-sm">Nombre completo</label>
          <input
            required
            value={datos.nombre}
            onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
            className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm">Teléfono</label>
          <input
            required
            type="tel"
            value={datos.telefono}
            onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
            className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm">Servicio</label>
          <select
            value={datos.servicio}
            onChange={(e) => setDatos({ ...datos, servicio: e.target.value })}
            className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
          >
            {servicios.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm">Fecha</label>
            <input
              required
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={datos.fecha}
              onChange={(e) => setDatos({ ...datos, fecha: e.target.value })}
              className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm">Hora</label>
            <select
              value={datos.hora}
              onChange={(e) => setDatos({ ...datos, hora: e.target.value })}
              className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
            >
              {horarios.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm">Notas (opcional)</label>
          <textarea
            value={datos.notas}
            onChange={(e) => setDatos({ ...datos, notas: e.target.value })}
            rows={3}
            placeholder="Describe brevemente qué le pasa a tu auto"
            className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400">
            Hubo un problema al enviar tu cita. Intenta de nuevo o escríbenos por WhatsApp.
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded bg-[var(--yellow)] py-3 text-sm font-semibold text-black transition-colors hover:bg-[var(--yellow-dim)] disabled:opacity-50"
        >
          {enviando ? "Enviando..." : "Solicitar cita"}
        </button>
      </form>
    </main>
  );
}
