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
  title: 'NEET Biology Preparation Tips | Study Strategies 2026',
  description:
    'Expert NEET Biology preparation tips and study strategies. Learn from toppers. Score 340+. Book free counseling. Call +91-88264-44334',
  keywords: [
    'neet biology preparation tips',
    'biology study tips for neet',
    'neet biology strategy',
    'how to prepare for neet biology',
  ],
}

const usps: USP[] = [
  {
    icon: 'target',
    title: 'Topic-Wise Strategy',
    description:
      'Specific preparation strategies for Botany vs Zoology based on weightage and difficulty.',
  },
  {
    icon: 'clock',
    title: 'Time Management',
    description:
      'Proven time management techniques to cover entire syllabus and complete revisions.',
  },
  {
    icon: 'book',
    title: 'NCERT Mastery',
    description: 'How to extract 90% NEET questions from NCERT with right reading techniques.',
  },
  {
    icon: 'trending',
    title: 'Scoring Tactics',
    description: 'Learn which topics to prioritize, shortcuts, and smart guessing strategies.',
  },
  {
    icon: 'check',
    title: 'Revision Techniques',
    description:
      'Scientific revision methods: Spaced repetition, active recall, and Feynman technique.',
  },
  {
    icon: 'star',
    title: 'Expert Guidance',
    description: 'Personal mentorship from NEET toppers and experienced faculty.',
  },
]

const faqs: FAQ[] = [
  {
    question: 'What is the best way to prepare for NEET Biology?',
    answer:
      'Start with NCERT thoroughly (3-4 times), make topic-wise notes, practice 10,000+ MCQs, focus on diagrams and labeling, revise high-weightage topics, and take regular mock tests. Consistency is key - study 3-4 hours daily for Biology.',
  },
  {
    question: 'How many hours should I study Biology for NEET?',
    answer:
      'Dedicate 3-4 hours daily for Biology (out of 8-10 hours total NEET preparation). Divide time: 40% theory, 30% MCQ practice, 20% revision, 10% mock tests. Quality matters more than quantity.',
  },
  {
    question: 'Which topics should I focus on for maximum marks?',
    answer:
      'High-weightage topics: Genetics (20 marks), Human Physiology (18 marks), Ecology (16 marks), Reproduction (16 marks), Biotechnology (12 marks), Cell Biology (12 marks), Plant Physiology (10 marks). These 7 topics contribute 100+ marks.',
  },
  {
    question: 'How important are diagrams in NEET Biology?',
    answer:
      'Extremely important! 15-20% questions are diagram-based. Practice 300+ NCERT diagrams with proper labeling. Use blank diagram practice sheets for better retention.',
  },
  {
    question: 'Can I score 340+ in NEET Biology?',
    answer:
      'Yes, absolutely! With right preparation strategy: Master NCERT 100%, solve 10,000+ MCQs, practice 50+ mock tests, focus on diagrams, and revise 4-5 times. Our students regularly score 340-360.',
  },
]

export default function NEETBiologyPreparationTipsPage() {
  return (
    <>
      <LandingHero
        h1="NEET Biology Preparation Tips - Score 340+ Strategy"
        subheadline="Expert study strategies, time management techniques, and proven methods from NEET toppers to ace Biology section."
        highlightedBadge="🎯 Proven by 1000+ NEET Qualifiers"
        trustBadges={['Expert Strategies', 'Topper Methods', 'Free Counseling']}
      />

      <LeadForm
        title="Get Personalized Study Plan"
        description="Book free counseling session and get customized NEET Biology preparation strategy."
        courseType="NEET Biology Preparation Tips"
      />

      <USPsSection
        title="Master NEET Biology with Right Strategy"
        subtitle="Learn proven preparation techniques and study methods"
        usps={usps}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Month-by-Month Preparation Plan
          </h2>
          <div className="mt-12 space-y-6">
            {[
              {
                month: 'Months 12-10',
                focus: 'Foundation Building',
                tasks: 'Complete first reading of NCERT, Make notes, Understand concepts',
              },
              {
                month: 'Months 9-7',
                focus: 'Practice Phase',
                tasks: 'Solve 5000+ MCQs, Take chapter tests, Revise NCERT once',
              },
              {
                month: 'Months 6-4',
                focus: 'Advanced Practice',
                tasks: 'Solve remaining MCQs, Take mock tests, Focus on weak topics',
              },
              {
                month: 'Months 3-1',
                focus: 'Final Revision',
                tasks: 'Revise all topics 3 times, Solve previous papers, Daily mock tests',
              },
            ].map((phase, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50 p-8 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-blue-600">{phase.month}</span>
                      <h3 className="text-2xl font-bold text-slate-900">{phase.focus}</h3>
                    </div>
                    <p className="mt-4 text-lg text-slate-600">{phase.tasks}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white md:p-12">
            <h3 className="text-2xl font-bold">Daily Study Routine</h3>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <div className="text-4xl font-bold">40%</div>
                <p className="mt-2 text-white/90">Theory & Concepts</p>
              </div>
              <div>
                <div className="text-4xl font-bold">30%</div>
                <p className="mt-2 text-white/90">MCQ Practice</p>
              </div>
              <div>
                <div className="text-4xl font-bold">30%</div>
                <p className="mt-2 text-white/90">Revision & Tests</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />
      <LocationSection />
      <StickyCTA />
    </>
  )
}
