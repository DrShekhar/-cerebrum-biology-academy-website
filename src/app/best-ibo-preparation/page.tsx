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
    'Cerebrum coaches students across multiple national pathways into the International Biology Olympiad (IBO) — including INBO (India national selection), USABO Finalists (US team selection), BBO Round 2 medallists (UK team) and CBO Finalists (Canada team). Programme depth includes IBO theory papers AND the practical examination — a major component, historically up to ~50% of the total score.',
  clusterSummary:
    'IBO Theory: ~25% Cell Biology, ~25% Animal Anatomy/Physiology, ~20% Genetics/Evolution, ~15% Plant Anatomy/Physiology, ~10% Ecology, ~5% Ethology, ~5% Biosystematics · Practical: a major component, historically up to ~50% of the total score.',
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
      tier: 'Foundation Track',
      price: '$2,500 / year',
      description:
        'Small-batch cohort track — IBO theory across all seven areas, weekly mock problem sets, peer learning and past-paper drilling.',
    },
    {
      tier: 'Complete Olympiad Year',
      price: '$4,500 / year',
      description:
        'Full IBO preparation — theory papers + practical examination. Past-paper review across 15+ years of archives.',
    },
    {
      tier: '1:1 Elite Mentoring',
      price: '$6,000 / year',
      description:
        'One-to-one with former IBO mentors and past national team members. Targeted theory deep-dives and practical lab technique.',
    },
  ],
  whyBest: [
    {
      title: 'IBO Practical — The Differentiator',
      description:
        'The IBO practical examination is a major component of the total score — historically up to ~50% — covering microscopy, biochemical assays, anatomical dissections, molecular biology techniques, behavioural ethology observations. Most national-stage prep (INBO, USABO Open, BBO Round 1) focuses on theory; the IBO practical is its own discipline. Cerebrum integrates practical preparation.',
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
        'The IBO is decided by theoretical papers and a practical examination, with the practical historically a major component — up to roughly half (~50%) of the total score. The theory distribution across the seven areas is approximately Cell Biology ~25%, Animal Anatomy/Physiology ~25%, Genetics/Evolution ~20%, Plant Anatomy/Physiology ~15%, Ecology ~10%, Ethology ~5%, Biosystematics ~5%. The practical (microscopy, biochemical assays, dissections, molecular biology techniques, behavioural ethology) is often the differentiator at medal level.',
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
        'USABO and INBO are national-stage olympiads (USA and India respectively). The top 4 students from each national pathway represent their country at the IBO — the international stage held annually in July with ~80 countries. IBO operates at undergraduate-biology depth, much deeper than national stages, with a major practical examination — historically up to ~50% of the total score.',
    },
    {
      question: 'How much does IBO preparation coaching cost?',
      answer:
        "Cerebrum's olympiad pricing runs in three tiers: Foundation Track $2,500/year (small-batch cohort), Complete Olympiad Year $4,500/year (full theory + practical), and 1:1 Elite Mentoring $6,000/year (one-to-one with former IBO mentors). The same olympiad pricing applies whether you are targeting USABO, INBO, BBO, CBO or direct IBO preparation.",
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
  return (
    <BestVerticalLanding
      config={config}
      breadcrumbParent={{
        name: 'IBO Preparation',
        url: 'https://cerebrumbiologyacademy.com/ibo-preparation',
      }}
    />
  )
}
