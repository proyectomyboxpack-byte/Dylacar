"use client";

import { useState } from "react";
import { Producto } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

export default function TiendaClient({ productos }: { productos: Producto[] }) {
  const [categoria, setCategoria] = useState("Todos");

  const categorias = [
    "Todos",
    ...Array.from(new Set(productos.map((p) => p.categoria).filter(Boolean))),
  ];

  const filtrados =
    categoria === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoria);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              categoria === cat
                ? "border-[var(--yellow)] bg-[var(--yellow)] text-black font-medium"
                : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--yellow)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtrados.length === 0 ? (
        <p className="py-16 text-center text-[var(--text-muted)]">
          No hay productos en esta categoría por ahora.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtrados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}
