/**
 * Touch Target Utilities for Mobile-First Design
 *
 * iOS Human Interface Guidelines: Minimum 44x44 pt
 * Android Material Design: Minimum 48x48 dp
 *
 * This utility provides consistent touch target sizing across the app
 * for optimal mobile user experience.
 */

export const touchTargets = {
  // Minimum touch targets (iOS standard)
  minimum: 'min-h-[44px] min-w-[44px]',

  // Comfortable touch targets (Android Material)
  comfortable: 'min-h-[48px] min-w-[48px]',

  // Large touch targets (recommended for primary actions)
  large: 'min-h-[56px] min-w-[56px]',

  // Desktop-optimized (smaller on desktop)
  desktop: 'md:min-h-[40px] md:min-w-[40px]',

  // Combined mobile + desktop
  responsive: 'min-h-[44px] min-w-[44px] md:min-h-[40px] md:min-w-[40px]',

  // Primary CTA buttons (extra large for important actions)
  cta: 'min-h-[56px] min-w-[120px] px-6 py-3',

  // Form inputs
  input: 'min-h-[48px] px-4 py-3',

  // Navigation items
  navItem: 'min-h-[48px] px-4 py-2',

  // Icon buttons
  iconButton: 'min-h-[44px] min-w-[44px] p-2',

  // Card interactive areas
  card: 'min-h-[80px] p-4',
} as const

/**
 * Touch spacing utilities
 * Ensures adequate spacing between touch targets (minimum 8px)
 */
export const touchSpacing = {
  // Minimum spacing between touch targets
  minimum: 'gap-2', // 8px

  // Comfortable spacing
  comfortable: 'gap-3', // 12px

  // Large spacing for important actions
  large: 'gap-4', // 16px

  // Responsive spacing (smaller on desktop)
  responsive: 'gap-2 md:gap-1',
} as const

/**
 * Touch feedback utilities
 * Visual and haptic feedback for touch interactions
 */
export const touchFeedback = {
  // Standard press feedback
  press: 'active:scale-95 active:opacity-90 transition-transform duration-100',

  // Ripple effect (CSS-based)
  ripple:
    'relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:scale-0 active:before:scale-100 before:transition-transform before:duration-300',

  // Haptic feedback simulation
  haptic: 'active:scale-98 active:brightness-95 transition-all duration-100',

  // Bounce effect
  bounce: 'active:scale-105 transition-transform duration-200 ease-out',

  // Glow effect on press
  glow: 'active:shadow-lg active:shadow-blue-500/50 transition-shadow duration-200',
} as const

/**
 * Mobile-first button variants with proper touch targets
 */
export const mobileButtonVariants = {
  primary: `${touchTargets.comfortable} bg-blue-600 text-white rounded-lg font-semibold ${touchFeedback.press} hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`,

  secondary: `${touchTargets.comfortable} bg-gray-100 text-gray-800 rounded-lg font-semibold ${touchFeedback.press} hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`,

  cta: `${touchTargets.cta} bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg ${touchFeedback.press} hover:from-green-700 hover:to-emerald-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`,

  icon: `${touchTargets.iconButton} rounded-full flex items-center justify-center ${touchFeedback.press} hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`,

  navItem: `${touchTargets.navItem} flex items-center rounded-lg ${touchFeedback.press} hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500`,

  card: `${touchTargets.card} rounded-xl ${touchFeedback.press} hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`,
} as const

/**
 * Helper function to combine touch target utilities
 */
export function combineTouchTargets(...targets: string[]): string {
  return targets.join(' ')
}

/**
 * Accessibility utilities for touch targets
 */
export const touchAccessibility = {
  // Screen reader labels
  srOnly: 'sr-only',

  // Focus visible states
  focusVisible:
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',

  // High contrast mode support
  highContrast: 'border-2 border-transparent focus:border-blue-500',

  // Combined a11y utilities
  full: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 border-2 border-transparent focus:border-blue-500',
} as const

/**
 * Safe area utilities for notched devices
 */
export const safeArea = {
  top: 'pt-safe-top',
  bottom: 'pb-safe-bottom',
  left: 'pl-safe-left',
  right: 'pr-safe-right',
  all: 'p-safe',

  // iOS-specific safe areas
  iosTop: 'pt-[env(safe-area-inset-top)]',
  iosBottom: 'pb-[env(safe-area-inset-bottom)]',
  iosLeft: 'pl-[env(safe-area-inset-left)]',
  iosRight: 'pr-[env(safe-area-inset-right)]',
} as const

/**
 * Type definitions for TypeScript support
 */
export type TouchTargetSize = keyof typeof touchTargets
export type TouchSpacing = keyof typeof touchSpacing
export type TouchFeedback = keyof typeof touchFeedback
export type ButtonVariant = keyof typeof mobileButtonVariants
