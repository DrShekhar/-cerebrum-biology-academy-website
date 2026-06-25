/**
 * /dat-perceptual-ability-biology
 *
 * Cross-section page: DAT Perceptual Ability (PAT) intersected with
 * Biology — specifically the visual/spatial reasoning that benefits
 * from anatomy/physiology depth.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/dat-perceptual-ability-biology'

export const metadata: Metadata = {
  title: 'DAT Perceptual Ability + Biology | Anatomy-Bridged PAT Coaching',
  description:
    'DAT Perceptual Ability (PAT) reasoning paired with biology anatomy depth — keyhole, top-front-end, angle ranking and pattern folding taught via vertebrate anatomy visualisation. Pre-dental specialist programme.',
  keywords: [
    'DAT perceptual ability biology',
    'DAT PAT biology',
    'DAT PAT anatomy visualisation',
    'DAT keyhole biology',
    'DAT spatial reasoning biology',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'DAT PAT + Biology | Cerebrum Biology Academy',
    description: 'DAT Perceptual Ability taught alongside anatomy/physiology visualisation.',
    url: PAGE_URL,
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'DAT Perceptual Ability + Biology | Anatomy-Bridged PAT Coaching',
    description:
      'DAT Perceptual Ability (PAT) reasoning paired with biology anatomy depth — keyhole, top-front-end, angle ranking and pattern folding taught via vertebrate anatomy visualisation. Pre-dental speciali...',
  },
}

const faqs = [
  {
    question: 'Why teach DAT Perceptual Ability (PAT) alongside Biology?',
    answer:
      'DAT PAT tests spatial reasoning through six question types: keyhole, top-front-end, angle ranking, hole punching, cube counting, and pattern folding. Vertebrate anatomy — a major DAT Biology block — develops the same 3D mental rotation skill, because students must visualise organ position, blood flow paths, and skeletal articulation across multiple planes. Cerebrum students who interleave PAT drilling with anatomy/physiology study report 1–2 point PAT gains over students who silo-train each section.',
  },
  {
    question: 'Does Cerebrum offer DAT PAT as a standalone section?',
    answer:
      'No — Cerebrum is a biology specialist. We do not coach PAT as a standalone product. We do offer PAT instruction as a complementary module within the DAT Biology Small-Batch and 1:1 programmes, taught through anatomy visualisation drills. Students wanting a pure PAT bootcamp should use other generalist DAT prep platforms or other generalist DAT prep platforms alongside our Biology programme.',
  },
  {
    question: 'What anatomy structures help PAT visualisation?',
    answer:
      "The highest-transfer structures are: (1) the heart and great vessels — chamber cross-sections in coronal, sagittal, and transverse planes train top-front-end style reasoning; (2) the brachial plexus and major nerve pathways — angle ranking visualisation; (3) skull foramina and cranial nerve exits — keyhole-style 3D from 2D inference; (4) gastrointestinal tract organ position — pattern folding from 2D embryological diagrams to 3D adult anatomy. We use Netter and Gray's for the visualisation drills.",
  },
  {
    question: 'How is the PAT module priced?',
    answer:
      'The PAT module is included free for Small-Batch and 1:1 Senior Faculty Biology programme students. Approximately 8 hours of PAT drilling is interleaved across the 3–5 month programme, focused on the highest-transfer skills (keyhole, top-front-end). Students wanting deeper PAT-specific drill should add other generalist DAT prep platforms ($795).',
  },
]

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
    { '@type': 'ListItem', position: 3, name: 'DAT Perceptual Ability + Biology', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm interested in DAT Perceptual Ability training alongside biology anatomy. Please share details."
  )

export default function DATPATBiologyPage() {
  return (
    <main className="min-h-screen bg-white">
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
            DAT Perceptual Ability + Biology Anatomy Visualisation
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            DAT PAT (Perceptual Ability Test) shares its core skill — 3D mental rotation from 2D
            cues — with vertebrate anatomy visualisation. Cerebrum teaches PAT as a complementary
            module within the Biology programme, using high-yield anatomy structures (heart
            chambers, cranial nerve foramina, skeletal articulation) as the visualisation substrate.
            Included free in Small-Batch and 1:1 Senior Faculty Biology tiers.
          </p>
          <p className="text-base text-slate-400 mb-6 max-w-3xl">
            Live online in your US time zone (ET/CT/MT/PT); pricing in USD.
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
            The six DAT PAT question types and their biology bridges
          </h2>
          <ul>
            <li>
              <strong>Keyhole (View) — 15 questions.</strong> Identify which 3D object fits through
              a 2D slot. Bridge: skull foramen / cranial nerve exit visualisation — same logic of
              inferring 3D shape from 2D opening.
            </li>
            <li>
              <strong>Top-Front-End (TFE) — 15 questions.</strong> Match 3D object to 2D
              projections. Bridge: heart chamber cross-section across coronal/sagittal/transverse
              planes — students learn projection by drawing the same heart from three angles.
            </li>
            <li>
              <strong>Angle Ranking — 15 questions.</strong> Rank four angles from smallest to
              largest. Bridge: brachial plexus and major peripheral nerve angle visualisation.
            </li>
            <li>
              <strong>Hole Punching — 15 questions.</strong> Predict hole pattern after folding and
              punching. Bridge: embryological folding (neural tube, gut tube) — directly analogous
              fold-and-result inference.
            </li>
            <li>
              <strong>Cube Counting — 15 questions.</strong> Count painted-face cubes in 3D
              arrangement. Bridge: vertebral column counting (cervical 7, thoracic 12, lumbar 5,
              sacral 5 fused, coccygeal 4 fused) trains the same systematic enumeration.
            </li>
            <li>
              <strong>Pattern Folding — 15 questions.</strong> Identify 3D shape from 2D unfolded
              net. Bridge: 2D embryological diagram → 3D adult organ position. The single
              highest-transfer biology bridge in the PAT.
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
                DAT Biology programme
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
