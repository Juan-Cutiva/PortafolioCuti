---
title: Actualidad Jurídica Empresarial
description: The group's editorial and media arm. Astro 6, React 19 and Strapi 5 powering the company magazine, interviews, opinion columns and video content.
stack:
    - Astro 6
    - React 19
    - TailwindCSS v4
    - Strapi 5
url: https://actualidadjuridicaempresarial.com
image:
    src: /images/projects/actualidad-juridica-empresarial.png
    alt: Screenshot of Actualidad Jurídica Empresarial showing categories and the company magazine.
    width: 1600
    height: 1000
order: 3
meta:
    role: Frontend Developer
    client: Centro Jurídico Internacional
    year: '2026'
    type: Editorial portal and company magazine
---

## Context

If AC Colombian Lawyers is the group's legal portal, this is its editorial side: the company's own magazine, video interviews, opinion columns and multimedia capsules. The focus is media — news with a face, authors with a profile, and digital magazines you can flip through inside the site. It launched alongside AC Colombian Lawyers and shares the same Strapi backend.

## What I did

### 01 · Seven thematic verticals and the company magazine

Labor, Commercial, Civil, Administrative, Corporate, OHS, Family. Each one with its own statically generated `/categorias/[slug]` route. The company's own magazine has its own flow (`/revistas/[slug]`) with an in-browser PDF viewer, visible authors and issue-by-issue navigation.

### 02 · Interviews, capsules and embedded media

YouTube and Spotify integrated with no extra performance cost: embeds are lazy-loaded only when they enter the viewport. Interviews with the Ministry of Labor, legal capsules and opinion columns are their own Strapi collections — each type with its own template.

### 03 · Server-side Firebase Admin for contact and email

Forms don't touch Firebase from the client. The browser sends the POST to an Astro endpoint, that endpoint validates a rate limit (persisted in Firestore, not in memory) and writes to the `mail` collection that fires delivery via Trigger Email. A TTL policy automatically purges messages older than 90 days.

### 04 · PWA with real offline support

Astro build + vite-plugin-pwa + Workbox. The service worker precaches the shell and the last 20 news entries. If the user opens the site without a network, they see the last known state instead of an error. Per-asset strategies: `CacheFirst` for PDFs, `StaleWhileRevalidate` for images, `NetworkFirst` with timeout for JSON.

### 05 · Monthly cron to reset views

The "Most read" counter resets on day 1 of every month at 05:00 UTC. Implemented via a Vercel Cron job that hits an SSR endpoint with secret verification to prevent manual triggers.

### 06 · Image optimization at the edge

Author photos, magazine covers and video thumbnails are served via `/_vercel/image?url=...&w=...&q=...`. On 3G, the difference between pulling the raw asset from Strapi and pulling it optimized at the edge is several seconds per hit.

## Outcome

- Editorial portal in production at `actualidadjuridicaempresarial.com`.
- The group's own company magazine, with authors and periodic issues.
- Interviews and media integrated as CMS collections, no friction for the editorial team.
- Secure contact with no credentials exposed to the client.
- Monthly metrics that reset on their own, zero manual intervention.
