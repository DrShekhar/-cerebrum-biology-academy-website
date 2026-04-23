import Link from 'next/link'
import {
  HelpCircle,
  Video,
  Users,
  BookOpen,
  Award,
  Clock,
  MessageSquare,
  CheckCircle,
  ShieldCheck,
} from 'lucide-react'
import { CONTACT_INFO, getWhatsAppLink, getPhoneLink } from '@/lib/constants/contactInfo'
import { TrustSignalsBanner } from '@/components/trust/TrustSignalsBanner'
import { TrackedCTA } from '@/components/landing/TrackedCTA'
import { getActiveOffer } from '@/data/neet/online-offer'

const CAMPAIGN = 'online-neet-biology-coaching'

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching on Zoom/Google Meet with instant doubt clearing',
  },
  {
    icon: Award,
    title: 'AIIMS-Qualified Faculty',
    description: 'Experts with 10-15 years NEET teaching experience from premier institutions',
  },
  {
    icon: Users,
    title: 'Small Batches (15-20 students)',
    description: 'Personalized attention for every student, not crowded online classes',
  },
  {
    icon: BookOpen,
    title: 'Personal Mentor',
    description: 'One-on-one guidance for weaknesses, strengths, and exam strategy',
  },
  {
    icon: Clock,
    title: 'Recorded Lectures',
    description: 'All classes recorded and available on-demand for revision',
  },
  {
    icon: MessageSquare,
    title: 'Daily Doubt Sessions',
    description: 'WhatsApp doubt clearing 24/7 plus scheduled group doubt sessions',
  },
]

const programSteps = [
  {
    step: 1,
    title: 'Live Classes on Zoom/Google Meet',
    description:
      'Attend live interactive sessions from the comfort of your home. Classes scheduled 6-8 PM, with flexible options.',
  },
  {
    step: 2,
    title: 'Recorded Lectures',
    description:
      'Missed a class? Access all recordings with notes on our learning portal for unlimited revisions.',
  },
  {
    step: 3,
    title: 'Weekly Tests',
    description:
      'Chapter tests every week to track your progress. Results shared within 24 hours with detailed analysis.',
  },
  {
    step: 4,
    title: 'Monthly Parent-Teacher Meetings',
    description:
      'Personal 1-on-1 meetings to discuss progress, challenges, and customized improvement strategies.',
  },
  {
    step: 5,
    title: 'WhatsApp Doubt Clearing',
    description:
      'Instant answers to doubts via WhatsApp. Photos, equations, detailed explanations — all covered.',
  },
]

const testimonials = [
  {
    name: 'Arjun Sharma',
    location: 'Mumbai, Maharashtra',
    score: 'NEET 2025 | 650/720',
    review:
      "Cerebrum's online classes changed my preparation. The live interaction made all the difference. Now studying at AIIMS, Delhi.",
  },
  {
    name: 'Priya Yadav',
    location: 'Bangalore, Karnataka',
    score: 'NEET 2025 | 680/720',
    review:
      'Best investment for my NEET prep. Faculty is extremely supportive, and the recorded lectures helped me revise perfectly for exams.',
  },
  {
    name: 'Rahul Gupta',
    location: 'Hyderabad, Telangana',
    score: 'NEET 2024 | 710/720',
    review:
      'The small batch size and personal mentoring is unbeatable. I went from 580 marks to 710 in just 6 months. Highly recommend!',
  },
]

const faqs = [
  {
    question: 'How are online classes different from recorded course videos?',
    answer:
      'Our online classes are LIVE and interactive with real-time doubt clearing. You can ask questions, interact with faculty, and get immediate feedback — exactly like offline classes. All classes are also recorded for later revision.',
  },
  {
    question: 'What if I miss a class?',
    answer:
      'No problem! All classes are recorded and available on our learning portal. You can watch them anytime, take notes, and submit doubts. Plus, we have weekly revision sessions to ensure you do not fall behind.',
  },
  {
    question: 'Are the teachers as qualified as offline coaching centers?',
    answer:
      'Yes. Our faculty includes AIIMS doctors, ex-Allen/Aakash teachers, and experts with 10-15 years NEET experience. We maintain the same quality whether online or offline.',
  },
  {
    question: 'How do I submit doubts online?',
    answer:
      'Multiple ways: (1) Ask in live classes, (2) Join our WhatsApp doubt group for instant answers, (3) Submit via email with images/equations, (4) Attend scheduled doubt sessions. Average response time: 2-4 hours.',
  },
  {
    question: "What's the difference between online and offline coaching at Cerebrum?",
    answer:
      'Both offer the same faculty, curriculum, and quality. Online is flexible (study from anywhere), while offline provides classroom environment. Most students do hybrid: online for lectures + offline for tests/mentoring sessions.',
  },
  {
    question: 'How much does online coaching cost compared to offline?',
    answer:
      'Online starts at Rs 2,500/month (Pursuit tier) vs offline at Rs 2,500-4,500/month. The pricing is the same because quality is identical. Choose based on convenience, not cost.',
  },
]

export default function OnlineNEETBiologyCoachingPage() {
  const offer = getActiveOffer()

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
          <div className="text-center">
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
              <TrackedCTA
                href={getWhatsAppLink(
                  'I want to join online NEET biology coaching. Tell me more about the program.'
                )}
                method="whatsapp"
                source="hero"
                campaign={CAMPAIGN}
                variant="primary"
              >
                Start on WhatsApp
              </TrackedCTA>
              <TrackedCTA
                href={getPhoneLink()}
                method="phone"
                source="hero"
                campaign={CAMPAIGN}
                variant="secondary"
              >
                Call Now
              </TrackedCTA>
            </div>

            {offer && (
              <p className="mt-8 text-blue-100 text-sm">
                <strong>{offer.headline}</strong> · {offer.subtext}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Trust Signals — Social Proof */}
      <TrustSignalsBanner variant="compact" />

      {/* Why Online with Cerebrum */}
      <section className="py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
              Why Online with Cerebrum?
            </h2>
            <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto">
              All benefits of premium coaching, without leaving home
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={feature.title}
                  className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 hover:shadow-lg transition-shadow"
                >
                  <div className="p-3 bg-white rounded-lg w-fit mb-4">
                    <IconComponent size={28} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
              How Our Online Program Works
            </h2>
            <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto">
              A structured approach to help you crack NEET from anywhere
            </p>
          </div>

          <div className="space-y-6">
            {programSteps.map((item) => (
              <div key={item.step} className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Transparency — honest comparison, no "save X%" claim */}
      <section className="py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
              Online Pricing — Transparent &amp; Affordable
            </h2>
            <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto">
              Live teaching at a price point that sits between recorded-only platforms and premium
              offline centres.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-500">
                  <div className="text-sm font-semibold text-emerald-600 mb-1">CEREBRUM ONLINE</div>
                  <div className="text-4xl font-bold text-emerald-700">Starting Rs 2,500/month</div>
                  <div className="text-sm text-emerald-600 mt-2">From Rs 24,000/year</div>
                  <div className="mt-4 pt-4 border-t border-emerald-200">
                    <p className="text-sm text-slate-700">What&apos;s included:</p>
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
                        Weekly tests &amp; personal mentor
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                For reference — competitor published rates (2024-25)
              </p>
              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-sm text-slate-600 mb-1">Allen (Offline, full programme)</div>
                <div className="text-2xl font-bold text-slate-900">Rs 1.0–3.5 lakh/year</div>
                <div className="text-xs text-slate-500 mt-1">
                  Includes classroom, test series, materials, and centre infrastructure
                </div>
              </div>

              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-sm text-slate-600 mb-1">Aakash (Offline, full programme)</div>
                <div className="text-2xl font-bold text-slate-900">Rs 1.2–2.8 lakh/year</div>
                <div className="text-xs text-slate-500 mt-1">
                  Includes classroom, test series, study material
                </div>
              </div>

              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-sm text-slate-600 mb-1">Physics Wallah (Online, recorded)</div>
                <div className="text-2xl font-bold text-slate-900">Rs 3,000–15,000/year</div>
                <div className="text-xs text-slate-500 mt-1">
                  Recorded videos; live interaction limited to doubt sessions
                </div>
              </div>

              <div className="p-4 mt-6 rounded-lg bg-blue-50 border-l-4 border-blue-600">
                <p className="text-sm text-slate-700">
                  Cerebrum online sits between the two extremes — you get genuine live teaching and
                  small-batch mentoring at a price closer to recorded platforms than premium
                  offline. Fees above are as published on each provider&apos;s website; inclusions
                  differ, so compare carefully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
              Success Stories from Online Students
            </h2>
            <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto">
              Real results from real students studying online from across India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
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
                <p className="text-slate-700 leading-relaxed italic">
                  &ldquo;{testimonial.review}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 text-center">
              Everything you need to know about online coaching
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group p-6 rounded-lg border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              >
                <summary className="flex items-start justify-between font-semibold text-slate-900 cursor-pointer">
                  <span className="flex items-start gap-3">
                    <HelpCircle size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                    {faq.question}
                  </span>
                </summary>
                <p className="mt-4 ml-8 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join our online students who are acing NEET with live classes from AIIMS faculty. Your
              first demo class is free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TrackedCTA
                href={getWhatsAppLink(
                  'I want to join online NEET biology coaching. Get me started with a free demo class.'
                )}
                method="whatsapp"
                source="final-cta"
                campaign={CAMPAIGN}
                variant="primary"
              >
                WhatsApp Now
              </TrackedCTA>
              <TrackedCTA
                href={getPhoneLink()}
                method="phone"
                source="final-cta"
                campaign={CAMPAIGN}
                variant="secondary"
              >
                Call {CONTACT_INFO.phone.display.primary}
              </TrackedCTA>
            </div>

            {offer && (
              <p className="mt-8 text-blue-100 text-sm">
                {offer.subtext} (Offer code: <span className="font-mono">{offer.promoCode}</span>)
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Legal footer — visible on ad landing pages for Google Ads QS compliance */}
      <section className="bg-slate-50 py-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-2">
            <ShieldCheck size={16} className="text-slate-500" />
            Your information is handled per our Privacy Policy.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
            <Link href="/privacy-policy" className="hover:text-blue-600 underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-blue-600 underline">
              Terms of Service
            </Link>
            <Link href="/about" className="hover:text-blue-600 underline">
              About Cerebrum
            </Link>
            <Link href="/contact" className="hover:text-blue-600 underline">
              Contact
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-400 max-w-2xl mx-auto">
            Competitor fee ranges referenced in the pricing section are sourced from each
            provider&apos;s public rate cards (2024-25 academic year) and inclusions differ across
            providers.
          </p>
        </div>
      </section>

      {/* Schema Markup */}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://cerebrumbiologyacademy.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Online NEET Biology Coaching',
                item: 'https://cerebrumbiologyacademy.com/online-neet-biology-coaching',
              },
            ],
          }),
        }}
      />
    </div>
  )
}
