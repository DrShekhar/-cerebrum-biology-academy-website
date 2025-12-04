'use client'

import { Bell, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface Announcement {
  id: string
  title: string
  content?: string | null
  publishedAt?: string | null
}

interface AnnouncementBannerProps {
  announcements: Announcement[]
}

export default function AnnouncementBanner({ announcements }: AnnouncementBannerProps) {
  const [dismissedIds, setDismissedIds] = useState<string[]>([])

  if (!announcements || announcements.length === 0) return null

  const visibleAnnouncements = announcements.filter((a) => !dismissedIds.includes(a.id))
  if (visibleAnnouncements.length === 0) return null

  const dismiss = (id: string) => {
    setDismissedIds([...dismissedIds, id])
  }

  return (
    <div className="space-y-3 mb-8">
      {visibleAnnouncements.slice(0, 3).map((announcement) => (
        <div
          key={announcement.id}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 relative"
        >
          <button
            onClick={() => dismiss(announcement.id)}
            className="absolute top-3 right-3 p-1 hover:bg-yellow-200/50 rounded-full transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4 text-yellow-700" />
          </button>

          <div className="flex items-start gap-3 pr-8">
            <div className="flex-shrink-0 w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-yellow-700" />
            </div>
            <div className="flex-grow">
              <Link href={`/free-resources/${announcement.id}`} className="hover:underline">
                <h3 className="font-semibold text-yellow-900">{announcement.title}</h3>
              </Link>
              {announcement.content && (
                <div
                  className="text-sm text-yellow-800 mt-1 line-clamp-2 prose prose-sm prose-yellow"
                  dangerouslySetInnerHTML={{ __html: announcement.content.slice(0, 200) }}
                />
              )}
              {announcement.publishedAt && (
                <p className="text-xs text-yellow-600 mt-2">
                  {new Date(announcement.publishedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
