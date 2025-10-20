'use client'

import { WizardStepProps } from '../../CourseWizardContainer'

export function CourseRecommendationsStep({ data, onUpdate, onNext, isValid }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Course Recommendations</h3>
      <p className="text-gray-600">Based on your preferences, here are our recommendations</p>

      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-semibold mb-2">Recommended Course</h4>
        <p>We recommend the Ascent Series based on your goals and budget.</p>
      </div>
    </div>
  )
}
