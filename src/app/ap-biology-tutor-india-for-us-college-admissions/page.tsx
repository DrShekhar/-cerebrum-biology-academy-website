'use client'

import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  Trophy,
  Users,
  CheckCircle,
  Award,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Target,
  Brain,
  Microscope,
  FileText,
  TrendingUp,
  Lightbulb,
  Phone,
  GraduationCap,
  Globe,
  IndianRupee,
  Sparkles,
  School,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = `${SITE_URL}/ap-biology-tutor-india-for-us-college-admissions`

// Headline stats anchored to the AIIMS faculty + AP-5 conversion rate.
// Kept identical to the main /ap-biology-tutor hero so messaging stays
// consistent across the AP cluster.
const heroStats = [
  { label: 'Indian Students Coached', value: '120+', icon: Users },
  { label: 'AP-5 Conversion', value: '88%', icon: Trophy },
  { label: 'PhD / AIIMS Faculty', value: '15+', icon: Award },
  { label: 'IST-Evening Batches', value: '7–10 PM', icon: Clock },
]

// "Why AP Biology" reasons — each rooted in a real US admissions
// signal so the page does not over-promise. Order is intentional: STEM
// readiness first (highest weight in US admissions), differentiation,
// credit (concrete dollar value), SAT pairing (profile completion).
const whyAPReasons = [
  {
    icon: Sparkles,
    title: 'AP-5 signals STEM readiness for Ivy League and T20 schools',
    body: 'Admissions officers at MIT, Stanford, Caltech, Duke, and the Ivies use AP scores as the most directly comparable measure of subject mastery across applicants from 80+ countries. A 5 on AP Biology, especially paired with AP Chemistry / AP Calculus BC, reads as quantitative readiness for a STEM major and pre-med track. For Indian applicants competing against US peers with 8–10 APs, AP Biology is a near-mandatory subject line on the transcript.',
  },
  {
    icon: Globe,
    title: 'Differentiates Indian CBSE / ICSE / IB applicants in the admissions read',
    body: 'A standalone CBSE or ICSE transcript is hard for a US admissions officer to calibrate — grade inflation differs by school, and the boards themselves are not nationally normed in the US sense. Adding 2–3 AP exams (with AP Biology as the science anchor) gives the admissions reader a College Board benchmark that maps directly to US college performance. For IB Diploma students, AP Biology is optional but reinforces the science profile beyond the HL Biology grade.',
  },
  {
    icon: GraduationCap,
    title: 'College credit at UC system, public flagships, and many privates',
    body: 'A 4 or 5 on AP Biology earns 4–8 college credits at most University of California campuses (UC Berkeley, UCLA, UCSD), public flagships (UMich, UT Austin, UNC), and a portion of private universities. That is one full year of introductory biology waived — typically a US$3,000–US$8,000 tuition saving and a free elective slot in freshman year. Top-tier private universities (Harvard, Princeton, Stanford, MIT) increasingly do not award credit but still weigh the score in admissions.',
  },
  {
    icon: Target,
    title: 'Pairs with SAT Reasoning for a complete STEM profile',
    body: 'AP Biology + a strong SAT (1500+) is the standard quantitative spine of a competitive US application from India. SAT Subject Tests in Biology were discontinued by College Board in January 2021, so AP Biology now carries even more weight as the discriminating biology data point. We coach AP Biology alongside SAT prep where families want both — same Campbell foundation, different question patterns.',
  },
]

// City cards — feeder schools verified by IB / AP exam center listings.
// City links are placeholders; the city pages are created in a parallel
// agent task. If those pages slip, the cards still render and the links
// will 404 — flag for re-link if needed.
const cityCards = [
  {
    city: 'Mumbai',
    slug: 'ap-biology-tutor-mumbai',
    region: 'South Mumbai · BKC · Western Suburbs',
    schools: [
      'American School of Bombay',
      'Cathedral & John Connon School',
      'Bombay International School',
      'Oberoi International School',
      'Aditya Birla World Academy',
      'Ecole Mondiale World School',
    ],
  },
  {
    city: 'Delhi NCR / Gurgaon',
    slug: 'ap-biology-tutor-delhi-ncr',
    region: 'Lutyens · South Delhi · Gurgaon · Noida',
    schools: [
      'American Embassy School (AES Delhi)',
      'Pathways World School Aravali',
      'Pathways School Gurgaon',
      'Sanskriti School',
      'Vasant Valley School',
      'Modern School Barakhamba',
    ],
  },
  {
    city: 'Bangalore',
    slug: 'ap-biology-tutor-bangalore',
    region: 'Whitefield · Sarjapur · Central Bangalore',
    schools: [
      'Inventure Academy',
      'Trio World Academy',
      'Stonehill International School',
      'Indus International School',
      'Canadian International School Bangalore',
      'Greenwood High International School',
    ],
  },
  {
    city: 'Hyderabad',
    slug: 'ap-biology-tutor-hyderabad',
    region: 'Gachibowli · Jubilee Hills · HITEC City',
    schools: [
      'Oakridge International School',
      'CHIREC International School',
      'Indus International School Hyderabad',
      'Glendale Academy International',
      'Sancta Maria International School',
    ],
  },
]

// The "how we coach" pillars. Each pillar is a real workflow element of
// our AP track — not marketing fluff.
const coachingPillars = [
  {
    icon: FileText,
    title: 'Campbell Biology end-to-end',
    body: 'Full coverage of Campbell Biology (12th edition) across all 8 College Board units — 381 hours of structured teaching mapped to the AP CED. Indian students typically know Class 11–12 NCERT biology well; we layer the depth and the experimental-design framing AP demands but NCERT skips.',
  },
  {
    icon: Brain,
    title: 'FRQ rubric mastery, not just FRQ practice',
    body: 'Free-response questions are where most 3-scorers and 4-scorers lose points. We do not just give students FRQ practice — we annotate the College Board scoring rubric for every question, then have students self-grade against the rubric. This is the single biggest gap closer between a 4 and a 5.',
  },
  {
    icon: Calendar,
    title: 'Weekly past-paper drills (2012 onwards)',
    body: 'AP Biology released exams from 2012 to the most recent administration form our weekly drill library. Students sit one full Section II FRQ set every Saturday from January to mid-April, with examiner-style feedback inside 48 hours.',
  },
  {
    icon: Clock,
    title: 'IST-evening live classes (7–10 PM)',
    body: 'All live sessions run 7–10 PM IST — after school for Class 11/12 students and before bedtime for younger Grade 10 entrants. Recordings are available 24/7 for revision. No US-timezone late-night classes; we deliberately built India-first scheduling.',
  },
  {
    icon: Microscope,
    title: 'All 13 College Board recommended labs',
    body: 'AP Biology requires familiarity with 13 specific lab investigations (BLAST, diffusion / osmosis, photosynthesis, transpiration, fruit fly genetics, etc.). We run virtual lab simulations plus dataset analysis worksheets so Indian students — who rarely get hands-on AP labs at school — sit the exam with real lab fluency.',
  },
  {
    icon: Video,
    title: 'AP exam registration support in India',
    body: 'College Board operates 7+ AP test centers in India (Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata). Registration opens in November for the May exam. We help families register through the right center, deal with the late-registration window if applicable, and avoid the common pitfalls (school code, AP ID, accommodations).',
  },
]

const pricingTiers = {
  senior: [
    { name: 'Starter', hours: 12, price: 1800, perHour: 150, inr: '≈ ₹1.5L' },
    {
      name: 'Foundation',
      hours: 24,
      price: 3360,
      perHour: 140,
      inr: '≈ ₹2.8L',
      popular: true,
    },
    { name: 'Comprehensive', hours: 36, price: 4680, perHour: 130, inr: '≈ ₹3.9L' },
    { name: 'Elite', hours: 48, price: 5760, perHour: 120, inr: '≈ ₹4.8L' },
  ],
  junior: [
    { name: 'Trial', hours: 12, price: 900, perHour: 75, inr: '≈ ₹76,000' },
    {
      name: 'Term',
      hours: 24,
      price: 1680,
      perHour: 70,
      inr: '≈ ₹1.4L',
      popular: true,
    },
    { name: 'Year', hours: 48, price: 3360, perHour: 70, inr: '≈ ₹2.8L' },
  ],
  batch: [
    { name: 'Unit Review', hours: 16, price: 640, inr: '≈ ₹54,000' },
    {
      name: 'Semester Prep',
      hours: 24,
      price: 960,
      inr: '≈ ₹81,000',
      popular: true,
    },
    { name: 'Exam Intensive', hours: 32, price: 1280, inr: '≈ ₹1.1L' },
    { name: 'Full Year', hours: 40, price: 1600, inr: '≈ ₹1.3L' },
  ],
}

const faqs = [
  {
    question: 'Will an AP-5 in Biology help my child get into MIT, Stanford, or UC Berkeley?',
    answer:
      'A 5 on AP Biology is a strong positive signal but not a standalone admissions ticket. MIT and Stanford evaluate the entire profile — APs, SAT, essays, research, recommendations, extracurriculars. For UC Berkeley, AP-5 in Biology directly earns 8 quarter-units (one full year of college biology waived) and reads as STEM readiness, but admissions remains holistic. The honest framing: AP-5 is necessary, not sufficient, for top-tier US admissions. Pair it with research, a strong SAT (1500+), and 6–8 other APs for a competitive profile.',
  },
  {
    question: 'Is AP Biology the same as IB Higher Level Biology? Should my child do both?',
    answer:
      'AP Biology and IB Biology HL overlap roughly 75% on content (both at Campbell Biology depth) but the assessments differ. IB Biology HL is internally-assessed plus a 3-paper final exam with extended essays; AP Biology is a single 3-hour standardized exam with 50% MCQ and 50% FRQ. If your child is in an IB Diploma school, IB Biology HL is the formal coursework — adding AP Biology as a supplementary exam is uncommon and only worth it if the family wants the College Board credit signal in US admissions. For CBSE / ICSE schools, AP Biology is the more practical route since it does not require switching curriculum.',
  },
  {
    question: 'Does AP Biology credit transfer to Indian universities for pre-med or NEET?',
    answer:
      'No. Indian medical admissions — AIIMS, MAMC, JIPMER, AFMC — require a NEET-UG score. AP Biology is not accepted by any Indian medical college as a prerequisite or substitute. Indian undergraduate biology programmes (BSc Biology / Biotech at Delhi University, IISc, etc.) also do not award credit for AP scores. The AP route is specifically for US (and to a lesser extent UK, Singapore, Canadian) university admissions. If your child might return to India for medical or BSc admission, plan for NEET preparation separately — we offer a dedicated AP-to-NEET bridge programme.',
  },
  {
    question: 'Can my child take AP Biology if their school only offers CBSE or ICSE?',
    answer:
      'Yes. AP Biology is an exam, not a school subject — College Board does not require enrollment in an AP class to sit the exam. Many of our students are CBSE Class 11–12 students preparing for AP independently, alongside their board syllabus. Overlap with CBSE Class 11–12 Biology is approximately 65%, so most students do not lose much by adding AP. They register for the May AP exam through one of the 7+ College Board test centers in India.',
  },
  {
    question: 'How do we register for the AP Biology exam in India?',
    answer:
      'AP exams in India are administered at College Board-authorized centers in Delhi (American Embassy School), Mumbai (American School of Bombay), Bangalore (Indus International, Stonehill), Hyderabad (Oakridge), Chennai (American International), Pune, and Kolkata. Registration opens in November for the May exam through the College Board India portal. The exam fee is approximately US$130 (international rate). We walk families through the registration step-by-step, including the AP ID, school code, and any accommodation requests. Late registration is possible until March but at a US$40 late fee.',
  },
  {
    question: 'What is the difference between your Senior and Junior Faculty tiers?',
    answer:
      'Senior Faculty are PhD-level biology specialists with 8–15 years of AP / international curriculum teaching experience. They handle nuanced FRQ rubric coaching, USABO Semifinal-level depth, and BS/MD-track strategy. Senior Faculty 1:1 starts at $120–$150/hr. Junior Faculty are biology graduates with 2–5 years of teaching experience — strong on content delivery and practice management. Junior Faculty 1:1 is $70–$75/hr. Most families pick Senior Faculty for the AP year, or start with Junior Faculty and upgrade for the final 8-week exam push.',
  },
  {
    question:
      'Can my child do AP Biology and prepare for SAT II Biology or Olympiads simultaneously?',
    answer:
      'SAT Subject Tests, including SAT II Biology, were permanently discontinued by College Board in January 2021 and are no longer available. For the science profile, AP Biology has effectively replaced SAT II Biology in US admissions reads. For Olympiads, the natural pairing is USABO (USA Biology Olympiad) — the Open is held in early February, the Semifinal in March. AP Biology and USABO share ~80% content; we run an integrated track for students targeting both. The International Biology Olympiad (IBO) is a separate national selection process not available to non-US citizens, so USABO is participation-based for Indian students.',
  },
  {
    question: 'How early should we start? My child is in Class 9, 10, or 11.',
    answer:
      'For a Class 11 student targeting the May AP exam in their Class 11 year: start in August (10-month runway). This is the standard pace and what we recommend. For Class 10 students who want AP Biology as an early credential before the application year: a 12-month preparation starting in summer after Class 10 works well, with the exam in May of Class 11. For Class 9 students: AP Biology in Class 11 is the most strategic timing — the score is in hand before US college applications (due Oct–Nov of Class 12). Crash courses of 3–4 months are possible but limit FRQ rubric mastery and rarely produce 5-scorers.',
  },
]

// JSON-LD course schema — India-NRI hub. areaServed includes India + USA
// because the audience is Indian-resident students applying to US
// universities. inLanguage en-IN; teaching available in English + Hindi.
const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'AP Biology Coaching for Indian Students Applying to US Colleges',
  description:
    'AP Biology coaching for Indian students applying to US universities. AIIMS-trained PhD faculty, IST-evening live classes, College Board–aligned curriculum, FRQ rubric mastery, and US admissions strategy.',
  url: CANONICAL,
  inLanguage: 'en-IN',
  availableLanguage: ['English', 'Hindi'],
  educationalLevel: 'High School',
  educationalCredentialAwarded: 'AP Biology Exam Preparation',
  provider: {
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Cerebrum Biology Academy',
    url: SITE_URL,
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'South Extension',
      addressLocality: 'New Delhi',
      addressRegion: 'DL',
      addressCountry: 'IN',
    },
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'India',
    },
    {
      '@type': 'Country',
      name: 'United States',
    },
  ],
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    courseWorkload: 'PT3H',
    location: {
      '@type': 'VirtualLocation',
      url: CANONICAL,
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Senior Faculty 1:1 — 12 hours',
        price: '1800',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Senior Faculty 1:1 — 48 hours (Elite)',
        price: '5760',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Junior Faculty 1:1 — 12 hours',
        price: '900',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Small Batch (4–6 students) — 16 hours',
        price: '640',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    ],
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'AP Biology Tutoring',
      item: `${SITE_URL}/ap-biology-tutor`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'India for US College Admissions',
      item: CANONICAL,
    },
  ],
}

export default function APBiologyIndiaForUSAdmissionsPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD schemas */}
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

      {/* Hero Section */}
      <section className="relative bg-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-indigo-100/0" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fadeInUp">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/20">
              <Globe className="w-5 h-5 mr-2 text-yellow-300" aria-hidden="true" />
              For Indian students applying to US universities
            </div>

            <h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              data-speakable="title"
            >
              AP Biology Coaching for Indian Students Applying to{' '}
              <span className="text-yellow-300">US Colleges</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4 font-medium">
              AIIMS-trained PhD faculty · IST-evening live classes · AP-5 strategy + SAT prep
            </h2>

            <p
              className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto leading-relaxed"
              data-speakable="summary"
            >
              Built for CBSE, ICSE, IB, and AP-school students in India targeting Ivy League, T20,
              and UC-system universities. Live 1:1 and small-batch coaching from our South
              Extension, Delhi centre — taught entirely in IST evenings (7–10 PM) so it fits Indian
              school schedules.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="https://wa.me/918826444334?text=Hi!%20I%20am%20an%20Indian%20student%20applying%20to%20US%20colleges%20and%20want%20to%20book%20a%20FREE%20demo%20class%20for%20AP%20Biology.%20Please%20share%20available%20timings."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold shadow-xl"
                >
                  <Play className="w-5 h-5 mr-2" aria-hidden="true" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Button
                variant="outline"
                size="xl"
                onClick={async () => {
                  await trackAndOpenWhatsApp({
                    source: 'ap-biology-india-us-hero',
                    message:
                      "Hi! I'm an Indian student applying to US universities. I'd like to learn more about AP Biology coaching.",
                    campaign: 'ap-biology-india-us',
                  })
                }}
                className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-bold cursor-pointer"
              >
                <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                WhatsApp: +91 88264 44334
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {heroStats.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <metric.icon
                    className="w-8 h-8 mx-auto mb-2 text-yellow-300"
                    aria-hidden="true"
                  />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why AP Biology for Indian students */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Indian students take AP Biology for US admissions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four concrete reasons AP Biology has become the standard science line on a competitive
              Indian transcript for US universities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {whyAPReasons.map((reason) => (
              <div
                key={reason.title}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-blue-100"
              >
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <reason.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-700 leading-relaxed">{reason.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-5xl mx-auto rounded-xl bg-amber-50 border border-amber-200 p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-amber-900 mb-2 flex items-start">
              <Lightbulb
                className="w-6 h-6 mr-3 text-amber-700 flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              Honest framing
            </h3>
            <p className="text-amber-900 leading-relaxed">
              AP Biology is not a NEET preparation substitute, and AP scores are not accepted by
              Indian medical colleges (AIIMS, MAMC, AFMC). It is a US-admissions credential. If your
              child is keeping the NEET option open, plan for NEET preparation in parallel — our
              AP-to-NEET bridge programme is built for exactly that overlap.
            </p>
          </div>
        </div>
      </section>

      {/* Cities we coach in */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Cities we coach in
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Online live classes serve students nationwide; these four metros have our deepest
              feeder-school networks and the highest density of US-bound applicants.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {cityCards.map((card) => (
              <Link
                key={card.slug}
                href={`/${card.slug}`}
                className="group bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-blue-100 hover:border-blue-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {card.city}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{card.region}</p>
                  </div>
                  <School className="w-8 h-8 text-blue-600 flex-shrink-0" aria-hidden="true" />
                </div>

                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-3">
                  Feeder schools we coach
                </p>
                <ul className="space-y-2 mb-6">
                  {card.schools.map((school) => (
                    <li key={school} className="flex items-start text-sm text-gray-700">
                      <CheckCircle
                        className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{school}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center text-sm font-semibold text-blue-700 group-hover:translate-x-1 transition-transform">
                  <span>View {card.city} programme</span>
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
            School names used descriptively to indicate the student communities we serve. No
            affiliation, sponsorship, or endorsement by these schools is implied.
          </p>
        </div>
      </section>

      {/* How we coach AP Biology end-to-end */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              How we coach AP Biology end-to-end
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Campbell Biology depth, FRQ rubric mastery, weekly past-paper drills, and IST-evening
              live classes — built for Indian students who already carry a full CBSE / IB / ICSE
              load.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coachingPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-blue-100"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <pillar.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing for Indian students */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Pricing for Indian students
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent USD pricing (we sell internationally in USD). INR equivalents shown at an
              approximate rate of ₹84 / US$1 and may vary with currency movement.
            </p>
          </div>

          {/* Senior Faculty 1:1 */}
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              1:1 with Senior Faculty (PhD / AIIMS-trained)
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              $120–$150 per hour · FRQ rubric coaching · BS/MD-track strategy · 8–15 years AP
              teaching experience
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pricingTiers.senior.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-xl border bg-white p-6 transition-all hover:shadow-lg ${
                    tier.popular ? 'border-blue-600 ring-2 ring-blue-600/20' : 'border-gray-200'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}
                  <h4 className="text-lg font-bold text-gray-900">{tier.name}</h4>
                  <p className="mt-1 text-xs text-gray-500">{tier.hours} hours · 1:1</p>
                  <p className="mt-3 text-3xl font-bold text-gray-900">
                    ${tier.price.toLocaleString('en-US')}
                  </p>
                  <p className="mt-1 text-sm text-green-700 font-medium">${tier.perHour}/hour</p>
                  <p className="mt-2 text-xs text-gray-500 flex items-center">
                    <IndianRupee className="w-3 h-3 mr-1" aria-hidden="true" />
                    {tier.inr.replace('≈ ₹', '')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Junior Faculty 1:1 */}
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              1:1 with Junior Faculty
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              $70–$75 per hour · biology graduates with 2–5 years teaching experience · strong on
              content + practice management
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pricingTiers.junior.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-xl border bg-white p-6 transition-all hover:shadow-lg ${
                    tier.popular ? 'border-blue-600 ring-2 ring-blue-600/20' : 'border-gray-200'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}
                  <h4 className="text-lg font-bold text-gray-900">{tier.name}</h4>
                  <p className="mt-1 text-xs text-gray-500">{tier.hours} hours · 1:1</p>
                  <p className="mt-3 text-3xl font-bold text-gray-900">
                    ${tier.price.toLocaleString('en-US')}
                  </p>
                  <p className="mt-1 text-sm text-green-700 font-medium">${tier.perHour}/hour</p>
                  <p className="mt-2 text-xs text-gray-500 flex items-center">
                    <IndianRupee className="w-3 h-3 mr-1" aria-hidden="true" />
                    {tier.inr.replace('≈ ₹', '')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Small-Batch */}
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Small-Batch (4–6 students)
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              $40 per hour flat · group rate · same Campbell curriculum, peer-learning structure
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pricingTiers.batch.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-xl border bg-white p-6 transition-all hover:shadow-lg ${
                    tier.popular ? 'border-blue-600 ring-2 ring-blue-600/20' : 'border-gray-200'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}
                  <h4 className="text-lg font-bold text-gray-900">{tier.name}</h4>
                  <p className="mt-1 text-xs text-gray-500">{tier.hours} hours · group</p>
                  <p className="mt-3 text-3xl font-bold text-gray-900">
                    ${tier.price.toLocaleString('en-US')}
                  </p>
                  <p className="mt-1 text-sm text-green-700 font-medium">$40/hour</p>
                  <p className="mt-2 text-xs text-gray-500 flex items-center">
                    <IndianRupee className="w-3 h-3 mr-1" aria-hidden="true" />
                    {tier.inr.replace('≈ ₹', '')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Free demo card */}
          <div className="rounded-xl bg-blue-600 text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-yellow-300" aria-hidden="true" />
                Free demo class first
              </h3>
              <p className="text-sm md:text-base text-blue-50 max-w-2xl">
                Try a 60-minute diagnostic + teaching session before you commit to any package. No
                card on file. We confirm faculty match, schedule, and pricing within the same
                session.
              </p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold flex-shrink-0"
              onClick={() =>
                trackAndOpenWhatsApp({
                  source: 'ap-biology-india-us-pricing',
                  message:
                    'Hi! I would like to book a free AP Biology demo class. Please share available IST evening slots.',
                  campaign: 'ap-biology-india-us',
                })
              }
            >
              <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
              Book Free Demo on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* FAQs for Indian families */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              FAQs for Indian families
            </h2>
            <p className="text-xl text-gray-600">
              Real questions we hear from parents in Mumbai, Delhi NCR, Bangalore, Hyderabad, and
              beyond.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle
                    className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9 faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to start AP Biology preparation?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Book a free 60-minute demo class. We confirm faculty match, schedule, and pricing within
            the same session — no card, no commitment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20AP%20Biology%20demo%20class%20for%20US%20college%20admissions.%20Please%20share%20available%20IST%20evening%20timings."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                size="xl"
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold shadow-xl"
              >
                <Play className="w-5 h-5 mr-2" aria-hidden="true" />
                Book Free Demo Class
              </Button>
            </Link>

            <Link href="tel:+918826444334">
              <Button
                variant="outline"
                size="xl"
                className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-bold"
              >
                <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                Call +91 88264 44334
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>AIIMS faculty</span>
            </div>
            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>IST evenings</span>
            </div>
            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>FRQ rubric drill</span>
            </div>
            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>USD pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Related AP Biology resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/ap-biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-blue-600"
            >
              AP Biology Tutor (global hub)
            </Link>
            <Link
              href="/ap-biology-class-11"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-blue-600"
            >
              AP Biology Class 11 / Grade 11
            </Link>
            <Link
              href="/ap-biology-to-neet-preparation"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-blue-600"
            >
              AP Biology to NEET bridge
            </Link>
            <Link
              href="/ap-biology-frq-rubric-mastery"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-blue-600"
            >
              FRQ rubric mastery guide
            </Link>
            <Link
              href="/ap-biology-score-5-study-guide"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-blue-600"
            >
              Score-5 study guide
            </Link>
            <Link
              href="/ib-biology"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-blue-600"
            >
              IB Biology (HL / SL)
            </Link>
          </div>
        </div>
      </section>

      <div className="sr-only">
        <span>Trends in Indian AP Biology applicants to US universities</span>
        <span>South Extension Delhi AP Biology coaching centre</span>
        <span>TrendingUp icon hidden</span>
        <TrendingUp aria-hidden="true" />
      </div>
    </div>
  )
}
