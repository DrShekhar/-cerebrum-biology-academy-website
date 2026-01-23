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
  title: 'Class 12 Biology Tuition Delhi | CBSE Board Coaching',
  description:
    'Best Class 12 Biology tuition in Delhi NCR. Expert CBSE coaching. Score 95+. Practicals covered. Book free demo. Call +91-88264-44334',
  keywords: [
    'class 12 biology tuition',
    'biology tuition class 12',
    'CBSE biology class 12',
    'class 12 biology coaching delhi',
  ],
}

const usps: USP[] = [
  {
    icon: 'target',
    title: 'Board Exam Pattern',
    description:
      'Complete focus on CBSE board exam pattern, marking scheme, and scoring strategies.',
  },
  {
    icon: 'book',
    title: 'Answer Writing',
    description:
      'Special training in answer writing techniques to score maximum marks in descriptive questions.',
  },
  {
    icon: 'check',
    title: 'Practical Training',
    description:
      'Comprehensive practical exam preparation with all experiments and viva questions.',
  },
  {
    icon: 'trending',
    title: 'Previous Year Papers',
    description: 'Extensive practice with last 10 years board papers and sample papers.',
  },
  {
    icon: 'clock',
    title: 'Revision Classes',
    description: 'Intensive revision sessions before board exams covering entire syllabus.',
  },
  {
    icon: 'star',
    title: 'Score 95+ Guarantee',
    description: 'Proven track record of helping students score 95+ in Class 12 Biology boards.',
  },
]

const faqs: FAQ[] = [
  {
    question: 'How can I score 95+ in Class 12 Biology boards?',
    answer:
      'Master high-weightage topics (Genetics, Reproduction, Biotechnology), practice diagram drawing, write structured answers with keywords, understand application-based questions, revise regularly, and solve 10+ previous year papers. Our coaching covers all these systematically.',
  },
  {
    question: 'What topics are most important for Class 12 Biology?',
    answer:
      'High-scoring topics: Reproduction (14 marks), Genetics & Evolution (18 marks), Biotechnology (10 marks), Ecology (14 marks), Human Health (8 marks). These carry 64 marks out of 70. We provide special focus on these units.',
  },
  {
    question: 'Are practicals mandatory in Class 12?',
    answer:
      'Yes, practical exam is 30 marks (compulsory). We conduct all NCERT experiments, teach observation skills, diagram drawing, viva preparation, and project work guidance. Practical marks are crucial for overall percentage.',
  },
  {
    question: 'Can I join mid-session for board exam preparation?',
    answer:
      'Yes, we offer crash courses and mid-session batches. Our teachers quickly assess your level and provide targeted support for weak areas. Many students join 3-4 months before boards and still score 90+.',
  },
]

export default function Class12BiologyTuitionPage() {
  return (
    <>
      <LandingHero
        h1="Class 12 Biology Tuition - Score 95+ in Boards"
        subheadline="Expert CBSE board coaching for Class 12 Biology. Ace your boards with proven strategies and comprehensive preparation."
        highlightedBadge="📚 Board Exam 2026 Preparation"
        trustBadges={['95+ Scores', 'Practicals Covered', 'CBSE Experts']}
      />

      {/* Urgency Banner */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <UrgencyBanner batchStartDate="Feb 10, 2026" seatsTotal={15} seatsFilled={12} />
        </div>
      </section>

      <LeadForm
        title="Book Free Class 12 Biology Demo"
        description="See how we help students score 95+ in board exams."
        courseType="Class 12 Biology Tuition"
      />

      <USPsSection
        title="Why Choose Our Class 12 Biology Tuition"
        subtitle="Board-focused preparation with emphasis on scoring and concepts"
        usps={usps}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Class 12 Biology Marking Scheme
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-[#e8ede8] bg-[#e8ede8] p-8 shadow-lg shadow-[#3d4d3d]/10">
              <h3 className="text-2xl font-bold text-slate-900">Theory (70 marks)</h3>
              <ul className="mt-6 space-y-3">
                <li className="flex justify-between">
                  <span>Reproduction</span>
                  <span className="font-semibold">14 marks</span>
                </li>
                <li className="flex justify-between">
                  <span>Genetics & Evolution</span>
                  <span className="font-semibold">18 marks</span>
                </li>
                <li className="flex justify-between">
                  <span>Biotechnology</span>
                  <span className="font-semibold">10 marks</span>
                </li>
                <li className="flex justify-between">
                  <span>Ecology</span>
                  <span className="font-semibold">14 marks</span>
                </li>
                <li className="flex justify-between">
                  <span>Others</span>
                  <span className="font-semibold">14 marks</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#e8ede8] bg-[#e8ede8] p-8 shadow-lg shadow-[#3d4d3d]/10">
              <h3 className="text-2xl font-bold text-slate-900">Practical (30 marks)</h3>
              <ul className="mt-6 space-y-3">
                <li className="flex justify-between">
                  <span>Experiments</span>
                  <span className="font-semibold">10 marks</span>
                </li>
                <li className="flex justify-between">
                  <span>Spotting</span>
                  <span className="font-semibold">7 marks</span>
                </li>
                <li className="flex justify-between">
                  <span>Practical Record</span>
                  <span className="font-semibold">5 marks</span>
                </li>
                <li className="flex justify-between">
                  <span>Viva</span>
                  <span className="font-semibold">5 marks</span>
                </li>
                <li className="flex justify-between">
                  <span>Project</span>
                  <span className="font-semibold">3 marks</span>
                </li>
              </ul>
            </div>
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
