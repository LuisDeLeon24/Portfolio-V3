import type { WorkTab } from './i18n'
import { getCertCover, getCertImages } from './certMedia'
import { getProjectCover, getProjectImages } from './projectMedia'

export function getWorkCover(tab: WorkTab, id: string): string | undefined {
  switch (tab) {
    case 'projects':
      return getProjectCover(id)
    case 'certs':
      return getCertCover(id)
    default: {
      const exhaustive: never = tab
      return exhaustive
    }
  }
}

export function getWorkImages(tab: WorkTab, id: string): string[] {
  switch (tab) {
    case 'projects':
      return getProjectImages(id)
    case 'certs':
      return getCertImages(id)
    default: {
      const exhaustive: never = tab
      return exhaustive
    }
  }
}

/** Certification art is a logo, not a photograph. */
export function isLogoMedia(tab: WorkTab, _id?: string): boolean {
  return tab === 'certs'
}
