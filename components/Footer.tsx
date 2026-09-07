import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-card)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Dylacar" width={40} height={40} className="h-10 w-10 object-contain" />
            <p className="font-display text-xl font-bold">DYLACAR</p>
          </div>
          <p className="mt-3 max-w-xs text-sm text-[var(--text-muted)]">
            Servicio automotriz premium y refaccionaria de confianza. Reparamos, mantenemos y
            surtimos las piezas que tu auto necesita.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-[var(--text)]">Enlaces</p>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li><Link href="/tienda" className="hover:text-[var(--yellow)]">Tienda</Link></li>
            <li><Link href="/#servicios" className="hover:text-[var(--yellow)]">Servicios</Link></li>
            <li><Link href="/contacto" className="hover:text-[var(--yellow)]">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-[var(--text)]">Contacto</p>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-[var(--yellow)]" /> 55 0000 0000
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-[var(--yellow)]" /> contacto@dylacar.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-[var(--yellow)]" /> Ciudad de México
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-5 py-4 text-center text-xs text-[var(--text-muted)]">
        © {new Date().getFullYear()} Dylacar. Todos los derechos reservados.
      </div>
    </footer>
  );
}
