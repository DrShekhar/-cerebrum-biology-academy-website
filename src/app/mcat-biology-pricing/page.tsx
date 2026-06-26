import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/mcat-biology-pricing'

export const metadata: Metadata = {
  title: 'MCAT Biology Pricing | Bio/Biochem Section Packages | Cerebrum',
  description:
    'MCAT Bio/Biochem section tutoring pricing — $499 Self-Paced, $999 Small-Batch, $1,499 1:1 Senior Faculty. Compare vs Kaplan ($2,700) and Princeton Review ($2,900). Biology-only specialist.',
  keywords: [
    'MCAT biology pricing',
    'MCAT bio tutor cost',
    'MCAT biology coaching fees',
    'MCAT bio section cost',
    'cerebrum MCAT pricing',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology Pricing | Bio/Biochem Section Packages | Cerebrum Biology Academy',
    description:
      'MCAT Bio/Biochem section tutoring pricing — $499 Self-Paced, $999 Small-Batch, $1,499 1:1 Senior Faculty. Compare vs Kaplan ($2,700) and Princeton Review ($2,900). Biology-only specialist.',
    url: PAGE_URL,
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'MCAT Biology Pricing | Bio/Biochem Section Packages | Cerebrum',
    description:
      'MCAT Bio/Biochem section tutoring pricing — $499 Self-Paced, $999 Small-Batch, $1,499 1:1 Senior Faculty. Compare vs Kaplan ($2,700) and Princeton Review ($2,900). Biology-only specialist.',
  },
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — I want to discuss MCAT Biology pricing and which tier fits my goals. Please share programme details.'
  )

const pricingFaqs = [
  {
    question: 'How much does MCAT Biology tutoring cost at Cerebrum?',
    answer:
      'MCAT Bio/Biochem section tutoring is $499 for Self-Paced (Pursuit), $999 for Small-Batch (Ascent), and $1,499 for 1:1 Senior Faculty (Pinnacle). Ad-hoc 1:1 tutoring outside a package is $150/hour.',
  },
  {
    question: 'Why is Cerebrum cheaper than Kaplan or Princeton Review?',
    answer:
      'Cerebrum is a biology-section specialist ($499–$1,499) covering Bio/Biochem only, while Kaplan (~$2,700) and Princeton Review (~$2,900) are generalist providers covering all four MCAT sections. Many students pair Cerebrum with a generalist for the non-biology components.',
  },
  {
    question: 'What is included in the MCAT Bio/Biochem Self-Paced package?',
    answer:
      'The $499 Pursuit tier includes 4–6 months of async content, Campbell Biology + Lehninger curriculum, 300+ MCAT-style passages, and WhatsApp doubt support.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Biology (Bio/Biochem) Section Tutoring',
  description:
    'MCAT Bio/Biochem section tutoring packages — Self-Paced $499, Small-Batch $999, 1:1 Senior Faculty $1,499. Biology-only specialist with Campbell + Lehninger curriculum.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  provider: {
    '@type': 'EducationalOrganization',
    '@id': 'https://cerebrumbiologyacademy.com/#organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  areaServed: { '@type': 'Country', name: 'United States' },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    location: { '@type': 'VirtualLocation', url: PAGE_URL },
    offers: [
      {
        '@type': 'Offer',
        name: 'MCAT Bio/Biochem — Pursuit (Self-Paced)',
        price: '499',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'MCAT Bio/Biochem — Ascent (Small-Batch)',
        price: '999',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'MCAT Bio/Biochem — Pinnacle (1:1 Senior Faculty)',
        price: '1499',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
    ],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pricingFaqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'MCAT Biology',
      item: 'https://cerebrumbiologyacademy.com/mcat-biology-preparation',
    },
    { '@type': 'ListItem', position: 3, name: 'Pricing', item: PAGE_URL },
  ],
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/mcat-biology-preparation" className="hover:text-white">
              MCAT Biology
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Pricing</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            MCAT Biology Pricing | Bio/Biochem Section Packages
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            MCAT Bio/Biochem section tutoring pricing — $499 Self-Paced, $999 Small-Batch, $1,499
            1:1 Senior Faculty. Compare vs Kaplan ($2,700) and Princeton Review ($2,900).
            Biology-only specialist.
          </p>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Cerebrum MCAT Biology Pricing</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">
                    Programme
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">
                    Price
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">
                    What You Get
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    MCAT Bio/Biochem — Pursuit
                  </td>
                  <td className="py-3 px-4 text-green-700 font-bold">$499</td>
                  <td className="py-3 px-4 text-slate-600 text-sm">
                    4–6 months async, Campbell + Lehninger, 300+ passages, WhatsApp doubt support
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    MCAT Bio/Biochem — Ascent
                  </td>
                  <td className="py-3 px-4 text-green-700 font-bold">$999</td>
                  <td className="py-3 px-4 text-slate-600 text-sm">
                    Weekly 2-hour live sessions + monthly section mocks + Self-Paced content
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    MCAT Bio/Biochem — Pinnacle
                  </td>
                  <td className="py-3 px-4 text-green-700 font-bold">$1,499</td>
                  <td className="py-3 px-4 text-slate-600 text-sm">
                    Weekly 90-min 1:1 + personalised study plan + unlimited faculty access
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">Ad-hoc 1:1 Tutoring</td>
                  <td className="py-3 px-4 text-green-700 font-bold">$150/hour</td>
                  <td className="py-3 px-4 text-slate-600 text-sm">
                    Outside packaged programme — gap-fill, passage walkthroughs, pre-exam intensive
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How Cerebrum Compares</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">
                    Provider
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 bg-green-50">
                  <td className="py-3 px-4 font-bold text-green-800">
                    Cerebrum Biology Academy (biology section only)
                  </td>
                  <td className="py-3 px-4 font-bold text-green-700">$499 – $1,499</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 text-slate-700">Kaplan MCAT (all 4 sections)</td>
                  <td className="py-3 px-4 text-slate-500">~$2,700</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 text-slate-700">
                    Princeton Review MCAT (all 4 sections)
                  </td>
                  <td className="py-3 px-4 text-slate-500">~$2,900</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 text-slate-700">Blueprint MCAT (adaptive platform)</td>
                  <td className="py-3 px-4 text-slate-500">$1,799–$2,999</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Cerebrum is a biology-section specialist. Competitors listed are generalist providers
            covering all sections/disciplines. Many students pair Cerebrum with a generalist for
            non-biology components.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get a Personalised Quote</h2>
          <p className="text-blue-100 mb-8">
            Free 30-minute diagnostic to determine which tier fits your goals.
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
    </main>
  )
}
