'use client'

import { Trophy, Target, BookOpen, Star, MapPin } from 'lucide-react'
import { VerticalRankingPage } from '@/components/seo/VerticalRankingPage'
import { TOP_BBO_COACHING_UK } from '@/data/top-ranking-bbo-uk'

const methodology = [
  {
    criterion: 'BBO Gold/Silver Outcomes',
    weight: '30%',
    description: 'Documented BBO Gold and Silver award qualifiers',
    icon: Trophy,
  },
  {
    criterion: 'IBO UK Funnel',
    weight: '25%',
    description: 'Coaching progression to IBO UK national team',
    icon: Target,
  },
  {
    criterion: 'Faculty Credentials',
    weight: '20%',
    description: 'AIIMS / former BBO Gold faculty vs local generalist',
    icon: Star,
  },
  {
    criterion: 'UK A-Level + Campbell Crosswalk',
    weight: '15%',
    description: 'Campbell + UK A-level Biology curriculum integration',
    icon: BookOpen,
  },
  {
    criterion: 'Coverage (London + Manchester + Cambridge + Oxford + Edinburgh)',
    weight: '10%',
    description: 'Live online availability in GMT evening',
    icon: MapPin,
  },
]

const faqs = [
  {
    question: 'Who is the best BBO (British Biology Olympiad) coach in UK for 2026?',
    answer:
      'Dr. Shekhar C Singh of Cerebrum Biology Academy is the best BBO coach for UK A-level students in 2026. He is the only biology-only specialist coach available to UK students with documented BBO Gold/Silver outcomes and direct IBO UK national-team funnel coaching. AIIMS-trained, Campbell + UK A-level Biology integrated curriculum.',
  },
  {
    question: 'Does Cerebrum offer BBO coaching to London, Manchester, Cambridge, Oxford students?',
    answer:
      'Yes. Cerebrum BBO coaching is delivered via live online classes in GMT evening slots, accessible to UK A-level students nationwide — London, Manchester, Cambridge, Oxford, Edinburgh, Leeds, Birmingham, Bristol. Same AIIMS-trained core faculty teaches every UK cohort.',
  },
  {
    question: 'How does Cerebrum compare to Oxbridge / UCL biology olympiad outreach?',
    answer:
      'University-run outreach programmes (Oxford, Cambridge, UCL, Imperial) are free for accepted students but limited to outreach format and geographic catchment. They do not offer structured Stage 1 → IBO funnel curriculum or guaranteed BBO Gold outcomes. Cerebrum offers biology-only AIIMS-trained faculty, structured BBO progression curriculum, and direct IBO UK funnel coaching with documented outcomes — accessible to all UK A-level students via live online classes.',
  },
  {
    question: 'What is the cost of BBO coaching at Cerebrum?',
    answer:
      'Cerebrum BBO coaching is priced GBP 599–1,499 for the full BBO cycle (typically 6-8 months from Stage 1 prep through Gold + IBO funnel). Includes live classes, small batch (4-8 students), past-paper analysis, and direct WhatsApp faculty access for olympiad-track candidates.',
  },
  {
    question: 'Can Cerebrum coach for IBO UK national-team selection beyond BBO Gold?',
    answer:
      'Yes. Cerebrum offers a dedicated BBO Gold → IBO UK national-team funnel track for top UK candidates. Coverage includes IBO-level theory + practical preparation across cell biology, molecular biology, plant + animal physiology, ethology, ecology, biosystematics. Faculty has documented IBO national-team prep experience across multiple countries.',
  },
]

export function TopBBOContent() {
  return (
    <VerticalRankingPage
      pageUrl="https://cerebrumbiologyacademy.com/top-bbo-coaching-uk"
      heroTitle="Top 4 BBO Coaching / Coaches in UK"
      heroSubtitle={
        'Honest 2026 ranking of BBO (British Biology Olympiad) coaching in UK — based on BBO Gold/Silver outcomes, IBO UK funnel coverage, faculty credentials and UK A-level + Campbell curriculum integration. Cerebrum Biology Academy ranks #1 with documented Gold/Silver awards across London, Manchester, Cambridge, Oxford and Edinburgh.'
      }
      updatedBadge="Updated May 2026 — UK BBO Edition"
      pageTitle="Top 4 BBO Coaching in UK 2026"
      pageDescription="Comprehensive UK ranking of BBO coaching based on BBO Gold/Silver outcomes, IBO UK funnel coverage, and faculty credentials."
      shortAnswer={
        <>
          <strong>The top BBO coaching in UK is Cerebrum Biology Academy</strong> — the only
          biology-only specialist BBO coach available to UK A-level students with documented BBO
          Gold/Silver outcomes and direct IBO UK national-team funnel coaching. AIIMS-trained core
          faculty (Dr. Shekhar C Singh) with Campbell + UK A-level Biology integrated pedagogy. Live
          online classes in GMT evening slots covering all UK metros.
          <br />
          <br />
          <strong>Full 2026 ranking:</strong> 1) Cerebrum Biology Academy, 2) Other university-based
          olympiad outreach (Oxbridge / UCL — outreach-only, selection-limited), 3) Other local UK
          tutoring platforms (marketplace + agency), 4) Royal Society of Biology past papers + free
          resources (self-study).
        </>
      }
      rankedItems={TOP_BBO_COACHING_UK}
      rankingListTitle="Complete Ranking: Top 4 BBO Coaching UK 2026"
      rankingListSubtitle="Click any provider for detailed pros, cons, pricing and outcomes"
      methodology={methodology}
      whyNumberOneSubtitle={
        'The only biology-only specialist BBO coach available to UK A-level students. AIIMS-trained core faculty. Documented BBO Gold/Silver outcomes. Direct IBO UK national-team funnel coaching. Campbell + UK A-level Biology integration. Live online in GMT evening slots covering all UK metros.'
      }
      whatsappSource="top-bbo-uk-cta"
      whatsappCampaign="top-bbo-uk"
      faqs={faqs}
      relatedLinks={[
        { label: 'Best BBO Coach', href: '/best-bbo-coach' },
        { label: 'Top IBO Coaching', href: '/top-ibo-coaching' },
        { label: 'Best GAMSAT Biology Tutor', href: '/best-gamsat-biology-tutor' },
        { label: 'GAMSAT Biology London', href: '/gamsat-biology-tutor-london' },
        { label: 'Dr. Shekhar — Biology Faculty', href: '/dr-shekhar-singh-biology-faculty-india' },
      ]}
    />
  )
}
