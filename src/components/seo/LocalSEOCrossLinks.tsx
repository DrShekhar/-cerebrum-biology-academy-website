import Link from 'next/link'
import { MapPin, GraduationCap, BookOpen, ArrowRight } from 'lucide-react'

interface CrossLinkGroup {
  title: string
  links: Array<{ label: string; href: string }>
}

interface LocalSEOCrossLinksProps {
  cityName: string
  citySlug: string
  className?: string
}

const CITY_CROSS_LINKS: Record<string, CrossLinkGroup[]> = {
  noida: [
    {
      title: 'NEET Coaching in Noida',
      links: [
        { label: 'Best NEET Coaching Noida', href: '/best-neet-coaching-noida' },
        { label: 'NEET Coaching Noida', href: '/neet-coaching-noida' },
        { label: 'Biology Tutor Noida', href: '/biology-tutor-noida' },
        { label: 'Biology Classes Noida', href: '/biology-classes-noida' },
      ],
    },
    {
      title: 'Nearby Centers',
      links: [
        { label: 'Noida Center', href: '/locations/noida' },
        { label: 'Greater Noida', href: '/best-neet-coaching-greater-noida' },
        { label: 'Ghaziabad', href: '/best-neet-coaching-ghaziabad' },
        { label: 'All Locations', href: '/all-locations' },
      ],
    },
  ],
  ghaziabad: [
    {
      title: 'NEET Coaching in Ghaziabad',
      links: [
        { label: 'Best NEET Coaching Ghaziabad', href: '/best-neet-coaching-ghaziabad' },
        { label: 'NEET Coaching Ghaziabad', href: '/neet-coaching-ghaziabad' },
        { label: 'Biology Tutor Ghaziabad', href: '/biology-tutor-ghaziabad' },
        { label: 'Biology Classes Ghaziabad', href: '/biology-classes-ghaziabad' },
      ],
    },
    {
      title: 'Nearby Centers',
      links: [
        { label: 'Ghaziabad Center', href: '/locations/ghaziabad' },
        { label: 'Noida', href: '/best-neet-coaching-noida' },
        { label: 'Delhi', href: '/best-neet-coaching' },
        { label: 'All Locations', href: '/all-locations' },
      ],
    },
  ],
  faridabad: [
    {
      title: 'NEET Coaching in Faridabad',
      links: [
        { label: 'Best NEET Coaching Faridabad', href: '/best-neet-coaching-faridabad' },
        { label: 'NEET Coaching Faridabad', href: '/neet-coaching-faridabad' },
        { label: 'Biology Tutor Faridabad', href: '/biology-tutor-faridabad' },
        { label: 'Biology Classes Faridabad', href: '/biology-classes-faridabad' },
      ],
    },
    {
      title: 'Nearby Centers',
      links: [
        { label: 'Faridabad Center', href: '/locations/faridabad' },
        { label: 'South Delhi', href: '/neet-coaching-south-delhi' },
        { label: 'Greater Noida', href: '/best-neet-coaching-greater-noida' },
        { label: 'All Locations', href: '/all-locations' },
      ],
    },
  ],
  gurugram: [
    {
      title: 'NEET Coaching in Gurugram',
      links: [
        { label: 'Best NEET Coaching Gurugram', href: '/best-neet-coaching-gurugram' },
        { label: 'NEET Coaching Gurgaon', href: '/neet-coaching-gurgaon' },
        { label: 'Biology Tutor Gurugram', href: '/biology-tutor-gurugram' },
        { label: 'Biology Classes Gurgaon', href: '/biology-classes-gurgaon' },
      ],
    },
    {
      title: 'Nearby Centers',
      links: [
        { label: 'Gurugram Center', href: '/locations/gurugram' },
        { label: 'South Delhi', href: '/neet-coaching-south-delhi' },
        { label: 'Faridabad', href: '/best-neet-coaching-faridabad' },
        { label: 'All Locations', href: '/all-locations' },
      ],
    },
  ],
  'greater-noida': [
    {
      title: 'NEET Coaching in Greater Noida',
      links: [
        { label: 'Best NEET Coaching Greater Noida', href: '/best-neet-coaching-greater-noida' },
        { label: 'Biology Tutor Noida', href: '/biology-tutor-noida' },
        { label: 'Biology Classes Greater Noida', href: '/biology-classes-greater-noida' },
      ],
    },
    {
      title: 'Nearby Centers',
      links: [
        { label: 'Noida Center', href: '/locations/noida' },
        { label: 'Noida Coaching', href: '/best-neet-coaching-noida' },
        { label: 'Ghaziabad', href: '/best-neet-coaching-ghaziabad' },
        { label: 'All Locations', href: '/all-locations' },
      ],
    },
  ],
  'south-delhi': [
    {
      title: 'NEET Coaching in South Delhi',
      links: [
        { label: 'NEET Coaching South Delhi', href: '/neet-coaching-south-delhi' },
        { label: 'Biology Tutor South Delhi', href: '/biology-tutor-south-delhi' },
        { label: 'Biology Classes South Delhi', href: '/biology-classes-south-delhi' },
        { label: 'Best NEET Coaching Delhi', href: '/best-neet-coaching' },
      ],
    },
    {
      title: 'Centers Near South Delhi',
      links: [
        { label: 'South Extension (Flagship)', href: '/locations/south-extension' },
        { label: 'Green Park', href: '/locations/green-park' },
        { label: 'Greater Kailash', href: '/locations/greater-kailash' },
        { label: 'All Locations', href: '/all-locations' },
      ],
    },
  ],
}

const DEFAULT_CROSS_LINKS: CrossLinkGroup[] = [
  {
    title: 'NEET Coaching Near You',
    links: [
      { label: 'Best NEET Coaching India', href: '/best-neet-coaching-india' },
      { label: 'NEET Coaching Delhi NCR', href: '/best-neet-coaching' },
      { label: 'Biology Tutor Near Me', href: '/biology-tutors-near-me' },
      { label: 'All Locations', href: '/all-locations' },
    ],
  },
  {
    title: 'Explore Courses',
    links: [
      { label: 'All Courses', href: '/courses' },
      { label: 'Class 11 NEET', href: '/courses/class-11' },
      { label: 'Class 12 NEET', href: '/courses/class-12' },
      { label: 'Book Free Demo', href: '/demo-booking' },
    ],
  },
]

export function LocalSEOCrossLinks({ cityName, citySlug, className = '' }: LocalSEOCrossLinksProps) {
  const groups = CITY_CROSS_LINKS[citySlug] || DEFAULT_CROSS_LINKS

  return (
    <section className={`py-10 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          More NEET Resources in {cityName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {groups.map((group) => (
            <div key={group.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-700 transition-colors group"
                    >
                      <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-green-600 group-hover:translate-x-0.5 transition-transform" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
