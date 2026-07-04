import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Layers,
  Lightbulb,
  MessageCircle,
  Star,
  Target,
  Trophy,
} from 'lucide-react'
import { ContextualWhatsAppLink } from '@/components/common/ContextualWhatsAppLink'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const URL = 'https://cerebrumbiologyacademy.com/best-usabo-books'

export const metadata: Metadata = {
  title: 'Best USABO Books | The Reference Library for the USA Biology Olympiad',
  description:
    'The books that actually earn their place in a USABO library: Campbell Biology as the core, plus Molecular Biology of the Cell, Raven Biology of Plants, an animal-physiology reference, Lehninger, Purves Life, and past papers. What each book is best for and the order to buy them in.',
  keywords: [
    'best USABO books',
    'USABO books',
    'USABO recommended books',
    'USABO study books',
    'best books for USABO',
    'USABO reference texts',
    'Campbell Biology USABO',
    'Molecular Biology of the Cell USABO',
    'Raven Biology of Plants',
    'Lehninger USABO',
    'Schmidt-Nielsen animal physiology',
    'USABO reading list',
    'USA Biology Olympiad books',
  ],
  alternates: {
    canonical: URL,
    languages: { en: URL, 'en-US': URL },
  },
  openGraph: {
    title: 'Best USABO Books | The Reference Library for the USA Biology Olympiad',
    description:
      'Campbell Biology plus the reference texts that take you to USABO depth — what each is for and the order to buy them in.',
    url: URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best USABO Books | The Reference Library for the USA Biology Olympiad',
    description:
      'The honest USABO reading list: Campbell as the core, plus Alberts, Raven, Schmidt-Nielsen, Lehninger, Purves, and past papers — what each is best for.',
  },
}

interface BookEntry {
  name: string
  author: string
  tier: 'Core' | 'Reference' | 'Practice'
  bestFor: string
  whenToBuy: string
}

const books: BookEntry[] = [
  {
    name: 'Campbell Biology',
    author: 'Urry, Cain, Wasserman, Minorsky, Reece (current edition)',
    tier: 'Core',
    bestFor:
      'Your one indispensable text. Campbell covers the large majority of the USABO content map cover to cover, with the clearest figures in the field. Read it first, twice, before you touch anything else.',
    whenToBuy: 'Buy first — this is non-negotiable.',
  },
  {
    name: 'USABO Past Papers',
    author: 'CEE / USABO (Open Exam and Semifinal papers)',
    tier: 'Practice',
    bestFor:
      'The single highest-value practice resource. The format, pacing, and question style are remarkably consistent year on year. Use past papers to find your weak topics, then read the references to fix them.',
    whenToBuy: 'Start early, intensify in the final months.',
  },
  {
    name: 'Molecular Biology of the Cell',
    author: 'Alberts, Johnson, Lewis, Morgan, Raff, Roberts, Walter',
    tier: 'Reference',
    bestFor:
      'Cell and molecular depth beyond Campbell — chromatin, DNA repair, cell signaling, cytoskeleton, membrane trafficking. It is a reference, not a start-to-finish read; dip into specific chapters when a past paper exposes a gap.',
    whenToBuy: 'After Campbell, once you hit its ceiling in molecular topics.',
  },
  {
    name: 'Raven Biology of Plants',
    author: 'Evert & Eichhorn (Raven, Evert, Eichhorn)',
    tier: 'Reference',
    bestFor:
      'The standard reference for plant anatomy and physiology — the area where AP and even Campbell run thin but USABO and the IBO ask real depth. Excellent for plant structure, transport, and development.',
    whenToBuy: 'When plant biology becomes a weak spot in your drills.',
  },
  {
    name: 'Animal Physiology',
    author:
      'Knut Schmidt-Nielsen — Animal Physiology: Adaptation and Environment (or the Princeton Guide to physiology)',
    tier: 'Reference',
    bestFor:
      'Mechanistic depth for the largest USABO content block. Schmidt-Nielsen is the classic for comparative animal physiology — why mechanisms like countercurrent exchange and osmoregulation work, not just that they do.',
    whenToBuy: 'When animal-physiology questions need more than Campbell gives.',
  },
  {
    name: 'Lehninger Principles of Biochemistry',
    author: 'Nelson & Cox',
    tier: 'Reference',
    bestFor:
      'Metabolism, enzyme kinetics, and regulation at a depth USABO occasionally probes. Read the metabolism chapters and the enzyme-kinetics material; you do not need to read it cover to cover.',
    whenToBuy: 'For biochemistry depth, after Campbell and as needed.',
  },
  {
    name: 'Life: The Science of Biology (Purves)',
    author: 'Sadava, Hillis, Heller, Hacker',
    tier: 'Reference',
    bestFor:
      'An excellent alternative or complementary general text to Campbell. Some students prefer its explanations on particular topics, and a second authoritative voice can clarify a concept Campbell explains tersely.',
    whenToBuy: 'Optional — useful as a second opinion alongside Campbell.',
  },
]

const buyOrder = [
  'Campbell Biology — read it through (twice) before anything else.',
  'USABO past papers — start sitting them as soon as you have a foundation; they tell you what to read next.',
  'Add reference texts surgically — Alberts, Raven, Schmidt-Nielsen, and Lehninger only when a past-paper gap proves you need that depth.',
  'Purves Life is optional — a useful second voice, not a fourth must-buy.',
]

const faqs = [
  {
    question: 'Which book should I start with for USABO?',
    answer:
      'Start with Campbell Biology and nothing else. It covers the large majority of the USABO content map with the clearest figures available, and trying to read reference texts before you have a Campbell-level foundation just wastes time. Read Campbell through once for breadth, then a second time taking notes, and only then add reference books where past papers show you need more depth.',
  },
  {
    question: 'Is Campbell Biology enough for USABO on its own?',
    answer:
      'Campbell alone is often enough to be competitive for the Open Exam, but it is not enough for the Semifinal and National Finals. Campbell runs out of depth in cell and molecular mechanisms, biochemistry, and plant physiology — exactly where USABO probes hardest at the higher rounds. Most students master Campbell first, then layer in Alberts, Raven, Schmidt-Nielsen, and Lehninger where their drills expose gaps.',
  },
  {
    question: 'Do I need to buy all of these books?',
    answer:
      'No. Campbell and the past papers are the only true must-haves. The reference texts — Alberts, Raven Biology of Plants, an animal-physiology reference, and Lehninger — are precisely that: references you dip into for specific topics, not books to read end to end. Buy them surgically, one at a time, when a past-paper weakness proves you need the extra depth. That keeps your budget and your reading focused.',
  },
  {
    question: 'Should I read the reference texts cover to cover?',
    answer:
      'No. Alberts, Lehninger, Raven, and Schmidt-Nielsen are reference works, not textbooks to read front to back. The efficient method is to let past papers point you to a weak mechanism, then read only the relevant chapter of the relevant reference. Reading Alberts cover to cover is one of the most common ways strong students waste months.',
  },
  {
    question: 'Are older editions of these books fine?',
    answer:
      'For most USABO purposes, a recent-but-not-latest edition is perfectly serviceable and far cheaper. Core biology does not change between adjacent editions in ways that matter for the exam. Spend the savings on having the books you actually need rather than on the newest edition of one.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'USABO Coaching',
      item: 'https://cerebrumbiologyacademy.com/usabo-coaching',
    },
    { '@type': 'ListItem', position: 3, name: 'Best USABO Books', item: URL },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best USABO Books: The Reference Library for the USA Biology Olympiad',
  url: URL,
  inLanguage: 'en-US',
  datePublished: '2026-06-25',
  dateModified: '2026-06-25',
  author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
  publisher: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
    logo: { '@type': 'ImageObject', url: 'https://cerebrumbiologyacademy.com/logo.png' },
  },
  about: [
    { '@type': 'Thing', name: 'USABO books and resources' },
    { '@type': 'Thing', name: 'USA Biology Olympiad' },
  ],
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
    audienceType: 'USA-based high school students building a USABO reference library',
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

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Recommended USABO books and resources',
  itemListElement: books.map((b, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: b.name,
  })),
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': URL,
  url: URL,
  name: 'Best USABO Books',
  inLanguage: 'en-US',
  datePublished: '2026-06-25',
  dateModified: '2026-06-25',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  areaServed: { '@type': 'Country', name: 'United States' },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'details p'],
  },
}

function TierBadge({ tier }: { tier: BookEntry['tier'] }) {
  const styles: Record<BookEntry['tier'], string> = {
    Core: 'bg-green-100 text-green-800',
    Reference: 'bg-blue-100 text-blue-800',
    Practice: 'bg-purple-100 text-purple-800',
  }
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${styles[tier]}`}>
      {tier}
    </span>
  )
}

export default function BestUSABOBooksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <CerebrumPersonSchema
        knowsAbout={[
          'Best USABO books and resources',
          'USA Biology Olympiad (USABO)',
          'Campbell Biology',
          'Olympiad biology reference texts',
          'USABO past papers',
          'Biology Olympiad coaching',
        ]}
        jobTitle="Founder & Lead Biology Olympiad Coach"
      />

      <main className="min-h-screen bg-white">
        <nav className="bg-gray-100 py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-teal-600">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <Link href="/usabo-coaching" className="text-gray-600 hover:text-teal-600">
                  USABO Coaching
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-teal-700 font-medium">Best Books</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              The honest reading list
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Best USABO Books
              <span className="block text-yellow-400 mt-2">
                The reference library that actually works
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl">
              You do not need a shelf of textbooks to do well at the USA Biology Olympiad — you need
              the right few, in the right order. Campbell Biology and past papers carry most of the
              load; the reference texts are surgical tools you reach for when a past-paper gap
              proves you need more depth. Here is what each book is best for and when to buy it.
            </p>
            <p className="text-sm text-slate-400 mb-6 max-w-3xl">
              Live online in your US time zone (ET/CT/MT/PT); pricing in USD.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                href="/usabo-coaching#free-assessment"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-lg font-semibold transition"
              >
                <Target className="w-5 h-5" />
                Book a free assessment
              </Link>
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium border border-white/30 transition"
              >
                <Trophy className="w-5 h-5" />
                See full programme
              </Link>
            </div>
          </div>
        </section>

        {/* Buy order */}
        <section className="py-10 bg-amber-50 border-y border-amber-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-amber-700" />
              <h2 className="text-xl font-bold text-slate-900">Buy in this order</h2>
            </div>
            <ol className="space-y-2">
              {buyOrder.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-amber-900">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Books */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              The books, one by one
            </h2>
            <p className="text-slate-600 mb-8 max-w-3xl">
              These are real, widely used references — no shortcuts or knock-offs. Each entry says
              what the book is genuinely good for and when it earns its place on your shelf.
            </p>
            <div className="space-y-5">
              {books.map((b) => (
                <div key={b.name} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{b.name}</h3>
                      <p className="text-sm text-slate-500">{b.author}</p>
                    </div>
                    <TierBadge tier={b.tier} />
                  </div>
                  <p className="text-sm text-slate-700 mb-3">{b.bestFor}</p>
                  <div className="flex gap-2 bg-white border border-slate-200 rounded-lg p-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700">
                      <strong>When to buy: </strong>
                      {b.whenToBuy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to use them */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-7 h-7 text-teal-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                How to actually use this library
              </h2>
            </div>
            <ul className="space-y-3 mt-6">
              <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-700">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Campbell is your spine.</strong> Everything else hangs off it. Do not open
                  a reference text until you have a Campbell-level grasp of the topic.
                </span>
              </li>
              <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-700">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Past papers drive your reading.</strong> Let a wrong answer tell you which
                  chapter of which reference to read next — not a reading schedule made in advance.
                </span>
              </li>
              <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-700">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>References are for depth, not breadth.</strong> Read the one relevant
                  chapter, not the whole book. This is the discipline that separates efficient
                  candidates from overwhelmed ones.
                </span>
              </li>
            </ul>
            <p className="text-sm text-slate-500 mt-6 max-w-3xl">
              For how these map onto exam topics, see the{' '}
              <Link href="/usabo-syllabus" className="text-teal-700 underline hover:text-teal-800">
                USABO syllabus guide
              </Link>
              ; for a week-by-week reading schedule, see the{' '}
              <Link
                href="/usabo-6-month-prep-plan"
                className="text-teal-700 underline hover:text-teal-800"
              >
                6-month prep plan
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-slate-50 rounded-xl border border-slate-200 open:shadow-md"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer">
                    <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-slate-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <GraduationCap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Not sure what to read next?</h2>
            <p className="text-xl mb-8 opacity-90">
              A free diagnostic shows exactly which topics — and therefore which chapters of which
              books — to prioritize. We coach the full USABO pathway in US time zones, from Campbell
              foundations to National Finals lab prep.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/usabo-coaching#free-assessment"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                <Target className="w-5 h-5" />
                Book a free assessment
              </Link>
              <ContextualWhatsAppLink className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition">
                <MessageCircle className="w-5 h-5" />
                Ask for a reading plan
              </ContextualWhatsAppLink>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Related guides</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link
                href="/usabo-syllabus"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">USABO Syllabus</h3>
                <p className="text-xs text-slate-600 mt-1">What is on the exam</p>
              </Link>
              <Link
                href="/usabo-6-month-prep-plan"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">6-Month Prep Plan</h3>
                <p className="text-xs text-slate-600 mt-1">Month-by-month schedule</p>
              </Link>
              <Link
                href="/usabo-past-papers"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">USABO Past Papers</h3>
                <p className="text-xs text-slate-600 mt-1">Year-by-year archive</p>
              </Link>
              <Link
                href="/best-usabo-coach"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">Best USABO Coach</h3>
                <p className="text-xs text-slate-600 mt-1">Why students pick us</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
