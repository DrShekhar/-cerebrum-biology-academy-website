'use client'

import { useState } from 'react'

interface ColorSwatch {
  name: string
  tailwind: string
  hex: string
  usage: string
  category: string
}

const colors: ColorSwatch[] = [
  // Primary - Slate/Navy (used for backgrounds, text)
  {
    name: 'Slate 950',
    tailwind: 'bg-slate-950',
    hex: '#020617',
    usage: 'Darkest backgrounds, footer',
    category: 'Slate/Navy',
  },
  {
    name: 'Slate 900',
    tailwind: 'bg-slate-900',
    hex: '#0f172a',
    usage: 'Hero sections, dark backgrounds, gradients',
    category: 'Slate/Navy',
  },
  {
    name: 'Slate 800',
    tailwind: 'bg-slate-800',
    hex: '#1e293b',
    usage: 'Icon containers, cards, gradient endpoints',
    category: 'Slate/Navy',
  },
  {
    name: 'Slate 700',
    tailwind: 'bg-slate-700',
    hex: '#334155',
    usage: 'Borders on dark backgrounds',
    category: 'Slate/Navy',
  },
  {
    name: 'Slate 600',
    tailwind: 'bg-slate-600',
    hex: '#475569',
    usage: 'Secondary text on light backgrounds',
    category: 'Slate/Navy',
  },
  {
    name: 'Slate 500',
    tailwind: 'bg-slate-500',
    hex: '#64748b',
    usage: 'Muted text, placeholders',
    category: 'Slate/Navy',
  },

  // Teal - Accent color (CTAs, links, highlights)
  {
    name: 'Teal 700',
    tailwind: 'bg-teal-700',
    hex: '#0f766e',
    usage: 'Button hover states, strong accents',
    category: 'Teal (Accent)',
  },
  {
    name: 'Teal 600',
    tailwind: 'bg-teal-600',
    hex: '#0d9488',
    usage: 'Primary CTA buttons, links, active states',
    category: 'Teal (Accent)',
  },
  {
    name: 'Teal 500',
    tailwind: 'bg-teal-500',
    hex: '#14b8a6',
    usage: 'Hover highlights, progress indicators',
    category: 'Teal (Accent)',
  },
  {
    name: 'Teal 400',
    tailwind: 'bg-teal-400',
    hex: '#2dd4bf',
    usage: 'Icons on dark backgrounds, bright accents',
    category: 'Teal (Accent)',
  },
  {
    name: 'Teal 300',
    tailwind: 'bg-teal-300',
    hex: '#5eead4',
    usage: 'Hover borders, light accents',
    category: 'Teal (Accent)',
  },
  {
    name: 'Teal 100',
    tailwind: 'bg-teal-100',
    hex: '#ccfbf1',
    usage: 'Light background highlights',
    category: 'Teal (Accent)',
  },
  {
    name: 'Teal 50',
    tailwind: 'bg-teal-50',
    hex: '#f0fdfa',
    usage: 'Card hover overlays, subtle backgrounds',
    category: 'Teal (Accent)',
  },

  // Gold - Achievement color (badges, premium)
  {
    name: 'Gold 700',
    tailwind: 'bg-amber-700',
    hex: '#b45309',
    usage: 'Achievement text, premium indicators',
    category: 'Gold (Achievement)',
  },
  {
    name: 'Gold 600',
    tailwind: 'bg-amber-600',
    hex: '#d97706',
    usage: 'Achievement badges, premium buttons',
    category: 'Gold (Achievement)',
  },
  {
    name: 'Gold 500',
    tailwind: 'bg-amber-500',
    hex: '#f59e0b',
    usage: 'Bright gold accents, stars',
    category: 'Gold (Achievement)',
  },
  {
    name: 'Gold 400',
    tailwind: 'bg-amber-400',
    hex: '#fbbf24',
    usage: 'Achievement highlights',
    category: 'Gold (Achievement)',
  },
  {
    name: 'Gold 200',
    tailwind: 'bg-amber-200',
    hex: '#fde68a',
    usage: 'Achievement card borders',
    category: 'Gold (Achievement)',
  },
  {
    name: 'Gold 50',
    tailwind: 'bg-amber-50',
    hex: '#fffbeb',
    usage: 'Achievement card backgrounds',
    category: 'Gold (Achievement)',
  },

  // Gray - Neutral (borders, backgrounds)
  {
    name: 'Gray 200',
    tailwind: 'bg-gray-200',
    hex: '#e5e7eb',
    usage: 'Card borders, dividers',
    category: 'Gray (Neutral)',
  },
  {
    name: 'Gray 100',
    tailwind: 'bg-gray-100',
    hex: '#f3f4f6',
    usage: 'Section backgrounds, alternating rows',
    category: 'Gray (Neutral)',
  },
  {
    name: 'Gray 50',
    tailwind: 'bg-gray-50',
    hex: '#f9fafb',
    usage: 'Page backgrounds, subtle sections',
    category: 'Gray (Neutral)',
  },

  // Text Colors
  {
    name: 'Black',
    tailwind: 'bg-black',
    hex: '#000000',
    usage: 'All headings (h1, h2, h3)',
    category: 'Text',
  },
  {
    name: 'White',
    tailwind: 'bg-white',
    hex: '#ffffff',
    usage: 'Text on dark backgrounds, card backgrounds',
    category: 'Text',
  },
]

const categories = ['Slate/Navy', 'Teal (Accent)', 'Gold (Achievement)', 'Gray (Neutral)', 'Text']

export default function ColorPalettePage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(name)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Cerebrum Biology Academy - Color Palette
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            These are all the colors currently used across the website. Click on any color to copy
            its hex code. Tell me which colors you love and which ones you want to replace!
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-gray-200 pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {colors
                .filter((color) => color.category === category)
                .map((color) => (
                  <div
                    key={color.name}
                    className="flex flex-col items-center group cursor-pointer"
                    onClick={() => copyToClipboard(color.hex, color.name)}
                  >
                    {/* Color Swatch - approximately 1x1 cm (38px) */}
                    <div
                      className={`w-[38px] h-[38px] rounded-lg shadow-md border border-gray-300 mb-3 transition-transform group-hover:scale-110 ${color.tailwind}`}
                      style={{ backgroundColor: color.hex }}
                      title={`Click to copy: ${color.hex}`}
                    />

                    {/* Color Name */}
                    <p className="text-sm font-semibold text-black text-center">{color.name}</p>

                    {/* Hex Code */}
                    <p className="text-xs text-slate-500 font-mono mb-2">
                      {copiedColor === color.name ? 'Copied!' : color.hex}
                    </p>

                    {/* Usage */}
                    <p className="text-xs text-slate-600 text-center leading-tight">
                      {color.usage}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Current Usage Examples */}
        <div className="mt-16 border-t-2 border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-black mb-8">Live Examples of Color Usage</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Hero Section Example */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
                <h3 className="text-xl font-bold mb-2">Hero Section Style</h3>
                <p className="text-slate-300 text-sm">Slate 900 to Slate 800 gradient</p>
              </div>
            </div>

            {/* CTA Button Example */}
            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-4">
              <h3 className="text-lg font-bold text-black">CTA Buttons</h3>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Teal 600 Button
              </button>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Gold 600 Button (Premium)
              </button>
            </div>

            {/* Card Example */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-teal-300 transition-all">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4">
                <span className="text-teal-400 text-xl">★</span>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Card Style</h3>
              <p className="text-slate-600 text-sm">
                White background, gray-200 border, slate-800 icon container
              </p>
            </div>

            {/* Achievement Badge Example */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">🏆</span>
                </div>
                <span className="text-amber-700 font-bold text-lg">Achievement Style</span>
              </div>
              <p className="text-amber-800 text-sm">
                Gold 50 background, Gold 200 border, Gold 700 text
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-16 bg-teal-50 border border-teal-200 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-black mb-4">How to Give Feedback</h2>
          <ul className="space-y-2 text-slate-700">
            <li>
              • <strong>Love a color?</strong> Tell me and I&apos;ll use it more across the site
            </li>
            <li>
              • <strong>Don&apos;t like a color?</strong> Tell me what to replace it with
            </li>
            <li>
              • <strong>Example:</strong> &quot;Replace Slate 800 with a darker navy&quot; or
              &quot;I love Teal 500, use it more&quot;
            </li>
            <li>• Click any swatch to copy its hex code for reference</li>
          </ul>
        </div>

        {/* Note about temporary page */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>
            This is a temporary page for design review. It will be removed after color decisions are
            finalized.
          </p>
        </div>
      </div>
    </div>
  )
}
