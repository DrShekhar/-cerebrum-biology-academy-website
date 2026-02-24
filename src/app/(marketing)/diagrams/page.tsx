import { Metadata } from 'next'
import { RootMeristem } from '@/components/diagrams/biology/RootMeristem'
import { PlantTissues } from '@/components/diagrams/biology/PlantTissues'
import { StemCrossSection } from '@/components/diagrams/biology/StemCrossSection'

export const metadata: Metadata = {
  title: 'Interactive Biology Diagrams',
  description:
    'Explore interactive NCERT-style biology diagrams for NEET preparation. Learn plant anatomy, tissue types, and stem cross-sections with our visual learning tools.',
}

export default function DiagramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Interactive Biology Diagrams</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            NCERT-style diagrams with interactive labels for effective NEET Biology preparation.
            Click on any part to learn more.
          </p>
        </div>
      </section>

      {/* Diagrams Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Root Meristem */}
          <div>
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-2">
                Plant Anatomy
              </span>
              <h2 className="text-3xl font-bold text-gray-900">Root Apical Meristem</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                The root apical meristem is the region of rapidly dividing cells at the root tip,
                responsible for root growth and development.
              </p>
            </div>
            <div className="flex justify-center">
              <RootMeristem width={500} height={600} interactive showLabels />
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Plant Tissues */}
          <div>
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-2">
                Simple Tissues
              </span>
              <h2 className="text-3xl font-bold text-gray-900">Collenchyma & Sclerenchyma</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                Compare the structural differences between collenchyma (flexible support) and
                sclerenchyma (rigid support) tissues.
              </p>
            </div>
            <div className="flex justify-center overflow-x-auto">
              <PlantTissues width={800} height={450} interactive showLabels />
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Stem Cross Section */}
          <div>
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-2">
                Comparative Anatomy
              </span>
              <h2 className="text-3xl font-bold text-gray-900">Dicot vs Monocot Stem</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                Compare the internal structure of dicot and monocot stems. Note the arrangement of
                vascular bundles - ring vs scattered pattern.
              </p>
            </div>
            <div className="flex justify-center overflow-x-auto">
              <StemCrossSection width={900} height={500} interactive showLabels stemType="both" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Features of Our Diagrams
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Labels</h3>
              <p className="text-gray-600">
                Click on any part of the diagram to learn more about its structure and function.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">NCERT Aligned</h3>
              <p className="text-gray-600">
                Diagrams follow NCERT textbook style for consistent NEET exam preparation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Animated Transitions</h3>
              <p className="text-gray-600">
                Smooth animations help visualize complex biological structures step by step.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
