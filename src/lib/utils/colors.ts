/**
 * Color System Utility - Cerebrum Biology Academy
 *
 * TAILWIND-FIRST APPROACH:
 * - Always use Tailwind utility classes for colors when possible
 * - Only use CSS variables for custom brand colors or dynamic theming
 * - This file documents the mapping between CSS vars and Tailwind classes
 *
 * Example Usage:
 * - ✅ Good: className="bg-slate-900 text-white"
 * - ✅ Good: className="bg-teal-600 hover:bg-teal-700"
 * - ❌ Avoid: style={{ background: 'var(--cerebrum-navy-900)' }}
 * - ❌ Avoid: Custom CSS with color vars unless absolutely necessary
 */

/**
 * CSS Variable to Tailwind Class Mapping
 *
 * Use this reference when you need to know which Tailwind class
 * corresponds to which custom CSS variable.
 */

export const colorMapping = {
  // Navy (Primary) - Maps to Tailwind slate
  navy: {
    950: 'slate-950', // var(--cerebrum-navy-950) → bg-slate-950
    900: 'slate-900', // var(--cerebrum-navy-900) → bg-slate-900
    800: 'slate-800', // var(--cerebrum-navy-800) → bg-slate-800
    700: 'slate-700', // var(--cerebrum-navy-700) → bg-slate-700
    600: 'slate-600', // var(--cerebrum-navy-600) → bg-slate-600
    500: 'slate-500', // var(--cerebrum-navy-500) → bg-slate-500
    400: 'slate-400', // var(--cerebrum-navy-400) → bg-slate-400
    300: 'slate-300', // var(--cerebrum-navy-300) → bg-slate-300
    200: 'slate-200', // var(--cerebrum-navy-200) → bg-slate-200
    100: 'slate-100', // var(--cerebrum-navy-100) → bg-slate-100
    50: 'slate-50', // var(--cerebrum-navy-50) → bg-slate-50
  },

  // Teal (Accent) - Maps to Tailwind teal
  teal: {
    900: 'teal-900', // var(--cerebrum-teal-900) → bg-teal-900
    800: 'teal-800', // var(--cerebrum-teal-800) → bg-teal-800
    700: 'teal-700', // var(--cerebrum-teal-700) → bg-teal-700
    600: 'teal-600', // var(--cerebrum-teal-600) → bg-teal-600
    500: 'teal-500', // var(--cerebrum-teal-500) → bg-teal-500
    400: 'teal-400', // var(--cerebrum-teal-400) → bg-teal-400
    300: 'teal-300', // var(--cerebrum-teal-300) → bg-teal-300
    200: 'teal-200', // var(--cerebrum-teal-200) → bg-teal-200
    100: 'teal-100', // var(--cerebrum-teal-100) → bg-teal-100
    50: 'teal-50', // var(--cerebrum-teal-50) → bg-teal-50
  },

  // Gold (Achievement) - Maps to Tailwind amber
  gold: {
    900: 'amber-900', // var(--cerebrum-gold-900) → bg-amber-900
    800: 'amber-800', // var(--cerebrum-gold-800) → bg-amber-800
    700: 'amber-700', // var(--cerebrum-gold-700) → bg-amber-700
    600: 'amber-600', // var(--cerebrum-gold-600) → bg-amber-600
    500: 'amber-500', // var(--cerebrum-gold-500) → bg-amber-500
    400: 'amber-400', // var(--cerebrum-gold-400) → bg-amber-400
    300: 'amber-300', // var(--cerebrum-gold-300) → bg-amber-300
    200: 'amber-200', // var(--cerebrum-gold-200) → bg-amber-200
    100: 'amber-100', // var(--cerebrum-gold-100) → bg-amber-100
    50: 'amber-50', // var(--cerebrum-gold-50) → bg-amber-50
  },

  // Blue (Trust) - Maps to Tailwind blue
  blue: {
    900: 'blue-900', // var(--cerebrum-blue-900) → bg-blue-900
    800: 'blue-800', // var(--cerebrum-blue-800) → bg-blue-800
    700: 'blue-700', // var(--cerebrum-blue-700) → bg-blue-700
    600: 'blue-600', // var(--cerebrum-blue-600) → bg-blue-600
    500: 'blue-500', // var(--cerebrum-blue-500) → bg-blue-500
    400: 'blue-400', // var(--cerebrum-blue-400) → bg-blue-400
    300: 'blue-300', // var(--cerebrum-blue-300) → bg-blue-300
    200: 'blue-200', // var(--cerebrum-blue-200) → bg-blue-200
    100: 'blue-100', // var(--cerebrum-blue-100) → bg-blue-100
    50: 'blue-50', // var(--cerebrum-blue-50) → bg-blue-50
  },
} as const

/**
 * Common Color Combinations (Tailwind-First)
 *
 * Use these pre-defined combinations for consistency.
 * All examples use Tailwind utility classes.
 */

export const colorCombinations = {
  // Primary buttons
  primaryButton: 'bg-teal-600 hover:bg-teal-700 text-white',

  // Secondary buttons
  secondaryButton: 'bg-slate-200 hover:bg-slate-300 text-slate-900',

  // Success states
  success: 'bg-teal-50 border-teal-200 text-teal-900',

  // Warning states
  warning: 'bg-amber-50 border-amber-200 text-amber-900',

  // Error states
  error: 'bg-red-50 border-red-200 text-red-900',

  // Info states
  info: 'bg-blue-50 border-blue-200 text-blue-900',

  // Cards
  card: 'bg-white border-slate-200 shadow-sm hover:shadow-md',

  // Headers
  header: 'bg-slate-900 text-white',

  // Footer
  footer: 'bg-slate-950 text-slate-300',
} as const

/**
 * Utility function to get Tailwind class from color name
 *
 * @param category - Color category (navy, teal, gold, blue)
 * @param shade - Color shade (50-950)
 * @param prefix - Class prefix (bg, text, border, etc.)
 * @returns Tailwind utility class string
 *
 * @example
 * getTailwindClass('teal', 600, 'bg') // Returns: 'bg-teal-600'
 * getTailwindClass('navy', 900, 'text') // Returns: 'text-slate-900'
 */
export function getTailwindClass(
  category: keyof typeof colorMapping,
  shade: keyof (typeof colorMapping)['navy'],
  prefix: 'bg' | 'text' | 'border' | 'ring' = 'bg'
): string {
  const tailwindColor = colorMapping[category][shade]
  return `${prefix}-${tailwindColor}`
}

/**
 * WHEN TO USE CSS VARIABLES:
 *
 * 1. Dynamic theming (future dark mode)
 * 2. Programmatic color manipulation
 * 3. Third-party library integration that doesn't support Tailwind
 *
 * For all other cases, prefer Tailwind utility classes.
 */

/**
 * CSS Variable Reference (for rare dynamic cases)
 */
export const cssVars = {
  // Only use these when Tailwind classes won't work
  navy900: 'var(--cerebrum-navy-900)',
  teal600: 'var(--cerebrum-teal-600)',
  gold500: 'var(--cerebrum-gold-500)',
  blue600: 'var(--cerebrum-blue-600)',
} as const
