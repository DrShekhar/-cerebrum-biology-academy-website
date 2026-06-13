import type { Metadata } from 'next'
import {
  CompetitorComparisonLanding,
  type CompetitorComparisonConfig,
} from '@/components/seo/CompetitorComparisonLanding'

export const metadata: Metadata = {
  title: 'Cerebrum vs Aakash Scholastics — NEET Foundation Class 9 & 10',
  description:
    'Cerebrum vs Aakash Scholastics for NEET Foundation Class 9 and Class 10. Biology-only AIIMS-trained specialist with 15-20 student batches (Cerebrum, ₹35K-95K) vs PCB-generalist Foundation with 200-300 student batches (Aakash Scholastics, ₹85K-1.2L). Faculty depth, board parallel, pricing.',
  keywords: [
    'cerebrum vs aakash foundation',
    'aakash scholastics vs cerebrum',
    'aakash foundation review class 9 10',
    'best foundation neet coaching aakash vs cerebrum',
    'foundation class 9 aakash vs cerebrum',
    'foundation class 10 aakash vs cerebrum',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cerebrum-vs-aakash-foundation',
  },
  openGraph: {
    title: 'Cerebrum vs Aakash Scholastics for NEET Foundation | Cerebrum Biology Academy',
    description:
      'Side-by-side comparison of Cerebrum biology-only Foundation vs Aakash Scholastics combined PCB Foundation for Class 9 / Class 10.',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-aakash-foundation',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Cerebrum vs Aakash Scholastics — NEET Foundation Class 9 & 10',
    description:
      'Cerebrum vs Aakash Scholastics for NEET Foundation Class 9 and Class 10. Biology-only AIIMS-trained specialist with 15-20 student batches (Cerebrum, ₹35K-95K) vs PCB-ge...',
  },
}

const config: CompetitorComparisonConfig = {
  slug: 'cerebrum-vs-aakash-foundation',
  competitorName: 'Aakash Scholastics',
  headline: 'Cerebrum vs Aakash Scholastics — NEET Foundation Class 9 & 10',
  ribbon:
    'Biology-Only AIIMS Specialist Foundation (Cerebrum) vs PCB-Generalist Mass Foundation (Aakash Scholastics)',
  subheadline:
    'How the two compare for Class 9 / Class 10 NEET Foundation pedagogy, batch size, board strategy, and long-term outcomes.',
  intro:
    "Aakash Scholastics is Aakash Byju's Foundation programme for Class 8-10 students, with 250+ centres running combined Physics + Chemistry + Biology Foundation. Cerebrum is a biology-only specialist Foundation run by Dr. Shekhar C Singh (AIIMS Delhi). The two operate fundamentally different Foundation pedagogy models — this comparison focuses specifically on Class 9 and Class 10 NEET Foundation outcomes.",
  table: [
    {
      criterion: 'Subject Focus',
      cerebrum: 'Biology-only specialist Foundation',
      competitor: 'Physics + Chemistry + Biology Foundation (generalist)',
      cerebrumWins: true,
    },
    {
      criterion: 'Batch Size (Class 9-10)',
      cerebrum: '15–20 students across all tiers',
      competitor: '150–300+ students per Foundation class',
      cerebrumWins: true,
    },
    {
      criterion: 'Class 9-10 Faculty Level',
      cerebrum: 'AIIMS-trained biology faculty from day one (same as Class 11-12)',
      competitor: 'School-teacher-level Foundation instructors (senior faculty work Class 11-12)',
      cerebrumWins: true,
    },
    {
      criterion: 'CBSE / ICSE Board Strategy',
      cerebrum: 'Separate board-format weekly tests + answer-writing standards',
      competitor: 'NEET-pattern drilling prioritised; boards deprioritised',
      cerebrumWins: true,
    },
    {
      criterion: 'Annual Fees (Class 9 or Class 10)',
      cerebrum: '₹35,000–₹95,000/year (Pursuit through Pinnacle)',
      competitor: '₹85,000–₹1,20,000/year combined PCB Foundation',
      cerebrumWins: true,
    },
    {
      criterion: '1:1 Doubt Slots',
      cerebrum: 'Weekly 1:1 doubt slots in Ascent + Pinnacle tiers',
      competitor: 'Generally not available individually at Foundation batch scale',
      cerebrumWins: true,
    },
    {
      criterion: 'Faculty Continuity Class 9 → 12',
      cerebrum: 'Same faculty (Dr. Shekhar + senior team) across all 4 years',
      competitor: 'Different faculty cohorts for Foundation vs Class 11-12',
      cerebrumWins: true,
    },
    {
      criterion: 'Brand Recall',
      cerebrum: 'Specialist niche brand for Foundation',
      competitor: 'High national brand recall + parent confidence',
      cerebrumWins: false,
    },
    {
      criterion: 'Combined PCB Coverage Under One Roof',
      cerebrum: 'Biology-only — supplement with school + activities for PC',
      competitor: 'Yes — covers Physics + Chemistry + Biology + Maths',
      cerebrumWins: false,
    },
    {
      criterion: 'Centre Network',
      cerebrum: '6 Delhi NCR centres + online live pan-India',
      competitor: '250+ centres across India (broader physical reach)',
      cerebrumWins: false,
    },
  ],
  whyChooseCerebrum: [
    {
      title: 'AIIMS-trained pedagogy from Class 9 onwards (not Class 11)',
      description:
        "At Aakash Scholastics, the senior AIIMS-trained / IIT-trained faculty work Class 11-12 batches. Class 9-10 Foundation is staffed with school-teacher-level instructors. Cerebrum's Class 9-10 Foundation is led by the same AIIMS-trained biology faculty (Dr. Shekhar C Singh and senior team) that teach Class 11-12. Students get medical-school-grade biology pedagogy from age 14 onwards — structural quality difference no generalist Foundation can match.",
    },
    {
      title: '15-20 students vs 200-300 — and it matters more at Class 9-10',
      description:
        "At Class 11-12, batch size is important but students have established study habits. At Class 9-10 (14-15 year olds), small-batch pedagogy is structurally critical — students are still building study habits, need individual encouragement, and benefit from faculty actually knowing their names and weak spots. Mass batches at this age routinely produce demotivation and dropout. Aakash Scholastics' 250-student Foundation batches simply cannot deliver this — Cerebrum's 15-20 student model can.",
    },
    {
      title: 'Board strategy treated seriously (not deprioritised)',
      description:
        'Aakash Scholastics deprioritises Class 10 boards in favour of NEET-only drilling — a strategic mistake because (a) Class 10 board grades affect Class 11 stream selection at many schools, (b) state government medical college quotas reference Class 10 boards, and (c) parental anxiety about boards is a real engagement factor. Cerebrum runs separate board-format weekly tests with examiner-aligned answer-writing standards, and intensifies board prep in Q4 of Class 10. Most Cerebrum Foundation students score 90%+ in CBSE / ICSE Class 10 boards.',
    },
    {
      title: 'Faculty continuity Class 9 → 10 → 11 → 12',
      description:
        "At Aakash Scholastics, students move from Foundation faculty (Class 9-10) to Class 11-12 faculty — different teachers, different pedagogy style, different relationships. Cerebrum's continuity around Dr. Shekhar C Singh and senior team means the same AIIMS-trained faculty teach the same students across all 4 years (Class 9 → Class 12 dropper). This compounding effect is structurally impossible at generalist Foundation scale.",
    },
  ],
  whenCompetitorMightBeBetter: [
    'You want combined PCB (Physics + Chemistry + Biology + Maths) Foundation coverage under one brand with ₹85K-1.2L annual budget.',
    'Your child specifically wants the Aakash Scholastics test series infrastructure and rank disclosure for early competitive exposure.',
    'You live in a Tier 2 / Tier 3 city where Aakash has a physical Foundation centre and online learning is impractical for your family.',
    "You're targeting JEE / Foundation Olympiads + NEET together (not pure NEET pathway), where Aakash Scholastics' broader subject coverage is valuable.",
  ],
  testimonials: [
    {
      name: 'Aanya Sharma (now Class 12)',
      score: 'Predicted NEET 700+ · Class 10 CBSE 96%',
      college: 'AIIMS Delhi target',
      quote:
        'Started Aakash Scholastics in Class 9 — 280-student batch, school-teacher-level instructor. Switched to Cerebrum Foundation in Class 10 — 18-student batch, AIIMS-trained faculty. Different outcome already by Class 11.',
    },
    {
      name: 'Rohan Mehra (now Class 11)',
      score: 'Class 10 CBSE: 97% Biology',
      college: 'Target: AIIMS Bhopal',
      quote:
        'Aakash Scholastics deprioritised Class 10 boards — said NEET MCQ format was all that mattered. School warned me I was at risk in boards. Switched to Cerebrum Foundation 6 months before Class 10 finals — 97% biology in boards AND Class 11 NEET-ready.',
    },
    {
      name: "Diya Patel's mother",
      score: 'Class 9 → 10 transition, year 2',
      college: 'AIIMS pathway',
      quote:
        'Started Aakash Scholastics Class 9 — Diya was lost in the 250-student batch by month 3. Faculty rotated, no individual attention. Cerebrum Foundation Ascent has 18 students and the same Dr. Shekhar team for 2 years now. Faculty knows her name, knows her weak spots.',
    },
  ],
  faqs: [
    {
      question:
        'Is Cerebrum better than Aakash Scholastics for Class 9 / Class 10 NEET Foundation?',
      answer:
        'For NEET Biology pedagogy specifically, yes — three structural reasons. (1) Faculty: Cerebrum has AIIMS-trained biology faculty (Dr. Shekhar C Singh and senior team) teaching Class 9-10 directly; Aakash Scholastics uses school-teacher-level Foundation instructors. (2) Batch size: Cerebrum 15-20 students vs Aakash 200-300+. (3) Board strategy: Cerebrum runs separate board-format weekly tests with examiner standards; Aakash deprioritises boards. Aakash Scholastics remains the better fit for families wanting combined PCB Foundation under one brand at scale.',
    },
    {
      question: 'How do Aakash Scholastics and Cerebrum Foundation compare on price?',
      answer:
        'Aakash Scholastics combined PCB Foundation runs ₹85,000-₹1,20,000/year for Class 9 or Class 10. Cerebrum biology-only Foundation runs ₹35,000-₹95,000/year across three tiers. The Cerebrum Ascent tier (₹55K-75K, pro batch 16-25 with weekly 1:1 doubt slots) offers materially deeper biology pedagogy than the equivalent Aakash Scholastics Foundation tier at 30-40% lower price — but Aakash includes Physics, Chemistry, and Maths in its Foundation fee while Cerebrum is biology-only. Total comparable budget if pairing Cerebrum biology with separate PC tuition: ₹75K-1L vs Aakash ₹85K-1.2L.',
    },
    {
      question:
        'Does Aakash Scholastics prepare students adequately for Class 10 CBSE / ICSE boards?',
      answer:
        "Aakash Scholastics prioritises NEET-pattern MCQ drilling over board format preparation — a strategic choice based on the assumption that NEET is the only outcome that matters. This deprioritisation produces underprepared students for board exam answer-writing format, diagram standards, and time management. Schools commonly note that Aakash Scholastics Class 10 students enter board exams over-trained in MCQ and underprepared for descriptive answers. Cerebrum's Class 10 Foundation runs both formats in parallel — separate weekly tests in board format and NEET MCQ format, with board prep intensified in Q4.",
    },
    {
      question: 'Can I switch from Aakash Scholastics to Cerebrum Foundation mid-year?',
      answer:
        "Yes. Cerebrum runs rolling-admission Foundation batches with quarterly start cohorts (April, July, October, January). The most common mid-year switch is from large Aakash Scholastics 250-student Foundation batches when parents realise their child isn't getting individual attention. Switch decisions are best made by October of Class 9 or Class 10 to allow full curriculum re-pacing. Mid-year switches require a 30-minute diagnostic call to calibrate the student to the Cerebrum cohort baseline. WhatsApp +91 88264-44334 to book.",
    },
    {
      question: 'Should I pair Cerebrum Biology Foundation with Aakash Scholastics PC Foundation?',
      answer:
        'This is a viable hybrid pattern for families wanting AIIMS-trained biology AND combined PC under a national brand. Pricing: Cerebrum Ascent biology Foundation ₹65K + Aakash Scholastics PC modules ₹50K-70K = total ₹1.15L-1.35L — comparable to Aakash Scholastics full PCB ₹85K-1.2L but with materially better biology pedagogy. Pattern is popular for serious AIIMS-trajectory families in Delhi NCR and Tier 1 metros. Schedule coordination matters — both schedules need to fit around school + activities. WhatsApp +91 88264-44334 to discuss hybrid scheduling.',
    },
  ],
  whatsappMessage:
    "Hi! I'm considering Cerebrum vs Aakash Scholastics for my child's Class 9 / Class 10 NEET Foundation. Please share a free 30-minute diagnostic call to discuss.",
}

export default function CerebrumVsAakashFoundationPage() {
  return <CompetitorComparisonLanding config={config} />
}
