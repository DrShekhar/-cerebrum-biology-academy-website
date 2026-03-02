'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { SEMINAR_CONFIG } from '@/lib/seminar/config'

interface SeminarFloatingCTAProps {
  /** Callback when register button is clicked */
  onRegisterClick?: () => void
}

export function SeminarFloatingCTA({ onRegisterClick }: SeminarFloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approximately 600px)
      if (window.scrollY > 600 && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleClick = () => {
    if (onRegisterClick) {
      onRegisterClick()
    } else {
      document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-[55] p-4 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 shadow-2xl transform transition-transform duration-300 animate-slide-up">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Info */}
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="hidden sm:block">
            <span className="text-3xl">🎯</span>
          </div>
          <div>
            <p className="text-white font-semibold">Limited Seats Available!</p>
            <p className="text-slate-400 text-sm">
              Only {SEMINAR_CONFIG.maxSeatsPerSession} seats per session •{' '}
              {SEMINAR_CONFIG.pricing.currencySymbol}
              {SEMINAR_CONFIG.pricing.standard} registration
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleClick}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold px-6 py-3 rounded-lg transition-all whitespace-nowrap"
          >
            Register Now
          </button>
          <button
            onClick={handleDismiss}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default SeminarFloatingCTA
