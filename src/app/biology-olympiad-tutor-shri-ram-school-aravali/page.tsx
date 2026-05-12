/**
 * /biology-olympiad-tutor-shri-ram-school-aravali
 *
 * Per-school biology olympiad landing page for The Shri Ram School,
 * Aravali, Gurgaon.
 *
 * Primary keyword: "Biology Olympiad tutor Shri Ram School Aravali" —
 * a school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'shri-ram-school-aravali'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for TSRS Aravali · Gurgaon',
  description:
    'NSEB & INBO coaching for The Shri Ram School Aravali students in Gurgaon. Campbell Biology depth, OCSC + IBO pathway, IB Diploma compatible, live online IST.',
  keywords: [
    'Biology Olympiad tutor Shri Ram School Aravali',
    'NSEB coaching TSRS Aravali',
    'INBO coaching Shri Ram School Aravali',
    'TSRS Aravali biology olympiad',
    'NSEB tutor Shri Ram School Gurgaon',
    'OCSC coaching TSRS Aravali',
    'biology olympiad coaching Gurgaon',
    'IB Diploma plus NSEB Shri Ram School',
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
