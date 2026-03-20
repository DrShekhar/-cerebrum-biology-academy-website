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
  MessageCircle,
  Building,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const gurugramAreas = [
  { name: 'DLF Phase 1-5', highlight: 'Premium' },
  { name: 'Golf Course Road', highlight: 'Corporate Hub' },
  { name: 'Sushant Lok', highlight: 'Residential' },
  { name: 'Sector 51 (Center)', highlight: 'Visit Us' },
  { name: 'Sector 56-57', highlight: 'Near Schools' },
  { name: 'South City', highlight: 'Established' },
  { name: 'Nirvana Country', highlight: 'New Gurugram' },
  { name: 'Palam Vihar', highlight: 'West Gurugram' },
]

const faqs = [
  {
    question: 'What are the biology tuition fees in Gurugram?',
    answer:
      'Cerebrum Biology Academy charges \u20B948,000-98,000/year for Class 11-12 biology tuition in Gurugram. This is far more affordable than private IB/IGCSE tutors who charge \u20B98,000-15,000/month. Our fee includes study materials, weekly tests, recorded lectures, and 24/7 doubt support.',
  },
  {
    question: 'Do you offer IB and IGCSE biology tuition in Gurugram?',
    answer:
      'Yes! We specialize in IB Biology (SL & HL), IGCSE Biology, and CBSE Biology. Many students from The Shri Ram School, Pathways, Scottish High, and DPS Gurugram attend our classes. Our AIIMS faculty adapts teaching for each board\u2019s curriculum and exam pattern.',
  },
  {
    question: 'Which is the best biology tutor near DLF Gurugram?',
    answer:
      'Cerebrum Biology Academy at M2K Corporate Park, Sector 51 is the top-rated biology tuition near DLF Gurugram. With 5.0 Google rating, AIIMS faculty, and 98% success rate, we serve students from DLF Phase 1-5, Golf Course Road, and Sushant Lok. Free demo available.',
  },
  {
    question: 'Is home tuition or coaching better for biology in Gurugram?',
    answer:
      'Coaching at Cerebrum is better value than home tuition. Gurugram home tutors charge \u20B98-15K/month with no structured testing. Cerebrum offers AIIMS faculty, weekly tests, peer learning, recorded lectures, and complete study materials. Visit our Sector 51 center or join online.',
  },
  {
    question: 'Can my child prepare for both school boards and NEET at Cerebrum Gurugram?',
    answer:
      'Absolutely. Our dual-prep curriculum covers CBSE/IB/IGCSE board syllabus + NEET-level MCQ practice simultaneously. This saves parents from hiring separate tutors for board exams and NEET. Most DPS and Shri Ram School parents choose this integrated approach.',
  },
]

export default function BiologyTuitionGurugramPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-green-900 via-green-700 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Microscope className="w-5 h-5 mr-2 text-yellow-300" />
              #1 Biology Tuition in Gurugram | CBSE, IB, IGCSE + NEET
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">Biology Tuition</span> in Gurugram
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Class 11 &bull; Class 12 &bull; CBSE &bull; IB &bull; IGCSE &bull; NEET
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              Expert biology coaching for CBSE, IB &amp; IGCSE boards + NEET by AIIMS Alumnus.
              Visit our center at M2K Corporate Park, Sector 51. DLF, Golf Course Road, Sushant Lok
              students welcome.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/book-free-demo">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Building className="w-5 h-5 mr-2" />
                  Visit Our Center
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
              Why Gurugram Parents Choose Cerebrum Over Private Tutors
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              International school parents trust us for IB, IGCSE &amp; CBSE biology
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
                  ['Monthly Fee', '\u20B98,000-15,000/month', '\u20B94,000-8,000/month'],
                  ['Faculty', 'B.Sc/M.Sc Graduate', 'AIIMS-Trained Doctor'],
                  ['Board Coverage', 'Usually 1 board only', 'CBSE + IB + IGCSE + NEET'],
                  ['Batch Size', '1 Student (no peer learning)', '15 Students (healthy competition)'],
                  ['Test Series', 'No structured tests', 'Weekly tests + monthly assessments'],
                  ['Study Material', 'No material provided', 'Board-specific notes + MCQ bank'],
                  ['Recorded Lectures', 'Not available', 'All classes recorded for revision'],
                  ['Center Visit', 'Tutor comes home', 'M2K Corporate Park, Sector 51'],
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
            <p className="text-lg text-gray-600">Especially strong in international curricula</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-6 h-6 text-green-600 mr-2" />
                Boards Covered
              </h3>
              <ul className="space-y-3">
                {[
                  'CBSE (DPS, DAV, KV schools)',
                  'IB Biology SL & HL (Pathways, Scottish High)',
                  'IGCSE Biology (The Shri Ram School)',
                  'ICSE (Suncity, Heritage)',
                ].map((board) => (
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
              Gurugram Areas We Serve
            </h2>
            <p className="text-lg text-gray-600">
              Visit our Sector 51 center or join online from anywhere in Gurugram
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {gurugramAreas.map((area) => (
              <div key={area.name} className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                <MapPin className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">{area.name}</div>
                <div className="text-xs text-gray-500">{area.highlight}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <Building className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Our Gurugram Center</h3>
            <p className="text-gray-700 mb-4">
              M2K Corporate Park, Sector 51, Gurugram, Haryana 122003
            </p>
            <a href="https://maps.google.com/?q=M2K+Corporate+Park+Sector+51+Gurugram" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-green-600 text-green-700 hover:bg-green-600 hover:text-white">
                <MapPin className="w-5 h-5 mr-2" />
                Get Directions
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biology Tuition in Gurugram - FAQs
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
            Start Biology Tuition in Gurugram Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            CBSE, IB, IGCSE boards + NEET. Visit our Sector 51 center or join online.
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
            <a href="https://wa.me/918826444334?text=Hi%2C%20I%20want%20biology%20tuition%20in%20Gurugram" target="_blank" rel="noopener noreferrer">
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
            <Link href="/neet-coaching-gurugram" className="underline opacity-80 hover:opacity-100">NEET Coaching Gurugram</Link>
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
                { '@type': 'ListItem', position: 2, name: 'Biology Tuition Gurugram', item: 'https://cerebrumbiologyacademy.com/biology-tuition-gurugram' },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Cerebrum Biology Academy - Biology Tuition Gurugram',
              description: 'Best biology tuition in Gurugram for CBSE, IB, IGCSE + NEET by AIIMS Alumnus.',
              url: 'https://cerebrumbiologyacademy.com/biology-tuition-gurugram',
              telephone: '+918826444334',
              address: { '@type': 'PostalAddress', streetAddress: 'M2K Corporate Park', addressLocality: 'Sector 51, Gurugram', addressRegion: 'Haryana', postalCode: '122003', addressCountry: 'IN' },
              areaServed: { '@type': 'City', name: 'Gurugram', containedInPlace: { '@type': 'State', name: 'Haryana' } },
              priceRange: '\u20B948,000 - \u20B91,56,000/year',
              aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '38', bestRating: '5' },
            },
          ]),
        }}
      />
    </div>
  )
}
