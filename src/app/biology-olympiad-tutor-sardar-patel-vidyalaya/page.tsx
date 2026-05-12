/**
 * /biology-olympiad-tutor-sardar-patel-vidyalaya
 *
 * Per-school biology olympiad landing page for Sardar Patel Vidyalaya,
 * Lodi Estate, New Delhi.
 *
 * Primary keyword: "Biology Olympiad tutor Sardar Patel Vidyalaya" —
 * a school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'sardar-patel-vidyalaya'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for Sardar Patel Vidyalaya · Delhi',
  description:
    'NSEB & INBO coaching for Sardar Patel Vidyalaya students in Lodi Estate, central New Delhi. Campbell Biology depth, OCSC + IBO pathway, AIIMS-trained faculty.',
  keywords: [
    'Biology Olympiad tutor Sardar Patel Vidyalaya',
    'NSEB coaching Sardar Patel Vidyalaya',
    'INBO coaching SPV Delhi',
    'Sardar Patel Vidyalaya biology olympiad',
    'NSEB tutor Lodi Estate',
    'OCSC coaching SPV Delhi',
    'Campbell Biology tutor Sardar Patel Vidyalaya',
    'biology olympiad coaching central Delhi',
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
