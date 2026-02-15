# Cerebrum Design Reference

> This file contains detailed design tokens, color palettes, and visual patterns.
> Referenced from CLAUDE.md but NOT loaded into every conversation.

## Brand Identity

**Premium, Modern, Achievement-Focused** - Sophisticated SaaS-style design targeting aspirational NEET students.

## Accent Colors (Primary Palette)

| Color          | Tailwind        | Hex       | Usage                                            |
| -------------- | --------------- | --------- | ------------------------------------------------ |
| **Green 500**  | `bg-green-500`  | `#22c55e` | Success, NEET strategy, positive actions         |
| **Google Red** | `bg-[#ea4335]`  | `#ea4335` | Hearts, alerts, urgent notifications             |
| **Teal 600**   | `bg-teal-600`   | `#0d9488` | Biology-themed buttons, medical feel             |
| **Blue 600**   | `bg-blue-600`   | `#2563eb` | Links, info buttons, trust signals               |
| **Purple 700** | `bg-purple-700` | `#7c3aed` | Premium features, VIP badges                     |
| **Yellow 800** | `bg-yellow-800` | `#854d0e` | **Prominent buttons**, earthy CTAs, gold accents |

## Warning & Alert Colors

| Color       | Tailwind     | Hex       | Usage                             |
| ----------- | ------------ | --------- | --------------------------------- |
| **Red 100** | `bg-red-100` | `#fee2e2` | Warning message backgrounds       |
| **Red 200** | `bg-red-200` | `#fecaca` | Warning borders, light alerts     |
| **Red 500** | `bg-red-500` | `#ef4444` | Warning text on light backgrounds |

## Typography Style

- **Font**: Geist Sans with system fallbacks
- **Hierarchy**: Large display text (2xl-6xl) for heroes, semibold/bold for emphasis
- **Line Height**: 1.5 for body text, tighter for headings

## Visual Effects

- **Cards**: Rounded corners (0.5rem), white backgrounds, shadow-xl
- **Buttons**: Rounded-lg, hover scale (1.02x), shadow-lg on primary
- **Animations**: Fade-in-up transitions (0.4s ease-out)
- **Shadows**: shadow-lg for prominent elements, shadow-xl for cards
- **Gradients**: Dark blue-900 heroes, light pastel backgrounds for sections

## Component Style Patterns

- **Hero Sections**: Dark gradient (slate-900 to slate-800) with yellow/white text
- **Cards**: White bg, rounded-xl, shadow-xl, border-slate-200
- **Primary CTAs**: Yellow (#facc15) with hover (#fde047) - high visibility
- **Badges/Pills**: Rounded-full with colored backgrounds and 20% opacity overlays
- **Headers**: Sticky with backdrop blur (8px), semi-transparent

## Brand-Specific Colors (Custom)

| Name             | Tailwind       | Hex       |
| ---------------- | -------------- | --------- |
| Cerebrum Green   | `bg-[#4a5d4a]` | `#4a5d4a` |
| Cerebrum Dark    | `bg-[#3d4d3d]` | `#3d4d3d` |
| Cerebrum Light   | `bg-[#5a6d5a]` | `#5a6d5a` |
| Cerebrum V.Light | `bg-[#e8ede8]` | `#e8ede8` |
| Google Blue      | `bg-[#4285f4]` | `#4285f4` |
| Google Green     | `bg-[#34a853]` | `#34a853` |
| Google Red       | `bg-[#ea4335]` | `#ea4335` |
| Google Yellow    | `bg-[#fbbc04]` | `#fbbc04` |

> **Full palette reference**: Visit `/color-palette` page for all 64 approved colors.

## Allowed Gradients (8 only)

| Name                 | Tailwind Classes                                 | Usage         |
| -------------------- | ------------------------------------------------ | ------------- |
| Orange to Red        | `bg-gradient-to-r from-orange-500 to-red-500`    | Urgent CTAs   |
| Orange to Yellow     | `bg-gradient-to-r from-orange-500 to-yellow-500` | Highlights    |
| Blue 50 to Purple 50 | `bg-gradient-to-br from-blue-50 to-purple-50`    | Card BG       |
| Green 50 to Teal 50  | `bg-gradient-to-br from-green-50 to-teal-50`     | Bio sections  |
| Purple 50 to Pink 50 | `bg-gradient-to-br from-purple-50 to-pink-50`    | Premium BG    |
| Gray 50 to White     | `bg-gradient-to-b from-gray-50 to-white`         | Page sections |
| Slate 900 to 800     | `bg-gradient-to-br from-slate-900 to-slate-800`  | Dark hero     |
| Blue to Purple       | `bg-gradient-to-r from-blue-600 to-purple-600`   | CTAs, badges  |

## Responsive Design Patterns

```tsx
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3     // 1 → 2 → 3 columns
p-4 md:p-6 lg:p-8                                   // Progressive padding
text-lg md:text-xl lg:text-2xl                      // Progressive text
flex flex-col md:flex-row                           // Vertical → Horizontal
```

## Reference

- **Live Example**: https://cerebrumbiologyacademy.com/courses/intensive-neet-biology
- **Color Palette Page**: `/color-palette`
