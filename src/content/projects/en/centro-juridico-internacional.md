---
title: Centro Jurídico Internacional
description: The firm's main website, built with Astro 6 and React 19 and embedded as an SPA inside the client's WordPress. Forms connected to Firebase only for email delivery.
stack:
    - Astro 6
    - React 19
    - TailwindCSS v4
    - Firebase (emails)
url: https://centrojuridicointernacional.co
image:
    src: /images/projects/centro-juridico-internacional.png
    alt: Screenshot of the Centro Jurídico Internacional corporate site.
    width: 1600
    height: 1000
order: 5
meta:
    role: Frontend Developer
    client: Centro Jurídico Internacional
    year: '2025'
    type: Company main website
---

## Context

The firm's main website — the first stop for anyone looking for services, membership plans, team and offices. There was an old WordPress in place and they didn't want to migrate the whole thing at once. The call was to replace the sections that convert the most and embed them as an Astro SPA inside the existing WordPress via iframe, leaving the rest as-is while the transition is completed.

## What I did

### 01 · Astro 6 in SSR mode with pre-rendered routes

The project is set up as `output: server` with the Vercel adapter, but every route marks `prerender = true` to ship as static HTML. That keeps the door open for future dynamic endpoints (payment gateways, forms) without reconfiguring.

### 02 · Layout-less routes for iframe embedding

I created variants of certain pages (`/shared-footer`, `/funcionarios/`, `/pagos/respuesta`) that render only the content, no header or footer. Those are the ones WordPress consumes inside the iframe, so the end user gets a consistent experience without duplicated chrome.

### 03 · Firebase only for emails

Firebase doesn't handle auth or site data. It's used only as a delivery channel: when someone fills the contact form or books a consultation, the endpoint writes to a Firestore collection that triggers Trigger Email for the actual sending. Server-side credentials only, never in the client bundle.

## Outcome

- Main site in production with modern views on top of the legacy WordPress.
- Stable iframe embed: the end user doesn't notice the cut between technologies.
