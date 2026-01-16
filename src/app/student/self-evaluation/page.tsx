'use client'

import React from 'react'
import { SelfEvaluation } from '@/components/self-evaluation/SelfEvaluation'

export default function StudentSelfEvaluationPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Self Evaluation</h1>
        <p className="text-sm text-gray-600 mt-1">
          Track your daily study progress and reflect on your learning journey
        </p>
      </div>
      <SelfEvaluation />
    </div>
  )
}
