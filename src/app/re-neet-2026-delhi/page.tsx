import { Metadata } from 'next'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildReNEETCityConfig } from '@/data/re-neet-city-config'

export const metadata: Metadata = {
  title: 'RE-NEET 2026 Coaching in Delhi NCR | 6 Centres + Online Crash Course',
  description:
    'RE-NEET 2026 coaching for Delhi NCR students after the 12 May NEET cancellation. 5 offline centres (South Ext, Rohini, Green Park, Gurugram, Faridabad, Noida) + online live AIIMS-trained crash course.',
  keywords: [
    're-neet 2026 delhi',
    're-neet coaching delhi',
    're-neet coaching delhi ncr',
    'neet reconduct coaching delhi',
    'best re-neet coaching delhi',
    're-neet coaching gurugram noida faridabad',
    'neet retest coaching delhi',
    'aiims faculty re-neet delhi',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'RE-NEET 2026 Coaching in Delhi NCR | 6 Centres + Online',
    description: '6 NCR centres + online live AIIMS-trained RE-NEET crash course.',
    url: 'https://cerebrumbiologyacademy.com/re-neet-2026-delhi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/re-neet-2026-delhi',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'RE-NEET 2026 Coaching in Delhi NCR | 6 Centres + Online Crash Course',
    description: 'RE-NEET 2026 coaching for Delhi NCR students after the 12 May NEET cancellation. 5 offline centres (South Ext, Rohini, Green Park, Gurugram, Faridabad, Noida) + online live AIIMS-trained crash course.',
  },
}

export default function ReNEETDelhiPage() {
  return (
    <>
      <DelhiAreaSchema pageSlug="re-neet-2026-delhi" />
      <BestVerticalLanding config={buildReNEETCityConfig('delhi')} />
    </>
  )
}
