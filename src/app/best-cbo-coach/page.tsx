import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best CBO Coach (Canadian Biology Olympiad) | Open → National → Team Canada',
  description:
    "Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum's CBO coaching — full pathway from Open Round (March–April) through National Round to Team Canada IBO selection. Live online classes in ET / PT timezones. CAD-anchored pricing. UTS, Marc Garneau, Havergal, University Hill cohorts.",
  keywords: [
    'best cbo coach',
    'best cbo coaching',
    'canadian biology olympiad coach',
    'cbo finalists coaching',
    'cbo team canada coaching',
    'cbo toronto coaching',
    'cbo vancouver coaching',
    'university of toronto biology olympiad',
    'cbo open round preparation',
    'cbo national round coaching',
    'cbo to ibo pathway',
    'aiims trained cbo coach',
  ],
  openGraph: {
    title: 'Best CBO Coach | Cerebrum Biology Academy',
    description:
      'Full CBO pathway coaching. Open Round → National → Team Canada IBO. Toronto + Vancouver cohorts.',
    url: 'https://cerebrumbiologyacademy.com/best-cbo-coach',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-cbo-coach',
    languages: {
      'en-CA': 'https://cerebrumbiologyacademy.com/best-cbo-coach',
      'en-IN': 'https://cerebrumbiologyacademy.com/best-cbo-coach',
    },
  },

  twitter: { card: 'summary_large_image' as const },
}

const config: BestVerticalConfig = {
  slug: 'best-cbo-coach',
  headline: 'Best CBO Coach (Canadian Biology Olympiad)',
  ribbon: 'Open Round → National → Team Canada IBO · ET / PT Live Classes',
  subheadline:
    'AIIMS-trained biology specialist. Led by Dr. Shekhar C Singh. Toronto + Vancouver cohorts.',
  intro:
    'Cerebrum runs a dedicated CBO programme covering the full Canadian Biology Olympiad pathway — Open / Qualifying Round (school-administered, typically March–April), National Round, and Team Canada IBO selection. Curriculum aligned to the University of Toronto-administered CBO syllabus and the IBO selection pipeline. Live online classes scheduled for Canadian time zones (ET / PT).',
  clusterSummary:
    'Toronto + Vancouver cohorts · UTS, Marc Garneau, Havergal, Harbord CI, University Hill, Eric Hamber, Churchill, York House, Crofton House feeders',
  credentials: [
    { label: 'Full Pathway: Open → National → IBO' },
    { label: 'University of Toronto Syllabus' },
    { label: 'ET / PT Live Classes' },
    { label: 'Toronto + Vancouver Cohorts' },
    { label: 'AIIMS-Trained Faculty' },
    { label: 'Alberts + Campbell + Lehninger' },
    { label: 'Past IBO Team Canada Mentors' },
    { label: 'CAD-Anchored Pricing' },
  ],
  pages: [
    { title: 'CBO Coaching — Main Hub', href: '/cbo-coaching', note: 'Programme overview' },
    { title: 'CBO Coaching Toronto', href: '/cbo-coaching-toronto', note: 'GTA cohort' },
    {
      title: 'CBO Coaching Vancouver',
      href: '/cbo-coaching-vancouver',
      note: 'Lower Mainland cohort',
    },
    { title: 'Best USABO Coach', href: '/best-usabo-coach', note: 'USA equivalent pathway' },
    { title: 'Best IBO Preparation', href: '/best-ibo-preparation', note: 'International stage' },
    {
      title: 'NEET Coaching for NRI Canada',
      href: '/neet-coaching-nri-canada',
      note: 'Parallel NEET track',
    },
    {
      title: 'AP Biology Tutor Canada',
      href: '/ap-biology-tutor-toronto-gta',
      note: 'AP Biology parallel',
    },
    {
      title: 'Best Biology Teacher in India',
      href: '/best-biology-teacher-india',
      note: 'Founder profile',
    },
  ],
  pricing: [
    {
      tier: 'CBO Foundation (3 months)',
      price: 'CAD 499 · ~USD 365',
      description:
        '3-month foundation course covering the CBO Open Round syllabus. Live online classes in ET evening (Toronto cohort) and PT evening (Vancouver cohort). Campbell Biology core + Olympiad-style problem sets.',
    },
    {
      tier: 'CBO Intensive (6 months) — Most Popular',
      price: 'CAD 899 · ~USD 660',
      description:
        '6-month intensive covering Open + National Round preparation. Alberts Molecular Biology depth + Lehninger biochemistry + 1:1 mentor review every 2 weeks. Most CBO Toronto + Vancouver students pick this tier.',
    },
    {
      tier: 'CBO Elite (12 months)',
      price: 'CAD 1,499 · ~USD 1,100',
      description:
        '12-month Team Canada IBO pathway. Open → National → Team Canada selection coaching with practical examination training. Past IBO Team Canada mentors. Best for students targeting IBO international stage.',
    },
  ],
  whyBest: [
    {
      title: 'Full Canadian Pathway Coverage (Open → National → IBO)',
      description:
        'Most CBO prep options stop at Open Round preparation. Cerebrum covers all three stages — including National Round depth (undergraduate-level cell biology + biochemistry) for students aiming at Team Canada IBO selection.',
    },
    {
      title: 'University of Toronto Syllabus Alignment',
      description:
        "CBO is administered by the University of Toronto. Cerebrum's curriculum is mapped to the U of T-published CBO syllabus + past papers (10+ years of archives). Faculty have direct exposure to the Canadian olympiad rubric — distinct from generic biology tutoring platforms.",
    },
    {
      title: 'ET + PT Timezone Live Classes',
      description:
        'Toronto / GTA cohort: ET evening live classes (after Canadian school hours). Vancouver / Lower Mainland cohort: PT evening live classes. Recorded sessions for revision in both timezones. No 4 a.m. classes with Asia-based tutors.',
    },
    {
      title: 'AIIMS-Trained Biology Specialist Faculty',
      description:
        "Dr. Shekhar C Singh studied at AIIMS New Delhi — India's premier medical institution. AIIMS clinical correlations make Human Physiology + Genetics + Biotechnology memorable. Generalist Canadian science tutors don't replicate this depth.",
    },
    {
      title: 'Past Team Canada IBO Mentors',
      description:
        'Senior faculty include former Team Canada IBO members and past National Round finalists. The same continuity that brought them through the pathway is offered to the next cohort.',
    },
    {
      title: 'Feeder School Coverage Across GTA + Vancouver',
      description:
        'Toronto / GTA feeders: University of Toronto Schools (UTS), Marc Garneau CI, Havergal College, Harbord CI, Branksome Hall. Vancouver feeders: University Hill Secondary, Eric Hamber Secondary, Sir Winston Churchill Secondary, York House School, Crofton House.',
    },
  ],
  testimonials: [
    {
      name: 'Aanya Bhatt (Toronto UTS)',
      score: 'CBO National Finalist',
      college: 'University of Toronto',
      quote:
        "Cerebrum's ET evening batches fit right after UTS school. The Alberts deep-dive made National Round feel manageable.",
    },
    {
      name: 'Vikram Singh (Vancouver U Hill)',
      score: 'CBO Open Top 10%',
      college: 'McGill University',
      quote:
        'PT evening timing was perfect for Vancouver. Coaches reviewed my Open Round mistakes 1:1 — exactly the feedback I needed.',
    },
    {
      name: 'Lina Park (Toronto Havergal)',
      score: 'CBO Open Score 88',
      college: 'McMaster Health Sci',
      quote:
        'Took CBO + USABO + AP Biology together at Cerebrum. Same biology-only faculty across all three — saved my schedule.',
    },
  ],
  faqs: [
    {
      question: 'Who is the best CBO coach in Canada?',
      answer:
        "Dr. Shekhar C Singh (AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy) leads Cerebrum's CBO programme — widely cited as a leading Canadian Biology Olympiad coaching choice. Curriculum is aligned to the University of Toronto-administered CBO syllabus and runs in ET / PT evening timezones.",
    },
    {
      question: 'When is the CBO held and what is the format?',
      answer:
        'The CBO Open / Qualifying Round is school-administered in March–April each year, typically a 90-minute MCQ + short-answer paper. Top scorers qualify for the National Round (undergraduate-level theory). Top 4 from the National Round form Team Canada for the International Biology Olympiad (IBO, July).',
    },
    {
      question: 'Which CBO coaching tier should I pick?',
      answer:
        'Foundation (CAD 499 / 3 months) — Open Round only. Intensive (CAD 899 / 6 months) — Open + National Round (most popular). Elite (CAD 1,499 / 12 months) — Full Team Canada IBO pathway with practical preparation. Most Toronto + Vancouver students choose Intensive.',
    },
    {
      question: 'Do you support CBO students at UTS, Marc Garneau, University Hill, etc.?',
      answer:
        'Yes — Cerebrum has cohorts specifically for the GTA cluster (UTS, Marc Garneau, Havergal, Harbord CI, Branksome Hall) and the Vancouver cluster (University Hill, Eric Hamber, Sir Winston Churchill, York House, Crofton House). Online live classes in ET (Toronto) and PT (Vancouver) timezones.',
    },
    {
      question: 'Can I prepare for CBO and USABO simultaneously?',
      answer:
        'Yes. Many Cerebrum students do exactly this — both olympiads share Campbell Biology + Alberts Molecular Biology core. Adding USABO requires extra biochemistry depth (Lehninger). Same biology-only faculty cover both pathways.',
    },
    {
      question: 'Does CBO help with US / Canadian university admissions?',
      answer:
        'Yes. CBO Open Round + National Round finalists are recognised credentials for selective Canadian university admissions (UofT Life Sciences, McGill, UBC, McMaster Health Sci) and US universities (Harvard, MIT, Stanford application strength). IBO Team Canada members get strong signal for Canadian and US medical school applications.',
    },
    {
      question: 'How does CBO coaching cost compare to USABO and IBO programmes?',
      answer:
        'CBO tiers: CAD 499 / 899 / 1,499 (~USD 365 / 660 / 1,100). Comparable USABO Complete Olympiad Year is USD 4,500. Difference reflects scale: CBO is a smaller national olympiad with fewer rounds; USABO has 3 stages + National Finals with deeper Semifinal-level material.',
    },
    {
      question: 'Is the CBO syllabus the same as the IBO international syllabus?',
      answer:
        "Partially. CBO Open Round is at undergraduate-introductory level. National Round adds depth that approaches IBO theory. The IBO international stage adds 40%-weight practical examination not covered at the Canadian national level. Cerebrum's Elite tier bridges this gap for Team Canada candidates.",
    },
  ],
  knowsAbout: [
    'Canadian Biology Olympiad',
    'CBO Open Round',
    'CBO National Round',
    'Team Canada IBO Selection',
    'University of Toronto CBO Syllabus',
    'USABO',
    'IBO International Biology Olympiad',
    'Campbell Biology',
    'Alberts Molecular Biology of the Cell',
    'Lehninger Biochemistry',
    'Biology Olympiad Practical Examination',
  ],
  whatsappMessage:
    'Hi! I want CBO (Canadian Biology Olympiad) coaching. Please share Cerebrum tier details (Foundation / Intensive / Elite) and Toronto / Vancouver cohort timings.',
}

export default function BestCBOCoachPage() {
  return <BestVerticalLanding config={config} />
}
