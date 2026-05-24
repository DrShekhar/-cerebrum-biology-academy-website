import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildReNEETCityConfig } from '@/data/re-neet-city-config'

export const metadata: Metadata = {
  title: 'RE-NEET 2026 Coaching in Mumbai | Online Biology Crash Course',
  description:
    'RE-NEET 2026 coaching for Mumbai students (Andheri, Thane, Borivali) after the 12 May NEET cancellation. Online biology-only AIIMS-trained crash — alongside your Mahesh Tutorials / the largest national NEET chain Mumbai / the 2nd-largest national NEET chain main coaching.',
  keywords: [
    're-neet 2026 mumbai',
    're-neet coaching mumbai',
    'neet reconduct coaching mumbai',
    'best re-neet coaching mumbai',
    'neet retest coaching mumbai andheri',
    'mahesh tutorials alternative re-neet',
    'allen mumbai re-neet',
    'aakash mumbai re-neet',
  ],
  openGraph: {
    title: 'RE-NEET 2026 Coaching in Mumbai | Biology Crash Course',
    description: 'Biology-only AIIMS-trained RE-NEET crash for Mumbai students.',
    url: 'https://cerebrumbiologyacademy.com/re-neet-2026-mumbai',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/re-neet-2026-mumbai',
  },
}

export default function ReNEETMumbaiPage() {
  return <BestVerticalLanding config={buildReNEETCityConfig('mumbai')} />
}
