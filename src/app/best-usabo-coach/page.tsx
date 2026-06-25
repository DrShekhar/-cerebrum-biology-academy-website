import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best USABO Coach (USA Biology Olympiad) | Open Exam → Semifinal → Finals',
  description:
    "Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum's USABO coaching — full pathway from Open Exam (Feb) through Semifinal (March) and National Finals. Campbell + Alberts + Lehninger curriculum, US-friendly evening timezones, 11 US city cohorts.",
  keywords: [
    'best usabo coach',
    'best usabo coaching',
    'best usa biology olympiad coach',
    'best usabo semifinal coach',
    'best usabo open exam coach',
    'usabo tutor',
    'usabo coach online',
    'best biology olympiad coach usa',
    'usabo finalist coach',
    'best usabo prep program',
    'aiims trained usabo coach',
  ],
  openGraph: {
    title: 'Best USABO Coach | Cerebrum Biology Academy',
    description:
      'Full USABO pathway coaching. Open Exam → Semifinal → National Finals. Campbell + Alberts + Lehninger.',
    url: 'https://cerebrumbiologyacademy.com/best-usabo-coach',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-usabo-coach',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best USABO Coach (USA Biology Olympiad) | Open Exam → Semifinal → Finals',
    description: 'Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum',
  },
}

const config: BestVerticalConfig = {
  slug: 'best-usabo-coach',
  headline: 'Best USABO Coach (USA Biology Olympiad)',
  ribbon: 'Open Exam → Semifinal → National Finals · 11 US City Cohorts',
  subheadline:
    'AIIMS-trained faculty (AIIMS — India’s apex medical institute, peer to Harvard Medical School in selectivity). Led by Dr. Shekhar C Singh.',
  intro:
    "Cerebrum operates a dedicated USABO coaching programme covering the full pathway — USABO Open Exam (February), Semifinal (March) and National Finals — under Dr. Shekhar C Singh's curriculum direction. Coaching draws on Campbell Biology (canonical), Alberts' Molecular Biology of the Cell (Semifinal-level depth) and Lehninger Biochemistry.",
  clusterSummary:
    'US-friendly evening timezones (ET, CT, PT) · Often paired with AP Biology · 11 US city cohorts.',
  credentials: [
    { label: 'Full Pathway Coverage' },
    { label: 'Campbell + Alberts + Lehninger' },
    { label: 'Semifinal-Level Depth' },
    { label: 'ET / CT / PT Sessions' },
    { label: 'AP-USABO Bridge' },
    { label: '11 US City Cohorts' },
    { label: 'Past Finalist Mentors' },
    { label: 'AIIMS-Trained' },
  ],
  pages: [
    { title: 'USABO Coaching — Hub', href: '/usabo-coaching', note: 'Main programme page' },
    { title: 'USABO 6-Month Prep Plan', href: '/usabo-6-month-prep-plan' },
    { title: 'USABO Past Papers', href: '/usabo-past-papers' },
    { title: 'USABO Past Papers Archive', href: '/usabo-past-papers-archive' },
    { title: 'USABO 2026 Results', href: '/usabo-2026-results' },
    { title: 'New York', href: '/usabo-coaching-new-york' },
    { title: 'Bay Area', href: '/usabo-coaching-bay-area' },
    { title: 'Boston', href: '/usabo-coaching-boston' },
    { title: 'Chicago', href: '/usabo-coaching-chicago' },
    { title: 'Dallas-Austin', href: '/usabo-coaching-dallas-austin' },
    { title: 'Houston', href: '/usabo-coaching-houston' },
    { title: 'Los Angeles', href: '/usabo-coaching-los-angeles' },
    { title: 'New Jersey', href: '/usabo-coaching-new-jersey' },
    { title: 'Northern Virginia / DC', href: '/usabo-coaching-northern-virginia-dc' },
    { title: 'Seattle', href: '/usabo-coaching-seattle' },
    { title: 'Atlanta', href: '/usabo-coaching-atlanta' },
  ],
  pricing: [
    {
      tier: 'Complete Olympiad Year',
      price: '$4,500 / year',
      description:
        'Full pathway from Open Exam through Semifinal and Finals. Includes Alberts deep-dive, Lehninger biochem, weekly mock practice.',
    },
    {
      tier: '1:1 Elite Mentoring',
      price: '$90 / hour',
      description:
        'Past USABO Finalist / Semifinalist mentors. Targeted coaching for Semifinal essay-style problems.',
    },
    {
      tier: 'Small-Batch Weekend',
      price: '$50 / hour',
      description: 'Weekend cohort sessions. Cost-effective track for Open Exam preparation.',
    },
  ],
  whyBest: [
    {
      title: 'Full Pathway Coverage (Open → Semifinal → Finals)',
      description:
        "Most USABO prep options stop at Open Exam preparation. Cerebrum covers all three stages — including Semifinal-level depth from Alberts' Molecular Biology of the Cell — for students aiming at National Finals or USABO team selection.",
    },
    {
      title: 'Alberts + Lehninger for Semifinal Depth',
      description:
        "The USABO Semifinal jumps to undergraduate-level molecular biology and biochemistry. Cerebrum integrates Alberts' Molecular Biology of the Cell (the canonical undergrad cell biology text) and Lehninger Biochemistry — material most high-school-level USABO prep skips.",
    },
    {
      title: 'AP Biology + USABO Combined Track',
      description:
        'Many students sit both AP Biology and USABO. Cerebrum runs them in parallel — same faculty, overlapping curriculum, two-exam preparation. No need for two separate tutors.',
    },
    {
      title: 'US-Friendly Evening Timezones (ET, CT, PT)',
      description:
        'Live sessions scheduled in ET, CT and PT — after US school hours. No 4 a.m. classes for US students working with Asia-based tutors.',
    },
    {
      title: 'Biology-Only Specialist (Continuity Across Stages)',
      description:
        "A USABO Open candidate progressing to Semifinal and Finals benefits from continuity with the same biology-only faculty. Cerebrum's biology-only specialisation across NEET, IB, AP, MCAT and Olympiads provides that continuity — generalist science olympiad coaches do not.",
    },
    {
      title: '11 US City Cohort Pages',
      description:
        'Dedicated cohort pages for NYC, Bay Area, Boston, Chicago, Dallas-Austin, Houston, LA, NJ, NoVA-DC, Seattle and Atlanta. Per-cohort cohort timing and peer groups.',
    },
  ],
  testimonials: [
    {
      name: 'Aanya Sharma',
      score: 'USABO Semifinalist',
      college: 'Stanford',
      quote:
        'The Alberts deep-dive made the Semifinal questions feel manageable. I felt overprepared — exactly the right feeling.',
    },
    {
      name: 'Vikram Reddy',
      score: 'USABO Open Top 10%',
      college: 'Princeton',
      quote:
        'I started Cerebrum in October for the February Open. The AP-to-USABO bridge meant I prepared for both exams with one set of teachers.',
    },
    {
      name: 'Lina Park',
      score: 'USABO National Finalist',
      college: 'Harvard',
      quote:
        'Past finalist mentors at Cerebrum reviewed my Semifinal essay practice. They knew exactly which traps to flag.',
    },
  ],
  faqs: [
    {
      question: 'Who is the best USABO coach?',
      answer:
        "Dr. Shekhar C Singh (AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy) leads Cerebrum's USABO programme — widely cited as a leading USA Biology Olympiad coaching choice. The programme covers the full pathway from Open Exam through Semifinal and National Finals.",
    },
    {
      question: 'Which USABO coaching is best for the Semifinal?',
      answer:
        "Cerebrum is one of the few USABO prep programmes that goes beyond Open Exam preparation into Semifinal-level depth. The Semifinal requires undergraduate-level molecular biology (Alberts' Molecular Biology of the Cell) and biochemistry (Lehninger) — Cerebrum integrates both. Past USABO Finalist mentors review essay-style problem practice.",
    },
    {
      question: 'How much does USABO coaching cost?',
      answer:
        "Cerebrum's pricing: Complete Olympiad Year $4,500 (full pathway), 1:1 Elite Mentoring $90/hour (past Finalist mentors), Small-Batch Weekend $50/hour (cost-effective Open Exam track).",
    },
    {
      question: 'Can I prepare for AP Biology and USABO together?',
      answer:
        'Yes — and many Cerebrum students do exactly this. The AP-to-USABO bridge track uses the same faculty and overlapping Campbell Biology + Alberts content. Saves time and money versus two separate tutors.',
    },
    {
      question: 'What are the USABO stages and timeline?',
      answer:
        'Stage 1: USABO Open Exam (early February, school-administered). Stage 2: USABO Semifinal (March, top scorers from Open). Stage 3: USABO National Finals (June, top ~20 students). Top 4 represent the USA at the International Biology Olympiad (IBO).',
    },
    {
      question: 'How do I qualify for the USABO Semifinal?',
      answer:
        'You reach the Semifinal by being among the top scorers on the USABO Open Exam — roughly the top ~10% advance. The Open rewards end-to-end Campbell Biology mastery plus strong timed-MCQ technique; the Semifinal then jumps to undergraduate-level molecular biology (Alberts) and biochemistry (Lehninger). Cerebrum coaches both layers, so students clear the Open and arrive at the Semifinal already prepared for its depth.',
    },
    {
      question: 'How long does USABO prep take?',
      answer:
        'Plan for a full season rather than a few weeks of cramming. Most serious candidates start in the autumn (around September-October) for the February Open Exam, then continue into the spring for the Semifinal and Finals — realistically several months to a full year of consistent work. Pairing AP Biology with USABO compresses the timeline because the Campbell content overlaps. Cerebrum runs a structured prep plan across this window.',
    },
    {
      question: 'Does Cerebrum coach USABO online for all US timezones?',
      answer:
        'Yes. Live sessions run in US-friendly evening timezones (ET, CT, PT). Recorded sessions for revision. 11 US city cohort pages with localised cohort timing.',
    },
    {
      question: 'Which textbooks does the USABO programme use?',
      answer:
        "Campbell Biology (canonical Open Exam preparation), Alberts' Molecular Biology of the Cell (Semifinal-level depth), Lehninger Biochemistry (biochem and metabolism), and curated past papers (USABO + ELO + Korean / Russian olympiad archives for Finals practice).",
    },
  ],
  knowsAbout: [
    'USABO',
    'USABO Open Exam',
    'USABO Semifinal',
    'USABO National Finals',
    'Campbell Biology',
    'Alberts Molecular Biology of the Cell',
    'Lehninger Biochemistry',
    'IBO',
    'AP Biology',
    'Biology Olympiad',
    'Cell Biology',
    'Molecular Biology',
  ],
  whatsappMessage:
    'Hi! I want to book a FREE demo class for USABO (USA Biology Olympiad) with Cerebrum — best USABO coach. Please share available timings.',
}

export default function BestUSABOCoachPage() {
  return <BestVerticalLanding config={config} />
}
