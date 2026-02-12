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
  title: 'Class 11 Biology Tuition Delhi | CBSE Board Coaching',
  description:
    'Best Class 11 Biology tuition in Delhi NCR. Expert CBSE board coaching. Score 95+. Book free demo. Call +91-88264-44334',
  keywords: [
    'class 11 biology tuition',
    'biology tuition class 11',
    'CBSE biology class 11',
    'class 11 biology coaching delhi',
  ],
}

const usps: USP[] = [
  {
    icon: 'book',
    title: 'CBSE Board Focused',
    description: 'Complete NCERT syllabus coverage with board exam pattern and marking scheme.',
  },
  {
    icon: 'users',
    title: 'Experienced Teachers',
    description: 'Faculty with 15+ years experience in teaching CBSE Class 11 Biology.',
  },
  {
    icon: 'target',
    title: 'Score 95+ Strategy',
    description: 'Proven methods to score 95+ marks in Class 11 Biology board exams.',
  },
  {
    icon: 'check',
    title: 'Practicals Covered',
    description: 'Complete practical training, viva preparation, and lab work guidance.',
  },
  {
    icon: 'book',
    title: 'Diagram Practice',
    description: 'Special sessions for diagram drawing and labeling - crucial for board exams.',
  },
  {
    icon: 'clock',
    title: 'Regular Tests',
    description: 'Weekly class tests and monthly unit tests matching board exam pattern.',
  },
]

const faqs: FAQ[] = [
  {
    question: 'What is the best Class 11 Biology tuition in Delhi?',
    answer:
      'Cerebrum Biology Academy offers specialized Class 11 tuition with CBSE board focus, experienced teachers, small batches, and comprehensive study material. We ensure students score 95+ in boards while building strong foundation for competitive exams.',
  },
  {
    question: 'How can I score 95+ in Class 11 Biology boards?',
    answer:
      "Master NCERT thoroughly, practice diagram drawing, understand concepts (don't memorize), write proper answers with keywords, revise regularly, and solve previous year papers. Our coaching focuses on all these aspects systematically.",
  },
  {
    question: 'Are practicals covered in the coaching?',
    answer:
      'Yes, we conduct regular practical sessions covering all NCERT experiments, viva questions, observation skills, and lab techniques. Practical exams preparation is an integral part of our Class 11 program.',
  },
  {
    question: 'What is the fee structure for Class 11 Biology?',
    answer:
      'Fee varies based on batch type (regular/intensive) and duration. We offer monthly and quarterly payment options. Contact us for detailed fee structure and available scholarships.',
  },
]

export default function Class11BiologyTuitionPage() {
  return (
    <>
      <LandingHero
        h1="Class 11 Biology Tuition - Score 95+ in CBSE Boards"
        subheadline="Expert coaching for Class 11 CBSE Biology. Build strong foundation and excel in board exams with personalized attention."
        highlightedBadge="🎓 Board Exam Special Batches"
        trustBadges={['CBSE Experts', 'Practicals Covered', '95+ Scores']}
      />

      {/* Urgency Banner */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <UrgencyBanner batchStartDate="Feb 12, 2026" seatsTotal={15} seatsFilled={10} />
        </div>
      </section>

      <LeadForm
        title="Book Free Class 11 Biology Demo"
        description="Experience our board-focused teaching methodology."
        courseType="Class 11 Biology Tuition"
      />

      <USPsSection
        title="Why Choose Our Class 11 Biology Tuition"
        subtitle="Comprehensive board preparation with focus on concepts and scoring"
        usps={usps}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            CBSE Class 11 Biology Syllabus
          </h2>
          <div className="mt-12 space-y-6">
            {[
              { unit: 'Diversity in Living World', chapters: 2, marks: 7 },
              { unit: 'Structural Organization', chapters: 2, marks: 12 },
              { unit: 'Cell: Structure and Function', chapters: 3, marks: 15 },
              { unit: 'Plant Physiology', chapters: 4, marks: 18 },
              { unit: 'Human Physiology', chapters: 5, marks: 18 },
            ].map((unit, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-[#e8ede8] bg-[#e8ede8] p-6 shadow-lg shadow-[#3d4d3d]/10"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{unit.unit}</h3>
                  <p className="mt-1 text-slate-600">{unit.chapters} chapters</p>
                </div>
                <div className="rounded-lg bg-[#e8ede8] px-4 py-2 text-[#3d4d3d] font-semibold">
                  {unit.marks} marks
                </div>
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
