'use client'

import { useState, useEffect, useCallback } from 'react'
import { WhatsAppQRModalContent } from './WhatsAppQRModalContent'
import { isMobileDevice } from '@/lib/whatsapp/tracking'
import type { WhatsAppDesktopModalEvent } from '@/lib/whatsapp/tracking'

const WHATSAPP_NUMBER = '918826444334'

export function WhatsAppDesktopModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalData, setModalData] = useState<WhatsAppDesktopModalEvent | null>(null)

  const openModal = useCallback((data: WhatsAppDesktopModalEvent) => {
    setModalData(data)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setModalData(null)
  }, [])

  useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const detail = (e as CustomEvent<WhatsAppDesktopModalEvent>).detail
      openModal(detail)
    }

    window.addEventListener('cerebrum:whatsapp-desktop-modal', handleCustomEvent)
    return () => {
      window.removeEventListener('cerebrum:whatsapp-desktop-modal', handleCustomEvent)
    }
  }, [openModal])

  // Global <a href="wa.me/..."> click interceptor (desktop only)
  useEffect(() => {
    if (isMobileDevice()) return

    const handleLinkClick = (e: MouseEvent) => {
      const anchor = (e.target as Element)?.closest?.('a[href*="wa.me/"]') as HTMLAnchorElement
      if (!anchor) return

      const href = anchor.href
      if (!href.includes('wa.me/')) return

      e.preventDefault()
      e.stopPropagation()

      // Extract message from URL: wa.me/NUMBER?text=MESSAGE
      let message = ''
      try {
        const url = new URL(href)
        message = url.searchParams.get('text') || ''
      } catch {
        const textMatch = href.match(/[?&]text=([^&]*)/)
        if (textMatch) {
          message = decodeURIComponent(textMatch[1])
        }
      }

      const whatsappUrl = href.startsWith('http') ? href : `https://${href}`
      openModal({ whatsappUrl, message, source: 'link-interceptor' })
    }

    document.addEventListener('click', handleLinkClick, true)
    return () => {
      document.removeEventListener('click', handleLinkClick, true)
    }
  }, [openModal])

  // MOBILE: bare <a href="wa.me/..."> links (e.g. hub-page heroes/CTAs) open
  // WhatsApp directly and bypass the tracking helper, so the lead/owner-alert
  // never fired. Beacon the click to the server BEFORE the link navigates away
  // (sendBeacon survives unload), then let WhatsApp open normally — no UX change.
  useEffect(() => {
    if (!isMobileDevice()) return

    const handleMobileWaClick = (e: MouseEvent) => {
      const anchor = (e.target as Element)?.closest?.('a[href*="wa.me/"]') as HTMLAnchorElement
      if (!anchor || !anchor.href.includes('wa.me/')) return

      let message = ''
      try {
        message = new URL(anchor.href).searchParams.get('text') || ''
      } catch {
        const m = anchor.href.match(/[?&]text=([^&]*)/)
        if (m) message = decodeURIComponent(m[1])
      }

      try {
        navigator.sendBeacon?.(
          '/api/analytics/whatsapp-click',
          new Blob(
            [
              JSON.stringify({
                source: 'link-interceptor-mobile',
                page: window.location.pathname,
                message,
              }),
            ],
            { type: 'application/json' }
          )
        )
      } catch {
        // ignore — never block the WhatsApp open
      }
      // Do NOT preventDefault — let the link open WhatsApp as usual.
    }

    document.addEventListener('click', handleMobileWaClick, true)
    return () => {
      document.removeEventListener('click', handleMobileWaClick, true)
    }
  }, [])

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeModal])

  if (!isOpen || !modalData) return null

  return (
    <div
      className="fixed inset-0 z-[125] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal()
      }}
    >
      <WhatsAppQRModalContent
        whatsappUrl={modalData.whatsappUrl}
        message={modalData.message}
        source={modalData.source}
        onClose={closeModal}
      />
    </div>
  )
}
