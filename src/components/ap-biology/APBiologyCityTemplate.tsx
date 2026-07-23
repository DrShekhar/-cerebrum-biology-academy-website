'use client'

/**
 * APBiologyCityTemplate
 *
 * Shared, props-driven UI for US-metro AP Biology landing pages
 * (e.g. /ap-biology-tutor-new-york, /ap-biology-tutor-bay-area, etc.).
 *
 * Design principles (per the AP Biology US domination plan):
 *  1. Pedagogy-first — active recall + spaced repetition + FRQ rubric
 *     mastery is the differentiator vs other tutor marketplaces / Princeton / Khan.
 *  2. School-name leverage — every metro lists 8–20 named schools so we
 *     capture the long-tail "AP Bio tutor near {school}" intent without
 *     paying for trademark risk.
 *  3. USABO bridge — every metro page explicitly cross-links to the
 *     matching /usabo-coaching-{city} page. AP-5 → USABO Semifinal is a
 *     real and well-documented funnel.
 *  4. Honest pre-med framing — AP Biology does not satisfy MCAT
 *     prereqs; we frame it as foundation, not substitute.
 *  5. USD-only pricing for non-IN visitors (no INR shown) per the
 *     dual-currency policy.
 */

import { useState } from 'react'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  FlaskConical,
  GraduationCap,
  Home,
  MessageCircle,
  Microscope,
  Phone,
  School,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import type { APBiologyMetro } from '@/data/ap-biology/metros'

interface APBiologyCityTemplateProps {
  metro: APBiologyMetro
}

// AP Biology unit weights per College Board CED — same data shape as
// /ap-biology-online-tutor and /ap-biology-tutor.
const apBiologyUnits = [
  { number: 1, title: 'Chemistry of Life', weight: '8–11%' },
  { number: 2, title: 'Cell Structure & Function', weight: '10–13%' },
  { number: 3, title: 'Cellular Energetics', weight: '12–16%' },
  { number: 4, title: 'Cell Communication & Cell Cycle', weight: '10–15%' },
  { number: 5, title: 'Heredity', weight: '8–11%' },
  { number: 6, title: 'Gene Expression & Regulation', weight: '12–16%' },
  { number: 7, title: 'Natural Selection', weight: '13–20%' },
  { number: 8, title: 'Ecology', weight: '10–15%' },
]

// Annual Pinnacle / Ascent / Pursuit pricing tiers
import { apBiologyPricingTiers, type APBiologyPricingTier } from '@/data/ap-biology/pricing-matrix'

// Compact pricing summary — computed inside the component with the metro's tier.

// Pedagogy method block — the differentiator. Cites Karpicke &
// Roediger 2008 because it's the canonical research on active recall.
const pedagogyPillars = [
  {
    title: 'Active recall + spaced repetition',
    description:
      'Self-testing at 1-day, 3-day, and 1-week intervals beats passive re-reading by 50%+ on long-term retention (Karpicke & Roediger, Science 2008). We provide Anki deck templates aligned to the AP Biology calendar.',
    icon: Brain,
  },
  {
    title: 'FRQ rubric mastery',
    description:
      "FRQ is 50% of the AP Biology score, but most students over-prepare for multiple choice. Our coaching drills the College Board's specific 4-point rubrics unit-by-unit — the difference between a 4 and a 5.",
    icon: FileText,
  },
  {
    title: 'Diagram + mechanistic thinking',
    description:
      'Cellular respiration, photosynthesis Z-scheme, replication fork, signal transduction — these reward tracing electrons and molecules through steps, not flashcard recall. We drill mechanism before memorisation.',
    icon: FlaskConical,
  },
  {
    title: 'Six full-length practice exams',
    description:
      'Top scorers take 6+ full-length practice exams, grade with rubric, revise, re-grade. Daily 30-minute consistency beats weekend cramming. We schedule, grade, and review every one with you.',
    icon: Target,
  },
]

export default function APBiologyCityTemplate({ metro }: APBiologyCityTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const pricingTiers = apBiologyPricingTiers
  const pricingSummary = pricingTiers
    .map((t) => `• ${t.name} — ${t.label} (${t.batchSize})`)
    .join('\n')

  // Hero CTA — counsellor receives the visitor's location + the full
  // pricing menu they were just shown, so the conversation starts with
  // shared context, not discovery questions.
  const handleWhatsApp = () => {
    const message = [
      `Hi! I'm in ${metro.cityName} and interested in AP Biology tutoring.`,
      ``,
      `Course: AP Biology (College Board, May exam)`,
      `Pricing tiers I'm considering:`,
      pricingSummary,
      ``,
      `Please share batch start, schedule, and which tier fits my goals (AP-5 only / AP-5 + USABO Semifinal).`,
    ].join('\n')
    trackAndOpenWhatsApp({
      source: `ap-bio-city-${metro.slug}`,
      message,
      campaign: `ap-bio-city-${metro.slug}`,
    })
  }

  // Per-tier CTA — fired from the pricing card the visitor clicked.
  // Sends a tier-specific intent message so the counsellor knows the
  // package the visitor was pricing without asking. Tracked separately
  // (campaign suffix) so we can measure tier-level conversion.
  const handleTierWhatsApp = (tier: APBiologyPricingTier) => {
    const message = [
      `Hi! I'm in ${metro.cityName} and interested in the *${tier.name}* programme (${tier.label}).`,
      ``,
      `Batch size: ${tier.batchSize}`,
      `1:1 access: ${tier.oneOnOne}`,
      ``,
      `Please share batch schedule, next intake date, and next steps.`,
    ].join('\n')
    const tierSlug = tier.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    trackAndOpenWhatsApp({
      source: `ap-bio-city-${metro.slug}-tier-${tierSlug}`,
      message,
      campaign: `ap-bio-city-${metro.slug}-tier`,
    })
  }

  // Counselling-call CTA — same context as hero CTA, but framed as
  // a discovery call rather than enrolment intent.
  const counsellingMessage = [
    `Hi! I want to book a free AP Biology counselling call.`,
    ``,
    `Region: ${metro.cityName}`,
    `Course: AP Biology (College Board, May exam)`,
    `Pricing tiers I've seen:`,
    pricingSummary,
    ``,
    `Please share available US-time slots.`,
  ].join('\n')
  const counsellingHref = `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(counsellingMessage)}`

  const usaboBridgeHref = metro.usaboCitySlug
    ? `/usabo-coaching-${metro.usaboCitySlug}`
    : '/usabo-coaching'

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
              <span className="text-blue-700 font-medium">{metro.cityName}</span>
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
            <Award className="w-4 h-4" />
            For students in {metro.region}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            AP Biology Tutoring for{' '}
            <span className="block text-yellow-400 mt-2">{metro.cityName} Students</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            {metro.heroBlurb}
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              <Clock className="w-4 h-4 text-yellow-400" />
              {metro.timezone} live classes
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
              Targeted score improvement
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

      {/* Schools we serve */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <School className="w-7 h-7 text-blue-700" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {metro.cityName} schools we already coach
            </h2>
          </div>
          <p className="text-slate-600 mb-6 max-w-3xl">
            These are the high-AP-Biology-density schools whose students train with us. We&apos;ve
            calibrated the schedule, FRQ rubric work, and AP exam pacing to fit their academic
            calendars.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {metro.schools.map((s) => (
              <div
                key={s}
                className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex items-center gap-3"
              >
                <School className="w-5 h-5 text-blue-700 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-800">{s}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Don&apos;t see your school? We coach AP Biology students from any US high school — these
            are the schools we have repeat enrolments from. Trademark notice: school names used
            descriptively; no affiliation, sponsorship, or endorsement implied.
          </p>
        </div>
      </section>

      {/* Pedagogy positioning */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Pedagogy-first — not just availability
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why {metro.cityName} families choose Cerebrum for AP Biology
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-3xl">{metro.positioningBlurb}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {pedagogyPillars.map((p) => (
              <div
                key={p.title}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <p.icon className="w-7 h-7 text-yellow-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AP Biology unit weights */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            AP Biology — 8 units, by exam weight
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            College Board Course and Exam Description for AP Biology, with each unit&apos;s
            percentage of the total exam. Our coaching prioritises units 3, 6, and 7 — the highest
            weight — without neglecting the lower-weight units that cover ecology and heredity.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {apBiologyUnits.map((u) => (
              <div key={u.number} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-sm font-bold flex items-center justify-center">
                    {u.number}
                  </span>
                  <span className="text-xs font-semibold text-blue-700">{u.weight}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{u.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USABO bridge */}
      <section className="py-12 md:py-16 bg-yellow-50 border-y-2 border-yellow-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 bg-yellow-200 text-yellow-900 px-3 py-1.5 rounded-full text-xs font-bold mb-3">
                <Trophy className="w-3.5 h-3.5" />
                For AP-5 students with USABO ambition
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Pursuing USABO Semifinal as well?
              </h2>
              <p className="text-slate-700 leading-relaxed">
                The USABO Open exam runs in early February through your high school. Many of our
                strongest {metro.cityName} students sit both AP Biology and USABO. We run an
                integrated track — Campbell + Alberts + Lehninger by February for USABO depth, then
                AP rubric drilling for the May exam. Same student, one curriculum, both targets.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href={usaboBridgeHref}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-lg font-semibold transition"
              >
                <Trophy className="w-5 h-5" />
                USABO for {metro.cityName}
              </Link>
              <Link
                href="/ap-biology-vs-usabo"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 px-5 py-3 rounded-lg font-semibold border-2 border-slate-300 transition"
              >
                AP Biology vs USABO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            AP Biology — Pinnacle / Ascent / Pursuit
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Annual programmes with clear tier differentiation. Choose by batch size and 1:1 access
            level.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-xl border ${tier.highlight ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'} bg-slate-50 p-6 hover:shadow-md transition flex flex-col`}
              >
                {tier.highlight && (
                  <span className="text-xs font-semibold text-blue-600 uppercase mb-2">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-900 mb-1">{tier.name}</h3>
                <p className="text-2xl font-bold text-blue-700 mb-1">{tier.label}</p>
                <p className="text-sm text-green-700 font-medium mb-1">
                  {tier.batchSize} · {tier.oneOnOne}
                </p>
                <p className="text-xs text-slate-500 mb-3">{tier.subtitle}</p>
                <ul className="text-sm text-slate-600 flex-grow space-y-1 mb-4">
                  {tier.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-1.5">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {/* Per-tier CTA — the WhatsApp message includes this
                    exact tier name + price so the counsellor sees the
                    package the visitor clicked. */}
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

      {/* Pre-med foundation block */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3 py-1.5 rounded-full text-xs font-bold mb-3">
            <Microscope className="w-3.5 h-3.5" />
            Pre-Med / BS-MD foundation
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            AP Biology as a pre-med foundation — honestly framed
          </h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            A 5 in AP Biology is a strong baseline signal of biology readiness for pre-med
            applicants — but it does <strong>not</strong> satisfy medical school prerequisites. Most
            US medical schools require college-level biology (taken during your undergraduate years)
            regardless of AP credit. AP Biology is the foundation, not the substitute.
          </p>
          <p className="text-slate-700 leading-relaxed">
            For BS/MD pipelines (Brown PLME, Northwestern HPME, Baylor 8-Year, NYU Honors / Stony
            Brook scholars track), AP-5 plus USABO Semifinalist standing reads as serious biology
            depth. AP-5 alone is rarely differentiating in those competitive applicant pools — the
            second credential matters. We coach both as a single integrated track.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 md:py-16 bg-white" data-speakable="faq">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions — {metro.cityName}
          </h2>
          <div className="space-y-3">
            {metro.faqs.map((faq, idx) => (
              <div key={faq.question} className="bg-slate-50 rounded-xl border border-slate-200">
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
                {/* Collapsed with `hidden`, not conditionally mounted: these answers are
                    also emitted as FAQPage structured data, and Google requires the
                    marked-up content to exist on the page. Googlebot renders JS but
                    does not click accordions. */}
                <div
                  className={`px-5 pb-5 text-sm text-slate-700 leading-relaxed faq-answer ${openFaq === idx ? '' : 'hidden'}`}
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
            Start AP Biology preparation from {metro.cityName}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free 30-minute counselling call. We&apos;ll review your school, current biology
            level, and target — AP-5, USABO Semifinal, or both.
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
            <Link
              href={usaboBridgeHref}
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-blue-700">USABO for {metro.cityName}</h3>
              <p className="text-xs text-slate-600 mt-1">Olympiad track in your timezone</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-slate-500">
          <CheckCircle2 className="w-4 h-4 text-blue-700 inline mr-1" />
          Independent tutoring provider — not affiliated with the College Board, AP Program, or any
          school listed above. We coach the official AP Biology Course and Exam Description and use
          publicly published Free-Response and multiple-choice materials.
        </div>
      </section>
    </main>
  )
}
