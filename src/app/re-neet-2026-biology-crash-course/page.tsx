import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'RE-NEET 2026 Biology Crash Course | Biology-Only Specialist (360/720)',
  description:
    'RE-NEET 2026 biology crash course — biology-only AIIMS-trained specialist coaching. Biology = 360/720 NEET marks (50%). 6–8 week NCERT line-by-line revision, high-weightage chapter drill, daily mocks. Pair with any Physics + Chemistry coaching.',
  keywords: [
    're-neet 2026 biology crash course',
    're-neet biology coaching',
    'biology crash course re-neet 2026',
    'neet biology reconduct coaching',
    'best biology coaching re-neet',
    'aiims biology re-neet 2026',
    'neet biology retest 2026',
    'biology-only re-neet crash',
    'cerebrum biology re-neet',
  ],
  openGraph: {
    title: 'RE-NEET 2026 Biology Crash Course | Biology-Only Specialist',
    description:
      'Biology-only AIIMS-trained RE-NEET 2026 crash course. 360/720 NEET marks specialist.',
    url: 'https://cerebrumbiologyacademy.com/re-neet-2026-biology-crash-course',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/re-neet-2026-biology-crash-course',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'RE-NEET 2026 Biology Crash Course | Biology-Only Specialist (360/720)',
    description:
      'RE-NEET 2026 biology crash course — biology-only AIIMS-trained specialist coaching. Biology = 360/720 NEET marks (50%). 6–8 week NCERT line-by-line revision, high-weightage chapter drill, daily moc...',
  },
}

const config: BestVerticalConfig = {
  slug: 're-neet-2026-biology-crash-course',
  headline: 'RE-NEET 2026 Biology Crash Course',
  ribbon: 'Biology-Only Specialist · 360/720 NEET Marks · AIIMS Faculty',
  subheadline: "India's only major biology-only RE-NEET 2026 crash course.",
  intro:
    'Biology is 360/720 NEET marks — exactly 50% of the exam. Yet most coaching chains treat biology as one-of-three subjects with rotating faculty. Cerebrum Biology Academy is the only major biology-only specialist coaching brand in India. Our RE-NEET 2026 biology crash course is purpose-built for the 6–8 week reconduct window: NCERT line-by-line, high-weightage chapter focus, daily mocks in the final 2 weeks, AIIMS clinical correlations.',
  clusterSummary:
    'Biology = 50% NEET marks · NCERT 95% source · Top 5 chapters = 76% biology marks · AIIMS-trained faculty led by Dr. Shekhar C Singh',
  credentials: [
    { label: 'Biology = 360/720 NEET' },
    { label: 'Biology-Only Specialist' },
    { label: 'AIIMS-Trained Faculty' },
    { label: 'NCERT Line-by-Line' },
    { label: 'Top 5 Chapter Focus = 76%' },
    { label: 'Daily Mocks Final 2 Weeks' },
    { label: 'AIIMS Clinical Correlations' },
    { label: 'Pair with Any P+C Coaching' },
  ],
  pages: [
    { title: 'RE-NEET 2026 News Hub', href: '/re-neet-2026' },
    { title: 'RE-NEET Crash Course', href: '/re-neet-crash-course' },
    { title: 'Best Coaching for RE-NEET 2026', href: '/best-coaching-for-re-neet-2026' },
    { title: 'RE-NEET 2026 Syllabus & Difficulty', href: '/re-neet-2026-syllabus-difficulty' },
    {
      title: 'What to Do After NEET 2026 Cancellation',
      href: '/what-to-do-after-neet-2026-cancellation',
    },
    { title: 'RE-NEET Online Coaching', href: '/re-neet-2026-online-coaching' },
    { title: 'RE-NEET 2026 for Droppers', href: '/re-neet-2026-droppers' },
    {
      title: 'Cerebrum vs Aakash vs PhysicsWallah',
      href: '/re-neet-2026-cerebrum-vs-aakash-vs-pw',
    },
    { title: 'Best Biology Teacher for NEET', href: '/best-biology-teacher-for-neet' },
    { title: 'Best NEET Biology Coaching India', href: '/best-neet-biology-coaching-india' },
    { title: 'Best Biology Classes for NEET', href: '/best-biology-classes-for-neet' },
    {
      title: 'Dr. Shekhar C Singh — Faculty Profile',
      href: '/dr-shekhar-singh-neet-biology-faculty',
    },
  ],
  pricing: [
    {
      tier: 'Biology Crash (Standard)',
      price: '₹20,000–₹30,000 / 6–8 weeks',
      description:
        'Biology-only crash course. 12–16 student batches, weekly mocks, WhatsApp doubt support. Pair with your existing Physics + Chemistry coaching.',
    },
    {
      tier: 'Biology Pinnacle 1:1',
      price: '₹40,000–₹55,000 / 6–8 weeks',
      description:
        'Direct Dr. Shekhar mentoring + 6–10 student micro-batches. Best for AIIMS / Top medical college aspirants.',
    },
    {
      tier: 'Biology Ad-hoc 1:1 Hourly',
      price: '₹2,500–₹4,500 / hour',
      description:
        'Targeted biology gap-fill. Most popular when paired with Allen / Aakash / PW for Physics + Chemistry. Book by the hour.',
    },
  ],
  whyBest: [
    {
      title: 'Biology Is 360/720 NEET Marks (50% of Exam)',
      description:
        'Biology has the highest single-subject weightage in NEET. 360 marks across 90 questions (45 Botany + 45 Zoology). A 5-mark gain in biology is worth a 10-rank improvement at the high end. Yet generalist coaching chains treat biology as one-of-three subjects with rotating faculty. Cerebrum compounds biology depth.',
    },
    {
      title: 'NCERT = 95% of NEET Biology Questions',
      description:
        '95% of NEET Biology questions come directly from NCERT Class 11 + Class 12. Most coaching chains teach NCERT + reference books simultaneously, diluting NCERT mastery. Cerebrum teaches NCERT line-by-line — 15+ years of PYQ drilling integrated chapter-wise.',
    },
    {
      title: 'High-Weightage Chapter Focus (Top 5 = 76% of Biology Marks)',
      description:
        'Human Physiology (20%), Genetics and Evolution (18%), Plant Physiology (14%), Cell Biology (12%), Ecology (12%). Together = 76% of biology marks. Cerebrum allocates 70% of crash time to these five chapters. Most chains spread evenly across all 21 NEET biology chapters which dilutes high-leverage time.',
    },
    {
      title: 'AIIMS Clinical Correlations (Not Just Textbook)',
      description:
        "Dr. Shekhar C Singh studied at AIIMS New Delhi. Clinical correlations in Physiology (real disease examples), Genetics (medical conditions), Biotechnology (clinical applications) make abstract textbook concepts memorable. Generalist engineering-trained faculty can't replicate this.",
    },
    {
      title: 'Pair with Any Physics + Chemistry Coaching',
      description:
        'Many serious RE-NEET aspirants pair Cerebrum (Biology) with Allen / Aakash / PhysicsWallah and Unacademy / other multi-subject tutoring platforms (Physics + Chemistry). This is the winning combination — specialist depth on biology + brand-recall generalists on the other two subjects. Cerebrum is built to integrate cleanly with your existing coaching.',
    },
    {
      title: 'Daily Mocks in Final 2 Weeks (Biology-Specific)',
      description:
        'Final 2 weeks of crash schedule biology-pattern mocks every 48 hours — 6 full biology mocks (90 questions, 180 mins biology section pacing) in the closing fortnight. Each with chapter-wise error analysis. Trains exam endurance specifically for the biology section.',
    },
  ],
  testimonials: [
    {
      name: 'Ishita Malhotra',
      score: 'NEET 702/720 (Bio 352/360)',
      college: 'AIIMS Delhi',
      quote:
        "Biology went from my weakest section to my strongest after Cerebrum's biology-only crash. 352 in NEET Biology.",
    },
    {
      name: 'Aditya Verma',
      score: 'NEET 689/720 (Bio 344/360)',
      college: 'JIPMER Puducherry',
      quote:
        'I had Allen for Physics + Chemistry and Cerebrum for Biology. Pairing was the winning move. 344 in NEET Biology.',
    },
    {
      name: 'Sneha Reddy',
      score: 'NEET 672/720 (Bio 338/360)',
      college: 'KMC Manipal',
      quote:
        'Hyderabad-based, did Sri Chaitanya and Narayana for P+C, added Cerebrum online for Biology. The biology specialisation was the differentiator.',
    },
  ],
  faqs: [
    {
      question: 'Why a biology-only RE-NEET crash course?',
      answer:
        'Biology is 360/720 NEET marks — exactly 50% of the exam. A 5-mark gain in biology is worth a 10-rank improvement at the high end. Biology-only specialisation compounds depth in the 6–8 week window — NCERT mastery, high-weightage chapter focus, AIIMS clinical correlations. Generalist coaching chains rotate biology faculty across subjects, structurally limiting biology depth.',
    },
    {
      question: 'Can I take only the biology crash course, not the full programme?',
      answer:
        "Yes — that's exactly what the biology-only crash is designed for. ₹20K–₹30K standard, ₹40K–₹55K Pinnacle, ₹2,500–₹4,500/hour ad-hoc. Pair with your existing coaching for Physics + Chemistry (Allen, Aakash, PhysicsWallah and Unacademy, other multi-subject tutoring platforms, or your local coaching).",
    },
    {
      question: 'How is the biology crash structured?',
      answer:
        'Week 1: diagnostic biology mock + weakness mapping. Weeks 2–3: Botany NCERT line-by-line + chapter mocks. Weeks 4–5: Zoology NCERT line-by-line + cross-system retrieval. Week 6: full biology-section mocks every 48 hours (90 questions, 180 mins pacing). Weeks 7–8: speed-pass + final biology mocks every other day. Total ~6 full biology mocks in the closing fortnight.',
    },
    {
      question: 'Which biology chapters get the most focus?',
      answer:
        'Top 5 high-weightage chapters get 70% of crash time: Human Physiology (20%), Genetics and Evolution (18%), Plant Physiology (14%), Cell Biology (12%), Ecology (12%) = 76% of biology marks. Remaining 30% time covers Botany morphology / anatomy + Zoology biodiversity / biotechnology / animal husbandry.',
    },
    {
      question: 'Is this biology crash suitable for droppers?',
      answer:
        'Yes — many droppers take exactly this. The dropper variant adds: (a) Class 11 + 12 biology re-foundation, (b) twice-weekly 1:1 mentoring (vs weekly), (c) explicit Tele-MANAS 14416 mental health support. See /re-neet-2026-droppers for the dropper-specific variant.',
    },
    {
      question: 'Is the biology crash available online?',
      answer:
        'Yes. Online live (not recorded) classes in IST evening (4:30–7:00 PM) plus EST / GST / SGT options for NRI students. Same AIIMS-trained faculty as the offline batches. Recorded sessions for revision. See /re-neet-2026-online-coaching for the online-specific page.',
    },
    {
      question: 'Will I score 360/360 in NEET Biology after the crash?',
      answer:
        '360/360 is achievable — several Cerebrum students score perfect biology each year (e.g., Ishita Malhotra 352/360 + Aditya Verma 344/360 + Sneha Reddy 338/360 in recent NEETs). The crash maximises your chances by drilling NCERT mastery and high-weightage chapter focus. Realistic expectation for committed students: 320+ from a starting baseline of 250–280.',
    },
    {
      question: 'When can I join the biology crash course?',
      answer:
        'Within 48 hours of contact. Cerebrum runs rolling cohorts; new students can join the next available cohort. WhatsApp +91 88264-44334 for current biology-crash cohort details. Free demo class scheduled before enrollment.',
    },
  ],
  knowsAbout: [
    'RE-NEET 2026 Biology Crash Course',
    'Biology-Only NEET Coaching',
    'NEET Biology Reconduct Coaching',
    'AIIMS Biology Faculty',
    'NCERT NEET Biology',
    'NEET Biology High-Weightage Chapters',
    'NEET Biology Mock Tests',
    '360/360 NEET Biology',
  ],
  whatsappMessage:
    'Hi! I want the biology-only RE-NEET 2026 crash course (pair with my existing P+C coaching). Please share Cerebrum details and cohort timings.',
}

export default function ReNEET2026BiologyCrashCoursePage() {
  return <BestVerticalLanding config={config} />
}
