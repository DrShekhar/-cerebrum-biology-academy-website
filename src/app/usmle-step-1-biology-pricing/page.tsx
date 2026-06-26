import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/usmle-step-1-biology-pricing'

export const metadata: Metadata = {
  title: 'USMLE Step 1 Biology Pricing | Foundations Packages | Cerebrum',
  description:
    'USMLE Step 1 biology-foundations pricing — $699 Self-Paced to $2,249 1:1. US medical students + Indian IMGs. First Aid mapped, UWorld integration.',
  keywords: [
    'USMLE step 1 biology pricing',
    'USMLE step 1 tutor cost',
    'USMLE biology coaching fees',
    'USMLE IMG preparation cost',
    'cerebrum USMLE pricing',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'USMLE Step 1 Biology Pricing | Foundations Packages | Cerebrum Biology Academy',
    description:
      'USMLE Step 1 biology-foundations pricing — $699 Self-Paced to $2,249 1:1. US medical students + Indian IMGs. First Aid mapped, UWorld integration.',
    url: PAGE_URL,
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'USMLE Step 1 Biology Pricing | Foundations Packages | Cerebrum',
    description:
      'USMLE Step 1 biology-foundations pricing — $699 Self-Paced to $2,249 1:1. US medical students + Indian IMGs. First Aid mapped, UWorld integration.',
  },
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — I want to discuss USMLE Biology pricing and which tier fits my goals. Please share programme details.'
  )

const pricingFaqs = [
  {
    question: 'How much does USMLE Step 1 biology tutoring cost at Cerebrum?',
    answer:
      'USMLE Step 1 biology-foundations tutoring is $699 for Self-Paced (Pursuit), $1,449 for Small-Batch (Ascent), and $2,249 for 1:1 Senior Faculty (Pinnacle). Ad-hoc 1:1 tutoring is $159/hour. Indian IMGs preparing for ECFMG pay the same tiers.',
  },
  {
    question: 'Why is Cerebrum priced differently from Kaplan Step 1?',
    answer:
      'Cerebrum is a biology-foundations specialist ($699–$2,249) covering the biology disciplines only, while Kaplan Step 1 (~$3,499) is a generalist provider covering all disciplines. UWorld ($499–$699) is a question bank with no teaching. Many students pair Cerebrum with UWorld and a generalist for non-biology content.',
  },
  {
    question: 'Do Indian IMGs pay the same USMLE biology pricing as US medical students?',
    answer:
      'Yes. AIIMS, MAMC, Grant, and KEM graduates preparing for ECFMG access the same $699 / $1,449 / $2,249 tiers as US M1/M2 students.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'USMLE Step 1 Biology Foundations Tutoring',
  description:
    'USMLE Step 1 biology-foundations tutoring packages — Self-Paced $699, Small-Batch $1,449, 1:1 Senior Faculty $2,249. First Aid-mapped, UWorld integration, for US medical students and Indian IMGs.',
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
        name: 'Step 1 Biology — Pursuit (Self-Paced)',
        price: '699',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Step 1 Biology — Ascent (Small-Batch)',
        price: '1449',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Step 1 Biology — Pinnacle (1:1 Senior Faculty)',
        price: '2249',
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
      name: 'USMLE Biology',
      item: 'https://cerebrumbiologyacademy.com/usmle-step-1-biology-preparation',
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
            <Link href="/usmle-step-1-biology-preparation" className="hover:text-white">
              USMLE Biology
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Pricing</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            USMLE Step 1 Biology Pricing | Foundations Packages
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            USMLE Step 1 biology-foundations pricing — $699 Self-Paced to $2,249 1:1. US medical
            students + Indian IMGs. First Aid mapped, UWorld integration.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Cerebrum USMLE Biology Pricing</h2>
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
                    Step 1 Biology — Pursuit (US)
                  </td>
                  <td className="py-3 px-4 text-green-700 font-bold">$699</td>
                  <td className="py-3 px-4 text-slate-600 text-sm">
                    First Aid-mapped foundations, recorded library, WhatsApp support
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    Step 1 Biology — Ascent (US)
                  </td>
                  <td className="py-3 px-4 text-green-700 font-bold">$1,449</td>
                  <td className="py-3 px-4 text-slate-600 text-sm">
                    Weekly 2-hour live sessions + monthly biology mocks
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    Step 1 Biology — Pinnacle (US)
                  </td>
                  <td className="py-3 px-4 text-green-700 font-bold">$2,249</td>
                  <td className="py-3 px-4 text-slate-600 text-sm">
                    Weekly 90-min 1:1 + personalised plan + unlimited access
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">Ad-hoc 1:1 (US)</td>
                  <td className="py-3 px-4 text-green-700 font-bold">$159/hour</td>
                  <td className="py-3 px-4 text-slate-600 text-sm">
                    Targeted gap-fill on weak biology topics
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">India IMG pricing</td>
                  <td className="py-3 px-4 text-green-700 font-bold">$699 / $1,449 / $2,249</td>
                  <td className="py-3 px-4 text-slate-600 text-sm">
                    Same tiers for AIIMS/MAMC/Grant/KEM graduates preparing for ECFMG
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
                  <td className="py-3 px-4 font-bold text-green-700">$699 – $159/hour</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 text-slate-700">Kaplan Step 1 (all disciplines)</td>
                  <td className="py-3 px-4 text-slate-500">~$3,499</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 text-slate-700">UWorld QBank (no teaching)</td>
                  <td className="py-3 px-4 text-slate-500">$499–$699</td>
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
