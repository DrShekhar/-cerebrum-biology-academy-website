/**
 * /biology-olympiad-tutor-india
 *
 * "Tutor" keyword variant of the olympiad cornerstone. Captures
 * "biology olympiad tutor", "biology olympiad tutor india",
 * "biology olympiad private tutor", "find biology olympiad tutor"
 * — searcher is looking for 1:1 or small-group mentoring rather
 * than a coaching institute model.
 *
 * Positioning: Cerebrum's Pinnacle ZA tier (6-8 students with
 * direct Dr. Shekhar weekly review) IS the tutor-like product.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Home,
  MessageCircle,
  Microscope,
  Phone,
  Star,
  Target,
  Trophy,
  UserCheck,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/biology-olympiad-tutor-india'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Biology Olympiad Tutor in India — 1:1 + Micro-Batch Mentoring · Dr. Shekhar C Singh',
  description:
    'Direct 1:1 and micro-batch (6-8 students) biology olympiad tutoring with Dr. Shekhar C Singh (AIIMS New Delhi alumnus). Personalised NSEB / INBO / USABO / BBO / CBO / SBO / IBO preparation with weekly progress reviews. Available globally via Zoom.',
  keywords: [
    'biology olympiad tutor',
    'biology olympiad tutor india',
    'biology olympiad private tutor',
    'biology olympiad personal tutor',
    'biology olympiad 1 on 1 tutor',
    'biology olympiad mentor',
    'find biology olympiad tutor',
    'best biology olympiad tutor india',
    'biology olympiad online tutor',
    'NSEB tutor',
    'INBO tutor',
    'USABO tutor',
    'BBO tutor',
    'CBO tutor',
    'SBO tutor',
    'IBO tutor india',
    'campbell biology tutor',
    'biology olympiad coaching india',
    'dr shekhar singh olympiad tutor',
    'aiims faculty biology olympiad tutor',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-IN': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Biology Olympiad Tutor in India — 1:1 + Micro-Batch · Cerebrum',
    description:
      'Direct 1:1 and 6-8 student micro-batch biology olympiad mentoring with Dr. Shekhar C Singh (AIIMS alumnus).',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology Olympiad Tutor in India — 1:1 + Micro-Batch Mentoring · Dr. Shekhar C Singh',
    description:
      'Direct 1:1 and micro-batch (6-8 students) biology olympiad tutoring with Dr. Shekhar C Singh (AIIMS New Delhi alumnus). Personalised NSEB / INBO / USABO / BBO / CBO / SBO / IBO preparation with wee...',
  },
  robots: 'index, follow, max-image-preview:large',
}

const TUTORING_MODELS = [
  {
    title: '1:1 Tutor (Pinnacle ZA Solo)',
    students: '1 student',
    description:
      'Direct weekly 60-90 minute session with Dr. Shekhar. Fully customised curriculum tuned to your target olympiad, your current depth, and your school schedule. Best for INBO Stage 2, IBO simulation, or USABO Semifinal candidates. Reserved tier — limited slots per year.',
    bestFor: 'OCSC candidates, IBO team aspirants, USABO Finals candidates',
    deliverables: [
      'Weekly 1:1 with Dr. Shekhar',
      'Fully customised topic plan',
      'Primary research paper drills',
      'Mock interview practice',
    ],
  },
  {
    title: 'Pinnacle ZA Micro-Batch',
    students: '6-8 students',
    description:
      'The tutor-like product at small scale. Direct Dr. Shekhar teaching plus weekly per-student review. Cohort small enough that you know every other student, large enough that group discussion sharpens reasoning.',
    bestFor: 'NSEB → INBO funnel, USABO Semifinal track, IB HL students',
    deliverables: [
      '2 weekly classes with Dr. Shekhar',
      'Weekly 30-min 1:1 mentor call',
      'Campbell + Raven + Lehninger curriculum',
      'Olympiad-format mocks fortnightly',
    ],
  },
  {
    title: 'Competitive Tier',
    students: '8-12 students',
    description:
      'Senior faculty trained by Dr. Shekhar, supervised curriculum. Strong olympiad preparation at a tier below Pinnacle. Suitable for Class 11-12 students aiming at NSEB qualification + INBO preparation.',
    bestFor: 'NSEB target prep, BBO / CBO / SBO single-stage olympiads',
    deliverables: [
      '2-3 weekly classes',
      'Weekly chapter tests',
      'Campbell-based curriculum',
      'Group doubt sessions',
    ],
  },
]

const FAQS = [
  {
    question: "What's the difference between a tutor and coaching at Cerebrum?",
    answer:
      "Coaching = institute-led class with structured curriculum and faculty rotation. Tutoring = continuous relationship with one named mentor (Dr. Shekhar or senior faculty) who knows your child's strengths, gaps, and target olympiad. Our Pinnacle ZA tier IS the tutor-like product — direct Dr. Shekhar weekly review, customised topics, named mentor. 1:1 fully solo is also available for OCSC candidates.",
  },
  {
    question: "I'm looking for a tutor specifically — does Cerebrum offer 1:1?",
    answer:
      'Yes. The Pinnacle ZA Solo programme is fully 1:1 with Dr. Shekhar. Limited slots (max 8 per year). Reserved for OCSC candidates, USABO Finals aspirants, or IBO team aspirants. Most families pick the 6-8 student Pinnacle ZA Micro-Batch instead, which gives 95% of the 1:1 benefits at a fraction of the cost.',
  },
  {
    question:
      'How is a tutor different from watching Khan Academy or paid online olympiad video courses?',
    answer:
      'A tutor knows you. A video course does not. Olympiad prep is built on identifying your specific reasoning gaps and drilling them. Khan Academy / paid video courses are one-size-fits-all. A live tutor watches you attempt a Campbell figure-interpretation problem, sees exactly where your reasoning breaks down, and customises the next 3 weeks of work around that specific gap. That feedback loop is the entire mechanism.',
  },
  {
    question: 'My child is in IB / IGCSE. Can they have a Cerebrum tutor too?',
    answer:
      'Yes. IB Biology HL students are often well-positioned for international olympiads (BBO, USABO if US-domicile, CBO, SBO). The tutor adapts to your IB syllabus + your target olympiad — for example, an IB DP2 student preparing for USABO Open and Internal Assessment simultaneously gets a customised plan that uses IB IA as olympiad-style research training.',
  },
  {
    question: 'How much does a 1:1 biology olympiad tutor cost?',
    answer:
      'We do not publish prices because they depend on tier (1:1 Solo vs Pinnacle ZA Micro-Batch vs Competitive), your country / currency, and any sibling discount. Send a WhatsApp message — we share the tier matrix + currency-specific quote in the conversation.',
  },
  {
    question: 'How do I know if 1:1 tutor is the right fit before committing?',
    answer:
      'Free 60-minute trial class with Dr. Shekhar. Bring one olympiad-style biology question your child has struggled with. We work through it live and you see the teaching style + tutor-style depth before committing.',
  },
  {
    question: 'What olympiads can I prep for with a Cerebrum tutor?',
    answer:
      'NSEB, INBO (India funnel including OCSC), IBO simulation, USABO Open + Semifinal, BBO (UK), CBO (Canada), SBO (Singapore). Plus IB Biology HL extension prep, AP Biology Score-5 prep, NEET 360/360 biology, and the foundation work that precedes any of the above.',
  },
  {
    question: 'I am outside India. Can my child have a Cerebrum tutor?',
    answer:
      'Yes — we tutor students globally via Zoom. Active student cohorts include UAE, USA, UK, Canada, Saudi Arabia, Qatar, Singapore, Australia, and Malaysia. Time-zone-matched slot scheduled at enrolment.',
  },
]

export default function BiologyOlympiadTutorIndiaPage() {
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      "Hi — I'm looking for a biology olympiad tutor for my child. Currently in Class [9/10/11/12], targeting [NSEB / INBO / USABO / BBO / CBO / SBO / IBO]. Based in [city, country]. Please share details about 1:1 and micro-batch tutor options."
    )

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Biology Olympiad Tutor — 1:1 and Micro-Batch Mentoring',
    description:
      'Direct 1:1 and 6-8 student micro-batch biology olympiad tutoring with Dr. Shekhar C Singh. Customised NSEB / INBO / USABO / BBO / CBO / SBO / IBO preparation with weekly progress reviews. Available globally via Zoom.',
    url: PAGE_URL,
    inLanguage: 'en-IN',
    educationalLevel: 'Biology Olympiad aspirant (Class 9-12)',
    provider: { '@id': `${SITE_URL}/#organization` },
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
        name: 'Biology Olympiad Tutor India',
        item: PAGE_URL,
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Biology Olympiad Tutor',
          '1-on-1 Biology Tutoring',
          'NSEB Tutor',
          'INBO Tutor',
          'USABO Tutor',
          'BBO Tutor',
          'CBO Tutor',
          'SBO Tutor',
          'IBO Tutor India',
          'Personalised Biology Olympiad Mentoring',
        ]}
        jobTitle="1:1 Biology Olympiad Tutor — Direct AIIMS-Trained Mentor"
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
              <Link href="/" className="hover:text-indigo-700 flex items-center gap-1">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">Biology Olympiad Tutor India</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-900">
            <UserCheck className="h-3.5 w-3.5" />
            Direct Dr. Shekhar · 1:1 + Micro-Batch
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900 max-w-4xl">
            Biology olympiad tutor in India —{' '}
            <span className="text-indigo-700">a real mentor, not a video course.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-3xl">
            A tutor knows you. A video course does not. Cerebrum&rsquo;s Pinnacle ZA tier is the
            tutor-like product: 6-8 student micro-batch with direct Dr. Shekhar C Singh weekly
            review, customised topic plan, weekly progress check. Fully 1:1 Solo is also available
            for OCSC and USABO Finals candidates (limited slots).
          </p>

          <div className="mt-7 flex flex-col md:flex-row gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp for tutor slots
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-indigo-600 px-5 py-3 text-base font-semibold text-indigo-700 hover:bg-indigo-50"
            >
              <Phone className="h-5 w-5" />
              Call +91 88264 44334
            </a>
          </div>
        </section>

        {/* Tutor model breakdown */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Three tutor models. Pick by depth needed.
            </h2>
            <p className="mt-3 text-slate-600 max-w-3xl">
              Honest framing: 1:1 Solo is genuinely the gold standard but is limited in slots and
              most families don\'t need it. Micro-batch gets you 95% of the value at a fraction of
              the cost.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {TUTORING_MODELS.map((m, idx) => (
                <div
                  key={m.title}
                  className={`rounded-2xl p-6 ${
                    idx === 1
                      ? 'bg-indigo-700 text-white shadow-xl'
                      : 'bg-white ring-1 ring-slate-200'
                  }`}
                >
                  {idx === 1 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-indigo-900">
                      <Star className="h-3 w-3" />
                      Most popular
                    </span>
                  )}
                  <h3
                    className={`mt-3 text-lg font-bold ${
                      idx === 1 ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {m.title}
                  </h3>
                  <p
                    className={`text-sm font-semibold ${
                      idx === 1 ? 'text-amber-300' : 'text-indigo-700'
                    }`}
                  >
                    {m.students}
                  </p>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      idx === 1 ? 'text-indigo-100' : 'text-slate-700'
                    }`}
                  >
                    {m.description}
                  </p>
                  <p
                    className={`mt-4 text-xs uppercase tracking-wide font-semibold ${
                      idx === 1 ? 'text-amber-300' : 'text-slate-500'
                    }`}
                  >
                    Best for
                  </p>
                  <p className={`mt-1 text-sm ${idx === 1 ? 'text-indigo-100' : 'text-slate-700'}`}>
                    {m.bestFor}
                  </p>
                  <ul
                    className={`mt-4 space-y-2 text-sm ${
                      idx === 1 ? 'text-indigo-100' : 'text-slate-700'
                    }`}
                  >
                    {m.deliverables.map((d) => (
                      <li key={d} className="flex gap-2">
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 mt-0.5 ${
                            idx === 1 ? 'text-amber-300' : 'text-emerald-600'
                          }`}
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why a tutor specifically */}
        <section className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Why a tutor specifically — not just a video course
          </h2>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">
            Most biology olympiad preparation content online &mdash; Khan Academy, paid YouTube
            channels, OpenCourseWare lectures &mdash; is genuinely good content but
            one-size-fits-all. It cannot substitute for a tutor for one specific reason: olympiad
            prep is built on identifying and fixing your child&rsquo;s specific reasoning gaps, and
            video lectures cannot see where the reasoning breaks down.
          </p>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">
            A live tutor watches your child attempt a Campbell figure- interpretation problem (say:
            predict what happens to the action potential if voltage-gated potassium channels are
            blocked) and observes exactly where the reasoning breaks down. Maybe the issue is they
            conflate depolarisation and hyperpolarisation directions. Maybe they understand the
            mechanism but can&rsquo;t hold all four ion-gradient calculations in working memory
            simultaneously. Maybe they\&rsquo;ve memorised the answer to a similar question without
            understanding why. The tutor sees the precise failure mode and customises the next 3
            weeks of work around drilling that specific gap.
          </p>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">
            That feedback loop is the mechanism. Olympiad selection is won and lost on reasoning
            depth at the margins. The mass-coaching model and the video-course model both flatten
            the feedback loop. A tutor preserves it.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-5">
              <Microscope className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                Personal reasoning-gap diagnosis
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Each tutor session begins by reviewing the past week\&rsquo;s attempts and
                pinpointing the specific reasoning failure mode. Then the next session targets
                exactly that gap.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <Target className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                Customised curriculum per child
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                No two students of ours follow identical week-on-week plans. The base topic
                structure stays (Campbell\&rsquo;s 7 units) but the depth allocation per topic
                varies by individual.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <Award className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                Accountability the average student doesn\&rsquo;t have
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Weekly tutor sessions create accountability that self-study + video-course models
                lack. You finish the Campbell chapter and the figure-interpretation drills because
                the tutor is going to ask about them next week.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <GraduationCap className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                Named mentor for the long arc
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Olympiad prep is a 1-2 year arc. Having one named mentor throughout (vs faculty
                rotation at a large institute) means deep familiarity with your child\&rsquo;s
                strengths and blind spots.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Biology olympiad tutor — common questions
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

        {/* CTA */}
        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Trophy className="h-10 w-10 text-amber-300 mx-auto" />
            <h2 className="mt-4 text-2xl md:text-3xl font-bold">
              Book a free 60-minute trial with Dr. Shekhar
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              Bring one olympiad-style biology question your child has struggled with. We work
              through it live. You see the tutor-style depth before committing to anything.
            </p>
            <div className="mt-7 flex flex-col md:flex-row justify-center gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold hover:bg-emerald-700"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Dr. Shekhar
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
