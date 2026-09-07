"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [datos, setDatos] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
    notas: "",
  });

  useEffect(() => {
    if (user?.email) {
      setDatos((prev) => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="text-[var(--text-muted)]">No hay productos en tu carrito.</p>
        <Link href="/tienda" className="mt-4 inline-block text-[var(--yellow)] hover:underline">
          Ir a la tienda
        </Link>
      </main>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);

    // NOTA PARA DESARROLLO: aquí se conecta Stripe.
    // Flujo real: este formulario debe llamar a /api/crear-pago (que crea una
    // sesión de Stripe Checkout con los `items` y `total` actuales), y luego
    // redirigir al usuario a la URL de pago que Stripe devuelve.
    // Cuando el pago se confirma, Stripe notifica a /api/notificar-pedido,
    // que envía el correo a Dylacar con el detalle del pedido.
    //
    // Por ahora, mientras se activa Stripe, este formulario guarda el pedido
    // (ligado al usuario si inició sesión) y notifica por correo.

    await supabase.from("pedidos").insert({
      usuario_id: user?.id ?? null,
      nombre: datos.nombre,
      telefono: datos.telefono,
      email: datos.email,
      direccion: datos.direccion,
      notas: datos.notas || null,
      items,
      total,
    });

    try {
      await fetch("/api/notificar-pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datos, items, total }),
      });
    } catch {
      // si falla el correo, no bloqueamos al cliente
    }

    clearCart();
    router.push("/checkout/gracias");
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <Link
        href="/carrito"
        className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--yellow)]"
      >
        <ChevronLeft size={16} /> Volver al carrito
      </Link>

      <h1 className="font-display mb-8 text-3xl font-bold">Finalizar pedido</h1>

      <div className="mb-8 rounded border border-[var(--border)] bg-[var(--bg-card)] p-5">
        <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
          <span>{items.length} producto(s)</span>
          <span className="font-display text-xl font-bold text-[var(--yellow)]">
            ${total.toLocaleString("es-MX")}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm">Nombre completo</label>
          <input
            required
            value={datos.nombre}
            onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
            className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
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
            <label className="mb-1.5 block text-sm">Correo</label>
            <input
              required
              type="email"
              value={datos.email}
              onChange={(e) => setDatos({ ...datos, email: e.target.value })}
              className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm">
            Dirección de entrega (o &quot;recojo en taller&quot;)
          </label>
          <input
            required
            value={datos.direccion}
            onChange={(e) => setDatos({ ...datos, direccion: e.target.value })}
            className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm">Notas (opcional)</label>
          <textarea
            value={datos.notas}
            onChange={(e) => setDatos({ ...datos, notas: e.target.value })}
            rows={3}
            className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded bg-[var(--yellow)] py-3 text-sm font-semibold text-black transition-colors hover:bg-[var(--yellow-dim)] disabled:opacity-50"
        >
          {enviando ? "Procesando..." : `Confirmar pedido — $${total.toLocaleString("es-MX")}`}
        </button>
      </form>
    </main>
  );
}
