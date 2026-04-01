import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Star, Users, Trophy, CheckCircle, ArrowRight, Clock } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export const metadata: Metadata = {
  title: 'NEET Coaching Near Me 2026 | Find Best NEET Biology Classes Nearby | Delhi NCR',
  description:
    'Find the best NEET coaching near you in Delhi NCR. 4 centers: South Extension, Rohini, Gurugram, Faridabad. AIIMS faculty, 98% success rate, 15-student batches. Online classes for all India. Book FREE demo.',
  keywords: [
    'neet coaching near me',
    'best neet coaching near me',
    'neet classes near me',
    'neet biology coaching near me',
    'neet coaching centre near me',
    'neet preparation near me',
    'biology coaching near me',
    'medical coaching near me',
    'neet institute near me',
    'neet coaching near me delhi',
    'neet coaching near me noida',
    'neet coaching near me gurgaon',
  ],
  openGraph: {
    title: 'NEET Coaching Near Me 2026 | Best Biology Classes in Delhi NCR',
    description:
      'Find NEET coaching near you. 4 centers in Delhi NCR + online for all India. 98% success rate. Book FREE demo.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me',
  },
}

const centers = [
  {
    name: 'South Extension (Flagship)',
    address: 'D 35, South Extension Part 2, New Delhi 110049',
    areas: 'Lajpat Nagar, GK, CR Park, Defence Colony, Hauz Khas, Saket, Kalkaji',
    metro: 'Near South Extension Metro (Violet Line)',
    href: '/locations/south-extension',
    badge: 'Flagship Center',
    students: '500+',
  },
  {
    name: 'Rohini - DC Chowk',
    address: '211 Vikas Surya Tower, DC Chowk, Sector 9, Delhi 110085',
    areas: 'Pitampura, Shalimar Bagh, Prashant Vihar, Model Town, Paschim Vihar',
    metro: '3 min walk from Rohini West Metro (Red Line)',
    href: '/locations/rohini',
    badge: 'North Delhi',
    students: '300+',
  },
  {
    name: 'Gurugram - Sector 51',
    address: 'Unit 17, M2K Corporate Park, Sector 51, Gurugram 122003',
    areas: 'DLF Phase 1-5, Golf Course Road, Sohna Road, Sushant Lok, MG Road',
    metro: '5 min walk from Sector 55-56 Rapid Metro',
    href: '/locations/gurugram',
    badge: 'Gurugram',
    students: '400+',
  },
  {
    name: 'Faridabad - Sector 17',
    address: 'SCF-124-125, 2nd Floor, Above Union Bank, HUDA Market, Sector 17, Faridabad 121002',
    areas: 'NIT, Old Faridabad, Ballabgarh, Greater Faridabad, Surajkund',
    metro: '5 min walk from Bata Chowk Metro (Violet Line)',
    href: '/locations/faridabad',
    badge: 'Faridabad',
    students: '250+',
  },
]

const faqs = [
  {
    question: 'Where is the best NEET coaching near me?',
    answer:
      'Cerebrum Biology Academy has 4 centers across Delhi NCR — South Extension (flagship), Rohini, Gurugram Sector 51, and Faridabad Sector 17. All centers have AIIMS-trained faculty, small batches (15-20 students), and 98% success rate. Find your nearest center above or call +91 88264 44334.',
  },
  {
    question: 'Do you offer online NEET coaching for students outside Delhi NCR?',
    answer:
      'Yes! Our online NEET Biology coaching serves students across India and 14+ countries. Same AIIMS faculty, same curriculum, live interactive classes. Online fees start at Rs 48,000/year. All classes are recorded for revision.',
  },
  {
    question: 'How much does NEET coaching cost near me?',
    answer:
      'Cerebrum Biology Academy fees: Pursuit batch Rs 40,000-48,000/year (30-40 students), Ascent batch Rs 58,000-78,000/year (16-25 students), Pinnacle batch Rs 98,000-1,56,000/year (10-12 students). EMI options available. Compare: Allen/Aakash charge Rs 1.5-3 lakh for all subjects.',
  },
  {
    question: 'What makes Cerebrum different from Allen or Aakash near me?',
    answer:
      'Three key differences: (1) Exclusive Biology focus — Biology is 50% of NEET marks (360/720), (2) Small batches of 15-20 students vs 50-100+ at Allen/Aakash, (3) AIIMS-trained faculty led by Dr. Shekhar C Singh. Our 98% success rate and 680+ medical college selections prove the difference.',
  },
  {
    question: 'Can I take a free demo class before joining?',
    answer:
      'Yes! We offer FREE demo classes at all 4 centers and online. Book via WhatsApp (+91 88264 44334) or visit cerebrumbiologyacademy.com/demo-booking. Demo includes a live Biology lecture + counselling session.',
  },
]

export default function NEETCoachingNearMePage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    description:
      'Best NEET coaching near you in Delhi NCR. 4 centers with AIIMS faculty, 98% success rate, small batches.',
    url: 'https://cerebrumbiologyacademy.com',
    telephone: CONTACT_INFO.phone.primary,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '485',
      bestRating: '5',
    },
    areaServed: [
      'Delhi',
      'New Delhi',
      'South Delhi',
      'North Delhi',
      'West Delhi',
      'East Delhi',
      'Gurugram',
      'Gurgaon',
      'Faridabad',
      'Noida',
      'Ghaziabad',
      'Greater Noida',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4" />4 Centers in Delhi NCR + Online All India
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              NEET Coaching <span className="text-yellow-300">Near Me</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Find the best NEET Biology coaching near you. AIIMS-trained faculty, 98% success rate,
              small batches of 15-20 students. 680+ medical college selections.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=Hi!%20I'm%20looking%20for%20NEET%20coaching%20near%20me.%20Please%20help%20find%20the%20nearest%20center."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                <Phone className="w-5 h-5" />
                WhatsApp: Find Nearest Center
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20demo%20class.%20Please%20share%20available%20timings."
                className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Book FREE Demo Class
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: MapPin, label: 'Centers', value: '4' },
                { icon: Users, label: 'Students', value: '1,500+' },
                { icon: Trophy, label: 'Success Rate', value: '98%' },
                { icon: Star, label: 'Google Rating', value: '5.0/5' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-blue-50 rounded-xl">
                  <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Centers Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Find NEET Coaching Near You</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Choose the center closest to your location. All centers have the same AIIMS faculty,
              curriculum, and small batch promise.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {centers.map((center) => (
                <Link
                  key={center.href}
                  href={center.href}
                  className="group bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {center.badge}
                    </span>
                    <span className="text-sm text-green-600 font-semibold">
                      {center.students} students
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {center.name}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <span>{center.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <span>{center.metro}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Serves: {center.areas}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    View Center Details <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Online Option */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Not Near Any Center? Join Online!</h2>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
              Our live online NEET Biology classes serve students across India and 14+ countries.
              Same AIIMS faculty, same curriculum, same results. Starting Rs 48,000/year.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/online-neet-biology-coaching"
                className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                Explore Online Classes
              </Link>
              <Link
                href="https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20online%20NEET%20coaching.%20Please%20share%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-400 transition"
              >
                WhatsApp for Online Batch
              </Link>
            </div>
          </div>
        </section>

        {/* Why Cerebrum */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Students Choose Cerebrum Over Allen, Aakash & PW
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="px-4 py-3 text-center font-semibold text-blue-600">Cerebrum</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-500">
                      Allen/Aakash
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-500">
                      PhysicsWallah
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ['Batch Size', '15-20 students', '50-100+ students', '500+ (online)'],
                    [
                      'Biology Focus',
                      'Exclusive Biology (50% of NEET)',
                      'All 3 subjects',
                      'All 3 subjects',
                    ],
                    ['Faculty', 'AIIMS-trained', 'Mixed experience', 'Mixed experience'],
                    ['Success Rate', '98%', '~70-80%', '~60-70%'],
                    [
                      'Fees (Biology)',
                      '₹40K-1.8L/year',
                      '₹1.5-3L/year (all subjects)',
                      '₹15-50K/year',
                    ],
                    ['Personal Attention', 'Yes (small batch)', 'Limited', 'No (mass online)'],
                    ['Online + Offline', 'Both available', 'Both available', 'Primarily online'],
                  ].map(([feature, cerebrum, allen, pw]) => (
                    <tr key={feature}>
                      <td className="px-4 py-3 font-medium">{feature}</td>
                      <td className="px-4 py-3 text-center text-blue-700 font-semibold">
                        {cerebrum}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500">{allen}</td>
                      <td className="px-4 py-3 text-center text-gray-500">{pw}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-xl shadow-md group">
                  <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                    {faq.question}
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey Today</h2>
            <p className="text-lg text-blue-100 mb-8">
              Join 1,500+ students who found the best NEET coaching near them at Cerebrum
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition"
              >
                <Phone className="w-6 h-6" />
                Call: +91 88264 44334
              </a>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20demo%20class%20for%20NEET%20Biology.%20Please%20share%20available%20timings."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition"
              >
                WhatsApp Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
