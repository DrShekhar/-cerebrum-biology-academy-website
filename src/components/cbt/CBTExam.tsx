'use client'

/**
 * CBTExam — authentic replica of the NTA (TCS iON) NEET Computer-Based Test
 * interface.
 *
 * Faithfully reproduces the real exam software: instructions gate with the
 * official palette legend, blue header bars, section tabs, "Time Left" clock,
 * right-hand question palette with the five NTA status shapes (square /
 * red down-bevel / green up-bevel / purple circle / purple circle + green tick),
 * the exact four-button action bar (SAVE & NEXT · CLEAR · SAVE & MARK FOR
 * REVIEW · MARK FOR REVIEW & NEXT) plus << BACK / NEXT >>, SUBMIT under the
 * palette, and the per-section submit summary table.
 *
 * Authentic NTA behaviour: an option selection is NOT saved until a save
 * button is pressed — navigating away via the palette or BACK/NEXT discards
 * the unsaved selection, exactly like the real exam.
 *
 * Deliberate deviations from the real (desktop-only) software:
 *  - the palette becomes a slide-in drawer on small screens
 *  - anti-cheat hooks (fullscreen, tab-switch logging) are kept
 *  - a scorecard is shown after submit (the real exam just says goodbye)
 *
 * Self-contained: takes a MockTest + Question[] and manages its own state.
 * Answers persist to localStorage per test (or via the `server` callbacks) so
 * a refresh resumes the attempt.
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { AlertTriangle, CheckCircle2, User, X } from 'lucide-react'
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

type PaletteStatus = 'notVisited' | 'notAnswered' | 'answered' | 'marked' | 'answeredMarked'

const CORRECT_MARKS = 4
const NEGATIVE_MARKS = 1

/* ── NTA visual constants (TCS iON palette) ─────────────────────────────── */
const NTA_FONT = { fontFamily: 'Verdana, Arial, Helvetica, sans-serif' } as const
const NTA_BLUE = '#4E85C5' // header / section bars
const NTA_PANEL_BLUE = '#E5F6FD' // palette panel background
const GREEN = '#4CAF50' // answered
const RED = '#E4534D' // not answered
const PURPLE = '#9354BC' // marked for review
const BTN_GREEN = '#0F9D58' // SAVE & NEXT / SUBMIT
const BTN_ORANGE = '#FF9800' // SAVE & MARK FOR REVIEW
const BTN_BLUE = '#3B82C4' // MARK FOR REVIEW & NEXT

/** Beveled-top pentagon — NTA "Answered". */
const CLIP_ANSWERED = 'polygon(15% 0%, 85% 0%, 100% 28%, 100% 100%, 0% 100%, 0% 28%)'
/** Beveled-bottom pentagon — NTA "Not Answered". */
const CLIP_NOT_ANSWERED = 'polygon(0% 0%, 100% 0%, 100% 72%, 85% 100%, 15% 100%, 0% 72%)'

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
  /** Selected-but-not-yet-saved option for the current question (NTA rule). */
  const [pending, setPending] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeSection, setActiveSection] = useState(sections[0] || 'Biology')
  const [timeRemaining, setTimeRemaining] = useState(test.duration * 60)
  const [tabSwitches, setTabSwitches] = useState(0)
  const [showWarning, setShowWarning] = useState<string | null>(null)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [paletteCollapsed, setPaletteCollapsed] = useState(false)
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState(false)
  const [showInstructionsModal, setShowInstructionsModal] = useState(false)
  const [showPaperModal, setShowPaperModal] = useState(false)
  const [resumeAvailable, setResumeAvailable] = useState(false)
  const [fullscreenExits, setFullscreenExits] = useState(0)
  const examRef = useRef<HTMLDivElement>(null)
  const proctorRef = useRef<CBTProctorEvent[]>([])
  const statesRef = useRef(states)
  statesRef.current = states

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

  // ── State mutators (NTA rules) ────────────────────────────────────────────
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

  /**
   * Navigate to a question WITHOUT saving — exactly like the real exam,
   * any unsaved selection on the current question is discarded.
   */
  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= orderedQuestions.length) return
      const target = orderedQuestions[index]
      setCurrentIndex(index)
      setActiveSection(sectionLabel(target.subject))
      // Show the previously SAVED answer of the target question (if any).
      setPending(statesRef.current[target.id]?.answer ?? null)
      setMobilePaletteOpen(false)
      persist({ currentIndex: index })
    },
    [orderedQuestions, persist]
  )

  const commit = useCallback(
    (qid: string, patch: Partial<QuestionState>) => {
      setStates((prev) => {
        const cur = prev[qid] || { answer: null, marked: false, visited: true }
        return { ...prev, [qid]: { ...cur, visited: true, ...patch } }
      })
    },
    [setStates]
  )

  const advance = () => {
    if (currentIndex < orderedQuestions.length - 1) goTo(currentIndex + 1)
  }

  /** SAVE & NEXT — saves the selection (or records Not Answered) and moves on. */
  const saveAndNext = () => {
    if (!currentQ) return
    commit(currentQ.id, { answer: pending, marked: false })
    advance()
  }

  /** CLEAR — deselects on screen AND clears any saved answer (status → red). */
  const clearResponse = () => {
    if (!currentQ) return
    setPending(null)
    commit(currentQ.id, { answer: null })
  }

  /** SAVE & MARK FOR REVIEW — saves + flags; answered+marked IS evaluated. */
  const saveAndMarkForReview = () => {
    if (!currentQ) return
    commit(currentQ.id, { answer: pending, marked: true })
    advance()
  }

  /** MARK FOR REVIEW & NEXT — flags the question; a selected answer is kept
   *  (NTA rule: an answer on a marked question is considered for evaluation). */
  const markForReviewAndNext = () => {
    if (!currentQ) return
    commit(currentQ.id, { answer: pending, marked: true })
    advance()
  }

  // ── Palette status ────────────────────────────────────────────────────────
  const statusOf = useCallback(
    (qid: string): PaletteStatus => {
      const st = states[qid]
      if (!st || !st.visited) return 'notVisited'
      if (st.answer && st.marked) return 'answeredMarked'
      if (st.marked) return 'marked'
      if (st.answer) return 'answered'
      return 'notAnswered'
    },
    [states]
  )

  // ── Counts (5 NTA states, total + per-section) ────────────────────────────
  const counts = useMemo(() => {
    const zero = () => ({
      total: 0,
      answered: 0,
      notAnswered: 0,
      marked: 0,
      answeredMarked: 0,
      notVisited: 0,
    })
    const total = zero()
    const perSection: Record<string, ReturnType<typeof zero>> = {}
    for (const q of orderedQuestions) {
      const sec = sectionLabel(q.subject)
      perSection[sec] = perSection[sec] || zero()
      const s = statusOf(q.id)
      for (const bucket of [total, perSection[sec]]) {
        bucket.total++
        if (s === 'answered') bucket.answered++
        else if (s === 'answeredMarked') bucket.answeredMarked++
        else if (s === 'marked') bucket.marked++
        else if (s === 'notAnswered') bucket.notAnswered++
        else bucket.notVisited++
      }
    }
    return { total, perSection }
  }, [orderedQuestions, statusOf])

  // ── Result (local fallback when no server) ───────────────────────────────
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
    let hydrated: Record<string, QuestionState> = {}
    let startIndex = 0
    if (server) {
      if (resume && server.initialState) {
        const { answers, marked, visited } = server.initialState
        const markedSet = new Set(marked)
        const visitedSet = new Set(visited)
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
        if (typeof server.initialIndex === 'number') {
          startIndex = server.initialIndex
          setCurrentIndex(server.initialIndex)
        }
      }
      if (typeof server.initialRemaining === 'number') setTimeRemaining(server.initialRemaining)
    } else if (resume) {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || '{}')
        if (saved.states) {
          hydrated = saved.states
          setStates(saved.states)
        }
        if (typeof saved.currentIndex === 'number') {
          startIndex = saved.currentIndex
          setCurrentIndex(saved.currentIndex)
        }
        if (typeof saved.timeRemaining === 'number') setTimeRemaining(saved.timeRemaining)
      } catch {
        /* ignore */
      }
    }
    const startQ = orderedQuestions[startIndex]
    if (startQ) {
      setActiveSection(sectionLabel(startQ.subject))
      setPending(hydrated[startQ.id]?.answer ?? null)
    }
    setPhase('exam')
    setTimeout(enterFullscreen, 100)
  }

  /* ── Shared building blocks ─────────────────────────────────────────────── */

  const candidatePanel = (
    <div className="flex items-center gap-2 border-b border-gray-300 bg-white p-2">
      <div className="flex h-14 w-12 shrink-0 items-center justify-center border border-gray-300 bg-gray-100">
        <User className="h-8 w-8 text-gray-400" />
      </div>
      <div className="min-w-0 text-[12px] leading-tight text-gray-800">
        <p className="truncate font-bold">{candidateName || 'Candidate'}</p>
        <p className="mt-0.5 truncate text-gray-500">{test.title}</p>
      </div>
    </div>
  )

  const legend = (
    <div className="space-y-1 p-2 text-[11px] text-gray-800">
      <div className="grid grid-cols-2 gap-x-1 gap-y-1.5">
        <LegendItem status="answered" count={counts.total.answered} label="Answered" />
        <LegendItem status="notAnswered" count={counts.total.notAnswered} label="Not Answered" />
        <LegendItem status="notVisited" count={counts.total.notVisited} label="Not Visited" />
        <LegendItem status="marked" count={counts.total.marked} label="Marked for Review" />
      </div>
      <div className="pt-0.5">
        <LegendItem
          status="answeredMarked"
          count={counts.total.answeredMarked}
          label="Answered & Marked for Review (will be considered for evaluation)"
        />
      </div>
    </div>
  )

  const paletteGrid = (
    <div className="grid grid-cols-5 gap-x-1 gap-y-2 p-2">
      {orderedQuestions.map((q, idx) => {
        if (sectionLabel(q.subject) !== activeSection) return null
        return (
          <PaletteButton
            key={q.id}
            num={idx + 1}
            status={statusOf(q.id)}
            current={idx === currentIndex}
            onClick={() => goTo(idx)}
          />
        )
      })}
    </div>
  )

  const paletteColumn = (
    <div
      className="flex h-full w-full flex-col border-l border-gray-300"
      style={{ backgroundColor: NTA_PANEL_BLUE }}
    >
      {candidatePanel}
      {legend}
      <div
        className="px-2 py-1 text-[12px] font-bold text-white"
        style={{ backgroundColor: NTA_BLUE }}
      >
        {activeSection} — Choose a Question
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">{paletteGrid}</div>
      <div className="border-t border-gray-300 p-2">
        <button
          onClick={() => setShowSubmitConfirm(true)}
          className="w-full px-4 py-2 text-[13px] font-bold text-white hover:opacity-90"
          style={{ backgroundColor: BTN_GREEN }}
        >
          SUBMIT
        </button>
      </div>
    </div>
  )

  const instructionsBody = (
    <ol className="list-decimal space-y-2 pl-6 text-[13px] leading-relaxed text-gray-900">
      <li>
        Total duration of the examination is <b>{test.duration} minutes</b>.
      </li>
      <li>
        The clock will be set at the server. The countdown timer in the top right corner of screen
        will display the remaining time available for you to complete the examination. When the
        timer reaches zero, the examination will end by itself — you will not be required to end or
        submit your examination.
      </li>
      <li>
        The Questions Palette displayed on the right side of screen will show the status of each
        question using one of the following symbols:
        <div className="mt-2 space-y-1.5 rounded border border-gray-200 bg-gray-50 p-3">
          <LegendItem status="notVisited" label="You have not visited the question yet." />
          <LegendItem status="notAnswered" label="You have not answered the question." />
          <LegendItem status="answered" label="You have answered the question." />
          <LegendItem
            status="marked"
            label="You have NOT answered the question, but have marked the question for review."
          />
          <LegendItem
            status="answeredMarked"
            label="You have answered the question, but marked it for review."
          />
        </div>
        <p className="mt-2">
          The <b>Marked for Review</b> status for a question simply indicates that you would like to
          look at that question again. If a question is answered and Marked for Review, your answer
          for that question <b>will be considered</b> in the evaluation.
        </p>
      </li>
      <li>
        You can click on the arrow beside the question palette to collapse it and maximise the
        question window; click it again to reopen the palette.
      </li>
      <li>
        <b>Navigating to a Question:</b>
        <ol className="mt-1 list-[lower-alpha] space-y-1 pl-5">
          <li>
            Click on the question number in the Question Palette to go to that question directly.{' '}
            <b>Note that using this option does NOT save your answer to the current question.</b>
          </li>
          <li>
            Click on <b>Save &amp; Next</b> to save your answer for the current question and then go
            to the next question.
          </li>
          <li>
            Click on <b>Mark for Review &amp; Next</b> to save your answer for the current question,
            mark it for review, and then go to the next question.
          </li>
        </ol>
      </li>
      <li>
        <b>Answering a Question:</b>
        <ol className="mt-1 list-[lower-alpha] space-y-1 pl-5">
          <li>Choose one answer by clicking on the button of one of the options.</li>
          <li>
            To deselect your chosen answer, click on the button of the chosen option again or click
            on the <b>Clear Response</b> button.
          </li>
          <li>To change your chosen answer, click on the button of another option.</li>
          <li>To save your answer, you MUST click on the Save &amp; Next button.</li>
        </ol>
      </li>
      <li>
        <b>Marking scheme:</b> each correct answer is awarded <b>+{CORRECT_MARKS} marks</b>; each
        incorrect answer is awarded <b>−{NEGATIVE_MARKS} mark</b>; unanswered questions are given no
        marks.
      </li>
      <li>
        Sections in this question paper are displayed on the top bar of the screen. Questions in a
        section can be viewed by clicking on the section name.
      </li>
      <li>
        Do not switch tabs, minimise the window or exit full-screen during the test — such events
        are recorded with the attempt.
      </li>
      {(test.instructions || []).map((ins, i) => (
        <li key={i}>{ins}</li>
      ))}
    </ol>
  )

  // ── RENDER: Instructions ──────────────────────────────────────────────────
  if (phase === 'instructions') {
    return (
      <div className="min-h-screen bg-white" style={NTA_FONT}>
        <div
          className="px-4 py-2 text-center text-sm font-bold text-white"
          style={{ backgroundColor: NTA_BLUE }}
        >
          {test.title}
        </div>
        <div className="border-b border-gray-300 bg-gray-100 px-4 py-2 text-center">
          <h1 className="text-base font-bold text-gray-900 underline">
            Please read the instructions carefully
          </h1>
          <p className="mt-0.5 text-xs font-semibold text-gray-700">General Instructions:</p>
        </div>

        <div className="mx-auto max-w-4xl p-4 md:p-6">
          {instructionsBody}

          {candidateName && (
            <p className="mt-5 text-[13px] text-gray-700">
              Candidate Name: <b className="text-gray-900">{candidateName}</b>
            </p>
          )}

          <div className="mt-5 border-t border-gray-300 pt-4">
            <label className="flex items-start gap-2 text-[13px] text-gray-800">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I have read and understood the instructions. I agree that I am not in possession of
                any prohibited material and will not use any unfair means during this test. In case
                of not adhering to the instructions, I shall be liable for disciplinary action.
              </span>
            </label>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onExit}
                className="border border-gray-400 bg-white px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                EXIT
              </button>
              {resumeAvailable && (
                <button
                  disabled={!agreed}
                  onClick={() => startExam(true)}
                  className="px-6 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: BTN_ORANGE }}
                >
                  RESUME ATTEMPT
                </button>
              )}
              <button
                disabled={!agreed}
                onClick={() => startExam(false)}
                className="px-8 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: BTN_GREEN }}
              >
                PROCEED
              </button>
            </div>
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
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center md:p-8">
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

          {/* Post-result mentorship CTA — the highest-intent moment in the product. */}
          <div className="mt-6 rounded-xl bg-gray-50 p-4 text-center">
            <p className="text-sm text-gray-700">
              Want a mentor to review your weak areas and plan the next 30 days?
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/918826444334?text=${encodeURIComponent(
                  `Hi Cerebrum! I scored ${r.score}/${r.maxScore} in the NEET Biology CBT mock. Please help me plan my preparation.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
              >
                Discuss my score on WhatsApp
              </a>
              <a
                href="/book-free-demo"
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-white"
              >
                Book a free demo class
              </a>
            </div>
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
  return (
    <div ref={examRef} className="flex h-dvh select-none flex-col bg-white" style={NTA_FONT}>
      {/* Brand strip */}
      <div className="flex items-center justify-between border-b border-gray-300 bg-white px-3 py-1">
        <span className="text-[13px] font-bold tracking-wide text-gray-800">
          CEREBRUM BIOLOGY ACADEMY
        </span>
        <span className="hidden text-[11px] text-gray-500 sm:block">Computer Based Test</span>
      </div>

      {/* Paper title bar */}
      <div
        className="flex items-center justify-between gap-2 px-3 py-1.5 text-white"
        style={{ backgroundColor: NTA_BLUE }}
      >
        <span className="truncate text-[13px] font-bold">{test.title}</span>
        <div className="flex shrink-0 items-center gap-3 text-[12px]">
          <button
            onClick={() => setShowPaperModal(true)}
            className="underline underline-offset-2 hover:opacity-80"
          >
            Question Paper
          </button>
          <button
            onClick={() => setShowInstructionsModal(true)}
            className="underline underline-offset-2 hover:opacity-80"
          >
            View Instructions
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        {/* Question column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Section strip + timer */}
          <div className="flex items-center justify-between gap-2 border-b border-gray-300 bg-white px-2 py-1">
            <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
              {sections.map((sec) => {
                const active = activeSection === sec
                return (
                  <button
                    key={sec}
                    onClick={() => {
                      const first = orderedQuestions.findIndex(
                        (q) => sectionLabel(q.subject) === sec
                      )
                      if (first >= 0) goTo(first)
                    }}
                    className="shrink-0 border px-3 py-1 text-[12px] font-semibold"
                    style={
                      active
                        ? { backgroundColor: NTA_BLUE, borderColor: NTA_BLUE, color: '#fff' }
                        : {
                            backgroundColor: NTA_PANEL_BLUE,
                            borderColor: '#b7d9ee',
                            color: '#1a5a96',
                          }
                    }
                  >
                    {sec}
                  </button>
                )
              })}
            </div>
            <div className="shrink-0 text-[12px] font-semibold text-gray-800">
              Time Left :{' '}
              <span
                className={`inline-block border border-gray-300 px-1.5 py-0.5 font-mono text-[13px] font-bold ${
                  timeRemaining < 300 ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          {/* Question header */}
          <div className="flex items-center justify-between gap-2 border-b border-gray-300 bg-gray-100 px-3 py-1.5">
            <span className="text-[13px] font-bold text-gray-900">
              Question No. {currentIndex + 1}
            </span>
            <div className="flex items-center gap-3 text-[11px] text-gray-700">
              <span className="hidden sm:inline">
                Marks for correct answer: <b className="text-green-700">{CORRECT_MARKS}</b> |
                Negative Marks: <b className="text-red-600">{NEGATIVE_MARKS}</b>
              </span>
              <span className="hidden items-center gap-1 md:flex">
                View in :
                <select
                  className="border border-gray-300 bg-white px-1 py-0.5 text-[11px]"
                  defaultValue="English"
                  aria-label="View question in language"
                >
                  <option>English</option>
                </select>
              </span>
            </div>
          </div>

          {/* Question body */}
          <div className="min-h-0 flex-1 overflow-y-auto bg-white p-4">
            {currentQ && (
              <>
                <p className="text-[14px] leading-relaxed text-gray-900">{currentQ.questionText}</p>
                {currentQ.questionImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={currentQ.questionImage} alt="" className="mt-3 max-h-64" />
                )}
                <div className="mt-5 space-y-1">
                  {currentQ.options.map((opt, i) => {
                    const selected = pending === opt.id
                    return (
                      <label
                        key={opt.id}
                        className={`flex cursor-pointer items-start gap-2.5 px-2 py-2 text-[14px] ${
                          selected ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q_${currentQ.id}`}
                          className="mt-1 h-4 w-4"
                          checked={selected}
                          onClick={() => {
                            // NTA: clicking the selected option again deselects it.
                            if (selected) setPending(null)
                          }}
                          onChange={() => setPending(opt.id)}
                        />
                        <span className="text-gray-800">
                          {i + 1}. {opt.text}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          {/* Bottom action bar */}
          <div className="border-t border-gray-300 bg-gray-100 px-2 py-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={saveAndNext}
                className="px-3 py-1.5 text-[12px] font-bold text-white hover:opacity-90"
                style={{ backgroundColor: BTN_GREEN }}
              >
                SAVE &amp; NEXT
              </button>
              <button
                onClick={clearResponse}
                className="border border-gray-400 bg-white px-3 py-1.5 text-[12px] font-bold text-gray-800 hover:bg-gray-50"
              >
                CLEAR
              </button>
              <button
                onClick={saveAndMarkForReview}
                className="px-3 py-1.5 text-[12px] font-bold text-white hover:opacity-90"
                style={{ backgroundColor: BTN_ORANGE }}
              >
                SAVE &amp; MARK FOR REVIEW
              </button>
              <button
                onClick={markForReviewAndNext}
                className="px-3 py-1.5 text-[12px] font-bold text-white hover:opacity-90"
                style={{ backgroundColor: BTN_BLUE }}
              >
                MARK FOR REVIEW &amp; NEXT
              </button>
              <span className="ml-auto flex items-center gap-1.5">
                <button
                  onClick={() => goTo(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="border border-gray-400 bg-white px-3 py-1.5 text-[12px] font-bold text-gray-800 hover:bg-gray-50 disabled:opacity-40"
                >
                  &lt;&lt; BACK
                </button>
                <button
                  onClick={() => goTo(currentIndex + 1)}
                  disabled={currentIndex === orderedQuestions.length - 1}
                  className="border border-gray-400 bg-white px-3 py-1.5 text-[12px] font-bold text-gray-800 hover:bg-gray-50 disabled:opacity-40"
                >
                  NEXT &gt;&gt;
                </button>
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="px-4 py-1.5 text-[12px] font-bold text-white hover:opacity-90 lg:hidden"
                  style={{ backgroundColor: BTN_GREEN }}
                >
                  SUBMIT
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* Palette collapse handle (desktop) */}
        <button
          onClick={() => setPaletteCollapsed((c) => !c)}
          className="hidden w-4 shrink-0 items-center justify-center text-[10px] text-white hover:opacity-90 lg:flex"
          style={{ backgroundColor: NTA_BLUE }}
          aria-label={paletteCollapsed ? 'Open question palette' : 'Collapse question palette'}
          title={paletteCollapsed ? 'Open question palette' : 'Collapse question palette'}
        >
          {paletteCollapsed ? '◄' : '►'}
        </button>

        {/* Palette (desktop column) */}
        {!paletteCollapsed && (
          <aside className="hidden w-64 shrink-0 lg:block xl:w-72">{paletteColumn}</aside>
        )}
      </div>

      {/* Mobile palette toggle tab */}
      <button
        onClick={() => setMobilePaletteOpen(true)}
        className="fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l px-1.5 py-3 text-[11px] font-bold text-white lg:hidden"
        style={{ backgroundColor: NTA_BLUE }}
        aria-label="Open question palette"
      >
        ◄
      </button>

      {/* Mobile palette drawer */}
      {mobilePaletteOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 lg:hidden">
          <button
            className="h-full flex-1"
            aria-label="Close question palette"
            onClick={() => setMobilePaletteOpen(false)}
          />
          <div className="relative h-full w-72 max-w-[85vw]">
            <button
              onClick={() => setMobilePaletteOpen(false)}
              className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-l px-1.5 py-3 text-[11px] font-bold text-white"
              style={{ backgroundColor: NTA_BLUE }}
              aria-label="Close question palette"
            >
              ►
            </button>
            {paletteColumn}
          </div>
        </div>
      )}

      {/* Tab-switch warning */}
      {showWarning && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded bg-red-600 px-4 py-2 text-sm text-white shadow-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {showWarning}
            <button onClick={() => setShowWarning(null)} className="ml-2" aria-label="Dismiss">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Instructions modal (in-exam) */}
      {showInstructionsModal && (
        <ExamModal title="Instructions" onClose={() => setShowInstructionsModal(false)}>
          {instructionsBody}
        </ExamModal>
      )}

      {/* Question paper modal */}
      {showPaperModal && (
        <ExamModal title="Question Paper" onClose={() => setShowPaperModal(false)}>
          <div className="space-y-4">
            {orderedQuestions.map((q, i) => (
              <div key={q.id} className="border-b border-gray-100 pb-3 text-[13px]">
                <p className="text-gray-900">
                  <b>Q.{i + 1}</b>{' '}
                  <span className="text-[11px] text-gray-500">[{sectionLabel(q.subject)}]</span>{' '}
                  {q.questionText}
                </p>
                <ol className="mt-1 space-y-0.5 pl-6 text-gray-700">
                  {q.options.map((opt, j) => (
                    <li key={opt.id}>
                      {j + 1}. {opt.text}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </ExamModal>
      )}

      {/* Submit confirm — NTA exam summary */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white" style={NTA_FONT}>
            <div
              className="px-4 py-2 text-center text-sm font-bold text-white"
              style={{ backgroundColor: NTA_BLUE }}
            >
              Exam Summary
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center text-[11px] sm:text-[12px]">
                  <thead>
                    <tr className="bg-gray-100 text-gray-800">
                      <Th>Section Name</Th>
                      <Th>No. of Questions</Th>
                      <Th>Answered</Th>
                      <Th>Not Answered</Th>
                      <Th>Marked for Review</Th>
                      <Th>
                        Answered &amp; Marked for Review
                        <br />
                        (will be considered for evaluation)
                      </Th>
                      <Th>Not Visited</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.map((sec) => {
                      const c = counts.perSection[sec]
                      if (!c) return null
                      return (
                        <tr key={sec}>
                          <Td strong>{sec}</Td>
                          <Td>{c.total}</Td>
                          <Td>{c.answered}</Td>
                          <Td>{c.notAnswered}</Td>
                          <Td>{c.marked}</Td>
                          <Td>{c.answeredMarked}</Td>
                          <Td>{c.notVisited}</Td>
                        </tr>
                      )
                    })}
                    {sections.length > 1 && (
                      <tr className="bg-gray-50">
                        <Td strong>Total</Td>
                        <Td>{counts.total.total}</Td>
                        <Td>{counts.total.answered}</Td>
                        <Td>{counts.total.notAnswered}</Td>
                        <Td>{counts.total.marked}</Td>
                        <Td>{counts.total.answeredMarked}</Td>
                        <Td>{counts.total.notVisited}</Td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-center text-[13px] font-semibold text-gray-900">
                Are you sure you want to submit for final marking?
                <br />
                No changes will be allowed after submission.
              </p>

              <div className="mt-4 flex justify-center gap-3">
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={submitting}
                  className="px-8 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: BTN_GREEN }}
                >
                  {submitting ? 'SUBMITTING…' : 'YES'}
                </button>
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  disabled={submitting}
                  className="border border-gray-400 bg-white px-8 py-2 text-sm font-bold text-gray-800 hover:bg-gray-50"
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Palette shapes ─────────────────────────────────────────────────────── */

function paletteShapeStyle(status: PaletteStatus): React.CSSProperties {
  switch (status) {
    case 'answered':
      return { backgroundColor: GREEN, color: '#fff', clipPath: CLIP_ANSWERED }
    case 'notAnswered':
      return { backgroundColor: RED, color: '#fff', clipPath: CLIP_NOT_ANSWERED }
    case 'marked':
    case 'answeredMarked':
      return { backgroundColor: PURPLE, color: '#fff', borderRadius: '9999px' }
    default:
      return {
        backgroundColor: '#f3f4f6',
        color: '#1f2937',
        border: '1px solid #9ca3af',
      }
  }
}

function PaletteButton({
  num,
  status,
  current,
  onClick,
}: {
  num: number
  status: PaletteStatus
  current: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`relative mx-auto flex h-9 w-9 items-center justify-center text-[12px] font-bold ${
        current ? 'outline outline-2 outline-offset-1 outline-blue-700' : ''
      }`}
      style={paletteShapeStyle(status)}
      aria-label={`Question ${num}: ${
        status === 'notVisited'
          ? 'not visited'
          : status === 'notAnswered'
            ? 'not answered'
            : status === 'answered'
              ? 'answered'
              : status === 'marked'
                ? 'marked for review'
                : 'answered and marked for review'
      }`}
    >
      {num}
      {status === 'answeredMarked' && (
        <span
          className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold text-white"
          style={{ backgroundColor: GREEN }}
        >
          ✓
        </span>
      )}
    </button>
  )
}

function LegendItem({
  status,
  count,
  label,
}: {
  status: PaletteStatus
  count?: number
  label: string
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="relative flex h-6 w-6 shrink-0 items-center justify-center text-[10px] font-bold"
        style={paletteShapeStyle(status)}
      >
        {typeof count === 'number' ? count : ''}
        {status === 'answeredMarked' && (
          <span
            className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full text-[6px] font-bold text-white"
            style={{ backgroundColor: GREEN }}
          >
            ✓
          </span>
        )}
      </span>
      <span className="leading-tight">{label}</span>
    </div>
  )
}

/* ── Small helpers ──────────────────────────────────────────────────────── */

function ExamModal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col bg-white" style={NTA_FONT}>
        <div
          className="flex items-center justify-between px-4 py-2 text-white"
          style={{ backgroundColor: NTA_BLUE }}
        >
          <span className="text-sm font-bold">{title}</span>
          <button onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
        <div className="border-t border-gray-200 p-2 text-center">
          <button
            onClick={onClose}
            className="border border-gray-400 bg-white px-6 py-1.5 text-[12px] font-bold text-gray-800 hover:bg-gray-50"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="border border-gray-300 px-2 py-1.5 font-semibold">{children}</th>
}

function Td({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <td className={`border border-gray-300 px-2 py-1.5 ${strong ? 'font-semibold' : ''}`}>
      {children}
    </td>
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
