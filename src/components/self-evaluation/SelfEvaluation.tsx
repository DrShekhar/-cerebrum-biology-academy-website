'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

// ============================================
// TYPES
// ============================================

type EvaluationSlot = 'MORNING' | 'AFTERNOON' | 'EVENING'

interface SelfEvaluation {
  id: string
  studentId: string
  date: string
  slot: EvaluationSlot
  courseId: string | null
  topicsCovered: string[]
  conceptsLearned: string[]
  questionsAttempted: number
  questionsCorrect: number
  difficultyRating: number | null
  confidenceLevel: number | null
  studyHours: number | null
  notes: string | null
  goals: string[]
  achievements: string[]
  struggles: string[]
  nextDayPlan: string | null
  createdAt: string
  updatedAt: string
}

interface EvaluationStats {
  totalEntries: number
  avgDifficulty: number | null
  avgConfidence: number | null
  totalStudyHours: number | null
  totalQuestions: number | null
  accuracy: number
}

interface SelfEvaluationProps {
  className?: string
}

// ============================================
// SLOT CONFIG
// ============================================

const slotConfig: Record<EvaluationSlot, { label: string; icon: string; timeRange: string }> = {
  MORNING: { label: 'Morning', icon: '🌅', timeRange: '6 AM - 12 PM' },
  AFTERNOON: { label: 'Afternoon', icon: '☀️', timeRange: '12 PM - 6 PM' },
  EVENING: { label: 'Evening', icon: '🌙', timeRange: '6 PM - 12 AM' },
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

function getCurrentSlot(): EvaluationSlot {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return 'MORNING'
  if (hour >= 12 && hour < 18) return 'AFTERNOON'
  return 'EVENING'
}

// ============================================
// STATS CARD
// ============================================

interface StatsCardProps {
  stats: EvaluationStats
}

function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="text-2xl font-bold text-blue-700">{stats.totalEntries}</div>
        <div className="text-sm text-blue-600">Entries (30d)</div>
      </div>
      <div className="bg-green-50 rounded-lg p-4">
        <div className="text-2xl font-bold text-green-700">
          {stats.totalStudyHours ? Math.round(Number(stats.totalStudyHours) * 10) / 10 : 0}h
        </div>
        <div className="text-sm text-green-600">Study Hours</div>
      </div>
      <div className="bg-purple-50 rounded-lg p-4">
        <div className="text-2xl font-bold text-purple-700">{stats.accuracy}%</div>
        <div className="text-sm text-purple-600">Accuracy</div>
      </div>
      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="text-2xl font-bold text-yellow-700">
          {stats.avgConfidence ? Math.round(stats.avgConfidence * 10) / 10 : '-'}/5
        </div>
        <div className="text-sm text-yellow-700">Avg Confidence</div>
      </div>
    </div>
  )
}

// ============================================
// EVALUATION FORM
// ============================================

interface EvaluationFormProps {
  selectedDate: string
  selectedSlot: EvaluationSlot
  existingData: SelfEvaluation | null
  onSave: () => void
  onDateChange: (date: string) => void
  onSlotChange: (slot: EvaluationSlot) => void
}

function EvaluationForm({
  selectedDate,
  selectedSlot,
  existingData,
  onSave,
  onDateChange,
  onSlotChange,
}: EvaluationFormProps) {
  const [formData, setFormData] = useState({
    topicsCovered: '',
    conceptsLearned: '',
    questionsAttempted: 0,
    questionsCorrect: 0,
    difficultyRating: 3,
    confidenceLevel: 3,
    studyHours: 0,
    notes: '',
    goals: '',
    achievements: '',
    struggles: '',
    nextDayPlan: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (existingData) {
      setFormData({
        topicsCovered: existingData.topicsCovered.join(', '),
        conceptsLearned: existingData.conceptsLearned.join(', '),
        questionsAttempted: existingData.questionsAttempted,
        questionsCorrect: existingData.questionsCorrect,
        difficultyRating: existingData.difficultyRating || 3,
        confidenceLevel: existingData.confidenceLevel || 3,
        studyHours: existingData.studyHours ? Number(existingData.studyHours) : 0,
        notes: existingData.notes || '',
        goals: existingData.goals.join(', '),
        achievements: existingData.achievements.join(', '),
        struggles: existingData.struggles.join(', '),
        nextDayPlan: existingData.nextDayPlan || '',
      })
    } else {
      setFormData({
        topicsCovered: '',
        conceptsLearned: '',
        questionsAttempted: 0,
        questionsCorrect: 0,
        difficultyRating: 3,
        confidenceLevel: 3,
        studyHours: 0,
        notes: '',
        goals: '',
        achievements: '',
        struggles: '',
        nextDayPlan: '',
      })
    }
  }, [existingData])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch('/api/student/self-evaluation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate,
          slot: selectedSlot,
          topicsCovered: formData.topicsCovered
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          conceptsLearned: formData.conceptsLearned
            .split(',')
            .map((c) => c.trim())
            .filter(Boolean),
          questionsAttempted: formData.questionsAttempted,
          questionsCorrect: formData.questionsCorrect,
          difficultyRating: formData.difficultyRating,
          confidenceLevel: formData.confidenceLevel,
          studyHours: formData.studyHours,
          notes: formData.notes,
          goals: formData.goals
            .split(',')
            .map((g) => g.trim())
            .filter(Boolean),
          achievements: formData.achievements
            .split(',')
            .map((a) => a.trim())
            .filter(Boolean),
          struggles: formData.struggles
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          nextDayPlan: formData.nextDayPlan,
        }),
      })

      const data = await response.json()
      if (data.success) {
        onSave()
      } else {
        setError(data.error || 'Failed to save evaluation')
      }
    } catch (err) {
      console.error('Error saving evaluation:', err)
      setError('Failed to save evaluation')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date & Slot Selection */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            max={getTodayDate()}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
          <div className="flex gap-2">
            {(Object.keys(slotConfig) as EvaluationSlot[]).map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => onSlotChange(slot)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  selectedSlot === slot
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {slotConfig[slot].icon} {slotConfig[slot].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Study Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topics Covered <span className="text-gray-400">(comma-separated)</span>
          </label>
          <textarea
            value={formData.topicsCovered}
            onChange={(e) => setFormData({ ...formData, topicsCovered: e.target.value })}
            placeholder="e.g., Cell Division, Mitosis, Meiosis"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Concepts Learned <span className="text-gray-400">(comma-separated)</span>
          </label>
          <textarea
            value={formData.conceptsLearned}
            onChange={(e) => setFormData({ ...formData, conceptsLearned: e.target.value })}
            placeholder="e.g., Spindle fiber formation, Chromosome segregation"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
          />
        </div>
      </div>

      {/* Practice Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Questions Attempted
          </label>
          <input
            type="number"
            min="0"
            value={formData.questionsAttempted}
            onChange={(e) =>
              setFormData({ ...formData, questionsAttempted: parseInt(e.target.value) || 0 })
            }
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Questions Correct</label>
          <input
            type="number"
            min="0"
            max={formData.questionsAttempted}
            value={formData.questionsCorrect}
            onChange={(e) =>
              setFormData({ ...formData, questionsCorrect: parseInt(e.target.value) || 0 })
            }
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Study Hours</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={formData.studyHours}
            onChange={(e) =>
              setFormData({ ...formData, studyHours: parseFloat(e.target.value) || 0 })
            }
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Accuracy</label>
          <div className="px-3 py-2 bg-gray-50 rounded-lg text-lg font-semibold text-center">
            {formData.questionsAttempted > 0
              ? Math.round((formData.questionsCorrect / formData.questionsAttempted) * 100)
              : 0}
            %
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Rating: <span className="font-bold">{formData.difficultyRating}/5</span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={formData.difficultyRating}
            onChange={(e) =>
              setFormData({ ...formData, difficultyRating: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Easy</span>
            <span>Hard</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confidence Level: <span className="font-bold">{formData.confidenceLevel}/5</span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={formData.confidenceLevel}
            onChange={(e) =>
              setFormData({ ...formData, confidenceLevel: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Goals & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Achievements <span className="text-gray-400">(comma-separated)</span>
          </label>
          <textarea
            value={formData.achievements}
            onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
            placeholder="What went well today?"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Struggles <span className="text-gray-400">(comma-separated)</span>
          </label>
          <textarea
            value={formData.struggles}
            onChange={(e) => setFormData({ ...formData, struggles: e.target.value })}
            placeholder="What was challenging?"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
          />
        </div>
      </div>

      {/* Notes & Plan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Any additional notes about your study session..."
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Plan for Next Session
        </label>
        <textarea
          value={formData.nextDayPlan}
          onChange={(e) => setFormData({ ...formData, nextDayPlan: e.target.value })}
          placeholder="What will you focus on next?"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={2}
        />
      </div>

      {/* Error & Submit */}
      {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

      <button
        type="submit"
        disabled={isSaving}
        className={cn(
          'w-full py-3 rounded-lg font-semibold text-white transition-all',
          isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        )}
      >
        {isSaving ? 'Saving...' : existingData ? 'Update Evaluation' : 'Save Evaluation'}
      </button>
    </form>
  )
}

// ============================================
// HISTORY LIST
// ============================================

interface HistoryListProps {
  evaluations: SelfEvaluation[]
  onSelect: (evaluation: SelfEvaluation) => void
}

function HistoryList({ evaluations, onSelect }: HistoryListProps) {
  if (evaluations.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <span className="text-4xl mb-2 block">📝</span>
        <p className="text-gray-500">No self-evaluations yet</p>
        <p className="text-sm text-gray-400">Start tracking your daily progress!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {evaluations.map((evaluation) => {
        const accuracy =
          evaluation.questionsAttempted > 0
            ? Math.round((evaluation.questionsCorrect / evaluation.questionsAttempted) * 100)
            : null

        return (
          <div
            key={evaluation.id}
            onClick={() => onSelect(evaluation)}
            className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-md cursor-pointer transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{slotConfig[evaluation.slot].icon}</span>
              <div>
                <div className="font-medium text-gray-900">
                  {formatDate(evaluation.date)} - {slotConfig[evaluation.slot].label}
                </div>
                <div className="text-sm text-gray-500">
                  {evaluation.topicsCovered.slice(0, 2).join(', ')}
                  {evaluation.topicsCovered.length > 2 &&
                    ` +${evaluation.topicsCovered.length - 2} more`}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              {evaluation.studyHours && (
                <span className="text-gray-600">{Number(evaluation.studyHours)}h</span>
              )}
              {accuracy !== null && (
                <span
                  className={cn(
                    'font-semibold',
                    accuracy >= 80
                      ? 'text-green-600'
                      : accuracy >= 60
                        ? 'text-yellow-600'
                        : 'text-red-600'
                  )}
                >
                  {accuracy}%
                </span>
              )}
              <span className="text-gray-400">→</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function SelfEvaluation({ className }: SelfEvaluationProps) {
  const [evaluations, setEvaluations] = useState<SelfEvaluation[]>([])
  const [stats, setStats] = useState<EvaluationStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form')
  const [selectedDate, setSelectedDate] = useState(getTodayDate())
  const [selectedSlot, setSelectedSlot] = useState<EvaluationSlot>(getCurrentSlot())
  const [existingData, setExistingData] = useState<SelfEvaluation | null>(null)

  useEffect(() => {
    fetchEvaluations()
  }, [])

  useEffect(() => {
    // Check if there's existing data for selected date/slot
    const existing = evaluations.find(
      (e) =>
        new Date(e.date).toISOString().split('T')[0] === selectedDate && e.slot === selectedSlot
    )
    setExistingData(existing || null)
  }, [selectedDate, selectedSlot, evaluations])

  async function fetchEvaluations() {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/student/self-evaluation?limit=30')
      const data = await response.json()

      if (data.success) {
        setEvaluations(data.data.evaluations)
        setStats(data.data.stats)
      } else {
        setError(data.error || 'Failed to fetch evaluations')
      }
    } catch (err) {
      console.error('Error fetching evaluations:', err)
      setError('Failed to load evaluations')
    } finally {
      setIsLoading(false)
    }
  }

  function handleSelectEvaluation(evaluation: SelfEvaluation) {
    setSelectedDate(new Date(evaluation.date).toISOString().split('T')[0])
    setSelectedSlot(evaluation.slot)
    setActiveTab('form')
  }

  return (
    <div className={cn('', className)}>
      {/* Stats */}
      {stats && <StatsCard stats={stats} />}

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b">
        <button
          onClick={() => setActiveTab('form')}
          className={cn(
            'px-4 py-2 font-medium border-b-2 transition-all',
            activeTab === 'form'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          )}
        >
          📝 Log Entry
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={cn(
            'px-4 py-2 font-medium border-b-2 transition-all',
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          )}
        >
          📊 History
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button onClick={fetchEvaluations} className="mt-2 text-sm text-blue-600 hover:underline">
            Try again
          </button>
        </div>
      ) : activeTab === 'form' ? (
        <div className="bg-white border rounded-xl p-6">
          <EvaluationForm
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            existingData={existingData}
            onSave={fetchEvaluations}
            onDateChange={setSelectedDate}
            onSlotChange={setSelectedSlot}
          />
        </div>
      ) : (
        <HistoryList evaluations={evaluations} onSelect={handleSelectEvaluation} />
      )}
    </div>
  )
}

export default SelfEvaluation
