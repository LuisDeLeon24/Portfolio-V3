# Vercel — Portfolio V3

Vite + React app lives in **`web/`**. The previous deploy returned `404` because Vercel treated the repo root as a static site and never ran `npm run build`.

## Project settings (Dashboard)

In [portfolio-v3](https://vercel.com/luis-projects-11e90c29/portfolio-v3) → **Settings → General**:

| Setting | Value |
| --- | --- |
| **Root Directory** | leave empty (repo root) **or** set to `web` |
| **Framework Preset** | Vite |
| **Build Command** | (auto) or `npm run build` if Root Directory = `web` |
| **Output Directory** | (auto) `dist` if Root Directory = `web` |
| **Install Command** | (auto) `npm install` / `npm ci` |

Repo root already has a `vercel.json` that builds from `web/` when Root Directory is the repo root:

- Install: `npm ci --prefix web`
- Build: `npm run build --prefix web`
- Output: `web/dist`
- SPA rewrite → `index.html`

If you set **Root Directory = `web`**, Vercel uses `web/vercel.json` (SPA rewrite only) and ignores the root install/build overrides for that folder. Prefer one approach and stick to it:

1. **Recommended:** Root Directory empty + root `vercel.json` (already in repo), **or**
2. Root Directory = `web` + framework Vite (then you can delete root build overrides later).

## Local check before deploy

```bash
cd web
npm ci
npm run build
npm run preview
```

Build must succeed. Common image-related failures:

| Issue | Why it breaks on Vercel (Linux) | Fix in this repo |
| --- | --- | --- |
| `.JPG` import | Vite/TS declare only `*.jpg` lowercase | Use `Coding.jpg`; `vite-env.d.ts` also declares uppercase |
| Folder `CTF & Labs` | `&` / spaces in paths | Renamed to `assets/ctf-labs/` |
| Case-only renames | Windows ignores case; Linux does not | Match import path to real filename |
| Missing assets in git | Deploy clones GitHub only | Commit images under `web/src/assets/` |
| Huge unoptimized photos | Slow build / memory pressure | Keep gallery assets reasonable (~23 MB total today is fine) |

## Image pipeline

- Hero: static imports in `HeroCollage.tsx` (`assets/principal/`).
- Projects / awards / CTFs / certs: `import.meta.glob` in `*Media.ts` — Vite hashes filenames at build time, so spaces in names are OK once the folder path is clean.
- Social preview: `web/public/Preview.webp` (must stay in `public/` for `/Preview.webp` meta tags).

## After push

GitHub → Vercel auto-deploy on `main`. Confirm the build log shows:

```text
> tsc -b && vite build
✓ built in …
```

Not a ~200 ms “Build Completed” with no Vite step (that means static root deploy / wrong root).

Production domain (current): `https://portfolio-v3-wine-sigma.vercel.app`
