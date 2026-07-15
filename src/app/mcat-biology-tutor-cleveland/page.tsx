/**
 * /mcat-biology-tutor-cleveland
 *
 * MCAT Biology city page — Cleveland metro (Case Western Reserve,
 * Cleveland State, Cleveland Clinic Lerner College of Medicine, CWRU
 * School of Medicine; University Circle medical corridor; Solon /
 * Westlake / Strongsville South Asian applicant cohort).
 * Self-contained server component. USD pricing.
 * Primary keyword: "MCAT Biology tutor Cleveland".
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { EmailEnquiryButton } from '@/components/seo/EmailEnquiryButton'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/mcat-biology-tutor-cleveland'

export const metadata: Metadata = {
  title: 'MCAT Biology Tutor Cleveland | Case Western, Cleveland State, Cleveland Clinic',
  description:
    'MCAT Bio/Biochem tutor for Cleveland pre-meds — Case Western Reserve, Cleveland State, Cleveland Clinic Lerner College of Medicine, CWRU School of Medicine. Biology specialists, ET evening slots. From $499.',
  keywords: [
    'MCAT Biology tutor Cleveland',
    'MCAT Bio tutor Case Western',
    'MCAT Biology tutor CWRU',
    'MCAT Biology tutor Cleveland State',
    'MCAT Biology tutor Cleveland Clinic Lerner',
    'MCAT tutor Solon Ohio',
    'MCAT tutor Westlake Ohio',
    'MCAT Bio/Biochem tutor Cleveland',
    'Indian American MCAT tutor Cleveland',
    'online MCAT Biology coaching Cleveland',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology Tutor Cleveland | Cerebrum Biology Academy',
    description:
      'MCAT Bio/Biochem coaching for Cleveland pre-meds — Case Western Reserve, Cleveland State, Cleveland Clinic Lerner. ET evening slots, $499–$1,499.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'MCAT Biology Tutor Cleveland | Case Western, Cleveland State, Cleveland Clinic',
    description:
      'MCAT Bio/Biochem tutor for Cleveland pre-meds — Case Western Reserve, Cleveland State, Cleveland Clinic Lerner College of Medicine, CWRU School of Medicine. Biology specialists, ET evening slots. From $499.',
  },
}

const faqs = [
  {
    question:
      'Case Western Reserve undergrad with University Circle research — how do we fit MCAT prep?',
    answer:
      'CWRU Biology, Biochemistry, and Neuroscience concentrators with active research at the CWRU School of Medicine, the Cleveland Clinic, or University Hospitals often carry 15 to 20 hours per week of lab or clinical-research time. We split the timeline: Self-Paced async content during the semester, then a concentrated Small-Batch + 1:1 block during summer or a gap year, with the bulk of prep in the lighter-load window.',
  },
  {
    question:
      'Cleveland Clinic Lerner College of Medicine — does the research-MD track change the prep?',
    answer:
      'The Lerner College of Medicine is a research-focused MD programme run with Case Western Reserve, and it still requires a competitive MCAT score. The Bio/Biochem coaching itself is the same; what differs is the application strategy and the way research experience is framed. We coach the section and let families handle the research-narrative side with their pre-med advising office.',
  },
  {
    question: 'My family is in Solon / Westlake — what is the planning conversation?',
    answer:
      'The consultation covers: (a) which undergrad (Case Western Reserve, Cleveland State, John Carroll, or an out-of-area school), which sets the course-load timing; (b) target school tier from the CWRU and Lerner programmes through in-state Ohio options; (c) gap year or summer-after-junior-year timeline. For suburban high school students targeting BS/MD tracks, planning starts junior year.',
  },
  {
    question: 'Cleveland State pre-meds — how is the prep different from Case Western Reserve?',
    answer:
      'Cleveland State pre-meds typically have lighter research loads and more in-semester study time than Case Western Reserve students, so we can often run a full Small-Batch programme during the school year. Cleveland State has a solid biology department, so the work is mostly AAMC passage strategy and biochemistry precision rather than ground-up content review.',
  },
  {
    question: 'How does Cerebrum compare to Cleveland-area MCAT prep providers?',
    answer:
      'Cleveland has the standard full-MCAT generalists ($2,500–$3,000 for all four sections) plus University Circle and east-side boutique tutors at $150–$225/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty led by Dr. Shekhar C Singh (AIIMS Delhi). Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour. Many Cleveland students pair us with a generalist for C/P and CARS.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Biology Tutor for Cleveland Students',
  description:
    'MCAT Bio/Biochem section tutoring for Cleveland pre-meds — Case Western Reserve, Cleveland State, Cleveland Clinic Lerner College of Medicine, CWRU School of Medicine. Biology specialists, Campbell + Lehninger, ET evening slots.',
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
    name: 'Cleveland Metro (University Circle, Solon, Beachwood, Westlake, Strongsville)',
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
    { '@type': 'ListItem', position: 3, name: 'Cleveland', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm a Cleveland pre-med (or parent) preparing for the MCAT. I'd like Bio/Biochem programme details, ET slot availability, and pricing. Please share."
  )

export default function MCATBiologyTutorClevelandPage() {
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
            <span className="text-white">Cleveland</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            MCAT Biology Tutor for Cleveland Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            MCAT Bio/Biochem coaching for Case Western Reserve and Cleveland State pre-meds,
            anchored by the University Circle medical corridor — the CWRU School of Medicine and the
            Cleveland Clinic Lerner College of Medicine — and built around the Solon / Westlake /
            Strongsville South Asian community. AIIMS-trained biology specialists, Campbell Biology
            + Lehninger curriculum, Eastern Time evening sessions, $499 to $1,499.
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
            Why Cleveland is a clinical-research pre-med anchor
          </h2>
          <p>
            Cleveland’s pre-med ecosystem centers on University Circle, where Case Western Reserve
            University, the CWRU School of Medicine, the Cleveland Clinic Lerner College of
            Medicine, and University Hospitals cluster within walking distance. The Cleveland Clinic
            and University Hospitals give undergraduates unusually direct access to clinical
            research and shadowing.
          </p>
          <p>
            Case Western Reserve is the dominant undergraduate feeder, with Cleveland State
            University adding a strong public pre-med base. The South Asian community concentrates
            in the eastern and western suburbs — Solon, Beachwood, Westlake, and Strongsville —
            where pre-med culture is well established and MCAT planning typically begins during
            sophomore year.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-med feeders we coach in the Cleveland metro
          </h2>
          <ul>
            <li>
              <strong>Case Western Reserve University</strong> — Biology, Biochemistry,
              Neuroscience, Systems Biology.
            </li>
            <li>
              <strong>CWRU School of Medicine</strong> — MD programme, University Circle research
              rotations, undergraduate research.
            </li>
            <li>
              <strong>Cleveland Clinic Lerner College of Medicine</strong> — research-focused MD
              programme (with Case Western Reserve), clinical research training.
            </li>
            <li>
              <strong>Cleveland State University</strong> — Biology, Molecular Biology, pre-medical
              track.
            </li>
            <li>
              <strong>John Carroll University</strong> — Biology, Biochemistry, pre-health
              professions advising.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Eastern Time fit for Cleveland students
          </h2>
          <p>
            All live sessions are in Eastern Time. Standard Cleveland small-batch slot is 7:30 PM to
            9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options.
            This works around the typical Case Western Reserve late-afternoon lab and University
            Circle clinical-research schedule. Senior Faculty 1:1 can be scheduled at any ET slot.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Solon / Beachwood / Westlake — the family planning conversation
          </h2>
          <p>
            The eastern suburbs (Solon, Beachwood, Pepper Pike) and the western suburbs (Westlake,
            Strongsville) have the highest South Asian household densities in Greater Cleveland,
            supported by the Cleveland Clinic, University Hospitals, and the regional healthcare and
            manufacturing economy. Pre-med families here plan MCAT preparation 12 to 18 months
            ahead.
          </p>
          <p>
            What we hear from Cleveland parents: (1) Case Western Reserve and its University Circle
            medical institutions are the primary local targets, and the Cleveland Clinic Lerner
            research-MD track has a distinctive profile; (2) the proximity of the Cleveland Clinic
            and University Hospitals makes clinical and research experience easy to obtain, so the
            MCAT timeline often has to fit around active research; (3) families weigh in-state Ohio
            options alongside national programmes. We structure the consultation around the
            student’s research calendar and target school tier.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            How Cerebrum coaches MCAT Bio/Biochem from Cleveland
          </h2>
          <p>
            <strong>100% online live.</strong> Zoom-based sessions, screen-shared Campbell Biology
            and Lehninger excerpts, AAMC official passage walkthroughs, and a WhatsApp channel for
            between-session doubts. Recording library for asynchronous review — useful for students
            balancing University Circle research and clinical schedules.
          </p>
          <p>
            <strong>Weekly small-batch sessions</strong> (4–6 students max, grouped by target band),
            2 hours each, plus monthly Bio/Biochem section mocks.{' '}
            <strong>Ad-hoc 1:1 sessions</strong> at $150/hour for gap-fill — most Cleveland students
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Cleveland families</h2>
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
            Start MCAT Biology prep from Cleveland
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
