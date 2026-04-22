---
title: AC Colombian Lawyers
description: Legal news and editorial portal built with Astro 5, React 19 and Strapi 5. Labor calculators, PDF magazines, live economic indicators and Vercel analytics.
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
    alt: Screenshot of the AC Colombian Lawyers portal showing legal news and the live economic indicators bar.
    width: 1600
    height: 1000
featured: true
order: 1
meta:
    role: Frontend Developer
    client: Centro Jurídico Internacional
    year: '2025'
    type: Legal and news portal
---

## Context

Centro Jurídico Internacional needed a media outlet of its own to publish news, legal analysis, digital magazines and tools for companies. Two constraints: the editorial team had to be able to publish without asking a developer, and the site had to load fast even on Colombian mobile networks.

## What I did

### 01 · Strapi 5 as a headless CMS

Editors log into a pre-customized admin (CKEditor 5 plugin, Spanish UI, own categories) and create news, authors, magazines and video capsules. The frontend consumes everything through the API with a Bearer token and maps it to Astro components.

### 02 · Astro 5 with SSR + Vercel ISR

Each route is rendered on demand and cached at the edge for a year. When an editor publishes something in Strapi, a webhook only invalidates the affected URLs. The rest keeps being served from cache.

### 03 · PWA with per-asset caching strategies

I configured Workbox so PDF magazines are `CacheFirst` for 30 days (they rarely change), Strapi images are `StaleWhileRevalidate` for 7 days, and news JSON uses `NetworkFirst` with an offline fallback. In practice, the site feels instant by the second or third click.

### 04 · Six labor calculators and magazines with a custom viewer

Severance, termination, overtime and three more. Each is a React island with `client:visible` so the JavaScript isn't paid for unless the user scrolls down. PDF magazines open with a viewer built on pdfjs-dist plus a page-turn animation.

### 05 · Vercel Analytics + live economic indicators

Real user analytics (not synthetic) wired straight into the Vercel adapter. In the top bar, TRM, EUR, UVR and IBC are pulled from public sources (datos.gov.co, Superfinanciera) and cached at the edge with a "last known value" fallback if the provider is slow.

## Outcome

- Portal in production covering labor, commercial, civil, administrative and corporate law, plus company news.
- Autonomous editorial team: seven categories, authors and new magazines without touching code.
- Low response times on Colombian 3G thanks to ISR and the service worker.
- Frictionless external integrations: YouTube, Spotify, datos.gov.co, and Firebase Trigger Email for the contact form.
