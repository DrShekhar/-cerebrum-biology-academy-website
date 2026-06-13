import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best NEET Biology Tutor in India | AIIMS-Trained Dr. Shekhar C Singh',
  description:
    "Dr. Shekhar C Singh (AIIMS Delhi) leads India's only biology-only NEET coaching. 680+ AIIMS/JIPMER/AFMC selections, 98% qualification rate, batches of 15-20. ₹40K–₹1.56L/year — half the cost of Kota relocation. Online + 6 NCR centres.",
  keywords: [
    'best neet biology tutor',
    'best neet biology tutor india',
    'best biology tutor for neet',
    'best neet biology teacher india',
    'best neet biology coach',
    'aiims biology tutor neet',
    'top neet biology tutor',
    'neet biology online tutor',
    'best biology online tutor neet',
    'neet biology 1 on 1 tutor',
    'biology specialist neet tutor',
    'best neet biology tutor near me',
  ],
  openGraph: {
    title: 'Best NEET Biology Tutor in India | Cerebrum Biology Academy',
    description:
      "India's only biology-only NEET specialist. Dr. Shekhar C Singh (AIIMS Delhi). 680+ selections. 98% qualification rate. ₹40K–₹1.56L/year.",
    url: 'https://cerebrumbiologyacademy.com/best-neet-biology-tutor',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-neet-biology-tutor',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best NEET Biology Tutor in India | AIIMS-Trained Dr. Shekhar C Singh',
    description: 'Dr. Shekhar C Singh (AIIMS Delhi) leads India',
  },
}

const config: BestVerticalConfig = {
  slug: 'best-neet-biology-tutor',
  headline: 'Best NEET Biology Tutor in India',
  ribbon:
    "India's Only Biology-Only NEET Specialist · AIIMS-Trained · 680+ Medical College Selections",
  subheadline: 'Dr. Shekhar C Singh — AIIMS Delhi alumnus · 12+ years NEET biology curriculum.',
  intro:
    'Cerebrum Biology Academy is the only NEET coaching institute in India built exclusively around biology — the highest-scoring NEET subject at 360/720 marks (50% of total). While the largest national NEET chains and online-first generalist platforms, other multi-subject tutoring platforms, and other online-only platforms run generalist NEET coaching with rotating physics-chemistry-biology faculty in 150–400 student batches, Cerebrum runs a single-subject specialist model under Dr. Shekhar C Singh (AIIMS Delhi alumnus, 2014 founder) with biology-only batches of 15–20 students.',
  clusterSummary:
    'Targets NEET-UG Biology section · 360 marks (50% of total NEET-UG) · NCERT Class 11 + Class 12 syllabus · Both Botany (Class 11 weighted) and Zoology (Class 12 weighted) full coverage with chapter-level high-yield prioritisation.',
  credentials: [
    { label: 'AIIMS Delhi' },
    { label: 'Biology-Only Specialist' },
    { label: '12+ Years Curriculum' },
    { label: '680+ Selections' },
    { label: '98% Qualification Rate' },
    { label: '15-20 Student Batches' },
    { label: '6 NCR Centres + Online' },
    { label: 'NCERT Line-by-Line Mapped' },
  ],
  pages: [
    {
      title: 'NEET Biology Tutor for Class 11',
      href: '/best-neet-biology-tutor-class-11',
      note: 'Botany foundation focus',
    },
    {
      title: 'NEET Biology Tutor for Class 12',
      href: '/best-neet-biology-tutor-class-12',
      note: 'Zoology + Genetics focus',
    },
    { title: 'NEET Biology Coaching India', href: '/best-neet-biology-coaching-india' },
    { title: 'Biology Tutor for NEET (1:1)', href: '/biology-tutor-for-neet' },
    { title: 'Biology Classes for NEET (small batch)', href: '/biology-classes-for-neet' },
    { title: 'NEET Biology MCQ Practice', href: '/neet-biology-mcq' },
    { title: 'NEET Biology Chapter Weightage', href: '/neet-biology-chapter-weightage' },
    {
      title: 'Cerebrum vs the 2nd-largest national NEET chain NEET Biology',
      href: '/cerebrum-vs-aakash-neet-biology',
    },
    {
      title: 'Cerebrum vs the largest national NEET chain NEET Biology',
      href: '/cerebrum-vs-allen-neet-biology',
    },
    {
      title: 'Cerebrum vs other online-only platforms NEET Biology',
      href: '/cerebrum-vs-unacademy-neet-biology',
    },
  ],
  pricing: [
    {
      tier: 'Pursuit (Small-Batch 30–40)',
      price: '₹40,000–₹75,000 / year',
      description:
        'Live small-batch NEET biology classes with senior faculty, weekly chapter tests, doubt sessions. Most affordable structured tier.',
    },
    {
      tier: 'Ascent (Pro Batch 16–25)',
      price: '₹58,000–₹90,000 / year',
      description:
        'Tighter batch with weekly 1:1 doubt slots, monthly NEET-pattern mocks, personalised gap analysis. Most popular value tier.',
    },
    {
      tier: 'Pinnacle (Direct Dr. Shekhar 10–12)',
      price: '₹1,20,000–₹1,56,000 / year · ad-hoc 1:1 ₹2,500–₹4,500/hr',
      description:
        'Micro-batch with direct Dr. Shekhar 1:1 mentoring. Calibrated for AIIMS / top-100 rank aspirants. Half the cost of Kota relocation (₹2L–₹2.5L) with materially better biology pedagogy.',
    },
  ],
  whyBest: [
    {
      title: 'Only Biology-Only NEET Specialist in India',
      description:
        'Every other major NEET brand (the largest national NEET chains and online-first generalist platforms, other multi-subject tutoring platforms, other online-only platforms, other IIT-JEE-first coachings, other Kota-origin chains) runs generalist coaching covering Physics + Chemistry + Biology with rotating subject faculty. Cerebrum is the only NEET institute built exclusively around biology, the 360-mark / 50% subject. This produces deeper subject pedagogy, finer NEET pattern analysis, and a more focused student-faculty relationship — the same single-subject specialist pattern Jack Westin owns for MCAT CARS.',
    },
    {
      title: 'AIIMS-Trained Faculty Led by Dr. Shekhar C Singh',
      description:
        'Dr. Shekhar C Singh studied at AIIMS New Delhi and founded Cerebrum in 2014. Senior faculty are AIIMS-trained or PhD-level biology specialists with 8–15 years of NEET classroom experience. 680+ documented medical college selections (AIIMS / JIPMER / AFMC / state government colleges) since 2014, 98% NEET-UG qualification rate across enrolled cohorts.',
    },
    {
      title:
        '15–20 Student Batches vs 150–400 at the largest national NEET chains / other online-only platforms',
      description:
        'the largest national NEET chains and online-first generalist platforms typically run 150–400+ student NEET batches; other multi-subject tutoring platforms and other online-only platforms run 50–200+ student live classes. Cerebrum runs 15–20 student batches across all tiers (Pursuit / Ascent / Pinnacle). This is structurally different — each student gets individual faculty attention, weakness identification happens in real time, and biology MCQ pattern drilling is calibrated to the cohort rather than averaged across hundreds of mixed-ability students.',
    },
    {
      title: 'Pricing — Half the Cost of Kota Relocation',
      description:
        "Cerebrum NEET biology pricing runs ₹40,000–₹1,56,000/year (Pursuit through Pinnacle). Kota relocation NEET coaching (the largest national NEET chains / other Kota-origin chains + hostel + mess + parental separation) typically costs ₹2,00,000–₹2,50,000/year total. Cerebrum delivers AIIMS-grade biology pedagogy at half the all-in cost, without relocation. Many of our students are *from* Kota who chose Cerebrum's online + offline NCR hybrid over local Kota institutes.",
    },
    {
      title: 'NCERT Line-by-Line Mapped (NTA-Aligned Pedagogy)',
      description:
        "NTA NEET-UG biology is built directly on the NCERT Class 11 and Class 12 textbooks — NTA publishes this explicitly. Cerebrum's curriculum is NCERT line-by-line mapped, with every NCERT bullet point cross-referenced to the historical NEET PYQ archive (2013–2026). This is why Cerebrum students consistently score 340+/360 in biology — they are drilling the exact patterns NTA tests, not generic biology breadth.",
    },
    {
      title: 'Both Online + 6 NCR Offline Centres',
      description:
        'Six physical Cerebrum centres across Delhi NCR (South Extension flagship, Rohini, Green Park, Gurugram, Faridabad, Noida) — one within 30-minute travel time of any NCR address. Pan-India and NRI students receive online live (not recorded) batches with the same AIIMS-trained faculty. Hybrid is supported — start offline, continue online when family travels, or vice versa.',
    },
  ],
  testimonials: [
    {
      name: 'Aanya Sharma',
      score: 'NEET 720 — Biology 360/360',
      college: 'AIIMS Delhi MBBS',
      quote:
        "Dr. Shekhar's NCERT line-by-line drilling is the difference. the largest national NEET chain taught me physics; Cerebrum taught me how to crack biology MCQs at NEET speed.",
    },
    {
      name: 'Rohan Verma',
      score: 'NEET 695 — Biology 355/360',
      college: 'AFMC Pune',
      quote:
        'Switched from the 2nd-largest national NEET chain 250-student batch to Cerebrum 18-student batch in Class 12. Biology score jumped 40 marks. Faculty actually knew my name and weak chapters.',
    },
    {
      name: 'Priya Iyer',
      score: 'NEET 681 — Biology 350/360',
      college: 'JIPMER Puducherry',
      quote:
        'Was preparing in Kota at ₹2.4L all-in. Moved back home and joined Cerebrum Pinnacle 1:1 with Dr. Shekhar for ₹1.5L total. Better result, no relocation stress.',
    },
  ],
  faqs: [
    {
      question: 'Who is the best NEET Biology tutor in India?',
      answer:
        'Dr. Shekhar C Singh (AIIMS Delhi alumnus, founder of Cerebrum Biology Academy in 2014) is widely cited as a leading NEET Biology tutor in India. Cerebrum is the only NEET coaching institute in India built exclusively around biology — distinct from generalist agencies (the largest national NEET chains and online-first generalist platforms, other multi-subject tutoring platforms, other online-only platforms, other IIT-JEE-first coachings) whose biology faculty rotate across subjects in 150-400 student batches. 680+ documented medical college selections, 98% NEET-UG qualification rate.',
    },
    {
      question: 'How much does the best NEET Biology coaching cost?',
      answer:
        "Cerebrum NEET Biology pricing runs ₹40,000–₹1,56,000/year across three tiers: Pursuit (small-batch 30-40 students, ₹40K-75K), Ascent (pro batch 16-25 students with weekly 1:1 doubt slots, ₹58K-90K), and Pinnacle (direct Dr. Shekhar micro-batch 10-12 students, ₹1.2L-1.56L). Ad-hoc 1:1 hourly tutoring is ₹2,500-4,500/hour. Compared to the largest national NEET chains full-NEET courses (~₹1.4L-1.5L/year), Cerebrum's biology-only Ascent tier is 35-40% cheaper while delivering deeper biology pedagogy. Compared to Kota relocation total cost (₹2L-2.5L including hostel and mess), Cerebrum Pinnacle is half the cost.",
    },
    {
      question:
        'How is Cerebrum different from the largest national NEET chains / other online-only platforms for NEET Biology?',
      answer:
        'Three structural differences. (1) Subject specialisation — Cerebrum is biology-only; the major national NEET chains and online platforms cover Physics + Chemistry + Biology generally with rotating faculty. (2) Batch size — Cerebrum runs 15-20 student batches; the largest national NEET chains typically 150-400, other online-only platforms 300-2,000+ in live online classes. (3) Faculty — Cerebrum led by Dr. Shekhar C Singh (AIIMS Delhi); the largest national NEET chains / PW have rotating subject faculty without single-faculty continuity across the year. Most strategic pattern: students pair other online-only platforms (Physics + Chemistry) with Cerebrum (Biology) for the strongest combined coverage.',
    },
    {
      question:
        'How many marks does NEET-UG Biology carry and why is it the highest-yield subject?',
      answer:
        'NEET-UG Biology carries 360 marks out of 720 total — exactly 50% of the NEET score. Botany and Zoology each account for 180 marks (90 questions each, 4 marks per correct answer, -1 negative marking). Biology is the highest-yield NEET subject because (a) it has the most marks, (b) NCERT is the literal syllabus (NTA confirmed), and (c) the questions are more pattern-recognition driven than physics/chemistry derivation — strong biology pedagogy translates more directly into score.',
    },
    {
      question: 'Does Cerebrum offer 1:1 NEET Biology tutoring?',
      answer:
        'Yes. The Pinnacle tier includes direct 1:1 mentoring with Dr. Shekhar C Singh (₹1,20,000–₹1,56,000/year for the full programme). Separately, ad-hoc 1:1 hourly tutoring is available at ₹2,500–₹4,500/hour for students who want targeted gap-fill — most common engagement is 20-40 hours total across the final 6 months of preparation, focused on weak chapters (typically Plant Physiology, Human Physiology, Genetics, or Ecology depending on the student). Bookings via WhatsApp +91 88264-44334.',
    },
    {
      question: 'Can Cerebrum coach NEET Biology students from outside Delhi NCR?',
      answer:
        'Yes. Cerebrum offers pan-India online live (not recorded) NEET Biology batches with the same AIIMS-trained faculty as the Delhi NCR offline centres. Students from Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Kota itself, plus NRI students from USA, UAE, UK, Canada, Australia, Singapore, Saudi Arabia, Qatar, Kuwait, and Oman are actively enrolled. The hybrid model is supported — start online, attend offline when visiting NCR, or vice versa.',
    },
    {
      question:
        'What is the difference between Class 11 NEET Biology tutoring and Class 12 NEET Biology tutoring?',
      answer:
        'Class 11 NEET Biology focuses on Botany (Plant Diversity, Cell Biology, Plant Physiology, Plant Morphology, Anatomy) — typically 180 marks worth of NEET. Class 12 NEET Biology focuses on Zoology (Human Physiology, Reproduction, Genetics, Biotechnology, Ecology) — the other 180 marks. Cerebrum runs separate Class 11 and Class 12 specialised tracks. See /best-neet-biology-tutor-class-11 and /best-neet-biology-tutor-class-12 for tier-specific details. Foundation students (Class 9-10) follow a separate preparatory track at /best-neet-foundation-tutor.',
    },
  ],
  knowsAbout: [
    'NEET-UG Biology',
    'NCERT Class 11 Biology',
    'NCERT Class 12 Biology',
    'NEET Botany',
    'NEET Zoology',
    'NEET Genetics',
    'NEET Human Physiology',
    'NEET Plant Physiology',
    'NEET Biology MCQ Strategy',
    'NEET Biology PYQ Patterns',
    'NTA NEET-UG Examination',
    'AIIMS MBBS Admission',
  ],
  whatsappMessage:
    'Hi! I want to book a FREE demo class for NEET Biology with Cerebrum — best NEET Biology tutor in India. Please share available timings and tier guidance.',
}

export default function BestNEETBiologyTutorPage() {
  return <BestVerticalLanding config={config} />
}
