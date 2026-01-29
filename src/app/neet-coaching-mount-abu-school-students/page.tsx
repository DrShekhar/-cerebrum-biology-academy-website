import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Trophy,
  GraduationCap,
  MapPin,
  Clock,
  Building2,
  Quote,
  Navigation,
  MessageCircle,
  BookOpen,
  Calculator,
  FileText,
  Award,
  Globe,
} from 'lucide-react'
import { CONTACT_INFO, getPhoneLink, getDisplayPhone, getWhatsAppLink } from '@/lib/constants/contactInfo'

const pageData = {
  slug: 'neet-coaching-mount-abu-school-students',
  schoolName: 'Mount Abu School',
  locality: 'Sector 16, Rohini',
  nearestCenter: 'Rohini Center',
  distance: '2-3 km',
  metaTitle: 'NEET Coaching for Mount Abu School Students | Biology Classes Rohini',
  metaDescription:
    'Best NEET coaching for Mount Abu School Rohini Sector 16 students. DC Chauk center just 10 mins away. After-school batches, AIIMS faculty. IB program support. Ranked #2 North Delhi school.',
  heroTitle: 'NEET Coaching for Mount Abu School Students',
  heroSubtitle:
    'Join 45+ Mount Abu School students preparing for NEET at our Rohini DC Chauk center. Special support for IB program students transitioning to NEET.',
  schoolHighlights: [
    '45+ Mount Abu School students enrolled',
    'Just 10 minutes from Sector 16 campus',
    'Special IB to NEET bridge program',
    '#2 ranked school in North Delhi (Times 2025)',
    'After-school batches starting 3:00 PM',
    '20+ alumni in top medical colleges',
  ],
  whyStudentsChoose: [
    {
      title: 'Very Close Location',
      description:
        'Our DC Chauk center is just 2-3 km from Mount Abu School Sector 16. Students reach in 10 minutes.',
    },
    {
      title: 'IB Program Support',
      description:
        'Special bridge content for IB students covering CBSE-specific NEET topics not in IB curriculum.',
    },
    {
      title: 'Premium School Peer Group',
      description:
        'Study with students from other top Rohini schools like DPS, Bal Bharati, and Venkateshwar.',
    },
    {
      title: 'Flexible Timing',
      description:
        'Multiple batch options from 3 PM onwards, perfectly synced with Mount Abu School schedule.',
    },
  ],
  successStories: [
    {
      name: 'Riya Malhotra',
      batch: 'Mount Abu School, Class of 2024',
      result: 'NEET Score: 688',
      quote:
        'The IB bridge program was invaluable. Cerebrum helped me cover CBSE topics I had missed in IB curriculum.',
    },
    {
      name: 'Arjun Saxena',
      batch: 'Mount Abu School, Class of 2023',
      result: 'MAMC Delhi - MBBS',
      quote:
        'Being from one of the top schools in North Delhi, I needed coaching that matched our academic rigor. Cerebrum delivered.',
    },
  ],
  faqs: [
    {
      question: 'How close is Cerebrum to Mount Abu School Rohini?',
      answer:
        'Our Rohini center at DC Chauk (Sector 9) is just 2-3 km from Mount Abu School in Sector 16. Most students reach in 10 minutes by car or e-rickshaw. The route is straightforward via Sector 14-15.',
    },
    {
      question: 'Do you support IB program students for NEET?',
      answer:
        'Yes! Mount Abu School offers the IB program, and many IB students need additional CBSE-specific topics for NEET. We provide a comprehensive bridge program covering topics like Human Reproduction, Evolution details, and Ecology specifics that differ between IB and CBSE curricula.',
    },
    {
      question: 'What batch timings suit Mount Abu School students?',
      answer:
        'We offer 3 PM, 4 PM, and 5 PM evening batches on weekdays. The 3:30 PM batch is most popular among Mount Abu students as school typically ends around 2:30 PM. Weekend intensive batches are also available.',
    },
    {
      question: 'Why is Mount Abu School ranked #2 in North Delhi?',
      answer:
        'According to Times School Survey 2025, Mount Abu School Rohini ranks #2 among North Delhi schools for its academic excellence, IB program, infrastructure, and overall development focus. Our coaching complements this high standard with AIIMS-level NEET preparation.',
    },
    {
      question: 'How many Mount Abu School students study at Cerebrum?',
      answer:
        'Currently, we have 45+ students from Mount Abu School across Class 11, 12, and dropper batches. This creates a supportive peer group where students from the same school can study together and share notes.',
    },
    {
      question: 'What free resources do you offer for NEET preparation?',
      answer:
        'We offer free NEET rank predictors, college predictors, free biology lectures on YouTube, and downloadable study materials. Mount Abu School students can access our free demo class to experience our teaching methodology before enrolling.',
    },
  ],
  relatedSchools: [
    { name: 'DPS Rohini', url: '/neet-coaching-dps-rohini-students' },
    { name: 'Bal Bharati Rohini', url: '/neet-coaching-bal-bharati-rohini-students' },
    { name: 'Venkateshwar Rohini', url: '/neet-coaching-venkateshwar-rohini-students' },
  ],
  centerDetails: {
    name: 'Rohini Center',
    address: '211 Vikas Surya Tower, DC Chauk, Sector 9, Rohini, New Delhi 110085',
    timing: '7 AM - 9 PM',
    phone: '+91-88264-44334',
  },
  freeTools: [
    {
      name: 'NEET Rank Predictor',
      description: 'Predict your NEET rank based on expected score',
      url: '/neet-rank-predictor',
      icon: 'Calculator',
    },
    {
      name: 'NEET College Predictor',
      description: 'Find colleges matching your NEET score',
      url: '/neet-college-predictor',
      icon: 'GraduationCap',
    },
    {
      name: 'Free Biology Lectures',
      description: '100+ free NEET biology video lectures',
      url: '/free-neet-biology-lectures',
      icon: 'BookOpen',
    },
    {
      name: 'Free Study Materials',
      description: 'Download chapter-wise notes and MCQs',
      url: '/free-resources',
      icon: 'FileText',
    },
  ],
}

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'NEET coaching mount abu school',
    'biology tuition mount abu rohini',
    'mount abu school rohini neet',
    'neet classes near sector 16 rohini',
    'after school neet coaching rohini',
    'best coaching for mount abu school neet',
    'IB program neet coaching rohini',
    'north delhi top school neet coaching',
    'mount abu school biology tuition',
    'neet preparation mount abu rohini',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-mount-abu-school-students',
    type: 'website',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og/mount-abu-school-neet.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching for Mount Abu School Students - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageData.metaTitle,
    description: pageData.metaDescription,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-mount-abu-school-students',
  },
}

export default function NEETCoachingMountAbuSchoolPage() {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${baseUrl}/${pageData.slug}#organization`,
    name: 'Cerebrum Biology Academy',
    description: pageData.metaDescription,
    url: `${baseUrl}/${pageData.slug}`,
    telephone: CONTACT_INFO.phone.primary,
    email: 'info@cerebrumbiologyacademy.com',
    logo: `${baseUrl}/logo.png`,
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'Founder & Chief Academic Officer',
      alumniOf: 'AIIMS Delhi',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9',
      addressLocality: 'Rohini',
      addressRegion: 'Delhi',
      postalCode: '110085',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Rohini, North Delhi',
    },
  }

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageData.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Schools', item: `${baseUrl}/schools` },
      {
        '@type': 'ListItem',
        position: 3,
        name: `NEET Coaching for ${pageData.schoolName}`,
        item: `${baseUrl}/${pageData.slug}`,
      },
    ],
  }

  // Speakable Schema for voice search optimization
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageData.metaTitle,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.hero-title', '.hero-subtitle', '.school-highlights', '.faq-section'],
    },
    url: `${baseUrl}/${pageData.slug}`,
  }

  // Local Business Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Rohini',
    image: `${baseUrl}/centers/rohini-center.jpg`,
    '@id': `${baseUrl}/${pageData.slug}#localbusiness`,
    url: `${baseUrl}/${pageData.slug}`,
    telephone: CONTACT_INFO.phone.primary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9',
      addressLocality: 'Rohini, Delhi',
      addressRegion: 'Delhi',
      postalCode: '110085',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.7041,
      longitude: 77.1025,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
  }

  const whatsappMessage = `Hi! I'm a student from Mount Abu School, Rohini (Sector 16). I'm interested in NEET coaching at your Rohini center. Please share details about batches and fees.`

  const iconMap: Record<string, React.ElementType> = {
    Calculator: Calculator,
    GraduationCap: GraduationCap,
    BookOpen: BookOpen,
    FileText: FileText,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 py-20 text-white">
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              {/* School Badge */}
              <div className="mb-4 inline-flex items-center rounded-full bg-yellow-500/20 px-6 py-2 text-sm font-medium text-yellow-300 backdrop-blur-sm">
                <Award className="mr-2 h-4 w-4" />
                #2 Ranked School in North Delhi (Times 2025)
              </div>

              <div className="mb-6 inline-flex items-center rounded-full bg-green-500/20 px-6 py-2 text-sm font-medium text-green-300 backdrop-blur-sm">
                <Globe className="mr-2 h-4 w-4" />
                IB Program Support Available
              </div>

              <h1 className="hero-title mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                {pageData.heroTitle}
              </h1>

              <p className="hero-subtitle mb-8 text-xl text-blue-100 md:text-2xl">
                {pageData.heroSubtitle}
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
                  href={getWhatsAppLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-green-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-600"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </a>
                <a
                  href={getPhoneLink()}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold transition hover:bg-white/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {getDisplayPhone()}
                </a>
              </div>
            </div>

            {/* Location Badge */}
            <div className="mx-auto mt-12 max-w-md">
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2">
                  <Navigation className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold">
                    Just {pageData.distance} from {pageData.schoolName} (Sector 16)
                  </span>
                </div>
                <div className="mt-1 text-sm text-blue-200">{pageData.nearestCenter} - DC Chauk</div>
              </div>
            </div>
          </div>
        </section>

        {/* School Highlights */}
        <section className="school-highlights py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                Why {pageData.schoolName} Students Choose Us
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pageData.schoolHighlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4"
                  >
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="font-medium text-gray-800">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Free NEET Tools Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Free NEET Preparation Tools</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Access our free resources to kickstart your NEET preparation. No registration required!
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pageData.freeTools.map((tool) => {
                const IconComponent = iconMap[tool.icon] || BookOpen
                return (
                  <Link
                    key={tool.name}
                    href={tool.url}
                    className="group rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg hover:ring-2 hover:ring-blue-500"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900">{tool.name}</h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                    <div className="mt-3 flex items-center text-sm font-medium text-blue-600">
                      Access Free
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Students Choose Us */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Perfect for {pageData.schoolName} Schedule
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                We understand the demands of {pageData.schoolName} and its prestigious IB program. Our
                coaching is designed to complement your school academics.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {pageData.whyStudentsChoose.map((reason, index) => (
                <div key={reason.title} className="rounded-xl bg-white p-6 shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IB Program Support Banner */}
        <section className="bg-indigo-900 py-12 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h3 className="mb-2 text-2xl font-bold">IB to NEET Bridge Program</h3>
                <p className="text-indigo-200">
                  Special curriculum covering CBSE-specific topics for IB students preparing for NEET
                </p>
              </div>
              <a
                href={getWhatsAppLink('Hi! I am an IB student from Mount Abu School. Please share details about your IB to NEET bridge program.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        {pageData.successStories.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
                  <Trophy className="mr-2 h-4 w-4" />
                  Success Stories
                </div>
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  {pageData.schoolName} Alumni at Top Medical Colleges
                </h2>
              </div>

              <div className="mx-auto max-w-4xl">
                <div className="grid gap-8 md:grid-cols-2">
                  {pageData.successStories.map((story) => (
                    <div
                      key={story.name}
                      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                    >
                      <div className="mb-4 flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Quote className="mb-2 h-8 w-8 text-blue-200" />
                      <p className="mb-4 italic text-gray-600">&ldquo;{story.quote}&rdquo;</p>
                      <div className="border-t border-gray-100 pt-4">
                        <div className="font-semibold text-gray-900">{story.name}</div>
                        <div className="text-sm text-gray-500">{story.batch}</div>
                        <div className="mt-1 inline-block rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-700">
                          {story.result}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Center Details */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
                Nearest Center for {pageData.schoolName} Students
              </h2>
              <div className="rounded-xl bg-white p-8 shadow-md">
                <div className="mb-6 flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-xl font-bold text-gray-900">{pageData.centerDetails.name}</div>
                    <div className="text-sm text-gray-500">
                      Just {pageData.distance} from your school in Sector 16
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span className="text-gray-700">{pageData.centerDetails.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span className="text-gray-700">Open: {pageData.centerDetails.timing}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <a
                      href={`tel:${pageData.centerDetails.phone.replace(/-/g, '')}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {pageData.centerDetails.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Book Free Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <a
                    href={getWhatsAppLink(whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Us
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pageData.centerDetails.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-blue-900 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 text-center sm:grid-cols-4">
              <div>
                <Users className="mx-auto mb-2 h-8 w-8 text-yellow-400" />
                <div className="text-3xl font-bold">1,50,000+</div>
                <div className="text-blue-200">Students Trained</div>
              </div>
              <div>
                <Trophy className="mx-auto mb-2 h-8 w-8 text-yellow-400" />
                <div className="text-3xl font-bold">65+</div>
                <div className="text-blue-200">AIIMS Selections</div>
              </div>
              <div>
                <GraduationCap className="mx-auto mb-2 h-8 w-8 text-yellow-400" />
                <div className="text-3xl font-bold">15+</div>
                <div className="text-blue-200">Years Experience</div>
              </div>
              <div>
                <Award className="mx-auto mb-2 h-8 w-8 text-yellow-400" />
                <div className="text-3xl font-bold">45+</div>
                <div className="text-blue-200">Mount Abu Students</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="faq-section py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
                FAQs for {pageData.schoolName} Students
              </h2>
              <div className="space-y-4">
                {pageData.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl bg-gray-50 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Schools */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              NEET Coaching for Other Rohini Schools
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {pageData.relatedSchools.map((school) => (
                <Link
                  key={school.name}
                  href={school.url}
                  className="rounded-lg bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-blue-600 hover:text-white"
                >
                  {school.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA with WhatsApp */}
        <section className="bg-blue-600 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Join Other {pageData.schoolName} Students?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
              Book a free demo class and see why students from {pageData.schoolName} choose Cerebrum for
              their NEET preparation. Special IB bridge program available!
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-400"
              >
                Book Free Demo Class
              </Link>
              <a
                href={getWhatsAppLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-green-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-600"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </a>
              <a
                href={getPhoneLink()}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold transition hover:bg-white/10"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* Floating WhatsApp Button */}
        <a
          href={getWhatsAppLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-7 w-7" />
        </a>
      </div>
    </>
  )
}
