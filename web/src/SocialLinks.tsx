import { SOCIAL_LINKS } from './i18n'
import { useLang } from './language'

const socialMarks: Record<string, string> = {
  github: 'M12 .9a11.1 11.1 0 0 0-3.5 21.6c.55.1.75-.24.75-.54v-2.1c-3.05.66-3.7-1.3-3.7-1.3-.5-1.3-1.22-1.65-1.22-1.65-1-.68.07-.67.07-.67 1.1.08 1.68 1.14 1.68 1.14.99 1.68 2.59 1.2 3.22.92.1-.71.38-1.2.7-1.48-2.44-.28-5.02-1.23-5.02-5.48 0-1.2.43-2.2 1.14-2.96-.12-.28-.49-1.4.1-2.92 0 0 .93-.3 3.05 1.13a10.6 10.6 0 0 1 5.55 0c2.11-1.43 3.04-1.13 3.04-1.13.6 1.53.23 2.65.12 2.92.71.77 1.13 1.75 1.13 2.96 0 4.26-2.59 5.2-5.04 5.47.4.35.75 1.02.75 2.06v3.09c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z',
  linkedin: 'M20.45 2H3.55C2.7 2 2 2.68 2 3.52v16.96c0 .84.7 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM8 19H5V9.5h3ZM6.5 8.2a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.85 1.25-1.85 2.54V19h-3V9.5h2.88v1.3h.04c.4-.76 1.38-1.57 2.84-1.57 3.04 0 3.69 2 3.69 4.6Z',
  x: 'M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.55L5.25 22H2.1l8.36-9.55L2.8 2h6.44l4.55 6.76L18.9 2ZM17.7 20.1h1.74L8.34 3.79H6.46L17.7 20.1Z',
}

export default function SocialLinks({ newTab = false }: { newTab?: boolean }) {
  const es = useLang().lang === 'es'
  return (
    <nav className="social-links" aria-label={es ? 'Redes sociales' : 'Social media'}>
      {SOCIAL_LINKS.map(({ id, href, label }) => (
        <a key={id} href={href} aria-label={label} title={label}
          target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>
          {socialMarks[id] ? (
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d={socialMarks[id]} fillRule="evenodd" />
            </svg>
          ) : label}
        </a>
      ))}
    </nav>
  )
}
