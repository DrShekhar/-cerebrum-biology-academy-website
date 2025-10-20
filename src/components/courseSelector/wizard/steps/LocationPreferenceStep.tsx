'use client'

import { WizardStepProps } from '../../CourseWizardContainer'

export function LocationPreferenceStep({ data, onUpdate, onNext, isValid }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Location & Learning Mode</h3>
      <p className="text-gray-600">Choose your preferred learning environment</p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
        <input
          type="text"
          value={data?.location?.city || ''}
          onChange={(e) => onUpdate('location', { ...data.location, city: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="e.g., Delhi"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Mode</label>
        <select
          value={data?.location?.preferredMode || ''}
          onChange={(e) =>
            onUpdate('location', { ...data.location, preferredMode: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select mode</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
    </div>
  )
}
