import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  BookOpen,
  Clock,
  FlaskConical,
  GraduationCap,
  Microscope,
  Target,
  Users,
} from 'lucide-react'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { SpeakableSchema } from '@/components/seo/SpeakableSchema'
import { olympiadCourseSchema } from '@/data/olympiads/schema-helpers'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ocsc-orientation-cum-selection-camp-prep'

export const metadata: Metadata = {
  title: 'OCSC Preparation | HBCSE Selection Camp for India IBO Team',
  description:
    'OCSC orientation cum selection camp preparation. HBCSE Mumbai 2-3 week residential camp, top 35 INBO qualifiers, top 4 to India IBO team. Theory + practical coaching.',
  keywords: [
    'OCSC orientation cum selection camp',
    'OCSC HBCSE',
    'OCSC IBO team selection',
    'OCSC training camp preparation',
    'HBCSE Mumbai biology camp',
    'OCSC biology practical preparation',
    'India biology olympiad stage 3',
    'OCSC past papers',
    'OCSC theory practical exam',
    'biology olympiad selection camp India',
    'OCSC microscopy preparation',
    'OCSC dissection skills training',
    'HBCSE biology selection camp',
    'OCSC cutoff India IBO',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en-IN': PAGE_URL,
      en: PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'OCSC Preparation — HBCSE Selection Camp for India IBO Team',
    description:
      'Stage 3 of the India IBO pathway. HBCSE Mumbai residential camp. Theory + practical coaching from a biology-only specialist faculty.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OCSC Preparation — Cerebrum Biology Academy',
    description:
      'HBCSE OCSC Stage 3 camp coaching: theory + practical for India IBO team selection.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const dailySchedule = [
  {
    block: '9:00 AM - 1:00 PM',
    title: 'Theory lectures',
    body: 'University-introductory-biology+ depth across cell biology, biochemistry, molecular biology, genetics, plant and animal physiology, and ecology. Lectures are delivered by HBCSE faculty and visiting scientists. Topics are drawn from Campbell Biology, Alberts Molecular Biology of the Cell, Lehninger Principles of Biochemistry, and Raven Biology — i.e., the canonical IBO reading list.',
  },
  {
    block: '2:00 PM - 6:00 PM',
    title: 'Laboratory work',
    body: 'Heavy emphasis on practical biology — microscopy, biochemical assays, anatomical dissections, molecular biology techniques, plant and animal physiology experiments. Practical work mirrors IBO practical-round demands: timed, technique-graded, and scored on both procedural accuracy and the ability to interpret experimental results.',
  },
  {
    block: '7:00 PM - 9:00 PM',
    title: 'Problem-solving and past-paper analysis',
    body: 'IBO-level data-interpretation problems, past OCSC theory papers, and novel research-paper extracts where students must read, summarise, and extract experimental conclusions. This session builds the analytical stamina required for OCSC and (for the top 4) for IBO itself.',
  },
]

const practicalCategories = [
  {
    icon: Microscope,
    title: 'Microscopy under time pressure',
    body: 'Identification of tissues, cells, organelles, and developmental stages from prepared and fresh slides. Students draw labelled diagrams, calibrate magnification, and identify novel preparations with no prior cue. Speed and accuracy are scored separately.',
  },
  {
    icon: FlaskConical,
    title: 'Biochemical assays',
    body: 'Buffer preparation, spectrophotometry, enzyme kinetics (Michaelis-Menten plots from raw data), protein quantification, paper and thin-layer chromatography. Students must design assay sequences from a problem statement, not just execute a recipe.',
  },
  {
    icon: BookOpen,
    title: 'Anatomical dissections',
    body: 'Comparative invertebrate and vertebrate dissections (ethical equivalents and approved specimens). Most Indian school curricula stop at frog and earthworm at NCERT level — OCSC expects clean dissection of structures not introduced in school biology.',
  },
  {
    icon: GraduationCap,
    title: 'Molecular biology techniques',
    body: 'Gel electrophoresis interpretation, restriction-map analysis, PCR design logic, basic bioinformatics (BLAST output reading, phylogenetic tree construction from sequence data).',
  },
  {
    icon: Target,
    title: 'Ecology and field-data analysis',
    body: 'Population sampling statistics, mark-recapture problems, niche-overlap calculations, and graph-based interpretation of community ecology data. Often combined with applied data tables in research-paper format.',
  },
  {
    icon: Award,
    title: 'Research-paper interpretation',
    body: 'Novel experimental data in figure-and-table format. Students must read, identify the hypothesis, evaluate the methods, and answer follow-up questions — the closest the camp comes to an actual scientist workflow.',
  },
]

const struggles = [
  {
    title: 'Practical microscopy under time pressure',
    body: 'Most Indian schools do not provide consistent microscope access. Students arrive at OCSC able to recite microscope parts but unable to obtain a clean focused image of an unknown specimen in under 5 minutes. We address this with a 12-week structured microscopy programme using virtual lab simulations plus equipment we ship to enrolled students for home practice.',
  },
  {
    title: 'Biochemical assay design and interpretation',
    body: 'NSEB and INBO test recall and reasoning; OCSC tests design. A typical OCSC question: "Given this enzyme and these reagents, design an assay to measure its activity and predict the result." Students who only studied for INBO recall are blindsided. Our Cerebrum module on assay design uses 30+ historical experiments to build this design intuition.',
  },
  {
    title: 'Ecology field-data analysis',
    body: 'OCSC ecology blocks regularly use real field data — quadrat sampling, mark-recapture, transect data with measurement noise. Students must apply Lincoln-Petersen estimators, calculate Shannon diversity, and interpret rarefaction curves. This is at the level of an undergraduate ecology lab course, not a high-school chapter.',
  },
  {
    title: 'Dissection skills',
    body: 'Most NCERT-only students have never performed a real dissection beyond chart memorisation. OCSC dissection blocks demand clean, identifiable preparations under examination conditions. Our practical-skills module pairs virtual dissection simulations with senior-tutor video walkthroughs to build the muscle memory before the camp.',
  },
  {
    title: 'Novel research-paper data',
    body: 'OCSC questions often include excerpts from primary research papers — sometimes from journals such as Nature, Cell, or PNAS. Students must read the figure, identify the control, and interpret the result. Cerebrum runs a weekly research-paper club for INBO-qualified students to build this skill in the months before OCSC.',
  },
]

const coachingPillars = [
  {
    icon: Microscope,
    title: 'Virtual lab simulations and home equipment',
    body: 'Cerebrum supplies enrolled OCSC candidates with a structured 12-week practical-skills programme built on virtual lab platforms plus home-deliverable kit modules where feasible. Students arrive at the HBCSE camp confident with the practical workflow.',
  },
  {
    icon: BookOpen,
    title: 'Past OCSC paper analysis',
    body: 'We maintain an internal archive of OCSC-style problems and publicly available HBCSE past-camp materials. Sessions walk through complete problem sets, dissect what the examiner was probing, and build a question-pattern repertoire.',
  },
  {
    icon: Users,
    title: '1:1 mentorship with former INBO qualifiers',
    body: 'Each OCSC-stream student is paired with a senior olympiad tutor — often a former INBO qualifier or HBCSE-trained mentor — for personalised pre-camp coaching. The mentor remains assigned through the camp itself, including pre-session prep on the day.',
  },
  {
    icon: GraduationCap,
    title: 'Faculty led by Dr. Shekhar C Singh (AIIMS Delhi)',
    body: 'OCSC stream curriculum is architected by Dr. Shekhar C Singh, AIIMS Delhi alumnus and founder of Cerebrum Biology Academy. Senior olympiad tutors with HBCSE training-camp experience deliver the practical sessions and 1:1 mentoring.',
  },
]

const postOCSC = [
  {
    title: 'Top 4 → India IBO team',
    body: 'The four highest combined-score students enter intensive IBO-specific preparation under HBCSE supervision. This phase, between June and July, includes IBO-format mock practical exams, problem-solving sessions in the four IBO domains (biochemistry, plant biology, animal biology, bioinformatics and ecology), and final-stage technique drills.',
  },
  {
    title: 'Bottom 31 → certificates of merit',
    body: 'OCSC attendees who do not enter the top 4 receive HBCSE certificates of merit. This is a nationally recognised credential. For undergraduate applications, it functions similarly to a KVPY-style profile signal — useful for top-tier Indian colleges (IISER, IISc, top Central Universities, integrated M.Sc. programmes at IITs) and for international universities (US, UK, Singapore) evaluating Indian applicants.',
  },
  {
    title: 'Continued Cerebrum support',
    body: 'Students returning from OCSC — whether selected for IBO or not — continue with the same Cerebrum mentor for whatever comes next: NEET preparation, KVPY-style profile building, undergraduate research applications, or international university essays. The biology specialist who walked you through NSEB → INBO → OCSC continues with you.',
  },
]

const faqs = [
  {
    question: 'What is OCSC and where is it held?',
    answer:
      'OCSC stands for Orientation cum Selection Camp. It is the third stage of the India biology olympiad pathway, conducted by HBCSE (Homi Bhabha Centre for Science Education) at its Mumbai campus. Roughly 35 students who qualify INBO are invited to the residential camp, which runs for approximately 2 to 3 weeks. The top 4 students from OCSC are selected for the India IBO team.',
  },
  {
    question: 'What is the OCSC pass rate?',
    answer:
      'Of the approximately 35 students who attend OCSC, only 4 are selected for the India IBO team — a selection rate of about 11 percent. The remaining 31 receive certificates of merit from HBCSE, which is itself a strong national credential for college applications and research internships.',
  },
  {
    question: 'How long is the OCSC camp?',
    answer:
      'OCSC typically runs for 2 to 3 weeks. The exact length varies year to year and is set by HBCSE. The schedule is intensive — most days run from 9 AM to 9 PM with theory in the morning, practical work in the afternoon, and problem-solving plus past-paper analysis in the evening.',
  },
  {
    question: 'Can I attend OCSC without qualifying INBO?',
    answer:
      'No. OCSC attendance is strictly limited to students who have qualified INBO (Stage 2 of the India biology olympiad pathway). The HBCSE invites approximately the top 35 INBO scorers nationally. There is no separate entry route to OCSC.',
  },
  {
    question: 'What is the OCSC fee?',
    answer:
      'HBCSE covers attendance costs for OCSC itself — students invited to the camp do not pay HBCSE a separate fee. Cerebrum coaching fees for OCSC-stream preparation are separate and form part of the Complete Olympiad Year programme or can be opted as a 1:1 Elite Mentoring add-on.',
  },
  {
    question: 'Is OCSC conducted in English or Hindi?',
    answer:
      'The OCSC examination papers are bilingual — students can attempt in English or Hindi. Lectures and practical instructions are typically conducted in English, since the canonical reading list (Campbell, Alberts, Lehninger) is in English and the IBO itself is conducted in English. Students who are more comfortable in Hindi can still write theory papers in Hindi.',
  },
  {
    question: 'When does OCSC happen relative to INBO?',
    answer:
      'INBO is typically held in late January or February. Results are usually announced within a few weeks. OCSC is generally held in May or June — giving students roughly 3 months between the INBO result and the start of the camp. This 3-month window is when targeted OCSC-stream coaching is most valuable.',
  },
  {
    question: 'What does OCSC preparation coaching cost?',
    answer:
      'Complete Olympiad Year (covers NSEB, INBO, and OCSC stream preparation): $4,500 per year equivalent in INR — local currency equivalents are shown to visitors based on geo-location. 1:1 Elite Mentoring with a senior olympiad tutor: $90 per hour. Small-Batch Weekend programme: $50 per hour.',
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

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'OCSC Preparation — Orientation cum Selection Camp for India IBO Team',
  description:
    'A complete guide to the HBCSE Orientation cum Selection Camp (OCSC), Stage 3 of the India biology olympiad pathway. Structure, daily schedule, practical-skills emphasis, selection criteria, and Cerebrum coaching approach.',
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  inLanguage: 'en-IN',
  availableLanguage: ['English', 'Hindi'],
  author: {
    '@type': 'Person',
    '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh#nseb',
    name: 'Dr. Shekhar C Singh',
    jobTitle: 'Founder & Lead Olympiad Coach',
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
  },
  publisher: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  about: 'OCSC - Orientation cum Selection Camp - HBCSE biology olympiad selection',
}

const courseSchema = olympiadCourseSchema({
  name: 'OCSC Stream Preparation Programme',
  description:
    'OCSC orientation cum selection camp preparation. Stage 3 of the India IBO pathway — theory and practical coaching aimed at the HBCSE Mumbai residential camp.',
  url: PAGE_URL,
  about: 'OCSC - HBCSE Orientation cum Selection Camp',
  areaServed: { type: 'Country', name: 'India' },
  inLanguage: 'en-IN',
  audienceDescription: 'INBO qualifiers preparing for the HBCSE OCSC selection camp',
  teaches: [
    'Practical microscopy under time pressure',
    'Biochemical assay design and interpretation',
    'Anatomical dissection technique',
    'Molecular biology techniques',
    'Ecology and field-data analysis',
    'Research-paper interpretation',
    'IBO-level theory across Campbell, Alberts, and Lehninger',
  ],
})

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh#nseb',
  name: 'Dr. Shekhar C Singh',
  jobTitle: 'Founder & Lead Olympiad Coach',
  description:
    'AIIMS Delhi alumnus and founder of Cerebrum Biology Academy. Lead curriculum architect for the Indian biology olympiad pathway — NSEB (Stage 1), INBO (Stage 2), OCSC (Stage 3), and India IBO team selection — under the IAPT and HBCSE framework.',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'All India Institute of Medical Sciences (AIIMS Delhi)',
  },
  worksFor: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  knowsAbout: [
    'OCSC',
    'Orientation cum Selection Camp',
    'HBCSE biology olympiad',
    'India IBO team selection',
    'OCSC practical preparation',
    'OCSC microscopy',
    'OCSC biochemical assays',
    'OCSC past papers',
    'NSEB',
    'INBO',
    'Campbell Biology for OCSC',
    'Alberts Molecular Biology of the Cell',
    'Lehninger Principles of Biochemistry',
  ],
  sameAs: [
    'https://cerebrumbiologyacademy.com/dr-shekhar-singh',
    'https://www.youtube.com/@drshekharcsingh',
    'https://www.linkedin.com/in/drshekharsingh',
  ],
}

const whatsappMessage = encodeURIComponent(
  'Hi Cerebrum, I have qualified INBO (or am targeting OCSC) and would like details on the OCSC preparation programme. Please share the structure and pricing.'
)

export default function OCSCPreparationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { label: 'Biology Olympiads', href: '/biology-olympiads' },
          { label: 'OCSC Preparation', isCurrentPage: true },
        ]}
        showSchemaOnly
      />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />
      <SpeakableSchema
        headline="OCSC — Orientation cum Selection Camp Preparation"
        description="Stage 3 of the India IBO pathway. HBCSE Mumbai residential camp covering theory and practical biology, with the top 4 selected for the India IBO team."
        cssSelectors={['[data-speakable="intro"]', '[data-speakable="key-info"]']}
        url={PAGE_URL}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-green-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-24">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                <Target className="h-3.5 w-3.5 text-green-400" />
                Stage 3 · OCSC · HBCSE Mumbai · 2-3 week residential
              </div>

              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                OCSC — Orientation cum Selection Camp Preparation.
              </h1>

              <p
                data-speakable="intro"
                className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300"
              >
                The top approximately 35 INBO qualifiers from across India attend a 2-3 week
                residential camp at HBCSE Mumbai. The top 4 are selected for the India IBO team.
                Cerebrum coaches the gap between INBO and OCSC — practical skills, IBO-level theory
                depth, and the analytical stamina the camp demands.
              </p>

              <div
                data-speakable="key-info"
                className="mt-10 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8"
              >
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">Attendees</p>
                  <p className="mt-1 text-2xl font-semibold text-white">~35</p>
                  <p className="text-xs text-slate-500">from INBO qualifiers</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">Selected</p>
                  <p className="mt-1 text-2xl font-semibold text-white">Top 4</p>
                  <p className="text-xs text-slate-500">to India IBO team</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">Camp length</p>
                  <p className="mt-1 text-2xl font-semibold text-white">2-3 wk</p>
                  <p className="text-xs text-slate-500">residential at HBCSE</p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/918826444334?text=${whatsappMessage}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white hover:bg-green-600"
                >
                  WhatsApp for OCSC programme details
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/inbo-coaching"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  INBO Stage 2 coaching
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What is OCSC */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              What is OCSC?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                OCSC (Orientation cum Selection Camp) is the third stage of the India biology
                olympiad pathway. It is organised and conducted by HBCSE — the Homi Bhabha Centre
                for Science Education in Mumbai — which is the national resource centre for science
                and mathematics olympiads under the Department of Atomic Energy and the Tata
                Institute of Fundamental Research.
              </p>
              <p>
                Approximately 35 students who qualify INBO (the Indian National Biology Olympiad,
                Stage 2) are invited to a residential camp at the HBCSE Mumbai campus. The camp
                typically runs for 2 to 3 weeks. The schedule is intensive, the depth is at
                university-introductory-biology+ level (significantly beyond NSEB or even INBO), and
                the selection is unambiguous: at the end of the camp, four students are announced as
                the India team for the International Biology Olympiad (IBO).
              </p>
              <p>
                Selection at OCSC is based on combined theory and practical scores. The practical
                weight matters — the IBO itself allocates roughly 40 to 50 percent of its medal
                points to the practical examination, so OCSC mirrors that emphasis. A student who
                aces theory but cannot perform clean microscopy or design a biochemical assay will
                not make the top 4.
              </p>
              <p>
                For students whose goal is the India IBO team, OCSC is the decisive stage. For
                students who reach OCSC but do not make the top 4, the credential itself is
                significant — about 31 students each year receive HBCSE certificates of merit from
                OCSC, and the credential carries weight at top Indian universities (IISER, IISc,
                integrated M.Sc. programmes at IITs) and for international university applications.
              </p>
            </div>
          </div>
        </section>

        {/* Structure */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              OCSC structure — theory plus heavy practical.
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-600">
              OCSC mirrors the IBO format — roughly half theory, half practical — because its
              purpose is to identify the 4 students best prepared to represent India at the
              international olympiad. Practical biology is approximately 40 percent of IBO total
              weight, and the camp examination structure reflects this.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-semibold text-slate-900">Theory deep-dives</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Theory lectures and examinations are pitched at university-introductory-biology+
                  level — closer to a strong first-year undergraduate biology course than to NCERT
                  Class 12. The canonical reading list spans Campbell Biology (11th or 12th edition)
                  for breadth, Alberts Molecular Biology of the Cell for cell and molecular biology
                  depth, Lehninger Principles of Biochemistry for biochemistry, and Raven Biology
                  for plant biology. Specific INBO and OCSC questions over the years have been
                  traceable to material in these four references.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-semibold text-slate-900">Practical biology</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Practical sessions cover microscopy (tissue and cell identification, organelle
                  identification, calibrated measurement), biochemical assays (buffer prep,
                  spectrophotometry, enzyme kinetics, chromatography), anatomical dissections
                  (invertebrate and approved vertebrate specimens), molecular biology techniques
                  (gel interpretation, restriction mapping, bioinformatics), plant and animal
                  physiology experiments, and field-data ecology analysis. Each practical block is
                  examined under timed, examiner-graded conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Daily schedule */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              A typical day at OCSC.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              The camp schedule is intense by design. A representative day looks like this — though
              the exact schedule varies year to year and is set by HBCSE.
            </p>

            <div className="mt-10 space-y-4">
              {dailySchedule.map((slot) => (
                <div key={slot.block} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900">{slot.title}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-700">
                      <Clock className="h-3 w-3" />
                      {slot.block}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{slot.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practical categories */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              The six practical-skills clusters at OCSC.
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-600">
              Practical work at OCSC is structured into six broad skill clusters. Each cluster has
              dedicated lab sessions and is examined separately. The combined practical score is
              weighted alongside theory to determine the top 4.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {practicalCategories.map((c) => (
                <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <c.icon className="h-5 w-5 text-green-700" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Selection criteria */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Selection criteria — how the top 4 are chosen.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Selection at OCSC is based on combined scores across theory and practical
                examinations. The combination is weighted to reflect IBO emphasis — practical
                performance counts significantly, not just theory recall.
              </p>
              <p>
                Theory questions at OCSC are at IBO-level difficulty, which is markedly harder than
                NSEB (Stage 1, MCQ recall and reasoning) and even than INBO (Stage 2, theory-only).
                A typical OCSC theory question is multi-part, requires integration across topics
                (e.g., a single question that draws on cell signalling plus enzyme kinetics plus
                developmental biology), and rewards depth of explanation in addition to the correct
                answer.
              </p>
              <p>
                Practical examinations are graded on procedural accuracy (did you perform the
                technique correctly?), result quality (was your specimen identifiable and your
                drawing labelled correctly?), and interpretation (could you reason about what your
                result meant?). Speed under time pressure is a separate component — most practical
                blocks impose a strict per-station time limit.
              </p>
              <p>
                The four students with the highest combined theory and practical scores are
                announced as the India IBO team at the end of the camp. There is no separate
                interview, and the announcement is based purely on examined performance.
              </p>
            </div>
          </div>
        </section>

        {/* What students struggle with */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              What students actually struggle with at OCSC.
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-600">
              Across years of working with INBO qualifiers, five recurring pain points show up at
              OCSC. Each is addressable with targeted pre-camp coaching during the 3-month INBO to
              OCSC window.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {struggles.map((s) => (
                <div key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Cerebrum coaches OCSC depth */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              How Cerebrum coaches OCSC-level depth.
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-600">
              Most general olympiad-prep providers stop at INBO. Cerebrum runs a dedicated OCSC
              stream — targeted at the 3-month window between INBO results and the HBCSE camp. Four
              coaching pillars:
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {coachingPillars.map((p) => (
                <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <p.icon className="h-5 w-5 text-green-700" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OCSC timeline */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              OCSC timeline within the India IBO pathway.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                OCSC sits in a tight calendar window between INBO and IBO. The typical year looks
                like this:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>November:</strong> NSEB exam, conducted by IAPT.
                </li>
                <li>
                  <strong>January or February:</strong> INBO exam, conducted by HBCSE. Approximately
                  the top 35 NSEB qualifiers from a national field of ~300-500 INBO eligibles are
                  selected.
                </li>
                <li>
                  <strong>March to April:</strong> INBO results, OCSC invitation letters sent out.
                  This is when the 3-month OCSC pre-camp coaching window opens.
                </li>
                <li>
                  <strong>May or June:</strong> OCSC residential camp at HBCSE Mumbai. 2-3 weeks of
                  theory plus practical. India IBO team announced at the end of the camp.
                </li>
                <li>
                  <strong>June to July:</strong> Top 4 enter intensive IBO-specific preparation
                  under HBCSE supervision.
                </li>
                <li>
                  <strong>July:</strong> IBO held internationally (location varies each year, ~80
                  countries participating).
                </li>
              </ul>
              <p>
                The most productive pre-OCSC coaching window is March to early May — once INBO
                results are known and the OCSC invitation is confirmed. This is when 1:1 elite
                mentoring and practical-skills training have the highest leverage.
              </p>
            </div>
          </div>
        </section>

        {/* What happens after OCSC */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              What happens after OCSC.
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-600">
              Reaching OCSC is itself a national-level credential. Three different post-OCSC paths
              open up depending on the final selection.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {postOCSC.map((p) => (
                <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="text-base font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              OCSC stream — programme pricing.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              USD reference pricing below. For students based in India, INR equivalents are quoted
              by the admissions team based on current rates. We do not publish a static INR figure
              because the conversion fluctuates.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-green-300 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Recommended
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  Complete Olympiad Year
                </h3>
                <p className="mt-2 text-2xl font-bold text-slate-900">$4,500 / year</p>
                <p className="mt-2 text-xs text-slate-500">equivalent in INR for Indian students</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Full coverage: NSEB Stage 1 + INBO Stage 2 + OCSC Stage 3 preparation. Same mentor
                  through all three stages.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Most targeted
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">1:1 Elite Mentoring</h3>
                <p className="mt-2 text-2xl font-bold text-slate-900">$90 / hour</p>
                <p className="mt-2 text-xs text-slate-500">senior olympiad tutor, 1:1</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Best for INBO qualifiers in the 3-month pre-OCSC window who want fully customised
                  practical-skills and theory coaching.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Group rate
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">Small-Batch Weekend</h3>
                <p className="mt-2 text-2xl font-bold text-slate-900">$50 / hour</p>
                <p className="mt-2 text-xs text-slate-500">4-6 students, weekends</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Weekend small-group programme for INBO qualifiers balancing school with pre-OCSC
                  preparation.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/918826444334?text=${whatsappMessage}`}
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white hover:bg-green-600"
              >
                WhatsApp for INR pricing
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              OCSC FAQ.
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-slate-200 bg-white p-5 open:border-green-300"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
                    <span className="mt-0.5 text-slate-400 group-open:rotate-180 transition-transform">
                      &#9662;
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-link footer */}
        <section className="bg-slate-950 py-14 md:py-20 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Explore the India biology olympiad pathway.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Cerebrum coaches every stage of the funnel with the same biology-only specialist
              faculty.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/nseb-coaching"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                NSEB Stage 1 coaching
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/inbo-coaching"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                INBO Stage 2 coaching
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ibo-preparation"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                International IBO stage
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
