'use client'

import { useState } from 'react'

interface ColorSwatch {
  name: string
  tailwind: string
  hex: string
  usage: string
  count?: number
}

interface GradientSwatch {
  name: string
  classes: string
  usage: string
}

interface CombinationSwatch {
  name: string
  bgClass: string
  textClass: string
  borderClass?: string
  usage: string
}

// ===== INDIVIDUAL COLORS (most commonly used) =====

const grayColors: ColorSwatch[] = [
  {
    name: 'Gray 900',
    tailwind: 'bg-gray-900',
    hex: '#111827',
    usage: 'Primary headings, main text',
    count: 2759,
  },
  {
    name: 'Gray 800',
    tailwind: 'bg-gray-800',
    hex: '#1f2937',
    usage: 'Dark text, emphasis',
    count: 145,
  },
  {
    name: 'Gray 700',
    tailwind: 'bg-gray-700',
    hex: '#374151',
    usage: 'Subheadings, secondary text',
    count: 804,
  },
  {
    name: 'Gray 600',
    tailwind: 'bg-gray-600',
    hex: '#4b5563',
    usage: 'Body text, descriptions',
    count: 2434,
  },
  {
    name: 'Gray 500',
    tailwind: 'bg-gray-500',
    hex: '#6b7280',
    usage: 'Muted text, placeholders',
    count: 607,
  },
  {
    name: 'Gray 400',
    tailwind: 'bg-gray-400',
    hex: '#9ca3af',
    usage: 'Light text, icons',
    count: 198,
  },
  {
    name: 'Gray 300',
    tailwind: 'bg-gray-300',
    hex: '#d1d5db',
    usage: 'Borders, dividers',
    count: 252,
  },
  {
    name: 'Gray 200',
    tailwind: 'bg-gray-200',
    hex: '#e5e7eb',
    usage: 'Light borders, backgrounds',
    count: 371,
  },
  {
    name: 'Gray 100',
    tailwind: 'bg-gray-100',
    hex: '#f3f4f6',
    usage: 'Section backgrounds',
    count: 337,
  },
  {
    name: 'Gray 50',
    tailwind: 'bg-gray-50',
    hex: '#f9fafb',
    usage: 'Page backgrounds, cards',
    count: 749,
  },
]

const blueColors: ColorSwatch[] = [
  {
    name: 'Blue 900',
    tailwind: 'bg-blue-900',
    hex: '#1e3a8a',
    usage: 'Dark navy headers, hero sections',
    count: 18,
  },
  { name: 'Blue 800', tailwind: 'bg-blue-800', hex: '#1e40af', usage: 'Text emphasis', count: 82 },
  {
    name: 'Blue 700',
    tailwind: 'bg-blue-700',
    hex: '#1d4ed8',
    usage: 'Button backgrounds, links',
    count: 67,
  },
  {
    name: 'Blue 600',
    tailwind: 'bg-blue-600',
    hex: '#2563eb',
    usage: 'Primary buttons, CTAs, links',
    count: 578,
  },
  {
    name: 'Blue 500',
    tailwind: 'bg-blue-500',
    hex: '#3b82f6',
    usage: 'Hover states, accents',
    count: 75,
  },
  {
    name: 'Blue 100',
    tailwind: 'bg-blue-100',
    hex: '#dbeafe',
    usage: 'Light backgrounds, badges',
    count: 202,
  },
  {
    name: 'Blue 50',
    tailwind: 'bg-blue-50',
    hex: '#eff6ff',
    usage: 'Subtle backgrounds',
    count: 199,
  },
]

const greenColors: ColorSwatch[] = [
  {
    name: 'Green 800',
    tailwind: 'bg-green-800',
    hex: '#166534',
    usage: 'Success text on light bg',
    count: 109,
  },
  {
    name: 'Green 700',
    tailwind: 'bg-green-700',
    hex: '#15803d',
    usage: 'Success emphasis',
    count: 98,
  },
  {
    name: 'Green 600',
    tailwind: 'bg-green-600',
    hex: '#16a34a',
    usage: 'Success indicators, checkmarks',
    count: 512,
  },
  {
    name: 'Green 500',
    tailwind: 'bg-green-500',
    hex: '#22c55e',
    usage: 'Success buttons, icons',
    count: 179,
  },
  {
    name: 'Green 300',
    tailwind: 'bg-green-300',
    hex: '#86efac',
    usage: 'Light accents',
    count: 58,
  },
  {
    name: 'Green 100',
    tailwind: 'bg-green-100',
    hex: '#dcfce7',
    usage: 'Success backgrounds',
    count: 227,
  },
  {
    name: 'Green 50',
    tailwind: 'bg-green-50',
    hex: '#f0fdf4',
    usage: 'Subtle success bg',
    count: 128,
  },
]

const purpleColors: ColorSwatch[] = [
  {
    name: 'Purple 700',
    tailwind: 'bg-purple-700',
    hex: '#7c3aed',
    usage: 'Purple text emphasis',
    count: 61,
  },
  {
    name: 'Purple 600',
    tailwind: 'bg-purple-600',
    hex: '#9333ea',
    usage: 'Purple accents, badges',
    count: 333,
  },
  {
    name: 'Purple 500',
    tailwind: 'bg-purple-500',
    hex: '#a855f7',
    usage: 'Purple buttons, icons',
    count: 50,
  },
  {
    name: 'Purple 100',
    tailwind: 'bg-purple-100',
    hex: '#f3e8ff',
    usage: 'Purple backgrounds',
    count: 128,
  },
  {
    name: 'Purple 50',
    tailwind: 'bg-purple-50',
    hex: '#faf5ff',
    usage: 'Subtle purple bg',
    count: 86,
  },
]

const tealColors: ColorSwatch[] = [
  {
    name: 'Teal 700',
    tailwind: 'bg-teal-700',
    hex: '#0f766e',
    usage: 'Teal hover states',
    count: 28,
  },
  {
    name: 'Teal 600',
    tailwind: 'bg-teal-600',
    hex: '#0d9488',
    usage: 'Teal buttons, links',
    count: 152,
  },
  { name: 'Teal 500', tailwind: 'bg-teal-500', hex: '#14b8a6', usage: 'Teal accents', count: 28 },
  {
    name: 'Teal 400',
    tailwind: 'bg-teal-400',
    hex: '#2dd4bf',
    usage: 'Icons on dark bg',
    count: 20,
  },
  {
    name: 'Teal 100',
    tailwind: 'bg-teal-100',
    hex: '#ccfbf1',
    usage: 'Teal backgrounds',
    count: 51,
  },
  { name: 'Teal 50', tailwind: 'bg-teal-50', hex: '#f0fdfa', usage: 'Subtle teal bg', count: 55 },
]

const yellowColors: ColorSwatch[] = [
  {
    name: 'Yellow 800',
    tailwind: 'bg-yellow-800',
    hex: '#854d0e',
    usage: 'Warning text',
    count: 61,
  },
  {
    name: 'Yellow 600',
    tailwind: 'bg-yellow-600',
    hex: '#ca8a04',
    usage: 'Warning/gold text',
    count: 71,
  },
  {
    name: 'Yellow 500',
    tailwind: 'bg-yellow-500',
    hex: '#eab308',
    usage: 'Stars, ratings, buttons',
    count: 183,
  },
  {
    name: 'Yellow 400',
    tailwind: 'bg-yellow-400',
    hex: '#facc15',
    usage: 'Highlight accents',
    count: 175,
  },
  {
    name: 'Yellow 300',
    tailwind: 'bg-yellow-300',
    hex: '#fde047',
    usage: 'Stars, icons on dark',
    count: 333,
  },
  {
    name: 'Yellow 100',
    tailwind: 'bg-yellow-100',
    hex: '#fef9c3',
    usage: 'Warning backgrounds',
    count: 88,
  },
]

const orangeColors: ColorSwatch[] = [
  {
    name: 'Orange 600',
    tailwind: 'bg-orange-600',
    hex: '#ea580c',
    usage: 'Orange accents, CTAs',
    count: 199,
  },
  {
    name: 'Orange 500',
    tailwind: 'bg-orange-500',
    hex: '#f97316',
    usage: 'Orange buttons',
    count: 34,
  },
  {
    name: 'Orange 100',
    tailwind: 'bg-orange-100',
    hex: '#ffedd5',
    usage: 'Orange backgrounds',
    count: 81,
  },
]

const redColors: ColorSwatch[] = [
  { name: 'Red 800', tailwind: 'bg-red-800', hex: '#991b1b', usage: 'Error text dark', count: 61 },
  { name: 'Red 700', tailwind: 'bg-red-700', hex: '#b91c1c', usage: 'Error emphasis', count: 57 },
  {
    name: 'Red 600',
    tailwind: 'bg-red-600',
    hex: '#dc2626',
    usage: 'Error indicators, alerts',
    count: 177,
  },
  {
    name: 'Red 500',
    tailwind: 'bg-red-500',
    hex: '#ef4444',
    usage: 'Error icons, badges',
    count: 20,
  },
  {
    name: 'Red 100',
    tailwind: 'bg-red-100',
    hex: '#fee2e2',
    usage: 'Error backgrounds',
    count: 95,
  },
  { name: 'Red 50', tailwind: 'bg-red-50', hex: '#fef2f2', usage: 'Subtle error bg', count: 64 },
]

const indigoColors: ColorSwatch[] = [
  {
    name: 'Indigo 700',
    tailwind: 'bg-indigo-700',
    hex: '#4338ca',
    usage: 'Indigo hover',
    count: 18,
  },
  {
    name: 'Indigo 600',
    tailwind: 'bg-indigo-600',
    hex: '#4f46e5',
    usage: 'Indigo accents',
    count: 105,
  },
  {
    name: 'Indigo 500',
    tailwind: 'bg-indigo-500',
    hex: '#6366f1',
    usage: 'Indigo buttons',
    count: 25,
  },
  {
    name: 'Indigo 50',
    tailwind: 'bg-indigo-50',
    hex: '#eef2ff',
    usage: 'Indigo backgrounds',
    count: 38,
  },
]

const emeraldColors: ColorSwatch[] = [
  {
    name: 'Emerald 600',
    tailwind: 'bg-emerald-600',
    hex: '#059669',
    usage: 'Emerald accents',
    count: 121,
  },
  {
    name: 'Emerald 500',
    tailwind: 'bg-emerald-500',
    hex: '#10b981',
    usage: 'Emerald buttons',
    count: 18,
  },
]

const slateColors: ColorSwatch[] = [
  {
    name: 'Slate 900',
    tailwind: 'bg-slate-900',
    hex: '#0f172a',
    usage: 'Hero sections (About page)',
    count: 10,
  },
  {
    name: 'Slate 800',
    tailwind: 'bg-slate-800',
    hex: '#1e293b',
    usage: 'Icon containers, cards',
    count: 15,
  },
  {
    name: 'Slate 700',
    tailwind: 'bg-slate-700',
    hex: '#334155',
    usage: 'Borders on dark',
    count: 5,
  },
]

const otherColors: ColorSwatch[] = [
  {
    name: 'Black',
    tailwind: 'bg-black',
    hex: '#000000',
    usage: 'Headings, maximum contrast',
    count: 50,
  },
  {
    name: 'White',
    tailwind: 'bg-white',
    hex: '#ffffff',
    usage: 'Card backgrounds, text on dark',
    count: 500,
  },
  { name: 'Cyan 600', tailwind: 'bg-cyan-600', hex: '#0891b2', usage: 'Cyan accents', count: 26 },
  { name: 'Pink 600', tailwind: 'bg-pink-600', hex: '#db2777', usage: 'Pink accents', count: 27 },
  { name: 'Pink 500', tailwind: 'bg-pink-500', hex: '#ec4899', usage: 'Pink buttons', count: 17 },
]

// ===== GRADIENTS =====

const gradients: GradientSwatch[] = [
  // Blue-Purple gradients (most common)
  {
    name: 'Blue to Purple',
    classes: 'bg-gradient-to-r from-blue-600 to-purple-600',
    usage: 'Primary CTA buttons, hero text, badges (132+ uses)',
  },
  {
    name: 'Blue to Indigo',
    classes: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    usage: 'Secondary buttons, icons (40+ uses)',
  },
  {
    name: 'Blue via Indigo to Purple',
    classes: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600',
    usage: 'Premium hero sections (33+ uses)',
  },
  {
    name: 'Purple to Pink',
    classes: 'bg-gradient-to-r from-purple-600 to-pink-600',
    usage: 'Premium badges, highlights (27+ uses)',
  },

  // Green gradients
  {
    name: 'Green to Teal',
    classes: 'bg-gradient-to-r from-green-600 to-teal-600',
    usage: 'Success states, biology-themed sections (47+ uses)',
  },
  {
    name: 'Green to Emerald',
    classes: 'bg-gradient-to-r from-green-600 to-emerald-600',
    usage: 'Nature/bio themed elements (35+ uses)',
  },
  {
    name: 'Emerald to Teal',
    classes: 'bg-gradient-to-r from-emerald-600 to-teal-600',
    usage: 'Biology topic cards (30+ uses)',
  },

  // Teal gradients
  {
    name: 'Teal to Blue',
    classes: 'bg-gradient-to-r from-teal-600 to-blue-600',
    usage: 'Teal-themed sections (37+ uses)',
  },
  {
    name: 'Teal 600 to 700',
    classes: 'bg-gradient-to-r from-teal-600 to-teal-700',
    usage: 'Monochromatic teal buttons (28+ uses)',
  },

  // Orange gradients
  {
    name: 'Orange to Red',
    classes: 'bg-gradient-to-r from-orange-500 to-red-500',
    usage: 'Urgent CTAs, limited offers (34+ uses)',
  },
  {
    name: 'Orange to Yellow',
    classes: 'bg-gradient-to-r from-orange-500 to-yellow-500',
    usage: 'Highlight sections (20+ uses)',
  },

  // Light background gradients
  {
    name: 'Blue 50 to Purple 50',
    classes: 'bg-gradient-to-br from-blue-50 to-purple-50',
    usage: 'Card backgrounds, sections (129+ uses)',
  },
  {
    name: 'Green 50 to Teal 50',
    classes: 'bg-gradient-to-br from-green-50 to-teal-50',
    usage: 'Bio-themed section backgrounds (46+ uses)',
  },
  {
    name: 'Purple 50 to Pink 50',
    classes: 'bg-gradient-to-br from-purple-50 to-pink-50',
    usage: 'Premium section backgrounds (42+ uses)',
  },
  {
    name: 'Gray 50 to White',
    classes: 'bg-gradient-to-b from-gray-50 to-white',
    usage: 'Page sections (20+ uses)',
  },

  // Dark gradients
  {
    name: 'Slate 900 to 800',
    classes: 'bg-gradient-to-br from-slate-900 to-slate-800',
    usage: 'About page hero, dark sections',
  },
  {
    name: 'Blue 900 to Purple 900',
    classes: 'bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900',
    usage: 'Legacy hero sections (being replaced)',
  },
]

// ===== COLOR COMBINATIONS =====

const combinations: CombinationSwatch[] = [
  {
    name: 'Primary Card',
    bgClass: 'bg-white',
    textClass: 'text-gray-900',
    borderClass: 'border border-gray-200',
    usage: 'Standard content cards',
  },
  {
    name: 'Blue Accent Card',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-800',
    borderClass: 'border border-blue-200',
    usage: 'Info cards, feature highlights',
  },
  {
    name: 'Green Success Card',
    bgClass: 'bg-green-50',
    textClass: 'text-green-800',
    borderClass: 'border border-green-200',
    usage: 'Success messages, achievements',
  },
  {
    name: 'Purple Premium Card',
    bgClass: 'bg-purple-50',
    textClass: 'text-purple-800',
    borderClass: 'border border-purple-200',
    usage: 'Premium features, highlights',
  },
  {
    name: 'Yellow Warning Card',
    bgClass: 'bg-yellow-50',
    textClass: 'text-yellow-800',
    borderClass: 'border border-yellow-200',
    usage: 'Warning messages, tips',
  },
  {
    name: 'Red Error Card',
    bgClass: 'bg-red-50',
    textClass: 'text-red-800',
    borderClass: 'border border-red-200',
    usage: 'Error messages, alerts',
  },
  {
    name: 'Teal Info Card',
    bgClass: 'bg-teal-50',
    textClass: 'text-teal-800',
    borderClass: 'border border-teal-200',
    usage: 'Bio-themed info cards',
  },
  {
    name: 'Gray Section',
    bgClass: 'bg-gray-50',
    textClass: 'text-gray-700',
    borderClass: 'border border-gray-100',
    usage: 'Alternating sections',
  },
  {
    name: 'Dark Hero',
    bgClass: 'bg-slate-900',
    textClass: 'text-white',
    borderClass: '',
    usage: 'Hero sections, footers',
  },
]

const colorCategories = [
  { name: 'Gray Scale (Most Used)', colors: grayColors },
  { name: 'Blue Scale', colors: blueColors },
  { name: 'Green Scale', colors: greenColors },
  { name: 'Purple Scale', colors: purpleColors },
  { name: 'Teal Scale', colors: tealColors },
  { name: 'Yellow/Gold Scale', colors: yellowColors },
  { name: 'Orange Scale', colors: orangeColors },
  { name: 'Red Scale', colors: redColors },
  { name: 'Indigo Scale', colors: indigoColors },
  { name: 'Emerald Scale', colors: emeraldColors },
  { name: 'Slate Scale (Design System)', colors: slateColors },
  { name: 'Other Colors', colors: otherColors },
]

export default function ColorPalettePage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'colors' | 'gradients' | 'combinations'>('colors')

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(name)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Complete Website Color Palette
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            All colors, gradients, and combinations used across the website. Click any swatch to
            copy. Tell me which ones you love and which to replace!
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('colors')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'colors'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Individual Colors ({colorCategories.reduce((acc, cat) => acc + cat.colors.length, 0)})
          </button>
          <button
            onClick={() => setActiveTab('gradients')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'gradients'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Gradients ({gradients.length})
          </button>
          <button
            onClick={() => setActiveTab('combinations')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'combinations'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Combinations ({combinations.length})
          </button>
        </div>

        {/* Individual Colors Tab */}
        {activeTab === 'colors' && (
          <div className="space-y-12">
            {colorCategories.map((category) => (
              <div key={category.name}>
                <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">
                  {category.name}
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {category.colors.map((color) => (
                    <div
                      key={color.name}
                      className="flex flex-col items-center group cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => copyToClipboard(color.hex, color.name)}
                    >
                      {/* Color Swatch - 1x1 cm */}
                      <div
                        className="w-[40px] h-[40px] rounded-lg shadow-md border border-gray-300 mb-2 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: color.hex }}
                        title={`Click to copy: ${color.hex}`}
                      />
                      {/* Color Name */}
                      <p className="text-xs font-semibold text-black text-center leading-tight">
                        {color.name}
                      </p>
                      {/* Hex Code */}
                      <p className="text-[10px] text-gray-500 font-mono">
                        {copiedColor === color.name ? 'Copied!' : color.hex}
                      </p>
                      {/* Usage count */}
                      {color.count && (
                        <p className="text-[10px] text-blue-600 font-medium">{color.count}x used</p>
                      )}
                      {/* Usage description */}
                      <p className="text-[10px] text-gray-500 text-center leading-tight mt-1 max-w-[100px]">
                        {color.usage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gradients Tab */}
        {activeTab === 'gradients' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-black mb-4">All Gradients Used</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gradients.map((gradient) => (
                <div
                  key={gradient.name}
                  className="rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => copyToClipboard(gradient.classes, gradient.name)}
                >
                  {/* Gradient Preview */}
                  <div className={`h-20 ${gradient.classes}`} />
                  {/* Info */}
                  <div className="p-4 bg-white border-t">
                    <p className="font-bold text-black">{gradient.name}</p>
                    <p className="text-xs text-gray-500 font-mono mt-1">
                      {copiedColor === gradient.name ? 'Copied!' : gradient.classes}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">{gradient.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Combinations Tab */}
        {activeTab === 'combinations' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-black mb-4">Color Combinations</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {combinations.map((combo) => (
                <div
                  key={combo.name}
                  className={`rounded-xl p-6 ${combo.bgClass} ${combo.borderClass} shadow-md`}
                >
                  <h3 className={`text-lg font-bold ${combo.textClass}`}>{combo.name}</h3>
                  <p className={`text-sm mt-2 ${combo.textClass} opacity-80`}>{combo.usage}</p>
                  <div className="mt-4 space-y-1">
                    <p className="text-xs font-mono opacity-70">BG: {combo.bgClass}</p>
                    <p className="text-xs font-mono opacity-70">Text: {combo.textClass}</p>
                    {combo.borderClass && (
                      <p className="text-xs font-mono opacity-70">Border: {combo.borderClass}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Examples Section */}
        <div className="mt-16 border-t-2 border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-black mb-8">Live Button Examples</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold">
              Blue-Purple Gradient
            </button>
            <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold">
              Green-Teal Gradient
            </button>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold">
              Orange-Red Gradient
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
              Solid Blue 600
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold">
              Solid Teal 600
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
              Solid Green 600
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold">
              Solid Yellow 500
            </button>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold">
              Solid Gray 900
            </button>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-black mb-6">Color Usage Statistics</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-3xl font-bold text-blue-600">2759</p>
              <p className="text-gray-600">Gray text uses</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-3xl font-bold text-purple-600">132</p>
              <p className="text-gray-600">Blue-Purple gradients</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-3xl font-bold text-green-600">512</p>
              <p className="text-gray-600">Green accent uses</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-3xl font-bold text-yellow-600">333</p>
              <p className="text-gray-600">Yellow/Gold uses</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-black mb-4">How to Give Feedback</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              • <strong>Love a color?</strong> Tell me and I&apos;ll use it more across the site
            </li>
            <li>
              • <strong>Don&apos;t like a color?</strong> Tell me what to replace it with
            </li>
            <li>
              • <strong>Example:</strong> &quot;I love the Green-Teal gradient, use it instead of
              Blue-Purple&quot;
            </li>
            <li>
              • <strong>Example:</strong> &quot;Replace all Gray-900 text with Black&quot;
            </li>
            <li>• Click any swatch to copy its value for reference</li>
          </ul>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Temporary page for design review. Will be removed after color decisions are finalized.
          </p>
        </div>
      </div>
    </div>
  )
}
