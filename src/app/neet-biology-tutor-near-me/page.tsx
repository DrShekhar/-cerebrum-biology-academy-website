import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'NEET Biology Tutor Near Me | 6 NCR Centres + Pan-India Online',
  description:
    'NEET biology tutor near me — Cerebrum Biology Academy. AIIMS-trained tutor at 6 Delhi NCR centres (South Extension, Rohini, Green Park, Gurugram, Faridabad, Noida) + 1:1 online tutoring pan-India. 680+ medical college selections, 98% NEET qualification rate.',
  keywords: [
    'neet biology tutor near me',
    'biology tutor near me neet',
    'neet biology home tutor near me',
    'neet biology tutor near me online',
    'best neet biology tutor near me',
    'private neet biology tutor near me',
    'aiims neet biology tutor near me',
    'neet biology tutor delhi near me',
    'neet biology tutor gurugram near me',
    'neet biology tutor noida near me',
  ],
  openGraph: {
    title: 'NEET Biology Tutor Near Me | Cerebrum Biology Academy',
    description:
      'Find AIIMS-trained NEET biology tutors at 6 Delhi NCR centres or online pan-India. 680+ medical college selections.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-tutor-near-me',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-tutor-near-me',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Biology Tutor Near Me | 6 NCR Centres + Pan-India Online',
    description: 'NEET biology tutor near me — Cerebrum Biology Academy. AIIMS-trained tutor at 6 Delhi NCR centres (South Extension, Rohini, Green Park, Gurugram, Faridabad, Noida) + 1:1 online tutoring pan-India. ...',
  },
}

const config: BestVerticalConfig = {
  slug: 'neet-biology-tutor-near-me',
  headline: 'NEET Biology Tutor Near Me',
  ribbon: '6 Delhi NCR Centres + Pan-India Online · AIIMS Faculty · 1:1 Mentoring',
  subheadline:
    'Find an AIIMS-trained NEET biology tutor at the centre closest to you — or online from anywhere in India.',
  intro:
    'When you search "NEET biology tutor near me" you want two things: AIIMS-grade pedagogy + proximity. Cerebrum Biology Academy has 6 offline centres across Delhi NCR (South Extension, Rohini, Green Park, Gurugram, Faridabad, Noida) — one is almost certainly within 30 minutes of you. Outside NCR? Online 1:1 sessions deliver the same faculty pan-India.',
  clusterSummary:
    'AIIMS-trained 1:1 tutors · 15+ years pedagogy · 680+ medical college selections · WhatsApp same-day doubts.',
  credentials: [
    { label: '6 Delhi NCR Centres' },
    { label: 'Pan-India Online 1:1' },
    { label: 'AIIMS-Trained Tutors' },
    { label: '15+ Years NEET Pedagogy' },
    { label: 'Custom Mock Review' },
    { label: 'WhatsApp Doubt Support' },
    { label: 'Hindi / English Tracks' },
    { label: 'Free Demo Class' },
  ],
  pages: [
    { title: 'Biology Tutor for NEET (Hub)', href: '/biology-tutor-for-neet' },
    { title: '1-on-1 NEET Biology Tutor', href: '/1-on-1-neet-biology-tutor' },
    { title: 'Best NEET Coaching Near Me', href: '/best-neet-coaching-near-me' },
    { title: 'Best Biology Tutor Near Me', href: '/best-biology-tutor-near-me' },
    {
      title: 'NEET Coaching Delhi',
      href: '/neet-coaching-delhi',
      note: 'South Ext + Green Park + Rohini',
    },
    { title: 'NEET Coaching Gurugram', href: '/neet-coaching-gurugram' },
    { title: 'NEET Coaching Noida', href: '/neet-coaching-noida' },
    { title: 'NEET Coaching Faridabad', href: '/neet-coaching-faridabad' },
    { title: 'NEET Coaching Ghaziabad', href: '/neet-coaching-ghaziabad' },
    { title: 'Best NEET Biology Tutor (Delhi NCR)', href: '/best-neet-biology-tutor-delhi-ncr' },
  ],
  pricing: [
    {
      tier: 'Group Tutor (Small Batch)',
      price: '₹40,000–₹90,000 / year',
      description:
        'Pursuit / Ascent tier batches at any of the 6 NCR centres. Weekly 1:1 doubt slots included with Ascent.',
    },
    {
      tier: 'Pinnacle 1:1 + Micro-Batch',
      price: '₹1,20,000–₹1,56,000 / year',
      description:
        'Direct Dr. Shekhar C Singh mentoring + 10–12 student batches at the centre closest to you.',
    },
    {
      tier: 'Ad-hoc 1:1 Hourly',
      price: '₹2,500–₹4,500 / hour',
      description: 'Targeted gap-fill at the closest centre or online. No minimum commitment.',
    },
  ],
  whyBest: [
    {
      title: '6 Delhi NCR Centres = Almost Always Within 30 Minutes',
      description:
        'South Extension (Block D), Rohini (Sector 9), Green Park (Gulmohar Park), Gurugram (Sector 51), Faridabad (Sector 17), Noida (Sector 62). For most NCR addresses, a Cerebrum centre is within 30-minute travel time.',
    },
    {
      title: 'Outside NCR? Online 1:1 (Same Faculty)',
      description:
        'Live online 1:1 sessions (not recorded) with the same AIIMS-trained tutors as the offline centres. Whiteboard teaching, real-time mock review, recorded sessions for revision. Available pan-India in English and Hindi.',
    },
    {
      title: 'Biology-Only Tutors (Not Generalist)',
      description:
        'Most "biology tutors near you" actually teach Physics, Chemistry and Biology rotating. Cerebrum tutors teach only Biology — across NEET, Class 11, Class 12, IB, AP, MCAT and Olympiads. Biology depth compounds.',
    },
    {
      title: 'Custom Mock Review (Not Just Lectures)',
      description:
        'Each weekly mock test is reviewed 1:1: which chapters lost marks, which questions were silly, which topics need re-drilling. Generic home tutors give "study harder" feedback; Cerebrum tutors give a specific correction map.',
    },
    {
      title: 'WhatsApp Same-Day Doubts',
      description:
        'Doubts answered on WhatsApp same-day during the academic year — by senior faculty directly. Critical between weekly tutoring sessions when stuck on a chapter.',
    },
    {
      title: 'Free Demo + 7-Day Refund Guarantee',
      description:
        "Free demo class at any of the 6 NCR centres or online. 7-day full refund after enrollment if the tutor isn't the right fit. Both terms in writing.",
    },
  ],
  testimonials: [
    {
      name: 'Aarav Sharma',
      score: 'NEET 681/720',
      college: 'AIIMS Delhi',
      quote:
        'Searched "NEET biology tutor near me" in DLF Phase 3 — found Cerebrum Gurugram. Pinnacle 1:1 with Dr. Shekhar.',
    },
    {
      name: 'Priya Yadav',
      score: 'NEET 658/720',
      college: 'MAMC Delhi',
      quote:
        'Noida Sector 78 to Cerebrum Sector 62 = 10-minute auto ride. Closest premium biology tutor in NCR by far.',
    },
    {
      name: 'Aditya Verma',
      score: 'NEET 689/720',
      college: 'JIPMER Puducherry',
      quote:
        "I'm from Patna — online 1:1 tutoring with Cerebrum. Same AIIMS faculty as Delhi NCR offline.",
    },
  ],
  faqs: [
    {
      question: 'Where can I find a NEET biology tutor near me in Delhi NCR?',
      answer:
        'Cerebrum Biology Academy operates 6 offline centres across Delhi NCR — South Extension, Rohini, Green Park, Gurugram (Sector 51), Faridabad (Sector 17) and Noida (Sector 62). For most NCR addresses, a centre is within 30 minutes. AIIMS-trained tutors, 1:1 + small-batch options, 680+ medical college selections.',
    },
    {
      question: 'Is there a NEET biology tutor near me outside Delhi NCR?',
      answer:
        'Outside NCR, Cerebrum offers online live (not recorded) 1:1 sessions pan-India with the same AIIMS-trained tutors as the offline centres. Major hubs covered include Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Kota, Lucknow, Patna, Indore and beyond.',
    },
    {
      question: 'How much does a NEET biology tutor near me cost?',
      answer:
        'Group small-batch (Pursuit / Ascent): ₹40,000–₹90,000/year. Pinnacle 1:1 + micro-batch (with Dr. Shekhar): ₹1,20,000–₹1,56,000/year. Ad-hoc 1:1 hourly: ₹2,500–₹4,500/hour. Most NCR home biology tutors charge ₹2,500–₹3,500/hour with no curriculum or mock structure — Cerebrum delivers more for less.',
    },
    {
      question: 'Can I take a free demo with the nearest NEET biology tutor?',
      answer:
        'Yes. Free demo class at any of the 6 NCR centres — no obligation to enrol. Online demo also available. Book via WhatsApp +91 88264-44334 or call directly.',
    },
    {
      question: 'Are NEET biology tutors near me available in Hindi?',
      answer:
        'Yes. NEET aspirants come from across India including Hindi-medium schools. Cerebrum tutors run sessions in both English and Hindi based on student preference. Bilingual whiteboards and NCERT alignment in both languages.',
    },
    {
      question: 'Which Cerebrum centre is closest to me in Gurugram?',
      answer:
        'Cerebrum Gurugram is in M2K Corporate Park, Mayfield Garden, Sector 51 — central Gurugram. Catchment spans 10–15 km including DLF phases, Cyber City, Golf Course Road, Sohna Road, Sector 14–50.',
    },
    {
      question: 'Which Cerebrum centre is closest to me in Noida?',
      answer:
        'Cerebrum Noida is in B-45, Sector 62 — central Noida. Catchment spans 10–15 km including Sectors 16, 18, 50, 62, 75, 78, 100, 110 and Greater Noida West.',
    },
  ],
  knowsAbout: [
    'NEET Biology Tutor Near Me',
    'NEET Biology Tutor Delhi NCR',
    'NEET Biology Tutor Gurugram',
    'NEET Biology Tutor Noida',
    'NEET Biology Tutor Faridabad',
    'Online NEET Biology Tutor',
    'NEET Biology Home Tutor',
    '1:1 NEET Biology Tutor',
    'AIIMS NEET Biology Tutor',
  ],
  whatsappMessage:
    'Hi! I want a NEET biology tutor near me. Please share details of the closest centre and free demo timings.',
}

export default function NEETBiologyTutorNearMePage() {
  return <BestVerticalLanding config={config} />
}
