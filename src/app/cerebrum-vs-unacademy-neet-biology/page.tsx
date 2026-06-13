import type { Metadata } from 'next'
import {
  CompetitorComparisonLanding,
  type CompetitorComparisonConfig,
} from '@/components/seo/CompetitorComparisonLanding'

export const metadata: Metadata = {
  title: 'Cerebrum vs Unacademy for NEET Biology | Comparison',
  description:
    'Detailed Cerebrum vs Unacademy comparison for NEET Biology specifically. Biology-only AIIMS-trained specialist with 15-20 batches (Cerebrum, ₹40K-₹1.56L) vs subscription platform with 100-500 student live classes (Unacademy Plus, ₹30K-85K). Faculty continuity, biology pedagogy, batch size.',
  keywords: [
    'cerebrum vs unacademy neet biology',
    'unacademy vs cerebrum biology coaching',
    'unacademy plus biology review',
    'cerebrum biology vs unacademy 360',
    'small batch biology vs unacademy batch',
    'best neet biology coaching unacademy vs cerebrum',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cerebrum-vs-unacademy-neet-biology',
  },
  openGraph: {
    title: 'Cerebrum vs Unacademy for NEET Biology | Cerebrum Biology Academy',
    description:
      'Side-by-side comparison of Cerebrum biology-only specialist vs Unacademy Plus subscription model — batch size, faculty continuity, pricing.',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-unacademy-neet-biology',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Cerebrum vs Unacademy for NEET Biology | Comparison',
    description:
      'Detailed Cerebrum vs Unacademy comparison for NEET Biology specifically. Biology-only AIIMS-trained specialist with 15-20 batches (Cerebrum, ₹40K-₹1.56L) vs subscription platform ...',
  },
}

const config: CompetitorComparisonConfig = {
  slug: 'cerebrum-vs-unacademy-neet-biology',
  competitorName: 'Unacademy',
  headline: 'Cerebrum vs Unacademy — NEET Biology Specifically',
  ribbon:
    'Biology-Only AIIMS Specialist (Cerebrum) vs Subscription-Platform Live Classes (Unacademy Plus)',
  subheadline: 'How the two compare for NEET Biology pedagogy, batch size, faculty model, pricing.',
  intro:
    'Unacademy is a subscription-platform-style online learning brand founded by IIT-Roorkee alumni in 2015. Its NEET division (Unacademy Plus and Unacademy Lakshya for NEET) runs combined PCB live classes with 100-500+ students per session. Cerebrum is a biology-only specialist run by Dr. Shekhar C Singh (AIIMS Delhi) with 15-20 student live batches. This comparison focuses specifically on NEET Biology outcomes.',
  table: [
    {
      criterion: 'Subject Focus',
      cerebrum: 'Biology-only specialist — 360 NEET marks / 50% of total',
      competitor: 'Physics + Chemistry + Biology generalist platform',
      cerebrumWins: true,
    },
    {
      criterion: 'Batch Size (Biology Live Class)',
      cerebrum: '15–20 students across all tiers',
      competitor: '100–500+ students per live biology class',
      cerebrumWins: true,
    },
    {
      criterion: 'Lead Biology Faculty',
      cerebrum: 'Dr. Shekhar C Singh — AIIMS Delhi alumnus, 12+ years continuity',
      competitor: 'Multiple rotating educators (no single biology lead)',
      cerebrumWins: true,
    },
    {
      criterion: 'NCERT Line-by-Line Mapping',
      cerebrum: 'Every NCERT bullet cross-referenced to NEET PYQ archive',
      competitor: 'Standard NCERT coverage with platform-style supplementary content',
      cerebrumWins: true,
    },
    {
      criterion: 'Annual Subscription / Fees',
      cerebrum: '₹40,000–₹1,56,000/year (Pursuit through Pinnacle)',
      competitor: '₹30,000–₹85,000/year (Unacademy Plus / Lakshya combined PCB)',
      cerebrumWins: false,
    },
    {
      criterion: '1:1 Doubt Slots with Senior Faculty',
      cerebrum: 'Weekly 1:1 doubt slots in Ascent + Pinnacle tiers',
      competitor: 'Doubt-clearing chat / async support; not 1:1 video',
      cerebrumWins: true,
    },
    {
      criterion: 'Offline Centres',
      cerebrum: '6 Delhi NCR centres + pan-India online live',
      competitor: 'Online-only (some offline acquisition centres post-2022)',
      cerebrumWins: true,
    },
    {
      criterion: 'Live vs Recorded',
      cerebrum: 'Live small-batch (not recorded mass classes)',
      competitor: 'Mix of live classes + recorded library; lecture replay culture',
      cerebrumWins: true,
    },
    {
      criterion: 'Documented Medical Selections',
      cerebrum: '680+ since 2014 (AIIMS / JIPMER / AFMC / state colleges)',
      competitor: 'Platform-scale results; biology-isolated NEET conversion not disclosed',
      cerebrumWins: false,
    },
    {
      criterion: 'Best Pattern',
      cerebrum: 'Standalone biology + Unacademy / Unacademy for PC',
      competitor: 'Affordable PCB subscription for budget-constrained students',
      cerebrumWins: false,
    },
  ],
  whyChooseCerebrum: [
    {
      title: 'Live small-batch vs platform-scale live classes',
      description:
        'Unacademy Plus / Lakshya live classes typically host 100-500+ concurrent students. Faculty cannot identify individual student weakness in real time at that scale. Cerebrum 15-20 student live batches enable the same biology faculty to track chapter-level performance across the year — the structural reason biology score-per-effort is higher at Cerebrum.',
    },
    {
      title: 'Faculty continuity (vs platform educator rotation)',
      description:
        "Unacademy's platform model means biology educators move between batches and topics — students don't get the same faculty for 12 months of continuous pedagogy. Cerebrum's Dr. Shekhar C Singh has led biology since 2014; the same senior faculty teach the same students across Class 11 + Class 12 + dropper years. This faculty-continuity compound effect is structurally impossible at platform scale.",
    },
    {
      title: 'AIIMS-trained pedagogy vs IIT-engineering platform DNA',
      description:
        "Unacademy was founded by IIT-Roorkee alumni; its strongest faculty depth is in physics-engineering subjects (matching its JEE-first DNA). Biology depth on the platform is comparatively weaker. Cerebrum's biology pedagogy is built specifically around the NCERT NEET pattern by an AIIMS Delhi alumnus — structurally different DNA suited to the NEET biology subject.",
    },
  ],
  whenCompetitorMightBeBetter: [
    'You have a constrained annual budget under ₹40K and need full PCB coverage at platform price.',
    'You prefer recorded-class replay pedagogy over live small-batch interaction.',
    'You value the broader Unacademy library and want supplementary content beyond NEET.',
    "You're from a small town where Unacademy's online-only model is your only accessible option.",
  ],
  testimonials: [
    {
      name: 'Aarav Sharma',
      score: 'NEET 690 — Biology 352/360',
      college: 'AIIMS Jodhpur',
      quote:
        'Unacademy Plus biology was useful for revision content. But I needed live small-batch pedagogy for Genetics and Plant Physiology — Cerebrum gave me that with weekly 1:1 doubt slots.',
    },
    {
      name: 'Sneha Patel',
      score: 'NEET 702 — Biology 356/360',
      college: 'AIIMS Bhopal',
      quote:
        'Was paying ₹65K for Unacademy Plus + recorded library. Switched to Cerebrum Ascent ₹78K for biology-only. Total spend went up ₹13K, biology score went up 35 marks.',
    },
    {
      name: 'Karan Iyer',
      score: 'NEET 695 — Biology 354/360',
      college: 'AFMC Pune',
      quote:
        'Best pattern I tried: Unacademy Plus for Physics (cheap, recorded, plenty of question banks) + Cerebrum Ascent for Biology (small batch, AIIMS faculty, NCERT depth). Total ₹95K with structurally better biology.',
    },
  ],
  faqs: [
    {
      question: 'Is Cerebrum better than Unacademy for NEET Biology specifically?',
      answer:
        'For NEET Biology specifically, yes — primarily because of structural pedagogy differences. (1) Subject specialisation: Cerebrum is biology-only with continuous AIIMS-trained faculty (Dr. Shekhar C Singh); Unacademy is a multi-subject platform with rotating educators. (2) Batch size: Cerebrum 15-20 students vs Unacademy 100-500+ in live classes. (3) Faculty continuity: Cerebrum same faculty across 12-24 months vs Unacademy platform-style educator rotation. Unacademy remains the better value for budget-constrained students under ₹40K total annual spend or for students who prefer recorded-replay over live small-batch interaction.',
    },
    {
      question: 'Is Unacademy Plus cheaper than Cerebrum for NEET Biology?',
      answer:
        'Yes, on absolute price. Unacademy Plus NEET subscriptions run ₹30K-₹85K/year covering combined PCB. Cerebrum biology-only Pursuit starts at ₹40K/year (biology only). Like-for-like comparison: Unacademy Plus is roughly 30-50% cheaper for the biology component, but with materially larger batch sizes (100-500+ vs 15-20), no 1:1 doubt slots with senior faculty, and rotating educator faculty rather than continuous specialist pedagogy. The price-quality trade-off depends on what the student needs.',
    },
    {
      question: 'Should I pair Cerebrum biology with Unacademy for Physics + Chemistry?',
      answer:
        'Yes — this is a popular Cerebrum student pattern. Cerebrum biology-only Ascent ₹58K-90K + Unacademy Plus PC subscription ₹20K-40K = total ₹78K-1.3L with materially better biology than combined Unacademy and comparable PC coverage. The alternative pattern is Cerebrum biology + Unacademy PCB ₹10K-20K for tighter cost (₹68K-1.1L total). Both patterns deliver better biology pedagogy than full-Unacademy NEET while staying within reasonable budget.',
    },
    {
      question: 'How does Unacademy live class size compare to Cerebrum for NEET Biology?',
      answer:
        "Unacademy Plus and Lakshya live classes typically host 100-500+ concurrent students in a single biology session. Cerebrum runs 15-20 student live batches across all tiers (Pursuit / Ascent / Pinnacle). At Unacademy batch scale, biology faculty cannot identify individual student weakness in real time — questions are answered in chat queues rather than addressed individually. At Cerebrum batch scale, the same faculty tracks each student's chapter-level performance week-to-week and addresses individual weakness in 1:1 doubt slots.",
    },
    {
      question: 'Does Unacademy have AIIMS-trained NEET biology faculty?',
      answer:
        'Unacademy has multiple senior biology educators across its platform, several of whom have medical or biology specialist backgrounds. However, no single AIIMS-trained faculty lead carries continuous pedagogy responsibility across Class 11 + 12 + dropper years the way Dr. Shekhar C Singh does at Cerebrum. The platform model structurally distributes responsibility across multiple educators; the Cerebrum model concentrates it in single-faculty continuity. Both have value depending on student preference — multi-educator exposure vs single-faculty depth.',
    },
  ],
  whatsappMessage:
    "Hi! I'm considering Cerebrum vs Unacademy for NEET Biology and would like a free 30-minute diagnostic call. Please share available timings.",
}

export default function CerebrumVsUnacademyNEETBiologyPage() {
  return <CompetitorComparisonLanding config={config} />
}
