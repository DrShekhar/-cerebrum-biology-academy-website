import { Metadata } from 'next'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'
import { ParentsGuideTemplate } from '@/components/seo/ParentsGuideTemplate'

export const metadata: Metadata = {
  title: 'Parents Guide to NEET Coaching in Faridabad 2026 | What to Know',
  description:
    'Complete parents guide to NEET coaching in Faridabad. How to choose an institute, red flags to avoid, fee benchmarks, mental-health tips, and how to support your child. WhatsApp 88264-44334.',
  keywords: [
    'parents guide neet coaching faridabad',
    'neet coaching for parents faridabad',
    'how to choose neet coaching faridabad',
    'neet coaching advice for parents',
    'supporting neet aspirant child faridabad',
    'best neet coaching for parents to consider faridabad',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Parents Guide to NEET Coaching | Faridabad',
    description:
      'Everything Faridabad parents need to know about choosing NEET biology coaching.',
    url: 'https://cerebrumbiologyacademy.com/parents-guide-neet-coaching-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/parents-guide-neet-coaching-faridabad',
  },
}

export default function ParentsGuideFaridabadPage() {
  return (
    <>
      <LocalBusinessSchema />
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Faridabad',
          'NEET Biology Faridabad',
          'Medical entrance coaching Faridabad',
          'Parent counselling NEET Faridabad',
        ]}
      />
      <ParentsGuideTemplate
        config={{
          cityName: 'Faridabad',
          citySlug: 'faridabad',
          bookDemoUrl: '/free-neet-demo-class-faridabad',
          cityShortAside:
            'Faridabad parents face a unique trade-off: Velocity and a few local institutes are cheaper, but face-time with senior biology faculty is limited. We run a Sector 17 offline centre plus online batches — many DPS / Apeejay / DAV / MVN families combine Cerebrum biology with their existing physics/chemistry coaching.',
          cityFaq: {
            question:
              'Velocity / the 2nd-largest national NEET chain Faridabad charge less. Is the premium for Cerebrum worth it?',
            answer:
              'For biology specifically — yes, in most cases. Velocity / the 2nd-largest national NEET chain run large batches (40-60+) with rotating part-time biology faculty. Cerebrum runs 16-25 student Ascent batches with full-time AIIMS-trained biology faculty (Dr. Shekhar Singh) and a focused biology-only curriculum. If your child is strong in physics and chemistry but biology is the gap to a competitive NEET score, the ₹15-30K/year premium is the highest-ROI line item in your NEET budget. If biology is already strong, Velocity is reasonable for revision-only support.',
          },
        }}
      />
    </>
  )
}
