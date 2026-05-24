import { Metadata } from 'next'
import {
  CompetitorComparisonLanding,
  type CompetitorComparisonConfig,
} from '@/components/seo/CompetitorComparisonLanding'

export const metadata: Metadata = {
  title: 'Cerebrum vs other online-only platforms NEET Biology | Detailed Comparison',
  description:
    'Cerebrum Biology Academy vs other online-only platforms for NEET Biology — small-batch AIIMS faculty vs mass online platform. Compare batch sizes, faculty specialisation, fees, and biology depth. 680+ medical college selections.',
  keywords: [
    'cerebrum vs physicswallah',
    'cerebrum vs pw',
    'physicswallah alternative neet biology',
    'pw vs cerebrum neet',
    'physicswallah neet biology comparison',
    'best alternative to physicswallah neet',
    'cerebrum biology academy vs pw',
    'small batch alternative to physicswallah',
  ],
  openGraph: {
    title: 'Cerebrum vs other online-only platforms NEET Biology | Detailed Comparison',
    description:
      'Small-batch AIIMS faculty vs mass online platform. Biology-only specialist vs generalist coaching.',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-physicswallah',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cerebrum-vs-physicswallah',
  },
}

const config: CompetitorComparisonConfig = {
  slug: 'cerebrum-vs-physicswallah',
  competitorName: 'other online-only platforms',
  headline: 'Cerebrum vs other online-only platforms for NEET Biology',
  ribbon: 'Small-Batch AIIMS Faculty vs Mass Online Platform',
  subheadline: 'Biology-only specialisation. Personal attention. AIIMS pedagogy. Same fees.',
  intro:
    'other online-only platforms scaled NEET coaching to millions through low-cost video lectures and mass online live classes. Cerebrum Biology Academy chose the opposite approach: small-batch (15–20) AIIMS-trained biology-only faculty. Both can work — the choice depends on whether you need cohort-scale economics or biology-depth attention. Below: the honest comparison.',
  table: [
    {
      criterion: 'Faculty Specialisation',
      cerebrum: 'Biology-only faculty across all batches (NEET, IB, AP, MCAT, Olympiads)',
      competitor: 'Generalist NEET coaching — biology faculty rotate across subjects and batches',
      cerebrumWins: true,
    },
    {
      criterion: 'Founder Background',
      cerebrum: 'Dr. Shekhar C Singh — AIIMS New Delhi alumnus, 15+ years biology pedagogy',
      competitor: 'Generalist physics-domain founder (no biology specialisation)',
      cerebrumWins: true,
    },
    {
      criterion: 'Batch Size (Live Classes)',
      cerebrum: '15–20 students (Ascent) or 10–12 students (Pinnacle)',
      competitor: '300–2,000+ students per live class (various mass-online batches)',
      cerebrumWins: true,
    },
    {
      criterion: '1:1 Doubt Resolution',
      cerebrum: 'Weekly 1:1 doubt slots in Ascent + Pinnacle · WhatsApp same-day faculty doubts',
      competitor: 'Doubt portal with 24–48 hour turnaround · No 1:1 faculty access',
      cerebrumWins: true,
    },
    {
      criterion: 'Curriculum Depth (Biology)',
      cerebrum: 'NCERT line-by-line + 15+ years PYQ archive + AIIMS clinical correlations',
      competitor: 'NCERT coverage + standard PYQ + generic teaching at mass scale',
      cerebrumWins: true,
    },
    {
      criterion: 'Annual Fees (NEET)',
      cerebrum: '₹40,000–₹1,56,000 / year (Pursuit / Ascent / Pinnacle tiers)',
      competitor: '₹4,000–₹26,000 / year (various mass-online batches)',
      cerebrumWins: false,
    },
    {
      criterion: 'Documented Selections',
      cerebrum: '680+ medical college selections (AIIMS, JIPMER, AFMC) published with names',
      competitor: '10,000+ aggregate selections claimed but not isolated for biology contribution',
      cerebrumWins: true,
    },
    {
      criterion: 'Offline Centres',
      cerebrum: '6 Delhi NCR centres (South Ext, Rohini, Green Park, Gurugram, Faridabad, Noida)',
      competitor: '60+ offline centres across India (focus: Tier-2 cities)',
      cerebrumWins: false,
    },
    {
      criterion: 'Free Demo + Refund',
      cerebrum: 'Free demo class · 7-day full refund guarantee',
      competitor: 'Free demo · Refund policy varies by batch (typically 7–14 days)',
      cerebrumWins: true,
    },
    {
      criterion: 'Biology Score Track Record',
      cerebrum: 'Average 330+/360 NEET Biology · 98% qualification rate (15+ year continuity)',
      competitor: 'Solid Biology coverage but no published biology-isolated score benchmark',
      cerebrumWins: true,
    },
  ],
  whyChooseCerebrum: [
    {
      title: 'Biology Is 360/720 — A Biology-Only Specialist Compounds',
      description:
        'NEET Biology accounts for 50% of marks. A biology-only specialist (Cerebrum) builds deeper expertise than a generalist where biology faculty rotate across various mass-online batches. Many top NEET scorers pair an online-only platform (Physics + Chemistry) with Cerebrum (Biology) rather than choosing.',
    },
    {
      title: 'Small Batches Mean Personal Attention',
      description:
        "Other online-only platforms' strength is mass-scale economics — 300–2,000+ students per live class. Cerebrum's strength is small-batch attention — 15–20 students per batch with the same faculty all year. Different value propositions; pick by learning style.",
    },
    {
      title: 'AIIMS Founder Credibility',
      description:
        "Dr. Shekhar C Singh studied at AIIMS New Delhi — India's premier medical institution. AIIMS clinical correlations in Physiology, Genetics and Biotechnology bring depth that test-prep brands can't replicate.",
    },
    {
      title: 'Documented 680+ Selections vs Aggregated Claims',
      description:
        "680+ Cerebrum medical college selections published with student names, scores and college admissions. Other online-only platforms' aggregated 10K+ selections are aggregated chain-wide without isolating biology contribution. Different transparency standards.",
    },
    {
      title: '1:1 Doubt Access (Not 48-Hour Portal Wait)',
      description:
        'Cerebrum students get WhatsApp same-day doubt resolution from faculty plus weekly 1:1 doubt slots. Other online-only platforms use a doubt portal with 24–48 hour turnaround — workable for asynchronous learners, not for students needing real-time gap-fill.',
    },
    {
      title: 'NCERT Line-by-Line, Not "NCERT + Reference Books"',
      description:
        '95% of NEET Biology questions come directly from NCERT Class 11–12. Cerebrum teaches NCERT line-by-line with 15+ years of PYQ drilling. Mass-scale platforms often broaden into reference book coverage that dilutes NCERT mastery.',
    },
  ],
  whenCompetitorMightBeBetter: [
    "Budget is the primary constraint — Other online-only platforms' ₹4,000–₹26,000/year is genuinely lower-cost than Cerebrum's ₹40,000+ entry tier",
    "You're self-disciplined and learn well from large-scale recorded video lectures + minimal personal attention",
    'You want one platform for Physics, Chemistry AND Biology under a single brand for convenience',
    "You're in a Tier-2 or Tier-3 city with another mass online-platform centre and prefer offline access",
  ],
  testimonials: [
    {
      name: 'Aditya Verma',
      score: 'NEET 689/720',
      college: 'JIPMER Puducherry',
      quote:
        'I used an online-only platform for Physics and Chemistry — great content at scale. But for Biology, the 18-student Cerebrum batch was a game-changer. Pairing both worked.',
    },
    {
      name: 'Sneha Reddy',
      score: 'NEET 672/720',
      college: 'KMC Manipal',
      quote:
        'Switched from an online-only platform Yakeen to Cerebrum Ascent specifically for biology depth. AIIMS faculty + 1:1 doubt slots fixed my Physiology gaps in 8 weeks.',
    },
    {
      name: 'Aarav Sharma',
      score: 'NEET 681/720',
      college: 'AIIMS Delhi',
      quote:
        'PW was great for affordable physics revision. For AIIMS-target biology, I needed Cerebrum. Both have a place.',
    },
  ],
  faqs: [
    {
      question: 'Cerebrum or other online-only platforms — which is better for NEET Biology?',
      answer:
        'For biology-specific preparation, Cerebrum is structurally deeper: biology-only AIIMS-trained faculty, 15–20 student batches, 1:1 doubt slots, NCERT line-by-line with 15+ years of PYQ drilling. other online-only platforms is more affordable (₹4,000–₹26,000 vs ₹40,000+) and operates at mass scale (300–2,000+ students per live class). Many students choose both: an online-only platform for Physics/Chemistry, Cerebrum for Biology.',
    },
    {
      question: 'Can I use Cerebrum alongside other online-only platforms for NEET?',
      answer:
        "Yes — and many serious aspirants do exactly this. Common pattern: students keep other mass-online platforms for Physics/Chemistry and add Cerebrum specifically for Biology gap-fill or full-tier coaching. Pairing the two combines the online platform's affordability for non-biology subjects with Cerebrum's biology depth.",
    },
    {
      question: 'How does Cerebrum compare to other online-only platforms on fees?',
      answer:
        "other online-only platforms is significantly more affordable: ₹4,000–₹26,000/year (various mass-online batches). Cerebrum: ₹40,000–₹1,56,000/year (Pursuit / Ascent / Pinnacle). The fee difference reflects batch size and 1:1 access — the online platform's 300+ student live classes vs Cerebrum's 15–20 student batches.",
    },
    {
      question:
        "Is Cerebrum's founder different from the founders of other online-only platforms?",
      answer:
        'Yes — different backgrounds. Dr. Shekhar C Singh is an AIIMS New Delhi alumnus with 15+ years of biology pedagogy. Founders of other online-only platforms typically come from physics or engineering backgrounds. Different domain expertise — Dr. Shekhar is biology-specific.',
    },
    {
      question: 'Does Cerebrum have offline centres like the online platform offline arm?',
      answer:
        'Cerebrum operates 6 Delhi NCR centres (South Extension, Rohini, Green Park, Gurugram, Faridabad, Noida). the online platform offline arm has 60+ offline centres across India, focused on Tier-2 cities. Different geographic footprints — Cerebrum is NCR-anchored with pan-India online, an online-only platform is broadly distributed offline.',
    },
    {
      question: 'Does other online-only platforms have AIIMS-trained biology faculty?',
      answer:
        "Other online-only platforms' biology faculty are qualified NEET coaches but the brand's founder, brand identity and primary expertise centre on Physics. Cerebrum's entire faculty stack is biology-only with the founder Dr. Shekhar C Singh holding AIIMS New Delhi credentials. For biology depth specifically, Cerebrum is structurally more specialised.",
    },
    {
      question: 'What is the success rate for biology at Cerebrum vs other online-only platforms?',
      answer:
        'Cerebrum: 98% NEET-UG qualification rate, average 330+/360 NEET Biology score, 680+ documented medical college selections. other online-only platforms claims 10K+ NEET selections aggregated across all subjects, without published biology-isolated benchmarks. Hard to compare directly because of different reporting standards.',
    },
  ],
  whatsappMessage:
    'Hi! I want to compare Cerebrum and other online-only platforms for NEET biology. Please share batch details and demo timings.',
}

export default function CerebrumVsPhysicsWallahPage() {
  return <CompetitorComparisonLanding config={config} />
}
