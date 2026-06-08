/**
 * /best-biology-classes-india
 *
 * "Classes" intent variant of the head-term cornerstone. Searchers
 * looking for structured cohort instruction (vs 1:1 tutor or
 * institutional coaching). Differentiated by leading with batch
 * schedule + curriculum structure rather than mentor or institution.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  Home,
  MessageCircle,
  Phone,
  Users,
  Video,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/best-biology-classes-india'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title:
    'Best Biology Classes in India — Live Online + Offline · NEET · IB · AP · Olympiads',
  description:
    'India\'s best biology classes — Cerebrum Biology Academy by Dr. Shekhar C Singh (AIIMS New Delhi alumnus). Live online classes in your time zone + 4 offline centres in Delhi NCR. NEET, IB, AP, MCAT, Biology Olympiads. Small-batch, weekly tests, English medium. Free trial class.',
  keywords: [
    'best biology classes',
    'best biology classes india',
    'biology classes india',
    'biology classes online',
    'biology classes for NEET',
    'biology classes for IB',
    'biology classes for AP',
    'biology classes for olympiad',
    'biology classes english medium',
    'biology classes for class 11',
    'biology classes for class 12',
    'biology classes for dropper',
    'biology classes near me',
    'live biology classes online',
    'live online biology classes',
    'biology classes for NRI students',
    'best biology classes for english medium NEET',
    'biology classes for IGCSE',
    'biology classes for A Level',
    'biology classes for international students',
    'aiims faculty biology classes',
    'dr shekhar singh biology classes',
    'best biology classes online india',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-IN': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Best Biology Classes in India · Live Online + Offline · Cerebrum',
    description:
      'India\'s best biology classes by Dr. Shekhar C Singh (AIIMS alumnus). Live online globally + 4 NCR offline centres. NEET, IB, AP, Olympiads.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best Biology Classes in India · NEET · IB · AP · Olympiads',
    description:
      "India's best biology classes — Cerebrum by Dr. Shekhar C Singh (AIIMS Delhi). Live online + 4 offline Delhi NCR centres. NEET, IB, AP, MCAT, Olympiads.",
  },
  robots: 'index, follow, max-image-preview:large',
}

const SCHEDULES = [
  {
    programme: 'Class 11 NEET / CBSE / ICSE Biology',
    classes: 'Mon / Wed / Fri 5:30 PM - 8 PM IST',
    extras: 'Sunday weekly chapter test 9-10:30 AM IST',
    duration: 'June - April (full academic year)',
  },
  {
    programme: 'Class 12 NEET / CBSE / ICSE Biology',
    classes: 'Tue / Thu / Sat 5:30 PM - 8 PM IST',
    extras: 'Sunday full mock 8-11 AM IST',
    duration: 'April - April (NEET-pattern targeted)',
  },
  {
    programme: 'NEET Dropper Biology',
    classes: 'Mon-Sat 9 AM - 12 PM IST (intensive)',
    extras: 'Daily 5 PM doubt clearing slot + weekly mocks',
    duration: 'July - April (10-month intensive)',
  },
  {
    programme: 'IB Biology HL / SL',
    classes: 'Tue / Thu / Sat 6 PM - 8:30 PM IST',
    extras: 'IA + EE supervision slots monthly',
    duration: 'DP1 + DP2 (2-year arc)',
  },
  {
    programme: 'AP Biology (US time-zone)',
    classes: 'Sat / Sun 8 AM - 10:30 AM US Eastern',
    extras: 'FRQ rubric drill + Anki deck reviews',
    duration: 'September - May (AP Exam-aligned)',
  },
  {
    programme: 'Biology Olympiad Track',
    classes: 'Sun 9 AM - 12 PM IST + Wed 7 PM - 9 PM IST',
    extras: 'INBO / USABO / IBO past-paper drills',
    duration: 'Year-round (varies by olympiad)',
  },
]

const FAQS = [
  {
    question: 'What\'s the difference between Cerebrum\'s classes and Allen / Aakash / PW classes?',
    answer:
      'Three structural differences. (1) Specialisation: Cerebrum is biology-only; Allen/Aakash/PW are full-PCM. Our faculty don\'t split focus across three subjects. (2) Batch size: 10-40 students depending on tier vs 150-200 at mass-coaching. (3) Per-MCQ review: every wrong answer on weekly tests is discussed in the next live class — impossible at lecture-hall scale. The trade-off: we don\'t teach physics or chemistry. Most students pair Cerebrum biology with their existing Allen/Aakash for PCM.',
  },
  {
    question: 'When are biology classes scheduled?',
    answer:
      'Schedule varies by programme. Class 11 weekday evenings (Mon/Wed/Fri 5:30-8 PM IST). Class 12 alternating (Tue/Thu/Sat 5:30-8 PM IST). Dropper intensive (Mon-Sat morning 9 AM-12 PM IST). IB Biology HL/SL evening (Tue/Thu/Sat 6-8:30 PM IST). AP Biology in US-friendly time zone (Sat/Sun 8-10:30 AM US Eastern). Olympiad track (Sun + Wed). See full schedule below; we adjust for time zones at enrolment.',
  },
  {
    question: 'Are classes live or pre-recorded?',
    answer:
      'Live. Live is the entire point — real-time Q&A, weekly progress check, per-student review of wrong test answers, mentor accountability. Recordings are available for any session you miss, but the value is in attending live. We\'re not a video-course library.',
  },
  {
    question: 'How big are the batches?',
    answer:
      'Three tiers. Pursuit: 30-40 students (most affordable structured tier). Ascent: 16-25 students (most popular value tier). Pinnacle ZA: 10-12 students (direct Dr. Shekhar 1:1 mentor calls). Specific tier matrix shared on WhatsApp.',
  },
  {
    question: 'Are biology classes online only, or offline available too?',
    answer:
      'Both. Online live classes via Zoom from anywhere in the world (active student cohorts in 30+ countries). Plus 4 offline centres in Delhi NCR: South Extension (Delhi), Rohini (Delhi), Gurugram, Faridabad. Online and offline students share the same faculty and curriculum.',
  },
  {
    question: 'My child is in international curriculum (IB / AP / IGCSE). Do biology classes cover those?',
    answer:
      'Yes. We have dedicated programme tracks for IB Biology HL/SL (2025 syllabus, Theme A/B/C/D coverage + IA + EE supervision), AP Biology (College Board score-5 calibration), IGCSE Biology (Cambridge syllabus), and A-Level Biology. Each programme has its own batch schedule + dedicated curriculum.',
  },
  {
    question:
      'Classes are in English medium, right?',
    answer:
      'Yes — every class is in English medium of instruction. Study material in English. Tests in English. Doubt sessions in English (with Hindi or regional-language clarification allowed when a terminology word is the blocker). NEET, IB, AP, MCAT, USMLE, and all biology olympiads are conducted in English, so our medium of instruction matches.',
  },
  {
    question: 'How do I attend a trial class?',
    answer:
      'Free 60-minute live trial class with Dr. Shekhar. WhatsApp us with your child\'s class + programme + city/country and we send the Zoom link with the next available slot in your time zone.',
  },
]

export default function BestBiologyClassesIndiaPage() {
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      "Hi — interested in Cerebrum biology classes. My child is in Class [9/10/11/12/dropper], targeting [NEET / IB / AP / MCAT / Olympiad / CBSE]. Based in [city, country]. Please share batch schedule + how to attend a trial class."
    )

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Best Biology Classes in India — Live Online + Offline',
    description:
      'India\'s best biology classes by Cerebrum Biology Academy. Live online + offline NEET, IB, AP, MCAT, Olympiad classes. Small-batch, weekly tests, English medium.',
    url: PAGE_URL,
    inLanguage: 'en-IN',
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
          'Best Biology Classes India',
          'Live Online Biology Classes',
          'Biology Classes for NEET',
          'Biology Classes for IB',
          'Biology Classes for AP',
          'Biology Classes for Olympiad',
          'Biology Classes English Medium',
        ]}
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
            <li className="text-slate-700">Best Biology Classes India</li>
          </ol>
        </nav>

        <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-900">
            <Video className="h-3.5 w-3.5" />
            Live online globally + 4 NCR offline centres
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900 max-w-4xl">
            Best biology classes in India —{' '}
            <span className="text-indigo-700">live online or in-person.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-4xl">
            Cerebrum Biology Academy runs live biology classes &mdash; not
            recorded video courses. Real-time Q&amp;A with AIIMS-trained
            faculty, weekly tests with per-student review, English medium of
            instruction throughout. Live online classes serve 30+ countries
            in time-zone-matched batches; four offline centres in Delhi NCR
            (South Extension, Rohini, Gurugram, Faridabad) for in-person
            students. NEET, IB Biology HL/SL, AP Biology, MCAT, USMLE Step
            1, Biology Olympiads, and CBSE/ICSE Class 11-12.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp for batch schedule
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

        {/* Schedule table */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Live class schedule — by programme
            </h2>
            <p className="mt-3 text-slate-600">
              Times adjust for time zones at enrolment. Listed in IST below;
              gulf / US / UK / Singapore / Australia students get matched
              schedules.
            </p>

            <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-700">Programme</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Live classes</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Tests / Extras</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SCHEDULES.map((s) => (
                    <tr key={s.programme} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{s.programme}</td>
                      <td className="px-4 py-3 text-slate-700">{s.classes}</td>
                      <td className="px-4 py-3 text-slate-700">{s.extras}</td>
                      <td className="px-4 py-3 text-slate-500">{s.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What\'s included */}
        <section className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            What every class includes
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { icon: <Video className="h-5 w-5 text-indigo-600" />, title: 'Live two-way classes', text: 'Real-time Zoom with Q&A. Recordings available if you miss.' },
              { icon: <Users className="h-5 w-5 text-indigo-600" />, title: 'Small-batch model', text: 'Max 40 students per batch (Pursuit tier); 10-12 in Pinnacle ZA.' },
              { icon: <BookOpen className="h-5 w-5 text-indigo-600" />, title: 'Material shipped globally', text: 'NCERT-line-by-line guide + 12,000 MCQ bank shipped to 30+ countries.' },
              { icon: <CalendarDays className="h-5 w-5 text-indigo-600" />, title: 'Weekly chapter tests', text: 'Per-MCQ review of wrong answers in next live class.' },
              { icon: <Globe className="h-5 w-5 text-indigo-600" />, title: 'Time-zone-matched batches', text: 'IST + Gulf + US + UK + Singapore + Australia time-zone options.' },
              { icon: <Clock className="h-5 w-5 text-indigo-600" />, title: 'Mentor accountability', text: 'Weekly 1:1 (Pinnacle) or bi-weekly mentor call (Ascent).' },
            ].map((b) => (
              <div key={b.title} className="rounded-xl border border-slate-200 p-5">
                {b.icon}
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{b.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Best biology classes — common questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200">
              {FAQS.map((f, idx) => (
                <details key={idx} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    <span>{f.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Award className="h-10 w-10 text-amber-300 mx-auto" />
            <h2 className="mt-4 text-2xl md:text-3xl font-bold">
              Attend a free trial class with Dr. Shekhar
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              60-minute live class. Bring your child\&rsquo;s last biology
              exam. Slot in your time zone. No commitment.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
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
