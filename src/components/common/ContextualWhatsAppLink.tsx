'use client'

/**
 * ContextualWhatsAppLink
 * Drop-in replacement for static `<a href="https://wa.me/…?text=…">` tags in shared
 * components (headers, navs, blog templates) where the surrounding page can vary.
 *
 * Reads `usePathname()` and routes the message through `getContextAwareMessage` so
 * the prefilled WhatsApp text reflects the live page (e.g. /neet-coaching-dubai-uae
 * yields a Dubai-specific message, /ib-biology-tutor-london yields an IB-specific one).
 */

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { getContextAwareMessage } from '@/lib/whatsapp/tracking'

interface ContextualWhatsAppLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  children: ReactNode
}

export function ContextualWhatsAppLink({
  children,
  target = '_blank',
  rel = 'noopener noreferrer',
  ...rest
}: ContextualWhatsAppLinkProps) {
  const pathname = usePathname()
  const msg = getContextAwareMessage(pathname || undefined)
  const href = `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(msg)}`
  return (
    <a href={href} target={target} rel={rel} {...rest}>
      {children}
    </a>
  )
}
