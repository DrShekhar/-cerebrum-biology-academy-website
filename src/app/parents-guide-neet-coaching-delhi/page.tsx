import { Metadata } from 'next'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { ParentsGuideTemplate } from '@/components/seo/ParentsGuideTemplate'

export const metadata: Metadata = {
  title: 'Parents Guide to NEET Coaching in Delhi 2026 | What to Know',
  description:
    'Complete parents guide to NEET coaching in Delhi. How to choose an institute, red flags to avoid, fee benchmarks, mental-health tips, and how to support your child. WhatsApp 88264-44334.',
  keywords: [
    'parents guide neet coaching delhi',
    'neet coaching for parents delhi',
    'how to choose neet coaching delhi',
    'neet coaching advice for parents',
    'supporting neet aspirant child delhi',
    'best neet coaching for parents to consider delhi',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Parents Guide to NEET Coaching | Delhi',
    description: 'Everything Delhi parents need to know about choosing NEET biology coaching.',
    url: 'https://cerebrumbiologyacademy.com/parents-guide-neet-coaching-delhi',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/parents-guide-neet-coaching-delhi',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Parents Guide to NEET Coaching in Delhi 2026 | What to Know',
    description: 'Complete parents guide to NEET coaching in Delhi. How to choose an institute, red flags to avoid, fee benchmarks, mental-health tips, and how to support your child. WhatsApp 88264-44334.',
  },
}

export default function ParentsGuideDelhiPage() {
  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Delhi',
          'NEET Biology Delhi',
          'Medical entrance coaching Delhi',
          'Parent counselling NEET Delhi',
        ]}
      />
      <ParentsGuideTemplate
        config={{
          cityName: 'Delhi',
          citySlug: 'delhi',
          bookDemoUrl: '/demo',
          cityShortAside:
            'Our South Extension (Green Park) and Rohini centres serve Delhi families across South, Central, and North Delhi — most students reach within 25 minutes by metro.',
          cityFaq: {
            question: 'Should I pick a Delhi coaching or look at NCR options like Gurugram or Noida?',
            answer:
              "Delhi has the deepest faculty bench and the largest peer cohort. NCR centres (Gurugram, Noida, Faridabad) work well only if your home is in that micro-market — daily inter-city commutes drain a child's energy and study hours. If you live in South Delhi, our South Extension centre is the right pick; if North Delhi, Rohini. We also run online + hybrid batches for families who prefer to skip the commute entirely.",
          },
        }}
      />
    </>
  )
}
