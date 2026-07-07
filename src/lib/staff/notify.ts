/**
 * Staff notification fanout — writes staff_notifications rows (the bell
 * store). Always wrapped so a notification failure never fails the write
 * that triggered it.
 */

import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'

export type StaffNotificationType =
  | 'MENTION_CHAT'
  | 'MENTION_LEAD'
  | 'LEAD_COMMENT_REPLY'
  | 'ANNOUNCEMENT'
  | 'SYSTEM'

export interface StaffNotificationInput {
  userIds: string[]
  type: StaffNotificationType
  title: string
  body: string
  href: string
  actorId?: string | null
  leadId?: string | null
  channelId?: string | null
}

function rand(): string {
  return `snotif_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Create one notification per recipient. The actor is always excluded.
 * Never throws.
 */
export async function notifyStaff(input: StaffNotificationInput): Promise<void> {
  try {
    const recipients = Array.from(new Set(input.userIds)).filter((id) => id && id !== input.actorId)
    if (recipients.length === 0) return

    // Only staff receive staff notifications, whatever the caller passed.
    const staff = await prisma.users.findMany({
      where: { id: { in: recipients }, role: { in: ['ADMIN', 'TEACHER', 'COUNSELOR'] } },
      select: { id: true },
    })
    if (staff.length === 0) return

    await prisma.staff_notifications.createMany({
      data: staff.map((s) => ({
        id: rand(),
        userId: s.id,
        type: input.type,
        title: input.title.slice(0, 200),
        body: input.body.slice(0, 500),
        actorId: input.actorId || null,
        href: input.href,
        leadId: input.leadId || null,
        channelId: input.channelId || null,
      })),
    })
  } catch (error) {
    logger.warn('notifyStaff failed (non-blocking)', {
      service: 'staff-notify',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
