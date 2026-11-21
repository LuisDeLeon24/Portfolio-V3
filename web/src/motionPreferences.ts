import { useSyncExternalStore } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
export { gsap, ScrollTrigger }
const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
function subscribe(refresh: () => void) {
  preference.addEventListener('change', refresh)
  return () => preference.removeEventListener('change', refresh)
}
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => preference.matches)
}
