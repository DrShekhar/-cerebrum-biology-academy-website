/**
 * /biology-olympiad-tutor-modern-school-barakhamba
 *
 * Per-school biology olympiad landing page for Modern School,
 * Barakhamba Road, New Delhi.
 *
 * Primary keyword: "Biology Olympiad tutor Modern School Barakhamba" —
 * a school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'modern-school-barakhamba'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for Modern School Barakhamba · Delhi',
  description:
    'NSEB & INBO coaching for Modern School Barakhamba Road students in central New Delhi. Campbell Biology depth, OCSC + IBO pathway, live online IST classes.',
  keywords: [
    'Biology Olympiad tutor Modern School Barakhamba',
    'NSEB coaching Modern School Barakhamba',
    'INBO coaching Modern School Barakhamba',
    'Modern School Barakhamba biology olympiad',
    'NSEB tutor Modern School Delhi',
    'biology olympiad coaching central Delhi',
    'Campbell Biology tutor Modern School Barakhamba',
    'OCSC coaching Modern School Barakhamba',
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
