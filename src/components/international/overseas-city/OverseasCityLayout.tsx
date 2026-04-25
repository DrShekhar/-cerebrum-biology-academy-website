'use client'

import Link from 'next/link'
import {
  Globe,
  Clock,
  GraduationCap,
  MapPin,
  CheckCircle,
  Phone,
  Calendar,
  BookOpen,
  Users,
} from 'lucide-react'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'

export interface OverseasCityLayoutProps {
  // Hero
  cityName: string
  country: string
  heroTagline: string
  heroPill: string
  // Key stats (4 cards)
  timezoneLabel: string
  timezoneStart: string
  communityStat: string
  communityLabel: string
  curriculumLabel: string
  curriculumDescription: string
  nearestCentre: string
  nearestCentreLabel: string
  // Benefits (3 cards — curriculum bridge is customizable)
  curriculumBridgeTitle: string
  curriculumBridgeBody: string
  // Exam centre callout
  examCentreBody: React.ReactNode
  // Schools section
  schoolsIntro: string
  schoolsColumn1Title: string
  schoolsColumn1: string[]
  schoolsColumn2Title: string
  schoolsColumn2: string[]
  schoolsFooter: string
  // Class timings
  timingsLabelPrimary: string // e.g. "London (GMT)"
  timingsPrimaryWeekday: string // e.g. "4:00 PM – 6:30 PM"
  timingsLabelSecondary: string // e.g. "London (BST)"
  timingsSecondaryWeekday: string
  timingsPrimaryWeekend: string
  timingsSecondaryWeekend: string
  timingsFootnote: string
  // Pricing section label
  pricingCityLabel: string
  // FAQ & CTA
  faqs: Array<{ q: string; a: string }>
  ctaWhatsAppLinkEncoded: string // percent-encoded message suffix (e.g. 'from%20Ajman')
  relatedCityKey: string
}

export function OverseasCityLayout(props: OverseasCityLayoutProps) {
  const {
    cityName,
    country,
    heroTagline,
    heroPill,
    timezoneLabel,
    timezoneStart,
    communityStat,
    communityLabel,
    curriculumLabel,
    curriculumDescription,
    nearestCentre,
    nearestCentreLabel,
    curriculumBridgeTitle,
    curriculumBridgeBody,
    examCentreBody,
    schoolsIntro,
    schoolsColumn1Title,
    schoolsColumn1,
    schoolsColumn2Title,
    schoolsColumn2,
    schoolsFooter,
    timingsLabelPrimary,
    timingsPrimaryWeekday,
    timingsLabelSecondary,
    timingsSecondaryWeekday,
    timingsPrimaryWeekend,
    timingsSecondaryWeekend,
    timingsFootnote,
    pricingCityLabel,
    faqs,
    ctaWhatsAppLinkEncoded,
    relatedCityKey,
  } = props

  const whatsAppHref = `https://wa.me/918826444334?text=Hi%2C%20I%20am%20${ctaWhatsAppLinkEncoded}%20and%20want%20a%20free%20NEET%20Biology%20demo`

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <section className="relative py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-teal-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm mb-4">
            <Globe className="w-4 h-4" />
            <span>{heroPill}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Biology Coaching in
            <br />
            <span className="text-blue-200">
              {cityName}, {country}
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">{heroTagline}</p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Link
              href={whatsAppHref}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-5 h-5" /> WhatsApp for Free Demo
            </Link>
            <Link
              href="#pricing"
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View Pricing
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> {timezoneLabel} live classes
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> {curriculumLabel} dual prep
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Class 9–12 + droppers
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-bold">{timezoneStart}</p>
            <p className="text-sm text-gray-500">Typical class start</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-lg font-bold">{communityStat}</p>
            <p className="text-sm text-gray-500">{communityLabel}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <BookOpen className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <p className="text-lg font-bold">{curriculumLabel}</p>
            <p className="text-sm text-gray-500">{curriculumDescription}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <MapPin className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-lg font-bold">{nearestCentre}</p>
            <p className="text-sm text-gray-500">{nearestCentreLabel}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why {cityName} students join Cerebrum
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-blue-100 bg-blue-50">
              <GraduationCap className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">AIIMS-led Biology faculty</h3>
              <p className="text-gray-600">
                Dr. Shekhar C Singh (AIIMS alum) leads the Biology programme. NCERT-aligned teaching
                tuned to NEET-UG.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-green-100 bg-green-50">
              <BookOpen className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">{curriculumBridgeTitle}</h3>
              <p className="text-gray-600">{curriculumBridgeBody}</p>
            </div>
            <div className="p-6 rounded-xl border border-teal-100 bg-teal-50">
              <Globe className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">NRI quota guidance</h3>
              <p className="text-gray-600">
                Clarity on how the 15% NRI MBBS quota works in India. We do not provide visa or
                legal services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-md p-8 border border-blue-100">
            <div className="flex items-start gap-4">
              <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">NEET exam centre logistics</h3>
                <div className="text-gray-700 mb-3">{examCentreBody}</div>
                <p className="text-sm text-gray-500">
                  Note: NTA publishes overseas exam cities each year. Availability can change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">{cityName} schools we support</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{schoolsIntro}</p>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">{schoolsColumn1Title}</h3>
                <ul className="space-y-1 text-gray-700">
                  {schoolsColumn1.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">{schoolsColumn2Title}</h3>
                <ul className="space-y-1 text-gray-700">
                  {schoolsColumn2.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center">{schoolsFooter}</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Class timings for {cityName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Weekday Live Classes</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">{timingsLabelPrimary}:</span>{' '}
                {timingsPrimaryWeekday}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">{timingsLabelSecondary}:</span>{' '}
                {timingsSecondaryWeekday}
              </p>
              <p className="text-gray-600 mt-4">{timingsFootnote}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Weekend Doubt Clearing</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">{timingsLabelPrimary}:</span>{' '}
                {timingsPrimaryWeekend}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">{timingsLabelSecondary}:</span>{' '}
                {timingsSecondaryWeekend}
              </p>
              <p className="text-gray-600 mt-4">Sat &amp; Sun, optional attendance.</p>
            </div>
          </div>
        </div>
      </section>

      <div id="pricing">
        <PricingSection cityName={pricingCityLabel} />
      </div>
      <CostComparisonSection cityName={pricingCityLabel} />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          FAQs — NEET coaching in {cityName}, {country}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white rounded-xl border border-gray-200 p-6 open:shadow-md transition-shadow"
            >
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>{faq.q}</span>
                <span className="text-blue-600 group-open:rotate-45 transition-transform text-2xl">
                  +
                </span>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-100" />
          <h2 className="text-3xl font-bold mb-4">Book a free Biology demo from {cityName}</h2>
          <p className="text-blue-100 mb-8 text-lg">
            See the teaching style before you decide. 45–60 minute live session with an AIIMS-led
            faculty.
          </p>
          <Link
            href={whatsAppHref}
            className="inline-flex bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-bold text-lg items-center gap-2 transition-colors"
          >
            <Phone className="w-5 h-5" /> WhatsApp +91-8826444334
          </Link>
        </div>
      </section>

      <RelatedCityLinks currentCity={relatedCityKey} variant="default" />
    </div>
  )
}
