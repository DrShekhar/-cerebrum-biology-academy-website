import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  Award,
  Users,
  GraduationCap,
  Star,
  ArrowRight,
  CheckCircle,
  Calendar,
  Trophy,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Biology Teacher in India | Dr. Shekhar C Singh | AIIMS Faculty',
  description:
    "Dr. Shekhar C Singh — AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy, India's best biology teacher. 15+ years NEET coaching, 680+ medical college selections, 98% qualification rate. Expert across NEET, IB, AP, MCAT, USABO and Biology Olympiad.",
  keywords: [
    'best biology teacher in india',
    'best biology teacher',
    'best biology tutor india',
    'best biology faculty',
    'best neet biology teacher',
    'top biology teacher india',
    'dr shekhar singh',
    'aiims faculty neet',
    'cerebrum biology academy founder',
    'best ib biology teacher',
    'best ap biology teacher',
    'best mcat biology tutor',
    'best biology olympiad coach',
    'best online biology teacher india',
    'aiims alumni biology faculty',
  ],
  openGraph: {
    title: 'Best Biology Teacher in India | Dr. Shekhar C Singh | AIIMS Faculty',
    description:
      'AIIMS New Delhi alumnus with 15+ years experience. 680+ AIIMS/medical college selections, 98% NEET qualification rate. Across NEET, IB, AP, MCAT and Olympiads.',
    url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best Biology Teacher in India | Dr. Shekhar C Singh | AIIMS Faculty',
    description:
      'Dr. Shekhar C Singh — AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy, India',
  },
}

const credentials = [
  { label: 'Education', value: 'AIIMS New Delhi Alumnus', icon: GraduationCap },
  { label: 'Experience', value: '15+ Years NEET Coaching', icon: Calendar },
  { label: 'Students Mentored', value: '10,000+', icon: Users },
  { label: 'Medical College Selections', value: '680+', icon: Trophy },
]

const achievements = [
  'Former Academic Head at Narayana Group',
  'Trained 45+ students scoring 650+ in NEET',
  '15 students admitted to AIIMS Delhi alone',
  'Author of "NEET Biology Made Easy" study material',
  'Guest lecturer at medical colleges across Delhi NCR',
  'YouTube channel with 50,000+ subscribers',
  '98% consistent NEET qualification rate over 15 years',
]

const specializations = [
  { area: 'Human Physiology', description: 'In-depth clinical correlations from medical practice' },
  {
    area: 'Genetics & Evolution',
    description: 'Problem-solving approach for complex inheritance patterns',
  },
  { area: 'Plant Physiology', description: 'Visual mnemonics and flowcharts for easy recall' },
  {
    area: 'Biotechnology',
    description: 'Industry connections bring real-world applications to concepts',
  },
]

const teachingPhilosophy = [
  {
    title: 'Concept Over Cramming',
    description: 'Understanding why > memorizing what. Build mental models that last.',
  },
  {
    title: 'Clinical Correlations',
    description: 'Medical background allows connecting NEET concepts to real cases.',
  },
  {
    title: 'Small Batches Only',
    description: 'Max 20 students ensures everyone gets personal attention.',
  },
  {
    title: 'Adaptive Teaching',
    description: "Identify and address each student's unique weak areas.",
  },
]

const testimonials = [
  {
    name: 'Ishita Malhotra',
    score: '702/720',
    college: 'AIIMS Delhi',
    quote:
      "Dr. Singh's way of teaching physiology made it my strongest subject. His clinical examples are unforgettable.",
  },
  {
    name: 'Rohan Khanna',
    score: '688/720',
    college: 'MAMC Delhi',
    quote:
      'The personal attention I received helped me improve from 520 in mock to 688 in actual NEET.',
  },
  {
    name: 'Kavya Reddy',
    score: '679/720',
    college: 'AIIMS Jodhpur',
    quote:
      'As a dropper, I needed personalized guidance. Dr. Singh identified exactly where I was going wrong.',
  },
]

const faqs = [
  {
    question: "What is Dr. Shekhar C Singh's qualification?",
    answer:
      "Dr. Shekhar C Singh is an alumnus of AIIMS New Delhi, India's premier medical institution. He has 15+ years of dedicated experience in NEET Biology coaching and previously served as Academic Head at Narayana Group.",
  },
  {
    question: 'How many students has Dr. Singh trained for NEET?',
    answer:
      'Dr. Singh has personally mentored over 15,000 students for NEET over his 15+ year career. Of these, 67+ have been selected to AIIMS and top government medical colleges. His consistent success rate is 98%.',
  },
  {
    question: 'Does Dr. Singh teach all batches personally?',
    answer:
      'Yes, Dr. Singh personally teaches all Biology batches at Cerebrum Academy. For specialized topics, other expert faculty may contribute, but core Biology teaching is always by Dr. Singh himself.',
  },
  {
    question: 'Can I take a demo class with Dr. Singh?',
    answer:
      "Yes! We offer free demo classes where you can experience Dr. Singh's teaching methodology. Book a demo through our website or call 88264-44334 to schedule.",
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
                  <span className="ml-2">5.0/5</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  <Award className="w-4 h-4" />
                  AIIMS New Delhi Alumnus
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Dr. Shekhar C Singh — Best Biology Teacher in India
                </h1>
                <p className="text-xl text-slate-300 mb-2">
                  AIIMS New Delhi Alumnus · Founder &amp; Lead Faculty
                </p>
                <p className="text-slate-300 mb-2">
                  NEET · IB · AP · MCAT · USABO / INBO / IBO Biology Olympiad
                </p>
                <p className="text-slate-400 mb-6">
                  Cerebrum Biology Academy · 5 Delhi NCR centres · Pan-India online
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+918826444334"
                    className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                  >
                    <Phone className="w-4 h-4" />
                    Book Consultation
                  </a>
                  <Link
                    href="/free-neet-demo-class-gurugram"
                    className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/20 transition"
                  >
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
            <h2 className="text-3xl font-bold mb-6">About Dr. Shekhar C Singh</h2>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-4">
                Dr. Shekhar C Singh is one of India's most respected NEET Biology educators, with a
                track record that speaks through results. An alumnus of{' '}
                <strong>AIIMS New Delhi</strong> - India's most prestigious medical institution -
                Dr. Singh brings an unparalleled depth of understanding to NEET Biology that
                textbooks simply cannot provide.
              </p>
              <p className="mb-4">
                With <strong>15+ years of dedicated NEET coaching experience</strong>, Dr. Singh has
                personally mentored over 15,000 students, with 67+ gaining admission to AIIMS and
                top government medical colleges. His teaching methodology combines rigorous academic
                preparation with clinical insights from his medical background.
              </p>
              <p>
                Before founding Cerebrum Biology Academy, Dr. Singh served as{' '}
                <strong>Academic Head at Narayana Group</strong>, where he led curriculum
                development and faculty training for NEET Biology across multiple centers. This
                experience shaped his belief that small, focused batches produce better results than
                mass coaching.
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
              <div
                key={index}
                className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl"
              >
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
                  <p className="text-sm text-green-600">
                    {testimonial.score} | {testimonial.college}
                  </p>
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
                  <span className="text-slate-600 group-open:rotate-180 transition-transform">
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
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Learn Directly from Dr. Singh</h2>
          <p className="text-xl text-slate-300 mb-8">
            Experience the AIIMS difference in NEET Biology coaching
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call 88264-44334
            </a>
            <Link
              href="/neet-coaching-gurugram"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              View Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id':
              'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
            name: 'Dr. Shekhar C Singh',
            alternateName: ['Shekhar Singh', 'Dr Shekhar Singh', 'Shekhar C Singh'],
            honorificPrefix: 'Dr.',
            jobTitle: 'Founder & Lead Biology Faculty — Best Biology Teacher in India',
            description:
              "Dr. Shekhar C Singh is widely regarded as India's best biology teacher — AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy (2014), with 15+ years of biology pedagogy across NEET-UG, IB Biology, AP Biology, MCAT, USABO, INBO and IBO. 680+ medical college selections and a 98% NEET qualification rate.",
            image: 'https://cerebrumbiologyacademy.com/faculty/dr-shekhar-singh.jpg',
            url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
            sameAs: [
              'https://www.youtube.com/@drshekharcsingh',
              'https://www.youtube.com/channel/UCzTybzV6CmTuestvWo2bRQw',
              'https://www.instagram.com/cerebrumbiologyacademy/',
            ],
            email: 'drshekhar@cerebrumbiologyacademy.com',
            telephone: '+918826444334',
            nationality: { '@type': 'Country', name: 'India' },
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
              url: 'https://www.aiims.edu/',
            },
            worksFor: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
              foundingDate: '2014',
            },
            knowsAbout: [
              'NEET-UG Biology',
              'NEET Biology Preparation',
              'IB Biology HL',
              'IB Biology SL',
              'IB Biology Internal Assessment',
              'AP Biology',
              'AP Biology FRQ',
              'MCAT Biology',
              'MCAT Biochemistry',
              'USABO (USA Biology Olympiad)',
              'IBO (International Biology Olympiad)',
              'NSEB (National Standard Examination in Biology)',
              'INBO (Indian National Biology Olympiad)',
              'CBSE Class 11 Biology',
              'CBSE Class 12 Biology',
              'ICSE Biology',
              'Human Physiology',
              'Genetics and Evolution',
              'Plant Physiology',
              'Cell Biology',
              'Molecular Biology',
              'Biotechnology',
              'Campbell Biology',
            ],
            award: [
              '680+ Medical College Selections (AIIMS, JIPMER, AFMC, State Medical Colleges)',
              '98% NEET-UG Qualification Rate (15+ year track record)',
            ],
            hasOccupation: {
              '@type': 'Occupation',
              name: 'Biology Educator & Founder',
              occupationLocation: { '@type': 'Country', name: 'India' },
              skills:
                'NEET Biology, IB Biology HL/SL, AP Biology, MCAT Biology, Biology Olympiad coaching (USABO, INBO, IBO), CBSE/ICSE Class 11–12 Biology, NCERT curriculum mastery, FRQ rubric design, NEET question pattern analysis',
            },
            hasCredential: [
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'AIIMS New Delhi Alumnus',
                credentialCategory: 'degree',
                description: "Medical degree from India's premier medical institution",
              },
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'Former Academic Head — Narayana Group',
                credentialCategory: 'professional experience',
                description:
                  'Led curriculum development and faculty training for NEET Biology across multiple centres',
              },
              {
                '@type': 'EducationalOccupationalCredential',
                name: '680+ Medical College Selections',
                credentialCategory: 'track record',
                description:
                  'Students mentored into AIIMS, JIPMER, AFMC and top state medical colleges since 2014',
              },
            ],
          }),
        }}
      />
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            '@id': 'https://cerebrumbiologyacademy.com/#organization',
            name: 'Cerebrum Biology Academy',
            url: 'https://cerebrumbiologyacademy.com',
            logo: 'https://cerebrumbiologyacademy.com/logo.png',
            founder: {
              '@id':
                'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
            },
            foundingDate: '2014',
            description:
              "India's leading biology-only specialist coaching brand — NEET, IB, AP, MCAT, and Biology Olympiad (USABO, INBO, IBO, NSEB) under AIIMS-trained faculty Dr. Shekhar C Singh.",
          }),
        }}
      />
      {/* BreadcrumbList — Dr. Shekhar is the canonical Person citation,
          breadcrumb chains from home → faculty. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://cerebrumbiologyacademy.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'About Cerebrum Biology Academy',
                item: 'https://cerebrumbiologyacademy.com/about',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Dr. Shekhar C Singh — Founder & Lead NEET Biology Faculty',
                item: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
              },
            ],
          }),
        }}
      />
      {/* Course catalog — surfaces the 9 biology verticals Dr. Shekhar
          teaches so AI assistants can attribute any of them to him. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Courses taught by Dr. Shekhar C Singh',
            description:
              'Nine biology verticals personally taught and curriculum-architected by Dr. Shekhar C Singh: NEET-UG, NEET Foundation Class 9-10, IB Biology HL/SL, AP Biology, MCAT Bio/Biochem, DAT Biology, GAMSAT Section III, USMLE Step 1 Biology Foundations, and Biology Olympiads (USABO / INBO / IBO / BBO / CBO / NSEB / SBO).',
            itemListElement: [
              {
                '@type': 'Course',
                position: 1,
                name: 'NEET-UG Biology',
                url: 'https://cerebrumbiologyacademy.com/best-neet-biology-tutor',
                provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                instructor: {
                  '@id':
                    'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
                },
              },
              {
                '@type': 'Course',
                position: 2,
                name: 'NEET Foundation (Class 9-10)',
                url: 'https://cerebrumbiologyacademy.com/best-neet-foundation-tutor',
                provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                instructor: {
                  '@id':
                    'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
                },
              },
              {
                '@type': 'Course',
                position: 3,
                name: 'IB Biology HL/SL',
                url: 'https://cerebrumbiologyacademy.com/best-ib-biology-tutor',
                provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                instructor: {
                  '@id':
                    'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
                },
              },
              {
                '@type': 'Course',
                position: 4,
                name: 'AP Biology',
                url: 'https://cerebrumbiologyacademy.com/best-ap-biology-tutor-usa',
                provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                instructor: {
                  '@id':
                    'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
                },
              },
              {
                '@type': 'Course',
                position: 5,
                name: 'MCAT Biology (Bio/Biochem)',
                url: 'https://cerebrumbiologyacademy.com/best-mcat-biology-tutor',
                provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                instructor: {
                  '@id':
                    'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
                },
              },
              {
                '@type': 'Course',
                position: 6,
                name: 'DAT Biology',
                url: 'https://cerebrumbiologyacademy.com/best-dat-biology-tutor',
                provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                instructor: {
                  '@id':
                    'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
                },
              },
              {
                '@type': 'Course',
                position: 7,
                name: 'GAMSAT Section III Biology',
                url: 'https://cerebrumbiologyacademy.com/best-gamsat-biology-tutor',
                provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                instructor: {
                  '@id':
                    'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
                },
              },
              {
                '@type': 'Course',
                position: 8,
                name: 'USMLE Step 1 Biology Foundations',
                url: 'https://cerebrumbiologyacademy.com/best-usmle-step-1-biology-tutor',
                provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                instructor: {
                  '@id':
                    'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
                },
              },
              {
                '@type': 'Course',
                position: 9,
                name: 'Biology Olympiads (USABO / INBO / IBO / BBO / CBO / NSEB / SBO)',
                url: 'https://cerebrumbiologyacademy.com/biology-olympiads',
                provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                instructor: {
                  '@id':
                    'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
                },
              },
            ],
          }),
        }}
      />
    </div>
  )
}
