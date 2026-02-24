import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Car, ArrowRight, GraduationCap, Users, CheckCircle, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching for Pathways World School Gurugram',
  description:
    'Best NEET coaching for Pathways World School Aravali students. Just 18 min from campus. IB/IGCSE to NEET transition support. AIIMS faculty, 98% success. Call 88264-44334!',
  keywords: [
    'neet coaching pathways world school',
    'pathways school neet preparation gurugram',
    'neet classes pathways aravali',
    'pathways world school neet coaching',
    'ib to neet coaching gurugram',
    'igcse neet preparation gurugram',
  ],
  openGraph: {
    title: 'NEET Coaching for Pathways World School',
    description: 'Specialized NEET coaching for Pathways students. IB/IGCSE support.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-pathways-world-school-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-pathways-world-school-gurugram',
  },
}

const whyPathwaysStudents = [
  {
    title: 'IB to NEET Bridge',
    description: 'Specialized coaching to bridge IB Biology syllabus gaps for NEET requirements.',
    icon: Globe,
  },
  {
    title: 'Flexible Timing',
    description: 'After-school and weekend batches designed around Pathways schedule.',
    icon: Users,
  },
  {
    title: 'English Medium Focus',
    description: 'All materials and teaching in English, matching Pathways curriculum style.',
    icon: GraduationCap,
  },
]

const nearbyAreas = [
  { name: 'Pathways World School', distance: '18 min drive' },
  { name: 'Aravali Hills', distance: '20 min drive' },
  { name: 'Sector 56', distance: '10 min drive' },
  { name: 'Golf Course Road', distance: '12 min drive' },
  { name: 'Sector 54', distance: '8 min drive' },
]

const faqs = [
  {
    question: 'How far is Cerebrum from Pathways World School?',
    answer: 'Our center at M2K Corporate Park, Sector 51 is approximately 12-14 km from Pathways World School Aravali campus. Via Gurgaon-Faridabad Road, it takes 15-18 minutes.',
  },
  {
    question: 'Do you support IB Biology students for NEET?',
    answer: 'Yes! We have specific modules to bridge IB HL/SL Biology to NEET syllabus. Key gaps like Ecology depth, Human Physiology details, and NCERT-specific topics are covered.',
  },
  {
    question: 'Can Pathways students balance school and NEET prep?',
    answer: 'Absolutely. Our evening (4-7 PM) and weekend batches are designed for international school students. We also offer online sessions for flexibility.',
  },
  {
    question: 'What about IGCSE students?',
    answer: 'IGCSE students need more extensive bridging as the syllabus differs significantly. We recommend starting NEET prep from Grade 10 or early Grade 11 for IGCSE students.',
  },
]

export default function NEETCoachingPathwaysWorldSchool() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-emerald-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Globe className="w-4 h-4" />
              For International School Students
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching for Pathways World School</h1>
            <p className="text-xl text-emerald-100 mb-4">Specialized IB/IGCSE to NEET transition program at M2K Sector 51</p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>15-18 min from Aravali Campus</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+918826444334" className="bg-yellow-500 text-emerald-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition">
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
              <div key={index} className="bg-emerald-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{area.name}</p>
                <p className="text-emerald-600 text-sm">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Pathways Students Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyPathwaysStudents.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <item.icon className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">IB to NEET Bridge Program</h2>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-emerald-800 mb-4">Topics Added for NEET:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />Detailed NCERT Ecology concepts</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />Human Physiology depth (IB HL gap)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />Plant Biology detailed coverage</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />Genetics & Evolution specifics</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-emerald-800 mb-4">Already Covered in IB:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />Cell Biology fundamentals</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />Molecular Biology basics</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />Biochemistry concepts</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />Research methodology</li>
                  </ul>
                </div>
              </div>
            </div>
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
                  <MapPin className="w-5 h-5 text-emerald-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-emerald-600 mt-1">12-14 km from Pathways Aravali</p>
                  </div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-emerald-800"><strong>Route:</strong> Pathways → Gurgaon-Faridabad Rd → Sector 56 → Sector 51</p>
                </div>
                <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
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
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Pathways Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Pathways Students at Cerebrum</h2>
          <p className="text-xl text-emerald-100 mb-8">Bridge the IB-NEET gap with expert guidance.</p>
          <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-emerald-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
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
