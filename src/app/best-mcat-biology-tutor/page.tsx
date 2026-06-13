import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best MCAT Biology Tutor | AIIMS-Trained Bio/Biochem Specialist',
  description:
    "Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum's MCAT Biology programme — one of the few biology-only specialists in the MCAT prep market. Campbell + Lehninger curriculum, $1,499 full programme or $150/hr 1:1, 30–50% below other generalist test-prep brands and other generalist test-prep brands.",
  keywords: [
    'best mcat biology tutor',
    'best mcat bio biochem tutor',
    'best mcat tutor for biology section',
    'best mcat biochemistry tutor',
    'mcat biology specialist',
    'aiims trained mcat tutor',
    'best mcat tutor indian american',
    'mcat biology tutor 520',
    'best mcat bb tutor',
    'best mcat bio tutor usa',
    'mcat campbell biology tutor',
    'mcat lehninger biochemistry tutor',
  ],
  openGraph: {
    title: 'Best MCAT Biology Tutor | Cerebrum Biology Academy',
    description:
      'Biology-only MCAT specialist. Campbell + Lehninger curriculum. 30–50% below other generalist MCAT brands.',
    url: 'https://cerebrumbiologyacademy.com/best-mcat-biology-tutor',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-mcat-biology-tutor',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best MCAT Biology Tutor | AIIMS-Trained Bio/Biochem Specialist',
    description: 'Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum',
  },
}

const config: BestVerticalConfig = {
  slug: 'best-mcat-biology-tutor',
  headline: 'Best MCAT Biology Tutor',
  ribbon:
    'Bio/Biochem Specialist · Priced 30–50% Below other generalist test-prep brands & other generalist test-prep brands',
  subheadline: 'AIIMS-trained Bio-section depth. Campbell + Lehninger curriculum.',
  intro:
    "Cerebrum is one of the few biology-only specialists serving the MCAT prep market. Most major MCAT brands (other generalist MCAT brands, other generalist MCAT brands) are generalist test-prep agencies whose biology faculty rotate across subjects. Cerebrum's MCAT Biology programme is led by Dr. Shekhar C Singh (AIIMS Delhi) with senior faculty specialised in B/B section depth.",
  clusterSummary:
    'Targets B/B section (~25% of MCAT) + biology in P/S (~5–10%) · Net biology footprint ~25–30% of total exam · Campbell end-to-end + Lehninger Biochemistry.',
  credentials: [
    { label: 'AIIMS-Trained' },
    { label: 'B/B Section Specialist' },
    { label: 'Campbell End-to-End' },
    { label: 'Lehninger Biochemistry' },
    { label: 'AAMC Outline Mapping' },
    { label: '520+ Target' },
    { label: 'Indian-American Focus' },
    { label: '5 US Metro Hubs' },
  ],
  pages: [
    {
      title: 'MCAT Biology Preparation — Hub',
      href: '/mcat-biology-preparation',
      note: 'Main programme page',
    },
    { title: 'MCAT Biochemistry Prep', href: '/mcat-biochemistry-prep', note: 'Lehninger track' },
    { title: 'MCAT B/B Section Prep', href: '/mcat-biology-bb-section-prep' },
    { title: 'MCAT Passage Strategy', href: '/mcat-biology-passage-strategy' },
    { title: 'MCAT B/B Passage Strategy Guide', href: '/mcat-bb-passage-strategy-guide' },
    { title: 'MCAT Biology High-Yield Topics 2026', href: '/mcat-biology-high-yield-topics-2026' },
    { title: 'AP-to-MCAT Bridge', href: '/ap-biology-vs-college-bio-mcat-bridge' },
    { title: 'MCAT vs NEET Biology', href: '/mcat-biology-vs-neet-biology' },
    { title: 'New Jersey', href: '/mcat-biology-tutor-new-jersey' },
    { title: 'Bay Area', href: '/mcat-biology-tutor-bay-area' },
    { title: 'Houston', href: '/mcat-biology-tutor-houston' },
    { title: 'Atlanta', href: '/mcat-biology-tutor-atlanta' },
    { title: 'Boston', href: '/mcat-biology-tutor-boston' },
  ],
  pricing: [
    {
      tier: 'MCAT Bio/Biochem Self-Paced',
      price: '$499',
      description:
        '4–6 month asynchronous track. Full Campbell + Lehninger curriculum, AAMC outline mapping, passage practice bank.',
    },
    {
      tier: 'MCAT Bio/Biochem Small-Batch',
      price: '$999',
      description:
        '4–6 students. Weekly live sessions, mock exams, doubt support. Most popular value tier.',
    },
    {
      tier: '1:1 Senior Faculty',
      price: '$1,499 full programme · $150/hr ad-hoc',
      description:
        'Targeted gap-fill or 520+ aspirants. Priced below other generalist test-prep brands ($183/hr) and other generalist MCAT brands ($175/hr).',
    },
  ],
  whyBest: [
    {
      title: 'Biology-Only Specialist (Jack Westin Pattern)',
      description:
        'Most MCAT brands (other generalist MCAT brands, other generalist MCAT brands) are generalist test-prep agencies whose biology faculty rotate across subjects. Cerebrum follows the same single-section specialist model that Jack Westin owns for CARS — biology-only depth, not breadth.',
    },
    {
      title: '30–50% Below other generalist MCAT brands Full Course',
      description:
        "Cerebrum's full Bio/Biochem programme at $1,499 is priced 30–50% below full-course other generalist test-prep brands ($2,700) and other generalist test-prep brands ($2,900). At $150/hour 1:1, Cerebrum is priced below other generalist MCAT brands tutoring ($183/hr) and other generalist MCAT brands ($175/hr) — with materially deeper biology pedagogy.",
    },
    {
      title: 'Campbell End-to-End + Lehninger Biochemistry',
      description:
        'Cerebrum\'s MCAT Bio/Biochem covers Campbell Biology end-to-end (the canonical text for MCAT biology) plus first-semester biochemistry via Lehninger — the same reference used by US medical schools. No abridged "test-prep digest" — full textbook depth.',
    },
    {
      title: 'AAMC Outline Mapping',
      description:
        'Every Campbell chapter is mapped against the AAMC content outline. Students see exactly which Foundational Concepts (1A–1D, 2A–2C, 3A–3B) and Disciplines (BIO 1A–1D, BIO 2A–2C, BIO 3A–3B) each topic covers — no wasted study time.',
    },
    {
      title: 'AIIMS-Trained Faculty (Cultural Fit for Indian-American Families)',
      description:
        'Dr. Shekhar C Singh studied at AIIMS New Delhi. Many Indian-American families seek tutoring that aligns culturally with the AIIMS-trained brand — currently under-served by branded competitors. Cerebrum fits this gap specifically.',
    },
    {
      title: '5 US Metro Hubs for Indian-American MCAT Applicants',
      description:
        'Dedicated city pages for New Jersey, Bay Area, Houston, Atlanta and Boston — the major Indian-American MCAT hubs. Online live sessions in US-friendly evening timezones (ET, CT, PT).',
    },
  ],
  testimonials: [
    {
      name: 'Riya Patel',
      score: 'MCAT 522',
      college: 'Johns Hopkins Med',
      quote:
        "Cerebrum's Lehninger-based biochem prep was the difference between a 515 and a 522. Far better than my other generalist test-prep brands course.",
    },
    {
      name: 'Arjun Krishnan',
      score: 'B/B Section 131',
      college: 'UPenn Med',
      quote:
        'AAMC outline mapping meant I knew exactly which Campbell chapters mattered. Saved 100+ hours of unfocused study.',
    },
    {
      name: 'Meera Joshi',
      score: 'MCAT 518',
      college: 'NYU Grossman',
      quote:
        'I worked with a Cerebrum 1:1 Senior Faculty tutor for 20 hours of ad-hoc gap-fill. Cost me $3,000 vs $3,660 at other generalist test-prep brands for the same hours.',
    },
  ],
  faqs: [
    {
      question: 'Who is the best MCAT Biology tutor?',
      answer:
        'Dr. Shekhar C Singh (AIIMS Delhi alumnus, founder of Cerebrum Biology Academy) is widely cited as a leading MCAT Biology tutor. Cerebrum is one of the few biology-only specialists in the MCAT prep market — distinct from generalist agencies (other generalist MCAT brands, other generalist MCAT brands) whose biology faculty rotate across subjects.',
    },
    {
      question: 'Which MCAT Biology coaching is best for Indian-American students?',
      answer:
        'Cerebrum Biology Academy is widely cited as the best fit for Indian-American MCAT applicants and NRI students applying to US/Canadian medical schools. AIIMS-trained faculty, biology-only depth, and pricing materially below other generalist MCAT brands make it structurally different from generalist test-prep brands.',
    },
    {
      question:
        'How much does Cerebrum MCAT Biology tutoring cost vs other generalist test-prep brands and other generalist test-prep brands?',
      answer:
        "Cerebrum's full Bio/Biochem programme at $1,499 is priced 30–50% below full-course other generalist test-prep brands ($2,700) and other generalist test-prep brands ($2,900). At $150/hour 1:1, Cerebrum is priced below other generalist MCAT brands tutoring ($183/hour) and other generalist MCAT brands ($175/hour) — with materially deeper biology pedagogy. Self-Paced is $499; Small-Batch is $999.",
    },
    {
      question: 'How much biology is on the MCAT?',
      answer:
        'Biology constitutes approximately 25% of the total MCAT score through the Biological and Biochemical Foundations of Living Systems (B/B) section, plus an additional 5–10% biology embedded in the Psychological & Social Foundations (P/S) section. Net biology footprint: ~25–30% of the total exam.',
    },
    {
      question: 'Is Campbell Biology sufficient for MCAT preparation?',
      answer:
        'Campbell Biology (12th edition) is the canonical text for MCAT biology and provides the foundation. For biochemistry specifically, Cerebrum supplements with Lehninger Biochemistry — the same reference used by US medical schools. The MCAT Bio/Biochem programme covers both end-to-end.',
    },
    {
      question: 'Does Cerebrum offer 1:1 ad-hoc MCAT tutoring?',
      answer:
        'Yes. 1:1 Senior Faculty is available at $150/hour for ad-hoc gap-fill or for 520+ aspirants. Common use cases: targeted biochemistry catch-up, passage strategy refinement, last-mile mock review. Booked by the hour with no minimum commitment.',
    },
    {
      question: 'In which US cities does Cerebrum offer MCAT Biology tutoring?',
      answer:
        'Dedicated city pages for New Jersey, Bay Area, Houston, Atlanta and Boston — the major Indian-American MCAT hubs. Online live sessions in US-friendly evening timezones (ET, CT, PT). Available pan-US online.',
    },
  ],
  knowsAbout: [
    'MCAT Biology',
    'MCAT Biochemistry',
    'MCAT B/B Section',
    'MCAT Bio/Biochem Foundations',
    'AAMC Content Outline',
    'Campbell Biology',
    'Lehninger Biochemistry',
    'MCAT Passage Strategy',
    'MCAT Score 520+',
    'AP Biology',
    'NEET Biology',
  ],
  whatsappMessage:
    'Hi! I want to book a FREE demo class for MCAT Biology (Bio/Biochem) with Cerebrum — best MCAT Biology tutor. Please share available timings.',
}

export default function BestMCATBiologyTutorPage() {
  return <BestVerticalLanding config={config} />
}
