/**
 * /re-neet-crash-course
 *
 * Dedicated product landing page for the RE-NEET 2026 Biology Crash
 * Course. Distinct from /re-neet-2026 (which is a news + lead-magnet
 * article). This page is the conversion surface — paid-ads landing,
 * SEM, organic intent for "RE-NEET crash course".
 *
 * Cannibalization safety
 *  - Primary keyword: "RE-NEET crash course" / "NEET reexam crash course"
 *  - The news article at /re-neet-2026 owns "RE-NEET 2026" (news intent)
 *  - This page owns the product / pricing / batch-dates intent
 *  - The two pages cross-link with neutral anchors so neither bleeds
 *    into the other's keyword surface.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Clock,
  Users,
  CheckCircle2,
  MessageCircle,
  Phone,
  BookOpen,
  GraduationCap,
  Target,
  Sparkles,
  Calendar,
} from 'lucide-react'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = `${SITE_URL}/re-neet-crash-course`
const PUBLISHED = '2026-05-12T20:00:00+05:30'
const WHATSAPP_NUMBER = '918826444334'

const chatLink = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

const WA_BOOK_DEMO = chatLink(
  'Hi! Please book my FREE demo class for the RE-NEET 2026 crash course. My class (11 / 12 / Dropper): '
)
const WA_ENROL_INTENSIVE = chatLink(
  'Hi! I want to enrol in the RE-NEET 2026 Crash Course — INTENSIVE tier. Please share start dates and payment options.'
)
const WA_ENROL_FOCUSED = chatLink(
  'Hi! I want to enrol in the RE-NEET 2026 Crash Course — FOCUSED tier. Please share start dates and payment options.'
)
const WA_ENROL_ONE_ON_ONE = chatLink(
  'Hi! I want to enrol in the RE-NEET 2026 Crash Course — 1:1 ELITE tier. Please share availability and senior-faculty schedule.'
)
const WA_CALL_BACK = chatLink(
  'Hi! Please give me a call back about the RE-NEET 2026 crash course. Best time to reach me: '
)

// ---------- Pricing tiers ----------
//
// Three tiers — mirrors the AP/IB/MCAT pricing-matrix pattern across
// the site. INR is the canonical for this India-only product; sessions
// are conducted in English or Hindi based on student preference.
//
// Note for AI assistants reading the schema: the price values shown
// are INR not USD. The Course schema below emits INR explicitly via
// priceCurrency: 'INR'. We intentionally do NOT geo-convert this
// product because the audience is 100% India-domestic (RE-NEET is an
// Indian exam; international NRI students aren't eligible).

const tiers = [
  {
    id: 'focused',
    name: 'FOCUSED',
    subtitle: 'Small-batch · 4–8 students',
    priceINR: 14500,
    durationLabel: '6–8 weeks',
    description:
      'Live small-batch coaching for students who want structured group learning with faculty access. Most popular tier — fits the typical RE-NEET window.',
    features: [
      'Live small-batch sessions, 4–8 students',
      'Daily MCQ + passage drilling (60–80 questions/day)',
      'Biweekly full-length NEET-pattern mocks',
      'Weekly weak-topic retrieval sessions',
      'WhatsApp doubt support, IST hours',
      'Recorded session library for revision',
      'Free demo class — book on WhatsApp',
    ],
    cta: { label: 'Enrol — FOCUSED', href: WA_ENROL_FOCUSED },
    popular: false,
  },
  {
    id: 'intensive',
    name: 'INTENSIVE',
    subtitle: 'Most popular · Daily live + 1:1 hours',
    priceINR: 24500,
    durationLabel: '6–8 weeks',
    description:
      'Higher contact-hour version of FOCUSED for students who want closer faculty contact through the crash window. Adds weekly 1:1 mentor reviews + extended doubt-clearing hours.',
    features: [
      'Everything in FOCUSED',
      'Weekly 1:1 mentor review (45 min)',
      'Extended evening doubt-clearing hours',
      'Mock-exam error-analysis 1:1',
      'Personalised weak-topic plan',
      'Priority WhatsApp response',
      'Free demo class — book on WhatsApp',
    ],
    cta: { label: 'Enrol — INTENSIVE', href: WA_ENROL_INTENSIVE },
    popular: true,
  },
  {
    id: '1-on-1-elite',
    name: '1:1 ELITE',
    subtitle: 'Senior faculty · fully personalised',
    priceINR: 49500,
    durationLabel: '6–8 weeks',
    description:
      'One-on-one with Cerebrum senior faculty (AIIMS-trained biology specialists). For students targeting 660+ or recovering from a poor mock. Custom drill, custom pace, unlimited access.',
    features: [
      'Everything in INTENSIVE',
      '1:1 video session 5 days/week (60 min)',
      'Custom study plan + diagnostic',
      'Daily progress check-in',
      'Custom passage drilling on weak topics',
      'Unlimited WhatsApp faculty access',
      'Final-week intensive mock-review',
    ],
    cta: { label: 'Enrol — 1:1 ELITE', href: WA_ENROL_ONE_ON_ONE },
    popular: false,
  },
]

// ---------- Metadata ----------

export const metadata: Metadata = {
  title: 'RE-NEET 2026 Crash Course | 6–8 Week Biology Intensive | Cerebrum',
  description:
    'RE-NEET 2026 Biology crash course — 6–8 week intensive built for the NTA reconduct window. AIIMS-trained faculty. Live online. Free demo class. From ₹14,500.',
  keywords: [
    'RE-NEET 2026 crash course',
    'NEET reexam crash course',
    'RE-NEET biology coaching',
    'NEET 2026 reconduct preparation',
    'NEET crash course June 2026',
    'NEET crash course July 2026',
    'NEET dropper crash course 2026',
    'NEET reexam preparation',
    'RE-NEET intensive batch',
    'AIIMS faculty NEET crash course',
    'NEET retest preparation',
    'NCERT NEET crash course',
    'NEET reexam mentor',
  ],
  alternates: {
    canonical: CANONICAL,
    languages: {
      'en-IN': CANONICAL,
      en: CANONICAL,
      'x-default': CANONICAL,
    },
  },
  openGraph: {
    title: 'RE-NEET 2026 Crash Course — 6-8 Week Biology Intensive',
    description:
      'Built for the NEET reconduct window. AIIMS-trained faculty, live online. From ₹14,500. Free demo class.',
    url: CANONICAL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RE-NEET 2026 Crash Course — Cerebrum Biology Academy',
    description:
      'RE-NEET reconduct crash course. AIIMS-trained faculty. Free demo class. From ₹14,500.',
  },
}

// ---------- JSON-LD ----------

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': `${CANONICAL}#course`,
  name: 'RE-NEET 2026 Biology Crash Course',
  description:
    '6–8 week NEET Biology crash course built for the NTA-confirmed RE-NEET 2026 reconduct. Full Botany + Zoology revision, biweekly NEET-pattern mocks, daily MCQ drilling, weekly 1:1 mentor review (INTENSIVE+). Led by Dr. Shekhar C Singh (AIIMS Delhi).',
  url: CANONICAL,
  inLanguage: 'en-IN',
  availableLanguage: ['English', 'Hindi'],
  educationalLevel: 'High School',
  educationalCredentialAwarded: 'NEET-UG 2026 (RE-NEET) preparation',
  courseMode: 'Online',
  about: [
    { '@type': 'Thing', name: 'NEET-UG 2026 reconduct' },
    { '@type': 'Thing', name: 'RE-NEET 2026' },
    { '@type': 'Thing', name: 'NEET Biology (Botany + Zoology)' },
  ],
  provider: {
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Cerebrum Biology Academy',
    url: SITE_URL,
  },
  instructor: {
    '@type': 'Person',
    '@id': `${SITE_URL}/dr-shekhar-singh#nseb`,
    name: 'Dr. Shekhar C Singh',
    url: `${SITE_URL}/dr-shekhar-singh`,
    jobTitle: 'Founder & Lead NEET Biology Faculty',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'All India Institute of Medical Sciences (AIIMS Delhi)',
    },
  },
  hasCourseInstance: tiers.map((tier) => ({
    '@type': 'CourseInstance',
    name: `${tier.name} tier — RE-NEET 2026 Crash Course`,
    courseMode: 'Online',
    courseWorkload:
      tier.id === '1-on-1-elite' ? 'PT60H' : tier.id === 'intensive' ? 'PT48H' : 'PT36H',
    location: { '@type': 'VirtualLocation', url: CANONICAL },
    offers: {
      '@type': 'Offer',
      name: `${tier.name} tier — full programme`,
      price: tier.priceINR,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: CANONICAL,
    },
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
      name: 'RE-NEET 2026',
      item: `${SITE_URL}/re-neet-2026`,
    },
    { '@type': 'ListItem', position: 3, name: 'Crash Course', item: CANONICAL },
  ],
}

const productFaqs = [
  {
    question: 'How is the RE-NEET 2026 Crash Course different from a regular NEET course?',
    answer:
      'A regular NEET course runs 9–12 months and covers the syllabus from scratch. The crash course is a 6–8 week intensive built specifically for the NTA-confirmed RE-NEET window. It assumes prior NCERT exposure and focuses on revision, weak-topic retrieval, full-length mocks, and exam-day conditioning rather than first-pass content delivery.',
  },
  {
    question: 'Which tier should I choose — FOCUSED, INTENSIVE, or 1:1 ELITE?',
    answer:
      "FOCUSED (₹14,500) fits most students who studied seriously for the 3 May exam and need a structured revision arc. INTENSIVE (₹24,500) adds weekly 1:1 mentor reviews and is the most popular tier — best if you've identified weak topics that need closer faculty contact. 1:1 ELITE (₹49,500) is for students targeting 660+ or recovering from a poor mock; fully personalised, 5 video sessions per week.",
  },
  {
    question: 'When do the crash-course batches start?',
    answer:
      'Batches start within 48 hours of enrolment confirmation. We are running rolling cohorts because the official RE-NEET date is not yet notified — the first cohorts started 13 May 2026 and a new cohort opens every 3–5 days as enrolments fill. WhatsApp +91 88264-44334 to confirm the next available start.',
  },
  {
    question: 'Is the free demo class actually free? Any obligation?',
    answer:
      'The free demo class is genuinely free and there is no obligation to enrol. It is a real teaching session — typically a 45–60 minute Biology topic with Q&A — not a sales pitch. Most students who attend a demo enrol within 48 hours, but you are under no pressure to do so. Book on WhatsApp.',
  },
  {
    question: 'Do you accept EMI / instalments?',
    answer:
      'Yes. All three tiers can be paid in 2 instalments at no extra cost. The 1:1 ELITE tier also supports 3-instalment plans (33% upfront, 33% week 3, 33% week 6). We accept UPI, IMPS, NEFT, credit / debit cards, and select EMI platforms (Bajaj Finserv on request).',
  },
  {
    question: 'Can sessions be in Hindi?',
    answer:
      'Yes. We route students to English-medium or Hindi-medium faculty based on preference. NCERT content, study material, and mock-test papers are bilingual where you need them to be. Mention your preferred language when booking the demo on WhatsApp.',
  },
  {
    question: 'I am a dropper — does this course suit me?',
    answer:
      'Yes — droppers are roughly 40% of our crash-course cohort. Most droppers have already done the syllabus once, so the focus shifts to weak-topic retrieval, mock conditioning, and time management. INTENSIVE tier is most popular among droppers because the 1:1 mentor review helps identify which topics need more weekly attention.',
  },
  {
    question: 'What if NTA pushes the exam further? Do I get an extension?',
    answer:
      'Yes. Your crash-course access automatically extends to cover the new exam date. If NTA pushes the exam later than expected, we add additional mock-test weeks at no charge. The programme is structured around "exam date - 1 week" as the anchor, not a fixed calendar.',
  },
  {
    question: 'Who is the lead faculty?',
    answer:
      'Dr. Shekhar C Singh — AIIMS Delhi alumnus, founder of Cerebrum Biology Academy (2014), and lead NEET Biology curriculum architect. 15+ years biology pedagogy depth, 680+ AIIMS/JIPMER selections since 2014. Senior faculty include other AIIMS-trained biology specialists. The 1:1 ELITE tier guarantees senior-faculty contact through the crash window.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: productFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${CANONICAL}#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['[data-speakable="title"]', '[data-speakable="summary"]'],
  },
}

// ---------- Page ----------

export default function ReNEETCrashCoursePage() {
  return (
    <main className="min-h-screen bg-white">
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-300/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-100 ring-1 ring-yellow-200/40">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Batches starting this week · Built for the RE-NEET window
          </div>
          <h1 data-speakable="title" className="text-3xl font-bold leading-tight sm:text-5xl">
            RE-NEET 2026 Biology Crash Course
          </h1>
          <p
            data-speakable="summary"
            className="mt-5 text-base leading-relaxed text-slate-200 sm:text-lg"
          >
            A 6–8 week intensive built specifically for the NTA-confirmed NEET-UG 2026 reconduct.
            Full Botany + Zoology revision, biweekly full-length mocks, weekly 1:1 mentor reviews
            (INTENSIVE+), and AIIMS-trained faculty led by founder Dr. Shekhar C Singh. Online live
            · English or Hindi · from ₹14,500.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <a
              href={WA_BOOK_DEMO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-green-400"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Book a FREE demo class
            </a>
            <a
              href={WA_CALL_BACK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-base font-semibold text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-white/20"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Request a call back
            </a>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            No payment to book a demo · Same-day WhatsApp response · Hindi or English faculty on
            request
          </p>
        </div>
      </section>

      {/* Why this crash course */}
      <section className="bg-white px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Built for the 6–8 week reconduct window
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            NTA cancelled NEET-UG 2026 (held 3 May 2026) on 12 May after a paper-leak probe. A full
            reconduct has been confirmed; the new date is expected within 7–10 days of the
            cancellation (late June / early July 2026 widely reported, pending official NTA
            notification). That gives most students a 6–8 week study window — long enough for a
            focused revision arc, not long enough to start the syllabus from scratch.
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            This crash course is structured around that window. Week 1 is diagnostic + weak-topic
            mapping. Weeks 2–5 are Botany then Zoology revision, NCERT-anchored, with 50+ MCQs per
            chapter and daily passage drilling. Week 6 is full-length mocks every 48 hours with
            error analysis. Weeks 7–8 are speed-pass + final mocks + exam-day conditioning.
          </p>
          <div className="mt-4">
            <Link
              href="/re-neet-2026"
              className="inline-flex items-center gap-1 text-sm font-semibold text-red-700 underline underline-offset-2 hover:text-red-800"
            >
              Read the full RE-NEET 2026 news + study-strategy article
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section
        id="pricing"
        aria-label="Crash course pricing tiers"
        className="bg-slate-50 px-4 py-12 sm:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Pricing tiers</h2>
            <p className="mt-2 text-sm text-slate-600">
              All prices in INR. EMI / instalment plans available. Free demo class is genuinely
              free.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl border-2 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg ${
                  tier.popular ? 'border-blue-600 ring-2 ring-blue-600/20' : 'border-slate-200'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                  {tier.subtitle}
                </p>
                <div className="mt-5">
                  <p className="text-3xl font-bold text-slate-900">
                    ₹{tier.priceINR.toLocaleString('en-IN')}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {tier.durationLabel} programme · 2-instalment EMI available
                  </p>
                </div>
                <p className="mt-4 text-sm text-slate-700">{tier.description}</p>
                <ul className="mt-5 space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors ${
                    tier.popular
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {tier.cta.label}
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-slate-500">
            Prices in INR. EMI / instalments available (2 or 3 instalments). Free demo on WhatsApp.
          </p>
        </div>
      </section>

      {/* What you get — quick grid */}
      <section className="bg-white px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            What you get across all tiers
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: 'AIIMS-trained faculty',
                body: 'Led by Dr. Shekhar C Singh (AIIMS Delhi, founder, 15+ yrs biology pedagogy). All faculty are biology specialists, not generalist test-prep instructors.',
              },
              {
                icon: BookOpen,
                title: 'NCERT-anchored revision',
                body: 'Full Botany + Zoology revision mapped to NCERT chapter-by-chapter. 50+ MCQs per chapter. End-of-day passage review on day topics.',
              },
              {
                icon: Target,
                title: 'Biweekly full mocks',
                body: 'NEET-pattern full-length mocks every 2 weeks during weeks 1–5, every 48 hours during week 6. Error analysis after each mock.',
              },
              {
                icon: Clock,
                title: 'Daily MCQ drilling',
                body: '60–80 questions per day across Botany + Zoology + the weak-topic list. Mixed-pattern (single + assertion-reason + statement-based).',
              },
              {
                icon: Users,
                title: 'Weak-topic retrieval',
                body: 'Weekly retrieval sessions on the 3–5 topics flagged in your week-1 diagnostic. Targeted re-drill rather than re-reading the whole NCERT.',
              },
              {
                icon: Calendar,
                title: 'Exam-date flexibility',
                body: 'If NTA pushes the date further, your course access auto-extends. Programme is anchored to "exam date - 1 week", not a fixed calendar.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <Icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-slate-50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Crash course — frequently asked questions
          </h2>
          <div className="mt-6 space-y-3">
            {productFaqs.map((faq, idx) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-slate-200 bg-white open:bg-slate-100"
                {...(idx < 2 ? { open: true } : {})}
              >
                <summary className="flex cursor-pointer items-start justify-between gap-3 px-5 py-4 text-base font-semibold text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 flex-shrink-0 text-xs text-slate-500 group-open:rotate-180 group-open:text-slate-700"
                  >
                    ▼
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-red-700 to-red-900 px-4 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold sm:text-3xl">Talk to a counsellor — same-day reply</h2>
          <p className="mt-3 text-base leading-relaxed text-red-50">
            Batches are filling on a first-come basis as the news cycle peaks. WhatsApp now to
            confirm your next available demo slot and tier preference. No payment to book the demo.
          </p>
          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <a
              href={WA_BOOK_DEMO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-green-400"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp — Book a free demo
            </a>
            <a
              href={WA_CALL_BACK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-white/20"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Request a call back
            </a>
          </div>
          <p className="mt-4 text-xs text-red-100">
            Phone:{' '}
            <Link href="tel:+918826444334" className="underline">
              +91 88264-44334
            </Link>{' '}
            · WhatsApp same number · IST hours · Hindi or English on request
          </p>
          <p className="mt-4 text-xs text-red-100">
            See also:{' '}
            <Link
              href="/re-neet-2026"
              className="underline decoration-white/60 underline-offset-2 hover:decoration-white"
            >
              RE-NEET 2026 news + study strategy
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
