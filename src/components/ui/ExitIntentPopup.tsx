'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { X, CheckCircle, Trophy, Users, Phone, MessageCircle, Sparkles, Clock } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface ExitIntentPopupProps {
  isVisible: boolean
  onClose: () => void
  onDownload?: (email: string, phone: string) => Promise<{ discountCode?: string }>
  variant?: 'catalog' | 'discount'
}

export function ExitIntentPopup({
  isVisible,
  onClose,
  variant = 'discount',
}: ExitIntentPopupProps) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [discountEndTime] = useState(() => Date.now() + 15 * 60 * 1000)
  const [discountTimer, setDiscountTimer] = useState({ minutes: 14, seconds: 59 })
  const timerRef = useRef<number | null>(null)

  const handleClose = useCallback(() => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      sessionStorage.setItem('exitIntentDismissed', 'true')
      onClose()
      setIsAnimatingOut(false)
    }, 200)
  }, [onClose])

  useEffect(() => {
    if (!isVisible || variant !== 'discount') return

    const updateTimer = () => {
      const now = Date.now()
      const diff = Math.max(0, discountEndTime - now)
      const totalSeconds = Math.floor(diff / 1000)
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds % 60

      setDiscountTimer({ minutes, seconds })

      if (diff > 0) {
        timerRef.current = requestAnimationFrame(updateTimer)
      }
    }

    timerRef.current = requestAnimationFrame(updateTimer)

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current)
      }
    }
  }, [isVisible, variant, discountEndTime])

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isVisible])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isVisible, handleClose])

  if (!isVisible) return null

  const animationClass = isAnimatingOut ? 'exit-intent-fade-out' : 'exit-intent-fade-in'
  const modalAnimationClass = isAnimatingOut ? 'exit-intent-modal-out' : 'exit-intent-modal-in'

  const benefits =
    variant === 'discount'
      ? [
          'FREE Demo Class worth Rs 2,000',
          '20% OFF on any course enrollment',
          'Priority batch selection',
          'Exclusive study material access',
        ]
      : [
          'Complete NEET Biology Course Outline',
          'Chapter-wise Study Timeline',
          'Previous Year Question Analysis',
          'Fee Structure & Scholarship Details',
        ]

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes exitIntentFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes exitIntentFadeOut {
              from { opacity: 1; }
              to { opacity: 0; }
            }
            @keyframes exitIntentModalIn {
              from { opacity: 0; transform: scale(0.95) translateY(20px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes exitIntentModalOut {
              from { opacity: 1; transform: scale(1) translateY(0); }
              to { opacity: 0; transform: scale(0.95) translateY(20px); }
            }
            @keyframes exitIntentBenefitSlide {
              from { opacity: 0; transform: translateX(-20px); }
              to { opacity: 1; transform: translateX(0); }
            }
            .exit-intent-fade-in {
              animation: exitIntentFadeIn 0.2s ease-out forwards;
            }
            .exit-intent-fade-out {
              animation: exitIntentFadeOut 0.2s ease-out forwards;
            }
            .exit-intent-modal-in {
              animation: exitIntentModalIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            .exit-intent-modal-out {
              animation: exitIntentModalOut 0.2s ease-out forwards;
            }
            .exit-intent-benefit-slide {
              animation: exitIntentBenefitSlide 0.3s ease-out forwards;
            }
          `,
        }}
      />
      <div
        className="fixed inset-0 z-[125] flex items-center justify-center p-2 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-popup-title"
      >
        <div
          className={`absolute inset-0 bg-gray-900/50 backdrop-blur-sm cursor-pointer ${animationClass}`}
          onClick={handleClose}
        />

        <div
          className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[calc(100vw-1rem)] sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto ${modalAnimationClass}`}
        >
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-20 bg-white hover:bg-gray-100 rounded-full p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all shadow-lg border border-gray-200 touch-manipulation active:scale-95"
            aria-label="Close popup"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          <div className="bg-gradient-to-br from-[#4a5d4a] to-[#3d4d3d] text-white px-4 sm:px-6 py-5 sm:py-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
            <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-white/10 rounded-full" />

            <div className="relative z-10">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mb-3">
                <Sparkles className="w-4 h-4 mr-1" />
                <span>Exclusive Offer</span>
              </div>

              <h2
                id="exit-intent-popup-title"
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 pr-8"
              >
                Wait! Don't Leave Yet...
              </h2>
              <p className="text-[#e8ede8] text-base sm:text-lg">Get 20% OFF + FREE Demo Class!</p>

              {variant === 'discount' && (
                <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#e8ede8]" />
                  <span className="text-[#e8ede8] text-sm sm:text-base">Expires in:</span>
                  <div
                    className="flex gap-1 font-mono font-bold text-base sm:text-lg"
                    style={{ willChange: 'contents' }}
                  >
                    <span className="bg-[#3d4d3d] px-2 py-1 rounded">
                      {String(discountTimer.minutes).padStart(2, '0')}
                    </span>
                    <span>:</span>
                    <span className="bg-[#3d4d3d] px-2 py-1 rounded">
                      {String(discountTimer.seconds).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
              {benefits.map((benefit, index) => (
                <div
                  key={`benefit-${benefit.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
                  className="flex items-center bg-[#e8ede8] rounded-lg p-2.5 sm:p-3 exit-intent-benefit-slide"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#4a5d4a] mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-[#3d4d3d] font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 sm:space-y-4">
              <button
                type="button"
                onClick={() => {
                  trackAndOpenWhatsApp({
                    source: 'exit-intent-popup',
                    message:
                      variant === 'discount'
                        ? 'Hi! I saw the discount offer. Please help me claim 20% off and book a free demo class.'
                        : 'Hi! I want to get the complete NEET Biology course catalog. Please share the details.',
                    campaign: 'exit-intent-discount',
                  })
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg shadow-green-500/25 transition-all min-h-[48px] touch-manipulation"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Claim via WhatsApp
              </button>

              <a
                href="tel:+918826444334"
                className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg shadow-blue-500/25 transition-all min-h-[48px] touch-manipulation"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                Call: +91 88264 44334
              </a>
            </div>

            <div className="mt-4 pt-4 border-t border-[#e8ede8]">
              <div className="flex items-center justify-center gap-4 text-xs text-[#5a6d5a]">
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 mr-1 text-[#4a5d4a]" />
                  98% Success Rate
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1 text-[#4a5d4a]" />
                  15,000+ Students
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function useExitIntent() {
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('exitIntentShown')
    const hasDismissed = sessionStorage.getItem('exitIntentDismissed')

    if (hasSeenPopup || hasDismissed) {
      setHasTriggered(true)
      return
    }

    let isEnabled = false
    let lastScrollY = window.scrollY
    let scrollUpCount = 0
    let rafId: number | null = null
    let lastScrollTime = 0
    const cleanupFunctions: (() => void)[] = []

    const setupListeners = () => {
      setIsInitialized(true)

      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !hasTriggered && isEnabled) {
          setShowExitIntent(true)
          setHasTriggered(true)
          sessionStorage.setItem('exitIntentShown', 'true')
        }
      }

      const handleScroll = () => {
        const now = Date.now()
        if (now - lastScrollTime < 250) return
        lastScrollTime = now

        if (rafId) return
        rafId = requestAnimationFrame(() => {
          const currentY = window.scrollY

          if (currentY > lastScrollY || currentY > 50) {
            scrollUpCount = 0
          } else if (currentY < lastScrollY && currentY < 30 && isEnabled) {
            scrollUpCount++
            if (scrollUpCount >= 5 && !hasTriggered) {
              setShowExitIntent(true)
              setHasTriggered(true)
              sessionStorage.setItem('exitIntentShown', 'true')
            }
          }

          lastScrollY = currentY
          rafId = null
        })
      }

      document.addEventListener('mouseleave', handleMouseLeave)
      window.addEventListener('scroll', handleScroll, { passive: true })

      cleanupFunctions.push(
        () => document.removeEventListener('mouseleave', handleMouseLeave),
        () => window.removeEventListener('scroll', handleScroll)
      )
    }

    const deferTimer = setTimeout(() => {
      isEnabled = true
      setupListeners()
    }, 5000)

    return () => {
      clearTimeout(deferTimer)
      cleanupFunctions.forEach((fn) => fn())
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [hasTriggered])

  const hideExitIntent = () => {
    setShowExitIntent(false)
    sessionStorage.setItem('exitIntentDismissed', 'true')
  }

  return { showExitIntent, hideExitIntent, isInitialized }
}
