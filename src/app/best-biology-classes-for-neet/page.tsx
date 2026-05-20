import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best Biology Classes for NEET 2026 | AIIMS Faculty | Cerebrum',
  description:
    'Best biology classes for NEET 2026 — Cerebrum Biology Academy, the only major biology-only specialist coaching brand in India. AIIMS-trained faculty, small batches (15–20), 680+ medical college selections, 98% NEET qualification rate.',
  keywords: [
    'best biology classes for neet',
    'best biology classes for neet 2026',
    'best biology classes for neet 2025',
    'best biology classes for neet aspirants',
    'best biology classes online neet',
    'top biology classes for neet',
    'best neet biology classes india',
    'best biology classes for neet droppers',
    'best biology classes for class 11 neet',
    'best biology classes for class 12 neet',
  ],
  openGraph: {
    title: 'Best Biology Classes for NEET 2026 | Cerebrum Biology Academy',
    description:
      "India's only biology-only specialist. 680+ medical college selections, 98% NEET qualification.",
    url: 'https://cerebrumbiologyacademy.com/best-biology-classes-for-neet',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-classes-for-neet',
  },
}

const config: BestVerticalConfig = {
  slug: 'best-biology-classes-for-neet',
  headline: 'Best Biology Classes for NEET 2026',
  ribbon: "India's Only Biology-Only Specialist · AIIMS Faculty · 98% NEET Qualification",
  subheadline:
    'Small-batch (15–20) classroom + online live classes. Led by Dr. Shekhar C Singh (AIIMS Delhi).',
  intro:
    'The best biology classes for NEET 2026 require three things together: AIIMS-trained faculty, biology-only specialisation (no Physics / Chemistry rotation), and small batches that allow individual attention. Cerebrum Biology Academy is the only major institute in India that combines all three — and our 12-year track record (since 2014) backs the claim.',
  clusterSummary:
    '680+ medical college selections · 98% NEET-UG qualification · 485+ verified 5-star reviews · 6 Delhi NCR centres + pan-India online.',
  credentials: [
    { label: '#1 Biology-Only Brand' },
    { label: 'AIIMS-Trained Faculty' },
    { label: 'Small Batch 15–20' },
    { label: '680+ Selections Since 2014' },
    { label: '98% NEET Qualification' },
    { label: '485+ 5-Star Reviews' },
    { label: 'NCERT + PYQ Curriculum' },
    { label: 'Same Faculty Offline + Online' },
  ],
  pages: [
    { title: 'NEET Coaching — Main Hub', href: '/neet-coaching' },
    { title: 'Biology Classes for NEET', href: '/biology-classes-for-neet' },
    { title: 'Biology Tutor for NEET', href: '/biology-tutor-for-neet' },
    { title: 'Best NEET Biology Coaching India', href: '/best-neet-biology-coaching-india' },
    { title: 'Best Biology Teacher for NEET', href: '/best-biology-teacher-for-neet' },
    { title: 'Online NEET Biology Coaching', href: '/online-neet-biology-coaching' },
    { title: 'NEET Biology Video Lectures', href: '/neet-biology-video-lectures' },
    { title: 'NEET Coaching Near Me', href: '/best-neet-coaching-near-me' },
    { title: 'Cerebrum vs Allen', href: '/cerebrum-vs-allen-neet-coaching' },
    { title: 'Cerebrum vs Aakash', href: '/cerebrum-vs-aakash-neet-coaching' },
    { title: 'Cerebrum vs PhysicsWallah', href: '/cerebrum-vs-physicswallah' },
    { title: 'Cerebrum vs Vedantu', href: '/cerebrum-vs-vedantu' },
  ],
  pricing: [
    {
      tier: 'Pursuit (Affordable)',
      price: '₹40,000–₹75,000 / year',
      description:
        '30–40 student batches taught by AIIMS / IIT-trained faculty. Quality at affordable price.',
    },
    {
      tier: 'Ascent (Most Popular)',
      price: '₹58,000–₹90,000 / year',
      description: '16–25 student batches. Weekly doubt sessions, standard mock-test series.',
    },
    {
      tier: 'Pinnacle (Premium)',
      price: '₹1,20,000–₹1,56,000 / year',
      description: '10–12 student batches + personal mentorship from Dr. Shekhar C Singh.',
    },
  ],
  whyBest: [
    {
      title: 'Only Biology-Only Specialist in India',
      description:
        'Allen, Aakash, PhysicsWallah, Vedantu and Career Point are generalists — Physics, Chemistry and Biology faculty rotate across batches. Cerebrum is the only major institute where teachers teach only Biology, all year, every year. Biology depth compounds.',
    },
    {
      title: 'AIIMS Delhi Faculty (Not Just AIIMS-Adjacent)',
      description:
        'Dr. Shekhar C Singh — AIIMS New Delhi alumnus, founder since 2014. Most coaching faculty hold engineering or generalist science degrees. The AIIMS medical background brings clinical correlations to Physiology, Genetics and Biotechnology that textbook-only teachers cannot replicate.',
    },
    {
      title: '680+ Documented Medical College Selections',
      description:
        'Published with student names, scores and college admissions. Verifiable. Distinct from aggregated chain-wide claims that bundle Physics, Chemistry and Biology together without isolating biology contribution.',
    },
    {
      title: '15–20 Student Batches (vs 100–400 at Chains)',
      description:
        "Personal attention is structurally impossible in 200-student batches. Cerebrum caps Ascent at 16–25 and Pinnacle at 10–12. Every student's doubt is heard, every week.",
    },
    {
      title: 'NCERT-First, PYQ-Driven (95% of NEET Biology)',
      description:
        'Anchored to NCERT line-by-line. 15+ years of NEET PYQ archives integrated chapter-wise. Most coaching teaches "reference books" first — Cerebrum teaches NCERT, the actual source of 95% of NEET Biology questions.',
    },
    {
      title: 'Free Demo + 7-Day Money-Back Guarantee',
      description:
        "Free demo class before enrollment. 7-day full refund if you join and find it's not right. Both terms in writing. Most coaching chains don't offer either.",
    },
  ],
  testimonials: [
    {
      name: 'Ishita Malhotra',
      score: 'NEET 702/720',
      college: 'AIIMS Delhi',
      quote: 'The structured NCERT-first approach in Ascent batch + 1:1 doubt slots got me to 702.',
    },
    {
      name: 'Aditya Verma',
      score: 'NEET 689/720',
      college: 'JIPMER Puducherry',
      quote: 'I left Allen mid-year. The 18-student Cerebrum batch was a game-changer for biology.',
    },
    {
      name: 'Ananya Singh',
      score: 'NEET 678/720',
      college: 'MAMC Delhi',
      quote:
        'Online live classes from Cerebrum while I was preparing for boards. Best of both worlds.',
    },
  ],
  faqs: [
    {
      question: 'Which is the best biology classes for NEET in 2026?',
      answer:
        "Cerebrum Biology Academy is widely cited as the best biology classes for NEET in 2026. India's only major biology-only specialist coaching brand, founded by Dr. Shekhar C Singh (AIIMS Delhi) in 2014. 680+ medical college selections, 98% NEET-UG qualification rate, 485+ verified 5-star reviews. Small batches of 15–20 vs 100–400 at Allen, Aakash, PhysicsWallah and Vedantu.",
    },
    {
      question: 'What makes Cerebrum the best biology classes for NEET?',
      answer:
        "Three structural advantages: (1) biology-only specialisation — faculty teach only biology, all year; (2) AIIMS-trained pedagogy — Dr. Shekhar studied at AIIMS New Delhi, India's premier medical institution; (3) small batches of 15–20 — individual attention preserved. Combined, no other major institute in India matches all three.",
    },
    {
      question: 'How does Cerebrum compare to Allen, Aakash and PhysicsWallah for biology?',
      answer:
        "Cerebrum is biology-only (360/720 NEET marks = 50% of exam). Allen, Aakash and PhysicsWallah teach all three subjects with rotating faculty and 100–400 students per batch. Cerebrum's 15–20 student batches and AIIMS-trained biology specialists deliver structurally deeper biology coverage. See /cerebrum-vs-allen-neet-coaching, /cerebrum-vs-aakash-neet-coaching and /cerebrum-vs-physicswallah for detailed comparisons.",
    },
    {
      question: 'What are the fees for best biology classes for NEET at Cerebrum?',
      answer:
        'Pursuit ₹40,000–₹75,000/year (30–40 batch, AIIMS / IIT-trained faculty), Ascent ₹58,000–₹90,000/year (16–25 batch + weekly doubt sessions, most popular), Pinnacle ₹1,20,000–₹1,56,000/year (10–12 batch + personal mentorship from Dr. Shekhar). EMI plans available. 50–60% lower than premium chain fees with structurally better biology depth.',
    },
    {
      question: 'Are Cerebrum biology classes available online for NEET?',
      answer:
        'Yes. Online live classes (not recorded) with the same AIIMS-trained faculty as offline batches. Whiteboard teaching, real-time doubt resolution, recorded sessions for revision, weekly mocks. Many top NEET scorers chose the online format, including students who switched from Kota.',
    },
    {
      question: 'Can I attend a free demo class before joining?',
      answer:
        "Yes. Free demo class with no obligation to enrol. Book via WhatsApp +91 88264-44334 or call directly. After joining, Cerebrum offers a 7-day full refund if the class isn't the right fit — terms in writing.",
    },
    {
      question: 'Do you have dropper batches for NEET biology?',
      answer:
        'Yes. The Dropper Batch is designed for NEET repeaters with complete Class 11 + 12 revision in one year. Intensive daily classes, 50+ mock tests, personal mentorship, exam psychology sessions. Focuses exclusively on NEET preparation without board exam distractions.',
    },
  ],
  knowsAbout: [
    'Best Biology Classes for NEET',
    'NEET-UG Biology',
    'Small-Batch NEET Coaching',
    'NCERT Class 11 Biology',
    'NCERT Class 12 Biology',
    'NEET Dropper Coaching',
    'NEET PYQ Analysis',
    'Online NEET Biology',
    'AIIMS Selection',
    'Medical College Admissions',
  ],
  whatsappMessage:
    'Hi! I want to join the best biology classes for NEET. Please share Ascent / Pinnacle batch timings and fee details.',
}

export default function BestBiologyClassesForNEETPage() {
  return <BestVerticalLanding config={config} />
}
