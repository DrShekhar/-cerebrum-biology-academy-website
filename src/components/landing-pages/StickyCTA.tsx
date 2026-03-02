'use client'

import { useState, useEffect } from 'react'
import { Phone, Calendar } from 'lucide-react'
import { trackPhoneCall } from '@/lib/ads/googleAdsConversion'

interface StickyCTAProps {
  phoneCTA?: string
  demoCTA?: string
}

export function StickyCTA({ phoneCTA = 'Call Now', demoCTA = 'Book Demo' }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const phoneNumber = '918826444334'
  const displayPhone = '+91-88264-44334'

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlePhoneClick = () => {
    trackPhoneCall('sticky-cta', 300)
  }

  const handleDemoClick = () => {
    const element = document.getElementById('demo-form')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-[55] animate-in slide-in-from-bottom duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 shadow-2xl backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="hidden text-white md:block">
            <p className="text-sm font-medium">Ready to start your NEET journey?</p>
            <p className="text-xs text-white/80">Book a free demo class today</p>
          </div>

          <div className="flex w-full gap-3 md:w-auto lg:mr-[280px]">
            <a
              href={`tel:${phoneNumber}`}
              onClick={handlePhoneClick}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl md:flex-initial"
            >
              <Phone className="h-5 w-5" />
              <span className="hidden sm:inline">{phoneCTA}</span>
              <span className="sm:hidden">{displayPhone}</span>
            </a>

            <button
              onClick={handleDemoClick}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-6 py-3 font-semibold text-white transition-all hover:bg-white/10 md:flex-initial"
            >
              <Calendar className="h-5 w-5" />
              <span>{demoCTA}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
