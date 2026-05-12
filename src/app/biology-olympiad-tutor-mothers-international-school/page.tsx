/**
 * /biology-olympiad-tutor-mothers-international-school
 *
 * Per-school biology olympiad landing page for Mother's International
 * School, Hauz Khas, New Delhi.
 *
 * Primary keyword: "Biology Olympiad tutor Mother's International" —
 * a school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'mothers-international-school'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: "Biology Olympiad Tutor for Mother's International · Delhi",
  description:
    "NSEB & INBO coaching for Mother's International School students in Hauz Khas, South Delhi. Campbell Biology depth, OCSC + IBO pathway, AIIMS-trained faculty.",
  keywords: [
    "Biology Olympiad tutor Mother's International",
    "NSEB coaching Mother's International School",
    "INBO coaching Mother's International",
    "Mother's International biology olympiad",
    'NSEB tutor Hauz Khas',
    "OCSC coaching Mother's International Delhi",
    "Campbell Biology tutor Mother's International",
    'biology olympiad coaching Hauz Khas',
  ],
  canonical: `/biology-olympiad-tutor-${SLUG}`,
})

export default function Page() {
  if (!school) notFound()
  return (
    <>
      <IndiaOlympiadSchoolSchemas school={school} />
      <IndiaOlympiadSchoolTemplate school={school} />
    </>
  )
}
