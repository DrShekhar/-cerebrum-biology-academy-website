/**
 * /mcat-biology-tutor-new-jersey
 *
 * MCAT Biology city page — New Jersey metro (Princeton, Rutgers, Edison,
 * Jersey City, Edison-Iselin Indian-American corridor). Self-contained
 * server component. Pricing: USD only (Self-Paced $449 / Small-Batch
 * $899 / 1:1 Senior $1,349 + $150/hr ad-hoc). Primary keyword:
 * "MCAT Biology tutor New Jersey".
 *
 * No 'use client' — content page, server-rendered.
 * Schemas inline (Course / FAQPage / BreadcrumbList).
 */

import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/mcat-biology-tutor-new-jersey'

export const metadata: Metadata = {
  title: 'MCAT Biology Tutor New Jersey | Princeton, Rutgers, Edison',
  description:
    'MCAT Bio/Biochem tutor for New Jersey pre-meds — Princeton, Rutgers, NJIT, Edison, Jersey City. AIIMS-trained biology specialists, ET evening slots. From $449.',
  keywords: [
    'MCAT Biology tutor New Jersey',
    'MCAT Bio tutor Princeton',
    'MCAT Biology tutor Rutgers',
    'MCAT Biology tutor Edison NJ',
    'MCAT Biology tutor Jersey City',
    'MCAT tutor NJIT pre-med',
    'MCAT Bio/Biochem tutor NJ',
    'Indian American MCAT tutor New Jersey',
    'online MCAT Biology coaching NJ',
    'MCAT Biology Princeton pre-med',
    'MCAT Biology Rutgers pre-med',
    'NRI MCAT tutor New Jersey',
    'MCAT 515 tutor New Jersey',
    'MCAT 520 tutor New Jersey',
    'MCAT Biology Hoboken Newark',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology Tutor New Jersey | Cerebrum Biology Academy',
    description:
      'MCAT Bio/Biochem tutoring for NJ pre-meds — Princeton, Rutgers, Edison, Jersey City. AIIMS-trained faculty, ET evenings, $449–$1,349.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'MCAT Biology Tutor New Jersey | Princeton, Rutgers, Edison',
    description: 'MCAT Bio/Biochem tutor for New Jersey pre-meds — Princeton, Rutgers, NJIT, Edison, Jersey City. AIIMS-trained biology specialists, ET evening slots. From $449.',
  },
}

const faqs = [
  {
    question: 'Will ET evening sessions fit a Rutgers pre-med lab schedule?',
    answer:
      'Yes. Our New Jersey small-batch slots run Eastern Time evenings — typically 7:30 PM to 9:30 PM ET on weekdays, with weekend morning options. This is built around the standard Rutgers New Brunswick pre-med course load, where junior-year orgo and biochem labs commonly run until 5 PM. Students who balance Cell Biology, Genetics, and Physical Chemistry in the same semester need protected evening study windows, and our weekly live sessions are scheduled accordingly. 1:1 with senior faculty has more flexibility — including 9 PM or 10 PM ET starts if needed.',
  },
  {
    question:
      'Do you coach Princeton pre-meds working with the Health Professions Advising office?',
    answer:
      'Yes. Princeton pre-meds typically apply to medical school in the gap year after graduation, so most book MCAT prep in the summer between junior and senior year or during the gap year itself. Our 4–6 month Bio/Biochem programme aligns with the Princeton HPA timeline — finishing content review by January, then heavy passage practice through the spring test date. We coach the Bio/Biochem section; students usually pair us with a generalist provider (other generalist MCAT brands) for C/P and CARS.',
  },
  {
    question:
      'How does NJ commute to MCAT testing centers (Princeton, New Brunswick, Iselin) affect prep planning?',
    answer:
      'New Jersey has three commonly-used Pearson VUE MCAT centers — Princeton, New Brunswick (near Rutgers), and Iselin. We plan the final 4-week sprint around your test-date center: full-length AAMC practice tests timed to your specific test slot (8:00 AM start most common), with a logistics check on travel time from your address. Edison/Iselin families typically test at the Iselin center; Princeton-area families at the Princeton center.',
  },
  {
    question:
      'I am an Indian-American parent in Edison / Iselin / Jersey City — how does payment and faculty access work?',
    answer:
      'Payment is in USD via standard US methods (card, ACH, or international wire for parents paying from outside the US). Our faculty are biology specialists led by Dr. Shekhar C Singh (AIIMS Delhi), with senior faculty fluent in English and Hindi if family communication is preferred in Hindi. All sessions are online — no commute. Parents typically attend the diagnostic consultation and milestone check-ins; the rest is direct between student and tutor via Zoom + WhatsApp.',
  },
  {
    question:
      'My child is a Rutgers BA/MD seven-year program student — do you coach the early-MCAT track?',
    answer:
      'Yes. Rutgers BA/MD students (Robert Wood Johnson and New Jersey Medical School tracks) typically sit the MCAT in the spring of sophomore or junior year, which is earlier than most pre-meds. We adjust the programme to compress content review when the student has not yet completed all standard pre-med coursework — particularly biochemistry, which is often a junior-year course. Our Lehninger first-semester biochem coverage closes this gap.',
  },
  {
    question: 'How does Cerebrum compare to other generalist MCAT brands for an NJ pre-med?',
    answer:
      'other generalist test-prep brands and other generalist test-prep brands are full-MCAT generalist providers — they cover all four sections (Bio/Biochem, C/P, CARS, Psych/Soc) with rotating subject faculty. Cerebrum is a biology specialist — we cover the Bio/Biochem section and the biology content in the Psych/Soc section, with biology faculty who do not rotate. Many NJ students pair us with a generalist for the non-biology sections. Our Small-Batch is $899 vs other generalist MCAT brands in-person ~$2,700; Senior Faculty 1:1 is $1,349 vs other generalist MCAT brands tutoring at $183/hour.',
  },
  {
    question: 'When should an NJIT or Rutgers Newark pre-med start MCAT Biology prep?',
    answer:
      'For a spring or summer MCAT date, start the content phase 4–6 months out. NJIT pre-meds (typically biomedical engineering majors) and Rutgers Newark pre-meds usually take a heavier course load than Rutgers New Brunswick, so we recommend starting 6 months out and using the Self-Paced track for content review in parallel with coursework, then Small-Batch or 1:1 for the final 8–10 weeks of passage practice.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Biology Tutor for New Jersey Students',
  description:
    'MCAT Bio/Biochem section tutoring for New Jersey pre-meds — Princeton, Rutgers, NJIT, Edison, Jersey City. AIIMS-trained biology specialists, Campbell + Lehninger curriculum, ET evening slots.',
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
    name: 'New Jersey (Princeton, Rutgers, Edison, Jersey City)',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'NJ',
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
    { '@type': 'ListItem', position: 3, name: 'New Jersey', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm a New Jersey pre-med (or parent of one) preparing for the MCAT. I'd like details about the Bio/Biochem programme — pricing, ET evening slots, and faculty. Please share."
  )

export default function MCATBiologyTutorNewJerseyPage() {
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

      {/* Hero */}
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
            <span className="text-white">New Jersey</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            MCAT Biology Tutor for New Jersey Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            MCAT Bio/Biochem section coaching for pre-meds at Princeton, Rutgers New Brunswick,
            Rutgers Newark, NJIT, and TCNJ — plus the Edison / Iselin / Jersey City Indian-American
            applicant corridor. AIIMS-trained biology specialists, Campbell Biology + Lehninger
            curriculum, Eastern Time evening sessions, and pricing built for the per-section model
            ($449 self-paced through $1,349 senior 1:1). Online live — no commute.
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

      {/* Why this metro */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why New Jersey has the heaviest MCAT applicant density in the country
          </h2>
          <p>
            New Jersey produces a disproportionate share of US medical school applicants relative to
            its population. Three structural factors converge: (1) a deep stack of strong pre-med
            feeders within the state — Princeton, Rutgers New Brunswick, Rutgers Newark, NJIT, TCNJ,
            Stevens Institute, Seton Hall — plus easy commute to Penn, Columbia, and NYU; (2) one of
            the largest Indian-American populations in the country, concentrated in Middlesex
            (Edison, Iselin, South Brunswick), Mercer (Plainsboro, West Windsor), and Hudson (Jersey
            City) counties — communities where medicine is a culturally weighted career path; and
            (3) two in-state allopathic medical schools (Rutgers RWJMS and NJMS) plus the Hackensack
            Meridian and Cooper schools, which produce a tight feedback loop of applicant supply.
          </p>
          <p>
            For our coaching, the practical implication is timing. NJ pre-meds typically apply in
            the spring or summer MCAT cycles (March–July test dates are heaviest). Our 4–6 month
            programmes are calibrated to those windows.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-med feeders we coach in New Jersey
          </h2>
          <ul>
            <li>
              <strong>Princeton University</strong> — typically gap-year applicants; biochemistry
              concentration is the dominant pre-med major.
            </li>
            <li>
              <strong>Rutgers University New Brunswick</strong> — Cell Biology &amp; Neuroscience
              and Biological Sciences majors; large pre-med cohort coordinated through the SAS
              Honors Program.
            </li>
            <li>
              <strong>Rutgers University Newark</strong> — strong feeder into NJMS; many BA/MD
              seven-year track students.
            </li>
            <li>
              <strong>NJIT</strong> — Biomedical Engineering and Biology majors; heavier course load
              than typical pre-med.
            </li>
            <li>
              <strong>The College of New Jersey (TCNJ)</strong> — Biology and Biomedical Engineering
              tracks.
            </li>
            <li>
              <strong>Stevens Institute of Technology</strong> — pre-med via Biomedical Engineering.
            </li>
            <li>
              <strong>Seton Hall University</strong> — including the BS/MD program with the
              Hackensack Meridian School of Medicine.
            </li>
            <li>
              <strong>Rutgers BA/MD seven-year program</strong> — early MCAT track (sophomore or
              junior year sit).
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Eastern Time fit for NJ students
          </h2>
          <p>
            All live sessions are in Eastern Time. Our standard NJ small-batch slot is 7:30 PM to
            9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options.
            For Rutgers New Brunswick students whose junior-year orgo or biochem labs commonly run
            until 5 PM, this leaves an actual study window. Senior Faculty 1:1 has more flexibility
            including 9:30 PM or 10:00 PM ET starts for students with late labs.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            The Indian-American demographic angle — honest data
          </h2>
          <p>
            Indian-American applicants are a measurable and growing share of the US MCAT pool. Per
            the AAMC FACTS tables, Asian applicants score above the overall mean on the MCAT (recent
            cycles around 510–512 mean for Asian applicants vs ~506 overall), and Asian applicants
            are over-represented in the highest score bands. Within Asian applicants, South Asian
            (Indian-American) applicants are a large share. New Jersey — particularly Middlesex and
            Mercer counties — concentrates this cohort.
          </p>
          <p>
            This matters for how we structure coaching. Our Small-Batch tier groups students by
            target band (505–510, 510–515, 515+) rather than mixing widely separated baselines,
            which is the typical pain point Indian-American families raise about generalist
            providers: the batch is paced for the median student. We pace ours by target.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            How Cerebrum coaches MCAT Bio/Biochem from this metro
          </h2>
          <p>
            <strong>100% online live.</strong> Zoom-based sessions, screen-shared Campbell Biology
            and Lehninger excerpts, AAMC official passage walkthroughs, and a WhatsApp channel for
            between-session doubts. Recording library for asynchronous review. No commute to a
            physical center.
          </p>
          <p>
            <strong>Weekly small-batch sessions</strong> (4–6 students max) of 2 hours each, plus
            monthly full-length Bio/Biochem section mocks. <strong>Ad-hoc 1:1 sessions</strong>{' '}
            available at $135/hour for gap-fill on weak topics — most NJ students book 4–8 of these
            in the final 6 weeks before test day, typically on amino acid biochemistry, enzyme
            kinetics, or oxidative phosphorylation.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            MCAT Biology pricing (USD)
          </h2>
          <ul>
            <li>
              <strong>MCAT Bio/Biochem Pursuit: $449</strong> for the full 4–6 month programme.
              Async Campbell Biology end-to-end, Lehninger first-semester biochemistry, AAMC content
              outline mapping, 300+ practice passages, recorded library, WhatsApp doubt support.
            </li>
            <li>
              <strong>MCAT Bio/Biochem Ascent: $899</strong> for the full programme.
              Everything in self-paced plus weekly 2-hour live sessions with biology-specialist
              faculty, monthly Bio/Biochem section mocks, peer Slack channel, senior faculty office
              hours.
            </li>
            <li>
              <strong>MCAT Bio/Biochem Pinnacle: $1,349</strong> for the full programme.
              Everything in Small-Batch plus weekly 90-minute 1:1 video sessions with AIIMS-trained
              senior faculty, personalised study plan, custom passage drills, unlimited WhatsApp
              faculty access.
            </li>
            <li>
              <strong>Ad-hoc 1:1 tutoring — $135/hour</strong> outside the packaged programme. For
              students who already have a generalist provider and need biology-specialist gap-fill.
            </li>
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from New Jersey families</h2>
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

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start MCAT Biology prep from New Jersey
          </h2>
          <p className="text-blue-100 mb-8">
            Free 30-minute diagnostic with senior faculty. Bring your AAMC FL score or last AAMC
            CARS section — we will benchmark Bio/Biochem against it.
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
