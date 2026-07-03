'use client'

/**
 * CBTExam — NTA-style Computer-Based Test exam-day simulator.
 *
 * Replicates the real JEE/NEET-CBT interface: instructions gate, section tabs,
 * colour-coded question palette (not-visited / not-answered / answered / marked /
 * answered+marked), Save & Next / Mark for Review / Clear Response controls,
 * whole-paper countdown with auto-submit, basic anti-cheat (fullscreen + tab-switch
 * counter + copy/right-click block), and a submit summary → confirm → result flow.
 *
 * Self-contained: takes a MockTest + Question[] and manages its own state. Answers
 * are persisted to localStorage per test so a refresh resumes the attempt. (Server-
 * side persistence is a follow-up stage.)
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Maximize,
  X,
  CheckCircle2,
} from 'lucide-react'
import type { MockTest, Question } from '@/types/mockTest'

type Phase = 'instructions' | 'exam' | 'result'

export interface CBTResult {
  correct: number
  incorrect: number
  unattempted: number
  score: number
  maxScore: number
  perSection: Record<string, { correct: number; incorrect: number; unattempted: number }>
  rank?: number
  percentile?: number
  totalCandidates?: number
}

export interface CBTReviewItem {
  id: string
  questionText: string
  options: { id: string; text: string }[]
  subject: string
  topic: string
  yourAnswer: string | null
  correctAnswer: string
  isCorrect: boolean
  explanation: string
}

/** A recorded proctoring event during the attempt. */
export interface CBTProctorEvent {
  type: 'tab_switch' | 'fullscreen_exit' | 'copy_attempt'
  at: string
}

/** Attempt state passed to server save/submit callbacks. */
export interface CBTAttemptState {
  answers: Record<string, string>
  marked: string[]
  visited: string[]
  currentIndex: number
  remainingTime: number
  tabSwitchCount: number
  fullscreenExits: number
  suspiciousActivity: CBTProctorEvent[]
}

interface CBTServer {
  /** Fire-and-forget autosave. */
  onSave: (state: CBTAttemptState) => void
  /** Server-side scoring — returns the scorecard (client has no answer key). */
  onSubmit: (state: CBTAttemptState) => Promise<CBTResult | null>
  /** Post-submit solutions review (correct answers + explanations). */
  onReview?: () => Promise<CBTReviewItem[] | null>
  initialState?: { answers: Record<string, string>; marked: string[]; visited: string[] }
  initialRemaining?: number
  initialIndex?: number
  resumed?: boolean
}

interface CBTExamProps {
  test: MockTest
  candidateName?: string
  onExit: () => void
  /** When provided, the exam persists + scores on the server instead of locally. */
  server?: CBTServer
}

interface QuestionState {
  answer: string | null
  marked: boolean
  visited: boolean
}

const CORRECT_MARKS = 4
const NEGATIVE_MARKS = 1

function sectionLabel(subject: string): string {
  const s = (subject || 'biology').toLowerCase()
  if (s === 'botany') return 'Botany'
  if (s === 'zoology') return 'Zoology'
  if (s === 'physics') return 'Physics'
  if (s === 'chemistry') return 'Chemistry'
  return 'Biology'
}

function formatTime(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return [h, m, sec].map((n) => String(n).padStart(2, '0')).join(':')
}

export function CBTExam({ test, candidateName, onExit, server }: CBTExamProps) {
  const storageKey = `cbt_attempt_${test.id}`
  const [serverResult, setServerResult] = useState<CBTResult | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [reviewItems, setReviewItems] = useState<CBTReviewItem[] | null>(null)
  const [loadingReview, setLoadingReview] = useState(false)

  // Order questions by section so navigation + palette are grouped.
  const orderedQuestions = useMemo<Question[]>(() => {
    const bySection = new Map<string, Question[]>()
    for (const q of test.questions) {
      const key = sectionLabel(q.subject)
      const arr = bySection.get(key) || []
      arr.push(q)
      bySection.set(key, arr)
    }
    return [...bySection.values()].flat()
  }, [test.questions])

  const sections = useMemo(() => {
    const seen: string[] = []
    for (const q of orderedQuestions) {
      const label = sectionLabel(q.subject)
      if (!seen.includes(label)) seen.push(label)
    }
    return seen
  }, [orderedQuestions])

  const [phase, setPhase] = useState<Phase>('instructions')
  const [agreed, setAgreed] = useState(false)
  const [states, setStates] = useState<Record<string, QuestionState>>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeSection, setActiveSection] = useState(sections[0] || 'Biology')
  const [timeRemaining, setTimeRemaining] = useState(test.duration * 60)
  const [tabSwitches, setTabSwitches] = useState(0)
  const [showWarning, setShowWarning] = useState<string | null>(null)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [showPalette, setShowPalette] = useState(true)
  const [resumeAvailable, setResumeAvailable] = useState(false)
  const [fullscreenExits, setFullscreenExits] = useState(0)
  const examRef = useRef<HTMLDivElement>(null)
  const proctorRef = useRef<CBTProctorEvent[]>([])

  const logProctorEvent = useCallback((type: CBTProctorEvent['type']) => {
    if (proctorRef.current.length < 500) {
      proctorRef.current.push({ type, at: new Date().toISOString() })
    }
  }, [])

  const currentQ = orderedQuestions[currentIndex]

  const collectState = useCallback((): CBTAttemptState => {
    const answers: Record<string, string> = {}
    const marked: string[] = []
    const visited: string[] = []
    for (const [qid, st] of Object.entries(states)) {
      if (st.answer) answers[qid] = st.answer
      if (st.marked) marked.push(qid)
      if (st.visited) visited.push(qid)
    }
    return {
      answers,
      marked,
      visited,
      currentIndex,
      remainingTime: timeRemaining,
      tabSwitchCount: tabSwitches,
      fullscreenExits,
      suspiciousActivity: proctorRef.current,
    }
  }, [states, currentIndex, timeRemaining, tabSwitches, fullscreenExits])

  // ── Resume detection ──────────────────────────────────────────────────────
  useEffect(() => {
    if (server) {
      setResumeAvailable(Boolean(server.resumed))
      return
    }
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && !parsed.submitted) setResumeAvailable(true)
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const persist = useCallback(
    (extra: Record<string, unknown> = {}) => {
      if (server) {
        server.onSave(collectState())
        return
      }
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({ states, currentIndex, timeRemaining, submitted: false, ...extra })
        )
      } catch {
        /* storage full / disabled — non-fatal */
      }
    },
    [server, collectState, storageKey, states, currentIndex, timeRemaining]
  )

  // ── Countdown ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'exam') return
    const id = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id)
          handleSubmit(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // Persist every 10s while in exam.
  useEffect(() => {
    if (phase !== 'exam') return
    const id = setInterval(() => persist(), 10000)
    return () => clearInterval(id)
  }, [phase, persist])

  // ── Anti-cheat: tab-switch + fullscreen-exit + copy/right-click block ──────
  useEffect(() => {
    if (phase !== 'exam') return
    const onVisibility = () => {
      if (document.hidden) {
        setTabSwitches((n) => n + 1)
        logProctorEvent('tab_switch')
        setShowWarning('You left the exam window. This is recorded. Stay on the exam tab.')
      }
    }
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenExits((n) => n + 1)
        logProctorEvent('fullscreen_exit')
      }
    }
    const block = (e: Event) => {
      e.preventDefault()
      logProctorEvent('copy_attempt')
    }
    document.addEventListener('visibilitychange', onVisibility)
    document.addEventListener('fullscreenchange', onFullscreenChange)
    const el = examRef.current
    el?.addEventListener('copy', block)
    el?.addEventListener('contextmenu', block)
    el?.addEventListener('cut', block)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      el?.removeEventListener('copy', block)
      el?.removeEventListener('contextmenu', block)
      el?.removeEventListener('cut', block)
    }
  }, [phase, logProctorEvent])

  const enterFullscreen = () => {
    examRef.current?.requestFullscreen?.().catch(() => {})
  }

  // ── State mutators ────────────────────────────────────────────────────────
  const ensureVisited = useCallback((qid: string) => {
    setStates((prev) => {
      const cur = prev[qid] || { answer: null, marked: false, visited: false }
      if (cur.visited) return prev
      return { ...prev, [qid]: { ...cur, visited: true } }
    })
  }, [])

  useEffect(() => {
    if (phase === 'exam' && currentQ) ensureVisited(currentQ.id)
  }, [phase, currentQ, ensureVisited])

  const selectOption = (optionId: string) => {
    if (!currentQ) return
    setStates((prev) => {
      const cur = prev[currentQ.id] || { answer: null, marked: false, visited: true }
      return { ...prev, [currentQ.id]: { ...cur, answer: optionId, visited: true } }
    })
  }

  const clearResponse = () => {
    if (!currentQ) return
    setStates((prev) => {
      const cur = prev[currentQ.id] || { answer: null, marked: false, visited: true }
      return { ...prev, [currentQ.id]: { ...cur, answer: null } }
    })
  }

  const goTo = (index: number) => {
    if (index < 0 || index >= orderedQuestions.length) return
    setCurrentIndex(index)
    setActiveSection(sectionLabel(orderedQuestions[index].subject))
    persist({ currentIndex: index })
  }

  const saveAndNext = () => {
    goTo(Math.min(currentIndex + 1, orderedQuestions.length - 1))
  }

  const markAndNext = () => {
    if (currentQ) {
      setStates((prev) => {
        const cur = prev[currentQ.id] || { answer: null, marked: false, visited: true }
        return { ...prev, [currentQ.id]: { ...cur, marked: true, visited: true } }
      })
    }
    goTo(Math.min(currentIndex + 1, orderedQuestions.length - 1))
  }

  // ── Palette status ────────────────────────────────────────────────────────
  const statusOf = (
    qid: string
  ): 'notVisited' | 'notAnswered' | 'answered' | 'marked' | 'answeredMarked' => {
    const st = states[qid]
    if (!st || !st.visited) return 'notVisited'
    if (st.answer && st.marked) return 'answeredMarked'
    if (st.marked) return 'marked'
    if (st.answer) return 'answered'
    return 'notAnswered'
  }

  const paletteColor: Record<string, string> = {
    notVisited: 'bg-gray-200 text-gray-700 border-gray-300',
    notAnswered: 'bg-red-500 text-white border-red-600',
    answered: 'bg-green-600 text-white border-green-700',
    marked: 'bg-purple-600 text-white border-purple-700',
    answeredMarked: 'bg-purple-600 text-white border-purple-700 ring-2 ring-green-400',
  }

  // ── Counts ────────────────────────────────────────────────────────────────
  const counts = useMemo(() => {
    let answered = 0,
      marked = 0,
      notAnswered = 0,
      notVisited = 0
    for (const q of orderedQuestions) {
      const s = statusOf(q.id)
      if (s === 'answered') answered++
      else if (s === 'answeredMarked') {
        answered++
        marked++
      } else if (s === 'marked') marked++
      else if (s === 'notAnswered') notAnswered++
      else notVisited++
    }
    return { answered, marked, notAnswered, notVisited }
  }, [orderedQuestions, states])

  // ── Result ────────────────────────────────────────────────────────────────
  const result = useMemo(() => {
    let correct = 0,
      incorrect = 0,
      unattempted = 0
    const perSection: Record<string, { correct: number; incorrect: number; unattempted: number }> =
      {}
    for (const q of orderedQuestions) {
      const sec = sectionLabel(q.subject)
      perSection[sec] = perSection[sec] || { correct: 0, incorrect: 0, unattempted: 0 }
      const ans = states[q.id]?.answer
      if (!ans) {
        unattempted++
        perSection[sec].unattempted++
      } else if (ans === q.correctAnswer) {
        correct++
        perSection[sec].correct++
      } else {
        incorrect++
        perSection[sec].incorrect++
      }
    }
    const score = correct * CORRECT_MARKS - incorrect * NEGATIVE_MARKS
    const maxScore = orderedQuestions.length * CORRECT_MARKS
    return { correct, incorrect, unattempted, score, maxScore, perSection }
  }, [orderedQuestions, states])

  const handleSubmit = async (auto = false) => {
    setShowSubmitConfirm(false)
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    if (server) {
      setSubmitting(true)
      try {
        const res = await server.onSubmit(collectState())
        if (res) setServerResult(res)
      } catch {
        /* fall through to result with whatever we have */
      }
      setSubmitting(false)
    } else {
      try {
        localStorage.setItem(storageKey, JSON.stringify({ submitted: true }))
      } catch {
        /* ignore */
      }
    }
    setPhase('result')
    if (auto) setShowWarning(null)
  }

  const startExam = (resume: boolean) => {
    if (server) {
      if (resume && server.initialState) {
        const { answers, marked, visited } = server.initialState
        const markedSet = new Set(marked)
        const visitedSet = new Set(visited)
        const hydrated: Record<string, QuestionState> = {}
        for (const q of orderedQuestions) {
          const a = answers[q.id]
          if (a || markedSet.has(q.id) || visitedSet.has(q.id)) {
            hydrated[q.id] = {
              answer: a || null,
              marked: markedSet.has(q.id),
              visited: visitedSet.has(q.id),
            }
          }
        }
        setStates(hydrated)
        if (typeof server.initialIndex === 'number') setCurrentIndex(server.initialIndex)
      }
      if (typeof server.initialRemaining === 'number') setTimeRemaining(server.initialRemaining)
    } else if (resume) {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || '{}')
        if (saved.states) setStates(saved.states)
        if (typeof saved.currentIndex === 'number') setCurrentIndex(saved.currentIndex)
        if (typeof saved.timeRemaining === 'number') setTimeRemaining(saved.timeRemaining)
      } catch {
        /* ignore */
      }
    }
    setPhase('exam')
    setTimeout(enterFullscreen, 100)
  }

  // ── RENDER: Instructions ──────────────────────────────────────────────────
  if (phase === 'instructions') {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Duration" value={`${test.duration} min`} />
            <Stat label="Questions" value={String(test.totalQuestions)} />
            <Stat label="Max Marks" value={String(test.totalMarks)} />
            <Stat label="Marking" value="+4 / −1" />
          </div>

          <div className="mt-6 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-900">
            <p className="font-semibold">General Instructions</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                The countdown timer at the top shows time remaining; the test auto-submits at zero.
              </li>
              <li>
                Question palette colours: green = answered, red = not answered, purple = marked for
                review, grey = not visited.
              </li>
              <li>
                Use <b>Save &amp; Next</b> to save, <b>Mark for Review</b> to flag,{' '}
                <b>Clear Response</b> to unselect.
              </li>
              <li>A marked question is evaluated only if an answer is also selected.</li>
              <li>
                Leaving the exam tab/window is recorded. Do not switch tabs or exit full-screen.
              </li>
              <li>Each correct answer is +4; each wrong answer is −1; unattempted is 0.</li>
              {(test.instructions || []).map((ins, i) => (
                <li key={i}>{ins}</li>
              ))}
            </ul>
          </div>

          {candidateName && (
            <p className="mt-4 text-sm text-gray-600">
              Candidate: <span className="font-medium text-gray-900">{candidateName}</span>
            </p>
          )}

          <label className="mt-6 flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              className="mt-0.5"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I have read and understood the instructions. I will not use any unfair means.
          </label>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={onExit}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Exit
            </button>
            {resumeAvailable && (
              <button
                disabled={!agreed}
                onClick={() => startExam(true)}
                className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
              >
                Resume attempt
              </button>
            )}
            <button
              disabled={!agreed}
              onClick={() => startExam(false)}
              className="rounded-lg bg-green-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-50"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── RENDER: Result ────────────────────────────────────────────────────────
  if (phase === 'result') {
    const r: CBTResult = serverResult ?? result
    const pct = r.maxScore > 0 ? Math.round((Math.max(0, r.score) / r.maxScore) * 100) : 0
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
          <h1 className="mt-3 text-2xl font-bold text-gray-900">Test Submitted</h1>
          <div className="mt-6 text-5xl font-bold text-gray-900">
            {r.score}
            <span className="text-2xl text-gray-400"> / {r.maxScore}</span>
          </div>
          <p className="mt-1 text-gray-500">{pct}%</p>

          {typeof r.rank === 'number' && typeof r.totalCandidates === 'number' && (
            <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-1 rounded-lg bg-blue-50 px-4 py-2 text-sm text-blue-900">
              <span>
                Rank <b>{r.rank}</b> of {r.totalCandidates}
              </span>
              {typeof r.percentile === 'number' && (
                <span>
                  Percentile <b>{r.percentile.toFixed(1)}</b>
                </span>
              )}
            </div>
          )}

          <div className="mt-6 grid grid-cols-3 gap-4">
            <Stat label="Correct" value={String(r.correct)} tone="green" />
            <Stat label="Incorrect" value={String(r.incorrect)} tone="red" />
            <Stat label="Unattempted" value={String(r.unattempted)} />
          </div>

          <div className="mt-6 text-left">
            <h2 className="mb-2 text-sm font-semibold text-gray-700">Section breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-1">Section</th>
                    <th className="py-1">Correct</th>
                    <th className="py-1">Incorrect</th>
                    <th className="py-1">Unattempted</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(r.perSection).map(([sec, row]) => (
                    <tr key={sec} className="border-t border-gray-100">
                      <td className="py-1.5 font-medium text-gray-900">{sec}</td>
                      <td className="py-1.5 text-green-700">{row.correct}</td>
                      <td className="py-1.5 text-red-600">{row.incorrect}</td>
                      <td className="py-1.5 text-gray-500">{row.unattempted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {(tabSwitches > 0 || fullscreenExits > 0) && (
            <p className="mt-4 text-xs text-amber-700">
              Proctoring: {tabSwitches} tab-switch/away event(s)
              {fullscreenExits > 0 ? ` and ${fullscreenExits} full-screen exit(s)` : ''} were
              recorded during this attempt.
            </p>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {server?.onReview && !reviewItems && (
              <button
                disabled={loadingReview}
                onClick={async () => {
                  setLoadingReview(true)
                  try {
                    const items = await server.onReview!()
                    if (items) setReviewItems(items)
                  } finally {
                    setLoadingReview(false)
                  }
                }}
                className="rounded-lg border border-green-700 px-6 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50 disabled:opacity-60"
              >
                {loadingReview ? 'Loading…' : 'Review solutions'}
              </button>
            )}
            <button
              onClick={onExit}
              className="rounded-lg bg-green-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
            >
              Done
            </button>
          </div>
        </div>

        {/* Solutions review */}
        {reviewItems && (
          <div className="mt-6 space-y-4">
            {reviewItems.map((item, i) => (
              <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-500">
                    Q{i + 1} · {item.subject}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-medium ${
                      item.isCorrect
                        ? 'bg-green-100 text-green-700'
                        : item.yourAnswer
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {item.isCorrect ? 'Correct' : item.yourAnswer ? 'Incorrect' : 'Unattempted'}
                  </span>
                </div>
                <p className="text-sm text-gray-900">{item.questionText}</p>
                <div className="mt-3 space-y-1.5">
                  {item.options.map((opt) => {
                    const isCorrect = opt.id === item.correctAnswer
                    const isYours = opt.id === item.yourAnswer
                    return (
                      <div
                        key={opt.id}
                        className={`rounded-md border px-3 py-2 text-sm ${
                          isCorrect
                            ? 'border-green-500 bg-green-50 text-green-900'
                            : isYours
                              ? 'border-red-400 bg-red-50 text-red-900'
                              : 'border-gray-200 text-gray-700'
                        }`}
                      >
                        <span className="font-medium">{opt.id}.</span> {opt.text}
                        {isCorrect && <span className="ml-2 text-xs font-semibold">✓ correct</span>}
                        {isYours && !isCorrect && (
                          <span className="ml-2 text-xs font-semibold">your answer</span>
                        )}
                      </div>
                    )
                  })}
                </div>
                {item.explanation && (
                  <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">Explanation: </span>
                    {item.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── RENDER: Exam ──────────────────────────────────────────────────────────
  const sectionQuestions = orderedQuestions.filter((q) => sectionLabel(q.subject) === activeSection)

  return (
    <div ref={examRef} className="min-h-screen select-none bg-gray-100">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
        <div className="truncate text-sm font-semibold text-gray-900">{test.title}</div>
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-sm ${
              timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-800'
            }`}
          >
            <Clock className="h-4 w-4" />
            {formatTime(timeRemaining)}
          </div>
          <button
            onClick={enterFullscreen}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
            title="Full screen"
            aria-label="Enter full screen"
          >
            <Maximize className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="rounded-md bg-green-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-800"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Section tabs */}
      {sections.length > 1 && (
        <div className="flex gap-1 border-b border-gray-200 bg-white px-4">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => {
                const first = orderedQuestions.findIndex((q) => sectionLabel(q.subject) === sec)
                if (first >= 0) goTo(first)
              }}
              className={`border-b-2 px-4 py-2 text-sm font-medium ${
                activeSection === sec
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      )}

      <div className="mx-auto flex max-w-6xl flex-col gap-4 p-4 lg:flex-row">
        {/* Question panel */}
        <div className="flex-1">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">
                Question {currentIndex + 1} of {orderedQuestions.length}
              </span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {sectionLabel(currentQ?.subject || '')} · +{CORRECT_MARKS} / −{NEGATIVE_MARKS}
              </span>
            </div>

            {currentQ && (
              <>
                <p className="text-gray-900">{currentQ.questionText}</p>
                {currentQ.questionImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={currentQ.questionImage} alt="" className="mt-3 max-h-64 rounded-lg" />
                )}
                <div className="mt-4 space-y-2">
                  {currentQ.options.map((opt, i) => {
                    const selected = states[currentQ.id]?.answer === opt.id
                    return (
                      <label
                        key={opt.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm ${
                          selected
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q_${currentQ.id}`}
                          className="mt-0.5"
                          checked={selected}
                          onChange={() => selectOption(opt.id)}
                        />
                        <span className="font-medium text-gray-500">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        <span className="text-gray-800">{opt.text}</span>
                      </label>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          {/* Controls */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button
              onClick={clearResponse}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Clear Response
            </button>
            <button
              onClick={markAndNext}
              className="inline-flex items-center gap-1 rounded-lg border border-purple-300 px-3 py-2 text-sm text-purple-700 hover:bg-purple-50"
            >
              <Flag className="h-4 w-4" /> Mark for Review &amp; Next
            </button>
            <button
              onClick={saveAndNext}
              className="ml-auto inline-flex items-center gap-1 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
            >
              Save &amp; Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Palette */}
        {showPalette && (
          <div className="w-full lg:w-72">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="mb-3 grid grid-cols-2 gap-1.5 text-xs text-gray-600">
                <Legend color="bg-green-600" label={`Answered (${counts.answered})`} />
                <Legend color="bg-red-500" label={`Not answered (${counts.notAnswered})`} />
                <Legend color="bg-purple-600" label={`Marked (${counts.marked})`} />
                <Legend color="bg-gray-200" label={`Not visited (${counts.notVisited})`} />
              </div>
              <div className="mb-1 text-xs font-semibold text-gray-500">{activeSection}</div>
              <div className="grid grid-cols-5 gap-1.5">
                {sectionQuestions.map((q) => {
                  const globalIdx = orderedQuestions.findIndex((x) => x.id === q.id)
                  const status = statusOf(q.id)
                  return (
                    <button
                      key={q.id}
                      onClick={() => goTo(globalIdx)}
                      className={`h-9 rounded border text-xs font-semibold ${paletteColor[status]} ${
                        globalIdx === currentIndex ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      {globalIdx + 1}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tab-switch warning */}
      {showWarning && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-red-600 px-4 py-2 text-sm text-white shadow-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {showWarning}
            <button onClick={() => setShowWarning(null)} className="ml-2">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Submit confirm */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">Submit test?</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat label="Answered" value={String(counts.answered)} tone="green" />
              <Stat label="Not answered" value={String(counts.notAnswered)} tone="red" />
              <Stat label="Marked" value={String(counts.marked)} />
              <Stat label="Not visited" value={String(counts.notVisited)} />
            </div>
            <p className="mt-3 text-sm text-gray-600">
              You cannot change answers after submitting. Marked questions are scored only if
              answered.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Continue test
              </button>
              <button
                onClick={() => handleSubmit(false)}
                disabled={submitting}
                className="rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'green' | 'red' }) {
  const color =
    tone === 'green' ? 'text-green-700' : tone === 'red' ? 'text-red-600' : 'text-gray-900'
  return (
    <div className="rounded-lg bg-gray-50 p-3 text-center">
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`inline-block h-3 w-3 rounded ${color}`} />
      {label}
    </div>
  )
}
