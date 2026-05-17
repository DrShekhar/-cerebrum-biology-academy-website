import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildOnlineOfflineCityConfig } from '@/data/online-vs-offline-cities'

export const metadata: Metadata = {
  title: 'Online NEET Coaching in Delhi | Live AIIMS Faculty | Cerebrum',
  description:
    'Online NEET coaching for Delhi students — live (not recorded) classes by AIIMS-trained faculty. Small batches of 15–20. No commute, same faculty as offline. Compare online vs offline for Delhi.',
  keywords: [
    'online neet coaching delhi',
    'best online neet coaching delhi',
    'live online neet coaching delhi',
    'online vs offline neet coaching delhi',
    'online neet biology coaching delhi',
    'online neet classes delhi',
    'aiims faculty online neet delhi',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Online NEET Coaching in Delhi | AIIMS Faculty',
    description:
      'Live online NEET coaching for Delhi students. Same AIIMS faculty as offline, no commute.',
    url: 'https://cerebrumbiologyacademy.com/online-neet-coaching-delhi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-coaching-delhi',
  },
}

export default function OnlineNEETCoachingDelhiPage() {
  return <BestVerticalLanding config={buildOnlineOfflineCityConfig('delhi')} />
}
