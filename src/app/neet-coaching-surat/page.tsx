import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Surat'
const slug = 'neet-coaching-surat'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: `Best NEET Coaching in ${locality} | 98% Success Rate`,
  description: `Top NEET Biology coaching in ${locality}, Gujarat. AIIMS faculty, 98% success rate, 695/720 top score. Online + offline batches.`,
  keywords: [
    'NEET coaching Surat',
    'online NEET classes Surat',
    'biology tuition Surat',
    'NEET preparation Surat Gujarat',
    'best biology coaching Surat',
    'NEET tutor Surat',
    'medical entrance coaching Surat',
    'NEET online classes Gujarat',
  ],
  openGraph: {
    title: `Best NEET Coaching in ${locality}`,
    description: `Top NEET Biology coaching in ${locality}. AIIMS faculty, 98% success rate.`,
    url: `${BASE_URL}/${slug}`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality}` }],
  },
  twitter: { card: 'summary_large_image', title: `Best NEET Coaching in ${locality}`, description: `Top NEET Biology coaching in ${locality}. AIIMS faculty, 98% success rate.`, images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`] },
  alternates: { canonical: `${BASE_URL}/${slug}` },
}

const faqs = [
  { q: 'Is Surat good for NEET preparation?', a: 'Yes! With Cerebrum Biology Academy, Surat students access AIIMS-trained faculty, personalized batches of 10-15 students, and a 98% success rate online.' },
  { q: 'Do you serve Adajan and Vesu areas?', a: 'We serve all Surat areas including Adajan, Vesu, Athwa, City Light, Piplod, Pal, Katargam, and Varachha through live online classes.' },
  { q: 'What is the fee for NEET coaching in Surat?', a: 'Plans start at Rs 24,000/year for Foundation, Rs 36,000 for Comprehensive, and Rs 48,000 for Intensive. EMI options available.' },
  { q: 'Which medical colleges can Surat students target?', a: 'GMC Surat, B.J. Medical College Ahmedabad, AIIMS, GMERS colleges across Gujarat, plus other all-India medical institutes.' },
  { q: 'Do you cover Gujarat Board (GSEB) syllabus?', a: 'Our NCERT-focused approach covers 100% of NEET. GSEB students benefit fully since NEET is entirely NCERT-based.' },
  { q: 'How are classes conducted for Surat students?', a: 'Live interactive online classes with real-time doubt clearing. Small batches of 10-15 students ensure personalized attention.' },
  { q: 'What schools do Surat NEET students come from?', a: 'Students from DPS Surat, SGVP International, Shree Swaminarayan Gurukul, New Tulip International, Podar International, and Vibgyor High.' },
  { q: 'Is there a free demo class for Surat students?', a: 'Yes, book a free demo class via WhatsApp at 8826444334. Experience our AIIMS-trained faculty teaching before enrolling.' },
]

export default function NEETCoachingSuratPage() {
  return (
    <>
      <LocalitySchema locality="Surat" slug={slug} pageTitle="Best NEET Coaching in Surat" pageDescription="Top NEET Biology coaching in Surat, Gujarat with AIIMS faculty and 98% success rate." pageType="coaching" coordinates={{ lat: "21.1702", lng: "72.8311" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
