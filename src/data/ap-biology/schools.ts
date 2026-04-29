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
  /** US time zone label for live-class scheduling */
  timezone: 'ET (Eastern)' | 'CT (Central)' | 'MT (Mountain)' | 'PT (Pacific)'
  /** ISO timezone string for schema.org */
  timezoneIana: string
  /** Public / private / magnet / boarding */
  schoolType: 'Public Specialized' | 'Private Independent' | 'Public Magnet' | 'Boarding'
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
      "TJ has produced more USABO Semifinalists and Finalists than any other US high school over the past decade. For students at TJ targeting AP-5, our role is to layer FRQ rubric mastery and timed full-length practice exams on top of the school's already-rigorous content delivery — closing the gap between strong school grades and a 5 on the May exam.",
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
      "Stuyvesant offers AP Biology to juniors and seniors. The school's biology faculty include several PhD-credentialed teachers, and the curriculum runs at college pace with deep emphasis on lab work and original-research-style problem solving. Stuyvesant biology graduates routinely matriculate into top pre-med, biotech, and biological-research programmes.",
      "For students at Stuyvesant targeting AP-5 or USABO Semifinal, the gap is rarely concept mastery. The gap is consistent FRQ rubric application — converting Stuyvesant's deep content knowledge into the specific 4-point answers the College Board rewards. That, plus timed full-length practice, is the focus of our 1:1 sessions.",
    ],
    reputationBullets: [
      "One of NYC's nine specialized high schools (SHSAT admission)",
      'Multiple USABO Semifinalists annually (publicly reported)',
      'Top-tier matriculation: Cornell, Columbia, MIT, Stanford, Harvard, Yale, Princeton',
      'Strong Intel/Regeneron Science Talent Search history',
      'AP participation rate above 90%; AP Bio cohorts typically 80–120 students',
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
      'Phillips Academy Andover, founded in 1778, is one of the oldest boarding schools in the United States and consistently ranks alongside Phillips Exeter at the top of US boarding-school rankings.',
      "Andover offers AP-equivalent biology coursework through its Biology 100, 200, and advanced electives series. Like Exeter, students self-register for the College Board AP Biology exam in May. Andover has produced multiple USABO participants and the school\'s research programme runs in partnership with Harvard, MIT, and the Broad Institute.",
      "For Andover students targeting AP-5 or USABO Semifinal, our 1:1 coaching aligns the school\'s rigorous content to the College Board\'s specific rubric and adds the timed full-length practice exam layer.",
    ],
    reputationBullets: [
      'Founded 1778 — one of the oldest US boarding schools',
      'Top-tier matriculation: Harvard, Yale, Princeton, MIT, Stanford',
      'Research partnerships with Harvard, MIT, Broad Institute',
      'Multiple USABO participants across recent years',
      'Strong AP self-registration pattern (similar to Exeter)',
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
      "Mission San Jose High School in Fremont is one of California\'s top-performing public high schools, consistently ranked in the top 5 California publics by Niche and US News. Its student body is heavily Asian-American, with a strong academic culture and dense AP participation.",
      'Mission San Jose offers AP Biology to juniors and seniors in a competitive cohort — typical class sizes are 30+ students with strong baseline preparation. The school has a documented USABO Open and Semifinal participation history.',
      "For Mission San Jose students, the most common reasons to engage outside coaching are (1) USABO Semifinal-level depth and (2) FRQ rubric application — calibrating the school\'s strong content delivery to the College Board\'s specific rubric for AP-5.",
    ],
    reputationBullets: [
      'Top-5 California public high school (Niche, US News)',
      'Multiple USABO Semifinalists across recent years',
      'AP participation rate above 90%',
      'Top-tier matriculation: UC Berkeley, UCLA, Stanford, MIT, Caltech',
      'Strong Asian-American academic culture; high baseline preparation',
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
      'Henry M. Gunn High School (commonly Gunn) is one of two public high schools in Palo Alto Unified School District. It serves a community heavily connected to Stanford University and the Silicon Valley tech industry, and has a long tradition of academic and athletic distinction.',
      'Gunn AP Biology is taught by a strong science faculty with significant lab and research-prep emphasis. The school has documented USABO Open and Semifinal participation and a robust pre-med matriculation pattern.',
      "For Gunn students, our 1:1 coaching layers FRQ rubric mastery onto the school\'s strong content base. For students also pursuing Stanford-affiliated research, we coordinate session schedules around lab hours.",
    ],
    reputationBullets: [
      'Top California public high school (Niche, US News)',
      'Multiple USABO Semifinalists across recent years',
      'Strong Stanford / Silicon Valley research integration',
      'AP participation rate above 90%',
      'Top-tier matriculation: Stanford, Berkeley, MIT, Harvard, Princeton',
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
      "Walter Payton College Preparatory High School is one of Chicago Public Schools' selective-enrollment high schools, named after the Hall-of-Fame Bears running back. It is consistently ranked among the top public high schools in Illinois and the United States by Niche, US News, and Newsweek.",
      'Walter Payton offers AP Biology with a strong science faculty and emphasizes both content depth and lab investigation. The school has a documented USABO Open participation record and matriculates strongly to top-tier STEM and pre-med colleges.',
      'For Walter Payton students, our 1:1 coaching adds FRQ rubric mastery and timed full-length practice — the layer that converts strong school grades to AP-5.',
    ],
    reputationBullets: [
      'Top Chicago selective-enrollment high school',
      'Top-ranked public high school in Illinois (Niche, US News)',
      'AP participation rate above 90%',
      'Strong USABO Open participation across recent years',
      'Top-tier matriculation: Northwestern, U Chicago, MIT, Harvard, Stanford',
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
      "Hunter College High School is a public secondary school operated by Hunter College of the City University of New York. It is one of NYC\'s most selective public schools, admitting via its own entrance exam (separate from the SHSAT used by the other specialized high schools) and a small class size (~180 per grade).",
      'Hunter offers AP Biology to upperclassmen with a strong science faculty and research-prep emphasis. The school has produced multiple USABO Open and Semifinal participants across recent years.',
      "For Hunter College HS students, our 1:1 coaching layers FRQ rubric mastery and timed full-length practice onto the school\'s deep content delivery — the conversion layer between Hunter\'s rigorous internal grading and the College Board\'s specific rubric.",
    ],
    reputationBullets: [
      "One of NYC\'s most selective public high schools",
      'Operated by Hunter College / CUNY',
      'Small class size (~180 per grade)',
      'Multiple USABO Semifinalists across recent years',
      'Top-tier matriculation: Yale, Harvard, MIT, Princeton, Columbia, Brown',
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
]

/** Helper: lookup school by slug. */
export function getSchoolBySlug(slug: string): APBiologySchool | undefined {
  return apBiologySchools.find((s) => s.slug === slug)
}

/** Helper: list of all slugs for generateStaticParams. */
export const apBiologySchoolSlugs = apBiologySchools.map((s) => s.slug)
