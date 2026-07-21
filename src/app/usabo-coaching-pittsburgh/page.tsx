import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

const cityName = 'Pittsburgh'
const citySlug = 'usabo-coaching-pittsburgh'
const region = 'Pittsburgh + Western Pennsylvania'
const timezone = 'ET (Eastern)'
const url = 'https://cerebrumbiologyacademy.com/usabo-coaching-pittsburgh'

export const metadata: Metadata = {
  title: `USABO Coaching Pittsburgh — Shady Side & Western PA`,
  description: `USA Biology Olympiad coaching for Pittsburgh and Western Pennsylvania — Shady Side Academy, Fox Chapel, Upper St. Clair, North Allegheny. Olympiad-depth biology, AIIMS-trained faculty, live ET classes.`,
  keywords: [
    'USABO coaching pittsburgh',
    'USABO tutor pittsburgh',
    'USA Biology Olympiad pittsburgh',
    'IBO preparation pittsburgh',
    'biology olympiad coaching pittsburgh',
    'USABO coaching western pennsylvania',
    'USABO coaching for Shady Side Academy students',
    'USABO tutor near me pittsburgh',
    'biology olympiad tutor near me pittsburgh',
    'USABO online coaching pittsburgh',
    'AP Biology to USABO pittsburgh',
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
  "Pennsylvania sent two students to the 2025 USABO National Finals, and Western PA's share of that runs through Pittsburgh's strongest schools — Shady Side Academy is a verified USABO Finalist school. The existing Philadelphia page doesn't serve the Pittsburgh region; this one does. Our ET-evening live classes give Pittsburgh students olympiad-depth biology from faculty who teach nothing else."
const rigourBlurb =
  'Cerebrum is biology only, taught by AIIMS-trained faculty at olympiad depth, with weekly written feedback on every past-paper attempt and a max of 12 students per batch. Pittsburgh students train alongside their AP Biology coursework; the same retrieval-heavy methodology that produces USABO Semifinalists also sharpens AP performance.'
const schools = [
  'Shady Side Academy (Pittsburgh)',
  'Fox Chapel Area High School (Pittsburgh)',
  'Upper St. Clair High School (Upper St. Clair)',
  'North Allegheny Senior High School (Wexford)',
  'Mt. Lebanon High School (Mt. Lebanon)',
  'Winchester Thurston School (Pittsburgh)',
]

const faqs = [
  {
    question: 'Where in the Pittsburgh area do you run classes?',
    answer:
      'Classes are 100% live online — no in-person centre in Pittsburgh or Western Pennsylvania. The live format means our AIIMS-trained faculty teach students from across the region together, scheduled for ET (Eastern) evenings (typically 7–9 PM your local time). Recordings are available if a student misses a session.',
  },
  {
    question: 'Which Pittsburgh schools does your USABO content target?',
    answer:
      'Shady Side Academy is Pittsburgh’s verified USABO National Finalist school. The others listed — Fox Chapel, Upper St. Clair, North Allegheny, Mt. Lebanon, Winchester Thurston — are among Western Pennsylvania’s academically strongest schools, where motivated biology students most often sit the USABO Open. You do not need to attend any of them; we coach students from any US high school.',
  },
  {
    question: "What's the time commitment for a Pittsburgh student in 11th or 12th grade?",
    answer:
      'Plan for 8–12 hrs/week from September to early February (Open Exam), rising to 12–15 hrs/week in January for past-paper saturation. Sessions fit AP coursework — typically 2 weekday evenings + Sunday morning. Junior-year USABO + AP Biology in parallel is the most efficient structure; February USABO finishes before AP exam intensity kicks in.',
  },
  {
    question: 'How is your USABO coaching different from local Pittsburgh tutoring?',
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
    question: 'When does the Pittsburgh ET (Eastern) batch start?',
    answer:
      'New batches start in early September each year, aligned with the US academic calendar so students reach February USABO Open with a full 6-month preparation cycle. Mid-cycle entry is possible — we run 1-on-1 catch-up sessions to bring late entrants up to speed.',
  },
]

export default function USABOPittsburghPage() {
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
        address: { '@type': 'PostalAddress', addressRegion: 'PA', addressCountry: 'US' },
      },
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: `high school students in ${region} preparing for the USA Biology Olympiad (USABO Open Exam, Semifinal, and National Finals) and the IBO selection pathway`,
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
