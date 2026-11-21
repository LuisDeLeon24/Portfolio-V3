# Contenido editable (JSON)

Datos de las fichas, experiencia, educación y contacto. Las publicaciones se editan en `../data/publications.ts`. Cada entrada tiene un ID estable, formato, contenido en español e inglés y una fuente opcional (`to` para una página del portafolio, `href` para un PDF o un enlace externo). Solo las entradas con `status: 'published'` aparecen en el sitio. Hasta dos pueden llevar `featured: true`. Documentación de producto/diseño: `PRODUCT.md` y `DESIGN.md` en la raíz del repo.

Hay una versión `.es.json` y `.en.json` por sección. Edita → recarga.

| Archivo | Qué contiene |
| --- | --- |
| `principal.*.json` | Experiencia, educación, etiquetas, correo y redes |
| `proyectos.*.json` | Categoría Proyectos (`title`, `summary`, `items`) |
| `ctfs.*.json` | Archivo histórico de CTFs y laboratorios, fuera de la navegación pública |
| `research.*.json` | Research |
| `certificaciones.*.json` | Certificaciones |
| `premios.*.json` | Premios (chrome de sección + `items`) |

## About skills

```json
"aboutSkills": ["React", "TypeScript", "Node.js"]
```

## Ítem de proyecto / CTF / research / cert

```json
{
  "id": "slug-unico",
  "title": "Título",
  "blurb": "Resumen corto",
  "meta": "Contexto · año",
  "body": ["Párrafo 1", "Párrafo 2"],
  "links": [{ "label": "Demo", "href": "https://..." }],
  "featured": true,
  "featureSubtitle": "Subtítulo del carrusel",
  "featureArt": 0,
  "awarded": true
}
```

`featureArt` es 0–3. `featured: true` incluye la ficha en la selección de portada, siguiendo los [límites por categoría](../../../AGENTS.md). `awarded: true` muestra un ícono de trofeo en las tarjetas de proyectos.

## Imágenes de proyectos

Carpetas en `web/src/assets/proyects/` (mapeo en `projectMedia.ts`):

| `id` en JSON | Carpeta |
| --- | --- |
| `q-threats` | `Q-Treaths/` |
| `shoot-ai` | `Shoot AI/` |
| `q-pay` | `Q-pay/` |
| `sextant` | `Sextant/` |
| `aprendi` | `Arendi/` |
| `agent-builder` | `AgentBuilder/` |
| `astro-tracker` | `AstroTracker/` |
| `videntia` | `Videntia/` |
| `unmask-ai` | `Unmask/` |

Preferir un archivo con `Landing` / `Main` (o `Videntia 1`) en el nombre para la portada.

## Imágenes de CTFs & Labs

Archivos en `web/src/assets/ctf-labs/` (mapeo en `ctfMedia.ts`):

| `id` en JSON | Archivo |
| --- | --- |
| `fluid-attacks-ctf` | `Fluid Atacks CTF.jpg` |
| `advent-of-cyber` | `tryhackme Advent of Cyber.png` |

## Imágenes de certificaciones

Logos en `web/src/assets/certs/` (mapeo en `certMedia.ts`):

| `id` en JSON | Archivo |
| --- | --- |
| `cisco-it-essentials` | `Cisco Logo.png` |
| `cisco-ccna-intro` | `Cisco Logo.png` |
| `mongodb-ai-vector-search` | `MongoDB logo.png` |
| `itu-regulatory-innovation` | `ITU logo.png` |
| `fiusac-research-paper-writing` | `FIusac logo.png` |

## Premio

Igual que arriba, más:

```json
{
  "org": "Institución / evento",
  "year": "Mar 2026",
  "images": [0, 1, 2]
}
```

## Imágenes de premios

La sección de tarjetas muestra los premios con `featured: true` en el orden del JSON. Para incorporar el logo del emisor, guarda la imagen con el ID del premio en `web/src/assets/awards/logos/`, por ejemplo `cursor-tec-guatemala.svg`. Admite SVG, PNG, JPG, JPEG y WebP con extensión en minúsculas, y usa el mismo archivo en ambos idiomas. Mientras falta el logo se muestra el nombre de la entidad.

Archivos en `web/src/assets/awards/` (mapeo en `awardMedia.ts`):

| `id` en JSON | Archivo |
| --- | --- |
| `cursor-tec-guatemala` | `Cursor x tec.jpeg` |
| `cursor-buildathon-travel` | `Hackathon El salvador.jpeg` |
| `innovatech-2026` | `INNOVATECH.jpg` |
| `ufm-cs-hackathon` | `UFM CS Hackathon.jpeg` |
| `atom-dev-day` | `Atom dev day.jpeg` |
| `nasa-space-apps` | `NASA Space Apps.png` |
| `leadership-kinal` | `Kinal award.png` |
