import { Metadata } from 'next'
import PageContent from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

export const metadata: Metadata = {
  title: 'NEET Coaching in Al Wakrah, Qatar',
  description:
    "Expert NEET coaching in Al Wakrah, Qatar. Al Wakrah, Qatar's growing satellite city south of Doha, offers modern educational infrastructure and competitive NEET coaching options. 98% success rate. Enroll today!",
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-al-wakrah-qatar',
  },

  twitter: { card: 'summary_large_image' as const },

  openGraph: { title: 'NEET Coaching in Al Wakrah, Qatar', description: 'Expert NEET coaching in Al Wakrah, Qatar. Al Wakrah, Qatar', type: 'website' },
}

export default async function Page() {
  return (
    <>
      <PageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
