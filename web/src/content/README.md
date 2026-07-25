# Contenido editable (JSON)

Fuente de verdad del copy. Documentación de producto/diseño: `PRODUCT.md` y `DESIGN.md` en la raíz del repo.

Hay una versión `.es.json` y `.en.json` por sección. Edita → recarga.

| Archivo | Qué contiene |
| --- | --- |
| `principal.*.json` | Hero, about (+ `aboutSkills`), experiencia, educación, nav, UI, email y redes |
| `proyectos.*.json` | Categoría Proyectos (`title`, `summary`, `items`) |
| `ctfs.*.json` | CTFs & Labs |
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

`featureArt` es 0–3. `featured: true` → Destacados. `awarded: true` → ícono de trofeo en cards de proyectos.

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

Archivos en `web/src/assets/CTF & Labs/` (mapeo en `ctfMedia.ts`):

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
