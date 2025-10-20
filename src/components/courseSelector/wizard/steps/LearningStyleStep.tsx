'use client'

import { WizardStepProps } from '../../CourseWizardContainer'

export function LearningStyleStep({ data, onUpdate, onNext, isValid }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Your Learning Style</h3>
      <p className="text-gray-600">Personalize your learning approach</p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Difficulty Preference
        </label>
        <select
          value={data?.learningStyle?.difficultyPreference || ''}
          onChange={(e) =>
            onUpdate('learningStyle', {
              ...data.learningStyle,
              difficultyPreference: e.target.value,
            })
          }
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select difficulty</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
    </div>
  )
}
