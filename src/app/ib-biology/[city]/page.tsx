import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { cities, citySlugs, getCity, type CityConfig } from '@/data/ib-biology/cities'
import { MessageCircle, MapPin, Clock, CheckCircle2 } from 'lucide-react'

interface PageProps {
  params: Promise<{ city: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return citySlugs().map((city) => ({ city }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params
  const config = getCity(city)
  if (!config) return {}

  const url = `https://cerebrumbiologyacademy.com/ib-biology/${config.slug}`
  const title = `IB Biology Tutor ${config.city} | HL & SL, IA Coaching | Cerebrum`
  const description = `Expert IB Biology tutoring in ${config.city}, ${config.country}. HL & SL coaching with 2025-syllabus IA support. ${config.pricing.perHourText}. Timezone-matched online sessions for ${config.timezoneAbbr}.`
  return {
    title,
    description,
    keywords: [
      `IB Biology tutor ${config.city}`,
      `IB Biology tuition ${config.city}`,
      `IB Biology ${config.city}`,
      `IB Biology coaching ${config.city}`,
      `IB Biology online ${config.city}`,
      `${config.city} IB tutor`,
      `IB Biology HL ${config.city}`,
      `IB Biology SL ${config.city}`,
      `IB Biology IA help ${config.city}`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Cerebrum Biology Academy',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  }
}

function LocalBusinessSchema({ config }: { config: CityConfig }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'IB Biology Tutoring',
    name: `IB Biology Tutoring — ${config.city}`,
    url: `https://cerebrumbiologyacademy.com/ib-biology/${config.slug}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    areaServed: {
      '@type': 'City',
      name: config.city,
      containedInPlace: {
        '@type': 'Country',
        name: config.country,
      },
    },
    availableLanguage: 'English',
    offers: {
      '@type': 'Offer',
      priceCurrency: config.currency.code,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: config.pricing.perHour,
        priceCurrency: config.currency.code,
        unitText: 'HOUR',
      },
      availability: 'https://schema.org/InStock',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params
  const config = getCity(city)
  if (!config) notFound()

  const url = `https://cerebrumbiologyacademy.com/ib-biology/${config.slug}`

  const cityFAQs = [
    {
      question: `How do your IB Biology sessions work for students in ${config.city}?`,
      answer: `All sessions are live online and timed for ${config.timezoneAbbr}. We run in small groups (4–8 students) or 1-on-1, with HD video, a digital whiteboard, and recorded sessions you can review later. Students in ${config.city} typically join from home after school or during weekend blocks.`,
    },
    {
      question: `What is the typical fee for IB Biology tutoring in ${config.city}?`,
      answer: `Our IB Biology tutoring in ${config.city} is priced at ${config.pricing.perHourText} for group sessions, with packaged rates for 10+ hour blocks. 1-on-1 with an IB examiner costs more. We also offer a complete annual programme with bundled IA support — contact us on WhatsApp for a quote.`,
    },
    {
      question: `Do you help with the Internal Assessment for ${config.city} IB students?`,
      answer: `Yes. IA coaching is a core part of our programme. We guide students through topic selection (against the 2025 4-theme syllabus), experimental design, data analysis, and report writing. Our IA exemplars and the IA rubric breakdown are published openly on our IB Biology hub.`,
    },
    {
      question: `Which IB World Schools in ${config.city} do you support students from?`,
      answer: `Our tutors work with students from ${config.ibSchools.slice(0, 3).join(', ')}, and other IB schools across ${config.city}. We adapt to each school's IA and exam calendar.`,
    },
    {
      question: `Can I meet an IB Biology tutor in person in ${config.city}?`,
      answer: `Cerebrum\'s in-person centres are in Delhi NCR (South Extension, Rohini, Gurugram, Faridabad). For ${config.city}, all tutoring is online — which gives you access to our best IB examiners regardless of where they live. If you are visiting Delhi NCR, in-person meetings can be arranged.`,
    },
  ]

  return (
    <>
      <FAQSchema questions={cityFAQs} pageUrl={url} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: config.city, isCurrentPage: true },
        ]}
        showSchemaOnly
      />
      <LocalBusinessSchema config={config} />

      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/ib-biology" className="hover:text-white">
                    IB Biology
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-medium text-white">
                  {config.city}
                </li>
              </ol>
            </nav>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
                <MapPin className="h-3.5 w-3.5" />
                {config.city}, {config.country}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-300">
                <Clock className="h-3.5 w-3.5" />
                {config.timezoneAbbr}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-300">
                {config.pricing.perHourText}
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology Tutor in {config.city} — HL &amp; SL, 2025 Syllabus
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">{config.localHook}</p>
          </div>
        </section>

        {/* Value props */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              Why {config.city} IB Biology Students Choose Cerebrum
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Timezone-Matched Classes',
                  body: `All live sessions are scheduled for ${config.timezoneAbbr} — no 3 AM lessons, no awkward timezones.`,
                },
                {
                  title: 'Examiner Faculty',
                  body: 'Our IB Biology tutors include current and former IB examiners who have marked thousands of IAs.',
                },
                {
                  title: '2025 Syllabus Ready',
                  body: 'All materials are aligned to the new 4-theme structure (A–D) with Paper 3 removed.',
                },
                {
                  title: 'IA + EE Coaching',
                  body: '2025-rubric IA support (20% of grade) plus optional Extended Essay supervision for Diploma bonus points.',
                },
                {
                  title: 'Local Currency Pricing',
                  body: `Transparent pricing in ${config.currency.code} — ${config.pricing.perHourText}.`,
                },
                {
                  title: '24/7 WhatsApp Access',
                  body: 'Clear doubts between classes with direct WhatsApp access to your tutor.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-green-600" />
                  <h3 className="mb-2 font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IB Schools we support */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              IB World Schools We Support in {config.city}
            </h2>
            <p className="mb-8 text-gray-700">
              Our tutors have coached IB Biology students from these {config.country} schools. We
              adapt to each school\'s IA timeline, mock exam calendar, and internal reporting.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {config.ibSchools.map((school) => (
                <div
                  key={school}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3"
                >
                  <div className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                  <span className="text-gray-800">{school}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Not listed? Our programme supports every IB World School — contact us and we\'ll match
              you with a tutor familiar with your school\'s calendar.
            </p>
          </div>
        </section>

        {/* Service areas */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Neighbourhoods Served
            </h2>
            <p className="mb-6 text-gray-700">
              All tutoring is online so any neighbourhood in {config.city} is served — common
              catchment areas include:
            </p>
            <div className="flex flex-wrap gap-2">
              {config.neighbourhoods.map((n) => (
                <span
                  key={n}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              IB Biology Tutoring in {config.city} — FAQ
            </h2>
            <div className="space-y-4">
              {cityFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-green-600 group-open:rotate-180 transition-transform">
                        ▾
                      </span>
                    </h3>
                  </summary>
                  <p className="mt-4 leading-relaxed text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Other Cities</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {citySlugs()
                .filter((s) => s !== config.slug)
                .slice(0, 10)
                .map((s) => (
                  <Link
                    key={s}
                    href={`/ib-biology/${s}`}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
                  >
                    {cities[s].city}
                  </Link>
                ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/ib-biology"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                IB Biology Hub
              </Link>
              <Link
                href="/ib-biology-ia-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                IA Guide
              </Link>
              <Link
                href="/boards/ib"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Full Programme
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Book a Free Demo for {config.city}
            </h2>
            <p className="mb-8 text-lg text-green-100">
              30 minutes with an IB Biology tutor — discuss your target grade, IA topic, and a
              tailored study plan in {config.timezoneAbbr}.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent(`Hi! I'm in ${config.city} and want IB Biology tutoring.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              WhatsApp for Free Demo
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
