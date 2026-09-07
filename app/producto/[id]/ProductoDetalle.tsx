"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { Producto } from "@/lib/supabase";
import { useCart } from "@/lib/cart-context";

export default function ProductoDetalle({ producto }: { producto: Producto }) {
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const { addItem } = useCart();

  function handleAgregar() {
    addItem(
      {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
      },
      cantidad
    );
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <Link
        href="/tienda"
        className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--yellow)]"
      >
        <ChevronLeft size={16} /> Volver a la tienda
      </Link>

      <div className="grid gap-10 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded border border-[var(--border)] bg-[var(--bg-card)]">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <p className="text-sm text-[var(--text-muted)]">{producto.categoria}</p>
          <h1 className="font-display mt-1 text-3xl font-bold">
            {producto.nombre}
          </h1>
          <p className="mt-4 font-display text-3xl font-bold text-[var(--yellow)]">
            ${producto.precio.toLocaleString("es-MX")}
          </p>
          <p className="mt-6 leading-relaxed text-[var(--text-muted)]">
            {producto.descripcion}
          </p>

          <p className="mt-6 text-sm text-[var(--text-muted)]">
            {producto.stock > 0
              ? `${producto.stock} piezas disponibles`
              : "Sin existencia por el momento"}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded border border-[var(--border)]">
              <button
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="flex h-10 w-10 items-center justify-center hover:text-[var(--yellow)]"
                aria-label="Disminuir cantidad"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center">{cantidad}</span>
              <button
                onClick={() => setCantidad((c) => c + 1)}
                className="flex h-10 w-10 items-center justify-center hover:text-[var(--yellow)]"
                aria-label="Aumentar cantidad"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAgregar}
              disabled={producto.stock === 0}
              className="flex-1 rounded bg-[var(--yellow)] py-3 text-sm font-semibold text-black transition-colors hover:bg-[var(--yellow-dim)] disabled:opacity-40"
            >
              {agregado ? "Agregado ✓" : "Agregar al carrito"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
