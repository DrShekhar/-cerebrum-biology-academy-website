/**
 * /biology-olympiad-tutor-cathedral-school-mumbai-olympiad
 *
 * Per-school biology olympiad landing page for The Cathedral and
 * John Connon School, Fort, Mumbai.
 *
 * Slug uses -olympiad suffix to distinguish from
 * /ib-biology-tutor-cathedral-mumbai (IB cluster).
 *
 * Primary keyword: "Biology Olympiad tutor Cathedral School Mumbai" —
 * a school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'cathedral-school-mumbai-olympiad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for Cathedral School · Mumbai',
  description:
    'NSEB & INBO coaching for Cathedral and John Connon School students in Fort, Mumbai. Campbell depth, ISC + IB compatible, OCSC + IBO pathway, live online IST.',
  keywords: [
    'Biology Olympiad tutor Cathedral School Mumbai',
    'NSEB coaching Cathedral Mumbai',
    'INBO coaching Cathedral and John Connon',
    'Cathedral Mumbai biology olympiad',
    'NSEB tutor Fort Mumbai',
    'OCSC coaching Cathedral Mumbai',
    'biology olympiad coaching South Mumbai',
    'ISC plus NSEB Cathedral Mumbai',
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
