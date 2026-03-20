'use client'

import Link from 'next/link'
import {
  MapPin,
  BookOpen,
  GraduationCap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Award,
  Play,
  Target,
  Microscope,
  Video,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const noidaAreas = [
  { name: 'Sector 18', highlight: 'Commercial Hub' },
  { name: 'Sector 62', highlight: 'IT Corridor' },
  { name: 'Sector 137', highlight: 'Expressway' },
  { name: 'Sector 44', highlight: 'Botanical Garden' },
  { name: 'Sector 76', highlight: 'Near Schools' },
  { name: 'Sector 50', highlight: 'Residential' },
  { name: 'Sector 93', highlight: 'City Center' },
  { name: 'Greater Noida', highlight: 'Extended' },
]

const faqs = [
  {
    question: 'What are the biology tuition fees in Noida?',
    answer:
      'Cerebrum Biology Academy charges \u20B948,000/year (\u20B94,000/month) for Class 11-12 biology tuition in Noida. This is significantly cheaper than private home tutors who charge \u20B95,000-8,000/month. Our fee includes study materials, weekly tests, recorded lectures, and 24/7 doubt support.',
  },
  {
    question: 'Which is the best biology tutor near Sector 18 Noida?',
    answer:
      'Cerebrum Biology Academy is the top-rated biology tuition in Noida with 5.0 Google rating. Our AIIMS-trained faculty provides both online and offline classes accessible from Sector 18, 62, 137 and all Noida sectors. We offer CBSE Board + NEET dual preparation.',
  },
  {
    question: 'Is home tuition or coaching better for biology in Noida?',
    answer:
      'Coaching at Cerebrum is better than home tuition for biology. Home tutors cost \u20B95-8K/month with no test series or study material. Cerebrum costs just \u20B94K/month and includes AIIMS faculty, weekly tests, recorded lectures, and peer learning in batches of 15 students.',
  },
  {
    question: 'Do you offer online biology tuition for Noida students?',
    answer:
      'Yes! Our online biology tuition is ideal for Noida students. Live interactive classes with screen sharing for diagrams, instant doubt clearing on WhatsApp, recorded lectures for revision, and the same 98% success rate as offline batches. Study from home in any Noida sector.',
  },
  {
    question: 'Can I get CBSE Board + NEET preparation together in Noida?',
    answer:
      'Absolutely. Cerebrum Biology Academy specializes in dual preparation \u2014 CBSE Board exam + NEET. Our curriculum covers 100% NCERT (required for both) with additional NEET-level MCQ practice. Most Noida parents choose this over separate tuitions.',
  },
]

export default function BiologyTuitionNoidaPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-green-900 via-green-700 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Microscope className="w-5 h-5 mr-2 text-yellow-300" />
              #1 Biology Tuition in Noida | CBSE + NEET
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">Biology Tuition</span> in Noida
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Class 11 &bull; Class 12 &bull; CBSE Board &bull; NEET &bull; Home &amp; Online
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              CBSE Board + NEET dual preparation by AIIMS faculty. Sector 18, 62, 137 &amp; all
              Noida sectors. Small batches of 15 students. Better results than private tutors at half
              the cost.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/book-free-demo">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: 88264-44334
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: Users, value: '1,500+', label: 'Students Enrolled' },
                { icon: Trophy, value: '98%', label: 'Success Rate' },
                { icon: Award, value: '1,100+', label: 'NEET Selections' },
                { icon: Star, value: '5.0', label: 'Google Rating' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs md:text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Noida Parents Choose Cerebrum Over Private Tutors
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get better results at half the cost of a home tutor
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-gray-100 rounded-tl-xl">Feature</th>
                  <th className="p-4 text-center bg-gray-100">Private Tutor</th>
                  <th className="p-4 text-center bg-green-600 text-white rounded-tr-xl">
                    Cerebrum Academy
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                {[
                  ['Monthly Fee', '\u20B95,000-8,000/month', '\u20B94,000/month (\u20B948K/year)'],
                  ['Faculty', 'B.Sc/M.Sc Graduate', 'AIIMS-Trained Doctor'],
                  ['Batch Size', '1 Student (no peer learning)', '15 Students (healthy competition)'],
                  ['Test Series', 'No structured tests', 'Weekly tests + monthly assessments'],
                  ['Study Material', 'No material provided', 'Complete NCERT notes + MCQ bank'],
                  ['Recorded Lectures', 'Not available', 'All classes recorded for revision'],
                  ['Doubt Support', 'Only during class hours', '24/7 WhatsApp doubt clearing'],
                  ['Board + NEET', 'Usually only board prep', 'Dual prep: CBSE Board + NEET'],
                ].map(([feature, tutor, cerebrum]) => (
                  <tr key={feature} className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">{feature}</td>
                    <td className="p-4 text-center text-gray-500">{tutor}</td>
                    <td className="p-4 text-center text-green-700 font-semibold bg-green-50">
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      {cerebrum}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Boards &amp; Class Levels We Cover
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-6 h-6 text-green-600 mr-2" />
                Boards Covered
              </h3>
              <ul className="space-y-3">
                {['CBSE (most Noida schools)', 'ICSE', 'IB (International Baccalaureate)', 'IGCSE'].map((board) => (
                  <li key={board} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                    {board}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <GraduationCap className="w-6 h-6 text-green-600 mr-2" />
                Class Levels
              </h3>
              <ul className="space-y-3">
                {[
                  'Class 9-10: Foundation Biology (\u20B945K-90K/year)',
                  'Class 11: NEET Biology Year 1 (\u20B948K-98K/year)',
                  'Class 12: NEET Biology Year 2 (\u20B970K-1.56L/year)',
                  'Droppers: Intensive Repeater Batch (\u20B970K-1.56L/year)',
                ].map((level) => (
                  <li key={level} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                    {level}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Noida Areas We Serve
            </h2>
            <p className="text-lg text-gray-600">
              Online classes available from every Noida sector
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {noidaAreas.map((area) => (
              <div key={area.name} className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                <MapPin className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">{area.name}</div>
                <div className="text-xs text-gray-500">{area.highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Online Biology Tuition Beats Home Tutors
            </h2>
            <p className="text-lg opacity-80">For Noida students, online is the smarter choice</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Video, title: 'Recorded Lectures', desc: 'Miss a class? Rewatch anytime. Home tutors don\u2019t offer recordings.' },
              { icon: MessageCircle, title: '24/7 Doubt Support', desc: 'WhatsApp doubt clearing any time. Home tutors are available only during class.' },
              { icon: Target, title: 'Structured Testing', desc: 'Weekly chapter tests + monthly full-length mocks. Home tutors rarely test.' },
              { icon: Users, title: 'Peer Learning', desc: 'Study with 15 motivated students. Home tuition is isolating.' },
              { icon: Clock, title: 'No Travel Time', desc: 'Save 1-2 hours daily. No waiting for tutor to arrive.' },
              { icon: BookOpen, title: 'Complete Materials', desc: 'NCERT notes, MCQ banks, PYQs included. Home tutors charge extra.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <item.icon className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biology Tuition in Noida - FAQs
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Biology Tuition in Noida Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 1,500+ students. CBSE Board + NEET dual prep at \u20B94,000/month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/book-free-demo">
              <Button
                variant="secondary"
                size="xl"
                className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo Class
              </Button>
            </Link>
            <a href="https://wa.me/918826444334?text=Hi%2C%20I%20want%20biology%20tuition%20in%20Noida" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-green-700"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/pricing" className="underline opacity-80 hover:opacity-100">View Pricing</Link>
            <Link href="/courses" className="underline opacity-80 hover:opacity-100">All Courses</Link>
            <Link href="/neet-coaching-noida" className="underline opacity-80 hover:opacity-100">NEET Coaching Noida</Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
                { '@type': 'ListItem', position: 2, name: 'Biology Tuition Noida', item: 'https://cerebrumbiologyacademy.com/biology-tuition-noida' },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Cerebrum Biology Academy - Biology Tuition Noida',
              description: 'Best biology tuition in Noida for Class 11-12. CBSE Board + NEET preparation by AIIMS faculty.',
              url: 'https://cerebrumbiologyacademy.com/biology-tuition-noida',
              telephone: '+918826444334',
              areaServed: { '@type': 'City', name: 'Noida', containedInPlace: { '@type': 'State', name: 'Uttar Pradesh' } },
              priceRange: '\u20B948,000 - \u20B91,56,000/year',
              aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '38', bestRating: '5' },
            },
          ]),
        }}
      />
    </div>
  )
}
