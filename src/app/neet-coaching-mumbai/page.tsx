'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  Clock,
  Users,
  Award,
  BookOpen,
  Video,
  FileText,
  MessageCircle,
  Phone,
  CheckCircle,
  TrendingUp,
  Target,
  GraduationCap,
  Building2,
  IndianRupee,
  Train,
  Building,
} from 'lucide-react'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

export default function NEETCoachingMumbai() {
  const nearbyAreas = [
    { name: 'Andheri', students: '450+', distance: 'West/East' },
    { name: 'Bandra', students: '380+', distance: 'West' },
    { name: 'Borivali', students: '320+', distance: 'West' },
    { name: 'Thane', students: '400+', distance: 'Central' },
    { name: 'Navi Mumbai', students: '350+', distance: 'East' },
    { name: 'Powai', students: '280+', distance: 'East' },
    { name: 'Mulund', students: '220+', distance: 'East' },
    { name: 'Dadar', students: '180+', distance: 'Central' },
  ]

  const faqs = [
    {
      question: 'Which is the best NEET coaching in Mumbai for 2026 preparation?',
      answer:
        "Cerebrum Biology Academy is the top-rated NEET coaching for Mumbai students. While Allen, Aakash, and local institutes have physical centers, we offer AIIMS-trained faculty online at a fraction of the cost. Our 94.2% success rate beats most Mumbai coaching centers. No more wasting 2-3 hours daily in Mumbai traffic - study from home in Andheri, Bandra, Thane, or anywhere!",
    },
    {
      question: 'What medical colleges can Mumbai students target through NEET?',
      answer:
        'Mumbai students can target prestigious colleges: Seth GS Medical College/KEM (200 seats, AIR under 2000 needed), Grant Medical College (200 seats), LTMMC Sion (200 seats), Topiwala National Medical College (200 seats), BYL Nair Hospital (150 seats). Maharashtra has 5,125+ government MBBS seats. With 600+ NEET score, top Mumbai colleges are within reach!',
    },
    {
      question: 'What NEET score is needed for Seth GS Medical College (KEM)?',
      answer:
        'For Seth GS Medical College through All India Quota, you need rank under 2,000 (around 680+ marks). For Maharashtra state quota, cutoff is around 650+ marks for general category. Grant Medical College and LTMMC accept slightly lower scores. Our coaching specifically prepares students for these competitive cutoffs.',
    },
    {
      question: 'How does online coaching save time for Mumbai students?',
      answer:
        "Mumbai's traffic is notorious - students waste 2-4 hours daily commuting to coaching centers in Andheri, Dadar, or South Mumbai. Our online coaching saves this time for actual studying. A Borivali student going to Andheri coaching wastes 500+ hours/year in travel. That's equivalent to completing the entire Biology syllabus twice!",
    },
    {
      question: 'Are fees lower than Allen/Aakash Mumbai centers?',
      answer:
        'Significantly! Allen and Aakash Mumbai charge ₹2-3 lakhs for 2-year programs, plus you spend ₹30,000-50,000 on travel annually. Our complete program costs ₹45,000-65,000 with same quality AIIMS faculty. You save ₹2+ lakhs while getting personalized attention impossible in 100+ student Mumbai batches.',
    },
    {
      question: 'Do you provide study material for Maharashtra Board students?',
      answer:
        'Yes! We provide comprehensive materials bridging Maharashtra Board syllabus with NEET requirements. NCERT-aligned notes (NEET is NCERT-based), 10,000+ MCQs, previous 15 years papers. Special focus on topics where Maharashtra Board differs from CBSE. Works equally well for CBSE/ICSE students.',
    },
    {
      question: 'How do doubt-clearing sessions work for Mumbai students?',
      answer:
        'Daily doubt sessions from 6-10 PM IST (perfect after school/college), WhatsApp support, and one-on-one video calls. Unlike crowded Mumbai coaching where doubts go unanswered, our faculty gives personal attention. Average doubt resolution under 2 hours. No question is too basic or too advanced!',
    },
    {
      question: 'Can working professionals preparing for NEET join?',
      answer:
        'Absolutely! Mumbai has many working professionals and droppers preparing for NEET. Our flexible timings with recorded lectures suit your schedule perfectly. Study at midnight after work, early morning, or weekends. Many of our successful students were working professionals from Mumbai.',
    },
    {
      question: 'What about students from Thane, Navi Mumbai, and extended suburbs?',
      answer:
        'We serve entire Mumbai Metropolitan Region - Thane, Navi Mumbai, Kalyan, Dombivli, Mira-Bhayandar, Vasai-Virar. Online coaching means premium NEET preparation reaches every corner. No more expensive Andheri/Dadar coaching center trips. Study from your home in Panvel or Bhiwandi with same quality!',
    },
    {
      question: 'How do I enroll for NEET coaching from Mumbai?',
      answer:
        'Simple 3-step process: 1) WhatsApp us or call for free counselling, 2) Attend a free demo class to experience our teaching quality, 3) Enroll online with flexible payment options including EMI. Start your NEET journey immediately - no admission tests, no waiting for batches to fill!',
    },
  ]

  const localSchools = [
    'Dhirubhai Ambani International School',
    'Bombay Scottish School',
    'Cathedral & John Connon School',
    'Jamnabai Narsee School',
    'Podar International School',
    'R.N. Podar School',
    'Balmohan Vidyamandir',
    'Oberoi International School',
    'Campion School',
    'St. Xaviers High School',
  ]

  const medicalColleges = [
    { name: 'Seth GS Medical College (KEM)', seats: 200, distance: 'Parel', state: 'MH', highlight: true },
    { name: 'Grant Medical College', seats: 200, distance: 'Byculla', state: 'MH', highlight: true },
    { name: 'LTMMC Sion', seats: 200, distance: 'Sion', state: 'MH', highlight: false },
    { name: 'Topiwala National Medical College', seats: 200, distance: 'Nair Hospital', state: 'MH', highlight: false },
    { name: 'BYL Nair Hospital', seats: 150, distance: 'Mumbai Central', state: 'MH', highlight: false },
    { name: 'TNMC & BYL Nair', seats: 150, distance: 'Central Mumbai', state: 'MH', highlight: false },
  ]

  return (
    <>
      <CitySchema
        cityName="Mumbai"
        stateName="Maharashtra"
        url="https://cerebrumacademy.in/neet-coaching-mumbai"
        description="Best NEET coaching in Mumbai, Maharashtra. Online classes from AIIMS faculty for Andheri, Bandra, Borivali, Thane, Navi Mumbai students. 94.2% success rate. Prepare for Seth GS, Grant Medical, KEM from home."
        areaServed={['Mumbai', 'Andheri', 'Bandra', 'Borivali', 'Thane', 'Navi Mumbai', 'Powai', 'Mulund', 'Dadar', 'Kalyan', 'Dombivli']}
        faqs={faqs}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/20 to-slate-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full filter blur-[128px]" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full filter blur-[128px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-5xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
                <Building className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 text-sm font-medium">
                  Financial Capital | 5,125 Maharashtra MBBS Seats | Seth GS, KEM, Grant
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Best NEET Coaching in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Mumbai
                </span>{' '}
                2026
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Stop wasting hours in Mumbai traffic!
                <span className="text-orange-400 font-semibold"> Save 500+ hours/year</span> with online NEET coaching.
                AIIMS faculty, same results, from Andheri to Navi Mumbai.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="https://wa.me/919872100215?text=Hi%2C%20I%27m%20from%20Mumbai%20and%20interested%20in%20NEET%20coaching.%20Please%20share%20details."
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Now
                </Link>
                <Link
                  href="tel:+919872100215"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  Call: +91 98721 00215
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                  { number: '94.2%', label: 'Success Rate', icon: TrendingUp },
                  { number: '2500+', label: 'Mumbai Students', icon: Users },
                  { number: '650+', label: 'Avg. NEET Score', icon: Target },
                  { number: '5125', label: 'MH MBBS Seats', icon: Award },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
                  >
                    <stat.icon className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mumbai Traffic Problem */}
        <section className="py-16 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                The Mumbai{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Commute Problem
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                    <Train className="w-5 h-5" />
                    Traditional Mumbai Coaching
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Borivali → Andheri coaching: 1.5 hrs each way
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Thane → Dadar center: 2 hrs in local trains
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      500+ hours/year wasted in travel
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Exhausted before class even starts
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      ₹30,000-50,000/year on travel alone
                    </li>
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Cerebrum Online Solution
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Zero commute - study from your bedroom
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Same AIIMS faculty as top centers
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      500 extra hours for actual studying
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Fresh mind, better concentration
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Save ₹2+ lakhs on fees + travel
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Areas We Serve */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                Serving Students Across{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Mumbai Metropolitan Region
                </span>
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                From South Mumbai to Virar, Thane to Panvel - premium NEET coaching reaches every corner
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {nearbyAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-orange-400" />
                      <span className="text-white font-medium">{area.name}</span>
                    </div>
                    <div className="text-sm text-slate-400">{area.students} students enrolled</div>
                    <div className="text-xs text-orange-400 mt-1">{area.distance}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Why Mumbai Students{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Choose Cerebrum
                </span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[
                  {
                    icon: Clock,
                    title: 'Save 500+ Hours/Year',
                    description:
                      'No Mumbai traffic. No crowded locals. That commute time becomes study time. Game changer!',
                  },
                  {
                    icon: Video,
                    title: 'AIIMS Faculty Live',
                    description:
                      'Same quality teachers as premium Andheri/Dadar centers, but accessible from your home.',
                  },
                  {
                    icon: BookOpen,
                    title: 'MH Board Compatible',
                    description:
                      'Materials bridge Maharashtra Board and CBSE with NEET. Works for all board students.',
                  },
                  {
                    icon: MessageCircle,
                    title: 'Personal Attention',
                    description:
                      'Unlike 100+ student Mumbai batches, we provide one-on-one doubt clearing sessions.',
                  },
                  {
                    icon: Target,
                    title: 'Mumbai College Focus',
                    description:
                      'Specific prep for Seth GS, Grant, KEM cutoffs. Know exactly what score you need.',
                  },
                  {
                    icon: GraduationCap,
                    title: 'MH Counselling Guide',
                    description:
                      'Complete Maharashtra CET Cell counselling support. College selection strategy.',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Local Schools Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                Top Schools in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Mumbai
                </span>
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                Students from Mumbai's elite schools trust us for NEET preparation
              </p>

              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {localSchools.map((school, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-slate-300 text-sm hover:border-orange-500/50 hover:text-orange-300 transition-all duration-300"
                  >
                    {school}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Medical Colleges Section */}
        <section className="py-16 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                Target{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Medical Colleges
                </span>{' '}
                in Mumbai
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                Seth GS (KEM), Grant Medical, LTMMC - India's most prestigious medical colleges are in your city!
              </p>

              <div className="max-w-4xl mx-auto overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-slate-300 font-semibold">College</th>
                      <th className="text-center py-4 px-4 text-slate-300 font-semibold">MBBS Seats</th>
                      <th className="text-center py-4 px-4 text-slate-300 font-semibold">Location</th>
                      <th className="text-center py-4 px-4 text-slate-300 font-semibold">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicalColleges.map((college, index) => (
                      <tr
                        key={index}
                        className={`border-b border-white/5 ${college.highlight ? 'bg-orange-500/10' : ''}`}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Building2
                              className={`w-4 h-4 ${college.highlight ? 'text-orange-400' : 'text-slate-500'}`}
                            />
                            <span className={college.highlight ? 'text-orange-300 font-semibold' : 'text-white'}>
                              {college.name}
                            </span>
                            {college.highlight && college.name.includes('Seth GS') && (
                              <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full">
                                #11 India
                              </span>
                            )}
                            {college.highlight && college.name.includes('Grant') && (
                              <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full">
                                #12 India
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-slate-300">{college.seats}</td>
                        <td className="py-4 px-4 text-center text-slate-300">{college.distance}</td>
                        <td className="py-4 px-4 text-center text-slate-300">{college.state}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-center text-slate-400 mt-6">
                + GMC Nagpur, GMC Pune, GMC Aurangabad, and 20+ more Maharashtra government medical colleges!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Cost Comparison:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Cerebrum vs Mumbai Centers
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                    <IndianRupee className="w-5 h-5" />
                    Allen/Aakash Mumbai
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex justify-between">
                      <span>Coaching Fees (2 years)</span>
                      <span className="text-red-400">₹2,50,000+</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Travel (Local/Auto/Cab)</span>
                      <span className="text-red-400">₹60,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Time Lost: 500 hrs/year</span>
                      <span className="text-red-400">Priceless</span>
                    </li>
                    <li className="flex justify-between border-t border-red-500/20 pt-3 font-semibold">
                      <span>Total</span>
                      <span className="text-red-400">₹3,10,000+</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                    <IndianRupee className="w-5 h-5" />
                    Cerebrum Online
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex justify-between">
                      <span>Complete Program (2 years)</span>
                      <span className="text-green-400">₹65,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Zero Travel Cost</span>
                      <span className="text-green-400">₹0</span>
                    </li>
                    <li className="flex justify-between">
                      <span>500 hrs Extra Study Time</span>
                      <span className="text-green-400">Bonus!</span>
                    </li>
                    <li className="flex justify-between border-t border-green-500/20 pt-3 font-semibold">
                      <span>Total</span>
                      <span className="text-green-400">₹65,000</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-2xl font-bold text-white">
                  Save <span className="text-green-400">₹2,45,000+</span> and{' '}
                  <span className="text-green-400">1000 hours</span> in 2 years!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Testimonials */}
        <VideoTestimonialsSection />

        {/* FAQs Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                Frequently Asked{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Questions
                </span>
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                Everything Mumbai students and parents want to know about NEET coaching
              </p>

              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <span className="text-white font-medium pr-4">{faq.question}</span>
                        <span className="text-orange-400 group-open:rotate-180 transition-transform duration-300">
                          ▼
                        </span>
                      </summary>
                      <div className="px-6 pb-6 text-slate-300">{faq.answer}</div>
                    </details>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-orange-900/50 to-red-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Beat the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Mumbai Commute
                </span>
                ?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Seth GS, Grant Medical, KEM - India's best medical colleges are in Mumbai. Prepare smartly from home!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://wa.me/919872100215?text=Hi%2C%20I%27m%20from%20Mumbai%20and%20want%20to%20join%20NEET%20coaching.%20Please%20share%20the%20admission%20process."
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 text-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  Book Free Demo Class
                </Link>
                <Link
                  href="tel:+919872100215"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 text-lg"
                >
                  <Phone className="w-6 h-6" />
                  Talk to Counsellor
                </Link>
              </div>

              <p className="text-slate-400 mt-6">
                Join 2500+ students from Mumbai who chose smart preparation over crowded local trains
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
