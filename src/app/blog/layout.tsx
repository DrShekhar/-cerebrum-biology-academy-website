import { BlogCategoryNav } from '@/components/blog/BlogCategoryNav'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogCategoryNav />
      {children}
    </>
  )
}
