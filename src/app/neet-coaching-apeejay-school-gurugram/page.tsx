import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Car, ArrowRight, GraduationCap, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching for Apeejay School Gurugram',
  description:
    'Best NEET coaching for Apeejay School Sector 15 students. Just 10 min drive. Strong CBSE foundation + NEET expertise. AIIMS faculty, 98% success rate. Call 88264-44334!',
  keywords: [
    'neet coaching apeejay school gurugram',
    'apeejay school neet preparation',
    'neet classes apeejay sector 15',
    'apeejay school neet coaching',
    'neet coaching near apeejay gurugram',
    'biology tuition apeejay students',
  ],
  openGraph: {
    title: 'NEET Coaching for Apeejay School',
    description: 'Specialized NEET coaching for Apeejay students. CBSE aligned.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-apeejay-school-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-apeejay-school-gurugram',
  },
}

const whyApeejayStudents = [
  {
    title: 'CBSE Excellence',
    description: 'Apeejay\'s strong CBSE foundation is perfect for NEET. We build on your school preparation.',
    icon: GraduationCap,
  },
  {
    title: 'Sector 15 Proximity',
    description: 'Easy commute from Sector 15 area. Post-school batches available.',
    icon: Car,
  },
  {
    title: 'Academic Rigor Match',
    description: 'Apeejay students are used to rigorous academics. Our intensity level matches.',
    icon: BookOpen,
  },
]

const nearbyAreas = [
  { name: 'Apeejay School Sec 15', distance: '10 min drive' },
  { name: 'Sector 15', distance: '12 min drive' },
  { name: 'Sector 14', distance: '14 min drive' },
  { name: 'Old Gurgaon', distance: '15 min drive' },
  { name: 'Sector 9A', distance: '13 min drive' },
]

const faqs = [
  {
    question: 'How far is Cerebrum from Apeejay School?',
    answer: 'Our center at M2K Corporate Park, Sector 51 is approximately 5-6 km from Apeejay School Sector 15. Via Golf Course Road or Sohna Road, it takes 10-12 minutes.',
  },
  {
    question: 'Why should Apeejay students join Cerebrum?',
    answer: 'Apeejay has excellent CBSE academics. We build on this foundation with NEET-specific training, MCQ practice, and AIIMS faculty guidance. Your strong school base gives you an advantage.',
  },
  {
    question: 'Do you coordinate with school schedules?',
    answer: 'Yes! We plan our test schedules around major school exams. Our evening batch (4-7 PM) allows students to attend after school without conflicts.',
  },
  {
    question: 'How is Cerebrum different from Sector 14 coaching?',
    answer: 'Sector 14 has large coaching centers with 100+ batches. We offer 20-student batches, personal attention, and AIIMS faculty. Quality over quantity.',
  },
]

export default function NEETCoachingApeejaySchool() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <section className="bg-gradient-to-r from-red-700 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-red-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" />
              For Apeejay Students
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching for Apeejay School</h1>
            <p className="text-xl text-red-100 mb-4">Build on your strong CBSE foundation with NEET expertise</p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>10 min from Sector 15 campus</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+918826444334" className="bg-yellow-500 text-red-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition">
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
              <div key={index} className="bg-red-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{area.name}</p>
                <p className="text-red-600 text-sm">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Apeejay Students Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyApeejayStudents.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <item.icon className="w-12 h-12 text-red-600 mb-4" />
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
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-red-600 mt-1">5-6 km from Apeejay Sector 15</p>
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-red-800"><strong>Route:</strong> Apeejay → Sohna Road → Sector 50 → Sector 51</p>
                </div>
                <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
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
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Apeejay Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-red-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Apeejay Students at Cerebrum</h2>
          <p className="text-xl text-red-100 mb-8">Your CBSE excellence + Our NEET expertise = AIIMS dream.</p>
          <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-red-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
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
