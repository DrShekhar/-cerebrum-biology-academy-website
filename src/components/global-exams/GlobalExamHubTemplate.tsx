/**
 * GlobalExamHubTemplate — universal, all-nationalities exam hub UI for the
 * /…-global pages (AP, MCAT, biology olympiad, IB, A-Level, NEET).
 *
 * Server component. Universal framing (any nationality), AIIMS glossed in the
 * data. Distinct intent from the NRI/city pages — never modifies them.
 */

import Link from 'next/link'
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  GraduationCap,
  Home,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'
import { EmailEnquiryButton } from '@/components/seo/EmailEnquiryButton'
import { GLOBAL_EXAMS, type GlobalExam } from '@/data/global-exams/exams'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

export default function GlobalExamHubTemplate({ exam }: { exam: GlobalExam }) {
  const pageUrl = `${SITE_URL}/${exam.routeSlug}`
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      `Hi — I'd like ${exam.exam} coaching (grade/level ___, country ___). Please share programme details and a free trial slot.`
    )

  const siblings = GLOBAL_EXAMS.filter((e) => e.slug !== exam.slug)

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${pageUrl}#course`,
    name: `${exam.exam} Coaching (Online, Worldwide)`,
    description: exam.metaDescription,
    url: pageUrl,
    inLanguage: 'en',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'Worldwide',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
    },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: exam.faqs.map((f) => ({
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
        name: 'Global',
        item: `${SITE_URL}/best-biology-tutor-global`,
      },
      { '@type': 'ListItem', position: 3, name: exam.exam, item: pageUrl },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          `${exam.exam} Tutor`,
          `${exam.exam} Coach`,
          'Biology Specialist',
          'Online Biology Tutor',
        ]}
        jobTitle="Biology Specialist Faculty — AP, MCAT, IB, A-Level, Olympiad & NEET"
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
              <Link href="/best-biology-tutor-global" className="hover:text-blue-700">
                Global
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">{exam.exam}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <Globe className="h-3.5 w-3.5" />
            {exam.eyebrow}
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            {exam.exam} tutor &mdash; <span className="text-blue-700">{exam.tagline}</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">{exam.heroBlurb}</p>
          <p className="mt-3 max-w-3xl text-sm font-medium text-slate-500">{exam.whoFor}</p>
          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Request a free trial
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-green-600 px-5 py-3 text-base font-semibold text-green-700 hover:bg-green-50"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp us
            </a>
            <EmailEnquiryButton
              label="Or email us"
              subject={`${exam.exam} tutoring enquiry`}
              body={
                `Hi, I am interested in ${exam.exam} tutoring.\n\n` +
                'Name:\nCountry / time zone:\nGrade or target exam date:\n\n' +
                'Please share programme details, slots in my time zone and pricing.'
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-300 px-5 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50"
            />
          </div>
        </section>

        {/* What we cover */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 md:text-3xl">
              <GraduationCap className="h-7 w-7 text-blue-600" />
              {exam.coversLabel}
            </h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {exam.covers.map((c) => (
                <li
                  key={c}
                  className="flex gap-3 rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why us */}
        <section className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Why a biology specialist for {exam.exam}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {exam.whyPoints.map((p) => (
              <div key={p.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Enquiry */}
        <section id="enquiry" className="bg-slate-50">
          <div className="mx-auto max-w-xl px-4 py-14">
            <GlobalEnquiryForm
              source={`global-exam-${exam.slug}`}
              title={`Book a free ${exam.exam} trial`}
              subtitle="Any nationality, any country. Tell us your grade/level and country — we reply within a day in your time zone. Share your phone with country code."
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            {exam.exam} &mdash; questions
          </h2>
          <div className="mt-7 divide-y divide-slate-200">
            {exam.faqs.map((f, idx) => (
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
        </section>

        {/* Related + siblings */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-xl font-bold text-slate-900">Explore more</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {exam.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:border-blue-600"
                >
                  {r.label}
                </Link>
              ))}
            </div>
            <h3 className="mt-8 text-sm font-semibold text-slate-700">
              Other exams we coach worldwide
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.routeSlug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-600 hover:text-blue-700"
                >
                  {s.exam}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Award className="mx-auto h-10 w-10 text-amber-300" />
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Free {exam.exam} trial — any country
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              A short live session to gauge your level and map a plan to your goal. Open to students
              of any nationality, in your time zone.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 md:flex-row">
              <a
                href="#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold hover:bg-blue-700"
              >
                <Clock className="h-5 w-5" />
                Request a free trial
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
