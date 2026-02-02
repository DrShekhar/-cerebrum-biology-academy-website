'use client'

import { motion } from 'framer-motion'
import {
  Users,
  Trophy,
  Star,
  Award,
  BookOpen,
  Clock,
  Shield,
  Video,
  MessageCircle,
  ArrowRight,
  GraduationCap,
  Building,
  Phone,
  Calculator,
  Target,
  Car,
  TrendingUp,
  Laptop,
  School,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in NEET coaching (Mohali area). Please share details about online classes.'
)

const mohaliAreas = [
  { name: 'Phase 3B2', students: '35+', highlight: 'IT Professionals Area', priority: 'high' },
  { name: 'Phase 7', students: '30+', highlight: 'Educational Hub', priority: 'high' },
  { name: 'Sector 70', students: '25+', highlight: 'Premium Residential', priority: 'high' },
  { name: 'Sector 71', students: '20+', highlight: 'Near Airport', priority: 'medium' },
  { name: 'IT City', students: '25+', highlight: 'Tech Hub', priority: 'high' },
  { name: 'Aerocity', students: '15+', highlight: 'Near Airport', priority: 'medium' },
  { name: 'Phase 5', students: '18+', highlight: 'Commercial Area', priority: 'medium' },
  { name: 'Phase 11', students: '12+', highlight: 'Residential', priority: 'medium' },
]

const whyNotSector34 = [
  { problem: '30-45 min daily commute to Chandigarh', icon: Car },
  { problem: 'Traffic jams on Mohali-Chandigarh road', icon: Clock },
  { problem: 'Rs 3000-5000/month transport cost', icon: TrendingUp },
  { problem: '2-3 hours daily wasted in travel', icon: Clock },
  { problem: 'Exhaustion affects study quality', icon: Users },
  { problem: 'Safety concerns for late evening classes', icon: Shield },
]

const cerebrumAdvantages = [
  { point: 'Learn from home - Zero commute', icon: Laptop },
  { point: 'Same Sector 34 quality, online delivery', icon: Award },
  { point: 'Small batches of 10-15 students', icon: Users },
  { point: 'AIIMS-trained faculty', icon: GraduationCap },
  { point: 'Save Rs 50,000+ on travel yearly', icon: TrendingUp },
  { point: 'Instant doubt clearing via WhatsApp', icon: MessageCircle },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time online sessions from Mohali. Same quality as top Chandigarh coaching.',
  },
  {
    icon: Users,
    title: 'Batch Size: 10-15 Only',
    description: 'Unlike 100+ batches at Sector 34 centers. Every Mohali student gets attention.',
  },
  {
    icon: Award,
    title: 'AIIMS Faculty',
    description: 'Teachers trained at AIIMS Delhi. Not available at any Mohali coaching.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, evening batches. Perfect for Mohali school students.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Material',
    description: 'Digital notes, video recordings, practice tests - all included.',
  },
  {
    icon: Target,
    title: 'PGIMER Focus',
    description: 'Special preparation for PGIMER, GMCH - Mohali students\' top choices.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '358/360', icon: Star },
  { label: 'Mohali Students', value: '180+', icon: Users },
  { label: 'PGIMER Selections', value: '15+', icon: GraduationCap },
]

const mohaliSchools = [
  'Oakridge International School',
  'Manav Mangal Smart School',
  'Gillco International School',
  'Saupin\'s School Phase 2',
  'Learning Paths School',
  'Strawberry Fields High School',
  'Delhi Public School Mohali',
  'Mount Carmel School',
  'Ryan International School',
  'Euro International School',
]

const medicalColleges = [
  { name: 'PGIMER Chandigarh', seats: '150', distance: '12 km' },
  { name: 'GMCH Sector 32', seats: '150', distance: '10 km' },
  { name: 'AIIMS Bathinda', seats: '100', distance: '180 km' },
  { name: 'GMC Patiala', seats: '250', distance: '60 km' },
  { name: 'DMC Ludhiana', seats: '200', distance: '100 km' },
]

const neetTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Calculator },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building },
  { name: 'NEET Syllabus 2026', href: '/neet-syllabus', icon: BookOpen },
  { name: 'Previous Papers', href: '/neet-previous-papers', icon: Target },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Mohali for Biology?',
    answer: 'Cerebrum Biology Academy offers the best NEET Biology coaching for Mohali students. With AIIMS-trained faculty, 94.2% success rate, and online classes, Mohali students can access top-quality coaching without traveling to Chandigarh Sector 34. 180+ students from Mohali already enrolled.',
  },
  {
    question: 'How much does NEET coaching cost in Mohali?',
    answer: 'Cerebrum Academy fees for Mohali students: Foundation (Class 11) - Rs 24,000/year, Comprehensive (Class 12) - Rs 36,000/year, Dropper batch - Rs 68,000/year. This is 60-70% less than Sector 34 coaching centers like Allen (Rs 1.5-2.5 Lakhs) or Aakash (Rs 1-3.5 Lakhs).',
  },
  {
    question: 'Should Mohali students travel to Chandigarh Sector 34 for NEET coaching?',
    answer: 'No! Mohali students waste 2-3 hours daily commuting to Sector 34, spend Rs 3000-5000/month on transport, and get exhausted affecting study quality. Cerebrum offers same quality NEET coaching online - learn from home in Mohali, save time and money.',
  },
  {
    question: 'Is online NEET coaching effective for Mohali students?',
    answer: 'Yes! Cerebrum\'s online coaching has 94.2% success rate. Live interactive classes, small batches (10-15 students), instant doubt clearing via WhatsApp, and recorded sessions for revision. 180+ Mohali students already achieving great results.',
  },
  {
    question: 'Which areas in Mohali does Cerebrum cover?',
    answer: 'Cerebrum serves all Mohali areas: Phase 3B2, Phase 5, Phase 7, Phase 11, Sector 70, Sector 71, IT City, Aerocity, and all other phases. Online classes mean no location barriers for Mohali students.',
  },
  {
    question: 'What is the batch timing for Mohali students?',
    answer: 'Multiple batch options: Morning batch (6 AM - 8 AM), After-school batch (4 PM - 6 PM), Evening batch (7 PM - 9 PM). Mohali students can choose based on school timings. Weekend special batches also available.',
  },
  {
    question: 'How does Cerebrum compare to Allen/Aakash in Mohali area?',
    answer: 'Cerebrum advantages: (1) Batch size 10-15 vs 60-120 at Allen/Aakash, (2) AIIMS faculty vs regular MBBS teachers, (3) Fees Rs 24-68K vs Rs 1-3.5 Lakhs, (4) Online - no commute to Sector 34, (5) 94.2% success rate.',
  },
  {
    question: 'Is there any NEET coaching center in Mohali IT City?',
    answer: 'There\'s no quality NEET-specific coaching in Mohali IT City. Cerebrum provides online NEET coaching accessible from IT City. 25+ students from IT City area already enrolled. Save 45+ min daily commute to Sector 34.',
  },
  {
    question: 'Which medical colleges can Mohali students target?',
    answer: 'Mohali students can target: PGIMER Chandigarh (12 km), GMCH Sector 32 (10 km), AIIMS Bathinda, GMC Patiala, DMC Ludhiana. Cerebrum has special focus on PGIMER and GMCH preparation.',
  },
  {
    question: 'Does Cerebrum provide study material for Mohali students?',
    answer: 'Yes! Complete study material included: Digital notes (NCERT-based), Chapter-wise video lectures, 10,000+ MCQs with solutions, Previous year papers (2015-2025), Mock tests with analysis. All accessible online from Mohali.',
  },
  {
    question: 'Is dropper batch available for Mohali students?',
    answer: 'Yes! Dedicated dropper/repeater batch for Mohali students at Rs 68,000/year. Intensive program with 6-8 hours daily coaching, personal mentorship, weekly tests, and AIIMS faculty guidance. Many droppers improved 100+ marks.',
  },
  {
    question: 'How to book a free demo class from Mohali?',
    answer: 'Book free demo: (1) Call/WhatsApp: +91-8826444334, (2) Visit website: cerebrumbiologyacademy.com, (3) Attend live demo class, (4) Meet AIIMS faculty. Free demo for all Mohali students - no commitment required.',
  },
  {
    question: 'What is the success rate for Mohali students at Cerebrum?',
    answer: '94.2% of Cerebrum students qualify NEET. From Mohali specifically: 15+ students in government medical colleges in 2024, 8 in PGIMER/GMCH, highest score 358/360 in Biology.',
  },
  {
    question: 'Are there any scholarships for Mohali students?',
    answer: 'Yes! Scholarship test every month. Top performers get 25-100% fee waiver. Mohali students can appear online. Additionally, sibling discount (10%), early bird discount (15%), and need-based scholarships available.',
  },
  {
    question: 'Can Phase 3B2 Mohali students join Cerebrum?',
    answer: 'Absolutely! 35+ students already enrolled from Phase 3B2 Mohali. Online classes mean you study from home. Popular among IT professional families in Phase 3B2 who value quality education without commute hassles.',
  },
  {
    question: 'What makes Cerebrum better than local Mohali tutors?',
    answer: 'Cerebrum advantages over local tutors: (1) AIIMS-trained faculty vs local MBBS graduates, (2) Structured NEET curriculum vs generic teaching, (3) Mock tests with national ranking, (4) 94.2% proven success rate, (5) Complete study material included.',
  },
  {
    question: 'Is there a physical center in Mohali?',
    answer: 'Cerebrum is primarily online, which is actually better for Mohali students. No need to commute anywhere. Learn from your home in any Mohali area. Our physical center is in South Delhi, but online students get identical teaching quality.',
  },
  {
    question: 'How do Mohali students clear doubts in online classes?',
    answer: 'Multiple doubt-clearing options: (1) Live doubt solving in every class, (2) WhatsApp direct to faculty (response within 2 hours), (3) Weekly doubt-clearing sessions, (4) One-on-one video calls with teachers. No doubt goes unanswered.',
  },
]

export default function NEETCoachingMohaliPage() {
  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Mohali"
        citySlug="mohali"
        state="Punjab"
        localities={mohaliAreas.map((a) => a.name)}
        faqs={faqs}
        studentCount="180+"
        coordinates={{ lat: '30.7046', lng: '76.7179' }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium mb-6">
                🎯 180+ Mohali Students Already Enrolled
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Best NEET Coaching in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                  Mohali
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
                Skip the 45-min commute to Chandigarh Sector 34. Get <strong>same quality NEET coaching</strong> online
                from your home in Mohali. AIIMS faculty, 94.2% success rate, fees starting ₹24,000.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}>
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Now
                  </Button>
                </Link>
                <Link href="/book-free-demo">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                    Book Free Demo Class
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50"
              >
                <metric.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl lg:text-4xl font-bold text-blue-900">{metric.value}</div>
                <div className="text-gray-600 mt-1">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Not Sector 34 */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Mohali Students Should <span className="text-red-600">NOT</span> Travel to Sector 34
            </h2>
            <p className="text-xl text-gray-600">The hidden costs of commuting to Chandigarh coaching centers</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyNotSector34.map((item, index) => (
              <motion.div
                key={item.problem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-red-100"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-gray-700 font-medium">{item.problem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cerebrum Solution */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              The <span className="text-green-600">Cerebrum Solution</span> for Mohali Students
            </h2>
            <p className="text-xl text-gray-600">World-class NEET coaching, delivered to your home</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cerebrumAdvantages.map((item, index) => (
              <motion.div
                key={item.point}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-green-100"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-gray-700 font-medium">{item.point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mohali Areas Coverage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Students from All <span className="text-blue-600">Mohali Areas</span>
            </h2>
            <p className="text-xl text-gray-600">Online classes accessible from every corner of Mohali</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {mohaliAreas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`p-4 rounded-xl text-center ${
                  area.priority === 'high'
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="font-bold text-lg">{area.name}</div>
                <div className={`text-sm ${area.priority === 'high' ? 'text-blue-100' : 'text-gray-600'}`}>
                  {area.students} students
                </div>
                <div className={`text-xs mt-1 ${area.priority === 'high' ? 'text-blue-200' : 'text-gray-500'}`}>
                  {area.highlight}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Mohali Students Choose Cerebrum
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              <School className="w-10 h-10 inline-block mr-3 text-blue-600" />
              Students from Top Mohali Schools
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {mohaliSchools.map((school) => (
              <span
                key={school}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
              >
                {school}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Colleges */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Target Medical Colleges for Mohali Students
            </h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {medicalColleges.map((college) => (
              <div key={college.name} className="bg-white p-4 rounded-xl text-center shadow-sm">
                <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">{college.name}</div>
                <div className="text-sm text-gray-600">{college.seats} seats</div>
                <div className="text-xs text-gray-500">{college.distance} from Mohali</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Cost Comparison: Sector 34 vs Cerebrum
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-red-50 p-8 rounded-2xl border border-red-200">
              <h3 className="text-xl font-bold text-red-700 mb-6">Sector 34 Coaching (Allen/Aakash)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span>Tuition Fee</span><span className="font-bold">₹1,50,000 - ₹3,50,000</span></li>
                <li className="flex justify-between"><span>Transport (yearly)</span><span className="font-bold">₹36,000 - ₹60,000</span></li>
                <li className="flex justify-between"><span>Time Wasted (hrs/year)</span><span className="font-bold">600+ hours</span></li>
                <li className="flex justify-between"><span>Batch Size</span><span className="font-bold">60-120 students</span></li>
                <li className="flex justify-between border-t pt-3 text-lg"><span>Total Cost</span><span className="font-bold text-red-700">₹2,00,000+</span></li>
              </ul>
            </div>
            <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
              <h3 className="text-xl font-bold text-green-700 mb-6">Cerebrum Online (From Mohali Home)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span>Tuition Fee</span><span className="font-bold">₹24,000 - ₹68,000</span></li>
                <li className="flex justify-between"><span>Transport</span><span className="font-bold">₹0</span></li>
                <li className="flex justify-between"><span>Time Saved</span><span className="font-bold">600+ hours</span></li>
                <li className="flex justify-between"><span>Batch Size</span><span className="font-bold">10-15 students</span></li>
                <li className="flex justify-between border-t pt-3 text-lg"><span>Total Cost</span><span className="font-bold text-green-700">₹24,000 - ₹68,000</span></li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-2xl font-bold text-green-600">Save ₹1,30,000+ with Cerebrum!</p>
          </div>
        </div>
      </section>

      {/* NEET Tools */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Free NEET Tools for Mohali Students</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {neetTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <tool.icon className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <VideoTestimonialsSection />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions - NEET Coaching Mohali
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-5 bg-white">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your NEET Journey from Mohali?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 180+ Mohali students who chose smart preparation over daily commute.
            Book your free demo class today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}>
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Call/WhatsApp: +91-8826444334
              </Button>
            </Link>
            <Link href="/book-free-demo">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                Book Free Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="py-4 bg-gray-100">
        <div className="container mx-auto px-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/neet-coaching-punjab" className="hover:text-blue-600">NEET Coaching Punjab</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Mohali</li>
          </ol>
        </div>
      </nav>
    </div>
  )
}
