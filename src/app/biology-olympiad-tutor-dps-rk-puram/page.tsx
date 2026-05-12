/**
 * /biology-olympiad-tutor-dps-rk-puram
 *
 * Per-school biology olympiad landing page for Delhi Public School
 * RK Puram, New Delhi. Built from IndiaOlympiadSchoolTemplate +
 * indiaOlympiadSchools['dps-rk-puram']. Schemas via
 * IndiaOlympiadSchoolSchemas with en-IN inLanguage.
 *
 * Primary keyword: "Biology Olympiad tutor DPS RK Puram" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'dps-rk-puram'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for DPS RK Puram · Delhi',
  description:
    'NSEB & INBO coaching for DPS RK Puram students in New Delhi. AIIMS-trained faculty, Campbell Biology depth, OCSC + IBO pathway, live online IST classes.',
  keywords: [
    'Biology Olympiad tutor DPS RK Puram',
    'NSEB coaching DPS RK Puram',
    'INBO coaching DPS RK Puram',
    'DPS RK Puram biology olympiad',
    'NSEB tutor Delhi Public School RK Puram',
    'OCSC coaching DPS RK Puram',
    'Campbell Biology tutor DPS RK Puram',
    'biology olympiad coaching South Delhi',
    'NSEB INBO coaching Delhi NCR',
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
