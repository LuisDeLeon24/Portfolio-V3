import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from './language'
import seo from './seo/routes.json'

type RouteSeo = (typeof seo.routes)[number]
const routesByPath = new Map<string, RouteSeo>(seo.routes.map(route => [route.path, route]))

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

/** Keeps title, description, canonical and og:* in sync with the current route and language. */
export default function RouteMeta() {
  const { pathname } = useLocation()
  const { lang } = useLang()
  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
    const url = seo.site + path
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
    upsertMeta('property', 'og:url', url)
    const route = routesByPath.get(path)
    if (!route) return
    const { title, description } = route[lang]
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
  }, [pathname, lang])
  return null
}
