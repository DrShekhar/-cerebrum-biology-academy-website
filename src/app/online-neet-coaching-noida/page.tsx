import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildOnlineOfflineCityConfig } from '@/data/online-vs-offline-cities'

export const metadata: Metadata = {
  title: 'Online NEET Coaching in Noida | Live AIIMS Faculty | Cerebrum',
  description:
    'Online NEET coaching for Noida students — live (not recorded) classes by AIIMS-trained faculty. Small batches of 15–20. No commute, same faculty as offline. Compare online vs offline for Noida.',
  keywords: [
    'online neet coaching noida',
    'best online neet coaching noida',
    'live online neet coaching noida',
    'online vs offline neet coaching noida',
    'online neet biology coaching noida',
    'online neet classes noida',
    'aiims faculty online neet noida',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Online NEET Coaching in Noida | AIIMS Faculty',
    description:
      'Live online NEET coaching for Noida students. Same AIIMS faculty as offline, no commute.',
    url: 'https://cerebrumbiologyacademy.com/online-neet-coaching-noida',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-coaching-noida',
  },
}

export default function OnlineNEETCoachingNoidaPage() {
  return <BestVerticalLanding config={buildOnlineOfflineCityConfig('noida')} />
}
