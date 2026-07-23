'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Target,
  Sliders,
  TrendingUp,
  Users,
  Save,
  Loader2,
  Plus,
  Trash2,
  Zap,
  Eye,
  RotateCcw,
  AlertCircle,
  BarChart3,
  RefreshCw,
} from 'lucide-react'
import { showToast } from '@/lib/toast'
import { useAuth } from '@/contexts/AuthContext'

// ─── Types ───────────────────────────────────────────────────────────────────

interface ScoringRule {
  id: string
  event: string
  label: string
  category: 'BEHAVIORAL' | 'DEMOGRAPHIC' | 'ENGAGEMENT' | 'NEGATIVE'
  points: number
  description: string
  isActive: boolean
}

interface LeadScorePreview {
  id: string
  studentName: string
  phone: string
  stage: string
  priority: string
  /** Stored score as last written by the scoring engine — not a simulation. */
  score: number
  breakdown: { rule: string; points: number }[]
}

// ─── Category Config ─────────────────────────────────────────────────────────

const categoryConfig: Record<string, { label: string; color: string; bgColor: string; icon: any }> =
  {
    BEHAVIORAL: {
      label: 'Behavioral',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 border-blue-200',
      icon: Target,
    },
    DEMOGRAPHIC: {
      label: 'Demographic Fit',
      color: 'text-purple-700',
      bgColor: 'bg-purple-50 border-purple-200',
      icon: Users,
    },
    ENGAGEMENT: {
      label: 'Engagement',
      color: 'text-green-700',
      bgColor: 'bg-green-50 border-green-200',
      icon: TrendingUp,
    },
    NEGATIVE: {
      label: 'Negative Signals',
      color: 'text-red-700',
      bgColor: 'bg-red-50 border-red-200',
      icon: AlertCircle,
    },
  }

// ─── Score Gauge ─────────────────────────────────────────────────────────────

function ScoreGauge({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const capped = Math.max(0, Math.min(score, 100))
  const color = capped >= 70 ? '#22c55e' : capped >= 40 ? '#f59e0b' : '#ef4444'
  const radius = size === 'lg' ? 50 : size === 'md' ? 36 : 24
  const stroke = size === 'lg' ? 8 : size === 'md' ? 6 : 4
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (capped / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={(radius + stroke) * 2} height={(radius + stroke) * 2} className="-rotate-90">
        <circle
          cx={radius + stroke}
          cy={radius + stroke}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />
        <circle
          cx={radius + stroke}
          cy={radius + stroke}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className={`font-bold ${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-lg' : 'text-sm'}`}
          style={{ color }}
        >
          {capped}
        </span>
        {size !== 'sm' && <span className="text-[10px] text-gray-400">/ 100</span>}
      </div>
    </div>
  )
}

// ─── Rule Row ────────────────────────────────────────────────────────────────

function RuleRow({
  rule,
  readOnly,
  onUpdate,
  onDelete,
}: {
  rule: ScoringRule
  readOnly: boolean
  onUpdate: (rule: ScoringRule) => void
  onDelete: () => void
}) {
  const isNegative = rule.category === 'NEGATIVE'

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
        rule.isActive ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-60'
      }`}
    >
      {!readOnly && (
        <label className="flex-shrink-0">
          <input
            type="checkbox"
            checked={rule.isActive}
            onChange={(e) => onUpdate({ ...rule, isActive: e.target.checked })}
            className="rounded text-indigo-600 w-4 h-4"
          />
        </label>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{rule.label}</p>
        <p className="text-xs text-gray-400 truncate">{rule.description}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {readOnly ? (
          <span
            className={`w-16 px-2 py-1.5 border rounded-lg text-center text-sm font-bold ${
              isNegative
                ? 'border-red-200 text-red-600 bg-red-50'
                : 'border-green-200 text-green-600 bg-green-50'
            }`}
          >
            {rule.points > 0 ? `+${rule.points}` : rule.points}
          </span>
        ) : (
          <input
            type="number"
            value={rule.points}
            onChange={(e) => onUpdate({ ...rule, points: Number(e.target.value) })}
            className={`w-16 px-2 py-1.5 border rounded-lg text-center text-sm font-bold ${
              isNegative
                ? 'border-red-200 text-red-600 bg-red-50'
                : 'border-green-200 text-green-600 bg-green-50'
            }`}
          />
        )}
        <span className="text-xs text-gray-400">pts</span>
      </div>

      {!readOnly && (
        <button
          onClick={onDelete}
          className="p-1.5 hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-lg transition-colors flex-shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function LeadScoringPage() {
  const { user } = useAuth()
  const isAdmin = (user?.role || '').toUpperCase() === 'ADMIN'
  const [rules, setRules] = useState<ScoringRule[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [rescoring, setRescoring] = useState(false)
  const [editable, setEditable] = useState(true)
  const [activeTab, setActiveTab] = useState<'rules' | 'preview'>('rules')
  const [previewLeads, setPreviewLeads] = useState<LeadScorePreview[]>([])

  // Auto-priority thresholds
  const [hotThreshold, setHotThreshold] = useState(70)
  const [warmThreshold, setWarmThreshold] = useState(40)

  useEffect(() => {
    fetchRules()
  }, [])

  async function fetchRules() {
    try {
      setLoading(true)
      const res = await fetch('/api/counselor/lead-scoring/rules', { credentials: 'include' })
      if (!res.ok) throw new Error('Failed to load scoring rules')
      const data = await res.json()
      if (data.data?.rules?.length > 0) {
        setRules(data.data.rules)
        setHotThreshold(data.data.hotThreshold || 70)
        setWarmThreshold(data.data.warmThreshold || 40)
      }
      if (data.data?.editable === false) {
        setEditable(false)
      }
    } catch {
      // No fabricated fallback rules — say it plainly.
      showToast.error('Could not load scoring rules')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    try {
      setSaving(true)
      const res = await fetch('/api/counselor/lead-scoring/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ rules, hotThreshold, warmThreshold }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error || 'Failed to save rules')
      showToast.success('Scoring rules saved!')
    } catch (err) {
      showToast.error(err instanceof Error ? err.message : 'Failed to save rules')
    } finally {
      setSaving(false)
    }
  }

  async function handleRescore() {
    if (
      !confirm('This will recalculate scores for ALL leads and update their priorities. Continue?')
    )
      return
    try {
      setRescoring(true)
      const res = await fetch('/api/counselor/lead-scoring/rescore', {
        method: 'POST',
        credentials: 'include',
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      showToast.success(`Rescored ${data.updated || 0} leads!`)
      fetchPreview()
    } catch {
      showToast.error('Failed to rescore')
    } finally {
      setRescoring(false)
    }
  }

  async function fetchPreview() {
    try {
      const res = await fetch('/api/counselor/lead-scoring/preview', { credentials: 'include' })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setPreviewLeads(data.data || [])
    } catch {
      showToast.error('Could not load lead scores')
    }
  }

  function addCustomRule() {
    const newRule: ScoringRule = {
      id: `custom_${Date.now()}`,
      event: 'CUSTOM',
      label: 'Custom rule',
      category: 'BEHAVIORAL',
      points: 10,
      description: 'Custom scoring rule',
      isActive: true,
    }
    setRules([...rules, newRule])
  }

  function updateRule(index: number, updated: ScoringRule) {
    const newRules = [...rules]
    newRules[index] = updated
    setRules(newRules)
  }

  function deleteRule(index: number) {
    setRules(rules.filter((_, i) => i !== index))
  }

  // Grouped rules
  const groupedRules = useMemo(() => {
    const groups: Record<string, ScoringRule[]> = {}
    for (const rule of rules) {
      if (!groups[rule.category]) groups[rule.category] = []
      groups[rule.category].push(rule)
    }
    return groups
  }, [rules])

  const maxPossibleScore = rules
    .filter((r) => r.isActive && r.points > 0)
    .reduce((sum, r) => sum + r.points, 0)

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
          <h1 className="text-3xl font-bold text-gray-900">Lead Scoring</h1>
          <p className="text-gray-600 mt-1">
            Configure scoring rules to auto-prioritize your best leads
          </p>
        </div>
        <div className="flex gap-3">
          {/* Bulk rescore is ADMIN-only server-side — don't show counselors a
              button that can only fail with a 403. */}
          {isAdmin && (
            <button
              onClick={handleRescore}
              disabled={rescoring}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {rescoring ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RotateCcw className="w-4 h-4" />
              )}
              Rescore All Leads
            </button>
          )}
          {editable && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Rules
            </button>
          )}
        </div>
      </div>

      {!editable && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-900">
          Scoring rules are defined in the scoring engine and shown here for reference — the weights
          below aren&apos;t editable yet.
          {isAdmin && ' "Rescore All Leads" applies this engine to every open lead.'}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 rounded-lg p-1 w-fit">
        {[
          { id: 'rules' as const, label: 'Scoring Rules', icon: Sliders },
          { id: 'preview' as const, label: 'Score Preview', icon: Eye },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              if (tab.id === 'preview') fetchPreview()
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'rules' && (
        <>
          {/* Auto-Priority Thresholds */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-700 mb-4">
              <Zap className="w-4 h-4 inline mr-1.5 text-amber-500" />
              Auto-Priority Thresholds
            </h3>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="text-sm">🔥 Hot Lead:</span>
                <span className="text-sm text-gray-500">Score ≥</span>
                <input
                  type="number"
                  value={hotThreshold}
                  disabled={!editable}
                  onChange={(e) => setHotThreshold(Number(e.target.value))}
                  className="w-16 px-2 py-1.5 border border-red-200 rounded-lg text-center text-sm font-bold text-red-600 bg-red-50 disabled:opacity-70"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">⚡ Warm Lead:</span>
                <span className="text-sm text-gray-500">Score ≥</span>
                <input
                  type="number"
                  value={warmThreshold}
                  disabled={!editable}
                  onChange={(e) => setWarmThreshold(Number(e.target.value))}
                  className="w-16 px-2 py-1.5 border border-amber-200 rounded-lg text-center text-sm font-bold text-amber-600 bg-amber-50 disabled:opacity-70"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">❄️ Cold Lead:</span>
                <span className="text-sm text-gray-500">Score &lt; {warmThreshold}</span>
              </div>
              <div className="ml-auto text-xs text-gray-400">
                Max possible: {maxPossibleScore} pts
              </div>
            </div>
          </div>

          {/* Rules by Category */}
          {Object.entries(categoryConfig).map(([category, config]) => {
            const categoryRules = groupedRules[category] || []
            const Icon = config.icon

            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-5 h-5 ${config.color}`} />
                  <h3 className="text-lg font-bold text-gray-900">{config.label}</h3>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {categoryRules.filter((r) => r.isActive).length} active
                  </span>
                </div>
                <div className="space-y-2">
                  {categoryRules.map((rule) => {
                    const ruleIndex = rules.findIndex((r) => r.id === rule.id)
                    return (
                      <RuleRow
                        key={rule.id}
                        rule={rule}
                        readOnly={!editable}
                        onUpdate={(r) => updateRule(ruleIndex, r)}
                        onDelete={() => deleteRule(ruleIndex)}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Add Custom Rule — only when rules are actually editable */}
          {editable && (
            <button
              onClick={addCustomRule}
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium w-full justify-center"
            >
              <Plus className="w-4 h-4" /> Add Custom Scoring Rule
            </button>
          )}
        </>
      )}

      {activeTab === 'preview' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-700">Current Lead Scores</h3>
            <button
              onClick={fetchPreview}
              className="flex items-center gap-1 text-xs text-indigo-600 hover:underline"
            >
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>

          {previewLeads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <BarChart3 className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm">No scored leads yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Scores shown here are the stored values last calculated by the scoring engine
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {previewLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <ScoreGauge score={lead.score} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{lead.studentName}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">{lead.stage.replace(/_/g, ' ')}</span>
                      {lead.breakdown.slice(0, 3).map((b, i) => (
                        <span
                          key={i}
                          className={`text-[10px] px-1.5 py-0.5 rounded ${b.points >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                        >
                          {b.rule}: {b.points > 0 ? '+' : ''}
                          {b.points}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        lead.score >= hotThreshold
                          ? 'text-red-600'
                          : lead.score >= warmThreshold
                            ? 'text-amber-600'
                            : 'text-blue-600'
                      }`}
                    >
                      {lead.score >= hotThreshold
                        ? '🔥 Hot'
                        : lead.score >= warmThreshold
                          ? '⚡ Warm'
                          : '❄️ Cold'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
