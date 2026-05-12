/**
 * /biology-olympiad-tutor-vasant-valley-school
 *
 * Per-school biology olympiad landing page for Vasant Valley School,
 * Vasant Kunj, New Delhi.
 *
 * Primary keyword: "Biology Olympiad tutor Vasant Valley" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'vasant-valley-school'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for Vasant Valley · Delhi',
  description:
    'NSEB & INBO coaching for Vasant Valley School students in South Delhi. Campbell Biology depth, OCSC + IBO pathway, AIIMS-trained faculty, live online IST.',
  keywords: [
    'Biology Olympiad tutor Vasant Valley',
    'NSEB coaching Vasant Valley School',
    'INBO coaching Vasant Valley',
    'Vasant Valley biology olympiad',
    'NSEB tutor Vasant Kunj',
    'OCSC coaching Vasant Valley School',
    'Campbell Biology tutor Vasant Valley',
    'biology olympiad coaching South Delhi',
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
