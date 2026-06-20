/**
 * ALevelBoardTemplate — props-driven UI for the per-exam-board A-Level
 * Biology hubs (/aqa-a-level-biology-tutor, /ocr-a-level-biology-tutor, …).
 *
 * Server component. Every render is differentiated by the board's real,
 * verified assessment structure (papers, topics, practical model,
 * distinctives), so each page is a genuine board-authority hub — not a
 * doorway clone. Pricing reuses the single A-Level pricing source of truth.
 */

import Link from 'next/link'
import {
  Award,
  BookOpen,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Home,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'
import { aLevelPricingTiers, aLevelPricingAsOffers } from '@/data/a-level/pricing-matrix'
import { A_LEVEL_BOARDS, type ALevelBoard } from '@/data/a-level/boards'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

export default function ALevelBoardTemplate({ board }: { board: ALevelBoard }) {
  const pageUrl = `${SITE_URL}/${board.routeSlug}`
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      `Hi — I'd like ${board.board} A-Level Biology tuition (Year 12 / Year 13 ___). Please share programme details and a free assessment slot.`
    )

  const siblings = A_LEVEL_BOARDS.filter((b) => b.slug !== board.slug)

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${pageUrl}#course`,
    name: `${board.board} A-Level Biology Tuition (${board.specCode})`,
    description: `Specialist ${board.boardFull} A-Level Biology tuition with AIIMS-trained faculty. Live small-batch classes mapped to the ${board.specCode} assessment structure — paper-by-paper coverage, required practicals and exam technique.`,
    url: pageUrl,
    inLanguage: 'en-GB',
    educationalLevel: 'A-Level (Key Stage 5)',
    teaches: board.topics,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: board.slug === 'cambridge-international' ? 'Worldwide' : 'United Kingdom',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT3H',
    },
    offers: aLevelPricingAsOffers(pageUrl),
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: board.faqs.map((f) => ({
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
        name: 'A-Level Biology Tutor',
        item: `${SITE_URL}/a-level-biology-tutor`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${board.board} A-Level Biology`,
        item: pageUrl,
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          `${board.board} A-Level Biology`,
          `A-Level Biology Tutor (${board.specCode})`,
          'A-Level Biology Examiner',
          'A-Level Biology Required Practicals',
        ]}
        jobTitle="A-Level Biology Specialist — AQA, OCR, Edexcel, WJEC/Eduqas & Cambridge International"
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
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-blue-700">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/a-level-biology-tutor" className="hover:text-blue-700">
                A-Level Biology
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">{board.board}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <BookOpen className="h-3.5 w-3.5" />
            {board.eyebrow}
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            {board.board} A-Level Biology tutor &mdash;{' '}
            <span className="text-blue-700">{board.tagline}</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">{board.heroBlurb}</p>
          <p className="mt-3 text-sm font-medium text-slate-500">
            {board.boardFull} · {board.region}
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

        {/* Paper structure */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              The {board.board} {board.specCode} assessment, paper by paper
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              We teach to the exact assessment model your exams use &mdash; not a generic syllabus.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {board.papers.map((p) => (
                <div
                  key={p.name}
                  className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-slate-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-wide text-blue-700">
                      {p.name}
                    </span>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-800">
                      {p.weight}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {p.duration} · {p.marks} marks
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.covers}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-500">
              <span className="font-semibold text-slate-700">Exam series:</span> {board.examSeries}
            </p>
          </div>
        </section>

        {/* Topics + practical */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 md:text-3xl">
                <GraduationCap className="h-7 w-7 text-blue-600" />
                {board.topicsLabel}
              </h2>
              <ul className="mt-6 space-y-3">
                {board.topics.map((t) => (
                  <li key={t} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 md:text-3xl">
                <FlaskConical className="h-7 w-7 text-blue-600" />
                Practical assessment
              </h2>
              <div className="mt-6 rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100">
                <p className="text-sm font-semibold text-blue-900">{board.practicalModel}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {board.practicalDetail}
                </p>
              </div>
              <h3 className="mt-8 flex items-center gap-2 text-lg font-bold text-slate-900">
                <Sparkles className="h-5 w-5 text-amber-500" />
                What makes {board.board} different to teach
              </h3>
              <ul className="mt-4 space-y-3">
                {board.distinctives.map((d) => (
                  <li key={d} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 rounded-xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-200">
            <span className="font-semibold text-slate-800">Which board is this for?</span>{' '}
            {board.whoFor}
          </p>
        </section>

        {/* Pricing */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              {board.board} A-Level Biology programmes
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Three tiers, every one built around the {board.specCode} spec. Prices shown per year
              of tuition.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {aLevelPricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`flex flex-col rounded-2xl bg-white p-6 ring-1 ${
                    tier.highlight ? 'ring-2 ring-blue-600' : 'ring-slate-200'
                  }`}
                >
                  {tier.highlight && (
                    <span className="mb-3 inline-block w-fit rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                  <p className="text-sm text-slate-500">{tier.subtitle}</p>
                  <p className="mt-4 text-3xl font-bold text-slate-900">
                    £{tier.priceGBP.toLocaleString()}
                    <span className="text-base font-medium text-slate-500"> {tier.unitLabel}</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    ≈ ${tier.priceUSD.toLocaleString()} / year
                  </p>
                  <p className="mt-2 text-xs font-medium text-blue-700">
                    Target: {tier.targetGrade} · {tier.batchSize}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex gap-2 text-xs leading-relaxed text-slate-600">
                        <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry form */}
        <section className="mx-auto max-w-3xl px-4 py-14">
          <GlobalEnquiryForm
            source={`a-level-${board.slug}`}
            title={`Book a free ${board.board} A-Level Biology assessment`}
            subtitle="A short live session to gauge your level and map a paper-by-paper plan. Open to students in any country — share your phone number with country code."
          />
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              {board.board} A-Level Biology &mdash; questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200">
              {board.faqs.map((f, idx) => (
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

        {/* Cross-links to other boards */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-bold text-slate-900">
            Tutoring for every A-Level Biology board
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Not sure which board your school uses? See our{' '}
            <Link href="/a-level-biology-tutor" className="text-blue-700 underline">
              main A-Level Biology page
            </Link>
            , or pick your board:
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {siblings.map((b) => (
              <Link
                key={b.slug}
                href={`/${b.routeSlug}`}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-600 hover:text-blue-700"
              >
                {b.board} A-Level Biology
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Award className="mx-auto h-10 w-10 text-amber-300" />
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Free {board.board} A-Level Biology assessment
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              A short live session to gauge your level and map a paper-by-paper plan to your target
              grade.
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
