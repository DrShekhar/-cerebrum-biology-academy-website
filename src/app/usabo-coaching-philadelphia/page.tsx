import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

const cityName = 'Philadelphia'
const citySlug = 'usabo-coaching-philadelphia'
const region = 'Philadelphia + Main Line + Cherry Hill NJ'
const timezone = 'ET (Eastern)'

export const metadata: Metadata = {
  title: `USABO Coaching Philadelphia | Central HS & Masterman`,
  description: `USABO + IBO coaching for Philadelphia's Central HS and Masterman magnets, the Main Line schools and Cherry Hill NJ. AIIMS-trained faculty, ET live sessions, UPenn/Drexel research-corridor fit.`,
  keywords: [
    'USABO coaching philadelphia',
    'USABO philadelphia',
    'USA Biology Olympiad philadelphia',
    'IBO preparation philadelphia',
    'biology olympiad coaching philadelphia',
    'USABO tutor philadelphia',
    'USABO online coaching philadelphia',
    'AP Biology to USABO philadelphia',
    'USABO coaching for Central HS students',
    'USABO coaching for Masterman students',
    'USABO coaching for Haverford School students',
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
  'Central HS (Philadelphia)',
  'Masterman HS',
  'Haverford School',
  'Episcopal Academy',
  'Agnes Irwin School',
  'Germantown Academy',
  'Radnor HS',
  'Lower Merion HS',
  'Cherry Hill HS East/West',
]

export default function Page() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `USABO Coaching — ${cityName}`,
    description: `USA Biology Olympiad (USABO Open + Semifinal + National Finals) preparation for high school students in ${region}. AIIMS-trained, biology-only faculty. Live online classes in ${timezone}.`,
    url: `https://cerebrumbiologyacademy.com/${citySlug}`,
    inLanguage: 'en-US',
    educationalLevel: 'High School',
    about: 'USABO - USA Biology Olympiad',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: region,
        containedInPlace: { '@type': 'Country', name: 'United States' },
        address: { '@type': 'PostalAddress', addressRegion: 'PA', addressCountry: 'US' },
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <USABOCityTemplate
        cityName={cityName}
        region={region}
        timezone={timezone}
        citySlug={citySlug}
        schools={schools}
        apBiologyCitySlug="philadelphia"
        heroBlurb="Philadelphia's USABO ecosystem is anchored by Central HS and Masterman — two of the strongest STEM magnets on the East Coast. The Main Line private schools (Haverford, Episcopal, Agnes Irwin, Germantown Academy) add depth. Cherry Hill East/West across the NJ border completes the metro's USABO footprint."
        rigourBlurb="Philadelphia students benefit from the UPenn, Drexel, and Temple research corridor — many USABO candidates supplement competition prep with wet-lab research. Our ET evening sessions fit the typical Philly school schedule."
        faqs={[
          {
            question: 'Central HS or Masterman students — what level should they start at?',
            answer:
              'Central and Masterman students typically have strong AP Biology foundations. Our USABO coaching extends to Alberts/Lehninger depth for Semifinal targeting. Start in October for the February Open.',
          },
          {
            question: 'Main Line private schools — same sessions as city students?',
            answer:
              'Yes — all online. Haverford, Episcopal, Agnes Irwin, and Germantown Academy students join the same ET evening sessions.',
          },
          {
            question: 'Cherry Hill NJ students — can they join Philly sessions?',
            answer:
              'Absolutely. All sessions are online — the NJ/PA state line is irrelevant. Cherry Hill students are part of our Philadelphia cohort.',
          },
          {
            question: 'How does USABO coaching complement AP Biology?',
            answer:
              'USABO Open overlaps ~70% with AP Biology. The Semifinal requires Alberts-level depth beyond AP. We build on the AP foundation and add olympiad-level molecular biology, genetics, and experimental design.',
          },
          {
            question: 'What does USABO coaching cost?',
            answer:
              '1:1 Elite Mentoring: $90/hour. Small-Batch Weekend: $50/hour. Complete Olympiad Year: $4,500/year.',
          },
        ]}
      />
    </>
  )
}
