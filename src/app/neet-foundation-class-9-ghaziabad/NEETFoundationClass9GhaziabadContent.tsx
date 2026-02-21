'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle,
  Clock,
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Play,
  Home,
  Award,
  Users,
  Target,
  GraduationCap,
  TrendingUp,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ {
  question: string
  answer: string
}

const syllabusTopics = [
  {
    unit: 'Cell - The Unit of Life',
    chapters: ['Cell structure', 'Cell organelles', 'Cell division basics'],
    neetRelevance: 'High',
  },
  {
    unit: 'Tissues',
    chapters: ['Plant tissues', 'Animal tissues', 'Tissue functions'],
    neetRelevance: 'High',
  },
  {
    unit: 'Diversity in Living Organisms',
    chapters: ['Classification', 'Five Kingdom', 'Nomenclature'],
    neetRelevance: 'Medium',
  },
  {
    unit: 'Life Processes - I',
    chapters: ['Nutrition', 'Respiration basics', 'Transport'],
    neetRelevance: 'High',
  },
  {
    unit: 'Scientific Methodology',
    chapters: ['Observation', 'Hypothesis', 'Experimentation'],
    neetRelevance: 'Foundation',
  },
]

const benefits = [
  {
    title: '4-Year Head Start',
    description: 'More time to build concepts, less stress in Class 11-12',
    icon: Clock,
  },
  {
    title: 'Strong Foundation',
    description: 'Deep understanding of basics that NEET builds upon',
    icon: BookOpen,
  },
  {
    title: 'Board + NEET Dual Prep',
    description: 'Excel in school exams while preparing for NEET',
    icon: Target,
  },
  {
    title: 'Expert Faculty',
    description: 'Teachers who understand both board and competitive exams',
    icon: Users,
  },
  {
    title: 'Small Batches',
    description: 'Maximum 15 students for personalized attention',
    icon: GraduationCap,
  },
  {
    title: 'Score Improvement',
    description: 'Students score 50-100 marks higher starting early',
    icon: TrendingUp,
  },
]

const premiumSchools = [
  'DPS Indirapuram',
  'Amity International Vaishali',
  'Ryan International Ghaziabad',
  'GD Goenka Indirapuram',
  'Jaipuria School Indirapuram',
  'St. Mary\'s Convent Ghaziabad',
  'Delhi Public School Ghaziabad',
  'Genesis Global School Ghaziabad',
]

export default function NEETFoundationClass9GhaziabadContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'foundation-class9-ghaziabad',
      message:
        'Hi! I am a Class 9 student from Ghaziabad interested in NEET Foundation course. Please share details.',
      campaign: 'foundation-class9-ghaziabad',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-teal-600">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link href="/biology-classes-ghaziabad" className="text-gray-600 hover:text-teal-600">
                Biology Classes Ghaziabad
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Foundation Class 9</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-green-900 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              4-Year NEET Preparation Program
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NEET Foundation Class 9<span className="block text-green-400 mt-2">in Ghaziabad</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Start your medical dream journey from Class 9 in Ghaziabad. Build strong biology
              foundation while excelling in board exams. Classes at our Sector 62, Noida center —
              accessible via Blue Line Metro from Vaishali/Kaushambi in 20-25 minutes.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Clock className="w-5 h-5 text-green-400" />
                <span>4-Year Head Start</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Target className="w-5 h-5 text-yellow-400" />
                <span>Board + NEET Prep</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-orange-400" />
                <span>+50-100 Marks Boost</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-green-500 text-white hover:bg-green-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30 animate-fadeInUp"
              >
                <Phone className="w-5 h-5" />
                WhatsApp: +91-99536-43938
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Start Early */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Start NEET Prep from Class 9?
            </h2>
            <p className="text-xl text-slate-600">
              Students who start early consistently outperform others
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Class 9 Foundation Syllabus
            </h2>
            <p className="text-xl text-slate-600">
              NCERT-aligned curriculum with NEET relevance mapping
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabusTopics.map((topic) => (
              <div
                key={topic.unit}
                className="bg-green-50 rounded-2xl p-6 border border-green-100 animate-fadeInUp"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{topic.unit}</h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${topic.neetRelevance === 'High' ? 'bg-green-200 text-green-700' : topic.neetRelevance === 'Medium' ? 'bg-yellow-200 text-yellow-700' : 'bg-blue-200 text-blue-700'}`}
                  >
                    {topic.neetRelevance} NEET
                  </span>
                </div>
                <ul className="space-y-2">
                  {topic.chapters.map((chapter) => (
                    <li key={chapter} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {chapter}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Schools */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 animate-fadeInUp">
            <h2 className="text-3xl font-bold mb-4">Students from Premium Ghaziabad Schools</h2>
            <p className="text-green-100">
              We have students from all major schools in Ghaziabad & Indirapuram
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {premiumSchools.map((school) => (
              <span
                key={school}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
              >
                {school}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg animate-fadeInUp">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Course</span>
                  <span className="font-semibold">Class IX Foundation (NEET)</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-semibold">1 Year</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Fee Range</span>
                  <span className="font-semibold text-green-600">₹45,000 - ₹90,000/year</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Tiers</span>
                  <span className="font-semibold">Pursuit | Ascent | Pinnacle</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Batch Size</span>
                  <span className="font-semibold">10-40 students (by tier)</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-slate-600">Mode</span>
                  <span className="font-semibold">Offline + Online Support</span>
                </div>
              </div>
              <Link href="/demo-booking" className="block mt-6">
                <Button className="w-full bg-green-600 hover:bg-green-700">Book Free Demo</Button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 animate-fadeInUp">
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Center Location</h2>
              </div>
              <p className="text-gray-700 mb-4">
                <strong>Address:</strong> B-45, Sector 62, Noida, UP 201301
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Landmark:</strong> Near Sector 62 Metro Station (Blue Line, 5 min walk)
              </p>
              <p className="text-gray-700 mb-4">
                <strong>From Ghaziabad:</strong> Blue Line Metro from Vaishali or Kaushambi to
                Sector 62 (20-25 min)
              </p>
              <p className="text-gray-700 mb-6">
                <strong>Nearby areas:</strong> Indirapuram, Vasundhara, Raj Nagar Extension,
                Crossings Republik
              </p>
              <div className="flex gap-4">
                <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
                <a
                  href="https://maps.google.com/?q=B-45+Sector+62+Noida"
                  target="_blank"
                  rel="noopener"
                >
                  <Button>
                    <MapPin className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Start using our AI-powered tools for your NEET journey"
      />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/neet-foundation-class-10-ghaziabad"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Foundation Class 10</h3>
              <p className="text-sm text-gray-600">Continue your journey</p>
            </Link>
            <Link
              href="/neet-weekend-batch-ghaziabad"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">NEET Weekend Batch</h3>
              <p className="text-sm text-gray-600">Weekend classes for school students</p>
            </Link>
            <Link
              href="/biology-classes-ghaziabad"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Biology Classes Ghaziabad</h3>
              <p className="text-sm text-gray-600">Full NEET program</p>
            </Link>
            <Link
              href="/free-neet-demo-class-ghaziabad"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Free Demo Class</h3>
              <p className="text-sm text-gray-600">Try before you join</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your NEET Journey from Class 9 in Ghaziabad
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join Cerebrum Biology Academy and get a 4-year head start. Serving Indirapuram,
            Vaishali, Kaushambi, and all Ghaziabad areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-green-600 hover:bg-gray-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo
              </Button>
            </Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}>
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
