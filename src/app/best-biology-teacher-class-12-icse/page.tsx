'use client'

import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  MessageCircle,
  Play,
  ArrowRight,
  Dna,
  Leaf,
  Heart,
  Microscope,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const iscClass12Syllabus = [
  {
    unit: 'Section A',
    title: 'Genetics & Evolution',
    topics: [
      "Mendel's Laws",
      'Chromosomal Theory',
      'Linkage & Crossing Over',
      'Sex Determination',
      'Mutation',
      'Human Genetics',
      'Evolution',
    ],
    weightage: 'High',
    icon: Dna,
    highlight: true,
  },
  {
    unit: 'Section B',
    title: 'Biotechnology',
    topics: [
      'Genetic Engineering',
      'Recombinant DNA Technology',
      'Applications of Biotechnology',
      'Bioethics',
    ],
    weightage: 'High',
    icon: Microscope,
    highlight: true,
  },
  {
    unit: 'Section C',
    title: 'Biology & Human Welfare',
    topics: [
      'Health & Disease',
      'Immunity',
      'AIDS',
      'Cancer',
      'Drug Addiction',
      'Microbes in Human Welfare',
    ],
    weightage: 'Medium',
    icon: Heart,
    highlight: false,
  },
  {
    unit: 'Section D',
    title: 'Ecology & Environment',
    topics: ['Organisms and Populations', 'Ecosystem', 'Biodiversity', 'Environmental Issues'],
    weightage: 'Medium',
    icon: Leaf,
    highlight: false,
  },
]

const faqs = [
  {
    question: 'Is ISC Class 12 Biology harder than CBSE?',
    answer:
      'ISC Biology is slightly more detailed than CBSE, covering additional topics in depth. However, both are based on similar core concepts. For NEET, ISC students need to additionally focus on NCERT. Our teaching ensures complete preparation for both ISC boards and NEET.',
  },
  {
    question: 'Can ISC students crack NEET with top ranks?',
    answer:
      'Absolutely! Many ISC students have secured top ranks in NEET. The key is to supplement ISC preparation with thorough NCERT study. Our AIIMS-trained faculty ensures you master both ISC syllabus and NEET requirements.',
  },
  {
    question: 'How to balance ISC boards and NEET in Class 12?',
    answer:
      'Our integrated approach covers both simultaneously. We complete ISC syllabus while integrating NCERT. The overlap is significant, so efficient planning helps you excel in both without extra stress.',
  },
  {
    question: 'What about practical exams in ISC?',
    answer:
      'We provide complete guidance for ISC practicals including specimen identification, experiments, and project work. Practical preparation is integrated into our regular classes.',
  },
]

export default function BestBiologyTeacherClass12ICSEPage() {
  return (
    <div className="min-h-screen">
      {/* FAQ Schema */}
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
      <section className="relative bg-gradient-to-br from-rose-900 via-pink-800 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-5 h-5 mr-2 text-yellow-300" />
              Class 12 ICSE / ISC Biology
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">Biology Teacher</span> for Class 12 ICSE
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              ISC Board + NEET Excellence | Genetics & Biotechnology Experts
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Class 12 ISC students need specialized coaching that covers ISC syllabus thoroughly
              while integrating NCERT for NEET. Our AIIMS-trained faculty ensures excellence in both
              board exams and competitive entrance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses/class-12">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-rose-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Target className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">Dual</div>
                <div className="text-sm opacity-80">ISC + NEET</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-80">ISC Coverage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">10-15</div>
                <div className="text-sm opacity-80">Per Batch</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              ISC Class 12 Biology Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete ISC syllabus with NCERT integration. High-weightage sections highlighted.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {iscClass12Syllabus.map((section, index) => (
              <div
                key={section.unit}
                className={`rounded-xl p-8 shadow-lg ${
                  section.highlight ? 'bg-rose-50 border-2 border-rose-200' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        section.highlight ? 'bg-rose-200' : 'bg-gray-100'
                      }`}
                    >
                      <section.icon
                        className={`w-7 h-7 ${section.highlight ? 'text-rose-600' : 'text-gray-600'}`}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{section.unit}</h3>
                      <p
                        className={`font-medium ${section.highlight ? 'text-rose-600' : 'text-gray-600'}`}
                      >
                        {section.title}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      section.highlight ? 'bg-rose-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {section.weightage}
                  </span>
                </div>
                <ul className="space-y-2">
                  {section.topics.map((topic) => (
                    <li key={topic} className="flex items-center text-gray-700">
                      <CheckCircle
                        className={`w-5 h-5 mr-3 flex-shrink-0 ${
                          section.highlight ? 'text-rose-500' : 'text-green-600'
                        }`}
                      />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">What You Get</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
            >
              <Award className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">AIIMS Trained Faculty</h3>
              <p className="text-gray-600">
                Expert guidance from faculty with medical entrance expertise.
              </p>
            </div>

            <div
              className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
            >
              <Target className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">ISC + NEET Dual Focus</h3>
              <p className="text-gray-600">
                Strategic preparation for both ISC boards and NEET entrance.
              </p>
            </div>

            <div
              className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
            >
              <BookOpen className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">NCERT Integration</h3>
              <p className="text-gray-600">
                ISC syllabus supplemented with NCERT for competitive exams.
              </p>
            </div>

            <div
              className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
            >
              <Users className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Small Batches</h3>
              <p className="text-gray-600">10-15 students for personalized attention.</p>
            </div>

            <div
              className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
            >
              <Star className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">ISC Pattern Practice</h3>
              <p className="text-gray-600">
                Extensive ISC board pattern questions and previous year papers.
              </p>
            </div>

            <div
              className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
            >
              <MessageCircle className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">WhatsApp doubt support especially during exam season.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">FAQs</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-rose-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Excel in ISC Boards and NEET</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Expert coaching for Class 12 ISC Biology. Book your free demo today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-rose-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/best-biology-teacher-class-11-icse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 ICSE Biology
            </Link>
            <Link
              href="/best-biology-teacher-class-12-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 12 CBSE Biology
            </Link>
            <Link
              href="/biology-teacher"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Teacher
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
