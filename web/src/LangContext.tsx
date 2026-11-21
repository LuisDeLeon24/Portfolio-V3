import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, type Lang } from './i18n'
import { LangContext } from './language'

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem('ldl-lang') === 'en' ? 'en' : 'es'
    } catch {
      return 'es'
    }
  })
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('ldl-lang', lang)
    } catch {
      /* Storage can be disabled. */
    }
  }, [lang])
  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
