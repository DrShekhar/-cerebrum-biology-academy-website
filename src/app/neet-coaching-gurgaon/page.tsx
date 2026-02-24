'use client'

import Link from 'next/link'
import Image from 'next/image'
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
  Trophy,
  ArrowRight,
  Building2,
  School,
} from 'lucide-react'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { VideoSchema } from '@/components/seo/VideoSchema'
import { LazyYouTubeEmbed } from '@/components/performance/LazyYouTubeEmbed'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - NEET Coaching Gurgaon',
  description:
    'Top NEET biology coaching for Gurgaon students. Expert faculty, proven results, and comprehensive study material for NEET UG preparation.',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon',
  telephone: '+91-8826444334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gurgaon',
    addressRegion: 'Haryana',
    postalCode: '122001',
    addressCountry: 'IN',
  },
  areaServed: [
    'Sector 14 Gurgaon',
    'DLF Phase 1',
    'DLF Phase 2',
    'DLF Phase 3',
    'DLF Phase 4',
    'DLF Phase 5',
    'Sohna Road',
    'MG Road',
    'Golf Course Road',
    'Cyber City',
    'Sector 29',
    'Sector 56',
    'Sector 57',
    'Palam Vihar',
    'South City',
    'Nirvana Country',
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
      name: 'Which is the best NEET coaching in Gurgaon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum Biology Academy offers specialized NEET biology coaching easily accessible from Gurgaon. With 15+ years of experience, AIIMS-trained faculty, 98% success rate, and metro connectivity from HUDA City Centre, we have helped 680+ Gurgaon students get into top medical colleges including AIIMS, MAMC, and Lady Hardinge.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can Gurgaon students reach Cerebrum Biology Academy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our Gurugram center is located at M2K Corporate Park, Sector 51 (Mayfield Garden) - conveniently accessible from all Gurgaon areas. Just 10-15 minutes from DLF Phases, Cyber City, and Golf Course Road. Near HUDA City Centre Metro Station. No need to travel to Delhi!',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer weekend batches for Gurgaon students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer special weekend batches (Saturday and Sunday) designed specifically for Gurgaon students to balance school and NEET preparation. Weekend batches include intensive 4-hour sessions with complete syllabus coverage, weekly tests, and dedicated doubt-clearing sessions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fee structure for NEET coaching from Gurgaon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our NEET coaching fees range from ₹48,000 to ₹1,56,000 depending on class and program tier. Class 11: ₹48,000-₹98,000, Class 12: ₹70,000-₹1,56,000, Dropper: ₹85,000-₹1,56,000. We offer merit-based scholarships up to 50% and flexible EMI options for Gurgaon students.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to reach your Gurugram center?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our Gurugram center at M2K Corporate Park, Sector 51 is just 10-15 minutes from most Gurgaon localities. From DLF Phases: 10-12 min, Cyber City: 8-10 min, Golf Course Road: 10-12 min, Sohna Road: 12-15 min. We are near HUDA City Centre Metro for students using public transport.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the batch size for Gurgaon students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We maintain small batches of maximum 15-20 students to ensure personalized attention for each Gurgaon student. This allows our faculty to track individual progress, provide customized doubt resolution, and give one-on-one mentorship - crucial for NEET success.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide study material for Gurgaon students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide comprehensive NEET Biology study material including NCERT-based notes, topic-wise practice questions, previous 15 years NEET papers, biology diagrams booklet, and monthly test series. All material is included in course fees and available both in print and digital formats for Gurgaon students.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the success rate of Gurgaon students at Cerebrum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our Gurgaon students achieve 98% NEET qualification rate with an average score improvement of 105+ marks. In 2024, 680+ students from Gurgaon areas (DLF, Cyber City, Sohna Road, Golf Course Road) secured admissions to top medical colleges including AIIMS, MAMC, UCMS, and Lady Hardinge.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I take a demo class before enrolling from Gurgaon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer free demo classes for Gurgaon students. You can attend a full 2-hour live class, meet our faculty, experience our teaching methodology, and interact with current students. Book your demo class online or call +91-88264-44334. Weekend demo slots are available for Gurgaon students.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the class timings for weekend batches from Gurgaon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Weekend batches for Gurgaon students run on Saturdays and Sundays from 9:00 AM to 1:00 PM or 2:00 PM to 6:00 PM. Each session includes 3 hours of teaching plus 1 hour of doubt clearing. We also offer hybrid mode - weekend offline classes combined with weekday online sessions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer online classes for Gurgaon students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer live online classes via Zoom for Gurgaon students who prefer remote learning. Online batches include live interactive sessions, recorded lectures for revision, digital study material, online doubt clearing, and regular online tests. You can also opt for hybrid mode combining weekend offline and weekday online classes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Cerebrum different from other NEET coaching institutes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum stands out with AIIMS-trained faculty with 15+ years experience, exclusive focus on NEET Biology (not multi-subject coaching), small batches (15-20 students only), 98% success rate, personalized mentoring, metro accessibility from Gurgaon, and proven track record of 680+ Gurgaon students in medical colleges.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should Gurgaon students start NEET Biology preparation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ideally, start NEET Biology coaching from Class 11 to build strong fundamentals. However, we also offer intensive programs for Class 12 students (1-year) and droppers (target batch). Starting early in Class 11 allows gradual concept building, better retention, and more practice time - our Gurgaon students who start in Class 11 show 25% higher average scores.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide doubt clearing sessions for Gurgaon students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide dedicated daily doubt clearing sessions (1 hour after each class), WhatsApp doubt support (response within 2 hours), and one-on-one mentoring sessions (twice a month). Gurgaon students can also schedule extra doubt sessions on weekdays via video call if needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which schools from Gurgaon have students at Cerebrum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We have students from top Gurgaon schools including DPS Gurgaon (Sectors 45 and 56), The Shri Ram School (DLF Phase 2), Pathways World School (Golf Course Road), GD Goenka World School, Suncity School, Heritage School, Amity International, Scottish High, and Blue Bells School.',
      },
    },
  ],
}

const gurgaonAreas = [
  { name: 'DLF Phase 1-5', distance: '10-12 min drive', description: 'Premium residential areas' },
  { name: 'Sector 14', distance: '15 min drive', description: 'Near HUDA City Centre' },
  { name: 'MG Road', distance: '12-15 min drive', description: 'Commercial hub' },
  { name: 'Sohna Road', distance: '12-15 min drive', description: 'Growing residential corridor' },
  { name: 'Golf Course Road', distance: '10-12 min drive', description: 'Premium locality' },
  { name: 'Cyber City', distance: '8-10 min drive', description: 'IT hub area' },
  { name: 'Palam Vihar', distance: '20-25 min drive', description: 'Near Dwarka Expressway' },
  { name: 'South City', distance: '10-12 min drive', description: 'Near Sohna Road' },
]

const features = [
  {
    icon: Award,
    title: 'Expert Faculty',
    description: 'Learn from experienced NEET biology experts with 15+ years experience',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Limited batch size of 15-20 students for personalized attention',
  },
  {
    icon: BookOpen,
    title: 'Complete Material',
    description: 'Comprehensive study material with NCERT focus',
  },
  {
    icon: Clock,
    title: 'Weekend Batches',
    description: 'Special weekend batches for Gurgaon students',
  },
]

export default function NEETCoachingGurgaonPage() {
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
            <div
              className="text-center max-w-4xl mx-auto animate-fadeInUp"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">NEET Coaching for Gurgaon Students</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best NEET Coaching in Gurgaon - Expert Biology Classes
              </h1>

              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Join Cerebrum Biology Academy at our dedicated Gurugram center - M2K Corporate Park,
                Sector 51. Just 10-15 minutes from DLF, Cyber City, and Golf Course Road. No need
                to travel to Delhi! Weekend batches available for working professionals&apos; children.
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

        {/* Why Gurgaon Students Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-12 animate-fadeInUp"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Why Gurgaon Students Choose Cerebrum Biology Academy
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Convenient metro connectivity and weekend batches make it easy for Gurgaon students
                to access quality NEET coaching.
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

        {/* Video Testimonials Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-12 animate-fadeInUp"
            >
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Play className="w-4 h-4 mr-2" />
                Real Success Stories
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Watch Success Stories from Gurgaon Students
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear directly from NEET achievers who traveled from DLF Phases, Cyber City, and Golf
                Course Road to achieve their medical college dreams
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                {
                  youtubeId: 'bk6wQCh6b9w',
                  student: 'Sadhna Sirin',
                  score: '695/720',
                  achievement: 'Delhi-NCR Topper NEET 2023',
                  percentile: '100 Percentile Biology',
                },
                {
                  youtubeId: 'NfhkGqOQXzk',
                  student: 'Abhisek',
                  score: 'AFMC Selection',
                  achievement: 'Armed Forces Medical College',
                  percentile: 'Pune Campus',
                },
                {
                  youtubeId: 't5F8RBuHITM',
                  student: 'Nishita',
                  score: 'Medical College',
                  achievement: '6-Month Intensive Program',
                  percentile: 'Quick Success Story',
                },
              ].map((video, index) => (
                <div
                  key={video.youtubeId}
                  className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 group hover:shadow-2xl transition-all duration-300 animate-fadeInUp"
                >
                  <LazyYouTubeEmbed
                    videoId={video.youtubeId}
                    title={`${video.student} NEET Success Story`}
                    playButtonSize="md"
                  />
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{video.student}</h3>
                    <p className="text-green-600 font-semibold mb-1">{video.score}</p>
                    <p className="text-gray-600 text-sm mb-1">{video.achievement}</p>
                    <p className="text-green-700 text-xs font-medium">{video.percentile}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="text-center animate-fadeInUp"
            >
              <a
                href="https://www.youtube.com/@cerebrumbiologyacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Play className="w-6 h-6" />
                Watch More Success Stories on YouTube
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Connectivity from Gurgaon Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-12 animate-fadeInUp"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Gurugram Center - M2K Corporate Park, Sector 51
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Conveniently located in the heart of Gurugram. Just 10-15 minutes from most
                localities. Near HUDA City Centre Metro for those using public transport.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {gurgaonAreas.map((area, index) => (
                <div
                  key={area.name}
                  className="bg-white rounded-lg p-4 shadow-md border border-gray-100 animate-fadeInUp"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Train className="w-5 h-5 text-yellow-600" />
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

            <div
              className="mt-8 bg-green-50 rounded-xl p-6 border border-green-200 animate-fadeInUp"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Our Gurugram Center Location</h3>
                  <p className="text-gray-600">
                    <strong>Address:</strong> Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51
                    <br />
                    <strong>Landmark:</strong> Near HUDA City Centre Metro Station
                    <br />
                    <span className="text-green-600 font-medium">
                      Just 10-15 minutes from most Gurgaon localities - no need to travel to Delhi!
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gurgaon Schools We Serve */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-12 animate-fadeInUp"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Students from Top Gurgaon Schools
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We proudly serve students from leading schools across Gurgaon
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'DPS Gurgaon',
                'The Shri Ram School',
                'Pathways World School',
                'GD Goenka World School',
                'Suncity School',
                'Heritage School',
                'Blue Bells School',
                'Amity International',
                'Scottish High',
                'Shikshantar School',
                'DAV Public School',
                'Ryan International',
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

        {/* Google Business Profile & Reviews Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-12 animate-fadeInUp"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trusted by Gurgaon Families
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See what students and parents from DLF Phases, Cyber City, and Sohna Road are saying
                about us
              </p>
            </div>

            {/* Google Rating & Reviews Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Google Rating Card */}
              <div
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 border border-blue-100 animate-fadeInUp"
              >
                <div className="flex items-center justify-center mb-6">
                  <Image
                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                    alt="Google"
                    width={92}
                    height={30}
                    className="h-10 w-auto"
                    unoptimized
                  />
                </div>
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-gray-900 mb-3">4.9</div>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-7 h-7 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 font-semibold text-lg mb-2">Based on 500+ reviews</p>
                  <p className="text-sm text-gray-500">
                    Verified reviews from students and parents across Gurgaon
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.google.com/search?q=cerebrum+biology+academy+reviews"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    Read All Reviews on Google
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.google.com/search?q=cerebrum+biology+academy+write+review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Write a Review
                  </a>
                </div>
              </div>

              {/* Recent Reviews Highlights */}
              <div
                className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl p-8 border border-green-100 animate-fadeInUp"
              >
                <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  Recent Reviews from Gurgaon
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      text: 'Best NEET Biology coaching in Gurgaon! The Sector 51 center is just 10 minutes from our home in DLF Phase 3. Small batch of 15 students meant personalized attention. My son scored 668/720 in NEET 2024 and got MAMC Delhi. No need to travel to Delhi anymore!',
                      author: 'Parent',
                      location: 'DLF Phase 3, Gurgaon',
                      rating: 5,
                    },
                    {
                      text: 'Weekend batches at the M2K Corporate Park center are perfect for us from Cyber City - just 8 minutes away! My daughter balances school and NEET prep beautifully. The AIIMS trained faculty helped her score 675 in mock tests. Very professional!',
                      author: 'Rajesh K.',
                      location: 'Cyber City, Gurgaon',
                      rating: 5,
                    },
                    {
                      text: "Joined from Sohna Road - the Sector 51 center is just 12 minutes drive! Hybrid mode works great - weekend offline classes and weekday online. Dr. Shekhar Sir's teaching is excellent. My son improved from 540 to 650 marks!",
                      author: 'Meena S.',
                      location: 'Sohna Road, Gurgaon',
                      rating: 5,
                    },
                    {
                      text: "Being from The Shri Ram School Gurgaon, I needed coaching that complemented my school syllabus. The Gurugram center is so convenient. Cerebrum's focus on NCERT and conceptual clarity helped me score 360/360 in Biology. Got into UCMS Delhi!",
                      author: 'Ananya V.',
                      location: 'DLF Phase 2, Gurgaon',
                      rating: 5,
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                      <div className="flex gap-1 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-2 italic">
                        &quot;{review.text}&quot;
                      </p>
                      <p className="text-xs text-gray-600 font-medium">
                        - {review.author}, {review.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Maps & Contact Info */}
            <div
              className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-xl overflow-hidden border border-yellow-100 animate-fadeInUp"
            >
              <div className="grid lg:grid-cols-2">
                {/* Map */}
                <div className="relative h-96 lg:h-auto bg-gray-100">
                  <LazyGoogleMap
                    embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.8904729344643!2d77.0426!3d28.4295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19e3f6f5f5f5%3A0x1234567890abcdef!2sM2K%20Corporate%20Park%2C%20Sector%2051%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                    title="NEET Coaching Center Location - Gurugram"
                    height={400}
                    placeholder={{
                      lat: 28.4295,
                      lng: 77.0426,
                      address: "M2K Corporate Park, Sector 51, Gurugram"
                    }}
                  />
                </div>

                {/* Contact Details */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Our Gurugram Center - Right in Your City!
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Address</p>
                        <p className="text-gray-600 leading-relaxed">
                          Cerebrum Biology Academy
                          <br />
                          Unit 17, M2K Corporate Park
                          <br />
                          Mayfield Garden, Sector 51
                          <br />
                          Gurugram, Haryana - 122018
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Phone</p>
                        <a
                          href="tel:+918826444334"
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          +91-88264-44334
                        </a>
                        <p className="text-sm text-gray-500 mt-1">Mon-Sat: 9 AM - 7 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MessageCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Email</p>
                        <a
                          href="mailto:info@cerebrumbiologyacademy.com"
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          info@cerebrumbiologyacademy.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Travel Time from Your Area</p>
                        <p className="text-gray-600">
                          <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-1">
                            DLF Phases
                          </span>
                          10-12 min drive
                          <br />
                          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-1">
                            Cyber City
                          </span>
                          8-10 min drive
                          <br />
                          <span className="text-green-600 font-medium">
                            Near HUDA City Centre Metro for public transport
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <a
                        href="https://maps.google.com/?q=M2K+Corporate+Park+Sector+51+Gurugram"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors w-full justify-center"
                      >
                        <MapPin className="w-5 h-5" />
                        Get Directions to Gurugram Center
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Success Stories from Gurgaon Students */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-12 animate-fadeInUp"
            >
              <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Trophy className="w-4 h-4 mr-2" />
                Proven Transformations
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Success Stories from Gurgaon Students
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real students, real scores, real transformations. See how Gurgaon students achieved
                their NEET dreams with our coaching
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-10">
              {/* Story 1: Rajat Malhotra */}
              <div
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100 hover:shadow-2xl transition-all duration-300 animate-fadeInUp"
              >
                <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-4xl font-bold mb-1">+165</div>
                      <div className="text-sm opacity-90">Mark Improvement</div>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="opacity-75">Before</div>
                      <div className="text-2xl font-bold">520</div>
                    </div>
                    <ArrowRight className="w-6 h-6" />
                    <div>
                      <div className="opacity-75">After</div>
                      <div className="text-2xl font-bold">685</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Rajat Malhotra</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <School className="w-4 h-4" />
                      DPS Gurgaon, Sector 56
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                      <Trophy className="w-4 h-4" />
                      AIR 720 | UCMS Delhi
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed italic mb-4">
                    &quot;I joined Cerebrum from DPS Gurgaon after scoring only 520 in my first NEET
                    attempt. I was devastated and considering dropping the medical dream. The
                    weekend batches from Gurgaon were perfect as I could balance my repeater year.
                    Dr. Shekhar Sir&apos;s teaching transformed my understanding of Biology -
                    especially Genetics and Evolution which were my weak areas. The personalized
                    doubt sessions after every class helped me clarify concepts immediately. Within
                    12 months, I improved by 165 marks and secured AIR 720, getting admission to
                    UCMS Delhi. The metro journey from Sector 56 was totally worth it!&quot;
                  </p>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Story 2: Ananya Verma */}
              <div
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100 hover:shadow-2xl transition-all duration-300 animate-fadeInUp"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-4xl font-bold mb-1">+72</div>
                      <div className="text-sm opacity-90">Mark Improvement</div>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="opacity-75">Before</div>
                      <div className="text-2xl font-bold">600</div>
                    </div>
                    <ArrowRight className="w-6 h-6" />
                    <div>
                      <div className="opacity-75">After</div>
                      <div className="text-2xl font-bold">672</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ananya Verma</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <School className="w-4 h-4" />
                      The Shri Ram School, DLF Phase 2
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
                      <Trophy className="w-4 h-4" />
                      AIR 950 | Lady Hardinge Medical College
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed italic mb-4">
                    &quot;Coming from The Shri Ram School in DLF Phase 2, I had a strong academic
                    background but struggled with NEET-specific Biology preparation. I scored 600 in
                    my first mock test and knew I needed specialized coaching. The weekend batches
                    at Cerebrum fit perfectly with my school schedule. What impressed me most was
                    the NCERT-focused approach - every question was traced back to NCERT
                    fundamentals. The small batch size (only 15 students) meant I could ask
                    questions freely. The comprehensive study material and weekly tests helped me
                    track my progress. My score improved to 672, securing AIR 950 and admission to
                    Lady Hardinge Medical College!&quot;
                  </p>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Story 3: Kabir Khanna */}
              <div
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100 hover:shadow-2xl transition-all duration-300 animate-fadeInUp"
              >
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-4xl font-bold mb-1">+80</div>
                      <div className="text-sm opacity-90">Mark Improvement</div>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="opacity-75">Before</div>
                      <div className="text-2xl font-bold">610</div>
                    </div>
                    <ArrowRight className="w-6 h-6" />
                    <div>
                      <div className="opacity-75">After</div>
                      <div className="text-2xl font-bold">690</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Kabir Khanna</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <School className="w-4 h-4" />
                      Pathways World School, Golf Course Road
                    </div>
                    <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
                      <Trophy className="w-4 h-4" />
                      AIR 510 | AIIMS Delhi
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed italic mb-4">
                    &quot;As a student from Pathways World School on Golf Course Road, I initially
                    tried self-study and scored 610 in my first mock. I realized I needed expert
                    guidance to crack AIIMS. Cerebrum&apos;s reputation and metro accessibility made
                    it my choice. The faculty&apos;s AIIMS background was crucial - they knew
                    exactly what AIIMS/NEET emphasizes. The daily practice sessions, previous year
                    question analysis, and strategic revision helped me identify high-yield topics.
                    What set Cerebrum apart was the personalized mentorship - my weak areas (Ecology
                    and Biotechnology) were specifically addressed with extra practice sheets.
                    Scored 690 with AIR 510 and achieved my dream of AIIMS Delhi!&quot;
                  </p>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Average Improvement Stats */}
            <div
              className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100 max-w-4xl mx-auto animate-fadeInUp"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Average Improvement: Gurgaon Students
                </h3>
                <p className="text-gray-600">
                  Students from DLF, Cyber City, and Golf Course Road consistently achieve 100+ mark
                  improvements
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">+105</div>
                  <div className="text-gray-700 font-semibold">Average Score Gain</div>
                  <div className="text-sm text-gray-500">From Gurgaon Students</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                  <div className="text-gray-700 font-semibold">Success Rate</div>
                  <div className="text-sm text-gray-500">NEET Qualification 2024</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">680+</div>
                  <div className="text-gray-700 font-semibold">Gurgaon Students</div>
                  <div className="text-sm text-gray-500">In Medical Colleges</div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Success Story from Gurgaon
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-12 animate-fadeInUp"
            >
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Award className="w-4 h-4 mr-2" />
                Why Choose Cerebrum from Gurgaon
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trusted by Thousands Across Gurgaon
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your success is our mission. Here&apos;s why Gurgaon students choose us
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Badge 1: Years of Excellence */}
              <div
                className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group animate-fadeInUp"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">Years of Excellence</div>
                <p className="text-sm text-gray-600">
                  Established NEET coaching institute serving Gurgaon students since 2009
                </p>
              </div>

              {/* Badge 2: Gurgaon Students */}
              <div
                className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group animate-fadeInUp"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">680+</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">Gurgaon Students</div>
                <p className="text-sm text-gray-600">
                  Successfully placed in top medical colleges from DLF, Cyber City, Golf Course Road
                </p>
              </div>

              {/* Badge 3: Google Rating */}
              <div
                className="bg-white rounded-2xl shadow-xl p-8 border border-yellow-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group animate-fadeInUp"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-white fill-current" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">Google Rating</div>
                <p className="text-sm text-gray-600">
                  Based on 500+ verified reviews from satisfied students and parents
                </p>
              </div>

              {/* Badge 4: AIIMS Faculty */}
              <div
                className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group animate-fadeInUp"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">AIIMS</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">Trained Faculty</div>
                <p className="text-sm text-gray-600">
                  Expert teachers from AIIMS and top medical colleges with 15+ years experience
                </p>
              </div>

              {/* Badge 5: Success Rate */}
              <div
                className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group animate-fadeInUp"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">NEET Success Rate</div>
                <p className="text-sm text-gray-600">
                  2024 batch qualification rate - among the highest in NCR region
                </p>
              </div>

              {/* Badge 6: Local Gurugram Center */}
              <div
                className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group animate-fadeInUp"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">10-15 min</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">Local Gurugram Center</div>
                <p className="text-sm text-gray-600">
                  M2K Corporate Park, Sector 51 - no need to travel to Delhi!
                </p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div
              className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl animate-fadeInUp"
            >
              <h3 className="text-2xl font-bold mb-3">Join 680+ Successful Gurgaon Students</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Experience metro-accessible NEET coaching with proven results. Book your free demo
                class today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Book Free Demo Class
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-400 transition-colors border-2 border-white/30"
                >
                  <Phone className="w-5 h-5" />
                  Call: 88264 44334
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Localities Spotlight */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-12 animate-fadeInUp"
            >
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Building2 className="w-4 h-4 mr-2" />
                Serving Premium Gurgaon Localities
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Neighbors Are Already Succeeding
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Students from DLF Phases, Cyber City, and Sohna Road trust Cerebrum for their NEET
                preparation. See what makes us the preferred choice.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* DLF Phases Card */}
              <div
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl overflow-hidden border border-blue-100 hover:shadow-2xl transition-all duration-300 animate-fadeInUp"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">DLF Phases 1-5</h3>
                      <p className="text-blue-100 text-sm">Premium Residential Areas</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Building2 className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">420+</div>
                  <div className="text-sm opacity-90">Students in Medical Colleges</div>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">Distance to Center</p>
                        <p className="text-gray-600 text-sm">
                          Just 10-12 minutes drive to our Sector 51 center
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">Convenience</p>
                        <p className="text-gray-600 text-sm">
                          No need to travel to Delhi - local Gurugram coaching!
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Trophy className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">Top Achievement</p>
                        <p className="text-gray-600 text-sm">
                          Rajat M. (DLF Phase 3) - 685/720, UCMS Delhi
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-sm text-gray-700 italic">
                      &quot;The Sector 51 center is just 10 minutes from our DLF Phase 3 home.
                      Weekend batches fit perfectly with my school schedule.&quot;
                    </p>
                    <p className="text-xs text-gray-600 mt-2 font-medium">- Parent, DLF Phase 2</p>
                  </div>
                </div>
              </div>

              {/* Cyber City & Golf Course Road Card */}
              <div
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-xl overflow-hidden border border-green-100 hover:shadow-2xl transition-all duration-300 animate-fadeInUp"
              >
                <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Cyber City & Golf Course</h3>
                      <p className="text-green-100 text-sm">IT Hub & Premium Locality</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Building2 className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">180+</div>
                  <div className="text-sm opacity-90">Students in Medical Colleges</div>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">Distance to Center</p>
                        <p className="text-gray-600 text-sm">
                          Just 8-10 minutes drive to our Sector 51 center
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">Convenience</p>
                        <p className="text-gray-600 text-sm">
                          Closest locality to our M2K Corporate Park center
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Trophy className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">Top Achievement</p>
                        <p className="text-gray-600 text-sm">
                          Kabir K. (Golf Course Road) - 690/720, AIIMS Delhi
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <p className="text-sm text-gray-700 italic">
                      &quot;The M2K Corporate Park center is just 8 minutes from Cyber City.
                      My daughter balances school and NEET prep beautifully.&quot;
                    </p>
                    <p className="text-xs text-gray-600 mt-2 font-medium">
                      - Rajesh K., Cyber City
                    </p>
                  </div>
                </div>
              </div>

              {/* Sohna Road & New Gurgaon Card */}
              <div
                className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 animate-fadeInUp"
              >
                <div className="bg-gradient-to-r from-orange-600 to-yellow-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Sohna Road & New Gurgaon</h3>
                      <p className="text-orange-100 text-sm">Growing Residential Corridor</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Building2 className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">80+</div>
                  <div className="text-sm opacity-90">Students in Medical Colleges</div>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">Distance to Center</p>
                        <p className="text-gray-600 text-sm">
                          Just 12-15 minutes drive to our Sector 51 center
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">Convenience</p>
                        <p className="text-gray-600 text-sm">
                          Easy access via Golf Course Extension Road
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Trophy className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">Top Achievement</p>
                        <p className="text-gray-600 text-sm">
                          Meena S. (Sohna Road) - Son improved 540→650 marks
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                    <p className="text-sm text-gray-700 italic">
                      &quot;The Sector 51 center is just 12 minutes from Sohna Road.
                      Hybrid mode works perfectly for us.&quot;
                    </p>
                    <p className="text-xs text-gray-600 mt-2 font-medium">- Meena S., Sohna Road</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div
              className="mt-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-2xl animate-fadeInUp"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">All Gurgaon Areas Covered</h3>
                <p className="text-gray-300">
                  Students from every corner of Gurgaon reach our Sector 51 center in just 10-15 minutes
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-400 mb-1">680+</div>
                  <div className="text-sm text-gray-300">Total Gurgaon Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-1">10-15 min</div>
                  <div className="text-sm text-gray-300">Average Travel Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-1">Weekend</div>
                  <div className="text-sm text-gray-300">Batches Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-1">98%</div>
                  <div className="text-sm text-gray-300">NEET Success Rate</div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
                >
                  Book Your Free Demo from Gurgaon
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Free NEET Tools Section */}
        <NEETToolsWidget
          title="Free NEET Preparation Tools"
          subtitle="Boost your preparation with our AI-powered tools - 100% Free for Gurgaon students"
        />

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-12 animate-fadeInUp"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions - NEET Coaching Gurgaon
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

        {/* CTA Section */}
        <section className="py-16 bg-[#4a5d4a] text-white">
          <div className="container mx-auto px-4 text-center">
            <div
             className="animate-fadeInUp">
              <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey from Gurgaon</h2>
              <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                Join the growing community of successful NEET aspirants from Gurgaon. Book your free
                demo class today and experience the Cerebrum difference.
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

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20NEET%20Biology%20coaching%20from%20Gurgaon.%20I'd%20like%20to%20know%20more%20about%20weekend%20batches%20and%20metro%20connectivity."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 group animate-fadeInUp"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
        </a>
      </div>

      {/* Video Testimonial Schemas for SEO */}
      <VideoSchema
        name="Sadhna Sirin - 695/720 NEET 2023 Delhi-NCR Topper Testimonial"
        description="Watch Sadhna Sirin share her NEET 2023 success story. She scored 695/720 with 100 percentile in Biology, becoming the Delhi-NCR topper. Learn how Cerebrum Biology Academy helped her achieve this remarkable score."
        thumbnailUrl="https://img.youtube.com/vi/bk6wQCh6b9w/maxresdefault.jpg"
        uploadDate="2023-07-15"
        duration="PT8M30S"
        embedUrl="https://www.youtube.com/embed/bk6wQCh6b9w"
      />
      <VideoSchema
        name="Abhisek - AFMC Selection Success Story"
        description="Abhisek shares his journey to Armed Forces Medical College (AFMC) Pune. Watch how focused Biology preparation at Cerebrum helped him crack one of India's most prestigious medical institutions."
        thumbnailUrl="https://img.youtube.com/vi/NfhkGqOQXzk/maxresdefault.jpg"
        uploadDate="2023-08-20"
        duration="PT6M45S"
        embedUrl="https://www.youtube.com/embed/NfhkGqOQXzk"
      />
      <VideoSchema
        name="Nishita - Medical College in Just 6 Months"
        description="Nishita shares how she secured admission to a medical college through the 6-month intensive NEET program at Cerebrum Biology Academy. A quick success story for NEET aspirants."
        thumbnailUrl="https://img.youtube.com/vi/t5F8RBuHITM/maxresdefault.jpg"
        uploadDate="2024-01-10"
        duration="PT5M20S"
        embedUrl="https://www.youtube.com/embed/t5F8RBuHITM"
      />
    </>
  )
}
