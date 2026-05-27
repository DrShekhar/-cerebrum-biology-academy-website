import { Metadata } from 'next'
import {
  CompetitorComparisonLanding,
  type CompetitorComparisonConfig,
} from '@/components/seo/CompetitorComparisonLanding'

export const metadata: Metadata = {
  title: 'Cerebrum vs other multi-subject tutoring platforms NEET Biology | Detailed Comparison',
  description:
    'Cerebrum Biology Academy vs other multi-subject tutoring platforms for NEET Biology — biology-only AIIMS faculty vs multi-subject IIT-trained tutors. Compare batch sizes, faculty depth, fees, and biology results. 680+ medical college selections.',
  keywords: [
    'cerebrum vs vedantu',
    'cerebrum vs vedantu neet',
    'vedantu alternative neet biology',
    'vedantu vs cerebrum',
    'vedantu neet biology comparison',
    'best alternative to vedantu neet',
    'cerebrum biology academy vs vedantu',
    'biology only alternative to vedantu',
  ],
  openGraph: {
    title: 'Cerebrum vs other multi-subject tutoring platforms NEET Biology | Detailed Comparison',
    description:
      'Biology-only AIIMS faculty vs multi-subject online platform. AIIMS pedagogy vs IIT-trained tutors.',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-vedantu',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cerebrum-vs-vedantu',
  },

  twitter: { card: 'summary_large_image' as const },
}

const config: CompetitorComparisonConfig = {
  slug: 'cerebrum-vs-vedantu',
  competitorName: 'other multi-subject tutoring platforms',
  headline: 'Cerebrum vs other multi-subject tutoring platforms for NEET Biology',
  ribbon: 'Biology-Only AIIMS Faculty vs Multi-Subject Online Tutors',
  subheadline: 'AIIMS pedagogy. Small batches. Biology specialisation. Documented results.',
  intro:
    "other multi-subject tutoring platforms pioneered online live-class NEET coaching with multi-subject IIT-trained tutors and a recognisable brand. Cerebrum Biology Academy took the opposite specialist path — biology-only AIIMS-trained faculty in small batches of 15–20 students. Both deliver online live classes; the depth differs. Here's the honest comparison.",
  table: [
    {
      criterion: 'Faculty Specialisation',
      cerebrum: 'Biology-only faculty across all batches (NEET, IB, AP, MCAT, Olympiads)',
      competitor:
        'Multi-subject NEET tutors — many faculty rotate across Physics, Chemistry and Biology',
      cerebrumWins: true,
    },
    {
      criterion: 'Founder + Faculty Credentials',
      cerebrum: 'Dr. Shekhar C Singh — AIIMS New Delhi alumnus, 15+ years biology pedagogy',
      competitor: 'Vamsi Krishna, Pulkit Jain — IIT-Bombay alumni. Faculty largely IIT/NIT-trained',
      cerebrumWins: true,
    },
    {
      criterion: 'Batch Size (Live Classes)',
      cerebrum: '15–20 students (Ascent) or 10–12 students (Pinnacle)',
      competitor: '50–200+ students per live class · 1:1 tutoring available at premium tier',
      cerebrumWins: true,
    },
    {
      criterion: '1:1 Doubt Resolution',
      cerebrum: 'Weekly 1:1 doubt slots in Ascent + Pinnacle · WhatsApp same-day doubts',
      competitor: 'Doubt support via app · 1:1 doubt sessions available in premium plans',
      cerebrumWins: true,
    },
    {
      criterion: 'Curriculum Depth (Biology)',
      cerebrum: 'NCERT line-by-line + 15+ years PYQ archive + AIIMS clinical correlations',
      competitor: 'NCERT + reference book coverage · Standard PYQ integration',
      cerebrumWins: true,
    },
    {
      criterion: 'Annual Fees (NEET)',
      cerebrum: '₹40,000–₹1,56,000 / year (Pursuit / Ascent / Pinnacle tiers)',
      competitor: '₹20,000–₹85,000 / year (Pragati / Tatva / V-Pro batches)',
      cerebrumWins: false,
    },
    {
      criterion: 'Documented NEET Selections',
      cerebrum: '680+ medical college selections (AIIMS, JIPMER, AFMC) published with names',
      competitor: 'Aggregate NEET selections claimed across years; not isolated by biology',
      cerebrumWins: true,
    },
    {
      criterion: 'Offline Centres',
      cerebrum: '6 Delhi NCR centres (South Ext, Rohini, Green Park, Gurugram, Faridabad, Noida)',
      competitor: 'Primarily online · Limited offline centres (other multi-subject tutoring platforms Improvement Promise hubs)',
      cerebrumWins: true,
    },
    {
      criterion: 'AIIMS-Specific Pedagogy',
      cerebrum:
        'Clinical correlations from AIIMS medical training built into Physiology, Genetics, Biotech',
      competitor: 'NEET-pattern teaching by IIT/NIT-trained tutors without medical-clinical depth',
      cerebrumWins: true,
    },
    {
      criterion: 'Biology Section Track Record',
      cerebrum: 'Average 330+/360 NEET Biology · 98% qualification rate · 15+ year continuity',
      competitor: 'Solid biology coverage; no published biology-isolated score benchmarks',
      cerebrumWins: true,
    },
  ],
  whyChooseCerebrum: [
    {
      title: 'IIT-Trained Tutors vs AIIMS-Trained Biology Specialists',
      description:
        'other multi-subject tutoring platforms was founded by IIT-Bombay alumni and most faculty are IIT/NIT-trained — strong for Physics and Math, structurally weaker for medical-domain biology. Cerebrum is led by Dr. Shekhar C Singh (AIIMS New Delhi) with biology-only specialist faculty. The 360/720 NEET Biology section is taught by someone who actually studied medicine.',
    },
    {
      title: 'Biology-Only vs Multi-Subject',
      description:
        'other multi-subject tutoring platforms tutors often rotate across Physics, Chemistry, Biology and Math (JEE + NEET preparation overlap). Cerebrum tutors teach only Biology — across NEET, IB, AP, MCAT and Olympiads. Biology depth compounds.',
    },
    {
      title: 'Small Live-Class Batches (15–20 vs 50–200+)',
      description:
        "Even other multi-subject tutoring platforms's live classes typically run 50–200+ students per session. Cerebrum caps at 15–20 (Ascent) or 10–12 (Pinnacle). Personal attention is preserved structurally, not just claimed.",
    },
    {
      title: 'AIIMS Clinical Correlations',
      description:
        "Dr. Shekhar's AIIMS medical training brings clinical context to Physiology (real disease examples), Genetics (medical conditions) and Biotechnology (clinical applications). other multi-subject tutoring platforms tutors deliver textbook biology without this clinical layer.",
    },
    {
      title: 'Documented 680+ Selections (Published with Names)',
      description:
        '680+ Cerebrum medical college selections (AIIMS, JIPMER, AFMC, state medical colleges) published with student names, scores and college admissions. other multi-subject tutoring platforms publishes aggregate NEET selection numbers without isolating biology contribution.',
    },
    {
      title: 'Offline + Online (vs Primarily Online)',
      description:
        'Cerebrum operates 6 Delhi NCR centres for students who prefer in-person + the same faculty available online pan-India. other multi-subject tutoring platforms is primarily online with limited offline footprint.',
    },
  ],
  whenCompetitorMightBeBetter: [
    'You want one platform covering Physics + Chemistry + Biology + Math (JEE + NEET combined preparation)',
    'You prefer recognisable national-brand recall over specialist depth',
    "You're self-disciplined and OK with 50–200+ student live classes",
    "Budget is tight and other multi-subject tutoring platforms's ₹20,000–₹85,000 tier fits better than Cerebrum's ₹40,000+ entry",
  ],
  testimonials: [
    {
      name: 'Aditya Verma',
      score: 'NEET 689/720',
      college: 'JIPMER Puducherry',
      quote:
        'I used other multi-subject tutoring platforms for Physics and Chemistry — solid IIT-trained tutors. For Biology, I needed AIIMS-grade depth. Cerebrum delivered.',
    },
    {
      name: 'Sneha Reddy',
      score: 'NEET 672/720',
      college: 'KMC Manipal',
      quote:
        'Switched from other multi-subject tutoring platforms V-Pro to Cerebrum Ascent specifically for biology. Small batch + AIIMS clinical correlations changed how I understood Physiology.',
    },
    {
      name: 'Priya Yadav',
      score: 'NEET 658/720',
      college: 'MAMC Delhi',
      quote:
        'other multi-subject tutoring platforms was good for JEE-style preparation. For NEET Biology specifically, the Cerebrum 16-student batch worked better.',
    },
  ],
  faqs: [
    {
      question: 'Cerebrum or other multi-subject tutoring platforms — which is better for NEET Biology?',
      answer:
        'For biology-specific preparation, Cerebrum is structurally deeper: AIIMS-trained biology-only faculty, 15–20 student live batches, AIIMS clinical correlations, 680+ documented medical college selections. other multi-subject tutoring platforms has strength in multi-subject coverage (JEE + NEET) with IIT-trained tutors and recognisable brand recall. Many serious NEET aspirants pair other multi-subject tutoring platforms (Physics + Chemistry) with Cerebrum (Biology).',
    },
    {
      question: 'Can I use Cerebrum alongside other multi-subject tutoring platforms for NEET?',
      answer:
        "Yes — and pairing the two is a common pattern. other multi-subject tutoring platforms's strength is multi-subject IIT-trained Physics + Chemistry coverage. Cerebrum's strength is biology-only AIIMS-trained depth. Students often keep other multi-subject tutoring platforms Tatva or V-Pro for non-biology subjects and add Cerebrum Ascent or Pinnacle specifically for Biology.",
    },
    {
      question: 'How does Cerebrum compare to other multi-subject tutoring platforms on fees?',
      answer:
        'other multi-subject tutoring platforms is more affordable: ₹20,000–₹85,000/year (Pragati / Tatva / V-Pro). Cerebrum: ₹40,000–₹1,56,000/year (Pursuit / Ascent / Pinnacle). The fee delta reflects batch size (15–20 at Cerebrum vs 50–200+ at other multi-subject tutoring platforms live classes) and faculty specialisation.',
    },
    {
      question: "Is other multi-subject tutoring platforms's faculty AIIMS-trained for NEET biology?",
      answer:
        "other multi-subject tutoring platforms's founding team is IIT-Bombay alumni and most faculty are IIT / NIT-trained — strong credentials but engineering-domain rather than medical-domain. Cerebrum's founder Dr. Shekhar C Singh holds AIIMS New Delhi credentials, and biology faculty across all tiers are biology-only specialists. For biology specifically, Cerebrum is structurally more aligned to medical-domain pedagogy.",
    },
    {
      question: 'Does other multi-subject tutoring platforms have biology-only faculty for NEET?',
      answer:
        "other multi-subject tutoring platforms has dedicated NEET biology tutors, but most faculty are recruited from JEE + NEET dual-preparation pools and rotate across Physics, Chemistry, Biology and Math depending on student demand. Cerebrum's entire faculty stack teaches only Biology across NEET, Class 11, Class 12, IB, AP, MCAT and Olympiads. Different specialisation models.",
    },
    {
      question: 'Does Cerebrum have offline centres like other multi-subject tutoring platforms Improvement Promise hubs?',
      answer:
        'Cerebrum operates 6 Delhi NCR centres (South Extension, Rohini, Green Park, Gurugram, Faridabad, Noida) with the same faculty online + offline. other multi-subject tutoring platforms is primarily online with a smaller offline footprint via other multi-subject tutoring platforms Improvement Promise hubs in select cities.',
    },
    {
      question: 'What is the NEET biology success rate at Cerebrum vs other multi-subject tutoring platforms?',
      answer:
        'Cerebrum: 98% NEET-UG qualification rate, average 330+/360 NEET Biology score, 680+ documented medical college selections. other multi-subject tutoring platforms publishes aggregate NEET selection numbers but does not isolate biology section performance or publish individual student score breakdowns publicly. Direct comparison is difficult due to different reporting standards.',
    },
  ],
  whatsappMessage:
    'Hi! I want to compare Cerebrum and other multi-subject tutoring platforms for NEET biology. Please share batch details and demo timings.',
}

export default function CerebrumVsVedantuPage() {
  return <CompetitorComparisonLanding config={config} />
}
