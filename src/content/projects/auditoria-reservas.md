---
title: Auditoría de Reservas CJI
description: Plataforma de reserva de citas con Astro 6, Firebase y Google Sign-In. Transacciones ACID contra double-booking, middleware de auth y admin para gestionar profesionales.
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
  alt: Catálogo de profesionales del sistema de auditoría con la acción "Reservar cita" destacada.
  width: 1600
  height: 1000
order: 2
meta:
  role: Frontend Developer
  client: Centro Jurídico Internacional
  year: '2026'
  type: Plataforma de reservas
---

## Contexto

Antes del sistema, la gestión de usuarios y reservas dependía directamente del desarrollador. Crear, modificar o actualizar información requería intervención técnica, lo que generaba demoras y hacía el proceso poco escalable.

Se implementó un panel de administración que permite al equipo gestionar usuarios, profesionales y reservas de forma autónoma. Desde este panel pueden crear, editar y visualizar información en tiempo real, sin necesidad de soporte técnico.

Además, se automatizó el envío de correos para confirmaciones, modificaciones y cancelaciones de reservas, mejorando la comunicación con los clientes y reduciendo errores manuales.

Esto optimiza el flujo de trabajo, reduce la dependencia del desarrollador y mejora la eficiencia operativa del sistema.

## Lo que hice

### 01 · Transacciones ACID para evitar double-booking

Reservar un horario es una transacción Firestore: se lee el slot, si sigue libre se marca como `taken` en el mismo commit. Dos clientes que intenten el mismo minuto ven uno "reservado" y el otro "ya no disponible", sin entrar en estado inconsistente.

### 02 · Middleware de Astro para rate limit y auth

`src/middleware.ts` intercepta cada request:

- Valida cookie de sesión contra Firebase Auth (Google Sign-In como único provider).
- Aplica rate limit por IP persistente en Firestore (no in-memory) para que sobreviva cold starts.
- Bloquea rutas `/admin/*` y `/panel` si el usuario no tiene el rol correcto en custom claims.

### 03 · Validaciones server-side de fechas y festivos

Los calendarios no muestran festivos colombianos. Se consultan a [Nager.Date](https://date.nager.at) con caché de 24 horas en memoria de la function. Al reservar, el servidor revalida que la fecha no cayó en festivo entre cliente y servidor.

### 04 · Editor de foto de perfil con Cropper.js

Los profesionales pueden subir su foto desde el panel. Cropper.js hace el recorte en cliente (aspect 1:1), el resultado va a Firebase Storage con URLs firmadas. Actualizar una foto no requiere redeploy ni infla el repo.

## Resultado

- Flujo autoservicio con 13 profesionales (1 auditor + 12 jurídicos) en producción.
- Cero conflictos de doble reserva desde el arranque.
- Admin funcional para dar de alta, editar y eliminar profesionales.
- Panel privado por profesional para ver y gestionar sus citas.
- Validaciones de festivos, horarios y campos sin enviar nada sensible al cliente.
