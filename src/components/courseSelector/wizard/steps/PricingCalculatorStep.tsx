'use client'

import { WizardStepProps } from '../../CourseWizardContainer'

export function PricingCalculatorStep({ data, onUpdate, onNext, isValid }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Pricing & Payment</h3>
      <p className="text-gray-600">Customize your payment plan</p>

      <div className="bg-green-50 rounded-lg p-6">
        <h4 className="font-semibold mb-2">Payment Plan</h4>
        <p>Total: ₹98,000</p>
        <p className="text-sm text-gray-600">Pay in installments or one-time</p>
      </div>
    </div>
  )
}
