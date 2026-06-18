/**
 * BrainBeeCityTemplate
 *
 * Props-driven UI for /brain-bee-coaching/[city] pages. Server component
 * (no client JS) — mirrors the /brain-bee-coaching hub. Each render is
 * differentiated by real per-city data (neuroscience hubs, named schools,
 * time zone) so the page is index-safe, not a doorway clone.
 */

import Link from 'next/link'
import {
  Award,
  Brain,
  ChevronRight,
  Home,
  MapPin,
  MessageCircle,
  Microscope,
  Phone,
  School,
  Stethoscope,
  Timer,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import type { BrainBeeCity } from '@/data/brain-bee/brainBeeCities'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

const ROUNDS = [
  { title: 'Brain Facts written exam', weight: '~10%' },
  { title: 'Human neuroanatomy practical', weight: '25% — highest weight' },
  { title: 'Neurohistology + MRI/imaging ID', weight: '~20%' },
  { title: 'Patient diagnosis (clinical reasoning)', weight: '20%' },
  { title: 'Live two-strike oral elimination', weight: '25%' },
]

export default function BrainBeeCityTemplate({ city }: { city: BrainBeeCity }) {
  const pageUrl = `${SITE_URL}/brain-bee-coaching/${city.slug}`
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      `Hi — I'm in ${city.cityName} and interested in Brain Bee / neuroscience competition coaching (Grade/Year ___). Please share cohort dates, tiers, and a free assessment slot.`
    )

  const sharedFaqs = [
    {
      question: 'What does Cerebrum coach, and what does it cost?',
      answer:
        'We coach every Brain Bee round — Brain Facts content (written), human neuroanatomy practical, neurohistology, MRI identification, patient diagnosis over the ~20 official disorders, and the live two-strike oral. Three tracks: Foundation Cohort ($900, 12-16 weeks), Finals & Practical Intensive ($540, 4-6 weeks), and 1:1 Mentorship ($1,620) — all-in USD, ~10% below comparable paid programmes with more live coaching included. Classes are live online.',
    },
    {
      question: 'Why does the written exam matter so little?',
      answer:
        'In the 2023 USA National scoring the written exam was only ~10%; the human neuroanatomy practical (25%), live oral (25%) and patient diagnosis (20%) carried most of the result. The free Brain Facts book covers the written layer — Cerebrum trains the ~90% it does not.',
    },
    {
      question: 'Is Cerebrum affiliated with the official Brain Bee?',
      answer:
        'No. This is independent coaching, not affiliated with or endorsed by the International Brain Bee or the Society for Neuroscience. The official IYNA bootcamp is free; ours is optional paid coaching that adds live practical, clinical and oral training.',
    },
  ]
  const faqs = [...city.faqs, ...sharedFaqs]

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${pageUrl}#course`,
    name: `Brain Bee Coaching for ${city.cityName} Students`,
    description: `Live online Brain Bee / neuroscience competition coaching for ${city.cityName} high-school students (ages 13-19). AIIMS-trained faculty, ${city.timezone} scheduling, neuroanatomy/neurohistology/MRI/patient-diagnosis/live-oral training.`,
    url: pageUrl,
    inLanguage: 'en',
    educationalLevel: 'High school (ages 13-19) — neuroscience competition track',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Place', name: city.cityName },
    ],
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
        name: 'Brain Bee Coaching',
        item: `${SITE_URL}/brain-bee-coaching`,
      },
      { '@type': 'ListItem', position: 3, name: city.cityName, item: pageUrl },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          `Brain Bee Coaching ${city.cityName}`,
          'Neuroscience Competition Coaching',
          'Neuroanatomy',
          'Clinical Neurology / Patient Diagnosis',
        ]}
        jobTitle="Neuroscience Competition Coach — Brain Bee Preparation"
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
              <Link href="/brain-bee-coaching" className="hover:text-blue-700">
                Brain Bee Coaching
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">{city.cityName}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <MapPin className="h-3.5 w-3.5" />
            {city.region} · {city.timezone}
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Brain Bee coaching for{' '}
            <span className="text-blue-700">{city.cityName} students.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">{city.heroBlurb}</p>
          <p className="mt-3 max-w-4xl text-base leading-relaxed text-slate-600">
            We coach every round &mdash; not just the free Brain Facts written exam (which is only
            ~10% of the score) but the ~90% that decides the result: human neuroanatomy, neurohistology
            and MRI identification, patient diagnosis, and the live two-strike oral. AIIMS-trained
            faculty, live in {city.timezone}.
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
          <p className="mt-4 text-xs text-slate-400">
            Independent neuroscience-competition coaching. Not affiliated with or endorsed by the
            International Brain Bee or the Society for Neuroscience.
          </p>
        </section>

        {/* Local roadmap */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-12">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Brain Bee in {city.cityName} &mdash; the local picture
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <School className="h-6 w-6 text-blue-600" />
                <h3 className="mt-3 text-base font-bold text-slate-900">Schools we build for</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Designed for competitors from {city.schools.slice(0, 5).join(', ')} and similar{' '}
                  {city.cityName} schools.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <Brain className="h-6 w-6 text-blue-600" />
                <h3 className="mt-3 text-base font-bold text-slate-900">Neuroscience nearby</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {city.cityName} sits near major neuroscience hubs &mdash; {city.neuroHubs} &mdash;
                  so neuroscience is a natural extension for strong local biology students.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <Timer className="h-6 w-6 text-blue-600" />
                <h3 className="mt-3 text-base font-bold text-slate-900">Your time zone</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Live classes in {city.timezone}, scheduled around the school day &mdash; no
                  recorded-only fallback.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rounds */}
        <section>
          <div className="mx-auto max-w-5xl px-4 py-12">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              We coach every round &mdash; weighted to how it&rsquo;s actually scored
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ROUNDS.map((r) => (
                <div key={r.title} className="rounded-xl border border-slate-200 bg-white p-5">
                  {r.title.includes('diagnosis') ? (
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                  ) : r.title.includes('oral') ? (
                    <Timer className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Microscope className="h-5 w-5 text-blue-600" />
                  )}
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{r.title}</h3>
                  <p className="text-sm font-semibold text-blue-700">{r.weight}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-slate-500">
              Weights shown are the verified 2023 USA National breakdown; the round mix varies year to
              year.{' '}
              <Link href="/brain-bee-coaching" className="text-blue-700 underline">
                See the full Brain Bee programme, tracks and pricing
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Brain Bee in {city.cityName} &mdash; questions
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
              Free Brain Bee assessment for {city.cityName} students
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              A short live session in {city.timezone} to gauge your level, map the right track, and
              show how we coach the high-weight rounds.
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
