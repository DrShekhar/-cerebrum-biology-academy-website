'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { X, MessageCircle } from 'lucide-react'

const SESSION_KEY = 'cerebrum_wa_gate_done'

interface PendingWhatsApp {
  resolve: () => void
}

export function WhatsAppLeadGate() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const pendingRef = useRef<PendingWhatsApp | null>(null)

  const isGateCompleted = useCallback(() => {
    if (typeof sessionStorage === 'undefined') return false
    return sessionStorage.getItem(SESSION_KEY) === '1'
  }, [])

  const markGateCompleted = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {}
  }, [])

  useEffect(() => {
    function handleLeadGate(e: Event) {
      const detail = (e as CustomEvent).detail as
        | { intercepted: boolean; resolve: () => void }
        | undefined
      if (!detail?.resolve) return

      detail.intercepted = true

      if (isGateCompleted()) {
        detail.resolve()
        return
      }

      pendingRef.current = { resolve: detail.resolve }
      setIsOpen(true)
    }

    window.addEventListener('cerebrum:whatsapp-lead-gate', handleLeadGate)
    return () => window.removeEventListener('cerebrum:whatsapp-lead-gate', handleLeadGate)
  }, [isGateCompleted])

  const proceed = useCallback(() => {
    setIsOpen(false)
    markGateCompleted()
    if (pendingRef.current) {
      pendingRef.current.resolve()
      pendingRef.current = null
    }
  }, [markGateCompleted])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError('')

      const cleanPhone = phone.replace(/\D/g, '').slice(-10)
      if (cleanPhone.length !== 10) {
        setError('Please enter a valid 10-digit phone number')
        return
      }

      setSubmitting(true)
      try {
        await fetch('/api/leads/whatsapp-gate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim() || undefined,
            phone: cleanPhone,
            page: typeof window !== 'undefined' ? window.location.pathname : '/',
          }),
        })
      } catch {}

      setSubmitting(false)
      proceed()
    },
    [name, phone, proceed]
  )

  const handleSkip = useCallback(() => {
    proceed()
  }, [proceed])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleSkip()
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-fade-in-up">
        <button
          onClick={handleSkip}
          className="absolute top-2 right-2 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors touch-manipulation"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Chat with us</h3>
            <p className="text-sm text-gray-500">So we can follow up if the chat drops</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 min-h-[48px] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            autoComplete="name"
          />
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Phone number *"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              setError('')
            }}
            className={`w-full px-4 py-3 min-h-[48px] border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
              error
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:ring-green-500'
            }`}
            autoComplete="tel"
            aria-invalid={error ? 'true' : undefined}
            required
          />
          {error && <p className="text-red-500 text-xs" role="alert">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 min-h-[48px] rounded-lg text-sm transition-colors disabled:opacity-60"
          >
            {submitting ? 'Opening WhatsApp...' : 'Continue to WhatsApp'}
          </button>
        </form>

        <button
          onClick={handleSkip}
          className="w-full mt-2 text-center text-sm text-gray-400 hover:text-gray-600 transition-colors py-2 min-h-[44px]"
        >
          Skip, go to WhatsApp →
        </button>
      </div>
    </div>
  )
}
