/**
 * /is-usabo-worth-it
 *
 * Decision-intent page for the query "is USABO worth it?" — an honest,
 * balanced guide rather than a sell. Covers what USABO is, its real
 * college-admissions value, the time commitment, who it's worth it for vs
 * who it isn't, and the cost of preparation (free self-study vs coaching).
 * Soft CTA, cross-links into the USABO funnel.
 *
 * ADDITIVE: new route; no existing page touched. No fabricated stats.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  GraduationCap,
  Home,
  Scale,
  Sparkles,
  Target,
  Trophy,
  XCircle,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/is-usabo-worth-it'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Is USABO Worth It? An Honest Decision Guide (2026) | Cerebrum',
  description:
    'Is the USA Biology Olympiad worth the effort? A balanced guide to the real college-admissions value of USABO Semifinalist / Finalist / Team USA, the time commitment, who it suits and who it does not, and what preparation actually costs — free self-study vs coaching from $2,500.',
  keywords: [
    'is USABO worth it',
    'USABO worth it for college',
    'does USABO help college admissions',
    'USABO Semifinalist value',
    'USABO Finalist college admissions',
    'is biology olympiad worth it',
    'USABO time commitment',
    'USABO cost',
    'should I do USABO',
    'USABO for pre-med',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Is USABO Worth It? An Honest Decision Guide · Cerebrum Biology Academy',
    description:
      'A balanced look at the real college value of USABO, the time it takes, who it suits, and what prep costs — free self-study vs coaching from $2,500.',
    url: PAGE_URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Is USABO Worth It? An Honest Decision Guide',
    description:
      'The real college-admissions value of USABO, the time commitment, who it suits, and what preparation actually costs.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const WORTH_IT_FOR = [
  'You already love biology and would study extra of it for its own sake — the work feels like interest, not a chore.',
  'You are aiming at highly selective STEM or BS/MD programmes where a genuine, demonstrable distinction matters.',
  'You have a strong honors or AP Biology base and want a serious challenge beyond the school syllabus.',
  'You can realistically protect the weekly study hours alongside your coursework, sport and other commitments.',
]

const NOT_WORTH_IT_FOR = [
  'You are adding it purely as a resume line and have no underlying interest in biology — admissions readers can tell.',
  'Your GPA, core coursework or standardised tests still need the time more than an extracurricular does.',
  'You expect a guaranteed award — most serious entrants do not advance past the Open Exam, and that is normal.',
  'You are already stretched thin; one deep, sincere activity usually beats a half-finished olympiad attempt.',
]

const COST_TIERS = [
  {
    label: 'Self-study (free)',
    price: '$0',
    detail:
      'Free Biolympiads question banks and past papers, plus a borrowed or owned copy of Campbell Biology, can take a disciplined student through the Open Exam. The cost is your time, not your money.',
  },
  {
    label: 'Targeted coaching',
    price: 'from $2,500',
    detail:
      'Structured coaching (Cerebrum from $2,500, with $4,500 and $6,000 tiers for heavier Semifinal-level support) buys a planned curriculum, expert marking of your free-response answers, and someone to interpret your past-paper mistakes — most useful at the Semifinal stage where self-grading is hard.',
  },
]

const FAQS = [
  {
    question: 'Is USABO worth it for college admissions?',
    answer:
      'It can be, but with honest caveats. Advancing to the USABO Semifinal, reaching Finalist, or being named to Team USA is a genuine national-level distinction that selective STEM and BS/MD programmes recognise — it signals real depth in biology, not just a good grade. However, most serious entrants do not advance past the Open Exam, and a participation line alone carries little weight. The value comes from how far you advance and, just as much, from the genuine biology mastery the preparation builds. It is worth it when biology interest is real; it is not a shortcut to admissions.',
  },
  {
    question: 'What is USABO and how do the stages work?',
    answer:
      'USABO (the USA Biology Olympiad) is the national biology competition administered by the Center for Excellence in Education (CEE). It runs in stages: the Open Exam (a timed multiple-choice paper any registered US high-school student can sit in February), then the Semifinal Exam for top Open scorers, then a national finals camp from which four students are selected as Team USA for the International Biology Olympiad (IBO).',
  },
  {
    question: 'How much time does USABO really take?',
    answer:
      'For a student with a strong honors-biology base aiming to clear the Open Exam, plan on roughly 8–15 hours a week across several months, rising as the February exam nears. Reaching Semifinal or Finalist level is a substantially larger, multi-year commitment built on top of that. The honest read: it is a serious time investment that competes with GPA, standardised tests and other activities, so it should be a deliberate choice.',
  },
  {
    question: 'How much does USABO preparation cost?',
    answer:
      'It can cost nothing. Free resources such as the Biolympiads question banks and USABO past papers, paired with Campbell Biology, are enough for a disciplined self-studier to prepare for the Open Exam. Structured coaching is optional — Cerebrum programmes start at $2,500, with $4,500 and $6,000 tiers for heavier Semifinal-level support. Coaching mainly buys a planned curriculum, expert marking of free-response answers, and help interpreting your past-paper mistakes; it is most valuable at the Semifinal stage rather than for the Open Exam.',
  },
  {
    question: 'Is USABO worth it if I am not aiming for a biology degree?',
    answer:
      'Often less so. The strongest case for USABO is for students with real biology interest heading toward selective STEM, life-sciences, or BS/MD pathways. If your direction is elsewhere, the same hours usually do more for you in an activity that fits your actual goals. There is no shame in deciding it is not your competition.',
  },
  {
    question: 'Do I need a tutor to make USABO worth it?',
    answer:
      'No. Self-study is genuinely workable for the Open Exam if you are disciplined and use past papers well. A tutor adds the most value at three points: building a realistic plan up front, interpreting your past-paper mistakes correctly, and Semifinal preparation, where free-response analytical reasoning is hard to self-grade. We would rather you start free and add support only if and where you actually need it.',
  },
  {
    question: 'What is AIIMS, for a family who has not heard of it?',
    answer:
      'AIIMS New Delhi is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School and Oxford. Our faculty are AIIMS-trained, which is why the biology coaching goes to genuine olympiad depth rather than school-level review.',
  },
]

export default function IsUsaboWorthItPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is USABO Worth It? An Honest Decision Guide',
    url: PAGE_URL,
    inLanguage: 'en-US',
    datePublished: '2026-06-25',
    dateModified: '2026-06-25',
    author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
    publisher: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType:
        'US high-school students and parents deciding whether to attempt the USA Biology Olympiad',
    },
    about: 'Decision guide on the value, time commitment and cost of the USA Biology Olympiad',
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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'USABO Coaching',
        item: `${SITE_URL}/usabo-coaching`,
      },
      { '@type': 'ListItem', position: 3, name: 'Is USABO Worth It?', item: PAGE_URL },
    ],
  }
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: PAGE_URL,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#worth-it-summary'],
    },
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'USA Biology Olympiad',
          'USABO Coaching',
          'Biology Olympiad Preparation',
          'College Admissions Biology',
        ]}
        jobTitle="Biology Specialist Faculty — Olympiad, AP, IB"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
              <Link href="/usabo-coaching" className="hover:text-blue-700">
                USABO Coaching
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">Is USABO Worth It?</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <Scale className="h-3.5 w-3.5" />
            Honest decision guide
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Is USABO worth it?{' '}
            <span className="text-blue-700">A straight answer, not a sales pitch.</span>
          </h1>
          <p
            id="worth-it-summary"
            className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600"
          >
            For the right student, the USA Biology Olympiad is genuinely worth it — advancing to
            Semifinalist, Finalist, or Team USA is a real national distinction that selective STEM
            and BS/MD programmes recognise, and the preparation builds biology mastery that lasts.
            For the wrong student, it is a large time investment with an uncertain payoff. This page
            lays out both sides honestly so you can decide — including the time commitment and what
            preparation actually costs (free self-study, or coaching from $2,500). Live online in
            your US time zone (ET/CT/MT/PT).
          </p>
          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Talk it through with us first
            </a>
            <Link
              href="/usabo-coaching"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              See the USABO programme
            </Link>
          </div>
        </section>

        {/* What USABO is */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              First, what USABO actually is
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              USABO (the USA Biology Olympiad) is the national biology competition run by the Center
              for Excellence in Education. It works in stages: the Open Exam — a timed
              multiple-choice paper any registered US high-school student can sit in February — then
              a Semifinal Exam for top scorers, then a national finals camp that selects four
              students as Team USA for the International Biology Olympiad. The further you advance,
              the rarer and more meaningful the distinction. Most serious, well-prepared entrants do
              not get past the Open Exam, and that is the normal outcome rather than a failure.
            </p>
          </div>
        </section>

        {/* The college value */}
        <section className="mx-auto max-w-4xl px-4 py-14">
          <div className="flex items-center gap-3">
            <Award className="h-7 w-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              The college-admissions value, honestly
            </h2>
          </div>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
            <p>
              A Semifinalist, Finalist, or Team USA result is a genuine differentiator. Selective
              STEM, life-sciences and BS/MD programmes read it as evidence of real depth in biology
              — something a strong GPA and a high AP score cannot show on their own. It is one of
              the few high-school activities that demonstrates national-level mastery in a single
              subject.
            </p>
            <p>
              The honest caveat: the value scales with how far you advance. A participation line by
              itself carries little weight, and no award is guaranteed no matter how hard you work.
              Admissions readers also value sincerity — a deep, real interest in biology reads very
              differently from an activity bolted on for the resume. The strongest version of
              &ldquo;worth it&rdquo; is when the preparation itself was time you would have happily
              spent on biology anyway.
            </p>
          </div>
        </section>

        {/* Time commitment */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <div className="flex items-center gap-3">
              <Clock className="h-7 w-7 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">The time commitment</h2>
            </div>
            <p className="mt-6 text-base leading-relaxed text-slate-700">
              Be realistic before you commit. A student with a solid honors-biology base aiming to
              clear the Open Exam should plan on roughly 8–15 hours a week over several months,
              rising as February approaches. Reaching Semifinal or Finalist level is a much larger,
              often multi-year commitment built on top of that. Those hours compete directly with
              your GPA, standardised tests, sport and other activities — which is exactly why this
              should be a deliberate choice, not a default one.
            </p>
          </div>
        </section>

        {/* Worth it vs not */}
        <section className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Who it is worth it for — and who it is not
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-bold text-slate-900">Likely worth it if…</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {WORTH_IT_FOR.map((t) => (
                  <li key={t} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-2">
                <XCircle className="h-6 w-6 text-slate-500" />
                <h3 className="text-lg font-bold text-slate-900">Probably not worth it if…</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {NOT_WORTH_IT_FOR.map((t) => (
                  <li key={t} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cost */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <div className="flex items-center gap-3">
              <DollarSign className="h-7 w-7 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                What the preparation actually costs
              </h2>
            </div>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
              Cost should not be the thing that decides this for you, because the Open Exam can be
              prepared for free. Here is the honest range.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {COST_TIERS.map((c) => (
                <div key={c.label} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-base font-bold text-slate-900">{c.label}</h3>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                      {c.price}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{c.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600">
              Our honest recommendation: most students should start with the free route and add
              coaching only if and where they hit a ceiling — typically when free-response Semifinal
              practice needs expert marking.
            </p>
          </div>
        </section>

        {/* Enquiry */}
        <section id="enquiry" className="mx-auto max-w-xl px-4 py-14">
          <GlobalEnquiryForm
            source="is-usabo-worth-it"
            title="Not sure if USABO is right for you?"
            subtitle="Tell us your grade, biology background and goals. We will give you an honest read on whether USABO is worth your time — and the cheapest sensible way to start. Reply within a day in your US time zone."
          />
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Is USABO worth it &mdash; common questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200">
              {FAQS.map((f, idx) => (
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

        {/* Related */}
        <section className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-xl font-bold text-slate-900">If you decide to go for it</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href="/usabo-coaching"
              className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
            >
              <Trophy className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 text-base font-bold text-slate-900">USABO Coaching</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                The full Open + Semifinal pathway, live online in your US time zone.
              </p>
            </Link>
            <Link
              href="/how-to-qualify-for-usabo"
              className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
            >
              <Target className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 text-base font-bold text-slate-900">How to qualify for USABO</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                The stages, the cutoffs and what advancing actually takes.
              </p>
            </Link>
            <Link
              href="/best-usabo-books"
              className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
            >
              <BookOpen className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 text-base font-bold text-slate-900">Best USABO books</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                The free and paid resources worth your time — Campbell first.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Sparkles className="mx-auto h-10 w-10 text-amber-300" />
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Decide with the full picture, not the hype
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              We will tell you honestly whether USABO fits your goals, and help you start the cheap
              way before you ever pay for coaching. Free first conversation, in your US time zone.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 md:flex-row">
              <a
                href="#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold hover:bg-blue-700"
              >
                <CheckCircle2 className="h-5 w-5" />
                Get an honest read
              </a>
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <GraduationCap className="h-5 w-5" />
                See the USABO programme
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
