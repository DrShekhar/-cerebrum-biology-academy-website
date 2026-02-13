'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Home,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Award,
  Trophy,
  Target,
  BookOpen,
  MessageCircle,
  Play,
  Phone,
  TrendingUp,
  Brain,
  Lightbulb,
  Medal,
  UserX,
  Building,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const homeTutorProblems = [
  {
    icon: UserX,
    title: 'No Medical Entrance Expertise',
    description:
      'Most home tutors have basic science degrees. They lack NEET-specific knowledge, question patterns, and exam strategies that AIIMS-trained faculty possess.',
  },
  {
    icon: Users,
    title: 'No Peer Learning Environment',
    description:
      'Studying alone at home means no competition, no peer discussions, and no exposure to how toppers think and study.',
  },
  {
    icon: BookOpen,
    title: 'Limited Resources',
    description:
      'Home tutors rarely have comprehensive question banks, mock tests, or previous year analysis. They teach from textbooks alone.',
  },
  {
    icon: Target,
    title: 'No Competitive Atmosphere',
    description:
      "Without seeing other serious aspirants, students develop false confidence. They don't know where they truly stand.",
  },
  {
    icon: TrendingUp,
    title: 'No Track Record',
    description:
      'Ask any home tutor - how many NEET top 1000 rankers have they produced? The answer is usually zero.',
  },
  {
    icon: Brain,
    title: 'One-Dimensional Teaching',
    description:
      'A single home tutor cannot match the depth, variety, and expertise of a team of specialized faculty members.',
  },
]

const cerebrumAdvantages = [
  {
    icon: Award,
    title: 'AIIMS-Trained Faculty',
    description:
      'Dr. Shekhar Singh and team are trained at premier medical institutions. They know exactly what NEET demands.',
    highlight: true,
  },
  {
    icon: Users,
    title: 'Peer Learning Magic',
    description:
      'Study with 10-15 serious aspirants. See how toppers approach problems. Competition drives excellence.',
    highlight: true,
  },
  {
    icon: Trophy,
    title: '98% Success Rate',
    description:
      '1,50,000+ students selected in medical colleges. Proven methodology that produces results year after year.',
    highlight: false,
  },
  {
    icon: Target,
    title: 'Wider Learning Bandwidth',
    description:
      'When you see students better than you, your standards rise automatically. Home tuition keeps you in a bubble.',
    highlight: true,
  },
  {
    icon: BookOpen,
    title: 'Complete Resources',
    description:
      'NCERT-based notes, 50,000+ question bank, previous year papers, mock tests - everything included.',
    highlight: false,
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Support',
    description: "WhatsApp support anytime. Your home tutor won't answer at 11 PM before an exam.",
    highlight: false,
  },
]

const comparisonData = [
  { feature: 'Faculty Qualification', homeTutor: 'BSc/MSc', cerebrum: 'AIIMS Trained' },
  { feature: 'NEET Top 1000 Produced', homeTutor: '0-1', cerebrum: '67+' },
  { feature: 'Peer Learning', homeTutor: 'None', cerebrum: '10-15 Students' },
  { feature: 'Study Material', homeTutor: 'Textbooks Only', cerebrum: 'Complete Package' },
  { feature: 'Mock Tests', homeTutor: 'Rarely', cerebrum: 'Weekly + Monthly' },
  { feature: 'Doubt Support', homeTutor: 'Limited Hours', cerebrum: '24/7 WhatsApp' },
  { feature: 'Success Rate', homeTutor: '30-40%', cerebrum: '98%' },
  { feature: 'Cost per Year', homeTutor: '₹60K-1.2L', cerebrum: '₹24K-48K' },
]

const faqs = [
  {
    question: "Why shouldn't I hire a biology home tutor?",
    answer:
      'Home tutors lack medical entrance expertise, peer learning environment, comprehensive resources, and proven track records. Most home tutors have never produced a NEET top 1000 ranker. For board exams, home tutors might work. For competitive exams like NEET where you compete with 20 lakh students, you need expert coaching with peer learning.',
  },
  {
    question: 'Is small batch coaching better than one-on-one home tuition?',
    answer:
      'Absolutely! Small batch coaching (10-15 students) provides the best of both worlds - personal attention plus peer learning. When you study with other serious aspirants, you see different problem-solving approaches, participate in healthy competition, and automatically raise your standards. One-on-one tuition keeps you in a bubble.',
  },
  {
    question: "But I want personalized attention. Won't I get that with a home tutor?",
    answer:
      'Our small batches of 10-15 students ensure personalized attention from AIIMS-trained faculty. Plus, you get 24/7 WhatsApp doubt support. The quality of attention from Dr. Shekhar Singh (AIIMS trained) is incomparable to an average home tutor with a basic degree.',
  },
  {
    question: 'What if I cannot travel to your centers?',
    answer:
      'We offer live online classes with the same faculty and quality. Many students from remote areas join online. However, for serious aspirants aiming for top 500 ranks, we recommend relocating to Delhi NCR for at least 6 months to experience the offline environment.',
  },
  {
    question: 'I still want a home tutor. Can you help?',
    answer:
      "We understand every student has different needs. Talk to our counselors - we'll help you understand your specific situation and suggest the best approach. Many parents who insisted on home tutors later enrolled their children at Cerebrum after understanding the difference.",
  },
]

export default function BiologyHomeTutorPage() {
  const router = useRouter()
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    class: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    router.push(`/demo-booking?source=home-tutor&name=${formData.name}&phone=${formData.phone}`)
  }

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

      {/* Hero Section - Acknowledge */}
      <section className="relative bg-gradient-to-br from-orange-900 via-red-800 to-rose-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fadeInUp">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Home className="w-5 h-5 mr-2 text-yellow-300" />
              Looking for a Biology Home Tutor?
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Before You Hire a <span className="text-yellow-300">Home Tutor</span>, Read This
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              We understand you want personalized attention. But there&apos;s a better way.
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Every year, thousands of students hire home tutors for NEET Biology. Most of them fail
              to crack NEET. Here&apos;s why ordinary home tutors don&apos;t work - and what
              actually does.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  See the Difference - Free Demo
                </Button>
              </Link>

              <button
                onClick={() => setShowEnquiryForm(true)}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-orange-900 transition font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                Talk to Counselor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Home Tutors Fail */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-red-100 px-4 py-2 rounded-full text-red-700 font-medium mb-4">
              <AlertTriangle className="w-5 h-5 mr-2" />
              The Harsh Truth
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Ordinary Home Tutors <span className="text-red-600">Don&apos;t Produce</span> NEET
              Toppers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For board exams, a home tutor might work. But NEET is a different game - you compete
              with 20 lakh students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeTutorProblems.map((problem, index) => (
              <div key={problem.title} className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-red-500 animate-fadeInUp">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <problem.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
                <p className="text-gray-600">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Cerebrum Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full text-green-700 font-medium mb-4">
              <Lightbulb className="w-5 h-5 mr-2" />
              The Solution
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why <span className="text-green-600">Small Batch Coaching</span> Produces Toppers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You want personalized attention? Our 10-15 student batches give you that - plus the
              peer learning that home tutors can never provide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cerebrumAdvantages.map((advantage, index) => (
              <div key={advantage.title} className={`rounded-xl p-8 shadow-lg ${
                  advantage.highlight ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'
                }` + " animate-fadeInUp"}>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    advantage.highlight ? 'bg-green-200' : 'bg-gray-200'
                  }`}
                >
                  <advantage.icon
                    className={`w-6 h-6 ${advantage.highlight ? 'text-green-700' : 'text-gray-700'}`}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Home Tutor vs Cerebrum - The Truth
            </h2>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-3 bg-gray-800 text-white font-bold">
              <div className="p-4">Feature</div>
              <div className="p-4 text-center bg-red-700">Home Tutor</div>
              <div className="p-4 text-center bg-green-700">Cerebrum</div>
            </div>
            {comparisonData.map((row, index) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <div className="p-4 font-medium text-gray-900">{row.feature}</div>
                <div className="p-4 text-center text-red-600 flex items-center justify-center">
                  <XCircle className="w-4 h-4 mr-2" />
                  {row.homeTutor}
                </div>
                <div className="p-4 text-center text-green-600 font-semibold flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {row.cerebrum}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Key Insight */}
      <section className="py-20 bg-[#4a5d4a] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <Medal className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              &quot;When you study with students better than you, your standards rise
              automatically.&quot;
            </h2>
            <p className="text-xl opacity-90 mb-8">
              This is the single biggest advantage of small batch coaching over home tuition. A home
              tutor keeps you in a bubble. At Cerebrum, you see how toppers think, study, and solve
              problems.
            </p>
            <p className="text-lg opacity-80">
              - Dr. Shekhar Singh, AIIMS Trained, Founder of Cerebrum Biology Academy
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="bg-gray-50 rounded-xl p-8 animate-fadeInUp">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-orange-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to See the Difference?</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Book a free demo class and experience why small batch coaching beats home tuition.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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

              <Link href="/locations">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  <Building className="w-5 h-5 mr-2" />
                  Visit Our Centers
                </Button>
              </Link>
            </div>

            <p className="text-lg opacity-80">
              Still want a home tutor?{' '}
              <button
                onClick={() => setShowEnquiryForm(true)}
                className="underline hover:text-yellow-300"
              >
                Talk to our counselor
              </button>{' '}
              - we&apos;ll help you make the right choice.
            </p>
          </div>
        </div>
      </section>

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto animate-fadeInUp"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Talk to Our Counselor</h2>
              <button
                onClick={() => setShowEnquiryForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              We understand every student is different. Share your details and our counselor will
              help you find the best solution.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Student's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="City, State"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select class</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                  <option value="dropper">Dropper</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us about your requirement
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                  placeholder="Why are you looking for a home tutor?"
                />
              </div>

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                <Phone className="w-5 h-5 mr-2" />
                Request Callback
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tutor
            </Link>
            <Link
              href="/biology-tutors-near-me"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tutors Near Me
            </Link>
            <Link
              href="/courses"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Our Courses
            </Link>
            <Link
              href="/faculty"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Meet Our Faculty
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
