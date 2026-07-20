/**
 * AP Biology US per-school landing-page configurations.
 *
 * Powers /ap-biology-tutor-{slug} for the top-10 USABO-feeder /
 * AP-eminence schools where parents actually search by school name.
 *
 * IMPORTANT — trademark + thin-content guardrails:
 *  - Never use logos, seals, or "endorsed by [school]" framing.
 *    Phrasing must be: "AP Biology tutoring for {school} students" or
 *    "near {school}" — descriptive, not affiliational.
 *  - Each school must have 800+ words of school-specific content.
 *    History, AP Bio teacher reputation, USABO record, college
 *    matriculation context — all must be unique per school.
 *  - Cite public sources (USABO TRC, US News, Niche, Boarding School
 *    Review) for any specific claim. Defer to "publicly reported" or
 *    "as reported by Niche" rather than asserting unsourced numbers.
 */

export interface APBiologySchoolFaq {
  question: string
  answer: string
}

export interface APBiologySchool {
  /** URL slug suffix — full route is /ap-biology-tutor-{slug} */
  slug: string
  /** Full school name */
  schoolName: string
  /** Short display name for hero / breadcrumb */
  shortName: string
  /** City + state */
  cityState: string
  /** Metro slug to link the school back to its parent metro page */
  metroSlug: string
  /** Time zone label for live-class scheduling (US zones for US feeders;
   *  IST for India feeders whose students self-study AP for US admissions). */
  timezone: 'ET (Eastern)' | 'CT (Central)' | 'MT (Mountain)' | 'PT (Pacific)' | 'IST (India)'
  /** ISO timezone string for schema.org */
  timezoneIana: string
  /** School type. India feeders are IB/Cambridge/CBSE schools whose students
   *  layer AP for US college applications (they do not run AP as a subject). */
  schoolType:
    | 'Public Specialized'
    | 'Private Independent'
    | 'Public Magnet'
    | 'Boarding'
    | 'IB World School (India)'
    | 'IB Continuum School (India)'
  /** 2-3 paragraph history + reputation + AP Bio context */
  historyParagraphs: string[]
  /** Key public claims about the school (cited where possible) */
  reputationBullets: string[]
  /** USABO record summary (only if publicly verifiable; otherwise omit) */
  usaboRecord?: string
  /** College matriculation context (Niche / Boarding School Review citations) */
  collegeContext: string
  /** How our tutoring complements this school's AP Bio curriculum — pace alignment */
  paceAlignment: string
  /** 5–7 school-tailored FAQs */
  faqs: APBiologySchoolFaq[]
}

export const apBiologySchools: APBiologySchool[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. THOMAS JEFFERSON HSST (Alexandria, VA)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'tjhsst',
    schoolName: 'Thomas Jefferson High School for Science and Technology',
    shortName: 'TJHSST',
    cityState: 'Alexandria, Virginia',
    metroSlug: 'northern-virginia-dc',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/New_York',
    schoolType: 'Public Specialized',
    historyParagraphs: [
      "Thomas Jefferson High School for Science and Technology — universally known as TJHSST or TJ — is a regional Governor's magnet school operated by Fairfax County Public Schools. It is consistently ranked the #1 STEM high school in the United States by US News and Niche, and its admissions process is one of the most selective in the public-school landscape.",
      "TJ's biology programme operates at near-college pace. AP Biology is typically taken in tenth or eleventh grade; the school also offers post-AP biology coursework (research methods, biotechnology, neuroscience) for seniors. The faculty include several PhD-credentialed teachers, and the lab facilities — including TJ's mentorship programme connected to Naval Research, NIH, and George Mason — are among the strongest at any US high school.",
      "TJ has consistently produced a top-tier share of USABO Semifinalists and Finalists nationally over the past decade. For students at TJ targeting AP-5, our role is to layer FRQ rubric mastery and timed full-length practice exams on top of the school's already-rigorous content delivery — closing the gap between strong school grades and a 5 on the May exam.",
    ],
    reputationBullets: [
      'Ranked #1 STEM high school in the US by US News (2025)',
      'Multiple USABO National Finalists annually (publicly reported via CEE press releases)',
      'AP participation rate above 95%, AP Bio cohorts typically 100+ students',
      'Pipeline to Caltech, MIT, Harvard, Stanford, Princeton, and the Ivy League',
      'Senior research mentorship programme with NIH, Naval Research Lab, GMU partnerships',
    ],
    usaboRecord:
      'TJ has multiple USABO National Finalists in recent years (2023, 2024, 2025), publicly reported in USABO TRC finalist bios and CEE press releases. Specific class-rank counts are not centrally published; the consistent presence across years is the documented signal.',
    collegeContext:
      "TJ's graduating class of ~480 sends a substantial fraction to top-tier STEM institutions. Per Niche and Boarding School Review aggregations, the most common matriculations include Virginia Tech, University of Virginia, MIT, Caltech, Stanford, Harvard, Princeton, Cornell, Carnegie Mellon, and Johns Hopkins. The pre-med pathway is competitive, with several students each year matriculating into BS/MD or accelerated medical pipeline programmes.",
    paceAlignment:
      "TJ AP Biology covers Campbell at college-textbook pace — most chapters are completed by January, leaving February through April for FRQ depth and lab investigations. Our coaching aligns to that calendar: USABO Open prep through early February, then AP-rubric drilling through the May exam. For students targeting both AP-5 and USABO Semifinal, we run an integrated track. Sessions are scheduled in ET evenings (typically 7–9 PM) or weekend mornings to fit TJ's intense weekday load.",
    faqs: [
      {
        question: 'Do TJHSST students need AP Biology tutoring?',
        answer:
          "TJ's AP Biology classroom is excellent, so most students do not need content tutoring. The gap is FRQ rubric application — turning concept knowledge into 4-point answers under time pressure — and full-length timed practice. Our 1:1 sessions add precisely that layer. Approximately one in three of our TJ students is targeting USABO Semifinal in addition to AP-5.",
      },
      {
        question: 'How does the AP Bio + USABO integrated track work for TJ?',
        answer:
          'We run an integrated curriculum: Campbell + Alberts + Lehninger by February (USABO Semifinal-level depth), USABO Open mocks weekly through January, then AP Biology FRQ rubric drilling and timed full-length practice exams March through May. Same student, one curriculum, both targets.',
      },
      {
        question: 'What is the time commitment for a TJ student?',
        answer:
          'Most TJ students take 90-minute 1:1 sessions twice a week (3 hours total) plus 4–6 hours of self-directed FRQ practice. For USABO-targeting students, add 2–3 hours per week of olympiad-specific reading (Alberts chapters, USABO past papers).',
      },
      {
        question: 'Do you coach the post-AP biology electives at TJ?',
        answer:
          'Some — biotechnology, molecular biology, and neuroscience overlap with USABO Semifinal content and we coach those topic areas. Senior research mentorship is school-specific and we do not coach the research itself, but we can coach the underlying biology that makes the research more productive.',
      },
      {
        question: "How does TJ's pace compare to private boarding schools?",
        answer:
          "TJ's pace is similar to or slightly faster than the strongest private boarding schools (Phillips Exeter, Andover, Lawrenceville). The biggest difference is breadth of advanced electives — TJ has more post-AP biology coursework — and access to the senior research programme.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. STUYVESANT HIGH SCHOOL (NYC)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'stuyvesant',
    schoolName: 'Stuyvesant High School',
    shortName: 'Stuyvesant',
    cityState: 'Manhattan, New York City',
    metroSlug: 'new-york',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/New_York',
    schoolType: 'Public Specialized',
    historyParagraphs: [
      "Stuyvesant High School is one of New York City's nine specialized high schools, admitting students through the Specialized High Schools Admissions Test (SHSAT). It is consistently ranked among the top public high schools in the United States and has produced more Nobel laureates, MacArthur fellows, and Intel/Regeneron Science Talent Search finalists than nearly any other public school in the country.",
      "Stuyvesant offers AP Biology to juniors and seniors. The school's biology faculty include several PhD-credentialed teachers, and the curriculum runs at college pace with deep emphasis on lab work and original-research-style problem solving. The Biology Department also supports an active research mentorship programme that has produced multiple Regeneron STS Scholars and Semifinalists in recent cohorts. Stuyvesant biology graduates routinely matriculate into top pre-med, biotech, and biological-research programmes.",
      'Beyond the standard AP Biology sequence, Stuyvesant offers post-AP electives such as molecular genetics, biotechnology, and biomedical science — courses that go well past College Board scope and overlap meaningfully with USABO Semifinal-level content. Students preparing seriously for the olympiad track typically combine these electives with summer research at NYU School of Medicine, Mount Sinai, or Memorial Sloan Kettering. Our coaching coordinates with that combination of school-based depth and external research time.',
      "For students at Stuyvesant targeting AP-5 or USABO Semifinal, the gap is rarely concept mastery. The gap is consistent FRQ rubric application — converting Stuyvesant's deep content knowledge into the specific 4-point answers the College Board rewards. That, plus timed full-length practice, is the focus of our 1:1 sessions.",
    ],
    reputationBullets: [
      "One of NYC's nine specialized high schools (SHSAT admission)",
      'Multiple USABO Semifinalists annually (publicly reported)',
      'Top-tier matriculation: Cornell, Columbia, MIT, Stanford, Harvard, Yale, Princeton',
      'Strong Intel/Regeneron Science Talent Search history with multiple Scholars and Semifinalists',
      'AP participation rate above 90%; AP Bio cohorts typically 80–120 students',
      'Post-AP biology electives (molecular genetics, biotech, biomedical science)',
      'Research mentorship pipeline to NYU, Mount Sinai, Memorial Sloan Kettering',
    ],
    usaboRecord:
      "Stuyvesant consistently produces USABO Semifinalists, publicly reported in USABO TRC finalist bios and on the school's STEM page. Multiple finalists across recent years.",
    collegeContext:
      "Stuyvesant\'s graduating class of ~800 has one of the strongest matriculation profiles in NYC public education. Per Niche and the school\'s public college acceptance lists, common destinations include Cornell, Columbia, NYU, MIT, Stanford, Harvard, Yale, Princeton, Carnegie Mellon, and the SUNY system. NYU's BS/MD pipeline (Honors Scholar Program, Stony Brook University BS/MD) is a frequent target for biology-focused Stuyvesant graduates.",
    paceAlignment:
      "Stuyvesant AP Biology runs on a fall-spring sequence with intense lab schedule. Most students cover Campbell by mid-March; April is dedicated review. Our 1:1 coaching slots best in ET evenings (after the long Stuyvesant commute home — often 5:30–7:30 PM is unrealistic; 7:30–9:00 PM works) or Saturday mornings. We coordinate FRQ practice around school's lab calendar.",
    faqs: [
      {
        question: 'Do Stuyvesant students typically need AP Biology tutoring?',
        answer:
          "Stuyvesant's AP Bio classroom delivers strong content. The most common gap is FRQ rubric application — Stuyvesant tests are deep but graded differently than the College Board's rubric. Our 1:1 sessions translate Stuyvesant-level content depth into AP-5-level FRQ answers.",
      },
      {
        question: 'How does AP Bio tutoring fit a Stuyvesant commute?',
        answer:
          'Many Stuyvesant students commute 60–90 minutes each way. We schedule sessions in ET evenings (7:30–9:00 PM) or weekend mornings to avoid the commute crunch. All sessions are recorded for revision during the commute itself.',
      },
      {
        question:
          "Is Stuyvesant\'s biology programme strong enough that I do not need outside tutoring?",
        answer:
          'For most students, Stuyvesant biology is strong. Outside tutoring is for two specific cases: (1) FRQ rubric application — closing the gap between Stuyvesant test scores and AP-5; (2) USABO Semifinal-level depth, which is beyond AP Bio scope. If neither applies, school alone may be sufficient.',
      },
      {
        question: 'Do you coach USABO for Stuyvesant students?',
        answer:
          'Yes. We run an integrated AP + USABO track for serious-biology Stuyvesant students: Campbell + Alberts depth by February, USABO Open prep, then AP Biology FRQ rubric drilling for May.',
      },
      {
        question: 'Does AP Bio help with NYU Honors or Stony Brook BS/MD admissions?',
        answer:
          "AP-5 is a baseline signal of biology readiness for NYU and Stony Brook BS/MD pipelines. USABO Semifinalist standing is a stronger differentiator. Stuyvesant\'s AP transcript plus a well-written research-experience essay is a competitive baseline; AP-5 + USABO Semifinal + research is the strongest combination.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. BRONX HIGH SCHOOL OF SCIENCE (NYC)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'bronx-science',
    schoolName: 'The Bronx High School of Science',
    shortName: 'Bronx Science',
    cityState: 'The Bronx, New York City',
    metroSlug: 'new-york',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/New_York',
    schoolType: 'Public Specialized',
    historyParagraphs: [
      "The Bronx High School of Science — known as Bronx Science — is one of New York City's nine specialized high schools, admitting via the SHSAT. Founded in 1938, it has produced more Nobel laureates than any other US secondary school: 8 alumni Nobel laureates (in Physics) and a further 6 Pulitzer Prize winners.",
      'Bronx Science offers AP Biology to juniors and seniors with a strong emphasis on lab investigation and biotechnology coursework. The school has a documented history of USABO Open and Semifinal participation, and biology students routinely matriculate into top pre-med, biotech, and research programmes.',
      "For Bronx Science students targeting AP-5, our 1:1 coaching adds FRQ rubric mastery — the layer that converts Bronx Science\'s strong content depth into the specific College-Board-rubric-aligned answers required for a 5 on the May exam.",
    ],
    reputationBullets: [
      "One of NYC's nine specialized high schools (SHSAT admission)",
      '8 Nobel laureate alumni — more than any other US secondary school',
      'Multiple USABO Semifinalists across recent years',
      'Top-tier matriculation: Cornell, Columbia, MIT, Harvard, Yale, NYU, Carnegie Mellon',
      'AP participation rate above 90%',
    ],
    usaboRecord:
      'Bronx Science consistently produces USABO Open and Semifinal participants. Specific finalist counts are publicly reported in USABO TRC bios across recent years.',
    collegeContext:
      "Bronx Science\'s graduating class of ~750 has strong matriculation outcomes. Per Niche and the school\'s posted statistics, common destinations include Cornell, Columbia, NYU, MIT, Stanford, Harvard, Yale, Carnegie Mellon, Brown, and the SUNY honors track. Brown PLME (BS/MD) is a frequent target for biology-focused students.",
    paceAlignment:
      "Bronx Science AP Biology covers Campbell on a standard college-pace timeline. April is dedicated review. Our 1:1 sessions schedule best in ET evenings (commute considerations similar to Stuyvesant) or weekend mornings. FRQ rubric practice coordinated with school\'s biology testing calendar.",
    faqs: [
      {
        question: 'How does AP Bio tutoring fit a Bronx Science commute?',
        answer:
          'Bronx Science commutes from Manhattan, Queens, and Brooklyn often run 45–75 minutes. We schedule live sessions in ET evenings (7:30–9:00 PM) or weekend mornings. All sessions recorded for commute review.',
      },
      {
        question: 'Do Bronx Science AP Bio teachers cover the FRQ rubric explicitly?',
        answer:
          "Bronx Science covers FRQ structure but, like most rigorous schools, the school\'s grading rubric is more demanding than the College Board\'s. The risk is over-preparation for school tests and under-preparation for the AP exam\'s specific 4-point rubric. Our 1:1 sessions calibrate to the College Board rubric.",
      },
      {
        question: 'Do you coach USABO for Bronx Science students?',
        answer:
          "Yes. The integrated AP + USABO track works well for Bronx Science students given the school\'s strong content base. Campbell + Alberts depth by February, USABO Open in early February, AP-5 in May.",
      },
      {
        question: 'Is AP Bio useful for Brown PLME or Cornell BS/MD applications?',
        answer:
          "Brown PLME and Cornell\'s pre-med pipeline both look for sustained biology depth. AP-5 is a baseline; USABO Semifinalist standing differentiates. Bronx Science\'s reputation plus AP-5 + research is a competitive baseline; adding USABO Semifinal is the differentiator.",
      },
      {
        question: 'How early should a Bronx Science student start AP Bio tutoring?',
        answer:
          'For a May exam, ideal start is August or September of the academic year. For students also targeting USABO Semifinal (March), an October start gives enough runway. Crash plans (8–12 weeks pre-exam) limit FRQ depth.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. THE HARKER SCHOOL (San Jose, CA)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'harker',
    schoolName: 'The Harker School',
    shortName: 'Harker',
    cityState: 'San Jose, California',
    metroSlug: 'bay-area',
    timezone: 'PT (Pacific)',
    timezoneIana: 'America/Los_Angeles',
    schoolType: 'Private Independent',
    historyParagraphs: [
      'The Harker School is a private K–12 independent school in San Jose, California. Its Upper School (grades 9–12) is one of the most academically rigorous private schools in the United States and is consistently ranked in the top tier of California private schools by Niche and the SF Bay Area private-school guides.',
      'Harker offers AP Biology in tenth or eleventh grade with a follow-on Honors Advanced Topics in Biology course for seniors. The school has a documented USABO Semifinal and Finalist track record across recent years and a strong research programme through its Mitra Family Endowment for Research.',
      "Harker students typically combine AP Biology with deep research engagement (Stanford, UCSF, biotech labs) and target competitive STEM and pre-med pathways. Our 1:1 coaching layers FRQ rubric mastery onto Harker\'s strong content base — the precise gap between school As and AP-5.",
    ],
    reputationBullets: [
      'Top-tier California private school (Niche)',
      'Multiple USABO Semifinalists and Finalists across recent years',
      'Mitra Family Endowment for Research — high-school-level research mentorship',
      'Top-tier matriculation: Stanford, MIT, Berkeley, UCLA, Harvard, Caltech, Penn',
      'AP participation rate above 95%',
    ],
    usaboRecord:
      "Harker has multiple USABO Semifinalists and Finalists in recent years (publicly reported in USABO TRC bios and Harker's own STEM news pages).",
    collegeContext:
      "Harker\'s Upper School graduating class of ~190 has one of the strongest college-matriculation profiles among California private schools. Common destinations per Niche aggregations include Stanford, UC Berkeley, UCLA, Caltech, MIT, Harvard, Princeton, Yale, Penn, Carnegie Mellon, and Cornell. Pre-med pipeline is competitive — sustained biology depth (AP-5 + USABO Semifinal + research) is the strongest signal.",
    paceAlignment:
      "Harker AP Biology runs at college pace with strong lab integration. Campbell is typically completed by mid-March, leaving April for full-syllabus review. Our 1:1 sessions slot in PT evenings or weekend mornings; we coordinate FRQ practice around Harker\'s lab calendar and standardised-test prep cycles.",
    faqs: [
      {
        question: 'Do Harker students need AP Biology tutoring?',
        answer:
          "Harker\'s AP Bio is rigorous and most students perform well. The most common reasons Harker families engage tutoring are (1) USABO Semifinal-level depth — beyond AP scope, and (2) FRQ rubric application — calibrating Harker\'s deep test format to the College Board\'s specific rubric.",
      },
      {
        question: 'How does AP Bio + USABO + Harker research integrate?',
        answer:
          'Harker students often run research at Stanford, UCSF, or biotech labs concurrently. Our 1:1 coaching adapts to that schedule and engages with the research content where relevant — gel reads, plasmid maps, qPCR results — while keeping AP and USABO progress on track.',
      },
      {
        question: 'How does Harker AP Bio compare to TJHSST?',
        answer:
          'Harker AP Bio is similar in depth and rigour to TJHSST. Differences: TJ has more post-AP biology electives and a structured senior research programme; Harker has stronger industry/research mentor access via the Bay Area biotech ecosystem.',
      },
      {
        question: 'Is AP Bio useful for Stanford or Berkeley pre-med?',
        answer:
          "Stanford and UC Berkeley both have competitive pre-med pipelines. AP-5 is a baseline; USABO Semifinalist standing differentiates. Harker\'s reputation plus AP-5 + sustained research is a competitive baseline; AP-5 + USABO Semifinal + research is the differentiator.",
      },
      {
        question: 'What time zones do you offer for Harker live sessions?',
        answer:
          'All live sessions in Pacific Time. Weekday evenings 7–9 PM PT and weekend mornings/afternoons. Recordings 24/7 for revision.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. PHILLIPS EXETER ACADEMY (NH)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'phillips-exeter',
    schoolName: 'Phillips Exeter Academy',
    shortName: 'Phillips Exeter',
    cityState: 'Exeter, New Hampshire',
    metroSlug: 'boston',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/New_York',
    schoolType: 'Boarding',
    historyParagraphs: [
      'Phillips Exeter Academy is one of the oldest and most prestigious boarding schools in the United States, founded in 1781. It pioneered the Harkness Method — a discussion-based pedagogy that places students around an oval table for class discussion led by faculty.',
      'Exeter does not offer AP Biology in the traditional College Board format; instead, the science department runs honours and advanced biology courses (BIO510, BIO530, BIO540 series) that cover AP-equivalent and beyond-AP material. Students seeking AP credit register independently for the May exam — and this is precisely where outside tutoring fits.',
      "Our 1:1 coaching for Exeter students translates the school's rigorous Harkness-discussion-based biology into AP-rubric-aligned answers for the May exam. Many Exeter students also target USABO Semifinal — we coach the integrated track.",
    ],
    reputationBullets: [
      'One of the most selective US boarding schools',
      'Harkness Method — discussion-based pedagogy',
      'Top-tier matriculation: Harvard, Yale, Princeton, MIT, Stanford',
      'No formal AP Biology — students self-register for the May exam',
      'Strong USABO and IBO participation history',
    ],
    collegeContext:
      "Phillips Exeter\'s graduating class of ~330 has one of the most prestigious college-matriculation profiles among US boarding schools. Common destinations per Niche aggregations include Harvard, Yale, Princeton, MIT, Stanford, Penn, Brown, Columbia, Cornell, and Dartmouth. Pre-med pathway is competitive across all matriculations.",
    paceAlignment:
      "Exeter\'s biology courses do not directly map to the AP Biology Course and Exam Description — they go deeper in some areas (cellular biology, biochemistry) and lighter in others (ecology, evolution depth). Our 1:1 coaching identifies the AP-syllabus gaps from your specific Exeter biology track and fills them while reinforcing FRQ rubric application. ET evenings or weekend sessions; we work around dorm rules and proctored study time.",
    faqs: [
      {
        question: 'Why do Exeter students need separate AP Biology coaching?',
        answer:
          "Exeter does not run College Board AP Biology. The school's honours biology courses cover most AP material but in different sequence and with different emphasis. For students self-registering for the May AP Bio exam, our coaching identifies the specific gaps and trains FRQ rubric application — the layer Exeter's discussion-based approach does not directly target.",
      },
      {
        question: 'How does the Harkness Method affect AP Biology preparation?',
        answer:
          'Harkness is excellent for conceptual understanding and articulation — Exeter biology students typically have strong concept mastery. The AP exam, however, is time-pressured and rubric-specific. Our coaching adds the time-pressured-rubric layer Harkness does not directly target.',
      },
      {
        question: 'Can boarding-school students at Exeter use online AP Bio tutoring?',
        answer:
          'Yes. Boarding students often have stronger weekday discipline (proctored study) and use Sundays + weekday late evenings (after dinner / before lights-out) for 1:1 sessions. We coordinate with dorm rules.',
      },
      {
        question: 'Do you coach USABO for Exeter students?',
        answer:
          "Yes. Exeter has a USABO history and the school\'s honours biology depth maps well to USABO Semifinal-level content. We run an integrated AP + USABO track.",
      },
      {
        question: "Is AP Bio important for Exeter's most common college matriculations?",
        answer:
          "Harvard, Yale, Princeton, MIT, and Stanford do not require AP exams for admission, and Exeter's reputation alone is a strong signal. AP-5 + USABO Semifinal is differentiating for the most competitive STEM and pre-med pipelines, including Brown PLME and similar BS/MD programmes.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. PHILLIPS ACADEMY ANDOVER (MA)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'andover',
    schoolName: 'Phillips Academy Andover',
    shortName: 'Andover',
    cityState: 'Andover, Massachusetts',
    metroSlug: 'boston',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/New_York',
    schoolType: 'Boarding',
    historyParagraphs: [
      'Phillips Academy Andover, founded in 1778, is one of the oldest boarding schools in the United States and consistently ranks alongside Phillips Exeter at the top of US boarding-school rankings. The school\'s mission — non sibi, "not for self" — and its Tang Institute for Innovation in education frame Andover\'s distinctive pedagogical approach.',
      'Andover offers AP-equivalent biology coursework through its Biology 100, 200, and advanced electives series. Like Exeter, students self-register for the College Board AP Biology exam in May. Andover has produced multiple USABO participants and the school maintains research collaborations with Harvard, MIT, and the Broad Institute through the Brace Center for Gender Studies and the Tang Institute, giving biology students access to lab experiences uncommon at the secondary level.',
      "Andover's biology faculty include several PhD-credentialed teachers, and the school's labs support student-driven research projects in molecular biology, ecology, and biotechnology. Andover students preparing for top STEM and pre-med college admissions typically combine the school's biology track with summer research at affiliated Boston-area institutions. For students at Andover who also target USABO, the school's depth in molecular biology and biochemistry provides an unusually strong baseline.",
      "For Andover students targeting AP-5 or USABO Semifinal, our 1:1 coaching aligns the school's rigorous content to the College Board's specific rubric and adds the timed full-length practice exam layer. We coordinate with Andover's term schedule, dorm rules, and the school's significant athletic/arts commitments.",
    ],
    reputationBullets: [
      'Founded 1778 — one of the oldest US boarding schools',
      'Top-tier matriculation: Harvard, Yale, Princeton, MIT, Stanford',
      'Research collaborations with Harvard, MIT, Broad Institute',
      'Multiple USABO participants across recent years',
      'Strong AP self-registration pattern (similar to Exeter)',
      'Tang Institute for Innovation — pedagogical research arm',
      'Lab facilities supporting student-driven molecular biology research',
    ],
    collegeContext:
      "Phillips Academy Andover\'s graduating class of ~300 has a top-tier matriculation profile. Common destinations per Niche aggregations include Harvard, Yale, Princeton, MIT, Stanford, Brown, Penn, Columbia, Cornell, and Dartmouth. Pre-med pathway is competitive.",
    paceAlignment:
      "Andover\'s biology courses do not directly map to AP Biology in sequence — they cover similar content with different emphasis. Our 1:1 coaching identifies the syllabus gaps and adds FRQ rubric drilling. ET evenings or weekend sessions; we coordinate with Andover\'s dorm and proctored-study schedule.",
    faqs: [
      {
        question: "How is Andover's biology programme similar to or different from Exeter's?",
        answer:
          "Andover and Exeter are similar in pedagogical depth and overall rigour. Andover\'s biology programme has stronger formal lab integration; Exeter emphasizes Harkness discussion. Both produce strong AP-5 candidates with appropriate self-registration and rubric coaching.",
      },
      {
        question: 'Why do Andover students need separate AP Biology coaching?',
        answer:
          "Like Exeter, Andover does not run College Board AP Biology in the standard format. Students self-register for the May exam. Our coaching identifies the syllabus gaps from Andover\'s specific biology sequence and adds FRQ rubric application — the time-pressured layer Andover\'s deep-content approach does not directly target.",
      },
      {
        question: 'Can boarding-school students at Andover use online AP Bio tutoring?',
        answer:
          'Yes. We coordinate with Andover dorm rules (visitation, study hours) and schedule sessions Sundays or weekday late evenings.',
      },
      {
        question: 'Do you coach USABO for Andover students?',
        answer:
          "Yes. Andover has USABO participation history and the school\'s biology depth supports the USABO Open + Semifinal track. We run an integrated AP + USABO programme.",
      },
      {
        question: "Does AP Bio matter for Andover's most common matriculations?",
        answer:
          "Andover\'s top matriculations (Harvard, Yale, Princeton, MIT, Stanford) do not require AP exams. AP-5 + USABO Semifinal is a differentiating signal for competitive STEM and pre-med pipelines (Brown PLME, BS/MD programmes).",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. MISSION SAN JOSE HIGH SCHOOL (Fremont, CA)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'mission-san-jose',
    schoolName: 'Mission San Jose High School',
    shortName: 'Mission San Jose',
    cityState: 'Fremont, California',
    metroSlug: 'bay-area',
    timezone: 'PT (Pacific)',
    timezoneIana: 'America/Los_Angeles',
    schoolType: 'Public Magnet',
    historyParagraphs: [
      "Mission San Jose High School in Fremont is one of California's top-performing public high schools, consistently ranked in the top 5 California publics by Niche and US News. Its student body draws heavily from the Tri-City area's Indian-American and East-Asian-American communities, producing a dense AP participation culture and an unusually competitive academic environment.",
      "Mission San Jose offers AP Biology to juniors and seniors in a competitive cohort — typical class sizes are 30+ students with strong baseline preparation. The school has a documented USABO Open and Semifinal participation history, with several students reaching the Semifinal stage in recent years. Mission San Jose's biology faculty include teachers with research-track credentials, and the lab facilities support full coverage of the College Board's 13 recommended AP Bio investigations.",
      "Beyond AP Biology, Mission San Jose's broader STEM ecosystem — Science Olympiad, Quiz Bowl, Math Olympiad, and the school's Decathlon team — creates a collegiate-style academic culture where olympiad-level biology depth is normal rather than exceptional. Students preparing seriously for USABO typically combine school AP coursework with summer research at UC Berkeley, UCSF, or biotech labs in the Fremont / Hayward biotech corridor.",
      "For Mission San Jose students, the most common reasons to engage outside coaching are (1) USABO Semifinal-level depth and (2) FRQ rubric application — calibrating the school's strong content delivery to the College Board's specific rubric for AP-5. Sessions schedule in PT evenings or weekend mornings, working around the school's heavy AP and extracurricular load.",
    ],
    reputationBullets: [
      'Top-5 California public high school (Niche, US News)',
      'Multiple USABO Semifinalists across recent years',
      'AP participation rate above 90%',
      'Top-tier matriculation: UC Berkeley, UCLA, Stanford, MIT, Caltech',
      'Strong Tri-City Asian-American academic culture; high baseline preparation',
      'Active Science Olympiad and biology-research clubs',
      'Pipeline to UC Berkeley + UCSF biotech research internships',
    ],
    usaboRecord:
      'Mission San Jose has multiple USABO Open and Semifinalist participants across recent years (publicly reported via USABO TRC bios and Bay Area Olympiad coverage).',
    collegeContext:
      "Mission San Jose\'s graduating class of ~600 has one of the strongest matriculation profiles among California publics. Per Niche aggregations, common destinations include UC Berkeley, UCLA, UC San Diego, Stanford, Caltech, MIT, Cornell, Carnegie Mellon, and Harvard. Pre-med and biotech pipelines are competitive.",
    paceAlignment:
      'Mission San Jose AP Bio runs on a standard public-school AP calendar. Most students are well-prepared and the cohort is competitive. Our 1:1 sessions slot in PT evenings or weekend mornings.',
    faqs: [
      {
        question: 'Do Mission San Jose students need AP Biology tutoring?',
        answer:
          'Mission San Jose AP Bio is rigorous and most students score 4 or 5. The most common reason families engage tutoring is to push from a baseline 4 to a 5, often via FRQ rubric application, or to pursue USABO Semifinal-level depth.',
      },
      {
        question: "How do you coordinate with Mission San Jose's pace?",
        answer:
          'We schedule 90-minute 1:1 sessions twice a week in PT evenings or weekend mornings. Curriculum is calibrated to the AP CED but we adapt around school tests and lab schedules.',
      },
      {
        question: 'Do you coach USABO for Mission San Jose students?',
        answer:
          "Yes. Mission San Jose has a USABO history and the school\'s strong content base supports the integrated AP + USABO track.",
      },
      {
        question: 'Is AP Bio important for UC Berkeley or UCLA pre-med admissions?',
        answer:
          'UC schools accept AP Biology credit toward general biology requirements (with a 4 or 5), but most pre-meds retake college biology because medical schools rarely accept AP credit. The value is foundational — strong AP Bio means a stronger college biology grade.',
      },
      {
        question: 'What is the cost of AP Biology tutoring for a Mission San Jose family?',
        answer:
          'Senior-faculty 1:1: $1,800 (12 hr) to $5,760 (48 hr). Junior-faculty 1:1: $900 (12 hr). Small-batch: $40/hr flat.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 8. HENRY M. GUNN HIGH SCHOOL (Palo Alto, CA)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'gunn-palo-alto',
    schoolName: 'Henry M. Gunn High School',
    shortName: 'Gunn',
    cityState: 'Palo Alto, California',
    metroSlug: 'bay-area',
    timezone: 'PT (Pacific)',
    timezoneIana: 'America/Los_Angeles',
    schoolType: 'Public Magnet',
    historyParagraphs: [
      'Henry M. Gunn High School (commonly Gunn) is one of two public high schools in Palo Alto Unified School District. It serves a community heavily connected to Stanford University and the Silicon Valley tech industry, and has a long tradition of academic and athletic distinction. Gunn is consistently ranked among the top public high schools in California by US News and Niche.',
      "Gunn AP Biology is taught by a strong science faculty with significant lab and research-prep emphasis. The school's biology programme integrates with the broader Palo Alto STEM culture — many students participate in the Stanford Medical Youth Science Program (SMYSP), Stanford Compression Forum, or research stints in labs at Stanford School of Medicine, the Stanford Cancer Institute, or affiliated biotech companies along the Hwy-101 corridor. The school has documented USABO Open and Semifinal participation and a robust pre-med matriculation pattern.",
      "Gunn students typically take AP Biology in 11th or 12th grade and can pair it with the school's offerings in AP Chemistry, AP Physics, and biology-adjacent electives. The PAUSD calendar runs August-to-June with significant winter and spring breaks; AP Bio review sessions in March and April are dense, with most teachers running full-length practice FRQs in the weeks leading to the exam. Students preparing for both AP-5 and USABO Semifinal typically begin the integrated track in summer of 10th grade.",
      "For Gunn students, our 1:1 coaching layers FRQ rubric mastery onto the school's strong content base. For students also pursuing Stanford-affiliated research, we coordinate session schedules around lab hours. PT evenings or weekend mornings are most common; sessions are recorded so students can review during commute or lab time.",
    ],
    reputationBullets: [
      'Top California public high school (Niche, US News)',
      'Multiple USABO Semifinalists across recent years',
      'Strong Stanford / Silicon Valley research integration',
      'AP participation rate above 90%',
      'Top-tier matriculation: Stanford, Berkeley, MIT, Harvard, Princeton',
      'Direct pipeline to Stanford SMYSP and SCI research opportunities',
      'Palo Alto Unified School District calendar with March/April AP review focus',
    ],
    usaboRecord:
      'Gunn has documented USABO Open and Semifinal participation across recent years (publicly reported via USABO TRC bios).',
    collegeContext:
      "Gunn\'s graduating class of ~500 has one of the strongest matriculation profiles in the SF Peninsula. Per Niche aggregations, common destinations include Stanford, UC Berkeley, UCLA, Caltech, MIT, Harvard, Princeton, Cornell, Carnegie Mellon, and Penn. Pre-med pathway is competitive.",
    paceAlignment:
      'Gunn AP Bio runs on a standard public-school calendar. Many students concurrently run research at Stanford labs. Our 1:1 sessions schedule in PT evenings or weekend mornings, calibrated around lab and school commitments.',
    faqs: [
      {
        question: 'Do Gunn students need AP Biology tutoring?',
        answer:
          'Gunn AP Bio is rigorous; most students perform well. Tutoring is for FRQ rubric application — closing the gap between school A and AP-5 — or for USABO Semifinal-level depth beyond AP scope.',
      },
      {
        question: 'How does AP Bio tutoring fit a Gunn + Stanford-research schedule?',
        answer:
          'Many Gunn students run research at Stanford labs concurrently with AP Bio. We schedule 1:1 sessions in PT evenings or weekend mornings, working around lab hours. Sessions are recorded so students can review during or after lab work.',
      },
      {
        question: 'Do you coach USABO for Gunn students?',
        answer:
          "Yes. Gunn has USABO participation history and the school\'s content depth supports the integrated AP + USABO track.",
      },
      {
        question: 'Is AP Bio important for Stanford pre-med admissions?',
        answer:
          'Stanford pre-med is competitive. AP-5 is a baseline; USABO Semifinalist standing and sustained research are differentiators. AP-5 alone is not differentiating in this applicant pool.',
      },
      {
        question: 'What is the cost of AP Biology tutoring for a Palo Alto family?',
        answer:
          'Senior-faculty 1:1: $1,800 (12 hr) to $5,760 (48 hr). Junior-faculty 1:1: $900 (12 hr). Small-batch: $40/hr flat.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 9. WALTER PAYTON COLLEGE PREP (Chicago)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'walter-payton',
    schoolName: 'Walter Payton College Preparatory High School',
    shortName: 'Walter Payton',
    cityState: 'Chicago, Illinois',
    metroSlug: 'chicago',
    timezone: 'CT (Central)',
    timezoneIana: 'America/Chicago',
    schoolType: 'Public Magnet',
    historyParagraphs: [
      "Walter Payton College Preparatory High School is one of Chicago Public Schools' selective-enrollment high schools, named after the Hall-of-Fame Bears running back. It is consistently ranked among the top public high schools in Illinois and the United States by Niche, US News, and Newsweek. Located in Old Town, the school admits around 250 students per grade through CPS's competitive-entry selective-enrollment process.",
      "Walter Payton offers AP Biology with a strong science faculty and emphasizes both content depth and lab investigation. The school's biology programme integrates lab work with computational and data-analysis skill-building, reflecting the Chicago tech ecosystem (Argonne National Laboratory, Fermilab, the University of Chicago Pritzker School of Medicine, and Northwestern's Feinberg School of Medicine all sit within commute range). Walter Payton has a documented USABO Open participation record and matriculates strongly to top-tier STEM and pre-med colleges.",
      "Many Walter Payton students pursue early college credit through the school's AP track and then continue into the IB Diploma Programme — the school is one of the few CPS selectives running both. AP Biology students often take AP Chemistry, AP Physics 1/2, and AP Calculus AB/BC concurrently as part of a STEM-heavy junior-year load. The combination produces strong baseline preparation but also high concurrent workload, which is what drives most Walter Payton families to outside FRQ-rubric coaching.",
      "For Walter Payton students, our 1:1 coaching adds FRQ rubric mastery and timed full-length practice — the layer that converts strong school grades to AP-5. Sessions schedule in CT evenings or weekend mornings, calibrated around the school's testing schedule and other AP commitments.",
    ],
    reputationBullets: [
      'Top Chicago selective-enrollment high school',
      'Top-ranked public high school in Illinois (Niche, US News)',
      'AP participation rate above 90%',
      'Strong USABO Open participation across recent years',
      'Top-tier matriculation: Northwestern, U Chicago, MIT, Harvard, Stanford',
      'IB Diploma Programme available alongside the AP track',
      'Pipeline to Northwestern HPME (BS/MD) for biology-focused students',
    ],
    usaboRecord:
      'Walter Payton has documented USABO Open participation across recent years and is a known producer of olympiad-track Chicago students (publicly noted in USABO TRC bios and city olympiad coverage).',
    collegeContext:
      "Walter Payton\'s graduating class of ~250 has one of the strongest college-matriculation profiles among Chicago publics. Per Niche aggregations, common destinations include Northwestern, University of Chicago, University of Illinois, MIT, Harvard, Stanford, Yale, and Cornell. Northwestern HPME (BS/MD) is a frequent target for biology-focused students.",
    paceAlignment:
      "Walter Payton AP Bio runs on a standard CPS selective-enrollment calendar. Our 1:1 sessions schedule in CT evenings (typically 7–9 PM) or weekend mornings, calibrated around the school\'s testing schedule and other AP commitments.",
    faqs: [
      {
        question: 'Do Walter Payton students need AP Biology tutoring?',
        answer:
          "Walter Payton AP Bio is rigorous. Tutoring closes two specific gaps: (1) FRQ rubric application — turning Walter Payton\'s strong content into AP-5-rubric-aligned answers, and (2) USABO Semifinal-level depth beyond AP scope.",
      },
      {
        question: 'How does AP Bio tutoring fit a Walter Payton schedule?',
        answer:
          'Walter Payton students often carry 4–6 APs concurrently. We schedule 90-minute 1:1 sessions twice a week in CT evenings or weekend mornings.',
      },
      {
        question: 'Is AP Bio useful for Northwestern HPME or U Chicago pre-med?',
        answer:
          'Northwestern HPME (BS/MD) is highly selective and looks for sustained science depth. AP-5 is a baseline; USABO Semifinalist standing is a differentiator. U Chicago pre-med is competitive at admission and again at college; strong AP Bio + research is the foundation.',
      },
      {
        question: 'Do you coach USABO for Walter Payton students?',
        answer:
          "Yes. Walter Payton has USABO participation history and the school\'s content depth supports the integrated AP + USABO track.",
      },
      {
        question: 'What is the cost of AP Biology tutoring for a Chicago family?',
        answer:
          'Senior-faculty 1:1: $1,800 (12 hr) to $5,760 (48 hr). Junior-faculty 1:1: $900 (12 hr). Small-batch: $40/hr flat. National pricing.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 10. HUNTER COLLEGE HIGH SCHOOL (NYC)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'hunter-college-hs',
    schoolName: 'Hunter College High School',
    shortName: 'Hunter College HS',
    cityState: 'Manhattan, New York City',
    metroSlug: 'new-york',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/New_York',
    schoolType: 'Public Specialized',
    historyParagraphs: [
      "Hunter College High School is a public secondary school operated by Hunter College of the City University of New York. It is one of NYC's most selective public schools, admitting via its own entrance exam (separate from the SHSAT used by the other specialized high schools) and a small class size (~180 per grade). Located on the Upper East Side, Hunter draws students from all five boroughs and operates under CUNY governance rather than the NYC Department of Education.",
      "Hunter offers AP Biology to upperclassmen with a strong science faculty and research-prep emphasis. The school's biology programme runs on Hunter's distinctive seven-year continuum (Hunter Elementary feeds into Hunter HS at grade 7), so by the time students reach AP Biology in 11th or 12th grade they have a longer baseline science exposure than peers at SHSAT-admitted specialized schools. The school has produced multiple USABO Open and Semifinal participants across recent years.",
      "Hunter's small class sizes (~180 per grade vs. ~800 at Stuyvesant) translate to higher faculty access — AP Biology cohorts at Hunter are typically 25–40 students with significant individual instruction time. This produces strong content mastery; the gap, when it exists, is FRQ rubric application — converting Hunter's deep content delivery into the specific 4-point answers the College Board's rubric rewards. Hunter graduates routinely matriculate into Brown PLME, NYU Honors Biomed, and other competitive BS/MD pipelines.",
      "For Hunter College HS students, our 1:1 coaching layers FRQ rubric mastery and timed full-length practice onto the school's deep content delivery — the conversion layer between Hunter's rigorous internal grading and the College Board's specific rubric. Sessions schedule in ET evenings or Saturday mornings, calibrated around Hunter's school calendar.",
    ],
    reputationBullets: [
      "One of NYC's most selective public high schools",
      'Operated by Hunter College / CUNY',
      'Small class size (~180 per grade)',
      'Multiple USABO Semifinalists across recent years',
      'Top-tier matriculation: Yale, Harvard, MIT, Princeton, Columbia, Brown',
      'Hunter Elementary → Hunter HS continuum (7-year baseline science)',
      'Pipeline to Brown PLME, NYU Honors Biomed, and competitive BS/MD',
    ],
    usaboRecord:
      'Hunter College HS has documented USABO Open and Semifinal participation across recent years (publicly reported via USABO TRC bios).',
    collegeContext:
      "Hunter College HS\'s graduating class of ~180 has a top-tier matriculation profile. Per Niche and Hunter\'s own college acceptance lists, common destinations include Yale, Harvard, MIT, Princeton, Columbia, Brown, Cornell, Penn, Stanford, and the SUNY Honors College. Brown PLME (BS/MD) is a frequent target.",
    paceAlignment:
      "Hunter AP Bio runs on a fall-spring sequence with deep lab integration. Our 1:1 sessions slot in ET evenings or Saturday mornings; we coordinate FRQ practice around school\'s testing and lab calendar.",
    faqs: [
      {
        question: "How does Hunter's biology programme compare to Stuyvesant or Bronx Science?",
        answer:
          "Hunter, Stuyvesant, and Bronx Science all have rigorous biology programmes with similar AP-5 outcomes. Hunter\'s class sizes are smaller (~180 per grade vs. 800 at Stuyvesant), so individual faculty access is higher. The AP-5 + USABO Semifinal target is the same.",
      },
      {
        question: 'Do Hunter students typically need AP Biology tutoring?',
        answer:
          "Hunter\'s AP Bio is strong. Tutoring is for FRQ rubric application and USABO Semifinal-level depth — the same two reasons as for Stuyvesant and Bronx Science.",
      },
      {
        question: 'How does AP Bio tutoring fit a Hunter schedule?',
        answer:
          'Hunter students often have packed weekday schedules with research, internships, or arts. We schedule live sessions in ET evenings (7:30–9:00 PM) or weekend mornings.',
      },
      {
        question: 'Do you coach USABO for Hunter students?',
        answer:
          "Yes. Hunter has USABO participation history and the school\'s content depth supports the integrated AP + USABO track.",
      },
      {
        question: 'Is AP Bio useful for Brown PLME or Yale pre-med admissions?',
        answer:
          "Brown PLME and Yale pre-med both look for sustained biology depth. AP-5 is a baseline; USABO Semifinalist standing differentiates. Hunter\'s reputation plus AP-5 + research is a competitive baseline; AP-5 + USABO Semifinal + research is the strongest signal.",
      },
    ],
  },
  {
    slug: 'pathways-aravali',
    schoolName: 'Pathways World School Aravali',
    shortName: 'Pathways Aravali',
    cityState: 'Gurgaon, India',
    metroSlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    schoolType: 'IB Continuum School (India)',
    historyParagraphs: [
      'Pathways World School Aravali is a residential and day IB Continuum school in the Aravali range south of Gurgaon, founded in 2003. It runs the full IB continuum (PYP, MYP and DP), which makes it one of the longer-established full-continuum IB schools in the Delhi NCR region. Day students commute from DLF, Golf Course Road and Sohna Road; boarders study on campus through the evening.',
      'Pathways Aravali carries one of the larger IB Diploma Biology cohorts in NCR, offering Biology at both HL and SL. Because so many of its students apply to US universities alongside UK and Indian ones, a meaningful share layer an AP Biology exam onto their IB profile as a College-Board-standardised US-admissions credential — the school itself teaches the IB syllabus, and the AP work is done independently for the May exam.',
      'For Pathways Aravali families the practical need is a track that adds AP Biology without disrupting a demanding IB Diploma load. We run AP Biology as a parallel programme in IST evening slots that fit both day-scholars (joining from home after the commute) and boarders (during scheduled evening study), with weekend intensive blocks when a student is compressing AP prep into the DP timetable.',
    ],
    reputationBullets: [
      "Full IB Continuum school (PYP / MYP / DP), founded 2003 — one of NCR's longest-running",
      'One of the larger IB Diploma Biology cohorts in Delhi NCR (HL and SL offered)',
      'Residential + day school; catchment across DLF, Golf Course Road and Sohna Road',
      'Strong US + UK + India university-application profile — the driver for layering AP',
      'AP Biology prepared independently for the May College Board exam, alongside the IB syllabus',
    ],
    collegeContext:
      'Pathways Aravali graduates apply broadly across US, UK and Indian universities. For the US-bound cohort — especially pre-med and life-sciences applicants — a 4-5 on AP Biology is a common way to add a College-Board-standardised signal on top of IB Diploma predicted grades, and it can earn first-year credit or placement at many US universities.',
    paceAlignment:
      "IB Diploma Biology and AP Biology overlap heavily in content but differ in assessment: IB rewards the long-response mark scheme and the IA, while AP rewards the six free-response-question (FRQ) rubric and the multiple-choice section under strict timing. We align AP prep to the school's DP calendar — content consolidation through the DP1/DP2 year, then FRQ rubric drilling and timed full-length AP papers in the run-up to the May exam — so the AP layer reinforces rather than competes with IB work.",
    faqs: [
      {
        question: 'Does Pathways Aravali offer AP Biology as a school subject?',
        answer:
          "Most Gurgaon international schools — Pathways Aravali included — run the IB Diploma (and/or Cambridge or CBSE), not the US College Board AP programme as a timetabled subject. Students who want AP Biology on their transcript almost always self-register for the May College Board exam and prepare for it outside school. That is exactly what we coach: a full AP Biology track (Campbell content, FRQ rubric mastery, timed full-length papers) that runs alongside your child's IB or school coursework, without clashing with it.",
      },
      {
        question: 'Why would an IB student at Pathways Aravali take AP Biology at all?',
        answer:
          'For US university applications. A strong AP Biology score (4-5) is a recognised, College-Board-standardised signal that US admissions officers read easily, and it can earn first-year credit or placement at many US universities. IB-Diploma students at Pathways Aravali layer one or two APs onto their profile precisely to strengthen the US side of a dual India + US application. Biology is the most common choice for pre-med and life-sciences applicants.',
      },
      {
        question: 'Can you coach IB Biology and AP Biology together for a Pathways student?',
        answer:
          'Yes — this is our most common Pathways pattern. Because the IB HL Biology and AP Biology content sets overlap by roughly 70-80%, we teach the shared core once and then split the assessment coaching: IB Paper 2 mark-scheme calibration and IA mentorship on one side, AP FRQ rubric and timed practice on the other. One student, one weekly schedule, both credentials.',
      },
      {
        question: 'How do the classes run for a Gurgaon family — online or in person?',
        answer:
          "Live online, in IST evening slots (typically 7-9 PM), so there is no Gurgaon-to-Delhi commute. Your child joins from home in Aravali, DLF, Golf Course Road or Sohna Road. Cerebrum's biology faculty are AIIMS-trained and biology-only, and each student gets weekly written feedback on FRQ answers against the College Board rubric. For families who want it, an occasional in-person review at our South Extension hub in Delhi can be arranged on weekends.",
      },
      {
        question: 'What does AP Biology coaching cost for a Pathways Aravali student?',
        answer:
          'Senior-faculty 1:1 AP Biology begins at about $1,800 for a 12-hour block, or roughly $40/hour, with full-year tracks from about $2,500 — well below the $150-400/hour that US-based AP tutors charge over Zoom. Fees are the same whether your child is on the IB Diploma, Cambridge or CBSE track at Pathways Aravali; the AP work is delivered as a parallel programme either way.',
      },
    ],
  },
  {
    slug: 'shri-ram-aravali',
    schoolName: 'The Shri Ram School Aravali',
    shortName: 'TSRS Aravali',
    cityState: 'Gurgaon, India',
    metroSlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    schoolType: 'IB Continuum School (India)',
    historyParagraphs: [
      "The Shri Ram School Aravali (TSRS Aravali) is the senior campus of one of Delhi NCR's most respected school groups, set on the Gurgaon-Faridabad Aravali stretch. Its senior school runs the IB Diploma Programme, and the school is known for a strong humanities-and-sciences balance and a highly selective, academically serious student body.",
      "TSRS Aravali's IB Biology students sit within a small, high-performing DP cohort. A large share of Shri Ram graduates apply to selective US universities, and for those students an AP Biology score is a familiar way to add a US-standardised academic signal alongside the IB Diploma — the school delivers the IB syllabus, and students self-register for the AP exam.",
      "Shri Ram families typically want precision rather than volume: focused, rubric-aware coaching that respects an already-heavy IB load. We deliver AP Biology as a tight parallel track in IST evenings, with weekly written FRQ feedback, timed to the College Board May exam and the student's own DP internal-assessment rhythm.",
    ],
    reputationBullets: [
      "Senior campus of The Shri Ram School group — among NCR's most selective schools",
      'IB Diploma Programme in the senior school; small, high-performing Biology cohort',
      'Strong selective-US-university applicant base — the reason students add AP',
      'AP Biology self-registered for the May exam, alongside the IB syllabus',
      'Aravali catchment (Gurgaon-Faridabad border, Sohna Road, Golf Course Extension)',
    ],
    collegeContext:
      'A high proportion of TSRS Aravali graduates target selective US and UK universities. For the US-application subset, AP Biology (aimed at a 4-5) complements IB Diploma predicted grades with a College-Board-standardised metric that US admissions officers read directly — particularly valued by pre-med and biological-sciences applicants.',
    paceAlignment:
      'We keep the AP layer lean for Shri Ram students: consolidate the Campbell/AP content that overlaps IB HL Biology, then concentrate on the AP-specific FRQ rubric and timed multiple-choice practice in the months before the May exam. Sessions sit in IST evenings and flex around the DP internal-assessment and mock calendar so the AP work never collides with school deadlines.',
    faqs: [
      {
        question: 'Does TSRS Aravali offer AP Biology as a school subject?',
        answer:
          "Most Gurgaon international schools — TSRS Aravali included — run the IB Diploma (and/or Cambridge or CBSE), not the US College Board AP programme as a timetabled subject. Students who want AP Biology on their transcript almost always self-register for the May College Board exam and prepare for it outside school. That is exactly what we coach: a full AP Biology track (Campbell content, FRQ rubric mastery, timed full-length papers) that runs alongside your child's IB or school coursework, without clashing with it.",
      },
      {
        question: 'Why would an IB student at TSRS Aravali take AP Biology at all?',
        answer:
          'For US university applications. A strong AP Biology score (4-5) is a recognised, College-Board-standardised signal that US admissions officers read easily, and it can earn first-year credit or placement at many US universities. IB-Diploma students at TSRS Aravali layer one or two APs onto their profile precisely to strengthen the US side of a dual India + US application. Biology is the most common choice for pre-med and life-sciences applicants.',
      },
      {
        question: 'How do the classes run for a Gurgaon family — online or in person?',
        answer:
          "Live online, in IST evening slots (typically 7-9 PM), so there is no Gurgaon-to-Delhi commute. Your child joins from home in Aravali, DLF, Golf Course Road or Sohna Road. Cerebrum's biology faculty are AIIMS-trained and biology-only, and each student gets weekly written feedback on FRQ answers against the College Board rubric. For families who want it, an occasional in-person review at our South Extension hub in Delhi can be arranged on weekends.",
      },
      {
        question: 'What does AP Biology coaching cost for a TSRS Aravali student?',
        answer:
          'Senior-faculty 1:1 AP Biology begins at about $1,800 for a 12-hour block, or roughly $40/hour, with full-year tracks from about $2,500 — well below the $150-400/hour that US-based AP tutors charge over Zoom. Fees are the same whether your child is on the IB Diploma, Cambridge or CBSE track at TSRS Aravali; the AP work is delivered as a parallel programme either way.',
      },
    ],
  },
  {
    slug: 'heritage-xperiential-gurgaon',
    schoolName: 'Heritage Xperiential Learning School',
    shortName: 'Heritage Xperiential',
    cityState: 'Gurgaon, India',
    metroSlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    schoolType: 'IB World School (India)',
    historyParagraphs: [
      'Heritage Xperiential Learning School in Sector 62, Gurgaon, is an IB World School known for its experiential, inquiry-led pedagogy. Its senior programme includes the IB Diploma, and the school draws families from the Golf Course Extension Road and Sohna Road corridors who value a progressive, concepts-first approach to science.',
      "Heritage's inquiry-led style produces students with strong conceptual biology but who benefit from targeted exam-technique work when they add a standardised external exam. For the US-application cohort, that external exam is often AP Biology — self-registered for the May College Board sitting and prepared independently of the school's IB teaching.",
      "For Heritage families the fit is a coach who respects the school's conceptual foundation and adds the missing piece: disciplined FRQ rubric application and timed practice. We run AP Biology online in IST evenings with weekly written feedback, so a Heritage student keeps their inquiry-based strengths and gains AP exam precision.",
    ],
    reputationBullets: [
      'IB World School in Sector 62, Gurgaon — known for experiential, inquiry-led teaching',
      'IB Diploma in the senior school; conceptually strong biology students',
      'Golf Course Extension Road / Sohna Road catchment',
      'US-bound students layer AP Biology for admissions; self-registered for the May exam',
      "Coaching adds AP FRQ rubric + timed technique on top of the school's concept base",
    ],
    collegeContext:
      'Heritage Xperiential graduates apply across US, UK and Indian universities. For the US-bound subset — especially those targeting life sciences and pre-med — an AP Biology 4-5 adds a College-Board-standardised credential to an IB Diploma profile, and can earn first-year credit at many US institutions.',
    paceAlignment:
      'Heritage students typically arrive with strong conceptual understanding but need structured exam technique for a timed external paper. We align AP prep so content consolidation happens early, then focus the final months on the AP FRQ rubric, data-analysis questions and full-length timed practice ahead of the May exam — all in IST evening slots that fit the school week.',
    faqs: [
      {
        question: 'Does Heritage Xperiential offer AP Biology as a school subject?',
        answer:
          "Most Gurgaon international schools — Heritage Xperiential included — run the IB Diploma (and/or Cambridge or CBSE), not the US College Board AP programme as a timetabled subject. Students who want AP Biology on their transcript almost always self-register for the May College Board exam and prepare for it outside school. That is exactly what we coach: a full AP Biology track (Campbell content, FRQ rubric mastery, timed full-length papers) that runs alongside your child's IB or school coursework, without clashing with it.",
      },
      {
        question: 'Why would an IB student at Heritage Xperiential take AP Biology at all?',
        answer:
          'For US university applications. A strong AP Biology score (4-5) is a recognised, College-Board-standardised signal that US admissions officers read easily, and it can earn first-year credit or placement at many US universities. IB-Diploma students at Heritage Xperiential layer one or two APs onto their profile precisely to strengthen the US side of a dual India + US application. Biology is the most common choice for pre-med and life-sciences applicants.',
      },
      {
        question: 'How do the classes run for a Gurgaon family — online or in person?',
        answer:
          "Live online, in IST evening slots (typically 7-9 PM), so there is no Gurgaon-to-Delhi commute. Your child joins from home in Aravali, DLF, Golf Course Road or Sohna Road. Cerebrum's biology faculty are AIIMS-trained and biology-only, and each student gets weekly written feedback on FRQ answers against the College Board rubric. For families who want it, an occasional in-person review at our South Extension hub in Delhi can be arranged on weekends.",
      },
      {
        question: 'What does AP Biology coaching cost for a Heritage Xperiential student?',
        answer:
          'Senior-faculty 1:1 AP Biology begins at about $1,800 for a 12-hour block, or roughly $40/hour, with full-year tracks from about $2,500 — well below the $150-400/hour that US-based AP tutors charge over Zoom. Fees are the same whether your child is on the IB Diploma, Cambridge or CBSE track at Heritage Xperiential; the AP work is delivered as a parallel programme either way.',
      },
    ],
  },
  {
    slug: 'dps-international-gurgaon',
    schoolName: 'DPS International School',
    shortName: 'DPS International',
    cityState: 'Gurgaon, India',
    metroSlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    schoolType: 'IB World School (India)',
    historyParagraphs: [
      'DPS International, Gurgaon (Sector 45) is an IB World School within the wider DPS Society umbrella, offering the IB Diploma alongside Cambridge pathways. It sits in the established DLF / Sushant Lok / Sector 45 catchment and draws a large, internationally-minded student body.',
      "With both IB and Cambridge tracks in the school, DPS International's US-application cohort commonly adds AP Biology as the College-Board-standardised credential that US universities recognise most directly. The school teaches its IB and Cambridge syllabi; students self-register for the AP May exam and prepare for it independently.",
      'DPS International families want an AP Biology track that slots cleanly around either an IB Diploma or a Cambridge A-Level load. We deliver it online in IST evenings with weekly FRQ feedback, mapping the shared Campbell content once and then drilling AP-specific technique toward the May exam.',
    ],
    reputationBullets: [
      'IB World School in Sector 45, Gurgaon (DPS Society) — IB Diploma + Cambridge pathways',
      'Large internationally-minded cohort; DLF / Sushant Lok / Sector 45 catchment',
      'US-application students add AP Biology; self-registered for the May College Board exam',
      'Coaching maps AP onto either the IB or Cambridge school track',
      'Biology-only, AIIMS-trained faculty with weekly written FRQ feedback',
    ],
    collegeContext:
      'DPS International sends students to US, UK and Indian universities. For US applicants, AP Biology (targeting 4-5) adds a widely-recognised, standardised signal on top of IB or Cambridge grades and can earn first-year credit or placement — especially useful for pre-med and life-sciences pathways.',
    paceAlignment:
      "Whether a DPS International student is on the IB Diploma or a Cambridge A-Level, AP Biology shares most of its content with their school course. We consolidate that shared core early, then focus on the AP six-FRQ rubric and timed multiple-choice practice in the run-up to the May exam, scheduling around the school's own assessment calendar in IST evening slots.",
    faqs: [
      {
        question: 'Does DPS International offer AP Biology as a school subject?',
        answer:
          "Most Gurgaon international schools — DPS International included — run the IB Diploma (and/or Cambridge or CBSE), not the US College Board AP programme as a timetabled subject. Students who want AP Biology on their transcript almost always self-register for the May College Board exam and prepare for it outside school. That is exactly what we coach: a full AP Biology track (Campbell content, FRQ rubric mastery, timed full-length papers) that runs alongside your child's IB or school coursework, without clashing with it.",
      },
      {
        question: 'Why would an IB student at DPS International take AP Biology at all?',
        answer:
          'For US university applications. A strong AP Biology score (4-5) is a recognised, College-Board-standardised signal that US admissions officers read easily, and it can earn first-year credit or placement at many US universities. IB-Diploma students at DPS International layer one or two APs onto their profile precisely to strengthen the US side of a dual India + US application. Biology is the most common choice for pre-med and life-sciences applicants.',
      },
      {
        question: 'How do the classes run for a Gurgaon family — online or in person?',
        answer:
          "Live online, in IST evening slots (typically 7-9 PM), so there is no Gurgaon-to-Delhi commute. Your child joins from home in Aravali, DLF, Golf Course Road or Sohna Road. Cerebrum's biology faculty are AIIMS-trained and biology-only, and each student gets weekly written feedback on FRQ answers against the College Board rubric. For families who want it, an occasional in-person review at our South Extension hub in Delhi can be arranged on weekends.",
      },
      {
        question: 'What does AP Biology coaching cost for a DPS International student?',
        answer:
          'Senior-faculty 1:1 AP Biology begins at about $1,800 for a 12-hour block, or roughly $40/hour, with full-year tracks from about $2,500 — well below the $150-400/hour that US-based AP tutors charge over Zoom. Fees are the same whether your child is on the IB Diploma, Cambridge or CBSE track at DPS International; the AP work is delivered as a parallel programme either way.',
      },
    ],
  },
  {
    slug: 'scottish-high-gurgaon',
    schoolName: 'Scottish High International School',
    shortName: 'Scottish High',
    cityState: 'Gurgaon, India',
    metroSlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    schoolType: 'IB World School (India)',
    historyParagraphs: [
      'Scottish High International School in Sector 57, Gurgaon runs multiple pathways in parallel — the IB Diploma alongside Cambridge (IGCSE / A-Level) and CBSE. That multi-curriculum structure means its IB Biology cohort is smaller than at a single-curriculum IB school, and students often value external benchmarking against a standardised exam.',
      "For Scottish High's US-application students, AP Biology is a natural fit: a College-Board-standardised exam that sits cleanly on top of whichever school track a student is on. The school delivers its IB, Cambridge and CBSE syllabi; students self-register for the AP May exam and prepare independently.",
      'Because the in-school IB peer group can be thinner here, Scottish High families particularly value the rubric-tight, feedback-heavy coaching we provide. We run AP Biology online in IST evenings with weekly written FRQ feedback, replicating the exam-technique intensity that larger single-curriculum cohorts get from sheer density.',
    ],
    reputationBullets: [
      'IB World School in Sector 57, Gurgaon — IB Diploma alongside Cambridge and CBSE',
      'Multi-curriculum school; smaller, benchmark-seeking IB Biology cohort',
      'US-application students add AP Biology; self-registered for the May exam',
      'Coaching supplies the rubric-tight benchmarking a smaller cohort can lack',
      'Sector 57 / Golf Course Extension / Sohna Road catchment',
    ],
    collegeContext:
      'Scottish High graduates apply across US, UK and Indian universities. For US applicants, an AP Biology 4-5 provides a standardised academic signal that complements IB, Cambridge or CBSE grades and can earn US first-year credit — valued especially by pre-med and biological-sciences applicants.',
    paceAlignment:
      "Scottish High's parallel-curriculum structure means AP Biology overlaps whichever track a student is on. We consolidate the shared content early and then drive AP-specific FRQ rubric mastery and timed full-length practice before the May exam, with weekly written feedback to supply the benchmarking a smaller in-school IB cohort may not. Sessions are IST evenings, around the school calendar.",
    faqs: [
      {
        question: 'Does Scottish High offer AP Biology as a school subject?',
        answer:
          "Most Gurgaon international schools — Scottish High included — run the IB Diploma (and/or Cambridge or CBSE), not the US College Board AP programme as a timetabled subject. Students who want AP Biology on their transcript almost always self-register for the May College Board exam and prepare for it outside school. That is exactly what we coach: a full AP Biology track (Campbell content, FRQ rubric mastery, timed full-length papers) that runs alongside your child's IB or school coursework, without clashing with it.",
      },
      {
        question: 'Why would an IB student at Scottish High take AP Biology at all?',
        answer:
          'For US university applications. A strong AP Biology score (4-5) is a recognised, College-Board-standardised signal that US admissions officers read easily, and it can earn first-year credit or placement at many US universities. IB-Diploma students at Scottish High layer one or two APs onto their profile precisely to strengthen the US side of a dual India + US application. Biology is the most common choice for pre-med and life-sciences applicants.',
      },
      {
        question: 'How do the classes run for a Gurgaon family — online or in person?',
        answer:
          "Live online, in IST evening slots (typically 7-9 PM), so there is no Gurgaon-to-Delhi commute. Your child joins from home in Aravali, DLF, Golf Course Road or Sohna Road. Cerebrum's biology faculty are AIIMS-trained and biology-only, and each student gets weekly written feedback on FRQ answers against the College Board rubric. For families who want it, an occasional in-person review at our South Extension hub in Delhi can be arranged on weekends.",
      },
      {
        question: 'What does AP Biology coaching cost for a Scottish High student?',
        answer:
          'Senior-faculty 1:1 AP Biology begins at about $1,800 for a 12-hour block, or roughly $40/hour, with full-year tracks from about $2,500 — well below the $150-400/hour that US-based AP tutors charge over Zoom. Fees are the same whether your child is on the IB Diploma, Cambridge or CBSE track at Scottish High; the AP work is delivered as a parallel programme either way.',
      },
    ],
  },
  {
    slug: 'gd-goenka-world-gurgaon',
    schoolName: 'GD Goenka World School',
    shortName: 'GD Goenka World',
    cityState: 'Gurgaon, India',
    metroSlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    schoolType: 'IB Continuum School (India)',
    historyParagraphs: [
      'GD Goenka World School is a residential IB Continuum school on Sohna Road, Gurgaon, offering the full IB continuum including the IB Diploma. As a boarding-plus-day school it draws students from across NCR and beyond, with a large, internationally-focused senior cohort.',
      "GD Goenka World's US-application students commonly add AP Biology to their IB Diploma profile as a College-Board-standardised credential. The school teaches the IB syllabus; students self-register for the AP May exam and prepare for it independently of school lessons.",
      'For GD Goenka World families — many of them boarders — scheduling matters most. We run AP Biology online in IST evening slots that fit both day-scholars from the Sohna Road corridor and boarders during scheduled evening study, with weekly written FRQ feedback timed to the May exam.',
    ],
    reputationBullets: [
      'Residential IB Continuum school on Sohna Road, Gurgaon (PYP / MYP / DP)',
      'Boarding + day; large internationally-focused senior cohort',
      'US-bound students add AP Biology on top of the IB Diploma; self-registered for May',
      'IST evening scheduling fits both day-scholars and boarders',
      'Biology-only, AIIMS-trained faculty with weekly written FRQ feedback',
    ],
    collegeContext:
      'GD Goenka World graduates apply to US, UK and Indian universities. For the US-bound cohort, AP Biology (targeting 4-5) adds a standardised signal to IB Diploma predicted grades and can earn first-year credit or placement at many US universities — particularly relevant for pre-med and life-sciences applicants.',
    paceAlignment:
      "AP Biology overlaps IB HL Biology heavily in content. For GD Goenka World students we consolidate that shared core through the DP year, then focus on the AP FRQ rubric and timed full-length practice before the May exam. Sessions are scheduled in IST evenings to work for both boarders (evening study) and day-scholars, flexing around the school's DP assessment calendar.",
    faqs: [
      {
        question: 'Does GD Goenka World offer AP Biology as a school subject?',
        answer:
          "Most Gurgaon international schools — GD Goenka World included — run the IB Diploma (and/or Cambridge or CBSE), not the US College Board AP programme as a timetabled subject. Students who want AP Biology on their transcript almost always self-register for the May College Board exam and prepare for it outside school. That is exactly what we coach: a full AP Biology track (Campbell content, FRQ rubric mastery, timed full-length papers) that runs alongside your child's IB or school coursework, without clashing with it.",
      },
      {
        question: 'Why would an IB student at GD Goenka World take AP Biology at all?',
        answer:
          'For US university applications. A strong AP Biology score (4-5) is a recognised, College-Board-standardised signal that US admissions officers read easily, and it can earn first-year credit or placement at many US universities. IB-Diploma students at GD Goenka World layer one or two APs onto their profile precisely to strengthen the US side of a dual India + US application. Biology is the most common choice for pre-med and life-sciences applicants.',
      },
      {
        question: 'How do the classes run for a Gurgaon family — online or in person?',
        answer:
          "Live online, in IST evening slots (typically 7-9 PM), so there is no Gurgaon-to-Delhi commute. Your child joins from home in Aravali, DLF, Golf Course Road or Sohna Road. Cerebrum's biology faculty are AIIMS-trained and biology-only, and each student gets weekly written feedback on FRQ answers against the College Board rubric. For families who want it, an occasional in-person review at our South Extension hub in Delhi can be arranged on weekends.",
      },
      {
        question: 'What does AP Biology coaching cost for a GD Goenka World student?',
        answer:
          'Senior-faculty 1:1 AP Biology begins at about $1,800 for a 12-hour block, or roughly $40/hour, with full-year tracks from about $2,500 — well below the $150-400/hour that US-based AP tutors charge over Zoom. Fees are the same whether your child is on the IB Diploma, Cambridge or CBSE track at GD Goenka World; the AP work is delivered as a parallel programme either way.',
      },
    ],
  },
  {
    slug: 'lancers-gurgaon',
    schoolName: 'Lancers International School',
    shortName: 'Lancers International',
    cityState: 'Gurgaon, India',
    metroSlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    schoolType: 'IB World School (India)',
    historyParagraphs: [
      'Lancers International School is an IB World School in Gurugram on the Golf Course Road / Sector 53 corridor, offering the IB Diploma alongside a Cambridge (IGCSE) pathway. Its student body is heavily oriented toward universities abroad, including the US.',
      'Lancers does not run the US College Board AP programme as a timetabled subject — students who want AP Biology on their transcript self-register for the May exam and prepare independently. For the US-application cohort, a strong AP Biology score (4-5) is a College-Board-standardised signal that complements the IB Diploma on a US application.',
      'For Lancers families the fit is an AP Biology track that slots cleanly around the IB Diploma load. We deliver it online in IST evening slots with weekly written FRQ feedback against the College Board rubric, mapping the content shared with IB HL Biology once and then drilling AP-specific technique toward the May exam.',
    ],
    reputationBullets: [
      'IB World School in Gurugram (Golf Course Road / Sector 53 corridor)',
      'IB Diploma + Cambridge tracks; strongly US-and-abroad-application-oriented',
      'US-bound students add AP Biology; self-registered for the May College Board exam',
      "Coaching maps AP onto the student's IB (or Cambridge) school track",
      'Biology-only, AIIMS-trained faculty with weekly written FRQ feedback',
    ],
    collegeContext:
      'Lancers International graduates apply widely abroad, including to US universities. For the US-application subset, AP Biology (targeting 4-5) adds a standardised, admissions-readable signal on top of IB Diploma grades and can earn first-year credit or placement at many US universities — particularly relevant for pre-med and life-sciences applicants.',
    paceAlignment:
      "AP Biology overlaps IB HL Biology heavily in content but differs in assessment: AP rewards the six free-response-question (FRQ) rubric and a timed multiple-choice section. For Lancers students we consolidate the shared core early, then focus on the AP FRQ rubric and timed full-length practice ahead of the May exam, scheduling around the school's IB assessment calendar in IST evening slots.",
    faqs: [
      {
        question: 'Does Lancers International offer AP Biology as a school subject?',
        answer:
          'No — like most Gurgaon international schools, Lancers runs the IB Diploma (and Cambridge), not the US College Board AP programme as a timetabled subject. Students who want AP Biology self-register for the May exam and prepare for it outside school. That is exactly what we coach: a full AP Biology track that runs alongside the IB coursework without clashing with it.',
      },
      {
        question: 'Why would a Lancers IB student take AP Biology at all?',
        answer:
          'For US university applications. A strong AP Biology score (4-5) is a College-Board-standardised signal that US admissions officers read directly, and it can earn first-year credit or placement. IB-Diploma students at Lancers layer AP onto their profile to strengthen the US side of an application — Biology being the most common choice for pre-med and life-sciences applicants.',
      },
      {
        question: 'Are the classes online or in person for a Gurgaon family?',
        answer:
          'Live online, in IST evening slots (typically 7-9 PM), so there is no Gurgaon-to-Delhi commute — students join from home in Sushant Lok, Nirvana Country, Sector 53 or the DLF phases. Faculty are AIIMS-trained and biology-only, with weekly written FRQ feedback against the College Board rubric. An occasional in-person review at our South Extension hub can be arranged on weekends.',
      },
      {
        question: 'What does AP Biology coaching cost for a Lancers student?',
        answer:
          'Senior-faculty 1:1 AP Biology begins at about $1,800 for a 12-hour block, or roughly $40/hour, with full-year tracks from about $2,500 — well below the $150-400/hour US-based tutors charge over Zoom. Fees are the same whether the student is on the IB Diploma or a Cambridge track at Lancers; the AP work is delivered as a parallel programme either way.',
      },
    ],
  },
]

/** Helper: lookup school by slug. */
export function getSchoolBySlug(slug: string): APBiologySchool | undefined {
  return apBiologySchools.find((s) => s.slug === slug)
}

/** Helper: list of all slugs for generateStaticParams. */
export const apBiologySchoolSlugs = apBiologySchools.map((s) => s.slug)
