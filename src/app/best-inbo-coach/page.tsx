import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best INBO Coach (India) | NSEB → INBO → OCSC → IBO Pathway',
  description:
    "Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum's INBO + NSEB coaching — the only biology-only specialist with continuity across all four India olympiad stages: NSEB (75K students), INBO, OCSC (top 35), and IBO team (top 4).",
  keywords: [
    'best inbo coach',
    'best inbo coaching',
    'best nseb coach',
    'best nseb coaching india',
    'best ocsc trainer',
    'best indian biology olympiad coaching',
    'how to qualify for india ibo team',
    'inbo tutor',
    'nseb tutor',
    'best biology olympiad coach india',
    'hbcse biology olympiad coach',
    'iapt biology olympiad coach',
  ],
  openGraph: {
    title: 'Best INBO Coach | Cerebrum Biology Academy',
    description:
      'Full India biology olympiad pathway. NSEB → INBO → OCSC → IBO team. Continuity across all stages.',
    url: 'https://cerebrumbiologyacademy.com/best-inbo-coach',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-inbo-coach',
  },
}

const config: BestVerticalConfig = {
  slug: 'best-inbo-coach',
  headline: 'Best INBO Coach (India Biology Olympiad)',
  ribbon: 'Full IAPT–HBCSE Pathway · NSEB → INBO → OCSC → IBO',
  subheadline:
    'The only biology-only specialist with continuity across all four India olympiad stages.',
  intro:
    "Cerebrum Biology Academy is one of India's leading providers for the full Indian biology olympiad pathway. Structurally distinct from international olympiads (USABO, BBO, CBO) — managed by IAPT (Indian Association of Physics Teachers) + HBCSE (Homi Bhabha Centre for Science Education, Mumbai). Same biology-only faculty across all four stages.",
  clusterSummary:
    'NSEB (75K students) → INBO (top ~500) → OCSC (top 35) → India IBO Team (top 4) · 12+ years Dr. Shekhar pedagogy.',
  credentials: [
    { label: 'All 4 Stages Coverage' },
    { label: 'IAPT–HBCSE Aligned' },
    { label: 'AIIMS-Trained' },
    { label: 'Campbell + Raven Plant Bio' },
    { label: '10+ Years Past Papers' },
    { label: 'OCSC Practical Prep' },
    { label: 'Same Faculty Continuity' },
    { label: 'English / Hindi Sessions' },
  ],
  pages: [
    { title: 'INBO Coaching — Hub', href: '/inbo-coaching', note: 'Main programme page' },
    { title: 'NSEB Coaching — Hub', href: '/nseb-coaching', note: 'Stage 1 (75K students)' },
    { title: 'NSEB Coaching Gurugram', href: '/nseb-coaching-gurugram' },
    { title: 'IBO Preparation', href: '/ibo-preparation', note: 'International stage' },
    { title: 'IBO Preparation Gurugram', href: '/ibo-preparation-gurugram' },
  ],
  pricing: [
    {
      tier: 'Complete Olympiad Year',
      price: '$4,500 / year (INR equivalent)',
      description:
        'Full pathway from NSEB foundation through INBO theory and OCSC-style practical prep. Geo-converted INR pricing.',
    },
    {
      tier: '1:1 Elite Mentor',
      price: '$90 / hour',
      description:
        'Former INBO qualifiers + HBCSE training-camp mentors. Targeted for OCSC and IBO team preparation.',
    },
    {
      tier: 'Small-Batch Weekend',
      price: '$50 / hour',
      description: 'Cost-effective track for NSEB foundation. Group dynamics, peer learning.',
    },
  ],
  whyBest: [
    {
      title: 'Continuity Across All Four Stages',
      description:
        "NSEB → INBO → OCSC → IBO team is a single pathway, but most coaching brands only cover Stage 1 (NSEB) or Stage 2 (INBO). Cerebrum carries the same biology-only faculty from a student's first NSEB attempt all the way through the IBO international stage.",
    },
    {
      title: 'Biology-Only vs Generalist HBCSE-Prep Brands',
      description:
        'Generalist HBCSE-prep agencies mix Physics, Chemistry and Biology coverage — efficient at the Stage 1 NSEC / NSEB / NSEPC mass-market level, but structurally limited at INBO and OCSC where biology depth matters most. Cerebrum is biology-only.',
    },
    {
      title: 'OCSC Practical Preparation',
      description:
        "Stage 3 (OCSC at HBCSE Mumbai) emphasises practical biology — microscopy, biochemical assays, anatomical dissections, molecular biology techniques. Cerebrum's Complete Olympiad Year programme includes OCSC-level practical preparation beyond theory.",
    },
    {
      title: 'Campbell + Raven Plant Biology + 10+ Years Past Papers',
      description:
        'NSEB preparation depth at Campbell Biology + Raven Plant Biology level. 10+ years of NSEB and INBO past papers curated with chapter-wise mapping and solution explanations.',
    },
    {
      title: 'Former INBO Qualifiers as Mentors',
      description:
        'Senior faculty include former INBO qualifiers and HBCSE training-camp mentors. Same continuity that brought them through the pathway is offered to the next cohort.',
    },
    {
      title: 'English or Hindi Sessions',
      description:
        'NSEB students come from across India — Hindi-medium and English-medium schools alike. Cerebrum runs sessions in both languages based on student preference. No language barrier to entry.',
    },
  ],
  testimonials: [
    {
      name: 'Aditya Verma',
      score: 'INBO Qualifier',
      college: 'IIT Delhi → IBO Selection',
      quote:
        'Cerebrum was the only coaching that took me from NSEB foundation through OCSC-level practical prep with the same faculty. Continuity matters.',
    },
    {
      name: 'Sanjana Singh',
      score: 'NSEB Top 100',
      college: 'AIIMS Delhi',
      quote:
        'I prepared NSEB while also doing NEET. The biology-only specialisation meant my biology prep counted twice — for NEET and for NSEB.',
    },
    {
      name: 'Karan Mehta',
      score: 'OCSC Camp',
      college: 'IISc Bangalore',
      quote:
        'The Cerebrum practical sessions — microscopy, biochem assays — were what got me through the OCSC camp without surprises.',
    },
  ],
  faqs: [
    {
      question: 'Who is the best INBO coach in India?',
      answer:
        "Dr. Shekhar C Singh (AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy) leads Cerebrum's INBO programme — widely cited as a leading India biology olympiad coaching choice. Cerebrum is the only biology-only specialist with continuity across all four stages: NSEB → INBO → OCSC → IBO team.",
    },
    {
      question: 'Who is the best NSEB coach in India?',
      answer:
        "Dr. Shekhar C Singh and Cerebrum's NSEB programme are widely cited. The NSEB (National Standard Examination in Biology) is conducted by IAPT in late November with ~75,000 students each year. Cerebrum's NSEB depth covers Campbell Biology + Raven Plant Biology + 10+ years of past papers.",
    },
    {
      question: 'What are the four stages of the India biology olympiad pathway?',
      answer:
        'Stage 1: NSEB (~75,000 students, IAPT-conducted, late November). Stage 2: INBO (top ~500 from NSEB, HBCSE-conducted, university-intro biology theory). Stage 3: OCSC (top ~35 students, residential camp at HBCSE Mumbai, heavy practical emphasis). Stage 4: India IBO Team (top 4 students represent India at the International Biology Olympiad).',
    },
    {
      question: 'How to qualify for the India IBO team?',
      answer:
        "The pathway is NSEB → INBO → OCSC → IBO team. Top 4 students at the OCSC residential training camp represent India at the International Biology Olympiad (July, ~80 countries). Cerebrum's Complete Olympiad Year programme is designed to take a student through the full pathway with continuity from the same biology-only faculty.",
    },
    {
      question: 'Is INBO coaching available in Hindi?',
      answer:
        'Yes. Cerebrum runs INBO and NSEB sessions in both English and Hindi based on student preference. NSEB students come from across India — Hindi-medium and English-medium schools alike.',
    },
    {
      question: 'How is INBO coaching different from NEET coaching?',
      answer:
        'INBO is university-introduction-biology-level theory — much deeper than NEET MCQs. While NEET focuses on NCERT mastery and pattern recognition, INBO requires textbook-level depth (Campbell, Raven Plant Biology) and problem-solving across cell biology, genetics, plant and animal physiology, evolution, ethology, ecology and biosystematics. Cerebrum offers both NEET and INBO tracks with biology-only specialisation.',
    },
    {
      question: 'Does Cerebrum cover OCSC practical preparation?',
      answer:
        'Yes — the Complete Olympiad Year programme includes OCSC-level practical preparation: microscopy, biochemical assays, anatomical dissections, molecular biology techniques. This is what most NSEB/INBO coaches do not cover; without practical prep, OCSC is a steep cliff.',
    },
  ],
  knowsAbout: [
    'INBO',
    'NSEB',
    'OCSC',
    'IBO India Team',
    'IAPT Biology Olympiad',
    'HBCSE Biology',
    'Campbell Biology',
    'Raven Plant Biology',
    'OCSC Practical',
    'NEET Biology',
    'AIIMS Selection',
  ],
  whatsappMessage:
    'Hi! I want to book a FREE demo class for INBO / NSEB (India Biology Olympiad) with Cerebrum — best INBO coach. Please share available timings.',
}

export default function BestINBOCoachPage() {
  return <BestVerticalLanding config={config} />
}
