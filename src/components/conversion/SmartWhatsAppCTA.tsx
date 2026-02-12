'use client'

import { useState, useEffect, useCallback } from 'react'
import { MessageCircle, X, Smartphone, Copy, Check, ExternalLink, Clock, Users, QrCode } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

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

const WHATSAPP_NUMBER = '918826444334'
const DISPLAY_NUMBER = '+91 88264 44334'

const variantStyles = {
  hero: 'px-8 py-4 text-lg font-bold bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl shadow-xl hover:shadow-2xl',
  section: 'px-6 py-3 text-base font-semibold bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg shadow-lg',
  inline: 'px-4 py-2 text-sm font-medium bg-green-100 hover:bg-green-200 text-green-700 rounded-lg',
  banner: 'w-full px-6 py-4 text-lg font-bold bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl shadow-lg',
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
  const [showDesktopHelper, setShowDesktopHelper] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    setIsMobile(mobile)
  }, [])

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(whatsappUrl)}&bgcolor=ffffff&color=128C7E&margin=10`

  const handleClick = useCallback(async () => {
    // Track the click
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
      // Mobile: Direct WhatsApp open
      await trackAndOpenWhatsApp({
        source,
        message,
        campaign: campaign || source,
        buttonText: typeof children === 'string' ? children : 'Chat on WhatsApp',
      })
    } else {
      // Desktop: Show helper modal with QR + alternatives
      setShowDesktopHelper(true)
    }
  }, [isMobile, source, message, campaign, children, cityName, countryName])

  const handleWhatsAppWeb = useCallback(async () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'smart_whatsapp_web_open', {
        event_category: 'conversion',
        source: `${source}-web`,
      })
    }
    await trackAndOpenWhatsApp({
      source: `${source}-web`,
      message,
      campaign: campaign ? `${campaign}-web` : `${source}-web`,
    })
    setShowDesktopHelper(false)
  }, [source, message, campaign])

  const copyWhatsAppLink = useCallback(() => {
    navigator.clipboard.writeText(whatsappUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'smart_whatsapp_link_copied', {
        event_category: 'conversion',
        source,
      })
    }
  }, [whatsappUrl, source])

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

      {/* Desktop Helper Modal - QR Code + Alternatives */}
      {showDesktopHelper && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDesktopHelper(false)
          }}
        >
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-[#075E54] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Chat with Cerebrum Biology Academy</h3>
                  <p className="text-sm text-green-200 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Online now — Avg reply: 2 mins
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDesktopHelper(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Option 1: QR Code - Primary for Desktop */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Smartphone className="w-4 h-4" />
                  Easiest: Scan with your phone
                </div>
                <div className="bg-white p-4 rounded-xl border-2 border-green-100 inline-block shadow-sm">
                  <img
                    src={qrCodeUrl}
                    alt="Scan QR code to open WhatsApp chat"
                    width={200}
                    height={200}
                    className="rounded-lg"
                    loading="eager"
                  />
                </div>
                <p className="text-gray-500 text-sm mt-3">
                  Open your phone camera and point at the QR code
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-5">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-gray-400 text-sm font-medium">or use these options</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Option 2 & 3: Alternative Methods */}
              <div className="space-y-3">
                {/* WhatsApp Web */}
                <button
                  onClick={handleWhatsAppWeb}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <ExternalLink className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-900">Open WhatsApp Web</p>
                    <p className="text-sm text-gray-500">
                      Chat from this computer (needs WhatsApp Web login)
                    </p>
                  </div>
                </button>

                {/* Copy Link */}
                <button
                  onClick={copyWhatsAppLink}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-900">
                      {copied ? 'Link Copied!' : 'Copy Chat Link'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {copied ? 'Paste it in your phone browser' : 'Share to your phone via any app'}
                    </p>
                  </div>
                </button>
              </div>

              {/* Direct Number */}
              <div className="mt-5 p-4 bg-gray-50 rounded-xl text-center">
                <p className="text-sm text-gray-500 mb-1">Or save our WhatsApp number directly:</p>
                <p className="text-xl font-bold text-gray-900 tracking-wide">{DISPLAY_NUMBER}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Save this number and message us on WhatsApp from your phone
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  1,50,000+ students coached
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  98% success rate
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SmartWhatsAppCTA
