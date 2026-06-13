import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title:
    'NRI NEET Foundation Class 9-10 | Early Biology Preparation for Indian-Origin Students | Cerebrum',
  description:
    'Live online NEET Foundation programme for Class 9-10 NRI students in UAE, USA, UK, Canada, Singapore, Saudi, Qatar, Oman, Africa. NCERT-aligned biology fundamentals, NRI-quota pathway awareness, IGCSE / IB / Cambridge bridge module. AIIMS faculty led, weekly 1:1 doubt slots, time-zone-friendly batches.',
  keywords:
    'NRI NEET foundation program, Class 9 NEET preparation NRI, Class 10 NEET preparation NRI, NEET early preparation overseas, NEET foundation Dubai, NEET foundation Singapore, NEET foundation UK, NRI biology coaching Class 9, NRI biology coaching Class 10, IGCSE to NEET bridge, IB to NEET bridge, foundation NEET overseas, Indian-origin Class 9 biology',
  path: '/nri-neet-foundation-program',
})

export default function Page() {
  return <PageContent />
}
