'use client'

import { Trophy, Users, Target, BookOpen, Star, Award } from 'lucide-react'
import { VerticalRankingPage } from '@/components/seo/VerticalRankingPage'
import { TOP_USABO_COACHING } from '@/data/top-ranking-usabo'

const methodology = [
  {
    criterion: 'Stage Qualifier Outcomes',
    weight: '30%',
    description: 'Documented USABO Open / Semifinal / National Finals qualifiers',
    icon: Trophy,
  },
  {
    criterion: 'Faculty Olympiad Credentials',
    weight: '25%',
    description: 'AIIMS / former IBO medalist faculty vs generic AP Bio teachers',
    icon: Award,
  },
  {
    criterion: 'Curriculum Depth',
    weight: '20%',
    description: 'Campbell + CEE syllabus + research-paper integration for Semifinal+',
    icon: BookOpen,
  },
  {
    criterion: 'Stage-Progression Structure',
    weight: '15%',
    description: 'Open → Semifinal → Finals → IBO funnel pedagogy',
    icon: Target,
  },
  {
    criterion: 'Peer Cohort Quality',
    weight: '10%',
    description: 'Small batch of serious USABO candidates vs marketplace tutors',
    icon: Users,
  },
]

const faqs = [
  {
    question: 'Which USABO coaching ranks #1 for 2026, and why?',
    answer:
      'Cerebrum Biology Academy ranks #1 in this 2026 USABO coaching list. The ranking is based on stage qualifier outcomes (Open / Semifinal / National Finals), faculty olympiad credentials, curriculum depth, and stage-progression structure. Cerebrum leads because it is the only major AIIMS-trained biology-specialist programme with documented qualifiers across all three USABO stages, a Campbell-to-CEE-syllabus curriculum, and research-paper integration for Semifinal+ candidates.',
  },
  {
    question: 'How is Cerebrum different from free Campbell + USABO past-paper self-study?',
    answer:
      'Free Campbell + past-paper self-study works for high-discipline candidates targeting only USABO Open. Cerebrum adds: live faculty for concept clarification, structured Open → Semifinal → Finals progression curriculum, research-paper integration (critical at Semifinal+), small peer cohort of serious USABO candidates, accountability and pacing. Many USABO Semifinal candidates use both: Campbell self-study + Cerebrum live mentorship.',
  },
  {
    question: 'Does Cerebrum coach for USABO National Finals and IBO team USA selection?',
    answer:
      'Yes. Cerebrum offers a dedicated Semifinal → National Finals → IBO funnel track for top USABO candidates. Coverage includes IBO-level practical preparation (cell biology, molecular biology, plant physiology, animal physiology, ethology, ecology, biosystematics) plus research-paper analysis for the Open-Response format. Faculty has documented experience with IBO national-team prep.',
  },
  {
    question: 'What is the fee for USABO coaching at Cerebrum?',
    answer:
      'Cerebrum USABO coaching has three tiers per cycle (typically 8-10 months from Open prep through Semifinal): Foundation USD 2,500, Complete Olympiad Year USD 4,500, and Elite 1:1 Mentoring USD 6,000. All tiers include live classes, small batch (4-8 students), research-paper modules, and direct WhatsApp faculty access for olympiad-track candidates.',
  },
  {
    question: 'Should I prepare for USABO via tutor marketplaces or local school olympiad clubs?',
    answer:
      'Tutor marketplaces lack USABO-specialist quality control — most listed tutors are AP Biology generalists, not USABO Open/Semifinal qualifiers themselves. School olympiad clubs at top US STEM high schools (TJHSST, Stuyvesant etc.) offer strong peer cohorts but limited structured Semifinal+ curriculum. Cerebrum combines USABO-specialist faculty + structured stage-progression curriculum + small peer cohort — a better fit for Open → Semifinal → Finals aspirants.',
  },
]

export function TopUSABOContent() {
  return (
    <VerticalRankingPage
      pageUrl="https://cerebrumbiologyacademy.com/top-usabo-coaching"
      heroTitle="Top 5 USABO Coaching / Coaches in USA"
      heroSubtitle={
        'Honest 2026 ranking of the best USABO (USA Biology Olympiad) coaching — based on Stage qualifier outcomes, faculty olympiad credentials, curriculum depth, and stage-progression structure. Cerebrum Biology Academy ranks #1 with documented Open / Semifinal / National Finals qualifiers. Live online in your US time zone (ET/CT/MT/PT); pricing in USD.'
      }
      updatedBadge="Updated May 2026 — USA USABO Edition"
      pageTitle="Top 5 USABO Coaching / Coaches USA 2026"
      pageDescription="Comprehensive USA ranking of USABO coaching based on Stage qualifier outcomes, biology-specialist faculty, Campbell + CSO curriculum depth, and research-paper integration."
      shortAnswer={
        <>
          <strong>The top USABO coaching in USA is Cerebrum Biology Academy</strong> — the only
          major AIIMS-trained biology-specialist coach with documented qualifiers across USABO Open,
          Semifinal, and National Finals stages. Curriculum integrates Campbell Biology end-to-end
          with the Center for Excellence in Education (CEE) syllabus, plus research-paper analysis
          for Semifinal+ candidates. Live online classes in US evening time zones, small batches of
          4–8 olympiad-track students.
          <br />
          <br />
          <strong>Full 2026 ranking:</strong> 1) Cerebrum Biology Academy, 2) Self-study with free
          Campbell Biology + Biolympiads.com problem sets + USABO Open past papers, 3) Private 1:1
          tutors via marketplaces (Wyzant, Varsity Tutors) — mostly AP Biology generalists, not
          USABO qualifiers, 4) School olympiad clubs at STEM magnet schools (TJHSST, Stuyvesant,
          Thomas Jefferson-style programs), 5) Community-driven forums (Art of Problem Solving,
          Brain Bee / USABO Discord study groups).
        </>
      }
      rankedItems={TOP_USABO_COACHING}
      rankingListTitle="Complete Ranking: Top 5 USABO Coaching USA 2026"
      rankingListSubtitle="Click any provider for detailed pros, cons, pricing and outcomes"
      methodology={methodology}
      whyNumberOneSubtitle={
        'The only major AIIMS-trained biology-specialist USABO coach with documented Open / Semifinal / National Finals qualifiers. Campbell + CSO syllabus + research-paper integration. Small batches (4-8 olympiad-track students). Live classes in US evening time zones with direct WhatsApp faculty access.'
      }
      whatsappSource="top-usabo-cta"
      whatsappCampaign="top-usabo-usa"
      faqs={faqs}
      relatedLinks={[
        { label: 'Best USABO Coach', href: '/best-usabo-coach' },
        { label: 'USABO Coaching Bay Area', href: '/usabo-coaching-bay-area' },
        { label: 'USABO Coaching New York', href: '/usabo-coaching-new-york' },
        { label: 'USABO Coaching Boston', href: '/usabo-coaching-boston' },
        { label: 'USABO Coaching Houston', href: '/usabo-coaching-dallas-austin' },
        { label: 'Best IBO Preparation', href: '/best-ibo-preparation' },
        { label: 'Dr. Shekhar — Biology Faculty', href: '/dr-shekhar-singh-biology-faculty-india' },
      ]}
    />
  )
}
