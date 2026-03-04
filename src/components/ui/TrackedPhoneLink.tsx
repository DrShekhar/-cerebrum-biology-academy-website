'use client'

import { ReactNode, MouseEvent } from 'react'
import { trackPhoneCall } from '@/lib/ads/googleAdsConversion'
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
    // Fire Google Ads conversion + GA4 tracking (handles both internally)
    trackPhoneCall(source, priority)

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
export function handlePhoneClickTracking(source: string, _phone: 'primary' | 'secondary' | 'owner' = 'primary', priority: number = 100) {
  trackPhoneCall(source, priority)
}

export default TrackedPhoneLink
