/**
 * Lead Score Badge Component
 * Displays lead score with color-coded category
 */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface LeadScoreBadgeProps {
  score: number | null | undefined
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LeadScoreBadge({
  score,
  showLabel = true,
  size = 'md',
  className,
}: LeadScoreBadgeProps) {
  if (score === null || score === undefined) {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold',
            size === 'sm' && 'w-6 h-6 text-xs',
            size === 'md' && 'w-8 h-8 text-sm',
            size === 'lg' && 'w-10 h-10 text-base'
          )}
        >
          <Minus
            className={cn(
              size === 'sm' && 'w-3 h-3',
              size === 'md' && 'w-4 h-4',
              size === 'lg' && 'w-5 h-5'
            )}
          />
        </div>
        {showLabel && <span className="text-xs text-gray-500">No Score</span>}
      </div>
    )
  }

  const getScoreCategory = (s: number): string => {
    if (s >= 80) return 'Hot'
    if (s >= 60) return 'Warm'
    if (s >= 40) return 'Cold'
    return 'Inactive'
  }

  const getScoreColor = (s: number): { bg: string; text: string; border: string } => {
    if (s >= 80) return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500' }
    if (s >= 60)
      return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-500' }
    if (s >= 40) return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-500' }
    return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-400' }
  }

  const getScoreIcon = (s: number) => {
    if (s >= 80)
      return (
        <TrendingUp
          className={cn(
            size === 'sm' && 'w-3 h-3',
            size === 'md' && 'w-4 h-4',
            size === 'lg' && 'w-5 h-5'
          )}
        />
      )
    if (s >= 60)
      return (
        <TrendingUp
          className={cn(
            size === 'sm' && 'w-3 h-3',
            size === 'md' && 'w-4 h-4',
            size === 'lg' && 'w-5 h-5'
          )}
        />
      )
    if (s >= 40)
      return (
        <TrendingDown
          className={cn(
            size === 'sm' && 'w-3 h-3',
            size === 'md' && 'w-4 h-4',
            size === 'lg' && 'w-5 h-5'
          )}
        />
      )
    return (
      <TrendingDown
        className={cn(
          size === 'sm' && 'w-3 h-3',
          size === 'md' && 'w-4 h-4',
          size === 'lg' && 'w-5 h-5'
        )}
      />
    )
  }

  const category = getScoreCategory(score)
  const colors = getScoreColor(score)

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded-full border-2 font-bold',
          colors.bg,
          colors.text,
          colors.border,
          size === 'sm' && 'w-10 h-10 text-xs',
          size === 'md' && 'w-12 h-12 text-sm',
          size === 'lg' && 'w-14 h-14 text-base'
        )}
      >
        {score}
      </div>
      {showLabel && (
        <div className="flex flex-col">
          <span
            className={cn(
              'font-semibold',
              colors.text,
              size === 'sm' && 'text-xs',
              size === 'md' && 'text-sm',
              size === 'lg' && 'text-base'
            )}
          >
            {category}
          </span>
          <span className="text-xs text-gray-500">Score</span>
        </div>
      )}
    </div>
  )
}

interface LeadScoreBreakdownData {
  demographic: number
  behavioral: number
  engagement: number
  timeline: number
  details?: {
    hasEmail: boolean
    hasPhone: boolean
    activityCount: number
    communicationCount: number
    demoBooked: boolean
    demoAttended: boolean
    daysSinceCreation: number
    daysSinceLastContact: number
  }
}

export function LeadScoreBreakdown({ score, breakdown }: { score: number; breakdown: LeadScoreBreakdownData | null | undefined }) {
  if (!breakdown) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-600">No score breakdown available</p>
      </div>
    )
  }

  const sections = [
    { label: 'Demographic', value: breakdown.demographic, max: 25, color: 'bg-blue-500' },
    { label: 'Behavioral', value: breakdown.behavioral, max: 30, color: 'bg-purple-500' },
    { label: 'Engagement', value: breakdown.engagement, max: 30, color: 'bg-green-600' },
    { label: 'Timeline', value: breakdown.timeline, max: 15, color: 'bg-orange-500' },
  ]

  return (
    <div className="p-4 border border-gray-200 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">Score Breakdown</h4>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">{score}</span>
          <span className="text-sm text-gray-600">/ 100</span>
        </div>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{section.label}</span>
              <span className="text-sm text-gray-600">
                {section.value} / {section.max}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={cn('h-2 rounded-full transition-all', section.color)}
                style={{ width: `${(section.value / section.max) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {breakdown.details && (
        <div className="pt-4 border-t border-gray-200">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Details</h5>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Email:</span>
              <span
                className={cn(
                  'font-medium',
                  breakdown.details.hasEmail ? 'text-green-600' : 'text-red-600'
                )}
              >
                {breakdown.details.hasEmail ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Phone:</span>
              <span
                className={cn(
                  'font-medium',
                  breakdown.details.hasPhone ? 'text-green-600' : 'text-red-600'
                )}
              >
                {breakdown.details.hasPhone ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Activities:</span>
              <span className="font-medium text-gray-900">{breakdown.details.activityCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Communications:</span>
              <span className="font-medium text-gray-900">
                {breakdown.details.communicationCount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Demo Booked:</span>
              <span
                className={cn(
                  'font-medium',
                  breakdown.details.demoBooked ? 'text-green-600' : 'text-gray-600'
                )}
              >
                {breakdown.details.demoBooked ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Demo Attended:</span>
              <span
                className={cn(
                  'font-medium',
                  breakdown.details.demoAttended ? 'text-green-600' : 'text-gray-600'
                )}
              >
                {breakdown.details.demoAttended ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Days Since Created:</span>
              <span className="font-medium text-gray-900">
                {breakdown.details.daysSinceCreation}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Days Since Contact:</span>
              <span className="font-medium text-gray-900">
                {breakdown.details.daysSinceLastContact}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
