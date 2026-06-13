import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'
import type { ALevelCityConfig } from '@/data/a-level/cities'
import { aLevelPricingTiers } from '@/data/a-level/pricing-matrix'

interface ALevelBiologyCityTemplateProps {
  city: ALevelCityConfig
}

function ALevelSchemas({ city }: { city: ALevelCityConfig }) {
  const pageUrl = `https://cerebrumbiologyacademy.com/a-level-biology/${city.slug}`
  const siteUrl = 'https://cerebrumbiologyacademy.com'

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `A-Level Biology Tutoring — ${city.cityName}`,
    description: `Expert A-Level Biology tutoring for ${city.cityName} students. Covers ${city.examBoards.join(', ')} exam boards with examiner-led coaching.`,
    url: pageUrl,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: siteUrl,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      instructor: {
        '@id': `${siteUrl}/dr-shekhar-singh-neet-biology-faculty#person`,
      },
    },
    inLanguage: 'en',
    areaServed: {
      '@type': 'City',
      name: city.cityName,
      containedInPlace: {
        '@type': 'Country',
        name: city.country,
      },
    },
    offers: aLevelPricingTiers.map((tier) => ({
      '@type': 'Offer',
      name: `A-Level Biology — ${tier.name}`,
      price: tier.priceGBP,
      priceCurrency: 'GBP',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: tier.priceGBP,
        priceCurrency: 'GBP',
        unitText: 'ANN',
      },
      availability: 'https://schema.org/InStock',
      url: `${pageUrl}#pricing`,
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
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
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'A-Level Biology',
        item: `${siteUrl}/a-level-biology-tutor`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: city.cityName,
        item: pageUrl,
      },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `A-Level Biology Tutor in ${city.cityName}`,
    url: pageUrl,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="title"]', '[data-speakable="summary"]'],
    },
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/dr-shekhar-singh-neet-biology-faculty#person`,
    name: 'Dr. Shekhar C Singh',
    alternateName: ['Dr. Shekhar Singh', 'Dr. SC Singh'],
    jobTitle: 'Founder & Lead Biology Faculty',
    description: `AIIMS-trained A-Level Biology educator covering Cambridge, Edexcel, AQA, and OCR exam boards for ${city.cityName} students.`,
    url: `${siteUrl}/dr-shekhar-singh-neet-biology-faculty`,
    image: `${siteUrl}/images/dr-shekhar-singh.webp`,
    affiliation: {
      '@type': 'EducationalOrganization',
      '@id': `${siteUrl}/#organization`,
      name: 'Cerebrum Biology Academy',
    },
    knowsAbout: [
      'A-Level Biology',
      'Cambridge 9700',
      'Edexcel IAL',
      'AQA Biology',
      'OCR Biology',
      'UCAS Medicine Applications',
    ],
    sameAs: [`${siteUrl}/dr-shekhar-singh-neet-biology-faculty`],
  }

  return (
    <>
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
    </>
  )
}

const waUrl = (cityName: string) =>
  `https://wa.me/918826444334?text=${encodeURIComponent(`Hi! I'm in ${cityName} and want A-Level Biology tutoring.`)}`

export function ALevelBiologyCityTemplate({ city }: ALevelBiologyCityTemplateProps) {
  const wa = waUrl(city.cityName)

  return (
    <>
      <ALevelSchemas city={city} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-950 via-green-900 to-green-800 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-green-200">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/a-level-biology-tutor" className="hover:text-white">
                    A-Level Biology
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-medium text-white">
                  {city.cityName}
                </li>
              </ol>
            </nav>

            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-300">
                {city.cityName}, {city.country}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-300">
                {city.timezone}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-300">
                {city.pricing.perHourText}
              </span>
            </div>

            <h1
              className="mb-6 text-4xl font-bold leading-tight sm:text-5xl"
              data-speakable="title"
            >
              A-Level Biology Tutor in {city.cityName}
            </h1>
            <p className="max-w-3xl text-lg text-green-100 sm:text-xl" data-speakable="summary">
              {city.heroBlurb}
            </p>
          </div>
        </section>

        {/* Exam Boards Covered */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              Exam Boards We Cover in {city.cityName}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {city.examBoards.map((board) => {
                const boardInfo: Record<string, { full: string; detail: string }> = {
                  AQA: {
                    full: 'AQA A-Level Biology',
                    detail:
                      '7402 specification. Topics 1-8 across AS and A2. Emphasis on practical skills and essay questions.',
                  },
                  OCR: {
                    full: 'OCR A-Level Biology A',
                    detail:
                      'H420 specification. Modules 1-6 covering biological processes and biological diversity.',
                  },
                  Edexcel: {
                    full: 'Edexcel (Pearson) A-Level Biology',
                    detail: 'Salters-Nuffield or standard route. Topics 1-8 with core practicals.',
                  },
                  CAIE: {
                    full: 'Cambridge International A-Level Biology',
                    detail:
                      '9700 specification. Papers 1-5 including practical skills and planning/analysis.',
                  },
                }
                const info = boardInfo[board]
                return (
                  <div key={board} className="rounded-2xl border border-green-200 bg-green-50 p-6">
                    <div className="mb-2 text-lg font-bold text-green-900">{board}</div>
                    <div className="mb-2 text-sm font-medium text-green-800">{info.full}</div>
                    <p className="text-sm text-green-700">{info.detail}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Local Schools */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Schools We Support in {city.cityName}
            </h2>
            <p className="mb-8 text-gray-700">
              Our tutors have coached A-Level Biology students from these {city.country} schools. We
              adapt to each school&apos;s exam board, mock calendar, and practical schedule.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {city.schools.map((school) => (
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
              Not listed? Our programme supports every school offering A-Level Biology — contact us
              and we will match you with a tutor familiar with your board and school calendar.
            </p>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section id="pricing" className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              A-Level Biology Pricing
            </h2>
            <p className="mb-10 text-gray-700">
              Three tiers to match your target grade and budget. All prices shown in GBP with USD
              equivalents. Local currency pricing ({city.pricing.currencySymbol}) — contact us for a
              quote.
            </p>
            <div className="grid gap-6 lg:grid-cols-3">
              {aLevelPricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`rounded-2xl border p-8 ${
                    tier.highlight
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-500'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {tier.highlight && (
                    <div className="mb-4 inline-block rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{tier.subtitle}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      £{tier.priceGBP.toLocaleString()}
                    </span>
                    <span className="text-gray-600"> {tier.unitLabel}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    ${tier.priceUSD.toLocaleString()} USD equivalent
                  </p>
                  <div className="mt-3 space-y-1 text-sm text-gray-700">
                    <div>Batch size: {tier.batchSize}</div>
                    <div>{tier.oneOnOneFrequency}</div>
                    <div>Target grade: {tier.targetGrade}</div>
                  </div>
                  <p className="mt-4 text-sm text-gray-700">{tier.description}</p>
                  <ul className="mt-6 space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-0.5 text-green-600">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 block rounded-lg px-4 py-3 text-center text-sm font-semibold ${
                      tier.highlight
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Enquire — {tier.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              A-Level Biology Tutoring in {city.cityName} — FAQ
            </h2>
            <div className="space-y-4">
              {city.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-green-600 transition-transform group-open:rotate-180">
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
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Explore Other Programmes</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/a-level-biology-tutor"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                A-Level Biology Hub
              </Link>
              <Link
                href="/ib-biology"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                IB Biology
              </Link>
              <Link
                href="/courses"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                NEET Biology
              </Link>
              <Link
                href="/biology-olympiads"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Biology Olympiads
              </Link>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Book a Free Demo for {city.cityName}
            </h2>
            <p className="mb-8 text-lg text-green-100">
              30 minutes with an A-Level Biology tutor — discuss your target grade, exam board, and
              a tailored study plan in {city.timezone}.
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              WhatsApp for Free Demo
            </a>
          </div>
        </section>

        <StickyMobileCTABar waUrl={wa} />
      </main>
    </>
  )
}
