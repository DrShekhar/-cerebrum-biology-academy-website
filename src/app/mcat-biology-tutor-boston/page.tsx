/**
 * /mcat-biology-tutor-boston
 *
 * MCAT Biology city page — Boston metro (Harvard, MIT, Tufts, BU,
 * Brandeis pipeline, Lexington / Newton / North Shore South Asian
 * applicant cohort). Self-contained server component. USD pricing.
 * Primary keyword: "MCAT Biology tutor Boston".
 */

import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/mcat-biology-tutor-boston'

export const metadata: Metadata = {
  title: 'MCAT Biology Tutor Boston | Harvard, MIT, Tufts, BU',
  description:
    'MCAT Bio/Biochem tutor for Boston pre-meds — Harvard, MIT, Tufts, BU, Brandeis, BC, Northeastern. Biology specialists, ET evening slots. From $449.',
  keywords: [
    'MCAT Biology tutor Boston',
    'MCAT Bio tutor Harvard',
    'MCAT Biology tutor MIT',
    'MCAT Biology tutor Tufts',
    'MCAT Biology tutor BU',
    'MCAT Biology tutor Brandeis',
    'MCAT Biology tutor Boston College',
    'MCAT Biology tutor Northeastern',
    'MCAT tutor Lexington MA',
    'MCAT tutor Newton MA',
    'MCAT tutor North Shore Boston',
    'MCAT Bio/Biochem tutor Massachusetts',
    'Indian American MCAT tutor Boston',
    'online MCAT Biology coaching Boston',
    'MCAT 520 tutor Boston',
    'Tufts BSMD MCAT prep',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology Tutor Boston | Cerebrum Biology Academy',
    description:
      'MCAT Bio/Biochem coaching for Boston pre-meds — Harvard, MIT, Tufts, BU, Brandeis. ET evening slots, $449–$1,349.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'MCAT Biology Tutor Boston | Harvard, MIT, Tufts, BU',
    description:
      'MCAT Bio/Biochem tutor for Boston pre-meds — Harvard, MIT, Tufts, BU, Brandeis, BC, Northeastern. Biology specialists, ET evening slots. From $449.',
  },
}

const faqs = [
  {
    question:
      'Harvard or MIT undergrad with active wet-lab research — how do we integrate MCAT prep?',
    answer:
      'This is the canonical Boston pre-med problem. Harvard MCB / HEB / Neurobiology concentrators and MIT Course 7 / Course 20 students typically have 15–25 hours/week of wet-lab research on top of the standard four-course load. Pure full-time MCAT prep is not viable during the semester. We solve it by splitting the timeline: Self-Paced async content review during the semester (5–8 hrs/week, mostly weekends and evenings), then a concentrated Small-Batch + 1:1 block during the summer between junior and senior year (or during a gap year). Most Harvard and MIT students take a gap year before med school — the bulk of MCAT prep happens then, post-graduation, with a spring test date.',
  },
  {
    question: 'Tufts BS/MD students — does Cerebrum coach the MD-bound seven-year track?',
    answer:
      'Yes. The Tufts Early Assurance Programme and the Tufts BS/MD Special Actions track admit students into Tufts University School of Medicine without the standard re-application — but most of these tracks still require an MCAT score, just earlier in the timeline (typically end of sophomore or junior year). We coach the Bio/Biochem section for these students with a compressed content phase, since BS/MD students often have not yet completed all standard pre-med coursework (particularly biochemistry, which is often a junior-year course). Our Lehninger first-semester biochem coverage closes that gap.',
  },
  {
    question: 'My family is in Lexington / Newton / Wellesley — what is the planning conversation?',
    answer:
      'The Lexington / Newton / Wellesley / Acton corridor has one of the highest South Asian household densities in New England, with consistent pre-med culture in the local high schools (Lexington High, Newton North, Acton-Boxborough). For families with a student currently in college, the planning conversation is usually: (a) which undergrad — that determines course-load timing — (b) gap year or no — that determines test-date — (c) target band — that determines tier. For families with a high school student aiming at BS/MD or early-MCAT BS/MD-style tracks, the planning starts earlier (junior year of high school) and we recommend starting with the Self-Paced track in parallel with AP Biology preparation.',
  },
  {
    question:
      'North Shore Boston (Andover, Lexington, Burlington corridor) — same coaching as in-town students?',
    answer:
      'Yes — all sessions are online. The only practical difference is testing center logistics. Boston has Pearson VUE MCAT centers in Boston, Brookline, and Waltham. From the North Shore (Andover, Burlington, Reading) or the Lexington / Newton suburbs, Waltham is typically the shortest drive. From in-town (Cambridge, Allston, Brookline), the Boston or Brookline centers are closest. We do a logistics check during the diagnostic and schedule the final-4-week full-length practice tests at your home base, 8:00 AM ET start.',
  },
  {
    question: 'Brandeis or BU pre-meds — how is the prep different from Harvard / MIT?',
    answer:
      'Brandeis (Biology, Biochemistry, HSSP) and BU (Biology, Biochemistry &amp; Molecular Biology, Neuroscience) pre-meds typically have somewhat lighter research loads than Harvard or MIT students, which means more in-semester study time available. We can run a full Small-Batch programme during the school year for Brandeis and BU students starting in January, finishing by July for a summer or early-fall test date. Both schools have strong biochemistry departments, so content baseline is solid.',
  },
  {
    question: 'Northeastern co-op students — how does the co-op cycle affect MCAT timing?',
    answer:
      'Northeastern University runs a co-op programme where students alternate semesters of classes with semesters of full-time work. For pre-meds, the co-op cycle usually means: classes spring + fall + spring, then co-op summer/fall in junior year (often in a research lab or hospital), then back to classes. Most Northeastern pre-meds sit the MCAT either during a co-op semester (lighter academic load — good for prep) or in the gap year after the standard 5-year programme. We tailor the schedule around which semester the student is in.',
  },
  {
    question: 'How does Cerebrum compare to Boston-area in-person prep providers?',
    answer:
      'Boston has the standard full-MCAT generalists (Kaplan Boston, The Princeton Review Boston) plus several boutique tutoring services around Cambridge and Harvard Square. Generalists are $2,500–$3,000 for full-MCAT in-person courses covering all four sections with rotating subject faculty. Boutique tutors typically charge $150–$250/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, with biology-specialist faculty led by Dr. Shekhar C Singh (AIIMS Delhi). Our Small-Batch is $899 vs Kaplan around $2,700; ad-hoc 1:1 is $135/hour vs $175–$250 for Boston boutique. Many Boston students pair us with a generalist provider for C/P and CARS.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Biology Tutor for Boston Students',
  description:
    'MCAT Bio/Biochem section tutoring for Boston pre-meds — Harvard, MIT, Tufts, BU, Brandeis, Boston College, Northeastern. Biology specialists, Campbell + Lehninger, ET evening slots.',
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
    name: 'Boston Metro (Cambridge, Lexington, Newton, North Shore)',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'MA',
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
    { '@type': 'ListItem', position: 3, name: 'Boston', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm a Boston pre-med (or parent) preparing for the MCAT. I'd like Bio/Biochem programme details, ET slot availability, and pricing. Please share."
  )

export default function MCATBiologyTutorBostonPage() {
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
            <span className="text-white">Boston</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            MCAT Biology Tutor for Boston Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            MCAT Bio/Biochem coaching for Harvard, MIT, Tufts, Boston University, Brandeis, Boston
            College, and Northeastern pre-meds — built around the Lexington / Newton / Wellesley /
            North Shore South Asian applicant cohort and the Tufts BS/MD early-MCAT track.
            AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Eastern Time
            evening sessions, $449 to $1,349.
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
            Why Boston is the densest pre-med ecosystem in the country
          </h2>
          <p>
            Boston has more world-class pre-med undergraduate programmes per square mile than any
            other US metro. Three drivers combine: (1) the elite undergrad stack — Harvard, MIT,
            Tufts, Boston University, Brandeis, Boston College, Northeastern, Wellesley — each with
            strong biology and pre-med departments and significant pre-med applicant volume; (2) the
            medical-school anchor — Harvard Medical School, Tufts University School of Medicine,
            Boston University School of Medicine, and UMass Chan Medical School are all within the
            metro, creating a clinical-experience and research-mentorship ecosystem; (3) the South
            Asian community concentrated in Lexington, Newton, Wellesley, Acton, Burlington, and the
            North Shore — these towns have the highest South Asian household density in New England,
            with consistent pre-med culture from middle school onward.
          </p>
          <p>
            For our coaching, Boston students typically start from the highest baseline of any of
            our city cohorts (510+ on a first diagnostic is common after the Harvard / MIT / Tufts
            biology sequences), and the marginal score gain comes almost entirely from passage
            strategy and biochemistry precision — not from re-reviewing content.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-med feeders we coach in the Boston metro
          </h2>
          <ul>
            <li>
              <strong>Harvard University</strong> — Molecular &amp; Cellular Biology, Human
              Developmental &amp; Regenerative Biology, Neurobiology, Chemistry &amp; Physics
              concentrations.
            </li>
            <li>
              <strong>Massachusetts Institute of Technology (MIT)</strong> — Course 7 (Biology),
              Course 20 (Biological Engineering), Course 9 (Brain &amp; Cognitive Sciences).
            </li>
            <li>
              <strong>Tufts University</strong> — Biology, Biochemistry, Biopsychology; including
              the Tufts Early Assurance Programme and BS/MD-style tracks into Tufts University
              School of Medicine.
            </li>
            <li>
              <strong>Boston University (BU)</strong> — Biology, Biochemistry &amp; Molecular
              Biology, Neuroscience; including the BU Seven-Year Medical Program (LMS).
            </li>
            <li>
              <strong>Brandeis University</strong> — Biology, Biochemistry, Health: Science, Society
              and Policy (HSSP).
            </li>
            <li>
              <strong>Boston College (BC)</strong> — Biology, Biochemistry, Behavioral Neuroscience.
            </li>
            <li>
              <strong>Northeastern University</strong> — Biology, Biochemistry, Behavioral
              Neuroscience; co-op programme.
            </li>
            <li>
              <strong>Wellesley College</strong> — Biological Sciences, Neuroscience.
            </li>
            <li>
              <strong>UMass Amherst pre-meds</strong> — Biology, Biochemistry &amp; Molecular
              Biology; in-state UMass Chan applicants.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Eastern Time fit for Boston students
          </h2>
          <p>
            All live sessions are in Eastern Time. Standard Boston small-batch slot is 7:30 PM to
            9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options.
            This works around the typical Harvard / MIT / Tufts late-afternoon problem set and
            research-lab schedule. Senior Faculty 1:1 can be scheduled at any ET slot, including
            10:00 PM ET for students with late research commitments.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Lexington / Newton / North Shore — the family planning conversation
          </h2>
          <p>
            Per AAMC FACTS, Asian applicants score above the overall MCAT mean (recent cycles around
            510–512 vs about 506 overall), with South Asian applicants a substantial share of the
            Asian pool. The Lexington / Newton / Wellesley / North Shore corridor concentrates this
            cohort.
          </p>
          <p>
            What we hear from Boston parents: (1) most families know the score gap between a 510 and
            a 515 matters more for the application than two more years of research; (2) the calendar
            is the hard part — Harvard / MIT students with serious wet-lab research cannot do a
            normal study schedule during the semester; (3) the Tufts BS/MD early-MCAT track and the
            BU LMS programme have different timelines than standard MCAT. We structure the
            consultation around which track applies to your student.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            How Cerebrum coaches MCAT Bio/Biochem from Boston
          </h2>
          <p>
            <strong>100% online live.</strong> Zoom-based sessions, screen-shared Campbell Biology
            and Lehninger excerpts, AAMC official passage walkthroughs, and a WhatsApp channel for
            between-session doubts. Recording library for asynchronous review. No commute — which
            matters when Boston winter weather can collapse an in-person commute schedule for two
            weeks at a stretch.
          </p>
          <p>
            <strong>Weekly small-batch sessions</strong> (4–6 students max, grouped by target band),
            2 hours each, plus monthly Bio/Biochem section mocks.{' '}
            <strong>Ad-hoc 1:1 sessions</strong> at $135/hour for gap-fill — most Boston students
            book 6–10 of these in the final 6 weeks. Common gap-fill topics for Harvard / MIT
            students: AAMC passage patterns differ from Harvard MCB and MIT Course 7 exam patterns,
            so the rebalancing work is substantial.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            MCAT Biology pricing (USD)
          </h2>
          <ul>
            <li>
              <strong>MCAT Bio/Biochem Pursuit: $449</strong> for the full 4–6 month programme.
              Campbell Biology end-to-end, Lehninger first-semester biochemistry, AAMC content
              outline mapping, 300+ practice passages, recorded library, WhatsApp doubt support.
            </li>
            <li>
              <strong>MCAT Bio/Biochem Ascent: $899</strong> for the full programme. Adds weekly
              2-hour live sessions, monthly section mocks, peer Slack channel, senior faculty office
              hours.
            </li>
            <li>
              <strong>MCAT Bio/Biochem Pinnacle: $1,349</strong> for the full programme. Adds weekly
              90-minute 1:1 video sessions with AIIMS-trained senior faculty, personalised study
              plan, custom passage drills, unlimited WhatsApp faculty access.
            </li>
            <li>
              <strong>Ad-hoc 1:1 tutoring — $135/hour</strong> outside the packaged programme. For
              students using a generalist (Kaplan / Blueprint) and wanting a biology specialist for
              gap-fill — particularly common with Harvard / MIT students.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Boston families</h2>
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
            Start MCAT Biology prep from Boston
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
