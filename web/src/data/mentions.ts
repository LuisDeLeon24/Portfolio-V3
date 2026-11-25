import type { Localized } from './editorial'

const text = (es: string, en = es): Localized => ({ es, en })

export type Mention = {
  id: string
  /** ISO date (yyyy-mm-dd) as shown by the source. Omit when the source shows no date. */
  date?: string
  /** Publisher or host, written exactly as the source names itself. */
  source: string
  title: Localized
  note: Localized
  href?: string
}

/** Third-party pages that name Luis. Only add entries with a public URL that shows his name. */
export const pressMentions: Mention[] = [
  {
    id: 'ilan-sentinel-segundo-lugar',
    date: '2026-10-28',
    source: 'ILAN - Israel Innovation Network',
    title: text(
      'Sentinel obtuvo el segundo lugar en los Premios ILAN a la Innovación Universitaria 2026 de la USAC',
      'Sentinel took second place at the 2026 ILAN University Innovation Awards (USAC)',
    ),
    note: text(
      'Publicación de ILAN en LinkedIn sobre Sentinel, el proyecto de visión por computadora que presenté con Brandon Ajau.',
      'ILAN’s LinkedIn post about Sentinel, the computer vision project I presented with Brandon Ajau.',
    ),
    href: 'https://es.linkedin.com/posts/ilannetwork_ilan-premiosilan-sentinel-activity-7521307914448453632-IVdp',
  },
  {
    id: 'periodico-fiusac-ilan-2026',
    date: '2026-10-14',
    source: 'Periódico Facultad de Ingeniería (USAC)',
    title: text(
      'Facultad de Ingeniería de la USAC fue el escenario de la innovación y el talento juvenil en el pitch de los Premios ILAN 2026',
      'USAC’s School of Engineering hosted the 2026 ILAN Awards pitch round',
    ),
    note: text(
      'Sentinel Team (Brandon Ajau y Luis De León) fue uno de los tres equipos clasificados a la Gran Final de ILAN.',
      'Sentinel Team (Brandon Ajau and Luis De León) was one of the three teams selected for the ILAN Grand Final.',
    ),
    href: 'https://periodico.ingenieria.usac.edu.gt/facultad-de-ingenieria-de-la-usac-fue-el-escenario-de-la-innovacion-y-el-talento-juvenil-en-el-pitch-de-los-premios-ilan-2026/',
  },
  {
    id: 'openai-codex-ambassadors',
    source: 'OpenAI Developers',
    title: text('Directorio de Codex Ambassadors', 'Codex Ambassadors directory'),
    note: text('Aparezco como «Luis De León, Guatemala City, Guatemala».', 'Listed as “Luis De León, Guatemala City, Guatemala.”'),
    href: 'https://developers.openai.com/community/codex-ambassadors/directory#codex-ambassador-luis-de-leon',
  },
]

/** Talks and events where Luis spoke or organized. Only add entries with a public source link. */
export const speakingAndCommunity: Mention[] = [
  {
    id: 'shipaton-guatemala-open2',
    date: '2026-09-26',
    source: 'Open2 × RevenueCat',
    title: text('Shipaton Guatemala x Open2'),
    note: text(
      'Co-organicé con Oscar Morales la edición de Guatemala de Shipaton 2026, la hackathon mobile global de RevenueCat.',
      'I co-organized the Guatemala edition of Shipaton 2026, RevenueCat’s global mobile hackathon, with Oscar Morales.',
    ),
    href: 'https://app.open2.io/fd85y89t',
  },
  {
    id: 'intecap-nocode-ia-ciudadania-digital',
    date: '2026-07-16',
    source: 'INTECAP Centro TICS',
    title: text('Del No-Code a los Orquestadores para una IA Autónoma', 'From No-Code to Orchestrators for Autonomous AI'),
    note: text(
      'Charla en el seminario «NoCode, IA y Ciudadanía Digital», en el Aula Magna. Escribí el resumen en «Del prompt al flujo de trabajo».',
      'Talk at the “NoCode, IA y Ciudadanía Digital” seminar, in the Aula Magna. I wrote it up as “From a prompt to a workflow.”',
    ),
    href: 'https://www.instagram.com/p/DaiuHgFlNAP/',
  },
  {
    id: 'flisol-guatemala-2026',
    date: '2026-05-09',
    source: 'FLISOL Guatemala 2026',
    title: text('AI para todos: Cómo el Open Source está cambiando las reglas del juego'),
    note: text('Charla en el Centro Cultural El Talpetate, Ciudad de Guatemala.', 'Talk at Centro Cultural El Talpetate, Guatemala City.'),
    href: 'https://comunidad.sl.gt/flisol/',
  },
]
