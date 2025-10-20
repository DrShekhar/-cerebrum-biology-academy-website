'use client'

import { WizardStepProps } from '../../CourseWizardContainer'

export function FinalConfirmationStep({ data, onUpdate, onNext, isValid }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Confirm Your Selection</h3>
      <p className="text-gray-600">Review and confirm your course selection</p>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold mb-4">Your Selections</h4>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Target Score:</strong> {data?.goals?.targetScore || 'Not set'}
          </div>
          <div>
            <strong>Budget:</strong> ₹{data?.budget?.maxAmount?.toLocaleString() || 'Not set'}
          </div>
          <div>
            <strong>Mode:</strong> {data?.location?.preferredMode || 'Not set'}
          </div>
        </div>
      </div>
    </div>
  )
}
