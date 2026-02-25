import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  Clock,
  BookOpen,
  GraduationCap,
  Video,
  MessageCircle,
  Building,
  ArrowRight,
  Target,
  Award,
  Microscope,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Biology Classes in Delhi | Best NEET Biology Coaching',
  description:
    'Join the best biology classes in Delhi with AIIMS-trained faculty. 4 centers in Rohini, South Extension, Gurugram & Faridabad. 98% success rate, 15000+ students. Book free demo!',
  keywords: [
    'biology classes in delhi',
    'biology coaching delhi',
    'neet biology classes delhi',
    'best biology tuition delhi',
    'biology classes near me delhi',
    'class 11 biology coaching delhi',
    'class 12 biology tuition delhi',
    'neet coaching delhi',
    'biology teacher delhi',
    'biology institute delhi',
  ],
  openGraph: {
    title: 'Best Biology Classes in Delhi | NEET & Board Preparation',
    description:
      'Top-rated biology coaching in Delhi NCR. AIIMS faculty, 98% success rate. Centers in Rohini, South Delhi, Gurugram.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-delhi',
    images: ['/og/biology-classes-delhi.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-delhi',
  },
}

const centers = [
  {
    id: 'rohini',
    name: 'Rohini Center',
    address: '211 Vikas Surya Tower, DC Chauk, Sector 9, Rohini, Delhi 110085',
    areas: ['Rohini', 'Pitampura', 'Shalimar Bagh', 'Model Town', 'Ashok Vihar', 'Prashant Vihar'],
    metro: 'DC Chauk Metro Station (Red Line)',
    timings: 'Open 24/7',
    mapUrl: 'https://maps.google.com/?q=28.7143,77.1117',
    image: '/locations/rohini-center.jpg',
  },
  {
    id: 'south-extension',
    name: 'South Delhi Center',
    address: 'D 35, South Extension Part 2, New Delhi 110049',
    areas: ['South Extension', 'GK', 'Lajpat Nagar', 'Defence Colony', 'Hauz Khas', 'Saket'],
    metro: 'AIIMS Metro Station (Yellow Line)',
    timings: 'Open 24/7',
    mapUrl: 'https://maps.google.com/?q=28.5725,77.2217',
    image: '/locations/south-extension-center.jpg',
  },
  {
    id: 'gurugram',
    name: 'Gurugram Center',
    address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
    areas: ['Sector 51', 'Sector 56', 'Golf Course Road', 'Sohna Road', 'DLF Phase 4-5'],
    metro: 'HUDA City Centre Metro (Yellow Line)',
    timings: 'Open 24/7',
    mapUrl: 'https://maps.google.com/?q=28.4153,77.0499',
    image: '/locations/gurugram-center.jpg',
  },
]

const courses = [
  {
    name: 'Class 9-10 Foundation',
    description: 'Build strong biology foundation for future NEET preparation',
    duration: '1 Year',
    features: ['NCERT Mastery', 'Concept Building', 'Basic Lab Skills'],
  },
  {
    name: 'Class 11 NEET Foundation',
    description: '60% of NEET syllabus covered with NCERT focus',
    duration: '1 Year',
    features: ['Complete Class 11 NCERT', 'NEET Pattern Practice', 'Weekly Tests'],
  },
  {
    name: 'Class 12 NEET + Boards',
    description: 'Dual preparation for boards and NEET entrance',
    duration: '1 Year',
    features: ['Board + NEET Focus', 'Previous Year Analysis', 'Mock Tests'],
  },
  {
    name: 'NEET Dropper Batch',
    description: 'Intensive 1-year program for NEET repeaters',
    duration: '1 Year',
    features: ['Complete Revision', 'Daily Practice', '100+ Mock Tests'],
  },
]

const localities = [
  { name: 'Rohini', url: '/biology-classes-delhi/rohini' },
  { name: 'Dwarka', url: '/biology-classes-delhi/dwarka' },
  { name: 'South Delhi', url: '/biology-tuition-south-delhi' },
  { name: 'Pitampura', url: '/biology-classes-delhi/pitampura' },
  { name: 'Janakpuri', url: '/biology-classes-delhi/janakpuri' },
  { name: 'Laxmi Nagar', url: '/biology-classes-delhi/laxmi-nagar' },
  { name: 'Preet Vihar', url: '/biology-classes-delhi/preet-vihar' },
  { name: 'Model Town', url: '/biology-classes-delhi/model-town' },
  { name: 'Karol Bagh', url: '/biology-classes-delhi/karol-bagh' },
  { name: 'Rajouri Garden', url: '/biology-classes-delhi/rajouri-garden' },
]

const faqs = [
  {
    question: 'Which is the best biology coaching in Delhi for NEET?',
    answer:
      'Cerebrum Biology Academy is rated as one of the best biology coaching institutes in Delhi with 98% success rate. Our AIIMS-trained faculty, small batch sizes (15-20 students), comprehensive study material, and personalized attention make us the top choice for NEET aspirants. We have 4 centers in Delhi NCR - Rohini, South Extension, Gurugram, and Faridabad.',
  },
  {
    question: 'What is the fee for biology classes in Delhi?',
    answer:
      'Our biology coaching fees in Delhi range from ₹45,000 to ₹75,000 per year depending on the course (Class 11, Class 12, or Dropper batch). This includes live classes, study material, test series, doubt sessions, and recorded lecture access. EMI options are available.',
  },
  {
    question: 'Do you offer biology classes for Class 11 and 12 in Delhi?',
    answer:
      'Yes, we offer specialized biology classes for Class 11 and Class 12 students in Delhi. Class 11 covers foundation topics crucial for NEET (60% weightage), while Class 12 focuses on boards + NEET preparation. Both courses are NCERT-focused with NEET pattern practice.',
  },
  {
    question: 'Where are your biology coaching centers located in Delhi?',
    answer:
      'We have 3 biology coaching centers in Delhi NCR: 1) Rohini - 211 Vikas Surya Tower, DC Chauk (near DC Chauk Metro), 2) South Delhi - D 35, South Extension Part 2 (near AIIMS Metro), 3) Gurugram - M2K Corporate Park, Sector 51. All centers are easily accessible by metro.',
  },
  {
    question: 'What makes Cerebrum different from other biology coaching in Delhi?',
    answer:
      'Cerebrum stands out due to: 1) AIIMS-trained founder Dr. Shekhar Singh, 2) Small batch sizes of 15-20 students, 3) 98% success rate in NEET, 4) Hybrid learning option (online + offline), 5) 24/7 doubt resolution via WhatsApp, 6) Free demo class before enrollment.',
  },
  {
    question: 'Is there online option if I cannot attend offline classes in Delhi?',
    answer:
      'Yes! We offer live interactive online biology classes for students who cannot attend our Delhi centers. Online classes have the same faculty, curriculum, and study material. Plus, you get recorded lectures for unlimited revision. Many Delhi students opt for hybrid mode - attending offline when possible and online otherwise.',
  },
  {
    question: 'How can I book a free demo class in Delhi?',
    answer:
      'You can book a free demo biology class at any of our Delhi centers by: 1) Calling +91-8826444334, 2) Filling the form on our website, or 3) Visiting any center directly. Demo classes are held every Saturday and Sunday. No registration fee for demo.',
  },
  {
    question: 'Do you provide biology classes for board exams in Delhi?',
    answer:
      'Yes, our Class 12 biology course is designed for both CBSE Board exams and NEET. We follow NCERT thoroughly which is essential for boards. Students typically score 90%+ in board exams while preparing for NEET with us.',
  },
]

const stats = [
  { value: '1,50,000+', label: 'Students Trained', icon: Users },
  { value: '98%', label: 'Success Rate', icon: Trophy },
  { value: '3', label: 'Centers in Delhi NCR', icon: Building },
  { value: '4.9/5', label: 'Student Rating', icon: Star },
]

const whyChooseUs = [
  {
    icon: GraduationCap,
    title: 'AIIMS-Trained Faculty',
    description: 'Learn from Dr. Shekhar C Singh, AIIMS alumnus with 15+ years teaching experience',
  },
  {
    icon: Users,
    title: 'Small Batch Size',
    description: 'Only 15-20 students per batch ensuring personalized attention',
  },
  {
    icon: Target,
    title: '98% Success Rate',
    description: 'Proven track record with thousands of successful NEET qualifiers',
  },
  {
    icon: Video,
    title: 'Hybrid Learning',
    description: 'Flexibility to attend online or offline as per your convenience',
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Support',
    description: 'Get your doubts resolved anytime via WhatsApp and dedicated sessions',
  },
  {
    icon: BookOpen,
    title: 'NCERT-Focused Material',
    description: 'Comprehensive study material aligned with NCERT and NEET pattern',
  },
]

export default function BiologyClassesDelhiPage() {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${baseUrl}/biology-classes-delhi#organization`,
    name: 'Cerebrum Biology Academy - Delhi',
    description:
      'Best biology classes in Delhi for NEET & Board preparation. AIIMS-trained faculty, 98% success rate. 4 centers in Rohini, South Extension, Gurugram, and Faridabad.',
    url: `${baseUrl}/biology-classes-delhi`,
    telephone: '+91-8826444334',
    email: 'info@cerebrumbiologyacademy.com',
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og/biology-classes-delhi.jpg`,
    priceRange: '₹₹',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9',
        addressLocality: 'Rohini',
        addressRegion: 'Delhi',
        postalCode: '110085',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'D 35, South Extension Part 2',
        addressLocality: 'South Extension',
        addressRegion: 'Delhi',
        postalCode: '110049',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'M2K Corporate Park, Sector 51',
        addressLocality: 'Gurugram',
        addressRegion: 'Haryana',
        postalCode: '122018',
        addressCountry: 'IN',
      },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.6139',
      longitude: '77.2090',
    },
    areaServed: [
      'Delhi',
      'Rohini',
      'South Delhi',
      'Dwarka',
      'Pitampura',
      'Gurugram',
      'Noida',
      'Ghaziabad',
      'Faridabad',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '38',
      reviewCount: '38',
    },
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar Singh',
      jobTitle: 'Founder & Chief Academic Officer',
      alumniOf: 'AIIMS Delhi',
    },
    foundingDate: '2015',
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.youtube.com/@drshekharcsingh',
    ],
  }

  const faqSchema = {
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
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Biology Classes in Delhi',
        item: `${baseUrl}/biology-classes-delhi`,
      },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.name,
        description: course.description,
        provider: {
          '@type': 'Organization',
          name: 'Cerebrum Biology Academy',
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: ['onsite', 'online'],
          courseWorkload: 'P1Y',
        },
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 py-20 text-white">
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-6 py-2 text-sm font-medium backdrop-blur-sm">
                <MapPin className="mr-2 h-4 w-4 text-yellow-400" />4 Centers in Delhi NCR
              </div>

              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Best <span className="text-yellow-400">Biology Classes</span> in Delhi
              </h1>

              <p className="mb-8 text-xl text-blue-100 md:text-2xl">
                Join Delhi&apos;s top-rated biology coaching with AIIMS-trained faculty. NEET &
                Board preparation with 98% success rate. 1,50,000+ students trust us!
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-400"
                >
                  Book Free Demo Class
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold transition hover:bg-white/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call: 88264-44334
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm"
                >
                  <stat.icon className="mx-auto mb-2 h-8 w-8 text-yellow-400" />
                  <div className="text-2xl font-bold md:text-3xl">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Centers Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Our Biology Coaching Centers in Delhi NCR
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Visit any of our 3 conveniently located centers or join our live online classes
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {centers.map((center) => (
                <div
                  key={center.id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition hover:shadow-xl"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{center.name}</h3>
                      <span className="text-sm text-green-600">Open Now</span>
                    </div>
                  </div>

                  <div className="mb-4 space-y-3">
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-blue-600" />
                      <span className="text-sm">{center.address}</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-600">
                      <Clock className="mt-1 h-4 w-4 flex-shrink-0 text-blue-600" />
                      <span className="text-sm">{center.timings}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="mb-2 text-sm font-medium text-gray-700">Nearby Areas:</p>
                    <div className="flex flex-wrap gap-2">
                      {center.areas.slice(0, 4).map((area) => (
                        <span
                          key={area}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href="/demo"
                      className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Book Demo
                    </Link>
                    <a
                      href={center.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Why Choose Cerebrum for Biology Classes in Delhi?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                We are committed to making you excel in NEET and board exams
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {whyChooseUs.map((item) => (
                <div key={item.title} className="rounded-xl bg-white p-6 shadow-md">
                  <item.icon className="mb-4 h-10 w-10 text-blue-600" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Biology Courses Available in Delhi
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Choose the right program for your academic journey
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {courses.map((course) => (
                <div
                  key={course.name}
                  className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-lg"
                >
                  <Microscope className="mb-4 h-8 w-8 text-blue-600" />
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{course.name}</h3>
                  <p className="mb-4 text-sm text-gray-600">{course.description}</p>
                  <div className="mb-4 text-sm font-medium text-blue-600">
                    Duration: {course.duration}
                  </div>
                  <ul className="space-y-2">
                    {course.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/courses"
                className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Localities */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              Biology Classes in Delhi Localities
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {localities.map((locality) => (
                <Link
                  key={locality.name}
                  href={locality.url}
                  className="rounded-lg bg-white px-5 py-3 text-gray-700 shadow-sm transition hover:bg-blue-600 hover:text-white"
                >
                  Biology Classes in {locality.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About Dr. Shekhar */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="grid items-center gap-12 md:grid-cols-2">
                <div>
                  <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
                    Meet Your Mentor
                  </span>
                  <h2 className="mb-4 text-3xl font-bold text-gray-900">
                    Dr. Shekhar Singh - AIIMS Alumnus
                  </h2>
                  <p className="mb-6 text-gray-600">
                    With over 15 years of teaching experience and an AIIMS Delhi background, Dr.
                    Shekhar Singh has helped 1,50,000+ students achieve their medical dreams. His
                    unique teaching methodology makes complex biology concepts simple and memorable.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">AIIMS Delhi Alumni</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Trophy className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">1,50,000+ Students Mentored</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">98% NEET Success Rate</span>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200">
                    <Image
                      src="/faculty/dr-shekhar-singh.jpg"
                      alt="Dr. Shekhar Singh - Best Biology Teacher in Delhi"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl bg-white p-6 shadow-md">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Cities */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              Biology Classes in Nearby Cities
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/biology-classes-noida"
                className="rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition hover:bg-blue-600 hover:text-white"
              >
                Biology Classes in Noida
              </Link>
              <Link
                href="/biology-classes-gurgaon"
                className="rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition hover:bg-blue-600 hover:text-white"
              >
                Biology Classes in Gurgaon
              </Link>
              <Link
                href="/biology-classes-faridabad"
                className="rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition hover:bg-blue-600 hover:text-white"
              >
                Biology Classes in Faridabad
              </Link>
              <Link
                href="/biology-classes-ghaziabad"
                className="rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition hover:bg-blue-600 hover:text-white"
              >
                Biology Classes in Ghaziabad
              </Link>
              <Link
                href="/online-biology-classes"
                className="rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition hover:bg-blue-600 hover:text-white"
              >
                Online Biology Classes
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Start Your NEET Journey in Delhi Today!
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
              Join 1,50,000+ successful students. Book a free demo class at your nearest center.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-400"
              >
                Book Free Demo - Delhi
              </Link>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold transition hover:bg-white/10"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
