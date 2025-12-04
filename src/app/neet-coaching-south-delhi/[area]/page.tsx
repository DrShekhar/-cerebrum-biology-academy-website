'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  MapPin,
  GraduationCap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Award,
  Play,
  Target,
  Microscope,
  Building2,
  Train,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const areaDetails: Record<
  string,
  {
    name: string
    fullName: string
    description: string
    heroDescription: string
    nearbyMetro: string[]
    landmarks: string[]
    schools: string[]
    highlights: string[]
    type: string
    pincode: string
  }
> = {
  'hauz-khas': {
    name: 'Hauz Khas',
    fullName: 'Hauz Khas, South Delhi',
    description: 'Premier coaching hub near IIT Delhi campus',
    heroDescription:
      "Hauz Khas is South Delhi's premier education hub, located near IIT Delhi. Known for its vibrant culture and excellent connectivity, it's home to many NEET aspirants from nearby areas.",
    nearbyMetro: ['Hauz Khas Metro', 'Green Park Metro', 'IIT Delhi Metro'],
    landmarks: ['Hauz Khas Village', 'IIT Delhi', 'Deer Park', 'Hauz Khas Fort'],
    schools: ['DPS RK Puram', 'Sardar Patel Vidyalaya', 'Mount Carmel School'],
    highlights: ['Near IIT Delhi', 'Coaching Hub', 'Metro Connected', 'Cultural Center'],
    type: 'coaching-hub',
    pincode: '110016',
  },
  'kalu-sarai': {
    name: 'Kalu Sarai',
    fullName: 'Kalu Sarai, Near IIT Delhi',
    description: 'The coaching capital of Delhi near IIT Gate',
    heroDescription:
      "Kalu Sarai is famously known as Delhi's coaching capital, located right next to IIT Delhi main gate. It's the go-to destination for serious NEET and competitive exam aspirants.",
    nearbyMetro: ['IIT Delhi Metro', 'Hauz Khas Metro'],
    landmarks: ['IIT Delhi Main Gate', 'SDA Market', 'JNU'],
    schools: ['DPS RK Puram', 'Kendriya Vidyalaya JNU'],
    highlights: ['Coaching Capital', 'Near IIT Gate', 'Competitive Environment', 'Affordable'],
    type: 'coaching-hub',
    pincode: '110016',
  },
  'greater-kailash': {
    name: 'Greater Kailash',
    fullName: 'Greater Kailash (GK-I & GK-II), South Delhi',
    description: 'Premium residential area with affluent families',
    heroDescription:
      "Greater Kailash (GK) is one of South Delhi's most prestigious localities. Home to affluent families and students from top schools, GK has high demand for quality NEET coaching.",
    nearbyMetro: ['Greater Kailash Metro', 'Nehru Place Metro', 'Kailash Colony Metro'],
    landmarks: ['M Block Market', 'N Block Market', 'Archana Complex', 'GK-II M Block'],
    schools: ['DPS Greater Kailash', 'Springdales GK', 'The Indian School'],
    highlights: ['Premium Locality', 'DPS Students', 'High Demand', 'Affluent Area'],
    type: 'posh',
    pincode: '110048',
  },
  'defence-colony': {
    name: 'Defence Colony',
    fullName: 'Defence Colony, South Delhi',
    description: 'Prestigious colony with defence and government families',
    heroDescription:
      "Defence Colony is one of Delhi's most prestigious residential areas, home to defence personnel, senior government officials, and educated families seeking quality education for their children.",
    nearbyMetro: ['Lajpat Nagar Metro', 'Moolchand Metro'],
    landmarks: ['Defence Colony Market', 'Lajpat Nagar Central Market'],
    schools: ['Modern School Barakhamba', 'Delhi Public School'],
    highlights: ['Prestigious Colony', 'Educated Families', 'Metro Access', 'Central Location'],
    type: 'posh',
    pincode: '110024',
  },
  'vasant-vihar': {
    name: 'Vasant Vihar',
    fullName: 'Vasant Vihar, South Delhi',
    description: 'Ultra-premium locality with embassies and top schools',
    heroDescription:
      "Vasant Vihar is South Delhi's ultra-premium residential area, home to embassies, diplomats, and students from elite schools like DPS Vasant Vihar, Modern School, and Vasant Valley.",
    nearbyMetro: ['Vasant Vihar Metro'],
    landmarks: ['Priya Complex', 'DPS Vasant Vihar', 'American Embassy School'],
    schools: ['DPS Vasant Vihar', 'Modern School', 'Vasant Valley School', 'The Shri Ram School'],
    highlights: ['Ultra Premium', 'Embassy Area', 'Top Schools', 'Elite Students'],
    type: 'posh',
    pincode: '110057',
  },
  saket: {
    name: 'Saket',
    fullName: 'Saket, South Delhi',
    description: 'Modern area with excellent connectivity',
    heroDescription:
      'Saket is a rapidly developing area in South Delhi known for Select City Walk mall and excellent metro connectivity. Growing demand for quality NEET coaching from local students.',
    nearbyMetro: ['Saket Metro', 'Malviya Nagar Metro', 'Hauz Khas Metro'],
    landmarks: ['Select City Walk', 'DLF Place', 'Saket District Centre'],
    schools: ['Salwan Public School', 'Ryan International'],
    highlights: ['Modern Area', 'Metro Hub', 'Shopping District', 'Growing Demand'],
    type: 'residential',
    pincode: '110017',
  },
  'malviya-nagar': {
    name: 'Malviya Nagar',
    fullName: 'Malviya Nagar, South Delhi',
    description: 'Affordable coaching destination with good connectivity',
    heroDescription:
      'Malviya Nagar is a popular residential and educational hub offering affordable coaching options with excellent metro connectivity to all parts of Delhi.',
    nearbyMetro: ['Malviya Nagar Metro'],
    landmarks: ['Malviya Nagar Market', 'Shivalik', 'Panchshila Club'],
    schools: ['Apeejay School', 'DAV Public School'],
    highlights: ['Affordable', 'Student Area', 'Metro Access', 'Budget Friendly'],
    type: 'coaching-hub',
    pincode: '110017',
  },
  'green-park': {
    name: 'Green Park',
    fullName: 'Green Park, South Delhi',
    description: 'Central location with easy accessibility',
    heroDescription:
      'Green Park is a well-connected residential area in South Delhi, offering easy access to coaching centers in Hauz Khas and Kalu Sarai. Ideal for students seeking quality education.',
    nearbyMetro: ['Green Park Metro'],
    landmarks: ['Green Park Market', 'Aurobindo Market', 'Green Park Extension'],
    schools: ['Sardar Patel Vidyalaya', 'Springdales School'],
    highlights: ['Central Location', 'Metro Connected', 'Residential Area', 'Easy Access'],
    type: 'residential',
    pincode: '110016',
  },
  'panchsheel-park': {
    name: 'Panchsheel Park',
    fullName: 'Panchsheel Park, South Delhi',
    description: 'Upscale residential area near Greater Kailash',
    heroDescription:
      'Panchsheel Park is an upscale residential colony in South Delhi, home to educated professionals and students from top schools seeking premium NEET coaching.',
    nearbyMetro: ['Panchsheel Park Metro', 'Chirag Delhi Metro'],
    landmarks: ['Panchsheel Club', 'Sheikh Sarai'],
    schools: ['The Indian School', 'Springdales Pusa Road'],
    highlights: ['Upscale Living', 'Near GK', 'Premium Students', 'Quiet Locality'],
    type: 'posh',
    pincode: '110017',
  },
  'new-friends-colony': {
    name: 'New Friends Colony',
    fullName: 'New Friends Colony, South Delhi',
    description: 'Established colony with educated families',
    heroDescription:
      'New Friends Colony (NFC) is a well-established residential area with educated families and good schools. Students here seek quality NEET coaching with flexible timings.',
    nearbyMetro: ['Sukhdev Vihar Metro', 'Okhla Metro'],
    landmarks: ['NFC Market', 'Friends Colony', 'Okhla Industrial Area'],
    schools: ['Amity International', 'Mount Carmel School'],
    highlights: ['Established Colony', 'Educated Families', 'Good Schools', 'NFC Market'],
    type: 'residential',
    pincode: '110025',
  },
  'cr-park': {
    name: 'CR Park',
    fullName: 'Chittaranjan Park, South Delhi',
    description: 'Bengali community known for academic excellence',
    heroDescription:
      'Chittaranjan Park (CR Park) is famous for its Bengali community with strong academic traditions. High concentration of NEET aspirants with focus on quality education.',
    nearbyMetro: ['Kalkaji Mandir Metro', 'Govind Puri Metro'],
    landmarks: ['CR Park Market', 'Durga Puja Pandals', 'Kalkaji Temple'],
    schools: ['DAV Public School', 'Sarvodaya Vidyalaya'],
    highlights: ['Academic Culture', 'Bengali Community', 'Education Focus', 'Cultural Hub'],
    type: 'residential',
    pincode: '110019',
  },
  'vasant-kunj': {
    name: 'Vasant Kunj',
    fullName: 'Vasant Kunj, South Delhi',
    description: 'Large residential complex near airport',
    heroDescription:
      'Vasant Kunj is a large DDA housing complex near the airport. Home to Vasant Valley School and many NEET aspirants from various sectors (B1, B2, C, D).',
    nearbyMetro: ['Vasant Kunj Metro'],
    landmarks: ['Vasant Valley School', 'Ambience Mall', 'DLF Promenade', 'Nelson Mandela Marg'],
    schools: [
      'Vasant Valley School',
      'The Mothers International School',
      'Delhi Police Public School',
    ],
    highlights: ['Large Complex', 'DDA Housing', 'Near Airport', 'Vasant Valley School'],
    type: 'gated',
    pincode: '110070',
  },
  // Government Officer Colonies
  'rk-puram': {
    name: 'RK Puram',
    fullName: 'RK Puram (All Sectors), South Delhi',
    description: 'Premier government officers colony in South Delhi',
    heroDescription:
      "RK Puram is one of South Delhi's largest residential colonies, home to CPWD, Central Govt, and PSU officers. With sectors from 1 to 13, it has a high concentration of educated families seeking quality NEET coaching for their children.",
    nearbyMetro: ['RK Puram Metro', 'Munirka Metro', 'IIT Delhi Metro'],
    landmarks: ['Sector Markets', 'DPS RK Puram', 'CPWD Offices', 'Bhikaji Cama Place'],
    schools: ['DPS RK Puram', 'Army Public School', 'Kendriya Vidyalaya RK Puram'],
    highlights: ['Govt Officers Colony', 'All Sectors Covered', 'DPS RKP Students', 'Metro Access'],
    type: 'govt-colony',
    pincode: '110022',
  },
  'sarojini-nagar': {
    name: 'Sarojini Nagar',
    fullName: 'Sarojini Nagar, South Delhi',
    description: 'Famous government quarters and DDA flats area',
    heroDescription:
      'Sarojini Nagar houses thousands of government employees in DDA flats and Type I-IV quarters. Known for its famous market, it has a large student population seeking affordable yet quality NEET coaching.',
    nearbyMetro: ['Sarojini Nagar Metro', 'INA Metro'],
    landmarks: ['Sarojini Nagar Market', 'DDA Flats', 'Govt Quarters', 'INA Market'],
    schools: ['Kendriya Vidyalaya Sarojini Nagar', 'Sarvodaya Vidyalaya', 'Army School'],
    highlights: ['Govt Quarters', 'DDA Flats', 'Affordable Area', 'Famous Market'],
    type: 'govt-colony',
    pincode: '110023',
  },
  'lodhi-colony': {
    name: 'Lodhi Colony',
    fullName: 'Lodhi Colony, New Delhi',
    description: 'Exclusive IAS/IPS officers residential area',
    heroDescription:
      'Lodhi Colony is an exclusive residential area for senior IAS, IPS, and Class-I officers near Lodhi Gardens. Families here seek premium NEET coaching with personalized attention for their high-achieving children.',
    nearbyMetro: ['Jor Bagh Metro', 'Khan Market Metro'],
    landmarks: ['Lodhi Gardens', 'Khan Market', 'India Habitat Centre', 'IGNCA'],
    schools: ['Modern School Barakhamba', "St. Columba's School", 'Mater Dei School'],
    highlights: ['IAS/IPS Officers', 'Premium Locality', 'Near Lodhi Gardens', 'Elite Families'],
    type: 'govt-colony',
    pincode: '110003',
  },
  'andrews-ganj': {
    name: 'Andrews Ganj',
    fullName: 'Andrews Ganj, South Delhi',
    description: 'Senior government officials residential complex',
    heroDescription:
      'Andrews Ganj is a Type V-VI government quarters complex for senior officers near South Extension. Residents include IAS, IPS, and senior bureaucrats seeking quality education for their children.',
    nearbyMetro: ['AIIMS Metro', 'Green Park Metro'],
    landmarks: ['South Extension Market', 'Ring Road', 'AIIMS Hospital'],
    schools: ['Holy Child Auxilium', 'Modern School', 'Delhi Public School'],
    highlights: ['Senior Officers Colony', 'Near South Ex', 'Premium Quarters', 'Central Location'],
    type: 'govt-colony',
    pincode: '110049',
  },
  'kidwai-nagar': {
    name: 'Kidwai Nagar',
    fullName: 'Kidwai Nagar (East & West), South Delhi',
    description: 'Government employee residential colony near AIIMS',
    heroDescription:
      'Kidwai Nagar (East & West) is a large government colony near AIIMS, housing thousands of central govt employees. With the new redevelopment, it attracts families seeking quality NEET coaching.',
    nearbyMetro: ['AIIMS Metro', 'Kidwai Nagar Metro'],
    landmarks: ['AIIMS Hospital', 'Kidwai Nagar Redevelopment', 'Safdarjung Hospital'],
    schools: ['Kendriya Vidyalaya AIIMS', 'Sarvodaya Vidyalaya', 'Govt Schools'],
    highlights: ['Central Govt Employees', 'Near AIIMS', 'Redeveloped Colony', 'Affordable'],
    type: 'govt-colony',
    pincode: '110023',
  },
  'netaji-nagar': {
    name: 'Netaji Nagar',
    fullName: 'Netaji Nagar, South Delhi',
    description: 'Government quarters near South Delhi hub',
    heroDescription:
      'Netaji Nagar is a Type I-IV government quarters complex in South Delhi. Home to central government employees seeking quality and affordable NEET coaching for their children.',
    nearbyMetro: ['AIIMS Metro', 'Green Park Metro'],
    landmarks: ['Netaji Nagar Market', 'IIT Flyover', 'South Delhi Hub'],
    schools: ['Kendriya Vidyalaya', 'Sarvodaya Vidyalaya', 'DAV Public School'],
    highlights: ['Govt Quarters', 'Central Location', 'Affordable Area', 'Near IIT Delhi'],
    type: 'govt-colony',
    pincode: '110023',
  },
  'moti-bagh': {
    name: 'Moti Bagh',
    fullName: 'Moti Bagh, South Delhi',
    description: 'Large government officers colony in South Delhi',
    heroDescription:
      "Moti Bagh is one of South Delhi's largest government colonies, housing Type III-V officers. The multi-storey complex has a high concentration of educated families with NEET-aspiring children.",
    nearbyMetro: ['Moti Bagh Metro', 'Durgabai Deshmukh Metro'],
    landmarks: ['Bhikaji Cama Place', 'Africa Avenue', 'Moti Bagh Flyover'],
    schools: ['Air Force Bal Bharati', 'Army Public School', 'Kendriya Vidyalaya'],
    highlights: ['Govt Officers Colony', 'Large Complex', 'Metro Connected', 'Defence Families'],
    type: 'govt-colony',
    pincode: '110021',
  },
  // Ultra-Premium Lutyens Delhi
  'golf-links': {
    name: 'Golf Links',
    fullName: 'Golf Links, New Delhi',
    description: 'Ultra-premium Lutyens Delhi residential area',
    heroDescription:
      "Golf Links is one of India's most expensive residential areas in Lutyens Delhi. Home to industrialists, diplomats, and elite families who demand exclusive, personalized NEET coaching.",
    nearbyMetro: ['Khan Market Metro', 'Jor Bagh Metro'],
    landmarks: ['India Gate', 'Khan Market', 'Supreme Court', 'India Habitat Centre'],
    schools: ['The Shri Ram School', 'Modern School', 'Convent of Jesus & Mary'],
    highlights: ['Ultra Premium', 'Lutyens Delhi', 'Elite Families', 'Personalized Coaching'],
    type: 'ultra-premium',
    pincode: '110003',
  },
  'jor-bagh': {
    name: 'Jor Bagh',
    fullName: 'Jor Bagh, New Delhi',
    description: 'Premium Lutyens area near Lodhi Gardens',
    heroDescription:
      'Jor Bagh is a premium residential enclave near Lodhi Gardens, home to diplomats, senior bureaucrats, and business families seeking the finest NEET preparation for their children.',
    nearbyMetro: ['Jor Bagh Metro'],
    landmarks: ['Lodhi Gardens', 'Lodhi Art District', 'Jor Bagh Market'],
    schools: ['Modern School', 'The Shri Ram School', 'Springdales School'],
    highlights: ['Lutyens Area', 'Near Lodhi Gardens', 'Premium Locality', 'Art District'],
    type: 'ultra-premium',
    pincode: '110003',
  },
  'sunder-nagar': {
    name: 'Sunder Nagar',
    fullName: 'Sunder Nagar, New Delhi',
    description: 'Elite embassy and diplomatic enclave',
    heroDescription:
      'Sunder Nagar is an exclusive residential area near embassies and diplomatic missions. Home to diplomats and elite families seeking world-class NEET coaching with flexible schedules.',
    nearbyMetro: ['Khan Market Metro', 'Pragati Maidan Metro'],
    landmarks: ['Purana Qila', 'National Zoo', 'Sunder Nursery', "Humayun's Tomb"],
    schools: ['Sanskriti School', 'Modern School', 'The Shri Ram School'],
    highlights: ['Embassy Area', 'Diplomatic Enclave', 'Elite Families', 'Historical Area'],
    type: 'ultra-premium',
    pincode: '110003',
  },
  // Student Hub Areas
  munirka: {
    name: 'Munirka',
    fullName: 'Munirka, South Delhi',
    description: 'Student hub near JNU with affordable options',
    heroDescription:
      'Munirka is a vibrant student hub near JNU, known for affordable PGs and coaching centers. Many NEET aspirants from across India stay here for focused preparation.',
    nearbyMetro: ['Munirka Metro', 'RK Puram Metro'],
    landmarks: ['JNU Campus', 'Munirka Village', 'Nelson Mandela Marg'],
    schools: ['Kendriya Vidyalaya JNU', 'Sarvodaya Vidyalaya', 'Govt Schools'],
    highlights: ['Student Hub', 'Near JNU', 'Affordable PGs', 'Serious Aspirants'],
    type: 'student-hub',
    pincode: '110067',
  },
  'ber-sarai': {
    name: 'Ber Sarai',
    fullName: 'Ber Sarai, Near IIT Delhi',
    description: 'Student accommodation hub near IIT and JNU',
    heroDescription:
      'Ber Sarai is strategically located between IIT Delhi and JNU, housing thousands of students in PGs and hostels. Popular among serious NEET aspirants for focused preparation.',
    nearbyMetro: ['IIT Delhi Metro', 'Hauz Khas Metro'],
    landmarks: ['IIT Delhi Campus', 'JNU Campus', 'Ber Sarai Market'],
    schools: ['Kendriya Vidyalaya IIT', 'Campus School JNU'],
    highlights: ['Near IIT Delhi', 'Near JNU', 'Student PGs', 'Study Environment'],
    type: 'student-hub',
    pincode: '110016',
  },
  'katwaria-sarai': {
    name: 'Katwaria Sarai',
    fullName: 'Katwaria Sarai, Near IIT Delhi',
    description: 'Affordable student hub in IIT area',
    heroDescription:
      'Katwaria Sarai is an affordable residential area right next to IIT Delhi, popular among students for its budget PGs and proximity to coaching centers.',
    nearbyMetro: ['IIT Delhi Metro', 'Hauz Khas Metro'],
    landmarks: ['IIT Delhi Main Gate', 'SDA Market', 'Katwaria Sarai Village'],
    schools: ['Kendriya Vidyalaya IIT', 'Sarvodaya Vidyalaya'],
    highlights: ['Next to IIT', 'Budget Friendly', 'Student Area', 'Coaching Hub'],
    type: 'student-hub',
    pincode: '110016',
  },
  'lajpat-nagar': {
    name: 'Lajpat Nagar',
    fullName: 'Lajpat Nagar, South Delhi',
    description: 'Commercial and residential hub with metro access',
    heroDescription:
      'Lajpat Nagar is a bustling commercial and residential area with excellent metro connectivity. Students from Defence Colony, GK, and surrounding areas access NEET coaching here.',
    nearbyMetro: ['Lajpat Nagar Metro', 'Moolchand Metro'],
    landmarks: ['Central Market', 'Defence Colony Flyover', 'Amar Colony'],
    schools: ['Delhi Public School', 'Modern School', 'Bal Bharati Public School'],
    highlights: ['Metro Hub', 'Central Location', 'Famous Market', 'Easy Access'],
    type: 'residential',
    pincode: '110024',
  },
  kalkaji: {
    name: 'Kalkaji',
    fullName: 'Kalkaji, South Delhi',
    description: 'Residential area near Nehru Place IT hub',
    heroDescription:
      'Kalkaji is a well-established residential area near Nehru Place and Kalkaji Temple. Students from CR Park, GK, and Okhla access quality NEET coaching from here.',
    nearbyMetro: ['Kalkaji Mandir Metro', 'Nehru Place Metro'],
    landmarks: ['Kalkaji Temple', 'Nehru Place', 'Lotus Temple', 'CR Park'],
    schools: ['DAV Public School', 'Sarvodaya Vidyalaya', 'Ryan International'],
    highlights: ['Near Nehru Place', 'Temple Area', 'Established Locality', 'Good Schools'],
    type: 'residential',
    pincode: '110019',
  },
  // Additional Premium Residential
  'safdarjung-enclave': {
    name: 'Safdarjung Enclave',
    fullName: 'Safdarjung Enclave, South Delhi',
    description: 'Premium residential colony with educated families',
    heroDescription:
      'Safdarjung Enclave is a premium residential colony near Green Park, home to doctors, professionals, and business families seeking quality NEET coaching for their children.',
    nearbyMetro: ['Green Park Metro', 'AIIMS Metro'],
    landmarks: ['Safdarjung Hospital', 'Green Park Market', 'Humaun Pur Village'],
    schools: ['Holy Child School', 'Mount Carmel School', 'Springdales School'],
    highlights: ['Premium Colony', 'Doctor Families', 'Near AIIMS', 'Professional Area'],
    type: 'posh',
    pincode: '110029',
  },
  'gulmohar-park': {
    name: 'Gulmohar Park',
    fullName: 'Gulmohar Park, South Delhi',
    description: 'Elite residential enclave with celebrity residents',
    heroDescription:
      "Gulmohar Park is one of South Delhi's most elite residential areas, home to celebrities, industrialists, and top professionals. Families here demand exclusive, premium NEET coaching.",
    nearbyMetro: ['Hauz Khas Metro', 'Green Park Metro'],
    landmarks: ['Hauz Khas Village', 'Gulmohar Park Club', 'SDA Market'],
    schools: ['Sardar Patel Vidyalaya', 'Springdales School', 'The Shri Ram School'],
    highlights: ['Elite Enclave', 'Celebrity Residents', 'Premium Area', 'Exclusive Coaching'],
    type: 'ultra-premium',
    pincode: '110049',
  },
  'east-of-kailash': {
    name: 'East of Kailash',
    fullName: 'East of Kailash (EOK), South Delhi',
    description: 'Premium residential area with DPS EOK students',
    heroDescription:
      'East of Kailash is a premium residential area adjacent to Greater Kailash. Home to DPS EOK students and educated families seeking quality NEET coaching.',
    nearbyMetro: ['Kailash Colony Metro', 'Nehru Place Metro'],
    landmarks: ['DPS East of Kailash', 'EOK Market', 'GK-I M Block'],
    schools: ['DPS East of Kailash', 'Bal Bharati', 'Mount Carmel'],
    highlights: ['DPS EOK Students', 'Near GK', 'Premium Area', 'Good Schools'],
    type: 'posh',
    pincode: '110065',
  },
  alaknanda: {
    name: 'Alaknanda',
    fullName: 'Alaknanda, South Delhi',
    description: 'Well-planned DDA colony with good connectivity',
    heroDescription:
      'Alaknanda is a well-planned DDA residential colony in South Delhi with excellent metro connectivity. Popular among middle-class families seeking quality NEET coaching.',
    nearbyMetro: ['Nehru Place Metro', 'Kalkaji Mandir Metro'],
    landmarks: ['Alaknanda Market', 'Lotus Temple', 'Nehru Place'],
    schools: ['DAV Public School', 'Amity International', 'Ryan International'],
    highlights: ['DDA Colony', 'Good Planning', 'Metro Connected', 'Family Area'],
    type: 'residential',
    pincode: '110019',
  },
  'sukhdev-vihar': {
    name: 'Sukhdev Vihar',
    fullName: 'Sukhdev Vihar, South Delhi',
    description: 'Residential area near Okhla with growing demand',
    heroDescription:
      'Sukhdev Vihar is a residential area near Okhla Phase-I with growing demand for quality NEET coaching. Students from nearby colonies also access coaching centers here.',
    nearbyMetro: ['Sukhdev Vihar Metro', 'Okhla NSIC Metro'],
    landmarks: ['Okhla Industrial Area', 'Jamia Millia Islamia', 'Sukhdev Vihar Market'],
    schools: ['Jamia Schools', 'Amity International', 'Ryan International'],
    highlights: ['Near Okhla', 'Metro Access', 'Growing Area', 'Affordable'],
    type: 'residential',
    pincode: '110025',
  },
  okhla: {
    name: 'Okhla',
    fullName: 'Okhla, South Delhi',
    description: 'Industrial and residential hub in South Delhi',
    heroDescription:
      'Okhla encompasses a large industrial and residential area in South Delhi, including Okhla Vihar, Zakir Nagar, and Jamia area. Growing demand for NEET coaching from local students.',
    nearbyMetro: ['Okhla Metro', 'Jamia Millia Metro', 'Jasola Metro'],
    landmarks: ['Okhla Industrial Estate', 'Jamia Millia Islamia', 'Kalindi Kunj'],
    schools: ['Jamia Schools', 'DAV Public School', 'Sarvodaya Vidyalaya'],
    highlights: ['Industrial Hub', 'Jamia Area', 'Affordable', 'Metro Connected'],
    type: 'residential',
    pincode: '110025',
  },
  // Central Delhi Areas
  'rajendra-nagar': {
    name: 'Rajendra Nagar',
    fullName: 'Old Rajendra Nagar, Central Delhi',
    description: 'Famous coaching hub for competitive exams',
    heroDescription:
      "Old Rajendra Nagar is India's most famous coaching hub, primarily for UPSC but also popular for NEET preparation. Students from across India come here for serious competitive exam preparation.",
    nearbyMetro: ['Rajendra Place Metro', 'Patel Nagar Metro', 'Karol Bagh Metro'],
    landmarks: ['Rajendra Nagar Market', 'Shankar Road', 'Mukherjee Nagar'],
    schools: ['Modern School Barakhamba', 'Convent of Jesus & Mary', "St. Columba's"],
    highlights: ['Coaching Hub', 'UPSC Area', 'Serious Aspirants', 'Competitive Environment'],
    type: 'coaching-hub',
    pincode: '110060',
  },
  'karol-bagh': {
    name: 'Karol Bagh',
    fullName: 'Karol Bagh, Central Delhi',
    description: 'Commercial hub with coaching centers and metro access',
    heroDescription:
      'Karol Bagh is a major commercial and coaching hub in Central Delhi with excellent metro connectivity. Students from across Delhi access NEET coaching centers here.',
    nearbyMetro: ['Karol Bagh Metro', 'Rajendra Place Metro', 'Jhandewalan Metro'],
    landmarks: ['Karol Bagh Market', 'Gaffar Market', 'Ajmal Khan Road'],
    schools: ['Modern School', 'Convent Schools', 'DAV Public School'],
    highlights: ['Coaching Hub', 'Metro Connected', 'Commercial Area', 'Central Location'],
    type: 'coaching-hub',
    pincode: '110005',
  },
  'civil-lines': {
    name: 'Civil Lines',
    fullName: 'Civil Lines, North Delhi',
    description: 'Premium North Delhi area with elite families',
    heroDescription:
      "Civil Lines is one of North Delhi's most prestigious areas, home to elite families, business owners, and senior professionals. High demand for quality NEET coaching.",
    nearbyMetro: ['Civil Lines Metro', 'Vidhan Sabha Metro'],
    landmarks: ['Delhi University', 'Majnu Ka Tila', 'ISBT Kashmere Gate'],
    schools: ["St. Stephen's School", 'Cambridge School', 'The Mothers International'],
    highlights: ['Premium Area', 'North Delhi', 'Elite Families', 'Near DU'],
    type: 'posh',
    pincode: '110054',
  },
}

const courseOptions = [
  {
    name: 'Class 11+12 Comprehensive',
    duration: '2 Years',
    fee: '₹1,20,000',
    features: ['Complete NEET Biology', 'NCERT + Advanced', 'Mock Tests', 'Doubt Sessions'],
  },
  {
    name: 'Class 12 Intensive',
    duration: '1 Year',
    fee: '₹75,000',
    features: ['Class 12 Biology', 'Revision + Practice', 'Test Series', 'PYQ Analysis'],
  },
  {
    name: 'Dropper Batch',
    duration: '1 Year',
    fee: '₹85,000',
    features: ['Complete Revision', 'Daily Tests', 'Personal Mentor', 'Doubt Priority'],
  },
]

export default function SouthDelhiAreaPage() {
  const params = useParams()
  const areaSlug = params.area as string
  const area = areaDetails[areaSlug]

  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Area not found</h1>
          <Link href="/neet-coaching-south-delhi">
            <Button>Back to South Delhi</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', `demo_booking_${areaSlug}`, {
        event_category: 'conversion',
        event_label: `neet_coaching_${areaSlug}`,
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/neet-coaching-south-delhi"
              className="inline-flex items-center text-yellow-300 hover:text-yellow-200 mb-4"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to South Delhi
            </Link>

            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6 ml-4">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              {area.fullName}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">NEET Coaching in {area.name}</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-4">{area.description}</p>

            <p className="text-md opacity-80 mb-8 max-w-4xl mx-auto">{area.heroDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {area.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metro & Landmarks */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-purple-50 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <Train className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="font-bold text-gray-900">Nearby Metro Stations</h3>
              </div>
              <ul className="space-y-2">
                {area.nearbyMetro.map((metro) => (
                  <li key={metro} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {metro}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-blue-50 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="font-bold text-gray-900">Key Landmarks</h3>
              </div>
              <ul className="space-y-2">
                {area.landmarks.map((landmark) => (
                  <li key={landmark} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {landmark}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <GraduationCap className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="font-bold text-gray-900">Schools We Serve</h3>
              </div>
              <ul className="space-y-2">
                {area.schools.map((school) => (
                  <li key={school} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {school}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Options */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Courses for {area.name} Students
            </h2>
            <p className="text-lg text-gray-600">
              Choose the program that fits your preparation needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {courseOptions.map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
                  <h3 className="text-xl font-bold">{course.name}</h3>
                  <p className="text-sm opacity-90">{course.duration}</p>
                </div>
                <div className="p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-4">{course.fee}</div>
                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/demo-booking">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Enroll Now</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Area */}
      <section className="py-16 md:py-20 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Students from {area.name} Choose Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Expert AIIMS/JIPMER faculty',
              'Convenient location access',
              'Flexible batch timings',
              'Online + Offline modes',
              'Small batch of 15-20 students',
              'Personal mentorship',
              'Regular assessments',
              'Parent-teacher meetings',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <CheckCircle className="w-6 h-6 text-yellow-300 mr-3 flex-shrink-0" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your NEET Journey from {area.name}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of successful students from {area.name}. Book your free demo today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/neet-coaching-south-delhi">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Explore Other Areas
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: `Cerebrum Biology Academy - ${area.name}`,
            description: `Best NEET coaching in ${area.name}, South Delhi.`,
            url: `https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/${areaSlug}`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: area.name,
              addressRegion: 'South Delhi',
              postalCode: area.pincode,
              addressCountry: 'IN',
            },
          }),
        }}
      />
    </div>
  )
}
