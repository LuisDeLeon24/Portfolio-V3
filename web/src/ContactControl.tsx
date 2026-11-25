import { useRef, useState, type FormEvent } from 'react'
import { CONTACT_EMAIL } from './i18n'
import { useLang } from './language'
import SocialLinks from './SocialLinks'
import './ContactControl.css'

export default function ContactControl({ onOpen }: { onOpen: () => void }) {
  const es = useLang().lang === 'es'
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'limited' | 'invalid'>('idle')
  const [draft, setDraft] = useState('')
  const sending = useRef(false)

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending.current) return
    const form = event.currentTarget
    const fields = Object.fromEntries(new FormData(form))
    const body = [fields.message, fields.name].filter(Boolean).join('\n\n')
    setDraft('mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(String(fields.subject))
      + '&body=' + encodeURIComponent(body))
    sending.current = true
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
        signal: AbortSignal.timeout(20000),
      })
      if (response.status === 429) { setStatus('limited'); return }
      if (response.status === 400) { setStatus('invalid'); return }
      if (!response.ok || (await response.json()).code !== 'accepted') {
        setStatus('error')
        return
      }
      form.reset()
      setDraft('')
      setStatus('sent')
    } catch {
      setStatus('error')
    } finally {
      sending.current = false
    }
  }

  const feedback = {
    idle: '', sending: '',
    sent: es ? 'Gracias por escribirme. Tu mensaje está en camino.' : 'Thanks for writing. Your message is on its way.',
    error: es ? 'No se pudo confirmar el envío. Tu mensaje sigue aquí.' : 'We couldn’t confirm the send. Your message is still here.',
    limited: es ? 'Espera un minuto antes de volver a enviar.' : 'Please wait a minute before trying again.',
    invalid: es ? 'Revisa tu correo, el asunto y el mensaje.' : 'Check your email address, subject, and message.',
  }[status]

  return (
    <>
      <button ref={trigger} type="button" lang="en" className="contact-trigger"
        aria-haspopup="dialog" aria-controls="contact-dialog"
        onClick={() => { onOpen(); if (status === 'sent') setStatus('idle'); dialog.current?.showModal() }}>
        Contact <span aria-hidden="true">↗</span>
      </button>
      <dialog ref={dialog} id="contact-dialog" className="contact-dialog" aria-labelledby="contact-heading"
        data-lenis-prevent="" onClose={() => trigger.current?.focus({ preventScroll: true })}
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        <div className="contact-dialog__inner">
          <div className="contact-dialog__heading">
            <h2 id="contact-heading">{es ? 'Hablemos' : 'Let’s talk'}<em>.</em></h2>
            <button type="button" className="contact-dialog__close" aria-label={es ? 'Cerrar' : 'Close'}
              onClick={() => dialog.current?.close()}>×</button>
          </div>
          <div className="contact-dialog__links">
            <a className="contact-dialog__address" href={'mailto:' + CONTACT_EMAIL}>{CONTACT_EMAIL}</a>
            <SocialLinks newTab />
          </div>
          <form onSubmit={sendMessage} onChange={() => { if (!sending.current) setStatus('idle') }}>
            <div hidden aria-hidden="true">
              <input name="website" tabIndex={-1} autoComplete="off" aria-label="Website" />
            </div>
            <label>{es ? 'Tu nombre (opcional)' : 'Your name (optional)'}
              <input name="name" autoComplete="name" maxLength={100} readOnly={status === 'sending'} />
            </label>
            <label>{es ? 'Tu correo' : 'Your email'}
              <input name="email" type="email" autoComplete="email" required maxLength={254} readOnly={status === 'sending'} />
            </label>
            <label>{es ? 'Asunto' : 'Subject'}
              <input name="subject" required maxLength={150} readOnly={status === 'sending'} />
            </label>
            <label>{es ? 'Mensaje' : 'Message'}
              <textarea name="message" rows={4} required maxLength={4000} readOnly={status === 'sending'} />
            </label>
            <button type="submit" className="contact-dialog__compose" disabled={status === 'sending'}>
              {status === 'sending' ? (es ? 'Enviando…' : 'Sending…') : (es ? 'Enviar mensaje' : 'Send message')}
              <span aria-hidden="true">↗</span>
            </button>
            <div role="status" className="contact-dialog__feedback">
              {feedback && <p>{feedback}</p>}
              {(status === 'error' || status === 'limited') &&
                <a href={draft}>{es ? 'Abrir el borrador en mi correo' : 'Open the draft in my email app'}</a>}
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
