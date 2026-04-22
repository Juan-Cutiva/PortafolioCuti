---
title: Centro Jurídico Internacional
description: Web principal de la firma, construida con Astro 6 y React 19, embebida como SPA dentro del WordPress del cliente. Formularios conectados a Firebase solo para el envío de correos.
stack:
  - Astro 6
  - React 19
  - TailwindCSS v4
  - Firebase (correos)
url: https://centrojuridicointernacional.co
image:
  src: /images/projects/centro-juridico-internacional.png
  alt: Captura del sitio corporativo del Centro Jurídico Internacional.
  width: 1600
  height: 1000
order: 5
meta:
  role: Frontend Developer
  client: Centro Jurídico Internacional
  year: '2025'
  type: Web principal de la empresa
---

## Contexto

Es la web principal de la firma: la primera parada de quien busca información sobre servicios, planes de membresía, equipo y sedes. Existía un WordPress viejo y no se quería migrarlo entero de una vez. La decisión fue reemplazar las secciones que más convierten y embeberlas como SPA Astro dentro de un iframe del WordPress actual, dejando el resto como estaba mientras se completa la transición.

## Lo que hice

### 01 · Astro 6 en modo SSR con rutas pre-renderizadas

El proyecto está configurado como `output: server` con adapter de Vercel, pero todas las rutas marcan `prerender = true` para salir como HTML estático. Esto deja la puerta abierta a añadir endpoints dinámicos (pasarelas de pago, formularios) sin reconfigurar.

### 02 · Rutas sin layout para embebido en iframe

Creé variantes de ciertas páginas (`/shared-footer`, `/funcionarios/`, `/pagos/respuesta`) que renderizan solo el contenido, sin header ni footer. Esas son las que el WordPress consume en el iframe. Así el cliente ve una experiencia homogénea sin chrome duplicado.

### 03 · Firebase solo para correos

Firebase no maneja la autenticación ni los datos del sitio. Se usa únicamente como canal de envío: cuando alguien rellena el formulario de contacto o agenda una consulta, el endpoint escribe en una colección de Firestore que dispara Trigger Email para el envío real. Credenciales server-side, nunca en el bundle del cliente.

## Resultado

- Web principal en producción con vistas modernas sobre la base legada de WordPress.
- Embebido iframe estable: el usuario final no percibe el corte entre tecnologías.
