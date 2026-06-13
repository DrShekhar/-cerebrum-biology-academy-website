import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'NRI Medical Admission Counseling | 15% NRI Quota at AIIMS, JIPMER, Manipal | Cerebrum',
  description:
    'End-to-end NRI medical admission counseling for Indian-origin families in UAE, USA, UK, Canada, Singapore, Saudi, Qatar, Oman, Australia, and Africa. Navigate 15% NRI quota at AIIMS Delhi, JIPMER Puducherry, MMMC Manipal, KMC Mangalore, JSS Mysuru, and other top deemed universities. Eligibility, documents, NEET cut-offs, OCI verification, application timelines.',
  keywords:
    'NRI medical admission counseling, NRI quota medical colleges India, NRI quota AIIMS Delhi, NRI quota JIPMER, NRI quota Manipal, NRI quota KMC Mangalore, OCI medical admission, NRI NEET counseling, NRI 15% quota MBBS, NRI medical college guidance, NRI MBBS India admission, Indian-origin medical college, NRI deemed university medical',
  path: '/nri-medical-admission-counseling',
})

export default function Page() {
  return <PageContent />
}
