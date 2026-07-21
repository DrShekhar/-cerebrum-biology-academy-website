import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

const cityName = 'Michigan'
const citySlug = 'usabo-coaching-michigan'
const region = 'Michigan (Detroit metro + Ann Arbor)'
const timezone = 'ET (Eastern)'
const url = 'https://cerebrumbiologyacademy.com/usabo-coaching-michigan'

export const metadata: Metadata = {
  title: `USABO Coaching Michigan — Detroit Metro & Ann Arbor`,
  description: `USA Biology Olympiad coaching for Michigan students — Detroit Country Day, International Academy, Cranbrook, Ann Arbor Pioneer & Huron. Olympiad-depth biology, AIIMS-trained faculty, live ET evening classes.`,
  keywords: [
    'USABO coaching michigan',
    'USABO tutor michigan',
    'USA Biology Olympiad michigan',
    'IBO preparation michigan',
    'biology olympiad coaching michigan',
    'USABO coaching detroit',
    'USABO coaching ann arbor',
    'USABO coaching bloomfield hills',
    'USABO tutor near me michigan',
    'biology olympiad tutor near me michigan',
    'USABO online coaching michigan',
    'AP Biology to USABO michigan',
  ],
  alternates: {
    canonical: url,
    languages: { en: url, 'en-US': url, 'x-default': url },
  },
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
    description: `USA Biology Olympiad (USABO + IBO) coaching for ${cityName} high school students. Live ${timezone} classes, AIIMS-trained biology specialist faculty.`,
  },
}

const heroBlurb =
  "Michigan's USABO strength sits in two places: the Oakland County magnet-and-private belt north of Detroit — Detroit Country Day School (Beverly Hills) is a verified USABO medalist school — and the Ann Arbor schools shaped by the University of Michigan. Michigan landed a National Finalist in 2025. Our ET-evening live classes give Michigan students olympiad-depth biology from faculty who teach nothing else."
const rigourBlurb =
  'Cerebrum is biology only, taught by AIIMS-trained faculty at olympiad depth, with weekly written feedback on every past-paper attempt and a max of 12 students per batch. Michigan students train alongside their AP Biology coursework; the same retrieval-heavy methodology that produces USABO Semifinalists also sharpens AP performance.'
const schools = [
  'Detroit Country Day School (Beverly Hills)',
  'International Academy (Bloomfield Hills)',
  'Cranbrook Schools (Bloomfield Hills)',
  'Pioneer High School (Ann Arbor)',
  'Huron High School (Ann Arbor)',
  'Troy High School (Troy)',
]

const faqs = [
  {
    question: 'Where in Michigan do you run classes?',
    answer:
      'Classes are 100% live online — no in-person centre in Michigan. The live format means our AIIMS-trained faculty teach students from the Detroit metro and Ann Arbor together, scheduled for ET (Eastern) evenings (typically 7–9 PM your local time). Recordings are available if a student misses a session.',
  },
  {
    question: 'Which Michigan schools does your USABO content target?',
    answer:
      'Detroit Country Day School (Beverly Hills) is Michigan’s verified USABO medalist school. The others listed — International Academy (Bloomfield Hills), Cranbrook, Ann Arbor Pioneer and Huron, Troy — are among the state’s academically strongest schools, where motivated biology students most often sit the USABO Open. You do not need to attend any of them; we coach students from any US high school.',
  },
  {
    question: "What's the time commitment for a Michigan student in 11th or 12th grade?",
    answer:
      'Plan for 8–12 hrs/week from September to early February (Open Exam), rising to 12–15 hrs/week in January for past-paper saturation. Sessions fit AP coursework — typically 2 weekday evenings + Sunday morning. Junior-year USABO + AP Biology in parallel is the most efficient structure; February USABO finishes before AP exam intensity kicks in.',
  },
  {
    question: 'How is your USABO coaching different from local Michigan tutoring?',
    answer:
      'Three differences. (1) Biology only, taught by AIIMS-trained faculty — depth, not breadth. (2) Faculty-led live classes with the same instructor for the year, not a video library. (3) The Indian small-batch coaching tradition: weekly written feedback on every past-paper attempt, retrieval-heavy methodology, max 12 students per batch. That is structurally different from general AP tutoring.',
  },
  {
    question: 'My child scored 5 on AP Biology — is that enough for USABO?',
    answer:
      'AP-5 covers about 60–70% of the USABO Open Exam. The remaining 30–40% — ethology, biosystematics, plant/animal histology, biostatistics interpretation — is where most AP-5 students lose Open points. With about 6 weeks of focused bridging, AP-5 students routinely cross into the Semifinalist range. See our AP Biology vs USABO bridge guide for the unit-by-unit overlap.',
  },
  {
    question: 'How does USABO standing weigh in college admissions?',
    answer:
      'USABO Open Honorable Mention (top ~25%) is solid Common-App content. Semifinalist (top ~10%) is a national-tier credential earned by roughly 0.5–1% of US high school biology students — recognised by admissions officers at Ivy, MIT, Stanford, JHU and other elite STEM programmes. USABO Finalist (top ~20 nationally) and IBO team members are elite signals.',
  },
  {
    question: 'When does the Michigan ET (Eastern) batch start?',
    answer:
      'New batches start in early September each year, aligned with the US academic calendar so students reach February USABO Open with a full 6-month preparation cycle. Mid-cycle entry is possible — we run 1-on-1 catch-up sessions to bring late entrants up to speed.',
  },
]

export default function USABOMichiganPage() {
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
        name: 'Michigan',
        containedInPlace: { '@type': 'Country', name: 'United States' },
        address: { '@type': 'PostalAddress', addressRegion: 'MI', addressCountry: 'US' },
      },
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: `Michigan high school students preparing for the USA Biology Olympiad (USABO Open Exam, Semifinal, and National Finals) and the IBO selection pathway`,
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
      />
    </>
  )
}
