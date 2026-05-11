/**
 * /ap-biology-tutor-mumbai
 *
 * AP Biology India metro page targeting Mumbai + Navi Mumbai + Thane
 * (ASB, Cathedral, BIS, Oberoi, Dhirubhai Ambani, Aditya Birla,
 * Ecole Mondiale, Singapore International, Jamnabai Narsee). Built
 * from APBiologyCityTemplate + apBiologyMetros[mumbai]. Schemas
 * emitted via APBiologyMetroSchemas with en-IN locale + IN country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'mumbai'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Mumbai · ASB + Cathedral + BIS · Cerebrum',
  description:
    'AP Biology tutoring for Mumbai — ASB, Cathedral, BIS, Oberoi, Dhirubhai Ambani. AIIMS-trained PhD faculty, FRQ mastery, IST live classes. From $1,800.',
  keywords: [
    'ap biology tutor mumbai',
    'ap biology coaching mumbai',
    'ap biology american school of bombay',
    'ap biology asb bkc',
    'ap biology cathedral school mumbai',
    'ap biology bombay international school',
    'ap biology oberoi international',
    'ap biology dhirubhai ambani international',
    'ap biology aditya birla world academy',
    'ap biology ecole mondiale',
    'ap biology coaching indian students us colleges',
    'ap biology online india',
    'ap biology frq tutor mumbai',
    'ap biology tutor navi mumbai',
    'ap biology tutor thane',
    'best ap biology tutor india',
    'ap biology tutor bkc',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorMumbaiPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas
        metro={metro}
        inLanguage="en-IN"
        addressCountry="IN"
        availableLanguage={['English', 'Hindi']}
      />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
