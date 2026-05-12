/**
 * /biology-olympiad-tutor-stonehill-bangalore-olympiad
 *
 * Per-school biology olympiad landing page for Stonehill International
 * School, Tumkur Road, Bangalore.
 *
 * Slug uses -olympiad suffix to distinguish from
 * /ib-biology-tutor-stonehill-bangalore (IB cluster).
 *
 * Primary keyword: "Biology Olympiad tutor Stonehill Bangalore" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'stonehill-bangalore-olympiad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for Stonehill · Bangalore',
  description:
    'NSEB & INBO coaching for Stonehill International School students in Tumkur Road, Bangalore. Campbell Biology depth, OCSC + IBO pathway, IB-compatible.',
  keywords: [
    'Biology Olympiad tutor Stonehill Bangalore',
    'NSEB coaching Stonehill International School',
    'INBO coaching Stonehill Bangalore',
    'Stonehill biology olympiad',
    'NSEB tutor Tumkur Road Bangalore',
    'OCSC coaching Stonehill Bangalore',
    'biology olympiad coaching Bangalore',
    'IB Diploma plus NSEB Stonehill',
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
