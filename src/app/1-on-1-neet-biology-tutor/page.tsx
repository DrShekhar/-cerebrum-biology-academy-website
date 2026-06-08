import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: '1-on-1 NEET Biology Tutor | Direct AIIMS Faculty Mentoring',
  description:
    '1-on-1 NEET biology tutor — direct personalised mentoring with Dr. Shekhar C Singh (AIIMS Delhi). Bespoke pacing, weak-topic drilling, custom mock review, WhatsApp doubt support. 680+ medical college selections, 98% NEET qualification rate.',
  keywords: [
    '1 on 1 neet biology tutor',
    '1-on-1 neet biology tutor',
    'personal neet biology tutor',
    'individual neet biology tutor',
    'one-on-one neet biology tutor',
    'private neet biology tutor',
    '1 on 1 biology coaching neet',
    'home neet biology tutor',
    '1 to 1 biology tutor neet',
    'aiims 1 on 1 neet tutor',
  ],
  openGraph: {
    title: '1-on-1 NEET Biology Tutor | Direct AIIMS Faculty Mentoring',
    description:
      'Direct 1-on-1 NEET biology mentoring with Dr. Shekhar C Singh (AIIMS). 680+ medical college selections.',
    url: 'https://cerebrumbiologyacademy.com/1-on-1-neet-biology-tutor',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/1-on-1-neet-biology-tutor',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: '1-on-1 NEET Biology Tutor | Direct AIIMS Faculty Mentoring',
    description: '1-on-1 NEET biology tutor — direct personalised mentoring with Dr. Shekhar C Singh (AIIMS Delhi). Bespoke pacing, weak-topic drilling, custom mock review, WhatsApp doubt support. 680+ medical colle...',
  },
}

const config: BestVerticalConfig = {
  slug: '1-on-1-neet-biology-tutor',
  headline: '1-on-1 NEET Biology Tutor',
  ribbon: 'Direct AIIMS Faculty Mentoring · Bespoke Pacing · Custom Mock Review',
  subheadline:
    'Personalised 1-on-1 mentoring with Dr. Shekhar C Singh (AIIMS Delhi) — Pinnacle programme + ad-hoc hourly tutoring.',
  intro:
    '1-on-1 NEET biology tutoring is the most personalised pathway — bespoke curriculum pacing, weak-topic drilling identified from YOUR mock scores, custom revision plans for YOUR exam window. Best suited for AIIMS / Top medical college aspirants, students with non-standard schedules, or those needing focused score-jump programmes (250 → 350+ in months).',
  clusterSummary:
    'Pinnacle tier · 10–12 student micro-batches + 1:1 sessions · Ad-hoc hourly tutoring · WhatsApp doubt support.',
  credentials: [
    { label: 'Dr. Shekhar C Singh Direct' },
    { label: 'AIIMS Delhi Pedagogy' },
    { label: 'Custom Mock Review' },
    { label: 'Bespoke Pacing' },
    { label: 'Same-Day WhatsApp Doubts' },
    { label: 'Score-Jump Programmes' },
    { label: 'Hindi / English Sessions' },
    { label: 'Online + Offline' },
  ],
  pages: [
    { title: 'NEET Coaching — Main Hub', href: '/neet-coaching' },
    { title: 'Biology Tutor for NEET', href: '/biology-tutor-for-neet' },
    { title: '1:1 Biology Tuition for NEET (Existing)', href: '/1-on-1-biology-tuition-neet' },
    { title: 'Best Biology Teacher for NEET', href: '/best-biology-teacher-for-neet' },
    { title: 'Best NEET Biology Tutor (Delhi NCR)', href: '/best-neet-biology-tutor-delhi-ncr' },
    { title: 'NEET Biology Tutor for Droppers', href: '/neet-biology-tutor-for-droppers' },
    { title: 'Pinnacle Programme', href: '/courses' },
    {
      title: 'Dr. Shekhar C Singh — Faculty Profile',
      href: '/dr-shekhar-singh-neet-biology-faculty',
    },
  ],
  pricing: [
    {
      tier: 'Pinnacle (1:1 + 10–12 Batch)',
      price: '₹1,20,000–₹1,56,000 / year',
      description:
        'Direct mentoring from Dr. Shekhar C Singh + 10–12 student micro-batches + weekly 1-on-1 sessions. Best for AIIMS aspirants.',
    },
    {
      tier: 'Ad-hoc 1-on-1 Hourly',
      price: '₹2,500–₹4,500 / hour (depending on faculty)',
      description:
        'Targeted gap-fill, weak-topic drilling, exam-window crash mentoring. Booked by the hour with no minimum commitment.',
    },
    {
      tier: 'Dropper 1-on-1 Programme',
      price: '₹2,00,000+ / year (custom)',
      description:
        'For serious droppers requiring 12-month 1-on-1 mentoring. Full Class 11 + 12 revision, daily 1:1 + weekly mocks + emotional support.',
    },
  ],
  whyBest: [
    {
      title: 'Direct Dr. Shekhar C Singh Mentoring (Pinnacle)',
      description:
        'In the Pinnacle programme, Dr. Shekhar C Singh personally mentors every student. Not an "introduction call" — actual weekly 1-on-1 sessions plus 10–12 student micro-batches. This level of access is structurally impossible at chains running 100+ student batches.',
    },
    {
      title: 'Custom Mock Review (Not Generic Feedback)',
      description:
        'Each weekly mock test is reviewed 1-on-1: which chapters lost marks, which questions were silly, which topics need re-drilling. Score-jump targets are set per fortnight and tracked across the term. Most coaching gives generic "study harder" feedback; 1:1 tutoring gives a specific correction map.',
    },
    {
      title: 'Bespoke Pacing for Non-Standard Schedules',
      description:
        'Students with sports commitments, board exam crunch, IIT-JEE parallel preparation, or family obligations need bespoke pacing — not fixed batch timings. 1:1 tutoring adapts to YOUR schedule, including weekend, evening, early morning slots.',
    },
    {
      title: 'Score-Jump Programmes (250 → 350+ in Months)',
      description:
        '1:1 mentoring concentrates effort on the highest-leverage weak topics. Typical Pinnacle programme score-jumps: 250 → 350 in 6 months, 200 → 320 in 8 months, 320 → 360 in the final 3 months. Documented across 680+ medical college selections.',
    },
    {
      title: 'Same-Day WhatsApp Doubt Support',
      description:
        'Doubts answered on WhatsApp same-day during the academic year — by Dr. Shekhar or senior faculty directly. No 48-hour "doubt portal" wait common at large coaching chains.',
    },
    {
      title: 'Online + Offline + Hybrid',
      description:
        '1-on-1 sessions available offline at 6 Delhi NCR centres or online live pan-India. Most students mix: weekend offline sessions at the nearest centre + weekday online sessions. Same Dr. Shekhar pedagogy across formats.',
    },
  ],
  testimonials: [
    {
      name: 'Ishita Malhotra',
      score: 'NEET 702/720',
      college: 'AIIMS Delhi',
      quote:
        "Pinnacle 1:1 with Dr. Singh — that\'s the differentiator. Weekly 1:1 reviews fixed my Physiology gaps in 6 weeks.",
    },
    {
      name: 'Kavya Reddy',
      score: 'NEET 679/720',
      college: 'AIIMS Jodhpur',
      quote:
        'As a dropper, I needed personalized guidance. Dr. Singh identified exactly where I was going wrong — saved me a year.',
    },
    {
      name: 'Arjun Mehta',
      score: 'NEET 668/720',
      college: 'MAMC Delhi',
      quote:
        'I did 30 hours of ad-hoc 1-on-1 with senior faculty in the final 8 weeks. Score jumped from 285 to 365 in Biology.',
    },
  ],
  faqs: [
    {
      question: 'What does a 1-on-1 NEET biology tutor actually do?',
      answer:
        'A 1-on-1 NEET biology tutor adapts to YOUR weak topics, YOUR pacing, YOUR mock scores. Sessions are not pre-scripted "chapter lectures" — they\'re diagnostic + corrective. Typical 1:1 session: 15 minutes mock review, 30 minutes weak-topic re-teach, 15 minutes timed PYQ drilling on that topic, 5 minutes next-week plan. Output: a specific correction map, not generic advice.',
    },
    {
      question: 'How much does a 1-on-1 NEET biology tutor cost in India?',
      answer:
        'Cerebrum: Pinnacle programme ₹1,20,000–₹1,56,000/year (1:1 + 10–12 batch + weekly Dr. Shekhar sessions). Ad-hoc 1:1 hourly: ₹2,500–₹4,500/hour depending on faculty. Most Delhi NCR home biology tutors charge ₹2,500–₹3,500/hour with no curriculum or mock structure — Cerebrum delivers more for less.',
    },
    {
      question: 'Does Dr. Shekhar C Singh personally tutor 1-on-1?',
      answer:
        'Yes — in the Pinnacle programme. Every Pinnacle student gets weekly 1-on-1 sessions with Dr. Shekhar C Singh (AIIMS Delhi). Not an "introduction call" or "occasional appearance." Other tiers (Ascent, Pursuit) have Dr. Shekhar as core faculty plus weekly 1-on-1 doubt slots with senior faculty.',
    },
    {
      question: 'Can I take 1-on-1 NEET biology tutoring alongside my main coaching?',
      answer:
        'Yes — and many serious aspirants do exactly this. Common pattern: students keep their main coaching at the largest national NEET chains and online-first generalist platforms or other multi-subject tutoring platforms for Physics/Chemistry and add Cerebrum 1:1 specifically for Biology gap-fill. Ad-hoc hourly tutoring is designed for exactly this use case.',
    },
    {
      question: 'Is online 1-on-1 NEET biology tutoring as effective as offline?',
      answer:
        "Yes. Cerebrum's online 1-on-1 sessions are live with the same faculty. Whiteboard-style teaching, screen-shared mock review, recorded sessions for revision. Many top NEET scorers chose the online 1:1 format. Most students mix offline weekend sessions + weekday online sessions.",
    },
    {
      question: 'When is the right time to start 1-on-1 NEET biology tutoring?',
      answer:
        'Pinnacle programme: Class 11 onset for full 2-year continuity. Ad-hoc 1:1: any time — especially valuable in the final 12–16 weeks before NEET for score-jump programmes. Droppers: within 30 days of NEET result for a structured 12-month 1-on-1 dropper programme.',
    },
    {
      question: 'Can a 1-on-1 NEET biology tutor help me jump from 250 to 350+ in months?',
      answer:
        'Yes — score-jumps of 80–140 marks in 4–8 months are common in the Pinnacle programme. The mechanism: 1:1 mentoring concentrates effort on the highest-leverage weak topics rather than generic curriculum revision. Documented in 680+ medical college selections.',
    },
  ],
  knowsAbout: [
    '1-on-1 NEET Biology Tutoring',
    'Personalised NEET Mentoring',
    'NEET Score-Jump Programmes',
    'NEET Dropper 1:1 Coaching',
    'Custom Mock Review',
    'AIIMS-Trained 1:1 Tutor',
    'NEET Biology Weak-Topic Drilling',
    'NEET PYQ Mentoring',
    'AIIMS Selection Strategy',
  ],
  whatsappMessage:
    'Hi! I want 1-on-1 NEET biology tutoring with Dr. Shekhar / senior faculty. Please share Pinnacle and ad-hoc 1:1 pricing.',
}

export default function OneOnOneNEETBiologyTutorPage() {
  return <BestVerticalLanding config={config} />
}
