'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface WizardStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  completionWeight: number
}

interface WizardProgressIndicatorProps {
  steps: WizardStep[]
  currentStep: number
  completionPercentage: number
  variant?: string
}

export function WizardProgressIndicator({
  steps,
  currentStep,
  completionPercentage,
  variant = 'default',
}: WizardProgressIndicatorProps) {
  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-400'
              }`}
              whileHover={{ scale: 1.1 }}
            >
              {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
            </motion.div>
            <span className="text-xs text-gray-600 mt-2 text-center max-w-[80px]">
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
