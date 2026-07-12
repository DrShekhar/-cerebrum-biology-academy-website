import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'
import { sendWhatsAppMessage, isInteraktConfigured } from '@/lib/interakt'
import { sendPushToUser, isPushConfigured } from '@/lib/push/webPush'

/**
 * Class Reminders Cron
 *
 * Notifies the session's TEACHER, every ACTIVE-enrolled STUDENT of the course
 * (respecting group scoping), and all ADMINs at 1 day / 1 hour / 15 min / 1 min
 * before a scheduled class. Each reminder carries a Join action (the meeting
 * link). Dedup is per (session, offset) via class_sessions.reminderOffsetsSent,
 * so the same reminder never sends twice; rescheduling clears it.
 *
 * NOTE: the 1-minute reminder requires the cron to run every minute
 * (schedule "* * * * *"), which needs a Vercel Pro plan (Hobby = daily only).
 * On Hobby, run at the finest available interval and the 1-min offset will fire
 * late or be skipped — configure an external per-minute pinger for exact timing.
 */

// Minutes-before offsets, largest first.
const OFFSETS = [1440, 60, 15, 1]
// A reminder fires when now is within [target - WINDOW, target]; sized so a
// coarse cron cadence still catches each offset without double-firing (dedup
// also guards). Kept under the smallest gap between offsets.
const WINDOW_MIN = 5

export async function GET(request: NextRequest) {
  return handleCron(request)
}

export async function POST(request: NextRequest) {
  return handleCron(request)
}

async function handleCron(request: NextRequest) {
  try {
    const cronSecret = process.env.CRON_SECRET
    if (!cronSecret) {
      logger.error('CRON_SECRET not configured')
      return NextResponse.json(
        { success: false, error: 'Cron configuration error' },
        { status: 500 }
      )
    }
    if (request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
      logger.warn('Unauthorized class reminders cron attempt')
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const waOn = isInteraktConfigured()
    const pushOn = isPushConfigured()
    if (!waOn && !pushOn) {
      return NextResponse.json({
        success: true,
        message: 'No reminder channel configured, nothing sent',
        stats: { processed: 0, reminded: 0 },
      })
    }

    const stats = await processClassReminders({ waOn, pushOn })
    logger.info('Class reminders cron completed', stats)
    return NextResponse.json({ success: true, stats })
  } catch (error) {
    // A missing reminderOffsetsSent column (migration not yet applied) lands
    // here — we log and exit rather than spamming, so no duplicate reminders.
    logger.error('Error in class reminders cron job:', { error })
    return NextResponse.json(
      { success: false, error: 'Class reminder processing failed' },
      { status: 500 }
    )
  }
}

async function processClassReminders({ waOn, pushOn }: { waOn: boolean; pushOn: boolean }) {
  const now = new Date()
  const horizon = new Date(now.getTime() + (OFFSETS[0] + WINDOW_MIN) * 60 * 1000)

  const sessions = await prisma.class_sessions.findMany({
    where: {
      status: { in: ['SCHEDULED', 'ONGOING'] },
      startTime: { gt: now, lte: horizon },
    },
    select: {
      id: true,
      title: true,
      courseId: true,
      groupId: true,
      teacherId: true,
      startTime: true,
      meetingLink: true,
      reminderOffsetsSent: true,
      courses: { select: { name: true } },
    },
  })

  let reminded = 0

  for (const s of sessions) {
    const minutesUntil = (s.startTime.getTime() - now.getTime()) / 60000

    // The due offset is the smallest one whose target time we've just reached
    // and haven't sent yet.
    const dueOffset = OFFSETS.find(
      (off) =>
        !s.reminderOffsetsSent.includes(off) &&
        minutesUntil <= off &&
        minutesUntil > off - WINDOW_MIN
    )
    if (dueOffset === undefined) continue

    const recipients = await resolveRecipients(s.courseId, s.groupId, s.teacherId)
    const when = humanizeOffset(dueOffset)
    const courseName = s.courses?.name || 'your class'
    const startLabel = s.startTime.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    await Promise.allSettled(
      recipients.map((r) =>
        notify(r, {
          title: `Class ${when}: ${s.title}`,
          body: `${courseName} starts at ${startLabel} IST.`,
          meetingLink: s.meetingLink,
          waOn,
          pushOn,
        })
      )
    )

    // Mark this offset sent (append; dedup guaranteed by the find above).
    await prisma.class_sessions.update({
      where: { id: s.id },
      data: { reminderOffsetsSent: { set: [...s.reminderOffsetsSent, dueOffset] } },
    })
    reminded++
  }

  return { processed: sessions.length, reminded }
}

interface Recipient {
  userId: string
  phone: string | null
  role: string
}

async function resolveRecipients(
  courseId: string,
  groupId: string | null,
  teacherId: string
): Promise<Recipient[]> {
  const byId = new Map<string, Recipient>()

  // Students: ACTIVE enrollments in the course. If the session is group-scoped,
  // narrow to that group's members.
  let studentIds: string[] | null = null
  if (groupId) {
    const members = await prisma.student_group_members
      .findMany({ where: { groupId }, select: { userId: true } })
      .catch(() => [] as { userId: string }[])
    studentIds = members.map((m) => m.userId)
  }

  const enrollments = await prisma.enrollments.findMany({
    where: {
      courseId,
      status: 'ACTIVE',
      ...(studentIds ? { userId: { in: studentIds } } : {}),
    },
    select: { users: { select: { id: true, phone: true, role: true } } },
  })
  for (const e of enrollments) {
    if (e.users)
      byId.set(e.users.id, { userId: e.users.id, phone: e.users.phone, role: e.users.role })
  }

  // The session's teacher + all admins (owner oversight).
  const staff = await prisma.users.findMany({
    where: { OR: [{ id: teacherId }, { role: 'ADMIN' }] },
    select: { id: true, phone: true, role: true },
  })
  for (const u of staff) byId.set(u.id, { userId: u.id, phone: u.phone, role: u.role })

  return Array.from(byId.values())
}

async function notify(
  r: Recipient,
  opts: { title: string; body: string; meetingLink: string | null; waOn: boolean; pushOn: boolean }
) {
  const joinSuffix = opts.meetingLink ? ` Join: ${opts.meetingLink}` : ''

  if (opts.pushOn) {
    await sendPushToUser(r.userId, {
      title: opts.title,
      body: opts.body,
      url: opts.meetingLink || '/student/dashboard',
      tag: 'class-reminder',
    }).catch(() => {})
  }

  if (opts.waOn && r.phone) {
    await sendWhatsAppMessage({
      phone: r.phone,
      message: `${opts.title}\n${opts.body}${joinSuffix}`,
    }).catch(() => {})
  }
}

function humanizeOffset(off: number): string {
  if (off >= 1440) return 'tomorrow'
  if (off >= 60) return `in ${off / 60} hour${off / 60 > 1 ? 's' : ''}`
  return `in ${off} min`
}
