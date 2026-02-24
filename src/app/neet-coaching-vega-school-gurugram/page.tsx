import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Car, ArrowRight, Users, Sparkles, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching for Vega School Gurugram',
  description:
    'Best NEET coaching for Vega Schools students. Progressive education to NEET transition. Just 15 min from campus. AIIMS faculty, 98% success rate. Call 88264-44334!',
  keywords: [
    'neet coaching vega school gurugram',
    'vega school neet preparation',
    'neet classes vega schools gurugram',
    'vega school neet coaching',
    'neet coaching near vega school',
    'biology tuition vega school students',
  ],
  openGraph: {
    title: 'NEET Coaching for Vega School',
    description: 'Specialized NEET coaching for Vega School students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-vega-school-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-vega-school-gurugram',
  },
}

const whyVegaStudents = [
  {
    title: 'Progressive to Traditional Bridge',
    description: 'Vega\'s inquiry-based learning meets NEET\'s exam-focused requirements seamlessly.',
    icon: Sparkles,
  },
  {
    title: 'IGCSE/CBSE Support',
    description: 'Support for both IGCSE and CBSE curriculum Vega students.',
    icon: Globe,
  },
  {
    title: 'Flexible Scheduling',
    description: 'Batch timings designed around Vega\'s unique school calendar.',
    icon: Users,
  },
]

const nearbyAreas = [
  { name: 'Vega School Sec 48', distance: '8 min drive' },
  { name: 'Sector 48', distance: '8 min drive' },
  { name: 'Sector 49', distance: '6 min drive' },
  { name: 'Sector 50', distance: '5 min drive' },
  { name: 'Golf Course Road', distance: '10 min drive' },
]

const faqs = [
  {
    question: 'How far is Cerebrum from Vega School?',
    answer: 'Our center at M2K Corporate Park, Sector 51 is approximately 3-4 km from Vega School Sector 48. It takes just 6-8 minutes by car.',
  },
  {
    question: 'Does Vega\'s progressive approach affect NEET prep?',
    answer: 'Vega students have strong conceptual understanding from inquiry-based learning. We channel this into NEET-specific application and MCQ practice.',
  },
  {
    question: 'Do you support both IGCSE and CBSE Vega students?',
    answer: 'Yes! Vega offers both curricula. For IGCSE students, we have bridge modules. CBSE students get direct NEET alignment.',
  },
  {
    question: 'How is your teaching style compatible with Vega approach?',
    answer: 'We use conceptual discussions and application-based learning - similar to Vega. MCQ training is added systematically to prepare for exam format.',
  },
]

export default function NEETCoachingVegaSchool() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <section className="bg-gradient-to-r from-violet-700 to-violet-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-violet-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              For Vega Students
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching for Vega School</h1>
            <p className="text-xl text-violet-100 mb-4">Progressive education meets NEET success</p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>Just 8 min from Sector 48 campus</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+918826444334" className="bg-yellow-500 text-violet-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition">
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
          <h2 className="text-2xl font-bold text-center mb-8">Area Coverage</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-violet-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{area.name}</p>
                <p className="text-violet-600 text-sm">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Vega Students Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyVegaStudents.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <item.icon className="w-12 h-12 text-violet-600 mb-4" />
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
                  <MapPin className="w-5 h-5 text-violet-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-violet-600 mt-1">3-4 km from Vega School</p>
                  </div>
                </div>
                <div className="bg-violet-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-violet-800"><strong>Route:</strong> Vega Sec 48 → Sector 49 → Sector 51 (8 min)</p>
                </div>
                <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-700 transition">
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
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Vega Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-violet-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-violet-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Vega Students at Cerebrum</h2>
          <p className="text-xl text-violet-100 mb-8">Inquiry-based learners thrive with our conceptual approach.</p>
          <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-violet-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
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
