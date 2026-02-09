import type { Metadata } from 'next'
import {
  MapPin,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Target,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'

const aboutFaqs = [
  {
    question: 'Who founded Cerebrum Biology Academy?',
    answer:
      'Cerebrum was founded by Dr. Shekhar C Singh in 2014, an AIIMS Delhi graduate (2014) who scored 680/720 in NEET. After observing thousands of students struggle despite expensive coaching, he chose teaching to democratize AIIMS-level Biology instruction.',
  },
  {
    question: 'How long has Cerebrum been operating?',
    answer:
      'Since 2014 (12 years), Cerebrum has coached 2,847+ students with a 94% NEET qualification rate and 47+ AIIMS selections across 7 campuses.',
  },
  {
    question: 'What makes Cerebrum different?',
    answer:
      'AIIMS-trained founder, small batches (8-15 students), personalized mentoring, concept-focused teaching, 94% success rate, and affordable fees compared to ₹3-8 lakh competitors.',
  },
  {
    question: 'What is the success rate?',
    answer:
      '94% NEET qualification rate, 680+ selections, 47 AIIMS admissions, 12 students scored 700+ in 2024.',
  },
  {
    question: 'How can I enroll?',
    answer:
      'Call +91-88264-44334, book a free demo at cerebrumbiologyacademy.com/book-free-demo, or visit any center. Enrollment available year-round with flexible batch timings.',
  },
]

export const metadata: Metadata = {
  title: 'About Cerebrum Biology Academy — NEET Biology Coaching Since 2014 | Delhi NCR',
  description:
    "Cerebrum Biology Academy: India's premier NEET Biology coaching with AIIMS-trained faculty, 6 centers in Delhi NCR, 680+ selections, 94% success rate, batches of 8-15 students.",
  keywords:
    'Cerebrum Biology Academy, NEET coaching, AIIMS faculty, Biology tuition, Delhi NCR',
  openGraph: {
    title: 'About Cerebrum Biology Academy — NEET Biology Coaching Since 2014 | Delhi NCR',
    description:
      "Cerebrum Biology Academy: India's premier NEET Biology coaching with AIIMS-trained faculty, 6 centers in Delhi NCR, 680+ selections, 94% success rate.",
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/about-cerebrum-biology-academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Cerebrum Biology Academy — NEET Biology Coaching Since 2014',
    description:
      'Cerebrum: 12 years, 680+ NEET selections, 94% success rate, AIIMS-trained faculty, 6 centers in Delhi NCR.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/about-cerebrum-biology-academy',
  },
}

export default function AboutCerebrumPage() {
  const centers = [
    {
      name: 'South Extension',
      address: 'A-68, South Extension Part-1, New Delhi 110049',
      phone: '011-4141-0102',
      metro: 'Lajpat Nagar Metro (2 km)',
      mapUrl:
        'https://maps.app.goo.gl/cerebrumbiologyacademyse',
    },
    {
      name: 'Gurugram',
      address: 'Tower B, 2nd Floor, Sector 14, Gurugram, Haryana 122001',
      phone: '0124-409-6200',
      metro: 'Sector 14 Metro (500m)',
      mapUrl:
        'https://maps.app.goo.gl/cerebrumbiologyacademygurgaon',
    },
    {
      name: 'Rohini',
      address: 'Block-A, Sector 7, Rohini, Delhi 110085',
      phone: '011-4769-8899',
      metro: 'Rohini East Metro (Walking distance)',
      mapUrl:
        'https://maps.app.goo.gl/cerebrumbiologyacademyrohini',
    },
    {
      name: 'Green Park',
      address: 'Green Park, South Delhi, Delhi 110016',
      phone: '011-4141-0102',
      metro: 'Kalkaji Metro (1 km)',
      mapUrl:
        'https://maps.app.goo.gl/cerebrumbiologyacademygreenpark',
    },
    {
      name: 'Faridabad',
      address: 'NIT, Faridabad, Haryana 121001',
      phone: '+91-88264-44334',
      metro: 'Faridabad (City center)',
      mapUrl:
        'https://maps.app.goo.gl/cerebrumbiologyacademyfaridabad',
    },
    {
      name: 'Noida',
      address: 'Sector 62, Noida, Uttar Pradesh 201301',
      phone: '+91-88264-44334',
      metro: 'Noida City Center Metro (5 km)',
      mapUrl:
        'https://maps.app.goo.gl/cerebrumbiologyacademynoida',
    },
  ]

  const achievements = [
    {
      metric: '94%',
      label: 'NEET Qualification Rate',
      description: '680+ successful selections over 12 years',
    },
    {
      metric: '47+',
      label: 'AIIMS Selections',
      description: 'Across 7 AIIMS campuses nationwide',
    },
    {
      metric: '6',
      label: 'Centers in Delhi NCR',
      description: 'Serving 2,847+ students',
    },
    {
      metric: '8-15',
      label: 'Batch Size',
      description: 'For personalized attention',
    },
    {
      metric: '10+',
      label: 'Years Experience',
      description: 'Dr. Shekhar C Singh, AIIMS Faculty',
    },
    {
      metric: '340',
      label: 'Average NEET Score',
      description: 'Students who join Cerebrum',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BreadcrumbSchema
            items={[
              { label: 'About', href: '/about' },
              { label: 'Cerebrum Biology Academy', isCurrentPage: true },
            ]}
            variant="minimal"
          />
        </div>
      </div>

      {/* Hero Section with Mission */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Cerebrum Biology Academy
          </h1>
          <p className="text-xl sm:text-2xl text-slate-200 mb-8 max-w-3xl">
            India's premier NEET Biology coaching institute dedicated to delivering AIIMS-level
            instruction through personalized teaching since 2014.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
              <div className="text-3xl font-bold text-green-400 mb-2">680+</div>
              <div className="text-slate-200">NEET Selections</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
              <div className="text-3xl font-bold text-green-400 mb-2">12 Years</div>
              <div className="text-slate-200">Proven Track Record</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
              <div className="text-3xl font-bold text-green-400 mb-2">94%</div>
              <div className="text-slate-200">Success Rate</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              <Phone className="w-5 h-5" />
              Call: +91-88264-44334
            </a>
            <a
              href="https://cerebrumbiologyacademy.com/book-free-demo"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 px-8 py-3 rounded-lg font-semibold transition"
            >
              Book Free Demo
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Key Facts Grid */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
            By The Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-3">
                  {achievement.metric}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                  {achievement.label}
                </h3>
                <p className="text-slate-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Dr. Shekhar C Singh */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Meet Dr. Shekhar C Singh
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Founder & Lead Faculty, Cerebrum Biology Academy
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">AIIMS Delhi Graduate</h3>
                    <p className="text-slate-600">2014 Batch | NEET Biology: 680/720</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">10+ Years Teaching Experience</h3>
                    <p className="text-slate-600">Faculty at premier NEET coaching institutes</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Concept Pyramid Methodology</h3>
                    <p className="text-slate-600">Proprietary teaching method for complex topics</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">680+ Successful Students</h3>
                    <p className="text-slate-600">47+ AIIMS selections under his guidance</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 mb-6">
                Dr. Singh observed that despite expensive coaching, most students failed to grasp
                Biology's foundational concepts. He chose medical practice to pursue teaching,
                founding Cerebrum to democratize AIIMS-level instruction at affordable fees.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-lg p-12 border border-green-200">
              <div className="bg-slate-300 h-64 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-slate-500">Dr. Shekhar C Singh</span>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="text-sm font-semibold text-slate-900 mb-1">Teaching Philosophy</p>
                  <p className="text-slate-600">
                    "Concepts before memorization. Understanding Biology's mechanisms, not just
                    definitions, makes students confident."
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="text-sm font-semibold text-slate-900 mb-1">Why Cerebrum?</p>
                  <p className="text-slate-600">
                    Small batches, personalized attention, and AIIMS-level instruction accessible
                    to every student.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Centers */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
            6 Centers Across Delhi NCR
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centers.map((center, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  {center.name}
                </h3>
                <div className="space-y-3 text-slate-600 mb-6">
                  <p className="text-sm">{center.address}</p>
                  <p className="text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    {center.phone}
                  </p>
                  <p className="text-sm font-semibold text-slate-700">{center.metro}</p>
                </div>
                <a
                  href={center.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition font-semibold text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Methodology */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
            Our Methodology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-lg p-8 border border-green-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Target className="w-6 h-6 text-green-600" />
                NCERT-First Approach
              </h3>
              <p className="text-slate-600 mb-4">
                We believe NCERT is 95% sufficient for NEET. Our faculty reads NCERT 5 times in
                class, explaining every concept thoroughly. We avoid unnecessary books.
              </p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  Deep concept understanding
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  Mechanism-focused learning
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  Diagram mastery
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Award className="w-6 h-6 text-blue-600" />
                Small Batch Philosophy
              </h3>
              <p className="text-slate-600 mb-4">
                Batches limited to 8-15 students. This allows faculty to know each student's
                learning style, address doubts immediately, and provide customized study plans.
              </p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  Personal mentoring monthly
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  Individual doubt clearing
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  Customized study schedules
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-8 border border-purple-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                Weekly Testing & Revision
              </h3>
              <p className="text-slate-600 mb-4">
                Every week includes chapter tests. Every month includes full-length mock tests.
                Testing identifies weak areas early, allowing time for revision.
              </p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  50+ full-length mock tests
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  Error analysis sessions
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  Performance tracking
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg p-8 border border-amber-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-amber-600" />
                Personalized Mentoring
              </h3>
              <p className="text-slate-600 mb-4">
                Monthly one-on-one mentoring with faculty. Discuss progress, identify weak
                chapters, set targets, and overcome exam anxiety.
              </p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  Progress reviews
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  Weak chapter strategies
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  Exam stress counseling
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Awards */}
      <section className="py-12 sm:py-16 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Recognition & Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-green-400 pl-6">
              <h3 className="text-xl font-bold mb-3">AIIMS Selections</h3>
              <p className="text-slate-300 mb-4">
                47+ students selected to AIIMS across 7 campuses (Delhi, Pune, Bhopal, Jodhpur,
                Raipur, Rishikesh, Nagpur) since 2015.
              </p>
            </div>
            <div className="border-l-4 border-green-400 pl-6">
              <h3 className="text-xl font-bold mb-3">NEET Success Rate</h3>
              <p className="text-slate-300 mb-4">
                94% qualification rate (680+ selections) - Highest in coaching industry
                consistently.
              </p>
            </div>
            <div className="border-l-4 border-green-400 pl-6">
              <h3 className="text-xl font-bold mb-3">Student Satisfaction</h3>
              <p className="text-slate-300 mb-4">
                4.9/5 rating on education platforms. Alumni recommend Cerebrum to their
                younger siblings.
              </p>
            </div>
            <div className="border-l-4 border-green-400 pl-6">
              <h3 className="text-xl font-bold mb-3">Faculty Credentials</h3>
              <p className="text-slate-300 mb-4">
                Founder is AIIMS-trained with published research in Biology education. Faculty
                team has 100+ combined years teaching experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Results Summary */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
            2024 NEET Results Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-8 border border-slate-200 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">680+</div>
              <p className="text-slate-600">Total NEET Selections (All-time)</p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-slate-200 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
              <p className="text-slate-600">Qualification Rate</p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-slate-200 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">340</div>
              <p className="text-slate-600">Average NEET Score</p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-slate-200 text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">12</div>
              <p className="text-slate-600">Students Scored 700+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border border-slate-200 text-center">
              <Phone className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Phone</h3>
              <a
                href="tel:+918826444334"
                className="text-slate-600 hover:text-green-600 font-semibold"
              >
                +91-88264-44334
              </a>
              <p className="text-sm text-slate-500 mt-2">Mon-Sat: 9 AM - 7 PM</p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-slate-200 text-center">
              <Mail className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Email</h3>
              <a
                href="mailto:info@cerebrumbiologyacademy.com"
                className="text-slate-600 hover:text-green-600 font-semibold"
              >
                info@cerebrumbiologyacademy.com
              </a>
              <p className="text-sm text-slate-500 mt-2">Response in 2 hours</p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-slate-200 text-center">
              <MessageCircle className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">WhatsApp</h3>
              <a
                href="https://wa.me/918826444334"
                className="text-slate-600 hover:text-green-600 font-semibold"
              >
                +91-88264-44334
              </a>
              <p className="text-sm text-slate-500 mt-2">Instant response</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {aboutFaqs.map((item, idx) => (
              <details
                key={`faq-${idx}`}
                className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-green-500 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-900 pr-4">{item.question}</h3>
                  <span className="text-slate-500 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-0 text-slate-600 border-t border-slate-100">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your NEET Preparation?
          </h2>
          <p className="text-lg text-green-50 mb-8">
            Book a free demo class and experience Cerebrum's teaching methodology firsthand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-slate-100 px-8 py-3 rounded-lg font-semibold transition"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <a
              href="https://cerebrumbiologyacademy.com/book-free-demo"
              className="inline-flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-lg font-semibold transition border border-green-500"
            >
              Book Demo
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD Schemas */}
      <FAQSchema questions={aboutFaqs} pageUrl="/about-cerebrum-biology-academy" />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            '@id': 'https://cerebrumbiologyacademy.com/#organization',
            name: 'Cerebrum Biology Academy',
            alternateName: ['Cerebrum Academy', 'Cerebrum Biology'],
            url: 'https://cerebrumbiologyacademy.com',
            logo: 'https://cerebrumbiologyacademy.com/logo.png',
            image: 'https://cerebrumbiologyacademy.com/og-image.jpg',
            description:
              "India's premier NEET Biology coaching with AIIMS-trained faculty, 6 centers, 680+ selections, 94% success rate",
            telephone: '+91-88264-44334',
            email: 'info@cerebrumbiologyacademy.com',
            foundingDate: '2014',
            founders: [
              {
                '@type': 'Person',
                name: 'Dr. Shekhar C Singh',
              },
            ],
            address: [
              {
                '@type': 'PostalAddress',
                streetAddress: 'A-68, South Extension Part-1',
                addressLocality: 'New Delhi',
                addressRegion: 'Delhi',
                postalCode: '110049',
                addressCountry: 'IN',
              },
              {
                '@type': 'PostalAddress',
                streetAddress: 'Tower B, 2nd Floor, Sector 14',
                addressLocality: 'Gurugram',
                addressRegion: 'Haryana',
                postalCode: '122001',
                addressCountry: 'IN',
              },
            ],
            areaServed: [
              { '@type': 'Place', name: 'Delhi' },
              { '@type': 'Place', name: 'Gurugram' },
              { '@type': 'Place', name: 'Haryana' },
              { '@type': 'Place', name: 'Uttar Pradesh' },
            ],
            sameAs: [
              'https://www.facebook.com/cerebrumbiologyacademy',
              'https://www.instagram.com/cerebrumbiologyacademy',
              'https://www.youtube.com/@cerebrumbiologyacademy',
              'https://www.youtube.com/@drshekharcsingh',
              'https://www.linkedin.com/company/cerebrumbiologyacademy',
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '680',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />

      {/* Person Schema for Dr. Shekhar C Singh */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Dr. Shekhar C Singh',
            jobTitle: 'Founder & Lead Faculty',
            url: 'https://cerebrumbiologyacademy.com/about-cerebrum-biology-academy',
            image: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh.jpg',
            affiliation: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
            },
            alumniOf: {
              '@type': 'EducationalOrganization',
              name: 'AIIMS Delhi',
            },
            knowsAbout: [
              'NEET Biology',
              'NEET-UG Preparation',
              'Human Physiology',
              'Genetics',
              'Evolution',
              'Ecology',
              'Plant Reproduction',
              'Cellular Respiration',
            ],
            award: 'AIIMS Graduate 2014',
          }),
        }}
      />
    </main>
  )
}
