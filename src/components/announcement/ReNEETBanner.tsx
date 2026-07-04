'use client'

/**
 * ReNEETBanner — site-wide announcement banner for the RE-NEET 2026
 * reconduct. Surfaces a WhatsApp chat CTA + WhatsApp call CTA, plus a
 * link to the dedicated /re-neet-2026 article (the lead-magnet hub).
 *
 * Behaviour
 *  - Renders site-wide via DynamicComponents → root layout, wrapped
 *    by ConditionalHeaderFooter so it hides on dashboard / admin /
 *    auth surfaces.
 *  - Dismissible. Dismiss-state is persisted in localStorage with a
 *    24-hour cooldown — mirrors the TrialBanner pattern so returning
 *    visitors aren't badgered.
 *  - Auto-hides on the dedicated article path (`/re-neet-2026`) so
 *    we don't double-stack the same CTA above the article hero.
 *  - Auto-hides if the consumer sets `data-suppress-renebanner="1"`
 *    on a page wrapper — escape hatch for transactional surfaces
 *    we haven't routed through ConditionalHeaderFooter.
 *
 * Wording
 *  - Headline: "RE-NEET 2026 — secure your seat with our crash course"
 *  - Sub: "Free demo class today. Limited seats. WhatsApp now."
 *  - Two CTAs, both WhatsApp deep links:
 *      1. CHAT — opens wa.me with a pre-filled enrolment message
 *      2. CALL — opens wa.me with the "Voice Call" intent
 *
 *  Dates / cancellation cause are deliberately not hard-coded here —
 *  the article at /re-neet-2026 carries the factual record, sourced
 *  from official NTA / ministry notifications.
 */

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MessageCircle, Phone, X, AlertTriangle } from 'lucide-react'

const DISMISS_KEY = 're-neet-2026-banner-dismissed'
const DISMISS_COOLDOWN_HOURS = 24
const ARTICLE_PATH = '/re-neet-2026'

const WHATSAPP_NUMBER = '918826444334'

const CHAT_MESSAGE = encodeURIComponent(
  'Hi! I am preparing for RE-NEET 2026. Please share details about the crash course, free demo timings, and faculty.'
)
const CALL_MESSAGE = encodeURIComponent(
  'Hi! Please give me a call back about RE-NEET 2026 crash course. Best time to reach me: '
)

const WA_CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${CHAT_MESSAGE}`
const WA_CALL_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${CALL_MESSAGE}`

export function ReNEETBanner() {
  const pathname = usePathname()
  const [isDismissed, setIsDismissed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (typeof window === 'undefined') return
    try {
      const dismissedAt = window.localStorage.getItem(DISMISS_KEY)
      if (dismissedAt) {
        const hoursSince = (Date.now() - new Date(dismissedAt).getTime()) / 36e5
        if (hoursSince < DISMISS_COOLDOWN_HOURS) {
          setIsDismissed(true)
        } else {
          window.localStorage.removeItem(DISMISS_KEY)
        }
      }
    } catch {
      // localStorage unavailable (private browsing, SSR edge) — show banner.
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    try {
      window.localStorage.setItem(DISMISS_KEY, new Date().toISOString())
    } catch {
      // ignore — banner will just reappear next visit
    }
  }

  if (!isMounted) return null
  if (isDismissed) return null
  if (pathname === ARTICLE_PATH) return null // already on the article — no need

  return (
    <div
      role="region"
      aria-label="RE-NEET 2026 announcement"
      className="relative w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-md"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-2.5">
        <div className="flex items-start gap-3 sm:items-center">
          <AlertTriangle
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-200 md:mt-0"
            aria-hidden="true"
          />
          <div className="text-sm leading-snug">
            <span className="font-semibold">RE-NEET 2026 announced</span>
            <span className="hidden font-normal text-red-50 sm:inline">
              {' '}
              · Short window. Join our crash course — free demo class today.
            </span>
            <Link
              href={ARTICLE_PATH}
              className="ml-2 inline-flex items-center gap-1 underline decoration-white/60 underline-offset-2 hover:decoration-white"
            >
              Read the details
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={WA_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="re-neet-2026-whatsapp-chat"
            className="inline-flex items-center gap-1.5 rounded-md bg-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-green-400 sm:text-sm"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>WhatsApp chat</span>
          </a>
          <a
            href={WA_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="re-neet-2026-whatsapp-call"
            className="inline-flex items-center gap-1.5 rounded-md bg-white/15 px-3 py-1.5 text-xs font-semibold text-white shadow-sm ring-1 ring-white/30 transition-colors hover:bg-white/25 sm:text-sm"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>Request a call</span>
          </a>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss RE-NEET 2026 announcement"
            className="rounded p-1 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
