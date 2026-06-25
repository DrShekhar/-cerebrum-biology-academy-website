/**
 * /dat-biology-tutor-new-jersey
 *
 * DAT Biology city page — New Jersey metro. NJ has Rutgers Dental,
 * NYU Dental nearby, and a heavy Indian-American pre-dental cohort
 * in Middlesex/Mercer/Hudson counties.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/dat-biology-tutor-new-jersey'

export const metadata: Metadata = {
  title: 'DAT Biology Tutor New Jersey | Rutgers, NYU, Edison, Jersey City',
  description:
    'DAT Biology tutor for New Jersey pre-dental students — Rutgers, TCNJ, NJIT, Edison, Iselin, Jersey City. AIIMS-trained biology specialists, ET evening slots. From $449.',
  keywords: [
    'DAT biology tutor New Jersey',
    'DAT biology tutor Rutgers',
    'DAT biology tutor Edison NJ',
    'DAT tutor Iselin NJ',
    'DAT tutor Jersey City',
    'pre-dental tutor New Jersey',
    'Indian American DAT tutor NJ',
    'DAT biology Rutgers Dental',
    'DAT NJ tutor',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'DAT Biology Tutor New Jersey | Cerebrum Biology Academy',
    description:
      'DAT Biology tutoring for NJ pre-dental students. AIIMS-trained faculty, ET evenings, $449–$1,399.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'DAT Biology Tutor New Jersey | Rutgers, NYU, Edison, Jersey City',
    description:
      'DAT Biology tutor for New Jersey pre-dental students — Rutgers, TCNJ, NJIT, Edison, Iselin, Jersey City. AIIMS-trained biology specialists, ET evening slots. From $449.',
  },
}

const faqs = [
  {
    question: 'Will ET evening sessions fit a Rutgers pre-dental course schedule?',
    answer:
      'Yes. Our New Jersey small-batch slots run Eastern Time evenings — typically 7:30 PM to 9:30 PM ET on weekdays, with weekend morning options. This is built around the Rutgers New Brunswick standard pre-dental course load (Biology II, Organic Chemistry II, Biochemistry, plus a science elective), where junior-year orgo labs commonly run until 5 PM. Senior Faculty 1:1 has more flexibility — 9 PM or 10 PM ET starts available.',
  },
  {
    question: 'Do you coach Rutgers School of Dental Medicine applicants?',
    answer:
      'Yes. Rutgers SDM is a top destination for NJ pre-dental students and runs a strong feedback loop with Rutgers New Brunswick pre-dental cohort. Most Rutgers applicants sit the DAT in spring or summer of junior year, then apply through AADSAS in the June following. Our 3–5 month DAT Biology programme aligns with this timeline.',
  },
  {
    question:
      'My child is in Edison / Iselin / Jersey City — how does payment and faculty access work?',
    answer:
      'Payment is in USD via card, ACH, or international wire (for parents paying from outside the US). Faculty are biology specialists led by Dr. Shekhar C Singh (AIIMS Delhi), with senior faculty fluent in English and Hindi if family communication is preferred in Hindi. All sessions are online — no commute. Parents typically attend the diagnostic and milestone check-ins; the rest is direct student-tutor over Zoom + WhatsApp.',
  },
  {
    question:
      'How does Cerebrum compare to Kaplan, DAT Bootcamp, or DAT Destroyer for an NJ pre-dental?',
    answer:
      'Kaplan is a full-DAT generalist covering all four sections with rotating subject faculty, with full-course pricing in the ~$2,599 range. DAT Bootcamp and DAT Destroyer are question-bank platforms with video libraries — strong for drill volume. Cerebrum is a biology-only specialist — we cover the Biology section in depth ($1,399 1:1 full programme, $135/hr ad-hoc) and most NJ students pair us with DAT Bootcamp for drill volume.',
  },
  {
    question: 'When should an NJ pre-dental student start DAT Biology prep?',
    answer:
      'For a spring or summer DAT date, start the content phase 4 months out. NJIT students (typically biomedical engineering majors with heavier course load) and Rutgers Newark students should start 5 months out and use the Self-Paced track in parallel with coursework, then Small-Batch for the final 8–10 weeks of intensive section drilling.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'DAT Biology Tutor for New Jersey Students',
  description:
    'DAT Biology section tutoring for New Jersey pre-dental students — Rutgers, NJIT, TCNJ, Edison, Jersey City. AIIMS-trained biology specialists, Campbell + ADA outline curriculum, ET evening slots.',
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
    name: 'New Jersey (Rutgers, Edison, Iselin, Jersey City)',
    address: { '@type': 'PostalAddress', addressRegion: 'NJ', addressCountry: 'US' },
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
    { '@type': 'ListItem', position: 3, name: 'New Jersey', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm a New Jersey pre-dental student (or parent of one) preparing for the DAT. Please share Biology programme details and ET evening slots."
  )

export default function DATBiologyTutorNewJerseyPage() {
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
            <span className="text-white">New Jersey</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            DAT Biology Tutor for New Jersey Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            DAT Biology section coaching for pre-dental students at Rutgers New Brunswick, Rutgers
            Newark, NJIT, TCNJ, Stevens — plus the Edison / Iselin / Jersey City Indian-American
            pre-dental corridor. AIIMS-trained biology specialists, Campbell Biology + ADA outline
            mapping, ET evening sessions. $449 self-paced through $1,399 senior 1:1, with $135/hour
            ad-hoc tutoring.
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
            Why New Jersey has a large pre-dental cohort
          </h2>
          <p>
            New Jersey houses Rutgers School of Dental Medicine (one of two NJ dental schools — the
            other is the Touro College of Dental Medicine in Hawthorne) and is within an hour of NYU
            College of Dentistry and the Penn School of Dental Medicine. Combined with the state's
            heavy Indian-American population in Middlesex (Edison, Iselin, South Brunswick), Mercer
            (Plainsboro, West Windsor), and Hudson (Jersey City) counties — where dentistry is a
            culturally weighted profession — the NJ pre-dental funnel produces a disproportionate
            share of US DAT applicants.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-dental feeders we coach in New Jersey
          </h2>
          <ul>
            <li>
              <strong>Rutgers University New Brunswick</strong> — primary feeder to Rutgers SDM;
              Cell Biology &amp; Neuroscience and Biological Sciences majors dominate.
            </li>
            <li>
              <strong>Rutgers University Newark</strong> — strong pre-dental cohort; many work
              part-time shadowing at hospitals near Rutgers SDM.
            </li>
            <li>
              <strong>NJIT</strong> — Biomedical Engineering and Biology majors; heavier course
              load.
            </li>
            <li>
              <strong>The College of New Jersey (TCNJ)</strong> — Biology pre-dental track.
            </li>
            <li>
              <strong>Stevens Institute of Technology</strong> — pre-dental via Biomedical
              Engineering.
            </li>
            <li>
              <strong>Seton Hall University</strong> — pre-dental health track.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            DAT Biology pricing (USD)
          </h2>
          <ul>
            <li>
              <strong>Self-Paced — $449</strong> for the full 3–5 month programme.
            </li>
            <li>
              <strong>Small-Batch — $899</strong>, 4–6 students, weekly 2-hour live sessions.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from New Jersey families</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Start DAT Biology prep from NJ</h2>
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
