/**
 * /mcat-biology-tutor-ann-arbor
 *
 * MCAT Biology city page — Ann Arbor / Southeast Michigan (University of
 * Michigan, Michigan Medicine; nearby Wayne State; Novi / Canton /
 * Northville South Asian applicant cohort). Self-contained server
 * component. USD pricing.
 * Primary keyword: "MCAT Biology tutor Ann Arbor".
 */

import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/mcat-biology-tutor-ann-arbor'

export const metadata: Metadata = {
  title: 'MCAT Biology Tutor Ann Arbor | University of Michigan, Michigan Medicine',
  description:
    'MCAT Bio/Biochem tutor for Ann Arbor pre-meds — University of Michigan, Michigan Medicine, with nearby Wayne State. Biology specialists, ET evening slots. From $499.',
  keywords: [
    'MCAT Biology tutor Ann Arbor',
    'MCAT Bio tutor University of Michigan',
    'MCAT Biology tutor U of M',
    'MCAT Biology tutor Michigan Medicine',
    'MCAT Biology tutor Wayne State',
    'MCAT tutor Novi Michigan',
    'MCAT tutor Canton Michigan',
    'MCAT Bio/Biochem tutor Michigan',
    'Indian American MCAT tutor Ann Arbor',
    'online MCAT Biology coaching Ann Arbor',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology Tutor Ann Arbor | Cerebrum Biology Academy',
    description:
      'MCAT Bio/Biochem coaching for Ann Arbor pre-meds — University of Michigan, Michigan Medicine, nearby Wayne State. ET evening slots, $499–$1,499.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'MCAT Biology Tutor Ann Arbor | University of Michigan, Michigan Medicine',
    description:
      'MCAT Bio/Biochem tutor for Ann Arbor pre-meds — University of Michigan, Michigan Medicine, with nearby Wayne State. Biology specialists, ET evening slots. From $499.',
  },
}

const faqs = [
  {
    question:
      'University of Michigan undergrad with Michigan Medicine research — how do we fit MCAT prep?',
    answer:
      'U-M MCDB, Biochemistry, and Neuroscience concentrators with active research in Michigan Medicine or LSA labs often carry 15 to 25 hours per week of bench time on top of a full course load. We split the timeline: Self-Paced async content during the semester, then a concentrated Small-Batch + 1:1 block during summer or a gap year. Many U-M pre-meds take a gap year and sit the MCAT post-graduation.',
  },
  {
    question: 'Wayne State pre-meds in Detroit — can they join Ann Arbor sessions?',
    answer:
      'Yes — all sessions are online, so Wayne State students join the same Eastern Time cohorts as University of Michigan pre-meds. Wayne State pre-meds often target the Wayne State School of Medicine and have strong urban clinical exposure; the Bio/Biochem coaching is the same, and we coordinate Detroit-area testing-center logistics during the diagnostic.',
  },
  {
    question: 'My family is in Novi / Canton / Northville — what is the planning conversation?',
    answer:
      'The consultation covers: (a) which undergrad (University of Michigan, Wayne State, Eastern Michigan, or out-of-state), which sets the course-load timing; (b) target school tier from Michigan Medicine through Wayne State and other options; (c) gap year or summer-after-junior-year timeline. For suburban high school students targeting BS/MD tracks, planning starts junior year.',
  },
  {
    question: 'How is the prep different for a U-M student versus a Wayne State student?',
    answer:
      'University of Michigan pre-meds usually start from a high content baseline after the MCDB and biochemistry sequences but have heavy research loads, so the work is passage strategy and scheduling around the lab. Wayne State pre-meds often have more in-semester study time, so a full Small-Batch programme during the school year is more feasible. We calibrate to the student’s course load and research commitments.',
  },
  {
    question: 'How does Cerebrum compare to Ann Arbor-area MCAT prep providers?',
    answer:
      'Ann Arbor and Southeast Michigan have the standard full-MCAT generalists ($2,500–$3,000 for all four sections) plus campus-area boutique tutors at $150–$225/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty led by Dr. Shekhar C Singh (AIIMS Delhi). Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour. Many Michigan students pair us with a generalist for C/P and CARS.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Biology Tutor for Ann Arbor Students',
  description:
    'MCAT Bio/Biochem section tutoring for Ann Arbor and Southeast Michigan pre-meds — University of Michigan, Michigan Medicine, nearby Wayne State. Biology specialists, Campbell + Lehninger, ET evening slots.',
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
    name: 'Ann Arbor / Southeast Michigan (Novi, Canton, Northville, Troy)',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'MI',
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
    { '@type': 'ListItem', position: 3, name: 'Ann Arbor', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm an Ann Arbor / Southeast Michigan pre-med (or parent) preparing for the MCAT. I'd like Bio/Biochem programme details, ET slot availability, and pricing. Please share."
  )

export default function MCATBiologyTutorAnnArborPage() {
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
            <span className="text-white">Ann Arbor</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            MCAT Biology Tutor for Ann Arbor Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            MCAT Bio/Biochem coaching for University of Michigan pre-meds, anchored by Michigan
            Medicine in Ann Arbor, with nearby Wayne State University in the picture for Southeast
            Michigan families — built around the Novi / Canton / Northville South Asian community.
            AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Eastern Time
            evening sessions, $499 to $1,499.
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
            Why Ann Arbor is a flagship-university pre-med market
          </h2>
          <p>
            Ann Arbor is defined by the University of Michigan, one of the largest research
            universities in the country, and by Michigan Medicine — the university’s academic
            medical center and the University of Michigan Medical School. The concentration of
            research labs and the U-M Medical School in a single college town gives undergraduates
            exceptional access to bench and clinical research.
          </p>
          <p>
            The University of Michigan is the dominant pre-med feeder, and nearby Wayne State
            University in Detroit adds a large urban pre-med base for Southeast Michigan students.
            The South Asian community concentrates in the western Wayne and Oakland County suburbs —
            Novi, Canton, Northville, and Troy — where pre-med culture is well established and MCAT
            planning typically begins during sophomore year.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-med feeders we coach in the Ann Arbor / Southeast Michigan area
          </h2>
          <ul>
            <li>
              <strong>University of Michigan</strong> — Molecular, Cellular &amp; Developmental
              Biology; Biochemistry; Neuroscience; Cellular &amp; Molecular Biomedical Science.
            </li>
            <li>
              <strong>Michigan Medicine (U-M Medical School)</strong> — MD programme, undergraduate
              research, academic medical center rotations.
            </li>
            <li>
              <strong>Wayne State University (Detroit)</strong> — Biological Sciences, Biochemistry,
              Wayne State School of Medicine pathway.
            </li>
            <li>
              <strong>Eastern Michigan University</strong> — Biology, Biochemistry, pre-medical
              advising.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Eastern Time fit for Ann Arbor students
          </h2>
          <p>
            All live sessions are in Eastern Time. Standard Ann Arbor small-batch slot is 7:30 PM to
            9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options.
            This works around the typical University of Michigan late-afternoon lab and Michigan
            Medicine research schedule. Senior Faculty 1:1 can be scheduled at any ET slot.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Novi / Canton / Northville — the family planning conversation
          </h2>
          <p>
            The western Wayne and Oakland County suburbs — Novi, Canton, Northville, and Troy — have
            the highest South Asian household densities in Southeast Michigan, supported by the
            automotive engineering and tech economy. These communities sit within a short drive of
            both Ann Arbor and Detroit, so families often weigh the University of Michigan against
            Wayne State. Pre-med planning typically starts 12 to 18 months ahead.
          </p>
          <p>
            What we hear from Ann Arbor and Southeast Michigan parents: (1) the University of
            Michigan is the flagship in-state target and Michigan Medicine research is a common part
            of the profile, which compresses in-semester study time; (2) Wayne State is a strong
            urban-medicine option for Detroit-area families; (3) the MCAT timeline has to fit around
            active U-M research. We structure the consultation around the research calendar and
            target school tier.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            How Cerebrum coaches MCAT Bio/Biochem from Ann Arbor
          </h2>
          <p>
            <strong>100% online live.</strong> Zoom-based sessions, screen-shared Campbell Biology
            and Lehninger excerpts, AAMC official passage walkthroughs, and a WhatsApp channel for
            between-session doubts. Recording library for asynchronous review — useful for students
            balancing Michigan Medicine and LSA lab schedules.
          </p>
          <p>
            <strong>Weekly small-batch sessions</strong> (4–6 students max, grouped by target band),
            2 hours each, plus monthly Bio/Biochem section mocks.{' '}
            <strong>Ad-hoc 1:1 sessions</strong> at $150/hour for gap-fill — most Michigan students
            book several of these in the final 6 weeks, with passage strategy as the most common
            focus.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            FAQs from Ann Arbor and Southeast Michigan families
          </h2>
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
            Start MCAT Biology prep from Ann Arbor
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
