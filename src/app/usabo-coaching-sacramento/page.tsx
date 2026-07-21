import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

const cityName = 'Sacramento'
const citySlug = 'usabo-coaching-sacramento'
const region = 'Greater Sacramento, CA (Sacramento, Davis, Folsom, Roseville)'
const timezone = 'PT (Pacific)'
const url = 'https://cerebrumbiologyacademy.com/usabo-coaching-sacramento'

export const metadata: Metadata = {
  title: `USABO Coaching Sacramento — Mira Loma & Davis HS`,
  description: `USA Biology Olympiad coaching for Greater Sacramento — Mira Loma, Davis Senior, C.K. McClatchy, Rio Americano, Folsom. Olympiad-depth biology, AIIMS-trained faculty, live PT evening classes, weekly feedback.`,
  keywords: [
    'USABO coaching sacramento',
    'USABO tutor sacramento',
    'USA Biology Olympiad sacramento',
    'IBO preparation sacramento',
    'biology olympiad coaching sacramento',
    'USABO coaching for Mira Loma HS students',
    'USABO coaching Davis CA',
    'USABO coaching Folsom',
    'USABO tutor near me sacramento',
    'biology olympiad tutor near me sacramento',
    'USABO online coaching sacramento',
    'private biology olympiad tutor sacramento',
    'AP Biology to USABO sacramento',
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
  "Greater Sacramento's USABO strength runs through Mira Loma High School — a long-standing science-competition powerhouse that has produced USABO Semifinalists and a National Finalist, alongside its Science Bowl and Science Olympiad record. We coach Mira Loma students and strong biology students across the Davis, Folsom, and Roseville corridors with live PT-evening olympiad classes."
const rigourBlurb =
  'Cerebrum is biology only, taught by AIIMS-trained faculty at olympiad depth, with weekly written feedback on every past-paper attempt and a max of 12 students per batch. Sacramento students train alongside their AP Biology coursework; the same retrieval-heavy methodology that produces USABO Semifinalists also sharpens AP performance.'
const schools = [
  'Mira Loma High School (Sacramento)',
  'Davis Senior High School (Davis)',
  'C. K. McClatchy High School — HISP (Sacramento)',
  'Rio Americano High School (Sacramento)',
  'Folsom High School (Folsom)',
  'Granite Bay High School (Granite Bay)',
]

const faqs = [
  {
    question: 'Where in the Sacramento area do you run classes?',
    answer:
      'Classes are 100% live online — no in-person centre in the Sacramento region (Sacramento, Davis, Folsom, Roseville). The live format means our AIIMS-trained faculty teach students from across the region together, scheduled for PT (Pacific) evenings (typically 7–9 PM your local time). Recordings are available if a student misses a session.',
  },
  {
    question: 'Which Sacramento schools does your USABO content target?',
    answer:
      'Mira Loma High School is the Sacramento region’s standout USABO and science-competition school. The other schools listed — Davis Senior, C. K. McClatchy (HISP), Rio Americano, Folsom, Granite Bay — are the region’s academically strongest, where motivated biology students most often sit the USABO Open. You do not need to attend any of them; we coach students from any US high school.',
  },
  {
    question: "What's the time commitment for a Sacramento student in 11th or 12th grade?",
    answer:
      'Plan for 8–12 hrs/week from September to early February (Open Exam), rising to 12–15 hrs/week in January for past-paper saturation. Sessions fit AP coursework — typically 2 weekday evenings + Sunday morning. Junior-year USABO + AP Biology in parallel is the most efficient structure; February USABO finishes before AP exam intensity kicks in.',
  },
  {
    question: 'How is your USABO coaching different from local Sacramento tutoring?',
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
    question: 'When does the Sacramento PT (Pacific) batch start?',
    answer:
      'New batches start in early September each year, aligned with the US academic calendar so students reach February USABO Open with a full 6-month preparation cycle. Mid-cycle entry is possible — we run 1-on-1 catch-up sessions to bring late entrants up to speed.',
  },
]

export default function USABOSacramentoPage() {
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
        address: { '@type': 'PostalAddress', addressRegion: 'CA', addressCountry: 'US' },
      },
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: `USA-based high school students in ${region} preparing for the USA Biology Olympiad (USABO Open Exam, Semifinal, and National Finals) and the IBO selection pathway`,
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
