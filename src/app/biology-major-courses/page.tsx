'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  Users,
  GraduationCap,
  Award,
  Clock,
  CheckCircle,
  Star,
  Play,
  Phone,
  Microscope,
  Dna,
  Brain,
  Leaf,
  Heart,
  Beaker,
  FlaskConical,
  Shield,
  TreeDeciduous,
  Atom,
  Building2,
  Globe2,
  Target,
  TrendingUp,
  MessageCircle,
  FileText,
  Lightbulb,
  BookOpenCheck,
  PenTool,
  Search,
  UserCheck,
  Calendar,
  Briefcase,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function BiologyMajorCoursesPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_biology_major', {
        event_category: 'conversion',
        event_label: 'biology_major_courses_landing_page',
        value: 1,
      })
    }
    window.location.href = '/demo-booking'
  }

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click_biology_major', {
        event_category: 'engagement',
        event_label: 'biology_major_courses_page',
      })
    }
    window.open('https://wa.me/918826444334', '_blank')
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What biology courses do you offer tutoring for college students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer expert tutoring for all undergraduate biology major courses including General Biology I & II, Cell Biology, Molecular Biology, Genetics, Biochemistry, Microbiology, Anatomy & Physiology, Ecology, Evolutionary Biology, and Immunology. Our tutors have graduate-level expertise and experience teaching at top universities.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you help with MCAT preparation for pre-med students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We specialize in helping pre-med students master biology concepts for the MCAT. Our tutors focus on biological and biochemical foundations, cellular and molecular biology, and organ systems that are critical for MCAT success.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you help with biology assignments and lab reports?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! We provide comprehensive support for biology assignments, lab report writing, data analysis, and scientific writing. Our tutors guide you through proper experimental design, results interpretation, and academic writing standards.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which universities do your students come from?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our students come from top universities worldwide including MIT, Stanford, Harvard, UC Berkeley, Oxford, Cambridge, Imperial College London, Delhi University, JNU, and many other prestigious institutions. We also support students in online degree programs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer research methodology and thesis support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We provide expert guidance on research methodology, experimental design, literature review, data analysis, and thesis/dissertation writing for undergraduate and graduate biology students.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the cost of college biology tutoring?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our college biology tutoring rates vary based on course complexity and session duration. We offer flexible packages starting from ₹1,500 per hour for undergraduate courses. Contact us for personalized pricing and package deals.',
        },
      },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Biology Major Courses - Expert Tutoring for College Students',
    description:
      'Comprehensive tutoring for undergraduate biology courses including Cell Biology, Molecular Biology, Genetics, Biochemistry, Microbiology, Anatomy, Physiology, Ecology, and more. Expert support for pre-med students, nursing students, and biology majors.',
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    courseMode: 'online',
    educationalLevel: 'Undergraduate',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'College Student',
    },
  }

  const heroStats = [
    { label: '200+', sublabel: 'College Students', icon: Users },
    { label: 'Top Unis', sublabel: 'MIT, Stanford, DU', icon: Building2 },
    { label: 'PhD Tutors', sublabel: 'Graduate Experts', icon: GraduationCap },
    { label: '4.9/5', sublabel: 'Student Rating', icon: Star },
  ]

  const coursesSupported = [
    {
      name: 'General Biology I & II',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      topics: ['Cell Theory', 'Biomolecules', 'Genetics Basics', 'Evolution'],
    },
    {
      name: 'Cell Biology',
      icon: Microscope,
      color: 'from-purple-500 to-pink-500',
      topics: ['Cell Structure', 'Organelles', 'Cell Cycle', 'Signaling'],
    },
    {
      name: 'Molecular Biology',
      icon: Dna,
      color: 'from-emerald-500 to-teal-500',
      topics: ['DNA Replication', 'Transcription', 'Translation', 'Gene Expression'],
    },
    {
      name: 'Genetics',
      icon: Atom,
      color: 'from-orange-500 to-red-500',
      topics: ['Mendelian Genetics', 'Chromosomes', 'Population Genetics', 'Genomics'],
    },
    {
      name: 'Biochemistry',
      icon: Beaker,
      color: 'from-yellow-500 to-orange-500',
      topics: ['Metabolism', 'Enzymes', 'Pathways', 'Bioenergetics'],
    },
    {
      name: 'Microbiology',
      icon: FlaskConical,
      color: 'from-indigo-500 to-purple-500',
      topics: ['Bacteria', 'Viruses', 'Microbial Growth', 'Immunology'],
    },
    {
      name: 'Anatomy & Physiology',
      icon: Heart,
      color: 'from-rose-500 to-pink-600',
      topics: ['Organ Systems', 'Homeostasis', 'Nervous System', 'Circulation'],
    },
    {
      name: 'Ecology',
      icon: TreeDeciduous,
      color: 'from-green-500 to-emerald-500',
      topics: ['Ecosystems', 'Biodiversity', 'Conservation', 'Climate Change'],
    },
    {
      name: 'Evolutionary Biology',
      icon: Leaf,
      color: 'from-lime-500 to-green-500',
      topics: ['Natural Selection', 'Speciation', 'Phylogenetics', 'Adaptation'],
    },
    {
      name: 'Immunology',
      icon: Shield,
      color: 'from-red-500 to-rose-500',
      topics: ['Immune Response', 'Antibodies', 'Vaccines', 'Autoimmunity'],
    },
  ]

  const targetAudience = [
    {
      title: 'Pre-Med Students',
      description:
        'MCAT biology prep, medical school prerequisites, and foundational science courses',
      icon: Heart,
      color: 'from-rose-600 to-pink-700',
      benefits: ['MCAT Biology Section', 'Biochemical Foundations', 'Organ Systems'],
    },
    {
      title: 'Biology Majors',
      description: 'Complete support for undergraduate biology curriculum and career preparation',
      icon: Microscope,
      color: 'from-blue-600 to-indigo-700',
      benefits: ['Core Biology Courses', 'Elective Support', 'Career Guidance'],
    },
    {
      title: 'Nursing Students',
      description: 'Anatomy, physiology, microbiology, and pathophysiology for nursing programs',
      icon: UserCheck,
      color: 'from-teal-600 to-cyan-700',
      benefits: ['Clinical Sciences', 'Patient Care Biology', 'Nursing Exams'],
    },
    {
      title: 'Biotechnology Students',
      description: 'Molecular biology, genetics, and biotech applications for industry careers',
      icon: Dna,
      color: 'from-purple-600 to-violet-700',
      benefits: ['Genetic Engineering', 'Bioprocess', 'Lab Techniques'],
    },
    {
      title: 'Research Aspirants',
      description: 'Research methodology, experimental design, and academic writing support',
      icon: Search,
      color: 'from-emerald-600 to-green-700',
      benefits: ['Research Design', 'Data Analysis', 'Scientific Writing'],
    },
  ]

  const universitiesSupported = [
    {
      region: 'US Universities',
      examples: ['MIT', 'Stanford', 'Harvard', 'UC Berkeley', 'Johns Hopkins', 'Yale'],
      icon: Globe2,
    },
    {
      region: 'UK Universities',
      examples: ['Oxford', 'Cambridge', 'Imperial College', 'UCL', 'Edinburgh', 'Manchester'],
      icon: Building2,
    },
    {
      region: 'Indian Universities',
      examples: ['DU', 'JNU', 'BHU', 'IISc', 'AIIMS', 'JIPMER'],
      icon: GraduationCap,
    },
    {
      region: 'Online Degrees',
      examples: ['Coursera', 'edX', 'ASU Online', 'UoPeople', 'Open University'],
      icon: BookOpen,
    },
  ]

  const servicesOffered = [
    {
      title: 'Concept Clarification',
      description: 'In-depth explanations of complex biology concepts with real-world examples',
      icon: Lightbulb,
      features: ['Visual Learning', 'Interactive Sessions', 'Doubt Clearing'],
    },
    {
      title: 'Assignment Help',
      description: 'Step-by-step guidance on homework, problem sets, and case studies',
      icon: BookOpenCheck,
      features: ['Problem Solving', 'Critical Thinking', 'Time Management'],
    },
    {
      title: 'Lab Report Writing',
      description: 'Expert guidance on scientific writing, data analysis, and report structure',
      icon: FileText,
      features: ['Data Interpretation', 'Scientific Writing', 'Formatting'],
    },
    {
      title: 'Research Methodology',
      description: 'Comprehensive support for experimental design and research projects',
      icon: Search,
      features: ['Experimental Design', 'Literature Review', 'Methodology'],
    },
    {
      title: 'Thesis/Dissertation Support',
      description: 'End-to-end guidance for undergraduate and graduate research projects',
      icon: PenTool,
      features: ['Research Planning', 'Writing Support', 'Defense Prep'],
    },
    {
      title: 'Exam Preparation',
      description: 'Targeted prep for midterms, finals, MCAT, and professional exams',
      icon: Target,
      features: ['Practice Tests', 'Revision Strategy', 'Exam Techniques'],
    },
  ]

  const learningFeatures = [
    {
      title: 'Graduate-Level Tutors',
      description: 'Learn from PhD scholars and professors with research experience',
      icon: GraduationCap,
    },
    {
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your college schedule and time zone',
      icon: Calendar,
    },
    {
      title: 'Topic-Specific Sessions',
      description: 'Focus on exactly what you need help with, no fluff',
      icon: Target,
    },
    {
      title: 'Research Guidance',
      description: 'Expert mentorship for undergraduate research projects',
      icon: Briefcase,
    },
  ]

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-600 via-pink-600 to-pink-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/20">
                <GraduationCap className="w-5 h-5 mr-2" />
                College & University Biology Support
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Biology Major Courses
                <span className="block text-3xl md:text-4xl mt-2 text-pink-100">
                  Expert Tutoring for College Students
                </span>
              </h1>

              <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
                Excel in your undergraduate biology courses with personalized tutoring from
                graduate-level experts. From Cell Biology to MCAT prep, we've got you covered.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-white text-rose-600 hover:bg-pink-50 shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>

                <Button
                  variant="outline"
                  size="xl"
                  onClick={handleWhatsAppClick}
                  className="border-2 border-white text-white hover:bg-white hover:text-rose-600 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp: +91 88264 44334
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {heroStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                  >
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-pink-100" />
                    <div className="text-2xl font-bold">{stat.label}</div>
                    <div className="text-xs opacity-90">{stat.sublabel}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Glassmorphism Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Why Choose Us?</h3>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-start bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">PhD-Level Tutors</div>
                      <div className="text-sm opacity-90">
                        Learn from graduate students and professors with research experience
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">Flexible Scheduling</div>
                      <div className="text-sm opacity-90">
                        Book sessions that fit your college schedule and time zone
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-start bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">Topic-Specific Help</div>
                      <div className="text-sm opacity-90">
                        Focus on exactly what you need - assignments, exams, or research
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="text-center mt-6">
                  <p className="text-sm opacity-90">Trusted by 200+ college students worldwide</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses We Support */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Biology Major Courses We Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tutoring for all undergraduate biology courses with expert guidance from
              PhD-level tutors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesSupported.map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <course.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{course.name}</h3>
                <div className="space-y-2">
                  {course.topics.map((topic) => (
                    <div key={topic} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-rose-500 flex-shrink-0" />
                      {topic}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Who We Help Excel</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized tutoring designed for different academic paths and career goals in
              biology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {targetAudience.map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${audience.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <audience.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{audience.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{audience.description}</p>

                  <div className="space-y-2">
                    {audience.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 mr-2 text-rose-600 flex-shrink-0" />
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* University Support */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Supporting Students from Top Universities Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Ivy League to online programs, we help students excel in their biology courses
              regardless of their institution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {universitiesSupported.map((uni, index) => (
              <motion.div
                key={uni.region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <uni.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{uni.region}</h3>
                <div className="space-y-2">
                  {uni.examples.map((example) => (
                    <div key={example} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-3 h-3 mr-2 text-rose-500 flex-shrink-0" />
                      {example}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Biology Support Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept clarification to thesis support, we provide end-to-end academic
              assistance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesOffered.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-rose-50 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm text-gray-700">
                      <ArrowRight className="w-4 h-4 mr-2 text-rose-600 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              College-level biology tutoring designed by experts who understand your academic
              challenges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our college biology tutoring services
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-rose-50 rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white font-bold text-sm">Q</span>
                  </div>
                  {faq.name}
                </h3>
                <p className="text-gray-600 ml-11 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-rose-600 via-pink-600 to-pink-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Excel in Your Biology Major Courses?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Join 200+ college students who are mastering biology with expert guidance. From Cell
              Biology to MCAT prep, we're here to help you succeed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-white text-rose-600 hover:bg-pink-50 shadow-xl"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo Class
              </Button>

              <Button
                variant="outline"
                size="xl"
                onClick={handleWhatsAppClick}
                className="border-2 border-white text-white hover:bg-white hover:text-rose-600 shadow-xl"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm opacity-90">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>200+ College Students</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span>4.9/5 Average Rating</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                <span>PhD-Level Tutors</span>
              </div>
              <div className="flex items-center">
                <Globe2 className="w-4 h-4 mr-2" />
                <span>Top Universities Worldwide</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm opacity-80">
                Call us:{' '}
                <a href="tel:+918826444334" className="font-bold hover:underline">
                  +91 88264 44334
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
