/**
 * /ib-biology-tutor-mahatma-gandhi-international-ahmedabad
 *
 * Per-school IB Biology landing page for Mahatma Gandhi International School
 * (Ahmedabad). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['mahatma-gandhi-international-ahmedabad']. Schemas via IBBiologySchoolSchemas
 * with en-IN inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor MGIS Ahmedabad" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'mahatma-gandhi-international-ahmedabad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for MGIS Ahmedabad · Ahmedabad · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Mahatma Gandhi International School students in Ahmedabad. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor MGIS Ahmedabad',
    'IB Biology coaching MGIS Ahmedabad',
    'IB Biology HL tutor MGIS Ahmedabad',
    'IB Biology SL tutor MGIS Ahmedabad',
    'IB Biology IA help MGIS Ahmedabad',
    'MGIS Ahmedabad IB Biology tutoring',
    'IB Biology examiner MGIS Ahmedabad',
    'online IB Biology tutor Ahmedabad',
    'IB Biology tutor Mahatma Gandhi International School',
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
