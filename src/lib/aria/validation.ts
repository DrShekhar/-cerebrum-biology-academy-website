/**
 * ARIA Sales Agent - Lead Capture Validation
 * Centralized validation logic for lead capture fields
 */

export interface ValidationResult {
  isValid: boolean
  sanitizedValue: string
  errorKey?: string
}

/**
 * Valid classes for NEET preparation
 * - 9, 10: Early preparation
 * - 11, 12: Main NEET preparation years
 * - Dropper: Gap year students
 */
export const VALID_CLASSES = ['9', '10', '11', '12', 'dropper'] as const
export type ValidClass = (typeof VALID_CLASSES)[number]

/**
 * Class aliases that map to standard values
 */
const CLASS_ALIASES: Record<string, ValidClass> = {
  // Standard formats
  '9': '9',
  '10': '10',
  '11': '11',
  '12': '12',
  'dropper': 'dropper',
  // With ordinal suffixes
  '9th': '9',
  '10th': '10',
  '11th': '11',
  '12th': '12',
  // Hindi variants
  '९': '9',
  '१०': '10',
  '११': '11',
  '१२': '12',
  'ड्रॉपर': 'dropper',
  // Common variations
  'ix': '9',
  'x': '10',
  'xi': '11',
  'xii': '12',
  'class 9': '9',
  'class 10': '10',
  'class 11': '11',
  'class 12': '12',
  'class ix': '9',
  'class x': '10',
  'class xi': '11',
  'class xii': '12',
  'ninth': '9',
  'tenth': '10',
  'eleventh': '11',
  'twelfth': '12',
  'drop': 'dropper',
  'gap year': 'dropper',
  'repeater': 'dropper',
}

/**
 * Validates and sanitizes phone number
 * Indian mobile numbers: 10 digits starting with 6-9
 */
export function validatePhone(value: string): ValidationResult {
  const cleaned = value.replace(/\D/g, '')

  // Indian mobile: 10 digits, starts with 6-9
  const phoneRegex = /^[6-9]\d{9}$/
  if (!phoneRegex.test(cleaned)) {
    return {
      isValid: false,
      sanitizedValue: cleaned,
      errorKey: 'invalidPhone',
    }
  }

  return {
    isValid: true,
    sanitizedValue: cleaned,
  }
}

/**
 * Validates and sanitizes name
 * - Must be 2-50 characters
 * - Must contain at least one letter
 * - Allows letters (including Unicode), spaces, hyphens, apostrophes
 */
export function validateName(value: string): ValidationResult {
  const trimmed = value.trim()

  // Check length
  if (trimmed.length < 2 || trimmed.length > 50) {
    return {
      isValid: false,
      sanitizedValue: trimmed,
      errorKey: 'invalidName',
    }
  }

  // Must contain at least one letter (any language)
  // \p{L} matches any Unicode letter
  const hasLetter = /\p{L}/u.test(trimmed)
  if (!hasLetter) {
    return {
      isValid: false,
      sanitizedValue: trimmed,
      errorKey: 'invalidName',
    }
  }

  // Only allow letters (any script), spaces, hyphens, apostrophes, and periods
  // This covers names like "Dr. Ram Kumar", "O'Brien", "Mary-Jane", "राहुल कुमार"
  // Using Unicode property escapes with 'u' flag for international name support
  const validNamePattern = /^[\p{Letter}\p{Mark}\s\-'.]+$/u
  if (!validNamePattern.test(trimmed)) {
    return {
      isValid: false,
      sanitizedValue: trimmed,
      errorKey: 'invalidName',
    }
  }

  return {
    isValid: true,
    sanitizedValue: trimmed,
  }
}

/**
 * Validates and normalizes class/grade
 * Accepts various formats and normalizes to standard form
 */
export function validateClass(value: string): ValidationResult {
  const normalized = value.trim().toLowerCase()

  // Check against aliases
  const standardClass = CLASS_ALIASES[normalized]
  if (standardClass) {
    return {
      isValid: true,
      sanitizedValue: standardClass === 'dropper' ? 'Dropper' : `Class ${standardClass}`,
    }
  }

  // Check if it's just a number that matches valid classes
  const numericValue = normalized.replace(/\D/g, '')
  if (numericValue && VALID_CLASSES.includes(numericValue as ValidClass)) {
    return {
      isValid: true,
      sanitizedValue: `Class ${numericValue}`,
    }
  }

  return {
    isValid: false,
    sanitizedValue: value.trim(),
    errorKey: 'invalidClass',
  }
}

/**
 * Validates a lead field based on type
 */
export function validateLeadField(
  field: 'name' | 'phone' | 'class',
  value: string
): ValidationResult {
  switch (field) {
    case 'phone':
      return validatePhone(value)
    case 'name':
      return validateName(value)
    case 'class':
      return validateClass(value)
    default:
      return { isValid: true, sanitizedValue: value.trim() }
  }
}
