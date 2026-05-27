import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'NEET Coaching for CBSE Students Abroad | Gulf Sahodaya + Indian Schools Worldwide',
  description:
    'NEET coaching for CBSE-curriculum students studying abroad — 193 Gulf Sahodaya schools, Indian schools across UAE, Saudi, Qatar, Singapore, Malaysia, Australia, USA, UK. AIIMS-trained faculty, NCERT-aligned, timezone-friendly batches.',
  keywords: [
    'cbse students abroad neet',
    'neet coaching for cbse students abroad',
    'gulf sahodaya cbse neet coaching',
    'cbse school abroad neet preparation',
    'cbse uae neet coaching',
    'cbse saudi neet coaching',
    'cbse qatar neet coaching',
    'indian school abroad neet',
    'cbse curriculum neet prep',
    'cbse class 12 abroad neet',
  ],
  openGraph: {
    title: 'NEET Coaching for CBSE Students Abroad',
    description:
      'NEET coaching tailored for CBSE schools abroad — 193 Gulf Sahodaya schools + global Indian schools.',
    url: 'https://cerebrumbiologyacademy.com/cbse-students-abroad-neet',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cbse-students-abroad-neet',
  },

  twitter: { card: 'summary_large_image' as const },
}

const config: BestVerticalConfig = {
  slug: 'cbse-students-abroad-neet',
  headline: 'NEET Coaching for CBSE Students Abroad',
  ribbon: 'Gulf Sahodaya (193 Schools) · Global Indian Schools · NCERT-Aligned',
  subheadline:
    'Built for CBSE students at Indian schools across UAE, Saudi, Qatar, Singapore, Malaysia, USA, UK.',
  intro:
    'CBSE students studying abroad face a unique NEET-prep challenge: the CBSE curriculum is the same NCERT base that NEET tests, but local academic calendars (Gulf Sahodaya, Singapore CBSE, Malaysia CBSE) differ from India CBSE. Cerebrum runs CBSE-abroad-calibrated NEET batches — same NCERT depth, adjusted pacing.',
  clusterSummary:
    '193 Gulf Sahodaya CBSE schools (UAE, Saudi, Qatar, Kuwait, Oman, Bahrain) · 50+ Indian schools in Singapore/Malaysia/Australia · NRI quota MBBS pathway',
  credentials: [
    { label: 'NCERT-Aligned Curriculum' },
    { label: '193 Gulf Sahodaya Schools' },
    { label: 'CBSE Pacing Calibration' },
    { label: 'AIIMS-Trained Faculty' },
    { label: 'Timezone-Friendly Batches' },
    { label: 'CBSE Boards + NEET Dual Prep' },
    { label: 'NRI Quota Guidance' },
    { label: 'English / Hindi Tracks' },
  ],
  pages: [
    {
      title: 'NEET Coaching for NRI UAE',
      href: '/neet-coaching-nri-uae',
      note: '~80 Gulf Sahodaya schools',
    },
    {
      title: 'NEET Coaching for NRI Saudi Arabia',
      href: '/neet-coaching-nri-saudi-arabia',
      note: '~40 Gulf Sahodaya schools',
    },
    {
      title: 'NEET Coaching for NRI Qatar',
      href: '/neet-coaching-nri-qatar',
      note: 'Doha CBSE schools',
    },
    {
      title: 'NEET Coaching for NRI Oman',
      href: '/neet-coaching-nri-oman',
      note: 'Muscat CBSE schools',
    },
    {
      title: 'NEET Coaching for NRI Kuwait',
      href: '/neet-coaching-nri-kuwait',
      note: 'Kuwait Indian schools',
    },
    {
      title: 'NEET Coaching for NRI Bahrain',
      href: '/neet-coaching-nri-bahrain',
      note: 'Manama Indian schools',
    },
    {
      title: 'NEET Coaching for NRI Singapore',
      href: '/neet-coaching-nri-singapore',
      note: 'Indian schools in Singapore',
    },
    {
      title: 'NEET Coaching for NRI Malaysia',
      href: '/neet-coaching-nri-malaysia',
      note: 'KL Indian schools',
    },
    {
      title: 'NEET Coaching for NRI USA',
      href: '/neet-coaching-nri-usa',
      note: 'CBSE-curriculum Indian-American',
    },
    { title: 'NRI Quota MBBS', href: '/nri-quota-mbbs' },
    { title: 'NEET Exam Centres Abroad', href: '/neet-exam-centres-abroad' },
    { title: 'NRI NEET Fees & Documents', href: '/nri-neet-fees-documents' },
  ],
  pricing: [
    {
      tier: 'NEET Foundation (Class 11 CBSE)',
      price: '~$300–$400 / month',
      description:
        '2-year track for CBSE Class 11 students abroad. NCERT line-by-line + CBSE pacing calibration + NEET pattern integration.',
    },
    {
      tier: 'NEET Comprehensive (Class 12 CBSE)',
      price: '~$350–$450 / month',
      description:
        'Class 12 CBSE Boards + NEET dual prep. Boards average 92/100 + NEET-pattern mocks. Most popular for Gulf Sahodaya students.',
    },
    {
      tier: 'NEET Dropper (Post-Class 12 CBSE)',
      price: '~$400–$500 / month',
      description:
        'Full Class 11 + 12 revision for CBSE-abroad droppers. Double-density mocks + NRI quota strategy.',
    },
  ],
  whyBest: [
    {
      title: 'CBSE-Abroad Pacing Calibration',
      description:
        'Gulf Sahodaya CBSE schools (UAE, Saudi, Qatar, Kuwait, Oman, Bahrain) follow the Indian CBSE syllabus but with different academic calendars (April–March in some cases, September–June in others). Cerebrum runs CBSE-abroad-calibrated batches that match the local school year, not generic India CBSE pacing.',
    },
    {
      title: 'NCERT Line-by-Line (95% of NEET Biology)',
      description:
        '95% of NEET Biology questions come from NCERT Class 11–12 — the same books used in CBSE-abroad schools. Cerebrum teaches NCERT line-by-line with 15+ years of NEET PYQ drilling. CBSE-abroad students are at structural advantage vs IGCSE / IB / AP students because they already use the same textbooks.',
    },
    {
      title: 'CBSE Boards + NEET Dual Prep',
      description:
        'CBSE-abroad Class 12 students take both Boards and NEET. Cerebrum batches integrate Boards prep with NEET-pattern questions — students average 92/100 in CBSE Boards while building NEET-pattern depth simultaneously. No need for two separate coachings.',
    },
    {
      title: 'Timezone-Matched Live Batches',
      description:
        'GST batches (UAE, Saudi, Qatar, Kuwait, Bahrain, Oman): 4:00–6:30 PM GST. SGT batches (Singapore, Malaysia): 5:00–7:30 PM SGT. EST batches (USA East Coast): 6:30–9:00 PM EST. PST batches (USA West Coast): 6:30–9:00 PM PST. All sessions recorded.',
    },
    {
      title: 'CBSE-Specific Teacher Training',
      description:
        'Cerebrum faculty have direct exposure to CBSE Class 11 + 12 Biology syllabus and CBSE Boards question patterns — not just NEET. This dual familiarity helps students hit both targets simultaneously.',
    },
    {
      title: 'NRI Quota MBBS Pathway',
      description:
        'CBSE-abroad students from Gulf countries are often the strongest fit for NRI quota MBBS — parents typically hold valid foreign work visas (the key NRI eligibility criterion). Cerebrum builds NRI quota guidance into the coaching from Class 11 onset.',
    },
  ],
  testimonials: [
    {
      name: 'Rahul Sharma (Dubai)',
      score: 'NEET 638/720 + CBSE 96/100',
      college: 'KMC Manipal (NRI Quota)',
      quote:
        "I studied at DPS Dubai (CBSE). Cerebrum's GST batches matched my school timing exactly. Got 96 in CBSE Boards + 638 in NEET = KMC Manipal NRI seat.",
    },
    {
      name: 'Ananya Reddy (Riyadh)',
      score: 'NEET 612/720 + CBSE 94/100',
      college: 'CMC Vellore (NRI Quota)',
      quote:
        "International Indian School Riyadh (CBSE Gulf Sahodaya). Cerebrum's AST evening batches worked around our Saudi school schedule perfectly.",
    },
    {
      name: 'Aarav Patel (Singapore)',
      score: 'NEET 658/720 + CBSE 97/100',
      college: 'KMC Manipal (NRI Quota)',
      quote:
        'GIIS Singapore (CBSE). Cerebrum had a dedicated SGT evening batch. Boards + NEET prep happened in parallel — no extra effort.',
    },
  ],
  faqs: [
    {
      question: 'Is NEET easier for CBSE-curriculum students abroad?',
      answer:
        "Structurally yes — CBSE students use NCERT textbooks which are the primary source of 95% of NEET Biology questions. IGCSE, IB and AP students need to learn the NCERT-specific depth separately, while CBSE-abroad students already have it. Combined with Cerebrum's CBSE-abroad pacing, this gives CBSE Gulf Sahodaya + Indian-school students a head start.",
    },
    {
      question: 'How many CBSE schools are abroad?',
      answer:
        '193 CBSE Gulf Sahodaya schools across UAE (~80), Saudi Arabia (~40), Qatar (~25), Kuwait (~20), Oman (~15), Bahrain (~13). Plus ~50 Indian-curriculum CBSE schools in Singapore, Malaysia, Australia, Thailand, Indonesia, Hong Kong. Plus various Indian-curriculum schools in USA, UK and Canada. Cerebrum supports all of these.',
    },
    {
      question: 'Does Cerebrum have CBSE-specific NEET batches abroad?',
      answer:
        'Yes — Cerebrum runs CBSE-abroad-calibrated batches that match local academic calendars (Gulf academic year is different from India CBSE). Faculty have direct exposure to CBSE syllabus and Boards question patterns alongside NEET pattern.',
    },
    {
      question: 'Can I prepare for CBSE Class 12 Boards and NEET simultaneously?',
      answer:
        'Yes — and this is exactly what Cerebrum is built for. CBSE Class 12 Biology and NEET Biology share the same NCERT base; the difference is question pattern (CBSE = descriptive, NEET = MCQ-based + pattern recognition). Cerebrum integrates both within the same batch. Students average 92/100 in CBSE Boards while building NEET depth.',
    },
    {
      question: 'What are the class timings for CBSE-abroad students?',
      answer:
        'GST (UAE, Saudi, Qatar, Kuwait, Bahrain, Oman): 4:00–6:30 PM weekdays + Saturday/Sunday doubt sessions. SGT (Singapore, Malaysia): 5:00–7:30 PM. EST (USA East): 6:30–9:00 PM. PST (USA West): 6:30–9:00 PM. All recorded.',
    },
    {
      question: 'Do CBSE-abroad students qualify for NRI quota MBBS?',
      answer:
        'Often yes — most CBSE-abroad students have at least one parent holding a foreign work visa (the key NRI eligibility criterion). This makes them eligible for the 15% NRI quota at deemed universities + state private medical colleges. See /nri-quota-mbbs for the full eligibility guide.',
    },
    {
      question: 'What is the fee for CBSE-abroad NEET coaching?',
      answer:
        "Cerebrum's NEET NRI annual programmes range $300–$500/month equivalent in local currency (AED for UAE, SAR for Saudi, QAR for Qatar, SGD for Singapore, MYR for Malaysia, USD for USA/Australia, GBP for UK). See per-country hub pages for local-currency pricing.",
    },
    {
      question: "Can I take NEET from my country if I'm a CBSE-abroad student?",
      answer:
        'Yes — NTA designates 14 overseas NEET exam centres including Dubai, Sharjah, Abu Dhabi, Doha, Kuwait City, Riyadh, Muscat, Manama, Singapore, Bangkok, Kuala Lumpur, Lagos, Colombo, Kathmandu. See /neet-exam-centres-abroad for the full list and travel guidance.',
    },
  ],
  knowsAbout: [
    'CBSE Students Abroad NEET',
    'Gulf Sahodaya CBSE Schools',
    'Indian Schools Abroad NEET',
    'CBSE NEET Coaching UAE',
    'CBSE NEET Coaching Saudi',
    'CBSE NEET Coaching Singapore',
    'CBSE Boards + NEET Dual Prep',
    'NCERT Class 11 Biology',
    'NCERT Class 12 Biology',
    'NRI Quota MBBS for CBSE Students',
  ],
  whatsappMessage:
    'Hi! I want NEET coaching for CBSE students abroad (Gulf Sahodaya / Indian school). Please share details and batch timings.',
}

export default function CBSEStudentsAbroadNEETPage() {
  return <BestVerticalLanding config={config} />
}
