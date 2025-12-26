import { Metadata } from 'next'
import Link from 'next/link'
import {
  Monitor,
  Wifi,
  Play,
  Users,
  Clock,
  Download,
  MessageCircle,
  BookOpen,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  Video,
  Headphones,
  Globe,
  Smartphone,
  Laptop,
  Tablet,
  Camera,
  Mic,
  Volume2,
  FileText,
  BarChart3,
  Target,
  Trophy,
  Shield,
  HelpCircle,
  Zap,
  Eye,
  Lightbulb,
  Brain,
  Heart,
  Sparkles,
  TrendingUp,
  Calendar,
  ChevronRight,
  PlayCircle,
  Lock,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Online NEET Biology Classes | Live Interactive Sessions | Cerebrum Biology Academy',
  description:
    "Join India's most advanced online NEET Biology coaching. HD live classes, recorded sessions, interactive whiteboard, 24/7 doubt resolution. Starting ₹15,999.",
  keywords:
    'online NEET coaching, Biology online classes, live NEET sessions, interactive online learning, NEET preparation online, virtual Biology coaching',
}

export default function OnlineClassesPage() {
  const heroStats = [
    { number: '1,50,000+', label: 'Online Students Trained', sublabel: 'Across 28 states' },
    { number: '94.7%', label: 'Online Success Rate', sublabel: 'NEET Qualification' },
    { number: '24/7', label: 'Learning Support', sublabel: 'Never miss a concept' },
    { number: '99.9%', label: 'Platform Uptime', sublabel: 'Reliable technology' },
  ]

  const technologyFeatures = [
    {
      icon: Video,
      title: 'Ultra HD Live Streaming',
      description:
        'Crystal clear 1080p video quality with adaptive bitrate streaming for smooth experience even on slower connections',
      benefit: 'See every diagram detail clearly',
    },
    {
      icon: Monitor,
      title: 'Interactive Digital Whiteboard',
      description:
        'Advanced virtual whiteboard with real-time annotation, diagram drawing, and collaborative problem-solving',
      benefit: 'Participate actively in every class',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat & Polls',
      description:
        'Instant doubt resolution through live chat, quick polls for concept checking, and breakout room discussions',
      benefit: 'Stay engaged throughout the session',
    },
    {
      icon: Download,
      title: 'Lifetime Access to Recordings',
      description:
        'Download and access recorded lectures forever. Watch on any device, at any speed, with bookmarking features',
      benefit: 'Never lose any important concept',
    },
    {
      icon: Smartphone,
      title: 'Multi-Device Learning',
      description:
        'Switch between phone, tablet, laptop, or smart TV. Your progress syncs across all devices',
      benefit: 'Learn anywhere, anytime, on any device',
    },
    {
      icon: BarChart3,
      title: 'AI-Powered Analytics',
      description:
        'Detailed performance tracking, weakness identification, and personalized study recommendations',
      benefit: 'Know exactly where you stand',
    },
  ]

  const flexibilityBenefits = [
    {
      icon: Clock,
      title: 'Choose Your Schedule',
      description:
        'Multiple batch timings including early morning, evening, and weekend batches to fit your routine',
      stats: '6 different time slots available',
    },
    {
      icon: Globe,
      title: 'Study From Anywhere',
      description:
        "Whether you're in a small town or metro city, access the same quality education from India's best faculty",
      stats: 'Students from 450+ cities',
    },
    {
      icon: PlayCircle,
      title: 'Unlimited Replay Access',
      description:
        'Watch difficult concepts multiple times. Slow down, speed up, or pause as needed for better understanding',
      stats: 'Average 3.2x replay per student',
    },
    {
      icon: FileText,
      title: 'Downloadable Resources',
      description:
        'Get PDFs of notes, practice sheets, previous year papers, and mind maps for offline study',
      stats: '2000+ downloadable resources',
    },
  ]

  const successStories = [
    {
      name: 'Priya Sharma',
      location: 'Ranchi, Jharkhand',
      score: 'NEET Score: 685/720',
      college: 'AIIMS Delhi',
      story:
        "Being from a small city, I was worried about quality coaching. Cerebrum's online classes gave me access to Delhi-level faculty from my home. The recorded sessions helped me revise multiple times.",
      improvement: '+180 points improvement',
    },
    {
      name: 'Arjun Patel',
      location: 'Rajkot, Gujarat',
      score: 'NEET Score: 658/720',
      college: 'JIPMER Puducherry',
      story:
        'The interactive whiteboard sessions made complex Biology concepts so clear. I could ask doubts instantly and get detailed explanations. The flexibility allowed me to balance school and coaching perfectly.',
      improvement: '+165 points improvement',
    },
    {
      name: 'Kavya Reddy',
      location: 'Visakhapatnam, AP',
      score: 'NEET Score: 672/720',
      college: 'AIIMS Bhubaneswar',
      story:
        'The AI analytics feature helped me identify my weak areas precisely. The personalized study plan based on my performance data was a game-changer. Online learning was more effective than I expected.',
      improvement: '+195 points improvement',
    },
  ]

  const pricingTiers = [
    {
      name: 'Online Starter',
      price: '₹15,999',
      duration: '6 months',
      features: [
        'Live interactive classes (3 days/week)',
        'HD recorded lecture access',
        'Digital whiteboard sessions',
        'Basic doubt resolution',
        'Monthly mock tests',
        'Study material PDFs',
        'Mobile app access',
      ],
      popular: false,
      color: 'blue',
    },
    {
      name: 'Online Pro',
      price: '₹24,999',
      duration: '12 months',
      features: [
        'Live interactive classes (5 days/week)',
        'Unlimited recorded lecture access',
        'Advanced whiteboard features',
        '24/7 doubt resolution',
        'Weekly mock tests + analysis',
        'Downloadable resources',
        'All device access',
        'Personal mentoring sessions',
        'Previous year paper solutions',
      ],
      popular: true,
      color: 'blue',
    },
    {
      name: 'Online Elite',
      price: '₹34,999',
      duration: '18 months',
      features: [
        'All Online Pro features',
        'Daily live classes',
        'One-on-one doubt sessions',
        'AI-powered performance analytics',
        'Customized study plans',
        'Exam strategy sessions',
        'Parent progress reports',
        'Lifetime access to recordings',
        'Career counseling sessions',
        'Guaranteed rank improvement',
      ],
      popular: false,
      color: 'blue',
    },
  ]

  const technicalRequirements = [
    {
      category: 'Internet Connection',
      requirement: 'Minimum 2 Mbps broadband',
      recommended: '5+ Mbps for best experience',
      icon: Wifi,
    },
    {
      category: 'Device Specifications',
      requirement: '2GB RAM, Android 6+ / iOS 12+',
      recommended: '4GB RAM, latest OS version',
      icon: Smartphone,
    },
    {
      category: 'Browser Support',
      requirement: 'Chrome 70+, Safari 12+, Firefox 65+',
      recommended: 'Latest Chrome for optimal features',
      icon: Monitor,
    },
    {
      category: 'Audio/Video',
      requirement: 'Basic camera and microphone',
      recommended: 'HD webcam and noise-canceling headphones',
      icon: Camera,
    },
  ]

  const faqs = [
    {
      question: 'How interactive are the online classes compared to classroom teaching?',
      answer:
        'Our online classes are highly interactive with live chat, polls, breakout rooms, and direct faculty interaction. Students can ask questions in real-time, participate in discussions, and get instant feedback. Many students find online classes more engaging as they can participate without hesitation.',
    },
    {
      question: 'What if my internet connection is unstable during live classes?',
      answer:
        'All live classes are automatically recorded in HD quality. If you miss any part due to connectivity issues, you can access the recording immediately after the class. We also provide mobile data-friendly low-bandwidth options and downloadable content for offline study.',
    },
    {
      question: 'How do you ensure I stay motivated and disciplined in online learning?',
      answer:
        'We use AI-powered engagement tracking, regular assessments, parent reports, and personal mentoring sessions. Our faculty actively monitors student participation and provides individual attention. Gamified learning elements and peer interaction keep students motivated.',
    },
    {
      question: 'Can I switch between online and offline modes if needed?',
      answer:
        'Yes! We offer hybrid learning options. You can attend classes online and join offline doubt-clearing sessions, mock tests, or special workshops at our centers. This flexibility ensures you get the best of both worlds.',
    },
    {
      question: 'How do you handle practical Biology concepts and laboratory work online?',
      answer:
        'We use advanced 3D animations, virtual lab simulations, and high-definition microscopy footage to demonstrate practical concepts. Interactive virtual dissections and molecular modeling make complex biological processes clear and memorable.',
    },
    {
      question: 'Is the faculty the same for online and offline classes?',
      answer:
        'Yes, the same experienced AIIMS and top medical college faculty teach both online and offline classes. Many students prefer online classes as they get access to our best faculty members who might not be available at all physical centers.',
    },
  ]

  const learningAdvantages = [
    {
      icon: Brain,
      title: 'Enhanced Focus',
      description:
        'Learn in your comfortable environment without travel fatigue. Studies show 23% better retention in familiar settings.',
      stat: '23% better retention',
    },
    {
      icon: Target,
      title: 'Personalized Pace',
      description:
        'Replay difficult concepts multiple times. Fast learners can skip basics while others can take extra time.',
      stat: 'Custom learning speed',
    },
    {
      icon: Sparkles,
      title: 'Modern Learning Tools',
      description:
        'Access to latest educational technology, interactive simulations, and AI-powered practice questions.',
      stat: '50+ interactive tools',
    },
    {
      icon: Heart,
      title: 'Reduced Stress',
      description:
        'No travel time, flexible timings, and comfortable learning environment significantly reduce academic stress.',
      stat: '35% stress reduction',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Master NEET Biology from Home
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Experience India&apos;s most advanced online NEET Biology coaching. HD live classes,
              interactive learning, and personalized attention - all from the comfort of your home.
              Join 1,50,000+ successful online students.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 md:mb-12">
              <Link
                href="/admissions"
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center text-base sm:text-lg min-h-[44px]"
              >
                Start Free 7-Day Trial
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Link>
              <Link
                href="#demo"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-base sm:text-lg min-h-[44px]"
              >
                Watch Demo Class
              </Link>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {heroStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base md:text-lg font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-blue-200">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Next-Generation Learning Technology
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Experience modern educational technology that makes online learning more engaging
              and effective than traditional classroom teaching
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {technologyFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
                >
                  <div className="flex items-start mb-4">
                    <div className="p-2 sm:p-3 bg-blue-50 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-xs sm:text-sm text-blue-600 font-semibold">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    {feature.benefit}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Flexibility Benefits */}
      <section className="py-8 sm:py-12 md:py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ultimate Learning Flexibility
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Break free from location and time constraints. Learn at your own pace, on your own
              schedule, without compromising on quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {flexibilityBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
                  <div className="flex items-start mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 bg-blue-100 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                        {benefit.description}
                      </p>
                      <div className="inline-flex items-center px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium rounded-full">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {benefit.stats}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Learning Advantages */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Online Learning is More Effective
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Scientific research proves that well-designed online education can be more effective
              than traditional classroom learning
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {learningAdvantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    {advantage.description}
                  </p>
                  <div className="text-sm text-blue-600 font-semibold">{advantage.stat}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Online Student Success Stories
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Real students, real results. See how our online coaching transformed their NEET
              journey from small cities to top medical colleges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                    {story.name.charAt(0)}
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                      {story.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">{story.location}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-base sm:text-lg font-bold text-blue-600 mb-1">
                    {story.score}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    {story.college}
                  </div>
                  <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    <Trophy className="w-3 h-3 mr-1" />
                    {story.improvement}
                  </div>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm italic">&quot;{story.story}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Choose Your Online Learning Plan
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Flexible pricing options to match your preparation timeline and requirements. All
              plans include our core online learning features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow ${tier.popular ? 'ring-2 ring-blue-500 relative' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                      {tier.price}
                    </span>
                    <span className="text-sm sm:text-base text-gray-500 ml-2">
                      / {tier.duration}
                    </span>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base text-gray-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/admissions"
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors min-h-[44px] ${
                      tier.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    Choose {tier.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">🎯 Free 7-day trial available for all plans</p>
            <p className="text-sm text-gray-500">
              EMI options available • Money-back guarantee • No hidden charges
            </p>
          </div>
        </div>
      </section>

      {/* Technical Requirements */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Technical Requirements & Setup Support
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Don&apos;t worry about technical setup! Our requirements are basic, and our support
              team will help you get started
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
            {technicalRequirements.map((req, index) => {
              const Icon = req.icon
              return (
                <div key={index} className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg">
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
                    {req.category}
                  </h3>
                  <div className="space-y-2">
                    <div className="text-xs sm:text-sm text-gray-600">
                      <strong>Minimum:</strong> {req.requirement}
                    </div>
                    <div className="text-xs sm:text-sm text-blue-600">
                      <strong>Recommended:</strong> {req.recommended}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-blue-50 rounded-xl p-6 sm:p-8 text-center">
            <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Free Technical Setup Support
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Our technical team will help you set up everything on a video call. We also provide
              step-by-step video guides and 24/7 technical support to ensure smooth learning
              experience.
            </p>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center min-h-[44px]"
            >
              Get Setup Help
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Common concerns about online learning addressed by our education experts
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-start">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3 sm:mr-4 mt-1 flex-shrink-0" />
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

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
            Ready to Start Your Online NEET Journey?
          </h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              🚀 Special Launch Offer - Limited Time!
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center">
                <div className="text-lg sm:text-3xl font-bold mb-1 sm:mb-2">7 Days</div>
                <div className="text-xs sm:text-base text-blue-100">Free Trial</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-3xl font-bold mb-1 sm:mb-2">₹5,000</div>
                <div className="text-xs sm:text-base text-blue-100">Early Bird Discount</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-3xl font-bold mb-1 sm:mb-2">100%</div>
                <div className="text-xs sm:text-base text-blue-100">Money Back Guarantee</div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Link
                href="/admissions"
                className="block bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-base sm:text-lg min-h-[44px]"
              >
                Start Free Trial Now - No Credit Card Required
              </Link>
              <Link
                href="/contact"
                className="block border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors min-h-[44px]"
              >
                Schedule a Demo Class
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center justify-center">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span>Secure payment • No hidden charges</span>
            </div>
            <div className="flex items-center justify-center">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span>Trusted by 1,50,000+ students nationwide</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
