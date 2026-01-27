import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Car, ArrowRight, GraduationCap, Users, CheckCircle, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching for K R Mangalam World School Gurugram | Cerebrum Academy',
  description:
    'Best NEET coaching for K R Mangalam World School students. Multiple campus coverage - Sector 51 near GK-2, Vaishali near Sector 88. AIIMS faculty, 98% success. Call 88264-44334!',
  keywords: [
    'neet coaching kr mangalam world school',
    'kr mangalam school neet preparation',
    'neet classes kr mangalam gurugram',
    'kr mangalam world school neet coaching',
    'neet coaching sector 88 gurugram',
    'biology tuition kr mangalam students',
  ],
  openGraph: {
    title: 'NEET Coaching for K R Mangalam World School | Cerebrum Academy',
    description: 'Specialized NEET coaching for KRM students from multiple campuses.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kr-mangalam-world-school-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kr-mangalam-world-school-gurugram',
  },
}

const campusDistances = [
  { campus: 'KRM GK-2 Campus', distance: '25 min', route: 'via NH-48' },
  { campus: 'KRM Vaishali Campus', distance: '35 min', route: 'via Golf Course Rd' },
  { campus: 'KRM Sector 88', distance: '20 min', route: 'via Dwarka Expressway' },
]

const whyKRMStudents = [
  {
    title: 'Multi-Campus Coverage',
    description: 'Convenient for KRM students from GK-2, Vaishali, and Sector 88 campuses.',
    icon: GraduationCap,
  },
  {
    title: 'CBSE-NEET Alignment',
    description: 'Build on your strong CBSE foundation with NEET-specific advanced training.',
    icon: Award,
  },
  {
    title: 'After-School Batches',
    description: 'Evening and weekend batches designed around school timings.',
    icon: Users,
  },
]

const faqs = [
  {
    question: 'Which KRM campus is closest to Cerebrum?',
    answer: 'KRM Sector 88 campus is closest at about 20 minutes. GK-2 campus is 25 minutes via NH-48, and Vaishali campus is 35 minutes via Golf Course Road.',
  },
  {
    question: 'Do you have students from K R Mangalam?',
    answer: 'Yes! We have 15+ students from various KRM campuses. They appreciate our small batches and personalized attention compared to large coaching centers.',
  },
  {
    question: 'Can KRM students balance school and NEET prep?',
    answer: 'Absolutely. Our 4-7 PM evening batch and weekend batches are designed for school students. We also coordinate with school exam schedules for test planning.',
  },
  {
    question: 'Is there carpool from KRM area?',
    answer: 'Yes, we can connect you with other KRM students for carpooling. Many students share rides, reducing travel burden and costs.',
  },
]

export default function NEETCoachingKRMangalamWorldSchool() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" />
              For KRM Students
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching for K R Mangalam World School</h1>
            <p className="text-xl text-blue-100 mb-4">Serving all KRM campuses - GK-2, Vaishali, Sector 88</p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>20-35 min from various campuses</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+918826444334" className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition">
                <Phone className="w-5 h-5" />Call 88264-44334
              </a>
              <Link href="/neet-coaching-gurugram" className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 transition">
                View All Locations<ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Distance from KRM Campuses</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {campusDistances.map((item, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{item.campus}</p>
                <p className="text-blue-600 text-lg font-bold">{item.distance}</p>
                <p className="text-sm text-gray-500">{item.route}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why KRM Students Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyKRMStudents.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
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
                    <p className="text-sm text-blue-600 mt-1">Central location for all KRM campuses</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-800"><strong>From Sector 88:</strong> Dwarka Exp → Sector 56 → Sector 51 (20 min)</p>
                </div>
                <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  <Phone className="w-5 h-5" />Book Free Demo
                </a>
              </div>
              <div className="md:w-1/2">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1!2d77.07!3d28.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sM2K%20Corporate%20Park!5e0!3m2!1sen!2sin!4v1" width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for KRM Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join 15+ KRM Students at Cerebrum</h2>
          <p className="text-xl text-blue-100 mb-8">Small batches, big results. Book your free demo today.</p>
          <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
            <Phone className="w-5 h-5" />Call Now: 88264-44334
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      }) }} />
    </div>
  )
}
