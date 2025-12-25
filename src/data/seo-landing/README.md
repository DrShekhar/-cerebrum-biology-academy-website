# SEO Landing Pages - Data Structure

## Overview

This directory contains SEO landing page content for Cerebrum Biology Academy. The content is organized into 14 category files with a total of 118 landing pages (~650KB of content).

## Files

### Content Files (Large - ~650KB total)

These files contain the full `SEOLandingContent` objects with all metadata, hero sections, FAQs, testimonials, etc.

- `class-9-content.ts` - Class 9 foundation pages (4 pages)
- `class-10-content.ts` - Class 10 foundation pages (4 pages)
- `class-11-content.ts` - Class 11 NEET pages (6 pages)
- `class-12-content.ts` - Class 12 NEET pages (6 pages)
- `dropper-content.ts` - Dropper/Repeater pages (5 pages)
- `universal-content.ts` - Universal NEET pages (5 pages)
- `ncert-content.ts` - NCERT-focused pages (8 pages)
- `topics-content.ts` - Topic-specific pages (15 pages)
- `international-content.ts` - International curriculum pages (10 pages)
- `neet-guide-content.ts` - NEET guide/info pages (17 pages)
- `resources-content.ts` - Free resources pages (10 pages)
- `chapter-notes-content.ts` - Chapter notes pages (16 pages)
- `crash-course-content.ts` - Crash course pages (6 pages)
- `comparison-content.ts` - Comparison pages (6 pages)

### Lightweight Files (Small - ~3KB)

These files contain ONLY the slugs for memory-efficient operations:

- **`slugs-static.ts`** - Pre-generated static list of all slugs (118 pages)
  - Used by `sitemap.ts` for sitemap generation
  - Updates via `npm run generate:seo-slugs`
  - Only ~3KB vs 650KB of full content

### Configuration Files

- `index.ts` - Main export point (loads all content)
- `types.ts` - TypeScript interfaces and types

## Memory Optimization

### Problem

The original sitemap generation loaded all 14 content files to extract slugs:

```typescript
// OLD - Memory intensive (650KB loaded)
import { getAllSEOSlugs } from '@/data/seo-landing'
const slugs = getAllSEOSlugs() // Loads 118 full page objects
```

This caused memory issues during build:

- 118 pages × 14 files = Heavy memory footprint
- Each page object: ~5-10KB (hero, FAQs, testimonials, etc.)
- Build process: Out of memory errors

### Solution

Use a pre-generated static slug file:

```typescript
// NEW - Memory efficient (~3KB loaded)
import { getAllSEOSlugs } from '@/data/seo-landing/slugs-static'
const slugs = getAllSEOSlugs() // Only loads string array
```

**Memory savings**: ~650KB → ~3KB (99.5% reduction)

## Usage

### For Sitemap Generation (Lightweight)

```typescript
import { getAllSEOSlugs } from '@/data/seo-landing/slugs-static'

const slugs = getAllSEOSlugs()
// Returns: string[] of 118 slugs
```

### For Page Rendering (Full Content)

```typescript
import { getSEOPageContent } from '@/data/seo-landing'

const content = getSEOPageContent('class-11-biology-tuition-online')
// Returns: Full SEOLandingContent object
```

### For Validation

```typescript
import { isValidSEOSlug } from '@/data/seo-landing/slugs-static'

if (isValidSEOSlug(slug)) {
  // Load full content
}
```

## Maintenance

### When Adding/Removing Pages

1. Edit the appropriate content file (e.g., `class-11-content.ts`)
2. Add/remove the page object with its slug
3. Run the slug regeneration script:

   ```bash
   npm run generate:seo-slugs
   ```

4. This updates `slugs-static.ts` with the new slug list
5. Commit both the content file and `slugs-static.ts`

### Regeneration Script

The script `scripts/generate-seo-slugs.js`:

- Reads all 14 content files
- Extracts slugs using regex (no JS parsing needed)
- Generates `slugs-static.ts` with categorized slugs
- Includes metadata (counts, last generated date)

### Manual Verification

```bash
# Check slug count matches
grep -h "slug:" src/data/seo-landing/*-content.ts | wc -l
# Should match SEO_SLUGS_METADATA.totalCount in slugs-static.ts
```

## Architecture Benefits

1. **Build Performance**: 99.5% memory reduction for sitemap generation
2. **Type Safety**: All slugs are typed as `readonly string[]`
3. **Category Organization**: Slugs organized by content category
4. **Validation**: Fast slug validation without loading full content
5. **Maintainability**: Single source of truth for slugs

## File Size Breakdown

| File                     | Size   | Purpose           |
| ------------------------ | ------ | ----------------- |
| slugs-static.ts          | ~3KB   | Sitemap, routing  |
| index.ts                 | ~3KB   | Full content API  |
| types.ts                 | ~4KB   | Type definitions  |
| class-9-content.ts       | ~25KB  | Class 9 pages     |
| class-10-content.ts      | ~25KB  | Class 10 pages    |
| class-11-content.ts      | ~38KB  | Class 11 pages    |
| class-12-content.ts      | ~36KB  | Class 12 pages    |
| dropper-content.ts       | ~30KB  | Dropper pages     |
| universal-content.ts     | ~30KB  | Universal pages   |
| ncert-content.ts         | ~47KB  | NCERT pages       |
| topics-content.ts        | ~82KB  | Topic pages       |
| international-content.ts | ~70KB  | International     |
| neet-guide-content.ts    | ~116KB | NEET guide pages  |
| resources-content.ts     | ~56KB  | Resources pages   |
| chapter-notes-content.ts | ~86KB  | Chapter notes     |
| crash-course-content.ts  | ~33KB  | Crash courses     |
| comparison-content.ts    | ~46KB  | Comparison pages  |
| **Total**                | ~727KB | All content       |

## Future Optimizations

1. **Lazy Loading**: Consider lazy-loading content files per category
2. **Code Splitting**: Split by route for dynamic imports
3. **Static Generation**: Pre-generate all SEO pages at build time
4. **Incremental Builds**: Only regenerate changed pages
