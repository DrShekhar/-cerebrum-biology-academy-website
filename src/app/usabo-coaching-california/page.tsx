import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

const cityName = 'California'
const citySlug = 'usabo-coaching-california'
const region =
  'California (statewide — Bay Area, Los Angeles, San Diego, Orange County, Sacramento)'
const timezone = 'PT (Pacific)'
const url = 'https://cerebrumbiologyacademy.com/usabo-coaching-california'

export const metadata: Metadata = {
  title: `USABO Coaching California — Statewide Biology Olympiad Prep`,
  description: `California produces the largest share of USABO Finalists in the country. Statewide USA Biology Olympiad coaching — Bay Area, LA, San Diego, Orange County, Sacramento. AIIMS-trained faculty, live PT classes, weekly feedback.`,
  keywords: [
    'USABO coaching california',
    'USABO california',
    'USA Biology Olympiad california',
    'biology olympiad coaching california',
    'IBO coaching california',
    'USABO tutor california',
    'USABO online coaching california',
    'best USABO coaching california',
    'USABO coaching bay area orange county sacramento',
    'AP Biology to USABO california',
  ],
  alternates: {
    canonical: url,
    languages: { en: url, 'en-US': url, 'x-default': url },
  },
  openGraph: {
    title: `USABO Coaching in California`,
    description: `Statewide USABO + IBO preparation for California students. AIIMS-trained faculty, live classes in ${timezone}.`,
    url,
    type: 'website',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `USABO Coaching in California · Cerebrum`,
    description: `USA Biology Olympiad (USABO + IBO) coaching for California high school students, statewide. Live ${timezone} classes, AIIMS-trained biology specialist faculty.`,
  },
}

const heroBlurb =
  'California produces the largest share of USABO Finalists of any state — roughly a quarter of the national Finals class in recent years. That strength is concentrated in a handful of magnet-tier schools across the Bay Area, Orange County, and Sacramento. Wherever in California you are, our live PT-evening classes give students olympiad-depth biology from faculty who teach nothing else.'
const rigourBlurb =
  'Cerebrum is biology only, taught by AIIMS-trained faculty at olympiad depth, with weekly written feedback on every past-paper attempt and a max of 12 students per batch. California students train alongside their AP Biology coursework; the same retrieval-heavy methodology that produces USABO Semifinalists also sharpens AP performance. Pick your metro page below for region-specific school lists and scheduling.'
const schools = [
  'The Harker School (San Jose)',
  'Lynbrook & Monta Vista HS (San Jose / Cupertino)',
  'Mission San Jose HS (Fremont)',
  'University HS & Troy HS (Irvine / Fullerton)',
  'Mira Loma HS (Sacramento)',
]

const relatedMetros = [
  { slug: 'bay-area', label: 'SF Bay Area (incl. Silicon Valley)' },
  { slug: 'los-angeles', label: 'Los Angeles' },
  { slug: 'orange-county', label: 'Orange County (Irvine)' },
  { slug: 'san-diego', label: 'San Diego' },
  { slug: 'sacramento', label: 'Sacramento' },
]

const faqs = [
  {
    question: 'Do you have a centre in California?',
    answer:
      'No — classes are 100% live online, scheduled for PT (Pacific) evenings so they fit the California school day (typically 7–9 PM). The online format is why a student in Irvine, San Jose, and Sacramento can train in the same faculty-led batch. Recordings are available if a student misses a session.',
  },
  {
    question: 'Why is California the strongest USABO state?',
    answer:
      'California has the densest cluster of magnet-tier public high schools and competitive private schools in the country, and in recent years it has accounted for roughly a quarter of the ~20–26 USABO National Finalists. The strength concentrates in the Bay Area / Silicon Valley, Orange County (Irvine), and Sacramento (Mira Loma HS).',
  },
  {
    question: 'Which California metro page should I use?',
    answer:
      'Use the metro closest to your school district for region-specific school lists, time-zone scheduling, and FAQs: SF Bay Area (which covers Silicon Valley / South Bay — Lynbrook, Monta Vista, Harker, Mission San Jose), Los Angeles, Orange County (Irvine), San Diego, or Sacramento. The programme is identical across metros — the metro pages just carry localised context.',
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
    question: 'When do California (PT) batches start?',
    answer:
      'New batches start in early September each year, aligned with the US academic calendar so students reach February USABO Open with a full 6-month preparation cycle. Mid-cycle entry is possible — we run 1-on-1 catch-up sessions to bring late entrants up to speed.',
  },
]

export default function USABOCaliforniaPage() {
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
    description: `USA Biology Olympiad (USABO Open + Semifinal + National Finals) preparation for high school students across ${region}. AIIMS-trained, biology-only faculty. Live online classes in ${timezone}.`,
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
        name: 'California',
        containedInPlace: { '@type': 'Country', name: 'United States' },
        address: { '@type': 'PostalAddress', addressRegion: 'CA', addressCountry: 'US' },
      },
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: `California high school students preparing for the USA Biology Olympiad (USABO Open Exam, Semifinal, and National Finals) and the IBO selection pathway`,
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
        relatedMetros={relatedMetros}
      />
    </>
  )
}
