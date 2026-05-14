/**
 * /first-aid-step-1-biology-tutor
 *
 * USMLE Step 1 cornerstone authority page — First Aid is the canonical
 * Step 1 review text, and "First Aid Step 1 tutor" is a long-tail
 * keyword cluster Cerebrum's biology-specialist positioning is uniquely
 * suited to own.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/first-aid-step-1-biology-tutor'

export const metadata: Metadata = {
  title: 'First Aid Step 1 Biology Tutor | Chapter-by-Chapter Mechanism Walkthroughs',
  description:
    'First Aid for the USMLE Step 1 chapter-by-chapter biology walkthroughs from AIIMS-trained specialists. Mechanism pedagogy on top of First Aid memorisation — the application layer Step 1 vignettes require.',
  keywords: [
    'first aid step 1 tutor',
    'first aid usmle step 1 tutor',
    'first aid step 1 biology tutor',
    'first aid step 1 biochemistry chapter',
    'first aid step 1 microbiology chapter',
    'first aid step 1 immunology chapter',
    'first aid step 1 physiology chapter',
    'first aid step 1 chapter walkthrough',
    'how to use first aid step 1',
    'first aid step 1 supplement',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'First Aid Step 1 Biology Tutor | Cerebrum Biology Academy',
    description:
      'Chapter-by-chapter First Aid Step 1 biology walkthroughs. Mechanism pedagogy on top of memorisation.',
    url: PAGE_URL,
    type: 'website',
  },
}

const faqs = [
  {
    question: 'Is First Aid for the USMLE Step 1 sufficient on its own?',
    answer:
      'First Aid is essential — every Cerebrum Step 1 student uses it daily and we expect this to remain true. But First Aid is a memorisation aid, not pedagogy. Students who only use First Aid often fail Step 1 because they can recall the facts but cannot apply them to a vignette. The Step 1 question stem describes a 67-year-old woman with these symptoms and labs — answering requires you to derive the mechanism, not retrieve the bullet point. Cerebrum supplements First Aid with biology-faculty walkthroughs that teach the underlying mechanism so the bullet point becomes a derivation, not a memorisation.',
  },
  {
    question: 'How does Cerebrum integrate with First Aid?',
    answer:
      'Chapter-by-chapter. Each Cerebrum live session is paired with a specific First Aid chapter (or sub-chapter). For example: First Aid Biochemistry Chapter on Glycogen Storage Disorders is paired with a Cerebrum 90-minute live session where the AIIMS-trained tutor walks through the mechanism for each disorder — what enzyme is deficient, what tissue is affected, why the clinical presentation looks the way it does, what diagnostic test confirms it. Then we work through the relevant UWorld blocks live so students see the application layer in real-time.',
  },
  {
    question: 'I have already memorised First Aid Step 1 — what does Cerebrum add?',
    answer:
      "If you can pass a 50-question NBME self-assessment with First Aid alone, you may not need Cerebrum (small minority). For most students who score below NBME Pass threshold despite First Aid memorisation, the gap is application — not content. Cerebrum's value is in two phases: (1) Application coaching — walking through how each First Aid bullet point translates into a UWorld block and an NBME self-assessment vignette; (2) Mechanism gap-fill — finding the specific biology topics where First Aid is too compressed (notably immunology, biochemistry pathways, complex physiology) and teaching them in depth.",
  },
  {
    question: 'Can Cerebrum help me read First Aid more efficiently?',
    answer:
      'Yes. The standard Cerebrum onboarding session includes a First Aid reading-strategy diagnostic — most students either read First Aid too linearly (cover-to-cover without active recall) or too disjointed (random page-flipping without retention). We teach a chapter-rotation schedule that pairs First Aid reading with active recall (Anki / flashcards) and immediate UWorld application — so each First Aid pass actually compounds rather than fading.',
  },
  {
    question: 'Does the First Aid integration cost extra?',
    answer:
      'No — First Aid integration is included free in all Cerebrum Step 1 packages (Self-Paced $799 / Small-Batch $1,599 / 1:1 Senior $2,499). Every live session is paired with a specific First Aid chapter. Students need to own a copy of the current First Aid Step 1 edition (~$60 retail) — Cerebrum does not provide it.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'First Aid Step 1 Biology Tutor — Chapter Walkthroughs',
  description:
    'First Aid for the USMLE Step 1 chapter-by-chapter biology walkthroughs from AIIMS-trained specialists. Mechanism pedagogy on top of First Aid memorisation. Integrated free across all Step 1 Biology Foundations packages.',
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
      name: 'First Aid Step 1 Integration (within Full Programme)',
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
    {
      '@type': 'ListItem',
      position: 4,
      name: 'First Aid Step 1 Biology Walkthroughs',
      item: PAGE_URL,
    },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm using First Aid for USMLE Step 1 and want to add Cerebrum's chapter walkthroughs. Please share details."
  )

export default function FirstAidStep1BiologyTutorPage() {
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
            First Aid Step 1 Biology Tutor — Chapter Walkthroughs
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            First Aid is essential — but it is a memorisation aid, not pedagogy. Students who only
            use First Aid often fail Step 1 because they can recall facts but cannot apply them to
            vignettes. Cerebrum supplements First Aid chapter-by-chapter with biology-faculty
            walkthroughs that teach the underlying mechanism, so each bullet point becomes a
            derivation rather than a memorisation. Integrated free across all Cerebrum Step 1
            packages ($799 / $1,599 / $2,499).
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
            How Cerebrum walkthroughs are paired with First Aid chapters
          </h2>
          <p>
            Each Cerebrum live session is paired with a specific First Aid chapter (or sub-chapter).
            The structure across the 4–6 month programme:
          </p>
          <ul>
            <li>
              <strong>First Aid Biochemistry chapter</strong> → 6-week Cerebrum biochemistry block
              (one live session per First Aid sub-section). Highest-yield pairing — biochemistry is
              the most internally-connected Step 1 block.
            </li>
            <li>
              <strong>First Aid Microbiology chapter</strong> → 3-week Cerebrum microbiology block,
              paired with Sketchy Microbiology mnemonic integration.
            </li>
            <li>
              <strong>First Aid Immunology chapter</strong> → 3-week Cerebrum immunology block, with
              complement / hypersensitivity / MHC / immunodeficiency drilling.
            </li>
            <li>
              <strong>First Aid organ-system chapters</strong> (Cardiology, Pulmonology, Nephrology,
              Endocrine, GI, Neuro, Reproductive) → 5-week Cerebrum physiology block, bridged to
              pathophysiology mechanism for each system.
            </li>
            <li>
              <strong>First Aid Pathology + Pharmacology chapters</strong> are not directly replaced
              by Cerebrum — students typically pair Cerebrum with Pathoma (Sattar) for pathology and
              Sketchy Pharm + First Aid for pharmacology. Cerebrum covers the biology-mechanism
              layer underneath both.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            What the standard onboarding session covers
          </h2>
          <p>
            Every new student starts with a free 30-minute diagnostic call. Standard agenda: (1)
            First Aid reading-strategy diagnostic — how are you using it currently, what's working,
            what isn't; (2) NBME self-assessment baseline review (if available); (3) UWorld error
            log spot-check (if available); (4) Track recommendation — 4-month US M1/M2 track,
            6-month IMG track, or 8-week NBME remediation arc.
          </p>

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

      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Add First Aid walkthroughs to your Step 1 prep
          </h2>
          <a
            href={wa}
            className="inline-flex bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg"
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
