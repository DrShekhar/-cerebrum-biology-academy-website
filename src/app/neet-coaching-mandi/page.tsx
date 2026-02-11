'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
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
  Mountain,
} from 'lucide-react'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

export default function NEETCoachingMandi() {
  const nearbyAreas = [
    { name: 'Mandi Town', students: '180+', distance: 'Main City' },
    { name: 'Sundernagar', students: '120+', distance: '25 km' },
    { name: 'Nerchowk', students: '90+', distance: '18 km' },
    { name: 'Pandoh', students: '45+', distance: '20 km' },
    { name: 'Jogindernagar', students: '65+', distance: '50 km' },
    { name: 'Karsog', students: '40+', distance: '55 km' },
    { name: 'Sarkaghat', students: '50+', distance: '40 km' },
    { name: 'Rewalsar', students: '35+', distance: '24 km' },
  ]

  const faqs = [
    {
      question: 'Which is the best NEET coaching in Mandi for 2026 preparation?',
      answer:
        'Cerebrum Biology Academy is the top-rated NEET coaching for Mandi students, offering online classes from AIIMS-trained faculty. With 98% success rate and flexible timings suitable for hill students, we provide comprehensive preparation including live classes, doubt sessions, and study materials specifically designed for HP Board students.',
    },
    {
      question: 'How can students from Sundernagar and Nerchowk join NEET coaching?',
      answer:
        "Students from Sundernagar, Nerchowk, and nearby areas can easily join our online NEET coaching from home. No need to travel to Chandigarh or Delhi for quality coaching. Our live interactive classes are accessible from anywhere in Mandi district with stable internet connection. We've helped 200+ students from Mandi district clear NEET.",
    },
    {
      question: 'What are the fees for NEET coaching in Mandi?',
      answer:
        'Our NEET coaching fees are significantly lower than traditional Kota/Chandigarh coaching. Complete 2-year program costs ₹45,000-65,000 (vs ₹2-3 lakhs for offline coaching). You also save on hostel, food, and travel expenses. EMI options and scholarships available for HP students scoring 80%+ in Class 10.',
    },
    {
      question: 'Is online NEET coaching effective for students in hilly areas like Mandi?',
      answer:
        "Absolutely! Our online coaching is specifically designed for students in hilly regions. Classes are recorded for areas with connectivity issues, downloadable materials work offline, and our flexible timing accommodates local conditions. Many of our SLBSGMC Nerchowk selections came from online students in Mandi district.",
    },
    {
      question: 'What about SLBSGMC Nerchowk admission through NEET?',
      answer:
        'SLBSGMC (Shri Lal Bahadur Shastri Government Medical College) Nerchowk is in Mandi district itself with 120 MBBS seats. HP domicile students need 550+ marks for state quota. Our coaching specifically prepares for this with dedicated HP quota guidance. Being in Mandi, you can study medicine close to home!',
    },
    {
      question: 'Do you provide study material suitable for HP Board students?',
      answer:
        'Yes! Our study materials bridge the gap between HP Board syllabus and NEET requirements. We provide NCERT-aligned notes, HP Board to NEET transition modules, and practice papers. Special focus on topics where HP Board differs from CBSE to ensure comprehensive preparation.',
    },
    {
      question: 'How do doubt-clearing sessions work for Mandi students?',
      answer:
        "We offer daily doubt sessions from 6-9 PM (convenient for hill area students), WhatsApp doubt support, and one-on-one video calls for complex topics. Our faculty understands the specific challenges faced by HP Board students and provides personalized attention. Average doubt resolution time is 2 hours.",
    },
    {
      question: 'What is the batch timing for Mandi area students?',
      answer:
        'Understanding that Mandi students have different schedules due to weather and local conditions, we offer multiple batch options: Morning batch (6-8 AM), Evening batch (5-8 PM), and Weekend intensive batches. Recorded lectures available for revision anytime. Special winter timing adjustments available.',
    },
    {
      question: 'Can I prepare for NEET while studying in Mandi schools?',
      answer:
        'Yes! Many of our successful students prepared alongside their Class 11-12 studies in schools like DAV Mandi, Government Senior Secondary School, and Jawahar Navodaya. Our schedule is designed to complement school timings. We also provide school exam preparation support.',
    },
    {
      question: 'What medical colleges can Mandi students target through NEET?',
      answer:
        'Mandi students can target: SLBSGMC Nerchowk (120 seats - in your own district!), IGMC Shimla (120 seats), RPGMC Tanda (100 seats), AIIMS Bilaspur (100 seats), DRGMC Kangra (120 seats), plus all government medical colleges across India through All India Quota.',
    },
  ]

  const localSchools = [
    'DAV Public School Mandi',
    'Govt. Senior Secondary School Mandi',
    'Jawahar Navodaya Vidyalaya Mandi',
    'Army Public School Pandoh',
    'St. Bedes School Sundernagar',
    'DAV Centenary School Sundernagar',
    'Govt. Model Sr. Sec. School Nerchowk',
    'Little Flower School Mandi',
    'Sunrise Public School Mandi',
    'Green Valley Public School Sundernagar',
  ]

  const medicalColleges = [
    { name: 'SLBSGMC Nerchowk', seats: 120, distance: '18 km', state: 'HP', highlight: true },
    { name: 'IGMC Shimla', seats: 120, distance: '150 km', state: 'HP', highlight: false },
    { name: 'AIIMS Bilaspur', seats: 100, distance: '90 km', state: 'HP', highlight: false },
    { name: 'RPGMC Tanda', seats: 100, distance: '180 km', state: 'HP', highlight: false },
    { name: 'DRGMC Kangra', seats: 120, distance: '180 km', state: 'HP', highlight: false },
    { name: 'MMMC Solan', seats: 150, distance: '200 km', state: 'HP', highlight: false },
  ]

  return (
    <>
      <CitySchema
        cityName="Mandi"
        stateName="Himachal Pradesh"
        url="https://cerebrumacademy.in/neet-coaching-mandi"
        description="Best NEET coaching in Mandi, Himachal Pradesh. Online classes from AIIMS faculty for Mandi, Sundernagar, Nerchowk students. 98% success rate. Prepare for SLBSGMC from home."
        areaServed={['Mandi', 'Sundernagar', 'Nerchowk', 'Pandoh', 'Jogindernagar', 'Karsog', 'Sarkaghat', 'Rewalsar']}
        faqs={faqs}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full filter blur-[128px]" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-5xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-6">
                <Mountain className="w-4 h-4 text-indigo-400" />
                <span className="text-indigo-300 text-sm font-medium">
                  Sadar District | SLBSGMC Nerchowk in Your District
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Best NEET Coaching in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Mandi
                </span>{' '}
                2026
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Top-rated online NEET coaching for students from Mandi, Sundernagar, Nerchowk & entire Sadar district.
                <span className="text-indigo-400 font-semibold"> SLBSGMC is just 18 km away</span> - prepare from home
                with AIIMS faculty.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="https://wa.me/919872100215?text=Hi%2C%20I%27m%20from%20Mandi%20and%20interested%20in%20NEET%20coaching.%20Please%20share%20details."
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
                  { number: '98%', label: 'Success Rate', icon: TrendingUp },
                  { number: '200+', label: 'Mandi Students', icon: Users },
                  { number: '650+', label: 'Avg. NEET Score', icon: Target },
                  { number: '35+', label: 'HP Selections', icon: Award },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
                  >
                    <stat.icon className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Mandi Students Struggle Section */}
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
                Why Mandi Students Need{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Expert Guidance
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">❌ The Problem</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Limited quality coaching options in Mandi district
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      SLBSGMC nearby but no focused preparation guidance
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Travel to Chandigarh/Delhi costly and time-consuming
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Weather disruptions affect regular coaching
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      HP Board to NEET syllabus gaps not addressed
                    </li>
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">✓ Our Solution</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      AIIMS-trained faculty available online from home
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Specific guidance for HP medical college admissions
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Save ₹2-3 lakhs on hostel and travel
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Weather-proof learning with recorded lectures
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      HP Board to NCERT bridge modules included
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Mandi District
                </span>
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                From Mandi town to Jogindernagar, we help students across the entire district prepare for NEET from home
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {nearbyAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-indigo-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-indigo-400" />
                      <span className="text-white font-medium">{area.name}</span>
                    </div>
                    <div className="text-sm text-slate-400">{area.students} students enrolled</div>
                    <div className="text-xs text-indigo-400 mt-1">{area.distance}</div>
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
                What Makes Us the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Best Choice
                </span>{' '}
                for Mandi
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[
                  {
                    icon: Video,
                    title: 'Live Interactive Classes',
                    description:
                      'Real-time classes with AIIMS faculty. Ask questions, get instant answers. Recorded for revision.',
                  },
                  {
                    icon: BookOpen,
                    title: 'HP Board Integration',
                    description:
                      'Special modules bridging HP Board syllabus with NEET requirements. No gaps in preparation.',
                  },
                  {
                    icon: FileText,
                    title: 'Complete Study Material',
                    description:
                      'NCERT-aligned notes, 10,000+ MCQs, previous year papers with HP-specific analysis.',
                  },
                  {
                    icon: MessageCircle,
                    title: '24/7 Doubt Support',
                    description:
                      'WhatsApp doubt clearing, evening video sessions, one-on-one attention when needed.',
                  },
                  {
                    icon: Target,
                    title: 'Weekly Tests & Analysis',
                    description:
                      'Regular assessments with detailed performance analysis. Track your NEET readiness.',
                  },
                  {
                    icon: GraduationCap,
                    title: 'HP Counselling Guidance',
                    description:
                      'Complete support for HP NEET counselling. College selection strategy for state quota.',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-indigo-400" />
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
                Popular Schools in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Mandi District
                </span>
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                Students from these schools trust Cerebrum for their NEET preparation
              </p>

              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {localSchools.map((school, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-slate-300 text-sm hover:border-indigo-500/50 hover:text-indigo-300 transition-all duration-300"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Medical Colleges
                </span>{' '}
                for Mandi Students
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                SLBSGMC Nerchowk is in your own district! Multiple HP medical colleges within reach
              </p>

              <div className="max-w-4xl mx-auto overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-slate-300 font-semibold">College</th>
                      <th className="text-center py-4 px-4 text-slate-300 font-semibold">MBBS Seats</th>
                      <th className="text-center py-4 px-4 text-slate-300 font-semibold">Distance</th>
                      <th className="text-center py-4 px-4 text-slate-300 font-semibold">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicalColleges.map((college, index) => (
                      <tr
                        key={index}
                        className={`border-b border-white/5 ${
                          college.highlight ? 'bg-indigo-500/10' : ''
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Building2
                              className={`w-4 h-4 ${college.highlight ? 'text-indigo-400' : 'text-slate-500'}`}
                            />
                            <span className={college.highlight ? 'text-indigo-300 font-semibold' : 'text-white'}>
                              {college.name}
                            </span>
                            {college.highlight && (
                              <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                                Your District!
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Mandi vs Kota
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                    <IndianRupee className="w-5 h-5" />
                    Kota/Chandigarh Coaching
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex justify-between">
                      <span>Coaching Fees (2 years)</span>
                      <span className="text-red-400">₹2,00,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Hostel & Food</span>
                      <span className="text-red-400">₹2,40,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Travel & Misc</span>
                      <span className="text-red-400">₹60,000</span>
                    </li>
                    <li className="flex justify-between border-t border-red-500/20 pt-3 font-semibold">
                      <span>Total</span>
                      <span className="text-red-400">₹5,00,000+</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                    <IndianRupee className="w-5 h-5" />
                    Cerebrum Online from Mandi
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex justify-between">
                      <span>Complete Program (2 years)</span>
                      <span className="text-green-400">₹65,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Study at Home</span>
                      <span className="text-green-400">₹0</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Family Support</span>
                      <span className="text-green-400">Priceless</span>
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
                  Save <span className="text-green-400">₹4,35,000+</span> with better results!
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Questions
                </span>
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                Everything Mandi students and parents want to know about NEET coaching
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
                        <span className="text-indigo-400 group-open:rotate-180 transition-transform duration-300">
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
        <section className="py-20 bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your NEET Journey from{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Mandi
                </span>
                ?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                SLBSGMC Nerchowk is just 18 km away. Join Cerebrum Academy and make your medical dream a reality - from
                home!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://wa.me/919872100215?text=Hi%2C%20I%27m%20from%20Mandi%20and%20want%20to%20join%20NEET%20coaching.%20Please%20share%20the%20admission%20process."
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
                Join 200+ students from Mandi district who chose smart preparation
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
