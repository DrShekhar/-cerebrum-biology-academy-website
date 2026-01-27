import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Car, ArrowRight, GraduationCap, Users, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching for Presidium School Gurugram | Cerebrum Academy',
  description:
    'Best NEET coaching for Presidium School Gurugram students. Multiple campuses covered - Sector 49, 57. Just 10-15 min drive. AIIMS faculty, 98% success. Call 88264-44334!',
  keywords: [
    'neet coaching presidium school gurugram',
    'presidium school neet preparation',
    'neet classes presidium sector 49',
    'presidium school neet coaching',
    'neet coaching near presidium gurugram',
    'biology tuition presidium students',
  ],
  openGraph: {
    title: 'NEET Coaching for Presidium School | Cerebrum Academy',
    description: 'Specialized NEET coaching for Presidium students. Multiple campuses.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-presidium-school-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-presidium-school-gurugram',
  },
}

const campusDistances = [
  { campus: 'Presidium Sector 49', distance: '8 min', route: 'Direct via Sector 50' },
  { campus: 'Presidium Sector 57', distance: '5 min', route: 'Adjacent sector' },
  { campus: 'Presidium Dwarka', distance: '25 min', route: 'via NH-48' },
]

const whyPresidiumStudents = [
  {
    title: 'Closest to Sector 57 Campus',
    description: 'Just 5 minutes from Presidium Sector 57 - one of the closest coaching options.',
    icon: Target,
  },
  {
    title: 'Activity-Based Learning',
    description: 'Presidium students are used to interactive learning. Our teaching style matches.',
    icon: GraduationCap,
  },
  {
    title: 'Multiple Campus Coverage',
    description: 'Serving Presidium students from Sector 49, 57, and Dwarka campuses.',
    icon: Users,
  },
]

const faqs = [
  {
    question: 'How far is Cerebrum from Presidium campuses?',
    answer: 'Presidium Sector 57 is just 5 min away, Sector 49 is 8 min, and Dwarka campus is about 25 min. We are ideally located for most Presidium students.',
  },
  {
    question: 'Do you have other Presidium students?',
    answer: 'Yes! We have 12+ students from various Presidium campuses. The proximity to Sector 57 campus makes us especially popular with those students.',
  },
  {
    question: 'What makes your teaching suitable for Presidium students?',
    answer: 'Presidium emphasizes activity-based learning. Our interactive teaching with models, diagrams, and discussions matches this approach rather than rote memorization.',
  },
  {
    question: 'Can I come directly after school?',
    answer: 'Absolutely! Our 4 PM batch is perfect for students coming directly from school. Many Presidium students follow this routine.',
  },
]

export default function NEETCoachingPresidiumSchool() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <section className="bg-gradient-to-r from-purple-700 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" />
              For Presidium Students
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching for Presidium School</h1>
            <p className="text-xl text-purple-100 mb-4">Just 5-8 min from Sector 49 & 57 campuses</p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>Closest NEET coaching to Presidium Sector 57</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+918826444334" className="bg-yellow-500 text-purple-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition">
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
          <h2 className="text-2xl font-bold text-center mb-8">Distance from Presidium Campuses</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {campusDistances.map((item, index) => (
              <div key={index} className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{item.campus}</p>
                <p className="text-purple-600 text-lg font-bold">{item.distance}</p>
                <p className="text-sm text-gray-500">{item.route}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Presidium Students Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyPresidiumStudents.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <item.icon className="w-12 h-12 text-purple-600 mb-4" />
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
                  <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-purple-600 mt-1">5 min from Presidium Sector 57</p>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-purple-800"><strong>Quick Route:</strong> Presidium Sec 57 → Sector 56 → Sector 51 (5 min)</p>
                </div>
                <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
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
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Presidium Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join 12+ Presidium Students</h2>
          <p className="text-xl text-purple-100 mb-8">Closest quality NEET coaching to your school.</p>
          <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
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
