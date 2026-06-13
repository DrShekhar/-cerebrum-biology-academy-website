import { Metadata } from 'next'
import PageContent from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Coaching for NRI Students in USA | Online Biology Classes',
  description:
    'Online NEET Biology coaching for ~5M Indian-American students. AP Biology + NEET dual prep, EST/CST/PST-friendly batches, NRI quota MBBS guidance.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-nri-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-nri-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-nri-usa`,
    },
  },
  openGraph: {
    title: 'NEET Coaching for NRI Students in USA',
    description:
      'Online NEET Biology coaching for Indian-American students. AP Biology + NEET dual prep. NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-nri-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-usa.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in USA — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching for NRI Students in USA',
    description: 'Online NEET Biology coaching for Indian-American students. Book free demo.',
    creator: '@cerebrumbiology',
    images: [`${BASE_URL}/og-neet-coaching-usa.jpg`],
  },
}

export default async function Page() {
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Cerebrum Biology Academy',
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        sameAs: [
          'https://www.facebook.com/cerebrumbiology',
          'https://www.youtube.com/cerebrumbiology',
          'https://www.instagram.com/cerebrumbiology',
        ],
        foundingDate: '2014',
        description: 'Online NEET Biology coaching for Indian-American students (~5M diaspora).',
        telephone: '+918826444334',
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        offers: {
          '@type': 'EducationalOccupationalProgram',
          name: 'NEET Biology Coaching',
          description:
            'Online NEET-UG Biology preparation for Indian-American high-school students across NY, NJ, TX, IL, CA, GA, DC, MA and other US states.',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why would an Indian-American student take NEET?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Because NEET is the gateway to MBBS admission in Indian medical colleges, including the 15% NRI quota seats. Indian-American families pursue this route when they want a direct-to-MBBS pathway at lower cost and shorter timeline than US pre-med + med school. NEET does not play any role in US medical school admission — that requires MCAT + a US undergraduate degree.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there a NEET exam centre inside the United States?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The NTA-designated overseas NEET exam centres are in Dubai, Sharjah, Abu Dhabi, Doha, Kuwait City, Riyadh, Muscat, Manama, Singapore, Bangkok, Kuala Lumpur, Lagos, Colombo and Kathmandu. US candidates typically fly to Dubai or India to sit NEET-UG. We help enrolled students plan the travel and registration.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I prepare for NEET while taking AP Biology?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. AP Biology and NEET Biology overlap on cell biology, genetics, physiology, and ecology. NEET adds depth on human physiology and NCERT-specific content. Students running AP Bio and NEET prep in parallel typically find both easier because the fundamentals are shared.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are typical class timings for US students?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Live classes run in IST blocks that translate to weekday evenings (CST/EST/PST) and weekend mornings local time. All sessions are recorded, so time-zone mismatches don't block progress.",
            },
          },
          {
            '@type': 'Question',
            name: 'Do you provide visa or immigration services?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. We are an academic coaching institute only. We do not provide visa, immigration, or legal documentation services. Visa matters should be handled by your family, school, or licensed immigration consultants.',
            },
          },
          {
            '@type': 'Question',
            name: 'What about the NRI quota for Indian MBBS admissions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '15% of seats at eligible Indian medical colleges are reserved for NRI/OCI candidates. We help you understand which colleges offer NRI seats, typical NEET cut-offs for those seats, and broad admission timelines. We do not act as an admissions consultant.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'NRI Coaching',
            item: `${BASE_URL}/nri-coaching`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'NEET Coaching in USA',
            item: `${BASE_URL}/neet-coaching-nri-usa`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      <PageContent />
      <NEETNRIPricingTiers />

      {/* Cross-programme links for US families */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Other Biology Programmes for US Students
          </h2>
          <p className="text-slate-600 mb-6">
            Beyond NEET, Cerebrum serves US students across MCAT, AP Biology, USABO, IB Biology, and
            DAT.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <a
              href="/mcat-biology-tutor-new-york"
              className="block p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow text-center transition"
            >
              <span className="font-medium text-slate-900 text-sm">MCAT Biology NYC</span>
            </a>
            <a
              href="/ap-biology-tutor-new-york"
              className="block p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:shadow text-center transition"
            >
              <span className="font-medium text-slate-900 text-sm">AP Biology NYC</span>
            </a>
            <a
              href="/usabo-coaching-new-york"
              className="block p-3 rounded-lg border border-slate-200 hover:border-amber-400 hover:shadow text-center transition"
            >
              <span className="font-medium text-slate-900 text-sm">USABO Coaching</span>
            </a>
            <a
              href="/mcat-biology-tutor-bay-area"
              className="block p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow text-center transition"
            >
              <span className="font-medium text-slate-900 text-sm">MCAT Bay Area</span>
            </a>
            <a
              href="/dat-biology-tutor-new-york"
              className="block p-3 rounded-lg border border-slate-200 hover:border-teal-400 hover:shadow text-center transition"
            >
              <span className="font-medium text-slate-900 text-sm">DAT Biology NYC</span>
            </a>
            <a
              href="/usmle-step-1-tutor-new-york"
              className="block p-3 rounded-lg border border-slate-200 hover:border-red-400 hover:shadow text-center transition"
            >
              <span className="font-medium text-slate-900 text-sm">USMLE Step 1</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
