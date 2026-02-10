import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = 'Pathways School'

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
  description: `Specialized NEET Biology coaching for ${school} (IB World School) students in Noida/Gurgaon. IB curriculum to NEET bridge program with expert faculty.`,
  keywords: [
    'NEET coaching Pathways School',
    'NEET coaching Noida Gurgaon',
    'IB to NEET bridge',
    'Pathways School NEET preparation',
    'biology coaching IB students',
    'NEET for international school students',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
    description: `Expert NEET coaching for ${school} students with IB curriculum integration.`,
    url: `${BASE_URL}/neet-coaching-pathways-school`,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-pathways-school`,
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Pathways School?', a: 'Yes! Our online NEET coaching is specifically designed for Gurgaon students. With AIIMS faculty, 98% success rate, and personalized attention, students in Pathways School achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for Pathways School students?', a: 'We offer flexible morning, afternoon, and evening batches so Pathways School students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Pathways School students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Pathways School?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. Pathways School students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Pathways School students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Gurugram classroom coaching.' },
  { q: 'Which medical colleges can Pathways School students target?', a: 'With strong NEET scores, Pathways School students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function PathwaysSchoolPage() {
  return (
    <>
      <LocalitySchema locality="Noida" slug="neet-coaching-pathways-school" pageTitle={`NEET Coaching for ${school} Students`} pageDescription={`Expert NEET coaching for ${school} (IB World School) students in Noida/Gurgaon with complete IB-to-NEET bridge program.`} pageType="coaching" coordinates={{ lat: "28.4400", lng: "77.0300" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
