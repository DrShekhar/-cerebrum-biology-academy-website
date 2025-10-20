'use client'

import { WizardStepProps } from '../../CourseWizardContainer'

export function GoalsSelectionStep({ data, onUpdate, onNext, isValid }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Define Your Learning Goals</h3>
      <p className="text-gray-600">Help us understand your NEET preparation objectives</p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Target NEET Score</label>
        <input
          type="number"
          value={data?.goals?.targetScore || ''}
          onChange={(e) =>
            onUpdate('goals', { ...data.goals, targetScore: parseInt(e.target.value) })
          }
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="e.g., 600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Rank</label>
        <input
          type="number"
          value={data?.goals?.preferredRank || ''}
          onChange={(e) =>
            onUpdate('goals', { ...data.goals, preferredRank: parseInt(e.target.value) })
          }
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="e.g., 1000"
        />
      </div>
    </div>
  )
}
