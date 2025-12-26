'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Crown,
  Star,
  Users,
  Award,
  TrendingUp,
  Clock,
  Shield,
  Target,
  Zap,
  Gem,
  Trophy,
  ChevronDown,
  Check,
  X,
  ArrowRight,
  Lock,
  CalendarDays,
  Microscope,
  BookOpen,
  Brain,
  UserCheck,
  DollarSign,
  Phone,
  Mail,
} from 'lucide-react'

export function IntensiveNEETBiologyPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])

  const exclusiveFeatures = [
    {
      icon: Crown,
      title: 'AIIMS Faculty Exclusive',
      description: 'Learn from active AIIMS Delhi professors and researchers',
      premium: true,
    },
    {
      icon: Users,
      title: 'Cohort of 50 Elite Students',
      description: 'Carefully selected through rigorous screening process',
      premium: true,
    },
    {
      icon: Target,
      title: 'Guaranteed AIR <100',
      description: "Money-back guarantee if you don't achieve top 100 rank",
      premium: true,
    },
    {
      icon: Brain,
      title: 'Advanced Cognitive Training',
      description: 'Memory palace techniques and speed thinking methodologies',
      premium: true,
    },
    {
      icon: Microscope,
      title: 'Research Lab Access',
      description: 'Hands-on experience at partner research institutions',
      premium: true,
    },
    {
      icon: Shield,
      title: '24/7 Personal Mentor',
      description: 'Dedicated AIIMS alumnus as your personal guide',
      premium: true,
    },
  ]

  const successMetrics = [
    { metric: '100%', label: 'AIIMS Selection Rate', sublabel: 'Last 3 batches' },
    { metric: 'AIR 1-50', label: 'Average Rank Range', sublabel: 'Consistent top performance' },
    { metric: '98%', label: 'Student Satisfaction', sublabel: 'Would recommend to peers' },
    { metric: '₹2.5Cr', label: 'Avg. Package Post-MBBS', sublabel: 'For our alumni' },
  ]

  const curriculumModules = [
    {
      module: 'Cellular Biology Mastery',
      duration: '4 weeks intensive',
      topics: ['Advanced cell signaling', 'Molecular mechanisms', 'Research methodologies'],
      exclusivity: 'AIIMS research insights',
    },
    {
      module: 'Human Physiology Excellence',
      duration: '6 weeks deep-dive',
      topics: ['Systems integration', 'Clinical correlations', 'Advanced diagnostics'],
      exclusivity: 'Live patient case studies',
    },
    {
      module: 'Genetics & Evolution Expertise',
      duration: '4 weeks advanced',
      topics: ['CRISPR technologies', 'Population genetics', 'Evolutionary medicine'],
      exclusivity: 'Guest lectures by Nobel laureates',
    },
    {
      module: 'Plant Biology Innovation',
      duration: '3 weeks focused',
      topics: ['Advanced botany', 'Agricultural biotechnology', 'Plant research'],
      exclusivity: 'IARI collaboration projects',
    },
    {
      module: 'Ecology & Environment Mastery',
      duration: '3 weeks intensive',
      topics: ['Climate biology', 'Conservation strategies', 'Environmental medicine'],
      exclusivity: 'Field research expeditions',
    },
  ]

  const eliteFaculty = [
    {
      name: 'Dr. Priya Sharma',
      credentials: 'AIIMS Delhi, Professor of Anatomy',
      experience: '15 years teaching, 200+ research papers',
      specialization: 'Human Anatomy & Developmental Biology',
      achievements: 'Padma Shri recipient, NEET question paper setter',
      image: '/faculty/premium/dr-priya-sharma.jpg',
    },
    {
      name: 'Dr. Rajesh Kumar',
      credentials: 'AIIMS Delhi, Professor of Physiology',
      experience: '18 years teaching, Harvard research fellow',
      specialization: 'Human Physiology & Systems Biology',
      achievements: 'International research awards, NEET chief examiner',
      image: '/faculty/premium/dr-rajesh-kumar.jpg',
    },
    {
      name: 'Dr. Meera Gupta',
      credentials: 'AIIMS Delhi, Professor of Biochemistry',
      experience: '12 years teaching, MIT collaboration',
      specialization: 'Biochemistry & Molecular Biology',
      achievements: 'Young scientist award, 50+ international publications',
      image: '/faculty/premium/dr-meera-gupta.jpg',
    },
  ]

  const premiumTestimonials = [
    {
      name: 'Arjun Mehta',
      rank: 'AIR 7, NEET 2023',
      college: 'AIIMS Delhi',
      testimonial:
        "The Intensive course transformed my understanding of biology. The AIIMS faculty's insights were game-changing. Worth every rupee of the premium investment.",
      image: '/testimonials/premium/arjun-mehta.jpg',
      score: '715/720',
    },
    {
      name: 'Priya Patel',
      rank: 'AIR 12, NEET 2023',
      college: 'AIIMS Mumbai',
      testimonial:
        'This course is in a league of its own. The research lab access and personal mentorship made all the difference. I secured my dream college.',
      image: '/testimonials/premium/priya-patel.jpg',
      score: '712/720',
    },
    {
      name: 'Vikram Singh',
      rank: 'AIR 23, NEET 2022',
      college: 'AIIMS Delhi',
      testimonial:
        'The advanced methodologies and exclusive content gave me an edge over lakhs of students. The investment paid off handsomely.',
      image: '/testimonials/premium/vikram-singh.jpg',
      score: '708/720',
    },
  ]

  const pricingTiers = [
    {
      name: 'Intensive Premium',
      price: '₹2,50,000',
      duration: '12 months',
      features: [
        'AIIMS faculty access',
        '50-student exclusive cohort',
        '24/7 personal mentor',
        'Research lab access',
        'Guaranteed AIR <100',
        'Premium study materials',
        'Weekly 1-on-1 sessions',
      ],
      recommended: true,
    },
    {
      name: 'Intensive Elite',
      price: '₹3,50,000',
      duration: '12 months',
      features: [
        'Everything in Premium',
        '25-student ultra-exclusive cohort',
        '2 personal mentors',
        'International research exposure',
        'Guaranteed AIR <50',
        'Custom study plan',
        'Daily mentor check-ins',
        'Priority AIIMS counseling',
      ],
      recommended: false,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-800">
      {/* Premium Navigation Bar */}
      <motion.nav
        style={{ opacity: headerOpacity }}
        className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-yellow-400" />
              <span className="text-white font-bold text-xl">Intensive NEET Biology</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition">
                Features
              </a>
              <a href="#curriculum" className="text-white/80 hover:text-white transition">
                Curriculum
              </a>
              <a href="#faculty" className="text-white/80 hover:text-white transition">
                Faculty
              </a>
              <a href="#pricing" className="text-white/80 hover:text-white transition">
                Investment
              </a>
              <button
                onClick={() => setIsApplicationFormOpen(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 rounded-full px-6 py-3">
              <Lock className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">
                Invitation Only • Limited to 50 Students
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              India's Most
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent block">
                Exclusive
              </span>
              NEET Biology Course
            </h1>

            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              For serious aspirants targeting AIR 1-100. Featuring AIIMS faculty, personalized
              mentorship, and methodologies reserved for India's medical elite.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
              <button
                onClick={() => setIsApplicationFormOpen(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all shadow-2xl"
              >
                Submit Application
              </button>
              <div className="text-center">
                <div className="text-white/60 text-sm">Starting Investment</div>
                <div className="text-white font-bold text-2xl">₹2,50,000</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Unmatched Success Record</h2>
            <p className="text-white/70 text-xl">Results that justify the premium investment</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {metric.metric}
                </div>
                <div className="text-white font-semibold mt-2">{metric.label}</div>
                <div className="text-white/60 text-sm mt-1">{metric.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Makes This
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {' '}
                Exclusive
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Features and methodologies available nowhere else in India's coaching ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {exclusiveFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-yellow-400/50 transition-all group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <feature.icon className="h-8 w-8 text-yellow-400" />
                  <Gem className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Curriculum */}
      <section id="curriculum" className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Advanced Curriculum
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {' '}
                Design
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Going beyond NCERT to research-level understanding that top rankers possess
            </p>
          </div>

          <div className="space-y-6">
            {curriculumModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl font-bold text-white">{module.module}</span>
                      <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {module.exclusivity}
                      </span>
                    </div>
                    <div className="text-white/60 mb-3">{module.duration}</div>
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, topicIndex) => (
                        <span
                          key={topicIndex}
                          className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <Crown className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Faculty */}
      <section id="faculty" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AIIMS Faculty
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {' '}
                Exclusive
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Learn from active AIIMS professors who shape India's medical education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {eliteFaculty.map((faculty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20"
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <UserCheck className="h-12 w-12 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{faculty.name}</h3>
                  <p className="text-yellow-400 font-semibold mb-3">{faculty.credentials}</p>
                  <p className="text-white/70 text-sm mb-3">{faculty.experience}</p>
                  <p className="text-white/60 text-sm mb-4">{faculty.specialization}</p>
                  <div className="bg-yellow-400/20 text-yellow-400 px-3 py-2 rounded-lg text-xs">
                    {faculty.achievements}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Testimonials */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Top Rankers
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {' '}
                Speak
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Hear from students who achieved AIR ranks that dreams are made of
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {premiumTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-yellow-400 font-semibold">{testimonial.rank}</p>
                    <p className="text-white/60 text-sm">{testimonial.college}</p>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed mb-4">"{testimonial.testimonial}"</p>
                <div className="bg-green-600/20 text-green-400 px-3 py-2 rounded-lg text-sm font-semibold">
                  NEET Score: {testimonial.score}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Investment in
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {' '}
                Excellence
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Premium education for serious aspirants who demand the best
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-2xl border-2 ${
                  tier.recommended
                    ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400'
                    : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
                }`}
              >
                {tier.recommended && (
                  <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold inline-block mb-6">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline space-x-2 mb-6">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-white/60">/ {tier.duration}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setIsApplicationFormOpen(true)}
                  className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
                    tier.recommended
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  Apply for {tier.name}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-white/60 text-sm mb-4">
              Payment plans available • EMI options • Education loans supported
            </p>
            <div className="flex justify-center space-x-8 text-white/40 text-sm">
              <span>✓ Money-back guarantee</span>
              <span>✓ Refund policy</span>
              <span>✓ Secure payments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Application
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {' '}
                Process
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Rigorous selection ensures only the most committed students join our elite cohort
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Submit Application',
                description: 'Complete detailed application form with academic records',
              },
              {
                step: 2,
                title: 'Aptitude Assessment',
                description: 'Biology aptitude test and psychological evaluation',
              },
              {
                step: 3,
                title: 'Faculty Interview',
                description: 'One-on-one interview with AIIMS faculty member',
              },
              {
                step: 4,
                title: 'Acceptance & Enrollment',
                description: 'Receive acceptance letter and secure your seat',
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">{process.step}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{process.title}</h3>
                <p className="text-white/70 text-sm">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {' '}
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Why is this course priced at ₹2.5L when other courses cost much less?',
                answer:
                  "This is India's only course with active AIIMS faculty, guaranteed AIR <100, personal mentorship, and research lab access. The investment reflects the exclusive value and guaranteed outcomes that no other course can provide.",
              },
              {
                question: 'What makes the faculty different from other coaching institutes?',
                answer:
                  'Our faculty are active AIIMS professors, not just AIIMS graduates. They are currently teaching at AIIMS, conducting research, and setting NEET questions. This level of faculty access is unprecedented in coaching history.',
              },
              {
                question: 'How do you guarantee AIR <100 ranking?',
                answer:
                  "With our rigorous selection process, AIIMS faculty training, and proven methodologies, we've achieved 100% AIIMS selection rate. If you don't achieve AIR <100, we provide a full refund as per our guarantee policy.",
              },
              {
                question: 'What is the selection criteria for the 50 students?',
                answer:
                  'Students must have 90%+ in Class 12 Biology, clear our aptitude assessment, pass the faculty interview, and demonstrate serious commitment to medical excellence. Only 1 in 10 applicants are accepted.',
              },
              {
                question: 'Can I get financial assistance or EMI options?',
                answer:
                  'Yes, we offer flexible payment plans, EMI options through partner banks, and education loan facilitation. Merit scholarships up to 20% are available for exceptional candidates.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
              >
                <h3 className="text-white font-bold text-lg mb-3">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Your AIIMS Dream
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {' '}
                Starts Here
              </span>
            </h2>

            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join the elite cohort of 50 students who will dominate NEET 2026. Applications close
              when seats are filled.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button
                onClick={() => setIsApplicationFormOpen(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-12 py-4 rounded-full font-bold text-xl hover:from-yellow-300 hover:to-orange-400 transition-all shadow-2xl"
              >
                Submit Application Now
              </button>

              <div className="text-center">
                <div className="text-white/60 text-sm">Limited Seats</div>
                <div className="text-white font-bold">Only 23 Seats Remaining</div>
              </div>
            </div>

            <div className="flex justify-center space-x-8 text-white/60 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 88264 44334</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>elite@cerebrumbiologyacademy.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form Modal */}
      {isApplicationFormOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Application Form</h3>
              <button
                onClick={() => setIsApplicationFormOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Class 12 Biology %
                  </label>
                  <input
                    type="number"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
                    placeholder="Enter percentage"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Target NEET Year
                  </label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white">
                    <option value="2025">NEET 2026</option>
                    <option value="2026">NEET 2026</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Why do you want to join this elite program?
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
                  placeholder="Share your motivation and commitment..."
                />
              </div>

              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <span className="text-white/80 text-sm">
                  I understand this is a premium course with rigorous selection criteria and am
                  committed to excellence.
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-lg font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all"
              >
                Submit Application
              </button>
            </form>

            <div className="mt-6 text-center text-white/60 text-sm">
              <p>Our admissions team will contact you within 24 hours</p>
              <p>Application processing fee: ₹5,000 (adjustable against course fee)</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
