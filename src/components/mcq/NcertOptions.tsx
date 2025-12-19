'use client'

import { Check } from 'lucide-react'

interface NcertOptionsProps {
  selectedWeightage: string | null
  hasDiagramOnly: boolean
  diagramCount?: number
  onWeightageChange: (weightage: string | null) => void
  onDiagramOnlyChange: (hasDiagramOnly: boolean) => void
}

const weightages = [
  {
    value: 'HIGH',
    label: 'High',
    stars: '★★★',
    color: 'border-amber-400 hover:border-amber-500 hover:bg-amber-50',
    activeColor: 'bg-amber-100 border-amber-500 text-amber-800',
    starColor: 'text-amber-500',
  },
  {
    value: 'MEDIUM',
    label: 'Medium',
    stars: '★★',
    color: 'border-stone-300 hover:border-stone-400 hover:bg-stone-50',
    activeColor: 'bg-stone-100 border-stone-500 text-stone-800',
    starColor: 'text-stone-400',
  },
  {
    value: 'LOW',
    label: 'Low',
    stars: '★',
    color: 'border-sage-300 hover:border-sage-400 hover:bg-sage-50',
    activeColor: 'bg-sage-100 border-sage-500 text-sage-800',
    starColor: 'text-sage-500',
  },
]

export function NcertOptions({
  selectedWeightage,
  hasDiagramOnly,
  diagramCount = 248,
  onWeightageChange,
  onDiagramOnlyChange,
}: NcertOptionsProps) {
  return (
    <div className="bg-gradient-to-br from-sage-50/50 via-stone-50 to-specimen-50/30 rounded-2xl p-5 border border-sage-200/50 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-lg">📖</span>
        <span className="font-semibold text-ink tracking-tight">NCERT Options</span>
      </div>

      {/* NEET Weightage Filter */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
            NEET Weightage
          </span>
          <div className="h-px flex-1 bg-stone-200 border-dashed" />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onWeightageChange(null)}
            className={`
              inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border-2
              transition-all duration-200
              ${
                !selectedWeightage
                  ? 'bg-sage-100 border-sage-500 text-sage-800'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-sage-300 hover:bg-sage-50'
              }
            `}
          >
            {!selectedWeightage && <Check className="w-3.5 h-3.5" />}
            All
          </button>
          {weightages.map((w) => (
            <button
              key={w.value}
              onClick={() => onWeightageChange(w.value)}
              className={`
                inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border-2
                transition-all duration-200
                ${
                  selectedWeightage === w.value
                    ? w.activeColor
                    : `bg-white text-stone-600 ${w.color}`
                }
              `}
            >
              {selectedWeightage === w.value && <Check className="w-3.5 h-3.5" />}
              <span className={w.starColor}>{w.stars}</span>
              {w.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-stone-600 mt-2 flex items-center gap-1">
          <span className="text-amber-500">★</span>
          Higher stars = more frequent in NEET exams
        </p>
      </div>

      {/* Diagram Filter */}
      <div className="bg-gradient-to-r from-amber-50/80 to-amber-100/50 rounded-xl p-4 border border-amber-200/70">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl" role="img" aria-label="Diagram">
              🖼️
            </span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-stone-800 text-sm">
                  Diagram-Based Questions
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-800 text-xs font-mono font-medium">
                  {diagramCount}
                </span>
              </div>
              <p className="text-xs text-stone-600">Practice visual diagrams and labeling</p>
            </div>
          </div>

          {/* Custom Toggle Switch */}
          <button
            onClick={() => onDiagramOnlyChange(!hasDiagramOnly)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onDiagramOnlyChange(!hasDiagramOnly)
              }
            }}
            role="switch"
            aria-checked={hasDiagramOnly}
            aria-label="Toggle diagram-only questions"
            className={`
              relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer items-center rounded-full
              transition-colors duration-200 ease-in-out
              focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
              ${hasDiagramOnly ? 'bg-amber-500' : 'bg-stone-300'}
            `}
          >
            <span
              className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md
                ring-0 transition-transform duration-200 ease-in-out
                ${hasDiagramOnly ? 'translate-x-6' : 'translate-x-1'}
              `}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
