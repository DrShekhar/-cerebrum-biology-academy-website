/**
 * /ap-biology-tutor-stuyvesant
 *
 * Per-school feeder page for Stuyvesant High School students
 * (Manhattan, NYC). Built from APBiologySchoolTemplate +
 * apBiologySchools[stuyvesant]. Trademark-safe phrasing throughout.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'stuyvesant'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for Stuyvesant Students · NYC · Cerebrum',
  description:
    "AP Biology tutoring for Stuyvesant HS students — calibrated to Stuy's pace. PhD faculty, FRQ mastery, USABO Semifinal track. ET live classes. From $1,800.",
  keywords: [
    'AP Biology tutor Stuyvesant',
    'AP Biology tutor Stuyvesant High School',
    'AP Bio tutor Stuy NYC',
    'AP Biology tutoring Stuyvesant Manhattan',
    'Stuyvesant USABO tutor',
    'Stuy biology olympiad coach',
    'AP Biology Score 5 Stuyvesant',
    'Stuyvesant private biology tutor',
    'online AP Biology tutor Stuy',
    'Stuyvesant pre-med biology coaching',
    'NYU Honors prep Stuyvesant',
    'Stony Brook BS/MD prep Stuyvesant',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorStuyvesantPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
