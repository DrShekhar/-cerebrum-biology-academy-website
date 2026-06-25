/**
 * /dat-biology-preparation
 *
 * Main DAT Biology programme hub. Companion to /best-dat-biology-tutor
 * (AEO hub). Server component, USD-only pricing, Campbell + ADA outline
 * mapping.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'
import { datPricingAsCourseOffers } from '@/data/dat/pricing-matrix'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/dat-biology-preparation'

export const metadata: Metadata = {
  title: 'DAT Biology Preparation | Bio Section Specialist | Campbell + ADA Outline',
  description:
    'DAT Biology section coaching from AIIMS-trained biology specialists. Campbell Biology end-to-end with ADA outline weighting for anatomy/physiology. $449 self-paced, $899 small-batch, $1,399 1:1 senior, $135/hr ad-hoc.',
  keywords: [
    'DAT biology preparation',
    'DAT biology coaching',
    'DAT biology course',
    'DAT biology section prep',
    'DAT biology specialist',
    'Campbell biology for DAT',
    'ADA biology outline coaching',
    'DAT biology online course',
    'DAT biology 22+',
    'DAT biology 24+',
    'DAT biology Indian American',
    'biology only DAT tutor',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'DAT Biology Preparation | Cerebrum Biology Academy',
    description:
      'Biology-specialist DAT coaching. Campbell + ADA outline. $449–$1,399 packages, $135/hr ad-hoc.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'DAT Biology Preparation | Bio Section Specialist | Campbell + ADA Outline',
    description:
      'DAT Biology section coaching from AIIMS-trained biology specialists. Campbell Biology end-to-end with ADA outline weighting for anatomy/physiology. $449 self-paced, $899 small-batch, $1,399 1:1 sen...',
  },
}

const faqs = [
  {
    question: 'How is Cerebrum DAT Biology different from DAT Bootcamp, DAT Destroyer, or Kaplan?',
    answer:
      'DAT Bootcamp and DAT Destroyer are question-bank platforms — strong for drill volume but weak for deep biology pedagogy when a student gets stuck. Kaplan is a full-DAT generalist covering all four sections (Survey of Natural Sciences, Perceptual Ability, Reading Comprehension, Quantitative Reasoning) with rotating faculty. Cerebrum is a biology-only specialist — Dr. Shekhar C Singh (AIIMS Delhi) and senior faculty teach the Biology section in depth, with Campbell end-to-end coverage and ADA outline mapping. Most students pair us with DAT Bootcamp for drill and a generalist for the non-biology sections.',
  },
  {
    question: 'How is the DAT Biology section structured?',
    answer:
      'The DAT Biology section is 40 multiple-choice questions in 90 minutes (averaging 2.25 minutes per question). It is one of three sub-sections of the Survey of Natural Sciences (alongside General Chemistry and Organic Chemistry), and each sub-section reports an individual score plus the combined Survey of Natural Sciences score. The Biology score and the Academic Average (AA) are weighted heavily by admissions committees at top US/Canadian dental schools.',
  },
  {
    question: 'What is the ADA Biology content outline?',
    answer:
      'The American Dental Association DAT Biology outline covers six major areas: (1) Cell &amp; Molecular Biology — origin of life, cell metabolism, photosynthesis, enzymology, cellular respiration, biosynthesis, organelles, mitosis/meiosis, experimental cell biology; (2) Diversity of Life — taxonomy, biological organisation; (3) Vertebrate Anatomy &amp; Physiology — integumentary, skeletal, muscular, circulatory, digestive, respiratory, urinary, nervous, endocrine, reproductive, lymphatic/immune; (4) Developmental Biology — fertilisation, descriptive embryology, developmental mechanisms; (5) Genetics — molecular genetics, human genetics, classical genetics, chromosomal genetics, genetic technology; and (6) Evolution, Ecology &amp; Behavior — natural selection, population genetics, animal behaviour, ecology. Anatomy/Physiology is weighted heavier on the DAT than on the MCAT B/B section.',
  },
  {
    question: 'How long is the DAT Biology programme?',
    answer:
      "Cerebrum's DAT Biology programme runs 3–5 months. The recommended timeline is 4 months for students starting from an AP Biology / college Intro Bio baseline, 5 months for students who have not had a strong biology course in 2+ years, and 3 months for compressed gap-year sprint students. Each week comprises 1 live session (small-batch or 1:1) plus 8–12 hours of independent study and DAT-style practice.",
  },
  {
    question: 'What DAT Biology score should I target for top US dental schools?',
    answer:
      'For top-tier programmes (Harvard, UCSF, Penn, Columbia, Michigan), competitive applicants typically score 23+ on DAT Biology and 23+ AA. For solid US dental schools, a 21+ Bio with 21+ AA is generally competitive. For Canadian dental schools (where DAT format is similar but does not include Organic Chemistry in the Survey of Natural Sciences), the Bio score remains the most-weighted natural science. Cerebrum students typically target 22+ in the Small-Batch tier and 24+ in 1:1.',
  },
  {
    question: 'Does Cerebrum offer DAT Biology in Hindi or other languages?',
    answer:
      'Sessions are conducted in English. Senior faculty are fluent in English and Hindi, and family communication for Indian-American parents can happen in Hindi if preferred. The student-facing pedagogy uses standard scientific English aligned with Campbell terminology and ADA outline language.',
  },
  {
    question: 'Can I combine DAT Biology coaching with OAT or MCAT prep?',
    answer:
      'Yes. The OAT (Optometry Admission Test) Biology section is structurally similar to DAT Biology (40 questions, similar content outline), so the same coaching transfers directly. MCAT B/B requires additional biochemistry depth (Lehninger) and lighter anatomy/physiology — students switching from DAT to MCAT track typically add 6 weeks of MCAT-specific biochemistry on top of the DAT programme.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'DAT Biology Preparation Programme',
  description:
    'DAT Biology section coaching from AIIMS-trained biology specialists. Campbell Biology end-to-end with ADA outline weighting for anatomy/physiology. Self-Paced ($449), Small-Batch ($899), 1:1 Senior Faculty ($1,399 full programme or $135/hr ad-hoc).',
  url: PAGE_URL,
  inLanguage: 'en-US',
  availableLanguage: ['English'],
  educationalLevel: 'Pre-Dental',
  educationalCredentialAwarded: 'DAT Biology Section Preparation',
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
    offers: datPricingAsCourseOffers(PAGE_URL),
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Best DAT Biology Tutor',
      item: 'https://cerebrumbiologyacademy.com/best-dat-biology-tutor',
    },
    { '@type': 'ListItem', position: 3, name: 'DAT Biology Preparation', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm preparing for the DAT and want details on the Cerebrum Biology section programme. Please share pricing, schedule, and faculty information."
  )

export default function DATBiologyPreparationPage() {
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

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            DAT Biology Preparation
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Biology-only DAT coaching from AIIMS-trained (AIIMS — India's apex medical institute,
            peer to Harvard Medical School in selectivity) specialists. 40-question section depth
            via Campbell Biology end-to-end with ADA outline weighting for vertebrate
            anatomy/physiology — the section weighted heaviest on DAT and lightest in most
            generalist prep. Online live in US-friendly ET evening slots. $449 self-paced through
            $1,399 senior 1:1, with $135/hour ad-hoc tutoring.
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
              href="/best-dat-biology-tutor"
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
            The DAT Biology programme runs 3–5 months and covers the full ADA Biology content
            outline. The curriculum sequence: (1) Cell &amp; Molecular Biology — 4 weeks; (2)
            Vertebrate Anatomy &amp; Physiology — 5 weeks (the longest block, by design); (3)
            Genetics — 2 weeks; (4) Developmental Biology — 1 week; (5) Diversity of Life — 1 week;
            (6) Evolution, Ecology &amp; Behaviour — 2 weeks; (7) 40-question section sprint and
            timing drills — 2 weeks. Across the programme, every Campbell chapter is mapped to the
            specific ADA outline section it covers.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Pricing</h2>
          <ul>
            <li>
              <strong>DAT Biology Self-Paced — $449</strong> for the full 3–5 month programme. Async
              Campbell Biology coverage, ADA outline mapping, 200+ practice questions, recorded
              video library, WhatsApp doubt support.
            </li>
            <li>
              <strong>DAT Biology Small-Batch — $899</strong> for the full programme. Everything in
              Self-Paced plus weekly 2-hour live sessions with biology-specialist faculty, monthly
              40-question section mocks, peer Slack channel, senior faculty office hours.
            </li>
            <li>
              <strong>DAT Biology 1:1 Senior Faculty — $1,399</strong> for the full programme.
              Everything in Small-Batch plus weekly 90-minute 1:1 video sessions with AIIMS-trained
              senior faculty, personalised study plan, custom drilling, unlimited WhatsApp faculty
              access.
            </li>
            <li>
              <strong>Ad-hoc 1:1 tutoring — $135/hour</strong>. For students who already have a
              generalist provider and need biology-specialist gap-fill. No minimum commitment.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Why anatomy &amp; physiology depth matters more on DAT than MCAT
          </h2>
          <p>
            DAT Biology weights vertebrate anatomy and physiology heavier than MCAT Bio/Biochem.
            Roughly 10–13 of the 40 DAT Biology questions touch organ-system content (integumentary,
            skeletal, muscular, circulatory, digestive, respiratory, urinary, nervous, endocrine,
            reproductive, lymphatic/immune). MCAT B/B touches the same systems lightly because
            physiology depth is covered in the Psych/Soc section and through biochemistry. This is
            why generalist DAT prep that just runs Campbell beginning-to-end underperforms — they
            give equal weight to plant biology and to vertebrate organ systems, when the DAT
            doesn't.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related pages</h2>
          <ul>
            <li>
              <Link href="/best-dat-biology-tutor" className="text-blue-600 hover:underline">
                Best DAT Biology Tutor (AEO hub)
              </Link>
            </li>
            <li>
              <Link href="/dat-biology-organic-chem-prep" className="text-blue-600 hover:underline">
                DAT Biology + Organic Chem cross-section study
              </Link>
            </li>
            <li>
              <Link
                href="/dat-perceptual-ability-biology"
                className="text-blue-600 hover:underline"
              >
                DAT Perceptual Ability + Biology anatomy crossover
              </Link>
            </li>
            <li>
              <Link href="/dat-biology-tutor-new-jersey" className="text-blue-600 hover:underline">
                DAT Biology Tutor — New Jersey
              </Link>
            </li>
            <li>
              <Link href="/dat-biology-tutor-bay-area" className="text-blue-600 hover:underline">
                DAT Biology Tutor — Bay Area
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">DAT Biology FAQs</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200 group">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-lg">
                  {f.question}
                </summary>
                <p
                  className="mt-4 text-slate-700 leading-relaxed faq-answer"
                  dangerouslySetInnerHTML={{ __html: f.answer }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start DAT Biology prep</h2>
          <p className="text-blue-100 mb-8">
            Free 30-minute diagnostic with senior faculty. Bring a recent DAT Biology section mock
            score — we'll benchmark your baseline and recommend a timeline.
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
      <section className="py-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Compare & Explore</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <Link
              href="/dat-vs-mcat-biology"
              className="block p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:shadow text-center transition"
            >
              <span className="font-medium text-slate-900 text-sm">DAT vs MCAT Biology</span>
            </Link>
            <Link
              href="/mcat-biology-preparation"
              className="block p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:shadow text-center transition"
            >
              <span className="font-medium text-slate-900 text-sm">MCAT Biology</span>
            </Link>
            <Link
              href="/gamsat-section-3-biology-prep"
              className="block p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:shadow text-center transition"
            >
              <span className="font-medium text-slate-900 text-sm">GAMSAT Biology</span>
            </Link>
            <Link
              href="/usmle-step-1-biology-preparation"
              className="block p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:shadow text-center transition"
            >
              <span className="font-medium text-slate-900 text-sm">USMLE Step 1</span>
            </Link>
          </div>
        </div>
      </section>

      <StickyMobileCTABar waUrl={wa} />
    </main>
  )
}
