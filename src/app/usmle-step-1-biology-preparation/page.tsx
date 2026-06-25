/**
 * /usmle-step-1-biology-preparation
 *
 * Main USMLE Step 1 biology foundations programme hub. Companion to
 * /best-usmle-step-1-biology-tutor (AEO hub).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'
import { usmleStep1PricingAsCourseOffers } from '@/data/usmle-step-1/pricing-matrix'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/usmle-step-1-biology-preparation'

export const metadata: Metadata = {
  title: 'USMLE Step 1 Biology Preparation | First Aid + UWorld + NBME Integrated',
  description:
    'USMLE Step 1 biology-foundations coaching from AIIMS-trained specialists. Biochemistry, microbiology, immunology, physiology depth. First Aid mapped end-to-end, UWorld integration walkthroughs. $799 self-paced, $1,599 small-batch, $2,499 1:1 senior, $175/hr ad-hoc.',
  keywords: [
    'USMLE Step 1 biology preparation',
    'USMLE Step 1 biology coaching',
    'USMLE Step 1 foundations course',
    'USMLE Step 1 biochemistry coaching',
    'USMLE Step 1 microbiology coaching',
    'USMLE Step 1 immunology coaching',
    'USMLE Step 1 physiology coaching',
    'USMLE Step 1 IMG preparation',
    'USMLE Step 1 dedicated period plan',
    'USMLE Step 1 First Aid supplement',
    'USMLE Step 1 UWorld integration',
    'USMLE Step 1 NBME prep',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'USMLE Step 1 Biology Preparation | Cerebrum Biology Academy',
    description:
      'Biology-foundations USMLE Step 1 coaching for IMG + M1/M2 students. First Aid + UWorld + NBME integrated. $799–$2,499 packages.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'USMLE Step 1 Biology Preparation | First Aid + UWorld + NBME Integrated',
    description:
      'USMLE Step 1 biology-foundations coaching from AIIMS-trained specialists. Biochemistry, microbiology, immunology, physiology depth. First Aid mapped end-to-end, UWorld integration walkthroughs. $79...',
  },
}

const faqs = [
  {
    question:
      'How is Cerebrum USMLE Step 1 coaching different from Kaplan, Becker, and question banks?',
    answer:
      "UWorld and AMBOSS are question banks — they tell you the right answer but assume you already understand the underlying biology. Kaplan and Becker are generalist agencies covering all Step 1 disciplines (biochemistry through pharmacology) with rotating faculty. Cerebrum is a biology-foundations specialist — Dr. Shekhar C Singh (AIIMS Delhi — India's apex medical institute, peer to Harvard Medical School in selectivity) and senior faculty teach the ~55% of Step 1 that is biology-driven (biochemistry, microbiology, immunology, physiology, biology-driven pathology mechanisms) in depth. Most students pair us with UWorld for question volume and use us instead of Kaplan and Becker for the foundational sciences component.",
  },
  {
    question: 'Step 1 went Pass/Fail in 2022 — does foundational biology still matter?',
    answer:
      'Yes, intensely. Three factors. (1) The national Step 1 fail rate is ~7% — failure delays residency by 1+ year. (2) ~25% of US residency programmes still use Step 1 transcript signals to filter IMG applications. (3) Step 2 CK is now the dominant scored metric for residency match, and Step 2 CK is built on top of Step 1 foundational sciences — strong biology pedagogy now matters more for downstream Step 2 success than ever before. Cerebrum coaching is calibrated to both Pass-target and high-Step-2 trajectory students.',
  },
  {
    question: 'How long is the Step 1 biology programme?',
    answer:
      "Cerebrum's Step 1 programme runs 4–6 months. Recommended: 4 months for US M1/M2 students with strong basic-sciences coursework, 6 months for IMG students from Indian, Pakistani, Nepali, Caribbean MD programmes who want comprehensive foundational coverage, and a separate 8-week intensive dedicated-period sprint for the final NBME-mock-driven phase. Each week comprises 1 live session (small-batch or 1:1) plus 15–25 hours of First Aid + UWorld study (typical IMG dedicated-period intensity).",
  },
  {
    question: 'What does the biology-foundations programme actually cover?',
    answer:
      'Six content blocks across 4–6 months: (1) Biochemistry & molecular biology — 6 weeks (the highest-yield foundational block); (2) Microbiology — 3 weeks (high-volume drilling with Sketchy-style mnemonic integration); (3) Immunology — 3 weeks (complement, hypersensitivity, MHC, vaccines); (4) Physiology — 5 weeks (cardiovascular, renal, respiratory, endocrine, GI, neuro); (5) Biology-driven pathology mechanisms — 3 weeks (atherosclerosis, neoplasia mechanisms, infectious pathology); (6) UWorld + NBME integration sprint — 4 weeks interleaved across the programme. First Aid Step 1 is mapped chapter-by-chapter throughout.',
  },
  {
    question: 'Does Cerebrum work with US M1/M2 students or only IMGs?',
    answer:
      "Both — and US M1/M2 students are a core audience. US M1/M2 students choose Cerebrum for the biology-foundations specialist depth (Pathoma alone isn't enough for biochemistry), live small-batch and 1:1 teaching in their own US time zone, and a 30–40% cost saving vs Kaplan and Becker. IMG (International Medical Graduate) students are a parallel audience: AIIMS-trained pedagogy resonates structurally with IMGs who trained in AIIMS-pattern medical education, and IMGs in international locations value access to senior faculty where Kaplan and Becker physical campuses aren't available. The same biology-foundations programme serves both.",
  },
  {
    question: 'Is First Aid for the USMLE Step 1 sufficient on its own?',
    answer:
      "First Aid is essential — every Cerebrum student uses it daily. But it's a memorisation aid, not pedagogy. Students who only use First Aid often fail Step 1 because they can recall facts but cannot apply them to a clinical vignette. Cerebrum supplements First Aid chapter-by-chapter with biology-faculty walkthroughs that teach the underlying mechanism. See /first-aid-step-1-biology-tutor for the supplement-tutoring approach.",
  },
  {
    question: 'I failed an NBME self-assessment — can Cerebrum help with remediation?',
    answer:
      'Yes — failing an NBME self-assessment in the final 4-6 weeks before test day is one of our most common engagement triggers. Standard remediation flow: (1) Diagnostic 30-minute video call to map the error pattern; (2) 1:1 Senior Faculty package or 20-40 hours of ad-hoc 1:1 at $175/hour focused on the failed content blocks; (3) NBME re-take at 2-week interval to confirm gap closure. IMG students who failed Step 1 once and need to pass on the retake follow a similar but more intensive 8-week remediation arc.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'USMLE Step 1 Biology Foundations Programme',
  description:
    'USMLE Step 1 biology-foundations coaching from AIIMS-trained specialists. Biochemistry, microbiology, immunology, physiology depth. First Aid mapped end-to-end, UWorld integration walkthroughs. Self-Paced ($799), Small-Batch ($1,599), 1:1 Senior Faculty ($2,499 full programme or $175/hr ad-hoc).',
  url: PAGE_URL,
  inLanguage: 'en-US',
  availableLanguage: ['English'],
  educationalLevel: 'Medical Student / IMG',
  educationalCredentialAwarded: 'USMLE Step 1 Biology Foundations Preparation',
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
    offers: usmleStep1PricingAsCourseOffers(PAGE_URL),
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
      name: 'Best USMLE Step 1 Biology Tutor',
      item: 'https://cerebrumbiologyacademy.com/best-usmle-step-1-biology-tutor',
    },
    { '@type': 'ListItem', position: 3, name: 'USMLE Step 1 Biology Preparation', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm preparing for USMLE Step 1 and want details on the Cerebrum biology-foundations programme. Please share pricing, schedule, and IMG vs M1/M2 track guidance."
  )

export default function USMLEStep1BiologyPreparationPage() {
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
            USMLE Step 1 Biology Foundations Preparation
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Biology-only USMLE Step 1 coaching from AIIMS-trained specialists. Biochemistry &amp;
            molecular biology, microbiology, immunology, physiology, plus the biology-driven
            mechanisms underpinning pathology — roughly 55% of Step 1 content. First Aid mapped
            chapter-by-chapter, UWorld block walkthroughs, NBME self-assessment debriefs. Built for
            US M1/M2 students targeting strong residency match signals, with IMG (International
            Medical Graduate) students preparing for ECFMG certification as a parallel audience.
            $799 self-paced through $2,499 senior 1:1, with $175/hour ad-hoc tutoring.
          </p>
          <p className="text-base text-slate-400 mb-6 max-w-3xl">
            Live online in your US time zone (ET/CT/MT/PT); pricing in USD.
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
              href="/best-usmle-step-1-biology-tutor"
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
            The Step 1 biology-foundations programme runs 4–6 months. The curriculum sequence: (1)
            Biochemistry &amp; molecular biology — 6 weeks (the highest-yield foundational block;
            glycolysis through fatty acid metabolism, DNA replication and repair, transcription /
            translation, protein synthesis and modification, vitamins, lysosomal storage disorders);
            (2) Microbiology — 3 weeks (high-volume bug drilling, antibiotic mechanism mapping,
            Sketchy-style visual mnemonic integration); (3) Immunology — 3 weeks (complement system,
            hypersensitivity types I–IV, MHC class I/II, T-cell receptor signalling, vaccines and
            immunodeficiency syndromes); (4) Physiology — 5 weeks (cardiovascular, renal,
            respiratory, endocrine, GI, neurophysiology — each ~1 week with First Aid mapping); (5)
            Biology-driven pathology mechanisms — 3 weeks (atherosclerosis, neoplasia and
            oncogenesis mechanisms, infectious pathology); (6) UWorld + NBME integration sprint — 4
            weeks interleaved across the programme with weekly block debriefs.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Pricing</h2>
          <ul>
            <li>
              <strong>Self-Paced — $799</strong> for the full 4–6 month programme. Async First Aid
              walkthroughs, biochemistry / microbiology / immunology / physiology video library,
              UWorld integration content, recorded library, WhatsApp doubt support.
            </li>
            <li>
              <strong>Small-Batch — $1,599</strong> for the full programme. Everything in Self-Paced
              plus weekly 2-hour live sessions with biology-specialist faculty, monthly NBME-pattern
              foundational mocks, peer Slack channel, senior faculty office hours.
            </li>
            <li>
              <strong>1:1 Senior Faculty — $2,499</strong> for the full programme. Everything in
              Small-Batch plus weekly 90-minute 1:1 video sessions with AIIMS-trained senior
              faculty, personalised dedicated-period study plan, custom UWorld / NBME error log
              analysis, unlimited WhatsApp faculty access.
            </li>
            <li>
              <strong>Ad-hoc 1:1 tutoring — $175/hour</strong>. For students who already have a
              generalist Kaplan or Becker track and need biology-specialist gap-fill, or for NBME
              remediation. No minimum commitment.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Why biology-foundations depth still matters in the Pass/Fail era
          </h2>
          <p>
            Step 1 went Pass/Fail in January 2022 — but the prep market hasn't shrunk because the
            consequences of failing have not changed. The national fail rate is ~7%. Failing once
            adds 1+ year to your residency timeline and creates a permanent transcript flag.
            Furthermore, Step 2 CK is now the dominant scored residency-match metric, and Step 2 CK
            is built on Step 1 foundational sciences — every clinical vignette in Step 2 CK requires
            the biology mechanism understanding that Step 1 tests.
          </p>
          <p>
            ~25% of US residency programmes also still use Step 1 transcript signals to filter IMG
            applications, particularly for competitive specialties (Dermatology, Plastic Surgery,
            Radiology, Orthopaedics, ENT). For IMGs, Step 1 foundational-sciences strength remains a
            critical residency-match input even in the Pass/Fail era.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related pages</h2>
          <ul>
            <li>
              <Link
                href="/best-usmle-step-1-biology-tutor"
                className="text-blue-600 hover:underline"
              >
                Best USMLE Step 1 Biology Tutor (AEO hub)
              </Link>
            </li>
            <li>
              <Link
                href="/usmle-step-1-biochemistry-prep"
                className="text-blue-600 hover:underline"
              >
                USMLE Step 1 Biochemistry Prep
              </Link>
            </li>
            <li>
              <Link
                href="/usmle-step-1-microbiology-immunology-prep"
                className="text-blue-600 hover:underline"
              >
                USMLE Step 1 Microbiology + Immunology Prep
              </Link>
            </li>
            <li>
              <Link href="/usmle-step-1-physiology-prep" className="text-blue-600 hover:underline">
                USMLE Step 1 Physiology Prep
              </Link>
            </li>
            <li>
              <Link
                href="/first-aid-step-1-biology-tutor"
                className="text-blue-600 hover:underline"
              >
                First Aid Step 1 Biology Tutor (supplement walkthroughs)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">USMLE Step 1 Biology FAQs</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-lg">
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
          <h2 className="text-3xl font-bold text-white mb-4">Start USMLE Step 1 biology prep</h2>
          <p className="text-blue-100 mb-8">
            Free 30-minute diagnostic with senior faculty. Bring a recent NBME self-assessment score
            or a UWorld error log — we'll benchmark your foundational-sciences baseline and
            recommend a 4-month track, 6-month IMG track, or 8-week remediation arc.
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
