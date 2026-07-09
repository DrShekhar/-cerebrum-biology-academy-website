'use client'

/**
 * P1 dashboard hero — the roadmap's north-star overview, built ONLY from real
 * data (test attempts, enrollments, flashcard queue). Emerald #17924f accent,
 * amber for streak energy. One load sequence: ring fill + count-up + staggered
 * reveal; respects prefers-reduced-motion. New students (0 attempts) get a
 * designed first-test state instead of empty zeros.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Flame, Trophy, Target, ArrowRight, Play, Layers, GraduationCap } from 'lucide-react'

const EMERALD = '#17924f'
const AMBER = '#f59e0b'
const CORAL = '#f87171'

export interface HeroAttempt {
  percentage: number
  createdAt: string
  strengthAreas?: string[] | null
  weaknessAreas?: string[] | null
}

interface PlanItem {
  label: string
  detail: string
  href: string
  icon: 'course' | 'cards' | 'test'
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function useCountUp(target: number, durationMs = 900) {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(0)
  const raf = useRef<number | null>(null)
  useEffect(() => {
    if (reduced) {
      setValue(target)
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [target, durationMs, reduced])
  return value
}

/** Animated projection ring: avg practice-test % mapped onto the 360-mark Biology section. */
function ScoreRing({ attempts }: { attempts: HeroAttempt[] }) {
  const reduced = usePrefersReducedMotion()
  const avgPct = attempts.length
    ? attempts.reduce((a, b) => a + b.percentage, 0) / attempts.length
    : 0
  const projected = Math.round((avgPct / 100) * 360)
  const shown = useCountUp(projected)
  const R = 64
  const C = 2 * Math.PI * R
  const frac = Math.min(1, avgPct / 100)
  const [drawn, setDrawn] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 60)
    return () => clearTimeout(t)
  }, [])
  const dash = drawn || reduced ? C * (1 - frac) : C

  return (
    <div className="relative h-40 w-40 shrink-0">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r={R} fill="none" stroke="#e5efe8" strokeWidth="12" />
        <circle
          cx="80"
          cy="80"
          r={R}
          fill="none"
          stroke={EMERALD}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={dash}
          style={{
            transition: reduced ? 'none' : 'stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {attempts.length === 0 ? (
          <>
            <span className="text-3xl font-black text-gray-300">—</span>
            <span className="text-[11px] font-medium text-gray-400">no tests yet</span>
          </>
        ) : (
          <>
            <span className="text-4xl font-black tabular-nums text-gray-900">{shown}</span>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              / 360 projected
            </span>
          </>
        )}
      </div>
    </div>
  )
}

/** Real score trajectory: per-attempt % over time, 85% target line, best-score milestone dot. */
function TrajectoryChart({ attempts }: { attempts: HeroAttempt[] }) {
  const points = useMemo(() => {
    const chrono = [...attempts].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    return chrono.slice(-12).map((a) => ({
      pct: Math.round(a.percentage),
      date: new Date(a.createdAt),
    }))
  }, [attempts])

  if (points.length < 2) {
    return (
      <div className="flex h-full min-h-[10rem] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 p-6 text-center">
        <Target className="mb-2 h-6 w-6 text-gray-300" />
        <p className="text-sm font-medium text-gray-500">
          Your score trajectory appears after two tests
        </p>
        <Link
          href="/mock-tests"
          className="mt-2 text-sm font-semibold hover:underline"
          style={{ color: EMERALD }}
        >
          Take a practice test →
        </Link>
      </div>
    )
  }

  const W = 320
  const H = 140
  const PAD = 18
  const xs = (i: number) => PAD + (i * (W - PAD * 2)) / (points.length - 1)
  const ys = (pct: number) => H - PAD - ((H - PAD * 2) * pct) / 100
  const best = points.reduce((m, p, i) => (p.pct > points[m].pct ? i : m), 0)
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xs(i)},${ys(p.pct)}`).join(' ')
  const area = `${path} L${xs(points.length - 1)},${H - PAD} L${xs(0)},${H - PAD} Z`
  const last = points[points.length - 1]

  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Score trajectory</p>
        <p className="text-xs tabular-nums text-gray-500">
          latest <span className="font-bold text-gray-900">{last.pct}%</span>
        </p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-1 w-full">
        <line
          x1={PAD}
          x2={W - PAD}
          y1={ys(85)}
          y2={ys(85)}
          stroke={AMBER}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <text x={W - PAD} y={ys(85) - 4} textAnchor="end" fontSize="9" fill={AMBER}>
          85% target
        </text>
        <path d={area} fill={EMERALD} opacity="0.08" />
        <path d={path} fill="none" stroke={EMERALD} strokeWidth="2.5" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={xs(i)}
            cy={ys(p.pct)}
            r={i === best ? 4.5 : 2.5}
            fill={i === best ? AMBER : EMERALD}
          />
        ))}
      </svg>
      <p className="text-right text-[10px] text-gray-400">
        amber dot = personal best ({points[best].pct}%)
      </p>
    </div>
  )
}

/** Today's plan — the "what do I do right now" card, from real enrollment + revision-queue data. */
function TodaysPlan({ userId, isGuest }: { userId: string | null; isGuest: boolean }) {
  const [items, setItems] = useState<PlanItem[] | null>(null)

  useEffect(() => {
    let cancelled = false
    async function build() {
      const plan: PlanItem[] = []
      if (userId && !isGuest) {
        try {
          const res = await fetch(`/api/enrollments?userId=${userId}`)
          const json = await res.json()
          const active = (json.enrollments || []).find(
            (e: { currentProgress: number }) => e.currentProgress < 100
          )
          if (active) {
            plan.push({
              label: `Continue ${active.courseName}`,
              detail: `${active.currentProgress || 0}% complete — pick up where you left off`,
              href: `/student/courses/${active.courseId}`,
              icon: 'course',
            })
          }
        } catch {
          /* plan degrades gracefully */
        }
      }
      if (userId) {
        try {
          const res = await fetch(
            `/api/mcq/review?freeUserId=${encodeURIComponent(userId)}&includeNew=false`
          )
          const json = await res.json()
          const due = json?.data?.stats?.reviewCount ?? 0
          if (due > 0) {
            plan.push({
              label: `Revise ${due} due flashcard${due === 1 ? '' : 's'}`,
              detail: 'Spaced repetition keeps yesterday’s work permanent',
              href: '/flashcards',
              icon: 'cards',
            })
          }
        } catch {
          /* skip */
        }
      }
      plan.push({
        label: plan.length ? 'Then: one practice test' : 'Start with a practice test',
        detail: 'Every attempt sharpens your projection and mastery map',
        href: '/mock-tests',
        icon: 'test',
      })
      if (!cancelled) setItems(plan.slice(0, 3))
    }
    build()
    return () => {
      cancelled = true
    }
  }, [userId, isGuest])

  const iconFor = (k: PlanItem['icon']) =>
    k === 'course' ? (
      <GraduationCap className="h-4 w-4" />
    ) : k === 'cards' ? (
      <Layers className="h-4 w-4" />
    ) : (
      <Play className="h-4 w-4" />
    )

  return (
    <div
      className="flex h-full flex-col rounded-2xl p-5 text-white"
      style={{ background: EMERALD }}
    >
      <p className="text-xs font-bold uppercase tracking-wider text-white/70">Today&apos;s plan</p>
      <div className="mt-3 flex-1 space-y-2">
        {(items || [null, null]).map((item, i) =>
          item ? (
            <Link
              key={i}
              href={item.href}
              className="group flex items-center gap-3 rounded-xl bg-white/10 p-3 transition-colors hover:bg-white/20 active:scale-[0.99]"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/15">
                {iconFor(item.icon)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold">{item.label}</span>
                <span className="block truncate text-xs text-white/70">{item.detail}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ) : (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-white/10" />
          )
        )}
      </div>
    </div>
  )
}

/** Chapter mastery grid from strength/weakness tallies across real attempts. */
export function MasteryGrid({ attempts }: { attempts: HeroAttempt[] }) {
  const tiles = useMemo(() => {
    const net = new Map<string, number>()
    for (const a of attempts) {
      for (const t of a.strengthAreas ?? []) net.set(t, (net.get(t) ?? 0) + 1)
      for (const t of a.weaknessAreas ?? []) net.set(t, (net.get(t) ?? 0) - 1)
    }
    return [...net.entries()].sort((a, b) => b[1] - a[1])
  }, [attempts])

  if (tiles.length === 0) return null

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-bold text-gray-900">Chapter Mastery</h2>
        <p className="text-xs text-gray-400">from your test strengths &amp; weak areas</p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {tiles.slice(0, 12).map(([topic, score]) => {
          const strong = score > 0
          const neutral = score === 0
          return (
            <div
              key={topic}
              className="rounded-xl border p-3"
              style={{
                borderColor: neutral ? '#e5e7eb' : strong ? '#bbe3cb' : '#fecaca',
                background: neutral ? '#fafafa' : strong ? '#f0f9f3' : '#fef2f2',
              }}
            >
              <p className="truncate text-sm font-semibold text-gray-900" title={topic}>
                {topic}
              </p>
              <p
                className="mt-0.5 text-xs font-bold"
                style={{ color: neutral ? '#9ca3af' : strong ? EMERALD : CORAL }}
              >
                {strong ? 'Strong' : neutral ? 'Mixed' : 'Needs work'}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function DashboardHero({
  attempts,
  streak,
  userId,
  isGuest,
}: {
  attempts: HeroAttempt[]
  streak: number
  userId: string | null
  isGuest: boolean
}) {
  const best = attempts.length ? Math.round(Math.max(...attempts.map((a) => a.percentage))) : null

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
      <div className="grid gap-6 p-6 lg:grid-cols-[auto_1fr_minmax(240px,0.9fr)]">
        {/* Ring + chips */}
        <div className="flex flex-col items-center gap-4">
          <ScoreRing attempts={attempts} />
          <div className="flex flex-wrap justify-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
              style={{ background: '#fef3c7', color: '#b45309' }}
            >
              <Flame className="h-3.5 w-3.5" /> {streak} day{streak === 1 ? '' : 's'}
            </span>
            {best !== null && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
                style={{ background: '#f0f9f3', color: EMERALD }}
              >
                <Trophy className="h-3.5 w-3.5" /> best {best}%
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
              <Target className="h-3.5 w-3.5" /> {attempts.length} test
              {attempts.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        {/* Trajectory */}
        <div className="min-w-0">
          <TrajectoryChart attempts={attempts} />
        </div>

        {/* Today's plan */}
        <TodaysPlan userId={userId} isGuest={isGuest} />
      </div>
    </section>
  )
}
