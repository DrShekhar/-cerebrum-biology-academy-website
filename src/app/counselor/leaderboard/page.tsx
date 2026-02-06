'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import {
  Trophy,
  Target,
  TrendingUp,
  Star,
  Medal,
  Crown,
  Plus,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Phone,
  DollarSign,
  Calendar,
  BarChart3,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'
import { format } from 'date-fns'
import { showToast } from '@/lib/toast'

// ─── Types ───────────────────────────────────────────────────────────────────

interface LeaderboardEntry {
  counselorId: string
  counselorName: string
  rank: number
  conversions: number
  revenue: number
  conversionRate: number
  totalLeads: number
  avgResponseTime: number | null
  score: number
}

interface Goal {
  id: string
  goalType: string
  period: string
  targetValue: number
  currentValue: number
  progress: number
  status: string
  startDate: string
  endDate: string
}

// ─── Rank Badge ──────────────────────────────────────────────────────────────

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-200">
        <Crown className="w-5 h-5 text-white" />
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-lg shadow-gray-200">
        <Medal className="w-5 h-5 text-white" />
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-200">
        <Medal className="w-5 h-5 text-white" />
      </div>
    )
  }
  return (
    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
      #{rank}
    </div>
  )
}

// ─── Goal Card ───────────────────────────────────────────────────────────────

function GoalCard({ goal }: { goal: Goal }) {
  const goalLabels: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    LEADS_CREATED: { label: 'Leads Created', icon: <Users className="w-4 h-4" />, color: 'text-blue-600' },
    CONVERSIONS: { label: 'Conversions', icon: <Target className="w-4 h-4" />, color: 'text-green-600' },
    REVENUE: { label: 'Revenue', icon: <DollarSign className="w-4 h-4" />, color: 'text-emerald-600' },
    DEMOS_SCHEDULED: { label: 'Demos Scheduled', icon: <Calendar className="w-4 h-4" />, color: 'text-purple-600' },
    FOLLOW_UPS: { label: 'Follow-ups', icon: <Phone className="w-4 h-4" />, color: 'text-indigo-600' },
    RESPONSE_TIME: { label: 'Avg Response Time', icon: <Clock className="w-4 h-4" />, color: 'text-amber-600' },
  }

  const config = goalLabels[goal.goalType] || { label: goal.goalType, icon: <Target className="w-4 h-4" />, color: 'text-gray-600' }
  const progressPercent = Math.min(goal.progress, 100)
  const isAchieved = goal.status === 'ACHIEVED'
  const isMissed = goal.status === 'MISSED'

  return (
    <div className={`bg-white rounded-xl border p-5 transition-all ${
      isAchieved ? 'border-green-200 bg-green-50/30' :
      isMissed ? 'border-red-200 bg-red-50/30' :
      'border-gray-200 hover:shadow-sm'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={config.color}>{config.icon}</span>
          <h4 className="text-sm font-semibold text-gray-900">{config.label}</h4>
        </div>
        {isAchieved && <CheckCircle2 className="w-5 h-5 text-green-500" />}
        {isMissed && <XCircle className="w-5 h-5 text-red-400" />}
        {goal.status === 'ACTIVE' && (
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
            {goal.period}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-3xl font-bold text-gray-900">
            {goal.goalType === 'REVENUE'
              ? `₹${(Number(goal.currentValue) / 1000).toFixed(0)}K`
              : Number(goal.currentValue).toFixed(0)}
          </p>
          <p className="text-xs text-gray-400">
            of {goal.goalType === 'REVENUE'
              ? `₹${(Number(goal.targetValue) / 1000).toFixed(0)}K`
              : Number(goal.targetValue).toFixed(0)} target
          </p>
        </div>
        <p className={`text-lg font-bold ${
          progressPercent >= 100 ? 'text-green-600' :
          progressPercent >= 70 ? 'text-indigo-600' :
          progressPercent >= 40 ? 'text-yellow-600' : 'text-red-500'
        }`}>
          {progressPercent.toFixed(0)}%
        </p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-700 ${
            progressPercent >= 100 ? 'bg-green-500' :
            progressPercent >= 70 ? 'bg-indigo-500' :
            progressPercent >= 40 ? 'bg-yellow-500' : 'bg-red-400'
          }`}
          style={{ width: `${Math.min(progressPercent, 100)}%` }}
        />
      </div>

      <p className="text-xs text-gray-400 mt-2">
        {format(new Date(goal.startDate), 'MMM d')} — {format(new Date(goal.endDate), 'MMM d')}
      </p>
    </div>
  )
}

// ─── Create Goal Modal ───────────────────────────────────────────────────────

function CreateGoalModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  const [goalType, setGoalType] = useState('CONVERSIONS')
  const [period, setPeriod] = useState('MONTHLY')
  const [targetValue, setTargetValue] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleCreate() {
    if (!targetValue || Number(targetValue) <= 0) {
      showToast.error('Please enter a valid target')
      return
    }
    try {
      setSaving(true)
      const res = await fetch('/api/counselor/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          goalType,
          period,
          targetValue: Number(targetValue),
        }),
      })
      if (!res.ok) throw new Error('Failed to create goal')
      showToast.success('Goal created!')
      onSuccess()
      onClose()
    } catch {
      showToast.error('Failed to create goal')
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Set New Goal</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <XCircle className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Goal Type</label>
            <select
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="LEADS_CREATED">Leads Created</option>
              <option value="CONVERSIONS">Conversions</option>
              <option value="REVENUE">Revenue (₹)</option>
              <option value="DEMOS_SCHEDULED">Demos Scheduled</option>
              <option value="FOLLOW_UPS">Follow-ups Made</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Period</label>
            <div className="flex gap-2">
              {['WEEKLY', 'MONTHLY', 'QUARTERLY'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                    period === p
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {p.charAt(0) + p.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Target {goalType === 'REVENUE' ? '(₹)' : ''}
            </label>
            <input
              type="number"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              placeholder={goalType === 'REVENUE' ? 'e.g. 500000' : 'e.g. 20'}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 text-sm">Cancel</button>
          <button
            onClick={handleCreate}
            disabled={saving || !targetValue}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
            Create Goal
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<'WEEKLY' | 'MONTHLY'>('MONTHLY')
  const [showCreateGoal, setShowCreateGoal] = useState(false)

  useEffect(() => {
    fetchData()
  }, [period])

  async function fetchData() {
    try {
      setLoading(true)
      const [lbRes, goalsRes] = await Promise.allSettled([
        fetch(`/api/counselor/leaderboard?period=${period}`, { credentials: 'include' }),
        fetch('/api/counselor/goals?status=ACTIVE', { credentials: 'include' }),
      ])

      if (lbRes.status === 'fulfilled' && lbRes.value.ok) {
        const data = await lbRes.value.json()
        setLeaderboard(data.data || [])
      }
      if (goalsRes.status === 'fulfilled' && goalsRes.value.ok) {
        const data = await goalsRes.value.json()
        setGoals(data.data || [])
      }
    } catch {
      console.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance</h1>
          <p className="text-gray-600 mt-1">Leaderboard rankings and personal goals</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['WEEKLY', 'MONTHLY'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  period === p
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {p.charAt(0) + p.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-300" />
            <div>
              <h2 className="text-xl font-bold">Counselor Leaderboard</h2>
              <p className="text-indigo-200 text-sm">
                {period === 'WEEKLY' ? 'This Week' : 'This Month'}&apos;s Rankings
              </p>
            </div>
          </div>
        </div>

        {leaderboard.length === 0 ? (
          <div className="p-8 text-center">
            <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No leaderboard data available for this period</p>
            <p className="text-sm text-gray-400 mt-1">Rankings update automatically based on counselor performance</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {/* Top 3 Podium */}
            {leaderboard.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-b from-indigo-50/50">
                {[1, 0, 2].map((idx) => {
                  const entry = leaderboard[idx]
                  if (!entry) return <div key={idx} />
                  return (
                    <div key={entry.counselorId} className={`text-center ${idx === 0 ? 'order-2' : idx === 1 ? 'order-1 mt-4' : 'order-3 mt-4'}`}>
                      <RankBadge rank={entry.rank} />
                      <p className="text-sm font-bold text-gray-900 mt-2 truncate">{entry.counselorName}</p>
                      <p className="text-xs text-gray-500">{entry.conversions} conversions</p>
                      <p className="text-xs text-indigo-600 font-medium">₹{(Number(entry.revenue) / 1000).toFixed(0)}K</p>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Full List */}
            {leaderboard.map((entry) => (
              <div key={entry.counselorId} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <RankBadge rank={entry.rank} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{entry.counselorName}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                    <span>{entry.totalLeads} leads</span>
                    <span>{Number(entry.conversionRate).toFixed(1)}% rate</span>
                    {entry.avgResponseTime && (
                      <span>{Math.round(entry.avgResponseTime / 60)}m avg response</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{entry.conversions}</p>
                  <p className="text-xs text-gray-400">conversions</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-green-600">₹{(Number(entry.revenue) / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-400">revenue</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Goals Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">My Goals</h2>
          </div>
          <button
            onClick={() => setShowCreateGoal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Goal
          </button>
        </div>

        {goals.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-2">No active goals</p>
            <p className="text-sm text-gray-400 mb-4">Set targets to track your performance</p>
            <button
              onClick={() => setShowCreateGoal(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Create Your First Goal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        )}
      </div>

      <CreateGoalModal
        isOpen={showCreateGoal}
        onClose={() => setShowCreateGoal(false)}
        onSuccess={fetchData}
      />
    </div>
  )
}
