import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { tutors, tutorSlugs, tierPricing, type TutorTier } from '@/data/ib-biology/tutors'
import { ArrowRight, MessageCircle, Award, CheckCircle2 } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-tutors'

export const metadata: Metadata = {
  title: 'IB Biology Tutors | Examiners, Teachers & Academic Coaches | Cerebrum',
  description:
    'Meet our IB Biology tutor team — 8 named tutors across 3 tiers (IB Examiner, Qualified Teacher, Academic Tutor). Filter by specialty, timezone, and price. Free demo with every tutor.',
  keywords: [
    'IB Biology tutors',
    'IB Biology examiner tutor',
    'IB Biology tutor list',
    'IB Biology tutor profile',
    'best IB Biology tutor',
    'IB Biology tutor online',
    'IB Biology HL tutor',
    'IB Biology tutor directory',
  ],
  openGraph: {
    title: 'IB Biology Tutors — 3-Tier Directory',
    description: 'Examiners ($130-180), Qualified Teachers ($70-100), Academic Tutors ($40-60).',
    type: 'website',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
}

const directoryFAQs = [
  {
    question: 'How do I choose the right IB Biology tutor?',
    answer:
      'Start with your goal. Targeting a 7 or stuck on IA moderation issues → an Examiner-tier tutor. Need structured topic teaching or mock exam marking → a Qualified Teacher. Want revision support or weekly MCQ practice → an Academic Tutor. Every tutor offers a free 30-minute demo so you can trial fit before committing.',
  },
  {
    question: 'Can I switch tutors if the match is not right?',
    answer:
      'Yes. After your first paid session we guarantee a free tutor re-match if you are not happy. We never charge for a demo session that does not result in a booking.',
  },
  {
    question: 'Do your tutors teach in timezones outside India?',
    answer:
      'Yes. Our tutors are split across IST, GST, BST, CET, EST, and PST. Every tutor profile lists their available timezones so you can match to your school hours.',
  },
  {
    question: 'What is the difference between the three tutor tiers?',
    answer:
      'Examiner tier: current or former IB Biology examiners ($130-180/hr). Qualified Teacher tier: IB-certified classroom teachers with 5+ years experience ($70-100/hr). Academic Tutor tier: recent IB graduates and BSc/MSc holders who scored a 7 ($40-60/hr). All tiers use the same 2025 syllabus and rubric; the difference is depth of examiner-specific feedback.',
  },
]

function ItemListSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cerebrum Biology Academy — IB Biology Tutors',
    itemListElement: Object.values(tutors).map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        name: t.name,
        jobTitle: t.tier,
        description: t.bio,
        url: `https://cerebrumbiologyacademy.com/ib-biology-tutors/${t.slug}`,
        worksFor: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
        },
      },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

const tierColor: Record<TutorTier, string> = {
  Examiner: 'bg-purple-100 text-purple-800',
  'Qualified Teacher': 'bg-blue-100 text-blue-800',
  'Academic Tutor': 'bg-green-100 text-green-800',
}

export default function TutorsDirectoryPage() {
  const tutorList = Object.values(tutors)
  const tiers: TutorTier[] = ['Examiner', 'Qualified Teacher', 'Academic Tutor']

  return (
    <>
      <ItemListSchema />
      <FAQSchema questions={directoryFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'Tutors', isCurrentPage: true },
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
                  Tutors
                </li>
              </ol>
            </nav>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology Tutors — Examiners, Teachers, Coaches
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              Every tutor below has been vetted and teaches from the 2025 IB Biology syllabus. Pick
              a tier that matches your goal and budget. Free demo session with every tutor.
            </p>
          </div>
        </section>

        {/* Tier pricing */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              Three Tiers — Pick Your Fit
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {tiers.map((tier) => {
                const meta = tierPricing[tier]
                return (
                  <div
                    key={tier}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <span
                      className={`mb-4 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${tierColor[tier]}`}
                    >
                      {tier}
                    </span>
                    <div className="mb-2 text-2xl font-bold text-gray-900">{meta.range}</div>
                    <p className="mb-4 text-gray-700">{meta.description}</p>
                    <p className="text-sm italic text-gray-600">
                      <strong>Who for: </strong>
                      {meta.whoFor}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Tutor list grouped by tier */}
        {tiers.map((tier) => {
          const filtered = tutorList.filter((t) => t.tier === tier)
          if (filtered.length === 0) return null
          return (
            <section key={tier} className="border-t border-gray-200 py-16 sm:py-20">
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-8 flex items-baseline gap-3">
                  <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{tier}s</h2>
                  <span className="text-sm text-gray-500">({filtered.length})</span>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {filtered.map((t) => (
                    <article
                      key={t.slug}
                      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                    >
                      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-xl font-bold text-gray-900">{t.name}</h3>
                        <span className="text-sm font-semibold text-green-700">
                          ${t.hourlyRateUSD}/hr
                        </span>
                      </div>
                      <div className="mb-3 flex flex-wrap gap-2 text-xs">
                        {t.specialties.slice(0, 2).map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-gray-100 px-3 py-1 text-gray-700"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="mb-4 text-sm text-gray-700">{t.bio}</p>
                      <dl className="mb-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>
                          <dt className="font-semibold text-gray-500">Timezones</dt>
                          <dd>{t.timezones.join(', ')}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-gray-500">Languages</dt>
                          <dd>{t.languages.join(', ')}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-gray-500">Students</dt>
                          <dd>{t.studentsSupported}+</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-gray-500">Experience</dt>
                          <dd>{t.yearsExperience} yrs</dd>
                        </div>
                      </dl>
                      <Link
                        href={`/ib-biology-tutors/${t.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-800"
                      >
                        Full profile
                        <ArrowRight className="h-4 w-4" />
                      </Link>
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
              IB Biology Tutors — FAQ
            </h2>
            <div className="space-y-4">
              {directoryFAQs.map((faq) => (
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
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Not Sure Which Tutor to Pick?</h2>
            <p className="mb-8 text-lg text-green-100">
              Tell us your target grade, school calendar, and topics you need help with — we\'ll
              match you with the right tutor in under 2 minutes.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want to be matched with an IB Biology tutor.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Get Matched Now
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
