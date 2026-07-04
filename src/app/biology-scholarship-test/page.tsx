/**
 * /biology-scholarship-test — Cerebrum Biology Scholarship Test (CBST)
 *
 * The enrollment funnel (Phase 1 of the enrollment-season strategy). India's
 * NEET market is acquired through branded scholarship-cum-admission tests
 * (ANTHE, TALLENTEX, PWSAT…) — but NONE is biology-focused, and generalists
 * reward OFFLINE more than online. CBST inverts both: a free, online,
 * biology-weighted scholarship test that rewards ONLINE study, with a
 * transparent rank→% slab table no major player publishes.
 *
 * ADDITIVE: new route, distinct intent from /scholarship (which describes
 * scholarship TYPES). This is the TEST/funnel itself. Lead capture via the
 * existing /api/enquiry funnel. No existing page/layout touched.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  GraduationCap,
  Home,
  ListChecks,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'
import { CBST_SLABS, SITE_URL } from '@/data/programs/enrollment-2027'

const CANONICAL = '/biology-scholarship-test'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Biology Scholarship Test (CBST) — Free Online · Up to 100% Scholarship | Cerebrum',
  description:
    'The Cerebrum Biology Scholarship Test: a free, online, biology-focused scholarship exam for Class 9–12 and NEET droppers. Win up to 100% scholarship on online biology programmes, plus a free personalised weak-area diagnostic report. Transparent rank→scholarship slabs. Register now.',
  keywords: [
    'biology scholarship test',
    'NEET biology scholarship exam',
    'free online scholarship test NEET',
    'biology scholarship test online',
    'NEET dropper scholarship test',
    'class 11 biology scholarship test',
    'CBST Cerebrum',
    'NEET biology admission test',
    'biology aptitude test scholarship',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Cerebrum Biology Scholarship Test (CBST) — Free, Online, up to 100%',
    description:
      'Free online biology-focused scholarship test for Class 9–12 & NEET droppers. Up to 100% scholarship + a free weak-area diagnostic. Transparent slabs.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology Scholarship Test (CBST) — Free Online, up to 100% scholarship',
    description:
      'Biology-focused scholarship test for Class 9–12 & NEET droppers. Free, online, instant diagnostic report.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const STEPS = [
  {
    icon: ClipboardCheck,
    title: '1. Register free',
    text: 'Sign up in under a minute — Class 9–12 or NEET dropper. No fee, online, take it from home in your own slot.',
  },
  {
    icon: ListChecks,
    title: '2. Take the biology test',
    text: 'A focused, biology-focused test (Botany + Zoology, NCERT-aligned) — the 50% of NEET that decides ranks. Not a generic full-PCB test.',
  },
  {
    icon: Target,
    title: '3. Get your rank + free diagnostic',
    text: 'Your All-India biology rank plus a personalised weak-area diagnostic report you can use whether or not you join — genuine value, not just a sales call.',
  },
  {
    icon: Award,
    title: '4. Claim your scholarship',
    text: 'Your rank maps to a published scholarship slab (below). Apply it to any Cerebrum online biology programme and enrol before the offer window closes.',
  },
]

const WHY = [
  {
    title: 'A dedicated biology test — nobody else does this',
    text: 'Every other scholarship test (ANTHE, TALLENTEX, PWSAT…) is full PCB. CBST tests the one subject that is 50% of NEET and the most NCERT-predictable — where a specialist can actually move your rank.',
  },
  {
    title: 'Online rewarded the most',
    text: 'Generalists give bigger scholarships for offline centres. We are online-first, so our top scholarships go to online study — the format that fits you.',
  },
  {
    title: 'Transparent slabs',
    text: 'We publish the exact rank→scholarship table below. No “mystery discount on a callback.” You know what your performance is worth before you sit the test.',
  },
  {
    title: 'A real diagnostic, not just a price tag',
    text: 'Every participant gets a free weak-area report — the diagnostic-first start that NEET droppers specifically need.',
  },
]

const FAQS = [
  {
    question: 'Who can take the Cerebrum Biology Scholarship Test?',
    answer:
      'Students in Class 9, 10, 11 or 12, and NEET droppers (Class 12 passed) preparing for NEET 2027. The test is free and taken online.',
  },
  {
    question: 'Is it really free? What is the catch?',
    answer:
      'It is genuinely free to register and sit. The “catch” is simply that the scholarship you win applies to Cerebrum’s online biology programmes — and even if you do not enrol, you keep your rank and your free weak-area diagnostic report.',
  },
  {
    question: 'Why is the test only Biology?',
    answer:
      'Because Biology is 50% of NEET (90 of 180 questions, 360 of 720 marks) and the most NCERT-predictable, most scoring subject — the single biggest lever on your rank. Cerebrum is a biology specialist with AIIMS-trained faculty, so a biology test is where we can fairly assess and genuinely help you.',
  },
  {
    question: 'How much scholarship can I win?',
    answer:
      'Up to 100% for the top All-India ranks, then 75% / 50% / 30% / 20% by rank and percentile, and a 10% participation scholarship for everyone else. The full table is published on this page.',
  },
  {
    question: 'Which programmes can I use the scholarship on?',
    answer:
      'Any Cerebrum online biology programme — the NEET 2027 Biology Dropper, Class 11 Biology (NEET + Boards), or the Class 9–10 Biology Foundation.',
  },
  {
    question: 'When can I take it?',
    answer:
      'The test is available online on demand — register and pick a slot. There is no single once-a-year date; we run it through the year so you can sit it when you are ready.',
  },
]

export default function BiologyScholarshipTestPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Cerebrum Biology Scholarship Test (CBST)',
    description:
      'A free, online, biology-focused scholarship test for Class 9–12 students and NEET droppers. Win up to 100% scholarship on Cerebrum online biology programmes plus a free personalised weak-area diagnostic report.',
    url: PAGE_URL,
    inLanguage: 'en-IN',
    educationalLevel: 'Class 9–12 + NEET dropper',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'India' },
    isAccessibleForFree: true,
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Scholarships', item: `${SITE_URL}/scholarship` },
      { '@type': 'ListItem', position: 3, name: 'Biology Scholarship Test', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Biology Scholarship Test',
          'NEET Biology',
          'NEET Dropper Biology',
          'Class 11 Biology NEET',
        ]}
        jobTitle="Founder & Lead Biology Faculty — NEET Biology Specialist"
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
              <Link href="/scholarship" className="hover:text-blue-700">
                Scholarships
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">Biology Scholarship Test</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">
            <Trophy className="h-3.5 w-3.5" />
            Free · Online · Up to 100% scholarship
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            The Cerebrum Biology Scholarship Test &mdash;{' '}
            <span className="text-blue-700">
              win up to 100% off, on the 50% of NEET that matters.
            </span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            A free, online, <strong>biology-focused</strong> scholarship test for Class 9–12
            students and NEET 2027 droppers. Every other scholarship test makes you sit full PCB —
            we test the one subject that is half of NEET and the most scoring. Win a scholarship on
            any Cerebrum online biology programme, and get a free personalised weak-area diagnostic
            report either way.
          </p>
          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <a
              href="#register"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Register free
            </a>
            <a
              href="#slabs"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              See scholarship slabs
            </a>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">How CBST works</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <div key={s.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <s.icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-3 text-base font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Slab table */}
        <section id="slabs" className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Scholarship slabs &mdash; published, not a mystery
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Your All-India biology rank maps to a fixed scholarship on any Cerebrum online biology
            programme. You know what your score is worth before you sit.
          </p>
          <div className="mt-7 overflow-hidden rounded-2xl ring-1 ring-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Rank / percentile</th>
                    <th className="px-5 py-3 font-semibold">Scholarship</th>
                    <th className="hidden px-5 py-3 font-semibold sm:table-cell">What you get</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {CBST_SLABS.map((s) => (
                    <tr key={s.band} className="bg-white">
                      <td className="px-5 py-4 font-medium text-slate-900">{s.band}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-800">
                          {s.discount}% off
                        </span>
                      </td>
                      <td className="hidden px-5 py-4 text-slate-600 sm:table-cell">{s.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Scholarships apply to Cerebrum online biology programmes. One scholarship per student
            per cycle; valid for enrolment within the offer window communicated with your result.
          </p>
        </section>

        {/* Why CBST */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Why a biology-focused scholarship test
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {WHY.map((c) => (
                <div key={c.title} className="rounded-xl border border-slate-200 bg-white p-5">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programmes the scholarship applies to */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Use your scholarship on</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            <Link
              href="/neet-dropper-biology-specialist-2027"
              className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
            >
              <Trophy className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">NEET 2027 Biology Dropper</h3>
              <p className="mt-2 text-sm text-slate-700">
                The 50% of NEET that decides your rank — biology, AIIMS faculty, small batch,
                diagnostic-first.
              </p>
              <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
                Explore <ChevronRight className="h-3.5 w-3.5" />
              </p>
            </Link>
            <Link
              href="/best-neet-biology-tutor-class-11"
              className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
            >
              <BookOpen className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                Class 11 Biology — NEET + Boards
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Boards and NEET together, one specialist. 45 of 90 NEET biology questions come from
                Class 11.
              </p>
              <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
                Explore <ChevronRight className="h-3.5 w-3.5" />
              </p>
            </Link>
            <Link
              href="/best-neet-foundation-class-9"
              className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
            >
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                Class 9–10 Biology Foundation
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Start early — a strong NCERT + olympiad + early-NEET base that upgrades into Class
                11.
              </p>
              <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
                Explore <ChevronRight className="h-3.5 w-3.5" />
              </p>
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Want to try the test format first? Take a{' '}
            <Link href="/free-neet-biology-mock-test" className="text-blue-700 underline">
              free NEET biology mock test
            </Link>{' '}
            or read about{' '}
            <Link href="/scholarship" className="text-blue-700 underline">
              all Cerebrum scholarships
            </Link>
            .
          </p>
        </section>

        {/* Register */}
        <section id="register" className="bg-slate-50">
          <div className="mx-auto max-w-xl px-4 py-14">
            <GlobalEnquiryForm
              source="cbst-scholarship-test"
              title="Register for the Biology Scholarship Test"
              subtitle="Free, online, Class 9–12 & NEET droppers. Leave your details with your class/target and we send your test slot and confirm your scholarship eligibility within a day."
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">CBST &mdash; questions</h2>
          <div className="mt-7 divide-y divide-slate-200">
            {FAQS.map((f, idx) => (
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

        {/* CTA */}
        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Sparkles className="mx-auto h-10 w-10 text-amber-300" />
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Your biology rank could be worth up to 100% off
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              Free to register, online, with a real diagnostic report whatever your score. Sit the
              test that actually measures the half of NEET that decides ranks.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 md:flex-row">
              <a
                href="#register"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold hover:bg-blue-700"
              >
                <Clock className="h-5 w-5" />
                Register free
              </a>
              <a
                href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi — I want to register for the Cerebrum Biology Scholarship Test (CBST). My class/target: ___')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                WhatsApp to register
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
