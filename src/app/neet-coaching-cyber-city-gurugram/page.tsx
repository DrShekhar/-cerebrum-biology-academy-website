import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  MapPin,
  Clock,
  Car,
  ArrowRight,
  Building,
  Briefcase,
  Train,
  Users,
} from 'lucide-react'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

export const metadata: Metadata = {
  title: 'NEET Coaching Cyber City Gurugram | 10 Min from DLF Cyber Hub',
  description:
    'Best NEET coaching near Cyber City Gurugram (Gurgaon). Just 10 min drive to M2K Sector 51. Perfect for IT professional families. AIIMS faculty, 98% success rate. Call 88264-44334!',
  keywords: [
    'neet coaching cyber city gurugram',
    'neet classes cyber city gurgaon',
    'biology coaching cyber hub gurugram',
    'neet coaching near dlf cyber city',
    'neet preparation cyber city',
    'biology tuition cyber city gurgaon',
    'neet classes near cyber hub',
    'medical coaching cyber city gurugram',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching Cyber City Gurugram',
    description: 'Best NEET coaching near Cyber City. Just 10 min from DLF Cyber Hub.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-cyber-city-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-cyber-city-gurugram',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching Cyber City Gurugram | 10 Min from DLF Cyber Hub',
    description:
      'Best NEET coaching near Cyber City Gurugram (Gurgaon). Just 10 min drive to M2K Sector 51. Perfect for IT professional families. AIIMS faculty, 98% success rate. Call 88264-44334!',
  },
}

const nearbyAreas = [
  { name: 'DLF Cyber City', distance: '10 min drive' },
  { name: 'Cyber Hub', distance: '12 min drive' },
  { name: 'DLF Phase 2', distance: '8 min drive' },
  { name: 'DLF Phase 3', distance: '10 min drive' },
  { name: 'Udyog Vihar', distance: '15 min drive' },
  { name: 'Sikanderpur Metro', distance: '12 min drive' },
]

const faqs = [
  {
    question: 'Can my parents drop me off on their way to DLF Cyber Hub or Building 8?',
    answer:
      'Yes - this is the single most common arrangement we see for Cyber City families. The drive from Sector 51 (M2K Corporate Park) back toward DLF Cyber City takes 10-12 minutes via Golf Course Road. Parents heading to Building 5, 8, 9, or Cyber Hub typically drop students at 4:45 PM, then continue to office. Pickup at 8 PM works because Cyber City office hours often run late.',
  },
  {
    question: 'Do your batch timings account for Golf Course Road peak traffic from Cyber City?',
    answer:
      'Yes. Our 5-8 PM evening batch starts after the worst Cyber City exit congestion (3:30-4:30 PM peak), and ends before the 8:30-9:30 PM second wave when late-shift IT employees head home. Weekend Sat-Sun 9 AM-1 PM batches sidestep weekday Cyber City traffic entirely - most preferred by families with parents working hybrid Mon-Wed-Fri or Tue-Thu schedules.',
  },
  {
    question: 'Which IT companies do current Cerebrum families work at?',
    answer:
      'Our Cyber City cohort includes parents from Google, Microsoft, Accenture, Deloitte, EY, KPMG, Infosys, TCS, Wipro, and HCL - reflecting the DLF Cyber City and Udyog Vihar tenant mix. Most Gurgaon parents call our area "Gurugram Sector 51" on Google Maps for navigation. Word-of-mouth referrals run strongly within company WhatsApp parent groups.',
  },
  {
    question: 'How do you handle kids whose parents have unpredictable IT project deadlines?',
    answer:
      'We accommodate Cyber City reality directly. Parents can switch a child to our online live batch any week with 24-hour notice if a sprint deadline or on-call rotation changes their drop-off plan. Recordings are available for 7 days. We also share weekly written progress reports via email so working parents can review at their own time without needing PTM leave.',
  },
]

const itCompanies = [
  'Google',
  'Microsoft',
  'Accenture',
  'Deloitte',
  'EY',
  'KPMG',
  'Infosys',
  'TCS',
  'Wipro',
  'HCL',
]

export default function NEETCoachingCyberCityGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Gurugram',
          'NEET Biology Gurugram',
          'Medical entrance coaching Gurugram',
        ]}
      />
      <GurgaonGurugramAreaSchema
        spelling="gurugram"
        pageSlug="neet-coaching-cyber-city-gurugram"
        subArea="Cyber City"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Briefcase className="w-4 h-4" />
              For IT Professional Families
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cyber City NEET Coaching Built Around IT-Family Schedules
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-4 leading-relaxed">
              Cerebrum sits 5-6 km east of DLF Cyber City - a 10-12 minute Golf Course Road drive
              from Building 5, 8, 9 and Cyber Hub. Parents commuting to Google, Microsoft, Accenture
              or Deloitte offices drop students at our Sector 51 center on the way in, and our
              evening 5-8 PM batch is designed around DLF traffic patterns and hybrid work
              calendars. Online live classes back up any week a sprint deadline interrupts the
              routine.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>10-12 min via Golf Course Road</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
              >
                <Phone className="w-5 h-5" />
                Call 88264-44334
              </a>
              <Link
                href="/neet-coaching-gurugram"
                className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 transition"
              >
                View All Locations
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IT Companies Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-700">
            Trusted by Families Working At
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {itCompanies.map((company) => (
              <span
                key={company}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Distance Info */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Cyber City Area Coverage</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <p className="font-semibold">{area.name}</p>
                <p className="text-blue-600">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose - Tech Parent Focus */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why IT Families Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-xl">
              <Building className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Corporate-Style Reports</h3>
              <p className="text-gray-600">
                Weekly progress reports, performance analytics, and structured feedback that tech
                professionals appreciate.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Flexible for Busy Parents</h3>
              <p className="text-gray-600">
                Evening & weekend batches. Online option available. No need to take leave for PTMs.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Peer Group Quality</h3>
              <p className="text-gray-600">
                Your child studies with kids from similar backgrounds - educated families, good
                schools, high aspirations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Center Location */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">Our Location</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-blue-600 mt-1">5-6 km from Cyber City</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Train className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">Metro Access</p>
                    <p className="text-gray-600">Rapid Metro to Cyber City + 15 min cab</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Route:</strong> Cyber City → Golf Course Road → Sector 54 → Sector 51
                  </p>
                </div>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Demo
                </a>
              </div>
              <div className="md:w-1/2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1234567890123!2d77.0712345!3d28.4123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sM2K%20Corporate%20Park%2C%20Sector%2051%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Cyber City Families</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
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
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join 60+ Cyber City Families</h2>
          <p className="text-xl text-blue-100 mb-8">
            Book a free demo class. Your colleagues already trust us with their children.
          </p>
          <a
            href="tel:+918826444334"
            className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            <Phone className="w-5 h-5" />
            Call Now: 88264-44334
          </a>
        </div>
      </section>

      {/* Schema */}
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
    </div>
  )
}
