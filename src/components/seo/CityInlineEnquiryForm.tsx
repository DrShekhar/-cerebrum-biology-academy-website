'use client'

/**
 * CityInlineEnquiryForm — 3-field inline lead capture for city/locality pages.
 *
 * Why it exists: the CityHubPage template historically only offered WhatsApp
 * + tel: CTAs. Desktop visitors without WhatsApp installed had no path to
 * become a lead. This component adds a server-validated form that, on
 * success, redirects to a pre-filled wa.me URL pointing at the admin's
 * WhatsApp — so the lead lands in two places (DB + admin's WhatsApp inbox)
 * regardless of whether any third-party notification API (Interakt, etc.)
 * is configured.
 *
 * Server contract: POSTs to /api/enquiry. Expects response shape:
 *   { success: true, enquiryId, whatsappUrl, message }
 *
 * Embed via:
 *   <CityInlineEnquiryForm cityName={data.cityName} slug={data.slug} />
 */

import { useState, type FormEvent } from 'react'
import { Phone, Send, MapPin, User, Loader2, CheckCircle2 } from 'lucide-react'

interface CityInlineEnquiryFormProps {
  cityName: string
  slug: string
  // Optional copy overrides — let pages tune the form for their context.
  title?: string
  subtitle?: string
  message?: string
}

export function CityInlineEnquiryForm({
  cityName,
  slug,
  title,
  subtitle,
  message: messageOverride,
}: CityInlineEnquiryFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [area, setArea] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg(null)

    if (name.trim().length < 2) {
      setErrorMsg('Please enter your name.')
      return
    }
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 10) {
      setErrorMsg('Please enter a valid phone number (10 digits or with country code).')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          area: area.trim() || cityName,
          message:
            messageOverride ||
            `Looking for NEET / Biology coaching in ${cityName}.${area ? ` Area: ${area}.` : ''}`,
          source: `city-hub-inline:${slug}`,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      })
      const json = await res.json()

      if (!res.ok || !json.success) {
        setStatus('error')
        setErrorMsg(json.error || 'Could not submit — please try WhatsApp instead.')
        return
      }

      setStatus('success')

      // Redirect to pre-filled WhatsApp so the lead also lands on the admin's
      // WhatsApp directly. Small delay so the success state is visible.
      if (json.whatsappUrl) {
        setTimeout(() => {
          window.location.href = json.whatsappUrl
        }, 600)
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again or use WhatsApp.')
    }
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-slate-200 sm:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
          {title || `Get a call back about NEET coaching in ${cityName}`}
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          {subtitle ||
            'Leave your name and phone — we will call you back today. Your info also opens WhatsApp to our team.'}
        </p>
      </div>

      {status === 'success' ? (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-4 text-green-900"
        >
          <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600" aria-hidden="true" />
          <div className="text-sm font-medium">
            Thank you! Opening WhatsApp to confirm — please tap <strong>Send</strong>.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          <div>
            <label htmlFor={`city-form-name-${slug}`} className="sr-only">
              Your name
            </label>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id={`city-form-name-${slug}`}
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-3 text-base text-slate-900 placeholder-slate-400 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-500/30 min-h-[48px]"
                style={{ fontSize: '16px' }} // prevent iOS zoom on focus
              />
            </div>
          </div>

          <div>
            <label htmlFor={`city-form-phone-${slug}`} className="sr-only">
              Phone (we'll call you back)
            </label>
            <div className="relative">
              <Phone
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id={`city-form-phone-${slug}`}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (with or without +91)"
                className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-3 text-base text-slate-900 placeholder-slate-400 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-500/30 min-h-[48px]"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          <div>
            <label htmlFor={`city-form-area-${slug}`} className="sr-only">
              Area or locality (optional)
            </label>
            <div className="relative">
              <MapPin
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id={`city-form-area-${slug}`}
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder={`Your area in ${cityName} (optional)`}
                className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-3 text-base text-slate-900 placeholder-slate-400 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-500/30 min-h-[48px]"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          {errorMsg && (
            <p role="alert" className="text-sm text-red-600">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-70 min-h-[48px]"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Submitting…
              </>
            ) : (
              <>
                <Send className="h-5 w-5" aria-hidden="true" />
                Send via WhatsApp
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-500">
            We don't spam — your info is used only to call you back about NEET coaching.
          </p>
        </form>
      )}
    </div>
  )
}
