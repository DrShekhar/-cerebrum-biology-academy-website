'use client'

import React from 'react'
import { LucideIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import type { SwipeGestureHandlers } from '@/hooks/useSwipeGesture'

interface Tab {
  id: string
  label: string
  icon: LucideIcon
}

interface DashboardTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  onPrevious: () => void
  onNext: () => void
  swipeHandlers?: Partial<SwipeGestureHandlers>
}

export function DashboardTabs({
  tabs,
  activeTab,
  onTabChange,
  onPrevious,
  onNext,
  swipeHandlers = {},
}: DashboardTabsProps) {
  return (
    <div
      className="bg-white shadow-sm border-b sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <button
          onClick={onPrevious}
          aria-label="Previous tab"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <nav
          className="flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-hide"
          {...swipeHandlers}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-label={tab.label}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              className={`flex items-center space-x-1.5 sm:space-x-2 py-3 sm:py-4 px-3 sm:px-2 border-b-2 transition-all whitespace-nowrap flex-shrink-0 touch-action-manipulation min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-t-lg ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium text-xs sm:text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={onNext}
          aria-label="Next tab"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] items-center justify-center"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-400 pb-1">
          Swipe to navigate
        </div>
      </div>
    </div>
  )
}

export type { Tab }
