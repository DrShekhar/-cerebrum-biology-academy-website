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
  Factory,
} from 'lucide-react'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

export default function NEETCoachingSolan() {
  const nearbyAreas = [
    { name: 'Solan Town', students: '200+', distance: 'Main City' },
    { name: 'Kasauli', students: '65+', distance: '15 km' },
    { name: 'Baddi', students: '150+', distance: '30 km' },
    { name: 'Nalagarh', students: '90+', distance: '25 km' },
    { name: 'Parwanoo', students: '110+', distance: '35 km' },
    { name: 'Arki', students: '45+', distance: '18 km' },
    { name: 'Kandaghat', students: '40+', distance: '20 km' },
    { name: 'Dharampur', students: '55+', distance: '22 km' },
  ]

  const faqs = [
    {
      question: 'Which is the best NEET coaching in Solan for 2026 preparation?',
      answer:
        'Cerebrum Biology Academy is the top-rated NEET coaching for Solan students, offering online classes from AIIMS-trained faculty. With 94.2% success rate and specific focus on HP medical colleges including MMMC Solan (150 seats right in your city!), we provide comprehensive preparation with live classes, doubt sessions, and complete study materials.',
    },
    {
      question: 'Does Solan have its own medical college?',
      answer:
        "Yes! MM Medical College (Maharishi Markandeshwar Medical College) in Solan has 150 MBBS seats - the highest in any single HP medical college! It's a private deemed university with excellent infrastructure. Our coaching specifically helps Solan students target MMMC along with government colleges across HP.",
    },
    {
      question: 'How can students from Baddi and Parwanoo join NEET coaching?',
      answer:
        "Students from Baddi, Parwanoo, and the industrial belt can easily join our online NEET coaching from home. Despite being close to Chandigarh, you don't need to relocate. Our live interactive classes are accessible from anywhere with stable internet. We've helped 350+ students from Solan district clear NEET.",
    },
    {
      question: 'What are the fees for NEET coaching in Solan?',
      answer:
        'Our NEET coaching fees are significantly lower than Chandigarh institutes (which are just 45 km away). Complete 2-year program costs ₹45,000-65,000 vs ₹1.5-2 lakhs for Chandigarh offline coaching. You save on daily commute or hostel expenses. EMI options available for Solan students.',
    },
    {
      question: 'Should Solan students go to Chandigarh for NEET coaching?',
      answer:
        "Many Solan students commute to Chandigarh (45 km) for coaching, wasting 2-3 hours daily on travel. With Cerebrum's online coaching, you get the same quality AIIMS faculty from home. Save time, energy, and money while studying in comfortable familiar surroundings. Our results prove online works better!",
    },
    {
      question: 'Is online NEET coaching effective for students in industrial areas like Baddi?',
      answer:
        "Absolutely! Students from Baddi, Parwanoo, and Nalagarh industrial areas have excelled with our online coaching. Good internet connectivity in these areas makes live classes seamless. Many working parents in pharma industry appreciate that children can study without relocating. 94.2% success rate validates effectiveness.",
    },
    {
      question: 'What study materials do you provide for HP Board students?',
      answer:
        'We provide comprehensive materials including NCERT-aligned notes, HP Board to NEET bridge modules, 10,000+ MCQs, previous 15 years papers with analysis. Special focus on topics where HP Board differs from CBSE. All materials accessible digitally - perfect for tech-savvy Solan students.',
    },
    {
      question: 'How do doubt-clearing sessions work for Solan students?',
      answer:
        "We offer daily doubt sessions from 6-9 PM, WhatsApp support, and one-on-one video calls for complex topics. Being close to Chandigarh, Solan has excellent internet - perfect for our interactive doubt clearing. Average doubt resolution time is under 2 hours. Faculty available till 10 PM.",
    },
    {
      question: 'What is the batch timing for Solan area students?',
      answer:
        "We offer multiple batches: Morning (6-8 AM for early risers), Evening (5-8 PM after school), and Weekend intensive batches. Students from Parwanoo-Baddi industrial area often prefer evening batches. All classes recorded for revision. Special arrangements during HP Board exams.",
    },
    {
      question: 'What medical colleges can Solan students target through NEET?',
      answer:
        'Solan students can target: MMMC Solan (150 seats - in your city!), IGMC Shimla (120 seats), AIIMS Bilaspur (100 seats), SLBSGMC Nerchowk (120 seats), DRGMC Kangra (120 seats), plus GMC Chandigarh (just 45 km away) through All India Quota. Your location is strategically perfect!',
    },
  ]

  const localSchools = [
    'DAV Public School Solan',
    'Army Public School Dagshai',
    'Lawrence School Sanawar',
    'St. Lukes School Solan',
    'Jawahar Navodaya Vidyalaya Solan',
    'Govt. Senior Secondary School Solan',
    'Pinegrove School Dharampur',
    'Delhi Public School Baddi',
    'Ryan International School Solan',
    'St. Edwards School Nalagarh',
  ]

  const medicalColleges = [
    { name: 'MMMC Solan', seats: 150, distance: 'In Solan!', state: 'HP', highlight: true },
    { name: 'IGMC Shimla', seats: 120, distance: '45 km', state: 'HP', highlight: false },
    { name: 'AIIMS Bilaspur', seats: 100, distance: '90 km', state: 'HP', highlight: false },
    { name: 'GMC Chandigarh', seats: 100, distance: '45 km', state: 'CHD', highlight: true },
    { name: 'PGIMER Chandigarh', seats: 75, distance: '50 km', state: 'CHD', highlight: false },
    { name: 'SLBSGMC Nerchowk', seats: 120, distance: '170 km', state: 'HP', highlight: false },
  ]

  return (
    <>
      <CitySchema
        cityName="Solan"
        stateName="Himachal Pradesh"
        url="https://cerebrumacademy.in/neet-coaching-solan"
        description="Best NEET coaching in Solan, Himachal Pradesh. Online classes from AIIMS faculty for Solan, Kasauli, Baddi, Parwanoo students. 94.2% success rate. MMMC Solan with 150 seats is in your city!"
        areaServed={['Solan', 'Kasauli', 'Baddi', 'Nalagarh', 'Parwanoo', 'Arki', 'Kandaghat', 'Dharampur']}
        faqs={faqs}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-lime-950/20 to-slate-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-lime-500 rounded-full filter blur-[128px]" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full filter blur-[128px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-5xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-lime-500/10 border border-lime-500/20 rounded-full px-4 py-2 mb-6">
                <Factory className="w-4 h-4 text-lime-400" />
                <span className="text-lime-300 text-sm font-medium">
                  Mushroom City | MMMC with 150 Seats | Gateway to HP
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Best NEET Coaching in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
                  Solan
                </span>{' '}
                2026
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                The only HP city with
                <span className="text-lime-400 font-semibold"> 150 MBBS seats</span> in one college! Why travel to
                Chandigarh when you can become a doctor in Solan itself?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="https://wa.me/919872100215?text=Hi%2C%20I%27m%20from%20Solan%20and%20interested%20in%20NEET%20coaching.%20Please%20share%20details."
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
                  { number: '350+', label: 'Solan Students', icon: Users },
                  { number: '650+', label: 'Avg. NEET Score', icon: Target },
                  { number: '55+', label: 'HP Selections', icon: Award },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
                  >
                    <stat.icon className="w-6 h-6 text-lime-400 mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Solan is Special Section */}
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
                Solan's{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
                  Strategic Advantage
                </span>{' '}
                for NEET
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-lime-500/10 border border-lime-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-lime-400 mb-4">✓ Why Solan is Perfect</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                      MMMC Solan: 150 MBBS seats in your own city!
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                      45 km from Chandigarh - best of both worlds
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                      Excellent internet in Baddi-Parwanoo belt
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                      Educated families in pharma industry
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                      Top schools like Lawrence Sanawar nearby
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">❌ Stop Wasting Time on Travel</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Daily Chandigarh commute = 3 hours wasted
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Travel fatigue affects concentration
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Monthly travel cost: ₹3,000-5,000
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Weather disruptions on NH-22
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      Energy spent traveling, not studying
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
                  Solan District
                </span>
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                From Kasauli hills to Baddi industrial belt - quality NEET coaching for all
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {nearbyAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-lime-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-lime-400" />
                      <span className="text-white font-medium">{area.name}</span>
                    </div>
                    <div className="text-sm text-slate-400">{area.students} students enrolled</div>
                    <div className="text-xs text-lime-400 mt-1">{area.distance}</div>
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
                Why Solan Students{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
                  Choose Cerebrum
                </span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[
                  {
                    icon: Video,
                    title: 'Live AIIMS Faculty',
                    description:
                      'Metro-city quality teaching without leaving Solan. Real doctors teach you NEET strategies.',
                  },
                  {
                    icon: BookOpen,
                    title: 'HP + CBSE Coverage',
                    description:
                      'Complete syllabus coverage for both HP Board and CBSE students studying in Solan.',
                  },
                  {
                    icon: FileText,
                    title: 'Digital Study Material',
                    description:
                      'Perfect for tech-savvy Solan students. Access everything on phone, tablet, or laptop.',
                  },
                  {
                    icon: MessageCircle,
                    title: 'Evening Doubt Sessions',
                    description:
                      'Daily 6-9 PM doubt clearing. Perfect timing for students returning from school.',
                  },
                  {
                    icon: Target,
                    title: 'MMMC-Focused Prep',
                    description:
                      'Special guidance for MMMC Solan admission. Know the cutoffs, process, and strategy.',
                  },
                  {
                    icon: GraduationCap,
                    title: 'HP + AI Quota Support',
                    description:
                      'Counselling guidance for both HP state quota and All India Quota admissions.',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-lime-500/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-lime-500/20 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-lime-400" />
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
                  Solan District
                </span>
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                Students from prestigious schools like Lawrence Sanawar trust us for NEET preparation
              </p>

              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {localSchools.map((school, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-slate-300 text-sm hover:border-lime-500/50 hover:text-lime-300 transition-all duration-300"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
                  Medical Colleges
                </span>{' '}
                for Solan Students
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                MMMC Solan (150 seats) is in your city! Plus Chandigarh colleges are just 45 km away
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
                        className={`border-b border-white/5 ${college.highlight ? 'bg-lime-500/10' : ''}`}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Building2
                              className={`w-4 h-4 ${college.highlight ? 'text-lime-400' : 'text-slate-500'}`}
                            />
                            <span className={college.highlight ? 'text-lime-300 font-semibold' : 'text-white'}>
                              {college.name}
                            </span>
                            {college.highlight && college.name.includes('MMMC') && (
                              <span className="text-xs bg-lime-500/20 text-lime-300 px-2 py-0.5 rounded-full">
                                In Your City!
                              </span>
                            )}
                            {college.highlight && college.name.includes('GMC Chandigarh') && (
                              <span className="text-xs bg-lime-500/20 text-lime-300 px-2 py-0.5 rounded-full">
                                Very Close!
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
                  Solan vs Chandigarh Commute
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                    <IndianRupee className="w-5 h-5" />
                    Daily Chandigarh Commute
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex justify-between">
                      <span>Chandigarh Coaching (2 yrs)</span>
                      <span className="text-red-400">₹1,80,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Daily Bus/Taxi (2 yrs)</span>
                      <span className="text-red-400">₹72,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Time Wasted: 1500 hrs</span>
                      <span className="text-red-400">Priceless</span>
                    </li>
                    <li className="flex justify-between border-t border-red-500/20 pt-3 font-semibold">
                      <span>Total</span>
                      <span className="text-red-400">₹2,52,000+</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                    <IndianRupee className="w-5 h-5" />
                    Cerebrum Online from Solan
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex justify-between">
                      <span>Complete Program (2 yrs)</span>
                      <span className="text-green-400">₹65,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Travel Cost</span>
                      <span className="text-green-400">₹0</span>
                    </li>
                    <li className="flex justify-between">
                      <span>1500 hrs Extra Study</span>
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
                  Save <span className="text-green-400">₹1,87,000</span> and gain{' '}
                  <span className="text-green-400">1500 hours</span> extra study time!
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
                  Questions
                </span>
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                Everything Solan students and parents want to know about NEET preparation
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
                        <span className="text-lime-400 group-open:rotate-180 transition-transform duration-300">
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
        <section className="py-20 bg-gradient-to-r from-lime-900/50 to-green-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Become a Doctor in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
                  Your Own City
                </span>
                ?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                MMMC Solan has 150 MBBS seats waiting. Join Cerebrum and turn your medical dream into reality!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://wa.me/919872100215?text=Hi%2C%20I%27m%20from%20Solan%20and%20want%20to%20join%20NEET%20coaching.%20Please%20share%20the%20admission%20process."
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
                Join 350+ students from Solan district who chose smart preparation over daily commute
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
