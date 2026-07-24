import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAdmin, ValidatedSession } from '@/lib/auth/middleware'

/**
 * GET /api/admin/leads/anonymous-hot
 *
 * Behavioral lead-scoring for ANONYMOUS website visitors (no contact info yet).
 * Reads the existing `analytics_events` table, groups the recent event stream
 * by `sessionId`, and scores each session on buying-intent signals so the
 * admin/CRM can surface "hot" sessions for retargeting budget and to gauge
 * which pages convert.
 *
 * Read-only. Never writes.
 *
 * Query params:
 * - days:     lookback window in days (default 7)
 * - minScore: minimum score to include a session (default 25)
 *
 * Response: { success, days, count, sessions: [...] }
 */

// Safety valve: cap the scan so one request stays bounded regardless of volume.
const MAX_EVENTS = 5000
// Only the top-N hottest sessions are returned to the UI.
const MAX_SESSIONS = 100

interface EventRow {
  sessionId: string | null
  eventType: string
  eventName: string
  pagePath: string | null
  city: string | null
  country: string | null
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  createdAt: Date
}

interface ScoredSession {
  sessionId: string
  score: number
  signals: string[]
  pagesViewed: number
  firstSeen: string
  lastSeen: string
  city: string | null
  country: string | null
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  entryPagePath: string | null
  lastPagePath: string | null
}

const FEE_RE = /fee/i
const DEMO_RE = /demo|book-free|free-.*demo/i
const HUB_RE = /neet-coaching-|ib-biology|ap-biology|olympiad/i

function scoreSession(sessionId: string, events: EventRow[]): ScoredSession {
  // Chronological order so first/last and entry/exit pages are correct.
  const sorted = [...events].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  const first = sorted[0]
  const last = sorted[sorted.length - 1]

  const signals: string[] = []
  let score = 0

  // --- distinct pages viewed: +2 each, capped at +10 ---
  const distinctPages = new Set(
    sorted.map((e) => e.pagePath).filter((p): p is string => Boolean(p))
  )
  const pagesViewed = distinctPages.size
  if (pagesViewed > 0) {
    const pageScore = Math.min(pagesViewed * 2, 10)
    score += pageScore
    signals.push(`${pagesViewed} pages viewed (+${pageScore})`)
  }

  const allPaths = [...distinctPages]

  // --- visited a fees page: +15 ---
  if (allPaths.some((p) => FEE_RE.test(p))) {
    score += 15
    signals.push('viewed fees page (+15)')
  }

  // --- visited a demo/booking page: +20 ---
  if (allPaths.some((p) => DEMO_RE.test(p))) {
    score += 20
    signals.push('viewed demo/booking page (+20)')
  }

  // --- viewed an exam-vertical or city hub page: +5 ---
  if (allPaths.some((p) => HUB_RE.test(p))) {
    score += 5
    signals.push('viewed exam/city hub page (+5)')
  }

  // --- event-name driven signals ---
  const eventNames = new Set(sorted.map((e) => e.eventName))
  if (eventNames.has('whatsapp_click')) {
    score += 30
    signals.push('clicked WhatsApp (+30)')
  }
  if (eventNames.has('tool_completed')) {
    score += 25
    signals.push('completed a tool / calculator (+25)')
  }
  if (eventNames.has('push_subscribe')) {
    score += 25
    signals.push('subscribed to push (+25)')
  }

  // --- session spanned > 3 minutes: +10 ---
  const spanMs = last.createdAt.getTime() - first.createdAt.getTime()
  if (spanMs > 3 * 60 * 1000) {
    score += 10
    signals.push('engaged > 3 min (+10)')
  }

  // Prefer the most recently-known non-null geo / utm attribution values.
  const pickLatest = (key: keyof EventRow): string | null => {
    for (let i = sorted.length - 1; i >= 0; i--) {
      const v = sorted[i][key]
      if (v) return v as string
    }
    return null
  }

  return {
    sessionId,
    score,
    signals,
    pagesViewed,
    firstSeen: first.createdAt.toISOString(),
    lastSeen: last.createdAt.toISOString(),
    city: pickLatest('city'),
    country: pickLatest('country'),
    utmSource: pickLatest('utmSource'),
    utmMedium: pickLatest('utmMedium'),
    utmCampaign: pickLatest('utmCampaign'),
    entryPagePath: first.pagePath,
    lastPagePath: last.pagePath,
  }
}

async function handleGET(request: NextRequest, _session: ValidatedSession): Promise<Response> {
  const { searchParams } = new URL(request.url)

  const daysParam = Number(searchParams.get('days'))
  const days = Number.isFinite(daysParam) && daysParam > 0 ? Math.min(daysParam, 90) : 7

  const minScoreParam = Number(searchParams.get('minScore'))
  const minScore = Number.isFinite(minScoreParam) && minScoreParam >= 0 ? minScoreParam : 25

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const events = (await prisma.analytics_events.findMany({
    where: {
      userId: null,
      sessionId: { not: null },
      createdAt: { gte: since },
    },
    select: {
      sessionId: true,
      eventType: true,
      eventName: true,
      pagePath: true,
      city: true,
      country: true,
      utmSource: true,
      utmMedium: true,
      utmCampaign: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: MAX_EVENTS,
  })) as EventRow[]

  // Group by sessionId in JS.
  const bySession = new Map<string, EventRow[]>()
  for (const e of events) {
    if (!e.sessionId) continue
    const group = bySession.get(e.sessionId)
    if (group) group.push(e)
    else bySession.set(e.sessionId, [e])
  }

  const sessions = [...bySession.entries()]
    .map(([sessionId, group]) => scoreSession(sessionId, group))
    .filter((s) => s.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_SESSIONS)

  return NextResponse.json({
    success: true,
    days,
    count: sessions.length,
    sessions,
  })
}

export const GET = withAdmin(handleGET)
