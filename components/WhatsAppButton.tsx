"use client";

import { MessageCircle } from "lucide-react";

const NUMERO_WHATSAPP = "5215619950567"; // 52 = México, ajusta si hace falta

export default function WhatsAppButton() {
  const mensaje = encodeURIComponent(
    "Hola, vengo de la página de Dylacar y quiero más información."
  );
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110"
      aria-label="Escríbenos por WhatsApp"
    >
      <MessageCircle size={26} className="text-white" fill="white" />
    </a>
  );
}
