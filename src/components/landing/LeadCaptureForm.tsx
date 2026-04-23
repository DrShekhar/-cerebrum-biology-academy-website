'use client'

import { useState } from 'react'
import { Phone, MessageCircle, ArrowRight } from 'lucide-react'

const COURSES = [
  'Class 9 (Foundation)',
  'Class 10 (Boards)',
  'Class 11 (Boards + NEET)',
  'Class 12 (Boards + NEET)',
  'NEET Dropper',
  'IB / IGCSE Biology',
  'Not sure yet',
]

const MODES = ['Offline at a centre', 'Online from home', 'Hybrid', 'Help me decide']

const WHATSAPP_NUMBER = '918826444334'
const PHONE_NUMBER = '+91-88264-44334'

type SubmitAction = 'whatsapp' | 'call'

interface LeadCaptureFormProps {
  variant?: 'inline' | 'card'
  source: string
  campaign: string
  heading?: string
  subheading?: string
}

export function LeadCaptureForm({
  variant = 'card',
  source,
  campaign,
  heading = 'Book a free demo class',
  subheading = 'We will reach out within 15 minutes.',
}: LeadCaptureFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [course, setCourse] = useState(COURSES[0])
  const [mode, setMode] = useState(MODES[0])
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [lastAction, setLastAction] = useState<SubmitAction | null>(null)
  const [error, setError] = useState<string | null>(null)

  const track = (action: SubmitAction) => {
    const params = {
      method: action,
      source,
      campaign,
      course,
      mode,
    }
    window.gtag?.('event', 'generate_lead', params)
    window.dataLayer?.push({
      event: 'lead_form_submit',
      lead_method: action,
      lead_source: source,
      lead_campaign: campaign,
      lead_course: course,
      lead_mode: mode,
    })
  }

  const validate = (): string | null => {
    if (!name.trim()) return 'Please enter your name.'
    const digits = phone.replace(/[^\d]/g, '')
    if (digits.length < 10) return 'Please enter a 10-digit mobile number.'
    if (honeypot) return 'Submission blocked.'
    return null
  }

  const handleSubmit = (action: SubmitAction) => (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (err) {
      setError(err)
      return
    }
    setError(null)
    setSubmitting(true)

    track(action)

    if (action === 'whatsapp') {
      const lines = [
        `Hi Cerebrum, I would like a free demo class.`,
        ``,
        `Name: ${name.trim()}`,
        `Phone: ${phone.trim()}`,
        `Course: ${course}`,
        `Preferred mode: ${mode}`,
      ]
      if (message.trim()) {
        lines.push(`Note: ${message.trim()}`)
      }
      const encoded = encodeURIComponent(lines.join('\n'))
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`,
        '_blank',
        'noopener,noreferrer'
      )
    } else {
      window.location.href = `tel:${PHONE_NUMBER.replace(/[^\d+]/g, '')}`
    }

    setLastAction(action)
    setSubmitted(true)
    setSubmitting(false)
  }

  const containerStyle =
    variant === 'card'
      ? 'rounded-2xl bg-white p-6 sm:p-8 shadow-xl ring-1 ring-slate-200'
      : 'rounded-2xl bg-white/95 p-6 sm:p-8 backdrop-blur'

  if (submitted) {
    const whatsappText = encodeURIComponent(
      `Hi Cerebrum, I would like a free demo class.\n\nName: ${name.trim()}\nPhone: ${phone.trim()}\nCourse: ${course}\nPreferred mode: ${mode}${
        message.trim() ? `\nNote: ${message.trim()}` : ''
      }`
    )
    return (
      <div className={containerStyle}>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-6 w-6 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Thanks, {name.split(' ')[0]}.</h3>
          <p className="mt-2 text-sm text-slate-600">
            {lastAction === 'whatsapp'
              ? 'We have opened WhatsApp with your details ready to send. Tap send there to confirm.'
              : 'We are calling you now. If the call does not connect, we will call back within 15 minutes.'}
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <MessageCircle size={16} />
              Reopen WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Edit my details
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={containerStyle}>
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-slate-900">{heading}</h3>
        <p className="mt-1 text-sm text-slate-600">{subheading}</p>
      </div>

      <form className="space-y-4" noValidate>
        {/* Honeypot — hidden from users, catches bots */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
          <label>
            Do not fill this field
            <input
              type="text"
              name="company"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div>
          <label htmlFor="lead-name" className="mb-1 block text-xs font-medium text-slate-700">
            Full name
          </label>
          <input
            id="lead-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            placeholder="e.g. Ananya Sharma"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div>
          <label htmlFor="lead-phone" className="mb-1 block text-xs font-medium text-slate-700">
            Mobile (WhatsApp)
          </label>
          <input
            id="lead-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="lead-course" className="mb-1 block text-xs font-medium text-slate-700">
              Course
            </label>
            <select
              id="lead-course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="lead-mode" className="mb-1 block text-xs font-medium text-slate-700">
              Preferred mode
            </label>
            <select
              id="lead-mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="lead-message" className="mb-1 block text-xs font-medium text-slate-700">
            Anything specific? (optional)
          </label>
          <textarea
            id="lead-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            placeholder="Target score, exam year, current school, etc."
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="submit"
            onClick={handleSubmit('whatsapp')}
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-60"
          >
            <MessageCircle size={18} />
            Send on WhatsApp
          </button>
          <button
            type="button"
            onClick={handleSubmit('call')}
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-60"
          >
            <Phone size={18} />
            Call me now
          </button>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <ArrowRight size={12} />
          You stay on this page. WhatsApp or phone opens with your details pre-filled.
        </p>
      </form>
    </div>
  )
}
