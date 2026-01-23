import { Metadata } from 'next'
import {
  LandingHero,
  LeadForm,
  USPsSection,
  FAQSection,
  LocationSection,
  StickyCTA,
} from '@/components/landing-pages'
import type { USP, FAQ } from '@/components/landing-pages'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { UrgencyBanner, SocialProofNotifications } from '@/components/landing-pages/UrgencyBanner'

export const metadata: Metadata = {
  title: 'NEET Biology Study Material | Notes, MCQs, Practice Papers',
  description:
    'Comprehensive NEET Biology study material. Updated notes, 10,000+ MCQs, previous year papers. Download free sample. Call +91-88264-44334',
  keywords: [
    'neet biology study material',
    'neet biology notes',
    'neet biology mcqs',
    'neet previous year papers',
  ],
}

const usps: USP[] = [
  {
    icon: 'book',
    title: 'Updated Content',
    description:
      'Study material updated annually based on latest NEET patterns and NTA guidelines.',
  },
  {
    icon: 'target',
    title: '10,000+ MCQs',
    description: 'Topic-wise MCQ bank with detailed explanations and difficulty levels marked.',
  },
  {
    icon: 'check',
    title: 'Previous Year Papers',
    description: 'Last 15 years NEET/AIPMT Biology papers with detailed solutions and analysis.',
  },
  {
    icon: 'book',
    title: 'Concept Notes',
    description: 'Concise notes with diagrams, flowcharts, and mnemonics for quick revision.',
  },
  {
    icon: 'trending',
    title: 'Digital + Printed',
    description: 'Available in both digital PDF format and high-quality printed books.',
  },
  {
    icon: 'star',
    title: 'Free Updates',
    description: 'Lifetime free updates and additional material shared through student portal.',
  },
]

const faqs: FAQ[] = [
  {
    question: 'What is included in the NEET Biology study material?',
    answer:
      'Complete package includes: Chapter-wise notes (500+ pages), 10,000+ MCQs with solutions, 15 years previous papers, Formula sheets, Diagrams booklet, Quick revision notes, and Monthly current affairs related to Biology.',
  },
  {
    question: 'Is the study material sufficient for NEET preparation?',
    answer:
      "Yes, our study material is comprehensive and covers 100% NEET Biology syllabus. It's based on NCERT + additional NEET-specific topics. However, we recommend combining it with regular classes for best results.",
  },
  {
    question: 'Can I get study material without joining classes?',
    answer:
      'Study material is primarily for our enrolled students. However, we offer a standalone study material package for self-study students. Contact us for pricing and availability.',
  },
  {
    question: 'How is your study material different from NCERT?',
    answer:
      'While NCERT is the base, our material includes: NEET-specific additional topics, 10,000+ practice MCQs, previous year questions integrated chapter-wise, shortcuts and mnemonics, and detailed diagrams with labeling practice.',
  },
]

export default function NEETBiologyStudyMaterialPage() {
  return (
    <>
      <LandingHero
        h1="NEET Biology Study Material - Complete Package"
        subheadline="Comprehensive notes, 10,000+ MCQs, previous year papers, and more. Everything you need for NEET Biology preparation."
        highlightedBadge="📚 2026 Edition Now Available"
        trustBadges={['10,000+ MCQs', '15 Years Papers', 'Free Updates']}
      />

      {/* Urgency Banner */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <UrgencyBanner batchStartDate="Feb 15, 2026" seatsTotal={15} seatsFilled={9} />
        </div>
      </section>

      <LeadForm
        title="Get Free Sample Study Material"
        description="Download free sample chapters and see the quality of our study material."
        courseType="NEET Biology Study Material"
      />

      <USPsSection
        title="What Makes Our Study Material Special"
        subtitle="Comprehensive, updated, and designed specifically for NEET success"
        usps={usps}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Complete Study Material Package
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Theory Notes',
                desc: '500+ pages chapter-wise notes',
                icon: '📖',
              },
              {
                title: 'MCQ Bank',
                desc: '10,000+ MCQs with solutions',
                icon: '📝',
              },
              {
                title: 'Previous Papers',
                desc: '15 years solved papers',
                icon: '📋',
              },
              {
                title: 'Diagrams',
                desc: '300+ labeled diagrams',
                icon: '🖼️',
              },
              {
                title: 'Quick Revision',
                desc: 'Formula sheets & mnemonics',
                icon: '⚡',
              },
              {
                title: 'Practice Tests',
                desc: '50+ chapter tests',
                icon: '🎯',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#e8ede8] bg-[#e8ede8] p-8 text-center shadow-lg shadow-[#3d4d3d]/10"
              >
                <div className="text-5xl">{item.icon}</div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonialsSection />

      <FAQSection faqs={faqs} />
      <LocationSection />
      <StickyCTA />

      {/* Social Proof Notifications */}
      <SocialProofNotifications />
    </>
  )
}
