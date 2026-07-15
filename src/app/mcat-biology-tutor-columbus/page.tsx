/**
 * /mcat-biology-tutor-columbus
 *
 * MCAT Biology city page — Columbus metro (Ohio State University, OSU
 * College of Medicine, Wexner Medical Center; Dublin / Powell / New
 * Albany South Asian applicant cohort). Self-contained server component.
 * USD pricing.
 * Primary keyword: "MCAT Biology tutor Columbus".
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { EmailEnquiryButton } from '@/components/seo/EmailEnquiryButton'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/mcat-biology-tutor-columbus'

export const metadata: Metadata = {
  title: 'MCAT Biology Tutor Columbus | Ohio State University, OSU College of Medicine',
  description:
    'MCAT Bio/Biochem tutor for Columbus pre-meds — Ohio State University and the OSU College of Medicine. Biology specialists, ET evening slots. From $499.',
  keywords: [
    'MCAT Biology tutor Columbus',
    'MCAT Bio tutor Ohio State',
    'MCAT Biology tutor OSU',
    'MCAT Biology tutor Ohio State University',
    'MCAT Biology tutor OSU College of Medicine',
    'MCAT tutor Dublin Ohio',
    'MCAT tutor Powell Ohio',
    'MCAT Bio/Biochem tutor Columbus',
    'Indian American MCAT tutor Columbus',
    'online MCAT Biology coaching Columbus',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology Tutor Columbus | Cerebrum Biology Academy',
    description:
      'MCAT Bio/Biochem coaching for Columbus pre-meds — Ohio State University, OSU College of Medicine. ET evening slots, $499–$1,499.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'MCAT Biology Tutor Columbus | Ohio State University, OSU College of Medicine',
    description:
      'MCAT Bio/Biochem tutor for Columbus pre-meds — Ohio State University and the OSU College of Medicine. Biology specialists, ET evening slots. From $499.',
  },
}

const faqs = [
  {
    question: 'Ohio State undergrad with Wexner Medical Center research — how do we fit MCAT prep?',
    answer:
      'Ohio State Biology, Biochemistry, and Neuroscience concentrators with active research in OSU College of Medicine or Wexner Medical Center labs often carry 12 to 20 hours per week of research time on top of a full course load. We split the timeline: Self-Paced async content during the semester, then a concentrated Small-Batch + 1:1 block during summer or a gap year, with the bulk of prep in the lighter-load window.',
  },
  {
    question: 'OSU College of Medicine target — how should an Ohio State student plan?',
    answer:
      'The OSU College of Medicine is a competitive in-state target, and many Ohio State undergraduates aim to stay in the OSU system. Our coaching focuses on Bio/Biochem section optimization. Many Columbus students pair Cerebrum (Bio/Biochem specialist) with a generalist for C/P and CARS to build a competitive composite.',
  },
  {
    question: 'My family is in Dublin / Powell — what is the planning conversation?',
    answer:
      'The consultation covers: (a) which undergrad (Ohio State, Capital, Otterbein, or out-of-state), which sets the course-load timing; (b) target school tier from the OSU College of Medicine through out-of-state options; (c) gap year or summer-after-junior-year timeline. For Dublin and Olentangy high school students targeting BS/MD tracks, planning starts junior year.',
  },
  {
    question: 'Capital or Otterbein pre-meds — how is the prep different from Ohio State?',
    answer:
      'Capital and Otterbein pre-meds typically have smaller class sizes and lighter research loads than Ohio State students, so we can often run a full Small-Batch programme during the school year. Both have solid biology departments; the work is mostly AAMC passage strategy and biochemistry precision. We help smaller-college students supplement with OSU or Wexner research access where helpful.',
  },
  {
    question: 'How does Cerebrum compare to Columbus-area MCAT prep providers?',
    answer:
      'Columbus has the standard full-MCAT generalists ($2,500–$3,000 for all four sections) plus campus-area boutique tutors at $150–$200/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty led by Dr. Shekhar C Singh (AIIMS Delhi). Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour. Many Columbus students pair us with a generalist for C/P and CARS.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Biology Tutor for Columbus Students',
  description:
    'MCAT Bio/Biochem section tutoring for Columbus pre-meds — Ohio State University and the OSU College of Medicine. Biology specialists, Campbell + Lehninger, ET evening slots.',
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
    name: 'Columbus Metro (Dublin, Powell, New Albany, Hilliard)',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'OH',
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
    { '@type': 'ListItem', position: 3, name: 'Columbus', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm a Columbus pre-med (or parent) preparing for the MCAT. I'd like Bio/Biochem programme details, ET slot availability, and pricing. Please share."
  )

export default function MCATBiologyTutorColumbusPage() {
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
            <span className="text-white">Columbus</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            MCAT Biology Tutor for Columbus Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            MCAT Bio/Biochem coaching for Ohio State University pre-meds, anchored by the OSU
            College of Medicine and Wexner Medical Center — built around the Dublin / Powell / New
            Albany South Asian community. AIIMS-trained biology specialists, Campbell Biology +
            Lehninger curriculum, Eastern Time evening sessions, $499 to $1,499.
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
            Why Columbus is a major flagship-university pre-med market
          </h2>
          <p>
            Columbus is built around Ohio State University, one of the largest universities in the
            US, with a very large pre-med undergraduate population. The OSU College of Medicine and
            the Wexner Medical Center sit on the same campus, giving undergraduates direct access to
            research labs, clinical shadowing, and a major academic medical center.
          </p>
          <p>
            Ohio State is the dominant pre-med feeder for the metro, producing a high volume of MCAT
            candidates each year. The South Asian community concentrates in the northern and
            northwestern suburbs — Dublin, Powell, New Albany, and Hilliard — where pre-med culture
            is well established and MCAT planning typically begins during sophomore year.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-med feeders we coach in the Columbus metro
          </h2>
          <ul>
            <li>
              <strong>Ohio State University</strong> — Biology, Biochemistry, Neuroscience,
              Molecular Genetics, Microbiology.
            </li>
            <li>
              <strong>OSU College of Medicine</strong> — MD programme, Wexner Medical Center
              research rotations, undergraduate research.
            </li>
            <li>
              <strong>Capital University</strong> — Biology, Biochemistry, pre-medical advising.
            </li>
            <li>
              <strong>Otterbein University</strong> — Biology, Biochemistry &amp; Molecular Biology,
              pre-health professions.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Eastern Time fit for Columbus students
          </h2>
          <p>
            All live sessions are in Eastern Time. Standard Columbus small-batch slot is 7:30 PM to
            9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options.
            This works around the typical Ohio State late-afternoon lab and Wexner Medical Center
            research schedule. Senior Faculty 1:1 can be scheduled at any ET slot.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Dublin / Powell / New Albany — the family planning conversation
          </h2>
          <p>
            The northern and northwestern suburbs — Dublin, Powell, New Albany, and Hilliard — have
            the highest South Asian household densities in the Columbus metro, supported by the
            healthcare, insurance, and tech employers in the region. Pre-med culture is strong in
            the Dublin and Olentangy school systems. Pre-med families here plan MCAT preparation 12
            to 18 months ahead.
          </p>
          <p>
            What we hear from Columbus parents: (1) Ohio State is the primary target — in-state
            tuition and the OSU College of Medicine pipeline make it the clear first choice for many
            Ohio residents; (2) the Wexner Medical Center makes clinical and research experience
            accessible, so the MCAT timeline often has to fit around active research; (3) families
            weigh OSU against out-of-state national programmes. We structure the consultation around
            the student’s research calendar and target school tier.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            How Cerebrum coaches MCAT Bio/Biochem from Columbus
          </h2>
          <p>
            <strong>100% online live.</strong> Zoom-based sessions, screen-shared Campbell Biology
            and Lehninger excerpts, AAMC official passage walkthroughs, and a WhatsApp channel for
            between-session doubts. Recording library for asynchronous review — useful for students
            balancing Wexner Medical Center research schedules.
          </p>
          <p>
            <strong>Weekly small-batch sessions</strong> (4–6 students max, grouped by target band),
            2 hours each, plus monthly Bio/Biochem section mocks.{' '}
            <strong>Ad-hoc 1:1 sessions</strong> at $150/hour for gap-fill — most Columbus students
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Columbus families</h2>
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
            Start MCAT Biology prep from Columbus
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
