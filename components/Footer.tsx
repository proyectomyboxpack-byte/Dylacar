import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-card)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Dylacar"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <p className="font-display text-xl font-bold">DYLACAR</p>
          </div>
          <p className="mt-3 max-w-xs text-sm text-[var(--text-muted)]">
            Servicio automotriz premium y refaccionaria de confianza. Reparamos,
            mantenemos y surtimos las piezas que tu auto necesita.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-[var(--text)]">Enlaces</p>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li>
              <Link href="/tienda" className="hover:text-[var(--yellow)]">
                Tienda
              </Link>
            </li>
            <li>
              <Link href="/#servicios" className="hover:text-[var(--yellow)]">
                Servicios
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-[var(--yellow)]">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-[var(--text)]">Contacto</p>
          <ul className="space-y-3 text-sm text-[var(--text-muted)]">
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-[var(--yellow)]" />
              <a
                href="tel:+525553536905"
                className="transition-colors hover:text-[var(--yellow)]"
              >
                55 5353 6905
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-[var(--yellow)]" />
              <a
                href="mailto:contacto@dylacar.com"
                className="transition-colors hover:text-[var(--yellow)]"
              >
                contacto@dylacar.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin
                size={16}
                className="mt-0.5 shrink-0 text-[var(--yellow)]"
              />
              <a
                href="https://maps.google.com/?q=Avenida+Aquiles+Serdan+266+La+Preciosa+Azcapotzalco+CDMX+02460"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--yellow)]"
              >
                Av. Aquiles Serdán #266, Loc-3
                <br />
                Col. La Preciosa, Azcapotzalco
                <br />
                CDMX, C.P. 02460
              </a>
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
