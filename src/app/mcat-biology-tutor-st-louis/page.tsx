/**
 * /mcat-biology-tutor-st-louis
 *
 * MCAT Biology city page — St. Louis metro (Washington University in
 * St. Louis, Saint Louis University, WashU School of Medicine; Central
 * West End medical corridor; Chesterfield / Ballwin / West County South
 * Asian applicant cohort). Self-contained server component. USD pricing.
 * Primary keyword: "MCAT Biology tutor St. Louis".
 */

import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/mcat-biology-tutor-st-louis'

export const metadata: Metadata = {
  title: 'MCAT Biology Tutor St. Louis | WashU, Saint Louis University, WashU SOM',
  description:
    'MCAT Bio/Biochem tutor for St. Louis pre-meds — Washington University in St. Louis, Saint Louis University, WashU School of Medicine. Biology specialists, CT evening slots. From $499.',
  keywords: [
    'MCAT Biology tutor St. Louis',
    'MCAT Bio tutor WashU',
    'MCAT Biology tutor Washington University in St. Louis',
    'MCAT Biology tutor Saint Louis University',
    'MCAT Biology tutor SLU',
    'MCAT tutor Chesterfield MO',
    'MCAT tutor Ballwin MO',
    'MCAT Bio/Biochem tutor St. Louis',
    'Indian American MCAT tutor St. Louis',
    'online MCAT Biology coaching St. Louis',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology Tutor St. Louis | Cerebrum Biology Academy',
    description:
      'MCAT Bio/Biochem coaching for St. Louis pre-meds — Washington University in St. Louis, Saint Louis University. CT evening slots, $499–$1,499.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'MCAT Biology Tutor St. Louis | WashU, Saint Louis University, WashU SOM',
    description:
      'MCAT Bio/Biochem tutor for St. Louis pre-meds — Washington University in St. Louis, Saint Louis University, WashU School of Medicine. Biology specialists, CT evening slots. From $499.',
  },
}

const faqs = [
  {
    question:
      'Washington University in St. Louis undergrad with research — how do we fit MCAT prep?',
    answer:
      'WashU Biology, Biochemistry, and Neuroscience concentrators with active research at the WashU School of Medicine or Central West End hospitals often carry 15 to 25 hours per week of bench time on top of a full course load. We split the timeline: Self-Paced async content during the semester, then a concentrated Small-Batch + 1:1 block during summer or a gap year. Many WashU pre-meds take a gap year and sit the MCAT post-graduation.',
  },
  {
    question: 'Saint Louis University pre-meds — how is the prep different from WashU?',
    answer:
      'Saint Louis University pre-meds typically have more in-semester study time than WashU students and a clear in-system pathway toward the SLU School of Medicine. We can often run a full Small-Batch programme during the school year for SLU students. SLU has a strong biology department, so the work is mostly AAMC passage strategy and biochemistry precision.',
  },
  {
    question: 'My family is in Chesterfield / Ballwin — what is the planning conversation?',
    answer:
      'The consultation covers: (a) which undergrad (Washington University in St. Louis, Saint Louis University, UMSL, or out-of-state), which sets the course-load timing; (b) target school tier from the WashU and SLU programmes through out-of-state options; (c) gap year or summer-after-junior-year timeline. For Rockwood and Parkway high school students targeting BS/MD tracks, planning starts junior year.',
  },
  {
    question: 'UMSL pre-meds — can they join St. Louis sessions?',
    answer:
      'Yes — all sessions are online, so University of Missouri–St. Louis students join the same Central Time cohorts as WashU and SLU pre-meds. UMSL pre-meds typically have more in-semester study time, so a full Small-Batch programme during the school year is feasible. We coordinate testing-center logistics during the diagnostic.',
  },
  {
    question: 'How does Cerebrum compare to St. Louis-area MCAT prep providers?',
    answer:
      'St. Louis has the standard full-MCAT generalists ($2,500–$3,000 for all four sections) plus Central West End and West County boutique tutors at $150–$225/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty led by Dr. Shekhar C Singh (AIIMS Delhi). Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour. Many St. Louis students pair us with a generalist for C/P and CARS.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Biology Tutor for St. Louis Students',
  description:
    'MCAT Bio/Biochem section tutoring for St. Louis pre-meds — Washington University in St. Louis, Saint Louis University, WashU School of Medicine. Biology specialists, Campbell + Lehninger, CT evening slots.',
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
    name: 'St. Louis Metro (Central West End, Chesterfield, Ballwin, Wildwood, Town and Country)',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'MO',
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
    { '@type': 'ListItem', position: 3, name: 'St. Louis', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm a St. Louis pre-med (or parent) preparing for the MCAT. I'd like Bio/Biochem programme details, CT slot availability, and pricing. Please share."
  )

export default function MCATBiologyTutorStLouisPage() {
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
            <span className="text-white">St. Louis</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            MCAT Biology Tutor for St. Louis Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            MCAT Bio/Biochem coaching for Washington University in St. Louis and Saint Louis
            University pre-meds, anchored by the WashU School of Medicine in the Central West End
            medical corridor — built around the Chesterfield / Ballwin / West County South Asian
            community. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum,
            Central Time evening sessions, $499 to $1,499.
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
            Why St. Louis is a research-intensive pre-med market
          </h2>
          <p>
            St. Louis pairs two strong pre-med universities with a major academic medical corridor.
            Washington University in St. Louis is one of the most research-intensive private
            universities in the country, and the WashU School of Medicine, with Barnes-Jewish
            Hospital and St. Louis Children’s Hospital in the Central West End, gives undergraduates
            exceptional bench and clinical-research access.
          </p>
          <p>
            Saint Louis University, a Jesuit institution with its own School of Medicine, adds a
            substantial pre-med undergraduate base. The South Asian community concentrates in West
            County — Chesterfield, Ballwin, Wildwood, and Town and Country — where pre-med culture
            is well established and MCAT planning typically begins during sophomore year.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-med feeders we coach in the St. Louis metro
          </h2>
          <ul>
            <li>
              <strong>Washington University in St. Louis</strong> — Biology, Biochemistry,
              Neuroscience, Biomedical Engineering.
            </li>
            <li>
              <strong>WashU School of Medicine</strong> — MD programme, Central West End research
              rotations, undergraduate research.
            </li>
            <li>
              <strong>Saint Louis University (SLU)</strong> — Biology, Biochemistry, Neuroscience,
              with the SLU School of Medicine pathway.
            </li>
            <li>
              <strong>University of Missouri–St. Louis (UMSL)</strong> — Biology, Biochemistry &amp;
              Biotechnology, pre-medical advising.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Central Time fit for St. Louis students
          </h2>
          <p>
            All live sessions are in Central Time. Standard St. Louis small-batch slot is 7:00 PM to
            9:00 PM CT on weekday evenings, with 9:00 AM to 11:00 AM CT Saturday and Sunday options.
            This works around the typical Washington University late-afternoon lab and Central West
            End clinical-research schedule. Senior Faculty 1:1 can be scheduled at any CT slot.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Chesterfield / Ballwin / West County — the family planning conversation
          </h2>
          <p>
            West County — Chesterfield, Ballwin, Wildwood, and Town and Country — has the highest
            South Asian household density in the St. Louis metro, supported by the healthcare,
            biotech, and engineering employers in the region. Pre-med culture is strong in the
            Rockwood and Parkway school systems. Pre-med families here plan MCAT preparation 12 to
            18 months ahead.
          </p>
          <p>
            What we hear from St. Louis parents: (1) Washington University in St. Louis is the
            aspirational target and is among the most research-intensive and competitive programmes
            in the country, so Bio/Biochem precision matters; (2) Saint Louis University is a strong
            option with its own School of Medicine pathway; (3) the WashU School of Medicine and the
            Central West End hospitals make research experience accessible, so the MCAT timeline
            often has to fit around active research. We structure the consultation around the
            research calendar and target school tier.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            How Cerebrum coaches MCAT Bio/Biochem from St. Louis
          </h2>
          <p>
            <strong>100% online live.</strong> Zoom-based sessions, screen-shared Campbell Biology
            and Lehninger excerpts, AAMC official passage walkthroughs, and a WhatsApp channel for
            between-session doubts. Recording library for asynchronous review — useful for students
            balancing Central West End research schedules.
          </p>
          <p>
            <strong>Weekly small-batch sessions</strong> (4–6 students max, grouped by target band),
            2 hours each, plus monthly Bio/Biochem section mocks.{' '}
            <strong>Ad-hoc 1:1 sessions</strong> at $150/hour for gap-fill — most St. Louis students
            book several of these in the final 6 weeks, with passage strategy as the most common
            focus for WashU-bound students.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from St. Louis families</h2>
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
            Start MCAT Biology prep from St. Louis
          </h2>
          <p className="text-blue-100 mb-8">
            Free 30-minute diagnostic with senior faculty in a CT-friendly slot.
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
