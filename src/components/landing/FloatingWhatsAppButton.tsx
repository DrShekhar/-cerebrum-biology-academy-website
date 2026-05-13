'use client'

// window.gtag and window.dataLayer are declared globally in src/types/globals.d.ts.

import { useEffect, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

interface FloatingWhatsAppButtonProps {
  /** Pre-filled WhatsApp message. */
  message: string
  /** Campaign attribution for tracking. */
  campaign: string
  /** Optional tooltip shown once after scroll. */
  tooltip?: string
  /** Phone (digits only, international format). */
  number?: string
}

/**
 * Fixed bottom-right WhatsApp bubble.
 *
 * Appears after the visitor scrolls a short distance (avoids blocking
 * above-fold content). Tooltip shows once per session. Click fires
 * GA4 + GTM events and opens WhatsApp.
 */
export function FloatingWhatsAppButton({
  message,
  campaign,
  tooltip = 'Chat with us — reply in minutes',
  number = '918826444334',
}: FloatingWhatsAppButtonProps) {
  const [visible, setVisible] = useState(false)
  const [tooltipShown, setTooltipShown] = useState(false)
  const [tooltipDismissed, setTooltipDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 320) {
        setVisible(true)
      }
    }
    // Show after short delay even without scroll, for users who land and sit.
    const timer = window.setTimeout(() => setVisible(true), 4000)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!visible || tooltipDismissed) return
    const key = 'wa-bubble-tooltip-seen'
    try {
      if (sessionStorage.getItem(key)) return
      const t = window.setTimeout(() => {
        setTooltipShown(true)
        sessionStorage.setItem(key, '1')
      }, 1200)
      return () => window.clearTimeout(t)
    } catch {
      /* storage disabled, ignore */
    }
  }, [visible, tooltipDismissed])

  const handleClick = () => {
    window.gtag?.('event', 'generate_lead', {
      method: 'whatsapp',
      source: 'floating-bubble',
      campaign,
    })
    window.dataLayer?.push({
      event: 'lead_cta_click',
      lead_method: 'whatsapp',
      lead_source: 'floating-bubble',
      lead_campaign: campaign,
    })
  }

  if (!visible) return null

  // Detect city / centre from current URL slug to add location context to
  // the message (helps centre staff respond faster + gives us attribution).
  const detectLocationContext = (): string => {
    if (typeof window === 'undefined') return ''
    const path = window.location.pathname.toLowerCase()
    const cityMap: Array<[RegExp, string]> = [
      [/(gurugram|gurgaon)/, 'Gurugram'],
      [/noida/, 'Noida'],
      [/faridabad/, 'Faridabad'],
      [/ghaziabad/, 'Ghaziabad'],
      [/(rohini)/, 'Rohini (North Delhi)'],
      [
        /(south-extension|green-park|hauz-khas|defence-colony|vasant-vihar|saket|cr-park)/,
        'South Delhi',
      ],
      [/(delhi-ncr|delhi)/, 'Delhi NCR'],
      [/mumbai/, 'Mumbai'],
      [/bangalore/, 'Bangalore'],
      [/hyderabad/, 'Hyderabad'],
      [/chennai/, 'Chennai'],
      [/kolkata/, 'Kolkata'],
      [/pune/, 'Pune'],
      [/kota/, 'Kota'],
    ]
    for (const [re, label] of cityMap) {
      if (re.test(path)) return label
    }
    return ''
  }

  const locationContext = detectLocationContext()
  const enriched = locationContext
    ? `${message}\n\n[Location: ${locationContext} · Page: ${typeof window !== 'undefined' ? window.location.pathname : ''}]`
    : message
  // Attribution params for WhatsApp Business API analytics
  const utm = `utm_source=floating_cta&utm_medium=whatsapp&utm_campaign=${encodeURIComponent(campaign)}${locationContext ? `&utm_content=${encodeURIComponent(locationContext.toLowerCase().replace(/\s+/g, '_'))}` : ''}`
  const href = `https://wa.me/${number}?text=${encodeURIComponent(enriched)}&${utm}`

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {tooltipShown && !tooltipDismissed && (
        <div className="relative max-w-xs rounded-xl bg-white px-4 py-3 pr-9 text-sm text-slate-800 shadow-xl ring-1 ring-slate-200 animate-fadeInUp">
          {tooltip}
          <button
            type="button"
            onClick={() => setTooltipDismissed(true)}
            className="absolute right-2 top-2 rounded-full p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Dismiss tooltip"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 bg-white ring-1 ring-slate-200"
          />
        </div>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-2xl ring-2 ring-green-400/40 transition-all hover:bg-green-600 hover:shadow-green-500/30"
        aria-label="Chat with us on WhatsApp"
        data-cta-method="whatsapp"
        data-cta-source="floating-bubble"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>
    </div>
  )
}
