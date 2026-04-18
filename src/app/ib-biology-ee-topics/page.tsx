import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { eeTopics } from '@/data/ib-biology/ee-topics'
import { iaThemes } from '@/data/ib-biology/ia-topics'
import { MessageCircle } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-ee-topics'

export const metadata: Metadata = {
  title: 'IB Biology Extended Essay Topics | Research Question Ideas | Cerebrum',
  description:
    'Curated IB Biology Extended Essay topic ideas with full research questions, scope, and feasibility notes — grouped by the 4 themes of the 2025 syllabus.',
  keywords: [
    'IB Biology EE topics',
    'IB Biology Extended Essay topics',
    'IB Biology EE research questions',
    'IB Biology EE ideas',
    'best IB Biology EE topics',
    'IB Biology EE examples',
    'IB Biology EE subject areas',
    'IB Biology EE 2025',
  ],
  openGraph: {
    title: 'IB Biology Extended Essay Topics',
    description: 'Researchable EE topics with scope and feasibility by theme.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
}

const topicsFAQs = [
  {
    question: 'How do I choose a Biology EE topic?',
    answer:
      'Good EE topics are: specific enough to answer in 4,000 words; accessible with your school equipment or public datasets; intellectually interesting enough to sustain 40 hours of independent work; and narrow enough that you can defend the RQ against "why that variable range?"',
  },
  {
    question: 'Can I change my EE topic halfway through?',
    answer:
      'Only if your supervisor agrees. A mid-project switch resets the timeline and usually caps grade at B–C due to reduced depth. Switching is usually only advisable if data collection has definitively failed and a variant topic can reuse the same methodology.',
  },
  {
    question: 'Should I pick an EE topic that links to my intended university degree?',
    answer:
      'It is a sensible strategic choice for university applications but not a scoring requirement. A grade-A EE on any biology topic is more valuable than a grade-B EE on a "strategically" chosen topic. Pick for feasibility and interest first.',
  },
]

const practicalityColor: Record<string, string> = {
  High: 'bg-green-100 text-green-800',
  Medium: 'bg-blue-100 text-blue-800',
  Low: 'bg-purple-100 text-purple-800',
}

export default function EETopicsPage() {
  return (
    <>
      <FAQSchema questions={topicsFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'Extended Essay', href: '/ib-biology-extended-essay' },
          { label: 'EE Topics', isCurrentPage: true },
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
                  <Link href="/ib-biology-extended-essay" className="hover:text-white">
                    Extended Essay
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-medium text-white">
                  Topics
                </li>
              </ol>
            </nav>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology Extended Essay Topics
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              Twelve researchable EE topics grouped by the 4 themes of the 2025 syllabus. Each entry
              gives a specific research question, experimental scope, and the practical challenges
              that decide whether you can actually deliver the project.
            </p>
          </div>
        </section>

        {iaThemes.map((theme) => {
          const themeTopics = eeTopics.filter((t) => t.theme === theme)
          if (themeTopics.length === 0) return null
          return (
            <section key={theme} className="border-b border-gray-200 py-16 sm:py-20">
              <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">{theme}</h2>
                <div className="space-y-6">
                  {themeTopics.map((topic) => (
                    <article
                      key={topic.title}
                      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                    >
                      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="text-xl font-bold text-gray-900">{topic.title}</h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${practicalityColor[topic.practicality]}`}
                        >
                          Practicality: {topic.practicality}
                        </span>
                      </div>
                      <p className="mb-4 italic text-gray-700">
                        <strong>RQ: </strong>
                        {topic.researchQuestion}
                      </p>
                      <dl className="mb-4 space-y-2 text-sm text-gray-700">
                        <div>
                          <dt className="font-semibold text-gray-900">Scope</dt>
                          <dd>{topic.scope}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-gray-900">Key challenges</dt>
                          <dd>
                            <ul className="list-inside list-disc">
                              {topic.keyChallenges.map((c) => (
                                <li key={c}>{c}</li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              EE Topics — Frequently Asked Questions
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

        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Need Help Validating Your Topic?
            </h2>
            <p className="mb-8 text-lg text-green-100">
              A free 30-minute topic-validation call — we'll stress-test your RQ against the 5 EE
              criteria.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want help choosing my IB Biology EE topic.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book EE Topic Review
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
