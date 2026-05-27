/**
 * GAMSAT Biology metro configs for city-level landing pages.
 * GAMSAT is used for graduate-entry medicine in UK, Ireland, Australia.
 */

export interface GAMSATMetroFaq {
  question: string
  answer: string
}

export interface GAMSATMetroSchool {
  name: string
  programmes: string
}

export interface GAMSATMetroConfig {
  slug: string
  city: string
  country: string
  countryCode: string
  region: string
  timezone: string
  timezoneShort: string
  currency: { code: string; symbol: string }
  pricing: { selfPaced: string; smallBatch: string; oneOnOne: string }
  locale: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroSubtitle: string
  whySection: { heading: string; paragraphs: string[] }
  medSchools: GAMSATMetroSchool[]
  timezoneSection: string
  demographicSection: { heading: string; paragraphs: string[] }
  faqs: GAMSATMetroFaq[]
}

export const gamsatMetros: Record<string, GAMSATMetroConfig> = {
  melbourne: {
    slug: 'melbourne',
    city: 'Melbourne',
    country: 'Australia',
    countryCode: 'AU',
    region: 'Victoria',
    timezone: 'Australian Eastern Time',
    timezoneShort: 'AEST',
    currency: { code: 'AUD', symbol: 'A$' },
    pricing: { selfPaced: 'A$539', smallBatch: 'A$1,149', oneOnOne: 'A$1,599' },
    locale: 'en_AU',
    metaTitle: 'GAMSAT Biology Tutor Melbourne | Deakin, Melbourne MD, Monash',
    metaDescription:
      'GAMSAT Section III biology tutor for Melbourne graduate medicine applicants — Deakin, University of Melbourne MD, Monash. AIIMS-trained biology specialists. From A$599.',
    keywords: ['GAMSAT biology tutor Melbourne', 'GAMSAT tutor Deakin', 'GAMSAT tutor Melbourne MD', 'GAMSAT tutor Monash', 'graduate medicine tutor Melbourne', 'GAMSAT Section III Melbourne', 'GAMSAT tutor Box Hill', 'Indian Australian GAMSAT tutor Melbourne'],
    heroSubtitle:
      'GAMSAT Section III biology coaching for Deakin University, University of Melbourne MD, and Monash University graduate medicine applicants — built around Melbourne\'s medical precinct and the Box Hill / Glen Waverley South Asian corridor. AIIMS-trained biology specialists, AEST evening sessions, A$599 to A$1,799.',
    whySection: {
      heading: 'Why Melbourne is Australia\'s graduate medicine capital',
      paragraphs: [
        'Melbourne has the highest concentration of GAMSAT-accepting graduate medicine programmes in Australia. Deakin University School of Medicine (Geelong/Waurn Ponds), University of Melbourne Doctor of Medicine, and Monash University School of Medicine are all within the metro. Melbourne Medical School is the oldest in Australia (founded 1862).',
        'The Indian-Australian community in Box Hill, Glen Waverley, Tarneit, and Truganina drives growing GAMSAT demand. Many are career-changers from IT, engineering, or allied health who target graduate-entry medicine as a second career.',
      ],
    },
    medSchools: [
      { name: 'University of Melbourne MD', programmes: 'Doctor of Medicine (graduate entry, GAMSAT + interview)' },
      { name: 'Deakin University School of Medicine', programmes: 'MD (Geelong/Waurn Ponds, GAMSAT + MMI)' },
      { name: 'Monash University School of Medicine', programmes: 'MD (graduate entry stream, GAMSAT + interview)' },
      { name: 'La Trobe University', programmes: 'MD (Bendigo/Bundoora, regional pathway)' },
    ],
    timezoneSection: 'All live sessions are timed for AEST. Standard Melbourne small-batch slot is 7:30 PM to 9:30 PM AEST on weekday evenings, with 10:00 AM to 12:00 PM AEST Saturday and Sunday options. Senior Faculty 1:1 can be scheduled at any AEST slot.',
    demographicSection: {
      heading: 'Box Hill / Glen Waverley / Tarneit — the graduate medicine conversation',
      paragraphs: [
        'Melbourne\'s Indian-Australian community (Box Hill, Glen Waverley, Tarneit, Point Cook, Craigieburn) is one of the fastest-growing in Australia. Many GAMSAT candidates are IT professionals, pharmacists, nurses, or physiotherapists seeking a transition to medicine.',
        'What we hear from Melbourne candidates: (1) Deakin and Melbourne MD are the primary targets — both require GAMSAT 60–65+; (2) the March GAMSAT sitting is dominant (September as backup); (3) working professionals need evening/weekend sessions. We structure the consultation around the candidate\'s current career, target programme, and March vs September sitting.',
      ],
    },
    faqs: [
      { question: 'Deakin or Melbourne MD — what GAMSAT Section III score is competitive?', answer: 'Deakin typically requires GAMSAT overall 60+ with Section III 60+. Melbourne MD requires GAMSAT 62–65+ overall. Our coaching targets the Section III 65+ band — biology is where most candidates lose marks and where specialist coaching has the highest marginal return.' },
      { question: 'I\'m a working professional in IT — can I prepare for GAMSAT alongside my job?', answer: 'Yes — this is our default Melbourne cohort. We schedule AEST evening sessions (7:30–9:30 PM) after standard work hours. The Self-Paced track ($A599) is designed for professionals who can study 8–10 hours/week over 4–6 months. The Small-Batch adds weekly live sessions for accountability.' },
      { question: 'March or September GAMSAT — which should I sit?', answer: 'March is the dominant Australian sitting. Most Melbourne candidates start prep in November/December for a March sitting. September is a secondary option for retake candidates or those who missed March registration. We calibrate the study plan to whichever sitting you target.' },
      { question: 'Do you accept AUD payment?', answer: 'Yes — AUD via Australian bank transfer (Commonwealth, ANZ, Westpac, NAB) or international Visa/Mastercard. INR via UPI/NEFT also available for Indian-origin candidates. Annual packages can be split across two AUD payments.' },
      { question: 'How does Cerebrum compare to Australian GAMSAT prep providers?', answer: 'Australian GAMSAT providers charge A$1,000–A$3,000 for full-GAMSAT courses (all three sections). Cerebrum is a Section III biology specialist at A$599–A$1,799. Most Melbourne candidates pair us with a generalist for Section I (Reasoning) and Section II (Written Communication).' },
    ],
  },

  brisbane: {
    slug: 'brisbane',
    city: 'Brisbane',
    country: 'Australia',
    countryCode: 'AU',
    region: 'Queensland',
    timezone: 'Australian Eastern Time',
    timezoneShort: 'AEST',
    currency: { code: 'AUD', symbol: 'A$' },
    pricing: { selfPaced: 'A$539', smallBatch: 'A$1,149', oneOnOne: 'A$1,599' },
    locale: 'en_AU',
    metaTitle: 'GAMSAT Biology Tutor Brisbane | Griffith, UQ, Bond Medical',
    metaDescription:
      'GAMSAT Section III biology tutor for Brisbane graduate medicine applicants — Griffith, University of Queensland, Bond. AIIMS-trained biology specialists. From A$599.',
    keywords: ['GAMSAT biology tutor Brisbane', 'GAMSAT tutor Griffith', 'GAMSAT tutor UQ', 'GAMSAT tutor Bond', 'graduate medicine tutor Brisbane', 'GAMSAT Section III Brisbane', 'Indian Australian GAMSAT tutor Brisbane'],
    heroSubtitle:
      'GAMSAT Section III biology coaching for Griffith University, University of Queensland, and Bond University graduate medicine applicants. AIIMS-trained biology specialists, AEST evening sessions, A$599 to A$1,799.',
    whySection: {
      heading: 'Why Brisbane is Queensland\'s graduate medicine gateway',
      paragraphs: [
        'Brisbane anchors Queensland\'s graduate medicine ecosystem. Griffith University School of Medicine (Gold Coast), University of Queensland (UQ) Medical School, and Bond University Medical Program are all within the broader South East Queensland corridor.',
        'The Indian-Australian community in Brisbane\'s southern suburbs (Sunnybank, Eight Mile Plains, Calamvale) and the Gold Coast drives GAMSAT demand. Queensland\'s relative affordability compared to Sydney and Melbourne attracts career-changers targeting graduate medicine.',
      ],
    },
    medSchools: [
      { name: 'Griffith University School of Medicine', programmes: 'MD (Gold Coast, GAMSAT + MMI)' },
      { name: 'University of Queensland Medical School', programmes: 'MD (graduate entry, GAMSAT + interview)' },
      { name: 'Bond University Medical Program', programmes: 'MD (accelerated, Gold Coast, GAMSAT-accepting)' },
    ],
    timezoneSection: 'All live sessions are timed for AEST (same as Melbourne/Sydney). Standard Brisbane small-batch slot is 7:30 PM to 9:30 PM AEST on weekday evenings, with 10:00 AM to 12:00 PM AEST Saturday and Sunday options.',
    demographicSection: {
      heading: 'Sunnybank / Gold Coast — the graduate medicine conversation',
      paragraphs: [
        'Brisbane\'s South Asian community in Sunnybank, Eight Mile Plains, and the Gold Coast\'s growing Indian-origin population drive GAMSAT demand in South East Queensland.',
        'What we hear from Brisbane candidates: (1) Griffith Gold Coast is the primary target — more accessible than UQ for career-changers; (2) Bond\'s accelerated programme appeals to older candidates wanting the fastest pathway; (3) GAMSAT 58–62+ is competitive for Queensland programmes. We structure the consultation around timeline and target programme.',
      ],
    },
    faqs: [
      { question: 'Griffith, UQ, or Bond — what GAMSAT Section III score is competitive?', answer: 'Griffith typically requires GAMSAT 58–60+ overall. UQ requires 60–63+. Bond accepts a broader range but is expensive (private university). Our coaching targets Section III 62+ to keep all three programmes in play.' },
      { question: 'I\'m on the Gold Coast — same sessions as Brisbane?', answer: 'Yes — all sessions are online. Gold Coast candidates join the same AEST evening sessions. Griffith Medical School is on the Gold Coast campus, so many of our Brisbane-area candidates are actually Gold Coast-based.' },
      { question: 'Do you accept AUD payment?', answer: 'Yes — AUD via Australian bank transfer or international Visa/Mastercard. INR also available for Indian-origin candidates.' },
      { question: 'March or September GAMSAT?', answer: 'March is the dominant sitting in Australia. Brisbane candidates typically start prep in November/December. We calibrate the study plan to your target sitting.' },
      { question: 'How does Cerebrum compare to Australian GAMSAT prep?', answer: 'Australian GAMSAT providers charge A$1,000–A$3,000 for all sections. Cerebrum is a Section III biology specialist at A$599–A$1,799. Most candidates pair us with a generalist for Section I and II.' },
    ],
  },

  dublin: {
    slug: 'dublin',
    city: 'Dublin',
    country: 'Ireland',
    countryCode: 'IE',
    region: 'Leinster',
    timezone: 'Greenwich Mean Time',
    timezoneShort: 'GMT',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { selfPaced: '€399', smallBatch: '€899', oneOnOne: '€1,249' },
    locale: 'en_IE',
    metaTitle: 'GAMSAT Biology Tutor Dublin | RCSI, UCC, UL Graduate Medicine',
    metaDescription:
      'GAMSAT Section III biology tutor for Dublin graduate medicine applicants — RCSI, UCC, UL. AIIMS-trained biology specialists, GMT evening slots. From €449.',
    keywords: ['GAMSAT biology tutor Dublin', 'GAMSAT tutor RCSI', 'GAMSAT tutor UCC', 'GAMSAT tutor UL', 'graduate medicine tutor Dublin', 'GAMSAT Section III Dublin', 'GAMSAT Ireland', 'Indian GAMSAT tutor Dublin'],
    heroSubtitle:
      'GAMSAT Section III biology coaching for RCSI, UCC, and University of Limerick graduate medicine applicants — built around Dublin\'s medical and tech-sector community. AIIMS-trained biology specialists, GMT evening sessions, €449 to €1,399.',
    whySection: {
      heading: 'Why Dublin is Ireland\'s graduate medicine hub',
      paragraphs: [
        'Dublin anchors Ireland\'s graduate medicine ecosystem. RCSI (Royal College of Surgeons in Ireland) is the dominant GAMSAT-accepting institution, with UCC (University College Cork) and UL (University of Limerick) as strong alternatives. Ireland\'s GAMSAT cut-off is typically lower than UK/Australia (overall 56–60+), making it an accessible graduate medicine pathway.',
        'Dublin\'s rapidly growing Indian tech-sector diaspora (Google, Meta, Apple, Microsoft, Pfizer) drives GAMSAT demand. Many are IT professionals or pharmacists seeking a career transition to medicine. RCSI has a strong tradition of Indian-origin student admission.',
      ],
    },
    medSchools: [
      { name: 'RCSI (Royal College of Surgeons in Ireland)', programmes: 'Graduate Entry Medicine (GEM), GAMSAT + interview' },
      { name: 'UCC (University College Cork)', programmes: 'Graduate Entry Medicine, GAMSAT + MMI' },
      { name: 'UL (University of Limerick)', programmes: 'Graduate Entry Medical School, GAMSAT + interview' },
      { name: 'UCD (University College Dublin)', programmes: 'Graduate Entry Medicine (GAMSAT-accepting)' },
    ],
    timezoneSection: 'All live sessions are timed for GMT (IST during summer). Standard Dublin small-batch slot is 7:30 PM to 9:30 PM GMT on weekday evenings, with 10:00 AM to 12:00 PM GMT Saturday and Sunday options.',
    demographicSection: {
      heading: 'Dublin tech corridor — the graduate medicine conversation',
      paragraphs: [
        'Dublin\'s Indian tech-sector community (Sandyford, Leopardstown, Dundrum, Tallaght) drives GAMSAT demand. Many candidates are Google, Meta, or Pfizer employees considering medicine as a second career.',
        'What we hear from Dublin candidates: (1) RCSI is the primary target — strong Indian-student admission tradition; (2) Ireland\'s GAMSAT cut-off is lower than UK/Australia (56–60+ overall); (3) the HPAT (Health Professions Admission Test) is a separate requirement for some programmes. We structure the consultation around GAMSAT + HPAT combined strategy.',
      ],
    },
    faqs: [
      { question: 'RCSI or UCC — what GAMSAT Section III score is competitive?', answer: 'RCSI typically requires GAMSAT overall 56–60+ with Section III 58+. UCC requires 58–62+. Ireland\'s cut-offs are lower than UK/Australia, making it an accessible graduate medicine pathway. Our coaching targets Section III 62+ for competitive placement across all four Irish programmes.' },
      { question: 'I\'m a tech professional at Google/Meta — can I prepare alongside my job?', answer: 'Yes — this is a common Dublin profile. We schedule GMT evening sessions (7:30–9:30 PM) after standard tech-sector hours. The Self-Paced track (€449) fits professionals studying 8–10 hours/week. Many Dublin tech professionals target the September GAMSAT sitting to align with annual leave for final-week intensive prep.' },
      { question: 'Do I need the HPAT alongside GAMSAT for Irish programmes?', answer: 'HPAT-Ireland is required for undergraduate medicine entry, not graduate entry. GAMSAT is the primary admissions test for graduate-entry programmes at RCSI, UCC, UL, and UCD. However, some programmes have additional interview components — we advise on the full admissions process during the consultation.' },
      { question: 'Do you accept EUR payment?', answer: 'Yes — EUR via SEPA transfer, international Visa/Mastercard, or INR via UPI/NEFT for Indian-origin candidates. Corporate education-benefit invoicing available for tech-sector employer reimbursement.' },
      { question: 'How does Cerebrum compare to Irish GAMSAT prep?', answer: 'Irish GAMSAT providers charge €800–€2,000 for all three sections. Cerebrum is a Section III biology specialist at €449–€1,399. Most Dublin candidates pair us with a generalist for Section I and II.' },
    ],
  },

  edinburgh: {
    slug: 'edinburgh',
    city: 'Edinburgh',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'Scotland',
    timezone: 'Greenwich Mean Time',
    timezoneShort: 'GMT',
    currency: { code: 'GBP', symbol: '£' },
    pricing: { selfPaced: '£349', smallBatch: '£799', oneOnOne: '£1,099' },
    locale: 'en_GB',
    metaTitle: 'GAMSAT Biology Tutor Edinburgh | Edinburgh, St Andrews, Glasgow',
    metaDescription:
      'GAMSAT Section III biology tutor for Edinburgh & Scottish graduate medicine applicants — Edinburgh, St Andrews, Glasgow, Dundee. AIIMS-trained biology specialists. From £399.',
    keywords: ['GAMSAT biology tutor Edinburgh', 'GAMSAT tutor Edinburgh medical school', 'GAMSAT tutor St Andrews', 'GAMSAT tutor Glasgow', 'graduate medicine tutor Scotland', 'GAMSAT Section III Edinburgh', 'GAMSAT Scotland', 'Scottish graduate medicine GAMSAT'],
    heroSubtitle:
      'GAMSAT Section III biology coaching for University of Edinburgh, St Andrews, Glasgow, and Dundee graduate medicine applicants — Scotland\'s four GAMSAT-pathway medical schools. AIIMS-trained biology specialists, GMT evening sessions, £399 to £1,249.',
    whySection: {
      heading: 'Why Edinburgh anchors Scottish graduate medicine',
      paragraphs: [
        'Edinburgh is the gateway to Scotland\'s graduate medicine landscape. The University of Edinburgh Medical School (founded 1726, one of the oldest in the English-speaking world) offers a graduate-entry stream accepting GAMSAT. St Andrews, Glasgow, and Dundee medical schools complete the Scottish GAMSAT pathway.',
        'Scotland offers a distinctive advantage: Scottish/EU domiciled students pay lower fees than English domiciled students for medical programmes. Edinburgh\'s growing biomedical and tech sector attracts career-changers who target graduate medicine as a second profession.',
      ],
    },
    medSchools: [
      { name: 'University of Edinburgh Medical School', programmes: 'MBChB (graduate entry stream, GAMSAT + interview)' },
      { name: 'University of St Andrews School of Medicine', programmes: 'BSc (Hons) + clinical years at partner schools' },
      { name: 'University of Glasgow School of Medicine', programmes: 'MBChB (graduate entry, ScotGEM programme)' },
      { name: 'University of Dundee School of Medicine', programmes: 'MBChB (graduate entry, GAMSAT-accepting)' },
    ],
    timezoneSection: 'All live sessions are timed for GMT (BST during summer). Standard Edinburgh small-batch slot is 7:30 PM to 9:30 PM GMT on weekday evenings, with 10:00 AM to 12:00 PM GMT Saturday and Sunday options.',
    demographicSection: {
      heading: 'Edinburgh biomedical corridor — the graduate medicine conversation',
      paragraphs: [
        'Edinburgh\'s biomedical sector (BioQuarter, Edinburgh Royal Infirmary, Roslin Institute) attracts science professionals who consider graduate medicine. The city\'s university population and NHS Scotland presence create a steady pipeline of GAMSAT candidates.',
        'What we hear from Edinburgh candidates: (1) Edinburgh Medical School is the primary target (GAMSAT 64+ overall); (2) the ScotGEM programme (Glasgow-led, St Andrews-partnered) is an alternative for rural-medicine interest; (3) working NHS professionals need evening/weekend sessions. We structure the consultation around target programme and March vs September GAMSAT sitting.',
      ],
    },
    faqs: [
      { question: 'Edinburgh or Glasgow medical school — what GAMSAT Section III score is competitive?', answer: 'Edinburgh Medical School requires GAMSAT 64+ overall with strong Section III. The ScotGEM programme (Glasgow/St Andrews) requires GAMSAT 60+. Dundee requires 58–62+. Our coaching targets Section III 65+ to keep all Scottish programmes competitive.' },
      { question: 'I\'m an NHS professional in Scotland — can I prepare alongside my shifts?', answer: 'Yes — many Scottish GAMSAT candidates are NHS professionals (junior doctors, nurses, pharmacists, physiotherapists). We schedule GMT evening sessions (7:30–9:30 PM) to fit around standard NHS shift patterns. Weekend sessions accommodate those on rotating schedules.' },
      { question: 'What is the ScotGEM programme?', answer: 'ScotGEM (Scottish Graduate Entry Medicine) is a 4-year programme jointly run by the University of Glasgow and University of St Andrews, with clinical placements in rural/remote Scotland (Highlands, Islands). It targets candidates committed to practising in underserved areas. GAMSAT is the primary admissions test. We coach the Section III biology component for ScotGEM candidates alongside standard Edinburgh Medical School applicants.' },
      { question: 'Do you accept GBP payment?', answer: 'Yes — GBP via UK bank transfer (Barclays, HSBC, Lloyds, NatWest, RBS) or international Visa/Mastercard. INR also available for Indian-origin candidates.' },
      { question: 'How does Cerebrum compare to UK GAMSAT prep providers?', answer: 'UK GAMSAT providers charge £600–£1,500 for all three sections. Cerebrum is a Section III biology specialist at £399–£1,249. Most candidates pair us with a generalist for Section I (Reasoning) and Section II (Written Communication).' },
    ],
  },

  manchester: {
    slug: 'manchester',
    city: 'Manchester',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'North West England',
    timezone: 'Greenwich Mean Time',
    timezoneShort: 'GMT',
    currency: { code: 'GBP', symbol: '£' },
    pricing: { selfPaced: '£349', smallBatch: '£799', oneOnOne: '£1,099' },
    locale: 'en_GB',
    metaTitle: 'GAMSAT Biology Tutor Manchester | Manchester, Lancaster, Keele',
    metaDescription:
      'GAMSAT Section III biology tutor for Manchester graduate medicine applicants — University of Manchester, Lancaster, Keele. AIIMS-trained biology specialists. From £349.',
    keywords: ['GAMSAT biology tutor Manchester', 'GAMSAT tutor Manchester medical school', 'GAMSAT tutor Lancaster', 'GAMSAT tutor Keele', 'graduate medicine tutor Manchester', 'GAMSAT Section III Manchester', 'GAMSAT North West England'],
    heroSubtitle:
      'GAMSAT Section III biology coaching for University of Manchester, Lancaster University, and Keele University graduate medicine applicants — North West England\'s graduate medicine cluster. AIIMS-trained biology specialists, GMT evening sessions, £349 to £1,099.',
    whySection: {
      heading: 'Why Manchester is the North West graduate medicine hub',
      paragraphs: [
        'Manchester anchors the largest graduate medicine cluster outside London and Scotland. The University of Manchester Medical School offers a graduate-entry stream accepting GAMSAT. Lancaster University Medical School and Keele University School of Medicine are within the wider North West catchment, both accepting GAMSAT for graduate entry.',
        'Manchester has a significant and growing Indian-origin community in Didsbury, Rusholme (Curry Mile corridor), Prestwich, and the wider South Manchester suburbs. NHS junior doctors, pharmacists, and tech professionals in the Northern Quarter and MediaCity (Salford) drive GAMSAT demand as career-changers targeting graduate medicine.',
      ],
    },
    medSchools: [
      { name: 'University of Manchester Medical School', programmes: 'MBChB (graduate entry, GAMSAT + interview)' },
      { name: 'Lancaster University Medical School', programmes: 'MBChB (graduate entry, GAMSAT-accepting)' },
      { name: 'Keele University School of Medicine', programmes: 'MBChB (graduate entry, GAMSAT-accepting)' },
      { name: 'University of Central Lancashire (UCLan)', programmes: 'MBBS (graduate entry pathway)' },
    ],
    timezoneSection: 'All live sessions timed for GMT (BST during summer). Standard Manchester small-batch slot is 7:30 PM to 9:30 PM GMT on weekday evenings. Weekend: 10:00 AM to 12:00 PM GMT.',
    demographicSection: {
      heading: 'Didsbury / Rusholme / MediaCity — the graduate medicine conversation',
      paragraphs: [
        'Manchester\'s Indian-origin community in Didsbury, Rusholme, and Prestwich, combined with career-changers from the tech/media sector in MediaCity and the Northern Quarter, drives steady GAMSAT demand.',
        'What we hear from Manchester candidates: (1) University of Manchester is the primary target (GAMSAT 62+ overall); (2) Lancaster and Keele are strong alternatives with slightly lower cut-offs (58–62); (3) NHS professionals from Manchester Royal Infirmary and Christie Hospital form a significant career-changer cohort. We structure the consultation around target programme and March vs September sitting.',
      ],
    },
    faqs: [
      { question: 'Manchester Medical School — what GAMSAT Section III is competitive?', answer: 'University of Manchester typically requires GAMSAT 62+ overall with strong Section III. Lancaster and Keele accept 58–62+. Our coaching targets Section III 63+ to keep all three North West programmes competitive.' },
      { question: 'I\'m an NHS professional in Manchester — can I prepare alongside shifts?', answer: 'Yes — many Manchester GAMSAT candidates are NHS staff. We schedule GMT evening sessions (7:30–9:30 PM) after standard shifts. Weekend sessions accommodate rotating patterns.' },
      { question: 'Do you accept GBP payment?', answer: 'Yes — GBP via UK bank transfer or international Visa/Mastercard. INR also available for Indian-origin candidates.' },
      { question: 'How does Cerebrum compare to Manchester GAMSAT providers?', answer: 'UK GAMSAT providers charge £600–£1,500 for all sections. Cerebrum is a Section III biology specialist at £349–£1,099. Most candidates pair us with a generalist for Section I and II.' },
    ],
  },

  birmingham: {
    slug: 'birmingham',
    city: 'Birmingham',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'West Midlands',
    timezone: 'Greenwich Mean Time',
    timezoneShort: 'GMT',
    currency: { code: 'GBP', symbol: '£' },
    pricing: { selfPaced: '£349', smallBatch: '£799', oneOnOne: '£1,099' },
    locale: 'en_GB',
    metaTitle: 'GAMSAT Biology Tutor Birmingham | Birmingham, Warwick, Aston',
    metaDescription:
      'GAMSAT Section III biology tutor for Birmingham graduate medicine applicants — University of Birmingham, Warwick, Aston. AIIMS-trained biology specialists. From £349.',
    keywords: ['GAMSAT biology tutor Birmingham', 'GAMSAT tutor Birmingham medical school', 'GAMSAT tutor Warwick', 'GAMSAT tutor Aston', 'graduate medicine tutor Birmingham', 'GAMSAT Section III Birmingham', 'GAMSAT West Midlands'],
    heroSubtitle:
      'GAMSAT Section III biology coaching for University of Birmingham, Warwick Medical School, and Aston Medical School graduate medicine applicants. AIIMS-trained biology specialists, GMT evening sessions, £349 to £1,099.',
    whySection: {
      heading: 'Why Birmingham is the Midlands graduate medicine centre',
      paragraphs: [
        'Birmingham is the UK\'s second city and anchors the Midlands medical education cluster. University of Birmingham Medical School offers a graduate-entry stream accepting GAMSAT. Warwick Medical School (Coventry, 25 miles east) is a 4-year graduate-entry-only programme — one of the UK\'s most competitive GAMSAT pathways. Aston Medical School in central Birmingham adds a newer graduate entry option.',
        'Birmingham has one of the largest South Asian communities in the UK, concentrated in Handsworth, Sparkbrook, Sparkhill, Edgbaston, and Solihull. Many are healthcare professionals (pharmacists, nurses, optometrists) targeting graduate medicine as a career upgrade. Queen Elizabeth Hospital Birmingham and University Hospitals Birmingham NHS Foundation Trust are major employers.',
      ],
    },
    medSchools: [
      { name: 'University of Birmingham Medical School', programmes: 'MBChB (graduate entry, GAMSAT + interview)' },
      { name: 'Warwick Medical School', programmes: 'MB ChB (4-year graduate entry ONLY, GAMSAT + interview)' },
      { name: 'Aston Medical School', programmes: 'MBChB (graduate entry pathway)' },
      { name: 'University of Leicester (Midlands catchment)', programmes: 'MBChB (graduate entry, GAMSAT-accepting)' },
    ],
    timezoneSection: 'All live sessions timed for GMT. Standard Birmingham small-batch slot is 7:30 PM to 9:30 PM GMT. Weekend: 10:00 AM to 12:00 PM GMT.',
    demographicSection: {
      heading: 'Handsworth / Edgbaston / Solihull — the graduate medicine conversation',
      paragraphs: [
        'Birmingham\'s South Asian community — one of the UK\'s largest — drives significant GAMSAT demand. Many candidates are pharmacists, optometrists, or NHS Allied Health professionals seeking graduate medicine as a career transition.',
        'What we hear from Birmingham candidates: (1) Warwick is the dream target (4-year graduate-only, but GAMSAT 65+ required); (2) Birmingham Medical School is the primary realistic target (62+); (3) Leicester is a strong Midlands backup (60+). We structure the consultation around Warwick vs Birmingham vs Leicester and the March GAMSAT sitting.',
      ],
    },
    faqs: [
      { question: 'Warwick Medical School — what GAMSAT score is competitive?', answer: 'Warwick is among the most competitive GAMSAT programmes in the UK — median accepted GAMSAT is 65+. Our coaching targets Section III 66+ for Warwick candidates. Birmingham Medical School requires 62+; Leicester requires 60+.' },
      { question: 'I\'m a pharmacist in Birmingham considering graduate medicine — is this feasible?', answer: 'Yes — pharmacists are one of the most common career-changer profiles in our Birmingham cohort. Your pharmacy degree provides strong biology foundations. Our coaching bridges the gap between pharmacy-level biology and GAMSAT Section III reasoning.' },
      { question: 'Do you accept GBP payment?', answer: 'Yes — GBP via UK bank transfer or international Visa/Mastercard. INR also available for Indian-origin candidates.' },
      { question: 'How does Cerebrum compare to Birmingham GAMSAT prep?', answer: 'UK GAMSAT providers charge £600–£1,500 for all sections. Cerebrum is a Section III biology specialist at £349–£1,099. Most candidates pair us with a generalist for Section I and II.' },
    ],
  },
  // ─── NEW ZEALAND ────────────────────────────────────────────────────────────
  auckland: {
    slug: 'auckland',
    city: 'Auckland',
    country: 'New Zealand',
    countryCode: 'NZ',
    region: 'Auckland',
    timezone: 'New Zealand Standard Time',
    timezoneShort: 'NZST',
    currency: { code: 'NZD', symbol: 'NZ$' },
    pricing: { selfPaced: 'NZ$599', smallBatch: 'NZ$1,199', oneOnOne: 'NZ$1,699' },
    locale: 'en_NZ',
    metaTitle: 'GAMSAT Biology Tutor Auckland | Auckland, Otago, Waikato',
    metaDescription:
      'GAMSAT Section III biology tutor for Auckland graduate medicine applicants — University of Auckland, University of Otago. AIIMS-trained biology specialists. From NZ$599.',
    keywords: ['GAMSAT biology tutor Auckland', 'GAMSAT tutor Auckland', 'GAMSAT tutor University of Auckland', 'GAMSAT tutor Otago', 'graduate medicine tutor New Zealand', 'GAMSAT Section III Auckland', 'GAMSAT New Zealand'],
    heroSubtitle:
      'GAMSAT Section III biology coaching for University of Auckland and University of Otago graduate medicine applicants — New Zealand\'s two GAMSAT-pathway medical schools. AIIMS-trained biology specialists, NZST evening sessions, NZ$599 to NZ$1,699.',
    whySection: {
      heading: 'Why Auckland is New Zealand\'s graduate medicine gateway',
      paragraphs: [
        'Auckland anchors New Zealand\'s graduate medicine pathway. The University of Auckland School of Medicine and University of Otago (Dunedin, with Auckland clinical campus) are New Zealand\'s only two medical schools — both accept GAMSAT for graduate entry. Auckland produces the majority of NZ GAMSAT candidates.',
        'Auckland has a growing Indian-origin community in East Auckland (Botany, Pakuranga, Howick), South Auckland (Manukau, Papatoetoe), and the North Shore. Healthcare professionals (nurses, pharmacists, physiotherapists) drive GAMSAT demand as career-changers targeting graduate medicine.',
      ],
    },
    medSchools: [
      { name: 'University of Auckland School of Medicine', programmes: 'MBChB (graduate entry, GAMSAT + MMI)' },
      { name: 'University of Otago (Dunedin + Auckland clinical campus)', programmes: 'MBChB (graduate entry, GAMSAT + interview)' },
    ],
    timezoneSection: 'All live sessions timed for NZST (UTC+12). Standard Auckland small-batch: 7:30–9:30 PM NZST weekday evenings. Weekend: 10:00 AM–12:00 PM NZST. Our IST morning sessions align with NZ evenings.',
    demographicSection: {
      heading: 'East Auckland / North Shore — the graduate medicine conversation',
      paragraphs: [
        'Auckland\'s Indian-origin community in Botany, Howick, Pakuranga, and the North Shore drives growing GAMSAT demand. Many are healthcare professionals (pharmacists, nurses, allied health) targeting graduate medicine.',
        'What we hear from Auckland candidates: (1) University of Auckland is the primary target (GAMSAT 58–62+); (2) Otago is the alternative with slightly different requirements; (3) working professionals need evening/weekend sessions. We structure the consultation around target programme and March vs September sitting.',
      ],
    },
    faqs: [
      { question: 'Auckland or Otago — what GAMSAT Section III is competitive?', answer: 'University of Auckland typically requires GAMSAT 58–62+ overall. University of Otago requires similar. Our coaching targets Section III 63+ to keep both NZ programmes competitive.' },
      { question: 'I\'m a working professional in Auckland — can I prepare alongside work?', answer: 'Yes — NZST evening sessions (7:30–9:30 PM) fit after standard work hours. Weekend sessions accommodate shift workers.' },
      { question: 'Do you accept NZD payment?', answer: 'Yes — NZD via New Zealand bank transfer (ANZ NZ, ASB, BNZ, Westpac NZ) or international Visa/Mastercard.' },
      { question: 'How does Cerebrum compare to NZ GAMSAT prep?', answer: 'NZ GAMSAT providers charge NZ$1,200–NZ$3,500 for all sections. Cerebrum is a Section III biology specialist at NZ$599–NZ$1,699. Most candidates pair us with a generalist for Section I and II.' },
    ],
  },

  wellington: {
    slug: 'wellington',
    city: 'Wellington',
    country: 'New Zealand',
    countryCode: 'NZ',
    region: 'Wellington',
    timezone: 'New Zealand Standard Time',
    timezoneShort: 'NZST',
    currency: { code: 'NZD', symbol: 'NZ$' },
    pricing: { selfPaced: 'NZ$599', smallBatch: 'NZ$1,199', oneOnOne: 'NZ$1,699' },
    locale: 'en_NZ',
    metaTitle: 'GAMSAT Biology Tutor Wellington | Otago, Auckland Medical',
    metaDescription:
      'GAMSAT Section III biology tutor for Wellington graduate medicine applicants. AIIMS-trained biology specialists. From NZ$599.',
    keywords: ['GAMSAT biology tutor Wellington', 'GAMSAT tutor Wellington', 'graduate medicine tutor Wellington', 'GAMSAT Section III Wellington', 'GAMSAT New Zealand Wellington'],
    heroSubtitle:
      'GAMSAT Section III biology coaching for Wellington-based graduate medicine applicants targeting University of Otago (Wellington clinical campus) and University of Auckland. AIIMS-trained faculty, NZST evening sessions, NZ$599 to NZ$1,699.',
    whySection: {
      heading: 'Why Wellington is New Zealand\'s capital for graduate medicine',
      paragraphs: [
        'Wellington hosts the University of Otago Wellington clinical campus — where Otago medical students complete their clinical years. Wellington Hospital and Capital & Coast DHB provide the clinical training environment. Graduate-entry candidates based in Wellington often target Otago\'s Wellington-based clinical placements.',
        'Wellington\'s public-sector and diplomatic community (New Zealand Parliament, government ministries, embassies) includes career-changers targeting graduate medicine — public-health professionals, policy analysts, and allied health workers.',
      ],
    },
    medSchools: [
      { name: 'University of Otago (Wellington clinical campus)', programmes: 'MBChB clinical years, research programmes' },
      { name: 'University of Auckland (remote application)', programmes: 'MBChB graduate entry' },
    ],
    timezoneSection: 'All live sessions timed for NZST. Standard Wellington small-batch: 7:30–9:30 PM NZST. Weekend: 10:00 AM–12:00 PM NZST.',
    demographicSection: {
      heading: 'Wellington public-sector corridor',
      paragraphs: [
        'Wellington\'s GAMSAT candidates include public-health professionals, allied health workers, and government policy analysts seeking career transitions to medicine.',
        'What we hear from Wellington candidates: (1) Otago Wellington campus is the natural target for locally-based training; (2) GAMSAT 58–62+ is competitive; (3) part-time study alongside government jobs requires flexible scheduling.',
      ],
    },
    faqs: [
      { question: 'Wellington vs Auckland — which medical school should I target?', answer: 'Both use GAMSAT. University of Otago has a Wellington clinical campus for later years. University of Auckland is in Auckland. For Wellington-based candidates, Otago is the natural choice for local clinical placements.' },
      { question: 'Do you accept NZD payment?', answer: 'Yes — NZD via NZ bank transfer or international Visa/Mastercard.' },
      { question: 'How does Cerebrum compare to NZ GAMSAT prep?', answer: 'NZ providers charge NZ$1,200–NZ$3,500 for all sections. Cerebrum is a Section III biology specialist at NZ$599–NZ$1,699.' },
    ],
  },
}

export function getGAMSATMetro(slug: string): GAMSATMetroConfig | null {
  return gamsatMetros[slug] ?? null
}

export const gamsatMetroSlugs = Object.keys(gamsatMetros)
