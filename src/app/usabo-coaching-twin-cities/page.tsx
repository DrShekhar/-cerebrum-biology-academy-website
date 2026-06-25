import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

// Universal framing — open to any student in the Twin Cities metro, any nationality.
const cityName = 'Minneapolis–St. Paul (Twin Cities)'
const citySlug = 'usabo-coaching-twin-cities'
const region = 'Minnesota (Twin Cities metro)'
const timezone = 'CT (Central)'
const url = 'https://cerebrumbiologyacademy.com/usabo-coaching-twin-cities'

export const metadata: Metadata = {
  title: `Twin Cities USABO Coaching | Wayzata & Edina Prep`,
  description: `Olympiad-shaped USABO coaching for Twin Cities students at Wayzata, Edina and Minnetonka — built near the U of Minnesota and Mayo base. AIIMS-trained faculty, live CT classes, IBO pathway.`,
  keywords: [
    'USABO coaching minneapolis',
    'USABO coaching twin cities',
    'USA Biology Olympiad minnesota',
    'USABO coaching st paul',
    'IBO preparation minneapolis',
    'biology olympiad coaching minnesota',
    'USABO tutor minneapolis',
    'USABO online coaching minnesota',
    'USABO coaching for Wayzata HS students',
    'USABO coaching for Edina HS students',
    'biology olympiad tutor near me minneapolis',
  ],
  alternates: { canonical: url, languages: { en: url, 'en-US': url, 'x-default': url } },
  openGraph: {
    title: `USABO Coaching for ${cityName} Students`,
    description: `USABO + IBO preparation for Twin Cities students. AIIMS-trained faculty, live classes in ${timezone}.`,
    url,
    type: 'website',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `USABO Coaching for ${cityName} Students · Cerebrum`,
    description: `USA Biology Olympiad (USABO + IBO) coaching for Twin Cities high schoolers. Live ${timezone} classes, AIIMS-trained biology specialist faculty.`,
  },
}

const heroBlurb =
  'The Twin Cities have a deep bench of academically competitive suburban high schools — Wayzata, Edina, Eden Prairie, Minnetonka, Mounds View — and a strong medical-research base (the University of Minnesota and Mayo Clinic). We run CT-evening classes calibrated for these schools’ AP-heavy schedules, open to any student in the metro.'
const rigourBlurb =
  'Twin Cities families come to Cerebrum because local options are AP-tutoring shaped, not olympiad-shaped. Our AIIMS-trained, biology-only faculty teach to USABO Semifinal depth from week one, then layer AP exam tactics in March–May. Faculty-led live classes, weekly written feedback on every past-paper attempt, and small batches (max 12).'
const schools = [
  'Wayzata HS',
  'Edina HS',
  'Eden Prairie HS',
  'Minnetonka HS',
  'Mounds View HS',
  'Maple Grove HS',
  'Eastview HS',
]

const faqs = [
  {
    question: 'Where in the Twin Cities do you run classes?',
    answer:
      'Classes are 100% live online — no in-person centre in Minnesota. Our AIIMS-trained faculty teach students from across Minneapolis, St. Paul and the suburbs, scheduled for CT (Central) evenings. Recordings are available if a student misses a session. Open to any student, any nationality.',
  },
  {
    question: 'Which Twin Cities schools do your students come from?',
    answer:
      'We coach students from across the metro — including Wayzata, Edina, Eden Prairie, Minnetonka, Mounds View, Maple Grove and Eastview — and from any other US high school. The listed schools are simply where multiple students have trained with us.',
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
    question: 'When does the Twin Cities CT batch start?',
    answer:
      'New batches start in early September, aligned with the US academic calendar so students reach the February USABO Open with a full 6-month cycle. Mid-cycle entry is possible with 1-on-1 catch-up sessions.',
  },
]

export default function USABOTwinCitiesPage() {
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
        apBiologyCitySlug="twin-cities"
      />
    </>
  )
}
