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

interface GradientReplacement {
  gradientName: string
  gradientClasses: string
  solidName: string
  solidClass: string
  solidHex: string
  usage: string
}

// ===== COLOR FIXES (Unapproved → Approved) =====

interface ColorFix {
  unapproved: {
    name: string
    hex: string
    tailwind: string
  }
  approved: {
    name: string
    hex: string
    tailwind: string
  }
  affectedElements: string[]
  fileCount: number
}

interface ColorFixCategory {
  name: string
  description: string
  fixes: ColorFix[]
}

// ===== APPROVED REPLACEMENT COLORS ONLY =====
// Cerebrum Green (#4a5d4a), Blue 600 (#2563eb), Google Red (#ea4335)
// Orange 600 (#ea580c), Orange 500 (#f97316)
// Yellow 800 (#854d0e), Yellow 600 (#ca8a04), Yellow 500 (#eab308)
// Gray 700 (#374151), Gray 600 (#4b5563)
// Indigo 500 (#6366f1), Purple 700 (#7c3aed)
// Green 500 (#22c55e), Teal 600 (#0d9488)

const colorFixCategories: ColorFixCategory[] = [
  {
    name: 'Amber → Orange/Yellow',
    description: 'Replace amber with Orange 500/600 or Yellow 500/600/800',
    fixes: [
      {
        unapproved: { name: 'Amber 50-300', hex: '#fcd34d', tailwind: 'bg-amber-50/100/200/300' },
        approved: { name: 'Yellow 500', hex: '#eab308', tailwind: 'bg-yellow-500' },
        affectedElements: ['Badge backgrounds', 'Card backgrounds', 'Hero subtitles'],
        fileCount: 18,
      },
      {
        unapproved: { name: 'Amber 400-500', hex: '#f59e0b', tailwind: 'bg-amber-400/500' },
        approved: { name: 'Orange 500', hex: '#f97316', tailwind: 'bg-orange-500' },
        affectedElements: ['CTA buttons', 'Stat card icons', 'Tier badges'],
        fileCount: 20,
      },
      {
        unapproved: { name: 'Amber 600', hex: '#d97706', tailwind: 'text-amber-600' },
        approved: { name: 'Orange 600', hex: '#ea580c', tailwind: 'text-orange-600' },
        affectedElements: ['Icon colors', 'Experience badge icons'],
        fileCount: 3,
      },
      {
        unapproved: { name: 'Amber 700-900', hex: '#92400e', tailwind: 'bg-amber-700/800/900' },
        approved: { name: 'Yellow 800', hex: '#854d0e', tailwind: 'bg-yellow-800' },
        affectedElements: ['Badge text', 'Dark backgrounds'],
        fileCount: 7,
      },
    ],
  },
  {
    name: 'Cyan → Blue 600 / Teal 600',
    description: 'Replace ALL cyan shades with Blue 600 or Teal 600',
    fixes: [
      {
        unapproved: { name: 'Cyan (any shade)', hex: '#06b6d4', tailwind: 'bg-cyan-*' },
        approved: { name: 'Blue 600', hex: '#2563eb', tailwind: 'bg-blue-600' },
        affectedElements: ['Buttons', 'Links', 'Icons', 'Gradients'],
        fileCount: 15,
      },
      {
        unapproved: { name: 'Cyan (bio-themed)', hex: '#06b6d4', tailwind: 'bg-cyan-*' },
        approved: { name: 'Teal 600', hex: '#0d9488', tailwind: 'bg-teal-600' },
        affectedElements: ['Biology sections', 'Science features'],
        fileCount: 6,
      },
    ],
  },
  {
    name: 'Pink → Purple 700 / Indigo 500',
    description: 'Replace ALL pink shades with Purple 700 or Indigo 500',
    fixes: [
      {
        unapproved: { name: 'Pink (any shade)', hex: '#ec4899', tailwind: 'bg-pink-*' },
        approved: { name: 'Purple 700', hex: '#7c3aed', tailwind: 'bg-purple-700' },
        affectedElements: ['Premium badges', 'CTA sections', 'Highlights'],
        fileCount: 25,
      },
      {
        unapproved: { name: 'Pink (lighter use)', hex: '#fdf2f8', tailwind: 'bg-pink-50/100' },
        approved: { name: 'Indigo 500', hex: '#6366f1', tailwind: 'bg-indigo-500' },
        affectedElements: ['Card backgrounds', 'Gradient endpoints'],
        fileCount: 18,
      },
    ],
  },
  {
    name: 'Violet/Fuchsia → Purple 700',
    description: 'Replace violet and fuchsia with Purple 700',
    fixes: [
      {
        unapproved: { name: 'Violet (any shade)', hex: '#8b5cf6', tailwind: 'bg-violet-*' },
        approved: { name: 'Purple 700', hex: '#7c3aed', tailwind: 'bg-purple-700' },
        affectedElements: ['Feature cards', 'Badges', 'Icons'],
        fileCount: 20,
      },
      {
        unapproved: { name: 'Fuchsia (any shade)', hex: '#d946ef', tailwind: 'bg-fuchsia-*' },
        approved: { name: 'Purple 700', hex: '#7c3aed', tailwind: 'bg-purple-700' },
        affectedElements: ['AI sections', 'Premium features'],
        fileCount: 2,
      },
    ],
  },
  {
    name: 'Emerald → Green 500 / Teal 600',
    description: 'Replace emerald with Green 500 or Teal 600',
    fixes: [
      {
        unapproved: { name: 'Emerald (any shade)', hex: '#10b981', tailwind: 'bg-emerald-*' },
        approved: { name: 'Green 500', hex: '#22c55e', tailwind: 'bg-green-500' },
        affectedElements: ['Success states', 'Bio features'],
        fileCount: 1,
      },
      {
        unapproved: { name: 'Emerald (darker use)', hex: '#059669', tailwind: 'bg-emerald-600' },
        approved: { name: 'Teal 600', hex: '#0d9488', tailwind: 'bg-teal-600' },
        affectedElements: ['Biology themed sections'],
        fileCount: 1,
      },
    ],
  },
]

// ===== FAVORITE COLORS (From Screenshots) =====

interface FavoriteColor {
  name: string
  hex: string
  tailwind: string
  usage: string
  family: string
}

// Color family definitions for grouping
const colorFamilies = [
  { id: 'brand', label: 'Brand Colors' },
  { id: 'gray', label: 'Gray Scale' },
  { id: 'slate', label: 'Slate Scale' },
  { id: 'blue', label: 'Blue Scale' },
  { id: 'indigo', label: 'Indigo Scale' },
  { id: 'purple', label: 'Purple Scale' },
  { id: 'green', label: 'Green Scale' },
  { id: 'teal', label: 'Teal / Emerald' },
  { id: 'red', label: 'Red Scale' },
  { id: 'orange', label: 'Orange Scale' },
  { id: 'yellow', label: 'Yellow Scale' },
  { id: 'gradient', label: 'Allowed Gradients' },
]

const favoriteColors: FavoriteColor[] = [
  // ===== CEREBRUM BRAND COLORS =====
  {
    name: 'Cerebrum Green',
    hex: '#4a5d4a',
    tailwind: 'bg-[#4a5d4a]',
    usage: 'Primary brand',
    family: 'brand',
  },
  {
    name: 'Cerebrum Dark',
    hex: '#3d4d3d',
    tailwind: 'bg-[#3d4d3d]',
    usage: 'Hover states',
    family: 'brand',
  },
  {
    name: 'Cerebrum Light',
    hex: '#5a6d5a',
    tailwind: 'bg-[#5a6d5a]',
    usage: 'Secondary',
    family: 'brand',
  },
  {
    name: 'Cerebrum V.Light',
    hex: '#e8ede8',
    tailwind: 'bg-[#e8ede8]',
    usage: 'Backgrounds',
    family: 'brand',
  },

  // ===== GRAY SCALE =====
  { name: 'Gray 900', hex: '#111827', tailwind: 'bg-gray-900', usage: 'Headings', family: 'gray' },
  { name: 'Gray 800', hex: '#1f2937', tailwind: 'bg-gray-800', usage: 'Dark text', family: 'gray' },
  {
    name: 'Gray 700',
    hex: '#374151',
    tailwind: 'bg-gray-700',
    usage: 'Subheadings',
    family: 'gray',
  },
  { name: 'Gray 600', hex: '#4b5563', tailwind: 'bg-gray-600', usage: 'Body text', family: 'gray' },
  {
    name: 'Gray 500',
    hex: '#6b7280',
    tailwind: 'bg-gray-500',
    usage: 'Muted text',
    family: 'gray',
  },
  {
    name: 'Gray 400',
    hex: '#9ca3af',
    tailwind: 'bg-gray-400',
    usage: 'Light text',
    family: 'gray',
  },
  { name: 'Gray 300', hex: '#d1d5db', tailwind: 'bg-gray-300', usage: 'Borders', family: 'gray' },
  {
    name: 'Gray 200',
    hex: '#e5e7eb',
    tailwind: 'bg-gray-200',
    usage: 'Light borders',
    family: 'gray',
  },
  {
    name: 'Gray 100',
    hex: '#f3f4f6',
    tailwind: 'bg-gray-100',
    usage: 'Backgrounds',
    family: 'gray',
  },
  { name: 'Gray 50', hex: '#f9fafb', tailwind: 'bg-gray-50', usage: 'Cards', family: 'gray' },
  { name: 'Black', hex: '#000000', tailwind: 'bg-black', usage: 'Max contrast', family: 'gray' },
  { name: 'White', hex: '#ffffff', tailwind: 'bg-white', usage: 'Text on dark', family: 'gray' },

  // ===== SLATE SCALE =====
  {
    name: 'Slate 900',
    hex: '#0f172a',
    tailwind: 'bg-slate-900',
    usage: 'Dark hero',
    family: 'slate',
  },
  {
    name: 'Slate 800',
    hex: '#1e293b',
    tailwind: 'bg-slate-800',
    usage: 'Icon containers',
    family: 'slate',
  },
  {
    name: 'Slate 700',
    hex: '#334155',
    tailwind: 'bg-slate-700',
    usage: 'Dark borders',
    family: 'slate',
  },

  // ===== BLUE SCALE =====
  {
    name: 'Blue 800',
    hex: '#1e40af',
    tailwind: 'bg-blue-800',
    usage: 'Card text',
    family: 'blue',
  },
  {
    name: 'Blue 600',
    hex: '#2563eb',
    tailwind: 'bg-blue-600',
    usage: 'Links, buttons',
    family: 'blue',
  },
  {
    name: 'Blue 500',
    hex: '#3b82f6',
    tailwind: 'bg-blue-500',
    usage: 'Demo icons',
    family: 'blue',
  },
  {
    name: 'Google Blue',
    hex: '#4285f4',
    tailwind: 'bg-[#4285f4]',
    usage: 'Shield icons',
    family: 'blue',
  },
  { name: 'Blue 200', hex: '#bfdbfe', tailwind: 'bg-blue-200', usage: 'Light BG', family: 'blue' },
  { name: 'Blue 50', hex: '#eff6ff', tailwind: 'bg-blue-50', usage: 'Subtle BG', family: 'blue' },

  // ===== INDIGO SCALE =====
  {
    name: 'Indigo 600',
    hex: '#4f46e5',
    tailwind: 'bg-indigo-600',
    usage: 'CTAs',
    family: 'indigo',
  },
  {
    name: 'Indigo 500',
    hex: '#6366f1',
    tailwind: 'bg-indigo-500',
    usage: 'Buttons',
    family: 'indigo',
  },
  {
    name: 'Indigo 50',
    hex: '#eef2ff',
    tailwind: 'bg-indigo-50',
    usage: 'Backgrounds',
    family: 'indigo',
  },

  // ===== PURPLE SCALE =====
  {
    name: 'Purple 800',
    hex: '#6b21a8',
    tailwind: 'bg-purple-800',
    usage: 'Dark accents',
    family: 'purple',
  },
  {
    name: 'Purple 700',
    hex: '#7c3aed',
    tailwind: 'bg-purple-700',
    usage: 'Text emphasis',
    family: 'purple',
  },
  {
    name: 'Purple 600',
    hex: '#9333ea',
    tailwind: 'bg-purple-600',
    usage: 'Badges',
    family: 'purple',
  },
  {
    name: 'Purple 500',
    hex: '#a855f7',
    tailwind: 'bg-purple-500',
    usage: 'Buttons',
    family: 'purple',
  },
  {
    name: 'Purple 200',
    hex: '#e9d5ff',
    tailwind: 'bg-purple-200',
    usage: 'Light BG',
    family: 'purple',
  },
  {
    name: 'Purple 100',
    hex: '#f3e8ff',
    tailwind: 'bg-purple-100',
    usage: 'Card BG',
    family: 'purple',
  },
  {
    name: 'Purple 50',
    hex: '#faf5ff',
    tailwind: 'bg-purple-50',
    usage: 'Subtle BG',
    family: 'purple',
  },

  // ===== GREEN SCALE =====
  {
    name: 'Green 800',
    hex: '#166534',
    tailwind: 'bg-green-800',
    usage: 'Dark accents',
    family: 'green',
  },
  {
    name: 'Green 600',
    hex: '#16a34a',
    tailwind: 'bg-green-600',
    usage: 'Success',
    family: 'green',
  },
  {
    name: 'Green 500',
    hex: '#22c55e',
    tailwind: 'bg-green-500',
    usage: 'NEET strategy',
    family: 'green',
  },
  {
    name: 'Google Green',
    hex: '#34a853',
    tailwind: 'bg-[#34a853]',
    usage: 'People icons',
    family: 'green',
  },
  {
    name: 'Green 200',
    hex: '#bbf7d0',
    tailwind: 'bg-green-200',
    usage: 'Light BG',
    family: 'green',
  },
  {
    name: 'Green 50',
    hex: '#f0fdf4',
    tailwind: 'bg-green-50',
    usage: 'Subtle BG',
    family: 'green',
  },

  // ===== TEAL / EMERALD =====
  {
    name: 'Teal 700',
    hex: '#0f766e',
    tailwind: 'bg-teal-700',
    usage: 'Hover states',
    family: 'teal',
  },
  { name: 'Teal 600', hex: '#0d9488', tailwind: 'bg-teal-600', usage: 'Buttons', family: 'teal' },

  // ===== RED SCALE =====
  { name: 'Red 800', hex: '#991b1b', tailwind: 'bg-red-800', usage: 'Error dark', family: 'red' },
  {
    name: 'Red 700',
    hex: '#b91c1c',
    tailwind: 'bg-red-700',
    usage: 'Error emphasis',
    family: 'red',
  },
  { name: 'Red 600', hex: '#dc2626', tailwind: 'bg-red-600', usage: 'Alerts', family: 'red' },
  { name: 'Red 500', hex: '#ef4444', tailwind: 'bg-red-500', usage: 'Icons', family: 'red' },
  {
    name: 'Google Red',
    hex: '#ea4335',
    tailwind: 'bg-[#ea4335]',
    usage: 'Heart icons',
    family: 'red',
  },
  { name: 'Red 200', hex: '#fecaca', tailwind: 'bg-red-200', usage: 'Light BG', family: 'red' },
  { name: 'Red 100', hex: '#fee2e2', tailwind: 'bg-red-100', usage: 'Error BG', family: 'red' },
  { name: 'Red 50', hex: '#fef2f2', tailwind: 'bg-red-50', usage: 'Subtle BG', family: 'red' },

  // ===== ORANGE SCALE =====
  {
    name: 'Orange 600',
    hex: '#ea580c',
    tailwind: 'bg-orange-600',
    usage: 'CTAs',
    family: 'orange',
  },
  {
    name: 'Orange 500',
    hex: '#f97316',
    tailwind: 'bg-orange-500',
    usage: 'Medal icon',
    family: 'orange',
  },
  {
    name: 'Orange 100',
    hex: '#ffedd5',
    tailwind: 'bg-orange-100',
    usage: 'Backgrounds',
    family: 'orange',
  },
  {
    name: 'Orange 50',
    hex: '#fff7ed',
    tailwind: 'bg-orange-50',
    usage: 'Light BG',
    family: 'orange',
  },

  // ===== YELLOW SCALE =====
  {
    name: 'Yellow 800',
    hex: '#854d0e',
    tailwind: 'bg-yellow-800',
    usage: 'Warning text',
    family: 'yellow',
  },
  {
    name: 'Yellow 600',
    hex: '#ca8a04',
    tailwind: 'bg-yellow-600',
    usage: 'Gold text',
    family: 'yellow',
  },
  {
    name: 'Yellow 500',
    hex: '#eab308',
    tailwind: 'bg-yellow-500',
    usage: 'Stars',
    family: 'yellow',
  },
  {
    name: 'Yellow 400',
    hex: '#facc15',
    tailwind: 'bg-yellow-400',
    usage: 'Highlights',
    family: 'yellow',
  },
  {
    name: 'Yellow 300',
    hex: '#fde047',
    tailwind: 'bg-yellow-300',
    usage: 'Icons',
    family: 'yellow',
  },
  {
    name: 'Google Yellow',
    hex: '#fbbc04',
    tailwind: 'bg-[#fbbc04]',
    usage: 'Lightbulb',
    family: 'yellow',
  },
  {
    name: 'Yellow 200',
    hex: '#fef08a',
    tailwind: 'bg-yellow-200',
    usage: 'Light BG',
    family: 'yellow',
  },
  {
    name: 'Yellow 100',
    hex: '#fef9c3',
    tailwind: 'bg-yellow-100',
    usage: 'Warning BG',
    family: 'yellow',
  },
  {
    name: 'Yellow 50',
    hex: '#fefce8',
    tailwind: 'bg-yellow-50',
    usage: 'Subtle BG',
    family: 'yellow',
  },

  // ===== ALLOWED GRADIENTS =====
  {
    name: 'Orange to Red',
    hex: 'gradient',
    tailwind: 'bg-gradient-to-r from-orange-500 to-red-500',
    usage: 'Urgent CTAs',
    family: 'gradient',
  },
  {
    name: 'Orange to Yellow',
    hex: 'gradient',
    tailwind: 'bg-gradient-to-r from-orange-500 to-yellow-500',
    usage: 'Highlights',
    family: 'gradient',
  },
  {
    name: 'Blue 50 to Purple 50',
    hex: 'gradient',
    tailwind: 'bg-gradient-to-br from-blue-50 to-purple-50',
    usage: 'Card BG',
    family: 'gradient',
  },
  {
    name: 'Green 50 to Teal 50',
    hex: 'gradient',
    tailwind: 'bg-gradient-to-br from-green-50 to-teal-50',
    usage: 'Bio sections',
    family: 'gradient',
  },
  {
    name: 'Purple 50 to Pink 50',
    hex: 'gradient',
    tailwind: 'bg-gradient-to-br from-purple-50 to-pink-50',
    usage: 'Premium BG',
    family: 'gradient',
  },
  {
    name: 'Gray 50 to White',
    hex: 'gradient',
    tailwind: 'bg-gradient-to-b from-gray-50 to-white',
    usage: 'Page sections',
    family: 'gradient',
  },
  {
    name: 'Slate 900 to 800',
    hex: 'gradient',
    tailwind: 'bg-gradient-to-br from-slate-900 to-slate-800',
    usage: 'Dark hero',
    family: 'gradient',
  },
  {
    name: 'Blue to Purple',
    hex: 'gradient',
    tailwind: 'bg-gradient-to-r from-blue-600 to-purple-600',
    usage: 'CTAs, badges',
    family: 'gradient',
  },
]

// ===== BRAND COLORS =====

const brandColors: ColorSwatch[] = [
  {
    name: 'Cerebrum Green',
    tailwind: 'bg-[#4a5d4a]',
    hex: '#4a5d4a',
    usage: 'Primary brand color - headers, CTAs, hero sections',
  },
  {
    name: 'Cerebrum Green Dark',
    tailwind: 'bg-[#3d4d3d]',
    hex: '#3d4d3d',
    usage: 'Hover states, button hover',
  },
  {
    name: 'Cerebrum Green Light',
    tailwind: 'bg-[#5a6d5a]',
    hex: '#5a6d5a',
    usage: 'Secondary elements, lighter accents',
  },
  {
    name: 'Cerebrum Green Very Light',
    tailwind: 'bg-[#e8ede8]',
    hex: '#e8ede8',
    usage: 'Light backgrounds, subtle sections',
  },
]

// ===== GRADIENT REPLACEMENTS (Solid alternatives) =====

const gradientReplacements: GradientReplacement[] = [
  // Blue-Purple gradients → Solid alternatives
  {
    gradientName: 'Blue to Purple',
    gradientClasses: 'bg-gradient-to-r from-blue-600 to-purple-600',
    solidName: 'Indigo 600',
    solidClass: 'bg-indigo-600',
    solidHex: '#4f46e5',
    usage: 'Primary CTA buttons, hero text, badges',
  },
  {
    gradientName: 'Blue to Indigo',
    gradientClasses: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    solidName: 'Blue 600',
    solidClass: 'bg-blue-600',
    solidHex: '#2563eb',
    usage: 'Secondary buttons, icons',
  },
  {
    gradientName: 'Blue via Indigo to Purple',
    gradientClasses: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600',
    solidName: 'Indigo 700',
    solidClass: 'bg-indigo-700',
    solidHex: '#4338ca',
    usage: 'Premium hero sections',
  },
  {
    gradientName: 'Purple to Pink',
    gradientClasses: 'bg-gradient-to-r from-purple-600 to-pink-600',
    solidName: 'Purple 600',
    solidClass: 'bg-purple-600',
    solidHex: '#9333ea',
    usage: 'Premium badges, highlights',
  },

  // Green gradients → Solid alternatives
  {
    gradientName: 'Green to Teal',
    gradientClasses: 'bg-gradient-to-r from-green-500 to-teal-600',
    solidName: 'Cerebrum Green',
    solidClass: 'bg-[#4a5d4a]',
    solidHex: '#4a5d4a',
    usage: 'Success states, biology-themed sections (BRAND COLOR)',
  },
  {
    gradientName: 'Green to Emerald',
    gradientClasses: 'bg-gradient-to-r from-green-500 to-emerald-600',
    solidName: 'Green 600',
    solidClass: 'bg-green-600',
    solidHex: '#16a34a',
    usage: 'Nature/bio themed elements',
  },
  {
    gradientName: 'Emerald to Teal',
    gradientClasses: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    solidName: 'Green 700',
    solidClass: 'bg-green-700',
    solidHex: '#15803d',
    usage: 'Biology topic cards',
  },

  // Teal gradients → Solid alternatives
  {
    gradientName: 'Teal to Blue',
    gradientClasses: 'bg-gradient-to-r from-teal-500 to-blue-600',
    solidName: 'Blue 700',
    solidClass: 'bg-blue-700',
    solidHex: '#1d4ed8',
    usage: 'Teal-themed sections',
  },
  {
    gradientName: 'Teal 600 to 700',
    gradientClasses: 'bg-gradient-to-r from-teal-600 to-teal-700',
    solidName: 'Green 600',
    solidClass: 'bg-green-600',
    solidHex: '#16a34a',
    usage: 'Monochromatic buttons',
  },

  // Orange gradients → Solid alternatives
  {
    gradientName: 'Orange to Red',
    gradientClasses: 'bg-gradient-to-r from-orange-500 to-red-500',
    solidName: 'Orange 600',
    solidClass: 'bg-orange-600',
    solidHex: '#ea580c',
    usage: 'Urgent CTAs, limited offers',
  },
  {
    gradientName: 'Orange to Yellow',
    gradientClasses: 'bg-gradient-to-r from-orange-500 to-yellow-500',
    solidName: 'Orange 500',
    solidClass: 'bg-orange-500',
    solidHex: '#f97316',
    usage: 'Highlight sections',
  },

  // Light background gradients → Solid alternatives
  {
    gradientName: 'Blue 50 to Purple 50',
    gradientClasses: 'bg-gradient-to-br from-blue-50 to-purple-50',
    solidName: 'Gray 50',
    solidClass: 'bg-gray-50',
    solidHex: '#f9fafb',
    usage: 'Card backgrounds, sections',
  },
  {
    gradientName: 'Green 50 to Teal 50',
    gradientClasses: 'bg-gradient-to-br from-green-50 to-teal-50',
    solidName: 'Cerebrum Green Very Light',
    solidClass: 'bg-[#e8ede8]',
    solidHex: '#e8ede8',
    usage: 'Bio-themed section backgrounds (BRAND COLOR)',
  },
  {
    gradientName: 'Purple 50 to Pink 50',
    gradientClasses: 'bg-gradient-to-br from-purple-50 to-pink-50',
    solidName: 'Purple 50',
    solidClass: 'bg-purple-50',
    solidHex: '#faf5ff',
    usage: 'Premium section backgrounds',
  },
  {
    gradientName: 'Gray 50 to White',
    gradientClasses: 'bg-gradient-to-b from-gray-50 to-white',
    solidName: 'Gray 50',
    solidClass: 'bg-gray-50',
    solidHex: '#f9fafb',
    usage: 'Page sections',
  },

  // Dark gradients → Solid alternatives
  {
    gradientName: 'Slate 900 to 800',
    gradientClasses: 'bg-gradient-to-br from-slate-900 to-slate-800',
    solidName: 'Slate 900',
    solidClass: 'bg-slate-900',
    solidHex: '#0f172a',
    usage: 'Dark hero sections, footers',
  },
  {
    gradientName: 'Blue 900 to Purple 900',
    gradientClasses: 'bg-gradient-to-br from-blue-900 to-purple-900',
    solidName: 'Indigo 900',
    solidClass: 'bg-indigo-900',
    solidHex: '#312e81',
    usage: 'Legacy hero sections',
  },
]

// ===== COLOR POLICY =====

const colorPolicy = {
  approved: [
    { name: 'Cerebrum Green', hex: '#4a5d4a', usage: 'Primary brand, headers, CTAs' },
    { name: 'Blue 600', hex: '#2563eb', usage: 'Links, secondary buttons, info' },
    { name: 'Green 600', hex: '#16a34a', usage: 'Success states, confirmations' },
    { name: 'Gray 900', hex: '#111827', usage: 'Primary text, headings' },
    { name: 'Gray 600', hex: '#4b5563', usage: 'Body text, descriptions' },
    { name: 'Gray 50', hex: '#f9fafb', usage: 'Light backgrounds, cards' },
    { name: 'White', hex: '#ffffff', usage: 'Card backgrounds, text on dark' },
    { name: 'Indigo 600', hex: '#4f46e5', usage: 'Premium features, special CTAs' },
    { name: 'Orange 600', hex: '#ea580c', usage: 'Urgent actions, warnings' },
    { name: 'Red 600', hex: '#dc2626', usage: 'Errors, destructive actions' },
  ],
  avoid: [
    { name: 'Yellow 500', hex: '#eab308', reason: 'Low contrast on white' },
    { name: 'Cyan 600', hex: '#0891b2', reason: 'Use Blue instead' },
    { name: 'Pink 500/600', hex: '#ec4899', reason: 'Use Purple instead' },
    { name: 'Teal 400-600', hex: '#14b8a6', reason: 'Use Green instead' },
    { name: 'Emerald 500/600', hex: '#10b981', reason: 'Use Green instead' },
    { name: 'All Gradients', hex: 'N/A', reason: 'Use solid colors only' },
  ],
  rules: [
    'Use Cerebrum Green (#4a5d4a) as the primary brand color for headers and main CTAs',
    'NO gradients - use solid colors only for cleaner, more professional look',
    'Use Gray scale for text hierarchy (900 for headings, 600 for body, 400 for muted)',
    'Use Blue 600 for links and interactive elements',
    'Use Green 600 for success states and confirmations',
    'Use Orange 600 for warnings and urgent actions',
    'Use Red 600 for errors and destructive actions only',
    'Maintain WCAG AA contrast ratios (4.5:1 for text, 3:1 for large text)',
    'Use light variants (50, 100) for backgrounds, dark variants (600, 700, 800) for text/buttons',
  ],
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
    tailwind: 'bg-green-600',
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
    tailwind: 'bg-green-700',
    hex: '#0f766e',
    usage: 'Teal hover states',
    count: 28,
  },
  {
    name: 'Teal 600',
    tailwind: 'bg-green-600',
    hex: '#0d9488',
    usage: 'Teal buttons, links',
    count: 152,
  },
  { name: 'Teal 500', tailwind: 'bg-green-600', hex: '#14b8a6', usage: 'Teal accents', count: 28 },
  {
    name: 'Teal 400',
    tailwind: 'bg-green-500',
    hex: '#2dd4bf',
    usage: 'Icons on dark bg',
    count: 20,
  },
  {
    name: 'Teal 100',
    tailwind: 'bg-green-100',
    hex: '#ccfbf1',
    usage: 'Teal backgrounds',
    count: 51,
  },
  { name: 'Teal 50', tailwind: 'bg-green-50', hex: '#f0fdfa', usage: 'Subtle teal bg', count: 55 },
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
    tailwind: 'bg-green-600',
    hex: '#059669',
    usage: 'Emerald accents',
    count: 121,
  },
  {
    name: 'Emerald 500',
    tailwind: 'bg-green-600',
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
  // ===== AI / MODERN TECH GRADIENTS =====
  {
    name: 'AI Purple-Blue',
    classes: 'bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400',
    usage: 'AI features, modern tech sections',
  },
  {
    name: 'AI Pink-Purple',
    classes: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500',
    usage: 'AI highlights, premium features',
  },
  {
    name: 'AI Cyan-Blue',
    classes: 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600',
    usage: 'Tech/AI sections, futuristic look',
  },
  {
    name: 'AI Violet-Fuchsia',
    classes: 'bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500',
    usage: 'AI badges, modern accents',
  },
  {
    name: 'AI Blue-Teal',
    classes: 'bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-400',
    usage: 'Data/analytics sections',
  },
  {
    name: 'AI Indigo-Cyan',
    classes: 'bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400',
    usage: 'Modern CTAs, AI features',
  },

  // ===== BLUE-PURPLE GRADIENTS (Primary) =====
  {
    name: 'Blue to Purple',
    classes: 'bg-gradient-to-r from-blue-600 to-purple-600',
    usage: 'Primary CTA buttons, hero text, badges',
  },
  {
    name: 'Blue to Indigo',
    classes: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    usage: 'Secondary buttons, icons',
  },
  {
    name: 'Blue via Indigo to Purple',
    classes: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600',
    usage: 'Premium hero sections',
  },
  {
    name: 'Purple to Pink',
    classes: 'bg-gradient-to-r from-purple-600 to-pink-600',
    usage: 'Premium badges, highlights',
  },
  {
    name: 'Indigo to Purple',
    classes: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    usage: 'Feature highlights',
  },

  // ===== GREEN / BIOLOGY GRADIENTS =====
  {
    name: 'Green to Teal',
    classes: 'bg-gradient-to-r from-green-500 to-teal-600',
    usage: 'Success states, biology-themed sections',
  },
  {
    name: 'Green to Emerald',
    classes: 'bg-gradient-to-r from-green-500 to-emerald-600',
    usage: 'Nature/bio themed elements',
  },
  {
    name: 'Emerald to Teal',
    classes: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    usage: 'Biology topic cards',
  },
  {
    name: 'Teal to Cyan',
    classes: 'bg-gradient-to-r from-teal-500 to-cyan-500',
    usage: 'Science/data sections',
  },

  // ===== WARM GRADIENTS =====
  {
    name: 'Orange to Red',
    classes: 'bg-gradient-to-r from-orange-500 to-red-500',
    usage: 'Urgent CTAs, limited offers',
  },
  {
    name: 'Orange to Yellow',
    classes: 'bg-gradient-to-r from-orange-500 to-yellow-500',
    usage: 'Highlight sections, energy',
  },
  {
    name: 'Red to Pink',
    classes: 'bg-gradient-to-r from-red-500 to-pink-500',
    usage: 'Attention-grabbing elements',
  },
  {
    name: 'Yellow to Orange',
    classes: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    usage: 'Bright highlights, warnings',
  },

  // ===== LIGHT BACKGROUND GRADIENTS =====
  {
    name: 'Blue 50 to Purple 50',
    classes: 'bg-gradient-to-br from-blue-50 to-purple-50',
    usage: 'Card backgrounds, sections',
  },
  {
    name: 'Green 50 to Teal 50',
    classes: 'bg-gradient-to-br from-green-50 to-teal-50',
    usage: 'Bio-themed section backgrounds',
  },
  {
    name: 'Purple 50 to Pink 50',
    classes: 'bg-gradient-to-br from-purple-50 to-pink-50',
    usage: 'Premium section backgrounds',
  },
  {
    name: 'Gray 50 to White',
    classes: 'bg-gradient-to-b from-gray-50 to-white',
    usage: 'Page sections',
  },
  {
    name: 'Cyan 50 to Blue 50',
    classes: 'bg-gradient-to-br from-cyan-50 to-blue-50',
    usage: 'Tech/AI backgrounds',
  },

  // ===== DARK GRADIENTS =====
  {
    name: 'Slate 900 to 800',
    classes: 'bg-gradient-to-br from-slate-900 to-slate-800',
    usage: 'Dark hero sections',
  },
  {
    name: 'Gray 900 to Slate 800',
    classes: 'bg-gradient-to-br from-gray-900 to-slate-800',
    usage: 'Footer, dark sections',
  },
  {
    name: 'Purple 900 to Indigo 900',
    classes: 'bg-gradient-to-br from-purple-900 to-indigo-900',
    usage: 'Premium dark sections',
  },
  {
    name: 'Blue 900 to Purple 900',
    classes: 'bg-gradient-to-br from-blue-900 to-purple-900',
    usage: 'Dark hero sections',
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
    bgClass: 'bg-green-50',
    textClass: 'text-green-800',
    borderClass: 'border border-green-200',
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
  const [activeTab, setActiveTab] = useState<
    | 'favorites'
    | 'brand'
    | 'colors'
    | 'gradients'
    | 'combinations'
    | 'replacements'
    | 'colorfixes'
    | 'audit'
  >('favorites')

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
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'favorites'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Your Picks ({favoriteColors.length})
          </button>
          <button
            onClick={() => setActiveTab('brand')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'brand'
                ? 'bg-[#4a5d4a] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Brand & Policy
          </button>
          <button
            onClick={() => setActiveTab('replacements')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'replacements'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Gradient → Solid ({gradientReplacements.length})
          </button>
          <button
            onClick={() => setActiveTab('colors')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'colors'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Colors ({colorCategories.reduce((acc, cat) => acc + cat.colors.length, 0)})
          </button>
          <button
            onClick={() => setActiveTab('gradients')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'gradients'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Gradients ({gradients.length})
          </button>
          <button
            onClick={() => setActiveTab('combinations')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'combinations'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Combinations ({combinations.length})
          </button>
          <button
            onClick={() => setActiveTab('colorfixes')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'colorfixes'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Color Fixes ({colorFixCategories.reduce((acc, cat) => acc + cat.fixes.length, 0)})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'audit'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Audit Results (91)
          </button>
        </div>

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-purple-800 mb-2">Your Favorite Colors</h2>
              <p className="text-purple-700">
                Curated color palette organized by color family. Click any color to copy its hex
                code.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-700">{favoriteColors.length}</p>
                <p className="text-sm text-purple-600">Total Colors</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-700">{colorFamilies.length}</p>
                <p className="text-sm text-gray-600">Color Families</p>
              </div>
            </div>

            {/* Colors by Family */}
            <div className="space-y-8">
              {colorFamilies.map((family) => {
                const familyColors = favoriteColors.filter((c) => c.family === family.id)
                if (familyColors.length === 0) return null

                return (
                  <div key={family.id}>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">{family.label}</h3>
                    <div className="flex flex-wrap gap-3">
                      {familyColors.map((color) => {
                        const isGradient = color.hex === 'gradient'

                        // Determine text color based on background brightness
                        const isLight =
                          !isGradient &&
                          (color.hex === '#ffffff' ||
                            color.hex === '#f9fafb' ||
                            color.hex === '#f3f4f6' ||
                            color.hex === '#e5e7eb' ||
                            color.hex === '#e8ede8' ||
                            color.hex.toLowerCase().includes('f') ||
                            parseInt(color.hex.slice(1), 16) > 0xaaaaaa)

                        // For gradients, check if it's a light gradient
                        const isLightGradient =
                          isGradient &&
                          (color.tailwind.includes('-50') ||
                            color.tailwind.includes('to-white') ||
                            color.tailwind.includes('to-teal-50') ||
                            color.tailwind.includes('to-pink-50') ||
                            color.tailwind.includes('to-purple-50'))

                        return (
                          <button
                            key={color.name}
                            onClick={() =>
                              copyToClipboard(isGradient ? color.tailwind : color.hex, color.name)
                            }
                            className={`px-5 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 ${
                              isGradient ? color.tailwind : ''
                            } ${
                              isLight || isLightGradient
                                ? 'text-gray-800 border border-gray-300'
                                : 'text-white border border-transparent'
                            }`}
                            style={isGradient ? {} : { backgroundColor: color.hex }}
                            title={`${color.tailwind} - ${color.usage}`}
                          >
                            {copiedColor === color.name ? 'Copied!' : color.name}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Brand & Policy Tab */}
        {activeTab === 'brand' && (
          <div className="space-y-12">
            {/* Brand Colors Section */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg" style={{ backgroundColor: '#4a5d4a' }}></span>
                Cerebrum Brand Colors
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {brandColors.map((color) => (
                  <div
                    key={color.name}
                    className="flex flex-col items-center group cursor-pointer p-4 rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition-all"
                    onClick={() => copyToClipboard(color.hex, color.name)}
                  >
                    <div
                      className="w-20 h-20 rounded-xl shadow-md mb-3 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-sm font-bold text-black text-center">{color.name}</p>
                    <p className="text-xs text-gray-500 font-mono">
                      {copiedColor === color.name ? 'Copied!' : color.hex}
                    </p>
                    <p className="text-xs text-gray-600 text-center mt-2">{color.usage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Approved Colors Section */}
            <div>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-green-500 pb-2">
                Approved Colors (USE THESE)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {colorPolicy.approved.map((color) => (
                  <div
                    key={color.name}
                    className="flex flex-col items-center group cursor-pointer p-3 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-all"
                    onClick={() => copyToClipboard(color.hex, color.name)}
                  >
                    <div
                      className="w-12 h-12 rounded-lg shadow mb-2"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-xs font-bold text-black text-center">{color.name}</p>
                    <p className="text-[10px] text-gray-500 font-mono">
                      {copiedColor === color.name ? 'Copied!' : color.hex}
                    </p>
                    <p className="text-[10px] text-gray-600 text-center mt-1">{color.usage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Avoid Colors Section */}
            <div>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-red-500 pb-2">
                Colors to Avoid (DO NOT USE)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {colorPolicy.avoid.map((color) => (
                  <div
                    key={color.name}
                    className="flex flex-col items-center p-3 rounded-lg bg-red-50 border border-red-200"
                  >
                    <div
                      className="w-12 h-12 rounded-lg shadow mb-2 relative"
                      style={{ backgroundColor: color.hex === 'N/A' ? '#e5e7eb' : color.hex }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-red-600 text-3xl font-bold">✕</span>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-red-800 text-center">{color.name}</p>
                    <p className="text-[10px] text-red-600 text-center mt-1">{color.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Policy Rules */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-black mb-6">Color Usage Policy</h2>
              <ul className="space-y-3">
                {colorPolicy.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4a5d4a] text-white text-sm flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Reference Card */}
            <div className="bg-[#e8ede8] rounded-2xl p-8 border border-[#4a5d4a]/20">
              <h2 className="text-xl font-bold text-[#4a5d4a] mb-4">Quick Reference</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-black mb-2">For Headers & CTAs</h3>
                  <code className="text-sm bg-white px-3 py-2 rounded border block">
                    bg-[#4a5d4a] text-white
                  </code>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">For Hover States</h3>
                  <code className="text-sm bg-white px-3 py-2 rounded border block">
                    hover:bg-[#3d4d3d]
                  </code>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">For Light Backgrounds</h3>
                  <code className="text-sm bg-white px-3 py-2 rounded border block">
                    bg-[#e8ede8]
                  </code>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">For Secondary Elements</h3>
                  <code className="text-sm bg-white px-3 py-2 rounded border block">
                    bg-[#5a6d5a]
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gradient Replacements Tab */}
        {activeTab === 'replacements' && (
          <div className="space-y-8">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-bold text-orange-800 mb-2">
                Gradient → Solid Color Replacements
              </h2>
              <p className="text-orange-700">
                Use these solid colors instead of gradients for a cleaner, more professional look.
                Click any solid color to copy its value.
              </p>
            </div>

            <div className="grid gap-6">
              {gradientReplacements.map((item) => (
                <div
                  key={item.gradientName}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                >
                  <div className="grid sm:grid-cols-2">
                    {/* Gradient (Before) */}
                    <div className="p-4 border-b sm:border-b-0 sm:border-r border-gray-200">
                      <p className="text-xs text-red-600 font-semibold mb-2 uppercase tracking-wide">
                        ✕ Gradient (Avoid)
                      </p>
                      <div className={`h-16 rounded-lg ${item.gradientClasses}`}></div>
                      <p className="text-sm font-bold text-gray-900 mt-2">{item.gradientName}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">{item.gradientClasses}</p>
                    </div>

                    {/* Solid (After) */}
                    <div
                      className="p-4 cursor-pointer hover:bg-green-50 transition-colors"
                      onClick={() => copyToClipboard(item.solidHex, item.solidName)}
                    >
                      <p className="text-xs text-green-600 font-semibold mb-2 uppercase tracking-wide">
                        ✓ Solid (Use This)
                      </p>
                      <div
                        className="h-16 rounded-lg"
                        style={{ backgroundColor: item.solidHex }}
                      ></div>
                      <p className="text-sm font-bold text-gray-900 mt-2">{item.solidName}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">
                        {copiedColor === item.solidName
                          ? 'Copied!'
                          : `${item.solidClass} | ${item.solidHex}`}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">Usage:</span> {item.usage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

        {/* Color Fixes Tab */}
        {activeTab === 'colorfixes' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-red-800 mb-2">
                Unapproved → Approved Color Fixes
              </h2>
              <p className="text-red-700">
                Visual guide showing which unapproved colors (Amber, Cyan, Pink) should be replaced
                with approved alternatives. Click any approved color to copy its hex code.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-orange-700">
                  {colorFixCategories[0]?.fixes.length || 0}
                </p>
                <p className="text-sm text-orange-600">Amber → Yellow/Orange</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">
                  {colorFixCategories[1]?.fixes.length || 0}
                </p>
                <p className="text-sm text-blue-600">Cyan → Blue/Teal</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-700">
                  {colorFixCategories[2]?.fixes.length || 0}
                </p>
                <p className="text-sm text-purple-600">Pink → Purple/Indigo</p>
              </div>
            </div>

            {/* Color Fix Categories */}
            {colorFixCategories.map((category) => (
              <div key={category.name} className="space-y-4">
                <div className="border-b-2 border-gray-200 pb-2">
                  <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>

                <div className="grid gap-4">
                  {category.fixes.map((fix, index) => (
                    <div
                      key={`${fix.unapproved.name}-${index}`}
                      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                    >
                      <div className="grid sm:grid-cols-2">
                        {/* Unapproved (Before) */}
                        <div className="p-4 border-b sm:border-b-0 sm:border-r border-gray-200 bg-red-50/30">
                          <p className="text-xs text-red-600 font-semibold mb-2 uppercase tracking-wide flex items-center gap-1">
                            <span className="text-lg">✕</span> Unapproved (Remove)
                          </p>
                          <div className="flex items-center gap-4">
                            <div
                              className="w-16 h-16 rounded-xl shadow-md border border-gray-300 flex-shrink-0"
                              style={{ backgroundColor: fix.unapproved.hex }}
                            />
                            <div>
                              <p className="text-sm font-bold text-gray-900">
                                {fix.unapproved.name}
                              </p>
                              <p className="text-xs text-gray-500 font-mono">
                                {fix.unapproved.hex}
                              </p>
                              <p className="text-xs text-gray-500 font-mono">
                                {fix.unapproved.tailwind}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Approved (After) */}
                        <div
                          className="p-4 cursor-pointer hover:bg-green-50 transition-colors bg-green-50/30"
                          onClick={() => copyToClipboard(fix.approved.hex, fix.approved.name)}
                        >
                          <p className="text-xs text-green-600 font-semibold mb-2 uppercase tracking-wide flex items-center gap-1">
                            <span className="text-lg">✓</span> Approved (Use This)
                          </p>
                          <div className="flex items-center gap-4">
                            <div
                              className="w-16 h-16 rounded-xl shadow-md border border-gray-300 flex-shrink-0"
                              style={{ backgroundColor: fix.approved.hex }}
                            />
                            <div>
                              <p className="text-sm font-bold text-gray-900">{fix.approved.name}</p>
                              <p className="text-xs text-gray-500 font-mono">
                                {copiedColor === fix.approved.name ? 'Copied!' : fix.approved.hex}
                              </p>
                              <p className="text-xs text-gray-500 font-mono">
                                {fix.approved.tailwind}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Affected Elements Footer */}
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-gray-700">
                            Affected ({fix.fileCount} files):
                          </span>
                          {fix.affectedElements.map((element, i) => (
                            <span
                              key={i}
                              className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                            >
                              {element}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-bold text-green-800 mb-3">Quick Fix Summary</h3>
              <ul className="space-y-2 text-green-700">
                <li>
                  • <strong>Amber colors:</strong> Replace with Yellow (same shade number) or Orange
                  500
                </li>
                <li>
                  • <strong>Cyan colors:</strong> Replace with Blue (same shade number) or Teal 600
                </li>
                <li>
                  • <strong>Pink colors:</strong> Replace with Indigo (same shade number) or Purple
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Audit Tab */}
        {activeTab === 'audit' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-yellow-800 mb-2">
                Detailed Color Audit - Find Exactly Where Colors Are Used
              </h2>
              <p className="text-yellow-700">
                Each entry shows the file, line number, and exact Tailwind class. Click any swatch
                to see what it looks like vs. the replacement.
              </p>
            </div>

            {/* ===== CYAN SECTION ===== */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-cyan-300 overflow-hidden">
              <div className="bg-cyan-500 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-cyan-300 rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">CYAN Colors</h3>
                    <p className="text-cyan-100 text-sm">15 files with cyan usage</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-cyan-100">Replace with:</span>
                  <div
                    className="w-6 h-6 bg-blue-600 rounded border-2 border-white"
                    title="Blue 600"
                  ></div>
                  <div
                    className="w-6 h-6 bg-teal-600 rounded border-2 border-white"
                    title="Teal 600"
                  ></div>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {/* File entries - ALL cyan → Blue 600 or Teal 600 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-blue-800 mb-2">Approved Replacements:</p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-600 rounded"></div>
                      <code className="text-xs bg-white px-2 py-1 rounded">bg-blue-600</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-teal-600 rounded"></div>
                      <code className="text-xs bg-white px-2 py-1 rounded">bg-teal-600</code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-cyan-900 rounded flex-shrink-0"
                      title="cyan-900"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        biology-tutor-class-9-icse/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 172</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        from-cyan-900
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        from-blue-600
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-cyan-100 rounded flex-shrink-0"
                      title="cyan-100"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        zoology-teacher-near-me/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 325</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        bg-cyan-*, text-cyan-*, hover:bg-cyan-*
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        bg-blue-600, text-blue-600
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-cyan-700 rounded flex-shrink-0"
                      title="cyan-700"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        biology-major-courses/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 228</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        to-cyan-700
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        to-teal-600
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-cyan-900 rounded flex-shrink-0"
                      title="cyan-900"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        neet-biology-coaching/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 162</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        to-cyan-900
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        to-blue-600
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-cyan-700 rounded flex-shrink-0"
                      title="cyan-700"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        neet-preparation/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 210</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        via-cyan-700
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        via-teal-600
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-cyan-200 rounded flex-shrink-0"
                      title="cyan-200"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        igcse-biology-tutor/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Lines 231, 233, 242, 246, 250, 257</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        text-cyan-*
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        text-blue-600
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-cyan-100 rounded flex-shrink-0"
                      title="cyan-100"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        botany-classes/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Lines 111, 232, 373</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        text-cyan-*, bg-cyan-*
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        text-blue-600, bg-blue-600
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-cyan-900 rounded flex-shrink-0"
                      title="cyan-900"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        neet-coaching-gurugram/page.tsx + ntse-online-classes/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Various lines</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        to-cyan-900
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        to-blue-600
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== PINK SECTION ===== */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-pink-300 overflow-hidden">
              <div className="bg-pink-500 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-pink-300 rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">PINK Colors</h3>
                    <p className="text-pink-100 text-sm">20+ files with pink usage</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-pink-100">Replace with:</span>
                  <div
                    className="w-6 h-6 bg-purple-700 rounded border-2 border-white"
                    title="Purple 700"
                  ></div>
                  <div
                    className="w-6 h-6 bg-indigo-500 rounded border-2 border-white"
                    title="Indigo 500"
                  ></div>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {/* Approved Replacements Info Box */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-purple-800 mb-2">
                    Approved Replacements:
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-700 rounded"></div>
                      <code className="text-xs bg-white px-2 py-1 rounded">bg-purple-700</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-indigo-500 rounded"></div>
                      <code className="text-xs bg-white px-2 py-1 rounded">bg-indigo-500</code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-pink-800 rounded flex-shrink-0"
                      title="pink-800"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        pre-neet-coaching/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 155</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        via-pink-800
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        via-purple-700
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-pink-50 rounded border flex-shrink-0"
                      title="pink-50"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        pre-neet-coaching/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 259</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        to-pink-50
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        to-purple-50
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-pink-800 rounded flex-shrink-0"
                      title="pink-800"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        biology-tutor-class-12-icse/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 159</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        via-pink-800
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        via-purple-700
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-pink-700 rounded flex-shrink-0"
                      title="pink-700"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        biology-major-courses/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">
                        Lines 214, 344, 362, 377, 404, 485, 586, 683, 764, 788
                      </p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        to-pink-700, text-pink-100, hover:bg-pink-50, to-pink-50
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        to-purple-700, text-purple-200, hover:bg-purple-50
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-pink-50 rounded border flex-shrink-0"
                      title="pink-50"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        test-platform/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 157</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        to-pink-50
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        to-purple-50
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-pink-300 rounded flex-shrink-0"
                      title="pink-300"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        neet-foundation-class-10/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">
                        Lines 180, 190, 195, 212, 233-248, 283, 440
                      </p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        via-pink-800, text-pink-300, bg-pink-400, to-pink-50
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        via-purple-700, text-purple-200, bg-purple-700
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-pink-50 rounded border flex-shrink-0"
                      title="pink-50"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        results/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Lines 115, 320</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        bg-pink-50, from-pink-50, to-pink-100, border-pink-200
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        bg-purple-50, from-purple-50, to-purple-100
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-pink-900 rounded flex-shrink-0"
                      title="pink-900"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        neet-coaching-south-india/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 164</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        to-pink-900
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        to-purple-700
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-pink-50 rounded border flex-shrink-0"
                      title="pink-50"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        resources/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 257</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        to-pink-50
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        to-purple-50
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-pink-100 rounded flex-shrink-0"
                      title="pink-100"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        admin/students/leads/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 224</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        bg-pink-100, text-pink-800
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        bg-purple-100, text-purple-700
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== VIOLET SECTION ===== */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-violet-300 overflow-hidden">
              <div className="bg-violet-500 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-violet-300 rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">VIOLET Colors</h3>
                    <p className="text-violet-100 text-sm">12 files with violet usage</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-violet-100">Replace with:</span>
                  <div
                    className="w-6 h-6 bg-purple-700 rounded border-2 border-white"
                    title="Purple 700"
                  ></div>
                  <div
                    className="w-6 h-6 bg-indigo-500 rounded border-2 border-white"
                    title="Indigo 500"
                  ></div>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {/* Approved Replacements Info Box */}
                <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-violet-800 mb-2">
                    Approved Replacements:
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-700 rounded"></div>
                      <code className="text-xs bg-white px-2 py-1 rounded">bg-purple-700</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-indigo-500 rounded"></div>
                      <code className="text-xs bg-white px-2 py-1 rounded">bg-indigo-500</code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-violet-700 rounded flex-shrink-0"
                      title="violet-700"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        biology-major-courses/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 235</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        to-violet-700
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        to-purple-700
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-violet-900 rounded flex-shrink-0"
                      title="violet-900"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        biology-classes-near-me/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Lines 135, 442</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        to-violet-900, to-violet-600
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        to-purple-700, to-indigo-500
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-violet-300 rounded flex-shrink-0"
                      title="violet-300"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        olympiad-preparation/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Lines 190, 195, 213, 234-249, 444</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        text-violet-300, bg-violet-400, hover:bg-violet-300
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        text-purple-200, bg-purple-700, hover:bg-indigo-500
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-violet-800 rounded flex-shrink-0"
                      title="violet-800"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        home-tuition-for-biology/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Lines 166, 405</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        via-violet-800, via-violet-600
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        via-purple-700, via-indigo-500
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-violet-600 rounded flex-shrink-0"
                      title="violet-600"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        ncert-biology-class-12/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Lines 139-540 (multiple)</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        via-violet-600, bg-violet-400, text-violet-300, bg-violet-50,
                        text-violet-700
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        via-indigo-500, bg-purple-700, text-purple-200
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-violet-600 rounded flex-shrink-0"
                      title="violet-600"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        a-level-biology-tutor/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Lines 271-762 (multiple)</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        to-violet-800, to-violet-50, border-violet-600, bg-violet-100,
                        text-violet-600
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        to-purple-700, to-purple-50, border-indigo-500
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-violet-500 rounded flex-shrink-0"
                      title="violet-500"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        biology-teacher-near-me/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Line 54</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        from-violet-500
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        from-indigo-500
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== FUCHSIA SECTION ===== */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-fuchsia-300 overflow-hidden">
              <div className="bg-fuchsia-500 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-fuchsia-300 rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">FUCHSIA Colors</h3>
                    <p className="text-fuchsia-100 text-sm">2 files with fuchsia usage</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-fuchsia-100">Replace with:</span>
                  <div
                    className="w-6 h-6 bg-purple-700 rounded border-2 border-white"
                    title="Purple 700"
                  ></div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {/* Approved Replacements Info Box */}
                <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-fuchsia-800 mb-2">
                    Approved Replacement:
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-700 rounded"></div>
                      <code className="text-xs bg-white px-2 py-1 rounded">bg-purple-700</code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-fuchsia-900 rounded flex-shrink-0"
                      title="fuchsia-900"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        neet-foundation-class-10/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Lines 180, 223, 283-331, 374-451</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        from-fuchsia-900, hover:text-fuchsia-900, from-fuchsia-50, text-fuchsia-600,
                        bg-fuchsia-100, bg-fuchsia-600
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        from-purple-700, hover:text-purple-700, from-purple-50, text-purple-700
                      </code>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-fuchsia-900 rounded flex-shrink-0"
                      title="fuchsia-900"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                        neet-foundation-class-9/page.tsx
                      </p>
                      <p className="text-xs text-gray-500">Lines 188, 429</p>
                      <code className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded mt-1 inline-block">
                        to-fuchsia-900, to-fuchsia-600
                      </code>
                      <span className="text-xs text-gray-400 mx-2">→</span>
                      <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        to-purple-700, to-purple-700
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== EMERALD SECTION ===== */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-emerald-300 overflow-hidden">
              <div className="bg-emerald-500 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-emerald-300 rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">EMERALD Colors</h3>
                    <p className="text-emerald-100 text-sm">
                      Only in color-palette (approved gradients)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-100">Replace with:</span>
                  <div
                    className="w-6 h-6 bg-green-500 rounded border-2 border-white"
                    title="Green 500"
                  ></div>
                  <div
                    className="w-6 h-6 bg-teal-600 rounded border-2 border-white"
                    title="Teal 600"
                  ></div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {/* Approved Replacements Info Box */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">
                    Approved Replacements:
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 rounded"></div>
                      <code className="text-xs bg-white px-2 py-1 rounded">bg-green-500</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-teal-600 rounded"></div>
                      <code className="text-xs bg-white px-2 py-1 rounded">bg-teal-600</code>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-green-700 font-medium">
                    Emerald is only used in approved gradient definitions in color-palette
                  </p>
                  <p className="text-green-600 text-sm mt-1">No action needed - already covered</p>
                </div>
              </div>
            </div>

            {/* Quick Decision Panel */}
            <div className="bg-gray-900 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Quick Fix Commands</h3>
              <p className="text-gray-300 mb-4">Tell me what to fix:</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <code className="text-cyan-400">&quot;Fix all cyan&quot;</code>
                  <p className="text-gray-400 text-xs mt-1">Replace cyan → blue/teal in 15 files</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <code className="text-pink-400">&quot;Fix all pink&quot;</code>
                  <p className="text-gray-400 text-xs mt-1">Replace pink → purple in 20+ files</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <code className="text-violet-400">&quot;Fix all violet&quot;</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Replace violet → purple/indigo in 12 files
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <code className="text-fuchsia-400">&quot;Fix all fuchsia&quot;</code>
                  <p className="text-gray-400 text-xs mt-1">Replace fuchsia → purple in 2 files</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 md:col-span-2">
                  <code className="text-yellow-400">&quot;Fix everything&quot;</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Fix all unapproved colors across all files
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Examples Section */}
        <div className="mt-16 border-t-2 border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-black mb-8">
            Live Button Examples (Solid Colors Only)
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#4a5d4a] hover:bg-[#3d4d3d] text-white px-6 py-3 rounded-lg font-semibold">
              Cerebrum Green (Brand)
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold">
              Orange 600
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold">
              Indigo 600
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
              Blue 600
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
              Green 600
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
              Purple 600
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
              Red 600
            </button>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold">
              Gray 900
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
