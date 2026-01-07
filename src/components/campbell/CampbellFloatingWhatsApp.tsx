'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  getCampbellWhatsAppMessage,
  type CampbellMessageType,
  type CampbellMessageParams,
} from '@/lib/whatsapp/campbell-messages'

interface CampbellFloatingWhatsAppProps {
  messageType?: CampbellMessageType
  messageParams?: CampbellMessageParams
  customMessage?: string
  showAfterScroll?: number
  pulseAnimation?: boolean
  campaign?: string
  tooltipTitle?: string
  tooltipDescription?: string
}

export function CampbellFloatingWhatsApp({
  messageType = 'general',
  messageParams,
  customMessage,
  showAfterScroll = 200,
  pulseAnimation = true,
  campaign,
  tooltipTitle = 'Need help with Campbell Biology?',
  tooltipDescription = 'Chat with our expert tutors on WhatsApp for instant support.',
}: CampbellFloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfterScroll])

  const whatsappMessage =
    customMessage || getCampbellWhatsAppMessage(messageType, messageParams)

  const handleClick = async () => {
    await trackAndOpenWhatsApp({
      source: `floating-cta-campbell-${messageType}`,
      message: whatsappMessage,
      campaign: campaign || `campbell-floating-${messageType}`,
      buttonText: 'Floating WhatsApp Button',
    })
  }

  const handleButtonClick = () => {
    if (isExpanded) {
      handleClick()
    } else {
      setIsExpanded(true)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-72 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <p className="text-slate-800 font-medium">{tooltipTitle}</p>
          </div>
          <p className="text-slate-600 text-sm mb-3">{tooltipDescription}</p>
          <button
            onClick={handleClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Start Chat
          </button>
        </div>
      )}

      <button
        onClick={handleButtonClick}
        className={cn(
          'w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl',
          'flex items-center justify-center text-white',
          'transition-all duration-200 hover:scale-110',
          'focus:outline-none focus:ring-4 focus:ring-green-500/30',
          pulseAnimation && !isExpanded && 'animate-pulse'
        )}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {!isExpanded && (
        <>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
        </>
      )}
    </div>
  )
}

export default CampbellFloatingWhatsApp
