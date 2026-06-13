import { Metadata } from 'next'
import {
  CompetitorComparisonLanding,
  type CompetitorComparisonConfig,
} from '@/components/seo/CompetitorComparisonLanding'

export const metadata: Metadata = {
  title: 'Cerebrum vs Blueprint MCAT Biology | Comparison',
  description:
    'Cerebrum Biology Academy vs Blueprint MCAT for Bio/Biochem — biology-only specialist vs adaptive full-MCAT platform. Compare pricing, faculty, learning approach.',
  keywords: [
    'cerebrum vs blueprint mcat',
    'blueprint mcat biology alternative',
    'best mcat biology tutor vs blueprint',
    'blueprint mcat bio section',
    'blueprint mcat alternative biology only',
  ],
  openGraph: {
    title: 'Cerebrum vs Blueprint MCAT Biology | Comparison',
    description: 'Biology-only specialist vs adaptive full-MCAT platform.',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-blueprint-mcat',
    type: 'website',
  },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/cerebrum-vs-blueprint-mcat' },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Cerebrum vs Blueprint MCAT Biology | Comparison',
    description:
      'Cerebrum Biology Academy vs Blueprint MCAT for Bio/Biochem — biology-only specialist vs adaptive full-MCAT platform. Compare pricing, faculty, learning approach.',
  },
}

const config: CompetitorComparisonConfig = {
  slug: 'cerebrum-vs-blueprint-mcat',
  competitorName: 'Blueprint MCAT',
  headline: 'Cerebrum vs Blueprint for MCAT Bio/Biochem',
  ribbon: 'Live Biology Specialist vs Adaptive Platform',
  subheadline: 'Human biology expertise vs algorithm-driven review.',
  intro:
    "Blueprint MCAT (formerly Next Step) is an adaptive-learning platform covering all four MCAT sections at $1,799–$2,999, with AI-driven study plans and extensive question banks. Cerebrum is a live, human-taught biology-section specialist — Bio/Biochem only, AIIMS-trained faculty, $449–$1,349. The contrast: Blueprint's algorithmic breadth vs Cerebrum's human biology depth. Many students use both.",
  table: [
    {
      criterion: 'Scope',
      cerebrum: 'Bio/Biochem section only (live)',
      competitor: 'All 4 sections (adaptive platform)',
      cerebrumWins: false,
    },
    {
      criterion: 'Learning Mode',
      cerebrum: 'Live 1:1 or small-batch with faculty',
      competitor: 'Self-paced adaptive platform + optional live',
      cerebrumWins: true,
    },
    {
      criterion: 'Bio/Biochem Faculty',
      cerebrum: 'AIIMS-trained MD, biology specialist',
      competitor: 'Algorithm + optional generalist tutor',
      cerebrumWins: true,
    },
    {
      criterion: 'Price (Bio only)',
      cerebrum: '$449–$1,349',
      competitor: '$1,799–$2,999 (all sections, no bio-only)',
      cerebrumWins: true,
    },
    {
      criterion: 'Question Bank',
      cerebrum: '300+ Bio/Biochem passages',
      competitor: '4,000+ across all sections',
      cerebrumWins: false,
    },
    {
      criterion: 'Adaptive Study Plan',
      cerebrum: 'Human-designed, faculty-adjusted',
      competitor: 'AI-driven algorithm',
      cerebrumWins: true,
    },
    {
      criterion: 'Passage Strategy Coaching',
      cerebrum: 'Live walkthrough with faculty',
      competitor: 'Video explanations + AI feedback',
      cerebrumWins: true,
    },
  ],
  whyChooseCerebrum: [
    {
      title: 'Human Biology Expertise',
      description:
        'Live coaching with AIIMS-trained faculty who explain passage reasoning in real-time — not algorithmic hints. For Bio/Biochem, human insight on experimental-design passages is irreplaceable.',
    },
    {
      title: 'Accountability + Motivation',
      description:
        "Weekly live sessions with a real tutor. Blueprint's adaptive platform requires strong self-discipline; many students lose momentum without live accountability.",
    },
    {
      title: 'Biology Section Depth',
      description:
        "Campbell + Lehninger end-to-end vs Blueprint's condensed biology content modules. The depth matters for 130+ Bio/Biochem targeting.",
    },
    {
      title: 'Lower Biology-Only Cost',
      description:
        "$449–$1,349 vs Blueprint's $1,799+ (no biology-only option). For students who only need Bio/Biochem help, Cerebrum is 50–75% cheaper.",
    },
  ],
  whenCompetitorMightBeBetter: [
    "You're a strong self-studier who thrives with adaptive platforms",
    'You need all four sections and want one platform for everything',
    'You primarily need a massive question bank across all sections',
  ],
  testimonials: [
    {
      name: 'Pre-med, UT Austin',
      score: 'Bio/Biochem 130',
      college: 'Applied to UT Southwestern, Baylor COM',
      quote:
        "Blueprint was great for C/P and P/S but its Bio content was surface-level. Cerebrum's live passage walkthroughs made the difference — went from 126 to 130 on Bio.",
    },
    {
      name: 'Pre-med, UMich',
      score: 'Bio/Biochem 131',
      college: 'Applied to Michigan, Northwestern, WashU',
      quote:
        'Used Blueprint for the adaptive question bank, Cerebrum for live Bio coaching. The human element for passage interpretation was what I needed.',
    },
  ],
  faqs: [
    {
      question: 'Can I use Blueprint for the platform and Cerebrum for live Bio coaching?',
      answer:
        'Yes — this is a strong combination. Blueprint provides the adaptive question bank and study plan for all sections; Cerebrum provides live, human-taught Bio/Biochem depth. No overlap since Cerebrum is biology-only.',
    },
    {
      question: 'Blueprint has 4,000+ questions — does Cerebrum match that?',
      answer:
        "For total question count across all sections, no. Cerebrum offers 300+ Bio/Biochem-specific passages with deep faculty-guided analysis. Blueprint's question bank is broader but shallower per section. For Bio/Biochem specifically, our passage analysis is more thorough.",
    },
    {
      question: 'Is Blueprint better for self-disciplined students?',
      answer:
        "If you're a strong self-studier who can maintain daily practice without external accountability, Blueprint's adaptive platform is powerful. If you need weekly live sessions with a real tutor for motivation and feedback, Cerebrum is the better fit for Bio/Biochem.",
    },
    {
      question: 'Which is cheaper for Bio/Biochem help only?',
      answer:
        'Cerebrum: $449–$1,349. Blueprint: $1,799+ (no biology-only pricing). For biology-section-specific help, Cerebrum is 50–75% cheaper.',
    },
  ],
  whatsappMessage:
    "Hi — I'm comparing Cerebrum and Blueprint MCAT for Bio/Biochem. Please share programme details and how pairing with Blueprint works.",
}

export default function Page() {
  return <CompetitorComparisonLanding config={config} />
}
