'use client'

import { WizardStepProps } from '../../CourseWizardContainer'

export function BudgetPreferenceStep({ data, onUpdate, onNext, isValid }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Set Your Budget</h3>
      <p className="text-gray-600">
        Choose a comfortable investment range for your NEET preparation
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Budget (₹)</label>
        <input
          type="number"
          value={data?.budget?.maxAmount || ''}
          onChange={(e) =>
            onUpdate('budget', { ...data.budget, maxAmount: parseInt(e.target.value) })
          }
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="e.g., 100000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Preference</label>
        <select
          value={data?.budget?.paymentPreference || ''}
          onChange={(e) =>
            onUpdate('budget', { ...data.budget, paymentPreference: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select preference</option>
          <option value="one-time">One-time payment</option>
          <option value="installment">Installments</option>
        </select>
      </div>
    </div>
  )
}
