import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

const cityName = "Los Angeles"
const citySlug = "usabo-coaching-los-angeles"
const region = "Greater Los Angeles (LA + Orange + Ventura counties + San Diego)"
const timezone = "PT (Pacific)"
const url = "https://cerebrumbiologyacademy.com/usabo-coaching-los-angeles"

export const metadata: Metadata = {
  title: `USABO Coaching for ${cityName} Students | AIIMS-Trained Faculty`,
  description: `USA Biology Olympiad (USABO + IBO) coaching for ${cityName} high school students. Live classes in ${timezone}, AIIMS-trained biology specialist faculty, small batches, USABO Open + Semifinal + Finals pathway.`,
  keywords: [
  "USABO coaching los angeles",
  "USABO los angeles",
  "USA Biology Olympiad los angeles",
  "IBO preparation los angeles",
  "biology olympiad coaching los angeles",
  "USABO tutor los angeles",
  "USABO online coaching los angeles",
  "AP Biology to USABO los angeles",
  "USABO coaching for Pasadena HS students",
  "USABO coaching for San Marino HS students",
  "USABO coaching for La Cañada HS students",
  "USABO coaching for Arcadia HS students",
  "USABO coaching for Troy HS (Fullerton) students",
    "USABO tutor near me",
    "USABO tutor near me los angeles",
    "biology olympiad tutor near me los angeles",
    "IBO tutor near me los angeles",
    "USABO online tutor los angeles",
    "private biology olympiad tutor los angeles",
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
}

const heroBlurb = "Greater LA and San Diego host the second-largest USABO talent pool on the West Coast. The San Gabriel Valley schools — Pasadena, San Marino, La Cañada, Arcadia — together with the Orange County prep cluster (Troy, University HS Irvine, Diamond Bar) and Torrey Pines / Canyon Crest in San Diego, consistently send students to Semifinals. PT-evening live classes work for all three sub-regions."
const rigourBlurb = "LA and San Diego families weighing options between Curie Learning, individual tutors, and online platforms come to Cerebrum for AIIMS-trained, biology-only faculty teaching at olympiad depth. The Indian small-batch tradition — weekly written feedback, retrieval-heavy methodology, max 12 students per cohort — is exactly what high-achieving STEM students at Pasadena, San Marino, Troy, and Torrey Pines need to convert AP-5 trajectory into Semifinalist standing."
const schools = [
  "Pasadena HS",
  "San Marino HS",
  "La Cañada HS",
  "Arcadia HS",
  "Troy HS (Fullerton)",
  "Diamond Bar HS",
  "Walnut HS",
  "University HS (Irvine)",
  "Torrey Pines HS (San Diego)",
  "Canyon Crest Academy"
]

const faqs = [
  {
    "question": "Where in Los Angeles do you run classes?",
    "answer": "Classes are 100% live online — no in-person centre in Greater Los Angeles (LA + Orange + Ventura counties + San Diego). The live format means our AIIMS-trained faculty teach the same students from across the metro, scheduled for PT (Pacific) evenings (typically 7-9 PM your local time). Recordings are available if a student misses a session."
  },
  {
    "question": "Which Los Angeles schools do your students come from?",
    "answer": "We have repeat enrolments from the high-USABO-density schools in Greater Los Angeles (LA + Orange + Ventura counties + San Diego) — listed above. We also coach students from any US high school; the schools listed are simply the ones where multiple students from the same school have trained with us."
  },
  {
    "question": "What's the time commitment for a Los Angeles student in 11th or 12th grade?",
    "answer": "Plan for 8–12 hrs/week from September to early February (Open Exam), rising to 12–15 hrs/week in January for past-paper saturation. Sessions are scheduled to fit AP coursework — typically 2 weekday evenings + Sunday morning. Junior-year USABO + AP Biology in parallel is the most efficient structure; Feb USABO finishes before AP exam intensity kicks in."
  },
  {
    "question": "How is your USABO coaching different from local Los Angeles tutoring?",
    "answer": "Three differences. (1) Biology only, taught by AIIMS-trained faculty — depth, not breadth. (2) Faculty-led live classes, not a video library — the same instructor for the year. (3) Indian small-batch coaching tradition: weekly written feedback on every past-paper attempt, retrieval-heavy methodology, max 12 students per batch. This is what produces top-tier olympiad performances; it's structurally different from US AP tutoring or generic platforms."
  },
  {
    "question": "My child has scored 5 on AP Biology — is that enough for USABO?",
    "answer": "AP-5 covers about 60–70% of the USABO Open Exam. The remaining 30–40% — ethology, biosystematics, plant/animal histology, biostats interpretation — is where most AP-5 students lose Open points. With 6 weeks of focused bridging from us, AP-5 students routinely cross into the Semifinalist range. See our AP Biology vs USABO bridge guide for the unit-by-unit overlap."
  },
  {
    "question": "How does USABO standing weigh in college admissions?",
    "answer": "USABO Open Honorable Mention (top ~25%) is solid Common-App content. USABO Semifinalist (top ~10%) is a national-tier credential earned by roughly 0.5–1% of US high school biology students — admissions officers at Ivy, MIT, Stanford, JHU, and other elite STEM programmes recognise it. USABO Finalist (top ~20 nationally) and IBO team members are elite signals comparable to top USAMO performers."
  },
  {
    "question": "When does the Los Angeles PT (Pacific) batch start?",
    "answer": "New batches start in early September each year, aligned with the US academic calendar so students arrive at February USABO Open with a full 6-month preparation cycle. Mid-cycle entry is possible — we run 1-on-1 catch-up sessions to bring late entrants up to speed."
  }
]

export default function USABOCityusabocoachinglosangelesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
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
      />
    </>
  )
}
