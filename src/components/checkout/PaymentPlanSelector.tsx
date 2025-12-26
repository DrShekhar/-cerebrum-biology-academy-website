'use client'

import { Check, BadgePercent, Calendar, CreditCard, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export type PaymentPlanType = 'lumpSum' | 'twoInstallments' | 'threeInstallments'

export interface PaymentPlan {
  id: PaymentPlanType
  name: string
  description: string
  getAmount: (prices: {
    lumpSum: number
    twoInstallments: number
    threeInstallments: number
  }) => number
  getSchedule: (totalAmount: number) => { label: string; amount: number }[]
  discount?: number
  recommended?: boolean
}

interface PaymentPlanSelectorProps {
  prices: {
    lumpSum: number
    twoInstallments: number
    threeInstallments: number
  }
  selectedPlan: PaymentPlanType | null
  onSelect: (plan: PaymentPlanType) => void
}

export const paymentPlans: PaymentPlan[] = [
  {
    id: 'lumpSum',
    name: 'Full Payment',
    description: 'Pay once and save the most',
    getAmount: (prices) => prices.lumpSum,
    getSchedule: (total) => [{ label: 'Today', amount: total }],
    recommended: true,
  },
  {
    id: 'twoInstallments',
    name: '2 Installments',
    description: 'Split into 2 easy payments',
    getAmount: (prices) => prices.twoInstallments,
    getSchedule: (total) => [
      { label: 'Today (50%)', amount: Math.round(total * 0.5) },
      { label: 'After 3 months (50%)', amount: Math.round(total * 0.5) },
    ],
  },
  {
    id: 'threeInstallments',
    name: '3 Installments',
    description: 'Most flexible payment option',
    getAmount: (prices) => prices.threeInstallments,
    getSchedule: (total) => [
      { label: 'Today (40%)', amount: Math.round(total * 0.4) },
      { label: 'After 2 months (30%)', amount: Math.round(total * 0.3) },
      { label: 'After 4 months (30%)', amount: Math.round(total * 0.3) },
    ],
  },
]

export function PaymentPlanSelector({ prices, selectedPlan, onSelect }: PaymentPlanSelectorProps) {
  const lumpSumSavings = prices.threeInstallments - prices.lumpSum

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Choose Payment Plan</h3>
        {lumpSumSavings > 0 && (
          <span className="inline-flex items-center gap-1 text-sm text-green-600">
            <BadgePercent className="h-4 w-4" />
            Save up to ₹{lumpSumSavings.toLocaleString('en-IN')} with full payment
          </span>
        )}
      </div>

      <div className="space-y-3">
        {paymentPlans.map((plan) => {
          const isSelected = selectedPlan === plan.id
          const amount = plan.getAmount(prices)
          const schedule = plan.getSchedule(amount)
          const savings = prices.threeInstallments - amount

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelect(plan.id)}
              className={cn(
                'relative w-full rounded-xl border-2 p-4 text-left transition-all duration-200',
                isSelected
                  ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50',
                plan.recommended && !isSelected && 'border-green-300'
              )}
            >
              {plan.recommended && (
                <div className="absolute -top-3 right-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    <Sparkles className="h-3 w-3" />
                    Best Value
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full border-2 mt-0.5',
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-300 bg-white'
                    )}
                  >
                    {isSelected && <Check className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                      {savings > 0 && plan.id === 'lumpSum' && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          Save ₹{savings.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    ₹{amount.toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-gray-500">Total amount</p>
                </div>
              </div>

              {isSelected && schedule.length > 0 && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p className="mb-2 text-sm font-medium text-gray-700">Payment Schedule:</p>
                  <div className="space-y-2">
                    {schedule.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          {idx === 0 ? (
                            <CreditCard className="h-4 w-4 text-blue-500" />
                          ) : (
                            <Calendar className="h-4 w-4 text-gray-400" />
                          )}
                          <span>{item.label}</span>
                        </div>
                        <span
                          className={cn(
                            'font-medium',
                            idx === 0 ? 'text-blue-600' : 'text-gray-700'
                          )}
                        >
                          ₹{item.amount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      <p className="text-xs text-gray-500">
        * Installment payments include a small convenience fee. GST (18%) will be added to the final
        amount.
      </p>
    </div>
  )
}
