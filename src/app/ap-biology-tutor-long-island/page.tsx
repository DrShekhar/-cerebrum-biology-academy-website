/**
 * /ap-biology-tutor-long-island
 *
 * AP Biology US metro page targeting Long Island — the Nassau North
 * Shore (Jericho, Syosset, Great Neck, Roslyn, Manhasset) and western
 * Suffolk (Half Hollow Hills, Ward Melville). Built from
 * APBiologyCityTemplate + apBiologyMetros[long-island]. Schemas emitted
 * via APBiologyMetroSchemas.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'long-island'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Long Island · Nassau + Suffolk · Cerebrum',
  description:
    'AP Biology tutoring for Long Island students — Jericho, Syosset, Great Neck, Roslyn, Manhasset, Half Hollow Hills. AIIMS-trained faculty, FRQ rubric mastery, ET live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Long Island',
    'AP Biology tutor Jericho',
    'AP Biology tutor Syosset',
    'AP Biology tutor Great Neck',
    'AP Bio tutor Roslyn',
    'AP Bio tutor Manhasset',
    'AP Bio tutor Half Hollow Hills',
    'AP Biology score 5 Long Island',
    'AP Biology FRQ tutor Nassau County',
    'USABO tutor Long Island',
    'science research tutor Long Island',
    'private AP Biology tutor Long Island',
    'online AP Biology tutor Suffolk County',
    'AP Biology tutor Ward Melville',
    'AP Biology tutor Cold Spring Harbor',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorLongIslandPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
