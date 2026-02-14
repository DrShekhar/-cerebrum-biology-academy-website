'use client'

import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  BookOpen,
  MessageCircle,
  Play,
  ArrowRight,
  Globe,
  Medal,
  GraduationCap,
  DollarSign,
  Brain,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const olympiads = [
  {
    name: 'NSO',
    fullName: 'National Science Olympiad',
    description: 'Science Olympiad Foundation exam for Class 1-12',
    eligibility: 'Class 1-12',
    benefits: 'Cash prizes, medals, recognition',
    link: '/nso-coaching',
    color: 'blue-600',
  },
  {
    name: 'NSEB',
    fullName: 'National Standard Examination in Biology',
    description: 'First stage of Biology Olympiad pathway to IBO',
    eligibility: 'Class 8-12',
    benefits: 'IBO pathway, international exposure',
    link: '/biology-olympiad-coaching',
    color: 'bg-green-600',
  },
  {
    name: 'USABO',
    fullName: 'USA Biology Olympiad',
    description: 'Premier Biology Olympiad for US high school students',
    eligibility: 'Grades 9-12 (USA)',
    benefits: 'Team USA, IBO pathway',
    link: '/usabo-coaching',
    color: 'from-green-600 to-cyan-600',
  },
  {
    name: 'KVPY',
    fullName: 'Kishore Vaigyanik Protsahan Yojana',
    description: 'Prestigious fellowship for science students',
    eligibility: 'Class 11-12, 1st year UG',
    benefits: 'Rs 5,000-7,000/month stipend',
    link: '/nso-coaching',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    name: 'NTSE',
    fullName: 'National Talent Search Examination',
    description: 'Indias most prestigious talent search exam',
    eligibility: 'Class 10',
    benefits: 'Rs 1.25 lakh/year till PhD',
    link: '/ntse-coaching',
    color: 'bg-orange-600',
  },
  {
    name: 'IJSO',
    fullName: 'International Junior Science Olympiad',
    description: 'International science olympiad for juniors',
    eligibility: 'Below 16 years',
    benefits: 'International medals, recognition',
    link: '/biology-olympiad-coaching',
    color: 'from-blue-500 to-blue-500',
  },
]

const benefits = [
  {
    icon: Globe,
    title: 'International Recognition',
    description: 'Get recognized globally. Olympiad medals are valued worldwide.',
  },
  {
    icon: GraduationCap,
    title: 'College Admissions',
    description: 'Strong profile for IITs, AIIMS, and universities abroad.',
  },
  {
    icon: DollarSign,
    title: 'Scholarships',
    description: 'NTSE: Rs 1.25L/year, KVPY: Rs 5-7K/month, NSO: Cash prizes.',
  },
  {
    icon: Brain,
    title: 'Conceptual Mastery',
    description: 'Deep understanding that helps in boards, NEET, and beyond.',
  },
  {
    icon: Medal,
    title: 'Career Opportunities',
    description: 'Research opportunities, internships, and career head start.',
  },
  {
    icon: Trophy,
    title: 'Competitive Edge',
    description: 'Develop problem-solving skills that set you apart.',
  },
]

const scholarships = [
  {
    exam: 'NTSE',
    scholarship: 'Rs 1.25 lakh/year',
    duration: 'Till PhD completion',
  },
  {
    exam: 'KVPY',
    scholarship: 'Rs 5,000-7,000/month',
    duration: 'During UG & PG',
  },
  {
    exam: 'NSO',
    scholarship: 'Rs 50,000 cash prizes',
    duration: 'One-time',
  },
  {
    exam: 'NSEB/IBO',
    scholarship: 'International exposure',
    duration: 'Represent India globally',
  },
]

const faqs = [
  {
    question: 'Which olympiads should Class 9-10 students focus on?',
    answer:
      'Class 9-10 students should focus on NSO (Science Olympiad) for general science skills, NTSE (Class 10 only) for scholarship, and NSEB for starting Biology Olympiad pathway. This combination provides scholarships, recognition, and strong NEET foundation.',
  },
  {
    question: 'How does Olympiad preparation help with NEET/JEE?',
    answer:
      'Olympiad preparation builds deep conceptual understanding that directly helps in NEET/JEE. Topics are same, just covered with more depth. Olympiad problem-solving skills make competitive exam preparation easier.',
  },
  {
    question: 'What are the benefits of KVPY and NTSE scholarships?',
    answer:
      'NTSE provides Rs 1.25 lakh per year till PhD - one of Indias most prestigious scholarships. KVPY provides Rs 5,000-7,000 monthly stipend during UG/PG plus contingency grant. Both add immense value to academic profile.',
  },
  {
    question: 'How is Olympiad coaching different from regular coaching?',
    answer:
      'Olympiad coaching goes beyond NCERT with advanced concepts, higher-order thinking, and application-based problems. We cover college-level topics for NSEB, reasoning for NTSE, and scientific aptitude for NSO.',
  },
  {
    question: 'When should students start Olympiad preparation?',
    answer:
      'Start as early as possible! Class 6-8 can begin with NSO, Class 9 can add NSEB prep, and Class 10 must prepare for NTSE. Early start means more time to develop skills and multiple attempts possible.',
  },
]

export default function OlympiadPreparationPage() {
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
      <section className="relative bg-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-5 h-5 mr-2 text-violet-300" />
              Olympiad Preparation
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-violet-300">Olympiad</span> Preparation
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              NSO | NSEB | KVPY | NTSE | IJSO | All Science Olympiads
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Comprehensive Olympiad preparation for all competitive science exams. Build
              problem-solving skills, earn scholarships, and gain international recognition. Your
              pathway to academic excellence starts here!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-violet-400 text-black hover:bg-violet-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-indigo-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View All Courses
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-violet-300" />
                <div className="text-2xl font-bold">5+</div>
                <div className="text-sm opacity-80">Olympiads Covered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-violet-300" />
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm opacity-80">Scholars Produced</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-violet-300" />
                <div className="text-2xl font-bold">Rs 1.25L</div>
                <div className="text-sm opacity-80">NTSE Scholarship</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-violet-300" />
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm opacity-80">Selection Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Olympiads Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Olympiads We Prepare You For
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive preparation for all major science olympiads
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {olympiads.map((olympiad, index) => (
              <div
                key={olympiad.name}
               className="animate-fadeInUp">
                <Link href={olympiad.link}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition h-full">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${olympiad.color} flex items-center justify-center text-white text-xl font-bold mb-4`}
                    >
                      {olympiad.name}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{olympiad.fullName}</h3>
                    <p className="text-gray-600 mb-4">{olympiad.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        {olympiad.eligibility}
                      </div>
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {olympiad.benefits}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Prepare for Olympiads?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Life-changing benefits that go beyond medals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-100 animate-fadeInUp"
              >
                <benefit.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Scholarships & Rewards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Financial rewards for your academic excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scholarships.map((item, index) => (
              <div
                key={item.exam}
                className="bg-white rounded-xl p-6 shadow-lg text-center animate-fadeInUp"
              >
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.exam}</h3>
                <p className="text-2xl font-bold text-green-600 mb-2">{item.scholarship}</p>
                <p className="text-gray-500 text-sm">{item.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-indigo-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your Olympiad Journey Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Build skills, earn scholarships, gain recognition!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-violet-400 text-black hover:bg-violet-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-indigo-600"
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
              href="/usabo-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              USABO Coaching (USA)
            </Link>
            <Link
              href="/courses"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NSO Coaching
            </Link>
            <Link
              href="/biology-olympiad-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Olympiad (India)
            </Link>
            <Link
              href="/courses"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NTSE Coaching
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
