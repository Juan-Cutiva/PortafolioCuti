---
title: Actualidad Jurídica Empresarial
description: Brazo editorial y mediático del grupo. Astro 6, React 19 y Strapi 5 detrás de la revista de la empresa, las entrevistas, las columnas y los contenidos en video.
stack:
  - Astro 6
  - React 19
  - TailwindCSS v4
  - Strapi 5
url: https://actualidadjuridicaempresarial.com
image:
  src: /images/projects/actualidad-juridica-empresarial.png
  alt: Captura de Actualidad Jurídica Empresarial mostrando categorías y la revista empresarial.
  width: 1600
  height: 1000
order: 3
meta:
  role: Frontend Developer
  client: Centro Jurídico Internacional
  year: '2026'
  type: Portal editorial y revista empresarial
---

## Contexto

Si AC Colombian Lawyers es el portal jurídico del grupo, este es su lado editorial: la revista empresarial propia, las entrevistas en video, las columnas de opinión y las cápsulas multimedia. El enfoque es medios — noticias con cara, autores con perfil, y revistas digitales que se pueden hojear dentro del sitio. Se lanzó junto a AC Colombian Lawyers, compartiendo el mismo Strapi.

## Lo que hice

### 01 · Siete verticales temáticas y la revista empresarial

Laboral, Comercial, Civil, Administrativo, Societario, SG-SST, Familia. Cada una con su propia ruta `/categorias/[slug]` generada estáticamente. La revista empresarial propia tiene su propio flujo (`/revistas/[slug]`) con visor PDF en el navegador, autores visibles y navegación por número.

### 02 · Entrevistas, cápsulas y medios embebidos

YouTube y Spotify integrados sin costo de performance adicional: el embed lazy-loadea solo al entrar en viewport. Las entrevistas al Ministerio de Trabajo, las cápsulas legales y las columnas de opinión son colecciones propias de Strapi — cada tipo con su plantilla.

### 03 · Firebase Admin server-side para contacto y correos

Los formularios no tocan Firebase desde el cliente. El navegador manda el POST a un endpoint de Astro, ese endpoint valida rate limit (persistente en Firestore, no en memoria) y escribe en la colección `mail` que dispara el envío vía Trigger Email. Un TTL policy limpia automáticamente mensajes de más de 90 días.

### 04 · PWA con offline real

Astro build + vite-plugin-pwa + Workbox. El service worker precachea el shell y las últimas 20 noticias. Si el usuario abre el sitio sin red, ve el último estado en vez de un error. Estrategias por tipo: `CacheFirst` para PDFs, `StaleWhileRevalidate` para imágenes, `NetworkFirst` con timeout para JSON.

### 05 · Cron mensual para reset de vistas

El contador de "Las más leídas" se reinicia el día 1 de cada mes a las 05:00 UTC. Se implementa con un Cron job de Vercel que llama a un endpoint SSR con verificación de secret para evitar disparos manuales.

### 06 · Optimización de imágenes de Strapi en el edge

Las fotos de autores, portadas de revistas y thumbs de video se sirven vía `/_vercel/image?url=...&w=...&q=...`. En 3G la diferencia entre pedir el archivo crudo a Strapi y pedirlo optimizado en el edge son varios segundos por hit.

## Resultado

- Portal editorial en producción en `actualidadjuridicaempresarial.com`.
- Revista empresarial propia del grupo, con autores y números periódicos.
- Entrevistas y multimedia integradas como colecciones del CMS, sin fricción para el equipo editorial.
- Contacto seguro sin credenciales expuestas al cliente.
- Métricas mensuales que se reinician solas, cero intervención manual.
