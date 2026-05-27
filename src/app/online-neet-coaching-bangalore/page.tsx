import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildOnlineOfflineCityConfig } from '@/data/online-vs-offline-cities'

export const metadata: Metadata = {
  title: 'Online NEET Coaching in Bangalore | Live AIIMS Faculty | Cerebrum',
  description:
    'Online NEET coaching for Bangalore students — live (not recorded) classes by AIIMS-trained faculty. Small batches of 15–20. No commute, same faculty as offline. Compare online vs offline for Bangalore.',
  keywords: [
    'online neet coaching bangalore',
    'best online neet coaching bangalore',
    'live online neet coaching bangalore',
    'online vs offline neet coaching bangalore',
    'online neet biology coaching bangalore',
    'online neet classes bangalore',
    'aiims faculty online neet bangalore',
  ],
  openGraph: {
    title: 'Online NEET Coaching in Bangalore | AIIMS Faculty',
    description:
      'Live online NEET coaching for Bangalore students. Same AIIMS faculty as offline, no commute.',
    url: 'https://cerebrumbiologyacademy.com/online-neet-coaching-bangalore',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-coaching-bangalore',
  },

  twitter: { card: 'summary_large_image' as const },
}

export default function OnlineNEETCoachingBangalorePage() {
  return <BestVerticalLanding config={buildOnlineOfflineCityConfig('bangalore')} />
}
