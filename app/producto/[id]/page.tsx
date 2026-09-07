import { supabase } from "@/lib/supabase";
import { productosEjemplo } from "@/lib/productos-ejemplo";
import { notFound } from "next/navigation";
import ProductoDetalle from "./ProductoDetalle";

export const dynamic = "force-dynamic";

async function getProducto(id: string) {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return productosEjemplo.find((p) => p.id === id) || null;
  }

  return data;
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const producto = await getProducto(id);

  if (!producto) notFound();

  return <ProductoDetalle producto={producto} />;
}