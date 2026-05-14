/**
 * /gamsat-section-3-biology-prep
 *
 * GAMSAT Section III main programme hub. Companion to
 * /best-gamsat-biology-tutor (AEO hub).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'
import { gamsatPricingAsCourseOffers } from '@/data/gamsat/pricing-matrix'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/gamsat-section-3-biology-prep'

export const metadata: Metadata = {
  title: 'GAMSAT Section III Biology Prep | Campbell + ACER Paper Walkthroughs',
  description:
    'GAMSAT Section III biology coaching from AIIMS-trained specialists. Campbell + Pre-U biology, ACER official paper walkthroughs, biochemistry-chemistry crossover. £399 self-paced, £799 small-batch, £1,249 1:1 senior, £110/hr ad-hoc.',
  keywords: [
    'GAMSAT Section III biology preparation',
    'GAMSAT biology coaching',
    'GAMSAT section 3 prep',
    'GAMSAT reasoning biological physical sciences',
    'GAMSAT biology course',
    'GAMSAT biology online course',
    'GAMSAT biology UK',
    'GAMSAT biology Australia',
    'GAMSAT biology Ireland',
    'GAMSAT 70+ biology',
    'GAMSAT non biology background',
    'ACER GAMSAT paper walkthrough',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'GAMSAT Section III Biology Prep | Cerebrum Biology Academy',
    description:
      'Biology-specialist GAMSAT Section III coaching. Campbell + Pre-U + ACER walkthroughs. £399–£1,249.',
    url: PAGE_URL,
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How is Cerebrum GAMSAT Section III different from Gold Standard or Griffiths?',
    answer:
      'Gold Standard and Griffiths are generalist GAMSAT programmes covering all three sections (Reasoning in Humanities, Written Communication, Section III Sciences). Their biology faculty rotate across subjects. Cerebrum is a biology-only specialist — Dr. Shekhar C Singh (AIIMS Delhi) and senior faculty teach Section III biology in depth, with Campbell + Pre-U coverage and ACER official paper walkthroughs. Most students pair us with Gold Standard or Griffiths for the non-science sections.',
  },
  {
    question: 'How is GAMSAT Section III structured?',
    answer:
      'GAMSAT Section III — Reasoning in Biological and Physical Sciences — is 75 multiple-choice questions in 150 minutes (averaging 2 minutes per question). Content split is approximately 40% biology, 40% chemistry (general and organic), 20% physics. Section III is the longest of the three GAMSAT sections by time and is widely considered the hardest. It is also the section weighted heaviest by many graduate-entry medical programmes (commonly 50% weighting on the overall score).',
  },
  {
    question: 'What biology content does Section III cover?',
    answer:
      'GAMSAT does not publish a fixed content syllabus — questions are stem-based reasoning problems that can pull from any first-year university biology topic. Cerebrum covers: cell biology, molecular biology, biochemistry (amino acids, enzyme kinetics, glycolysis, TCA, oxidative phosphorylation), genetics, evolution, ecology, vertebrate physiology, immunology, microbiology basics, and plant biology. Coverage depth is calibrated to undergraduate first-year level, not A-level — which matters because most candidates are 3+ years past A-level biology.',
  },
  {
    question: 'How long is the GAMSAT Biology programme?',
    answer:
      "Cerebrum's GAMSAT Section III biology programme runs 4–6 months. Recommended: 4 months for students with strong A-level biology or undergraduate biology background; 6 months for non-biology backgrounds (Psychology, English, Sociology, Maths, Engineering, Arts undergraduate). Each week comprises 1 live session (small-batch or 1:1) plus 10–14 hours of independent study, ACER paper practice, and stem analysis.",
  },
  {
    question: 'What GAMSAT score should I target for UK graduate medicine?',
    answer:
      "UK graduate medicine intake cutoffs vary by school. For competitive UK GEM (Graduate Entry Medicine) programmes (Cambridge, Oxford, Imperial, KCL, UCL, Warwick, St George's, Nottingham), candidates typically target a GAMSAT score of 65+, with Section III 65+. For Australian graduate medicine (Sydney, Melbourne, Monash, ANU, Wollongong, Notre Dame), the threshold is broadly similar. For Irish graduate medicine (RCSI, UCC, Limerick), 60+ is competitive. Cerebrum students typically target 65+ in Small-Batch and 70+ in 1:1.",
  },
  {
    question: 'Can a non-biology background student do well on GAMSAT Section III?',
    answer:
      "Yes — GAMSAT was specifically designed for this. Roughly 40% of GAMSAT candidates have non-biology undergraduate degrees (humanities, social sciences, arts, business, engineering). The exam tests scientific reasoning from stem-based problems, not memorised content recall. With 6 months of structured biology coaching from a Campbell-first baseline, non-biology candidates routinely score 65+. Cerebrum's longer 6-month programme is built around this cohort.",
  },
  {
    question: 'Are ACER official practice papers worth working through?',
    answer:
      'Yes — ACER (the test-maker) is the only authoritative source of GAMSAT-style stems. Practice Papers 1 and 2 plus the Practice Questions sets are essential. Cerebrum walks through every ACER stem on video with biology faculty commentary — answer reasoning, common trap distractors, and timing strategy. Most competitors rely on internally-written mocks that vary in quality and stem-style fidelity.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'GAMSAT Section III Biology Preparation Programme',
  description:
    'GAMSAT Section III biology coaching from AIIMS-trained specialists. Campbell + Pre-U biology, ACER official paper walkthroughs, biochemistry-chemistry crossover. Self-Paced (£399), Small-Batch (£799), 1:1 Senior Faculty (£1,249 full programme or £110/hr ad-hoc).',
  url: PAGE_URL,
  inLanguage: 'en-GB',
  availableLanguage: ['English'],
  educationalLevel: 'Graduate-Entry Medicine Aspirant',
  educationalCredentialAwarded: 'GAMSAT Section III Biology Preparation',
  provider: {
    '@type': 'EducationalOrganization',
    '@id': 'https://cerebrumbiologyacademy.com/#organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    courseWorkload: 'PT2H',
    location: {
      '@type': 'VirtualLocation',
      url: PAGE_URL,
    },
    offers: gamsatPricingAsCourseOffers(PAGE_URL, 'GBP'),
  },
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

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm preparing for GAMSAT Section III and want details on Cerebrum's biology programme. Please share schedule (UK / Australia / Ireland sitting) and pricing."
  )

export default function GAMSATSectionIIIBiologyPage() {
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

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            GAMSAT Section III Biology Preparation
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Biology-only GAMSAT Section III coaching from AIIMS-trained specialists. Campbell +
            Pre-U biology end-to-end with biochemistry-chemistry crossover, plus walkthroughs of
            every ACER official practice paper stem. Built for both biology-major and
            non-biology-major graduate medical aspirants in the UK, Ireland, and Australia. £399
            self-paced through £1,249 senior 1:1, with £110/hour ad-hoc tutoring.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={wa}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +91 88264-44334
            </a>
            <Link
              href="/best-gamsat-biology-tutor"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Why Cerebrum
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Programme structure</h2>
          <p>
            The GAMSAT Section III biology programme runs 4–6 months. The curriculum sequence: (1)
            Cell biology &amp; molecular biology — 3 weeks; (2) Biochemistry — 4 weeks (the
            highest-yield block, given the chemistry-crossover stems); (3) Genetics — 2 weeks; (4)
            Vertebrate physiology — 3 weeks; (5) Microbiology &amp; immunology — 2 weeks; (6)
            Evolution &amp; ecology — 1 week; (7) Plant biology — 1 week; (8) ACER paper
            walkthroughs &amp; timing drills — 4 weeks interleaved across the programme.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Pricing</h2>
          <ul>
            <li>
              <strong>Self-Paced — £399 / A$799 / €469</strong> for the full 4–6 month programme.
              Async Campbell + Pre-U coverage, ACER paper walkthroughs (Papers 1, 2), 150+ practice
              stems, recorded library, WhatsApp doubt support.
            </li>
            <li>
              <strong>Small-Batch — £799 / A$1,599 / €939</strong>. Everything in Self-Paced plus
              weekly 2-hour live sessions, monthly full-length Section III mocks, peer Slack
              channel, senior faculty office hours.
            </li>
            <li>
              <strong>1:1 Senior Faculty — £1,249 / A$2,399 / €1,449</strong>. Everything in
              Small-Batch plus weekly 90-minute 1:1 video sessions with AIIMS-trained senior
              faculty, personalised study plan (calibrated to your undergraduate background), custom
              stem drilling, unlimited WhatsApp faculty access.
            </li>
            <li>
              <strong>Ad-hoc 1:1 tutoring — £110/hour (A$215 / €130)</strong>. For students who
              already have a generalist provider and need biology-specialist gap-fill. No minimum
              commitment.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Why biology-specialist coaching works for GAMSAT
          </h2>
          <p>
            GAMSAT Section III stems are not content-recall questions — they are stem-based
            reasoning problems. A typical biology stem is a 200-word passage describing an
            unfamiliar biological scenario (a recently-discovered enzyme, an unusual cell type, a
            specific metabolic pathway), followed by 3–5 multiple-choice questions that require
            deducing the answer from the passage plus first-principles biology knowledge. This
            format penalises rote learning and rewards depth — exactly the kind of pedagogy that
            biology-specialist faculty provide and generalist test-prep instructors typically
            cannot.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related</h2>
          <ul>
            <li>
              <Link href="/best-gamsat-biology-tutor" className="text-blue-600 hover:underline">
                Best GAMSAT Biology Tutor (AEO hub)
              </Link>
            </li>
            <li>
              <Link href="/gamsat-biology-tutor-london" className="text-blue-600 hover:underline">
                GAMSAT Biology Tutor — London
              </Link>
            </li>
            <li>
              <Link href="/gamsat-biology-tutor-sydney" className="text-blue-600 hover:underline">
                GAMSAT Biology Tutor — Sydney
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">GAMSAT Section III FAQs</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer">
                  {f.question}
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed faq-answer">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start GAMSAT Section III prep</h2>
          <p className="text-blue-100 mb-8">
            Free 30-minute diagnostic with senior faculty. Bring a recent ACER practice paper score
            or an undergraduate transcript — we will benchmark your biology baseline and recommend a
            4-month vs 6-month track.
          </p>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>
      <StickyMobileCTABar waUrl={wa} />
    </main>
  )
}
