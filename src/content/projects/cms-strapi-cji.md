---
title: CMS Strapi — Centro Jurídico Internacional
description: Personalización de Strapi 5 como backend editorial del grupo. colecciones, plugin CKEditor custom, admin en español, roles granulares y webhooks hacia los frontends.
stack:
  - Strapi 5
  - SQLite
  - CKEditor 5
  - React 18
  - TypeScript
order: 4
meta:
  role: Backend / Configuración Strapi
  client: Centro Jurídico Internacional
  year: '2025'
  type: CMS headless
  issuer: Centro Jurídico Internacional
image:
  src: /images/projects/cms-strapi-cji.png
  alt: Dashboard del Strapi personalizado del Centro Jurídico Internacional con colecciones y actividad reciente.
  width: 1600
  height: 1000
---

## Contexto

Strapi es un CMS open source completo. Lo que hice aquí fue adaptarlo a las necesidades editoriales del Centro Jurídico Internacional: modelar el contenido, personalizar el admin para que el equipo no técnico se sintiera cómodo, conectar roles y permisos, y dejarlo conectado con los dos frontend's (AC Colombian Lawyers y Actualidad Jurídica Empresarial).

Este proyecto no tiene URL pública; es un panel privado al que solo accede el equipo editorial y los administradores.

## Lo que hice

### 01 · Modelo de contenido con colecciones

Noticias (`new`), Autores, Categorías, Artículos de Opinión, Banners (separados para AC Colombian Lawyers y Actualidad Jurídica Empresarial), Banners de Evento, Revistas en PDF, CJI Medios, Cápsulas de Éxito, Cápsulas Legales, Entrevistas URL, Pautas Verticales, Imágenes de Pauta y Códigos. Cada colección con sus relaciones (autor → noticia, categoría → noticia, etc.) y sus validaciones.

### 02 · Plugin personalizado de CKEditor 5

El rich text por defecto de Strapi se quedaba corto para artículos jurídicos (citas, bloques, enlaces con atributos). Integré `@_sh/strapi-plugin-ckeditor` y lo configuré con la toolbar y estilos que el equipo necesita.

### 03 · Admin en español y con identidad del cliente

Logo propio, tema en verde del CJI, textos forzados a español para toda la UI del admin y `<html translate="no">` para que Google Translate no rompa etiquetas. Resultado: un panel que se siente propio, no una instancia genérica de Strapi.

### 04 · Lifecycle hooks para slugs y búsqueda

Cada entrada que se publica genera su `slug` y un `tituloNormalizado` (sin acentos, lowercase) automáticamente, sin que el editor tenga que escribirlos. Eso alimenta directamente al buscador de los frontends.

### 05 · Upload con breakpoints responsive

El plugin de upload está configurado con cinco breakpoints: xlarge 1920 (hero/banners), large 1000 (imágenes principales), medium 750 (tarjetas), small 500 (thumbnails) y xsmall 96 (micro-thumbnails en sugerencias de búsqueda). Además, `sizeOptimization` y `autoOrientation` activados. Cada imagen subida genera automáticamente sus variantes; los frontends piden la que necesitan.

### 06 · Roles y permisos granulares

Plugin `users-permissions` con cuatro niveles: editor (crea/edita sus noticias), publicador (todas las noticias), super admin (todo) y API pública (solo lectura de contenido publicado).

### 07 · Webhooks a frontend para revalidación ISR

Cada publicación o edición dispara un webhook al frontend correspondiente (AC Colombian Lawyers o Actualidad Jurídica Empresarial) que invalida el ISR solo de esa URL — no todo el sitio. Los editores ven sus cambios reflejados en producción en segundos.

## Resultado

- 186 entradas en producción al día de hoy, entre publicadas, modificadas y borradores.
- Dos frontends consumiendo el mismo CMS sin conflictos.
- Equipo editorial autónomo: publican noticias, cápsulas, entrevistas y revistas sin pedir nada a desarrollo.
