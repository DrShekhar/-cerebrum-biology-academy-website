'use client'

import { WizardStepProps } from '../../CourseWizardContainer'

export function WeakAreasAssessmentStep({ data, onUpdate, onNext, isValid }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Areas of Focus</h3>
      <p className="text-gray-600">Identify your improvement opportunities</p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Weak Topics</label>
        <textarea
          value={JSON.stringify(data?.weakAreas?.subjects || {})}
          onChange={(e) => {
            try {
              const subjects = JSON.parse(e.target.value)
              onUpdate('weakAreas', { ...data.weakAreas, subjects })
            } catch {}
          }}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
          placeholder='{"Genetics": 50, "Ecology": 60}'
        />
      </div>
    </div>
  )
}
