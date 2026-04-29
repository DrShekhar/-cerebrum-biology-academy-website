import { Metadata } from 'next'
import CBOCityTemplate from '@/components/cbo/CBOCityTemplate'

const cityName = 'Vancouver & Lower Mainland'
const citySlug = 'vancouver'
const region = 'Greater Vancouver + Lower Mainland (Burnaby, Richmond, Surrey, Coquitlam, North Vancouver, West Vancouver)'
const timezone = 'PT (Pacific)'
const url = 'https://cerebrumbiologyacademy.com/cbo-coaching-vancouver'

export const metadata: Metadata = {
  title: 'CBO Coaching for Vancouver Students | AIIMS-Trained Biology Olympiad Tutors',
  description:
    'Canadian Biology Olympiad (CBO + IBO) coaching for Vancouver and Lower Mainland students. Live online classes in PT, AIIMS-trained biology specialist faculty. Schools served include University Hill, Eric Hamber, Sir Winston Churchill, York House, Crofton House, St. Georges.',
  keywords: [
    'cbo coaching vancouver',
    'cbo tutor vancouver',
    'cbo tutor near me vancouver',
    'canadian biology olympiad vancouver',
    'biology olympiad coaching vancouver',
    'biology olympiad tutor vancouver',
    'biology olympiad tutor near me vancouver',
    'ibo tutor vancouver',
    'ibo tutor near me vancouver',
    'cbo coaching british columbia',
    'cbo coaching burnaby',
    'cbo coaching richmond',
    'cbo coaching surrey',
    'best biology olympiad tutor vancouver',
    'private cbo tutor vancouver',
    'cbo coaching for University Hill students',
    'cbo coaching for Eric Hamber students',
    'cbo coaching for Sir Winston Churchill students',
    'cbo coaching for St Georges students',
    'cbo coaching for York House students',
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
    title: 'CBO Coaching for Vancouver Students',
    description:
      'CBO + IBO preparation for Vancouver / Lower Mainland students. AIIMS-trained faculty, live PT classes, schools include University Hill, Eric Hamber, Churchill.',
    url,
    type: 'website',
    locale: 'en_CA',
    siteName: 'Cerebrum Biology Academy',
  },
}

const heroBlurb =
  "Vancouver and the Lower Mainland host one of the strongest Canadian Biology Olympiad concentrations on the West Coast — driven by University Hill SS, Eric Hamber, Sir Winston Churchill, David Thompson, and the strong independent-school cluster (York House, Crofton House, St. George's). The South Asian and East Asian academic communities across Burnaby, Richmond, Surrey, and West Vancouver further densify the CBO talent pool. Our PT-evening live classes are calibrated to fit AP / IB workloads at these schools."

const rigourBlurb =
  "Vancouver-area Indian-Canadian families come to Cerebrum because the local biology-coaching market is thin on olympiad depth — most options are AP / IB exam tutoring, not olympiad-grade. AIIMS-trained, biology-only faculty teaching with weekly written feedback on every past-paper attempt is structurally different. The same Indian small-batch coaching tradition that produces consistent IBO performance, run on PT evenings to fit cleanly inside University Hill / Eric Hamber / Churchill / Crofton House calendars."

const schools = [
  'University Hill Secondary School',
  'Eric Hamber Secondary',
  'Sir Winston Churchill Secondary',
  'David Thompson Secondary',
  "St. George's School",
  'York House School',
  'Crofton House School',
  'West Point Grey Academy',
  'Burnaby North Secondary',
  'Steveston-London Secondary (Richmond)',
  'Richmond Secondary',
  "Mulgrave (West Vancouver)",
]

const faqs = [
  {
    question: 'When is the Canadian Biology Olympiad (CBO) held?',
    answer:
      'The CBO Open / Qualifying round is typically held in spring (March–April) and is school-administered. The National round follows in late spring; top performers are invited to the IBO selection camp held over the summer. Exact 2026 dates are confirmed by the host institution each autumn — we publish them on the main /cbo-coaching hub as soon as they are released.',
  },
  {
    question: 'Where in Vancouver do you run classes?',
    answer:
      "We don't run a physical centre in Vancouver — and that's intentional. CBO + IBO coaching is delivered as live online classes on Pacific Time, scheduled for typically 7–9 PM PT on weekday evenings. Recordings are available if a student misses a session, and our weekend office hours are scheduled in PT-friendly slots for Vancouver and Lower Mainland students.",
  },
  {
    question: 'Which Vancouver / Lower Mainland schools do your students come from?',
    answer:
      "We have repeat enrolments from University Hill SS, Eric Hamber, Sir Winston Churchill, David Thompson, and the independent-school cluster (York House, Crofton House, St. George's, West Point Grey Academy). Strong representation also from Burnaby North, Steveston-London (Richmond), Richmond Secondary, and Mulgrave (West Vancouver). The South Asian and East Asian academic communities across Surrey, Burnaby, Richmond, and Coquitlam are well represented in our cohorts. We coach students from any BC school — these are simply the schools we have repeat enrolments from.",
  },
  {
    question: 'What time commitment does CBO require for a Vancouver student in Grade 11 or 12?',
    answer:
      'Plan for 6–10 hrs/week from September to early March (the Open round), rising to 10–12 hrs/week in February for past-paper saturation. Sessions are scheduled to fit AP Biology / IB HL coursework — typically 2 weekday evenings + Sunday morning. Many of our Vancouver students sit AP-5 or IB-7 alongside CBO; the curricula overlap heavily so the workload is more manageable than it sounds.',
  },
  {
    question: 'How does CBO standing weigh in Canadian university admissions?',
    answer:
      "Strong CBO standing is a meaningful credential for Life Sciences and Med-track applications to UBC, UofT, McGill, Waterloo, and Western. UBC Sauder (for biotech / med-bio interests), UBC Faculty of Science (Honours Biology / Microbiology / Cell Biology), and the BC-cluster of direct-entry medicine pathways all recognise CBO selection-camp invitees in admissions decisions. CBO Team Canada members carry an elite credential comparable to top USAMO performers.",
  },
  {
    question: 'How is your CBO coaching different from local Vancouver tutoring?',
    answer:
      "Three differences. (1) Biology only, taught by AIIMS-trained faculty — depth, not breadth. (2) Faculty-led live classes, not a video library — the same instructor for the year, with weekly written feedback on past papers. (3) Indian small-batch coaching tradition: max 12 students per batch, retrieval-heavy methodology. Most Vancouver biology tutoring is AP / IB exam shaped; ours is olympiad-shaped from day one.",
  },
  {
    question: 'My child is already strong in AP Biology / IB HL Biology — is CBO worth pursuing?',
    answer:
      "Yes — and the AP / IB foundation is exactly the right starting point. AP-5 covers about 70% of CBO-Open content; IB HL Biology covers about 75%. The remaining gap (deeper molecular biology, ethology, biostatistics, plant + animal histology) is what our 6-week bridge from AP / IB to CBO is designed to fill. CBO standing on a Canadian university application is a national-tier credential AP / IB scores alone don't supply.",
  },
]

export default function CBOVancouver() {
  const url = 'https://cerebrumbiologyacademy.com/cbo-coaching-vancouver'

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
      { '@type': 'ListItem', position: 3, name: 'CBO Coaching — Vancouver & Lower Mainland', item: url },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'CBO Coaching — Vancouver & Lower Mainland',
    description:
      'Canadian Biology Olympiad (CBO Open + National + IBO selection camp) preparation for Vancouver / Lower Mainland high school students. AIIMS-trained, biology-only faculty. Live online classes in PT.',
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
      courseSchedule: 'Live classes in PT',
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
