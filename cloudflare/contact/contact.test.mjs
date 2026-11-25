import assert from 'node:assert/strict'
import test from 'node:test'
import worker from './index.mjs'

const form = { name: 'Alex', email: 'alex@example.org', subject: 'Una charla', message: 'Hola, Luis.' }
function submit(data, send, allowed = true) {
  const request = new Request('https://ldeleon.com/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  })
  return worker.fetch(request, {
    CONTACT_FROM: 'form@example.org', CONTACT_TO: 'owner@example.org',
    CONTACT_MAIL: { send }, CONTACT_LIMIT: { limit: async () => ({ success: allowed }) },
  })
}

test('uses a fixed recipient and sends replies to the visitor', async () => {
  let delivered
  const res = await submit({ ...form, to: 'other@example.org' }, async mail => {
    delivered = mail
    return { messageId: 'test-message' }
  })
  assert.equal(delivered.to, 'owner@example.org')
  assert.equal(delivered.from, 'form@example.org')
  assert.equal(delivered.replyTo, form.email)
  assert.ok(delivered.text.includes(form.message))
  assert.equal(res.status, 200)
  assert.equal((await res.json()).code, 'accepted')
})

test('rejects incomplete, oversized or automated submissions before sending', async () => {
  for (const values of [{ email: '' }, { subject: ' ' }, { email: 'a@x.com,b@y.com' },
    { website: 'spam' }, { message: 'x'.repeat(30000) }]) {
    let called = false
    const res = await submit({ ...form, ...values }, () => { called = true })
    assert.equal(res.status, 400)
    assert.equal(called, false)
  }
})

test('reports rate limits and unconfirmed mail separately', async () => {
  let called = false
  const limited = await submit(form, () => { called = true }, false)
  assert.equal(called, false)
  assert.equal(limited.status, 429)
  assert.equal((await submit(form, async () => ({}))).status, 503)
})
