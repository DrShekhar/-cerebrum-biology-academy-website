import { Metadata } from 'next'
import {
  LandingHero,
  LeadForm,
  USPsSection,
  FAQSection,
  LocationSection,
  StickyCTA,
} from '@/components/landing-pages'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { UrgencyBanner, SocialProofNotifications } from '@/components/landing-pages/UrgencyBanner'
import type { USP, FAQ } from '@/components/landing-pages'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Delhi NCR | Top Institute 2026',
  description:
    'Best NEET Biology coaching in Delhi NCR. Expert faculty, small batches, 98% results. Book free demo class at South Extension. Call +91-88264-44334',
  keywords: [
    'neet biology',
    'neet biology classes',
    'neet biology academy',
    'neet biology coaching delhi ncr',
    'neet biology coaching south extension',
    'best neet biology coaching',
  ],
  openGraph: {
    title: 'NEET Biology Coaching in Delhi NCR',
    description:
      'Premier NEET Biology coaching with 15+ years experience. Small batches, expert faculty, 98% results. Book free demo.',
    type: 'website',
  },
}

const usps: USP[] = [
  {
    icon: 'award',
    title: '15+ Years of Excellence',
    description:
      'Established NEET coaching institute since 2009 with proven track record and thousands of successful students.',
  },
  {
    icon: 'users',
    title: 'Expert Faculty',
    description:
      'Teachers from IIT, AIIMS, and top medical colleges with deep understanding of NEET Biology patterns.',
  },
  {
    icon: 'target',
    title: 'Small Batches',
    description:
      'Maximum 15 students per batch ensuring personalized attention and effective doubt clearing for every student.',
  },
  {
    icon: 'trending',
    title: '98% Results',
    description:
      'Proven track record of NEET qualifications with students scoring 300+ in Biology section consistently.',
  },
  {
    icon: 'book',
    title: 'Comprehensive Material',
    description:
      'Updated study notes, MCQs, previous year papers, and practice tests aligned with latest NEET patterns.',
  },
  {
    icon: 'clock',
    title: 'Regular Testing',
    description:
      'Weekly tests with detailed performance analysis, topic-wise assessments, and full-length mock exams.',
  },
  {
    icon: 'check',
    title: 'Doubt Clearing',
    description:
      'Daily doubt sessions, one-on-one guidance, and dedicated support to ensure complete concept clarity.',
  },
  {
    icon: 'map',
    title: 'Prime Location',
    description:
      'Easily accessible center in South Extension, Delhi NCR with metro connectivity and parking facilities.',
  },
  {
    icon: 'clock',
    title: 'Flexible Batches',
    description:
      'Morning, evening, and weekend batches available to suit your school schedule and preparation timeline.',
  },
  {
    icon: 'star',
    title: 'Free Demo Class',
    description:
      'Experience our unique teaching methodology before enrolling. No obligations, just pure learning experience.',
  },
]

const faqs: FAQ[] = [
  {
    question: 'What makes Cerebrum the best NEET Biology coaching in Delhi NCR?',
    answer:
      'With 15+ years of experience, expert faculty from IIT/AIIMS, small batch sizes of maximum 15 students, and 98% results, Cerebrum offers comprehensive NEET Biology preparation that helps students achieve their medical dreams. Our personalized approach, updated study material, and proven teaching methodology set us apart.',
  },
  {
    question: 'What is covered in your NEET Biology coaching program?',
    answer:
      'Our program covers the complete NEET Biology syllabus including Botany (Diversity in Living World, Structural Organization, Cell Biology, Plant Physiology, Genetics) and Zoology (Human Physiology, Reproduction, Genetics, Evolution, Ecology). We provide topic-wise classes, 10,000+ practice questions, mock tests, and previous year paper analysis.',
  },
  {
    question: 'What is the batch size for NEET Biology classes?',
    answer:
      "We maintain small batches of maximum 15 students to ensure personalized attention and effective doubt clearing for every student. This allows our teachers to track individual progress and provide customized guidance based on each student's strengths and weaknesses.",
  },
  {
    question: 'Where is Cerebrum Biology Academy located?',
    answer:
      'We are located in South Extension, New Delhi, easily accessible from all parts of Delhi NCR including Noida, Gurgaon, Faridabad, and Ghaziabad. The center is well-connected by metro (5-minute walk from South Extension metro station) and has ample parking facilities.',
  },
  {
    question: 'Can I join NEET coaching in Class 11?',
    answer:
      'Yes, we highly recommend starting NEET Biology preparation in Class 11. Starting early helps build a strong foundation, allows more time for revision, and reduces pressure in Class 12. We offer specialized Class 11 NEET batches that cover both board syllabus and NEET-specific topics.',
  },
  {
    question: 'Do you offer online NEET Biology classes?',
    answer:
      'Yes, we provide both offline classes at our South Extension center and live online classes on Zoom with recorded lecture access. Our online classes maintain the same quality of teaching with interactive doubt sessions, regular tests, and comprehensive study material delivered digitally.',
  },
  {
    question: 'How can I book a free demo class?',
    answer:
      'You can book a free demo class by filling the form on this page, calling us at +91-88264-44334, or chatting with us on WhatsApp. Our counselors will schedule a demo at your convenient time and answer all your questions about the course structure, faculty, and fee structure.',
  },
]

export default function NEETBiologyCoachingDelhiNCRPage() {
  return (
    <>
      <LandingHero
        h1="Premier NEET Biology Coaching in Delhi NCR"
        subheadline="Achieve Your Medical Dream with Expert Faculty, Small Batches, and Proven Results. Join India's Leading NEET Biology Institute."
        highlightedBadge="🎯 NEET 2026 Admissions Open - Limited Seats"
        trustBadges={['15+ Years Experience', '10,000+ Students', '98% Results']}
      />

      {/* Urgency Banner - Seats & Batch Start Date */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <UrgencyBanner batchStartDate="Feb 5, 2026" seatsTotal={15} seatsFilled={12} />
        </div>
      </section>

      <LeadForm
        title="Book Your Free Demo Class"
        description="Experience our unique teaching methodology. Fill the form and we'll contact you within 24 hours."
        courseType="NEET Biology Coaching Delhi NCR"
      />

      <USPsSection
        title="Why Choose Cerebrum Biology Academy"
        subtitle="We provide comprehensive NEET Biology preparation with proven results and personalized attention"
        usps={usps}
      />

      {/* Course Details Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="border-l-4 border-[#4a5d4a] pl-6 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Comprehensive NEET Biology Syllabus Coverage
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Our NEET Biology coaching program covers the entire syllabus with topic-wise
              preparation strategy, previous year question analysis, and regular mock tests.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-[#e8ede8] bg-[#e8ede8] p-8 shadow-lg shadow-[#3d4d3d]/10">
                <h3 className="text-2xl font-bold text-slate-900">Botany</h3>
                <ul className="mt-6 space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                    Diversity in Living World
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                    Structural Organization in Plants
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                    Cell Structure and Function
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                    Plant Physiology
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                    Genetics and Evolution
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-[#e8ede8] bg-[#e8ede8] p-8 shadow-lg shadow-[#3d4d3d]/10">
                <h3 className="text-2xl font-bold text-slate-900">Zoology</h3>
                <ul className="mt-6 space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                    Human Physiology
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                    Reproduction and Development
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                    Genetics and Molecular Biology
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                    Evolution and Diversity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#4a5d4a]" />
                    Ecology and Environment
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 rounded-2xl bg-[#3d4d3d] p-8 text-white shadow-xl shadow-[#3d4d3d]/30 md:p-12">
              <h3 className="border-l-4 border-[#e8ede8] pl-4 text-2xl font-bold">What You Get</h3>
              <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📚</span>
                  <span>Comprehensive Study Material</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📝</span>
                  <span>10,000+ Practice Questions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <span>Weekly Topic Tests</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <span>Full-Length Mock Tests</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📖</span>
                  <span>Previous Year Papers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <span>Daily Doubt Clearing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section - Social Proof */}
      <VideoTestimonialsSection />

      <FAQSection faqs={faqs} />

      <LocationSection />

      <StickyCTA />

      {/* Social Proof - Live Activity Notifications */}
      <SocialProofNotifications />

      {/* Schema Markup for LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Cerebrum Biology Academy',
            description:
              'Best NEET Biology coaching in Delhi NCR with expert faculty and proven results',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'South Extension',
              addressLocality: 'New Delhi',
              addressRegion: 'Delhi',
              addressCountry: 'IN',
            },
            telephone: '+91-88264-44334',
            priceRange: '₹45,000 - ₹1,80,000',
            areaServed: ['Delhi', 'Noida', 'Gurgaon', 'Faridabad', 'Ghaziabad', 'Delhi NCR'],
          }),
        }}
      />

      {/* Schema Markup for Course */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'NEET Biology Coaching',
            description:
              'Comprehensive NEET Biology preparation with expert faculty, small batches, and proven results',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            educationalLevel: 'Class 11-12',
            coursePrerequisites: 'Class 10 passed',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'Blended',
              courseWorkload: 'PT6H',
            },
          }),
        }}
      />
    </>
  )
}
