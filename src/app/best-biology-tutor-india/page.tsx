/**
 * /best-biology-tutor-india
 *
 * Tutor-intent head-term variant. The "tutor" search is distinct from
 * "coaching" — searchers want 1:1 or small-group mentorship, named
 * mentor, customised curriculum. Differentiated from
 * /best-biology-coaching-india by leading with the personalisation
 * angle and the Pinnacle ZA tier as the tutor-like product.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  ChevronRight,
  GraduationCap,
  Home,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Target,
  UserCheck,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/best-biology-tutor-india'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Best Biology Tutor in India — 1:1 & Micro-Batch Mentoring · NEET · IB · AP · Olympiads',
  description:
    "India's top biology tutor — Dr. Shekhar C Singh (AIIMS New Delhi alumnus). 1:1 Solo and 6-12 student micro-batch tutoring across NEET, IB, AP, MCAT, USABO/IBO Olympiads. Named mentor for the long arc. Live online globally + 4 NCR offline centres. Free trial.",
  keywords: [
    'best biology tutor',
    'best biology tutor india',
    'biology tutor india',
    'biology tutor online india',
    'best biology private tutor',
    'best biology 1 on 1 tutor',
    'biology personal tutor india',
    'biology tutor for NEET',
    'biology tutor for IB',
    'biology tutor for AP',
    'biology tutor for MCAT',
    'biology tutor for olympiad',
    'biology tutor NRI',
    'biology tutor english medium',
    'aiims faculty biology tutor',
    'dr shekhar singh biology tutor',
    'biology tutor for Class 11',
    'biology tutor for Class 12',
    'biology tutor for dropper',
    'biology tutor near me',
    'best biology mentor india',
    'biology tutor for IGCSE',
    'biology tutor for A Level',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-IN': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Best Biology Tutor in India · 1:1 & Micro-Batch · Cerebrum',
    description:
      '1:1 Solo and 6-12 student micro-batch biology tutoring with Dr. Shekhar C Singh (AIIMS alumnus). NEET, IB, AP, MCAT, Olympiads.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best Biology Tutor in India — 1:1 & Micro-Batch Mentoring · NEET · IB · AP · Olympiads',
    description:
      '1:1 Solo and 6-12 student micro-batch biology tutoring with Dr. Shekhar C Singh (AIIMS alumnus). NEET, IB, AP, MCAT, Olympiads.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const TIERS = [
  {
    name: '1:1 Solo Tutor',
    students: '1 student',
    angle:
      'Fully dedicated tutor. Used by OCSC candidates, USABO Finals aspirants, IBO team aspirants, and families wanting the maximum personalisation. Reserved tier; limited slots per year.',
    bestFor: 'IBO / OCSC track, USABO Finals, USMLE Step 1 prep',
  },
  {
    name: 'Pinnacle ZA Micro-Batch',
    students: '6-12 students',
    angle:
      'Tutor-like at small scale. Direct Dr. Shekhar weekly review, customised topic plans, weekly per-student progress check, monthly 1:1 mentor call. The product 95% of tutor-seeking families pick.',
    bestFor: 'NEET 360/360 biology aspirants, IB HL 7-target students, INBO Stage 2',
  },
  {
    name: 'Ascent Pro Batch',
    students: '12-16 students',
    angle:
      'Senior faculty trained by Dr. Shekhar. Strong personalisation but less than Pinnacle. Best fit for families wanting tutor-style depth at a more accessible tier.',
    bestFor: 'NEET 340+/360 biology, AP score-5, NSEB qualification',
  },
]

const FAQS = [
  {
    question: "What's the difference between a tutor and coaching?",
    answer:
      'A tutor knows your child specifically — their reasoning gaps, learning style, target college, time-zone constraints. A coaching center runs a curriculum at scale. Cerebrum delivers the tutor experience even in the small-batch tiers because Dr. Shekhar personally reviews curriculum and assessment for every batch, and the small batch size makes per-student depth possible.',
  },
  {
    question: "Why is Dr. Shekhar considered one of India's best biology tutors?",
    answer:
      'Three reasons. (1) AIIMS New Delhi alumnus — credibility in the highest-tier medical education context in India. (2) 15+ years exclusively teaching biology — no PCM faculty rotation, no general-track distractions. (3) Track record: 680+ medical college selections among his cohorts, 67+ to AIIMS Delhi specifically, multiple students with 100 percentile in NEET biology, multiple INBO/USABO/BBO/CBO qualifiers, IB HL 7/7 outcomes, AP score-5 outcomes. Same tutor across 12 years, same depth, same outcomes.',
  },
  {
    question: 'Do you offer 1:1 fully solo tutoring?',
    answer:
      'Yes — the 1:1 Solo tier exists. Reserved for specific high-intensity cases: OCSC residential-camp aspirants, USABO National Finals candidates, IBO team aspirants, USMLE Step 1 candidates who need fully customised pacing. Limited slots (max ~8 per year for 1:1 Solo). For 95% of families, the Pinnacle ZA Micro-Batch (6-12 students with direct Dr. Shekhar weekly review) delivers tutor-like depth without the 1:1 cost.',
  },
  {
    question: 'What programmes does the tutor cover?',
    answer:
      "Same seven verticals as Cerebrum's coaching offering: NEET-UG Biology (Class 11 / 12 / dropper), IB Biology HL & SL, AP Biology, MCAT Biology + Biochemistry, USMLE Step 1 Biology, Biology Olympiads (NSEB/INBO/IBO/USABO/BBO/CBO/SBO), CBSE/ICSE Class 11-12 Biology. The tutor delivery is the personalisation layer; the curriculum spans all seven.",
  },
  {
    question:
      'My child is in IB Biology HL — does a tutor make more sense than a classroom coaching?',
    answer:
      'Often yes for IB HL students because IB IA (Internal Assessment) and EE (Extended Essay) are inherently individual projects that need named-mentor supervision. A tutor relationship is structurally better for IB than a classroom coaching format. We have current IB HL students globally on the Pinnacle ZA Micro-Batch tier specifically for this reason.',
  },
  {
    question:
      "I'm in the UAE / USA / UK / Canada / Saudi. Can my child have an India-based biology tutor?",
    answer:
      'Yes — Cerebrum tutors students globally via Zoom. Time-zone-matched slots for Gulf, India, Southeast Asia, UK, US East/West, Canada, Australia. Active NRI cohorts in 30+ countries. Printed study material shipped to your address.',
  },
  {
    question: 'How does pricing work for tutoring?',
    answer:
      "We don't publish prices because they depend on tier (1:1 Solo, Pinnacle ZA Micro-Batch, Ascent Pro Batch), programme (NEET vs IB vs MCAT vs Olympiad), currency (INR / USD / AED / GBP / CAD / SAR), and any sibling discount. Send a WhatsApp with your child's class + programme + country — we share the tier matrix and quote in conversation. Free trial class with Dr. Shekhar comes first.",
  },
  {
    question: 'How do I start?',
    answer:
      'Free 60-minute trial with Dr. Shekhar. Bring one biology question your child has struggled with. We work through it live and you see the tutor-style depth before committing.',
  },
]

export default function BestBiologyTutorIndiaPage() {
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      "Hi — I'm looking for a biology tutor for my child. Currently in Class [9/10/11/12/dropper], targeting [NEET / IB / AP / MCAT / USMLE / Olympiad / CBSE]. Based in [city, country]. Please share 1:1 and micro-batch tutor options."
    )

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Best Biology Tutor in India — 1:1 and Micro-Batch',
    description:
      "India's best biology tutor service — Dr. Shekhar C Singh and senior faculty. 1:1 Solo and 6-12 student micro-batch across NEET, IB, AP, MCAT, Olympiads.",
    url: PAGE_URL,
    inLanguage: 'en-IN',
    educationalLevel: 'Class 9-12 + dropper + international curriculum',
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

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Best Biology Tutor India',
          '1:1 Biology Tutoring',
          'Micro-Batch Biology Tutor',
          'Biology Tutor for NEET',
          'Biology Tutor for IB',
          'Biology Tutor for AP',
          'Biology Tutor for MCAT',
          'Biology Tutor for Olympiads',
        ]}
        jobTitle="India's Top Biology Tutor — 1:1 + Micro-Batch Mentor"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            <li className="text-slate-700">Best Biology Tutor India</li>
          </ol>
        </nav>

        <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-900">
            <UserCheck className="h-3.5 w-3.5" />
            Direct Dr. Shekhar · 1:1 Solo + Pinnacle ZA Micro-Batch
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900 max-w-4xl">
            Best biology tutor in India —{' '}
            <span className="text-indigo-700">named mentor, not a lecture hall.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-4xl">
            Dr. Shekhar C Singh &mdash; AIIMS New Delhi alumnus, founder of Cerebrum (2014), 15+
            years of biology-specialist tutoring. 1:1 Solo tier for the most demanding cases (OCSC,
            USABO Finals, IBO). Pinnacle ZA Micro-Batch (6-12 students, direct Dr. Shekhar weekly
            review) for 95% of tutor-seeking families. Across NEET, IB, AP, MCAT, USMLE Step 1, and
            every biology olympiad &mdash; same personalisation layer.
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

        {/* 3 tutor models */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Three tutor models — pick by depth needed
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {TIERS.map((t, idx) => (
                <div
                  key={t.name}
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
                    className={`mt-3 text-lg font-bold ${idx === 1 ? 'text-white' : 'text-slate-900'}`}
                  >
                    {t.name}
                  </h3>
                  <p
                    className={`text-sm font-semibold ${idx === 1 ? 'text-amber-300' : 'text-indigo-700'}`}
                  >
                    {t.students}
                  </p>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${idx === 1 ? 'text-indigo-100' : 'text-slate-700'}`}
                  >
                    {t.angle}
                  </p>
                  <p
                    className={`mt-4 text-xs uppercase tracking-wide font-semibold ${idx === 1 ? 'text-amber-300' : 'text-slate-500'}`}
                  >
                    Best for
                  </p>
                  <p className={`mt-1 text-sm ${idx === 1 ? 'text-indigo-100' : 'text-slate-700'}`}>
                    {t.bestFor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why named mentor */}
        <section className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Why a named mentor matters — and what most coaching gets wrong
          </h2>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">
            At Allen, Aakash, or PW your child sees rotating biology faculty across the year. Each
            teacher knows only the slice of curriculum they teach. Nobody has the full picture of
            your child\&rsquo;s specific reasoning gaps, learning trajectory, or target. That
            architectural limitation is why mass-coaching biology scores plateau at 280-300 for so
            many students.
          </p>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">
            A named mentor solves this. Dr. Shekhar (or one of our senior tutors) follows your child
            across the full prep year &mdash; knows their first attempt, their reasoning failure
            modes, the topics they accelerated on, the topics they keep losing marks on. Each
            week\&rsquo;s teaching is calibrated to that specific history. That feedback loop is the
            entire mechanism behind tutor-led outcomes.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: <Target className="h-5 w-5 text-indigo-600" />,
                title: 'Personal reasoning-gap diagnosis',
                text: 'Tutor watches attempts live and identifies exact reasoning failure modes — not just "this is wrong" but "this conflates depolarisation with hyperpolarisation directions".',
              },
              {
                icon: <Sparkles className="h-5 w-5 text-indigo-600" />,
                title: 'Customised week-on-week plan',
                text: 'No two students follow identical curriculum cadence. Topic depth allocation varies by individual.',
              },
              {
                icon: <Award className="h-5 w-5 text-indigo-600" />,
                title: 'Accountability that self-study lacks',
                text: 'Weekly tutor sessions create accountability. You complete the Campbell chapter because the tutor will ask about it.',
              },
              {
                icon: <GraduationCap className="h-5 w-5 text-indigo-600" />,
                title: 'Same mentor for the long arc',
                text: 'Olympiad / NEET prep is a 1-2 year arc. Named mentor across that timeframe means deep familiarity with strengths + gaps.',
              },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-slate-200 p-5">
                {c.icon}
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Best biology tutor — common questions
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
            <Award className="h-10 w-10 text-amber-300 mx-auto" />
            <h2 className="mt-4 text-2xl md:text-3xl font-bold">
              Book a free trial with Dr. Shekhar
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              60 minutes, live, with the founder. Bring one biology question your child has
              struggled with. You see the tutor-style depth before committing.
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
