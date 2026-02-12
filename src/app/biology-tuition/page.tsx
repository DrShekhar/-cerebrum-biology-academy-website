import { Metadata } from 'next'
import Link from 'next/link'
import {
  MapPin,
  GraduationCap,
  Users,
  Star,
  Clock,
  Award,
  BookOpen,
  Phone,
  ArrowRight,
  CheckCircle,
  Play,
  Monitor,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Biology Tuition | Best NEET & Board Biology Classes | Cerebrum Academy',
  description:
    'Looking for biology tuition? Cerebrum Biology Academy offers expert biology coaching for Class 9, 10, 11, 12, NEET & Board exams. AIIMS faculty, 98% success rate. Offline classes in Delhi NCR + Online across India.',
  keywords: [
    'biology tuition',
    'biology coaching',
    'biology classes',
    'NEET biology tuition',
    'biology tuition near me',
    'biology tutor',
    'biology coaching classes',
    'best biology tuition',
    'biology tuition for class 11',
    'biology tuition for class 12',
    'biology tuition for NEET',
    'online biology tuition',
    'biology tuition Delhi',
    'biology tuition fees',
  ],
  openGraph: {
    title: 'Biology Tuition | Best NEET & Board Biology Classes | Cerebrum Academy',
    description:
      'Expert biology tuition for Class 9-12, NEET & Board exams. AIIMS faculty, small batches, 98% success rate. Offline in Delhi NCR + Online pan-India.',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition',
    type: 'website',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/api/og?title=Best+Biology+Tuition&subtitle=Expert+Faculty+%E2%80%A2+98%25+Success+Rate',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy - Best Biology Tuition',
      },
    ],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition',
  },
}

const stats = [
  { icon: Users, value: '5,000+', label: 'Students Taught' },
  { icon: Star, value: '98%', label: 'Success Rate' },
  { icon: Award, value: '500+', label: 'Medical Selections' },
  { icon: Clock, value: '10+', label: 'Years Experience' },
]

const tuitionByClass = [
  {
    title: 'Class 9-10 Biology Tuition',
    slug: '/biology-tuition-class-9-10',
    description:
      'Foundation building for NEET aspirants. Strong conceptual clarity from early years.',
    highlights: ['NCERT-focused curriculum', 'Foundation for NEET', 'Board exam preparation'],
    icon: BookOpen,
    color: 'bg-green-600',
  },
  {
    title: 'Class 11 Biology Tuition',
    slug: '/biology-tuition-class-11',
    description: 'Comprehensive coverage of Class 11 Biology with NEET orientation.',
    highlights: ['Complete NCERT coverage', 'NEET-level practice', 'Weekly assessments'],
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Class 12 Biology Tuition',
    slug: '/biology-tuition-class-12',
    description: 'Intensive preparation for Board exams and NEET simultaneously.',
    highlights: ['Board + NEET preparation', 'Previous year analysis', 'Crash courses available'],
    icon: Award,
    color: 'from-purple-500 to-purple-600',
  },
]

const tuitionByLocation = [
  { name: 'Delhi', slug: '/biology-classes-delhi', students: '2,000+' },
  { name: 'Noida', slug: '/biology-classes-noida', students: '800+' },
  { name: 'Gurgaon', slug: '/biology-classes-gurgaon', students: '600+' },
  { name: 'Faridabad', slug: '/biology-classes-faridabad', students: '400+' },
  { name: 'Ghaziabad', slug: '/biology-classes-ghaziabad', students: '350+' },
  { name: 'South Delhi', slug: '/biology-classes-south-delhi', students: '500+' },
  { name: 'Rohini', slug: '/biology-classes-rohini', students: '450+' },
]

const tuitionModes = [
  {
    title: 'Offline Biology Tuition',
    slug: '/biology-tuition-near-me',
    description: 'In-person classes at our centers in Delhi NCR with direct faculty interaction.',
    icon: Building2,
    features: ['Face-to-face teaching', 'Lab practicals', 'Peer learning', 'Doubt sessions'],
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    title: 'Online Biology Tuition',
    slug: '/online-biology-classes',
    description: 'Live interactive classes accessible from anywhere in India.',
    icon: Monitor,
    features: ['Live classes', 'Recording access', 'Digital study material', 'Pan-India reach'],
    color: 'from-orange-500 to-orange-600',
  },
]

const features = [
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from doctors who cracked NEET with top ranks',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Maximum 15 students per batch for personal attention',
  },
  {
    icon: BookOpen,
    title: 'NCERT Focus',
    description: '100% NCERT-based curriculum aligned with NEET syllabus',
  },
  {
    icon: Award,
    title: '98% Success Rate',
    description: 'Proven track record of NEET selections and Board toppers',
  },
]

const faqs = [
  {
    question: 'What is the fee structure for biology tuition at Cerebrum Academy?',
    answer:
      'Our biology tuition fees range from ₹36,000 to ₹1,56,000 per year depending on the course tier. We offer three tiers: Pursuit (budget-friendly), Ascent (most popular), and Pinnacle (premium with extra features). EMI options are available. Contact us for detailed fee structure.',
  },
  {
    question: 'Which classes do you offer biology tuition for?',
    answer:
      'We offer biology tuition for Class 9, 10, 11, 12, and NEET droppers. Each course is designed specifically for the class level with age-appropriate teaching methods and NEET-oriented preparation starting from Class 9.',
  },
  {
    question: 'Do you provide both online and offline biology tuition?',
    answer:
      'Yes! We offer both offline classes at our centers in Delhi NCR (Gurugram, South Extension, Rohini) and live online classes accessible from anywhere in India. Both modes have the same curriculum and faculty.',
  },
  {
    question: 'What makes Cerebrum Academy different from other biology tuition centers?',
    answer:
      'We have AIIMS-qualified faculty who themselves scored 650+ in NEET, small batch sizes of max 15 students, 100% NCERT-focused curriculum, weekly tests with detailed analysis, and a 98% success rate in NEET selections.',
  },
  {
    question: 'Is there a free demo class available?',
    answer:
      'Yes! We offer a completely FREE demo class for all courses. You can experience our teaching methodology before enrolling. Book your free demo at cerebrumbiologyacademy.com/demo-booking or call +91-88264-44334.',
  },
  {
    question: 'What study materials are provided with biology tuition?',
    answer:
      'Students receive comprehensive study materials including NCERT-based notes, topic-wise question banks, previous year NEET papers with solutions, chapter-wise tests, and access to our online learning portal with video lectures.',
  },
  {
    question: 'How do you ensure personalized attention in biology tuition?',
    answer:
      'We maintain a strict batch size of maximum 15 students, conduct weekly one-on-one doubt sessions, provide personalized performance reports, and have dedicated mentors for each student to track their progress.',
  },
  {
    question: 'Do you offer biology tuition for Board exams only?',
    answer:
      'Our biology tuition is designed for both Board exams and NEET preparation. The curriculum covers all Board exam topics while also preparing students for competitive exams. We offer integrated courses that handle both simultaneously.',
  },
]

const centers = [
  {
    name: 'Gurugram Center',
    address: 'M2K Corporate Park, Sector 51, Gurugram',
    areas: ['Sector 50', 'Sector 51', 'Sector 52', 'Golf Course Extension', 'Nirvana Country'],
  },
  {
    name: 'South Extension Center',
    address: 'Block D, South Extension 2, New Delhi',
    areas: ['GK', 'Lajpat Nagar', 'Defence Colony', 'Kailash Colony', 'Nehru Place'],
  },
  {
    name: 'Rohini Center',
    address: '211 Vikas Surya Tower, DC Chauk, Rohini, New Delhi',
    areas: ['Rohini', 'Pitampura', 'Shalimar Bagh', 'Model Town', 'Ashok Vihar'],
  },
]

export default function BiologyTuitionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <nav className="text-sm mb-6 opacity-80">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Biology Tuition</span>
            </nav>

            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-5 h-5 mr-2 text-yellow-300" />
              Delhi NCR's #1 Biology Coaching Institute
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Biology <span className="text-yellow-300">Tuition</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-4xl mx-auto">
              Expert biology tuition for Class 9, 10, 11, 12, and NEET aspirants. Learn from AIIMS
              faculty with 98% success rate. Offline classes in Delhi NCR + Online across India.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-indigo-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tuition by Class */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biology Tuition by Class
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the right biology tuition program based on your current class
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tuitionByClass.map((course) => (
              <Link href={course.slug} key={course.slug} className="group">
                <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow h-full">
                  <div className={`bg-gradient-to-r ${course.color} text-white p-6`}>
                    <course.icon className="w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold">{course.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <ul className="space-y-2 mb-6">
                      {course.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-indigo-600 font-semibold group-hover:underline">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tuition Modes */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Mode
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Both offline and online biology tuition with the same quality and faculty
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tuitionModes.map((mode) => (
              <Link href={mode.slug} key={mode.slug} className="group">
                <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow h-full">
                  <div className={`bg-gradient-to-r ${mode.color} text-white p-6`}>
                    <mode.icon className="w-10 h-10 mb-4" />
                    <h3 className="text-2xl font-bold">{mode.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">{mode.description}</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {mode.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center text-indigo-600 font-semibold group-hover:underline">
                      Explore {mode.title} <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tuition by Location */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biology Tuition by Location
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find biology tuition near you in Delhi NCR
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tuitionByLocation.map((location) => (
              <Link href={location.slug} key={location.slug} className="group">
                <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow hover:bg-indigo-50">
                  <MapPin className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 group-hover:text-indigo-600">
                    {location.name}
                  </h3>
                  <p className="text-sm text-gray-500">{location.students} students</p>
                </div>
              </Link>
            ))}
            <Link href="/biology-tuition-near-me" className="group">
              <div className="bg-indigo-600 rounded-xl p-6 text-center hover:bg-indigo-700 transition-colors text-white">
                <MapPin className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold">All Locations</h3>
                <p className="text-sm opacity-80">Find Near You</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Cerebrum for Biology Tuition?
            </h2>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              What makes us Delhi NCR's most trusted biology coaching institute
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-yellow-300" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Centers */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Biology Tuition Centers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Three convenient locations across Delhi NCR for offline biology tuition
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {centers.map((center) => (
              <div key={center.name} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start mb-4">
                  <MapPin className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900">{center.name}</h3>
                    <p className="text-gray-600 text-sm">{center.address}</p>
                  </div>
                </div>
                <div className="ml-9">
                  <p className="text-xs text-gray-500 mb-2">Serving areas:</p>
                  <div className="flex flex-wrap gap-2">
                    {center.areas.map((area) => (
                      <span
                        key={area}
                        className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">Common questions about our biology tuition</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Biology Tuition?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book a FREE demo class and experience why 1,50,000+ students trust us for their biology
            preparation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo Class
              </Button>
            </Link>

            <a href="tel:+918826444334">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-indigo-700"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: +91 88264 44334
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy',
            description:
              'Expert biology tuition for Class 9-12 and NEET preparation. AIIMS faculty, small batches, 98% success rate.',
            url: 'https://cerebrumbiologyacademy.com/biology-tuition',
            telephone: '+918826444334',
            email: 'info@cerebrumbiologyacademy.com',
            address: [
              {
                '@type': 'PostalAddress',
                streetAddress: 'M2K Corporate Park, Sector 51',
                addressLocality: 'Gurugram',
                addressRegion: 'Haryana',
                postalCode: '122018',
                addressCountry: 'IN',
              },
              {
                '@type': 'PostalAddress',
                streetAddress: 'Block D, South Extension 2',
                addressLocality: 'New Delhi',
                addressRegion: 'Delhi',
                postalCode: '110049',
                addressCountry: 'IN',
              },
              {
                '@type': 'PostalAddress',
                streetAddress: '211 Vikas Surya Tower, DC Chauk, Rohini',
                addressLocality: 'New Delhi',
                addressRegion: 'Delhi',
                postalCode: '110085',
                addressCountry: 'IN',
              },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '500',
              bestRating: '5',
              worstRating: '1',
            },
            sameAs: [
              'https://www.facebook.com/cerebrumbiologyacademy',
              'https://www.instagram.com/cerebrumbiologyacademy',
              'https://www.youtube.com/@cerebrumbiologyacademy',
              'https://www.youtube.com/@drshekharcsingh',
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Biology Tuition Courses',
            itemListElement: [
              {
                '@type': 'Course',
                position: 1,
                name: 'Class 9-10 Biology Tuition',
                description: 'Foundation biology course for Class 9-10 students preparing for NEET',
                provider: {
                  '@type': 'Organization',
                  name: 'Cerebrum Biology Academy',
                },
                url: 'https://cerebrumbiologyacademy.com/biology-tuition-class-9-10',
              },
              {
                '@type': 'Course',
                position: 2,
                name: 'Class 11 Biology Tuition',
                description: 'Comprehensive Class 11 Biology course with NEET preparation',
                provider: {
                  '@type': 'Organization',
                  name: 'Cerebrum Biology Academy',
                },
                url: 'https://cerebrumbiologyacademy.com/biology-tuition-class-11',
              },
              {
                '@type': 'Course',
                position: 3,
                name: 'Class 12 Biology Tuition',
                description: 'Intensive Class 12 Biology course for Board and NEET preparation',
                provider: {
                  '@type': 'Organization',
                  name: 'Cerebrum Biology Academy',
                },
                url: 'https://cerebrumbiologyacademy.com/biology-tuition-class-12',
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
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

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
                name: 'Biology Tuition',
                item: 'https://cerebrumbiologyacademy.com/biology-tuition',
              },
            ],
          }),
        }}
      />
    </div>
  )
}
