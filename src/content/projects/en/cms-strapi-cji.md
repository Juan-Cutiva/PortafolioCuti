---
title: Strapi CMS — Centro Jurídico Internacional
description: Customization of Strapi 5 as the group's editorial backend. Collections, custom CKEditor plugin, Spanish-first admin, granular roles and webhooks back to the frontends.
stack:
    - Strapi 5
    - SQLite
    - CKEditor 5
    - React 18
    - TypeScript
order: 4
meta:
    role: Backend / Strapi configuration
    client: Centro Jurídico Internacional
    year: '2025'
    type: Headless CMS
    issuer: Centro Jurídico Internacional
image:
    src: /images/projects/cms-strapi-cji.png
    alt: Dashboard of the customized Strapi instance for Centro Jurídico Internacional, showing collections and recent activity.
    width: 1600
    height: 1000
---

## Context

Strapi itself is a full-featured open source CMS. What I did here was adapt it to the editorial needs of Centro Jurídico Internacional: model the content, customize the admin so the non-technical team feels at home, wire up roles and permissions, and keep it in sync with the two frontends (AC Colombian Lawyers and Actualidad Jurídica Empresarial).

This project has no public URL; it's a private panel only the editorial team and admins access.

## What I did

### 01 · Content model with collections

News (`new`), Authors, Categories, Opinion Articles, Banners (split for AC Colombian Lawyers and Actualidad Jurídica Empresarial), Event Banners, PDF Magazines, CJI Media, Success Capsules, Legal Capsules, Interview URLs, Vertical Pautas, Pauta Images and Codes. Each with its relations (author → news, category → news, etc.) and validations.

### 02 · Custom CKEditor 5 plugin

Strapi's default rich text fell short for legal articles (quotes, blocks, attributed links). I integrated `@_sh/strapi-plugin-ckeditor` and configured it with the toolbar and styles the team needs.

### 03 · Admin in Spanish and with the client's identity

Own logo, CJI green theme, UI strings forced to Spanish and `<html translate="no">` so Google Translate doesn't break labels. The result: a panel that feels like their own, not a generic Strapi instance.

### 04 · Lifecycle hooks for slugs and search

Every published entry generates its `slug` and a `tituloNormalizado` (no accents, lowercase) automatically, without the editor having to type them. That directly feeds the frontend's search.

### 05 · Upload with responsive breakpoints

The upload plugin is configured with five breakpoints: xlarge 1920 (hero/banners), large 1000 (main news images), medium 750 (cards), small 500 (thumbnails) and xsmall 96 (micro-thumbnails in search suggestions). Plus `sizeOptimization` and `autoOrientation` enabled. Each uploaded image automatically generates its variants; the frontends request the one they need.

### 06 · Granular roles and permissions

`users-permissions` plugin with four tiers: editor (creates/edits own news), publisher (all news), super admin (everything) and public API (read-only of published content).

### 07 · Webhooks to frontend for ISR revalidation

Every publish or edit fires a webhook to the matching frontend (AC Colombian Lawyers or Actualidad Jurídica Empresarial) that invalidates ISR only for that URL — not the whole site. Editors see their changes live in production within seconds.

## Outcome

- 186 entries in production today, across published, modified and drafts.
- Two frontends consuming the same CMS without conflicts.
- Autonomous editorial team: they publish news, capsules, interviews and magazines without asking development.
