import { Metadata } from 'next'
import Link from 'next/link'
import PageContent from './PageContent'
import Script from 'next/script'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'NEET Coaching for Canada NRI Students',
  subtitle: 'Toronto | Vancouver | Brampton | Surrey',
})

export const metadata: Metadata = {
  title: 'NEET Coaching for Canadian NRI Students | Toronto, Vancouver',
  description:
    'Best NEET Biology coaching for Indo-Canadian students. Live online classes at EST/PST friendly timings. AIIMS faculty, provincial curriculum bridge, NRI quota guidance. 98% success rate.',
  keywords: [
    'NEET coaching Canada',
    'NEET classes Indo-Canadians',
    'NEET coaching Toronto',
    'NEET coaching Vancouver',
    'NEET coaching Brampton',
    'Biology coaching NRI Canada',
    'NEET online classes Canada',
    'Indian medical admission Canadian students',
    'MBBS India for Canadian students',
    'NRI quota Canada NEET',
  ],
  openGraph: {
    title: 'NEET Coaching for Canadian NRI Students',
    description:
      'Top NEET Biology coaching for Indo-Canadian students. EST/PST friendly timings, provincial curriculum bridge, NRI quota expertise.',
    url: `${BASE_URL}/neet-coaching-nri-canada`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching for Canadian NRI Students - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching for Canadian NRI Students | 98% Success Rate',
    description:
      'Expert NEET coaching for Indo-Canadians. EST/PST timings, provincial curriculum bridge.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-nri-canada`,
  },
}

const faqs = [
  {
    q: 'Can Canadian citizens appear for NEET?',
    a: 'Yes! Canadian citizens and PIOs (Persons of Indian Origin) can appear for NEET and seek admission in Indian medical colleges under NRI or general quota.',
  },
  {
    q: 'What are the class timings for Canadian students?',
    a: 'Morning classes 6:30-10:30 AM EST (before school). Pacific time students join at 3:30-7:30 AM PST. Weekend daytime batches also available. All classes recorded for flexible viewing.',
  },
  {
    q: 'Where do Canadian students write NEET exam?',
    a: 'NEET exam centers are not yet available in Canada. Canadian students need to travel to India for the exam. We assist with travel planning and recommend arriving 2 weeks early.',
  },
  {
    q: 'Is Indian MBBS recognized in Canada?',
    a: 'Indian MBBS graduates can practice in Canada after clearing MCCQE (Medical Council of Canada Qualifying Examination) exams and completing residency. Many Indian-origin Canadian doctors took this path.',
  },
  {
    q: 'Why choose Indian MBBS over Canadian medical school?',
    a: 'Canadian medical schools have 3-5% acceptance rate, making entry extremely competitive. Indian MBBS through NEET offers a more accessible, affordable path (CAD 30-80K total vs CAD 15-25K/year in Canada).',
  },
  {
    q: 'Do you offer bridge courses for Ontario/BC curriculum?',
    a: 'Yes! We provide comprehensive bridge courses for Ontario, BC, and Alberta biology curricula to NCERT-based NEET preparation. Our faculty understands provincial curriculum differences.',
  },
  {
    q: 'How does NRI quota work for Canadian students?',
    a: 'Canadian PIOs can apply under NRI quota with reserved seats (15%) in private and deemed medical colleges. We provide complete documentation guidance and counseling support.',
  },
  {
    q: 'What is the fee structure for Canadian students?',
    a: 'Annual NRI tuition in Canada runs roughly CAD 5,700–7,400 (≈ $4,200–$5,400 USD) across Foundation, Comprehensive, and Dropper tiers — see the regional pricing tiers below for the exact CAD amount plus a monthly equivalent. Billed in CAD or USD via international card or wire. EMI plans available. A small fraction of Canadian med-school tuition.',
  },
]

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - Canada',
  description:
    'Premier NEET Biology coaching for Indo-Canadian students. Live online classes at EST/PST friendly timings with AIIMS faculty.',
  url: `${BASE_URL}/neet-coaching-nri-canada`,
  telephone: '+91-8826444334',
  areaServed: { '@type': 'Country', name: 'Canada' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    ratingCount: '35',
    bestRating: '5',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default async function NEETCoachingNRICanadaPage() {
  return (
    <>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageContent />
      <NEETNRIPricingTiers />

      {/* Cross-programme links for Canadian families */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Other Biology Programmes for Canadian Students</h2>
          <p className="text-slate-600 mb-6">Beyond NEET, Cerebrum serves Canadian students across AP Biology, MCAT, IB Biology, and Biology Olympiads.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <Link href="/mcat-biology-tutor-toronto" className="block p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow text-center transition">
              <span className="font-medium text-slate-900 text-sm">MCAT Biology Toronto</span>
            </Link>
            <Link href="/mcat-biology-tutor-vancouver" className="block p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow text-center transition">
              <span className="font-medium text-slate-900 text-sm">MCAT Biology Vancouver</span>
            </Link>
            <Link href="/ap-biology-tutor-toronto-gta" className="block p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:shadow text-center transition">
              <span className="font-medium text-slate-900 text-sm">AP Biology Toronto</span>
            </Link>
            <Link href="/cbo-coaching" className="block p-3 rounded-lg border border-slate-200 hover:border-amber-400 hover:shadow text-center transition">
              <span className="font-medium text-slate-900 text-sm">CBO Olympiad</span>
            </Link>
            <Link href="/ib-biology/toronto" className="block p-3 rounded-lg border border-slate-200 hover:border-purple-400 hover:shadow text-center transition">
              <span className="font-medium text-slate-900 text-sm">IB Biology Toronto</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
