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
  title: 'NEET Biology for Class 11 | Foundation Course Delhi NCR',
  description:
    'Best Class 11 NEET Biology coaching in Delhi NCR. Build strong foundation with expert faculty. Book free demo. Call +91-88264-44334',
  keywords: [
    'neet biology class 11',
    'biology lessons for neet class 11',
    'class 11 neet biology coaching',
    'neet foundation class 11',
  ],
}

const usps: USP[] = [
  {
    icon: 'book',
    title: 'Foundation Building',
    description:
      'Strong conceptual foundation in Class 11 topics that form the base for NEET Biology preparation.',
  },
  {
    icon: 'users',
    title: 'Expert Class 11 Faculty',
    description:
      'Teachers specialized in making Class 11 Biology concepts easy and interesting for young students.',
  },
  {
    icon: 'target',
    title: 'NCERT + NEET Focus',
    description:
      'Perfect blend of NCERT board syllabus and NEET-specific topics for dual preparation.',
  },
  {
    icon: 'clock',
    title: 'School-Friendly Schedule',
    description:
      "Flexible batches that don't interfere with school timing - evening and weekend options available.",
  },
  {
    icon: 'book',
    title: 'Simplified Study Material',
    description:
      'Age-appropriate study notes, diagrams, and mnemonics designed specifically for Class 11 students.',
  },
  {
    icon: 'check',
    title: 'Regular Practice Tests',
    description:
      'Weekly chapter tests and monthly cumulative tests to track progress and build exam temperament.',
  },
]

const faqs: FAQ[] = [
  {
    question: 'Why should I start NEET Biology preparation in Class 11?',
    answer:
      'Starting in Class 11 gives you 2 years to build a strong foundation, understand concepts deeply, and practice thoroughly. It reduces pressure in Class 12 and allows time for multiple revisions. Students who start in Class 11 typically score 50-70 marks higher in NEET Biology.',
  },
  {
    question: 'What topics are covered in Class 11 NEET Biology?',
    answer:
      'Class 11 covers Diversity in Living World, Biological Classification, Plant Kingdom, Animal Kingdom, Morphology of Flowering Plants, Anatomy, Cell Biology, Biomolecules, Cell Cycle, Photosynthesis, Respiration, Plant Growth, Digestion, Breathing, Circulation, and Excretion.',
  },
  {
    question: 'Will this coaching help with school board exams too?',
    answer:
      'Yes, our Class 11 NEET Biology program covers the complete NCERT syllabus required for board exams, plus additional NEET-specific topics. Students typically excel in both board exams and competitive preparations.',
  },
  {
    question: 'What is the class duration and schedule?',
    answer:
      'Classes are 2 hours each, 3-4 days per week. We offer morning (6-8 AM), evening (6-8 PM), and weekend batches to accommodate school schedules.',
  },
  {
    question: 'Is there any entrance test for admission?',
    answer:
      'No entrance test required for Class 11. We assess your current understanding during the free demo class and provide personalized guidance accordingly.',
  },
]

export default function NEETBiologyClass11Page() {
  return (
    <>
      <LandingHero
        h1="NEET Biology for Class 11 - Build Your Foundation"
        subheadline="Start your NEET journey early with expert guidance. Master Class 11 Biology concepts that form 50% of NEET questions."
        highlightedBadge="🎓 Class 11 Batch Starting Soon"
        trustBadges={['NCERT + NEET Coverage', 'School-Friendly Schedule', '99% Results']}
      />

      <LeadForm
        title="Book Free Class 11 Demo"
        description="Experience how we make Biology interesting and easy for Class 11 students."
        courseType="NEET Biology Class 11"
      />

      <USPsSection
        title="Why Start NEET Biology in Class 11"
        subtitle="Build a strong foundation early and gain a competitive advantage"
        usps={usps}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Class 11 Biology Syllabus Coverage
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Diversity in Living World', topics: 5 },
              { title: 'Structural Organization', topics: 4 },
              { title: 'Cell Biology', topics: 3 },
              { title: 'Plant Physiology', topics: 4 },
              { title: 'Human Physiology', topics: 5 },
            ].map((module, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-slate-900">{module.title}</h3>
                <p className="mt-2 text-slate-600">{module.topics} chapters covered</p>
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
