import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { getComparison, comparisonSlugs, allCrosslinksFor } from '@/data/ib-biology/comparisons'
import { MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react'

interface PageProps {
  params: Promise<{ curriculum: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return comparisonSlugs().map((curriculum) => ({ curriculum }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { curriculum } = await params
  const config = getComparison(curriculum)
  if (!config) return {}

  const url = `https://cerebrumbiologyacademy.com/ib-biology-vs/${config.slug}`
  return {
    title: `${config.headline} | Cerebrum`,
    description: config.intro.slice(0, 160),
    keywords: [
      `IB Biology vs ${config.shortName}`,
      `${config.shortName} vs IB Biology`,
      `IB Biology or ${config.shortName}`,
      `${config.name} vs IB`,
      `IB Biology compared to ${config.shortName}`,
      `difference between IB Biology and ${config.shortName}`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: config.headline,
      description: config.intro.slice(0, 160),
      url,
      type: 'article',
      siteName: 'Cerebrum Biology Academy',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.headline,
      description: config.intro.slice(0, 120),
    },
    robots: { index: true, follow: true },
  }
}

const recoColor: Record<'IB' | 'Other' | 'Either', string> = {
  IB: 'bg-green-100 text-green-800',
  Other: 'bg-blue-100 text-blue-800',
  Either: 'bg-gray-100 text-gray-800',
}

export default async function ComparisonPage({ params }: PageProps) {
  const { curriculum } = await params
  const config = getComparison(curriculum)
  if (!config) notFound()

  const url = `https://cerebrumbiologyacademy.com/ib-biology-vs/${config.slug}`
  const crosslinks = allCrosslinksFor(config)

  return (
    <>
      <FAQSchema questions={config.faqs} pageUrl={url} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: `vs ${config.shortName}`, isCurrentPage: true },
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
                <li aria-current="page" className="font-medium text-white">
                  vs {config.shortName}
                </li>
              </ol>
            </nav>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
              Region: {config.region}
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">{config.headline}</h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">{config.intro}</p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              IB Biology vs {config.name} — Side-by-Side
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Aspect</th>
                    <th className="px-4 py-3 font-semibold">IB Biology</th>
                    <th className="px-4 py-3 font-semibold">{config.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {config.rows.map((r) => (
                    <tr key={r.aspect} className="border-t border-gray-200 align-top">
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
                        {r.aspect}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{r.ib}</td>
                      <td className="px-4 py-3 text-gray-700">{r.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Decision framework */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              Which Should You Pick?
            </h2>
            <div className="space-y-3">
              {config.decisionFramework.map((row) => (
                <div
                  key={row.forWhom}
                  className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <p className="text-gray-800">
                    <CheckCircle2 className="mr-2 inline h-4 w-4 text-green-600" />
                    {row.forWhom}
                  </p>
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold ${recoColor[row.recommendation]}`}
                  >
                    {row.recommendation === 'IB'
                      ? 'IB Biology'
                      : row.recommendation === 'Other'
                        ? config.shortName
                        : 'Either works'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              IB Biology vs {config.shortName} — FAQ
            </h2>
            <div className="space-y-4">
              {config.faqs.map((faq) => (
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
              {crosslinks.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
                >
                  {c.title}
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {comparisonSlugs()
                .filter((s) => s !== config.slug)
                .map((s) => {
                  const other = getComparison(s)!
                  return (
                    <Link
                      key={s}
                      href={`/ib-biology-vs/${s}`}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
                    >
                      vs {other.shortName}
                    </Link>
                  )
                })}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Still Undecided?</h2>
            <p className="mb-8 text-lg text-green-100">
              In a 30-minute consultation we'll map your university goals to IB Biology or{' '}
              {config.shortName} — no obligation.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent(`Hi! I need help deciding between IB Biology and ${config.shortName}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book Consultation
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
