'use client'

/**
 * DropperBatchBanner — site-wide announcement for the NEET 2027 dropper /
 * repeater batch start dates (25 June, 1 July, 10 July). Surfaces a WhatsApp
 * enrolment CTA + a link to the dropper hub.
 *
 * Behaviour mirrors ReNEETBanner:
 *  - Renders site-wide via DynamicComponents → root layout, wrapped by
 *    ConditionalHeaderFooter so it hides on dashboard / admin / auth surfaces.
 *  - Dismissible, persisted in localStorage with a 24-hour cooldown.
 *  - Auto-hides on the dropper hub (`/dropper`) so we don't double-stack the
 *    same CTA above that page's hero.
 *  - Green/teal styling (enrolment / positive) to read distinctly from the red
 *    RE-NEET alert banner.
 *
 * Batch start dates are the single source for this announcement — update the
 * BATCH_DATES constant when the schedule changes.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, MessageCircle, X } from 'lucide-react'

const DISMISS_KEY = 'dropper-batch-2027-banner-dismissed'
const DISMISS_COOLDOWN_HOURS = 24
const HUB_PATH = '/dropper'
const WHATSAPP_NUMBER = '918826444334'
const BATCH_DATES = '25 June, 1 July & 10 July'

const CHAT_MESSAGE = encodeURIComponent(
  'Hi! I want to join the NEET 2027 Dropper Batch. Please share the batch start dates (25 June / 1 July / 10 July), fees, and a free counselling slot.'
)
const WA_CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${CHAT_MESSAGE}`

export function DropperBatchBanner() {
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
      // localStorage unavailable — show banner.
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
  if (pathname === HUB_PATH) return null

  return (
    <div
      role="region"
      aria-label="NEET 2027 dropper batch announcement"
      className="relative w-full bg-gradient-to-r from-green-600 via-teal-600 to-green-700 text-white shadow-md"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-2.5">
        <div className="flex items-start gap-3 sm:items-center">
          <CalendarDays
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-200 sm:mt-0"
            aria-hidden="true"
          />
          <div className="text-sm leading-snug">
            <span className="font-semibold">
              NEET 2027 Dropper Batches start {BATCH_DATES}
            </span>
            <span className="hidden font-normal text-green-50 sm:inline">
              {' '}
              · Limited seats per batch — book a free counselling session.
            </span>
            <Link
              href={HUB_PATH}
              className="ml-2 inline-flex items-center gap-1 underline decoration-white/60 underline-offset-2 hover:decoration-white"
            >
              View dropper programme
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={WA_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="dropper-batch-2027-whatsapp"
            className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-green-700 shadow-sm transition-colors hover:bg-green-50 sm:text-sm"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Reserve my seat</span>
          </a>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss dropper batch announcement"
            className="rounded p-1 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
