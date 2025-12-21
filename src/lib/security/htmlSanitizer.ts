/**
 * HTML Sanitization Utility
 * Prevents XSS attacks by sanitizing HTML content before rendering
 */

// Allowed HTML tags for different content types
const ALLOWED_TAGS: Record<string, string[]> = {
  // For rich text content (announcements, blog posts, etc.)
  richText: [
    'p',
    'br',
    'b',
    'i',
    'u',
    'strong',
    'em',
    'span',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
    'a',
    'blockquote',
    'code',
    'pre',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'img',
    'figure',
    'figcaption',
    'div',
    'section',
    'article',
    'sup',
    'sub',
    'mark',
    'small',
  ],
  // For simple text with basic formatting
  basic: ['p', 'br', 'b', 'i', 'u', 'strong', 'em', 'span', 'a'],
  // For inline text only
  inline: ['b', 'i', 'u', 'strong', 'em', 'span', 'a', 'br'],
}

// Allowed attributes per tag
const ALLOWED_ATTRS: Record<string, string[]> = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
  span: ['class', 'style'],
  div: ['class', 'style'],
  p: ['class', 'style'],
  table: ['class', 'style'],
  td: ['colspan', 'rowspan', 'class'],
  th: ['colspan', 'rowspan', 'class'],
  '*': ['class', 'id'], // Allowed on all tags
}

// Patterns that indicate potentially malicious content
const DANGEROUS_PATTERNS = [
  /javascript:/gi,
  /vbscript:/gi,
  /data:/gi,
  /on\w+\s*=/gi, // onclick=, onerror=, etc.
  /<script/gi,
  /<\/script>/gi,
  /<iframe/gi,
  /<object/gi,
  /<embed/gi,
  /<form/gi,
  /expression\s*\(/gi, // CSS expression()
  /url\s*\(\s*["']?\s*javascript:/gi,
]

// Safe URL protocols
const SAFE_URL_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:']

/**
 * Check if a URL is safe
 */
function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url, 'https://example.com')
    return SAFE_URL_PROTOCOLS.some((protocol) => parsed.protocol === protocol)
  } catch {
    // Relative URLs are generally safe
    return url.startsWith('/') || url.startsWith('#') || !url.includes(':')
  }
}

/**
 * Remove dangerous patterns from HTML
 */
function removeDangerousPatterns(html: string): string {
  let sanitized = html

  for (const pattern of DANGEROUS_PATTERNS) {
    sanitized = sanitized.replace(pattern, '')
  }

  return sanitized
}

/**
 * Sanitize HTML attributes
 */
function sanitizeAttributes(tag: string, attrs: string): string {
  const allowedForTag = [...(ALLOWED_ATTRS[tag] || []), ...(ALLOWED_ATTRS['*'] || [])]

  // Parse attributes
  const attrRegex = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/g
  const sanitizedAttrs: string[] = []

  let match
  while ((match = attrRegex.exec(attrs)) !== null) {
    const attrName = match[1].toLowerCase()
    const attrValue = match[2] || match[3] || match[4] || ''

    // Only allow whitelisted attributes
    if (!allowedForTag.includes(attrName)) {
      continue
    }

    // Special handling for href/src attributes
    if ((attrName === 'href' || attrName === 'src') && !isSafeUrl(attrValue)) {
      continue
    }

    // Special handling for style attribute - remove dangerous CSS
    if (attrName === 'style') {
      const safeStyle = attrValue
        .replace(/expression\s*\(/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/url\s*\(/gi, 'url(')
      sanitizedAttrs.push(`${attrName}="${escapeHtml(safeStyle)}"`)
      continue
    }

    // Add rel="noopener noreferrer" to external links
    if (attrName === 'href' && attrValue.startsWith('http')) {
      sanitizedAttrs.push(`${attrName}="${escapeHtml(attrValue)}"`)
      if (!attrs.includes('rel=')) {
        sanitizedAttrs.push('rel="noopener noreferrer"')
      }
      continue
    }

    sanitizedAttrs.push(`${attrName}="${escapeHtml(attrValue)}"`)
  }

  return sanitizedAttrs.join(' ')
}

/**
 * Escape HTML entities
 */
export function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  }

  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char)
}

/**
 * Main sanitize function
 * @param html - Raw HTML string to sanitize
 * @param mode - Sanitization mode: 'richText', 'basic', or 'inline'
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(
  html: string | null | undefined,
  mode: 'richText' | 'basic' | 'inline' = 'richText'
): string {
  if (!html) return ''

  // First pass: remove obviously dangerous patterns
  let sanitized = removeDangerousPatterns(html)

  const allowedTags = ALLOWED_TAGS[mode]

  // Second pass: process tags
  // Match opening tags, closing tags, and self-closing tags
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\s*([^>]*)?\/?>/g

  sanitized = sanitized.replace(tagRegex, (match, tagName, attrs = '') => {
    const tag = tagName.toLowerCase()

    // Check if tag is allowed
    if (!allowedTags.includes(tag)) {
      // For disallowed tags, just remove the tag but keep content
      return ''
    }

    // Handle closing tags
    if (match.startsWith('</')) {
      return `</${tag}>`
    }

    // Handle opening/self-closing tags
    const sanitizedAttrs = sanitizeAttributes(tag, attrs)
    const isSelfClosing = match.endsWith('/>')

    if (sanitizedAttrs) {
      return isSelfClosing ? `<${tag} ${sanitizedAttrs} />` : `<${tag} ${sanitizedAttrs}>`
    }

    return isSelfClosing ? `<${tag} />` : `<${tag}>`
  })

  return sanitized.trim()
}

/**
 * Sanitize content for JSON-LD structured data
 * Ensures content is safe for embedding in script tags
 */
export function sanitizeForJsonLd(data: unknown): string {
  const jsonString = JSON.stringify(data)

  // Prevent script injection in JSON-LD
  return jsonString
    .replace(/<\/script>/gi, '<\\/script>')
    .replace(/<!--/g, '')
    .replace(/-->/g, '')
}

/**
 * Strip all HTML tags, keeping only text content
 */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return ''

  return html
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&nbsp;/g, ' ') // Replace nbsp with space
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
}

/**
 * Create a safe HTML props object for dangerouslySetInnerHTML
 */
export function createSafeHtml(
  html: string | null | undefined,
  mode: 'richText' | 'basic' | 'inline' = 'richText'
): { __html: string } {
  return { __html: sanitizeHtml(html, mode) }
}

export default {
  sanitizeHtml,
  sanitizeForJsonLd,
  stripHtml,
  escapeHtml,
  createSafeHtml,
}
