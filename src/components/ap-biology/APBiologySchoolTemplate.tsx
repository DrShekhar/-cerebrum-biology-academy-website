'use client'

/**
 * APBiologySchoolTemplate
 *
 * Shared, props-driven UI for per-school AP Biology landing pages
 * (e.g. /ap-biology-tutor-tjhsst, /ap-biology-tutor-stuyvesant).
 *
 * Trademark + thin-content guardrails (per the AP Biology US plan):
 *  - Never display logos, seals, or "endorsed by [school]" framing.
 *    Phrasing is descriptive: "AP Biology tutoring for {school}
 *    students" or "near {school}".
 *  - Each school page renders 800+ words of school-specific content
 *    via the `historyParagraphs`, `reputationBullets`, `usaboRecord`,
 *    `collegeContext`, `paceAlignment`, and `faqs` props. We do not
 *    boilerplate beyond the cross-link footer.
 *  - The footer trust strip explicitly disclaims affiliation.
 */

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  GraduationCap,
  Home,
  Library,
  MessageCircle,
  Phone,
  School,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import type { APBiologySchool } from '@/data/ap-biology/schools'
import { getMetroBySlug } from '@/data/ap-biology/metros'

interface APBiologySchoolTemplateProps {
  school: APBiologySchool
}

const pricingTiers = [
  {
    name: 'Senior Faculty 1:1',
    price: '$1,800 – $5,760',
    perHour: '$120–$150/hr',
    detail: '12 / 24 / 36 / 48-hour packages with AIIMS-trained biology specialists',
  },
  {
    name: 'Junior Faculty 1:1',
    price: '$900 – $2,880',
    perHour: '$60–$75/hr',
    detail: '12 / 24 / 36 / 48-hour packages',
  },
  {
    name: 'Small Batch (4–6 students)',
    price: '$640 – $1,600',
    perHour: '$40/hr flat',
    detail: '16 / 24 / 32 / 40-hour group programmes',
  },
]

// Compact pricing summary for WhatsApp pre-fills.
const pricingSummary = pricingTiers.map((t) => `• ${t.name} — ${t.price} (${t.perHour})`).join('\n')

export default function APBiologySchoolTemplate({ school }: APBiologySchoolTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Look up the parent metro so the breadcrumb can display the correct
  // metro name (e.g. "Northern Virginia / DC") and link to the matching
  // metro page. Falls back to a state-derived label if the metro is
  // missing from the config (shouldn't happen — every school has a
  // metroSlug — but defensive).
  const metro = getMetroBySlug(school.metroSlug)
  const metroLabel =
    metro?.cityName || school.cityState.split(',').pop()?.trim() || school.cityState

  // Hero CTA — counsellor receives the school the student attends + the
  // full pricing menu they were just shown, so the conversation starts
  // with shared context, not discovery questions.
  const handleWhatsApp = () => {
    const message = [
      `Hi! My child is at ${school.shortName} (${school.cityState}) and we are exploring AP Biology tutoring.`,
      ``,
      `Course: AP Biology (College Board, May exam)`,
      `Pricing tiers I'm considering:`,
      pricingSummary,
      ``,
      `Please share batch start, schedule, and which tier fits my goals (AP-5 only / AP-5 + USABO Semifinal).`,
    ].join('\n')
    trackAndOpenWhatsApp({
      source: `ap-bio-school-${school.slug}`,
      message,
      campaign: `ap-bio-school-${school.slug}`,
    })
  }

  // Per-tier CTA — fired from a specific pricing card.
  const handleTierWhatsApp = (tier: (typeof pricingTiers)[number]) => {
    const message = [
      `Hi! My child is at ${school.shortName} (${school.cityState}) and we want to enroll in AP Biology — ${tier.name}.`,
      ``,
      `Tier: ${tier.name}`,
      `Price: ${tier.price} (${tier.perHour})`,
      `Detail: ${tier.detail}`,
      ``,
      `Please confirm availability, batch start, and next steps.`,
    ].join('\n')
    const tierSlug = tier.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    trackAndOpenWhatsApp({
      source: `ap-bio-school-${school.slug}-tier-${tierSlug}`,
      message,
      campaign: `ap-bio-school-${school.slug}-tier`,
    })
  }

  const counsellingMessage = [
    `Hi! I want to book a free AP Biology counselling call.`,
    ``,
    `School: ${school.shortName} (${school.cityState})`,
    `Course: AP Biology (College Board, May exam)`,
    `Pricing tiers I've seen:`,
    pricingSummary,
    ``,
    `Please share available US-time slots.`,
  ].join('\n')
  const counsellingHref = `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(counsellingMessage)}`

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-blue-700">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link href="/ap-biology-tutor" className="text-gray-600 hover:text-blue-700">
                AP Biology Tutoring
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link
                href={`/ap-biology-tutor-${school.metroSlug}`}
                className="text-gray-600 hover:text-blue-700"
              >
                {metroLabel}
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-blue-700 font-medium">{school.shortName}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <School className="w-4 h-4" />
            For {school.shortName} students
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            AP Biology Tutoring for{' '}
            <span className="block text-yellow-400 mt-2">{school.shortName} Students</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-3 max-w-3xl" data-speakable="summary">
            <strong className="text-white">{school.schoolName}</strong> — {school.cityState}
          </p>
          <p className="text-sm text-slate-400 mb-8 max-w-3xl">
            School type: {school.schoolType} · Live coaching in {school.timezone}
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              <Clock className="w-4 h-4 text-yellow-400" />
              {school.timezone} live classes
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              <GraduationCap className="w-4 h-4 text-yellow-400" />
              AIIMS-trained biology faculty
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              <Target className="w-4 h-4 text-yellow-400" />
              FRQ rubric mastery
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              <TrendingUp className="w-4 h-4 text-yellow-400" />
              AP-5 + USABO Semifinal track
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <a
              href={counsellingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-lg font-semibold transition"
            >
              <MessageCircle className="w-5 h-5" />
              Book free counselling
            </a>
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium border border-white/30 transition"
            >
              <Phone className="w-5 h-5" />
              WhatsApp +91-88264-44334
            </button>
          </div>
        </div>
      </section>

      {/* About the school */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Library className="w-7 h-7 text-blue-700" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              About {school.shortName}
            </h2>
          </div>
          {school.historyParagraphs.map((para, idx) => (
            <p key={idx} className="text-slate-700 leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Reputation bullets */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-7 h-7 text-blue-700" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {school.shortName} — public record
            </h2>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            Sourced from publicly available rankings (US News, Niche, Boarding School Review), CEE /
            USABO TRC press releases, and the school&apos;s own publications.
          </p>
          <ul className="space-y-3">
            {school.reputationBullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <span className="text-slate-800">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* USABO record (only if provided) */}
      {school.usaboRecord && (
        <section className="py-12 md:py-16 bg-yellow-50 border-y-2 border-yellow-200">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-7 h-7 text-yellow-700" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                USABO record at {school.shortName}
              </h2>
            </div>
            <p className="text-slate-800 leading-relaxed">{school.usaboRecord}</p>
          </div>
        </section>
      )}

      {/* College matriculation context */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-7 h-7 text-blue-700" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              College matriculation context
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed">{school.collegeContext}</p>
        </div>
      </section>

      {/* Pace alignment */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-7 h-7 text-blue-700" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              How our coaching fits {school.shortName}&apos;s AP Bio pace
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed">{school.paceAlignment}</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            AP Biology tutoring — transparent USD pricing
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Pay-as-you-go hour packages. Same pricing nationwide.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 hover:shadow-md transition flex flex-col"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-1">{tier.name}</h3>
                <p className="text-2xl font-bold text-blue-700 mb-1">{tier.price}</p>
                <p className="text-sm text-green-700 font-medium mb-3">{tier.perHour}</p>
                <p className="text-sm text-slate-600 flex-grow">{tier.detail}</p>
                <button
                  type="button"
                  onClick={() => handleTierWhatsApp(tier)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-4 py-2.5 text-sm transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  Get this package
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/ap-biology-online-tutor#pricing"
              className="text-sm font-semibold text-blue-700 hover:text-blue-900 underline"
            >
              See full package details →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 md:py-16 bg-slate-50" data-speakable="faq">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions — {school.shortName}
          </h2>
          <div className="space-y-3">
            {school.faqs.map((faq, idx) => (
              <div key={faq.question} className="bg-white rounded-xl border border-slate-200">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === idx}
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {/* Always rendered, collapsed with `hidden` rather than
                    conditionally mounted. These answers are also emitted as
                    FAQPage structured data, and Google requires that marked-up
                    content actually exist on the page — it renders JS but does
                    not click accordions, so a conditionally-mounted answer was
                    invisible to it while still being claimed in the schema. */}
                <div
                  className={`px-5 pb-5 text-sm text-slate-700 leading-relaxed faq-answer ${
                    openFaq === idx ? '' : 'hidden'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BookOpen className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            AP Biology tutoring for {school.shortName} students
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free 30-minute counselling call. We&apos;ll calibrate to your school&apos;s
            specific AP Bio pace and help you decide between AP-5 only or the integrated AP + USABO
            Semifinal track.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href={counsellingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              <MessageCircle className="w-5 h-5" />
              Book counselling call
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
            >
              <Phone className="w-5 h-5" />
              Call us
            </a>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Related guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href={`/ap-biology-tutor-${school.metroSlug}`}
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-blue-700">AP Bio for {metroLabel}</h3>
              <p className="text-xs text-slate-600 mt-1">Metro-level programme</p>
            </Link>
            <Link
              href="/ap-biology-tutor"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-blue-700">AP Biology Tutor (Hub)</h3>
              <p className="text-xs text-slate-600 mt-1">Main programme page</p>
            </Link>
            <Link
              href="/ap-biology-online-tutor"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-blue-700">Pricing & Packages</h3>
              <p className="text-xs text-slate-600 mt-1">USD packages, full detail</p>
            </Link>
            <Link
              href="/ap-biology-vs-usabo"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-blue-700">AP Biology vs USABO</h3>
              <p className="text-xs text-slate-600 mt-1">Decide your track</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-slate-500">
          <CheckCircle2 className="w-4 h-4 text-blue-700 inline mr-1" />
          Independent tutoring provider — not affiliated with <strong>{school.schoolName}</strong>,
          the College Board, or the AP Program. School name is used descriptively to indicate the
          audience this page is written for; no endorsement, sponsorship, or affiliation is implied.
          We coach the official AP Biology Course and Exam Description and use publicly published
          Free-Response and multiple-choice materials.
        </div>
      </section>
    </main>
  )
}
