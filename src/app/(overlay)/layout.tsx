/**
 * Overlay Layout - Minimal layout for OBS streaming overlays
 *
 * This layout is nested inside the root layout, so it should NOT have
 * <html>, <head>, or <body> tags. The root layout already provides those.
 *
 * The actual hiding of site header/footer is handled by CSS in globals.css
 * when the body has the 'obs-overlay-mode' class, which is added by
 * StudyWithMePage component via useLayoutEffect when mode="obs".
 *
 * This layout just passes through children with minimal wrapping.
 */

import type { Metadata } from 'next'

// Tell search engines not to index overlay pages
export const metadata: Metadata = {
  robots: 'noindex, nofollow',
}

// Force dynamic rendering for fresh state
export const dynamic = 'force-dynamic'

export default function OverlayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Just pass through children - root layout handles the HTML structure
  // CSS handles hiding header/footer when obs-overlay-mode class is present
  return <>{children}</>
}
