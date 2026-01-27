import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Car, ArrowRight, GraduationCap, Users, Award, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching for Bal Bharati School Gurugram | Cerebrum Academy',
  description:
    'Best NEET coaching for Bal Bharati Public School Brij Vihar students. Just 15 min drive. CBSE-NEET aligned preparation. AIIMS faculty, 98% success rate. Call 88264-44334!',
  keywords: [
    'neet coaching bal bharati school gurugram',
    'bal bharati school neet preparation',
    'neet classes bal bharati brij vihar',
    'bal bharati public school neet coaching',
    'neet coaching near bal bharati gurugram',
    'biology tuition bal bharati students',
  ],
  openGraph: {
    title: 'NEET Coaching for Bal Bharati School | Cerebrum Academy',
    description: 'Specialized NEET coaching for Bal Bharati students. CBSE aligned.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-bal-bharati-school-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-bal-bharati-school-gurugram',
  },
}

const whyBalBharatiStudents = [
  {
    title: 'CBSE Foundation',
    description: 'Build on your strong CBSE base. NCERT-first approach perfectly aligned with your curriculum.',
    icon: GraduationCap,
  },
  {
    title: 'Convenient Location',
    description: 'Just 15 min from school. Easy post-school commute to our Sector 51 center.',
    icon: Clock,
  },
  {
    title: 'School Toppers Choice',
    description: 'Multiple Bal Bharati toppers have trained with us for NEET success.',
    icon: Award,
  },
]

const nearbyAreas = [
  { name: 'Bal Bharati School', distance: '15 min drive' },
  { name: 'Brij Vihar', distance: '12 min drive' },
  { name: 'Sector 46', distance: '8 min drive' },
  { name: 'Sector 47', distance: '9 min drive' },
  { name: 'Sector 45', distance: '10 min drive' },
]

const faqs = [
  {
    question: 'How far is Cerebrum from Bal Bharati School?',
    answer: 'Our center at M2K Corporate Park, Sector 51 is approximately 6-7 km from Bal Bharati Public School Brij Vihar. Takes 12-15 minutes by car.',
  },
  {
    question: 'What batch timings work for Bal Bharati students?',
    answer: 'Our 4-7 PM evening batch is perfect for Bal Bharati students. We also have weekend batches (Sat-Sun 9 AM - 1 PM) for those preferring fewer weekday commitments.',
  },
  {
    question: 'Do you follow CBSE pattern?',
    answer: 'Yes! Our approach is NCERT-first, perfectly aligned with CBSE curriculum. We build NEET preparation on top of your school foundation rather than creating parallel tracks.',
  },
  {
    question: 'Are there other Bal Bharati students at Cerebrum?',
    answer: 'Yes, we have 8-10 students from Bal Bharati School. They often study together and form study groups which helps in peer learning.',
  },
]

export default function NEETCoachingBalBharatiSchool() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white text-orange-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" />
              For Bal Bharati Students
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching for Bal Bharati School</h1>
            <p className="text-xl text-orange-100 mb-4">CBSE-aligned NEET preparation just 15 min from your school</p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>12-15 min from Brij Vihar campus</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+918826444334" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-orange-50 transition">
                <Phone className="w-5 h-5" />Call 88264-44334
              </a>
              <Link href="/neet-coaching-gurugram" className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-orange-800 transition">
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
              <div key={index} className="bg-orange-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{area.name}</p>
                <p className="text-orange-600 text-sm">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Bal Bharati Students Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyBalBharatiStudents.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <item.icon className="w-12 h-12 text-orange-600 mb-4" />
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
                  <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-orange-600 mt-1">6-7 km from Bal Bharati School</p>
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-orange-800"><strong>Route:</strong> Bal Bharati → Sector 46 → Golf Course Rd → Sector 51</p>
                </div>
                <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
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
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Bal Bharati Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-orange-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Bal Bharati Students at Cerebrum</h2>
          <p className="text-xl text-orange-100 mb-8">CBSE foundation + NEET expertise = Success formula.</p>
          <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">
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
