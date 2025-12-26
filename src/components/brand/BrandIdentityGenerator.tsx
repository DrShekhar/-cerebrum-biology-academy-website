'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import {
  cerebrumBrandAgent,
  type LogoVariant,
  type IconCategory,
  type BadgeType,
} from '@/lib/design/brandIdentityAgent'
import {
  Download,
  Copy,
  Palette,
  Layout,
  Award,
  Zap,
  Eye,
  Settings,
  FileImage,
  Code,
  Maximize,
  Minimize,
} from 'lucide-react'

interface BrandIdentityGeneratorProps {
  className?: string
}

export const BrandIdentityGenerator: React.FC<BrandIdentityGeneratorProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<'logos' | 'icons' | 'badges' | 'guidelines'>('logos')
  const [selectedLogoVariant, setSelectedLogoVariant] = useState<LogoVariant>('primary')
  const [selectedIconCategory, setSelectedIconCategory] = useState<IconCategory>('biology')
  const [selectedBadgeType, setSelectedBadgeType] = useState<BadgeType>('achievement')
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light')
  const [exportFormat, setExportFormat] = useState<'svg' | 'png' | 'pdf'>('svg')

  const logoVariants: { value: LogoVariant; label: string; description: string }[] = [
    { value: 'primary', label: 'Primary Logo', description: 'Main horizontal layout for headers' },
    { value: 'stacked', label: 'Stacked Logo', description: 'Vertical layout for profiles' },
    { value: 'icon-only', label: 'Icon Only', description: 'Symbol only for favicons' },
    { value: 'academic', label: 'Academic', description: 'Formal institutional style' },
    { value: 'monochrome', label: 'Monochrome', description: 'Single color version' },
    { value: 'inverse', label: 'Inverse', description: 'White version for dark backgrounds' },
  ]

  const iconCategories: { value: IconCategory; label: string; count: number }[] = [
    { value: 'biology', label: 'Biology Icons', count: 15 },
    { value: 'academic', label: 'Academic Icons', count: 12 },
    { value: 'medical', label: 'Medical Icons', count: 10 },
    { value: 'ui-elements', label: 'UI Elements', count: 20 },
    { value: 'achievements', label: 'Achievements', count: 8 },
    { value: 'interactive', label: 'Interactive', count: 6 },
  ]

  const badgeTypes: { value: BadgeType; label: string; description: string }[] = [
    { value: 'achievement', label: 'Achievement Badges', description: 'Student milestone rewards' },
    { value: 'certification', label: 'Certification', description: 'Course completion badges' },
    { value: 'quality', label: 'Quality Seals', description: 'Trust and credibility indicators' },
    { value: 'faculty', label: 'Faculty Badges', description: 'Expertise and credentials' },
    { value: 'accreditation', label: 'Accreditation', description: 'Institutional approvals' },
  ]

  const generateLogo = () => {
    return cerebrumBrandAgent.generateLogo(selectedLogoVariant)
  }

  const generateIconSet = () => {
    return cerebrumBrandAgent.createIconSet(selectedIconCategory)
  }

  const generateBadges = () => {
    return cerebrumBrandAgent.designBadges(selectedBadgeType)
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    // Add toast notification here
  }

  const downloadAsset = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const currentLogo = generateLogo()

  return (
    <div className={cn('w-full max-w-7xl mx-auto p-6', className)}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cerebrum Brand Identity Generator</h1>
        <p className="text-xl text-gray-600">
          Generate Harvard-level logos, icons, and brand assets with our AI-powered design system
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 rounded-2xl p-2">
        {[
          { id: 'logos', label: 'Logo Generator', icon: Layout },
          { id: 'icons', label: 'Icon Library', icon: Zap },
          { id: 'badges', label: 'Badge Creator', icon: Award },
          { id: 'guidelines', label: 'Brand Guidelines', icon: Eye },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium',
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-lg'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Logo Generator Tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'logos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Logo Controls */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Logo Variants</h3>

              <div className="space-y-3 mb-6">
                {logoVariants.map((variant) => (
                  <button
                    key={variant.value}
                    onClick={() => setSelectedLogoVariant(variant.value)}
                    className={cn(
                      'w-full text-left p-4 rounded-2xl border-2 transition-all duration-200',
                      selectedLogoVariant === variant.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="font-semibold text-gray-900">{variant.label}</div>
                    <div className="text-sm text-gray-600">{variant.description}</div>
                  </button>
                ))}
              </div>

              {/* Preview Options */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Preview Options</h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPreviewMode('light')}
                        className={cn(
                          'flex-1 px-3 py-2 rounded-lg border text-sm font-medium',
                          previewMode === 'light'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 text-gray-700'
                        )}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => setPreviewMode('dark')}
                        className={cn(
                          'flex-1 px-3 py-2 rounded-lg border text-sm font-medium',
                          previewMode === 'dark'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 text-gray-700'
                        )}
                      >
                        Dark
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Export Format
                    </label>
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="svg">SVG (Vector)</option>
                      <option value="png">PNG (Raster)</option>
                      <option value="pdf">PDF (Print)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Preview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Logo Preview</h3>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(currentLogo.svgCode)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy SVG
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        downloadAsset(
                          currentLogo.svgCode,
                          `cerebrum-logo-${selectedLogoVariant}.svg`
                        )
                      }
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                {/* Preview Area */}
                <div
                  className={cn(
                    'relative rounded-2xl p-12 mb-6 flex items-center justify-center min-h-64',
                    previewMode === 'light' ? 'bg-gray-50' : 'bg-gray-900'
                  )}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: currentLogo.svgCode }}
                    className="max-w-full"
                  />
                </div>

                {/* Logo Specifications */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Specifications</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min Size:</span>
                        <span className="font-medium">{currentLogo.specifications.minSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Size:</span>
                        <span className="font-medium">{currentLogo.specifications.maxSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ratio:</span>
                        <span className="font-medium">{currentLogo.dimensions.ratio}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Usage Guidelines</h4>
                    <div className="space-y-2 text-sm">
                      {currentLogo.usage.recommended.slice(0, 3).map((usage, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                          <span className="text-gray-700">{usage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Color Variations */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold text-gray-900 mb-4">Color Variations</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {currentLogo.colorVariations.map((variation, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-gray-100 rounded-xl p-4 mb-2">
                          <div className="flex gap-1 justify-center mb-2">
                            {variation.colors.map((color, colorIndex) => (
                              <div
                                key={colorIndex}
                                className="w-6 h-6 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-gray-900">{variation.name}</div>
                        <div className="text-xs text-gray-600">{variation.usage}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Icon Library Tab */}
        {activeTab === 'icons' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-4 gap-8"
          >
            {/* Icon Categories */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Icon Categories</h3>

              <div className="space-y-3">
                {iconCategories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedIconCategory(category.value)}
                    className={cn(
                      'w-full text-left p-4 rounded-2xl border-2 transition-all duration-200',
                      selectedIconCategory === category.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-gray-900">{category.label}</div>
                      <div className="text-sm text-gray-500">{category.count}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Grid */}
            <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {iconCategories.find((c) => c.value === selectedIconCategory)?.label}
                </h3>

                <Button variant="primary" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Set
                </Button>
              </div>

              {/* Icon Preview Grid */}
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="group relative bg-gray-50 rounded-xl p-4 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-lg mx-auto mb-2" />
                    <div className="text-xs text-center text-gray-600">Icon {i + 1}</div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="p-2 bg-white rounded-lg text-gray-900 hover:bg-gray-100">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white rounded-lg text-gray-900 hover:bg-gray-100">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Brand Guidelines Tab */}
        {activeTab === 'guidelines' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Brand Guidelines</h3>

            {/* Brand DNA */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Brand DNA</h4>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-blue-600 mb-1">Mission</div>
                    <div className="text-gray-700">
                      Democratize quality NEET preparation through Harvard-level education
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-600 mb-1">Vision</div>
                    <div className="text-gray-700">
                      India's most trusted and innovative medical entrance coaching
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Core Values</h4>
                <div className="space-y-2">
                  {['Academic Excellence', 'Scientific Rigor', 'Student Success', 'Innovation'].map(
                    (value) => (
                      <div key={value} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                        <span className="text-gray-700">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="mb-12">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Color Palette</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Primary Colors</h5>
                  <div className="space-y-2">
                    {[
                      { name: 'Cerebrum Blue', value: '#1E40AF' },
                      { name: 'Academic Navy', value: '#1E3A8A' },
                      { name: 'Scholar Blue', value: '#3B82F6' },
                    ].map((color) => (
                      <div key={color.name} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg border border-gray-300"
                          style={{ backgroundColor: color.value }}
                        />
                        <div>
                          <div className="font-medium text-gray-900">{color.name}</div>
                          <div className="text-sm text-gray-600">{color.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Secondary Colors</h5>
                  <div className="space-y-2">
                    {[
                      { name: 'Success Green', value: '#10B981' },
                      { name: 'Innovation Purple', value: '#8B5CF6' },
                      { name: 'Excellence Gold', value: '#F59E0B' },
                    ].map((color) => (
                      <div key={color.name} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg border border-gray-300"
                          style={{ backgroundColor: color.value }}
                        />
                        <div>
                          <div className="font-medium text-gray-900">{color.name}</div>
                          <div className="text-sm text-gray-600">{color.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Neutral Colors</h5>
                  <div className="space-y-2">
                    {[
                      { name: 'Academic Gray', value: '#374151' },
                      { name: 'Scholar Gray', value: '#6B7280' },
                      { name: 'Paper White', value: '#FEFEFE' },
                    ].map((color) => (
                      <div key={color.name} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg border border-gray-300"
                          style={{ backgroundColor: color.value }}
                        />
                        <div>
                          <div className="font-medium text-gray-900">{color.name}</div>
                          <div className="text-sm text-gray-600">{color.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="mb-12">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Typography System</h4>
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Heading 1 - Hero Title</h1>
                  <p className="text-gray-600">
                    48px/56px - Bold - Used for main page titles and hero sections
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Heading 2 - Section Title
                  </h2>
                  <p className="text-gray-600">
                    24px/32px - Bold - Used for section headers and card titles
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <p className="text-lg text-gray-900 mb-2">Body Large - Important Content</p>
                  <p className="text-gray-600">
                    18px/28px - Medium - Used for important descriptions and lead text
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <p className="text-base text-gray-900 mb-2">Body Regular - Standard Text</p>
                  <p className="text-gray-600">
                    16px/24px - Regular - Used for standard body text and descriptions
                  </p>
                </div>
              </div>
            </div>

            {/* Download Brand Assets */}
            <div className="bg-indigo-500 rounded-2xl p-8 text-white text-center">
              <h4 className="text-2xl font-bold mb-4">Complete Brand Asset Package</h4>
              <p className="text-blue-100 mb-6">
                Download the complete brand identity package including logos, icons, color palettes,
                and guidelines
              </p>
              <Button variant="secondary" size="xl" className="bg-white text-blue-600">
                <Download className="w-5 h-5 mr-2" />
                Download Brand Package (25MB)
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BrandIdentityGenerator
