'use client'

import { TierLevel } from '@/data/pricing'

interface PaymentOptionsDisplayProps {
  lumpSum: number
  twoInstallments: number
  threeInstallments: number
  tierName: TierLevel
  monthly?: number
}

export function PaymentOptionsDisplay({
  lumpSum,
  twoInstallments,
  threeInstallments,
  tierName,
  monthly,
}: PaymentOptionsDisplayProps) {
  const getTierColor = (tier: TierLevel) => {
    switch (tier) {
      case 'pinnacle':
        return 'bg-purple-700'
      case 'ascent':
        return 'bg-blue-700'
      case 'pursuit':
        return 'bg-green-700'
      case 'elixir':
        return 'bg-amber-600'
      default:
        return 'bg-indigo-700'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getInstallmentBreakdown = (installments: 'two' | 'three') => {
    const total = installments === 'two' ? twoInstallments : threeInstallments

    if (installments === 'two') {
      return [
        {
          description: 'First Installment (50%)',
          dueDate: 'Due on enrollment (Day 1)',
          amount: Math.round(total / 2),
        },
        {
          description: 'Second Installment (50%)',
          dueDate: 'Due after 45 days (Day 45)',
          amount: total - Math.round(total / 2),
        },
      ]
    } else {
      const first = Math.round(total * 0.5)
      const second = Math.round(total * 0.25)
      const third = total - first - second
      return [
        {
          description: 'First Installment (50%)',
          dueDate: 'Due on enrollment (Day 1)',
          amount: first,
        },
        {
          description: 'Second Installment (25%)',
          dueDate: 'Due after 30 days (Day 31)',
          amount: second,
        },
        {
          description: 'Third Installment (25%)',
          dueDate: 'Due after 60 days (Day 61)',
          amount: third,
        },
      ]
    }
  }

  const savingsAmount = lumpSum * 0.02

  if (monthly) {
    return (
      <div className="space-y-4">
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            BEST VALUE
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-green-900">Annual Payment</h4>
              <p className="text-green-700 text-sm">Pay once for the full year</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-900">{formatCurrency(lumpSum)}</div>
              <div className="text-sm text-green-600">/year</div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-amber-900">Monthly Payment</h4>
              <p className="text-amber-700 text-sm">Pay month by month</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-900">{formatCurrency(monthly)}</div>
              <div className="text-sm text-amber-600">/month</div>
            </div>
          </div>
          <div className="text-sm text-amber-700">
            Total if paid monthly: {formatCurrency(monthly * 12)}/year
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* One-time Payment Option - Highlighted */}
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          SAVE 2%
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-green-900">One-Time Payment</h4>
            <p className="text-green-700 text-sm">Pay once and save money</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-green-600 line-through">
              {formatCurrency(Math.round(lumpSum + savingsAmount))}
            </div>
            <div className="text-2xl font-bold text-green-900">{formatCurrency(lumpSum)}</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-green-700">
          <span>You save: {formatCurrency(Math.round(savingsAmount))}</span>
          <span className="font-medium">✨ Best Value</span>
        </div>
      </div>

      {/* 2-Installment Payment Option */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-gray-900">2-Installment Plan</h4>
            <p className="text-gray-600 text-sm">Split into 2 payments (Day 1 + Day 45)</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(twoInstallments)}
            </div>
            <div className="text-sm text-gray-500">Total Amount</div>
          </div>
        </div>

        <div className="space-y-3">
          {getInstallmentBreakdown('two').map((installment, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-xl"
            >
              <div>
                <div className="font-medium text-gray-900">{installment.description}</div>
                <div className="text-sm text-gray-600">{installment.dueDate}</div>
              </div>
              <div className="font-bold text-gray-900">{formatCurrency(installment.amount)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3-Installment Payment Option */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-gray-900">3-Installment Plan</h4>
            <p className="text-gray-600 text-sm">50% on admission, rest in 60 days</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(threeInstallments)}
            </div>
            <div className="text-sm text-gray-500">Total Amount</div>
          </div>
        </div>

        <div className="space-y-3">
          {getInstallmentBreakdown('three').map((installment, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-xl"
            >
              <div>
                <div className="font-medium text-gray-900">{installment.description}</div>
                <div className="text-sm text-gray-600">{installment.dueDate}</div>
              </div>
              <div className="font-bold text-gray-900">{formatCurrency(installment.amount)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EMI Options */}
      <div className={`${getTierColor(tierName)} rounded-2xl p-6 text-white`}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-bold">EMI Options Available</h4>
          <span className="text-2xl">💳</span>
        </div>
        <p className="text-sm opacity-90 mb-4">
          Convert to easy EMIs through your credit card or personal loan
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 text-center">
          <div>
            <div className="font-bold text-lg">{formatCurrency(Math.round(lumpSum / 6))}</div>
            <div className="text-xs opacity-75">6 months</div>
          </div>
          <div>
            <div className="font-bold text-lg">{formatCurrency(Math.round(lumpSum / 12))}</div>
            <div className="text-xs opacity-75">12 months</div>
          </div>
          <div>
            <div className="font-bold text-lg">{formatCurrency(Math.round(lumpSum / 24))}</div>
            <div className="text-xs opacity-75">24 months</div>
          </div>
        </div>
        <div className="text-xs opacity-75 mt-2 text-center">
          *EMI rates as per bank terms and conditions
        </div>
      </div>
    </div>
  )
}
