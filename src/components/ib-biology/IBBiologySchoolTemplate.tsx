'use client'

/**
 * IBBiologySchoolTemplate
 *
 * Shared, props-driven UI for per-school IB Biology landing pages
 * (e.g. /ib-biology-tutor-uwcsea, /ib-biology-tutor-asd-dubai).
 *
 * Trademark + thin-content guardrails:
 *  - Never display logos, seals, or "endorsed by [school]" framing.
 *    Phrasing is descriptive: "IB Biology tutoring for {school}
 *    students" or "near {school}".
 *  - Each school page renders 800+ words of school-specific content
 *    via historyParagraphs, reputationBullets, diplomaContext,
 *    collegeContext, paceAlignment, and faqs. We do not boilerplate
 *    beyond the cross-link footer.
 *  - The footer trust strip explicitly disclaims affiliation with the
 *    school and with the International Baccalaureate Organization.
 *  - USD pricing only ($6,000 / $75 / $40) — these mirror the canonical
 *    IB Biology pricing matrix.
 */

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Crown,
  GraduationCap,
  Home,
  Library,
  MessageCircle,
  Microscope,
  Phone,
  School,
  Sparkles,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import type { IBBiologySchool } from '@/data/ib-biology/schools'

interface IBBiologySchoolTemplateProps {
  school: IBBiologySchool
}

const pricingTiers = [
  {
    id: 'complete-annual',
    name: 'Complete IB Biology Programme',
    price: '$6,000',
    perUnit: '/ year',
    detail:
      'HL + SL complete coverage, 150+ hours of live classes, small batch (4–8 students), IA guidance from topic to submission, past-paper bank, university guidance bonus.',
    highlight: true,
    icon: Crown,
  },
  {
    id: 'elite-1on1',
    name: '1:1 Elite Tutoring',
    price: '$75',
    perUnit: '/ hour',
    detail:
      'Examiner-led one-on-one. Best for targeted weaknesses, IA moderation-level feedback, or a pre-exam crash course. Fully customised, flexible scheduling.',
    icon: Sparkles,
  },
  {
    id: 'group-batch',
    name: 'Group Batch',
    price: '$40',
    perUnit: '/ hour',
    detail:
      'Small groups of 4–8 students on a fixed weekly schedule. The most affordable route to the same core curriculum, with peer discussion built in.',
    icon: Users,
  },
]

const pricingSummary = pricingTiers.map((t) => `• ${t.name} — ${t.price}${t.perUnit}`).join('\n')

export default function IBBiologySchoolTemplate({ school }: IBBiologySchoolTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const hasCityLink = Boolean(school.citySlug)
  const cityHref = hasCityLink ? `/ib-biology/${school.citySlug}` : null

  // Hero CTA — counsellor receives the school context + pricing menu the
  // student has just seen, so the conversation starts with shared context.
  const handleWhatsApp = () => {
    const message = [
      `Hi! My child is at ${school.shortName} (${school.cityCountry}) and we are exploring IB Biology tutoring.`,
      ``,
      `Course: IB Biology (HL / SL — May session)`,
      `Pricing tiers I'm considering:`,
      pricingSummary,
      ``,
      `Please share batch start, schedule (${school.timezone}), and which tier fits my goals.`,
    ].join('\n')
    trackAndOpenWhatsApp({
      source: `ib-bio-school-${school.slug}`,
      message,
      campaign: `ib-bio-school-${school.slug}`,
    })
  }

  const handleTierWhatsApp = (tier: (typeof pricingTiers)[number]) => {
    const message = [
      `Hi! My child is at ${school.shortName} (${school.cityCountry}) and we want to enroll in IB Biology — ${tier.name}.`,
      ``,
      `Tier: ${tier.name}`,
      `Price: ${tier.price}${tier.perUnit}`,
      `Detail: ${tier.detail}`,
      ``,
      `Please confirm availability, batch start, and next steps.`,
    ].join('\n')
    const tierSlug = tier.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    trackAndOpenWhatsApp({
      source: `ib-bio-school-${school.slug}-tier-${tierSlug}`,
      message,
      campaign: `ib-bio-school-${school.slug}-tier`,
    })
  }

  const counsellingMessage = [
    `Hi! I want to book a free IB Biology counselling call.`,
    ``,
    `School: ${school.shortName} (${school.cityCountry})`,
    `Course: IB Biology (HL / SL — May session)`,
    `Pricing tiers I've seen:`,
    pricingSummary,
    ``,
    `Please share available ${school.timezone} slots.`,
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
              <Link href="/ib-biology" className="text-gray-600 hover:text-blue-700">
                IB Biology
              </Link>
            </li>
            {hasCityLink && cityHref && (
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <Link href={cityHref} className="text-gray-600 hover:text-blue-700">
                  {school.cityCountry}
                </Link>
              </li>
            )}
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-blue-700 font-medium">{school.shortName}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
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
            IB Biology Tutoring for{' '}
            <span className="block text-yellow-400 mt-2">{school.shortName} Students</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-3 max-w-3xl" data-speakable="summary">
            <strong className="text-white">{school.schoolName}</strong> — {school.cityCountry}
          </p>
          <p className="text-sm text-slate-400 mb-8 max-w-3xl">
            School type: {school.schoolType} · IB Programmes: {school.ibProgrammeOffered.join(', ')}{' '}
            · Live coaching in {school.timezone}
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              <Clock className="w-4 h-4 text-yellow-400" />
              {school.timezone} live classes
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              <GraduationCap className="w-4 h-4 text-yellow-400" />
              Examiner-led 1:1
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              <Target className="w-4 h-4 text-yellow-400" />
              Paper 1 / 2 / 3 mastery
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              <Microscope className="w-4 h-4 text-yellow-400" />
              IA mentorship (DP1 → DP2)
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
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
            Sourced from publicly available rankings, the school&apos;s own annual diploma results
            communications, and the IB Organization&apos;s programme authorisations.
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

      {/* Diploma context (only if provided) */}
      {school.diplomaContext && (
        <section className="py-12 md:py-16 bg-yellow-50 border-y-2 border-yellow-200">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-7 h-7 text-yellow-700" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                IB Diploma context at {school.shortName}
              </h2>
            </div>
            <p className="text-slate-800 leading-relaxed">{school.diplomaContext}</p>
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
              How our coaching fits {school.shortName}&apos;s IB Bio pace
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed">{school.paceAlignment}</p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            IB Biology tutoring — transparent USD pricing
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Same pricing worldwide. Three clearly-differentiated products — pick the tier that
            matches your goal and intensity.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {pricingTiers.map((tier) => {
              const Icon = tier.icon
              return (
                <div
                  key={tier.id}
                  className={`rounded-xl border ${tier.highlight ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-slate-50'} p-6 hover:shadow-md transition flex flex-col`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon
                      className={`w-5 h-5 ${tier.highlight ? 'text-blue-700' : 'text-slate-500'}`}
                    />
                    <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                  </div>
                  <p className="mb-3">
                    <span className="text-3xl font-bold text-blue-700">{tier.price}</span>
                    <span className="text-sm text-slate-600 ml-1">{tier.perUnit}</span>
                  </p>
                  <p className="text-sm text-slate-700 flex-grow">{tier.detail}</p>
                  <button
                    type="button"
                    onClick={() => handleTierWhatsApp(tier)}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-4 py-2.5 text-sm transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Get this package
                  </button>
                </div>
              )
            })}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/ib-biology-tutor"
              className="text-sm font-semibold text-blue-700 hover:text-blue-900 underline"
            >
              See full package details and local currency equivalents →
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
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-slate-700 leading-relaxed faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BookOpen className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            IB Biology tutoring for {school.shortName} students
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free 30-minute counselling call. We&apos;ll calibrate to your IB Biology HL or SL
            track at {school.shortName} and help you decide between the Complete Programme, 1:1
            Elite Tutoring, or the Group Batch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            {hasCityLink && cityHref && (
              <Link
                href={cityHref}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">IB Biology — {school.cityCountry}</h3>
                <p className="text-xs text-slate-600 mt-1">City-level programme</p>
              </Link>
            )}
            <Link
              href="/ib-biology"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-blue-700">IB Biology (Hub)</h3>
              <p className="text-xs text-slate-600 mt-1">Main programme page</p>
            </Link>
            <Link
              href="/ib-biology-tutor"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-blue-700">IB Biology Tutor</h3>
              <p className="text-xs text-slate-600 mt-1">Pricing & packages</p>
            </Link>
            <Link
              href="/ib-biology-ia-guide"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-blue-700">IA Guide</h3>
              <p className="text-xs text-slate-600 mt-1">Internal Assessment mentorship</p>
            </Link>
            <Link
              href="/ib-biology-hl-vs-sl"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-blue-700">HL vs SL</h3>
              <p className="text-xs text-slate-600 mt-1">Choose the right level</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-slate-500">
          <CheckCircle2 className="w-4 h-4 text-blue-700 inline mr-1" />
          Independent tutoring provider — not affiliated with <strong>{school.schoolName}</strong>,
          the International Baccalaureate Organization, or any IB World School. The school name is
          used descriptively to indicate the audience this page is written for; no endorsement,
          sponsorship, or affiliation is implied. We coach the official IB Biology Diploma Programme
          (2025 syllabus, HL and SL) using publicly published past papers and the IB&apos;s own
          Section 6 (Practical Programme) specifications.
        </div>
      </section>
    </main>
  )
}
