import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best BBO Coach (British Biology Olympiad) | Round 1 → Round 2 → UKBC',
  description:
    "Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum's BBO coaching — full UK pathway from Round 1 (March) through Round 2 (Top 200) to UKBC (Top 50) and Team UK IBO selection. Live online classes in GMT / BST. Eton, Westminster, Winchester, St Paul's, Harrow feeders.",
  keywords: [
    'best bbo coach',
    'best bbo coaching',
    'british biology olympiad coach',
    'bbo round 1 preparation',
    'bbo round 2 preparation',
    'ukbc british biology challenge',
    'team uk ibo coaching',
    'bbo eton westminster winchester',
    'royal society of biology bbo',
    'aiims trained bbo coach',
  ],
  openGraph: {
    title: 'Best BBO Coach | Cerebrum Biology Academy',
    description:
      'Full BBO pathway coaching. Round 1 → Round 2 → UKBC → Team UK IBO. London + UK boarding schools.',
    url: 'https://cerebrumbiologyacademy.com/best-bbo-coach',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-bbo-coach',
    languages: {
      'en-GB': 'https://cerebrumbiologyacademy.com/best-bbo-coach',
      'en-IN': 'https://cerebrumbiologyacademy.com/best-bbo-coach',
    },
  },

  twitter: { card: 'summary_large_image' as const },
}

const config: BestVerticalConfig = {
  slug: 'best-bbo-coach',
  headline: 'Best BBO Coach (British Biology Olympiad)',
  ribbon: 'Round 1 → Round 2 → UKBC → Team UK IBO · GMT / BST Live Classes',
  subheadline:
    'AIIMS-trained biology specialist. Led by Dr. Shekhar C Singh. London + UK boarding-school cohorts.',
  intro:
    'Cerebrum runs a dedicated BBO programme covering the full British Biology Olympiad pathway administered by the Royal Society of Biology — Round 1 (typically March, 75-minute multiple-choice paper), Round 2 (Top 200 students, longer-form theory), and the UKBC (UK Biology Competitor / Team UK IBO selection round, Top 50). Curriculum aligned to A-Level Biology + Campbell undergraduate depth + Olympiad past papers from 2000+. Live online classes in GMT / BST evening slots for UK day schools and boarding schools alike.',
  clusterSummary:
    "UK day + boarding school cohorts · Eton, Westminster, Winchester, St Paul's, Harrow, Tonbridge, King's Canterbury, Rugby feeders",
  credentials: [
    { label: 'Full Pathway: R1 → R2 → UKBC → IBO' },
    { label: 'Royal Society of Biology Aligned' },
    { label: 'GMT / BST Live Classes' },
    { label: 'UK Day + Boarding School Coverage' },
    { label: 'AIIMS-Trained Faculty' },
    { label: 'A-Level + Campbell + Alberts Depth' },
    { label: 'Past Team UK IBO Mentors' },
    { label: 'GBP-Anchored Pricing' },
  ],
  pages: [
    { title: 'Best USABO Coach', href: '/best-usabo-coach', note: 'USA equivalent pathway' },
    { title: 'Best CBO Coach', href: '/best-cbo-coach', note: 'Canada equivalent pathway' },
    { title: 'Best IBO Preparation', href: '/best-ibo-preparation', note: 'International stage' },
    { title: 'Best INBO Coach', href: '/best-inbo-coach', note: 'India equivalent pathway' },
    { title: 'A-Level Biology Tutor', href: '/a-level-biology-tutor', note: 'UK A-Level core' },
    { title: 'IB Biology Tutor', href: '/ib-biology-tutor', note: 'For UK IB students' },
    {
      title: 'NEET Coaching for NRI UK',
      href: '/neet-coaching-nri-uk',
      note: 'Parallel NEET track for British-Indian families',
    },
    {
      title: 'Best Biology Teacher in India',
      href: '/best-biology-teacher-india',
      note: 'Founder profile',
    },
  ],
  pricing: [
    {
      tier: 'BBO Foundation (3 months)',
      price: '£399 · ~USD 510',
      description:
        '3-month foundation course covering Round 1 syllabus — A-Level Biology core + Royal Society of Biology past papers. Live online classes in GMT / BST evening (after UK school hours). Best for first-time BBO Round 1 entrants.',
    },
    {
      tier: 'BBO Intensive (6 months) — Most Popular',
      price: '£749 · ~USD 960',
      description:
        '6-month intensive covering Round 1 + Round 2 preparation. Campbell Biology + Alberts Molecular Biology depth + 1:1 mentor review fortnightly. Most BBO London + boarding-school students pick this tier.',
    },
    {
      tier: 'BBO Elite (12 months)',
      price: '£1,299 · ~USD 1,660',
      description:
        '12-month Team UK IBO pathway. Round 1 → Round 2 → UKBC → Team UK selection. Practical examination training for the IBO international stage. Past Team UK IBO mentors. Best for students targeting IBO medal positions.',
    },
  ],
  whyBest: [
    {
      title: 'Full UK Pathway Coverage (R1 → R2 → UKBC → IBO)',
      description:
        'Most BBO prep options stop at Round 1 preparation. Cerebrum covers all four stages — including UKBC depth (undergraduate-level cell biology + biochemistry + ethology) for students aiming at Team UK IBO selection.',
    },
    {
      title: 'Royal Society of Biology Syllabus Alignment',
      description:
        "BBO is administered by the Royal Society of Biology. Cerebrum's curriculum is mapped to the RSB-published BBO syllabus + 20+ years of past papers (2000-present archive). Faculty have direct exposure to the UK olympiad rubric — distinct from generic UK biology tutoring platforms.",
    },
    {
      title: 'GMT + BST Timezone Live Classes',
      description:
        'UK day school cohort: GMT/BST evening live classes (5:30 PM – 8:00 PM after UK school hours). Boarding school cohort: weekend morning + evening slots. Recorded sessions for revision. No 4 a.m. classes with Asia-based tutors.',
    },
    {
      title: 'A-Level Biology + Campbell Bridge',
      description:
        "BBO sits between A-Level Biology (UK national curriculum) and Campbell undergraduate biology. Cerebrum's coaching bridges the two — A-Level provides foundation, Campbell adds Olympiad-level depth for Round 2 and UKBC.",
    },
    {
      title: 'UK Boarding School + Day School Coverage',
      description:
        "UK boarding feeders: Eton College, Westminster, Winchester College, St Paul's School, Harrow, Tonbridge School, King's Canterbury, Rugby School, Marlborough, Sherborne. London day school feeders: City of London School, Latymer Upper, North London Collegiate, Highgate, St Paul's Girls.",
    },
    {
      title: 'AIIMS-Trained Biology Specialist Faculty',
      description:
        "Dr. Shekhar C Singh studied at AIIMS New Delhi — India's premier medical institution. AIIMS clinical correlations make Human Physiology + Genetics + Biotechnology memorable for British students aiming at Oxbridge medicine + IBO simultaneously.",
    },
  ],
  testimonials: [
    {
      name: 'Aarush Sethi (London Westminster)',
      score: 'BBO Round 2 Gold',
      college: 'Cambridge Natural Sciences',
      quote:
        "Cerebrum's GMT evening batches fit right after Westminster day. The Campbell + RSB past-paper drilling got me to Round 2 Gold.",
    },
    {
      name: 'Priya Iyer (Harrow School, boarding)',
      score: 'BBO Round 2 Silver',
      college: 'Oxford Medicine',
      quote:
        "Boarding school weekends + Cerebrum's BST weekend cohort = perfect combination. Oxbridge interviewers asked about my BBO journey.",
    },
    {
      name: "Aditya Kapoor (St Paul's School)",
      score: 'UKBC Team UK',
      college: 'Cambridge Medicine',
      quote:
        'Past Team UK mentors at Cerebrum reviewed my UKBC practice papers. Got picked for Team UK IBO — interviewers loved the story.',
    },
  ],
  faqs: [
    {
      question: 'Who is the best BBO coach in the UK?',
      answer:
        "Dr. Shekhar C Singh (AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy) leads Cerebrum's BBO programme — widely cited as a leading British Biology Olympiad coaching choice. Curriculum is aligned to the Royal Society of Biology BBO syllabus and runs in GMT / BST evening timezones.",
    },
    {
      question: 'When is the BBO held and what is the format?',
      answer:
        'The BBO Round 1 is school-administered in March each year, typically a 75-minute multiple-choice paper for Year 12 / Year 13 (A-Level) students. Top ~200 scorers qualify for Round 2 (longer-form theory). Top ~50 progress to the UKBC (UK Biology Competitor) round, from which 4 students are selected for Team UK at the International Biology Olympiad (IBO, July).',
    },
    {
      question: 'Which BBO coaching tier should I pick?',
      answer:
        'Foundation (£399 / 3 months) — Round 1 only. Intensive (£749 / 6 months) — Round 1 + Round 2 (most popular). Elite (£1,299 / 12 months) — Full Team UK IBO pathway including UKBC and practical preparation. Most London + boarding-school students choose Intensive.',
    },
    {
      question: "Do you support BBO students at Eton, Westminster, Winchester, St Paul's, Harrow?",
      answer:
        "Yes — Cerebrum has dedicated cohorts for UK boarding schools (Eton, Westminster, Winchester, St Paul's, Harrow, Tonbridge, King's Canterbury, Rugby, Marlborough, Sherborne) and London day schools (City of London, Latymer Upper, North London Collegiate, Highgate, St Paul's Girls). Online live classes in GMT / BST evenings + weekend cohorts for boarding-school students.",
    },
    {
      question: 'Can I prepare for BBO and Oxbridge medicine simultaneously?',
      answer:
        "Yes. BBO is one of the strongest signals for Oxbridge Natural Sciences and Medicine applications — Round 2 Gold or higher is rare and well-recognised. Cerebrum's biology depth helps both BBO and Oxbridge interview preparation. Many students pair BBO with Cerebrum's BMAT / UCAT support (referrals available).",
    },
    {
      question: 'Does BBO help with US / Oxbridge / Cambridge admissions?',
      answer:
        "Yes. BBO Round 2 medallists + UKBC qualifiers + Team UK IBO members are strongly recognised for Oxbridge Natural Sciences / Medicine, US Ivy + MIT + Stanford applications, and Canadian universities (UofT, McGill). It's one of the most academically respected UK olympiads at university admissions level.",
    },
    {
      question: 'How does BBO coaching cost compare to USABO and IBO programmes?',
      answer:
        'BBO tiers: £399 / £749 / £1,299 (~USD 510 / 960 / 1,660). Comparable USABO Complete Olympiad Year is USD 4,500. The difference reflects scale: BBO has 3 stages plus UKBC; USABO has Open + Semifinal + National Finals which require deeper Semifinal-level material.',
    },
    {
      question: 'Is the BBO syllabus the same as the IBO international syllabus?',
      answer:
        "Partially. BBO Round 1 is at A-Level depth. Round 2 + UKBC add undergraduate-introductory biology depth approaching IBO theory. The IBO international stage adds 40%-weight practical examination not covered at the British national level. Cerebrum's Elite tier bridges this gap for Team UK candidates.",
    },
  ],
  knowsAbout: [
    'British Biology Olympiad',
    'BBO Round 1',
    'BBO Round 2',
    'UKBC UK Biology Competitor',
    'Team UK IBO Selection',
    'Royal Society of Biology BBO',
    'A-Level Biology',
    'Oxbridge Medicine Preparation',
    'Campbell Biology',
    'Alberts Molecular Biology of the Cell',
    'IBO International Biology Olympiad',
  ],
  whatsappMessage:
    'Hi! I want BBO (British Biology Olympiad) coaching. Please share Cerebrum tier details (Foundation / Intensive / Elite) and GMT / BST cohort timings.',
}

export default function BestBBOCoachPage() {
  return <BestVerticalLanding config={config} />
}
