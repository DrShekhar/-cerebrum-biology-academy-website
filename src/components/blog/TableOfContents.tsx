'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ListBulletIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { TableOfContentsItem } from '@/types/blog'

interface TableOfContentsProps {
  items: TableOfContentsItem[]
  title?: string
}

export function TableOfContents({ items, title = 'Table of Contents' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0% -80% 0%',
        threshold: 0,
      }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
    setIsOpen(false)
  }

  if (!items || items.length === 0) return null

  return (
    <>
      {/* Desktop TOC - Sidebar */}
      <nav className="hidden xl:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ListBulletIcon className="w-4 h-4" />
          {title}
        </h4>
        <ul className="space-y-2 border-l-2 border-gray-200">
          {items.map((item) => (
            <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12 + 12}px` }}>
              <button
                onClick={() => handleClick(item.id)}
                className={`block text-left text-sm py-1 transition-colors duration-200 hover:text-blue-600 ${
                  activeId === item.id
                    ? 'text-blue-600 font-medium border-l-2 border-blue-600 -ml-[2px] pl-[14px]'
                    : 'text-gray-600'
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile TOC - Floating Button + Drawer */}
      <div className="xl:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 z-40 flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-3 border border-gray-200 hover:shadow-xl transition-shadow"
        >
          <ListBulletIcon className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Contents</span>
          <ChevronDownIcon className="w-4 h-4 text-gray-500" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[70vh] overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <ListBulletIcon className="w-5 h-5" />
                    {title}
                  </h4>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="overflow-y-auto max-h-[calc(70vh-60px)] p-4">
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => handleClick(item.id)}
                          className={`w-full text-left py-3 px-4 rounded-lg transition-colors ${
                            activeId === item.id
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          style={{ paddingLeft: `${(item.level - 2) * 16 + 16}px` }}
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
