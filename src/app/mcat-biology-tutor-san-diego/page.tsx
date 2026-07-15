/**
 * /mcat-biology-tutor-san-diego
 *
 * MCAT Biology city page — San Diego metro (UC San Diego, USD, SDSU,
 * UCSD School of Medicine / La Jolla Mesa research corridor, Mira Mesa /
 * Scripps Ranch / Rancho Peñasquitos South Asian applicant cohort).
 * Self-contained server component. USD pricing.
 * Primary keyword: "MCAT Biology tutor San Diego".
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { EmailEnquiryButton } from '@/components/seo/EmailEnquiryButton'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/mcat-biology-tutor-san-diego'

export const metadata: Metadata = {
  title: 'MCAT Biology Tutor San Diego | UC San Diego, USD, SDSU',
  description:
    'MCAT Bio/Biochem tutor for San Diego pre-meds — UC San Diego, University of San Diego, SDSU, UCSD School of Medicine. Biology specialists, PT evening slots. From $499.',
  keywords: [
    'MCAT Biology tutor San Diego',
    'MCAT Bio tutor UC San Diego',
    'MCAT Biology tutor UCSD',
    'MCAT Biology tutor USD',
    'MCAT Biology tutor SDSU',
    'MCAT tutor Mira Mesa',
    'MCAT tutor La Jolla',
    'MCAT Bio/Biochem tutor San Diego',
    'Indian American MCAT tutor San Diego',
    'online MCAT Biology coaching San Diego',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology Tutor San Diego | Cerebrum Biology Academy',
    description:
      'MCAT Bio/Biochem coaching for San Diego pre-meds — UC San Diego, USD, SDSU. PT evening slots, $499–$1,499.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'MCAT Biology Tutor San Diego | UC San Diego, USD, SDSU',
    description:
      'MCAT Bio/Biochem tutor for San Diego pre-meds — UC San Diego, University of San Diego, SDSU, UCSD School of Medicine. Biology specialists, PT evening slots. From $499.',
  },
}

const faqs = [
  {
    question:
      'UC San Diego undergrad with Salk or Scripps Research lab work — how do we fit MCAT prep?',
    answer:
      'UCSD Molecular & Cell Biology and Human Biology students with active research on the La Jolla Mesa (Salk Institute, Scripps Research, Sanford Burnham Prebys, or UCSD School of Medicine labs) often carry 15 to 20 hours per week of bench time. We split the timeline: Self-Paced async content during the quarter, then a concentrated Small-Batch + 1:1 block during summer or a gap year. UCSD’s quarter system means study blocks are more compressed than at semester schools, so we calibrate the load accordingly.',
  },
  {
    question: 'USD or SDSU pre-meds — how is the prep different from UC San Diego?',
    answer:
      'University of San Diego and SDSU pre-meds typically have lighter research loads and more in-semester study time than UCSD students, so we can often run a full Small-Batch programme during the school year, starting January for a summer test date. Both have solid biology departments, so the content baseline is strong — most of the work is AAMC passage strategy and biochemistry precision.',
  },
  {
    question: 'My family is in Mira Mesa / Scripps Ranch — what is the planning conversation?',
    answer:
      'The consultation covers: (a) which undergrad (UC San Diego, USD, SDSU, or an out-of-area UC), which determines course-load timing; (b) target school tier across the California UC medical schools versus DO options; (c) gap year or summer-after-junior-year timeline. For high school students in the I-15 corridor targeting BS/MD tracks, planning starts junior year.',
  },
  {
    question: 'DO schools as a parallel track from San Diego — do you coach for that?',
    answer:
      'Yes. The MCAT is the same exam for MD and DO applications. Our Bio/Biochem coaching targets the 510 to 520 range, which covers the competitive California UC MD band and DO programmes. We help families think through the parallel-track strategy during the planning consultation.',
  },
  {
    question: 'How does Cerebrum compare to San Diego-area MCAT prep providers?',
    answer:
      'San Diego has the standard full-MCAT generalists ($2,500–$3,000 for all four sections) plus La Jolla and UTC boutique tutors at $150–$250/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty led by Dr. Shekhar C Singh (AIIMS Delhi). Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour. Many San Diego students pair us with a generalist for C/P and CARS.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Biology Tutor for San Diego Students',
  description:
    'MCAT Bio/Biochem section tutoring for San Diego pre-meds — UC San Diego, University of San Diego, SDSU, UCSD School of Medicine. Biology specialists, Campbell + Lehninger, PT evening slots.',
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
    name: 'San Diego Metro (La Jolla, Mira Mesa, Scripps Ranch, Rancho Peñasquitos)',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'CA',
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
    { '@type': 'ListItem', position: 3, name: 'San Diego', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm a San Diego pre-med (or parent) preparing for the MCAT. I'd like Bio/Biochem programme details, PT slot availability, and pricing. Please share."
  )

export default function MCATBiologyTutorSanDiegoPage() {
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
            <span className="text-white">San Diego</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            MCAT Biology Tutor for San Diego Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            MCAT Bio/Biochem coaching for UC San Diego, University of San Diego, and SDSU pre-meds,
            with the UCSD School of Medicine research corridor in La Jolla as the anchor — built
            around the Mira Mesa / Scripps Ranch / Rancho Peñasquitos South Asian community.
            AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Pacific Time
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
            Why San Diego is a top-tier biomedical research pre-med market
          </h2>
          <p>
            San Diego pairs a strong undergraduate pipeline with one of the densest life-sciences
            research clusters in the US. UC San Diego sits at the center, with the UC San Diego
            School of Medicine and the surrounding La Jolla Mesa institutions (Salk Institute,
            Scripps Research, Sanford Burnham Prebys) giving undergraduates unusually deep access to
            wet-lab and clinical-research experience.
          </p>
          <p>
            Beyond UCSD, the University of San Diego and San Diego State University add a
            substantial pre-med undergraduate base. The South Asian community concentrates in Mira
            Mesa, Scripps Ranch, and Rancho Peñasquitos, where pre-med culture is well established
            and MCAT planning typically begins during sophomore year of college.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-med feeders we coach in the San Diego metro
          </h2>
          <ul>
            <li>
              <strong>UC San Diego</strong> — Molecular &amp; Cell Biology, Human Biology,
              Biochemistry/Cell Biology, Neurobiology.
            </li>
            <li>
              <strong>UC San Diego School of Medicine</strong> — MD programme, undergraduate summer
              research, La Jolla Mesa clinical rotations.
            </li>
            <li>
              <strong>University of San Diego (USD)</strong> — Biology, Biochemistry, Behavioral
              Neuroscience with pre-health advising.
            </li>
            <li>
              <strong>San Diego State University (SDSU)</strong> — Biology, Cell &amp; Molecular
              Biology, Microbiology.
            </li>
            <li>
              <strong>Point Loma Nazarene University</strong> — Biology, Biochemistry, pre-medical
              track.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pacific Time fit for San Diego students
          </h2>
          <p>
            All live sessions are in Pacific Time. Standard San Diego small-batch slot is 7:00 PM to
            9:00 PM PT on weekday evenings, with 9:00 AM to 11:00 AM PT Saturday and Sunday options.
            This works around the typical UC San Diego afternoon lab schedule on the La Jolla
            campus. Senior Faculty 1:1 can be scheduled at any PT slot.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Mira Mesa / Scripps Ranch / Rancho Peñasquitos — the family planning conversation
          </h2>
          <p>
            The Mira Mesa / Scripps Ranch / Rancho Peñasquitos corridor (often grouped as the I-15
            north corridor) has the highest South Asian household density in San Diego County,
            driven by the biotech and defense-tech employers in Sorrento Valley and the UTC area.
            Pre-med families here plan MCAT preparation 12 to 18 months ahead.
          </p>
          <p>
            What we hear from San Diego parents: (1) UC San Diego is the primary in-state target and
            the La Jolla research access shapes the timeline — students with active Salk or Scripps
            Research lab roles cannot run a normal in-semester study schedule; (2) UC medical
            schools across California (UCSD, UCLA, UCSF, UCI) require a competitive band for
            in-state admission; (3) many families weigh DO programmes as a parallel track. We
            structure the consultation around the student’s research calendar and target school
            tier.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            How Cerebrum coaches MCAT Bio/Biochem from San Diego
          </h2>
          <p>
            <strong>100% online live.</strong> Zoom-based sessions, screen-shared Campbell Biology
            and Lehninger excerpts, AAMC official passage walkthroughs, and a WhatsApp channel for
            between-session doubts. Recording library for asynchronous review — convenient for
            students balancing La Jolla lab schedules.
          </p>
          <p>
            <strong>Weekly small-batch sessions</strong> (4–6 students max, grouped by target band),
            2 hours each, plus monthly Bio/Biochem section mocks.{' '}
            <strong>Ad-hoc 1:1 sessions</strong> at $150/hour for gap-fill — most San Diego students
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from San Diego families</h2>
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
            Start MCAT Biology prep from San Diego
          </h2>
          <p className="text-blue-100 mb-8">
            Free 30-minute diagnostic with senior faculty in a PT-friendly slot.
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
