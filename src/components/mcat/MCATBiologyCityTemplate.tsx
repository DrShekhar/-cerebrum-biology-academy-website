import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'
import type { MCATMetroConfig } from '@/data/mcat/metros'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

function buildSchemas(metro: MCATMetroConfig) {
  const pageUrl = `${SITE_URL}/mcat-biology-tutor-${metro.slug}`

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `MCAT Biology Tutor for ${metro.city} Students`,
    description: `MCAT Bio/Biochem section tutoring for ${metro.city} pre-meds — ${metro.universities.map((u) => u.name).join(', ')}. Biology specialists, Campbell + Lehninger, ${metro.timezoneShort} evening slots.`,
    url: pageUrl,
    inLanguage: 'en-US',
    availableLanguage: ['English'],
    educationalLevel: 'Pre-Medical',
    educationalCredentialAwarded: 'MCAT Bio/Biochem Section Preparation',
    provider: {
      '@type': 'EducationalOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Cerebrum Biology Academy',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${metro.city} Metro (${metro.stateOrRegion})`,
      address: {
        '@type': 'PostalAddress',
        addressRegion: metro.stateCode,
        addressCountry: 'US',
      },
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT2H',
      location: { '@type': 'VirtualLocation', url: pageUrl },
      offers: [
        { '@type': 'Offer', name: 'MCAT Bio/Biochem Self-Paced', price: '499', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: pageUrl },
        { '@type': 'Offer', name: 'MCAT Bio/Biochem Small-Batch (4–6 students)', price: '999', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: pageUrl },
        { '@type': 'Offer', name: 'MCAT Bio/Biochem 1:1 Senior Faculty', price: '1499', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: pageUrl },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: metro.faqs.map((f) => ({
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
      { '@type': 'ListItem', position: 2, name: 'MCAT Biology Preparation', item: `${SITE_URL}/mcat-biology-preparation` },
      { '@type': 'ListItem', position: 3, name: metro.city, item: pageUrl },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `MCAT Biology Tutor for ${metro.city} Students`,
    url: pageUrl,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="title"]', '[data-speakable="summary"]'],
    },
  }

  return { courseSchema, faqSchema, breadcrumbSchema, speakableSchema }
}

export default function MCATBiologyCityTemplate({ metro }: { metro: MCATMetroConfig }) {
  const { courseSchema, faqSchema, breadcrumbSchema, speakableSchema } = buildSchemas(metro)

  const wa =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      `Hi — I'm a ${metro.city} pre-med (or parent) preparing for the MCAT. I'd like Bio/Biochem programme details, ${metro.timezoneShort} slot availability, and pricing. Please share.`
    )

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/mcat-biology-preparation" className="hover:text-white">MCAT Biology Preparation</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{metro.city}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            MCAT Biology Tutor for {metro.city} Students
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl" data-speakable="summary">
            {metro.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={wa}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +91 88264-44334
            </a>
            <Link
              href="/mcat-biology-preparation"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold"
            >
              MCAT Biology Overview
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{metro.whySection.heading}</h2>
          {metro.whySection.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Pre-med feeders we coach in the {metro.city} metro
          </h2>
          <ul>
            {metro.universities.map((u) => (
              <li key={u.name}>
                <strong>{u.name}</strong> — {u.programmes}.
              </li>
            ))}
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            {metro.timezone} fit for {metro.city} students
          </h2>
          <p>{metro.timezoneSection}</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            {metro.demographicSection.heading}
          </h2>
          {metro.demographicSection.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            How Cerebrum coaches MCAT Bio/Biochem from {metro.city}
          </h2>
          <p>
            <strong>100% online live.</strong> Zoom-based sessions, screen-shared Campbell Biology
            and Lehninger excerpts, AAMC official passage walkthroughs, and a WhatsApp channel for
            between-session doubts. Recording library for asynchronous review.
          </p>
          <p>
            <strong>Weekly small-batch sessions</strong> (4–6 students max, grouped by target band),
            2 hours each, plus monthly Bio/Biochem section mocks.{' '}
            <strong>Ad-hoc 1:1 sessions</strong> at $135/hour for gap-fill — most {metro.city} students
            book 6–10 of these in the final 6 weeks.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            MCAT Biology pricing (USD)
          </h2>
          <ul>
            <li>
              <strong>MCAT Bio/Biochem — Pursuit: $449</strong> for the full 4–6 month programme.
              Campbell Biology end-to-end, Lehninger first-semester biochemistry, AAMC content
              outline mapping, 300+ practice passages, recorded library, WhatsApp doubt support.
            </li>
            <li>
              <strong>MCAT Bio/Biochem — Ascent: $899</strong> for the full programme. Adds
              weekly 2-hour live sessions, monthly section mocks, peer Slack channel, senior faculty
              office hours.
            </li>
            <li>
              <strong>MCAT Bio/Biochem — Pinnacle: $1,349</strong> for the full programme.
              Adds weekly 90-minute 1:1 video sessions with AIIMS-trained senior faculty,
              personalised study plan, custom passage drills, unlimited WhatsApp faculty access.
            </li>
            <li>
              <strong>Ad-hoc 1:1 tutoring — $135/hour</strong> outside the packaged programme. For
              students using a generalist and wanting a biology specialist for gap-fill.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from {metro.city} families</h2>
          <div className="space-y-6">
            {metro.faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200 group">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer">
                  {f.question}
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed faq-answer">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Biology Programmes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/mcat-biology-preparation" className="block p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow transition">
              <p className="font-semibold text-slate-900">MCAT Biology Hub</p>
              <p className="text-sm text-slate-500">Full programme overview</p>
            </Link>
            <Link href="/best-mcat-biology-tutor" className="block p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow transition">
              <p className="font-semibold text-slate-900">Best MCAT Biology Tutor</p>
              <p className="text-sm text-slate-500">Why Cerebrum for MCAT Bio</p>
            </Link>
            <Link href="/usmle-step-1-biology-preparation" className="block p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow transition">
              <p className="font-semibold text-slate-900">USMLE Step 1 Biology</p>
              <p className="text-sm text-slate-500">Post-MCAT medical licensing</p>
            </Link>
            <Link href="/cerebrum-vs-kaplan-mcat" className="block p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow transition">
              <p className="font-semibold text-slate-900">Cerebrum vs Kaplan MCAT</p>
              <p className="text-sm text-slate-500">Specialist vs generalist</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start MCAT Biology prep from {metro.city}
          </h2>
          <p className="text-blue-100 mb-8">
            Free 30-minute diagnostic with senior faculty in a {metro.timezoneShort}-friendly slot.
          </p>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg"
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
