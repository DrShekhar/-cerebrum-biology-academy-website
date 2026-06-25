import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

// Universal framing — open to any student in the Phoenix metro, any nationality.
const cityName = 'Phoenix & Scottsdale'
const citySlug = 'usabo-coaching-phoenix'
const region = 'Arizona (Phoenix metro)'
const timezone = 'MST (Arizona, no DST)'
const url = 'https://cerebrumbiologyacademy.com/usabo-coaching-phoenix'

export const metadata: Metadata = {
  title: `USABO Coaching Phoenix & Scottsdale | BASIS-Calibrated`,
  description: `USABO + IBO coaching tuned to Phoenix's BASIS charter network plus Hamilton and Chandler — small batches (max 12), AIIMS-trained faculty, live Arizona-time (MST, no DST) classes. Open to any student.`,
  keywords: [
    'USABO coaching phoenix',
    'USABO phoenix',
    'USA Biology Olympiad phoenix',
    'USABO coaching scottsdale',
    'IBO preparation phoenix',
    'biology olympiad coaching arizona',
    'USABO tutor phoenix',
    'USABO online coaching arizona',
    'AP Biology to USABO phoenix',
    'USABO coaching for BASIS Scottsdale students',
    'USABO coaching for Hamilton HS students',
    'biology olympiad tutor near me phoenix',
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
  'Phoenix combines a nationally dominant BASIS charter network (Scottsdale, Chandler) with strong public schools (Hamilton, Chandler, Corona del Sol) and a serious neuroscience/medical base — the Barrow Neurological Institute, ASU and Mayo Clinic Arizona. We run Arizona-time evening classes calibrated for these schools’ AP-heavy schedules, open to any student in the metro.'
const rigourBlurb =
  'Phoenix-area families come to Cerebrum because local options are AP-tutoring shaped, not olympiad-shaped. Our AIIMS-trained, biology-only faculty teach to USABO Semifinal depth from week one, then layer AP exam tactics in March–May. Faculty-led live classes, weekly written feedback on every past-paper attempt, and small batches (max 12).'
const schools = [
  'BASIS Scottsdale',
  'BASIS Chandler',
  'Hamilton HS',
  'Chandler HS',
  'Corona del Sol HS',
  'Desert Vista HS',
  'Perry HS',
]

const faqs = [
  {
    question: 'Where in the Phoenix metro do you run classes?',
    answer:
      'Classes are 100% live online — no in-person centre in Arizona. Our AIIMS-trained faculty teach students from across Phoenix, Scottsdale, Chandler and the East Valley, scheduled for Arizona time (MST, no daylight saving). Recordings are available if a student misses a session. Open to any student, any nationality.',
  },
  {
    question: 'Which Phoenix-area schools do your students come from?',
    answer:
      'We coach students from across the metro — including BASIS Scottsdale, BASIS Chandler, Hamilton, Chandler, Corona del Sol, Desert Vista and Perry — and from any other US high school. The listed schools are simply where multiple students have trained with us.',
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
    question: 'When does the Phoenix batch start?',
    answer:
      'New batches start in early September, aligned with the US academic calendar so students reach the February USABO Open with a full 6-month cycle. Mid-cycle entry is possible with 1-on-1 catch-up sessions.',
  },
]

export default function USABOPhoenixPage() {
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
        address: { '@type': 'PostalAddress', addressRegion: 'AZ', addressCountry: 'US' },
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
        apBiologyCitySlug="phoenix"
      />
    </>
  )
}
