# Tareas manuales pendientes

Lo que falta hacer antes del deploy (y después). Los ítems ya completados no aparecen aquí — la guía de cómo añadir contenido vive en [GUIDE.md](GUIDE.md).

---

## Bloqueantes pre-deploy

- [ ] **Definir dominio de producción**
  Sin esto, `sitemap-index.xml`, `<link rel="canonical">` y todos los `og:*` apuntan al placeholder `https://tudominio.com`.
  - Vercel → Project Settings → **Environment Variables**: `PUBLIC_SITE_URL=https://<tu-dominio>`.
  - Local: copiar `.env.example` a `.env`.
- [ ] **Descomentar la línea `Sitemap:`** en [public/robots.txt](public/robots.txt) y reemplazar el dominio.

---

## Validaciones post-deploy

- [ ] Primer deploy a Vercel.
- [ ] Probar `/api/og?type=project&slug=ac-colombian-lawyers` en producción (verificar que devuelve PNG 1200×630 y no redirige al fallback).
- [ ] Verificar previews en:
  - LinkedIn Post Inspector
  - Meta/Facebook Sharing Debugger
  - X (Twitter) Card Validator
- [ ] Submit del sitemap (`/sitemap-index.xml`) en Google Search Console.
- [ ] Verificar rich results con [Google Rich Results Test](https://search.google.com/test/rich-results) en:
  - `/` (ProfilePage + Person + WebSite)
  - `/projects/<cualquiera>` (CreativeWork + BreadcrumbList)
  - `/education/<cualquiera>` (EducationalOccupationalProgram)
  - `/certifications/<cualquiera>` (EducationalOccupationalCredential)
  - `/sobre-mi` (AboutPage)
  - `/contact` (ContactPage)
- [ ] Verificar Core Web Vitals en producción (LCP/CLS/INP) con PageSpeed Insights en mobile.
- [ ] Confirmar que `hreflang="es-CO"` / `hreflang="en"` + `x-default` aparecen en el `<head>` de las páginas listadas en el sitemap.

---

## Opcionales / mejoras futuras

- [ ] Reemplazar `public/og-image.png` por una imagen de marca propia (fallback si `/api/og` falla en cold start).
- [ ] Añadir analytics (Vercel Analytics, Plausible, o similar).
- [ ] Añadir un proyecto personal con `repoUrl` público (los 5 actuales son de cliente).
- [ ] Traducir la página de contacto al inglés si se añade un formulario — actualmente es mínima y reusa el componente compartido.

---

## Cómo marcar un ítem como hecho

Cuando completes algo de arriba, **bórralo del archivo en vez de marcarlo con `[x]`**. Este archivo solo lista lo pendiente.
