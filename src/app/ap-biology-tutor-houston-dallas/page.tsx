/**
 * /ap-biology-tutor-houston-dallas
 *
 * AP Biology US metro page targeting Houston + DFW + Austin (the Texas
 * STEM corridor). Built from APBiologyCityTemplate + apBiologyMetros[houston-dallas].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'houston-dallas'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title:
    'AP Biology Tutor Houston · Dallas · Austin | TAMS · Clements · Plano West · St. Mark’s | Cerebrum Academy',
  description:
    "AP Biology tutoring for Texas students — Bellaire, DeBakey, Carnegie Vanguard, Strake Jesuit, St. John's, Clements, Seven Lakes, Plano West, Highland Park, St. Mark's, TAMS, LASA Austin and more. PhD biology faculty, FRQ rubric mastery, Central Time. From $1,800.",
  keywords: [
    'AP Biology tutor Houston',
    'AP Biology tutor Dallas',
    'AP Biology tutor Austin',
    'AP Biology tutor Plano',
    'AP Biology tutor Sugar Land',
    'AP Biology tutor Katy',
    'AP Bio tutor Bellaire',
    'AP Bio tutor DeBakey',
    'AP Bio tutor Carnegie Vanguard',
    'AP Bio tutor Strake Jesuit',
    'AP Bio tutor Plano West',
    'AP Bio tutor Highland Park Dallas',
    'AP Bio tutor St Marks School Texas',
    'AP Bio tutor TAMS',
    'AP Bio tutor LASA Austin',
    'AP Biology score 5 Texas',
    'USABO tutor Texas',
    'BS/MD prep Texas Baylor 8-Year UT Southwestern',
    'private AP Biology tutor Houston',
    'online AP Biology tutor Texas',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorHoustonDallasPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
