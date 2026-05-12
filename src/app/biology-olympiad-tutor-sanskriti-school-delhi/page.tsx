/**
 * /biology-olympiad-tutor-sanskriti-school-delhi
 *
 * Per-school biology olympiad landing page for Sanskriti School,
 * Chanakyapuri, New Delhi.
 *
 * Primary keyword: "Biology Olympiad tutor Sanskriti School" —
 * a school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'sanskriti-school-delhi'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for Sanskriti School · Delhi',
  description:
    'NSEB & INBO coaching for Sanskriti School students in Chanakyapuri, New Delhi. Campbell Biology depth, OCSC + IBO pathway, AIIMS-trained faculty, live online.',
  keywords: [
    'Biology Olympiad tutor Sanskriti School',
    'NSEB coaching Sanskriti School',
    'INBO coaching Sanskriti School',
    'Sanskriti School biology olympiad',
    'NSEB tutor Sanskriti Chanakyapuri',
    'OCSC coaching Sanskriti School Delhi',
    'Campbell Biology tutor Sanskriti School',
    'biology olympiad coaching Chanakyapuri',
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
