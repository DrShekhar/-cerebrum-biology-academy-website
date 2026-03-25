'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  Star,
  ArrowRight,
  Trophy,
  Brain,
  Lightbulb,
  Microscope,
  GraduationCap,
  MessageCircle,
  ChevronRight,
  FlaskConical,
  BookMarked,
  Quote,
} from 'lucide-react'
import { PricingDisplay } from '@/components/ui/PricingDisplay'

export default function Class9FoundationPage() {
  const router = useRouter()
  const courseFeatures = [
    'Fun and interactive Biology learning',
    'NCERT-based conceptual foundation',
    'Age-appropriate teaching methods',
    'Visual learning with models and charts',
    'Basic scientific terminology introduction',
    'Hands-on activities and experiments',
    'Regular assessments with feedback',
    'Study skills development for teenagers',
  ]

  const curriculum = [
    {
      title: 'Unit 1: The Fundamental Unit of Life',
      topics: [
        'Cell - Basic Unit of Life',
        'Cell Structure & Organelles',
        'Cell Division (Mitosis & Meiosis)',
        'Cell Functions & Transport',
        'Prokaryotic vs Eukaryotic Cells',
        'Practical: Microscope observation of cells',
      ],
      duration: '6 weeks',
      focus: 'Foundation Building',
      neetRelevance: '8% NEET weightage',
    },
    {
      title: 'Unit 2: Tissues, Organs, Organ System',
      topics: [
        'Plant Tissues (Meristematic & Permanent)',
        'Animal Tissues (Epithelial, Connective, Muscular, Nervous)',
        'Tissue Organization in Plants',
        'Organ Systems in Animals',
        'Practical: Tissue slide observation',
        'Practical: Drawing & labeling tissue diagrams',
      ],
      duration: '6 weeks',
      focus: 'Structural Biology',
      neetRelevance: '6% NEET weightage',
    },
    {
      title: 'Unit 3: Diversity in Living Organisms',
      topics: [
        'Classification & Taxonomy Basics',
        'Five Kingdom Classification System',
        'Plant Kingdom (Thallophyta to Angiosperms)',
        'Animal Kingdom (Porifera to Mammalia)',
        'Nomenclature & Binomial System',
        'Practical: Specimen identification',
      ],
      duration: '8 weeks',
      focus: 'Biodiversity',
      neetRelevance: '10% NEET weightage',
    },
    {
      title: 'Unit 4: Life Processes',
      topics: [
        'Life Processes Overview',
        'Nutrition in Plants & Animals',
        'Transportation in Plants & Animals',
        'Respiration (Aerobic & Anaerobic)',
        'Excretion in Organisms',
        'Practical: Photosynthesis experiment',
      ],
      duration: '8 weeks',
      focus: 'Physiology Basics',
      neetRelevance: '15% NEET weightage',
    },
  ]

  const successStats = [
    { number: '95%', label: 'Board Exam Success', description: 'Students scoring 85+ marks' },
    { number: '600+', label: 'Students Taught', description: 'Class 9 Biology' },
    { number: '24', label: 'Tests Per Year', description: 'Weekly + monthly assessments' },
    { number: '15', label: 'Max Batch Size', description: 'Personal attention guaranteed' },
  ]

  const uniqueFeatures = [
    {
      icon: Brain,
      title: 'Age-Appropriate Learning',
      description:
        'Teaching methods designed for 13-14 year olds with interactive, story-based sessions that make Biology fun',
    },
    {
      icon: Microscope,
      title: 'Practical Lab Sessions',
      description:
        'Hands-on experiments, microscope sessions, and specimen observation to make Biology come alive',
    },
    {
      icon: Lightbulb,
      title: '3D Concept Visualization',
      description:
        'Visual learning with 3D models, animated diagrams, and real-life examples for lasting understanding',
    },
    {
      icon: Trophy,
      title: 'Early NEET Advantage',
      description:
        'Build foundational concepts in Class 9 that give you a 2-year head start over peers who start in Class 11',
    },
  ]

  const learningApproach = [
    {
      method: 'Story-Based Learning',
      description: 'Complex biological processes explained through engaging stories and analogies',
      icon: BookMarked,
    },
    {
      method: 'Visual Demonstrations',
      description: 'Interactive models, charts, and real-life examples to understand concepts',
      icon: Microscope,
    },
    {
      method: 'Hands-On Activities',
      description: 'Simple experiments and activities to experience Biology practically',
      icon: FlaskConical,
    },
    {
      method: 'Interactive Discussions',
      description: 'Group discussions and Q&A sessions to develop scientific thinking',
      icon: MessageCircle,
    },
  ]

  const parentTestimonials = [
    {
      name: 'Mrs. Priya Sharma',
      child: 'Aanya, Class 9',
      school: 'DPS Noida',
      quote:
        'My daughter went from finding Biology boring to absolutely loving it. She now scores consistently above 90 in school tests. The practical sessions with microscopes were a game-changer.',
      rating: 5,
    },
    {
      name: 'Mr. Rajesh Gupta',
      child: 'Arjun, Class 9',
      school: 'Modern School, Delhi',
      quote:
        'We enrolled Arjun in Class 9 and the difference was visible within 2 months. His understanding of cell biology is now deeper than most Class 11 students. Dr. Shekhar makes complex topics simple.',
      rating: 5,
    },
    {
      name: 'Mrs. Neha Verma',
      child: 'Ishika, Class 9',
      school: 'Amity International',
      quote:
        'The small batch size means my daughter gets personal attention. She asks questions freely and the teachers know her strengths and weaknesses. Her board marks improved from 72 to 91.',
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: 'Is Class 9 too early to start Biology specialization?',
      answer:
        'Not at all! Class 9 is the perfect time to build strong Biology concepts. Our foundation course focuses on conceptual clarity and developing scientific curiosity, not intensive competition preparation. Students who start in Class 9 have a 2-year advantage when they begin serious NEET preparation in Class 11.',
    },
    {
      question: 'How does this help with regular school board exams?',
      answer:
        'Our foundation course directly enhances school Biology performance. The curriculum follows NCERT Class 9 syllabus with deeper conceptual understanding. 95% of our Class 9 students score 85+ in school Biology exams. Many students report that school topics feel easy after our classes.',
    },
    {
      question: 'What teaching methods are used for Class 9 students?',
      answer:
        'We use age-appropriate methods including story-based learning, 3D model demonstrations, hands-on lab experiments with microscopes, interactive group discussions, and animated diagrams. Our approach makes Biology engaging rather than rote-memorization based.',
    },
    {
      question: 'Are there practical/lab sessions included?',
      answer:
        'Yes! Each unit includes 2-3 practical sessions. Students work with microscopes to observe cells and tissues, conduct photosynthesis experiments, examine preserved specimens, and create labeled diagrams. We provide a free lab kit (worth ₹5,000) on enrollment.',
    },
    {
      question: 'How many hours per week does this require?',
      answer:
        'The program requires just 3 hours per week — one 2-hour weekend class plus 1 hour of guided practice. This is designed to complement school studies without creating additional burden. Most parents find it actually improves overall study habits.',
    },
    {
      question: 'Will this help my child transition to Class 10 smoothly?',
      answer:
        'Absolutely. Class 9 Biology topics like cell biology, tissues, and life processes are the foundation for Class 10 concepts. Students who complete our Class 9 course find Class 10 Biology significantly easier, with 85% reporting a smooth transition and improved confidence.',
    },
    {
      question: 'What are the fee options and do you offer scholarships?',
      answer:
        'We offer 3 tiers: Pursuit (₹45,000/year, batch of 30), Ascent (₹60,000/year, batch of 20), and Pinnacle (₹90,000/year, batch of 12 with extra mentoring). EMI options available. Merit scholarships of up to 30% are offered based on a simple entrance test.',
    },
    {
      question: 'What is included vs what costs extra?',
      answer:
        'All tiers include: weekly classes, study materials, 24 assessments/year, parent progress reports, and doubt-clearing sessions. Pinnacle tier adds: 1-on-1 mentoring, free lab kit (₹5,000 value), and priority scheduling. There are no hidden costs.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <ChevronRight className="w-3.5 h-3.5" />
          <li><Link href="/courses" className="hover:text-blue-600">Courses</Link></li>
          <ChevronRight className="w-3.5 h-3.5" />
          <li className="text-gray-900 font-medium">Class 9 Foundation</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <p className="text-blue-200 font-medium mb-2 text-sm sm:text-base">
                Taught by Dr. Shekhar Singh (AIIMS Faculty) | 600+ Students
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Class 9 Biology Foundation
              </h1>
              <div className="bg-yellow-500 text-gray-900 inline-block px-4 py-2 rounded-lg font-bold text-lg sm:text-xl mb-4">
                NEET Foundation — ₹60,000/year
              </div>
              <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8">
                Give your child a 2-year head start for NEET. Fun, interactive Biology classes that
                build deep understanding — not just memorization. 95% of our students score 85+ in
                board exams. Starting at just ₹5,000/month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/admissions"
                  className="w-full sm:w-auto bg-yellow-500 text-gray-900 px-6 sm:px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center min-h-[48px]"
                >
                  Enroll Now — ₹60,000/year
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center min-h-[48px]"
                >
                  Book Free Demo Class
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Course Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-300 flex-shrink-0" />
                  <span>28 Weeks Intensive + Review (3 hrs/week)</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 mr-3 text-blue-300 flex-shrink-0" />
                  <span>Small Batch (Max 12-30 students per tier)</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-blue-300 flex-shrink-0" />
                  <span>AIIMS Faculty — Dr. Shekhar Singh</span>
                </div>
                <div className="flex items-center">
                  <Microscope className="w-6 h-6 mr-3 text-blue-300 flex-shrink-0" />
                  <span>Lab Kit + Microscope Sessions Included</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-6 h-6 mr-3 text-blue-300 flex-shrink-0" />
                  <span>24 Tests/Year + Parent Progress Reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {successStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Profile */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Learn from the Best
            </h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-14 h-14 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Dr. Shekhar Singh</h3>
              <p className="text-blue-600 font-medium mb-3">Founder & Lead Biology Faculty</p>
              <p className="text-gray-700 mb-3">
                M.Sc Biology, Ph.D Botany | 8+ years teaching experience | Specialist in
                foundation-level teaching that builds conceptual clarity from day one.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">100+ NEET Qualifiers</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Cell Biology Specialist</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">Plant Sciences Expert</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Approach */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Class 9 Teaching Approach
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Specially designed learning methods that make Biology fun and engaging for teenagers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {learningApproach.map((approach, index) => {
              const Icon = approach.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    {approach.method}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{approach.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose - Unique Features */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Start in Class 9?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Students who build foundations in Class 9 have a proven 2-year advantage over those who
              start NEET prep in Class 11
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {uniqueFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Class 9 Biology Curriculum
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              NCERT-aligned syllabus enhanced with NEET-relevant conceptual depth and practical sessions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {curriculum.map((unit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border-l-4 border-blue-600"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                    {unit.title}
                  </h3>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium block mb-1">
                      {unit.duration}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs font-medium block mb-1">
                      {unit.focus}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                      {unit.neetRelevance}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {unit.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center">
                      <BookOpen className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Testimonials */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              What Parents Say
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Real feedback from parents of our Class 9 students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {parentTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-5 sm:p-6 shadow-md">
                <Quote className="w-8 h-8 text-blue-200 mb-3" />
                <p className="text-gray-700 text-sm sm:text-base mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                <p className="text-gray-500 text-xs">
                  Parent of {testimonial.child} | {testimonial.school}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features Checklist */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              What You Get
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Enrollment */}
      <section className="py-8 sm:py-12 md:py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8">Most parents choose the <strong className="text-blue-700">NEET Foundation (₹60,000/year)</strong> — the best balance of quality and value</p>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold mb-3">MOST POPULAR</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  NEET Foundation — ₹60,000/year
                </h3>
                <div className="text-left space-y-2 sm:space-y-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">28 weeks program (4.5 hrs/week) with AIIMS faculty</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">16-25 students per batch — personal attention</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">EMI: ₹5,000/month | 2% off on lump sum</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium text-green-700">Also available: Pursuit ₹45K | Pinnacle ₹90K</span>
                  </div>
                </div>
              </div>

              <div>
                <PricingDisplay
                  courseId="class-9-foundation-biology"
                  showTiers={true}
                  highlightTier="ascent"
                  showCompetitiveAdvantage={true}
                  onEnrollClick={() => router.push('/admissions')}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-300 rounded-xl p-4 sm:p-6">
            <p className="text-base sm:text-lg text-indigo-900 font-bold mb-2">
              Enrollment Bonus — Free Lab Kit Worth ₹5,000
            </p>
            <p className="text-sm sm:text-base text-indigo-700 mb-3">
              Every Pinnacle tier student receives: Biology lab kit + microscope slides + lab manual +
              specimen collection kit. Limited to first 20 enrollments this batch.
            </p>
            <Link
              href="/admissions"
              className="inline-flex items-center bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors min-h-[44px]"
            >
              Claim Your Spot
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-10 md:mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Explore Related Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Link
              href="/courses/class-10-foundation"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Class 10 Foundation
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Continue building your Biology foundation with Class 10 advanced concepts and board exam preparation.
              </p>
              <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                View Course <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>

            <Link
              href="/courses/neet-foundation"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                NEET Foundation (Class 11)
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                The natural next step after Class 10 — intensive NEET Biology preparation with competitive exam focus.
              </p>
              <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                View Course <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>

            <Link
              href="/neet-biology-mcq"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Free MCQ Practice
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Start practicing Biology MCQs aligned with NCERT Class 9 syllabus. 19,600+ questions available.
              </p>
              <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                Try Free <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
