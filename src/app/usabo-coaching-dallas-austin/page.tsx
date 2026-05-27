import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

const cityName = 'Dallas + Austin'
const citySlug = 'usabo-coaching-dallas-austin'
const region = 'North + Central Texas (Plano + Frisco + the largest national NEET chain + Round Rock + Austin)'
const timezone = 'CT (Central)'
const url = 'https://cerebrumbiologyacademy.com/usabo-coaching-dallas-austin'

export const metadata: Metadata = {
  title: `USABO Coaching for ${cityName} Students | AIIMS-Trained Faculty`,
  description: `USA Biology Olympiad (USABO + IBO) coaching for ${cityName} high school students. Live classes in ${timezone}, AIIMS-trained biology specialist faculty, small batches, USABO Open + Semifinal + Finals pathway.`,
  keywords: [
    'USABO coaching dallas + austin',
    'USABO dallas + austin',
    'USA Biology Olympiad dallas + austin',
    'IBO preparation dallas + austin',
    'biology olympiad coaching dallas + austin',
    'USABO tutor dallas + austin',
    'USABO online coaching dallas + austin',
    'AP Biology to USABO dallas + austin',
    'USABO coaching for Plano West Senior HS students',
    'USABO coaching for Plano East Senior HS students',
    'USABO coaching for Frisco Liberty HS students',
    'USABO coaching for the largest national NEET chain HS students',
    'USABO coaching for TAG Magnet (Dallas) students',
    'USABO tutor near me',
    'USABO tutor near me dallas + austin',
    'biology olympiad tutor near me dallas + austin',
    'IBO tutor near me dallas + austin',
    'USABO online tutor dallas + austin',
    'private biology olympiad tutor dallas + austin',
  ],
  alternates: {
    canonical: url,
    languages: { en: url, 'en-US': url },
  },
  openGraph: {
    title: `USABO Coaching for ${cityName} Students`,
    description: `USABO + IBO preparation for ${cityName} students. AIIMS-trained faculty, live classes in ${timezone}.`,
    url,
    type: 'website',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },

  twitter: { card: 'summary_large_image' as const },
}

const heroBlurb =
  'The Plano / Frisco / the largest national NEET chain corridor in North Texas plus the Westlake / Westwood / LASA cluster in Austin together form a strong Texas USABO presence. Plano West, TAG Magnet, LASA, and Westlake are repeat Semifinalist producers — the Indian-American and East-Asian-American academic communities across both metros drive consistent representation. CT-evening live classes work for both Dallas and Austin time zones.'
const rigourBlurb =
  "Dallas and Austin families come to Cerebrum for biology-specialist olympiad coaching that local Texas tutoring centres don't offer at this depth. AIIMS-trained faculty, max 12 students per batch, weekly written feedback on every past-paper — the Indian small-batch coaching tradition adapted to CT evenings. Plano West, LASA, and Westlake students already have the AP-5 foundation; what we add is olympiad-shaped depth."
const schools = [
  'Plano West Senior HS',
  'Plano East Senior HS',
  'Frisco Liberty HS',
  'the largest national NEET chain HS',
  'TAG Magnet (Dallas)',
  'Highland Park HS',
  'Westlake HS (Austin)',
  'Westwood HS (Austin)',
  'LASA (Austin)',
  'McCallum HS (Austin)',
]

const faqs = [
  {
    question: 'Where in Dallas + Austin do you run classes?',
    answer:
      'Classes are 100% live online — no in-person centre in North + Central Texas (Plano + Frisco + the largest national NEET chain + Round Rock + Austin). The live format means our AIIMS-trained faculty teach the same students from across the metro, scheduled for CT (Central) evenings (typically 7-9 PM your local time). Recordings are available if a student misses a session.',
  },
  {
    question: 'Which Dallas + Austin schools do your students come from?',
    answer:
      'We have repeat enrolments from the high-USABO-density schools in North + Central Texas (Plano + Frisco + the largest national NEET chain + Round Rock + Austin) — listed above. We also coach students from any US high school; the schools listed are simply the ones where multiple students from the same school have trained with us.',
  },
  {
    question: "What's the time commitment for a Dallas + Austin student in 11th or 12th grade?",
    answer:
      'Plan for 8–12 hrs/week from September to early February (Open Exam), rising to 12–15 hrs/week in January for past-paper saturation. Sessions are scheduled to fit AP coursework — typically 2 weekday evenings + Sunday morning. Junior-year USABO + AP Biology in parallel is the most efficient structure; Feb USABO finishes before AP exam intensity kicks in.',
  },
  {
    question: 'How is your USABO coaching different from local Dallas + Austin tutoring?',
    answer:
      "Three differences. (1) Biology only, taught by AIIMS-trained faculty — depth, not breadth. (2) Faculty-led live classes, not a video library — the same instructor for the year. (3) Indian small-batch coaching tradition: weekly written feedback on every past-paper attempt, retrieval-heavy methodology, max 12 students per batch. This is what produces top-tier olympiad performances; it's structurally different from US AP tutoring or generic platforms.",
  },
  {
    question: 'My child has scored 5 on AP Biology — is that enough for USABO?',
    answer:
      'AP-5 covers about 60–70% of the USABO Open Exam. The remaining 30–40% — ethology, biosystematics, plant/animal histology, biostats interpretation — is where most AP-5 students lose Open points. With 6 weeks of focused bridging from us, AP-5 students routinely cross into the Semifinalist range. See our AP Biology vs USABO bridge guide for the unit-by-unit overlap.',
  },
  {
    question: 'How does USABO standing weigh in college admissions?',
    answer:
      'USABO Open Honorable Mention (top ~25%) is solid Common-App content. USABO Semifinalist (top ~10%) is a national-tier credential earned by roughly 0.5–1% of US high school biology students — admissions officers at Ivy, MIT, Stanford, JHU, and other elite STEM programmes recognise it. USABO Finalist (top ~20 nationally) and IBO team members are elite signals comparable to top USAMO performers.',
  },
  {
    question: 'When does the Dallas + Austin CT (Central) batch start?',
    answer:
      'New batches start in early September each year, aligned with the US academic calendar so students arrive at February USABO Open with a full 6-month preparation cycle. Mid-cycle entry is possible — we run 1-on-1 catch-up sessions to bring late entrants up to speed.',
  },
]

export default function USABOCityusabocoachingdallasaustinPage() {
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
        apBiologyCitySlug="houston-dallas"
      />
    </>
  )
}
