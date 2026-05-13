import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Biology Tutor for NEET | 1:1 AIIMS Faculty | Cerebrum Biology Academy',
  description:
    'Biology tutor for NEET — Dr. Shekhar C Singh (AIIMS Delhi) and senior faculty. 1:1 personalised mentoring with NCERT mastery, weekly mocks, doubt resolution. 680+ medical college selections, 98% NEET-UG qualification rate. Book a free demo.',
  keywords: [
    'biology tutor for neet',
    'best biology tutor for neet',
    'neet biology tutor',
    'biology tutor neet preparation',
    'biology home tutor neet',
    'biology private tutor neet',
    'biology tutor neet 1 on 1',
    'biology tutor for class 11 neet',
    'biology tutor for class 12 neet',
    'biology tutor neet droppers',
    'aiims biology tutor neet',
    'biology tutor near me neet',
  ],
  openGraph: {
    title: 'Biology Tutor for NEET | 1:1 AIIMS Faculty',
    description:
      '1:1 personalised biology tutoring for NEET. Dr. Shekhar Singh (AIIMS) + senior faculty. 680+ medical college selections.',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-for-neet',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-for-neet',
  },
}

const config: BestVerticalConfig = {
  slug: 'biology-tutor-for-neet',
  headline: 'Biology Tutor for NEET',
  ribbon: '1:1 AIIMS Faculty · 680+ Medical College Selections · 98% NEET Qualification',
  subheadline:
    'Personalised 1:1 mentoring with Dr. Shekhar C Singh (AIIMS Delhi) and senior NEET faculty.',
  intro:
    "A biology tutor for NEET is different from a classroom teacher — bespoke pacing, focused weak-topic drills, custom mock-test review, and direct mentor access. Cerebrum's 1:1 NEET biology tutoring is anchored to NCERT (95% of NEET Biology questions) and shaped to each student's exact gap profile.",
  clusterSummary:
    '15+ years of NEET pedagogy · 680+ AIIMS / JIPMER / AFMC selections · 360/720 NEET marks come from Biology — a biology-only tutor compounds.',
  credentials: [
    { label: 'AIIMS-Trained Tutor' },
    { label: '1:1 Personalised Mentoring' },
    { label: 'NCERT-First Approach' },
    { label: '15+ Years NEET Pedagogy' },
    { label: '680+ Selections' },
    { label: 'Weekly Mock Review' },
    { label: 'WhatsApp Doubt Support' },
    { label: 'English / Hindi Sessions' },
  ],
  pages: [
    { title: 'NEET Coaching — Main Hub', href: '/neet-coaching', note: 'All NEET programmes' },
    { title: 'Best Biology Teacher for NEET', href: '/best-biology-teacher-for-neet' },
    { title: 'Best NEET Biology Coaching India', href: '/best-neet-biology-coaching-india' },
    { title: 'Best NEET Biology Tutor (Delhi NCR)', href: '/best-neet-biology-tutor-delhi-ncr' },
    { title: 'NEET Biology Coaching Online', href: '/online-neet-biology-coaching' },
    { title: 'Biology Tutor for Droppers', href: '/neet-biology-tutor-for-droppers' },
    { title: '1:1 Biology Tuition (NEET)', href: '/1-on-1-biology-tuition-neet' },
    { title: 'Biology Tutor Class 11 (NEET Foundation)', href: '/best-biology-tutor-class-11' },
    { title: 'Biology Tutor Class 12 (Board + NEET)', href: '/best-biology-tutor-class-12' },
    {
      title: 'Dr. Shekhar Singh — Faculty Profile',
      href: '/dr-shekhar-singh-neet-biology-faculty',
    },
  ],
  pricing: [
    {
      tier: 'Pinnacle 1:1 (Premium)',
      price: '₹1,20,000–₹1,56,000 / year',
      description:
        'Direct mentoring with Dr. Shekhar Singh. 10–12 student micro-batches + 1:1 sessions. Best for AIIMS / Top medical college aspirants.',
    },
    {
      tier: 'Ascent (Small Batch)',
      price: '₹58,000–₹90,000 / year',
      description:
        '16–25 student batches with weekly 1:1 doubt slots. Most popular tier. Strong fit for serious NEET aspirants.',
    },
    {
      tier: 'Ad-hoc 1:1 Tutoring',
      price: 'Hourly pricing (on request)',
      description:
        'Targeted gap-fill — Physiology, Genetics, Plant Bio, Biotech. For students already enrolled elsewhere needing biology-specialist support.',
    },
  ],
  whyBest: [
    {
      title: 'Why a "Tutor" Beats a "Teacher" for NEET',
      description:
        'A NEET biology teacher delivers structured curriculum to 15–20 students at a time. A tutor adapts to YOUR weak topics, YOUR pacing, YOUR mock scores. Both work; a tutor accelerates score-jumps from 250 → 350+ in months, not years. Cerebrum offers both — pick by learning style and budget.',
    },
    {
      title: 'NCERT Mastery (95% of NEET Biology)',
      description:
        "95% of NEET Biology questions come from NCERT Class 11–12. Generalist tutors miss this; Cerebrum's tutoring is anchored to NCERT line-by-line, supplemented with previous-year-question (PYQ) drilling from 15+ years of NEET archives.",
    },
    {
      title: 'AIIMS Clinical Correlations',
      description:
        'Dr. Shekhar Singh studied at AIIMS New Delhi. Clinical correlations in Human Physiology, Genetics and Biotechnology make difficult chapters memorable — something textbook-only tutors cannot replicate.',
    },
    {
      title: 'Biology-Only Specialisation',
      description:
        'Most NEET tutors split time across Physics, Chemistry and Biology. Cerebrum tutors teach only Biology — across Class 11, Class 12, NEET, IB, AP, MCAT and Olympiads. Same biology pedagogy compounds across verticals.',
    },
    {
      title: 'Weekly Mock Review + Score-Jump Mapping',
      description:
        'Each weekly mock test is reviewed 1:1: which chapters lost marks, which questions were silly, which topics need re-drilling. Score-jump targets are set per fortnight, tracked across the term.',
    },
    {
      title: 'WhatsApp Doubt Support (Same-Day)',
      description:
        'Doubts answered on WhatsApp same-day during the academic year. No 48-hour wait for "doubt portal" responses common at large coaching chains.',
    },
  ],
  testimonials: [
    {
      name: 'Ishita Malhotra',
      score: 'NEET 702/720',
      college: 'AIIMS Delhi',
      quote:
        "Dr. Singh\'s 1:1 way of teaching physiology made it my strongest subject. His clinical examples are unforgettable.",
    },
    {
      name: 'Rohan Khanna',
      score: 'NEET 688/720',
      college: 'MAMC Delhi',
      quote:
        'The personal attention I received as a 1:1 tutee helped me improve from 520 in mock to 688 in actual NEET.',
    },
    {
      name: 'Kavya Reddy',
      score: 'NEET 679/720',
      college: 'AIIMS Jodhpur',
      quote:
        'As a dropper, I needed personalized guidance. My tutor identified exactly where I was going wrong.',
    },
  ],
  faqs: [
    {
      question: 'Who is the best biology tutor for NEET?',
      answer:
        'Dr. Shekhar C Singh (AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy) is widely cited as the best biology tutor for NEET. Track record: 680+ medical college selections (AIIMS, JIPMER, AFMC, state colleges), 98% NEET-UG qualification rate, 15+ years of biology pedagogy. 1:1 mentoring available in the Pinnacle tier with senior faculty support across Ascent and Pursuit tiers.',
    },
    {
      question: "What's the difference between a biology tutor and a biology teacher for NEET?",
      answer:
        '"Biology teacher" refers to classroom or online live-class instruction at scale — structured curriculum, batches of 15–20, weekly doubt sessions. "Biology tutor" means 1:1 personalised mentoring — bespoke pacing, focused weak-topic drills, custom mock review. At Cerebrum, both pathways use the same AIIMS-trained faculty. Choose tutor for individual attention; choose teacher for cohort dynamics. Most serious NEET aspirants benefit from a small-batch teacher + ad-hoc 1:1 tutor.',
    },
    {
      question: 'How much does a NEET biology tutor cost?',
      answer:
        'At Cerebrum: Pinnacle (1:1 + 10–12 batch) ₹1,20,000–₹1,56,000/year; Ascent (16–25 batch + weekly 1:1) ₹58,000–₹90,000/year; Pursuit (small group) ₹40,000–₹75,000/year. Ad-hoc 1:1 tutoring is priced hourly. EMI options available. Most home biology tutors in Delhi NCR charge ₹2,500–₹3,500/hour with no curriculum or mock structure — Cerebrum delivers more for less.',
    },
    {
      question:
        "Can a biology tutor help if I'm already enrolled at Allen / Aakash / PhysicsWallah?",
      answer:
        'Yes — many serious NEET aspirants take a Cerebrum biology tutor alongside their main coaching at Allen, Aakash or PhysicsWallah. Big chains rotate biology faculty and pack 100+ students per batch; a 1:1 Cerebrum tutor fills gaps in Physiology, Genetics, Plant Biology and Biotechnology. Common pattern: students keep their main coaching for Physics/Chemistry and add Cerebrum for Biology.',
    },
    {
      question: 'Is online biology tutoring as effective as in-person for NEET?',
      answer:
        "Yes. Cerebrum's online 1:1 sessions are live (not recorded) with the same faculty as offline. Whiteboard-style teaching, real-time doubt resolution, recorded sessions for revision. Many top NEET scorers chose the online format, including students who switched from Kota.",
    },
    {
      question: 'Do you tutor in Hindi as well as English?',
      answer:
        'Yes. NEET aspirants come from across India, including Hindi-medium schools. Cerebrum tutors run sessions in both English and Hindi based on student preference. Bilingual whiteboards and NCERT alignment in both languages.',
    },
    {
      question: 'When should I start with a biology tutor for NEET?',
      answer:
        'Ideal: Class 11 onset (April–May) for full 2-year Foundation. Realistic: any time before NEET — even 4–6 month focused tutoring can lift scores by 80–140 marks if pedagogy is right. Droppers should start within 30 days of NEET result for a structured 12-month dropper batch + 1:1 mentoring.',
    },
  ],
  knowsAbout: [
    'NEET-UG Biology',
    'NCERT Class 11 Biology',
    'NCERT Class 12 Biology',
    'NEET Question Pattern',
    '1:1 NEET Tutoring',
    'Human Physiology',
    'Genetics and Evolution',
    'Plant Physiology',
    'Cell Biology',
    'Biotechnology',
    'NEET PYQ Analysis',
    'AIIMS Selection',
    'NEET Dropper Coaching',
  ],
  whatsappMessage:
    'Hi! I want a 1:1 biology tutor for NEET. Please share Pinnacle / Ascent details and available timings.',
}

export default function BiologyTutorForNEETPage() {
  return <BestVerticalLanding config={config} />
}
