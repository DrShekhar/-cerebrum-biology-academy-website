'use client'

/**
 * OlympiadLeadForm — client component.
 * Posts to /api/contact/inquiry (existing Interakt + admin-notification pipeline)
 * and falls through to wa.me on success or error so the conversation continues.
 *
 * Reuses existing endpoint — no new API route, no new dependency.
 */

import { useCallback, useState } from 'react'
import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface OlympiadLeadFormProps {
  /** Source tag — "olympiad-{country-slug}" or "olympiad-hub". */
  source: string
  /** Display label for the country, used inside the WhatsApp message + admin tag. */
  countryLabel?: string
  /** Optional heading override. */
  heading?: string
}

const COURSES = ['Olympiad Foundation (Grade 9-10)', 'Olympiad + IBO (Grade 11-12)', 'Pre-Med Foundation', 'Not sure yet']

export function OlympiadLeadForm({ source, countryLabel, heading }: OlympiadLeadFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState(COURSES[1])
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const buildWhatsAppMessage = useCallback(() => {
    const lines = [
      `Hi Cerebrum, I would like to enquire about the Biology Olympiad & IBO programme${
        countryLabel ? ` (${countryLabel})` : ''
      }.`,
      '',
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
    ]
    if (email.trim()) lines.push(`Email: ${email.trim()}`)
    lines.push(`Track: ${course}`)
    if (countryLabel) lines.push(`Country: ${countryLabel}`)
    if (message.trim()) lines.push(`Note: ${message.trim()}`)
    return lines.join('\n')
  }, [name, phone, email, course, message, countryLabel])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return
    setError(null)

    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    const digits = phone.replace(/[^\d]/g, '')
    if (digits.length < 8) {
      setError('Please enter a valid phone number.')
      return
    }

    setSubmitting(true)

    // Fire the Interakt + admin pipeline in the background — failures are
    // non-blocking. The WhatsApp redirect happens regardless so the lead doesn't
    // get stuck on a network error.
    try {
      void fetch('/api/contact/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          message: `[Olympiad lead] Track: ${course}${
            countryLabel ? ` · Country: ${countryLabel}` : ''
          }${message.trim() ? ` · Note: ${message.trim()}` : ''}`,
          source,
          subject: `Olympiad enquiry${countryLabel ? ` — ${countryLabel}` : ''}`,
        }),
      }).catch(() => {
        // swallow — wa.me fallback below covers the user
      })
    } catch {
      // ignore — wa.me fallback covers the user
    }

    // Track on the client. The page-level analytics already covers gtag.
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void }
      w.gtag?.('event', 'generate_lead', {
        method: 'whatsapp',
        source,
        course,
      })
    }

    // Open WhatsApp with the lead context pre-filled.
    const encoded = encodeURIComponent(buildWhatsAppMessage())
    window.open(
      `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encoded}`,
      '_blank',
      'noopener,noreferrer'
    )

    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border-2 border-[#6B5DC6] bg-white p-8 text-center shadow-xl">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-[#6B5DC6]" />
        <h3 className="text-xl font-bold text-[#2C2C2C]">Thanks, {name.split(' ')[0]}.</h3>
        <p className="mt-3 text-sm text-slate-600">
          We&apos;ve opened WhatsApp with your details ready to send. Tap send there to confirm —
          we usually respond within 15 minutes during working hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium text-[#6B5DC6] underline-offset-2 hover:underline"
        >
          Edit my details
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8"
      aria-label="Biology Olympiad enquiry form"
    >
      <h3 className="text-xl font-bold text-[#2C2C2C]">
        {heading ?? 'Book a free counselling call'}
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        We respond within 15 minutes during working hours.
      </p>

      {/* Honeypot — hidden from real users. */}
      <input
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        name="company"
      />

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="oly-name" className="mb-1 block text-xs font-medium text-slate-700">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            id="oly-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#6B5DC6] focus:outline-none focus:ring-2 focus:ring-[#6B5DC6]/30"
          />
        </div>

        <div>
          <label htmlFor="oly-phone" className="mb-1 block text-xs font-medium text-slate-700">
            Phone (with country code) <span className="text-red-500">*</span>
          </label>
          <input
            id="oly-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            placeholder="+1 555 123 4567"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#6B5DC6] focus:outline-none focus:ring-2 focus:ring-[#6B5DC6]/30"
          />
        </div>

        <div>
          <label htmlFor="oly-email" className="mb-1 block text-xs font-medium text-slate-700">
            Email (optional)
          </label>
          <input
            id="oly-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#6B5DC6] focus:outline-none focus:ring-2 focus:ring-[#6B5DC6]/30"
          />
        </div>

        <div>
          <label htmlFor="oly-course" className="mb-1 block text-xs font-medium text-slate-700">
            Track
          </label>
          <select
            id="oly-course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#6B5DC6] focus:outline-none focus:ring-2 focus:ring-[#6B5DC6]/30"
          >
            {COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="oly-message" className="mb-1 block text-xs font-medium text-slate-700">
            Anything specific to share? (optional)
          </label>
          <textarea
            id="oly-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#6B5DC6] focus:outline-none focus:ring-2 focus:ring-[#6B5DC6]/30"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#6B5DC6] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#5a4fb0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Connecting…
            </>
          ) : (
            <>
              <MessageCircle className="h-4 w-4" />
              Send via WhatsApp
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-500">
          By submitting, you agree to receive WhatsApp messages from Cerebrum Biology Academy.
        </p>
      </div>
    </form>
  )
}
