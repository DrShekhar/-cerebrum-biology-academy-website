/**
 * /biology-olympiad-tutor-dais-mumbai-olympiad
 *
 * Per-school biology olympiad landing page for Dhirubhai Ambani
 * International School (DAIS), Bandra Kurla Complex, Mumbai.
 *
 * Slug uses -olympiad suffix to distinguish from
 * /ib-biology-tutor-dhirubhai-ambani-mumbai (IB cluster).
 *
 * Primary keyword: "Biology Olympiad tutor DAIS Mumbai" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'dais-mumbai-olympiad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for DAIS Mumbai · BKC',
  description:
    'NSEB & INBO coaching for Dhirubhai Ambani International School students in Bandra Kurla Complex, Mumbai. Campbell depth, OCSC + IBO pathway, IB-compatible.',
  keywords: [
    'Biology Olympiad tutor DAIS Mumbai',
    'NSEB coaching DAIS Mumbai',
    'INBO coaching Dhirubhai Ambani International School',
    'DAIS biology olympiad',
    'NSEB tutor BKC Mumbai',
    'OCSC coaching DAIS Mumbai',
    'biology olympiad coaching Mumbai',
    'IB Diploma plus NSEB DAIS',
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
