'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { WorksheetList } from '@/components/worksheets/WorksheetList'

export default function StudentWorksheetsPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Worksheets</h1>
        <p className="text-sm text-gray-600 mt-1">
          Practice worksheets and assignments for your courses
        </p>
      </div>
      <WorksheetList
        onSelectWorksheet={(worksheet) => {
          router.push(`/student/worksheets/${worksheet.id}`)
        }}
      />
    </div>
  )
}
