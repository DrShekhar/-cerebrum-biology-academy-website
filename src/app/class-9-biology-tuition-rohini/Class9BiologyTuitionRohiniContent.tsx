'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle,
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
  Star,
  FileText,
  Microscope,
  Train,
  Sparkles,
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
    unit: 'Cell - Fundamental Unit of Life',
    chapters: ['Cell Theory', 'Cell Structure', 'Plasma Membrane', 'Nucleus & Organelles'],
    board: 'CBSE & ICSE',
    neetRelevance: 'High',
  },
  {
    unit: 'Tissues',
    chapters: ['Plant Tissues', 'Animal Tissues', 'Meristematic Tissue', 'Permanent Tissue'],
    board: 'CBSE & ICSE',
    neetRelevance: 'High',
  },
  {
    unit: 'Diversity in Living Organisms',
    chapters: ['Classification', 'Five Kingdom System', 'Animal Kingdom', 'Plant Kingdom'],
    board: 'CBSE & ICSE',
    neetRelevance: 'Very High',
  },
  {
    unit: 'Why Do We Fall Ill',
    chapters: ['Health & Disease', 'Infectious Diseases', 'Immunity', 'Prevention'],
    board: 'CBSE',
    neetRelevance: 'High',
  },
  {
    unit: 'Natural Resources',
    chapters: ['Air & Water Resources', 'Soil', 'Biogeochemical Cycles'],
    board: 'CBSE & ICSE',
    neetRelevance: 'Medium',
  },
  {
    unit: 'Improvement in Food Resources',
    chapters: ['Crop Production', 'Animal Husbandry', 'Farming Practices'],
    board: 'CBSE',
    neetRelevance: 'Medium',
  },
]

const features = [
  {
    title: 'NEET Foundation + Boards',
    description: 'Integrated NEET foundation concepts with CBSE & ICSE syllabus coverage',
    icon: Sparkles,
  },
  {
    title: 'Experienced Faculty',
    description: 'Teachers with 15+ years experience in board and competitive exams',
    icon: Users,
  },
  {
    title: 'Small Batch Size',
    description: 'Maximum 15 students per batch for personalized attention',
    icon: GraduationCap,
  },
  {
    title: 'Practical Focus',
    description: 'Hands-on experiments, diagram practice, and lab sessions',
    icon: Microscope,
  },
  {
    title: 'Regular Testing',
    description: 'Weekly tests, monthly assessments, and NEET-pattern quizzes',
    icon: Target,
  },
  {
    title: 'Doubt Sessions',
    description: 'Dedicated doubt clearing classes and one-on-one support',
    icon: BookOpen,
  },
]

const boardComparison = [
  { topic: 'Cell Biology', cbse: '2 Chapters', icse: '3 Chapters', focus: 'Cell structure, organelles' },
  { topic: 'Tissues', cbse: '1 Chapter', icse: '2 Chapters', focus: 'Plant & animal tissues' },
  { topic: 'Diversity', cbse: '1 Chapter', icse: '2 Chapters', focus: 'Classification systems' },
  { topic: 'Health', cbse: '1 Chapter', icse: '1 Chapter', focus: 'Diseases & immunity' },
]

const rohiniSchools = [
  'DPS Rohini',
  'Ryan International Rohini',
  'Bal Bharati Rohini',
  'GD Goenka Rohini',
  'Venkateshwar International',
  'Mount Abu Public School',
  'N.K. Bagrodia School',
  'DAV Public School Rohini',
  'Apeejay School Rohini',
]

const neetFoundationTopics = [
  'Cell Biology fundamentals for NEET',
  'Taxonomy and Classification basics',
  'Human Physiology introduction',
  'Plant Physiology concepts',
  'Genetics foundation',
  'Ecology and Environment basics',
]

export default function Class9BiologyTuitionRohiniContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'class9-biology-tuition-rohini',
      message: 'Hi! I am interested in Class 9 Biology tuition at your Rohini center. Please share details about NEET foundation program.',
      campaign: 'class9-biology-tuition-rohini',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
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
              <Link href="/biology-coaching" className="text-gray-600 hover:text-teal-600">
                Biology Tuition
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Class 9 Rohini</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-purple-900 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              NEET Foundation + CBSE & ICSE Board Preparation
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Class 9 Biology Tuition
              <span className="block text-purple-400 mt-2">in Rohini, Delhi</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Expert Class 9 Biology tuition with integrated NEET foundation for CBSE and ICSE boards. Build a strong
              foundation for board exams and competitive entrance tests at our DC Chauk, Rohini center.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span>NEET Foundation</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <FileText className="w-5 h-5 text-purple-400" />
                <span>CBSE & ICSE</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-indigo-400" />
                <span>Max 15 Students</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>10+ Years Experience</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-purple-500 text-white hover:bg-purple-400 font-bold"
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
                WhatsApp: +91-88264-44334
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our Class 9 Biology Tuition in Rohini?
            </h2>
            <p className="text-xl text-slate-600">
              Comprehensive preparation for CBSE, ICSE boards with NEET foundation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEET Foundation Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Early Preparation Advantage
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">NEET Foundation in Class 9</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Start your NEET preparation journey early. Our Class 9 program integrates competitive exam concepts
              alongside board syllabus.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="bg-white rounded-2xl p-8 shadow-lg animate-fadeInUp"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">NEET Foundation Topics Covered</h3>
              <ul className="space-y-3">
                {neetFoundationTopics.map((topic) => (
                  <li key={topic} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-slate-700">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-8 text-white animate-fadeInUp"
            >
              <h3 className="text-xl font-bold mb-6">Why Start NEET Prep in Class 9?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold">Strong Foundation</p>
                    <p className="text-amber-100 text-sm">Build concepts that are crucial for NEET syllabus</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold">More Revision Time</p>
                    <p className="text-amber-100 text-sm">3+ years to master concepts before the actual exam</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold">Reduced Stress</p>
                    <p className="text-amber-100 text-sm">Gradual learning without last-minute pressure</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-semibold">Competitive Edge</p>
                    <p className="text-amber-100 text-sm">Stay ahead of peers who start late</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Board Comparison Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">CBSE vs ICSE Coverage</h2>
            <p className="text-xl text-slate-600">We cover both board patterns comprehensively</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Topic</th>
                  <th className="px-6 py-4 text-center">CBSE</th>
                  <th className="px-6 py-4 text-center">ICSE</th>
                  <th className="px-6 py-4 text-left">Key Focus</th>
                </tr>
              </thead>
              <tbody>
                {boardComparison.map((row, index) => (
                  <tr key={row.topic} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{row.topic}</td>
                    <td className="px-6 py-4 text-center">{row.cbse}</td>
                    <td className="px-6 py-4 text-center">{row.icse}</td>
                    <td className="px-6 py-4 text-slate-600">{row.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Complete Class 9 Biology Syllabus</h2>
            <p className="text-xl text-slate-600">All NCERT chapters covered with NEET relevance indicators</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabusTopics.map((topic, index) => (
              <div
                key={topic.unit}
                className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{topic.unit}</h3>
                  <div className="flex flex-col gap-1">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                      {topic.board}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        topic.neetRelevance === 'Very High'
                          ? 'bg-amber-100 text-amber-700'
                          : topic.neetRelevance === 'High'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      NEET: {topic.neetRelevance}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {topic.chapters.map((chapter) => (
                    <li key={chapter} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      {chapter}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rohini Schools Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-8 animate-fadeInUp"
          >
            <h2 className="text-3xl font-bold mb-4">Students from Top Rohini Schools</h2>
            <p className="text-purple-100">We teach students from all major CBSE & ICSE schools in Rohini</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {rohiniSchools.map((school) => (
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

      {/* Course Details & Location Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 animate-fadeInUp"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-purple-100">
                  <span className="text-slate-600">Course</span>
                  <span className="font-semibold">Class IX Foundation (Academic + NEET)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-purple-100">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-semibold">1 Year</span>
                </div>
                <div className="flex justify-between py-3 border-b border-purple-100">
                  <span className="text-slate-600">Fee Range</span>
                  <span className="font-semibold text-purple-600">Rs.40,000 - Rs.60,000/year</span>
                </div>
                <div className="flex justify-between py-3 border-b border-purple-100">
                  <span className="text-slate-600">Tiers</span>
                  <span className="font-semibold">Pursuit | Ascent | Pinnacle</span>
                </div>
                <div className="flex justify-between py-3 border-b border-purple-100">
                  <span className="text-slate-600">Batch Size</span>
                  <span className="font-semibold">10-40 students (by tier)</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-slate-600">Includes</span>
                  <span className="font-semibold">Study material + Doubt sessions</span>
                </div>
              </div>
              <Link href="/demo-booking" className="block mt-6">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Book Free Demo</Button>
              </Link>
            </div>

            <div
              className="bg-white rounded-2xl p-8 shadow-xl animate-fadeInUp"
            >
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Our Rohini Center</h2>
              </div>
              <p className="text-gray-700 mb-4">
                <strong>Address:</strong> {CONTACT_INFO.centers.rohini.streetAddress},{' '}
                {CONTACT_INFO.centers.rohini.addressLocality}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Landmark:</strong> DC Chauk, Sector 9, Rohini
              </p>
              <div className="flex items-center gap-2 text-gray-700 mb-6">
                <Train className="w-5 h-5 text-red-500" />
                <p>
                  <strong>Metro:</strong> Rohini West Metro Station (Red Line) - 5 min walk
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl mb-6">
                <p className="text-sm text-purple-700">
                  <strong>Easily accessible from:</strong> Rohini Sectors 7, 8, 9, 10, 11, Pitampura, Shalimar Bagh,
                  Prashant Vihar, Budh Vihar, and nearby areas
                </p>
              </div>
              <div className="flex gap-4">
                <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
                <a href={CONTACT_INFO.centers.rohini.mapUrl} target="_blank" rel="noopener noreferrer">
                  <Button>
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonialsSection />

      {/* NEET Tools Widget */}
      <NEETToolsWidget title="Planning for NEET?" subtitle="Start using our free NEET preparation tools" />

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}
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

      {/* Related Pages Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/class-10-biology-tuition-rohini"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">Class 10 Biology Rohini</h3>
              <p className="text-sm text-gray-600">Board exam preparation</p>
            </Link>
            <Link
              href="/neet-foundation-class-9-rohini"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">NEET Foundation Class 9</h3>
              <p className="text-sm text-gray-600">Early NEET prep in Rohini</p>
            </Link>
            <Link
              href="/biology-olympiad-coaching-rohini"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">Biology Olympiad</h3>
              <p className="text-sm text-gray-600">Competitive exams coaching</p>
            </Link>
            <Link
              href="/neet-coaching-rohini"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">NEET Coaching Rohini</h3>
              <p className="text-sm text-gray-600">Full NEET program</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Class 9 Biology Journey in Rohini</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the best Class 9 Biology tuition with NEET foundation at our DC Chauk center
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo
              </Button>
            </Link>
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-purple-600 px-6 py-4 rounded-xl font-semibold transition-colors animate-fadeInUp"
            >
              <Phone className="w-5 h-5" />
              WhatsApp Us
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
