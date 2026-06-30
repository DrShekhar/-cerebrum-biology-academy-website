'use client'

/**
 * CBOCityTemplate
 *
 * Shared, props-driven UI for Canadian city CBO landing pages
 * (e.g. /cbo-coaching-toronto, /cbo-coaching-vancouver).
 *
 * Follows the same structural pattern as USABOCityTemplate but with CBO
 * pathway terminology + Canadian schools + en-CA targeting.
 */

import { useState } from 'react'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  GraduationCap,
  Home,
  MessageCircle,
  Microscope,
  Phone,
  School,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export interface CBOFaq {
  question: string
  answer: string
}

export interface CBOCityTemplateProps {
  cityName: string
  citySlug: string
  region: string
  timezone: string
  schools: string[]
  heroBlurb: string
  rigourBlurb: string
  faqs: CBOFaq[]
}

const cboPathway = [
  {
    stage: 'CBO Open / Qualifying Round',
    detail:
      'School-administered exam, typically in early spring. Qualifying score advances to the National round.',
    icon: BookOpen,
  },
  {
    stage: 'CBO National Round',
    detail:
      'Theory + applied biology. Top performers nationally are invited to the IBO selection camp.',
    icon: Microscope,
  },
  {
    stage: 'IBO Selection Camp',
    detail: 'Multi-day intensive training at a host university. Top 4 form Team Canada for IBO.',
    icon: Trophy,
  },
  {
    stage: 'IBO Team Canada',
    detail:
      'Top 4 represent Canada at the International Biology Olympiad alongside teams from 80+ countries.',
    icon: Award,
  },
]

const features = [
  {
    title: 'AIIMS-trained biology specialists',
    description:
      'Faculty trained at the All India Institute of Medical Sciences — the depth-first methodology that produces Indian top performers, applied to CBO + IBO preparation.',
    icon: GraduationCap,
  },
  {
    title: 'Canadian time-zone scheduling',
    description:
      'Live classes in your local Canadian time zone (ET / CT / MT / PT). Recordings available if you miss a session.',
    icon: Clock,
  },
  {
    title: 'Past-paper saturation',
    description:
      'Decade of CBO + IBO past papers with worked solutions and topic tagging. Past-paper drilling is the core method.',
    icon: BookOpen,
  },
  {
    title: 'Small-batch faculty time',
    description:
      'Max 12 students per batch. Weekly written feedback on every past-paper attempt — the Indian small-batch coaching tradition adapted for Canadian students.',
    icon: Users,
  },
  {
    title: 'University-track friendly',
    description:
      'Curriculum aligns with Campbell Biology and the AP Biology / IB HL pathways many Canadian students sit alongside CBO. Strong CBO standing strengthens UofT, McGill, UBC, Waterloo, Western applications for Life Sciences and Med-track programmes.',
    icon: Target,
  },
  {
    title: 'IBO-track continuity',
    description:
      'Students who clear the CBO selection camp continue with the same faculty into IBO preparation — no instructor change at the most critical stage.',
    icon: Trophy,
  },
]

export default function CBOCityTemplate({
  cityName,
  citySlug,
  region,
  timezone,
  schools,
  heroBlurb,
  rigourBlurb,
  faqs,
}: CBOCityTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: `cbo-city-${citySlug}`,
      message: `Hi! I'm in ${cityName} and interested in CBO + IBO coaching for my child / for myself. Please share programme details, pricing, and schedule.`,
      campaign: `cbo-city-${citySlug}`,
    })
  }

  const counsellingHref = `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(
    `Hi! I want to book a free CBO counselling call. Region: ${cityName}. Please share available Canadian-time slots.`
  )}`

  const pageUrl = `https://cerebrumbiologyacademy.com/cbo-coaching-${citySlug}`

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `CBO Coaching for ${cityName} Students`,
    description: `Live online CBO + IBO coaching for ${cityName} students. AIIMS-trained faculty, small-batch (max 12), Canadian time-zone scheduling, past-paper saturation method.`,
    url: pageUrl,
    inLanguage: 'en-CA',
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
        price: '1125',
        priceCurrency: 'CAD',
        description: '12-month full CBO + IBO track',
        url: pageUrl,
      },
      {
        '@type': 'Offer',
        name: 'Ascent',
        price: '675',
        priceCurrency: 'CAD',
        description: '6-month intensive',
        url: pageUrl,
      },
      {
        '@type': 'Offer',
        name: 'Pursuit',
        price: '375',
        priceCurrency: 'CAD',
        description: '3-month qualifying-round prep',
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
        name: 'CBO Coaching',
        item: 'https://cerebrumbiologyacademy.com/cbo-coaching',
      },
      { '@type': 'ListItem', position: 3, name: cityName, item: pageUrl },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `CBO Coaching for ${cityName} Students`,
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
    description: `AIIMS-trained biology faculty coaching CBO + IBO students from ${cityName}.`,
    url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
    image: 'https://cerebrumbiologyacademy.com/images/dr-shekhar-singh.webp',
    affiliation: {
      '@type': 'EducationalOrganization',
      '@id': 'https://cerebrumbiologyacademy.com/#organization',
      name: 'Cerebrum Biology Academy',
    },
    knowsAbout: [
      'CBO',
      'IBO',
      'Campbell Biology',
      'Canadian Biology Olympiad',
      'Biology Olympiad',
      'CBO National Round',
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
              <Link href="/cbo-coaching" className="text-gray-600 hover:text-teal-600">
                CBO Coaching
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
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-red-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            For students in {region}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            CBO + IBO Coaching for{' '}
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
        </div>
      </section>

      {/* Schools */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <School className="w-7 h-7 text-teal-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {cityName} schools we already serve
            </h2>
          </div>
          <p className="text-slate-600 mb-6 max-w-3xl">
            High-CBO-density schools whose students train with us. We&apos;ve calibrated the
            schedule, AP / IB overlap, and CBO National-round prep to fit Canadian academic
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
            Don&apos;t see your school? We coach students from any Canadian high school — these are
            the schools we have repeat enrolments from.
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
            Why Indian-Canadian {cityName} families choose Cerebrum
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

      {/* CBO Pathway */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            The CBO → IBO pathway, explained
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            We coach all four stages — and we coach them with continuity. The same faculty who run
            Open / Qualifying prep run National-round and IBO camp prep.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cboPathway.map((p, i) => (
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
            Start preparing for CBO 2026 from {cityName}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free 30-minute counselling call. We&apos;ll review your school, current biology
            level, and target stage (Open / National / IBO camp).
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
            <Link
              href="/cbo-coaching"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-teal-700">CBO Coaching</h3>
              <p className="text-xs text-slate-600 mt-1">Main programme hub</p>
            </Link>
            <Link
              href="/ibo-preparation"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-teal-700">IBO Preparation</h3>
              <p className="text-xs text-slate-600 mt-1">After CBO selection</p>
            </Link>
            <Link
              href="/usabo-coaching"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-teal-700">USABO (sister)</h3>
              <p className="text-xs text-slate-600 mt-1">For US-based students</p>
            </Link>
            <Link
              href="/biology-olympiads"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-teal-700">All olympiads</h3>
              <p className="text-xs text-slate-600 mt-1">Country-by-country</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
