/**
 * /best-mcat-biology-books
 *
 * Informational / decision page targeting "best MCAT biology books",
 * "best MCAT biochem book", "is AAMC enough MCAT", "best MCAT QBank".
 * Recommends REAL resources: AAMC official materials (Question Packs,
 * Section Bank, full-lengths — the gold standard), Kaplan MCAT
 * Biology Review, The Princeton Review Biology, UWorld QBank, and a
 * biochemistry text (Lehninger / first-semester biochem). Positions
 * Cerebrum's coaching as the explanation layer on top of question
 * banks. No fabricated stats.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Home,
  MessageCircle,
  Microscope,
  Target,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const CANONICAL = '/best-mcat-biology-books'
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Best MCAT Biology & Biochem Books 2026 | AAMC + Reviews | Cerebrum',
  description:
    'The best MCAT Bio/Biochem resources: AAMC official materials (Question Packs, Section Bank, full-lengths — the gold standard), plus Kaplan, The Princeton Review, UWorld, and a biochemistry text. What each is best for, and where coaching fits.',
  keywords: [
    'best MCAT biology books',
    'best MCAT biochem book',
    'best MCAT books 2026',
    'AAMC question packs',
    'AAMC section bank',
    'is AAMC enough for MCAT',
    'best MCAT QBank',
    'UWorld MCAT',
    'Kaplan MCAT Biology Review',
    'Princeton Review MCAT Biology',
    'do I need a biochem textbook MCAT',
    'Lehninger MCAT biochem',
    'best MCAT bio biochem resources',
    'MCAT biology study materials',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Best MCAT Biology & Biochem Books 2026 | AAMC + Reviews',
    description:
      'AAMC official material is the gold standard; here is how Kaplan, The Princeton Review, UWorld, and a biochem text fit around it — and where coaching adds the explanation layer.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best MCAT Biology & Biochem Books 2026',
    description:
      'AAMC gold standard, Kaplan, Princeton Review, UWorld, biochem text — what each is for.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

interface Resource {
  name: string
  category: string
  bestFor: string
  detail: string
}

const resources: Resource[] = [
  {
    name: 'AAMC Official Question Packs',
    category: 'Official practice — gold standard',
    bestFor: 'Topic-matched discrete and passage practice straight from the test-maker',
    detail:
      'Written by the same AAMC that writes the real MCAT, the Biology and Biochemistry Question Packs are the closest thing to authentic exam questions you can drill on. Use them topic by topic after you finish content review for each area. Their distractor logic and figure styles are what calibrate you to the real bar.',
  },
  {
    name: 'AAMC Section Bank',
    category: 'Official practice — gold standard',
    bestFor: 'The hardest, most passage-heavy, most exam-realistic practice',
    detail:
      'The Section Bank is widely regarded as the toughest and most representative AAMC practice material — heavily passage-based and reasoning-driven. It is best saved for the middle-to-later phase of prep once your content base is solid, because doing it cold wastes its value.',
  },
  {
    name: 'AAMC Full-Length Practice Exams',
    category: 'Official practice — gold standard',
    bestFor: 'Timed, full-section simulation and score calibration',
    detail:
      'The official full-length exams are the single best predictor of test-day performance because they are scaled by AAMC. Reserve them for the last several weeks of your timeline, take them under realistic timed conditions, and mine the answer explanations rather than just recording your score.',
  },
  {
    name: 'Kaplan MCAT Biology Review (and the Kaplan 7-book set)',
    category: 'Third-party content review',
    bestFor: 'A structured, exam-scoped first pass through the biology content',
    detail:
      "Kaplan's MCAT Biology Review is one of the most widely used content books. Its strength is that it is scoped to the MCAT — it tells you what to learn without the breadth of a full college textbook. Best used for an organised first-pass content review and end-of-chapter checks, not as a question bank.",
  },
  {
    name: 'The Princeton Review MCAT Biology / Biochemistry Review',
    category: 'Third-party content review',
    bestFor: 'A more detailed, deeper-explanation alternative to Kaplan',
    detail:
      'The Princeton Review books are known for going a bit deeper on explanation than Kaplan, which some students find clearer for harder biology and biochemistry topics. Many students use one primary content set and dip into the other for topics that did not click the first time. Pick one as your spine; do not read both cover to cover.',
  },
  {
    name: 'UWorld MCAT QBank',
    category: 'Third-party question bank',
    bestFor: 'High-quality practice volume with strong written explanations',
    detail:
      'UWorld is the most respected third-party question bank for the MCAT, valued for the depth and teaching quality of its answer explanations. Use it to build practice volume and to reinforce reasoning between your content review and your AAMC material — but treat AAMC, not UWorld, as the final word on exam-realistic difficulty.',
  },
  {
    name: 'A biochemistry text (Lehninger or your first-semester biochem book)',
    category: 'Reference for the biochemistry content',
    bestFor: 'Filling specific biochemistry gaps in depth',
    detail:
      "You do not need to read a full biochemistry textbook cover to cover for the MCAT. But a reference like Lehninger's Principles of Biochemistry — or simply the biochemistry textbook from your own first-semester course — is invaluable for understanding amino acids, enzyme kinetics, and metabolism more deeply when an MCAT-scoped review book leaves a topic feeling thin. Use it as a targeted reference, not a primary read.",
  },
]

const faqs = [
  {
    question: 'Which books are best for MCAT Bio/Biochem?',
    answer:
      'There is no single "best book" — the strongest setup is a layered one. (1) AAMC official material (Question Packs, Section Bank, full-length exams) is the gold standard for practice because it is written by the test-maker. (2) A third-party content review set — most commonly Kaplan MCAT Biology Review or The Princeton Review Biology/Biochemistry Review — gives you an MCAT-scoped first pass through the content. (3) UWorld\'s QBank adds high-quality practice volume with strong explanations. (4) A biochemistry reference such as Lehninger fills specific deep gaps. The mistake students make is buying many books and reading none of them deeply; pick one content set, one QBank, and make AAMC material the spine.',
  },
  {
    question: 'Is AAMC material enough on its own for B/B?',
    answer:
      'AAMC material is necessary but usually not sufficient by itself, for two reasons. First, there is a finite amount of it — once you exhaust the Question Packs, Section Bank, and full-lengths you have nothing left to drill, so you want third-party volume to protect that finite supply. Second, AAMC produces practice questions, not teaching content — it shows you the bar but does not teach you the underlying biology and biochemistry from scratch. For students who already have a strong content base, AAMC plus disciplined error analysis can carry most of the way. For everyone else, you need a content layer (a review book or coaching) underneath the AAMC practice.',
  },
  {
    question: 'What is the best MCAT QBank?',
    answer:
      'For exam-realistic difficulty, the AAMC Section Bank and Question Packs are the benchmark because they are written by the test-maker. Among third-party question banks, UWorld is the most widely respected, primarily for the teaching quality of its answer explanations. The practical approach is to use UWorld for volume and explanation-driven learning, while reserving AAMC material — especially the Section Bank and full-lengths — for calibration and the final weeks of prep so it stays fresh.',
  },
  {
    question: 'Do I need a biochemistry textbook for the MCAT?',
    answer:
      "Not as a cover-to-cover read. The biochemistry that appears on B/B is well covered by an MCAT-scoped review book for most students. But biochemistry carries real weight on the section — amino acids, enzyme kinetics, and metabolism are dense and frequently tested — so a reference like Lehninger's Principles of Biochemistry, or simply your own first-semester biochemistry textbook, is worth having on hand to go deeper on the specific topics where a review book leaves you shaky. Use it as a targeted reference, not a primary text.",
  },
  {
    question: 'Where does coaching fit if I already have the books?',
    answer:
      'Books and question banks give you content and practice questions, but they cannot tell you why your reasoning broke down on the questions you missed — that is the gap coaching fills. Cerebrum positions its B/B coaching as the explanation layer on top of your question banks: we review your missed AAMC and UWorld questions, diagnose whether the gap was content, reasoning, careless, or timing, and drill the specific topics holding your score down. Coaching is 100% online in your US time zone; tiers run $499 (Self-Paced), $999 (Small-Batch), and $1,499 (1:1 with Senior Faculty), plus $150/hour for ad-hoc sessions.',
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best MCAT Biology and Biochemistry Books and Resources (2026)',
  description:
    'The best MCAT Bio/Biochem resources: AAMC official materials as the gold standard, plus Kaplan, The Princeton Review, UWorld, and a biochemistry text, with what each is best for.',
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
  name: 'MCAT Bio/Biochem Coaching — The Explanation Layer',
  description:
    'Specialist MCAT Biological and Biochemical Foundations coaching that sits on top of your books and question banks, diagnosing the reasoning gaps behind missed questions.',
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
      name: 'Best MCAT Biology Books',
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
    'Hi Dr. Shekhar — I have my MCAT books and QBanks but want coaching as the explanation layer on top. Can you share next steps?'
  )

export default function BestMCATBiologyBooksPage() {
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
          'AAMC Official Practice Materials',
          'MCAT Study Resources',
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
                <span className="text-blue-700 font-medium">Best MCAT Biology Books</span>
              </li>
            </ol>
          </div>
        </nav>

        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" /> AAMC gold standard · review books · QBanks
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Best MCAT Biology &amp; Biochem Books
              <span className="block text-yellow-400 mt-2">And How to Layer Them</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">
              There is no single best MCAT Bio/Biochem book — the strongest prep is a layered stack.
              AAMC official material is the gold standard for practice; a content-review set (Kaplan
              or The Princeton Review) carries the first pass; UWorld adds volume; a biochemistry
              reference fills the deep gaps. This guide explains what each resource is genuinely
              best for, and where expert coaching fits on top.
            </p>
            <p className="text-base text-slate-400 mb-8 max-w-3xl">
              Coaching is live online in your US time zone (ET/CT/MT/PT); pricing in USD.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Target className="w-4 h-4 text-yellow-400" />
                AAMC = the spine
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <BookOpen className="w-4 h-4 text-yellow-400" />
                One content set, one QBank
              </span>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Start with the principle, not the bookshelf
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The most common mistake in MCAT Bio/Biochem prep is buying a stack of books and
              question banks, then reading none of them deeply. More resources do not raise a score
              — depth of use does. The right mental model is a stack with three jobs: content (learn
              the biology and biochemistry), practice (drill questions), and feedback (understand
              why you missed what you missed).
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Across that stack, one resource is not optional: AAMC official material. Because AAMC
              writes the real MCAT, its practice material defines the actual bar. Everything else —
              review books, third-party question banks, textbooks — exists to get you ready for, and
              to protect the finite supply of, AAMC material.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The resources below are real, widely used materials. We describe what each is honestly
              best for so you can build a lean stack — typically one content set, one third-party
              QBank, AAMC material as the spine, and a biochemistry reference on standby.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              The resources, and what each is best for
            </h2>
            <p className="text-slate-600 mb-8">
              Listed by role in your stack. The three AAMC items are the gold standard for practice;
              the rest are the supporting content and volume layers.
            </p>
            <div className="space-y-4">
              {resources.map((r) => (
                <div key={r.name} className="bg-white rounded-xl p-5 border border-slate-200">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 text-base md:text-lg">{r.name}</h3>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                      {r.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-900 font-medium mb-2">
                    <span className="text-slate-500 font-normal">Best for:</span> {r.bestFor}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">{r.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-6">
              Resource names are the publishers&apos; own product names (AAMC, Kaplan, The Princeton
              Review, UWorld, Lehninger&apos;s <em>Principles of Biochemistry</em>). Availability,
              editions, and pricing change — verify current versions with each publisher. Cerebrum
              is not affiliated with these publishers; they are listed on merit.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              A lean, layered stack that works
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you want a default that covers most students, this is it — four layers, used in
              order:
            </p>
            <ol className="space-y-3 text-sm text-slate-700 leading-relaxed list-decimal pl-5">
              <li>
                <strong>Content layer — one review set.</strong> Pick Kaplan MCAT Biology Review or
                The Princeton Review Biology/Biochemistry Review as your single content spine. Read
                it actively for a first pass; do not read both cover to cover.
              </li>
              <li>
                <strong>Biochemistry reference — on standby.</strong> Keep Lehninger or your
                first-semester biochemistry textbook nearby to go deeper on amino acids, enzyme
                kinetics, and metabolism wherever the review book feels thin. Biochemistry is dense
                and heavily tested, and it is where many B/B scores quietly cap out.
              </li>
              <li>
                <strong>Volume layer — UWorld.</strong> Drill UWorld for practice volume and to
                learn from its explanations, immediately after you cover each topic. This is your
                main day-to-day question source.
              </li>
              <li>
                <strong>Calibration layer — AAMC, protected.</strong> Use AAMC Question Packs topic
                by topic, then the Section Bank in the middle-to-later phase, and save the
                full-length exams for the final weeks under timed conditions. AAMC material is
                finite — do not burn it early.
              </li>
            </ol>
            <p className="text-slate-700 leading-relaxed mt-4">
              For how this content stack maps onto the section&apos;s structure and timing, see our{' '}
              <Link href="/mcat-biology-bb-section-prep" className="text-blue-700 underline">
                B/B section prep guide
              </Link>
              , and for what to score, our{' '}
              <Link href="/mcat-biology-score-guide" className="text-blue-700 underline">
                Bio/Biochem score guide
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Where coaching fits — the explanation layer
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Books teach content. Question banks give you questions. Neither can tell you{' '}
              <em>why</em> your reasoning broke on the questions you missed — and on B/B, where the
              section rewards reasoning over recall, that gap is where most stalled scores live.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              That is the layer Cerebrum is built to add. We sit on top of your existing books and
              QBanks: you bring your missed AAMC and UWorld questions, and we diagnose whether each
              miss was a content gap, a reasoning gap, a careless error, or a timing problem — then
              drill the specific topics holding your score down. The resources stay the same; what
              changes is how fast you convert them into a higher B/B score.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Coaching is 100% online in your US time zone, led by AIIMS-trained faculty (AIIMS
              Delhi is India&apos;s apex medical institute). It is the most efficient route for
              students who already own the books but have plateaued.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Pricing — coaching on top of your resources
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Cerebrum Biology Academy runs MCAT Bio/Biochem programmes 100% online, in your US time
              zone. All pricing in USD. Founder Dr. Shekhar C Singh (AIIMS Delhi — India&apos;s apex
              medical institute, peer to the most selective US programmes) leads the senior-faculty
              tier.
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>Self-Paced ($499)</strong> — Async 4-6 month curriculum and 300+ practice
                passages that complement your review books, recorded video library, WhatsApp doubt
                support.
              </li>
              <li>
                <strong>Small-Batch ($999)</strong> — 4-6 students per cohort. Weekly live B/B
                sessions, monthly full-length B/B section mocks, and senior-faculty office hours on
                top of the Self-Paced library.
              </li>
              <li>
                <strong>1:1 with Senior Faculty ($1,499)</strong> — Personalised review of your
                missed AAMC and UWorld questions, custom passage drilling on your weak topics,
                weekly 90-min video sessions, unlimited WhatsApp faculty access. Plus $150/hour for
                ad-hoc gap-fill sessions outside the package.
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Last reviewed:</strong> June 2026 by Dr. Shekhar C Singh, AIIMS Delhi
                graduate and founder of Cerebrum Biology Academy. Third-party resource editions and
                pricing change — verify current versions with each publisher and with AAMC at
                students-residents.aamc.org.
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
              Have the books but stuck on your B/B score?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Bring your missed AAMC and UWorld questions. We diagnose the reasoning gaps your books
              cannot, and drill the topics holding you down — until your section climbs.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
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
