import { getAllPosts, blogCategories } from '@/lib/blog/mdx'

export async function GET() {
  const posts = getAllPosts()
  const siteUrl = 'https://cerebrumbiologyacademy.com'

  const rssItems = posts
    .map((post) => {
      const category = blogCategories[post.category]
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>noreply@cerebrumbiologyacademy.com (${post.author.name})</author>
      <category>${category?.name || post.category}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Cerebrum Biology Academy Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Expert NEET biology preparation tips, study strategies, and success stories from Cerebrum Biology Academy. Learn from AIIMS faculty and crack NEET with confidence.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/logo.png</url>
      <title>Cerebrum Biology Academy Blog</title>
      <link>${siteUrl}/blog</link>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} Cerebrum Biology Academy</copyright>
    <managingEditor>contact@cerebrumbiologyacademy.com (Cerebrum Biology Academy)</managingEditor>
    <webMaster>contact@cerebrumbiologyacademy.com (Cerebrum Biology Academy)</webMaster>
    <category>Education</category>
    <category>NEET Preparation</category>
    <category>Biology</category>
    <ttl>60</ttl>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
