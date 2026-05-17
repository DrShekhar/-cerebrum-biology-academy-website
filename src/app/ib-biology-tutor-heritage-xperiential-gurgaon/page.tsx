/**
 * /ib-biology-tutor-heritage-xperiential-gurgaon
 *
 * Per-school IB Biology landing page for Heritage Xperiential Learning
 * School (Sector 62, Gurugram). Flagship campus of the Heritage Schools
 * group; IB World School authorised for the Diploma Programme. Senior
 * school offers both IB DP and CBSE — students self-select at Grade 11.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['heritage-xperiential-gurgaon'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Heritage Xperiential" — a school-name
 * long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'heritage-xperiential-gurgaon'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Heritage Xperiential · Gurgaon · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Heritage Xperiential Learning School students, Sector 62 Gurgaon. Examiner-led faculty, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Heritage Xperiential',
    'IB Biology coaching Heritage Xperiential',
    'IB Biology HL tutor Heritage Xperiential',
    'IB Biology SL tutor Heritage Xperiential',
    'IB Biology IA help Heritage Xperiential',
    'IB Biology EE tutor Heritage Xperiential',
    'Heritage Xperiential IB Biology tutoring',
    'IB Biology examiner Heritage Xperiential Gurgaon',
    'IB Biology tutor Sector 62 Gurgaon',
    'IB Biology tutor near Heritage Xperiential Gurgaon',
    'online IB Biology tutor Gurgaon',
    'IB+NEET coaching Heritage Xperiential',
    'experiential learning IB Biology tutor',
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
