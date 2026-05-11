import { Metadata } from 'next'
import PageContent from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

export const metadata: Metadata = {
  title: 'NEET Coaching in Al Khobar, Saudi Arabia',
  description:
    "Expert NEET coaching in Al Khobar, Saudi Arabia. Al Khobar, a major hub in Saudi Arabia's Eastern Province, is home to numerous international schools serving ARAMCO families and business professionals. 98% success rate. Enroll today!",
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-al-khobar-saudi-arabia',
  },
}

export default async function Page() {
  return (
    <>
      <PageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
