import Link from 'next/link'
import type { USMLEMetroConfig } from '@/data/usmle-step-1/metros'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

function buildSchemas(metro: USMLEMetroConfig) {
  const pageUrl = `${SITE_URL}/usmle-step-1-tutor-${metro.slug}`

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `USMLE Step 1 Biology Tutor for ${metro.city}`,
    description: `USMLE Step 1 biology-foundations tutoring for ${metro.city} — ${metro.medSchools.map((s) => s.name).join(', ')}. Biology specialists, First Aid mapped, ${metro.timezoneShort} sessions.`,
    url: pageUrl,
    inLanguage: metro.locale.replace('_', '-'),
    availableLanguage: ['English'],
    educationalLevel: 'Medical School / IMG',
    educationalCredentialAwarded: 'USMLE Step 1 Biology Foundations Preparation',
    provider: { '@type': 'EducationalOrganization', '@id': `${SITE_URL}/#organization`, name: 'Cerebrum Biology Academy', url: SITE_URL },
    areaServed: { '@type': 'AdministrativeArea', name: `${metro.city}, ${metro.country}`, address: { '@type': 'PostalAddress', addressRegion: metro.stateOrRegion, addressCountry: metro.countryCode } },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT2H',
      location: { '@type': 'VirtualLocation', url: pageUrl },
      offers: metro.countryCode === 'US'
        ? [
            { '@type': 'Offer', name: 'USMLE Step 1 Biology Self-Paced', price: '799', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: pageUrl },
            { '@type': 'Offer', name: 'USMLE Step 1 Biology Small-Batch', price: '1599', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: pageUrl },
            { '@type': 'Offer', name: 'USMLE Step 1 Biology 1:1 Senior Faculty', price: '2499', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: pageUrl },
          ]
        : [
            { '@type': 'Offer', name: 'USMLE Step 1 Biology Self-Paced', price: '39999', priceCurrency: 'INR', availability: 'https://schema.org/InStock', url: pageUrl },
            { '@type': 'Offer', name: 'USMLE Step 1 Biology Small-Batch', price: '79999', priceCurrency: 'INR', availability: 'https://schema.org/InStock', url: pageUrl },
            { '@type': 'Offer', name: 'USMLE Step 1 Biology 1:1 Senior Faculty', price: '124999', priceCurrency: 'INR', availability: 'https://schema.org/InStock', url: pageUrl },
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
      { '@type': 'ListItem', position: 2, name: 'USMLE Step 1 Biology', item: `${SITE_URL}/usmle-step-1-biology-preparation` },
      { '@type': 'ListItem', position: 3, name: metro.city, item: pageUrl },
    ],
  }

  return { courseSchema, faqSchema, breadcrumbSchema }
}

export default function USMLEStep1CityTemplate({ metro }: { metro: USMLEMetroConfig }) {
  const { courseSchema, faqSchema, breadcrumbSchema } = buildSchemas(metro)
  const isIndia = metro.countryCode === 'IN'

  const wa =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(`Hi — I'm a ${metro.city} ${isIndia ? 'IMG' : 'medical student'} preparing for USMLE Step 1. I'd like biology-foundations programme details, ${metro.timezoneShort} slot availability, and pricing. Please share.`)

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-gradient-to-br from-red-900 to-rose-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-red-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/usmle-step-1-biology-preparation" className="hover:text-white">USMLE Step 1 Biology</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{metro.city}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            USMLE Step 1 Biology Tutor for {metro.city}
          </h1>
          <p className="text-xl text-red-200 mb-6 max-w-3xl" data-speakable="summary">{metro.heroSubtitle}</p>
          <div className="flex flex-wrap gap-4">
            <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
            <Link href="/usmle-step-1-biology-preparation" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold">USMLE Step 1 Overview</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{metro.whySection.heading}</h2>
          {metro.whySection.paragraphs.map((p, i) => <p key={i}>{p}</p>)}

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Medical schools in the {metro.city} region</h2>
          <ul>{metro.medSchools.map((s) => <li key={s.name}><strong>{s.name}</strong> — {s.programmes}.</li>)}</ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">{metro.timezone} scheduling for {metro.city} candidates</h2>
          <p>{metro.timezoneSection}</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">{metro.demographicSection.heading}</h2>
          {metro.demographicSection.paragraphs.map((p, i) => <p key={i}>{p}</p>)}

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">How Cerebrum coaches USMLE Step 1 biology from {metro.city}</h2>
          <p><strong>100% online live.</strong> Zoom-based sessions covering the ~55% of Step 1 that is biology-driven: biochemistry (pathways, not just enzyme names), microbiology (mechanisms, not just taxonomy), immunology (cascades, not just classification), and physiology (organ-system integration). First Aid mapped end-to-end, UWorld integration walkthroughs.</p>
          <p><strong>Weekly small-batch sessions</strong> (4–6 candidates max), 2 hours each, plus monthly NBME-style biology section mocks. <strong>Ad-hoc 1:1 sessions</strong> for targeted gap-fill on weak topics.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">USMLE Step 1 Biology pricing ({metro.currency.code})</h2>
          {isIndia ? (
            <ul>
              <li><strong>USMLE Step 1 Biology Self-Paced — ₹39,999</strong> for the full programme. First Aid-mapped biology foundations, recorded library, WhatsApp doubt support.</li>
              <li><strong>USMLE Step 1 Biology Small-Batch — ₹79,999</strong>. Adds weekly 2-hour live sessions, monthly biology mocks, peer channel.</li>
              <li><strong>USMLE Step 1 Biology 1:1 Senior Faculty — ₹1,24,999</strong>. Adds weekly 90-minute 1:1, personalised study plan, unlimited faculty access.</li>
              <li><strong>Ad-hoc 1:1 — ₹8,750/hour</strong> outside the packaged programme.</li>
            </ul>
          ) : (
            <ul>
              <li><strong>USMLE Step 1 Biology Self-Paced — $799</strong> for the full programme. First Aid-mapped biology foundations, recorded library, WhatsApp doubt support.</li>
              <li><strong>USMLE Step 1 Biology Small-Batch — $1,599</strong>. Adds weekly 2-hour live sessions, monthly biology mocks, peer channel.</li>
              <li><strong>USMLE Step 1 Biology 1:1 Senior Faculty — $2,499</strong>. Adds weekly 90-minute 1:1, personalised study plan, unlimited faculty access.</li>
              <li><strong>Ad-hoc 1:1 — $175/hour</strong> outside the packaged programme.</li>
            </ul>
          )}
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from {metro.city} candidates</h2>
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

      <section className="py-16 bg-gradient-to-br from-red-600 to-rose-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start USMLE Step 1 Biology prep from {metro.city}</h2>
          <p className="text-red-100 mb-8">Free 30-minute diagnostic in a {metro.timezoneShort}-friendly slot.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-red-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
