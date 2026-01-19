/**
 * Safely parses read time from unknown input.
 * Handles numbers, strings, NaN, null, and undefined.
 * Returns 0 for invalid inputs to prevent NaN display.
 */
export const parseReadTime = (value: unknown): number => {
  if (typeof value === 'number' && !isNaN(value)) return value
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10)
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}
