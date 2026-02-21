import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  MapPin,
  Monitor,
  Users,
  Trophy,
  Star,
  CheckCircle,
  ArrowRight,
  Building2,
  Clock,
  Wifi,
  Video,
  MessageCircle,
  BookOpen,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Online NEET Coaching for Greater Noida Students | Live & Hybrid Mode | Cerebrum',
  description:
    'Online NEET Biology classes for Greater Noida students. Live interactive sessions from home. Hybrid mode with weekend offline at Sector 62 Noida. 800+ students. Call 99536-43938!',
  keywords: [
    'online neet classes greater noida',
    'online neet coaching greater noida',
    'neet online classes greater noida',
    'live neet classes greater noida',
    'hybrid neet coaching greater noida',
    'neet classes from home greater noida',
    'online biology coaching greater noida',
  ],
  openGraph: {
    title: 'Online NEET Coaching for Greater Noida | Live Interactive Sessions',
    description:
      'Study NEET Biology from your Greater Noida home. Live classes, instant doubts, recorded lectures. Hybrid mode available.',
    url: 'https://cerebrumbiologyacademy.com/online-neet-coaching-greater-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-coaching-greater-noida',
  },
}

const travelTimes = [
  { area: 'Gaur City, Greater Noida', time: '0 min', mode: 'Study from home!' },
  { area: 'Knowledge Park I-V', time: '0 min', mode: 'Study from home!' },
  { area: 'Pari Chowk', time: '0 min', mode: 'Study from home!' },
  { area: 'Jaypee Greens', time: '0 min', mode: 'Study from home!' },
  { area: 'Alpha/Beta Sectors', time: '0 min', mode: 'Study from home!' },
  { area: 'To Sector 62, Noida (Weekend)', time: '30-45 min by road', mode: 'For offline sessions' },
]

const onlineFeatures = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    desc: 'Real-time sessions with Dr. Shekhar Singh. Ask questions instantly.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Resolution',
    desc: 'WhatsApp doubt support. Get answers within hours, not days.',
  },
  {
    icon: BookOpen,
    title: 'Recorded Lectures',
    desc: 'Miss a class? Watch recordings anytime. Revise at your pace.',
  },
  {
    icon: Wifi,
    title: 'Digital Study Material',
    desc: 'Notes, tests, question banks - all accessible online.',
  },
]

const hybridBenefits = [
  'All online class benefits included',
  'Weekly mock tests at Sector 62 Noida center',
  'Face-to-face doubt clearing sessions',
  'Peer learning with other NEET aspirants',
  'Library and study room access',
  'Personal interaction with Dr. Shekhar',
]

const faqs = [
  {
    question: 'How do online NEET classes work for Greater Noida students?',
    answer:
      'Our online classes are live, interactive sessions conducted via Zoom/Google Meet. You attend from your Greater Noida home, ask questions in real-time, and get instant feedback. Classes are also recorded for later revision. Most Greater Noida students prefer this mode as it saves 1-2 hours of daily travel to Noida.',
  },
  {
    question: 'What is hybrid mode for Greater Noida students?',
    answer:
      'Hybrid mode combines online weekday classes with weekend offline sessions at our Sector 62, Noida center. You attend 5-6 online classes per week from your Greater Noida home, and visit Sector 62 on Saturdays/Sundays for mock tests, doubt sessions, and face-to-face interaction.',
  },
  {
    question: 'Which mode is better - online or hybrid?',
    answer:
      'For most Greater Noida students, online mode works best due to the distance from our Sector 62, Noida center. However, if you need classroom environment motivation or struggle with self-discipline, hybrid mode provides weekly accountability. We recommend starting with online and upgrading to hybrid if needed.',
  },
  {
    question: 'Is online coaching as effective as offline for Greater Noida students?',
    answer:
      'Yes! Our online students consistently score 650+ in NEET. The key advantages: more study time (no 30-45 min travel to Noida), recorded lectures for revision, instant doubt resolution via WhatsApp, and comfortable home environment. 800+ Greater Noida area students are currently enrolled in our online program.',
  },
  {
    question: 'What equipment do I need for online classes from Greater Noida?',
    answer:
      'A laptop/tablet with stable internet connection (minimum 5 Mbps). A quiet study space at home. Headphones recommended for better audio. We provide all digital study materials - no need for physical books. Greater Noida generally has excellent broadband and 4G coverage.',
  },
]

export default function OnlineNEETCoachingGreaterNoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-indigo-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Monitor className="w-4 h-4" />
              Online & Hybrid Learning
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Online NEET Coaching for Greater Noida Students
            </h1>
            <p className="text-xl text-indigo-100 mb-6">
              Study from your Greater Noida home. Live interactive Biology classes with AIIMS
              faculty. Save 1-2 hours daily on travel. Hybrid mode available for weekend offline
              sessions at Sector 62, Noida.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+919953643938"
                className="inline-flex items-center gap-2 bg-yellow-500 text-indigo-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
              >
                <Phone className="w-5 h-5" />
                Call 99536-43938
              </a>
              <Link
                href="/demo-booking"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
              >
                Try Free Online Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-indigo-50 rounded-xl">
              <Users className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">800+</p>
              <p className="text-sm text-gray-600">Greater Noida Students Online</p>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-xl">
              <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">1-2 hrs</p>
              <p className="text-sm text-gray-600">Daily Time Saved</p>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-xl">
              <Trophy className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-xl">
              <Star className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">4.9/5</p>
              <p className="text-sm text-gray-600">Student Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Time Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why Greater Noida Students Love Online Classes
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            No travel. No traffic. Study from your Greater Noida home. See how much time you save:
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-green-200">
                    <th className="text-left py-3 px-4">Your Location</th>
                    <th className="text-center py-3 px-4">Travel Time</th>
                    <th className="text-right py-3 px-4">Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {travelTimes.map((item, index) => (
                    <tr key={index} className="border-b border-green-100 last:border-0">
                      <td className="py-3 px-4 font-medium">{item.area}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={
                            item.time === '0 min' ? 'text-green-600 font-bold' : 'text-gray-600'
                          }
                        >
                          {item.time}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-gray-500">{item.mode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Online Features */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get with Online Classes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {onlineFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <feature.icon className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mode Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Mode</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Online */}
            <div className="bg-indigo-50 rounded-2xl p-6 border-2 border-indigo-200">
              <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Monitor className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Online</h3>
              <p className="text-gray-600 mb-4">
                Study entirely from your Greater Noida home. Zero travel.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Live interactive classes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Recorded lectures
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  WhatsApp doubt support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Digital study material
                </li>
              </ul>
              <p className="text-2xl font-bold text-indigo-700">
                Rs 45,000<span className="text-sm font-normal text-gray-500">/year</span>
              </p>
              <p className="text-sm text-green-600 mt-2">
                Most Popular - 70% Greater Noida students choose this
              </p>
            </div>

            {/* Hybrid - Recommended */}
            <div className="bg-yellow-400 rounded-2xl p-6 relative transform md:scale-105">
              <span className="absolute top-0 right-0 bg-indigo-900 text-yellow-400 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                BEST VALUE
              </span>
              <div className="w-14 h-14 bg-indigo-900 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-7 h-7 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hybrid Mode</h3>
              <p className="text-indigo-900 mb-4">
                Online + Weekend offline at Sector 62, Noida.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                {hybridBenefits.slice(0, 4).map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-900" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="text-2xl font-bold text-indigo-900">
                Rs 55,000<span className="text-sm font-normal text-indigo-800">/year</span>
              </p>
              <p className="text-sm text-indigo-800 mt-2">Recommended for better accountability</p>
            </div>

            {/* Full Offline */}
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
              <div className="w-14 h-14 bg-gray-600 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Full Offline</h3>
              <p className="text-gray-600 mb-4">
                Daily classes at Sector 62, Noida center. Via Aqua Line Metro.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-600" />
                  Classroom environment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-600" />
                  Small batch (15 students)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-600" />
                  Daily doubt classes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-600" />
                  Library access
                </li>
              </ul>
              <p className="text-2xl font-bold text-gray-700">
                Rs 65,000<span className="text-sm font-normal text-gray-500">/year</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Aqua Line → Blue Line → Sector 62 Metro Station
              </p>
            </div>
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
                  <span className="text-gray-600 group-open:rotate-180 transition-transform">
                    &#9660;
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Online NEET Classes Today</h2>
          <p className="text-xl text-indigo-200 mb-8">
            Join 800+ Greater Noida students already learning online
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919953643938"
              className="inline-flex items-center gap-2 bg-yellow-500 text-indigo-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call 99536-43938
            </a>
            <Link
              href="/biology-classes-greater-noida"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              View All Greater Noida Programs <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Inline JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Online NEET Biology Coaching for Greater Noida Students',
            description:
              'Online NEET Biology classes for Greater Noida students. Live interactive sessions + hybrid mode with weekend offline at Sector 62, Noida.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'B-45, Sector 62',
                addressLocality: 'Noida',
                addressRegion: 'UP',
                postalCode: '201301',
                addressCountry: 'IN',
              },
            },
            educationalLevel: 'Class 11, 12, Dropper',
            courseMode: ['Online', 'Blended'],
            offers: {
              '@type': 'Offer',
              price: '45000',
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://cerebrumbiologyacademy.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'NEET Coaching Greater Noida',
                item: 'https://cerebrumbiologyacademy.com/neet-coaching-greater-noida',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Online Classes',
                item: 'https://cerebrumbiologyacademy.com/online-neet-coaching-greater-noida',
              },
            ],
          }),
        }}
      />
    </div>
  )
}
