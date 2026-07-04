/**
 * Historical: page-level sticky Call/WhatsApp bar for landing pages.
 *
 * Now renders nothing. The global MobileBottomNav (mounted in the root
 * layout, fixed bottom-0 z-50, taller and later in the DOM) fully covered
 * this bar on every page that used it, so it was invisible dead weight —
 * and its h-20 spacer wasted 80px of mobile viewport. The global nav
 * already provides Call and WhatsApp actions. Kept as a no-op so the 58
 * existing imports don't break; safe to delete along with its call sites.
 */

interface StickyMobileCTABarProps {
  /** Full https://wa.me/... URL with encoded text */
  waUrl: string
  /** Phone tel: link. Defaults to Cerebrum primary +91 88264-44334. */
  phoneTel?: string
}

export function StickyMobileCTABar(_props: StickyMobileCTABarProps) {
  return null
}
