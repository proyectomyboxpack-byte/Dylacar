import { Producto } from "./supabase";

// Productos de ejemplo — reemplazar con datos reales de Dylacar
// cuando estén conectados a Supabase.
export const productosEjemplo: Producto[] = [
  {
    id: "1",
    nombre: "Balatas delanteras semi-metálicas",
    descripcion:
      "Juego de balatas delanteras para uso general. Compatible con la mayoría de sedanes compactos y medianos.",
    precio: 480,
    imagen:
      "https://images.unsplash.com/photo-1632823471565-1ecdf7c8b1c9?w=600&q=80",
    categoria: "Frenos",
    stock: 24,
  },
  {
    id: "2",
    nombre: "Filtro de aceite estándar",
    descripcion:
      "Filtro de aceite de rosca universal, apto para motores de 4 cilindros.",
    precio: 120,
    imagen:
      "https://images.unsplash.com/photo-1632823471406-5a5a1d1c8e1f?w=600&q=80",
    categoria: "Motor",
    stock: 60,
  },
  {
    id: "3",
    nombre: "Batería 12V 45Ah",
    descripcion:
      "Batería libre de mantenimiento, 12 meses de garantía, ideal para autos compactos.",
    precio: 1850,
    imagen:
      "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=600&q=80",
    categoria: "Eléctrico",
    stock: 10,
  },
  {
    id: "4",
    nombre: "Juego de limpiadores 20\"",
    descripcion:
      "Par de plumas limpiaparabrisas universales, montaje tipo gancho.",
    precio: 220,
    imagen:
      "https://images.unsplash.com/photo-1601929318992-a45cd0f78c74?w=600&q=80",
    categoria: "Exterior",
    stock: 35,
  },
  {
    id: "5",
    nombre: "Aceite de motor sintético 5W-30 (4L)",
    descripcion:
      "Aceite sintético de alto rendimiento, protección contra desgaste, garrafa de 4 litros.",
    precio: 640,
    imagen:
      "https://images.unsplash.com/photo-1635784063504-11ba9a8f4a48?w=600&q=80",
    categoria: "Motor",
    stock: 40,
  },
  {
    id: "6",
    nombre: "Bujías de iridio (juego de 4)",
    descripcion:
      "Juego de 4 bujías de iridio, mayor durabilidad y mejor encendido.",
    precio: 560,
    imagen:
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&q=80",
    categoria: "Motor",
    stock: 18,
  },
];

export const categorias = [
  "Todos",
  "Motor",
  "Frenos",
  "Eléctrico",
  "Exterior",
];
