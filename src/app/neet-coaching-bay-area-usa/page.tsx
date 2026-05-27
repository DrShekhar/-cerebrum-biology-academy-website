import { Metadata } from 'next'
import Link from 'next/link'
import {
  NEETNRIPricingTiers,
  neetNRIOffersForSchema,
} from '@/components/neet-nri/NEETNRIPricingTiers'
import { Award, GraduationCap, Phone, MessageCircle, ArrowRight, Clock } from 'lucide-react'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Coaching in Bay Area, USA | Online for Fremont, Sunnyvale, Cupertino, San Jose',
  description:
    'NEET coaching for Indian-American students across the Bay Area — Fremont, Sunnyvale, Cupertino, San Jose, Palo Alto, Mountain View. Online live classes by AIIMS faculty, PST evening batches, AP Biology + NEET dual prep. NRI quota MBBS guidance.',
  keywords: [
    'neet coaching bay area',
    'neet coaching bay area usa',
    'neet coaching fremont',
    'neet coaching sunnyvale',
    'neet coaching san jose',
    'neet coaching cupertino',
    'neet coaching palo alto',
    'neet coaching mountain view',
    'best neet coaching bay area',
    'indian american neet coaching california',
    'aiims neet coaching bay area',
    'neet biology coaching california',
  ],
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-bay-area-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-bay-area-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-bay-area-usa`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Bay Area, USA | Online Biology Classes',
    description:
      'NEET coaching for Bay Area Indian-American students. AIIMS faculty, PST evening batches, AP Biology + NEET dual prep.',
    url: `${BASE_URL}/neet-coaching-bay-area-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
  },

  twitter: { card: 'summary_large_image' as const },
}

const subAreas = [
  { name: 'Fremont', note: 'Highest Indian-American population concentration in the Bay Area' },
  { name: 'Sunnyvale', note: 'Silicon Valley engineering hub · Bishop Hartmann area' },
  { name: 'Cupertino', note: 'Cupertino HS / Monta Vista feeder schools' },
  { name: 'San Jose', note: 'Evergreen / Almaden / Mission San Jose HS' },
  { name: 'Palo Alto', note: 'Gunn HS / Palo Alto HS · Stanford-area community' },
  { name: 'Mountain View', note: 'Adjacent to Google · large Indian-tech community' },
  { name: 'Saratoga', note: 'Lynbrook HS / Saratoga HS feeder' },
  { name: 'Milpitas', note: 'Milpitas HS · large Indian-curriculum after-school' },
]

const faqs = [
  {
    q: 'Where can I take NEET from the Bay Area?',
    a: 'There is no NEET exam centre inside the United States. Bay Area students typically fly to Dubai (most common) or India to sit NEET-UG. We help enrolled students plan exam-city selection, NEET registration and travel logistics.',
  },
  {
    q: 'What are the class timings for Bay Area students?',
    a: 'Live classes run in PST-friendly evening slots — typically 6:30 PM – 9:00 PM PST weekdays plus Saturday/Sunday weekend batches at 8:00 AM – 11:00 AM PST. Every session is recorded so any missed class can be caught up within hours.',
  },
  {
    q: 'Can I prepare for NEET while taking AP Biology in the Bay Area?',
    a: 'Yes — AP Biology and NEET Biology overlap on cell biology, genetics, physiology and ecology. NEET adds depth on human physiology and NCERT-specific content. Bay Area students at Lynbrook, Monta Vista, Mission San Jose, Saratoga, Gunn, Palo Alto, Cupertino HS, Henry M Gunn typically run AP Bio and NEET prep in parallel.',
  },
  {
    q: 'Which Bay Area schools do you support?',
    a: 'All — NEET is NCERT-based and curriculum-agnostic. Common feeder schools: Lynbrook HS, Monta Vista HS, Mission San Jose HS, Cupertino HS, Saratoga HS, Gunn HS, Palo Alto HS, Henry M Gunn, Bellarmine, Harker, Notre Dame San Jose, Evergreen Valley, Independence HS, Milpitas HS, Bishop Hartmann.',
  },
  {
    q: 'What does NEET coaching cost in the Bay Area?',
    a: 'Annual USD tuition ranges roughly $4,800–$6,000 in the USA across Foundation / Comprehensive / Dropper tiers — see the regional pricing tiers below for the current USD amount. Bay Area Indian-American families typically pick Pinnacle / Comprehensive tier. EMI plans available.',
  },
  {
    q: 'Do you help with NRI quota MBBS admissions for Bay Area students?',
    a: 'Yes — on the academic side. We explain which Indian medical colleges offer NRI seats, typical NEET cut-offs for the NRI quota, and the admission timeline. We do not provide visa, immigration, or legal documentation services.',
  },
  {
    q: 'How is Cerebrum different from AP / SAT tutors in the Bay Area?',
    a: 'Cerebrum is biology-only and India-medical-entrance focused. Most Bay Area academic tutoring is AP / SAT / college-admissions oriented — not NEET-specialised. Cerebrum is led by Dr. Shekhar C Singh (AIIMS New Delhi) with biology-only specialisation across NEET, AP Biology, IB Biology, MCAT and Biology Olympiad.',
  },
  {
    q: 'Can I book a free demo class from the Bay Area?',
    a: 'Yes — WhatsApp +91 88264-44334 (works from US) or use the demo booking link. Free demo runs 45–60 minutes with an AIIMS-led Biology faculty member, scheduled in PST evening or weekend morning.',
  },
]

export default async function NEETCoachingBayAreaUSAPage() {
  const pageUrl = `${BASE_URL}/neet-coaching-bay-area-usa`
  const courseOffers = neetNRIOffersForSchema('US', pageUrl)

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Cerebrum Biology Academy',
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        foundingDate: '2014',
        description:
          'Online NEET Biology coaching for Indian-American students across the San Francisco Bay Area.',
        telephone: '+918826444334',
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'San Francisco Bay Area' },
          { '@type': 'State', name: 'California' },
          { '@type': 'Country', name: 'United States' },
        ],
      },
      {
        '@type': 'Course',
        name: 'NEET Coaching for Bay Area Students',
        description:
          'Online NEET-UG Biology preparation for Indian-American students across Fremont, Sunnyvale, Cupertino, San Jose, Palo Alto, Mountain View and the broader Bay Area. AIIMS-trained faculty, PST evening batches.',
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
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'NEET Coaching USA',
            item: `${BASE_URL}/neet-coaching-nri-usa`,
          },
          { '@type': 'ListItem', position: 3, name: 'Bay Area', item: pageUrl },
        ],
      },
    ],
  }

  const waLink = `https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want NEET coaching for Bay Area (Fremont / Sunnyvale / Cupertino / San Jose / Palo Alto). Please share details and PST batch timings.')}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />

      <section className="bg-gradient-to-br from-green-800 via-green-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              Bay Area · PST Evening Batches · AP Biology + NEET
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">NEET Coaching in the Bay Area</h1>
            <p className="text-2xl text-green-50 mb-3">
              Online live classes for Indian-American students across Fremont, Sunnyvale, Cupertino,
              San Jose, Palo Alto, Mountain View, Saratoga and Milpitas.
            </p>
            <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">
              AIIMS-trained faculty led by Dr. Shekhar C Singh. PST evening batches that fit
              Lynbrook / Monta Vista / Mission San Jose / Gunn / Palo Alto HS schedules. AP Biology
              + NEET dual prep. USD pricing.
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
              <a
                href="#nri-pricing"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
              >
                See USD Pricing
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-green-100 mt-6">
              Or call directly:{' '}
              <a href="tel:+918826444334" className="font-semibold text-yellow-300 hover:underline">
                +91 88264-44334
              </a>{' '}
              · Free demo, no obligation · 680+ medical college admissions
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {[
              'AIIMS-Trained Faculty',
              'PST Evening Batches (6:30–9:00 PM)',
              'Weekend AM Batches Available',
              'AP Biology + NEET Dual Prep',
              'USD Pricing',
              'Dubai NEET Exam Centre (Travel Guidance)',
              'NRI Quota MBBS Guidance',
              'WhatsApp Doubts Across PST/IST',
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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Bay Area Cities We Serve
            </h2>
            <p className="text-lg text-slate-600">
              Online live classes — students from across the Bay Area share the same PST evening
              batches.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subAreas.map((c) => (
              <div key={c.name} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-1">{c.name}</h3>
                <p className="text-sm text-slate-500">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              <Clock className="w-6 h-6 text-green-700 inline mr-2" />
              PST-Friendly Class Timings
            </h2>
            <div className="space-y-3 text-slate-700">
              <p>
                <strong>Weekday evening batch:</strong> 6:30 PM – 9:00 PM PST (7:30 AM IST
                next-day). Fits Lynbrook / Monta Vista / Cupertino HS / Mission San Jose / Gunn /
                Palo Alto HS school schedules.
              </p>
              <p>
                <strong>Weekend morning batch:</strong> 8:00 AM – 11:00 AM PST Saturday + Sunday.
                Popular with families balancing extracurriculars and AP-prep.
              </p>
              <p>
                <strong>WhatsApp doubt support:</strong> Same-day response across PST and IST
                business hours via +91 88264-44334 (international number works from US).
              </p>
              <p>
                <strong>Recorded sessions:</strong> Every live class recorded — catch up within
                hours. Speed control 0.5x to 2x for revision passes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <NEETNRIPricingTiers forceCountry="US" />

      <section className="py-12 bg-gradient-to-r from-green-700 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-1">
                Book a free demo from the Bay Area.
              </h3>
              <p className="text-green-50 text-lg">
                Experience AIIMS-trained NEET Biology coaching in a PST evening slot.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
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

      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started Today</h2>
          <p className="text-xl text-slate-300 mb-2 max-w-2xl mx-auto">
            Free demo class. USD pricing. PST evening batches.
          </p>
          <p className="text-sm text-slate-400 mb-8">
            680+ medical college admissions · 98% NEET qualification rate
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
          <Phone className="w-4 h-4" />
          Call
        </a>
        <Link
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </Link>
      </div>
    </div>
  )
}
