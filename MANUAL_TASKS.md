# Tareas manuales pendientes

Lo que falta hacer. Los ítems completados se borran del archivo — solo aparece lo pendiente. La guía de cómo añadir contenido vive en [GUIDE.md](GUIDE.md).

---

## 🚨 Crítico (bloquea SEO del deploy actual)

El sitio está deployado en **https://portafolio-cuti.vercel.app** pero el HTML publicado tiene `<link rel="canonical" href="https://tudominio.com/">`, `og:url`, `hreflang` y sitemap apuntando al placeholder. Sin esto arreglado, Google indexa mal y las previews sociales no funcionan.

- [x] **Setear `PUBLIC_SITE_URL` en Vercel**
  1. Vercel → tu proyecto → **Settings** → **Environment Variables**
  2. Añadir:
     - Name: `PUBLIC_SITE_URL`
     - Value: `https://portafolio-cuti.vercel.app`
     - Environments: marcar **Production**, **Preview**, **Development**
  3. Save
- [x] **Redeploy** (Vercel → Deployments → `...` del último deploy → **Redeploy**) — o hacer un nuevo commit, cualquier push dispara rebuild
- [x] **Verificar** que el HTML de producción ya tenga las URLs correctas:
  ```sh
  curl -s https://portafolio-cuti.vercel.app | grep 'rel="canonical"'
  # debe mostrar: <link href=https://portafolio-cuti.vercel.app/ rel=canonical>
  ```

---

## Validaciones post-fix

Una vez seteado `PUBLIC_SITE_URL` y redeployado:

- [x] Probar `/api/og?type=project&slug=ac-colombian-lawyers` en producción (debe devolver PNG 1200×630 y no redirigir al fallback).
- [x] Verificar previews sociales:
  - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
  - [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [X Card Validator](https://cards-dev.twitter.com/validator)
- [x] Submit del sitemap en Google Search Console:
      `https://portafolio-cuti.vercel.app/sitemap-index.xml`
- [x] Verificar rich results con [Google Rich Results Test](https://search.google.com/test/rich-results) en:
  - `/` (ProfilePage + Person + WebSite)
  - `/projects/<cualquiera>` (CreativeWork + BreadcrumbList)
  - `/education/<cualquiera>` (EducationalOccupationalProgram)
  - `/certifications/<cualquiera>` (EducationalOccupationalCredential)
  - `/sobre-mi` (AboutPage)
  - `/contact` (ContactPage)
- [x] Verificar Core Web Vitals en producción (LCP/CLS/INP) con [PageSpeed Insights](https://pagespeed.web.dev) en mobile.
- [x] Confirmar que `hreflang="es-CO"` / `hreflang="en"` + `x-default` aparecen en el `<head>` de las páginas listadas en el sitemap.

---

## Opcionales / mejoras futuras

- [ ] Reemplazar `public/og-image.png` por una imagen de marca propia (fallback si `/api/og` falla en cold start).
- [ ] Añadir analytics (Vercel Analytics — gratis con el plan hobby — o Plausible).
- [ ] Conectar un dominio custom (Vercel → Settings → Domains) y actualizar `PUBLIC_SITE_URL` y `public/robots.txt`.
- [ ] Añadir un proyecto personal con `repoUrl` público (los 5 actuales son de cliente).
- [ ] Traducir la página de contacto al inglés si se añade un formulario — actualmente es mínima y reusa el componente compartido.

---

## Cómo marcar un ítem como hecho

Cuando completes algo de arriba, **bórralo del archivo en vez de marcarlo con `[x]`**. Este archivo solo lista lo pendiente.
