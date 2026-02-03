'use client'

import { ReactNode, MouseEvent } from 'react'
import { trackPhoneCall, GOOGLE_ADS_ID } from '@/lib/ads/googleAdsConversion'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface TrackedPhoneLinkProps {
  phone?: 'primary' | 'secondary' | 'owner'
  source: string
  priority?: number
  className?: string
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

/**
 * A phone link component with built-in Google Ads conversion tracking
 *
 * Usage:
 * <TrackedPhoneLink phone="primary" source="header-cta">
 *   Call Now
 * </TrackedPhoneLink>
 */
export function TrackedPhoneLink({
  phone = 'primary',
  source,
  priority = 100,
  className,
  children,
  onClick,
}: TrackedPhoneLinkProps) {
  const phoneNumber = CONTACT_INFO.phone[phone]
  const phoneLink = `tel:${phoneNumber}`

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Fire Google Ads conversion tracking
    trackPhoneCall(source, priority)

    // Also fire direct gtag event for real-time tracking
    if (typeof window !== 'undefined' && window.gtag && GOOGLE_ADS_ID) {
      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_ID,
        event_category: 'engagement',
        event_label: 'phone_call_click',
        value: priority,
        currency: 'INR',
        phone_source: source,
        phone_number: phone,
      })
    }

    // Call custom onClick if provided
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <a href={phoneLink} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}

/**
 * Standalone function to track phone call clicks
 * Use this when you can't use the TrackedPhoneLink component
 */
export function handlePhoneClickTracking(source: string, phone: 'primary' | 'secondary' | 'owner' = 'primary', priority: number = 100) {
  trackPhoneCall(source, priority)

  if (typeof window !== 'undefined' && window.gtag && GOOGLE_ADS_ID) {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_ID,
      event_category: 'engagement',
      event_label: 'phone_call_click',
      value: priority,
      currency: 'INR',
      phone_source: source,
      phone_number: phone,
    })
  }
}

export default TrackedPhoneLink
