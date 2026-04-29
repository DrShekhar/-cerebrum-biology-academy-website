/**
 * /ap-biology-tutor-northern-virginia-dc
 *
 * AP Biology US metro page targeting Northern Virginia + DC + Montgomery
 * County, with TJHSST as the flagship anchor. Built from
 * APBiologyCityTemplate + apBiologyMetros[northern-virginia-dc].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'northern-virginia-dc'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title:
    'AP Biology Tutor Northern Virginia & DC | TJHSST · Sidwell · Walt Whitman | Cerebrum Academy',
  description:
    'AP Biology tutoring for NoVa / DC students — Thomas Jefferson HSST, Sidwell Friends, St. Albans, Walt Whitman, Bethesda-Chevy Chase, Langley, McLean and more. Integrated AP-5 + USABO Semifinal track. PhD biology faculty, FRQ rubric mastery, Eastern Time. From $1,800.',
  keywords: [
    'AP Biology tutor Northern Virginia',
    'AP Biology tutor Fairfax',
    'AP Biology tutor DC',
    'AP Biology tutor Bethesda',
    'AP Biology tutor McLean',
    'AP Bio tutor TJHSST',
    'AP Bio tutor Thomas Jefferson HSST',
    'AP Bio tutor Sidwell Friends',
    'AP Bio tutor St Albans',
    'AP Bio tutor Walt Whitman',
    'AP Bio tutor Bethesda-Chevy Chase',
    'AP Biology score 5 Northern Virginia',
    'AP Biology FRQ tutor Virginia',
    'USABO tutor Northern Virginia',
    'BS/MD prep DC Georgetown',
    'private AP Biology tutor DC',
    'online AP Biology tutor Virginia',
    'AP Biology tutor Holton-Arms',
    'AP Biology tutor Wootton',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorNorthernVirginiaDCPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
