# Cerebrum Biology Academy - Design System

## Overview

This design system implements a Harvard + Silicon Valley inspired visual language that combines:

- **Medical professionalism** (Navy palette)
- **Academic excellence** (Gold accents for achievements)
- **Modern engagement** (Teal for CTAs and interactive elements)

**Updated:** January 2025
**Version:** 2.0

---

## Color Palette

### Primary - Medical Navy

The navy scale serves as our foundation for professionalism, trust, and authority. Use navy for typography, backgrounds, and structural elements.

```css
--cerebrum-navy-950: #0a1628 /* Deepest text, maximum contrast */ --cerebrum-navy-900: #0f172a
  /* Primary headings, dark backgrounds */ --cerebrum-navy-800: #1e293b
  /* Subheadings, emphasis text */ --cerebrum-navy-700: #334155 /* Body text, secondary headings */
  --cerebrum-navy-600: #475569 /* Secondary text */ --cerebrum-navy-500: #64748b
  /* Muted text, placeholders */ --cerebrum-navy-400: #94a3b8 /* Disabled states, subtle text */
  --cerebrum-navy-300: #cbd5e1 /* Borders, dividers */ --cerebrum-navy-200: #e2e8f0
  /* Light borders, subtle backgrounds */ --cerebrum-navy-100: #f1f5f9
  /* Card backgrounds, sections */ --cerebrum-navy-50: #f8fafc
  /* Page backgrounds, subtle highlights */;
```

**Usage Guidelines:**

- **900-950:** Primary headings, footer/header backgrounds
- **700-800:** Body text, subheadings (WCAG AAA compliant on white)
- **500-600:** Secondary text, muted content (WCAG AA compliant)
- **300-400:** Borders, disabled states, icons
- **50-200:** Backgrounds, cards, sections

### Accent - Medical Teal

Teal represents action, engagement, and success. Use sparingly for CTAs, hover states, and interactive elements.

```css
--cerebrum-teal-900: #0f4c59 /* Dark text on light teal */ --cerebrum-teal-800: #115e67
  /* Teal text variants */ --cerebrum-teal-700: #0f766e /* Primary teal text */
  --cerebrum-teal-600: #0d9488 /* Main CTA buttons */ --cerebrum-teal-500: #14b8a6
  /* Hover states, active elements */ --cerebrum-teal-400: #2dd4bf /* Bright accents */
  --cerebrum-teal-300: #5eead4 /* Light accents */ --cerebrum-teal-200: #99f6e4
  /* Very light backgrounds */ --cerebrum-teal-100: #ccfbf1 /* Subtle highlights */
  --cerebrum-teal-50: #f0fdfa /* Background tints */;
```

**Usage Guidelines:**

- **600-700:** Primary CTA buttons, links, active states
- **400-500:** Hover states, progress indicators
- **50-300:** Highlights, success messages, light backgrounds
- **DO NOT** overuse - teal should be intentional and purposeful

### Achievement - Academic Gold

Gold signifies excellence, premium features, and achievements. Reserve for badges, awards, and premium indicators.

```css
--cerebrum-gold-900: #78350f /* Dark gold text */ --cerebrum-gold-800: #92400e
  /* Gold text variants */ --cerebrum-gold-700: #b45309 /* Primary gold text */
  --cerebrum-gold-600: #d97706 /* Main gold accents */ --cerebrum-gold-500: #f59e0b
  /* Bright gold */ --cerebrum-gold-400: #fbbf24 /* Achievement highlights */
  --cerebrum-gold-300: #fcd34d /* Light gold accents */ --cerebrum-gold-200: #fde68a
  /* Very light gold */ --cerebrum-gold-100: #fef3c7 /* Gold backgrounds */
  --cerebrum-gold-50: #fffbeb /* Subtle gold tint */;
```

**Usage Guidelines:**

- **600-700:** Achievement badges, premium indicators, award icons
- **400-500:** Gold buttons (sparingly), featured content
- **50-300:** Premium card backgrounds, achievement highlights
- **ONLY** use for: Top performers, premium features, awards, special recognition

---

## When to Use Each Color

### Medical Navy (Primary)

- ✅ All typography (headings, body text, captions)
- ✅ Navigation bars, footers, headers
- ✅ Card structures, containers
- ✅ Borders, dividers
- ✅ Icon default states
- ✅ Background layers

### Medical Teal (Accent)

- ✅ Primary CTA buttons ("Enroll Now", "Start Learning")
- ✅ Links and hyperlinks
- ✅ Active navigation states
- ✅ Form focus states
- ✅ Success messages
- ✅ Progress indicators
- ❌ Large background areas
- ❌ Body text
- ❌ Decorative elements without purpose

### Academic Gold (Achievement)

- ✅ Top student badges
- ✅ Achievement indicators (e.g., "94.2% NEET Success Rate")
- ✅ Premium course indicators
- ✅ Award and recognition icons
- ✅ Featured/spotlight content (minimal use)
- ❌ Regular buttons
- ❌ Standard text
- ❌ Common UI elements
- ❌ Frequent/repeating elements

---

## Approved Gradients

All gradients should be **monochromatic** (single color family) for visual cohesion.

### Primary Gradient (Navy)

```css
background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
```

**Use for:** Button hover states, dark hero sections, premium card headers

### Success Gradient (Teal)

```css
background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
```

**Use for:** CTA buttons, success states, progress completion

### Premium Gradient (Gold)

```css
background: linear-gradient(135deg, #b45309 0%, #f59e0b 100%);
```

**Use for:** Achievement badges, premium indicators, special recognition elements

### Hero Gradient (Light Navy)

```css
background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
```

**Use for:** Hero section backgrounds, large page sections

**RULES:**

- ❌ NO multi-color gradients (e.g., navy-to-teal)
- ❌ NO rainbow gradients
- ❌ NO more than 2 stops per gradient
- ✅ Keep angles consistent: 135deg (diagonal) or 180deg (vertical)

---

## Shadow System

Consistent shadow hierarchy creates depth and visual hierarchy.

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
```

### Usage Guidelines

| Shadow | Usage                            | Example                         |
| ------ | -------------------------------- | ------------------------------- |
| `xs`   | Subtle borders, minimal depth    | Input fields, text boxes        |
| `sm`   | Small cards, buttons             | Notification cards, chips       |
| `md`   | Standard cards, dropdowns        | Course cards, info panels       |
| `lg`   | Modal dialogs, raised sections   | Pop-up modals, featured cards   |
| `xl`   | Hero elements, sticky navigation | Main hero section, floating nav |

**Legacy Support:**

- `--shadow-soft` maps to `--shadow-md`
- `--shadow-premium` maps to `--shadow-xl`

---

## Border Radius Standards

Consistent border radius creates visual harmony.

```css
--radius-sm: 0.375rem /* 6px - Small elements */ --radius-md: 0.5rem /* 8px - Standard elements */
  --radius-lg: 0.75rem /* 12px - Cards, buttons */ --radius-xl: 1rem /* 16px - Large cards */
  --radius-2xl: 1.5rem /* 24px - Hero sections, modals */;
```

### Usage Guidelines

- **sm (6px):** Badges, tags, small chips
- **md (8px):** Input fields, small buttons
- **lg (12px):** Standard buttons, small cards
- **xl (16px):** Medium/large cards, dropdowns
- **2xl (24px):** Hero cards, modal dialogs, major sections

---

## Typography Hierarchy

Using the navy scale for text ensures readability and hierarchy.

```css
/* Headings */
h1 {
  color: var(--cerebrum-navy-950);
} /* Largest headings */
h2 {
  color: var(--cerebrum-navy-900);
} /* Section headings */
h3 {
  color: var(--cerebrum-navy-800);
} /* Subsection headings */

/* Body Text */
body {
  color: var(--cerebrum-navy-700);
} /* Main body text */
p.secondary {
  color: var(--cerebrum-navy-600);
} /* Secondary text */
p.muted {
  color: var(--cerebrum-navy-500);
} /* Muted/helper text */

/* Interactive */
a {
  color: var(--cerebrum-teal-600);
} /* Links */
a:hover {
  color: var(--cerebrum-teal-700);
} /* Link hover */
```

**WCAG Compliance:**

- Navy 950-700: **AAA** on white backgrounds
- Navy 600-500: **AA** on white backgrounds
- Always test color contrast for accessibility

---

## Component Color Patterns

### Buttons

**Primary CTA (Teal)**

```css
background: var(--cerebrum-teal-600);
color: white;
```

```css
/* Hover */
background: var(--cerebrum-teal-700);
```

**Secondary (Navy Outline)**

```css
border: 2px solid var(--cerebrum-navy-600);
color: var(--cerebrum-navy-900);
background: transparent;
```

**Premium/Achievement (Gold - Use Sparingly)**

```css
background: var(--cerebrum-gold-600);
color: white;
```

### Cards

**Standard Card**

```css
background: white;
border: 1px solid var(--cerebrum-navy-200);
border-radius: var(--radius-xl);
box-shadow: var(--shadow-md);
```

**Featured Card**

```css
background: var(--cerebrum-navy-50);
border: 2px solid var(--cerebrum-teal-200);
border-radius: var(--radius-xl);
box-shadow: var(--shadow-lg);
```

**Achievement Card**

```css
background: var(--cerebrum-gold-50);
border: 2px solid var(--cerebrum-gold-200);
border-radius: var(--radius-xl);
box-shadow: var(--shadow-lg);
```

### Forms

**Input Fields**

```css
background: white;
border: 1px solid var(--cerebrum-navy-300);
border-radius: var(--radius-md);
color: var(--cerebrum-navy-900);
```

```css
/* Focus */
border-color: var(--cerebrum-teal-600);
box-shadow: 0 0 0 3px var(--cerebrum-teal-100);
```

**Error State**

```css
border-color: #ef4444; /* red-500 */
```

**Success State**

```css
border-color: var(--cerebrum-teal-600);
```

---

## Accessibility Guidelines

1. **Color Contrast**
   - Use navy 700+ for body text (WCAG AAA)
   - Use navy 500+ for secondary text (WCAG AA minimum)
   - Never use navy 400 or lighter for text under 18px

2. **Interactive Elements**
   - Minimum touch target: 44x44px
   - Clear hover/focus states using teal
   - Focus rings: 3px solid teal-100 with teal-600 border

3. **Color Blindness**
   - Never rely on color alone to convey information
   - Use icons, labels, and patterns alongside color
   - Navy/teal/gold palette is deuteranopia-friendly

---

## Migration from Old System

### Color Replacements

| Old Variable                    | New Variable        | Notes                  |
| ------------------------------- | ------------------- | ---------------------- |
| `--cerebrum-royal-blue-*`       | `--cerebrum-navy-*` | Direct replacement     |
| `--cerebrum-medical-green-*`    | `--cerebrum-teal-*` | Green → Teal           |
| `--cerebrum-alert-orange-*`     | `--cerebrum-teal-*` | Orange → Teal for CTAs |
| `--cerebrum-achievement-gold-*` | `--cerebrum-gold-*` | Direct replacement     |

### Removed Colors

- ❌ Royal Blue (replaced with Navy)
- ❌ Medical Green (replaced with Teal)
- ❌ Alert Orange (replaced with Teal for urgency/CTAs)
- ❌ Purple variants (removed entirely)
- ❌ Saffron (removed from Tailwind config)

---

## Examples in Practice

### ✅ Correct Usage

**Enrollment CTA Button**

```jsx
<button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg shadow-md">
  Enroll Now
</button>
```

**Achievement Badge**

```jsx
<div className="bg-gold-50 border-2 border-gold-200 rounded-lg p-4">
  <span className="text-gold-700 font-bold">94.2% NEET Success Rate</span>
</div>
```

**Standard Course Card**

```jsx
<div className="bg-white border border-navy-200 rounded-xl p-6 shadow-md">
  <h3 className="text-navy-900 text-xl font-bold">NEET 2025 Batch</h3>
  <p className="text-navy-600 mt-2">Comprehensive Biology preparation</p>
</div>
```

### ❌ Incorrect Usage

**DON'T: Multi-color gradient**

```css
/* ❌ Avoid */
background: linear-gradient(135deg, navy-900, teal-600, gold-500);
```

**DON'T: Gold for regular buttons**

```jsx
/* ❌ Avoid - Gold is for achievements only */
<button className="bg-gold-600">Submit Form</button>
```

**DON'T: Teal for large backgrounds**

```jsx
/* ❌ Avoid - Too visually heavy */
<section className="bg-teal-500 min-h-screen">
```

---

## Design Tokens Reference

### Quick Reference Table

| Token                 | Value       | Usage                              |
| --------------------- | ----------- | ---------------------------------- |
| `--cerebrum-navy-900` | `#0f172a`   | Primary headings, dark backgrounds |
| `--cerebrum-navy-700` | `#334155`   | Body text, secondary headings      |
| `--cerebrum-teal-600` | `#0d9488`   | Primary CTA buttons, links         |
| `--cerebrum-gold-600` | `#d97706`   | Achievement badges, premium        |
| `--shadow-md`         | (see above) | Standard card shadow               |
| `--shadow-lg`         | (see above) | Modal/elevated shadow              |
| `--radius-lg`         | `0.75rem`   | Standard button/card radius        |
| `--radius-xl`         | `1rem`      | Large card radius                  |

---

## Testing Checklist

Before launching any UI changes:

- [ ] Verify all text meets WCAG AA minimum (navy-500+)
- [ ] Check that headings use navy-900 or navy-950
- [ ] Ensure CTAs use teal-600 (not gold or navy)
- [ ] Confirm gold is used ONLY for achievements
- [ ] Test color blindness using browser tools
- [ ] Validate focus states are visible (teal ring)
- [ ] Check hover states are distinct from default
- [ ] Ensure mobile touch targets are 44x44px minimum
- [ ] Verify gradients are monochromatic
- [ ] Test dark mode compatibility (if applicable)

---

## Support & Questions

For questions about the design system:

- Review this document first
- Check the component library examples
- Consult the Tailwind config for available utilities
- Test in browser before committing changes

**Last Updated:** January 2025
**Maintained by:** Cerebrum Biology Academy Development Team
