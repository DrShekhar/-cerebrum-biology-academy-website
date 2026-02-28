'use client'

import { useState, useEffect, useCallback } from 'react'
import { MessageCircle, Clock, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  trackAndOpenWhatsApp,
  openDesktopWhatsAppModal,
  buildWhatsAppUrl,
} from '@/lib/whatsapp/tracking'

interface SmartWhatsAppCTAProps {
  variant?: 'hero' | 'section' | 'inline' | 'banner' | 'compact'
  message: string
  source: string
  campaign?: string
  className?: string
  children?: React.ReactNode
  showStats?: boolean
  cityName?: string
  countryName?: string
}

const variantStyles = {
  hero: 'px-8 py-4 text-lg font-bold bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl shadow-xl hover:shadow-2xl',
  section:
    'px-6 py-3 text-base font-semibold bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg shadow-lg',
  inline: 'px-4 py-2 text-sm font-medium bg-green-100 hover:bg-green-200 text-green-700 rounded-lg',
  banner:
    'w-full px-6 py-4 text-lg font-bold bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl shadow-lg',
  compact: 'px-4 py-2 text-sm font-semibold bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg',
}

export function SmartWhatsAppCTA({
  variant = 'hero',
  message,
  source,
  campaign,
  className,
  children,
  showStats = false,
  cityName,
  countryName,
}: SmartWhatsAppCTAProps) {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    setIsMobile(mobile)
  }, [])

  const handleClick = useCallback(async () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'smart_whatsapp_click', {
        event_category: 'conversion',
        event_label: isMobile ? 'mobile_direct' : 'desktop_helper',
        source,
        campaign: campaign || source,
        city: cityName,
        country: countryName,
      })
    }

    if (isMobile) {
      await trackAndOpenWhatsApp({
        source,
        message,
        campaign: campaign || source,
        buttonText: typeof children === 'string' ? children : 'Chat on WhatsApp',
      })
    } else {
      const whatsappUrl = buildWhatsAppUrl(message, source)
      openDesktopWhatsAppModal(whatsappUrl, message, source)
    }
  }, [isMobile, source, message, campaign, children, cityName, countryName])

  return (
    <>
      {/* Main CTA Button */}
      <button
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center gap-3 transition-all duration-200',
          'focus:outline-none focus:ring-4 focus:ring-green-500/30',
          'min-h-[48px] active:scale-95',
          variantStyles[variant],
          className
        )}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className={cn(variant === 'hero' ? 'w-6 h-6' : 'w-5 h-5')} />
        <span>{children || 'Chat on WhatsApp'}</span>
        {showStats && (
          <span className="hidden sm:flex items-center gap-1 text-xs opacity-80 ml-2 border-l border-white/30 pl-3">
            <Clock className="w-3 h-3" />
            <span>2 min reply</span>
          </span>
        )}
      </button>
    </>
  )
}

export default SmartWhatsAppCTA
