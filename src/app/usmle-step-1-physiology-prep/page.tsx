/**
 * /usmle-step-1-physiology-prep
 *
 * USMLE Step 1 physiology embedded across organ systems (~25% blended
 * weighting). Cerebrum's biology-pedagogy approach bridges physiology
 * to pathophysiology mechanism — the application layer required for
 * vignette-style Step 1 questions.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/usmle-step-1-physiology-prep'

export const metadata: Metadata = {
  title: 'USMLE Step 1 Physiology Prep | BRS + Costanzo + Pathophysiology Bridge',
  description:
    'USMLE Step 1 physiology coaching from AIIMS-trained specialists. Cardiovascular, renal, respiratory, endocrine, GI, neurophysiology — bridged to pathophysiology mechanism. $2,499 full programme.',
  keywords: [
    'USMLE Step 1 physiology prep',
    'USMLE Step 1 physiology tutor',
    'USMLE Step 1 cardiovascular physiology',
    'USMLE Step 1 renal physiology',
    'USMLE Step 1 respiratory physiology',
    'USMLE Step 1 endocrine physiology',
    'USMLE Step 1 pathophysiology bridge',
    'USMLE Step 1 BRS physiology',
    'USMLE Step 1 Costanzo physiology',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'USMLE Step 1 Physiology Prep | Cerebrum Biology Academy',
    description:
      'Step 1 physiology specialist coaching. BRS + Costanzo + First Aid + pathophysiology bridge.',
    url: PAGE_URL,
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'USMLE Step 1 Physiology Prep | BRS + Costanzo + Pathophysiology Bridge',
    description:
      'USMLE Step 1 physiology coaching from AIIMS-trained specialists. Cardiovascular, renal, respiratory, endocrine, GI, neurophysiology — bridged to pathophysiology mechanism. $2,499 full programme.',
  },
}

const faqs = [
  {
    question: 'How much physiology is on USMLE Step 1?',
    answer:
      "Physiology is approximately 25% of Step 1 content when blended across organ-system sections (cardiovascular, renal, respiratory, endocrine, GI, reproductive, neurophysiology). It is the single most application-heavy content area on Step 1 — Step 1 doesn't test physiology in isolation but rather as the mechanism layer underneath every clinical vignette. Strong physiology pedagogy is therefore the highest-leverage block for Step 2 CK preparation downstream.",
  },
  {
    question: 'What reference texts does Cerebrum use for Step 1 physiology?',
    answer:
      'BRS Physiology (Linda Costanzo) is the canonical Step 1 physiology text and is used as primary reference. The full Costanzo Physiology textbook is used for depth on weak topics. First Aid Step 1 physiology sections are mapped chapter-by-chapter throughout. We do not use other generalist test-prep brands Lecture Notes Physiology (too dense for high-yield Step 1) or Guyton (too encyclopedic for Step 1 timeline). UWorld physiology blocks are walked through live for application drilling.',
  },
  {
    question: 'Which physiology topics are highest yield for Step 1?',
    answer:
      'Top 10 highest-yield Step 1 physiology topics: (1) cardiac cycle + pressure-volume loops + Frank-Starling, (2) renal clearance + GFR + tubular reabsorption + acid-base disorders, (3) respiratory gas exchange + dead space + V/Q mismatch + hypoxemia mechanisms, (4) endocrine axis feedback loops (HPA, HPT, HPG, calcium-PTH-vitamin D), (5) electrolyte and acid-base disturbances, (6) GI motility + secretion + absorption + nutrient handling, (7) neurophysiology of action potential / synaptic transmission / sensorimotor pathways, (8) reproductive cycle + HPG axis + pregnancy physiology, (9) skeletal vs cardiac vs smooth muscle contraction differences, (10) autoregulation across vascular beds.',
  },
  {
    question: 'Does Cerebrum bridge physiology to pathophysiology?',
    answer:
      "Yes — this is the core pedagogy. Step 1 doesn't ask 'what is the cardiac cycle' — it asks 'a 65-year-old with these symptoms presents with this cardiac murmur, what is the underlying mechanism?'. Answering requires physiology + pathology + biochemistry simultaneously. Cerebrum's physiology block is taught with constant pathophysiology bridging — every physiology concept is paired with the classic Step 1 vignette presentations that emerge when that mechanism fails. This is also the highest-leverage block for Step 2 CK preparation.",
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'USMLE Step 1 Physiology Preparation',
  description:
    'USMLE Step 1 physiology coaching from AIIMS-trained specialists. BRS Physiology + Costanzo + First Aid + UWorld integrated, with pathophysiology mechanism bridging.',
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
      name: 'Step 1 Physiology Module (within Full Programme)',
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
    { '@type': 'ListItem', position: 4, name: 'Physiology Module', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm preparing for USMLE Step 1 physiology specifically. Please share module details."
  )

export default function USMLEStep1PhysiologyPrepPage() {
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
            USMLE Step 1 Physiology Preparation
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            ~25% of Step 1 content when blended across organ-system sections. Cerebrum's
            biology-pedagogy approach bridges physiology to pathophysiology mechanism — the
            application layer required for Step 1 vignettes and the foundation for Step 2 CK
            success. AIIMS-trained biology specialists, BRS Physiology + Costanzo + First Aid
            mapped, UWorld physiology blocks walked through live. 5-week block within full Step 1
            programme; $175/hour ad-hoc for organ-system gap-fill.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Physiology — 5-week block</h2>
          <ul>
            <li>
              <strong>Week 1: Cardiovascular + Respiratory.</strong> Cardiac cycle, pressure-volume
              loops, Frank-Starling, baroreceptor reflex; lung volumes, ventilation-perfusion, gas
              exchange, dead space, oxygen-hemoglobin dissociation.
            </li>
            <li>
              <strong>Week 2: Renal + Acid-Base.</strong> GFR, renal clearance, tubular reabsorption
              + secretion, hormonal regulation (RAAS, ADH, ANP), acid-base disturbances +
              compensation, electrolyte handling.
            </li>
            <li>
              <strong>Week 3: Endocrine + Reproductive.</strong> HPA / HPT / HPG axes, thyroid +
              parathyroid + calcium homeostasis, adrenal cortex hormones, insulin / glucagon /
              counterregulatory hormones, reproductive cycle + pregnancy physiology.
            </li>
            <li>
              <strong>Week 4: GI + Neurophysiology.</strong> GI motility + sphincter regulation,
              secretory mechanisms, nutrient absorption, hepatic and pancreatic function; action
              potentials, synaptic transmission, autonomic vs somatic pathways, sensorimotor
              cortical organisation, basal ganglia + cerebellar circuits.
            </li>
            <li>
              <strong>Week 5: Integration + Pathophysiology Bridge.</strong> Cross-system
              integration vignettes — e.g., heart failure as a multi-system pathophysiology problem
              (cardiac + renal + neurohormonal). Step 1 vignette format drilling. First Aid + UWorld
              physiology block sprint.
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
                href="/usmle-step-1-biochemistry-prep"
                className="text-blue-600 hover:underline"
              >
                Biochemistry module
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
