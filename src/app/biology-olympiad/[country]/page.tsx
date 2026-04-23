import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Award, Target, Globe } from 'lucide-react'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { GeoAwareSharedPricingMatrix } from '@/components/shared/GeoAwarePricingMatrix'
import { olympiadPricingProducts } from '@/data/olympiads/pricing-matrix'
import { olympiadCourseSchema } from '@/data/olympiads/schema-helpers'
import { LeadCaptureForm } from '@/components/landing/LeadCaptureForm'
import { FloatingWhatsAppButton } from '@/components/landing/FloatingWhatsAppButton'
import {
  countryOlympiads,
  findCountryOlympiad,
  type CountryOlympiadEntry,
} from '@/data/olympiads/country-olympiads'

export const dynamicParams = false

export function generateStaticParams() {
  return countryOlympiads.map((c) => ({ country: c.slug }))
}

interface PageProps {
  params: Promise<{ country: string }>
}

const BASE = 'https://cerebrumbiologyacademy.com'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params
  const entry = findCountryOlympiad(country)
  if (!entry) return {}

  const pageUrl = `${BASE}/biology-olympiad/${entry.slug}`
  const title = `${entry.acronym} Coaching | ${entry.fullName} | Biology Olympiad`
  const description = `${entry.pitch} Campbell Biology coverage, past-paper drills, and senior olympiad tutors for ${entry.country} students. ${entry.examWindow}.`

  return {
    title,
    description,
    keywords: [
      `${entry.acronym.toLowerCase()} coaching`,
      `${entry.fullName.toLowerCase()}`,
      `biology olympiad ${entry.country.toLowerCase()}`,
      `ibo preparation ${entry.country.toLowerCase()}`,
      `${entry.acronym.toLowerCase()} preparation`,
      `${entry.acronym.toLowerCase()} online coaching`,
      'campbell biology olympiad',
      'ibo team selection',
    ],
    alternates: {
      canonical: pageUrl,
      languages: {
        [entry.locale]: pageUrl,
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
    },
    twitter: {
      card: 'summary_large_image',
      title: `${entry.acronym} Coaching — Cerebrum Biology Academy`,
      description: entry.pitch,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

function buildCourseSchema(entry: CountryOlympiadEntry, pageUrl: string) {
  return olympiadCourseSchema({
    name: `${entry.acronym} Coaching Programme (${entry.country})`,
    description: `${entry.acronym} (${entry.fullName}) preparation for ${entry.country} students. Campbell Biology coverage with past-paper drills, mock exams, and senior olympiad tutors.`,
    url: pageUrl,
    about: `${entry.acronym} - ${entry.fullName}`,
    areaServed: { type: 'Country', name: entry.country },
  })
}

export default async function CountryOlympiadPage({ params }: PageProps) {
  const { country } = await params
  const entry = findCountryOlympiad(country)
  if (!entry) notFound()

  const pageUrl = `${BASE}/biology-olympiad/${entry.slug}`
  const campaign = `olympiad-${entry.slug}`

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
  // HowTo schema removed from country pages (was identical across all 6
  // countries — duplicate-schema signal). The canonical IBO practical prep
  // HowTo lives on /ibo-preparation; country pages now focus on Course +
  // FAQ + Breadcrumb with country-specific content.

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
      <BreadcrumbSchema
        items={[
          { label: 'Biology Olympiads', href: '/biology-olympiads' },
          { label: `${entry.country} (${entry.acronym})`, isCurrentPage: true },
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
                  <span aria-hidden="true">{entry.flag}</span>
                  {entry.acronym} · {entry.country} · {entry.examWindow}
                </div>

                <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {entry.acronym} coaching for
                  <br />
                  <span className="text-green-400">{entry.country} students.</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                  {entry.intro}
                </p>

                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      Organised by
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-white">
                      {entry.organisedBy.split('/')[0].trim()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Selects</dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">Team of 4</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Destination</dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">IBO</dd>
                  </div>
                </dl>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-2">
                <LeadCaptureForm
                  source="hero"
                  campaign={campaign}
                  heading={`Book a free ${entry.acronym} demo`}
                  subheading={`Tell us your class and school in ${entry.country}. We match you to the right mentor in 15 minutes.`}
                  showFaculty
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pathway */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {entry.country}&rsquo;s pathway to IBO.
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                Four stages. The same mentor with you through every one.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {entry.pathway.map((s) => (
                <div key={s.name} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                    {s.stage}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">{s.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              {entry.relatedLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-green-300 bg-green-50 px-4 py-2 font-medium text-green-800 hover:bg-green-100"
                >
                  {l.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Why {entry.country} students pick Cerebrum.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Award className="h-5 w-5 text-green-700" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  Senior olympiad tutors
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Your 1:1 coach is a senior biology tutor with deep olympiad-paper experience.
                  Feedback is exam-paper specific, not theoretical.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Target className="h-5 w-5 text-green-700" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Past papers, weekly</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  10+ years of national past papers drilled on timed cadence with examiner-style
                  feedback on every submission.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Globe className="h-5 w-5 text-green-700" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  Country-aware scheduling
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Live sessions scheduled on {entry.country}-friendly timings. All sessions
                  recorded. 1:1 mentoring slots arranged per student preference.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <GeoAwareSharedPricingMatrix
          products={olympiadPricingProducts}
          heading={`${entry.acronym} coaching — pricing in your currency`}
          subheading={`USD reference price. ${entry.currencyOrder[0]} auto-shown for ${entry.country} visitors.`}
          equivalents={entry.currencyOrder}
          regionalLinks={entry.relatedLinks.map((l) => ({ region: l.label, href: l.href }))}
        />

        {/* FAQs */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {entry.acronym} questions, answered.
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

        {/* Closing form */}
        <section className="bg-slate-950 py-14 md:py-20 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Ready to start {entry.acronym} prep?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  Free demo, no commitment. We confirm your class and school and assign a mentor
                  within 15 minutes (working hours).
                </p>
              </div>
              <div className="lg:col-span-3">
                <LeadCaptureForm
                  source="final-cta"
                  campaign={campaign}
                  heading={`Book your ${entry.acronym} demo`}
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
          message={`Hi Cerebrum, I saw your ${entry.acronym} coaching page for ${entry.country} and would like details.`}
          campaign={campaign}
          tooltip={`Questions about ${entry.acronym}? Chat with us`}
        />
      </main>
    </>
  )
}
