/**
 * /ib-biology-tutor-shanghai-american-school
 *
 * Per-school IB Biology landing page for Shanghai American School (SAS)
 * Pudong + Puxi twin campuses. SAS is one of mainland China's largest IB
 * + AP dual-curriculum international schools — first AP Capstone school
 * in Asia.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['shanghai-american-school'].
 * Schemas via IBBiologySchoolSchemas with en-CN inLanguage so Google +
 * LLMs route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor SAS Shanghai" — a school-name long-tail.
 * Geo-gate: hidden from India IPs via hideFromCountries(['IN']) + middleware.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'
import { hideFromCountries } from '@/lib/geo/hideFromCountries'

export const dynamic = 'force-dynamic'

const SLUG = 'shanghai-american-school'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for SAS Shanghai (Pudong + Puxi) · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Shanghai American School students at Pudong + Puxi. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus, CST evening live classes.',
  keywords: [
    'IB Biology tutor SAS Shanghai',
    'IB Biology coaching Shanghai American School',
    'IB Biology HL tutor SAS Pudong',
    'IB Biology HL tutor SAS Puxi',
    'IB Biology IA help SAS Shanghai',
    'SAS Shanghai IB Biology tutoring',
    'IB Biology examiner SAS Shanghai',
    'online IB Biology tutor Shanghai',
    'IB Biology tutor Shanghai American School',
    'AP Capstone biology tutor SAS',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-CN',
})

export default async function Page() {
  await hideFromCountries(['IN'])

  if (!school) notFound()
  return (
    <>
      <IBBiologySchoolSchemas school={school} />
      <IBBiologySchoolTemplate school={school} />
    </>
  )
}
