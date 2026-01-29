'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  X,
  Download,
  BookOpen,
  Users,
  Trophy,
  CheckCircle,
  Gift,
  Clock,
  Sparkles,
  Percent,
} from 'lucide-react'
import { Button } from './Button'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface ExitIntentPopupProps {
  isVisible: boolean
  onClose: () => void
  onDownload: (email: string, phone: string) => Promise<{ discountCode?: string }>
  variant?: 'catalog' | 'discount'
}

export function ExitIntentPopup({
  isVisible,
  onClose,
  onDownload,
  variant = 'discount',
}: ExitIntentPopupProps) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [discountCode, setDiscountCode] = useState<string | null>(null)
  const [discountEndTime] = useState(() => Date.now() + 15 * 60 * 1000)
  const [discountTimer, setDiscountTimer] = useState({ minutes: 14, seconds: 59 })
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !phone) return

    setIsSubmitting(true)
    try {
      const result = await onDownload(email, phone)
      if (result?.discountCode) {
        setDiscountCode(result.discountCode)
      }
      setIsSubmitted(true)

      setTimeout(() => {
        handleClose()
        setIsSubmitted(false)
        setDiscountCode(null)
      }, 8000)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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

  const catalogFeatures = [
    'Complete Cerebrum NEET Biology Course Outline',
    'Chapter-wise Study Timeline by Cerebrum Experts',
    'Previous Year Question Analysis & Solutions',
    'Success Stories from 2,847 Cerebrum Students',
    'Cerebrum AIIMS Faculty Profiles & Credentials',
    'Fee Structure & Cerebrum Scholarship Details',
    'Exclusive Cerebrum Study Materials Preview',
  ]

  const discountBenefits = [
    'FREE Demo Class worth Rs 2,000',
    '20% OFF on any course enrollment',
    'Priority batch selection',
    'Exclusive study material access',
  ]

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
            @keyframes exitIntentSuccessScale {
              from { transform: scale(0); }
              to { transform: scale(1); }
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
            .exit-intent-success-scale {
              animation: exitIntentSuccessScale 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
          `,
        }}
      />
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
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

          {variant === 'discount' ? (
            <>
              <div className="bg-gradient-to-br from-[#4a5d4a] to-[#3d4d3d] text-white px-4 sm:px-6 py-5 sm:py-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full animate-[pulse-scale_3s_ease-in-out_infinite]" />
                <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-white/10 rounded-full animate-[pulse-scale_2.5s_ease-in-out_infinite]" />

                <div className="relative z-10">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mb-3 animate-[pulse-badge_1.5s_ease-in-out_infinite]">
                    <Sparkles className="w-4 h-4 mr-1" />
                    <span>Exclusive Offer</span>
                  </div>

                  <h2
                    id="exit-intent-popup-title"
                    className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 pr-8"
                  >
                    Wait! Don't Leave Yet...
                  </h2>
                  <p className="text-[#e8ede8] text-base sm:text-lg">
                    Get 20% OFF + FREE Demo Class!
                  </p>

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
                </div>
              </div>

              <div className="px-4 sm:px-6 py-4 sm:py-6">
                {!isSubmitted ? (
                  <>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                      {discountBenefits.map((benefit, index) => (
                        <div
                          key={`benefit-${benefit.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
                          className="flex items-center bg-[#e8ede8] rounded-lg p-2.5 sm:p-3 exit-intent-benefit-slide"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#4a5d4a] mr-2 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-[#3d4d3d] font-medium">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                      <div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4a5d4a] focus:border-transparent outline-none transition-all text-base"
                          placeholder="Your Name"
                          style={{ fontSize: '16px' }}
                        />
                      </div>
                      <div className="space-y-3">
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4a5d4a] focus:border-transparent outline-none transition-all text-base"
                          placeholder="Phone Number *"
                          style={{ fontSize: '16px' }}
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4a5d4a] focus:border-transparent outline-none transition-all text-base"
                          placeholder="Email Address *"
                          style={{ fontSize: '16px' }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || !email || !phone}
                        className="w-full py-3.5 sm:py-4 bg-[#4a5d4a] hover:bg-[#3d4d3d] text-white font-bold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all disabled:bg-[#c5d1c5] disabled:text-[#8a9a8a] disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 min-h-[48px] touch-manipulation hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Percent className="w-5 h-5" />
                        {isSubmitting ? 'Claiming...' : 'Claim 20% Discount'}
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        Limited time offer. No spam!
                      </p>

                      <div className="relative my-3">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="px-3 bg-white text-gray-500">or</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={async () => {
                          await trackAndOpenWhatsApp({
                            source: 'exit-intent-popup',
                            message: 'Hi! I saw the discount offer. Please help me claim 20% off.',
                            campaign: 'exit-intent-discount',
                          })
                        }}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#166534] hover:bg-[#14532d] text-white font-semibold rounded-xl transition-colors min-h-[48px] touch-manipulation text-sm"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Claim via WhatsApp
                      </button>
                    </form>

                    <div className="mt-4 pt-4 border-t border-[#e8ede8]">
                      <div className="flex items-center justify-center gap-4 text-xs text-[#5a6d5a]">
                        <div className="flex items-center">
                          <Trophy className="w-4 h-4 mr-1 text-[#4a5d4a]" />
                          98% Success Rate
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-[#4a5d4a]" />
                          2,500+ Students
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="bg-[#e8ede8] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 exit-intent-success-scale">
                      <CheckCircle className="w-8 h-8 text-[#4a5d4a]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#3d4d3d] mb-2">Discount Claimed!</h3>
                    {discountCode && (
                      <div className="bg-[#e8ede8] border-2 border-dashed border-[#4a5d4a] rounded-xl p-4 mb-4">
                        <p className="text-sm text-[#5a6d5a] mb-1">Your 20% Discount Code:</p>
                        <p className="text-2xl font-mono font-bold text-[#3d4d3d] tracking-wider">
                          {discountCode}
                        </p>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(discountCode)
                          }}
                          className="mt-2 text-sm text-[#4a5d4a] hover:text-[#3d4d3d] underline"
                        >
                          Click to copy
                        </button>
                      </div>
                    )}
                    <p className="text-[#5a6d5a] mb-2">
                      Use this code during enrollment to get 20% off!
                    </p>
                    <p className="text-sm text-[#5a6d5a]">
                      Our counselor will call you shortly to schedule your FREE demo class.
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="bg-blue-600 text-white px-6 sm:px-8 py-6">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 rounded-full p-3 mr-4">
                    <Gift className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">Wait! Don't Miss This...</h2>
                    <p className="text-blue-100">Get Cerebrum's complete NEET Biology guide FREE</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 mr-2" />
                      <span>98% Success</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>2,500+ Students</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>AIIMS Faculty</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-8 py-6">
                {!isSubmitted ? (
                  <>
                    <div className="text-center mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        Download Cerebrum's Complete Course Catalog
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        Everything you need to know about Cerebrum's proven NEET Biology coaching
                        programs
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2 mb-6 max-h-40 overflow-y-auto">
                      {catalogFeatures.map((feature) => (
                        <div
                          key={`feature-${feature.slice(0, 25).replace(/\s+/g, '-').toLowerCase()}`}
                          className="flex items-start"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          placeholder="Email Address *"
                        />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          placeholder="Phone Number *"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting || !email || !phone}
                        className="w-full py-3 text-base font-semibold"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        {isSubmitting ? 'Sending...' : 'Download Free Catalog'}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        Your information is secure. We respect your privacy.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 exit-intent-success-scale">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Catalog Sent!</h3>
                    <p className="text-gray-600 mb-2">
                      Check your email for the complete course catalog.
                    </p>
                    <p className="text-sm text-gray-500">
                      Our counselor will call you within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
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
