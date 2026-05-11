/**
 * /ap-biology-tutor-brampton-mississauga
 *
 * AP Biology Canada metro page targeting Brampton + Mississauga +
 * Erin Mills + Streetsville (Peel Region — most heavily Indo-Canadian
 * metro in North America). Schools include Turner Fenton, Mayfield,
 * Lorne Park, John Fraser, Glenforest, Iona Catholic, Erindale,
 * Stephen Lewis, Cawthra Park, Castlebrooke, Heart Lake, Bramalea,
 * Central Peel, North Park, Rick Hansen. Built from
 * APBiologyCityTemplate + apBiologyMetros[brampton-mississauga].
 * Schemas emitted via APBiologyMetroSchemas with en-CA locale +
 * CA country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'brampton-mississauga'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Brampton-Mississauga · Peel · Cerebrum',
  description:
    'AP Biology tutoring for Brampton + Mississauga (Peel) — Turner Fenton, Mayfield, Lorne Park, John Fraser. PhD faculty, FRQ mastery, ET classes. From $1,800.',
  keywords: [
    'ap biology tutor brampton',
    'ap biology tutor mississauga',
    'ap biology coaching peel region',
    'ap biology tutor erin mills',
    'ap biology tutor streetsville',
    'ap biology turner fenton',
    'ap biology mayfield secondary',
    'ap biology lorne park secondary',
    'ap biology john fraser secondary',
    'ap biology glenforest secondary',
    'ap biology iona catholic',
    'ap biology erindale secondary',
    'ap biology stephen lewis secondary',
    'ap biology cawthra park',
    'ap biology castlebrooke secondary',
    'ap biology heart lake secondary',
    'ap biology bramalea secondary',
    'ap biology central peel',
    'ap biology north park secondary',
    'ap biology rick hansen secondary',
    'ap biology coaching indo canadian students',
    'ap biology online canada',
    'ap biology frq tutor brampton',
    'best ap biology tutor ontario',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorBramptonMississaugaPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} inLanguage="en-CA" addressCountry="CA" />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
