/**
 * /biology-olympiad-tutor-heritage-xperiential-learning-school
 *
 * Per-school biology olympiad landing page for Heritage Xperiential
 * Learning School, Sector 62, Gurgaon.
 *
 * Primary keyword: "Biology Olympiad tutor Heritage Xperiential" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'heritage-xperiential-learning-school'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for Heritage Xperiential · Gurgaon',
  description:
    'NSEB & INBO coaching for Heritage Xperiential Learning School students in Sector 62, Gurgaon. Campbell Biology depth, OCSC + IBO pathway, IB-compatible.',
  keywords: [
    'Biology Olympiad tutor Heritage Xperiential',
    'NSEB coaching Heritage Xperiential',
    'INBO coaching Heritage Xperiential Learning School',
    'Heritage Xperiential biology olympiad',
    'NSEB tutor Sector 62 Gurgaon',
    'OCSC coaching Heritage Xperiential',
    'biology olympiad coaching Gurgaon',
    'IB Diploma plus NSEB Heritage Xperiential',
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
