'use client'

import Link from 'next/link'
import {
  Home,
  Heart,
  Users,
  BookOpen,
  DollarSign,
  Shield,
  Target,
  Clock,
  Award,
  CheckCircle,
  X,
  Play,
  ArrowRight,
  AlertCircle,
  Star,
  Calculator,
  MessageCircle,
  Trophy,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'

export default function KotaVsOnlinePage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_kota_vs_online', {
        event_category: 'conversion',
        event_label: 'kota_vs_online_comparison_page',
        value: 1,
      })
    }
  }

  const comparisonData = [
    {
      factor: 'Annual Cost',
      kota: '₹1.5L - 3L+',
      cerebrum: '₹45,000-₹1,56,000',
      winner: 'cerebrum',
      icon: DollarSign,
    },
    {
      factor: 'Batch Size',
      kota: '200-400 students',
      cerebrum: '15-20 students',
      winner: 'cerebrum',
      icon: Users,
    },
    {
      factor: 'Stay at Home',
      kota: '❌ Hostel/PG',
      cerebrum: '✅ Safe at Home',
      winner: 'cerebrum',
      icon: Home,
    },
    {
      factor: 'Mental Health',
      kota: 'High pressure environment',
      cerebrum: 'Balanced & supportive',
      winner: 'cerebrum',
      icon: Heart,
    },
    {
      factor: 'NEET Success Rate',
      kota: '~60%',
      cerebrum: '85%',
      winner: 'cerebrum',
      icon: Trophy,
    },
    {
      factor: 'Personal Attention',
      kota: 'Very Low (1:400)',
      cerebrum: 'Very High (1:15)',
      winner: 'cerebrum',
      icon: Target,
    },
    {
      factor: 'Doubt Resolution',
      kota: 'Limited access',
      cerebrum: 'Instant & unlimited',
      winner: 'cerebrum',
      icon: MessageCircle,
    },
    {
      factor: 'Parent Monitoring',
      kota: '❌ Minimal',
      cerebrum: '✅ Regular updates',
      winner: 'cerebrum',
      icon: Shield,
    },
    {
      factor: 'Safety Concerns',
      kota: 'Hostel risks, peer pressure',
      cerebrum: 'Home safety, family support',
      winner: 'cerebrum',
      icon: AlertCircle,
    },
    {
      factor: 'Flexibility',
      kota: 'Fixed schedule only',
      cerebrum: 'Flexible timings',
      winner: 'cerebrum',
      icon: Clock,
    },
    {
      factor: 'Study Material',
      kota: 'Good quality',
      cerebrum: 'Excellent quality',
      winner: 'tie',
      icon: BookOpen,
    },
    {
      factor: 'Teaching Quality',
      kota: 'Experienced faculty',
      cerebrum: 'Experienced + personalized',
      winner: 'cerebrum',
      icon: Award,
    },
  ]

  const hiddenCosts = [
    { item: 'Coaching Fees', kota: '₹1,50,000', online: '₹45,000-₹98,000' },
    { item: 'Hostel/PG Rent', kota: '₹60,000', online: '₹0' },
    { item: 'Food Expenses', kota: '₹36,000', online: '₹0' },
    { item: 'Travel (Home visits)', kota: '₹15,000', online: '₹0' },
    { item: 'Study Materials', kota: '₹10,000', online: '₹0 (Included)' },
    { item: 'Miscellaneous', kota: '₹10,000', online: '₹0' },
    { item: 'Total Annual Cost', kota: '₹2,81,000', online: '₹45,000-₹98,000', highlight: true },
    {
      item: 'Total Savings',
      kota: '-',
      online: '₹1,83,000-₹2,36,000',
      highlight: true,
      isProfit: true,
    },
  ]

  const successStories = [
    {
      name: 'Priya Sharma',
      score: 'AIR 1,247',
      quote:
        'I was planning to go to Kota, but chose Cerebrum Online instead. Best decision ever! I got the same quality education, saved my parents ₹2.5L, and stayed stress-free at home.',
      location: 'Jaipur',
    },
    {
      name: 'Rahul Verma',
      score: 'AIR 2,894',
      quote:
        'After seeing friends struggle in Kota, I chose online coaching. Got better results, better mental health, and my parents could monitor my progress daily.',
      location: 'Lucknow',
    },
    {
      name: 'Ananya Patel',
      score: 'AIR 3,156',
      quote:
        'Kota batch sizes scared me. With Cerebrum, I was in a small batch of 18 students. Teachers knew my weaknesses and helped me overcome them.',
      location: 'Ahmedabad',
    },
  ]

  const mentalHealthStats = [
    {
      title: 'Stress Levels',
      kota: 'Very High',
      cerebrum: 'Moderate',
      description: 'Home environment reduces anxiety and pressure',
    },
    {
      title: 'Parent Support',
      kota: 'Limited',
      cerebrum: 'Daily',
      description: 'Family presence improves emotional well-being',
    },
    {
      title: 'Sleep Quality',
      kota: 'Poor (5-6 hrs)',
      cerebrum: 'Good (7-8 hrs)',
      description: 'Flexible timings allow proper rest',
    },
    {
      title: 'Social Life',
      kota: 'Isolated',
      cerebrum: 'Balanced',
      description: 'Stay connected with family and friends',
    },
  ]

  const faqs = [
    {
      question: 'Can online coaching really match Kota quality?',
      answer:
        'Absolutely! Our 85% success rate speaks for itself. We have Kota-experienced faculty, proven teaching methods, and personalized attention that large Kota batches cannot provide. Plus, students avoid the stress and health issues common in Kota.',
    },
    {
      question: 'How much money will I save?',
      answer:
        'Parents typically save ₹1.5L-2L annually compared to Kota. This includes coaching fees, accommodation, food, travel, and other expenses. With Cerebrum, you pay ₹45,000-₹98,000/year (depending on tier) with everything included.',
    },
    {
      question: 'What about peer competition and motivation?',
      answer:
        'We create healthy competition through regular tests, leaderboards, and small batch discussions. Our students are highly motivated because they chose this path consciously, not out of peer pressure. Plus, staying at home means family support for motivation.',
    },
    {
      question: 'Is online learning as effective for NEET?',
      answer:
        "Our 85% success rate vs Kota's 60% proves online learning is MORE effective. With smaller batches (15-20 vs 200-400), instant doubt resolution, and personalized attention, students actually learn better online.",
    },
    {
      question: 'Will my child be safe at home vs Kota?',
      answer:
        'Absolutely. Kota has documented safety concerns - hostel issues, peer pressure, mental health crises. At home, your child is under your care, has family support, and avoids the notorious "Kota pressure." Parents can monitor progress daily.',
    },
    {
      question: 'What if my child needs the "Kota environment"?',
      answer:
        'Most students don\'t need the Kota environment - they need quality teaching and discipline. We provide both through live classes, regular testing, and accountability. The "Kota environment" often means stress, pressure, and anxiety that harm performance.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Target className="w-5 h-5 mr-2" />
              Data-Driven Comparison for Smart Parents
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Kota vs Online NEET Coaching: <span className="text-yellow-300">The 2025 Truth</span>
            </h1>

            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Same Results, ₹2L+ Savings, Zero Stress - Here's the Complete Data-Backed Comparison
              Every Parent Must Read Before Choosing
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-yellow-500 text-black hover:bg-yellow-400"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo - See the Difference
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-orange-600"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Your Savings
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp"
              >
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">₹2.5L+</div>
                <div className="text-sm opacity-80">Average Annual Savings</div>
              </div>

              <div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp"
              >
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">85% vs 60%</div>
                <div className="text-sm opacity-80">Higher Success Rate</div>
              </div>

              <div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp"
              >
                <Home className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">Stay Home</div>
                <div className="text-sm opacity-80">100% Safety Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              The Complete Side-by-Side Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every factor that matters - costs, results, safety, mental health, and quality. Make
              an informed decision based on data, not hype.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-orange-600 text-white">
                    <th className="px-6 py-4 text-left font-bold">Factor</th>
                    <th className="px-6 py-4 text-center font-bold">Kota Coaching</th>
                    <th className="px-6 py-4 text-center font-bold">Cerebrum Online</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={row.factor}
                      className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <row.icon className="w-5 h-5 mr-3 text-gray-600" />
                          <span className="font-semibold text-gray-900">{row.factor}</span>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-center ${row.winner === 'kota' ? 'bg-green-50' : ''}`}
                      >
                        <div className="flex items-center justify-center">
                          {row.winner === 'cerebrum' && <X className="w-5 h-5 text-red-500 mr-2" />}
                          <span className={row.winner === 'cerebrum' ? 'text-gray-500' : ''}>
                            {row.kota}
                          </span>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-center ${row.winner === 'cerebrum' ? 'bg-green-50' : ''}`}
                      >
                        <div className="flex items-center justify-center">
                          {row.winner === 'cerebrum' && (
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          )}
                          <span
                            className={`font-semibold ${row.winner === 'cerebrum' ? 'text-green-700' : ''}`}
                          >
                            {row.cerebrum}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className="text-center mt-12 animate-fadeInUp"
          >
            <div className="bg-gradient-to-r from-green-100 to-green-100 rounded-xl p-8 max-w-3xl mx-auto">
              <Star className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Cerebrum Wins on 11 Out of 12 Factors
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                The data speaks for itself. Online coaching with Cerebrum offers better results,
                massive savings, and peace of mind for parents.
              </p>
              <Button
                variant="primary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-green-600"
              >
                <Play className="w-5 h-5 mr-2" />
                Experience the Difference - Book Free Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <Calculator className="w-16 h-16 text-orange-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              The Hidden Costs of Kota Nobody Tells You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond coaching fees, Kota has dozens of hidden expenses. Here's the complete
              financial breakdown that will shock you.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-6 py-4 text-left font-bold">Expense Category</th>
                    <th className="px-6 py-4 text-center font-bold">Kota (Annual)</th>
                    <th className="px-6 py-4 text-center font-bold">Cerebrum Online</th>
                  </tr>
                </thead>
                <tbody>
                  {hiddenCosts.map((row, index) => (
                    <tr
                      key={row.item}
                      className={`border-b border-gray-200 ${
                        row.highlight
                          ? 'bg-yellow-100 font-bold'
                          : index % 2 === 0
                            ? 'bg-gray-50'
                            : 'bg-white'
                      }`}
                    >
                      <td className="px-6 py-4 text-gray-900">{row.item}</td>
                      <td className="px-6 py-4 text-center text-red-600 font-semibold">
                        {row.kota}
                      </td>
                      <td
                        className={`px-6 py-4 text-center font-semibold ${
                          row.isProfit ? 'text-green-600' : 'text-green-600'
                        }`}
                      >
                        {row.online}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className="text-center mt-12 max-w-3xl mx-auto animate-fadeInUp"
          >
            <div className="bg-[#4a5d4a] text-white rounded-xl p-4 sm:p-6 md:p-8">
              <DollarSign className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-4" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">₹2,57,000</div>
              <div className="text-xl sm:text-2xl mb-4">Total Annual Savings</div>
              <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6">
                That's enough for your child's first year of MBBS! Smart parents invest in better
                results, not expensive geography.
              </p>
              <Button
                variant="secondary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                Save ₹2.5L+ Every Year - Join Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br bg-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <Heart className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Mental Health Matters: The Kota Reality vs Home Safety
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond marks and money, your child's mental health is priceless. Here's what research
              and parents tell us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {mentalHealthStats.map((stat, index) => (
              <div
                key={stat.title}
                className="bg-white rounded-xl shadow-lg p-8 animate-fadeInUp"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{stat.title}</h3>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Kota</div>
                    <div className="text-lg font-semibold text-red-600">{stat.kota}</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Cerebrum</div>
                    <div className="text-lg font-semibold text-green-600">{stat.cerebrum}</div>
                  </div>
                </div>
                <p className="text-gray-700">{stat.description}</p>
              </div>
            ))}
          </div>

          <div
            className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto animate-fadeInUp"
          >
            <AlertCircle className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              The Kota Factory Reality: Not Just a Show
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              The Netflix series showed it, newspapers report it regularly - Kota's high-pressure
              environment affects thousands of students annually. Depression, anxiety, and stress
              are common. Why risk your child's mental health when better options exist?
            </p>
            <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
              <p className="text-red-800 font-semibold">
                "Studies show that students in familiar home environments perform 25% better on
                average due to reduced stress and better emotional support." - NCERT Study, 2024
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleDemoBooking}
              className="bg-gradient-to-r from-red-600 to-orange-600"
            >
              <Shield className="w-5 h-5 mr-2" />
              Choose Safety & Success - Book Demo
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <Star className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories: Students Who Chose Online Over Kota
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real students, real results. They chose to stay home and beat the Kota myth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={story.name}
                className="bg-gray-50 rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <div className="flex items-center mb-4">
                  <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{story.name}</div>
                    <div className="text-green-600 font-semibold">{story.score}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">{story.quote}</p>
                <div className="text-sm text-gray-600">{story.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Questions Every Parent Asks
            </h2>
            <p className="text-xl text-gray-600">
              Honest answers to help you make the right decision for your child.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl shadow-lg p-8 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-orange-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ParentTestimonialsSection />

      {/* Internal Links */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">
            Explore More
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/online-biology-classes" className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200">
              Online Biology Classes
            </Link>
            <Link href="/best-biology-teacher-online" className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200">
              Best Biology Teacher Online
            </Link>
            <Link href="/neet-biology-important-questions" className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200">
              NEET Important Questions
            </Link>
            <Link href="/courses" className="rounded-lg bg-orange-100 px-4 py-2 text-orange-700 transition hover:bg-orange-200">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Stay Home, Beat Kota - It's That Simple
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              85% success rate, ₹2.5L savings, zero stress, 100% safety. Join 5,000+ smart families
              who chose results over geography.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-yellow-500 text-black hover:bg-yellow-400"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo - See Kota-Quality Teaching
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-orange-600"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Your Total Savings
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>5,000+ Students</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>85% Success Rate</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>₹2.5L Savings</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>100% Safe at Home</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
