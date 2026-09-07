import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function GraciasPage() {
  return (
    <main className="mx-auto max-w-lg px-5 py-24 text-center">
      <CheckCircle2 size={48} className="mx-auto text-[var(--yellow)]" />
      <h1 className="font-display mt-6 text-3xl font-bold">
        ¡Pedido recibido!
      </h1>
      <p className="mt-3 text-[var(--text-muted)]">
        Te contactaremos en breve para confirmar tu pedido y coordinar el pago
        y la entrega.
      </p>
      <Link
        href="/tienda"
        className="mt-8 inline-block rounded bg-[var(--yellow)] px-6 py-3 text-sm font-semibold text-black hover:bg-[var(--yellow-dim)]"
      >
        Seguir comprando
      </Link>
    </main>
  );
}
