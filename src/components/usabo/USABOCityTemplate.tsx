'use client'

/**
 * USABOCityTemplate
 *
 * Shared, props-driven UI for USA city / region USABO landing pages
 * (e.g. /usabo-coaching-bay-area, /usabo-coaching-northern-virginia, etc.).
 *
 * Designed around three messages:
 *  1. AIIMS-trained, biology-only faculty (Indian-style olympiad rigour)
 *  2. Pathway clarity (Open → Semifinal → Finalist → IBO)
 *  3. Regional specificity (named schools, time-zone, US calendar)
 */

import { useState } from 'react'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  GraduationCap,
  Home,
  MessageCircle,
  Microscope,
  Phone,
  School,
  Star,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export interface USABOFaq {
  question: string
  answer: string
}

export interface USABOCityTemplateProps {
  /** Display name, e.g. "Northern Virginia / DC" */
  cityName: string
  /** URL slug used in CTA tracking */
  citySlug: string
  /** State or region label, e.g. "Virginia + Maryland + DC" */
  region: string
  /** US time-zone label, e.g. "ET (Eastern)" */
  timezone: string
  /** Schools we explicitly call out — drives keyword coverage */
  schools: string[]
  /** 1-paragraph regional context for the hero */
  heroBlurb: string
  /** Indian-style-teaching positioning paragraph (varies slightly by city) */
  rigourBlurb: string
  /** FAQs (5–8 city-tailored) */
  faqs: USABOFaq[]
  /**
   * Slug for the matching /ap-biology-tutor-{slug} page (e.g. "new-york",
   * "northern-virginia-dc"). When set, the related-guides grid surfaces
   * a city-specific AP Biology card so AP-track visitors can pivot to
   * the AP-5 funnel without leaving the USABO cluster. Reciprocal cross-
   * cluster linking — strengthens both pages' authority signal.
   */
  apBiologyCitySlug?: string
  /** Display label for the AP Biology card; defaults to cityName */
  apBiologyCityLabel?: string
}

const usaboPathway = [
  {
    stage: 'USABO Open Exam',
    detail: '50 MCQ, 50 minutes, school-administered, first or second week of February',
    icon: Calendar,
  },
  {
    stage: 'USABO Semifinal',
    detail: 'Theory + free-response, 3 hours, mid-March. Top ~10% of Open advance',
    icon: Microscope,
  },
  {
    stage: 'USABO National Finals',
    detail: 'Multi-day camp at a host university in late May. Top ~20 nationally',
    icon: Trophy,
  },
  {
    stage: 'IBO Team',
    detail: 'Top 4 from National Finals form the US IBO team for the international round',
    icon: Award,
  },
]

const features = [
  {
    title: 'AIIMS-trained biology specialists',
    description:
      'Faculty trained at the All India Institute of Medical Sciences — the same depth-first methodology that produces Indian top performers.',
    icon: GraduationCap,
  },
  {
    title: 'US time-zone scheduling',
    description:
      'Live classes scheduled in your local US time zone. No 4 a.m. wake-ups, no recorded-only fallback.',
    icon: Clock,
  },
  {
    title: 'Past-paper saturation',
    description:
      '10 years of USABO Open + Semifinal papers with our worked solutions and topic tagging. Past-paper drilling is the core method.',
    icon: BookOpen,
  },
  {
    title: 'Small-batch faculty time',
    description:
      'Max 12 students per batch. Weekly written feedback on every past-paper attempt. Indian small-batch coaching tradition, not a video library.',
    icon: Users,
  },
  {
    title: 'AP Biology bridge built-in',
    description:
      'Our curriculum maps Campbell Biology end-to-end then layers Alberts and Lehninger. Students preparing for AP-5 finish ahead of schedule.',
    icon: Target,
  },
  {
    title: 'College admissions framing',
    description:
      'USABO Semifinalist / Finalist standing is a national-tier credential routinely cited in successful Ivy / MIT / Stanford / JHU STEM applications.',
    icon: Star,
  },
]

export default function USABOCityTemplate({
  cityName,
  citySlug,
  region,
  timezone,
  schools,
  heroBlurb,
  rigourBlurb,
  faqs,
  apBiologyCitySlug,
  apBiologyCityLabel,
}: USABOCityTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: `usabo-city-${citySlug}`,
      message: `Hi! I'm in ${cityName} and interested in USABO + IBO coaching for my child / for myself. Please share programme details, pricing, and schedule.`,
      campaign: `usabo-city-${citySlug}`,
    })
  }

  const counsellingHref = `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(
    `Hi! I want to book a free USABO counselling call. Region: ${cityName}. Please share available US-time slots.`
  )}`

  const pageUrl = `https://cerebrumbiologyacademy.com/usabo-coaching-${citySlug}`

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `USABO Coaching for ${cityName} Students`,
    description: `Live online USABO + IBO coaching for ${cityName} students. AIIMS-trained faculty, small-batch (max 12), US time-zone scheduling, past-paper saturation method.`,
    url: pageUrl,
    inLanguage: 'en-US',
    educationalLevel: 'Biology Olympiad',
    provider: {
      '@type': 'EducationalOrganization',
      '@id': 'https://cerebrumbiologyacademy.com/#organization',
      name: 'Cerebrum Biology Academy',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Pinnacle',
        price: '6000',
        priceCurrency: 'USD',
        description: 'Full-year USABO + IBO track',
        url: pageUrl,
      },
      {
        '@type': 'Offer',
        name: 'Ascent',
        price: '4500',
        priceCurrency: 'USD',
        description: 'Semester-length intensive',
        url: pageUrl,
      },
      {
        '@type': 'Offer',
        name: 'Pursuit',
        price: '2500',
        priceCurrency: 'USD',
        description: 'Open-exam focused prep',
        url: pageUrl,
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'USABO Coaching',
        item: 'https://cerebrumbiologyacademy.com/usabo-coaching',
      },
      { '@type': 'ListItem', position: 3, name: cityName, item: pageUrl },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `USABO Coaching for ${cityName} Students`,
    url: pageUrl,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="title"]', '[data-speakable="summary"]'],
    },
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
    name: 'Dr. Shekhar C Singh',
    alternateName: ['Dr. Shekhar Singh', 'Dr. SC Singh'],
    jobTitle: 'Founder & Lead Biology Faculty',
    description: `AIIMS-trained biology faculty coaching USABO + IBO students from ${cityName}.`,
    url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
    image: 'https://cerebrumbiologyacademy.com/images/dr-shekhar-singh.webp',
    affiliation: {
      '@type': 'EducationalOrganization',
      '@id': 'https://cerebrumbiologyacademy.com/#organization',
      name: 'Cerebrum Biology Academy',
    },
    knowsAbout: [
      'USABO',
      'IBO',
      'Campbell Biology',
      'Biology Olympiad',
      'USABO Open Exam',
      'USABO Semifinal',
    ],
    sameAs: ['https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty'],
  }

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-teal-600">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link href="/usabo-coaching" className="text-gray-600 hover:text-teal-600">
                USABO Coaching
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">{cityName}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            For students in {region}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            USABO + IBO Coaching for{' '}
            <span className="block text-yellow-400 mt-2">{cityName} Students</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl">{heroBlurb}</p>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              <Clock className="w-4 h-4 text-yellow-400" />
              {timezone} live classes
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              <GraduationCap className="w-4 h-4 text-yellow-400" />
              AIIMS-trained faculty
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              <Users className="w-4 h-4 text-yellow-400" />
              Max 12 / batch
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
          <p className="mt-3 text-sm font-medium text-white/80">
            WhatsApp is free from the US — no international call needed.
          </p>
        </div>
      </section>

      {/* Schools we serve */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <School className="w-7 h-7 text-teal-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {cityName} schools we already serve
            </h2>
          </div>
          <p className="text-slate-600 mb-6 max-w-3xl">
            These are the high-USABO-density schools whose students train with us. We&apos;ve
            calibrated the schedule, AP-Bio overlap, and Semifinal prep to fit their academic
            calendars.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {schools.map((s) => (
              <div
                key={s}
                className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex items-center gap-3"
              >
                <School className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-800">{s}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Don&apos;t see your school? We coach students from any US high school — these are the
            schools we have repeat enrolments from.
          </p>
        </div>
      </section>

      {/* Indian-rigour positioning */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            Indian-style olympiad rigour, in your timezone
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Indian-American {cityName} families choose Cerebrum
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-3xl">{rigourBlurb}</p>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            What&apos;s in the {cityName} programme
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <f.icon className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — mirrors the USD tiers in courseSchema offers */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 text-center">
            {cityName} programme pricing
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl mx-auto text-center">
            Transparent USD pricing. Your exact tier and start date are confirmed at your free
            assessment call — we match the track to your target stage and current biology level.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-1">Pursuit</h3>
              <p className="text-3xl font-bold text-teal-700 mb-2">$2,500</p>
              <p className="text-sm text-slate-600">
                Open-exam focused prep — built to push past the February Open Exam into the
                Semifinalist range.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border-2 border-yellow-400">
              <div className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-semibold mb-2">
                <Star className="w-3.5 h-3.5" />
                Most popular
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Ascent</h3>
              <p className="text-3xl font-bold text-teal-700 mb-2">$4,500</p>
              <p className="text-sm text-slate-600">
                Semester-length intensive — Open + Semifinal preparation with weekly written
                feedback on every past-paper attempt.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-1">Pinnacle</h3>
              <p className="text-3xl font-bold text-teal-700 mb-2">$6,000</p>
              <p className="text-sm text-slate-600">
                Full-year USABO + IBO track — Open → Semifinal → National Finals → IBO continuity
                with the same faculty throughout.
              </p>
            </div>
          </div>
          <p className="text-center mt-6">
            <a
              href={counsellingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-teal-700 font-semibold hover:text-teal-800"
            >
              <MessageCircle className="w-4 h-4" />
              Programs from $2,500 — full pricing at your free assessment
            </a>
          </p>
        </div>
      </section>

      {/* USABO Pathway */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            The USABO → IBO pathway, explained
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            We coach all four stages — and we coach them with continuity. The same faculty who run
            Open prep run Semifinal and Finals camp prep.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {usaboPathway.map((p, i) => (
              <div key={p.stage} className="bg-white rounded-xl p-5 border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-full bg-yellow-500 text-slate-900 text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p.icon className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{p.stage}</h3>
                <p className="text-xs text-slate-600">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions — {cityName}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={faq.question} className="bg-slate-50 rounded-xl border border-slate-200">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-slate-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start preparing for USABO 2027 from {cityName}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free 30-minute counselling call. We&apos;ll review your school, current biology
            level, and target stage (Open / Semifinal / Finalist).
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

      {/* Related — when apBiologyCitySlug is set we surface a 5th card
          for the matching AP Biology metro page. Reciprocal cross-cluster
          linking from USABO city → AP city, completing the link graph. */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Related guides</h2>
          <div
            className={`grid gap-4 md:grid-cols-2 ${
              apBiologyCitySlug ? 'lg:grid-cols-5' : 'md:grid-cols-4'
            }`}
          >
            <Link
              href="/usabo-coaching"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-teal-700">USABO Coaching</h3>
              <p className="text-xs text-slate-600 mt-1">Main programme hub</p>
            </Link>
            <Link
              href="/ap-biology-vs-usabo"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-teal-700">AP Biology vs USABO</h3>
              <p className="text-xs text-slate-600 mt-1">Bridge for AP-5 students</p>
            </Link>
            {apBiologyCitySlug && (
              <Link
                href={`/ap-biology-tutor-${apBiologyCitySlug}`}
                className="bg-blue-50 p-4 rounded-xl border border-blue-200 hover:border-blue-400 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">
                  AP Biology in {apBiologyCityLabel || cityName}
                </h3>
                <p className="text-xs text-slate-600 mt-1">AP-5 track + USABO bridge</p>
              </Link>
            )}
            <Link
              href="/usabo-6-month-prep-plan"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-teal-700">6-Month Prep Plan</h3>
              <p className="text-xs text-slate-600 mt-1">Month-by-month schedule</p>
            </Link>
            <Link
              href="/ibo-preparation"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-teal-700">IBO Preparation</h3>
              <p className="text-xs text-slate-600 mt-1">After USABO Finalist</p>
            </Link>
            <Link
              href="/how-to-qualify-for-usabo"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-teal-700">How to Qualify for USABO</h3>
              <p className="text-xs text-slate-600 mt-1">Open → Semifinal pathway</p>
            </Link>
            <Link
              href="/usabo-syllabus"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-teal-700">USABO Syllabus</h3>
              <p className="text-xs text-slate-600 mt-1">CEE topic breakdown</p>
            </Link>
            <Link
              href="/best-usabo-books"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-teal-700">Best USABO Books</h3>
              <p className="text-xs text-slate-600 mt-1">Campbell, Alberts, Lehninger</p>
            </Link>
            <Link
              href="/is-usabo-worth-it"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-teal-700">Is USABO Worth It?</h3>
              <p className="text-xs text-slate-600 mt-1">Admissions value</p>
            </Link>
            <Link
              href="/how-to-make-us-ibo-team"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-teal-700">How to Make US IBO Team</h3>
              <p className="text-xs text-slate-600 mt-1">Top 4 selection pathway</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-slate-500">
          <CheckCircle2 className="w-4 h-4 text-teal-600 inline mr-1" />
          Independent coaching provider — not affiliated with CEE or USABO administration. We coach
          the official syllabus and use publicly published past papers + our worked solutions.
        </div>
      </section>
    </main>
  )
}
