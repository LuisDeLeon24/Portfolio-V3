import type { Localized } from './editorial'
import shipaton from '../assets/events/Shipaton - 2026.jpeg'
import shipatonGroup from '../assets/events/Shipaton2 - 2026.jpeg'
import shipatonTrophy from '../assets/events/Shipaton3 - 2026.jpeg'
import shipatonLaptop from '../assets/events/Shipaton4 - 2026.jpeg'
import flisol from '../assets/events/Flisol Talk - 2026.jpeg'
import flisolPoster from '../assets/events/Flisol Talk ad - 2026.png'
import cursor from '../assets/events/Cursor Buildathon San Salvador -2026.jpeg'
import cursorVenue from '../assets/events/Cursor buildathon San Salvador2 - 2026.jpeg'
import intecap from '../assets/events/AI Talk Intecap - 2026.jpeg'
import intecapAudience from '../assets/events/AI Talk Intecap2 - 2026.jpeg'
import intecapStage from '../assets/events/AI Talk Intecap3 - 2026.jpeg'
import iceberg from '../assets/events/Iceberg de la IA talk -2026.jpeg'
import icebergIntro from '../assets/events/iceberg de la IA talk2 - 2026.jpeg'
import itu from '../assets/events/ITU Workshop - 2026.jpeg'
import ituFlags from '../assets/events/ITU Workshop2 - 2026.jpeg'
import demoStage from '../assets/events/The 502 Demo Day - 2026.jpeg'
import demoRoom from '../assets/events/The 502 Demo Day2 - 2026.jpeg'
import demoBadge from '../assets/events/The 502 Demo Day3 - 2026.jpeg'
import atom from '../assets/awards/Atom dev day.jpeg'
import ufm from '../assets/proyects/Arendi/Winners.jpeg'
import nasa from '../assets/awards/NASA Space Apps.png'

type CommunityPhoto = { src: string; alt: Localized }
export type CommunityMoment = {
  id: string
  title: Localized
  kind: 'event' | 'talk'
  featured?: boolean
  description: Localized
  photos: [CommunityPhoto, ...CommunityPhoto[]]
  to?: string
}

const text = (es: string, en = es): Localized => ({ es, en })
const photo = (src: string, es: string, en: string): CommunityPhoto => ({ src, alt: text(es, en) })

export const communityMoments: CommunityMoment[] = [
  {
    id: 'itu-workshop', title: text('Taller de la UIT', 'ITU Workshop'), kind: 'event',
    description: text('Una sesión de trabajo con participantes del taller de la Unión Internacional de Telecomunicaciones.', 'A working session with participants at the International Telecommunication Union workshop.'),
    photos: [
      photo(itu, 'Participantes del taller de la UIT reunidos en la sala.', 'ITU workshop participants gathered in the conference room.'),
      photo(ituFlags, 'Participante junto a las banderas en el taller de la UIT.', 'A participant next to the flags at the ITU workshop.'),
    ],
  },
  {
    id: 'shipaton', title: text('Shipatón'), kind: 'event',
    description: text('Una jornada de trabajo en equipo, de la pizarra a la laptop.', 'A day of working together, from the whiteboard to the laptop.'),
    photos: [
      photo(shipaton, 'Luis junto a un equipo que trabaja con sus laptops.', 'Luis beside a team working on their laptops.'),
      photo(shipatonGroup, 'Participantes del Shipatón reunidos frente a una pizarra.', 'Shipatón participants gathered at a whiteboard.'),
      photo(shipatonTrophy, 'Detalle del trofeo del Shipatón.', 'Close-up of the Shipatón trophy.'),
      photo(shipatonLaptop, 'Mesa de trabajo del Shipatón con una laptop y una botella roja.', 'A Shipatón workspace with a laptop and a red bottle.'),
    ],
  },
  {
    id: 'flisol-guatemala', title: text('FLISOL Guatemala'), kind: 'talk',
    to: '/publications/ia-para-todos',
    description: text('Mi charla en el Festival Latinoamericano de Instalación de Software Libre, el 9 de mayo de 2026.', 'My talk at the Latin American Free Software Installation Festival on May 9, 2026.'),
    photos: [
      photo(flisol, 'Luis frente a una proyección, con el público de FLISOL en el aula.', 'Luis presenting to the FLISOL audience in a classroom.'),
      photo(flisolPoster, 'Afiche de FLISOL Guatemala con la participación de Luis De León.', 'FLISOL Guatemala poster announcing Luis De León as a speaker.'),
    ],
  },
  {
    id: 'cursor-buildathon-san-salvador', title: text('Cursor Buildathon San Salvador'), kind: 'event',
    description: text('Recibí una beca de The 502 Project para el buildathon de San Salvador.', 'I received a travel grant from The 502 Project for the buildathon in San Salvador.'),
    to: '/premios/cursor-buildathon-travel',
    photos: [
      photo(cursor, 'El equipo del buildathon aparece en la pantalla de una laptop.', 'The buildathon team pictured on a laptop screen.'),
      photo(cursorVenue, 'Fachada iluminada de la sede del buildathon en San Salvador.', 'The illuminated buildathon venue in San Salvador at night.'),
    ],
  },
  {
    id: 'ia-intecap', title: text('IA en INTECAP', 'AI at INTECAP'), kind: 'talk',
    to: '/publications/del-prompt-al-flujo-de-trabajo',
    description: text('En INTECAP hablé del papel de las personas cuando la IA acelera el trabajo.', 'At INTECAP I spoke about the human role when AI speeds up our work.'),
    photos: [
      photo(intecap, 'Luis con un micrófono bajo la diapositiva «El cuello de botella humano».', 'Luis with a microphone beneath a slide about human bottlenecks.'),
      photo(intecapAudience, 'Asistentes a la charla de IA en las butacas del auditorio.', 'Attendees seated in the auditorium for the AI talk.'),
      photo(intecapStage, 'Vista del escenario de INTECAP desde el fondo del auditorio.', 'The INTECAP stage seen from the back of the auditorium.'),
    ],
  },
  {
    id: 'iceberg-de-la-ia', title: text('El iceberg de la IA', 'The AI iceberg'), kind: 'talk',
    description: text('Dos momentos en el escenario durante mi charla «El iceberg de la IA».', 'Two moments on stage during my talk “The AI iceberg.”'),
    photos: [
      photo(iceberg, 'Luis en el atril durante «El iceberg de la IA».', 'Luis at the lectern during “The AI iceberg.”'),
      photo(icebergIntro, 'Luis junto a la diapositiva de presentación con su nombre.', 'Luis next to the introductory slide with his name.'),
    ],
  },
  {
    id: 'the-502-demo-day', title: text('The 502 Demo Day'), kind: 'event',
    description: text('Momentos del Demo Day de The 502 Project en 2026, desde el escenario y entre el público.', 'Scenes from The 502 Project’s 2026 Demo Day, on stage and from the audience.'),
    photos: [
      photo(demoStage, 'Dos personas en el escenario frente a una pantalla verde en The 502 Demo Day.', 'Two people on stage in front of a green screen at The 502 Demo Day.'),
      photo(demoRoom, 'Vista desde las mesas del público hacia las dos pantallas de la sala.', 'The two presentation screens seen from the audience tables.'),
      photo(demoBadge, 'Credencial de Luis De León para The 502 Demo Day.', 'Luis De León’s badge for The 502 Demo Day.'),
    ],
  },
  {
    id: 'atom-dev-day', title: text('Atom Dev Day'), kind: 'event', featured: true,
    description: text('Nuestro prototipo de Agent Builder llegó al Top 5 del hackathon.', 'Our Agent Builder prototype made the top five at the hackathon.'),
    photos: [photo(atom, 'El equipo reunido en Atom Dev Day.', 'The team together at Atom Dev Day.')],
    to: '/e/projects/agent-builder',
  },
  {
    id: 'data-as-a-service', title: text('Data as a service'), kind: 'talk', featured: true,
    description: text('Una charla sobre cómo la calidad de los datos influye en los resultados de un proyecto.', 'A talk about how data quality shapes the outcome of a project.'),
    photos: [photo('/brand/data-as-a-service.webp', 'Luis en el escenario durante Data as a service.', 'Luis on stage during Data as a service.')],
    to: '/publications/data-as-a-service',
  },
  {
    id: 'ufm-cs-hackathon', title: text('UFM CS Hackathon'), kind: 'event', featured: true,
    description: text('Con Aprendi ganamos el primer lugar en el hackathon de la UFM.', 'Our team won first place at the UFM hackathon with Aprendi.'),
    photos: [photo(ufm, 'El equipo de Aprendi con el premio del hackathon de la UFM.', 'The Aprendi team with their UFM hackathon award.')],
    to: '/e/projects/aprendi',
  },
  {
    id: 'nasa-space-apps', title: text('NASA Space Apps Challenge'), kind: 'event',
    description: text('Presentamos Astro Tracker en Guatemala y recibimos la mención Global Connection.', 'We presented Astro Tracker in Guatemala and received the Global Connection honorable mention.'),
    photos: [photo(nasa, 'Imagen del NASA Space Apps Challenge en Guatemala.', 'Image from the NASA Space Apps Challenge in Guatemala.')],
    to: '/premios/nasa-space-apps',
  },
]
