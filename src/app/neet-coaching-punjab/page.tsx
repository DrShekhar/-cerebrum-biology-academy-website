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
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Building,
  Phone,
  IndianRupee,
  Home,
  Wifi,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am from Punjab and interested in online NEET coaching. Please share details.'
)

const punjabCities = [
  {
    name: 'Ludhiana',
    students: '250+',
    highlight: 'Largest Punjab City',
    url: '/neet-coaching-ludhiana-punjab',
    targetCollege: 'DMC Ludhiana',
  },
  {
    name: 'Mohali',
    students: '180+',
    highlight: 'IT City, Near Chandigarh',
    url: '/neet-coaching-mohali-punjab',
    targetCollege: 'PGIMER Chandigarh',
  },
  {
    name: 'Jalandhar',
    students: '120+',
    highlight: 'Education Hub',
    url: '/neet-coaching-jalandhar-punjab',
    targetCollege: 'Punjab Quota',
  },
  {
    name: 'Amritsar',
    students: '90+',
    highlight: 'Holy City',
    url: '/neet-coaching-amritsar-punjab',
    targetCollege: 'GMC Amritsar',
  },
  {
    name: 'Patiala',
    students: '75+',
    highlight: 'Royal City',
    url: '/neet-coaching-patiala-punjab',
    targetCollege: 'GMC Patiala',
  },
  {
    name: 'Bathinda',
    students: '45+',
    highlight: 'South Punjab',
    url: '/neet-coaching-bathinda-punjab',
    targetCollege: 'AIIMS Bathinda',
  },
]

const features = [
  {
    icon: Home,
    title: 'Study From Home',
    description: 'No need to relocate to Chandigarh or Kota. Same quality coaching from your city.',
  },
  {
    icon: IndianRupee,
    title: 'Save Rs 2-3 Lakhs',
    description: 'No hostel, no PG, no food expenses. Invest savings in your future.',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Personalized attention unlike crowded coaching centers.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert doctors and teachers from premier medical institutions.',
  },
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time online coaching with instant doubt resolution.',
  },
  {
    icon: Wifi,
    title: 'Learn Anywhere',
    description: 'Works on mobile, tablet, or laptop. Just need internet.',
  },
]

const successMetrics = [
  { label: 'Punjab Students', value: '760+', icon: Users },
  { label: 'Success Rate', value: '94%', icon: Trophy },
  { label: 'DMC/GMC Selections', value: '45+', icon: GraduationCap },
  { label: 'Average Improvement', value: '95 marks', icon: Star },
]

const medicalColleges = [
  {
    name: 'DMC Ludhiana',
    seats: '75 MBBS',
    type: 'Private Aided',
    cutoff: '580-620',
    note: 'Top choice for Punjab students',
  },
  {
    name: 'GMC Patiala',
    seats: '150 MBBS',
    type: 'Government',
    cutoff: '590-640',
    note: 'Rajindra Hospital attached',
  },
  {
    name: 'GMC Amritsar',
    seats: '150 MBBS',
    type: 'Government',
    cutoff: '585-635',
    note: 'Historic medical college',
  },
  {
    name: 'AIIMS Bathinda',
    seats: '100 MBBS',
    type: 'Central Govt',
    cutoff: '640-680',
    note: 'All India quota only',
  },
  {
    name: 'PGIMER Chandigarh',
    seats: '150 MBBS',
    type: 'Central Govt',
    cutoff: '680-720',
    note: 'Top medical institute',
  },
  {
    name: 'GMCH Chandigarh',
    seats: '150 MBBS',
    type: 'UT Govt',
    cutoff: '650-690',
    note: 'Chandigarh UT quota',
  },
]

const whyNotRelocate = [
  {
    title: 'Hostel Cost',
    chandigarh: 'Rs 8,000-15,000/month',
    online: 'Rs 0 (Home)',
    savings: 'Rs 96,000-1.8 Lakh/year',
  },
  {
    title: 'Food Cost',
    chandigarh: 'Rs 5,000-8,000/month',
    online: 'Home food (included)',
    savings: 'Rs 60,000-96,000/year',
  },
  {
    title: 'Coaching Fees',
    chandigarh: 'Rs 1.5-3.5 Lakh/year',
    online: 'Rs 24,000-68,000/year',
    savings: 'Rs 1-2.8 Lakh/year',
  },
  {
    title: 'Travel Home',
    chandigarh: 'Rs 2,000-5,000/trip',
    online: 'Rs 0 (Already home)',
    savings: 'Rs 24,000-60,000/year',
  },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching for Punjab students?',
    answer:
      'Cerebrum Biology Academy is the top choice for Punjab students with 760+ enrolled from across the state. Our online live classes bring AIIMS-quality coaching to your home - no need to relocate to Chandigarh or Kota. 94% success rate, small batches of 10-15 students.',
  },
  {
    question: 'Do I need to go to Chandigarh for good NEET coaching?',
    answer:
      'No! Our online live classes match Chandigarh Sector 34 coaching quality. Save Rs 2-3 lakhs on hostel, food, and travel. Same AIIMS faculty, same curriculum, better attention with 10-15 students vs 50-100 in Chandigarh centers.',
  },
  {
    question: 'Which Punjab medical colleges can I target through NEET?',
    answer:
      'Punjab students can target: DMC Ludhiana (75 MBBS seats), GMC Patiala (150 seats), GMC Amritsar (150 seats), GMC Faridkot (100 seats), plus AIIMS Bathinda (100 seats), PGIMER Chandigarh (150 seats), and private colleges like CMC Ludhiana, SGRD Amritsar.',
  },
  {
    question: 'What is Punjab state quota in medical admissions?',
    answer:
      'Punjab reserves 85% seats in government medical colleges for state domicile students. This includes DMC Ludhiana, GMC Patiala, GMC Amritsar, and GMC Faridkot. Our coaching covers Punjab counselling process and cutoff strategies.',
  },
  {
    question: 'What is the fee for online NEET coaching for Punjab students?',
    answer:
      'Our NEET Biology coaching ranges from Rs 24,000 to Rs 68,000 per year. Compare to relocating to Chandigarh (Rs 3-4 lakhs including hostel, food, coaching). Same AIIMS faculty, significant cost savings. EMI available.',
  },
  {
    question: 'Is online coaching effective for NEET preparation?',
    answer:
      'Absolutely! Our 94% success rate proves online coaching works. Live interactive classes (not recorded), instant doubt resolution, WhatsApp support 24/7, recorded sessions for revision. 760+ Punjab students enrolled and succeeding.',
  },
  {
    question: 'Which cities in Punjab do you serve?',
    answer:
      'We serve all Punjab cities: Ludhiana (250+ students), Mohali (180+), Jalandhar (120+), Amritsar (90+), Patiala (75+), Bathinda (45+), plus Pathankot, Hoshiarpur, Moga, Fazilka, and rural areas. Online classes reach everywhere.',
  },
  {
    question: 'Can I prepare for NEET while studying in Punjab board school?',
    answer:
      'Yes! We have special batches for Punjab Board students. Our curriculum covers both board syllabus and NEET-specific MCQ training. Many Punjab Board students score 600+ in NEET with our coaching.',
  },
  {
    question: 'Do you have special batches for NEET droppers from Punjab?',
    answer:
      'Yes! Our dropper batch is intensive with 6-8 hours daily coverage. Previous year Punjab droppers improved by 80-120 marks on average. Dedicated doubt sessions, weekly tests, mentor support included. WhatsApp 88264-44334 for details.',
  },
  {
    question: 'How do I enroll from Punjab?',
    answer:
      'Simple! 1) Book free demo class via WhatsApp (88264-44334), 2) Attend live demo with actual faculty, 3) Choose your batch timing, 4) Pay online (EMI available), 5) Start learning from Day 1. No travel needed!',
  },
]

export default function NEETCoachingPunjabPage() {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: 'punjab_neet_page',
      })
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Punjab',
    description: 'Best online NEET Biology coaching for Punjab students',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-punjab',
    areaServed: {
      '@type': 'State',
      name: 'Punjab',
      containedInPlace: {
        '@type': 'Country',
        name: 'India',
      },
    },
    offers: {
      '@type': 'Offer',
      name: 'NEET Biology Coaching for Punjab Students',
      price: '24000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  }

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
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
              Punjab State | No Relocation Needed
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-[#4ade80]">NEET Coaching in Punjab</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Ludhiana | Mohali | Jalandhar | Amritsar | Patiala | All Punjab
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium online NEET Biology coaching for Punjab students. No need to relocate to
              Chandigarh or Kota. AIIMS faculty, 94% success rate. Target DMC Ludhiana, GMC Amritsar,
              GMC Patiala from your home!
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
              <span>Call: </span>
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

      {/* Why Not Relocate */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Relocate to Chandigarh When You Can Study From Home?
            </h2>
            <p className="text-lg text-gray-600">Save Rs 2-3 Lakhs per year with online coaching</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg">
              <thead>
                <tr className="bg-[#1e3a5f] text-white">
                  <th className="px-6 py-4 text-left">Expense</th>
                  <th className="px-6 py-4 text-center">Relocate to Chandigarh</th>
                  <th className="px-6 py-4 text-center">Online (From Home)</th>
                  <th className="px-6 py-4 text-center text-[#4ade80]">Your Savings</th>
                </tr>
              </thead>
              <tbody>
                {whyNotRelocate.map((item, index) => (
                  <tr key={item.title} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{item.title}</td>
                    <td className="px-6 py-4 text-center text-red-600">{item.chandigarh}</td>
                    <td className="px-6 py-4 text-center text-green-600">{item.online}</td>
                    <td className="px-6 py-4 text-center font-bold text-[#1e3a5f]">
                      {item.savings}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#1e3a5f] text-white font-bold">
                  <td className="px-6 py-4">TOTAL ANNUAL</td>
                  <td className="px-6 py-4 text-center">Rs 3.5-5.5 Lakhs</td>
                  <td className="px-6 py-4 text-center">Rs 24K-68K</td>
                  <td className="px-6 py-4 text-center text-[#4ade80]">Rs 2.8-4.8 Lakhs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Punjab Cities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Coaching Across Punjab
            </h2>
            <p className="text-lg text-gray-600">760+ students from all major Punjab cities</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {punjabCities.map((city, index) => (
              <Link href={city.url} key={city.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-[#1e3a5f]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                    <MapPin className="w-5 h-5 text-[#1e3a5f]" />
                  </div>
                  <div className="text-3xl font-bold text-[#1e3a5f] mb-2">{city.students}</div>
                  <div className="text-sm text-gray-500 mb-3">{city.highlight}</div>
                  <div className="flex items-center text-sm text-green-600">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    Target: {city.targetCollege}
                  </div>
                  <div className="mt-4 flex items-center text-[#1e3a5f] font-medium">
                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Punjab Students Choose Online Coaching
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
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-[#1e3a5f] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Colleges */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Target These Medical Colleges
            </h2>
            <p className="text-lg text-gray-600">Punjab and nearby medical colleges for NEET 2026</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicalColleges.map((college, index) => (
              <motion.div
                key={college.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#1e3a5f]"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{college.name}</h3>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Seats:</span> {college.seats}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Type:</span> {college.type}
                  </p>
                  <p className="text-[#1e3a5f] font-medium">
                    Expected Cutoff: {college.cutoff} marks
                  </p>
                  <p className="text-green-600 text-xs mt-2">{college.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              FAQs - NEET Coaching Punjab
            </h2>
          </motion.div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-md"
                itemScope
                itemType="https://schema.org/Question"
              >
                <h3
                  className="text-lg font-bold text-gray-900 mb-4 flex items-start"
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

      {/* Related Pages */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Explore NEET Coaching in Punjab Cities
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/neet-coaching-chandigarh"
              className="bg-gray-100 hover:bg-[#1e3a5f] hover:text-white px-4 py-2 rounded-full transition-colors"
            >
              Chandigarh
            </Link>
            <Link
              href="/neet-coaching-ludhiana-punjab"
              className="bg-gray-100 hover:bg-[#1e3a5f] hover:text-white px-4 py-2 rounded-full transition-colors"
            >
              Ludhiana
            </Link>
            <Link
              href="/neet-coaching-mohali-punjab"
              className="bg-gray-100 hover:bg-[#1e3a5f] hover:text-white px-4 py-2 rounded-full transition-colors"
            >
              Mohali
            </Link>
            <Link
              href="/neet-coaching-jalandhar-punjab"
              className="bg-gray-100 hover:bg-[#1e3a5f] hover:text-white px-4 py-2 rounded-full transition-colors"
            >
              Jalandhar
            </Link>
            <Link
              href="/neet-coaching-amritsar-punjab"
              className="bg-gray-100 hover:bg-[#1e3a5f] hover:text-white px-4 py-2 rounded-full transition-colors"
            >
              Amritsar
            </Link>
            <Link
              href="/neet-coaching-panchkula-haryana"
              className="bg-gray-100 hover:bg-[#1e3a5f] hover:text-white px-4 py-2 rounded-full transition-colors"
            >
              Panchkula
            </Link>
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
              Ready to Crack NEET from Punjab?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 760+ Punjab students. No relocation needed. Save Rs 2-3 Lakhs!
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
