import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

const cityName = 'Orange County'
const citySlug = 'usabo-coaching-orange-county'
const region = 'Orange County, CA (Irvine, Fullerton, Tustin, Newport Coast)'
const timezone = 'PT (Pacific)'
const url = 'https://cerebrumbiologyacademy.com/usabo-coaching-orange-county'

export const metadata: Metadata = {
  title: `USABO Coaching Orange County — Irvine, Troy & University HS`,
  description: `USA Biology Olympiad coaching for Orange County students — Northwood, University, Portola, Beckman (Irvine), Troy (Fullerton), Sage Hill. Olympiad-depth biology, AIIMS-trained faculty, live PT evening classes, weekly feedback.`,
  keywords: [
    'USABO coaching orange county',
    'USABO coaching irvine',
    'USABO tutor irvine',
    'USA Biology Olympiad orange county',
    'IBO preparation orange county',
    'biology olympiad coaching irvine',
    'USABO coaching for University HS Irvine students',
    'USABO coaching for Northwood HS students',
    'USABO coaching for Troy HS Fullerton students',
    'USABO coaching for Beckman HS students',
    'USABO coaching for Portola HS students',
    'USABO tutor near me irvine',
    'biology olympiad tutor near me orange county',
    'USABO online coaching orange county',
    'private biology olympiad tutor irvine',
    'AP Biology to USABO orange county',
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
  "Orange County has one of the densest USABO clusters in the country, concentrated in Irvine's magnet-tier public high schools and a handful of standout schools in Fullerton and Newport. It is also where the most local olympiad test-prep money is spent — Ardent Academy and IvyMax sell USABO prep out of Irvine. Our PT-evening live classes give OC students olympiad-depth biology from faculty who teach nothing else."
const rigourBlurb =
  'The difference is depth. Local Irvine academies run biology as one subject among many, on a class-cycle model. Cerebrum is biology only, taught by AIIMS-trained faculty at olympiad depth, with weekly written feedback on every past-paper attempt and a max of 12 students per batch. Students train alongside their AP Biology coursework — the same rigor that produces USABO Semifinalists also sharpens the AP-5.'
const schools = [
  'University High School (Irvine)',
  'Northwood High School (Irvine)',
  'Portola High School (Irvine)',
  'Arnold O. Beckman High School (Irvine)',
  'Troy High School (Fullerton)',
  'Sage Hill School (Newport Coast)',
]

const faqs = [
  {
    question: 'Where in Orange County do you run classes?',
    answer:
      'Classes are 100% live online — no in-person centre in Orange County (Irvine, Fullerton, Tustin, Newport). The live format means our AIIMS-trained faculty teach students from across OC together, scheduled for PT (Pacific) evenings (typically 7–9 PM your local time). Recordings are available if a student misses a session.',
  },
  {
    question: 'Which Orange County schools does your USABO content target?',
    answer:
      "The pages call out the OC schools whose students most often compete in USABO — Irvine's magnet-tier publics (University, Northwood, Portola, Beckman), Troy in Fullerton, and Sage Hill in Newport Coast. You do not need to attend one of these; we coach students from any US high school. The list simply reflects where OC's USABO participation concentrates.",
  },
  {
    question: 'How is this different from Ardent Academy or IvyMax USABO prep in Irvine?',
    answer:
      'Three differences. (1) Biology only, taught by AIIMS-trained faculty — depth, not a subject in a multi-subject academy. (2) Faculty-led live classes with the same instructor for the year, not a rotating class-cycle. (3) The Indian small-batch coaching tradition: weekly written feedback on every past-paper attempt, retrieval-heavy methodology, max 12 students per batch. That is what produces top-tier olympiad performances.',
  },
  {
    question: "What's the time commitment for an Orange County student in 11th or 12th grade?",
    answer:
      'Plan for 8–12 hrs/week from September to early February (Open Exam), rising to 12–15 hrs/week in January for past-paper saturation. Sessions fit AP coursework — typically 2 weekday evenings + Sunday morning. Junior-year USABO + AP Biology in parallel is the most efficient structure; February USABO finishes before AP exam intensity kicks in.',
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
    question: 'When does the Orange County PT (Pacific) batch start?',
    answer:
      'New batches start in early September each year, aligned with the US academic calendar so students reach February USABO Open with a full 6-month preparation cycle. Mid-cycle entry is possible — we run 1-on-1 catch-up sessions to bring late entrants up to speed.',
  },
]

export default function USABOOrangeCountyPage() {
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
