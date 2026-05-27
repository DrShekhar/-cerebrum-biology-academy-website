/**
 * /gamsat-score-breakdown-biology
 *
 * GAMSAT scoring system explained — Section III biology score guide,
 * competitive scores by country, retake strategy, percentiles.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${SITE_URL}/gamsat-score-breakdown-biology`

export const metadata: Metadata = {
  title: 'GAMSAT Score Breakdown 2026 — Section III Biology Score Guide',
  description:
    'GAMSAT scoring explained — Section III biology score guide for 2026. Competitive scores by country (AU, UK, Ireland), percentiles, retake strategy, and how biology knowledge drives your overall GAMSAT score.',
  keywords: [
    'GAMSAT score breakdown',
    'GAMSAT Section III score',
    'GAMSAT scoring system',
    'GAMSAT competitive score',
    'GAMSAT score for Melbourne',
    'GAMSAT score for Oxford',
    'GAMSAT percentiles',
    'GAMSAT retake strategy',
    'GAMSAT biology score guide',
    'GAMSAT Section 3 score',
    'GAMSAT overall score calculation',
    'GAMSAT 60 competitive',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'GAMSAT Score Breakdown 2026 | Cerebrum Biology Academy',
    description:
      'Section III scoring, competitive scores by country, percentiles, retake strategy.',
    url: PAGE_URL,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GAMSAT Score Breakdown 2026',
    description: 'Section III biology scoring, competitive scores AU/UK/IE, retake strategy.',
  },
}

const faqs = [
  {
    question: 'What is a good GAMSAT Section III score?',
    answer:
      'A Section III score of 60+ is competitive for most graduate-entry medicine programmes in Australia and Ireland. For top-tier programmes (University of Melbourne MD, University of Sydney, Oxford, Cambridge), Section III 65+ is typically required. For the most competitive UK programmes (Warwick, Nottingham), Section III 67-70+ puts you in a strong position. The median overall GAMSAT score is approximately 56-58, so any Section III score above 60 places you above the median.',
  },
  {
    question: 'How is the GAMSAT scored?',
    answer:
      "Each GAMSAT section is scored on a scale of 30 to 100, with the overall GAMSAT score calculated as a weighted average of the three sections. The standard weighting formula is: Overall = (1 x Section I + 1 x Section II + 2 x Section III) / 4. This means Section III counts double in the overall score. Some programmes use different weightings — St George's (London) and University of Melbourne weight Section III even more heavily. The scoring is norm-referenced: your raw score (number correct) is converted to a scaled score based on the performance of all candidates in that sitting.",
  },
  {
    question: 'Does biology count more than chemistry in Section III?',
    answer:
      'ACER does not report biology and chemistry sub-scores separately — you receive a single Section III score. However, given the ~40% biology content split and the fact that biochemistry questions straddle both disciplines, biology knowledge typically influences 50-60% of Section III questions. A candidate who is strong in biology and biochemistry but weaker in physics has a structural advantage in Section III, because physics contributes only ~20% of questions.',
  },
  {
    question: 'What GAMSAT score do I need for Melbourne or Oxford?',
    answer:
      'University of Melbourne MD: GAMSAT overall 62-65+ with Section III 63+ is competitive for interview. The exact cut-off varies by year and is influenced by GPA weighting. University of Oxford (graduate entry): GAMSAT overall 65+ with Section III 66+ — Oxford is among the most competitive GAMSAT pathways globally. Deakin University: 60+ overall. RCSI Dublin: 56-60+ overall. University of Limerick: 56-58+. These are approximate thresholds based on successful candidate reports from 2022-2025 cycles.',
  },
  {
    question: 'How much can GAMSAT scores improve on a retake?',
    answer:
      'The typical improvement between first and second sitting is 3-7 points on Section III with structured preparation. Candidates who scored below 55 on their first attempt and then followed a 16-24 week preparation programme see the largest improvements (8-12 points is achievable). Candidates already scoring 60+ see more modest gains (2-5 points) because they are already above median. The diminishing returns point is around the third sitting — after three attempts, further score improvement becomes harder without significant changes to study approach.',
  },
]

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
      name: 'GAMSAT Section III Biology Prep',
      item: `${SITE_URL}/gamsat-section-3-biology-prep`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Score Breakdown',
      item: PAGE_URL,
    },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'd like to improve my GAMSAT Section III score. Can you share a diagnostic consultation and programme details?"
  )

export default function GAMSATScoreBreakdownBiologyPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-br from-purple-900 to-indigo-900 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-purple-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/gamsat-section-3-biology-prep" className="hover:text-white">
              GAMSAT Section III Biology Prep
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Score Breakdown</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            GAMSAT Score Breakdown 2026 — Section III Biology Score Guide
          </h1>
          <p className="text-xl text-purple-200 mb-6 max-w-3xl">
            How GAMSAT scoring works, what scores are competitive for graduate medicine in
            Australia, the UK, and Ireland, and how biology knowledge directly drives your Section
            III score. Includes percentile estimates, country-by-country thresholds, and a retake
            improvement strategy.
          </p>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How GAMSAT scoring works</h2>
          <p>
            The GAMSAT scores each of its three sections on a scale of 30 to 100. The scores are
            norm-referenced — your raw score (number of correct answers) is converted to a scaled
            score based on the performance distribution of all candidates who sat the same
            administration. This means a raw score of 55/75 on Section III in March may yield a
            different scaled score than the same raw score in September, depending on the difficulty
            of the paper and the cohort.
          </p>
          <p>
            The overall GAMSAT score is a weighted average of the three section scores. The standard
            formula used by most graduate-entry medicine programmes is:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6">
            <p className="text-center font-mono text-lg text-slate-900">
              Overall = (1 &times; Section I + 1 &times; Section II + 2 &times; Section III) / 4
            </p>
          </div>
          <p>
            Section III counts double in this formula. This is why Section III — and by extension,
            biology knowledge — has a disproportionate impact on your overall GAMSAT score. A
            candidate who scores 70 on Section III but 55 on Sections I and II will have an overall
            of 62.5. A candidate who scores 55 on Section III but 70 on Sections I and II will have
            an overall of only 62.5 as well — the formula is symmetric, but the point is that
            Section III has twice the weight.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Section III weight in overall score
          </h2>
          <p>
            Because Section III is double-weighted, it accounts for 50% of the overall GAMSAT score
            under the standard formula. Some programmes apply additional weighting:
          </p>
          <ul>
            <li>
              <strong>Standard (most programmes)</strong> — Section III is 50% of the overall. Used
              by: University of Melbourne, Deakin, Monash, UQ, RCSI, UCC, UL, UCD, most UK
              programmes.
            </li>
            <li>
              <strong>Higher Section III weight</strong> — Some programmes unofficially weight
              Section III more heavily in their selection algorithm, particularly programmes with a
              science focus. Warwick Medical School and St George&apos;s (London) have historically
              placed additional emphasis on Section III performance.
            </li>
            <li>
              <strong>Equal weighting</strong> — A small number of programmes use equal weighting
              across all three sections. Check each programme&apos;s published selection criteria.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Competitive scores by country
          </h2>

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">
            Australia (GAMSAT overall / Section III)
          </h3>
          <ul>
            <li>
              <strong>University of Melbourne MD</strong> — Overall 62-65+, Section III 63+.
              Melbourne uses a combined GAMSAT + GPA formula; high GPA can offset a lower GAMSAT and
              vice versa.
            </li>
            <li>
              <strong>University of Sydney</strong> — Overall 63-66+, Section III 64+. Highly
              competitive; limited graduate-entry places.
            </li>
            <li>
              <strong>Monash University</strong> — Overall 60-63+, Section III 60+.
            </li>
            <li>
              <strong>Deakin University</strong> — Overall 58-62+, Section III 59+. More accessible
              than Melbourne/Sydney.
            </li>
            <li>
              <strong>University of Queensland</strong> — Overall 60-63+, Section III 61+.
            </li>
            <li>
              <strong>Griffith University (Gold Coast)</strong> — Overall 58-60+, Section III 58+.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">
            United Kingdom (GAMSAT overall / Section III)
          </h3>
          <ul>
            <li>
              <strong>University of Oxford (graduate entry)</strong> — Overall 65+, Section III 66+.
              One of the most competitive GAMSAT pathways globally.
            </li>
            <li>
              <strong>University of Cambridge (graduate entry)</strong> — Overall 64-66+, Section
              III 65+. Similar competitiveness to Oxford.
            </li>
            <li>
              <strong>Warwick Medical School</strong> — Overall 63-66+, Section III 65+. 4-year
              graduate-entry only; highly competitive.
            </li>
            <li>
              <strong>University of Nottingham</strong> — Overall 60-64+, Section III 62+.
            </li>
            <li>
              <strong>St George&apos;s, London</strong> — Overall 58-62+, Section III 60+.
            </li>
            <li>
              <strong>University of Edinburgh</strong> — Overall 62-65+, Section III 63+.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">
            Ireland (GAMSAT overall / Section III)
          </h3>
          <ul>
            <li>
              <strong>RCSI (Royal College of Surgeons in Ireland)</strong> — Overall 56-60+, Section
              III 58+. The most accessible of the major GAMSAT-accepting programmes.
            </li>
            <li>
              <strong>UCC (University College Cork)</strong> — Overall 58-62+, Section III 59+.
            </li>
            <li>
              <strong>UCD (University College Dublin)</strong> — Overall 58-62+, Section III 59+.
            </li>
            <li>
              <strong>UL (University of Limerick)</strong> — Overall 56-58+, Section III 57+.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">GAMSAT score percentiles</h2>
          <p>
            ACER does not publish official percentile tables, but approximate percentiles based on
            candidate reports and score-distribution analysis from 2022-2025 sittings:
          </p>
          <ul>
            <li>
              <strong>Section III 50</strong> — approximately 35th-40th percentile
            </li>
            <li>
              <strong>Section III 55</strong> — approximately 50th-55th percentile
            </li>
            <li>
              <strong>Section III 60</strong> — approximately 65th-70th percentile
            </li>
            <li>
              <strong>Section III 65</strong> — approximately 80th-85th percentile
            </li>
            <li>
              <strong>Section III 70</strong> — approximately 90th-93rd percentile
            </li>
            <li>
              <strong>Section III 75+</strong> — approximately 96th+ percentile
            </li>
          </ul>
          <p>
            The median Section III score is approximately 54-57 across recent sittings. The
            distribution is roughly normal with a slight positive skew (more candidates cluster in
            the 50-60 range than in the 70+ range).
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            How biology knowledge affects your Section III score
          </h2>
          <p>
            Biology and biochemistry together influence approximately 50-60% of Section III
            questions. A candidate who scores perfectly on all biology-related questions but poorly
            on chemistry and physics could still achieve a Section III score of 62-65 — competitive
            for many programmes. Conversely, a candidate who is strong in chemistry and physics but
            weak in biology will typically cap at Section III 55-58 because the biology content is
            too large a proportion to ignore.
          </p>
          <p>
            The practical implication: biology is the highest-return investment for Section III
            improvement. If you have limited preparation time, prioritising biology and biochemistry
            over physics will yield the greatest score gains per hour of study.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Retake strategy</h2>
          <p>
            GAMSAT can be sat twice per year (March and September). Your most recent score is used
            by most programmes (some programmes accept your best score across sittings — check
            individual programme policies). Retake strategy by current score band:
          </p>
          <ul>
            <li>
              <strong>Section III below 50</strong> — Significant content gaps. A 20-24 week
              structured programme covering biology from foundations is recommended before
              resitting. Expected improvement: 8-15 points.
            </li>
            <li>
              <strong>Section III 50-55</strong> — Content is present but reasoning application is
              weak. Focus on stimulus-based practice with ACER materials. 16-week programme
              recommended. Expected improvement: 5-10 points.
            </li>
            <li>
              <strong>Section III 56-62</strong> — Solid foundations, needs targeted improvement.
              Identify the weakest biology sub-domains (often biochemistry or physiology) and drill
              intensively. 12-16 weeks. Expected improvement: 3-7 points.
            </li>
            <li>
              <strong>Section III 63+</strong> — Above median with diminishing returns. Focus on
              timing strategy, cross-topic integration stems, and the chemistry/physics component
              (which may be the binding constraint). Expected improvement: 2-5 points.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related guides</h2>
          <ul>
            <li>
              <Link href="/gamsat-section-3-biology-prep" className="text-blue-600 hover:underline">
                GAMSAT Section III Biology Prep — full programme details
              </Link>
            </li>
            <li>
              <Link href="/gamsat-section-3-study-guide" className="text-blue-600 hover:underline">
                GAMSAT Section III Study Guide — 16-week plan
              </Link>
            </li>
            <li>
              <Link href="/gamsat-biology-topics-2026" className="text-blue-600 hover:underline">
                GAMSAT Biology Topics 2026 — high-yield content list
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">GAMSAT Scoring FAQs</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-lg">
                  {f.question}
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed faq-answer">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Improve your GAMSAT Section III score
          </h2>
          <p className="text-purple-200 mb-8">
            Free 30-minute diagnostic consultation. Share your current GAMSAT score (or a practice
            test score) and we will build a targeted improvement plan for Section III biology.
          </p>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-xl font-semibold text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>
      <StickyMobileCTABar waUrl={wa} />
    </main>
  )
}
