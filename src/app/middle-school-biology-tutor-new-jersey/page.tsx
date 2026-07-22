'use client'

import {
  Sprout,
  Users,
  CheckCircle,
  AlertTriangle,
  MessageCircle,
  ArrowRight,
  Target,
  Globe,
  Microscope,
  Dna,
  Leaf,
  Heart,
  Clock,
  GraduationCap,
  Compass,
  MapPin,
} from 'lucide-react'
import Link from 'next/link'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-new-jersey'

// Age-appropriate foundation curriculum — NOT college-textbook cramming.
const curriculum = [
  {
    unit: 'How Life Is Built',
    topics: [
      'Cells & organelles',
      'Microscopy skills',
      'What makes something alive',
      'Diffusion & osmosis',
    ],
    icon: Microscope,
  },
  {
    unit: 'Genetics & Heredity',
    topics: ['DNA basics', 'Traits & inheritance', 'Punnett squares', 'Why siblings differ'],
    icon: Dna,
  },
  {
    unit: 'Plants & Photosynthesis',
    topics: [
      'Plant parts & function',
      'How plants make food',
      'Transport in plants',
      'Seeds & growth',
    ],
    icon: Leaf,
  },
  {
    unit: 'The Human Body',
    topics: ['Body systems overview', 'Heart & circulation', 'Digestion', 'How we stay balanced'],
    icon: Heart,
  },
  {
    unit: 'Ecology & Environment',
    topics: ['Food webs', 'Ecosystems', 'Adaptation', 'Conservation basics'],
    icon: Globe,
  },
  {
    unit: 'Thinking Like a Scientist',
    topics: [
      'Reading data & graphs',
      'Designing simple experiments',
      'Scientific vocabulary',
      'Competition-style reasoning',
    ],
    icon: Compass,
  },
]

// Competitions a middle schooler CAN actually enter (per verified eligibility).
const realCompetitions = [
  {
    name: 'Science Olympiad — Division B',
    eligibility: 'Grades 6-9',
    detail:
      'The #1 legitimate middle-school pathway, and a strong, well-established nationwide competition. Real biology events: Anatomy & Physiology, Heredity, Ecology, Microbe Mission, Disease Detectives, and Botany. We coach these events directly.',
    can: true,
  },
  {
    name: 'National Biology Bowl',
    eligibility: 'Middle school',
    detail:
      'A middle-school-specific biology quiz-bowl, held online (typically late May). A great first taste of timed biology competition for a NJ student. We prepare students directly.',
    can: true,
  },
  {
    name: 'MCR Biology Contest',
    eligibility: 'Has a middle-school division',
    detail:
      'An online biology contest with a dedicated middle-school division — accessible and low-pressure. We coach it directly.',
    can: true,
  },
  {
    name: 'IJSO (Int’l Junior Science Olympiad)',
    eligibility: 'Age 15 and under',
    detail:
      'Aspirational and highly selective. Note: it is integrated science (physics + chemistry + biology), not biology-only — so it complements, rather than replaces, a biology foundation.',
    can: true,
  },
]

// Exams middle schoolers CANNOT compete in yet — the honest truth.
const notYet = [
  {
    name: 'USABO (USA Biology Olympiad)',
    truth:
      'Grades 9-12 only. There is no middle-school or junior division. A 6th-8th grader cannot compete in USABO now — the honest goal is to be ready to enter it in grade 9.',
  },
  {
    name: 'IBO (International Biology Olympiad)',
    truth:
      'Sits downstream of USABO and is a high-school endpoint. Middle school is foundation-building only — not a competition entry point.',
  },
  {
    name: 'Brain Bee (Neuroscience)',
    truth:
      'Effectively not available in middle school: there is an age-13 floor and students must be enrolled in an accredited US high school. Prep in grade 8 so you can compete as a grade-9 freshman.',
  },
]

const whyUs = [
  {
    icon: GraduationCap,
    title: 'AIIMS-trained faculty',
    description:
      'Taught by biology specialists led by Dr. Shekhar C Singh, an AIIMS New Delhi alumnus. Biology is all we teach — the depth shows.',
  },
  {
    icon: Users,
    title: 'Small live batches',
    description:
      'Real teachers, real interaction — not a video library. Small groups so every student gets attention and their questions answered.',
  },
  {
    icon: Clock,
    title: 'ET evening slots for NJ',
    description:
      'Live online classes scheduled in Eastern Time evening slots, so they fit around a New Jersey school day and after-school activities. Recordings and notes are provided.',
  },
  {
    icon: Sprout,
    title: 'Age-appropriate, not cramming',
    description:
      'We build curiosity and real conceptual depth for ages 11-14 — we do NOT force a college textbook onto a 12-year-old. That is the difference.',
  },
]

const faqs = [
  {
    question: 'Do you have a physical tutoring center in New Jersey?',
    answer:
      'No — and that is by design. Cerebrum is a fully online biology academy, so we serve New Jersey families from anywhere in the state without a commute. Classes are live and interactive (not pre-recorded videos), scheduled in Eastern Time evening slots so they fit around a NJ school day. Whether you are in Bergen County, the Edison-Princeton corridor, Cherry Hill, Jersey City, or a smaller town, your child joins the same small live batch online.',
  },
  {
    question: 'Can my child take the USABO in middle school?',
    answer:
      'No. The USA Biology Olympiad (USABO) is open only to students in grades 9-12, and there is no middle-school or junior division. Any page that advertises a "USABO middle-school division" or "grades 6-7-8 USABO" is inaccurate. What a middle schooler in New Jersey CAN do is build a strong foundation now so they are genuinely ready to enter USABO as a 9th-grader — including students aiming for selective magnet high schools. That foundation-first approach is exactly what this program is designed for.',
  },
  {
    question: 'Then what competitions can a New Jersey middle schooler actually enter?',
    answer:
      'Several legitimate ones. Science Olympiad Division B (grades 6-9) is the strongest fit and is a strong nationwide middle-school pathway; it includes real biology events like Anatomy & Physiology, Heredity, Ecology, Microbe Mission, Disease Detectives, and Botany. The National Biology Bowl is a middle-school biology quiz-bowl held online. The MCR Biology Contest has a middle-school division. IJSO is an aspirational, selective option (integrated science, ages 15 and under). We coach the middle-school-eligible contests directly.',
  },
  {
    question: 'Is this program going to overwhelm an 11-14 year old?',
    answer:
      'No — that is the whole point of doing it right. We teach an age-appropriate foundation that emphasizes curiosity, conceptual understanding, and scientific thinking. We deliberately do NOT drill a college-level Campbell textbook into a middle schooler. In a competitive-academics environment like New Jersey it is tempting to push kids too hard too early; we build the base the right way instead, which is what actually lasts.',
  },
  {
    question: 'What does the program cost?',
    answer:
      'The program comes in three batch lengths, all priced in US dollars: a 6-month batch for $1,500, a 1-year (academic year) batch for $2,500, and a 2-year batch for $4,500. Every batch covers live online classes in small batches, recordings, and notes. There are no hidden fees and no India-specific pricing — this is a US program priced in US dollars.',
  },
  {
    question: 'What grade levels and NJ schools is this for?',
    answer:
      'US students in grades 6-8 (ages roughly 11-14) at any New Jersey public, charter, magnet, or private school. It suits families who want an early, rigorous-but-age-appropriate biology foundation before high school — whether the goal is Science Olympiad, readiness for a selective STEM high school, future USABO/AP Biology, or simply getting genuinely good at biology early.',
  },
  {
    question: 'How does the olympiad pathway work over time?',
    answer:
      'Grades 6-8: build the foundation and (optionally) compete in Science Olympiad Division B, the National Biology Bowl, or the MCR contest. Grade 9: this is when USABO eligibility begins — students can now enter the USABO Open Exam and start AP Biology. Grades 9-12: pursue USABO Semifinals/Finals and, for the very top students, the IBO selection pathway. Middle school is the on-ramp, not the race itself.',
  },
  {
    question: 'What are the classes actually like?',
    answer:
      'Live online sessions with a real instructor and a small group of students, scheduled in Eastern Time evenings for New Jersey families. Sessions are interactive — diagrams, worked reasoning, data-reading practice, and competition-style questions pitched at the right level. Recordings and notes are shared so nothing is lost if a class is missed.',
  },
  {
    question: 'Who teaches the program?',
    answer:
      'Cerebrum is a biology-only academy founded in 2014, led by Dr. Shekhar C Singh, an alumnus of the All India Institute of Medical Sciences (AIIMS New Delhi). Classes are delivered by biology specialists — we do not spread across many subjects, which is why the biology depth and clarity are stronger than general tutoring services.',
  },
  {
    question: 'Do you guarantee my child will win a competition or get into a top school?',
    answer:
      'No, and you should be cautious of anyone who does. We provide excellent, honest, age-appropriate biology teaching and correct competition guidance. Outcomes depend on the student. What we guarantee is accurate information, real instruction, and a foundation built the right way.',
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
    'AIIMS New Delhi alumnus and founder of Cerebrum Biology Academy. Teaches the online middle-school biology foundation for New Jersey families and designs the honest early-prep pathway toward high-school biology olympiads.',
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
    'Middle school biology',
    'Biology enrichment for grades 6-8',
    'Science Olympiad Division B biology events',
    'National Biology Bowl',
    'Biology olympiad foundation',
    'Pre-USABO preparation',
    'Age-appropriate science education',
  ],
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Middle School Biology Tutor & Olympiad Prep (New Jersey) — Grades 6-8',
  description:
    'Online middle school biology tutoring and honest olympiad prep for New Jersey students (grades 6-8, ages 11-14). Age-appropriate conceptual biology plus early preparation for the biology olympiad pathway (Science Olympiad Division B, National Biology Bowl) and future high-school USABO/AP Biology readiness. Live small-batch classes in Eastern Time evening slots, taught by AIIMS-trained specialists.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  educationalLevel: 'Middle School',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
    sameAs: 'https://cerebrumbiologyacademy.com',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'New Jersey',
    containedInPlace: {
      '@type': 'Country',
      name: 'United States',
    },
  },
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
    audienceType: 'New Jersey middle school students in grades 6-8 (ages 11-14)',
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
      name: 'Middle School Biology (USA)',
      item: 'https://cerebrumbiologyacademy.com/middle-school-biology-olympiad-usa',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Middle School Biology Tutor — New Jersey',
      item: PAGE_URL,
    },
  ],
}

export default function MiddleSchoolBiologyTutorNewJerseyPage() {
  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'ms-biology-tutor-new-jersey',
      campaign: 'middle-school-biology-tutor-new-jersey',
      message:
        'Hi! I am a New Jersey family and want details about the online Middle School Biology Tutor program (grades 6-8). Please share the ET schedule, timezones, and how to enroll.',
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
              <MapPin className="w-5 h-5 mr-2 text-green-400" />
              New Jersey · Grades 6-8 · Online (ET evenings)
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Middle School <span className="text-green-400">Biology Tutor</span> & Olympiad Prep —
              New Jersey
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Honest, age-appropriate biology for NJ students in grades 6-8 — taught live online in
              Eastern Time evenings
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              A rigorous-but-age-appropriate online biology program for New Jersey families. We
              build a genuine foundation and guide you to the competitions a middle schooler can
              actually enter — no hype, no fake &quot;USABO junior division.&quot; Fully online, so
              there is no commute anywhere in the state.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Message us on WhatsApp
              </button>
              <Link href="#pricing">
                <button className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#3d4d3d] font-bold py-4 px-8 rounded-xl transition-all duration-300">
                  See pricing
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <Sprout className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-400" />
                <div className="text-xl md:text-2xl font-bold">Grades 6-8</div>
                <div className="text-xs md:text-sm opacity-80">Ages 11-14</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <Users className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-400" />
                <div className="text-xl md:text-2xl font-bold">Small Batches</div>
                <div className="text-xs md:text-sm opacity-80">Live &amp; interactive</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <Clock className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-400" />
                <div className="text-xl md:text-2xl font-bold">ET Evenings</div>
                <div className="text-xs md:text-sm opacity-80">New Jersey timezone</div>
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

      {/* NJ-specific context */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 text-[#4a5d4a] font-semibold mb-3">
            <MapPin className="w-5 h-5" />
            For New Jersey families
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Biology tutoring built for how New Jersey does academics
          </h2>
          <div className="space-y-4 text-lg text-gray-700 max-w-3xl">
            <p>
              New Jersey is one of the most academically competitive states in the country. Families
              here are used to selective magnet programs and rigorous public schools — think of the
              reputation of county academies like the Bergen County Academies, the dense
              science-and-tech corridor running through Edison and Princeton, and strong districts
              such as Cherry Hill in the south. In an environment like this, biology is often a
              subject where motivated middle schoolers want to get genuinely ahead, not just keep
              up.
            </p>
            <p>
              That competitive culture cuts both ways. It creates real opportunity — but it also
              tempts families to push kids into high-school-level material years too early. Our
              whole approach is to give your child a real head start <em>the right way</em>: a deep,
              age-appropriate biology foundation for grades 6-8, plus honest guidance about which
              competitions a middle schooler can actually enter and which ones have to wait for high
              school.
            </p>
            <p>
              Because we teach entirely online in Eastern Time evening slots, there is no drive to a
              tutoring center after a long school day — a NJ student can join a small, live class
              from home whether you are in North Jersey, Central Jersey, or the
              Philadelphia-adjacent south. We do not have a physical office in New Jersey, and we
              will never pretend otherwise.
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-6 max-w-3xl">
            New Jersey schools and programs are referenced here only as widely known public context
            for the state&apos;s academic culture. Cerebrum is an independent online academy and is
            not affiliated with, endorsed by, or partnered with any named school, district, or
            program.
          </p>
        </div>
      </section>

      {/* Honest eligibility banner */}
      <section className="py-14 bg-amber-50 border-y border-amber-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                The honest truth about middle school and biology olympiads
              </h2>
              <p className="text-base md:text-lg text-gray-800 mb-3">
                Middle schoolers do <strong>not</strong> compete in the USABO, the IBO, or the Brain
                Bee. Those are high-school competitions (grades 9-12), and there is no legitimate
                &quot;junior&quot; or &quot;middle-school division&quot; of the USABO — despite what
                some listicles and competitor pages claim.
              </p>
              <p className="text-base md:text-lg text-gray-800">
                So what is this program? It is an <strong>honest foundation</strong> for New Jersey
                families. We teach biology properly for ages 11-14, and we point you toward the
                competitions a middle schooler <em>can</em> actually enter — while getting your
                child genuinely ready to step into the USABO and AP Biology in grade 9.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Who this is for in New Jersey
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl">
            This program is built for New Jersey families who want their child to get a real head
            start in biology — the &quot;start early, do it right&quot; approach — without pushing
            college material onto a kid who is not ready for it. It is a strong fit if your child:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Is in grades 6-8 (roughly ages 11-14) at a New Jersey school.',
              'Is curious about biology and wants to go deeper than the school curriculum.',
              'Is interested in Science Olympiad (Division B) biology events.',
              'May be aiming for a selective STEM or magnet high school and wants a real edge.',
              'Wants to be genuinely ready for USABO and AP Biology when high school begins.',
              'Learns best with a live teacher and a small group, not a video library.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-[#e8ede8] rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-[#4a5d4a] flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's taught */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What we actually teach
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              An age-appropriate foundation that builds real understanding and scientific thinking —
              not a college textbook crammed into a 12-year-old. Curiosity and conceptual depth come
              first.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculum.map((unit) => (
              <div key={unit.unit} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-[#e8ede8] rounded-full flex items-center justify-center mb-4">
                  <unit.icon className="w-6 h-6 text-[#3d4d3d]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{unit.unit}</h3>
                <ul className="space-y-1">
                  {unit.topics.map((topic) => (
                    <li key={topic} className="text-sm text-gray-600 flex items-start">
                      <CheckCircle className="w-4 h-4 text-[#4a5d4a] mr-2 flex-shrink-0 mt-0.5" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real competitions they CAN enter */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Competitions a New Jersey middle schooler can actually enter
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These are real, verified, middle-school-eligible options. We coach the eligible ones
              directly and help your family choose the right fit.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {realCompetitions.map((c) => (
              <div key={c.name} className="bg-[#e8ede8] rounded-xl p-6 border border-[#4a5d4a]/15">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{c.name}</h3>
                  <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Eligible
                  </span>
                </div>
                <div className="text-sm font-medium text-[#4a5d4a] mb-2">{c.eligibility}</div>
                <p className="text-gray-700 text-sm">{c.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              And the ones that are high-school-only (so you are not misled)
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {notYet.map((n) => (
                <div key={n.name} className="bg-red-50 rounded-xl p-5 border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <h4 className="font-bold text-gray-900">{n.name}</h4>
                  </div>
                  <p className="text-sm text-gray-700">{n.truth}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Honest pathway timeline */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The honest olympiad pathway
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Middle school is the on-ramp, not the race. Here is how the real timeline works for a
              New Jersey student.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                phase: 'Grades 6-8 — Foundation (this program)',
                detail:
                  'Build genuine biology understanding and scientific thinking. Optionally compete in Science Olympiad Division B, the National Biology Bowl, or the MCR Biology Contest.',
                icon: Sprout,
              },
              {
                phase: 'Grade 9 — Eligibility begins',
                detail:
                  'This is when USABO eligibility starts. Students can now sit the USABO Open Exam and begin AP Biology — arriving prepared, not starting from zero. This also lines up with entry to a NJ high school or magnet program.',
                icon: Target,
              },
              {
                phase: 'Grades 9-12 — Competition years',
                detail:
                  'Pursue USABO Semifinals and Finals, AP Biology, and — for the very top students — the IBO selection pathway. Brain Bee also becomes an option for enrolled high-schoolers aged 13+.',
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
            Want the full parent view of when to start?{' '}
            <Link
              href="/blog/when-to-start-biology-olympiad-parent-guide"
              className="text-[#3d4d3d] font-semibold underline"
            >
              Read our parent guide to starting the biology olympiad journey
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Why Cerebrum */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why New Jersey families choose Cerebrum
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((f) => (
              <div key={f.title} className="bg-[#e8ede8] rounded-xl p-6">
                <f.icon className="w-10 h-10 text-[#3d4d3d] mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, honest pricing</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Choose the batch length that fits your family — all priced in US dollars, no hidden
            fees.
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
                'Live online classes in small batches',
                'Eastern Time evening slots for New Jersey',
                'Class recordings + notes provided',
                'AIIMS-trained biology specialists',
                'Correct competition guidance for your child',
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
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently asked questions — New Jersey
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
            Start biology the right way — early, and honestly
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Tell us your child&apos;s grade and your New Jersey town, and we&apos;ll share the ET
            schedule.
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
                label: 'Middle School Biology (USA) — Main Program',
              },
              {
                href: '/blog/can-a-middle-schooler-do-usabo',
                label: 'Can a Middle Schooler Do USABO?',
              },
              {
                href: '/blog/middle-school-biology-competitions-that-exist',
                label: 'MS Biology Competitions That Exist',
              },
              {
                href: '/blog/how-to-study-biology-in-middle-school',
                label: 'How to Study Biology in Middle School',
              },
              {
                href: '/blog/when-to-start-biology-olympiad-parent-guide',
                label: 'When to Start (Parent Guide)',
              },
              { href: '/usabo-coaching', label: 'USABO Coaching (Grades 9-12)' },
              { href: '/ap-biology-tutor', label: 'AP Biology Tutor' },
              { href: '/brain-bee-coaching', label: 'Brain Bee (Neuroscience)' },
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
