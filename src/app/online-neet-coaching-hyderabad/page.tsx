import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildOnlineOfflineCityConfig } from '@/data/online-vs-offline-cities'

export const metadata: Metadata = {
  title: 'Online NEET Coaching in Hyderabad | Live AIIMS Faculty | Cerebrum',
  description:
    'Online NEET coaching for Hyderabad students — live (not recorded) classes by AIIMS-trained faculty. Small batches of 15–20. No commute, same faculty as offline. Compare online vs offline for Hyderabad.',
  keywords: [
    'online neet coaching hyderabad',
    'best online neet coaching hyderabad',
    'live online neet coaching hyderabad',
    'online vs offline neet coaching hyderabad',
    'online neet biology coaching hyderabad',
    'online neet classes hyderabad',
    'aiims faculty online neet hyderabad',
  ],
  openGraph: {
    title: 'Online NEET Coaching in Hyderabad | AIIMS Faculty',
    description:
      'Live online NEET coaching for Hyderabad students. Same AIIMS faculty as offline, no commute.',
    url: 'https://cerebrumbiologyacademy.com/online-neet-coaching-hyderabad',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-coaching-hyderabad',
  },

  twitter: { card: 'summary_large_image' as const },
}

export default function OnlineNEETCoachingHyderabadPage() {
  return <BestVerticalLanding config={buildOnlineOfflineCityConfig('hyderabad')} />
}
