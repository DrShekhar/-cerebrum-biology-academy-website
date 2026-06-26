import Link from 'next/link'
import { Award, CheckCircle, X, ArrowRight, Star, MessageCircle } from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const PHONE = '+91 88264-44334'
const PHONE_TEL = 'tel:+918826444334'

export type CompetitorComparisonConfig = {
  slug: string
  competitorName: string
  headline: string
  ribbon: string
  subheadline: string
  intro: string
  table: {
    criterion: string
    cerebrum: string
    competitor: string
    cerebrumWins: boolean
  }[]
  whyChooseCerebrum: { title: string; description: string }[]
  whenCompetitorMightBeBetter?: string[]
  testimonials: { name: string; score: string; college: string; quote: string }[]
  faqs: { question: string; answer: string }[]
  whatsappMessage: string
  /** Short exam/section context shown in the comparison subhead and the
   *  "Why students switch" copy (e.g., "MCAT Bio/Biochem", "AP Biology").
   *  Defaults to the generic "biology". */
  subheadContext?: string
  /** Honest proof line (no fabricated numbers) shown under CTAs in place of
   *  India-NEET stats. e.g., "AIIMS-trained biology specialists; MCAT
   *  Bio/Biochem focus". */
  proofStat?: string
  /** One-line description used in the comparison and Course schema. */
  cerebrumDescription?: string
  /** A related footer link relevant to this page's audience. */
  relatedFooterLink?: { href: string; label: string }
  /** Topics for the Person schema knowsAbout array (entity authority). */
  personKnowsAbout?: string[]
  /** Course schema name + audience hints. */
  courseName?: string
}

export function CompetitorComparisonLanding({ config }: { config: CompetitorComparisonConfig }) {
  const canonicalUrl = `https://cerebrumbiologyacademy.com/${config.slug}`

  const subheadContext = config.subheadContext ?? 'biology'
  const proofStat =
    config.proofStat ?? 'AIIMS-trained biology specialists · small-batch, biology-only coaching'
  const cerebrumDescription =
    config.cerebrumDescription ??
    `Biology-only specialist coaching with AIIMS-trained faculty and small batches, focused on ${subheadContext}.`
  const relatedFooterLink = config.relatedFooterLink ?? {
    href: '/best-biology-tutor-global',
    label: 'Best Biology Tutor',
  }
  const courseName = config.courseName ?? `Cerebrum ${subheadContext} Coaching`

  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Cerebrum vs ${config.competitorName} — ${subheadContext} Comparison`,
    description: `Side-by-side comparison of Cerebrum Biology Academy and ${config.competitorName} for ${subheadContext}`,
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'EducationalOrganization',
          position: 1,
          name: 'Cerebrum Biology Academy',
          description: cerebrumDescription,
          url: 'https://cerebrumbiologyacademy.com',
        },
        {
          '@type': 'EducationalOrganization',
          position: 2,
          name: config.competitorName,
        },
      ],
    },
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    description: cerebrumDescription,
    url: canonicalUrl,
    provider: {
      '@type': 'EducationalOrganization',
      '@id': 'https://cerebrumbiologyacademy.com/#organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': 'https://cerebrumbiologyacademy.com/#organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
    founder: {
      '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
    },
    foundingDate: '2014',
    // review/aggregateRating removed 2026-06: self-serving schema-only review markup violates Google's review snippet policy.
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compare',
        item: 'https://cerebrumbiologyacademy.com/compare',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Cerebrum vs ${config.competitorName}`,
        item: canonicalUrl,
      },
    ],
  }

  const waLink = `https://wa.me/918826444334?text=${encodeURIComponent(config.whatsappMessage)}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <CerebrumPersonSchema knowsAbout={config.personKnowsAbout ?? []} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-br from-green-800 via-green-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              {config.ribbon}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{config.headline}</h1>
            <p className="text-2xl text-green-50 mb-3">{config.subheadline}</p>
            <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">{config.intro}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-green-400 transition"
              >
                <MessageCircle className="w-5 h-5" />
                Message Us on WhatsApp
              </Link>
              <a
                href="#comparison"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
              >
                See Comparison
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-green-100 mt-4">
              WhatsApp is free from the US — no international call needed. Reply in your time zone
              (ET/CT/PT).
            </p>
            <p className="text-xs text-green-200/80 mt-3">
              {proofStat} · Free consult, no obligation · Prefer to call?{' '}
              <a href={PHONE_TEL} className="font-medium text-green-100 hover:underline">
                {PHONE}
              </a>{' '}
              (India)
            </p>
          </div>
        </div>
      </section>

      <section id="comparison" className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              Side-by-Side Comparison
            </h2>
            <p className="text-lg text-slate-600 mb-10 text-center">
              Cerebrum Biology Academy vs {config.competitorName} — across the criteria that
              actually matter for {subheadContext}.
            </p>
            {/* Desktop / tablet: full table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left p-4 font-semibold text-slate-700">Criterion</th>
                    <th className="text-left p-4 font-semibold text-green-700">
                      Cerebrum Biology Academy
                    </th>
                    <th className="text-left p-4 font-semibold text-slate-700">
                      {config.competitorName}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {config.table.map((row) => (
                    <tr key={row.criterion} className="border-b border-slate-200">
                      <td className="p-4 font-medium text-slate-800">{row.criterion}</td>
                      <td className="p-4 text-slate-700">
                        <div className="flex items-start gap-2">
                          {row.cerebrumWins ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : null}
                          <span>{row.cerebrum}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">
                        <div className="flex items-start gap-2">
                          {!row.cerebrumWins ? (
                            <CheckCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span>{row.competitor}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile (<768px): stacked card list — table columns compress unreadably at 375px */}
            <div className="md:hidden space-y-4">
              {config.table.map((row) => (
                <div
                  key={row.criterion}
                  className="bg-white border border-slate-200 rounded-xl p-4"
                >
                  <div className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">
                    {row.criterion}
                  </div>
                  <div className="space-y-3">
                    <div
                      className={`rounded-lg p-3 border ${row.cerebrumWins ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-green-700 uppercase">
                        {row.cerebrumWins ? (
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        ) : null}
                        Cerebrum
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed">{row.cerebrum}</p>
                    </div>
                    <div
                      className={`rounded-lg p-3 border ${!row.cerebrumWins ? 'bg-slate-100 border-slate-300' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-slate-600 uppercase">
                        {!row.cerebrumWins ? (
                          <CheckCircle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                        {config.competitorName}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{row.competitor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 bg-gradient-to-r from-green-700 to-blue-700 text-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  Like what you see? Let&apos;s talk.
                </h3>
                <p className="text-green-50">
                  Experience Cerebrum&apos;s small-batch biology coaching before you decide.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message Us on WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Students Switch to Cerebrum (for Biology)
            </h2>
            <p className="text-lg text-slate-600">
              The structural reasons a biology-only AIIMS-trained (India&apos;s top medical
              institute) specialist outperforms a generalist provider for {subheadContext}.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {config.whyChooseCerebrum.map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                </div>
                <p className="text-slate-600 ml-9">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {config.whenCompetitorMightBeBetter && config.whenCompetitorMightBeBetter.length > 0 ? (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                When {config.competitorName} Might Be Better
              </h2>
              <p className="text-slate-600 mb-6">
                Honest assessment — there are scenarios where {config.competitorName} or pairing
                them with Cerebrum makes sense:
              </p>
              <ul className="space-y-3">
                {config.whenCompetitorMightBeBetter.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <span className="text-slate-400 mt-1">•</span>
                    <span className="text-slate-700">{reason}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-500 mt-6 italic">
                Common pattern: students keep their main coaching at {config.competitorName} for
                Physics/Chemistry and add Cerebrum specifically for Biology — pairing the two rather
                than choosing.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Students Who Switched
            </h2>
            <p className="text-lg text-slate-600">
              Verified results from students who moved from {config.competitorName} (or paired it
              with Cerebrum) for Biology.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {config.testimonials.map((t) => (
              <div key={t.name} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-green-700">
                    {t.score} · {t.college}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {config.faqs.map((faq) => (
                <details key={faq.question} className="bg-slate-50 rounded-lg group">
                  <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-lg">
                    {faq.question}
                    <span className="text-slate-500 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="px-6 pb-4 text-slate-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Talk to a Biology Specialist</h2>
          <p className="text-xl text-slate-300 mb-2 max-w-2xl mx-auto">
            No obligation, no commitment — experience biology-only specialisation for yourself.
          </p>
          <p className="text-sm text-slate-400 mb-8">{proofStat}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-green-400 transition"
            >
              <MessageCircle className="w-5 h-5" />
              Message Us on WhatsApp
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            WhatsApp is free from the US — no international call needed. Prefer to call?{' '}
            <a href={PHONE_TEL} className="font-medium text-slate-200 hover:underline">
              {PHONE}
            </a>{' '}
            (India)
          </p>
          <p className="text-sm text-slate-400 mt-6">
            See also:{' '}
            <Link href={relatedFooterLink.href} className="underline">
              {relatedFooterLink.label}
            </Link>
          </p>
        </div>
      </section>

      {/* Spacer for mobile sticky CTA bar */}
      <div className="h-20 md:hidden" aria-hidden="true" />

      {/* Sticky mobile CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 shadow-lg p-3">
        <Link
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          <MessageCircle className="w-4 h-4" />
          Message Us on WhatsApp (free from the US)
        </Link>
      </div>
    </div>
  )
}
