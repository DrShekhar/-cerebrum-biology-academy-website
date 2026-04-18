import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { AlertTriangle, MessageCircle, Wrench } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-ia-troubleshooting'

export const metadata: Metadata = {
  title: 'IB Biology IA Troubleshooting | Fix Your IA Without Starting Over | Cerebrum',
  description:
    'My IA is broken — now what? Fixes for 12 common IB Biology IA problems: data not fitting prediction, too few replicates, wrong statistical test, 3,000-word overrun, weak Evaluation. 2025 rubric ready.',
  keywords: [
    'IB Biology IA help',
    'IB Biology IA problems',
    'IB Biology IA not working',
    'IB Biology IA data bad',
    'IB Biology IA rescue',
    'IB Biology IA fix',
    'IB Biology IA word count',
    'IB Biology IA last minute',
    'IB Biology IA 2025 fix',
    'IB Biology IA critical feedback',
  ],
  openGraph: {
    title: 'IB Biology IA Troubleshooting — Fix Your IA Without Starting Over',
    description: '12 common IB Biology IA problems with fixes grounded in the 2025 rubric.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology IA Troubleshooting',
    description: '12 common IA problems fixed without re-running the whole investigation.',
  },
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

interface Problem {
  symptom: string
  rootCause: string
  fix: string
  criterionImpact: string
}

const problems: Problem[] = [
  {
    symptom: 'My data does not match my prediction.',
    rootCause:
      'A non-confirming result is not a failed IA. Examiners reward rigorous analysis of unexpected data more than a "clean" confirmation — but only if you engage with it.',
    fix: 'Run the statistical test anyway. Report the effect size and confidence interval. In Conclusion, propose two biologically plausible reasons why your data deviated from the prediction, and reference literature that also reports variance in this direction. Do NOT discard data.',
    criterionImpact: 'Protects Conclusion (up to 6/6) and strengthens Evaluation.',
  },
  {
    symptom: 'I only have 3 levels of my independent variable.',
    rootCause:
      'With 3 levels you cannot demonstrate a clear trend, fit a curve, or justify ANOVA confidently. Data Analysis caps at roughly 3/6.',
    fix: 'If you still have time: add 2 more levels by interpolating (e.g. if you had 10, 20, 30 °C, add 5 °C and 25 °C). If you do not have time: shift the research question from trend-finding to comparison (t-test between 2 levels), and state this reframe explicitly in Research Design.',
    criterionImpact: 'Raises Data Analysis from 3–4/6 to 5/6.',
  },
  {
    symptom: 'I only ran 3 trials per level.',
    rootCause:
      'Fewer than 5 trials makes it almost impossible to detect outliers or run inferential statistics. The "5 × 5" minimum is the practical floor.',
    fix: 'Quick fix: if you can still access the lab, add 2 more replicates at the extreme and middle levels — examiners weight the range endpoints heavily. No-lab fix: report the data you have with explicit confidence intervals, use non-parametric statistics (Mann-Whitney / Kruskal-Wallis), and list "only 3 replicates per level" as your top-ranked weakness in Evaluation.',
    criterionImpact: 'Recovers Data Analysis to 4–5/6.',
  },
  {
    symptom: 'I am over the 3,000-word limit.',
    rootCause:
      'Typical overruns live in Introduction (over-long biological background) and Evaluation (un-ranked weakness lists).',
    fix: 'Move biological background detail to a clearly labelled appendix (counted as 0 words). Rewrite Evaluation as a ranked list of the top 3 weaknesses with impact + improvement per bullet. Replace every discursive paragraph in Conclusion with a bulleted quantitative claim.',
    criterionImpact: 'Prevents examiner stopping reading at 3,000 words — protects all criteria.',
  },
  {
    symptom: 'My statistical test gave p > 0.05.',
    rootCause:
      'Non-significance is not failure. Examiners care whether you chose the correct test, checked its assumptions, and interpreted the result correctly.',
    fix: 'Report the p-value, the effect size (Cohen\'s d, η², or r²), and the confidence interval. In Conclusion state "no statistically significant effect was detected at α = 0.05" — and discuss why (small N, large variance, narrow IV range). Do not claim "no effect" unless your CI is very tight around zero.',
    criterionImpact: 'Sustains Conclusion at 5/6 even with null results.',
  },
  {
    symptom: 'I used the wrong statistical test.',
    rootCause:
      'Common errors: using a t-test on 4+ groups (should be ANOVA), running ANOVA without checking assumptions, or using Pearson on ordinal data.',
    fix: 'Re-run with the correct test if you can (R, Python, Excel data-analysis ToolPak, or SPSS). Report both the original and corrected results, flag the correction in Evaluation, and explicitly cite why the new test fits your data structure.',
    criterionImpact: 'Rescues Data Analysis; may add a mark in Evaluation for reflection.',
  },
  {
    symptom: 'My Evaluation just lists "human error" and "time constraint".',
    rootCause:
      'Generic limitations are the single biggest reason Evaluation scores drop to 2–3/6. The 2025 rubric explicitly rewards ranked, impact-analysed weaknesses.',
    fix: 'Rewrite as: (1) the top 3 weaknesses you can identify; (2) for each, classify random vs systematic; (3) quantify expected impact on your conclusion (e.g. "would shift mean by ≈8 %"); (4) propose a specific, realistic improvement with a concrete mechanism (e.g. "use thermostatically controlled waterbath to reduce drift from ±2 °C to ±0.2 °C").',
    criterionImpact: 'Raises Evaluation from 2–3/6 to 5–6/6.',
  },
  {
    symptom: 'I have outliers I cannot explain.',
    rootCause:
      'Unexplained outliers become an Evaluation strength if handled rigorously, or a Data Analysis weakness if hidden.',
    fix: 'Never delete silently. Apply a pre-defined outlier rule (e.g. Tukey 1.5 × IQR), report which points it flags, run analysis with AND without the outliers, and state the decision rule. In Evaluation, discuss what specific methodological event likely produced them (contamination, temperature drift).',
    criterionImpact: 'Keeps Data Analysis at 5/6 and adds a mark to Evaluation.',
  },
  {
    symptom: 'The biological mechanism in my Conclusion is thin.',
    rootCause:
      'Examiners expect IB-level biology in the Conclusion: enzyme active-site geometry, water potential, allele frequencies, etc. A surface-level explanation caps Conclusion around 3–4/6.',
    fix: 'Add one diagram-free paragraph grounded in IB syllabus content (e.g. "enzyme denaturation above the optimum reflects loss of tertiary structure as hydrogen bonds break, reducing the number of functional active sites"). Cite 1–2 literature values for expected magnitude.',
    criterionImpact: 'Conclusion 3/6 → 5–6/6.',
  },
  {
    symptom: 'My RQ says "investigate" or "study" — it\'s not testable.',
    rootCause: 'Vague verbs stop examiners identifying the IV and DV. Research Design caps at 3/6.',
    fix: 'Rewrite as "How does [IV with units and range] affect [measurable DV with units] in [organism/system] under [constant conditions]?" Then justify the variable ranges and the organism choice.',
    criterionImpact: 'Research Design 3/6 → 5–6/6.',
  },
  {
    symptom: "My IA looks identical to my classmate's.",
    rootCause:
      "Shared lab access plus last-minute timing often produces parallel IAs. IB's cross-school plagiarism detection will flag this.",
    fix: 'Differentiate at the variable or organism level (different enzyme, different plant species, different buffer system). Rewrite the Introduction fully in your own biological framing. Use your own raw data only. If similarity is already suspected, talk to your IB coordinator immediately.',
    criterionImpact: 'Avoids academic honesty penalty (which supersedes the rubric).',
  },
  {
    symptom: 'I submitted a database IA and I am unsure it will be accepted.',
    rootCause:
      'Database IAs are fully accepted for the 2025 syllabus (e.g. NCBI, HHMI BioInteractive, WHO GHO, NOAA), but the expectations on biological rationale and data processing are higher.',
    fix: 'Ensure you (1) explicitly state the database, access date, and filtering criteria; (2) process the data (do not just download a pre-made graph); (3) run at least one statistical test; (4) build the biological rationale as strongly as for a wet-lab IA.',
    criterionImpact: 'Keeps Research Design and Data Analysis in the 5–6/6 range.',
  },
]

const troubleshootingFAQs = [
  {
    question: 'How late is too late to fix my IB Biology IA?',
    answer:
      'Most IAs can be substantially improved with 2 focused weeks of rewriting before the IB upload deadline. Structural fixes (RQ rewrite, reordering, Evaluation rewrite) are viable up to 72 hours before submission. New data collection needs a minimum of 1 week. If you are inside 7 days and short on data, reframe the research question rather than re-running experiments.',
  },
  {
    question: 'Can I redo my IA from scratch?',
    answer:
      'Technically yes, but examiners do not favour a thin, hurried second IA over a structurally improved first IA. In 9/10 cases we see at Cerebrum, the original IA had enough data — the marks were lost in framing, analysis, and Evaluation. Fix those before you consider redoing.',
  },
  {
    question: 'Should I tell my IB coordinator if my IA is in trouble?',
    answer:
      'Yes, early. IB coordinators can grant internal extensions, help with ethics re-approval, or escalate genuinely unforeseen circumstances. Do not wait until the night before school submission.',
  },
  {
    question: 'Is it worth paying for emergency IA help?',
    answer:
      'External coaching is valid provided the intellectual content remains yours. Tutors are allowed to review, give feedback, and suggest structural improvements. Tutors are NOT allowed to write any part of your IA or analyse your raw data for you. Keep records of feedback emails to demonstrate academic honesty.',
  },
]

export default function IABiologyIATroubleshootingPage() {
  return (
    <>
      <FAQSchema questions={troubleshootingFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'IA Guide', href: '/ib-biology-ia-guide' },
          { label: 'Troubleshooting', isCurrentPage: true },
        ]}
        showSchemaOnly
      />

      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-slate-900 via-red-900 to-slate-800 py-16 text-white sm:py-20">
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
                  Troubleshooting
                </li>
              </ol>
            </nav>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-2 text-sm font-medium text-red-300">
              <AlertTriangle className="h-4 w-4" />
              Last-Mile IA Rescue — 2025 Syllabus
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology IA Troubleshooting
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              Your IA does not need to be perfect — it needs to score against 4 specific criteria.
              This guide fixes 12 common IA problems without re-running the whole investigation.
            </p>
          </div>
        </section>

        {/* Problems */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="space-y-6">
              {problems.map((p, i) => (
                <article
                  key={p.symptom}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-700">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
                        Problem {i + 1}
                      </p>
                      <h2 className="text-xl font-bold text-gray-900">{p.symptom}</h2>
                    </div>
                  </div>

                  <div className="mb-4 rounded-lg bg-gray-50 p-4">
                    <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
                      Root cause
                    </p>
                    <p className="text-gray-700">{p.rootCause}</p>
                  </div>

                  <div className="mb-4 rounded-lg bg-green-50 p-4">
                    <p className="mb-1 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-green-700">
                      <Wrench className="h-4 w-4" />
                      Fix
                    </p>
                    <p className="text-green-900">{p.fix}</p>
                  </div>

                  <p className="text-sm italic text-gray-600">
                    <strong>Criterion impact: </strong>
                    {p.criterionImpact}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              IA Troubleshooting — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {troubleshootingFAQs.map((faq) => (
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
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related</h2>
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
                href="/ib-biology-ia-examples"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Exemplars
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

        <section className="bg-gradient-to-r from-red-600 via-orange-600 to-red-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              IA Deadline in Less Than a Week?
            </h2>
            <p className="mb-8 text-lg text-red-50">
              Emergency IA Rescue: a Cerebrum IB Biology tutor will review your draft and give you
              prioritised, criterion-referenced edits within 24 hours.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('URGENT: I need IA rescue help for IB Biology. Deadline is approaching.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-red-700 shadow-lg hover:bg-red-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book IA Rescue
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
