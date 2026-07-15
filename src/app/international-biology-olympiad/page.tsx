import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Trophy, Globe2, Users, Medal, ArrowRight } from 'lucide-react'
import { FAQSchema, FAQDisplay } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { DefinedTermSchema } from '@/components/seo/DefinedTermSchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${BASE_URL}/international-biology-olympiad`
const OFFICIAL_URL = 'https://www.ibo-info.org/'
const WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki/International_Biology_Olympiad'

export const metadata: Metadata = {
  title: 'International Biology Olympiad (IBO) — What It Is & How to Prepare | Cerebrum',
  description:
    'A clear guide to the International Biology Olympiad (IBO): first held in 1990, 80+ participating countries, teams of four students, theoretical and practical exams, and gold/silver/bronze medals. Plus how to prepare for your national round and the IBO.',
  keywords: [
    'International Biology Olympiad',
    'IBO',
    'what is the IBO',
    'IBO preparation',
    'IBO medals',
    'IBO team selection',
    'biology olympiad',
  ].join(', '),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'International Biology Olympiad (IBO) — What It Is & How to Prepare',
    description:
      'First held in 1990 · 80+ countries · teams of four · theoretical + practical exams · gold/silver/bronze medals.',
    type: 'article',
    locale: 'en_IN',
    url: PAGE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Biology Olympiad (IBO) — a clear guide',
    description: 'What the IBO is, how teams are selected, and how to prepare.',
  },
}

const FACTS = [
  { icon: Trophy, label: 'First held', value: '1990, in Czechoslovakia' },
  { icon: Globe2, label: 'Participating countries', value: '80+ across five continents' },
  { icon: Users, label: 'Team size', value: 'Four students per country' },
  { icon: Medal, label: 'Medals', value: 'Top 10% gold · next 20% silver · next 30% bronze' },
]

const FAQS = [
  {
    question: 'What is the International Biology Olympiad (IBO)?',
    answer:
      'The International Biology Olympiad (IBO) is the world championship of biology for secondary-school students. First held in 1990, it now brings together teams from more than 80 countries across five continents. Each country sends four students — the top performers from its national biology olympiad — to sit theoretical and practical (laboratory) examinations.',
  },
  {
    question: 'How are IBO team members selected?',
    answer:
      'Each participating country runs its own national biology olympiad. The four highest-performing students from that national competition form the country’s team for the IBO. In India this pathway runs through the NSEB and INBO/INO rounds.',
  },
  {
    question: 'How are IBO medals awarded?',
    answer:
      'Medals are awarded on performance across the theoretical and practical papers. In almost every edition, the top 10% of participants receive gold, the next 20% receive silver, and the next 30% receive bronze.',
  },
  {
    question: 'How do I prepare for the IBO?',
    answer:
      'Preparation starts with mastering your national-round syllabus (NSEB/INBO in India, USABO in the USA, BBO in the UK, and so on), then building the deeper conceptual and practical skills the IBO tests. Cerebrum Biology Academy coaches students through both stages — the national qualifier and the international round.',
  },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Entity: this page is ABOUT the IBO, linked to authoritative sources. */}
      <Script
        id="ibo-entity-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'International Biology Olympiad (IBO) — What It Is & How to Prepare',
            description: metadata.description,
            url: PAGE_URL,
            about: {
              '@type': 'Event',
              name: 'International Biology Olympiad',
              alternateName: 'IBO',
              description:
                'Annual world championship of biology for secondary-school students, first held in 1990, with teams of four from 80+ countries.',
              url: OFFICIAL_URL,
              sameAs: [OFFICIAL_URL, WIKIPEDIA_URL],
              eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
              organizer: {
                '@type': 'Organization',
                name: 'International Biology Olympiad',
                url: OFFICIAL_URL,
              },
            },
            publisher: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: BASE_URL,
            },
          }),
        }}
      />
      <DefinedTermSchema
        term="International Biology Olympiad (IBO)"
        definition="The world championship of biology for secondary-school students, first held in 1990, in which more than 80 countries each send four students to sit theoretical and practical examinations."
        category="Science competition"
        url={PAGE_URL}
        source={WIKIPEDIA_URL}
        relatedTerms={['Biology Olympiad', 'NSEB', 'INBO', 'USABO', 'British Biology Olympiad']}
      />
      <FAQSchema questions={FAQS} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        showHome={false}
        showSchemaOnly
        items={[
          { label: 'Home', href: '/' },
          { label: 'Biology Olympiads', href: '/biology-olympiads' },
          {
            label: 'International Biology Olympiad',
            href: '/international-biology-olympiad',
            isCurrentPage: true,
          },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-700 via-teal-600 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            <Trophy className="h-4 w-4" />
            The world championship of biology
          </div>
          <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            The International Biology Olympiad (IBO)
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-emerald-50">
            A clear guide to what the IBO is, how national teams are selected, and how to prepare —
            from your national qualifier through to the international round.
          </p>
        </div>
      </section>

      {/* Facts */}
      <section className="mx-auto max-w-4xl px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {FACTS.map((f) => (
            <div key={f.label} className="rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 text-teal-700">
                <f.icon className="h-5 w-5" />
                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                  {f.label}
                </p>
              </div>
              <p className="mt-2 text-lg font-semibold text-gray-900">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What it is */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">What is the IBO?</h2>
          <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
            <p>
              The International Biology Olympiad is the most prestigious biology competition in the
              world for secondary-school students. First held in Czechoslovakia in 1990, it has
              grown to more than 80 participating countries across five continents.
            </p>
            <p>
              Each country is represented by four students — the top performers from its own
              national biology olympiad. At the IBO, competitors sit both theoretical papers and
              hands-on practical (laboratory) examinations that test experimental skill as well as
              knowledge. Medals follow a fixed distribution: the top 10% of participants earn gold,
              the next 20% silver, and the next 30% bronze.
            </p>
          </div>

          <h2 className="mt-10 text-2xl font-bold text-gray-900 sm:text-3xl">
            How teams are selected
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            The route to the IBO runs through each country’s national olympiad. In India that means
            the NSEB followed by the INBO/INO stages; in the USA it is the USABO; in the UK, the
            British Biology Olympiad (BBO). The strongest students from those national rounds form
            the four-member team that represents the country internationally.
          </p>
        </div>
      </section>

      {/* How Cerebrum helps */}
      <section className="mx-auto max-w-4xl px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Preparing for the IBO with Cerebrum
        </h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Olympiad success is built in two stages — qualifying through your national round, then
          performing at the international level. We coach both. Explore focused preparation:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              href: '/ibo-preparation',
              label: 'IBO preparation',
              sub: 'International-round coaching',
            },
            {
              href: '/biology-olympiads',
              label: 'All biology olympiads',
              sub: 'Every country & national round',
            },
            {
              href: '/best-ibo-coaching-india',
              label: 'IBO coaching in India',
              sub: 'NSEB → INBO → IBO pathway',
            },
            { href: '/nseb-coaching', label: 'NSEB coaching', sub: "India's national qualifier" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="flex items-center justify-between rounded-xl border border-gray-200 p-5 transition-colors hover:border-teal-500 hover:bg-teal-50"
            >
              <span>
                <span className="block font-semibold text-gray-900">{c.label}</span>
                <span className="block text-sm text-gray-600">{c.sub}</span>
              </span>
              <ArrowRight className="h-5 w-5 text-teal-600" />
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <FAQDisplay questions={FAQS} title="International Biology Olympiad — FAQs" />
        </div>
      </section>

      {/* Sources */}
      <section className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-gray-500">
          Sources:{' '}
          <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="underline">
            official IBO website
          </a>{' '}
          and{' '}
          <a href={WIKIPEDIA_URL} target="_blank" rel="noopener noreferrer" className="underline">
            Wikipedia
          </a>
          .
        </p>
      </section>
    </main>
  )
}
