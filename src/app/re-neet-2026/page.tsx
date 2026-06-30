/**
 * /re-neet-2026
 *
 * RE-NEET 2026 reconduct news article + crash-course lead-magnet hub.
 * Server component for SEO; WhatsApp CTAs use plain anchors so the
 * page stays static.
 *
 * Editorial honesty rules
 *  - The original exam (3 May 2026), the cancellation (12 May 2026) and
 *    the reconduct (Re-NEET held 21 June 2026, admit cards re-issued from
 *    14 June) are CONFIRMED via NTA + multiple major outlets.
 *  - Results are expected July 2026 (not yet declared) — stated as such.
 *  - 22 lakh candidate-count is widely reported; the 22.79 lakh /
 *    551 cities / 5,400 centres specifics are single-sourced and
 *    hedged accordingly.
 *  - Mental-health framing is included because every major outlet
 *    covered it — it would be irresponsible to skip in favour of
 *    pure sales copy.
 *
 * Cannibalization safety
 *  - Primary keyword: "RE-NEET 2026" / "NEET UG 2026 reconduct".
 *    No other page on the site targets this.
 *  - The site-wide announcement banner (`<ReNEETBanner />`) auto-hides
 *    on this exact path so we don't double-stack CTAs.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertTriangle,
  MessageCircle,
  Phone,
  Clock,
  CheckCircle2,
  BookOpen,
  Heart,
} from 'lucide-react'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = `${SITE_URL}/re-neet-2026`
const PUBLISHED = '2026-05-12T18:00:00+05:30' // article published same day as cancellation announcement
const MODIFIED = '2026-06-30T12:00:00+05:30' // updated after the 21 June Re-NEET was held
const WHATSAPP_NUMBER = '918826444334'

const chatLink = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

const WA_CRASH_COURSE = chatLink(
  'Hi! I want to join the RE-NEET 2026 crash course. Please share batch start dates, free demo timings, and faculty details.'
)
const WA_FREE_DEMO = chatLink(
  'Hi! Please book my FREE demo class for the RE-NEET 2026 crash course. My class (11 / 12 / Dropper): '
)
const WA_CALL_BACK = chatLink(
  'Hi! Please give me a call back about the RE-NEET 2026 crash course. Best time to reach me: '
)
const WA_PARENT = chatLink(
  'Hi, I am the parent of a NEET 2026 aspirant. The exam has been cancelled. Please share what the RE-NEET 2026 crash course covers and how my child can join.'
)

export const metadata: Metadata = {
  title: 'RE-NEET 2026 — Cancellation, Reconduct & Crash Course | Cerebrum',
  description:
    'NEET-UG 2026 (3 May 2026) cancelled after paper-leak probe. NTA has confirmed a full reconduct — RE-NEET 2026. Join our crash course. Free demo today.',
  keywords: [
    'RE-NEET 2026',
    'NEET UG 2026 cancelled',
    'NEET 2026 reconduct',
    'NEET 2027 reexam',
    'NEET 2027 paper leak',
    'NEET 2027 CBI probe',
    'RE-NEET 2026 date',
    'NEET 2027 retest',
    'RE-NEET crash course',
    'NEET crash course June 2026',
    'NEET crash course July 2026',
    'NEET reexam preparation',
    'NTA NEET 2026 cancellation',
    'NEET 2027 reschedule',
    'NEET dropper 2026 retest',
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
    title: 'RE-NEET 2026 — Cancellation, Reconduct & Crash Course',
    description:
      'NEET-UG 2026 cancelled after paper-leak probe. NTA has confirmed a full reconduct. Free demo class for the RE-NEET crash course — WhatsApp now.',
    url: CANONICAL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'article',
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: ['Dr. Shekhar C Singh'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RE-NEET 2026 — Cancellation, Reconduct & Crash Course',
    description:
      'NEET-UG 2026 cancelled. RE-NEET reconduct confirmed by NTA. Join our crash course — free demo class.',
  },
}

// ---------- FAQs ----------

const faqs = [
  {
    question: 'Why was NEET-UG 2026 cancelled?',
    answer:
      "NTA cancelled NEET-UG 2026 (held 3 May 2026) on 12 May after Rajasthan Police's Special Operations Group recovered a handwritten 'guess paper' with around 120 questions matching the actual exam — roughly 90 Biology and 30 Chemistry. The Centre has handed the investigation to the CBI. The cancellation has the approval of the Government of India.",
  },
  {
    question: 'When was the RE-NEET 2026 exam held?',
    answer:
      'The Re-NEET 2026 was held on 21 June 2026. NTA re-issued admit cards from 14 June 2026, and results are expected in July 2026. Watch neet.nta.nic.in for the official result notification.',
  },
  {
    question: 'Do I need to re-register for RE-NEET 2026?',
    answer:
      'No. All existing candidatures carried forward — no fresh registration, no additional fee, and existing centre preferences retained. NTA re-issued admit cards from 14 June 2026 for the 21 June 2026 Re-NEET.',
  },
  {
    question: 'How many candidates are affected by the cancellation?',
    answer:
      'Reporting puts the figure at approximately 22 lakh candidates. One outlet, citing an NTA briefing, has given a more specific number (22.79 lakh candidates across 551 Indian cities and 14 cities abroad, at over 5,400 centres) but this granular figure is single-sourced and should be treated as preliminary until NTA publishes its official notice.',
  },
  {
    question: 'Is the RE-NEET syllabus or pattern changing?',
    answer:
      'No outlet has reported any change to the syllabus or exam pattern. NTA has not signalled any deviation. Treat the syllabus and pattern as unchanged — keep studying the same NCERT-anchored material — until official notification says otherwise.',
  },
  {
    question: 'How long should I plan my RE-NEET 2026 study window?',
    answer:
      "If the late-June / early-July expectation holds, students have roughly a 6–8 week window from the 12 May cancellation. That is enough time for a focused crash-course schedule, but not enough to start the syllabus from scratch. Cerebrum's RE-NEET 2026 crash course is built specifically around this window: full Biology revision in 5 weeks plus 1–2 weeks of full-length mocks and high-yield drilling.",
  },
  {
    question: 'I am a dropper. Should I still continue or take a year off?',
    answer:
      'Continue. The cancellation is not a verdict on your preparation — it is an administrative reset. The same 6–8 week window applies to droppers and to first-attempt candidates. Most droppers who have already completed one NEET cycle have a structural advantage: the syllabus is already covered, so the crash window can focus on weak-topic retrieval and mock-test conditioning rather than first-pass content.',
  },
  {
    question: 'How will counselling be affected?',
    answer:
      "MCC's pre-cancellation tentative Round 1 was reported around 21–30 July 2026. A late-June / early-July re-exam will almost certainly push counselling back. No official MCC notification has been issued yet. State-quota DME schedules will likely follow the MCC shift. We will update this article as official notices are released.",
  },
  {
    question: 'My child is anxious / mentally overwhelmed. What should we do as parents?',
    answer:
      'Psychiatrists quoted in major newspapers (GMC Thiruvananthapuram, leading private healthcare, Delhi clinicians) warn that anticipatory anxiety, sleep disruption and post-stress crash are common after exam cancellations. Protect 6+ hours of sleep, limit doomscrolling, get daily sunlight and exercise, avoid panic study-plan rewrites in week one. Free confidential helplines: Tele-MANAS 14416 (Govt of India, 24×7, NTA-recommended), iCall 9152987821 (Mon–Sat, 8 AM–10 PM), Vandrevala Foundation 1860-2662-345 (24×7).',
  },
  {
    question: 'What does the Cerebrum RE-NEET 2026 crash course cover?',
    answer:
      'A focused 6–8 week programme led by AIIMS-trained faculty (Dr. Shekhar C Singh and senior team). Week-by-week: full Biology revision mapped to NCERT (Botany + Zoology); daily passage and MCQ practice drills; biweekly full-length NEET-pattern mocks with error analysis; weak-topic retrieval sessions; and weekly 1:1 mentor reviews. Sessions in English or Hindi, online live with recorded access. Free demo class on request — WhatsApp to book.',
  },
  {
    question: 'How do I join the crash course?',
    answer:
      'WhatsApp +91 88264-44334 — we respond same-day with the next demo class slot and crash-course start date. The free demo is genuinely free and there is no obligation to enrol; most students enrol after one demo. EMI / instalment plans are available, batches are filling on a first-come basis as the news cycle peaks, and our team can route you to an English or Hindi mentor depending on preference.',
  },
]

// ---------- JSON-LD ----------

const newsArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  '@id': `${CANONICAL}#article`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  headline: 'RE-NEET 2026 — NEET-UG 2026 Cancelled After Paper-Leak Probe, NTA Confirms Reconduct',
  description:
    'NTA cancelled the NEET-UG 2026 examination held on 3 May 2026 after Rajasthan SOG recovered a leaked question set. CBI probe ordered. The reconduct (Re-NEET 2026) was held on 21 June 2026; results are expected in July 2026.',
  url: CANONICAL,
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  inLanguage: 'en-IN',
  isAccessibleForFree: true,
  author: {
    '@type': 'Person',
    '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh#nseb',
    name: 'Dr. Shekhar C Singh',
    url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh',
    jobTitle: 'Founder & Lead NEET Biology Faculty, Cerebrum Biology Academy',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'All India Institute of Medical Sciences (AIIMS Delhi)',
    },
  },
  publisher: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
    },
  },
  about: [
    { '@type': 'Thing', name: 'NEET-UG 2026' },
    { '@type': 'Thing', name: 'RE-NEET 2026' },
    { '@type': 'Thing', name: 'National Testing Agency (NTA)' },
    { '@type': 'Thing', name: 'Medical entrance examination India' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
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
    { '@type': 'ListItem', position: 2, name: 'NEET 2027 Updates', item: `${SITE_URL}/blog` },
    { '@type': 'ListItem', position: 3, name: 'RE-NEET 2026', item: CANONICAL },
  ],
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': `${CANONICAL}#crash-course`,
  name: 'RE-NEET 2026 Biology Crash Course',
  description:
    '6–8 week Biology crash course built specifically for the NEET-UG 2026 reconduct. Full revision + daily drills + biweekly full-length mocks + weekly 1:1 mentor reviews. Led by AIIMS-trained faculty.',
  url: CANONICAL,
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: SITE_URL,
  },
  inLanguage: 'en-IN',
  availableLanguage: ['English', 'Hindi'],
  educationalLevel: 'High School / Dropper',
  educationalCredentialAwarded: 'NEET-UG 2026 (RE-NEET) preparation',
  courseMode: 'Online',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    location: {
      '@type': 'VirtualLocation',
      url: CANONICAL,
    },
  },
}

// HowTo schema — the 5-step study strategy for the 6-8 week window.
// Voice assistants and Perplexity extract HowTo specifically for
// "how to prepare for RE-NEET" / "how to study for RE-NEET 2026"
// type queries. Each step name + text mirrors the article body.
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${CANONICAL}#how-to-prep`,
  name: 'How to prepare for RE-NEET 2026 in 6-8 weeks',
  description:
    'A 5-step study strategy for the 6-8 week RE-NEET 2026 window. Built around a diagnostic mock, focused Botany then Zoology revision, biweekly full-length practice, and a final speed-pass.',
  totalTime: 'P8W',
  inLanguage: 'en-IN',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Week 1 — Diagnostic mock',
      text: 'Take a full-length mock under exam conditions. Identify the 3-5 weakest topics. Resist the urge to re-read everything; the data from this mock drives the next 5 weeks.',
      url: `${CANONICAL}#study-strategy`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Weeks 2-3 — Botany revision',
      text: 'NCERT chapter-by-chapter with annotated highlights and 50+ MCQs per chapter. End-of-day passage review on the day topics. Cross-link to your weak-topic list from week 1.',
      url: `${CANONICAL}#study-strategy`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Weeks 4-5 — Zoology revision',
      text: 'Same chapter-by-chapter pattern as Botany. Add the high-yield cross-system retrieval drills: endocrine + nervous, respiration + circulation, digestion + excretion.',
      url: `${CANONICAL}#study-strategy`,
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Week 6 — Full-length mocks',
      text: 'Full-length NEET-pattern mocks every 48 hours. Error-analysis after each. Targeted re-drill of weak topics. Stop adding new content; consolidate.',
      url: `${CANONICAL}#study-strategy`,
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Weeks 7-8 — Speed-pass + finals',
      text: 'Speed-pass through the entire syllabus. Final mocks. Sleep, exercise, no all-nighters — exam form is now physical, not academic. Mental rehearsal of exam-day routine.',
      url: `${CANONICAL}#study-strategy`,
    },
  ],
}

// Speakable schema — explicit cssSelector for LLM voice extraction
// (ChatGPT voice, Google Assistant, Perplexity audio). The HTML uses
// data-speakable="title|summary|key-info" attributes; this schema
// tells AEO systems which DOM nodes to read aloud.
const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${CANONICAL}#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: [
      '[data-speakable="title"]',
      '[data-speakable="summary"]',
      '[data-speakable="key-info"]',
    ],
  },
}

// ---------- Page ----------

export default function ReNEET2026Page() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-700 via-rose-700 to-red-800 px-4 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-300/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-100 ring-1 ring-yellow-200/40">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            Breaking · Updated 12 May 2026
          </div>
          <h1 data-speakable="title" className="text-3xl font-bold leading-tight sm:text-5xl">
            RE-NEET 2026 — NEET-UG 2026 Cancelled, NTA Confirms a Full Reconduct
          </h1>
          <p
            data-speakable="summary"
            className="mt-5 text-base leading-relaxed text-red-50 sm:text-lg"
          >
            The National Testing Agency cancelled the NEET-UG 2026 exam (held 3 May 2026) on 12 May
            after Rajasthan Police's Special Operations Group recovered a leaked &ldquo;guess
            paper&rdquo; with around 120 matching questions (≈90 Biology + 30 Chemistry). The Centre
            ordered a CBI probe. The reconduct — Re-NEET 2026 — was held on 21 June 2026 (admit cards
            re-issued from 14 June); results are expected in July 2026. ~22 lakh candidates were
            affected.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <a
              href={WA_FREE_DEMO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-green-400"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp · Book a free demo
            </a>
            <a
              href={WA_CALL_BACK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/15 px-5 py-3 text-base font-semibold text-white ring-1 ring-white/40 backdrop-blur transition-colors hover:bg-white/25"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Request a call back
            </a>
          </div>
          <p className="mt-3 text-xs text-red-100">
            Free demo class is genuinely free · No obligation to enrol · WhatsApp same-day response
          </p>
        </div>
      </section>

      {/* Crash course quick-card */}
      <section
        id="crash-course"
        aria-label="RE-NEET 2026 crash course"
        className="bg-yellow-50 px-4 py-10 sm:py-12"
      >
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border-2 border-yellow-300 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-900">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              6–8 week window · Batches starting this week
            </div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              RE-NEET 2026 Biology Crash Course
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Built specifically for the RE-NEET window. Full Biology revision in 5 weeks (Botany +
              Zoology, NCERT-anchored) plus 1–2 weeks of biweekly NEET-pattern mocks, daily MCQ
              drills, weak-topic retrieval, and weekly 1:1 mentor reviews. Live online in English or
              Hindi · recorded access for revision · led by AIIMS-trained faculty including founder
              Dr. Shekhar C Singh.
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              {[
                'Full Botany + Zoology revision mapped to NCERT',
                'Biweekly full-length NEET-pattern mocks',
                'Daily MCQ + passage drilling',
                'Weak-topic retrieval sessions',
                'Weekly 1:1 mentor review',
                'WhatsApp doubt support, all IST hours',
                'Recorded sessions for revision',
                'Sessions in English or Hindi',
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600"
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={WA_CRASH_COURSE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-green-700"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                WhatsApp — Enrol now
              </a>
              <a
                href={WA_CALL_BACK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-50"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Request a call back
              </a>
            </div>
            <p className="mt-4 text-center text-xs text-slate-600">
              Looking for pricing tiers + batch details?{' '}
              <Link
                href="/re-neet-crash-course"
                className="font-semibold text-red-700 underline underline-offset-2 hover:text-red-800"
              >
                See the crash-course pricing page →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* What happened */}
      <article className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            What happened on 12 May 2026
          </h2>
          <div
            data-speakable="key-info"
            className="prose prose-slate mt-5 max-w-none text-slate-700"
          >
            <p>
              The National Testing Agency (NTA) cancelled the NEET-UG 2026 examination — held on 3
              May 2026 — on 12 May 2026, &ldquo;with the approval of the Government of India.&rdquo;
              The reason cited was &ldquo;inputs from central and law-enforcement agencies
              indicating serious irregularities.&rdquo;
            </p>
            <p>
              The trigger was an investigation by Rajasthan Police&rsquo;s Special Operations Group
              (SOG). The SOG recovered a handwritten document described in news reporting as a
              &ldquo;guess paper&rdquo; — and around 120 of its questions (approximately 90 Biology
              and 30 Chemistry) matched the questions that actually appeared on the 3 May exam. The
              Centre has handed the investigation to the Central Bureau of Investigation (CBI).
            </p>
            <p>
              Arrests followed quickly. Rajasthan SOG arrested an alleged mastermind, Manish Yadav,
              in Jaipur; reports indicate at least nine arrests across five or more states, with as
              many as 45 individuals reportedly detained for questioning. Republic World&rsquo;s
              investigative coverage describes a distribution network running through Nashik,
              Haryana, Rajasthan, Telangana, Andhra Pradesh and Jammu &amp; Kashmir, with WhatsApp
              and Telegram groups used to circulate the material — though some of these specifics
              are single-source and remain to be officially corroborated by CBI or SOG.
            </p>
            <p>
              Approximately <strong>22 lakh candidates</strong> were affected. NTA conducted a full
              re-test (Re-NEET 2026) on <strong>21 June 2026</strong> with no fresh registration and
              no additional fee, retaining existing centre preferences. Results are expected in July
              2026.
            </p>
          </div>

          <h2 className="mt-10 text-2xl font-bold text-slate-900 sm:text-3xl">
            RE-NEET 2026 — what we know, what we don&rsquo;t
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-green-900">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Confirmed by NTA
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-800">
                <li>Full re-conduct of the exam for all registered candidates.</li>
                <li>No fresh registration required.</li>
                <li>No additional fee — original fee will be refunded.</li>
                <li>Existing centre preferences carried forward.</li>
                <li>Admit cards re-issued from 14 June 2026; Re-NEET held 21 June 2026.</li>
                <li>CBI investigation is underway.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-amber-900">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Awaited / what&rsquo;s next
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-800">
                <li>
                  <strong>Results.</strong> Re-NEET 2026 results are expected in July 2026 — watch
                  neet.nta.nic.in.
                </li>
                <li>
                  <strong>MCC counselling.</strong> The June re-exam pushes the counselling calendar;
                  dates to be notified.
                </li>
                <li>
                  <strong>Refund SOP.</strong> Original-fee refund process not yet published.
                </li>
                <li>
                  <strong>Syllabus / pattern.</strong> No change was signalled — treat as unchanged
                  unless NTA notifies otherwise.
                </li>
              </ul>
            </div>
          </div>

          {/* Study strategy */}
          <h2
            id="study-strategy"
            className="mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            How to plan the 6–8 week window
          </h2>
          <div className="prose prose-slate mt-5 max-w-none text-slate-700">
            <p>
              If the late-June / early-July expectation holds, students have a roughly 6–8 week
              study window. That is genuinely tight, but it is enough time for a focused crash
              schedule — provided you don&rsquo;t restart the syllabus from scratch.
            </p>
            <ol className="ml-1">
              <li>
                <strong>Week 1.</strong> Diagnostic full-length mock (under exam conditions).
                Identify the 3–5 weakest topics. Resist the urge to re-read everything.
              </li>
              <li>
                <strong>Weeks 2–3.</strong> Botany revision. NCERT chapter-by-chapter, with
                annotated highlights and 50+ MCQs per chapter. End-of-day passage review.
              </li>
              <li>
                <strong>Weeks 4–5.</strong> Zoology revision. Same pattern. Add the high-yield
                cross-system retrieval drills (e.g., endocrine + nervous, respiration +
                circulation).
              </li>
              <li>
                <strong>Week 6.</strong> Full-length mocks every 48 hours. Error-analysis after
                each. Targeted re-drill of weak topics.
              </li>
              <li>
                <strong>Week 7–8 (if available).</strong> Speed-pass through the entire syllabus.
                Final mocks. Sleep, exercise, no all-nighters — exam form is now physical, not
                academic.
              </li>
            </ol>
          </div>

          {/* Mental health box */}
          <div className="mt-10 rounded-xl border-2 border-rose-200 bg-rose-50 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-rose-900">
              <Heart className="h-5 w-5" aria-hidden="true" />A note on mental health — for students
              and parents
            </h3>
            <div className="prose prose-slate mt-3 max-w-none text-sm leading-relaxed text-slate-700">
              <p>
                Every major newspaper covering this cancellation has quoted psychiatrists warning
                about anticipatory anxiety, sleep disruption and post-stress crash. Clinicians at
                Government Medical College Thiruvananthapuram, leading private healthcare and
                Delhi-based hospitals have given the same practical guidance: protect 6+ hours of
                sleep, limit doomscrolling, get daily sunlight and exercise, and do not rewrite your
                study plan in panic mode in the first week.
              </p>
              <p>
                Parents — please resist piling on additional pressure. This cancellation is not a
                verdict on your child. It is an administrative reset that affects all 22 lakh
                candidates equally.
              </p>
              <p>
                If symptoms are severe, please seek professional support. Three free, confidential
                helplines:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Tele-MANAS</strong> at{' '}
                  <a href="tel:14416" className="underline">
                    14416
                  </a>{' '}
                  — Government of India, 24×7, multi-lingual. This is the NTA-recommended mental
                  health helpline (per the official 2026 NTA advisory).
                </li>
                <li>
                  <strong>iCall</strong> at{' '}
                  <a href="tel:+919152987821" className="underline">
                    9152987821
                  </a>{' '}
                  (Mon–Sat, 8 AM–10 PM).
                </li>
                <li>
                  <strong>Vandrevala Foundation</strong> at{' '}
                  <a href="tel:+918602662345" className="underline">
                    1860-2662-345
                  </a>{' '}
                  (24×7).
                </li>
              </ul>
            </div>
          </div>

          {/* FAQs */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-slate-200 bg-white open:bg-slate-50"
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

          {/* Bottom CTA — parents-focused */}
          <div className="mt-12 rounded-2xl bg-slate-900 p-8 text-white">
            <h2 className="text-2xl font-bold">Talk to us — same-day WhatsApp response</h2>
            <p className="mt-3 text-slate-200">
              With the Re-NEET done and results due in July, the next decision is whether to plan a
              NEET 2027 drop year. Don&rsquo;t wait for results day to start — a biology-focused
              dropper plan built around your weak chapters compounds every week. Batches are filling
              fast.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={WA_PARENT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-green-400"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Parents — WhatsApp us
              </a>
              <a
                href={WA_FREE_DEMO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-white/20"
              >
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                Book a free demo class
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Phone:{' '}
              <Link href="tel:+918826444334" className="underline">
                +91 88264-44334
              </Link>{' '}
              · WhatsApp same number · IST hours · Hindi or English on request
            </p>
          </div>

          {/* Sources */}
          <details className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <summary className="cursor-pointer text-sm font-semibold text-slate-900">
              Sources for the news section
            </summary>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-slate-600">
              <li>
                NTA cancellation announcement covered by Deccan Herald, The Tribune, DD News, India
                TV News, The Print, Onmanorama, Republic World, The Statesman, Free Press Journal,
                Asianet Newsable, ANI, Gulf News, Outlook India, Newslaundry, The News Minute,
                Careers360, Shiksha and Testbook on 12 May 2026.
              </li>
              <li>
                NTA Director General Abhishek Singh quote on retest + 7–10 day timeline: The Print
                and Asianet Newsable, 12 May 2026.
              </li>
              <li>
                Paper-leak distribution-network details: Republic World investigative coverage, 12
                May 2026 (single-source — pending official corroboration).
              </li>
              <li>
                Mental-health guidance: The Week, 12 May 2026 (citing GMC Thiruvananthapuram,
                leading private healthcare and Delhi-based psychiatrists).
              </li>
              <li>
                Official notifications will appear at{' '}
                <a
                  href="https://neet.nta.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  neet.nta.nic.in
                </a>
                . The Re-NEET 2026 was subsequently held on 21 June 2026; results are expected in
                July 2026.
              </li>
            </ul>
          </details>
        </div>
      </article>
    </main>
  )
}
