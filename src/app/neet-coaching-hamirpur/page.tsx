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
  School,
} from 'lucide-react'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

export default function NEETCoachingHamirpur() {
  const nearbyAreas = [
    { name: 'Hamirpur Town', students: '250+', distance: 'Main City' },
    { name: 'Nadaun', students: '90+', distance: '18 km' },
    { name: 'Sujanpur', students: '75+', distance: '25 km' },
    { name: 'Barsar', students: '55+', distance: '15 km' },
    { name: 'Bhoranj', students: '45+', distance: '20 km' },
    { name: 'Tira Sujanpur', students: '40+', distance: '28 km' },
    { name: 'Bijhari', students: '35+', distance: '12 km' },
    { name: 'Dhaneta', students: '30+', distance: '22 km' },
  ]

  const faqs = [
    {
      question: 'Why should I choose online coaching when Hamirpur has 59+ coaching institutes?',
      answer:
        "While Hamirpur is HP's education hub with many coaching centers, most focus on general competitive exams. For specialized NEET preparation with AIIMS-trained faculty, expert guidance, and proven 98% success rate, Cerebrum offers what local institutes can't match. Our students consistently outperform those in traditional Hamirpur coaching centers.",
    },
    {
      question: 'Which is the best NEET coaching in Hamirpur for 2026?',
      answer:
        "Cerebrum Biology Academy is the top choice for Hamirpur students seeking serious NEET preparation. Unlike general coaching centers, we specialize exclusively in NEET Biology with AIIMS-trained faculty. Our 98% success rate and 450+ HP selections speak for our quality. We combine the benefits of Hamirpur's studious environment with expert faculty you'd only find in metro cities.",
    },
    {
      question: 'How can students from Nadaun and Sujanpur join NEET coaching?',
      answer:
        "Students from Nadaun, Sujanpur, and nearby areas can join our online NEET coaching from home. No need to commute to Hamirpur town daily or relocate to Chandigarh. Our live interactive classes, recorded lectures, and doubt support are accessible from anywhere in Hamirpur district with internet connection.",
    },
    {
      question: 'What are the fees for NEET coaching compared to Hamirpur local institutes?',
      answer:
        "Our fees (₹45,000-65,000 for 2 years) are comparable to quality Hamirpur institutes but include AIIMS-level faculty, comprehensive study materials, and individual attention that local centers can't provide. You get metro-city quality education at small-town prices, without travel or hostel expenses if staying outside Hamirpur.",
    },
    {
      question: 'Does Hamirpur have its own medical college?',
      answer:
        "Hamirpur district doesn't have its own government medical college yet. The nearest is DRGMC Kangra (Dr. Radhakrishnan Government Medical College) with 120 seats, about 100 km away. Other options include SLBSGMC Nerchowk, RPGMC Tanda, and IGMC Shimla. Our coaching helps you target all HP medical colleges through state quota.",
    },
    {
      question: 'Is the education environment in Hamirpur good for NEET preparation?',
      answer:
        "Absolutely! Hamirpur is known as HP's education hub with a strong academic culture. The district has highest literacy rate in HP (89.01%). This competitive environment, combined with our expert online coaching, creates the perfect recipe for NEET success. Many of our top performers come from Hamirpur.",
    },
    {
      question: 'How does online coaching work alongside school in Hamirpur?',
      answer:
        "Our schedule is designed to complement school timings perfectly. Classes are held in morning (6-8 AM) or evening (5-8 PM) slots. Students from DAV, Govt. Schools, and other Hamirpur institutions successfully balance both. Recorded lectures ensure you never miss anything due to school activities.",
    },
    {
      question: 'What study materials do you provide for HP Board students?',
      answer:
        "We provide comprehensive materials including NCERT-aligned notes, HP Board to NEET bridge modules, 10,000+ MCQs, previous 15 years papers with analysis, and topic-wise practice sets. Special focus on areas where HP Board syllabus differs from CBSE to ensure complete NEET coverage.",
    },
    {
      question: 'What is the batch timing for Hamirpur students?',
      answer:
        "We offer flexible timing to suit Hamirpur students: Morning batch (6-8 AM), Evening batch (5-8 PM), and Weekend intensive sessions. All live classes are recorded for revision. We also adjust timings during HP Board exams to reduce stress. Doubt clearing available till 9 PM daily.",
    },
    {
      question: 'What medical colleges can Hamirpur students target through NEET?',
      answer:
        "Hamirpur students can target: DRGMC Kangra (120 seats), SLBSGMC Nerchowk (120 seats), IGMC Shimla (120 seats), RPGMC Tanda (100 seats), AIIMS Bilaspur (100 seats), MM Medical Solan (150 seats), plus 100+ government colleges across India through All India Quota with 650+ NEET score.",
    },
  ]

  const localSchools = [
    'DAV Public School Hamirpur',
    'Govt. Senior Secondary School Hamirpur',
    'Jawahar Navodaya Vidyalaya Hamirpur',
    'St. Pauls School Hamirpur',
    'Cambridge International School',
    'Govt. Girls Sr. Sec. School Hamirpur',
    'Modern Public School Nadaun',
    'Sunrise Public School Hamirpur',
    'Gurukul Academy Hamirpur',
    'Saraswati Vidya Mandir Sujanpur',
  ]

  const medicalColleges = [
    { name: 'DRGMC Kangra', seats: 120, distance: '100 km', state: 'HP', highlight: true },
    { name: 'SLBSGMC Nerchowk', seats: 120, distance: '85 km', state: 'HP', highlight: false },
    { name: 'IGMC Shimla', seats: 120, distance: '175 km', state: 'HP', highlight: false },
    { name: 'RPGMC Tanda', seats: 100, distance: '130 km', state: 'HP', highlight: false },
    { name: 'AIIMS Bilaspur', seats: 100, distance: '45 km', state: 'HP', highlight: true },
    { name: 'MMMC Solan', seats: 150, distance: '180 km', state: 'HP', highlight: false },
  ]

  return (
    <>
      <CitySchema
        cityName="Hamirpur"
        stateName="Himachal Pradesh"
        url="https://cerebrumbiologyacademy.com/neet-coaching-hamirpur"
        description="Best NEET coaching in Hamirpur, HP's education hub. Online classes from AIIMS faculty for Hamirpur, Nadaun, Sujanpur students. 98% success rate. Expert guidance beyond local coaching."
        areaServed={['Hamirpur', 'Nadaun', 'Sujanpur', 'Barsar', 'Bhoranj', 'Tira Sujanpur', 'Bijhari', 'Dhaneta']}
        faqs={faqs}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full filter blur-[128px]" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full filter blur-[128px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-5xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
                <School className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 text-sm font-medium">
                  HP's Education Hub | 89% Literacy Rate | 59+ Coaching Institutes
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Best NEET Coaching in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Hamirpur
                </span>{' '}
                2026
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                HP's education capital deserves world-class NEET coaching.
                <span className="text-amber-400 font-semibold"> Go beyond local institutes</span> - learn from AIIMS
                faculty while staying in Hamirpur.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20from%20Hamirpur%20HP%20and%20interested%20in%20NEET%20coaching.%20Please%20share%20details."
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Now
                </Link>
                <Link
                  href="tel:+918826444334"
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
                  { number: '280+', label: 'Hamirpur Students', icon: Users },
                  { number: '650+', label: 'Avg. NEET Score', icon: Target },
                  { number: '45+', label: 'HP Selections', icon: Award },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
                  >
                    <stat.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Hamirpur Needs Us Section */}
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
                Why Hamirpur's Brightest{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Choose Cerebrum
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">❌ Local Coaching Limitations</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      59+ institutes but few specialize in NEET Biology
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Most focus on JEE, Banking, SSC - NEET is secondary
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      No AIIMS/MBBS faculty available locally
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Generic teaching, not NEET-specific strategies
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Limited HP medical college admission guidance
                    </li>
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">✓ Cerebrum Advantage</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      100% NEET-focused with AIIMS faculty
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Specialized Biology coaching (not general science)
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Faculty with MBBS/MD who cleared NEET
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      NEET exam patterns, tricks, and shortcuts
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Complete HP counselling and college guidance
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Hamirpur District
                </span>
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                From Hamirpur town to Sujanpur - expert NEET coaching accessible to all
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {nearbyAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-amber-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span className="text-white font-medium">{area.name}</span>
                    </div>
                    <div className="text-sm text-slate-400">{area.students} students enrolled</div>
                    <div className="text-xs text-amber-400 mt-1">{area.distance}</div>
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
                What Sets Us{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Apart
                </span>{' '}
                in HP's Education Hub
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[
                  {
                    icon: Video,
                    title: 'Live AIIMS Faculty Classes',
                    description:
                      'Real doctors who cleared NEET teach you. Not available in any Hamirpur institute.',
                  },
                  {
                    icon: BookOpen,
                    title: 'NEET-Specific Strategy',
                    description:
                      'Focused preparation for medical entrance, not diluted general science teaching.',
                  },
                  {
                    icon: FileText,
                    title: 'HP Board + NEET Materials',
                    description:
                      'Bridge modules covering gaps between HP Board and NEET syllabus requirements.',
                  },
                  {
                    icon: MessageCircle,
                    title: 'Personal Doubt Support',
                    description:
                      'One-on-one doubt clearing sessions. Better attention than 60-student batches.',
                  },
                  {
                    icon: Target,
                    title: 'NEET Pattern Tests',
                    description:
                      'Weekly tests exactly matching NEET pattern. Real exam simulation at home.',
                  },
                  {
                    icon: GraduationCap,
                    title: 'HP Counselling Expert',
                    description:
                      'Complete guidance for HP NEET counselling. Know which college to target.',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-amber-400" />
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Hamirpur District
                </span>
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                Students from these schools excel with Cerebrum's expert guidance
              </p>

              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {localSchools.map((school, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-slate-300 text-sm hover:border-amber-500/50 hover:text-amber-300 transition-all duration-300"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Medical Colleges
                </span>{' '}
                for Hamirpur Students
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                AIIMS Bilaspur is just 45 km away! Multiple HP medical colleges accessible
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
                        className={`border-b border-white/5 ${college.highlight ? 'bg-amber-500/10' : ''}`}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Building2
                              className={`w-4 h-4 ${college.highlight ? 'text-amber-400' : 'text-slate-500'}`}
                            />
                            <span className={college.highlight ? 'text-amber-300 font-semibold' : 'text-white'}>
                              {college.name}
                            </span>
                            {college.highlight && college.name.includes('AIIMS') && (
                              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                                Nearest AIIMS!
                              </span>
                            )}
                            {college.highlight && college.name.includes('DRGMC') && (
                              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                                Nearest GMC
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
                Smart Investment:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Cerebrum vs Relocation
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                    <IndianRupee className="w-5 h-5" />
                    Chandigarh/Kota Relocation
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
                    Cerebrum from Hamirpur
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex justify-between">
                      <span>Complete Program (2 years)</span>
                      <span className="text-green-400">₹65,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Study in Education Hub</span>
                      <span className="text-green-400">₹0</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Peaceful Environment</span>
                      <span className="text-green-400">Bonus</span>
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
                  Save <span className="text-green-400">₹4,35,000+</span> and stay in HP's best study environment!
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Questions
                </span>
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                Everything Hamirpur's NEET aspirants want to know
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
                        <span className="text-amber-400 group-open:rotate-180 transition-transform duration-300">
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
        <section className="py-20 bg-gradient-to-r from-amber-900/50 to-orange-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Excel Beyond{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Local Coaching
                </span>
                ?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Hamirpur's education hub + Cerebrum's AIIMS faculty = Your NEET success formula!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20from%20Hamirpur%20HP%20and%20want%20to%20join%20NEET%20coaching.%20Please%20share%20the%20admission%20process."
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 text-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  Book Free Demo Class
                </Link>
                <Link
                  href="tel:+918826444334"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 text-lg"
                >
                  <Phone className="w-6 h-6" />
                  Talk to Counsellor
                </Link>
              </div>

              <p className="text-slate-400 mt-6">
                Join 280+ students from Hamirpur district who chose expert guidance over local coaching
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
