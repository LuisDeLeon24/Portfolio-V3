/** Maps project ids → folders under `assets/proyects/`. */
const FOLDER_BY_ID: Record<string, string> = {
  'q-threats': 'Q-Treaths',
  'shoot-ai': 'Shoot AI',
  'q-pay': 'Q-pay',
  sextant: 'Sextant',
  aprendi: 'Arendi',
  'agent-builder': 'AgentBuilder',
  'astro-tracker': 'AstroTracker',
  videntia: 'Videntia',
  'unmask-ai': 'Unmask',
}

const modules = import.meta.glob('./assets/proyects/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function rankPath(path: string): number {
  const name = path.toLowerCase()
  if (name.includes('landing') || name.includes('/main.')) return 0
  if (name.includes('agentbuilder') || name.includes('/ui.')) return 1
  if (name.includes('simulation') || name.includes('/lab.')) return 2

  const videntia = name.match(/videntia\s*(\d+)/)
  if (videntia) return Number(videntia[1]) // 1 = cover, then 2…n

  if (name.includes('winners') || name.includes('team') || name.includes('equipo')) return 8
  if (name.includes('/me.') || name.includes('award') || name.includes('certificate')) return 9
  return 5
}

/** Resolved image URLs for a project, cover-first. */
export function getProjectImages(projectId: string): string[] {
  const folder = FOLDER_BY_ID[projectId]
  if (!folder) return []

  const needle = `/proyects/${folder}/`
  const matches = Object.entries(modules).filter(([path]) => path.includes(needle))
  matches.sort(([a], [b]) => {
    const d = rankPath(a) - rankPath(b)
    return d !== 0 ? d : a.localeCompare(b)
  })
  return matches.map(([, url]) => url)
}

export function getProjectCover(projectId: string): string | undefined {
  return getProjectImages(projectId)[0]
}
