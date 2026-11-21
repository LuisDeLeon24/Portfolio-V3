import { useRef, type FormEvent } from 'react'
import { CONTACT_EMAIL } from './i18n'
import { useLang } from './language'
import SocialLinks from './SocialLinks'
import './ContactControl.css'

export default function ContactControl({ onOpen }: { onOpen: () => void }) {
  const es = useLang().lang === 'es'
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = new FormData(form)
    const subject = String(values.get('subject')).trim()
    const message = String(values.get('message')).trim()
    const name = String(values.get('name')).trim()
    const body = [message, name].filter(Boolean).join('\n\n').replace(/\r?\n/g, '\r\n')
    window.location.assign('mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body))
  }

  return (
    <>
      <button ref={trigger} type="button" lang="en" className="contact-trigger"
        aria-haspopup="dialog" aria-controls="contact-dialog"
        onClick={() => { onOpen(); dialog.current?.showModal() }}>
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
          <form onSubmit={prepareEmail}>
            <label>{es ? 'Tu nombre (opcional)' : 'Your name (optional)'}
              <input name="name" autoComplete="name" maxLength={100} />
            </label>
            <label>{es ? 'Asunto' : 'Subject'}
              <input name="subject" required maxLength={150} />
            </label>
            <label>{es ? 'Mensaje' : 'Message'}
              <textarea name="message" rows={4} required />
            </label>
            <p>{es ? 'Se abrirá un borrador en tu aplicación de correo para que puedas revisarlo y enviarlo.'
                   : 'A draft will open in your email app for you to review and send.'}</p>
            <button type="submit" className="contact-dialog__compose">
              {es ? 'Abrir borrador' : 'Open email draft'} <span aria-hidden="true">↗</span>
            </button>
          </form>
        </div>
      </dialog>
    </>
  )
}
