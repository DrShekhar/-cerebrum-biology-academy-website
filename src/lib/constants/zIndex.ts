/**
 * Z-Index Constants for Cerebrum Biology Academy Website
 *
 * This file defines a standardized z-index system to prevent stacking context conflicts.
 * Use these constants instead of hardcoded z-index values in components.
 *
 * Hierarchy (lowest to highest):
 * - Base content: 0-10
 * - Sticky elements: 20-30
 * - Dropdowns: 40-50
 * - Fixed bottom nav: 50-60
 * - Floating CTAs: 70
 * - Modal backdrops: 100-999
 * - Modals: 1000-9999
 * - Toast notifications: 10000+
 */

export const Z_INDEX = {
  // Base layers
  base: 0,
  content: 1,
  aboveContent: 10,

  // Sticky/Fixed navigation
  sticky: 20,
  stickyHeader: 30,

  // Dropdowns and tooltips
  dropdown: 40,
  tooltip: 45,

  // Fixed bottom navigation (mobile)
  bottomNav: 50,
  mobileNav: 60,

  // Floating action buttons
  floatingCTA: 70,
  floatingButton: 75,

  // Modal system - use these ranges
  modalBackdrop: 1000,
  modal: 1100,

  // Specific modal layers (for complex overlapping modals)
  searchModal: 10000,
  burgerMenuBackdrop: 10200,
  burgerMenu: 10300,

  // Exit intent popup (highest priority)
  exitPopup: 9999,

  // Toast notifications (always on top)
  toast: 20000,
} as const

// Type for z-index values
export type ZIndexKey = keyof typeof Z_INDEX

// Helper function to get z-index class string
export function getZIndexClass(key: ZIndexKey): string {
  return `z-[${Z_INDEX[key]}]`
}

// Tailwind classes for common z-index values
export const Z_INDEX_CLASSES = {
  base: 'z-0',
  content: 'z-[1]',
  aboveContent: 'z-10',
  sticky: 'z-20',
  stickyHeader: 'z-30',
  dropdown: 'z-40',
  tooltip: 'z-[45]',
  bottomNav: 'z-50',
  mobileNav: 'z-[60]',
  floatingCTA: 'z-[70]',
  floatingButton: 'z-[75]',
  modalBackdrop: 'z-[1000]',
  modal: 'z-[1100]',
  searchModal: 'z-[10000]',
  burgerMenuBackdrop: 'z-[10200]',
  burgerMenu: 'z-[10300]',
  exitPopup: 'z-[9999]',
  toast: 'z-[20000]',
} as const
