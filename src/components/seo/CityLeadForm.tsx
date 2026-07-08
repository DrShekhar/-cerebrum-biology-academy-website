'use client'

/**
 * CityLeadForm — inline NEET lead-capture form for city hub/landing pages
 * (Faridabad, Gurugram, etc.).
 *
 * Why it exists: every city page was WhatsApp-only (a wa.me link with no city
 * tag), so a visitor from Faridabad who enquired became an untagged WHATSAPP
 * lead — the city origin was lost, and the ~200 city SEO pages produced zero
 * attributable leads. This form posts to /api/enquiry with an explicit
 * per-city source (`city-hub:faridabad`) so every lead is attributed to the
 * page that produced it, and the WhatsApp fallback carries the city too.
 */

import { useState, type FormEvent } from 'react'
import { User, Phone, GraduationCap, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { isMobileDevice, openDesktopWhatsAppModal } from '@/lib/whatsapp/tracking'

const GOALS = [
  'NEET Dropper (Repeater)',
  'Class 12 → NEET',
  'Class 11 → NEET',
  'Class 9/10 Foundation',
  'Just exploring',
]

interface CityLeadFormProps {
  /** Display name, e.g. "Faridabad". */
  city: string
  /** URL slug used in the source tag, e.g. "faridabad". */
  citySlug: string
  title?: string
  subtitle?: string
  /** Accent to match the host page (tailwind color base, e.g. "blue" | "green"). */
  accent?: 'blue' | 'green' | 'indigo' | 'teal'
}

const ACCENTS: Record<string, { btn: string; ring: string; icon: string }> = {
  blue: {
    btn: 'bg-blue-600 hover:bg-blue-700',
    ring: 'focus:ring-blue-500/30 focus:border-blue-600',
    icon: 'text-blue-600',
  },
  green: {
    btn: 'bg-green-700 hover:bg-green-800',
    ring: 'focus:ring-green-500/30 focus:border-green-600',
    icon: 'text-green-700',
  },
  indigo: {
    btn: 'bg-indigo-600 hover:bg-indigo-700',
    ring: 'focus:ring-indigo-500/30 focus:border-indigo-600',
    icon: 'text-indigo-600',
  },
  teal: {
    btn: 'bg-teal-600 hover:bg-teal-700',
    ring: 'focus:ring-teal-500/30 focus:border-teal-600',
    icon: 'text-teal-600',
  },
}

export function CityLeadForm({
  city,
  citySlug,
  title,
  subtitle,
  accent = 'blue',
}: CityLeadFormProps) {
  const a = ACCENTS[accent] || ACCENTS.blue
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [goal, setGoal] = useState('')
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
    if (digits.length < 10 || digits.length > 13) {
      setErrorMsg('Please enter a valid phone number.')
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
          area: city,
          message: `NEET enquiry from ${city}. Goal: ${goal || 'Not specified'}.`,
          // Per-city attribution — this is the whole point of the form.
          source: `city-hub:${citySlug}${goal ? `:${goal}` : ''}`,
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
        const waMessage = `Hi! I'm from ${city} and interested in NEET Biology coaching. Goal: ${goal || 'Not specified'}.`
        if (isMobileDevice()) {
          setTimeout(() => {
            window.location.href = json.whatsappUrl
          }, 600)
        } else {
          setTimeout(() => {
            openDesktopWhatsAppModal(json.whatsappUrl, waMessage, `city-hub:${citySlug}`)
          }, 300)
        }
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again or use WhatsApp.')
    }
  }

  const inputCls = `block w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-3 text-base text-slate-900 placeholder-slate-400 outline-none transition ${a.ring} min-h-[48px]`

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow-lg ring-1 ring-slate-200">
        <CheckCircle2 className={`mx-auto h-12 w-12 ${a.icon}`} />
        <h3 className="mt-3 text-lg font-bold text-slate-900">Thank you!</h3>
        <p className="mt-1 text-sm text-slate-600">
          Our {city} counsellor will call you shortly. We&apos;re also opening WhatsApp so you can
          message us right away.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-slate-200 sm:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
          {title || `Free NEET Biology demo — ${city}`}
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          {subtitle ||
            `Leave your details — our ${city} counsellor calls you the same day to book a free trial class with an AIIMS-trained faculty.`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student / parent name"
            aria-label="Name"
            className={inputCls}
            autoComplete="name"
          />
        </div>
        <div className="relative">
          <Phone className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone / WhatsApp number"
            aria-label="Phone"
            inputMode="tel"
            autoComplete="tel"
            className={inputCls}
          />
        </div>
        <div className="relative">
          <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            aria-label="Goal"
            className={`${inputCls} appearance-none`}
          >
            <option value="">Which best describes you?</option>
            {GOALS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition disabled:opacity-60 ${a.btn}`}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Book my free demo
            </>
          )}
        </button>
        <p className="text-center text-xs text-slate-400">
          Prefer WhatsApp? Submitting opens a chat pre-filled with your {city} enquiry.
        </p>
      </form>
    </div>
  )
}
