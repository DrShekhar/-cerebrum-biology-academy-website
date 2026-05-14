/**
 * Shared sticky mobile bottom bar for server-component landing pages.
 *
 * Adds Call + WhatsApp CTAs fixed to the bottom of the viewport on
 * screens below md (768px). Includes a spacer above so the bar doesn't
 * cover trailing content.
 *
 * Mirrors the pattern baked into BestVerticalLanding and
 * CompetitorComparisonLanding so self-contained server pages
 * (programme hubs, section pages, city pages) get the same mobile CTA
 * UX without duplicating ~25 lines of JSX per page.
 *
 * Usage:
 *   import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'
 *   <StickyMobileCTABar waUrl={wa} />
 */

import Link from 'next/link'

interface StickyMobileCTABarProps {
  /** Full https://wa.me/... URL with encoded text */
  waUrl: string
  /** Phone tel: link. Defaults to Cerebrum primary +91 88264-44334. */
  phoneTel?: string
}

export function StickyMobileCTABar({
  waUrl,
  phoneTel = 'tel:+918826444334',
}: StickyMobileCTABarProps) {
  return (
    <>
      <div className="h-20 md:hidden" aria-hidden="true" />
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 shadow-lg grid grid-cols-2 gap-2 p-3">
        <a
          href={phoneTel}
          className="flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 py-3 rounded-lg font-semibold text-sm"
          aria-label="Call Cerebrum Biology Academy"
        >
          📞 Call
        </a>
        <Link
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold text-sm"
          aria-label="WhatsApp Cerebrum Biology Academy"
        >
          💬 WhatsApp
        </Link>
      </div>
    </>
  )
}
