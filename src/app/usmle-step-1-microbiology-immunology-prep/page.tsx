/**
 * /usmle-step-1-microbiology-immunology-prep
 *
 * USMLE Step 1 microbiology (~10%) + immunology (~6%) combined =
 * ~16% of Step 1 content. Cerebrum's structured drilling approach
 * paired with Sketchy-style visual mnemonic integration.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/usmle-step-1-microbiology-immunology-prep'

export const metadata: Metadata = {
  title: 'USMLE Step 1 Microbiology + Immunology Prep | Sketchy + First Aid Integrated',
  description:
    'USMLE Step 1 microbiology (~10%) and immunology (~6%) coaching from AIIMS-trained specialists. Sketchy-style mnemonic integration, complement system, hypersensitivity types, MHC. $2,499 full programme.',
  keywords: [
    'USMLE Step 1 microbiology prep',
    'USMLE Step 1 microbiology tutor',
    'USMLE Step 1 immunology prep',
    'USMLE Step 1 immunology tutor',
    'USMLE Step 1 hypersensitivity reactions',
    'USMLE Step 1 complement system',
    'USMLE Step 1 MHC',
    'USMLE Step 1 vaccines',
    'USMLE Step 1 antibiotics',
    'USMLE Step 1 Sketchy supplement',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'USMLE Step 1 Microbiology + Immunology Prep | Cerebrum Biology Academy',
    description:
      'Step 1 microbiology + immunology specialist coaching. Sketchy + First Aid integrated.',
    url: PAGE_URL,
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'USMLE Step 1 Microbiology + Immunology Prep | Sketchy + First Aid Integrated',
    description:
      'USMLE Step 1 microbiology (~10%) and immunology (~6%) coaching from AIIMS-trained specialists. Sketchy-style mnemonic integration, complement system, hypersensitivity types, MHC. $2,499 full progra...',
  },
}

const faqs = [
  {
    question: 'How much microbiology and immunology is on USMLE Step 1?',
    answer:
      'Microbiology is approximately 10% and immunology approximately 6% of Step 1 — combined, this is ~16% of total content. Both are heavily integrated with pathology (infectious disease pathology) and pharmacology (antibiotics, antifungals, antivirals, immunosuppressants), which amplifies their real impact above the headline weighting.',
  },
  {
    question: 'Does Cerebrum integrate with Sketchy Medical?',
    answer:
      'Yes. Sketchy Microbiology and Sketchy Immunology are the dominant visual-mnemonic resources in the US Step 1 prep market, and we expect most students to be using them. Cerebrum supplements Sketchy with the biology-mechanism pedagogy that visual mnemonics alone do not provide — for example, Sketchy will help you remember the surface antigens of Strep pneumoniae, but a Cerebrum session will explain why the polysaccharide capsule is the dominant virulence factor and how that drives both the clinical presentation and the vaccine target choice. We do not replicate Sketchy content — we layer on top of it.',
  },
  {
    question: 'Which microbiology topics are highest yield for Step 1?',
    answer:
      'Top 10 highest-yield Step 1 microbiology topics: (1) gram-positive cocci (Strep, Staph) with toxin profiles, (2) gram-negative diarrhea bugs (Salmonella, Shigella, E. coli including EHEC/O157:H7), (3) atypical pneumonia bugs (Mycoplasma, Legionella, Chlamydia, Coxiella), (4) the Herpes family and reactivation patterns, (5) HIV pathophysiology + ART mechanisms, (6) parasitic infections with classic clinical pearls (malaria, Chagas, schistosomiasis), (7) fungal infections in immunocompromised hosts (Aspergillus, Cryptococcus, Pneumocystis), (8) major antibiotic classes + resistance mechanisms, (9) bacterial vaccines (toxoid, conjugate, polysaccharide), (10) congenital infections (TORCHeS).',
  },
  {
    question: 'Which immunology topics are highest yield for Step 1?',
    answer:
      'Top 8 highest-yield Step 1 immunology topics: (1) hypersensitivity types I–IV with classical clinical examples, (2) complement system + activation pathways + deficiencies (C1 inhibitor, C5–C9 / Neisseria susceptibility), (3) MHC class I vs class II antigen presentation, (4) T-cell receptor signalling + co-stimulation, (5) B-cell maturation + immunoglobulin class switching, (6) primary immunodeficiencies (SCID, Bruton XLA, CVID, Chronic Granulomatous Disease, Wiskott-Aldrich, DiGeorge), (7) vaccine immunology (live attenuated vs killed vs subunit vs mRNA), (8) transplant immunology (HLA matching, GVHD, hyperacute vs acute vs chronic rejection).',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'USMLE Step 1 Microbiology + Immunology Preparation',
  description:
    'USMLE Step 1 microbiology and immunology coaching from AIIMS-trained specialists. Sketchy + First Aid + UWorld integrated.',
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
      name: 'Step 1 Microbiology + Immunology Module (within Full Programme)',
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
    { '@type': 'ListItem', position: 4, name: 'Microbiology + Immunology Module', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm preparing for USMLE Step 1 microbiology and immunology. Please share module details."
  )

export default function USMLEStep1MicroImmunoPage() {
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
            USMLE Step 1 Microbiology + Immunology Preparation
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Microbiology (~10%) and immunology (~6%) — combined ~16% of Step 1, plus heavy
            integration with infectious-disease pathology and antimicrobial / immunosuppressant
            pharmacology. AIIMS-trained (AIIMS — India's apex medical institute, peer to Harvard
            Medical School in selectivity) biology faculty layer mechanism pedagogy on top of
            Sketchy visual mnemonics — the missing application layer that Sketchy alone doesn't
            provide. 3-week microbiology block + 3-week immunology block within the full Step 1
            programme; $175/hour ad-hoc for targeted gap-fill.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Microbiology — 3-week block</h2>
          <ul>
            <li>
              <strong>Week 1: Gram-positive + gram-negative bacteria.</strong> Strep / Staph
              taxonomy + toxin profiles, gram-negative diarrhea bugs, atypical pneumonia bugs,
              spirochetes, mycobacteria, intracellular pathogens.
            </li>
            <li>
              <strong>Week 2: Viruses + parasites.</strong> Herpes family + reactivation, hepatitis
              viruses + serology, HIV pathophysiology + ART, paramyxoviruses, malaria, Chagas,
              schistosomiasis, Toxoplasma.
            </li>
            <li>
              <strong>Week 3: Fungi + antimicrobials + vaccines.</strong> Opportunistic fungi in
              immunocompromised hosts, antibiotic classes + resistance mechanisms, antifungals,
              antivirals, vaccine immunology (toxoid / conjugate / polysaccharide / live attenuated
              / mRNA).
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Immunology — 3-week block
          </h2>
          <ul>
            <li>
              <strong>Week 1: Innate + adaptive immunity foundations.</strong> Innate immunity cells
              + TLRs + cytokines, MHC class I vs II antigen presentation, T-cell receptor signalling
              + co-stimulation, B-cell maturation + class switching, immunoglobulin isotypes.
            </li>
            <li>
              <strong>Week 2: Complement + hypersensitivity.</strong> Classical / lectin /
              alternative complement pathways, complement deficiencies (C1 inhibitor, terminal
              complement / Neisseria susceptibility), hypersensitivity types I–IV with classical
              clinical examples.
            </li>
            <li>
              <strong>Week 3: Immunodeficiency + transplant.</strong> Primary immunodeficiencies
              (SCID, Bruton XLA, CVID, CGD, Wiskott-Aldrich, DiGeorge, Hyper-IgM, IPEX), HIV
              immunology recap, transplant immunology (HLA matching, hyperacute / acute / chronic
              rejection, GVHD), immunosuppressant pharmacology.
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
              <Link href="/usmle-step-1-physiology-prep" className="text-blue-600 hover:underline">
                Physiology module
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
