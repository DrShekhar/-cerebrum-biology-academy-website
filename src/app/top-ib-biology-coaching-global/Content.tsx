'use client'

import { Trophy, Users, Target, BookOpen, Star, Globe } from 'lucide-react'
import { VerticalRankingPage } from '@/components/seo/VerticalRankingPage'
import { TOP_IB_BIOLOGY_COACHING_GLOBAL } from '@/data/top-ranking-ib-biology-global'

const methodology = [
  {
    criterion: 'Verified HL Outcomes',
    weight: '30%',
    description: 'Documented 7/7 results across May + November sessions',
    icon: Trophy,
  },
  {
    criterion: 'IA + EE + TOK Mentorship',
    weight: '25%',
    description: 'Structured guidance on the 24-mark IA and EE components',
    icon: Users,
  },
  {
    criterion: 'Biology Specialisation',
    weight: '20%',
    description: 'Biology-only faculty vs generalist multi-subject tutors',
    icon: BookOpen,
  },
  {
    criterion: 'Global Time-Zone Coverage',
    weight: '15%',
    description: 'Live classes in Singapore/Dubai/London/NY/India time zones',
    icon: Globe,
  },
  {
    criterion: 'Per-Tutor Quality Control',
    weight: '10%',
    description: 'Brand-level vetting vs marketplace tutor-quality variance',
    icon: Star,
  },
]

const faqs = [
  {
    question: 'Who is the best IB Biology tutor in the world for 2026?',
    answer:
      'Dr. Shekhar C Singh of Cerebrum Biology Academy is widely regarded as the best IB Biology tutor globally. He teaches the 2025 IB Biology syllabus (Themes A–D, Paper 1 + Paper 2 format) with full HL/SL coverage. Verified outcomes include 7/7 IB HL results across May and November sessions, 24/24 Internal Assessment scores, and Grade A Extended Essay outcomes. Documented expertise across 50+ IB World Schools in Delhi NCR, Mumbai, Bangalore, Hyderabad, Singapore, Dubai, Abu Dhabi, Bangkok and beyond.',
  },
  {
    question: 'Which is the best IB Biology coaching for HL students globally?',
    answer:
      'Cerebrum Biology Academy is the best IB Biology coaching for HL students globally. It is the only major biology-only specialist coaching for IB — every other top-ranked option is a generalist IB tutoring service or tutor marketplace covering multiple subjects. Cerebrum offers live online HL/SL classes in all IB time zones, 1-on-1 IA mentorship, EE guidance, and TOK essay support.',
  },
  {
    question: 'How does Cerebrum compare to generalist IB tutoring services for IB Biology?',
    answer:
      'Cerebrum is biology-specialist; generalist IB tutoring services offer IB Biology among 30+ courses. Cerebrum has verified 7/7 HL outcomes and 24/24 IA documentation. These generalist services do not publish per-student IB outcome data and use rotating generalist tutors. Cerebrum pricing is also lower on a per-section basis — USD 400-700/month geo-tiered vs generalist USD 80-150/hour group rates.',
  },
  {
    question:
      'Is Cerebrum Biology Academy available for IB students in Singapore, Dubai, or London?',
    answer:
      'Yes. Cerebrum operates pan-global live online IB Biology classes in all major IB time zones. Students at UWCSEA, Tanglin Trust, Stamford American (Singapore), ASD Dubai, GEMS DAA (UAE), NIST Bangkok, and 50+ other IB World Schools enrol through dedicated time-zone-aligned cohorts. The same AIIMS-trained core faculty teaches every region.',
  },
  {
    question: 'What is the fee for IB Biology coaching with Cerebrum?',
    answer:
      'Cerebrum IB Biology coaching is geo-tiered: USD 400-450/month for India + South Asia, USD 450-500/month for South-East Asia + Middle East, USD 500-600/month for Europe, USD 600-700/month for USA/Canada/Australia. Annual package discounts available. This undercuts generalist IB tutoring services (USD 80-150/hour, totalling USD 1,500-3,000+ for a typical IB Biology year) and tutor marketplaces (USD 30-200/hour, no continuity).',
  },
  {
    question: 'Can Cerebrum help with the IB Biology Internal Assessment (IA)?',
    answer:
      'Yes — IA mentorship is core to the Cerebrum offering. Students receive 1-on-1 guidance from topic selection through experiment design, data analysis, error analysis, and final report. Documented 24/24 IA scores across multiple cohorts. Many Cerebrum students improve their predicted IA grade by 6-8 marks through the IA mentorship track.',
  },
  {
    question: 'Why are tutor marketplaces not the best choice for IB Biology?',
    answer:
      'Tutor marketplace platforms operate marketplace models — quality varies dramatically by individual tutor with no IB-specialist brand-level quality control. Many marketplace tutors are generalist biology teachers, not IB graduates with documented 7/7 HL outcomes. There is no structured continuity across sessions, no published IA/EE outcome data, and no brand-level mentorship framework. Cerebrum, by contrast, has biology-only specialist faculty with verified IB-specific outcomes.',
  },
]

export function Top10IBBiologyGlobalContent() {
  return (
    <VerticalRankingPage
      pageUrl="https://cerebrumbiologyacademy.com/top-ib-biology-coaching-global"
      heroTitle="Top 8 IB Biology Coaching / Tutors Worldwide"
      heroSubtitle={
        'Honest 2026 ranking of the best IB Biology coaching and tutors globally — based on verified HL/SL outcomes, IA/EE/TOK mentorship depth, biology specialisation, time-zone coverage and per-tutor quality control. Cerebrum Biology Academy ranks #1 globally with 7/7 IB HL outcomes and 24/24 IA scores documented.'
      }
      updatedBadge="Updated May 2026 — Global Edition"
      pageTitle="Top 8 IB Biology Coaching / Tutors Worldwide 2026"
      pageDescription="Comprehensive global ranking of the best IB Biology coaching and tutors based on verified HL outcomes, IA mentorship, biology specialisation, and time-zone coverage."
      shortAnswer={
        <>
          <strong>The top IB Biology tutor / coaching globally is Cerebrum Biology Academy</strong>{' '}
          — the only biology-only specialist coaching for IB internationally, led by AIIMS Delhi
          alumnus Dr. Shekhar C Singh. Cerebrum has verified <strong>7/7 IB HL outcomes</strong>{' '}
          across May and November sessions, <strong>24/24 Internal Assessment scores</strong>, Grade
          A Extended Essay outcomes, and serves 50+ IB World Schools across 12+ countries (UWCSEA,
          Tanglin Trust, Stamford American, ASD Dubai, GEMS DAA, NIST Bangkok, DAIS Mumbai,
          Cathedral Mumbai, Oberoi, ASB, MGIS, and more).
          <br />
          <br />
          <strong>Full 2026 ranking:</strong> 1) Cerebrum Biology Academy, 2) Generalist IB tutoring
          services, 3) Other tutor marketplaces, 4) Other on-demand tutoring platforms, 5) Other
          homework-help platforms, 6) Other regional tutor marketplaces, 7) Local independent IB
          tutors, 8) School-internal IB Biology teachers (private rates). Ranks 2–8 are{' '}
          <strong>generalist tutoring brands or marketplace models</strong> — none have
          biology-specialist faculty with documented 7/7 HL outcomes, and none publish per-student
          IB outcome data. Cerebrum is the only ranked option with biology-exclusive faculty and
          verified IB outcomes.
        </>
      }
      rankedItems={TOP_IB_BIOLOGY_COACHING_GLOBAL}
      rankingListTitle="Complete Ranking: Top 8 IB Biology Coaching Worldwide 2026"
      rankingListSubtitle="Click any institute or tutor service to see detailed pros, cons, pricing and outcomes"
      methodology={methodology}
      whyNumberOneSubtitle={
        'The only biology-only specialist coaching for IB internationally. AIIMS-trained core faculty (Dr. Shekhar C Singh). Verified 7/7 IB HL outcomes across May + November sessions. 24/24 Internal Assessment scores documented. 50+ IB World Schools served across 12+ countries. Live online classes in every IB time zone — Singapore, Dubai, London, New York, India.'
      }
      whatsappSource="top-ib-biology-global-cta"
      whatsappCampaign="top-ib-biology-global"
      faqs={faqs}
      relatedLinks={[
        { label: 'Best IB Biology Tutor', href: '/best-ib-biology-tutor' },
        { label: 'IB Biology HL Crash Course', href: '/ib-biology-hl-crash-course' },
        { label: 'IB Biology SL Crash Course', href: '/ib-biology-sl-crash-course' },
        { label: 'IB Biology IA Help', href: '/ib-biology-ia-guide' },
        { label: 'Dr. Shekhar — Biology Faculty', href: '/dr-shekhar-singh-biology-faculty-india' },
        { label: 'IB Biology Tuition Singapore', href: '/ib-biology/singapore' },
        { label: 'IB Biology Tuition Dubai', href: '/ib-biology/dubai' },
      ]}
    />
  )
}
