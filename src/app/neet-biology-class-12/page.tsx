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

export const metadata: Metadata = {
  title: 'NEET Biology for Class 12 | Advanced Preparation Delhi NCR',
  description:
    'Class 12 NEET Biology coaching in Delhi NCR. Master advanced topics, ace NEET 2026. Book free demo. Call +91-88264-44334',
  keywords: ['class 12 biology neet', 'neet biology class 12', 'class 12 neet biology coaching'],
}

const usps: USP[] = [
  {
    icon: 'target',
    title: 'NEET-Focused Teaching',
    description:
      'Every topic taught with NEET question patterns, shortcuts, and scoring strategies in mind.',
  },
  {
    icon: 'trending',
    title: 'High-Yield Topics',
    description:
      'Special emphasis on high-weightage Class 12 topics like Genetics, Biotechnology, and Ecology.',
  },
  {
    icon: 'book',
    title: 'Revision + Practice',
    description:
      'Simultaneous Class 11 revision with Class 12 topics for complete NEET preparation.',
  },
  {
    icon: 'check',
    title: 'Mock Test Series',
    description:
      'Full-length NEET mock tests every week with detailed analysis and improvement strategies.',
  },
  {
    icon: 'clock',
    title: 'Intensive Preparation',
    description: 'Fast-paced coaching aligned with NEET exam timeline and board exam schedule.',
  },
  {
    icon: 'star',
    title: 'Score 340+ Strategy',
    description: 'Proven strategies to score 340+ out of 360 in NEET Biology section.',
  },
]

const faqs: FAQ[] = [
  {
    question: 'What makes Class 12 NEET Biology different from Class 11?',
    answer:
      'Class 12 topics are more application-based and carry higher weightage in NEET (55-60%). Topics like Genetics, Biotechnology, Reproduction, and Evolution require deeper understanding and more practice with NEET-style questions.',
  },
  {
    question: 'Will you cover Class 11 topics too?',
    answer:
      "Yes, we provide comprehensive Class 11 revision along with Class 12 topics. Our integrated approach ensures you're fully prepared for NEET which tests both Class 11 and 12 syllabus.",
  },
  {
    question: 'How many mock tests are included?',
    answer:
      'We conduct 20+ full-length NEET mock tests, 40+ chapter tests, and 10+ grand tests. Each test includes detailed analysis, rank prediction, and personalized improvement plan.',
  },
  {
    question: "Can I join if I haven't done Class 11 NEET preparation?",
    answer:
      'Yes, we have crash courses that cover Class 11 fundamentals alongside Class 12 topics. Our teachers identify your weak areas and provide targeted support.',
  },
]

export default function NEETBiologyClass12Page() {
  return (
    <>
      <LandingHero
        h1="NEET Biology for Class 12 - Score 340+ Strategy"
        subheadline="Master high-weightage Class 12 topics. Comprehensive preparation for NEET 2026 with expert faculty and proven methods."
        highlightedBadge="⚡ NEET 2026 - Only 150 Days Left"
        trustBadges={['340+ Score Strategy', 'Mock Tests', '99% Results']}
      />

      <LeadForm
        title="Book Free Class 12 NEET Demo"
        description="See how we help Class 12 students score 340+ in NEET Biology."
        courseType="NEET Biology Class 12"
      />

      <USPsSection
        title="Why Choose Our Class 12 NEET Program"
        subtitle="Intensive preparation designed for NEET 2026 aspirants"
        usps={usps}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Class 12 High-Weightage Topics
          </h2>
          <div className="mt-12 space-y-6">
            {[
              { title: 'Reproduction', weight: '12-14 questions', marks: '48-56 marks' },
              { title: 'Genetics & Evolution', weight: '10-12 questions', marks: '40-48 marks' },
              { title: 'Biotechnology', weight: '8-10 questions', marks: '32-40 marks' },
              { title: 'Ecology & Environment', weight: '8-10 questions', marks: '32-40 marks' },
              { title: 'Human Health', weight: '6-8 questions', marks: '24-32 marks' },
            ].map((topic, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6 shadow-lg"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{topic.title}</h3>
                  <p className="mt-1 text-slate-600">{topic.weight} in NEET</p>
                </div>
                <div className="rounded-lg bg-green-100 px-4 py-2 text-green-700 font-semibold">
                  {topic.marks}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />
      <LocationSection />
      <StickyCTA />
    </>
  )
}
