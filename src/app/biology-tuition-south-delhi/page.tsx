'use client'

import Link from 'next/link'
import { CheckCircle, Phone, ArrowRight, Microscope, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const areasList = [
  {
    slug: 'hauz-khas',
    name: 'Hauz Khas',
    metro: 'Hauz Khas Metro (Yellow Line)',
  },
  {
    slug: 'kalu-sarai',
    name: 'Kalu Sarai',
    metro: 'IIT Delhi Metro (Yellow Line)',
  },
  {
    slug: 'greater-kailash',
    name: 'Greater Kailash',
    metro: 'Greater Kailash Metro (Magenta Line)',
  },
  {
    slug: 'defence-colony',
    name: 'Defence Colony',
    metro: 'Lajpat Nagar Metro (Violet Line)',
  },
  {
    slug: 'vasant-vihar',
    name: 'Vasant Vihar',
    metro: 'Vasant Vihar Metro (Magenta Line)',
  },
  {
    slug: 'rk-puram',
    name: 'RK Puram',
    metro: 'RK Puram Metro (Magenta Line)',
  },
  {
    slug: 'sarojini-nagar',
    name: 'Sarojini Nagar',
    metro: 'Sarojini Nagar Metro (Yellow Line)',
  },
  {
    slug: 'lodhi-colony',
    name: 'Lodhi Colony',
    metro: 'Jor Bagh Metro (Yellow Line)',
  },
  {
    slug: 'saket',
    name: 'Saket',
    metro: 'Saket Metro (Yellow Line)',
  },
  {
    slug: 'malviya-nagar',
    name: 'Malviya Nagar',
    metro: 'Malviya Nagar Metro (Yellow Line)',
  },
  {
    slug: 'green-park',
    name: 'Green Park',
    metro: 'Green Park Metro (Yellow Line)',
  },
  {
    slug: 'cr-park',
    name: 'CR Park',
    metro: 'Kalkaji Mandir Metro (Violet Line)',
  },
  {
    slug: 'munirka',
    name: 'Munirka',
    metro: 'Munirka Metro (Magenta Line)',
  },
  {
    slug: 'lajpat-nagar',
    name: 'Lajpat Nagar',
    metro: 'Lajpat Nagar Metro (Violet Line)',
  },
  {
    slug: 'kalkaji',
    name: 'Kalkaji',
    metro: 'Kalkaji Mandir Metro (Violet Line)',
  },
  {
    slug: 'east-of-kailash',
    name: 'East of Kailash',
    metro: 'Kailash Colony Metro (Violet Line)',
  },
]

const classOptions = [
  {
    class: 'Class 9',
    focus: 'Foundation + NEET Prep',
    fee: '₹5,000/month',
    features: ['NCERT Mastery', 'NEET Foundation', 'School Exams', 'Olympiad Prep'],
  },
  {
    class: 'Class 10',
    focus: 'Board + NEET Foundation',
    fee: '₹6,000/month',
    features: ['Board Preparation', 'NEET Concepts', 'Practical Training', 'Weekly Tests'],
  },
  {
    class: 'Class 11',
    focus: 'NEET + School Boards',
    fee: '₹8,000/month',
    features: ['Complete NEET Syllabus', 'School Sync', 'Doubt Sessions', 'Mock Tests'],
  },
  {
    class: 'Class 12',
    focus: 'Board + NEET Intensive',
    fee: '₹10,000/month',
    features: ['Board Excellence', 'NEET Mastery', 'PYQ Practice', 'Revision Tests'],
  },
]

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '5000+', label: 'Students Taught' },
  { value: '95%', label: 'Pass Rate' },
  { value: '50+', label: 'Board Toppers' },
]

export default function BiologyTuitionSouthDelhiPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-700 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Microscope className="w-5 h-5 mr-2 text-yellow-300" />
              Premium Biology Education
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">Biology Tuition in South Delhi</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-4">
              Expert Biology Classes for Classes 9-12 | CBSE, ICSE & State Boards
            </p>

            <p className="text-md opacity-80 mb-8 max-w-3xl mx-auto">
              Join South Delhi&apos;s most trusted biology tuition with AIIMS faculty. Perfect blend
              of board preparation and NEET foundation. Online & offline batches available.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
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
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Class Options */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biology Tuition for All Classes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive biology education from Class 9 to 12 with NEET integration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classOptions.map((option, index) => (
              <div
                key={option.class}
                className="bg-green-50 rounded-xl overflow-hidden border border-green-100 animate-fadeInUp"
              >
                <div className="bg-[#4a5d4a] text-white p-4">
                  <h3 className="text-xl font-bold">{option.class}</h3>
                  <p className="text-sm opacity-90">{option.focus}</p>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-green-600 mb-3">{option.fee}</div>
                  <ul className="space-y-2 mb-4">
                    {option.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/demo-booking">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Enroll Now</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biology Tuition Across South Delhi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find biology classes near your locality - Click your area for details
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {areasList.map((area, index) => (
              <div
                key={area.slug}
               className="animate-fadeInUp">
                <Link href={`/biology-tuition-south-delhi/${area.slug}`}>
                  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all border-l-4 border-green-600 hover:border-green-600">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{area.name}</h3>
                        <p className="text-sm text-gray-500">{area.metro}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Cerebrum for Biology Tuition?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Expert AIIMS/JIPMER Faculty',
              'All Boards: CBSE, ICSE, State',
              'NEET Foundation from Class 9',
              'Small Batches (15-20 students)',
              'Weekly Tests & Assessments',
              'Practical Lab Sessions',
              'Doubt Clearing Sessions',
              'Parent-Teacher Meetings',
              'Online + Offline Modes',
              'Affordable Fee Structure',
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-fadeInUp"
              >
                <CheckCircle className="w-6 h-6 text-yellow-300 mr-3 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Biology Excellence Journey Today!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 5000+ successful students from South Delhi. Book your free demo class now!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
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
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - Biology Tuition South Delhi',
            description:
              'Best biology tuition in South Delhi for Classes 9-12. Expert AIIMS faculty, all boards covered.',
            url: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi',
            areaServed: {
              '@type': 'City',
              name: 'South Delhi',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Biology Tuition Programs',
              itemListElement: [
                {
                  '@type': 'Course',
                  name: 'Class 9 Biology',
                  description: 'Foundation + NEET Prep',
                },
                {
                  '@type': 'Course',
                  name: 'Class 10 Biology',
                  description: 'Board + NEET Foundation',
                },
                {
                  '@type': 'Course',
                  name: 'Class 11 Biology',
                  description: 'NEET + School Boards',
                },
                {
                  '@type': 'Course',
                  name: 'Class 12 Biology',
                  description: 'Board + NEET Intensive',
                },
              ],
            },
          }),
        }}
      />
    </div>
  )
}
