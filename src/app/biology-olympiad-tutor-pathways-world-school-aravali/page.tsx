/**
 * /biology-olympiad-tutor-pathways-world-school-aravali
 *
 * Per-school biology olympiad landing page for Pathways World School,
 * Aravali Hills, Gurgaon.
 *
 * Primary keyword: "Biology Olympiad tutor Pathways World School
 * Aravali" — a school-name long-tail distinct from
 * /ib-biology-tutor-pathways-aravali (IB cluster, different keyword).
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'pathways-world-school-aravali'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for Pathways Aravali · Gurgaon',
  description:
    'NSEB & INBO coaching for Pathways World School Aravali students in Gurgaon. Campbell Biology depth, OCSC + IBO pathway, IB Diploma compatible, live online.',
  keywords: [
    'Biology Olympiad tutor Pathways World School Aravali',
    'NSEB coaching Pathways Aravali',
    'INBO coaching Pathways Aravali',
    'Pathways Aravali biology olympiad',
    'NSEB tutor Aravali Hills Gurgaon',
    'OCSC coaching Pathways World School',
    'biology olympiad coaching Gurgaon',
    'IB Diploma plus NSEB Pathways Aravali',
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
