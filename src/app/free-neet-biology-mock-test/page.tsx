import { Metadata } from 'next'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { CerebrumAggregateRating } from '@/components/seo/CerebrumAggregateRating'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Biology Mock Test 2026 | Free Online | 90 Questions',
  description:
    'Take free NEET Biology mock test with 90 questions. NTA pattern, detailed solutions, performance analysis. Test your NEET readiness. By AIIMS faculty.',
  keywords: [
    'NEET biology mock test',
    'free NEET test online',
    'NEET practice test biology',
    'NEET 2026 mock test',
    'biology test series NEET',
  ],
  openGraph: {
    title: 'NEET Biology Mock Test 2026 | Free Online | 90 Questions',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'NEET Biology Mock Test 2026 | Free Online | 90 Questions' }],
    description:
      'Take free NEET Biology mock test with 90 questions. NTA pattern, detailed solutions, performance analysis. Test your NEET readiness. By AIIMS faculty.',
    url: `${BASE_URL}/free-neet-biology-mock-test`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Mock Test 2026',
    description:
      'Take free NEET Biology mock test with 90 questions. NTA pattern, detailed solutions, performance analysis. Test your NEE',
  },
  alternates: { canonical: `${BASE_URL}/free-neet-biology-mock-test` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this NEET Biology mock test 2026 really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — 100% free. WhatsApp +91-88264-44334 and we share the test instantly. No hidden charges, no email-gating, no credit card required. Free mock tests are part of Cerebrum's lead-magnet funnel (free → paid tier upgrade if students choose); the free version is genuinely complete on its own.",
      },
    },
    {
      '@type': 'Question',
      name: 'Who created this NEET Biology mock test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Created by Dr. Shekhar C Singh (AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy 2014) and the AIIMS-trained biology faculty team. 15+ years of NEET pedagogy and 680+ medical college selections inform the question design and difficulty calibration.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this updated for NEET 2026 (post 12 May cancellation)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — fully updated for NEET 2026 and the RE-NEET 2026 reconduct (NTA cancelled NEET-UG 2026 on 12 May 2026; reconduct expected late June / early July 2026). NTA confirmed the syllabus is unchanged, so the mock test pattern (90 questions, NCERT Class 11 + 12 biology) remains the canonical reference. See /re-neet-2026 for the latest timeline.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many free NEET Biology mock tests can I access?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum offers multiple free mock tests across the free resources hub: chapter-wise mocks (per Class 11 / 12 NCERT chapter), full-length NEET-pattern mocks (90 biology questions in 180 min), and PYQ-based mocks (last 5–10 years). WhatsApp +91-88264-44334 for the current free mock set. For unlimited mocks with India-wide rank disclosure and detailed error analysis, students typically upgrade to the Pursuit / Ascent paid tier.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is the difficulty of free Cerebrum mock tests vs the real NEET?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Calibrated to match real NEET difficulty within ±5%. Question design uses 15+ years of NEET PYQ archives, current NTA pattern (post-2024 changes), and Dr. Shekhar's AIIMS-trained pedagogy. Students who score 80%+ on Cerebrum free mocks typically score 320+/360 on actual NEET Biology.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do the free mock tests include explanations and solutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — every question includes a detailed solution explanation pointing back to the specific NCERT chapter and concept. For tougher questions, video walkthrough explanations are linked. Solutions are written by AIIMS-trained faculty, not auto-generated.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does free differ from paid Cerebrum coaching tiers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Free resources include: chapter mocks, full-length mocks, biology notes PDFs, video lectures (sample chapters). Paid tiers add: live AIIMS-trained faculty classes (Pursuit ₹40K, Ascent ₹58K, Pinnacle ₹1.2L per year), weekly 1:1 doubt slots, India-wide mock test rank, full mock test series (~20 mocks/year), WhatsApp same-day faculty doubts, NRI-quota guidance, dropper batch options. See /best-neet-biology-coaching-india for the full comparison.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I take this mock test from outside India (NRI)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Cerebrum free mock tests are available worldwide via WhatsApp at +91-88264-44334. For NRI students (USA, UAE, UK, Canada, Australia, etc.) preparing for the NEET-UG NRI quota route to Indian medical colleges, the mock tests are calibrated to the same NTA standard. See /neet-coaching-nri-usa, /neet-coaching-nri-uae for country-specific NRI coaching tiers.',
      },
    },
  ],
}

export default function FreeNeetBiologyMockTestPage() {
  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Biology Mock Tests',
          'NEET Biology Practice MCQs',
          'NEET Biology PYQ Practice',
          'Free NEET Resources',
          'NEET Biology Sample Papers',
        ]}
      />
      <CerebrumAggregateRating />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageContent />
    </>
  )
}
