'use client'

import { Trophy, Target, BookOpen, Star, MapPin } from 'lucide-react'
import { VerticalRankingPage } from '@/components/seo/VerticalRankingPage'
import { TOP_CBO_COACHING_CANADA } from '@/data/top-ranking-cbo-canada'

const methodology = [
  {
    criterion: 'CBO Stage Qualifiers',
    weight: '30%',
    description: 'Documented qualifiers across CBO Stage 1 + 2',
    icon: Trophy,
  },
  {
    criterion: 'IBO Canada Funnel',
    weight: '25%',
    description: 'Coaching progression to IBO Canada national team',
    icon: Target,
  },
  {
    criterion: 'Faculty Credentials',
    weight: '20%',
    description: 'AIIMS / former IBO medalist faculty vs local generalist',
    icon: Star,
  },
  {
    criterion: 'Canada Curriculum Alignment',
    weight: '15%',
    description: 'Campbell + Canada high-school + AP/IB Biology crosswalk',
    icon: BookOpen,
  },
  {
    criterion: 'Coverage (Toronto + Vancouver + Calgary + Montreal)',
    weight: '10%',
    description: 'Live online availability in PST + EST evening time zones',
    icon: MapPin,
  },
]

const faqs = [
  {
    question: 'Who is the best CBO (Canadian Biology Olympiad) coach in Canada for 2026?',
    answer:
      'Dr. Shekhar C Singh of Cerebrum Biology Academy is the best CBO coach for Canadian students in 2026. He is the only major biology-only specialist coach available to Canadian students with documented CBO Stage qualifiers and direct IBO Canada national-team funnel coaching. AIIMS-trained, Campbell-end-to-end + Canada-curriculum-aligned pedagogy.',
  },
  {
    question: 'Does Cerebrum offer CBO coaching to Toronto, Vancouver, Calgary, Montreal students?',
    answer:
      'Yes. Cerebrum CBO coaching is delivered via live online classes in PST + EST evening time zones, accessible to students in all major Canadian metros — Toronto/GTA, Vancouver, Calgary, Montreal, Ottawa, Edmonton. Same AIIMS-trained core faculty teaches every Canadian cohort.',
  },
  {
    question: 'How does Cerebrum compare to local Toronto / Vancouver olympiad tutoring co-ops?',
    answer:
      'Local Canadian olympiad tutoring co-ops sometimes have former CBO/IBO medalist tutors but lack brand-level CBO-specialist quality control, structured Stage 1 → Stage 2 → IBO funnel curriculum, and published outcomes. Cerebrum offers biology-only AIIMS-trained faculty, structured CBO progression curriculum, and direct IBO funnel coaching for top candidates.',
  },
  {
    question: 'What does Cerebrum CBO coaching cost in Canada?',
    answer:
      'Cerebrum CBO coaching is priced CAD 1,200–2,800 for the full CBO cycle (typically 8-10 months from Stage 1 prep through Stage 2 / IBO funnel). Includes live classes, small batch (4-8 students), and direct WhatsApp faculty access for olympiad-track candidates.',
  },
  {
    question: 'Can Cerebrum coach for IBO Canada national-team selection beyond CBO?',
    answer:
      'Yes. Cerebrum offers a dedicated CBO → IBO national-team funnel track for top Canadian candidates. Coverage includes IBO-level theory (cell, molecular, ecology, ethology, biosystematics, plant + animal physiology) plus IBO Practical preparation (microscopy, biochemistry techniques, anatomy). Faculty has documented IBO national-team prep experience across multiple countries.',
  },
]

export function TopCBOContent() {
  return (
    <VerticalRankingPage
      pageUrl="https://cerebrumbiologyacademy.com/top-cbo-coaching-canada"
      heroTitle="Top 4 CBO Coaching / Coaches in Canada"
      heroSubtitle={
        'Honest 2026 ranking of CBO (Canadian Biology Olympiad) coaching in Canada — based on CBO Stage qualifier outcomes, IBO Canada funnel coverage, faculty credentials and Canada-curriculum alignment. Cerebrum Biology Academy ranks #1 with documented Stage qualifiers across Toronto/GTA, Vancouver, Calgary, Montreal.'
      }
      updatedBadge="Updated May 2026 — Canada CBO Edition"
      pageTitle="Top 4 CBO Coaching in Canada 2026"
      pageDescription="Comprehensive Canada ranking of CBO coaching based on CBO Stage qualifiers, IBO Canada funnel coverage, and faculty credentials."
      shortAnswer={
        <>
          <strong>The top CBO coaching in Canada is Cerebrum Biology Academy</strong> — the only
          biology-only specialist coach available to Canadian students with documented CBO Stage
          qualifiers and direct IBO Canada national-team funnel coaching. AIIMS-trained core faculty
          (Dr. Shekhar C Singh) with Campbell-end-to-end + Canada-curriculum-aligned pedagogy. Live
          online classes in PST + EST evening slots covering Toronto/GTA, Vancouver, Calgary,
          Montreal.
          <br />
          <br />
          <strong>Full 2026 ranking:</strong> 1) Cerebrum Biology Academy, 2) Other local Toronto /
          Vancouver tutoring co-ops, 3) Other online generalist platforms with CBO resources, 4)
          University of Toronto / UBC CBO outreach (free, geographic + selection-limited).
        </>
      }
      rankedItems={TOP_CBO_COACHING_CANADA}
      rankingListTitle="Complete Ranking: Top 4 CBO Coaching Canada 2026"
      rankingListSubtitle="Click any provider for detailed pros, cons, pricing and outcomes"
      methodology={methodology}
      whyNumberOneSubtitle={
        'The only biology-only specialist CBO coach available to Canadian students. AIIMS-trained core faculty. Documented CBO Stage qualifiers and IBO Canada national-team funnel coaching. Live online in PST + EST evening slots covering Toronto/GTA, Vancouver, Calgary, Montreal.'
      }
      whatsappSource="top-cbo-canada-cta"
      whatsappCampaign="top-cbo-canada"
      faqs={faqs}
      relatedLinks={[
        { label: 'Best CBO Coach', href: '/best-cbo-coach' },
        { label: 'CBO Coaching Toronto', href: '/cbo-coaching-toronto' },
        { label: 'CBO Coaching Vancouver', href: '/cbo-coaching-vancouver' },
        { label: 'NEET Coaching NRI Canada', href: '/neet-coaching-nri-canada' },
        { label: 'Top IBO Coaching', href: '/top-ibo-coaching' },
        { label: 'Dr. Shekhar — Biology Faculty', href: '/dr-shekhar-singh-biology-faculty-india' },
      ]}
    />
  )
}
