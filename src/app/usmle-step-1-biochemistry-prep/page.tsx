/**
 * /usmle-step-1-biochemistry-prep
 *
 * USMLE Step 1 biochemistry — the highest-yield foundational sciences
 * block on Step 1 (~14% of total content). Cerebrum's strongest
 * pedagogy block given AIIMS-trained biology faculty depth.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/usmle-step-1-biochemistry-prep'

export const metadata: Metadata = {
  title: 'USMLE Step 1 Biochemistry Prep | Lippincott + First Aid + UWorld',
  description:
    'USMLE Step 1 biochemistry & molecular biology coaching from AIIMS-trained specialists. Glycolysis through fatty acid metabolism, DNA replication, lysosomal storage disorders. $2,499 full programme or $175/hr ad-hoc.',
  keywords: [
    'USMLE Step 1 biochemistry prep',
    'USMLE Step 1 biochemistry tutor',
    'USMLE Step 1 molecular biology prep',
    'USMLE Step 1 metabolism coaching',
    'USMLE Step 1 glycolysis tutor',
    'USMLE Step 1 Lippincott biochemistry',
    'USMLE Step 1 vitamins prep',
    'USMLE Step 1 lysosomal storage disorders',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'USMLE Step 1 Biochemistry Prep | Cerebrum Biology Academy',
    description:
      'Step 1 biochemistry & molecular biology specialist coaching. Lippincott + First Aid + UWorld.',
    url: PAGE_URL,
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How much biochemistry is on USMLE Step 1?',
    answer:
      'Biochemistry & molecular biology is approximately 14% of Step 1 content — the largest single foundational sciences block. Topics include: glycolysis, gluconeogenesis, glycogen metabolism, TCA cycle, oxidative phosphorylation, fatty acid synthesis and beta-oxidation, ketogenesis, amino acid metabolism, urea cycle, purine and pyrimidine metabolism, DNA replication and repair, transcription, translation, protein modification, vitamins (water- and fat-soluble), enzyme kinetics, and inborn errors of metabolism including lysosomal storage disorders. It is also the most internally-connected block — many Step 1 vignettes rely on biochemistry mechanism understanding even when the surface question is pharmacology or pathology.',
  },
  {
    question: 'What reference texts does Cerebrum use for Step 1 biochemistry?',
    answer:
      'Lippincott Illustrated Reviews: Biochemistry (the canonical USMLE biochemistry text) is the primary reference, paired with First Aid Step 1 biochemistry chapter for content mapping. We do not use other generalist test-prep brands Lecture Notes (too dense for high-yield Step 1 study) or Goljan biochemistry (more pathology-focused). UWorld biochemistry blocks are walked through live for application drilling.',
  },
  {
    question: 'Which biochemistry topics are highest yield for Step 1?',
    answer:
      'Top 10 highest-yield Step 1 biochemistry topics in our experience: (1) glycolysis and gluconeogenesis enzymes + regulation, (2) fatty acid metabolism + ketone body chemistry, (3) vitamins B1/B2/B3/B6/B12 deficiency syndromes, (4) lysosomal storage disorders (Tay-Sachs, Gaucher, Niemann-Pick, Fabry, Hurler, Hunter), (5) urea cycle disorders, (6) enzyme kinetics + competitive vs non-competitive inhibition, (7) DNA replication and repair (excision repair defects), (8) protein modification + Golgi trafficking, (9) heme synthesis + porphyrias, (10) collagen synthesis + osteogenesis imperfecta.',
  },
  {
    question: 'How is biochemistry coaching priced?',
    answer:
      'Biochemistry is included as the lead block within the full Step 1 Biology Foundations programme — $799 Self-Paced / $1,599 Small-Batch / $2,499 1:1 Senior Faculty (6-week biochemistry block within 4-6 month programme). Ad-hoc 1:1 biochemistry tutoring is $175/hour — typical engagement is 10-20 hours for students who scored low on biochemistry section in an NBME self-assessment or are remediating a Step 1 fail.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'USMLE Step 1 Biochemistry Preparation',
  description:
    'USMLE Step 1 biochemistry & molecular biology coaching from AIIMS-trained specialists. Lippincott + First Aid + UWorld integrated.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  educationalLevel: 'Medical Student / IMG',
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
      name: 'Step 1 Biochemistry Module (within Full Programme)',
      price: '1599',
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
      name: 'Best USMLE Step 1 Biology Tutor',
      item: 'https://cerebrumbiologyacademy.com/best-usmle-step-1-biology-tutor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'USMLE Step 1 Biology Preparation',
      item: 'https://cerebrumbiologyacademy.com/usmle-step-1-biology-preparation',
    },
    { '@type': 'ListItem', position: 4, name: 'Biochemistry Module', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm preparing for USMLE Step 1 biochemistry specifically. Please share details on the biochemistry module."
  )

export default function USMLEStep1BiochemistryPrepPage() {
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
            USMLE Step 1 Biochemistry Preparation
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            The highest-yield foundational sciences block on Step 1 (~14% of total content).
            Glycolysis through fatty acid metabolism, DNA replication and repair, vitamins, urea
            cycle disorders, lysosomal storage diseases, heme synthesis — taught by AIIMS-trained
            biology specialists using Lippincott Illustrated Reviews and First Aid chapter mapping.
            6-week block within the full Step 1 programme; available standalone at $175/hour ad-hoc.
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
            The 6-week biochemistry block — week by week
          </h2>
          <ul>
            <li>
              <strong>Week 1: Carbohydrate metabolism core.</strong> Glycolysis (regulated enzymes +
              reciprocal control), gluconeogenesis, fructose and galactose metabolism, pyruvate
              dehydrogenase complex, TCA cycle, oxidative phosphorylation, ETC inhibitors and
              uncouplers.
            </li>
            <li>
              <strong>Week 2: Lipid metabolism + ketone bodies.</strong> Fatty acid synthesis vs
              beta-oxidation, MTP-MCAD-VLCAD enzyme deficiencies, ketogenesis and ketoacidosis,
              cholesterol synthesis, lipoprotein metabolism, dyslipidemias.
            </li>
            <li>
              <strong>Week 3: Amino acid metabolism + urea cycle.</strong> Essential vs
              non-essential amino acids, urea cycle disorders (OTC deficiency, citrullinemia, NAGS
              deficiency), phenylketonuria, alkaptonuria, maple syrup urine disease, homocystinuria.
            </li>
            <li>
              <strong>Week 4: Nucleotide metabolism + DNA.</strong> Purine and pyrimidine synthesis
              and salvage, Lesch-Nyhan syndrome, ADA-SCID, DNA replication (eukaryotic +
              prokaryotic), DNA repair (NER, BER, MMR, DSB repair) and associated cancer syndromes
              (Xeroderma pigmentosum, HNPCC, Lynch syndrome).
            </li>
            <li>
              <strong>Week 5: Transcription + translation + protein modification.</strong> RNA
              polymerases, splicing and Roundabout splicing defects, ribosomal translation,
              post-translational modification, Golgi trafficking, I-cell disease.
            </li>
            <li>
              <strong>Week 6: Vitamins + storage disorders + integration.</strong> Water-soluble
              vitamins (B1–B12, C), fat-soluble vitamins (ADEK), lysosomal storage disorders
              (Tay-Sachs, Gaucher, Niemann-Pick, Fabry, Hurler, Hunter, Krabbe, MLD), glycogen
              storage disorders (Von Gierke, Pompe, Cori, McArdle), peroxisomal disorders
              (Zellweger, X-ALD).
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related</h2>
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
                href="/usmle-step-1-biology-preparation"
                className="text-blue-600 hover:underline"
              >
                Full Step 1 biology-foundations programme
              </Link>
            </li>
            <li>
              <Link
                href="/usmle-step-1-microbiology-immunology-prep"
                className="text-blue-600 hover:underline"
              >
                Microbiology + Immunology module
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
