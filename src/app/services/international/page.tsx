import { Metadata } from 'next'
import Link from 'next/link'
import {
  Globe,
  Clock,
  Languages,
  Users,
  BookOpen,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  Video,
  Headphones,
  Smartphone,
  Calendar,
  Trophy,
  Target,
  Brain,
  Heart,
  Zap,
  TrendingUp,
  Shield,
  HelpCircle,
  MapPin,
  Plane,
  GraduationCap,
  FileText,
  Phone,
  Mail,
  MessageCircle,
  Wifi,
  DollarSign,
  CreditCard,
  Building2,
  Flag,
  Earth,
  Sunrise,
  Moon,
  Compass,
  Navigation,
  University,
  Stethoscope,
  Activity,
  Monitor,
  Lightbulb,
  Sparkles,
  Lock,
  Eye,
  PlayCircle,
  ChevronRight,
  Bookmark,
  Database,
  Microscope,
  FileCheck,
  UserCheck,
  Handshake,
  UserPlus,
  Download,
  BarChart3,
} from 'lucide-react'

export const metadata: Metadata = {
  title:
    'International NEET Biology Programs | Global Medical Education | Cerebrum Biology Academy',
  description:
    'Comprehensive NEET Biology coaching for international students and Indians abroad. IGCSE, IB, AP Biology support, global university prep, 24/7 timezone support. Starting $599.',
  keywords:
    'international NEET coaching, global Biology education, IGCSE Biology, IB Biology, AP Biology, medical admissions abroad, international students NEET, overseas education, global medical programs, timezone flexible coaching',
}

export default function InternationalProgramsPage() {
  const heroStats = [
    { number: '47+', label: 'Countries Served', sublabel: 'Worldwide presence' },
    { number: '92.3%', label: 'International Success Rate', sublabel: 'Global medical admissions' },
    { number: '24/7', label: 'Timezone Support', sublabel: 'Around-the-clock assistance' },
    { number: '15+', label: 'Curriculum Standards', sublabel: 'IGCSE, IB, AP, CBSE & more' },
  ]

  const globalAdvantages = [
    {
      icon: Globe,
      title: 'Global Curriculum Expertise',
      description:
        'Comprehensive support for IGCSE, IB, AP Biology, A-Levels, and international curricula alongside NEET preparation',
      benefit: 'Master multiple education systems',
      countries: '47 countries supported',
    },
    {
      icon: Clock,
      title: 'Timezone Flexible Learning',
      description:
        'Live classes scheduled across all major time zones with recorded sessions available 24/7 for maximum flexibility',
      benefit: 'Never miss a concept due to time zones',
      countries: 'Asia-Pacific, Americas, Europe, Africa',
    },
    {
      icon: Languages,
      title: 'Multilingual Support',
      description:
        'Faculty support in English, Hindi, Spanish, French, and Arabic to help international students grasp complex concepts',
      benefit: 'Learn in your preferred language',
      countries: '5 languages supported',
    },
    {
      icon: University,
      title: 'Global University Guidance',
      description:
        'Expert counseling for medical admissions in India, USA, UK, Canada, Australia, and other leading medical destinations',
      benefit: 'Maximize admission opportunities worldwide',
      countries: '25+ university partnerships',
    },
    {
      icon: CreditCard,
      title: 'Documentation & Visa Support',
      description:
        'Complete assistance with educational transcripts, equivalency certificates, and visa documentation for medical admissions',
      benefit: 'Seamless application process',
      countries: 'All major study destinations',
    },
    {
      icon: Users,
      title: 'Cultural Integration Support',
      description:
        'Special orientation programs and cultural adaptation support to help students integrate with Indian medical education systems',
      benefit: 'Smooth cultural transition',
      countries: 'Personalized cultural guidance',
    },
  ]

  const timezoneSupport = [
    {
      zone: 'Asia-Pacific',
      time: 'GMT+5:30 to GMT+12',
      countries: ['India', 'Australia', 'Singapore', 'Japan', 'Philippines'],
      batchTimes: ['Early Morning 6:00-9:00 AM', 'Evening 6:00-9:00 PM', 'Night 9:00-12:00 AM'],
      icon: Sunrise,
    },
    {
      zone: 'Middle East & Africa',
      time: 'GMT+2 to GMT+4',
      countries: ['UAE', 'Saudi Arabia', 'Qatar', 'South Africa', 'Kenya'],
      batchTimes: ['Morning 8:00-11:00 AM', 'Afternoon 2:00-5:00 PM', 'Evening 7:00-10:00 PM'],
      icon: Earth,
    },
    {
      zone: 'Europe',
      time: 'GMT+0 to GMT+3',
      countries: ['UK', 'Germany', 'France', 'Italy', 'Russia'],
      batchTimes: ['Morning 9:00-12:00 PM', 'Afternoon 3:00-6:00 PM', 'Evening 8:00-11:00 PM'],
      icon: Globe,
    },
    {
      zone: 'Americas',
      time: 'GMT-8 to GMT-3',
      countries: ['USA', 'Canada', 'Brazil', 'Mexico', 'Argentina'],
      batchTimes: ['Morning 7:00-10:00 AM', 'Evening 6:00-9:00 PM', 'Night 10:00 PM-1:00 AM'],
      icon: Moon,
    },
  ]

  const internationalSuccessStories = [
    {
      name: 'Sarah Johnson',
      location: 'Toronto, Canada',
      background: 'IGCSE Graduate',
      score: 'NEET Score: 681/720',
      college: 'AIIMS Delhi',
      story:
        "Moving from IGCSE to NEET seemed impossible, but Cerebrum's international program made it seamless. The timezone-flexible classes and cultural orientation helped me adapt to the Indian system while maintaining my Canadian study schedule.",
      improvement: '+195 points improvement',
      flag: '🇨🇦',
      highlight: 'Cross-curriculum transition expertise',
    },
    {
      name: 'Ahmed Al-Rashid',
      location: 'Dubai, UAE',
      background: 'IB Biology HL',
      score: 'NEET Score: 665/720',
      college: 'JIPMER Puducherry',
      story:
        'The multilingual support in Arabic and English was incredible. Faculty understood both IB standards and NEET requirements, helping me leverage my IB knowledge for NEET success while managing the time difference perfectly.',
      improvement: '+178 points improvement',
      flag: '🇦🇪',
      highlight: 'Multilingual learning support',
    },
    {
      name: 'Maria Santos',
      location: 'São Paulo, Brazil',
      background: 'Brazilian Pre-Med',
      score: 'NEET Score: 659/720',
      college: 'MAMC Delhi',
      story:
        'Despite the 8.5-hour time difference, I never felt disconnected. The recorded lectures and Portuguese translation support made complex Biology concepts accessible. The visa guidance was invaluable for my India move.',
      improvement: '+203 points improvement',
      flag: '🇧🇷',
      highlight: 'Global documentation support',
    },
  ]

  const pricingTiers = [
    {
      name: 'Global Starter',
      price: '$599',
      originalPrice: '$799',
      duration: '6 months',
      features: [
        'Timezone-flexible live classes',
        'Curriculum-specific content (IGCSE/IB/AP)',
        'Recorded lecture access',
        'Basic language support',
        'Monthly progress reports',
        'Global study materials',
        'Mobile app access',
        'Email support',
      ],
      popular: false,
      color: 'purple',
      savings: 'Save $200',
      bestFor: 'Students starting NEET prep',
    },
    {
      name: 'International Pro',
      price: '$999',
      originalPrice: '$1299',
      duration: '12 months',
      features: [
        'All Global Starter features',
        'Personal academic counselor',
        '24/7 multilingual support',
        'University application guidance',
        'One-on-one doubt sessions',
        'Cultural orientation program',
        'Mock test series',
        'Transcript evaluation',
        'Visa documentation help',
        'Global university partnerships',
      ],
      popular: true,
      color: 'purple',
      savings: 'Save $300',
      bestFor: 'Serious international aspirants',
    },
    {
      name: 'Elite Global',
      price: '$1,599',
      originalPrice: '$1999',
      duration: '18 months',
      features: [
        'All International Pro features',
        'Dedicated international mentor',
        'Priority scheduling across timezones',
        'Multiple curriculum support',
        'Advanced university prep (MCAT/UCAT)',
        'Research project guidance',
        'Internship opportunities',
        'Alumni network access',
        'Guaranteed admission counseling',
        'Post-admission support',
        'Career pathway planning',
      ],
      popular: false,
      color: 'purple',
      savings: 'Save $400',
      bestFor: 'Comprehensive global preparation',
    },
  ]

  const internationalFaqs = [
    {
      question: 'How do you handle different international curricula while preparing for NEET?',
      answer:
        'We have specialized faculty trained in multiple international curricula including IGCSE, IB, AP, and A-Levels. Our programs are designed to bridge the gap between your current curriculum and NEET requirements, ensuring you leverage your existing knowledge while filling any gaps specific to the Indian medical entrance system.',
    },
    {
      question: 'What timezone support do you provide for international students?',
      answer:
        'We offer live classes across all major time zones with multiple batch timings. All sessions are recorded in HD and available 24/7. We also provide makeup classes and one-on-one sessions scheduled according to your local time zone. Our support team is available 24/7 for urgent queries.',
    },
    {
      question: 'Do you provide support for medical admissions outside India?',
      answer:
        'Yes, we offer comprehensive guidance for medical admissions globally including MCAT preparation for US/Canada, UCAT/BMAT for UK/Australia, and other regional entrance exams. Our counselors help you create a strategy for multiple countries to maximize your admission opportunities.',
    },
    {
      question: 'How do you assist with documentation and visa processes?',
      answer:
        'We provide complete documentation support including transcript evaluation, equivalency certificates, visa documentation assistance, and guidance on meeting specific requirements for Indian medical colleges. Our team has helped students from 47+ countries navigate these processes successfully.',
    },
    {
      question: 'What language support is available for non-English speakers?',
      answer:
        'While our primary instruction is in English, we provide support in Hindi, Spanish, French, and Arabic. We offer subtitles, translated materials, and multilingual doubt-clearing sessions. Our international faculty can explain complex concepts in multiple languages.',
    },
    {
      question: 'How do you ensure quality education despite distance and time differences?',
      answer:
        'We use advanced technology including HD live streaming, interactive whiteboards, real-time doubt resolution, and comprehensive recorded content. Our quality assurance team monitors all international sessions. Student progress is tracked closely with regular assessments and personalized feedback.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Global Excellence in Medical Education
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Comprehensive NEET Biology coaching designed for international students and Indians
              abroad. Seamlessly bridge global curricula with Indian medical entrance requirements
              across 47+ countries.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
              <Link
                href="/admissions"
                className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center justify-center text-base sm:text-lg min-h-[44px] w-full sm:w-auto"
              >
                Start Global Journey
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Link>
              <Link
                href="#demo"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors text-base sm:text-lg min-h-[44px] w-full sm:w-auto"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {heroStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base md:text-lg font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-purple-200">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Advantages */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Our International Programs
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized coaching that understands the unique challenges faced by international
              students and provides comprehensive support for global medical aspirations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {globalAdvantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
                >
                  <div className="flex items-start mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-purple-50 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                        {advantage.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                    {advantage.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-xs sm:text-sm text-purple-600 font-semibold">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                      {advantage.benefit}
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-50 px-2 sm:px-3 py-1 rounded-full inline-block">
                      🌍 Coverage: {advantage.countries}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timezone Support */}
      <section className="py-8 sm:py-12 md:py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              24/7 Global Timezone Support
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              No matter where you are in the world, we have live classes and support available in
              your time zone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {timezoneSupport.map((zone, index) => {
              const Icon = zone.icon
              return (
                <div key={index} className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 shadow-lg">
                  <div className="flex flex-col sm:flex-row items-start mb-4 sm:mb-6">
                    <div className="p-3 sm:p-4 bg-purple-100 rounded-lg mb-3 sm:mb-0 sm:mr-4 flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {zone.zone}
                      </h3>
                      <p className="text-sm sm:text-base text-purple-600 font-medium">
                        {zone.time}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                      Countries Served:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {zone.countries.map((country, countryIndex) => (
                        <span
                          key={countryIndex}
                          className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-800 text-xs sm:text-sm rounded-full"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                      Available Batch Times:
                    </h4>
                    <div className="space-y-2">
                      {zone.batchTimes.map((time, timeIndex) => (
                        <div key={timeIndex} className="flex items-center">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 mr-2 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-600">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Global Success Stories
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              International students who successfully transitioned to Indian medical colleges
              through our programs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {internationalSuccessStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                    {story.name.charAt(0)}
                  </div>
                  <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                    <div className="flex items-center">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mr-2 truncate">
                        {story.name}
                      </h3>
                      <span className="text-lg sm:text-xl flex-shrink-0">{story.flag}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{story.location}</p>
                    <p className="text-xs text-purple-600 font-medium">{story.background}</p>
                  </div>
                </div>

                <div className="mb-3 sm:mb-4">
                  <div className="text-base sm:text-lg font-bold text-purple-600 mb-1">
                    {story.score}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    {story.college}
                  </div>
                  <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    <Trophy className="w-3 h-3 mr-1 flex-shrink-0" />
                    {story.improvement}
                  </div>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm italic mb-2 sm:mb-3">
                  "{story.story}"
                </p>

                <div className="pt-2 sm:pt-3 border-t border-gray-100">
                  <div className="flex items-center text-xs text-purple-600 font-semibold">
                    <Star className="w-3 h-3 mr-1 flex-shrink-0" />
                    {story.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Global Investment Plans
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Competitive international pricing with comprehensive support for global medical
              aspirations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-shadow ${tier.popular ? 'ring-2 ring-purple-500 relative' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-purple-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-2xl sm:text-3xl font-bold text-purple-600">
                      {tier.price}
                    </span>
                    <span className="text-sm sm:text-base text-gray-500 ml-2">
                      / {tier.duration}
                    </span>
                  </div>
                  <div className="flex items-center mb-3 sm:mb-4">
                    <span className="text-xs sm:text-sm text-gray-500 line-through mr-2">
                      {tier.originalPrice}
                    </span>
                    <span className="text-xs sm:text-sm text-green-600 font-semibold">
                      {tier.savings}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-purple-600 font-medium mb-4 sm:mb-6">
                    {tier.bestFor}
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base text-gray-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/admissions"
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base min-h-[44px] ${
                      tier.popular
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                    }`}
                  >
                    Choose {tier.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              🌍 Free consultation and curriculum assessment for all international students
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Multiple payment options • Currency conversion available • Regional pricing
              adjustments
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Common questions from international students about our global programs
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {internationalFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-start">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mr-3 sm:mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Contact & Support */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              24/7 Global Support
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Round-the-clock support for international students across all time zones
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-lg">
              <Phone className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                Global Helpline
              </h3>
              <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                <div>🇺🇸 +1-XXX-XXX-XXXX</div>
                <div>🇬🇧 +44-XXX-XXX-XXXX</div>
                <div>🇦🇺 +61-XXX-XXX-XXXX</div>
                <div>🇮🇳 +91-XXX-XXX-XXXX</div>
              </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-lg">
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                Regional Email Support
              </h3>
              <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                <div>americas@cerebrum.edu</div>
                <div>europe@cerebrum.edu</div>
                <div>apac@cerebrum.edu</div>
                <div>mena@cerebrum.edu</div>
              </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-lg">
              <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                Live Chat Support
              </h3>
              <div className="text-xs sm:text-sm text-gray-600">
                <div className="mb-2">24/7 multilingual chat</div>
                <div className="text-xs">English • Hindi • Spanish</div>
                <div className="text-xs">French • Arabic</div>
              </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-lg">
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                Video Consultations
              </h3>
              <div className="text-xs sm:text-sm text-gray-600">
                <div className="mb-2">One-on-one counseling</div>
                <div className="text-xs">Schedule across time zones</div>
                <div className="text-xs">Academic & career guidance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
            Ready to Begin Your Global Medical Journey?
          </h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              🌍 Join Students from 47+ Countries
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Free</div>
                <div className="text-xs sm:text-sm md:text-base text-purple-100">
                  Global Consultation & Assessment
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">24/7</div>
                <div className="text-xs sm:text-sm md:text-base text-purple-100">
                  Multilingual Support
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">92.3%</div>
                <div className="text-xs sm:text-sm md:text-base text-purple-100">
                  International Success Rate
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Link
                href="/admissions"
                className="block w-full bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors text-base sm:text-lg min-h-[44px]"
              >
                Start Your Global Application - No Commitment Required
              </Link>
              <Link
                href="/contact"
                className="block w-full border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors text-sm sm:text-base min-h-[44px]"
              >
                Schedule Free International Consultation
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center justify-center">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <span>Secure international payments • Currency protection</span>
            </div>
            <div className="flex items-center justify-center">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <span>Trusted by students in 47+ countries worldwide</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
