import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

const cityName = "SF Bay Area"
const citySlug = "usabo-coaching-bay-area"
const region = "Northern California (San Jose, Santa Clara, San Mateo, Alameda counties)"
const timezone = "PT (Pacific)"
const url = "https://cerebrumbiologyacademy.com/usabo-coaching-bay-area"

export const metadata: Metadata = {
  title: `USABO Coaching for ${cityName} Students | AIIMS-Trained Faculty`,
  description: `USA Biology Olympiad (USABO + IBO) coaching for ${cityName} high school students. Live classes in ${timezone}, AIIMS-trained biology specialist faculty, small batches, USABO Open + Semifinal + Finals pathway.`,
  keywords: [
  "USABO coaching sf bay area",
  "USABO sf bay area",
  "USA Biology Olympiad sf bay area",
  "IBO preparation sf bay area",
  "biology olympiad coaching sf bay area",
  "USABO tutor sf bay area",
  "USABO online coaching sf bay area",
  "AP Biology to USABO sf bay area",
  "USABO coaching for Monta Vista HS students",
  "USABO coaching for Lynbrook HS students",
  "USABO coaching for Cupertino HS students",
  "USABO coaching for Mission San Jose HS students",
  "USABO coaching for Saratoga HS students",
    "USABO tutor near me",
    "USABO tutor near me sf bay area",
    "biology olympiad tutor near me sf bay area",
    "IBO tutor near me sf bay area",
    "USABO online tutor sf bay area",
    "private biology olympiad tutor sf bay area",
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

const heroBlurb = "The Bay Area's USABO concentration is unmatched on the West Coast. Monta Vista, Lynbrook, Mission San Jose, Saratoga, and Cupertino HS together account for a significant fraction of every year's Semifinalist class. Our PT-evening live classes are calibrated for these schools' AP Biology + tier-1 academic load."
const rigourBlurb = "Bay Area families know the difference between a slick US edtech platform and actual olympiad coaching. Cerebrum is the latter — AIIMS-trained faculty, biology only, taught at olympiad depth, with weekly written feedback on every past-paper attempt. Students from Monta Vista, Lynbrook, Mission San Jose, and Harker train with us alongside their AP coursework; the methodology sharpens AP performance as a side effect."
const schools = [
  "Monta Vista HS",
  "Lynbrook HS",
  "Cupertino HS",
  "Mission San Jose HS",
  "Saratoga HS",
  "Irvington HS (Fremont)",
  "Henry M. Gunn HS",
  "Palo Alto HS",
  "Harker School",
  "Lowell HS (San Francisco)"
]

const faqs = [
  {
    "question": "Where in SF Bay Area do you run classes?",
    "answer": "Classes are 100% live online — no in-person centre in Northern California (San Jose, Santa Clara, San Mateo, Alameda counties). The live format means our AIIMS-trained faculty teach the same students from across the metro, scheduled for PT (Pacific) evenings (typically 7-9 PM your local time). Recordings are available if a student misses a session."
  },
  {
    "question": "Which SF Bay Area schools do your students come from?",
    "answer": "We have repeat enrolments from the high-USABO-density schools in Northern California (San Jose, Santa Clara, San Mateo, Alameda counties) — listed above. We also coach students from any US high school; the schools listed are simply the ones where multiple students from the same school have trained with us."
  },
  {
    "question": "What's the time commitment for a SF Bay Area student in 11th or 12th grade?",
    "answer": "Plan for 8–12 hrs/week from September to early February (Open Exam), rising to 12–15 hrs/week in January for past-paper saturation. Sessions are scheduled to fit AP coursework — typically 2 weekday evenings + Sunday morning. Junior-year USABO + AP Biology in parallel is the most efficient structure; Feb USABO finishes before AP exam intensity kicks in."
  },
  {
    "question": "How is your USABO coaching different from local SF Bay Area tutoring?",
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
    "question": "When does the SF Bay Area PT (Pacific) batch start?",
    "answer": "New batches start in early September each year, aligned with the US academic calendar so students arrive at February USABO Open with a full 6-month preparation cycle. Mid-cycle entry is possible — we run 1-on-1 catch-up sessions to bring late entrants up to speed."
  }
]

export default function USABOCityusabocoachingbayareaPage() {
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
