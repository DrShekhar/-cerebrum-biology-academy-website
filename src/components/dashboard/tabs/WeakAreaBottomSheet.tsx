'use client'

import React from 'react'
import { Clock, Target, CheckCircle, Play, BookOpen } from 'lucide-react'
import { BottomSheet } from '@/components/mobile/BottomSheet'

interface WeakArea {
  chapter: string
  topic: string
  difficulty: 'low' | 'medium' | 'high'
  improvement: number
  recommendedStudyTime: number
}

interface WeakAreaBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  selectedWeakArea: WeakArea | null
  onStartStudy: (chapter: string) => void
  onBrowse: () => void
}

export function WeakAreaBottomSheet({
  isOpen,
  onClose,
  selectedWeakArea,
  onStartStudy,
  onBrowse,
}: WeakAreaBottomSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={selectedWeakArea?.chapter || 'Weak Area Details'}
      showHandle
    >
      {selectedWeakArea && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{selectedWeakArea.chapter}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedWeakArea.topic}</p>
            </div>
            <span
              className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                selectedWeakArea.difficulty === 'high'
                  ? 'bg-red-100 text-red-700'
                  : selectedWeakArea.difficulty === 'medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
              }`}
            >
              {selectedWeakArea.difficulty.toUpperCase()}
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Recommended Study Time</h4>
              </div>
              <p className="text-gray-700">
                {selectedWeakArea.recommendedStudyTime} minutes per day
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">Action Items</h4>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Review fundamental concepts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Practice 10-15 questions daily</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Take weekly topic tests</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                onStartStudy(selectedWeakArea.chapter)
                onClose()
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-navy-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all min-h-[48px] touch-action-manipulation active:scale-95"
            >
              <Play className="w-5 h-5" />
              <span>Start Now</span>
            </button>

            <button
              onClick={() => {
                onClose()
                onBrowse()
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-green-600 hover:text-green-600 transition-all min-h-[48px] touch-action-manipulation active:scale-95"
            >
              <BookOpen className="w-5 h-5" />
              <span>Browse</span>
            </button>
          </div>
        </div>
      )}
    </BottomSheet>
  )
}
