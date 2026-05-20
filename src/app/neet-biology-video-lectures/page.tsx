import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'NEET Biology Video Lectures | Complete Class 11 + 12 | Cerebrum',
  description:
    'NEET biology video lectures by Dr. Shekhar C Singh (AIIMS Delhi) — complete Class 11 + Class 12 NCERT coverage with chapter-wise PYQ drilling. Unlimited rewatch, speed control, recorded mocks. Pan-India access from your laptop or phone.',
  keywords: [
    'neet biology video lectures',
    'neet biology video classes',
    'neet biology recorded lectures',
    'neet biology online lectures',
    'best neet biology video lectures',
    'neet biology lectures download',
    'neet biology video course',
    'neet biology free video lectures',
    'aiims faculty video lectures neet',
    'neet biology dropper video course',
  ],
  openGraph: {
    title: 'NEET Biology Video Lectures | Complete Class 11 + 12',
    description:
      'Complete NCERT-anchored video lectures for NEET Biology. Unlimited rewatch, speed control, PYQ drilling.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-video-lectures',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-video-lectures',
  },
}

const config: BestVerticalConfig = {
  slug: 'neet-biology-video-lectures',
  headline: 'NEET Biology Video Lectures',
  ribbon: 'Complete Class 11 + 12 · Unlimited Rewatch · Speed Control',
  subheadline:
    'Recorded lectures by Dr. Shekhar C Singh (AIIMS) — anchored to NCERT, drilled with 15+ years of PYQs.',
  intro:
    'NEET biology video lectures are different from live classes — asynchronous, self-paced, unlimited rewatch, speed control (0.5x to 2x). Best for students who already have a primary coaching and need biology depth on top, droppers building a self-paced revision arc, or NEET aspirants in remote areas without quality offline coaching.',
  clusterSummary:
    'NCERT line-by-line · 15+ years PYQ archives · Searchable chapter index · Recorded mocks with solutions.',
  credentials: [
    { label: 'NCERT Class 11 + 12' },
    { label: 'AIIMS Faculty Recordings' },
    { label: 'Unlimited Rewatch' },
    { label: '0.5x – 2x Speed' },
    { label: '15+ Years PYQ Drilling' },
    { label: 'Recorded Mocks' },
    { label: 'Chapter-Wise Index' },
    { label: 'Mobile + Laptop Access' },
  ],
  pages: [
    { title: 'NEET Coaching — Main Hub', href: '/neet-coaching' },
    { title: 'Online NEET Biology Coaching (Live)', href: '/online-neet-biology-coaching' },
    { title: 'Biology Classes for NEET (Live)', href: '/biology-classes-for-neet' },
    { title: 'Biology Tutor for NEET (1:1)', href: '/biology-tutor-for-neet' },
    { title: 'Best NEET Biology Coaching India', href: '/best-neet-biology-coaching-india' },
    { title: 'Best Biology Teacher for NEET', href: '/best-biology-teacher-for-neet' },
    { title: 'NEET Biology Crash Course', href: '/best-neet-crash-course' },
    { title: 'YouTube — Dr. Shekhar C Singh', href: 'https://www.youtube.com/@drshekharcsingh' },
    {
      title: 'YouTube — Cerebrum Biology Academy',
      href: 'https://www.youtube.com/@cerebrumbiologyacademy',
    },
  ],
  pricing: [
    {
      tier: 'Self-Paced (Recorded Only)',
      price: '₹15,000–₹25,000 / year',
      description:
        'Full Class 11 + 12 NCERT recorded lectures. Chapter-wise index. PYQ archive. Mock tests with recorded solutions.',
    },
    {
      tier: 'Hybrid (Recorded + Live Doubt)',
      price: '₹35,000–₹50,000 / year',
      description:
        'Recorded lectures + weekly live doubt sessions + WhatsApp doubt support. Best of self-paced and live formats.',
    },
    {
      tier: 'Full Live Classes (Upgrade Path)',
      price: '₹58,000–₹1,56,000 / year',
      description:
        'Move from recorded to live small-batch classes (Pursuit / Ascent / Pinnacle). Same faculty.',
    },
  ],
  whyBest: [
    {
      title: 'AIIMS Faculty Recorded Lectures',
      description:
        "Most YouTube biology lectures for NEET come from non-AIIMS faculty or generalist coaching teachers. Cerebrum's recorded lectures are by Dr. Shekhar C Singh (AIIMS New Delhi) and senior team. Clinical correlations in Physiology, Genetics and Biotechnology embedded throughout.",
    },
    {
      title: 'NCERT Line-by-Line (95% of NEET Biology)',
      description:
        '95% of NEET Biology questions come from NCERT Class 11–12. Lectures are anchored to NCERT line-by-line — not random "reference book" coverage. Most YouTube tutorials skip this discipline; Cerebrum builds it into every chapter.',
    },
    {
      title: 'Unlimited Rewatch + Speed Control',
      description:
        'Watch each lecture as many times as needed. Speed control from 0.5x (slow comprehension) to 2x (revision pass). Critical for droppers building a 4–6 month focused revision arc.',
    },
    {
      title: '15+ Years of PYQ Drilling Per Chapter',
      description:
        'Each chapter video closes with a 30–60 minute PYQ drilling session — every NEET-pattern question on that chapter from the last 15 years. Helps students recognise question patterns long before the actual NEET.',
    },
    {
      title: 'Mock Tests with Recorded Solution Walk-Throughs',
      description:
        'Weekly chapter mocks + monthly full-length NEET-pattern mocks. Each mock comes with a recorded video solution walk-through — see how a top scorer approached each question, not just the answer key.',
    },
    {
      title: 'Upgrade Path to Live Classes',
      description:
        'Students who start with recorded lectures can upgrade to live small-batch classes (Pursuit / Ascent / Pinnacle) at any time, with fee adjustment. Same faculty offline + live + recorded — three formats, one pedagogy.',
    },
  ],
  testimonials: [
    {
      name: 'Aditya Verma',
      score: 'NEET 689/720',
      college: 'JIPMER Puducherry',
      quote:
        'I live in Patna and could not access quality offline coaching. The Cerebrum recorded course got me to 689 — JIPMER admission without leaving home.',
    },
    {
      name: 'Sneha Reddy',
      score: 'NEET 672/720',
      college: 'KMC Manipal',
      quote:
        'I used Cerebrum recordings to revise after my main coaching. The speed control + chapter index made revision 3x faster.',
    },
    {
      name: 'Raghav Iyer',
      score: 'NEET 666/720',
      college: 'GMC Trivandrum',
      quote:
        'Dropper student — I built my entire 8-month revision arc around the recorded lectures + mocks. Worked.',
    },
  ],
  faqs: [
    {
      question: "Are Cerebrum's NEET biology video lectures by AIIMS faculty?",
      answer:
        'Yes. Recorded video lectures are by Dr. Shekhar C Singh (AIIMS New Delhi alumnus, founder) and senior biology faculty. Same faculty as the offline batches at 6 Delhi NCR centres. AIIMS clinical correlations embedded in Physiology, Genetics and Biotechnology chapters.',
    },
    {
      question: 'How are video lectures different from live online classes for NEET?',
      answer:
        'Live online classes are real-time with the faculty, interactive doubt resolution, and synchronous attendance. Video lectures are recorded — asynchronous, self-paced, unlimited rewatch, speed control (0.5x to 2x). Both have weekly mocks. Video lectures suit droppers, students in remote areas, and those who want biology depth alongside their main coaching. Live classes suit students who learn best with cohort dynamics and same-day doubt resolution.',
    },
    {
      question: 'How much do NEET biology video lectures cost?',
      answer:
        'Self-Paced (recorded only): ₹15,000–₹25,000/year. Hybrid (recorded + weekly live doubt + WhatsApp doubt support): ₹35,000–₹50,000/year. Compared to ₹40,000–₹1,56,000 for full live small-batch classes. Most cost-effective entry point to AIIMS-trained biology pedagogy.',
    },
    {
      question: 'Can I download the video lectures for offline viewing?',
      answer:
        'Lectures stream through the Cerebrum LMS with offline-mode caching on the mobile app. Direct file downloads are not provided (anti-piracy measure), but offline-mode cached lectures play without internet for up to 7 days. Re-cache as needed.',
    },
    {
      question: 'Do the video lectures cover both Class 11 and Class 12 NEET biology?',
      answer:
        'Yes. Complete coverage of Class 11 NCERT Biology (Botany + Zoology) and Class 12 NCERT Biology. Every chapter mapped to NEET weightage. Class 11 totals ~150 hours of recorded video, Class 12 ~120 hours. Bonus: chapter-wise PYQ drilling videos (15+ years archive).',
    },
    {
      question: 'Are there mock tests with the video lecture course?',
      answer:
        'Yes. Weekly chapter mocks (auto-graded with recorded solution walk-throughs) and monthly full-length NEET-pattern mocks. All mocks include recorded video solutions showing how a top scorer approached each question. India-wide rank percentile disclosed.',
    },
    {
      question: 'Can I upgrade from recorded video lectures to live classes mid-year?',
      answer:
        'Yes. Fee adjustment based on remaining course period; difference moved to live tier. Same faculty across recorded, hybrid and live formats — no relearning required.',
    },
  ],
  knowsAbout: [
    'NEET Biology Video Lectures',
    'NEET Biology Recorded Course',
    'NCERT Class 11 Biology Videos',
    'NCERT Class 12 Biology Videos',
    'Self-Paced NEET Preparation',
    'NEET Biology PYQ Videos',
    'NEET Mock Test Videos',
    'NEET Dropper Video Course',
    'AIIMS Faculty Videos',
    'Online NEET Biology',
  ],
  whatsappMessage:
    'Hi! I want NEET biology video lectures (self-paced or hybrid). Please share details and current pricing.',
}

export default function NEETBiologyVideoLecturesPage() {
  return <BestVerticalLanding config={config} />
}
