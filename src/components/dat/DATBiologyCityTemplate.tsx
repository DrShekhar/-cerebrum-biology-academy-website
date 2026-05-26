import Link from 'next/link'
import type { DATMetroConfig } from '@/data/dat/metros'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

function buildSchemas(metro: DATMetroConfig) {
  const pageUrl = `${SITE_URL}/dat-biology-tutor-${metro.slug}`

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `DAT Biology Tutor for ${metro.city} Students`,
    description: `DAT Biology section tutoring for ${metro.city} pre-dental students — ${metro.universities.map((u) => u.name).join(', ')}. Biology specialists, Campbell-aligned, ${metro.timezoneShort} evening slots.`,
    url: pageUrl,
    inLanguage: 'en-US',
    availableLanguage: ['English'],
    educationalLevel: 'Pre-Dental',
    educationalCredentialAwarded: 'DAT Biology Section Preparation',
    provider: { '@type': 'EducationalOrganization', '@id': `${SITE_URL}/#organization`, name: 'Cerebrum Biology Academy', url: SITE_URL },
    areaServed: { '@type': 'AdministrativeArea', name: `${metro.city} Metro (${metro.stateOrRegion})`, address: { '@type': 'PostalAddress', addressRegion: metro.stateCode, addressCountry: 'US' } },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT2H',
      location: { '@type': 'VirtualLocation', url: pageUrl },
      offers: [
        { '@type': 'Offer', name: 'DAT Biology Self-Paced', price: '449', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: pageUrl },
        { '@type': 'Offer', name: 'DAT Biology Small-Batch (4–6 students)', price: '899', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: pageUrl },
        { '@type': 'Offer', name: 'DAT Biology 1:1 Senior Faculty', price: '1399', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: pageUrl },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: metro.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'DAT Biology Preparation', item: `${SITE_URL}/dat-biology-preparation` },
      { '@type': 'ListItem', position: 3, name: metro.city, item: pageUrl },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `DAT Biology Tutor for ${metro.city} Students`,
    url: pageUrl,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['[data-speakable="title"]', '[data-speakable="summary"]'] },
  }

  return { courseSchema, faqSchema, breadcrumbSchema, speakableSchema }
}

export default function DATBiologyCityTemplate({ metro }: { metro: DATMetroConfig }) {
  const { courseSchema, faqSchema, breadcrumbSchema, speakableSchema } = buildSchemas(metro)

  const wa =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(`Hi — I'm a ${metro.city} pre-dental student (or parent) preparing for the DAT. I'd like Biology section programme details, ${metro.timezoneShort} slot availability, and pricing. Please share.`)

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <section className="bg-gradient-to-br from-teal-900 to-teal-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-teal-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/dat-biology-preparation" className="hover:text-white">DAT Biology Preparation</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{metro.city}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            DAT Biology Tutor for {metro.city} Students
          </h1>
          <p className="text-xl text-teal-200 mb-6 max-w-3xl" data-speakable="summary">{metro.heroSubtitle}</p>
          <div className="flex flex-wrap gap-4">
            <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
            <Link href="/dat-biology-preparation" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold">DAT Biology Overview</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{metro.whySection.heading}</h2>
          {metro.whySection.paragraphs.map((p, i) => <p key={i}>{p}</p>)}

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Dental schools we coach toward in the {metro.city} metro</h2>
          <ul>{metro.universities.map((u) => <li key={u.name}><strong>{u.name}</strong> — {u.programmes}.</li>)}</ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">{metro.timezone} fit for {metro.city} students</h2>
          <p>{metro.timezoneSection}</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">{metro.demographicSection.heading}</h2>
          {metro.demographicSection.paragraphs.map((p, i) => <p key={i}>{p}</p>)}

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">How Cerebrum coaches DAT Biology from {metro.city}</h2>
          <p><strong>100% online live.</strong> Zoom-based sessions, screen-shared Campbell Biology excerpts (cell biology, genetics, anatomy/physiology, evolution, ecology — the five DAT Biology pillars), DAT Bootcamp-style passage walkthroughs, and a WhatsApp channel for between-session doubts.</p>
          <p><strong>Weekly small-batch sessions</strong> (4–6 students max, grouped by target band), 90 minutes each, plus monthly DAT Biology section mocks. <strong>Ad-hoc 1:1 sessions</strong> at $120/hour for gap-fill.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">DAT Biology pricing (USD)</h2>
          <ul>
            <li><strong>DAT Biology — Pursuit: $449</strong> for the full 3–5 month programme. Campbell Biology coverage aligned to ADA DAT content outline, 200+ practice questions, recorded library, WhatsApp doubt support.</li>
            <li><strong>DAT Biology — Ascent: $899</strong> for the full programme. Adds weekly 90-minute live sessions, monthly section mocks, peer Slack channel, senior faculty office hours.</li>
            <li><strong>DAT Biology — Pinnacle: $1,399</strong> for the full programme. Adds weekly 60-minute 1:1 video sessions with AIIMS-trained senior faculty, personalised study plan, custom question drills.</li>
            <li><strong>Ad-hoc 1:1 tutoring — $120/hour</strong> outside the packaged programme.</li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from {metro.city} pre-dental families</h2>
          <div className="space-y-6">
            {metro.faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer">{f.question}</summary>
                <p className="mt-4 text-slate-700 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Biology Programmes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dat-biology-preparation" className="block p-4 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow transition">
              <p className="font-semibold text-slate-900">DAT Biology Hub</p>
              <p className="text-sm text-slate-500">Full programme overview</p>
            </Link>
            <Link href="/best-dat-biology-tutor" className="block p-4 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow transition">
              <p className="font-semibold text-slate-900">Best DAT Biology Tutor</p>
              <p className="text-sm text-slate-500">Why Cerebrum for DAT Bio</p>
            </Link>
            <Link href="/mcat-biology-preparation" className="block p-4 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow transition">
              <p className="font-semibold text-slate-900">MCAT Biology</p>
              <p className="text-sm text-slate-500">Pre-med alternative track</p>
            </Link>
            <Link href="/ap-biology" className="block p-4 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow transition">
              <p className="font-semibold text-slate-900">AP Biology</p>
              <p className="text-sm text-slate-500">High school foundation</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-teal-600 to-emerald-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start DAT Biology prep from {metro.city}</h2>
          <p className="text-teal-100 mb-8">Free 30-minute diagnostic with senior faculty in a {metro.timezoneShort}-friendly slot.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
