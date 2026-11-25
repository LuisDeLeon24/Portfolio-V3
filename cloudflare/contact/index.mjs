const maxBytes = 24 * 1024
const mailbox = /^[a-z0-9.!#$%&'*+/=?^_{}|~\x60-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i

function result(status, code, headers = {}) {
  return Response.json({ code }, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  })
}

async function readForm(request) {
  if (Number(request.headers.get('content-length')) > maxBytes) return null
  const reader = request.body?.getReader()
  if (!reader) return null
  let size = 0
  let text = ''
  const decoder = new TextDecoder()
  try {
    for (;;) {
      const { value, done } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maxBytes) {
        await reader.cancel()
        return null
      }
      text += decoder.decode(value, { stream: true })
    }
    return JSON.parse(text + decoder.decode())
  } catch {
    return null
  } finally {
    reader.releaseLock()
  }
}

function validLine(value, limit) {
  return typeof value === 'string' && value.length <= limit && !/[\r\n\0]/.test(value)
}

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== '/api/contact') return result(404, 'not_found')
    if (request.method !== 'POST') return result(405, 'method', { Allow: 'POST' })
    if (request.headers.get('sec-fetch-site') === 'cross-site') return result(403, 'forbidden')
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
      return result(415, 'content_type')
    }

    const form = await readForm(request)
    if (!form || form.website || !validLine(form.email, 254) || !mailbox.test(form.email.trim())
      || !validLine(form.name ?? '', 100) || !validLine(form.subject, 150) || !form.subject.trim()
      || typeof form.message !== 'string' || !form.message.trim() || form.message.length > 4000) {
      return result(400, 'invalid')
    }

    try {
      const visitor = request.headers.get('CF-Connecting-IP') || 'local'
      const { success } = await env.CONTACT_LIMIT.limit({ key: visitor })
      if (!success) return result(429, 'limited', { 'Retry-After': '60' })
      const email = form.email.trim()
      const name = form.name?.trim()
      const { messageId } = await env.CONTACT_MAIL.send({
        from: env.CONTACT_FROM,
        to: env.CONTACT_TO,
        replyTo: email,
        subject: '[Portafolio] ' + form.subject.trim(),
        text: [name ? name + ' <' + email + '>' : email, form.message.trim()].join('\n\n'),
      })
      if (messageId) return result(200, 'accepted')
    } catch (error) {
      // Exclude the form and the provider's message from logs.
      console.error('Contact mail failed', error?.code ?? 'unavailable')
    }
    return result(503, 'unavailable')
  },
}
