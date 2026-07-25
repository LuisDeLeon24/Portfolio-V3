import certificacionesEn from './content/certificaciones.en.json'
import certificacionesEs from './content/certificaciones.es.json'
import ctfsEn from './content/ctfs.en.json'
import ctfsEs from './content/ctfs.es.json'
import premiosEn from './content/premios.en.json'
import premiosEs from './content/premios.es.json'
import principalEn from './content/principal.en.json'
import principalEs from './content/principal.es.json'
import proyectosEn from './content/proyectos.en.json'
import proyectosEs from './content/proyectos.es.json'
import researchEn from './content/research.en.json'
import researchEs from './content/research.es.json'

export type Lang = 'es' | 'en'

export type WorkTab = 'projects' | 'ctfs' | 'research' | 'certs'

export type WorkItem = {
  id: string
  title: string
  blurb: string
  meta: string
  body: string[]
  links?: { label: string; href: string }[]
  featured?: boolean
  featureSubtitle?: string
  featureArt?: 0 | 1 | 2 | 3
  /** Project won a prize / award (shows trophy on project cards). */
  awarded?: boolean
}

export type WorkRef = { tab: WorkTab; item: WorkItem }

export type AwardItem = WorkItem & {
  org: string
  year: string
  images?: (0 | 1 | 2 | 3)[]
}

type WorkCategory = {
  title: string
  summary: string
  items: WorkItem[]
}

type PremiosFile = {
  title: string
  intro: string
  archiveTitle: string
  archiveLead: string
  seeAll: string
  featuredNav: string
  items: AwardItem[]
}

type PrincipalFile = {
  brand: string
  focus: string
  tagline: string
  nav: { experience: string; work: string; awards: string; education: string; contact: string }
  aboutLabel: string
  aboutTitle: string
  aboutBody: string
  aboutSkills: string[]
  experienceTitle: string
  experienceIntro?: string
  workTitle: string
  workIntro?: string
  tabs: Record<WorkTab, string>
  seeMore: string
  archiveClose: string
  archiveTitle: string
  placeholder: string
  backHome: string
  openItem: string
  detailLinks: string
  prevItem: string
  nextItem: string
  moreExperiments: string
  openCategories: string
  categoryCount: string
  featuredTitle: string
  featuredLabel: string
  learnMore: string
  featuredNav: string
  seeAllInCategory: string
  allInCategory: string
  allCertifications: string
  exploreResearch: string
  comingSoon: string
  notFoundTitle: string
  notFoundBody: string
  educationTitle: string
  educationIntro?: string
  footerTitle: string
  footerBody: string
  emailCta: string
  socialCta: string
  experience: { role: string; place: string; period: string; note: string }[]
  education: { title: string; meta: string; note: string }[]
  contactEmail: string
  socialLinks: { id: string; label: string; href: string }[]
}

export type Copy = Omit<PrincipalFile, 'contactEmail' | 'socialLinks'> & {
  awardsTitle: string
  awardsIntro: string
  awardsArchiveTitle: string
  awardsArchiveLead: string
  seeAllAwards: string
  featuredAwardsNav: string
  awards: AwardItem[]
  work: Record<WorkTab, WorkCategory>
}

function buildCopy(
  principal: PrincipalFile,
  proyectos: WorkCategory,
  ctfs: WorkCategory,
  research: WorkCategory,
  certs: WorkCategory,
  premios: PremiosFile,
): Copy {
  const { contactEmail: _email, socialLinks: _social, ...ui } = principal
  return {
    ...ui,
    awardsTitle: premios.title,
    awardsIntro: premios.intro,
    awardsArchiveTitle: premios.archiveTitle,
    awardsArchiveLead: premios.archiveLead,
    seeAllAwards: premios.seeAll,
    featuredAwardsNav: premios.featuredNav,
    awards: premios.items as AwardItem[],
    work: {
      projects: proyectos as WorkCategory,
      ctfs: ctfs as WorkCategory,
      research: research as WorkCategory,
      certs: certs as WorkCategory,
    },
  }
}

const es = buildCopy(
  principalEs as PrincipalFile,
  proyectosEs as WorkCategory,
  ctfsEs as WorkCategory,
  researchEs as WorkCategory,
  certificacionesEs as WorkCategory,
  premiosEs as PremiosFile,
)

const en = buildCopy(
  principalEn as PrincipalFile,
  proyectosEn as WorkCategory,
  ctfsEn as WorkCategory,
  researchEn as WorkCategory,
  certificacionesEn as WorkCategory,
  premiosEn as PremiosFile,
)

export const dictionaries: Record<Lang, Copy> = { es, en }

export const tabOrder: WorkTab[] = ['projects', 'ctfs', 'research', 'certs']

export function findWorkItem(
  lang: Lang,
  tab: WorkTab,
  id: string,
): { item: WorkItem; category: string; index: number; items: WorkItem[] } | null {
  const category = dictionaries[lang].work[tab]
  const index = category.items.findIndex((entry) => entry.id === id)
  if (index === -1) return null
  return {
    item: category.items[index],
    category: category.title,
    index,
    items: category.items,
  }
}

export function getAdjacentInCategory(
  lang: Lang,
  tab: WorkTab,
  id: string,
): { prev: WorkItem | null; next: WorkItem | null; position: number; total: number } {
  const found = findWorkItem(lang, tab, id)
  if (!found) return { prev: null, next: null, position: 0, total: 0 }
  const { index, items } = found
  return {
    prev: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null,
    position: index + 1,
    total: items.length,
  }
}

function hashSeed(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function getRandomFromOtherCategories(
  lang: Lang,
  currentTab: WorkTab,
  currentId: string,
  count = 3,
): WorkRef[] {
  const pool: WorkRef[] = []
  for (const tab of tabOrder) {
    if (tab === currentTab) continue
    for (const item of dictionaries[lang].work[tab].items) {
      pool.push({ tab, item })
    }
  }
  if (pool.length === 0) return []

  let seed = hashSeed(`${lang}:${currentTab}:${currentId}`)
  const next = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 0x100000000
  }

  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export function isWorkTab(value: string): value is WorkTab {
  return tabOrder.includes(value as WorkTab)
}

export function getFeaturedItems(lang: Lang, tab: WorkTab): WorkItem[] {
  const items = dictionaries[lang].work[tab].items
  const marked = items.filter((item) => item.featured)
  return marked.length > 0 ? marked : items.slice(0, Math.min(3, items.length))
}

export function getAwards(lang: Lang): AwardItem[] {
  return dictionaries[lang].awards
}

export function getFeaturedAwards(lang: Lang): AwardItem[] {
  const items = getAwards(lang)
  const marked = items.filter((item) => item.featured)
  return marked.length > 0 ? marked : items.slice(0, Math.min(3, items.length))
}

export function findAwardItem(
  lang: Lang,
  id: string,
): { item: AwardItem; index: number; items: AwardItem[] } | null {
  const items = getAwards(lang)
  const index = items.findIndex((entry) => entry.id === id)
  if (index === -1) return null
  return { item: items[index], index, items }
}

export function getAdjacentAward(
  lang: Lang,
  id: string,
): { prev: AwardItem | null; next: AwardItem | null; position: number; total: number } {
  const found = findAwardItem(lang, id)
  if (!found) return { prev: null, next: null, position: 0, total: 0 }
  const { index, items } = found
  return {
    prev: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null,
    position: index + 1,
    total: items.length,
  }
}

/** Contact comes from principal.*.json — edit there. */
export const CONTACT_EMAIL = principalEs.contactEmail as string
export const SOCIAL_LINKS = principalEs.socialLinks as {
  id: string
  label: string
  href: string
}[]
