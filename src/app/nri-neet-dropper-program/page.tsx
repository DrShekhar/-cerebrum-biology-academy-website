import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title:
    'NRI NEET Dropper Program 2026 | Second-Attempt Biology Coaching for Overseas Indian Students | Cerebrum',
  description:
    'Dedicated 10-12 month NEET 2026 dropper Biology programme for NRI and OCI students in UAE, USA, UK, Canada, Singapore, Saudi, Qatar, Africa. Study for NEET from abroad with live classes scheduled across Gulf, SE-Asia, UK and US/Canada time zones plus recordings, diagnostic-led gap-fill, AIIMS faculty, weekly 1:1 doubt slots, and NRI/OCI-quota cut-off targeting for AIIMS, JIPMER, Manipal, KMC and deemed colleges. 98% NEET qualification rate, 67+ AIIMS selections since 2014.',
  keywords:
    'NRI NEET dropper program, NEET repeater coaching NRI, NRI dropper program 2026, NEET improvement program overseas, NRI NEET second attempt, NRI NEET retake biology, dropper biology coaching abroad, NEET 2026 dropper Dubai, NEET 2026 dropper Singapore, NRI gap year NEET, NRI medical college 2nd attempt, NRI quota cut-off NEET',
  path: '/nri-neet-dropper-program',
})

export default function Page() {
  return <PageContent />
}
