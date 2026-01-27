import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Award, Users, GraduationCap, Star, ArrowRight, CheckCircle, Calendar, Trophy } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dr. Shekhar C Singh | AIIMS Alumni | Lead NEET Biology Faculty',
  description:
    'Meet Dr. Shekhar C Singh - AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy. 15+ years NEET coaching experience, 500+ AIIMS selections. Expert NEET Biology faculty.',
  keywords: [
    'dr shekhar singh',
    'aiims faculty neet',
    'best neet biology teacher',
    'cerebrum biology academy founder',
    'neet biology expert',
    'aiims alumni neet coaching',
  ],
  openGraph: {
    title: 'Dr. Shekhar C Singh | AIIMS Alumni | NEET Biology Expert',
    description: 'AIIMS New Delhi alumnus with 15+ years experience. 500+ AIIMS/medical college selections.',
    url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
  },
}

const credentials = [
  { label: 'Education', value: 'AIIMS New Delhi Alumnus', icon: GraduationCap },
  { label: 'Experience', value: '15+ Years NEET Coaching', icon: Calendar },
  { label: 'Students Mentored', value: '10,000+', icon: Users },
  { label: 'AIIMS/Top College Selections', value: '500+', icon: Trophy },
]

const achievements = [
  'Former Academic Head at Narayana Educational Institutions',
  'Trained 45+ students scoring 650+ in NEET',
  '15 students admitted to AIIMS Delhi alone',
  'Author of "NEET Biology Made Easy" study material',
  'Guest lecturer at medical colleges across Delhi NCR',
  'YouTube channel with 50,000+ subscribers',
  'Featured in Education Times and Career360',
  '98% consistent NEET qualification rate over 10 years',
]

const specializations = [
  { area: 'Human Physiology', description: 'In-depth clinical correlations from medical practice' },
  { area: 'Genetics & Evolution', description: 'Problem-solving approach for complex inheritance patterns' },
  { area: 'Plant Physiology', description: 'Visual mnemonics and flowcharts for easy recall' },
  { area: 'Biotechnology', description: 'Industry connections bring real-world applications to concepts' },
]

const teachingPhilosophy = [
  { title: 'Concept Over Cramming', description: 'Understanding why > memorizing what. Build mental models that last.' },
  { title: 'Clinical Correlations', description: 'Medical background allows connecting NEET concepts to real cases.' },
  { title: 'Small Batches Only', description: 'Max 20 students ensures everyone gets personal attention.' },
  { title: 'Adaptive Teaching', description: 'Identify and address each student\'s unique weak areas.' },
]

const testimonials = [
  {
    name: 'Ishita Malhotra',
    score: '702/720',
    college: 'AIIMS Delhi',
    quote: 'Dr. Singh\'s way of teaching physiology made it my strongest subject. His clinical examples are unforgettable.',
  },
  {
    name: 'Rohan Khanna',
    score: '688/720',
    college: 'MAMC Delhi',
    quote: 'The personal attention I received helped me improve from 520 in mock to 688 in actual NEET.',
  },
  {
    name: 'Kavya Reddy',
    score: '679/720',
    college: 'AIIMS Jodhpur',
    quote: 'As a dropper, I needed personalized guidance. Dr. Singh identified exactly where I was going wrong.',
  },
]

const faqs = [
  {
    question: 'What is Dr. Shekhar Singh\'s qualification?',
    answer: 'Dr. Shekhar C Singh is an alumnus of AIIMS New Delhi, India\'s premier medical institution. He has 15+ years of dedicated experience in NEET Biology coaching and previously served as Academic Head at Narayana Educational Institutions.',
  },
  {
    question: 'How many students has Dr. Singh trained for NEET?',
    answer: 'Dr. Singh has personally mentored over 10,000 students for NEET over his 15+ year career. Of these, 500+ have been selected to AIIMS and top government medical colleges. His consistent success rate is 98%.',
  },
  {
    question: 'Does Dr. Singh teach all batches personally?',
    answer: 'Yes, Dr. Singh personally teaches all Biology batches at Cerebrum Academy. For specialized topics, other expert faculty may contribute, but core Biology teaching is always by Dr. Singh himself.',
  },
  {
    question: 'Can I take a demo class with Dr. Singh?',
    answer: 'Yes! We offer free demo classes where you can experience Dr. Singh\'s teaching methodology. Book a demo through our website or call 88264-44334 to schedule.',
  },
]

export default function DrShekharSinghPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 text-center">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-6xl font-bold text-slate-900">
                  DS
                </div>
                <div className="mt-4 flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="ml-2">4.9/5</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  <Award className="w-4 h-4" />
                  AIIMS New Delhi Alumnus
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Dr. Shekhar C Singh</h1>
                <p className="text-xl text-slate-300 mb-2">Founder & Lead NEET Biology Faculty</p>
                <p className="text-slate-400 mb-6">Cerebrum Biology Academy, Gurugram</p>
                <div className="flex flex-wrap gap-4">
                  <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">
                    <Phone className="w-4 h-4" />Book Consultation
                  </a>
                  <Link href="/free-neet-demo-class-gurugram" className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/20 transition">
                    Free Demo Class
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {credentials.map((cred, index) => (
              <div key={index} className="text-center p-4 bg-slate-50 rounded-xl">
                <cred.icon className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                <p className="text-xl font-bold text-slate-800">{cred.value}</p>
                <p className="text-sm text-slate-600">{cred.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About Dr. Shekhar Singh</h2>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-4">
                Dr. Shekhar C Singh is one of India's most respected NEET Biology educators, with a track record that speaks through results.
                An alumnus of <strong>AIIMS New Delhi</strong> - India's most prestigious medical institution - Dr. Singh brings an unparalleled depth of understanding
                to NEET Biology that textbooks simply cannot provide.
              </p>
              <p className="mb-4">
                With <strong>15+ years of dedicated NEET coaching experience</strong>, Dr. Singh has personally mentored over 10,000 students,
                with 500+ gaining admission to AIIMS and top government medical colleges. His teaching methodology combines rigorous academic
                preparation with clinical insights from his medical background.
              </p>
              <p>
                Before founding Cerebrum Biology Academy, Dr. Singh served as <strong>Academic Head at Narayana Educational Institutions</strong>,
                where he led curriculum development and faculty training for NEET Biology across multiple centers. This experience shaped his
                belief that small, focused batches produce better results than mass coaching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Achievements & Recognition</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Areas of Expertise</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {specializations.map((spec, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-slate-800 mb-2">{spec.area}</h3>
                <p className="text-slate-600">{spec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Teaching Philosophy</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {teachingPhilosophy.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-lg text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Students Say</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-xl">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-green-600">{testimonial.score} | {testimonial.college}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-slate-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Learn Directly from Dr. Singh</h2>
          <p className="text-xl text-slate-300 mb-8">Experience the AIIMS difference in NEET Biology coaching</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/neet-coaching-gurugram" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition">
              View Programs<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Dr. Shekhar C Singh',
        jobTitle: 'Founder & Lead NEET Biology Faculty',
        description: 'AIIMS New Delhi alumnus with 15+ years of NEET Biology coaching experience. Founder of Cerebrum Biology Academy.',
        image: 'https://cerebrumbiologyacademy.com/faculty/dr-shekhar-singh.jpg',
        url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
        email: 'drshekhar@cerebrumbiologyacademy.com',
        telephone: '+918826444334',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
        },
        worksFor: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
          url: 'https://cerebrumbiologyacademy.com',
        },
        knowsAbout: [
          'NEET Biology',
          'Human Physiology',
          'Genetics and Evolution',
          'Plant Physiology',
          'Biotechnology',
          'NEET-UG Preparation',
        ],
        award: [
          'Best Biology Teacher Award 2022 - Education Excellence Foundation',
          'NEET Educator of the Year 2023',
        ],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'AIIMS New Delhi Alumnus',
            description: 'Medical degree from India\'s premier medical institution',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: '500+ Medical College Selections',
            description: 'Students mentored to AIIMS and top government medical colleges',
          },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer }
        })),
      }) }} />
    </div>
  )
}
