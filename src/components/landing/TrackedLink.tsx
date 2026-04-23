'use client'

// window.gtag and window.dataLayer are declared globally in src/types/globals.d.ts.

import type { ReactNode } from 'react'

interface TrackedLinkProps {
  href: string
  method: 'whatsapp' | 'phone'
  source: string
  campaign: string
  /** Extra event params — e.g., centre name for centre-specific CTAs. */
  params?: Record<string, string>
  className?: string
  children: ReactNode
  /** Explicit external flag; auto-detected for https://. */
  external?: boolean
}

/**
 * Inline tracked anchor. Use when a TrackedCTA pill button is too heavy
 * (e.g., a centre card's chat link, or a tel: link inside a sentence).
 * Fires gtag('generate_lead') + dataLayer 'lead_cta_click' with
 * method/source/campaign + any extra params. Styling is fully up to
 * the caller via className.
 */
export function TrackedLink({
  href,
  method,
  source,
  campaign,
  params,
  className,
  children,
  external,
}: TrackedLinkProps) {
  const isTel = href.startsWith('tel:')
  const isExternal = external ?? (!isTel && href.startsWith('http'))

  const handleClick = () => {
    window.gtag?.('event', 'generate_lead', {
      method,
      source,
      campaign,
      ...(params ?? {}),
    })
    window.dataLayer?.push({
      event: 'lead_cta_click',
      lead_method: method,
      lead_source: source,
      lead_campaign: campaign,
      ...(params ?? {}),
    })
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={className}
      data-cta-method={method}
      data-cta-source={source}
    >
      {children}
    </a>
  )
}
