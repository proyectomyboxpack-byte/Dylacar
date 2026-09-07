"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, Producto } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { Pencil, Trash2, Plus, X, LogOut } from "lucide-react";

const categoriasBase = ["Motor", "Frenos", "Eléctrico", "Exterior", "Otro"];

type FormState = {
  id?: string;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: string;
  categoria: string;
  stock: string;
};

const formVacio: FormState = {
  nombre: "",
  descripcion: "",
  precio: "",
  imagen: "",
  categoria: categoriasBase[0],
  stock: "0",
};

export default function AdminPage() {
  const { user, perfil, cargando: cargandoAuth, cerrarSesion } = useAuth();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState<FormState>(formVacio);
  const [guardando, setGuardando] = useState(false);
  const [archivoImagen, setArchivoImagen] = useState<File | null>(null);
  const [previewImagen, setPreviewImagen] = useState<string | null>(null);
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  useEffect(() => {
    if (perfil?.es_admin) cargarProductos();
  }, [perfil]);

  async function cargarProductos() {
    setCargando(true);
    const { data } = await supabase
      .from("productos")
      .select("*")
      .order("created_at", { ascending: false });
    setProductos(data || []);
    setCargando(false);
  }

  function abrirNuevo() {
    setForm(formVacio);
    setArchivoImagen(null);
    setPreviewImagen(null);
    setMostrarForm(true);
  }

  function abrirEditar(p: Producto) {
    setForm({
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: String(p.precio),
      imagen: p.imagen,
      categoria: p.categoria,
      stock: String(p.stock),
    });
    setArchivoImagen(null);
    setPreviewImagen(p.imagen);
    setMostrarForm(true);
  }

  function handleSeleccionarImagen(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setArchivoImagen(file);
    setPreviewImagen(URL.createObjectURL(file));
  }

  async function handleGuardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);

    let urlImagen = form.imagen;

    if (archivoImagen) {
      setSubiendoImagen(true);
      const nombreArchivo = `${Date.now()}-${archivoImagen.name.replace(/\s+/g, "-")}`;
      const { error: uploadError } = await supabase.storage
        .from("productos")
        .upload(nombreArchivo, archivoImagen);

      if (uploadError) {
        alert("No se pudo subir la imagen. Intenta de nuevo.");
        setGuardando(false);
        setSubiendoImagen(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("productos")
        .getPublicUrl(nombreArchivo);
      urlImagen = urlData.publicUrl;
      setSubiendoImagen(false);
    }

    if (!urlImagen) {
      alert("Selecciona una foto para el producto.");
      setGuardando(false);
      return;
    }

    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      imagen: urlImagen,
      categoria: form.categoria,
      stock: Number(form.stock),
    };

    if (form.id) {
      await supabase.from("productos").update(payload).eq("id", form.id);
    } else {
      await supabase.from("productos").insert(payload);
    }

    setGuardando(false);
    setMostrarForm(false);
    cargarProductos();
  }

  async function handleEliminar(id: string) {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    await supabase.from("productos").delete().eq("id", id);
    cargarProductos();
  }

  if (cargandoAuth) {
    return <main className="py-24 text-center text-[var(--text-muted)]">Cargando...</main>;
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-sm px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Panel de administración</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Necesitas iniciar sesión para entrar aquí.
        </p>
        <Link
          href="/cuenta"
          className="mt-6 inline-block rounded bg-[var(--yellow)] px-6 py-2.5 text-sm font-semibold text-black hover:bg-[var(--yellow-dim)]"
        >
          Iniciar sesión
        </Link>
      </main>
    );
  }

  if (!perfil?.es_admin) {
    return (
      <main className="mx-auto max-w-sm px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Acceso restringido</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Tu cuenta no tiene permisos de administrador.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Productos</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {productos.length} producto(s) en la tienda
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={abrirNuevo}
            className="flex items-center gap-2 rounded bg-[var(--yellow)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--yellow-dim)]"
          >
            <Plus size={16} /> Agregar producto
          </button>
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-2 rounded border border-[var(--border)] px-4 py-2 text-sm hover:border-[var(--yellow)]"
          >
            <LogOut size={16} /> Salir
          </button>
        </div>
      </div>

      {cargando ? (
        <p className="text-[var(--text-muted)]">Cargando...</p>
      ) : productos.length === 0 ? (
        <p className="text-[var(--text-muted)]">
          Aún no hay productos. Dale a &quot;Agregar producto&quot; para crear el primero.
        </p>
      ) : (
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {productos.map((p) => (
            <div key={p.id} className="flex items-center gap-4 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.imagen}
                alt={p.nombre}
                className="h-16 w-16 shrink-0 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{p.nombre}</p>
                <p className="text-sm text-[var(--text-muted)]">
                  {p.categoria} · ${p.precio.toLocaleString("es-MX")} · Stock: {p.stock}
                </p>
              </div>
              <button
                onClick={() => abrirEditar(p)}
                className="flex h-9 w-9 items-center justify-center rounded border border-[var(--border)] hover:border-[var(--yellow)]"
                aria-label="Editar"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleEliminar(p.id)}
                className="flex h-9 w-9 items-center justify-center rounded border border-[var(--border)] hover:border-red-400"
                aria-label="Eliminar"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {mostrarForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded border border-[var(--border)] bg-[var(--bg)] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">
                {form.id ? "Editar producto" : "Nuevo producto"}
              </h2>
              <button onClick={() => setMostrarForm(false)} aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleGuardar} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm">Nombre</label>
                <input
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm">Descripción</label>
                <textarea
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  rows={2}
                  className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm">Precio (MXN)</label>
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.precio}
                    onChange={(e) => setForm({ ...form, precio: e.target.value })}
                    className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm">Stock</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm">Categoría</label>
                <select
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
                >
                  {categoriasBase.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm">Foto del producto</label>

                {previewImagen && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewImagen}
                    alt="Vista previa"
                    className="mb-3 h-32 w-32 rounded object-cover"
                  />
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSeleccionarImagen}
                  className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm outline-none file:mr-3 file:rounded file:border-0 file:bg-[var(--yellow)] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-black focus:border-[var(--yellow)]"
                />
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Puedes tomar la foto con tu celular o elegir una de tu galería.
                </p>
              </div>

              <button
                type="submit"
                disabled={guardando}
                className="w-full rounded bg-[var(--yellow)] py-2.5 text-sm font-semibold text-black hover:bg-[var(--yellow-dim)] disabled:opacity-50"
              >
                {subiendoImagen
                  ? "Subiendo foto..."
                  : guardando
                  ? "Guardando..."
                  : "Guardar producto"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
