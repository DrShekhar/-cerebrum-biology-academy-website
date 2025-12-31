'use client'

import { PaymentOptions } from '@/types/courseSystem'

interface PaymentOptionsDisplayProps {
  paymentOptions: PaymentOptions
  tier: 'pinnacle' | 'ascent' | 'pursuit'
}

export function PaymentOptionsDisplay({ paymentOptions, tier }: PaymentOptionsDisplayProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'pinnacle': return 'from-purple-600 to-indigo-600'
      case 'ascent': return 'bg-blue-600'
      case 'pursuit': return 'bg-green-600'
      default: return 'from-indigo-500 to-indigo-600'
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

  return (
    <div className="space-y-4">
      {/* One-time Payment Option */}
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          SAVE 5%
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-green-900">One-Time Payment</h4>
            <p className="text-green-700 text-sm">Pay once and save money</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-green-600 line-through">
              {formatCurrency(paymentOptions.oneTime.amount)}
            </div>
            <div className="text-2xl font-bold text-green-900">
              {formatCurrency(paymentOptions.oneTime.discountedAmount)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-green-700">
          <span>You save: {formatCurrency(paymentOptions.oneTime.discount)}</span>
          <span className="font-medium">✨ Best Value</span>
        </div>
      </div>

      {/* Installment Payment Option */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-gray-900">3-Installment Plan</h4>
            <p className="text-gray-600 text-sm">Spread payments over time</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(paymentOptions.installment.totalAmount)}
            </div>
            <div className="text-sm text-gray-500">Total Amount</div>
          </div>
        </div>

        <div className="space-y-3">
          {paymentOptions.installment.installments.map((installment, index) => (
            <div key={index} className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900">{installment.description}</div>
                <div className="text-sm text-gray-600">{installment.dueDate}</div>
              </div>
              <div className="font-bold text-gray-900">
                {formatCurrency(installment.amount)}
              </div>
            </div>
          ))}
        </div>

        {paymentOptions.installment.processingFee && (
          <div className="mt-3 text-sm text-gray-500">
            *Processing fee of {formatCurrency(paymentOptions.installment.processingFee)} applies
          </div>
        )}
      </div>

      {/* EMI Calculator */}
      <div className={`bg-gradient-to-r ${getTierColor(tier)} rounded-2xl p-6 text-white`}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-bold">EMI Options Available</h4>
          <span className="text-2xl">💳</span>
        </div>
        <p className="text-sm opacity-90 mb-4">
          Convert to easy EMIs through your credit card or personal loan
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-bold text-lg">
              {formatCurrency(Math.round(paymentOptions.oneTime.discountedAmount / 6))}
            </div>
            <div className="text-xs opacity-75">6 months</div>
          </div>
          <div>
            <div className="font-bold text-lg">
              {formatCurrency(Math.round(paymentOptions.oneTime.discountedAmount / 12))}
            </div>
            <div className="text-xs opacity-75">12 months</div>
          </div>
          <div>
            <div className="font-bold text-lg">
              {formatCurrency(Math.round(paymentOptions.oneTime.discountedAmount / 24))}
            </div>
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