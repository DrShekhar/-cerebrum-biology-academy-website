import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, Star, Users, Trophy, Building2, ArrowRight, BookOpen, Target, Clock, Gift, GraduationCap, Award, Quote } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'Best Biology Tutor in Noida 2026 | AIIMS Faculty | Dr. Shekhar | Cerebrum',
  description:
    'Find the best Biology tutor in Noida. Dr. Shekhar C Singh (AIIMS alumnus, 15+ years). 67+ AIIMS selections, 4.9/5 rating. Online & offline. Gaur City, Sector 150. Free demo!',
  keywords: [
    'best biology tutor noida',
    'best biology teacher noida',
    'top biology tutor noida',
    'biology tutor near me noida',
    'best biology coaching noida',
    'biology expert noida',
    'neet biology tutor noida',
  ],
  openGraph: {
    title: 'Best Biology Tutor in Noida | AIIMS Faculty | 500+ Selections',
    description: 'Learn from Dr. Shekhar C Singh, AIIMS alumnus with 15+ years experience and 67+ AIIMS selections.',
    url: 'https://cerebrumbiologyacademy.com/best-biology-tutor-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-tutor-noida',
  },
}

const tutorProfile = {
  name: 'Dr. Shekhar C Singh',
  qualification: 'AIIMS Delhi Alumnus',
  experience: '15+ Years',
  selections: '67+',
  rating: '4.9/5',
  specialization: 'NEET Biology Expert',
}

const credentials = [
  { icon: GraduationCap, title: 'AIIMS Delhi Alumnus', description: 'Medical education from India\'s top institution' },
  { icon: Clock, title: '15+ Years Experience', description: 'Teaching Biology for NEET and boards since 2009' },
  { icon: Trophy, title: '67+ AIIMS Selections', description: 'Students in top medical colleges across India' },
  { icon: Star, title: '4.9/5 Google Rating', description: 'Consistently rated best by students and parents' },
  { icon: Award, title: 'Subject Matter Expert', description: 'Author of NEET Biology study materials' },
  { icon: Users, title: '5000+ Students Taught', description: 'From Delhi NCR, India, and abroad' },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Gaur City, Noida',
    score: '685/720',
    text: 'Dr. Shekhar sir made Biology so easy to understand. His NCERT explanations are the best. Got into AIIMS Delhi!',
  },
  {
    name: 'Rahul Gupta',
    location: 'Sector 150, Noida',
    score: '650/720',
    text: 'Best biology tutor in Noida! Small batch size meant I could ask all my doubts. Worth every rupee.',
  },
  {
    name: 'Ananya Singh',
    location: 'Greater Noida West',
    score: '635/720',
    text: 'Online classes were as good as offline. Sir\'s teaching style and WhatsApp doubt support is amazing.',
  },
]

const freeTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Target },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building2 },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: BookOpen },
]

const courses = [
  { name: 'Class 11 NEET (Pursuit to Pinnacle)', fee: '48,000 - 98,000', mode: 'Online/Hybrid', link: '/biology-class-11-noida' },
  { name: 'Class 12 NEET (Pursuit to Pinnacle)', fee: '70,000 - 98,000', mode: 'Online/Hybrid', link: '/biology-class-12-noida' },
  { name: 'Dropper Batch (Pursuit to Pinnacle ZA)', fee: '70,000 - 1,56,000', mode: 'Online/Offline', link: '/neet-dropper-batch-online' },
  { name: 'Board Only (Pursuit to Pinnacle)', fee: '40,000 - 68,000', mode: 'Online', link: '/class-12-board-biology-noida' },
]

const faqs = [
  {
    question: 'Who is the best Biology tutor in Noida?',
    answer: 'Dr. Shekhar C Singh is widely regarded as the best Biology tutor in Noida. AIIMS Delhi alumnus with 15+ years experience, 67+ AIIMS selections, and 4.9/5 rating. He specializes in making complex Biology concepts simple and memorable.',
  },
  {
    question: 'What are the fees for the best Biology tutor in Noida?',
    answer: 'Dr. Shekhar\'s Biology coaching has 3 tiers: Pursuit (30-40 students), Ascent (16-18 students), Pinnacle (10-12 students). Class 11: Rs 48,000-98,000/year, Class 12: Rs 70,000-98,000/year, Droppers: Rs 70,000-1,56,000/year. Pinnacle tier includes personal mentorship from Dr. Shekhar.',
  },
  {
    question: 'Does the best Biology tutor offer online classes for Noida students?',
    answer: 'Yes! Dr. Shekhar offers full online courses for Noida students. Live interactive classes, recorded lectures, WhatsApp doubt support. 70% of Noida students prefer online mode for convenience.',
  },
  {
    question: 'How can I book a demo class with the best Biology tutor?',
    answer: 'WhatsApp us at 88264-44334 to book a free demo class. You can attend one full session before deciding. Demo available for all courses - Class 11, 12, and Dropper batches.',
  },
]

export default function BestBiologyTutorNoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Award className="w-4 h-4" /> #1 Rated Biology Tutor
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Best Biology Tutor in Noida</h1>
            <p className="text-xl text-slate-300 mb-6">
              Learn from Dr. Shekhar C Singh - AIIMS alumnus, 15+ years experience, 67+ AIIMS selections
            </p>

            {/* Tutor Quick Stats */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">{tutorProfile.qualification}</p>
                  <p className="text-sm text-slate-300">Education</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">{tutorProfile.experience}</p>
                  <p className="text-sm text-slate-300">Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">{tutorProfile.selections}</p>
                  <p className="text-sm text-slate-300">NEET Selections</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">{tutorProfile.rating}</p>
                  <p className="text-sm text-slate-300">Google Rating</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons - WhatsApp Priority */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20learn%20Biology%20from%20the%20best%20tutor%20in%20Noida.%20Please%20share%20demo%20class%20details."
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp for Demo
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition"
              >
                <Phone className="w-5 h-5" />
                Call: 88264-44334
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Banner */}
      <section className="py-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              <span className="font-semibold">Free NEET Tools:</span>
            </div>
            {freeTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition"
              >
                <tool.icon className="w-4 h-4" />
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why Dr. Shekhar is the Best Biology Tutor</h2>
          <p className="text-center text-gray-600 mb-12">Credentials that matter</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {credentials.map((item, index) => (
              <div key={index} className="bg-amber-50 rounded-xl p-6 text-center">
                <item.icon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What Noida Students Say</h2>
          <p className="text-center text-gray-600 mb-12">Real results from real students</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <Quote className="w-8 h-8 text-amber-400 mb-4" />
                <p className="text-gray-700 mb-4 italic">"{item.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.location}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">
                    {item.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Courses by the Best Biology Tutor</h2>
          <p className="text-center text-gray-600 mb-12">Choose your learning path</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {courses.map((course, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-amber-400 transition">
                <h3 className="font-bold mb-2">{course.name}</h3>
                <p className="text-2xl font-bold text-amber-600 mb-2">₹{course.fee}</p>
                <p className="text-sm text-gray-500 mb-4">{course.mode}</p>
                <a
                  href={`https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(course.name)}%20with%20Dr.%20Shekhar%20for%20Noida%20students.`}
                  className="block text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Enquire
                </a>
              </div>
            ))}
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
                  <span className="text-amber-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Learn from Noida's Best Biology Tutor</h2>
          <p className="text-xl text-slate-300 mb-8">Book your free demo class today</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20free%20demo%20class%20with%20the%20best%20Biology%20tutor%20in%20Noida."
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Book Free Demo
            </a>
            <Link
              href="/neet-coaching-noida"
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              View All Noida Courses <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-slate-400 text-sm">
            <Clock className="w-4 h-4 inline mr-1" />
            Respond within 30 minutes during 9 AM - 9 PM
          </p>
        </div>
      </section>

      {/* Comprehensive Schema Markup */}
      <NoidaPageSchemas
        area="Noida"
        pageName="Best Biology Tutor in Noida"
        pageDescription="Find the best Biology tutor in Noida. Dr. Shekhar C Singh (AIIMS alumnus) with 15+ years experience. 67+ AIIMS selections."
        pageUrl="https://cerebrumbiologyacademy.com/best-biology-tutor-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/locations/noida' },
          { name: 'Best Biology Tutor Noida', url: 'https://cerebrumbiologyacademy.com/best-biology-tutor-noida' },
        ]}
        customFAQs={faqs}
      />
    </div>
  )
}
