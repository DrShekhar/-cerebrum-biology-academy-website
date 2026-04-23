'use client'

// window.gtag and window.dataLayer are declared globally in src/types/globals.d.ts.

import type { LucideIcon } from 'lucide-react'
import { MessageCircle, Phone } from 'lucide-react'

interface TrackedCTAProps {
  /** Destination href (tel:, https://wa.me/, or page path). */
  href: string
  /** Whether to open in a new tab — auto-set for https URLs, disabled for tel:. */
  external?: boolean
  /** Conversion method label — matches Google Ads / GA4 conversion config. */
  method: 'whatsapp' | 'phone' | 'form'
  /** Where on the page the click originated (for funnel analysis). */
  source: string
  /** Which ad campaign this LP serves (for click attribution). */
  campaign?: string
  /** Visual style. */
  variant: 'primary' | 'secondary'
  /** Icon override — defaults by method. */
  icon?: LucideIcon
  /** CTA label. */
  children: React.ReactNode
  className?: string
}

/**
 * Single-purpose CTA button that fires GA4 + GTM dataLayer events on
 * click. Use on every paid-ads landing page so Google Ads can optimize
 * bids to actual conversions (WhatsApp / phone / form) rather than
 * page-view proxies.
 *
 * Falls back silently if gtag / dataLayer are not yet loaded — real
 * production traffic will have GTM injected in layout.
 */
export function TrackedCTA({
  href,
  external,
  method,
  source,
  campaign,
  variant,
  icon,
  children,
  className = '',
}: TrackedCTAProps) {
  const isTel = href.startsWith('tel:')
  const isExternal = external ?? (!isTel && href.startsWith('http'))
  const Icon = icon ?? (method === 'whatsapp' ? MessageCircle : method === 'phone' ? Phone : null)

  const styles =
    variant === 'primary'
      ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
      : 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg'

  const handleClick = () => {
    const params = {
      method,
      source,
      ...(campaign ? { campaign } : {}),
    }

    // GA4 recommended events
    window.gtag?.('event', 'generate_lead', params)

    // GTM dataLayer — downstream Google Ads conversion tag picks this up
    window.dataLayer?.push({
      event: 'lead_cta_click',
      lead_method: method,
      lead_source: source,
      ...(campaign ? { lead_campaign: campaign } : {}),
    })
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${styles} ${className}`}
      data-cta-method={method}
      data-cta-source={source}
    >
      {Icon && <Icon size={22} />}
      {children}
    </a>
  )
}
