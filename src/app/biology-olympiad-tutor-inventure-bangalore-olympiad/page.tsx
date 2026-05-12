/**
 * /biology-olympiad-tutor-inventure-bangalore-olympiad
 *
 * Per-school biology olympiad landing page for Inventure Academy,
 * Whitefield / Sarjapur, Bangalore.
 *
 * Slug uses -olympiad suffix to distinguish from
 * /ib-biology-tutor-inventure-bangalore (IB cluster).
 *
 * Primary keyword: "Biology Olympiad tutor Inventure Bangalore" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'inventure-bangalore-olympiad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for Inventure Academy · Bangalore',
  description:
    'NSEB & INBO coaching for Inventure Academy students in Whitefield / Sarjapur, Bangalore. Campbell depth, OCSC + IBO pathway, IGCSE + IB-compatible, live online.',
  keywords: [
    'Biology Olympiad tutor Inventure Bangalore',
    'NSEB coaching Inventure Academy',
    'INBO coaching Inventure Bangalore',
    'Inventure biology olympiad',
    'NSEB tutor Whitefield Bangalore',
    'OCSC coaching Inventure Academy',
    'biology olympiad coaching Bangalore',
    'IB Diploma plus NSEB Inventure',
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
