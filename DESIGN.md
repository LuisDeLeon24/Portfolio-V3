---
name: Luis De León — Portfolio
description: Firma de Luis De León — crema, burdeos, filete dorado
colors:
  cream: "#F3EBDD"
  cream-deep: "#E7DCCB"
  ink: "#120A0F"
  ink-soft: "#4A3A40"
  burgundy: "#66023C"
  burgundy-deep: "#4A012C"
  gold: "#8C6A2F"
  spark: "#FF5A1F"
typography:
  display:
    fontFamily: "Playfair Display, Iowan Old Style, Palatino, serif"
    fontSize: "clamp(3.4rem, 5.4vw, 5rem)"
    fontWeight: 500
    fontStyle: italic
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Playfair Display, Iowan Old Style, Palatino, serif"
    fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)"
    fontWeight: 500
    fontStyle: italic
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "IBM Plex Sans, Segoe UI, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  none: "0px"
  sm: "2px"
  control: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "96px"
  gallery: "120px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.burgundy-deep}"
    textColor: "{colors.cream}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 18px"
  tab-active:
    backgroundColor: "{colors.cream-deep}"
    textColor: "{colors.burgundy-deep}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  tab-idle:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
---

# Design System

## Overview

**Firma.** El portfolio abre con la firma de Luis De León: Playfair Display itálica, tilde de León en chispa naranja (`#FF5A1F`) y filete dorado solo bajo «De León». El monograma LDL vive en la cabecera y el favicon. Fondo crema, tinta y burdeos. El naranja no se usa como segundo color de marca. Grano de papel y un corte en el fondo, nunca sobre el logo. Lema «Learn, Build, Repeat» aislado, al cierre. Tagline «Del miedo al prototipo.» aparte del nombre.

Implementación viva en `web/` (Vite + React). Toggle ES/EN con preferencia en `localStorage`.

**Contenido:** la copia y los ítems viven en JSON por sección (`web/src/content/`). No hay CTF ni research: solo trabajo con demo, repositorio o premio, certificaciones con credencial, y reconocimientos que se pueden señalar.

## Colors

El burdeos manda. La crema es la base. La tinta es el texto. El dorado es filete. El naranja es una chispa: la tilde y, como mucho, un acento por pieza.

## Typography

- **Firma y títulos:** Playfair Display itálica. Nunca una sans en el nombre.
- **Texto:** IBM Plex Sans.
- **Etiquetas:** IBM Plex Mono.
- Tagline en dos líneas, separada de la firma: `Del miedo al` / `prototipo.`

## Layout

**Home:** firma → tagline y frase → about → experiencia → trabajo (proyectos / certificaciones) → premios → educación → lema. Contenedor ~1180px.

**Archivos**

| Categoría | Ruta |
| --- | --- |
| Proyectos | `/e/projects` |
| Certificaciones | `/e/certs` |
| Premios | `/premios` |

## Elevation & Depth

Profundidad por **luz y overlap**, no por cards con sombra suave genérica. Montajes proyectan sombra offset suave como pieza colgada. Evitar glass, halos y bordes+sombra a la vez.

## Shapes

Controles casi rectos. El hero es la firma a la izquierda y las fotos a la derecha, con un filete dorado en el marco. El corte del fondo no toca el logo.

## Components

- **Nav / lang toggle:** etiquetas en mono.
- **Tabs del hub:** reposo en tinta; activo en crema profunda y burdeos.
- **Ver más:** botón en tinta; hover en burdeos.
- **Footer CTA:** correo + redes como colofón de sala.
- **Placeholders:** etiquetados `[placeholder]` / `featureArt` hasta assets reales.

## Motion

Intencional y escaso. Respetar `prefers-reduced-motion`.

## Do's and Don'ts

**Do:** firma con tilde naranja y filete dorado solo bajo «De León»; lema aislado del nombre; afirmar solo lo que tiene demo, repo, premio o credencial; ES primero, EN al lado.

**Don't:** CTF, research vacío, métricas sin fuente, tono de gurú, naranja como segundo color, sans en la firma, glitch o efectos sobre el logo, símbolos religiosos, circuitos, robots o cerebros.
