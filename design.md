# Design Guidelines for Cerebrum Biology Academy

## Text Visibility and Color Standards

### Issue: Text Color Visibility

The platform had persistent text visibility issues where headings and content appeared very light or barely visible against white backgrounds.

### Solution Applied

All text elements throughout the hierarchical selection and test interface now use maximum contrast colors:

#### **Text Color Hierarchy:**

- **Primary Headings** (Class/Chapter/Topic names): `text-black` + `font-semibold`
- **Question Text**: `text-black` + `font-semibold`
- **Answer Options**: `text-black` + `font-semibold` for maximum readability
- **Descriptions**: `text-gray-700` (readable medium gray)
- **Statistics/Meta**: `text-gray-600` (lighter but readable)
- **Accent Elements**: `text-blue-700` (darker blue for better contrast)

#### **Specific Components Fixed:**

1. **Class Selection Cards** (`/src/app/resources/test-generator/page.tsx:577`)
2. **Chapter Selection Cards** (`/src/app/resources/test-generator/page.tsx:637`)
3. **Topic Selection Cards** (`/src/app/resources/test-generator/page.tsx:713`)
4. **Test Question Interface** (`/src/app/resources/test-generator/page.tsx:361`)

### Implementation Notes

- Use `text-black` instead of `text-gray-900` for critical text
- Always include `font-semibold` or `font-medium` for important headings
- Avoid light gray colors (`text-gray-400`, `text-gray-500`) for primary content
- Test visibility on both light and dark backgrounds

### CSS Classes to Use

```css
/* Primary headings */
.primary-heading {
  @apply text-black font-semibold;
}

/* Secondary content */
.secondary-text {
  @apply text-gray-700 font-medium;
}

/* Meta information */
.meta-text {
  @apply text-gray-600;
}

/* Accent elements */
.accent-text {
  @apply text-blue-700 font-medium;
}
```

### Testing Checklist

- [ ] All headings visible against white backgrounds
- [ ] Text readable in both light and dark mode
- [ ] Sufficient contrast ratio (WCAG AA compliance)
- [ ] Consistent hierarchy across all pages
- [ ] Mobile and desktop visibility confirmed

## Responsive Design Standards

### Compact Interface Requirements

- Reduce padding and margins for better screen utilization
- Use smaller font sizes appropriately without sacrificing readability
- Ensure content fits on single screen without scrolling when possible
- Maintain touch-friendly tap targets (minimum 44px)

### Grid and Layout Standards

- Use consistent spacing units (4px increments)
- Maintain visual hierarchy through typography, not just color
- Ensure proper alignment and visual balance
- Test on multiple screen sizes (320px to 1920px)

## Last Updated

December 2024 - Text visibility fixes applied across all components
