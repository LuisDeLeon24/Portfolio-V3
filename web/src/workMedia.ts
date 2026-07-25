import type { WorkTab } from './i18n'
import { getCertCover, getCertImages } from './certMedia'
import { getCtfCover, getCtfImages } from './ctfMedia'
import { getProjectCover, getProjectImages } from './projectMedia'

export function getWorkCover(tab: WorkTab, id: string): string | undefined {
  if (tab === 'projects') return getProjectCover(id)
  if (tab === 'ctfs') return getCtfCover(id)
  if (tab === 'certs') return getCertCover(id)
  return undefined
}

export function getWorkImages(tab: WorkTab, id: string): string[] {
  if (tab === 'projects') return getProjectImages(id)
  if (tab === 'ctfs') return getCtfImages(id)
  if (tab === 'certs') return getCertImages(id)
  return []
}

/** FIUSAC: contain on white so the full logo is visible. */
export function isLogoMedia(tab: WorkTab, id?: string): boolean {
  return tab === 'certs' && id === 'fiusac-research-paper-writing'
}
