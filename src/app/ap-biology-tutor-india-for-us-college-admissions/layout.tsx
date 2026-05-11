import type { Metadata } from 'next'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'

// India-NRI hub for AP Biology. Audience is Indian students applying to US
// colleges, so we keep the en-US hreflang from the AP Biology metro builder
// (target reader consumes US-style content) but override the canonical to
// the India-specific hub URL. Pricing remains in USD.
export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor in India for US College Admissions | Cerebrum',
  description:
    'AP Biology coaching for Indian students applying to US colleges. AIIMS-trained PhD faculty, IST-aligned classes, AP-5 strategy + SAT II Biology. From $1,800.',
  keywords: [
    'ap biology tutor india',
    'ap biology coaching india',
    'ap biology for indian students',
    'ap biology for us college admissions',
    'ap biology tutor mumbai',
    'ap biology tutor delhi',
    'ap biology tutor bangalore',
    'ap biology tutor hyderabad',
    'ap biology tutor gurgaon',
    'ap biology online tutor india',
    'ap bio tutor india',
    'ap biology coaching for ivy league',
    'ap biology coaching for mit stanford',
    'ap biology score 5 india',
    'ap biology frq coaching india',
    'ap biology cbse students',
    'ap biology icse students',
    'ap biology ib hl students',
    'ap biology indian school',
    'ap biology college board india',
    'sat biology coaching india',
    'us college admissions biology india',
    'indian students us colleges biology',
    'best ap biology tutor india',
    'ap biology private tutor india',
    'ap biology 1-on-1 tutoring india',
  ],
  canonical: '/ap-biology-tutor-india-for-us-college-admissions',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
