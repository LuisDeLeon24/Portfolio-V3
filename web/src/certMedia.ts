/** Maps cert ids → filenames under `assets/certs/`. */
const FILE_BY_ID: Record<string, string> = {
  'cisco-it-essentials': 'Cisco Logo.png',
  'cisco-ccna-intro': 'Cisco Logo.png',
  'mongodb-ai-vector-search': 'MongoDB logo.png',
  'itu-regulatory-innovation': 'ITU logo.png',
  'fiusac-research-paper-writing': 'FIusac logo.png',
}

const modules = import.meta.glob('./assets/certs/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
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

/** Resolved logo URL for a certification. */
export function getCertCover(certId: string): string | undefined {
  const file = FILE_BY_ID[certId]
  if (!file) return undefined
  return resolveFile(file)
}

export function getCertImages(certId: string): string[] {
  const cover = getCertCover(certId)
  return cover ? [cover] : []
}
