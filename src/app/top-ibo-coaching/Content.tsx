'use client'

import { Trophy, Target, BookOpen, Star, Globe } from 'lucide-react'
import { VerticalRankingPage } from '@/components/seo/VerticalRankingPage'
import { TOP_IBO_COACHING } from '@/data/top-ranking-ibo'

const methodology = [
  {
    criterion: 'National-Team Outcomes',
    weight: '30%',
    description: 'Documented qualifiers across India / USA / UK / Singapore / Canada IBO funnels',
    icon: Trophy,
  },
  {
    criterion: 'Theory + Practical Depth',
    weight: '25%',
    description:
      'IBO-level theory + practical track (cell, molecular, plant phys, animal phys, ethology, ecology)',
    icon: BookOpen,
  },
  {
    criterion: 'Faculty Olympiad Credentials',
    weight: '20%',
    description: 'AIIMS / former IBO medalist faculty vs generic biology teachers',
    icon: Star,
  },
  {
    criterion: 'Funnel Progression Coverage',
    weight: '15%',
    description: 'Stage 1 → Stage 2 → IBO selection coaching across all major national funnels',
    icon: Globe,
  },
  {
    criterion: 'Research-Paper Integration',
    weight: '10%',
    description: 'Primary-literature analysis for IBO theory rounds',
    icon: Target,
  },
]

const faqs = [
  {
    question: 'Who is the best IBO coach globally for 2026?',
    answer:
      'Dr. Shekhar C Singh of Cerebrum Biology Academy is the best IBO coach globally for 2026. He is the only biology-specialist coach with documented qualifiers across all major national-team selection funnels — India (NSEB → INBO → OCSC → IBO), USA (USABO Open → Semifinal → Finals → IBO), UK (BBO → IBO), Singapore (SBO → IBO), Canada (CBO → IBO). Curriculum integrates Campbell + Lehninger biochemistry + research-paper analysis with full theory + practical coverage.',
  },
  {
    question: 'What is unique about Cerebrum IBO coaching vs national-body camps?',
    answer:
      'National-body camps (HBCSE Mumbai for India, CEE for USABO, Royal Society of Biology for UK, MOE for Singapore) only run after Stage 2 selection — they are the official selection venue, not a preparation path. Cerebrum coaches students through the EARLIER stages (national Stage 1 → Stage 2 qualification) so they can REACH the national camp. Once at the national camp, candidates also continue with Cerebrum for IBO-specific theory + practical depth that camps do not always cover comprehensively.',
  },
  {
    question: 'Does Cerebrum cover IBO Practical (cell biology, molecular biology, anatomy)?',
    answer:
      'Yes. The IBO has both Theory and Practical components. Cerebrum covers the full IBO Practical syllabus — cell biology + microscopy, molecular biology + biochemistry techniques, plant physiology + ecology, animal physiology + ethology, and biosystematics. Practical preparation is integrated with the Theory curriculum across the IBO funnel programme.',
  },
  {
    question: 'Which countries does Cerebrum coach IBO students from?',
    answer:
      'Cerebrum coaches IBO students from India, USA, UK, Singapore, Canada, UAE, Australia, Hong Kong, and other countries with active biology olympiad selection. Live online classes in time-zone-aligned cohorts. Each national funnel (NSEB/USABO/BBO/SBO/CBO) has its own coaching track within the broader IBO preparation programme.',
  },
  {
    question: 'What is the cost of IBO coaching at Cerebrum?',
    answer:
      'Cerebrum IBO coaching runs in three olympiad tiers for the full IBO cycle (typically 12 months covering national Stage 1 prep through IBO theory + practical): Foundation Track USD 2,500/year (small-batch cohort), Complete Olympiad Year USD 4,500/year (full theory + practical), and 1:1 Elite Mentoring USD 6,000/year. This includes live classes, very small batch (6-8 olympiad-track students), research-paper modules, practical coaching, and direct WhatsApp faculty access. Country-specific pricing in INR / GBP / SGD / CAD available.',
  },
]

export function TopIBOContent() {
  return (
    <VerticalRankingPage
      pageUrl="https://cerebrumbiologyacademy.com/top-ibo-coaching"
      heroTitle="Top 5 IBO Coaching Globally"
      heroSubtitle={
        'Honest 2026 global ranking of IBO (International Biology Olympiad) coaching — based on national-team qualifier outcomes, theory + practical depth, faculty olympiad credentials, and funnel progression coverage. Cerebrum Biology Academy ranks #1 with qualifiers across India, USA, UK, Singapore, and Canada IBO funnels.'
      }
      updatedBadge="Updated May 2026 — Global IBO Edition"
      pageTitle="Top 5 IBO Coaching Globally 2026"
      pageDescription="Comprehensive global ranking of IBO coaching across India, USA, UK, Singapore, Canada national-team funnels based on qualifier outcomes, theory + practical depth, and research-paper integration."
      shortAnswer={
        <>
          <strong>
            The top IBO (International Biology Olympiad) coaching globally is Cerebrum Biology
            Academy
          </strong>{' '}
          — the only biology-specialist coach with documented qualifiers across all major
          national-team selection funnels: India (NSEB → INBO → OCSC → IBO), USA (USABO Open →
          Semifinal → Finals → IBO), UK (BBO → IBO), Singapore (SBO → IBO), and Canada (CBO → IBO).
          AIIMS-trained core faculty (Dr. Shekhar C Singh) covers full IBO theory + practical with
          Campbell + Lehninger + research-paper integration.
          <br />
          <br />
          <strong>Full 2026 ranking:</strong> 1) Cerebrum Biology Academy, 2) National-body-run
          olympiad camps (HBCSE / CEE / RSB / Singapore MOE — post-selection only), 3) Other online
          biology olympiad platforms, 4) Other local olympiad coaching (city-specific), 5) Other
          olympiad discussion forums and Discord servers.
        </>
      }
      rankedItems={TOP_IBO_COACHING}
      rankingListTitle="Complete Global Ranking: Top 5 IBO Coaching 2026"
      rankingListSubtitle="Click any provider for detailed pros, cons, pricing and outcomes"
      methodology={methodology}
      whyNumberOneSubtitle={
        'The only biology-specialist coaching with documented qualifiers across all major IBO national-team funnels (India, USA, UK, Singapore, Canada). AIIMS-trained core faculty. Campbell + Lehninger biochemistry + research-paper integration. Full theory + practical coverage. Very small batches (6-8 olympiad-track students).'
      }
      whatsappSource="top-ibo-cta"
      whatsappCampaign="top-ibo-global"
      faqs={faqs}
      relatedLinks={[
        { label: 'Best IBO Preparation', href: '/best-ibo-preparation' },
        { label: 'Best USABO Coach', href: '/best-usabo-coach' },
        { label: 'Best INBO Coach', href: '/best-inbo-coach' },
        { label: 'NSEB Coaching India', href: '/nseb-coaching' },
        { label: 'Best CBO Coach', href: '/best-cbo-coach' },
        { label: 'Best BBO Coach', href: '/best-bbo-coach' },
        { label: 'Dr. Shekhar — Biology Faculty', href: '/dr-shekhar-singh-biology-faculty-india' },
      ]}
    />
  )
}
