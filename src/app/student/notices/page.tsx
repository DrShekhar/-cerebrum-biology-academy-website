'use client'

import React from 'react'
import { NoticeBoard } from '@/components/notices/NoticeBoard'

export default function StudentNoticesPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <NoticeBoard limit={20} showFilters={true} />
    </div>
  )
}
