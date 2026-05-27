/**
 * /gamsat-biology-tutor-london
 *
 * GAMSAT Section III biology city page — London. Largest UK GAMSAT
 * applicant cluster (Imperial, KCL, UCL, St George's, Barts, Brunel,
 * SGUL graduate medicine).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/gamsat-biology-tutor-london'

export const metadata: Metadata = {
  title: "GAMSAT Biology Tutor London | Imperial, KCL, UCL, St George's",
  description:
    "GAMSAT Section III biology tutor for London graduate medicine applicants — Imperial, KCL, UCL, St George's, Barts. AIIMS-trained biology specialists, GMT evening slots. From £399.",
  keywords: [
    'GAMSAT biology tutor London',
    'GAMSAT tutor Imperial',
    'GAMSAT tutor KCL',
    'GAMSAT tutor UCL',
    "GAMSAT tutor St George's",
    'graduate medicine tutor London',
    'UK graduate medicine GAMSAT',
    'GAMSAT London March sitting',
    'GAMSAT London Section III',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'GAMSAT Biology Tutor London | Cerebrum Biology Academy',
    description:
      'GAMSAT biology tutoring for London graduate medicine applicants. AIIMS-trained faculty, GMT evenings, £399–£1,249.',
    url: PAGE_URL,
    locale: 'en_GB',
    type: 'website',
  },

  twitter: { card: 'summary_large_image' as const },
}

const faqs = [
  {
    question:
      'Will GMT evening sessions fit a working professional preparing for graduate medicine?',
    answer:
      'Yes — this is our default London cohort scheduling assumption. Most UK GAMSAT candidates are working professionals (junior doctors retraining, allied health professionals, finance/consulting/law leavers, post-PhD scientists) or final-year undergraduates with daytime commitments. London small-batch slots run GMT evenings — typically 7:30 PM to 9:30 PM on weekdays, with weekend morning options. Senior Faculty 1:1 flexes to 9:00 PM or 10:00 PM starts.',
  },
  {
    question: 'Do you coach Imperial / KCL / UCL graduate medicine applicants specifically?',
    answer:
      "Yes. The four-year graduate-entry medicine programmes in London — Imperial GEP, KCL Maxillofacial-aligned MBBS-Graduate route, St George's MBBS-Graduate, Barts MBBS-Graduate, plus the SGUL and Brunel programmes — all use GAMSAT score with varying weightings. We coach the GAMSAT Section III biology component specifically; the cut-off for these programmes is typically GAMSAT 65+ with Section III 65+.",
  },
  {
    question: 'When is the London GAMSAT sitting and when should I start prep?',
    answer:
      'The UK GAMSAT March sitting is the dominant London cycle (registration typically opens in November, sitting in late March). Start the content phase 4 months out for biology-major candidates (December start for March), 6 months out for non-biology backgrounds (October start). The September UK sitting is a smaller secondary option, primarily for retake candidates.',
  },
  {
    question: 'I am a junior doctor / NHS professional retraining — does this programme fit?',
    answer:
      'Yes. A meaningful share of our London cohort are NHS staff (FY1/FY2 doctors, dentists, nurses, pharmacists) retraining or upskilling for graduate medical entry or specialty transitions. Sessions are recorded for shift-work flexibility, and senior faculty office hours are accessible asynchronously. WhatsApp doubt support is responsive to shift-pattern hours.',
  },
  {
    question:
      'How does Cerebrum compare to other generalist GAMSAT brands or Griffiths for a London applicant?',
    answer:
      'other generalist GAMSAT brands is £1,995+ — full GAMSAT generalist covering all three sections with rotating faculty. other generalist GAMSAT brands is similar in scope and price. Cerebrum is a Section III biology specialist — we cover the biology component in depth (£1,249 1:1 full programme, £110/hr ad-hoc) and most London applicants pair us with other generalist GAMSAT brands for Sections I and II.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'GAMSAT Biology Tutor for London Graduate Medicine Applicants',
  description:
    "GAMSAT Section III biology section tutoring for London graduate medicine applicants — Imperial, KCL, UCL, St George's, Barts. AIIMS-trained biology specialists, Campbell + Pre-U curriculum, GMT evening slots.",
  url: PAGE_URL,
  inLanguage: 'en-GB',
  educationalLevel: 'Graduate-Entry Medicine Aspirant',
  educationalCredentialAwarded: 'GAMSAT Section III Biology Preparation',
  provider: {
    '@type': 'EducationalOrganization',
    '@id': 'https://cerebrumbiologyacademy.com/#organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: "London (Imperial, KCL, UCL, St George's, Barts, Brunel)",
    address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    courseWorkload: 'PT2H',
    location: { '@type': 'VirtualLocation', url: PAGE_URL },
    offers: [
      {
        '@type': 'Offer',
        name: 'GAMSAT Section III Biology Self-Paced',
        price: '399',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'GAMSAT Section III Biology Small-Batch (4–6 students)',
        price: '799',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'GAMSAT Section III Biology 1:1 Senior Faculty',
        price: '1249',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
    ],
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
      name: 'GAMSAT Section III Biology',
      item: 'https://cerebrumbiologyacademy.com/gamsat-section-3-biology-prep',
    },
    { '@type': 'ListItem', position: 3, name: 'London', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm a London graduate medicine applicant preparing for GAMSAT Section III. Please share Biology programme details and GMT evening slots."
  )

export default function GAMSATBiologyTutorLondonPage() {
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
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/gamsat-section-3-biology-prep" className="hover:text-white">
              GAMSAT Section III Biology
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">London</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            GAMSAT Biology Tutor for London Graduate Medicine Applicants
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            GAMSAT Section III biology coaching for graduate medicine applicants to Imperial, KCL,
            UCL, St George's, Barts, Brunel, SGUL — plus the wider south-east UK cohort. Built for
            working NHS professionals, post-PhD scientists, and career-changers from finance /
            consulting / law. AIIMS-trained biology specialists, Campbell + Pre-U curriculum, GMT
            evening sessions. £399 self-paced through £1,249 senior 1:1, with £110/hour ad-hoc.
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
            London is the largest UK GAMSAT applicant cluster
          </h2>
          <p>
            Six London graduate-entry medical programmes (Imperial GEP, KCL, UCL, St George's,
            Barts, plus St George's GEP and Brunel medicine) account for roughly half of UK graduate
            medicine intake. London is also home to the largest concentration of UK NHS staff
            retraining and the largest concentration of career-changers in the GAMSAT applicant pool
            — a population structurally different from undergraduate medicine applicants.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            London graduate medicine programmes we coach for
          </h2>
          <ul>
            <li>
              <strong>Imperial College London — Graduate Entry Programme (GEP)</strong> — uses
              GAMSAT score with a high cut-off (typically GAMSAT 70+ to be competitive).
            </li>
            <li>
              <strong>King's College London — MBBS</strong> graduate route, accepts GAMSAT among
              other entry routes.
            </li>
            <li>
              <strong>University College London (UCL) — MBBS</strong> graduate route.
            </li>
            <li>
              <strong>St George's, University of London — MBBS Graduate</strong> — long-running
              GAMSAT programme, typical cut-off GAMSAT 65+.
            </li>
            <li>
              <strong>Barts &amp; The London — MBBS</strong> graduate route.
            </li>
            <li>
              <strong>Brunel University London</strong> — newer graduate medicine programme.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">GAMSAT Biology pricing</h2>
          <ul>
            <li>
              <strong>Self-Paced — £399</strong> full 4–6 month programme.
            </li>
            <li>
              <strong>Small-Batch — £799</strong>, weekly 2-hour live sessions, monthly Section III
              mocks.
            </li>
            <li>
              <strong>1:1 Senior Faculty — £1,249</strong> full programme.
            </li>
            <li>
              <strong>Ad-hoc 1:1 — £110/hour</strong>.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from London applicants</h2>
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
            Start GAMSAT Section III prep from London
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
