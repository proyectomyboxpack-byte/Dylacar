"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { LogOut, Package, Settings } from "lucide-react";

type Pedido = {
  id: string;
  items: { nombre: string; cantidad: number; precio: number }[];
  total: number;
  estado: string;
  created_at: string;
};

function FormularioAuth() {
  const { registrar, iniciarSesion } = useAuth();
  const [modo, setModo] = useState<"login" | "registro">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    setError(null);

    const resultado =
      modo === "login"
        ? await iniciarSesion(email, password)
        : await registrar(email, password, nombre);

    if (resultado.error) setError(resultado.error);
    setCargando(false);
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-5">
      <h1 className="font-display text-3xl font-bold">
        {modo === "login" ? "Iniciar sesión" : "Crear cuenta"}
      </h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        {modo === "login"
          ? "Entra para ver tu historial de pedidos."
          : "Crea tu cuenta para llevar el registro de tus compras."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {modo === "registro" && (
          <input
            required
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
          />
        )}
        <input
          required
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
        />
        <input
          required
          type="password"
          placeholder="Contraseña"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 outline-none focus:border-[var(--yellow)]"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={cargando}
          className="w-full rounded bg-[var(--yellow)] py-2.5 text-sm font-semibold text-black hover:bg-[var(--yellow-dim)] disabled:opacity-50"
        >
          {cargando ? "Cargando..." : modo === "login" ? "Entrar" : "Crear cuenta"}
        </button>
      </form>

      <button
        onClick={() => setModo(modo === "login" ? "registro" : "login")}
        className="mt-4 text-sm text-[var(--text-muted)] hover:text-[var(--yellow)]"
      >
        {modo === "login"
          ? "¿No tienes cuenta? Regístrate"
          : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </main>
  );
}

function PanelCuenta() {
  const { user, perfil, cerrarSesion } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      const { data } = await supabase
        .from("pedidos")
        .select("*")
        .eq("usuario_id", user?.id)
        .order("created_at", { ascending: false });
      setPedidos(data || []);
      setCargando(false);
    }
    if (user) cargar();
  }, [user]);

  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">
            Hola, {perfil?.nombre || "cliente"}
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">{user?.email}</p>
        </div>
        <div className="flex gap-3">
          {perfil?.es_admin && (
            <Link
              href="/admin"
              className="flex items-center gap-2 rounded border border-[var(--border)] px-4 py-2 text-sm hover:border-[var(--yellow)]"
            >
              <Settings size={16} /> Panel admin
            </Link>
          )}
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-2 rounded border border-[var(--border)] px-4 py-2 text-sm hover:border-red-400"
          >
            <LogOut size={16} /> Salir
          </button>
        </div>
      </div>

      <h2 className="font-display mb-4 text-xl font-bold">Historial de pedidos</h2>

      {cargando ? (
        <p className="text-[var(--text-muted)]">Cargando...</p>
      ) : pedidos.length === 0 ? (
        <div className="rounded border border-[var(--border)] bg-[var(--bg-card)] p-6 text-center">
          <Package size={28} className="mx-auto text-[var(--text-muted)]" />
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Aún no tienes pedidos. Cuando compres algo en la tienda, aparecerá aquí.
          </p>
          <Link href="/tienda" className="mt-4 inline-block text-sm text-[var(--yellow)] hover:underline">
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="rounded border border-[var(--border)] bg-[var(--bg-card)] p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[var(--text-muted)]">
                  {new Date(pedido.created_at).toLocaleDateString("es-MX", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
                <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs capitalize">
                  {pedido.estado}
                </span>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-[var(--text-muted)]">
                {pedido.items.map((item, i) => (
                  <li key={i}>
                    {item.cantidad}x {item.nombre}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-display text-lg font-bold text-[var(--yellow)]">
                ${pedido.total.toLocaleString("es-MX")}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default function CuentaPage() {
  const { user, cargando } = useAuth();

  if (cargando) {
    return <main className="py-24 text-center text-[var(--text-muted)]">Cargando...</main>;
  }

  return user ? <PanelCuenta /> : <FormularioAuth />;
}
