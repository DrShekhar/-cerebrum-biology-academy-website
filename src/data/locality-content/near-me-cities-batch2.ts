/**
 * Batch 2 of NearMeCityData entries. Keeps near-me-cities.ts under
 * ~1000 lines for readability. Merged into the canonical export at
 * near-me-cities.ts via the array spread.
 */

import type { NearMeCityData } from './near-me-cities'

export const NEAR_ME_CITIES_BATCH2: NearMeCityData[] = [
  // ─── NORTH INDIA continued ───────────────────────────────────────
  {
    slug: 'bhubaneswar',
    displayName: 'Bhubaneswar',
    state: 'Odisha',
    region: 'East India',
    metroPopulationMn: 1.2,
    majorAreas: [
      'Saheed Nagar',
      'Patia',
      'Jaydev Vihar',
      'Chandrasekharpur',
      'Old Town',
      'Kalinga Nagar',
    ],
    feederSchools: [
      'DAV Public School Pokhariput',
      'KIIT International School',
      'Delhi Public School Kalinga',
      "St. Joseph's High School",
      'Saraswati Vidya Mandir',
      "Mother's Public School",
    ],
    localCoachingPresence:
      'Allen Career Institute (Saheed Nagar), Aakash Institute, FIITJEE, Sri Chaitanya — strong national chain presence; biology depth consistently the weak link',
    stateQuotaCollege: 'SCB Medical College Cuttack',
    otherStateMedicalColleges: [
      'MKCG Medical College Berhampur',
      'AIIMS Bhubaneswar',
      'VIMSAR Burla',
    ],
    cityContext:
      "Bhubaneswar is Odisha's primary NEET catchment with a strong KIIT-driven academic ecosystem and a real culture of medical-college aspiration. Local Allen and Aakash branches run large classroom batches; AIIMS Bhubaneswar (50% all-India + 50% state quota) is a top regional aspiration. The gap we see in Odisha students is biology question-pattern recognition — strong NCERT recall but slower on NEET-style application MCQs. Cerebrum's pattern-engineered weekly tests bridge this.",
    whyOnlineHere:
      'Patia and Chandrasekharpur students lose 60+ minutes commuting to Saheed Nagar coaching daily. Online removes that. Plus, KIIT University students preparing as droppers prefer the flexibility to attend live classes alongside their KIIT routine.',
    typicalAspirant:
      'Class 11 or 12 student in Saheed Nagar, Patia, or Jaydev Vihar; often at DAV Pokhariput or DPS Kalinga. Target: AIIMS Bhubaneswar or SCB Medical College Cuttack.',
    localFaqs: [
      {
        question: 'AIIMS Bhubaneswar vs SCB Medical College Cuttack — which is achievable?',
        answer:
          'SCB Cuttack is Odisha state quota 85%; recent biology cut-off ~315-330/360 general category. AIIMS Bhubaneswar requires 340+/360 in biology typically. Our programme calibrates target based on family choice.',
      },
      {
        question: 'Is Cerebrum better than Allen Saheed Nagar for biology?',
        answer:
          "For biology alone — yes, because of 6-25 student batches vs 150-200. We don't teach PCM, so families typically keep Allen for physics-chemistry and add Cerebrum for biology.",
      },
      {
        question: 'Can a Patia or Chandrasekharpur student attend live online + school?',
        answer:
          'Yes — 5:30 PM - 8 PM IST live batch fits after school. No commute to Saheed Nagar.',
      },
      {
        question: 'Shipping to KIIT campus or Old Town?',
        answer:
          'Yes — all Bhubaneswar pincodes covered including KIIT University, Old Town, and Kalinga Nagar in 4-5 days.',
      },
    ],
  },

  {
    slug: 'chandigarh',
    displayName: 'Chandigarh',
    altNames: ['Chandigarh UT'],
    state: 'Chandigarh (UT)',
    region: 'North India',
    metroPopulationMn: 1.1,
    majorAreas: [
      'Sector 8',
      'Sector 17',
      'Sector 22',
      'Sector 35',
      'Sector 44',
      'Panchkula',
      'Mohali',
      'Manimajra',
    ],
    feederSchools: [
      "St. Stephen's School",
      'Strawberry Fields High School',
      'Vivek High School',
      'Carmel Convent School',
      "St. John's High School",
      'Sacred Heart Senior Secondary School',
    ],
    localCoachingPresence:
      'Allen Career Institute (Sector 22), Aakash Institute, FIITJEE, Resonance — Chandigarh has the highest coaching density per capita in North India after Kota',
    stateQuotaCollege: 'Government Medical College & Hospital Chandigarh (Sector 32)',
    otherStateMedicalColleges: [
      'PGIMER Chandigarh (limited MBBS via Bachelor of Sciences route)',
      'AIIMS Bathinda',
      'BPS Khanpur Kalan',
    ],
    cityContext:
      "Chandigarh has one of India's highest NEET aspirant densities — driven by Punjab, Haryana, and Himachal families who treat Chandigarh as the regional academic hub. The Union Territory has its own 3% reservation pool plus all-India quota access, making it strategically attractive for families willing to establish UT residency. Local Allen Sector 22 and Aakash branches dominate but with the same large-batch limitation that drives biology score stagnation.",
    whyOnlineHere:
      'Tricity (Chandigarh + Mohali + Panchkula) students can commute to Sector 22 coaching but lose 60-90 minutes daily. Online classes free that time. Also: many Sector 8 / 35 families increasingly prefer online over offline to avoid coaching-area distraction culture.',
    typicalAspirant:
      "Class 11 or 12 student from Sector 8 / 35 / 44 / Mohali / Panchkula area; often at St. Stephen's, Vivek High, or Strawberry Fields. Target: GMCH Chandigarh (UT pool), AIIMS Bathinda, or top-tier all-India quota college.",
    localFaqs: [
      {
        question:
          'Is GMCH Chandigarh easier to crack than AIIMS Bathinda for a Chandigarh aspirant?',
        answer:
          'Both require ~330-345/360 biology in recent years. GMCH Chandigarh has a small UT pool (~3% reserved) plus 85% all-India. Bathinda has 85% all-India + 15% state quota for Punjab residents. Most Chandigarh aspirants target both.',
      },
      {
        question: 'How does Cerebrum compare to Allen Sector 22 for biology?',
        answer:
          'Allen Sector 22 has world-class brand recognition but 150+ student batches. For biology specifically, we run 6-25 students with weekly per-MCQ review. Families often keep Allen for physics-chemistry and add Cerebrum biology.',
      },
      {
        question: 'My child is in Mohali — can they still attend Cerebrum live online?',
        answer:
          'Yes — Mohali, Panchkula, and Manimajra are all serviceable. Live classes run on Zoom, batch schedule follows IST evening slots.',
      },
      {
        question: 'Shipping to Sector 8 / Mohali / Panchkula?',
        answer: 'Yes — all Tricity pincodes covered in 3-4 days via tracked courier.',
      },
    ],
  },

  {
    slug: 'coimbatore',
    displayName: 'Coimbatore',
    state: 'Tamil Nadu',
    region: 'South India',
    metroPopulationMn: 2.5,
    majorAreas: [
      'R.S. Puram',
      'Saibaba Colony',
      'Race Course',
      'Avinashi Road',
      'Peelamedu',
      'Singanallur',
    ],
    feederSchools: [
      'PSG Public School',
      'Stanes School',
      'CMS School',
      'GRD Matric Higher Secondary',
      'St. Francis Anglo Indian School',
      'Stanes Higher Secondary',
    ],
    localCoachingPresence:
      'Aakash Institute (R.S. Puram), Allen Career Institute, Sri Chaitanya, Narayana — south India has strong local chains, biology depth varies',
    stateQuotaCollege: 'Coimbatore Medical College',
    otherStateMedicalColleges: [
      'Madras Medical College Chennai',
      'Stanley Medical College Chennai',
      'Government Erode Medical College',
    ],
    cityContext:
      "Coimbatore is Western Tamil Nadu's primary NEET catchment with strong industrial-family wealth driving heavy private coaching spend. Tamil Nadu has a specific NEET state policy (legal challenges + state-wise reservation rules) that affects how seats are filled. Local feeder schools like PSG, Stanes, and CMS produce strong CBSE/ICSE foundations. The challenge: most Coimbatore Allen/Aakash branches are smaller satellite outposts compared to Chennai mega-centers, so depth of biology faculty is limited.",
    whyOnlineHere:
      'Coimbatore is geographically spread — R.S. Puram to Peelamedu is 25+ minutes; Saibaba Colony to coaching centers similar. Online removes this. Also: Coimbatore students with NRI relatives in Singapore / UAE often choose online so coaching continuity survives any family relocation.',
    typicalAspirant:
      'Class 11 or 12 student from R.S. Puram or Saibaba Colony, at PSG, Stanes, or CMS. Target: Coimbatore Medical College (TN state quota) or Madras Medical College Chennai.',
    localFaqs: [
      {
        question: 'Will Cerebrum biology teaching match Tamil Nadu State Board syllabus?',
        answer:
          'We teach NEET NCERT specifically because NEET tests NCERT, not Tamil Nadu State Board. If your child is on TN State Board, our first 4 weeks bridge from state-board framing to NCERT. CBSE/ICSE Coimbatore students from PSG, Stanes, CMS are already aligned.',
      },
      {
        question: 'Can a Coimbatore student attend in Tamil instead of English?',
        answer:
          'No — all NEET coaching is in English (NEET medium of instruction). The terminology must match NEET papers.',
      },
      {
        question: "What's the cut-off for Coimbatore Medical College?",
        answer:
          'TN state quota for Coimbatore Medical College has been ~310-325/360 biology general category in recent years. We target 340+/360 in our programme.',
      },
      {
        question: 'Shipping to Avinashi Road or Peelamedu?',
        answer: 'Yes — all Coimbatore pincodes covered in 5-6 days.',
      },
    ],
  },

  {
    slug: 'dehradun',
    displayName: 'Dehradun',
    state: 'Uttarakhand',
    region: 'North India',
    metroPopulationMn: 0.7,
    majorAreas: [
      'Rajpur Road',
      'Race Course',
      'Karanpur',
      'Vasant Vihar',
      'Clement Town',
      'Sahastradhara Road',
    ],
    feederSchools: [
      'The Doon School',
      "Welham Girls' School",
      "Welham Boys' School",
      "St. Joseph's Academy",
      'Cambrian Hall',
      "Tula's International School",
    ],
    localCoachingPresence:
      'Allen Career Institute, Aakash Institute, FIITJEE — coaching presence exists but Dehradun students traditionally go to Delhi NCR or Kota for serious prep',
    stateQuotaCollege: 'Government Doon Medical College',
    otherStateMedicalColleges: [
      'Government Medical College Haldwani',
      'AIIMS Rishikesh',
      'HNBGU Medical College Srinagar Garhwal',
    ],
    cityContext:
      'Dehradun has unique academic geography — home to elite residential schools (Doon, Welham) that produce NEET aspirants but coaching depth locally has historically been limited. Many families send children to Delhi NCR or Kota for Class 12 / dropper year. AIIMS Rishikesh (Uttarakhand quota) is the local prized institution. The cultural aspiration: stay in Uttarakhand for college (AIIMS Rishikesh or Doon Medical College) rather than relocate to NCR for both school and college.',
    whyOnlineHere:
      'Dehradun hill geography (Rajpur Road runs uphill) means commute is genuinely difficult. Online lets a Doon School or Welham student in Mussoorie hills do live coaching without daily Dehradun drive. Also: AIIMS Rishikesh is 1-hour drive — online makes coaching commute irrelevant when the target college is nearby.',
    typicalAspirant:
      "Class 11 or 12 day-scholar at Doon, Welham, or Joseph's Academy. Family target: AIIMS Rishikesh (top choice) or Doon Medical College Dehradun.",
    localFaqs: [
      {
        question: 'Should a Dehradun student relocate to Delhi NCR for NEET dropper year?',
        answer:
          'Less and less. With Cerebrum online biology + a local Allen / Aakash for PCM, Dehradun droppers can stay home through the year. Saves ₹2-3L hostel cost and avoids relocation stress.',
      },
      {
        question: "What's achievable for an AIIMS Rishikesh aspirant?",
        answer:
          'AIIMS Rishikesh has a 15% state quota for Uttarakhand residents (significant advantage). Biology cut-off has been ~330-345/360. Our programme targets 340+/360.',
      },
      {
        question:
          "How does the live online schedule fit a Doon School student's evening prep routine?",
        answer:
          'Live online biology runs 5:30 PM - 8 PM IST on Mon/Wed/Fri. School activities typically end by 4:30-5 PM. Fits cleanly.',
      },
      {
        question: 'Shipping to Rajpur Road or Mussoorie hills?',
        answer:
          'Yes — Dehradun, Rajpur Road, Race Course, Karanpur all covered in 4-5 days. Mussoorie shipping takes 6-8 days due to hill route.',
      },
    ],
  },

  {
    slug: 'faridabad',
    displayName: 'Faridabad',
    state: 'Haryana',
    region: 'North India',
    metroPopulationMn: 1.4,
    majorAreas: [
      'Sector 15',
      'Sector 21',
      'Sector 31',
      'NIT Faridabad',
      'Sector 86',
      'Sector 88',
      'NHPC Colony',
    ],
    feederSchools: [
      'Modern Vidya Niketan',
      'Apeejay School Faridabad',
      'DAV Public School Sector 14',
      'Manav Rachna International School',
      'Aravali International School',
      'Rawal International School',
    ],
    localCoachingPresence:
      'Allen Career Institute (Sector 21), Aakash Institute (NIT), Cerebrum (own Faridabad offline center) — heavy NCR coaching density',
    stateQuotaCollege: 'BPS Government Medical College for Women Khanpur Kalan',
    otherStateMedicalColleges: [
      'Kalpana Chawla Govt Medical College Karnal',
      'ESIC Medical College Faridabad',
      'PGIMS Rohtak',
    ],
    cityContext:
      "Faridabad is one of Cerebrum's home cities — we operate an offline center in Sector 51 area serving NCR students directly. The online programme exists for Faridabad students who prefer not to commute (especially with sector spread from 15 to 88+). Faridabad has a strong NCR-mindset NEET prep market alongside heavy Allen and Aakash competition. Faridabad-domicile aspirants have Haryana state quota access to BPS Khanpur Kalan, Karnal, and others.",
    whyOnlineHere:
      'Even with our offline Faridabad center available, families in Sector 86, Sector 88, and Greater Faridabad find the live online option more flexible. The same Cerebrum faculty teaches both modes — online students get identical biology curriculum without the commute. Or families pick online for biology + offline for occasional Sunday revision sessions.',
    typicalAspirant:
      'Class 11 or 12 student in Sectors 15 / 21 / 31 / 86 / 88, often at MVN, Apeejay, or DAV Sector 14. Target: ESIC Faridabad (local), BPS Khanpur Kalan, or AIIMS Delhi (all-India quota).',
    localFaqs: [
      {
        question: 'Cerebrum already has a Faridabad offline center — why pick online?',
        answer:
          'Flexibility. Students in Sector 86 / 88 / Greater Faridabad save 30-60 min daily by going online. Faculty and curriculum are identical; difference is delivery mode. Many families do online weekdays + offline Sunday revision sessions.',
      },
      {
        question: "What's the Haryana state quota situation for Faridabad students?",
        answer:
          'Faridabad-domiciled students access 85% Haryana state quota across BPS Khanpur Kalan, Karnal, ESIC Faridabad, PGIMS Rohtak, GMC Faridabad. Recent biology cut-off ~320-340/360 for general category.',
      },
      {
        question: 'Schedule for a MVN or Apeejay Class 12 student?',
        answer:
          'Live online biology 5:30 PM - 8 PM IST Mon/Wed/Fri + weekend tests. Fits MVN / Apeejay / DAV school timings cleanly.',
      },
      {
        question: 'Shipping to Sector 86 / NHPC Colony?',
        answer: 'All Faridabad sectors covered same-day to next-day via local courier.',
      },
    ],
  },

  {
    slug: 'ghaziabad',
    displayName: 'Ghaziabad',
    state: 'Uttar Pradesh',
    region: 'North India',
    metroPopulationMn: 2.4,
    majorAreas: [
      'Vaishali',
      'Indirapuram',
      'Kaushambi',
      'Raj Nagar',
      'Crossings Republik',
      'Vasundhara',
      'Sahibabad',
    ],
    feederSchools: [
      'DPS Ghaziabad',
      'KR Mangalam Global School',
      'Khaitan Public School',
      'Cambridge School',
      "St. Mary's Convent School",
      'DLF Public School',
    ],
    localCoachingPresence:
      'Allen Career Institute (Vaishali), Aakash Institute, FIITJEE — heavy NCR coaching with high competition',
    stateQuotaCollege: 'KGMU Lucknow (UP state quota)',
    otherStateMedicalColleges: [
      'IMS BHU Varanasi',
      'MLN Medical College Prayagraj',
      'Lala Lajpat Rai Memorial Medical College Meerut',
    ],
    cityContext:
      "Ghaziabad is UP's NCR-adjacent NEET market — students often see themselves as competing with Delhi students but face UP state quota college options. Indirapuram, Vaishali, and Crossings Republik are the modern NEET-aspirant hubs with high-income families. Local Allen Vaishali is the biggest classroom coaching. The pattern: students do well on physics-chemistry but biology stays at 280-300 in mass-coaching format.",
    whyOnlineHere:
      "Indirapuram / Vasundhara students who attend Allen Vaishali lose 30-45 min daily to coaching commute. Online removes that. Also: Ghaziabad students aiming at AIIMS Delhi (all-India quota) need biology depth that mass coaching doesn't deliver.",
    typicalAspirant:
      'Class 11 or 12 student in Indirapuram, Vaishali, or Crossings, at DPS Ghaziabad or KR Mangalam. Family target: KGMU Lucknow (UP state quota) or AIIMS Delhi (all-India quota).',
    localFaqs: [
      {
        question:
          'Should a Ghaziabad student target UP state quota or AIIMS Delhi all-India quota?',
        answer:
          'Both. UP state quota covers KGMU Lucknow, IMS BHU, MLN Prayagraj, LLRM Meerut — biology cut-off ~315-335/360. AIIMS Delhi via all-India quota needs 350+/360 biology. We target 340+/360 minimum.',
      },
      {
        question: 'Indirapuram to Allen Vaishali is 25-30 min — is online worth switching to?',
        answer:
          "For biology specifically — yes. Live online with Cerebrum gives small-batch depth that Allen Vaishali's 150+ batch can't. Keep Allen for PCM, add Cerebrum biology.",
      },
      {
        question: 'Schedule that fits DPS Ghaziabad day-scholar routine?',
        answer:
          'Live biology 5:30 PM - 8 PM IST Mon/Wed/Fri. DPS dismissal is typically 2:30-3 PM. Easy fit.',
      },
      {
        question: 'Shipping to Crossings Republik or Sahibabad?',
        answer: 'All Ghaziabad pincodes covered same-day to next-day.',
      },
    ],
  },

  {
    slug: 'greater-noida',
    displayName: 'Greater Noida',
    state: 'Uttar Pradesh',
    region: 'North India',
    metroPopulationMn: 0.65,
    majorAreas: [
      'Alpha 1',
      'Alpha 2',
      'Beta 1',
      'Beta 2',
      'Pi 1',
      'Pi 2',
      'Knowledge Park',
      'Pari Chowk',
    ],
    feederSchools: [
      'Pacific World School',
      'GD Goenka Public School',
      'Apeejay School',
      'DPS Greater Noida',
      'Lotus Valley International',
      'Cambridge School',
    ],
    localCoachingPresence:
      'Allen Career Institute (Knowledge Park), Aakash Institute, Resonance — newer market, smaller branches than Noida',
    stateQuotaCollege: 'KGMU Lucknow (UP state quota)',
    otherStateMedicalColleges: [
      'IMS BHU Varanasi',
      'MLN Medical College Prayagraj',
      'AIIMS Delhi (limited)',
    ],
    cityContext:
      'Greater Noida is a newer NCR satellite with a planned-city layout (Alpha, Beta, Pi sectors) and a strong tech-corridor parent base. Many families are first-generation professionals with focused NEET aspirations. Local Allen Knowledge Park exists but is smaller than Noida proper. The pattern: students benefit from quiet, distraction-free study environment of Greater Noida but face shallower local coaching depth.',
    whyOnlineHere:
      "Greater Noida sector spread + suboptimal public transport means commute to Noida coaching centers can be 45-60 min one-way. Live online removes that entirely. Also: Greater Noida's newer schools (Pacific World, Lotus Valley) align well with NCERT-NEET focus that Cerebrum teaches.",
    typicalAspirant:
      'Class 11 or 12 student in Alpha / Beta / Pi sectors, at Pacific World, GD Goenka, or DPS Greater Noida. Family target: KGMU Lucknow or AIIMS Delhi (all-India quota).',
    localFaqs: [
      {
        question: 'Is Cerebrum online suitable for a Greater Noida Alpha 1 / Beta 2 student?',
        answer:
          'Yes — live online via Zoom from any sector. No commute. Same faculty as our Delhi NCR offline centers.',
      },
      {
        question: "What's the UP state quota path for a Greater Noida aspirant?",
        answer:
          'UP domicile gives 85% state quota access to KGMU Lucknow, IMS BHU, MLN Prayagraj. Recent biology cut-off ~315-335/360 general category.',
      },
      {
        question: 'How does this compare with Allen Knowledge Park?',
        answer:
          'Allen Knowledge Park is solid for PCM but biology depth limited by batch size (~100 students). Cerebrum biology batches are 6-25 with per-student review.',
      },
      {
        question: 'Shipping to Knowledge Park or Pari Chowk?',
        answer: 'All Greater Noida sectors covered next-day.',
      },
    ],
  },

  {
    slug: 'gurugram',
    displayName: 'Gurugram',
    altNames: ['Gurgaon'],
    state: 'Haryana',
    region: 'North India',
    metroPopulationMn: 1.5,
    majorAreas: [
      'DLF Phase 1',
      'DLF Phase 4',
      'Golf Course Road',
      'Sohna Road',
      'Sector 14',
      'Sector 56',
      'Sector 82',
      'New Gurgaon',
    ],
    feederSchools: [
      'DPS RK Puram (Gurugram boundary)',
      'Shri Ram School (Aravali campus)',
      'Pathways World School',
      'GD Goenka Public School',
      'Heritage Xperiential Learning School',
      'Suncity School',
    ],
    localCoachingPresence:
      'Allen Career Institute (Sector 14), Aakash Institute, FIITJEE, Cerebrum (Gurugram offline center) — most premium coaching density in NCR',
    stateQuotaCollege: 'BPS Government Medical College for Women Khanpur Kalan',
    otherStateMedicalColleges: [
      'Kalpana Chawla Govt Medical College Karnal',
      'PGIMS Rohtak',
      'AIIMS Delhi (limited)',
    ],
    cityContext:
      'Gurugram is the highest-affluence NCR NEET market — corporate-executive families, premium schools, and high coaching willingness-to-pay. Cerebrum operates an offline Gurugram center for in-person learners; the online programme is the parallel track for families who prefer remote access or are in Sector 82 / New Gurgaon and find commute to Sector 14 inefficient. The competitive landscape includes premium options like Pathways and Shri Ram producing strong NEET aspirants annually.',
    whyOnlineHere:
      "Gurugram's spread from DLF Phase 1 to Sector 82 means coaching commute can exceed 60 min in traffic. Online removes that. Also: many Gurugram families have parents with frequent international travel and want online for continuity if family relocates temporarily.",
    typicalAspirant:
      'Class 11 or 12 student in DLF Phase 4 / Golf Course Road / Sector 82, often at Pathways, Shri Ram Aravali, or Heritage. Family target: AIIMS Delhi (all-India quota) or BPS Khanpur Kalan (Haryana state quota).',
    localFaqs: [
      {
        question: 'Cerebrum has a Gurugram offline center — why pick online?',
        answer:
          'Same faculty, same curriculum. Online is better for families in Sector 82 / New Gurgaon / Sohna Road area where commute to Sector 14 exceeds 45 min.',
      },
      {
        question: 'My child is at Pathways or Shri Ram Aravali — how does Cerebrum fit?',
        answer:
          "Both schools have strong NCERT alignment. Cerebrum biology specialist programme adds the NEET-pattern MCQ depth that even premium schools don't deliver at the coaching level.",
      },
      {
        question: 'AIIMS Delhi all-India quota target — what biology score?',
        answer:
          'AIIMS Delhi requires 350+/360 biology consistently. Our Pinnacle ZA tier (direct Dr. Shekhar mentorship) is calibrated for this.',
      },
      {
        question: 'Shipping to DLF Phase 1 / Golf Course Road?',
        answer: 'Same-day delivery to all Gurugram sectors via local courier.',
      },
    ],
  },

  {
    slug: 'guwahati',
    displayName: 'Guwahati',
    state: 'Assam',
    region: 'Northeast India',
    metroPopulationMn: 1.0,
    majorAreas: ['Beltola', 'Maligaon', 'Dispur', 'Khanapara', 'Chandmari', 'Six Mile', 'Ulubari'],
    feederSchools: [
      'Don Bosco School Guwahati',
      "St. Mary's English Higher Secondary School",
      'Faculty Higher Secondary School',
      'Maharishi Vidya Mandir',
      'Sankardev Sishu Niketan',
      'South Point School',
    ],
    localCoachingPresence:
      "Allen Career Institute (Maligaon), Aakash Institute, FIITJEE — Northeast's biggest NEET coaching hub but limited biology specialist depth",
    stateQuotaCollege: 'Gauhati Medical College Guwahati',
    otherStateMedicalColleges: [
      'Assam Medical College Dibrugarh',
      'Silchar Medical College',
      'AIIMS Guwahati (new)',
    ],
    cityContext:
      "Guwahati is Northeast India's primary NEET coaching catchment serving Assam, Manipur, Tripura, Meghalaya, Arunachal, Nagaland, Mizoram families. AIIMS Guwahati (new, opening for full strength) is the regional aspiration. Local Allen Maligaon is the biggest brand but Northeast students often face the disadvantage of regional-language schooling vs English-medium NCERT focus that NEET requires. Cerebrum's NCERT-line-by-line bridge specifically helps here.",
    whyOnlineHere:
      'Guwahati has limited biology specialist faculty depth — most national chains are present but with smaller branches than Delhi / Mumbai. Online with Cerebrum gives Guwahati students access to AIIMS-trained faculty without relocation.',
    typicalAspirant:
      "Class 11 or 12 student in Beltola, Dispur, or Khanapara, at Don Bosco, St. Mary's, or Maharishi Vidya Mandir. Often first-generation NEET aspirant. Target: AIIMS Guwahati (new), Gauhati Medical College, or Assam Medical College Dibrugarh.",
    localFaqs: [
      {
        question: 'AIIMS Guwahati is new — is it a realistic target?',
        answer:
          'Yes. AIIMS Guwahati started UG admissions recently with Assam state quota (15%) advantage for state residents. Biology cut-off projected ~330-345/360 based on early cohorts.',
      },
      {
        question:
          'Many Northeast students struggle with English-medium NEET. Does Cerebrum address this?',
        answer:
          'Yes — we teach in clear, NCERT-aligned English with explicit terminology drilling. Students from regional-medium schools (Assamese / Bengali / Bodo) typically adapt within 3-4 weeks.',
      },
      {
        question: 'How does the time zone work for Guwahati?',
        answer:
          'Guwahati IS in IST — same time zone as Delhi. Live classes 5:30 PM - 8 PM Mon/Wed/Fri.',
      },
      {
        question: 'Shipping to Beltola or Khanapara?',
        answer:
          'Yes — Guwahati pincodes covered in 6-7 days via tracked courier (slightly longer than mainland metros due to Northeast logistics).',
      },
    ],
  },

  {
    slug: 'haldwani',
    displayName: 'Haldwani',
    state: 'Uttarakhand',
    region: 'North India',
    metroPopulationMn: 0.21,
    majorAreas: [
      'Kathgodam',
      'Rampur Road',
      'Bhotia Parao',
      'Nainital Road',
      'Pant Nagar Road',
      'Lal Dant',
    ],
    feederSchools: [
      'Birla Vidya Mandir Nainital (boarders from Haldwani)',
      "St. Joseph's College Nainital",
      'Sherwood College Nainital',
      'Kasiga School',
      'Delhi Public School Haldwani',
      'St. Theresa Convent School',
    ],
    localCoachingPresence:
      'Aakash Institute, FIITJEE, smaller local centers — Haldwani is the gateway to Kumaon hills but coaching depth is limited',
    stateQuotaCollege: 'Government Medical College Haldwani',
    otherStateMedicalColleges: [
      'Government Doon Medical College Dehradun',
      'AIIMS Rishikesh',
      'HNBGU Srinagar Garhwal',
    ],
    cityContext:
      "Haldwani is Kumaon's gateway and Uttarakhand's second NEET coaching hub after Dehradun. The proximity to GMC Haldwani makes it a unique market where the target college is the local government medical college. Aspirants often come from Nainital, Almora, Pithoragarh, and other Kumaon hill stations. Local coaching is limited — most serious aspirants traditionally travel to Dehradun or Delhi. Online removes the relocation requirement.",
    whyOnlineHere:
      'Haldwani serves a hill-station catchment where Class 12 students at Birla Vidya Mandir Nainital or Sherwood College face genuine geographic isolation. Online live classes via Zoom work from any hill station with reliable internet (most Kumaon towns now have JIO/Airtel 4G/5G).',
    typicalAspirant:
      'Class 11 or 12 student at DPS Haldwani, St. Theresa, or boarder at Birla Vidya Mandir / Sherwood Nainital. Family target: GMC Haldwani (Uttarakhand state quota) or AIIMS Rishikesh.',
    localFaqs: [
      {
        question: "GMC Haldwani via Uttarakhand state quota — what's the biology cut-off?",
        answer:
          'Uttarakhand state quota for GMC Haldwani has been ~310-330/360 biology general category in recent years. AIIMS Rishikesh needs 340+/360.',
      },
      {
        question:
          'My child is a boarder at Birla Vidya Mandir Nainital — can they attend Cerebrum live online from school?',
        answer:
          'Yes, if the school permits weeknight online classes. Many residential schools now have study-hour Zoom permissions for NEET coaching. We can provide a parent-to-school request letter if needed.',
      },
      {
        question: 'What about internet reliability in Kumaon hills?',
        answer:
          'Most Kumaon hill towns (Nainital, Almora, Bhimtal) have JIO/Airtel 4G. Recordings are also available for any session affected by connectivity.',
      },
      {
        question: 'Shipping to Haldwani / Nainital / Almora?',
        answer: 'Haldwani 5-6 days, Nainital 6-7 days, Almora 7-8 days due to hill logistics.',
      },
    ],
  },

  {
    slug: 'haridwar',
    displayName: 'Haridwar',
    state: 'Uttarakhand',
    region: 'North India',
    metroPopulationMn: 0.31,
    majorAreas: ['Har ki Pauri', 'Kankhal', 'BHEL Ranipur', 'Jwalapur', 'Sidhcul', 'Bhupatwala'],
    feederSchools: [
      'DPS Ranipur',
      "St. Mary's Sr Sec School",
      'BHEL Senior Secondary School',
      'Modern Public School',
      'Saraswati Vidya Mandir',
      'Gurukul Kangri',
    ],
    localCoachingPresence:
      'Aakash Institute, smaller local coaching, students often travel to Roorkee or Dehradun for premium options',
    stateQuotaCollege: 'Government Medical College Haldwani',
    otherStateMedicalColleges: [
      'Government Doon Medical College Dehradun',
      'AIIMS Rishikesh (closest, 30 min)',
      'HNBGU Srinagar Garhwal',
    ],
    cityContext:
      "Haridwar is a unique market — proximity to AIIMS Rishikesh (just 30 min away) makes AIIMS the dominant local aspiration. The BHEL Ranipur township and Sidhcul industrial area produce many engineering-family children switching to NEET aspirations. Local coaching is limited; Roorkee's Allen and Dehradun coaching are typical alternatives. Online with Cerebrum lets Haridwar students prepare for AIIMS Rishikesh with AIIMS-trained faculty itself.",
    whyOnlineHere:
      'Haridwar is small enough that local coaching has limited depth. Driving to Roorkee or Dehradun for daily coaching is 1-1.5 hr each way — clearly impractical. Online removes the entire problem.',
    typicalAspirant:
      'Class 11 or 12 student in BHEL Ranipur or Kankhal, at DPS Ranipur or BHEL school. Family target: AIIMS Rishikesh (30 min away — Uttarakhand state quota advantage) or GMC Haldwani.',
    localFaqs: [
      {
        question: "AIIMS Rishikesh is 30 min from Haridwar — what's the realistic biology target?",
        answer:
          'AIIMS Rishikesh requires 340+/360 biology. Uttarakhand state quota gives 15% reservation advantage. Local Haridwar aspirants have a real shot if the biology score is right.',
      },
      {
        question: 'Is Cerebrum better than driving to Roorkee Allen for biology?',
        answer:
          "Live online removes the daily 2-3 hr commute Roorkee implies. Saved hours go into actual NEET MCQ practice. For biology specifically, small-batch model beats Allen Roorkee's large-batch.",
      },
      {
        question: 'BHEL Ranipur student schedule with Cerebrum?',
        answer:
          'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri. BHEL school dismissal is 2-3 PM. Easy fit.',
      },
      {
        question: 'Shipping to Haridwar pincodes including Kankhal and BHEL?',
        answer: 'All Haridwar pincodes covered in 5-6 days.',
      },
    ],
  },
]
