import { Metadata } from 'next'
import {
  CompetitorComparisonLanding,
  type CompetitorComparisonConfig,
} from '@/components/seo/CompetitorComparisonLanding'

export const metadata: Metadata = {
  title: 'Cerebrum vs Kaplan MCAT Biology | Specialist vs Generalist',
  description:
    'Cerebrum Biology Academy vs Kaplan for MCAT Bio/Biochem — biology-only AIIMS specialist vs full-MCAT generalist. Compare pricing, faculty depth, Bio section results.',
  keywords: [
    'cerebrum vs kaplan mcat',
    'kaplan mcat biology alternative',
    'best mcat biology tutor vs kaplan',
    'mcat bio specialist vs kaplan',
    'kaplan mcat review alternative',
    'biology only mcat prep',
  ],
  openGraph: {
    title: 'Cerebrum vs Kaplan MCAT Biology | Specialist vs Generalist',
    description: 'Biology-only AIIMS specialist vs full-MCAT generalist. Compare pricing, depth, results.',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-kaplan-mcat',
    type: 'website',
  },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/cerebrum-vs-kaplan-mcat' },

  twitter: { card: 'summary_large_image' as const },
}

const config: CompetitorComparisonConfig = {
  slug: 'cerebrum-vs-kaplan-mcat',
  competitorName: 'Kaplan MCAT',
  headline: 'Cerebrum vs Kaplan for MCAT Bio/Biochem',
  ribbon: 'Biology-Only Specialist vs Full-MCAT Generalist',
  subheadline: 'Deep Bio/Biochem section coaching at a fraction of the full-course price.',
  intro:
    'Kaplan is the largest full-MCAT prep provider in the US, covering all four sections (C/P, CARS, B/B, P/S) with rotating subject faculty at ~$2,700 for the full course. Cerebrum is a biology-section specialist — Bio/Biochem only, with AIIMS-trained faculty who teach nothing but biology. The question is whether you need full-MCAT coverage or biology-section depth. Many students pair both: Kaplan for C/P and CARS, Cerebrum for Bio/Biochem.',
  table: [
    { criterion: 'Scope', cerebrum: 'Bio/Biochem section only (specialist)', competitor: 'All 4 MCAT sections (generalist)', cerebrumWins: false },
    { criterion: 'Bio/Biochem Faculty', cerebrum: 'AIIMS-trained MD, biology-only specialist', competitor: 'Rotating subject faculty across all sections', cerebrumWins: true },
    { criterion: 'Full-Course Price', cerebrum: '$449–$1,349 (Bio/Biochem only)', competitor: '~$2,700 (all 4 sections)', cerebrumWins: true },
    { criterion: 'Per-Hour 1:1 Rate', cerebrum: '$135/hour', competitor: '$175–$200/hour', cerebrumWins: true },
    { criterion: 'Batch Size', cerebrum: '4–6 students max', competitor: '20–40 students', cerebrumWins: true },
    { criterion: 'Campbell Biology Depth', cerebrum: 'End-to-end Campbell + Lehninger coverage', competitor: 'Review-level only (condensed)', cerebrumWins: true },
    { criterion: 'AAMC Passage Walkthroughs', cerebrum: 'Bio/Biochem passages only, deep analysis', competitor: 'All sections, survey-level', cerebrumWins: true },
    { criterion: 'C/P + CARS Coverage', cerebrum: 'Not offered (biology only)', competitor: 'Full coverage', cerebrumWins: false },
  ],
  whyChooseCerebrum: [
    { title: 'Biology Section Depth', description: 'AIIMS-trained faculty who teach only biology — not rotating across C/P and CARS. Campbell Biology end-to-end coverage exceeds Kaplan\'s review-level biology content.' },
    { title: 'Smaller Batches', description: '4–6 students vs Kaplan\'s 20–40. More individual attention on Bio/Biochem passage technique.' },
    { title: 'Lower Cost for Bio/Biochem', description: '$449–$1,349 for biology-section mastery vs $2,700 for Kaplan\'s full course. If Bio/Biochem is your weakest section, the ROI is clear.' },
    { title: 'Pair-Friendly', description: 'Many students use Kaplan for C/P and CARS, then Cerebrum for Bio/Biochem depth. No overlap, no redundancy.' },
  ],
  whenCompetitorMightBeBetter: [
    'You need all four MCAT sections coached by one provider',
    'Your Bio/Biochem section is already your strongest — C/P or CARS is the bottleneck',
    'You want in-person classroom sessions (Kaplan offers this in some cities)',
  ],
  testimonials: [
    { name: 'Pre-med, Columbia University', score: 'Bio/Biochem 131', college: 'Applied to NYU, Cornell, Mount Sinai', quote: 'Used Kaplan for C/P and CARS, Cerebrum for Bio/Biochem. The depth on passages was night-and-day compared to Kaplan\'s biology review.' },
    { name: 'Pre-med, UCLA', score: 'Bio/Biochem 130', college: 'Applied to UCLA, UCSF, Stanford', quote: 'Cerebrum\'s Campbell coverage filled gaps Kaplan didn\'t touch. The 1:1 sessions on biochem passages were worth every dollar.' },
  ],
  faqs: [
    { question: 'Can I use Kaplan for C/P and CARS, then Cerebrum for Bio/Biochem?', answer: 'Yes — this is the most common pairing pattern. Kaplan covers Chemical/Physical Foundations and CARS; Cerebrum covers Biological/Biochemical Foundations in depth. No overlap.' },
    { question: 'Is Cerebrum cheaper than Kaplan overall?', answer: 'For Bio/Biochem only, yes: $449–$1,349 vs Kaplan\'s ~$2,700 (which covers all sections). If you only need biology-section help, Cerebrum is 45–80% cheaper. If you need all four sections, Kaplan\'s bundled price may be better value.' },
    { question: 'Does Cerebrum\'s faculty depth matter for Bio/Biochem?', answer: 'The Bio/Biochem section is 59 questions testing passage-based biological reasoning. AIIMS-trained faculty with clinical + research backgrounds read these passages differently than generalist instructors. The depth shows in passage-interpretation strategy, not just content recall.' },
    { question: 'What if Bio/Biochem is already my strongest section?', answer: 'If your diagnostic shows Bio/Biochem at 129+ and C/P or CARS below 127, a generalist like Kaplan is the better investment. Cerebrum is highest-ROI when Bio/Biochem is the weak or middle section.' },
  ],
  whatsappMessage: 'Hi — I\'m comparing Cerebrum and Kaplan for MCAT Bio/Biochem prep. Please share programme details, pricing, and how pairing with Kaplan works.',
}

export default function Page() {
  return <CompetitorComparisonLanding config={config} />
}
