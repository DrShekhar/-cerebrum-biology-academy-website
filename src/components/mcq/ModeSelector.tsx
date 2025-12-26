'use client'

import { useState } from 'react'
import { BookOpen, Clock, RotateCcw, ChevronDown, Info } from 'lucide-react'

export type QuizMode = 'practice' | 'timed' | 'review'

interface ModeSelectorProps {
  selectedMode: QuizMode
  onModeChange: (mode: QuizMode) => void
  reviewDueCount?: number
  className?: string
}

const MODES = [
  {
    id: 'practice' as QuizMode,
    name: 'Practice Mode',
    description: 'Learn at your own pace with unlimited time',
    icon: BookOpen,
    color: 'green',
    features: ['No time limit', 'Detailed explanations', 'Skip questions freely'],
  },
  {
    id: 'timed' as QuizMode,
    name: 'Timed Mode',
    description: 'NEET-style 60 seconds per question',
    icon: Clock,
    color: 'blue',
    features: ['60s per question', 'Auto-submit on timeout', 'Exam simulation'],
  },
  {
    id: 'review' as QuizMode,
    name: 'Review Mode',
    description: 'Revise questions using spaced repetition',
    icon: RotateCcw,
    color: 'purple',
    features: ['Smart scheduling', 'Focus on weak areas', 'Track mastery'],
  },
]

export function ModeSelector({
  selectedMode,
  onModeChange,
  reviewDueCount = 0,
  className = '',
}: ModeSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showInfo, setShowInfo] = useState<QuizMode | null>(null)

  const currentMode = MODES.find((m) => m.id === selectedMode)!

  const colorClasses = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      icon: 'text-green-600',
      ring: 'ring-green-600',
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      icon: 'text-blue-600',
      ring: 'ring-blue-500',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      icon: 'text-purple-600',
      ring: 'ring-purple-500',
    },
  }

  return (
    <div className={`relative ${className}`}>
      {/* Current Selection Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
          colorClasses[currentMode.color as keyof typeof colorClasses].bg
        } ${colorClasses[currentMode.color as keyof typeof colorClasses].border} hover:shadow-md`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${colorClasses[currentMode.color as keyof typeof colorClasses].bg}`}
          >
            <currentMode.icon
              className={`w-5 h-5 ${colorClasses[currentMode.color as keyof typeof colorClasses].icon}`}
            />
          </div>
          <div className="text-left">
            <p
              className={`font-semibold ${colorClasses[currentMode.color as keyof typeof colorClasses].text}`}
            >
              {currentMode.name}
            </p>
            <p className="text-xs text-gray-500">{currentMode.description}</p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-fade-in-up">
          {MODES.map((mode) => {
            const isSelected = mode.id === selectedMode
            const colors = colorClasses[mode.color as keyof typeof colorClasses]

            return (
              <div key={mode.id} className="relative">
                <button
                  onClick={() => {
                    onModeChange(mode.id)
                    setIsExpanded(false)
                  }}
                  className={`w-full flex items-center gap-3 p-3 transition-all hover:bg-gray-50 ${
                    isSelected
                      ? `${colors.bg} ${colors.border} border-l-4`
                      : 'border-l-4 border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <mode.icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className={`font-semibold ${isSelected ? colors.text : 'text-gray-700'}`}>
                        {mode.name}
                      </p>
                      {mode.id === 'review' && reviewDueCount > 0 && (
                        <span className="px-1.5 py-0.5 bg-purple-500 text-white text-xs rounded-full">
                          {reviewDueCount} due
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{mode.description}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowInfo(showInfo === mode.id ? null : mode.id)
                    }}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <Info className="w-4 h-4 text-gray-400" />
                  </button>
                </button>

                {/* Info tooltip */}
                {showInfo === mode.id && (
                  <div className="px-4 pb-3 bg-gray-50">
                    <p className="text-xs font-medium text-gray-600 mb-1">Features:</p>
                    <ul className="space-y-1">
                      {mode.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-500 flex items-center gap-1">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${colors.bg} ${colors.text}`}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isExpanded && <div className="fixed inset-0 z-40" onClick={() => setIsExpanded(false)} />}
    </div>
  )
}

/**
 * Compact mode selector for use in quiz header
 */
export function ModeSelectorCompact({
  selectedMode,
  onModeChange,
  reviewDueCount = 0,
}: Omit<ModeSelectorProps, 'className'>) {
  const colorMap = {
    practice: 'bg-green-100 text-green-700 hover:bg-green-200',
    timed: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    review: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
  }

  const iconMap = {
    practice: BookOpen,
    timed: Clock,
    review: RotateCcw,
  }

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {MODES.map((mode) => {
        const Icon = iconMap[mode.id]
        const isSelected = mode.id === selectedMode

        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              isSelected ? colorMap[mode.id] : 'text-gray-500 hover:text-gray-700'
            }`}
            title={mode.name}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{mode.name.split(' ')[0]}</span>
            {mode.id === 'review' && reviewDueCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {reviewDueCount > 9 ? '9+' : reviewDueCount}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
