'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Users,
  Trophy,
  Star,
  Award,
  BookOpen,
  Clock,
  Shield,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Building,
  Phone,
  Calculator,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in NEET coaching in Chandigarh. Please share details.'
)

const chandigarhLocalities = [
  { name: 'Sector 17', students: '120+', highlight: 'City Center', priority: 'high' },
  { name: 'Sector 22', students: '95+', highlight: 'Commercial Hub', priority: 'high' },
  { name: 'Sector 35', students: '85+', highlight: 'Educational Zone', priority: 'high' },
  { name: 'Sector 44', students: '70+', highlight: 'Premium Residential', priority: 'high' },
  { name: 'Panchkula', students: '150+', highlight: 'Haryana Extension', priority: 'high' },
  { name: 'Mohali', students: '180+', highlight: 'IT City Punjab', priority: 'high' },
  { name: 'Sector 15', students: '65+', highlight: 'Near PU', priority: 'medium' },
  { name: 'Zirakpur', students: '90+', highlight: 'Fast Growing', priority: 'medium' },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time online coaching for Chandigarh Tricity. No commute needed.',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Personalized attention unlike crowded Sector 34 coaching centers.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert doctors and teachers from premier medical institutions.',
  },
  {
    icon: BookOpen,
    title: 'CBSE + NEET Focus',
    description: 'Complete biology coaching for both board exams and NEET.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, evening batches. Fit your school schedule.',
  },
  {
    icon: Shield,
    title: 'Tricity Coverage',
    description: 'Chandigarh, Panchkula, Mohali - all served with same quality.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '358', icon: Star },
  { label: 'Tricity Students', value: '780+', icon: Users },
  { label: 'PGIMER Selections', value: '15+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Chandigarh for Biology?',
    answer:
      'Cerebrum Biology Academy is rated the best NEET biology coaching in Chandigarh with 94.2% success rate. Unlike Sector 34 coaching centers with 50-100 students per batch, we offer small batches of 10-15 students with AIIMS-trained faculty. Our 780+ Tricity students and 15+ PGIMER selections make us the top choice.',
  },
  {
    question: 'Why choose online NEET coaching over Chandigarh Sector 34 centers?',
    answer:
      'Sector 34 coaching centers like Allen and Aakash have 50-100+ students per batch. Our online classes limit to 10-15 students ensuring personalized attention. Plus, save 1-2 hours daily commute from Panchkula/Mohali. Same 94.2% success rate, better attention, no traffic stress.',
  },
  {
    question: 'What areas in Chandigarh Tricity do you serve for NEET coaching?',
    answer:
      'We serve entire Chandigarh Tricity: Chandigarh (Sectors 15, 17, 22, 34, 35, 44, Manimajra), Panchkula (all sectors including Pinjore, Kalka), Mohali (Phase 1-11, IT City, Aerocity), Zirakpur, Kharar, and Derabassi. Online live classes mean you can join from anywhere.',
  },
  {
    question: 'What is the fee for NEET coaching in Chandigarh?',
    answer:
      'Our NEET Biology coaching ranges from Rs 24,000 to Rs 68,000 per year. Compare this to Sector 34 centers (Rs 1-3.5 lakhs) with 50-100 students per batch. You get AIIMS faculty, smaller batches (10-15), and personalized attention. EMI options available. Call 88264-44334.',
  },
  {
    question: 'Which medical colleges can Chandigarh students target after NEET?',
    answer:
      'With strong NEET scores, Tricity students can target: PGIMER Chandigarh (top choice, 150 seats), GMCH Chandigarh (150 seats), AIIMS Bathinda, GMC Patiala, DMC Ludhiana, AIIMS Delhi, Maulana Azad MC Delhi, plus Punjab and Haryana state quota seats.',
  },
  {
    question: 'How do I prepare for PGIMER Chandigarh admission?',
    answer:
      'PGIMER Chandigarh requires top NEET scores (typically 680+ marks for general category). Our coaching specifically covers PGIMER cutoff trends, counselling process, and seat matrix. 15+ students from Cerebrum have secured PGIMER admission. We provide dedicated PGIMER strategy sessions.',
  },
  {
    question: 'Do you prepare for both CBSE boards and NEET simultaneously?',
    answer:
      'Yes! Most Chandigarh students follow CBSE curriculum which aligns 80% with NEET. We cover both board exam preparation and NEET-specific MCQ training. Students typically score 95+ in boards while preparing for NEET. Integrated approach saves time.',
  },
  {
    question: 'How is Cerebrum different from Allen Chandigarh?',
    answer:
      'Allen Chandigarh has large batches (50-100+ students) and fees of Rs 1.5-2.5 lakhs. Cerebrum offers small batches (10-15 students), AIIMS-trained faculty (not just MBBS graduates), flexible online format saving commute time, and fees of Rs 24K-68K. Our 94.2% success rate competes with Allen\'s results.',
  },
  {
    question: 'How is Cerebrum different from Aakash Chandigarh?',
    answer:
      'Aakash Chandigarh operates 7 centers with 100+ students per batch and fees of Rs 1-3.5 lakhs. Cerebrum offers personalized attention with 10-15 students per batch, faculty exclusively from AIIMS (not mixed), online format with no commute, and significantly lower fees. Same quality, better attention.',
  },
  {
    question: 'Is online NEET coaching effective for Chandigarh students?',
    answer:
      'Absolutely! Our online coaching has 94.2% success rate - same as top Sector 34 centers. Live interactive classes (not recorded), instant doubt resolution, WhatsApp support, recorded sessions for revision. 780+ Tricity students enrolled. Many prefer it over crowded offline centers.',
  },
  {
    question: 'What are the batch timings for Chandigarh NEET students?',
    answer:
      'We offer flexible batch timings: Morning (7-9 AM), Afternoon (2-4 PM post school), Evening (6-8 PM most popular), and Weekend batches. All batches are live interactive, not recorded. Choose timing based on your school schedule. Call 88264-44334 for current availability.',
  },
  {
    question: 'Is Cerebrum good for NEET droppers in Chandigarh?',
    answer:
      'Yes! Our dropper batch is intensive with 6-8 hours daily coverage. Previous year Chandigarh droppers improved by 80-120 marks on average. Dedicated doubt sessions, weekly tests, mentor support, and personalized study plans included. WhatsApp 88264-44334 for dropper batch details.',
  },
  {
    question: 'Which schools in Chandigarh trust Cerebrum for NEET coaching?',
    answer:
      'Students from top Chandigarh schools choose us: DPS Chandigarh, Bhavan Vidyalaya, St. John\'s High School, Carmel Convent, AKSIPS, Vivek High School, DAV Schools, St. Kabir, Saupin\'s, and Strawberry Fields. Our flexible online timings work with all school schedules.',
  },
  {
    question: 'Do Panchkula students need to come to Chandigarh for coaching?',
    answer:
      'No! Our online live classes eliminate the need to commute from Panchkula to Chandigarh. Same AIIMS faculty, same curriculum, same results - from the comfort of your home. 150+ Panchkula students enrolled. Save 1-2 hours daily commute time for extra study.',
  },
  {
    question: 'Do Mohali students need to travel to Sector 34 for NEET coaching?',
    answer:
      'Not anymore! Our online classes bring Sector 34 quality coaching to Mohali. 180+ students from Mohali (Phase 1-11, IT City, Aerocity) enrolled. No commute stress, same AIIMS faculty, better attention with 10-15 students vs 50-100 in offline centers.',
  },
  {
    question: 'What study material do you provide for NEET Biology?',
    answer:
      'Complete NCERT-focused study material including: Chapter-wise notes, 15,000+ MCQ bank, previous year papers (2015-2025), topic tests, full-length mock tests, quick revision sheets, and mnemonics. All material is updated for NEET 2026 pattern. Included in course fee.',
  },
  {
    question: 'How can I book a free demo class for NEET coaching?',
    answer:
      'Book your free demo class by: 1) WhatsApp 88264-44334, 2) Call 88264-44334, or 3) Click "Book Free Demo" on this page. Demo classes are live interactive sessions with actual faculty. No payment required. Experience our teaching before enrolling.',
  },
  {
    question: 'What is the refund policy if I don\'t like the coaching?',
    answer:
      'We offer a 7-day trial period. If you\'re not satisfied within the first week of joining, get a full refund (minus payment gateway charges). We\'re confident in our quality - 95% students continue after trial. No questions asked refund policy.',
  },
]

const premiumSchools = [
  'DAV Public Schools Chandigarh',
  'St. Johns High School',
  'Carmel Convent School',
  'Bhavan Vidyalaya',
  'St. Kabir Public School',
  'Strawberry Fields High',
  'Vivek High School',
  'Aksips Schools',
  'DPS Chandigarh',
  'St. Annes Convent',
]

const neetTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Calculator },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: Target },
  { name: 'NEET Exam Countdown', href: '/neet-exam-countdown', icon: Clock },
]

export default function NEETCoachingChandigarhPage() {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: 'chandigarh_neet_page',
      })
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Chandigarh"
        citySlug="chandigarh"
        state="Chandigarh"
        localities={chandigarhLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="780"
        coordinates={{ lat: '30.7333', lng: '76.7794' }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              The City Beautiful | Chandigarh Tricity
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-[#4ade80]">NEET Coaching in Chandigarh</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Sector 17 | Sector 35 | Panchkula | Mohali | All Tricity
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium NEET Biology coaching for Chandigarh Tricity. 94.2% success rate, AIIMS
              faculty. Target PGIMER, GMCH with expert guidance. Join 780+ Tricity students!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] text-white hover:bg-[#20BD5A] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp Us Now</span>
              </Button>
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-[#4ade80] text-[#1e3a5f] hover:bg-[#22c55e]"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-white/90 mb-12">
              <Phone className="w-5 h-5" />
              <span>Or call us: </span>
              <a
                href="tel:+918826444334"
                className="font-bold hover:text-[#4ade80] transition-colors"
              >
                +91-88264-44334
              </a>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-[#4ade80]" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEET Tools */}
      <section className="py-12 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Free NEET Preparation Tools</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {neetTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transition-all hover:scale-105"
              >
                <tool.icon className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">{tool.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/neet-tools">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1e3a5f]"
              >
                View All NEET Tools <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Localities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Coaching Across Chandigarh Tricity
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chandigarhLocalities.map((locality, index) => (
              <motion.div
                key={locality.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${locality.priority === 'high' ? 'ring-2 ring-[#1e3a5f]' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-[#1e3a5f]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1e3a5f] mb-1">{locality.students}</div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Chandigarh Students Choose Us
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-[#1e3a5f] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Chandigarh Schools Trust Us
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {premiumSchools.map((school) => (
                <span
                  key={school}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium"
                >
                  {school}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              FAQs - NEET Coaching Chandigarh
            </h2>
          </motion.div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
                itemScope
                itemType="https://schema.org/Question"
              >
                <h3
                  className="text-xl font-bold text-gray-900 mb-4 flex items-start"
                  itemProp="name"
                >
                  <MessageCircle className="w-6 h-6 mr-3 text-[#1e3a5f] flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-gray-700 leading-relaxed ml-9" itemProp="text">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Crack NEET from Chandigarh?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 780+ Tricity students. Target PGIMER, GMCH. 94.2% success rate!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] text-white hover:bg-[#20BD5A] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp Us Now</span>
              </Button>
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-white text-[#1e3a5f] hover:bg-gray-100"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/90">
              <Phone className="w-5 h-5" />
              <span>Call: </span>
              <a
                href="tel:+918826444334"
                className="font-bold hover:text-[#4ade80] transition-colors"
              >
                +91-88264-44334
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
