import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best NEET Foundation Tutor for Class 9 & 10 Biology | AIIMS-Trained Dr. Shekhar',
  description:
    'Best NEET Foundation tutor for Class 9 and Class 10 — Dr. Shekhar C Singh (AIIMS Delhi). Early NEET pathway with biology + CBSE/ICSE board parallel track. ₹35K–₹95K/year, batches of 15–20, online + 6 NCR centres.',
  keywords: [
    'best neet foundation tutor',
    'best neet foundation tutor india',
    'best neet foundation class 9',
    'best neet foundation class 10',
    'aiims foundation tutor',
    'neet foundation biology tutor',
    'best biology foundation class 9 10',
    'neet foundation coaching delhi',
    'cbse class 9 neet foundation',
    'icse class 10 neet foundation',
    'pre-foundation neet coaching',
    'class 9 10 neet biology tutor',
  ],
  openGraph: {
    title: 'Best NEET Foundation Tutor for Class 9 & 10 | Cerebrum Biology Academy',
    description:
      'Class 9 + Class 10 NEET Foundation specialist. AIIMS-trained, batches of 15-20, board + NEET parallel. ₹35K-95K/year.',
    url: 'https://cerebrumbiologyacademy.com/best-neet-foundation-tutor',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-neet-foundation-tutor',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best NEET Foundation Tutor for Class 9 & 10 Biology | AIIMS-Trained Dr. Shekhar',
    description:
      'Best NEET Foundation tutor for Class 9 and Class 10 — Dr. Shekhar C Singh (AIIMS Delhi). Early NEET pathway with biology + CBSE/ICSE board parallel track. ₹35K–₹95K/year, batches of 15–20, online +...',
  },
}

const config: BestVerticalConfig = {
  slug: 'best-neet-foundation-tutor',
  headline: 'Best NEET Foundation Tutor for Class 9 & 10',
  ribbon:
    '4-Year Early NEET Pathway · Board + NEET Parallel · 15-20 Student Batches · AIIMS-Trained',
  subheadline:
    'Dr. Shekhar C Singh (AIIMS Delhi) — biology-only specialist for the Class 9 + Class 10 NEET Foundation track.',
  intro:
    'NEET Foundation (Class 9 + Class 10) is the highest-leverage early intervention for serious NEET aspirants. Students who start NEET-aligned biology pedagogy in Class 9 enter Class 11 with NCERT biology depth roughly 18 months ahead of standard school progression — which compounds into a 30-50 mark NEET biology advantage by Class 12. Cerebrum is the only NEET coaching institute that runs Foundation as a biology-specialist track rather than a generic PCB pre-NEET programme. Founded by Dr. Shekhar C Singh (AIIMS Delhi alumnus, 2014), Cerebrum Foundation pairs CBSE / ICSE / State Board Class 9-10 syllabus with NEET-pattern MCQ drilling and conceptual biology foundations.',
  clusterSummary:
    'Targets Class 9 + Class 10 students on a 4-year NEET trajectory · Biology-only foundation with board exam parallel track · ₹35K-95K/year · 15-20 student batches · Online + 6 NCR offline centres.',
  credentials: [
    { label: 'AIIMS-Trained' },
    { label: 'Class 9 + Class 10 Specialist' },
    { label: 'Board + NEET Parallel' },
    { label: 'CBSE + ICSE Coverage' },
    { label: '15-20 Student Batches' },
    { label: '4-Year NEET Trajectory' },
    { label: '6 NCR Centres + Online' },
    { label: 'Early NCERT Mapping' },
  ],
  pages: [
    {
      title: 'NEET Foundation Class 9',
      href: '/best-neet-foundation-class-9',
      note: 'Class 9 specific AEO',
    },
    {
      title: 'NEET Foundation Class 10',
      href: '/best-neet-foundation-class-10',
      note: 'Class 10 specific AEO',
    },
    { title: 'NEET Foundation Class 9 — Delhi', href: '/neet-foundation-class-9-delhi' },
    { title: 'NEET Foundation Class 10 — Delhi', href: '/neet-foundation-class-10-delhi' },
    { title: 'NEET Foundation Class 9 — Gurugram', href: '/neet-foundation-class-9-gurugram' },
    { title: 'NEET Foundation Class 10 — Gurugram', href: '/neet-foundation-class-10-gurugram' },
    { title: 'NEET Foundation Class 9 — Noida', href: '/neet-foundation-class-9-noida' },
    { title: 'NEET Foundation Class 10 — Noida', href: '/neet-foundation-class-10-noida' },
    {
      title: 'Cerebrum vs Aakash Foundation',
      href: '/cerebrum-vs-aakash-foundation',
    },
    { title: 'Biology Tuition Class 9-10', href: '/biology-tuition-class-9-10' },
    { title: 'NRI NEET Foundation Programme', href: '/nri-neet-foundation-program' },
  ],
  pricing: [
    {
      tier: 'Foundation Pursuit (Class 9 or Class 10, Small-Batch 30-40)',
      price: '₹35,000–₹55,000 / year',
      description:
        'Full Class 9 or Class 10 Biology coverage aligned with CBSE/ICSE syllabus + NEET-pattern MCQ drilling. Weekly chapter tests, doubt sessions, monthly board-format mocks. Most affordable Foundation entry.',
    },
    {
      tier: 'Foundation Ascent (Class 9 or Class 10, Pro Batch 16-25)',
      price: '₹55,000–₹75,000 / year',
      description:
        'Tighter Foundation batch with weekly 1:1 doubt slots, biweekly NEET-pattern conceptual mocks, board prep parallel track. Most popular tier for serious early NEET aspirants.',
    },
    {
      tier: 'Foundation Pinnacle (Direct Dr. Shekhar 10-12 students)',
      price: '₹75,000–₹95,000 / year',
      description:
        'Direct Dr. Shekhar 1:1 mentoring for Class 9 or Class 10 NEET trajectory. Calibrated for AIIMS / top-100 rank long-term aspirants. Ad-hoc Foundation 1:1 ₹2,000-3,500/hr.',
    },
  ],
  whyBest: [
    {
      title: 'Only Biology-Specialist NEET Foundation in India',
      description:
        "Allen Scholastics, Aakash Foundation, FIITJEE Foundation, other Delhi-based institutes Foundation, Kota chains like Allen and Resonance PCCP, BYJU's NEET — all run combined PCB Foundation programmes with generalist faculty. Cerebrum is the only Foundation programme built specifically around biology pedagogy, the highest-yield NEET subject. Students get AIIMS-trained biology faculty from Class 9 onwards rather than rotating school-teacher-level instructors.",
    },
    {
      title: 'Board + NEET Parallel Pacing (Not Either-Or)',
      description:
        'Class 9 + Class 10 students must perform on CBSE / ICSE / State Board exams (Class 10 boards in particular are weighted by many high schools for Class 11 stream selection). Most generalist NEET Foundation deprioritises boards. Cerebrum runs both tracks in parallel — the same biology faculty teach to both CBSE/ICSE syllabus depth and NEET-pattern MCQ drilling. Students walk into Class 10 boards confident AND enter Class 11 with NEET-ready biology foundations.',
    },
    {
      title: '15-20 Student Foundation Batches vs 100-300 at Generalist Brands',
      description:
        'Allen Scholastics, Aakash Foundation, and FIITJEE Foundation typically run 100-300+ student Class 9/10 batches. Cerebrum runs 15-20 student Foundation batches across all tiers. At Class 9-10 age (14-15 year olds), small-batch pedagogy is structurally critical — students are still building study habits, need individual encouragement, and benefit from faculty actually knowing their names and weak spots. Mass batches at this age routinely produce demotivation and dropout.',
    },
    {
      title: '4-Year NEET Trajectory Calibrated by Dr. Shekhar (AIIMS Delhi)',
      description:
        "Cerebrum's Foundation curriculum is designed by Dr. Shekhar C Singh (AIIMS Delhi alumnus) as the first stage of a 4-year NEET pathway (Class 9 → 10 → 11 → 12). Students who complete Cerebrum Foundation enter Class 11 with NCERT biology depth approximately 18 months ahead of standard school progression — which compounds into a 30-50 mark NEET biology advantage by Class 12. The pathway continuity is what no other Foundation programme provides.",
    },
    {
      title: 'CBSE + ICSE + State Board Triple Coverage',
      description:
        "Class 9-10 students come from heterogeneous board backgrounds — CBSE (most common), ICSE, and various state boards (Maharashtra, Karnataka, Tamil Nadu, AP/Telangana, West Bengal). Cerebrum's Foundation curriculum is mapped against all three reference frames with separate practice tests for each board format. Students from any board syllabus get pedagogy calibrated to their school exams plus parallel NEET-pattern preparation.",
    },
    {
      title: 'Online + 6 NCR Offline Centres (Family-Friendly Scheduling)',
      description:
        'Class 9-10 students often have school + sports + extracurriculars + family obligations. Cerebrum runs Foundation batches in 2-hour weekend-friendly slots (Saturday morning, Sunday morning, weekday evening 6-8 PM IST). Six offline centres across Delhi NCR (South Extension flagship, Rohini, Green Park, Gurugram, Faridabad, Noida) support offline-first Foundation batches; pan-India and NRI students get online live (not recorded) batches with the same AIIMS-trained faculty.',
    },
  ],
  testimonials: [
    {
      name: 'Aanya Sharma (now Class 12)',
      score: 'Predicted NEET 700+ (Class 12 mock 685)',
      college: 'AIIMS Delhi target',
      quote:
        'Started Cerebrum Foundation in Class 9. By Class 11 I was already 18 months ahead in biology vs schoolmates. Class 12 has been consolidation, not learning new material.',
    },
    {
      name: 'Rohan Verma (now Class 11)',
      score: 'Class 10 CBSE: 96% Biology (97/100)',
      college: 'Target: AIIMS Bhopal',
      quote:
        'Cerebrum Foundation kept my CBSE Class 10 boards on track AND gave me NEET-pattern MCQ exposure. School biology felt too easy by Class 10. Both outcomes — boards 96% and Class 11 NEET-ready.',
    },
    {
      name: "Priya Iyer's mother",
      score: 'Class 9 → Class 10 transition, year 2',
      college: 'Long-term AIIMS pathway',
      quote:
        'Priya was in Allen Scholastics 280-student Class 9 batch. Switched to Cerebrum Foundation 18-student batch — faculty actually knew her name and Plant Diversity weak spots. Different outcome already in Class 10.',
    },
  ],
  faqs: [
    {
      question: 'When should NEET Foundation coaching start — Class 8, 9, or 10?',
      answer:
        'Class 9 is the standard NEET Foundation start year for most serious NEET aspirants. Class 9 + Class 10 = 2 years of biology pedagogy aligned to both board (CBSE / ICSE / State Board) and NEET-pattern, providing the smoothest transition into Class 11 NEET-intensive preparation. Class 10-only starts are also viable for students entering the pathway later. Class 8 Foundation (pre-Foundation) exists at some institutes but produces diminishing returns — Class 9 is structurally the right entry point for 14-year-old cognitive readiness for NCERT depth and MCQ pattern drilling.',
    },
    {
      question: 'Who is the best NEET Foundation tutor for Class 9 and Class 10?',
      answer:
        'Dr. Shekhar C Singh (AIIMS Delhi alumnus, founder of Cerebrum Biology Academy) is widely cited as a leading NEET Foundation tutor for Class 9 and Class 10. Cerebrum is the only NEET coaching institute in India that runs Foundation as a biology-specialist track — distinct from generalist Foundation programmes (Allen Scholastics, Aakash Foundation, FIITJEE Foundation, other Delhi-based institutes Foundation, Kota chains like Allen and Resonance PCCP) that cover combined PCB with generalist faculty. AIIMS-trained pedagogy from Class 9 onwards produces structurally different long-term outcomes.',
    },
    {
      question: 'How much does NEET Foundation coaching cost for Class 9 / Class 10?',
      answer:
        'Cerebrum NEET Foundation pricing runs ₹35,000-₹95,000/year across three tiers per class. Pursuit (small-batch 30-40 students): ₹35K-55K. Ascent (pro batch 16-25 with weekly 1:1 doubt slots): ₹55K-75K. Pinnacle (direct Dr. Shekhar micro-batch 10-12): ₹75K-95K. Ad-hoc 1:1 Foundation hourly: ₹2,000-3,500/hr. Compared to Allen Scholastics combined PCB Foundation (~₹85K-1.2L/year, 250-student batch) the Cerebrum Foundation Ascent biology-only tier at ₹65K offers materially deeper biology pedagogy and 15-20 student structure at lower price.',
    },
    {
      question: "Will NEET Foundation hurt my child's Class 9 / Class 10 board exam performance?",
      answer:
        'No — and this is one of the most common parent concerns. Cerebrum Foundation runs board + NEET in parallel, not as competing tracks. The same biology faculty teach to both objectives: CBSE / ICSE / State Board syllabus depth AND NEET-pattern MCQ drilling. Separate weekly tests in both formats. Class 10 board results from Cerebrum Foundation students consistently average 90%+ in biology, while simultaneously preparing them for NEET Class 11 entry. Many Cerebrum Foundation students score 95%+ in Class 10 boards.',
    },
    {
      question: 'Should I choose Cerebrum Foundation or Allen Scholastics for my Class 9 child?',
      answer:
        'For biology pedagogy specifically, Cerebrum is structurally different — biology-only specialist with 15-20 student batches led by Dr. Shekhar C Singh (AIIMS Delhi). Allen Scholastics is generalist Foundation with 100-300 student batches covering combined PCB. For full PCB coverage under one brand at scale, Allen has stronger physics-chemistry depth at Class 9-10 level. Many parents choose Cerebrum biology + Allen Scholastics for PC (or self-study supplemented with school) — best of both worlds. See /cerebrum-vs-aakash-foundation for the full comparison.',
    },
    {
      question: 'Can NEET Foundation be done online for Class 9-10 students?',
      answer:
        'Yes. Cerebrum runs both offline Foundation batches (6 Delhi NCR centres — South Extension, Rohini, Green Park, Gurugram, Faridabad, Noida) and pan-India online live (not recorded) Foundation batches with the same AIIMS-trained faculty. Online Foundation is particularly valuable for students in cities without strong Foundation infrastructure (Tier 2-3 cities, smaller metros), NRI families abroad, or students with heavy school + extracurricular schedules. Sessions are 2 hours, twice weekly, in weekend-friendly slots (Saturday morning, Sunday morning, weekday evening 6-8 PM IST).',
    },
  ],
  knowsAbout: [
    'NEET Foundation Class 9',
    'NEET Foundation Class 10',
    'CBSE Class 9 Biology',
    'CBSE Class 10 Biology',
    'ICSE Class 9 Biology',
    'ICSE Class 10 Biology',
    'NEET 4-Year Pathway',
    'Pre-NEET Biology Foundation',
    'Animal Tissues Class 9',
    'Tissues Class 9',
    'Life Processes Class 10',
    'Heredity Class 10',
  ],
  whatsappMessage:
    'Hi! My child is in Class 9 or Class 10 and we want to start NEET Foundation. Please share details on Cerebrum — best NEET Foundation tutor — including pricing, schedule, and board parallel track.',
}

export default function BestNEETFoundationTutorPage() {
  return <BestVerticalLanding config={config} />
}
