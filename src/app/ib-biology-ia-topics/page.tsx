import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { iaTopics, iaThemes, type IATheme } from '@/data/ib-biology/ia-topics'
import { ArrowRight, MessageCircle } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-ia-topics'

export const metadata: Metadata = {
  title: 'IB Biology IA Topics 2025 | 50+ Research Questions by Theme | Cerebrum',
  description:
    'Browse 50+ IB Biology Internal Assessment topic ideas for the 2025 syllabus, grouped by the 4 new themes. Each topic includes variables, controls, difficulty, and suggested statistical test.',
  keywords: [
    'IB Biology IA topics',
    'IB Biology IA ideas',
    'IB Biology IA research questions',
    'IB Biology IA 2025',
    'IB Biology IA topics by theme',
    'best IB Biology IA topics',
    'IB Biology IA topic list',
    'IB Biology IA enzymes',
    'IB Biology IA photosynthesis',
    'IB Biology IA ecology',
  ],
  openGraph: {
    title: 'IB Biology IA Topics 2025 | 50+ Research Questions by Theme',
    description:
      'Curated IB Biology IA topic ideas grouped by the 4 new 2025 themes. Variables, controls, difficulty, statistical test.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology IA Topics 2025 — 50+ Research Questions',
    description: 'IA topic ideas grouped by 2025 syllabus themes. Full variable setup included.',
  },
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const topicsFAQs = [
  {
    question: 'How do I choose a good IB Biology IA topic?',
    answer:
      'Good IA topics are narrow enough that you can collect 5 levels × 5 replicates of data, grounded in IB-level biology (you can explain a mechanism), and measurable with the equipment you actually have. Avoid topics like "effect of pollution on plants" — prefer something like "effect of NaCl concentration on Allium cepa plasmolysis".',
  },
  {
    question: 'Can an IA topic be a database study or simulation?',
    answer:
      'Yes. The 2025 IB Biology IA accepts database investigations (e.g. NCBI GenBank, HHMI BioInteractive, WHO Global Health Observatory) and simulations (e.g. PhET) as long as you process data yourself and draw biological conclusions. This is often the best route if your school has limited lab facilities.',
  },
  {
    question: 'How many levels of the independent variable do I need?',
    answer:
      'Examiners typically expect at least 5 different levels of a quantitative independent variable, each repeated at least 5 times (the "5 × 5 minimum"). For categorical independent variables, have at least 2 groups with ≥10 replicates each. Fewer levels make it very hard to score full marks for Data Analysis and Conclusion.',
  },
  {
    question: 'Does the topic need to match one of the four IB themes?',
    answer:
      'Your IA does not need to be explicitly labelled under a theme, but the topic should be anchored in IB Biology content. Grouping by theme (Unity & Diversity; Form & Function; Interaction & Interdependence; Continuity & Change) helps you map your chosen mechanism to the syllabus and write a stronger Conclusion.',
  },
  {
    question: 'Is it safe to pick an IA topic my friend used last year?',
    answer:
      'Pre-2025 topics often need to be adapted for the 2025 rubric. You can reuse a successful methodology but you should still make the research question your own, collect your own data, and structure your report around the 4-criterion 2025 rubric. IB has upgraded plagiarism detection, so never copy text or data.',
  },
]

const themeIntro: Record<IATheme, string> = {
  'Unity and Diversity':
    'Enzyme kinetics, cell-level processes, ecological diversity — topics here let you showcase mechanism-level biology on a predictable timeline.',
  'Form and Function':
    'Physiology, anatomy, leaf and respiratory adaptations. Best when you can measure a rate or count a density cleanly.',
  'Interaction and Interdependence':
    'Ecological interactions, photosynthesis and symbiosis — stronger topics when you can isolate one variable from the wider ecosystem.',
  'Continuity and Change':
    'Genetics, mutation, selection, evolution, climate data. Database IAs often sit here and can score highly if data processing is rigorous.',
}

const difficultyColor: Record<string, string> = {
  Accessible: 'bg-green-100 text-green-800',
  Moderate: 'bg-blue-100 text-blue-800',
  Challenging: 'bg-purple-100 text-purple-800',
}

export default function IABiologyIATopicsPage() {
  return (
    <>
      <FAQSchema questions={topicsFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'IA Guide', href: '/ib-biology-ia-guide' },
          { label: 'IA Topics', isCurrentPage: true },
        ]}
        showSchemaOnly
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
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
                  IA Topics
                </li>
              </ol>
            </nav>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology IA Topics — 2025 Syllabus
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              Curated research-question templates grouped by the four 2025 themes. Each includes
              variables, controls, recommended statistical test, and difficulty — so you can pick a
              topic you can actually deliver.
            </p>
          </div>
        </section>

        {/* Topics by theme */}
        {iaThemes.map((theme) => {
          const themeTopics = iaTopics.filter((t) => t.theme === theme)
          if (themeTopics.length === 0) return null
          return (
            <section key={theme} className="border-b border-gray-200 py-16 sm:py-20">
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-8">
                  <h2 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">{theme}</h2>
                  <p className="max-w-3xl text-gray-700">{themeIntro[theme]}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {themeTopics.map((topic) => (
                    <article
                      key={topic.title}
                      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-gray-900">{topic.title}</h3>
                        <span
                          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${difficultyColor[topic.difficulty]}`}
                        >
                          {topic.difficulty}
                        </span>
                      </div>
                      <p className="mb-4 italic text-gray-700">
                        <strong>RQ template: </strong>
                        {topic.researchQuestionTemplate}
                      </p>

                      <dl className="space-y-2 text-sm text-gray-700">
                        <div>
                          <dt className="font-semibold text-gray-900">Independent variable</dt>
                          <dd>{topic.independentVariable}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-gray-900">Dependent variable</dt>
                          <dd>{topic.dependentVariable}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-gray-900">Control variables</dt>
                          <dd>{topic.controlVariables.join(' · ')}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-gray-900">
                            Suggested statistical test
                          </dt>
                          <dd>{topic.suggestedStatTest}</dd>
                        </div>
                      </dl>

                      {topic.notes && (
                        <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-900">
                          <strong>Why it works: </strong>
                          {topic.notes}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        {/* FAQs */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              IA Topics — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {topicsFAQs.map((faq) => (
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

        {/* Cross-links */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Next Steps</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/ib-biology-ia-rubric-2025"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                IA Rubric Breakdown
              </Link>
              <Link
                href="/ib-biology-ia-examples"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                IA Exemplars
              </Link>
              <Link
                href="/ib-biology-ia-troubleshooting"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Troubleshooting
              </Link>
              <Link
                href="/boards/ib"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                IB Biology Coaching
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Stuck Choosing an IA Topic?</h2>
            <p className="mb-8 text-lg text-green-100">
              In a 30-minute consultation we'll check your research question, variables, and
              feasibility against the 2025 rubric — free of charge.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I need help choosing my IB Biology IA topic.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book Free Topic Review
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
