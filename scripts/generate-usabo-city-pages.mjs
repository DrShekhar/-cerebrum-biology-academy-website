#!/usr/bin/env node
/**
 * Generate USABO city/region landing page.tsx files.
 * Each city directory must already exist under src/app/<slug>/.
 *
 * Run: node scripts/generate-usabo-city-pages.mjs
 */

import { writeFileSync, existsSync } from 'fs'
import path from 'path'

const PROJECT_ROOT = process.cwd()

const CITIES = [
  {
    slug: 'usabo-coaching-northern-virginia-dc',
    cityName: 'Northern Virginia & DC',
    region: 'Virginia + Maryland + District of Columbia',
    timezone: 'ET (Eastern)',
    schools: [
      'Thomas Jefferson HS for Science & Technology (TJHSST)',
      'McLean HS',
      'Langley HS',
      'Walt Whitman HS',
      'Winston Churchill HS (MD)',
      'Bethesda-Chevy Chase HS',
      'Montgomery Blair Magnet',
      'Centreville / Oakton HS',
    ],
    heroBlurb:
      'The Northern Virginia / DC corridor produces more USABO Finalists than any other US region — TJHSST alone consistently sends 10–15 students to Semifinals each year. We coach students from TJHSST, McLean, Langley, Whitman, Churchill, Blair, and the Bethesda magnet network on the same Indian-style olympiad rigour that has produced consistent IBO medal performances.',
    rigourBlurb:
      "Northern Virginia families weighing options between Curie Learning, Aristotle Circle, and individual TJHSST tutors come to Cerebrum for what neither offers: AIIMS-trained faculty teaching biology only — to olympiad depth — in a faculty-led, small-batch tradition. We don't run video libraries. We run the kind of weekly, written-feedback olympiad coaching that produces national champions in India, scheduled for ET evenings.",
  },
  {
    slug: 'usabo-coaching-bay-area',
    cityName: 'SF Bay Area',
    region: 'Northern California (San Jose, Santa Clara, San Mateo, Alameda counties)',
    timezone: 'PT (Pacific)',
    schools: [
      'Monta Vista HS',
      'Lynbrook HS',
      'Cupertino HS',
      'Mission San Jose HS',
      'Saratoga HS',
      'Irvington HS (Fremont)',
      'Henry M. Gunn HS',
      'Palo Alto HS',
      'Harker School',
      'Lowell HS (San Francisco)',
    ],
    heroBlurb:
      "The Bay Area's USABO concentration is unmatched on the West Coast. Monta Vista, Lynbrook, Mission San Jose, Saratoga, and Cupertino HS together account for a significant fraction of every year's Semifinalist class. Our PT-evening live classes are calibrated for these schools' AP Biology + tier-1 academic load.",
    rigourBlurb:
      'Bay Area families know the difference between a slick US edtech platform and actual olympiad coaching. Cerebrum is the latter — AIIMS-trained faculty, biology only, taught at olympiad depth, with weekly written feedback on every past-paper attempt. Students from Monta Vista, Lynbrook, Mission San Jose, and Harker train with us alongside their AP coursework; the methodology sharpens AP performance as a side effect.',
  },
  {
    slug: 'usabo-coaching-new-york',
    cityName: 'New York City & Long Island',
    region: 'New York City + Nassau + Suffolk + nearby Westchester',
    timezone: 'ET (Eastern)',
    schools: [
      'Stuyvesant HS',
      'Bronx HS of Science',
      'Hunter College HS',
      'Brooklyn Tech',
      'Townsend Harris HS',
      'Jericho HS',
      'Great Neck North HS',
      'Roslyn HS',
      'Syosset HS',
      'Ward Melville HS',
    ],
    heroBlurb:
      'Stuyvesant, Bronx Science, Hunter, and the Long Island powerhouse cluster (Jericho, Great Neck, Roslyn, Syosset, Ward Melville) together produce 30–40 USABO Semifinalists each year. We coach students from all of these schools on a schedule that fits their AP Biology + magnet-program academic load.',
    rigourBlurb:
      "New York students are already over-tutored — what they're missing is olympiad-grade depth. Cerebrum supplies that: AIIMS-trained, biology-only faculty teaching the Indian small-batch tradition. Weekly written feedback on every past-paper. Live ET-evening classes. The same rigour Stuyvesant students put into AMC/USAMO prep, applied to USABO.",
  },
  {
    slug: 'usabo-coaching-boston',
    cityName: 'Greater Boston',
    region: 'Massachusetts (Greater Boston metro)',
    timezone: 'ET (Eastern)',
    schools: [
      'Lexington HS',
      'Acton-Boxborough Regional HS',
      'Newton South HS',
      'Newton North HS',
      'Belmont HS',
      'Wellesley HS',
      'Sharon HS',
      'Westford Academy',
      'Phillips Academy Andover',
    ],
    heroBlurb:
      "Lexington, Acton-Boxborough, Newton South, and Belmont consistently appear on USABO Semifinalist rosters. Boston's Route 128 academic belt — heavy with Indian-American and East-Asian-American families — is one of the densest USABO markets per capita. We run ET-evening classes calibrated for these schools' AP-heavy junior- and senior-year schedules.",
    rigourBlurb:
      'Boston-area families come to Cerebrum because the local options are AP-tutoring shaped, not olympiad-shaped. Our AIIMS-trained, biology-only faculty teach to USABO Semifinal depth from week one, then layer on AP exam tactics in March–May. The Indian small-batch coaching tradition — faculty-led, weekly feedback, retrieval-heavy — produces results these families recognise.',
  },
  {
    slug: 'usabo-coaching-houston',
    cityName: 'Houston',
    region: 'Greater Houston (Harris + Fort Bend + Brazoria counties)',
    timezone: 'CT (Central)',
    schools: [
      'Clements HS',
      'Memorial HS',
      'BASIS Houston',
      'Cinco Ranch HS',
      'Dulles HS',
      'Bellaire HS',
      'Carnegie Vanguard HS',
      'Stephen F. Austin HS',
    ],
    heroBlurb:
      "Clements, Memorial, BASIS Houston, Cinco Ranch, and Dulles together represent the strongest USABO concentration in Texas — driven largely by Houston's Indian-American and East-Asian-American academic communities in Sugar Land, Katy, and the Energy Corridor. CT-evening live classes match these schools' AP and IB workloads.",
    rigourBlurb:
      'Houston families recognise the difference between local AP tutoring and the olympiad-grade biology training Cerebrum delivers. Our AIIMS-trained faculty teach biology only — to USABO Semifinal and IBO depth — using the small-batch, weekly-feedback methodology that produces Indian top performers. CT-evening live classes mean no scheduling friction with AP Bio classwork.',
  },
]

const baseFaqs = (city, region, timezone) => [
  {
    question: `Where in ${city} do you run classes?`,
    answer: `Classes are 100% live online — no in-person centre in ${region}. The live format means our AIIMS-trained faculty teach the same students from across the metro, scheduled for ${timezone} evenings (typically 7-9 PM your local time). Recordings are available if a student misses a session.`,
  },
  {
    question: `Which ${city} schools do your students come from?`,
    answer: `We have repeat enrolments from the high-USABO-density schools in ${region} — listed above. We also coach students from any US high school; the schools listed are simply the ones where multiple students from the same school have trained with us.`,
  },
  {
    question: `What's the time commitment for a ${city} student in 11th or 12th grade?`,
    answer:
      'Plan for 8–12 hrs/week from September to early February (Open Exam), rising to 12–15 hrs/week in January for past-paper saturation. Sessions are scheduled to fit AP coursework — typically 2 weekday evenings + Sunday morning. Junior-year USABO + AP Biology in parallel is the most efficient structure; Feb USABO finishes before AP exam intensity kicks in.',
  },
  {
    question: `How is your USABO coaching different from local ${city} tutoring?`,
    answer: `Three differences. (1) Biology only, taught by AIIMS-trained faculty — depth, not breadth. (2) Faculty-led live classes, not a video library — the same instructor for the year. (3) Indian small-batch coaching tradition: weekly written feedback on every past-paper attempt, retrieval-heavy methodology, max 12 students per batch. This is what produces top-tier olympiad performances; it's structurally different from US AP tutoring or generic platforms.`,
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
    question: `When does the ${city} ${timezone} batch start?`,
    answer:
      'New batches start in early September each year, aligned with the US academic calendar so students arrive at February USABO Open with a full 6-month preparation cycle. Mid-cycle entry is possible — we run 1-on-1 catch-up sessions to bring late entrants up to speed.',
  },
]

function generatePageTsx(city) {
  const url = `https://cerebrumbiologyacademy.com/${city.slug}`

  return `import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

const cityName = ${JSON.stringify(city.cityName)}
const citySlug = ${JSON.stringify(city.slug)}
const region = ${JSON.stringify(city.region)}
const timezone = ${JSON.stringify(city.timezone)}
const url = ${JSON.stringify(url)}

export const metadata: Metadata = {
  title: \`USABO Coaching for \${cityName} Students | AIIMS-Trained Faculty\`,
  description: \`USA Biology Olympiad (USABO + IBO) coaching for \${cityName} high school students. Live classes in \${timezone}, AIIMS-trained biology specialist faculty, small batches, USABO Open + Semifinal + Finals pathway.\`,
  keywords: ${JSON.stringify(
    [
      `USABO coaching ${city.cityName.toLowerCase()}`,
      `USABO ${city.cityName.toLowerCase()}`,
      `USA Biology Olympiad ${city.cityName.toLowerCase()}`,
      `IBO preparation ${city.cityName.toLowerCase()}`,
      `biology olympiad coaching ${city.cityName.toLowerCase()}`,
      `USABO tutor ${city.cityName.toLowerCase()}`,
      `USABO online coaching ${city.cityName.toLowerCase()}`,
      `AP Biology to USABO ${city.cityName.toLowerCase()}`,
      ...city.schools.slice(0, 5).map((s) => `USABO coaching for ${s} students`),
    ],
    null,
    2
  )},
  alternates: {
    canonical: url,
    languages: { en: url, 'en-US': url },
  },
  openGraph: {
    title: \`USABO Coaching for \${cityName} Students\`,
    description: \`USABO + IBO preparation for \${cityName} students. AIIMS-trained faculty, live classes in \${timezone}.\`,
    url,
    type: 'website',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
}

const heroBlurb = ${JSON.stringify(city.heroBlurb)}
const rigourBlurb = ${JSON.stringify(city.rigourBlurb)}
const schools = ${JSON.stringify(city.schools, null, 2)}

const faqs = ${JSON.stringify(baseFaqs(city.cityName, city.region, city.timezone), null, 2)}

export default function USABOCity${city.slug.replace(/[^a-zA-Z0-9]/g, '')}Page() {
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
      { '@type': 'ListItem', position: 3, name: \`USABO Coaching — \${cityName}\`, item: url },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: \`USABO Coaching — \${cityName}\`,
    description: \`USA Biology Olympiad (USABO Open + Semifinal + National Finals) preparation for high school students in \${region}. AIIMS-trained, biology-only faculty. Live online classes in \${timezone}.\`,
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
      audienceType: \`USA-based high school students in \${region} preparing for the USA Biology Olympiad (USABO Open Exam, Semifinal, and National Finals) and the IBO selection pathway\`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      location: { '@type': 'VirtualLocation', url },
      courseSchedule: \`Live classes in \${timezone}\`,
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
`
}

let count = 0
for (const city of CITIES) {
  const dir = path.join(PROJECT_ROOT, 'src', 'app', city.slug)
  if (!existsSync(dir)) {
    console.log(`✗ Skipping ${city.slug} — directory missing`)
    continue
  }
  const filePath = path.join(dir, 'page.tsx')
  if (existsSync(filePath)) {
    console.log(`⊘ Skipping ${city.slug} — page.tsx already exists`)
    continue
  }
  writeFileSync(filePath, generatePageTsx(city), 'utf8')
  count++
  console.log(`✓ Created ${path.relative(PROJECT_ROOT, filePath)}`)
}
console.log(`\nGenerated ${count} new USABO city pages.`)
