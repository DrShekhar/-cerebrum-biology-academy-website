import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildReNEETCityConfig } from '@/data/re-neet-city-config'

export const metadata: Metadata = {
  title: 'RE-NEET 2026 Coaching in Kota | Online Crash Course — No Relocation',
  description:
    'RE-NEET 2026 coaching for Kota students after the 12 May NEET cancellation. Online biology-only AIIMS-trained crash course — no need to keep paying hostel + mess for the reconduct window. 6–8 week structured prep.',
  keywords: [
    're-neet 2026 kota',
    're-neet coaching kota',
    'neet reconduct coaching kota',
    'kota neet 2026 cancelled',
    'best re-neet coaching kota',
    'online re-neet coaching from kota',
    'kota alternative re-neet 2026',
    'neet retest coaching kota',
  ],
  openGraph: {
    title: 'RE-NEET 2026 Coaching in Kota | Online Crash Course',
    description: 'Online biology-only AIIMS-trained RE-NEET crash for Kota students.',
    url: 'https://cerebrumbiologyacademy.com/re-neet-2026-kota',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/re-neet-2026-kota',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'RE-NEET 2026 Coaching in Kota | Online Crash Course — No Relocation',
    description:
      'RE-NEET 2026 coaching for Kota students after the 12 May NEET cancellation. Online biology-only AIIMS-trained crash course — no need to keep paying hostel + mess for the reconduct window. 6–8 week ...',
  },
}

export default function ReNEETKotaPage() {
  return <BestVerticalLanding config={buildReNEETCityConfig('kota')} />
}
