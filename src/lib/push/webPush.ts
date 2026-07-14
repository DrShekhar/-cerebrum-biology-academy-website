import webpush from 'web-push'
import { prisma } from '@/lib/prisma'

/**
 * Web-push (VAPID) sender.
 *
 * Config: VAPID_PUBLIC_KEY + VAPID_PRIVATE_KEY (generate once with
 * `npx web-push generate-vapid-keys`) and optional VAPID_SUBJECT
 * (mailto: or https: URL). No-ops gracefully when unset.
 *
 * Payload shape matches what public/sw.js expects: { title, body, url, tag }.
 * Dead subscriptions (404/410 from the push service) are pruned on send.
 */

export interface PushPayload {
  title: string
  body: string
  url?: string
  tag?: string
}

let configured = false

export function isPushConfigured(): boolean {
  return Boolean(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY)
}

function ensureConfigured(): boolean {
  if (configured) return true
  if (!isPushConfigured()) return false
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:shekharcsingh57@gmail.com',
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  )
  configured = true
  return true
}

async function sendToSubscriptions(
  subs: { id: string; endpoint: string; p256dh: string; auth: string }[],
  payload: PushPayload
): Promise<{ sent: number; pruned: number }> {
  if (!ensureConfigured() || subs.length === 0) return { sent: 0, pruned: 0 }

  let sent = 0
  const dead: string[] = []
  const body = JSON.stringify(payload)

  await Promise.allSettled(
    subs.map(async (s) => {
      try {
        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          body
        )
        sent++
      } catch (err: unknown) {
        const status = (err as { statusCode?: number })?.statusCode
        if (status === 404 || status === 410) dead.push(s.id)
      }
    })
  )

  if (dead.length > 0) {
    await prisma.push_subscriptions.deleteMany({ where: { id: { in: dead } } }).catch(() => {})
  }
  return { sent, pruned: dead.length }
}

/** Push to one user's devices. */
export async function sendPushToUser(userId: string, payload: PushPayload) {
  if (!ensureConfigured()) return { sent: 0, pruned: 0 }
  const subs = await prisma.push_subscriptions.findMany({
    where: { userId },
    select: { id: true, endpoint: true, p256dh: true, auth: true },
  })
  return sendToSubscriptions(subs, payload)
}

/** Broadcast to every subscription (announcements). Batched. */
export async function sendPushToAll(payload: PushPayload) {
  if (!ensureConfigured()) return { sent: 0, pruned: 0 }
  let sent = 0
  let pruned = 0
  let cursor: string | undefined
  // Batch through subscriptions to keep memory bounded.
  for (;;) {
    const batch = await prisma.push_subscriptions.findMany({
      take: 500,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { id: 'asc' },
      select: { id: true, endpoint: true, p256dh: true, auth: true },
    })
    if (batch.length === 0) break
    const res = await sendToSubscriptions(batch, payload)
    sent += res.sent
    pruned += res.pruned
    cursor = batch[batch.length - 1].id
    if (batch.length < 500) break
  }
  return { sent, pruned }
}
