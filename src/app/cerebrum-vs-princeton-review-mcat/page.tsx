import { Metadata } from 'next'
import {
  CompetitorComparisonLanding,
  type CompetitorComparisonConfig,
} from '@/components/seo/CompetitorComparisonLanding'

export const metadata: Metadata = {
  title: 'Cerebrum vs Princeton Review MCAT Biology | Comparison',
  description:
    'Cerebrum Biology Academy vs Princeton Review for MCAT Bio/Biochem — biology-only specialist vs full-MCAT generalist. Compare pricing, faculty, Bio section depth.',
  keywords: [
    'cerebrum vs princeton review mcat',
    'princeton review mcat biology alternative',
    'best mcat biology tutor vs princeton review',
    'mcat bio specialist vs princeton review',
    'princeton review mcat alternative biology',
  ],
  openGraph: {
    title: 'Cerebrum vs Princeton Review MCAT Biology | Comparison',
    description: 'Biology-only specialist vs full-MCAT generalist. Compare depth and pricing.',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-princeton-review-mcat',
    type: 'website',
  },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/cerebrum-vs-princeton-review-mcat' },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Cerebrum vs Princeton Review MCAT Biology | Comparison',
    description:
      'Cerebrum Biology Academy vs Princeton Review for MCAT Bio/Biochem — biology-only specialist vs full-MCAT generalist. Compare pricing, faculty, Bio section depth.',
  },
}

const config: CompetitorComparisonConfig = {
  slug: 'cerebrum-vs-princeton-review-mcat',
  competitorName: 'Princeton Review MCAT',
  headline: 'Cerebrum vs Princeton Review for MCAT Bio/Biochem',
  ribbon: 'Biology Specialist vs Full-MCAT Course',
  subheadline: 'Section-level biology depth at biology-only pricing.',
  intro:
    'Princeton Review is one of the largest full-MCAT prep providers, offering all four sections at ~$2,900 for the full course or $183/hour for private tutoring. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty, $449–$1,349. The positioning is clear: Princeton Review for comprehensive coverage, Cerebrum for biology-section depth. Many students combine both.',
  table: [
    {
      criterion: 'Scope',
      cerebrum: 'Bio/Biochem section only',
      competitor: 'All 4 MCAT sections',
      cerebrumWins: false,
    },
    {
      criterion: 'Bio/Biochem Faculty',
      cerebrum: 'AIIMS-trained MD, biology-only',
      competitor: 'Rotating generalist instructors',
      cerebrumWins: true,
    },
    {
      criterion: 'Full-Course Price',
      cerebrum: '$449–$1,349 (Bio only)',
      competitor: '~$2,900 (all sections)',
      cerebrumWins: true,
    },
    {
      criterion: 'Per-Hour 1:1 Rate',
      cerebrum: '$135/hour',
      competitor: '$183/hour',
      cerebrumWins: true,
    },
    {
      criterion: 'Batch Size',
      cerebrum: '4–6 students',
      competitor: '20–30 students',
      cerebrumWins: true,
    },
    {
      criterion: 'Campbell + Lehninger Depth',
      cerebrum: 'End-to-end',
      competitor: 'Review-level condensed',
      cerebrumWins: true,
    },
    {
      criterion: 'Score Guarantee',
      cerebrum: 'No guarantee (honest about outcomes)',
      competitor: '+10 points guarantee',
      cerebrumWins: false,
    },
  ],
  whyChooseCerebrum: [
    {
      title: 'Deeper Bio/Biochem Coverage',
      description:
        'Campbell Biology end-to-end + Lehninger biochemistry. Princeton Review condenses biology into review chapters — Cerebrum teaches it as a standalone subject.',
    },
    {
      title: 'Specialist Faculty',
      description:
        'AIIMS-trained faculty teaching only biology vs Princeton Review instructors rotating across all sections.',
    },
    {
      title: '4–6 Student Batches',
      description:
        'More individual attention on Bio/Biochem passage interpretation. Princeton Review classes are 20–30 students.',
    },
    {
      title: 'Biology-Only Pricing',
      description:
        '$449–$1,349 vs $2,900 full course. If biology is your weak section, the per-dollar ROI is higher.',
    },
  ],
  whenCompetitorMightBeBetter: [
    'You need all four sections from one provider',
    'You value the +10 score guarantee (requires meeting study commitments)',
    'Bio/Biochem is your strongest section — invest in C/P or CARS instead',
  ],
  testimonials: [
    {
      name: 'Pre-med, UChicago',
      score: 'Bio/Biochem 130',
      college: 'Applied to Northwestern, UChicago, WashU',
      quote:
        'Princeton Review covered the breadth; Cerebrum gave me the Bio/Biochem depth I needed. The passage strategy sessions were transformative.',
    },
    {
      name: 'Pre-med, Georgetown',
      score: 'Bio/Biochem 131',
      college: 'Applied to Georgetown, GWU, Hopkins',
      quote:
        'Paired Princeton Review (C/P + CARS) with Cerebrum (Bio). Best decision I made — scored 131 on Bio after a 126 diagnostic.',
    },
  ],
  faqs: [
    {
      question: 'Can I pair Princeton Review with Cerebrum?',
      answer:
        'Yes — Princeton Review for C/P, CARS, P/S; Cerebrum for Bio/Biochem depth. Many students do this. No content overlap since Cerebrum only covers the biology section.',
    },
    {
      question: 'Princeton Review has a score guarantee — does Cerebrum?',
      answer:
        "We do not offer a blanket score guarantee. Princeton Review's guarantee requires meeting all study commitments (practice tests, homework, attendance). We focus on transparent outcomes: our median Bio/Biochem improvement is 3–5 points from diagnostic.",
    },
    {
      question: 'Which is cheaper for Bio/Biochem only?',
      answer:
        'Cerebrum: $449–$1,349. Princeton Review: $2,900 for all sections (no biology-only option). For students who only need biology help, Cerebrum is 50–80% cheaper.',
    },
    {
      question: "Does Princeton Review's broader scope help Bio/Biochem?",
      answer:
        "Not directly. Princeton Review's biology review is condensed because it shares instructional time with C/P, CARS, and P/S. Cerebrum spends 100% of instructional time on biology — deeper content, more passage practice, more 1:1 feedback on Bio/Biochem specifically.",
    },
  ],
  whatsappMessage:
    "Hi — I'm comparing Cerebrum and Princeton Review for MCAT Bio/Biochem. Please share programme details and how combining both providers works.",
  subheadContext: 'MCAT Bio/Biochem (B/B section)',
  proofStat:
    'AIIMS-trained (India’s top medical institute) biology specialists · MCAT Bio/Biochem focus · 4–6 student batches',
  cerebrumDescription:
    'Biology-only specialist coaching for the MCAT Bio/Biochem (B/B) section with AIIMS-trained faculty and Campbell + Lehninger end-to-end depth.',
  relatedFooterLink: { href: '/best-mcat-biology-tutor', label: 'Best MCAT Biology Tutor' },
  courseName: 'Cerebrum MCAT Bio/Biochem Coaching',
  personKnowsAbout: [
    'MCAT Biological and Biochemical Foundations',
    'MCAT Biochemistry',
    'Campbell Biology',
    'Lehninger Biochemistry',
  ],
}

export default function Page() {
  return <CompetitorComparisonLanding config={config} />
}
