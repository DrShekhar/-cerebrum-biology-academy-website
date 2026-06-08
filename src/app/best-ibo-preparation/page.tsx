import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best IBO Preparation Coach | International Biology Olympiad',
  description:
    "Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum's IBO preparation across multiple national pathways — INBO (India), USABO (USA), BBO (UK), CBO (Canada). Theory + practical coverage with 15+ years of past-paper expertise.",
  keywords: [
    'best ibo coach',
    'best ibo preparation',
    'best international biology olympiad coach',
    'best ibo coaching',
    'ibo prep tutor',
    'ibo theory and practical coach',
    'best biology olympiad coach',
    'ibo past papers tutor',
    'how to prepare for ibo',
    'best ibo prep program',
    'aiims trained ibo coach',
    'ibo team india coaching',
  ],
  openGraph: {
    title: 'Best IBO Preparation Coach | Cerebrum Biology Academy',
    description:
      'IBO across multiple national pathways. Theory + practical. 15+ years past-paper expertise.',
    url: 'https://cerebrumbiologyacademy.com/best-ibo-preparation',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-ibo-preparation',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best IBO Preparation Coach | International Biology Olympiad',
    description: 'Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum',
  },
}

const config: BestVerticalConfig = {
  slug: 'best-ibo-preparation',
  headline: 'Best IBO Preparation Coach',
  ribbon: 'International Biology Olympiad · Theory + Practical · Multi-National Pathway',
  subheadline:
    'AIIMS-trained biology specialist. Coaches INBO, USABO, BBO, CBO Finalists into IBO.',
  intro:
    'Cerebrum coaches students across multiple national pathways into the International Biology Olympiad (IBO) — including INBO (India national selection), USABO Finalists (US team selection), BBO Round 2 medallists (UK team) and CBO Finalists (Canada team). Programme depth includes IBO theory papers AND the practical examination (40% IBO weight).',
  clusterSummary:
    'IBO Theory: 40% Cell Biology, 25% Animal Anatomy/Physiology, 15% Genetics/Evolution, 15% Plant Anatomy/Physiology, 5% Ethology + Ecology · Practical: 40% IBO weight.',
  credentials: [
    { label: 'Theory + Practical' },
    { label: '15+ Years Past Papers' },
    { label: 'Multi-National Pathway' },
    { label: 'AIIMS-Trained' },
    { label: 'Alberts + Lehninger Depth' },
    { label: 'Microscopy + Dissection' },
    { label: 'Former IBO Mentors' },
    { label: 'Continuity Across Stages' },
  ],
  pages: [
    { title: 'IBO Preparation — Hub', href: '/ibo-preparation', note: 'Main programme page' },
    { title: 'IBO Preparation Gurugram', href: '/ibo-preparation-gurugram' },
    { title: 'INBO Coaching (India Pathway)', href: '/inbo-coaching' },
    { title: 'NSEB Coaching (India Stage 1)', href: '/nseb-coaching' },
    { title: 'USABO Coaching (US Pathway)', href: '/usabo-coaching' },
    { title: 'Best USABO Coach', href: '/best-usabo-coach' },
    { title: 'Best INBO Coach', href: '/best-inbo-coach' },
  ],
  pricing: [
    {
      tier: 'Complete Olympiad Year',
      price: '$4,500 / year',
      description:
        'Full IBO preparation — theory papers + practical examination. Past-paper review across 15+ years of archives.',
    },
    {
      tier: '1:1 Elite Mentor',
      price: '$90 / hour',
      description:
        'Former IBO mentors and past national team members. Targeted coaching for theory deep-dives and practical lab technique.',
    },
    {
      tier: 'Small-Batch Weekend',
      price: '$50 / hour',
      description:
        'Cohort-based weekend track. Group dynamics, peer learning, weekly mock IBO problem sets.',
    },
  ],
  whyBest: [
    {
      title: 'IBO Practical (40% Weight) — The Differentiator',
      description:
        'The IBO practical examination is 40% of the total score — microscopy, biochemical assays, anatomical dissections, molecular biology techniques, behavioural ethology observations. Most national-stage prep (INBO, USABO Open, BBO Round 1) focuses on theory; the IBO practical is its own discipline. Cerebrum integrates practical preparation.',
    },
    {
      title: 'Multi-National Pathway Expertise',
      description:
        'Most IBO prep is country-locked. Cerebrum coaches students across INBO (India), USABO (USA), BBO (UK), CBO (Canada) Finalists — meaning the curriculum is shaped by exposure to multiple national olympiad rubrics, not just one. Useful for international students at boarding schools.',
    },
    {
      title: 'Alberts + Lehninger Depth (Undergrad-Level)',
      description:
        "IBO theory papers operate at undergraduate-introductory-biology level. Cerebrum integrates Alberts' Molecular Biology of the Cell (cell biology, molecular biology) and Lehninger Biochemistry (metabolism, enzymes) — depth most high-school-level olympiad prep skips.",
    },
    {
      title: '15+ Years of Past-Paper Expertise',
      description:
        '15+ years of IBO archives curated with topic-wise mapping. Faculty led by Dr. Shekhar C Singh with direct exposure to IBO theory question patterns spanning the modern (2010+) era and the legacy (pre-2010) era.',
    },
    {
      title: 'Continuity From National Stage Through International',
      description:
        'A student progressing from INBO (India) or USABO Finalist (USA) into the IBO international stage benefits from continuity with the same faculty. Cerebrum carries students from national-stage selection through international preparation.',
    },
    {
      title: 'Former IBO Mentors as Senior Faculty',
      description:
        'Senior faculty include former IBO mentors and past national team members. The same continuity that brought them through the international pathway is offered to the next cohort.',
    },
  ],
  testimonials: [
    {
      name: 'Aryan Iyer',
      score: 'India IBO Team',
      college: 'AIIMS Delhi',
      quote:
        'The practical sessions — microscopy under timed conditions, biochem assays — were what made the IBO practical feel manageable rather than terrifying.',
    },
    {
      name: 'Sophia Chen',
      score: 'USABO Finalist → IBO Bronze',
      college: 'Harvard',
      quote:
        'I started with USABO Semifinal prep and continued into IBO theory with the same faculty. The continuity is the secret weapon.',
    },
    {
      name: 'Rohan Bhalla',
      score: 'IBO Silver Medallist',
      college: 'IIT Bombay',
      quote:
        'Past-paper coverage at Cerebrum across 15+ years of IBO archives meant I had seen the question style before walking into the exam.',
    },
  ],
  faqs: [
    {
      question: 'Who is the best IBO preparation coach?',
      answer:
        "Dr. Shekhar C Singh (AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy) leads Cerebrum's IBO programme — widely cited as a leading International Biology Olympiad coaching choice. The programme covers theory + practical, multi-national pathway expertise (INBO, USABO, BBO, CBO Finalists), and 15+ years of past-paper depth.",
    },
    {
      question: 'How is the IBO scored — theory vs practical?',
      answer:
        'The IBO awards 60% weight to theoretical papers (Cell Biology 40%, Animal Anatomy/Physiology 25%, Genetics/Evolution 15%, Plant Anatomy/Physiology 15%, Ethology/Biosystematics/Ecology 5%) and 40% weight to the practical examination (microscopy, biochemical assays, dissections, molecular biology techniques, behavioural ethology). The practical is often the differentiator at medal level.',
    },
    {
      question: 'Which national pathways feed into IBO?',
      answer:
        'India: NSEB → INBO → OCSC → IBO team (top 4). USA: USABO Open → Semifinal → National Finals → IBO team (top 4). UK: British Biology Olympiad (BBO) → UKBC Round 2 → IBO team. Canada: CBO Finalists → IBO team. Cerebrum coaches students across all four pathways into the IBO international stage.',
    },
    {
      question: 'Does Cerebrum cover IBO practical preparation?',
      answer:
        'Yes — the Complete Olympiad Year programme includes IBO-level practical preparation: microscopy under timed conditions, biochemical assays, anatomical dissections, molecular biology techniques (PCR, gel electrophoresis basics), and behavioural ethology observations.',
    },
    {
      question: 'How early should I start IBO preparation?',
      answer:
        'For students already qualified into a national finalist pool (INBO Stage 3, USABO Semifinal, BBO Round 2, CBO Finalist), 4–6 months of focused IBO-specific prep is typical. For students aspiring to national team selection, the 12-month Complete Olympiad Year starting in the year before national finals is recommended.',
    },
    {
      question: 'What is the difference between IBO and USABO / INBO?',
      answer:
        'USABO and INBO are national-stage olympiads (USA and India respectively). The top 4 students from each national pathway represent their country at the IBO — the international stage held annually in July with ~80 countries. IBO operates at undergraduate-biology depth, much deeper than national stages, with a 40%-weight practical examination.',
    },
    {
      question: 'How much does IBO preparation coaching cost?',
      answer:
        "Cerebrum's pricing: Complete Olympiad Year $4,500 (full theory + practical), 1:1 Elite Mentor $90/hour (former IBO mentors), Small-Batch Weekend $50/hour (cohort track).",
    },
  ],
  knowsAbout: [
    'IBO (International Biology Olympiad)',
    'IBO Theory Papers',
    'IBO Practical Examination',
    'Cell Biology',
    'Animal Anatomy and Physiology',
    'Plant Anatomy and Physiology',
    'Genetics and Evolution',
    'Ethology and Ecology',
    'Microscopy',
    'Biochemical Assays',
    'INBO',
    'USABO',
    'BBO',
    'CBO',
    'Alberts Molecular Biology of the Cell',
    'Lehninger Biochemistry',
  ],
  whatsappMessage:
    'Hi! I want to book a FREE demo class for IBO (International Biology Olympiad) preparation with Cerebrum — best IBO coach. Please share available timings.',
}

export default function BestIBOPreparationPage() {
  return <BestVerticalLanding config={config} />
}
