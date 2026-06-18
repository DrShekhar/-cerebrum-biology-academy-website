/**
 * IBOCountryTemplate — props-driven UI for /ibo-coaching-{country} pages.
 * Server component. Each render is differentiated by the country's real
 * national-olympiad selection route + national olympiad + time zone.
 */

import Link from 'next/link'
import {
  Award,
  ChevronRight,
  Globe,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  Trophy,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import type { IBOCountry } from '@/data/ibo/iboCountries'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

export default function IBOCountryTemplate({ country }: { country: IBOCountry }) {
  const pageUrl = `${SITE_URL}/ibo-coaching-${country.slug}`
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      `Hi — I'm in ${country.country} and want IBO / ${country.nationalOlympiad} coaching (Grade/Year ___). Please share programme details and a free assessment slot.`
    )

  const sharedFaqs = [
    {
      question: 'What does Cerebrum coach for the IBO route?',
      answer:
        'Campbell-based, IBO-syllabus-depth biology coaching with AIIMS-trained faculty — molecular and cell biology, genetics, physiology, ecology, evolution, plus practical-exam and past-paper drilling. IBO-syllabus mastery transfers across every national selection route, so the same depth prepares you for both your national olympiad and the IBO itself.',
    },
    {
      question: 'Is this live and in my time zone?',
      answer: `Yes — live small-batch classes in ${country.timezone}, scheduled around school. 1:1 and micro-batch options available.`,
    },
  ]
  const faqs = [...country.faqs, ...sharedFaqs]

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${pageUrl}#course`,
    name: `IBO Coaching in ${country.country} — ${country.nationalOlympiad} to International Biology Olympiad`,
    description: `International Biology Olympiad (IBO) preparation for ${country.country} students via the ${country.nationalOlympiadFull} (${country.nationalOlympiad}) selection route. AIIMS-trained faculty, ${country.timezone} live classes, Campbell-based depth.`,
    url: pageUrl,
    inLanguage: 'en',
    educationalLevel: 'High school — biology olympiad / IBO track',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: country.country },
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'IBO Preparation',
        item: `${SITE_URL}/ibo-preparation`,
      },
      { '@type': 'ListItem', position: 3, name: `${country.country} (IBO)`, item: pageUrl },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          `IBO Coaching ${country.country}`,
          `${country.nationalOlympiad} Coach`,
          'International Biology Olympiad',
          'Biology Olympiad Selection',
        ]}
        jobTitle="Biology Olympiad Coach — IBO & National Selection"
      />
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

      <main className="min-h-screen bg-white">
        <nav className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-blue-700 flex items-center gap-1">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/ibo-preparation" className="hover:text-blue-700">
                IBO Preparation
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">{country.country}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <Globe className="h-3.5 w-3.5" />
            {country.flag} IBO via {country.nationalOlympiad} · {country.timezone}
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            IBO coaching for {country.country} students &mdash;{' '}
            <span className="text-blue-700">the {country.nationalOlympiad} route.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            {country.heroBlurb}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-green-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp for a free assessment
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              <Phone className="h-5 w-5" />
              Call +91 88264 44334
            </a>
          </div>
        </section>

        {/* Selection ladder */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-12">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              The {country.country} route to the IBO
            </h2>
            <p className="mt-3 text-slate-600">
              The path runs through the{' '}
              <Link href={country.nationalOlympiadHref} className="text-blue-700 underline">
                {country.nationalOlympiadFull} ({country.nationalOlympiad})
              </Link>
              . We coach every stage.
            </p>
            <ol className="mt-7 space-y-4">
              {country.selectionSteps.map((step, i) => (
                <li key={i} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {i === country.selectionSteps.length - 1 ? (
                      <Trophy className="mr-1 inline h-4 w-4 text-amber-500" />
                    ) : (
                      <Route className="mr-1 inline h-4 w-4 text-blue-600" />
                    )}
                    {step}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-slate-500">
              IBO-syllabus mastery transfers across every national route &mdash; see the{' '}
              <Link href="/ibo-preparation" className="text-blue-700 underline">
                full IBO programme
              </Link>{' '}
              and{' '}
              <Link href="/biology-olympiads" className="text-blue-700 underline">
                all national olympiads
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              IBO &amp; {country.nationalOlympiad} in {country.country} &mdash; questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200">
              {faqs.map((f, idx) => (
                <details key={idx} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    <span>{f.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Award className="mx-auto h-10 w-10 text-amber-300" />
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Free IBO assessment for {country.country} students
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              A short live session in {country.timezone} to gauge your level and map the{' '}
              {country.nationalOlympiad} &rarr; IBO route.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-base font-semibold hover:bg-green-700"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Cerebrum
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <Phone className="h-5 w-5" />
                Call +91 88264 44334
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
