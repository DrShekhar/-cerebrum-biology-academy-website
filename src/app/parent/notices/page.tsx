'use client'

export const dynamic = 'force-dynamic'

import React from 'react'
import { NoticeBoard } from '@/components/notices/NoticeBoard'

export default function ParentNoticesPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">School Notices</h1>
        <p className="text-sm text-gray-600 mt-1">
          Stay updated with announcements, events, and important information
        </p>
      </div>
      <NoticeBoard limit={20} showFilters={true} />
    </div>
  )
}
