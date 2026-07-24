import { Metadata } from 'next'
import Link from 'next/link'
import {
  NEETNRIPricingTiers,
  neetNRIOffersForSchema,
} from '@/components/neet-nri/NEETNRIPricingTiers'
import { Award, GraduationCap, Phone, MessageCircle, ArrowRight } from 'lucide-react'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Coaching in Perth, Australia | Online Biology Classes for NRI Students',
  description:
    'NEET coaching for Indian-origin students in Perth — online live classes by AIIMS faculty in AWST evening slots. AUD-anchored pricing. ATAR + NEET dual-prep pathway. NRI quota MBBS guidance.',
  keywords: [
    'neet coaching perth',
    'neet coaching perth australia',
    'neet coaching wa australia',
    'online neet coaching perth',
    'aiims neet coaching perth',
    'indian neet coaching western australia',
    'best neet coaching perth',
  ],
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-perth-australia`,
    languages: {
      'en-AU': `${BASE_URL}/neet-coaching-perth-australia`,
      'en-IN': `${BASE_URL}/neet-coaching-perth-australia`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Perth, Australia | Online Biology Classes',
    description:
      'NEET coaching for Perth Indian-origin students. AIIMS faculty, AWST evening batches.',
    url: `${BASE_URL}/neet-coaching-perth-australia`,
    locale: 'en_AU',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching in Perth, Australia | Online Biology Classes for NRI Students',
    description:
      'NEET coaching for Indian-origin students in Perth — online live classes by AIIMS faculty in AWST evening slots. AUD-anchored pricing. ATAR + NEET dual-prep pathway. NRI quota MBBS guidance.',
  },
}

const faqs = [
  {
    q: 'Where can I take NEET from Perth?',
    a: 'There is no NEET exam centre inside Australia. Perth-based students typically fly to Singapore, Kuala Lumpur or Bangkok (the three nearest NTA overseas NEET centres) to sit NEET-UG. We help enrolled students plan exam-city selection and travel logistics.',
  },
  {
    q: 'What are the class timings for Perth students?',
    a: 'Live classes run in AWST-friendly slots (UTC+8) — typically 5:30 PM – 8:00 PM AWST weekdays plus Saturday/Sunday weekend batches at 9:00 AM AWST. Every session is recorded.',
  },
  {
    q: 'Can I prepare for NEET while doing ATAR / WACE in Perth?',
    a: 'Yes. ATAR Biology and NEET Biology overlap on cell biology, genetics, evolution and ecology. NEET adds depth on human physiology and NCERT-specific content. Many Perth students run both in parallel and use NEET prep to strengthen ATAR Biology scores.',
  },
  {
    q: 'What is the fee for NEET coaching in Perth?',
    a: 'Annual NEET NRI tuition for Australian students ranges roughly AUD 6,300–7,800/year (Foundation / Comprehensive / Dropper tiers). Pricing shown in AUD on this page based on your detected region. EMI plans available.',
  },
  {
    q: 'Do you support Perth Indian-curriculum schools?',
    a: "Cerebrum supports Perth students from all schools — NEET is NCERT-based and curriculum-agnostic. Common Perth schools: Perth Modern, Wesley College, Hale, Scotch, Christ Church Grammar, Methodist Ladies' College, Penrhos College, plus public ATAR-track schools across Perth metro and Fremantle.",
  },
  {
    q: 'Are there other Cerebrum NEET batches in Australia?',
    a: 'Yes — Cerebrum runs online NEET batches for Sydney, Melbourne and Brisbane students alongside Perth. Same AIIMS-trained faculty, different timezone slots (AEDT/AEST for east coast, AWST for Perth).',
  },
  {
    q: 'Can I book a free demo class from Perth?',
    a: 'Yes — WhatsApp +91 88264-44334 (works from Australia) or use the demo booking link. Free demo runs 45–60 minutes with an AIIMS-led Biology faculty member, scheduled in AWST evening or weekend morning.',
  },
]

export default async function NEETCoachingPerthAustraliaPage() {
  const pageUrl = `${BASE_URL}/neet-coaching-perth-australia`
  const courseOffers = neetNRIOffersForSchema('AU', pageUrl)

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Cerebrum Biology Academy',
        url: BASE_URL,
        foundingDate: '2014',
        description:
          'Online NEET Biology coaching for Indian-origin students across Perth, Western Australia.',
        telephone: '+918826444334',
        areaServed: [
          { '@type': 'City', name: 'Perth' },
          { '@type': 'State', name: 'Western Australia' },
          { '@type': 'Country', name: 'Australia' },
        ],
      },
      {
        '@type': 'Course',
        name: 'NEET Coaching for Perth Students',
        provider: { '@id': `${BASE_URL}/#organization` },
        offers: courseOffers,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  const waLink = `https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want NEET coaching for Perth, Australia. Please share details and AWST batch timings.')}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />

      <section className="bg-gradient-to-br from-green-800 via-green-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-6">
            <Award className="w-4 h-4" />
            Perth · AWST Evening Batches · ATAR + NEET
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">NEET Coaching in Perth</h1>
          <p className="text-2xl text-green-50 mb-3">
            Online live classes for Perth Indian-origin students.
          </p>
          <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">
            AIIMS-trained faculty. AWST evening batches (5:30–8:00 PM). AUD-anchored pricing. ATAR +
            NEET dual-prep pathway.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Book Free Demo Class
            </a>
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </Link>
          </div>
          <p className="text-sm text-green-100 mt-6">
            Or call directly:{' '}
            <a href="tel:+918826444334" className="font-semibold text-yellow-300 hover:underline">
              +91 88264-44334
            </a>
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {[
              'AIIMS-Trained Faculty',
              'AWST (UTC+8) Evening Batches',
              'AUD Pricing',
              'ATAR Biology + NEET Dual Prep',
              'Singapore / KL NEET Travel Guidance',
              'NRI Quota MBBS Guidance',
              'WhatsApp Same-Day Doubts',
              'Free Demo Class',
            ].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full text-sm text-slate-700 border border-slate-200"
              >
                <GraduationCap className="w-4 h-4 text-green-700" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <NEETNRIPricingTiers forceCountry="AU" />

      <section className="py-12 bg-gradient-to-r from-green-700 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-1">Book a free demo from Perth.</h3>
              <p className="text-green-50 text-lg">
                Experience AIIMS-trained NEET Biology coaching in an AWST evening slot.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 flex-shrink-0">
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition whitespace-nowrap"
              >
                <Phone className="w-5 h-5" />
                Call +91 88264-44334
              </a>
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="bg-slate-50 rounded-lg group">
                  <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-slate-100">
                    {f.q}
                    <span className="text-slate-500 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="px-6 pb-4 text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Book Your Free Demo Class</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            AWST evening batches. AUD pricing. AIIMS-trained NEET Biology coaching.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call +91 88264-44334
            </a>
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Demo Booking
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="h-20 md:hidden" aria-hidden="true" />
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 shadow-lg grid grid-cols-2 gap-2 p-3">
        <a
          href="tel:+918826444334"
          className="flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 py-3 rounded-lg font-semibold"
        >
          <Phone className="w-4 h-4" /> Call
        </a>
        <Link
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </Link>
      </div>
    </div>
  )
}
