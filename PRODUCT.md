# Product

<!-- impeccable:product-schema 1 -->

## Platform

web (`web/` — Vite + React + TypeScript + React Router)

## Users

Primary visitors are peers, recruiters, and technical readers who want to explore Luis De León’s early-career work at the intersection of AI, cybersecurity, and research. They come to understand what he builds and studies — not to complete a sales funnel. Contact is available as a secondary option when someone wants to reach out.

## Product Purpose

A personal technical portfolio that documents Luis’s work and learning over time: projects, hackathon outcomes, awards, future CTF writeups, research/papers ambitions, and meaningful certifications. Success means a visitor can quickly grasp his focus areas and review concrete evidence of what he does.

## Positioning

Software developer and AI research enthusiast — building fast, shipping faster. Distinctive through the combination of AI + cybersecurity + research documentation (projects, writeups, papers path), rather than a generic “full-stack portfolio” pitch.

## Operating Context

Content comes from hackathons, prizes/awards, shipped projects, planned CTF writeups, papers, and certifications. Source of truth for copy and items is **editable JSON** under `web/src/content/` (not hard-coded pages). The site is bilingual: Spanish as the default language, with a toggle for English. Visitors explore expertise; they are not pushed through a conversion sequence.

Migration reference: prior portfolio at `../portfolio-v2` (real projects, awards, experience, education already partially migrated).

## Content architecture (keep this shape)

All visitor-facing content is split by section and language. Edit JSON → reload. Assembler: `web/src/i18n.ts`.

| File pair | Owns |
| --- | --- |
| `principal.es.json` / `principal.en.json` | Hero (brand, focus, tagline), about (+ `aboutSkills` tags), experience, education, nav/UI chrome, footer, `contactEmail`, `socialLinks` |
| `proyectos.es.json` / `proyectos.en.json` | Projects category (`title`, `summary`, `items`) |
| `ctfs.es.json` / `ctfs.en.json` | CTFs & Labs |
| `research.es.json` / `research.en.json` | Research |
| `certificaciones.es.json` / `certificaciones.en.json` | Certifications |
| `premios.es.json` / `premios.en.json` | Awards section chrome + `items` |

Short how-to also lives in `web/src/content/README.md`.

### Work item shape (projects / CTFs / research / certs)

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
4. Experiments hub (tabs: projects / CTFs & Labs / research / certs) — overview hang + **Ver más**  
5. Awards — list teaser + **Ver más**  
6. Education  
7. Footer (email + social)  

**Category archives**

- `/e/projects` — Destacados carousel + projects archive layout  
- `/e/ctfs` — Destacados + alternating full-viewport lab rows (irregular media)  
- `/e/research` — Destacados + scroll-driven horizontal research rail  
- `/e/certs` — Destacados + hang archive  
- `/e/:tab/:id` — item detail (prev/next in category)  

**Awards**

- `/premios` — Destacados + per-award blocks (title over irregular media, org/year/why clear of image)  
- `/premios/:id` — award detail  

## Capabilities and Constraints

- Personal brand name: **Luis De León**
- Content pillars: projects (often hackathon-origin), awards, CTF writeups, papers/research, weighty certifications
- Contact options present but not primary
- Content edits go through the JSON section files; keep ES and EN pairs in sync when changing facts
- Hero portrait asset: `web/src/assets/principal/me.webp`
- Open: hosting, LinkedIn/X URLs when ready

## Brand Commitments

- Name: Luis De León  
- Tagline: “Building fast,” / “Shipping faster” (two lines)  
- Focus framing: AI × cybersecurity × research  
- Language: Spanish-first UI copy with an English toggle  
- Tone: artistic and slightly experimental; show the work, never sell like a corporate/recruiter site  
- Image language: irregular crops/frames (rhomboids, trapezoids) over default rectangles  
- Accent: cool plaster + steel, with **small wine** accents (meta, section numbers, hovers)  
- No invented clients, benchmarks, employers, or awards — only real or clearly labeled placeholder content  

## Evidence on Hand

- Migrated from portfolio-v2 where real: Aprendi, Agent Builder, Astro Tracker, Videntia, Unmask AI; UFM / Atom Dev Day / NASA Space Apps / Kinal Leadership; Neonet internship; Kinal + USAC education  
- Still placeholder-heavy: CTFs, research notes, certifications  
- Absences future work must not fabricate: fake metrics, invented testimonials, unverified certs or prizes  

## Product Principles

1. Expertise over persuasion — let the work and writeups lead; contact stays available, not aggressive.  
2. Document the technical life — projects, research trajectory, and security practice as an evolving record.  
3. Bilingual by default — Spanish-first, English reachable without a separate site.  
4. Truthful evidence — real wins and labeled placeholders; never invent credentials.  
5. Early-career honesty — show momentum (hackathons, shipping, learning) without pretending senior institutional proof.  
6. Content is data — edit section JSON; do not bury facts only in components.  
