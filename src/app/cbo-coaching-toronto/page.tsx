import { Metadata } from 'next'
import CBOCityTemplate from '@/components/cbo/CBOCityTemplate'

const cityName = 'Toronto & GTA'
const citySlug = 'toronto'
const region = 'Greater Toronto Area + adjacent Ontario (Mississauga, Brampton, Markham, Vaughan, Oakville, Burlington)'
const timezone = 'ET (Eastern)'
const url = 'https://cerebrumbiologyacademy.com/cbo-coaching-toronto'

export const metadata: Metadata = {
  title: 'CBO Coaching for Toronto Students | AIIMS-Trained Biology Olympiad Tutors',
  description:
    'Canadian Biology Olympiad (CBO + IBO) coaching for Toronto and GTA students. Live online classes in ET, AIIMS-trained biology specialist faculty, small batches. Schools served include UTS, Marc Garneau, Havergal, Harbord, North Toronto.',
  keywords: [
    'cbo coaching toronto',
    'cbo tutor toronto',
    'cbo tutor near me toronto',
    'canadian biology olympiad toronto',
    'biology olympiad coaching toronto',
    'biology olympiad tutor toronto',
    'biology olympiad tutor near me toronto',
    'ibo tutor toronto',
    'ibo tutor near me toronto',
    'cbo coaching gta',
    'biology olympiad coaching mississauga',
    'biology olympiad coaching brampton',
    'best biology olympiad tutor toronto',
    'private cbo tutor toronto',
    'cbo coaching for UTS students',
    'cbo coaching for Marc Garneau students',
    'cbo coaching for Havergal students',
    'cbo coaching for Harbord CI students',
    'cbo coaching for North Toronto CI students',
  ],
  alternates: {
    canonical: url,
    languages: {
      en: url,
      'en-CA': url,
      'x-default': url,
    },
  },
  openGraph: {
    title: 'CBO Coaching for Toronto Students',
    description:
      'CBO + IBO preparation for Toronto / GTA students. AIIMS-trained faculty, live ET classes, schools include UTS, Marc Garneau, Havergal.',
    url,
    type: 'website',
    locale: 'en_CA',
    siteName: 'Cerebrum Biology Academy',
  },
}

const heroBlurb =
  "Toronto and the GTA host one of the densest Canadian Biology Olympiad concentrations — driven by University of Toronto Schools (UTS), Marc Garneau CI's MaCS programme, Havergal, Harbord CI, and a strong Indian-Canadian academic community across Mississauga, Brampton, Markham, and Vaughan. Our ET-evening live classes are calibrated to fit AP / IB workloads at these schools, with the depth-first methodology that converts strong-AP-Bio students into CBO National-round contenders."

const rigourBlurb =
  "Toronto-area Indian-Canadian families come to Cerebrum because the local biology-coaching market is shallow on olympiad depth — most options are AP / IB exam tutoring, not olympiad-grade. AIIMS-trained, biology-only faculty teaching with weekly written feedback on every past-paper attempt is structurally different. The same Indian small-batch coaching tradition that produces consistent IBO performance, run on ET evenings to sit cleanly inside a UTS / Marc Garneau / Havergal student's calendar."

const schools = [
  'University of Toronto Schools (UTS)',
  'Marc Garneau CI (TOPS / MaCS)',
  'Havergal College',
  'Harbord Collegiate Institute',
  'North Toronto CI',
  'Earl Haig Secondary School',
  'William Lyon Mackenzie CI',
  'Don Mills Collegiate',
  'Bayview Glen',
  'Lorne Park SS (Mississauga)',
  'Erindale SS (Mississauga)',
  'John Fraser SS (Mississauga)',
]

const faqs = [
  {
    question: 'When is the Canadian Biology Olympiad (CBO) held?',
    answer:
      'The CBO Open / Qualifying round is typically held in spring (March–April) and is school-administered. The National round follows in late spring; top performers are invited to the IBO selection camp held over the summer. Exact 2026 dates are confirmed by the host institution each autumn — we publish them on the main /cbo-coaching hub as soon as they are released.',
  },
  {
    question: 'Where in Toronto do you run classes?',
    answer:
      "We don't run a physical centre in Toronto — and that's intentional. CBO + IBO coaching is delivered as live online classes on Eastern Time, scheduled for typically 7–9 PM ET on weekday evenings (the slot that fits cleanly with UTS, Marc Garneau, Havergal, and Harbord CI student calendars). Recordings are available if a student misses a session.",
  },
  {
    question: 'Which Toronto / GTA schools do your students come from?',
    answer:
      'We have repeat enrolments from UTS, Marc Garneau CI, Havergal, Harbord CI, North Toronto CI, Earl Haig, William Lyon Mackenzie CI, and Don Mills CI in Toronto proper, plus Lorne Park, Erindale, and John Fraser SS in Mississauga. The Indian-Canadian academic communities across Markham, Vaughan, Brampton, Mississauga, and Oakville also have strong representation in our cohorts. We coach students from any GTA / Ontario school — these are simply the schools we have repeat enrolments from.',
  },
  {
    question: 'What time commitment does CBO require for a Toronto student in Grade 11 or 12?',
    answer:
      'Plan for 6–10 hrs/week from September to early March (the Open round), rising to 10–12 hrs/week in February for past-paper saturation. Sessions are scheduled to fit AP Biology / IB HL coursework — typically 2 weekday evenings + Sunday morning. Many of our Toronto students sit AP-5 or IB-7 alongside CBO; the curricula overlap heavily so the workload is more manageable than it sounds.',
  },
  {
    question: 'How does CBO standing weigh in Canadian university admissions?',
    answer:
      'Strong CBO standing is a meaningful credential for Life Sciences and Med-track applications to UofT, McGill, UBC, Waterloo, Western, and Queen\'s. Selection-camp invitees are highly visible in admissions decisions, particularly for competitive direct-entry medicine programmes (McMaster Health Sciences, Western IMS, McGill Med-P) and for strong Bachelor of Health Sciences / Biology / Medical Sciences programmes. CBO Team Canada members carry an elite credential comparable to top USAMO performers.',
  },
  {
    question: 'How is your CBO coaching different from local Toronto tutoring?',
    answer:
      "Three differences. (1) Biology only, taught by AIIMS-trained faculty — depth, not breadth. (2) Faculty-led live classes, not a video library — the same instructor for the year, with weekly written feedback on past papers. (3) Indian small-batch coaching tradition: max 12 students per batch, retrieval-heavy methodology. This is structurally different from US/Canadian AP-tutoring or generic platforms — it's olympiad-shaped from day one.",
  },
  {
    question: 'My child is already strong in AP Biology / IB HL Biology — is CBO worth pursuing?',
    answer:
      "Yes — and the AP / IB foundation is exactly the right starting point. AP-5 covers about 70% of CBO-Open content; IB HL Biology covers about 75%. The remaining gap (deeper molecular biology, ethology, biostatistics, plant + animal histology) is what our 6-week bridge from AP / IB to CBO is designed to fill. CBO standing on a Canadian university application is a national-tier credential AP / IB scores alone don't supply.",
  },
]

export default function CBOToronto() {
  const url = 'https://cerebrumbiologyacademy.com/cbo-coaching-toronto'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'CBO Coaching',
        item: 'https://cerebrumbiologyacademy.com/cbo-coaching',
      },
      { '@type': 'ListItem', position: 3, name: 'CBO Coaching — Toronto & GTA', item: url },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'CBO Coaching — Toronto & GTA',
    description:
      'Canadian Biology Olympiad (CBO Open + National + IBO selection camp) preparation for Toronto and GTA high school students. AIIMS-trained, biology-only faculty. Live online classes in ET.',
    url,
    inLanguage: 'en-CA',
    educationalLevel: 'High School',
    about: 'CBO - Canadian Biology Olympiad',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: region,
        containedInPlace: { '@type': 'Country', name: 'Canada' },
      },
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: `Canadian high school students in ${region} preparing for the Canadian Biology Olympiad (CBO Open, National Round, and IBO selection camp)`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      location: { '@type': 'VirtualLocation', url },
      courseSchedule: 'Live classes in ET',
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
      <CBOCityTemplate
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
