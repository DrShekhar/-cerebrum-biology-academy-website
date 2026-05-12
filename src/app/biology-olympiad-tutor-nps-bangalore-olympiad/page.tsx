/**
 * /biology-olympiad-tutor-nps-bangalore-olympiad
 *
 * Per-school biology olympiad landing page for National Public School
 * Bangalore (Indiranagar / Koramangala / Rajajinagar / Yeshwanthpur /
 * HSR and other campuses).
 *
 * Slug uses -olympiad suffix for namespace clarity.
 *
 * Primary keyword: "Biology Olympiad tutor NPS Bangalore" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'nps-bangalore-olympiad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for NPS Bangalore · Indiranagar Koramangala',
  description:
    'NSEB & INBO coaching for National Public School Bangalore students (Indiranagar, Koramangala, HSR, Rajajinagar). Campbell depth, OCSC + IBO pathway.',
  keywords: [
    'Biology Olympiad tutor NPS Bangalore',
    'NSEB coaching NPS Indiranagar',
    'NSEB coaching NPS Koramangala',
    'INBO coaching National Public School Bangalore',
    'NPS Bangalore biology olympiad',
    'NSEB tutor NPS HSR',
    'OCSC coaching NPS Bangalore',
    'biology olympiad coaching Bangalore CBSE',
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
