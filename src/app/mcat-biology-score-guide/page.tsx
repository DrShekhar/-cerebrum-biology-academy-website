/**
 * /mcat-biology-score-guide
 *
 * Informational / decision page targeting "what is a good MCAT
 * Bio/Biochem score", "good MCAT biology score", "is 128 good MCAT".
 * Explains the 118-132 B/B scale, qualitative good/competitive/elite
 * tiers anchored to the 125 midpoint (~50th percentile), how B/B fits
 * the 472-528 total, the bio-vs-biochem content split, and how to
 * raise a B/B score — with a soft pitch to Cerebrum's B/B coaching.
 *
 * Score anchors kept qualitative beyond the well-known 125 ≈ 50th
 * percentile midpoint. No invented percentile-to-score tables.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  ChevronRight,
  GraduationCap,
  Home,
  MessageCircle,
  Microscope,
  Target,
  TrendingUp,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const CANONICAL = '/mcat-biology-score-guide'
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'What Is a Good MCAT Bio/Biochem Score? | 118-132 Guide | Cerebrum',
  description:
    'A clear guide to the MCAT Bio/Biochem (B/B) score scale: the 118-132 range, the 125 midpoint, what counts as good, competitive, and elite, how B/B fits the 472-528 total, and how to raise your B/B score.',
  keywords: [
    'good MCAT biology score',
    'what is a good MCAT bio biochem score',
    'MCAT B/B score scale',
    'is 128 a good MCAT score',
    'MCAT 118 to 132 scale',
    'MCAT biology section score',
    'how to raise MCAT B/B score',
    'MCAT 125 midpoint',
    'MCAT bio biochem percentile',
    'MCAT total 472 528',
    'competitive MCAT B/B score',
    'how many biochem questions on MCAT',
    'MCAT biology vs biochemistry',
    'go from 125 to 130 MCAT',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'What Is a Good MCAT Bio/Biochem Score? | 118-132 Guide',
    description:
      'The B/B score scale explained — good vs competitive vs elite, how B/B fits the 472-528 total, the bio-vs-biochem split, and how to raise your section score.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is a Good MCAT Bio/Biochem Score?',
    description:
      'The 118-132 B/B scale, good/competitive/elite tiers, and how to raise your score.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

interface Tier {
  band: string
  label: string
  meaning: string
}

const tiers: Tier[] = [
  {
    band: '118-122',
    label: 'Below average',
    meaning:
      'Below the 125 midpoint. Signals significant content or test-strategy gaps. The priority here is foundational review plus timed passage practice, not score-chasing — accuracy first, speed second.',
  },
  {
    band: '123-125',
    label: 'Around average',
    meaning:
      'Centred on the 125 section midpoint (roughly the 50th percentile). A 125 is a genuinely average section score; it keeps many MD and DO programmes mathematically in reach when paired with a strong total, but it is rarely a strength on an application.',
  },
  {
    band: '126-127',
    label: 'Good / above average',
    meaning:
      'Comfortably above the median. A 127 B/B is a solid, above-average section that supports a competitive total in the low-to-mid 510s when the other three sections track similarly.',
  },
  {
    band: '128-129',
    label: 'Strong / competitive',
    meaning:
      'A 128+ B/B is widely treated as a strong section and is competitive for most US MD programmes when balanced across the exam. This is the band most pre-meds aiming for a 511-515 total target on B/B specifically.',
  },
  {
    band: '130-132',
    label: 'Elite',
    meaning:
      'A 130-132 B/B is an elite, top-of-scale section — the kind of result that turns Biology/Biochemistry into a clear application strength and supports a 518+ total at the most selective programmes.',
  },
]

const faqs = [
  {
    question: 'What is a good MCAT Bio/Biochem (B/B) score?',
    answer:
      'The B/B section is scored from 118 to 132, with 125 as the scaled midpoint (roughly the 50th percentile for the section). "Good" depends on your goal, but as a working rule: 125 is average, 127 is above average and solid, 128-129 is strong and competitive for most US MD programmes, and 130-132 is elite. There is no single official "good" cutoff — admissions committees read your B/B in the context of your total (472-528) and the rest of your application. For most applicants targeting a competitive total around 511-515, a B/B of 128+ is the working target.',
  },
  {
    question: 'Is a 128 on MCAT Bio/Biochem good?',
    answer:
      'Yes. A 128 sits three points above the 125 midpoint and is generally regarded as a strong, competitive section score — it is above the median and supports a competitive overall MCAT total when the other three sections are similar. It is not the top of the scale (132 is), so for the most selective programmes a 129-131 B/B is a bigger asset, but a 128 is a result most pre-meds would be pleased with and is rarely a weakness on an application.',
  },
  {
    question: 'How do I go from a 125 to a 130 on B/B?',
    answer:
      'Moving from the 125 midpoint to a 130 (near the top of the scale) is mostly about converting passive content knowledge into active passage reasoning. Three levers do most of the work: (1) drill AAMC official material — Section Banks, Question Packs, and full-length exams are written by the test-maker and match the real reasoning style; (2) run disciplined error analysis on every missed question, logging whether the gap was content, reasoning, careless, or timing; and (3) close the biochemistry gap specifically, because amino acids, enzyme kinetics, and metabolism are dense and frequently tested. A targeted 8-12 week cycle of content review immediately followed by topic-matched AAMC passages, with weekly timed B/B sections, is the standard route. The 125-to-130 jump is realistic but not fast — it usually takes weeks of focused passage volume, not a few cramming sessions.',
  },
  {
    question: 'How many questions on the B/B section are biology vs biochemistry?',
    answer:
      'The Biological and Biochemical Foundations of Living Systems section has 59 questions in 95 minutes. AAMC does not publish a fixed biology-vs-biochemistry split, but per the AAMC content outline the section draws roughly one quarter of its content from biochemistry foundational concepts and the majority from biology, with general and organic chemistry appearing in support of the biochemistry. In practice, expect a meaningful chunk of the section — commonly estimated at around a quarter — to be biochemistry-driven (amino acids and proteins, enzyme kinetics, metabolism, bioenergetics), which is why neglecting biochemistry is one of the most common ways students cap their B/B score.',
  },
  {
    question: 'How does the B/B score fit into the total MCAT score?',
    answer:
      'The MCAT total runs 472-528 and is the simple sum of four section scores, each scored 118-132: Chemical and Physical Foundations (C/P), Critical Analysis and Reasoning Skills (CARS), Biological and Biochemical Foundations (B/B), and Psychological, Social, and Biological Foundations (P/S). Four sections at the 125 midpoint sum to 500, which is approximately the 50th-percentile total. Because the total is a straight sum, a strong B/B can offset a weaker section — but balanced section scores are generally read more favourably than a lopsided profile.',
  },
  {
    question: 'Does Cerebrum coach the Bio/Biochem section specifically?',
    answer:
      "Yes. Cerebrum Biology Academy runs MCAT programmes that are specialist in the Biological and Biochemical Foundations section — biology and biochemistry are the academy's core subject. Coaching is 100% online in your US time zone, led by AIIMS-trained faculty (AIIMS Delhi is India's apex medical institute). Tiers run from Self-Paced ($499) through Small-Batch ($999) to 1:1 with Senior Faculty ($1,499), plus $150/hour for ad-hoc gap-fill sessions. The focus is converting your content knowledge into B/B passage reasoning that moves your section score.",
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Is a Good MCAT Bio/Biochem Score? A Guide to the 118-132 Scale',
  description:
    'A guide to the MCAT Bio/Biochem (B/B) score scale: the 118-132 range, the 125 midpoint, good vs competitive vs elite tiers, how B/B fits the 472-528 total, and how to raise your B/B score.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  datePublished: '2026-06-25',
  dateModified: '2026-06-25',
  author: {
    '@type': 'Person',
    name: 'Dr. Shekhar C Singh',
    url: `${SITE_URL}/faculty`,
    jobTitle: 'Founder, AIIMS Delhi Graduate',
  },
  reviewedBy: { '@type': 'Person', name: 'Dr. Shekhar C Singh' },
  publisher: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.jpg` },
    areaServed: 'United States',
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Bio/Biochem (B/B) Section Coaching',
  description:
    'Specialist coaching for the MCAT Biological and Biochemical Foundations of Living Systems section, focused on raising your scaled B/B score within the 118-132 range through AAMC-aligned passage drilling.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: SITE_URL,
    areaServed: 'United States',
  },
  offers: {
    '@type': 'Offer',
    category: 'Online MCAT Bio/Biochem Coaching',
    priceCurrency: 'USD',
    price: '499',
    availability: 'https://schema.org/InStock',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'MCAT Biology',
      item: `${SITE_URL}/mcat-biology`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Bio/Biochem Score Guide',
      item: PAGE_URL,
    },
  ],
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: PAGE_URL,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'details p'],
  },
}

const WHATSAPP_HREF =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi Dr. Shekhar — I'd like help raising my MCAT Bio/Biochem (B/B) section score. Can you share next steps?"
  )

export default function MCATBiologyScoreGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <CerebrumPersonSchema
        knowsAbout={[
          'MCAT Biology',
          'MCAT Biochemistry',
          'MCAT Bio/Biochem (B/B) Section',
          'MCAT Scoring (118-132 Scale)',
          'MCAT Total Score (472-528)',
          'Enzyme Kinetics',
          'Metabolism and Bioenergetics',
          'Amino Acids and Protein Structure',
        ]}
        jobTitle="Founder & Lead MCAT Bio/Biochem Faculty"
      />

      <main className="min-h-screen bg-white">
        <nav className="bg-gray-100 py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-700">
                  <Home className="w-4 h-4" />
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <Link href="/mcat-biology" className="text-gray-600 hover:text-blue-700">
                  MCAT Biology
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-blue-700 font-medium">Bio/Biochem Score Guide</span>
              </li>
            </ol>
          </div>
        </nav>

        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" /> 118-132 scale · 125 midpoint · scoring explained
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              What Is a Good MCAT Bio/Biochem Score?
              <span className="block text-yellow-400 mt-2">The 118-132 Scale, Explained</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">
              The MCAT Biological and Biochemical Foundations of Living Systems section — the
              &ldquo;B/B&rdquo; section — is scored from 118 to 132, with 125 as the midpoint. This
              guide explains what counts as a good, competitive, and elite B/B score, how B/B fits
              into the 472-528 total, how much of the section is biology versus biochemistry, and
              the practical levers that actually raise a B/B score.
            </p>
            <p className="text-base text-slate-400 mb-8 max-w-3xl">
              Coaching is live online in your US time zone (ET/CT/MT/PT); pricing in USD.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Target className="w-4 h-4 text-yellow-400" />
                125 = section midpoint
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <TrendingUp className="w-4 h-4 text-yellow-400" />
                128+ = competitive
              </span>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              How the B/B section is scored
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The MCAT has four sections, each scored on the same scaled range of 118 to 132. The
              Biological and Biochemical Foundations of Living Systems section — universally
              shortened to &ldquo;B/B&rdquo; — contains 59 questions answered in 95 minutes. Your
              raw number-correct is converted to a scaled 118-132 score that adjusts for the
              difficulty of your specific exam form, so two students with the same scaled score are
              treated as equivalent regardless of which form they sat.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The scaled midpoint of the section is <strong>125</strong>, which corresponds to
              roughly the 50th percentile for that section. That single anchor is the most useful
              reference point you have: a 125 is genuinely average, and everything above it is
              above-average. Anything you read about a &ldquo;good&rdquo; score is ultimately a
              statement about how far above 125 you are.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The four section scores sum to your MCAT total, which runs from 472 to 528. Four
              sections at the 125 midpoint sum to 500 — approximately the 50th-percentile total.
              Because the total is a straight sum, a strong B/B can lift a total that is being held
              back elsewhere, though admissions committees generally read balanced section scores
              more favourably than a lopsided profile.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              What counts as good, competitive, and elite
            </h2>
            <p className="text-slate-600 mb-8">
              There is no single official cutoff for a &ldquo;good&rdquo; B/B score — committees
              always read it in context. The tiers below are working bands anchored to the 125
              midpoint. They are qualitative on purpose: AAMC publishes percentile data, but precise
              percentile cutoffs shift slightly each year, so we anchor to the one stable reference
              point (125 ≈ 50th percentile) rather than invent a year-specific table.
            </p>
            <div className="space-y-3">
              {tiers.map((t) => (
                <div
                  key={t.band}
                  className="bg-white rounded-xl p-5 border border-slate-200 flex gap-4"
                >
                  <div className="flex-shrink-0 w-20 h-12 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-base">
                    {t.band}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-base md:text-lg mb-1">
                      {t.label}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{t.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Read these as goal-relative, not absolute.</strong> A 127 B/B can be
                perfectly competitive for one applicant&apos;s school list and a relative weakness
                for another&apos;s. Always evaluate your B/B against your target programmes&apos;
                published score profiles and your overall total — verify current percentile data at
                students-residents.aamc.org.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              How much of B/B is biology versus biochemistry?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The section name puts &ldquo;Biochemical&rdquo; right next to &ldquo;Biological&rdquo;
              for a reason. AAMC does not publish a fixed question-by-question split, but per the
              AAMC content outline the section draws a substantial share of its content from
              biochemistry foundational concepts — commonly estimated at around a quarter of the
              section — with the majority drawn from biology, and general and organic chemistry
              appearing in support of the biochemistry.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              In practice that means the biochemistry content carries real weight: amino acids and
              protein structure, enzyme kinetics and regulation, metabolism, and bioenergetics
              appear repeatedly and often drive multi-question passages. Students who treat B/B as
              &ldquo;the biology section&rdquo; and under-prepare the biochemistry are one of the
              most common patterns we see capping out below 128.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The implication for your study plan: do not let biochemistry be an afterthought. If
              your practice scores plateau, the biochemistry sub-topics are usually where the hidden
              points are. For a deeper breakdown of the section&apos;s structure and the
              highest-frequency content, see our{' '}
              <Link href="/mcat-biology-bb-section-prep" className="text-blue-700 underline">
                B/B section prep guide
              </Link>{' '}
              and the{' '}
              <Link href="/mcat-biology-high-yield-topics-2026" className="text-blue-700 underline">
                high-yield topics list
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              How to raise your B/B score
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The B/B section rewards reasoning over recall, so the fastest way to move your score
              is to convert content knowledge into passage reasoning. The levers that actually move
              the number:
            </p>
            <ol className="space-y-3 text-sm text-slate-700 leading-relaxed list-decimal pl-5">
              <li>
                <strong>Make AAMC official material the spine of your prep.</strong> The AAMC
                Question Packs, Section Bank, and full-length exams are written by the test-maker.
                Their reasoning patterns, distractor logic, and figure styles match the real exam in
                a way third-party material does not. Third-party question banks add volume, but AAMC
                material is what calibrates you to the real bar.
              </li>
              <li>
                <strong>Run error analysis on every miss.</strong> For each wrong answer, log
                whether the gap was content, reasoning, careless, or timing — then fix the cause,
                not the symptom. After 4-5 study blocks the dominant failure mode usually becomes
                obvious, and that is where the points are.
              </li>
              <li>
                <strong>Close the biochemistry gap deliberately.</strong> Amino acids, enzyme
                kinetics, metabolism, and bioenergetics are dense and heavily tested. Most stalled
                B/B scores are biochemistry scores in disguise.
              </li>
              <li>
                <strong>Drill at the passage level, timed.</strong> Re-reading textbooks builds
                passive recognition; timed passage practice builds the active interpretation B/B
                actually tests. Run a full timed B/B section (59 questions, 95 minutes) weekly and
                track which topics fall below 70% accuracy.
              </li>
              <li>
                <strong>Get expert eyes on your reasoning.</strong> The 125-to-130 jump is rarely
                about learning new facts — it is about how you read a passage and eliminate
                distractors. A coach who reviews your reasoning, not just your answers, is the
                difference for many students who have plateaued.
              </li>
            </ol>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Pricing — how we coach the B/B section
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Cerebrum Biology Academy runs MCAT Bio/Biochem programmes 100% online, in your US time
              zone. All pricing in USD. Founder Dr. Shekhar C Singh (AIIMS Delhi — India&apos;s apex
              medical institute, peer to the most selective US programmes) leads the senior-faculty
              tier. Biology and biochemistry are the academy&apos;s core subject, so B/B is our
              specialist section.
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>Self-Paced ($499)</strong> — Async 4-6 month curriculum covering the full
                B/B content map, 300+ practice passages, recorded video library, WhatsApp doubt
                support. You self-direct the prioritisation.
              </li>
              <li>
                <strong>Small-Batch ($999)</strong> — 4-6 students per cohort. Everything in
                Self-Paced plus weekly live B/B sessions, monthly full-length B/B section mocks, and
                senior-faculty office hours.
              </li>
              <li>
                <strong>1:1 with Senior Faculty ($1,499)</strong> — A personalised study plan keyed
                to a diagnostic, custom passage drilling on your weakest B/B topics, weekly 90-min
                video sessions, and unlimited WhatsApp faculty access. Plus $150/hour for ad-hoc
                gap-fill sessions outside the package.
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Last reviewed:</strong> June 2026 by Dr. Shekhar C Singh, AIIMS Delhi
                graduate and founder of Cerebrum Biology Academy. MCAT scoring and percentile data
                are published by AAMC — verify current figures at students-residents.aamc.org.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  className="bg-white rounded-xl p-5 border border-slate-200 group"
                >
                  <summary className="font-semibold text-slate-900 cursor-pointer">
                    {f.question}
                  </summary>
                  <p className="mt-3 text-sm text-slate-700 leading-relaxed faq-answer">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Microscope className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want a coach who moves your B/B score, not just your study hours?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              We diagnose where your B/B score is leaking, build a personalised passage-drilling
              plan, and review your reasoning against the AAMC standard until your section climbs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_HREF}
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Dr. Shekhar
              </a>
              <Link
                href="/best-mcat-biology-tutor"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
              >
                <GraduationCap className="w-5 h-5" />
                Meet the best MCAT Biology tutor
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
              More MCAT Biology guides
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/mcat-biology"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">MCAT Biology programme</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Curriculum, faculty, pricing, enrolment.
                </p>
              </Link>
              <Link
                href="/best-mcat-biology-tutor"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">Best MCAT Biology tutor</h3>
                <p className="text-xs text-slate-600 mt-1">Why students pick our senior faculty.</p>
              </Link>
              <Link
                href="/mcat-biology-bb-section-prep"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">B/B section prep</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Structure, content map, and drilling plan.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
