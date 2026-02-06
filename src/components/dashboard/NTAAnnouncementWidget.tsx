'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bell, ExternalLink, ChevronRight } from 'lucide-react'
import type { NTAAnnouncement, AnnouncementType } from '@/data/nta-announcements'

const badgeConfig: Record<AnnouncementType, { label: string; bg: string; text: string }> = {
  EXAM_DATE: { label: 'Exam Date', bg: 'bg-blue-100', text: 'text-blue-700' },
  ADMIT_CARD: { label: 'Admit Card', bg: 'bg-green-100', text: 'text-green-700' },
  RESULT: { label: 'Result', bg: 'bg-purple-100', text: 'text-purple-700' },
  SYLLABUS_CHANGE: { label: 'Syllabus', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  APPLICATION: { label: 'Application', bg: 'bg-teal-100', text: 'text-teal-700' },
  GENERAL: { label: 'General', bg: 'bg-gray-100', text: 'text-gray-700' },
}

export function NTAAnnouncementWidget() {
  const [announcements, setAnnouncements] = useState<NTAAnnouncement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch('/api/nta-announcements?limit=3')
        const data = await res.json()
        if (data.success) {
          setAnnouncements(data.data)
        }
      } catch {
        console.error('Failed to fetch NTA announcements')
      } finally {
        setLoading(false)
      }
    }
    fetchAnnouncements()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-48 mb-4" />
        <div className="space-y-3">
          <div className="h-16 bg-gray-100 rounded-lg" />
          <div className="h-16 bg-gray-100 rounded-lg" />
          <div className="h-16 bg-gray-100 rounded-lg" />
        </div>
      </div>
    )
  }

  if (announcements.length === 0) return null

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-100 rounded-lg flex items-center justify-center">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">NTA Updates</h3>
        </div>
        <Link
          href="/neet-updates"
          className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 min-h-[44px] px-2"
        >
          View All
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {announcements.map((item) => {
          const badge = badgeConfig[item.type]
          return (
            <a
              key={item.id}
              href={item.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-3 rounded-lg transition-colors ${
                item.isImportant
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 hover:border-blue-300'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium ${badge.bg} ${badge.text}`}
                    >
                      {badge.label}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-400">
                      {new Date(item.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    {item.isImportant && (
                      <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-medium">
                        Important
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
                    {item.title}
                  </p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-1" />
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
