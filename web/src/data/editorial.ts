import type { Lang } from '../i18n'

export type Localized = Record<Lang, string>
const copy = (es: string, en: string): Localized => ({ es, en })
export type ProjectFeature = {
  id: string
  category: Localized
  problem: Localized
  approach: Localized
  result?: Localized
  video?: string
}

// Fichas ampliadas. La selección de portada usa el campo featured del catálogo de proyectos.
// Cada id coincide con proyectos.{es,en}.json. Las imágenes, demos y repos vienen de ese archivo y su galería.
export const features: ProjectFeature[] = [
  {
    id: 'astro-tracker',
    category: copy('Simulación científica', 'Scientific simulation'),
    problem: copy(
      '¿Qué ocurre si un asteroide impacta en un lugar concreto?',
      'What happens if an asteroid strikes a particular location?',
    ),
    approach: copy(
      'La simulación combina APIs de NASA y datos FITS para estimar el impacto físico y económico.',
      'The simulation combines NASA APIs and FITS data to estimate physical and economic impact.',
    ),
    result: copy(
      'El equipo construyó el MVP en 48 horas. Recibió la mención honorífica Global Connection en Guatemala.',
      'The team built the MVP in 48 hours. It received the Global Connection honorable mention in Guatemala.',
    ),
  },
  {
    id: 'aprendi',
    category: copy('Aprendizaje adaptativo', 'Adaptive learning'),
    problem: copy(
      '¿Cómo cambia una ruta de aprendizaje cuando cambia el desempeño de un estudiante?',
      'How should a learning path change as a student progresses?',
    ),
    approach: copy(
      'La plataforma ajusta el contenido según el progreso e incorpora laboratorios interactivos de Linux.',
      'The platform adapts content to student progress and includes interactive Linux labs.',
    ),
    result: copy(
      'El equipo de tres personas obtuvo el primer lugar en el hackathon de la UFM de 2026.',
      'The three-person team placed first at the 2026 UFM hackathon.',
    ),
  },
  {
    id: 'agent-builder',
    category: copy('Sistemas de IA', 'AI systems'),
    problem: copy(
      '¿Cómo darle a un agente acceso a información que cambia?',
      'How can an agent access information that changes?',
    ),
    approach: copy(
      'El constructor combina modelos de lenguaje, recuperación de documentos (RAG) y fuentes de datos en vivo.',
      'The builder combines language models, retrieval-augmented generation (RAG) and live data sources.',
    ),
    result: copy(
      'El prototipo llegó al Top 5 de Atom Dev Day 2026.',
      'The prototype reached the Top 5 at Atom Dev Day 2026.',
    ),
  },
  {
    id: 'unmask-ai',
    category: copy('Visión y lenguaje', 'Vision and language'),
    problem: copy(
      '¿Cómo pasar del texto en una imagen a una búsqueda que pueda investigarse?',
      'How can text inside an image become a starting point for research?',
    ),
    approach: copy(
      'Un flujo de OCR extrae el texto. Un modelo de lenguaje usa lo extraído para iniciar búsquedas.',
      'An OCR pipeline extracts the text. A language model uses the extracted material to initiate searches.',
    ),
    result: copy(
      'El MVP individual se construyó en unos tres días y tiene una demo web.',
      'The solo MVP took about three days to build and has a web demo.',
    ),
  },
]

export type Credential = { issuer: string; date?: string; verification?: string }
// TODO Luis: añadir fecha de emisión y URL individual de verificación a cada credencial.
export const credentials: Record<string, Credential> = {
  'fiusac-research-paper-writing': { issuer: 'FIUSAC' },
  'itu-regulatory-innovation': { issuer: 'ITU' },
  'mongodb-ai-vector-search': { issuer: 'MongoDB' },
  'cisco-ccna-intro': { issuer: 'Cisco' },
  'cisco-it-essentials': { issuer: 'Cisco' },
}
// TODO Luis: incorporar el enlace oficial o diploma de cada reconocimiento cuando esté disponible.
// Las fotos de los eventos y los enlaces a los proyectos se muestran con su descripción real.
export const awardEvidence: Partial<Record<string, { url: string; label: Localized }>> = {}

export const nav = [
  ['proyectos', 'Proyectos', 'Projects', '/projects'],
  ['comunidad', 'Comunidad', 'Community', '/community'],
  ['escritos', 'Escritos', 'Writing', '/escritos'],
] as const
