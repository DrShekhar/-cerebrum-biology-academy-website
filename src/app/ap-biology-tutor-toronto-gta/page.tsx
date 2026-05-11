/**
 * /ap-biology-tutor-toronto-gta
 *
 * AP Biology Canada metro page targeting Toronto + North York +
 * Scarborough + Markham + Vaughan + Oakville (Earl Haig, Marc
 * Garneau, William Lyon Mackenzie, North Toronto CI, Don Mills CI,
 * Harbord CI, A.Y. Jackson SS, UTS, UCC, Branksome Hall, Havergal,
 * Crescent, Bishop Strachan, St. Michael's, Trinity, Ridley,
 * Appleby, Pickering). Built from APBiologyCityTemplate +
 * apBiologyMetros[toronto-gta]. Schemas emitted via
 * APBiologyMetroSchemas with en-CA locale + CA country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'toronto-gta'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Toronto · Earl Haig + UTS + UCC · Cerebrum',
  description:
    'AP Biology tutoring for Toronto GTA — Earl Haig, Marc Garneau, UTS, UCC, Branksome, Havergal. PhD faculty, FRQ mastery, ET live classes. From $1,800.',
  keywords: [
    'ap biology tutor toronto',
    'ap biology coaching ontario',
    'ap biology tutor gta',
    'ap biology tutor north york',
    'ap biology tutor markham',
    'ap biology tutor vaughan',
    'ap biology tutor oakville',
    'ap biology earl haig',
    'ap biology marc garneau',
    'ap biology william lyon mackenzie',
    'ap biology north toronto ci',
    'ap biology utc toronto',
    'ap biology upper canada college',
    'ap biology branksome hall',
    'ap biology havergal college',
    'ap biology crescent school',
    'ap biology bishop strachan',
    'ap biology st michaels college school',
    'ap biology trinity college school',
    'ap biology ridley college',
    'ap biology appleby college',
    'ap biology online canada',
    'ap biology frq tutor toronto',
    'usabo tutor toronto',
    'cbo coaching toronto',
    'best ap biology tutor canada',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorTorontoGTAPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} inLanguage="en-CA" addressCountry="CA" />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
