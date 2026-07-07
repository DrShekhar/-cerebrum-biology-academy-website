/**
 * Canonical phone normalisation for CRM dedup.
 *
 * Indian numbers (with/without +91/91/0) collapse to bare 10 digits so they
 * match existing CRM rows; other countries keep their full digit string.
 */
export function normalizePhone(raw: string): string {
  const allDigits = raw.replace(/\D/g, '')
  const isIndian = /^(91)?[6-9]\d{9}$/.test(allDigits) || /^0[6-9]\d{9}$/.test(allDigits)
  return isIndian ? allDigits.slice(-10) : allDigits
}
