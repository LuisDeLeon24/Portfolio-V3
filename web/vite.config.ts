import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const root = dirname(fileURLToPath(import.meta.url))

type RouteCopy = { title: string; description: string }
type SeoFile = { site: string; routes: { path: string; es: RouteCopy; en: RouteCopy }[] }

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function replaceOnce(html: string, pattern: RegExp, replacement: string, label: string) {
  if (!pattern.test(html)) throw new Error(`[seo-pages] ${label} not found in dist/index.html`)
  return html.replace(pattern, replacement)
}

/** Fails the build if a published item has no entry in src/seo/routes.json. */
function assertRoutesCoverContent(seo: SeoFile) {
  const known = new Set(seo.routes.map(route => route.path))
  const ids = (file: string) =>
    (JSON.parse(readFileSync(resolve(root, 'src/content', file), 'utf8')).items as { id: string }[]).map(item => item.id)
  const publications = readFileSync(resolve(root, 'src/data/publications.ts'), 'utf8')
  const published = [...publications.matchAll(/id: '([^']+)',\s*status: 'published'/g)].map(match => match[1])
  const expected = [
    ...ids('premios.es.json').map(id => '/premios/' + id),
    ...ids('proyectos.es.json').map(id => '/e/projects/' + id),
    ...ids('certificaciones.es.json').map(id => '/e/certs/' + id),
    ...published.map(id => '/escritos/' + id),
  ]
  const missing = expected.filter(path => !known.has(path))
  if (missing.length) throw new Error('[seo-pages] add these paths to src/seo/routes.json: ' + missing.join(', '))
}

/**
 * After the build, writes one HTML file per route with its own title, description,
 * canonical and og:* (dist/projects.html, dist/escritos/ia-para-todos.html, ...),
 * plus dist/app-shell.html (untouched SPA fallback) and dist/sitemap.xml.
 * Vercel serves them through "cleanUrls": true.
 */
function seoPages(): Plugin {
  return {
    name: 'ldl-seo-pages',
    apply: 'build',
    closeBundle() {
      const seo: SeoFile = JSON.parse(readFileSync(resolve(root, 'src/seo/routes.json'), 'utf8'))
      assertRoutesCoverContent(seo)
      const dist = resolve(root, 'dist')
      const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, 'app-shell.html'))
      for (const route of seo.routes) {
        const url = seo.site + route.path
        const title = escapeHtml(route.es.title)
        const description = escapeHtml(route.es.description)
        let html = template
        html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, '<title>')
        html = replaceOnce(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`, 'meta description')
        html = replaceOnce(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`, 'og:title')
        html = replaceOnce(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}" />`, 'og:description')
        html = replaceOnce(html, /\n\s*<\/head>/, `\n    <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n  </head>`, '</head>')
        const file = route.path === '/' ? resolve(dist, 'index.html') : resolve(dist, route.path.slice(1) + '.html')
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, html)
      }
      const urls = seo.routes.map(route => `  <url><loc>${seo.site}${route.path}</loc></url>`).join('\n')
      writeFileSync(
        resolve(dist, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), seoPages()],
  server: { proxy: { '/api/contact': 'http://127.0.0.1:8787' } },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'three-core', test: /three\.core\.js$/ }],
        },
      },
    },
  },
})
