'use client'

/**
 * /book-free-demo
 *
 * Google Ads landing page. The page exists for one reason: capture a
 * context-rich lead and deliver them to WhatsApp with the right info already
 * attached. No outbound links, no auto-redirect (Ads-policy risk + Quality-
 * Score hit), one unified responsive component (no mobile/desktop branch).
 */

import { useMemo, useState } from 'react'
import { CheckCircle, Clock, MessageCircle, Phone, Sparkles } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

type Track = 'NEET' | 'Boards' | 'Olympiad' | 'All-round'
type Mode = 'Online' | 'Offline' | 'Either'
type ClassLevel = 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'Dropper'

export default function BookFreeDemoPage() {
  const [classLevel, setClassLevel] = useState<ClassLevel>('Class 11')
  const [track, setTrack] = useState<Track>('NEET')
  const [mode, setMode] = useState<Mode>('Either')

  // Context-rich WhatsApp message built from selections. Counsellor opens the
  // chat with the right grade, exam track, and mode preference already known —
  // no discovery questions needed.
  const message = useMemo(() => {
    const lines = [
      `Hi! I want to book a FREE demo class at Cerebrum Biology Academy.`,
      ``,
      `Class: ${classLevel}`,
      `Track: ${track === 'All-round' ? 'NEET + Boards + Olympiad foundation' : track}`,
      `Preferred mode: ${
        mode === 'Offline'
          ? 'Offline (South Delhi / Gurugram / Faridabad — please advise nearest centre)'
          : mode === 'Online'
            ? 'Online'
            : 'Either online or offline — please advise'
      }`,
      ``,
      `Please confirm an available demo slot.`,
    ]
    return lines.join('\n')
  }, [classLevel, track, mode])

  const handleWhatsApp = () => {
    void trackAndOpenWhatsApp({
      source: 'book-free-demo-page',
      message,
      campaign: 'demo-booking',
      buttonText: `${classLevel} · ${track} · ${mode}`,
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e8ede8] via-white to-[#f3f6f3]">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 md:py-16">
        {/* Heading */}
        <div className="mb-6 text-center sm:mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3d4d3d]/20 bg-white px-3 py-1 text-xs font-medium text-[#3d4d3d] sm:text-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>An AIIMSonian&apos;s Initiative</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Book a <span className="text-[#3d4d3d]">free demo class</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600 sm:text-base">
            Tell us about you in two taps. We&apos;ll WhatsApp you back with the right batch
            schedule and a faculty introduction.
          </p>
        </div>

        {/* Capture card — single responsive surface (no mobile/desktop branch) */}
        <div className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-gray-200 sm:p-7 md:p-8">
          {/* Class selector */}
          <div className="mb-4">
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Which class?
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {(['Class 9', 'Class 10', 'Class 11', 'Class 12', 'Dropper'] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClassLevel(c)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                    classLevel === c
                      ? 'bg-[#3d4d3d] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Track selector */}
          <div className="mb-4">
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Goal
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {(['NEET', 'Boards', 'Olympiad', 'All-round'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTrack(t)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                    track === t
                      ? 'bg-[#3d4d3d] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Mode selector */}
          <div className="mb-6">
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Mode
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {(['Online', 'Offline', 'Either'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                    mode === m
                      ? 'bg-[#3d4d3d] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {m === 'Offline' ? 'Offline (Delhi NCR)' : m}
                </button>
              ))}
            </div>
          </div>

          {/* Primary CTA — WhatsApp with full context attached */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-[#20BD5A] hover:shadow-xl touch-manipulation sm:text-lg"
          >
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            <span>Book demo on WhatsApp</span>
          </button>

          {/* Secondary CTA — Call. Forest green to match brand system. */}
          <a
            href={`tel:${CONTACT_INFO.phone.primary.replace(/[^+\d]/g, '')}`}
            className="mt-3 inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl border-2 border-[#3d4d3d] bg-white px-6 py-4 text-base font-bold text-[#3d4d3d] transition-all hover:bg-[#e8ede8] touch-manipulation sm:text-lg"
          >
            <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
            <span>Or call +91 88264 44334</span>
          </a>

          {/* Fee anchor — qualifies the lead before they tap. Single line. */}
          <p className="mt-4 text-center text-xs text-gray-500 sm:text-sm">
            Course fees from ₹70,000 / year · EMI from ₹6,250 / month · merit scholarships
            available
          </p>
        </div>

        {/* Trust + assurance strip */}
        <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
            <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#3d4d3d]">
              <CheckCircle className="h-4 w-4" />
              What you get on the demo
            </div>
            <p className="text-xs text-gray-600 sm:text-sm">
              45 minutes of live teaching with our biology faculty + a previous-year-attempt
              diagnostic if you&apos;re a Class 12 / Dropper student. No payment, no commitment.
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
            <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#3d4d3d]">
              <Clock className="h-4 w-4" />
              When we respond
            </div>
            <p className="text-xs text-gray-600 sm:text-sm">
              Within 15 minutes between 9 AM – 9 PM IST. Outside those hours we reply first thing
              the next morning.
            </p>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-6 rounded-xl bg-white p-5 ring-1 ring-gray-200 sm:p-6">
          <div className="mb-3 text-sm font-semibold text-[#3d4d3d]">Why Cerebrum</div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              'AIIMS-trained faculty led by Dr. Shekhar',
              'Biology only — depth, not breadth',
              'Small batches: 10 – 25 students',
              'Daily doubt-clearing sessions',
              'Centres at South Delhi (South Extension), Gurugram, Faridabad',
              'Online classes available globally',
              'Coverage: Class 9, 10, 11, 12, Droppers · NEET / Boards / Olympiad',
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#3d4d3d]" />
                <span className="text-xs text-gray-700 sm:text-sm">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quiet privacy footer — replaces the "Back to Home" outbound which
            was a bounce path on a paid Ads landing page. */}
        <p className="mt-6 text-center text-[11px] text-gray-400">
          By tapping a CTA you agree to receive WhatsApp messages from Cerebrum Biology Academy.
          We don&apos;t spam — counsellors message once and follow up only after you reply.
        </p>
      </div>
    </main>
  )
}
