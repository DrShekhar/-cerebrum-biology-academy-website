/**
 * /neet-dropper-biology-specialist-2027
 *
 * Cornerstone positioning page — the "biology-specialist drop-in" wedge
 * that none of Allen / Aakash / PW / Motion own. They sell full-package
 * coaching; we sell the biology layer for the dropper who is already
 * enrolled somewhere else and is losing 30-40 marks on biology.
 *
 * Keyword targets (from June 2026 dropper research):
 *   - "neet dropper biology coaching"
 *   - "best biology teacher for neet dropper"
 *   - "biology coaching for neet repeater"
 *   - "neet 2027 dropper biology"
 *   - "how to improve biology score neet dropper"
 *
 * Schema: Course + Person (Dr. Shekhar) + Org + FAQ + Breadcrumb.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Home,
  Microscope,
  MessageCircle,
  Phone,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/neet-dropper-biology-specialist-2027'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'NEET Dropper Biology Specialist 2027 | The Add-On to PW, Allen, Aakash & Kota',
  description:
    'Most droppers are losing 30–40 marks on biology, not physics or chemistry. Cerebrum is a biology-only specialist — pair us with your existing dropper batch (PW / Allen / Aakash / Kota) to move biology from 65 → 90+. AIIMS-trained faculty, max 10–20 students per batch, NEET 2027 admissions open.',
  keywords: [
    'neet dropper biology coaching',
    'biology coaching for neet dropper',
    'best biology teacher for neet dropper',
    'neet 2027 dropper biology',
    'biology specialist neet dropper',
    'biology test series neet dropper',
    'neet repeater biology coaching',
    'how to improve biology neet dropper',
    'biology revision neet dropper',
    'ncert biology for neet dropper',
    'biology mcq dropper batch',
    'class 13 biology coaching',
    'neet dropper biology weak',
    'biology add on neet dropper',
    'pair biology coaching with allen aakash pw',
    'biology only neet dropper coaching',
    'dr shekhar singh biology dropper',
    'aiims faculty biology neet dropper',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      'en-IN': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'NEET Dropper Biology Specialist 2027 — Cerebrum Biology Academy',
    description:
      'Biology-only specialist drop-in for NEET 2027 droppers already enrolled at PW / Allen / Aakash / Kota. Move biology from 65 → 90+ marks.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Dropper Biology Specialist 2027 | The Add-On to PW, Allen, Aakash & Kota',
    description:
      'Most droppers are losing 30–40 marks on biology, not physics or chemistry. Cerebrum is a biology-only specialist — pair us with your existing dropper batch (PW / Allen / Aakash / Kota) to move biol...',
  },
  robots: 'index, follow, max-image-preview:large',
}

const FAQS = [
  {
    question: "I'm already at PW / Allen / Aakash / Kota — why would I add Cerebrum on top?",
    answer:
      'Because biology is where most droppers lose 30–40 marks, and large-batch coaching cannot teach biology depth. Physics and chemistry are problem-solving subjects — a 200-seat lecture works. Biology is conceptual + memory-heavy + question-pattern-specific — it needs small-batch discussion, per-question rationale, and weekly retrieval practice. Our dropper students typically keep their primary coaching for PCM and add us as a 6 hour/week biology layer.',
  },
  {
    question: 'How much can biology realistically improve in one drop year?',
    answer:
      'Our dropper cohort average is +25 to +40 marks in biology alone over 10 months of weekly specialist coaching. That is the single largest subject-level improvement we see in any cohort, because biology has the most ground to gain — droppers usually have unrefined recall, not weak fundamentals. The mechanism is research-backed: spaced retrieval (Karpicke & Roediger, 2008) plus interleaved MCQ drilling, which is exactly what our weekly cycle delivers.',
  },
  {
    question: "Is this only for online students? I'm in Kota / Delhi / Hyderabad.",
    answer:
      "Live online via Zoom, scheduled outside your primary coaching hours (early morning or late evening). Printed Cerebrum Biology study material is shipped to your address at no extra cost — including the NCERT-line-by-line guide and 12,000+ MCQ bank. If you're in Delhi NCR you can also attend in-person at our South Extension / Rohini / Gurugram / Faridabad centres.",
  },
  {
    question: "What's the fee structure?",
    answer:
      'Three tiers for the dropper biology specialization: Pursuit (₹40,000–₹75,000/year, batch of 30-40), Ascent (₹58,000–₹90,000/year, batch of 16-25, our most popular tier), Pinnacle ZA (₹1,20,000–₹1,56,000/year, batch of 10-12 with weekly 1-on-1 mentorship from Dr. Shekhar himself). All tiers include weekly tests, full study material, and unlimited doubt sessions. EMI options available.',
  },
  {
    question: 'Who is Dr. Shekhar and why should I trust this?',
    answer:
      'Dr. Shekhar C Singh is an AIIMS New Delhi alumnus who founded Cerebrum in 2014. 15+ years of NEET biology teaching, 680+ medical college selections including 67+ to AIIMS Delhi, 98% NEET-UG qualification rate. He personally teaches the Pinnacle tier and supervises curriculum for all batches. We are biology-only by design — no physics, no chemistry, no distractions.',
  },
  {
    question: 'How is your test series different from PW / Allen / Aakash test series?',
    answer:
      "Our biology test series is built around the exact question patterns that have appeared in NEET 2018-2026, weighted by chapter to match NEET's actual emphasis (which differs from NCERT weightage). Most general coaching test series allocate biology questions evenly across chapters — that does not match reality. Our test series is pattern-engineered: more questions on Human Physiology, Genetics, Plant Physiology, Ecology — the chapters that consistently make up 70% of NEET biology marks.",
  },
  {
    question: 'When does the NEET 2027 dropper biology specialist programme start?',
    answer:
      'The 2026-27 dropper batch starts July 2026 (immediately after NEET 2026 result counselling closes). Late admissions accepted up to September 2026. Curriculum runs through April 2027 with a 4-week revision sprint before NEET 2027 (scheduled May 2027 per NTA tentative calendar).',
  },
  {
    question: "What's the time commitment alongside my primary coaching?",
    answer:
      '6 hours/week of live online classes (typically two 90-minute slots per week) + 2-3 hours of weekly MCQ tests + 1 hour weekly mentor call (Pinnacle tier only). That fits inside the gaps in your primary dropper schedule — designed not to compete with your PCM workload.',
  },
  {
    question: 'Can I trial the programme before committing?',
    answer:
      'Yes. We run a free 60-minute demo class with Dr. Shekhar where you bring your weakest 5 NEET-style biology questions and we work through them live. About 80% of dropper enquiries take this demo before deciding. Book via WhatsApp +91 88264 44334.',
  },
  {
    question: "What if I haven't even decided to drop yet?",
    answer:
      "Read our biology revision plan first — it's the same 12-week plan we run in the dropper batch, available as a free download. If you can follow that on your own with discipline, you may not need a coaching add-on. If you can't (most can't — the structure and accountability is the value), the dropper batch exists for that reason.",
  },
]

export default function NEETDropperBiologySpecialistPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'NEET Dropper Biology Specialist 2027',
    description:
      'Biology-only specialist coaching for NEET 2027 droppers. Designed as a 6 hour/week layer on top of any existing dropper batch (PW, Allen, Aakash, Motion, Kota chains). AIIMS-trained faculty, max 10–20 students per batch, pattern-engineered test series.',
    url: PAGE_URL,
    inLanguage: 'en-IN',
    educationalLevel: 'NEET-UG Dropper / Class 12 Pass',
    educationalCredentialAwarded: 'NEET Biology Mastery Certificate',
    provider: { '@id': `${SITE_URL}/#organization` },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        name: 'Pursuit (Small Batch 30-40)',
        description:
          'Live small-batch NEET biology classes with senior faculty, weekly chapter tests, doubt sessions. Most affordable structured tier.',
        courseMode: 'Online',
        offers: {
          '@type': 'Offer',
          price: 40000,
          priceCurrency: 'INR',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: 40000,
            priceCurrency: 'INR',
            unitText: 'ANN',
          },
          url: PAGE_URL,
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'CourseInstance',
        name: 'Ascent (Pro Batch 16-25)',
        description:
          'Tighter batch with weekly 1:1 doubt slots, monthly NEET-pattern mocks, personalised gap analysis. Most popular dropper tier.',
        courseMode: 'Online',
        offers: {
          '@type': 'Offer',
          price: 58000,
          priceCurrency: 'INR',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: 58000,
            priceCurrency: 'INR',
            unitText: 'ANN',
          },
          url: PAGE_URL,
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'CourseInstance',
        name: 'Pinnacle ZA (Direct Dr. Shekhar 10-12)',
        description:
          'Micro-batch with direct Dr. Shekhar 1-on-1 mentoring. Calibrated for AIIMS / top-1000 rank aspirants among droppers.',
        courseMode: 'Online',
        offers: {
          '@type': 'Offer',
          price: 120000,
          priceCurrency: 'INR',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: 120000,
            priceCurrency: 'INR',
            unitText: 'ANN',
          },
          url: PAGE_URL,
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Dropper Biology Specialist 2027',
        item: PAGE_URL,
      },
    ],
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

  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      "Hi — I'm a NEET 2027 dropper looking at biology-specialist coaching for NEET 2027. Can we discuss?"
    )

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Dropper Biology',
          'NEET Repeater Biology Coaching',
          'NEET Biology Revision Strategy',
          'NEET Biology Test Series',
          'Class 13 NEET Biology',
          'NEET 2027 Biology Preparation',
        ]}
        jobTitle="Founder & Lead Biology Faculty — NEET Dropper Specialist Coaching"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-indigo-700 flex items-center gap-1">
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">NEET Dropper Biology Specialist 2027</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-16">
          <div className="grid gap-10 md:grid-cols-5 md:items-center">
            <div className="md:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">
                <Target className="h-3.5 w-3.5" />
                NEET 2027 dropper admissions — open until September 2026
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900">
                Your biology score is the rank limiter.{' '}
                <span className="text-indigo-700">We fix that.</span>
              </h1>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Most NEET droppers land in the 600-640 range with strong physics and chemistry but a
                biology score stuck at 280-300. That gap is what separates a government MBBS rank
                from a private MBBS rank. Cerebrum is a biology-only specialist — designed to pair
                with your existing PW, Allen, Aakash, Motion or Kota dropper batch, not replace it.
              </p>

              <div className="mt-7 flex flex-col md:flex-row gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-emerald-700"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Dr. Shekhar
                </a>
                <Link
                  href="/demo-booking?source=dropper-biology-specialist"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-indigo-600 px-5 py-3 text-base font-semibold text-indigo-700 hover:bg-indigo-50"
                >
                  Book a free demo class
                </Link>
              </div>

              <p className="mt-3 text-sm text-slate-500">
                Free 60-min trial with Dr. Shekhar — bring your weakest 5 biology questions and we
                work them live.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  The dropper biology gap, in numbers
                </p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm text-slate-600">
                      Avg NEET 2025 biology score among droppers
                    </span>
                    <span className="text-2xl font-bold text-slate-900">290</span>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm text-slate-600">
                      Govt MBBS cutoff biology benchmark
                    </span>
                    <span className="text-2xl font-bold text-indigo-700">340+</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-slate-900">
                      Cerebrum dropper cohort avg gain
                    </span>
                    <span className="text-2xl font-bold text-emerald-600">+25-40</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The wedge — who this is for */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Is the biology-specialist programme for you?
            </h2>
            <p className="mt-3 text-slate-600 max-w-3xl">
              This page is not for everyone. The biology specialist drop-in works only if you fit a
              specific profile. Be honest with yourself before booking.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
                  ✓ This is for you if
                </p>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    You attempted NEET 2025 or 2026 and scored 540-680 overall but biology was the
                    lowest of your three subject scores.
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    You are enrolled (or about to enrol) in a full-package dropper coaching for NEET
                    2027 — PW, Allen, Aakash, Motion, Resonance, Bansal, Vibrant, Sri Chaitanya or
                    similar.
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    You can give 6 hours a week to focused biology work outside your primary
                    coaching schedule.
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    You want to fix a specific subject, not redo your whole preparation.
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border-2 border-rose-200 bg-rose-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-rose-800">
                  ✗ This is not for you if
                </p>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="font-bold text-rose-600">×</span>
                    Your physics and chemistry are also at 50-60% — in that case you need a
                    full-package dropper batch, not a biology specialist. See our{' '}
                    <Link
                      href="/neet-dropper-batch-kota"
                      className="underline font-medium text-indigo-700"
                    >
                      full dropper batch programme
                    </Link>{' '}
                    instead.
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-rose-600">×</span>
                    You expect biology to fix itself if you just attend more lectures. Biology
                    improvement is retrieval-practice driven; lectures alone don\'t move the score.
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-rose-600">×</span>
                    You can\'t commit to weekly tests and a strict NCERT revision schedule. The
                    programme is intensive, not casual.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why biology specifically */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Why biology is the dropper\'s rank limiter — and why large-batch coaching can\'t fix
                it
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                NEET biology is 360 of 720 total marks — half the exam. A 50-mark gap in biology is
                mathematically larger than a 50-mark gap in physics or chemistry combined. Among the
                1,400+ dropper students we have worked with since 2014, the biology score gap is
                almost always the largest contributor to a sub-600 attempt.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Yet biology is the subject that large-batch coaching (Allen, Aakash, PW, Kota
                chains) struggle most to teach. Physics and chemistry are problem-solving subjects:
                a 200-seat lecture can transmit a derivation or a reaction mechanism efficiently.
                Biology is conceptual + memory + question-pattern recognition — none of which
                transmit well at scale.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                The student-side fix is small-batch retrieval practice, weekly question-pattern
                drilling, and NCERT-line-by-line consolidation. The coaching-side fix is being
                biology-only by design — no resource competition with physics/chemistry, no
                over-stretched faculty.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300">
                Where your 30-40 biology marks are sitting
              </p>
              <p className="mt-3 text-base leading-relaxed">
                Based on attempt-analysis of NEET 2025 dropper students:
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Human Physiology (98 marks)</span>
                    <span className="font-semibold">avg loss: 14 marks</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-700">
                    <div className="h-2 rounded-full bg-amber-400" style={{ width: '60%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Genetics & Evolution (72 marks)</span>
                    <span className="font-semibold">avg loss: 9 marks</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-700">
                    <div className="h-2 rounded-full bg-amber-400" style={{ width: '50%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Plant Physiology (54 marks)</span>
                    <span className="font-semibold">avg loss: 7 marks</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-700">
                    <div className="h-2 rounded-full bg-amber-400" style={{ width: '45%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Ecology + Biotech (54 marks)</span>
                    <span className="font-semibold">avg loss: 6 marks</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-700">
                    <div className="h-2 rounded-full bg-amber-400" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
              <p className="mt-5 text-xs text-slate-400">
                Source: Cerebrum dropper attempt-analysis call data, 2024-2026 cohorts, n=412.
              </p>
            </div>
          </div>
        </section>

        {/* What the programme actually delivers */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              What the biology specialist programme actually delivers
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
                  title: 'NCERT-line-by-line revision',
                  text: 'Cerebrum NCERT guide annotates every NEET-tested line in Class 11 + 12 NCERT Biology. Eight 90-minute live sessions cover the full syllabus consolidation in your first 8 weeks.',
                },
                {
                  icon: <Microscope className="h-6 w-6 text-indigo-600" />,
                  title: 'Pattern-engineered MCQ drilling',
                  text: '12,000+ MCQ bank, weighted by chapter to match NEET 2018-2026 actual emphasis (not NCERT proportional weight). Weekly 90-question chapter tests in Phase 1, full 90-question biology mocks in Phase 2.',
                },
                {
                  icon: <Users className="h-6 w-6 text-indigo-600" />,
                  title: 'Small-batch live discussion',
                  text: 'Max 10-20 students per batch (varies by tier). Every wrong MCQ in the weekly test is discussed in the next live class — the per-question rationale is the part lectures cannot deliver.',
                },
                {
                  icon: <TrendingUp className="h-6 w-6 text-indigo-600" />,
                  title: 'Weekly progress tracking',
                  text: "Your biology score trajectory is plotted week-on-week. We share the dashboard with you and (if you opt in) with your primary coaching's academic mentor so plans stay aligned.",
                },
                {
                  icon: <Target className="h-6 w-6 text-indigo-600" />,
                  title: '4-week pre-NEET revision sprint',
                  text: 'April 2027 sprint: daily 1-hour biology revision live class + 1 full mock per day. Calibrated for the 30 days before NEET 2027. This phase alone often delivers a +10 mark improvement.',
                },
                {
                  icon: <Award className="h-6 w-6 text-indigo-600" />,
                  title: 'Mentor accountability call',
                  text: 'Pinnacle tier: weekly 30-min 1-on-1 with Dr. Shekhar. Ascent tier: bi-weekly with senior faculty. Pursuit tier: monthly group mentor session. The accountability layer is what most droppers actually lack.',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Three tiers. Pick by batch size + mentor access, not features.
          </h2>
          <p className="mt-3 text-slate-600 max-w-3xl">
            All tiers cover the same syllabus, same test series, same study material. What scales by
            tier is batch size, mentor depth, and personalisation.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {/* Pursuit */}
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Pursuit
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                ₹40,000<span className="text-sm font-normal text-slate-500">/year</span>
              </p>
              <p className="text-sm text-slate-500">Up to ₹75,000 depending on add-ons</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                <li>Small batch (30–40 students)</li>
                <li>Weekly chapter tests + full mocks</li>
                <li>Live doubt sessions</li>
                <li>Cerebrum NCERT guide + MCQ bank shipped</li>
                <li>Monthly group mentor call</li>
              </ul>
            </div>

            {/* Ascent — featured */}
            <div className="rounded-2xl bg-indigo-700 p-6 text-white shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                Ascent · Most popular dropper tier
              </p>
              <p className="mt-2 text-3xl font-bold">
                ₹58,000<span className="text-sm font-normal text-indigo-200">/year</span>
              </p>
              <p className="text-sm text-indigo-200">Up to ₹90,000 depending on add-ons</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li>Pro batch (16–25 students)</li>
                <li>Weekly 1:1 doubt slot (15 min)</li>
                <li>Monthly NEET-pattern full mocks</li>
                <li>Personalised gap-analysis dashboard</li>
                <li>Bi-weekly senior faculty mentor call</li>
              </ul>
            </div>

            {/* Pinnacle */}
            <div className="rounded-2xl bg-slate-900 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                Pinnacle ZA
              </p>
              <p className="mt-2 text-3xl font-bold">
                ₹1,20,000<span className="text-sm font-normal text-slate-400">/year</span>
              </p>
              <p className="text-sm text-slate-400">Up to ₹1,56,000 depending on add-ons</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li>Micro-batch (10–12 students)</li>
                <li>Direct teaching by Dr. Shekhar</li>
                <li>Weekly 30-min 1-on-1 mentor call</li>
                <li>Customised study plan per student</li>
                <li>AIIMS / Top-1000 rank calibration</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            EMI options available on all tiers. Pursuit tier eligible for 30% scholarship based on
            previous NEET score (call to verify).
          </p>
        </section>

        {/* Testimonial — Sadhna Sirin, the literal proof point */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="grid gap-10 md:grid-cols-5 md:items-center">
              <div className="md:col-span-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-900">
                  <Award className="h-3.5 w-3.5" />
                  100 percentile biology · NEET 2023
                </span>
                <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900">
                  Sadhna scored 360/360 in biology. The method on this page is what got her there.
                </h2>
                <figure className="mt-6 border-l-4 border-indigo-600 pl-5">
                  <blockquote className="text-lg italic text-slate-700 leading-relaxed">
                    “Dr. Shekhar Sir’s conceptual approach made complex topics simple. The weekly
                    tests and personal mentorship helped me score 360/360 in Biology.”
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <p className="font-bold text-slate-900">Sadhna Sirin</p>
                    <p className="text-slate-600">
                      Delhi-NCR Topper NEET 2023 · 695/720 · 100 percentile biology
                    </p>
                  </figcaption>
                </figure>

                <p className="mt-6 text-sm text-slate-600 leading-relaxed">
                  The two mechanisms Sadhna mentions — <em>weekly tests</em> and{' '}
                  <em>personal mentorship</em> — are the same two that the research foundation in
                  our{' '}
                  <Link
                    href="/biology-revision-plan-neet-dropper"
                    className="underline text-indigo-700 font-medium"
                  >
                    12-week revision plan
                  </Link>{' '}
                  is built around. Not a marketing message — a mechanism that has produced this
                  outcome repeatedly across our cohorts.
                </p>
              </div>

              <div className="md:col-span-2">
                <div className="aspect-video overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200 bg-black">
                  <iframe
                    src="https://www.youtube.com/embed/bk6wQCh6b9w"
                    title="Sadhna Sirin — NEET 2023 Topper testimonial · Cerebrum Biology Academy"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <p className="mt-3 text-xs text-slate-500 text-center">
                  Watch Sadhna&rsquo;s full success story (2 min)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Dropper biology specialist — common questions
            </h2>
            <div className="mt-8 divide-y divide-slate-200">
              {FAQS.map((f, idx) => (
                <details key={idx} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    <span>{f.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              NEET 2027 dropper biology batch — admissions open
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              First step is a free 60-minute trial class with Dr. Shekhar. Bring your 5 weakest
              biology questions. We\'ll show you the gap and the plan before you commit a rupee.
            </p>
            <div className="mt-6 flex flex-col md:flex-row justify-center gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold hover:bg-emerald-700"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp +91 88264 44334
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <Phone className="h-5 w-5" />
                Call now
              </a>
            </div>
            <p className="mt-6 text-xs text-slate-400">
              Or read first:{' '}
              <Link
                href="/biology-revision-plan-neet-dropper"
                className="underline hover:text-white"
              >
                The 12-week biology revision plan we teach in this batch (free)
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
