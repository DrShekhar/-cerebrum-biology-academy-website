'use client'

export type QuizMode = 'practice' | 'timed' | 'review'

interface ModeRadioProps {
  selectedMode: QuizMode
  onModeChange: (mode: QuizMode) => void
  reviewDueCount?: number
}

const MODES = [
  {
    id: 'practice' as QuizMode,
    name: 'Practice',
    description: 'No time limit',
    emoji: '📚',
    borderColor: 'border-l-sage-500',
    selectedBg: 'bg-sage-50',
    selectedBorder: 'border-sage-300',
    selectedText: 'text-sage-800',
    hoverBg: 'hover:bg-sage-50/50',
    hoverBorder: 'hover:border-sage-200',
  },
  {
    id: 'timed' as QuizMode,
    name: 'Timed',
    description: '60s per question',
    emoji: '⏱️',
    borderColor: 'border-l-sky-500',
    selectedBg: 'bg-sky-50',
    selectedBorder: 'border-sky-300',
    selectedText: 'text-sky-800',
    hoverBg: 'hover:bg-sky-50/50',
    hoverBorder: 'hover:border-sky-200',
  },
  {
    id: 'review' as QuizMode,
    name: 'Review',
    description: 'Spaced repetition',
    emoji: '🔄',
    borderColor: 'border-l-specimen-500',
    selectedBg: 'bg-specimen-50',
    selectedBorder: 'border-specimen-300',
    selectedText: 'text-specimen-800',
    hoverBg: 'hover:bg-specimen-50/50',
    hoverBorder: 'hover:border-specimen-200',
  },
]

export function ModeRadio({ selectedMode, onModeChange, reviewDueCount = 0 }: ModeRadioProps) {
  return (
    <div className="w-full">
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">Mode</span>
        <div className="h-px flex-1 bg-stone-200" />
      </div>

      {/* Mode Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {MODES.map((mode) => {
          const isSelected = selectedMode === mode.id

          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`
                relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-l-4
                transition-all duration-200 ease-out text-center
                ${
                  isSelected
                    ? `${mode.selectedBg} ${mode.selectedBorder} ${mode.borderColor} shadow-md -translate-y-0.5`
                    : `bg-white border-stone-200 border-l-stone-300 ${mode.hoverBg} ${mode.hoverBorder} hover:-translate-y-0.5 hover:shadow-sm`
                }
              `}
            >
              {/* Emoji Icon */}
              <span className="text-2xl" role="img" aria-hidden="true">
                {mode.emoji}
              </span>

              {/* Mode Name */}
              <span
                className={`font-semibold text-sm ${isSelected ? mode.selectedText : 'text-stone-700'}`}
              >
                {mode.name}
              </span>

              {/* Description */}
              <span className={`text-xs ${isSelected ? 'text-stone-600' : 'text-stone-600'}`}>
                {mode.description}
              </span>

              {/* Review Due Badge */}
              {mode.id === 'review' && reviewDueCount > 0 && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-specimen-500 text-white text-xs font-mono font-semibold rounded-full shadow-sm">
                  {reviewDueCount} due
                </span>
              )}

              {/* Active Indicator Line */}
              {isSelected && (
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full ${
                    mode.id === 'practice'
                      ? 'bg-sage-500'
                      : mode.id === 'timed'
                        ? 'bg-sky-500'
                        : 'bg-specimen-500'
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
