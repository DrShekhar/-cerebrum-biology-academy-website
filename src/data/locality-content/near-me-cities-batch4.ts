/**
 * Batch 4: 8 major metros (Mumbai, Bangalore, Chennai, Hyderabad,
 * Kolkata, Pune, Delhi, Ahmedabad). These cover the highest-population
 * NEET catchments missing from the 48 near-me cluster. Used to enrich
 * dropper batch pages + online NEET coaching pages + future metro-
 * specific landings.
 */

import type { NearMeCityData } from './near-me-cities'

export const NEAR_ME_CITIES_BATCH4: NearMeCityData[] = [
  {
    slug: 'mumbai',
    displayName: 'Mumbai',
    altNames: ['Bombay'],
    state: 'Maharashtra',
    region: 'West India',
    metroPopulationMn: 21.0,
    majorAreas: [
      'Andheri',
      'Bandra',
      'Powai',
      'Worli',
      'Goregaon',
      'Thane',
      'Navi Mumbai',
      'South Mumbai',
    ],
    feederSchools: [
      'Cathedral & John Connon School',
      'DAIS (Dhirubhai Ambani International School)',
      'ASB Mumbai (American School of Bombay)',
      'Hill Spring International',
      'Bombay Scottish School',
      'Jamnabai Narsee School',
      'Greenlawns High School',
      'Oberoi International School Goregaon',
    ],
    localCoachingPresence:
      "Allen Career Institute (Andheri + Borivali + Thane), Aakash Institute (multiple branches), FIITJEE Andheri, IIT Bombay-aligned coaching networks — Mumbai is India's second-biggest premium coaching market after Delhi NCR",
    stateQuotaCollege: 'Grant Government Medical College Mumbai',
    otherStateMedicalColleges: [
      'Lokmanya Tilak Municipal Medical College (Sion)',
      'Topiwala National Medical College (Nair)',
      'KEM Hospital + Seth GS Medical College',
      'GS Medical College + KEM Hospital',
    ],
    cityContext:
      "Mumbai is one of India's biggest NEET coaching markets — Allen, Aakash, Brilliant Tutorials all run flagship centers, and the city has unique advantages with multiple government medical colleges (Grant Medical College, LTMMC Sion, Nair, KEM, JJ) accessible via Maharashtra state quota. Cathedral, DAIS, ASB, and Oberoi International School Goregaon are top NEET-feeder schools — many DAIS / ASB students take dual NEET + USABO/MCAT tracks. The recurring profile: a Mumbai student at Allen Andheri scoring 670+ overall but biology stuck at 280-300, blocked from Grant Medical College or AIIMS Delhi reach.",
    whyOnlineHere:
      'Mumbai commute is the worst of any Indian city — Andheri to Powai can be 90 min in monsoon traffic. Live online classes eliminate this entirely; recordings cover any session missed due to weather. Plus: many Mumbai families have Gulf / Singapore / London relocation events — online continues seamlessly.',
    typicalAspirant:
      'Class 11 or 12 student in Bandra / Andheri / Powai / Worli at Cathedral, DAIS, ASB, or Jamnabai Narsee. Often from business or professional family. Target: Grant Medical College Mumbai (state quota) or AIIMS Delhi (all-India quota).',
    localFaqs: [
      {
        question: 'Cerebrum vs Allen Andheri / Aakash Borivali for biology?',
        answer:
          "For biology specifically — Cerebrum wins on batch size (6-25 vs Allen Andheri's 150+). Keep Allen / Aakash for PCM, add Cerebrum biology specialist layer.",
      },
      {
        question: 'Grant Medical College Mumbai biology cut-off?',
        answer:
          "Maharashtra state quota: ~335-350/360 biology — among India's highest cut-offs due to Mumbai competition density.",
      },
      {
        question: 'Schedule for a DAIS / ASB student with IB + NEET dual track?',
        answer:
          'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri. We have current students managing IB DP + NEET prep simultaneously through our parallel track.',
      },
      {
        question: 'Shipping to Andheri, Powai, Worli?',
        answer: 'Mumbai pincodes 2-3 days same-day in BKC / Worli / Bandra via local courier.',
      },
    ],
  },
  {
    slug: 'bangalore',
    displayName: 'Bengaluru',
    altNames: ['Bangalore'],
    state: 'Karnataka',
    region: 'South India',
    metroPopulationMn: 12.3,
    majorAreas: [
      'Indiranagar',
      'Koramangala',
      'HSR Layout',
      'Whitefield',
      'Jayanagar',
      'Malleshwaram',
      'Electronic City',
      'Yelahanka',
    ],
    feederSchools: [
      'NPS Indiranagar (National Public School)',
      'Inventure Academy',
      'Greenwood High',
      'Stonehill International School',
      'Bishop Cotton Boys School',
      'Vidya Mandir',
      'Trio World Academy',
      'Ekya Schools',
    ],
    localCoachingPresence:
      "Allen Career Institute (Jayanagar + Bannerghatta Road), Aakash Institute, BASE Educational Services (Karnataka heritage), Sri Chaitanya — Bangalore's tech-family base drives heavy NEET prep investment",
    stateQuotaCollege: 'Bangalore Medical College and Research Institute (BMCRI)',
    otherStateMedicalColleges: [
      'Mysore Medical College',
      'KMC Mangalore',
      'JJM Medical College Davangere',
      'AIIMS Mangalagiri',
    ],
    cityContext:
      "Bangalore is India's tech capital and one of the top NEET catchments — strong professional-family base drives heavy coaching spend. NPS Indiranagar, Inventure, and Stonehill are top NEET-feeder schools with strong Olympiad track records (multiple INBO / USABO / BBO qualifiers historically). BMCRI is the top local Karnataka state-quota target. The recurring profile: Bangalore tech-family child at Allen Jayanagar scoring well on PCM but biology depth is the rate-limiter.",
    whyOnlineHere:
      'Bangalore traffic is famously bad — Whitefield to Jayanagar can be 90+ min. Online removes this completely. Plus: Bangalore tech families often relocate to US / Singapore / UK — online continues seamlessly.',
    typicalAspirant:
      'Class 11 or 12 student in Indiranagar / Koramangala / HSR / Whitefield at NPS, Inventure, Stonehill, or Greenwood. Tech professional family. Target: BMCRI Bangalore or AIIMS Mangalagiri.',
    localFaqs: [
      {
        question: 'BMCRI biology cut-off?',
        answer: 'Karnataka state quota: ~330-345/360 biology general category recent years.',
      },
      {
        question: 'My child is at NPS / Inventure / Stonehill — fit?',
        answer:
          'Excellent fit — these schools have NCERT-aligned NEET preparation, and our Cerebrum biology specialist programme adds the depth Allen Jayanagar large batches cannot reach.',
      },
      {
        question: 'NPS Indiranagar olympiad pathway too?',
        answer:
          'Yes — Bangalore NEET aspirants increasingly take dual NEET + biology olympiad tracks. We run parallel programs.',
      },
      {
        question: 'Shipping to Whitefield or Electronic City?',
        answer: 'All Bangalore pincodes covered next-day.',
      },
    ],
  },
  {
    slug: 'chennai',
    displayName: 'Chennai',
    altNames: ['Madras'],
    state: 'Tamil Nadu',
    region: 'South India',
    metroPopulationMn: 11.0,
    majorAreas: [
      'Anna Nagar',
      'T. Nagar',
      'Adyar',
      'Velachery',
      'OMR',
      'Mylapore',
      'Nungambakkam',
      'Besant Nagar',
    ],
    feederSchools: [
      'DAV Boys Senior Secondary School',
      'PSBB Senior Secondary School',
      'Vidya Mandir Mylapore',
      'Padma Seshadri Bala Bhavan',
      'Chinmaya Vidyalaya',
      'Sri Sankara Senior Secondary School',
      'KC High',
      'Lady Andal Venkatasubba Rao School',
    ],
    localCoachingPresence:
      'Brilliant Tutorials (Chennai heritage chain), Allen Career Institute, Aakash Institute, Sri Chaitanya — Tamil Nadu has unique NEET policy dynamics + heritage coaching market',
    stateQuotaCollege: 'Madras Medical College',
    otherStateMedicalColleges: [
      'Stanley Medical College Chennai',
      'Government Kilpauk Medical College',
      'Government Tirunelveli Medical College',
    ],
    cityContext:
      "Chennai is South India's biggest NEET coaching catchment — Tamil Nadu has unique NEET state policy dynamics (legal challenges, state-board reservation rules) that affect college-seat distribution. Madras Medical College is one of India's most aspirational state-quota colleges. Brilliant Tutorials has decades of heritage; Allen and Aakash compete. The challenge: Tamil Nadu State Board to NCERT bridge is significant for state-board students; CBSE Chennai students from PSBB / DAV are already NCERT-aligned.",
    whyOnlineHere:
      'Chennai sprawl from OMR to Velachery to Anna Nagar means coaching commute can hit 75-90 min. Online eliminates this. Plus: many Chennai families have NRI Gulf or Singapore connections — online continues seamlessly.',
    typicalAspirant:
      'Class 11 or 12 student at PSBB / DAV / Vidya Mandir, often from doctor / business family with strong medical aspiration. Target: Madras Medical College (state quota) or AIIMS Madurai (new).',
    localFaqs: [
      {
        question: 'Will Cerebrum match Tamil Nadu State Board?',
        answer: 'We teach NEET NCERT. First 4 weeks bridge from TN State Board framing.',
      },
      {
        question: 'Madras Medical College biology cut-off?',
        answer: 'TN state quota: ~325-345/360 biology general category. Variable due to TN policy.',
      },
      { question: 'Live classes in Tamil?', answer: 'No — English (NEET medium of instruction).' },
      { question: 'Shipping to Anna Nagar or OMR?', answer: 'All Chennai pincodes 4-5 days.' },
    ],
  },
  {
    slug: 'hyderabad',
    displayName: 'Hyderabad',
    state: 'Telangana',
    region: 'South India',
    metroPopulationMn: 10.0,
    majorAreas: [
      'Jubilee Hills',
      'Banjara Hills',
      'Madhapur',
      'Gachibowli',
      'Kondapur',
      'Hitech City',
      'Kukatpally',
      'Ameerpet',
    ],
    feederSchools: [
      'Hyderabad Public School',
      'Chirec Public School',
      'Oakridge International',
      'Glendale Academy',
      'Meridian School',
      'CHIREC Schools',
      'St. Andrews School',
      'Sri Aurobindo International',
    ],
    localCoachingPresence:
      "Sri Chaitanya (Hyderabad heritage — multiple branches), Narayana, Allen Career Institute, FIITJEE — Telangana's aggressive coaching ecosystem mirrors Vijayawada",
    stateQuotaCollege: 'Osmania Medical College Hyderabad',
    otherStateMedicalColleges: [
      'Gandhi Medical College Secunderabad',
      'Kakatiya Medical College Warangal',
      'AIIMS Bibinagar (new)',
    ],
    cityContext:
      "Hyderabad is Telangana's capital and one of India's biggest NEET coaching markets — Sri Chaitanya and Narayana run multiple flagship centers, Allen and FIITJEE compete. The Telangana / Andhra coaching culture is famously aggressive (students often start NEET prep in Class 9). Osmania Medical College Hyderabad is the top local state-quota prize. The new AIIMS Bibinagar adds a top-tier local target. The recurring pattern: Sri Chaitanya / Narayana students score 660+ on PCM but biology stays at 280-300 due to mass-batch limitations.",
    whyOnlineHere:
      'Sri Chaitanya / Narayana students have packed schedules. Cerebrum biology as an add-on layer fits in the gaps (early morning before main coaching, or late evening after).',
    typicalAspirant:
      'Class 11 or 12 student at Sri Chaitanya Junior College or Narayana Junior College Hyderabad. Telugu family with extreme NEET focus. Target: Osmania Medical College (state quota) or AIIMS Bibinagar.',
    localFaqs: [
      {
        question: 'Already at Sri Chaitanya / Narayana Hyderabad — why add Cerebrum?',
        answer:
          'Biology depth. Their PCM is unmatched but biology batches are 150-200 students. Cerebrum biology runs early morning or late evening slots that fit your existing schedule.',
      },
      {
        question: 'Osmania Medical College biology cut-off?',
        answer:
          'Telangana state quota: ~335-350/360 biology — high due to AP/Telangana competition density.',
      },
      { question: 'Live classes in Telugu?', answer: 'No — English (NEET medium).' },
      {
        question: 'Shipping to Jubilee Hills or Hitech City?',
        answer: 'All Hyderabad pincodes 4-5 days.',
      },
    ],
  },
  {
    slug: 'kolkata',
    displayName: 'Kolkata',
    altNames: ['Calcutta'],
    state: 'West Bengal',
    region: 'East India',
    metroPopulationMn: 14.9,
    majorAreas: [
      'Salt Lake',
      'Park Street',
      'Ballygunge',
      'Alipore',
      'New Town',
      'Howrah',
      'Garia',
      'Behala',
    ],
    feederSchools: [
      'La Martiniere for Boys / Girls Kolkata',
      "St. Xavier's Collegiate School",
      'Don Bosco Park Circus',
      'South Point High School',
      'Modern High School for Girls',
      'DPS Ruby Park',
      'Heritage School',
      'Garden High School',
    ],
    localCoachingPresence:
      'Aakash Institute (Park Street + Salt Lake), Allen Career Institute, Brilliant Tutorials, FIITJEE — Bengali academic culture supports heavy coaching demand',
    stateQuotaCollege: 'Medical College Kolkata (Calcutta Medical College)',
    otherStateMedicalColleges: [
      'NRS Medical College Kolkata',
      'RG Kar Medical College Kolkata',
      'IPGMER Kolkata',
    ],
    cityContext:
      "Kolkata is West Bengal's capital with strong heritage academic culture — La Martiniere, St. Xavier's, Don Bosco produce strong NEET aspirants annually. Medical College Kolkata (Calcutta Medical College) is one of India's oldest and most aspirational state-quota colleges. Bengali families have a deep medical-education tradition. The challenge: West Bengal State Board to NCERT bridge for state-board students; CBSE / ICSE Kolkata students are already aligned.",
    whyOnlineHere:
      "Kolkata sprawl from Salt Lake to Howrah to Garia is real. Online removes commute. La Martiniere / St. Xavier's schedules are demanding — no-commute biology saves crucial hours.",
    typicalAspirant:
      "Class 11 or 12 student at La Martiniere, St. Xavier's, or South Point High School. Bengali professional family. Target: Calcutta Medical College or NRS Kolkata.",
    localFaqs: [
      {
        question: 'Calcutta Medical College biology cut-off?',
        answer: 'West Bengal state quota: ~325-345/360 biology general category.',
      },
      {
        question: "La Martiniere / St. Xavier's student schedule?",
        answer: 'Live online 5:30 PM - 8 PM IST fits cleanly. Both schools dismiss by 3 PM.',
      },
      {
        question: 'Will Cerebrum match West Bengal State Board?',
        answer: 'We teach NEET NCERT. First 4 weeks bridge from state-board framing.',
      },
      {
        question: 'Shipping to Salt Lake or Park Street?',
        answer: 'All Kolkata pincodes 4-5 days.',
      },
    ],
  },
  {
    slug: 'pune',
    displayName: 'Pune',
    altNames: ['Poona'],
    state: 'Maharashtra',
    region: 'West India',
    metroPopulationMn: 7.4,
    majorAreas: [
      'Koregaon Park',
      'Aundh',
      'Baner',
      'Wakad',
      'Kothrud',
      'Hadapsar',
      'Magarpatta',
      'Kalyani Nagar',
    ],
    feederSchools: [
      'Symbiosis School Pune',
      'Mercedes-Benz International School',
      "The Bishop's School",
      'Vidya Valley School',
      'Delhi Public School Pune',
      'UWC Mahindra College Pune',
      'Mahindra United World College',
      'Indus International School',
    ],
    localCoachingPresence:
      "Allen Career Institute (Koregaon Park), Aakash Institute, FIITJEE Pune, BMA — Maharashtra's second-biggest NEET coaching market after Mumbai",
    stateQuotaCollege: 'BJ Government Medical College Pune',
    otherStateMedicalColleges: [
      'Grant Government Medical College Mumbai',
      'Government Medical College Aurangabad',
      'AIIMS Nagpur',
    ],
    cityContext:
      "Pune is Maharashtra's academic and IT-hub city with strong professional-family base. BJ Government Medical College Pune is one of India's top state-quota colleges. UWC Mahindra Pune is a feeder for both NEET and international olympiads (USABO / BBO / IBO). Symbiosis and Bishop's schools produce strong NEET aspirants annually. The pattern: Pune tech-family students at Allen Koregaon Park do well on PCM but biology depth is limited.",
    whyOnlineHere:
      'Pune sprawl from Koregaon Park to Wakad to Hadapsar is real — 45-60 min commutes common. Online removes this. UWC Mahindra students benefit from biology specialist alignment with their IB curriculum.',
    typicalAspirant:
      "Class 11 or 12 student in Koregaon Park / Aundh / Baner at Symbiosis, Bishop's, or DPS Pune. Tech / professional family. Target: BJ Medical College Pune or AIIMS Nagpur.",
    localFaqs: [
      {
        question: 'BJ Medical College Pune biology cut-off?',
        answer: 'Maharashtra state quota: ~335-350/360 biology — high due to competition.',
      },
      {
        question: 'UWC Mahindra Pune fit?',
        answer:
          'Yes — UWC IB Biology HL students often pair with us for IBO/USABO biology olympiad prep alongside IB.',
      },
      {
        question: 'Will Cerebrum match Maharashtra State Board?',
        answer: 'NEET NCERT focus; 4-week state-board bridge available.',
      },
      { question: 'Shipping to Koregaon Park or Wakad?', answer: 'All Pune pincodes 3-4 days.' },
    ],
  },
  {
    slug: 'delhi',
    displayName: 'Delhi',
    altNames: ['New Delhi'],
    state: 'Delhi',
    region: 'North India',
    metroPopulationMn: 30.0,
    majorAreas: [
      'South Extension',
      'Vasant Vihar',
      'Greater Kailash',
      'Defence Colony',
      'Rohini',
      'Pitampura',
      'Dwarka',
      'Karol Bagh',
    ],
    feederSchools: [
      'DPS R K Puram',
      'Modern School Barakhamba Road',
      'Sanskriti School',
      'Sardar Patel Vidyalaya',
      'Vasant Valley School',
      'Springdales School',
      "Mother's International School",
      'Pathways School Noida',
    ],
    localCoachingPresence:
      "Allen Career Institute (multiple Delhi branches), Aakash Institute (multiple), FIITJEE Punjabi Bagh, Cerebrum offline center South Extension + Rohini — Delhi NCR is India's biggest premium NEET coaching market",
    stateQuotaCollege: 'Maulana Azad Medical College (MAMC) Delhi',
    otherStateMedicalColleges: [
      'Lady Hardinge Medical College Delhi',
      'Vardhman Mahavir Medical College & Safdarjung Hospital',
      'University College of Medical Sciences (UCMS)',
      'AIIMS Delhi',
    ],
    cityContext:
      "Delhi is Cerebrum's home city with 2 offline centers (South Extension + Rohini). The city has India's most aspirational NEET targets — MAMC, AIIMS Delhi, LHMC, VMMC, UCMS — and a tightly competitive coaching market. DPS RK Puram, Modern School Barakhamba, Sanskriti, Vasant Valley, and Sardar Patel Vidyalaya are top NEET-feeder schools. The recurring profile: South Delhi or West Delhi student at Allen Punjabi Bagh / Aakash CP scoring 670+ but biology stuck at 280-300, blocked from AIIMS Delhi reach.",
    whyOnlineHere:
      'Even with our offline centers available, families in Dwarka, Pitampura, or beyond find online more efficient — 60-90 min commute saved daily. Online students get identical biology faculty as offline.',
    typicalAspirant:
      'Class 11 or 12 student in South Ext / Vasant Vihar / GK / Rohini at DPS RKP, Modern, Sanskriti, or Vasant Valley. Delhi business / professional / diplomat family. Target: AIIMS Delhi (all-India quota) or MAMC (Delhi quota).',
    localFaqs: [
      {
        question: 'Cerebrum offline center vs online?',
        answer:
          'Same faculty, same curriculum. Online better for Dwarka / Pitampura families to save 60-90 min commute.',
      },
      {
        question: 'AIIMS Delhi biology cut-off?',
        answer:
          'All-India quota: 350+/360 biology consistently. We target this in our Pinnacle ZA tier.',
      },
      {
        question: 'My child is at DPS RK Puram / Modern Barakhamba — fit?',
        answer:
          'Both have strong NCERT alignment. Cerebrum biology specialist programme adds depth beyond school + Allen.',
      },
      {
        question: 'Shipping to South Ext or Vasant Vihar?',
        answer: 'All Delhi pincodes same-day via local courier.',
      },
    ],
  },
  {
    slug: 'ahmedabad',
    displayName: 'Ahmedabad',
    state: 'Gujarat',
    region: 'West India',
    metroPopulationMn: 8.4,
    majorAreas: [
      'Satellite',
      'Bodakdev',
      'Vastrapur',
      'Navrangpura',
      'Naranpura',
      'Maninagar',
      'Bopal',
      'SG Highway',
    ],
    feederSchools: [
      'Riverside School Ahmedabad',
      'Anand Niketan',
      'Delhi Public School Ahmedabad',
      'Kalorex Public School',
      'Eklavya Public School',
      'Zydus School for Excellence',
      'Udgam School',
      'St. Kabir School',
    ],
    localCoachingPresence:
      "Allen Career Institute (Satellite + Maninagar), Aakash Institute, Resonance Ahmedabad — Gujarat's biggest NEET coaching market with strong business-family backing",
    stateQuotaCollege: 'BJ Medical College Ahmedabad',
    otherStateMedicalColleges: [
      'Government Medical College Surat',
      'PDU GMC Rajkot',
      'AIIMS Rajkot (new)',
    ],
    cityContext:
      "Ahmedabad is Gujarat's commercial capital with strong industrial / business-family wealth driving heavy NEET prep spend. BJ Medical College Ahmedabad is the top local state-quota target alongside the new AIIMS Rajkot. Allen Satellite is the primary premium coaching presence; Aakash and Resonance compete. The pattern: Gujarati business family child scoring well on PCM but biology depth needs work.",
    whyOnlineHere:
      'Ahmedabad spread from Satellite to Maninagar to Bopal is real. Online removes commute and lets Riverside / Anand Niketan students with rigorous schedules manage NEET + school + Cerebrum biology.',
    typicalAspirant:
      'Class 11 or 12 student at Riverside, Anand Niketan, or DPS Ahmedabad. Gujarati business family. Target: BJ Medical College Ahmedabad or AIIMS Rajkot (new).',
    localFaqs: [
      {
        question: 'BJ Medical College Ahmedabad biology cut-off?',
        answer: 'Gujarat state quota: ~330-345/360 biology general category.',
      },
      {
        question: 'Will Cerebrum match Gujarat State Board?',
        answer: 'NEET NCERT focus; 4-week state-board bridge.',
      },
      {
        question: 'Schedule for a Riverside / Anand Niketan student?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri.',
      },
      {
        question: 'Shipping to Satellite or Bodakdev?',
        answer: 'All Ahmedabad pincodes 3-4 days.',
      },
    ],
  },

  // ─── WAVE 1.2 GAP CITIES ───────────────────────────────────────────
  {
    slug: 'nagpur',
    displayName: 'Nagpur',
    altNames: ['Orange City'],
    state: 'Maharashtra',
    region: 'Central India',
    metroPopulationMn: 2.9,
    majorAreas: [
      'Dharampeth',
      'Ramdaspeth',
      'Civil Lines',
      'Sadar',
      'Pratap Nagar',
      'Wardhaman Nagar',
      'Manish Nagar',
    ],
    feederSchools: [
      'Centre Point School',
      'Delhi Public School Nagpur',
      'Bhavans Bhagwandas Purohit Vidya Mandir',
      'St. Ursula Girls High School',
      'Somalwar High School',
      'Modern School Nagpur',
    ],
    localCoachingPresence:
      'Allen Career Institute (Ramdaspeth), Aakash Institute (Dharampeth), plus several strong regional institutes — Nagpur is the NEET hub for the entire Vidarbha region, but classroom batches run 100-200 students',
    stateQuotaCollege: 'Government Medical College Nagpur (GMC)',
    otherStateMedicalColleges: [
      'Indira Gandhi Government Medical College Nagpur (IGGMC)',
      'AIIMS Nagpur',
      'Grant Medical College Mumbai',
    ],
    cityContext:
      'Nagpur sits at the geographic centre of India and draws NEET aspirants from across Vidarbha — Amravati, Chandrapur, Wardha, Gondia. It has a serious three-college local target: GMC Nagpur, IGGMC, and the newer AIIMS Nagpur. Allen and Aakash anchor the coaching market alongside respected regional players, but batches are large and biology gets the same 45-minute treatment as physics. The recurring Vidarbha pattern: a strong, disciplined student whose biology recall plateaus at 280-300 while PCM holds up. Cerebrum runs as a biology-only specialist layer for Nagpur students who keep their existing PCM coaching.',
    whyOnlineHere:
      'Nagpur summers hit 45-47°C and the city sprawls from Dharampeth to Manish Nagar to Wardhaman Nagar — a daily coaching commute in that heat costs hours and stamina. Live online biology at fixed 5:30-8 PM IST slots removes the travel entirely and hands those hours back for NCERT revision.',
    typicalAspirant:
      'Class 11 or 12 student at Centre Point, DPS Nagpur, or Somalwar. Solid NCERT base, biology recall lagging PCM. Family target: GMC Nagpur or AIIMS Nagpur on Maharashtra state quota.',
    localFaqs: [
      {
        question: 'Is Cerebrum better than Allen Ramdaspeth or Aakash Nagpur for biology?',
        answer:
          "For biology alone — yes on batch size and depth. Allen and Aakash Nagpur run 100-200 student batches; Cerebrum runs 6-25 with weekly per-student review of your wrong MCQs. We don't teach physics or chemistry — keep your Nagpur PCM coaching and add Cerebrum biology as a ~6 hour/week layer.",
      },
      {
        question: 'What NEET score targets GMC Nagpur or AIIMS Nagpur?',
        answer:
          'GMC Nagpur on Maharashtra state quota historically needs ~630-650 general category; AIIMS Nagpur is more competitive at 680+. Biology (360/720) is where most Vidarbha students leave 40-60 marks on the table — that is exactly the gap we close.',
      },
      {
        question: 'Can a Centre Point or DPS Nagpur student attend alongside school?',
        answer:
          'Yes — live classes run 5:30-8 PM IST on Mon/Wed/Fri or weekend mornings, school-friendly. Recordings cover any clash with school tests.',
      },
      {
        question: 'Is study material delivered across Nagpur?',
        answer:
          'Yes — printed NCERT-line-by-line biology guide and chapter test booklets ship to all Nagpur pincodes; Dharampeth / Civil Lines / Manish Nagar typically 3-4 days by tracked courier.',
      },
    ],
  },

  {
    slug: 'agra',
    displayName: 'Agra',
    state: 'Uttar Pradesh',
    region: 'North India',
    metroPopulationMn: 1.8,
    majorAreas: ['Sanjay Place', 'Kamla Nagar', 'Dayalbagh', 'Civil Lines', 'Sikandra', 'Tajganj'],
    feederSchools: [
      "St. Peter's College Agra",
      "St. Conrad's Inter College",
      'Delhi Public School Agra',
      "St. Patrick's Junior College",
      'Summer Fields School',
      'Spring Dales School',
    ],
    localCoachingPresence:
      'Allen Career Institute (Sanjay Place), Aakash Institute (Kamla Nagar), plus local NEET institutes — Agra serves western UP but classroom batches are 100-180 students and biology-specialist attention is scarce',
    stateQuotaCollege: 'S.N. Medical College Agra (Sarojini Naidu)',
    otherStateMedicalColleges: ['KGMU Lucknow', 'GSVM Medical College Kanpur', 'IMS BHU Varanasi'],
    cityContext:
      "Agra anchors NEET prep for western UP — Mathura, Firozabad, Aligarh, and Etawah students come here or study online from home. S.N. Medical College Agra is the prized local state-quota target, with KGMU Lucknow the state-wide dream. The coaching market runs on Allen Sanjay Place and Aakash Kamla Nagar in large batches. The gap families report is biology: a child at St. Peter's or DPS Agra whose physics-chemistry climbs while biology recall stalls around 290. Cerebrum fits as a biology-only specialist add-on, not a replacement for existing PCM coaching.",
    whyOnlineHere:
      'Agra traffic between Sanjay Place, Dayalbagh, and Sikandra is heavy, and evening tuition commutes are slow. Live online biology at fixed 5:30-8 PM IST slots removes the travel and lets western-UP students who are outside Agra city attend the same specialist batch as those inside it.',
    typicalAspirant:
      "Class 11 or 12 student at St. Peter's, St. Conrad's, or DPS Agra. Strong NCERT base, biology recall the weak link. Family target: S.N. Medical College Agra (state quota) or KGMU Lucknow.",
    localFaqs: [
      {
        question: 'Is Cerebrum better than Allen Sanjay Place or Aakash Agra for biology?',
        answer:
          'For biology specifically — yes, on batch size and per-student review. Allen and Aakash Agra batches are 100-180 students; Cerebrum is 6-25 with weekly review of your wrong MCQs. We teach only biology — keep your Agra PCM coaching and layer Cerebrum biology on top at ~6 hours/week.',
      },
      {
        question: "What's the target for an Agra aspirant — S.N. Medical College or KGMU?",
        answer:
          'S.N. Medical College Agra on UP state quota historically needs ~630-650 general category; KGMU Lucknow, the most aspirational statewide, typically needs 680+. We calibrate the biology target to whichever college the family is aiming for.',
      },
      {
        question: 'Can a student from Mathura or Firozabad attend without moving to Agra?',
        answer:
          'Yes — that is the point of live online. Students from Mathura, Firozabad, and Aligarh attend the same 5:30-8 PM IST batch as Agra-city students, no relocation or hostel needed.',
      },
      {
        question: 'Does study material reach Dayalbagh and Kamla Nagar reliably?',
        answer:
          'Yes — printed NCERT-line-by-line biology guide and chapter test booklets ship to all Agra pincodes; Sanjay Place / Kamla Nagar / Dayalbagh typically 4-5 days by tracked courier.',
      },
    ],
  },

  {
    slug: 'jodhpur',
    displayName: 'Jodhpur',
    altNames: ['Blue City'],
    state: 'Rajasthan',
    region: 'North India',
    metroPopulationMn: 1.5,
    majorAreas: [
      'Sardarpura',
      'Ratanada',
      'Shastri Nagar',
      'Paota',
      'Chopasni Housing Board',
      'Basni',
    ],
    feederSchools: [
      'Delhi Public School Jodhpur',
      "St. Patrick's Sr. Sec. School",
      "Rajmata Krishna Kumari Girls' Public School",
      'Central Academy Sr. Sec. School',
      'Cambridge Sr. Sec. School',
      'Kendriya Vidyalaya Jodhpur',
    ],
    localCoachingPresence:
      "Allen Career Institute (Shastri Nagar), Aakash Institute (Sardarpura), plus local institutes riding on Kota's proximity — but biology is taught in the same large PCB batches, not as a specialism",
    stateQuotaCollege: 'AIIMS Jodhpur',
    otherStateMedicalColleges: ['Dr. S.N. Medical College Jodhpur', 'SMS Medical College Jaipur'],
    cityContext:
      "Jodhpur is western Rajasthan's NEET hub, drawing aspirants from Pali, Barmer, Jaisalmer, and Nagaur. It has a rare double target locally — AIIMS Jodhpur (one of the strongest AIIMS outside Delhi) and Dr. S.N. Medical College — which raises the bar and the ambition. Kota is only 5 hours away, so many families default to the Kota mould of huge PCB batches. The gap is the same one Kota is famous for: biology recall stalling while a student grinds physics-chemistry. Cerebrum runs as a biology-only specialist layer for Jodhpur students who keep their PCM coaching (local or Kota-style).",
    whyOnlineHere:
      "Jodhpur's spread from Sardarpura to Basni to Chopasni, plus the pull toward Kota for offline coaching, makes local specialist biology hard to access. Live online biology at 5:30-8 PM IST lets a Jodhpur student stay home, keep school, and still get small-batch biology depth that even Kota's mega-batches do not offer.",
    typicalAspirant:
      "Class 11 or 12 student at DPS Jodhpur, St. Patrick's, or Central Academy. Disciplined, Kota-aware, biology the weak link. Family target: AIIMS Jodhpur or Dr. S.N. Medical College on Rajasthan state quota.",
    localFaqs: [
      {
        question: 'Do I need to go to Kota, or can I prepare from Jodhpur?',
        answer:
          "You can prepare from Jodhpur. Kota's advantage is intensity, not biology depth — its batches are 100-200 students. Cerebrum gives you 6-25 student biology batches live online from home, so you get the specialist attention Kota lacks without leaving family and school.",
      },
      {
        question: 'What NEET score targets AIIMS Jodhpur or Dr. S.N. Medical College?',
        answer:
          'AIIMS Jodhpur is highly competitive — typically 690+ general category. Dr. S.N. Medical College on Rajasthan state quota historically needs ~640-660. Biology is where most students leave marks on the table; that is the gap we close.',
      },
      {
        question: 'Can a Pali or Barmer student join the Jodhpur batch online?',
        answer:
          'Yes — students from Pali, Barmer, Jaisalmer, and Nagaur attend the same live 5:30-8 PM IST batch as Jodhpur-city students, no relocation needed.',
      },
      {
        question: 'Does material reach Sardarpura and Ratanada reliably?',
        answer:
          'Yes — printed NCERT-line-by-line biology guide and chapter test booklets ship to all Jodhpur pincodes; Sardarpura / Ratanada / Shastri Nagar typically 4-5 days by tracked courier.',
      },
    ],
  },

  {
    slug: 'udaipur',
    displayName: 'Udaipur',
    altNames: ['City of Lakes'],
    state: 'Rajasthan',
    region: 'North India',
    metroPopulationMn: 0.65,
    majorAreas: [
      'Fatehpura',
      'Hiran Magri',
      'Bhupalpura',
      'Panchwati',
      'Sukhadia Circle',
      'Ashok Nagar',
    ],
    feederSchools: [
      'Delhi Public School Udaipur',
      "St. Paul's Sr. Sec. School",
      'Vidya Bhawan Sr. Sec. School',
      'Seedling Public School',
      "St. Anthony's Sr. Sec. School",
      'The Study Sr. Sec. School',
    ],
    localCoachingPresence:
      'Allen Career Institute (Hiran Magri), Aakash Institute (Sukhadia Circle), plus regional NEET institutes — Udaipur serves the Mewar belt but classroom batches are large and biology is not taught as a specialism',
    stateQuotaCollege: 'R.N.T. Medical College Udaipur',
    otherStateMedicalColleges: ['Geetanjali Medical College Udaipur', 'SMS Medical College Jaipur'],
    cityContext:
      'Udaipur is the NEET hub for the Mewar region — Rajsamand, Banswara, Dungarpur, Chittorgarh, and Pratapgarh feed into it. R.N.T. Medical College Udaipur is the prized local state-quota target, with Geetanjali the private option and SMS Jaipur the statewide aspiration. Allen and Aakash anchor the coaching market in large batches. The familiar gap: a disciplined Mewar student, strong on PCM, whose biology recall plateaus around 290-300. Cerebrum runs as a biology-only specialist add-on for Udaipur students who keep their existing PCM coaching.',
    whyOnlineHere:
      "Udaipur's hilly, lake-broken geography and the long commutes in from Rajsamand or Chittorgarh make daily offline biology coaching costly in time. Live online at 5:30-8 PM IST removes the travel and lets students across the Mewar belt share one specialist biology batch.",
    typicalAspirant:
      "Class 11 or 12 student at DPS Udaipur, St. Paul's, or Vidya Bhawan. Strong PCM, biology the weak link. Family target: R.N.T. Medical College Udaipur or SMS Jaipur on Rajasthan state quota.",
    localFaqs: [
      {
        question: 'Is Cerebrum better than Allen Hiran Magri or Aakash Udaipur for biology?',
        answer:
          'For biology specifically — yes, on batch size and per-student review. Allen and Aakash Udaipur run large PCB batches; Cerebrum runs 6-25 student biology-only batches with weekly review of your wrong MCQs. Keep your Udaipur PCM coaching and add Cerebrum biology at ~6 hours/week.',
      },
      {
        question: 'What NEET score targets R.N.T. Medical College Udaipur?',
        answer:
          'R.N.T. Medical College on Rajasthan state quota historically needs ~635-655 general category. Biology (360/720) is where most Mewar students leave marks on the table — exactly the gap we close.',
      },
      {
        question: 'Can a Rajsamand or Chittorgarh student join the Udaipur batch online?',
        answer:
          'Yes — students from Rajsamand, Banswara, Dungarpur, and Chittorgarh attend the same live 5:30-8 PM IST batch as Udaipur-city students, no relocation needed.',
      },
      {
        question: 'Does material reach Fatehpura and Hiran Magri reliably?',
        answer:
          'Yes — printed NCERT-line-by-line biology guide and chapter test booklets ship to all Udaipur pincodes; Fatehpura / Hiran Magri / Sukhadia Circle typically 4-5 days by tracked courier.',
      },
    ],
  },

  {
    slug: 'gwalior',
    displayName: 'Gwalior',
    state: 'Madhya Pradesh',
    region: 'Central India',
    metroPopulationMn: 1.2,
    majorAreas: ['City Center', 'Thatipur', 'Lashkar', 'Morar', 'DD Nagar', 'Govindpuri'],
    feederSchools: [
      'The Scindia School',
      'Delhi Public School Gwalior',
      'Carmel Convent Sr. Sec. School',
      "St. Paul's School Gwalior",
      'Little Angels High School',
      'Kendriya Vidyalaya Gwalior',
    ],
    localCoachingPresence:
      'Allen Career Institute (City Center), Aakash Institute (Thatipur), plus local NEET institutes — Gwalior serves the Chambal region but classroom batches are large and biology gets no specialist track',
    stateQuotaCollege: 'Gajra Raja Medical College Gwalior (GRMC)',
    otherStateMedicalColleges: [
      'Gandhi Medical College Bhopal',
      'Netaji Subhash Chandra Bose Medical College Jabalpur',
      'MGM Medical College Indore',
    ],
    cityContext:
      'Gwalior is the NEET hub for the Chambal-Gwalior region of Madhya Pradesh — Morena, Bhind, Datia, and Shivpuri students study here or online from home. Gajra Raja Medical College (GRMC) is the prized local state-quota target, with Gandhi Medical College Bhopal the statewide aspiration. The city has a strong schooling culture led by The Scindia School and DPS Gwalior. Allen and Aakash run the coaching market in large batches, and the recurring gap is biology depth — a strong student whose recall stalls around 290 while PCM improves. Cerebrum runs as a biology-only specialist layer for Gwalior students who keep their PCM coaching.',
    whyOnlineHere:
      "Gwalior's spread from Lashkar to Morar to City Center, and the long commutes in from Morena or Bhind, make daily offline biology coaching time-expensive. Live online at 5:30-8 PM IST removes the travel and lets Chambal-region students share one specialist biology batch.",
    typicalAspirant:
      'Class 11 or 12 student at The Scindia School, DPS Gwalior, or Carmel Convent. Strong PCM, biology the weak link. Family target: GRMC Gwalior or Gandhi Medical College Bhopal on MP state quota.',
    localFaqs: [
      {
        question: 'Is Cerebrum better than Allen City Center or Aakash Gwalior for biology?',
        answer:
          'For biology alone — yes, on batch size and per-student review. Allen and Aakash Gwalior run large PCB batches; Cerebrum runs 6-25 student biology-only batches with weekly review of your wrong MCQs. Keep your Gwalior PCM coaching and layer Cerebrum biology on top at ~6 hours/week.',
      },
      {
        question: 'What NEET score targets GRMC Gwalior?',
        answer:
          'Gajra Raja Medical College on MP state quota historically needs ~630-650 general category; Gandhi Medical College Bhopal is more competitive. Biology is where most Chambal-region students leave marks on the table — that is the gap we close.',
      },
      {
        question: 'Can a Morena or Bhind student join the Gwalior batch online?',
        answer:
          'Yes — students from Morena, Bhind, Datia, and Shivpuri attend the same live 5:30-8 PM IST batch as Gwalior-city students, no relocation needed.',
      },
      {
        question: 'Does material reach Thatipur and Lashkar reliably?',
        answer:
          'Yes — printed NCERT-line-by-line biology guide and chapter test booklets ship to all Gwalior pincodes; City Center / Thatipur / Lashkar typically 4-5 days by tracked courier.',
      },
    ],
  },
]
