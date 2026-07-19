import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best NEET Biology Tutor for Class 11 | Botany Foundation + NCERT Mapped',
  description:
    'Best Class 11 NEET Biology tutor in India — Dr. Shekhar C Singh (AIIMS Delhi). Class 11 Botany (180 NEET marks): Plant Diversity, Cell Biology, Plant Physiology. NCERT line-by-line mapped, ₹40K–₹1.56L/year, batches of 15–20.',
  keywords: [
    'best neet biology tutor class 11',
    'best class 11 biology tutor neet',
    'class 11 botany tutor neet',
    'neet biology coaching class 11',
    'class 11 cell biology tutor neet',
    'class 11 plant physiology tutor',
    'class 11 plant diversity neet tutor',
    'ncert class 11 biology coach',
    'class 11 neet foundation biology',
    'class 11 biology aiims tutor',
  ],
  openGraph: {
    title: 'Best NEET Biology Tutor for Class 11 | Cerebrum Biology Academy',
    description:
      'Class 11 NEET Biology specialist — Botany 180 marks. AIIMS-trained, batches of 15-20, NCERT line-by-line mapped.',
    url: 'https://cerebrumbiologyacademy.com/best-neet-biology-tutor-class-11',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-neet-biology-tutor-class-11',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best NEET Biology Tutor for Class 11 | Botany Foundation + NCERT Mapped',
    description:
      'Best Class 11 NEET Biology tutor in India — Dr. Shekhar C Singh (AIIMS Delhi). Class 11 Botany (180 NEET marks): Plant Diversity, Cell Biology, Plant Physiology. NCERT line-by-line mapped, ₹40K–₹1....',
  },
}

const config: BestVerticalConfig = {
  slug: 'best-neet-biology-tutor-class-11',
  headline: 'Best NEET Biology Tutor for Class 11',
  ribbon: 'Botany Foundation · 180 NEET Marks · NCERT Class 11 Line-by-Line Mapped',
  subheadline:
    'Dr. Shekhar C Singh (AIIMS Delhi) — biology-only specialist for the Class 11 NEET pathway.',
  intro:
    "Class 11 NEET Biology = Botany. The NCERT Class 11 Biology textbook accounts for approximately 180 marks of the total 360-mark NEET-UG biology section — half. Strong Class 11 pedagogy is the single highest-leverage early intervention for NEET success, because (a) Class 12 botany chapters build on Class 11 foundations, (b) NTA tests Class 11 chapters disproportionately compared to most coaching curriculums' Class 11 emphasis, and (c) students who weak-spot Class 11 in their first year typically lose 30-50 biology marks they cannot recover in Class 12.",
  clusterSummary:
    'Targets NCERT Class 11 Biology — Plant Diversity, Plant Morphology + Anatomy, Cell Biology, Plant Physiology, Human Physiology Part 1 · ~180 NEET marks · Strongest predictor of final NEET biology score.',
  credentials: [
    { label: 'AIIMS Delhi' },
    { label: 'Class 11 Specialist Track' },
    { label: 'NCERT Line-by-Line' },
    { label: 'Botany Depth' },
    { label: 'Plant Physiology 14% NEET' },
    { label: 'Cell Biology 12% NEET' },
    { label: '15-20 Student Batches' },
    { label: 'NEET PYQ Calibrated' },
  ],
  pages: [
    { title: 'NEET Biology Tutor — Hub (National)', href: '/best-neet-biology-tutor' },
    { title: 'NEET Biology Tutor for Class 12', href: '/best-neet-biology-tutor-class-12' },
    { title: 'NEET Biology Class 11 — Programme', href: '/neet-biology-class-11' },
    { title: 'NEET Biology Coaching Class 11', href: '/neet-biology-coaching-class-11' },
    { title: 'Class 11 Biology (Faridabad)', href: '/biology-class-11-faridabad' },
    { title: 'NEET Foundation (Class 9-10 prep)', href: '/best-neet-foundation-tutor' },
  ],
  pricing: [
    {
      tier: 'Pursuit Class 11 (Small-Batch 30-40)',
      price: '₹40,000–₹65,000 / year',
      description:
        'Full Class 11 Biology NCERT coverage with senior faculty, weekly chapter tests, doubt sessions. Standard pacing for first-year NEET aspirants.',
    },
    {
      tier: 'Ascent Class 11 (Pro Batch 16-25)',
      price: '₹58,000–₹80,000 / year',
      description:
        'Tighter Class 11 batch with weekly 1:1 doubt slots, monthly NEET-pattern chapter mocks, personalised gap analysis. Most popular for serious AIIMS aspirants.',
    },
    {
      tier: 'Pinnacle Class 11 (Direct Dr. Shekhar 10-12)',
      price: '₹1,20,000–₹1,45,000 / year',
      description:
        'Direct Dr. Shekhar 1:1 mentoring for Class 11 NEET trajectory. Calibrated for AIIMS / top-100 rank early aspirants. Ad-hoc Class 11 1:1 ₹2,500-4,500/hr.',
    },
  ],
  whyBest: [
    {
      title: 'Class 11 Botany = 180 NEET Marks (Half of Biology)',
      description:
        "NCERT Class 11 Biology accounts for approximately 180 of the 360 NEET-UG biology marks — exactly half. Plant Physiology alone is ~14% of NEET biology, Cell Biology ~12%, Plant Diversity ~10%, Plant Morphology + Anatomy ~6%. Students who underprepare Class 11 lose 30-50 biology marks that Class 12 effort cannot recover. Cerebrum's Class 11 track exists because most students don't realise this until Class 12 when it's too late.",
    },
    {
      title: 'NCERT Class 11 Line-by-Line Mapped (NTA-Aligned)',
      description:
        "NTA explicitly states NEET-UG biology is built on the NCERT textbooks. Cerebrum's Class 11 curriculum is mapped line-by-line to NCERT Class 11 Biology with every bullet point cross-referenced to the NEET PYQ archive (2013-2026). Students see exactly which NCERT sentences become NEET MCQs and how distractors are constructed — pattern recognition that no generalist coaching teaches.",
    },
    {
      title: 'Plant Physiology Specialist Pedagogy (14% of NEET Biology)',
      description:
        'Plant Physiology — Mineral Nutrition, Photosynthesis, Respiration in Plants, Plant Growth and Development — is consistently the hardest Class 11 NEET chapter cluster and the single highest-yield score-differentiator. Cerebrum runs an extended Plant Physiology block (3 weeks vs the standard 1-2 weeks at generalist coaching) because students who clear this block at 90%+ accuracy reliably score 350+/360 on the final NEET biology paper.',
    },
    {
      title: 'Class 11 Boards + NEET Parallel Track',
      description:
        'Class 11 students balance CBSE / ICSE / State Board Class 11 exams (90% weightage) with NEET preparation (NTA pattern). Cerebrum runs both tracks in parallel — the same biology faculty teach to both objectives. Many generalist NEET coachings treat Class 11 boards as an afterthought; we treat boards as the foundation NEET is built on.',
    },
    {
      title: '15-20 Student Class 11 Batches',
      description:
        "Class 11 is when NEET pedagogy compounds — the student-faculty relationship needs to be tight enough that faculty can identify weak chapters by Week 4-6. Cerebrum runs 15-20 student Class 11 batches across Pursuit / Ascent / Pinnacle tiers vs Aakash and Allen 150-400+ student Class 11 batches where individual identification doesn't happen. This is the same logic as elite school small-class pedagogy applied to NEET preparation.",
    },
    {
      title: 'Class 11 Online + 6 NCR Offline Centres',
      description:
        'Class 11 students often need offline structure for the first six months while building NEET study habits. Five Cerebrum centres across Delhi NCR (South Extension flagship, Rohini, Green Park, Gurugram, Faridabad) support offline-first Class 11 batches; pan-India and NRI students get online live (not recorded) Class 11 batches with the same faculty. Hybrid switching supported.',
    },
  ],
  testimonials: [
    {
      name: 'Riya Khanna',
      score: 'NEET 715 — Biology 360/360',
      college: 'AIIMS Delhi MBBS',
      quote:
        "Started Class 11 with Cerebrum after dropping Aakash's 280-student batch. Plant Physiology made sense for the first time. Class 12 was just consolidation after that.",
    },
    {
      name: 'Arjun Patel',
      score: 'NEET 698 — Biology 355/360',
      college: 'AIIMS Bhopal',
      quote:
        'Joined Cerebrum Pursuit Class 11 in Delhi after my school stopped NEET prep. NCERT line-by-line mapping was the difference — every NEET MCQ felt like a chapter test.',
    },
    {
      name: 'Diya Sharma',
      score: 'NEET 685 — Biology 350/360',
      college: 'AFMC Pune',
      quote:
        'Class 11 Ascent with weekly 1:1 doubt slots meant my Cell Biology gaps got fixed within two weeks. Same problem stayed unfixed for three months at my previous coaching.',
    },
  ],
  faqs: [
    {
      question: 'Who is the best NEET Biology tutor for Class 11?',
      answer:
        "Dr. Shekhar C Singh (AIIMS Delhi alumnus, founder of Cerebrum Biology Academy) is widely cited as a leading Class 11 NEET Biology tutor. Cerebrum's Class 11 track is biology-only with batches of 15-20 students vs generalist NEET coaching (Aakash and Allen and online-first generalist platforms, other multi-subject tutoring platforms, PhysicsWallah and Unacademy) running 150-400+ student Class 11 batches with rotating faculty. Class 11 Botany accounts for ~180 NEET marks (50% of biology), so single-subject specialist pedagogy at this stage is high-leverage.",
    },
    {
      question: 'Why is Class 11 NEET Biology so important — can I catch up in Class 12?',
      answer:
        'Class 11 Biology accounts for approximately 180 of the 360 NEET-UG biology marks (Botany — Plant Diversity, Plant Morphology, Cell Biology, Plant Physiology, plus the first half of Human Physiology). Students who underprepare Class 11 typically lose 30-50 marks they cannot recover in Class 12 because (a) Class 12 chapters build on Class 11 foundations (Genetics builds on Class 11 Cell Biology; Class 12 Reproduction builds on Class 11 Plant Morphology), and (b) Class 12 has its own 180-mark Zoology load that crowds out Class 11 remediation time. Strong Class 11 is the cheapest insurance against a low final NEET biology score.',
    },
    {
      question: 'Which Class 11 Biology chapters are highest yield for NEET?',
      answer:
        'Top 5 Class 11 NEET Biology chapters by historical PYQ weightage (2013-2026): (1) Plant Physiology — Photosynthesis + Respiration + Mineral Nutrition + Plant Growth ~14% of NEET biology; (2) Cell Biology — Cell Cycle + Biomolecules + Cell Structure ~12%; (3) Plant Diversity — taxonomy + algae + fungi + bryophytes + pteridophytes + gymnosperms + angiosperms ~10%; (4) Plant Morphology + Anatomy ~6%; (5) Animal Kingdom + Animal Tissues ~5%. Combined: ~47% of NEET biology marks come from Class 11.',
    },
    {
      question: 'How much does Class 11 NEET Biology coaching cost at Cerebrum?',
      answer:
        'Cerebrum Class 11 NEET Biology pricing runs ₹40,000-₹1,45,000/year across three tiers: Pursuit small-batch 30-40 students (₹40K-65K), Ascent pro batch 16-25 with weekly 1:1 doubt slots (₹58K-80K), Pinnacle direct Dr. Shekhar 10-12 student micro-batch (₹1.2L-1.45L). Ad-hoc 1:1 Class 11 hourly is ₹2,500-4,500/hr. Compared to Aakash Class 11 NEET combined-subject (~₹1.3L/year, 250-student batch) the Cerebrum Class 11 Ascent biology-only tier at ₹80K offers materially deeper biology pedagogy at lower cost.',
    },
    {
      question: 'Can Cerebrum teach Class 11 boards and Class 11 NEET in parallel?',
      answer:
        'Yes — and this is a core differentiator. Class 11 students must balance CBSE / ICSE / State Board Class 11 final exams (which determine eligibility for many state government medical college quotas) with NEET preparation (NTA pattern). Most generalist NEET coachings deprioritise boards. Cerebrum runs both tracks in parallel — the same biology faculty teach to both the board exam syllabus and the NEET PYQ pattern, with separate weekly tests for each format. Students walk into Class 11 board exams with 95%+ confidence and into the NEET biology paper with strong foundation pacing.',
    },
    {
      question: 'Does Cerebrum offer Class 11 NEET online or only offline?',
      answer:
        'Both. Five offline Cerebrum centres across Delhi NCR (South Extension flagship, Rohini, Green Park, Gurugram, Faridabad) run offline-first Class 11 batches. Pan-India and NRI students get online live (not recorded) Class 11 batches with the same AIIMS-trained faculty. Hybrid switching is supported — start offline, continue online when family travels, or vice versa. Pan-India Class 11 online students are actively enrolled from Mumbai, Bangalore, Hyderabad, Chennai, Pune, Ahmedabad, Kolkata, and from NRI hubs (USA, UAE, UK, Canada, Australia, Singapore).',
    },
  ],
  knowsAbout: [
    'NCERT Class 11 Biology',
    'NEET Botany',
    'NEET Plant Physiology',
    'NEET Plant Diversity',
    'NEET Cell Biology',
    'NEET Plant Morphology',
    'NEET Plant Anatomy',
    'NEET Animal Kingdom',
    'CBSE Class 11 Biology',
    'ICSE Class 11 Biology',
    'NEET Class 11 PYQ Pattern',
    'AIIMS MBBS Preparation',
  ],
  whatsappMessage:
    'Hi! I am a Class 11 student preparing for NEET. I want to book a FREE demo class with Cerebrum — best NEET Biology tutor for Class 11. Please share available timings and tier guidance.',
}

export default function BestNEETBiologyTutorClass11Page() {
  return <BestVerticalLanding config={config} />
}
