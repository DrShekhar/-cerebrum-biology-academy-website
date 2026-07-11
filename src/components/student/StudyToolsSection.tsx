'use client'

/**
 * Study tools — folds the three genuinely-unique surfaces from the retired
 * /dashboard (PersonalizedStudentDashboard) into the canonical student home:
 *   • Study Timer (StudySessionTab) — live session stopwatch + weak-area quick starts
 *   • Goals (GoalsTab) — self-contained; fetches /api/gamification/goals
 *   • Study Schedule (ScheduleTab) — day plan from weak areas + streak
 *
 * Self-contained: owns the timer state the old parent used to hold, and derives
 * the student's real weak areas from their test attempts (same logic the retired
 * dashboard used — nothing fabricated). A segmented control keeps it compact on
 * mobile.
 */

import { useEffect, useMemo, useState } from 'react'
import { Timer, Trophy, CalendarDays } from 'lucide-react'
import { StudySessionTab, GoalsTab, ScheduleTab, type WeakArea } from '@/components/dashboard/tabs'

const EMERALD = '#17924f'

type Tool = 'timer' | 'goals' | 'schedule'

interface AttemptLike {
  strengthAreas?: string[] | null
  weaknessAreas?: string[] | null
}

const TOOLS: { id: Tool; label: string; icon: typeof Timer }[] = [
  { id: 'timer', label: 'Study Timer', icon: Timer },
  { id: 'goals', label: 'Goals', icon: Trophy },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
]

/** Top weak areas from real attempts (mirrors the retired dashboard's logic). */
function deriveWeakAreas(attempts: AttemptLike[]): WeakArea[] {
  const counts = new Map<string, number>()
  for (const a of attempts) {
    for (const area of a.weaknessAreas ?? []) counts.set(area, (counts.get(area) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((x, y) => y[1] - x[1])
    .slice(0, 5)
    .map(
      ([chapter, count]): WeakArea => ({
        chapter,
        topic: 'Multiple concepts',
        difficulty: count >= 3 ? 'high' : count >= 2 ? 'medium' : 'low',
        improvement: -count,
        recommendedStudyTime: count * 30,
      })
    )
}

export function StudyToolsSection({
  attempts,
  studyStreak,
}: {
  attempts: AttemptLike[]
  studyStreak: number
}) {
  const [tool, setTool] = useState<Tool>('timer')
  const weakAreas = useMemo(() => deriveWeakAreas(attempts), [attempts])

  // Study timer state (previously held by PersonalizedStudentDashboard).
  const [studyTimer, setStudyTimer] = useState(0)
  const [isStudying, setIsStudying] = useState(false)
  const [currentSession, setCurrentSession] = useState('')

  useEffect(() => {
    if (!isStudying) return
    const interval = setInterval(() => setStudyTimer((prev) => prev + 1), 1000)
    return () => clearInterval(interval)
  }, [isStudying])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  const startStudySession = (chapter: string) => {
    setCurrentSession(chapter)
    setIsStudying(true)
    setStudyTimer(0)
  }
  const pauseStudySession = () => setIsStudying(false)
  const stopStudySession = () => {
    setIsStudying(false)
    setStudyTimer(0)
    setCurrentSession('')
  }

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-bold text-gray-900">Study tools</h2>
        <p className="text-xs text-gray-400">timer · goals · schedule</p>
      </div>

      {/* Segmented control — scrolls rather than wraps on very small screens */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {TOOLS.map((t) => {
          const active = tool === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={active ? { background: EMERALD } : undefined}
              aria-pressed={active}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      {tool === 'timer' && (
        <StudySessionTab
          studyTimer={studyTimer}
          isStudying={isStudying}
          currentSession={currentSession}
          weakAreas={weakAreas}
          onStartSession={startStudySession}
          onPauseSession={pauseStudySession}
          onStopSession={stopStudySession}
          formatTime={formatTime}
        />
      )}
      {tool === 'goals' && <GoalsTab />}
      {tool === 'schedule' && <ScheduleTab weakAreas={weakAreas} studyStreak={studyStreak} />}
    </section>
  )
}
