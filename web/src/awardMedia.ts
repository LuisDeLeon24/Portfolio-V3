/** Maps award ids → filenames under `assets/awards/`. */
const FILE_BY_ID: Record<string, string> = {
  'cursor-tec-guatemala': 'Cursor x tec.jpeg',
  'cursor-buildathon-travel': 'Hackathon El salvador.jpeg',
  'innovatech-2026': 'INNOVATECH.jpg',
  'ufm-cs-hackathon': 'UFM CS Hackathon.jpeg',
  'atom-dev-day': 'Atom dev day.jpeg',
  'nasa-space-apps': 'NASA Space Apps.png',
  'leadership-kinal': 'Kinal award.png',
}

const modules = import.meta.glob('./assets/awards/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function resolveFile(filename: string): string | undefined {
  const entry = Object.entries(modules).find(([path]) => {
    const normalized = path.replace(/\\/g, '/')
    return normalized.endsWith(`/${filename}`) || normalized.endsWith(filename)
  })
  return entry?.[1]
}

/** Resolved cover URL for an award. */
export function getAwardCover(awardId: string): string | undefined {
  const file = FILE_BY_ID[awardId]
  if (!file) return undefined
  return resolveFile(file)
}

export function getAwardImages(awardId: string): string[] {
  const cover = getAwardCover(awardId)
  return cover ? [cover] : []
}
