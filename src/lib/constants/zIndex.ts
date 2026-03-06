/**
 * Z-Index Constants for Cerebrum Biology Academy Website
 *
 * Standardized z-index hierarchy. All values fit within 0-150 range.
 * Use these constants instead of hardcoded z-index values in components.
 *
 * Hierarchy (lowest to highest):
 * - Base content: 0-10
 * - Sticky elements: 50-60
 * - Floating CTAs: 70-80
 * - Sticky mobile bar: 90
 * - Header: 100
 * - Burger menu: 110-111
 * - Search modal: 115
 * - Modal system: 120-121
 * - Exit intent popup: 125
 * - WhatsApp lead gate: 130
 * - Toast notifications: 140
 */

export const Z_INDEX = {
  // Base layers
  base: 0,
  content: 1,
  aboveContent: 10,

  // Sticky/Fixed navigation
  sticky: 50,
  stickyHeader: 100,

  // Floating action buttons
  floatingCTA: 70,
  floatingButton: 75,

  // Fixed bottom navigation (mobile)
  bottomNav: 80,
  mobileCallBar: 90,

  // Header
  header: 100,

  // Burger menu
  burgerMenuBackdrop: 110,
  burgerMenu: 111,

  // Search overlay
  searchModal: 115,

  // Modal system
  modalBackdrop: 120,
  modal: 121,

  // Exit intent popup
  exitPopup: 125,

  // WhatsApp lead gate
  whatsAppGate: 130,

  // Toast notifications (always on top)
  toast: 140,
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
  sticky: 'z-50',
  stickyHeader: 'z-[100]',
  floatingCTA: 'z-[70]',
  floatingButton: 'z-[75]',
  bottomNav: 'z-[80]',
  mobileCallBar: 'z-[90]',
  header: 'z-[100]',
  burgerMenuBackdrop: 'z-[110]',
  burgerMenu: 'z-[111]',
  searchModal: 'z-[115]',
  modalBackdrop: 'z-[120]',
  modal: 'z-[121]',
  exitPopup: 'z-[125]',
  whatsAppGate: 'z-[130]',
  toast: 'z-[140]',
} as const
