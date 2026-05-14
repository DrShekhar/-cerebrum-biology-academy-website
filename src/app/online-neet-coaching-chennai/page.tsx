import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildOnlineOfflineCityConfig } from '@/data/online-vs-offline-cities'

export const metadata: Metadata = {
  title: 'Online NEET Coaching in Chennai | Live AIIMS Faculty | Cerebrum',
  description:
    'Online NEET coaching for Chennai students — live (not recorded) classes by AIIMS-trained faculty. Small batches of 15–20. No commute, same faculty as offline. Compare online vs offline for Chennai.',
  keywords: [
    'online neet coaching chennai',
    'best online neet coaching chennai',
    'live online neet coaching chennai',
    'online vs offline neet coaching chennai',
    'online neet biology coaching chennai',
    'online neet classes chennai',
    'aiims faculty online neet chennai',
  ],
  openGraph: {
    title: 'Online NEET Coaching in Chennai | AIIMS Faculty',
    description:
      'Live online NEET coaching for Chennai students. Same AIIMS faculty as offline, no commute.',
    url: 'https://cerebrumbiologyacademy.com/online-neet-coaching-chennai',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-coaching-chennai',
  },
}

export default function OnlineNEETCoachingChennaiPage() {
  return <BestVerticalLanding config={buildOnlineOfflineCityConfig('chennai')} />
}
