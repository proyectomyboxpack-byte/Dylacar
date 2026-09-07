"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Tu carrito está vacío</h1>
        <p className="mt-3 text-[var(--text-muted)]">
          Agrega productos desde la tienda para verlos aquí.
        </p>
        <Link
          href="/tienda"
          className="mt-8 inline-flex items-center gap-2 rounded bg-[var(--yellow)] px-6 py-3 text-sm font-semibold text-black hover:bg-[var(--yellow-dim)]"
        >
          Ir a la tienda <ArrowRight size={16} />
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display mb-8 text-3xl font-bold">Tu carrito</h1>

      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-[var(--bg-card)]">
              <Image src={item.imagen} alt={item.nombre} fill className="object-cover" sizes="80px" />
            </div>

            <div className="flex-1">
              <p className="font-medium leading-snug">{item.nombre}</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                ${item.precio.toLocaleString("es-MX")} c/u
              </p>
            </div>

            <div className="flex items-center rounded border border-[var(--border)]">
              <button
                onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                className="flex h-8 w-8 items-center justify-center hover:text-[var(--yellow)]"
                aria-label="Disminuir"
              >
                <Minus size={12} />
              </button>
              <span className="w-6 text-center text-sm">{item.cantidad}</span>
              <button
                onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                className="flex h-8 w-8 items-center justify-center hover:text-[var(--yellow)]"
                aria-label="Aumentar"
              >
                <Plus size={12} />
              </button>
            </div>

            <p className="w-20 text-right font-medium">
              ${(item.precio * item.cantidad).toLocaleString("es-MX")}
            </p>

            <button
              onClick={() => removeItem(item.id)}
              className="text-[var(--text-muted)] hover:text-red-400"
              aria-label={`Quitar ${item.nombre}`}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-1">
        <p className="text-sm text-[var(--text-muted)]">Total</p>
        <p className="font-display text-3xl font-bold text-[var(--yellow)]">
          ${total.toLocaleString("es-MX")}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/tienda"
          className="rounded border border-[var(--border)] px-6 py-3 text-center text-sm font-semibold hover:border-[var(--yellow)]"
        >
          Seguir comprando
        </Link>
        <Link
          href="/checkout"
          className="rounded bg-[var(--yellow)] px-6 py-3 text-center text-sm font-semibold text-black hover:bg-[var(--yellow-dim)]"
        >
          Ir a pagar
        </Link>
      </div>
    </main>
  );
}
