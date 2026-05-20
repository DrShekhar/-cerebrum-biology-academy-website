'use client'

import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Target,
  Microscope,
  Dna,
  Leaf,
  Heart,
  Beaker,
  Activity,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const class10Syllabus = [
  {
    unit: 'Chapter 6',
    title: 'Life Processes',
    chapters: [
      'Nutrition (Autotrophic + Heterotrophic)',
      'Respiration (Aerobic + Anaerobic)',
      'Transportation (Human circulatory + Plant translocation)',
      'Excretion (Human + Plant)',
    ],
    weightage: '22%',
    icon: Activity,
  },
  {
    unit: 'Chapter 7',
    title: 'Control and Coordination',
    chapters: [
      'Animal nervous system (CNS, PNS, reflex arc)',
      'Human endocrine glands and hormones',
      'Plant hormones (auxin, gibberellin, cytokinin, abscisic acid)',
      'Plant tropisms (phototropism, geotropism)',
    ],
    weightage: '16%',
    icon: Dna,
  },
  {
    unit: 'Chapter 8',
    title: 'How Do Organisms Reproduce?',
    chapters: [
      'Asexual reproduction (fission, budding, fragmentation, regeneration, vegetative)',
      'Sexual reproduction in flowering plants',
      'Sexual reproduction in human beings',
      'Reproductive health',
    ],
    weightage: '16%',
    icon: Heart,
  },
  {
    unit: 'Chapter 9',
    title: 'Heredity',
    chapters: [
      "Mendel's laws of inheritance",
      'Monohybrid and dihybrid crosses',
      'Sex determination in humans',
      'Variation and its inheritance',
    ],
    weightage: '14%',
    icon: Beaker,
  },
  {
    unit: 'Chapter 13',
    title: 'Our Environment',
    chapters: [
      'Ecosystem and its components',
      'Food chains and food webs',
      'Energy flow and trophic levels',
      'Environmental issues (ozone depletion, waste management)',
    ],
    weightage: '12%',
    icon: Leaf,
  },
]

const features = [
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description:
      'Learn from Dr. Shekhar Singh and faculty trained at premier medical institutions — biology is what we teach.',
  },
  {
    icon: BookOpen,
    title: 'NCERT Mastery',
    description:
      'Line-by-line NCERT coverage with diagram practice — exactly how the CBSE board paper expects Class 10 Biology answers.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description:
      '10-15 students per batch for personalised attention. Doubt-clearing happens in real time, not after class.',
  },
  {
    icon: Target,
    title: 'Board + NEET Foundation',
    description:
      'Class 10 is the bridge year. We cover the board syllabus thoroughly AND introduce NEET-level conceptual depth so Class 11 is much easier.',
  },
  {
    icon: Video,
    title: 'Diagram + Practice Bank',
    description:
      'Class 10 Biology is diagram-heavy (human heart, nephron, neuron, flower, plant tissue). Weekly diagram practice and past-paper drills.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Doubt Support',
    description:
      '24/7 WhatsApp doubt support. Send a photo of the question, get an explanation back — usually within an hour during the day.',
  },
]

const faqs = [
  {
    question: 'How is Class 10 CBSE Biology different from Class 9?',
    answer:
      'Class 10 Biology is significantly deeper and more diagram-heavy than Class 9. The five chapters — Life Processes, Control & Coordination, Reproduction, Heredity, and Our Environment — go from "what is biology" (Class 9) to "how the body actually works" (Class 10). The board exam expects clear NCERT-aligned answers with labeled diagrams. Many students who scored well in Class 9 without much effort struggle in Class 10 because the diagram, mechanism, and process-explanation expectations jump up sharply.',
  },
  {
    question: 'Class 10 is a board exam year — what is the right balance between board prep and Olympiad / NEET prep?',
    answer:
      'For Class 10 students, the board exam must be the primary focus — Class 10 board marks matter for school records and future references, and many CBSE schools use Class 10 marks for streaming Class 11. That said, the NCERT chapters in Class 10 Biology (Life Processes, Control & Coordination, Heredity) directly overlap with NEET Class 11-12 syllabus, so understanding them at conceptual depth (not just rote-memorising) gives a meaningful Class 11 headstart. We teach the boards-then-NEET sequencing explicitly: master the board level first, then layer NEET-level depth in the same chapter.',
  },
  {
    question: 'Is NCERT enough for Class 10 CBSE Biology board exam?',
    answer:
      'For the board exam itself, yes — NCERT is the primary and sufficient textbook. CBSE board papers stick closely to NCERT content, diagrams, and language. We cover NCERT line-by-line and add the diagram practice and past-paper drilling that the board exam rewards. For students aiming at NTSE, Olympiads, or NEET-foundation depth, we add supplementary conceptual material — but only after NCERT mastery is solid.',
  },
  {
    question: 'My child has weak diagram skills — Class 10 Biology has many diagrams (heart, kidney, neuron, flower). Can you help?',
    answer:
      'Yes — diagram practice is one of the highest-leverage interventions in Class 10 Biology. Weekly diagram-drawing sessions, label-the-parts drills against the NCERT diagrams, and feedback on board-style diagram answers. Many of our Class 10 students who started with weak diagram skills score full marks on the diagram-questions in the final board paper because of this focused practice. Diagrams are 8-12 marks in the typical CBSE Class 10 Biology section — we make sure your child does not lose any of them.',
  },
  {
    question: 'What is the fee for Class 10 CBSE Biology coaching?',
    answer:
      'Our Class 10 CBSE Biology coaching fees start from ₹22,000 per year for the small-batch programme. We offer flexible payment options (3-4 instalments), merit scholarships for deserving students, and GST-compliant invoices for corporate-reimbursement claims. Contact us via WhatsApp for the current fee structure and any active offers.',
  },
  {
    question: 'Do you offer both online and offline classes for Class 10 CBSE?',
    answer:
      'Yes. We offer offline classes at our 4 centres in Delhi NCR (South Extension, Gurugram, Faridabad, Rohini) and live online classes for students across India. Both modes have the same faculty, same curriculum, and the same diagram-practice and past-paper drills. Many of our Class 10 students prefer the hybrid model — online for weekday classes, offline for Saturday board-paper drilling.',
  },
  {
    question: 'My child is in Class 10 CBSE and we are planning NEET for Class 11-12 — when should we start NEET-specific prep?',
    answer:
      'The honest answer: serious NEET prep should start in Class 11 (which is itself NEET Class 11 syllabus). For Class 10 students, the right move is to (a) master Class 10 NCERT Biology at conceptual depth, (b) introduce the NEET-style multiple-choice question pattern in a low-pressure way so it is not new in Class 11, and (c) build the study-habit foundation. We run a "Class 10 → NEET bridge" track that does exactly this — board mastery primary, NEET-foundation secondary.',
  },
]

export default function BiologyTutorClass10CBSEPage() {
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-emerald-800 to-emerald-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fadeInUp">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-5 h-5 mr-2 text-yellow-300" />
              Class 10 CBSE Biology · Board Exam Year
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">Class 10 CBSE</span> Biology Tutor
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Board Exam Mastery · NEET Foundation · NCERT-Line-by-Line
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Class 10 is the CBSE board exam year — and the bridge year for students planning NEET
              in Class 11-12. Five chapters, 80% Biology weightage on the boards, plus the
              diagram-heavy questions that decide your child&apos;s final marks. AIIMS-trained
              faculty, board-aligned teaching, and an optional Class 10 → NEET foundation layer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20demo%20class%20for%20Class%2010%20CBSE%20Biology.%20Please%20share%20available%20timings%20and%20the%20board-exam%20preparation%20plan."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link
                href="https://wa.me/918826444334?text=Hi!%20My%20child%20is%20in%20Class%2010%20CBSE.%20Please%20share%20the%20Biology%20coaching%20fee%20structure%2C%20batch%20timings%2C%20and%20Class%2010%20%E2%86%92%20NEET%20foundation%20track%20details."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-emerald-800"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Fees & Enrolment
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-80">Board Results</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">10-15</div>
                <div className="text-sm opacity-80">Students/Batch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">5 Chapters</div>
                <div className="text-sm opacity-80">Complete NCERT</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">680+</div>
                <div className="text-sm opacity-80">Medical Selections</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Class 10 CBSE Biology Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All five biology chapters of the Class 10 NCERT Science textbook — covered line-by-
              line with diagrams, mechanisms, and past-paper-style practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {class10Syllabus.map((unit) => (
              <div
                key={unit.unit}
                className="bg-white rounded-xl p-6 shadow-lg animate-fadeInUp"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <unit.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {unit.weightage} Boards
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{unit.unit}</h3>
                <p className="text-emerald-600 font-medium mb-3">{unit.title}</p>
                <ul className="space-y-1">
                  {unit.chapters.map((chapter) => (
                    <li key={chapter} className="text-sm text-gray-600 flex items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                      {chapter}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              What You Get in Class 10 CBSE Biology Coaching
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gray-50 rounded-xl p-8 animate-fadeInUp">
                <feature.icon className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sell — Beyond Class 10 Biology: NEET + Olympiad + Class 11 */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
              Same faculty · Class 10 board mastery + everything next
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Beyond Class 10 boards — what else Cerebrum coaches
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
              Cerebrum Biology Academy is biology-only across CBSE Class 9 → Class 10 boards →
              Class 11-12 → NEET, plus Biology Olympiads (NSEB / INBO / IBO) and international
              curricula (IB, IGCSE, AP). One faculty network across your child&apos;s entire biology
              journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Class 11 / Class 12 CBSE Biology */}
            <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 hover:border-emerald-400 hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="font-bold text-slate-900">Class 11 → 12 CBSE Biology</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                The natural next step after Class 10. Same faculty, same coaching style, NEET-
                aligned Class 11-12 NCERT mastery. Many of our Class 10 students continue
                seamlessly into the Class 11 batch.
              </p>
              <Link
                href="https://wa.me/918826444334?text=Hi!%20My%20child%20is%20in%20Class%2010%20CBSE%20and%20we%20are%20planning%20Class%2011-12%20Biology%20%2B%20NEET.%20Please%20share%20the%20Class%2010%20%E2%86%92%20Class%2011%20continuation%20track%20and%20fee%20structure."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp: Class 11 enquiry
              </Link>
            </div>

            {/* NEET Foundation */}
            <div className="bg-white rounded-2xl border-2 border-amber-200 p-6 hover:border-amber-400 hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-amber-700" />
                </div>
                <h3 className="font-bold text-slate-900">Class 10 → NEET Foundation</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Board-then-NEET sequencing: master Class 10 boards first, then layer NEET-level
                conceptual depth in the same chapters. Class 11 becomes a continuation, not a
                jump. AIIMS-trained faculty.
              </p>
              <Link
                href="https://wa.me/918826444334?text=Hi!%20My%20child%20is%20in%20Class%2010%20CBSE%20and%20we%20want%20to%20add%20NEET%20foundation%20alongside%20board%20preparation.%20Please%20share%20the%20Class%2010%20%E2%86%92%20NEET%20foundation%20track%20details%20and%20schedule."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp: NEET foundation
              </Link>
            </div>

            {/* Biology Olympiads */}
            <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 hover:border-blue-400 hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-blue-700" />
                </div>
                <h3 className="font-bold text-slate-900">Biology Olympiads (NSEB / INBO)</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                For Class 10 students with strong board marks who want a Biology Olympiad layer.
                Cerebrum coaches the full India funnel — NSEB (Class 11/12 eligibility) → INBO →
                OCSC → IBO India team. Class 10 is the right year to start building the
                foundation.
              </p>
              <Link
                href="https://wa.me/918826444334?text=Hi!%20My%20child%20is%20in%20Class%2010%20CBSE%20with%20strong%20biology%20marks.%20We%20want%20to%20explore%20Biology%20Olympiad%20coaching%20%E2%80%94%20NSEB%20%2F%20INBO%20%2F%20IBO%20pipeline.%20Please%20share%20schedule%20and%20eligibility."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp: Olympiad enquiry
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500 mt-8">
            Founded by Dr. Shekhar C Singh (AIIMS New Delhi alumnus) · 680+ medical college
            selections · 98% NEET qualification rate · Biology-only since 2014
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-emerald-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Class 10 CBSE Biology — Boards First, NEET Foundation Built In
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Master the board exam this year. Walk into Class 11 with NEET-level Biology already
              familiar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20demo%20class%20for%20Class%2010%20CBSE%20Biology.%20Please%20share%20available%20timings%20and%20the%20board-exam%20preparation%20plan."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <Link
                href="https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20Class%2010%20CBSE%20Biology%20coaching.%20Please%20share%20fee%20structure%20and%20enrolment%20details."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-emerald-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/biology-tutor-class-9-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 9 CBSE Biology
            </Link>
            <Link
              href="/biology-tutor-class-11-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 CBSE Biology
            </Link>
            <Link
              href="/biology-tutor-class-12-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 12 CBSE Biology
            </Link>
            <Link
              href="/cbse-biology-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              CBSE Biology Hub
            </Link>
            <Link
              href="/neet-biology-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology Coaching
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
