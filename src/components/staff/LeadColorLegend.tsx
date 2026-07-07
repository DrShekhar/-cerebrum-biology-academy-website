'use client'

import { useState, useEffect, useCallback } from 'react'
import { Palette, ChevronDown, ChevronUp, Pencil, X } from 'lucide-react'
import { STAGE_META } from '@/lib/leads/stageColors'

export interface ColorTag {
  id: string
  color: string
  label: string
}

// Derived from the canonical stage table so the legend can never drift
// from what the board actually renders. Green stages collapse to one row.
const STAGE_LEGEND = [
  { label: 'New Leads', color: STAGE_META.NEW_LEAD.solid },
  { label: 'Demo Scheduled', color: STAGE_META.DEMO_SCHEDULED.solid },
  { label: 'Demo Done', color: STAGE_META.DEMO_COMPLETED.solid },
  { label: 'Offer Sent', color: STAGE_META.OFFER_SENT.solid },
  { label: 'Negotiating', color: STAGE_META.NEGOTIATING.solid },
  { label: 'Payment Plan / Enrolled', color: STAGE_META.ENROLLED.solid },
  { label: 'Lost', color: STAGE_META.LOST.solid },
]

const PRIORITY_LEGEND = [
  { label: 'Hot — call first', emoji: '🔥' },
  { label: 'Warm — engaged', emoji: '⚡' },
  { label: 'Cold — low signal', emoji: '❄️' },
]

// Module-level cache so dozens of LeadCards share one config fetch.
let tagsCache: ColorTag[] | null = null
let tagsPromise: Promise<ColorTag[]> | null = null

async function loadTags(force = false): Promise<ColorTag[]> {
  if (tagsCache && !force) return tagsCache
  if (!tagsPromise || force) {
    tagsPromise = fetch('/api/staff/lead-board-config')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) tagsCache = json.data.colorTags
        return tagsCache || []
      })
      .catch(() => tagsCache || [])
  }
  return tagsPromise
}

/**
 * Shared hook: the team-wide color-tag vocabulary (deduped fetch).
 */
export function useLeadColorTags() {
  const [tags, setTags] = useState<ColorTag[]>(tagsCache || [])
  const [loading, setLoading] = useState(!tagsCache)

  const fetchTags = useCallback(async (force = true) => {
    const result = await loadTags(force)
    setTags(result)
    setLoading(false)
  }, [])

  useEffect(() => {
    void loadTags().then((result) => {
      setTags(result)
      setLoading(false)
    })
  }, [])

  return { tags, loading, refresh: fetchTags }
}

/**
 * The color legend — collapsible, always available on the lead board and
 * lead detail so everyone knows what each color means. Stage hues and
 * priority markers are fixed; custom tag labels are team-editable.
 */
export function LeadColorLegend({
  tags,
  onTagsChanged,
  defaultOpen = false,
}: {
  tags: ColorTag[]
  onTagsChanged: () => void
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const [editing, setEditing] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-sm"
      >
        <span className="flex items-center gap-2 font-medium text-gray-900">
          <Palette className="w-4 h-4 text-indigo-600" />
          Color legend
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <p className="font-semibold text-gray-700 mb-2">Pipeline stage (column)</p>
            <ul className="space-y-1">
              {STAGE_LEGEND.map((s) => (
                <li key={s.label} className="flex items-center gap-2 text-gray-600">
                  <span className={`w-3 h-3 rounded ${s.color}`} />
                  {s.label}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-2">Priority (card marker)</p>
            <ul className="space-y-1">
              {PRIORITY_LEGEND.map((p) => (
                <li key={p.label} className="flex items-center gap-2 text-gray-600">
                  <span>{p.emoji}</span>
                  {p.label}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-700">Team color tags (you set these)</p>
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
              >
                <Pencil className="w-3 h-3" />
                Edit
              </button>
            </div>
            <ul className="space-y-1">
              {tags.map((t) => (
                <li key={t.id} className="flex items-center gap-2 text-gray-600">
                  <span
                    className="w-3 h-3 rounded-full border border-black/10"
                    style={{ backgroundColor: t.color }}
                  />
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {editing && (
        <LegendEditModal
          tags={tags}
          onClose={() => setEditing(false)}
          onSaved={() => {
            setEditing(false)
            onTagsChanged()
          }}
        />
      )}
    </div>
  )
}

function LegendEditModal({
  tags,
  onClose,
  onSaved,
}: {
  tags: ColorTag[]
  onClose: () => void
  onSaved: () => void
}) {
  const [draft, setDraft] = useState<ColorTag[]>(tags.map((t) => ({ ...t })))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const save = async () => {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/staff/lead-board-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ colorTags: draft }),
      })
      const json = await res.json()
      if (json.success) {
        onSaved()
      } else {
        setError(json.error || 'Failed to save')
      }
    } catch {
      setError('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Edit color meanings</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          These labels are shared with the whole team — when anyone tags a lead with a color, this
          is what it means.
        </p>
        <div className="space-y-2 mb-4">
          {draft.map((tag, i) => (
            <div key={tag.id} className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: tag.color }}
              />
              <input
                value={tag.label}
                onChange={(e) =>
                  setDraft((prev) =>
                    prev.map((t, j) => (j === i ? { ...t, label: e.target.value } : t))
                  )
                }
                maxLength={60}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          ))}
        </div>
        {error && <p className="text-xs text-red-600 mb-2">{error}</p>}
        <button
          onClick={() => void save()}
          disabled={saving || draft.some((t) => !t.label.trim())}
          className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save for the whole team'}
        </button>
      </div>
    </div>
  )
}

/**
 * Small color-tag picker: a dot that opens the palette with the shared
 * labels. Used on lead cards and the lead detail header.
 */
export function LeadColorTagPicker({
  leadId,
  current,
  tags,
  onChanged,
  size = 'sm',
}: {
  leadId: string
  current: string | null
  tags: ColorTag[]
  onChanged: (colorTag: string | null) => void
  size?: 'sm' | 'md'
}) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const activeTag = tags.find((t) => t.id === current) || null

  const setTag = async (colorTag: string | null) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/counselor/leads/${leadId}/color`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ colorTag }),
      })
      const json = await res.json()
      if (json.success) onChanged(colorTag)
    } finally {
      setSaving(false)
      setOpen(false)
    }
  }

  const dot = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5'

  return (
    <div className="relative inline-block">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        className={`${dot} rounded-full border-2 transition-transform hover:scale-110 ${
          activeTag ? 'border-white shadow' : 'border-dashed border-gray-300'
        }`}
        style={activeTag ? { backgroundColor: activeTag.color } : undefined}
        title={activeTag ? activeTag.label : 'Set color tag'}
        aria-label={activeTag ? `Color tag: ${activeTag.label}` : 'Set color tag'}
        disabled={saving}
      />
      {open && (
        <div
          className="absolute z-50 mt-1 left-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1"
          onClick={(e) => e.stopPropagation()}
        >
          {tags.map((t) => (
            <button
              key={t.id}
              onClick={() => void setTag(t.id)}
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left hover:bg-gray-50 ${
                current === t.id ? 'bg-blue-50' : ''
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: t.color }}
              />
              <span className="text-gray-700 truncate">{t.label}</span>
            </button>
          ))}
          {current && (
            <button
              onClick={() => void setTag(null)}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-gray-500 hover:bg-gray-50 border-t border-gray-100"
            >
              <span className="w-3.5 h-3.5 rounded-full border border-dashed border-gray-300 shrink-0" />
              Clear tag
            </button>
          )}
        </div>
      )}
    </div>
  )
}
