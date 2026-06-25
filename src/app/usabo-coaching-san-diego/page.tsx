import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

// Universal framing — open to any student in the San Diego metro, any nationality.
const cityName = 'San Diego'
const citySlug = 'usabo-coaching-san-diego'
const region = 'Southern California (San Diego metro)'
const timezone = 'PT (Pacific)'
const url = 'https://cerebrumbiologyacademy.com/usabo-coaching-san-diego'

export const metadata: Metadata = {
  title: `USABO Coaching San Diego | Canyon Crest to Semifinals`,
  description: `San Diego USABO coaching near the Salk and Scripps life-sciences cluster — for Canyon Crest, Torrey Pines and Westview students. AIIMS-trained faculty, live PT classes, IBO pathway.`,
  keywords: [
    'USABO coaching san diego',
    'USABO san diego',
    'USA Biology Olympiad san diego',
    'IBO preparation san diego',
    'biology olympiad coaching san diego',
    'USABO tutor san diego',
    'USABO online coaching san diego',
    'AP Biology to USABO san diego',
    'USABO coaching for Canyon Crest Academy students',
    'USABO coaching for Torrey Pines HS students',
    'USABO coaching for Westview HS students',
    'biology olympiad tutor near me san diego',
  ],
  alternates: { canonical: url, languages: { en: url, 'en-US': url, 'x-default': url } },
  openGraph: {
    title: `USABO Coaching for ${cityName} Students`,
    description: `USABO + IBO preparation for ${cityName} students. AIIMS-trained faculty, live classes in ${timezone}.`,
    url,
    type: 'website',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `USABO Coaching for ${cityName} Students · Cerebrum`,
    description: `USA Biology Olympiad (USABO + IBO) coaching for ${cityName} high schoolers. Live ${timezone} classes, AIIMS-trained biology specialist faculty.`,
  },
}

const heroBlurb =
  'San Diego pairs elite public STEM schools — Canyon Crest Academy, Torrey Pines, Westview, Del Norte — with a world-class life-sciences cluster (UC San Diego, the Salk Institute, Scripps Research). It is one of the strongest per-capita USABO markets on the West Coast. We run PT-evening classes calibrated for these schools’ AP-heavy schedules, open to any student in the metro.'
const rigourBlurb =
  'San Diego families come to Cerebrum because local options are AP-tutoring shaped, not olympiad-shaped. Our AIIMS-trained, biology-only faculty teach to USABO Semifinal depth from week one, then layer AP exam tactics in March–May. Faculty-led live classes, weekly written feedback on every past-paper attempt, and small batches (max 12) — the structure that produces top-tier olympiad results.'
const schools = [
  'Canyon Crest Academy',
  'Torrey Pines HS',
  'Westview HS',
  'Del Norte HS',
  'La Jolla HS',
  'Scripps Ranch HS',
  'Mt. Carmel HS',
]

const faqs = [
  {
    question: 'Where in San Diego do you run classes?',
    answer:
      'Classes are 100% live online — no in-person centre in San Diego. The live format means our AIIMS-trained faculty teach students from across the county, scheduled for PT (Pacific) evenings. Recordings are available if a student misses a session. Open to any student, any nationality.',
  },
  {
    question: 'Which San Diego schools do your students come from?',
    answer:
      'We coach students from across the metro — including Canyon Crest Academy, Torrey Pines, Westview, Del Norte, La Jolla, Scripps Ranch and Mt. Carmel — and from any other US high school. The schools listed are simply where multiple students from the same school have trained with us.',
  },
  {
    question: "What's the time commitment for an 11th or 12th grader?",
    answer:
      'Plan for 8–12 hrs/week from September to early February (Open Exam), rising to 12–15 hrs/week in January for past-paper saturation. Sessions fit AP coursework — typically 2 weekday evenings + a weekend morning. Junior-year USABO + AP Biology in parallel is the most efficient structure.',
  },
  {
    question: 'My child scored 5 on AP Biology — is that enough for USABO?',
    answer:
      'AP-5 covers roughly 60–70% of the USABO Open Exam. The remaining 30–40% — ethology, biosystematics, plant/animal histology, biostatistics — is where most AP-5 students lose Open points. With about 6 weeks of focused bridging, AP-5 students routinely cross into the Semifinalist range.',
  },
  {
    question: 'How does USABO standing weigh in college admissions?',
    answer:
      'USABO Open Honorable Mention (top ~25%) is solid application content; Semifinalist (top ~10%) is a national-tier credential earned by roughly 0.5–1% of US high-school biology students and recognised by elite STEM programmes; Finalist and IBO team members are elite signals.',
  },
  {
    question: 'When does the San Diego PT batch start?',
    answer:
      'New batches start in early September, aligned with the US academic calendar so students reach the February USABO Open with a full 6-month cycle. Mid-cycle entry is possible with 1-on-1 catch-up sessions.',
  },
]

export default function USABOSanDiegoPage() {
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
        apBiologyCitySlug="san-diego"
      />
    </>
  )
}
