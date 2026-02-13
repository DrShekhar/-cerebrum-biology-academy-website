'use client'

import {
  Trophy,
  Users,
  Star,
  Award,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Clock,
  Target,
  Microscope,
  Calendar,
  Brain,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const teachingMethodology = [
  {
    icon: Brain,
    title: 'Conceptual Clarity',
    description: 'Deep understanding over rote memorization. Every concept explained from basics.',
  },
  {
    icon: Target,
    title: 'Exam-Oriented Approach',
    description: 'Teaching aligned with NEET & board exam patterns. Question-based learning.',
  },
  {
    icon: Microscope,
    title: 'Visual Learning',
    description: 'Diagrams, animations, and 3D models for complex biological processes.',
  },
  {
    icon: Calendar,
    title: 'Structured Curriculum',
    description: 'Well-planned syllabus coverage with regular assessments and revisions.',
  },
  {
    icon: Users,
    title: 'Batch Learning',
    description: 'Small batches of 15-20 students for peer learning and healthy competition.',
  },
  {
    icon: MessageCircle,
    title: 'Doubt Resolution',
    description: '24/7 WhatsApp support for immediate doubt clearing.',
  },
]

const credentials = [
  { label: 'AIIMS Alumni', value: 'Faculty' },
  { label: 'Teaching Experience', value: '15+ Years' },
  { label: 'Students Taught', value: '10,000+' },
  { label: 'AIIMS Selections', value: '67+' },
  { label: 'Success Rate', value: '98%' },
  { label: 'Average Score Improvement', value: '40%' },
]

const faqs = [
  {
    question: 'What makes a good biology teacher?',
    answer:
      'A good biology teacher combines deep subject knowledge with excellent communication skills. They should have exam experience (like NEET/AIIMS background), use visual teaching methods, provide structured curriculum, and be available for doubt resolution. At Cerebrum, our AIIMS-trained faculty brings all these qualities.',
  },
  {
    question: 'How is teaching different from tutoring?',
    answer:
      'Teaching involves structured curriculum delivery in batch settings with planned assessments, while tutoring is often one-on-one and flexible. Our approach combines the best of both - structured teaching methodology with personalized attention through small batches.',
  },
  {
    question: 'Do you teach both boards and NEET together?',
    answer:
      'Yes! Our curriculum is designed to cover board syllabus (CBSE/ICSE) while simultaneously preparing students for NEET. The integrated approach ensures students excel in both without extra effort.',
  },
  {
    question: 'What is the batch size?',
    answer:
      'We maintain small batches of 15-20 students to ensure personalized attention while maintaining the benefits of peer learning and healthy competition.',
  },
]

export default function BiologyTeacherPage() {
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
          <div className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-5 h-5 mr-2 text-yellow-300" />
              Expert Biology Teaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">Biology Teacher</span> for NEET & Boards
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              AIIMS-Trained Faculty | Structured Curriculum | 98% Success Rate
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Experience biology teaching that transforms understanding. Our expert faculty brings
              15+ years of experience, AIIMS background, and a proven methodology that has helped
              1,50,000+ students achieve their dreams.
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

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-indigo-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Courses
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {credentials.map((cred) => (
                <div key={cred.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-300">{cred.value}</div>
                  <div className="text-xs opacity-80">{cred.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Teaching Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Teaching Methodology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A perfect blend of expertise, structure, and personalized attention
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachingMethodology.map((method, index) => (
              <div key={method.title} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-fadeInUp">
                <method.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Credentials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Our Teachers Stand Out
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Award className="w-8 h-8 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">AIIMS Background</h3>
                    <p className="text-gray-600">
                      Our lead faculty cleared AIIMS entrance and understands what it takes to crack
                      medical entrances.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-8 h-8 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">15+ Years Experience</h3>
                    <p className="text-gray-600">
                      Over a decade of teaching experience with deep understanding of student
                      psychology and exam patterns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Trophy className="w-8 h-8 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Proven Track Record</h3>
                    <p className="text-gray-600">
                      67+ AIIMS selections with multiple students in top 1000 ranks every year.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Video className="w-8 h-8 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Modern Teaching Tools</h3>
                    <p className="text-gray-600">
                      Interactive sessions with animations, 3D models, and digital resources for
                      better understanding.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-2xl p-8 animate-fadeInUp">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Success Stories</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">
                    &quot;The teaching methodology is exceptional. Complex topics became simple.
                    Scored 680+ in NEET!&quot;
                  </p>
                  <p className="text-indigo-600 font-semibold mt-2">- Priya S., NEET 2024</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">
                    &quot;Best biology teacher I&apos;ve ever had. The structured approach made all
                    the difference.&quot;
                  </p>
                  <p className="text-indigo-600 font-semibold mt-2">- Rahul K., AIIMS Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp">
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
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Experience Expert Biology Teaching
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Book a free demo class and see the difference quality teaching makes!
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
              href="/biology-teacher-near-me"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Teacher Near Me
            </Link>
            <Link
              href="/best-biology-teacher-for-neet"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Best Biology Teacher for NEET
            </Link>
            <Link
              href="/biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tutor
            </Link>
            <Link
              href="/neet-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
