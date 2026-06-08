/**
 * /dat-biology-organic-chem-prep
 *
 * Cross-section study page — DAT Biology paired with Organic Chemistry.
 * Targets students looking for combined Survey of Natural Sciences
 * preparation. Biology is the lead section; OChem is the upsell.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/dat-biology-organic-chem-prep'

export const metadata: Metadata = {
  title: 'DAT Biology + Organic Chemistry Prep | Survey of Natural Sciences',
  description:
    'Combined DAT Biology + Organic Chemistry coaching covering 60+ questions of the Survey of Natural Sciences. AIIMS-trained biology lead, biochemistry-bridged orgo. Pre-dental specialist programme.',
  keywords: [
    'DAT biology organic chem',
    'DAT biology and orgo prep',
    'DAT survey of natural sciences coaching',
    'DAT bio orgo bundle',
    'DAT biology biochemistry organic chem',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'DAT Biology + Organic Chemistry | Cerebrum Biology Academy',
    description:
      'Combined Biology + Orgo coaching for the DAT Survey of Natural Sciences. Biology-led pedagogy.',
    url: PAGE_URL,
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'DAT Biology + Organic Chemistry Prep | Survey of Natural Sciences',
    description: 'Combined DAT Biology + Organic Chemistry coaching covering 60+ questions of the Survey of Natural Sciences. AIIMS-trained biology lead, biochemistry-bridged orgo. Pre-dental specialist programme.',
  },
}

const faqs = [
  {
    question: 'Why combine DAT Biology and Organic Chemistry coaching?',
    answer:
      'The DAT Survey of Natural Sciences combines Biology (40 Q), General Chemistry (30 Q), and Organic Chemistry (30 Q) into a single 90-minute (Bio) + 90-minute (Chem combined) testing block. Biology and Orgo share content at the biochemistry interface — amino acid chemistry, carbohydrate reactions, lipid metabolism — and reading-comprehension-style passage questions blur the lines. Cerebrum students who combine the two report 1–2 point AA gain over students who silo-prep.',
  },
  {
    question: 'Is Organic Chemistry harder than Biology on the DAT?',
    answer:
      'For most students yes — OChem averages a lower individual score across the cohort than Biology. The DAT OChem tests reaction mechanisms (substitution, elimination, addition, redox), stereochemistry, IR/NMR spectroscopy basics, and key named reactions. Cerebrum pairs biology-led pedagogy with OChem mechanism reasoning, which suits pre-dental students who think in terms of biological systems first.',
  },
  {
    question: 'What does the combined programme cover?',
    answer:
      'Biology: full ADA outline as in the standalone Biology programme. OChem: reaction families (SN1/SN2, E1/E2, addition, oxidation/reduction), stereochemistry, spectroscopy, key named reactions, acid–base chemistry, lab techniques. Bridge content: enzyme kinetics, amino acid biochemistry, carbohydrate chemistry, lipid metabolism — taught in both biology and OChem voice for retention.',
  },
  {
    question: 'How much does the combined programme cost?',
    answer:
      'The Biology component is priced as standard ($449 Self-Paced / $899 Small-Batch / $1,399 1:1). Organic Chemistry is added as a section module at $399 Self-Paced / $799 Small-Batch / $1,199 1:1. The most popular combined bundle is Small-Batch Biology + Small-Batch OChem at $1,499 (saving $199 vs separately priced). Ad-hoc 1:1 OChem tutoring is $125/hour.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'DAT Biology + Organic Chemistry Combined Programme',
  description:
    'Combined DAT Biology and Organic Chemistry preparation covering 70 of the 100 Survey of Natural Sciences questions. AIIMS-trained biology lead with biochemistry-bridged organic chemistry.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  provider: {
    '@type': 'EducationalOrganization',
    '@id': 'https://cerebrumbiologyacademy.com/#organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    location: { '@type': 'VirtualLocation', url: PAGE_URL },
    offers: {
      '@type': 'Offer',
      name: 'Combined Bio + Orgo Small-Batch Bundle',
      price: '1499',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: PAGE_URL,
    },
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
    { '@type': 'ListItem', position: 3, name: 'DAT Biology + Organic Chem', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm interested in the combined DAT Biology + Organic Chemistry programme. Please share schedule and pricing."
  )

export default function DATBiologyOrganicChemPage() {
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

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            DAT Biology + Organic Chemistry Combined Prep
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            70 of the 100 Survey of Natural Sciences questions — Biology (40) and Organic Chemistry
            (30) — coached together, with the biology specialist as lead. Bridge content (amino acid
            chemistry, enzyme kinetics, lipid metabolism, carbohydrate chemistry) is taught in both
            voices so it sticks. Most popular bundle: Small-Batch combined at $1,499.
          </p>
          <a
            href={wa}
            className="inline-flex bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            The biochemistry bridge between DAT Biology and DAT Organic Chemistry
          </h2>
          <p>
            DAT examinees who score 22+ on both Biology and Organic Chemistry typically describe a
            single moment when the two subjects "merged" — usually during amino acid coverage. Amino
            acid structure is taught in Biology (Campbell Chapter 5), in Biochemistry (Lehninger
            Chapter 3), and in Organic Chemistry (carboxylic acid + amine functionalities). The same
            molecule, three voices. Students who get all three voices score higher than students who
            silo-prep.
          </p>
          <p>
            Cerebrum's combined programme schedules a 3-week biochemistry bridge block in week 6
            after Biology cell/molecular and OChem functional group introduction are complete.
            Content covered: amino acids and proteins, carbohydrate chemistry, lipid chemistry,
            nucleic acid chemistry, enzyme kinetics, oxidative phosphorylation. This is the highest
            ROI block in the combined programme.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Pricing</h2>
          <ul>
            <li>
              <strong>Small-Batch Bio + OChem Bundle — $1,499</strong> (saves $199 vs separately).
              Most popular tier.
            </li>
            <li>
              <strong>1:1 Senior Bio + OChem Bundle — $2,299</strong> (saves $299).
            </li>
            <li>
              <strong>Self-Paced Bio + OChem Bundle — $749</strong> (saves $99).
            </li>
            <li>
              <strong>Ad-hoc Biology 1:1 — $135/hour</strong> ·{' '}
              <strong>Ad-hoc OChem 1:1 — $125/hour</strong>.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related</h2>
          <ul>
            <li>
              <Link href="/best-dat-biology-tutor" className="text-blue-600 hover:underline">
                Best DAT Biology Tutor (AEO hub)
              </Link>
            </li>
            <li>
              <Link href="/dat-biology-preparation" className="text-blue-600 hover:underline">
                DAT Biology programme (standalone)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs</h2>
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
      <StickyMobileCTABar waUrl={wa} />
    </main>
  )
}
