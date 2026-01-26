'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown, Globe, X, Check, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  getAllCountries,
  getCountriesByRegion,
  type CountryConfig,
} from '@/lib/international/countries'

interface CountrySelectorProps {
  /** Display variant */
  variant?: 'dropdown' | 'modal' | 'inline'
  /** Current country code (if on a country page) */
  currentCountry?: string
  /** Additional CSS classes */
  className?: string
  /** Trigger element text for dropdown variant */
  triggerText?: string
  /** Show search input */
  showSearch?: boolean
  /** Callback when country is selected */
  onSelect?: (country: CountryConfig) => void
}

// Local storage key for country preference
const COUNTRY_PREFERENCE_KEY = 'cerebrum_country_preference'

function getStoredCountry(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(COUNTRY_PREFERENCE_KEY)
}

function storeCountryPreference(code: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(COUNTRY_PREFERENCE_KEY, code)
}

export function CountrySelector({
  variant = 'dropdown',
  currentCountry,
  className,
  triggerText = 'Select Country',
  showSearch = false,
  onSelect,
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(currentCountry || null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const countries = getAllCountries()
  const countriesByRegion = getCountriesByRegion()

  // Load stored preference on mount
  useEffect(() => {
    if (!currentCountry) {
      const stored = getStoredCountry()
      if (stored) {
        setSelectedCountry(stored)
      }
    }
  }, [currentCountry])

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen, showSearch])

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  // Filter countries by search query
  const filteredCountries = searchQuery
    ? countries.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.examSystems.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : countries

  // Get currently selected country config
  const selectedConfig = countries.find((c) => c.code === selectedCountry)

  const handleCountryClick = (country: CountryConfig) => {
    setSelectedCountry(country.code)
    storeCountryPreference(country.code)
    setIsOpen(false)
    onSelect?.(country)
  }

  // Dropdown Variant
  if (variant === 'dropdown') {
    return (
      <div ref={dropdownRef} className={cn('relative', className)}>
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-slate-100 transition-colors"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {selectedConfig ? (
            <>
              <span className="text-lg">{selectedConfig.flag}</span>
              <span className="hidden sm:inline text-slate-700">{selectedConfig.name}</span>
              <span className="sm:hidden text-slate-700">{selectedConfig.code.toUpperCase()}</span>
            </>
          ) : (
            <>
              <Globe className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700">{triggerText}</span>
            </>
          )}
          <ChevronDown
            className={cn('w-4 h-4 text-slate-400 transition-transform', isOpen && 'rotate-180')}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden"
            role="listbox"
          >
            {/* Search Input */}
            {showSearch && (
              <div className="p-2 border-b border-slate-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search countries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            )}

            {/* Country List */}
            <div className="max-h-72 overflow-y-auto py-1">
              {filteredCountries.map((country) => (
                <Link
                  key={country.code}
                  href={`/international/${country.code}/`}
                  onClick={() => handleCountryClick(country)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors',
                    selectedCountry === country.code && 'bg-green-50'
                  )}
                  role="option"
                  aria-selected={selectedCountry === country.code}
                >
                  <span className="text-xl">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900">{country.name}</p>
                    <p className="text-xs text-slate-500 truncate">
                      {country.examSystems.slice(0, 2).join(', ')}
                    </p>
                  </div>
                  {selectedCountry === country.code && (
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  )}
                </Link>
              ))}
            </div>

            {/* View All Link */}
            <div className="p-2 border-t border-slate-100 bg-slate-50">
              <Link
                href="/international/"
                onClick={() => setIsOpen(false)}
                className="block text-center text-sm text-green-600 hover:text-green-700 font-medium py-1"
              >
                View All Countries
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Modal Variant
  if (variant === 'modal') {
    return (
      <>
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors',
            className
          )}
        >
          {selectedConfig ? (
            <>
              <span className="text-lg">{selectedConfig.flag}</span>
              <span>{selectedConfig.name}</span>
            </>
          ) : (
            <>
              <Globe className="w-4 h-4" />
              <span>{triggerText}</span>
            </>
          )}
          <ChevronDown className="w-4 h-4 ml-1" />
        </button>

        {/* Modal Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div
              ref={dropdownRef}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="country-modal-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h2 id="country-modal-title" className="text-lg font-semibold text-slate-900">
                  Select Your Country
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-slate-100">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search by country name or exam system..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 text-base border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Country Grid by Region */}
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {searchQuery ? (
                  // Filtered results
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {filteredCountries.map((country) => (
                      <Link
                        key={country.code}
                        href={`/international/${country.code}/`}
                        onClick={() => handleCountryClick(country)}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-xl border transition-all hover:shadow-md',
                          selectedCountry === country.code
                            ? 'border-green-500 bg-green-50'
                            : 'border-slate-200 hover:border-slate-300'
                        )}
                      >
                        <span className="text-2xl">{country.flag}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 truncate">{country.name}</p>
                          <p className="text-xs text-slate-500">{country.currency.code}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  // Grouped by region
                  <div className="space-y-6">
                    {Object.entries(countriesByRegion).map(([region, regionCountries]) => (
                      <div key={region}>
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                          {region}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {regionCountries.map((country) => (
                            <Link
                              key={country.code}
                              href={`/international/${country.code}/`}
                              onClick={() => handleCountryClick(country)}
                              className={cn(
                                'flex items-center gap-3 p-3 rounded-xl border transition-all hover:shadow-md',
                                selectedCountry === country.code
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-slate-200 hover:border-slate-300'
                              )}
                            >
                              <span className="text-2xl">{country.flag}</span>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-900 truncate">
                                  {country.name}
                                </p>
                                <p className="text-xs text-slate-500">{country.currency.code}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // Inline Variant (for footer or static display)
  return (
    <div className={cn('space-y-4', className)}>
      {Object.entries(countriesByRegion).map(([region, regionCountries]) => (
        <div key={region}>
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
            {region}
          </h4>
          <div className="flex flex-wrap gap-2">
            {regionCountries.map((country) => (
              <Link
                key={country.code}
                href={`/international/${country.code}/`}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border transition-colors',
                  selectedCountry === country.code
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900'
                )}
              >
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CountrySelector
