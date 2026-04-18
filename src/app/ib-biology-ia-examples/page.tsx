import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { ArrowRight, MessageCircle, Award, Target } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-ia-examples'

export const metadata: Metadata = {
  title: 'IB Biology IA Examples 2025 | Annotated Exemplars by Criterion | Cerebrum',
  description:
    'Six anonymised IB Biology IA exemplars annotated criterion-by-criterion against the 2025 rubric. See exactly what a 6/6 Research Design or Evaluation looks like — and what drops a response to 3/6.',
  keywords: [
    'IB Biology IA examples',
    'IB Biology IA exemplars',
    'IB Biology IA annotated',
    'IB Biology IA sample',
    'IB Biology IA grade 7',
    'IB Biology IA 24/24',
    'IB Biology IA model answer',
    'IB Biology IA marked',
    'best IB Biology IA examples',
    'IB Biology IA 2025 examples',
  ],
  openGraph: {
    title: 'IB Biology IA Examples 2025 | Annotated Exemplars',
    description:
      'Criterion-by-criterion annotated IA exemplars showing what scores 6/6 and what drops to 3/6.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology IA Examples 2025 — Annotated Exemplars',
    description: 'Six annotated IA exemplars across all 4 criteria of the 2025 rubric.',
  },
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

interface Exemplar {
  title: string
  scoreSummary: string
  topic: string
  why: string[]
  watchOuts: string[]
  criterionFocus: 'Research Design' | 'Data Analysis' | 'Conclusion' | 'Evaluation'
}

const exemplars: Exemplar[] = [
  {
    criterionFocus: 'Research Design',
    title: 'Enzyme kinetics — amylase vs pH',
    scoreSummary: 'Research Design 6/6 · Full IA predicted 22/24',
    topic:
      'Effect of buffered pH (3, 5, 7, 9, 11) on the initial rate of starch-iodine complex disappearance catalysed by α-amylase at 25 °C.',
    why: [
      'Research question explicitly names IV (pH), DV (initial reaction rate), and the enzyme/substrate system.',
      '5 pH levels spanning the expected optimum gives a shape (bell curve) that the conclusion can discuss quantitatively.',
      '8 control variables listed with tolerances — including buffer molarity (0.1 ± 0.005 mol dm⁻³) and [enzyme] (0.2 % w/v).',
      'Statistical test (one-way ANOVA) is justified before data collection.',
    ],
    watchOuts: [
      'Buffer composition changes ionic strength — mention this in Evaluation even if the Conclusion is strong.',
      'Starch-iodine disappearance is a proxy; discuss whether it saturates at high [substrate].',
    ],
  },
  {
    criterionFocus: 'Data Analysis',
    title: 'Photosynthesis — Elodea light intensity',
    scoreSummary: 'Data Analysis 6/6 · Full IA predicted 23/24',
    topic:
      'Effect of incident irradiance (50, 150, 300, 600, 1000 μmol m⁻² s⁻¹) on O₂ bubble production rate in Elodea canadensis at 20 °C.',
    why: [
      'Raw data table shows 6 replicates per level with individual values, means, SD, and standard error.',
      'Worked calculation for rate (cm³ min⁻¹) using volume of one bubble, calibrated separately.',
      'Michaelis-Menten-style regression fit with reported R² = 0.97 and asymptotic Vmax.',
      'Error bars on the figure are ±SE (not ±SD) — correctly chosen for a mean-comparison figure.',
    ],
    watchOuts: [
      'Bubble size assumption is a source of systematic error — explicitly quantified in Evaluation.',
      'Light saturation was approached but not fully reached — say this when discussing Vmax.',
    ],
  },
  {
    criterionFocus: 'Conclusion',
    title: 'Respiration — yeast carbohydrate substrates',
    scoreSummary: 'Conclusion 6/6 · Full IA predicted 21/24',
    topic:
      'Effect of carbohydrate type (glucose, fructose, sucrose, lactose) on CO₂ production rate by Saccharomyces cerevisiae at 30 °C measured via manometry.',
    why: [
      'Conclusion states effect direction AND magnitude (glucose gave 2.3× the rate of sucrose) with CIs.',
      'Explicitly links to the enzymes involved (hexokinase, invertase) and the lack of β-galactosidase to explain the lactose result.',
      'Cites 2 literature values for glucose fermentation rate — within 15% of the measured value.',
      'Does not over-claim: notes that "fermentation pathway" cannot be deduced from CO₂ data alone.',
    ],
    watchOuts: [
      "Chose not to use ANOVA because of unequal variances — used Welch's ANOVA and justified it.",
    ],
  },
  {
    criterionFocus: 'Evaluation',
    title: 'Ecology — salt stress on radish germination',
    scoreSummary: 'Evaluation 6/6 · Full IA predicted 22/24',
    topic:
      'Effect of NaCl concentration (0, 50, 100, 200, 400 mM) on the percentage germination of Raphanus sativus at day 5.',
    why: [
      'Weaknesses ranked by their impact on uncertainty — water-potential drift (largest), temperature (medium), handling (small).',
      'Random vs systematic errors explicitly separated.',
      'Improvements are specific: "replace plastic beaker with thermostatically controlled germination chamber" (not "use better equipment").',
      'Extensions directly test the mechanism: "repeat with KCl at matched osmotic potential to separate ion-specific from osmotic effects".',
    ],
    watchOuts: ['Did not comment on seed-batch heterogeneity — would be good to add.'],
  },
  {
    criterionFocus: 'Research Design',
    title: 'Database IA — latitudinal CO₂ trend',
    scoreSummary: 'Research Design 5/6 · Full IA predicted 19/24',
    topic:
      'Using NOAA Mauna Loa + HadCRUT data: is the rate of monthly CO₂ rise correlated with the latitude-banded warming anomaly from 2000 to 2024?',
    why: [
      'Question is precise, testable, and grounded in published data.',
      'Sampling protocol (monthly, 2000–2024, complete records) is reproducible.',
    ],
    watchOuts: [
      'Did not pre-register a hypothesis before accessing data — this is why the criterion is capped at 5/6.',
      'Needed stronger biological rationale linking latitude-banded warming to a biological consequence.',
    ],
  },
  {
    criterionFocus: 'Evaluation',
    title: 'Human physiology — caffeine on heart rate',
    scoreSummary: 'Evaluation 3/6 · Full IA predicted 15/24',
    topic:
      'Effect of caffeine dose (0, 50, 100, 200 mg) on resting heart rate in 5 volunteers 30 minutes after intake.',
    why: ['Some limitations identified (small N, individual variation).'],
    watchOuts: [
      'Weaknesses listed generically ("human error") without impact analysis.',
      'Improvements suggested as "do more trials" without a specific, realistic change.',
      'No distinction between random and systematic error.',
      'Caffeine habituation not considered — a clear systematic confound.',
    ],
  },
]

const examplesFAQs = [
  {
    question: 'Can I see a full IB Biology IA example?',
    answer:
      "Full exemplars are controlled by the IB and released only through schools or subscription platforms. We do not republish student work without consent. Instead, the criterion-by-criterion annotations on this page show exactly what behaviour separates a 6/6 response from a 3/6 response, which is more useful for writing your own IA than reading someone else's.",
  },
  {
    question: 'What does a grade-7 IB Biology IA actually score?',
    answer:
      'A grade-7 IA typically scores 22–24 out of 24. That means full or near-full marks on every criterion. You can score 6/6 on three criteria and lose 2 marks on a single criterion and still get 22/24, which maps to grade 7 in most years.',
  },
  {
    question: 'Do I need original data, or can I reuse an exemplar design?',
    answer:
      'You must collect your own data. You can absolutely borrow a methodology pattern (for example, "measure initial rate at 5 pH levels"), but the research question, variables, and data must be yours. IB plagiarism detection now compares IAs across schools and cohorts.',
  },
  {
    question: 'Which criterion is easiest to score full marks on?',
    answer:
      'Research Design is the most controllable because it is written before you run the experiment. Evaluation is usually the hardest because it requires ranked weaknesses, impact analysis, and specific improvements — details that students often skip under time pressure.',
  },
]

export default function IABiologyIAExamplesPage() {
  return (
    <>
      <FAQSchema questions={examplesFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'IA Guide', href: '/ib-biology-ia-guide' },
          { label: 'Exemplars', isCurrentPage: true },
        ]}
        showSchemaOnly
      />

      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/ib-biology" className="hover:text-white">
                    IB Biology
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/ib-biology-ia-guide" className="hover:text-white">
                    IA Guide
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-medium text-white">
                  Exemplars
                </li>
              </ol>
            </nav>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology IA Examples — Annotated Against the 2025 Rubric
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              Six anonymised IA case studies — four scoring 6/6 on a named criterion, one at 5/6,
              and one at 3/6 — with the exact reasoning examiners would apply. Ethical note: no
              student work is reproduced; these are examiner-style annotations of patterns we see
              repeatedly in Cerebrum coaching.
            </p>
          </div>
        </section>

        {/* Exemplars */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="space-y-8">
              {exemplars.map((ex) => (
                <article
                  key={ex.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{ex.title}</h2>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                      {ex.criterionFocus}
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Score summary
                  </p>
                  <p className="mb-4 text-gray-900">{ex.scoreSummary}</p>
                  <p className="mb-6 rounded-lg bg-gray-50 p-4 text-gray-700">{ex.topic}</p>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-green-800">
                        <Award className="h-4 w-4" />
                        Why it scores well
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {ex.why.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="flex-shrink-0 text-green-600">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-800">
                        <Target className="h-4 w-4" />
                        Watch-outs
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {ex.watchOuts.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="flex-shrink-0 text-amber-600">!</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              IA Exemplars — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {examplesFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-green-600 group-open:rotate-180 transition-transform">
                        ▾
                      </span>
                    </h3>
                  </summary>
                  <p className="mt-4 leading-relaxed text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Keep Going</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/ib-biology-ia-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Main IA Guide
              </Link>
              <Link
                href="/ib-biology-ia-rubric-2025"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Rubric Breakdown
              </Link>
              <Link
                href="/ib-biology-ia-troubleshooting"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Troubleshooting
              </Link>
              <Link
                href="/ib-biology-ia-topics"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Topic Ideas
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Want Feedback Like This On Your IA?
            </h2>
            <p className="mb-8 text-lg text-green-100">
              Cerebrum's IA Coaching Package includes a criterion-by-criterion review on your draft
              in 48 hours — formatted like the annotations above.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want a criterion-by-criterion review of my IB Biology IA draft.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book IA Review
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
