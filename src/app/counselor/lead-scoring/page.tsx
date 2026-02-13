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
  CheckCircle2,
  AlertCircle,
  BarChart3,
  RefreshCw,
} from 'lucide-react'
import { showToast } from '@/lib/toast'

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
  currentScore: number
  calculatedScore: number
  breakdown: { rule: string; points: number }[]
}

// ─── Default Scoring Rules ───────────────────────────────────────────────────

const DEFAULT_RULES: ScoringRule[] = [
  // Behavioral signals
  { id: 'demo_attended', event: 'DEMO_ATTENDED', label: 'Demo class attended', category: 'BEHAVIORAL', points: 30, description: 'Student attended a demo class', isActive: true },
  { id: 'scholarship_test', event: 'SCHOLARSHIP_TEST_TAKEN', label: 'Scholarship test taken', category: 'BEHAVIORAL', points: 35, description: 'Student attempted scholarship admission test', isActive: true },
  { id: 'parent_callback', event: 'PARENT_CALLBACK', label: 'Parent called back', category: 'BEHAVIORAL', points: 25, description: 'Parent initiated a callback or followup', isActive: true },
  { id: 'campus_visit', event: 'CAMPUS_VISIT', label: 'Campus/center visit', category: 'BEHAVIORAL', points: 20, description: 'Student/parent visited the center in person', isActive: true },
  { id: 'fee_doc_viewed', event: 'FEE_DOC_VIEWED', label: 'Fee document viewed', category: 'BEHAVIORAL', points: 20, description: 'Parent opened fee structure PDF', isActive: true },

  // Demographic fit
  { id: 'class_12', event: 'CLASS_12_STUDENT', label: 'Class 12 student', category: 'DEMOGRAPHIC', points: 20, description: 'Currently in Class 12 — ideal NEET timing', isActive: true },
  { id: 'dropper', event: 'DROPPER_WITH_SCORE', label: 'Dropper with previous NEET score', category: 'DEMOGRAPHIC', points: 25, description: 'Has attempted NEET before — high intent', isActive: true },
  { id: 'local_resident', event: 'LOCAL_RESIDENT', label: 'Local resident (within 10km)', category: 'DEMOGRAPHIC', points: 10, description: 'Lives nearby — lower commute friction', isActive: true },
  { id: 'bio_weak', event: 'BIOLOGY_WEAK_SUBJECT', label: 'Biology identified as weak subject', category: 'DEMOGRAPHIC', points: 15, description: 'Perfect fit for biology-focused coaching', isActive: true },

  // Engagement signals
  { id: 'wa_opened', event: 'WHATSAPP_OPENED', label: 'WhatsApp message opened', category: 'ENGAGEMENT', points: 5, description: 'Opened a WhatsApp message from counselor', isActive: true },
  { id: 'wa_replied', event: 'WHATSAPP_REPLIED', label: 'WhatsApp reply received', category: 'ENGAGEMENT', points: 15, description: 'Student/parent replied to a WhatsApp message', isActive: true },
  { id: 'email_opened', event: 'EMAIL_OPENED', label: 'Email opened', category: 'ENGAGEMENT', points: 3, description: 'Opened an email from the institute', isActive: true },
  { id: 'website_return', event: 'WEBSITE_RETURN_VISIT', label: 'Returned to website', category: 'ENGAGEMENT', points: 10, description: 'Visited website more than once', isActive: true },
  { id: 'brochure_dl', event: 'BROCHURE_DOWNLOADED', label: 'Brochure downloaded', category: 'ENGAGEMENT', points: 8, description: 'Downloaded the course brochure', isActive: true },

  // Negative signals
  { id: 'no_response_7d', event: 'NO_RESPONSE_7_DAYS', label: 'No response in 7 days', category: 'NEGATIVE', points: -15, description: 'No engagement for a week — cooling off', isActive: true },
  { id: 'no_response_14d', event: 'NO_RESPONSE_14_DAYS', label: 'No response in 14 days', category: 'NEGATIVE', points: -25, description: 'No engagement for two weeks — going cold', isActive: true },
  { id: 'demo_no_show', event: 'DEMO_NO_SHOW', label: 'Demo class no-show', category: 'NEGATIVE', points: -20, description: 'Booked demo but did not attend', isActive: true },
  { id: 'competitor_mentioned', event: 'COMPETITOR_MENTIONED', label: 'Competitor mentioned', category: 'NEGATIVE', points: -10, description: 'Actively comparing with competitors', isActive: true },
]

// ─── Category Config ─────────────────────────────────────────────────────────

const categoryConfig: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
  BEHAVIORAL: { label: 'Behavioral', color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200', icon: Target },
  DEMOGRAPHIC: { label: 'Demographic Fit', color: 'text-purple-700', bgColor: 'bg-purple-50 border-purple-200', icon: Users },
  ENGAGEMENT: { label: 'Engagement', color: 'text-green-700', bgColor: 'bg-green-50 border-green-200', icon: TrendingUp },
  NEGATIVE: { label: 'Negative Signals', color: 'text-red-700', bgColor: 'bg-red-50 border-red-200', icon: AlertCircle },
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
        <circle cx={radius + stroke} cy={radius + stroke} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        <circle
          cx={radius + stroke} cy={radius + stroke} r={radius}
          fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`font-bold ${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-lg' : 'text-sm'}`} style={{ color }}>
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
  onUpdate,
  onDelete,
}: {
  rule: ScoringRule
  onUpdate: (rule: ScoringRule) => void
  onDelete: () => void
}) {
  const isNegative = rule.category === 'NEGATIVE'

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
      rule.isActive ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-60'
    }`}>
      <label className="flex-shrink-0">
        <input
          type="checkbox"
          checked={rule.isActive}
          onChange={(e) => onUpdate({ ...rule, isActive: e.target.checked })}
          className="rounded text-indigo-600 w-4 h-4"
        />
      </label>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{rule.label}</p>
        <p className="text-xs text-gray-400 truncate">{rule.description}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
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
        <span className="text-xs text-gray-400">pts</span>
      </div>

      <button onClick={onDelete} className="p-1.5 hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-lg transition-colors flex-shrink-0">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function LeadScoringPage() {
  const [rules, setRules] = useState<ScoringRule[]>(DEFAULT_RULES)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [rescoring, setRescoring] = useState(false)
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
      if (res.ok) {
        const data = await res.json()
        if (data.data?.rules?.length > 0) {
          setRules(data.data.rules)
          setHotThreshold(data.data.hotThreshold || 70)
          setWarmThreshold(data.data.warmThreshold || 40)
        }
      }
    } catch {
      // Use default rules
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
      if (!res.ok) throw new Error()
      showToast.success('Scoring rules saved!')
    } catch {
      showToast.error('Failed to save rules')
    } finally {
      setSaving(false)
    }
  }

  async function handleRescore() {
    if (!confirm('This will recalculate scores for ALL leads and update their priorities. Continue?')) return
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
      if (res.ok) {
        const data = await res.json()
        setPreviewLeads(data.data || [])
      }
    } catch {
      // silent
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

  const maxPossibleScore = rules.filter((r) => r.isActive && r.points > 0).reduce((sum, r) => sum + r.points, 0)

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
          <p className="text-gray-600 mt-1">Configure scoring rules to auto-prioritize your best leads</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRescore}
            disabled={rescoring}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {rescoring ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
            Rescore All Leads
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Rules
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 rounded-lg p-1 w-fit">
        {[
          { id: 'rules' as const, label: 'Scoring Rules', icon: Sliders },
          { id: 'preview' as const, label: 'Score Preview', icon: Eye },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); if (tab.id === 'preview') fetchPreview() }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
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
                  onChange={(e) => setHotThreshold(Number(e.target.value))}
                  className="w-16 px-2 py-1.5 border border-red-200 rounded-lg text-center text-sm font-bold text-red-600 bg-red-50"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">⚡ Warm Lead:</span>
                <span className="text-sm text-gray-500">Score ≥</span>
                <input
                  type="number"
                  value={warmThreshold}
                  onChange={(e) => setWarmThreshold(Number(e.target.value))}
                  className="w-16 px-2 py-1.5 border border-amber-200 rounded-lg text-center text-sm font-bold text-amber-600 bg-amber-50"
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
                        onUpdate={(r) => updateRule(ruleIndex, r)}
                        onDelete={() => deleteRule(ruleIndex)}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Add Custom Rule */}
          <button
            onClick={addCustomRule}
            className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium w-full justify-center"
          >
            <Plus className="w-4 h-4" /> Add Custom Scoring Rule
          </button>
        </>
      )}

      {activeTab === 'preview' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-700">Lead Score Preview</h3>
            <button onClick={fetchPreview} className="flex items-center gap-1 text-xs text-indigo-600 hover:underline">
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>

          {previewLeads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <BarChart3 className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm">Loading score preview...</p>
              <p className="text-xs text-gray-400 mt-1">Scores are calculated based on your configured rules</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {previewLeads.map((lead) => (
                <div key={lead.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  <ScoreGauge score={lead.calculatedScore} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{lead.studentName}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">{lead.stage.replace(/_/g, ' ')}</span>
                      {lead.breakdown.slice(0, 3).map((b, i) => (
                        <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded ${b.points >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {b.rule}: {b.points > 0 ? '+' : ''}{b.points}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${
                      lead.calculatedScore >= hotThreshold ? 'text-red-600' :
                      lead.calculatedScore >= warmThreshold ? 'text-amber-600' : 'text-blue-600'
                    }`}>
                      {lead.calculatedScore >= hotThreshold ? '🔥 Hot' :
                       lead.calculatedScore >= warmThreshold ? '⚡ Warm' : '❄️ Cold'}
                    </p>
                    {lead.currentScore !== lead.calculatedScore && (
                      <p className="text-[10px] text-gray-400">
                        was {lead.currentScore} → now {lead.calculatedScore}
                      </p>
                    )}
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
