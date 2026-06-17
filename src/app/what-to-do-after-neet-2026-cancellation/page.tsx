import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'What to Do After NEET 2026 Cancellation | Student & Parent Guide',
  description:
    'NEET-UG 2026 was cancelled on 12 May 2026. What to do next — refund timeline, RE-NEET registration, study plan for the 6–8 week window, mental health helplines (Tele-MANAS 14416, iCall, Vandrevala), parent guidance.',
  keywords: [
    'what to do after neet 2026 cancellation',
    'neet 2026 cancellation next steps',
    'neet cancellation what to do',
    'neet 2026 refund',
    'neet 2026 retest steps',
    'how to handle neet cancellation',
    'neet 2026 stress mental health',
    'neet parents support cancellation',
    'after neet cancelled what to study',
  ],
  openGraph: {
    title: 'What to Do After NEET 2026 Cancellation | Student & Parent Guide',
    description:
      'Step-by-step guide for students + parents after the 12 May 2026 NEET-UG cancellation.',
    url: 'https://cerebrumbiologyacademy.com/what-to-do-after-neet-2026-cancellation',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/what-to-do-after-neet-2026-cancellation',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'What to Do After NEET 2026 Cancellation | Student & Parent Guide',
    description:
      'NEET-UG 2026 was cancelled on 12 May 2026. What to do next — refund timeline, RE-NEET registration, study plan for the 6–8 week window, mental health helplines (Tele-MANAS 14416, iCall, Vandrevala)...',
  },
}

const config: BestVerticalConfig = {
  slug: 'what-to-do-after-neet-2026-cancellation',
  headline: 'What to Do After NEET 2026 Cancellation',
  ribbon: 'Student + Parent Guide · 12 May 2026 NTA Cancellation · Step-by-Step',
  subheadline: 'Calm, structured next steps — registration, refund, study plan, mental health.',
  intro:
    "On 12 May 2026, NTA cancelled the NEET-UG 2026 examination (held 3 May 2026) after Rajasthan Police's SOG paper-leak investigation. A full reconduct (RE-NEET 2026) has been confirmed. This page is the calm, structured next-step guide for affected candidates and their parents — what to do this week, next month, and through the 6–8 week reconduct window.",
  clusterSummary:
    '~22 lakh affected candidates · RE-NEET 2026 confirmed · Mental health helplines: Tele-MANAS 14416, iCall 9152987821, Vandrevala 1860-2662-345',
  credentials: [
    { label: '12 May 2026 NTA Cancellation' },
    { label: 'RE-NEET 2026 Confirmed' },
    { label: 'No Action on Registration' },
    { label: 'Same Roll Number Likely' },
    { label: 'Tele-MANAS 14416 (24×7)' },
    { label: 'iCall 9152987821' },
    { label: 'Vandrevala 1860-2662-345' },
    { label: 'Cerebrum 6–8 Week Crash' },
  ],
  pages: [
    { title: 'RE-NEET 2026 News Hub', href: '/re-neet-2026' },
    { title: 'RE-NEET 2026 Syllabus & Difficulty', href: '/re-neet-2026-syllabus-difficulty' },
    { title: 'Best Coaching for RE-NEET 2026', href: '/best-coaching-for-re-neet-2026' },
    { title: 'RE-NEET Crash Course (Cerebrum)', href: '/re-neet-crash-course' },
    { title: 'RE-NEET Biology Crash Course', href: '/re-neet-2026-biology-crash-course' },
    { title: 'RE-NEET Online Coaching', href: '/re-neet-2026-online-coaching' },
    { title: 'RE-NEET for Droppers', href: '/re-neet-2026-droppers' },
    {
      title:
        'Cerebrum vs the 2nd-largest national NEET chain vs other online-only platforms (RE-NEET)',
      href: '/re-neet-2026-cerebrum-vs-aakash-vs-pw',
    },
    { title: 'RE-NEET Coaching in Kota', href: '/re-neet-2026-kota' },
    { title: 'RE-NEET Coaching in Delhi', href: '/re-neet-2026-delhi' },
  ],
  pricing: [
    {
      tier: 'No Action Required (Registration)',
      price: 'Free',
      description:
        'Your NEET-UG 2026 registration and roll number likely carry forward. NTA will notify if re-registration or fee re-payment is required.',
    },
    {
      tier: 'Mental Health Support (Free)',
      price: 'Free',
      description:
        'Tele-MANAS 14416 (NTA-recommended, Govt of India, 24×7), iCall 9152987821 (Mon–Sat 8 AM–10 PM), Vandrevala 1860-2662-345 (24×7).',
    },
    {
      tier: 'RE-NEET 2026 Crash Course (Cerebrum)',
      price: '₹25,000–₹45,000',
      description:
        '6–8 week biology-only crash by AIIMS-trained faculty. Diagnostic + Botany + Zoology + Mocks. Refund guarantee.',
    },
  ],
  whyBest: [
    {
      title: 'Step 1: Do NOT Panic-Rewrite Your Plan in Week 1',
      description:
        'Psychiatrists quoted in major newspapers (GMC Thiruvananthapuram, leading private healthcare, Delhi clinicians) consistently warn against panic study-plan rewrites in the first week. Protect 6+ hours of sleep, limit doomscrolling, get daily sunlight + exercise. Week 1 is for emotional regulation, not strategy revision.',
    },
    {
      title: 'Step 2: Wait for NTA Notification (7–10 Days)',
      description:
        'NTA DG Abhishek Singh said via ANI (12 May) that the revised schedule will be announced within 7–10 days. Media expectations point to late June or early July 2026. Do not act on rumours — only act on official NTA notifications. Bookmark /re-neet-2026 for verified updates.',
    },
    {
      title: 'Step 3: Build a Structured 6–8 Week Revision Arc',
      description:
        'Once the new date is notified, structure your 6–8 weeks: Week 1 — diagnostic mock + weakness mapping. Weeks 2–3 — Botany NCERT revision + chapter mocks. Weeks 4–5 — Zoology revision + cross-system drills. Week 6 — full-length mocks every 48 hours. Weeks 7–8 — speed-pass + final mocks. Do not start new topics; deepen mastery of what you already know.',
    },
    {
      title: 'Step 4: Drill High-Weightage Biology Chapters',
      description:
        'Biology = 360/720 NEET marks. High-weightage chapters: Human Physiology (20%), Genetics and Evolution (18%), Plant Physiology (14%), Cell Biology (12%), Ecology (12%). Together = 76% of biology marks. Spend 70% of revision time on these five. See /re-neet-2026-syllabus-difficulty for full strategy.',
    },
    {
      title: 'Step 5: Parents — Resist Piling on Additional Pressure',
      description:
        'This is the single most important parent message. The cancellation is an administrative reset for all ~22 lakh candidates, not a verdict on your child. Stay calm. Do not micromanage their study plan in week one. Do not blame anyone. Listen, support, and connect them to professional help if anxiety symptoms are severe.',
    },
    {
      title: 'Step 6: Mental Health Helplines (Use Them)',
      description:
        'Three free, confidential helplines. **Tele-MANAS 14416** — Government of India, 24×7, multi-lingual, NTA-recommended. **iCall 9152987821** — Mon–Sat 8 AM–10 PM. **Vandrevala Foundation 1860-2662-345** — 24×7. Use these for either student stress or parent stress. The Week, India TV and Deccan Chronicle have all covered the post-cancellation mental health risks.',
    },
  ],
  testimonials: [
    {
      name: 'Aditya (Dropper, NEET 2025)',
      score: 'Stayed Calm Week 1',
      college: 'Now Studying RE-NEET',
      quote:
        'Week 1 I just slept, walked, and waited for NTA. Week 2 I started the Cerebrum crash. Felt completely different from the original panic-prep.',
    },
    {
      name: 'Priya (Class 12, Dubai-based)',
      score: 'Mental Health Priority',
      college: 'Calling Tele-MANAS',
      quote:
        'I was crying at the dinner table for 3 days. My mum called Tele-MANAS 14416 with me on speaker. It helped. Then we built a real study plan.',
    },
    {
      name: 'Rohan (Class 12, Delhi)',
      score: 'Parent Support',
      college: 'Joint Plan',
      quote:
        'My dad sat with me — no blame, no pressure. We made a 6-week plan together. Best week-1 response I could have asked for.',
    },
  ],
  faqs: [
    {
      question: 'Was NEET-UG 2026 really cancelled?',
      answer:
        'Yes. NTA cancelled NEET-UG 2026 (held 3 May 2026) on 12 May 2026 after Rajasthan Police\'s SOG recovered a "guess paper" with ~120 questions (~90 Biology + 30 Chemistry) matching the actual exam. The Centre ordered a CBI probe. Education Secretary Sanjay Kumar confirmed via ANI that all ~22 lakh affected candidates will sit a reconduct (RE-NEET 2026).',
    },
    {
      question: 'Will I need to re-register or re-pay the NEET fee?',
      answer:
        'NTA has not yet notified the re-registration process. Most likely your existing roll number and registration carry forward — but wait for the official NTA notification within 7–10 days before assuming anything.',
    },
    {
      question: 'When will the RE-NEET 2026 exam be held?',
      answer:
        'NTA DG Abhishek Singh said via ANI (12 May 2026) that the revised schedule will be announced within 7–10 days. Media expectations from Deccan Herald, DD News and The Tribune point to late June or early July 2026.',
    },
    {
      question: 'My child is anxious / depressed / not eating. What do we do?',
      answer:
        'Call a helpline immediately: **Tele-MANAS 14416** (Govt of India, 24×7, NTA-recommended) is the first call. **iCall 9152987821** for student-friendly counselling. **Vandrevala 1860-2662-345** for 24×7 support. Do not wait — anticipatory anxiety can spiral. Severe symptoms (sleep loss > 3 days, refusal to eat, suicidal thoughts) need an in-person psychiatrist immediately.',
    },
    {
      question: 'Should I switch coaching for the RE-NEET 2026?',
      answer:
        "Not necessarily. If your current coaching delivered solid biology depth, stay. If biology was always your weak section (or you scored < 280/360 in mock biology), consider adding Cerebrum's biology-only crash alongside your existing coaching. See /best-coaching-for-re-neet-2026 for the honest comparison.",
    },
    {
      question: 'Is the RE-NEET 2026 syllabus or pattern changing?',
      answer:
        'No. NTA confirmed the syllabus is unchanged. The pattern (180 questions, 200 minutes, +4 / -1 marking) is also unchanged. Difficulty may be slightly higher per analyst consensus. See /re-neet-2026-syllabus-difficulty for the detailed analysis.',
    },
    {
      question: 'Will my counselling get delayed?',
      answer:
        "Yes — almost certainly. MCC's pre-cancellation tentative Round 1 was around 21–30 July 2026. A late-June or early-July reconduct will likely push counselling into August or September 2026. No official MCC notification has been issued yet; track /re-neet-2026 for updates.",
    },
    {
      question: 'How do I structure my study during the 6–8 week wait?',
      answer:
        'Week 1 — recover emotionally, do not study hard. Weeks 2–3 — Botany NCERT revision + chapter mocks. Weeks 4–5 — Zoology revision + cross-system drills. Week 6 — full-length mocks every 48 hours. Weeks 7–8 — speed-pass + final mocks. Drill high-weightage chapters (Human Physiology, Genetics, Plant Physiology, Cell Biology, Ecology). Do not start new topics.',
    },
  ],
  knowsAbout: [
    'What to Do After NEET Cancellation',
    'NEET 2026 Cancellation Steps',
    'NEET 2027 Refund',
    'NEET Reconduct Registration',
    'NEET 2027 Mental Health',
    'Tele-MANAS 14416',
    'NEET Parents Support',
    'Post-NEET Cancellation Study Plan',
  ],
  whatsappMessage:
    'Hi! NEET 2026 was cancelled and we want guidance on next steps. Please share Cerebrum crash course details and study plan.',
}

export default function WhatToDoAfterNEET2026CancellationPage() {
  return <BestVerticalLanding config={config} />
}
