/**
 * /brain-bee-neuroanatomy-guide
 *
 * Informational reference page (Jun 2026) — the neuroanatomy a Brain Bee
 * competitor must know for the practical round (typically one of the most
 * heavily weighted). Genuinely educational reference content: cerebral lobes
 * & cortical areas, limbic system, basal ganglia, thalamus/hypothalamus,
 * brainstem, cerebellum, ventricles, Circle of Willis, cranial nerves, key
 * tracts, and how the round is tested on brains/atlases/MRI.
 * Cross-links /brain-bee-coaching and /brain-bee-study-guide.
 *
 * HONESTY: weighting "varies year to year" — never stated as a fixed rule.
 * Independent reference; not affiliated with the official Brain Bee / IBB /
 * Society for Neuroscience. Brain Facts book + IYNA bootcamp are free.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Brain,
  ChevronRight,
  Eye,
  Home,
  Layers,
  MessageCircle,
  Microscope,
  Network,
  Target,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/brain-bee-neuroanatomy-guide'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Brain Bee Neuroanatomy Guide — Every Structure You Must Know',
  description:
    'The neuroanatomy a Brain Bee competitor must know for the practical round: cerebral lobes and cortical areas, the limbic system, basal ganglia, thalamus and hypothalamus, brainstem, cerebellum, ventricles, the Circle of Willis, the 12 cranial nerves, and key tracts — plus how each is tested on real brains, atlases and MRI. A free, educational reference for students aged 13-19.',
  keywords: [
    'brain bee neuroanatomy',
    'brain bee neuroanatomy guide',
    'neuroanatomy for brain bee',
    'brain structures brain bee',
    'cerebral lobes',
    'limbic system',
    'basal ganglia',
    'thalamus hypothalamus',
    'brainstem anatomy',
    'cerebellum',
    'circle of willis',
    'cranial nerves',
    'white matter tracts',
    'ventricles of the brain',
    'brain bee practical round',
    'identify brain structures MRI',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      'en-US': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'Brain Bee Neuroanatomy Guide — Every Structure You Must Know',
    description:
      'A reference for the Brain Bee neuroanatomy practical: lobes, limbic system, basal ganglia, thalamus, brainstem, cerebellum, ventricles, Circle of Willis, cranial nerves and key tracts — and how each is tested.',
    url: PAGE_URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Brain Bee Neuroanatomy Guide — Every Structure You Must Know',
    description:
      'Lobes, limbic system, basal ganglia, thalamus, brainstem, cerebellum, ventricles, Circle of Willis, cranial nerves and key tracts — the neuroanatomy the Brain Bee practical round tests.',
  },
  robots: 'index, follow, max-image-preview:large',
}

// Each region: what it is, the structures to identify, and the function/clinical
// hook that helps the structure stick (and which feeds the patient-diagnosis
// round). Content is standard, factual neuroanatomy.
const REGIONS = [
  {
    icon: Layers,
    title: 'Cerebral lobes & cortical areas',
    structures: [
      'Frontal lobe — primary motor cortex (precentral gyrus), prefrontal cortex, Broca’s area',
      'Parietal lobe — primary somatosensory cortex (postcentral gyrus)',
      'Temporal lobe — primary auditory cortex, Wernicke’s area',
      'Occipital lobe — primary visual cortex (calcarine sulcus)',
      'Landmarks: central sulcus, lateral (Sylvian) fissure, longitudinal fissure, insula',
    ],
    hook: 'Know the lobe boundaries and which gyrus does what. Broca’s (frontal) is speech production; Wernicke’s (temporal) is comprehension — a classic patient-diagnosis pairing.',
  },
  {
    icon: Brain,
    title: 'Limbic system',
    structures: [
      'Hippocampus — memory consolidation',
      'Amygdala — emotion, fear processing',
      'Cingulate gyrus',
      'Fornix (the main hippocampal output tract)',
      'Mammillary bodies',
    ],
    hook: 'The emotion-and-memory ring around the brainstem. Hippocampal damage links to amnesia (and Alzheimer’s); the amygdala to fear and emotional learning.',
  },
  {
    icon: Network,
    title: 'Basal ganglia',
    structures: [
      'Caudate nucleus',
      'Putamen',
      'Globus pallidus (caudate + putamen = striatum; putamen + globus pallidus = lentiform nucleus)',
      'Subthalamic nucleus',
      'Substantia nigra (in the midbrain)',
    ],
    hook: 'Deep grey-matter nuclei that tune movement. Substantia nigra degeneration causes Parkinson’s; striatal loss is seen in Huntington’s — both high-value for patient diagnosis.',
  },
  {
    icon: Network,
    title: 'Thalamus & hypothalamus',
    structures: [
      'Thalamus — the sensory relay (all sensory pathways except smell synapse here)',
      'Hypothalamus — homeostasis, autonomic control, hormone release',
      'Pituitary gland (via the infundibulum)',
      'Pineal gland (melatonin / circadian rhythm)',
    ],
    hook: 'The diencephalon. Thalamus = the gateway to the cortex; hypothalamus = the master regulator of temperature, hunger, thirst, sleep and the endocrine system.',
  },
  {
    icon: Brain,
    title: 'Brainstem',
    structures: [
      'Midbrain — cerebral peduncles, colliculi (superior = vision reflexes, inferior = hearing), substantia nigra',
      'Pons — connects to the cerebellum; origin of several cranial nerves',
      'Medulla oblongata — pyramids (decussation), cardiorespiratory centres',
      'Reticular formation (arousal and consciousness)',
    ],
    hook: 'Small but vital — it carries the long tracts and houses the centres that keep you breathing. Most cranial nerves emerge here; the motor decussation is in the medulla.',
  },
  {
    icon: Network,
    title: 'Cerebellum',
    structures: [
      'Cerebellar hemispheres and the vermis',
      'Cerebellar peduncles (superior, middle, inferior) — connect to the brainstem',
      'Cortical layers (molecular, Purkinje, granular) — a histology favourite',
    ],
    hook: 'Coordinates movement, balance and motor learning — it does not initiate movement. Damage causes ataxia and intention tremor, not paralysis.',
  },
  {
    icon: Eye,
    title: 'Ventricles & meninges',
    structures: [
      'Lateral ventricles (one per hemisphere)',
      'Third ventricle (between the thalami)',
      'Cerebral aqueduct → fourth ventricle (between brainstem and cerebellum)',
      'Choroid plexus (makes cerebrospinal fluid)',
      'Meninges: dura, arachnoid, pia mater',
    ],
    hook: 'The CSF-filled spaces. Trace the CSF flow lateral → third → aqueduct → fourth → subarachnoid space; ventricles are key landmarks for orienting yourself on MRI.',
  },
  {
    icon: Network,
    title: 'Circle of Willis (blood supply)',
    structures: [
      'Internal carotid arteries and the vertebrobasilar system',
      'Anterior, middle and posterior cerebral arteries (ACA, MCA, PCA)',
      'Anterior and posterior communicating arteries (which close the ring)',
    ],
    hook: 'The arterial ring at the base of the brain. The territory each artery supplies maps directly onto stroke presentations — essential for the patient-diagnosis round.',
  },
  {
    icon: Brain,
    title: 'The 12 cranial nerves',
    structures: [
      'I Olfactory · II Optic · III Oculomotor · IV Trochlear · V Trigeminal · VI Abducens',
      'VII Facial · VIII Vestibulocochlear · IX Glossopharyngeal · X Vagus · XI Accessory · XII Hypoglossal',
      'Know each as sensory, motor or both, and its main function',
    ],
    hook: 'Use a mnemonic to fix the order, but the round rewards knowing function: e.g. III/IV/VI move the eye, VII is facial expression, X is the parasympathetic workhorse to the viscera.',
  },
  {
    icon: Network,
    title: 'Key white-matter tracts',
    structures: [
      'Corpus callosum (connects the hemispheres)',
      'Corticospinal (pyramidal) tract — voluntary movement',
      'Dorsal columns & spinothalamic tract — touch/proprioception vs pain/temperature',
      'Internal capsule (where motor and sensory fibres funnel through)',
      'Optic tract / optic radiations (the visual pathway)',
    ],
    hook: 'The brain’s wiring. Knowing where a tract crosses (decussates) explains why a lesion on one side produces deficits on the other — a recurring reasoning step in diagnosis.',
  },
]

const HOW_TESTED = [
  {
    title: 'On real and model human brains',
    detail:
      'You identify structures on whole or hemisected human brains and on plastic/3D models across timed stations. Learn structures by sight and from multiple angles — superior, lateral, midsagittal and basal views — not just from a single textbook diagram.',
  },
  {
    title: 'On atlases and 3D viewers',
    detail:
      'Free interactive 3D brain atlases let you rotate, slice and quiz yourself. Use them daily; they are the closest substitute for a specimen and build the rotational sense the practical demands.',
  },
  {
    title: 'On MRI and imaging',
    detail:
      'The same structures appear on axial, coronal and sagittal MRI. Practise orienting on a slice (find the midline, the ventricles, the brainstem) and then locating the deep nuclei. Translating 3D anatomy onto a 2D scan is a distinct, drillable skill.',
  },
  {
    title: 'On histology slides',
    detail:
      'Neurohistology overlaps with anatomy: recognise the cerebellar cortical layers, hippocampal formation, Purkinje cells, peripheral nerve and the glial cell types under the microscope.',
  },
]

const FAQS = [
  {
    question: 'How important is neuroanatomy in the Brain Bee?',
    answer:
      'Very. The human neuroanatomy practical is typically one of the most heavily weighted rounds, and it is the one that self-study from a book cannot replicate — it tests instant visual identification on real brains, models, atlases and scans. The exact weighting varies from year to year and between the national and international levels, but anatomy is almost always central, so it deserves a large share of your preparation time.',
  },
  {
    question: 'What brain structures do I actually need to know?',
    answer:
      'The cerebral lobes and major cortical areas; the limbic system (hippocampus, amygdala, cingulate, fornix); the basal ganglia; the thalamus and hypothalamus; the brainstem (midbrain, pons, medulla); the cerebellum; the ventricles and meninges; the Circle of Willis; the 12 cranial nerves; and the major white-matter tracts (corpus callosum, corticospinal tract, dorsal columns, spinothalamic tract, internal capsule, visual pathway). For each, learn its location, its function, and the disorder that appears when it fails.',
  },
  {
    question: 'How do I learn neuroanatomy if I don’t have a real brain to study?',
    answer:
      'Use a good labelled atlas together with a free interactive 3D brain model that you can rotate and slice. Quiz yourself on unlabelled images under time pressure, learn each structure from several views, and practise locating the same structures on MRI. Pairing every structure with its function and a clinical consequence makes it stick far better than rote labelling.',
  },
  {
    question: 'Why pair each structure with a disorder?',
    answer:
      'Because the patient-diagnosis round rewards it directly, and because clinical hooks are the strongest memory aid. Substantia nigra with Parkinson’s, hippocampus with Alzheimer’s and amnesia, Broca’s area with non-fluent aphasia, a middle cerebral artery territory with its stroke pattern — learning anatomy this way prepares two rounds at once.',
  },
  {
    question: 'Are good neuroanatomy resources free?',
    answer:
      'Yes. The Brain Facts book (Society for Neuroscience) and the student-run IYNA bootcamp materials are free, and excellent free interactive 3D brain atlases and public neuroimaging atlases exist online. You can build strong neuroanatomy without spending money. Paid coaching, including ours, is an optional supplement for live, timed identification practice and expert feedback.',
  },
  {
    question: 'Is this reference affiliated with the official Brain Bee?',
    answer:
      'No. Cerebrum Biology Academy is independent and is not affiliated with, authorised by, or endorsed by the International Brain Bee (IBB), the USA Brain Bee, or the Society for Neuroscience. "Brain Bee" is used here only to describe the competition this reference helps you prepare for.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Brain Bee Coaching',
      item: `${SITE_URL}/brain-bee-coaching`,
    },
    { '@type': 'ListItem', position: 3, name: 'Neuroanatomy Guide', item: PAGE_URL },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Brain Bee Neuroanatomy Guide: Every Structure You Must Know',
  url: PAGE_URL,
  inLanguage: 'en-US',
  datePublished: '2026-06-26',
  dateModified: '2026-06-26',
  author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
  publisher: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
  },
  about: 'Neuroanatomy for the Brain Bee neuroscience competition',
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
    audienceType:
      'High-school students (ages 13-19) preparing for the Brain Bee neuroanatomy practical',
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'details p'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

export default function BrainBeeNeuroanatomyGuidePage() {
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      "Hi — I'm preparing for the Brain Bee neuroanatomy practical (Grade/Year ___, based in [city, country]). Please share how your coaching drills structure identification."
    )

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Neuroanatomy',
          'Brain Bee Neuroanatomy Practical',
          'Neuroscience Competition Coaching',
          'Clinical Neurology / Patient Diagnosis',
          'Neuroimaging / MRI Identification',
          'International Brain Bee (IBB)',
        ]}
        jobTitle="Neuroscience Competition Coach — Brain Bee Neuroanatomy"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white">
        <nav className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-blue-700 flex items-center gap-1">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/brain-bee-coaching" className="hover:text-blue-700">
                Brain Bee Coaching
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">Neuroanatomy Guide</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <Microscope className="h-3.5 w-3.5" />
            Neuroanatomy Reference · Ages 13-19
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Brain Bee neuroanatomy:{' '}
            <span className="text-blue-700">every structure you must know.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            The human neuroanatomy practical is typically one of the most heavily weighted Brain Bee
            rounds &mdash; and the one self-study struggles with, because it tests instant visual
            identification on real brains, models, atlases and scans. (Exact weighting varies year
            to year and between the national and international levels.) This reference walks the
            full map &mdash; lobes, limbic system, basal ganglia, thalamus and hypothalamus,
            brainstem, cerebellum, ventricles, the Circle of Willis, the cranial nerves and the key
            tracts &mdash; with the function and clinical hook that make each one stick.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/brain-bee-study-guide"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-800"
            >
              <Target className="h-5 w-5" />
              Full study guide
            </Link>
            <Link
              href="/brain-bee-coaching"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              <Brain className="h-5 w-5" />
              Brain Bee coaching
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Independent educational reference. Not affiliated with or endorsed by the International
            Brain Bee or the Society for Neuroscience. The official Brain Facts book and IYNA
            bootcamp are free.
          </p>
        </section>

        {/* Regions */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              The neuroanatomy map, region by region
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              For each region: the structures to identify, and the function or clinical hook that
              fixes it in memory and feeds the patient-diagnosis round.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {REGIONS.map((r) => (
                <div key={r.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <r.icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{r.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {r.structures.map((s) => (
                      <li key={s} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                        <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-blue-500" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm leading-relaxed text-slate-700">
                    <strong className="text-blue-800">Why it matters: </strong>
                    {r.hook}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it's tested */}
        <section>
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              How neuroanatomy is tested
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              The same structures appear in four formats. Practise across all of them &mdash;
              recognising the hippocampus on a specimen is not the same skill as finding it on a
              coronal MRI.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {HOW_TESTED.map((h) => (
                <div key={h.title} className="rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="text-lg font-bold text-slate-900">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{h.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Brain Bee neuroanatomy &mdash; common questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200">
              {FAQS.map((f, idx) => (
                <details key={idx} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    <span>{f.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Soft CTA */}
        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Microscope className="mx-auto h-10 w-10 text-amber-300" />
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Drill identification live, with feedback
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              Reading this map is the start; the practical rewards fast, accurate identification
              under a clock. We run timed neuroanatomy stations and MRI drills with AIIMS-trained
              faculty (AIIMS is India&rsquo;s apex medical institution), live in all US time zones
              (ET / CT / MT / PT).
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/brain-bee-coaching"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold hover:bg-blue-700"
              >
                <Target className="h-5 w-5" />
                See the coaching programme
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp a question
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-300">
              WhatsApp works free from the US &mdash; no international call needed.
            </p>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-6 text-center text-xl font-bold text-slate-900">Related guides</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/brain-bee-study-guide"
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-blue-700">Brain Bee Study Guide</h3>
                <p className="mt-1 text-xs text-slate-600">How to study for every round</p>
              </Link>
              <Link
                href="/brain-bee-coaching"
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-blue-700">Brain Bee Coaching</h3>
                <p className="mt-1 text-xs text-slate-600">Live small-batch competition coaching</p>
              </Link>
              <Link
                href="/how-to-make-us-ibo-team"
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-blue-700">USA Biology Olympiad pathway</h3>
                <p className="mt-1 text-xs text-slate-600">For biology-minded students</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
