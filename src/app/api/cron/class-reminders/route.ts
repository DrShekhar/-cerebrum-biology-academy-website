import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'
import { sendWhatsAppMessage, isWhatsAppSendConfigured } from '@/lib/interakt'
import { sendPushToUser, isPushConfigured } from '@/lib/push/webPush'

/**
 * Class Reminders Cron
 *
 * Notifies the session's TEACHER, every ACTIVE-enrolled STUDENT of the course
 * (respecting group scoping), and all ADMINs at 1 day / 1 hour / 15 min / 1 min
 * before a scheduled class. Each reminder carries a Join action (the meeting
 * link). Dedup + concurrency safety come from the class_reminder_log table:
 * the cron "claims" an (session, offset) by inserting its unique row BEFORE
 * sending, so overlapping per-minute invocations can't double-send; a claim is
 * released (deleted) only if every channel failed, so it retries next tick.
 *
 * NOTE: the 1-minute reminder requires the cron to run every minute
 * (schedule "* * * * *"), which needs a Vercel Pro plan (Hobby = daily only).
 */

// Minutes-before offsets, largest first.
const OFFSETS = [1440, 60, 15, 1]

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

    const waOn = isWhatsAppSendConfigured()
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
    logger.error('Error in class reminders cron job:', { error })
    return NextResponse.json(
      { success: false, error: 'Class reminder processing failed' },
      { status: 500 }
    )
  }
}

async function processClassReminders({ waOn, pushOn }: { waOn: boolean; pushOn: boolean }) {
  const now = new Date()
  const horizon = new Date(now.getTime() + OFFSETS[0] * 60 * 1000)

  const sessions = await prisma.class_sessions.findMany({
    where: {
      // RESCHEDULED included: a moved-and-marked-rescheduled class must still
      // notify against its new time. ONGOING harmless (startTime>now excludes it).
      status: { in: ['SCHEDULED', 'ONGOING', 'RESCHEDULED'] },
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
      topic: true,
      chapter: true,
      courses: { select: { name: true } },
      users: { select: { name: true } },
    },
  })

  let reminded = 0

  for (const s of sessions) {
    const minutesUntil = (s.startTime.getTime() - now.getTime()) / 60000

    // Every offset whose target time has already arrived (now >= startTime-off).
    const passed = OFFSETS.filter((off) => minutesUntil <= off)
    if (passed.length === 0) continue

    // Which of those have we not sent yet?
    const alreadySent = await prisma.class_reminder_log
      .findMany({ where: { sessionId: s.id, offset: { in: passed } }, select: { offset: true } })
      .then((rows) => new Set(rows.map((r) => r.offset)))
      .catch((e) => {
        // Table missing (migration not applied) → rethrow so the whole run 500s
        // cleanly instead of sending unguarded duplicates.
        throw e
      })

    const unsentPassed = passed.filter((off) => !alreadySent.has(off))
    if (unsentPassed.length === 0) continue

    // Send only the MOST URGENT unsent offset (smallest minutes-before). Any
    // larger offsets that were missed (late/skipped cron ticks) are suppressed —
    // we don't send a stale "1 day before" reminder 20 min before class — by
    // marking them sent below. This makes late/coarse cron cadence degrade to
    // "one timely reminder" instead of dropping everything.
    const dueOffset = Math.min(...unsentPassed)
    const staleOffsets = unsentPassed.filter((off) => off !== dueOffset)

    // CLAIM FIRST: insert the due row (unique on sessionId+offset). If another
    // invocation already claimed it, this throws → skip (no double-send).
    let claimed = false
    try {
      await prisma.class_reminder_log.create({
        data: { id: `crl_${s.id}_${dueOffset}`, sessionId: s.id, offset: dueOffset },
      })
      claimed = true
    } catch {
      claimed = false
    }
    if (!claimed) continue

    // Suppress the stale larger offsets (best-effort; not the urgent one).
    if (staleOffsets.length > 0) {
      await prisma.class_reminder_log
        .createMany({
          data: staleOffsets.map((off) => ({
            id: `crl_${s.id}_${off}`,
            sessionId: s.id,
            offset: off,
          })),
          skipDuplicates: true,
        })
        .catch(() => {})
    }

    const recipients = await resolveRecipients(s.courseId, s.groupId, s.teacherId)
    const timeRemaining = humanizeOffset(dueOffset)
    const subject = s.courses?.name || 'Your class'
    const facultyName = s.users?.name || 'Cerebrum Faculty'
    const startLabel = s.startTime.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    const results = await Promise.allSettled(
      recipients.map((r) =>
        notify(r, {
          studentName: r.name || 'Student',
          title: `Class ${timeRemaining}: ${s.title}`,
          body: `${subject} starts at ${startLabel} IST.`,
          timeRemaining,
          subject,
          topic: s.topic || s.chapter || s.title,
          facultyName,
          meetingLink: s.meetingLink,
          waOn,
          pushOn,
        })
      )
    )
    const delivered = results.some((r) => r.status === 'fulfilled' && r.value === true)

    // If nothing was delivered on any channel, release the claim so a later tick
    // retries (transient outage). Stale suppressions stay in place.
    if (!delivered) {
      await prisma.class_reminder_log
        .deleteMany({ where: { sessionId: s.id, offset: dueOffset } })
        .catch(() => {})
    } else {
      reminded++
    }
  }

  return { processed: sessions.length, reminded }
}

interface Recipient {
  userId: string
  name: string | null
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
  // narrow to that group's members. A group-lookup failure SKIPS the students
  // (returns null studentIds handled by caller) rather than silently notifying
  // no one — but here we simply let the error propagate to the run's catch.
  let studentIds: string[] | null = null
  if (groupId) {
    const members = await prisma.student_group_members.findMany({
      where: { groupId },
      select: { userId: true },
    })
    studentIds = members.map((m) => m.userId)
  }

  const enrollments = await prisma.enrollments.findMany({
    where: {
      courseId,
      status: 'ACTIVE',
      ...(studentIds ? { userId: { in: studentIds } } : {}),
    },
    select: { users: { select: { id: true, name: true, phone: true, role: true } } },
  })
  for (const e of enrollments) {
    if (e.users)
      byId.set(e.users.id, {
        userId: e.users.id,
        name: e.users.name,
        phone: e.users.phone,
        role: e.users.role,
      })
  }

  // The session's teacher + all admins (owner oversight).
  const staff = await prisma.users.findMany({
    where: { OR: [{ id: teacherId }, { role: 'ADMIN' }] },
    select: { id: true, name: true, phone: true, role: true },
  })
  for (const u of staff)
    byId.set(u.id, { userId: u.id, name: u.name, phone: u.phone, role: u.role })

  return Array.from(byId.values())
}

/** Returns true if the reminder was delivered on at least one channel. */
async function notify(
  r: Recipient,
  opts: {
    studentName: string
    title: string
    body: string
    timeRemaining: string
    subject: string
    topic: string
    facultyName: string
    meetingLink: string | null
    waOn: boolean
    pushOn: boolean
  }
): Promise<boolean> {
  let delivered = false

  if (opts.pushOn) {
    const res = await sendPushToUser(r.userId, {
      title: opts.title,
      body: opts.body,
      // Staff land on their sessions view; students on the join link/dashboard.
      url:
        opts.meetingLink ||
        (r.role === 'TEACHER' || r.role === 'ADMIN' ? '/teacher/sessions' : '/student/dashboard'),
      tag: 'class-reminder',
    }).catch(() => ({ sent: 0 }))
    if (res && typeof res.sent === 'number' && res.sent > 0) delivered = true
  }

  // Business-initiated WhatsApp OUTSIDE the 24h window must use an approved
  // template — a plain-text send is rejected by Meta. Use the approved
  // `class_reminder` template (params: name, time_remaining, subject, topic,
  // faculty, join_link).
  if (opts.waOn && r.phone) {
    const res = await sendWhatsAppMessage({
      phone: r.phone,
      templateName: 'class_reminder',
      templateParams: {
        '1': opts.studentName,
        '2': opts.timeRemaining,
        '3': opts.subject,
        '4': opts.topic,
        '5': opts.facultyName,
        '6': opts.meetingLink || 'Link will be shared shortly',
      },
    }).catch(() => ({ success: false }) as { success: boolean })
    if (res && (res as { success?: boolean }).success) delivered = true
  }

  return delivered
}

function humanizeOffset(off: number): string {
  if (off >= 1440) return 'tomorrow'
  if (off >= 60) return `in ${off / 60} hour${off / 60 > 1 ? 's' : ''}`
  return `in ${off} min`
}
