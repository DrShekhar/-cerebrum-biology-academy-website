import {
  CheckCircle,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Monitor,
  Building2,
  Layers,
  Clock,
} from 'lucide-react'
import { LeadCaptureForm } from '@/components/landing/LeadCaptureForm'

const CAMPAIGN = 'biology-classes'

const modes = [
  {
    icon: Building2,
    title: 'Offline',
    copy: 'Classroom teaching at our four Delhi NCR centres. Face-to-face instruction, group tests, and in-person mentor meetings.',
    who: 'Delhi NCR residents within commute.',
  },
  {
    icon: Monitor,
    title: 'Online',
    copy: 'Live classes on Zoom with the same faculty, same curriculum, and recorded sessions for revision. Works from any city in India.',
    who: 'Students outside Delhi NCR or with time constraints.',
  },
  {
    icon: Layers,
    title: 'Hybrid',
    copy: 'Live lectures online; tests and mentor reviews in person at the nearest centre. Structured flexibility for senior students.',
    who: 'Board/NEET students balancing school and travel.',
  },
]

const audiences = [
  {
    title: 'Classes 9 and 10',
    note: 'CBSE/ICSE foundation. Builds the conceptual base that senior Biology and NEET depend on.',
  },
  {
    title: 'Classes 11 and 12',
    note: 'Integrated Boards plus NEET track. One curriculum covers both so you are not studying twice.',
  },
  {
    title: 'NEET Droppers',
    note: 'Intensive morning programme with weekly test series, mentor-led gap analysis, and full NCERT deep-dive.',
  },
  {
    title: 'IB / IGCSE',
    note: 'Specialist Biology support for international curricula including IA guidance and exam strategy.',
  },
]

const centres = [
  {
    city: 'South Extension, New Delhi',
    tag: 'Flagship',
    address: 'D 35, South Extension Part 2, New Delhi 110049',
    serves: 'Greater Kailash, Lajpat Nagar, Defence Colony, Saket, Vasant Vihar',
  },
  {
    city: 'Gurugram, Haryana',
    tag: 'Sector 51',
    address: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram 122018',
    serves: 'DLF Phases 1 to 5, Sohna Road, Golf Course Road, Sushant Lok',
  },
  {
    city: 'Faridabad, Haryana',
    tag: 'Sector 17',
    address: 'SCF-124-125, 2nd Floor, Above Union Bank, Huda Market, Sector 17, Faridabad',
    serves: 'Sectors 12 to 21, Neelam Chowk, NIT, Greater Faridabad',
  },
  {
    city: 'Rohini, New Delhi',
    tag: 'Sector 9',
    address: '211 Vikas Surya Tower, DC Chauk, Rohini Sector 9, Delhi 110085',
    serves: 'Rohini Sectors 1 to 25, Pitampura, Shalimar Bagh, Paschim Vihar',
  },
]

const schedule = [
  { batch: 'Class 11 (Boards + NEET)', time: 'Mon, Wed, Fri · 5:00 to 7:00 PM' },
  { batch: 'Class 12 (Boards + NEET)', time: 'Tue, Thu, Sat · 5:00 to 7:00 PM' },
  { batch: 'Dropper', time: 'Daily · 10:00 AM to 1:00 PM' },
  { batch: 'Weekend', time: 'Sat and Sun · 9:00 AM to 1:00 PM' },
]

const included = [
  'Live interactive classes',
  'Recorded lecture access',
  'Chapter-wise notes',
  'NCERT worksheets',
  'Weekly tests and analytics',
  'Daily practice problems',
  'WhatsApp doubt group',
  'Monthly parent review',
]

const faqs = [
  {
    question: 'Which classes and exams do you cover?',
    answer:
      'CBSE and ICSE Biology for Classes 9 to 12, NEET preparation for Class 11 and 12 students and droppers, and IB/IGCSE for international curricula. The Class 11 and 12 programmes are integrated; Boards and NEET are prepared together.',
  },
  {
    question: 'How do offline, online, and hybrid differ?',
    answer:
      'Offline is classroom teaching at one of our four Delhi NCR centres. Online is live interactive classes on Zoom with the same faculty and recorded replays. Hybrid is online lectures plus in-person tests and mentor meetings. Fees are close across modes; choose by logistics, not by quality.',
  },
  {
    question: 'Where are your offline centres?',
    answer:
      'Four campuses: South Extension Part 2 in New Delhi (flagship), Rohini Sector 9, Gurugram Sector 51 (M2K Corporate Park, Mayfield Garden), and Faridabad Sector 17 (Huda Market). All four run Board, NEET, and dropper batches.',
  },
  {
    question: 'What are the class timings?',
    answer:
      'Class 11 runs Mon/Wed/Fri 5 to 7 PM. Class 12 runs Tue/Thu/Sat 5 to 7 PM. Droppers are daily 10 AM to 1 PM. Weekend batch is Sat and Sun 9 AM to 1 PM. Online students in other timezones can request schedule accommodation.',
  },
  {
    question: 'Are online classes as effective as offline?',
    answer:
      'Our Board pass rate and NEET selection rate are consistent across online and offline. The faculty, curriculum, test series, and mentor support are identical. Online students save commute time; offline students benefit from peer focus.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Group online batches start at ₹60,000 per year. Offline batches start at ₹80,000 per year. Dropper and one-on-one packages cost more. Exact fees depend on class level and batch; ask on the form above for a written quote.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

const educationalOrgSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy',
  url: 'https://cerebrumbiologyacademy.com',
  telephone: '+91-88264-44334',
  description:
    'Biology classes for NEET, CBSE/ICSE Boards (Classes 9-12), and droppers. Offline centres in Delhi NCR plus online and hybrid options.',
  location: centres.map((c) => ({
    '@type': 'Place',
    name: `Cerebrum Biology Academy, ${c.city}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.address,
      addressLocality: c.city.split(',')[0].trim(),
      addressCountry: 'IN',
    },
    telephone: '+91-88264-44334',
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
      name: 'Biology Classes',
      item: 'https://cerebrumbiologyacademy.com/biology-classes',
    },
  ],
}

export default function BiologyClassesPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-5 lg:items-start">
            <div className="lg:col-span-3">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                <GraduationCap className="h-3.5 w-3.5 text-emerald-400" />
                NEET · Boards 9 to 12 · Droppers · IB/IGCSE
              </div>

              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Biology classes for NEET and Boards.
                <br />
                <span className="text-emerald-400">Online, offline, or hybrid.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                Offline centres at South Extension (New Delhi), Gurugram Sector 51, Faridabad Sector
                17, and Rohini. Live online classes from anywhere in India. AIIMS-trained faculty,
                batches of fifteen to twenty.
              </p>

              <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-400">Success rate</dt>
                  <dd className="mt-1 text-2xl font-semibold text-white">98%</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-400">AIIMS selects</dt>
                  <dd className="mt-1 text-2xl font-semibold text-white">67+</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-400">
                    Students taught
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-white">10,000+</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-2">
              <LeadCaptureForm
                source="hero"
                campaign={CAMPAIGN}
                heading="Book a free demo"
                subheading="We reach out within fifteen minutes during working hours."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modes */}
      <section className="border-b border-slate-200 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Three ways to study with us.
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Same faculty, same curriculum, same test series across all three modes. Pick the
              format that fits your commute and schedule.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {modes.map((mode) => (
              <div
                key={mode.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-emerald-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <mode.icon className="h-5 w-5 text-emerald-700" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{mode.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{mode.copy}</p>
                <p className="mt-4 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">Best for:</span> {mode.who}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="border-b border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Who we teach.
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              From Class 9 foundation to NEET dropper score-recovery, and IB/IGCSE Biology for
              international students.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-base font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{a.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Centres */}
      <section className="border-b border-slate-200 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Four centres in Delhi NCR.
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              All four centres run Board, NEET, and dropper batches. Call ahead to schedule a trial
              class in person.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {centres.map((c) => (
              <div key={c.city} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" />
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-base font-semibold text-slate-900">{c.city}</h3>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                        {c.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-700">{c.address}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      <span className="font-medium text-slate-600">Catchment:</span> {c.serves}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule + included */}
      <section className="border-b border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                Current batches.
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Seats refresh each term. Ask for live availability on the form.
              </p>
              <ul className="mt-8 space-y-3">
                {schedule.map((s) => (
                  <li
                    key={s.batch}
                    className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{s.batch}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                        <Clock className="h-3.5 w-3.5" />
                        {s.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                What you get in every batch.
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Consistent across offline, online, and hybrid.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-3">
                {included.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                    <span className="text-sm text-slate-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-200 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Frequently asked.
          </h2>

          <div className="mt-8 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-white p-5 open:border-emerald-300"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
                  <span className="mt-0.5 text-slate-400 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing form */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Start with a free demo.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                No commitment. Fill the form and we reach out on WhatsApp or by phone within fifteen
                minutes during working hours.
              </p>
              <p className="mt-6 text-sm text-slate-400">
                Prefer to call directly?{' '}
                <a className="underline hover:text-white" href="tel:+918826444334">
                  +91 88264 44334
                </a>
              </p>
            </div>
            <div className="lg:col-span-3">
              <LeadCaptureForm
                source="final-cta"
                campaign={CAMPAIGN}
                heading="Book your demo class"
                subheading="Same form, same promise."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Legal footer */}
      <section className="bg-white py-6">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-slate-400" />
            Your information is handled per our Privacy Policy.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
            <a href="/privacy-policy" className="underline hover:text-slate-900">
              Privacy
            </a>
            <a href="/terms-of-service" className="underline hover:text-slate-900">
              Terms
            </a>
            <a href="/contact" className="underline hover:text-slate-900">
              Contact
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
