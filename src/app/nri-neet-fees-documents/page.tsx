import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'NRI NEET Fees & Documents | NRI Quota MBBS Application Checklist',
  description:
    'Complete NRI NEET fees + documents checklist — NEET-UG registration fees for overseas candidates, NRI quota MBBS fee structure ($18K–$60K/year), parent employment certificate, sponsor affidavit, NRI/OCI status proof, college-specific document requirements.',
  keywords: [
    'nri neet fees',
    'nri neet documents',
    'nri quota mbbs fees',
    'nri quota mbbs documents',
    'nri neet registration fees',
    'nri mbbs application documents',
    'parent employment certificate nri quota',
    'sponsor affidavit nri mbbs',
    'oci card mbbs admission',
    'nri quota fee structure deemed university',
  ],
  openGraph: {
    title: 'NRI NEET Fees & Documents Checklist',
    description: 'NRI quota MBBS fees + complete documentation checklist for NRI / OCI candidates.',
    url: 'https://cerebrumbiologyacademy.com/nri-neet-fees-documents',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/nri-neet-fees-documents',
  },
}

const config: BestVerticalConfig = {
  slug: 'nri-neet-fees-documents',
  headline: 'NRI NEET Fees & Documents Checklist',
  ribbon: 'Registration + Admission Documentation · Updated 2026',
  subheadline: 'Complete fees breakdown + admission paperwork for NRI / OCI MBBS applicants.',
  intro:
    "NRI quota MBBS admission requires (a) qualifying NEET-UG with adequate score, (b) submitting a precise documentation package per the college's NRI quota application form. Documentation errors are the #1 reason NRI admissions get rejected. This page is the canonical checklist — Cerebrum's coaching includes documentation-review support for enrolled students.",
  clusterSummary:
    'NEET fees: ₹13,700 (overseas candidates) · NRI MBBS tuition: $18K–$60K/year · 8–11 required documents · Parent visa is the critical eligibility document',
  credentials: [
    { label: 'NEET-UG Overseas Fee: ₹13,700' },
    { label: 'NRI MBBS Tuition: $18K–$60K' },
    { label: '8–11 Documents Required' },
    { label: 'Parent Visa Critical' },
    { label: 'Sponsor Affidavit' },
    { label: 'OCI Card Accepted' },
    { label: 'Notarisation Required' },
    { label: 'Cerebrum Doc Review' },
  ],
  pages: [
    { title: 'NRI Quota MBBS Hub', href: '/nri-quota-mbbs' },
    { title: 'NEET Exam Centres Abroad', href: '/neet-exam-centres-abroad' },
    { title: 'CBSE Students Abroad NEET', href: '/cbse-students-abroad-neet' },
    { title: 'NEET Coaching for NRI USA', href: '/neet-coaching-nri-usa' },
    { title: 'NEET Coaching for NRI UAE', href: '/neet-coaching-nri-uae' },
    { title: 'NEET Coaching for NRI Canada', href: '/neet-coaching-nri-canada' },
    { title: 'NEET Coaching for NRI UK', href: '/neet-coaching-nri-uk' },
    { title: 'NEET Coaching for NRI Australia', href: '/neet-coaching-nri-australia' },
    { title: 'NEET Coaching for NRI Saudi', href: '/neet-coaching-nri-saudi-arabia' },
    { title: 'NEET Coaching for NRI Singapore', href: '/neet-coaching-nri-singapore' },
  ],
  pricing: [
    {
      tier: 'NEET-UG Registration (Overseas Candidates)',
      price: '₹13,700 (one-time)',
      description:
        'NTA NEET-UG registration fee for overseas candidates (vs ₹1,700 General / ₹1,000 SC-ST domestic). Pay during February registration window.',
    },
    {
      tier: 'NRI Quota MBBS Tuition (Annual)',
      price: '$18,000 – $60,000 / year',
      description:
        'Mid-tier state private MBBS: $18K–$30K/year. Top deemed university (KMC Manipal, CMC Vellore): $35K–$60K/year. Plus living: $8K–$15K/year.',
    },
    {
      tier: 'Cerebrum Coaching + Documentation Support',
      price: '$3,600 – $6,000 / year',
      description:
        'NEET preparation includes documentation-review support for enrolled NRI students (we review your paperwork before submission, not legal advice).',
    },
  ],
  whyBest: [
    {
      title: 'Parent Employment Visa — The #1 Document',
      description:
        "The single most important document for NRI quota MBBS eligibility is the supporting parent's valid foreign work visa covering the academic year of admission. Visa expiry mid-year can void NRI eligibility. Cerebrum reviews visa documents during pre-admission to flag issues early.",
    },
    {
      title: 'Sponsor Affidavit (Notarised)',
      description:
        'Notarised affidavit from the sponsoring parent / first-degree relative declaring NRI status, financial sponsorship, and intent to bear MBBS fees. Format varies by college — Cerebrum maintains a template library.',
    },
    {
      title: 'OCI Card / PIO Card (If Applicable)',
      description:
        'OCI (Overseas Citizen of India) and PIO (Person of Indian Origin) cardholders are eligible for NRI quota. OCI card alone is sufficient; PIO requires additional documentation. Cards expire — check validity before NEET registration.',
    },
    {
      title: 'NEET-UG Scorecard + 10th + 12th Mark Sheets',
      description:
        'Three academic documents: NEET-UG scorecard (after May exam), Class 10 board mark sheet (CBSE / IGCSE / IB / state board), Class 12 board mark sheet. Equivalence certificates required for non-CBSE boards (IGCSE / IB / AP / state).',
    },
    {
      title: 'Bank Documents Proving Fee Capability',
      description:
        "Many NRI quota colleges require proof of fee-payment capability — typically a bank statement showing 1.5x annual fee in liquid assets ($30K–$90K depending on college). Some accept Letter of Credit (LoC) from sponsor's bank.",
    },
    {
      title: 'Passport Copies + Address Proof',
      description:
        "Valid passport of student (10+ years old typically requires recent renewal). Address proof: utility bill, lease agreement, parent's visa-stamped passport. Some colleges accept embassy-issued NRI certificate.",
    },
  ],
  testimonials: [
    {
      name: 'Rajiv Mehta (UAE)',
      score: 'NEET 612/720 + KMC Manipal',
      college: 'KMC Manipal (NRI Quota)',
      quote:
        "My visa was expiring 2 months after the academic year start. Cerebrum's pre-admission review caught it and we renewed in time. Without that, the admission would have been voided.",
    },
    {
      name: 'Anjali Krishnan (USA)',
      score: 'NEET 598/720 + SRM Chennai',
      college: 'SRM Chennai (NRI Quota)',
      quote:
        'OCI card paperwork was confusing — Cerebrum walked us through the exact documentation flow. Smooth admission.',
    },
    {
      name: 'Karan Singh (Saudi)',
      score: 'NEET 580/720 + Saveetha',
      college: 'Saveetha Chennai (NRI Quota)',
      quote:
        "Sponsor affidavit format varied by college. Cerebrum had templates ready and matched the right format to Saveetha's requirements.",
    },
  ],
  faqs: [
    {
      question: 'What is the NEET-UG fee for overseas / NRI candidates?',
      answer:
        'NTA NEET-UG registration fee for overseas candidates is ₹13,700 (one-time, paid during February registration window). This is significantly higher than the domestic fee (₹1,700 General / ₹1,000 SC-ST) but is a one-time exam fee, separate from MBBS tuition.',
    },
    {
      question: 'How much does NRI quota MBBS in India cost?',
      answer:
        'NRI quota MBBS tuition: $18,000 – $60,000 / year depending on college tier. Mid-tier state private colleges: $18K–$30K/year. Top deemed universities (KMC Manipal, CMC Vellore, SRM, Saveetha): $35K–$60K/year. Plus living costs: $8K–$15K/year. Total 5.5-year cost: $80K–$200K + living.',
    },
    {
      question: 'What documents are required for NRI quota MBBS admission?',
      answer:
        "Typical document checklist: (1) Parent's foreign work visa (valid for academic year), (2) Notarised sponsor affidavit, (3) Bank statement proving fee capability ($30K–$90K liquid), (4) NEET-UG scorecard, (5) Class 10 mark sheet, (6) Class 12 mark sheet (with equivalence cert if non-CBSE), (7) Passport copies (student + sponsor), (8) NRI / OCI / PIO status proof, (9) College-specific application form, (10) Notarised affidavit of intent, (11) Photographs. Document set varies by college.",
    },
    {
      question:
        "My parent's work visa expires mid-academic-year. Am I still eligible for NRI quota?",
      answer:
        "Typically no — colleges require the supporting parent's visa to be valid throughout the academic year of admission (sometimes throughout the full MBBS course). Renew the visa before submitting NRI quota application, or apply through a different sponsoring relative whose visa runs longer. Cerebrum reviews this during pre-admission.",
    },
    {
      question: 'Is an OCI card sufficient for NRI quota MBBS eligibility?',
      answer:
        'Yes — OCI cardholders are eligible for NRI quota MBBS in India. OCI card alone is sufficient documentation (along with the standard NEET scorecard + academic + financial documents). PIO cardholders are also eligible but may need additional supporting documents.',
    },
    {
      question: 'Do I need to translate / notarise documents from a non-English-speaking country?',
      answer:
        "Yes. Documents in non-English languages (Arabic for UAE/Saudi, German, French, etc.) must be translated by a certified translator and notarised. Many colleges require apostille certification for documents issued outside India. Cerebrum provides guidance but doesn't do legal translation work (handled by licensed translation services).",
    },
    {
      question: 'Can a first-degree relative (uncle / aunt) be the NRI quota sponsor?',
      answer:
        "Some colleges accept first-degree relatives (uncle, aunt, grandparent) as the NRI quota sponsor — others require a parent. Eligibility varies by college and state. Check per-college rules carefully; Cerebrum's pre-admission review covers this.",
    },
    {
      question: 'When are NRI quota MBBS applications submitted?',
      answer:
        'NRI quota counselling typically opens in July–August (after NEET-UG results in June). Application windows vary by college and state — some have 7-day windows, others 30-day windows. Round-2 and Round-3 (mop-up) rounds extend into September–October. Cerebrum sends application-date alerts to enrolled students.',
    },
    {
      question: 'Does Cerebrum help with NRI quota MBBS admission documentation?',
      answer:
        'Yes — Cerebrum provides pre-admission document review for enrolled NRI students. We help you organise the documentation package, flag issues (expired visa, missing notarisation, format mismatches), and recommend college-specific requirements. We do NOT provide legal / visa / immigration services — those require licensed consultants.',
    },
  ],
  knowsAbout: [
    'NRI NEET Fees',
    'NRI NEET Documents',
    'NRI Quota MBBS Fee Structure',
    'NRI Quota Documents',
    'Parent Employment Certificate',
    'Sponsor Affidavit NRI Quota',
    'OCI Card MBBS Admission',
    'NEET Registration Fees Overseas',
    'NRI Admission Documentation',
    'NRI Quota Application Process',
  ],
  whatsappMessage:
    'Hi! I want guidance on NRI NEET fees + documents for NRI quota MBBS admission. Please share the checklist.',
}

export default function NRINEETFeesDocumentsPage() {
  return <BestVerticalLanding config={config} />
}
