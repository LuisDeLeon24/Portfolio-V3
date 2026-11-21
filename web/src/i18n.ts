import certificacionesEn from './content/certificaciones.en.json'
import certificacionesEs from './content/certificaciones.es.json'
import premiosEn from './content/premios.en.json'
import premiosEs from './content/premios.es.json'
import principalEn from './content/principal.en.json'
import principalEs from './content/principal.es.json'
import proyectosEn from './content/proyectos.en.json'
import proyectosEs from './content/proyectos.es.json'
import researchEn from './content/research.en.json'
import researchEs from './content/research.es.json'

export type Lang = 'es' | 'en'

export type WorkTab = 'projects' | 'research' | 'certs'

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
  intro?: string
  archiveTitle: string
  archiveLead?: string
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
  aboutBody: string[]
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
  awardsIntro?: string
  awardsArchiveTitle: string
  awardsArchiveLead?: string
  seeAllAwards: string
  featuredAwardsNav: string
  awards: AwardItem[]
  work: Record<WorkTab, WorkCategory>
}

function buildCopy(
  principal: PrincipalFile,
  proyectos: WorkCategory,
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
      research: research as WorkCategory,
      certs: certs as WorkCategory,
    },
  }
}

const es = buildCopy(
  principalEs as PrincipalFile,
  proyectosEs as WorkCategory,
  researchEs as WorkCategory,
  certificacionesEs as WorkCategory,
  premiosEs as PremiosFile,
)

const en = buildCopy(
  principalEn as PrincipalFile,
  proyectosEn as WorkCategory,
  researchEn as WorkCategory,
  certificacionesEn as WorkCategory,
  premiosEn as PremiosFile,
)

export const dictionaries: Record<Lang, Copy> = { es, en }

export const tabOrder: WorkTab[] = ['projects', 'research', 'certs']

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

export function isWorkTab(value: string): value is WorkTab {
  return tabOrder.includes(value as WorkTab)
}

export function findAwardItem(
  lang: Lang,
  id: string,
): { item: AwardItem; index: number; items: AwardItem[] } | null {
  const items = dictionaries[lang].awards
  const index = items.findIndex((entry) => entry.id === id)
  if (index === -1) return null
  return { item: items[index], index, items }
}

/** Contact comes from principal.*.json — edit there. */
export const CONTACT_EMAIL = principalEs.contactEmail as string
export const SOCIAL_LINKS = principalEs.socialLinks as {
  id: string
  label: string
  href: string
}[]
