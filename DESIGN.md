---
name: Luis De León — Portfolio
description: Galería personal con hang disperso — geométrica, artística, relajada
colors:
  plaster: "#EEF0F2"
  plaster-deep: "#E2E5EA"
  ink: "#14161A"
  ink-soft: "#3A3F47"
  wall-shadow: "#C8CDD6"
  accent: "#3D5A80"
  accent-deep: "#2A4060"
  accent-soft: "#D6E0EC"
  wine: "#7A2E3B"
  wine-deep: "#5C2230"
  wine-soft: "#EDD8DC"
  highlight: "#F7F8FA"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Gill Sans, Trebuchet MS, sans-serif"
    fontSize: "clamp(2.75rem, 8vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bricolage Grotesque, Gill Sans, Trebuchet MS, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque, Gill Sans, Trebuchet MS, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Bricolage Grotesque, Gill Sans, Trebuchet MS, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.02em"
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
    textColor: "{colors.highlight}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.wine-deep}"
    textColor: "{colors.highlight}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 18px"
  tab-active:
    backgroundColor: "{colors.wine-soft}"
    textColor: "{colors.wine-deep}"
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

**Galería · hang disperso.** El portfolio se comporta como una sala de exposición: mucho aire, pocos objetos a la vez, montajes geométricos (romboides y trapecios), y un archivo denso que solo se abre cuando el visitante pide “ver más”. Luz de sala (día interior, cool-neutral) — no neon, no pitch comercial. El trabajo lidera; el chrome de UI se lee como etiquetas de muro y controles de sala.

Implementación viva en `web/` (Vite + React). Composición hero: nombre monumental apilado a la izquierda (`LUIS DE` / `LEÓN`), collage de fotos apiladas a la derecha (`HeroCollage` + `assets/principal/`), ficha de muro (focus + tagline) bajo el nombre. Toggle ES/EN con preferencia en `localStorage`.

**Contenido:** la copia y los ítems no viven en los componentes — se editan en JSON por sección (`web/src/content/`). Ver `PRODUCT.md` → *Content architecture* y `web/src/content/README.md`.

## Colors

Estrategia **Restrained**: neutrales de yeso/plaster + acento azul-acero mate (`accent`) para estructura y enlaces en reposo. Toques **vino** (`wine` / `wine-deep` / `wine-soft`) como acentos pequeños: números de sección, metas, org de premios, hovers, tab activo, focus ring. El yeso es cool (`#EEF0F2`), no cream cálido. Nunca glow, nunca gradientes de marketing púrpura.

## Typography

- **Display / UI:** Bricolage Grotesque — geometría imperfecta, carácter de sala contemporánea.
- **Body / lectura:** Source Serif 4 — ritmo de wall text / ficha de obra (también títulos grandes de premios).
- Escala generosa en el nombre (hero); tagline en dos líneas (`Building fast,` / `Shipping faster`).
- Labels de muro y skills: caps suaves + tracking ligero; subrayado fino vino en skills, no pills redondeadas.

## Layout

**Home:** hero → about (+ skill tags) → experiencia → hub de experimentos → premios (lista) → educación → footer. Contenedor ~1180px con márgenes generosos.

**Patrón de categorías de experimentos:** carrusel **Destacados** a viewport completo (bleed / split) → archivo con layout propio por categoría → “Ver más” desde home apunta a `/e/:tab`.

### Layouts de archivo (por categoría)

| Categoría | Archivo después de Destacados |
| --- | --- |
| Proyectos | Rail: último grande sticky + grid / masonry de piezas |
| CTFs & Labs | Filas full-viewport alternadas; media horizontal con clip trap/rhomb |
| Research | Pin sticky: scroll vertical de página mueve el rail horizontal (~2 cards + peek) |
| Certs | Hang disperso (piezas con montaje geométrico) |
| Premios (`/premios`) | Bloques por logro: título serif que se solapa a media irregular a la derecha; org/año/por qué a la izquierda sin solaparse; máscara ~40% sobre la imagen; flechas si hay varias `images` |

Home premios: lista tipo rail (sin montajes); las imágenes viven solo en `/premios`.

## Elevation & Depth

Profundidad por **luz y overlap**, no por cards con sombra suave genérica. Montajes proyectan sombra offset suave como pieza colgada. Evitar glass, halos y bordes+sombra a la vez.

## Shapes

Ley de forma: **romboides, trapecios, paralelogramos** para media (`clip-path`). Controles UI casi rectos (`rounded.sm` 2px) — la rareza vive en la obra, no en pills. Sin cards redondeadas de producto SaaS. Hero: collage de fotos con marco oscuro, sombra y rotación leve; nombre tipográfico apilado a la izquierda.

## Components

- **Nav / lang toggle:** etiquetas de muro; idioma activo con tint wine-soft.
- **Tabs del hub:** idle/active; active usa wine-soft / wine-deep.
- **About skills:** fila de etiquetas bajo el párrafo (`aboutSkills` en principal JSON).
- **Featured showcase:** autoplay, pause on hover, ←/→ + segmentos; CTA a ficha + scroll al `#archivo`.
- **Ver más:** control primario quieto (tinta); hover a wine-deep.
- **Footer CTA:** correo + redes como colofón de sala.
- **Placeholders:** etiquetados `[placeholder]` / `featureArt` hasta assets reales.

## Motion

Intencional y escaso: entrada tipográfica + slash del hero; reshaping suave al cambiar tabs; research pin traduce scroll Y → X; featured autoplay ~5.5s. Respetar `prefers-reduced-motion` (research vuelve a scroll horizontal nativo).

## Do's and Don'ts

**Do:** aire de galería; montajes angulares; tono de “mostrar trabajo”; ES-first + toggle EN; evidencia real o placeholder marcado; editar hechos en JSON de sección; acentos vino pequeños.

**Don't:** plantilla reclutador; glow cyber/IA; cards uniformes de icono+texto; pitch comercial; cream+terracota por defecto; Inter/Space Grotesk/Playfair como atajo; inventar premios o métricas; enterrar copy solo en componentes React.
