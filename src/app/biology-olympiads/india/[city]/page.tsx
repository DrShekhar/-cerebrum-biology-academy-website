import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Award, MapPin, School, Target } from 'lucide-react'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { GeoAwareSharedPricingMatrix } from '@/components/shared/GeoAwarePricingMatrix'
import { olympiadPricingProducts } from '@/data/olympiads/pricing-matrix'
import { olympiadCourseSchema, nsebHowToSchema } from '@/data/olympiads/schema-helpers'
import { LeadCaptureForm } from '@/components/landing/LeadCaptureForm'
import { FloatingWhatsAppButton } from '@/components/landing/FloatingWhatsAppButton'
import {
  olympiadCities,
  findOlympiadCity,
  type OlympiadCityEntry,
} from '@/data/olympiads/india-cities'

// Map olympiad India city slugs to matching IB city slugs for
// the "studying IB?" cross-sell block. All 12 olympiad cities
// now have IB parity.
const OLYMPIAD_TO_IB_CITY: Record<string, string> = {
  delhi: 'delhi',
  gurugram: 'gurugram',
  noida: 'noida',
  mumbai: 'mumbai',
  bangalore: 'bangalore',
  hyderabad: 'hyderabad',
  chennai: 'chennai',
  pune: 'pune',
  'south-delhi': 'south-delhi',
  faridabad: 'faridabad',
  rohini: 'rohini',
  kolkata: 'kolkata',
}

export const dynamicParams = false

export function generateStaticParams() {
  return olympiadCities.map((c) => ({ city: c.slug }))
}

interface PageProps {
  params: Promise<{ city: string }>
}

const BASE = 'https://cerebrumbiologyacademy.com'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params
  const entry = findOlympiadCity(city)
  if (!entry) return {}

  const pageUrl = `${BASE}/biology-olympiads/india/${entry.slug}`
  const title = `Biology Olympiad Coaching in ${entry.city} | NSEB, INBO, IBO Preparation`
  const description = `${entry.pitch} Campbell Biology coverage, 15 years of NSEB past papers, and 1:1 mentoring with senior olympiad tutors.`

  return {
    title,
    description,
    keywords: [
      `biology olympiad coaching ${entry.city.toLowerCase()}`,
      `NSEB coaching ${entry.city.toLowerCase()}`,
      `INBO preparation ${entry.city.toLowerCase()}`,
      `olympiad classes ${entry.city.toLowerCase()}`,
      `IBO coaching ${entry.city.toLowerCase()}`,
      `biology olympiad preparation ${entry.city.toLowerCase()}`,
      'campbell biology olympiad india',
      'nseb past papers coaching',
    ],
    alternates: {
      canonical: pageUrl,
      languages: {
        'en-IN': pageUrl,
        en: pageUrl,
        'x-default': `${BASE}/biology-olympiads`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: pageUrl,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Biology Olympiad Coaching ${entry.city} — Cerebrum`,
      description: entry.pitch,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

function buildCourseSchema(entry: OlympiadCityEntry, pageUrl: string) {
  return olympiadCourseSchema({
    name: `Biology Olympiad Coaching in ${entry.city}`,
    description: `NSEB, INBO, and IBO preparation programme for ${entry.city} students. Campbell Biology coverage, weekly past-paper drills, senior olympiad tutors.`,
    url: pageUrl,
    about: 'Biology Olympiad - NSEB, INBO, IBO',
    areaServed: { type: 'City', name: entry.city, containedIn: 'India' },
    inLanguage: 'en-IN',
  })
}

// LocalBusiness schema for cities with an offline centre.
// Emits telephone + areaServed + aggregateRating for Indian
// local-pack eligibility. Only cities with entry.inCentre
// build a schema; others (online-only cohorts) skip it.
function buildLocalBusinessSchema(entry: OlympiadCityEntry, pageUrl: string) {
  if (!entry.inCentre) return null

  const centreAddresses: Record<string, { street: string; locality: string; postalCode: string }> =
    {
      delhi: {
        street: 'D 35, South Extension Part 2',
        locality: 'New Delhi',
        postalCode: '110049',
      },
      'south-delhi': {
        street: 'D 35, South Extension Part 2',
        locality: 'New Delhi',
        postalCode: '110049',
      },
      gurugram: {
        street: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51',
        locality: 'Gurugram',
        postalCode: '122018',
      },
      faridabad: {
        street: 'Sector 17',
        locality: 'Faridabad',
        postalCode: '121002',
      },
    }

  const addr = centreAddresses[entry.slug]
  if (!addr) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: `Cerebrum Biology Academy — Biology Olympiad Coaching ${entry.city}`,
    description: `Biology Olympiad coaching centre in ${entry.city} offering NSEB, INBO, and IBO preparation. Offline classes plus online cohort access.`,
    url: pageUrl,
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      streetAddress: addr.street,
      addressLocality: addr.locality,
      addressRegion:
        entry.state === 'DL' ? 'Delhi' : entry.state === 'HR' ? 'Haryana' : entry.region,
      postalCode: addr.postalCode,
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: entry.city,
      containedInPlace: { '@type': 'Country', name: 'India' },
    },
    availableLanguage: ['English', 'Hindi'],
    priceRange: '₹₹',
  }
}

export default async function OlympiadCityPage({ params }: PageProps) {
  const { city } = await params
  const entry = findOlympiadCity(city)
  if (!entry) notFound()

  const pageUrl = `${BASE}/biology-olympiads/india/${entry.slug}`
  const campaign = `olympiad-india-${entry.slug}`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entry.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const courseSchema = buildCourseSchema(entry, pageUrl)
  const howToSchema = nsebHowToSchema(pageUrl)
  const localBusinessSchema = buildLocalBusinessSchema(entry, pageUrl)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      )}
      <BreadcrumbSchema
        items={[
          { label: 'Biology Olympiads', href: '/biology-olympiads' },
          { label: 'India', href: '/biology-olympiads' },
          { label: entry.city, isCurrentPage: true },
        ]}
        showSchemaOnly
      />
      <FAQSchema questions={entry.faqs} pageUrl={pageUrl} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-green-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-24">
            <div className="grid gap-10 lg:grid-cols-5 lg:items-start lg:gap-12">
              <div className="order-2 lg:order-1 lg:col-span-3">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                  <MapPin className="h-3.5 w-3.5 text-green-400" />
                  {entry.region} · {entry.state}
                </div>

                <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Biology Olympiad
                  <br />
                  <span className="text-green-400">coaching in {entry.city}.</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                  {entry.intro}
                </p>

                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Programme</dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">9-12 mo</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Past papers</dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">15+ yrs</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Delivery</dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">
                      {entry.inCentre ? 'Offline + Online' : 'Online'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-2">
                <LeadCaptureForm
                  source="hero"
                  campaign={campaign}
                  heading={`Book a free olympiad demo in ${entry.city}`}
                  subheading="Tell us your class and school. We match you to the right mentor in 15 minutes."
                  showFaculty
                />
              </div>
            </div>
          </div>
        </section>

        {/* Schools + centre */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Schools we serve in {entry.city}.
                </h2>
                <p className="mt-3 text-lg text-slate-600">
                  Students from these feeder schools have joined our NSEB and INBO cohorts. If your
                  school is not listed we serve all CBSE, ICSE, IB, and Cambridge students across
                  India.
                </p>

                <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {entry.schoolCatchment.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3"
                    >
                      <School className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span className="text-sm text-slate-700">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  {entry.inCentre
                    ? `${entry.city} offline + online.`
                    : `${entry.city} online programme.`}
                </h2>
                <p className="mt-3 text-lg text-slate-600">
                  {entry.inCentre
                    ? `Join offline intensive classes at our local centre, or the online national cohort — pick whichever fits your school schedule and commute.`
                    : `Our programme runs fully online for ${entry.city} students with IST-timezone live classes. Students who prefer offline can travel to our Delhi or Gurugram centres for intensive weekends.`}
                </p>

                <div className="mt-8 space-y-3">
                  {entry.inCentre && (
                    <Link
                      href={entry.inCentre.href}
                      className="flex items-start gap-3 rounded-xl border border-green-300 bg-green-50 p-5 transition-all hover:border-green-500"
                    >
                      <Target className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-700" />
                      <div>
                        <p className="font-semibold text-green-900">{entry.inCentre.label}</p>
                        <p className="mt-1 text-sm text-green-800">
                          In-centre olympiad batch plus online access.
                        </p>
                      </div>
                    </Link>
                  )}

                  <Link
                    href="/nseb-coaching"
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-green-300"
                  >
                    <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-700" />
                    <div>
                      <p className="font-semibold text-slate-900">NSEB national programme</p>
                      <p className="mt-1 text-sm text-slate-600">
                        9-12 month programme covering Stage 1 (NSEB) and Stage 2 (INBO).
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/biology-olympiads"
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-green-300"
                  >
                    <ArrowRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-700" />
                    <div>
                      <p className="font-semibold text-slate-900">All Biology Olympiads</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Global hub: IBO, USABO, BBO, SBO, INBO, NSEB and more.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <GeoAwareSharedPricingMatrix
          products={olympiadPricingProducts}
          heading={`Biology Olympiad coaching — pricing for ${entry.city}`}
          subheading="INR auto-shown for India visitors. USD reference on all programmes."
          equivalents={['INR', 'USD', 'AED', 'SGD', 'GBP', 'EUR']}
          regionalLinks={entry.relatedLinks.map((l) => ({ region: l.label, href: l.href }))}
        />

        {/* FAQs */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {entry.city} olympiad questions, answered.
            </h2>
            <div className="mt-8 space-y-3">
              {entry.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-slate-200 bg-white p-5 open:border-green-300"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
                    <span className="mt-0.5 text-slate-400 group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-sell: IB Biology (for students in IB schools) */}
        {OLYMPIAD_TO_IB_CITY[entry.slug] && (
          <section className="border-b border-slate-200 bg-white py-16 md:py-20">
            <div className="mx-auto max-w-5xl px-6">
              <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
                <div className="lg:col-span-2">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-green-700">
                    Studying IB in {entry.city}?
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    Campbell Biology is the same text for
                    <br />
                    <span className="text-green-700">IB HL and olympiads.</span>
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    If you are in Grade 11-12 IB HL Biology, layering NSEB onto your HL schedule
                    adds depth for university applications and opens the IBO path. We coach both
                    tracks from the same curriculum base.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link
                    href={`/ib-biology/${OLYMPIAD_TO_IB_CITY[entry.slug]}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    IB Biology in {entry.city}
                  </Link>
                  <Link
                    href="/ib-biology"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-green-500 hover:text-green-700"
                  >
                    IB Biology hub
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related cities */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Olympiad coaching in other cities.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {olympiadCities
                .filter((c) => c.slug !== entry.slug)
                .slice(0, 8)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/biology-olympiads/india/${c.slug}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-green-300 hover:shadow-sm"
                  >
                    <p className="text-xs uppercase tracking-wider text-slate-500">{c.region}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{c.city}</p>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Closing form */}
        <section className="bg-slate-950 py-14 md:py-20 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Start NSEB prep from {entry.city}.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  Free demo, no commitment. We confirm your class, school, and schedule
                  compatibility and assign a mentor within 15 minutes (working hours).
                </p>
              </div>
              <div className="lg:col-span-3">
                <LeadCaptureForm
                  source="final-cta"
                  campaign={campaign}
                  heading="Book your olympiad demo"
                  subheading="Same form, same promise."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Legal footer */}
        <section className="bg-white py-6">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
              <a href="/privacy-policy" className="underline hover:text-slate-900">
                Privacy
              </a>
              <a href="/terms-of-service" className="underline hover:text-slate-900">
                Terms
              </a>
              <a href="/contact" className="underline hover:text-slate-900">
                Contact
              </a>
            </div>
          </div>
        </section>

        <FloatingWhatsAppButton
          message={`Hi Cerebrum, I saw your Biology Olympiad page for ${entry.city} and would like details.`}
          campaign={campaign}
          tooltip={`Biology Olympiad in ${entry.city}? Chat with us`}
        />
      </main>
    </>
  )
}
