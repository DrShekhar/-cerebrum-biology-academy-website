import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'RE-NEET 2026 Online Coaching | Live Classes, No Relocation Required',
  description:
    'Online RE-NEET 2026 coaching by AIIMS-trained faculty. Live (not recorded) evening batches across IST, EST, GST timezones. 6–8 week crash course built for the reconduct window. Join from anywhere in India or abroad — no relocation needed.',
  keywords: [
    're-neet 2026 online coaching',
    'online re-neet coaching',
    're-neet 2026 online classes',
    'online neet reconduct coaching',
    'online neet retest classes',
    're-neet 2026 online crash course',
    'online aiims faculty re-neet',
    'pan india online re-neet coaching',
    'live online re-neet 2026 classes',
  ],
  openGraph: {
    title: 'RE-NEET 2026 Online Coaching | Live Classes',
    description:
      'Online live RE-NEET 2026 coaching by AIIMS-trained faculty. No relocation required.',
    url: 'https://cerebrumbiologyacademy.com/re-neet-2026-online-coaching',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/re-neet-2026-online-coaching',
  },
}

const config: BestVerticalConfig = {
  slug: 're-neet-2026-online-coaching',
  headline: 'RE-NEET 2026 Online Coaching',
  ribbon: 'Live (Not Recorded) · AIIMS Faculty · No Relocation · 6–8 Week Crash',
  subheadline:
    'Online live RE-NEET 2026 coaching for India + NRI students after the 12 May NEET cancellation.',
  intro:
    "After the 12 May 2026 NEET-UG cancellation, every aspirant has a 6–8 week window. Online live coaching beats relocation-based offline coaching for three reasons: (a) no time wasted on travel, (b) no hostel + mess costs, (c) recorded sessions for revision. Cerebrum's online RE-NEET crash uses the same AIIMS-trained faculty as the Delhi NCR offline batches — small batches, real-time doubt resolution, WhatsApp same-day support.",
  clusterSummary:
    'IST evening batches + EST / GST options · 15–20 student small batches · WhatsApp same-day doubts · Tele-MANAS 14416 mental health support',
  credentials: [
    { label: 'Live (Not Recorded) Classes' },
    { label: 'AIIMS-Trained Faculty' },
    { label: 'Small Batches 15–20' },
    { label: 'IST + EST + GST Slots' },
    { label: 'Same Faculty Online + Offline' },
    { label: 'Recorded Sessions for Revision' },
    { label: 'WhatsApp Same-Day Doubts' },
    { label: '7-Day Refund Guarantee' },
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
    { title: 'RE-NEET Biology Crash Course', href: '/re-neet-2026-biology-crash-course' },
    { title: 'RE-NEET 2026 for Droppers', href: '/re-neet-2026-droppers' },
    {
      title: 'Cerebrum vs Aakash vs PhysicsWallah',
      href: '/re-neet-2026-cerebrum-vs-aakash-vs-pw',
    },
    { title: 'RE-NEET Coaching in Kota', href: '/re-neet-2026-kota' },
    { title: 'RE-NEET Coaching in Delhi NCR', href: '/re-neet-2026-delhi' },
    { title: 'RE-NEET Coaching in Hyderabad', href: '/re-neet-2026-hyderabad' },
    { title: 'RE-NEET Coaching in Mumbai', href: '/re-neet-2026-mumbai' },
  ],
  pricing: [
    {
      tier: 'Online RE-NEET Crash (Standard)',
      price: '₹25,000–₹35,000 / 6–8 weeks',
      description:
        'Live online classes (IST evening), 16–25 student batches, weekly mocks, WhatsApp doubt support. Best value tier.',
    },
    {
      tier: 'Online RE-NEET Pinnacle 1:1',
      price: '₹45,000–₹60,000 / 6–8 weeks',
      description:
        'Direct Dr. Shekhar mentoring + 10–12 student micro-batches. Best for AIIMS / Top medical college aspirants.',
    },
    {
      tier: 'Ad-hoc 1:1 Hourly',
      price: '₹2,500–₹4,500 / hour',
      description:
        'Targeted gap-fill for students already enrolled at another coaching. Pair with your existing Physics + Chemistry.',
    },
  ],
  whyBest: [
    {
      title: 'Live (Not Recorded) Classes — Real-Time Interaction',
      description:
        "Cerebrum's online RE-NEET classes are LIVE — not pre-recorded videos. Real-time doubt resolution, interactive whiteboard, instant polls, peer discussion. The same teaching experience as offline batches, delivered to your screen. Recorded versions available for revision.",
    },
    {
      title: 'No Relocation = No Hostel + Mess Cost',
      description:
        'A 6–8 week Kota crash course typically adds ₹70K–₹1L in hostel + mess + travel. Online coaching saves all of that. Apply the savings to a better crash course or to family logistics for the actual NEET exam centre.',
    },
    {
      title: 'IST + EST + GST Timezone Options',
      description:
        'India: IST evening (4:30–7:00 PM) + weekend morning batches. USA: EST evening (6:30–9:00 PM) + weekend morning. UAE / Gulf: GST evening (4:00–6:30 PM). Singapore / Malaysia: SGT (5:00–7:30 PM). Australia: AEDT / AEST evening. Pick the slot that suits your timezone.',
    },
    {
      title: 'AIIMS-Trained Faculty (Same as Offline)',
      description:
        'Online students get the same AIIMS-trained biology faculty as the offline batches at Cerebrum\'s 6 Delhi NCR centres — including Dr. Shekhar C Singh personally for Pinnacle tier. No "online-only junior faculty" rotation.',
    },
    {
      title: 'Small Batches Preserved Online (15–20)',
      description:
        'Many online coaching platforms run 300–2,000+ students per live session — Cerebrum keeps batches small (15–20 in Ascent, 10–12 in Pinnacle). Personal attention is preserved structurally even online.',
    },
    {
      title: 'WhatsApp Same-Day Doubts Across Timezones',
      description:
        'Doubts answered on WhatsApp same-day during the academic year — including across IST / EST / GST timezones. Senior faculty respond directly during their working hours.',
    },
  ],
  testimonials: [
    {
      name: 'Aditya Verma (Patna)',
      score: 'NEET 689/720',
      college: 'JIPMER Puducherry',
      quote:
        "I'm from Patna with no quality offline NEET coaching nearby. Cerebrum online + AIIMS faculty got me JIPMER without leaving home.",
    },
    {
      name: 'Sneha Reddy (Hyderabad)',
      score: 'NEET 672/720',
      college: 'KMC Manipal',
      quote:
        'I used Sri Chaitanya for Physics/Chemistry and Cerebrum online for Biology. Pairing was the winning move.',
    },
    {
      name: 'Ankit Sharma (Kota Returner)',
      score: 'NEET 695/720',
      college: 'AFMC Pune',
      quote:
        'I left Kota mid-year and joined Cerebrum online from home. The 18-student batch + 1:1 doubt slots beat my Kota experience.',
    },
  ],
  faqs: [
    {
      question: 'Is online RE-NEET 2026 coaching effective?',
      answer:
        "Yes — and arguably more effective than offline in the 6–8 week crash window because there's no commute time lost. Cerebrum's online live classes use the same AIIMS-trained faculty as the offline batches at 6 Delhi NCR centres. Small batches (15–20 students) preserve personal attention. WhatsApp same-day doubts cover the gap between live sessions.",
    },
    {
      question: 'What timezones does the online RE-NEET coaching support?',
      answer:
        'IST evening (4:30–7:00 PM) for India students. EST evening (6:30–9:00 PM) for USA East Coast. PST evening for USA West Coast / Bay Area. GST (4:00–6:30 PM) for UAE / Gulf. SGT (5:00–7:30 PM) for Singapore / Malaysia. AEDT / AEST evening for Australia. Weekend morning batches also available. Pick the slot that suits your timezone.',
    },
    {
      question: 'Are classes recorded for revision?',
      answer:
        'Yes. Every live class is recorded and available within hours. Students get unlimited rewatch access during the course period plus speed control (0.5x to 2x) for revision passes. The live class is the primary learning event; recordings are for catch-up and revision.',
    },
    {
      question: 'How is the Cerebrum online RE-NEET different from PhysicsWallah?',
      answer:
        'PhysicsWallah operates at mass online scale (300–2,000+ students per live class at ₹10K–₹20K). Cerebrum operates at small-batch scale (15–20 students at ₹25K–₹45K). PW is more affordable; Cerebrum has materially smaller class size and structurally deeper biology depth. Pair PW (Physics + Chemistry) with Cerebrum (Biology) for the best of both.',
    },
    {
      question: 'Do I need special software or hardware for online RE-NEET classes?',
      answer:
        "Standard requirements: laptop or desktop with webcam, stable internet (5+ Mbps recommended), Chrome / Firefox browser. Tablet / mobile also works but laptop is recommended for whiteboard interaction. Cerebrum's LMS handles attendance, recordings, doubt-portal, mock tests and chapter resources.",
    },
    {
      question: 'How quickly can I join the online RE-NEET 2026 crash course?',
      answer:
        'Within 48 hours of contact. Cerebrum runs rolling cohorts — new students can join the next available cohort. WhatsApp +91 88264-44334 for current cohort details. Free demo class scheduled before enrollment.',
    },
    {
      question: "What if online coaching doesn't suit me?",
      answer:
        "Cerebrum offers a 7-day full refund from enrollment if the class isn't the right fit — terms in writing. Free demo class before commitment. If you prefer offline, the 6 Delhi NCR centres (South Extension, Rohini, Green Park, Gurugram, Faridabad, Noida) are open for the same RE-NEET crash course.",
    },
  ],
  knowsAbout: [
    'RE-NEET 2026 Online Coaching',
    'Online NEET Reconduct Coaching',
    'Live Online NEET Crash Course',
    'AIIMS Faculty Online NEET',
    'Online NEET Retest Classes',
    'Pan-India Online NEET Coaching',
    'NRI Online NEET Coaching',
  ],
  whatsappMessage:
    'Hi! I want online RE-NEET 2026 coaching (live classes, no relocation). Please share Cerebrum crash course details and timezone batch options.',
}

export default function ReNEET2026OnlineCoachingPage() {
  return <BestVerticalLanding config={config} />
}
