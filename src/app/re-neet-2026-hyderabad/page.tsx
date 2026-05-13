import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildReNEETCityConfig } from '@/data/re-neet-city-config'

export const metadata: Metadata = {
  title: 'RE-NEET 2026 Coaching in Hyderabad | Online Biology Crash Course',
  description:
    'RE-NEET 2026 coaching for Hyderabad students (Telangana + AP) after the 12 May NEET cancellation. Online biology-only AIIMS-trained crash — alongside your Sri Chaitanya / Narayana / Aakash Hyderabad main coaching.',
  keywords: [
    're-neet 2026 hyderabad',
    're-neet coaching hyderabad',
    'neet reconduct coaching hyderabad',
    'best re-neet coaching hyderabad',
    'neet retest coaching hyderabad',
    'sri chaitanya alternative re-neet',
    'narayana alternative re-neet',
    'aakash hyderabad re-neet',
  ],
  openGraph: {
    title: 'RE-NEET 2026 Coaching in Hyderabad | Biology Crash Course',
    description: 'Biology-only AIIMS-trained RE-NEET crash for Hyderabad students.',
    url: 'https://cerebrumbiologyacademy.com/re-neet-2026-hyderabad',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/re-neet-2026-hyderabad',
  },
}

export default function ReNEETHyderabadPage() {
  return <BestVerticalLanding config={buildReNEETCityConfig('hyderabad')} />
}
