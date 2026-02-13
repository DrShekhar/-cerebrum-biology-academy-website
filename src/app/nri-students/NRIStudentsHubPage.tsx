'use client'

import { useState } from 'react'
import {
  Globe,
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Phone,
  Plane,
  Brain,
  Target,
  FileText,
  Shield,
  Sparkles,
  Calendar,
  Send,
  ChevronDown,
  HelpCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { nriCountriesData, nriRegions } from '@/data/nriCountries'

const regions = [
  {
    name: 'Middle East (Gulf)',
    description: 'UAE, Saudi Arabia, Kuwait, Qatar, Oman, Bahrain',
    countries: nriRegions['Middle East'],
    studentCount: '600+',
    highlight: 'NEET Centers Available',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    name: 'Southeast Asia',
    description: 'Singapore, Malaysia, Thailand, Indonesia',
    countries: nriRegions['Southeast Asia'],
    studentCount: '120+',
    highlight: 'GIIS Network',
    color: 'bg-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    name: 'South Asia',
    description: 'Nepal',
    countries: nriRegions['South Asia'],
    studentCount: '100+',
    highlight: 'Same Timezone',
    color: 'blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    name: 'Africa',
    description: 'Nigeria, Kenya, Tanzania',
    countries: nriRegions['Africa'],
    studentCount: '50+',
    highlight: 'Lagos NEET Center',
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching via Zoom with instant doubt resolution. All classes recorded.',
    color: 'bg-blue-500',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Multiple batch timings across time zones. IST evening works for most regions.',
    color: 'bg-amber-500',
  },
  {
    icon: GraduationCap,
    title: 'AIIMS Trained Faculty',
    description: "Expert doctors from India's top medical institutions with 15+ years experience.",
    color: 'bg-green-600',
  },
  {
    icon: BookOpen,
    title: 'Digital Study Material',
    description: 'Complete NCERT-based notes, accessible anywhere. 10,000+ practice questions.',
    color: 'bg-purple-500',
  },
  {
    icon: Globe,
    title: 'NEET Centers Abroad',
    description: '14 international NEET exam centers. Write exam in your country.',
    color: 'bg-red-500',
  },
  {
    icon: Award,
    title: 'NRI Quota Guidance',
    description: 'Complete support for NRI quota admissions in Indian medical colleges.',
    color: 'bg-indigo-500',
  },
]

const stats = [
  { label: 'Countries Served', value: '14+', icon: Globe },
  { label: 'NRI Students', value: '900+', icon: Users },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'AIIMS Faculty', value: '15+ Yrs', icon: Star },
]

const courses = [
  {
    name: 'Class 9th Foundation',
    duration: '1 Year',
    fee: '₹58,000',
    seats: 12,
    popular: false,
  },
  {
    name: 'Class 10th Foundation',
    duration: '1 Year',
    fee: '₹68,000',
    seats: 15,
    popular: false,
  },
  {
    name: 'Class 11th NEET',
    duration: '1 Year',
    fee: '₹75,000',
    seats: 8,
    popular: true,
  },
  {
    name: 'Class 12th NEET',
    duration: '1 Year',
    fee: '₹72,000',
    seats: 10,
    popular: true,
  },
  {
    name: 'NEET Dropper',
    duration: '1 Year',
    fee: '₹85,000',
    seats: 6,
    popular: false,
  },
  {
    name: 'Crash Course',
    duration: '3-6 Months',
    fee: '₹35,000',
    seats: 20,
    popular: false,
  },
]

const testimonials = [
  {
    name: 'Arjun Sharma',
    country: 'UAE',
    score: '685/720',
    quote:
      'The flexible timings allowed me to balance school and NEET prep. Dr. Shekhar sir made Biology so interesting that I topped my class!',
    avatar: '👨‍🎓',
    college: 'AIIMS Delhi',
  },
  {
    name: 'Priya Menon',
    country: 'Saudi Arabia',
    score: '672/720',
    quote:
      'Living in Riyadh, I never thought I could get quality coaching. Cerebrum proved me wrong with their live classes and personal mentorship.',
    avatar: '👩‍🎓',
    college: 'JIPMER Puducherry',
  },
  {
    name: 'Rahul Gupta',
    country: 'Singapore',
    score: '658/720',
    quote:
      'The MCQ practice tool and rank predictor helped me track my progress. The NCERT-focused approach was exactly what I needed.',
    avatar: '👨‍🎓',
    college: 'MAMC Delhi',
  },
  {
    name: 'Sneha Nair',
    country: 'Kuwait',
    score: '665/720',
    quote:
      'Being in Kuwait with limited NEET resources, Cerebrum was a blessing. The recorded lectures helped me revise anytime, and the doubt-solving sessions were incredibly helpful.',
    avatar: '👩‍🎓',
    college: 'KMC Manipal',
  },
  {
    name: 'Aditya Krishnan',
    country: 'Qatar',
    score: '678/720',
    quote:
      'Dr. Shekhar sir\u2019s teaching style made complex topics like Genetics and Ecology so simple. The weekend batch timings perfectly suited my school schedule in Doha.',
    avatar: '👨‍🎓',
    college: 'CMC Vellore',
  },
  {
    name: 'Ananya Reddy',
    country: 'Oman',
    score: '652/720',
    quote:
      'The personalized attention and regular parent-teacher meetings kept my preparation on track. I secured admission through NRI quota with proper guidance from the team.',
    avatar: '👩‍🎓',
    college: 'KGMU Lucknow',
  },
]

const faqs = [
  {
    question: 'What are the class timings for NRI students in different time zones?',
    answer:
      'We offer flexible batch timings to accommodate students from all time zones. Weekend batches (Friday/Saturday) are available at 6:00 PM IST and 8:00 PM IST, which translates to afternoon hours for Gulf countries (2:30-4:30 PM GST) and morning/evening for Southeast Asian countries. Weekday batches run from 7:00 PM - 9:00 PM IST. All live classes are also recorded for students who miss a session.',
  },
  {
    question: 'What payment methods are available for NRI students?',
    answer:
      'We accept international payments through multiple channels: Razorpay (supports all major international credit/debit cards), PayPal, direct bank wire transfer (SWIFT), and UPI for NRI accounts. Payment can be made in INR or USD. We also offer EMI options for course fees through select banks.',
  },
  {
    question: 'How does the NRI quota work for NEET admissions?',
    answer:
      'NRI quota reserves 15% of seats in private and deemed medical colleges for NRI-sponsored candidates. The student must be an Indian citizen, and the NRI sponsor (parent/blood relative) must provide an NRI certificate. NEET qualification is mandatory. Fees under NRI quota are typically USD 15,000-25,000 per year. We provide complete guidance on documentation and admission process.',
  },
  {
    question: 'Can I appear for NEET exam from abroad?',
    answer:
      'Yes! NEET 2026 will have exam centers in 14+ countries including UAE (Dubai, Abu Dhabi, Sharjah), Saudi Arabia (Riyadh, Jeddah), Kuwait, Qatar, Oman, Bahrain, Singapore, Malaysia, Nepal, Sri Lanka, and more. You need to register with your overseas address and select the nearest international exam center.',
  },
  {
    question: 'Which board syllabus do you follow - CBSE, ICSE, or State Board?',
    answer:
      'Our curriculum is NCERT-based, which is the official syllabus for NEET. We help students from all boards (CBSE, ICSE, IB, IGCSE, State Boards) bridge any syllabus gaps. Students from IB/IGCSE particularly benefit from our comprehensive NCERT coverage as NEET is strictly based on NCERT Class 11 & 12.',
  },
  {
    question: 'How do you handle doubt clearing for students in different time zones?',
    answer:
      'We have a multi-channel doubt resolution system: 1) Live doubt sessions during class, 2) 24/7 WhatsApp doubt support with guaranteed response within 4 hours, 3) Weekly dedicated doubt-clearing sessions on weekends, 4) Recorded video explanations for frequently asked doubts. Dr. Shekhar personally addresses complex conceptual queries.',
  },
  {
    question: 'Do you provide study material and test series?',
    answer:
      'Yes, all enrolled students receive: Digital study notes (PDF), Chapter-wise MCQ banks (10,000+ questions), Full syllabus mock tests (NEET pattern), Previous year question papers (2015-2024) with solutions, Topic-wise test series, and Access to our AI-powered practice platform with rank predictor.',
  },
  {
    question: 'What if I miss a live class due to time zone issues?',
    answer:
      'All our live classes are recorded in HD quality and uploaded to the student portal within 2 hours of the session ending. You can watch recordings unlimited times till your course validity. Additionally, we provide detailed class notes and summary handouts for quick revision.',
  },
]

const blogArticles = [
  {
    title: 'Complete Guide to NEET 2026 for NRI Students',
    excerpt:
      'Everything you need to know about NEET 2026 - registration, exam centers abroad, NRI quota, and preparation strategy.',
    image: '📚',
    readTime: '8 min read',
    link: '/blog',
  },
  {
    title: 'NRI Quota Medical Admissions: A Complete Guide',
    excerpt:
      'Understand the NRI quota admission process, eligibility criteria, top colleges, and fee structure for NRI students.',
    image: '🏥',
    readTime: '10 min read',
    link: '/blog',
  },
  {
    title: 'How to Prepare for NEET from UAE & Gulf Countries',
    excerpt:
      'Time zone management, study schedule, and tips from successful NRI students who cracked NEET while living abroad.',
    image: '🌍',
    readTime: '6 min read',
    link: '/blog',
  },
]

export function NRIStudentsHubPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    country: '',
    city: '',
    whatsappNumber: '',
    email: '',
    currentClass: '',
    targetYear: 'NEET 2026',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const whatsappMessage = encodeURIComponent(
    "Hi, I'm an NRI student interested in NEET Biology coaching. Please share details about online classes, timings, and fee structure."
  )
  const whatsappLink = `https://wa.me/918826444334?text=${whatsappMessage}`

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit to API
      const response = await fetch('/api/contact/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.studentName,
          phone: formData.whatsappNumber,
          email: formData.email,
          center: 'online',
          supportType: 'admission',
          message: `NRI Lead from ${formData.country}. Class: ${formData.currentClass}. Target: ${formData.targetYear}. Parent: ${formData.parentName}. City: ${formData.city}`,
          timestamp: new Date().toISOString(),
          source: 'nri-students-page',
        }),
      })

      if (response.ok) {
        setFormSubmitted(true)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-indigo-600 text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-6xl">🇦🇪</div>
          <div className="absolute top-40 right-20 text-5xl">🇸🇦</div>
          <div className="absolute bottom-20 left-1/4 text-5xl">🇸🇬</div>
          <div className="absolute top-10 right-1/3 text-4xl">🇰🇼</div>
          <div className="absolute bottom-40 right-10 text-5xl">🇶🇦</div>
          <div className="absolute bottom-10 left-10 text-4xl">🇳🇵</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-white/80 mb-4">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>NRI Students</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div
             className="animate-fadeInUp">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Globe className="w-4 h-4 mr-2" />
                Serving NRI Students in 14+ Countries
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Crack <span className="text-yellow-300">NEET 2026</span> from Anywhere in the World
              </h1>

              <p className="text-lg opacity-90 mb-6">
                UAE | Saudi Arabia | Kuwait | Singapore | Qatar | Nepal & 8 More Countries
              </p>

              {/* Stats Pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center"
                  >
                    <stat.icon className="w-4 h-4 mr-2 text-yellow-300" />
                    <span className="font-bold mr-1">{stat.value}</span>
                    <span className="opacity-80">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-green-600 text-white hover:bg-green-600"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </Button>
                </a>
                <Link href="/demo-booking">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-indigo-600"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Book Free Demo
                  </Button>
                </Link>
                <a href="tel:+918826444334">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-indigo-600"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Column - Quick Lead Form */}
            <div
              className="bg-white rounded-2xl p-6 shadow-2xl animate-fadeInUp"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Get Free Consultation</h2>
                <p className="text-sm text-gray-600">Our counselor will call you within 1 hour</p>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Student Name *"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  />
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  >
                    <option value="">Select Country *</option>
                    {Object.entries(nriCountriesData).map(([code, country]) => (
                      <option key={code} value={country.country}>
                        {country.flag} {country.country}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="WhatsApp Number *"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  />
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    value={formData.currentClass}
                    onChange={(e) => setFormData({ ...formData, currentClass: e.target.value })}
                  >
                    <option value="">Select Class *</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Dropper">Dropper</option>
                  </select>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full bg-green-600 hover:bg-green-600 text-white py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Get Free Consultation
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-4">Our counselor will call you within 1 hour.</p>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" className="bg-green-600 text-white">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat on WhatsApp Now
                    </Button>
                  </a>
                </div>
              )}

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <Shield className="w-4 h-4 mr-1 text-green-600" />
                  Secure
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                  No Spam
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Phone className="w-4 h-4 mr-1 text-green-600" />
                  Free Call
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-12 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-8 animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-purple-100 px-4 py-2 rounded-full text-purple-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Start Your NEET Prep Journey - Free!
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Try Our Free NEET Preparation Tools
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* MCQ Practice Tool */}
            <div
             className="animate-fadeInUp">
              <Link href="/neet-biology-mcq">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Brain className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        NEET Biology MCQ Practice
                      </h3>
                      <p className="text-gray-600 mb-3">
                        10,000+ chapter-wise MCQs with detailed solutions. Practice Botany & Zoology
                        topics.
                      </p>
                      <div className="flex items-center text-purple-600 font-medium">
                        Start Practicing Free
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Rank Predictor Tool */}
            <div
             className="animate-fadeInUp">
              <Link href="/neet-rank-predictor">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        NEET Rank Predictor
                      </h3>
                      <p className="text-gray-600 mb-3">
                        Predict your NEET rank based on expected score. Get college recommendations
                        for NRI quota.
                      </p>
                      <div className="flex items-center text-blue-600 font-medium">
                        Check Your Rank
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned with Design System */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why NRI Students Choose Cerebrum
            </h2>
            <p className="text-xl text-gray-600">Everything you need to crack NEET from abroad</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fadeInUp"
              >
                <div
                  className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions & Countries Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Country
            </h2>
            <p className="text-xl text-gray-600">
              Find NEET coaching information specific to your location
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {regions.map((region, index) => (
              <div
                key={region.name}
                className={`${region.bgColor} rounded-2xl p-6 border ${region.borderColor}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{region.name}</h3>
                  <span
                    className={`bg-gradient-to-r ${region.color} text-white text-sm font-medium px-3 py-1 rounded-full`}
                  >
                    {region.highlight}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{region.description}</p>
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  {region.studentCount} Students
                </div>
                <div className="flex flex-wrap gap-2">
                  {region.countries.map((countryCode) => {
                    const country = nriCountriesData[countryCode]
                    return (
                      <Link
                        key={countryCode}
                        href={`/nri-students/${countryCode}`}
                        className="inline-flex items-center bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-sm border"
                      >
                        <span className="mr-2">{country.flag}</span>
                        {country.country}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* All Countries Grid */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              All Countries We Serve
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {Object.entries(nriCountriesData).map(([code, country]) => (
                <Link
                  key={code}
                  href={`/nri-students/${code}`}
                  className="flex flex-col items-center p-4 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200"
                >
                  <span className="text-4xl mb-2">{country.flag}</span>
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {country.country}
                  </span>
                  <span className="text-xs text-gray-500">{country.studentCount}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NRI Students Who Cracked NEET
            </h2>
            <p className="text-xl text-gray-600">Success stories from students around the world</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-indigo-50 rounded-xl p-6 border border-purple-100 animate-fadeInUp"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.country} • {testimonial.college}
                    </p>
                  </div>
                </div>
                <div className="bg-[#4a5d4a] text-white px-3 py-1 rounded-full text-sm font-bold inline-block mb-4">
                  NEET Score: {testimonial.score}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-purple-100 px-4 py-2 rounded-full text-purple-700 text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4 mr-2" />
              Common Questions from NRI Parents & Students
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about NEET preparation from abroad
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm animate-fadeInUp"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform duration-200 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div
                    className="px-6 pb-5 animate-fadeInUp"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            className="text-center mt-10 animate-fadeInUp"
          >
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link
              href={whatsappLink}
              target="_blank"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with us on WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* Courses Section with Limited Seats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-red-100 px-4 py-2 rounded-full text-red-700 text-sm font-medium mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              NEET 2026 Batches Starting Soon - Limited Seats!
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Courses for NRI Students
            </h2>
            <p className="text-xl text-gray-600">
              Classes 9th to 12th + Droppers | All Boards Welcome
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {courses.map((course, index) => (
              <div
                key={course.name}
                className={`bg-white rounded-xl shadow-lg p-6 relative ${course.popular ? 'ring-2 ring-purple-500' : ''}`}
              >
                {course.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {course.seats} Seats Left
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                <div className="flex justify-between text-gray-600 mb-4">
                  <span>{course.duration}</span>
                  <span className="text-green-600 font-bold text-xl">{course.fee}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Live interactive classes
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Digital study materials
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    WhatsApp doubt support
                  </li>
                </ul>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" className="w-full bg-green-600 hover:bg-green-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Reserve Your Seat
                  </Button>
                </a>
              </div>
            ))}
          </div>

          <div className="text-center bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Same Fees as Indian Students</span>
            </div>
            <p className="text-gray-600 mb-4">
              Payment accepted in USD, AED, SAR, SGD, and other currencies.
            </p>
            <Link href="/pricing">
              <Button variant="outline">
                View Detailed Fee Structure
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NEET Centers Section */}
      <section className="py-16 bg-[#4a5d4a] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <Plane className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Write NEET in Your Country!</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              NTA conducts NEET in 14 international cities. No need to travel to India for the exam.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { city: 'Dubai', country: 'UAE' },
              { city: 'Abu Dhabi', country: 'UAE' },
              { city: 'Sharjah', country: 'UAE' },
              { city: 'Riyadh', country: 'Saudi Arabia' },
              { city: 'Kuwait City', country: 'Kuwait' },
              { city: 'Doha', country: 'Qatar' },
              { city: 'Muscat', country: 'Oman' },
              { city: 'Manama', country: 'Bahrain' },
              { city: 'Singapore', country: 'Singapore' },
              { city: 'Kuala Lumpur', country: 'Malaysia' },
              { city: 'Bangkok', country: 'Thailand' },
              { city: 'Kathmandu', country: 'Nepal' },
              { city: 'Colombo', country: 'Sri Lanka' },
              { city: 'Lagos', country: 'Nigeria' },
            ].map((center) => (
              <div
                key={center.city}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center"
              >
                <MapPin className="w-5 h-5 mr-3 text-yellow-300" />
                <div>
                  <div className="font-semibold">{center.city}</div>
                  <div className="text-sm opacity-80">{center.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Resources Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Preparation Guides for NRI Students
            </h2>
            <p className="text-xl text-gray-600">Expert articles to help you prepare from abroad</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {blogArticles.map((article, index) => (
              <div
                key={article.title}
               className="animate-fadeInUp">
                <Link href={article.link}>
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group">
                    <div className="h-40 bg-indigo-100 flex items-center justify-center">
                      <span className="text-6xl">{article.image}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                      <div className="flex items-center text-blue-600 font-medium text-sm">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/blog">
              <Button variant="outline">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Boards Supported */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Boards Welcome
            </h2>
            <p className="text-xl text-gray-600">
              We support students from any curriculum with bridge courses
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {['CBSE', 'ICSE', 'IB', 'Cambridge (IGCSE)', 'State Boards'].map((board) => (
              <div
                key={board}
                className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm"
              >
                <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <div className="font-semibold text-gray-900">{board}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Special bridge courses available for IB and Cambridge students to align with
              NCERT-based NEET preparation.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Urgency */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            {/* Urgency Badge */}
            <div className="inline-flex items-center bg-red-500 px-6 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              <Calendar className="w-4 h-4 mr-2" />
              NEET 2026 Batch Filling Fast - Only 50 Seats Left!
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your NEET Journey Today!</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              900+ NRI students trust us for NEET preparation. 98% success rate. AIIMS-trained
              faculty.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5 mr-2 text-yellow-300" />
                100% Satisfaction Guarantee
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 mr-2 text-green-300" />
                Secure Payments
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Phone className="w-5 h-5 mr-2 text-blue-300" />
                24/7 Support
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3 justify-center mb-8">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-green-600 text-white hover:bg-green-600 w-full min-h-[48px] text-sm sm:text-base px-4 sm:px-6"
                >
                  <MessageCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="truncate">WhatsApp Us</span>
                </Button>
              </a>
              <Link href="/demo-booking" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-indigo-600 w-full min-h-[48px] text-sm sm:text-base px-4 sm:px-6"
                >
                  <Play className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="truncate">Book Free Demo</span>
                </Button>
              </Link>
              <a href="tel:+918826444334" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-indigo-600 w-full min-h-[48px] text-sm sm:text-base px-4 sm:px-6"
                >
                  <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="truncate">Call Now</span>
                </Button>
              </a>
            </div>

            <div className="text-sm opacity-80">
              <p>Available 8 AM - 10 PM IST | +91 8826444334</p>
              <p className="mt-1">info@cerebrumbiologyacademy.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
