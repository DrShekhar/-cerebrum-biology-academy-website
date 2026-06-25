import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { mcatMetros } from '@/data/mcat/metros'
import {
  ArrowRight,
  BookOpen,
  Target,
  Users,
  Award,
  MessageCircle,
  DollarSign,
  Microscope,
  GraduationCap,
  Layers,
} from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/mcat-biology'

export const metadata: Metadata = {
  title: 'MCAT Biology Tutoring Hub | B/B Section, Biochem & Passage Strategy | Cerebrum',
  description:
    'Bio-only MCAT specialist tutoring. AAMC-aligned B/B (Biological & Biochemical Foundations) coaching, biochem mastery, and passage-strategy frameworks. Bundles from $499. Premed-focused.',
  keywords: [
    'MCAT Biology',
    'MCAT Biology tutor',
    'MCAT B/B section',
    'MCAT Biological and Biochemical Foundations',
    'MCAT Biochemistry tutoring',
    'MCAT passage strategy',
    'MCAT premed tutor',
    'MCAT Biology online',
    'AAMC MCAT Biology',
    'USMLE Step 1 Biology preparation',
  ],
  openGraph: {
    title: 'MCAT Biology Tutoring Hub | Bio-Only Specialist | Cerebrum',
    description:
      'Bio-only MCAT specialist — AAMC-aligned B/B coaching, biochem mastery, passage strategy. Bundles from $499 (vs Kaplan/The Princeton Review).',
    type: 'website',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCAT Biology Tutoring Hub | Cerebrum',
    description:
      'Bio-only MCAT specialist tutoring. AAMC-aligned B/B + biochem coaching from $499. Built for premed students.',
  },
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const hubFAQs = [
  {
    question: 'What does MCAT B/B (Biological & Biochemical Foundations) test?',
    answer:
      'The Biological and Biochemical Foundations of Living Systems section (B/B) is one of four scored MCAT sections. It contains 59 questions over 95 minutes, drawn from introductory biology (about 65%), biochemistry (about 25%), general chemistry (about 5%), and organic chemistry (about 5%). Roughly 75% of questions are passage-based and 25% are stand-alone discretes. Content is anchored to ten AAMC foundational concepts spanning molecular biology, cell biology, genetics, physiology, and biochemistry.',
  },
  {
    question: 'How does Cerebrum map AAMC topics to Campbell Biology and Lehninger Biochemistry?',
    answer:
      'We maintain a chapter-level crosswalk that maps every AAMC B/B foundational concept and content category to specific Campbell Biology chapters and Lehninger Principles of Biochemistry sections. For example, AAMC Foundational Concept 1 (biomolecules) maps to Campbell Ch 5 plus Lehninger Ch 3 to 6; Foundational Concept 2 (cellular processes) maps to Campbell Ch 6 to 12; Foundational Concept 3 (organ system physiology) maps to Campbell Ch 40 to 49. This lets students who already own these textbooks reuse them as primary references instead of buying a new prep stack.',
  },
  {
    question: 'What is the Cerebrum MCAT Biology pricing structure?',
    answer:
      'We offer three flat-fee bundles plus ad-hoc hourly tutoring. The Starter bundle is $499 for 10 hours of focused tutoring covering one section or a targeted weak area. The Standard bundle is $999 for 25 hours covering full B/B plus biochem. The Comprehensive bundle is $1,499 for 50 hours covering B/B, biochem, passage strategy, full-length review, and exam-week coaching. Ad-hoc lessons are $150 per hour. Pricing is intentionally lower per section than Kaplan, The Princeton Review, or Blueprint because we are bio-only specialists, not a general prep company.',
  },
  {
    question: 'Why pick a bio-only MCAT specialist instead of a generalist MCAT brand?',
    answer:
      'Generalist prep companies like Kaplan and The Princeton Review bundle all four MCAT sections at $2,500 to $7,000, with rotating instructors who often teach only one section well. If your strength is C/P or CARS but you need rescue on Bio and Biochem, you are still paying for sections you have already mastered. Cerebrum is led by Dr. Shekhar C Singh, who has trained biology students for NEET, IB, AP, and Olympiad pathways for 20+ years. Our model mirrors Jack Westin’s CARS-specialist wedge: deep, single-vertical mastery at lower cost than a general bundle.',
  },
  {
    question: 'What is the Cerebrum MCAT B/B passage-strategy framework?',
    answer:
      'Our passage framework has four phases. Phase 1: triage — read the question stem first, identify whether the passage is experimental, expository, or descriptive, and predict the likely question types. Phase 2: skim and anchor — read the first sentence of each paragraph, identify figures and tables, and mark experimental variables. Phase 3: targeted re-read — only re-read the section that the question references. Phase 4: discrete-style elimination on passage questions. Students who internalize this framework typically gain 4 to 8 scaled points on B/B section practice.',
  },
  {
    question: 'Does Cerebrum tutoring help with USMLE Step 1 Biology preparation?',
    answer:
      'Yes. Roughly 40% of USMLE Step 1 content is downstream of MCAT B/B foundations — biochemistry pathways, molecular biology, genetics, cell biology, and physiology. Students who plan to attend US medical school benefit from our integrated MCAT-to-Step 1 bridge, which carries First Aid for the USMLE Step 1 references alongside Campbell and Lehninger. We have a dedicated USMLE Step 1 Biology preparation page for students past the MCAT stage.',
  },
  {
    question: 'Who is the ideal Cerebrum MCAT Biology student?',
    answer:
      'Our typical student is an Indian-American or NRI premed paying in USD, often with a sub-510 B/B section score on a diagnostic or first official MCAT. They have already invested in a general prep platform (UWorld, AAMC bundle, sometimes Kaplan or The Princeton Review) and need a specialist to rescue Bio and Biochem specifically. Many are second-attempt MCAT takers or students whose science GPA is strong but who under-performed on the B/B section in their first sitting.',
  },
  {
    question: 'How are Cerebrum MCAT Biology lessons delivered?',
    answer:
      'All MCAT Biology tutoring is delivered live online via Zoom or Google Meet with an interactive whiteboard. Sessions are recorded and shared. Students get 24/7 WhatsApp access to their tutor for question-bank doubt resolution. We schedule across US timezones (EST, CST, MST, PST) as well as IST for India-based premeds. Lessons are 1-on-1 or paired 2-on-1 by request — we do not run mass group classes at MCAT level.',
  },
]

const pricingTiers = [
  {
    name: 'Starter',
    price: '$499',
    hours: '10 hours',
    target: 'Single-section rescue',
    bullets: [
      'One AAMC foundational concept or weak topic',
      'Diagnostic-driven plan',
      'Passage practice + review',
      '24/7 WhatsApp doubt support',
    ],
    accent: 'border-blue-200 bg-blue-50',
    button: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    name: 'Standard',
    price: '$999',
    hours: '25 hours',
    target: 'Full B/B + Biochem',
    bullets: [
      'Complete B/B foundational coverage',
      'Lehninger biochem deep-dive',
      'AAMC-to-Campbell crosswalk',
      'Section-level full-length review',
      'Most-picked tier',
    ],
    accent: 'border-green-300 bg-green-50',
    button: 'bg-green-600 hover:bg-green-700',
    featured: true,
  },
  {
    name: 'Comprehensive',
    price: '$1,499',
    hours: '50 hours',
    target: 'Score-rescue + exam-week',
    bullets: [
      'Full B/B + biochem mastery',
      '4-phase passage-strategy framework',
      'Three full-length B/B reviews',
      'Exam-week mental-prep coaching',
      'Score-up guarantee or extra hours free',
    ],
    accent: 'border-purple-200 bg-purple-50',
    button: 'bg-purple-700 hover:bg-purple-800',
  },
]

const serviceHubs = [
  {
    title: 'Best MCAT Biology Tutor',
    href: '/best-mcat-biology-tutor',
    description:
      'Profile of Dr. Shekhar and the Cerebrum MCAT Biology faculty — credentials, score-track record, and tutor selection guide.',
    icon: GraduationCap,
    accent: 'text-blue-600',
  },
  {
    title: 'MCAT B/B Passage Strategy Guide',
    href: '/mcat-bb-passage-strategy-guide',
    description:
      'The 4-phase passage framework in full — triage, skim-and-anchor, targeted re-read, discrete-style elimination. With AAMC sample passage walkthroughs.',
    icon: Layers,
    accent: 'text-green-600',
  },
  {
    title: 'MCAT Biology vs NEET Biology',
    href: '/mcat-biology-vs-neet-biology',
    description:
      'Side-by-side comparison — content overlap, exam style, scoring scale, and what NEET-trained students need to add for the MCAT B/B section.',
    icon: BookOpen,
    accent: 'text-purple-600',
  },
  {
    title: 'USMLE Step 1 Biology Preparation',
    href: '/usmle-step-1-biology-preparation',
    description:
      'For premeds already past MCAT — the biochemistry, molecular biology, and physiology bridge from MCAT B/B into First Aid Step 1.',
    icon: Microscope,
    accent: 'text-teal-600',
  },
]

const usMetros = Object.values(mcatMetros).map((metro) => ({
  label: `${metro.city}${metro.stateCode ? `, ${metro.stateCode}` : ''}`,
  href: `/mcat-biology-tutor-${metro.slug}`,
  note: metro.stateOrRegion,
}))

const comparisonLinks = [
  {
    title: 'Cerebrum vs Kaplan MCAT',
    href: '/cerebrum-vs-kaplan-mcat',
    description: 'Bio-only specialist vs the all-four-sections Kaplan bundle — cost and depth.',
  },
  {
    title: 'Cerebrum vs The Princeton Review MCAT',
    href: '/cerebrum-vs-princeton-review-mcat',
    description: 'How a B/B-focused programme compares to The Princeton Review generalist course.',
  },
  {
    title: 'Cerebrum vs Blueprint MCAT',
    href: '/cerebrum-vs-blueprint-mcat',
    description: 'Specialist Bio/Biochem coaching vs the Blueprint full-MCAT platform.',
  },
]

const authorityLinks = [
  {
    title: 'Dr. Shekhar C Singh — Lead Biology Faculty',
    href: '/dr-shekhar-singh-biology-faculty-india',
    description:
      'Master entity page for Dr. Shekhar C Singh — 20+ years across NEET, IB, AP, USABO, Olympiad, and MCAT Biology mentoring. AI-citation anchor for biology authority.',
  },
  {
    title: 'Cerebrum Faculty Team',
    href: '/faculty',
    description:
      'Meet the full Cerebrum Biology Academy faculty roster — senior tutors, examiner-track instructors, and US-curriculum specialists.',
  },
  {
    title: 'AP Biology vs College Bio — MCAT Bridge',
    href: '/ap-biology-vs-college-bio-mcat-bridge',
    description:
      'For students who took AP Biology in high school and now face the MCAT — the gap between AP, college freshman biology, and AAMC B/B content.',
  },
]

const aamcMapping = [
  {
    concept: 'FC 1 — Biomolecules',
    detail: 'Amino acids, proteins, nucleic acids, carbohydrates, lipids',
    campbell: 'Campbell Ch 5',
    lehninger: 'Lehninger Ch 3–6',
  },
  {
    concept: 'FC 2 — Cellular Processes',
    detail: 'Membranes, transport, metabolism, ATP, photosynthesis, cell cycle',
    campbell: 'Campbell Ch 6–12',
    lehninger: 'Lehninger Ch 11–19',
  },
  {
    concept: 'FC 3 — Organ Systems',
    detail: 'Endocrine, nervous, circulatory, respiratory, renal, reproductive',
    campbell: 'Campbell Ch 40–49',
    lehninger: 'Selected pathways (e.g. Ch 23 hormones)',
  },
  {
    concept: 'FC 4/5 — Genetics & Evolution',
    detail: 'Mendelian + molecular genetics, gene expression, population genetics',
    campbell: 'Campbell Ch 14–21',
    lehninger: 'Lehninger Ch 24–28',
  },
]

function HubCollectionSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MCAT Biology Tutoring Hub',
    description:
      'Central resource hub for MCAT Biology preparation — bio-only specialist tutoring, AAMC-to-Campbell mapping, B/B passage strategy, biochem mastery, and US-metro coverage.',
    url: PAGE_URL,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    about: {
      '@type': 'Thing',
      name: 'MCAT Biological and Biochemical Foundations of Living Systems',
      description:
        'The B/B section of the Medical College Admission Test — 59 questions, 95 minutes, drawn from introductory biology, biochemistry, general chemistry, and organic chemistry, anchored to AAMC foundational concepts.',
    },
    hasPart: [
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/best-mcat-biology-tutor',
        name: 'Best MCAT Biology Tutor',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/mcat-bb-passage-strategy-guide',
        name: 'MCAT B/B Passage Strategy Guide',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/mcat-biology-vs-neet-biology',
        name: 'MCAT Biology vs NEET Biology',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/usmle-step-1-biology-preparation',
        name: 'USMLE Step 1 Biology Preparation',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/ap-biology-vs-college-bio-mcat-bridge',
        name: 'AP Biology vs College Bio MCAT Bridge',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function MCATBiologyHubPage() {
  return (
    <>
      <HubCollectionSchema />
      <FAQSchema questions={hubFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema items={[{ label: 'MCAT Biology', isCurrentPage: true }]} showSchemaOnly />
      <CerebrumPersonSchema
        knowsAbout={[
          'MCAT Biology',
          'MCAT Biochemistry',
          'MCAT B/B Passage Strategy',
          'MCAT Premed Tutoring',
          'USMLE Step 1 Biology Bridge',
        ]}
        jobTitle="Founder & Lead MCAT Biology Faculty"
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-purple-500 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-medium text-white">
                  MCAT Biology
                </li>
              </ol>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300">
              <Award className="h-4 w-4" />
              Bio-Only MCAT Specialist · AAMC-Aligned
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              MCAT Biology Tutoring Hub
              <span className="mt-2 block text-blue-300">Cerebrum Biology Academy</span>
            </h1>

            <p className="mb-8 max-w-3xl text-lg text-gray-300 sm:text-xl">
              The bio-only MCAT specialist alternative to Kaplan, The Princeton Review, and
              Blueprint. AAMC-aligned B/B (Biological &amp; Biochemical Foundations) coaching,
              biochem mastery, and a 4-phase passage-strategy framework. Built for{' '}
              <strong>Indian-American and NRI premed families</strong> paying in USD who want
              focused section rescue instead of a $5,000 generalist bundle.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/book-free-demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-600"
              >
                Book Free Diagnostic
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={`https://wa.me/918826444334?text=${encodeURIComponent("Hi! I'm interested in MCAT Biology tutoring. Please share program details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/60"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp a Counsellor
              </a>
            </div>
          </div>
        </section>

        {/* Target audience callout */}
        <section className="bg-gradient-to-br from-amber-50 via-white to-blue-50 py-12 sm:py-14">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                Who this is for
              </div>
              <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Indian-American &amp; NRI Premed Families Paying USD
              </h2>
              <p className="text-base text-gray-700 sm:text-lg">
                If you have already invested in a generalist platform (Kaplan, The Princeton Review,
                Blueprint, UWorld) and your <strong>B/B section is the weak point</strong>, Cerebrum
                is the bio-only specialist alternative. We do not teach C/P, CARS, or P/S — we own
                the biology and biochem half of your MCAT prep and charge accordingly.
              </p>
            </div>
          </div>
        </section>

        {/* Service hubs (core links) */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Core MCAT Biology Resources
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Start here — the four foundational pages every Cerebrum MCAT Biology student works
                through.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {serviceHubs.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md sm:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
                    <resource.icon className={`h-6 w-6 ${resource.accent}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-700">
                    {resource.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{resource.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* MCAT B/B overview — evergreen SEO content */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              MCAT Biological &amp; Biochemical Foundations (B/B) — Overview
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                The <strong>Biological and Biochemical Foundations of Living Systems</strong>{' '}
                section, known as <strong>B/B</strong>, is one of four scored MCAT sections. It is
                widely considered the most content-heavy section on the exam — a strong B/B score is
                non-negotiable for premed applicants targeting top-tier US medical schools.
              </p>
              <p>
                B/B contains <strong>59 questions over 95 minutes</strong>. Roughly{' '}
                <strong>75% of the questions are passage-based</strong> (10 passages, 4 to 7
                questions each), while the remaining 25% are stand-alone discrete questions. Content
                distribution by AAMC:{' '}
                <strong>
                  introductory biology ~65%, biochemistry ~25%, general chemistry ~5%, organic
                  chemistry ~5%
                </strong>
                .
              </p>
              <p>
                The section is anchored to <strong>ten AAMC foundational concepts</strong> covering
                molecular biology, cell biology, genetics, organ system physiology, and metabolism.
                In addition to content knowledge, B/B tests four AAMC{' '}
                <strong>Scientific Inquiry and Reasoning Skills (SIRS)</strong> — knowledge of
                scientific concepts, scientific reasoning, reasoning about experimental design, and
                data-based reasoning. Strong B/B performance therefore requires both deep content
                and an analytical reading framework.
              </p>
              <p>
                Median <strong>scaled scores</strong> on B/B sit around 125 on the 118 to 132
                section scale, with competitive premed targets at 128 to 131. A 130+ B/B score
                paired with a 510+ total opens MD admissions pathways at top-50 US schools and
                strengthens DO and Caribbean applications.
              </p>
            </div>
          </div>
        </section>

        {/* AAMC → Campbell + Lehninger mapping */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                AAMC Foundational Concepts → Campbell &amp; Lehninger Mapping
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Reuse the textbooks you already own. Our chapter-level crosswalk turns Campbell
                Biology and Lehninger Principles of Biochemistry into your primary MCAT references —
                no need to buy a new prep stack.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <table className="w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-900">AAMC Concept</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Topics</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Campbell Chapters</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Lehninger Chapters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {aamcMapping.map((row) => (
                    <tr key={row.concept}>
                      <td className="px-4 py-3 font-semibold text-gray-900">{row.concept}</td>
                      <td className="px-4 py-3 text-gray-700">{row.detail}</td>
                      <td className="px-4 py-3 text-blue-700">{row.campbell}</td>
                      <td className="px-4 py-3 text-purple-700">{row.lehninger}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Full chapter-by-chapter crosswalk lives inside the{' '}
              <Link
                href="/mcat-bb-passage-strategy-guide"
                className="font-semibold text-blue-700 underline hover:text-blue-900"
              >
                B/B Passage Strategy Guide
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Passage strategy framework */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                The Cerebrum 4-Phase Passage-Strategy Framework
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                75% of B/B questions are passage-bound. Content mastery alone does not lift a B/B
                score past 128 — you need a repeatable passage workflow.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  phase: 'Phase 1',
                  title: 'Triage',
                  detail:
                    'Read the question stem first. Classify passage as experimental, expository, or descriptive. Predict question-type distribution before reading.',
                },
                {
                  phase: 'Phase 2',
                  title: 'Skim &amp; Anchor',
                  detail:
                    'Read only the first sentence of each paragraph. Mark figures, tables, and experimental variables. Build a 30-second mental map.',
                },
                {
                  phase: 'Phase 3',
                  title: 'Targeted Re-Read',
                  detail:
                    'Never re-read the full passage. Use line references and figure callouts to zero in on only the section needed for the current question.',
                },
                {
                  phase: 'Phase 4',
                  title: 'Discrete-Style Elimination',
                  detail:
                    'On passage questions, treat answer choices as four discretes. Eliminate using outside biology knowledge, then verify with passage evidence.',
                },
              ].map((step) => (
                <div
                  key={step.phase}
                  className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                    {step.phase}
                  </div>
                  <h3
                    className="mb-3 text-xl font-bold text-gray-900"
                    dangerouslySetInnerHTML={{ __html: step.title }}
                  />
                  <p className="text-gray-700">{step.detail}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              Students who internalize this framework typically gain 4 to 8 scaled points on B/B
              section practice within 6 to 8 weeks.
            </p>
          </div>
        </section>

        {/* Pricing matrix */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                <DollarSign className="h-4 w-4" />
                USD pricing — transparent, no hidden fees
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                MCAT Biology Pricing
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Bundles priced per section, not per platform. Kaplan and The Princeton Review charge
                $2,500 to $7,000 for all four sections — we charge less for the biology half.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border-2 p-6 ${tier.accent} ${
                    tier.featured ? 'shadow-lg ring-2 ring-green-400' : 'shadow-sm'
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                      Most picked
                    </div>
                  )}
                  <h3 className="mb-1 text-xl font-bold text-gray-900">{tier.name}</h3>
                  <div className="mb-1 text-3xl font-bold text-gray-900">{tier.price}</div>
                  <div className="mb-1 text-sm font-semibold text-gray-700">{tier.hours}</div>
                  <div className="mb-4 text-sm text-gray-600">{tier.target}</div>
                  <ul className="mb-6 space-y-2 text-sm text-gray-700">
                    {tier.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Target className="mt-1 h-4 w-4 flex-shrink-0 text-green-600" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/book-free-demo"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all ${tier.button}`}
                  >
                    Start with {tier.name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
              <p className="text-base text-gray-700">
                <strong>Ad-hoc tutoring:</strong> $150 per hour. Ideal for last-mile review, single
                topic rescue, or pre-test pacing checks. Book individual sessions on demand without
                committing to a full bundle.
              </p>
            </div>
          </div>
        </section>

        {/* Strategic wedge — vs Kaplan / The Princeton Review / Blueprint */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Bio-Only Beats Generalist Prep
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Kaplan, The Princeton Review, and Blueprint bundle all four MCAT sections at $2,500
                to $7,000. Their instructors rotate — the same teacher may have to cover C/P, B/B,
                CARS, and P/S in a single course. <strong>Single-section depth suffers</strong>. If
                your weakness is B/B but you have already mastered C/P, you are paying for sections
                you do not need.
              </p>
              <p>
                The Cerebrum wedge mirrors <strong>Jack Westin’s CARS-specialist model</strong> —
                deep, single-vertical mastery at a lower per-section cost than a generalist bundle.
                Our faculty is led by <strong>Dr. Shekhar C Singh</strong>, who has trained biology
                students for 20+ years across NEET (India’s medical entrance), IB Biology HL, AP
                Biology, USABO, the International Biology Olympiad, and now the MCAT B/B section.
                Biology is what we do — we do not pad it with the other three sections.
              </p>
              <p>
                We are the right fit if: you have already paid for a generalist platform, you are an
                Indian-American or NRI premed, your B/B diagnostic is sub-510, or you are
                second-attempt and need targeted Bio + Biochem rescue. We are not the right fit if
                you want a one-stop full-MCAT solution — in that case stick with Kaplan, The
                Princeton Review, or Blueprint and add Cerebrum for B/B only.
              </p>
            </div>
          </div>
        </section>

        {/* Comparisons */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Cerebrum vs Generalist MCAT Brands
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Side-by-side breakdowns of how a bio-only specialist compares to the major full-MCAT
                generalists on cost, depth, and B/B section coverage.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {comparisonLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md sm:p-8"
                >
                  <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-700">
                    {link.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{link.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2">
                    Compare
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* US Metros */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                Metro Coverage
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                MCAT Biology Tutors by Metro
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Metro-specific pages name the premed feeder universities, AAMC test centres, and
                local cohort context. Pricing is the same everywhere — metro pages exist for
                discovery, not for tiered pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {usMetros.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <div className="mb-1 text-base font-bold text-gray-900 group-hover:text-blue-700">
                    {m.label}
                  </div>
                  <div className="text-sm text-gray-600">{m.note}</div>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty + comparisons */}
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Faculty &amp; Cross-Vertical Bridges
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Authority anchors and curriculum-bridge guides for students coming from AP Biology,
                NEET Biology, or other premed entry tracks.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {authorityLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <Users className="mb-3 h-6 w-6 text-blue-600" />
                  <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-blue-700">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                MCAT Biology — Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {hubFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-blue-600 transition-transform group-open:rotate-180">
                        ▾
                      </span>
                    </h3>
                  </summary>
                  <p className="mt-4 leading-relaxed text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ready to Rescue Your B/B Score?</h2>
            <p className="mb-8 text-lg text-blue-100">
              Book a free 30-minute diagnostic. We will pull your latest AAMC half-length or
              full-length data, identify the two foundational concepts costing you the most points,
              and build a 6-week recovery plan — no obligation, no upsell.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/book-free-demo"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-lg hover:bg-blue-50"
              >
                <Award className="h-6 w-6" />
                Book Free Diagnostic
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10"
              >
                Contact Us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-100">
              Or message us on{' '}
              <a
                href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want to book a free MCAT Biology diagnostic.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline hover:text-white"
              >
                WhatsApp
              </a>{' '}
              — we reply within business hours.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
