import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  Trophy,
  GraduationCap,
  ArrowRight,
  Star,
} from 'lucide-react'

export const metadata: Metadata = {
  title: '2 Year NEET Course Ghaziabad 2026 | Class 11-12 Integrated',
  description:
    'Join 2-year NEET course for Ghaziabad students from Class 11. Complete foundation + advanced coaching. Best results with 98% success rate. Call 99536-43938!',
  keywords: [
    '2 year neet course ghaziabad',
    'two year neet coaching ghaziabad',
    'class 11 neet course ghaziabad',
    'class 11 12 integrated neet ghaziabad',
    '2 year neet program ghaziabad',
    'foundation neet course class 11 ghaziabad',
    'neet from class 11 ghaziabad',
    'neet 2027 2 year course ghaziabad',
    'best 2 year neet coaching ghaziabad',
    'neet biology 2 year course ghaziabad',
  ],
  openGraph: {
    title: '2 Year NEET Course Ghaziabad 2026',
    description:
      'Start early, succeed confidently! 2-year integrated NEET biology program from Class 11 for Ghaziabad students.',
    url: 'https://cerebrumbiologyacademy.com/2-year-neet-course-ghaziabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/2-year-neet-course-ghaziabad',
  },
}

const year1Topics = [
  'Cell Biology & Biomolecules',
  'Structural Organisation (Animals & Plants)',
  'Plant Physiology',
  'Human Physiology (Part 1)',
  'Animal Kingdom Classification',
  'Plant Kingdom & Morphology',
]

const year2Topics = [
  'Genetics & Evolution',
  'Human Physiology (Part 2)',
  'Biotechnology & Applications',
  'Ecology & Environment',
  'Human Reproduction',
  'Complete Revision & Mocks',
]

const advantages = [
  {
    title: 'Relaxed Pace',
    description: 'More time per topic means deeper understanding. No rushing through concepts.',
    stat: '2x more time',
  },
  {
    title: 'Strong Foundation',
    description: 'Class 11 concepts are NEET base. Master them properly for exam success.',
    stat: 'Class 11 = 50% NEET',
  },
  {
    title: 'Multiple Revisions',
    description: 'Three full revision cycles before NEET. Concepts become second nature.',
    stat: '3 revision cycles',
  },
  {
    title: 'Higher Success Rate',
    description: '2-year students consistently outperform 1-year batch in final NEET.',
    stat: '98% vs 94%',
  },
]

const faqs = [
  {
    question: 'What is the 2-year NEET course structure?',
    answer:
      'Year 1 (Class 11): Foundation building - Cell Biology, Plant Physiology, Human Physiology basics, Structural Organisation. Year 2 (Class 12): Advanced topics - Genetics, Evolution, Ecology, Biotechnology + Full revision + NEET practice. Total: 1500+ hours of coaching.',
  },
  {
    question: 'Why is 2-year course better than 1-year?',
    answer:
      'Advantages: 1) Relaxed pace - better understanding, 2) Strong foundation in Class 11 itself, 3) More revision cycles, 4) Lower daily study hours (3-4 hrs vs 6 hrs), 5) Time for school activities, 6) Higher success rate (98% vs 94%). Our toppers are mostly 2-year students.',
  },
  {
    question: 'What is the fee for 2-year NEET course?',
    answer:
      '2-year complete package: ₹1,20,000-1,40,000 (both years combined). Per year: ₹60,000-70,000. Includes: All study material for 2 years, complete test series, doubt support, parent counseling. 10% discount for full payment upfront.',
  },
  {
    question: 'When should I enroll for 2-year course as a Ghaziabad student?',
    answer:
      'Best time: April-June of Class 11 year (right after Class 10 boards). Late enrollment accepted till August. Starting early gives maximum advantage. Many Ghaziabad students from DPS Indirapuram, Ryan International, and other schools join after Class 10 results in May-June.',
  },
  {
    question: 'How to balance school and 2-year coaching for Ghaziabad students?',
    answer:
      'Our schedule is designed for balance: 3-4 hours coaching daily (evening batch) + 2 hours self-study. Weekends: 4-5 hours. Total: 25-30 hours/week for NEET + full school attendance. Students from DPS Indirapuram, Ryan International Ghaziabad, and Amity successfully manage both.',
  },
  {
    question: 'How do Ghaziabad students travel to the center?',
    answer:
      'Blue Line Metro from Vaishali or Kaushambi to Sector 62 Noida takes 20-25 minutes. For evening batch students (5-8 PM), this is very manageable. Online mode is also available for days with heavy school schedule.',
  },
  {
    question: 'Is there a difference in faculty for 2-year course?',
    answer:
      "Same senior faculty teaches both batches. However, 2-year students benefit from: 1) More time with each faculty member, 2) Better understanding of teaching style, 3) Personalized attention over longer period, 4) Faculty knows each student's weaknesses by Year 2.",
  },
  {
    question: 'What is the success rate of 2-year program?',
    answer:
      '2-year program statistics: 98% qualify NEET, 65% score above 600, 25% score above 650, 5% in top 5000 All India Rank. Compare to 1-year: 94% qualify, 50% above 600. The extra year clearly shows in results.',
  },
]

export default function TwoYearNEETCourseGhaziabad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-teal-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Best for Class 11 Students
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              2 Year NEET Course for Ghaziabad Students
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Start early, succeed confidently! 2-year integrated NEET biology program from Class 11
              for students in Indirapuram, Vaishali, Kaushambi, and all Ghaziabad areas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+919953643938"
                className="bg-yellow-500 text-teal-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
              >
                <Phone className="w-5 h-5" />
                Call 99536-43938
              </a>
              <Link
                href="/1-year-neet-course-ghaziabad"
                className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 transition"
              >
                1-Year Course Option
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-teal-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-teal-600">24 Months</div>
              <div className="text-gray-600">Course Duration</div>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-teal-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-teal-600">1500+ Hrs</div>
              <div className="text-gray-600">Total Teaching</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">350+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
          </div>
        </div>
      </section>

      {/* Year-wise Syllabus */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">2-Year Course Syllabus</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-teal-600 text-white py-4 px-6">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold">Year 1 (Class 11)</h3>
                    <p className="text-teal-200">Foundation Building</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {year1Topics.map((topic, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-500" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-500 bg-teal-50 p-3 rounded-lg">
                  Class 11 contributes ~50% of NEET Biology weightage
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-teal-700 text-white py-4 px-6">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold">Year 2 (Class 12)</h3>
                    <p className="text-teal-200">Advanced + Revision</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {year2Topics.map((topic, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-500 bg-teal-50 p-3 rounded-lg">
                  Genetics & Evolution are highest-weightage NEET topics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why 2 Year is Better */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why 2-Year Course is Better</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our toppers are predominantly from 2-year program. Here&apos;s why:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {advantages.map((item, index) => (
              <div key={index} className="bg-teal-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">{item.stat}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 Year vs 1 Year Comparison */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">2-Year vs 1-Year: Comparison</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-teal-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Feature</th>
                    <th className="px-6 py-4 text-center">2-Year Course</th>
                    <th className="px-6 py-4 text-center">1-Year Course</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">Success Rate</td>
                    <td className="px-6 py-4 text-center font-bold text-teal-600">98%</td>
                    <td className="px-6 py-4 text-center">94%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Daily Study Hours</td>
                    <td className="px-6 py-4 text-center font-bold text-teal-600">3-4 hours</td>
                    <td className="px-6 py-4 text-center">6+ hours</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">Revision Cycles</td>
                    <td className="px-6 py-4 text-center font-bold text-teal-600">3 times</td>
                    <td className="px-6 py-4 text-center">1-2 times</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">School Balance</td>
                    <td className="px-6 py-4 text-center font-bold text-teal-600">Comfortable</td>
                    <td className="px-6 py-4 text-center">Challenging</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">600+ Scorers</td>
                    <td className="px-6 py-4 text-center font-bold text-teal-600">65%</td>
                    <td className="px-6 py-4 text-center">50%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Total Fee</td>
                    <td className="px-6 py-4 text-center">₹1.2-1.4L (2 years)</td>
                    <td className="px-6 py-4 text-center">₹65-85K (1 year)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">2-Year Course Pricing</h2>
          <div className="max-w-xl mx-auto">
            <div className="bg-white border-2 border-teal-400 rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-teal-700 text-white py-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-semibold">RECOMMENDED</span>
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold">2-Year NEET Biology</h3>
                <p className="text-teal-200">Class 11 + Class 12 (2025-2027)</p>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-teal-600">₹1,20,000 - 1,40,000</span>
                  <p className="text-sm text-gray-500 mt-1">Complete 2-year package</p>
                  <p className="text-sm text-teal-600 font-medium">₹60,000-70,000 per year</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>1500+ hours of classroom teaching</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Complete NEET biology study material (2 years)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>100+ chapter tests + 25 full mocks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>3 full revision cycles before NEET</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Parent counseling & progress reports</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>10% discount on full upfront payment</span>
                  </li>
                </ul>
                <a
                  href="tel:+919953643938"
                  className="block w-full bg-teal-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
                >
                  Enroll Now - Call 99536-43938
                </a>
                <p className="text-center text-sm text-gray-500 mt-3">
                  Year-wise payment & EMI options available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Balance */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Balance School & 2-Year Coaching</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-6 text-center">Typical Weekly Schedule</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-teal-700 mb-3">Weekdays (Mon-Fri)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>School</span>
                      <span className="font-medium">8 AM - 3 PM</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>Rest/Travel</span>
                      <span className="font-medium">3 - 5 PM</span>
                    </div>
                    <div className="flex justify-between bg-teal-50 p-2 rounded border border-teal-200">
                      <span className="text-teal-700">Coaching</span>
                      <span className="font-medium text-teal-700">5 - 8 PM</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>Self-Study</span>
                      <span className="font-medium">9 - 10:30 PM</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-teal-700 mb-3">Weekend (Sat-Sun)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-teal-50 p-2 rounded border border-teal-200">
                      <span className="text-teal-700">Coaching (Sat)</span>
                      <span className="font-medium text-teal-700">9 AM - 1 PM</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>Self-Study</span>
                      <span className="font-medium">3 - 6 PM</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>Rest/Activities</span>
                      <span className="font-medium">Sunday</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-6">
                Total: 18-20 hours/week for NEET + Full school attendance + Personal time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Center Location */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">2-Year Program Location</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-teal-600 mt-1" />
                  <div>
                    <p className="font-semibold">B-45, Sector 62</p>
                    <p className="text-gray-600">Noida, UP 201301</p>
                    <p className="text-sm text-gray-500 mt-1">
                      20-25 min via Blue Line Metro from Vaishali/Kaushambi Ghaziabad
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-teal-600 mt-1" />
                  <div>
                    <p className="font-semibold">Next Batch Starts</p>
                    <p className="text-gray-600">April 2025 (Class 11 entry)</p>
                    <p className="text-gray-600">Enrollment open: Now - July 2025</p>
                  </div>
                </div>
                <a
                  href="tel:+919953643938"
                  className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Counseling
                </a>
              </div>
              <div className="md:w-1/2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1234567890123!2d77.3683!3d28.6271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSector%2062%2C%20Noida!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-teal-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your 2-Year NEET Journey</h2>
          <p className="text-xl text-teal-100 mb-8">
            Join Class 11 batch for the best NEET preparation experience. Limited seats.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919953643938"
              className="bg-yellow-500 text-teal-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call Now: 99536-43938
            </a>
            <Link
              href="/biology-classes-ghaziabad"
              className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: '2 Year NEET Course for Ghaziabad Students',
            description:
              'Comprehensive 2-year NEET biology coaching from Class 11 for Ghaziabad students',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            timeRequired: 'P24M',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'Offline',
              duration: 'P24M',
            },
          }),
        }}
      />
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
    </div>
  )
}
