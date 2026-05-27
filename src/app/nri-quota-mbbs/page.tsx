import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'NRI Quota MBBS in India 2026 | NEET-UG Pathway for NRI/OCI Students',
  description:
    'NRI quota MBBS admission guide — 15% reserved seats at eligible Indian medical colleges. NEET-UG cutoffs, eligible colleges (deemed + private), application timeline, parent employment documentation. Coaching support for NRI/OCI students from USA, UAE, UK, Canada, Australia, Saudi.',
  keywords: [
    'nri quota mbbs',
    'nri quota mbbs india',
    'nri quota mbbs 2026',
    'nri quota mbbs colleges',
    'nri quota mbbs neet cutoff',
    'nri quota seat mbbs',
    'mbbs for nri oci students',
    'mbbs admission for nri 2026',
    'neet for nri students',
    'mbbs in india for nri',
    '15 percent nri quota mbbs',
    'nri quota fees india mbbs',
  ],
  openGraph: {
    title: 'NRI Quota MBBS in India 2026 | Pathway for NRI/OCI Students',
    description:
      'Complete guide to NRI quota MBBS in India — eligible colleges, NEET cutoffs, documents, application timeline.',
    url: 'https://cerebrumbiologyacademy.com/nri-quota-mbbs',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/nri-quota-mbbs',
  },

  twitter: { card: 'summary_large_image' as const },
}

const config: BestVerticalConfig = {
  slug: 'nri-quota-mbbs',
  headline: 'NRI Quota MBBS in India 2026',
  ribbon: '15% Reserved Seats · NEET-UG Required · NRI / OCI Eligible',
  subheadline: 'Complete pathway for NRI families — NEET cutoffs, eligible colleges, documents.',
  intro:
    "NRI quota MBBS is the 15% reserved-seat pool at eligible Indian medical colleges (deemed universities + select state-private institutions). NRI / OCI candidates compete in a separate merit list with lower NEET cutoffs than the General quota — typically 50th–80th percentile vs General quota's 90th+ percentile. Cerebrum supports NRI families through NEET preparation + admission guidance.",
  clusterSummary:
    '~5,000 NRI MBBS seats annually · Deemed universities + select state private colleges · Parent employment visa typically required',
  credentials: [
    { label: '15% Seats Reserved' },
    { label: 'NRI / OCI Eligible' },
    { label: 'Lower NEET Cutoff' },
    { label: 'Deemed + Private Colleges' },
    { label: 'AIIMS-Trained Coaching' },
    { label: '680+ Medical College Admissions' },
    { label: 'NEET NRI Specialist Faculty' },
    { label: 'Counselling Guidance' },
  ],
  pages: [
    { title: 'NEET Coaching USA (Hub)', href: '/neet-coaching-nri-usa' },
    { title: 'NEET Coaching UAE (Hub)', href: '/neet-coaching-nri-uae' },
    { title: 'NEET Coaching Canada (Hub)', href: '/neet-coaching-nri-canada' },
    { title: 'NEET Coaching UK (Hub)', href: '/neet-coaching-nri-uk' },
    { title: 'NEET Coaching Australia (Hub)', href: '/neet-coaching-nri-australia' },
    { title: 'NEET Coaching Saudi Arabia', href: '/neet-coaching-nri-saudi-arabia' },
    { title: 'NEET Coaching Singapore', href: '/neet-coaching-nri-singapore' },
    { title: 'NEET Coaching Qatar', href: '/neet-coaching-nri-qatar' },
    { title: 'NEET Coaching Oman', href: '/neet-coaching-nri-oman' },
    { title: 'NEET Coaching Kuwait', href: '/neet-coaching-nri-kuwait' },
    { title: 'NEET Coaching Bahrain', href: '/neet-coaching-nri-bahrain' },
    { title: 'NEET Coaching Malaysia', href: '/neet-coaching-nri-malaysia' },
    { title: 'NEET Coaching Nepal', href: '/neet-coaching-nri-nepal' },
    { title: 'NEET Exam Centres Abroad', href: '/neet-exam-centres-abroad' },
    { title: 'CBSE Students Abroad NEET', href: '/cbse-students-abroad-neet' },
    { title: 'NRI NEET Fees & Documents', href: '/nri-neet-fees-documents' },
  ],
  pricing: [
    {
      tier: 'NEET Foundation (Class 11)',
      price: '~$4,800 / year',
      description:
        '2-year NEET pathway. Foundation Class 11 → Comprehensive Class 12. Best for NRI families starting early. AIIMS-trained faculty.',
    },
    {
      tier: 'NEET Comprehensive (Class 12)',
      price: '~$5,400 / year',
      description:
        'Class 12 + final NEET preparation with NRI-quota guidance built in. Most popular for NRI families.',
    },
    {
      tier: 'NEET Dropper / Repeater',
      price: '~$6,000 / year',
      description:
        'Repeater year for NRI students who took NEET once. Full Class 11 + 12 revision + double-density mocks + NRI quota strategy.',
    },
  ],
  whyBest: [
    {
      title: '15% Seats Reserved Across Eligible Colleges',
      description:
        '~5,000 MBBS seats annually are reserved for NRI / OCI candidates at deemed universities (e.g., Manipal, KMC, JIPMER private, Christian Medical College Vellore NRI quota, SRM, Saveetha, etc.) and select state private medical colleges. Separate merit list, separate counselling.',
    },
    {
      title: 'Lower NEET Cutoffs (50th–80th Percentile)',
      description:
        "NRI quota cutoffs typically range from 50th to 80th percentile depending on college tier — vs the General quota's 90th+ percentile cliff. Students aiming for MBBS but missing General-quota cutoffs often find NRI quota the realistic path.",
    },
    {
      title: 'Eligibility: NRI / OCI / Parent on Foreign Work Visa',
      description:
        'Eligible candidates: (a) NRI children with at least one parent holding a valid foreign work visa for the academic year of admission, (b) OCI / PIO cardholders, (c) Foreign nationals. Specific documentation requirements vary by college and state.',
    },
    {
      title: 'Coaching Specifically Built for NRI Students',
      description:
        'Cerebrum is the rare NEET coaching brand built for NRI students — GST / EST / PST / AEDT-friendly batch timings, USD/AED/CAD/GBP-anchored pricing, AIIMS-trained faculty, and NRI-quota guidance built into the curriculum from Day 1.',
    },
    {
      title: 'Lower Total Cost than US / UK Pre-Med + Med School',
      description:
        'NRI quota MBBS in India typically costs $80K–$200K total (4.5-year MBBS + 1-year internship). US pre-med + med school = $400K–$700K. UK private med school = $250K–$400K. NRI families choosing the India MBBS route save materially and shorten the timeline.',
    },
    {
      title: 'Direct-to-MBBS Pathway (Faster Than US Route)',
      description:
        'NRI quota MBBS = direct 5.5-year MBBS + internship. US route = 4 years undergraduate + 4 years med school + 3–7 years residency. Students choosing the India MBBS path enter clinical practice 2–4 years faster.',
    },
  ],
  testimonials: [
    {
      name: 'Aanya Sharma (USA)',
      score: 'NEET 612/720',
      college: 'KMC Manipal (NRI Quota)',
      quote:
        "I was nervous about the NEET cutoff but Cerebrum's Pinnacle programme + NRI-quota guidance got me to KMC Manipal. Half the cost of US med school.",
    },
    {
      name: 'Rohan Verma (UAE)',
      score: 'NEET 595/720',
      college: 'Christian Medical College (NRI Quota)',
      quote:
        "I attended Dubai CBSE schools. Cerebrum's GST evening batches + NRI counselling helped me lock CMC Vellore through the NRI quota.",
    },
    {
      name: 'Priya Iyer (Canada)',
      score: 'NEET 580/720',
      college: 'SRM Chennai (NRI Quota)',
      quote:
        "Toronto-based — Cerebrum's ET evening batches were perfect. NRI quota route saved my family hundreds of thousands vs Canadian med school applications.",
    },
  ],
  faqs: [
    {
      question: 'What is the NRI quota MBBS in India?',
      answer:
        'NRI quota MBBS is a 15% reserved-seat pool at eligible Indian medical colleges. Approximately 5,000 MBBS seats annually are reserved for NRI (Non-Resident Indian), OCI (Overseas Citizen of India) and foreign-national candidates. Seats are primarily at deemed universities (Manipal, KMC, Christian Medical College Vellore, SRM, Saveetha) and select state private medical colleges.',
    },
    {
      question: 'What NEET cutoff do I need for NRI quota MBBS?',
      answer:
        "NRI quota NEET cutoffs typically range from the 50th to 80th percentile depending on college tier — much lower than the General quota's 90th+ percentile requirement. Top-tier deemed universities (KMC Manipal, CMC Vellore) require 70th–80th percentile; mid-tier and state-private colleges accept 50th–70th percentile. Exact cutoffs vary year-on-year.",
    },
    {
      question: 'Who is eligible for NRI quota MBBS in India?',
      answer:
        'Eligible candidates: (a) NRI students with at least one parent holding a valid foreign work visa during the admission academic year, (b) OCI / PIO cardholders, (c) Foreign nationals. Specific documentation requirements vary by college and state. Some colleges accept first-degree relatives (uncle / aunt) as sponsor; check per-college eligibility carefully.',
    },
    {
      question: 'Which Indian medical colleges offer NRI quota seats?',
      answer:
        "Major NRI quota MBBS colleges: KMC Manipal, KMC Mangalore, Christian Medical College Vellore (NRI quota seats), SRM Chennai, Saveetha Chennai, JIPMER private quota, Sharda University, Amrita Vishwa Vidyapeetham Kochi, MS Ramaiah Bangalore, JSS Mysore, BLDE Vijayapura, plus state private colleges in Karnataka, Tamil Nadu, Maharashtra, Gujarat, Telangana. Cerebrum's admission counselling covers all of these.",
    },
    {
      question: 'How much does NRI quota MBBS in India cost?',
      answer:
        'NRI quota fees typically range from USD 18,000/year (mid-tier state private) to USD 60,000/year (top-tier deemed universities like KMC Manipal). Total 5.5-year cost: USD 80,000 to USD 200,000 + living expenses (USD 8K–15K/year). Compared to US med school (USD 400K–700K total), the NRI quota path is materially more affordable.',
    },
    {
      question: 'When should NRI students start NEET preparation?',
      answer:
        "Ideal: Class 11 onset (April–May of Class 11) for the full 2-year Foundation → Comprehensive pathway via Cerebrum's NEET Foundation + Comprehensive tiers. Realistic: any time before NEET — even 4–6 months of focused tutoring can lift scores enough to clear NRI quota cutoffs at mid-tier colleges. Droppers/Repeaters: enrol within 30 days of NEET result for a structured 12-month Dropper programme.",
    },
    {
      question: 'What documents are required for NRI quota MBBS admission?',
      answer:
        "Typically: (1) Parent's foreign work visa / employment certificate for the academic year, (2) Sponsor affidavit (notarised), (3) Bank documents proving fee-payment capability, (4) NEET-UG scorecard, (5) Class 10 + 12 mark sheets, (6) Passport copies (student + sponsor), (7) Affidavit of NRI / OCI status, (8) College-specific application forms. Documentation varies by college and state — see /nri-neet-fees-documents for full checklist.",
    },
    {
      question: 'Is NEET-UG mandatory for NRI quota MBBS admission?',
      answer:
        'Yes. As per Medical Council of India / National Medical Commission rules, NEET-UG is the single qualifying exam for all MBBS admissions in India — including NRI quota seats. There is no separate exam or admission route that bypasses NEET. NRI quota only changes which merit list you compete in, not the qualifying exam.',
    },
    {
      question: 'Can Indian-origin students from USA / Canada / UAE take NEET?',
      answer:
        'Yes. NEET-UG is open to candidates from anywhere in the world. Indian-American, Indian-Canadian, NRI Gulf and other diaspora students sit NEET at one of 14 NTA-designated overseas exam centres (Dubai, Sharjah, Abu Dhabi, Doha, Kuwait City, Riyadh, Muscat, Manama, Singapore, Bangkok, Kuala Lumpur, Lagos, Colombo, Kathmandu) or fly to India.',
    },
    {
      question: 'How does Cerebrum support NRI quota MBBS applicants?',
      answer:
        'Cerebrum provides NEET-UG academic coaching with NRI-quota guidance built into the curriculum. We help on the academic side: NEET preparation, NRI cutoff guidance, eligible college list, application timeline. We do not provide visa, immigration, or legal documentation services — those are handled by your family or licensed admission consultants.',
    },
  ],
  knowsAbout: [
    'NRI Quota MBBS',
    'NEET-UG for NRI Students',
    'OCI MBBS Admission',
    'Foreign National MBBS India',
    '15% Reserved Seats',
    'Deemed University MBBS',
    'KMC Manipal NRI Quota',
    'CMC Vellore NRI Seats',
    'NRI Quota Cutoff',
    'NRI MBBS Fee Structure',
    'NRI Quota Documents',
  ],
  whatsappMessage:
    'Hi! I want guidance on NRI quota MBBS in India via NEET-UG. Please share details and current NRI-quota cutoff information.',
}

export default function NRIQuotaMBBSPage() {
  return <BestVerticalLanding config={config} />
}
