import type { Metadata } from 'next'
import {
  CompetitorComparisonLanding,
  type CompetitorComparisonConfig,
} from '@/components/seo/CompetitorComparisonLanding'

export const metadata: Metadata = {
  title: 'Cerebrum vs Aakash for NEET Biology Coaching Compared',
  description:
    "Detailed Cerebrum vs Aakash comparison for NEET Biology specifically. Biology-only AIIMS-trained specialist (Cerebrum, ₹40K-₹1.56L) vs PCB-generalist with 150-300 student batches (Aakash, ₹1.4L+). 680+ vs Aakash's scale — biology pedagogy depth analysis.",
  keywords: [
    'cerebrum vs aakash neet biology',
    'aakash vs cerebrum biology coaching',
    'best neet biology coaching aakash vs cerebrum',
    'aakash biology faculty review',
    'cerebrum biology vs aakash 360',
    'small batch biology vs aakash batch',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cerebrum-vs-aakash-neet-biology',
  },
  openGraph: {
    title: 'Cerebrum vs Aakash for NEET Biology | Cerebrum Biology Academy',
    description:
      'Side-by-side comparison of Cerebrum and Aakash specifically for NEET Biology — batch size, faculty depth, pricing, results.',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-aakash-neet-biology',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Cerebrum vs Aakash for NEET Biology Coaching Compared',
    description:
      'Detailed Cerebrum vs Aakash comparison for NEET Biology specifically. Biology-only AIIMS-trained specialist (Cerebrum, ₹40K-₹1.56L) vs PCB-generalist with 150-300 stude...',
  },
}

const config: CompetitorComparisonConfig = {
  slug: 'cerebrum-vs-aakash-neet-biology',
  competitorName: 'Aakash',
  headline: 'Cerebrum vs Aakash — NEET Biology Specifically',
  ribbon:
    'Biology-Only AIIMS-Trained Specialist (Cerebrum) vs PCB-Generalist Mass Coaching (Aakash)',
  subheadline:
    'How the two compare for NEET Biology pedagogy, batch size, faculty depth, pricing, and final score outcomes.',
  intro:
    "Aakash (acquired by Byju's in 2021, now operating as Aakash Byju's) is one of India's largest NEET coaching chains, running 250+ centres with combined Physics + Chemistry + Biology curriculum. Cerebrum is a biology-only specialist run by Dr. Shekhar C Singh (AIIMS Delhi). The two operate fundamentally different pedagogy models — this comparison focuses specifically on NEET Biology outcomes.",
  table: [
    {
      criterion: 'Subject Focus',
      cerebrum: 'Biology-only specialist — 360 NEET marks / 50% of total',
      competitor: 'Physics + Chemistry + Biology generalist (rotating faculty)',
      cerebrumWins: true,
    },
    {
      criterion: 'Batch Size (Biology Class)',
      cerebrum: '15–20 students across all tiers',
      competitor: '150–300+ students per biology class',
      cerebrumWins: true,
    },
    {
      criterion: 'Founder / Lead Biology Faculty',
      cerebrum: 'Dr. Shekhar C Singh — AIIMS Delhi alumnus, 12+ years',
      competitor: 'Rotating subject faculty (no single biology lead)',
      cerebrumWins: true,
    },
    {
      criterion: 'NCERT Line-by-Line Mapping',
      cerebrum: 'Every NCERT bullet cross-referenced to NEET PYQ archive',
      competitor: 'Standard NCERT coverage with textbook supplements',
      cerebrumWins: true,
    },
    {
      criterion: 'Annual Fees (Biology-Equivalent Tier)',
      cerebrum: '₹40,000–₹1,56,000/year (Pursuit through Pinnacle)',
      competitor: '₹1,40,000+/year (combined PCB, not biology-isolated)',
      cerebrumWins: true,
    },
    {
      criterion: '1:1 Doubt Slots',
      cerebrum: 'Weekly 1:1 doubt slots in Ascent + Pinnacle tiers',
      competitor: 'Generally not available individually at batch scale',
      cerebrumWins: true,
    },
    {
      criterion: 'Documented Medical Selections',
      cerebrum: '680+ since 2014 (AIIMS / JIPMER / AFMC / state colleges)',
      competitor: 'Brand-scale results published; biology-isolated outcomes not disclosed',
      cerebrumWins: false,
    },
    {
      criterion: 'Brand Recall + Recognition',
      cerebrum: 'Specialist niche brand in biology',
      competitor: 'Mass national brand recognition',
      cerebrumWins: false,
    },
    {
      criterion: 'Network Effects (PCB Combined)',
      cerebrum: 'Biology-only — pair with another for Physics + Chemistry',
      competitor: 'Single-shop full PCB coverage',
      cerebrumWins: false,
    },
    {
      criterion: 'Best Pattern',
      cerebrum: 'Standalone for biology + PhysicsWallah / Vedantu for PC',
      competitor: 'Full-shop PCB if budget allows ₹1.4L+ generalist',
      cerebrumWins: false,
    },
  ],
  whyChooseCerebrum: [
    {
      title: 'Biology pedagogy depth structurally impossible at Aakash batch scale',
      description:
        "Aakash typically runs 150-300 student biology batches with rotating faculty. Identifying individual student weakness in Plant Physiology vs Genetics vs Human Physiology is not feasible at that scale. Cerebrum's 15-20 student batches with the same faculty across the year enables chapter-level weakness tracking and targeted intervention — the structural reason biology score-per-effort is higher at Cerebrum.",
    },
    {
      title: 'AIIMS-trained pedagogy is rare at NEET coaching scale',
      description:
        "Aakash, Allen, and PhysicsWallah have faculty rotation systems; the senior biology faculty at any of these brands changes year-to-year as senior staff move on. Cerebrum's continuity around Dr. Shekhar C Singh (AIIMS Delhi alumnus since 2014) means the same pedagogy compounds year-over-year — students benefit from accumulated NEET PYQ pattern intelligence that brand-scale chains can't preserve.",
    },
    {
      title: 'Half the cost when isolated to biology',
      description:
        "Aakash full PCB programmes run ~₹1.4L+/year. Cerebrum biology-only Ascent tier (the most popular value tier) is ₹58K-90K — roughly 40-50% cheaper for the same biology component. Most students pair Cerebrum biology with PhysicsWallah PCB (₹10K-20K) for total ₹70K-110K vs Aakash's ₹1.4L+ — comparable or better total spending with deeper biology pedagogy.",
    },
  ],
  whenCompetitorMightBeBetter: [
    'You want a single brand covering all three NEET subjects under one roof and have ₹1.4L+ annual budget for combined PCB.',
    "You prioritise national brand recall and don't need batch-size differentiation for biology specifically.",
    "You live in a Tier 3 / Tier 4 city where Aakash has a physical centre and online learning isn't practical for your family.",
    "You're a Foundation Class 8-10 student where Aakash Scholastics has strong infrastructure (see /best-neet-foundation-tutor for Cerebrum Foundation alternative).",
  ],
  testimonials: [
    {
      name: 'Rohan Verma',
      score: 'NEET 695 — Biology 355/360',
      college: 'AFMC Pune',
      quote:
        'Switched from Aakash 250-student batch to Cerebrum 18-student batch in Class 12. Biology score jumped 40 marks. Faculty actually knew my name and weak chapters.',
    },
    {
      name: 'Anika Reddy',
      score: 'NEET 705 — Biology 358/360',
      college: 'AIIMS Jodhpur',
      quote:
        'Aakash Plus Test Series was useful for physics. But the biology faculty rotated every quarter — no continuity. Cerebrum Pinnacle gave me the same faculty for 12 months — different outcome.',
    },
    {
      name: 'Karthik Iyer',
      score: 'NEET 685 — Biology 348/360',
      college: 'AIIMS Mangalagiri',
      quote:
        'Was paying ₹1.45L at Aakash for combined PCB. Moved to Cerebrum biology-only ₹88K + PhysicsWallah PCB ₹15K — total ₹1.03L with materially better biology. Same year.',
    },
  ],
  faqs: [
    {
      question: 'Is Cerebrum better than Aakash for NEET Biology specifically?',
      answer:
        'For NEET Biology specifically, yes — three structural reasons. (1) Subject specialisation: Cerebrum is biology-only with a single faculty lead (Dr. Shekhar C Singh, AIIMS Delhi); Aakash is PCB-generalist with rotating subject faculty. (2) Batch size: Cerebrum 15-20 students vs Aakash 150-300+. (3) Cost: Cerebrum biology-only Ascent ₹58K-90K vs Aakash combined PCB ₹1.4L+. The strongest student pattern is to pair Cerebrum biology with another provider (PhysicsWallah / Vedantu) for Physics + Chemistry. Aakash remains better for students wanting a single national brand covering all subjects under one roof.',
    },
    {
      question: 'How does Aakash batch size compare to Cerebrum for NEET Biology?',
      answer:
        'Aakash typically runs 150-300+ student biology classes across its centre network. Cerebrum runs 15-20 student batches across all tiers (Pursuit / Ascent / Pinnacle). The structural difference is that at Aakash batch scale, the biology faculty cannot identify individual student weakness in real time — pacing is averaged across the cohort. At Cerebrum batch scale, the same faculty teaches the same 15-20 students across the year, enabling chapter-level weakness tracking and targeted 1:1 intervention.',
    },
    {
      question: 'Is Aakash cheaper than Cerebrum for NEET Biology?',
      answer:
        'Compared like-for-like, no. Aakash combined PCB courses run ~₹1,40,000+/year. Cerebrum biology-only Ascent (the popular value tier) is ₹58,000-90,000/year — roughly 35-45% cheaper for the same biology component. Most strategic pattern: Cerebrum biology (₹58K-90K) + PhysicsWallah PCB (₹10K-20K) = ₹70K-110K total with deeper biology pedagogy. Aakash remains comparable on price only when you value brand recall and single-shop PCB convenience over batch size and biology depth.',
    },
    {
      question: 'Should I move from Aakash to Cerebrum mid-Class 12?',
      answer:
        'If your Aakash Class 12 biology mock score is consistently below 320/360 and your Aakash batch is 200+ students with rotating faculty, switching to Cerebrum Ascent or Pinnacle by October of Class 12 is high-leverage. Switching after January of Class 12 is too compressed for full curriculum re-pacing. The most common Cerebrum mid-year join is October-November of Class 12 from larger Aakash / Allen batches, typically resulting in a 30-50 mark biology score improvement on the final NEET. WhatsApp +91 88264-44334 for a free 30-minute diagnostic if you want to evaluate the switch decision.',
    },
    {
      question: 'Does Aakash have biology-only courses?',
      answer:
        "Aakash's primary NEET courses are combined PCB. Biology-only modules at Aakash are typically branded as 'subject-wise' add-ons or test series, not full coaching courses with continuous faculty support. Cerebrum is biology-only as the core product — full pedagogy, faculty continuity, batch structure all built around the biology subject. This is the structural difference behind why students seeking biology-specialist pedagogy choose Cerebrum specifically.",
    },
  ],
  whatsappMessage:
    "Hi! I'm considering Cerebrum vs Aakash for NEET Biology and would like a free 30-minute diagnostic call to compare. Please share available timings.",
}

export default function CerebrumVsAakashNEETBiologyPage() {
  return <CompetitorComparisonLanding config={config} />
}
