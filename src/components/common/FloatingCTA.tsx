'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { usePathname } from 'next/navigation'
import { Calendar, Phone, MessageCircle, X, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

export const FloatingCTA = memo(function FloatingCTA() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showFloatingButton, setShowFloatingButton] = useState(true)

  const rafRef = useRef<number | null>(null)
  const lastScrollRef = useRef(0)

  const handleScroll = useCallback(() => {
    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY

      if (Math.abs(scrollTop - lastScrollRef.current) < 10) {
        rafRef.current = null
        return
      }
      lastScrollRef.current = scrollTop

      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      const newIsVisible = scrollTop > windowHeight * 0.5
      const progress = scrollTop / (docHeight - windowHeight)
      const newScrollProgress = Math.min(progress * 100, 100)
      const nearBottom = scrollTop > docHeight - windowHeight * 1.5
      const newShowFloatingButton = !nearBottom && scrollTop > windowHeight * 0.3

      setIsVisible(newIsVisible)
      setScrollProgress(newScrollProgress)
      setShowFloatingButton(newShowFloatingButton)

      rafRef.current = null
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleScroll])

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => setIsExpanded(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [isExpanded])

  // WhatsApp first - highest converting channel
  const actions = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/918826444334?text=Hi!%20I%20want%20to%20know%20more%20about%20NEET%20Biology%20courses.',
      color: 'bg-[#25D366] hover:bg-[#20BD5A]',
      action: 'whatsapp',
      external: true,
    },
    {
      icon: Phone,
      label: 'Call Now',
      href: 'tel:+918826444334',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: 'call',
    },
    {
      icon: Calendar,
      label: 'Book Demo',
      href: '/demo-booking',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      action: 'book-demo',
    },
  ]

  const handleActionClick = async (action: string, e?: React.MouseEvent) => {
    // Track with gtag
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'floating_cta_click', {
        event_category: 'engagement',
        event_label: action,
      })
    }

    // Special handling for WhatsApp - use tracked system
    if (action === 'whatsapp' && e) {
      e.preventDefault()
      await trackAndOpenWhatsApp({
        source: 'floating-cta',
        message: WHATSAPP_MESSAGES.default,
        campaign: 'floating-cta',
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Hide on blog pages - they have their own BlogWhatsAppQuery component
  const isBlogPage = pathname?.startsWith('/blog/')

  if (!isVisible || isBlogPage) return null

  return (
    <>
      {/* Mobile Floating CTA - Only show when not near bottom and scrolled past hero */}
      {/* Positioned at bottom-24 to clear mobile nav (60px) + safe area inset */}
      {showFloatingButton && (
        <div className="fixed bottom-24 sm:bottom-28 right-3 sm:right-4 z-[70] lg:hidden">
          {/* Expanded Actions - positioned higher to avoid bottom bar overlap */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 space-y-3 animate-fadeInUp">
              {actions.map((action, index) => {
                const Icon = action.icon
                const Component = action.external ? 'a' : Link
                const linkProps = action.external
                  ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: action.href }

                return (
                  <div
                    key={action.action}
                    className="animate-fadeInRight"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Component
                      {...linkProps}
                      onClick={(e: React.MouseEvent) => {
                        handleActionClick(action.action, e)
                        setIsExpanded(false)
                      }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300 transform hover:scale-105 min-h-[48px] touch-manipulation ${action.color}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="whitespace-nowrap text-xs sm:text-sm">{action.label}</span>
                    </Component>
                  </div>
                )
              })}
            </div>
          )}

          {/* Main Floating Button - WhatsApp branded for highest conversion */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 min-h-[48px] min-w-[48px] touch-manipulation animate-pulse hover:animate-none"
          >
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-14 h-14 transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="white"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
                className="transition-all duration-300"
              />
            </svg>

            {/* Icon - WhatsApp when closed, X when expanded */}
            <span className="transition-transform duration-200">
              {isExpanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </span>
          </button>
        </div>
      )}

      {/* Desktop Scroll to Top - positioned on LEFT side to avoid CTA clutter */}
      {scrollProgress > 20 && (
        <button
          onClick={scrollToTop}
          className="hidden lg:flex fixed bottom-8 left-8 z-[60] w-12 h-12 bg-gray-700 hover:bg-gray-800 rounded-full shadow-lg items-center justify-center text-white hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 animate-scaleIn"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/*
        Mobile Bottom CTA Bar REMOVED - EnhancedTouchInterface handles this
        Consolidating CTAs improves mobile UX by reducing visual clutter
        The EnhancedTouchInterface provides better touch-optimized CTAs
      */}
    </>
  )
})
