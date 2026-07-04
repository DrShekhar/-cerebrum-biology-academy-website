/**
 * /is-ap-biology-worth-taking
 *
 * Decision-intent page for "is AP Biology worth taking?" — an honest,
 * balanced guide rather than a sell. Covers college-credit value (which
 * varies by university), GPA weighting, pre-med / STEM signaling, the
 * difficulty-vs-payoff tradeoff, who should take it, and the cost of
 * support (free school resources vs tutoring). Soft CTA, cross-links.
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
  DollarSign,
  GraduationCap,
  Home,
  Scale,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/is-ap-biology-worth-taking'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Is AP Biology Worth Taking? An Honest Decision Guide (2026) | Cerebrum',
  description:
    'Is AP Biology worth taking? A balanced guide to the real value of AP Bio — college credit (which varies by university), weighted-GPA boost, pre-med and STEM signaling, the difficulty-vs-payoff tradeoff, who should take it, and the cost of support (free school resources vs tutoring from $2,500/yr, 1:1 from $40/hr).',
  keywords: [
    'is AP Biology worth taking',
    'is AP Bio worth it',
    'does AP Biology give college credit',
    'AP Biology for pre-med',
    'AP Biology GPA boost',
    'should I take AP Biology',
    'AP Biology difficulty',
    'AP Biology college credit',
    'AP Biology worth it for college',
    'AP Biology vs honors biology',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Is AP Biology Worth Taking? An Honest Decision Guide · Cerebrum Biology Academy',
    description:
      'A balanced look at AP Biology — college credit, GPA boost, pre-med signaling, difficulty, who should take it, and what support costs.',
    url: PAGE_URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Is AP Biology Worth Taking? An Honest Decision Guide',
    description:
      'College credit, GPA boost, pre-med signaling, difficulty vs payoff, who should take it, and what support costs.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const WORTH_IT_FOR = [
  'You are heading toward a STEM, life-sciences, pre-med or BS/MD pathway — AP Biology is close to expected on those applications.',
  'You can handle a rigorous, content-heavy course without it sinking your grades in everything else.',
  'Your target colleges grant credit or placement for a qualifying AP Biology score (check each school’s policy first).',
  'You want the weighted-GPA boost and a transcript that shows you took the harder option and did well.',
]

const NOT_WORTH_IT_FOR = [
  'You are taking it only for the GPA weighting while expecting a low score — a weak AP grade helps far less than a strong honors grade.',
  'Your schedule is already saturated with other APs and core commitments, and one more would hurt the whole transcript.',
  'Your intended major is unrelated to the sciences and the course would crowd out subjects that matter more to you.',
  'You are counting on the credit without checking — some universities cap it, restrict it to non-majors, or do not grant it at all.',
]

const COST_TIERS = [
  {
    label: 'Free school + College Board resources',
    price: '$0',
    detail:
      'Your AP Biology teacher, the official AP Daily videos, the CED (Course and Exam Description) and released free-response questions are free and, for many students, enough. The first move is always to use what you already have.',
  },
  {
    label: 'Targeted tutoring',
    price: 'from $2,500/yr · 1:1 from $40/hr',
    detail:
      'Structured tutoring (Cerebrum programmes from $2,500/yr, with $4,500 and $7,000 tiers; 1:1 from $40/hr) buys a planned route through all eight units, rubric-style marking of free-response answers, and someone to fix misconceptions before the exam. Most useful if you are aiming for a 5 or finding the pace hard.',
  },
]

const FAQS = [
  {
    question: 'Is AP Biology worth taking?',
    answer:
      'For students heading toward STEM, life sciences, pre-med or BS/MD, AP Biology is usually worth it — it is close to an expected course on those applications, it can earn college credit or placement, and it gives a weighted-GPA boost while signaling that you chose rigour and handled it. It is less clearly worth it if your direction is non-scientific, if your schedule is already saturated, or if you would likely earn a low score — a weak AP grade helps far less than a strong honors grade. The honest summary: worth it when it fits your goals and you can do well, not as a box to tick.',
  },
  {
    question: 'Does AP Biology give college credit?',
    answer:
      'Sometimes — and this is the part students most often get wrong. Credit and placement policies vary widely by university and even by major: some grant credit for a 4 or 5, some only for a 5, some give placement out of an intro course without credit, some cap how much AP credit counts, and selective programmes sometimes grant none at all (especially for science majors and pre-meds, where departments may want you to take their own biology). Always check the specific policy of each college on your list before assuming credit. Treat credit as a possible bonus, not the main reason to take the course.',
  },
  {
    question: 'How much does AP Biology boost your GPA?',
    answer:
      'On a weighted scale, AP courses typically add to your GPA relative to a regular class, and many high schools weight honors and AP differently. But the boost only materialises if you earn a strong grade — a low grade in a weighted AP can hurt more than a high grade in honors would have helped. The signaling matters too: colleges that recalculate GPA still value seeing that you took the harder option and succeeded. Take it for the right reasons and the GPA benefit follows; take it purely for the weighting and it can backfire.',
  },
  {
    question: 'Is AP Biology worth it for pre-med?',
    answer:
      'For pre-med and BS/MD aspirants, AP Biology is one of the most relevant APs you can take — it signals genuine interest and builds a foundation for college biology and, later, the MCAT. The caveat on credit still applies: many medical-track programmes will not let you place out of college biology even with a 5, so do not take it expecting to skip introductory bio. Take it for the foundation and the signal, and treat any credit as a bonus.',
  },
  {
    question: 'Is AP Biology hard, and is the payoff worth the difficulty?',
    answer:
      'AP Biology is content-heavy and conceptually demanding, with rubric-graded free-response questions that reward applying ideas rather than reciting them. For a student with a strong honors-biology base and good study habits, the difficulty is manageable and the payoff — credit potential, GPA weighting, signaling and a real foundation — generally justifies it. For a student already stretched thin or without that base, the same course can pull down an otherwise strong transcript. The difficulty is worth it when you can realistically do well; it is not worth it as a stretch that risks your other subjects.',
  },
  {
    question: 'How much does AP Biology support cost?',
    answer:
      'It can cost nothing. Your AP Biology teacher, the free official AP Daily videos, the Course and Exam Description and released free-response questions are enough for many students. Tutoring is optional — Cerebrum programmes start at $2,500/yr (with $4,500 and $7,000 tiers), and 1:1 tutoring starts from $40/hr. Paid support mainly buys a planned route through all eight units, expert marking of your free-response answers, and help fixing misconceptions before the exam. Start with the free resources and add tutoring only where you hit a ceiling.',
  },
  {
    question: 'What is AIIMS, for a family who has not heard of it?',
    answer:
      'AIIMS New Delhi is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School and Oxford. Our faculty are AIIMS-trained, which is why even AP-level biology is taught for genuine understanding rather than memorisation.',
  },
]

export default function IsApBiologyWorthTakingPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is AP Biology Worth Taking? An Honest Decision Guide',
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
      audienceType: 'US high-school students and parents deciding whether to take AP Biology',
    },
    about: 'Decision guide on the value, difficulty and cost of taking AP Biology',
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
        name: 'AP Biology Tutor',
        item: `${SITE_URL}/ap-biology-tutor`,
      },
      { '@type': 'ListItem', position: 3, name: 'Is AP Biology Worth Taking?', item: PAGE_URL },
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
          'AP Biology',
          'AP Biology Tutor',
          'College Board AP Exam',
          'Pre-Med Preparation',
        ]}
        jobTitle="Biology Specialist Faculty — AP, Honors, IB, Olympiad"
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
              <Link href="/ap-biology-tutor" className="hover:text-blue-700">
                AP Biology Tutor
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">Is AP Biology Worth Taking?</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <Scale className="h-3.5 w-3.5" />
            Honest decision guide
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Is AP Biology worth taking?{' '}
            <span className="text-blue-700">A balanced answer, not a sales pitch.</span>
          </h1>
          <p
            id="worth-it-summary"
            className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600"
          >
            For students heading toward STEM, life sciences, pre-med or BS/MD, AP Biology is usually
            worth taking — it can earn college credit or placement (this varies by university), it
            gives a weighted-GPA boost, and it signals that you chose rigour and handled it. It is
            less clearly worth it if your direction is non-scientific, your schedule is already
            saturated, or a low score is likely. This page lays out both sides — including
            difficulty, the credit caveats, and what support costs (free school resources, or
            tutoring from $2,500/yr and 1:1 from $40/hr). Live online in your US time zone
            (ET/CT/MT/PT).
          </p>
          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Talk it through with us first
            </a>
            <Link
              href="/ap-biology-tutor"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              See AP Biology tutoring
            </Link>
          </div>
        </section>

        {/* College credit */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <div className="flex items-center gap-3">
              <Award className="h-7 w-7 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                The college-credit value (read this carefully)
              </h2>
            </div>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                The single biggest misconception is treating AP Biology credit as automatic. It is
                not. Credit and placement policies vary widely by university and even by major: some
                grant credit for a 4 or 5, some only for a 5, some give placement out of an intro
                course without credit, some cap total AP credit, and selective programmes sometimes
                grant none at all — especially for science majors and pre-meds, where departments
                often want you to take their own biology.
              </p>
              <p>
                So the honest framing is: check the specific policy of every college on your list
                before you decide, and treat credit as a possible bonus rather than the main reason
                to take the course. The more durable benefits are the GPA weighting, the signaling,
                and the genuine foundation it builds.
              </p>
            </div>
          </div>
        </section>

        {/* GPA + signaling */}
        <section className="mx-auto max-w-4xl px-4 py-14">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              GPA weighting, signaling and the difficulty tradeoff
            </h2>
          </div>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
            <p>
              Many high schools weight AP courses above regular and honors classes, so a strong AP
              Biology grade can lift your weighted GPA. But the benefit only appears if you do well
              — a low grade in a weighted AP can hurt more than a high grade in honors would have
              helped. Colleges that recalculate GPA still value seeing that you took the harder
              option and succeeded.
            </p>
            <p>
              That is the whole tradeoff. AP Biology is content-heavy and conceptually demanding,
              with rubric-graded free-response questions that reward applying ideas, not reciting
              them. For a student with a strong honors-biology base and good habits, the difficulty
              is manageable and the payoff justifies it. For a student already stretched thin, the
              same course can drag down an otherwise strong transcript. The difficulty is worth it
              when you can realistically do well — not as a stretch that risks your other subjects.
            </p>
          </div>
        </section>

        {/* Worth it vs not */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Who should take it — and who should not
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
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
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
          </div>
        </section>

        {/* Cost */}
        <section className="mx-auto max-w-5xl px-4 py-14">
          <div className="flex items-center gap-3">
            <DollarSign className="h-7 w-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              What support actually costs
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
            Cost should not decide this for you, because a lot of strong AP Biology support is free.
            Here is the honest range.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {COST_TIERS.map((c) => (
              <div key={c.label} className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
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
            Our honest recommendation: lean on your teacher and the free College Board resources
            first, and add tutoring only where you genuinely hit a ceiling — usually free-response
            technique or a unit that will not stick.
          </p>
        </section>

        {/* Enquiry */}
        <section id="enquiry" className="mx-auto max-w-xl px-4 py-14">
          <GlobalEnquiryForm
            source="is-ap-biology-worth-taking"
            title="Not sure if AP Biology is the right call?"
            subtitle="Tell us your grade, target colleges and goals. We will give you an honest read on whether AP Biology is worth it for you — and the cheapest sensible way to do well. Reply within a day in your US time zone."
          />
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Is AP Biology worth taking &mdash; common questions
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
          <h2 className="text-xl font-bold text-slate-900">If you decide to take it</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href="/ap-biology-tutor"
              className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
            >
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 text-base font-bold text-slate-900">AP Biology Tutor</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                All eight College Board units, live online in your US time zone.
              </p>
            </Link>
            <Link
              href="/ap-biology-score-5-study-guide"
              className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
            >
              <Target className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 text-base font-bold text-slate-900">AP Biology score-5 guide</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                How to study for a 5 — units, free-response technique and pacing.
              </p>
            </Link>
            <Link
              href="/honors-biology-tutor"
              className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
            >
              <BookOpen className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 text-base font-bold text-slate-900">Honors Biology Tutor</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Build the foundation first — the best predictor of an AP-5.
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
              We will tell you honestly whether AP Biology fits your goals and target colleges, and
              help you do well the affordable way. Free first conversation, in your US time zone.
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
                href="/ap-biology-tutor"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <GraduationCap className="h-5 w-5" />
                See AP Biology tutoring
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
