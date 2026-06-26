/**
 * MCAT Biology metro configs for city-level landing pages.
 *
 * Each metro drives:
 *  - metadata (title, description, keywords)
 *  - JSON-LD schemas (Course, FAQPage, BreadcrumbList)
 *  - page content (hero, university feeders, local context, FAQs)
 *
 * Add a new metro by adding a new entry — then create a thin page.tsx
 * that imports MCATBiologyCityTemplate.
 */

export interface MCATMetroFaq {
  question: string
  answer: string
}

export interface MCATMetroUniversity {
  name: string
  programmes: string
}

export interface MCATMetroConfig {
  slug: string
  city: string
  stateOrRegion: string
  stateCode: string
  countryCode?: string
  timezone: string
  timezoneShort: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroSubtitle: string
  whySection: {
    heading: string
    paragraphs: string[]
  }
  universities: MCATMetroUniversity[]
  timezoneSection: string
  demographicSection: {
    heading: string
    paragraphs: string[]
  }
  faqs: MCATMetroFaq[]
}

export const mcatMetros: Record<string, MCATMetroConfig> = {
  'new-york': {
    slug: 'new-york',
    city: 'New York',
    stateOrRegion: 'New York Metro',
    stateCode: 'NY',
    timezone: 'Eastern Time',
    timezoneShort: 'ET',
    metaTitle: 'MCAT Biology Tutor New York | Columbia, NYU, Cornell, Mount Sinai',
    metaDescription:
      'MCAT Bio/Biochem tutor for New York pre-meds — Columbia, NYU, Cornell, Mount Sinai, Albert Einstein, Stony Brook. Biology specialists, ET evening slots. From $499.',
    keywords: [
      'MCAT Biology tutor New York',
      'MCAT Bio tutor Columbia',
      'MCAT Biology tutor NYU',
      'MCAT Biology tutor Cornell',
      'MCAT Biology tutor Mount Sinai',
      'MCAT Biology tutor Albert Einstein',
      'MCAT tutor Manhattan',
      'MCAT tutor Long Island',
      'MCAT tutor Edison NJ',
      'MCAT Bio/Biochem tutor NYC',
      'Indian American MCAT tutor New York',
      'online MCAT Biology coaching NYC',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for Columbia, NYU, Cornell, Mount Sinai, Albert Einstein, and Stony Brook pre-meds — built around the Manhattan / Long Island / New Jersey South Asian corridor. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Eastern Time evening sessions, $499 to $1,499.',
    whySection: {
      heading: 'Why New York is the largest pre-med market in the US',
      paragraphs: [
        'New York City anchors the largest concentration of medical schools and pre-med undergraduate programmes in the country. Columbia Vagelos College of Physicians & Surgeons, NYU Grossman School of Medicine (tuition-free since 2018), Weill Cornell Medicine, Icahn School of Medicine at Mount Sinai, and Albert Einstein College of Medicine are all within the metro — creating an unmatched clinical-exposure ecosystem for undergraduates doing research rotations.',
        'The pre-med pipeline extends beyond Manhattan: Stony Brook (Long Island), Rutgers (New Brunswick), NJIT, and the CUNY system collectively produce thousands of MCAT candidates annually. The Edison / Iselin / Jersey City South Asian corridor is one of the highest-density Indian-American pre-med communities on the East Coast.',
      ],
    },
    universities: [
      {
        name: 'Columbia University',
        programmes: 'Biochemistry, Biology, Neuroscience & Behavior, Biophysics',
      },
      {
        name: 'New York University (NYU)',
        programmes: 'Biology, Neural Science, Chemistry (pre-med track)',
      },
      {
        name: 'Cornell University (Ithaca + Weill Cornell NYC)',
        programmes: 'Biology, Human Biology, Neurobiology',
      },
      {
        name: 'Mount Sinai (Icahn School of Medicine)',
        programmes: 'FlexMed early-assurance BS/MD track',
      },
      {
        name: 'Albert Einstein College of Medicine',
        programmes: 'MD programme, Yeshiva University feeders',
      },
      {
        name: 'Stony Brook University (SUNY)',
        programmes: 'Biology, Biochemistry, Health Sciences',
      },
      {
        name: 'Rutgers University (New Brunswick)',
        programmes: 'Cell Biology & Neuroscience, Molecular Biology, BA/MD with RWJMS',
      },
      {
        name: 'CUNY system (Hunter, Baruch, City College)',
        programmes: 'Biology, Biochemistry, Sophie Davis BS/MD at CUNY',
      },
    ],
    timezoneSection:
      'All live sessions are in Eastern Time. Standard NYC small-batch slot is 7:30 PM to 9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options. This works around the typical Columbia / NYU late-afternoon lab schedule. Senior Faculty 1:1 can be scheduled at any ET slot, including 10:00 PM ET for students with evening hospital shifts or research commitments.',
    demographicSection: {
      heading: 'Edison / Jersey City / Long Island — the family planning conversation',
      paragraphs: [
        'The Edison / Iselin / Jersey City corridor has one of the highest South Asian household densities on the East Coast. Combined with the Long Island South Asian community (Jericho, Syosset, Manhasset), this creates a concentrated pre-med family pipeline where MCAT preparation planning starts early — often during sophomore year of college.',
        'What we hear from NYC-area parents: (1) the 515+ score threshold is non-negotiable for NYU, Columbia, and Mount Sinai; (2) research obligations at Columbia and NYU labs make full-time prep during the semester impractical; (3) the Mount Sinai FlexMed early-assurance track requires an earlier MCAT timeline than standard. We structure the consultation around which of these three scenarios applies.',
      ],
    },
    faqs: [
      {
        question: 'Columbia or NYU undergrad with active research — how do we fit MCAT prep?',
        answer:
          'Columbia MCB / Biochemistry and NYU Biology concentrators typically have 15–20 hours/week of lab research on top of a four-course load. We split the timeline: Self-Paced async content during the semester (5–8 hrs/week), then a concentrated Small-Batch + 1:1 block during the summer or gap year. Most Columbia and NYU pre-meds take a gap year — the bulk of MCAT prep happens then.',
      },
      {
        question: 'Mount Sinai FlexMed students — does Cerebrum coach the early-MCAT track?',
        answer:
          'Yes. FlexMed admits sophomores with early assurance to Icahn School of Medicine, but the programme still requires a competitive MCAT score. We coach Bio/Biochem for FlexMed candidates with a compressed timeline — typically starting spring of freshman year for a summer or fall sophomore test date.',
      },
      {
        question:
          'My family is in Edison / Iselin / Jersey City — what is the planning conversation?',
        answer:
          'The consultation covers: (a) which undergrad (Columbia, NYU, Rutgers, Stony Brook — each has different course-load timing), (b) gap year or no, (c) target band (515+ for NYC medical schools). For families with a high school student targeting BS/MD tracks (Rutgers BA/MD, Sophie Davis CUNY), the planning starts in junior year of high school.',
      },
      {
        question:
          'Stony Brook or Rutgers pre-meds — how is the prep different from Columbia / NYU?',
        answer:
          'Stony Brook and Rutgers pre-meds typically have lighter research loads and more in-semester study time. We can run a full Small-Batch programme during the school year, starting January for a July or August test date. Both schools have strong biology departments, so the content baseline is solid — the work is mostly passage strategy and biochemistry precision.',
      },
      {
        question: 'CUNY Sophie Davis BS/MD students — do you coach this track?',
        answer:
          'Yes. The CUNY School of Medicine (formerly Sophie Davis) BS/MD programme has an accelerated timeline. Students sit the MCAT earlier than standard (often end of year 3). We coach Bio/Biochem with a compressed content phase tailored to the Sophie Davis curriculum sequence.',
      },
      {
        question:
          'Long Island families (Jericho, Syosset, Manhasset) — same coaching as NYC students?',
        answer:
          'Yes — all sessions are online. The only practical difference is testing center logistics. NYC has Pearson VUE MCAT centers in Manhattan, Brooklyn, and the Bronx. From Long Island, the Garden City or Manhattan centers are typically closest. We do a logistics check during the diagnostic.',
      },
      {
        question: 'How does Cerebrum compare to NYC-area in-person prep providers?',
        answer:
          'NYC has the standard full-MCAT generalists ($2,500–$3,000 for all four sections) plus boutique Manhattan tutors at $175–$300/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty. Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour vs $200+ for Manhattan boutique. Many NYC students pair us with a generalist provider for C/P and CARS.',
      },
    ],
  },

  'los-angeles': {
    slug: 'los-angeles',
    city: 'Los Angeles',
    stateOrRegion: 'Los Angeles Metro',
    stateCode: 'CA',
    timezone: 'Pacific Time',
    timezoneShort: 'PT',
    metaTitle: 'MCAT Biology Tutor Los Angeles | UCLA, USC, Caltech, UCI',
    metaDescription:
      'MCAT Bio/Biochem tutor for LA pre-meds — UCLA, USC, Caltech, UC Irvine, LMU, Pomona. Biology specialists, PT evening slots. From $499.',
    keywords: [
      'MCAT Biology tutor Los Angeles',
      'MCAT Bio tutor UCLA',
      'MCAT Biology tutor USC',
      'MCAT Biology tutor Caltech',
      'MCAT Biology tutor UC Irvine',
      'MCAT tutor Cerritos',
      'MCAT tutor Irvine CA',
      'MCAT Bio/Biochem tutor LA',
      'Indian American MCAT tutor Los Angeles',
      'online MCAT Biology coaching LA',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for UCLA, USC, Caltech, UC Irvine, Loyola Marymount, and Pomona pre-meds — built around the Cerritos / Irvine / Artesia South Asian corridor. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Pacific Time evening sessions, $499 to $1,499.',
    whySection: {
      heading: 'Why LA is the West Coast pre-med capital',
      paragraphs: [
        'Los Angeles anchors the largest pre-med ecosystem on the West Coast. UCLA David Geffen School of Medicine, Keck School of Medicine of USC, and UC Irvine School of Medicine are all within the metro, creating a dense clinical-research pipeline. The UC system alone produces more MCAT candidates than any other public university system in the country.',
        'The South Asian pre-med community concentrates in Cerritos, Artesia, Irvine, Diamond Bar, and the San Gabriel Valley. These communities have strong pre-med culture from middle school onward, with MCAT preparation planning typically starting during sophomore year of college.',
      ],
    },
    universities: [
      {
        name: 'UCLA',
        programmes: 'Molecular, Cell & Developmental Biology; Physiological Science; Biochemistry',
      },
      { name: 'USC', programmes: 'Biological Sciences, Neuroscience, Human Biology (Keck feeder)' },
      { name: 'Caltech', programmes: 'Biology, Bioengineering, Chemistry (pre-med track)' },
      {
        name: 'UC Irvine',
        programmes: 'Biological Sciences, Pharmaceutical Sciences, Public Health Sciences',
      },
      { name: 'Loyola Marymount University (LMU)', programmes: 'Biology, Biochemistry, Bioethics' },
      { name: 'Pomona College', programmes: 'Biology, Molecular Biology, Neuroscience' },
      {
        name: 'UC Riverside',
        programmes: 'Biology, Biochemistry, Biomedical Sciences (Thomas Haider UCR SOM)',
      },
      {
        name: 'Cal State Long Beach / Fullerton',
        programmes: 'Biological Sciences, Pre-med advising programmes',
      },
    ],
    timezoneSection:
      'All live sessions are in Pacific Time. Standard LA small-batch slot is 7:00 PM to 9:00 PM PT on weekday evenings, with 9:00 AM to 11:00 AM PT Saturday and Sunday options. This works around the typical UCLA / USC afternoon lab schedule. Senior Faculty 1:1 can be scheduled at any PT slot.',
    demographicSection: {
      heading: 'Cerritos / Irvine / Diamond Bar — the family planning conversation',
      paragraphs: [
        'The Cerritos / Artesia corridor and the Irvine / Diamond Bar / Walnut communities have the highest South Asian household densities in Southern California. Pre-med families in these communities typically plan MCAT preparation 12–18 months ahead, with the target test date tied to the UC medical school application cycle.',
        'What we hear from LA parents: (1) UC medical schools (UCLA, UCI, UCSD, UCSF) are the primary targets and require 515+ for competitive admission; (2) the UCLA pre-med track is intensely competitive — biology research experience is the norm, not the exception; (3) many families consider DO schools (Western University, Touro) as parallel tracks. We structure the consultation around the target school tier.',
      ],
    },
    faqs: [
      {
        question: 'UCLA or USC undergrad with research commitments — how do we fit MCAT prep?',
        answer:
          'UCLA MCDB / Physiological Science and USC Biological Sciences pre-meds typically have 10–20 hours/week of lab research. We split the timeline: Self-Paced async during the semester, then concentrated Small-Batch + 1:1 during summer or a gap year. Many UCLA students take the MCAT the summer after junior year before applying in the fall.',
      },
      {
        question: 'Caltech pre-meds — how does the prep differ from UCLA / USC?',
        answer:
          'Caltech pre-meds enter with the deepest quantitative foundation of any LA cohort. The MCAT challenge is different: passage interpretation and AAMC-style reasoning, not content depth. We focus sessions on AAMC passage strategy and the Bio/Biochem-specific command patterns rather than content review.',
      },
      {
        question: 'My family is in Cerritos / Irvine — what is the planning conversation?',
        answer:
          'The consultation covers: (a) which UC or private school the student attends, (b) target score band (515+ for UCLA/UCSF, 510+ for UCI/UCR), (c) gap year or summer-after-junior-year timeline. For families with high school students targeting BS/MD tracks, planning starts junior year.',
      },
      {
        question: 'UC Irvine or UC Riverside pre-meds — different from UCLA?',
        answer:
          'UCI and UCR pre-meds have more in-semester study time than UCLA students. We can run a full Small-Batch programme during the school year. UCR has the Thomas Haider Programme — an early-assurance track into UCR SOM — which has a different MCAT timeline. We accommodate both standard and early tracks.',
      },
      {
        question: 'DO schools (Western University, Touro) as backup — do you coach for that?',
        answer:
          'Yes. The MCAT is the same exam regardless of MD vs DO applications. Our Bio/Biochem coaching targets the 510–520 range which covers both UC MD schools (515+) and DO schools (505–510). We help families evaluate the parallel-track strategy during the planning consultation.',
      },
      {
        question: 'How does Cerebrum compare to LA-area MCAT prep providers?',
        answer:
          'LA has the standard full-MCAT generalists ($2,500–$3,000) plus Westwood / Koreatown boutique tutors at $150–$250/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty. Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour. Many LA students pair us with a generalist for C/P and CARS.',
      },
      {
        question: 'Pacific Time scheduling — what slots work for LA students?',
        answer:
          'Standard small-batch: 7:00–9:00 PM PT weekday evenings. Weekend: 9:00–11:00 AM PT Saturday/Sunday. 1:1 available at any PT slot. The 7 PM PT start works well for UCLA students who finish afternoon labs by 5–6 PM.',
      },
    ],
  },

  chicago: {
    slug: 'chicago',
    city: 'Chicago',
    stateOrRegion: 'Chicago Metro',
    stateCode: 'IL',
    timezone: 'Central Time',
    timezoneShort: 'CT',
    metaTitle: 'MCAT Biology Tutor Chicago | UChicago, Northwestern, UIC, Loyola',
    metaDescription:
      'MCAT Bio/Biochem tutor for Chicago pre-meds — UChicago, Northwestern, UIC, Loyola, Rush. Biology specialists, CT evening slots. From $499.',
    keywords: [
      'MCAT Biology tutor Chicago',
      'MCAT Bio tutor UChicago',
      'MCAT Biology tutor Northwestern',
      'MCAT Biology tutor UIC',
      'MCAT Biology tutor Loyola Chicago',
      'MCAT tutor Naperville',
      'MCAT tutor Schaumburg',
      'MCAT Bio/Biochem tutor Illinois',
      'Indian American MCAT tutor Chicago',
      'online MCAT Biology coaching Chicago',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for UChicago, Northwestern, UIC, Loyola, and Rush pre-meds — built around the Naperville / Schaumburg / Devon Avenue South Asian corridor. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Central Time evening sessions, $499 to $1,499.',
    whySection: {
      heading: 'Why Chicago is the Midwest pre-med hub',
      paragraphs: [
        'Chicago concentrates more medical schools than any Midwest metro: Pritzker School of Medicine (UChicago), Feinberg School of Medicine (Northwestern), UIC College of Medicine (the largest medical school in the US by enrollment), Loyola Stritch, Rush Medical College, and Rosalind Franklin. This density creates an unmatched clinical-research ecosystem for undergraduates.',
        'The South Asian pre-med community concentrates in Naperville, Schaumburg, the Devon Avenue corridor (Rogers Park / West Ridge), and the Bolingbrook / Aurora suburbs. These communities drive consistent MCAT demand, with preparation planning typically starting during sophomore year.',
      ],
    },
    universities: [
      {
        name: 'University of Chicago',
        programmes: 'Biological Sciences, Biochemistry, Neuroscience (Pritzker feeder)',
      },
      {
        name: 'Northwestern University',
        programmes: 'Biology, Neuroscience, Biomedical Engineering (Feinberg feeder)',
      },
      {
        name: 'University of Illinois Chicago (UIC)',
        programmes: 'Biological Sciences, Biochemistry, Neuroscience',
      },
      {
        name: 'Loyola University Chicago',
        programmes: 'Biology, Biochemistry, Bioinformatics (Stritch feeder)',
      },
      { name: 'Rush University', programmes: 'Clinical research pathways, Rush Medical College' },
      {
        name: 'University of Illinois Urbana-Champaign',
        programmes: 'Molecular & Cellular Biology, Integrative Biology, Biochemistry',
      },
      { name: 'DePaul University', programmes: 'Biological Sciences, Health Sciences' },
    ],
    timezoneSection:
      'All live sessions are in Central Time. Standard Chicago small-batch slot is 7:00 PM to 9:00 PM CT on weekday evenings, with 9:00 AM to 11:00 AM CT Saturday and Sunday options. Senior Faculty 1:1 can be scheduled at any CT slot.',
    demographicSection: {
      heading: 'Naperville / Schaumburg / Devon Avenue — the family planning conversation',
      paragraphs: [
        'Naperville has one of the highest South Asian household densities in the Midwest, followed by Schaumburg and the Devon Avenue corridor in Chicago. Pre-med families in these communities plan MCAT preparation 12–18 months ahead.',
        "What we hear from Chicago parents: (1) UChicago's rigorous grading makes GPA preservation critical — MCAT prep must not compromise coursework; (2) Northwestern and UIC medical schools are the primary local targets (515+ for Feinberg, 510+ for UIC); (3) many families consider UIUC pre-meds commuting to Chicago for research. We structure the consultation around the student's university and target school tier.",
      ],
    },
    faqs: [
      {
        question: 'UChicago or Northwestern undergrad with research — how do we fit MCAT prep?',
        answer:
          "UChicago Biological Sciences and Northwestern Biology concentrators face rigorous course loads. We split the timeline: Self-Paced async during the semester (5–8 hrs/week), then concentrated Small-Batch + 1:1 during summer. UChicago's quarter system means shorter but more intense terms — we calibrate study load accordingly.",
      },
      {
        question: 'UIC pre-meds — different from UChicago / Northwestern?',
        answer:
          'UIC pre-meds typically have more in-semester study time and access to UIC College of Medicine research rotations. We can run a full Small-Batch during the school year. UIC has the largest medical school in the US, so many UIC pre-meds target in-state admission — the 510+ threshold is realistic with our programme.',
      },
      {
        question: 'My family is in Naperville / Schaumburg — what is the planning conversation?',
        answer:
          'The consultation covers: (a) which university (UChicago, Northwestern, UIC, UIUC), (b) target score band (515+ for Feinberg/Pritzker, 510+ for UIC/Loyola), (c) gap year or summer-after-junior-year timeline. For high school students in Naperville targeting BS/MD tracks, planning starts junior year.',
      },
      {
        question: 'UIUC pre-meds in Champaign — can they join Chicago sessions?',
        answer:
          'All sessions are online — UIUC students join from Champaign with no commute. The Champaign-to-Chicago Pearson VUE center logistics are the only difference; we coordinate testing center selection during the diagnostic.',
      },
      {
        question: 'How does Cerebrum compare to Chicago-area MCAT prep providers?',
        answer:
          'Chicago has the standard full-MCAT generalists ($2,500–$3,000) plus Evanston / Hyde Park boutique tutors at $150–$250/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty. Our Small-Batch is $999 vs generalist $2,700. Many Chicago students pair us with a generalist for C/P and CARS.',
      },
    ],
  },

  dallas: {
    slug: 'dallas',
    city: 'Dallas',
    stateOrRegion: 'Dallas-Fort Worth Metro',
    stateCode: 'TX',
    timezone: 'Central Time',
    timezoneShort: 'CT',
    metaTitle: 'MCAT Biology Tutor Dallas | UT Southwestern, SMU, UTD, Baylor',
    metaDescription:
      'MCAT Bio/Biochem tutor for Dallas pre-meds — UT Southwestern, SMU, UTD, Baylor, UNT HSC. Biology specialists, CT evening slots. From $499.',
    keywords: [
      'MCAT Biology tutor Dallas',
      'MCAT Bio tutor UT Southwestern',
      'MCAT Biology tutor SMU',
      'MCAT Biology tutor UTD',
      'MCAT Biology tutor Baylor',
      'MCAT tutor Plano TX',
      'MCAT tutor Frisco TX',
      'MCAT tutor Irving TX',
      'MCAT Bio/Biochem tutor DFW',
      'Indian American MCAT tutor Dallas',
      'online MCAT Biology coaching Dallas',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for UT Southwestern, SMU, UTD, Baylor, and UNT HSC pre-meds — built around the Plano / Frisco / Irving South Asian corridor. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Central Time evening sessions, $499 to $1,499.',
    whySection: {
      heading: 'Why DFW is the fastest-growing pre-med market in Texas',
      paragraphs: [
        'Dallas-Fort Worth anchors a rapidly growing medical education ecosystem. UT Southwestern Medical Center is consistently ranked among the top 20 medical schools nationally. Baylor University Medical Center, UNT Health Science Center (Fort Worth), and the emerging UT Dallas pre-med pipeline drive steady MCAT demand.',
        'The DFW Indian-American community has grown significantly, concentrated in Plano, Frisco, Irving, and Richardson. The Plano / Frisco corridor has some of the highest South Asian household densities in Texas, with strong pre-med culture in local high schools (Plano Senior, Liberty, Frisco). Corporate relocation from the tech sector (TI, AT&T, Toyota, Goldman Sachs DFW) has accelerated this growth.',
      ],
    },
    universities: [
      {
        name: 'UT Southwestern Medical Center',
        programmes: 'MD programme, Summer undergraduate research',
      },
      {
        name: 'Southern Methodist University (SMU)',
        programmes: 'Biological Sciences, Biochemistry, Applied Physiology',
      },
      { name: 'UT Dallas (UTD)', programmes: 'Biology, Molecular Biology, Neuroscience' },
      {
        name: 'Baylor University (Waco feeder)',
        programmes: 'Biology, Biochemistry, Medical Humanities, Baylor College of Medicine pathway',
      },
      {
        name: 'UNT Health Science Center (Fort Worth)',
        programmes: 'TCOM DO programme, Graduate biomedical sciences',
      },
      {
        name: 'Texas A&M (College Station feeder)',
        programmes: 'Biology, Biochemistry, Biomedical Sciences',
      },
    ],
    timezoneSection:
      'All live sessions are in Central Time. Standard DFW small-batch slot is 7:00 PM to 9:00 PM CT on weekday evenings, with 9:00 AM to 11:00 AM CT Saturday and Sunday options. Senior Faculty 1:1 can be scheduled at any CT slot.',
    demographicSection: {
      heading: 'Plano / Frisco / Irving — the family planning conversation',
      paragraphs: [
        'The Plano / Frisco / Richardson corridor has one of the highest South Asian household densities in Texas, driven by TI, AT&T, Toyota, and the DFW tech ecosystem. Pre-med culture is strong in the Plano ISD and Frisco ISD school systems.',
        'What we hear from DFW parents: (1) UT Southwestern is the primary target — in-state tuition makes it the clear first choice for Texas residents; (2) the UTD pre-med track has grown rapidly and feeds into UTSW research rotations; (3) many families consider DO schools (UNT HSC TCOM) as parallel tracks. We structure the consultation around MD vs DO targets and the Texas-specific application timeline.',
      ],
    },
    faqs: [
      {
        question: 'UTD or SMU pre-med — how does the prep differ?',
        answer:
          "UTD pre-meds typically have strong quantitative foundations (the university's STEM emphasis) but may need more passage-strategy work for the MCAT's reasoning-heavy format. SMU pre-meds have slightly lighter research loads and can often run a full Small-Batch during the school year. We calibrate based on the student's course load and research commitments.",
      },
      {
        question: 'UT Southwestern target — what score is needed?',
        answer:
          'UTSW is highly competitive: median accepted MCAT is 517–519. Our coaching targets the 515+ band with emphasis on Bio/Biochem section optimization. Many DFW students pair Cerebrum (Bio/Biochem) with a generalist for C/P and CARS to hit the 518+ composite target.',
      },
      {
        question: 'My family is in Plano / Frisco — what is the planning conversation?',
        answer:
          'The consultation covers: (a) which university (UTD, SMU, UT Austin, Texas A&M), (b) target school tier (UTSW at 517+ vs UNT TCOM at 505+), (c) timeline (summer-after-junior-year vs gap year). For Plano/Frisco high school students targeting BS/MD tracks, planning starts junior year.',
      },
      {
        question: 'Texas A&M or Baylor pre-meds — can they join DFW sessions?',
        answer:
          'All sessions are online — students in College Station (A&M) or Waco (Baylor) join remotely. Both schools feed into the DFW medical ecosystem. Baylor pre-meds often target Baylor College of Medicine in Houston; we accommodate Houston testing center logistics in the planning.',
      },
      {
        question: 'How does Cerebrum compare to DFW-area MCAT prep providers?',
        answer:
          'DFW has the standard full-MCAT generalists ($2,500–$3,000) plus boutique tutors in Plano/Richardson at $150–$200/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty. Our Small-Batch is $999 vs generalist $2,700. Many DFW students pair us with a generalist for C/P and CARS.',
      },
    ],
  },

  seattle: {
    slug: 'seattle',
    city: 'Seattle',
    stateOrRegion: 'Seattle Metro',
    stateCode: 'WA',
    timezone: 'Pacific Time',
    timezoneShort: 'PT',
    metaTitle: 'MCAT Biology Tutor Seattle | UW, Seattle Pacific, Gonzaga',
    metaDescription:
      'MCAT Bio/Biochem tutor for Seattle pre-meds — University of Washington, Seattle Pacific, Gonzaga, WSU. Biology specialists, PT evening slots. From $499.',
    keywords: [
      'MCAT Biology tutor Seattle',
      'MCAT Bio tutor University of Washington',
      'MCAT Biology tutor UW Seattle',
      'MCAT Biology tutor Seattle Pacific',
      'MCAT tutor Bellevue WA',
      'MCAT tutor Redmond WA',
      'MCAT Bio/Biochem tutor Washington',
      'Indian American MCAT tutor Seattle',
      'online MCAT Biology coaching Seattle',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for University of Washington, Seattle Pacific, Gonzaga, and WSU pre-meds — built around the Bellevue / Redmond / Sammamish South Asian tech corridor. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Pacific Time evening sessions, $499 to $1,499.',
    whySection: {
      heading: 'Why Seattle is the Pacific Northwest pre-med anchor',
      paragraphs: [
        "Seattle is built around the University of Washington School of Medicine — the region's dominant medical school and one of the largest in the US. UW Medicine serves as the primary pre-med target for students across Washington, Alaska, Montana, Idaho, and Wyoming (the WWAMI regional medical education programme).",
        'The Eastside tech corridor (Bellevue, Redmond, Sammamish, Kirkland) has a rapidly growing Indian-American community driven by Microsoft, Amazon, Google, and Meta. This tech-sector diaspora drives consistent pre-med demand for their college-age children. The Bellevue School District and Redmond feeder schools produce a steady stream of pre-med aspirants.',
      ],
    },
    universities: [
      {
        name: 'University of Washington',
        programmes: 'Biology, Biochemistry, Neuroscience, Public Health (UW SOM feeder)',
      },
      {
        name: 'Seattle Pacific University',
        programmes: 'Biology, Biochemistry, Pre-health professions',
      },
      {
        name: 'Gonzaga University (Spokane)',
        programmes: 'Biology, Biochemistry (UW WWAMI Spokane track)',
      },
      {
        name: 'Washington State University (Pullman)',
        programmes: 'Biology, Biochemistry, Neuroscience, Elson S. Floyd COM',
      },
      {
        name: 'University of Puget Sound',
        programmes: 'Biology, Biochemistry, Molecular & Cellular Biology',
      },
    ],
    timezoneSection:
      'All live sessions are in Pacific Time. Standard Seattle small-batch slot is 7:00 PM to 9:00 PM PT on weekday evenings, with 9:00 AM to 11:00 AM PT Saturday and Sunday options. Senior Faculty 1:1 can be scheduled at any PT slot.',
    demographicSection: {
      heading: 'Bellevue / Redmond / Sammamish — the family planning conversation',
      paragraphs: [
        'The Eastside corridor (Bellevue, Redmond, Sammamish, Kirkland) has the highest South Asian household density in the Pacific Northwest, driven by Microsoft, Amazon, Google, and Meta employment. Pre-med families in these communities often plan MCAT preparation during sophomore year of college.',
        'What we hear from Seattle parents: (1) UW School of Medicine is the dominant target — in-state WWAMI admission is highly competitive (median MCAT ~516); (2) the tech-sector families value data-driven preparation approaches; (3) many students at UW have significant research commitments at Fred Hutch Cancer Center or UW Medicine labs. We structure the consultation around the UW research timeline and WWAMI application cycle.',
      ],
    },
    faqs: [
      {
        question: 'UW undergrad with Fred Hutch or UW Medicine research — how do we fit MCAT prep?',
        answer:
          'UW Biology and Biochemistry students with active research at Fred Hutch or UW Medicine labs typically have 15–20 hours/week of lab time. We split the timeline: Self-Paced async during the semester, then concentrated Small-Batch + 1:1 during summer. The UW quarter system (shorter terms) means study blocks are more compressed than semester schools.',
      },
      {
        question: 'UW WWAMI programme — what MCAT score is competitive?',
        answer:
          'WWAMI in-state admission is highly competitive: median accepted MCAT is around 515–517. Our coaching targets the 515+ band with Bio/Biochem section optimization. The WWAMI regional model means Idaho, Montana, Wyoming, and Alaska applicants have slightly different thresholds.',
      },
      {
        question: 'My family is in Bellevue / Redmond — what is the planning conversation?',
        answer:
          'The consultation covers: (a) which university (UW, WSU, out-of-state), (b) target school (WWAMI at 515+ vs WSU Floyd COM at 508+), (c) gap year or summer timeline. For Bellevue School District families with high school students, we can advise on pre-med undergraduate selection.',
      },
      {
        question: 'Gonzaga or WSU pre-meds — can they join Seattle sessions?',
        answer:
          'All sessions are online. Gonzaga (Spokane) students often target the WWAMI Spokane track. WSU (Pullman) students may target WSU Elson S. Floyd College of Medicine. We accommodate both pathways and testing center logistics.',
      },
      {
        question: 'How does Cerebrum compare to Seattle-area MCAT prep?',
        answer:
          'Seattle has the standard full-MCAT generalists ($2,500–$3,000) plus University District boutique tutors at $150–$200/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty. Our Small-Batch is $999. Many Seattle students pair us with a generalist for C/P and CARS.',
      },
    ],
  },

  dc: {
    slug: 'dc',
    city: 'Washington DC',
    stateOrRegion: 'DC / Maryland / Virginia Metro',
    stateCode: 'DC',
    timezone: 'Eastern Time',
    timezoneShort: 'ET',
    metaTitle: 'MCAT Biology Tutor Washington DC | Georgetown, GWU, Howard, UMD, UVA',
    metaDescription:
      'MCAT Bio/Biochem tutor for DC pre-meds — Georgetown, GWU, Howard, UMD, Johns Hopkins, UVA. Biology specialists, ET evening slots. From $499.',
    keywords: [
      'MCAT Biology tutor Washington DC',
      'MCAT Bio tutor Georgetown',
      'MCAT Biology tutor GWU',
      'MCAT Biology tutor Howard',
      'MCAT Biology tutor Johns Hopkins',
      'MCAT Biology tutor UMD',
      'MCAT tutor Fairfax VA',
      'MCAT tutor Bethesda MD',
      'MCAT Bio/Biochem tutor DMV',
      'Indian American MCAT tutor DC',
      'online MCAT Biology coaching DC',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for Georgetown, GWU, Howard, UMD, Johns Hopkins, and UVA pre-meds — built around the Fairfax / Bethesda / Rockville South Asian corridor and NIH research pipeline. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Eastern Time evening sessions, $499 to $1,499.',
    whySection: {
      heading: 'Why DC is the NIH-powered pre-med corridor',
      paragraphs: [
        'The DC-Maryland-Virginia (DMV) metro has a unique pre-med advantage: the National Institutes of Health (NIH) in Bethesda. NIH is the largest biomedical research institution in the world, and thousands of undergraduates do summer research internships (SIP, IRTA) and post-bac research through NIH — this creates a research pipeline that feeds directly into medical school applications.',
        'Georgetown School of Medicine, GWU School of Medicine, Howard University College of Medicine, and the University of Maryland School of Medicine anchor the local medical-school landscape. Johns Hopkins (Baltimore, 40 miles northeast) draws heavily from the DMV pre-med pool. The South Asian community in Fairfax, Bethesda, Rockville, and the Loudoun County tech corridor drives consistent MCAT demand.',
      ],
    },
    universities: [
      {
        name: 'Georgetown University',
        programmes: 'Biology, Biochemistry, Neuroscience (Georgetown SOM feeder)',
      },
      {
        name: 'George Washington University (GWU)',
        programmes: 'Biological Sciences, Biochemistry, Public Health',
      },
      { name: 'Howard University', programmes: 'Biology, Chemistry, Howard University COM' },
      {
        name: 'University of Maryland (College Park)',
        programmes: 'Biology, Biochemistry, Neuroscience, Cell Biology',
      },
      {
        name: 'Johns Hopkins University (Baltimore)',
        programmes: 'Biology, Molecular & Cellular Biology, Neuroscience, Biomedical Engineering',
      },
      {
        name: 'University of Virginia (Charlottesville)',
        programmes: 'Biology, Biomedical Engineering, Neuroscience',
      },
      { name: 'Virginia Tech / GMU pre-meds', programmes: 'Biology, Biochemistry, Neuroscience' },
    ],
    timezoneSection:
      'All live sessions are in Eastern Time. Standard DMV small-batch slot is 7:30 PM to 9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options. This works around NIH research schedules (typically 8 AM – 5 PM). Senior Faculty 1:1 can be scheduled at any ET slot.',
    demographicSection: {
      heading: 'Fairfax / Bethesda / Rockville — the family planning conversation',
      paragraphs: [
        'The Fairfax / Centreville / Chantilly corridor, Bethesda / Rockville, and the Loudoun County tech belt have the highest South Asian household densities in the DMV. Many families have NIH, FDA, or biotech connections, which shapes their understanding of the medical-school application process.',
        'What we hear from DMV parents: (1) NIH post-bac / SIP experience is the competitive edge — MCAT prep must complement, not conflict with, the NIH research timeline; (2) Georgetown and Hopkins are the primary local targets (518+ for Hopkins, 515+ for Georgetown); (3) in-state UMD and UVA options provide cost-effective backup. We structure the consultation around the NIH research calendar and target school tier.',
      ],
    },
    faqs: [
      {
        question: 'Georgetown or GWU undergrad with NIH research — how do we fit MCAT prep?',
        answer:
          'Georgetown Biology and GWU pre-meds with NIH research commitments (SIP, IRTA, post-bac) typically have structured 8-5 lab schedules. Our ET evening sessions (7:30–9:30 PM) fit cleanly after NIH hours. We split the timeline: async content during the school year, concentrated live prep during summer or a post-NIH gap year.',
      },
      {
        question: 'Johns Hopkins target — what score is competitive from the DMV?',
        answer:
          'Hopkins median accepted MCAT is 521+. Our coaching targets the 515–520+ band for Bio/Biochem section optimization. Many DMV students targeting Hopkins pair Cerebrum (Bio/Biochem specialist) with a generalist for C/P and CARS to hit the 520+ composite.',
      },
      {
        question: 'My family is in Fairfax / Bethesda — what is the planning conversation?',
        answer:
          'The consultation covers: (a) which university (Georgetown, GWU, UMD, UVA, Hopkins), (b) NIH research timeline (does the student have a post-bac or SIP slot?), (c) target school tier (Hopkins at 521+ vs Georgetown at 515+ vs UMD at 512+). For TJHSST families with high school students, planning starts junior year.',
      },
      {
        question: 'Howard University pre-meds — different from Georgetown / GWU?',
        answer:
          'Howard pre-meds have a distinctive pathway: Howard University College of Medicine provides in-system early admission opportunities. Our coaching supports both Howard COM internal candidates and Howard students applying to external medical schools. The MCAT prep is the same; the application strategy differs.',
      },
      {
        question: 'How does Cerebrum compare to DMV-area MCAT prep providers?',
        answer:
          'The DMV has the standard full-MCAT generalists ($2,500–$3,000) plus Georgetown / Bethesda boutique tutors at $175–$275/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty. Our Small-Batch is $999 vs generalist $2,700. Many DMV students pair us with a generalist for C/P and CARS.',
      },
    ],
  },

  philadelphia: {
    slug: 'philadelphia',
    city: 'Philadelphia',
    stateOrRegion: 'Philadelphia Metro',
    stateCode: 'PA',
    timezone: 'Eastern Time',
    timezoneShort: 'ET',
    metaTitle: 'MCAT Biology Tutor Philadelphia | Penn, Temple, Drexel, Jefferson',
    metaDescription:
      'MCAT Bio/Biochem tutor for Philadelphia pre-meds — Penn, Temple, Drexel, Jefferson, Villanova. Biology specialists, ET evening slots. From $499.',
    keywords: [
      'MCAT Biology tutor Philadelphia',
      'MCAT Bio tutor UPenn',
      'MCAT Biology tutor Temple',
      'MCAT Biology tutor Drexel',
      'MCAT Biology tutor Jefferson',
      'MCAT Biology tutor Villanova',
      'MCAT tutor Cherry Hill NJ',
      'MCAT tutor King of Prussia',
      'MCAT Bio/Biochem tutor Philly',
      'Indian American MCAT tutor Philadelphia',
      'online MCAT Biology coaching Philadelphia',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for Penn, Temple, Drexel, Jefferson, and Villanova pre-meds — built around the Cherry Hill / King of Prussia / Bucks County South Asian corridor. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Eastern Time evening sessions, $499 to $1,499.',
    whySection: {
      heading: 'Why Philadelphia has the densest medical-school concentration in the US',
      paragraphs: [
        'Philadelphia has more medical schools per capita than any other US city. The Perelman School of Medicine (Penn), Lewis Katz School of Medicine (Temple), Drexel University College of Medicine, Sidney Kimmel Medical College (Jefferson), and the Philadelphia College of Osteopathic Medicine (PCOM) are all within city limits — five medical schools in one metro.',
        'The South Asian pre-med community concentrates in Cherry Hill (NJ), King of Prussia, Bucks County, and the Main Line suburbs. Corporate and pharmaceutical-sector families (GSK, Merck, Comcast) drive consistent pre-med demand. The proximity to New Jersey (Edison / Princeton is 60 minutes) creates a shared pre-med corridor with the NYC/NJ market.',
      ],
    },
    universities: [
      {
        name: 'University of Pennsylvania',
        programmes: 'Biology, Biochemistry, Neuroscience (Perelman SOM feeder)',
      },
      {
        name: 'Temple University',
        programmes: 'Biology, Biochemistry, Neuroscience (Lewis Katz SOM feeder)',
      },
      {
        name: 'Drexel University',
        programmes: 'Biology, Biochemistry (Drexel COM feeder, co-op programme)',
      },
      {
        name: 'Thomas Jefferson University',
        programmes: 'Pre-med post-bac, Sidney Kimmel Medical College',
      },
      { name: 'Villanova University', programmes: 'Biology, Biochemistry, Comprehensive Science' },
      {
        name: 'Swarthmore / Haverford / Bryn Mawr',
        programmes: 'Biology, Biochemistry, Neuroscience (Tri-Co consortium)',
      },
    ],
    timezoneSection:
      'All live sessions are in Eastern Time. Standard Philly small-batch slot is 7:30 PM to 9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options. Senior Faculty 1:1 can be scheduled at any ET slot.',
    demographicSection: {
      heading: 'Cherry Hill / King of Prussia / Main Line — the family planning conversation',
      paragraphs: [
        'Cherry Hill (NJ) and the King of Prussia / Main Line corridor have the highest South Asian household densities in the Philadelphia metro. The pharmaceutical industry presence (GSK, Merck, Johnson & Johnson nearby) shapes the pre-med culture — many families have pharma/biotech connections.',
        'What we hear from Philly parents: (1) Penn is the primary target and requires 520+ for Perelman; (2) Temple and Jefferson are strong in-state/local options at 510–515; (3) the Drexel co-op programme creates a non-standard MCAT timeline. We structure the consultation around the target school and Drexel co-op vs standard schedule.',
      ],
    },
    faqs: [
      {
        question: 'Penn undergrad with research — how do we fit MCAT prep?',
        answer:
          "Penn Biology and Biochemistry concentrators typically have significant research commitments at Penn Medicine or CHOP. We split the timeline: Self-Paced async during the semester, then concentrated Small-Batch + 1:1 during summer. Penn's pre-med advising office recommends taking the MCAT summer after junior year — we align with this standard timeline.",
      },
      {
        question: 'Temple or Drexel pre-meds — different from Penn?',
        answer:
          "Temple and Drexel pre-meds typically have more in-semester study time than Penn students. Drexel's co-op programme creates alternating study/work semesters — MCAT prep during a co-op term (lighter academic load) is often ideal. We calibrate the schedule based on the co-op cycle.",
      },
      {
        question:
          'My family is in Cherry Hill / King of Prussia — what is the planning conversation?',
        answer:
          'The consultation covers: (a) which university (Penn, Temple, Drexel, Villanova, Tri-Co schools), (b) target school tier (Perelman at 520+ vs Temple/Jefferson at 510+ vs PCOM DO at 505+), (c) gap year or summer timeline. For Cherry Hill families, the proximity to Edison NJ means our NJ-area community is also relevant.',
      },
      {
        question: 'Swarthmore / Haverford / Bryn Mawr pre-meds?',
        answer:
          'The Tri-College Consortium pre-meds are typically strong academically but face the small-college challenge: fewer research opportunities on campus. We help Tri-Co students supplement with Penn Medicine or CHOP research access. MCAT prep follows the standard liberal-arts-college timeline — gap year is common.',
      },
      {
        question: 'How does Cerebrum compare to Philly-area MCAT prep providers?',
        answer:
          'Philadelphia has the standard full-MCAT generalists ($2,500–$3,000) plus boutique tutors in University City / Center City at $150–$225/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty. Our Small-Batch is $999 vs generalist $2,700. Many Philly students pair us with a generalist for C/P and CARS.',
      },
    ],
  },
  'san-diego': {
    slug: 'san-diego',
    city: 'San Diego',
    stateOrRegion: 'San Diego Metro',
    stateCode: 'CA',
    timezone: 'Pacific Time',
    timezoneShort: 'PT',
    metaTitle: 'MCAT Biology Tutor San Diego | UC San Diego, USD, SDSU',
    metaDescription:
      'MCAT Bio/Biochem tutor for San Diego pre-meds — UC San Diego, University of San Diego, SDSU, UCSD School of Medicine. Biology specialists, PT evening slots. From $499.',
    keywords: [
      'MCAT Biology tutor San Diego',
      'MCAT Bio tutor UC San Diego',
      'MCAT Biology tutor UCSD',
      'MCAT Biology tutor USD',
      'MCAT Biology tutor SDSU',
      'MCAT tutor Mira Mesa',
      'MCAT tutor La Jolla',
      'MCAT Bio/Biochem tutor San Diego',
      'Indian American MCAT tutor San Diego',
      'online MCAT Biology coaching San Diego',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for UC San Diego, University of San Diego, and SDSU pre-meds, with the UCSD School of Medicine research corridor in La Jolla as the anchor — built around the Mira Mesa / Scripps Ranch / Rancho Peñasquitos South Asian community. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Pacific Time evening sessions, $499 to $1,499.',
    whySection: {
      heading: 'Why San Diego is a top-tier biomedical research pre-med market',
      paragraphs: [
        'San Diego pairs a strong undergraduate pipeline with one of the densest life-sciences research clusters in the US. UC San Diego sits at the center, with the UC San Diego School of Medicine and the surrounding La Jolla Mesa institutions (Salk Institute, Scripps Research, Sanford Burnham Prebys) giving undergraduates unusually deep access to wet-lab and clinical-research experience.',
        'Beyond UCSD, the University of San Diego and San Diego State University add a substantial pre-med undergraduate base. The South Asian community concentrates in Mira Mesa, Scripps Ranch, and Rancho Peñasquitos, where pre-med culture is well established and MCAT planning typically begins during sophomore year of college.',
      ],
    },
    universities: [
      {
        name: 'UC San Diego',
        programmes:
          'Molecular & Cell Biology, Human Biology, Biochemistry/Cell Biology, Neurobiology',
      },
      {
        name: 'UC San Diego School of Medicine',
        programmes: 'MD programme, undergraduate summer research, La Jolla Mesa clinical rotations',
      },
      {
        name: 'University of San Diego (USD)',
        programmes: 'Biology, Biochemistry, Behavioral Neuroscience (pre-health advising)',
      },
      {
        name: 'San Diego State University (SDSU)',
        programmes: 'Biology, Cell & Molecular Biology, Microbiology',
      },
      {
        name: 'Point Loma Nazarene University',
        programmes: 'Biology, Biochemistry, Pre-medical track',
      },
    ],
    timezoneSection:
      'All live sessions are in Pacific Time. Standard San Diego small-batch slot is 7:00 PM to 9:00 PM PT on weekday evenings, with 9:00 AM to 11:00 AM PT Saturday and Sunday options. This works around the typical UC San Diego afternoon lab schedule on the La Jolla campus. Senior Faculty 1:1 can be scheduled at any PT slot.',
    demographicSection: {
      heading: 'Mira Mesa / Scripps Ranch / Rancho Peñasquitos — the family planning conversation',
      paragraphs: [
        'The Mira Mesa / Scripps Ranch / Rancho Peñasquitos corridor (often grouped as the I-15 north corridor) has the highest South Asian household density in San Diego County, driven by the biotech and defense-tech employers in Sorrento Valley and the UTC area. Pre-med families here plan MCAT preparation 12 to 18 months ahead.',
        'What we hear from San Diego parents: (1) UC San Diego is the primary in-state target and the La Jolla research access shapes the timeline — students with active Salk or Scripps Research lab roles cannot run a normal in-semester study schedule; (2) UC medical schools across California (UCSD, UCLA, UCSF, UCI) require a competitive band for in-state admission; (3) many families weigh DO programmes as a parallel track. We structure the consultation around the student’s research calendar and target school tier.',
      ],
    },
    faqs: [
      {
        question:
          'UC San Diego undergrad with Salk or Scripps Research lab work — how do we fit MCAT prep?',
        answer:
          'UCSD Molecular & Cell Biology and Human Biology students with active research on the La Jolla Mesa (Salk Institute, Scripps Research, Sanford Burnham Prebys, or UCSD School of Medicine labs) often carry 15 to 20 hours per week of bench time. We split the timeline: Self-Paced async content during the quarter, then a concentrated Small-Batch + 1:1 block during summer or a gap year. UCSD’s quarter system means study blocks are more compressed than at semester schools, so we calibrate the load accordingly.',
      },
      {
        question: 'USD or SDSU pre-meds — how is the prep different from UC San Diego?',
        answer:
          'University of San Diego and SDSU pre-meds typically have lighter research loads and more in-semester study time than UCSD students, so we can often run a full Small-Batch programme during the school year, starting January for a summer test date. Both have solid biology departments, so the content baseline is strong — most of the work is AAMC passage strategy and biochemistry precision.',
      },
      {
        question: 'My family is in Mira Mesa / Scripps Ranch — what is the planning conversation?',
        answer:
          'The consultation covers: (a) which undergrad (UC San Diego, USD, SDSU, or an out-of-area UC), which determines course-load timing; (b) target school tier across the California UC medical schools versus DO options; (c) gap year or summer-after-junior-year timeline. For high school students in the I-15 corridor targeting BS/MD tracks, planning starts junior year.',
      },
      {
        question: 'DO schools as a parallel track from San Diego — do you coach for that?',
        answer:
          'Yes. The MCAT is the same exam for MD and DO applications. Our Bio/Biochem coaching targets the 510 to 520 range, which covers the competitive California UC MD band and DO programmes. We help families think through the parallel-track strategy during the planning consultation.',
      },
      {
        question: 'How does Cerebrum compare to San Diego-area MCAT prep providers?',
        answer:
          'San Diego has the standard full-MCAT generalists ($2,500–$3,000 for all four sections) plus La Jolla and UTC boutique tutors at $150–$250/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty. Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour. Many San Diego students pair us with a generalist for C/P and CARS.',
      },
    ],
  },

  baltimore: {
    slug: 'baltimore',
    city: 'Baltimore',
    stateOrRegion: 'Baltimore Metro',
    stateCode: 'MD',
    timezone: 'Eastern Time',
    timezoneShort: 'ET',
    metaTitle: 'MCAT Biology Tutor Baltimore | Johns Hopkins, UMBC, Maryland, Towson',
    metaDescription:
      'MCAT Bio/Biochem tutor for Baltimore pre-meds — Johns Hopkins, UMBC, University of Maryland, Towson, Johns Hopkins School of Medicine. Biology specialists, ET evening slots. From $499.',
    keywords: [
      'MCAT Biology tutor Baltimore',
      'MCAT Bio tutor Johns Hopkins',
      'MCAT Biology tutor UMBC',
      'MCAT Biology tutor University of Maryland',
      'MCAT Biology tutor Towson',
      'MCAT tutor Howard County',
      'MCAT tutor Columbia MD',
      'MCAT Bio/Biochem tutor Maryland',
      'Indian American MCAT tutor Baltimore',
      'online MCAT Biology coaching Baltimore',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for Johns Hopkins, UMBC, University of Maryland, and Towson pre-meds, anchored by the Johns Hopkins School of Medicine research corridor in East Baltimore — built around the Howard County / Columbia / Ellicott City South Asian community. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Eastern Time evening sessions, $499 to $1,499.',
    whySection: {
      heading: 'Why Baltimore is a research-heavy pre-med corridor',
      paragraphs: [
        'Baltimore is built around Johns Hopkins, one of the most research-intensive universities in the world. Johns Hopkins undergraduates and the Johns Hopkins School of Medicine in East Baltimore create an exceptional clinical and bench-research ecosystem, and the metro sits within easy reach of the NIH in Bethesda for summer and post-bac research.',
        'Beyond Hopkins, the University of Maryland, Baltimore County (UMBC) — known nationally for its Meyerhoff Scholars pipeline into the sciences — plus the University of Maryland (College Park, just southwest) and Towson University add a deep pre-med undergraduate base. The South Asian community concentrates in Howard County (Columbia, Ellicott City), one of the highest-density South Asian areas in the mid-Atlantic, where MCAT planning typically begins during sophomore year.',
      ],
    },
    universities: [
      {
        name: 'Johns Hopkins University',
        programmes:
          'Molecular & Cellular Biology, Biophysics, Neuroscience, Biomedical Engineering',
      },
      {
        name: 'Johns Hopkins School of Medicine',
        programmes:
          'MD programme, East Baltimore research rotations, undergraduate summer research',
      },
      {
        name: 'University of Maryland, Baltimore County (UMBC)',
        programmes: 'Biological Sciences, Biochemistry & Molecular Biology, Meyerhoff Scholars',
      },
      {
        name: 'University of Maryland (College Park)',
        programmes: 'Biology, Biochemistry, Neuroscience, Cell Biology',
      },
      {
        name: 'Towson University',
        programmes:
          'Biology, Molecular Biology / Biochemistry / Bioinformatics, pre-health advising',
      },
    ],
    timezoneSection:
      'All live sessions are in Eastern Time. Standard Baltimore small-batch slot is 7:30 PM to 9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options. This works around the typical Johns Hopkins late-afternoon lab and the NIH-style 8 AM to 5 PM research schedule. Senior Faculty 1:1 can be scheduled at any ET slot.',
    demographicSection: {
      heading: 'Howard County / Columbia / Ellicott City — the family planning conversation',
      paragraphs: [
        'Howard County — Columbia and Ellicott City in particular — has one of the highest South Asian household densities in the mid-Atlantic, sitting between Baltimore and the DC/NIH corridor. Many families have biotech, federal-lab, or healthcare connections that shape how they read the medical-school application process.',
        'What we hear from Baltimore parents: (1) Johns Hopkins is the aspirational target and is among the most competitive medical schools in the country, so Bio/Biochem section precision matters; (2) UMBC (and its Meyerhoff pipeline) and the University of Maryland are strong in-state options; (3) NIH summer or post-bac research is often part of the plan and the MCAT timeline must fit around it. We structure the consultation around the research calendar and target school tier.',
      ],
    },
    faqs: [
      {
        question: 'Johns Hopkins undergrad with active research — how do we fit MCAT prep?',
        answer:
          'Johns Hopkins MCB, Biophysics, and Neuroscience concentrators frequently carry 15 to 25 hours per week of research at Homewood or the East Baltimore medical campus. We split the timeline: Self-Paced async content review during the semester, then a concentrated Small-Batch + 1:1 block in the summer or during a gap year. Many Hopkins pre-meds take a gap year and sit the MCAT post-graduation, so the bulk of prep happens then.',
      },
      {
        question: 'UMBC pre-meds, including Meyerhoff Scholars — how is the prep different?',
        answer:
          'UMBC pre-meds, including those in the Meyerhoff Scholars Program, typically have strong science foundations and structured research mentoring. We can run a full Small-Batch programme during the school year for students with more in-semester study time, focusing on AAMC passage strategy and biochemistry precision rather than ground-up content review.',
      },
      {
        question: 'My family is in Columbia / Ellicott City — what is the planning conversation?',
        answer:
          'The consultation covers: (a) which undergrad (Johns Hopkins, UMBC, University of Maryland, Towson), which sets the course-load timing; (b) target school tier from Johns Hopkins School of Medicine through the in-state Maryland options; (c) whether an NIH summer or post-bac research slot is part of the timeline. For Howard County high school students targeting BS/MD tracks, planning starts junior year.',
      },
      {
        question: 'University of Maryland or Towson pre-meds — can they join Baltimore sessions?',
        answer:
          'Yes — all sessions are online. University of Maryland (College Park) and Towson students join the same Eastern Time cohorts as Hopkins and UMBC pre-meds. The only practical difference is testing-center logistics, which we check during the diagnostic.',
      },
      {
        question: 'How does Cerebrum compare to Baltimore-area MCAT prep providers?',
        answer:
          'Baltimore has the standard full-MCAT generalists ($2,500–$3,000 for all four sections) plus boutique tutors around Homewood and Charles Village at $150–$250/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty. Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour. Many Baltimore students pair us with a generalist for C/P and CARS.',
      },
    ],
  },

  cleveland: {
    slug: 'cleveland',
    city: 'Cleveland',
    stateOrRegion: 'Cleveland Metro',
    stateCode: 'OH',
    timezone: 'Eastern Time',
    timezoneShort: 'ET',
    metaTitle: 'MCAT Biology Tutor Cleveland | Case Western, Cleveland State, Cleveland Clinic',
    metaDescription:
      'MCAT Bio/Biochem tutor for Cleveland pre-meds — Case Western Reserve, Cleveland State, Cleveland Clinic Lerner College of Medicine, CWRU School of Medicine. Biology specialists, ET evening slots. From $499.',
    keywords: [
      'MCAT Biology tutor Cleveland',
      'MCAT Bio tutor Case Western',
      'MCAT Biology tutor CWRU',
      'MCAT Biology tutor Cleveland State',
      'MCAT Biology tutor Cleveland Clinic Lerner',
      'MCAT tutor Solon Ohio',
      'MCAT tutor Westlake Ohio',
      'MCAT Bio/Biochem tutor Cleveland',
      'Indian American MCAT tutor Cleveland',
      'online MCAT Biology coaching Cleveland',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for Case Western Reserve and Cleveland State pre-meds, anchored by the University Circle medical corridor — the CWRU School of Medicine and the Cleveland Clinic Lerner College of Medicine — and built around the Solon / Westlake / Strongsville South Asian community. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Eastern Time evening sessions, $499 to $1,499.',
    whySection: {
      heading: 'Why Cleveland is a clinical-research pre-med anchor',
      paragraphs: [
        'Cleveland’s pre-med ecosystem centers on University Circle, where Case Western Reserve University, the CWRU School of Medicine, the Cleveland Clinic Lerner College of Medicine, and University Hospitals cluster within walking distance. The Cleveland Clinic and University Hospitals give undergraduates unusually direct access to clinical research and shadowing.',
        'Case Western Reserve is the dominant undergraduate feeder, with Cleveland State University adding a strong public pre-med base. The South Asian community concentrates in the eastern and western suburbs — Solon, Beachwood, Westlake, and Strongsville — where pre-med culture is well established and MCAT planning typically begins during sophomore year.',
      ],
    },
    universities: [
      {
        name: 'Case Western Reserve University',
        programmes: 'Biology, Biochemistry, Neuroscience, Systems Biology',
      },
      {
        name: 'CWRU School of Medicine',
        programmes: 'MD programme, University Circle research rotations, undergraduate research',
      },
      {
        name: 'Cleveland Clinic Lerner College of Medicine',
        programmes: 'Research-focused MD programme (CWRU), clinical research training',
      },
      {
        name: 'Cleveland State University',
        programmes: 'Biology, Molecular Biology, pre-medical track',
      },
      {
        name: 'John Carroll University',
        programmes: 'Biology, Biochemistry, pre-health professions advising',
      },
    ],
    timezoneSection:
      'All live sessions are in Eastern Time. Standard Cleveland small-batch slot is 7:30 PM to 9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options. This works around the typical Case Western Reserve late-afternoon lab and University Circle clinical-research schedule. Senior Faculty 1:1 can be scheduled at any ET slot.',
    demographicSection: {
      heading: 'Solon / Beachwood / Westlake — the family planning conversation',
      paragraphs: [
        'The eastern suburbs (Solon, Beachwood, Pepper Pike) and the western suburbs (Westlake, Strongsville) have the highest South Asian household densities in Greater Cleveland, supported by the Cleveland Clinic, University Hospitals, and the regional healthcare and manufacturing economy. Pre-med families here plan MCAT preparation 12 to 18 months ahead.',
        'What we hear from Cleveland parents: (1) Case Western Reserve and its University Circle medical institutions are the primary local targets, and the Cleveland Clinic Lerner research-MD track has a distinctive profile; (2) the proximity of the Cleveland Clinic and University Hospitals makes clinical and research experience easy to obtain, so the MCAT timeline often has to fit around active research; (3) families weigh in-state Ohio options alongside national programmes. We structure the consultation around the student’s research calendar and target school tier.',
      ],
    },
    faqs: [
      {
        question:
          'Case Western Reserve undergrad with University Circle research — how do we fit MCAT prep?',
        answer:
          'CWRU Biology, Biochemistry, and Neuroscience concentrators with active research at the CWRU School of Medicine, the Cleveland Clinic, or University Hospitals often carry 15 to 20 hours per week of lab or clinical-research time. We split the timeline: Self-Paced async content during the semester, then a concentrated Small-Batch + 1:1 block during summer or a gap year, with the bulk of prep in the lighter-load window.',
      },
      {
        question:
          'Cleveland Clinic Lerner College of Medicine — does the research-MD track change the prep?',
        answer:
          'The Lerner College of Medicine is a research-focused MD programme run with Case Western Reserve, and it still requires a competitive MCAT score. The Bio/Biochem coaching itself is the same; what differs is the application strategy and the way research experience is framed. We coach the section and let families handle the research-narrative side with their pre-med advising office.',
      },
      {
        question: 'My family is in Solon / Westlake — what is the planning conversation?',
        answer:
          'The consultation covers: (a) which undergrad (Case Western Reserve, Cleveland State, John Carroll, or an out-of-area school), which sets the course-load timing; (b) target school tier from the CWRU and Lerner programmes through in-state Ohio options; (c) gap year or summer-after-junior-year timeline. For suburban high school students targeting BS/MD tracks, planning starts junior year.',
      },
      {
        question: 'Cleveland State pre-meds — how is the prep different from Case Western Reserve?',
        answer:
          'Cleveland State pre-meds typically have lighter research loads and more in-semester study time than Case Western Reserve students, so we can often run a full Small-Batch programme during the school year. Cleveland State has a solid biology department, so the work is mostly AAMC passage strategy and biochemistry precision rather than ground-up content review.',
      },
      {
        question: 'How does Cerebrum compare to Cleveland-area MCAT prep providers?',
        answer:
          'Cleveland has the standard full-MCAT generalists ($2,500–$3,000 for all four sections) plus University Circle and east-side boutique tutors at $150–$225/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty. Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour. Many Cleveland students pair us with a generalist for C/P and CARS.',
      },
    ],
  },

  'ann-arbor': {
    slug: 'ann-arbor',
    city: 'Ann Arbor',
    stateOrRegion: 'Ann Arbor / Southeast Michigan',
    stateCode: 'MI',
    timezone: 'Eastern Time',
    timezoneShort: 'ET',
    metaTitle: 'MCAT Biology Tutor Ann Arbor | University of Michigan, Michigan Medicine',
    metaDescription:
      'MCAT Bio/Biochem tutor for Ann Arbor pre-meds — University of Michigan, Michigan Medicine, with nearby Wayne State. Biology specialists, ET evening slots. From $499.',
    keywords: [
      'MCAT Biology tutor Ann Arbor',
      'MCAT Bio tutor University of Michigan',
      'MCAT Biology tutor U of M',
      'MCAT Biology tutor Michigan Medicine',
      'MCAT Biology tutor Wayne State',
      'MCAT tutor Novi Michigan',
      'MCAT tutor Canton Michigan',
      'MCAT Bio/Biochem tutor Michigan',
      'Indian American MCAT tutor Ann Arbor',
      'online MCAT Biology coaching Ann Arbor',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for University of Michigan pre-meds, anchored by Michigan Medicine in Ann Arbor, with nearby Wayne State University in the picture for Southeast Michigan families — built around the Novi / Canton / Northville South Asian community. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Eastern Time evening sessions, $499 to $1,499.',
    whySection: {
      heading: 'Why Ann Arbor is a flagship-university pre-med market',
      paragraphs: [
        'Ann Arbor is defined by the University of Michigan, one of the largest research universities in the country, and by Michigan Medicine — the university’s academic medical center and the University of Michigan Medical School. The concentration of research labs and the U-M Medical School in a single college town gives undergraduates exceptional access to bench and clinical research.',
        'The University of Michigan is the dominant pre-med feeder, and nearby Wayne State University in Detroit adds a large urban pre-med base for Southeast Michigan students. The South Asian community concentrates in the western Wayne and Oakland County suburbs — Novi, Canton, Northville, and Troy — where pre-med culture is well established and MCAT planning typically begins during sophomore year.',
      ],
    },
    universities: [
      {
        name: 'University of Michigan',
        programmes:
          'Molecular, Cellular & Developmental Biology; Biochemistry; Neuroscience; Cellular & Molecular Biomedical Science',
      },
      {
        name: 'Michigan Medicine (U-M Medical School)',
        programmes: 'MD programme, undergraduate research, academic medical center rotations',
      },
      {
        name: 'Wayne State University (Detroit)',
        programmes: 'Biological Sciences, Biochemistry, Wayne State School of Medicine pathway',
      },
      {
        name: 'Eastern Michigan University',
        programmes: 'Biology, Biochemistry, pre-medical advising',
      },
    ],
    timezoneSection:
      'All live sessions are in Eastern Time. Standard Ann Arbor small-batch slot is 7:30 PM to 9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options. This works around the typical University of Michigan late-afternoon lab and Michigan Medicine research schedule. Senior Faculty 1:1 can be scheduled at any ET slot.',
    demographicSection: {
      heading: 'Novi / Canton / Northville — the family planning conversation',
      paragraphs: [
        'The western Wayne and Oakland County suburbs — Novi, Canton, Northville, and Troy — have the highest South Asian household densities in Southeast Michigan, supported by the automotive engineering and tech economy. These communities sit within a short drive of both Ann Arbor and Detroit, so families often weigh the University of Michigan against Wayne State. Pre-med planning typically starts 12 to 18 months ahead.',
        'What we hear from Ann Arbor and Southeast Michigan parents: (1) the University of Michigan is the flagship in-state target and Michigan Medicine research is a common part of the profile, which compresses in-semester study time; (2) Wayne State is a strong urban-medicine option for Detroit-area families; (3) the MCAT timeline has to fit around active U-M research. We structure the consultation around the research calendar and target school tier.',
      ],
    },
    faqs: [
      {
        question:
          'University of Michigan undergrad with Michigan Medicine research — how do we fit MCAT prep?',
        answer:
          'U-M MCDB, Biochemistry, and Neuroscience concentrators with active research in Michigan Medicine or LSA labs often carry 15 to 25 hours per week of bench time on top of a full course load. We split the timeline: Self-Paced async content during the semester, then a concentrated Small-Batch + 1:1 block during summer or a gap year. Many U-M pre-meds take a gap year and sit the MCAT post-graduation.',
      },
      {
        question: 'Wayne State pre-meds in Detroit — can they join Ann Arbor sessions?',
        answer:
          'Yes — all sessions are online, so Wayne State students join the same Eastern Time cohorts as University of Michigan pre-meds. Wayne State pre-meds often target the Wayne State School of Medicine and have strong urban clinical exposure; the Bio/Biochem coaching is the same, and we coordinate Detroit-area testing-center logistics during the diagnostic.',
      },
      {
        question: 'My family is in Novi / Canton / Northville — what is the planning conversation?',
        answer:
          'The consultation covers: (a) which undergrad (University of Michigan, Wayne State, Eastern Michigan, or out-of-state), which sets the course-load timing; (b) target school tier from Michigan Medicine through Wayne State and other options; (c) gap year or summer-after-junior-year timeline. For suburban high school students targeting BS/MD tracks, planning starts junior year.',
      },
      {
        question: 'How is the prep different for a U-M student versus a Wayne State student?',
        answer:
          'University of Michigan pre-meds usually start from a high content baseline after the MCDB and biochemistry sequences but have heavy research loads, so the work is passage strategy and scheduling around the lab. Wayne State pre-meds often have more in-semester study time, so a full Small-Batch programme during the school year is more feasible. We calibrate to the student’s course load and research commitments.',
      },
      {
        question: 'How does Cerebrum compare to Ann Arbor-area MCAT prep providers?',
        answer:
          'Ann Arbor and Southeast Michigan have the standard full-MCAT generalists ($2,500–$3,000 for all four sections) plus campus-area boutique tutors at $150–$225/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty. Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour. Many Michigan students pair us with a generalist for C/P and CARS.',
      },
    ],
  },

  columbus: {
    slug: 'columbus',
    city: 'Columbus',
    stateOrRegion: 'Columbus Metro',
    stateCode: 'OH',
    timezone: 'Eastern Time',
    timezoneShort: 'ET',
    metaTitle: 'MCAT Biology Tutor Columbus | Ohio State University, OSU College of Medicine',
    metaDescription:
      'MCAT Bio/Biochem tutor for Columbus pre-meds — Ohio State University and the OSU College of Medicine. Biology specialists, ET evening slots. From $499.',
    keywords: [
      'MCAT Biology tutor Columbus',
      'MCAT Bio tutor Ohio State',
      'MCAT Biology tutor OSU',
      'MCAT Biology tutor Ohio State University',
      'MCAT Biology tutor OSU College of Medicine',
      'MCAT tutor Dublin Ohio',
      'MCAT tutor Powell Ohio',
      'MCAT Bio/Biochem tutor Columbus',
      'Indian American MCAT tutor Columbus',
      'online MCAT Biology coaching Columbus',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for Ohio State University pre-meds, anchored by the OSU College of Medicine and Wexner Medical Center — built around the Dublin / Powell / New Albany South Asian community. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Eastern Time evening sessions, $499 to $1,499.',
    whySection: {
      heading: 'Why Columbus is a major flagship-university pre-med market',
      paragraphs: [
        'Columbus is built around Ohio State University, one of the largest universities in the US, with a very large pre-med undergraduate population. The OSU College of Medicine and the Wexner Medical Center sit on the same campus, giving undergraduates direct access to research labs, clinical shadowing, and a major academic medical center.',
        'Ohio State is the dominant pre-med feeder for the metro, producing a high volume of MCAT candidates each year. The South Asian community concentrates in the northern and northwestern suburbs — Dublin, Powell, New Albany, and Hilliard — where pre-med culture is well established and MCAT planning typically begins during sophomore year.',
      ],
    },
    universities: [
      {
        name: 'Ohio State University',
        programmes: 'Biology, Biochemistry, Neuroscience, Molecular Genetics, Microbiology',
      },
      {
        name: 'OSU College of Medicine',
        programmes:
          'MD programme, Wexner Medical Center research rotations, undergraduate research',
      },
      {
        name: 'Capital University',
        programmes: 'Biology, Biochemistry, pre-medical advising',
      },
      {
        name: 'Otterbein University',
        programmes: 'Biology, Biochemistry & Molecular Biology, pre-health professions',
      },
    ],
    timezoneSection:
      'All live sessions are in Eastern Time. Standard Columbus small-batch slot is 7:30 PM to 9:30 PM ET on weekday evenings, with 9:00 AM to 11:00 AM ET Saturday and Sunday options. This works around the typical Ohio State late-afternoon lab and Wexner Medical Center research schedule. Senior Faculty 1:1 can be scheduled at any ET slot.',
    demographicSection: {
      heading: 'Dublin / Powell / New Albany — the family planning conversation',
      paragraphs: [
        'The northern and northwestern suburbs — Dublin, Powell, New Albany, and Hilliard — have the highest South Asian household densities in the Columbus metro, supported by the healthcare, insurance, and tech employers in the region. Pre-med culture is strong in the Dublin and Olentangy school systems. Pre-med families here plan MCAT preparation 12 to 18 months ahead.',
        'What we hear from Columbus parents: (1) Ohio State is the primary target — in-state tuition and the OSU College of Medicine pipeline make it the clear first choice for many Ohio residents; (2) the Wexner Medical Center makes clinical and research experience accessible, so the MCAT timeline often has to fit around active research; (3) families weigh OSU against out-of-state national programmes. We structure the consultation around the student’s research calendar and target school tier.',
      ],
    },
    faqs: [
      {
        question:
          'Ohio State undergrad with Wexner Medical Center research — how do we fit MCAT prep?',
        answer:
          'Ohio State Biology, Biochemistry, and Neuroscience concentrators with active research in OSU College of Medicine or Wexner Medical Center labs often carry 12 to 20 hours per week of research time on top of a full course load. We split the timeline: Self-Paced async content during the semester, then a concentrated Small-Batch + 1:1 block during summer or a gap year, with the bulk of prep in the lighter-load window.',
      },
      {
        question: 'OSU College of Medicine target — how should an Ohio State student plan?',
        answer:
          'The OSU College of Medicine is a competitive in-state target, and many Ohio State undergraduates aim to stay in the OSU system. Our coaching focuses on Bio/Biochem section optimization. Many Columbus students pair Cerebrum (Bio/Biochem specialist) with a generalist for C/P and CARS to build a competitive composite.',
      },
      {
        question: 'My family is in Dublin / Powell — what is the planning conversation?',
        answer:
          'The consultation covers: (a) which undergrad (Ohio State, Capital, Otterbein, or out-of-state), which sets the course-load timing; (b) target school tier from the OSU College of Medicine through out-of-state options; (c) gap year or summer-after-junior-year timeline. For Dublin and Olentangy high school students targeting BS/MD tracks, planning starts junior year.',
      },
      {
        question: 'Capital or Otterbein pre-meds — how is the prep different from Ohio State?',
        answer:
          'Capital and Otterbein pre-meds typically have smaller class sizes and lighter research loads than Ohio State students, so we can often run a full Small-Batch programme during the school year. Both have solid biology departments; the work is mostly AAMC passage strategy and biochemistry precision. We help smaller-college students supplement with OSU or Wexner research access where helpful.',
      },
      {
        question: 'How does Cerebrum compare to Columbus-area MCAT prep providers?',
        answer:
          'Columbus has the standard full-MCAT generalists ($2,500–$3,000 for all four sections) plus campus-area boutique tutors at $150–$200/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty. Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour. Many Columbus students pair us with a generalist for C/P and CARS.',
      },
    ],
  },

  'st-louis': {
    slug: 'st-louis',
    city: 'St. Louis',
    stateOrRegion: 'St. Louis Metro',
    stateCode: 'MO',
    timezone: 'Central Time',
    timezoneShort: 'CT',
    metaTitle: 'MCAT Biology Tutor St. Louis | WashU, Saint Louis University, WashU SOM',
    metaDescription:
      'MCAT Bio/Biochem tutor for St. Louis pre-meds — Washington University in St. Louis, Saint Louis University, WashU School of Medicine. Biology specialists, CT evening slots. From $499.',
    keywords: [
      'MCAT Biology tutor St. Louis',
      'MCAT Bio tutor WashU',
      'MCAT Biology tutor Washington University in St. Louis',
      'MCAT Biology tutor Saint Louis University',
      'MCAT Biology tutor SLU',
      'MCAT tutor Chesterfield MO',
      'MCAT tutor Ballwin MO',
      'MCAT Bio/Biochem tutor St. Louis',
      'Indian American MCAT tutor St. Louis',
      'online MCAT Biology coaching St. Louis',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for Washington University in St. Louis and Saint Louis University pre-meds, anchored by the WashU School of Medicine in the Central West End medical corridor — built around the Chesterfield / Ballwin / West County South Asian community. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Central Time evening sessions, $499 to $1,499.',
    whySection: {
      heading: 'Why St. Louis is a research-intensive pre-med market',
      paragraphs: [
        'St. Louis pairs two strong pre-med universities with a major academic medical corridor. Washington University in St. Louis is one of the most research-intensive private universities in the country, and the WashU School of Medicine, with Barnes-Jewish Hospital and St. Louis Children’s Hospital in the Central West End, gives undergraduates exceptional bench and clinical-research access.',
        'Saint Louis University, a Jesuit institution with its own School of Medicine, adds a substantial pre-med undergraduate base. The South Asian community concentrates in West County — Chesterfield, Ballwin, Wildwood, and Town and Country — where pre-med culture is well established and MCAT planning typically begins during sophomore year.',
      ],
    },
    universities: [
      {
        name: 'Washington University in St. Louis',
        programmes: 'Biology, Biochemistry, Neuroscience, Biomedical Engineering',
      },
      {
        name: 'WashU School of Medicine',
        programmes: 'MD programme, Central West End research rotations, undergraduate research',
      },
      {
        name: 'Saint Louis University (SLU)',
        programmes: 'Biology, Biochemistry, Neuroscience (SLU School of Medicine pathway)',
      },
      {
        name: 'University of Missouri–St. Louis (UMSL)',
        programmes: 'Biology, Biochemistry & Biotechnology, pre-medical advising',
      },
    ],
    timezoneSection:
      'All live sessions are in Central Time. Standard St. Louis small-batch slot is 7:00 PM to 9:00 PM CT on weekday evenings, with 9:00 AM to 11:00 AM CT Saturday and Sunday options. This works around the typical Washington University late-afternoon lab and Central West End clinical-research schedule. Senior Faculty 1:1 can be scheduled at any CT slot.',
    demographicSection: {
      heading: 'Chesterfield / Ballwin / West County — the family planning conversation',
      paragraphs: [
        'West County — Chesterfield, Ballwin, Wildwood, and Town and Country — has the highest South Asian household density in the St. Louis metro, supported by the healthcare, biotech, and engineering employers in the region. Pre-med culture is strong in the Rockwood and Parkway school systems. Pre-med families here plan MCAT preparation 12 to 18 months ahead.',
        'What we hear from St. Louis parents: (1) Washington University in St. Louis is the aspirational target and is among the most research-intensive and competitive programmes in the country, so Bio/Biochem precision matters; (2) Saint Louis University is a strong option with its own School of Medicine pathway; (3) the WashU School of Medicine and the Central West End hospitals make research experience accessible, so the MCAT timeline often has to fit around active research. We structure the consultation around the research calendar and target school tier.',
      ],
    },
    faqs: [
      {
        question:
          'Washington University in St. Louis undergrad with research — how do we fit MCAT prep?',
        answer:
          'WashU Biology, Biochemistry, and Neuroscience concentrators with active research at the WashU School of Medicine or Central West End hospitals often carry 15 to 25 hours per week of bench time on top of a full course load. We split the timeline: Self-Paced async content during the semester, then a concentrated Small-Batch + 1:1 block during summer or a gap year. Many WashU pre-meds take a gap year and sit the MCAT post-graduation.',
      },
      {
        question: 'Saint Louis University pre-meds — how is the prep different from WashU?',
        answer:
          'Saint Louis University pre-meds typically have more in-semester study time than WashU students and a clear in-system pathway toward the SLU School of Medicine. We can often run a full Small-Batch programme during the school year for SLU students. SLU has a strong biology department, so the work is mostly AAMC passage strategy and biochemistry precision.',
      },
      {
        question: 'My family is in Chesterfield / Ballwin — what is the planning conversation?',
        answer:
          'The consultation covers: (a) which undergrad (Washington University in St. Louis, Saint Louis University, UMSL, or out-of-state), which sets the course-load timing; (b) target school tier from the WashU and SLU programmes through out-of-state options; (c) gap year or summer-after-junior-year timeline. For Rockwood and Parkway high school students targeting BS/MD tracks, planning starts junior year.',
      },
      {
        question: 'UMSL pre-meds — can they join St. Louis sessions?',
        answer:
          'Yes — all sessions are online, so University of Missouri–St. Louis students join the same Central Time cohorts as WashU and SLU pre-meds. UMSL pre-meds typically have more in-semester study time, so a full Small-Batch programme during the school year is feasible. We coordinate testing-center logistics during the diagnostic.',
      },
      {
        question: 'How does Cerebrum compare to St. Louis-area MCAT prep providers?',
        answer:
          'St. Louis has the standard full-MCAT generalists ($2,500–$3,000 for all four sections) plus Central West End and West County boutique tutors at $150–$225/hour. Cerebrum is a biology-section specialist — Bio/Biochem only, AIIMS-trained faculty. Our Small-Batch is $999 vs generalist $2,700; ad-hoc 1:1 is $150/hour. Many St. Louis students pair us with a generalist for C/P and CARS.',
      },
    ],
  },

  // ─── CANADA ─────────────────────────────────────────────────────────────────
  toronto: {
    slug: 'toronto',
    city: 'Toronto',
    stateOrRegion: 'Greater Toronto Area',
    stateCode: 'ON',
    countryCode: 'CA',
    timezone: 'Eastern Time',
    timezoneShort: 'ET',
    metaTitle: "MCAT Biology Tutor Toronto | U of T, McMaster, Western, Queen's",
    metaDescription:
      "MCAT Bio/Biochem tutor for Toronto pre-meds — University of Toronto, McMaster, Western, Queen's. Biology specialists, ET evening slots. From $499 USD.",
    keywords: [
      'MCAT Biology tutor Toronto',
      'MCAT Bio tutor University of Toronto',
      'MCAT Biology tutor McMaster',
      'MCAT tutor GTA',
      'MCAT tutor Brampton',
      'MCAT tutor Mississauga',
      'MCAT Bio/Biochem tutor Ontario',
      'Indian Canadian MCAT tutor Toronto',
      'online MCAT Biology coaching Toronto',
    ],
    heroSubtitle:
      "MCAT Bio/Biochem coaching for University of Toronto, McMaster, Western, and Queen's pre-meds — built around the Brampton / Mississauga / Scarborough South Asian corridor. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Eastern Time evening sessions, $499 to $1,499 USD.",
    whySection: {
      heading: "Why Toronto is Canada's largest pre-med market",
      paragraphs: [
        "The Greater Toronto Area anchors the largest concentration of medical school applicants in Canada. University of Toronto Faculty of Medicine, McMaster's Michael G. DeGroote School of Medicine (Hamilton, 60 km west), and Western University (London, ON) collectively accept the majority of Ontario medical students. The MCAT is required by all Ontario medical schools except McMaster (which uses CASPer + CARS only).",
        'The GTA South Asian community — concentrated in Brampton, Mississauga, Scarborough, and Markham — is one of the largest in North America. Pre-med culture is strong in these communities, with MCAT preparation planning starting during sophomore year at U of T, McMaster, York, or Ryerson (now Toronto Metropolitan).',
      ],
    },
    universities: [
      {
        name: 'University of Toronto',
        programmes: 'Life Sciences, Biochemistry, Human Biology, Molecular Genetics',
      },
      {
        name: 'McMaster University (Hamilton)',
        programmes: 'Life Sciences, Biochemistry, Health Sciences (BHSc)',
      },
      {
        name: 'Western University (London, ON)',
        programmes: 'Medical Sciences, Biochemistry, Biology',
      },
      { name: "Queen's University (Kingston)", programmes: 'Life Sciences, Biochemistry' },
      { name: 'York University', programmes: 'Biology, Kinesiology, Biomedical Science' },
      { name: 'Toronto Metropolitan University', programmes: 'Biology, Biomedical Sciences' },
    ],
    timezoneSection:
      'All live sessions are in Eastern Time. Standard Toronto small-batch slot is 7:30 PM to 9:30 PM ET on weekday evenings. Weekend: 9:00 AM to 11:00 AM ET. This aligns with US ET scheduling — many Toronto students join sessions alongside NYC, Boston, and DC cohorts.',
    demographicSection: {
      heading: 'Brampton / Mississauga / Scarborough — the family planning conversation',
      paragraphs: [
        'The Brampton / Mississauga South Asian corridor has one of the highest Indian-Canadian household densities in North America. Combined with the Scarborough and Markham communities, this creates a concentrated pre-med pipeline.',
        "What we hear from GTA parents: (1) U of T and McMaster are the primary targets; (2) Ontario medical schools have unique requirements (MCAT for U of T/Western/Queen's, CARS-only for McMaster); (3) many families also keep US medical school options open, requiring full MCAT Bio/Biochem prep. We structure the consultation around whether the student targets Canada-only or dual US/Canada applications.",
      ],
    },
    faqs: [
      {
        question: 'U of T or McMaster pre-med — how does MCAT prep differ?',
        answer:
          "McMaster's BHSc and Health Sciences programmes are intensely competitive. McMaster medical school uses CASPer + CARS only (no Bio/Biochem required). U of T, Western, and Queen's require full MCAT including Bio/Biochem. If your student targets McMaster only, focus on CARS; if targeting U of T/Western/Queen's or US schools, full Bio/Biochem prep is essential.",
      },
      {
        question: 'My family is in Brampton / Mississauga — planning conversation?',
        answer:
          'The consultation covers: (a) target medical schools (Ontario only vs US dual-track), (b) MCAT section requirements (Bio/Biochem needed for all except McMaster), (c) timeline (summer after 3rd year typical). For Brampton/Mississauga families keeping US options open, full Bio/Biochem prep is recommended.',
      },
      {
        question: 'Can Toronto students join US small-batch sessions?',
        answer:
          'Yes — same Eastern Time zone. Toronto students join alongside NYC, Boston, and DC cohorts. This provides richer peer interaction and exposure to both Canadian and US medical school application contexts.',
      },
      {
        question: 'Do you accept CAD payment?',
        answer:
          'Yes — CAD via Canadian bank transfer (TD, RBC, Scotiabank, BMO, CIBC) or international Visa/Mastercard. USD also accepted. Prices listed in USD; CAD equivalent at current exchange rate.',
      },
      {
        question: 'How does Cerebrum compare to Canadian MCAT prep?',
        answer:
          'Canadian MCAT providers (Prep101, Princeton Review Canada) charge $1,500–$3,000 CAD for all sections. Cerebrum is a biology-section specialist at $499–$1,499 USD (~$680–$2,040 CAD) for Bio/Biochem only. Many Toronto students pair us with a generalist for C/P and CARS.',
      },
    ],
  },

  vancouver: {
    slug: 'vancouver',
    city: 'Vancouver',
    stateOrRegion: 'Greater Vancouver',
    stateCode: 'BC',
    countryCode: 'CA',
    timezone: 'Pacific Time',
    timezoneShort: 'PT',
    metaTitle: 'MCAT Biology Tutor Vancouver | UBC, SFU, UVic',
    metaDescription:
      'MCAT Bio/Biochem tutor for Vancouver pre-meds — UBC, SFU, University of Victoria. Biology specialists, PT evening slots. From $499 USD.',
    keywords: [
      'MCAT Biology tutor Vancouver',
      'MCAT Bio tutor UBC',
      'MCAT Biology tutor SFU',
      'MCAT tutor Surrey BC',
      'MCAT tutor Burnaby',
      'MCAT Bio/Biochem tutor BC',
      'Indian Canadian MCAT tutor Vancouver',
      'online MCAT Biology coaching Vancouver',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for UBC, SFU, and UVic pre-meds — built around the Surrey / Burnaby / Richmond South Asian corridor. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Pacific Time evening sessions, $499 to $1,499 USD.',
    whySection: {
      heading: "Why Vancouver is Western Canada's pre-med anchor",
      paragraphs: [
        'Vancouver is built around UBC Faculty of Medicine — the largest medical school in Western Canada and one of the most competitive in the country. SFU (Simon Fraser University) and UVic (University of Victoria) provide additional pre-med undergraduate pipelines. UBC requires full MCAT including Bio/Biochem.',
        'The Surrey / Burnaby / Richmond South Asian corridor has a rapidly growing Indian-Canadian community driven by tech, healthcare, and professional services. Pre-med culture is strong, with many families maintaining dual Canada/US medical school application strategies.',
      ],
    },
    universities: [
      {
        name: 'University of British Columbia (UBC)',
        programmes: 'Biology, Biochemistry, Microbiology, Integrated Sciences',
      },
      {
        name: 'Simon Fraser University (SFU)',
        programmes: 'Molecular Biology & Biochemistry, Biomedical Physiology & Kinesiology',
      },
      { name: 'University of Victoria (UVic)', programmes: 'Biology, Biochemistry, Microbiology' },
    ],
    timezoneSection:
      'All live sessions are in Pacific Time. Standard Vancouver small-batch slot is 7:00 PM to 9:00 PM PT on weekday evenings. Weekend: 9:00 AM to 11:00 AM PT. Vancouver students share the PT timezone with Seattle and Bay Area cohorts.',
    demographicSection: {
      heading: 'Surrey / Burnaby / Richmond — the family planning conversation',
      paragraphs: [
        'Surrey and Burnaby have the highest South Asian household densities in British Columbia. Many families target UBC Medicine as the primary goal, with US medical schools (University of Washington WWAMI, UCSF) as secondary options.',
        'What we hear from Vancouver parents: (1) UBC Medicine is extremely competitive (median MCAT ~517); (2) the BC residency advantage is significant for in-province applicants; (3) many students do research at BC Cancer Agency or VGH. We structure the consultation around the UBC timeline and whether US dual-tracking is planned.',
      ],
    },
    faqs: [
      {
        question: 'UBC pre-med — what MCAT Bio/Biochem score is competitive?',
        answer:
          'UBC Medicine is highly competitive: median accepted MCAT is ~517 overall. Our coaching targets the Bio/Biochem section for 130+ to contribute to the 517+ composite. Many UBC applicants pair Cerebrum (Bio/Biochem) with a generalist for C/P and CARS.',
      },
      {
        question: 'My family is in Surrey / Burnaby — planning conversation?',
        answer:
          'The consultation covers: (a) UBC Medicine as primary target, (b) US dual-track (UW WWAMI or California schools), (c) research timeline at BC Cancer or VGH. For Surrey families, PT evening sessions fit the after-work schedule.',
      },
      {
        question: 'Can Vancouver students join Seattle or Bay Area sessions?',
        answer:
          'Yes — same Pacific Time zone. Vancouver students join alongside Seattle and Bay Area cohorts, providing cross-border peer interaction.',
      },
      {
        question: 'How does Cerebrum compare to Vancouver MCAT prep?',
        answer:
          'BC MCAT providers charge $1,500–$3,000 CAD for all sections. Cerebrum is a biology-section specialist at $499–$1,499 USD (~$680–$2,040 CAD). Many Vancouver students pair us with a generalist for C/P and CARS.',
      },
    ],
  },

  montreal: {
    slug: 'montreal',
    city: 'Montreal',
    stateOrRegion: 'Greater Montreal',
    stateCode: 'QC',
    countryCode: 'CA',
    timezone: 'Eastern Time',
    timezoneShort: 'ET',
    metaTitle: 'MCAT Biology Tutor Montreal | McGill, Université de Montréal',
    metaDescription:
      'MCAT Bio/Biochem tutor for Montreal pre-meds — McGill, Université de Montréal, Université de Sherbrooke. Biology specialists, ET evening slots. From $499 USD.',
    keywords: [
      'MCAT Biology tutor Montreal',
      'MCAT Bio tutor McGill',
      'MCAT Biology tutor Université de Montréal',
      'MCAT tutor Laval QC',
      'MCAT Bio/Biochem tutor Quebec',
      'Indian Canadian MCAT tutor Montreal',
      'online MCAT Biology coaching Montreal',
    ],
    heroSubtitle:
      'MCAT Bio/Biochem coaching for McGill, Université de Montréal, and Université de Sherbrooke pre-meds. AIIMS-trained biology specialists, Campbell Biology + Lehninger curriculum, Eastern Time evening sessions, $499 to $1,499 USD.',
    whySection: {
      heading: "Why Montreal is Quebec's bilingual pre-med hub",
      paragraphs: [
        'Montreal is unique in the Canadian medical landscape: it has both English-language (McGill Faculty of Medicine) and French-language (Université de Montréal, Université de Sherbrooke) medical schools. McGill requires full MCAT including Bio/Biochem. Quebec French-language medical schools historically did not require MCAT, but many Quebec students applying out-of-province or to US schools need full MCAT prep.',
        'The Montreal South Asian community — concentrated in Brossard, Dollard-des-Ormeaux, and Côte-des-Neiges — drives growing MCAT demand. Many are McGill students or Concordia/UQAM students targeting out-of-province medical schools.',
      ],
    },
    universities: [
      {
        name: 'McGill University',
        programmes: 'Biology, Biochemistry, Anatomy & Cell Biology, Physiology',
      },
      {
        name: 'Université de Montréal',
        programmes: 'Sciences biologiques, Biochimie et médecine moléculaire',
      },
      { name: 'Concordia University', programmes: 'Biology, Biochemistry, Exercise Science' },
      { name: 'Université de Sherbrooke', programmes: 'Biochimie de la santé, Biologie' },
    ],
    timezoneSection:
      'All live sessions are in Eastern Time. Standard Montreal small-batch slot is 7:30 PM to 9:30 PM ET. Montreal students join alongside Toronto, NYC, and Boston ET cohorts.',
    demographicSection: {
      heading: 'Brossard / DDO / Côte-des-Neiges — the family planning conversation',
      paragraphs: [
        "Montreal's South Asian community in Brossard, Dollard-des-Ormeaux, and Côte-des-Neiges drives MCAT demand. Many are McGill students or immigrants whose children target English-language medical schools.",
        "What we hear from Montreal parents: (1) McGill Medicine is the primary target (MCAT required); (2) some families target Ontario schools (U of T, McMaster, Western) for out-of-province spots; (3) Quebec French-med schools don't require MCAT, but out-of-province applications do. We structure the consultation around McGill vs out-of-province strategy.",
      ],
    },
    faqs: [
      {
        question: 'McGill pre-med — what MCAT Bio/Biochem score is competitive?',
        answer:
          'McGill Medicine is highly competitive: median accepted MCAT is ~516+. Our coaching targets Bio/Biochem for 129+ to contribute to the 516+ composite. Many McGill students pair Cerebrum (Bio/Biochem) with a generalist for C/P and CARS.',
      },
      {
        question: 'Do Quebec French-med schools require MCAT?',
        answer:
          'Université de Montréal and Université de Sherbrooke do NOT require MCAT for Quebec CEGEP applicants. However, students applying to Ontario or US medical schools need full MCAT. If your student targets McGill or out-of-province schools, Bio/Biochem prep is essential.',
      },
      {
        question: 'Do you offer sessions in French?',
        answer:
          'Our MCAT Biology sessions are in English only, matching the MCAT examination language. However, we can clarify French-medium biology terminology for students who studied sciences in French during CEGEP.',
      },
      {
        question: 'How does Cerebrum compare to Montreal MCAT prep?',
        answer:
          'Quebec MCAT providers charge $1,500–$3,000 CAD for all sections. Cerebrum is a biology-section specialist at $499–$1,499 USD (~$680–$2,040 CAD). Many Montreal students pair us with a generalist for C/P and CARS.',
      },
    ],
  },
}

export function getMCATMetro(slug: string): MCATMetroConfig | null {
  return mcatMetros[slug] ?? null
}

export const mcatMetroSlugs = Object.keys(mcatMetros)
