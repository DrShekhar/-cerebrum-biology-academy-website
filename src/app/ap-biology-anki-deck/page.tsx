/**
 * /ap-biology-anki-deck
 *
 * Cornerstone — owns the "AP Biology Anki" content category. No
 * authoritative result currently ranks #1 for this query; we can.
 *
 * Provides a card-design methodology + downloadable starter deck +
 * spaced-repetition schedule that maps to the AP calendar.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import {
  Brain,
  ChevronRight,
  Clock,
  Download,
  Home,
  MessageCircle,
  Repeat,
  Target,
} from 'lucide-react'

const CANONICAL = '/ap-biology-anki-deck'
const SITE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Anki Deck — Free + Card Design Guide · Cerebrum',
  description:
    'How to build (and use) an AP Biology Anki deck the right way — card structure, spaced-repetition schedule mapped to the AP calendar, and our free starter deck.',
  keywords: [
    'AP Biology Anki',
    'AP Biology Anki deck',
    'AP Biology flashcards',
    'AP Bio Anki',
    'AP Biology spaced repetition',
    'AP Biology Anki download',
    'best AP Biology flashcards',
    'AP Biology Quizlet alternative',
    'AP Bio active recall',
    'AP Biology card design',
    'AP Biology study cards',
  ],
  canonical: CANONICAL,
})

export default function APBiologyAnkiDeckPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AP Biology Anki Deck — How to build and use one for a 5',
    description:
      'Card-design methodology and spaced-repetition schedule for AP Biology, with a free starter deck. Cites Karpicke & Roediger 2008 and Dunlosky 2013.',
    url: `${SITE_URL}${CANONICAL}`,
    inLanguage: 'en-US',
    datePublished: '2026-04-30',
    dateModified: '2026-06-08',
    author: { '@type': 'Person', name: 'Dr. Shekhar C Singh', url: `${SITE_URL}/faculty` },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: SITE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${CANONICAL}` },
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${CANONICAL}#webpage`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="title"]', '[data-speakable="summary"]'],
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AP Biology Tutoring',
        item: `${SITE_URL}/ap-biology-tutor`,
      },
      { '@type': 'ListItem', position: 3, name: 'Anki Deck', item: `${SITE_URL}${CANONICAL}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
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
                <Link href="/ap-biology-tutor" className="text-gray-600 hover:text-blue-700">
                  AP Biology Tutoring
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-blue-700 font-medium">Anki Deck</span>
              </li>
            </ol>
          </div>
        </nav>

        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Repeat className="w-4 h-4" /> Spaced repetition + active recall · the only two study
              techniques with strong evidence
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6" data-speakable="title">
              AP Biology Anki Deck —
              <span className="block text-yellow-400 mt-2">Free Starter + Design Guide</span>
            </h1>
            <p
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed"
              data-speakable="summary"
            >
              Anki is the most evidence-backed flashcard app available, but most students build
              cards wrong and burn out by week 3. This guide shows you the right card structure for
              AP Biology, the daily review schedule, and the AP-calendar-aligned roadmap. Free
              starter deck included.
            </p>
            <p className="text-sm text-slate-400 mb-6">
              Want a coach alongside the deck? Live online in your US time zone (ET/CT/MT/PT);
              pricing in USD.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Brain className="w-4 h-4 text-yellow-400" />
                ~600 starter cards
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Clock className="w-4 h-4 text-yellow-400" />
                25 min/day review
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Target className="w-4 h-4 text-yellow-400" />
                All 8 AP units covered
              </span>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Why Anki for AP Biology
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Karpicke &amp; Roediger&apos;s 2008 paper in <em>Science</em> established the evidence
              base: students who self-tested with retrieval practice retained ~50% more material
              after 1 week than students who simply re-read their notes. Anki implements both proven
              techniques — <strong>active recall</strong> (you must remember the answer, not just
              recognise it) and <strong>spaced repetition</strong> (cards reappear at
              scientifically-tuned intervals).
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Dunlosky&apos;s 2013 meta-review of 10 study techniques concluded that{' '}
              <strong>practice testing</strong> and <strong>distributed practice</strong> are the
              only two with strong empirical support. Anki gives you both. Highlighting, re-reading,
              and summarising — what most students actually do — were rated as having weak or no
              evidence.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The catch: most students build cards wrong. They make 200-character chapter-summary
              cards that are impossible to recall, then quit Anki by week three. The fix is card
              design — atomic, single-fact cards with a clean question-answer structure.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Card design: 6 rules for AP Biology Anki
            </h2>
            <div className="space-y-3">
              {[
                {
                  rule: '1. One fact per card',
                  body: 'A card with three facts on it is three cards. Split.',
                },
                {
                  rule: '2. Front: a question, not a topic',
                  body: 'Bad: "Photosynthesis." Good: "What molecule donates electrons in Photosystem II?" The front must be answerable in one phrase.',
                },
                {
                  rule: '3. Back: minimum sufficient',
                  body: 'Bad: 200-word answer. Good: "Water (split by oxygen-evolving complex)." The back is the answer, not a textbook excerpt.',
                },
                {
                  rule: '4. Use cloze deletions for chains',
                  body: "For sequences (e.g., glycolysis steps), use Anki's cloze format with one blank per card. Each step becomes its own recall.",
                },
                {
                  rule: '5. Add a "why" card after every "what" card',
                  body: 'Pair: "What enzyme catalyses X?" with "Why does X require this enzyme specifically?" Mechanism-card pairs cement understanding.',
                },
                {
                  rule: '6. Diagrams as image-occlusion',
                  body: 'For mitochondrion / chloroplast / cell membrane diagrams, use the Image Occlusion add-on. Each labelled part becomes a separate card.',
                },
              ].map((r) => (
                <div key={r.rule} className="bg-white rounded-xl p-5 border border-slate-200">
                  <h3 className="font-bold text-blue-700 mb-1">{r.rule}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              The 25-minute daily review schedule
            </h2>
            <p className="text-slate-600 mb-6">
              Anki&apos;s default scheduler is well-tuned for AP Biology. Your daily review breaks
              into three buckets:
            </p>
            <div className="space-y-3">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="text-xs font-medium text-blue-700 mb-1">5 min</div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Review due cards from previous days
                </h3>
                <p className="text-sm text-slate-700">
                  ~30–60 cards. Cards Anki schedules for today based on when you last saw them.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="text-xs font-medium text-blue-700 mb-1">15 min</div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Add 15–20 new cards from today&apos;s topic
                </h3>
                <p className="text-sm text-slate-700">
                  From your reading or class notes. Apply the 6 card-design rules above.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="text-xs font-medium text-blue-700 mb-1">5 min</div>
                <h3 className="font-bold text-slate-900 mb-1">Review the new cards</h3>
                <p className="text-sm text-slate-700">
                  First-pass recall on what you just added. The first 24 hours is when forgetting is
                  sharpest — close that loop today.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-6 leading-relaxed">
              Over 8 weeks, 25 minutes/day → ~24 hours of pure retrieval practice + ~600 cards
              covering every AP Biology unit. By the May exam, your daily review shrinks to ~10
              minutes (the spacing intervals push old cards out further) but the recall depth is
              locked in.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Free starter deck
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Our free AP Biology starter deck has ~600 cards across all 8 units, built using the 6
              card-design rules above. It covers the highest-yield mechanisms: cellular respiration
              steps (glycolysis → Krebs → ETC → ATP synthase), photosynthesis (light reactions +
              Calvin cycle), DNA replication mechanism, transcription/translation, signal
              transduction cascades, Hardy-Weinberg calculations, and Mendelian + non-Mendelian
              inheritance patterns.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              The deck is designed as a starting point, not a finished product. We strongly
              recommend you add your own cards as you study — the act of building cards is itself
              part of the retrieval-practice benefit. Send us a WhatsApp and we&apos;ll email the
              deck file (.apkg) along with setup instructions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="https://wa.me/918826444334?text=Hi!%20Please%20send%20me%20the%20free%20AP%20Biology%20Anki%20starter%20deck%20(.apkg%20file)%20and%20setup%20instructions."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-lg font-semibold transition"
              >
                <Download className="w-5 h-5" />
                Get the deck on WhatsApp
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Common Anki mistakes (and how to avoid burnout)
            </h2>
            <ol className="space-y-3 text-sm text-slate-700 leading-relaxed list-decimal pl-5">
              <li>
                <strong>Adding 100 cards a day for two weeks, then quitting.</strong> Cap new cards
                at 15–20/day. Anki compounds — a steady 15/day for 8 weeks is 840 cards, more than
                enough.
              </li>
              <li>
                <strong>Skipping review days.</strong> Cards pile up fast. If you skip three days,
                you have 200 due cards staring at you. Better to do 10 minutes daily than 90 minutes
                once a week.
              </li>
              <li>
                <strong>Long, multi-fact cards.</strong> If a card takes you more than 15 seconds to
                read or recall, split it. Cards should be atomic.
              </li>
              <li>
                <strong>Not using image occlusion for diagrams.</strong> Cell diagrams,
                photosystems, replication forks — all benefit hugely from image-occlusion cards over
                text-only.
              </li>
              <li>
                <strong>Marking too many cards as &ldquo;easy.&rdquo;</strong> Be honest. If you
                hesitated, mark &ldquo;good.&rdquo; If you blanked, mark &ldquo;again.&rdquo;
                Anki&apos;s scheduler only works if you grade honestly.
              </li>
              <li>
                <strong>Using only Anki without practice questions or FRQs.</strong> Anki builds
                recall; FRQ practice builds rubric application. You need both. See our{' '}
                <Link href="/ap-biology-frq-rubric-mastery" className="text-blue-700 underline">
                  FRQ rubric mastery guide
                </Link>
                .
              </li>
            </ol>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Brain className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want a coach to build your deck with you?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              We help students build their own AP Biology Anki deck during 1:1 sessions — the act of
              building cards is itself the retrieval-practice that produces 5s.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ap-biology-tutor"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                See AP Biology programme
              </Link>
              <Link
                href="/ap-biology-online-tutor#pricing"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
              >
                <MessageCircle className="w-5 h-5" />
                See pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
              More AP Biology guides
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/ap-biology-frq-rubric-mastery"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">FRQ Rubric Mastery</h3>
                <p className="text-xs text-slate-600 mt-1">Annotated College Board rubrics</p>
              </Link>
              <Link
                href="/ap-biology-score-5-study-guide"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">Score-5 Study Guide</h3>
                <p className="text-xs text-slate-600 mt-1">8-week unit-weighted plan</p>
              </Link>
              <Link
                href="/usabo-past-papers-archive"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">USABO Past Papers</h3>
                <p className="text-xs text-slate-600 mt-1">Annotated archive 2010–2025</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
