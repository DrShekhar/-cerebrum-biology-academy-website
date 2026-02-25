import Link from 'next/link'

const CENTERS = [
  {
    name: 'South Extension',
    slug: 'south-extension',
    label: 'Flagship Center',
    city: 'New Delhi',
  },
  { name: 'Rohini', slug: 'rohini', label: 'North Delhi', city: 'New Delhi' },
  { name: 'Gurugram', slug: 'gurugram', label: 'Haryana', city: 'Gurugram' },
  { name: 'Faridabad', slug: 'faridabad', label: 'Haryana', city: 'Faridabad' },
  { name: 'Noida', slug: 'noida', label: 'Sector 62', city: 'Noida' },
  { name: 'Ghaziabad', slug: 'ghaziabad', label: 'Online + Hybrid', city: 'Ghaziabad' },
]

const POPULAR_COURSES = [
  { name: 'Class 11 NEET Biology', slug: 'class-11' },
  { name: 'Class 12 NEET Biology', slug: 'class-12' },
  { name: 'NEET Dropper Batch', slug: 'neet-dropper' },
  { name: 'Foundation (Class 9-10)', slug: 'foundation' },
  { name: 'Intensive NEET Biology', slug: 'intensive-neet-biology' },
  { name: 'NEET Complete Program', slug: 'neet-complete' },
]

export function VisitOurCenters({ className = '' }: { className?: string }) {
  return (
    <section className={`py-10 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Visit Our Centers</h2>
        <p className="text-sm text-gray-600 mb-5">
          Attend classes at any of our 6 Delhi-NCR centers with AIIMS faculty
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CENTERS.map((center) => (
            <Link
              key={center.slug}
              href={`/locations/${center.slug}`}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:border-green-500 hover:shadow-md transition-all text-center"
            >
              <span className="block font-semibold text-gray-900 text-sm">
                {center.name}
              </span>
              <span className="block text-xs text-gray-500 mt-1">{center.label}</span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link
            href="/locations"
            className="text-sm text-green-700 hover:text-green-800 font-medium hover:underline"
          >
            View all center locations &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}

export function ExploreCourses({ className = '' }: { className?: string }) {
  return (
    <section className={`py-10 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Explore NEET Biology Courses
        </h2>
        <p className="text-sm text-gray-600 mb-5">
          Programs for Class 9 to Dropper level — AIIMS faculty, small batches, proven results
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {POPULAR_COURSES.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
            >
              <span className="block font-semibold text-gray-900 text-sm">
                {course.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link
            href="/courses"
            className="text-sm text-blue-700 hover:text-blue-800 font-medium hover:underline"
          >
            View all courses &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
