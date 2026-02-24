import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Car, ArrowRight, GraduationCap, Users, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching for Paras World School Gurugram',
  description:
    'Best NEET coaching for Paras World School Sector 46 students. Just 8 min drive. CBSE-NEET aligned preparation. AIIMS faculty, 98% success rate. Call 88264-44334!',
  keywords: [
    'neet coaching paras world school gurugram',
    'paras world school neet preparation',
    'neet classes paras school sector 46',
    'paras world school neet coaching',
    'neet coaching near paras school gurugram',
    'biology tuition paras world school',
  ],
  openGraph: {
    title: 'NEET Coaching for Paras World School',
    description: 'Specialized NEET coaching for Paras World School students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-paras-world-school-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-paras-world-school-gurugram',
  },
}

const whyParasStudents = [
  {
    title: 'Closest NEET Coaching',
    description: 'Just 8 minutes from Paras World School Sector 46 - extremely convenient.',
    icon: Target,
  },
  {
    title: 'Strong CBSE Base',
    description: 'Paras World School\'s CBSE curriculum aligns perfectly with NEET preparation.',
    icon: GraduationCap,
  },
  {
    title: 'Personal Attention',
    description: 'Small batches of 20 students ensure everyone gets individual support.',
    icon: Users,
  },
]

const nearbyAreas = [
  { name: 'Paras World School', distance: '8 min drive' },
  { name: 'Sector 46', distance: '8 min drive' },
  { name: 'Sector 47', distance: '9 min drive' },
  { name: 'Sector 50', distance: '5 min drive' },
  { name: 'Golf Course Road', distance: '10 min drive' },
]

const faqs = [
  {
    question: 'How far is Cerebrum from Paras World School?',
    answer: 'Our center at M2K Corporate Park, Sector 51 is approximately 3-4 km from Paras World School Sector 46. It takes just 6-8 minutes by car.',
  },
  {
    question: 'Why is proximity important for NEET coaching?',
    answer: 'Less travel time = more study time. Paras students can attend evening batch (4-7 PM) and still reach home early. No fatigue from long commutes.',
  },
  {
    question: 'Do you have other Paras World School students?',
    answer: 'Yes! We have 10+ students from Paras World School. Being one of the closest coaching centers to their school, we are a natural choice.',
  },
  {
    question: 'Can I come directly after school?',
    answer: 'Absolutely! Many Paras students come directly after school for our 4 PM batch. The short distance makes this very convenient.',
  },
]

export default function NEETCoachingParasWorldSchool() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <section className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white text-amber-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" />
              For Paras Students
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching for Paras World School</h1>
            <p className="text-xl text-amber-100 mb-4">Closest quality NEET coaching to your school</p>
            <div className="flex items-center justify-center gap-2 text-yellow-200 mb-8">
              <Car className="w-5 h-5" />
              <span>Just 8 min from Sector 46 campus</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+918826444334" className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-amber-50 transition">
                <Phone className="w-5 h-5" />Call 88264-44334
              </a>
              <Link href="/neet-coaching-gurugram" className="bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-amber-800 transition">
                View All Locations<ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Area Coverage</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-amber-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{area.name}</p>
                <p className="text-amber-600 text-sm">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Paras Students Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyParasStudents.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <item.icon className="w-12 h-12 text-amber-600 mb-4" />
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
                  <MapPin className="w-5 h-5 text-amber-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-amber-600 mt-1">3-4 km from Paras World School</p>
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-amber-800"><strong>Quick Route:</strong> Paras Sec 46 → Sector 50 → Sector 51 (8 min)</p>
                </div>
                <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition">
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
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Paras Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-amber-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join 10+ Paras Students at Cerebrum</h2>
          <p className="text-xl text-amber-100 mb-8">Shortest commute, highest quality. The smart choice.</p>
          <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition">
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
