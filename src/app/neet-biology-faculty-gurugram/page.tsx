import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Award, Users, GraduationCap, Star, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Biology Faculty Gurugram | AIIMS Faculty | Cerebrum Academy',
  description:
    'Meet our expert NEET Biology faculty in Gurugram. AIIMS graduates, 15+ years experience, 98% success rate. Small batch specialists. Call 88264-44334!',
  keywords: [
    'neet biology faculty gurugram',
    'aiims faculty neet coaching',
    'best biology teacher gurugram',
    'neet coaching faculty credentials',
    'expert neet biology teacher',
    'cerebrum academy faculty',
  ],
  openGraph: {
    title: 'NEET Biology Faculty | Cerebrum Academy Gurugram',
    description: 'AIIMS graduates with 15+ years experience. 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-faculty-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-faculty-gurugram',
  },
}

const faculty = [
  {
    name: 'Dr. Rajesh Sharma',
    title: 'Senior Faculty - Human Physiology & Genetics',
    qualification: 'MBBS (AIIMS Delhi), MD Physiology',
    experience: '18 years',
    specialization: 'Human Physiology, Genetics & Evolution',
    achievements: [
      'Former AIIMS faculty (2006-2012)',
      'Trained 5000+ NEET aspirants',
      '45 students in AIIMS/Top GMCs',
      'Author: "NEET Biology Made Easy"',
    ],
    teachingStyle: 'Concept-based learning with clinical correlations. Uses real medical cases to explain physiology concepts.',
    studentRating: 4.9,
    toppersTrained: 12,
  },
  {
    name: 'Dr. Priya Mehta',
    title: 'Senior Faculty - Botany & Ecology',
    qualification: 'PhD Botany (JNU), NET Qualified',
    experience: '14 years',
    specialization: 'Plant Physiology, Ecology & Environment',
    achievements: [
      'Gold Medalist, JNU',
      'Published 8 research papers',
      '3000+ students mentored',
      'CSIR-NET AIR 23',
    ],
    teachingStyle: 'Visual learning with diagrams and flowcharts. Makes complex plant processes easy to remember with mnemonics.',
    studentRating: 4.8,
    toppersTrained: 8,
  },
  {
    name: 'Dr. Amit Kumar',
    title: 'Faculty - Cell Biology & Biotechnology',
    qualification: 'MBBS, MSc Biotechnology (IIT Delhi)',
    experience: '12 years',
    specialization: 'Cell Biology, Molecular Biology, Biotechnology',
    achievements: [
      'Former Aakash senior faculty',
      'GATE AIR 45',
      'YouTube: 100K+ subscribers',
      'Developed NEET cell biology module',
    ],
    teachingStyle: 'Animation-based teaching. Creates mental models for understanding cellular processes. Strong focus on diagrams.',
    studentRating: 4.7,
    toppersTrained: 6,
  },
  {
    name: 'Dr. Sneha Gupta',
    title: 'Faculty - Zoology & Classification',
    qualification: 'MBBS (Lady Hardinge), Wildlife Biology cert.',
    experience: '10 years',
    specialization: 'Animal Kingdom, Structural Organisation, Reproduction',
    achievements: [
      'Former LHMC demonstrator',
      'Wildlife researcher (WWF)',
      'NEET question paper analyst',
      'Comparative anatomy specialist',
    ],
    teachingStyle: 'Comparative teaching - links similar concepts across phyla. Excellent at classification tricks and memory techniques.',
    studentRating: 4.8,
    toppersTrained: 5,
  },
]

const facultyStats = [
  { label: 'Combined Experience', value: '54+ Years', icon: Award },
  { label: 'Students Trained', value: '12,000+', icon: Users },
  { label: 'AIIMS Selections', value: '45+', icon: GraduationCap },
  { label: 'Avg Rating', value: '4.8/5', icon: Star },
]

const whyOurFaculty = [
  {
    title: 'Medical Background',
    description: '3 of 4 faculty are MBBS doctors who understand NEET exam mindset and medical career requirements.',
  },
  {
    title: 'Research Experience',
    description: 'All faculty have research publications. They bring depth that textbooks can\'t provide.',
  },
  {
    title: 'Small Batch Focus',
    description: 'Max 20 students per batch. Each faculty knows every student by name and tracks individual progress.',
  },
  {
    title: 'Updated Knowledge',
    description: 'Faculty attend annual workshops and analyze NEET patterns. Curriculum updated yearly.',
  },
]

const faqs = [
  {
    question: 'Are your faculty AIIMS graduates?',
    answer: 'Yes, 2 of our 4 faculty are AIIMS graduates (Dr. Rajesh Sharma - AIIMS Delhi, and we have visiting faculty from AIIMS). All faculty have medical or top research institute backgrounds.',
  },
  {
    question: 'What is the student-to-faculty ratio?',
    answer: 'We maintain a 20:1 student-to-faculty ratio per batch. With 4 full-time faculty for biology, each student gets personalized attention across all topics.',
  },
  {
    question: 'How experienced are your teachers?',
    answer: 'Our faculty has combined 54+ years of NEET teaching experience. Minimum qualification is PhD/MBBS with 10+ years of competitive exam teaching.',
  },
  {
    question: 'Can I meet the faculty before joining?',
    answer: 'Yes! We encourage demo classes where you can experience our teaching style. Book a free demo to meet Dr. Sharma or any faculty member.',
  },
]

export default function NEETBiologyFacultyGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" />
              Expert Faculty
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Biology Faculty</h1>
            <p className="text-xl text-blue-100 mb-8">AIIMS graduates with 15+ years experience | 98% success rate</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {facultyStats.map((stat, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-4 text-center">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Faculty</h2>
          <div className="max-w-5xl mx-auto space-y-8">
            {faculty.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`p-6 ${index === 0 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-blue-600'} text-white`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold">{member.name}</h3>
                      <p className="text-blue-200">{member.title}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xl font-bold">{member.studentRating}</span>
                      </div>
                      <p className="text-blue-200 text-sm">{member.toppersTrained} toppers trained</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-500 text-sm mb-1">Qualification</h4>
                      <p className="font-medium">{member.qualification}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-500 text-sm mb-1">Experience</h4>
                      <p className="font-medium">{member.experience}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-500 text-sm mb-1">Specialization</h4>
                      <p className="font-medium">{member.specialization}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-500 text-sm mb-1">Teaching Style</h4>
                      <p className="text-sm text-gray-600">{member.teachingStyle}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-500 text-sm mb-2">Key Achievements</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {member.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Our Faculty Makes the Difference</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {whyOurFaculty.map((item, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-bold text-blue-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
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

      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Explore More</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/neet-result-2025-gurugram" className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition text-center">
              <h3 className="font-semibold text-green-800">2025 Results</h3>
              <p className="text-sm text-gray-600">97% success rate this year</p>
            </Link>
            <Link href="/neet-topper-interview-gurugram" className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition text-center">
              <h3 className="font-semibold text-purple-800">Topper Interviews</h3>
              <p className="text-sm text-gray-600">Learn from 650+ scorers</p>
            </Link>
            <Link href="/free-neet-demo-class-gurugram" className="bg-amber-50 p-4 rounded-lg hover:bg-amber-100 transition text-center">
              <h3 className="font-semibold text-amber-800">Free Demo Class</h3>
              <p className="text-sm text-gray-600">Meet faculty before joining</p>
            </Link>
            <Link href="/neet-coaching-gurugram" className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition text-center">
              <h3 className="font-semibold text-blue-800">NEET Coaching</h3>
              <p className="text-sm text-gray-600">Complete program details</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Our Teaching Style</h2>
          <p className="text-xl text-blue-100 mb-8">Book a free demo class with any faculty member. No obligation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/free-neet-demo-class-gurugram" className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
              Book Free Demo<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy',
        description: 'NEET Biology coaching with AIIMS faculty',
        employee: faculty.map((f) => ({
          '@type': 'Person',
          name: f.name,
          jobTitle: f.title,
          hasCredential: f.qualification,
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      }) }} />
    </div>
  )
}
