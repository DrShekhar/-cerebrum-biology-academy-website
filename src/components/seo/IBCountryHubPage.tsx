'use client'

import Link from 'next/link'
import Script from 'next/script'
import { GraduationCap, MapPin, School, ArrowRight, MessageCircle } from 'lucide-react'
import { FAQSchema, FAQDisplay } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  citiesForCountry,
  schoolsForCountry,
  type IBCountryHub,
} from '@/data/ib-biology/countryHubs'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export function IBCountryHubPage({ hub }: { hub: IBCountryHub }) {
  const path = `/ib-biology-tutor-${hub.slug}`
  const pageUrl = `${BASE_URL}${path}`
  const cityList = citiesForCountry(hub.countryCode)
  const schoolList = schoolsForCountry(hub.countryCode)
  const waMessage = `Hi! I am looking for an IB Biology tutor in ${hub.countryName}.`

  // ItemList of the child pages this hub aggregates — signals the hub→page
  // relationship to search + AI.
  const childUrls = [
    ...cityList.map((c) => `${BASE_URL}/ib-biology/${c.slug}`),
    ...schoolList.map((s) => `${BASE_URL}/ib-biology-tutor-${s.slug}`),
  ]

  return (
    <main className="min-h-screen bg-white">
      <Script
        id={`ib-country-${hub.slug}-course-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: `IB Biology Tutoring — ${hub.countryName}`,
            description: hub.metaDescription,
            url: pageUrl,
            teaches: 'IB Biology HL and SL (2025 syllabus)',
            inLanguage: 'en',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: BASE_URL,
              sameAs: `${BASE_URL}/ib-biology-tutor`,
            },
          }),
        }}
      />
      {childUrls.length > 0 && (
        <Script
          id={`ib-country-${hub.slug}-itemlist`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: `IB Biology tutoring locations & schools in ${hub.countryName}`,
              itemListElement: childUrls.map((url, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url,
              })),
            }),
          }}
        />
      )}
      <CerebrumPersonSchema
        knowsAbout={[
          'IB Biology',
          'IB Biology HL',
          'IB Biology SL',
          'IB Diploma Programme Biology',
        ]}
        jobTitle="Founder & Lead IB Biology Tutor"
      />
      <FAQSchema questions={hub.faqs} pageUrl={pageUrl} />
      <BreadcrumbSchema
        showHome={false}
        showSchemaOnly
        items={[
          { label: 'Home', href: '/' },
          { label: 'IB Biology Tutor', href: '/ib-biology-tutor' },
          { label: hub.heroTagline, href: path, isCurrentPage: true },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            <GraduationCap className="h-4 w-4" />
            IB Diploma Programme · HL &amp; SL · 2025 syllabus
          </div>
          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            {hub.heroTagline}
          </h1>
          <p className="mt-4 max-w-2xl text-blue-50 text-lg">{hub.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() =>
                trackAndOpenWhatsApp({
                  source: path,
                  page: path,
                  message: waMessage,
                  buttonText: `IB Biology tutor ${hub.slug}`,
                })
              }
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Book a free consultation
            </button>
            <div className="flex gap-2">
              <Link
                href="/ib-biology-hl-tutor"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-4 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
              >
                HL tutoring
              </Link>
              <Link
                href="/ib-biology-sl-tutor"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-4 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
              >
                SL tutoring
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cities */}
      {cityList.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-14">
          <div className="flex items-center gap-2 text-teal-700">
            <MapPin className="h-5 w-5" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              IB Biology tutoring by city in {hub.countryName}
            </h2>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cityList.map((c) => (
              <Link
                key={c.slug}
                href={`/ib-biology/${c.slug}`}
                className="rounded-xl border border-gray-200 p-5 transition-colors hover:border-blue-500 hover:bg-blue-50"
              >
                <p className="font-semibold text-gray-900">{c.city}</p>
                <p className="mt-1 text-sm text-gray-600">{c.region}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-700">
                  IB Biology tutor in {c.city} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Schools */}
      {schoolList.length > 0 && (
        <section className="bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 py-14">
            <div className="flex items-center gap-2 text-teal-700">
              <School className="h-5 w-5" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                IB World Schools we tutor for in {hub.countryName}
              </h2>
            </div>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {schoolList.map((s) => (
                <Link
                  key={s.slug}
                  href={`/ib-biology-tutor-${s.slug}`}
                  className="rounded-xl bg-white border border-gray-200 p-5 transition-colors hover:border-blue-500 hover:bg-blue-50"
                >
                  <p className="font-semibold text-gray-900">{s.schoolName}</p>
                  <p className="mt-1 text-sm text-gray-600">{s.cityCountry}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-700">
                    IB Biology tutoring for {s.shortName} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-14">
        <FAQDisplay
          questions={hub.faqs}
          title={`IB Biology tutoring in ${hub.countryName} — FAQs`}
        />
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-700 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Find your IB Biology tutor in {hub.countryName}
          </h2>
          <p className="mt-3 text-blue-50">
            Free consultation — we&apos;ll map your school, your level (HL or SL), and your target
            grade to a plan.
          </p>
          <div className="mt-7">
            <button
              onClick={() =>
                trackAndOpenWhatsApp({
                  source: `${path}-cta`,
                  page: path,
                  message: waMessage,
                  buttonText: `IB Biology ${hub.slug} CTA`,
                })
              }
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Message us on WhatsApp
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
