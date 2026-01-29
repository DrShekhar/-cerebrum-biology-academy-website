'use client'

import Link from 'next/link'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO, getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
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
  Navigation,
  Sparkles,
  Zap,
  Shield,
  Award,
  Brain,
  TrendingUp,
  School,
  Home,
  Timer,
} from 'lucide-react'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'

// FAQ data for the page
const faqs = [
  {
    question: 'Where is the nearest Cerebrum Biology Academy center for Meera Bagh students?',
    answer:
      'Our Rohini center at 211 Vikas Surya Tower, DC Chowk, Sector 9, Rohini is the nearest center for Meera Bagh students. It is only 15-20 minutes away by road via Outer Ring Road. The center is near Rohini West Metro Station (Red Line).',
  },
  {
    question: 'What makes Meera Bagh a premium location for NEET aspirants?',
    answer:
      "Meera Bagh is one of West Delhi's most premium residential areas in Paschim Vihar, known for being the residence area of celebrities like Virat Kohli. With 500+ affluent houses in Block A alone, the area has many families seeking quality NEET coaching for their children. The proximity to our Rohini center (15-20 min) makes it convenient for regular classes.",
  },
  {
    question: 'What are the batch timings available for Meera Bagh students?',
    answer:
      'We offer flexible batch timings at our Rohini center: Morning batches (7 AM - 10 AM), Afternoon batches (2 PM - 5 PM), and Evening batches (5 PM - 8 PM). Weekend-only batches are also available for school-going students. Online classes are available 24/7 for revision.',
  },
  {
    question: 'Is there any transport facility from Meera Bagh to the Rohini center?',
    answer:
      'While we do not provide direct transport, Meera Bagh is well-connected to our Rohini center via Outer Ring Road (15-20 min drive). Many students use the Delhi Metro (Paschim Vihar West to Rohini West) or private transport. Car pooling among Meera Bagh students is also common.',
  },
  {
    question: 'What is the fee structure for NEET coaching from Meera Bagh?',
    answer:
      'Our NEET coaching fees range from Rs 57,000 to Rs 85,500 per year depending on the course. Class 11-12 courses are Rs 72,200/year, while dropper batches are Rs 85,500/year. EMI options and scholarships are available for meritorious students.',
  },
  {
    question: 'Can I attend a free demo class before enrolling?',
    answer:
      'Yes! We offer completely free demo classes at our Rohini center. You can book a demo via WhatsApp or phone call. Experience our AIIMS-faculty teaching methodology before making any commitment. No registration fee for demo class.',
  },
  {
    question: 'Do you offer online classes for Meera Bagh students?',
    answer:
      'Yes, we offer hybrid learning options. Students can attend classes offline at Rohini center or join live online sessions from home. All recorded lectures are available for revision. This flexibility is perfect for Meera Bagh students during exam periods.',
  },
  {
    question: 'What is your success rate for NEET from West Delhi areas?',
    answer:
      'We have a 98% success rate in NEET qualification across all our centers. Over 200 students from Paschim Vihar and surrounding areas have cleared NEET through our coaching. Our toppers have scored 680+ marks in NEET Biology section.',
  },
]

// Student testimonials
const testimonials = [
  {
    name: 'Ananya Sharma',
    location: 'Meera Bagh, Block A',
    score: 'NEET 2024 - 645/720',
    quote:
      'Living in Meera Bagh, I was worried about the commute but Cerebrum Rohini center is just 15 minutes away. Dr. Shekhar Sir teaching is exceptional!',
  },
  {
    name: 'Rohan Kapoor',
    location: 'Paschim Vihar East',
    score: 'NEET 2024 - 612/720',
    quote:
      'The hybrid option was perfect for me. I attended offline classes twice a week and online otherwise. Got into MAMC Delhi!',
  },
  {
    name: 'Priya Malhotra',
    location: 'Meera Bagh, Block B',
    score: 'NEET 2023 - 658/720',
    quote:
      'Best decision to join Cerebrum. The small batch size ensured all my doubts were cleared. Now studying MBBS at Lady Hardinge.',
  },
]

// Why choose us features
const whyChooseUs = [
  {
    icon: GraduationCap,
    title: 'AIIMS-Trained Faculty',
    description:
      'Learn from Dr. Shekhar C Singh, AIIMS New Delhi Alumnus with 15+ years experience',
  },
  {
    icon: Users,
    title: 'Small Batch Size',
    description: 'Only 15-20 students per batch for personalized attention',
  },
  {
    icon: Target,
    title: '98% Success Rate',
    description: 'Proven track record with thousands of NEET qualifiers',
  },
  {
    icon: Video,
    title: 'Hybrid Learning',
    description: 'Flexibility to attend online or offline as per convenience',
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Support',
    description: 'Get doubts resolved anytime via WhatsApp',
  },
  {
    icon: BookOpen,
    title: 'NCERT-Focused Material',
    description: 'Comprehensive study material aligned with NEET pattern',
  },
]

// Courses offered
const courses = [
  {
    name: 'Class 11th NEET Comprehensive',
    description: '60% of NEET syllabus covered with deep concepts',
    price: 72200,
    originalPrice: 76000,
    duration: '1 Year',
    features: ['Complete NCERT', 'NEET Pattern', 'Test Series'],
    href: '/courses/class-11-neet-comprehensive',
    enrollHref: '/enrollments?course=class-11-neet-comprehensive&tier=ascent&location=meera-bagh',
    tag: 'Most Popular',
  },
  {
    name: 'Class 12th NEET Intensive',
    description: 'Dual preparation for boards and NEET',
    price: 72200,
    originalPrice: 76000,
    duration: '1 Year',
    features: ['Board + NEET', 'PYQ Analysis', '100+ Mocks'],
    href: '/courses/class-12-neet-intensive',
    enrollHref: '/enrollments?course=class-12-neet-intensive&tier=ascent&location=meera-bagh',
    tag: null,
  },
  {
    name: 'NEET Dropper/Repeater Batch',
    description: 'Intensive 1-year crash course for rank improvement',
    price: 85500,
    originalPrice: 90000,
    duration: '1 Year',
    features: ['Complete Revision', 'Daily Practice', 'Score Guarantee'],
    href: '/courses/neet-dropper-intensive',
    enrollHref: '/enrollments?course=neet-dropper-intensive&tier=ascent&location=meera-bagh',
    tag: 'High Demand',
  },
]

// Free NEET Tools
const neetTools = [
  {
    icon: School,
    title: 'NEET College Predictor',
    description: 'Find which medical colleges you can get based on your NEET score',
    href: '/neet-college-predictor',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
  },
  {
    icon: TrendingUp,
    title: 'NEET Rank Predictor',
    description: 'Predict your All India Rank based on expected score',
    href: '/neet-rank-predictor',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
  },
  {
    icon: Brain,
    title: 'Biology MCQ Practice',
    description: 'Practice 10,000+ NEET Biology MCQs with explanations',
    href: '/neet-biology-mcq-test',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
  {
    icon: Timer,
    title: 'NEET Countdown Timer',
    description: 'Track days remaining for NEET 2026 exam',
    href: '/neet-exam-countdown',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
  },
]

export function NEETCoachingMeeraBaghContent() {
  const baseUrl = 'https://cerebrumbiologyacademy.com'
  const pageUrl = `${baseUrl}/neet-coaching-meera-bagh`

  // FAQ Schema with Speakable
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
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.faq-question', '.faq-answer'],
    },
  }

  // Local Business Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${pageUrl}#organization`,
    name: 'Cerebrum Biology Academy - NEET Coaching Meera Bagh',
    description:
      'Best NEET coaching for Meera Bagh, Paschim Vihar students. Premium West Delhi area near Virat Kohli residence. AIIMS faculty, 98% success rate.',
    url: pageUrl,
    telephone: CONTACT_INFO.phone.primary,
    email: 'info@cerebrumbiologyacademy.com',
    logo: `${baseUrl}/logo.png`,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '211 Vikas Surya Tower, DC Chowk, Sector 9',
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
    areaServed: [
      'Meera Bagh',
      'Paschim Vihar',
      'Paschim Vihar East',
      'Paschim Vihar West',
      'Punjabi Bagh',
      'Rohini',
      'Pitampura',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '847',
      reviewCount: '523',
    },
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'Founder & Chief Academic Officer',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Courses for Meera Bagh Students',
      itemListElement: courses.map((course) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Course',
          name: course.name,
          description: course.description,
        },
        price: course.price,
        priceCurrency: 'INR',
      })),
    },
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Coaching Paschim Vihar',
        item: `${baseUrl}/neet-coaching-paschim-vihar`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'NEET Coaching Meera Bagh',
        item: pageUrl,
      },
    ],
  }

  // Speakable Schema for Voice Search
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl,
    name: 'NEET Coaching in Meera Bagh, Paschim Vihar | Cerebrum Biology Academy',
    description:
      'Best NEET coaching for Meera Bagh students in premium Paschim Vihar area. AIIMS faculty, 98% success rate, only 15-20 min from Rohini center.',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-intro', '.speakable-location', '.speakable-contact'],
    },
    mainEntity: { '@id': `${pageUrl}#organization` },
  }

  return (
    <>
      {/* Structured Data */}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      {/* Speakable Content for Voice Assistants (Hidden but crawlable) */}
      <div className="sr-only" aria-hidden="false">
        <p className="speakable-intro">
          Cerebrum Biology Academy offers the best NEET coaching for students from Meera Bagh,
          Paschim Vihar. Located in one of West Delhi&apos;s most premium residential areas, known
          as the residence area of celebrities like Virat Kohli, Meera Bagh students can access our
          Rohini center in just 15 to 20 minutes.
        </p>
        <p className="speakable-location">
          Our Rohini center is located at 211 Vikas Surya Tower, DC Chowk, Sector 9, Rohini. With
          over 500 affluent houses in Block A alone, Meera Bagh families trust Cerebrum for quality
          NEET preparation. We have a 98 percent success rate with AIIMS-trained faculty.
        </p>
        <p className="speakable-contact">
          To book a free demo class, call us at {CONTACT_INFO.phone.display.primary} or message us
          on WhatsApp. Classes are available in morning, afternoon, and evening batches. Online
          hybrid options also available.
        </p>
      </div>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white lg:py-24">
          {/* Decorative Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-[#4a5d4a] opacity-10 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-yellow-500 opacity-10 blur-3xl" />
          </div>

          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              {/* Urgency Banner */}
              <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 text-sm font-semibold">
                <Zap className="mr-2 h-4 w-4" />
                Limited Seats! NEET 2026 Batch Starting Soon
              </div>

              {/* Location Badge */}
              <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-6 py-2 text-sm font-medium backdrop-blur-sm">
                <MapPin className="mr-2 h-4 w-4 text-yellow-400" />
                <Home className="mr-2 h-4 w-4 text-green-400" />
                Premium Residential Area - Meera Bagh, Paschim Vihar
              </div>

              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                NEET Coaching in{' '}
                <span className="text-yellow-400">Meera Bagh</span>, Paschim Vihar
              </h1>

              <p className="mb-4 text-xl text-slate-300 md:text-2xl">
                Best Biology Classes for West Delhi&apos;s Premium Residential Area
              </p>

              <p className="mb-8 text-lg text-slate-400">
                Serving Meera Bagh Block A &amp; B, known for 500+ premium houses &amp; celebrity
                residences including Virat Kohli&apos;s family home
              </p>

              {/* Trust Badges */}
              <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                  <Award className="mr-2 h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium">AIIMS Faculty</span>
                </div>
                <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                  <Star className="mr-2 h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
                <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                  <Shield className="mr-2 h-5 w-5 text-green-400" />
                  <span className="text-sm font-medium">98% Success Rate</span>
                </div>
                <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                  <Clock className="mr-2 h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium">15-20 min from Rohini</span>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/demo-booking?location=meera-bagh"
                  className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-4 py-3 text-base font-bold text-slate-900 shadow-lg shadow-yellow-500/30 transition hover:bg-yellow-400 sm:px-8 sm:py-4 sm:text-lg"
                >
                  Book FREE Demo Class
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button
                  onClick={async () => {
                    await trackAndOpenWhatsApp({
                      source: 'meera-bagh-hero',
                      message:
                        "Hi! I'm from Meera Bagh, Paschim Vihar. I want to know about NEET Biology coaching at your Rohini center.",
                      campaign: 'meera-bagh-seo',
                    })
                  }}
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-green-500 bg-green-500/10 px-4 py-3 text-base font-semibold text-green-400 transition hover:bg-green-500/20 sm:px-8 sm:py-4 sm:text-lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </button>
              </div>

              {/* Quick Contact */}
              <div className="mt-6 text-slate-400">
                <a href={getPhoneLink()} className="inline-flex items-center hover:text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Call: {getDisplayPhone()}
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <Users className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">200+</div>
                <div className="text-xs text-slate-400 sm:text-sm">Meera Bagh Students</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <Trophy className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">98%</div>
                <div className="text-xs text-slate-400 sm:text-sm">Success Rate</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <Star className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">4.9/5</div>
                <div className="text-xs text-slate-400 sm:text-sm">Google Rating</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <GraduationCap className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">15+</div>
                <div className="text-xs text-slate-400 sm:text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Meera Bagh Section */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border-2 border-amber-200 bg-white p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-amber-500">
                    <Home className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                      Why Meera Bagh is Perfect for NEET Aspirants
                    </h2>
                    <div className="space-y-4 text-gray-600">
                      <p>
                        <strong>Meera Bagh</strong> is one of West Delhi&apos;s most prestigious
                        residential colonies in Paschim Vihar. Known for its affluent community with{' '}
                        <strong>500+ premium houses in Block A</strong> alone, the area is famous for
                        being the residence of cricket legend <strong>Virat Kohli&apos;s family</strong>{' '}
                        and other notable personalities.
                      </p>
                      <p>
                        The educated, aspiring families of Meera Bagh understand the importance of
                        quality education. Many parents here are professionals - doctors, engineers,
                        and business owners - who want the best NEET coaching for their children.
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div className="rounded-lg bg-amber-50 p-3 text-center">
                          <div className="text-2xl font-bold text-amber-600">500+</div>
                          <div className="text-xs text-gray-600">Premium Houses in Block A</div>
                        </div>
                        <div className="rounded-lg bg-amber-50 p-3 text-center">
                          <div className="text-2xl font-bold text-amber-600">15-20</div>
                          <div className="text-xs text-gray-600">Minutes to Rohini Center</div>
                        </div>
                        <div className="rounded-lg bg-amber-50 p-3 text-center">
                          <div className="text-2xl font-bold text-amber-600">Direct</div>
                          <div className="text-xs text-gray-600">Outer Ring Road Access</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nearest Center Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-green-600">
                    <Building className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                      Nearest Center: Cerebrum Biology Academy - Rohini
                    </h2>
                    <div className="mb-4 flex items-center gap-2 text-gray-600">
                      <MapPin className="h-5 w-5 text-green-600" />
                      211 Vikas Surya Tower, DC Chowk, Sector 9, Rohini, Delhi - 110085
                    </div>
                    <div className="mb-4 flex flex-wrap gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-600" />
                        Open: 7:00 AM - 9:00 PM (Mon-Sat)
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation className="h-5 w-5 text-green-600" />
                        15-20 min from Meera Bagh
                      </div>
                    </div>
                    <div className="mb-4 rounded-lg bg-white p-4">
                      <p className="mb-2 text-sm font-medium text-gray-700">
                        How to Reach from Meera Bagh:
                      </p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          By Car: Via Outer Ring Road (15-20 min)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          By Metro: Paschim Vihar West → Rohini West (Red Line)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Landmark: Near Rohini West Metro Station
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/demo-booking?center=rohini&location=meera-bagh"
                        className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
                      >
                        Book Demo at Rohini Center
                      </Link>
                      <a
                        href="https://maps.google.com/?q=28.7041,77.1025"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-green-600 px-6 py-3 font-medium text-green-700 transition hover:bg-green-50"
                      >
                        <Navigation className="mr-2 inline h-4 w-4" />
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Why Meera Bagh Students Choose Cerebrum?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Premium coaching for premium families - AIIMS faculty with proven results
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {whyChooseUs.map((item) => (
                <div key={item.title} className="rounded-xl bg-white p-6 shadow-md">
                  <item.icon className="mb-4 h-10 w-10 text-[#4a5d4a]" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-6 py-2 text-sm font-semibold text-green-700">
                <Sparkles className="mr-2 h-4 w-4" />
                Special Discounts for Meera Bagh Students
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                NEET Biology Courses for Meera Bagh Students
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Choose the right course for your medical dream
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {courses.map((course) => (
                <div
                  key={course.name}
                  className="relative rounded-xl border-2 border-gray-200 bg-white p-6 transition hover:border-[#4a5d4a] hover:shadow-xl"
                >
                  {course.tag && (
                    <div className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-1 text-xs font-bold text-white">
                      {course.tag}
                    </div>
                  )}
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{course.name}</h3>
                  <p className="mb-4 text-sm text-gray-600">{course.description}</p>

                  <div className="mb-4 rounded-lg bg-gray-50 p-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#4a5d4a]">
                        ₹{course.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ₹{course.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">
                        Save ₹{(course.originalPrice - course.price).toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">• {course.duration}</span>
                    </div>
                  </div>

                  <ul className="mb-4 space-y-2">
                    {course.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2">
                    <Link
                      href={course.enrollHref}
                      className="flex-1 rounded-lg bg-[#4a5d4a] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#3d4d3d]"
                    >
                      Enroll Now
                    </Link>
                    <Link
                      href={course.href}
                      className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free NEET Tools Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                <Sparkles className="h-4 w-4" />
                100% Free Tools
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Free NEET Tools for Meera Bagh Students
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Start your preparation with our free tools - no registration required
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {neetTools.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="group block rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-lg"
                >
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${tool.bgColor}`}
                  >
                    <tool.icon className={`h-5 w-5 ${tool.textColor}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 transition group-hover:text-indigo-600">
                    {tool.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">{tool.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-indigo-600 transition-all group-hover:gap-2">
                    Try Free <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/neet-tools"
                className="inline-flex items-center gap-2 font-medium text-indigo-600 hover:text-indigo-700"
              >
                View All Free NEET Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Student Testimonials */}
        <section className="bg-slate-900 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Success Stories from Meera Bagh &amp; Paschim Vihar
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-300">
                Hear from our students who achieved their medical dreams
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="mb-4 text-slate-200">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="border-t border-white/20 pt-4">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.location}</div>
                    <div className="mt-1 text-sm font-medium text-green-400">{testimonial.score}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
                FAQs - NEET Coaching for Meera Bagh Students
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl bg-gray-50 p-6">
                    <h3 className="faq-question mb-3 text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="faq-answer text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Areas */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              NEET Coaching in Nearby Areas
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'Paschim Vihar', url: '/neet-coaching-paschim-vihar' },
                { name: 'Punjabi Bagh', url: '/neet-coaching-punjabi-bagh' },
                { name: 'Rohini', url: '/neet-coaching-rohini' },
                { name: 'Pitampura', url: '/neet-coaching-pitampura' },
                { name: 'Janakpuri', url: '/neet-coaching-janakpuri' },
                { name: 'Rajouri Garden', url: '/neet-coaching-rajouri-garden' },
              ].map((area) => (
                <Link
                  key={area.name}
                  href={area.url}
                  className="rounded-lg bg-white px-5 py-3 text-gray-700 shadow-sm transition hover:bg-[#4a5d4a] hover:text-white"
                >
                  NEET Coaching in {area.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NEET Tools Widget */}
        <NEETToolsWidget
          title="Free NEET Preparation Tools"
          subtitle="Boost your preparation with AI-powered tools - 100% Free for Meera Bagh students"
        />

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            {/* Urgency Badge */}
            <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 text-sm font-bold">
              <Zap className="mr-2 h-4 w-4" />
              Limited Seats for NEET 2026 Batch!
            </div>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Start Your Medical Journey from Meera Bagh!
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-xl text-slate-300">
              Join 200+ students from Meera Bagh &amp; Paschim Vihar who are preparing with Cerebrum
              Biology Academy
            </p>

            {/* Benefits */}
            <div className="mx-auto mb-8 flex max-w-2xl flex-wrap justify-center gap-4">
              <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
                <span className="text-sm">Free Demo Class</span>
              </div>
              <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
                <span className="text-sm">AIIMS Faculty</span>
              </div>
              <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
                <span className="text-sm">Only 15-20 min away</span>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/demo-booking?location=meera-bagh"
                className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-4 py-3 text-base font-bold text-slate-900 shadow-lg shadow-yellow-500/30 transition hover:bg-yellow-400 sm:px-8 sm:py-4 sm:text-lg"
              >
                Book Free Demo Class
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button
                onClick={async () => {
                  await trackAndOpenWhatsApp({
                    source: 'meera-bagh-cta',
                    message:
                      "Hi! I'm from Meera Bagh, Paschim Vihar. I want to enroll for NEET Biology coaching.",
                    campaign: 'meera-bagh-seo',
                  })
                }}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-green-500 bg-green-500/10 px-4 py-3 text-base font-semibold text-green-400 transition hover:bg-green-500/20 sm:px-8 sm:py-4 sm:text-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us Now
              </button>
              <a
                href={getPhoneLink()}
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-4 py-3 text-base font-semibold transition hover:bg-white/10 sm:px-8 sm:py-4 sm:text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call: {getDisplayPhone()}
              </a>
            </div>

            {/* Operating Hours */}
            <div className="mt-8 flex items-center justify-center text-slate-400">
              <Clock className="mr-2 h-4 w-4" />
              <span className="text-sm">Available Mon-Sat, 7 AM - 9 PM | Sun, 9 AM - 6 PM</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
