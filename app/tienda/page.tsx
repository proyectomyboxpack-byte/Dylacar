import { supabase } from "@/lib/supabase";
import { productosEjemplo } from "@/lib/productos-ejemplo";
import TiendaClient from "./TiendaClient";

export const dynamic = "force-dynamic";

async function getProductos() {
  const { data, error } = await supabase.from("productos").select("*");

  if (error || !data || data.length === 0) {
    return productosEjemplo;
  }

  return data;
}

export default async function TiendaPage() {
  const productos = await getProductos();

  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold">Tienda</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Refacciones disponibles para entrega o recolección en taller.
        </p>
      </div>
      <TiendaClient productos={productos} />
    </main>
  );
}