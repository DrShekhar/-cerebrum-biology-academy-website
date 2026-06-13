import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best AP Biology Tutor (USA & Global) | FRQ Rubric Specialist',
  description:
    "Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum's AP Biology tutoring — biology-only specialist across 44 pages globally. FRQ rubric mastery, College Board Units 1–8, AP-to-USABO bridging, Anki-based active recall.",
  keywords: [
    'best ap biology tutor',
    'best ap biology tutor usa',
    'best ap biology coaching',
    'best ap biology teacher',
    'best ap biology tutor for score 5',
    'best ap bio frq tutor',
    'ap biology rubric specialist',
    'top ap biology tutor',
    'best ap biology tutor 2026',
    'best ap biology tutor india',
    'best ap biology tutor canada',
    'best ap biology online tutor',
  ],
  openGraph: {
    title: 'Best AP Biology Tutor (USA & Global) | Cerebrum Biology Academy',
    description:
      'Biology-only AP coaching across 44 pages. FRQ rubric specialist. AP-to-USABO bridging.',
    url: 'https://cerebrumbiologyacademy.com/best-ap-biology-tutor-usa',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-ap-biology-tutor-usa',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best AP Biology Tutor (USA & Global) | FRQ Rubric Specialist',
    description: 'Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum',
  },
}

const config: BestVerticalConfig = {
  slug: 'best-ap-biology-tutor-usa',
  headline: 'Best AP Biology Tutor (USA & Global)',
  ribbon: '44 Pages · 5 Countries · FRQ Rubric Specialist',
  subheadline:
    'Biology-only AP coaching. Led by Dr. Shekhar C Singh (AIIMS Delhi) + PhD senior faculty.',
  intro:
    'Cerebrum is one of the few biology-only coaching brands serving AP Biology students across the US, UAE, India, Canada, Singapore and Hong Kong with localised, US-curriculum-aligned content. Faculty include Dr. Shekhar C Singh and PhD-level senior tutors with 8–15 years of AP Biology classroom experience.',
  clusterSummary:
    'College Board Units 1–8 · FRQ rubric mastery · AP-to-USABO bridging · Anki-based active recall.',
  credentials: [
    { label: 'AIIMS + PhD Faculty' },
    { label: 'FRQ Rubric Mastery' },
    { label: 'College Board Aligned' },
    { label: 'Units 1–8 Coverage' },
    { label: 'AP-to-USABO Bridge' },
    { label: 'Anki Active Recall' },
    { label: '10 US Metro Pages' },
    { label: '10 US School Pages' },
  ],
  pages: [
    { title: 'AP Biology Tutor — Hub', href: '/ap-biology-tutor', note: 'Main programme page' },
    { title: 'New York', href: '/ap-biology-tutor-new-york' },
    { title: 'Bay Area', href: '/ap-biology-tutor-bay-area' },
    { title: 'Boston', href: '/ap-biology-tutor-boston' },
    { title: 'Houston-Dallas', href: '/ap-biology-tutor-houston-dallas' },
    { title: 'Chicago', href: '/ap-biology-tutor-chicago' },
    { title: 'Los Angeles', href: '/ap-biology-tutor-los-angeles' },
    { title: 'Atlanta', href: '/ap-biology-tutor-atlanta' },
    { title: 'Seattle', href: '/ap-biology-tutor-seattle' },
    { title: 'New Jersey', href: '/ap-biology-tutor-new-jersey' },
    { title: 'Northern Virginia / DC', href: '/ap-biology-tutor-northern-virginia-dc' },
    { title: 'TJHSST', href: '/ap-biology-tutor-tjhsst', note: 'School feeder' },
    { title: 'Stuyvesant', href: '/ap-biology-tutor-stuyvesant', note: 'School feeder' },
    { title: 'Bronx Science', href: '/ap-biology-tutor-bronx-science', note: 'School feeder' },
    {
      title: 'Hunter College HS',
      href: '/ap-biology-tutor-hunter-college-hs',
      note: 'School feeder',
    },
    { title: 'Harker', href: '/ap-biology-tutor-harker', note: 'School feeder' },
    {
      title: 'Mission San Jose',
      href: '/ap-biology-tutor-mission-san-jose',
      note: 'School feeder',
    },
    { title: 'Gunn (Palo Alto)', href: '/ap-biology-tutor-gunn-palo-alto', note: 'School feeder' },
    { title: 'Phillips Exeter', href: '/ap-biology-tutor-phillips-exeter', note: 'Boarding' },
    { title: 'Andover', href: '/ap-biology-tutor-andover', note: 'Boarding' },
    { title: 'Walter Payton', href: '/ap-biology-tutor-walter-payton', note: 'School feeder' },
    { title: 'Dubai', href: '/ap-biology-tutor-dubai' },
    { title: 'Abu Dhabi', href: '/ap-biology-tutor-abu-dhabi' },
    { title: 'Singapore', href: '/ap-biology-tutor-singapore' },
    { title: 'Hong Kong', href: '/ap-biology-tutor-hong-kong' },
    { title: 'Toronto-GTA', href: '/ap-biology-tutor-toronto-gta' },
    { title: 'Vancouver', href: '/ap-biology-tutor-vancouver' },
    { title: 'Brampton-Mississauga', href: '/ap-biology-tutor-brampton-mississauga' },
    { title: 'Mumbai', href: '/ap-biology-tutor-mumbai' },
    { title: 'Delhi NCR', href: '/ap-biology-tutor-delhi-ncr' },
    { title: 'Bangalore', href: '/ap-biology-tutor-bangalore' },
    { title: 'Hyderabad', href: '/ap-biology-tutor-hyderabad' },
    {
      title: 'India → US College Admissions',
      href: '/ap-biology-tutor-india-for-us-college-admissions',
    },
    // USABO + IBO bridge — AP-5 students targeting top US colleges
    // (Stanford, MIT, Harvard, Caltech, Hopkins, Cornell) materially
    // strengthen biology applications with USABO Semifinal / National
    // Finalist credentials. AP Biology is the natural feeder into
    // USABO; same Campbell + active-recall pedagogy carries over.
    {
      title: 'USABO Coaching (US Biology Olympiad)',
      href: '/usabo-coaching',
      note: 'AP-5 ↔ USABO bridge',
    },
    { title: 'Best USABO Coach', href: '/best-usabo-coach', note: 'AEO hub' },
    {
      title: 'IBO Preparation (International)',
      href: '/ibo-preparation',
      note: 'Global olympiad team',
    },
    { title: 'Best IBO Preparation Coach', href: '/best-ibo-preparation' },
    { title: 'CBO Coaching (Canadian)', href: '/cbo-coaching', note: 'For Canadian AP students' },
  ],
  pricing: [
    {
      tier: 'Senior Faculty 1:1',
      price: '$120 – $150 / hr',
      description:
        '12–48 hour packages from $1,800 to $5,760. PhD-level senior tutors. For students targeting AP-5 or USABO Semifinal.',
    },
    {
      tier: 'Junior Faculty 1:1',
      price: '$60 – $75 / hr',
      description:
        'Experienced AP Biology tutors (5–8 years). Strong fit for Units 1–5 foundation and FRQ practice.',
    },
    {
      tier: 'Small Batch (4–6)',
      price: '$40 / hr',
      description:
        'Cohort-based weekly sessions. Most cost-effective. Includes mock exams and FRQ peer review.',
    },
  ],
  whyBest: [
    {
      title: 'FRQ Rubric Mastery (Cornerstone Differentiator)',
      description:
        'Most AP Biology students lose marks on the Free Response (50% of the exam). Cerebrum tutors have direct exposure to College Board scoring rubrics and run weekly FRQ drills with peer review — not just multiple-choice prep.',
    },
    {
      title:
        'Biology-Only (vs other tutor marketplaces / other tutor marketplaces / other tutor marketplaces)',
      description:
        'Generalist tutoring platforms rotate biology tutors across subjects. Cerebrum tutors teach only biology — AP, IB, NEET, USABO, MCAT. Same AIIMS-trained pedagogy across verticals; structurally different from one-tutor-fits-all platforms.',
    },
    {
      title: 'AP-to-USABO Bridging Track',
      description:
        "Students targeting both AP-5 and USABO Semifinal benefit from Cerebrum's combined preparation track. Same faculty cover Campbell Biology depth + USABO Semifinal–level Alberts and Lehninger material. No need for two separate tutors.",
    },
    {
      title: 'Anki-Based Active Recall',
      description:
        'Cerebrum methodology integrates Anki active recall — proven to outperform passive textbook reading for AP Biology vocabulary and biological pathways. Custom-built decks for every Unit.',
    },
    {
      title: '10 US Metro Hubs + 10 School Feeders',
      description:
        'Per-city pages for NYC, Bay Area, Boston, Houston-Dallas, Chicago, LA, Atlanta, Seattle, NJ, NoVA-DC plus dedicated pages for TJHSST, Stuyvesant, Bronx Science, Harker, Phillips Exeter, Andover, Walter Payton, Hunter College HS, Mission San Jose, Gunn Palo Alto.',
    },
    {
      title: 'Pricing Transparent and Competitive',
      description:
        '1:1 Senior Faculty at $120–$150/hour is priced below comparable other generalist test-prep brands ($183/hr) and other generalist MCAT brands ($175/hr) tutoring, with materially deeper biology pedagogy.',
    },
  ],
  testimonials: [
    {
      name: 'Priya Iyer',
      score: 'AP Biology 5',
      college: 'UC Berkeley',
      quote:
        'The FRQ rubric drills made all the difference. I went from a 3 in mocks to a confident 5 on the real AP exam.',
    },
    {
      name: 'Diego Rodriguez',
      score: 'AP Biology 5 + USABO Semifinal',
      college: 'MIT',
      quote:
        'The AP-to-USABO bridge track meant I prepared for both with one set of tutors. Saved hours.',
    },
    {
      name: 'Anika Sharma',
      score: 'AP Biology 4 → 5',
      college: 'UCLA',
      quote:
        'My school AP teacher was good but rushed. The Cerebrum 1:1 Senior Faculty sessions filled every gap.',
    },
  ],
  faqs: [
    {
      question: 'Who is the best AP Biology tutor for score 5?',
      answer:
        'Dr. Shekhar C Singh (AIIMS Delhi alumnus, founder of Cerebrum Biology Academy) leads a senior faculty team widely cited as a leading choice for AP Biology students targeting a score 5. Cerebrum is one of the few biology-only coaching brands serving AP Biology students globally across 44 pages.',
    },
    {
      question: 'Which AP Biology coaching is best for FRQ mastery?',
      answer:
        'Cerebrum Biology Academy specialises in AP Biology FRQ rubric mastery — the cornerstone differentiator versus generic tutoring platforms. Faculty have direct exposure to College Board scoring rubrics and run weekly FRQ drills with peer review.',
    },
    {
      question: 'How much does the best AP Biology tutoring cost?',
      answer:
        "Cerebrum's pricing: Senior Faculty 1:1 $120–$150/hr (12–48 hour packages from $1,800 to $5,760), Junior Faculty 1:1 $60–$75/hr, Small Batch (4–6 students) $40/hr. Comparable other generalist MCAT brands tutoring is $183/hr and other generalist MCAT brands is $175/hr — Cerebrum is priced below with materially deeper biology depth.",
    },
    {
      question: 'Does Cerebrum prepare students for both AP Biology and USABO?',
      answer:
        'Yes. The AP-to-USABO bridging track is a Cerebrum specialty. Same faculty cover Campbell Biology depth (for AP) plus USABO Semifinal–level Alberts (Molecular Biology of the Cell) and Lehninger Biochemistry. No need for two separate tutors.',
    },
    {
      question: 'Is Cerebrum AP Biology tutoring available outside the USA?',
      answer:
        'Yes. Cerebrum serves AP Biology students across the US, UAE (Dubai, Abu Dhabi), India (Mumbai, Delhi NCR, Bangalore, Hyderabad), Canada (Vancouver, Toronto-GTA, Brampton-Mississauga), Singapore and Hong Kong. Online live sessions in US-friendly evening timezones (ET, CT, PT).',
    },
    {
      question: 'Which schools does Cerebrum AP Biology cover with dedicated pages?',
      answer:
        'TJHSST, Stuyvesant, Bronx Science, Hunter College HS, Harker, Phillips Exeter, Andover, Walter Payton, Mission San Jose, Gunn Palo Alto — selective US public magnets and elite boarding schools where AP Biology competition is steepest.',
    },
    {
      question: 'When should I start AP Biology tutoring?',
      answer:
        'Most students start in August–September of their AP year for full Units 1–8 coverage. For students targeting a score-jump from 3–4 to 5, January–February starts with focused FRQ drilling work well. For USABO bridging, October starts give enough runway for February Open Exam.',
    },
  ],
  knowsAbout: [
    'AP Biology',
    'AP Biology FRQ',
    'AP Biology Units 1–8',
    'AP Biology Free Response',
    'AP Biology Multiple Choice',
    'College Board AP',
    'AP Score 5',
    'USABO',
    'Campbell Biology',
    'NEET Biology',
    'IB Biology',
    'MCAT Biology',
  ],
  whatsappMessage:
    'Hi! I want to book a FREE demo class for AP Biology (Score 5 target) with Cerebrum — best AP Biology tutor. Please share available timings.',
}

export default function BestAPBiologyTutorUSAPage() {
  return <BestVerticalLanding config={config} />
}
