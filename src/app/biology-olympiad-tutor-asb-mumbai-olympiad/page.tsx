/**
 * /biology-olympiad-tutor-asb-mumbai-olympiad
 *
 * Per-school biology olympiad landing page for American School of
 * Bombay (ASB), Bandra Kurla Complex, Mumbai.
 *
 * Slug uses -olympiad suffix to distinguish from
 * /ib-biology-tutor-asb-mumbai (IB cluster).
 *
 * Primary keyword: "Biology Olympiad tutor ASB Mumbai" — a school-name
 * long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIndiaOlympiadSchoolMetadata } from '@/lib/seo/metadata'
import IndiaOlympiadSchoolTemplate from '@/components/india-olympiad/IndiaOlympiadSchoolTemplate'
import { IndiaOlympiadSchoolSchemas } from '@/components/india-olympiad/IndiaOlympiadSchoolSchemas'
import { getSchoolBySlug } from '@/data/india-olympiad/schools'

const SLUG = 'asb-mumbai-olympiad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIndiaOlympiadSchoolMetadata({
  title: 'Biology Olympiad Tutor for ASB Mumbai · BKC',
  description:
    'NSEB & INBO coaching for American School of Bombay students in Bandra Kurla Complex, Mumbai. Campbell depth, AP + IB compatible, OCSC + IBO pathway.',
  keywords: [
    'Biology Olympiad tutor ASB Mumbai',
    'NSEB coaching ASB Mumbai',
    'INBO coaching American School of Bombay',
    'ASB Mumbai biology olympiad',
    'NSEB tutor BKC Mumbai',
    'OCSC coaching ASB Mumbai',
    'biology olympiad coaching Mumbai',
    'AP Biology plus NSEB ASB',
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
