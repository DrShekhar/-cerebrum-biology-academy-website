'use client'

import React, { useState, useEffect } from 'react'
import { CurrencyService, SupportedCurrency, PriceData } from '@/lib/international/currencyService'
import { usePersonalization } from '@/components/providers/PersonalizationProvider'
import { ChevronDown, Globe } from 'lucide-react'

interface CurrencySelectorProps {
  onCurrencyChange?: (currency: SupportedCurrency) => void
  showPriceExample?: boolean
  className?: string
}

export function CurrencySelector({
  onCurrencyChange,
  showPriceExample = true,
  className = '',
}: CurrencySelectorProps) {
  const { preferences, updatePreferences } = usePersonalization()
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>('INR')
  const [isOpen, setIsOpen] = useState(false)
  const [priceExample, setPriceExample] = useState<PriceData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Auto-detect currency based on user location
    if (preferences.location?.country) {
      const countryCurrency = CurrencyService.getCurrencyByCountry(preferences.location.country)
      setSelectedCurrency(countryCurrency)
      onCurrencyChange?.(countryCurrency)
    }
  }, [preferences.location, onCurrencyChange])

  useEffect(() => {
    if (showPriceExample) {
      loadPriceExample()
    }
  }, [selectedCurrency, showPriceExample])

  const loadPriceExample = async () => {
    setIsLoading(true)
    try {
      const priceData = await CurrencyService.getPriceData('class12', selectedCurrency, true)
      setPriceExample(priceData)
    } catch (error) {
      console.error('Failed to load price example:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCurrencySelect = (currency: SupportedCurrency) => {
    setSelectedCurrency(currency)
    setIsOpen(false)
    onCurrencyChange?.(currency)

    // Update user preferences
    updatePreferences({
      preferredCurrency: currency,
    })
  }

  const currencies = CurrencyService.getCurrencySelector()
  const selectedCurrencyInfo = CurrencyService.CURRENCIES[selectedCurrency]

  return (
    <div className={`relative ${className}`}>
      {/* Currency Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Globe className="h-4 w-4 text-gray-500" />
        <span className="font-medium text-gray-900">
          {selectedCurrencyInfo.symbol} {selectedCurrencyInfo.code}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[200px] max-w-[256px] bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="p-2">
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide px-2 py-1 mb-1">
              Select Currency
            </div>
            <div className="max-h-60 overflow-y-auto">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencySelect(currency.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md hover:bg-gray-100 transition-colors ${
                    currency.code === selectedCurrency
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{currency.symbol}</span>
                    <div>
                      <div className="font-medium">{currency.code}</div>
                      <div className="text-xs text-gray-500">{currency.name}</div>
                    </div>
                  </div>
                  {currency.code === selectedCurrency && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Price Example */}
      {showPriceExample && priceExample && (
        <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-blue-900">Class 12th Course</div>
            {priceExample.savings && (
              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                Save {priceExample.savings.percentage}%
              </div>
            )}
          </div>

          <div className="flex items-baseline space-x-2">
            {isLoading ? (
              <div className="animate-pulse bg-gray-200 h-6 w-24 rounded"></div>
            ) : (
              <>
                <span className="text-2xl font-bold text-blue-900">
                  {priceExample.formattedPrice}
                </span>
                {priceExample.savings && (
                  <span className="text-sm text-gray-500 line-through">
                    {CurrencyService.formatPrice(
                      priceExample.localizedPrice + priceExample.savings.amount,
                      selectedCurrency
                    )}
                  </span>
                )}
              </>
            )}
          </div>

          <div className="mt-2 text-xs text-blue-700">
            {CurrencyService.getRegionalPricingMessage(selectedCurrency)}
          </div>

          <div className="mt-2 flex flex-wrap gap-1">
            {CurrencyService.getPaymentMethods(selectedCurrency)
              .slice(0, 3)
              .map((method) => (
                <span key={method} className="text-xs bg-white text-gray-600 px-2 py-1 rounded">
                  {method}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}

interface PricingCardProps {
  courseType: keyof typeof CurrencyService.BASE_PRICES
  title: string
  description: string
  features: string[]
  currency?: SupportedCurrency
  isPopular?: boolean
  onEnroll?: () => void
}

export function InternationalPricingCard({
  courseType,
  title,
  description,
  features,
  currency = 'INR',
  isPopular = false,
  onEnroll,
}: PricingCardProps) {
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPriceData()
  }, [courseType, currency])

  const loadPriceData = async () => {
    setIsLoading(true)
    try {
      const data = await CurrencyService.getPriceData(courseType, currency, true)
      setPriceData(data)
    } catch (error) {
      console.error('Failed to load price data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`relative bg-white rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg ${
        isPopular ? 'border-blue-500 transform scale-105' : 'border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        {/* Pricing */}
        <div className="mb-6">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          ) : priceData ? (
            <div>
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-3xl font-bold text-gray-900">{priceData.formattedPrice}</span>
                {priceData.savings && (
                  <span className="text-lg text-gray-500 line-through">
                    {CurrencyService.formatPrice(
                      priceData.localizedPrice + priceData.savings.amount,
                      currency
                    )}
                  </span>
                )}
              </div>
              {priceData.savings && (
                <div className="text-green-600 text-sm font-semibold">
                  Save {priceData.savings.formatted} ({priceData.savings.percentage}% off)
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500">Price unavailable</div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <svg
                className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Payment Methods */}
        <div className="mb-6">
          <div className="text-xs text-gray-500 mb-2">Payment Methods:</div>
          <div className="flex flex-wrap gap-1">
            {CurrencyService.getPaymentMethods(currency)
              .slice(0, 4)
              .map((method) => (
                <span key={method} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {method}
                </span>
              ))}
          </div>
        </div>

        {/* Enroll Button */}
        <button
          onClick={onEnroll}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
            isPopular
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          Enroll Now
        </button>

        {/* Regional Message */}
        <div className="mt-3 text-xs text-gray-500 text-center">
          {CurrencyService.getRegionalPricingMessage(currency)}
        </div>
      </div>
    </div>
  )
}
