/**
 * NearMeCityTemplate — rich locality page template for the 48
 * /neet-coaching-near-me-{city} pages.
 *
 * Consumes per-city data from src/data/locality-content/near-me-cities.ts.
 * Each city renders 1,500+ words of city-unique content composed from
 * the data, framed by the same structural sections (so the design is
 * consistent but the content is unique).
 *
 * GOAL: take these pages from Google's "Crawled - currently not
 * indexed" bucket (1,577 site-wide pages) by giving Google clearly
 * unique, locally-specific, useful content for every city.
 */

import Link from 'next/link'
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Globe,
  Home,
  MapPin,
  MessageCircle,
  Microscope,
  Phone,
  School,
  Stethoscope,
  Users,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { INDIAN_STATES } from '@/components/seo/StateSchema'
import type { NearMeCityData } from '@/data/locality-content/near-me-cities'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

// Only 6 states have live /states/{slug} pages (dynamicParams=false elsewhere
// 404s). The old breadcrumb linked /neet-coaching-{state} which existed for
// zero states — a broken crumb on every page using this template.
function stateBreadcrumbHref(stateName: string): string | null {
  const slug = stateName
    .toLowerCase()
    .replace(/\s*\(ut\)\s*/g, '')
    .trim()
    .replace(/\s+/g, '-')
  return slug in INDIAN_STATES ? `/states/${slug}` : null
}

interface Props {
  city: NearMeCityData
}

export function NearMeCityTemplate({ city }: Props) {
  const pageUrl = `${SITE_URL}/neet-coaching-near-me-${city.slug}`
  const waMessage = `Hi — I'm a NEET aspirant from ${city.displayName} (${city.state}). I'd like to know about Cerebrum's online biology coaching that fits alongside my school + PCM prep. Please share live class timings and how to join.`
  const waUrl = `https://wa.me/918826444334?text=${encodeURIComponent(waMessage)}`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: `NEET Coaching ${city.state}`,
        item: stateBreadcrumbHref(city.state)
          ? `${SITE_URL}${stateBreadcrumbHref(city.state)}`
          : `${SITE_URL}/neet-coaching`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `NEET Coaching Near Me in ${city.displayName}`,
        item: pageUrl,
      },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${pageUrl}#course`,
    name: `Online NEET Biology Coaching for ${city.displayName} Students`,
    description: `Live online NEET Biology coaching for ${city.displayName} students preparing for AIIMS / ${city.stateQuotaCollege} / state-quota medical colleges. AIIMS-trained faculty, 10-40 student batches, NCERT-line-by-line, weekly tests. Pair with your existing PCM coaching (${city.localCoachingPresence.split(',')[0].trim()}).`,
    url: pageUrl,
    inLanguage: 'en-IN',
    educationalLevel: `NEET-UG Aspirant (${city.displayName}, ${city.state})`,
    provider: { '@id': `${SITE_URL}/#organization` },
    audience: {
      '@type': 'EducationalAudience',
      audienceType: `NEET aspirants from ${city.displayName}, ${city.state}`,
      geographicArea: { '@type': 'City', name: city.displayName },
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.localFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema
        knowsAbout={[
          `NEET Biology Coaching ${city.displayName}`,
          `NEET Biology ${city.state}`,
          `NEET Coaching for ${city.displayName} students`,
          'NEET Biology Online Coaching',
          ...(city.altNames?.map((n) => `NEET Coaching ${n}`) ?? []),
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-indigo-700 flex items-center gap-1">
              <Home className="h-3.5 w-3.5" /> Home
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5" />
          <li>
            {stateBreadcrumbHref(city.state) ? (
              <Link href={stateBreadcrumbHref(city.state)!} className="hover:text-indigo-700">
                NEET Coaching {city.state}
              </Link>
            ) : (
              <span>NEET Coaching {city.state}</span>
            )}
          </li>
          <ChevronRight className="h-3.5 w-3.5" />
          <li className="text-slate-700">NEET Coaching Near Me in {city.displayName}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
        <div className="grid gap-10 md:grid-cols-5 md:items-center">
          <div className="md:col-span-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-900">
              <MapPin className="h-3.5 w-3.5" />
              {city.displayName} · {city.state}
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900">
              NEET coaching near me in {city.displayName} —{' '}
              <span className="text-indigo-700">biology specialist, online, no commute.</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              For {city.displayName} NEET aspirants targeting{' '}
              <strong>{city.stateQuotaCollege}</strong>
              {city.otherStateMedicalColleges?.length
                ? `, ${city.otherStateMedicalColleges[0]}`
                : ''}{' '}
              or AIIMS via all-India quota. Cerebrum is India&rsquo;s biology-only specialist — we
              don&rsquo;t teach physics or chemistry, but biology is half of NEET (360/720 marks)
              and the subject most aspirants lose the most marks on. Pair us with your existing{' '}
              {city.localCoachingPresence
                .split(',')[0]
                .trim()
                .replace(/\(.*\)/, '')
                .trim()}{' '}
              (or any local PCM source) and we handle the biology specialization.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-emerald-700"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp from {city.displayName}
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-indigo-600 px-5 py-3 text-base font-semibold text-indigo-700 hover:bg-indigo-50"
              >
                <Phone className="h-5 w-5" />
                Call +91 88264 44334
              </a>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Free 60-min trial class with Dr. Shekhar. Live online via Zoom from anywhere in{' '}
              {city.displayName}.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {city.displayName} at a glance
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-600">State</dt>
                  <dd className="font-semibold text-slate-900">{city.state}</dd>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-600">Region</dt>
                  <dd className="font-semibold text-slate-900">{city.region}</dd>
                </div>
                {city.metroPopulationMn ? (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="text-slate-600">Metro population</dt>
                    <dd className="font-semibold text-slate-900">~{city.metroPopulationMn}M</dd>
                  </div>
                ) : null}
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-600">State quota MBBS</dt>
                  <dd className="font-semibold text-indigo-700 text-right">
                    {city.stateQuotaCollege}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Local coaching scene</dt>
                  <dd className="font-semibold text-slate-900 text-right text-xs">
                    {city.localCoachingPresence.split(',')[0].trim()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* NEET landscape in this city */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            The NEET landscape in {city.displayName}
          </h2>
          <p className="mt-5 text-base text-slate-700 leading-relaxed whitespace-pre-line">
            {city.cityContext}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
                <School className="h-4 w-4" /> Major NEET-feeder schools in {city.displayName}
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {city.feederSchools.map((s) => (
                  <li key={s} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
                <MapPin className="h-4 w-4" /> Neighbourhoods we serve
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {city.majorAreas.map((a) => (
                  <li key={a} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why online specifically for this city */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Why online NEET biology coaching works for {city.displayName}
        </h2>
        <p className="mt-5 text-base text-slate-700 leading-relaxed">{city.whyOnlineHere}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 p-5">
            <Microscope className="h-6 w-6 text-indigo-600" />
            <h3 className="mt-3 text-sm font-semibold text-slate-900">
              AIIMS-trained faculty, no relocation
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Dr. Shekhar C Singh (AIIMS New Delhi alumnus) leads curriculum; {city.displayName}{' '}
              students get the same faculty as our Delhi NCR offline centres, taught live via Zoom.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5">
            <Users className="h-6 w-6 text-indigo-600" />
            <h3 className="mt-3 text-sm font-semibold text-slate-900">
              Small-batch model (10-40 students)
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Local Allen / Aakash {city.displayName} batches are 150-200 students. We run weekly
              per-MCQ review on every wrong answer — impossible at lecture-hall scale.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5">
            <BookOpen className="h-6 w-6 text-indigo-600" />
            <h3 className="mt-3 text-sm font-semibold text-slate-900">
              Material shipped to {city.displayName}
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              NCERT-line-by-line biology guide + 12,000-MCQ test bank shipped to your{' '}
              {city.displayName} address. Tracked courier.
            </p>
          </div>
        </div>
      </section>

      {/* Target college section */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Target medical colleges for {city.displayName} aspirants
          </h2>
          <p className="mt-3 text-slate-700">
            {city.state} domicile gives state-quota access (85% reservation) to these government
            medical colleges:
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200">
              <Stethoscope className="h-6 w-6 text-indigo-700" />
              <h3 className="mt-3 text-base font-bold text-slate-900">{city.stateQuotaCollege}</h3>
              <p className="mt-2 text-xs text-slate-500 uppercase tracking-wide">
                Primary state-quota target
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                The aspirational college for {city.displayName} NEET candidates with {city.state}{' '}
                domicile. Recent biology cut-offs typically 310-340/360 for general category via
                state quota.
              </p>
            </div>
            {city.otherStateMedicalColleges?.length ? (
              <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200">
                <Award className="h-6 w-6 text-amber-600" />
                <h3 className="mt-3 text-base font-bold text-slate-900">Also achievable</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {city.otherStateMedicalColleges.map((c) => (
                    <li key={c} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm">
              <strong className="text-amber-300">Typical aspirant profile:</strong>{' '}
              {city.typicalAspirant}
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Cerebrum biology specialist vs local options in {city.displayName}
        </h2>

        <div className="mt-7 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700">Aspect</th>
                <th className="px-4 py-3 font-semibold text-slate-700">
                  Cerebrum (biology specialist, online)
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700">
                  Local large-batch coaching
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Subjects</td>
                <td className="px-4 py-3 text-slate-700">
                  Biology only (your PCM stays with current coaching)
                </td>
                <td className="px-4 py-3 text-slate-700">All three (P, C, B together)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Batch size</td>
                <td className="px-4 py-3 text-slate-700">10-40 students</td>
                <td className="px-4 py-3 text-slate-700">100-200 students</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Faculty depth</td>
                <td className="px-4 py-3 text-slate-700">
                  AIIMS-trained, biology-only career focus
                </td>
                <td className="px-4 py-3 text-slate-700">Generalist NEET faculty</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Per-MCQ review</td>
                <td className="px-4 py-3 text-slate-700">Every wrong answer reviewed weekly</td>
                <td className="px-4 py-3 text-slate-700">Lecture-format, no per-student review</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Commute</td>
                <td className="px-4 py-3 text-slate-700">
                  Zero — live on Zoom from anywhere in {city.displayName}
                </td>
                <td className="px-4 py-3 text-slate-700">30-90 min depending on neighbourhood</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Material</td>
                <td className="px-4 py-3 text-slate-700">
                  NCERT-line-by-line guide + 12,000 MCQs (shipped to {city.displayName})
                </td>
                <td className="px-4 py-3 text-slate-700">
                  Centre-issued material, pickup required
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Honest framing: we don&rsquo;t replace your local PCM coaching, we add biology
          specialisation on top. Most students keep their{' '}
          {city.localCoachingPresence
            .split(',')[0]
            .trim()
            .replace(/\(.*\)/, '')
            .trim()}{' '}
          for physics + chemistry and add Cerebrum for biology only.
        </p>
      </section>

      {/* Sadhna testimonial */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-900">
            <Award className="h-3.5 w-3.5" />
            360/360 biology · NEET 2023
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900">
            The biology specialist model produces 100-percentile outcomes
          </h2>
          <figure className="mt-6 border-l-4 border-indigo-600 pl-5 max-w-3xl">
            <blockquote className="text-lg italic text-slate-700 leading-relaxed">
              &ldquo;Dr. Shekhar Sir&rsquo;s conceptual approach made complex topics simple. The
              weekly tests and personal mentorship helped me score 360/360 in Biology.&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <p className="font-bold text-slate-900">Sadhna Sirin</p>
              <p className="text-slate-600">
                Delhi-NCR Topper NEET 2023 · 695/720 · 100 percentile biology
              </p>
              <a
                href="https://www.youtube.com/watch?v=bk6wQCh6b9w"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-indigo-700 underline text-sm font-medium"
              >
                Watch her 2-min testimonial →
              </a>
            </figcaption>
          </figure>
          <p className="mt-6 text-sm text-slate-600">
            The same model — small batch, weekly tests, per-MCQ review — runs in the live online
            programme that {city.displayName} students join.
          </p>
        </div>
      </section>

      {/* FAQs (city-specific) */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            {city.displayName} NEET coaching — common questions
          </h2>
          <div className="mt-7 divide-y divide-slate-200">
            {city.localFaqs.map((f, idx) => (
              <details key={idx} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                  <span>{f.question}</span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-14 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Globe className="h-10 w-10 text-amber-300 mx-auto" />
          <h2 className="mt-4 text-2xl md:text-3xl font-bold">
            Ready to start from {city.displayName}?
          </h2>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Send a WhatsApp message with your <strong>school</strong>,{' '}
            <strong>current class</strong>, and (if available) your latest{' '}
            <strong>NEET 2025 or 2026 score</strong>. We respond within a few hours with batch slots
            that fit your {city.displayName} schedule and a free demo class with Dr. Shekhar.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp from {city.displayName}
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
            >
              <Phone className="h-5 w-5" />
              Call +91 88264 44334
            </a>
          </div>
          <p className="mt-5 text-xs text-slate-400">
            Free demo class · Dr. Shekhar C Singh, AIIMS New Delhi alumnus, founder Cerebrum Biology
            Academy
          </p>
        </div>
      </section>
    </main>
  )
}
