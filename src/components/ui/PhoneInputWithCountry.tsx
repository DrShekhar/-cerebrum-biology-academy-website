'use client'

import { useMemo, useState } from 'react'
import {
  COUNTRY_DIAL_CODES,
  countryFlagEmoji,
  matchDialCode,
} from '@/lib/constants/countryDialCodes'

interface PhoneInputWithCountryProps {
  /** Full number including dial code, e.g. "+919876543210". Empty when unset. */
  value: string
  /** Called with the full number ("+" + dial code + national digits), or '' when cleared. */
  onChange: (fullNumber: string) => void
  id?: string
  defaultIso2?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  /** Classes applied to the national-number <input>. Defaults match site form fields. */
  inputClassName?: string
  /** aria-label for the country select. */
  selectLabel?: string
}

const DEFAULT_INPUT_CLASSES =
  'w-full rounded-r-xl border border-l-0 border-gray-300 px-4 py-3 text-sm focus:border-[#3d4d3d] focus:outline-none focus:ring-2 focus:ring-[#3d4d3d]/20 sm:text-base'

/**
 * Phone field with a flag + dial-code country picker in front of the
 * national-number input. Uses a native <select> (transparent, stacked over
 * the visible flag chip) so mobile users get their platform picker.
 * Emits a single combined value: dial code + national digits.
 */
export function PhoneInputWithCountry({
  value,
  onChange,
  id,
  defaultIso2 = 'IN',
  placeholder,
  required,
  disabled,
  inputClassName,
  selectLabel = 'Country code',
}: PhoneInputWithCountryProps) {
  // Derive initial state from an incoming full value (edit flows); fall back
  // to the default country for empty values (new-lead flows).
  const initial = useMemo(() => {
    const matched = value ? matchDialCode(value) : undefined
    if (matched) return { iso2: matched.iso2, national: value.slice(matched.dialCode.length) }
    const fallback = COUNTRY_DIAL_CODES.find((c) => c.iso2 === defaultIso2) ?? COUNTRY_DIAL_CODES[0]
    return { iso2: fallback.iso2, national: value.replace(/\D/g, '') }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- initial parse only

  const [iso2, setIso2] = useState(initial.iso2)
  const [national, setNational] = useState(initial.national)

  const country = COUNTRY_DIAL_CODES.find((c) => c.iso2 === iso2) ?? COUNTRY_DIAL_CODES[0]

  const emit = (nextIso2: string, nextNational: string) => {
    const c = COUNTRY_DIAL_CODES.find((x) => x.iso2 === nextIso2) ?? COUNTRY_DIAL_CODES[0]
    onChange(nextNational ? `${c.dialCode}${nextNational}` : '')
  }

  const handleNationalChange = (raw: string) => {
    let digits = raw.replace(/\D/g, '')
    // Common paste cases for India: leading 0 or 91 prefix before the 10 digits.
    if (country.dialCode === '+91') {
      if (digits.startsWith('0')) digits = digits.slice(1)
      if (digits.length > 10 && digits.startsWith('91')) digits = digits.slice(2)
      digits = digits.slice(0, 10)
    } else {
      digits = digits.slice(0, 14)
    }
    setNational(digits)
    emit(iso2, digits)
  }

  return (
    <div className="flex w-full">
      <div className="relative flex flex-shrink-0 items-center gap-1.5 rounded-l-xl border border-gray-300 bg-gray-50 px-3 py-3">
        <span aria-hidden="true" className="text-base leading-none">
          {countryFlagEmoji(country.iso2)}
        </span>
        <span className="text-sm font-medium text-gray-700 sm:text-base">{country.dialCode}</span>
        <svg
          aria-hidden="true"
          className="h-3 w-3 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <select
          aria-label={selectLabel}
          value={iso2}
          disabled={disabled}
          onChange={(e) => {
            const nextIso2 = e.target.value
            setIso2(nextIso2)
            emit(nextIso2, national)
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        >
          {COUNTRY_DIAL_CODES.map((c) => (
            <option key={c.iso2} value={c.iso2}>
              {countryFlagEmoji(c.iso2)} {c.name} ({c.dialCode})
            </option>
          ))}
        </select>
      </div>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        required={required}
        disabled={disabled}
        value={national}
        onChange={(e) => handleNationalChange(e.target.value)}
        placeholder={placeholder ?? (country.dialCode === '+91' ? '98XXXXXXXX' : 'Phone number')}
        className={inputClassName ?? DEFAULT_INPUT_CLASSES}
      />
    </div>
  )
}
