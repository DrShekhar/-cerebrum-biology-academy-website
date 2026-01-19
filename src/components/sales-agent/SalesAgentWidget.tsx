/**
 * ARIA Sales Agent Widget - Main Container
 * AI-powered sales assistant with proactive engagement, multi-language support,
 * and seamless lead capture flow
 */

'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Sparkles, Calendar, MessageSquarePlus } from 'lucide-react'
import { useAriaChat } from './hooks/useAriaChat'
import { useProactiveEngagement } from './hooks/useProactiveEngagement'
import { AriaChat } from './AriaChat'
import { AriaInput } from './AriaInput'
import { AriaDatePicker, type DemoBooking } from './AriaDatePicker'
import { trackAria } from '@/lib/analytics'
import { getTranslation } from '@/lib/aria/translations'
import type { Language } from '@/lib/aria/types'

interface SalesAgentWidgetProps {
  /** Delay before widget becomes interactive (ms) */
  initialDelay?: number
  /** Whether to enable proactive engagement triggers */
  enableProactive?: boolean
  /** Initial language preference */
  defaultLanguage?: Language
}

export function SalesAgentWidget({
  initialDelay = 3000,
  enableProactive = true,
  defaultLanguage = 'en',
}: SalesAgentWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [proactiveMessage, setProactiveMessage] = useState<string | null>(null)
  const [errorDismissed, setErrorDismissed] = useState(false)

  // Main chat hook with AI streaming
  const {
    messages,
    isStreaming,
    error,
    language,
    leadData,
    leadStage,
    visitCount,
    sendMessage,
    cancelStream,
    submitLeadField,
    toggleLanguage,
    openWhatsAppHandoff,
    hasExistingContext,
  } = useAriaChat({ initialLanguage: defaultLanguage })

  // Proactive engagement triggers
  const {
    shouldShowProactive,
    proactiveTrigger,
    dismissProactive,
    acceptProactive,
  } = useProactiveEngagement(language)

  // Track proactive shown events and set message
  useEffect(() => {
    if (shouldShowProactive && proactiveTrigger && enableProactive && !isOpen) {
      setProactiveMessage(proactiveTrigger.message)
      trackAria.proactiveShown(proactiveTrigger.type)
    }
  }, [shouldShowProactive, proactiveTrigger, enableProactive, isOpen])

  // Reset error dismissed state when a new error occurs
  useEffect(() => {
    if (error) {
      setErrorDismissed(false)
    }
  }, [error])

  // Initialize after delay
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), initialDelay)
    return () => clearTimeout(timer)
  }, [initialDelay])

  // Handle open
  const handleOpen = useCallback(
    (source = 'manual') => {
      setIsOpen(true)
      setProactiveMessage(null)
      trackAria.opened(source)

      // If proactive was accepted, mark it
      if (source === 'proactive' && proactiveTrigger) {
        const trigger = acceptProactive()
        if (trigger) {
          trackAria.proactiveAccepted(trigger.type)
        }
      }
    },
    [proactiveTrigger, acceptProactive]
  )

  // Handle close
  const handleClose = useCallback(() => {
    setIsOpen(false)
    if (isStreaming) {
      cancelStream()
    }
    trackAria.closed()
  }, [isStreaming, cancelStream])

  // Handle message send
  const handleSendMessage = useCallback(
    (message: string) => {
      // Check for demo booking intent
      const demoKeywords = ['book demo', 'demo book', 'schedule demo', 'डेमो बुक', 'free demo']
      if (demoKeywords.some((kw) => message.toLowerCase().includes(kw))) {
        setShowDatePicker(true)
        return
      }

      sendMessage(message)
    },
    [sendMessage]
  )

  // Handle quick action click
  const handleQuickAction = useCallback(
    (action: string) => {
      // Handle special actions
      if (action.toLowerCase().includes('book demo') || action.toLowerCase().includes('डेमो')) {
        setShowDatePicker(true)
        return
      }
      if (action.toLowerCase().includes('whatsapp')) {
        openWhatsAppHandoff()
        return
      }

      // Regular message
      sendMessage(action)
    },
    [sendMessage, openWhatsAppHandoff]
  )

  // Handle demo booking completion
  const handleBookingComplete = useCallback(
    (booking: DemoBooking) => {
      setShowDatePicker(false)
      trackAria.demoBooked('inline_picker')

      // Add as bot message by triggering the endpoint with booking context
      sendMessage(`__BOOKING_COMPLETE__:${JSON.stringify(booking)}`)
    },
    [sendMessage]
  )

  // Handle proactive dismiss
  const handleDismissProactive = useCallback(
    (doNotShowAgain = false) => {
      setProactiveMessage(null)
      dismissProactive(doNotShowAgain)
      if (proactiveTrigger) {
        trackAria.proactiveDismissed(proactiveTrigger.type, doNotShowAgain)
      }
    },
    [dismissProactive, proactiveTrigger]
  )

  // Don't render until ready
  if (!isReady) return null

  return (
    <>
      {/* Proactive Popup */}
      <AnimatePresence>
        {shouldShowProactive && proactiveMessage && !isOpen && enableProactive && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl"
          >
            <button
              onClick={() => handleDismissProactive(false)}
              className="absolute right-2 top-2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-teal-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">ARIA</span>
            </div>

            <p className="mb-3 text-sm text-slate-600">{proactiveMessage}</p>

            <div className="flex gap-2">
              <button
                onClick={() => handleOpen('proactive')}
                className="flex-1 rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
              >
                {language === 'hi' ? 'चैट करें' : 'Chat Now'}
              </button>
              <button
                onClick={() => handleDismissProactive(true)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-50"
              >
                {language === 'hi' ? 'बाद में' : 'Later'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpen('manual')}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-lg transition-shadow hover:shadow-xl"
            aria-label="Open ARIA chat"
          >
            <MessageCircle className="h-6 w-6" />
            {/* Notification dot for new messages or returning visitors */}
            {(visitCount > 1 || hasExistingContext) && (
              <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex h-[600px] max-h-[calc(100vh-100px)] w-[380px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-green-500 to-teal-600 p-3 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">ARIA</h3>
                  <p className="text-xs text-green-100">
                    {getTranslation('subtitle', language)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* WhatsApp Button */}
                <button
                  onClick={openWhatsAppHandoff}
                  className="rounded-lg p-2 transition-colors hover:bg-white/20"
                  title={language === 'hi' ? 'WhatsApp पर जारी रखें' : 'Continue on WhatsApp'}
                >
                  <MessageSquarePlus className="h-5 w-5" />
                </button>
                <button
                  onClick={handleClose}
                  className="rounded-lg p-2 transition-colors hover:bg-white/20"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-2 border-b border-slate-100 bg-slate-50 p-2">
              <button
                onClick={() => setShowDatePicker(true)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
              >
                <Calendar className="h-4 w-4" />
                {getTranslation('bookDemo', language)}
              </button>
              <button
                onClick={openWhatsAppHandoff}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#20BD5A]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </button>
            </div>

            {/* Error Banner */}
            {error && !errorDismissed && (
              <div className="flex items-center justify-between bg-red-50 px-3 py-2 text-sm text-red-600">
                <span>{error}</span>
                <button onClick={() => setErrorDismissed(true)} className="text-red-400 hover:text-red-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Date Picker Overlay */}
            {showDatePicker && (
              <div className="absolute inset-x-0 bottom-0 top-[120px] z-10 flex items-start justify-center overflow-y-auto bg-white/95 p-4 backdrop-blur-sm">
                <AriaDatePicker
                  language={language}
                  onBookingComplete={handleBookingComplete}
                  onCancel={() => setShowDatePicker(false)}
                  existingPhone={leadData?.phone}
                  existingName={leadData?.name}
                />
              </div>
            )}

            {/* Chat Messages */}
            <AriaChat
              messages={messages}
              isStreaming={isStreaming}
              language={language}
              onQuickActionClick={handleQuickAction}
            />

            {/* Input Area */}
            <AriaInput
              language={language}
              leadStage={leadStage}
              isStreaming={isStreaming}
              onSendMessage={handleSendMessage}
              onSubmitLeadField={submitLeadField}
              onToggleLanguage={toggleLanguage}
              disabled={showDatePicker}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
