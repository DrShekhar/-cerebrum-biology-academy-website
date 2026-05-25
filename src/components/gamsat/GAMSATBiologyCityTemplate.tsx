import Link from 'next/link'
import type { GAMSATMetroConfig } from '@/data/gamsat/metros'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

function buildSchemas(metro: GAMSATMetroConfig) {
  const pageUrl = `${SITE_URL}/gamsat-biology-tutor-${metro.slug}`
  const priceCurrency = metro.currency.code

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `GAMSAT Biology Tutor for ${metro.city} Students`,
    description: `GAMSAT Section III biology tutoring for ${metro.city} graduate medicine applicants — ${metro.medSchools.map((s) => s.name).join(', ')}. Biology specialists, ${metro.timezoneShort} evening slots.`,
    url: pageUrl,
    inLanguage: metro.locale.replace('_', '-'),
    availableLanguage: ['English'],
    educationalLevel: 'Graduate Entry Medicine',
    educationalCredentialAwarded: 'GAMSAT Section III Preparation',
    provider: { '@type': 'EducationalOrganization', '@id': `${SITE_URL}/#organization`, name: 'Cerebrum Biology Academy', url: SITE_URL },
    areaServed: { '@type': 'AdministrativeArea', name: `${metro.city}, ${metro.country}`, address: { '@type': 'PostalAddress', addressRegion: metro.region, addressCountry: metro.countryCode } },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT2H',
      location: { '@type': 'VirtualLocation', url: pageUrl },
      offers: [
        { '@type': 'Offer', name: 'GAMSAT Section III Self-Paced', price: metro.pricing.selfPaced.replace(/[^0-9]/g, ''), priceCurrency, availability: 'https://schema.org/InStock', url: pageUrl },
        { '@type': 'Offer', name: 'GAMSAT Section III Small-Batch', price: metro.pricing.smallBatch.replace(/[^0-9]/g, ''), priceCurrency, availability: 'https://schema.org/InStock', url: pageUrl },
        { '@type': 'Offer', name: 'GAMSAT Section III 1:1 Senior Faculty', price: metro.pricing.oneOnOne.replace(/[^0-9]/g, ''), priceCurrency, availability: 'https://schema.org/InStock', url: pageUrl },
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
      { '@type': 'ListItem', position: 2, name: 'GAMSAT Biology Preparation', item: `${SITE_URL}/gamsat-section-3-biology-prep` },
      { '@type': 'ListItem', position: 3, name: metro.city, item: pageUrl },
    ],
  }

  return { courseSchema, faqSchema, breadcrumbSchema }
}

export default function GAMSATBiologyCityTemplate({ metro }: { metro: GAMSATMetroConfig }) {
  const { courseSchema, faqSchema, breadcrumbSchema } = buildSchemas(metro)

  const wa =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(`Hi — I'm a ${metro.city} graduate medicine applicant preparing for the GAMSAT. I'd like Section III biology programme details, ${metro.timezoneShort} slot availability, and pricing. Please share.`)

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-gradient-to-br from-purple-900 to-indigo-900 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-purple-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/gamsat-section-3-biology-prep" className="hover:text-white">GAMSAT Biology</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{metro.city}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            GAMSAT Biology Tutor for {metro.city} Applicants
          </h1>
          <p className="text-xl text-purple-200 mb-6 max-w-3xl" data-speakable="summary">{metro.heroSubtitle}</p>
          <div className="flex flex-wrap gap-4">
            <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
            <Link href="/gamsat-section-3-biology-prep" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold">GAMSAT Biology Overview</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{metro.whySection.heading}</h2>
          {metro.whySection.paragraphs.map((p, i) => <p key={i}>{p}</p>)}

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Graduate medicine programmes in the {metro.city} region</h2>
          <ul>{metro.medSchools.map((s) => <li key={s.name}><strong>{s.name}</strong> — {s.programmes}.</li>)}</ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">{metro.timezone} fit for {metro.city} candidates</h2>
          <p>{metro.timezoneSection}</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">{metro.demographicSection.heading}</h2>
          {metro.demographicSection.paragraphs.map((p, i) => <p key={i}>{p}</p>)}

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">How Cerebrum coaches GAMSAT Section III from {metro.city}</h2>
          <p><strong>100% online live.</strong> Zoom-based sessions covering Section III Biology content (cell biology, genetics, molecular biology, physiology, evolution — the five pillars), ACER-style stimulus-response passage walkthroughs, and a WhatsApp channel for between-session doubts.</p>
          <p><strong>Weekly small-batch sessions</strong> (4–6 candidates max), 2 hours each, plus monthly Section III mocks. <strong>Ad-hoc 1:1 sessions</strong> for targeted gap-fill on weak topics.</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">GAMSAT Section III pricing ({metro.currency.code})</h2>
          <ul>
            <li><strong>GAMSAT Section III Self-Paced — {metro.pricing.selfPaced}</strong> for the full 4–6 month programme. Biology content coverage, ACER practice passages, recorded library, WhatsApp doubt support.</li>
            <li><strong>GAMSAT Section III Small-Batch — {metro.pricing.smallBatch}</strong> for the full programme. Adds weekly 2-hour live sessions, monthly section mocks, peer channel, senior faculty office hours.</li>
            <li><strong>GAMSAT Section III 1:1 Senior Faculty — {metro.pricing.oneOnOne}</strong> for the full programme. Adds weekly 90-minute 1:1 video sessions, personalised study plan, custom passage drills, unlimited WhatsApp faculty access.</li>
          </ul>
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

      <section className="py-16 bg-gradient-to-br from-purple-600 to-indigo-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start GAMSAT Biology prep from {metro.city}</h2>
          <p className="text-purple-100 mb-8">Free 30-minute diagnostic in a {metro.timezoneShort}-friendly slot.</p>
          <a href={wa} className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
        </div>
      </section>
    </main>
  )
}
