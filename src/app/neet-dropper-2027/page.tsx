import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import {
  Dna,
  Target,
  RefreshCw,
  ClipboardCheck,
  Users,
  CalendarClock,
  TrendingUp,
  MessageCircle,
  Award,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { FAQSchema, FAQDisplay } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { CEREBRUM_METRICS as M } from '@/lib/constants/metrics'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${BASE_URL}/neet-dropper-2027`
const WA = (msg: string) => `https://wa.me/918826444334?text=${encodeURIComponent(msg)}`

export const metadata: Metadata = {
  title: 'NEET Dropper 2027 Program | Biology-First Repeater Batch | Cerebrum',
  description:
    'The NEET 2027 dropper/repeater program built for a real score jump — not a repeat of last year. Biology-first (it’s 360/720, your fastest 100+ marks), AIIMS-trained specialist faculty, small batches, weak-concept repair, and mock-analysis mentorship. Book a free drop-year counselling call.',
  keywords: [
    'NEET dropper 2027',
    'NEET dropper batch 2027',
    'NEET repeater course 2027',
    'best coaching for NEET droppers',
    'one year NEET program',
    'NEET dropper biology coaching',
    'NEET repeater batch',
    'NEET 2027 preparation dropper',
  ].join(', '),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Dropper 2027 Program — Biology-First Repeater Batch | Cerebrum',
    description:
      'Score a real 100+ jump in your drop year by fixing the half of NEET that’s most fixable — Biology — with an AIIMS-trained specialist.',
    type: 'website',
    locale: 'en_IN',
    url: PAGE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Dropper 2027 Program | Cerebrum Biology Academy',
    description:
      'Biology-first drop year. Small batches, AIIMS-trained faculty, mock-analysis mentorship.',
  },
}

const FAQS = [
  {
    question: 'Is one year enough for a NEET dropper to improve?',
    answer:
      'Yes — but only if you study differently, not just harder. Droppers who follow a phase-wise plan with weak-concept repair and disciplined mock analysis regularly improve by 100–150 marks. The ones who simply re-read the same books and re-take tests tend to repeat the same score. Our program is built around that difference.',
  },
  {
    question: 'What is the difference between a NEET dropper and a repeater?',
    answer:
      'They mean the same thing in practice — a student who has finished Class 12 and is taking a dedicated year to reattempt NEET. Both are welcome in this program; the plan is the same: rebuild weak areas, master Biology, and convert practice into applied marks.',
  },
  {
    question: 'Why is a biology-specialist academy better for droppers?',
    answer:
      'Biology is 360 of 720 marks — 50% of NEET and the most reliable place to gain marks in a drop year. A biology-only academy led by an AIIMS-trained faculty can take your NCERT Biology from “covered” to “mastered” (every diagram, term and exception) in a way a generalist coaching centre running one Biology teacher across huge batches cannot. That depth is where your biggest, safest jump comes from.',
  },
  {
    question: 'Do you offer online or offline dropper coaching?',
    answer:
      'Both. We run small live batches (15–20 students) with the same AIIMS-trained faculty online and at our Delhi NCR centres, plus recorded revision, structured test series and 1:1 mentorship — so you get classroom rigour whether you attend in person or from home.',
  },
  {
    question: 'Do you guarantee a NEET selection or rank?',
    answer:
      'No — and you should be cautious of anyone who does; guaranteed-selection claims are prohibited under the 2024 coaching guidelines. What we do offer is a merit scholarship (via a scholarship test) and an honest, structured programme with a proven 98% qualification track record and transparent mentorship. Your result depends on your work; our job is to make that work count.',
  },
  {
    question: 'When should a 2027 dropper start preparing?',
    answer:
      'Now. The single biggest advantage in a drop year is starting immediately after results instead of losing 6–10 weeks deciding. Students who begin in July are already deep into structured revision by the time late-starters begin. The programme runs from the drop-year start through to the NEET 2027 exam.',
  },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Course schema — real fee (dropper), no fabricated aggregateRating */}
      <Script
        id="neet-dropper-2027-course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'NEET Dropper / Repeater Program 2027 (Biology-First)',
            description:
              'One-year NEET 2027 dropper and repeater program with a biology-first strategy, AIIMS-trained specialist faculty, small batches, weak-concept repair, structured test series and mock-analysis mentorship.',
            url: PAGE_URL,
            teaches: 'NEET-UG Biology, Physics and Chemistry for repeaters (2027)',
            educationalLevel: 'NEET dropper / repeater',
            inLanguage: 'en',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: BASE_URL,
              sameAs: `${BASE_URL}/dropper`,
            },
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: ['online', 'onsite'],
              courseWorkload: 'P1Y',
              location: { '@type': 'Place', name: 'Delhi NCR + Live Online' },
              offers: {
                '@type': 'Offer',
                category: 'Dropper Program',
                price: String(M.feeDropper),
                priceCurrency: 'INR',
                url: PAGE_URL,
                availability: 'https://schema.org/InStock',
              },
            },
          }),
        }}
      />
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Dropper Coaching',
          'NEET Repeater Biology',
          'NEET-UG Biology',
          'NCERT Biology Mastery',
          'NEET Score Improvement',
        ]}
        jobTitle="Founder & Lead NEET Biology Faculty"
      />
      <FAQSchema questions={FAQS} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        showHome={false}
        showSchemaOnly
        items={[
          { label: 'Home', href: '/' },
          { label: 'NEET Dropper 2027', href: '/neet-dropper-2027', isCurrentPage: true },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-600 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            <CalendarClock className="h-4 w-4" />
            NEET 2027 · Dropper &amp; Repeater Batch · enrolling now
          </div>
          <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            NEET Dropper 2027 — the Biology-first drop year
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-emerald-50">
            Most droppers repeat the same year — same books, same weak spots, same score. We do the
            opposite: fix the half of NEET that’s most fixable, <strong>Biology (360/720)</strong>,
            with an AIIMS-trained specialist — and that’s where your 100+ mark jump comes from.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WA(
                'Hi! I just got my NEET result and I am considering a 2027 dropper year. Please guide me on the Cerebrum dropper program.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              <MessageCircle className="h-5 w-5" />
              Free drop-year counselling
            </a>
            <Link
              href="/scholarship-test"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Take the scholarship test
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-emerald-100">
            <span className="inline-flex items-center gap-1.5">
              <Award className="h-4 w-4" /> {M.successRateText} NEET qualification rate
            </span>
            <span className="inline-flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" /> Top score {M.topScoreText}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" /> Small batches ({M.batchSizeText})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Dna className="h-4 w-4" /> AIIMS-trained biology faculty
            </span>
          </div>
        </div>
      </section>

      {/* The dropper trap */}
      <section className="mx-auto max-w-4xl px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Why most drop years don’t work
        </h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          The biggest trap droppers fall into is picking up right where they left off — same books,
          same schedule, the same weak spots quietly ignored. They spend eight to ten months
          “covering” the syllabus again, run out of time for real practice, and arrive at the exam
          able to recognise everything but apply little. If nothing changes, the score doesn’t
          change. A drop year only pays off when you study <em>differently</em>, not just harder.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: RefreshCw,
              title: 'We start with a mistake audit',
              body: 'Before adding new study hours, we diagnose exactly where last year’s marks leaked — conceptual gaps, careless errors, or time pressure — so we fix the real problem, not just re-teach.',
            },
            {
              icon: ClipboardCheck,
              title: 'We repair weak concepts before testing',
              body: 'Solving mock after mock on a shaky foundation only repeats the same errors. We rebuild the weak chapters first, then test — so practice actually raises your score.',
            },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 text-emerald-700">
                <c.icon className="h-5 w-5" />
                <h3 className="font-semibold text-gray-900">{c.title}</h3>
              </div>
              <p className="mt-3 text-gray-700">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Biology wedge */}
      <section className="bg-emerald-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <div className="flex items-center gap-2 text-emerald-700">
            <Dna className="h-6 w-6" />
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Biology is your fastest, safest 100+ marks
            </h2>
          </div>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Biology carries <strong>360 of 720 marks — half of NEET</strong> — and it rewards
            disciplined mastery more directly than any other subject. Know your NCERT Biology cold
            (every diagram, every term, every exception) and 340+ from that section alone is within
            reach. That’s why a drop year run by a biology specialist beats a generalist coaching
            centre: we take Biology from “covered” to genuinely mastered, and that is where the
            biggest, most reliable part of your jump comes from.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              'NCERT-line-by-line command — the single highest-yield habit for droppers',
              'Diagram, exception and assertion-reason mastery that NEET repeatedly tests',
              'Botany + Zoology depth from an AIIMS-trained specialist, not a shared teacher',
              'Applied practice: NEET-pattern questions, not just chapter recall',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-lg bg-white p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <span className="text-gray-700">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What's inside */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          What the 2027 dropper program includes
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Users,
              title: 'Small live batches (15–20)',
              body: 'AIIMS-trained faculty who actually track every student — online and at our Delhi NCR centres — not a hall of hundreds.',
            },
            {
              icon: Target,
              title: 'Weak-concept repair',
              body: 'A phase-wise plan that rebuilds your weakest chapters first, then layers applied practice on top.',
            },
            {
              icon: ClipboardCheck,
              title: 'Test series + mock analysis',
              body: 'Regular full-length and topic tests — with structured 60–90 minute post-test analysis, because the analysis is what raises the score, not the score itself.',
            },
            {
              icon: Dna,
              title: 'NCERT Biology mastery',
              body: 'A structured, multi-pass approach to NCERT Biology so nothing is “covered once and forgotten.”',
            },
            {
              icon: RefreshCw,
              title: '1:1 mentorship',
              body: 'A mentor who reviews your mock analysis, adjusts your plan, and keeps a drop year from drifting.',
            },
            {
              icon: Award,
              title: 'Merit scholarship',
              body: 'A scholarship test that rewards genuine ability with a fee waiver — an honest alternative to “guaranteed” claims.',
            },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700">
                <c.icon className="h-5 w-5" />
                <h3 className="font-semibold text-gray-900">{c.title}</h3>
              </div>
              <p className="mt-3 text-gray-700">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Is a 2027 drop year right for you?
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              'You missed the cut-off or a government seat and are close enough that a focused year can bridge the gap',
              'You know your Biology was weaker than it should have been — the half of NEET you can most improve',
              'You “studied hard” last year but couldn’t apply it under exam pressure',
              'You want structure, accountability and a specialist — not a self-study drift',
            ].map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <span className="text-gray-700">{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-500">
            Not sure whether to drop or consider other paths? We’ll give you an honest read on your
            score and options on the counselling call — no pressure.
          </p>
        </div>
      </section>

      {/* Honest improvement note */}
      <section className="mx-auto max-w-4xl px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          An honest word on “guarantees”
        </h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          No genuine institute can guarantee a NEET selection or rank — and under the 2024 coaching
          guidelines, promising one is not allowed. What a good drop year can realistically deliver,
          with the right approach, is a <strong>100–150 mark improvement</strong> built on
          weak-concept repair, Biology mastery and disciplined mock analysis. That is what we build
          for. Instead of empty guarantees, we offer a merit scholarship, a proven{' '}
          {M.successRateText} qualification track record, and complete transparency about how the
          programme works.
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <FAQDisplay questions={FAQS} title="NEET Dropper 2027 — FAQs" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-600 text-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Make this drop year the one that counts
          </h2>
          <p className="mt-3 text-emerald-50">
            Start now — every week you wait is a week the students who began in July are pulling
            ahead. Book a free counselling call and we’ll map your Biology gaps and a 2027 plan.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={WA(
                'Hi! I want to enrol in / know more about the Cerebrum NEET 2027 dropper program.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              <MessageCircle className="h-5 w-5" />
              Talk to us on WhatsApp
            </a>
            <Link
              href="/scholarship-test"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Take the scholarship test
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
