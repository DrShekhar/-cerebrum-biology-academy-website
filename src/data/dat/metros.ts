/**
 * DAT Biology metro configs for city-level landing pages.
 * Mirrors the MCAT metros.ts pattern.
 */

export interface DATMetroFaq {
  question: string
  answer: string
}

export interface DATMetroUniversity {
  name: string
  programmes: string
}

export interface DATMetroConfig {
  slug: string
  city: string
  stateOrRegion: string
  stateCode: string
  timezone: string
  timezoneShort: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroSubtitle: string
  whySection: { heading: string; paragraphs: string[] }
  universities: DATMetroUniversity[]
  timezoneSection: string
  demographicSection: { heading: string; paragraphs: string[] }
  faqs: DATMetroFaq[]
}

export const datMetros: Record<string, DATMetroConfig> = {
  'new-york': {
    slug: 'new-york',
    city: 'New York',
    stateOrRegion: 'New York Metro',
    stateCode: 'NY',
    timezone: 'Eastern Time',
    timezoneShort: 'ET',
    metaTitle: 'DAT Biology Tutor New York | Columbia, NYU, Stony Brook Dental',
    metaDescription:
      'DAT Biology tutor for New York pre-dental students — Columbia CDM, NYU Dentistry, Stony Brook Dental. AIIMS-trained biology specialists, ET evenings. From $449.',
    keywords: ['DAT biology tutor New York', 'DAT tutor Columbia dental', 'DAT tutor NYU dentistry', 'DAT tutor Stony Brook dental', 'pre-dental tutor NYC', 'DAT tutor Edison NJ', 'Indian American DAT tutor New York', 'online DAT biology coaching NYC'],
    heroSubtitle:
      'DAT Biology tutoring for Columbia CDM, NYU College of Dentistry, and Stony Brook Dental pre-dental students — built around the Edison / Jersey City / Long Island South Asian corridor. AIIMS-trained biology specialists, Campbell Biology curriculum, Eastern Time evening sessions, $449 to $1,399.',
    whySection: {
      heading: 'Why New York is the largest pre-dental market in the US',
      paragraphs: [
        'New York City has the densest concentration of dental schools in the country. Columbia College of Dental Medicine (CDM), NYU College of Dentistry (the largest dental school in the US by enrollment), and Stony Brook School of Dental Medicine are all within the metro. Rutgers School of Dental Medicine (Newark) serves the NJ corridor.',
        'The pre-dental pipeline extends to the Edison / Iselin / Jersey City South Asian corridor — one of the highest-density Indian-American communities on the East Coast, with growing pre-dental representation alongside the dominant pre-med culture.',
      ],
    },
    universities: [
      { name: 'Columbia College of Dental Medicine', programmes: 'DDS programme, research track' },
      { name: 'NYU College of Dentistry', programmes: 'DDS, DDS/PhD, Advanced Education in General Dentistry' },
      { name: 'Stony Brook School of Dental Medicine', programmes: 'DDS, Advanced certificates' },
      { name: 'Rutgers School of Dental Medicine (Newark)', programmes: 'DMD, dual-degree pathways' },
      { name: 'Touro College of Dental Medicine', programmes: 'DDS, Westchester campus' },
    ],
    timezoneSection: 'All live sessions are in Eastern Time. Standard NYC small-batch slot is 7:30 PM to 9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options. Senior Faculty 1:1 can be scheduled at any ET slot.',
    demographicSection: {
      heading: 'Edison / Long Island — the pre-dental family conversation',
      paragraphs: [
        'The Edison / Iselin corridor and Long Island South Asian communities drive growing pre-dental demand. Dentistry is increasingly popular as an alternative to medicine — similar clinical satisfaction, shorter training, better work-life balance.',
        'What we hear from NYC-area pre-dental parents: (1) NYU Dentistry is the primary target (largest class size, highest accessibility); (2) DAT Biology section scores of 22+ are competitive for NYC dental schools; (3) many students combine DAT prep with pre-med coursework as a hedging strategy. We structure the consultation around whether the student is pre-dental only or dual-tracking with MCAT.',
      ],
    },
    faqs: [
      { question: 'NYU Dentistry or Columbia CDM — what DAT Biology score is competitive?', answer: 'NYU Dentistry median accepted DAT Bio is ~21–22; Columbia CDM is higher at ~23–24. Our coaching targets the 22+ band with specific focus on the Campbell-aligned content areas that DAT Biology emphasises (anatomy/physiology, genetics, ecology) more than MCAT.' },
      { question: 'My family is in Edison / Jersey City — what is the planning conversation?', answer: 'The consultation covers: (a) target dental school tier (Columbia CDM at 23+ vs NYU at 21+), (b) timeline (summer-after-junior-year vs gap year), (c) whether the student is dual-tracking DAT + MCAT. For Edison families, we often discuss the Rutgers DMD pathway as a strong in-state option.' },
      { question: 'Can I pair Cerebrum DAT Biology with a generalist DAT provider?', answer: 'Absolutely — this is common. Many NYC students use a generalist for PAT (Perceptual Ability) and Reading Comprehension, then pair with us for the Biology section. Our biology-specialist depth exceeds what generalist providers cover.' },
      { question: 'Stony Brook or Rutgers dental — different prep from Columbia / NYU?', answer: 'The DAT is the same exam regardless of target school. The difference is target score: Stony Brook and Rutgers accept DAT Bio ~20–21; Columbia and NYU require 22–24. We calibrate the study plan intensity to your target school tier.' },
      { question: 'How does Cerebrum compare to generalist DAT prep providers?', answer: 'Generalist DAT providers charge $595–$2,599 for all sections. Cerebrum is a biology-section specialist at $449–$1,399 for Biology only. Our Campbell Biology depth exceeds generalist coverage — particularly in anatomy/physiology and genetics, which are weighted heavily on the DAT.' },
    ],
  },

  'los-angeles': {
    slug: 'los-angeles',
    city: 'Los Angeles',
    stateOrRegion: 'Los Angeles Metro',
    stateCode: 'CA',
    timezone: 'Pacific Time',
    timezoneShort: 'PT',
    metaTitle: 'DAT Biology Tutor Los Angeles | UCLA, USC, Western, Loma Linda',
    metaDescription:
      'DAT Biology tutor for LA pre-dental students — UCLA Dentistry, Herman Ostrow USC, Western, Loma Linda. Biology specialists, PT evenings. From $449.',
    keywords: ['DAT biology tutor Los Angeles', 'DAT tutor UCLA dental', 'DAT tutor USC dental', 'DAT tutor Western dental', 'pre-dental tutor LA', 'DAT tutor Cerritos', 'Indian American DAT tutor LA', 'online DAT biology coaching Los Angeles'],
    heroSubtitle:
      'DAT Biology tutoring for UCLA School of Dentistry, Herman Ostrow School of Dentistry of USC, Western University, and Loma Linda pre-dental students — built around the Cerritos / Irvine South Asian corridor. AIIMS-trained biology specialists, PT evening sessions, $449 to $1,399.',
    whySection: {
      heading: 'Why LA is the West Coast pre-dental hub',
      paragraphs: [
        'Los Angeles anchors the largest pre-dental ecosystem on the West Coast. UCLA School of Dentistry, Herman Ostrow School of Dentistry of USC, Western University of Health Sciences (Pomona), and Loma Linda University School of Dentistry are all within the metro — four dental schools in one region.',
        'The Cerritos / Artesia / Irvine South Asian corridor drives growing pre-dental demand. The dental profession is increasingly popular among Indian-American families as an alternative to medicine, with UCLA and USC Dentistry as primary targets.',
      ],
    },
    universities: [
      { name: 'UCLA School of Dentistry', programmes: 'DDS, DDS/PhD, Advanced specialty' },
      { name: 'Herman Ostrow School of Dentistry of USC', programmes: 'DDS, DDS/MBA, Advanced Education' },
      { name: 'Western University of Health Sciences (Pomona)', programmes: 'DMD programme' },
      { name: 'Loma Linda University School of Dentistry', programmes: 'DDS, dental hygiene, dental specialties' },
      { name: 'UC Irvine / UC San Diego pre-dental feeders', programmes: 'Biology, Biochemistry pre-dental track' },
    ],
    timezoneSection: 'All live sessions are in Pacific Time. Standard LA small-batch slot is 7:00 PM to 9:00 PM PT on weekday evenings, with 9:00 AM to 11:00 AM PT Saturday and Sunday options.',
    demographicSection: {
      heading: 'Cerritos / Irvine — the pre-dental family conversation',
      paragraphs: [
        'The Cerritos / Artesia and Irvine / Diamond Bar communities have growing pre-dental representation. Dentistry appeals as a clinical career with better work-life balance than medicine and shorter training (4 years vs 7+).',
        'What we hear from LA pre-dental parents: (1) UCLA Dentistry is the primary target (in-state tuition advantage); (2) DAT Biology 22+ is competitive for UCLA; (3) some families dual-track DAT + MCAT as a hedging strategy. We structure the consultation around target school and timeline.',
      ],
    },
    faqs: [
      { question: 'UCLA or USC Dentistry — what DAT Biology score is competitive?', answer: 'UCLA Dentistry median accepted DAT Bio is ~22; USC Ostrow is ~21–22. Both are competitive California schools. Our coaching targets the 22+ band. Loma Linda and Western accept ~20–21.' },
      { question: 'My family is in Cerritos / Irvine — what is the planning conversation?', answer: 'The consultation covers: (a) target dental school (UCLA at 22+ vs Western/Loma Linda at 20+), (b) timeline (summer-after-junior-year vs gap year), (c) dual-tracking with MCAT. For Cerritos families, we discuss both UCLA and USC pathways.' },
      { question: 'Can I pair Cerebrum with a generalist DAT provider?', answer: 'Yes — many LA students use a generalist for PAT and Reading Comprehension, then pair with us for the Biology section. Our Campbell Biology depth exceeds generalist coverage in anatomy/physiology and genetics.' },
      { question: 'Pacific Time scheduling for LA students?', answer: 'Small-batch: 7:00–9:00 PM PT weekday evenings. Weekend: 9:00–11:00 AM PT. 1:1 available at any PT slot. The 7 PM PT start works well for UCLA/USC students finishing afternoon labs.' },
      { question: 'How does Cerebrum compare to LA-area DAT prep?', answer: 'Generalist DAT providers charge $595–$2,599 for all sections. Cerebrum is a biology-section specialist at $449–$1,399. Many LA students pair us with a generalist for PAT and Reading Comprehension.' },
    ],
  },

  chicago: {
    slug: 'chicago',
    city: 'Chicago',
    stateOrRegion: 'Chicago Metro',
    stateCode: 'IL',
    timezone: 'Central Time',
    timezoneShort: 'CT',
    metaTitle: 'DAT Biology Tutor Chicago | UIC Dental, Midwestern, Northwestern',
    metaDescription:
      'DAT Biology tutor for Chicago pre-dental students — UIC College of Dentistry, Midwestern, Northwestern. Biology specialists, CT evenings. From $449.',
    keywords: ['DAT biology tutor Chicago', 'DAT tutor UIC dental', 'DAT tutor Midwestern dental', 'pre-dental tutor Chicago', 'DAT tutor Naperville', 'Indian American DAT tutor Chicago', 'online DAT biology coaching Chicago'],
    heroSubtitle:
      'DAT Biology tutoring for UIC College of Dentistry, Midwestern University, and Northwestern Dental pre-dental students — built around the Naperville / Schaumburg South Asian corridor. AIIMS-trained biology specialists, CT evening sessions, $449 to $1,399.',
    whySection: {
      heading: 'Why Chicago is the Midwest pre-dental hub',
      paragraphs: [
        'Chicago has the largest concentration of dental schools in the Midwest. UIC College of Dentistry (one of the largest in the US), Midwestern University College of Dental Medicine (Downers Grove), and Northwestern University Dental School are all within the metro.',
        'The Naperville / Schaumburg / Devon Avenue South Asian corridor drives consistent pre-dental demand, with UIC Dental as the primary in-state target.',
      ],
    },
    universities: [
      { name: 'UIC College of Dentistry', programmes: 'DMD, Advanced specialties (one of largest US dental schools)' },
      { name: 'Midwestern University (Downers Grove)', programmes: 'DMD programme, health sciences cluster' },
      { name: 'Northwestern University', programmes: 'Biology, Biomedical Engineering (dental pathway)' },
      { name: 'University of Illinois Urbana-Champaign', programmes: 'Biology, Biochemistry (UIC Dental feeder)' },
      { name: 'Marquette University (Milwaukee)', programmes: 'School of Dentistry, Midwest catchment' },
    ],
    timezoneSection: 'All live sessions are in Central Time. Standard Chicago small-batch slot is 7:00 PM to 9:00 PM CT on weekday evenings, with 9:00 AM to 11:00 AM CT Saturday and Sunday options.',
    demographicSection: {
      heading: 'Naperville / Schaumburg — the pre-dental family conversation',
      paragraphs: [
        'Naperville and Schaumburg South Asian communities drive growing pre-dental demand in the Midwest. UIC College of Dentistry is the dominant in-state target with strong in-state tuition advantage.',
        'What we hear from Chicago pre-dental parents: (1) UIC Dental is the primary target (in-state tuition, large class size); (2) DAT Biology 21+ is competitive for UIC; (3) Midwestern Downers Grove is a strong backup. We structure the consultation around in-state vs out-of-state targets.',
      ],
    },
    faqs: [
      { question: 'UIC Dental — what DAT Biology score is competitive?', answer: 'UIC College of Dentistry median accepted DAT Bio is ~20–21. Our coaching targets the 21+ band. Midwestern Downers Grove accepts ~20. Out-of-state targets like Michigan or Indiana require 22+.' },
      { question: 'My family is in Naperville — what is the planning conversation?', answer: 'The consultation covers: (a) target school (UIC at 21+ vs Midwestern at 20+ vs out-of-state at 22+), (b) timeline, (c) dual-tracking with MCAT. For Naperville families, UIC is typically the first-choice given in-state tuition.' },
      { question: 'UIUC pre-dental students — can they join Chicago sessions?', answer: 'All sessions are online. UIUC students in Champaign join remotely. Many UIUC pre-dental students target UIC Dental — the in-state pipeline is strong.' },
      { question: 'Central Time scheduling for Chicago students?', answer: 'Small-batch: 7:00–9:00 PM CT weekday evenings. Weekend: 9:00–11:00 AM CT. 1:1 available at any CT slot.' },
      { question: 'How does Cerebrum compare to Chicago-area DAT prep?', answer: 'Generalist DAT providers charge $595–$2,599 for all sections. Cerebrum is a biology-section specialist at $449–$1,399. Many Chicago students pair us with a generalist for PAT and Reading Comprehension.' },
    ],
  },

  houston: {
    slug: 'houston',
    city: 'Houston',
    stateOrRegion: 'Houston Metro',
    stateCode: 'TX',
    timezone: 'Central Time',
    timezoneShort: 'CT',
    metaTitle: 'DAT Biology Tutor Houston | UT Health, Baylor Dental, Texas A&M',
    metaDescription:
      'DAT Biology tutor for Houston pre-dental students — UT Health School of Dentistry, Baylor College of Dentistry, Texas A&M. Biology specialists, CT evenings. From $449.',
    keywords: ['DAT biology tutor Houston', 'DAT tutor UT Health dental', 'DAT tutor Baylor dental', 'pre-dental tutor Houston', 'DAT tutor Sugar Land TX', 'DAT tutor Katy TX', 'Indian American DAT tutor Houston', 'online DAT biology coaching Houston'],
    heroSubtitle:
      'DAT Biology tutoring for UT Health School of Dentistry, Baylor College of Dentistry (Dallas), and Texas A&M Dental pre-dental students — built around the Sugar Land / Katy / Missouri City South Asian corridor. AIIMS-trained biology specialists, CT evening sessions, $449 to $1,399.',
    whySection: {
      heading: 'Why Houston is the Texas pre-dental anchor',
      paragraphs: [
        'Houston anchors the largest pre-dental market in Texas. UT Health Science Center at Houston School of Dentistry is the primary local target. Baylor College of Dentistry (Dallas) and Texas A&M College of Dentistry serve the broader Texas pipeline.',
        'Houston has the largest South Asian community in Texas, concentrated in Sugar Land, Katy, Missouri City, and the Bellaire / Meyerland corridor. Pre-dental families in these communities increasingly view dentistry as the optimal clinical career path.',
      ],
    },
    universities: [
      { name: 'UT Health School of Dentistry Houston', programmes: 'DDS, Advanced Education in General Dentistry' },
      { name: 'Baylor College of Dentistry (Dallas)', programmes: 'DDS, Texas-wide applicant pool' },
      { name: 'Texas A&M College of Dentistry (Dallas)', programmes: 'DDS, dual-degree pathways' },
      { name: 'University of Houston', programmes: 'Biology, Biochemistry, pre-dental advising' },
      { name: 'Rice University', programmes: 'Biochemistry & Cell Biology, BioSciences' },
    ],
    timezoneSection: 'All live sessions are in Central Time. Standard Houston small-batch slot is 7:00 PM to 9:00 PM CT on weekday evenings, with 9:00 AM to 11:00 AM CT Saturday and Sunday options.',
    demographicSection: {
      heading: 'Sugar Land / Katy / Missouri City — the pre-dental family conversation',
      paragraphs: [
        'Sugar Land and Katy have the highest South Asian household densities in Houston. Pre-dental families increasingly choose dentistry over medicine for the work-life balance advantage.',
        'What we hear from Houston pre-dental parents: (1) UT Health Dental is the primary target (in-state tuition); (2) DAT Biology 21+ is competitive for Texas dental schools; (3) some families dual-track DAT + MCAT. We structure the consultation around the Texas dental application cycle.',
      ],
    },
    faqs: [
      { question: 'UT Health Dental Houston — what DAT Biology score is competitive?', answer: 'UT Health School of Dentistry median accepted DAT Bio is ~20–21. Our coaching targets the 21+ band. Baylor and Texas A&M Dental (both in Dallas) accept similar scores for Texas residents.' },
      { question: 'My family is in Sugar Land / Katy — what is the planning conversation?', answer: 'The consultation covers: (a) target school (UT Health at 21+ vs Baylor/TAMU at 21+), (b) timeline, (c) dual-tracking with MCAT. For Sugar Land families, UT Health Houston is the natural first choice.' },
      { question: 'Rice or UH pre-dental — different prep?', answer: 'Rice pre-dental students enter with stronger quantitative foundations; UH students may need more content depth. We calibrate the programme based on the diagnostic assessment. Both feed into the same Texas dental school pipeline.' },
      { question: 'How does Cerebrum compare to Houston-area DAT prep?', answer: 'Generalist DAT providers charge $595–$2,599 for all sections. Cerebrum is a biology-section specialist at $449–$1,399. Many Houston students pair us with a generalist for PAT and Reading Comprehension.' },
      { question: 'Central Time scheduling for Houston students?', answer: 'Small-batch: 7:00–9:00 PM CT weekday evenings. Weekend: 9:00–11:00 AM CT. 1:1 available at any CT slot.' },
    ],
  },

  boston: {
    slug: 'boston',
    city: 'Boston',
    stateOrRegion: 'Boston Metro',
    stateCode: 'MA',
    timezone: 'Eastern Time',
    timezoneShort: 'ET',
    metaTitle: 'DAT Biology Tutor Boston | Tufts, BU, Harvard Dental',
    metaDescription:
      'DAT Biology tutor for Boston pre-dental students — Tufts University School of Dental Medicine, BU Goldman School, Harvard School of Dental Medicine. Biology specialists, ET evenings. From $449.',
    keywords: ['DAT biology tutor Boston', 'DAT tutor Tufts dental', 'DAT tutor BU Goldman dental', 'DAT tutor Harvard dental', 'pre-dental tutor Boston', 'DAT tutor Lexington MA', 'Indian American DAT tutor Boston', 'online DAT biology coaching Boston'],
    heroSubtitle:
      'DAT Biology tutoring for Tufts School of Dental Medicine, BU Henry M. Goldman School of Dental Medicine, and Harvard School of Dental Medicine pre-dental students — built around the Lexington / Newton / North Shore South Asian corridor. AIIMS-trained biology specialists, ET evening sessions, $449 to $1,399.',
    whySection: {
      heading: 'Why Boston is the East Coast pre-dental epicentre',
      paragraphs: [
        'Boston has three dental schools within city limits: Tufts University School of Dental Medicine, BU Henry M. Goldman School of Dental Medicine, and Harvard School of Dental Medicine — the oldest dental school in the US (founded 1867). This density creates an unmatched pre-dental ecosystem.',
        'The Lexington / Newton / North Shore South Asian corridor drives pre-dental demand alongside the dominant pre-med culture. Many families hedge by having one child pursue medicine and another dentistry.',
      ],
    },
    universities: [
      { name: 'Tufts University School of Dental Medicine', programmes: 'DMD, Advanced specialties' },
      { name: 'BU Henry M. Goldman School of Dental Medicine', programmes: 'DMD, DMD/MPH, Advanced Education' },
      { name: 'Harvard School of Dental Medicine', programmes: 'DMD, DMD/PhD (oldest US dental school, 1867)' },
      { name: 'Boston University', programmes: 'Biology, Biochemistry, pre-dental advising' },
      { name: 'Northeastern University', programmes: 'Biology, co-op programme (pre-dental track)' },
    ],
    timezoneSection: 'All live sessions are in Eastern Time. Standard Boston small-batch slot is 7:30 PM to 9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options.',
    demographicSection: {
      heading: 'Lexington / Newton — the pre-dental family conversation',
      paragraphs: [
        'The Lexington / Newton / Wellesley corridor drives both pre-med and pre-dental demand. Dentistry is growing in popularity as families recognise the work-life balance advantage over medicine.',
        'What we hear from Boston pre-dental parents: (1) Tufts Dental is the primary local target (DAT Bio 21+); (2) Harvard Dental is aspirational (DAT Bio 24+, tiny class size); (3) BU Goldman offers a strong middle ground (DAT Bio 21–22). We structure the consultation around target tier and timeline.',
      ],
    },
    faqs: [
      { question: 'Tufts, BU, or Harvard Dental — what DAT Biology score is competitive?', answer: 'Tufts Dental median accepted DAT Bio is ~21; BU Goldman is ~21–22; Harvard Dental is ~24+ (tiny class of ~35, extremely competitive). Our coaching targets the 21+ band for Tufts/BU or 24+ for Harvard Dental aspirants.' },
      { question: 'My family is in Lexington / Newton — what is the planning conversation?', answer: 'The consultation covers: (a) target school tier (Harvard at 24+ vs Tufts/BU at 21+), (b) timeline, (c) dual-tracking with MCAT. For Lexington families, we often discuss hedging pre-dental + pre-med simultaneously.' },
      { question: 'Northeastern co-op students — how does the DAT timeline work?', answer: 'Northeastern co-op pre-dental students have alternating semesters. The co-op semester (lighter academic load) is ideal for concentrated DAT prep. We calibrate the study plan around the co-op cycle.' },
      { question: 'How does Cerebrum compare to Boston-area DAT prep?', answer: 'Generalist DAT providers charge $595–$2,599 for all sections. Cerebrum is a biology-section specialist at $449–$1,399. Many Boston students pair us with a generalist for PAT and Reading Comprehension.' },
      { question: 'Eastern Time scheduling for Boston students?', answer: 'Small-batch: 7:30–9:30 PM ET weekday evenings. Weekend: 9:00–11:00 AM ET. 1:1 available at any ET slot.' },
    ],
  },

  dallas: {
    slug: 'dallas',
    city: 'Dallas',
    stateOrRegion: 'Dallas-Fort Worth Metro',
    stateCode: 'TX',
    timezone: 'Central Time',
    timezoneShort: 'CT',
    metaTitle: 'DAT Biology Tutor Dallas | Baylor Dental, Texas A&M Dental, UTD',
    metaDescription:
      'DAT Biology tutor for Dallas pre-dental students — Baylor College of Dentistry, Texas A&M College of Dentistry, UTD. Biology specialists, CT evenings. From $449.',
    keywords: ['DAT biology tutor Dallas', 'DAT tutor Baylor dental', 'DAT tutor Texas A&M dental', 'pre-dental tutor Dallas', 'DAT tutor Plano TX', 'DAT tutor Frisco TX', 'Indian American DAT tutor Dallas', 'online DAT biology coaching DFW'],
    heroSubtitle:
      'DAT Biology tutoring for Baylor College of Dentistry, Texas A&M College of Dentistry, and DFW pre-dental students — built around the Plano / Frisco South Asian corridor. AIIMS-trained biology specialists, CT evening sessions, $449 to $1,399.',
    whySection: {
      heading: 'Why Dallas is the Texas dental-school capital',
      paragraphs: [
        'Dallas hosts two dental schools: Baylor College of Dentistry and Texas A&M College of Dentistry — both in the Texas A&M Health Sciences Center. Together they admit the largest dental class in Texas. The DFW metro feeds both schools with a strong pre-dental undergraduate pipeline from UTD, SMU, and UTA.',
        'The Plano / Frisco / Richardson South Asian corridor has growing pre-dental demand. Corporate families at TI, AT&T, and the DFW tech ecosystem increasingly consider dentistry as a clinical career for their children.',
      ],
    },
    universities: [
      { name: 'Baylor College of Dentistry (Dallas)', programmes: 'DDS, Advanced specialties' },
      { name: 'Texas A&M College of Dentistry (Dallas)', programmes: 'DDS, dual-degree pathways' },
      { name: 'UT Dallas (UTD)', programmes: 'Biology, Molecular Biology (pre-dental track)' },
      { name: 'SMU', programmes: 'Biological Sciences (pre-dental advising)' },
      { name: 'UT Arlington', programmes: 'Biology, Biochemistry, pre-dental pipeline' },
    ],
    timezoneSection: 'All live sessions are in Central Time. Standard DFW small-batch slot is 7:00 PM to 9:00 PM CT on weekday evenings, with 9:00 AM to 11:00 AM CT Saturday and Sunday options.',
    demographicSection: {
      heading: 'Plano / Frisco — the pre-dental family conversation',
      paragraphs: [
        'Plano and Frisco South Asian communities drive growing pre-dental demand in DFW. Both Baylor and Texas A&M dental schools are in Dallas, making DFW the natural base for Texas pre-dental students.',
        'What we hear from DFW pre-dental parents: (1) in-state Texas dental schools are the primary target (tuition advantage); (2) DAT Biology 20–21 is competitive for Texas dental schools; (3) some families dual-track DAT + MCAT. We structure the consultation around the Texas application cycle.',
      ],
    },
    faqs: [
      { question: 'Baylor or Texas A&M Dental — what DAT Biology score is competitive?', answer: 'Both Dallas dental schools accept DAT Bio ~20–21 for Texas residents. Our coaching targets the 21+ band. Out-of-state applicants typically need 22+ for competitive admission.' },
      { question: 'My family is in Plano / Frisco — what is the planning conversation?', answer: 'The consultation covers: (a) target school (Baylor vs TAMU Dental — both in Dallas), (b) timeline, (c) dual-tracking with MCAT. For Plano families, both dental schools are within commuting distance.' },
      { question: 'UTD or SMU pre-dental — different prep?', answer: 'UTD pre-dental students have stronger STEM foundations; SMU students may have lighter research loads. We calibrate based on the diagnostic. Both feed into the same Dallas dental school pipeline.' },
      { question: 'Central Time scheduling for Dallas students?', answer: 'Small-batch: 7:00–9:00 PM CT weekday evenings. Weekend: 9:00–11:00 AM CT. 1:1 available at any CT slot.' },
      { question: 'How does Cerebrum compare to DFW-area DAT prep?', answer: 'Generalist DAT providers charge $595–$2,599 for all sections. Cerebrum is a biology-section specialist at $449–$1,399. Many DFW students pair us with a generalist for PAT and Reading Comprehension.' },
    ],
  },
}

export function getDATMetro(slug: string): DATMetroConfig | null {
  return datMetros[slug] ?? null
}

export const datMetroSlugs = Object.keys(datMetros)
