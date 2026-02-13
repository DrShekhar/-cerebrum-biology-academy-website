'use client'

export interface GalleryCategory {
  value: string
  label: string
  icon: string
  count?: number
}

interface GalleryFiltersProps {
  categories: GalleryCategory[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  totalCount?: number
}

export function GalleryFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  totalCount,
}: GalleryFiltersProps) {
  const allCategories: GalleryCategory[] = [
    { value: 'all', label: 'All', icon: '✨', count: totalCount },
    ...categories,
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
      {allCategories.map((category) => {
        const isSelected =
          category.value === 'all' ? selectedCategory === null : selectedCategory === category.value

        return (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value === 'all' ? null : category.value)}
            className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all md:px-5 md:py-2.5 md:text-base ${
              isSelected
                ? 'bg-[#3d4d3d] text-white shadow-lg'
                : 'bg-white text-gray-700 shadow-md hover:bg-gray-50 hover:shadow-lg'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
            {category.count !== undefined && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {category.count}
              </span>
            )}

            {/* Active indicator */}
            {isSelected && (
              <div
                layoutId="activeCategory"
                className="absolute inset-0 rounded-full bg-[#3d4d3d] animate-fadeInUp"
                style={{ zIndex: -1 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
