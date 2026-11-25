import open2 from './assets/community-logos/open2.png'
import openai from './assets/community-logos/openai.png'
import ieee from './assets/community-logos/ieee.png'
import { useLang } from './language'
import './CommunityLogos.css'

export function CommunityLogos() {
  const { lang } = useLang()
  return (
    <ul className="community-logos" aria-label={lang === 'es' ? 'Mis comunidades' : 'My communities'}>
      <li>
        <img className="community-logos__open2" src={open2} alt="Open2" width="1514" height="357" loading="lazy" />
        <span>Head of Builders</span>
      </li>
      <li>
        <img className="community-logos__openai" src={openai} alt="OpenAI" width="735" height="140" loading="lazy" />
        <span>Codex Ambassador</span>
      </li>
      <li>
        <img className="community-logos__ieee" src={ieee} alt="IEEE" width="640" height="364" loading="lazy" />
        <span>Student Member</span>
      </li>
    </ul>
  )
}
