/**
 * /mcat-biology-tutor-atlanta
 *
 * MCAT Biology city page — Atlanta metro (Emory, Georgia Tech, UGA
 * pipeline, Alpharetta / Johns Creek / Cumming North Atlanta South Asian
 * applicant cohort). Self-contained server component. USD pricing.
 * Primary keyword: "MCAT Biology tutor Atlanta".
 */

import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/mcat-biology-tutor-atlanta'

export const metadata: Metadata = {
  title: 'MCAT Biology Tutor Atlanta | Emory, Georgia Tech, UGA',
  description:
    'MCAT Bio/Biochem tutor for Atlanta pre-meds — Emory, Georgia Tech, UGA, Alpharetta, Johns Creek, Cumming. Biology specialists, ET evening slots. From $449.',
  keywords: [
    'MCAT Biology tutor Atlanta',
    'MCAT Bio tutor Emory',
    'MCAT Biology tutor Georgia Tech',
    'MCAT Biology tutor UGA',
    'MCAT Biology tutor Athens GA',
    'MCAT tutor Alpharetta',
    'MCAT tutor Johns Creek',
    'MCAT tutor Cumming Georgia',
    'MCAT Bio/Biochem tutor Georgia',
    'Indian American MCAT tutor Atlanta',
    'online MCAT Biology coaching Atlanta',
    'MCAT 515 tutor Atlanta',
    'MCAT 520 tutor Atlanta',
    'BS MD prep Atlanta',
    'NRI MCAT tutor Georgia',
    'Emory pre-med MCAT prep',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology Tutor Atlanta | Cerebrum Biology Academy',
    description:
      'MCAT Bio/Biochem coaching for Atlanta pre-meds — Emory, Georgia Tech, UGA. ET evening slots, $449–$1,349.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },

  twitter: { card: 'summary_large_image' as const },
}

const faqs = [
  {
    question:
      'Emory and Georgia Tech junior or senior year — how do students balance MCAT prep with the course load?',
    answer:
      'Emory pre-meds (Biology, Chemistry, Neuroscience &amp; Behavioral Biology majors) and Georgia Tech pre-meds (Biology, Biochemistry, Biomedical Engineering majors) face a similar squeeze: junior year typically stacks Cell Biology + Genetics + Organic Chemistry II + Biochemistry, plus a research lab commitment, plus extracurricular hours for application strength. The realistic MCAT study load on top of that is 8–10 hours a week during the semester, ramping to 25–30 hours a week during the summer or a dedicated prep gap. We use the Self-Paced track for during-semester content review, then switch to Small-Batch live + 1:1 in the summer prep block. Georgia Tech BME students often need extra time on the physics-adjacent biology topics (membrane transport, fluid dynamics in cardiovascular).',
  },
  {
    question:
      'My family is in Alpharetta / Johns Creek / Cumming — when should my child start MCAT prep?',
    answer:
      'For most pre-meds, the sweet spot is starting content review 6–8 months before the target test date. For Alpharetta / Johns Creek / Cumming families specifically — where many students attend Emory, Georgia Tech, or UGA and come home for summer — we recommend: (a) start the Self-Paced track in January of junior year for a summer or early-fall MCAT, (b) add Small-Batch live sessions starting May, (c) add 1:1 in the final 6–8 weeks for passage and mock review. Starting earlier (sophomore summer) is fine for BS/MD-track students who plan to apply early; starting later (final 3 months only) is workable but pushes the schedule.',
  },
  {
    question: 'What about BS/MD pipelines from Atlanta — does Cerebrum coach the early-MCAT track?',
    answer:
      'Yes. The main BS/MD-style pipelines accessible from Atlanta include the Emory Scholars-to-MD track (not a guaranteed BS/MD but a strong feeder), Mercer School of Medicine pipelines from Mercer undergrad, and out-of-state BS/MD programmes (Penn State PMHS, Brown PLME, Drexel BS/MD) that Atlanta students apply into. Students in these tracks sometimes sit the MCAT earlier (end of sophomore year or junior year) and we compress the content phase accordingly — heavier reliance on the Self-Paced async track during the school year and concentrated live sessions in the summer between sophomore and junior year.',
  },
  {
    question: 'Does the Atlanta metro have decent MCAT testing center access?',
    answer:
      'Yes. Atlanta has Pearson VUE MCAT centers in Atlanta proper, Marietta, and Duluth. From Alpharetta or Johns Creek, the Duluth center is typically the shortest drive (15–25 minutes); from Cumming, Duluth is also closest. From the Emory or Georgia Tech campus, the Atlanta center is closest. We schedule final-4-week full-length practice tests at your home base, starting at 8:00 AM ET, to calibrate the test-day cadence.',
  },
  {
    question: 'My child is at UGA in Athens — how do you handle the Athens distance?',
    answer:
      'No different from any other Georgia student. All sessions are online, so Athens vs Atlanta vs Alpharetta makes no difference for the coaching itself. The standard ET evening slot (7:30 PM to 9:30 PM ET) works for UGA students whose late afternoon labs typically end by 6 PM. Many UGA pre-meds also come home to Atlanta for breaks, where they can continue with the same schedule. UGA has a strong biology and biochemistry department, so Athens-based students often start from a solid content baseline.',
  },
  {
    question: 'How does Cerebrum compare to Atlanta-based in-person prep?',
    answer:
      'Atlanta has the standard generalist in-person providers (other generalist test-prep brands Atlanta, other generalist test-prep brands Atlanta) plus a few smaller boutique tutors. The generalists are $2,500–$3,000 for the full-MCAT course covering all four sections with rotating subject faculty. Cerebrum is a biology-section specialist — Bio/Biochem and the biology content in Psych/Soc, with biology-only faculty. Our Small-Batch is $899 vs other generalist MCAT brands in-person around $2,700. Many Atlanta students pair Cerebrum with a generalist provider for the chemistry/physics and CARS sections.',
  },
  {
    question: 'Will Hindi or Telugu parent consultations be available?',
    answer:
      'English-Hindi is standard — our faculty are bilingual. Telugu and other South Asian languages are not guaranteed, but the diagnostic consultation and milestone parent updates can be done in Hindi if preferred. Student-facing tutoring sessions stay in English (the MCAT is an English exam and English-language reasoning fluency is part of the prep itself).',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Biology Tutor for Atlanta Students',
  description:
    'MCAT Bio/Biochem section tutoring for Atlanta pre-meds — Emory, Georgia Tech, UGA, Alpharetta, Johns Creek, Cumming. Biology specialists, Campbell + Lehninger, ET evening slots.',
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
    name: 'Atlanta Metro (Alpharetta, Johns Creek, Cumming, Sandy Springs, Duluth)',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'GA',
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
    { '@type': 'ListItem', position: 3, name: 'Atlanta', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm an Atlanta pre-med (or parent) preparing for the MCAT. I'd like Bio/Biochem programme details, ET slot availability, and pricing. Please share."
  )

export default function MCATBiologyTutorAtlantaPage() {
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
            <span className="text-white">Atlanta</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            MCAT Biology Tutor for Atlanta Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            MCAT Bio/Biochem coaching for pre-meds at Emory, Georgia Tech, UGA, Mercer, and Georgia
            State — built for the North Atlanta South Asian applicant cohort in Alpharetta, Johns
            Creek, Cumming, Sandy Springs, and Duluth. AIIMS-trained biology specialists, Campbell
            Biology + Lehninger curriculum, Eastern Time evening sessions, $449 to $1,349.
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
            Why Atlanta is a Tier-2 MCAT applicant market with Tier-1 demographics
          </h2>
          <p>
            Atlanta is one of the fastest-growing pre-med markets in the South, driven by three
            factors. First, the undergrad pipeline: Emory University (with the Rollins School of
            Public Health adjacency and the Emory School of Medicine feedback loop), Georgia Tech
            (Biology and Biomedical Engineering), University of Georgia (Athens), Mercer University,
            and Georgia State together produce a steady applicant flow. Second, the North Atlanta
            South Asian community: Alpharetta, Johns Creek, Cumming, Sandy Springs, and Duluth have
            seen Indian-American population growth over the past decade, with medicine still a
            culturally weighted career path. Third, the regional medical-school spread: Emory, MCG
            in Augusta, Mercer School of Medicine, Morehouse School of Medicine, and PCOM Georgia
            give Georgia residents multiple in-state pathways.
          </p>
          <p>
            For our coaching, Atlanta students typically start from a solid content baseline (Emory
            and Georgia Tech bio sequences are rigorous) but need help on AAMC passage patterns and
            biochemistry precision — the same gap we see in Bay Area and Boston students.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-med feeders we coach in the Atlanta metro
          </h2>
          <ul>
            <li>
              <strong>Emory University</strong> — Biology, Chemistry, Neuroscience &amp; Behavioral
              Biology, Quantitative Sciences; deep feeder to Emory School of Medicine.
            </li>
            <li>
              <strong>Georgia Institute of Technology (Georgia Tech)</strong> — Biology,
              Biochemistry, Biomedical Engineering pre-med.
            </li>
            <li>
              <strong>University of Georgia (UGA, Athens)</strong> — Biology, Biochemistry,
              Microbiology, Cellular Biology.
            </li>
            <li>
              <strong>Mercer University</strong> — Biology and the Mercer-to-Mercer-Medicine
              pipeline.
            </li>
            <li>
              <strong>Georgia State University</strong> — Biology, Neuroscience, Biomedical
              Sciences.
            </li>
            <li>
              <strong>Oglethorpe University</strong> — small but strong pre-med tradition in
              Brookhaven.
            </li>
            <li>
              <strong>Out-of-state Georgia residents</strong> — Atlanta students at Duke, UNC,
              Vandy, and Ivy League schools who come home for breaks and summer prep.
            </li>
            <li>
              <strong>BS/MD-track high school students</strong> — North Atlanta magnets (Lambert,
              Northview, Walton) applying to BS/MD programmes nationally.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Eastern Time fit for Atlanta students
          </h2>
          <p>
            All live sessions are in Eastern Time. Standard Atlanta small-batch slot is 7:30 PM to
            9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options.
            This works for Emory and Georgia Tech students whose late-afternoon labs commonly run
            until 5–6 PM, and for UGA students in Athens with similar timing.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            North Atlanta Indian-American families — what we hear from parents
          </h2>
          <p>
            Per AAMC FACTS, Asian applicants score above the overall MCAT mean — recent cycles show
            roughly 510–512 for Asian applicants vs around 506 overall, with South Asian applicants
            a substantial share of the Asian pool. In North Atlanta, the Alpharetta / Johns Creek /
            Cumming corridor concentrates this demographic.
          </p>
          <p>
            Practically, this translates into three planning conversations we have repeatedly with
            parents: (1) start content review the summer before junior year, not the summer before
            senior year; (2) BS/MD-track applications need MCAT scores submitted earlier, sometimes
            by January of senior year of high school for guaranteed-admission programmes; (3) the
            difference between a 510 and a 515 score is mostly passage reasoning, not content
            re-reading — invest the marginal hours in passage practice, not in re-doing Campbell
            Biology chapters.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            How Cerebrum coaches MCAT Bio/Biochem from Atlanta
          </h2>
          <p>
            <strong>100% online live.</strong> Zoom-based sessions, screen-shared Campbell Biology
            and Lehninger excerpts, AAMC official passage walkthroughs, and a WhatsApp channel for
            between-session doubts. Recording library for asynchronous review.
          </p>
          <p>
            <strong>Weekly small-batch sessions</strong> (4–6 students max, grouped by target band),
            2 hours each, plus monthly Bio/Biochem section mocks.{' '}
            <strong>Ad-hoc 1:1 sessions</strong> at $135/hour for gap-fill — most Atlanta students
            book 4–8 of these in the final 6 weeks on enzyme kinetics, oxidative phosphorylation, or
            molecular biology passages.
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
              <strong>MCAT Bio/Biochem Ascent: $899</strong> for the full programme. Adds
              weekly 2-hour live sessions, monthly section mocks, peer Slack channel, senior faculty
              office hours.
            </li>
            <li>
              <strong>MCAT Bio/Biochem Pinnacle: $1,349</strong> for the full programme.
              Adds weekly 90-minute 1:1 video sessions with AIIMS-trained senior faculty,
              personalised study plan, custom passage drills, unlimited WhatsApp faculty access.
            </li>
            <li>
              <strong>Ad-hoc 1:1 tutoring — $135/hour</strong> outside the packaged programme. For
              students using other generalist MCAT brands as the generalist provider and wanting
              biology-specialist gap-fill.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Atlanta families</h2>
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
            Start MCAT Biology prep from Atlanta
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
