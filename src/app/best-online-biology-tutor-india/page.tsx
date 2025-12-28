'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  Laptop,
  Clock,
  Headphones,
  FileText,
  BarChart,
  GraduationCap,
  Target,
  Award,
  Globe,
  Zap,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

const whyBest = [
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from Dr. Shekhar C Singh, AIIMS Alumnus with 15+ years of teaching excellence.',
  },
  {
    icon: Trophy,
    title: 'Proven Results',
    description: '5000+ students trained, 98% success rate in NEET with top 1000 AIR selections.',
  },
  {
    icon: Video,
    title: 'Live Interactive',
    description: 'Real-time classes with instant doubt resolution, not pre-recorded videos.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Maximum 25 students per batch for personalized attention and mentoring.',
  },
  {
    icon: Globe,
    title: 'Pan-India Access',
    description: 'Students from 100+ cities across India learning from the best.',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Structured curriculum, regular assessments, and guaranteed improvement.',
  },
]

const courses = [
  {
    title: 'NEET 2025-2029',
    description: 'Comprehensive NEET Biology preparation',
    highlight: 'Most Popular',
  },
  {
    title: 'Class 11-12 Biology',
    description: 'Board + NEET integrated preparation',
    highlight: 'Foundation',
  },
  {
    title: 'Dropper Course',
    description: 'Intensive program for repeat aspirants',
    highlight: 'High Success',
  },
  {
    title: 'Class 9-10 Biology',
    description: 'Early foundation building for future NEET',
    highlight: 'Start Early',
  },
]

const studentLocations = [
  'Delhi NCR',
  'Mumbai',
  'Bangalore',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Pune',
  'Jaipur',
  'Lucknow',
  'Chandigarh',
  'Kota',
  'Patna',
  'Bhopal',
  'Ahmedabad',
  'Tier 2 & 3 Cities',
]

const faqs = [
  {
    question: 'Why is Dr. Shekhar Singh considered the best online Biology tutor in India?',
    answer:
      'Dr. Shekhar C Singh is an AIIMS Alumnus and former Narayana Academic Head with 15+ years of experience. He has trained 5000+ students with a 98% NEET success rate. His teaching methodology, developed at premier institutes, is now accessible to students across India through online classes.',
  },
  {
    question: 'How do online classes compare to Kota coaching?',
    answer:
      'Our online classes offer the same quality of teaching as top Kota institutes, but with added advantages: no relocation costs, flexible timing, recorded lectures for revision, and personalized attention in small batches. Many of our students have outperformed traditional coaching students.',
  },
  {
    question: 'Can students from any city in India join?',
    answer:
      'Yes! We have students from 100+ cities across India - from metros like Delhi, Mumbai, Bangalore to tier 2 and tier 3 cities. All you need is a stable internet connection. Our timing options accommodate different time zones.',
  },
  {
    question: 'What makes your online teaching methodology effective?',
    answer:
      'Our methodology combines: (1) Concept-first teaching with visual learning, (2) NCERT-focused approach for strong foundation, (3) Regular testing with performance tracking, (4) 24/7 doubt support via WhatsApp, and (5) Personalized mentoring in small batches.',
  },
  {
    question: 'What is the fee structure for online classes?',
    answer:
      'Our fees are competitive compared to premier offline coaching while offering superior personalized attention. We offer flexible payment plans and EMI options. Contact us for detailed fee structure based on your course selection.',
  },
]

export default function BestOnlineBiologyTutorIndiaPage() {
  const heroAnim = useScrollAnimation()
  const whyBestHeaderAnim = useScrollAnimation()
  const coursesHeaderAnim = useScrollAnimation()
  const locationsHeaderAnim = useScrollAnimation()
  const faqsHeaderAnim = useScrollAnimation()
  const ctaAnim = useScrollAnimation()

  return (
    <div className="min-h-screen">
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
            name: 'Cerebrum Biology Academy',
            description: 'Best Online Biology Tutor in India for NEET',
            url: 'https://cerebrumbiologyacademy.com',
            areaServed: {
              '@type': 'Country',
              name: 'India',
            },
            founder: {
              '@type': 'Person',
              name: 'Dr. Shekhar C Singh',
              description: 'AIIMS Alumnus, Former Narayana Academic Head',
              alumniOf: 'AIIMS',
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            ref={heroAnim.ref}
            className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
              heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              #1 Rated Biology Tutor in India
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best Online Biology Tutor{' '}
              <span className="text-yellow-400">in India</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              AIIMS Faculty | 5000+ Students | 98% NEET Success Rate
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Join India's top-rated online Biology classes with{' '}
              <strong>Dr. Shekhar C Singh, AIIMS Alumnus and former Narayana Academic Head</strong>.
              World-class NEET preparation accessible from anywhere in India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View All Courses
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">5000+</div>
                <div className="text-sm opacity-80">Students Trained</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Target className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">NEET Success</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Globe className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm opacity-80">Cities in India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Best */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={whyBestHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              whyBestHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why We're India's Best
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What sets Cerebrum Biology Academy apart from other online coaching
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyBest.map((item, index) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={coursesHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              coursesHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Courses Available Pan-India
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {courses.map((course, index) => (
              <div
                key={course.title}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {course.highlight}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Students From */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={locationsHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              locationsHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Students From Across India
            </h2>
            <p className="text-xl text-gray-600">
              Join students from 100+ cities learning from India's best Biology tutor
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {studentLocations.map((location, index) => (
              <div
                key={location}
                className="bg-white px-6 py-3 rounded-full shadow-md flex items-center animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-gray-800 font-medium">{location}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            ref={faqsHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              faqsHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">FAQs</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl p-8 shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-green-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-700 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            ref={ctaAnim.ref}
            className={`transition-all duration-600 ${
              ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Learn from India's Best!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 5000+ successful students. Book your free demo class today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/online-biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Online Biology Tutor
            </Link>
            <Link
              href="/online-biology-tutor-neet"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Online Tutor
            </Link>
            <Link
              href="/courses"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              All Courses
            </Link>
            <Link
              href="/about"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              About Dr. Shekhar
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
