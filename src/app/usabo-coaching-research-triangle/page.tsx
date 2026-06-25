import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

// Universal framing — open to any student in the Research Triangle, any nationality.
const cityName = 'Research Triangle (Raleigh–Durham)'
const citySlug = 'usabo-coaching-research-triangle'
const region = 'North Carolina (Research Triangle)'
const timezone = 'ET (Eastern)'
const url = 'https://cerebrumbiologyacademy.com/usabo-coaching-research-triangle'

export const metadata: Metadata = {
  title: `NCSSM-Calibrated USABO Coaching | Raleigh–Durham`,
  description: `USABO coaching for Research Triangle students from NCSSM, Enloe and Green Hope. Olympiad-depth biology from AIIMS-trained faculty, live ET evening classes, USABO + IBO pathway.`,
  keywords: [
    'USABO coaching raleigh',
    'USABO coaching durham',
    'USABO coaching research triangle',
    'USA Biology Olympiad north carolina',
    'IBO preparation raleigh',
    'biology olympiad coaching north carolina',
    'USABO tutor raleigh durham',
    'USABO online coaching north carolina',
    'USABO coaching for NCSSM students',
    'USABO coaching for Enloe HS students',
    'biology olympiad tutor near me raleigh',
  ],
  alternates: { canonical: url, languages: { en: url, 'en-US': url, 'x-default': url } },
  openGraph: {
    title: `USABO Coaching for ${cityName} Students`,
    description: `USABO + IBO preparation for Research Triangle students. AIIMS-trained faculty, live classes in ${timezone}.`,
    url,
    type: 'website',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `USABO Coaching for ${cityName} Students · Cerebrum`,
    description: `USA Biology Olympiad (USABO + IBO) coaching for Research Triangle high schoolers. Live ${timezone} classes, AIIMS-trained biology specialist faculty.`,
  },
}

const heroBlurb =
  'The Research Triangle is one of the densest research regions in the US, anchored by Duke, UNC Chapel Hill and NC State — and home to the renowned NC School of Science & Mathematics. With strong magnet and suburban schools (Enloe, Green Hope, Panther Creek), it is a natural USABO market. We run ET-evening classes calibrated for these schools’ AP-heavy schedules, open to any student.'
const rigourBlurb =
  'Triangle families come to Cerebrum because local options are AP-tutoring shaped, not olympiad-shaped. Our AIIMS-trained, biology-only faculty teach to USABO Semifinal depth from week one, then layer AP exam tactics in March–May. Faculty-led live classes, weekly written feedback on every past-paper attempt, and small batches (max 12).'
const schools = [
  'NC School of Science & Mathematics (NCSSM)',
  'Enloe Magnet HS',
  'Green Hope HS',
  'Panther Creek HS',
  'Cary HS',
  'Green Level HS',
  'Apex Friendship HS',
]

const faqs = [
  {
    question: 'Where in the Triangle do you run classes?',
    answer:
      'Classes are 100% live online — no in-person centre in North Carolina. Our AIIMS-trained faculty teach students from across Raleigh, Durham, Chapel Hill and Cary, scheduled for ET (Eastern) evenings. Recordings are available if a student misses a session. Open to any student, any nationality.',
  },
  {
    question: 'Which Triangle schools do your students come from?',
    answer:
      'We coach students from across the region — including the NC School of Science & Mathematics, Enloe, Green Hope, Panther Creek, Cary, Green Level and Apex Friendship — and from any other US high school. The listed schools are simply where multiple students have trained with us.',
  },
  {
    question: "What's the time commitment for an 11th or 12th grader?",
    answer:
      'Plan for 8–12 hrs/week from September to early February (Open Exam), rising to 12–15 hrs/week in January for past-paper saturation. Sessions fit AP coursework — typically 2 weekday evenings + a weekend morning.',
  },
  {
    question: 'My child scored 5 on AP Biology — is that enough for USABO?',
    answer:
      'AP-5 covers roughly 60–70% of the USABO Open Exam. The rest — ethology, biosystematics, plant/animal histology, biostatistics — is where most AP-5 students lose Open points. With about 6 weeks of focused bridging, AP-5 students routinely cross into the Semifinalist range.',
  },
  {
    question: 'How does USABO standing weigh in college admissions?',
    answer:
      'USABO Open Honorable Mention (top ~25%) is solid application content; Semifinalist (top ~10%) is a national-tier credential earned by roughly 0.5–1% of US high-school biology students and recognised by elite STEM programmes; Finalist and IBO team members are elite signals.',
  },
  {
    question: 'When does the Research Triangle ET batch start?',
    answer:
      'New batches start in early September, aligned with the US academic calendar so students reach the February USABO Open with a full 6-month cycle. Mid-cycle entry is possible with 1-on-1 catch-up sessions.',
  },
]

export default function USABOResearchTrianglePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'USABO Coaching',
        item: 'https://cerebrumbiologyacademy.com/usabo-coaching',
      },
      { '@type': 'ListItem', position: 3, name: `USABO Coaching — ${cityName}`, item: url },
    ],
  }
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `USABO Coaching — ${cityName}`,
    description: `USA Biology Olympiad (USABO Open + Semifinal + National Finals) preparation for high school students in ${region}. AIIMS-trained, biology-only faculty. Live online classes in ${timezone}.`,
    url,
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
        address: { '@type': 'PostalAddress', addressRegion: 'NC', addressCountry: 'US' },
      },
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      location: { '@type': 'VirtualLocation', url },
      courseSchedule: `Live classes in ${timezone}`,
    },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <USABOCityTemplate
        cityName={cityName}
        citySlug={citySlug}
        region={region}
        timezone={timezone}
        schools={schools}
        heroBlurb={heroBlurb}
        rigourBlurb={rigourBlurb}
        faqs={faqs}
        apBiologyCitySlug="research-triangle"
      />
    </>
  )
}
