import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

const cityName = 'Miami & South Florida'
const citySlug = 'usabo-coaching-miami'
const region = 'Miami-Dade + Broward + Palm Beach'
const timezone = 'ET (Eastern)'

export const metadata: Metadata = {
  title: `USABO Coaching Miami & South Florida | Marine Bio Edge`,
  description: `USABO coaching for South Florida — Ransom Everglades, Gulliver, MAST & Pine Crest. ET-evening live classes, AIIMS-trained faculty, ecology-rich IBO prep drawing on Everglades & marine-science strengths.`,
  keywords: [
    'USABO coaching miami & south florida',
    'USABO miami & south florida',
    'USA Biology Olympiad miami & south florida',
    'IBO preparation miami & south florida',
    'biology olympiad coaching miami & south florida',
    'USABO tutor miami & south florida',
    'USABO online coaching miami & south florida',
    'AP Biology to USABO miami & south florida',
    'USABO coaching for Ransom Everglades students',
    'USABO coaching for Gulliver Prep students',
    'USABO coaching for Pine Crest students',
    'USABO tutor near me',
  ],
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/${citySlug}`,
    languages: {
      en: `https://cerebrumbiologyacademy.com/${citySlug}`,
      'en-US': `https://cerebrumbiologyacademy.com/${citySlug}`,
      'x-default': `https://cerebrumbiologyacademy.com/${citySlug}`,
    },
  },
  openGraph: {
    title: `USABO Coaching for ${cityName} | Cerebrum Biology Academy`,
    description: `USA Biology Olympiad coaching for ${cityName} — AIIMS-trained faculty, ${timezone} live sessions, Open + Semifinal + Finals pathway.`,
    url: `https://cerebrumbiologyacademy.com/${citySlug}`,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: `USABO Coaching for ${cityName} Students · Cerebrum`,
    description: `USA Biology Olympiad (USABO + IBO) coaching for ${cityName} high school students. Live ${timezone} classes, AIIMS-trained biology specialist faculty.`,
  },
}

const schools = [
  'Ransom Everglades School',
  'Gulliver Preparatory',
  'MAST Academy',
  'Miami Palmetto Senior HS',
  'Pine Crest School (Fort Lauderdale)',
  'American Heritage School (Plantation)',
  'NSU University School',
  'Coral Reef Senior HS',
]

export default function Page() {
  return (
    <USABOCityTemplate
      cityName={cityName}
      region={region}
      timezone={timezone}
      citySlug={citySlug}
      schools={schools}
      apBiologyCitySlug="miami"
      heroBlurb="South Florida's USABO ecosystem is anchored by Ransom Everglades and Gulliver Prep — two of the strongest private STEM programmes in the Southeast. MAST Academy (marine science focus), Pine Crest (Fort Lauderdale), and American Heritage (Plantation) add depth. The Weston/Coral Springs Indian-American community drives growing olympiad demand."
      rigourBlurb="Miami students benefit from UM Rosenstiel School marine-biology research access and proximity to Everglades National Park for ecology-focused olympiad preparation. Our ET evening sessions fit the South Florida school schedule."
      faqs={[
        {
          question: 'Ransom Everglades or Gulliver students — what level should they start at?',
          answer:
            'Both schools have strong AP Biology programmes. Our USABO coaching extends to Alberts/Lehninger depth for Semifinal targeting. Start in October for the February Open.',
        },
        {
          question: 'Weston / Coral Springs families — planning conversation?',
          answer:
            'The South Asian community in Weston/Coral Springs drives growing USABO demand. We discuss: target level (Open qualification vs Semifinal), AP Biology bridge, and ET evening scheduling.',
        },
        {
          question: 'MAST Academy marine-science students — relevant for USABO?',
          answer:
            'Yes — MAST students have strong ecology and marine-biology foundations that overlap with USABO ecology questions. We build on this foundation and add molecular biology and genetics depth.',
        },
        {
          question: 'How does USABO coaching complement AP Biology?',
          answer:
            'USABO Open overlaps ~70% with AP Biology. The Semifinal requires Alberts-level depth beyond AP. We build on the AP foundation.',
        },
        {
          question: 'What does USABO coaching cost?',
          answer:
            '1:1 Elite Mentoring: $90/hour. Small-Batch Weekend: $50/hour. Complete Olympiad Year: $4,500/year.',
        },
      ]}
    />
  )
}
