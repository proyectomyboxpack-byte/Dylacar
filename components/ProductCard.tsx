"use client";

import Link from "next/link";
import Image from "next/image";
import { Producto } from "@/lib/supabase";
import { useCart } from "@/lib/cart-context";
import { Plus } from "lucide-react";

export default function ProductCard({ producto }: { producto: Producto }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded border border-[var(--border)] bg-[var(--bg-card)] transition-colors hover:border-[var(--yellow)]/50">
      <Link href={`/producto/${producto.id}`} className="relative block aspect-square overflow-hidden bg-[var(--bg)]">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-[var(--text-muted)]">{producto.categoria}</p>
        <Link href={`/producto/${producto.id}`}>
          <h3 className="mt-1 font-medium leading-snug hover:text-[var(--yellow)]">
            {producto.nombre}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-display text-xl font-bold text-[var(--yellow)]">
            ${producto.precio.toLocaleString("es-MX")}
          </span>
          <button
            onClick={() =>
              addItem({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
              })
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] transition-colors hover:border-[var(--yellow)] hover:bg-[var(--yellow)] hover:text-black"
            aria-label={`Agregar ${producto.nombre} al carrito`}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
