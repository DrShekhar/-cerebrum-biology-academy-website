'use client'

import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export type ContentSource = 'all' | 'ncert' | 'pyq'

interface ContentSourceTabsProps {
  activeSource: ContentSource
  onSourceChange: (source: ContentSource) => void
  selectedPYQYear: number | null
  onPYQYearChange: (year: number | null) => void
  questionCounts?: {
    all: number
    ncert: number
    pyq: number
  }
}

const PYQ_YEARS = [
  { value: null, label: 'All Years', count: 500 },
  { value: 2024, label: '2024', count: 90 },
  { value: 2023, label: '2023', count: 90 },
  { value: 2022, label: '2022', count: 90 },
  { value: 2021, label: '2021', count: 90 },
  { value: 2020, label: '2020', count: 90 },
  { value: 2019, label: '2019', count: 60 },
  { value: 2018, label: '2018', count: 50 },
]

export function ContentSourceTabs({
  activeSource,
  onSourceChange,
  selectedPYQYear,
  onPYQYearChange,
  questionCounts = { all: 7000, ncert: 3375, pyq: 500 },
}: ContentSourceTabsProps) {
  const [isPYQDropdownOpen, setIsPYQDropdownOpen] = useState(false)
  const [clickedTab, setClickedTab] = useState<string | null>(null)

  const tabs = [
    {
      id: 'all' as ContentSource,
      label: 'All Questions',
      emoji: '🧬',
      count: questionCounts.all,
      description: 'Complete question bank',
    },
    {
      id: 'ncert' as ContentSource,
      label: 'NCERT Based',
      emoji: '📖',
      count: questionCounts.ncert,
      description: 'Textbook aligned',
    },
    {
      id: 'pyq' as ContentSource,
      label: 'PYQs',
      emoji: '📜',
      count: questionCounts.pyq,
      description: 'Past year questions',
    },
  ]

  const selectedYear = PYQ_YEARS.find((y) => y.value === selectedPYQYear) || PYQ_YEARS[0]

  const handleTabClick = (tabId: ContentSource) => {
    setClickedTab(tabId)
    onSourceChange(tabId)
    setTimeout(() => setClickedTab(null), 200)
  }

  return (
    <div className="w-full">
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
          Content Source
        </span>
        <div className="h-px flex-1 bg-stone-200" />
      </div>

      {/* Tabs Container */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tabs.map((tab) => {
          const isActive = activeSource === tab.id
          const isClicked = clickedTab === tab.id

          return (
            <div key={tab.id} className="relative">
              <button
                onClick={() => handleTabClick(tab.id)}
                className={`
                  w-full flex flex-col items-center gap-1.5 p-4 rounded-xl border-2
                  transition-all duration-200 ease-out
                  ${isClicked ? 'animate-tab-bounce' : ''}
                  ${
                    isActive
                      ? 'bg-sage-50 border-sage-500 shadow-md shadow-sage-500/10 -translate-y-0.5'
                      : 'bg-white border-stone-200 hover:border-sage-300 hover:bg-sage-50/50 hover:-translate-y-0.5 hover:shadow-sm'
                  }
                `}
              >
                {/* Icon/Emoji */}
                <span className="text-2xl" role="img" aria-label={tab.label}>
                  {tab.emoji}
                </span>

                {/* Label */}
                <span
                  className={`font-semibold text-sm ${isActive ? 'text-sage-700' : 'text-stone-700'}`}
                >
                  {tab.label}
                </span>

                {/* Count - Monospace */}
                <span
                  className={`
                    font-mono text-xs px-2 py-0.5 rounded-full
                    ${isActive ? 'bg-sage-200 text-sage-800' : 'bg-stone-100 text-stone-600'}
                  `}
                >
                  {tab.count.toLocaleString()}
                </span>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-sage-500 rounded-full" />
                )}
              </button>

              {/* PYQ Year Dropdown - shows below PYQs tab when active */}
              {tab.id === 'pyq' && activeSource === 'pyq' && (
                <div className="mt-2 hidden sm:block">
                  <div className="relative">
                    <button
                      onClick={() => setIsPYQDropdownOpen(!isPYQDropdownOpen)}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-specimen-50 text-specimen-700 rounded-lg border border-specimen-200 hover:bg-specimen-100 transition-colors text-sm font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs">📅</span>
                        <span>{selectedYear.label}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isPYQDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isPYQDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsPYQDropdownOpen(false)}
                        />
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-50 overflow-hidden">
                          {PYQ_YEARS.map((year) => (
                            <button
                              key={year.value ?? 'all'}
                              onClick={() => {
                                onPYQYearChange(year.value)
                                setIsPYQDropdownOpen(false)
                              }}
                              className={`
                                w-full flex items-center justify-between px-3 py-2 text-sm
                                transition-colors
                                ${
                                  selectedPYQYear === year.value
                                    ? 'bg-specimen-100 text-specimen-700'
                                    : 'text-stone-700 hover:bg-stone-50'
                                }
                              `}
                            >
                              <span className="font-medium">{year.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-stone-400">
                                  {year.count}
                                </span>
                                {selectedPYQYear === year.value && (
                                  <Check className="w-4 h-4 text-specimen-600" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Year dropdown for mobile - shows below tabs */}
      {activeSource === 'pyq' && (
        <div className="mt-4 sm:hidden">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
            <span>📅</span>
            Select Year
          </label>
          <select
            value={selectedPYQYear ?? ''}
            onChange={(e) => onPYQYearChange(e.target.value ? Number(e.target.value) : null)}
            className="w-full px-4 py-3 border-2 border-specimen-200 rounded-xl bg-specimen-50 text-specimen-700 focus:outline-none focus:ring-2 focus:ring-specimen-500 focus:border-specimen-500 font-medium"
          >
            {PYQ_YEARS.map((year) => (
              <option key={year.value ?? 'all'} value={year.value ?? ''}>
                {year.label} ({year.count} questions)
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
