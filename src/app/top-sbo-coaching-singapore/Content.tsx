'use client'

import { Trophy, Target, BookOpen, Star, MapPin } from 'lucide-react'
import { VerticalRankingPage } from '@/components/seo/VerticalRankingPage'
import { TOP_SBO_COACHING_SINGAPORE } from '@/data/top-ranking-sbo-singapore'

const methodology = [
  {
    criterion: 'SBO Gold/Silver Outcomes',
    weight: '30%',
    description: 'Documented SBO Gold and Silver award qualifiers',
    icon: Trophy,
  },
  {
    criterion: 'IBO Singapore Funnel',
    weight: '25%',
    description: 'Coaching progression to IBO Singapore national team',
    icon: Target,
  },
  {
    criterion: 'Faculty Credentials',
    weight: '20%',
    description: 'AIIMS / former olympiad medalist faculty vs local generalist',
    icon: Star,
  },
  {
    criterion: 'JC + IB Curriculum Alignment',
    weight: '15%',
    description: 'Campbell + Singapore JC Biology + IB Biology crosswalk',
    icon: BookOpen,
  },
  {
    criterion: 'Coverage (RI / ACSI / NJC / HCI / UWCSEA / Tanglin)',
    weight: '10%',
    description: 'Live online availability in SGT evening',
    icon: MapPin,
  },
]

const faqs = [
  {
    question: 'Who is the best SBO (Singapore Biology Olympiad) coach in Singapore for 2026?',
    answer:
      'Dr. Shekhar C Singh of Cerebrum Biology Academy is the best SBO coach for Singapore JC and IB students in 2026. He is the only biology-only specialist SBO coach with documented SBO Gold/Silver outcomes and direct IBO Singapore national-team funnel coaching. AIIMS-trained, Campbell + Singapore JC Biology + IB Biology integrated curriculum.',
  },
  {
    question: 'Does Cerebrum offer SBO coaching to RI, ACSI, NJC, HCI, RGS, NUS High students?',
    answer:
      'Yes. Cerebrum SBO coaching is delivered via live online classes in SGT evening slots, accessible to students at all top Singapore JCs and integrated programmes — Raffles Institution (RI), Anglo-Chinese School Independent (ACSI), National JC (NJC), Hwa Chong Institution (HCI), Raffles Girls School (RGS), NUS High School of Math & Science. Also serves IB students at UWCSEA, Tanglin Trust, Stamford American, and other IB World Schools in Singapore.',
  },
  {
    question: 'How does Cerebrum compare to school-internal SBO clubs at top Singapore JCs?',
    answer:
      'School-internal SBO clubs at top JCs offer strong peer cohorts but are limited to enrolled students and depend heavily on individual faculty quality. They do not always offer structured IBO progression beyond SBO. Cerebrum offers biology-only AIIMS-trained faculty, structured SBO progression curriculum, direct IBO Singapore funnel coaching, and is accessible to students across schools — including IB students at international schools.',
  },
  {
    question: 'What does Cerebrum SBO coaching cost in Singapore?',
    answer:
      'Cerebrum SBO coaching is priced SGD 1,200–2,499 for the full SBO cycle (typically 8-10 months from Stage 1 prep through Gold + IBO funnel). Includes live classes, small batch (4-8 students), past-paper analysis, research-paper modules for advanced candidates, and direct WhatsApp faculty access.',
  },
  {
    question: 'Can Cerebrum coach for IBO Singapore national-team selection beyond SBO Gold?',
    answer:
      'Yes. Cerebrum offers a dedicated SBO Gold → IBO Singapore national-team funnel track for top Singapore candidates. Coverage includes IBO-level theory + practical preparation across cell biology, molecular biology, plant + animal physiology, ethology, ecology, biosystematics. Faculty has documented IBO national-team prep experience across multiple countries.',
  },
]

export function TopSBOContent() {
  return (
    <VerticalRankingPage
      pageUrl="https://cerebrumbiologyacademy.com/top-sbo-coaching-singapore"
      heroTitle="Top 4 SBO Coaching / Coaches in Singapore"
      heroSubtitle={
        'Honest 2026 ranking of SBO (Singapore Biology Olympiad) coaching — based on SBO Gold/Silver outcomes, IBO Singapore funnel coverage, faculty credentials, and JC + IB curriculum alignment. Cerebrum Biology Academy ranks #1 with documented Gold/Silver awards across RI, ACSI, NJC, HCI, UWCSEA, Tanglin, Stamford and other top Singapore schools.'
      }
      updatedBadge="Updated May 2026 — Singapore SBO Edition"
      pageTitle="Top 4 SBO Coaching in Singapore 2026"
      pageDescription="Comprehensive Singapore ranking of SBO coaching based on SBO Gold/Silver outcomes, IBO Singapore funnel coverage, and JC + IB curriculum alignment."
      shortAnswer={
        <>
          <strong>The top SBO coaching in Singapore is Cerebrum Biology Academy</strong> — the only
          biology-only specialist SBO coach available to Singapore JC and IB students with
          documented SBO Gold/Silver outcomes and direct IBO Singapore national-team funnel
          coaching. AIIMS-trained core faculty (Dr. Shekhar C Singh) with Campbell + Singapore JC
          Biology + IB Biology integrated pedagogy. Live online classes in SGT evening slots.
          <br />
          <br />
          <strong>Full 2026 ranking:</strong> 1) Cerebrum Biology Academy, 2) Other school-internal
          SBO clubs (top JCs and integrated programmes — enrolled students only), 3) Other
          Singapore-local tutoring platforms (marketplace + agency), 4) SSEF / NUS High SBO outreach
          (free, selection-limited).
        </>
      }
      rankedItems={TOP_SBO_COACHING_SINGAPORE}
      rankingListTitle="Complete Ranking: Top 4 SBO Coaching Singapore 2026"
      rankingListSubtitle="Click any provider for detailed pros, cons, pricing and outcomes"
      methodology={methodology}
      whyNumberOneSubtitle={
        'The only biology-only specialist SBO coach available to Singapore JC and IB students. AIIMS-trained core faculty. Documented SBO Gold/Silver outcomes. Direct IBO Singapore national-team funnel coaching. Campbell + Singapore JC + IB Biology integration. Live online classes in SGT evening slots.'
      }
      whatsappSource="top-sbo-singapore-cta"
      whatsappCampaign="top-sbo-singapore"
      faqs={faqs}
      relatedLinks={[
        { label: 'Best SBO Coach', href: '/sbo-coaching' },
        { label: 'Top IBO Coaching', href: '/top-ibo-coaching' },
        { label: 'IB Biology Tutor Singapore', href: '/ib-biology/singapore' },
        { label: 'NEET Coaching Singapore', href: '/neet-coaching-singapore' },
        { label: 'Top IB Biology Coaching Global', href: '/top-ib-biology-coaching-global' },
        { label: 'Dr. Shekhar — Biology Faculty', href: '/dr-shekhar-singh-biology-faculty-india' },
      ]}
    />
  )
}
