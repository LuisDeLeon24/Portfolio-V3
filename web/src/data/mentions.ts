import type { Localized } from './editorial'

const text = (es: string, en = es): Localized => ({ es, en })

export type Mention = {
  id: string
  title: Localized
  href: string
}

/** Third-party pages that name Luis. Only add entries with a public URL that shows his name. */
export const pressMentions: Mention[] = [
  {
    id: 'ilan-sentinel-segundo-lugar',
    title: text(
      'Sentinel obtuvo el segundo lugar en los Premios ILAN a la Innovación Universitaria 2026 de la USAC',
      'Sentinel took second place at the 2026 ILAN University Innovation Awards (USAC)',
    ),
    href: 'https://es.linkedin.com/posts/ilannetwork_ilan-premiosilan-sentinel-activity-7521307914448453632-IVdp',
  },
  {
    id: 'periodico-fiusac-ilan-2026',
    title: text(
      'Facultad de Ingeniería de la USAC fue el escenario de la innovación y el talento juvenil en el pitch de los Premios ILAN 2026',
      'USAC’s School of Engineering hosted the 2026 ILAN Awards pitch round',
    ),
    href: 'https://periodico.ingenieria.usac.edu.gt/facultad-de-ingenieria-de-la-usac-fue-el-escenario-de-la-innovacion-y-el-talento-juvenil-en-el-pitch-de-los-premios-ilan-2026/',
  },
  {
    id: 'openai-codex-ambassadors',
    title: text('Directorio de Codex Ambassadors', 'Codex Ambassadors directory'),
    href: 'https://developers.openai.com/community/codex-ambassadors/directory#codex-ambassador-luis-de-leon',
  },
]

/** Talks and events where Luis spoke or organized. Only add entries with a public source link. */
export const speakingAndCommunity: Mention[] = [
  {
    id: 'shipaton-guatemala-open2',
    title: text('Shipaton Guatemala x Open2'),
    href: 'https://app.open2.io/fd85y89t',
  },
  {
    id: 'intecap-nocode-ia-ciudadania-digital',
    title: text('Del No-Code a los Orquestadores para una IA Autónoma', 'From No-Code to Orchestrators for Autonomous AI'),
    href: 'https://www.instagram.com/p/DaiuHgFlNAP/',
  },
  {
    id: 'flisol-guatemala-2026',
    title: text('AI para todos: Cómo el Open Source está cambiando las reglas del juego'),
    href: 'https://comunidad.sl.gt/flisol/',
  },
]
