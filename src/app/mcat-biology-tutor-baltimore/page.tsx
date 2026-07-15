/**
 * /mcat-biology-tutor-baltimore
 *
 * MCAT Biology city page — Baltimore metro (Johns Hopkins, UMBC,
 * University of Maryland, Towson; Johns Hopkins School of Medicine
 * research corridor; Howard County / Columbia / Ellicott City South
 * Asian applicant cohort). Self-contained server component. USD pricing.
 * Primary keyword: "MCAT Biology tutor Baltimore".
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { EmailEnquiryButton } from '@/components/seo/EmailEnquiryButton'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/mcat-biology-tutor-baltimore'

export const metadata: Metadata = {
  title: 'MCAT Biology Tutor Baltimore | Johns Hopkins, UMBC, Maryland, Towson',
  description:
    'MCAT Bio/Biochem tutor for Baltimore pre-meds — Johns Hopkins, UMBC, University of Maryland, Towson, Johns Hopkins School of Medicine. Biology specialists, ET evening slots. From $499.',
  keywords: [
    'MCAT Biology tutor Baltimore',
    'MCAT Bio tutor Johns Hopkins',
    'MCAT Biology tutor UMBC',
    'MCAT Biology tutor University of Maryland',
    'MCAT Biology tutor Towson',
    'MCAT tutor Howard County',
    'MCAT tutor Columbia MD',
    'MCAT Bio/Biochem tutor Maryland',
    'Indian American MCAT tutor Baltimore',
    'online MCAT Biology coaching Baltimore',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology Tutor Baltimore | Cerebrum Biology Academy',
    description:
      'MCAT Bio/Biochem coaching for Baltimore pre-meds — Johns Hopkins, UMBC, University of Maryland, Towson. ET evening slots, $499–$1,499.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'MCAT Biology Tutor Baltimore | Johns Hopkins, UMBC, Maryland, Towson',
    description:
      'MCAT Bio/Biochem tutor for Baltimore pre-meds — Johns Hopkins, UMBC, University of Maryland, Towson, Johns Hopkins School of Medicine. Biology specialists, ET evening slots. From $499.',
  },
}

const faqs = [
  {
    question: 'Johns Hopkins undergrad with active research — how do we fit MCAT prep?',
    answer:
      'Johns Hopkins MCB, Biophysics, and Neuroscience concentrators frequently carry 15 to 25 hours per week of research at Homewood or the East Baltimore medical campus. We split the timeline: Self-Paced async content review during the semester, then a concentrated Small-Batch + 1:1 block in the summer or during a gap year. Many Hopkins pre-meds take a gap year and sit the MCAT post-graduation, so the bulk of prep happens then.',
  },
  {
    question: 'UMBC pre-meds, including Meyerhoff Scholars — how is the prep different?',
    answer:
      'UMBC pre-meds, including those in the Meyerhoff Scholars Program, typically have strong science foundations and structured research mentoring. We can run a full Small-Batch programme during the school year for students with more in-semester study time, focusing on AAMC passage strategy and biochemistry precision rather than ground-up content review.',
  },
  {
    question: 'My family is in Columbia / Ellicott City — what is the planning conversation?',
    answer:
      'The consultation covers: (a) which undergrad (Johns Hopkins, UMBC, University of Maryland, Towson), which sets the course-load timing; (b) target school tier from Johns Hopkins School of Medicine through the in-state Maryland options; (c) whether an NIH summer or post-bac research slot is part of the timeline. For Howard County high school students targeting BS/MD tracks, planning starts junior year.',
  },
  {
    question: 'University of Maryland or Towson pre-meds — can they join Baltimore sessions?',
    answer:
      'Yes — all sessions are online. University of Maryland (College Park) and Towson students join the same Eastern Time cohorts as Hopkins and UMBC pre-meds. The only practical difference is testing-center logistics, which we check during the diagnostic.',
  },
  {
    question: 'How does Cerebrum compare to Baltimore-area MCAT prep providers?',
    answer:
      'Baltimore has the standard full-MCAT generalists ($2,500–$3,000 for all four sections) plus boutique tutors around Homewood and Charles Village at $150–$250/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty led by Dr. Shekhar C Singh (AIIMS Delhi). Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour. Many Baltimore students pair us with a generalist for C/P and CARS.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Biology Tutor for Baltimore Students',
  description:
    'MCAT Bio/Biochem section tutoring for Baltimore pre-meds — Johns Hopkins, UMBC, University of Maryland, Towson, Johns Hopkins School of Medicine. Biology specialists, Campbell + Lehninger, ET evening slots.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  availableLanguage: ['English'],
  educationalLevel: 'Pre-Medical',
  educationalCredentialAwarded: 'MCAT Bio/Biochem Section Preparation',
  provider: {
    '@type': 'EducationalOrganization',
    '@id': 'https://cerebrumbiologyacademy.com/#organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Baltimore Metro (Homewood, East Baltimore, Howard County, Columbia, Ellicott City)',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'MD',
      addressCountry: 'US',
    },
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    courseWorkload: 'PT2H',
    location: {
      '@type': 'VirtualLocation',
      url: PAGE_URL,
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'MCAT Bio/Biochem Self-Paced',
        price: '499',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'MCAT Bio/Biochem Small-Batch (4–6 students)',
        price: '999',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'MCAT Bio/Biochem 1:1 Senior Faculty',
        price: '1499',
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
      name: 'MCAT Biology Preparation',
      item: 'https://cerebrumbiologyacademy.com/mcat-biology-preparation',
    },
    { '@type': 'ListItem', position: 3, name: 'Baltimore', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm a Baltimore pre-med (or parent) preparing for the MCAT. I'd like Bio/Biochem programme details, ET slot availability, and pricing. Please share."
  )

export default function MCATBiologyTutorBaltimorePage() {
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

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/mcat-biology-preparation" className="hover:text-white">
              MCAT Biology Preparation
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Baltimore</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            MCAT Biology Tutor for Baltimore Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            MCAT Bio/Biochem coaching for Johns Hopkins, UMBC, University of Maryland, and Towson
            pre-meds, anchored by the Johns Hopkins School of Medicine research corridor in East
            Baltimore — built around the Howard County / Columbia / Ellicott City South Asian
            community. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum,
            Eastern Time evening sessions, $499 to $1,499.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={wa}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +91 88264-44334
            </a>
            <EmailEnquiryButton
              label="Or email us"
              subject="MCAT Biology & Biochemistry tutoring enquiry"
              body={
                'Hi, I am interested in MCAT Bio/Biochem tutoring.\n\n' +
                'Name:\nTest date:\nTime zone (ET/CT/PT):\n\n' +
                'Please share programme details, US-time slots and USD pricing.'
              }
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white/60"
            />
            <Link
              href="/mcat-biology-preparation"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold"
            >
              MCAT Biology Overview
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why Baltimore is a research-heavy pre-med corridor
          </h2>
          <p>
            Baltimore is built around Johns Hopkins, one of the most research-intensive universities
            in the world. Johns Hopkins undergraduates and the Johns Hopkins School of Medicine in
            East Baltimore create an exceptional clinical and bench-research ecosystem, and the
            metro sits within easy reach of the NIH in Bethesda for summer and post-bac research.
          </p>
          <p>
            Beyond Hopkins, the University of Maryland, Baltimore County (UMBC) — known nationally
            for its Meyerhoff Scholars pipeline into the sciences — plus the University of Maryland
            (College Park, just southwest) and Towson University add a deep pre-med undergraduate
            base. The South Asian community concentrates in Howard County (Columbia, Ellicott City),
            one of the highest-density South Asian areas in the mid-Atlantic, where MCAT planning
            typically begins during sophomore year.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-med feeders we coach in the Baltimore metro
          </h2>
          <ul>
            <li>
              <strong>Johns Hopkins University</strong> — Molecular &amp; Cellular Biology,
              Biophysics, Neuroscience, Biomedical Engineering.
            </li>
            <li>
              <strong>Johns Hopkins School of Medicine</strong> — MD programme, East Baltimore
              research rotations, undergraduate summer research.
            </li>
            <li>
              <strong>University of Maryland, Baltimore County (UMBC)</strong> — Biological
              Sciences, Biochemistry &amp; Molecular Biology, Meyerhoff Scholars.
            </li>
            <li>
              <strong>University of Maryland (College Park)</strong> — Biology, Biochemistry,
              Neuroscience, Cell Biology.
            </li>
            <li>
              <strong>Towson University</strong> — Biology, Molecular Biology / Biochemistry /
              Bioinformatics, pre-health advising.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Eastern Time fit for Baltimore students
          </h2>
          <p>
            All live sessions are in Eastern Time. Standard Baltimore small-batch slot is 7:30 PM to
            9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options.
            This works around the typical Johns Hopkins late-afternoon lab and the NIH-style 8 AM to
            5 PM research schedule. Senior Faculty 1:1 can be scheduled at any ET slot.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Howard County / Columbia / Ellicott City — the family planning conversation
          </h2>
          <p>
            Howard County — Columbia and Ellicott City in particular — has one of the highest South
            Asian household densities in the mid-Atlantic, sitting between Baltimore and the DC/NIH
            corridor. Many families have biotech, federal-lab, or healthcare connections that shape
            how they read the medical-school application process.
          </p>
          <p>
            What we hear from Baltimore parents: (1) Johns Hopkins is the aspirational target and is
            among the most competitive medical schools in the country, so Bio/Biochem section
            precision matters; (2) UMBC (and its Meyerhoff pipeline) and the University of Maryland
            are strong in-state options; (3) NIH summer or post-bac research is often part of the
            plan and the MCAT timeline must fit around it. We structure the consultation around the
            research calendar and target school tier.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            How Cerebrum coaches MCAT Bio/Biochem from Baltimore
          </h2>
          <p>
            <strong>100% online live.</strong> Zoom-based sessions, screen-shared Campbell Biology
            and Lehninger excerpts, AAMC official passage walkthroughs, and a WhatsApp channel for
            between-session doubts. Recording library for asynchronous review — useful for students
            balancing East Baltimore research schedules.
          </p>
          <p>
            <strong>Weekly small-batch sessions</strong> (4–6 students max, grouped by target band),
            2 hours each, plus monthly Bio/Biochem section mocks.{' '}
            <strong>Ad-hoc 1:1 sessions</strong> at $150/hour for gap-fill — most Baltimore students
            book several of these in the final 6 weeks, with passage strategy as the most common
            focus for Hopkins-bound students.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            MCAT Biology pricing (USD)
          </h2>
          <ul>
            <li>
              <strong>MCAT Bio/Biochem Self-Paced: $499</strong> for the full 4–6 month programme.
              Campbell Biology end-to-end, Lehninger first-semester biochemistry, AAMC content
              outline mapping, 300+ practice passages, recorded library, WhatsApp doubt support.
            </li>
            <li>
              <strong>MCAT Bio/Biochem Small-Batch: $999</strong> for the full programme. Adds
              weekly 2-hour live sessions, monthly section mocks, peer channel, senior faculty
              office hours.
            </li>
            <li>
              <strong>MCAT Bio/Biochem 1:1 Senior Faculty: $1,499</strong> for the full programme.
              Adds weekly 1:1 video sessions with AIIMS-trained senior faculty, personalised study
              plan, custom passage drills, unlimited WhatsApp faculty access.
            </li>
            <li>
              <strong>Ad-hoc 1:1 tutoring — $150/hour</strong> outside the packaged programme. For
              students using a generalist (Kaplan / Blueprint) and wanting a biology specialist for
              gap-fill.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Baltimore families</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200 group">
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
            Start MCAT Biology prep from Baltimore
          </h2>
          <p className="text-blue-100 mb-8">
            Free 30-minute diagnostic with senior faculty in an ET-friendly slot.
          </p>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg"
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
