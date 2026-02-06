"use client"

import { motion } from "framer-motion"
import {
  MessageCircle,
  Phone,
  HelpCircle,
  Video,
  Users,
  BookOpen,
  Award,
  Clock,
  MessageSquare,
  CheckCircle,
} from "lucide-react"
import { CONTACT_INFO, getWhatsAppLink, getPhoneLink } from "@/lib/constants/contactInfo"
import { TrustSignalsBanner } from '@/components/trust/TrustSignalsBanner'

const features = [
  {
    icon: Video,
    title: "Live Interactive Classes",
    description: "Real-time teaching on Zoom/Google Meet with instant doubt clearing",
  },
  {
    icon: Award,
    title: "AIIMS-Qualified Faculty",
    description: "Experts with 10-15 years NEET teaching experience from premier institutions",
  },
  {
    icon: Users,
    title: "Small Batches (15-20 students)",
    description: "Personalized attention for every student, not crowded online classes",
  },
  {
    icon: BookOpen,
    title: "Personal Mentor",
    description: "One-on-one guidance for weaknesses, strengths, and exam strategy",
  },
  {
    icon: Clock,
    title: "Recorded Lectures",
    description: "All classes recorded and available on-demand for revision",
  },
  {
    icon: MessageSquare,
    title: "Daily Doubt Sessions",
    description: "WhatsApp doubt clearing 24/7 plus scheduled group doubt sessions",
  },
]

const programSteps = [
  {
    step: 1,
    title: "Live Classes on Zoom/Google Meet",
    description: "Attend live interactive sessions from the comfort of your home. Classes scheduled 6-8 PM, with flexible options.",
  },
  {
    step: 2,
    title: "Recorded Lectures",
    description: "Missed a class? Access all recordings with notes on our learning portal for unlimited revisions.",
  },
  {
    step: 3,
    title: "Weekly Tests",
    description: "Chapter tests every week to track your progress. Results shared within 24 hours with detailed analysis.",
  },
  {
    step: 4,
    title: "Monthly Parent-Teacher Meetings",
    description: "Personal 1-on-1 meetings to discuss progress, challenges, and customized improvement strategies.",
  },
  {
    step: 5,
    title: "WhatsApp Doubt Clearing",
    description: "Instant answers to doubts via WhatsApp. Photos, equations, detailed explanations — all covered.",
  },
]

const testimonials = [
  {
    name: "Arjun Sharma",
    location: "Mumbai, Maharashtra",
    score: "NEET 2025 | 650/720",
    review:
      "Cerebrum's online classes changed my preparation. The live interaction made all the difference. Now studying at AIIMS, Delhi.",
  },
  {
    name: "Priya Yadav",
    location: "Bangalore, Karnataka",
    score: "NEET 2025 | 680/720",
    review:
      "Best investment for my NEET prep. Faculty is extremely supportive, and the recorded lectures helped me revise perfectly for exams.",
  },
  {
    name: "Rahul Gupta",
    location: "Hyderabad, Telangana",
    score: "NEET 2024 | 710/720",
    review:
      "The small batch size and personal mentoring is unbeatable. I went from 580 marks to 710 in just 6 months. Highly recommend!",
  },
]

const faqs = [
  {
    question: "How are online classes different from recorded course videos?",
    answer:
      "Our online classes are LIVE and interactive with real-time doubt clearing. You can ask questions, interact with faculty, and get immediate feedback — exactly like offline classes. All classes are also recorded for later revision.",
  },
  {
    question: "What if I miss a class?",
    answer:
      "No problem! All classes are recorded and available on our learning portal. You can watch them anytime, take notes, and submit doubts. Plus, we have weekly revision sessions to ensure you do not fall behind.",
  },
  {
    question: "Are the teachers as qualified as offline coaching centers?",
    answer:
      "Yes. Our faculty includes AIIMS doctors, ex-Allen/Aakash teachers, and experts with 10-15 years NEET experience. We maintain the same quality whether online or offline.",
  },
  {
    question: "How do I submit doubts online?",
    answer:
      "Multiple ways: (1) Ask in live classes, (2) Join our WhatsApp doubt group for instant answers, (3) Submit via email with images/equations, (4) Attend scheduled doubt sessions. Average response time: 2-4 hours.",
  },
  {
    question: "What's the difference between online and offline coaching at Cerebrum?",
    answer:
      "Both offer the same faculty, curriculum, and quality. Online is flexible (study from anywhere), while offline provides classroom environment. Most students do hybrid: online for lectures + offline for tests/mentoring sessions.",
  },
  {
    question: "How much does online coaching cost compared to offline?",
    answer:
      "Online starts at Rs 2,500/month (Pursuit tier) vs offline at Rs 2,500-4,500/month. The pricing is the same because quality is identical. Choose based on convenience, not cost.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function OnlineNEETBiologyCoachingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-6 px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold backdrop-blur">
              Study from Anywhere in India
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Online NEET Biology Coaching
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Learn from AIIMS Faculty, Anywhere in India — Starting Rs 2,500/month
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppLink("I want to join online NEET biology coaching. Tell me more about the program.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors shadow-lg"
              >
                <MessageCircle size={22} />
                Start on WhatsApp
              </a>
              <a
                href={getPhoneLink()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                <Phone size={22} />
                Call Now
              </a>
            </div>

            <p className="mt-8 text-blue-100 text-sm">
              First 10 students get 20% discount. Limited-time offer!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals — Social Proof */}
      <TrustSignalsBanner variant="compact" />

      {/* Why Online with Cerebrum */}
      <section className="py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
              Why Online with Cerebrum?
            </h2>
            <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto">
              All benefits of premium coaching, without leaving home
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 hover:shadow-lg transition-shadow"
                >
                  <div className="p-3 bg-white rounded-lg w-fit mb-4">
                    <IconComponent size={28} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
              How Our Online Program Works
            </h2>
            <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto">
              A structured approach to help you crack NEET from anywhere
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {programSteps.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-8 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fee Comparison */}
      <section className="py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
              Online Pricing — Transparent & Affordable
            </h2>
            <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto">
              Same quality as premium centers, at a fraction of the cost
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-500">
                  <div className="text-sm font-semibold text-emerald-600 mb-1">CEREBRUM ONLINE</div>
                  <div className="text-4xl font-bold text-emerald-700">Starting Rs 2,500/month</div>
                  <div className="text-sm text-emerald-600 mt-2">From Rs 24,000/year</div>
                  <div className="mt-4 pt-4 border-t border-emerald-200">
                    <p className="text-sm text-slate-700">Includes:</p>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle size={16} className="text-emerald-600" />
                        Live interactive classes
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle size={16} className="text-emerald-600" />
                        AIIMS-qualified faculty
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle size={16} className="text-emerald-600" />
                        Small batches (15-20 students)
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle size={16} className="text-emerald-600" />
                        Recorded lectures
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle size={16} className="text-emerald-600" />
                        Weekly tests & personal mentor
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-sm text-slate-600 mb-1">ALLEN (Offline)</div>
                <div className="text-2xl font-bold text-slate-900">Rs 1-3.5 lakh/year</div>
                <div className="text-xs text-slate-500 mt-1">Plus registration & facility fees</div>
              </div>

              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-sm text-slate-600 mb-1">AAKASH (Offline)</div>
                <div className="text-2xl font-bold text-slate-900">Rs 1.2-2.8 lakh/year</div>
                <div className="text-xs text-slate-500 mt-1">Plus enrollment fees</div>
              </div>

              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-sm text-slate-600 mb-1">PHYSICS WALLAH (Online)</div>
                <div className="text-2xl font-bold text-slate-900">Rs 3,000-15,000/year</div>
                <div className="text-xs text-slate-500 mt-1">Recorded videos only, no live classes</div>
              </div>

              <div className="p-4 mt-6 rounded-lg bg-blue-50 border-l-4 border-blue-600">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Save 60-90%</span> on coaching fees while getting AIIMS-level teaching with live interactive classes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
              Success Stories from Online Students
            </h2>
            <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto">
              Real results from real students studying online from across India
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-xl bg-white border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{testimonial.name}</h3>
                    <p className="text-sm text-slate-600">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                      {testimonial.score}
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed italic">"{testimonial.review}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 text-center">
              Everything you need to know about online coaching
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                variants={itemVariants}
                className="group p-6 rounded-lg border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              >
                <summary className="flex items-start justify-between font-semibold text-slate-900 cursor-pointer">
                  <span className="flex items-start gap-3">
                    <HelpCircle size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                    {faq.question}
                  </span>
                </summary>
                <p className="mt-4 ml-8 text-slate-600 leading-relaxed">{faq.answer}</p>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join 1000+ online students who are acing NEET with live classes from AIIMS faculty. Your first demo class is free!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppLink("I want to join online NEET biology coaching. Get me started with a free demo class.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors shadow-lg"
              >
                <MessageCircle size={22} />
                WhatsApp Now
              </a>
              <a
                href={getPhoneLink()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                <Phone size={22} />
                Call {CONTACT_INFO.phone.display.primary}
              </a>
            </div>

            <p className="mt-8 text-blue-100 text-sm">
              Limited spots available. Enroll today and get 20% discount on first 3 months.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://cerebrumbiologyacademy.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Online NEET Biology Coaching",
                item: "https://cerebrumbiologyacademy.com/online-neet-biology-coaching",
              },
            ],
          }),
        }}
      />
    </div>
  )
}
