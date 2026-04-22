---
title: Audit Booking — CJI
description: Appointment booking platform with Astro 6, Firebase and Google Sign-In. ACID transactions against double-booking, auth middleware and an admin panel to manage professionals.
stack:
    - Astro 6
    - TailwindCSS v4
    - Firebase Admin
    - Firebase Auth
    - Firebase Firestore
    - Firebase Storage
url: https://auditoria-reservas.vercel.app/citas/
image:
    src: /images/projects/auditoria-reservas.png
    alt: Catalog of professionals in the audit system, with the "Book appointment" action highlighted.
    width: 1600
    height: 1000
order: 2
meta:
    role: Frontend Developer
    client: Centro Jurídico Internacional
    year: '2026'
    type: Booking platform
---

## Context

Before the system, managing users and bookings relied directly on the developer. Creating, editing or updating information required technical intervention, which caused delays and made the process poorly scalable.

An admin panel was built so the team can manage users, professionals and bookings autonomously. From this panel they can create, edit and visualize information in real time without technical support.

Email notifications for confirmations, modifications and cancellations are sent automatically, improving communication with clients and reducing manual errors. The result: a smoother workflow, less dependency on the developer and better operational efficiency.

## What I did

### 01 · ACID transactions to prevent double-booking

Reserving a slot is a Firestore transaction: the slot is read and, if still free, marked as `taken` in the same commit. Two clients trying to book the same minute see one as "reserved" and the other as "no longer available", with no inconsistent state in between.

### 02 · Astro middleware for rate-limit and auth

`src/middleware.ts` intercepts every request:

- Validates the session cookie against Firebase Auth (Google Sign-In as the only provider).
- Applies per-IP rate-limiting persisted in Firestore (not in memory) so it survives cold starts.
- Blocks `/admin/*` and `/panel` routes if the user lacks the right role in custom claims.

### 03 · Server-side validation of dates and holidays

Calendars hide Colombian holidays. They are fetched from [Nager.Date](https://date.nager.at) with a 24-hour in-memory cache on the function. When booking, the server revalidates that the date didn't fall on a holiday between client and server.

### 04 · Profile photo editor with Cropper.js

Professionals can upload their photo from the panel. Cropper.js handles the crop on the client (1:1 aspect), and the result goes to Firebase Storage with signed URLs. Updating a photo doesn't require a redeploy or inflate the repo.

## Outcome

- Self-service flow for 13 professionals (1 auditor + 12 lawyers) in production.
- Zero double-booking conflicts since launch.
- Working admin to create, edit and delete professionals.
- Private panel per professional to manage their own appointments.
- Holiday, schedule and field validation with nothing sensitive sent to the client.
