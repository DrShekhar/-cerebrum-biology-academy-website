import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildOnlineOfflineCityConfig } from '@/data/online-vs-offline-cities'

export const metadata: Metadata = {
  title: 'Online NEET Coaching in Gurugram | Live AIIMS Faculty | Cerebrum',
  description:
    'Online NEET coaching for Gurugram students — live (not recorded) classes by AIIMS-trained faculty. Small batches of 15–20. No commute, same faculty as offline. Compare online vs offline for Gurugram.',
  keywords: [
    'online neet coaching gurugram',
    'best online neet coaching gurugram',
    'live online neet coaching gurugram',
    'online vs offline neet coaching gurugram',
    'online neet biology coaching gurugram',
    'online neet classes gurugram',
    'aiims faculty online neet gurugram',
  ],
  openGraph: {
    title: 'Online NEET Coaching in Gurugram | AIIMS Faculty',
    description:
      'Live online NEET coaching for Gurugram students. Same AIIMS faculty as offline, no commute.',
    url: 'https://cerebrumbiologyacademy.com/online-neet-coaching-gurugram',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-coaching-gurugram',
  },
}

export default function OnlineNEETCoachingGurugramPage() {
  return <BestVerticalLanding config={buildOnlineOfflineCityConfig('gurugram')} />
}
