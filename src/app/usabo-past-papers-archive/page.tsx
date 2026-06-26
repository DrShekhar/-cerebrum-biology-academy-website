/**
 * /usabo-past-papers-archive
 *
 * Cornerstone — owns the USABO past-papers content category. CEE
 * publishes Open + Semifinal exams but doesn't aggregate them with
 * worked solutions; we do.
 *
 * Cross-links to all USABO city pages + the USABO coaching hub.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import {
  Archive,
  Award,
  ChevronRight,
  Clock,
  Home,
  MessageCircle,
  Microscope,
  Trophy,
} from 'lucide-react'

const CANONICAL = '/usabo-past-papers-archive'
const SITE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'USABO Past Papers Archive — 2010–2025 + Worked Solutions · Cerebrum',
  description:
    'Annotated archive of USABO Open and Semifinal exams 2010–2025 with worked solutions, topic tagging, and the past-paper drilling schedule top USABO Semifinalists actually use.',
  keywords: [
    'USABO past papers',
    'USABO Open past papers',
    'USABO Semifinal past papers',
    'USABO 2024 paper',
    'USABO 2025 paper',
    'USABO archive',
    'biology olympiad past papers',
    'USABO solutions',
    'USABO worked answers',
    'USABO Open solutions',
    'USABO Semifinal solutions',
    'how to prepare for USABO',
    'USABO past paper drilling',
  ],
  canonical: CANONICAL,
})

export default function USABOPastPapersArchivePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'USABO Past Papers Archive — 2010–2025 + Worked Solutions',
    description:
      'Annotated archive of USABO Open and Semifinal exams 2010-2025 with worked solutions, topic tagging, and the past-paper drilling methodology used by Semifinalists.',
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
        name: 'USABO Coaching',
        item: `${SITE_URL}/usabo-coaching`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Past Papers Archive',
        item: `${SITE_URL}${CANONICAL}`,
      },
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
                <Link href="/usabo-coaching" className="text-gray-600 hover:text-blue-700">
                  USABO Coaching
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-blue-700 font-medium">Past Papers Archive</span>
              </li>
            </ol>
          </div>
        </nav>

        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Archive className="w-4 h-4" /> 16 years of papers · annotated · topic-tagged
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6" data-speakable="title">
              USABO Past Papers Archive —
              <span className="block text-yellow-400 mt-2">2010 to 2025</span>
            </h1>
            <p
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed"
              data-speakable="summary"
            >
              Past-paper drilling is the single highest-leverage USABO prep activity. The Center for
              Excellence in Education (CEE) publishes the Open + Semifinal exams after each cycle,
              but doesn&apos;t aggregate them into a searchable archive with worked solutions. This
              is that archive — 16 years of papers (2010–2025) with our worked solutions,
              common-mistake annotations, and topic tagging that lets you target weak areas.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Trophy className="w-4 h-4 text-yellow-400" />
                USABO Open + Semifinal
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Microscope className="w-4 h-4 text-yellow-400" />
                Topic-tagged by Campbell unit
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Clock className="w-4 h-4 text-yellow-400" />
                Worked solutions for every Q
              </span>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Why past-paper drilling is the USABO key
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              USABO question patterns are remarkably consistent year-over-year. The Open exam (50
              MCQ in 50 minutes, school-administered, early February) draws heavily from cell
              biology (~20%), genetics + molecular biology (~25%), plant + animal physiology (~20%),
              ecology + evolution (~15%), and lab techniques + experimental design (~20%). The
              Semifinal (theory + free-response, 3 hours, mid-March) goes significantly deeper — but
              the topic distribution is similar.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Once you&apos;ve seen 8–10 years of past papers, you start recognising patterns: the
              same molecular techniques (PCR variants, gel electrophoresis interpretation,
              microscopy), the same quantitative skills (chi-square, Hardy-Weinberg, enzyme
              kinetics), the same comparative-anatomy themes (across kingdom diversity), and the
              same experimental-design framing. That pattern recognition is what separates a top-50
              Semifinalist from someone who knows the content but misreads the question.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Our coaching method is built on past-paper saturation — we drill 10+ years of Open
              papers in the 8 weeks before the exam, then transition to Semifinal-level past papers
              between the Open and the Semifinal date. Our students typically attempt 600+
              past-paper questions before sitting their first official Open.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              How to use this archive
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: 'Start with the most recent 3 years (2023–2025)',
                  body: 'These reflect current question style and topic emphasis. Treat the first one as a diagnostic — time it, score against our worked solution, identify weak topics.',
                },
                {
                  step: 2,
                  title: 'Topic-tag your weak areas',
                  body: "Our solutions are tagged by Campbell unit + skill type (concept, calculation, lab technique, experimental design). After your diagnostic, you'll see your weak areas as patterns.",
                },
                {
                  step: 3,
                  title: 'Drill 1 paper / week for 8 weeks',
                  body: 'Pick one paper per week, work through it untimed first, then re-do timed after reading the worked solution. By the end of 8 weeks you have 8 papers + their re-attempts.',
                },
                {
                  step: 4,
                  title: 'Mix forward + backward',
                  body: 'After 8 papers, alternate: a recent one (2024), an older one (2014). The older papers test the same biology but with slightly different framing — pattern-recognition gains accelerate.',
                },
                {
                  step: 5,
                  title: 'Final week: 2 papers under exam timing',
                  body: 'Two full papers in the week before the Open, both under strict 50-minute timing. Walk in with reflexes, not anxiety.',
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="bg-white rounded-xl p-5 border border-slate-200 flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-lg">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              What&apos;s in the archive
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              16 USABO Open exams (2010–2025) and 14 USABO Semifinal exams (2012–2025), each with:
              original question paper, our worked solutions for every question, common-mistake
              annotations (what students typically get wrong on each Q), topic tagging by Campbell
              unit, and skill-type tagging (concept / calculation / lab technique / experimental
              design).
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              The original question papers are the property of the Center for Excellence in
              Education (CEE) and are publicly distributed by them after each cycle. Our annotations
              and worked solutions are independent and not affiliated with CEE or USABO
              administration. We make our archive + solutions available to enrolled students;
              non-enrolled students can request individual papers via WhatsApp.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Source acknowledgement:</strong> USABO Open and Semifinal questions are ©
                Center for Excellence in Education (CEE), publicly released after each annual
                administration. Our worked solutions and annotations are independent commentary, not
                endorsed by or affiliated with CEE / USABO.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Beyond past papers: the canonical books
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The CEE publishes a recommended reading list. The four highest-yield texts for USABO
              Semifinal preparation:
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>Campbell &amp; Reece, Biology (9th edition or later).</strong> The base text
                — covers the full breadth of USABO content. Read all chapters; we use it as the
                curriculum spine.
              </li>
              <li>
                <strong>Alberts, Molecular Biology of the Cell.</strong> The depth text — Chapters 8
                and 9 (lab methods, DNA/RNA detail) are particularly important. Goes far beyond
                Campbell on molecular biology.
              </li>
              <li>
                <strong>Lehninger, Principles of Biochemistry.</strong> For metabolism, energetics,
                enzyme mechanisms. USABO Semifinal often includes biochemistry questions Campbell
                doesn&apos;t cover deeply enough.
              </li>
              <li>
                <strong>Pechenik, A Short Guide to Writing About Biology.</strong> For Semifinal
                free-response — argument structure, evidence integration, scientific writing
                clarity.
              </li>
            </ul>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want a coach to drill past papers with you?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              We schedule weekly past-paper sessions, grade your attempts against the worked
              solutions, and walk through every error pattern until USABO question recognition
              becomes reflex.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                See USABO programme
              </Link>
              <Link
                href="https://wa.me/918826444334?text=Hi!%20I%27m%20preparing%20for%20USABO%20and%20want%20to%20request%20individual%20past%20papers%20with%20worked%20solutions.%20Please%20share%20what%27s%20available."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
              >
                <MessageCircle className="w-5 h-5" />
                Request papers on WhatsApp
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
              More USABO + AP guides
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link
                href="/usabo-coaching"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">USABO Coaching</h3>
                <p className="text-xs text-slate-600 mt-1">Main programme hub</p>
              </Link>
              <Link
                href="/usabo-6-month-prep-plan"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">6-Month Prep Plan</h3>
                <p className="text-xs text-slate-600 mt-1">Month-by-month schedule</p>
              </Link>
              <Link
                href="/ap-biology-vs-usabo"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">AP Biology vs USABO</h3>
                <p className="text-xs text-slate-600 mt-1">Decide your track</p>
              </Link>
              <Link
                href="/ap-biology-frq-rubric-mastery"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">AP FRQ Mastery</h3>
                <p className="text-xs text-slate-600 mt-1">For AP-5 + USABO students</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
