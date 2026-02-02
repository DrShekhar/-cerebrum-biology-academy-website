'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  Grid,
  List,
  Copy,
  Star,
} from 'lucide-react'
import { navigationRoutes } from '@/lib/navigation'

const NavigationDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  const categories = ['all', 'learning', 'voice', 'admin', 'tools', 'student']
  const statuses = ['all', 'active', 'beta', 'coming-soon', 'maintenance']

  const filteredRoutes = navigationRoutes.filter((route) => {
    const matchesSearch =
      route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || route.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || route.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'beta':
        return <AlertCircle className="w-4 h-4 text-blue-500" />
      case 'coming-soon':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'maintenance':
        return <Settings className="w-4 h-4 text-red-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'beta':
        return 'bg-blue-100 text-blue-700'
      case 'coming-soon':
        return 'bg-yellow-100 text-yellow-700'
      case 'maintenance':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'learning':
        return 'bg-purple-100 text-purple-700'
      case 'voice':
        return 'bg-green-100 text-green-700'
      case 'ADMIN':
        return 'bg-red-100 text-red-700'
      case 'tools':
        return 'bg-blue-100 text-blue-700'
      case 'STUDENT':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const copyUrl = async (url: string) => {
    try {
      const fullUrl = `${window.location.origin}${url}`
      await navigator.clipboard.writeText(fullUrl)
      setCopiedUrl(url)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }

  const openUrl = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🚀 Platform Navigation Dashboard</h1>
        <p className="text-lg text-gray-600 mb-2">
          Central hub for all Cerebrum Biology Academy features and tools
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <span>🎯 {filteredRoutes.length} routes available</span>
          <span>•</span>
          <span>🤖 AI Voice Features Ready</span>
          <span>•</span>
          <span>📚 Multi-modal Learning</span>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search features, routes, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all'
                  ? 'All Categories'
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === 'all'
                  ? 'All Status'
                  : status
                      .split('-')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Access Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="bg-indigo-500 text-white p-6 rounded-xl cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openUrl('/test-voice')}
        >
          <h3 className="text-xl font-semibold mb-2">🎵 Voice Test Studio</h3>
          <p className="text-blue-100">Test Shekhar Sir's voice synthesis</p>
        </motion.div>

        <motion.div
          className="bg-[#4a5d4a] text-white p-6 rounded-xl cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openUrl('/voice-training')}
        >
          <h3 className="text-xl font-semibold mb-2">🎯 Voice Training</h3>
          <p className="text-green-100">Advanced voice customization</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-xl cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openUrl('/claudechat')}
        >
          <h3 className="text-xl font-semibold mb-2">🤖 ClaudeChat</h3>
          <p className="text-purple-100">AI-powered learning board</p>
        </motion.div>
      </motion.div>

      {/* Routes Grid/List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutes.map((route, index) => (
              <motion.div
                key={route.href}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{route.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">{route.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusIcon(route.status)}
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(route.status)}`}
                          >
                            {route.status
                              .split('-')
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    {route.requiresAuth && <Star className="w-4 h-4 text-yellow-500" />}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{route.description}</p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(route.category)}`}
                    >
                      {route.category}
                    </span>

                    <div className="flex items-center space-x-2">
                      <motion.button
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => copyUrl(route.href)}
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4 text-gray-600" />
                      </motion.button>

                      <motion.button
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openUrl(route.href)}
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {copiedUrl === route.href && (
                    <motion.div
                      className="mt-2 text-green-600 text-xs"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      ✓ URL copied to clipboard!
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredRoutes.map((route, index) => (
                <motion.div
                  key={route.href}
                  className="p-4 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-xl">{route.icon}</span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-800">{route.title}</h3>
                          {route.requiresAuth && <Star className="w-4 h-4 text-yellow-500" />}
                        </div>
                        <p className="text-gray-600 text-sm">{route.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusIcon(route.status)}
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(route.status)}`}
                          >
                            {route.status
                              .split('-')
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(route.category)}`}
                          >
                            {route.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <motion.button
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => copyUrl(route.href)}
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4 text-gray-600" />
                      </motion.button>

                      <motion.button
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openUrl(route.href)}
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {copiedUrl === route.href && (
                    <motion.div
                      className="mt-2 text-green-600 text-xs"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      ✓ URL copied to clipboard!
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* No Results */}
      {filteredRoutes.length === 0 && (
        <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No routes found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </motion.div>
      )}
    </div>
  )
}

export default NavigationDashboard
