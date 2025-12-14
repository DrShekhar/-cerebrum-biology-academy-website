'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Building2,
  MapPin,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Info,
  BookOpen,
  GraduationCap,
  Filter,
  Search,
  TrendingUp,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  Star,
} from 'lucide-react'

interface College {
  name: string
  state: string
  type: 'Government' | 'Private/Deemed'
  tier: 1 | 2 | 3
  seats: number
  nirfRank?: number
  cutoffs: {
    general: number
    ews: number
    obc: number
    sc: number
    st: number
  }
  fees: number
  feeDisplay: string
}

// Comprehensive database with NEET 2024 MCC counselling closing ranks
const collegesData: College[] = [
  // ============ TIER 1 GOVERNMENT COLLEGES (AIIMS + Top Govt) ============
  // All AIIMS Colleges
  {
    name: 'AIIMS New Delhi',
    state: 'Delhi',
    type: 'Government',
    tier: 1,
    seats: 107,
    nirfRank: 1,
    cutoffs: { general: 47, ews: 83, obc: 186, sc: 647, st: 1847 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Jodhpur',
    state: 'Rajasthan',
    type: 'Government',
    tier: 1,
    seats: 150,
    nirfRank: 8,
    cutoffs: { general: 374, ews: 658, obc: 1200, sc: 2800, st: 6500 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Bhopal',
    state: 'Madhya Pradesh',
    type: 'Government',
    tier: 1,
    seats: 150,
    nirfRank: 12,
    cutoffs: { general: 520, ews: 890, obc: 1650, sc: 3800, st: 8200 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Bhubaneswar',
    state: 'Odisha',
    type: 'Government',
    tier: 1,
    seats: 100,
    nirfRank: 15,
    cutoffs: { general: 610, ews: 1050, obc: 1950, sc: 4500, st: 9800 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Rishikesh',
    state: 'Uttarakhand',
    type: 'Government',
    tier: 1,
    seats: 125,
    nirfRank: 18,
    cutoffs: { general: 780, ews: 1350, obc: 2500, sc: 6520, st: 11941 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Patna',
    state: 'Bihar',
    type: 'Government',
    tier: 1,
    seats: 100,
    nirfRank: 20,
    cutoffs: { general: 950, ews: 1680, obc: 3100, sc: 7500, st: 14500 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Raipur',
    state: 'Chhattisgarh',
    type: 'Government',
    tier: 1,
    seats: 100,
    nirfRank: 22,
    cutoffs: { general: 1150, ews: 2000, obc: 3600, sc: 8800, st: 16500 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Nagpur',
    state: 'Maharashtra',
    type: 'Government',
    tier: 1,
    seats: 100,
    cutoffs: { general: 1400, ews: 2450, obc: 4400, sc: 10500, st: 19000 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Mangalagiri',
    state: 'Andhra Pradesh',
    type: 'Government',
    tier: 1,
    seats: 100,
    cutoffs: { general: 1650, ews: 2900, obc: 5200, sc: 12500, st: 22000 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Gorakhpur',
    state: 'Uttar Pradesh',
    type: 'Government',
    tier: 2,
    seats: 100,
    cutoffs: { general: 2100, ews: 3600, obc: 6500, sc: 15500, st: 27000 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Bathinda',
    state: 'Punjab',
    type: 'Government',
    tier: 2,
    seats: 100,
    cutoffs: { general: 2400, ews: 4100, obc: 7400, sc: 17500, st: 30000 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Kalyani',
    state: 'West Bengal',
    type: 'Government',
    tier: 2,
    seats: 100,
    cutoffs: { general: 2750, ews: 4700, obc: 8500, sc: 20000, st: 34000 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Deoghar',
    state: 'Jharkhand',
    type: 'Government',
    tier: 2,
    seats: 100,
    cutoffs: { general: 3200, ews: 5400, obc: 9800, sc: 23000, st: 38000 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Rae Bareli',
    state: 'Uttar Pradesh',
    type: 'Government',
    tier: 2,
    seats: 100,
    cutoffs: { general: 3650, ews: 6200, obc: 11200, sc: 26000, st: 42000 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Bilaspur',
    state: 'Himachal Pradesh',
    type: 'Government',
    tier: 2,
    seats: 100,
    cutoffs: { general: 4100, ews: 7000, obc: 12600, sc: 29500, st: 47000 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Bibinagar',
    state: 'Telangana',
    type: 'Government',
    tier: 2,
    seats: 100,
    cutoffs: { general: 4600, ews: 7800, obc: 14000, sc: 32500, st: 52000 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Guwahati',
    state: 'Assam',
    type: 'Government',
    tier: 2,
    seats: 50,
    cutoffs: { general: 5200, ews: 8800, obc: 15800, sc: 36500, st: 58000 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Vijaypur (Jammu)',
    state: 'Jammu & Kashmir',
    type: 'Government',
    tier: 2,
    seats: 100,
    cutoffs: { general: 5800, ews: 9800, obc: 17600, sc: 40500, st: 64000 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Rajkot',
    state: 'Gujarat',
    type: 'Government',
    tier: 2,
    seats: 100,
    cutoffs: { general: 6500, ews: 11000, obc: 19800, sc: 45000, st: 71000 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  {
    name: 'AIIMS Madurai',
    state: 'Tamil Nadu',
    type: 'Government',
    tier: 2,
    seats: 100,
    cutoffs: { general: 7200, ews: 12200, obc: 22000, sc: 50000, st: 78000 },
    fees: 1628,
    feeDisplay: '₹1,628/year',
  },
  // JIPMER
  {
    name: 'JIPMER Puducherry',
    state: 'Puducherry',
    type: 'Government',
    tier: 1,
    seats: 200,
    nirfRank: 5,
    cutoffs: { general: 180, ews: 320, obc: 580, sc: 1400, st: 3200 },
    fees: 1490,
    feeDisplay: '₹1,490/year',
  },
  {
    name: 'JIPMER Karaikal',
    state: 'Puducherry',
    type: 'Government',
    tier: 2,
    seats: 50,
    cutoffs: { general: 8500, ews: 14500, obc: 26000, sc: 60000, st: 95000 },
    fees: 1490,
    feeDisplay: '₹1,490/year',
  },
  // Top Delhi Govt Colleges
  {
    name: 'Maulana Azad Medical College (MAMC)',
    state: 'Delhi',
    type: 'Government',
    tier: 1,
    seats: 250,
    nirfRank: 4,
    cutoffs: { general: 85, ews: 150, obc: 280, sc: 750, st: 1800 },
    fees: 2445,
    feeDisplay: '₹2,445/year',
  },
  {
    name: 'VMMC & Safdarjung Hospital',
    state: 'Delhi',
    type: 'Government',
    tier: 1,
    seats: 170,
    nirfRank: 7,
    cutoffs: { general: 130, ews: 230, obc: 420, sc: 1100, st: 2600 },
    fees: 25000,
    feeDisplay: '₹25,000/year',
  },
  {
    name: 'UCMS & GTB Hospital Delhi',
    state: 'Delhi',
    type: 'Government',
    tier: 1,
    seats: 150,
    nirfRank: 10,
    cutoffs: { general: 390, ews: 680, obc: 1250, sc: 3000, st: 7000 },
    fees: 15000,
    feeDisplay: '₹15,000/year',
  },
  {
    name: 'Lady Hardinge Medical College Delhi',
    state: 'Delhi',
    type: 'Government',
    tier: 1,
    seats: 200,
    nirfRank: 14,
    cutoffs: { general: 480, ews: 840, obc: 1550, sc: 3700, st: 8500 },
    fees: 10000,
    feeDisplay: '₹10,000/year',
  },
  // Other Top Govt Colleges
  {
    name: 'PGIMER Chandigarh',
    state: 'Chandigarh',
    type: 'Government',
    tier: 1,
    seats: 75,
    nirfRank: 2,
    cutoffs: { general: 65, ews: 115, obc: 210, sc: 550, st: 1350 },
    fees: 5000,
    feeDisplay: '₹5,000/year',
  },
  {
    name: 'King George Medical University (KGMU)',
    state: 'Uttar Pradesh',
    type: 'Government',
    tier: 1,
    seats: 250,
    nirfRank: 11,
    cutoffs: { general: 2500, ews: 4300, obc: 7800, sc: 18000, st: 32000 },
    fees: 54600,
    feeDisplay: '₹54,600/year',
  },
  {
    name: 'BHU Institute of Medical Sciences',
    state: 'Uttar Pradesh',
    type: 'Government',
    tier: 1,
    seats: 120,
    nirfRank: 9,
    cutoffs: { general: 850, ews: 1480, obc: 2700, sc: 6400, st: 12500 },
    fees: 10000,
    feeDisplay: '₹10,000/year',
  },
  {
    name: 'Seth GS Medical College Mumbai',
    state: 'Maharashtra',
    type: 'Government',
    tier: 1,
    seats: 200,
    nirfRank: 13,
    cutoffs: { general: 1100, ews: 1900, obc: 3500, sc: 8200, st: 15500 },
    fees: 134600,
    feeDisplay: '₹1,34,600/year',
  },
  {
    name: 'Grant Medical College Mumbai',
    state: 'Maharashtra',
    type: 'Government',
    tier: 1,
    seats: 200,
    nirfRank: 16,
    cutoffs: { general: 1600, ews: 2750, obc: 5000, sc: 11800, st: 21500 },
    fees: 139700,
    feeDisplay: '₹1,39,700/year',
  },
  {
    name: 'Bangalore Medical College',
    state: 'Karnataka',
    type: 'Government',
    tier: 1,
    seats: 250,
    nirfRank: 17,
    cutoffs: { general: 2200, ews: 3800, obc: 6900, sc: 16000, st: 29000 },
    fees: 70200,
    feeDisplay: '₹70,200/year',
  },
  {
    name: 'Madras Medical College',
    state: 'Tamil Nadu',
    type: 'Government',
    tier: 1,
    seats: 250,
    nirfRank: 6,
    cutoffs: { general: 1800, ews: 3100, obc: 5600, sc: 13200, st: 24000 },
    fees: 19215,
    feeDisplay: '₹19,215/year',
  },
  {
    name: 'Stanley Medical College Chennai',
    state: 'Tamil Nadu',
    type: 'Government',
    tier: 1,
    seats: 250,
    cutoffs: { general: 2121, ews: 3650, obc: 6600, sc: 15500, st: 28000 },
    fees: 18050,
    feeDisplay: '₹18,050/year',
  },
  // ============ TIER 2 GOVERNMENT COLLEGES ============
  {
    name: 'Osmania Medical College',
    state: 'Telangana',
    type: 'Government',
    tier: 2,
    seats: 250,
    cutoffs: { general: 3500, ews: 6000, obc: 10800, sc: 25000, st: 45000 },
    fees: 35000,
    feeDisplay: '₹35,000/year',
  },
  {
    name: 'SMS Medical College Jaipur',
    state: 'Rajasthan',
    type: 'Government',
    tier: 2,
    seats: 250,
    cutoffs: { general: 4200, ews: 7200, obc: 13000, sc: 30000, st: 52000 },
    fees: 30000,
    feeDisplay: '₹30,000/year',
  },
  {
    name: 'Medical College Kolkata',
    state: 'West Bengal',
    type: 'Government',
    tier: 2,
    seats: 250,
    cutoffs: { general: 5500, ews: 9400, obc: 17000, sc: 39000, st: 68000 },
    fees: 15000,
    feeDisplay: '₹15,000/year',
  },
  {
    name: 'B.J. Medical College Ahmedabad',
    state: 'Gujarat',
    type: 'Government',
    tier: 2,
    seats: 250,
    cutoffs: { general: 4800, ews: 8200, obc: 14800, sc: 34000, st: 59000 },
    fees: 23500,
    feeDisplay: '₹23,500/year',
  },
  {
    name: 'GMC Thiruvananthapuram',
    state: 'Kerala',
    type: 'Government',
    tier: 2,
    seats: 250,
    cutoffs: { general: 6200, ews: 10600, obc: 19000, sc: 44000, st: 76000 },
    fees: 42400,
    feeDisplay: '₹42,400/year',
  },
  {
    name: 'GSVM Medical College Kanpur',
    state: 'Uttar Pradesh',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 7500, ews: 12800, obc: 23000, sc: 53000, st: 92000 },
    fees: 25000,
    feeDisplay: '₹25,000/year',
  },
  {
    name: 'Patna Medical College',
    state: 'Bihar',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 8200, ews: 14000, obc: 25200, sc: 58000, st: 100000 },
    fees: 18700,
    feeDisplay: '₹18,700/year',
  },
  {
    name: 'Indira Gandhi Medical College Shimla',
    state: 'Himachal Pradesh',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 9500, ews: 16200, obc: 29000, sc: 67000, st: 115000 },
    fees: 45000,
    feeDisplay: '₹45,000/year',
  },
  {
    name: 'Andhra Medical College Visakhapatnam',
    state: 'Andhra Pradesh',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 10500, ews: 18000, obc: 32000, sc: 74000, st: 128000 },
    fees: 40250,
    feeDisplay: '₹40,250/year',
  },
  {
    name: 'GMC Bhopal',
    state: 'Madhya Pradesh',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 8800, ews: 15000, obc: 27000, sc: 62000, st: 107000 },
    fees: 55000,
    feeDisplay: '₹55,000/year',
  },
  {
    name: 'Mysore Medical College',
    state: 'Karnataka',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 11500, ews: 19600, obc: 35000, sc: 81000, st: 140000 },
    fees: 67050,
    feeDisplay: '₹67,050/year',
  },
  {
    name: 'Coimbatore Medical College',
    state: 'Tamil Nadu',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 12500, ews: 21300, obc: 38000, sc: 88000, st: 152000 },
    fees: 18073,
    feeDisplay: '₹18,073/year',
  },
  // ============ TIER 3 GOVERNMENT COLLEGES ============
  {
    name: 'Gauhati Medical College',
    state: 'Assam',
    type: 'Government',
    tier: 3,
    seats: 180,
    cutoffs: { general: 14000, ews: 24000, obc: 43000, sc: 99000, st: 170000 },
    fees: 20000,
    feeDisplay: '₹20,000/year',
  },
  {
    name: 'GMC Amritsar',
    state: 'Punjab',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 15500, ews: 26500, obc: 47500, sc: 110000, st: 190000 },
    fees: 78500,
    feeDisplay: '₹78,500/year',
  },
  {
    name: 'Ranchi Institute of Medical Sciences',
    state: 'Jharkhand',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 17000, ews: 29000, obc: 52000, sc: 120000, st: 207000 },
    fees: 22000,
    feeDisplay: '₹22,000/year',
  },
  {
    name: 'GMC Nagpur',
    state: 'Maharashtra',
    type: 'Government',
    tier: 3,
    seats: 200,
    cutoffs: { general: 18500, ews: 31600, obc: 56500, sc: 131000, st: 226000 },
    fees: 98500,
    feeDisplay: '₹98,500/year',
  },
  {
    name: 'SCB Medical College Cuttack',
    state: 'Odisha',
    type: 'Government',
    tier: 3,
    seats: 250,
    cutoffs: { general: 20000, ews: 34200, obc: 61000, sc: 141000, st: 244000 },
    fees: 45000,
    feeDisplay: '₹45,000/year',
  },
  {
    name: 'GMC Jammu',
    state: 'Jammu & Kashmir',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 22000, ews: 37600, obc: 67000, sc: 155000, st: 268000 },
    fees: 48000,
    feeDisplay: '₹48,000/year',
  },
  {
    name: 'GMC Srinagar',
    state: 'Jammu & Kashmir',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 24000, ews: 41000, obc: 73000, sc: 169000, st: 292000 },
    fees: 48000,
    feeDisplay: '₹48,000/year',
  },
  {
    name: 'Rajendra Institute of Medical Sciences Ranchi',
    state: 'Jharkhand',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 26000, ews: 44400, obc: 79000, sc: 183000, st: 316000 },
    fees: 35000,
    feeDisplay: '₹35,000/year',
  },
  {
    name: 'GMC Aurangabad',
    state: 'Maharashtra',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 28000, ews: 47800, obc: 85500, sc: 198000, st: 342000 },
    fees: 85000,
    feeDisplay: '₹85,000/year',
  },
  {
    name: 'Regional Institute of Medical Sciences Imphal',
    state: 'Manipur',
    type: 'Government',
    tier: 3,
    seats: 120,
    cutoffs: { general: 30000, ews: 51200, obc: 91500, sc: 212000, st: 366000 },
    fees: 25000,
    feeDisplay: '₹25,000/year',
  },
  // ============ PRIVATE/DEEMED UNIVERSITIES ============
  // Tier 1 Private/Deemed
  {
    name: 'Christian Medical College (CMC) Vellore',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 1,
    seats: 100,
    nirfRank: 3,
    cutoffs: { general: 84, ews: 150, obc: 280, sc: 4404, st: 8500 },
    fees: 75000,
    feeDisplay: '₹75,000/year',
  },
  {
    name: 'Kasturba Medical College (KMC) Manipal',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 1,
    seats: 250,
    nirfRank: 19,
    cutoffs: { general: 40258, ews: 68800, obc: 123000, sc: 285000, st: 492000 },
    fees: 1780000,
    feeDisplay: '₹17.8 Lakhs/year',
  },
  {
    name: 'Kasturba Medical College (KMC) Mangalore',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 1,
    seats: 250,
    cutoffs: { general: 45000, ews: 76900, obc: 137500, sc: 318000, st: 550000 },
    fees: 1780000,
    feeDisplay: '₹17.8 Lakhs/year',
  },
  {
    name: "St. John's Medical College Bangalore",
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 1,
    seats: 150,
    cutoffs: { general: 35000, ews: 59800, obc: 107000, sc: 247000, st: 427000 },
    fees: 1500000,
    feeDisplay: '₹15 Lakhs/year',
  },
  {
    name: 'JSS Medical College Mysuru',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 2,
    seats: 200,
    cutoffs: { general: 122228, ews: 208800, obc: 373000, sc: 863000, st: 1200000 },
    fees: 1986000,
    feeDisplay: '₹19.86 Lakhs/year',
  },
  {
    name: 'Amrita Institute of Medical Sciences Kochi',
    state: 'Kerala',
    type: 'Private/Deemed',
    tier: 2,
    seats: 150,
    cutoffs: { general: 329153, ews: 562200, obc: 1005000, sc: 2000000, st: 2400000 },
    fees: 2500000,
    feeDisplay: '₹25 Lakhs/year',
  },
  {
    name: 'Sri Ramachandra Medical College Chennai',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 2,
    seats: 250,
    cutoffs: { general: 323997, ews: 553500, obc: 989000, sc: 1900000, st: 2350000 },
    fees: 3000000,
    feeDisplay: '₹30 Lakhs/year',
  },
  {
    name: 'SRM Medical College Chennai',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 2,
    seats: 250,
    cutoffs: { general: 637582, ews: 1089200, obc: 1900000, sc: 2400000, st: 2400000 },
    fees: 2500000,
    feeDisplay: '₹25 Lakhs/year',
  },
  {
    name: 'Manipal TATA Medical College Jamshedpur',
    state: 'Jharkhand',
    type: 'Private/Deemed',
    tier: 2,
    seats: 100,
    cutoffs: { general: 82158, ews: 140400, obc: 251000, sc: 580000, st: 1003000 },
    fees: 1609000,
    feeDisplay: '₹16.09 Lakhs/year',
  },
  {
    name: 'Hamdard Institute of Medical Sciences Delhi',
    state: 'Delhi',
    type: 'Private/Deemed',
    tier: 2,
    seats: 150,
    cutoffs: { general: 54747, ews: 93500, obc: 167000, sc: 386000, st: 668000 },
    fees: 1600000,
    feeDisplay: '₹16 Lakhs/year',
  },
  {
    name: 'Symbiosis Medical College for Women Pune',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 2,
    seats: 150,
    cutoffs: { general: 53248, ews: 91000, obc: 162500, sc: 376000, st: 650000 },
    fees: 1000000,
    feeDisplay: '₹10 Lakhs/year',
  },
  {
    name: 'DY Patil Medical College Pune',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 2,
    seats: 250,
    cutoffs: { general: 89000, ews: 152000, obc: 272000, sc: 629000, st: 1087000 },
    fees: 2000000,
    feeDisplay: '₹20 Lakhs/year',
  },
  {
    name: 'DY Patil Medical College Navi Mumbai',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 2,
    seats: 250,
    cutoffs: { general: 95000, ews: 162300, obc: 290000, sc: 671000, st: 1160000 },
    fees: 2200000,
    feeDisplay: '₹22 Lakhs/year',
  },
  {
    name: 'MGM Medical College Navi Mumbai',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 110000, ews: 187900, obc: 336000, sc: 777000, st: 1343000 },
    fees: 1800000,
    feeDisplay: '₹18 Lakhs/year',
  },
  {
    name: 'MGIMS Wardha',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 2,
    seats: 100,
    cutoffs: { general: 78000, ews: 133300, obc: 238000, sc: 550000, st: 951000 },
    fees: 800000,
    feeDisplay: '₹8 Lakhs/year',
  },
  {
    name: 'Saveetha Medical College Chennai',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 3,
    seats: 250,
    cutoffs: { general: 145000, ews: 247800, obc: 443000, sc: 1025000, st: 1400000 },
    fees: 2300000,
    feeDisplay: '₹23 Lakhs/year',
  },
  {
    name: 'Bharati Vidyapeeth Medical College Pune',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 3,
    seats: 200,
    cutoffs: { general: 125000, ews: 213600, obc: 382000, sc: 883000, st: 1230000 },
    fees: 1850000,
    feeDisplay: '₹18.5 Lakhs/year',
  },
  {
    name: 'SDU Medical College Kolar',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 175000, ews: 299000, obc: 534500, sc: 1200000, st: 1500000 },
    fees: 1500000,
    feeDisplay: '₹15 Lakhs/year',
  },
  {
    name: 'MS Ramaiah Medical College Bangalore',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 2,
    seats: 150,
    cutoffs: { general: 65000, ews: 111100, obc: 198500, sc: 459000, st: 794000 },
    fees: 1850000,
    feeDisplay: '₹18.5 Lakhs/year',
  },
  {
    name: 'Yenepoya Medical College Mangalore',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 3,
    seats: 200,
    cutoffs: { general: 200000, ews: 341800, obc: 611000, sc: 1300000, st: 1600000 },
    fees: 2100000,
    feeDisplay: '₹21 Lakhs/year',
  },
  {
    name: 'KIMS Karad',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 3,
    seats: 200,
    cutoffs: { general: 165000, ews: 281900, obc: 504000, sc: 1166000, st: 1450000 },
    fees: 1400000,
    feeDisplay: '₹14 Lakhs/year',
  },
  {
    name: 'Datta Meghe Institute of Medical Sciences Wardha',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 3,
    seats: 200,
    cutoffs: { general: 185000, ews: 316100, obc: 565000, sc: 1250000, st: 1550000 },
    fees: 1650000,
    feeDisplay: '₹16.5 Lakhs/year',
  },
  {
    name: 'Aarupadai Veedu Medical College Puducherry',
    state: 'Puducherry',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 220000, ews: 375900, obc: 672000, sc: 1350000, st: 1650000 },
    fees: 1900000,
    feeDisplay: '₹19 Lakhs/year',
  },
  {
    name: 'Meenakshi Medical College Chennai',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 3,
    seats: 200,
    cutoffs: { general: 250000, ews: 427200, obc: 764000, sc: 1450000, st: 1750000 },
    fees: 2000000,
    feeDisplay: '₹20 Lakhs/year',
  },
  {
    name: 'Sree Balaji Medical College Chennai',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 280000, ews: 478500, obc: 855500, sc: 1550000, st: 1850000 },
    fees: 2200000,
    feeDisplay: '₹22 Lakhs/year',
  },
  {
    name: 'Chettinad Hospital & Research Institute',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 3,
    seats: 200,
    cutoffs: { general: 310000, ews: 529700, obc: 947000, sc: 1650000, st: 1950000 },
    fees: 2400000,
    feeDisplay: '₹24 Lakhs/year',
  },
  {
    name: 'MOSC Medical College Kolenchery',
    state: 'Kerala',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 350000, ews: 598100, obc: 1069000, sc: 1800000, st: 2100000 },
    fees: 1200000,
    feeDisplay: '₹12 Lakhs/year',
  },
  {
    name: 'Jubilee Mission Medical College Thrissur',
    state: 'Kerala',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 380000, ews: 649400, obc: 1161000, sc: 1900000, st: 2200000 },
    fees: 1400000,
    feeDisplay: '₹14 Lakhs/year',
  },
  {
    name: 'Vinayaka Mission Medical College Salem',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 420000, ews: 717700, obc: 1283000, sc: 2050000, st: 2350000 },
    fees: 1950000,
    feeDisplay: '₹19.5 Lakhs/year',
  },
  {
    name: 'Kalinga Institute of Medical Sciences Bhubaneswar',
    state: 'Odisha',
    type: 'Private/Deemed',
    tier: 2,
    seats: 200,
    cutoffs: { general: 72000, ews: 123000, obc: 220000, sc: 509000, st: 880000 },
    fees: 1600000,
    feeDisplay: '₹16 Lakhs/year',
  },
  {
    name: 'Sharda University Medical College',
    state: 'Uttar Pradesh',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 155000, ews: 264900, obc: 473500, sc: 1095000, st: 1380000 },
    fees: 1500000,
    feeDisplay: '₹15 Lakhs/year',
  },
  {
    name: 'Santosh Medical College Ghaziabad',
    state: 'Uttar Pradesh',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 195000, ews: 333200, obc: 595500, sc: 1280000, st: 1580000 },
    fees: 1700000,
    feeDisplay: '₹17 Lakhs/year',
  },
  {
    name: 'Era Lucknow Medical College',
    state: 'Uttar Pradesh',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 230000, ews: 393000, obc: 702500, sc: 1380000, st: 1680000 },
    fees: 1400000,
    feeDisplay: '₹14 Lakhs/year',
  },
  // ============ ADDITIONAL GOVERNMENT COLLEGES (50+) ============
  {
    name: 'Atal Bihari Vajpayee Institute of Medical Sciences (ABVIMS)',
    state: 'Delhi',
    type: 'Government',
    tier: 1,
    seats: 100,
    cutoffs: { general: 203, ews: 360, obc: 650, sc: 1600, st: 3800 },
    fees: 15000,
    feeDisplay: '₹15,000/year',
  },
  {
    name: 'Dr. Baba Saheb Ambedkar Medical College Delhi',
    state: 'Delhi',
    type: 'Government',
    tier: 2,
    seats: 100,
    cutoffs: { general: 1192, ews: 2050, obc: 3700, sc: 8800, st: 16500 },
    fees: 15000,
    feeDisplay: '₹15,000/year',
  },
  {
    name: 'NDMC Medical College Delhi',
    state: 'Delhi',
    type: 'Government',
    tier: 2,
    seats: 100,
    cutoffs: { general: 1419, ews: 2450, obc: 4400, sc: 10500, st: 19500 },
    fees: 15000,
    feeDisplay: '₹15,000/year',
  },
  {
    name: 'Medical College Baroda',
    state: 'Gujarat',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 2251, ews: 3850, obc: 6950, sc: 16500, st: 29500 },
    fees: 23500,
    feeDisplay: '₹23,500/year',
  },
  {
    name: 'GMC Kozhikode',
    state: 'Kerala',
    type: 'Government',
    tier: 2,
    seats: 250,
    cutoffs: { general: 1149, ews: 1980, obc: 3550, sc: 8500, st: 15800 },
    fees: 42400,
    feeDisplay: '₹42,400/year',
  },
  {
    name: 'GMC Kottayam',
    state: 'Kerala',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 2258, ews: 3870, obc: 6980, sc: 16600, st: 29700 },
    fees: 42400,
    feeDisplay: '₹42,400/year',
  },
  {
    name: 'GMC Thrissur',
    state: 'Kerala',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 3200, ews: 5500, obc: 9900, sc: 23500, st: 42000 },
    fees: 42400,
    feeDisplay: '₹42,400/year',
  },
  {
    name: 'GMC Kollam',
    state: 'Kerala',
    type: 'Government',
    tier: 3,
    seats: 100,
    cutoffs: { general: 8500, ews: 14600, obc: 26200, sc: 62000, st: 110000 },
    fees: 42400,
    feeDisplay: '₹42,400/year',
  },
  {
    name: 'Kilpauk Medical College Chennai',
    state: 'Tamil Nadu',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 2850, ews: 4900, obc: 8800, sc: 21000, st: 37500 },
    fees: 18050,
    feeDisplay: '₹18,050/year',
  },
  {
    name: 'Thanjavur Medical College',
    state: 'Tamil Nadu',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 4500, ews: 7700, obc: 13900, sc: 33000, st: 59000 },
    fees: 18050,
    feeDisplay: '₹18,050/year',
  },
  {
    name: 'Tirunelveli Medical College',
    state: 'Tamil Nadu',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 6800, ews: 11700, obc: 21000, sc: 50000, st: 89000 },
    fees: 18050,
    feeDisplay: '₹18,050/year',
  },
  {
    name: 'Chengalpattu Medical College',
    state: 'Tamil Nadu',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 9200, ews: 15800, obc: 28400, sc: 67500, st: 120000 },
    fees: 18050,
    feeDisplay: '₹18,050/year',
  },
  {
    name: 'Govt. Kilpauk Medical College',
    state: 'Tamil Nadu',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 3500, ews: 6000, obc: 10800, sc: 25700, st: 46000 },
    fees: 18050,
    feeDisplay: '₹18,050/year',
  },
  {
    name: 'MLN Medical College Allahabad',
    state: 'Uttar Pradesh',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 5500, ews: 9500, obc: 17000, sc: 40500, st: 72000 },
    fees: 25000,
    feeDisplay: '₹25,000/year',
  },
  {
    name: 'SN Medical College Agra',
    state: 'Uttar Pradesh',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 6200, ews: 10700, obc: 19200, sc: 45700, st: 81500 },
    fees: 25000,
    feeDisplay: '₹25,000/year',
  },
  {
    name: 'LLRM Medical College Meerut',
    state: 'Uttar Pradesh',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 7000, ews: 12000, obc: 21600, sc: 51500, st: 92000 },
    fees: 25000,
    feeDisplay: '₹25,000/year',
  },
  {
    name: 'UPUMS Saifai Etawah',
    state: 'Uttar Pradesh',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 8500, ews: 14600, obc: 26200, sc: 62500, st: 111500 },
    fees: 25000,
    feeDisplay: '₹25,000/year',
  },
  {
    name: 'RIMS Ranchi',
    state: 'Jharkhand',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 9500, ews: 16300, obc: 29300, sc: 69700, st: 124500 },
    fees: 35000,
    feeDisplay: '₹35,000/year',
  },
  {
    name: 'MGM Medical College Indore',
    state: 'Madhya Pradesh',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 4800, ews: 8250, obc: 14800, sc: 35200, st: 63000 },
    fees: 55000,
    feeDisplay: '₹55,000/year',
  },
  {
    name: 'NSCB Medical College Jabalpur',
    state: 'Madhya Pradesh',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 6500, ews: 11200, obc: 20100, sc: 47800, st: 85500 },
    fees: 55000,
    feeDisplay: '₹55,000/year',
  },
  {
    name: 'GMC Gwalior',
    state: 'Madhya Pradesh',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 10500, ews: 18000, obc: 32400, sc: 77000, st: 137500 },
    fees: 55000,
    feeDisplay: '₹55,000/year',
  },
  {
    name: 'Bundelkhand Medical College Sagar',
    state: 'Madhya Pradesh',
    type: 'Government',
    tier: 3,
    seats: 100,
    cutoffs: { general: 13500, ews: 23200, obc: 41700, sc: 99200, st: 177000 },
    fees: 55000,
    feeDisplay: '₹55,000/year',
  },
  {
    name: 'Dr. SNMC Jodhpur',
    state: 'Rajasthan',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 5200, ews: 8950, obc: 16100, sc: 38300, st: 68400 },
    fees: 30000,
    feeDisplay: '₹30,000/year',
  },
  {
    name: 'RNT Medical College Udaipur',
    state: 'Rajasthan',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 7200, ews: 12400, obc: 22300, sc: 53000, st: 94700 },
    fees: 30000,
    feeDisplay: '₹30,000/year',
  },
  {
    name: 'SP Medical College Bikaner',
    state: 'Rajasthan',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 9800, ews: 16800, obc: 30200, sc: 72000, st: 128500 },
    fees: 30000,
    feeDisplay: '₹30,000/year',
  },
  {
    name: 'JLN Medical College Ajmer',
    state: 'Rajasthan',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 11500, ews: 19800, obc: 35600, sc: 84700, st: 151200 },
    fees: 30000,
    feeDisplay: '₹30,000/year',
  },
  {
    name: 'GMCH Patiala',
    state: 'Punjab',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 8200, ews: 14100, obc: 25400, sc: 60400, st: 107800 },
    fees: 78500,
    feeDisplay: '₹78,500/year',
  },
  {
    name: 'GMC Panchkula',
    state: 'Haryana',
    type: 'Government',
    tier: 3,
    seats: 100,
    cutoffs: { general: 12500, ews: 21500, obc: 38700, sc: 92000, st: 164200 },
    fees: 65000,
    feeDisplay: '₹65,000/year',
  },
  {
    name: 'PGIMS Rohtak',
    state: 'Haryana',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 4500, ews: 7700, obc: 13900, sc: 33000, st: 59000 },
    fees: 65000,
    feeDisplay: '₹65,000/year',
  },
  {
    name: 'BPS GMC Khanpur Kalan',
    state: 'Haryana',
    type: 'Government',
    tier: 3,
    seats: 100,
    cutoffs: { general: 14500, ews: 24900, obc: 44800, sc: 106500, st: 190200 },
    fees: 65000,
    feeDisplay: '₹65,000/year',
  },
  {
    name: 'NRS Medical College Kolkata',
    state: 'West Bengal',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 4200, ews: 7200, obc: 13000, sc: 30900, st: 55200 },
    fees: 15000,
    feeDisplay: '₹15,000/year',
  },
  {
    name: 'RG Kar Medical College Kolkata',
    state: 'West Bengal',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 4800, ews: 8250, obc: 14800, sc: 35200, st: 62900 },
    fees: 15000,
    feeDisplay: '₹15,000/year',
  },
  {
    name: 'IPGMER Kolkata (SSKM)',
    state: 'West Bengal',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 3800, ews: 6500, obc: 11700, sc: 27800, st: 49700 },
    fees: 15000,
    feeDisplay: '₹15,000/year',
  },
  {
    name: 'Calcutta National Medical College',
    state: 'West Bengal',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 6500, ews: 11200, obc: 20100, sc: 47800, st: 85400 },
    fees: 15000,
    feeDisplay: '₹15,000/year',
  },
  {
    name: 'North Bengal Medical College',
    state: 'West Bengal',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 11000, ews: 18900, obc: 34000, sc: 80900, st: 144400 },
    fees: 15000,
    feeDisplay: '₹15,000/year',
  },
  {
    name: 'Burdwan Medical College',
    state: 'West Bengal',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 13000, ews: 22350, obc: 40200, sc: 95600, st: 170700 },
    fees: 15000,
    feeDisplay: '₹15,000/year',
  },
  {
    name: 'Darbhanga Medical College',
    state: 'Bihar',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 11500, ews: 19800, obc: 35600, sc: 84700, st: 151200 },
    fees: 18700,
    feeDisplay: '₹18,700/year',
  },
  {
    name: 'ANMCH Gaya',
    state: 'Bihar',
    type: 'Government',
    tier: 3,
    seats: 100,
    cutoffs: { general: 14000, ews: 24100, obc: 43300, sc: 103000, st: 184000 },
    fees: 18700,
    feeDisplay: '₹18,700/year',
  },
  {
    name: 'SKMCH Muzaffarpur',
    state: 'Bihar',
    type: 'Government',
    tier: 3,
    seats: 100,
    cutoffs: { general: 15500, ews: 26700, obc: 48000, sc: 114200, st: 203800 },
    fees: 18700,
    feeDisplay: '₹18,700/year',
  },
  {
    name: 'Topiwala National Medical College Mumbai',
    state: 'Maharashtra',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 2800, ews: 4800, obc: 8600, sc: 20500, st: 36600 },
    fees: 98500,
    feeDisplay: '₹98,500/year',
  },
  {
    name: 'Lokmanya Tilak Medical College Mumbai',
    state: 'Maharashtra',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 3500, ews: 6000, obc: 10800, sc: 25700, st: 45900 },
    fees: 98500,
    feeDisplay: '₹98,500/year',
  },
  {
    name: 'BJ Government Medical College Pune',
    state: 'Maharashtra',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 4200, ews: 7200, obc: 13000, sc: 30900, st: 55200 },
    fees: 98500,
    feeDisplay: '₹98,500/year',
  },
  {
    name: 'SRTR Medical College Ambajogai',
    state: 'Maharashtra',
    type: 'Government',
    tier: 3,
    seats: 100,
    cutoffs: { general: 16500, ews: 28400, obc: 51100, sc: 121500, st: 216900 },
    fees: 85000,
    feeDisplay: '₹85,000/year',
  },
  {
    name: 'GMC Latur',
    state: 'Maharashtra',
    type: 'Government',
    tier: 3,
    seats: 100,
    cutoffs: { general: 17500, ews: 30100, obc: 54200, sc: 128900, st: 230000 },
    fees: 85000,
    feeDisplay: '₹85,000/year',
  },
  {
    name: 'GMC Akola',
    state: 'Maharashtra',
    type: 'Government',
    tier: 3,
    seats: 100,
    cutoffs: { general: 18500, ews: 31800, obc: 57200, sc: 136000, st: 242800 },
    fees: 85000,
    feeDisplay: '₹85,000/year',
  },
  {
    name: 'GMC Miraj',
    state: 'Maharashtra',
    type: 'Government',
    tier: 3,
    seats: 100,
    cutoffs: { general: 19500, ews: 33500, obc: 60300, sc: 143400, st: 256000 },
    fees: 85000,
    feeDisplay: '₹85,000/year',
  },
  {
    name: 'GMC Chandrapur',
    state: 'Maharashtra',
    type: 'Government',
    tier: 3,
    seats: 100,
    cutoffs: { general: 20500, ews: 35200, obc: 63400, sc: 150800, st: 269200 },
    fees: 85000,
    feeDisplay: '₹85,000/year',
  },
  {
    name: 'VIMS Bellary',
    state: 'Karnataka',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 15000, ews: 25800, obc: 46400, sc: 110300, st: 196900 },
    fees: 67050,
    feeDisplay: '₹67,050/year',
  },
  {
    name: 'KIMS Hubli',
    state: 'Karnataka',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 8000, ews: 13750, obc: 24700, sc: 58800, st: 105000 },
    fees: 67050,
    feeDisplay: '₹67,050/year',
  },
  {
    name: 'GIMS Gadag',
    state: 'Karnataka',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 17000, ews: 29200, obc: 52500, sc: 124900, st: 223000 },
    fees: 67050,
    feeDisplay: '₹67,050/year',
  },
  {
    name: 'GMC & Hospital Sector 32 Chandigarh',
    state: 'Chandigarh',
    type: 'Government',
    tier: 2,
    seats: 100,
    cutoffs: { general: 778, ews: 1340, obc: 2400, sc: 5700, st: 10200 },
    fees: 55000,
    feeDisplay: '₹55,000/year',
  },
  {
    name: 'VSSIMSAR Burla',
    state: 'Odisha',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 9500, ews: 16350, obc: 29400, sc: 69900, st: 124800 },
    fees: 45000,
    feeDisplay: '₹45,000/year',
  },
  {
    name: 'MKCG Medical College Berhampur',
    state: 'Odisha',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 14500, ews: 24900, obc: 44800, sc: 106500, st: 190200 },
    fees: 45000,
    feeDisplay: '₹45,000/year',
  },
  {
    name: 'Gandhi Medical College Hyderabad',
    state: 'Telangana',
    type: 'Government',
    tier: 2,
    seats: 200,
    cutoffs: { general: 4500, ews: 7750, obc: 13900, sc: 33100, st: 59100 },
    fees: 35000,
    feeDisplay: '₹35,000/year',
  },
  {
    name: 'Kakatiya Medical College Warangal',
    state: 'Telangana',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 12000, ews: 20600, obc: 37100, sc: 88200, st: 157500 },
    fees: 35000,
    feeDisplay: '₹35,000/year',
  },
  {
    name: 'Kurnool Medical College',
    state: 'Andhra Pradesh',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 13500, ews: 23200, obc: 41700, sc: 99200, st: 177100 },
    fees: 40250,
    feeDisplay: '₹40,250/year',
  },
  {
    name: 'Guntur Medical College',
    state: 'Andhra Pradesh',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 14500, ews: 24900, obc: 44800, sc: 106600, st: 190300 },
    fees: 40250,
    feeDisplay: '₹40,250/year',
  },
  {
    name: 'Siddhartha Medical College Vijayawada',
    state: 'Andhra Pradesh',
    type: 'Government',
    tier: 2,
    seats: 150,
    cutoffs: { general: 8500, ews: 14600, obc: 26300, sc: 62500, st: 111600 },
    fees: 40250,
    feeDisplay: '₹40,250/year',
  },
  {
    name: 'Rangaraya Medical College Kakinada',
    state: 'Andhra Pradesh',
    type: 'Government',
    tier: 3,
    seats: 150,
    cutoffs: { general: 15500, ews: 26700, obc: 48000, sc: 114200, st: 203900 },
    fees: 40250,
    feeDisplay: '₹40,250/year',
  },
  // ============ ADDITIONAL PRIVATE/DEEMED COLLEGES (50+) ============
  {
    name: 'KS Hegde Medical Academy Mangalore',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 2,
    seats: 150,
    cutoffs: { general: 153008, ews: 261500, obc: 470000, sc: 1100000, st: 1500000 },
    fees: 1750000,
    feeDisplay: '₹17.5 Lakhs/year',
  },
  {
    name: 'Adichunchanagiri Institute of Medical Sciences',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 2,
    seats: 150,
    cutoffs: { general: 98000, ews: 167500, obc: 301000, sc: 700000, st: 1200000 },
    fees: 1850000,
    feeDisplay: '₹18.5 Lakhs/year',
  },
  {
    name: 'SDM College of Medical Sciences Dharwad',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 2,
    seats: 150,
    cutoffs: { general: 105000, ews: 179500, obc: 323000, sc: 750000, st: 1300000 },
    fees: 1700000,
    feeDisplay: '₹17 Lakhs/year',
  },
  {
    name: 'Dayanand Sagar Medical College Bangalore',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 2,
    seats: 150,
    cutoffs: { general: 112000, ews: 191500, obc: 344500, sc: 800000, st: 1380000 },
    fees: 2000000,
    feeDisplay: '₹20 Lakhs/year',
  },
  {
    name: 'Saptagiri Institute of Medical Sciences Bangalore',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 168000, ews: 287000, obc: 516000, sc: 1200000, st: 1700000 },
    fees: 1850000,
    feeDisplay: '₹18.5 Lakhs/year',
  },
  {
    name: 'Kempegowda Institute of Medical Sciences Bangalore',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 2,
    seats: 150,
    cutoffs: { general: 88000, ews: 150500, obc: 270500, sc: 628000, st: 1085000 },
    fees: 1750000,
    feeDisplay: '₹17.5 Lakhs/year',
  },
  {
    name: 'Vydehi Institute of Medical Sciences Bangalore',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 2,
    seats: 150,
    cutoffs: { general: 95000, ews: 162500, obc: 292000, sc: 678000, st: 1170000 },
    fees: 1900000,
    feeDisplay: '₹19 Lakhs/year',
  },
  {
    name: 'MVJ Medical College Bangalore',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 175000, ews: 299000, obc: 538000, sc: 1250000, st: 1800000 },
    fees: 1700000,
    feeDisplay: '₹17 Lakhs/year',
  },
  {
    name: 'AJ Institute of Medical Sciences Mangalore',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 225000, ews: 384500, obc: 692000, sc: 1600000, st: 2000000 },
    fees: 1600000,
    feeDisplay: '₹16 Lakhs/year',
  },
  {
    name: 'Rajarajeswari Medical College Bangalore',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 190000, ews: 324500, obc: 584000, sc: 1350000, st: 1900000 },
    fees: 1750000,
    feeDisplay: '₹17.5 Lakhs/year',
  },
  {
    name: 'Subbaiah Institute of Medical Sciences Shimoga',
    state: 'Karnataka',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 245000, ews: 418500, obc: 753000, sc: 1750000, st: 2100000 },
    fees: 1500000,
    feeDisplay: '₹15 Lakhs/year',
  },
  {
    name: 'Pushpagiri Institute of Medical Sciences Thiruvalla',
    state: 'Kerala',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 320000, ews: 546500, obc: 983000, sc: 1850000, st: 2250000 },
    fees: 1300000,
    feeDisplay: '₹13 Lakhs/year',
  },
  {
    name: 'MES Medical College Perinthalmanna',
    state: 'Kerala',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 370000, ews: 632000, obc: 1137500, sc: 1950000, st: 2300000 },
    fees: 1400000,
    feeDisplay: '₹14 Lakhs/year',
  },
  {
    name: 'Kannur Medical College',
    state: 'Kerala',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 400000, ews: 683500, obc: 1230000, sc: 2000000, st: 2350000 },
    fees: 1500000,
    feeDisplay: '₹15 Lakhs/year',
  },
  {
    name: 'Sree Narayana Institute of Medical Sciences',
    state: 'Kerala',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 430000, ews: 734500, obc: 1322000, sc: 2050000, st: 2380000 },
    fees: 1400000,
    feeDisplay: '₹14 Lakhs/year',
  },
  {
    name: 'Dr. Somervell Memorial CSI Medical College',
    state: 'Kerala',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 450000, ews: 768500, obc: 1383500, sc: 2100000, st: 2400000 },
    fees: 1200000,
    feeDisplay: '₹12 Lakhs/year',
  },
  {
    name: 'SUT Academy of Medical Sciences Thiruvananthapuram',
    state: 'Kerala',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 480000, ews: 820000, obc: 1476000, sc: 2150000, st: 2420000 },
    fees: 1500000,
    feeDisplay: '₹15 Lakhs/year',
  },
  {
    name: 'Sree Gokulam Medical College Venjaramoodu',
    state: 'Kerala',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 510000, ews: 871500, obc: 1568500, sc: 2200000, st: 2450000 },
    fees: 1600000,
    feeDisplay: '₹16 Lakhs/year',
  },
  {
    name: 'PSG Institute of Medical Sciences Coimbatore',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 2,
    seats: 150,
    cutoffs: { general: 135000, ews: 230500, obc: 415000, sc: 960000, st: 1450000 },
    fees: 1500000,
    feeDisplay: '₹15 Lakhs/year',
  },
  {
    name: 'Annapoorna Medical College Salem',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 260000, ews: 444000, obc: 799000, sc: 1500000, st: 1900000 },
    fees: 1800000,
    feeDisplay: '₹18 Lakhs/year',
  },
  {
    name: 'Dhanalakshmi Srinivasan Medical College Perambalur',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 290000, ews: 495000, obc: 891000, sc: 1600000, st: 2000000 },
    fees: 1900000,
    feeDisplay: '₹19 Lakhs/year',
  },
  {
    name: 'ACS Medical College Chennai',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 330000, ews: 563500, obc: 1014000, sc: 1700000, st: 2100000 },
    fees: 2100000,
    feeDisplay: '₹21 Lakhs/year',
  },
  {
    name: 'Karpaga Vinayaga Institute of Medical Sciences',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 360000, ews: 615000, obc: 1107000, sc: 1800000, st: 2200000 },
    fees: 1750000,
    feeDisplay: '₹17.5 Lakhs/year',
  },
  {
    name: 'Shri Sathya Sai Medical College Kancheepuram',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 390000, ews: 666000, obc: 1199000, sc: 1900000, st: 2280000 },
    fees: 1900000,
    feeDisplay: '₹19 Lakhs/year',
  },
  {
    name: 'Tagore Medical College Chennai',
    state: 'Tamil Nadu',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 460000, ews: 785500, obc: 1414000, sc: 2050000, st: 2400000 },
    fees: 2000000,
    feeDisplay: '₹20 Lakhs/year',
  },
  {
    name: 'Smt. NHL Medical College Ahmedabad',
    state: 'Gujarat',
    type: 'Private/Deemed',
    tier: 2,
    seats: 150,
    cutoffs: { general: 75000, ews: 128000, obc: 230500, sc: 535000, st: 925000 },
    fees: 900000,
    feeDisplay: '₹9 Lakhs/year',
  },
  {
    name: 'Pramukhswami Medical College Karamsad',
    state: 'Gujarat',
    type: 'Private/Deemed',
    tier: 2,
    seats: 100,
    cutoffs: { general: 82000, ews: 140000, obc: 252000, sc: 585000, st: 1010000 },
    fees: 1200000,
    feeDisplay: '₹12 Lakhs/year',
  },
  {
    name: 'Smt. BK Shah Medical Institute Vadodara',
    state: 'Gujarat',
    type: 'Private/Deemed',
    tier: 2,
    seats: 100,
    cutoffs: { general: 95000, ews: 162500, obc: 292000, sc: 678000, st: 1170000 },
    fees: 1400000,
    feeDisplay: '₹14 Lakhs/year',
  },
  {
    name: 'GMERS Medical College Sola',
    state: 'Gujarat',
    type: 'Private/Deemed',
    tier: 2,
    seats: 150,
    cutoffs: { general: 68000, ews: 116000, obc: 209000, sc: 485000, st: 840000 },
    fees: 1100000,
    feeDisplay: '₹11 Lakhs/year',
  },
  {
    name: 'Parul Institute of Medical Sciences Vadodara',
    state: 'Gujarat',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 178000, ews: 304000, obc: 547000, sc: 1270000, st: 1820000 },
    fees: 1500000,
    feeDisplay: '₹15 Lakhs/year',
  },
  {
    name: 'Subharti Medical College Meerut',
    state: 'Uttar Pradesh',
    type: 'Private/Deemed',
    tier: 3,
    seats: 200,
    cutoffs: { general: 185000, ews: 316000, obc: 569000, sc: 1320000, st: 1880000 },
    fees: 1400000,
    feeDisplay: '₹14 Lakhs/year',
  },
  {
    name: 'Teerthanker Mahaveer Medical College Moradabad',
    state: 'Uttar Pradesh',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 210000, ews: 358500, obc: 645000, sc: 1500000, st: 2000000 },
    fees: 1500000,
    feeDisplay: '₹15 Lakhs/year',
  },
  {
    name: 'Rohilkhand Medical College Bareilly',
    state: 'Uttar Pradesh',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 240000, ews: 410000, obc: 738000, sc: 1700000, st: 2100000 },
    fees: 1300000,
    feeDisplay: '₹13 Lakhs/year',
  },
  {
    name: 'Rama Medical College Kanpur',
    state: 'Uttar Pradesh',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 270000, ews: 461000, obc: 830000, sc: 1780000, st: 2150000 },
    fees: 1250000,
    feeDisplay: '₹12.5 Lakhs/year',
  },
  {
    name: 'School of Medical Sciences Greater Noida',
    state: 'Uttar Pradesh',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 300000, ews: 512500, obc: 922500, sc: 1850000, st: 2220000 },
    fees: 1400000,
    feeDisplay: '₹14 Lakhs/year',
  },
  {
    name: 'Saraswathi Institute of Medical Sciences Hapur',
    state: 'Uttar Pradesh',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 340000, ews: 580500, obc: 1045000, sc: 1900000, st: 2280000 },
    fees: 1300000,
    feeDisplay: '₹13 Lakhs/year',
  },
  {
    name: 'Prasad Institute of Medical Sciences Lucknow',
    state: 'Uttar Pradesh',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 380000, ews: 649000, obc: 1168000, sc: 1950000, st: 2320000 },
    fees: 1200000,
    feeDisplay: '₹12 Lakhs/year',
  },
  {
    name: 'NIMS Medical College Jaipur',
    state: 'Rajasthan',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 220000, ews: 375500, obc: 676000, sc: 1570000, st: 2020000 },
    fees: 1600000,
    feeDisplay: '₹16 Lakhs/year',
  },
  {
    name: 'Geetanjali Medical College Udaipur',
    state: 'Rajasthan',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 255000, ews: 435500, obc: 784000, sc: 1680000, st: 2100000 },
    fees: 1700000,
    feeDisplay: '₹17 Lakhs/year',
  },
  {
    name: 'Pacific Medical College Udaipur',
    state: 'Rajasthan',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 285000, ews: 487000, obc: 876500, sc: 1750000, st: 2150000 },
    fees: 1550000,
    feeDisplay: '₹15.5 Lakhs/year',
  },
  {
    name: 'American International Institute of Medical Sciences Udaipur',
    state: 'Rajasthan',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 315000, ews: 538000, obc: 968500, sc: 1820000, st: 2200000 },
    fees: 1600000,
    feeDisplay: '₹16 Lakhs/year',
  },
  {
    name: 'Mahatma Gandhi Medical College Jaipur',
    state: 'Rajasthan',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 350000, ews: 597500, obc: 1076000, sc: 1880000, st: 2260000 },
    fees: 1450000,
    feeDisplay: '₹14.5 Lakhs/year',
  },
  {
    name: 'Ananta Institute of Medical Sciences Rajsamand',
    state: 'Rajasthan',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 410000, ews: 700500, obc: 1261000, sc: 1980000, st: 2350000 },
    fees: 1400000,
    feeDisplay: '₹14 Lakhs/year',
  },
  {
    name: 'Dr. DY Patil Medical College Kolhapur',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 148000, ews: 252800, obc: 455000, sc: 1055000, st: 1500000 },
    fees: 1800000,
    feeDisplay: '₹18 Lakhs/year',
  },
  {
    name: 'Smt. Kashibai Navale Medical College Pune',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 160000, ews: 273500, obc: 492000, sc: 1140000, st: 1620000 },
    fees: 1700000,
    feeDisplay: '₹17 Lakhs/year',
  },
  {
    name: 'ACPM Medical College Dhule',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 195000, ews: 333000, obc: 600000, sc: 1390000, st: 1850000 },
    fees: 1500000,
    feeDisplay: '₹15 Lakhs/year',
  },
  {
    name: 'NKP Salve Institute of Medical Sciences Nagpur',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 230000, ews: 393000, obc: 707000, sc: 1640000, st: 2050000 },
    fees: 1600000,
    feeDisplay: '₹16 Lakhs/year',
  },
  {
    name: 'MIMER Medical College Pune',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 265000, ews: 452500, obc: 814500, sc: 1720000, st: 2120000 },
    fees: 1550000,
    feeDisplay: '₹15.5 Lakhs/year',
  },
  {
    name: 'Rural Medical College Loni',
    state: 'Maharashtra',
    type: 'Private/Deemed',
    tier: 3,
    seats: 100,
    cutoffs: { general: 295000, ews: 503500, obc: 907000, sc: 1800000, st: 2180000 },
    fees: 1400000,
    feeDisplay: '₹14 Lakhs/year',
  },
  {
    name: 'Sikkim Manipal Institute of Medical Sciences',
    state: 'Sikkim',
    type: 'Private/Deemed',
    tier: 2,
    seats: 100,
    cutoffs: { general: 62000, ews: 106000, obc: 190500, sc: 442000, st: 765000 },
    fees: 1785000,
    feeDisplay: '₹17.85 Lakhs/year',
  },
  {
    name: 'Hi-Tech Medical College Bhubaneswar',
    state: 'Odisha',
    type: 'Private/Deemed',
    tier: 3,
    seats: 150,
    cutoffs: { general: 245000, ews: 418500, obc: 753500, sc: 1750000, st: 2100000 },
    fees: 1400000,
    feeDisplay: '₹14 Lakhs/year',
  },
  {
    name: 'IMS BHU Varanasi (Private Seats)',
    state: 'Uttar Pradesh',
    type: 'Private/Deemed',
    tier: 2,
    seats: 50,
    cutoffs: { general: 58000, ews: 99000, obc: 178000, sc: 413000, st: 715000 },
    fees: 1000000,
    feeDisplay: '₹10 Lakhs/year',
  },
]

const states = [...new Set(collegesData.map((c) => c.state))].sort()

type SortOption = 'cutoff' | 'fees' | 'tier' | 'seats'

export default function NEETCollegePredictorPage() {
  const [rank, setRank] = useState<string>('')
  const [category, setCategory] = useState<string>('general')
  const [collegeType, setCollegeType] = useState<string>('All')
  const [selectedState, setSelectedState] = useState<string>('All')
  const [feeRange, setFeeRange] = useState<string>('All')
  const [sortBy, setSortBy] = useState<SortOption>('cutoff')
  const [showResults, setShowResults] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const getChance = (
    userRank: number,
    cutoff: number
  ): { level: 'High' | 'Medium' | 'Low' | 'Very Low'; color: string } => {
    const ratio = userRank / cutoff
    if (ratio <= 0.7) return { level: 'High', color: 'bg-green-100 text-green-800' }
    if (ratio <= 0.9) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' }
    if (ratio <= 1.0) return { level: 'Low', color: 'bg-orange-100 text-orange-800' }
    return { level: 'Very Low', color: 'bg-red-100 text-red-800' }
  }

  const results = useMemo(() => {
    if (!showResults || !rank) return []

    const rankNum = parseInt(rank)
    if (isNaN(rankNum) || rankNum < 1) return []

    let filtered = collegesData.filter((college) => {
      const cutoff = college.cutoffs[category as keyof typeof college.cutoffs]
      const inRange = rankNum <= cutoff * 1.15 // Show colleges where rank is within 15% above cutoff

      const typeMatch = collegeType === 'All' || college.type === collegeType
      const stateMatch = selectedState === 'All' || college.state === selectedState

      let feeMatch = true
      if (feeRange === 'low') feeMatch = college.fees <= 100000
      else if (feeRange === 'medium') feeMatch = college.fees > 100000 && college.fees <= 1500000
      else if (feeRange === 'high') feeMatch = college.fees > 1500000

      return inRange && typeMatch && stateMatch && feeMatch
    })

    // Sort results
    filtered.sort((a, b) => {
      if (sortBy === 'cutoff') {
        return (
          a.cutoffs[category as keyof typeof a.cutoffs] -
          b.cutoffs[category as keyof typeof b.cutoffs]
        )
      }
      if (sortBy === 'fees') return a.fees - b.fees
      if (sortBy === 'tier') return a.tier - b.tier
      if (sortBy === 'seats') return b.seats - a.seats
      return 0
    })

    return filtered
  }, [showResults, rank, category, collegeType, selectedState, feeRange, sortBy])

  const govtCount = results.filter((c) => c.type === 'Government').length
  const privateCount = results.filter((c) => c.type === 'Private/Deemed').length

  const handlePredict = () => {
    const rankNum = parseInt(rank)
    if (isNaN(rankNum) || rankNum < 1) {
      alert('Please enter a valid rank')
      return
    }
    setShowResults(true)
  }

  const handleReset = () => {
    setRank('')
    setCategory('general')
    setCollegeType('All')
    setSelectedState('All')
    setFeeRange('All')
    setSortBy('cutoff')
    setShowResults(false)
    setExpandedCard(null)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'NEET College Predictor 2026',
            description:
              'Free tool to find medical colleges based on your NEET rank. Comprehensive database of 100+ Government and Private/Deemed medical colleges with accurate 2024 cutoff data.',
            url: 'https://www.cerebrumbiologyacademy.com/neet-college-predictor',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 pt-16 pb-24 text-white md:pt-24 md:pb-32">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/neet-tools" className="hover:underline">
                NEET Tools
              </Link>
              <span className="mx-2">/</span>
              <span>College Predictor</span>
            </nav>

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">NEET College Predictor 2026</h1>
            <p className="mb-6 max-w-2xl text-lg text-blue-100 md:text-xl">
              India&apos;s most comprehensive NEET college predictor with 100+ medical colleges.
              Accurate NEET 2024 cutoff data for Government (including all AIIMS) and Private/Deemed
              universities.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Building2 className="h-5 w-5" />
                <span className="font-semibold">{collegesData.length}+ Colleges</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Award className="h-5 w-5" />
                <span className="font-semibold">All 23 AIIMS</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">2024 Cutoffs</span>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="-mt-16 relative z-10 px-4 sm:px-6 lg:px-8 md:-mt-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl bg-white p-6 shadow-xl md:p-8">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Search className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Find Your Medical Colleges</h2>
                  <p className="text-gray-600">
                    Enter your NEET AIR to see colleges you can get admission in
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="rank"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Your NEET Rank (AIR) *
                      </label>
                      <input
                        type="number"
                        id="rank"
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                        min="1"
                        placeholder="Enter your rank"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Category *
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="general">General</option>
                        <option value="ews">EWS</option>
                        <option value="obc">OBC (NCL)</option>
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="type"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        College Type
                      </label>
                      <select
                        id="type"
                        value={collegeType}
                        onChange={(e) => setCollegeType(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="All">All Types</option>
                        <option value="Government">Government (incl. AIIMS, JIPMER)</option>
                        <option value="Private/Deemed">Private & Deemed Universities</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        State Preference
                      </label>
                      <select
                        id="state"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="All">All States</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="feeRange"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Fee Range (Annual)
                      </label>
                      <select
                        id="feeRange"
                        value={feeRange}
                        onChange={(e) => setFeeRange(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="All">All Fees</option>
                        <option value="low">Below ₹1 Lakh (Govt Colleges)</option>
                        <option value="medium">₹1 - ₹15 Lakhs</option>
                        <option value="high">Above ₹15 Lakhs</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="sortBy"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Sort By
                      </label>
                      <select
                        id="sortBy"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="cutoff">Cutoff Rank (Low to High)</option>
                        <option value="fees">Fees (Low to High)</option>
                        <option value="tier">College Tier</option>
                        <option value="seats">Seats (High to Low)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handlePredict}
                      className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700"
                    >
                      Find Colleges
                    </button>
                    {showResults && (
                      <button
                        onClick={handleReset}
                        className="rounded-lg border-2 border-blue-600 px-6 py-4 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-4">
                    <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <p className="text-sm text-blue-800">
                      Cutoff ranks are based on NEET 2024 MCC counselling Round 3 data. Results show
                      colleges where your rank is within the likely admission range. Actual cutoffs
                      may vary in 2026.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {showResults && (
          <section className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              {/* Summary Cards */}
              <div className="mb-8 grid gap-4 md:grid-cols-4">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-3xl font-bold text-blue-600">{results.length}</p>
                  <p className="text-sm text-gray-600">Total Colleges Found</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-3xl font-bold text-green-600">{govtCount}</p>
                  <p className="text-sm text-gray-600">Government Colleges</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-3xl font-bold text-purple-600">{privateCount}</p>
                  <p className="text-sm text-gray-600">Private/Deemed Colleges</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-3xl font-bold text-orange-600">
                    {parseInt(rank).toLocaleString('en-IN')}
                  </p>
                  <p className="text-sm text-gray-600">Your Rank ({category.toUpperCase()})</p>
                </div>
              </div>

              {results.length === 0 ? (
                <div className="rounded-xl bg-yellow-50 p-8 text-center">
                  <p className="text-lg text-yellow-800">
                    No colleges found for your criteria. Try adjusting your filters or check
                    Private/Deemed colleges which have higher cutoffs.
                  </p>
                  <Link
                    href="/neet-rank-predictor"
                    className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    Check your rank prediction first
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((college) => {
                    const cutoff = college.cutoffs[category as keyof typeof college.cutoffs]
                    const chance = getChance(parseInt(rank), cutoff)
                    const isExpanded = expandedCard === college.name

                    return (
                      <div
                        key={college.name}
                        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                      >
                        <div className="p-4 md:p-6">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                    college.type === 'Government'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-purple-100 text-purple-800'
                                  }`}
                                >
                                  {college.type}
                                </span>
                                <span
                                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                    college.tier === 1
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : college.tier === 2
                                        ? 'bg-gray-100 text-gray-700'
                                        : 'bg-gray-50 text-gray-600'
                                  }`}
                                >
                                  {college.tier === 1 ? (
                                    <span className="flex items-center gap-1">
                                      <Star className="h-3 w-3" /> Tier 1
                                    </span>
                                  ) : (
                                    `Tier ${college.tier}`
                                  )}
                                </span>
                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-semibold ${chance.color}`}
                                >
                                  {chance.level} Chance
                                </span>
                                {college.nirfRank && (
                                  <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                    NIRF #{college.nirfRank}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {college.name}
                              </h3>
                              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {college.state}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {college.seats} seats
                                </span>
                                <span className="flex items-center gap-1">
                                  <IndianRupee className="h-4 w-4" />
                                  {college.feeDisplay}
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-sm text-gray-500">
                                {category.toUpperCase()} Cutoff
                              </p>
                              <p className="text-2xl font-bold text-blue-600">
                                {cutoff.toLocaleString('en-IN')}
                              </p>
                              <button
                                onClick={() => setExpandedCard(isExpanded ? null : college.name)}
                                className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:underline"
                              >
                                {isExpanded ? 'Hide' : 'All Cutoffs'}
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="mt-4 border-t border-gray-100 pt-4">
                              <p className="mb-2 text-sm font-medium text-gray-700">
                                Category-wise Cutoff Ranks (NEET 2024):
                              </p>
                              <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-5">
                                <div className="rounded-lg bg-gray-50 p-2 text-center">
                                  <p className="font-semibold text-gray-900">
                                    {college.cutoffs.general.toLocaleString('en-IN')}
                                  </p>
                                  <p className="text-xs text-gray-500">General</p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-2 text-center">
                                  <p className="font-semibold text-gray-900">
                                    {college.cutoffs.ews.toLocaleString('en-IN')}
                                  </p>
                                  <p className="text-xs text-gray-500">EWS</p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-2 text-center">
                                  <p className="font-semibold text-gray-900">
                                    {college.cutoffs.obc.toLocaleString('en-IN')}
                                  </p>
                                  <p className="text-xs text-gray-500">OBC</p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-2 text-center">
                                  <p className="font-semibold text-gray-900">
                                    {college.cutoffs.sc.toLocaleString('en-IN')}
                                  </p>
                                  <p className="text-xs text-gray-500">SC</p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-2 text-center">
                                  <p className="font-semibold text-gray-900">
                                    {college.cutoffs.st.toLocaleString('en-IN')}
                                  </p>
                                  <p className="text-xs text-gray-500">ST</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* How It Works */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              How College Predictor Works
            </h2>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-4">
              {[
                { step: '1', title: 'Enter Rank', desc: 'Your NEET All India Rank' },
                { step: '2', title: 'Select Category', desc: 'General, EWS, OBC, SC, ST' },
                { step: '3', title: 'Apply Filters', desc: 'State, fees, college type' },
                { step: '4', title: 'See Results', desc: 'With admission chances' },
              ].map((item) => (
                <div key={item.step} className="rounded-xl bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                    {item.step}
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700">
              <div className="grid items-center md:grid-cols-2">
                <div className="p-8 text-white md:p-12">
                  <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    Improve Your Rank for Better Colleges
                  </h2>
                  <p className="mb-6 text-blue-100">
                    Join Cerebrum Biology Academy to boost your Biology score and secure admission
                    in top medical colleges.
                  </p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Expert AIIMS/JIPMER faculty</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>360/360 in Biology achievable</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>5000+ practice MCQs</span>
                    </li>
                  </ul>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    Book Free Demo Class
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="relative h-full min-h-[300px] bg-gradient-to-br from-blue-500/30 to-transparent">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="h-48 w-48 text-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Related NEET Tools
            </h2>

            <div className="grid gap-6 md:grid-cols-4">
              <Link
                href="/neet-rank-predictor"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
                  Rank Predictor
                </h3>
                <p className="text-sm text-gray-600">Predict AIR from marks</p>
              </Link>

              <Link
                href="/neet-2026-cutoff"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Filter className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
                  NEET 2026 Cutoff
                </h3>
                <p className="text-sm text-gray-600">Category-wise cutoffs</p>
              </Link>

              <Link
                href="/neet-study-plan-generator"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
                  Study Plan Generator
                </h3>
                <p className="text-sm text-gray-600">Personalized schedule</p>
              </Link>

              <Link
                href="/neet-biology-syllabus-2026"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
                  Biology Syllabus
                </h3>
                <p className="text-sm text-gray-600">Complete NEET syllabus</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
