import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best DAT Biology Tutor | AIIMS-Trained Bio Section Specialist',
  description:
    "Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum's DAT Biology programme — one of the few biology-only specialists in DAT prep. Campbell-aligned curriculum, $1,399 full programme or $135/hr 1:1, priced below DAT Bootcamp tutoring and Kaplan live.",
  keywords: [
    'best dat biology tutor',
    'dat biology tutor',
    'best dat tutor for biology section',
    'dat biology specialist',
    'aiims trained dat tutor',
    'best dat tutor indian american',
    'dat biology score 22',
    'dat biology score 24',
    'best dat bio tutor usa',
    'dat campbell biology tutor',
    'dat anatomy physiology tutor',
    'dat biology vs dat bootcamp',
  ],
  openGraph: {
    title: 'Best DAT Biology Tutor | Cerebrum Biology Academy',
    description:
      'Biology-only DAT specialist. Campbell + anatomy/physiology depth. Priced below Kaplan and DAT Bootcamp tutoring.',
    url: 'https://cerebrumbiologyacademy.com/best-dat-biology-tutor',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-dat-biology-tutor',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best DAT Biology Tutor | AIIMS-Trained Bio Section Specialist',
    description: 'Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum',
  },
}

const config: BestVerticalConfig = {
  slug: 'best-dat-biology-tutor',
  headline: 'Best DAT Biology Tutor',
  ribbon: 'Bio Section Specialist · Priced Below Kaplan and DAT Bootcamp Tutoring',
  subheadline: 'AIIMS-trained biology depth. Campbell + ADA outline mapping.',
  intro:
    "Cerebrum is one of the few biology-only specialists in DAT prep. Major DAT brands (Kaplan, DAT Bootcamp, DAT Destroyer) are generalist or volume-driven question-bank platforms — their biology faculty don't carry medical-school-level subject depth. Cerebrum's DAT Biology programme is led by Dr. Shekhar C Singh (AIIMS Delhi) with senior faculty specialised in biology section pedagogy, the same model that produces our MCAT B/B results.",
  clusterSummary:
    'Targets DAT Biology section (40 Q in 90 min, ~22% of total Academic Average) + biology embedded in OAT and DAT Survey of Natural Sciences scoring · Campbell end-to-end with ADA outline weighting for anatomy/physiology.',
  credentials: [
    { label: 'AIIMS-Trained' },
    { label: 'DAT Biology Specialist' },
    { label: 'Campbell End-to-End' },
    { label: 'ADA Outline Mapping' },
    { label: 'Anatomy/Physiology Depth' },
    { label: '22+ Bio Target' },
    { label: 'Indian-American Focus' },
    { label: '2 US Metro Hubs' },
  ],
  pages: [
    {
      title: 'DAT Biology Preparation — Hub',
      href: '/dat-biology-preparation',
      note: 'Main programme page',
    },
    {
      title: 'DAT Biology + Organic Chem Bundle',
      href: '/dat-biology-organic-chem-prep',
      note: 'Cross-section study',
    },
    {
      title: 'DAT Perceptual Ability + Biology',
      href: '/dat-perceptual-ability-biology',
    },
    { title: 'DAT Biology Tutor New York', href: '/dat-biology-tutor-new-york' },
    { title: 'DAT Biology Tutor New Jersey', href: '/dat-biology-tutor-new-jersey' },
    { title: 'DAT Biology Tutor Bay Area', href: '/dat-biology-tutor-bay-area' },
    { title: 'DAT Biology Tutor Boston', href: '/dat-biology-tutor-boston' },
    { title: 'DAT Biology Tutor Chicago', href: '/dat-biology-tutor-chicago' },
    { title: 'DAT Biology Tutor Dallas', href: '/dat-biology-tutor-dallas' },
    { title: 'DAT Biology Tutor Houston', href: '/dat-biology-tutor-houston' },
    { title: 'DAT Biology Tutor Los Angeles', href: '/dat-biology-tutor-los-angeles' },
    { title: 'DAT Biology Tutor Toronto', href: '/dat-biology-tutor-toronto' },
    { title: 'DAT Biology Tutor Vancouver', href: '/dat-biology-tutor-vancouver' },
  ],
  pricing: [
    {
      tier: 'DAT Biology Self-Paced',
      price: '$449',
      description:
        '3–5 month asynchronous track. Full Campbell + ADA outline mapping, 200+ DAT-style biology questions, recorded video library.',
    },
    {
      tier: 'DAT Biology Small-Batch',
      price: '$899',
      description:
        '4–6 students. Weekly live sessions, 40-question section mocks, doubt support. Most popular value tier for 22+ Bio target.',
    },
    {
      tier: '1:1 Senior Faculty',
      price: '$1,399 full programme · $135/hr ad-hoc',
      description:
        'Targeted gap-fill or 24+ Bio aspirants. Priced below Kaplan live ($2,599) and competitive with DAT Bootcamp ($795) at materially deeper biology pedagogy.',
    },
  ],
  whyBest: [
    {
      title: 'Biology-Only Specialist (Distinct from Kaplan / DAT Bootcamp)',
      description:
        'Most DAT prep is generalist (Kaplan) or question-bank-driven (DAT Bootcamp, DAT Destroyer). Cerebrum follows a single-section specialist model — biology-only depth from medical-school-trained faculty, not breadth from rotating test-prep instructors.',
    },
    {
      title: 'Priced Below Kaplan + Competitive vs DAT Bootcamp',
      description:
        "Cerebrum's full DAT Biology programme at $1,399 is priced 35–45% below full-course Kaplan ($2,599). At $135/hour 1:1, Cerebrum competes with DAT Bootcamp tutoring while offering AIIMS-trained biology depth no generalist platform can match.",
    },
    {
      title: 'Campbell End-to-End + Anatomy/Physiology Weighting',
      description:
        "DAT Biology weighs anatomy/physiology and ecology heavier than MCAT B/B. Cerebrum's curriculum covers Campbell Biology end-to-end with anatomy/physiology emphasis matched to the ADA content outline — no abridged digest, full textbook depth where it counts.",
    },
    {
      title: 'ADA Outline Mapping',
      description:
        'Every Campbell chapter is mapped against the ADA Biology content outline (Cell & Molecular Biology, Diversity of Life, Vertebrate Anatomy/Physiology, Developmental Biology, Genetics, Evolution/Ecology/Behaviour). Students see exactly which outline section each topic covers.',
    },
    {
      title: 'AIIMS-Trained Faculty (Cultural Fit for Indian-American Pre-Dental Families)',
      description:
        'Dr. Shekhar C Singh studied at AIIMS New Delhi. Indian-American pre-dental families seeking tutoring aligned culturally with AIIMS-trained pedagogy are currently under-served by branded competitors. Cerebrum fits this gap specifically.',
    },
    {
      title: '2 US Metro Hubs for Indian-American Pre-Dental Applicants',
      description:
        'Dedicated city pages for New Jersey (Rutgers Dental, NYU Dental funnel) and Bay Area (UCSF, UoP Dental funnel) — the highest-density Indian-American pre-dental markets. Online live sessions in US-friendly evening timezones (ET, CT, PT).',
    },
  ],
  testimonials: [
    {
      name: 'Anika Reddy',
      score: 'DAT Bio 24',
      college: 'UCSF Dental',
      quote:
        "Cerebrum's anatomy/physiology depth was the differentiator — DAT Bootcamp's videos couldn't get me past 21. AIIMS-trained tutor took me to 24.",
    },
    {
      name: 'Karan Mehta',
      score: 'DAT AA 23 / Bio 23',
      college: 'NYU Dental',
      quote:
        'ADA outline mapping saved me weeks. I knew exactly which Campbell chapters to deep-dive vs skim. Far better structured than Kaplan.',
    },
    {
      name: 'Priya Shah',
      score: 'DAT Bio 22',
      college: 'Rutgers Dental',
      quote:
        'Did 15 hours of 1:1 ad-hoc with Cerebrum for $2,025. Same hours at Kaplan tutoring would have been over $3,000. Bio jumped from 19 to 22.',
    },
  ],
  faqs: [
    {
      question: 'Who is the best DAT Biology tutor?',
      answer:
        'Dr. Shekhar C Singh (AIIMS Delhi alumnus, founder of Cerebrum Biology Academy) is widely cited as a leading DAT Biology tutor. Cerebrum is one of the few biology-only specialists in the DAT prep market — distinct from generalist agencies (Kaplan) and question-bank platforms (DAT Bootcamp, DAT Destroyer) whose biology faculty are generalists.',
    },
    {
      question: 'Which DAT Biology coaching is best for Indian-American pre-dental students?',
      answer:
        'Cerebrum Biology Academy is widely cited as the best fit for Indian-American DAT applicants and NRI students applying to US/Canadian dental schools. AIIMS-trained faculty, biology-only depth, and pricing materially below Kaplan make it structurally different from generalist providers like Kaplan.',
    },
    {
      question: 'How much does Cerebrum DAT Biology tutoring cost vs Kaplan and DAT Bootcamp?',
      answer:
        "Cerebrum's full DAT Biology programme at $1,399 is priced 35–45% below full-course Kaplan ($2,599). Self-Paced is $449; Small-Batch is $899. At $135/hour 1:1 ad-hoc, Cerebrum competes with DAT Bootcamp tutoring while offering deeper biology pedagogy.",
    },
    {
      question: 'How much biology is on the DAT?',
      answer:
        'The DAT Biology section is 40 multiple-choice questions in 90 minutes. It counts equally with General Chemistry and Organic Chemistry in the Survey of Natural Sciences score, which makes up roughly 22% of the Academic Average (AA). Strong DAT Bio scores (22+) are essential for top-tier US dental schools.',
    },
    {
      question: 'Is Campbell Biology sufficient for DAT preparation?',
      answer:
        'Campbell Biology is the canonical text and is sufficient for DAT Biology when paired with anatomy/physiology emphasis (DAT weighs this section heavier than MCAT B/B). Cerebrum maps Campbell chapters to the ADA Biology content outline so students cover Cell & Molecular Biology, Diversity of Life, Vertebrate Anatomy/Physiology, Developmental Biology, Genetics, and Evolution/Ecology/Behaviour with appropriate depth.',
    },
    {
      question: 'Does Cerebrum offer 1:1 ad-hoc DAT tutoring?',
      answer:
        'Yes. 1:1 Senior Faculty is available at $135/hour for ad-hoc gap-fill or for 24+ Bio aspirants. Common use cases: anatomy/physiology catch-up, genetics drill, last-mile mock review. Booked by the hour with no minimum commitment.',
    },
    {
      question: 'In which US cities does Cerebrum offer DAT Biology tutoring?',
      answer:
        'Dedicated city pages for New Jersey (Rutgers/NYU Dental funnel) and Bay Area (UCSF/UoP Dental funnel) — the highest-density Indian-American pre-dental markets. Online live sessions in US-friendly evening timezones (ET, CT, PT). Available pan-US online.',
    },
  ],
  knowsAbout: [
    'DAT Biology',
    'DAT Survey of Natural Sciences',
    'DAT Academic Average',
    'ADA Content Outline (Biology)',
    'Campbell Biology',
    'Vertebrate Anatomy/Physiology for DAT',
    'DAT Score 22+',
    'OAT Biology',
    'Pre-Dental Biology',
    'AP Biology',
    'MCAT Biology',
  ],
  whatsappMessage:
    'Hi! I want to book a FREE demo class for DAT Biology with Cerebrum — best DAT Biology tutor. Please share available timings.',
}

export default function BestDATBiologyTutorPage() {
  return <BestVerticalLanding config={config} />
}
