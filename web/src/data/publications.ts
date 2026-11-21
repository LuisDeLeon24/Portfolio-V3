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
    id: 'lo-que-24-horas-te-ensenan',
    status: 'published',
    format: 'talk',
    title: text('Lo que 24 horas te enseñan. De participante a organizador, y el camino a IEEEXtreme',
      'What 24 hours can teach you. From participant to organizer and the road to IEEEXtreme'),
    summary: text('En un panel de IEEE Guatemala conté qué cambió cuando dejé de medir cada hackatón por el trofeo. También compartí una forma de empezar a entrenar para IEEEXtreme con dos amigos.',
      'On a panel hosted by IEEE Guatemala, I talked about what changed when I stopped judging every hackathon by whether I took home a trophy. I also shared a way to start training for IEEEXtreme with two friends.'),
    body: [
      text('El 16 de octubre de 2026 recordé en el panel mi primer hackatón de 24 horas seguidas, la Cursor Buildathon en El Salvador. Hubo un momento en que el código ni siquiera compilaba y ya dábamos el proyecto por perdido. Diez minutos después algo volvió a funcionar y nos estábamos riendo otra vez. De esa noche también me quedaron amistades con gente que entendía por qué quería seguir intentándolo.',
        'At the panel on October 16, 2026, I remembered my first 24-hour hackathon, the Cursor Buildathon in El Salvador. At one point our code wouldn’t even compile and we thought the project was over. Ten minutes later something worked and we were laughing again. I also came away with friends who understood why I wanted to keep trying.'),
      text('En mis primeros hackatones quería que cada línea de código fuera perfecta y salía frustrado cuando perdía. Cuando empecé a darme permiso para probar algo y ver qué salía, disfruté más el trabajo en equipo. Es una experiencia que también tengo presente al organizar encuentros.',
        'At my first hackathons I wanted every line of code to be perfect, and I went home frustrated when I lost. Once I gave myself room to try something and see what happened, I enjoyed working with my teammates more. I keep that experience in mind when I organize events, too.'),
      text('Para quienes querían probar IEEEXtreme, propuse empezar con un ejercicio en un lenguaje conocido y aprender a leer el veredicto del juez automático. Un «Wrong Answer» invita a buscar el caso que se nos escapó. Un «Time Limit Exceeded» nos lleva a mirar cuánto trabajo hace el algoritmo al crecer la entrada. Saber qué probar después ya es una buena herramienta para compartir con el equipo durante esas 24 horas.',
        'For anyone curious about IEEEXtreme, I suggested starting with one problem in a familiar language and learning to read the online judge’s verdict. “Wrong Answer” gives us a reason to look for a case we missed. “Time Limit Exceeded” sends us back to see how much work the algorithm does as the input grows. Knowing what to try next is a useful skill to bring to your team for those 24 hours.'),
    ],
    source: { to: '/community#cursor-buildathon-san-salvador', label: text('Ver fotos de la Cursor Buildathon', 'See photos from the Cursor Buildathon') },
  },
  {
    id: 'del-meme-al-meteorito',
    status: 'published',
    format: 'talk',
    title: text('Del meme al meteorito: mi primer hackatón en el NASA Space Apps',
      'From meme to meteorite: my first hackathon at NASA Space Apps'),
    summary: text('En una charla virtual para IEEE AES conté cómo un meme guatemalteco nos dio la idea para Astro Tracker, el simulador de impactos de asteroides que hicimos en el NASA Space Apps Challenge 2025.',
      'In an online talk for IEEE AES, I told the story of how a Guatemalan meme gave us the idea for Astro Tracker, the asteroid impact simulator we built at the 2025 NASA Space Apps Challenge.'),
    body: [
      text('Yo estudiaba Perito en Computación cuando empezó a circular un meme sobre un meteorito que caía en algún departamento de Guatemala. Con mis compañeros nos preguntamos cuánto mediría el cráter y a cuánta gente afectaría. Elegimos el reto Meteor Madness para explorar esa pregunta. El mes que pasé enseñándole al equipo a construir aplicaciones con MERN nos dio una base común para ese fin de semana.',
        'I was in high school studying computing when a meme started going around about a meteorite hitting one of Guatemala’s departments. My classmates and I wondered how big the crater would be and how many people might be affected. We chose the Meteor Madness challenge to explore that question. I spent a month teaching the team to build apps with the MERN stack so we had some common ground going into the weekend.'),
      text('El sábado teníamos datos de asteroides de la NASA y ninguna manera de convertirlos en una estimación del daño. Cerramos el editor un rato y encontramos en arXiv un artículo con fórmulas para estimar el tamaño del cráter y de la zona afectada. Ver esas primeras cifras en la pantalla nos ayudó a decidir qué funciones podíamos recortar para terminar el simulador.',
        'On Saturday we had NASA asteroid data and no way to turn it into a damage estimate. We stepped away from the code and found a paper on arXiv with formulas for estimating the size of the crater and the affected area. Seeing those first numbers on screen helped us decide which features we could cut to finish the simulator.'),
      text('Diez minutos antes del cierre se cayó la versión que íbamos a entregar. Subí un archivo de texto que decía «ayuda» para que Vercel volviera a publicar el proyecto. Entregamos a las 11:59 de la noche. El simulador funcionaba, pero habíamos dejado el video para el final. Hoy le pediría a alguien del equipo que, desde el primer día, piense cómo vamos a mostrar lo que construimos.',
        'Ten minutes before the deadline, our live site went down. I pushed a text file containing the word “ayuda” (“help”) to trigger a fresh deployment on Vercel. We submitted at 11:59 p.m. The simulator worked, but we’d left the video until the end. Next time I’d ask someone on the team to start thinking on day one about how we’ll show what we’ve built.'),
    ],
    source: { to: '/e/projects/astro-tracker', label: text('Explorar Astro Tracker', 'Explore Astro Tracker') },
  },
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
    id: 'data-as-a-service',
    status: 'published',
    format: 'talk',
    title: text('Data as a service', 'Data as a service'),
    summary: text('¿Qué hace que un dato sea útil para tomar una decisión? Un resumen de mi charla sobre la calidad de los datos.',
      'What makes a piece of data useful for a decision? A recap of my talk on data quality.'),
    body: [
      text('La charla gira alrededor de una pregunta que aparece al iniciar un proyecto: ¿qué necesito saber para que la siguiente decisión tenga sentido? Reunir más datos ayuda cuando sé qué pregunta quiero responder.',
        'The talk centers on a question that comes up at the start of a project: what do I need to know to make the next decision? Gathering more data helps once I know which question I want to answer.'),
      text('Una forma de llevar esa idea a la práctica es elegir una decisión concreta y rastrear los datos de los que depende. Me interesa saber quién recogió cada dato, cuándo lo hizo y qué cambió desde entonces. Esas preguntas también ayudan a elegir la herramienta que vale la pena construir.',
        'One way to put that idea to work is to choose a decision and trace the data it depends on. I want to know who collected each observation, when they collected it, and what has changed since then. Those questions also help me choose which tool is worth building.'),
    ],
    image: { src: '/brand/data-as-a-service.webp', alt: text('Luis De León en el escenario durante la charla Data as a service.', 'Luis De León on stage during the Data as a service talk.') },
    source: { to: '/community#data-as-a-service', label: text('Ver la charla en Comunidad', 'Find the talk in Community') },
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
    source: { to: '/e/projects/unmask-ai', label: text('Explorar Unmask AI', 'Explore Unmask AI') },
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
    source: { to: '/e/projects/agent-builder', label: text('Explorar Agent Builder', 'Explore Agent Builder') },
  },
]

export const publications = entries.filter(entry => entry.status === 'published')
