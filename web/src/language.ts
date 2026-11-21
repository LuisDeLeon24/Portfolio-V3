import { createContext, useContext } from 'react'
import type { Copy, Lang } from './i18n'

export type LanguageState = { lang: Lang; setLang: (lang: Lang) => void; t: Copy }
export const LangContext = createContext<LanguageState | null>(null)
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang requires LangProvider')
  return ctx
}
