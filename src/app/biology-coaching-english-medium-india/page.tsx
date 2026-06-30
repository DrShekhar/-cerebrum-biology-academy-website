/**
 * /biology-coaching-english-medium-india
 *
 * "English medium of instruction" keyword cluster. Targets:
 *   - "biology coaching english medium"
 *   - "english medium biology coaching"
 *   - "biology coaching for NRI"
 *   - "biology coaching english medium of instruction"
 *   - "best biology coaching english medium india"
 *
 * Audience: NRI families (UAE, USA, UK, Saudi etc) where the child grew
 * up in English-medium schools and needs biology coaching in English;
 * regional-medium school students switching to English NEET coaching;
 * international curriculum students (IB, AP, IGCSE) needing English-only
 * biology depth.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Globe,
  Home,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/biology-coaching-english-medium-india'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title:
    'Biology Coaching in English Medium of Instruction — NEET · IB · AP · Olympiads · Cerebrum',
  description:
    "India's biology-specialist coaching delivered entirely in English medium of instruction. NCERT NEET, IB Biology HL/SL, AP Biology, MCAT, USABO/IBO olympiads. Designed for NRI families, international-curriculum students, and English-medium school students worldwide. AIIMS-trained faculty.",
  keywords: [
    'biology coaching english medium',
    'english medium biology coaching',
    'biology coaching english medium of instruction',
    'best biology coaching english medium india',
    'biology coaching for NRI students',
    'NEET biology coaching english medium',
    'biology coaching for international students',
    'english medium NEET biology',
    'biology coaching for IB students',
    'biology coaching for AP students',
    'biology coaching for IGCSE students',
    'biology coaching for CBSE students',
    'biology coaching for ICSE students',
    'biology coaching for NRI USA',
    'biology coaching for NRI UAE',
    'biology coaching for NRI UK',
    'biology coaching for NRI Saudi',
    'biology coaching for NRI Canada',
    'biology coaching for NRI Singapore',
    'biology coaching for NRI Australia',
    'biology coaching for global Indian students',
    'biology classes english medium',
    'biology tutor english medium india',
    'best biology coaching for english medium NEET',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      'en-IN': PAGE_URL,
      'en-US': PAGE_URL,
      'en-GB': PAGE_URL,
      'en-AE': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'Biology Coaching in English Medium · Cerebrum',
    description:
      'Biology-specialist coaching in English medium of instruction. NEET, IB, AP, Olympiads. For NRI, international-school, and English-medium school students.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology Coaching in English Medium · Cerebrum',
    description:
      'English-medium biology coaching for NRI families + regional-medium-to-English switchers + IB/AP/IGCSE students. NCERT-deep biology, AIIMS faculty.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const AUDIENCES = [
  {
    title: 'NRI families (UAE / USA / UK / Canada / Saudi / Singapore / Australia)',
    description:
      'Children growing up in English-medium schools abroad — Indian School Dubai, GEMS Modern Academy, ASB Mumbai, ASD Dubai, UWCSEA Singapore, Stamford American — preparing for NEET / IB / AP / MCAT. All coaching, all study material, all assessments in English. Time-zone-matched live batches.',
    examples:
      'NEET aspirants in Gulf · IB DP students globally · AP Biology students in US · MCAT premed students',
  },
  {
    title: 'Regional-medium school students switching to NEET',
    description:
      'Students from Hindi-medium / Marathi-medium / Tamil-medium / Bengali-medium / Telugu-medium / Kannada-medium / Malayalam-medium / Gujarati-medium / Punjabi-medium / Assamese-medium schools who need to switch to English for NEET. We run an explicit 4-week NCERT terminology bridge in week 1-4 of every batch to make this transition smooth.',
    examples:
      'State-board students preparing for NEET-UG · Switch from regional medium for Class 11 / 12 / dropper',
  },
  {
    title: 'International curriculum students (IB / AP / IGCSE)',
    description:
      "IB DP1/DP2, AP Biology, IGCSE / A-Level Biology students in international schools globally. The international curricula are taught in English; our biology programme directly supports each curriculum's specific syllabus + assessment style.",
    examples:
      'IB Biology HL students · AP Biology students preparing for May exam · IGCSE / A-Level students',
  },
  {
    title: 'English-medium CBSE / ICSE / State-board students',
    description:
      'Students already in English-medium schools who want biology depth that their school + mass-coaching cannot provide. The Cerebrum specialist programme runs as an add-on layer to school + any existing PCM coaching.',
    examples:
      "CBSE / ICSE Class 11-12 students at DPS, La Martiniere, St. Xavier's, Pathways, etc.",
  },
]

const FAQS = [
  {
    question: 'Why does English medium of instruction matter for biology coaching?',
    answer:
      'Three reasons. (1) NEET-UG is conducted in 13 languages but biology terminology in the question paper is uniformly English (Latin-derived scientific terms — mitochondria, photosynthesis, gametophyte, etc.). Students who study biology in regional medium often struggle with English-medium question framing under exam pressure. (2) International olympiads (IBO, USABO, BBO, CBO, SBO) are conducted in English. (3) International curricula (IB, AP, IGCSE) are taught in English. If your child is in any of these tracks, biology coaching must be in English medium.',
  },
  {
    question: 'Does Cerebrum teach in Hindi, Tamil, Telugu, or any regional language?',
    answer:
      "No. All Cerebrum biology coaching is in English medium — this is by design, not by accident. NEET, NEET-PG, MCAT, USMLE, IB, AP, all biology olympiads use English as the medium of instruction. We standardise on English so students develop the exact terminology fluency they need for the exam they're targeting. For students from regional-medium schools, our first 4 weeks bridge from state-board / regional-medium framing to NCERT English terminology systematically.",
  },
  {
    question:
      'My child studied biology in Hindi-medium until Class 10. Can they switch to Cerebrum?',
    answer:
      'Yes — this is exactly the case our 4-week bridge module is built for. Week 1-4 of every Class 11 batch (or dropper batch) explicitly covers NCERT English terminology with Hindi-language reference where it helps comprehension. By week 5 students are operating fully in English. We have current students who switched from Hindi-medium in Patna, Lucknow, Kanpur, Indore, Bhopal, and they scored 320+/360 biology on NEET 2024-2025.',
  },
  {
    question: 'Is the study material also in English?',
    answer:
      'Yes — entirely. NCERT-line-by-line biology guide in English, 12,000+ MCQ bank in English (matching NEET question style), chapter test booklets in English, weekly mock exams in English. Recordings of live classes are English. Doubt sessions are conducted in English (with clarification in Hindi / regional language allowed when terminology is the blocker).',
  },
  {
    question: 'I am in the UAE / USA / Canada / UK. Can my child join?',
    answer:
      'Yes — Cerebrum runs live online programmes serving 30+ countries with English-medium delivery globally. Time-zone-matched batches available for Gulf, India, Southeast Asia, UK, US East/West, Canada, and Australia. Printed study material shipped internationally.',
  },
  {
    question:
      'My child is in IB Biology HL or AP Biology. Does the English medium of instruction angle still matter?',
    answer:
      "It matters for the right reason — IB and AP are already English. The question is whether your biology coaching keeps the English at the depth IB/AP requires. Mass NEET coaching (Allen, Aakash, PW) teach biology in English-medium, but at NCERT-NEET depth, which doesn't reach IB HL command-term depth or AP rubric-pattern depth. Cerebrum's IB and AP tracks teach in English at the curriculum-specific depth those exams demand.",
  },
  {
    question: 'How do I start?',
    answer:
      "Free 60-minute trial class with Dr. Shekhar (or appropriate senior faculty for non-NEET programmes). Bring your child's last biology exam in whatever language they're currently studying — we work through it live and show you the English-medium transition path.",
  },
]

export default function BiologyCoachingEnglishMediumPage() {
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      "Hi — I'm interested in English-medium biology coaching for my child. Currently in [Class X, Hindi/Tamil/Telugu/English medium], based in [city, country]. Targeting [NEET / IB / AP / MCAT / Olympiad]. Please share programme details."
    )

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Biology Coaching in English Medium of Instruction',
    description:
      "India's biology-specialist coaching delivered entirely in English medium. NEET, IB, AP, MCAT, Olympiads. For NRI, international-school, and English-medium students globally.",
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'Class 9-12 + dropper / international curriculum',
    provider: { '@id': `${SITE_URL}/#organization` },
    audience: {
      '@type': 'EducationalAudience',
      audienceType: 'English-medium biology students worldwide',
    },
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
          'English Medium Biology Coaching',
          'Biology Coaching for NRI Students',
          'Biology for International School Students',
          'NEET Biology English Medium',
          'IB Biology English Medium',
          'AP Biology English Medium',
          'Olympiad Biology English Medium',
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
            <li className="text-slate-700">Biology Coaching English Medium of Instruction</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-900">
            <Globe className="h-3.5 w-3.5" />
            For NRI families, international-school students, and English-medium learners worldwide
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900 max-w-4xl">
            Biology coaching in English medium of instruction —{' '}
            <span className="text-indigo-700">NEET, IB, AP, MCAT, Olympiads.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-4xl">
            All Cerebrum biology coaching is delivered entirely in English medium &mdash; the medium
            of instruction NEET, IB, AP, MCAT, USMLE, and every biology olympiad operate in.
            Designed for three audiences: NRI families whose children grew up in English-medium
            schools abroad, international-curriculum students (IB / AP / IGCSE), and regional-medium
            school students switching to English for competitive exams. We don\&rsquo;t teach in
            Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati, or Punjabi &mdash;
            by design, because English is the exam\&rsquo;s language.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Dr. Shekhar
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

        {/* Audience grid */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Who this programme is for
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {AUDIENCES.map((a) => (
                <div key={a.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <h3 className="text-base font-bold text-slate-900">{a.title}</h3>
                  <p className="mt-3 text-sm text-slate-700 leading-relaxed">{a.description}</p>
                  <p className="mt-3 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Examples:</span> {a.examples}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The bridge for regional-medium students */}
        <section className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            The 4-week English-medium bridge for regional-medium students
          </h2>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">
            For students transitioning from regional-medium schools (Hindi, Tamil, Telugu, Kannada,
            Malayalam, Marathi, Bengali, Gujarati, Punjabi, Assamese, Bodo) into NEET English-medium
            preparation, Cerebrum runs an explicit 4-week NCERT English terminology bridge at the
            start of every Class 11 / dropper batch. The bridge covers:
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">
                  Week 1: Cell biology + biomolecules terminology
                </p>
                <p className="mt-1">
                  English terms for organelles, cell types, biomolecule classes &mdash; with Hindi
                  reference allowed when terminology comprehension is the blocker.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">
                  Week 2: Plant physiology + transport vocabulary
                </p>
                <p className="mt-1">
                  Photosynthesis, respiration, transpiration, xylem / phloem &mdash; mapped from
                  regional-language equivalents.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">
                  Week 3: Human physiology + reproduction terminology
                </p>
                <p className="mt-1">
                  Digestion, respiration, circulation, excretion, neural, reproduction &mdash; the
                  highest-weightage NEET chapters get terminology drilling.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">
                  Week 4: Genetics + evolution + ecology vocabulary
                </p>
                <p className="mt-1">
                  By end of week 4, students operate fully in NEET-pattern English-medium MCQ
                  format.
                </p>
              </div>
            </li>
          </ul>

          <p className="mt-6 text-sm text-slate-600 leading-relaxed">
            This bridge is not extra — it\&rsquo;s built into the curriculum for every batch.
            Students from English-medium schools accelerate through it; students from
            regional-medium schools find it the single most valuable part of the prep year.
          </p>
        </section>

        {/* Track record bar */}
        <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-3xl font-bold">30+</p>
                <p className="mt-1 text-sm text-indigo-200">
                  Countries with active student cohorts
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="mt-1 text-sm text-indigo-200">
                  English-medium classes + material + assessment
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">4 weeks</p>
                <p className="mt-1 text-sm text-indigo-200">Built-in regional → English bridge</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              English-medium biology coaching — common questions
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
              60-minute live class. Bring your child\&rsquo;s last biology exam in whatever language
              they currently study. We show you the English-medium transition plan.
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
