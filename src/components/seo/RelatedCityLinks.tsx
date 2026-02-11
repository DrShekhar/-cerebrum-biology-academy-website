'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

// All city pages with their metadata
export const cityPages = {
  // Tier-1 Cities
  mumbai: {
    name: 'Mumbai',
    href: '/neet-coaching-mumbai',
    region: 'Maharashtra',
    students: '1,50,000+',
  },
  bangalore: {
    name: 'Bangalore',
    href: '/neet-coaching-bangalore',
    region: 'Karnataka',
    students: '3,000+',
  },
  hyderabad: {
    name: 'Hyderabad',
    href: '/neet-coaching-hyderabad',
    region: 'Telangana',
    students: '2,400+',
  },
  chennai: {
    name: 'Chennai',
    href: '/neet-coaching-chennai',
    region: 'Tamil Nadu',
    students: '2,300+',
  },
  pune: {
    name: 'Pune',
    href: '/neet-coaching-pune',
    region: 'Maharashtra',
    students: '2,800+',
  },
  // Delhi NCR
  delhiNCR: {
    name: 'Delhi NCR',
    href: '/best-neet-coaching-delhi-ncr',
    region: 'Delhi NCR',
    students: '5,000+',
  },
  southDelhi: {
    name: 'South Delhi',
    href: '/neet-coaching-south-delhi',
    region: 'Delhi',
    students: '1,200+',
  },
  eastDelhi: {
    name: 'East Delhi',
    href: '/neet-coaching-east-delhi',
    region: 'Delhi',
    students: '900+',
  },
  northDelhi: {
    name: 'North Delhi',
    href: '/neet-coaching-north-delhi',
    region: 'Delhi',
    students: '800+',
  },
  westDelhi: {
    name: 'West Delhi',
    href: '/neet-coaching-west-delhi',
    region: 'Delhi',
    students: '750+',
  },
  // NCR Cities
  noida: {
    name: 'Noida',
    href: '/neet-coaching-noida',
    region: 'Uttar Pradesh',
    students: '1,100+',
  },
  gurgaon: {
    name: 'Gurgaon',
    href: '/neet-coaching-gurgaon',
    region: 'Haryana',
    students: '1,000+',
  },
  faridabad: {
    name: 'Faridabad',
    href: '/neet-coaching-faridabad',
    region: 'Haryana',
    students: '600+',
  },
  ghaziabad: {
    name: 'Ghaziabad',
    href: '/neet-coaching-ghaziabad',
    region: 'Uttar Pradesh',
    students: '700+',
  },
  greaterNoida: {
    name: 'Greater Noida',
    href: '/neet-coaching-greater-noida-west',
    region: 'Uttar Pradesh',
    students: '450+',
  },
  // Coaching Hubs
  kaluSarai: {
    name: 'Kalu Sarai',
    href: '/neet-coaching-kalu-sarai',
    region: 'Delhi',
    students: '400+',
  },
  rajinderNagar: {
    name: 'Rajinder Nagar',
    href: '/neet-coaching-rajinder-nagar',
    region: 'Delhi',
    students: '500+',
  },
  mukherjeeNagar: {
    name: 'Mukherjee Nagar',
    href: '/neet-coaching-mukherjee-nagar',
    region: 'Delhi',
    students: '350+',
  },
  // Major Coaching Hub Cities
  kota: {
    name: 'Kota',
    href: '/neet-coaching-kota',
    region: 'Rajasthan',
    students: '2,500+',
  },
  jaipur: {
    name: 'Jaipur',
    href: '/neet-coaching-jaipur',
    region: 'Rajasthan',
    students: '3,500+',
  },
  // Eastern India
  kolkata: {
    name: 'Kolkata',
    href: '/neet-coaching-kolkata',
    region: 'West Bengal',
    students: '4,000+',
  },
  patna: {
    name: 'Patna',
    href: '/neet-coaching-patna',
    region: 'Bihar',
    students: '3,000+',
  },
  // Western India
  ahmedabad: {
    name: 'Ahmedabad',
    href: '/neet-coaching-ahmedabad',
    region: 'Gujarat',
    students: '3,500+',
  },
  // Northern India
  lucknow: {
    name: 'Lucknow',
    href: '/neet-coaching-lucknow',
    region: 'Uttar Pradesh',
    students: '4,500+',
  },
  kanpur: {
    name: 'Kanpur',
    href: '/neet-coaching-kanpur',
    region: 'Uttar Pradesh',
    students: '3,200+',
  },
  prayagraj: {
    name: 'Prayagraj',
    href: '/neet-coaching-prayagraj',
    region: 'Uttar Pradesh',
    students: '2,800+',
  },
  varanasi: {
    name: 'Varanasi',
    href: '/neet-coaching-varanasi',
    region: 'Uttar Pradesh',
    students: '3,500+',
  },
  agra: {
    name: 'Agra',
    href: '/neet-coaching-agra',
    region: 'Uttar Pradesh',
    students: '2,500+',
  },
  meerut: {
    name: 'Meerut',
    href: '/neet-coaching-meerut',
    region: 'Uttar Pradesh',
    students: '2,200+',
  },
  // Uttarakhand
  dehradun: {
    name: 'Dehradun',
    href: '/neet-coaching-dehradun',
    region: 'Uttarakhand',
    students: '1,800+',
  },
  mussoorie: {
    name: 'Mussoorie',
    href: '/neet-coaching-mussoorie',
    region: 'Uttarakhand',
    students: '500+',
  },
  // J&K
  jammu: {
    name: 'Jammu',
    href: '/neet-coaching-jammu',
    region: 'Jammu & Kashmir',
    students: '1,200+',
  },
  srinagar: {
    name: 'Srinagar',
    href: '/neet-coaching-srinagar',
    region: 'Jammu & Kashmir',
    students: '800+',
  },
  // Gujarat
  vadodara: {
    name: 'Vadodara',
    href: '/neet-coaching-vadodara',
    region: 'Gujarat',
    students: '2,200+',
  },
  // Rajasthan
  jodhpur: {
    name: 'Jodhpur',
    href: '/neet-coaching-jodhpur',
    region: 'Rajasthan',
    students: '1,800+',
  },
  udaipur: {
    name: 'Udaipur',
    href: '/neet-coaching-udaipur',
    region: 'Rajasthan',
    students: '1,600+',
  },
  // Madhya Pradesh
  gwalior: {
    name: 'Gwalior',
    href: '/neet-coaching-gwalior',
    region: 'Madhya Pradesh',
    students: '1,500+',
  },
  // Jharkhand
  ranchi: {
    name: 'Ranchi',
    href: '/neet-coaching-ranchi',
    region: 'Jharkhand',
    students: '2,000+',
  },
  // Punjab
  amritsar: {
    name: 'Amritsar',
    href: '/neet-coaching-amritsar',
    region: 'Punjab',
    students: '2,400+',
  },
  // Haryana
  mahendragarh: {
    name: 'Mahendragarh',
    href: '/neet-coaching-mahendragarh',
    region: 'Haryana',
    students: '800+',
  },
  // Himachal Pradesh
  manali: {
    name: 'Manali',
    href: '/neet-coaching-manali',
    region: 'Himachal Pradesh',
    students: '400+',
  },
  // ═══════════════════════════════════════
  // INTERNATIONAL — Country Hub Pages
  // ═══════════════════════════════════════
  nriSaudiArabia: {
    name: 'Saudi Arabia',
    href: '/neet-coaching-nri-saudi-arabia',
    region: 'Middle East (NRI)',
    students: '2,600+',
  },
  nriQatar: {
    name: 'Qatar',
    href: '/neet-coaching-nri-qatar',
    region: 'Middle East (NRI)',
    students: '700+',
  },
  nriOman: {
    name: 'Oman',
    href: '/neet-coaching-nri-oman',
    region: 'Middle East (NRI)',
    students: '900+',
  },
  nriSingapore: {
    name: 'Singapore',
    href: '/neet-coaching-nri-singapore',
    region: 'SE Asia (NRI)',
    students: '600+',
  },
  nriMalaysia: {
    name: 'Malaysia',
    href: '/neet-coaching-nri-malaysia',
    region: 'SE Asia (NRI)',
    students: '200+',
  },
  nriUK: {
    name: 'UK',
    href: '/neet-coaching-nri-uk',
    region: 'Europe (NRI)',
    students: '1,800+',
  },
  nriUSA: {
    name: 'USA',
    href: '/neet-coaching-nri-usa',
    region: 'Americas (NRI)',
    students: '5,160+',
  },
  nriNepal: {
    name: 'Nepal',
    href: '/neet-coaching-nri-nepal',
    region: 'South Asia',
    students: '1,500+',
  },
  nriCanada: {
    name: 'Canada',
    href: '/neet-coaching-nri-canada',
    region: 'Americas (NRI)',
    students: '1,200+',
  },
  nriAustralia: {
    name: 'Australia',
    href: '/neet-coaching-nri-australia',
    region: 'Oceania (NRI)',
    students: '700+',
  },
  // ═══════════════════════════════════════
  // INTERNATIONAL — City Pages
  // ═══════════════════════════════════════
  // Gulf
  dubai: {
    name: 'Dubai',
    href: '/neet-coaching-dubai-uae',
    region: 'UAE',
    students: '3,000+',
  },
  abuDhabi: {
    name: 'Abu Dhabi',
    href: '/neet-coaching-abu-dhabi-uae',
    region: 'UAE',
    students: '1,500+',
  },
  riyadh: {
    name: 'Riyadh',
    href: '/neet-coaching-riyadh-saudi-arabia',
    region: 'Saudi Arabia',
    students: '1,800+',
  },
  jeddah: {
    name: 'Jeddah',
    href: '/neet-coaching-jeddah-saudi-arabia',
    region: 'Saudi Arabia',
    students: '1,200+',
  },
  doha: {
    name: 'Doha',
    href: '/neet-coaching-doha-qatar',
    region: 'Qatar',
    students: '600+',
  },
  muscat: {
    name: 'Muscat',
    href: '/neet-coaching-muscat-oman',
    region: 'Oman',
    students: '700+',
  },
  kuwaitCity: {
    name: 'Kuwait City',
    href: '/neet-coaching-kuwait-city',
    region: 'Kuwait',
    students: '500+',
  },
  dammam: {
    name: 'Dammam',
    href: '/neet-coaching-dammam-saudi-arabia',
    region: 'Saudi Arabia',
    students: '400+',
  },
  alKhobar: {
    name: 'Al Khobar',
    href: '/neet-coaching-al-khobar-saudi-arabia',
    region: 'Saudi Arabia',
    students: '300+',
  },
  alAin: {
    name: 'Al Ain',
    href: '/neet-coaching-al-ain-uae',
    region: 'UAE',
    students: '250+',
  },
  salalah: {
    name: 'Salalah',
    href: '/neet-coaching-salalah-oman',
    region: 'Oman',
    students: '200+',
  },
  alWakrah: {
    name: 'Al Wakrah',
    href: '/neet-coaching-al-wakrah-qatar',
    region: 'Qatar',
    students: '150+',
  },
  // UK/Europe
  london: {
    name: 'London',
    href: '/neet-coaching-london-uk',
    region: 'UK',
    students: '1,200+',
  },
  // Americas
  newYork: {
    name: 'New York',
    href: '/neet-coaching-new-york-usa',
    region: 'USA',
    students: '800+',
  },
  houston: {
    name: 'Houston',
    href: '/neet-coaching-houston-usa',
    region: 'USA',
    students: '600+',
  },
  chicago: {
    name: 'Chicago',
    href: '/neet-coaching-chicago-usa',
    region: 'USA',
    students: '500+',
  },
  sanJose: {
    name: 'San Jose',
    href: '/neet-coaching-san-jose-usa',
    region: 'USA',
    students: '400+',
  },
  dallas: {
    name: 'Dallas',
    href: '/neet-coaching-dallas-usa',
    region: 'USA',
    students: '350+',
  },
  toronto: {
    name: 'Toronto',
    href: '/neet-coaching-toronto-canada',
    region: 'Canada',
    students: '500+',
  },
  vancouver: {
    name: 'Vancouver',
    href: '/neet-coaching-vancouver-canada',
    region: 'Canada',
    students: '300+',
  },
  brampton: {
    name: 'Brampton',
    href: '/neet-coaching-brampton-canada',
    region: 'Canada',
    students: '250+',
  },
  // Australia
  sydney: {
    name: 'Sydney',
    href: '/neet-coaching-sydney-australia',
    region: 'Australia',
    students: '400+',
  },
  melbourne: {
    name: 'Melbourne',
    href: '/neet-coaching-melbourne-australia',
    region: 'Australia',
    students: '350+',
  },
  // South Asia
  kathmandu: {
    name: 'Kathmandu',
    href: '/neet-coaching-kathmandu-nepal',
    region: 'Nepal',
    students: '1,000+',
  },
  colombo: {
    name: 'Colombo',
    href: '/neet-coaching-colombo-sri-lanka',
    region: 'Sri Lanka',
    students: '300+',
  },
  // SE Asia
  singaporeCity: {
    name: 'Singapore City',
    href: '/neet-coaching-singapore-city',
    region: 'Singapore',
    students: '500+',
  },
  kualaLumpur: {
    name: 'Kuala Lumpur',
    href: '/neet-coaching-kuala-lumpur-malaysia',
    region: 'Malaysia',
    students: '300+',
  },
  jakarta: {
    name: 'Jakarta',
    href: '/neet-coaching-jakarta-indonesia',
    region: 'Indonesia',
    students: '200+',
  },
  manila: {
    name: 'Manila',
    href: '/neet-coaching-manila-philippines',
    region: 'Philippines',
    students: '150+',
  },
  hoChiMinh: {
    name: 'Ho Chi Minh City',
    href: '/neet-coaching-ho-chi-minh-vietnam',
    region: 'Vietnam',
    students: '100+',
  },
  // Africa
  lagos: {
    name: 'Lagos',
    href: '/neet-coaching-lagos-nigeria',
    region: 'Nigeria',
    students: '300+',
  },
  nairobi: {
    name: 'Nairobi',
    href: '/neet-coaching-nairobi-kenya',
    region: 'Kenya',
    students: '250+',
  },
  darEsSalaam: {
    name: 'Dar es Salaam',
    href: '/neet-coaching-dar-es-salaam-tanzania',
    region: 'Tanzania',
    students: '150+',
  },
  accra: {
    name: 'Accra',
    href: '/neet-coaching-accra-ghana',
    region: 'Ghana',
    students: '100+',
  },
  kampala: {
    name: 'Kampala',
    href: '/neet-coaching-kampala-uganda',
    region: 'Uganda',
    students: '100+',
  },
}

type CityKey = keyof typeof cityPages

interface RelatedCityLinksProps {
  currentCity: CityKey
  variant?: 'default' | 'compact' | 'grid'
  title?: string
  showRegion?: boolean
}

// Define related cities for each city
const relatedCitiesMap: Record<CityKey, CityKey[]> = {
  mumbai: ['bangalore', 'pune', 'hyderabad', 'chennai', 'ahmedabad'],
  bangalore: ['chennai', 'hyderabad', 'mumbai', 'pune', 'kolkata'],
  hyderabad: ['bangalore', 'chennai', 'mumbai', 'pune', 'kolkata'],
  chennai: ['bangalore', 'hyderabad', 'mumbai', 'pune', 'kolkata'],
  pune: ['mumbai', 'bangalore', 'hyderabad', 'chennai', 'ahmedabad'],
  delhiNCR: ['southDelhi', 'noida', 'gurgaon', 'kota', 'lucknow'],
  southDelhi: ['eastDelhi', 'westDelhi', 'northDelhi', 'noida', 'kaluSarai'],
  eastDelhi: ['northDelhi', 'westDelhi', 'southDelhi', 'noida', 'ghaziabad'],
  northDelhi: ['westDelhi', 'eastDelhi', 'southDelhi', 'mukherjeeNagar', 'rajinderNagar'],
  westDelhi: ['northDelhi', 'southDelhi', 'eastDelhi', 'gurgaon', 'delhiNCR'],
  noida: ['greaterNoida', 'ghaziabad', 'eastDelhi', 'lucknow', 'delhiNCR'],
  gurgaon: ['faridabad', 'westDelhi', 'southDelhi', 'noida', 'jaipur'],
  faridabad: ['gurgaon', 'noida', 'southDelhi', 'greaterNoida', 'delhiNCR'],
  ghaziabad: ['noida', 'eastDelhi', 'greaterNoida', 'lucknow', 'delhiNCR'],
  greaterNoida: ['noida', 'ghaziabad', 'faridabad', 'lucknow', 'delhiNCR'],
  kaluSarai: ['rajinderNagar', 'southDelhi', 'delhiNCR', 'kota', 'jaipur'],
  rajinderNagar: ['kaluSarai', 'mukherjeeNagar', 'northDelhi', 'westDelhi', 'delhiNCR'],
  mukherjeeNagar: ['rajinderNagar', 'northDelhi', 'kaluSarai', 'delhiNCR', 'lucknow'],
  // Coaching Hub Cities
  kota: ['jaipur', 'delhiNCR', 'patna', 'lucknow', 'ahmedabad'],
  jaipur: ['kota', 'delhiNCR', 'ahmedabad', 'lucknow', 'mumbai'],
  // Eastern India
  kolkata: ['patna', 'bangalore', 'chennai', 'hyderabad', 'mumbai'],
  patna: ['kolkata', 'lucknow', 'kota', 'delhiNCR', 'bangalore'],
  // Western India
  ahmedabad: ['mumbai', 'pune', 'jaipur', 'kota', 'bangalore'],
  // Northern India
  lucknow: ['kanpur', 'varanasi', 'agra', 'prayagraj', 'meerut'],
  kanpur: ['lucknow', 'agra', 'prayagraj', 'varanasi', 'meerut'],
  prayagraj: ['varanasi', 'lucknow', 'kanpur', 'agra', 'patna'],
  varanasi: ['prayagraj', 'lucknow', 'patna', 'kanpur', 'kolkata'],
  agra: ['meerut', 'lucknow', 'kanpur', 'jaipur', 'delhiNCR'],
  meerut: ['agra', 'noida', 'ghaziabad', 'delhiNCR', 'lucknow'],
  // Uttarakhand
  dehradun: ['mussoorie', 'noida', 'delhiNCR', 'lucknow', 'meerut'],
  mussoorie: ['dehradun', 'noida', 'delhiNCR', 'meerut', 'lucknow'],
  // J&K
  jammu: ['srinagar', 'amritsar', 'delhiNCR', 'lucknow', 'dehradun'],
  srinagar: ['jammu', 'amritsar', 'delhiNCR', 'dehradun', 'lucknow'],
  // Gujarat
  vadodara: ['ahmedabad', 'mumbai', 'pune', 'jaipur', 'bangalore'],
  // Rajasthan
  jodhpur: ['jaipur', 'kota', 'udaipur', 'ahmedabad', 'delhiNCR'],
  udaipur: ['jaipur', 'kota', 'jodhpur', 'ahmedabad', 'mumbai'],
  // Madhya Pradesh
  gwalior: ['jaipur', 'agra', 'lucknow', 'delhiNCR', 'kanpur'],
  // Jharkhand
  ranchi: ['patna', 'kolkata', 'varanasi', 'lucknow', 'delhiNCR'],
  // Punjab
  amritsar: ['jammu', 'delhiNCR', 'lucknow', 'jaipur', 'dehradun'],
  // Haryana
  mahendragarh: ['gurgaon', 'faridabad', 'jaipur', 'delhiNCR', 'agra'],
  // Himachal Pradesh
  manali: ['dehradun', 'amritsar', 'delhiNCR', 'lucknow', 'jammu'],
  // ═══════════════════════════════════════
  // INTERNATIONAL — Related City Mappings
  // ═══════════════════════════════════════
  // Country Hubs → Related Cities
  nriSaudiArabia: ['riyadh', 'jeddah', 'dammam', 'alKhobar', 'nriQatar'],
  nriQatar: ['doha', 'alWakrah', 'nriSaudiArabia', 'nriOman', 'dubai'],
  nriOman: ['muscat', 'salalah', 'nriSaudiArabia', 'nriQatar', 'dubai'],
  nriSingapore: ['singaporeCity', 'nriMalaysia', 'kualaLumpur', 'jakarta', 'manila'],
  nriMalaysia: ['kualaLumpur', 'nriSingapore', 'singaporeCity', 'jakarta', 'hoChiMinh'],
  nriUK: ['london', 'nriUSA', 'nriCanada', 'nriAustralia', 'dubai'],
  nriUSA: ['newYork', 'houston', 'chicago', 'sanJose', 'dallas'],
  nriNepal: ['kathmandu', 'nriSingapore', 'nriMalaysia', 'colombo', 'delhiNCR'],
  nriCanada: ['toronto', 'vancouver', 'brampton', 'nriUSA', 'nriUK'],
  nriAustralia: ['sydney', 'melbourne', 'nriSingapore', 'nriUK', 'nriCanada'],
  // Gulf Cities
  dubai: ['abuDhabi', 'nriSaudiArabia', 'riyadh', 'doha', 'muscat'],
  abuDhabi: ['dubai', 'alAin', 'nriSaudiArabia', 'doha', 'muscat'],
  riyadh: ['jeddah', 'dammam', 'alKhobar', 'nriSaudiArabia', 'dubai'],
  jeddah: ['riyadh', 'dammam', 'nriSaudiArabia', 'dubai', 'doha'],
  doha: ['alWakrah', 'nriQatar', 'dubai', 'muscat', 'kuwaitCity'],
  muscat: ['salalah', 'nriOman', 'dubai', 'doha', 'kuwaitCity'],
  kuwaitCity: ['dubai', 'riyadh', 'doha', 'muscat', 'nriSaudiArabia'],
  dammam: ['alKhobar', 'riyadh', 'jeddah', 'nriSaudiArabia', 'dubai'],
  alKhobar: ['dammam', 'riyadh', 'dubai', 'doha', 'nriSaudiArabia'],
  alAin: ['abuDhabi', 'dubai', 'muscat', 'nriSaudiArabia', 'doha'],
  salalah: ['muscat', 'nriOman', 'dubai', 'doha', 'nriSaudiArabia'],
  alWakrah: ['doha', 'nriQatar', 'dubai', 'muscat', 'kuwaitCity'],
  // UK/Europe
  london: ['nriUK', 'toronto', 'newYork', 'sydney', 'dubai'],
  // Americas
  newYork: ['houston', 'chicago', 'nriUSA', 'toronto', 'london'],
  houston: ['dallas', 'newYork', 'sanJose', 'nriUSA', 'chicago'],
  chicago: ['newYork', 'houston', 'dallas', 'nriUSA', 'toronto'],
  sanJose: ['houston', 'newYork', 'dallas', 'nriUSA', 'vancouver'],
  dallas: ['houston', 'chicago', 'newYork', 'nriUSA', 'sanJose'],
  toronto: ['vancouver', 'brampton', 'nriCanada', 'newYork', 'london'],
  vancouver: ['toronto', 'brampton', 'nriCanada', 'sanJose', 'sydney'],
  brampton: ['toronto', 'vancouver', 'nriCanada', 'newYork', 'london'],
  // Australia
  sydney: ['melbourne', 'nriAustralia', 'singaporeCity', 'london', 'toronto'],
  melbourne: ['sydney', 'nriAustralia', 'singaporeCity', 'london', 'toronto'],
  // South Asia
  kathmandu: ['nriNepal', 'colombo', 'nriSingapore', 'delhiNCR', 'patna'],
  colombo: ['kathmandu', 'nriNepal', 'nriSingapore', 'kualaLumpur', 'chennai'],
  // SE Asia
  singaporeCity: ['nriSingapore', 'kualaLumpur', 'jakarta', 'manila', 'hoChiMinh'],
  kualaLumpur: ['nriMalaysia', 'singaporeCity', 'jakarta', 'manila', 'hoChiMinh'],
  jakarta: ['kualaLumpur', 'singaporeCity', 'manila', 'hoChiMinh', 'nriMalaysia'],
  manila: ['singaporeCity', 'kualaLumpur', 'jakarta', 'hoChiMinh', 'nriSingapore'],
  hoChiMinh: ['kualaLumpur', 'singaporeCity', 'jakarta', 'manila', 'nriMalaysia'],
  // Africa
  lagos: ['nairobi', 'accra', 'kampala', 'darEsSalaam', 'dubai'],
  nairobi: ['darEsSalaam', 'kampala', 'lagos', 'accra', 'dubai'],
  darEsSalaam: ['nairobi', 'kampala', 'lagos', 'accra', 'dubai'],
  accra: ['lagos', 'nairobi', 'kampala', 'darEsSalaam', 'london'],
  kampala: ['nairobi', 'darEsSalaam', 'lagos', 'accra', 'dubai'],
}

export function RelatedCityLinks({
  currentCity,
  variant = 'default',
  title = 'NEET Coaching in Other Cities',
  showRegion = true,
}: RelatedCityLinksProps) {
  const relatedCities = relatedCitiesMap[currentCity] || []

  if (relatedCities.length === 0) return null

  if (variant === 'compact') {
    return (
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Also Available In
        </h3>
        <div className="flex flex-wrap gap-2">
          {relatedCities.map((cityKey) => {
            const city = cityPages[cityKey]
            return (
              <Link
                key={cityKey}
                href={city.href}
                className="inline-flex items-center bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors shadow-sm"
              >
                {city.name}
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our NEET coaching programs in other major cities across India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedCities.map((cityKey, index) => {
              const city = cityPages[cityKey]
              return (
                <motion.div
                  key={cityKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={city.href}>
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                      <h3 className="font-bold text-gray-900 mb-1">{city.name}</h3>
                      {showRegion && <p className="text-sm text-gray-500 mb-2">{city.region}</p>}
                      <p className="text-blue-600 font-medium text-sm">{city.students} Students</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // Default variant
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Serving NEET aspirants across India with the same quality education
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCities.map((cityKey, index) => {
            const city = cityPages[cityKey]
            return (
              <motion.div
                key={cityKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={city.href}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-between group">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-full p-3 mr-4">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          NEET Coaching in {city.name}
                        </h3>
                        {showRegion && <p className="text-sm text-gray-500">{city.region}</p>}
                        <p className="text-blue-600 font-medium text-sm mt-1">
                          {city.students} Students
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Quick links component for footer or sidebar
export function CityQuickLinks() {
  const tier1Cities: CityKey[] = [
    'mumbai',
    'bangalore',
    'hyderabad',
    'chennai',
    'pune',
    'kolkata',
    'ahmedabad',
  ]
  const delhiNCRCities: CityKey[] = [
    'delhiNCR',
    'southDelhi',
    'noida',
    'gurgaon',
    'faridabad',
    'ghaziabad',
  ]
  const coachingHubCities: CityKey[] = ['kota', 'jaipur', 'patna', 'lucknow', 'kanpur', 'prayagraj', 'varanasi', 'agra', 'meerut', 'dehradun', 'jammu', 'srinagar', 'vadodara', 'jodhpur', 'gwalior', 'mussoorie', 'udaipur', 'ranchi', 'amritsar', 'mahendragarh', 'manali']
  const gulfCities: CityKey[] = ['dubai', 'abuDhabi', 'riyadh', 'jeddah', 'doha', 'muscat', 'kuwaitCity', 'dammam']
  const westernCities: CityKey[] = ['london', 'newYork', 'houston', 'chicago', 'toronto', 'vancouver', 'sydney', 'melbourne']
  const asiaAfricaCities: CityKey[] = ['singaporeCity', 'kualaLumpur', 'kathmandu', 'jakarta', 'manila', 'lagos', 'nairobi']

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Major Cities</h4>
        <ul className="space-y-2">
          {tier1Cities.map((cityKey) => {
            const city = cityPages[cityKey]
            return (
              <li key={cityKey}>
                <Link
                  href={city.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  NEET Coaching in {city.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Delhi NCR</h4>
        <ul className="space-y-2">
          {delhiNCRCities.map((cityKey) => {
            const city = cityPages[cityKey]
            return (
              <li key={cityKey}>
                <Link
                  href={city.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  NEET Coaching in {city.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Coaching Hubs</h4>
        <ul className="space-y-2">
          {coachingHubCities.map((cityKey) => {
            const city = cityPages[cityKey]
            return (
              <li key={cityKey}>
                <Link
                  href={city.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  NEET Coaching in {city.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-green-400 mb-3">Gulf & Middle East</h4>
        <ul className="space-y-2">
          {gulfCities.map((cityKey) => {
            const city = cityPages[cityKey]
            return (
              <li key={cityKey}>
                <Link
                  href={city.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  NEET Coaching in {city.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-green-400 mb-3">USA, UK, Canada & Australia</h4>
        <ul className="space-y-2">
          {westernCities.map((cityKey) => {
            const city = cityPages[cityKey]
            return (
              <li key={cityKey}>
                <Link
                  href={city.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  NEET Coaching in {city.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-green-400 mb-3">Asia & Africa</h4>
        <ul className="space-y-2">
          {asiaAfricaCities.map((cityKey) => {
            const city = cityPages[cityKey]
            return (
              <li key={cityKey}>
                <Link
                  href={city.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  NEET Coaching in {city.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
