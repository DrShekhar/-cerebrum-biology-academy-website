import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Biology Classes for NEET | Small-Batch AIIMS Faculty | Cerebrum',
  description:
    'Biology classes for NEET — small-batch (15–20 students) live classroom instruction by AIIMS-trained faculty. Dr. Shekhar C Singh + senior team. NCERT-anchored, PYQ-driven, weekly mocks. 680+ medical college selections, 98% NEET qualification rate.',
  keywords: [
    'biology classes for neet',
    'best biology classes for neet',
    'neet biology classes',
    'biology classes neet preparation',
    'small batch biology classes for neet',
    'neet biology coaching classes',
    'live biology classes for neet',
    'biology classes near me neet',
    'biology classes for class 11 neet',
    'biology classes for class 12 neet',
    'biology classes for neet droppers',
    'online biology classes for neet',
  ],
  openGraph: {
    title: 'Biology Classes for NEET | Small-Batch AIIMS Faculty',
    description:
      'Small-batch (15–20) live biology classes for NEET. AIIMS faculty. 98% qualification rate.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-for-neet',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-for-neet',
  },
}

const config: BestVerticalConfig = {
  slug: 'biology-classes-for-neet',
  headline: 'Biology Classes for NEET',
  ribbon: 'Small-Batch (15–20) · Live Classroom + Online · AIIMS Faculty',
  subheadline:
    'Structured curriculum, cohort dynamics, weekly mocks. Led by Dr. Shekhar C Singh (AIIMS Delhi).',
  intro:
    'Biology classes for NEET differ from 1:1 tutoring — structured curriculum at scale, peer learning, weekly group mocks, mock-test rankings, and cohort accountability. Cerebrum caps batches at 15–20 students (vs 50–100+ at Allen, Aakash, PhysicsWallah) — close enough for personal attention, large enough for healthy competition.',
  clusterSummary:
    'Offline at 6 Delhi NCR centres · Online live (not recorded) pan-India · English + Hindi · NCERT-anchored, PYQ-driven.',
  credentials: [
    { label: 'Small Batch 15–20' },
    { label: 'AIIMS-Trained Faculty' },
    { label: 'NCERT-First' },
    { label: '15+ Years PYQ Archive' },
    { label: 'Weekly Mocks' },
    { label: '6 Delhi NCR Centres' },
    { label: 'Pan-India Online Live' },
    { label: 'English / Hindi Tracks' },
  ],
  pages: [
    { title: 'NEET Coaching — Main Hub', href: '/neet-coaching', note: 'All NEET programmes' },
    { title: 'Best NEET Biology Coaching India', href: '/best-neet-biology-coaching-india' },
    { title: 'Best Biology Teacher for NEET', href: '/best-biology-teacher-for-neet' },
    { title: 'NEET Biology Classes (Generic Hub)', href: '/neet-biology-classes' },
    { title: 'Online NEET Biology Coaching', href: '/online-neet-biology-coaching' },
    { title: 'NEET Coaching Delhi', href: '/neet-coaching-delhi' },
    { title: 'NEET Coaching Gurugram', href: '/neet-coaching-gurugram' },
    { title: 'NEET Coaching Noida', href: '/neet-coaching-noida' },
    { title: 'NEET Coaching Faridabad', href: '/neet-coaching-faridabad' },
    { title: 'NEET Coaching Mumbai', href: '/neet-coaching-mumbai' },
    { title: 'NEET Coaching Bangalore', href: '/neet-coaching-bangalore' },
    { title: 'NEET Coaching Hyderabad', href: '/neet-coaching-hyderabad' },
  ],
  pricing: [
    {
      tier: 'Pursuit (Affordable Small Group)',
      price: '₹40,000–₹75,000 / year',
      description:
        '30–40 student batches taught by AIIMS / IIT-trained faculty. Quality at affordable price. Bi-weekly group doubt sessions.',
    },
    {
      tier: 'Ascent (Most Popular)',
      price: '₹58,000–₹90,000 / year',
      description:
        '16–25 student batches. Weekly doubt sessions, standard mock-test series, structured NCERT-first curriculum.',
    },
    {
      tier: 'Pinnacle (Premium 1:1)',
      price: '₹1,20,000–₹1,56,000 / year',
      description:
        '10–12 student micro-batches + personal mentorship from Dr. Shekhar Singh. Best for AIIMS / Top medical college aspirants.',
    },
  ],
  whyBest: [
    {
      title: 'Why Small-Batch Biology Classes Beat 200+ Lecture Halls',
      description:
        "Allen, Aakash and PhysicsWallah typically run batches of 100–400 students per teacher. At those sizes individual attention is impossible — students become invisible. Cerebrum caps batches at 15–20 (Ascent) or 10–12 (Pinnacle). Every student's doubt gets answered every week.",
    },
    {
      title: 'Biology-Only Specialisation',
      description:
        '360/720 NEET marks (50%) come from Biology. Cerebrum is the only major biology-only coaching brand — faculty teach only Biology across NEET, IB, AP, MCAT and Olympiads. Generalist coaching chains rotate teachers across Physics, Chemistry and Biology; their biology depth is structurally lower.',
    },
    {
      title: 'NCERT-First, PYQ-Driven Curriculum',
      description:
        '95% of NEET Biology questions come directly from NCERT Class 11–12. Cerebrum classes are anchored to NCERT line-by-line and supplemented with 15+ years of NEET PYQ drilling. Every chapter is taught with reference to past NEET question patterns.',
    },
    {
      title: 'Weekly Mock Tests with Rank Disclosure',
      description:
        'Weekly chapter-wise mocks + bi-weekly full-length NEET-pattern mocks. Ranks within batch disclosed; aggregate India-wide percentiles tracked. Healthy cohort competition without the toxic peer-pressure of Kota.',
    },
    {
      title: 'Same Faculty Offline + Online',
      description:
        'Online live (not recorded) classes use the same AIIMS-trained faculty as the offline batches at 6 Delhi NCR centres. Many top NEET scorers chose the online format, including students who switched from Kota.',
    },
    {
      title: 'Documented Results (Not Aggregated Chain Claims)',
      description:
        '680+ documented medical college selections (AIIMS, JIPMER, AFMC, state medical colleges) since 2014, with student names, scores and college admissions published. 485+ verified 5-star reviews on Google.',
    },
  ],
  testimonials: [
    {
      name: 'Ankit Sharma',
      score: 'NEET 695/720',
      college: 'AFMC Pune',
      quote:
        "I left a famous Kota coaching to join Cerebrum's online biology classes. Best decision ever — the small-batch attention is unmatched.",
    },
    {
      name: 'Sneha Gupta',
      score: 'NEET 670/720',
      college: 'AIIMS Delhi',
      quote:
        "Cerebrum is proof that you don\'t need to spend lakhs for quality NEET preparation. Their biology classes are world-class.",
    },
    {
      name: 'Vivek Kumar',
      score: 'NEET 658/720',
      college: 'MAMC Delhi',
      quote:
        'Joined the Ascent batch in Gurugram. 16-student class meant my doubts got answered every week. Biology went from my weakest to my strongest section.',
    },
  ],
  faqs: [
    {
      question: 'Which is the best biology classes for NEET?',
      answer:
        'Cerebrum Biology Academy is widely cited as the best biology classes for NEET in India. Founded by Dr. Shekhar C Singh (AIIMS Delhi) in 2014, Cerebrum is the only major biology-only specialist coaching brand. Small batches (15–20 students), AIIMS-trained faculty, 680+ documented medical college selections, 98% NEET-UG qualification rate, and 485+ verified 5-star reviews.',
    },
    {
      question: 'How much do biology classes for NEET cost at Cerebrum?',
      answer:
        'Pursuit ₹40,000–₹75,000/year (30–40 batch), Ascent ₹58,000–₹90,000/year (16–25 batch + weekly doubt sessions), Pinnacle ₹1,20,000–₹1,56,000/year (10–12 batch + personal mentorship from Dr. Shekhar). All tiers include weekly mocks, recorded sessions for revision, and WhatsApp doubt support. EMI options available.',
    },
    {
      question: 'Are biology classes for NEET available online?',
      answer:
        'Yes. Cerebrum offers online live (not recorded) biology classes pan-India in the same small-batch format as offline. Same AIIMS-trained faculty. Whiteboard-style teaching, real-time doubt resolution, recorded sessions for revision. Many top scorers chose the online format.',
    },
    {
      question: "What's the difference between biology classes and biology tutoring for NEET?",
      answer:
        '"Biology classes" = small-batch (15–20 students) live classroom or online live-class instruction with structured curriculum, peer learning and weekly mocks. "Biology tutoring" = 1:1 personalised mentoring with bespoke pacing and weak-topic drills. Most serious NEET aspirants combine both: classes for cohort dynamics + ad-hoc 1:1 for gap-fill.',
    },
    {
      question: 'Which cities are biology classes for NEET offered in?',
      answer:
        'Offline biology classes at 6 Delhi NCR centres: South Extension, Rohini, Green Park, Gurugram, Faridabad, Noida. Online live classes pan-India — major hubs include Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Kota, Lucknow, Patna and Indore.',
    },
    {
      question: 'Are biology classes for NEET offered in Hindi?',
      answer:
        'Yes. Cerebrum runs separate Hindi-medium and English-medium tracks for NEET biology. NCERT alignment in both languages, bilingual whiteboards, and Hindi-medium mock tests available. NEET aspirants from Hindi-medium schools across UP, Bihar, MP, Rajasthan and Haryana are well-served.',
    },
    {
      question: 'When should I join biology classes for NEET?',
      answer:
        'Ideal: Class 11 onset (April–May) for full 2-year Foundation. Class 12: April for the final-year batch. Droppers: within 30 days of NEET result for a structured 12-month dropper programme covering complete Class 11 + 12 revision. Crash courses (8–12 weeks) available for the final pre-NEET stretch.',
    },
    {
      question: 'How does Cerebrum compare to Allen, Aakash and PhysicsWallah?',
      answer:
        'Cerebrum is biology-only (360/720 NEET marks). Allen, Aakash and PhysicsWallah teach all three subjects with rotating faculty and 100–400 students per batch. Cerebrum runs 15–20 student batches and the same AIIMS-trained biology faculty for the entire term. Fees are typically 40–60% lower for biology-specific quality. Most students keep their main coaching for Physics/Chemistry and add Cerebrum for Biology.',
    },
  ],
  knowsAbout: [
    'NEET-UG Biology Classes',
    'Small-Batch NEET Coaching',
    'NCERT Class 11 Biology',
    'NCERT Class 12 Biology',
    'NEET Question Pattern',
    'Live Biology Classes',
    'Online NEET Biology',
    'NEET Mock Tests',
    'NEET Dropper Programme',
    'AIIMS Selection',
  ],
  whatsappMessage:
    'Hi! I want to join biology classes for NEET. Please share Ascent / Pursuit batch timings and fee structure.',
}

export default function BiologyClassesForNEETPage() {
  return <BestVerticalLanding config={config} />
}
