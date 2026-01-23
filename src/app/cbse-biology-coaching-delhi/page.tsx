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
  title: 'CBSE Biology Coaching Delhi | Class 11-12 | Board + NEET',
  description:
    'Best CBSE Biology coaching in Delhi NCR. Class 11-12 board + NEET preparation. Expert faculty. Book free demo. Call +91-88264-44334',
  keywords: [
    'CBSE biology coaching',
    'CBSE biology classes',
    'biology coaching delhi',
    'cbse biology tuition',
  ],
}

const usps: USP[] = [
  {
    icon: 'book',
    title: 'CBSE Curriculum Expert',
    description:
      '15+ years experience in CBSE Biology coaching with deep understanding of board patterns.',
  },
  {
    icon: 'target',
    title: 'Dual Preparation',
    description: 'Unique approach covering both CBSE boards and competitive exams simultaneously.',
  },
  {
    icon: 'users',
    title: 'Small Batch Teaching',
    description: 'Maximum 15 students per batch ensuring individual attention and doubt clearing.',
  },
  {
    icon: 'check',
    title: 'NCERT Mastery',
    description: 'Line-by-line NCERT coverage with additional examples and CBSE question bank.',
  },
  {
    icon: 'book',
    title: 'Practical Training',
    description: 'Complete CBSE practical syllabus, experiments, and viva preparation.',
  },
  {
    icon: 'star',
    title: 'Board + NEET Success',
    description: 'Students score 95+ in boards AND qualify NEET with our integrated approach.',
  },
]

const faqs: FAQ[] = [
  {
    question: 'What is CBSE Biology coaching?',
    answer:
      'CBSE Biology coaching is specialized tuition focused on CBSE board syllabus, covering Class 11-12 Biology as per NCERT curriculum. It includes concept teaching, practical training, board exam preparation, and regular assessments aligned with CBSE pattern.',
  },
  {
    question: 'Can I prepare for NEET along with CBSE boards?',
    answer:
      'Yes, absolutely! Our CBSE Biology coaching includes NEET-specific topics and practice. Since 90% of NEET Biology comes from NCERT (CBSE syllabus), you can prepare for both simultaneously with right guidance and time management.',
  },
  {
    question: 'Do you follow CBSE latest curriculum?',
    answer:
      'Yes, our teaching is 100% aligned with latest CBSE curriculum, NCERT textbooks, and board exam patterns. We regularly update our material based on CBSE circular and examination reforms.',
  },
  {
    question: 'What is covered in CBSE Biology coaching?',
    answer:
      'Complete Class 11-12 NCERT syllabus, Chapter-wise concepts, Diagram practice, Answer writing, Practical training, Sample papers, Previous year papers, and Regular tests as per CBSE pattern.',
  },
  {
    question: 'Where are you located in Delhi?',
    answer:
      'We are located in South Extension, Delhi NCR - easily accessible from all parts of Delhi including South Delhi, Central Delhi, and nearby areas like Noida, Gurgaon. Metro connectivity and parking available.',
  },
]

export default function CBSEBiologyCoachingDelhiPage() {
  return (
    <>
      <LandingHero
        h1="CBSE Biology Coaching in Delhi NCR - Class 11-12"
        subheadline="Expert CBSE Biology coaching for Class 11-12. Prepare for both board exams and competitive exams with integrated approach."
        highlightedBadge="🎯 Board + NEET Preparation"
        trustBadges={['CBSE Experts', '15+ Years', 'Small Batches']}
      />

      {/* Urgency Banner */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <UrgencyBanner batchStartDate="Feb 14, 2026" seatsTotal={15} seatsFilled={13} />
        </div>
      </section>

      <LeadForm
        title="Book Free CBSE Biology Demo"
        description="Experience our CBSE-focused teaching methodology."
        courseType="CBSE Biology Coaching Delhi"
      />

      <USPsSection
        title="Why Choose Cerebrum for CBSE Biology"
        subtitle="Specialized CBSE coaching with board and competitive exam focus"
        usps={usps}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            CBSE Biology Coverage (Class 11-12)
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#e8ede8] bg-[#e8ede8] p-8 shadow-lg shadow-[#3d4d3d]/10">
              <h3 className="text-2xl font-bold text-slate-900">Class 11 CBSE</h3>
              <ul className="mt-6 space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                  Diversity in Living World (2 chapters)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                  Structural Organization (2 chapters)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                  Cell Biology (3 chapters)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                  Plant Physiology (4 chapters)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                  Human Physiology (5 chapters)
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#e8ede8] bg-[#e8ede8] p-8 shadow-lg shadow-[#3d4d3d]/10">
              <h3 className="text-2xl font-bold text-slate-900">Class 12 CBSE</h3>
              <ul className="mt-6 space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                  Reproduction (2 chapters)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                  Genetics & Evolution (3 chapters)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                  Biology & Human Welfare (2 chapters)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                  Biotechnology (2 chapters)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                  Ecology (3 chapters)
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-[#3d4d3d] p-8 text-white shadow-xl shadow-[#3d4d3d]/30 md:p-12">
            <h3 className="text-2xl font-bold">What Makes Us Delhi's Best CBSE Biology Coaching</h3>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <div className="text-4xl font-bold">15+</div>
                <p className="mt-2 text-white/90">Years Experience</p>
              </div>
              <div>
                <div className="text-4xl font-bold">95%</div>
                <p className="mt-2 text-white/90">Students Score 90+</p>
              </div>
              <div>
                <div className="text-4xl font-bold">10,000+</div>
                <p className="mt-2 text-white/90">Students Taught</p>
              </div>
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
