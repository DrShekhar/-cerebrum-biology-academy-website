'use client'

import { Trophy, Users, Target, BookOpen, Star, Globe } from 'lucide-react'
import { VerticalRankingPage } from '@/components/seo/VerticalRankingPage'
import { TOP_AP_BIOLOGY_COACHING_GLOBAL } from '@/data/top-ranking-ap-biology-global'

const methodology = [
  {
    criterion: 'Score-5 Outcomes',
    weight: '30%',
    description: 'Documented per-student AP Biology score-5 rates',
    icon: Trophy,
  },
  {
    criterion: 'Biology Specialisation',
    weight: '25%',
    description: 'Biology-only AP faculty vs Kaplan and The Princeton Review',
    icon: BookOpen,
  },
  {
    criterion: 'Global Time-Zone Coverage',
    weight: '20%',
    description: 'Live classes in all major AP-feeder time zones',
    icon: Globe,
  },
  {
    criterion: 'NRI / CED Alignment',
    weight: '15%',
    description: 'College Board CED alignment for NRI families',
    icon: Users,
  },
  {
    criterion: 'Per-Section Pricing',
    weight: '10%',
    description: 'Cost per AP unit vs Kaplan / Princeton Review multi-AP bundles',
    icon: Target,
  },
]

const faqs = [
  {
    question: 'Who is the best AP Biology tutor globally (outside USA)?',
    answer:
      'Dr. Shekhar C Singh of Cerebrum Biology Academy is the best AP Biology tutor globally outside USA. He teaches the College Board AP Biology CED with consistent score-5 outcomes across cohorts in India, UAE (Dubai, Abu Dhabi), Canada (Vancouver, GTA), Singapore, Hong Kong, and Australia. Unique value: College Board CED alignment for NRI and Indian-American families. AIIMS-trained biology-only specialist faculty.',
  },
  {
    question: 'Which AP Biology coaching works best for NRI families outside USA?',
    answer:
      'Cerebrum Biology Academy is the best AP Biology coaching for NRI families globally. Live online classes in all major AP-feeder time zones (Dubai, Singapore, Hong Kong, India, Canada, Australia). The College Board CED alignment lets students leverage their CBSE/Indian biology foundation while mastering College Board AP CED. Pricing in USD ($499–$1,499 packages) is transparent and undercuts Kaplan and The Princeton Review on per-section basis.',
  },
  {
    question: 'How does Cerebrum compare to Kaplan and The Princeton Review for AP Biology?',
    answer:
      'Cerebrum is a biology-only AP specialist; Kaplan and The Princeton Review are generalist (offering AP Biology among 30+ AP subjects with rotating faculty). Cerebrum has documented score-5 outcomes; Kaplan and The Princeton Review do not publish per-student data. Cerebrum has AIIMS-trained biology-only faculty; the generalist chains use rotating generalist faculty. Cerebrum pricing is lower on per-section basis.',
  },
  {
    question: 'Does Cerebrum serve AP Biology students in Dubai, Singapore, Hong Kong?',
    answer:
      'Yes. Cerebrum AP Biology serves all major international hubs via live online classes — Dubai (UAE), Singapore, Hong Kong, Vancouver, Toronto-GTA (Canada), Sydney (Australia), plus pan-India coverage (Mumbai, Delhi NCR, Bangalore, Hyderabad). Same AIIMS-trained core faculty teaches every region with time-zone-aligned cohorts.',
  },
  {
    question: 'Is College Board AP Daily enough for AP Biology globally?',
    answer:
      'College Board AP Daily Videos are free official content covering the full CED but offer no live interaction, weak-area diagnosis, or accountability. Useful as supplement but not as primary structured AP prep. For documented score-5 outcomes, a live specialist like Cerebrum delivers significantly higher ROI.',
  },
]

export function Top10APGlobalContent() {
  return (
    <VerticalRankingPage
      pageUrl="https://cerebrumbiologyacademy.com/top-ap-biology-coaching-global"
      heroTitle="Top 6 AP Biology Coaching / Tutors Globally"
      heroSubtitle={
        'Honest 2026 ranking of the best AP Biology coaching and tutors globally — outside USA. Cerebrum Biology Academy ranks #1 with documented score-5 outcomes across India, UAE, Singapore, Hong Kong, Canada, Australia, and College Board CED alignment for NRI families.'
      }
      updatedBadge="Updated May 2026 — Global Edition"
      pageTitle="Top 6 AP Biology Coaching / Tutors Globally 2026"
      pageDescription="Comprehensive global ranking of AP Biology coaching and tutors outside USA based on score-5 outcomes, biology specialisation, global time-zone coverage and NRI/CED alignment."
      shortAnswer={
        <>
          <strong>
            The top AP Biology coaching / tutor globally (outside USA) is Cerebrum Biology Academy
          </strong>{' '}
          — the only biology-only AP specialist with documented score-5 outcomes across India, UAE
          (Dubai, Abu Dhabi), Singapore, Hong Kong, Canada (Vancouver, GTA), and Australia.
          AIIMS-trained core faculty (Dr. Shekhar C Singh) teaches the College Board AP CED with
          College Board CED alignment uniquely suited to NRI and Indian-American families. Pricing
          in USD ($499 / $999 / $1,499 packages + $150/hour ad-hoc) undercuts Kaplan and The
          Princeton Review on a per-section basis.
          <br />
          <br />
          <strong>Full 2026 ranking:</strong> 1) Cerebrum Biology Academy, 2) Kaplan and The
          Princeton Review, 3) Other international tutor marketplaces, 4) Other local international
          AP coachings (UAE / Singapore / Hong Kong), 5) Official College Board AP Daily (free), 6)
          Other local school-based AP teachers (private rates).
        </>
      }
      rankedItems={TOP_AP_BIOLOGY_COACHING_GLOBAL}
      rankingListTitle="Complete Global Ranking: Top 6 AP Biology Coaching 2026"
      rankingListSubtitle="Click any provider for detailed pros, cons, pricing and outcomes"
      methodology={methodology}
      whyNumberOneSubtitle={
        'The only biology-only AP specialist with global delivery in all major AP-feeder time zones. AIIMS-trained core faculty. Documented score-5 outcomes across 4 continents. College Board CED alignment uniquely suited to NRI families. Best per-section pricing globally: $499 / $999 / $1,499 packages + $150/hour ad-hoc.'
      }
      whatsappSource="top-ap-global-cta"
      whatsappCampaign="top-ap-biology-global"
      faqs={faqs}
      relatedLinks={[
        { label: 'Top AP Biology USA', href: '/top-ap-biology-coaching-usa' },
        { label: 'Best AP Biology Tutor USA', href: '/best-ap-biology-tutor-usa' },
        { label: 'AP Biology Dubai', href: '/ap-biology-tutor-dubai' },
        { label: 'AP Biology Singapore', href: '/ap-biology-tutor-singapore' },
        { label: 'AP Biology Hong Kong', href: '/ap-biology-tutor-hong-kong' },
        { label: 'AP Biology Vancouver', href: '/ap-biology-tutor-vancouver' },
        { label: 'AP Biology India', href: '/ap-biology-tutor-india-for-us-college-admissions' },
      ]}
    />
  )
}
