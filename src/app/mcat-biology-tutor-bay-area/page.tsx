/**
 * /mcat-biology-tutor-bay-area
 *
 * MCAT Biology city page — San Francisco Bay Area (UC Berkeley, Stanford,
 * UCSF undergrad pipeline, Cupertino / Fremont / Palo Alto South Asian
 * applicant cohort). Self-contained server component. USD pricing.
 * Primary keyword: "MCAT Biology tutor Bay Area".
 */

import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/mcat-biology-tutor-bay-area'

export const metadata: Metadata = {
  title: 'MCAT Biology Tutor Bay Area | Berkeley, Stanford, UCSF',
  description:
    'MCAT Bio/Biochem tutor for SF Bay Area pre-meds — UC Berkeley, Stanford, UCSF, Davis, San Jose State. Biology specialists, PT evening slots. From $449.',
  keywords: [
    'MCAT Biology tutor Bay Area',
    'MCAT Bio tutor Berkeley',
    'MCAT Biology tutor Stanford',
    'MCAT Biology tutor UCSF',
    'MCAT Biology tutor San Francisco',
    'MCAT tutor Cupertino',
    'MCAT tutor Fremont',
    'MCAT tutor Palo Alto',
    'MCAT Bio/Biochem tutor California',
    'Indian American MCAT tutor Bay Area',
    'online MCAT Biology coaching San Francisco',
    'MCAT 520 tutor Bay Area',
    'MCAT 515 tutor Berkeley',
    'NRI MCAT tutor California',
    'Pacific Time MCAT prep',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology Tutor Bay Area | Cerebrum Biology Academy',
    description:
      'MCAT Bio/Biochem tutoring for Bay Area pre-meds — Berkeley, Stanford, UCSF, Cupertino/Fremont/Palo Alto families. PT evenings, $449–$1,349.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: { card: 'summary_large_image' as const },
}

const faqs = [
  {
    question:
      'How do you handle the Berkeley / Stanford / UCSF pre-med squeeze — labs, research, MCAT all at once?',
    answer:
      'This is the dominant Bay Area planning problem. Berkeley MCB and Stanford Biology majors typically take Cell Biology, Genetics, and Physical Chemistry in the same window, plus a Tu/Th research commitment in a wet lab. We solve it by front-loading the Self-Paced async content review for the semester (students do Campbell Biology chapters on their own schedule), then layering Small-Batch live sessions in the final 8–10 weeks for passage practice. Senior Faculty 1:1 is reserved for true gap-fill — typically biochem amino acid topics that Berkeley MCB 102 and Stanford BIO 86 cover at different depths than the MCAT tests.',
  },
  {
    question:
      'My family is in Cupertino / Fremont / Palo Alto — does an online programme actually make sense for us?',
    answer:
      'Yes, because the alternative is worse. Bay Area in-person MCAT centers are typically in San Francisco or Berkeley — a 45-90 minute commute each way from Cupertino, Fremont, or Mountain View. That is 2 hours of car time you could spend studying. Our 100% online model removes that. The trade-off most South Asian families weigh is "in-person feels more serious" vs "online gives back 10 hours a week" — once the student is past content review, the second matters more for the score outcome.',
  },
  {
    question: 'How does Pacific Time batch fit work when most MCAT prep peers are East Coast?',
    answer:
      'We run a dedicated PT evening slot — typically 6:30 PM to 8:30 PM Pacific on weekday evenings, with 10:00 AM to noon Saturday and Sunday options. This is a separate small-batch from our ET / IST slots, so Bay Area students are not stretching to fit an East Coast schedule. For students who want 1:1, the Senior Faculty session can be scheduled at any PT slot, including early morning (7 AM PT) for students who prefer pre-class study time.',
  },
  {
    question: 'My child is at UC Davis or UC Santa Cruz — does the "Bay Area" page still apply?',
    answer:
      'Yes. UC Davis pre-meds (typically Biological Sciences or Neurobiology majors) and UC Santa Cruz pre-meds are part of the Northern California pre-med ecosystem. Davis has a heavy biology research culture and feeds UC Davis School of Medicine; Santa Cruz has a smaller pre-med cohort but strong MCB. The PT timezone fit and the curriculum (Campbell + Lehninger) are identical to Berkeley/Stanford. The only difference is some Davis students prefer the Self-Paced track during the heavier quarter-system course load.',
  },
  {
    question:
      'I am a Stanford gap-year applicant — when in the gap year should I start Bio/Biochem prep?',
    answer:
      'Stanford pre-meds who take a gap year typically split it: research or clinical work for 6–9 months, then MCAT prep for 3–4 months ahead of a spring or summer test date. Our 4-month Small-Batch fits this exactly. If you are already 510+ on a diagnostic (Stanford applicants often are after the MCB sequence), the 1:1 Senior Faculty programme is calibrated to push from 515 → 520, with custom passage drilling on the topics where AAMC official material differs from Stanford BIO 82–86 coverage.',
  },
  {
    question:
      'How does Cerebrum compare to Bay Area in-person providers like AltiusPrep or NextStep?',
    answer:
      'other generalist MCAT brands is an excellent 1:1 generalist at ~$175/hour — they cover all four sections with subject-rotating tutors. NextStep (Blueprint) is a popular full-course generalist. Cerebrum is a biology-section specialist — we go deeper on the Bio/Biochem section than a generalist rotation does, and our $135/hour ad-hoc rate is below other generalist MCAT brands. Many Bay Area students use other generalist MCAT brands or Blueprint for the full course and add our Bio/Biochem 1:1 for gap-fill on the biology side.',
  },
  {
    question: 'Will UCSF or Stanford BS/MD or feeder-track students be coached differently?',
    answer:
      'UCSF does not have an undergrad pre-med pipeline (it is a graduate medical school only), so UCSF medical students are typically Berkeley, Stanford, or UC system undergrads. Stanford has no formal BS/MD program, but the gap-year-to-Stanford-Medicine track is the dominant pattern. We coach based on diagnostic baseline and target band, not program label — a Berkeley MCB junior at 508 and a Stanford gap-year at 515 are on different study plans.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Biology Tutor for Bay Area Students',
  description:
    'MCAT Bio/Biochem section tutoring for San Francisco Bay Area pre-meds — UC Berkeley, Stanford, UCSF, UC Davis, San Jose State. Biology specialists, Campbell + Lehninger, PT evening slots.',
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
    name: 'San Francisco Bay Area (Berkeley, Stanford, Cupertino, Fremont, Palo Alto)',
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
    { '@type': 'ListItem', position: 3, name: 'Bay Area', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm a Bay Area pre-med (or parent) preparing for the MCAT. I'd like Bio/Biochem programme details, PT slot availability, and pricing. Please share."
  )

export default function MCATBiologyTutorBayAreaPage() {
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
            <span className="text-white">Bay Area</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            MCAT Biology Tutor for Bay Area Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            MCAT Bio/Biochem coaching for pre-meds at UC Berkeley (MCB and IB), Stanford Biology, UC
            Davis, San Jose State, and UC Santa Cruz — plus the Cupertino / Fremont / Palo Alto /
            Sunnyvale South Asian applicant cohort heading toward UCSF, Stanford Medicine, and
            top-20 US medical schools. AIIMS-trained biology specialists, Campbell Biology +
            Lehninger curriculum, Pacific Time evening sessions, $449 to $1,349.
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
            Why the Bay Area is a dense MCAT applicant market
          </h2>
          <p>
            The San Francisco Bay Area is a concentrated pre-med ecosystem with three structural
            drivers. First, the undergrad pipeline: UC Berkeley Molecular &amp; Cell Biology and
            Integrative Biology, Stanford Biology and Human Biology, UC Davis Neurobiology, San Jose
            State Biology, and UC Santa Cruz MCB collectively produce thousands of MCAT takers each
            cycle. Second, the South Asian density: Cupertino, Fremont, Sunnyvale, Palo Alto,
            Milpitas, and Dublin are among the highest-concentration Indian-American zip codes in
            the country, with medicine still a culturally weighted career path despite the
            tech-industry pull. Third, in-state med-school competition: UCSF, Stanford, UCSD, UC
            Davis, UC Irvine, and UCLA together accept a small fraction of the in-state pool,
            forcing applicants to score competitively or apply broadly out of state.
          </p>
          <p>
            For our coaching, that translates into students starting from already-high baselines
            (510+ is common after the MCB or HumBio sequence) and needing the marginal 5–10 points
            that come from passage strategy and biochemistry precision, not from content review.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-med feeders we coach in the Bay Area
          </h2>
          <ul>
            <li>
              <strong>UC Berkeley</strong> — Molecular &amp; Cell Biology, Integrative Biology, and
              Public Health pre-med tracks.
            </li>
            <li>
              <strong>Stanford University</strong> — Biology, Human Biology, and Bioengineering
              majors; gap-year-to-Stanford-Medicine track.
            </li>
            <li>
              <strong>UC San Francisco (UCSF)</strong> — graduate medical school (no undergrad); we
              coach feeder undergrads applying in.
            </li>
            <li>
              <strong>UC Davis</strong> — Neurobiology, Physiology &amp; Behavior, Biological
              Sciences; strong feeder to UC Davis School of Medicine.
            </li>
            <li>
              <strong>UC Santa Cruz</strong> — Molecular, Cell, and Developmental Biology.
            </li>
            <li>
              <strong>San Jose State University</strong> — Biological Sciences and Biomedical
              Engineering pre-med.
            </li>
            <li>
              <strong>Santa Clara University</strong> — Biology, Biochemistry, and Public Health
              Science.
            </li>
            <li>
              <strong>Stanford Online High School / BASIS Independent Silicon Valley</strong> —
              early-track students planning BS/MD pathways out of state.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pacific Time fit for Bay Area students
          </h2>
          <p>
            All live sessions are in Pacific Time. Standard Bay Area small-batch slot is 6:30 PM to
            8:30 PM PT on weekday evenings, with 10:00 AM to noon PT Saturday and Sunday options.
            Senior Faculty 1:1 can be scheduled flexibly, including 7:00 AM PT for students who
            prefer pre-class morning study. The PT slot is run independently from our ET cohort —
            you are not stretching to fit an East Coast schedule.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            The Indian-American applicant cohort — what actually drives outcomes
          </h2>
          <p>
            Per AAMC FACTS tables, Asian applicants score above the overall mean on the MCAT —
            recent cycles show roughly 510–512 mean for Asian applicants vs around 506 overall, and
            Asian applicants are over-represented in the 515+ band. Within the Asian applicant pool,
            South Asian (Indian-American) applicants are a substantial share, and the Bay Area
            concentrates this cohort more than almost anywhere outside New Jersey and the northeast.
          </p>
          <p>
            What that means practically: most Indian-American Bay Area students walk in at 508–512
            after a strong undergrad biology sequence. The score gap to a competitive UCSF /
            Stanford / top-20 application is 5–8 points — and those points come from passage
            reasoning under timed pressure, not from re-reading Campbell. Our 1:1 Senior Faculty
            track is specifically structured around that gap.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            How Cerebrum coaches MCAT Bio/Biochem from the Bay Area
          </h2>
          <p>
            <strong>100% online live.</strong> Zoom-based sessions, screen-shared Campbell Biology
            and Lehninger excerpts, AAMC official passage walkthroughs, and a WhatsApp channel for
            between-session doubts. Recording library for asynchronous review. No commute to a
            physical center — which matters when the alternative is a 45–90 minute drive into San
            Francisco.
          </p>
          <p>
            <strong>Weekly small-batch sessions</strong> (4–6 students max, grouped by target band),
            2 hours each, plus monthly Bio/Biochem section mocks.{' '}
            <strong>Ad-hoc 1:1 sessions</strong> at $135/hour for gap-fill — most Bay Area students
            book 4–8 of these in the final 6 weeks on biochem amino acid topics, oxidative
            phosphorylation, or molecular biology passages.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            MCAT Biology pricing (USD)
          </h2>
          <ul>
            <li>
              <strong>MCAT Bio/Biochem Pursuit: $449</strong> for the full 4–6 month programme.
              Async Campbell Biology end-to-end plus Lehninger first-semester biochemistry, AAMC
              content outline mapping, 300+ practice passages, recorded library, WhatsApp doubt
              support.
            </li>
            <li>
              <strong>MCAT Bio/Biochem Ascent: $899</strong> for the full programme. Adds
              weekly 2-hour live sessions with biology-specialist faculty, monthly section mocks,
              peer Slack channel, senior faculty office hours.
            </li>
            <li>
              <strong>MCAT Bio/Biochem Pinnacle: $1,349</strong> for the full programme.
              Adds weekly 90-minute 1:1 video sessions with AIIMS-trained senior faculty,
              personalised study plan, custom passage drills, unlimited WhatsApp faculty access.
            </li>
            <li>
              <strong>Ad-hoc 1:1 tutoring — $135/hour</strong> outside the packaged programme. For
              students using other generalist MCAT brands / Blueprint / other generalist test-prep brands as the generalist provider and
              wanting a biology specialist for gap-fill.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Bay Area families</h2>
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
            Start MCAT Biology prep from the Bay Area
          </h2>
          <p className="text-blue-100 mb-8">
            Free 30-minute diagnostic with senior faculty in a PT-friendly slot. Bring an AAMC FL or
            sample section — we will benchmark Bio/Biochem against your target band.
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
