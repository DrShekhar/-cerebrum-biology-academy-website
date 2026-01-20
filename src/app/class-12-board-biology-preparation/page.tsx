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
  title: 'Class 12 Board Biology Preparation | CBSE Exam Coaching',
  description:
    'Specialized Class 12 board Biology preparation. Score 95+. Expert answer writing. Book free demo. Call +91-88264-44334',
  keywords: [
    'biology for 12 boards',
    'class 12 board biology',
    'board exam biology preparation',
    'cbse class 12 biology',
  ],
}

const usps: USP[] = [
  {
    icon: 'target',
    title: 'Board Exam Strategy',
    description:
      'Specific strategies for board exams: answer writing, time management, and scoring tactics.',
  },
  {
    icon: 'book',
    title: 'Chapter-wise Revision',
    description: 'Systematic chapter-wise revision covering all important concepts and diagrams.',
  },
  {
    icon: 'check',
    title: 'Sample Papers',
    description: '50+ CBSE sample papers and previous year papers with detailed solutions.',
  },
  {
    icon: 'trending',
    title: 'High-Yield Topics',
    description: 'Special focus on high-weightage topics that guarantee 70+ marks.',
  },
  {
    icon: 'clock',
    title: 'Crash Courses',
    description: 'Intensive crash courses available 3 months before board exams.',
  },
  {
    icon: 'star',
    title: 'Practical Preparation',
    description: 'Complete practical exam preparation with experiment videos and viva questions.',
  },
]

const faqs: FAQ[] = [
  {
    question: 'How is board exam preparation different from regular coaching?',
    answer:
      'Board exam preparation focuses on CBSE marking scheme, answer writing techniques, time management, high-weightage topics, diagram accuracy, and solving previous year papers. We train students to maximize marks within the board exam framework.',
  },
  {
    question: 'What is the minimum score I can expect?',
    answer:
      'With consistent attendance and practice, students typically score 85-95+ in boards. We focus on both understanding concepts and scoring techniques to ensure you achieve your target percentage.',
  },
  {
    question: 'Do you provide study material for board exams?',
    answer:
      'Yes, comprehensive material including: Chapter-wise notes, Diagram practice sheets, Previous year papers (10 years), Sample papers, Important questions, Formula sheets, and Quick revision notes.',
  },
  {
    question: 'When should I start board exam preparation?',
    answer:
      'Ideally start from beginning of Class 12. However, we offer crash courses starting 3-6 months before boards. Even with limited time, focused preparation can help you score 85+.',
  },
]

export default function Class12BoardBiologyPreparationPage() {
  return (
    <>
      <LandingHero
        h1="Class 12 Board Biology Preparation - Score 95+"
        subheadline="Specialized coaching for CBSE Class 12 board exams. Master answer writing, scoring strategies, and exam techniques."
        highlightedBadge="📝 Board Exam 2026 Batch Open"
        trustBadges={['Board Exam Experts', '95+ Scores', 'Crash Courses']}
      />

      <LeadForm
        title="Book Free Board Exam Demo"
        description="Learn our proven board exam strategies."
        courseType="Class 12 Board Biology Preparation"
      />

      <USPsSection
        title="Ace Your Class 12 Board Exams"
        subtitle="Comprehensive preparation focused on scoring maximum marks"
        usps={usps}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Board Exam Preparation Timeline
          </h2>
          <div className="mt-12 space-y-6">
            {[
              {
                phase: 'July-September',
                title: 'Foundation Phase',
                tasks: 'Complete syllabus, Concept clarity, NCERT thorough reading',
              },
              {
                phase: 'October-December',
                title: 'Practice Phase',
                tasks: 'Chapter tests, Diagram practice, Answer writing training',
              },
              {
                phase: 'January',
                title: 'Revision Phase',
                tasks: 'Complete syllabus revision, Sample papers, Mock tests',
              },
              {
                phase: 'February',
                title: 'Final Preparation',
                tasks: 'Previous year papers, Quick revision, Doubt clearing',
              },
            ].map((phase, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50 p-8 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold">
                        {phase.phase}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900">{phase.title}</h3>
                    </div>
                    <p className="mt-4 text-lg text-slate-600">{phase.tasks}</p>
                  </div>
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
