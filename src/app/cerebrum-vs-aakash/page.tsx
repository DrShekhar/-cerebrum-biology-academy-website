import { Metadata } from 'next';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cerebrum vs Aakash: Which is Better for NEET Biology 2026?',
  description: 'Detailed comparison of Cerebrum Biology Academy vs Aakash Institute for NEET coaching. Compare faculty, fees, results, and why Cerebrum specializes in Biology with 98% success rate.',
  keywords: 'cerebrum vs aakash, aakash vs cerebrum, NEET coaching comparison, Biology coaching, Delhi NCR',
  openGraph: {
    title: 'Cerebrum vs Aakash: Which is Better for NEET Biology 2026?',
    description: 'Compare Cerebrum Biology Academy vs Aakash Institute. Learn about faculty, fees, success rates, and which institute is better for Biology specialization.',
    type: 'article',
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Is Cerebrum better than Aakash for NEET Biology?',
    answer: 'Cerebrum specializes exclusively in Biology and leverages AIIMS-trained faculty, making it superior for students prioritizing Biology mastery. With a 98% selection rate and average 120+ marks improvement in Biology, Cerebrum offers focused expertise. Aakash covers all NEET subjects, which may work better if you need comprehensive subject coverage. The choice depends on your Biology proficiency and goals.',
  },
  {
    question: 'What is the fee difference between Cerebrum and Aakash?',
    answer: 'Cerebrum Biology Academy charges ₹45,000 to ₹1,20,000 depending on duration and location, while Aakash typically charges ₹1,00,000 to ₹2,50,000 for comprehensive NEET programs. Cerebrum offers competitive pricing with Biology-specialized curriculum, making it more affordable for students focusing on Biology excellence.',
  },
  {
    question: 'How is Cerebrum\'s faculty different from Aakash?',
    answer: 'Cerebrum is founded by Dr. Shekhar, an AIIMS Senior Faculty, and all instructors are AIIMS-trained with specialization in Biology. This ensures medical college-aligned teaching. Aakash employs a mix of faculty across subjects with varying expertise levels, though they do have experienced teachers in individual subjects.',
  },
  {
    question: 'Which institute provides better personal attention?',
    answer: 'Cerebrum maintains batch sizes of 25-30 students with a 1:25 student-to-faculty ratio, ensuring personalized attention. Aakash typically has 60-80+ students per batch with higher ratios. For Biology mastery requiring detailed doubt clearing, Cerebrum\'s smaller batches provide superior personal attention.',
  },
  {
    question: 'Does Cerebrum have centers outside Delhi NCR?',
    answer: 'Currently, Cerebrum Biology Academy operates 6 centers across Delhi NCR and offers live online classes with recorded sessions. For pan-India availability, Aakash has centers in most major cities. However, Cerebrum\'s online programs allow students nationwide to access AIIMS-trained faculty expertise.',
  },
];

export default function CerebrumVsAakash() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Cerebrum vs Aakash: Which is Better for NEET Biology 2026?
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 leading-relaxed">
            A detailed comparison of two leading NEET coaching institutes. Understand the differences in faculty quality, fees, results, and why Cerebrum specializes in Biology excellence with AIIMS-trained experts.
          </p>
          <p className="text-sm text-blue-200">
            Last updated: February 2026 | Comparison based on actual institute programs and student feedback
          </p>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-900">
            Quick Comparison Overview
          </h2>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full bg-white">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-100">
                  <th className="px-4 sm:px-6 py-4 text-left font-semibold text-gray-900 text-sm sm:text-base">
                    Criteria
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left font-semibold text-blue-600 text-sm sm:text-base">
                    Cerebrum Biology Academy
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                    Aakash Institute
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 text-sm sm:text-base">
                    Focus Area
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">
                    <span className="text-green-700 font-medium">Biology Specialized</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-700">
                    All Subjects (NEET + JEE)
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 text-sm sm:text-base">
                    Faculty
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">
                    <span className="text-green-700 font-medium">AIIMS Trained Faculty</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-700">
                    Mix of Faculty Across Subjects
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 text-sm sm:text-base">
                    Batch Size
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">
                    <span className="text-green-700 font-medium">25-30 Students</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-700">
                    60-80+ Students
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 text-sm sm:text-base">
                    Biology Score Improvement
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">
                    <span className="text-green-700 font-medium">Avg 120+ marks</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-700">
                    Variable (Subject-dependent)
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 text-sm sm:text-base">
                    Success Rate
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">
                    <span className="text-green-700 font-medium">94% Selection Rate</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-700">
                    High Success Rate Claimed
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 text-sm sm:text-base">
                    Fee Range
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">
                    <span className="text-green-700 font-medium">₹45,000 - ₹1,20,000</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-700">
                    ₹1,00,000 - ₹2,50,000
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 text-sm sm:text-base">
                    Student-Faculty Ratio
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">
                    <span className="text-green-700 font-medium">1:25</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-700">
                    1:60+
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 text-sm sm:text-base">
                    Online Learning
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">
                    <span className="text-green-700 font-medium">Live + Recorded Classes</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-700">
                    Aakash Digital Platform
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 text-sm sm:text-base">
                    Pan-India Presence
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">
                    6 Centers Delhi NCR + Online
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-700">
                    Pan India + BYJU'S Integration
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Sections */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Faculty Quality & Specialization */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Faculty Quality & Specialization
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 sm:p-8 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Cerebrum Biology Academy</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Founded by Dr. Shekhar, AIIMS Senior Faculty with 15+ years medical education experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>All instructors are AIIMS-trained with specialization in Biology</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Faculty regularly updates content aligned with NEET exam patterns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>1:25 student-to-faculty ratio ensures personalized teaching methodology</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Direct doubt-clearing sessions with experts for complex concepts</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Aakash Institute</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Employs faculty across multiple subjects (Physics, Chemistry, Biology, Mathematics)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Some experienced faculty with strong subject expertise in individual disciplines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>1:60+ student ratio limits personalized attention in larger batches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Faculty trained to teach comprehensive NEET + JEE curriculum simultaneously</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Standard classroom teaching model with limited customization</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-gray-700 text-base">
              <strong>Verdict:</strong> Cerebrum's specialization in Biology with AIIMS-trained faculty provides focused expertise that general NEET coaching institutes cannot match. For Biology excellence, Cerebrum's faculty background gives it a significant advantage.
            </p>
          </div>

          {/* Fee Structure & Affordability */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Fee Structure & Affordability
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 sm:p-8 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Cerebrum Biology Academy</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900">Online Biology Course</p>
                    <p className="text-green-700 font-bold text-lg">₹45,000 - ₹75,000</p>
                    <p className="text-sm text-gray-600">6-12 months program with live + recorded classes</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Offline (Delhi NCR)</p>
                    <p className="text-green-700 font-bold text-lg">₹60,000 - ₹1,20,000</p>
                    <p className="text-sm text-gray-600">Classroom + online with personalized sessions</p>
                  </div>
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <p className="text-sm text-gray-700">
                      <strong>Value Add:</strong> Better ROI through focused Biology training with proven 98% selection rate
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Aakash Institute</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900">Classroom Program (NEET)</p>
                    <p className="text-gray-900 font-bold text-lg">₹1,00,000 - ₹2,50,000</p>
                    <p className="text-sm text-gray-600">Comprehensive Physics + Chemistry + Biology</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Online (Aakash Digital)</p>
                    <p className="text-gray-900 font-bold text-lg">₹80,000 - ₹1,50,000</p>
                    <p className="text-sm text-gray-600">Video-based learning with BYJU'S integration</p>
                  </div>
                  <div className="bg-white p-4 rounded border border-gray-300">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> Higher fees reflect all-subject curriculum; ROI depends on overall NEET score
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-gray-700 text-base">
              <strong>Verdict:</strong> Cerebrum offers superior affordability with specialized Biology focus. If you need comprehensive NEET subject coverage, Aakash's all-in-one approach justifies higher fees. For Biology specialists, Cerebrum provides 50-70% cost savings.
            </p>
          </div>

          {/* Student Results & Track Record */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Student Results & Track Record
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 sm:p-8 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Cerebrum Biology Academy</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>94% Selection Rate</strong> - Among all students completing the program</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Average Biology Score Improvement:</strong> 120+ marks within 6 months</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Multiple students scoring 360-380+ in Biology section</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Students shortlisted to government and private medical colleges</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Consistent year-on-year improvement in student outcomes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Aakash Institute</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Large alumni base with success stories across pan-India centers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Claims of high selection rates based on all-subject performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Established reputation with 25+ years of NEET coaching experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Recently integrated with BYJU'S for digital learning enhancements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Success metrics vary by center and student dedication</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-gray-700 text-base">
              <strong>Verdict:</strong> Cerebrum's 98% selection rate demonstrates focused excellence in Biology training. Aakash's track record is solid but distributed across multiple subjects. For Biology-specific improvements, Cerebrum's specialized approach shows measurable advantages.
            </p>
          </div>

          {/* Study Material & Digital Resources */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Study Material & Digital Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 sm:p-8 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Cerebrum Biology Academy</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Biology-focused study material created by AIIMS faculty</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Live interactive classes with screen sharing for complex topics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Recorded class access for revision and clarification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Regular Biology-specific practice tests and assignments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Direct access to faculty for concept clarification via WhatsApp/Email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Doubt resolution sessions scheduled weekly</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Aakash Institute</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Comprehensive study material covering Physics, Chemistry, Biology</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Aakash Digital platform with video lectures and animations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Integration with BYJU'S for enhanced digital experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Vast question bank with varied difficulty levels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Performance analytics and progress tracking dashboard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Limited personalized doubt resolution due to batch size</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-gray-700 text-base">
              <strong>Verdict:</strong> Cerebrum provides focused Biology material with direct faculty access. Aakash offers comprehensive multi-subject resources with advanced technology. Cerebrum is better for in-depth Biology learning; Aakash for complete NEET preparation.
            </p>
          </div>

          {/* Location & Accessibility */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Location & Accessibility (Delhi NCR)
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 sm:p-8 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Cerebrum Biology Academy</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>6 Centers in Delhi NCR:</strong> Strategically located for easy accessibility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Online classes available for students outside Delhi NCR</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Hybrid mode: Attend classes online or offline as per convenience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Same AIIMS-trained faculty regardless of offline/online mode</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Excellent for Delhi NCR students; expanding online reach</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Aakash Institute</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span><strong>Pan-India Presence:</strong> 200+ centers across major Indian cities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Multiple Delhi NCR centers with extensive offline infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Aakash Digital for nationwide online access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>BYJU'S integration expanding digital accessibility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Excellent for students across India; best for pan-India learners</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-gray-700 text-base">
              <strong>Verdict:</strong> Cerebrum is ideal for Delhi NCR students with direct access to AIIMS faculty. Aakash suits students nationwide needing centers in multiple cities. For Delhi NCR, both are accessible; Cerebrum offers specialized Biology focus.
            </p>
          </div>

          {/* Why Choose Cerebrum */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Why Choose Cerebrum for Biology
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-lg border border-blue-300">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      AIIMS-Trained Faculty Specialization
                    </p>
                    <p className="text-gray-700 text-sm">
                      Learn from Dr. Shekhar and AIIMS-trained instructors who understand medical college entrance exam requirements deeply.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Biology-Focused Curriculum
                    </p>
                    <p className="text-gray-700 text-sm">
                      Specialized coaching for Biology with 98% selection rate proves the effectiveness of focused expertise over generalized approaches.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Personalized Attention (1:25 Ratio)
                    </p>
                    <p className="text-gray-700 text-sm">
                      Small batch sizes ensure every student receives individual attention, concept clarity, and customized doubt resolution.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Cost-Effective (50-70% Savings)
                    </p>
                    <p className="text-gray-700 text-sm">
                      Superior Biology results at half the cost of general NEET institutes, making it the best value for money.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                    5
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Proven Track Record
                    </p>
                    <p className="text-gray-700 text-sm">
                      Average 120+ marks improvement in Biology, consistent year-on-year success, and multiple selections to top medical colleges.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                    6
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Flexible Learning Options
                    </p>
                    <p className="text-gray-700 text-sm">
                      Choose between offline classes in Delhi NCR, fully online, or hybrid mode with live + recorded sessions for maximum flexibility.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                    7
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Direct Faculty Access
                    </p>
                    <p className="text-gray-700 text-sm">
                      WhatsApp, email, and scheduled sessions for doubt resolution directly with AIIMS-trained faculty members.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <summary className="font-semibold text-gray-900 text-base sm:text-lg flex items-center justify-between">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-blue-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Master Biology for NEET?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join Cerebrum Biology Academy and experience AIIMS-trained coaching with proven 98% selection rate.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/book-free-demo"
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition inline-block"
            >
              Book Free Demo Class
            </Link>

            <a
              href="https://wa.me/918826444334"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition inline-block"
            >
              WhatsApp Us
            </a>

            <a
              href="tel:+918826444334"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition inline-block"
            >
              Call: +91 88264 44334
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-blue-400">
            <p className="text-blue-100 mb-4">
              Have questions? We are here to help!
            </p>
            <p className="text-blue-100 text-sm">
              Email: <a href="mailto:info@cerebrumbiologyacademy.com" className="underline hover:text-white">
                info@cerebrumbiologyacademy.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Related Links Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Explore More
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Link
              href="/courses"
              className="block p-6 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-lg transition text-center"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Our Courses</h3>
              <p className="text-sm text-gray-700">
                Explore all Biology programs and course options available at Cerebrum
              </p>
            </Link>

            <Link
              href="/neet-coaching-fees"
              className="block p-6 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-lg transition text-center"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Fee Structure</h3>
              <p className="text-sm text-gray-700">
                Detailed fee information and flexible payment options for all programs
              </p>
            </Link>

            <Link
              href="/book-free-demo"
              className="block p-6 bg-green-50 rounded-lg border border-green-200 hover:shadow-lg transition text-center"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Book Free Demo</h3>
              <p className="text-sm text-gray-700">
                Experience our AIIMS-trained faculty with a free trial class
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
