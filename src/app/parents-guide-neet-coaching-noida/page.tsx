import { Metadata } from 'next'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'
import { ParentsGuideTemplate } from '@/components/seo/ParentsGuideTemplate'

export const metadata: Metadata = {
  title: 'Parents Guide to NEET Coaching in Noida 2026 | What to Know',
  description:
    'Complete parents guide to NEET coaching in Noida. How to choose an institute, red flags to avoid, fee benchmarks, mental-health tips, and how to support your child. WhatsApp 88264-44334.',
  keywords: [
    'parents guide neet coaching noida',
    'neet coaching for parents noida',
    'how to choose neet coaching noida',
    'neet coaching advice for parents',
    'supporting neet aspirant child noida',
    'best neet coaching for parents to consider noida',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Parents Guide to NEET Coaching | Noida',
    description: 'Everything Noida parents need to know about choosing NEET biology coaching.',
    url: 'https://cerebrumbiologyacademy.com/parents-guide-neet-coaching-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/parents-guide-neet-coaching-noida',
  },

  twitter: { card: 'summary_large_image' as const },
}

export default function ParentsGuideNoidaPage() {
  return (
    <>
      <LocalBusinessSchema />
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Noida',
          'NEET Biology Noida',
          'Medical entrance coaching Noida',
          'Parent counselling NEET Noida',
        ]}
      />
      <ParentsGuideTemplate
        config={{
          cityName: 'Noida',
          citySlug: 'noida',
          bookDemoUrl: '/free-neet-demo-class-noida',
          cityShortAside:
            'Most Noida families pick a coaching within Sector 18, 50, 62, 76, or Greater Noida West to keep daily commute under 30 minutes. We run online + hybrid + Saturday-Sunday offline batches so children from any Noida sector can attend.',
          cityFaq: {
            question:
              'My child is in DPS Noida / Amity / Lotus Valley / Ryan — should we pick a Noida coaching or commute to Delhi?',
            answer:
              "Stay local. A 60-90 minute round trip to Delhi 5-6 times a week is 5-7 hours of weekly fatigue your child cannot afford during Class 11-12. Noida has strong coaching options including ours (online + Sunday offline at South Extension when needed). Reserve Delhi visits for the monthly parent-teacher meeting and the Sunday mock tests if your child wants to attend in person.",
          },
        }}
      />
    </>
  )
}
