/**
 * Phone number normalization utilities
 * Provides consistent phone number handling across the application
 */

/**
 * Normalize phone number to last 10 digits (Indian format)
 * Strips all non-numeric characters and takes last 10 digits
 *
 * @example
 * normalizePhone('+91 88264 44334') // '8826444334'
 * normalizePhone('91-8826444334')   // '8826444334'
 * normalizePhone('8826444334')      // '8826444334'
 */
export function normalizePhone(phone: string): string {
  if (!phone) return ''
  return phone.replace(/\D/g, '').slice(-10)
}

/**
 * Normalize phone number with country code (default +91 for India)
 *
 * @example
 * normalizePhoneWithCountryCode('+91 88264 44334') // '+918826444334'
 * normalizePhoneWithCountryCode('8826444334')      // '+918826444334'
 * normalizePhoneWithCountryCode('+1 5551234567')   // '+15551234567'
 */
export function normalizePhoneWithCountryCode(phone: string, defaultCountryCode = '+91'): string {
  if (!phone) return ''

  // If phone already starts with +, keep it and just clean the digits
  if (phone.trim().startsWith('+')) {
    const digits = phone.replace(/\D/g, '')
    return `+${digits}`
  }

  // Otherwise, normalize to 10 digits and add default country code
  const normalized = normalizePhone(phone)
  return `${defaultCountryCode}${normalized}`
}

/**
 * Validate phone number - must have at least 10 actual digits
 *
 * @example
 * validatePhone('+91 88264 44334') // true
 * validatePhone('12345')           // false
 */
export function validatePhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '')
  return digitsOnly.length >= 10 && digitsOnly.length <= 15
}

/**
 * Check if phone number appears to be Indian
 * Indian mobile numbers start with 6, 7, 8, or 9
 *
 * @example
 * isIndianMobile('9876543210') // true
 * isIndianMobile('1234567890') // false
 */
export function isIndianMobile(phone: string): boolean {
  const normalized = normalizePhone(phone)
  return normalized.length === 10 && /^[6-9]/.test(normalized)
}

/**
 * Format phone for display (Indian format)
 *
 * @example
 * formatPhoneDisplay('8826444334') // '+91 88264 44334'
 */
export function formatPhoneDisplay(phone: string): string {
  const normalized = normalizePhone(phone)
  if (normalized.length !== 10) return phone

  // Format as +91 XXXXX XXXXX
  return `+91 ${normalized.slice(0, 5)} ${normalized.slice(5)}`
}

export default {
  normalizePhone,
  normalizePhoneWithCountryCode,
  validatePhone,
  isIndianMobile,
  formatPhoneDisplay,
}
