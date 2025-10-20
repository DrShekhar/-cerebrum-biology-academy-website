'use client'

import { WizardStepProps } from '../../CourseWizardContainer'

export function TimeAvailabilityStep({ data, onUpdate, onNext, isValid }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Your Study Schedule</h3>
      <p className="text-gray-600">Help us plan your ideal learning schedule</p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hours per Day</label>
        <input
          type="number"
          value={data?.timeAvailability?.hoursPerDay || ''}
          onChange={(e) =>
            onUpdate('timeAvailability', {
              ...data.timeAvailability,
              hoursPerDay: parseInt(e.target.value),
            })
          }
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="e.g., 4"
        />
      </div>
    </div>
  )
}
