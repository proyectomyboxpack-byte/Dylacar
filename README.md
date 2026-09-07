# Dylacar — Página + Tienda en línea

Proyecto construido con Next.js. Incluye página informativa del taller y
tienda con carrito de compras. Los productos son de ejemplo por ahora —
se reemplazan por datos reales en `lib/productos-ejemplo.ts` o, mejor,
conectando Supabase (ver abajo).

## Cómo correrlo en tu computadora

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Subir a GitHub

1. Crea un repositorio nuevo en GitHub (vacío, sin README)
2. En esta carpeta, corre:

```bash
git init
git add .
git commit -m "Primera version de Dylacar"
git branch -M main
git remote add origin URL_DE_TU_REPO
git push -u origin main
```

## Publicar en Vercel

1. En Vercel, dale a "Import Project" y selecciona este repositorio
2. Antes de darle "Deploy", agrega las variables de entorno (ver `.env.example`)
3. Deploy

## Conectar Supabase (base de datos de productos)

1. En tu proyecto de Supabase, crea una tabla `productos` con estas columnas:
   - `id` (uuid, primary key)
   - `nombre` (text)
   - `descripcion` (text)
   - `precio` (numeric)
   - `imagen` (text, URL de la imagen)
   - `categoria` (text)
   - `stock` (integer)

2. Copia tu URL y anon key desde Supabase → Project Settings → API
3. Ponlas en las variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`) tanto en tu `.env.local` local como en
   Vercel

4. En `app/tienda/page.tsx`, reemplaza la función `getProductos()` para
   que use Supabase en vez de los datos de ejemplo:

```ts
import { supabase } from "@/lib/supabase";

async function getProductos() {
  const { data } = await supabase.from("productos").select("*");
  return data || [];
}
```

Haz lo mismo en `app/producto/[id]/page.tsx`.

## Notificacion de pedidos por correo (Resend)

1. Crea cuenta gratis en https://resend.com
2. Verifica tu dominio (dylacar.com) o usa el dominio de pruebas de Resend
   mientras tanto
3. Genera una API key y ponla en `RESEND_API_KEY`
4. Define a que correo llegan los pedidos en `CORREO_PEDIDOS`

Sin estas variables configuradas, el pedido igual se procesa pero solo
queda registrado en los logs del servidor (no se envia correo).

## Conectar Stripe (pago en linea real)

Todavia no esta integrado, el checkout actual solo registra el pedido
y notifica por correo, sin cobrar. Cuando tengas la cuenta de Stripe
lista, el siguiente paso es:

1. Crear un endpoint `app/api/crear-pago/route.ts` que use el SDK de
   Stripe para generar una "Checkout Session" con los productos del
   carrito
2. En `app/checkout/page.tsx`, en vez de llamar directo a
   `/api/notificar-pedido`, primero llamar a `/api/crear-pago` y
   redirigir al cliente a la URL de pago que devuelve Stripe
3. Configurar un webhook de Stripe que, al confirmarse el pago, llame a
   `/api/notificar-pedido` (asi el correo solo se envia si el pago fue
   exitoso)

Este paso quedo marcado con un comentario `NOTA PARA DESARROLLO`
dentro de `app/checkout/page.tsx`.

## Estructura del proyecto

```
app/
  page.tsx               Pagina de inicio
  tienda/                 Catalogo de productos
  producto/[id]/          Detalle de un producto
  carrito/                Carrito de compras
  checkout/               Formulario de pedido
  contacto/               Pagina de contacto
  api/notificar-pedido/   Envio de correo al confirmar pedido
lib/
  cart-context.tsx        Estado del carrito (persistido en el navegador)
  supabase.ts             Cliente de Supabase
  productos-ejemplo.ts    Productos de ejemplo (quitar cuando haya datos reales)
components/
  Navbar.tsx, Footer.tsx, ProductCard.tsx
```
