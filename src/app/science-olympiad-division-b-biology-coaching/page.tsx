'use client'

import {
  Sprout,
  Users,
  CheckCircle,
  AlertTriangle,
  MessageCircle,
  ArrowRight,
  Target,
  Trophy,
  Microscope,
  Dna,
  Leaf,
  Heart,
  Clock,
  GraduationCap,
  Globe,
  Bug,
  Stethoscope,
  ClipboardList,
} from 'lucide-react'
import Link from 'next/link'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/science-olympiad-division-b-biology-coaching'
const PROGRAM_URL = '/middle-school-biology-olympiad-usa'

// The biology / life-science events of Science Olympiad Division B.
// Lineups rotate yearly — these are the recurring life-science events; readers
// are told to confirm the current-season roster on the official site.
const events = [
  {
    name: 'Anatomy & Physiology',
    icon: Heart,
    tests:
      'A written/station test on selected human body systems (the specific systems rotate each season — often a subset such as the nervous, cardiovascular, endocrine, or musculoskeletal systems). Expects structure-and-function knowledge, diagram labeling, and how systems respond to disease and disorder.',
    prepare:
      'Master the assigned systems from a solid anatomy source, drill labeled diagrams, and connect each structure to its function and to common disorders. We teach the physiology reasoning — why a system behaves the way it does — so students answer applied questions, not just recall facts.',
  },
  {
    name: 'Heredity',
    icon: Dna,
    tests:
      'Classical and molecular genetics: Mendelian inheritance, Punnett squares (mono- and dihybrid), pedigrees, probability, sex-linkage, and basic molecular genetics. A math-and-reasoning-heavy event.',
    prepare:
      'Build fluency with Punnett squares and pedigree analysis, then layer in probability and genetic problem-solving under time pressure. We coach the problem types that appear repeatedly so students work quickly and accurately.',
  },
  {
    name: 'Ecology',
    icon: Globe,
    tests:
      'Population and community ecology, energy flow and food webs, biomes, biogeochemical cycles, and ecological relationships. Often centered on a specified biome or ecosystem for the season.',
    prepare:
      'Learn the core ecological principles, then apply them to data: reading population graphs, interpreting food webs, and reasoning about limiting factors. We emphasize graph and data interpretation, which is where points are won or lost.',
  },
  {
    name: 'Microbe Mission',
    icon: Bug,
    tests:
      'Microbiology: bacteria, viruses, protists, fungi, microbial structure and metabolism, growth, staining, disease, and lab/microscopy skills. Frequently includes hands-on or station components.',
    prepare:
      'Cover microbial diversity and cell structure, then practice identification, microscopy, and lab-technique questions. We build the microscopy and process-of-elimination skills that station rounds reward.',
  },
  {
    name: 'Disease Detectives',
    icon: Stethoscope,
    tests:
      'Epidemiology: outbreak investigation, study design, rates and risk, reading epidemiological data and graphs, and public-health reasoning. Often organized around an annual theme (e.g., foodborne, environmental).',
    prepare:
      'Learn the epidemiologic method — case definitions, 2x2 tables, attack rates, relative risk — and practice interpreting outbreak data. This is a reasoning event more than a memorization event, and that is exactly how we coach it.',
  },
  {
    name: 'Botany',
    icon: Leaf,
    tests:
      'Plant biology: plant anatomy and morphology, tissues, physiology (photosynthesis, transport), reproduction, and plant diversity/classification. Appears in the Division B rotation in some seasons.',
    prepare:
      'Study plant structure and function with strong diagram work, then connect anatomy to processes like transport and photosynthesis. We use clear textbook-style diagrams so structures are genuinely understood, not memorized blindly.',
  },
]

const howWeCoach = [
  {
    icon: ClipboardList,
    title: 'Event-by-event mastery',
    description:
      'We coach the specific biology events your team is running — content, diagram work, and the exact question types each event tends to ask.',
  },
  {
    icon: Target,
    title: 'Data & reasoning skills',
    description:
      'Division B biology events reward reading graphs, tables, pedigrees and outbreak data under time pressure. We drill the reasoning, not just facts.',
  },
  {
    icon: Users,
    title: 'Small live batches',
    description:
      'Real instructors and a small group — interactive sessions where students ask questions and work through past-style problems together.',
  },
  {
    icon: Clock,
    title: 'US-friendly evening slots',
    description:
      'Live classes in ET / CT / MT / PT evening slots that fit around school and practice. Recordings and notes are provided.',
  },
]

const faqs = [
  {
    question: 'What is Science Olympiad Division B?',
    answer:
      'Science Olympiad is a large, well-established US team STEM competition. Division B is the middle-school division, for students in grades 6-9 (a school competes with a roster of students, and each event is done by a small team of one to three students). Teams advance from regional to state and, for top teams, national tournaments. Division B spans many science and engineering events; several of them are biology / life-science events, which is what this coaching focuses on.',
  },
  {
    question: 'Which Division B events are biology events?',
    answer:
      'The recurring life-science events include Anatomy & Physiology, Heredity, Ecology, Microbe Mission, Disease Detectives, and Botany. Important: Science Olympiad rotates its event lineup every season, so the exact set of events (and the specific subtopics, such as which body systems are tested in Anatomy & Physiology) changes year to year. Always confirm the current-season roster and rules on the official Science Olympiad website before you build a study plan — we do this with every family we coach.',
  },
  {
    question: 'Is Division B a real middle-school competition?',
    answer:
      'Yes. Unlike the USA Biology Olympiad (USABO), which is open only to students in grades 9-12, Science Olympiad Division B is genuinely a middle-school division (grades 6-9). It is the single strongest legitimate biology-competition pathway for a middle schooler. That is why we recommend it as the place to start, rather than pretending a middle schooler can enter USABO.',
  },
  {
    question: 'How does Division B build toward high-school biology?',
    answer:
      'The habits Division B rewards — knowing anatomy and physiology cold, solving genetics problems quickly, interpreting ecological and epidemiological data — are exactly the foundations that make USABO and AP Biology approachable in grade 9. A student who has competed in Anatomy & Physiology, Heredity, and Disease Detectives arrives in high school already fluent in the reasoning those harder exams demand.',
  },
  {
    question: 'Do you coach the specific event my child is assigned?',
    answer:
      'Yes. Students are usually assigned a small number of events for the season. We tailor coaching to the biology events on your child’s roster, working through the content, diagrams, and question styles for each. Tell us which events they are running and their grade, and we will map a plan.',
  },
  {
    question: 'What grade levels is this for?',
    answer:
      'Science Olympiad Division B is for grades 6-9. Our coaching is built for that middle-school and early-high-school range, with age-appropriate depth — rigorous, but not a college textbook forced onto an 11-year-old.',
  },
  {
    question: 'How do I enroll, and what does it cost?',
    answer:
      'This coaching is delivered as part of our Middle School Biology Foundation program. It comes in three batch lengths, all in US dollars: a 6-month batch for $1,500, a 1-year (academic year) batch for $2,500, and a 2-year batch for $4,500. Every batch includes live small-batch classes in US timezones, recordings, and notes. Message us on WhatsApp at +91 88264 44334 with your child’s grade, timezone, and assigned events to get started.',
  },
  {
    question: 'Who teaches the coaching?',
    answer:
      'Cerebrum is a biology-only academy founded in 2014, led by Dr. Shekhar C Singh, an alumnus of the All India Institute of Medical Sciences (AIIMS New Delhi). Classes are delivered by biology specialists. Because biology is all we teach, the depth on events like Anatomy & Physiology, Microbe Mission, and Heredity is stronger than a general tutoring service can offer.',
  },
  {
    question: 'Do you guarantee a medal or a top placement?',
    answer:
      'No, and you should be wary of anyone who does. Results depend on the whole team, the event assignment, and the student’s effort. What we provide is excellent, honest, event-specific biology coaching and accurate guidance. We will always point you to the official rules rather than invent claims.',
  },
]

// ---- JSON-LD schema objects ----

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
  name: 'Dr. Shekhar C Singh',
  jobTitle: 'Founder & Lead Biology Faculty',
  description:
    'AIIMS New Delhi alumnus and founder of Cerebrum Biology Academy. Coaches the biology / life-science events of Science Olympiad Division B and designs the middle-school biology foundation pathway toward high-school USABO and AP Biology.',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'All India Institute of Medical Sciences (AIIMS New Delhi)',
  },
  worksFor: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  knowsAbout: [
    'Science Olympiad Division B biology events',
    'Anatomy and Physiology',
    'Heredity and genetics',
    'Ecology',
    'Microbe Mission microbiology',
    'Disease Detectives epidemiology',
    'Botany',
    'Middle school biology competition coaching',
  ],
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Science Olympiad Division B Biology Coaching (Grades 6-9)',
  description:
    'Online, event-focused coaching for the biology / life-science events of Science Olympiad Division B (grades 6-9): Anatomy & Physiology, Heredity, Ecology, Microbe Mission, Disease Detectives, and Botany. Delivered as part of the Cerebrum Middle School Biology Foundation program in small live batches in US timezones, taught by AIIMS-trained biology specialists. Event lineups rotate yearly; confirm the current roster on the official Science Olympiad website.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  educationalLevel: 'Middle School (Grades 6-9)',
  about: [
    'Science Olympiad Division B',
    'Anatomy & Physiology',
    'Heredity',
    'Ecology',
    'Microbe Mission',
    'Disease Detectives',
    'Botany',
  ],
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
    sameAs: 'https://cerebrumbiologyacademy.com',
  },
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
    audienceType: 'US students in grades 6-9 competing in Science Olympiad Division B',
  },
  offers: [
    {
      '@type': 'Offer',
      name: '6-month batch',
      price: '1500',
      priceCurrency: 'USD',
      category: 'Tuition',
      availability: 'https://schema.org/InStock',
      url: PAGE_URL,
    },
    {
      '@type': 'Offer',
      name: '1-year batch (academic year)',
      price: '2500',
      priceCurrency: 'USD',
      category: 'Tuition',
      availability: 'https://schema.org/InStock',
      url: PAGE_URL,
    },
    {
      '@type': 'Offer',
      name: '2-year batch',
      price: '4500',
      priceCurrency: 'USD',
      category: 'Tuition',
      availability: 'https://schema.org/InStock',
      url: PAGE_URL,
    },
  ],
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    inLanguage: 'en-US',
    location: {
      '@type': 'VirtualLocation',
      url: PAGE_URL,
    },
  },
}

const faqSchema = {
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Biology Olympiads',
      item: 'https://cerebrumbiologyacademy.com/biology-olympiads',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Science Olympiad Division B Biology Coaching',
      item: PAGE_URL,
    },
  ],
}

export default function ScienceOlympiadDivisionBPage() {
  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'science-olympiad-division-b-biology',
      campaign: 'science-olympiad-division-b-biology-coaching',
      message:
        'Hi! I want details about Science Olympiad Division B biology coaching (grades 6-9). Here are my child’s assigned events, grade, and timezone:',
    })
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-[#3d4d3d] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d4d3d] via-[#4a5d4a] to-[#3d4d3d]" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-5 h-5 mr-2 text-green-400" />
              USA · Grades 6-9 · Online
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Science Olympiad <span className="text-green-400">Division B</span> Biology Coaching
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Event-focused online coaching for grades 6-9 — the #1 legitimate middle-school biology
              competition
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              We coach the biology events of Science Olympiad Division B — Anatomy &amp; Physiology,
              Heredity, Ecology, Microbe Mission, Disease Detectives and Botany — with real depth,
              taught by biology specialists in small live batches on US evening timezones.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Message us on WhatsApp
              </button>
              <Link href="#events">
                <button className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#3d4d3d] font-bold py-4 px-8 rounded-xl transition-all duration-300">
                  See the biology events
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-400" />
                <div className="text-xl md:text-2xl font-bold">Division B</div>
                <div className="text-xs md:text-sm opacity-80">Grades 6-9</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <Microscope className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-400" />
                <div className="text-xl md:text-2xl font-bold">6 Events</div>
                <div className="text-xs md:text-sm opacity-80">Life-science focus</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <Clock className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-400" />
                <div className="text-xl md:text-2xl font-bold">ET/CT/MT/PT</div>
                <div className="text-xs md:text-sm opacity-80">Evening slots</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <GraduationCap className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-400" />
                <div className="text-xl md:text-2xl font-bold">Since 2014</div>
                <div className="text-xs md:text-sm opacity-80">AIIMS-trained</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Division B */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            What is Science Olympiad Division B?
          </h2>
          <div className="space-y-4 text-lg text-gray-700 max-w-3xl">
            <p>
              Science Olympiad is one of the largest and longest-running STEM competitions in the
              United States. It is a <strong>team</strong> competition: a school fields a roster of
              students, and each event is completed by a small team of one to three students.
              Schools compete at regional tournaments, and top teams advance to state and,
              ultimately, the national tournament.
            </p>
            <p>
              <strong>Division B is the middle-school division, for grades 6-9.</strong> It spans
              dozens of events across biology, earth science, chemistry, physics, and engineering.
              Several of those events are <strong>biology / life-science events</strong> — and those
              are what this coaching is built for.
            </p>
            <p>
              Because it is genuinely open to middle schoolers, Division B is the single strongest
              legitimate biology-competition pathway before high school. That is a real distinction:
              the USA Biology Olympiad (USABO) is open only to grades 9-12, so a middle schooler
              cannot enter it. Division B is where a young biologist actually competes.
            </p>
          </div>
        </div>
      </section>

      {/* Rotating roster honesty banner */}
      <section className="py-14 bg-amber-50 border-y border-amber-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Event lineups rotate every year — confirm the current roster
              </h2>
              <p className="text-base md:text-lg text-gray-800 mb-3">
                Science Olympiad changes its event lineup every season. Which biology events run,
                and the specific subtopics inside them (for example, which body systems are tested
                in Anatomy &amp; Physiology), can change from one year to the next.
              </p>
              <p className="text-base md:text-lg text-gray-800">
                We do <strong>not</strong> publish a fabricated current-season list or specific
                dates here. Always confirm the official event list and rules for your season on the{' '}
                <a
                  href="https://www.soinc.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3d4d3d] font-semibold underline"
                >
                  official Science Olympiad website (soinc.org)
                </a>
                . We build every study plan around the confirmed rules for your child’s roster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The biology events */}
      <section id="events" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Division B biology events we coach
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These are the recurring life-science events of Division B. For each, here is what it
              tests and how we prepare students. (Confirm which of these are in your season’s
              lineup.)
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((ev) => (
              <div key={ev.name} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#e8ede8] rounded-full flex items-center justify-center flex-shrink-0">
                    <ev.icon className="w-6 h-6 text-[#3d4d3d]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{ev.name}</h3>
                </div>
                <div className="mb-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-[#4a5d4a] mb-1">
                    What it tests
                  </div>
                  <p className="text-sm text-gray-700">{ev.tests}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[#4a5d4a] mb-1">
                    How we prepare students
                  </div>
                  <p className="text-sm text-gray-700">{ev.prepare}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we coach */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How our coaching works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Division B biology events reward genuine understanding and fast data reasoning. That
              is exactly what we build.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howWeCoach.map((f) => (
              <div key={f.title} className="bg-[#e8ede8] rounded-xl p-6">
                <f.icon className="w-10 h-10 text-[#3d4d3d] mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Builds toward high school */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Division B builds toward high-school biology
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Middle-school competition is the on-ramp. The skills transfer directly to USABO and AP
              Biology in grade 9.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                phase: 'Grades 6-9 — Compete in Division B (this coaching)',
                detail:
                  'Master biology events like Anatomy & Physiology, Heredity, Microbe Mission and Disease Detectives. Build content knowledge plus fast, accurate data reasoning.',
                icon: Sprout,
              },
              {
                phase: 'Grade 9 — USABO & AP Biology become options',
                detail:
                  'USABO eligibility begins in grade 9. A student who competed in Division B arrives already fluent in the anatomy, genetics and data-interpretation those exams demand — not starting from zero.',
                icon: Target,
              },
              {
                phase: 'Grades 9-12 — High-school competition years',
                detail:
                  'Pursue the USABO Open Exam, Semifinals and Finals, and AP Biology. For the very top students, the IBO selection pathway opens up.',
                icon: GraduationCap,
              },
            ].map((step, i) => (
              <div
                key={step.phase}
                className="flex items-start gap-4 bg-white rounded-xl p-6 shadow"
              >
                <div className="w-12 h-12 bg-[#3d4d3d] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <step.icon className="w-5 h-5 text-[#4a5d4a]" />
                    {step.phase}
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-6 text-center max-w-3xl mx-auto">
            Wondering when to begin?{' '}
            <Link
              href="/blog/when-to-start-biology-olympiad-parent-guide"
              className="text-[#3d4d3d] font-semibold underline"
            >
              Read our parent guide to starting the biology olympiad journey
            </Link>
            , or see{' '}
            <Link
              href="/blog/middle-school-biology-competitions-that-exist"
              className="text-[#3d4d3d] font-semibold underline"
            >
              which middle-school biology competitions actually exist
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Pricing / enrollment (part of the Foundation program) */}
      <section
        id="pricing"
        className="py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Enroll &amp; pricing</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Division B biology coaching is delivered as part of our{' '}
            <Link href={PROGRAM_URL} className="text-green-300 underline font-semibold">
              Middle School Biology Foundation
            </Link>{' '}
            program. Choose the batch length that fits your family — all priced in US dollars, no
            hidden fees.
          </p>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto mb-8">
            {[
              {
                name: '6-month batch',
                price: '$1,500',
                term: 'one semester',
                note: null,
                highlight: false,
              },
              {
                name: '1-year batch',
                price: '$2,500',
                term: 'full academic year',
                note: null,
                highlight: true,
              },
              {
                name: '2-year batch',
                price: '$4,500',
                term: 'two academic years',
                note: 'just $2,250 / year',
                highlight: false,
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 border text-center ${
                  tier.highlight ? 'bg-white/15 border-green-400' : 'bg-white/10 border-white/20'
                }`}
              >
                {tier.highlight && (
                  <div className="text-xs uppercase tracking-wide text-green-300 font-semibold mb-2">
                    Most popular
                  </div>
                )}
                <div className="text-sm uppercase tracking-wide text-slate-300 font-semibold mb-2">
                  {tier.name}
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-1">{tier.price}</div>
                <div className="text-slate-300">{tier.term} (USD)</div>
                {tier.note && <div className="text-green-300 text-sm mt-1">{tier.note}</div>}
              </div>
            ))}
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 max-w-md mx-auto">
            <div className="text-sm uppercase tracking-wide text-green-300 font-semibold mb-3">
              Every batch includes
            </div>
            <ul className="text-left space-y-2 mb-8">
              {[
                'Event-specific coaching for your child’s Division B biology events',
                'Live online classes in small batches',
                'US evening timezones (ET / CT / MT / PT)',
                'Class recordings + notes provided',
                'AIIMS-trained biology specialists',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={handleWhatsApp}
              className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Message us on WhatsApp
            </button>
            <p className="text-xs text-slate-400 mt-4">
              Prefer to reach us directly? Message us on WhatsApp at +91 88264 44334.
            </p>
            <p className="text-xs text-slate-400 mt-3">
              See the full{' '}
              <Link href={PROGRAM_URL} className="text-green-300 underline">
                Middle School Biology Foundation program
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-[#e8ede8] rounded-xl p-4 md:p-8 shadow-lg border border-[#4a5d4a]/10"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-start">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-[#3d4d3d] flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed ml-7 md:ml-9">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#3d4d3d] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Coach your Division B biology events the right way
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Tell us your child&apos;s grade, timezone, and assigned events, and we&apos;ll map a
            plan.
          </p>
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Message us on WhatsApp
          </button>
          <p className="text-sm opacity-80 mt-4">Or message us on WhatsApp at +91 88264 44334.</p>
        </div>
      </section>

      {/* Related reading & programs */}
      <section className="py-12 bg-[#e8ede8]">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Related reading &amp; programs
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              {
                href: '/middle-school-biology-olympiad-usa',
                label: 'Middle School Biology Foundation (Grades 6-8)',
              },
              {
                href: '/blog/middle-school-biology-competitions-that-exist',
                label: 'MS Biology Competitions That Exist',
              },
              {
                href: '/blog/when-to-start-biology-olympiad-parent-guide',
                label: 'When to Start (Parent Guide)',
              },
              {
                href: '/blog/can-a-middle-schooler-do-usabo',
                label: 'Can a Middle Schooler Do USABO?',
              },
              {
                href: '/blog/how-to-study-biology-in-middle-school',
                label: 'How to Study Biology in Middle School',
              },
              { href: '/usabo-coaching', label: 'USABO Coaching (Grades 9-12)' },
              { href: '/ap-biology-tutor', label: 'AP Biology Tutor' },
              { href: '/is-usabo-worth-it', label: 'Is USABO Worth It?' },
              { href: '/ap-biology-vs-usabo', label: 'AP Biology vs USABO' },
            ].map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  idx < 5
                    ? 'bg-[#3d4d3d] text-white px-5 py-3 rounded-lg shadow hover:shadow-md transition text-sm font-semibold'
                    : 'bg-white px-5 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30 text-sm font-medium text-gray-800'
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
