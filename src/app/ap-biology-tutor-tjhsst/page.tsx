/**
 * /ap-biology-tutor-tjhsst
 *
 * Per-school feeder page targeting Thomas Jefferson High School for
 * Science and Technology students (Alexandria, VA). Built from
 * APBiologySchoolTemplate + apBiologySchools[tjhsst].
 *
 * Trademark notice: school name used descriptively only. Footer trust
 * strip in the template explicitly disclaims affiliation.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'tjhsst'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for TJHSST Students · Cerebrum',
  description:
    "AP Biology tutoring for Thomas Jefferson HSST students — calibrated to TJ's near-college pace. PhD faculty, FRQ mastery, AP-5 + USABO Semifinal track. From $1,800.",
  keywords: [
    'AP Biology tutor TJHSST',
    'AP Biology tutor Thomas Jefferson HSST',
    'AP Bio tutor TJ Alexandria',
    'AP Biology tutoring TJ Fairfax County',
    'TJHSST USABO tutor',
    'TJ Biology Olympiad coach',
    'AP Biology Score 5 TJHSST',
    'AP Bio FRQ tutor TJ',
    'TJHSST private biology tutor',
    'online AP Biology tutor TJHSST',
    'TJ pre-med biology coaching',
    'TJHSST research mentorship biology',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorTJHSSTPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
