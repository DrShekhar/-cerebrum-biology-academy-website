'use client'

import { useState } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import { useCurrency, type SupportedCurrency } from '@/hooks/useCurrency'
import { cn } from '@/lib/utils'

interface CurrencySelectorProps {
  variant?: 'default' | 'compact' | 'dropdown'
  className?: string
  showLabel?: boolean
}

export function CurrencySelector({
  variant = 'default',
  className,
  showLabel = true,
}: CurrencySelectorProps) {
  const { currency, currencyInfo, setCurrency, currencies, isLoading } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)

  if (isLoading) {
    return <div className={cn('animate-pulse bg-gray-200 rounded h-8 w-20', className)} />
  }

  if (variant === 'compact') {
    return (
      <div className={cn('relative inline-block', className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-2 py-1 text-sm border rounded-md hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium">{currencyInfo.symbol}</span>
          <span>{currency}</span>
          <ChevronDown className="w-3 h-3" />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 mt-1 py-1 w-40 bg-white border rounded-lg shadow-lg z-50">
              {currencies.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrency(c.code)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between',
                    currency === c.code && 'bg-green-50 text-green-700'
                  )}
                >
                  <span>
                    {c.symbol} {c.code}
                  </span>
                  {currency === c.code && <span className="text-green-600">✓</span>}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        {showLabel && (
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
        )}
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a5d4a] focus:border-transparent"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.symbol} {c.code} - {c.name}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className={cn('relative inline-block', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="font-medium">{currencyInfo.symbol}</span>
        <span className="text-gray-600">{currency}</span>
        <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 py-2 w-56 bg-white border rounded-xl shadow-xl z-50">
            <div className="px-3 py-2 border-b">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Select Currency</p>
            </div>
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCurrency(c.code)
                  setIsOpen(false)
                }}
                className={cn(
                  'w-full px-3 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors',
                  currency === c.code && 'bg-[#e8ede8]'
                )}
              >
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm font-medium">
                  {c.symbol}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{c.code}</p>
                  <p className="text-xs text-gray-500">{c.name}</p>
                </div>
                {currency === c.code && <span className="text-[#4a5d4a] font-bold">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
