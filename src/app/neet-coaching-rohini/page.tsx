'use client'

import Link from 'next/link'
import {
  Phone,
  MapPin,
  Clock,
  Award,
  Users,
  BookOpen,
  CheckCircle,
  Star,
  Train,
  GraduationCap,
  Play,
  ExternalLink,
  ThumbsUp,
  MessageCircle,
  MapPinned,
} from 'lucide-react'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - NEET Coaching Rohini',
  description:
    'Top NEET biology coaching for Rohini students. Expert AIIMS Trained faculty, proven results, and comprehensive study material for NEET UG preparation.',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini',
  telephone: '+91-8826444334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rohini',
    addressRegion: 'Delhi',
    postalCode: '110085',
    addressCountry: 'IN',
  },
  areaServed: [
    'Sector 3 Rohini',
    'Sector 5 Rohini',
    'Sector 7 Rohini',
    'Sector 8 Rohini',
    'Sector 9 Rohini',
    'Sector 11 Rohini',
    'Sector 14 Rohini',
    'Sector 15 Rohini',
    'Sector 16 Rohini',
    'Sector 18 Rohini',
    'Sector 22 Rohini',
    'Sector 24 Rohini',
    'Pitampura',
    'Shalimar Bagh',
    'Prashant Vihar',
    'Rithala',
  ],
  sameAs: [
    'https://www.facebook.com/cerebrumbiologyacademy',
    'https://www.instagram.com/cerebrumbiologyacademy',
  ],
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which is the best NEET coaching in Rohini?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum Biology Academy offers specialized NEET biology coaching for Rohini students. Our AIIMS Trained faculty and personalized approach have helped many Rohini students score 650+ in NEET with small batch sizes ensuring individual attention.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can Rohini students reach Cerebrum Biology Academy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Students from Rohini can take the Red Line Metro from Rohini East/West stations to Rajiv Chowk, then change to Yellow Line towards Hauz Khas. From Hauz Khas, our Panchsheel Enclave center is a short auto ride. Total journey is approximately 60-70 minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer weekend batches for Rohini students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer special weekend batches designed for Rohini and North Delhi students. Classes are held on Saturdays and Sundays with intensive sessions covering complete NEET Biology syllabus and comprehensive doubt clearing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the success rate of students from Rohini?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Students from Rohini have consistently achieved excellent results at Cerebrum Biology Academy. Our Rohini students have secured admissions to AIIMS, MAMC, UCMS, and other top medical colleges with scores ranging from 640-695 in NEET.',
      },
    },
  ],
}

const rohiniAreas = [
  { name: 'Sector 3-5 Rohini', distance: '60 min via Metro', description: 'Residential hub' },
  { name: 'Sector 7-8 Rohini', distance: '60 min via Metro', description: 'Near Rithala Metro' },
  { name: 'Sector 11-14 Rohini', distance: '65 min via Metro', description: 'Central Rohini' },
  {
    name: 'Sector 15-18 Rohini',
    distance: '65 min via Metro',
    description: 'Near Rohini West',
  },
  { name: 'Sector 22-24 Rohini', distance: '70 min via Metro', description: 'Near Samaypur' },
  { name: 'Pitampura', distance: '55 min via Metro', description: 'Adjacent to Rohini' },
  { name: 'Shalimar Bagh', distance: '60 min via Metro', description: 'Near Netaji Subhash' },
  { name: 'Prashant Vihar', distance: '65 min via Metro', description: 'North Delhi hub' },
]

const features = [
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Learn from experienced NEET biology experts with 15+ years experience',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Limited batch size of maximum 15 students for personalized attention',
  },
  {
    icon: BookOpen,
    title: 'Complete Material',
    description: 'Comprehensive NCERT-based study material with high-yield topic focus',
  },
  {
    icon: Clock,
    title: 'Weekend Batches',
    description: 'Special weekend batches convenient for Rohini students',
  },
]

export default function NEETCoachingRohiniPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-[#4a5d4a] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto animate-fadeInUp">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">NEET Coaching for Rohini Students</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best NEET Coaching in Rohini - Expert Biology Classes
              </h1>

              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Join Cerebrum Biology Academy for specialized NEET biology coaching. Easy access
                from all Rohini sectors via Red Line Metro. Weekend batches available with AIIMS
                Trained faculty for comprehensive NEET preparation.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call: 8826444334
                </Link>
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors border border-white/30"
                >
                  Book Free Demo Class
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Rohini Students Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fadeInUp">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Why Rohini Students Choose Cerebrum Biology Academy
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Convenient Red Line Metro connectivity and weekend batches make it easy for Rohini
                students to access quality NEET coaching with AIIMS Trained faculty.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fadeInUp"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connectivity from Rohini Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fadeInUp">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Easy Access from All Rohini Areas
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Well-connected via Red Line Metro. Special weekend batches designed for Rohini and
                North Delhi students.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rohiniAreas.map((area, index) => (
                <div
                  key={area.name}
                  className="bg-white rounded-lg p-4 shadow-md border border-gray-100 animate-fadeInUp"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Train className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{area.name}</h3>
                      <p className="text-green-600 text-sm font-medium">{area.distance}</p>
                      <p className="text-gray-500 text-xs mt-1">{area.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-red-50 rounded-xl p-6 border border-red-200 animate-fadeInUp">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Train className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Metro Route from Rohini</h3>
                  <p className="text-gray-600">
                    <strong>Red Line:</strong> Rohini East/West → Rajiv Chowk (Direct)
                    <br />
                    <strong>Yellow Line:</strong> Rajiv Chowk → Hauz Khas
                    <br />
                    <strong>Then:</strong> Short auto/cab to Panchsheel Enclave (5 min)
                    <br />
                    <span className="text-green-600 font-medium">
                      Total journey: 60-70 minutes from most Rohini sectors
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rohini Schools We Serve */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fadeInUp">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Students from Top Rohini Schools
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We proudly serve students from leading schools across Rohini and North Delhi
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'Delhi Public School Rohini',
                'Amity International Rohini',
                'Mount Abu Public School',
                'Montfort School',
                'SKV School Rohini',
                'St. Marks Sr. Sec. School',
                'DAV Public School Rohini',
                'Salwan Public School',
                'Cambridge School',
                'RG International School',
                'Bal Bharati Public School',
                'Hansraj Model School',
              ].map((school, index) => (
                <div
                  key={school}
                  className="bg-white rounded-lg p-4 shadow-md border border-gray-100 flex items-center gap-3 animate-fadeInUp"
                >
                  <GraduationCap className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{school}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free NEET Tools Section */}
        <NEETToolsWidget
          title="Free NEET Tools for Rohini Students"
          subtitle="Boost your NEET preparation with our AI-powered tools - 100% Free"
          compact={false}
        />

        {/* Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto animate-fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Success Stories from Rohini
                </h2>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  &quot;As a student from Sector 11 Rohini, the weekend batches at Cerebrum were
                  perfect for my schedule. The Red Line Metro made commuting easy. The AIIMS Trained
                  faculty&apos;s teaching methodology and small batch size helped me focus on weak
                  areas. I scored 685 in NEET 2024 and got admission to Maulana Azad Medical
                  College!&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">RK</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Rohan Kapoor</p>
                    <p className="text-gray-600 text-sm">
                      NEET 2024 - 685/720 | Delhi Public School, Rohini
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fadeInUp">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Watch Success Stories from Our Students
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear directly from NEET achievers about their journey with Cerebrum Biology Academy
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  youtubeId: 'bk6wQCh6b9w',
                  student: 'Sadhna Sirin',
                  score: '695/720',
                  achievement: 'Delhi-NCR Topper NEET 2023',
                },
                {
                  youtubeId: 'NfhkGqOQXzk',
                  student: 'Abhisek',
                  score: 'AFMC Selection',
                  achievement: 'Armed Forces Medical College',
                },
                {
                  youtubeId: 't5F8RBuHITM',
                  student: 'Nishita',
                  score: 'Medical College',
                  achievement: '6-Month Intensive Program',
                },
              ].map((video, index) => (
                <div
                  key={video.youtubeId}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-fadeInUp"
                >
                  <div className="relative aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={`${video.student} NEET Success Story`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-1">{video.student}</h3>
                    <p className="text-green-600 font-semibold text-sm">{video.score}</p>
                    <p className="text-gray-600 text-xs mt-1">{video.achievement}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 animate-fadeInUp">
              <a
                href="https://www.youtube.com/@cerebrumbiologyacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch More on YouTube
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Google Business Profile & Reviews Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fadeInUp">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Trusted by 500+ Verified Google Reviews
                </h2>
                <p className="text-gray-600">
                  See what parents and students say about Cerebrum Biology Academy
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Google Rating Card */}
                <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 animate-fadeInUp">
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                      alt="Google Reviews rating for Cerebrum Biology Academy"
                      className="h-8"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">4.9</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 font-medium mb-4">Based on 500+ reviews</p>
                    <div className="flex flex-col gap-2">
                      <a
                        href="https://www.google.com/search?q=cerebrum+biology+academy+reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        <ThumbsUp className="w-5 h-5" />
                        Read Reviews on Google
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href="https://search.google.com/local/writereview?placeid=ChIJ_cerebrum_placeholder"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
                      >
                        <Star className="w-4 h-4" />
                        Write a Review
                      </a>
                    </div>
                  </div>
                </div>

                {/* Recent Reviews Highlights */}
                <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 animate-fadeInUp">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    Recent Reviews
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        text: 'Best NEET Biology coaching! Small batches helped my son get personal attention. Scored 682 in NEET 2024.',
                        author: 'Parent - Rohini Sector 11',
                        rating: 5,
                      },
                      {
                        text: 'AIIMS Trained faculty are excellent. Weekend batches perfect for us. Highly recommend!',
                        author: 'Student - Pitampura',
                        rating: 5,
                      },
                      {
                        text: 'Amazing teaching methodology. Got admission to MAMC. Thank you Cerebrum!',
                        author: 'Student - Shalimar Bagh',
                        rating: 5,
                      },
                    ].map((review, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="flex gap-1 mb-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-700 italic mb-1">
                          &quot;{review.text}&quot;
                        </p>
                        <p className="text-xs text-gray-500">- {review.author}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 animate-fadeInUp">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPinned className="w-5 h-5 text-red-600" />
                  Visit Our Center - South Extension, New Delhi
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
                  <LazyGoogleMap
                    embedUrl="https://www.google.com/maps?q=Cerebrum+Biology+Academy+Panchsheel+Enclave+South+Extension+Delhi&output=embed"
                    title="NEET Coaching Center Location"
                    height="100%"
                    placeholder={{
                      lat: 28.556,
                      lng: 77.22,
                      address:
                        'Cerebrum Biology Academy, Panchsheel Enclave, South Extension, Delhi',
                    }}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Address:</p>
                    <p className="text-gray-600 text-sm">
                      Cerebrum Biology Academy
                      <br />
                      Panchsheel Enclave, South Extension
                      <br />
                      New Delhi - 110017
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Contact:</p>
                    <p className="text-gray-600 text-sm mb-1">
                      <a href="tel:+918826444334" className="text-green-600 hover:underline">
                        +91 88264 44334
                      </a>
                    </p>
                    <p className="text-gray-600 text-sm">
                      <a
                        href="mailto:info@cerebrumbiologyacademy.com"
                        className="text-green-600 hover:underline"
                      >
                        info@cerebrumbiologyacademy.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fadeInUp">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions - NEET Coaching Rohini
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqStructuredData.mainEntity.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md border border-gray-100 p-6 animate-fadeInUp"
                >
                  <h3 className="font-bold text-gray-800 mb-3 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    {faq.name}
                  </h3>
                  <p className="text-gray-600 ml-8">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="py-12 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Award,
                  label: '15+ Years Experience',
                  sublabel: 'Since 2009',
                  color: 'text-blue-600',
                },
                {
                  icon: Users,
                  label: '67+ AIIMS Selections',
                  sublabel: 'NEET Qualified',
                  color: 'text-green-600',
                },
                {
                  icon: Star,
                  label: '4.9 Google Rating',
                  sublabel: '500+ Reviews',
                  color: 'text-yellow-600',
                },
                {
                  icon: GraduationCap,
                  label: 'AIIMS Trained Faculty',
                  sublabel: 'Expert Teachers',
                  color: 'text-purple-600',
                },
              ].map((badge, index) => (
                <div key={badge.label} className="text-center animate-fadeInUp">
                  <badge.icon className={`w-8 h-8 mx-auto mb-2 ${badge.color}`} />
                  <div className="font-bold text-gray-900 text-sm">{badge.label}</div>
                  <div className="text-xs text-gray-600">{badge.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#4a5d4a] text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey from Rohini</h2>
              <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                Join the growing community of successful NEET aspirants from Rohini. Book your free
                demo class today and experience the Cerebrum difference with AIIMS Trained faculty.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Book Free Demo Class
                </Link>
                <Link
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-500 transition-colors border border-white/30"
                >
                  <Phone className="w-5 h-5" />
                  Call: 8826444334
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
