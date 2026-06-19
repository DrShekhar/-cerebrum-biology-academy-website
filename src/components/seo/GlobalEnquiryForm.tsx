'use client'

/**
 * GlobalEnquiryForm — universal lead-capture form for the global hub pages
 * (/global, /international, /best-biology-tutor-global,
 * /online-biology-classes-international).
 *
 * Why it exists: those hubs were WhatsApp-only, so non-WhatsApp visitors
 * (a large share of US/UK families) had no capture path. This form posts to
 * /api/enquiry (which accepts international phone numbers, keeps the country
 * code, saves the lead, and returns a pre-filled admin WhatsApp URL).
 *
 * Deliberately NOT NEET/diaspora-framed — universal copy, a programme picker
 * spanning IB / AP / A-Level / MCAT / GAMSAT / USABO / NEET etc., and a country
 * field. Accepts any nationality.
 */

import { useState, type FormEvent } from 'react'
import { User, Mail, Phone, Globe, Send, Loader2, CheckCircle2 } from 'lucide-react'

const PROGRAMMES = [
  'IB Biology (HL/SL)',
  'AP Biology',
  'A-Level Biology',
  'GCSE / IGCSE Biology',
  'MCAT Biology & Biochemistry',
  'GAMSAT',
  'USMLE Step 1 Biology',
  'USABO / IBO / Biology Olympiad',
  'Brain Bee (Neuroscience)',
  'NEET Biology',
  'Other / Not sure',
]

interface GlobalEnquiryFormProps {
  title?: string
  subtitle?: string
  source?: string
}

export function GlobalEnquiryForm({ title, subtitle, source = 'global-hub' }: GlobalEnquiryFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [programme, setProgramme] = useState('')
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
    if (digits.length < 8 || digits.length > 15) {
      setErrorMsg('Please enter a valid phone number with your country code.')
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
          email: email.trim() || undefined,
          area: country.trim() || undefined,
          message: `Programme: ${programme || 'Not specified'}. Country: ${country.trim() || 'Not specified'}.`,
          source: `${source}${programme ? `:${programme}` : ''}`,
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

  const inputCls =
    'block w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-3 text-base text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-500/30 min-h-[48px]'

  return (
    <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-slate-200 sm:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
          {title || 'Book a free trial with a biology specialist'}
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          {subtitle ||
            'Any nationality, any country, any biology exam. Leave your details — we reply within a day and match you to the right tutor and time zone.'}
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
            Thank you! We&apos;ll be in touch. Opening WhatsApp to confirm — please tap{' '}
            <strong>Send</strong>.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          <div className="relative">
            <User
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <label htmlFor="gef-name" className="sr-only">
              Your name
            </label>
            <input
              id="gef-name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputCls}
              style={{ fontSize: '16px' }}
            />
          </div>

          <div className="relative">
            <Phone
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <label htmlFor="gef-phone" className="sr-only">
              Phone with country code
            </label>
            <input
              id="gef-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (with country code, e.g. +1, +44)"
              className={inputCls}
              style={{ fontSize: '16px' }}
            />
          </div>

          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <label htmlFor="gef-email" className="sr-only">
              Email (optional)
            </label>
            <input
              id="gef-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className={inputCls}
              style={{ fontSize: '16px' }}
            />
          </div>

          <div className="relative">
            <Globe
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <label htmlFor="gef-country" className="sr-only">
              Country
            </label>
            <input
              id="gef-country"
              type="text"
              autoComplete="country-name"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country (e.g. USA, UK, UAE)"
              className={inputCls}
              style={{ fontSize: '16px' }}
            />
          </div>

          <div>
            <label htmlFor="gef-programme" className="sr-only">
              Which biology exam or programme?
            </label>
            <select
              id="gef-programme"
              value={programme}
              onChange={(e) => setProgramme(e.target.value)}
              className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-500/30 min-h-[48px]"
              style={{ fontSize: '16px' }}
            >
              <option value="">Which exam / programme?</option>
              {PROGRAMMES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {errorMsg && (
            <p role="alert" className="text-sm text-red-600">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-70 min-h-[48px]"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Submitting…
              </>
            ) : (
              <>
                <Send className="h-5 w-5" aria-hidden="true" />
                Request a free trial
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-500">
            We reply within a day. Your details are used only to arrange your trial — no spam.
          </p>
        </form>
      )}
    </div>
  )
}
