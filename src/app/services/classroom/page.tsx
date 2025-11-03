import { Metadata } from 'next'
import Link from 'next/link'
import {
  School,
  Users,
  Eye,
  Brain,
  MessageCircle,
  Trophy,
  Target,
  Star,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Microscope,
  FlaskConical,
  UserCheck,
  Clock,
  MapPin,
  Calendar,
  Award,
  Lightbulb,
  Heart,
  Handshake,
  Zap,
  TrendingUp,
  Shield,
  Users2,
  GraduationCap,
  ChevronRight,
  PlayCircle,
  Building2,
  ParkingCircle,
  Wifi,
  Coffee,
  Camera,
  Clipboard,
  FileText,
  Phone,
  Mail,
  MapPinIcon,
  Clock4,
  IndianRupee,
  Gift,
  Sparkles,
  HelpCircle,
  BookMarked,
  UserPlus,
  Lock,
  MonitorSpeaker,
  Presentation,
  Palette,
  TestTube,
  Stethoscope,
  Activity,
} from 'lucide-react'

export const metadata: Metadata = {
  title:
    'Classroom Coaching for NEET Biology | Traditional Face-to-Face Teaching | Cerebrum Biology Academy',
  description:
    'Experience the power of traditional classroom coaching for NEET Biology. Small batches, personal attention, practical lab work, and direct faculty interaction. Starting ₹25,999.',
  keywords:
    'NEET classroom coaching, Biology coaching classes, face-to-face teaching, traditional coaching, small batch coaching, practical Biology lab, NEET coaching center',
}

export default function ClassroomCoachingPage() {
  const heroStats = [
    {
      number: '8,500+',
      label: 'Classroom Students Trained',
      sublabel: 'Over 12 years of excellence',
    },
    { number: '96.2%', label: 'Classroom Success Rate', sublabel: 'Highest in the region' },
    { number: '12:1', label: 'Student-Faculty Ratio', sublabel: 'Maximum personal attention' },
    { number: '98.5%', label: 'Student Satisfaction', sublabel: 'Proven teaching methodology' },
  ]

  const classroomAdvantages = [
    {
      icon: Eye,
      title: 'Direct Faculty Observation',
      description:
        "Teachers can read your body language, expressions, and instantly identify if you're struggling with a concept. This real-time feedback is impossible in digital formats.",
      benefit: 'Instant doubt detection and clarification',
      research: '78% faster concept grasp rate',
    },
    {
      icon: Users2,
      title: 'Small Batch Learning (Max 20)',
      description:
        'Unlike crowded coaching centers with 100+ students, our small batches ensure every student gets individual attention and can actively participate in discussions.',
      benefit: 'Personalized attention for every student',
      research: '3x more student participation',
    },
    {
      icon: Microscope,
      title: 'Hands-On Laboratory Work',
      description:
        'Real microscopes, actual specimens, live dissections, and practical experiments that make Biology concepts tangible and memorable.',
      benefit: 'Better retention through practical learning',
      research: '85% better practical knowledge retention',
    },
    {
      icon: Brain,
      title: 'Immediate Doubt Resolution',
      description:
        'Raise your hand and get instant clarification. No waiting, no typing, no connection issues - just immediate, personalized explanations.',
      benefit: 'Zero concept backlog accumulation',
      research: '92% of doubts resolved instantly',
    },
    {
      icon: Users,
      title: 'Peer Learning Environment',
      description:
        "Learn from classmates' questions, engage in group discussions, and benefit from healthy academic competition that pushes everyone to excel.",
      benefit: 'Comprehensive understanding from multiple perspectives',
      research: '67% improvement in analytical thinking',
    },
    {
      icon: Handshake,
      title: 'Personal Mentoring & Guidance',
      description:
        'Build genuine relationships with faculty who understand your strengths, weaknesses, and provide personalized career guidance.',
      benefit: 'Holistic development beyond academics',
      research: '89% students report improved confidence',
    },
  ]

  const practicalLearning = [
    {
      icon: FlaskConical,
      title: 'Advanced Biology Laboratory',
      description:
        'State-of-the-art lab with high-end microscopes, preserved specimens, models, and interactive charts',
      equipment: [
        'Compound Microscopes (40x-1000x)',
        'Preserved Animal & Plant Specimens',
        '3D Anatomical Models',
        'Interactive Digital Charts',
      ],
    },
    {
      icon: TestTube,
      title: 'Live Experiments & Demonstrations',
      description:
        'Watch cellular processes, conduct genetic experiments, and observe biological phenomena in real-time',
      equipment: [
        'Enzyme Activity Demonstrations',
        'Mitosis & Meiosis Live Observation',
        'Blood Group Testing Practicals',
        'Photosynthesis Experiments',
      ],
    },
    {
      icon: Stethoscope,
      title: 'Medical Simulation Sessions',
      description:
        'Hands-on experience with medical instruments and procedures to build future doctor readiness',
      equipment: [
        'Blood Pressure Monitoring',
        'Stethoscope Practice Sessions',
        'Basic Medical Procedures',
        'Patient Interaction Training',
      ],
    },
    {
      icon: Activity,
      title: 'Interactive Learning Tools',
      description:
        'Physical models, charts, and educational games that make complex concepts easy to understand',
      equipment: [
        'DNA Model Building Kits',
        'Heart & Circulatory System Models',
        'Skeletal System Replicas',
        'Periodic Medical Case Studies',
      ],
    },
  ]

  const successStories = [
    {
      name: 'Ananya Gupta',
      location: 'Local Student, Delhi',
      score: 'NEET Score: 695/720',
      college: 'AIIMS Delhi',
      story:
        'The classroom environment at Cerebrum was incredible. Being able to ask questions immediately and seeing real biological specimens in the lab made all the difference. The teachers knew exactly when I was confused even before I said anything!',
      improvement: '+210 points improvement',
      previousScore: 'Mock Test: 485/720',
      highlight: 'Direct faculty interaction was game-changing',
    },
    {
      name: 'Rohit Sharma',
      location: 'Transferred from Online',
      score: 'NEET Score: 678/720',
      college: 'MAMC Delhi',
      story:
        'I started with online classes but switched to classroom coaching after 3 months. The difference was night and day! The practical lab work and instant doubt clearing helped me understand concepts I was struggling with for months.',
      improvement: '+189 points improvement',
      previousScore: 'Before Classroom: 489/720',
      highlight: 'Practical learning accelerated understanding',
    },
    {
      name: 'Priyanka Singh',
      location: 'Repeater Student',
      score: 'NEET Score: 662/720',
      college: 'JIPMER Puducherry',
      story:
        "After failing NEET once, I joined Cerebrum's classroom program. The personal attention from teachers and the competitive environment with serious peers motivated me to work harder than ever before.",
      improvement: '+198 points improvement',
      previousScore: 'Previous NEET: 464/720',
      highlight: 'Personal mentoring built unshakeable confidence',
    },
  ]

  const facilitiesFeatures = [
    {
      icon: Building2,
      title: 'Modern Campus Infrastructure',
      description:
        'Purpose-built facility with spacious classrooms, advanced laboratories, and comfortable learning environments',
      features: [
        'Air-conditioned smart classrooms',
        'Advanced audio-visual systems',
        'Ergonomic furniture',
        'Natural lighting optimization',
      ],
    },
    {
      icon: ParkingCircle,
      title: 'Student Amenities',
      description:
        'Complete facilities to ensure comfortable and focused learning experience for all students',
      features: [
        'Free parking for students',
        'Clean and hygienic washrooms',
        'Drinking water stations',
        'Student recreation area',
      ],
    },
    {
      icon: Wifi,
      title: 'Technology Integration',
      description:
        'Blend of traditional teaching with modern technology for enhanced learning experience',
      features: [
        'High-speed Wi-Fi throughout',
        'Digital presentation systems',
        'Online resource access',
        'Hybrid learning support',
      ],
    },
    {
      icon: Shield,
      title: 'Safety & Security',
      description:
        'Safe and secure environment with comprehensive safety measures for student well-being',
      features: [
        '24/7 security coverage',
        'CCTV monitoring',
        'Fire safety systems',
        'Medical first aid availability',
      ],
    },
  ]

  const pricingTiers = [
    {
      name: 'Classroom Foundation',
      price: '₹25,999',
      duration: '6 months',
      features: [
        'Small batch classes (Max 20 students)',
        'Expert faculty teaching',
        'Laboratory practical sessions',
        'Daily doubt clearing sessions',
        'Weekly mock tests',
        'Study material included',
        'Progress tracking',
        'Parent-teacher meetings',
      ],
      popular: false,
      color: 'green',
      batch: 'Morning & Evening batches available',
    },
    {
      name: 'Classroom Premium',
      price: '₹39,999',
      duration: '12 months',
      features: [
        'All Foundation features',
        'Extended lab access hours',
        'Personal mentoring sessions',
        'Additional practice sessions',
        'Advanced mock test series',
        'Revision crash courses',
        'Career counseling sessions',
        'Alumni network access',
        'Previous year paper sessions',
        'Exam strategy workshops',
      ],
      popular: true,
      color: 'green',
      batch: 'Multiple batch options with flexibility',
    },
    {
      name: 'Classroom Elite',
      price: '₹54,999',
      duration: '18 months',
      features: [
        'All Premium features',
        'One-on-one doubt sessions',
        'Extended practical lab time',
        'Advanced research projects',
        'Medical college preparation',
        'Interview preparation sessions',
        'Guaranteed seat counseling',
        'Post-NEET support',
        'Medical career guidance',
        'Industry expert sessions',
        'Research paper opportunities',
      ],
      popular: false,
      color: 'green',
      batch: 'Flexible timings with weekend options',
    },
  ]

  const batchSchedules = [
    {
      name: 'Morning Batch',
      timing: '6:00 AM - 9:00 AM',
      days: 'Monday to Saturday',
      target: 'Early risers & school students',
      features: [
        'Fresh mind learning',
        'Less traffic commute',
        'Afternoon free for self-study',
        'Higher concentration levels',
      ],
    },
    {
      name: 'Regular Batch',
      timing: '10:00 AM - 1:00 PM',
      days: 'Monday to Saturday',
      target: 'Dedicated NEET aspirants',
      features: [
        'Optimal learning hours',
        'Standard coaching schedule',
        'Peer interaction time',
        'Balanced daily routine',
      ],
    },
    {
      name: 'Evening Batch',
      timing: '4:00 PM - 7:00 PM',
      days: 'Monday to Saturday',
      target: 'School students & working professionals',
      features: [
        'Post-school coaching',
        'Flexible for working parents',
        'Group study sessions',
        'Extended doubt clearing',
      ],
    },
    {
      name: 'Weekend Intensive',
      timing: '9:00 AM - 6:00 PM',
      days: 'Saturday & Sunday',
      target: 'Long-distance students',
      features: [
        'Intensive learning sessions',
        'Practical lab marathons',
        'Complete weekly coverage',
        'Travel-friendly schedule',
      ],
    },
  ]

  const whyClassroomBetter = [
    {
      icon: Heart,
      title: 'Human Connection & Empathy',
      description:
        'Teachers can sense your emotional state, provide encouragement during tough times, and celebrate your victories personally',
      vsOnline: 'Online: Limited emotional connection through screens',
    },
    {
      icon: Lightbulb,
      title: 'Instant Concept Clarification',
      description:
        'No technical delays, connection issues, or typing time - just raise your hand and get immediate, detailed explanations',
      vsOnline: 'Online: Delayed responses, technical glitches affecting flow',
    },
    {
      icon: Trophy,
      title: 'Healthy Competitive Environment',
      description:
        "See peers' dedication, learn from their questions, and develop the competitive spirit essential for NEET success",
      vsOnline: 'Online: Isolated learning, limited peer interaction',
    },
    {
      icon: BookOpen,
      title: 'Distraction-Free Learning',
      description:
        'Dedicated learning environment free from home distractions, social media notifications, and family interruptions',
      vsOnline: 'Online: Multiple distractions, multitasking temptations',
    },
  ]

  const admissionProcess = [
    {
      step: 1,
      title: 'Initial Consultation',
      description:
        'Meet our counselors to understand your goals, current preparation level, and choose the right batch',
      icon: UserCheck,
      action: 'Schedule a visit or call consultation',
    },
    {
      step: 2,
      title: 'Aptitude Assessment',
      description:
        'Take a comprehensive test to evaluate your current Biology knowledge and identify areas for improvement',
      icon: Clipboard,
      action: 'Complete the assessment test',
    },
    {
      step: 3,
      title: 'Faculty Interaction',
      description:
        'Meet your potential teachers, experience our teaching methodology, and ask any questions about the program',
      icon: GraduationCap,
      action: 'Attend a demo class session',
    },
    {
      step: 4,
      title: 'Enrollment & Batch Selection',
      description:
        'Complete formalities, select your preferred batch timing, and begin your NEET preparation journey',
      icon: UserPlus,
      action: 'Submit documents and fees',
    },
  ]

  const faqs = [
    {
      question: 'How is classroom coaching better than online classes for NEET preparation?',
      answer:
        'Classroom coaching offers immediate doubt resolution, practical lab work, direct faculty interaction, and a distraction-free environment. Teachers can read your body language and provide instant feedback. The competitive peer environment and hands-on learning significantly improve concept retention and exam performance.',
    },
    {
      question: 'What is the maximum batch size and why is it important?',
      answer:
        'We maintain a maximum of 20 students per batch to ensure individual attention. This allows teachers to know each student personally, track their progress, and provide customized guidance. Small batches also enable more interactive sessions and better doubt-clearing opportunities.',
    },
    {
      question: 'What practical laboratory facilities do you provide?',
      answer:
        'Our advanced Biology lab includes high-resolution microscopes, preserved specimens, 3D anatomical models, live culture samples, and experimental setups. Students get hands-on experience with dissections, microscopy, enzyme reactions, and genetic experiments - crucial for both NEET and future medical studies.',
    },
    {
      question: 'How do you handle different learning speeds of students in the same batch?',
      answer:
        "Our faculty are trained to identify different learning paces. We provide additional support sessions for students who need extra help and advanced challenges for quick learners. Regular assessments help us customize the approach for each student while maintaining the batch's overall progress.",
    },
    {
      question: 'What if I miss classes due to illness or other reasons?',
      answer:
        'We provide makeup classes, detailed notes of missed sessions, and one-on-one catch-up sessions with faculty. Students can also access recorded summaries of key concepts covered in their absence to stay on track with the batch.',
    },
    {
      question: "How do parents stay informed about their child's progress?",
      answer:
        "We conduct monthly parent-teacher meetings, provide detailed progress reports, and maintain open communication channels. Parents receive regular updates on test scores, attendance, areas of improvement, and their child's overall development in the program.",
    },
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: {
        bg: 'bg-green-50',
        border: 'border-green-600',
        text: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700',
        gradient: 'from-green-600 to-emerald-600',
      },
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.green
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Experience the Power of Traditional Classroom Coaching
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Where personal attention meets proven methodology. Join India's most effective
              classroom NEET Biology coaching with small batches, expert faculty, and hands-on
              practical learning that digital platforms can't replicate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
              <Link
                href="/admissions"
                className="bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center text-base sm:text-lg min-h-[44px] w-full sm:w-auto"
              >
                Book Campus Visit
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Link>
              <Link
                href="#demo"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors text-base sm:text-lg min-h-[44px] w-full sm:w-auto"
              >
                Attend Demo Class
              </Link>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {heroStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base md:text-lg font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-green-200">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Classroom Coaching */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Classroom Coaching Remains Unbeatable
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              In our digital age, the irreplaceable value of face-to-face learning becomes even more
              apparent. Here's why traditional classroom coaching delivers superior results for NEET
              preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {classroomAdvantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
                >
                  <div className="flex items-start mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-green-50 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
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
                    <div className="flex items-center text-xs sm:text-sm text-green-600 font-semibold">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                      {advantage.benefit}
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-50 px-2 sm:px-3 py-1 rounded-full inline-block">
                      📊 Research: {advantage.research}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Practical Learning Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Hands-On Practical Learning Experience
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Biology comes alive in our advanced laboratories. Experience real specimens, conduct
              actual experiments, and build the practical knowledge essential for both NEET and your
              future medical career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {practicalLearning.map((lab, index) => {
              const Icon = lab.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row items-start mb-4 sm:mb-6">
                    <div className="p-3 sm:p-4 bg-green-100 rounded-lg mb-3 sm:mb-0 sm:mr-4 flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                        {lab.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">{lab.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {lab.equipment.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Classroom vs Online Comparison */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Classroom Learning Advantages Over Online
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              While online learning has its place, classroom coaching offers irreplaceable benefits
              for serious NEET aspirants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {whyClassroomBetter.map((reason, index) => {
              const Icon = reason.icon
              return (
                <div key={index} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
                  <div className="flex items-start mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-green-50 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                        {reason.title}
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="p-2 sm:p-3 bg-green-50 rounded-lg border-l-3 border-green-500">
                          <div className="font-medium text-green-800 text-xs sm:text-sm mb-1">
                            ✅ Classroom Advantage:
                          </div>
                          <p className="text-gray-700 text-xs sm:text-sm">{reason.description}</p>
                        </div>
                        <div className="p-2 sm:p-3 bg-red-50 rounded-lg border-l-3 border-red-300">
                          <div className="font-medium text-red-700 text-xs sm:text-sm mb-1">
                            ❌ Online Limitation:
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm">{reason.vsOnline}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Classroom Success Stories
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Real students who chose classroom coaching and achieved their NEET dreams through
              traditional face-to-face learning
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                    {story.name.charAt(0)}
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                      {story.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">{story.location}</p>
                  </div>
                </div>

                <div className="mb-3 sm:mb-4">
                  <div className="text-base sm:text-lg font-bold text-green-600 mb-1">
                    {story.score}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    {story.college}
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                    <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      <Trophy className="w-3 h-3 mr-1 flex-shrink-0" />
                      {story.improvement}
                    </div>
                    <div className="text-xs text-gray-500">{story.previousScore}</div>
                  </div>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm italic mb-2 sm:mb-3">
                  "{story.story}"
                </p>

                <div className="pt-2 sm:pt-3 border-t border-gray-100">
                  <div className="flex items-center text-xs text-green-600 font-semibold">
                    <Star className="w-3 h-3 mr-1 flex-shrink-0" />
                    {story.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Schedules */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Flexible Batch Schedules
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the batch timing that best fits your schedule and learning preference. All
              batches maintain the same high-quality teaching standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {batchSchedules.map((batch, index) => (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border-l-4 border-green-500"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{batch.name}</h3>
                  <div className="sm:text-right">
                    <div className="text-base sm:text-lg font-bold text-green-600">
                      {batch.timing}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">{batch.days}</div>
                  </div>
                </div>

                <div className="mb-3 sm:mb-4">
                  <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Ideal for: {batch.target}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {batch.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-8 sm:py-12 md:py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              World-Class Campus Facilities
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Our purpose-built campus provides the ideal environment for focused learning with all
              modern amenities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {facilitiesFeatures.map((facility, index) => {
              const Icon = facility.icon
              return (
                <div key={index} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
                  <div className="flex flex-col sm:flex-row items-start mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-green-100 rounded-lg mb-3 sm:mb-0 sm:mr-4 flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                        {facility.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">{facility.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {facility.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Classroom Coaching Investment Plans
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Invest in your future with our comprehensive classroom programs. Quality education
              with personal attention at competitive pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-shadow ${tier.popular ? 'ring-2 ring-green-500 relative' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-green-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="flex items-baseline mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-green-600">
                      {tier.price}
                    </span>
                    <span className="text-sm sm:text-base text-gray-500 ml-2">
                      / {tier.duration}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-green-600 font-medium mb-4 sm:mb-6">
                    {tier.batch}
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
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
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
              🎯 Free demo class and campus tour available
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              EMI options available • Full money-back guarantee • Scholarship programs for deserving
              students
            </p>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Simple Admission Process
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Get started with our classroom coaching program in just 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {admissionProcess.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-lg"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <div className="text-base sm:text-lg font-bold text-green-600 mb-1 sm:mb-2">
                    Step {step.step}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    {step.description}
                  </p>
                  <div className="text-xs text-green-600 font-medium bg-green-50 px-2 sm:px-3 py-1 rounded-full">
                    {step.action}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/contact"
              className="bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center text-sm sm:text-base min-h-[44px] w-full sm:w-auto"
            >
              Start Your Admission Process
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
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
              Common questions about our classroom coaching program answered by our experts
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-start">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-3 sm:mr-4 mt-1 flex-shrink-0" />
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

      {/* Location & Contact */}
      <section className="py-8 sm:py-12 md:py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Visit Our Campus
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our facilities firsthand. Schedule a campus visit and see why classroom
              learning makes all the difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                Campus Location & Facilities
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm sm:text-base font-medium text-gray-900">
                      Main Campus
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      123 Education Hub, NEET Coaching Center
                      <br />
                      New Delhi - 110001
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock4 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm sm:text-base font-medium text-gray-900">
                      Operating Hours
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Monday - Saturday: 6:00 AM - 8:00 PM
                      <br />
                      Sunday: 9:00 AM - 6:00 PM (Mock tests & doubt clearing)
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm sm:text-base font-medium text-gray-900">
                      Contact Numbers
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      +91-9876543210 (Admissions)
                      <br />
                      +91-9876543211 (Academic Query)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                Schedule Your Visit
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm sm:text-base font-medium text-green-800 mb-1 sm:mb-2">
                    📅 Campus Tour
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700">
                    Visit our facilities, meet faculty, and experience our learning environment
                  </div>
                </div>

                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm sm:text-base font-medium text-blue-800 mb-1 sm:mb-2">
                    👨‍🏫 Demo Class
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700">
                    Attend a live class session and experience our teaching methodology
                  </div>
                </div>

                <div className="p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-sm sm:text-base font-medium text-purple-800 mb-1 sm:mb-2">
                    🔬 Lab Experience
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700">
                    Hands-on experience with our advanced Biology laboratory facilities
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6">
                <Link
                  href="/contact"
                  className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center text-sm sm:text-base min-h-[44px]"
                >
                  Schedule Campus Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
            Ready to Experience Traditional Learning Excellence?
          </h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              🏫 Join India's Most Effective Classroom Program
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Free</div>
                <div className="text-xs sm:text-sm md:text-base text-green-100">
                  Demo Class & Campus Tour
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Max 20</div>
                <div className="text-xs sm:text-sm md:text-base text-green-100">
                  Students Per Batch
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">96.2%</div>
                <div className="text-xs sm:text-sm md:text-base text-green-100">Success Rate</div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Link
                href="/admissions"
                className="block w-full bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors text-base sm:text-lg min-h-[44px]"
              >
                Secure Your Seat - Limited Admissions Open
              </Link>
              <Link
                href="/contact"
                className="block w-full border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors text-sm sm:text-base min-h-[44px]"
              >
                Book Free Campus Visit & Demo Class
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center justify-center">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <span>Guaranteed seat booking • Flexible payment options</span>
            </div>
            <div className="flex items-center justify-center">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <span>12+ years of classroom excellence • Proven track record</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
