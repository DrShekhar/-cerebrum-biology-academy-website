/**
 * /ib-biology-tutor-lancers-gurgaon
 *
 * Per-school IB Biology landing page for Lancers International School (Gurgaon).
 * Built from IBBiologySchoolTemplate + ibBiologySchools['lancers-gurgaon'].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'lancers-gurgaon'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Lancers International · Gurgaon · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Lancers International School students in Gurgaon. Examiner-calibrated feedback, IA + EE mentorship, optional IB+NEET dual track, IST evening classes.',
  keywords: [
    'IB Biology tutor Lancers International',
    'IB Biology coaching Lancers International Gurgaon',
    'IB Biology HL tutor Lancers International',
    'IB Biology SL tutor Lancers International',
    'IB Biology IA help Lancers International',
    'Lancers International IB Biology tutoring',
    'IB+NEET tutor Lancers International Gurgaon',
    'online IB Biology tutor Gurgaon',
    'IB Biology tutor Lancers International School',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-IN',
})

export default function Page() {
  if (!school) notFound()
  return (
    <>
      <IBBiologySchoolSchemas school={school} />
      <IBBiologySchoolTemplate school={school} />
    </>
  )
}
