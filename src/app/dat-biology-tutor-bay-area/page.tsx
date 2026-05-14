/**
 * /dat-biology-tutor-bay-area
 *
 * DAT Biology city page — SF Bay Area. UCSF Dental, UoP Arthur Dugoni
 * SoD (SF campus + Stockton), Touro University Dental (Vallejo) are the
 * dominant local dental schools. Heavy Indian-American pre-dental cohort
 * in Cupertino/Fremont/San Jose.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/dat-biology-tutor-bay-area'

export const metadata: Metadata = {
  title: 'DAT Biology Tutor Bay Area | UCSF, Pacific, Berkeley, Stanford',
  description:
    'DAT Biology tutor for Bay Area pre-dental students — UC Berkeley, Stanford, UCSF, Pacific, San Jose State. AIIMS-trained biology specialists, PT evening slots. From $449.',
  keywords: [
    'DAT biology tutor Bay Area',
    'DAT tutor San Francisco',
    'DAT tutor Cupertino',
    'DAT tutor Fremont',
    'DAT tutor San Jose',
    'pre-dental tutor UC Berkeley',
    'DAT biology UCSF',
    'Indian American DAT tutor Bay Area',
    'DAT Pacific Dugoni dental',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'DAT Biology Tutor Bay Area | Cerebrum Biology Academy',
    description:
      'DAT Biology tutoring for Bay Area pre-dental students. AIIMS-trained faculty, PT evenings, $449–$1,399.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'Will PT evening sessions fit a UC Berkeley / Stanford pre-dental schedule?',
    answer:
      'Yes. Bay Area small-batch slots run Pacific Time evenings — typically 7:30 PM to 9:30 PM PT on weekdays, with weekend morning options. Built around UC Berkeley MCB / IB / Bio Sci course loads (Cell Biology 100A, Genetics 102, Biochem 110, plus orgo and physics labs). Stanford Biology / Human Biology majors with later afternoon labs use the 8:30 PM PT slot. Senior Faculty 1:1 has flexibility for 9 PM or 10 PM PT starts.',
  },
  {
    question: 'Do you coach UCSF School of Dentistry applicants?',
    answer:
      'Yes. UCSF SoD is the most competitive US dental school by DAT score (mean Bio 23, AA 24). Most UCSF applicants from Bay Area pre-dental programmes (Berkeley, Stanford, UC Davis, San Jose State) target a 24+ Bio score. Our 1:1 Senior Faculty programme is calibrated to that target band.',
  },
  {
    question:
      'My family is in Cupertino / Fremont / San Jose — how does payment and faculty access work?',
    answer:
      'Payment is in USD via card, ACH, or international wire. Faculty led by Dr. Shekhar C Singh (AIIMS Delhi); senior faculty fluent in English and Hindi (and several in Telugu, Tamil for South Indian families). All sessions online — no commute to a tutoring center. Parents typically attend the diagnostic and milestone check-ins; sessions otherwise direct student-tutor via Zoom + WhatsApp.',
  },
  {
    question: 'How does Cerebrum compare to Kaplan DAT or DAT Bootcamp for a Bay Area pre-dental?',
    answer:
      'Kaplan DAT Live is $2,599 — full-DAT generalist with rotating faculty. DAT Bootcamp Pro is $795 — primarily a question-bank platform. Cerebrum is a biology-only specialist — we cover the Biology section deeply ($1,399 1:1, $135/hr ad-hoc) and most Bay Area students pair us with DAT Bootcamp for drill volume. For UCSF aspirants targeting 24+ Bio, 1:1 with senior faculty is the standard recommendation.',
  },
  {
    question: 'When should a Bay Area pre-dental student start DAT Biology prep?',
    answer:
      'For a spring or summer DAT date, start the content phase 4 months out for Berkeley/Stanford students with strong AP Biology foundation, 5 months out for SJSU or non-bio-major pre-dental students, and 3 months out for gap-year students doing intensive sprint prep. The Self-Paced track is commonly used in parallel with junior-year coursework, then Small-Batch or 1:1 for the final 8–10 weeks.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'DAT Biology Tutor for Bay Area Students',
  description:
    'DAT Biology section tutoring for Bay Area pre-dental students — UC Berkeley, Stanford, UCSF, UoP, San Jose State. AIIMS-trained biology specialists, Campbell + ADA outline curriculum, PT evening slots.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  educationalLevel: 'Pre-Dental',
  educationalCredentialAwarded: 'DAT Biology Section Preparation',
  provider: {
    '@type': 'EducationalOrganization',
    '@id': 'https://cerebrumbiologyacademy.com/#organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'San Francisco Bay Area (Berkeley, Stanford, Cupertino, Fremont, San Jose)',
    address: { '@type': 'PostalAddress', addressRegion: 'CA', addressCountry: 'US' },
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    courseWorkload: 'PT2H',
    location: { '@type': 'VirtualLocation', url: PAGE_URL },
    offers: [
      {
        '@type': 'Offer',
        name: 'DAT Biology Self-Paced',
        price: '449',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'DAT Biology Small-Batch (4–6 students)',
        price: '899',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'DAT Biology 1:1 Senior Faculty',
        price: '1399',
        priceCurrency: 'USD',
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
      name: 'DAT Biology Preparation',
      item: 'https://cerebrumbiologyacademy.com/dat-biology-preparation',
    },
    { '@type': 'ListItem', position: 3, name: 'Bay Area', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm a Bay Area pre-dental student (or parent of one) preparing for the DAT. Please share Biology programme details and PT evening slots."
  )

export default function DATBiologyTutorBayAreaPage() {
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
            <Link href="/dat-biology-preparation" className="hover:text-white">
              DAT Biology Preparation
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Bay Area</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            DAT Biology Tutor for Bay Area Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            DAT Biology section coaching for pre-dental students at UC Berkeley, Stanford, UCSF
            pre-health post-bacc, UoP, San Jose State, UC Davis — plus the Cupertino / Fremont / San
            Jose Indian-American pre-dental corridor. AIIMS-trained biology specialists, Campbell
            Biology + ADA outline mapping, PT evening sessions. $449 self-paced through $1,399
            senior 1:1, with $135/hour ad-hoc tutoring.
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
            Bay Area dental school landscape
          </h2>
          <p>
            Three local US dental schools: UCSF School of Dentistry (one of the most competitive in
            the country, mean DAT 24 AA), University of the Pacific Arthur Dugoni School of
            Dentistry (San Francisco campus, three-year accelerated), and Touro University Dental
            College (Vallejo). UCLA and Loma Linda are within state for Southern California
            applicants. Bay Area pre-dental students typically apply broadly — UCSF, UoP, plus
            out-of-state allopathic options.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-dental feeders we coach in the Bay Area
          </h2>
          <ul>
            <li>
              <strong>UC Berkeley</strong> — primary feeder to UCSF; MCB, IB, Public Health
              pre-dental tracks.
            </li>
            <li>
              <strong>Stanford</strong> — Biology, Human Biology majors; smaller pre-dental cohort
              than pre-med.
            </li>
            <li>
              <strong>UC Davis</strong> — within commute; strong pre-dental cohort.
            </li>
            <li>
              <strong>San Jose State</strong> — biology pre-dental track; heavy Indian-American
              representation.
            </li>
            <li>
              <strong>UC Santa Cruz</strong> — MCD Biology pre-dental.
            </li>
            <li>
              <strong>Santa Clara University</strong> — Biology pre-health.
            </li>
            <li>
              <strong>UoP pre-dental track</strong> — students applying to UoP Dugoni 3-year
              programme directly.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            DAT Biology pricing (USD)
          </h2>
          <ul>
            <li>
              <strong>Self-Paced — $449</strong> full 3–5 month programme.
            </li>
            <li>
              <strong>Small-Batch — $899</strong>, weekly 2-hour live sessions, monthly section
              mocks.
            </li>
            <li>
              <strong>1:1 Senior Faculty — $1,399</strong> full programme.
            </li>
            <li>
              <strong>Ad-hoc 1:1 — $135/hour</strong>.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Bay Area families</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer">
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
            Start DAT Biology prep from Bay Area
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
    </main>
  )
}
