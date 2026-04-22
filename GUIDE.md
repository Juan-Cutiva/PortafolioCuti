# Guía de contenido

Cómo añadir, editar o reordenar el contenido del portafolio sin tocar componentes ni rutas.

Toda la información vive en:

- `src/content/projects/` — un `.md` por proyecto
- `src/content/education/` — un `.md` por formación
- `src/content/certifications/` — un `.md` por certificación
- `src/content/personal/` — página "sobre mí" (lado personal)
- `src/data/skills.ts` — stack (tecnologías)
- `src/data/experience.ts` — historial laboral
- `src/data/navigation.ts` — menú del header

---

## A. Añadir un proyecto

**1.** Crear `src/content/projects/mi-proyecto.md`. El nombre del archivo es el slug (`/projects/mi-proyecto`).

**2.** Frontmatter + cuerpo Markdown:

```md
---
title: Nombre del Proyecto
description: Una o dos frases que resumen qué hace el proyecto.
stack:
  - Astro
  - TypeScript
  - TailwindCSS
url: https://mi-proyecto.com
repoUrl: https://github.com/usuario/repo
image:
  src: /images/projects/mi-proyecto.png
  alt: Descripción accesible de la captura.
  width: 1600
  height: 1000
featured: true
order: 1
meta:
  role: Frontend Developer
  client: Nombre del cliente
  year: '2025'
  type: Tipo de proyecto
---

## Contexto

Qué problema resuelve, para quién, en qué contexto.

## Decisiones técnicas

### 01 · Nombre de la decisión

Cuerpo explicando la decisión.

## Resultado

- Logro con métrica si se puede.
```

| Campo | Obligatorio | Notas |
|---|:---:|---|
| `title` | ✅ | Nombre visible. |
| `description` | ✅ | Grid + OG image. |
| `stack` | ✅ | Array de tecnologías. |
| `url` | — | Sitio en vivo → botón "Ver sitio". |
| `repoUrl` | — | Repo público → botón "Ver código". |
| `image` | — | Si falta, placeholder con iniciales. |
| `featured` | — | `true` añade badge "Destacado". |
| `order` | — | Menor primero. Default `100`. |
| `meta` | — | Meta grid del case study. Todos opcionales. |

**3.** (Opcional) Captura a `public/images/projects/mi-proyecto.png`.

**4.** Para versión inglés: crear `src/content/projects/en/mi-proyecto.md` con el mismo slug, frontmatter traducido y cuerpo en inglés.

---

## B. Añadir una certificación (imagen o PDF)

**1.** Crear `src/content/certifications/mi-cert.md`.

**Con imagen** (PNG/JPG directa):

```md
---
name: Nombre del curso
issuer: Platzi
url: https://platzi.com/p/usuario/curso/mi-cert/diploma/detalle/
icon: simple-icons:platzi
description: Descripción breve.
image:
  src: /images/certifications/mi-cert.png
  alt: Certificado de Platzi — Nombre del curso.
order: 1
meta:
  issuer: Platzi
  type: Curso profesional
---

## Qué aprendí

- Punto 1.
- Punto 2.
```

**Con PDF** (se convierte a PNG automáticamente):

```md
---
name: Nombre del curso
issuer: Platzi
url: https://platzi.com/p/usuario/curso/mi-cert/diploma/detalle/
icon: simple-icons:platzi
description: Descripción breve.
pdf: /certifications/mi-cert.pdf
order: 1
meta:
  issuer: Platzi
  type: Curso profesional
---

## Qué aprendí

- Punto 1.
```

Flujo automático para PDFs:

1. Subes el PDF a `public/certifications/mi-cert.pdf`.
2. En el siguiente `npm run dev` o `npm run build`, el hook `predev`/`prebuild` corre `scripts/generate-pdf-previews.mjs` y genera `public/images/certifications/mi-cert.png` (1700 px, primera página).
3. La página del certificado sirve el PNG como imagen estática. El enlace "Ver PDF" queda en el pie.
4. Para regenerar manual: `npm run previews`.

El script solo regenera si el PDF es más reciente que el PNG existente.

**2.** Subir el archivo:

- Imagen → `public/images/certifications/mi-cert.png`
- PDF → `public/certifications/mi-cert.pdf` (el PNG se genera solo)

---

## C. Añadir formación (educación)

**1.** Crear `src/content/education/mi-estudio.md`.

```md
---
institution: Nombre de la institución
degree: Título obtenido
period: '2025 — 2027'
description: Resumen corto de una línea.
url: https://institucion.edu
image:
  src: /images/education/mi-estudio.jpg
  alt: Descripción de la foto de la institución.
  width: 1600
  height: 1000
order: 1
meta:
  type: Tipo de formación
  location: Ciudad, País
  duration: Duración formateada
  issuer: Nombre del emisor
---

## Sobre la institución

Texto libre en Markdown.
```

**2.** Foto opcional en `public/images/education/mi-estudio.jpg`.

---

## D. Añadir una skill (tecnología)

Editar `src/data/skills.ts`:

```ts
{
  name: 'Vue',
  icon: 'simple-icons:vuedotjs',
  category: 'frontend', // frontend | base | tooling | language
  url: 'https://vuejs.org'
}
```

- `icon`: busca el nombre en [icones.js.org](https://icones.js.org). Usa `simple-icons` (logos de marca) o `lucide` (genéricos).
- `category`: controla en qué grupo aparece.
- `url`: si se define, la tarjeta se vuelve un link al sitio oficial.

---

## E. Añadir experiencia laboral

Editar `src/data/experience.ts`. Hay un objeto `experienceByLocale` con arrays `es` y `en`. Añade a ambos idiomas:

```ts
{
  role: 'Mi nuevo rol',
  company: 'Empresa',
  period: '2026 — Presente',
  location: 'Ciudad, País',
  description: 'Resumen del rol.',
  highlights: [
    'Logro 1 con métrica.',
    'Logro 2.'
  ]
}
```

Del más reciente al más antiguo — el orden del array se respeta.

---

## F. Añadir o reordenar ítems del menú

Editar `src/data/navigation.ts`:

```ts
{ labelKey: 'nav.contact', href: '/contact' }
```

`labelKey` debe existir en `src/i18n/ui.ts` (dicts `es` y `en`). Si quieres un label nuevo, añade la llave a ambos diccionarios primero.

Esta lista alimenta el Header desktop y el drawer móvil.

---

## G. Editar la página "Sobre mí"

La página `/sobre-mi` (ES) y `/en/sobre-mi` (EN) se renderizan desde markdown:

- ES: `src/content/personal/sobre-mi.md`
- EN: `src/content/personal/en/sobre-mi.md`

El frontmatter define toda la estructura (fotos, cards, quote, CTA). El cuerpo markdown es la sección narrativa de "Quién soy".

Fotos esperadas en `public/images/about/`:

- `portrait.jpg` (retrato principal, grid 2 filas en desktop)
- `casual.jpg`
- `hobby.jpg`
- `drive-to-survive.jpg` (columna "Lo que veo")
- `moto.jpg` (columna "Lo que me saca del código")

Cuando falta una imagen, aparece un placeholder con la ruta esperada como pista.

Para embeds de Spotify en la columna "Lo que escucho", usa:

```yaml
embed:
  type: spotify-artist   # o spotify-album | spotify-track | spotify-playlist
  id: 19HM5j0ULGSmEoRcrSe5x3   # último segmento de la URL de Spotify
```

Para links inline en los body de cards, usa sintaxis markdown `[texto](url)` — se renderizan como `<a>` con estilo consistente. `**negrita**` también funciona.

---

## H. Traducir al inglés

El portafolio usa i18n nativo de Astro con `defaultLocale: 'es'` y `prefixDefaultLocale: false`. Español vive en la raíz; inglés bajo `/en/`.

Para cada pieza de contenido:

1. **Case studies** (`projects`, `education`, `certifications`): crear un `.md` espejo en `en/<mismo-slug>.md` con frontmatter y cuerpo en inglés.
2. **Página personal**: ver sección G.
3. **UI chrome** (nav, footer, botones, labels): editar `src/i18n/ui.ts` — cada llave tiene entrada en `es` y `en`.
4. **Datos** (`experience.ts`): añadir entry al array `en`.

El selector de idioma del header emite `data-astro-reload` al cambiar de locale para forzar un reload completo y refrescar el `<html lang>`, canonicals y Open Graph.

---

## Comandos útiles

```sh
npm run dev        # dev server (pre-hook: regenera PNGs de PDFs nuevos)
npm run build      # build producción (mismo pre-hook)
npm run preview    # sirve el build local
npm run previews   # regenera manualmente PNGs de todos los PDFs
npm run astro check   # chequeo de tipos
```

---

## Stack de referencia

- **Astro 6** con `output: 'server'` + adapter de Vercel. Todas las páginas marcan `prerender = true`; el único endpoint SSR es `/api/og`.
- **TailwindCSS v4** con tokens OKLCH y utilidades fluidas vía `clamp()`.
- **motion v12** cargado dinámicamente — solo se descarga en rutas que lo necesitan.
- **satori** + **sharp** para Open Graph dinámico.
- **pdfjs-dist** + **@napi-rs/canvas** para previews de PDF al build.
- **Content Collections** (Content Layer API) con schemas Zod.
- **TypeScript** estricto.

Node ≥ 22.12.

---

## Convenciones

- Comentarios en español, identificadores en inglés.
- Commits: Conventional Commits, cuerpo opcional en español.
- Path aliases en [tsconfig.json](tsconfig.json): `@/*`, `@components/*`, `@layouts/*`, `@styles/*`.
