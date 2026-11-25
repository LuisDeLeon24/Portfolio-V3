import type { Localized } from './editorial'
import intecapTalk from '../assets/events/AI Talk Intecap - 2026.jpeg'
import flisolTalk from '../assets/events/Flisol Talk - 2026.jpeg'

const text = (es: string, en: string): Localized => ({ es, en })

export const publicationFormats = {
  talk: { label: text('Resumen de charla', 'Talk recap'), group: text('Charlas', 'Talks') },
  paper: { label: text('Paper', 'Paper'), group: text('Papers', 'Papers') },
  cve: { label: text('CVE', 'CVE'), group: text('CVEs', 'CVEs') },
  poc: { label: text('Prueba de concepto', 'Proof of concept'), group: text('PoC', 'PoCs') },
  writeup: { label: text('Writeup', 'Writeup'), group: text('Writeups', 'Writeups') },
}

export type PublicationFormat = keyof typeof publicationFormats
export type Publication = {
  id: string
  format: PublicationFormat
  status: 'published' | 'draft'
  featured?: boolean
  title: Localized
  summary: Localized
  body: Localized[]
  image?: { src: string; alt: Localized }
  source?: { label: Localized } & ({ to: string } | { href: string })
}

const entries: Publication[] = [
  {
    id: 'del-prompt-al-flujo-de-trabajo',
    status: 'published',
    format: 'talk',
    featured: true,
    title: text('Del prompt al flujo de trabajo', 'From a prompt to a workflow'),
    summary: text('Si la IA nos hace más rápidos, ¿por qué no tenemos más tiempo? En INTECAP seguí el recorrido de una tarea para ver dónde seguimos haciendo el trabajo a mano.',
      'If AI makes us faster, why don’t we have more time? At INTECAP, I followed a task from start to finish to see where we still do the work by hand.'),
    body: [
      text('Pedirle a la IA que redacte un correo o resuma un documento lleva segundos. Después toca leer la respuesta, corregirla y copiarla al lugar donde sigue el trabajo. Si soy yo quien mueve la información entre cada paso, el proceso sigue avanzando a mi ritmo.',
        'Asking AI to draft an email or summarize a document takes seconds. Then I have to read the answer, make corrections and copy it to wherever the work continues. As long as I move the information between steps, the whole process runs at my pace.'),
      text('Propuse imaginar una aplicación pequeña. Primero diseñamos la interfaz, escribimos el código, probamos los cambios y documentamos el resultado. Vale la pena dibujar ese recorrido antes de elegir una herramienta. ¿Qué necesita recibir la etapa de código del diseño? ¿Qué prueba me dirá si el resultado cumple el objetivo?',
        'I asked the audience to picture a small app. We design the interface, write the code, test the changes and document the result. That sequence is worth sketching before choosing a tool. What does the coding step need from the design? Which test will tell me whether the result meets my goal?'),
      text('Cuando la salida de una etapa puede alimentar la siguiente, puedo dedicar mi atención a las decisiones que requieren criterio. Una forma de empezar es tomar una tarea de ayer y marcar cada vez que tuve que copiar, pegar o revisar algo. Ahí aparece un primer paso que vale la pena conectar y otro donde conviene que alguien revise.',
        'When the output of one step can feed the next, I can spend my attention on decisions that need judgment. A place to start is with one task from yesterday. Mark every time you had to copy, paste or review something. That often reveals a handoff worth connecting and a point where a person should check the result.'),
    ],
    image: { src: intecapTalk, alt: text('Luis durante la charla en INTECAP junto a la diapositiva sobre el cuello de botella humano.', 'Luis speaking at INTECAP beside a slide about human bottlenecks.') },
    source: { to: '/community#ia-intecap', label: text('Ver fotos de INTECAP', 'See photos from INTECAP') },
  },
  {
    id: 'ia-para-todos',
    status: 'published',
    format: 'talk',
    featured: true,
    title: text('IA para todos: cómo el código abierto está cambiando las reglas del juego', 'AI for everyone: how open source is changing the rules'),
    summary: text('En FLISOL Guatemala pregunté dónde corre la IA que usamos a diario y qué podemos decidir cuando el modelo está en nuestra propia computadora.',
      'At FLISOL Guatemala I asked where the AI we use every day actually runs, and what we get to decide when the model runs on our own computer.'),
    body: [
      text('Abrí con dos preguntas. ¿Cuántos usamos IA constantemente? ¿Y cuántos sabemos dónde se ejecuta o quién controla esa infraestructura? La interfaz de un chat suele verse igual desde cualquier computadora. Lo que pasa después de pulsar «enviar» depende de dónde esté el modelo.',
        'I opened with two questions. How many of us use AI regularly? And how many know where it runs or who controls the infrastructure? A chat interface looks much the same on any computer. What happens after you hit send depends on where the model lives.'),
      text('En un festival de software libre, me interesaba hablar de lo que podemos hacer por cuenta propia. Con un modelo que cabe en mi equipo, puedo probar una pregunta, cambiar la configuración y repetirla para observar la diferencia. Si quiero modificarlo o compartir lo que hice, también importa qué permite su licencia.',
        'At a free software festival, I wanted to talk about what we can try for ourselves. With a model that fits on my computer, I can ask a question, change a setting and ask again to see what happens. If I want to modify the model or share my work, its license matters too.'),
      text('Esa posibilidad de experimentar cambia lo que puedo aprender. La próxima vez que abra una herramienta de IA, la primera pregunta que quiero hacerme es sencilla: ¿podría ejecutar el modelo aquí y ver por mí mismo cómo responde?',
        'Being able to experiment changes what I can learn. The next time I open an AI tool, I want to start with a simple question: could I run the model here and see for myself how it responds?'),
    ],
    image: { src: flisolTalk, alt: text('Luis dando su charla frente al público de FLISOL Guatemala.', 'Luis speaking to the audience at FLISOL Guatemala.') },
    source: { to: '/community#flisol-guatemala', label: text('Ver fotos de FLISOL', 'See photos from FLISOL') },
  },
  {
    id: 'impacto',
    status: 'draft',
    format: 'writeup',
    title: text('¿Cuánto cambia una estimación de impacto?', 'How much can an impact estimate change?'),
    summary: text('Una prueba en Astro Tracker para explorar cómo influye el diámetro de un asteroide en el daño físico y el costo estimado.',
      'An Astro Tracker experiment to explore how an asteroid’s diameter affects estimated physical damage and cost.'),
    body: [
      text('En Astro Tracker combinamos datos de la NASA con una simulación de impactos. La ubicación y el tamaño del asteroide se pueden variar. Si cambio ambos a la vez, es difícil atribuir la diferencia a una sola causa.',
        'In Astro Tracker we combined NASA data with an impact simulation. Both the location and the asteroid’s size can vary. If I change both at once, the difference is hard to trace to a single cause.'),
      text('Para probarlo, elige una ubicación y ejecuta dos simulaciones con diámetros distintos. Anota el diámetro y sus unidades en cada ejecución. Compara por separado el daño físico y el costo estimado: son dos lecturas distintas de un mismo escenario.',
        'To try it, pick a location and run two simulations with different diameters. Record the diameter and its units for each run. Compare physical damage and estimated cost separately. They describe two different aspects of the same scenario.'),
    ],
    source: { to: '/e/projects/astro-tracker', label: text('Explorar Astro Tracker', 'Explore Astro Tracker') },
  },
  {
    id: 'ocr',
    status: 'draft',
    format: 'poc',
    title: text('¿Qué pierde el OCR cuando baja la resolución?', 'What does OCR lose at a lower resolution?'),
    summary: text('Con Unmask AI puedes comparar dos versiones de una imagen y rastrear un error hasta el texto que leyó el OCR.',
      'Use Unmask AI to compare two versions of an image and trace a mistake back to the OCR output.'),
    body: [
      text('Construí Unmask AI para extraer texto de una imagen y usarlo como punto de partida para una búsqueda. El primer paso merece una prueba propia. Un dígito o un apellido mal leído cambia lo que la siguiente etapa intenta encontrar.',
        'I built Unmask AI to extract text from an image and use it as the starting point for a search. The first step deserves a test of its own. A misread digit or surname changes what the next stage tries to find.'),
      text('Guarda una imagen en dos resoluciones y procesa ambas. Con el original a la vista, marca las palabras omitidas, los acentos y las cifras que cambiaron. Así puedes identificar qué parte del error ya estaba en la extracción.',
        'Save one image at two resolutions and process both. With the original in front of you, mark missing words, accents, and digits that changed. This lets you identify which errors were already present in the extraction.'),
    ],
  },
  {
    id: 'fuentes',
    status: 'draft',
    format: 'writeup',
    title: text('¿Qué cambia al darle una fuente al modelo?', 'What changes when a model gets a source?'),
    summary: text('Una comparación con Agent Builder para averiguar qué afirmaciones de una respuesta se pueden rastrear hasta el documento original.',
      'A comparison using Agent Builder to see which claims in an answer can be traced to the source document.'),
    body: [
      text('En Agent Builder trabajamos con modelos de lenguaje y recuperación de documentos. Para ver qué aporta una fuente, sirve hacer la misma pregunta dos veces: una con el documento disponible y otra sin él.',
        'In Agent Builder we worked with language models and document retrieval. To see what a source adds, ask the same question twice: once with the document available and once without it.'),
      text('Lee cada respuesta por afirmaciones. Al lado de cada una, copia el pasaje del documento que la respalda, si lo hay. El espacio que quede vacío indica qué conviene comprobar antes de usar la respuesta.',
        'Read each answer one claim at a time. Next to each claim, copy the passage that supports it, if there is one. An empty space shows what needs checking before you use the answer.'),
    ],
  },
]

export const publications = entries.filter(entry => entry.status === 'published')
