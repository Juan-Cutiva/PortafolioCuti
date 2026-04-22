---
title: AC Colombian Lawyers
description: Portal jurídico y de noticias con Astro 5, React 19 y Strapi 5. Calculadoras laborales, revistas PDF, indicadores económicos en tiempo real y analítica con Vercel.
stack:
  - Astro 5
  - React 19
  - TailwindCSS v4
  - Strapi 5
  - PWA (Workbox)
  - jsPDF
  - Vercel Analytics
url: https://www.accolombianlawyers.com
image:
  src: /images/projects/ac-colombian-lawyers.png
  alt: Captura del portal AC Colombian Lawyers con noticias jurídicas y barra de indicadores económicos.
  width: 1600
  height: 1000
featured: true
order: 1
meta:
  role: Frontend Developer
  client: Centro Jurídico Internacional
  year: '2025'
  type: Portal jurídico y de noticias
---

## Contexto

El Centro Jurídico Internacional necesitaba un medio propio para publicar noticias, análisis jurídicos, revistas digitales y herramientas para empresas. La restricción era doble: el equipo editorial debía poder publicar sin pedirle nada a un desarrollador, y el sitio tenía que cargar rápido incluso en redes móviles colombianas.

## Lo que hice

### 01 · Strapi 5 como CMS desacoplado

Los editores entran a un admin ya personalizado (plugin de CKEditor 5, textos en español, categorías propias) y crean noticias, autores, revistas y cápsulas en video. El frontend consume todo por API con Bearer token y lo mapea a componentes Astro.

### 02 · Astro 5 con SSR + ISR de Vercel

Cada ruta se pre-renderiza bajo demanda y queda cacheada un año en el edge. Cuando un editor publica algo en Strapi, un webhook invalida solo las URLs afectadas. El resto sigue sirviéndose desde caché.

### 03 · PWA con estrategias de caché por tipo de asset

Configuré Workbox para que las revistas PDF se cacheen `CacheFirst` 30 días (rara vez cambian), las imágenes de Strapi `StaleWhileRevalidate` 7 días, y los JSON de noticias `NetworkFirst` con fallback offline. En la práctica, el sitio se siente instantáneo al segundo o tercer click.

### 04 · Seis calculadoras laborales y revistas con visor propio

Liquidación, indemnización por despido, horas extras y tres más. Cada una es una isla React con `client:visible` para no pagar el JavaScript si el usuario no baja hasta esa sección. Las revistas PDF las abro con un visor construido sobre pdfjs-dist y animación de páginas.

### 05 · Vercel Analytics + indicadores económicos en vivo

Analítica real de usuarios (no sintética) integrada directo con el adapter de Vercel. En la barra superior, TRM, EUR, UVR e IBC se consumen de fuentes públicas (datos.gov.co, Superfinanciera) y se cachean en el edge con fallback de "último valor conocido" si el proveedor tarda.

## Resultado

- Portal en producción cubriendo derecho laboral, comercial, civil, administrativo, societario y noticias empresariales.
- Equipo editorial autónomo: siete categorías, autores y revistas nuevas sin tocar código.
- Tiempos de respuesta bajos en 3G colombiano gracias al ISR y al service worker.
- Integraciones externas sin fricción: YouTube, Spotify, datos.gov.co y Trigger Email de FireBase para el formulario de contacto.
