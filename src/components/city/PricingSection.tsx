'use client'

import { CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface PricingSectionProps {
  cityName: string
}

const plans = [
  {
    name: 'Foundation',
    target: 'Class 11',
    price: '24,000',
    duration: '/year',
    features: ['Complete Botany + Zoology', 'NCERT aligned curriculum', 'Weekly chapter tests', 'Doubt clearing sessions'],
    popular: false,
  },
  {
    name: 'Comprehensive',
    target: 'Class 11-12',
    price: '36,000',
    duration: '/year',
    features: ['Full NEET Biology syllabus', 'Board + NEET dual prep', '12 full-length mock tests', 'Personal mentor assigned', 'Performance analytics'],
    popular: true,
  },
  {
    name: 'Intensive',
    target: 'Class 12 / Dropper',
    price: '48,000',
    duration: '/year',
    features: ['Accelerated revision', 'Daily practice papers', 'Previous year analysis', 'One-on-one mentoring', 'AIIMS faculty access'],
    popular: false,
  },
]

export function PricingSection({ cityName }: PricingSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            NEET Coaching Fees for {cityName} Students
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Affordable pricing with EMI options. Scholarships available for meritorious students.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border-2 transition-shadow hover:shadow-xl ${
                plan.popular
                  ? 'border-teal-600 bg-teal-50 relative'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center">
                  <Star className="w-3 h-3 mr-1" /> Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.target}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Rs {plan.price}</span>
                <span className="text-gray-500">{plan.duration}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/demo-booking">
                <Button
                  variant={plan.popular ? 'default' : 'outline'}
                  className={`w-full ${plan.popular ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}`}
                >
                  Book Free Demo
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          EMI options available starting Rs 2,000/month. Scholarships up to 50% for meritorious students.
        </p>
      </div>
    </section>
  )
}
