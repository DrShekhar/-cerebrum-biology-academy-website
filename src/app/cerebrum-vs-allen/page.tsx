import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Check, X, Phone, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cerebrum vs Allen: Which is Better for NEET Biology 2026?',
  description:
    'Compare Cerebrum Biology Academy vs Allen Career Institute for NEET coaching. Specialized biology training, AIIMS faculty, 98% success rate. Free demo available.',
  keywords: [
    'cerebrum vs allen',
    'best neet coaching delhi',
    'cerebrum biology academy',
    'allen career institute comparison',
    'neet biology coaching',
    'specialized biology coaching',
  ],
  openGraph: {
    title: 'Cerebrum vs Allen: Which is Better for NEET Biology 2026?',
    description:
      'Compare Cerebrum Biology Academy vs Allen Career Institute for NEET coaching. Specialized biology training, AIIMS faculty, 98% success rate.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-allen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cerebrum vs Allen: NEET Biology Coaching Comparison',
    description: 'Specialized Biology Coaching vs General NEET Institute',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Cerebrum better than Allen for Biology?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum is specifically designed for Biology-focused NEET preparation with AIIMS-trained faculty, smaller batch sizes (25-30), and specialized curriculum. Allen offers comprehensive NEET coaching across all subjects. For students prioritizing Biology excellence, Cerebrum provides specialized attention.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fee difference between Cerebrum and Allen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum Biology-specific course ranges from ₹45,000-₹1,20,000, while Allen general NEET courses range from ₹1,50,000-₹3,00,000. Cerebrum offers more cost-effective specialized Biology training.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Cerebrum have online coaching like Allen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Cerebrum offers both offline classes at 6 centers in Delhi NCR and online coaching options. Students can choose the mode that best fits their schedule.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Cerebrum success rate compared to Allen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum has a 98% selection rate among students who complete the course consistently. Allen does not publicly disclose individual success rates separately, making direct comparison difficult.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why choose Cerebrum Biology Academy for NEET?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Choose Cerebrum for AIIMS-trained specialized faculty, dedicated Biology expertise, smaller batch sizes ensuring personal attention, superior success rate, comprehensive study material, and cost-effectiveness.',
      },
    },
  ],
};

export default function CerebrumVsAllenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cerebrum vs Allen: Which is Better for NEET Biology 2026?
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Comprehensive comparison between specialized Biology coaching (Cerebrum) and
            general NEET institute (Allen) to help you make the right choice.
          </p>
          <p className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Quick Comparison at a Glance
          </h2>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="p-4 text-left font-semibold text-gray-900 text-sm md:text-base">
                    Criteria
                  </th>
                  <th className="p-4 text-left font-semibold text-blue-600 text-sm md:text-base">
                    Cerebrum Biology Academy
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700 text-sm md:text-base">
                    Allen Career Institute
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    criteria: 'Focus Area',
                    cerebrum: 'Biology Specialized',
                    allen: 'All Subjects (Physics, Chemistry, Biology)',
                  },
                  {
                    criteria: 'Faculty Quality',
                    cerebrum: 'AIIMS Trained Faculty',
                    allen: 'Mix of Experienced & Trained Faculty',
                  },
                  {
                    criteria: 'Batch Size',
                    cerebrum: '25-30 students',
                    allen: '80-100+ students',
                  },
                  {
                    criteria: 'Avg Biology Score Improvement',
                    cerebrum: '120+ marks improvement',
                    allen: 'Variable across subjects',
                  },
                  {
                    criteria: 'Selection Rate',
                    cerebrum: '98% selection rate',
                    allen: 'Not disclosed separately',
                  },
                  {
                    criteria: 'Fee Range (Biology)',
                    cerebrum: '₹45,000 - ₹1,20,000',
                    allen: '₹1,50,000 - ₹3,00,000',
                  },
                  {
                    criteria: 'Teacher-Student Ratio',
                    cerebrum: '1:25 (Personal Attention)',
                    allen: '1:80+ (Limited Attention)',
                  },
                  {
                    criteria: 'Coverage',
                    cerebrum: '6 centers in Delhi NCR + Online',
                    allen: 'Pan-India (50+ centers)',
                  },
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-semibold text-gray-900 text-sm md:text-base">
                      {row.criteria}
                    </td>
                    <td className="p-4 text-gray-700 text-sm md:text-base">
                      <div className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{row.cerebrum}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700 text-sm md:text-base">{row.allen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Faculty Quality & Teaching Methodology */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Faculty Quality & Teaching Methodology
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Cerebrum Biology Academy</h3>
              <ul className="space-y-3">
                {[
                  'AIIMS Senior Faculty with 10+ years experience',
                  'Founded by Dr. Shekhar (former AIIMS Senior Faculty)',
                  'Biology-specialized curriculum design',
                  'Personalized teaching approach with small batches',
                  'Regular performance tracking and feedback',
                  'Interactive doubt-solving sessions',
                  'Focus on conceptual clarity over rote learning',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Allen Career Institute</h3>
              <ul className="space-y-3">
                {[
                  'Mix of experienced and trained faculty members',
                  'General NEET coaching approach',
                  'Standardized curriculum across centers',
                  'Classroom teaching with limited individual attention',
                  'Large batches may limit personalized feedback',
                  'Scheduled doubt sessions (limited timing)',
                  'Focus on pattern-based learning',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
            <p className="text-gray-800">
              <strong>Key Advantage for Cerebrum:</strong> AIIMS-trained faculty brings expertise from
              India's premier medical institution, ensuring medical-standard teaching quality. The
              specialized focus on Biology means every faculty member is a subject expert.
            </p>
          </div>
        </div>
      </section>

      {/* Fee Structure & Value for Money */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Fee Structure & Value for Money</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Cerebrum Biology Academy</h3>
              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  <strong>Fee Range (Biology):</strong>
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Crash Courses: ₹45,000 - ₹60,000</li>
                  <li>• 1-Year Courses: ₹75,000 - ₹95,000</li>
                  <li>• 2-Year Intensive: ₹1,00,000 - ₹1,20,000</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded">
                <p className="font-semibold text-gray-900 mb-2">Value Proposition:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Lower fee for specialized Biology training</li>
                  <li>✓ Small batches (25-30) = better ROI</li>
                  <li>✓ No need to pay for other subjects</li>
                  <li>✓ 98% success rate justifies investment</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Allen Career Institute</h3>
              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  <strong>Fee Range (Complete NEET):</strong>
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Foundation Programs: ₹1,50,000 - ₹2,00,000</li>
                  <li>• Regular Programs: ₹2,00,000 - ₹2,75,000</li>
                  <li>• Intensive Programs: ₹2,75,000 - ₹3,00,000</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded">
                <p className="font-semibold text-gray-900 mb-2">Cost Considerations:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Higher fees for all-subject coaching</li>
                  <li>• Large batches may affect learning quality</li>
                  <li>• Premium pricing may not reflect individual results</li>
                  <li>• Additional fees for online/hybrid modules</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded">
            <p className="text-gray-800">
              <strong>Cost-Benefit Winner:</strong> Cerebrum offers 40-60% lower fees while delivering
              specialized Biology training with better student-teacher ratios. For students focused on
              maximizing Biology scores, Cerebrum provides superior value for money.
            </p>
          </div>
        </div>
      </section>

      {/* Student Results & Success Stories */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Student Results & Success Stories</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Cerebrum Biology Academy</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
                  <p className="text-gray-700">Selection rate among consistent students</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">120+</div>
                  <p className="text-gray-700">Average Biology score improvement</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 mb-2">
                    <strong>Success Factors:</strong>
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Focused Biology training</li>
                    <li>• Small batch monitoring</li>
                    <li>• AIIMS faculty expertise</li>
                    <li>• Regular progress assessments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Allen Career Institute</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700">
                    <strong>Overall Success Metrics:</strong>
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    Allen publishes aggregate data but doesn't disclose Biology-specific success rates
                    separately.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 mb-2">
                    <strong>General Performance:</strong>
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Large student base dilutes individual tracking</li>
                    <li>• Varied faculty expertise</li>
                    <li>• Success depends on individual effort</li>
                    <li>• Competition-oriented environment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
            <p className="text-gray-800">
              <strong>Key Insight:</strong> Cerebrum's transparent 98% selection rate specifically for
              Biology demonstrates accountability. Smaller batches ensure personalized monitoring of
              progress, leading to consistent results.
            </p>
          </div>
        </div>
      </section>

      {/* Study Material & Resources */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Study Material & Resources</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Cerebrum Biology Academy</h3>
              <ul className="space-y-3">
                {[
                  'Comprehensive Biology-specific study material',
                  'AIIMS-curated practice questions',
                  'Chapter-wise short notes & summaries',
                  'Biology-focused previous year papers',
                  'Regular quiz & assessment tests',
                  'Digital library with video lectures',
                  'Doubt resolution through WhatsApp groups',
                  'Customized study plans for individuals',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Allen Career Institute</h3>
              <ul className="space-y-3">
                {[
                  'Comprehensive NEET coaching material',
                  'Physics, Chemistry, Biology integrated approach',
                  'Extensive practice problem sets',
                  'Previous year papers (all subjects)',
                  'Regular performance analytics',
                  'Online learning platform access',
                  'Mobile app for on-the-go learning',
                  'Mentorship programs (variable quality)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Accessibility */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Location & Accessibility (Delhi NCR Focus)
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Cerebrum Biology Academy</h3>
              <div className="bg-white p-6 rounded-lg border border-blue-200">
                <p className="font-semibold text-gray-900 mb-3">6 Centers in Delhi NCR:</p>
                <ul className="space-y-2 text-gray-700 text-sm mb-4">
                  <li>• Delhi (Multiple locations)</li>
                  <li>• Gurgaon</li>
                  <li>• Noida</li>
                  <li>• Greater Noida</li>
                </ul>
                <p className="font-semibold text-gray-900 mb-2">Additional Options:</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Hybrid Classes (Online + Offline)</li>
                  <li>✓ Full Online Courses</li>
                  <li>✓ Flexible Batch Timings</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Allen Career Institute</h3>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-3">Pan-India Presence:</p>
                <ul className="space-y-2 text-gray-700 text-sm mb-4">
                  <li>• 50+ centers across India</li>
                  <li>• Multiple centers in Delhi NCR</li>
                  <li>• Centers in all major cities</li>
                </ul>
                <p className="font-semibold text-gray-900 mb-2">Learning Modes:</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Classroom coaching</li>
                  <li>• Online learning platform</li>
                  <li>• Hybrid programs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
            <p className="text-gray-800">
              <strong>For Delhi NCR Students:</strong> Cerebrum offers localized attention with 6
              strategically placed centers. Students benefit from knowing their center staff personally
              and getting community-based support. Allen's larger network is beneficial for students
              relocating to different cities.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Cerebrum */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Cerebrum for Biology</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: 'Specialized Biology Excellence',
                description:
                  'Unlike general NEET coaching, every aspect of Cerebrum is optimized for Biology mastery. Faculty, curriculum, and resources are specifically designed for Biology students.',
              },
              {
                title: 'AIIMS-Trained Faculty',
                description:
                  'Learn from educators who have worked at AIIMS, India\'s premier medical institute. Access to medical-standard teaching quality and real examination insights.',
              },
              {
                title: 'Small Batch Advantage',
                description:
                  'With 25-30 students per batch, you get personalized attention. Teachers know your strengths and weaknesses, enabling targeted improvement.',
              },
              {
                title: '98% Success Rate',
                description:
                  'Our transparent, verifiable success rate demonstrates our commitment to results. This metric reflects Biology-focused coaching effectiveness.',
              },
              {
                title: 'Cost-Effective Solution',
                description:
                  '₹45,000-₹1,20,000 vs ₹1,50,000-₹3,00,000. Save money while getting specialized training focused on Biology excellence.',
              },
              {
                title: 'Delhi NCR Convenience',
                description:
                  '6 centers strategically located across Delhi NCR with flexible online options. Learn in your preferred mode and location.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Ready to Excel in Biology?</h3>
            <p className="mb-6 text-lg">
              Join thousands of students who have achieved their NEET dreams with Cerebrum Biology
              Academy's specialized approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-free-demo"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Free Demo
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Is Cerebrum better than Allen for Biology?',
                a: 'Cerebrum is specifically designed for Biology-focused NEET preparation with AIIMS-trained faculty and smaller batches. If you want specialized Biology training with personal attention, Cerebrum is the better choice. Allen is suitable if you need comprehensive coaching across Physics, Chemistry, and Biology.',
              },
              {
                q: 'What is the fee difference between Cerebrum and Allen?',
                a: 'Cerebrum charges ₹45,000-₹1,20,000 for Biology-specific courses, while Allen charges ₹1,50,000-₹3,00,000 for complete NEET coaching. Cerebrum is 40-60% more affordable, especially for students focused on Biology excellence.',
              },
              {
                q: 'Does Cerebrum provide online coaching?',
                a: 'Yes, Cerebrum offers both offline classes at 6 Delhi NCR centers and comprehensive online programs. Students can choose hybrid (combination of online and offline) or fully online modes based on their preferences.',
              },
              {
                q: 'What is Cerebrum\'s success rate compared to Allen?',
                a: 'Cerebrum has a transparent 98% selection rate among students who complete the course consistently. Allen does not publicly disclose Biology-specific success rates, making direct comparison difficult. Cerebrum\'s transparent metrics demonstrate accountability.',
              },
              {
                q: 'Can I shift from Allen to Cerebrum mid-course?',
                a: 'Yes, many students transition to Cerebrum for Biology specialization. Cerebrum can evaluate your current progress and create a customized plan to optimize your remaining preparation time. Contact us for a personalized consultation.',
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between w-full p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-gray-700 border-t border-gray-100">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your NEET Biology Journey Today</h2>
          <p className="text-lg mb-8 text-blue-100">
            Experience specialized Biology coaching with AIIMS-trained faculty. Limited seats available.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/book-free-demo"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>Book Free Demo Class</span>
              <ChevronRight className="w-5 h-5" />
            </Link>

            <a
              href="https://wa.me/918826444334"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="tel:+918826444334"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span>+91 88264 44334</span>
            </a>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-20">
            <p className="text-blue-100 mb-2">Email: info@cerebrumbiologyacademy.com</p>
            <p className="text-blue-100 mb-4">Available Monday - Saturday, 10 AM - 6 PM</p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link href="/courses" className="hover:text-blue-100 underline">
                Explore Courses
              </Link>
              <Link href="/neet-coaching-fees" className="hover:text-blue-100 underline">
                View Fee Structure
              </Link>
              <Link href="/book-free-demo" className="hover:text-blue-100 underline">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 md:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-700 text-center">
            <strong>Disclaimer:</strong> This comparison is based on publicly available information and
            Cerebrum Biology Academy's verified track record. We have not made any defamatory claims
            against Allen Career Institute. Both institutions are reputable in their respective domains.
            The choice depends on your specific learning needs and preferences.
          </p>
        </div>
      </section>
    </>
  );
}
