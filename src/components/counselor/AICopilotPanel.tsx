'use client'

// Counselor AI Copilot — buttons over the /api/agents/* suite, which was
// fully built and counselor-gated since June but had ZERO UI callers.
// All actions run synchronously (async=false default) and return
// { success, data } with per-agent structured shapes; a recursive renderer
// displays any of them. Each click is a real LLM call (costs money) — actions
// run one-at-a-time and results are kept until replaced.

import { useState } from 'react'
import {
  Sparkles,
  Target,
  PhoneCall,
  MessageSquareHeart,
  GraduationCap,
  Loader2,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react'

interface CommRef {
  id: string
  type: string
  sentAt?: string | null
}

interface Props {
  leadId: string
  communications?: CommRef[]
}

type ActionKey = 'qualify' | 'call-prep' | 'nurture' | 'recommend' | 'summarize' | 'actions'

const LEAD_ACTIONS: {
  key: ActionKey
  label: string
  endpoint: string
  icon: typeof Target
  hint: string
}[] = [
  {
    key: 'qualify',
    label: 'Qualify Lead',
    endpoint: '/api/agents/qualify-lead',
    icon: Target,
    hint: 'AI score, priority, and recommended next action',
  },
  {
    key: 'call-prep',
    label: 'Prep Call',
    endpoint: '/api/agents/call-prep',
    icon: PhoneCall,
    hint: 'Briefing: opening script, talking points, objections',
  },
  {
    key: 'nurture',
    label: 'Draft Nurture',
    endpoint: '/api/agents/generate-nurture',
    icon: MessageSquareHeart,
    hint: 'Personalized follow-up message to send',
  },
  {
    key: 'recommend',
    label: 'Recommend Courses',
    endpoint: '/api/agents/recommend-courses',
    icon: GraduationCap,
    hint: 'Best-fit courses for this lead',
  },
]

const LABELS: Record<string, string> = {
  score: 'Score',
  scoreBreakdown: 'Score breakdown',
  priority: 'Priority',
  qualificationReason: 'Why',
  recommendedAction: 'Recommended action',
  leadSummary: 'Lead summary',
  callObjective: 'Call objective',
  openingScript: 'Opening script',
  talkingPoints: 'Talking points',
  anticipatedObjections: 'Objections to expect',
  offersToMention: 'Offers to mention',
  keyFacts: 'Key facts',
  nextSteps: 'Next steps',
  interestLevel: 'Interest',
  engagement: 'Engagement',
  urgency: 'Urgency',
  fit: 'Fit',
}

function labelOf(key: string) {
  return (
    LABELS[key] ||
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (c) => c.toUpperCase())
      .trim()
  )
}

// Recursive renderer for the heterogeneous agent payloads
function RenderValue({ value, depth = 0 }: { value: unknown; depth?: number }) {
  if (value == null || value === '') return null
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return <p className="text-sm text-gray-700 whitespace-pre-wrap">{String(value)}</p>
  }
  if (Array.isArray(value)) {
    return (
      <ul className="space-y-1.5">
        {value.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-gray-700">
            <span className="text-indigo-400 mt-0.5">•</span>
            <div className="flex-1">
              <RenderValue value={item} depth={depth + 1} />
            </div>
          </li>
        ))}
      </ul>
    )
  }
  if (typeof value === 'object') {
    return (
      <div className={depth > 0 ? 'space-y-1.5' : 'space-y-3'}>
        {Object.entries(value as Record<string, unknown>).map(([k, v]) =>
          v == null || v === '' ? null : (
            <div key={k}>
              <div
                className={
                  depth === 0
                    ? 'text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1'
                    : 'text-xs font-medium text-gray-500'
                }
              >
                {labelOf(k)}
              </div>
              <RenderValue value={v} depth={depth + 1} />
            </div>
          )
        )}
      </div>
    )
  }
  return null
}

export function AICopilotPanel({ leadId, communications = [] }: Props) {
  const [running, setRunning] = useState<ActionKey | null>(null)
  const [result, setResult] = useState<{ key: ActionKey; label: string; data: unknown } | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState(false)

  // Most recent call-type communication → Summarize target
  const lastCall = communications.find((c) => (c.type || '').toUpperCase().includes('CALL'))

  async function run(
    key: ActionKey,
    label: string,
    endpoint: string,
    body: Record<string, unknown>
  ) {
    if (running) return
    try {
      setRunning(key)
      setError(null)
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || `${label} failed`)
      }
      setResult({ key, label, data: data.data ?? data })
    } catch (err) {
      setError(err instanceof Error ? err.message : `${label} failed`)
    } finally {
      setRunning(null)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-indigo-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-50 to-purple-50"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-semibold text-indigo-900">AI Copilot</h3>
        </div>
        {collapsed ? (
          <ChevronDown className="w-4 h-4 text-indigo-400" />
        ) : (
          <ChevronUp className="w-4 h-4 text-indigo-400" />
        )}
      </button>

      {!collapsed && (
        <div className="p-5 space-y-4">
          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            {LEAD_ACTIONS.map((a) => (
              <button
                key={a.key}
                onClick={() => run(a.key, a.label, a.endpoint, { leadId })}
                disabled={running !== null}
                title={a.hint}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors disabled:opacity-50 ${
                  result?.key === a.key
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 text-gray-700 hover:border-indigo-200 hover:bg-indigo-50/50'
                }`}
              >
                {running === a.key ? (
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                ) : (
                  <a.icon className="w-4 h-4 text-indigo-500" />
                )}
                {a.label}
              </button>
            ))}
          </div>

          {/* Call summarization (only when a call communication exists) */}
          {lastCall && (
            <div className="flex gap-2">
              <button
                onClick={() =>
                  run('summarize', 'Summarize Call', '/api/agents/summarize-call', {
                    communicationId: lastCall.id,
                  })
                }
                disabled={running !== null}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-indigo-200 hover:bg-indigo-50/50 disabled:opacity-50"
              >
                {running === 'summarize' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                ) : (
                  <PhoneCall className="w-4 h-4 text-indigo-500" />
                )}
                Summarize last call
              </button>
              <button
                onClick={() =>
                  run('actions', 'Extract Action Items', '/api/agents/extract-actions', {
                    communicationId: lastCall.id,
                  })
                }
                disabled={running !== null}
                title="Creates follow-up tasks from the call"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-indigo-200 hover:bg-indigo-50/50 disabled:opacity-50"
              >
                {running === 'actions' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                ) : (
                  <ClipboardList className="w-4 h-4 text-indigo-500" />
                )}
                Extract actions
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="border border-indigo-100 rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 bg-indigo-50/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                  {result.label}
                </span>
                <button
                  onClick={() => setResult(null)}
                  className="text-xs text-indigo-400 hover:text-indigo-600"
                >
                  Clear
                </button>
              </div>
              <div className="p-4 max-h-96 overflow-y-auto">
                <RenderValue value={result.data} />
              </div>
            </div>
          )}

          <p className="text-[11px] text-gray-400">
            Each action runs a live AI analysis of this lead&apos;s CRM data.
          </p>
        </div>
      )}
    </div>
  )
}
