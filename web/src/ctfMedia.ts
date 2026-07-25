/** Maps CTF ids → filenames under `assets/CTF & Labs/`. */
const FILE_BY_ID: Record<string, string> = {
  'fluid-attacks-ctf': 'Fluid Atacks CTF.jpg',
  'advent-of-cyber': 'tryhackme Advent of Cyber.png',
}

const modules = import.meta.glob('./assets/CTF & Labs/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function resolveFile(filename: string): string | undefined {
  const entry = Object.entries(modules).find(([path]) =>
    path.replace(/\\/g, '/').endsWith(`/${filename}`) || path.endsWith(filename),
  )
  return entry?.[1]
}

/** Resolved image URL for a CTF entry. */
export function getCtfCover(ctfId: string): string | undefined {
  const file = FILE_BY_ID[ctfId]
  if (!file) return undefined
  return resolveFile(file)
}

export function getCtfImages(ctfId: string): string[] {
  const cover = getCtfCover(ctfId)
  return cover ? [cover] : []
}
