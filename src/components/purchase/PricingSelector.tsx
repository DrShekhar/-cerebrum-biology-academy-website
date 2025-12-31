'use client'

import { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'

export interface PricingPlan {
  id: string
  name: string
  price: number
  originalPrice?: number
  duration: string
  popular?: boolean
  savings?: string
  features: string[]
  paymentType: 'FULL' | 'QUARTERLY' | 'MONTHLY'
}

interface PricingSelectorProps {
  plans: PricingPlan[]
  onSelectPlan: (plan: PricingPlan) => void
  selectedPlanId?: string
}

export function PricingSelector({ plans, onSelectPlan, selectedPlanId }: PricingSelectorProps) {
  const [selected, setSelected] = useState<string>(selectedPlanId || plans[0]?.id)

  const handleSelect = (plan: PricingPlan) => {
    setSelected(plan.id)
    onSelectPlan(plan)
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Learning Plan</h2>
        <p className="text-gray-600">Select the payment option that works best for you</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isSelected = selected === plan.id
          const isPopular = plan.popular

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                isSelected
                  ? 'border-green-600 shadow-xl scale-105 bg-green-50'
                  : 'border-gray-200 hover:border-green-300 hover:shadow-lg bg-white'
              }`}
              onClick={() => handleSelect(plan)}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#4a5d4a] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-2">
                  {plan.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ₹{plan.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{plan.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{plan.duration}</p>
                {plan.savings && (
                  <div className="mt-2">
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {plan.savings}
                    </span>
                  </div>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        isSelected ? 'text-green-600' : 'text-gray-400'
                      }`}
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Select Button */}
              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  isSelected
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelect(plan)
                }}
              >
                {isSelected ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Trust Signals */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span>100% Money-Back Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span>Instant Course Access</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span>Secure Payment with Razorpay</span>
          </div>
        </div>
      </div>
    </div>
  )
}
