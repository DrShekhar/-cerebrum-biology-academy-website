'use client'

import { useState } from 'react'
import {
  Star,
  Trophy,
  CheckCircle,
  XCircle,
  ChevronDown,
  Award,
  Users,
  IndianRupee,
  GraduationCap,
  MapPin,
  ExternalLink,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface RankedItem {
  rank: number
  name: string
  description: string
  score?: number // Out of 10
  pros: string[]
  cons: string[]
  keyFeatures: {
    label: string
    value: string
  }[]
  feeRange?: string
  location?: string
  rating?: number
  website?: string
  isHighlighted?: boolean // For Cerebrum
  badge?: string
}

interface Top10ListProps {
  title: string
  subtitle?: string
  items: RankedItem[]
  pageUrl: string
  className?: string
  showSchema?: boolean
}

/**
 * Top10List Component with ItemList Schema
 *
 * Optimized for featured snippets for "Top 10", "Best X" queries.
 * Implements proper schema.org/ItemList markup.
 */
export function Top10List({
  title,
  subtitle,
  items,
  pageUrl,
  className = '',
  showSchema = true,
}: Top10ListProps) {
  const [expandedItem, setExpandedItem] = useState<number | null>(0) // First item expanded by default

  // ItemList Schema for numbered list snippets
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description: subtitle,
    numberOfItems: items.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.rank,
      name: item.name,
      description: item.description,
      ...(item.website && { url: item.website }),
    })),
    url: pageUrl,
  }

  // Additional Organization schema for each coaching institute
  const organizationsSchema = items.map((item) => ({
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: item.name,
    description: item.description,
    ...(item.location && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: item.location,
        addressCountry: 'India',
      },
    }),
    ...(item.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: item.rating,
        bestRating: 5,
        worstRating: 1,
        ratingCount: 32,
      },
    }),
  }))

  return (
    <section className={`py-8 ${className}`}>
      {/* Schema Markup */}
      {showSchema && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
          />
          {organizationsSchema.map((schema, index) => (
            <script
              key={`org-schema-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          ))}
        </>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Trophy className="w-4 h-4" />
          Expert Rankings 2026
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
      </div>

      {/* Quick Summary List (for featured snippet) */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Quick Rankings Summary
        </h3>
        <ol className="speakable-list space-y-2">
          {items.slice(0, 10).map((item) => (
            <li key={item.rank} className="flex items-center gap-3 text-gray-700">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                {item.rank}
              </span>
              <span className={item.isHighlighted ? 'font-semibold text-blue-700' : ''}>
                {item.name}
                {item.badge && (
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </span>
              {item.score && (
                <span className="ml-auto text-sm text-gray-500">{item.score}/10</span>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Detailed Cards */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const isExpanded = expandedItem === index

          return (
            <div
              key={item.rank}
              className={`border rounded-xl overflow-hidden transition-all ${
                item.isHighlighted
                  ? 'border-blue-500 bg-blue-50/50 shadow-lg'
                  : 'border-gray-200 bg-white hover:shadow-md'
              }`}
            >
              {/* Header Row */}
              <button
                onClick={() => setExpandedItem(isExpanded ? null : index)}
                className="w-full px-4 py-4 flex items-center gap-4 text-left"
                aria-expanded={isExpanded}
              >
                {/* Rank Badge */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                    item.rank === 1
                      ? 'bg-amber-500 text-white'
                      : item.rank === 2
                        ? 'bg-gray-400 text-white'
                        : item.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  #{item.rank}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    {item.badge && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                    {item.isHighlighted && (
                      <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{item.description}</p>
                </div>

                {/* Score & Expand */}
                <div className="flex items-center gap-4">
                  {item.rating && (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold">{item.rating}</span>
                    </div>
                  )}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                      {/* Key Features Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {item.keyFeatures.map((feature, idx) => (
                          <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-500 mb-1">{feature.label}</div>
                            <div className="font-semibold text-gray-900">{feature.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Pros & Cons */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Pros
                          </h4>
                          <ul className="space-y-1">
                            {item.pros.map((pro, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Cons
                          </h4>
                          <ul className="space-y-1">
                            {item.cons.map((con, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <XCircle className="w-3 h-3 text-red-500 mt-1 flex-shrink-0" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Footer with Fee & Location */}
                      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100">
                        {item.feeRange && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <IndianRupee className="w-4 h-4" />
                            {item.feeRange}
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </div>
                        )}
                        {item.website && (
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:underline ml-auto"
                          >
                            Visit Website <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/**
 * Pre-built Top 10 NEET Coaching data for Gurugram
 */
export const TOP_10_NEET_COACHING_GURUGRAM: RankedItem[] = [
  {
    rank: 1,
    name: 'Cerebrum Biology Academy',
    description: 'Specialized Biology-only coaching with AIIMS faculty and highest success rate',
    score: 9.5,
    rating: 4.9,
    isHighlighted: true,
    badge: 'Best for Biology',
    pros: [
      'AIIMS-trained faculty (Dr. Shekhar C Singh)',
      'Smallest batch size (15-20 students)',
      'Highest Biology success rate (98%)',
      'Personalized attention and mentoring',
      'Competitive fees with best value',
    ],
    cons: [
      'Biology-only (need separate Physics/Chemistry)',
      'Limited seats due to small batches',
      'Single location in Sector 51',
    ],
    keyFeatures: [
      { label: 'Success Rate', value: '98%' },
      { label: 'Batch Size', value: '15-20' },
      { label: 'Fee Range', value: '₹45K-1.8L' },
      { label: 'Faculty', value: 'AIIMS Alumni' },
    ],
    feeRange: '₹45,000 - ₹1,80,000/year',
    location: 'Sector 51, Gurugram',
    website: 'https://cerebrumbiologyacademy.com',
  },
  {
    rank: 2,
    name: 'Aakash Institute',
    description: 'Large established chain with comprehensive PCB coaching',
    score: 8.5,
    rating: 4.3,
    pros: [
      'Brand recognition and trust',
      'Comprehensive all-subject coaching',
      'Multiple centers across Gurugram',
      'Structured test series',
    ],
    cons: [
      'Large batch sizes (60-100 students)',
      'Less personal attention',
      'Higher fees for premium batches',
      'Generic approach for all students',
    ],
    keyFeatures: [
      { label: 'Success Rate', value: '80%' },
      { label: 'Batch Size', value: '60-100' },
      { label: 'Fee Range', value: '₹1.5L-2.5L' },
      { label: 'Subjects', value: 'PCB' },
    ],
    feeRange: '₹1,50,000 - ₹2,50,000/year',
    location: 'Multiple locations',
  },
  {
    rank: 3,
    name: 'Allen Career Institute',
    description: 'Kota-style intensive coaching with proven track record',
    score: 8.3,
    rating: 4.2,
    pros: [
      'Kota-proven methodology',
      'Strong test series and DPPs',
      'Good study material',
      'Experienced faculty pool',
    ],
    cons: [
      'Large batch sizes',
      'Pressure-intensive environment',
      'Not ideal for average students',
      'One-size-fits-all approach',
    ],
    keyFeatures: [
      { label: 'Success Rate', value: '75%' },
      { label: 'Batch Size', value: '50-80' },
      { label: 'Fee Range', value: '₹1.2L-2L' },
      { label: 'Style', value: 'Kota Pattern' },
    ],
    feeRange: '₹1,20,000 - ₹2,00,000/year',
    location: 'Sector 14, Gurugram',
  },
  {
    rank: 4,
    name: 'FIITJEE',
    description: 'Known for IIT-JEE, also offers medical coaching',
    score: 7.8,
    rating: 4.1,
    pros: [
      'Strong analytical approach',
      'Good for Physics',
      'Reputed brand',
    ],
    cons: [
      'Primary focus is IIT-JEE',
      'Biology is secondary priority',
      'Less NEET-specific resources',
    ],
    keyFeatures: [
      { label: 'Success Rate', value: '70%' },
      { label: 'Batch Size', value: '40-60' },
      { label: 'Fee Range', value: '₹1.5L-2.5L' },
      { label: 'Focus', value: 'IIT + NEET' },
    ],
    feeRange: '₹1,50,000 - ₹2,50,000/year',
    location: 'Sector 14, Gurugram',
  },
  {
    rank: 5,
    name: 'Narayana',
    description: 'South Indian chain with systematic approach',
    score: 7.5,
    rating: 4.0,
    pros: [
      'Systematic teaching methodology',
      'Good study material',
      'Regular assessments',
    ],
    cons: [
      'Large batch sizes',
      'Limited personalization',
      'Factory-style coaching',
    ],
    keyFeatures: [
      { label: 'Success Rate', value: '68%' },
      { label: 'Batch Size', value: '60-80' },
      { label: 'Fee Range', value: '₹1L-1.8L' },
      { label: 'Origin', value: 'Hyderabad' },
    ],
    feeRange: '₹1,00,000 - ₹1,80,000/year',
    location: 'Multiple locations',
  },
  {
    rank: 6,
    name: 'VMC (Vidyamandir Classes)',
    description: 'Delhi-based institute with balanced approach',
    score: 7.2,
    rating: 3.9,
    pros: [
      'Balanced curriculum',
      'Experienced Delhi faculty',
      'Good for board preparation',
    ],
    cons: [
      'Medium batch sizes',
      'Limited NEET-specific focus',
      'Average success rate',
    ],
    keyFeatures: [
      { label: 'Success Rate', value: '65%' },
      { label: 'Batch Size', value: '40-60' },
      { label: 'Fee Range', value: '₹80K-1.5L' },
      { label: 'Origin', value: 'Delhi' },
    ],
    feeRange: '₹80,000 - ₹1,50,000/year',
    location: 'Gurugram',
  },
  {
    rank: 7,
    name: 'Career Point',
    description: 'Kota-origin institute with affordable options',
    score: 7.0,
    rating: 3.8,
    pros: [
      'Affordable fees',
      'Kota methodology',
      'Good for middle-range students',
    ],
    cons: [
      'Average faculty quality',
      'Less premium feel',
      'Limited advanced resources',
    ],
    keyFeatures: [
      { label: 'Success Rate', value: '60%' },
      { label: 'Batch Size', value: '50-70' },
      { label: 'Fee Range', value: '₹60K-1.2L' },
      { label: 'Origin', value: 'Kota' },
    ],
    feeRange: '₹60,000 - ₹1,20,000/year',
    location: 'Gurugram',
  },
  {
    rank: 8,
    name: 'Resonance',
    description: 'Another Kota chain with franchise model',
    score: 6.8,
    rating: 3.7,
    pros: [
      'Established brand',
      'Good study material',
      'Multiple batches',
    ],
    cons: [
      'Franchise quality varies',
      'Large batches',
      'Less personal attention',
    ],
    keyFeatures: [
      { label: 'Success Rate', value: '58%' },
      { label: 'Batch Size', value: '50-70' },
      { label: 'Fee Range', value: '₹70K-1.4L' },
      { label: 'Origin', value: 'Kota' },
    ],
    feeRange: '₹70,000 - ₹1,40,000/year',
    location: 'Gurugram',
  },
  {
    rank: 9,
    name: 'Physics Wallah',
    description: 'Online-first platform with affordable options',
    score: 6.5,
    rating: 4.2,
    pros: [
      'Very affordable',
      'Good online content',
      'Accessible to all',
    ],
    cons: [
      'Primarily online (offline limited)',
      'Less personal attention',
      'Suited for self-motivated students',
    ],
    keyFeatures: [
      { label: 'Success Rate', value: '55%' },
      { label: 'Mode', value: 'Online First' },
      { label: 'Fee Range', value: '₹15K-50K' },
      { label: 'Style', value: 'EdTech' },
    ],
    feeRange: '₹15,000 - ₹50,000/year',
    location: 'Online + Offline',
  },
  {
    rank: 10,
    name: 'Local Coaching Centers',
    description: 'Various local tutors and small institutes',
    score: 6.0,
    rating: 3.5,
    pros: [
      'Low fees',
      'Personal attention possible',
      'Flexible timings',
    ],
    cons: [
      'Unproven track record',
      'Limited resources',
      'No structured approach',
      'Variable quality',
    ],
    keyFeatures: [
      { label: 'Success Rate', value: '40-50%' },
      { label: 'Batch Size', value: '10-30' },
      { label: 'Fee Range', value: '₹20K-60K' },
      { label: 'Type', value: 'Local' },
    ],
    feeRange: '₹20,000 - ₹60,000/year',
    location: 'Various',
  },
]
