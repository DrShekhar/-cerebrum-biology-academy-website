/**
 * /mcat-biology-tutor-houston
 *
 * MCAT Biology city page — Houston metro (UTSW pipeline, Rice + UT
 * Austin undergrad feeders, Sugar Land / Pearland / Katy Indian-American
 * applicant cohort). Self-contained server component. USD pricing.
 * Primary keyword: "MCAT Biology tutor Houston".
 */

import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/mcat-biology-tutor-houston'

export const metadata: Metadata = {
  title: 'MCAT Biology Tutor Houston | Rice, UT Austin, UTSW',
  description:
    'MCAT Bio/Biochem tutor for Houston pre-meds — Rice, UT Austin, A&M, U of H, Sugar Land, Pearland. Biology specialists, CT evening slots. From $449.',
  keywords: [
    'MCAT Biology tutor Houston',
    'MCAT Bio tutor Rice University',
    'MCAT Biology tutor UT Austin',
    'MCAT Biology tutor Texas A&M',
    'MCAT Biology tutor University of Houston',
    'MCAT tutor Sugar Land',
    'MCAT tutor Pearland',
    'MCAT tutor Katy Texas',
    'MCAT Bio/Biochem tutor Texas',
    'Indian American MCAT tutor Houston',
    'Hindi speaking MCAT tutor Texas',
    'online MCAT Biology coaching Houston',
    'MCAT 515 tutor Houston',
    'MCAT 520 tutor Houston',
    'NRI MCAT tutor Texas',
    'UTSW MCAT prep Houston',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology Tutor Houston | Cerebrum Biology Academy',
    description:
      'MCAT Bio/Biochem coaching for Houston pre-meds — Rice, UT Austin, A&M, U of H. CT evenings, Hindi-capable faculty, $449–$1,349.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'MCAT Biology Tutor Houston | Rice, UT Austin, UTSW',
    description:
      'MCAT Bio/Biochem tutor for Houston pre-meds — Rice, UT Austin, A&M, U of H, Sugar Land, Pearland. Biology specialists, CT evening slots. From $449.',
  },
}

const faqs = [
  {
    question:
      'UTSW pipeline plus Rice / UT Austin / A&M pre-meds — what study load actually works?',
    answer:
      'Houston pre-meds aiming for UT Southwestern, Baylor College of Medicine, or McGovern Medical School face a high in-state bar — Texas medical schools accept primarily in-state applicants, which makes the bar competitive. The realistic study load is 250–350 hours of dedicated MCAT prep on top of full-time coursework. We split that as: 12 weeks of content review (10 hrs/week, mostly Self-Paced Campbell + Lehninger), then 8 weeks of passage practice (15 hrs/week, Small-Batch live + AAMC official material), then 4 weeks of full-length practice tests (20 hrs/week, 1:1 Senior Faculty for mock review). Rice and UT Austin students typically front-load content during a summer to avoid overlap with the orgo/biochem semester.',
  },
  {
    question: 'Sugar Land / Pearland / Katy commute to MCAT testing centers — how should I plan?',
    answer:
      'Houston has Pearson VUE MCAT centers in Houston (Galleria area) and Stafford. From Sugar Land or Pearland, that is typically a 25–45 minute drive depending on traffic — manageable but worth planning. We schedule full-length practice tests in the final 4 weeks at the same start time (8:00 AM CT) and from your home base so the test-day cadence is calibrated. For Katy and Cypress families, the Stafford center is usually the shorter drive. We do a logistics check during the diagnostic consultation.',
  },
  {
    question:
      'Is Hindi-speaking faculty available? Several of our family conversations happen in Hindi.',
    answer:
      'Yes. Cerebrum is founded and led by Dr. Shekhar C Singh (AIIMS Delhi), and our senior MCAT Bio/Biochem faculty are bilingual English-Hindi. Student-facing sessions are in English (the MCAT is an English exam, and English fluency is part of the prep), but parent-facing consultations, diagnostic explanations, and family check-ins can be conducted in Hindi if preferred. Many of our Sugar Land and Pearland families use a mix — student in English, parent updates in Hindi.',
  },
  {
    question: 'My child is a Rice undergrad — how do you handle the Rice 4-credit Bio/Chem load?',
    answer:
      'Rice University runs a more intensive 4-credit science course load than most pre-med peer institutions, and the Rice Biosciences and Chemistry departments push deeper than the typical MCAT requires. The practical implication is that Rice students often over-prepare on content depth and under-prepare on AAMC-style passage strategy. We re-balance the prep: less content review (Rice has already covered it), more passage timing, more emphasis on AAMC official material patterns vs Rice exam patterns. The 1:1 Senior Faculty tier is the typical Rice path.',
  },
  {
    question: 'Does Cerebrum coach Texas BS/MD or PMS-style pipelines from Houston?',
    answer:
      'Yes. Baylor2 Medical Track (Baylor University → Baylor College of Medicine), the UT-PACT pipeline (UT-Pan American to BCM), and the Rice/Baylor Medical Scholars Program are the main Texas BS/MD-style tracks. Students in these programmes typically still sit the MCAT (it is not always waived, depending on the specific track) and we coach the Bio/Biochem section. The earlier-MCAT timeline (sometimes end of sophomore year) means we compress the content phase and lean on the Self-Paced async track during the school year.',
  },
  {
    question: 'How does Cerebrum compare to Houston-based in-person MCAT centers?',
    answer:
      'Houston has several in-person MCAT prep options including Kaplan, The Princeton Review, and smaller Texas-based providers. These are full-MCAT generalists ($2,500–$3,000 for the in-person course) covering all four sections with rotating faculty. Cerebrum is a biology-section specialist — we cover Bio/Biochem and the biology content in Psych/Soc with biology-only faculty. Our Small-Batch is $899 vs Kaplan in-person around $2,700. Many Houston students pair us with a generalist for the non-biology sections.',
  },
  {
    question:
      'I am a UT Austin pre-med but my family is in Sugar Land — does this page apply to me?',
    answer:
      'Yes. UT Austin pre-meds are a major Houston-metro applicant source — many students travel home to Sugar Land, Katy, or The Woodlands during winter and summer breaks, and that is often when content review happens. We coach the UT Austin cohort heavily, with the standard CT evening slot working for both Austin and Houston families. The curriculum and faculty are the same regardless of which campus the student is on.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Biology Tutor for Houston Students',
  description:
    'MCAT Bio/Biochem section tutoring for Houston pre-meds — Rice, UT Austin, Texas A&M, University of Houston, Sugar Land, Pearland, Katy. Biology specialists, Campbell + Lehninger, CT evening slots.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  availableLanguage: ['English', 'Hindi'],
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
    name: 'Houston Metro (Sugar Land, Pearland, Katy, The Woodlands)',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'TX',
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
    { '@type': 'ListItem', position: 3, name: 'Houston', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm a Houston pre-med (or parent) preparing for the MCAT. I'd like Bio/Biochem programme details, CT slot availability, and pricing. Please share."
  )

export default function MCATBiologyTutorHoustonPage() {
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
            <span className="text-white">Houston</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            MCAT Biology Tutor for Houston Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            MCAT Bio/Biochem coaching for pre-meds at Rice University, UT Austin, Texas A&amp;M,
            University of Houston, and Baylor — targeting UTSW, Baylor College of Medicine, and
            McGovern Medical School. Built for the Sugar Land / Pearland / Katy / The Woodlands
            Indian-American applicant cohort. AIIMS-trained biology specialists, Campbell +
            Lehninger curriculum, Central Time evening sessions, bilingual English-Hindi parent
            consultations, $449 to $1,349.
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
          <p className="mt-3 text-sm font-medium text-slate-300">
            WhatsApp is free from the US — no international call needed.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why Houston is a Tier-1 MCAT applicant market
          </h2>
          <p>
            Houston combines three factors that make it one of the densest MCAT pre-med markets in
            the country. First, the Texas Medical Center — the largest medical complex in the world
            — anchors a feedback loop where Houston-area students grow up around clinical practice
            and target Baylor College of Medicine, UTHealth McGovern Medical School, and (via
            Dallas) UT Southwestern. Second, a deep undergrad pipeline: Rice University, UT Austin,
            Texas A&amp;M College Station, University of Houston, and Baylor University in Waco
            collectively produce thousands of Texas-resident MCAT takers each cycle. Third, a
            growing South Asian community: Sugar Land, Pearland, Katy, Missouri City, and The
            Woodlands have some of the fastest-growing Indian-American populations in the South,
            with medicine still a strong career pull.
          </p>
          <p>
            Texas medical schools admit primarily in-state applicants (often 80–90% of the class),
            which raises the in-state bar significantly — and the Bio/Biochem section is where Texas
            applicants commonly need the marginal points.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-med feeders we coach in the Houston metro
          </h2>
          <ul>
            <li>
              <strong>Rice University</strong> — Biosciences and Chemistry majors; deeper-than-MCAT
              content coverage, needs passage-strategy rebalancing.
            </li>
            <li>
              <strong>UT Austin</strong> — Biology, Biochemistry, Neuroscience; the largest single
              feeder to Texas medical schools.
            </li>
            <li>
              <strong>Texas A&amp;M University</strong> — Biomedical Sciences, Biology, and the
              EnMed integrated track.
            </li>
            <li>
              <strong>University of Houston</strong> — Biology, Biochemistry &amp; Molecular
              Biology; strong feeder to UTHealth McGovern.
            </li>
            <li>
              <strong>Baylor University (Waco)</strong> — Biochemistry, Medical Humanities, and the
              Baylor2 Medical Track BS/MD.
            </li>
            <li>
              <strong>UT Dallas</strong> — Biology and the UT-PACT BS/MD pipeline.
            </li>
            <li>
              <strong>UT San Antonio (UTSA)</strong> — Biology and the FAME pre-med program.
            </li>
            <li>
              <strong>Houston-area BS/MD pipelines</strong> — Baylor2, UT-PACT, Rice/Baylor Medical
              Scholars.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Central Time fit for Texas students
          </h2>
          <p>
            All live sessions are in Central Time. Standard Houston small-batch slot is 7:00 PM to
            9:00 PM CT on weekday evenings, with 9:00 AM to 11:00 AM CT Saturday and Sunday options.
            This works for Rice and UT Austin students whose semester labs commonly run until 5–6
            PM. Senior Faculty 1:1 can be scheduled flexibly including 10:00 PM CT for students with
            late evening shifts at the Texas Medical Center.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Indian-American Houston families — language and family-facing notes
          </h2>
          <p>
            Per AAMC FACTS, Asian applicants score above the overall MCAT mean (recent cycles around
            510–512 vs about 506 overall), with South Asian applicants a substantial share of the
            Asian pool. Sugar Land, Pearland, and Missouri City have the highest Indian-American
            density in the Houston metro.
          </p>
          <p>
            Practically, this means: (a) parent consultations are commonly bilingual — student
            tutoring stays in English, but Hindi parent updates are available on request; (b) family
            decision-making is often joint (parent + student), so we structure the consultation to
            include both; (c) the cultural expectation of medicine as a career path is real, but the
            financial conversation about $449 vs $1,349 should be paced — we recommend starting with
            Small-Batch and adding 1:1 hours only where the diagnostic shows specific gaps.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            How Cerebrum coaches MCAT Bio/Biochem from Houston
          </h2>
          <p>
            <strong>100% online live.</strong> Zoom-based sessions, screen-shared Campbell Biology
            and Lehninger excerpts, AAMC official passage walkthroughs, and a WhatsApp channel for
            between-session doubts. Recording library for asynchronous review. No commute to a
            physical center — which matters when traffic on I-69 or 290 can eat 90 minutes round
            trip.
          </p>
          <p>
            <strong>Weekly small-batch sessions</strong> (4–6 students max), 2 hours each, plus
            monthly Bio/Biochem section mocks. <strong>Ad-hoc 1:1 sessions</strong> at $135/hour for
            gap-fill — most Houston students book 4–8 of these in the final 6 weeks, typically on
            enzyme kinetics, amino acid biochemistry, or molecular biology passages.
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
              plan, custom passage drills, unlimited WhatsApp access.
            </li>
            <li>
              <strong>Ad-hoc 1:1 tutoring — $135/hour</strong> outside the packaged programme. For
              students using a generalist (Kaplan / Blueprint) and wanting a biology specialist for
              gap-fill.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Houston families</h2>
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
            Start MCAT Biology prep from Houston
          </h2>
          <p className="text-blue-100 mb-8">
            Free 30-minute diagnostic in a CT-friendly slot. Parent consultation available in
            English or Hindi.
          </p>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 88264-44334
          </a>
          <p className="mt-3 text-sm font-medium text-blue-100">
            WhatsApp is free from the US — no international call needed.
          </p>
        </div>
      </section>
    </main>
  )
}
