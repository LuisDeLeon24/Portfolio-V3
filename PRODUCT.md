# Product

<!-- impeccable:product-schema 1 -->

## Platform

web (`web/` — Vite + React + TypeScript + React Router)

## Users

Primary visitors are peers and technical readers who want to see what Luis De León has actually built. They come for the work, not a funnel.

## Product Purpose

A personal site for verifiable work: shipped projects, awards with a record, credentialed courses, and the roles he can name. Success means a visitor can read the signature, understand the craft, and open evidence.

## Positioning

He takes artificial intelligence from the idea to the build, and teaches others to build. Tagline: “Del miedo al prototipo.” Motto, always separate from the name: “Learn, Build, Repeat.” Head of Builders at Open2. Speaker. Student of Ingeniería en Ciencias y Sistemas at USAC.

## Operating Context

Content comes from shipped projects, prizes, named roles, and credentialed courses. Source of truth for copy and items is **editable JSON** under `web/src/content/`. Spanish is the default language, with an English toggle.

## Content architecture (keep this shape)

All visitor-facing content is split by section and language. Edit JSON → reload. Assembler: `web/src/i18n.ts`.

| File pair | Owns |
| --- | --- |
| `principal.es.json` / `principal.en.json` | Firma, tagline, rol, about, experiencia, educación, nav, footer, email y redes |
| `proyectos.es.json` / `proyectos.en.json` | Proyectos |
| `certificaciones.es.json` / `certificaciones.en.json` | Certificaciones |
| `premios.es.json` / `premios.en.json` | Premios |

Short how-to also lives in `web/src/content/README.md`.

### Work item shape (projects / certs)

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
  "featureArt": 0
}
```

- `featured: true` → category Destacados carousel  
- `featureArt`: `0`–`3` placeholder art seed  

### Award item shape

Same as work items, plus:

```json
{
  "org": "Institución / evento",
  "year": "Mar 2026",
  "images": [0, 1, 2]
}
```

Minimum useful award fields: **title**, **org**, **year**, **why** (`blurb` / `body`). Optional: `links` (evidence).

### About skills

`principal.*.json` → `aboutSkills: string[]` rendered as tags under the about paragraph.

## Information architecture & routes

**Home (`/`)** — scroll path:

1. Hero (name + focus + tagline + portrait mount)  
2. About (+ skill tags)  
3. Experience  
4. Experiments hub (tabs: projects / certs) — overview + **Ver más**  
5. Awards — list teaser + **Ver más**  
6. Education  
7. Footer (email + social)  

**Category archives**

- `/e/projects` — Destacados + projects archive
- `/e/certs` — Destacados + certifications
- `/e/:tab/:id` — item detail  

**Awards**

- `/premios` — Destacados + per-award blocks (title over irregular media, org/year/why clear of image)  
- `/premios/:id` — award detail  

## Capabilities and Constraints

- Personal brand name: **Luis De León**
- Content pillars: projects with a demo, repo, or prize; awards; credentialed courses
- Contact options present but not primary
- Hero is the signature in `BrandMark.tsx`: orange accent on León, gold fillet only under «De León»
- Tagline: “Del miedo al prototipo.”
- Motto, never locked to the name: “Learn, Build, Repeat”
- No CTF section, no research section, no unverifiable metrics

## Brand Commitments

- Name: Luis De León
- Tagline: “Del miedo al prototipo.”
- Motto: “Learn, Build, Repeat” (isolated)
- Phrase: “Llevo la inteligencia artificial de la idea a la ejecución.”
- Language: Spanish-first UI copy with an English toggle
- Tone: show the work; claim only what can be checked
- Color: cream `#F3EBDD`, burgundy `#66023C`, ink `#120A0F`, gold fillet `#8C6A2F`, orange spark `#FF5A1F` at a minimum dose
- Type: Playfair Display italic for the mark and titles; IBM Plex Sans for prose; IBM Plex Mono for labels  

## Evidence on Hand

- Projects and awards already on the site, with photos, demos, or repositories
- Roles named in the brand record: Head of Builders at Open2; software developer intern at Neonet (2025)
- Studies: USAC Ingeniería en Ciencias y Sistemas; Perito en Computación, Fundación Kinal
- Do not add: CTF writeups, a research track, GPA figures, or an email that is not `ldeleonb06@gmail.com`  

## Product Principles

1. Expertise over persuasion — let the work and writeups lead; contact stays available, not aggressive.  
2. Show the built record — projects, prizes, and named roles. No empty research shelf and no CTF lab that cannot be checked.  
3. Bilingual by default — Spanish-first, English reachable without a separate site.  
4. Truthful evidence — real wins and labeled placeholders; never invent credentials.  
5. Early-career honesty — show momentum (hackathons, shipping, learning) without pretending senior institutional proof.  
6. Content is data — edit section JSON; do not bury facts only in components.  
