/**
 * /gamsat-biology-tutor-sydney
 *
 * GAMSAT Section III biology city page — Sydney. Largest Australian
 * GAMSAT applicant cluster (Sydney Medical School, UNSW, Macquarie,
 * Western Sydney, Notre Dame Sydney, Wollongong).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/gamsat-biology-tutor-sydney'

export const metadata: Metadata = {
  title: 'GAMSAT Biology Tutor Sydney | USyd, UNSW, Macquarie, Western Sydney',
  description:
    'GAMSAT Section III biology tutor for Sydney graduate medicine applicants — Sydney Medical School, UNSW, Macquarie, Western Sydney, Notre Dame Sydney. AIIMS-trained biology specialists, AEST/AEDT evening slots. From A$799.',
  keywords: [
    'GAMSAT biology tutor Sydney',
    'GAMSAT tutor USyd',
    'GAMSAT tutor UNSW',
    'GAMSAT tutor Macquarie',
    'graduate medicine tutor Sydney',
    'Australian graduate medicine GAMSAT',
    'GAMSAT Sydney September sitting',
    'GAMSAT Sydney Section III',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'GAMSAT Biology Tutor Sydney | Cerebrum Biology Academy',
    description:
      'GAMSAT biology tutoring for Sydney graduate medicine applicants. AIIMS-trained faculty, AEST evenings, A$799–A$2,399.',
    url: PAGE_URL,
    locale: 'en_AU',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'GAMSAT Biology Tutor Sydney | USyd, UNSW, Macquarie, Western Sydney',
    description:
      'GAMSAT Section III biology tutor for Sydney graduate medicine applicants — Sydney Medical School, UNSW, Macquarie, Western Sydney, Notre Dame Sydney. AIIMS-trained biology specialists, AEST/AEDT ev...',
  },
}

const faqs = [
  {
    question:
      'Will AEST evening sessions fit a Sydney working professional preparing for graduate medicine?',
    answer:
      'Yes. Sydney small-batch slots run AEST/AEDT evenings — typically 7:30 PM to 9:30 PM on weekdays, with weekend morning options. Built around the schedule of NSW Health staff (junior doctors, allied health professionals), University of Sydney / UNSW / Macquarie final-year undergraduates with daytime clinicals, and career-changers in tech / finance / consulting. Senior Faculty 1:1 flexes to 9:00 PM or 10:00 PM starts.',
  },
  {
    question: 'Do you coach Sydney Medical School / UNSW / Macquarie graduate medicine applicants?',
    answer:
      'Yes. Sydney Medical School Graduate Entry (USyd MD), UNSW Sydney Medicine, Macquarie MD, Western Sydney University MD, Notre Dame Sydney MD, and University of Wollongong MD all use GAMSAT as a primary entry metric. The cut-off varies by school — competitive Sydney MD applicants typically need GAMSAT 70+ with Section III 65+. Our 1:1 Senior Faculty programme is calibrated to that target band.',
  },
  {
    question: 'When is the Sydney GAMSAT sitting and when should I start prep?',
    answer:
      'The September Australian GAMSAT sitting is the dominant Sydney cycle (registration typically opens in June, sitting in early-mid September). Start the content phase 4 months out for biology-major candidates (May start for September), 6 months out for non-biology backgrounds (March start). The March sitting is a smaller secondary option, primarily for retake candidates or those targeting mid-year admissions.',
  },
  {
    question:
      'I am a working professional in Sydney from a non-biology background — does this fit?',
    answer:
      'Yes. Approximately 40% of Australian GAMSAT candidates have non-biology undergraduate degrees (Sydney has heavy representation from finance, consulting, engineering, IT, allied health). Cerebrum starts Campbell Biology from chapter 1 — no A-level / HSC biology baseline assumed. Non-biology candidates typically use the 6-month programme and report jumping from Section III baseline 55 to 65+ over the programme.',
  },
  {
    question:
      'How does Cerebrum compare to other generalist GAMSAT brands Australia for a Sydney applicant?',
    answer:
      'other generalist GAMSAT brands and other generalist GAMSAT brands are full GAMSAT generalist programmes covering all three sections (A$3,000+ each). Cerebrum is a Section III biology specialist — we cover the biology component in depth (A$2,399 1:1 full programme, A$215/hour ad-hoc) and most Sydney applicants pair us with other generalist GAMSAT brands for Sections I and II.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'GAMSAT Biology Tutor for Sydney Graduate Medicine Applicants',
  description:
    'GAMSAT Section III biology section tutoring for Sydney graduate medicine applicants — USyd, UNSW, Macquarie, Western Sydney, Notre Dame Sydney, Wollongong. AIIMS-trained biology specialists, Campbell + Pre-U curriculum, AEST/AEDT evening slots.',
  url: PAGE_URL,
  inLanguage: 'en-AU',
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
    name: 'Sydney (USyd, UNSW, Macquarie, Western Sydney, Notre Dame, Wollongong)',
    address: { '@type': 'PostalAddress', addressLocality: 'Sydney', addressCountry: 'AU' },
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
        price: '799',
        priceCurrency: 'AUD',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'GAMSAT Section III Biology Small-Batch (4–6 students)',
        price: '1599',
        priceCurrency: 'AUD',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'GAMSAT Section III Biology 1:1 Senior Faculty',
        price: '2399',
        priceCurrency: 'AUD',
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
    { '@type': 'ListItem', position: 3, name: 'Sydney', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm a Sydney graduate medicine applicant preparing for GAMSAT Section III. Please share Biology programme details and AEST evening slots."
  )

export default function GAMSATBiologyTutorSydneyPage() {
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
            <span className="text-white">Sydney</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            GAMSAT Biology Tutor for Sydney Graduate Medicine Applicants
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            GAMSAT Section III biology coaching for graduate medicine applicants to USyd MD, UNSW
            Medicine, Macquarie MD, Western Sydney MD, Notre Dame Sydney MD, and University of
            Wollongong MD — plus broader NSW. Built for NSW Health staff retraining, post-PhD
            scientists, and career-changers from tech / finance / consulting. AIIMS-trained biology
            specialists, Campbell + Pre-U curriculum, AEST/AEDT evening sessions. A$799 self-paced
            through A$2,399 senior 1:1, with A$215/hour ad-hoc.
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
            Sydney is the largest Australian GAMSAT applicant cluster
          </h2>
          <p>
            Six Sydney-region graduate medical programmes (Sydney MD, UNSW Sydney Medicine,
            Macquarie MD, Western Sydney MD, Notre Dame Sydney MD, Wollongong MD) anchor the largest
            concentration of Australian GAMSAT applicants. NSW Health staff retraining, post-PhD
            scientists, and career-changers from Sydney's tech and finance sectors make up the
            majority of the working-professional cohort.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Sydney graduate medicine programmes we coach for
          </h2>
          <ul>
            <li>
              <strong>The University of Sydney — Doctor of Medicine (MD)</strong> graduate entry —
              typical competitive cut-off GAMSAT 70+.
            </li>
            <li>
              <strong>UNSW Sydney — Medicine</strong> — primarily undergraduate but GAMSAT used for
              some graduate-route applicants.
            </li>
            <li>
              <strong>Macquarie University — MD</strong> — graduate-entry MD launched as one of the
              newer programmes.
            </li>
            <li>
              <strong>Western Sydney University — MD</strong> — graduate-entry MD using GAMSAT.
            </li>
            <li>
              <strong>University of Notre Dame Sydney — MD</strong> — graduate-entry MD.
            </li>
            <li>
              <strong>University of Wollongong — MD</strong> — graduate-entry MD using GAMSAT,
              regional focus.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">GAMSAT Biology pricing</h2>
          <ul>
            <li>
              <strong>Self-Paced — A$799</strong> full 4–6 month programme.
            </li>
            <li>
              <strong>Small-Batch — A$1,599</strong>, weekly 2-hour live sessions, monthly Section
              III mocks.
            </li>
            <li>
              <strong>1:1 Senior Faculty — A$2,399</strong> full programme.
            </li>
            <li>
              <strong>Ad-hoc 1:1 — A$215/hour</strong>.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Sydney applicants</h2>
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
            Start GAMSAT Section III prep from Sydney
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
