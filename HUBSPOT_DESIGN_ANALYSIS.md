# HubSpot-Inspired Design Analysis for Cerebrum Biology Academy Counselor Dashboard

**Project:** Counselor Dashboard (CRM-CDA-2025)
**Prepared For:** Cerebrum Biology Academy
**Design Philosophy:** "HubSpot Quality, WhatsApp-First, Education-Focused"
**Date:** November 10, 2025

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [HubSpot CRM Analysis](#hubspot-crm-analysis)
3. [Design System Foundation](#design-system-foundation)
4. [Component Pattern Library](#component-pattern-library)
5. [Interaction Patterns](#interaction-patterns)
6. [WhatsApp-First Adaptations](#whatsapp-first-adaptations)
7. [Layout & Information Architecture](#layout--information-architecture)
8. [Accessibility Guidelines](#accessibility-guidelines)
9. [Implementation Guide (Tailwind CSS)](#implementation-guide-tailwind-css)

---

## Executive Summary

### Design Goals

This document provides comprehensive UI/UX guidelines for building a **HubSpot-quality counselor dashboard** tailored for Cerebrum Biology Academy's education CRM. The design balances:

- **Professional aesthetics** (HubSpot-inspired clean interface)
- **WhatsApp-first communication** (Green accents, chat-like patterns)
- **Education context** (Student lead management focus)
- **Mobile responsiveness** (Counselors work on phones)
- **Data density** (Show lots without overwhelming)

### Key Design Principles

1. **Clarity Over Complexity** - Every element serves a clear purpose
2. **Quick Actions** - Critical tasks accessible in 1-2 clicks
3. **Visual Hierarchy** - Colors and typography guide attention
4. **Consistent Patterns** - Reusable components across all screens
5. **Mobile-First** - Responsive design from the ground up
6. **WhatsApp Integration** - Seamless communication workflows

---

## HubSpot CRM Analysis

### 1. Dashboard Layout

#### Main Dashboard Structure

HubSpot uses a **three-panel layout** for maximum flexibility:

```
┌─────────────────────────────────────────────────────┐
│  Top Navigation Bar (Fixed)                         │
├──────┬──────────────────────────────┬───────────────┤
│      │                              │               │
│ Left │   Middle Column             │  Right        │
│ Side │   (Primary Content)         │  Sidebar      │
│ bar  │                              │  (Context)    │
│      │                              │               │
│ Nav  │   • Tabs                    │  • Quick      │
│      │   • Cards                   │    Actions    │
│ Menu │   • Timeline                │  • Props      │
│      │   • Tables                  │  • Recent     │
│      │                              │               │
└──────┴──────────────────────────────┴───────────────┘
```

**Key Characteristics:**

- **Left Sidebar (240px):** Collapsible navigation menu with icons
- **Middle Column (Flexible):** Main content area, 60-70% width
- **Right Sidebar (320px):** Contextual information, collapsible
- **Top Bar (64px height):** Global actions, search, notifications

#### Dashboard Grid System

- **Desktop:** 12-column grid with 24px gutters
- **Tablet:** 8-column grid with 16px gutters
- **Mobile:** 4-column grid with 12px gutters

### 2. Pipeline Board (Kanban)

HubSpot's deal pipeline uses a **horizontal scrolling Kanban board**:

```
┌────────────┬────────────┬────────────┬────────────┬─────────────┐
│  New Lead  │ Demo Booked│   Offer    │  Payment   │  Enrolled   │
│  (12)      │    (8)     │    (5)     │    (3)     │     (2)     │
├────────────┼────────────┼────────────┼────────────┼─────────────┤
│  ┌──────┐  │  ┌──────┐  │  ┌──────┐  │  ┌──────┐  │  ┌──────┐   │
│  │ Card │  │  │ Card │  │  │ Card │  │  │ Card │  │  │ Card │   │
│  └──────┘  │  └──────┘  │  └──────┘  │  └──────┘  │  └──────┘   │
│  ┌──────┐  │  ┌──────┐  │  ┌──────┐  │            │             │
│  │ Card │  │  │ Card │  │  │ Card │  │            │             │
│  └──────┘  │  └──────┘  │  └──────┘  │            │             │
└────────────┴────────────┴────────────┴────────────┴─────────────┘
```

**Design Specifications:**

- **Column Width:** 320px minimum, 380px optimal
- **Column Spacing:** 16px gap between columns
- **Column Header:** 56px height with stage name + count
- **Card Spacing:** 12px gap between cards vertically
- **Drag Handle:** Visible on hover, left edge of card
- **Empty State:** "No leads in this stage" placeholder

**Board Features:**

- Horizontal scroll with scroll indicators
- Stage names with lead counts in badges
- Color-coded stage headers
- Add lead button (+) in each column header
- Filter and search bar above board
- Compact/Expanded view toggle

### 3. Contact/Lead Detail Pages

HubSpot's record pages follow a **comprehensive three-section layout**:

#### Left Sidebar (Property Cards)

- **Contact/Lead Information Card**
  - Name (H2 heading)
  - Primary properties (email, phone, course)
  - Edit inline capability
  - Property groups (collapsible sections)

- **Communication Subscriptions**
  - WhatsApp opt-in status
  - Email preferences
  - SMS consent

- **Quick Actions Panel**
  - Send WhatsApp
  - Schedule Call
  - Create Task
  - Generate Offer

#### Middle Column (Tabs)

1. **Overview Tab**
   - Data highlights (key metrics)
   - Recent communications (last 5)
   - Associations (enrolled courses, fee plans)
   - Activity summary

2. **Activities Tab**
   - Chronological timeline
   - Filter by type (calls, emails, WhatsApp, tasks)
   - Inline activity creation
   - Rich formatting (attachments, images)

3. **Offers Tab** (Custom)
   - Active offers
   - Expired offers
   - Offer acceptance rate

4. **Payments Tab** (Custom)
   - Fee plan details
   - Installment schedule
   - Payment history
   - Overdue alerts

#### Right Sidebar (Context Cards)

- **About This Lead**
  - Source (web form, referral)
  - First contact date
  - Last activity date
  - Days in current stage

- **Assigned Counselor**
  - Avatar + name
  - Contact info
  - Reassign option

- **Related Records**
  - Parent/guardian details
  - Enrolled siblings
  - Previous courses

### 4. Communication Timeline

HubSpot displays activity in a **vertical timeline** format:

```
┌──────────────────────────────────────────┐
│  Filter: [All] [WhatsApp] [Email] [Call]│
├──────────────────────────────────────────┤
│  Today                                   │
│  ●───┐                                   │
│      │ WhatsApp Message • 2:30 PM       │
│      │ You: "Hi Priya, following up..." │
│      │ [View full conversation →]       │
│      │                                   │
│  ●───┤                                   │
│      │ Task Completed • 11:00 AM        │
│      │ "Send fee plan to lead"          │
│      │ Completed by: Ravi               │
│      │                                   │
│  Yesterday                               │
│  ●───┤                                   │
│      │ Demo Scheduled • 4:45 PM         │
│      │ Date: Nov 12, 2025 at 6:00 PM    │
│      │ Platform: Google Meet            │
│      │                                   │
│  ●───┘                                   │
└──────────────────────────────────────────┘
```

**Timeline Specifications:**

- **Timeline Line:** 2px width, left-aligned (32px from edge)
- **Activity Dot:** 12px circle, colored by type
- **Activity Card:** White background, 8px border radius
- **Spacing:** 16px between activities
- **Timestamp:** Gray text, right-aligned
- **Grouping:** By date (Today, Yesterday, This Week, Earlier)

**Activity Colors:**

- WhatsApp: `#25D366` (green dot)
- Email: `#3B82F6` (blue dot)
- Call: `#8B5CF6` (purple dot)
- Task: `#F59E0B` (amber dot)
- Note: `#6B7280` (gray dot)

### 5. Task Management

HubSpot's task interface uses a **list view with inline actions**:

#### Task List Layout

```
┌────────────────────────────────────────────────────────┐
│  My Tasks (24)  [+ New Task]     [Filter ▼] [Sort ▼]  │
├────────────────────────────────────────────────────────┤
│  Overdue (3)                                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ☐  🔴 Follow up with Priya Sharma                │  │
│  │     Due: Nov 8 • Priority: High • Lead: PR-123   │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ☐  🔴 Send payment reminder to Arjun Kumar       │  │
│  │     Due: Nov 9 • Priority: High • Lead: AR-456   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  Today (5)                                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ☐  🟡 Create fee plan for Sneha Reddy            │  │
│  │     Due: Nov 10 • Priority: Medium • Lead: SN-789│  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

**Task Card Components:**

- **Checkbox:** 20px, left-aligned, custom styled
- **Priority Indicator:** Emoji or colored dot (🔴 High, 🟡 Medium, ⚪ Low)
- **Task Title:** Font weight 600, 16px
- **Metadata:** 14px, gray text (due date, priority, associated lead)
- **Hover Actions:** Edit, Delete, Reschedule (right side)
- **Quick Complete:** Check checkbox to complete

**Task Groupings:**

1. Overdue (red badge)
2. Today (blue badge)
3. Tomorrow
4. This Week
5. Later

### 6. Quick Actions

HubSpot makes frequent actions instantly accessible:

#### Quick Action Patterns

1. **Floating Action Button (FAB)**
   - Bottom right corner (24px from edges)
   - 56px circle, primary color
   - "+" icon, expands to action menu

2. **Inline Actions (Hover)**
   - Appear on card hover
   - Right-aligned icon buttons
   - 32px touch targets
   - Common actions: Edit, Delete, Assign, Move

3. **Context Menus (Right-Click)**
   - Appears near cursor
   - Max 8 actions per menu
   - Grouped by category (dividers)

4. **Keyboard Shortcuts**
   - Visual indicators (tooltips show shortcuts)
   - Common: `C` (Create), `E` (Edit), `D` (Delete)

### 7. Navigation

HubSpot uses a **hybrid navigation** system:

#### Primary Navigation (Left Sidebar)

```
┌─────────────────┐
│  [≡] Dashboard  │  ← Collapsible hamburger
├─────────────────┤
│  📊 Dashboard   │  ← Active state (highlighted)
│  👥 Leads       │
│  💬 Messages    │
│  ✅ Tasks       │
│  📈 Analytics   │
│  ⚙️ Settings    │
├─────────────────┤
│  [User Avatar]  │  ← Bottom aligned
│  Ravi Kumar     │
│  Counselor      │
└─────────────────┘
```

**Navigation Specs:**

- **Item Height:** 44px (optimal touch target)
- **Icon Size:** 20px, 12px margin-right
- **Font Size:** 15px, medium weight
- **Active State:** Blue background (50 opacity), blue text, blue left border (3px)
- **Hover State:** Gray background (100 opacity)
- **Collapsed State:** Show only icons (56px width)

#### Breadcrumbs (Top Bar)

```
Dashboard / Leads / Priya Sharma (PR-123)
           ↑ Clickable     ↑ Current page (not clickable)
```

**Breadcrumb Specs:**

- **Font Size:** 14px
- **Separator:** `/` with 8px spacing
- **Color:** Gray for clickable, dark for current
- **Max Items:** 4 levels, truncate with `...`

### 8. Color Usage

HubSpot uses colors **semantically** to indicate status and priority:

#### Color Meanings

| Color            | Hex       | Usage               | HubSpot Context                  |
| ---------------- | --------- | ------------------- | -------------------------------- |
| **Coral**        | `#FF7A59` | Primary brand, CTAs | Main action buttons              |
| **Blue**         | `#3B82F6` | Information, links  | Email activities, info badges    |
| **Green**        | `#10B981` | Success, completed  | Completed tasks, enrolled        |
| **Yellow/Amber** | `#F59E0B` | Warning, pending    | Pending actions, medium priority |
| **Red**          | `#EF4444` | Danger, overdue     | Overdue tasks, critical alerts   |
| **Purple**       | `#8B5CF6` | Special actions     | Calls, meetings                  |
| **Gray**         | `#6B7280` | Neutral, inactive   | Disabled states, notes           |

#### Status Color Mapping (for Cerebrum)

| Lead Stage      | Color                           | Badge Style |
| --------------- | ------------------------------- | ----------- |
| New Lead        | `bg-blue-100 text-blue-700`     | Soft blue   |
| Demo Booked     | `bg-purple-100 text-purple-700` | Soft purple |
| Offer Sent      | `bg-amber-100 text-amber-700`   | Soft amber  |
| Payment Pending | `bg-orange-100 text-orange-700` | Soft orange |
| Enrolled        | `bg-green-100 text-green-700`   | Soft green  |
| Lost            | `bg-gray-100 text-gray-700`     | Soft gray   |

#### Priority Colors

| Priority | Color            | Indicator         |
| -------- | ---------------- | ----------------- |
| Hot 🔥   | `text-red-600`   | Red dot + emoji   |
| Warm ☀️  | `text-amber-600` | Amber dot + emoji |
| Cold ❄️  | `text-blue-600`  | Blue dot + emoji  |

### 9. Typography

HubSpot uses clean, modern sans-serif fonts with clear hierarchy:

#### Font Family

- **Primary:** `"Urbanist"` (for Cerebrum, modern and readable)
- **Fallback:** `"Inter", "Helvetica Neue", Arial, sans-serif`
- **Monospace:** `"JetBrains Mono", "Courier New", monospace` (for codes, IDs)

#### Type Scale (Desktop)

| Element             | Size | Weight | Line Height | Tailwind Class            |
| ------------------- | ---- | ------ | ----------- | ------------------------- |
| **H1** (Page Title) | 32px | 700    | 1.2         | `text-3xl font-bold`      |
| **H2** (Section)    | 24px | 600    | 1.3         | `text-2xl font-semibold`  |
| **H3** (Card Title) | 20px | 600    | 1.4         | `text-xl font-semibold`   |
| **H4** (Subsection) | 18px | 600    | 1.4         | `text-lg font-semibold`   |
| **Body Large**      | 16px | 400    | 1.5         | `text-base`               |
| **Body**            | 15px | 400    | 1.6         | `text-[15px]`             |
| **Body Small**      | 14px | 400    | 1.5         | `text-sm`                 |
| **Caption**         | 13px | 400    | 1.4         | `text-xs`                 |
| **Tiny**            | 12px | 500    | 1.3         | `text-[12px] font-medium` |

#### Type Scale (Mobile)

| Element   | Size (Mobile) | Adjustment |
| --------- | ------------- | ---------- |
| **H1**    | 28px          | -4px       |
| **H2**    | 22px          | -2px       |
| **H3**    | 18px          | -2px       |
| **Body**  | 15px          | Same       |
| **Small** | 14px          | Same       |

#### Font Weight Usage

- **700 (Bold):** Page titles, critical data
- **600 (Semibold):** Headings, labels, emphasized text
- **500 (Medium):** Badges, tags, metadata
- **400 (Normal):** Body text, descriptions

### 10. Spacing & Density

HubSpot balances **information density** with **breathing room**:

#### Spacing Scale (Tailwind)

```
4px   (space-1)   - Tight spacing (icon + text)
8px   (space-2)   - Component internal padding
12px  (space-3)   - Card internal padding
16px  (space-4)   - Section spacing
20px  (space-5)   - Large component padding
24px  (space-6)   - Card spacing, gutters
32px  (space-8)   - Section separation
48px  (space-12)  - Major section breaks
64px  (space-16)  - Page-level spacing
```

#### Density Levels

**Compact Mode** (Mobile, dense data):

- Card padding: 12px
- Row height: 40px
- Font size: 14px
- Line height: 1.4

**Normal Mode** (Desktop default):

- Card padding: 16px
- Row height: 48px
- Font size: 15px
- Line height: 1.5

**Comfortable Mode** (Accessibility):

- Card padding: 24px
- Row height: 56px
- Font size: 16px
- Line height: 1.6

### 11. Micro-interactions

HubSpot uses **subtle animations** for feedback and delight:

#### Hover Effects

```css
/* Card Hover (Tailwind) */
.card {
  @apply transition-all duration-200 ease-in-out;
  @apply hover:shadow-md hover:-translate-y-1;
}

/* Button Hover */
.button {
  @apply transition-colors duration-150;
  @apply hover:bg-opacity-90;
}

/* Link Hover */
.link {
  @apply transition-colors duration-150;
  @apply hover:text-blue-600;
}
```

#### Animation Timing

- **Quick (150ms):** Button clicks, color changes
- **Normal (200ms):** Card hovers, dropdowns
- **Slow (300ms):** Modals, side panels
- **Ease Function:** `cubic-bezier(0.4, 0.0, 0.2, 1)` (Tailwind default)

#### Loading States

1. **Skeleton Screens** - Placeholder content while loading
2. **Spinner** - 24px circle for inline loading
3. **Progress Bar** - Linear indicator for uploads
4. **Pulse Animation** - Gentle fade for loading cards

#### Feedback Patterns

- **Success:** Green toast (top-right, 3s duration) + checkmark icon
- **Error:** Red toast (top-right, 5s duration) + X icon
- **Info:** Blue toast (top-right, 4s duration) + info icon
- **Warning:** Amber toast (top-right, 4s duration) + warning icon

### 12. Mobile Responsiveness

HubSpot adapts gracefully to **mobile devices**:

#### Mobile Breakpoints

```css
/* Tailwind Breakpoints */
sm: 640px   - Small tablets
md: 768px   - Tablets
lg: 1024px  - Small laptops
xl: 1280px  - Desktops
2xl: 1536px - Large screens
```

#### Mobile Adaptations

**Navigation:**

- Left sidebar → Bottom tab bar (4-5 main items)
- Top actions → Hamburger menu
- Breadcrumbs → Hidden (page title only)

**Pipeline Board:**

- Horizontal scroll → Vertical stacked columns
- Drag-and-drop → Tap to move (stage selector)
- Card width → Full width (16px padding)

**Lead Detail:**

- Three columns → Single column (stacked)
- Right sidebar → Bottom sheet (swipe up)
- Tabs → Horizontal scroll tabs

**Tables:**

- Wide tables → Card view (stacked rows)
- Multiple columns → Show top 3, hide rest (expandable)

#### Touch Targets

- **Minimum size:** 44px x 44px (iOS/Android standard)
- **Ideal size:** 48px x 48px
- **Spacing between targets:** 8px minimum

---

## Design System Foundation

### Color Palette (Cerebrum + WhatsApp + HubSpot)

#### Primary Colors

```css
/* Cerebrum Brand (Blue-Purple Gradient) */
--primary-600: #6366f1; /* Indigo */
--primary-700: #4f46e5; /* Darker indigo */
--primary-800: #4338ca; /* Deep indigo */

/* WhatsApp Green */
--whatsapp-500: #25d366; /* Official WhatsApp green */
--whatsapp-600: #1ebe57; /* Darker shade */
--whatsapp-700: #128c7e; /* HubSpot-style dark green */

/* HubSpot Coral (Accent) */
--coral-500: #ff7a59; /* Primary accent */
--coral-600: #ff5a33; /* Hover state */
```

#### Semantic Colors

```css
/* Success */
--success-50: #ecfdf5;
--success-100: #d1fae5;
--success-500: #10b981; /* Green */
--success-600: #059669;
--success-700: #047857;

/* Warning */
--warning-50: #fef3c7;
--warning-100: #fef3c7;
--warning-500: #f59e0b; /* Amber */
--warning-600: #d97706;
--warning-700: #b45309;

/* Danger */
--danger-50: #fef2f2;
--danger-100: #fee2e2;
--danger-500: #ef4444; /* Red */
--danger-600: #dc2626;
--danger-700: #b91c1c;

/* Info */
--info-50: #eff6ff;
--info-100: #dbeafe;
--info-500: #3b82f6; /* Blue */
--info-600: #2563eb;
--info-700: #1d4ed8;
```

#### Neutral Colors (Grays)

```css
--gray-50: #f9fafb; /* Lightest background */
--gray-100: #f3f4f6; /* Card backgrounds */
--gray-200: #e5e7eb; /* Borders */
--gray-300: #d1d5db; /* Disabled borders */
--gray-400: #9ca3af; /* Placeholder text */
--gray-500: #6b7280; /* Secondary text */
--gray-600: #4b5563; /* Primary text */
--gray-700: #374151; /* Headings */
--gray-800: #1f2937; /* Dark headings */
--gray-900: #111827; /* Darkest text */
```

#### Background Colors

```css
--bg-primary: #ffffff; /* Main background (white) */
--bg-secondary: #f9fafb; /* Alternate background (gray-50) */
--bg-tertiary: #f3f4f6; /* Cards on secondary bg (gray-100) */
--bg-overlay: rgba(0, 0, 0, 0.5); /* Modal backdrop */
```

### Typography System

#### Font Loading (Next.js)

```typescript
// app/layout.tsx
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-urbanist',
  display: 'swap',
})

// Usage in Tailwind: font-sans (set as default)
```

#### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-urbanist)', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: ['13px', { lineHeight: '1.4' }],
        sm: ['14px', { lineHeight: '1.5' }],
        base: ['15px', { lineHeight: '1.6' }],
        lg: ['18px', { lineHeight: '1.4' }],
        xl: ['20px', { lineHeight: '1.4' }],
        '2xl': ['24px', { lineHeight: '1.3' }],
        '3xl': ['32px', { lineHeight: '1.2' }],
      },
    },
  },
}
```

### Border Radius

```css
/* Tailwind Scale */
--radius-sm: 4px; /* rounded-sm - Tags, badges */
--radius-md: 6px; /* rounded-md - Buttons, inputs */
--radius-lg: 8px; /* rounded-lg - Cards */
--radius-xl: 12px; /* rounded-xl - Modals */
--radius-2xl: 16px; /* rounded-2xl - Hero cards */
--radius-full: 9999px; /* rounded-full - Pills, avatars */
```

#### Usage Guidelines

- **Buttons:** `rounded-md` (6px)
- **Input Fields:** `rounded-md` (6px)
- **Cards:** `rounded-lg` (8px)
- **Modals:** `rounded-xl` (12px)
- **Badges:** `rounded-full` (pill shape)
- **Avatars:** `rounded-full` (circle)

### Shadow System

```css
/* Tailwind Shadow Scale */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

#### Usage Guidelines

- **Cards (resting):** `shadow-sm`
- **Cards (hover):** `shadow-md`
- **Dropdowns:** `shadow-lg`
- **Modals:** `shadow-xl`
- **Floating panels:** `shadow-2xl`

### Animation System

#### Timing Functions

```css
/* Tailwind Easings */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* Default */
```

#### Duration Scale

```css
--duration-75: 75ms; /* Very quick */
--duration-100: 100ms; /* Quick */
--duration-150: 150ms; /* Fast (buttons) */
--duration-200: 200ms; /* Normal (cards) */
--duration-300: 300ms; /* Slow (modals) */
--duration-500: 500ms; /* Very slow */
```

---

## Component Pattern Library

### 1. Cards

Cards are the **fundamental building block** of the dashboard.

#### Base Card Component

```typescript
// components/ui/Card.tsx
interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated' | 'flat'
  padding?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

export function Card({
  variant = 'default',
  padding = 'md',
  className,
  children
}: CardProps) {
  const variants = {
    default: 'bg-white border border-gray-200 shadow-sm',
    bordered: 'bg-white border-2 border-gray-300',
    elevated: 'bg-white shadow-md hover:shadow-lg',
    flat: 'bg-gray-50',
  }

  const paddings = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  return (
    <div className={`
      ${variants[variant]}
      ${paddings[padding]}
      rounded-lg
      transition-shadow duration-200
      ${className}
    `}>
      {children}
    </div>
  )
}
```

#### Lead Card (Pipeline)

```typescript
// components/counselor/LeadCard.tsx
interface LeadCardProps {
  lead: {
    id: string
    name: string
    course: string
    priority: 'hot' | 'warm' | 'cold'
    lastContact: string
    nextFollowUp: string
    phone: string
  }
  onDrag?: () => void
}

export function LeadCard({ lead, onDrag }: LeadCardProps) {
  const priorityColors = {
    hot: 'border-l-red-500',
    warm: 'border-l-amber-500',
    cold: 'border-l-blue-500',
  }

  const priorityBadges = {
    hot: 'bg-red-100 text-red-700',
    warm: 'bg-amber-100 text-amber-700',
    cold: 'bg-blue-100 text-blue-700',
  }

  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200
        border-l-4 ${priorityColors[lead.priority]}
        p-4 cursor-pointer
        hover:shadow-md hover:-translate-y-0.5
        transition-all duration-200
      `}
      draggable
      onDragStart={onDrag}
    >
      {/* Priority Badge */}
      <div className="flex items-center justify-between mb-2">
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${priorityBadges[lead.priority]}
        `}>
          {lead.priority === 'hot' && '🔥 Hot'}
          {lead.priority === 'warm' && '☀️ Warm'}
          {lead.priority === 'cold' && '❄️ Cold'}
        </span>

        {/* Quick Actions (shown on hover) */}
        <div className="opacity-0 hover:opacity-100 transition-opacity">
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreVerticalIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lead Name */}
      <h3 className="font-semibold text-gray-900 mb-1">
        {lead.name}
      </h3>

      {/* Course */}
      <p className="text-sm text-gray-600 mb-3">
        {lead.course}
      </p>

      {/* Metadata */}
      <div className="space-y-1 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <PhoneIcon className="w-3 h-3" />
          {lead.phone}
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="w-3 h-3" />
          Last contact: {lead.lastContact}
        </div>
      </div>

      {/* Next Follow-up Alert */}
      {lead.nextFollowUp && (
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded">
          <p className="text-xs text-amber-700 font-medium">
            Follow up: {lead.nextFollowUp}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-3 flex gap-2">
        <button className="flex-1 bg-whatsapp-500 text-white text-sm py-2 rounded-md hover:bg-whatsapp-600 transition-colors">
          WhatsApp
        </button>
        <button className="px-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          <PhoneIcon className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  )
}
```

**Tailwind Classes Used:**

- `border-l-4` - Left border for priority indicator
- `hover:-translate-y-0.5` - Subtle lift on hover
- `transition-all duration-200` - Smooth animation
- `rounded-lg` - 8px border radius
- `shadow-md` - Medium shadow on hover

#### Stat Card (Dashboard)

```typescript
// components/counselor/StatCard.tsx
interface StatCardProps {
  title: string
  value: string | number
  change?: number
  trend?: 'up' | 'down'
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'amber' | 'red'
}

export function StatCard({
  title,
  value,
  change,
  trend,
  icon,
  color = 'blue'
}: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <Card variant="elevated" padding="lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h2 className="text-3xl font-bold text-gray-900">{value}</h2>

          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <ArrowUpIcon className="w-4 h-4 text-green-600" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {Math.abs(change)}%
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          )}
        </div>

        {icon && (
          <div className={`p-3 rounded-lg ${colors[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
```

### 2. Buttons

#### Button Component

```typescript
// components/ui/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    whatsapp: 'bg-whatsapp-500 text-white hover:bg-whatsapp-600 focus:ring-whatsapp-500',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-md font-medium
        inline-flex items-center justify-center gap-2
        transition-colors duration-150
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner className="w-4 h-4" />
          Loading...
        </>
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  )
}
```

**Button Usage Examples:**

```tsx
// Primary action
<Button variant="primary">Create Lead</Button>

// WhatsApp action
<Button variant="whatsapp" leftIcon={<WhatsAppIcon />}>
  Send Message
</Button>

// Danger action
<Button variant="danger" size="sm">Delete</Button>

// Loading state
<Button variant="primary" isLoading>Saving...</Button>

// With icons
<Button
  variant="secondary"
  leftIcon={<DownloadIcon />}
  rightIcon={<ChevronDownIcon />}
>
  Export Data
</Button>
```

### 3. Status Badges

```typescript
// components/ui/Badge.tsx
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
  dot?: boolean
  children: React.ReactNode
}

export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  children
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  }

  const dotColors = {
    default: 'bg-gray-600',
    success: 'bg-green-600',
    warning: 'bg-amber-600',
    danger: 'bg-red-600',
    info: 'bg-blue-600',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  return (
    <span className={`
      inline-flex items-center gap-1.5
      ${variants[variant]}
      ${sizes[size]}
      rounded-full font-medium
    `}>
      {dot && (
        <span className={`w-2 h-2 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  )
}
```

**Badge Usage:**

```tsx
// Lead stages
<Badge variant="info">New Lead</Badge>
<Badge variant="warning">Demo Booked</Badge>
<Badge variant="success">Enrolled</Badge>

// With dot indicator
<Badge variant="success" dot>Online</Badge>
<Badge variant="danger" dot>Overdue</Badge>

// Priority indicators
<Badge variant="danger" size="sm">🔥 Hot</Badge>
<Badge variant="warning" size="sm">☀️ Warm</Badge>
```

### 4. Modals/Dialogs

```typescript
// components/ui/Modal.tsx
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  footer?: React.ReactNode
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
}: ModalProps) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`
          relative w-full ${sizes[size]}
          bg-white rounded-xl shadow-2xl
          transform transition-all
        `}>
          {/* Header */}
          {title && (
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {title}
                  </h2>
                  {description && (
                    <p className="mt-1 text-sm text-gray-600">
                      {description}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <XIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-4">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

**Modal Usage:**

```tsx
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Create Fee Plan"
  description="Set up a custom payment plan for this student"
  size="lg"
  footer={
    <>
      <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Create Plan
      </Button>
    </>
  }
>
  <FeePlanForm />
</Modal>
```

### 5. Form Components

#### Input Field

```typescript
// components/ui/Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          className={`
            w-full px-3 py-2
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            border border-gray-300 rounded-md
            text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            transition-colors duration-150
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircleIcon className="w-4 h-4" />
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}
```

#### Select Dropdown

```typescript
// components/ui/Select.tsx
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Array<{ value: string; label: string }>
}

export function Select({ label, error, options, className, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <select
        className={`
          w-full px-3 py-2 pr-10
          border border-gray-300 rounded-md
          text-gray-900
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          appearance-none bg-white
          bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="gray" d="M6 9L1 4h10z"/></svg>')]
          bg-no-repeat bg-right pr-8
          cursor-pointer
          ${className}
        `}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
```

### 6. Tables/Lists

```typescript
// components/ui/Table.tsx
interface Column<T> {
  key: string
  header: string
  render: (item: T) => React.ReactNode
  width?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (item: T) => void
}

export function Table<T>({ columns, data, onRowClick }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(item)}
              className={`
                hover:bg-gray-50 transition-colors
                ${onRowClick ? 'cursor-pointer' : ''}
              `}
            >
              {columns.map(col => (
                <td key={col.key} className="px-4 py-3 text-sm text-gray-900">
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No data to display</p>
        </div>
      )}
    </div>
  )
}
```

**Table Usage:**

```tsx
<Table
  columns={[
    {
      key: 'name',
      header: 'Student Name',
      render: (lead) => (
        <div className="flex items-center gap-3">
          <Avatar name={lead.name} />
          <span className="font-medium">{lead.name}</span>
        </div>
      ),
    },
    {
      key: 'stage',
      header: 'Stage',
      render: (lead) => <Badge>{lead.stage}</Badge>,
      width: '150px',
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (lead) => <PriorityBadge priority={lead.priority} />,
      width: '120px',
    },
  ]}
  data={leads}
  onRowClick={(lead) => router.push(`/counselor/leads/${lead.id}`)}
/>
```

### 7. Empty States

```typescript
// components/ui/EmptyState.tsx
interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon && (
        <div className="w-16 h-16 mb-4 text-gray-400">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-gray-600 text-center max-w-md mb-6">
          {description}
        </p>
      )}

      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
```

**Empty State Usage:**

```tsx
<EmptyState
  icon={<InboxIcon />}
  title="No leads in this stage"
  description="When leads enter this stage, they'll appear here."
  action={{
    label: 'Add Lead',
    onClick: () => setShowAddLeadModal(true),
  }}
/>
```

### 8. Loading States

```typescript
// components/ui/Skeleton.tsx
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  )
}

// Card skeleton
export function CardSkeleton() {
  return (
    <Card>
      <Skeleton className="h-6 w-1/3 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </Card>
  )
}

// Table skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  )
}
```

### 9. Toast Notifications

```typescript
// components/ui/Toast.tsx
import { toast as hotToast } from 'react-hot-toast'

export const toast = {
  success: (message: string) => {
    hotToast.success(message, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#10B981',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '8px',
      },
      icon: '✓',
    })
  },

  error: (message: string) => {
    hotToast.error(message, {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#EF4444',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '8px',
      },
      icon: '✕',
    })
  },

  info: (message: string) => {
    hotToast(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#3B82F6',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '8px',
      },
      icon: 'ℹ',
    })
  },

  warning: (message: string) => {
    hotToast(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#F59E0B',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '8px',
      },
      icon: '⚠',
    })
  },
}
```

**Toast Usage:**

```tsx
// Success
toast.success('Lead moved to Demo Booked!')

// Error
toast.error('Failed to send WhatsApp message')

// Info
toast.info('Fee plan draft saved')

// Warning
toast.warning('Payment due in 2 days')
```

---

## Interaction Patterns

### 1. Drag-and-Drop (Pipeline)

**Library:** `@hello-pangea/dnd` (React Beautiful DnD fork)

```typescript
// components/counselor/PipelineBoard.tsx
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

export function PipelineBoard() {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result

    // Update lead stage in database
    updateLeadStage(draggableId, destination.droppableId)

    // Show success toast
    toast.success(`Lead moved to ${destination.droppableId}`)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => (
          <Droppable key={stage.id} droppableId={stage.id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`
                  w-80 flex-shrink-0
                  ${snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-gray-50'}
                  rounded-lg p-3
                  transition-colors duration-200
                `}
              >
                <StageHeader stage={stage} />

                <div className="space-y-3 mt-3">
                  {stage.leads.map((lead, index) => (
                    <Draggable
                      key={lead.id}
                      draggableId={lead.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`
                            ${snapshot.isDragging ? 'opacity-50 rotate-2' : ''}
                          `}
                        >
                          <LeadCard lead={lead} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}
```

**Visual Feedback:**

- **Dragging:** Card becomes slightly transparent (50% opacity) and rotates 2 degrees
- **Drop Zone:** Column background changes to blue-50
- **Forbidden Drop:** Red border and shake animation
- **Success:** Green toast notification

### 2. Inline Editing

```typescript
// components/ui/InlineEdit.tsx
export function InlineEdit({
  value,
  onSave,
  type = 'text'
}: {
  value: string
  onSave: (newValue: string) => Promise<void>
  type?: 'text' | 'number' | 'email'
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (editValue === value) {
      setIsEditing(false)
      return
    }

    setIsSaving(true)
    try {
      await onSave(editValue)
      setIsEditing(false)
      toast.success('Updated successfully')
    } catch (error) {
      toast.error('Failed to update')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isEditing) {
    return (
      <div
        className="group flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
        onClick={() => setIsEditing(true)}
      >
        <span>{value}</span>
        <PencilIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        type={type}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave()
          if (e.key === 'Escape') setIsEditing(false)
        }}
        autoFocus
      />
      <Button
        size="sm"
        onClick={handleSave}
        isLoading={isSaving}
      >
        Save
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </Button>
    </div>
  )
}
```

### 3. Dropdown Menus

```typescript
// components/ui/Dropdown.tsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface DropdownItem {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  destructive?: boolean
  separator?: boolean
}

export function Dropdown({
  trigger,
  items
}: {
  trigger: React.ReactNode
  items: DropdownItem[]
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="
            min-w-[200px] bg-white rounded-lg shadow-lg
            border border-gray-200 p-1
            animate-in fade-in-0 zoom-in-95
          "
          sideOffset={5}
        >
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.separator && (
                <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
              )}
              <DropdownMenu.Item
                onClick={item.onClick}
                className={`
                  px-3 py-2 rounded-md cursor-pointer
                  flex items-center gap-2
                  ${item.destructive
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                  transition-colors duration-150
                  outline-none
                `}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                <span className="text-sm">{item.label}</span>
              </DropdownMenu.Item>
            </React.Fragment>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
```

**Dropdown Usage:**

```tsx
<Dropdown
  trigger={
    <button className="p-2 hover:bg-gray-100 rounded">
      <MoreVerticalIcon className="w-4 h-4" />
    </button>
  }
  items={[
    {
      label: 'Edit Lead',
      icon: <PencilIcon />,
      onClick: () => handleEdit(),
    },
    {
      label: 'Assign to Counselor',
      icon: <UserIcon />,
      onClick: () => handleAssign(),
    },
    {
      separator: true,
    },
    {
      label: 'Delete Lead',
      icon: <TrashIcon />,
      onClick: () => handleDelete(),
      destructive: true,
    },
  ]}
/>
```

### 4. Search and Filter

```typescript
// components/counselor/LeadFilters.tsx
export function LeadFilters() {
  const [filters, setFilters] = useState({
    search: '',
    stage: 'all',
    priority: 'all',
    counselor: 'all',
    dateRange: 'all',
  })

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <Input
          placeholder="Search leads..."
          leftIcon={<SearchIcon className="w-4 h-4" />}
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="flex-1 min-w-[200px]"
        />

        {/* Stage Filter */}
        <Select
          options={[
            { value: 'all', label: 'All Stages' },
            { value: 'new', label: 'New Lead' },
            { value: 'demo', label: 'Demo Booked' },
            { value: 'offer', label: 'Offer Sent' },
            { value: 'payment', label: 'Payment Pending' },
            { value: 'enrolled', label: 'Enrolled' },
          ]}
          value={filters.stage}
          onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
        />

        {/* Priority Filter */}
        <Select
          options={[
            { value: 'all', label: 'All Priorities' },
            { value: 'hot', label: '🔥 Hot' },
            { value: 'warm', label: '☀️ Warm' },
            { value: 'cold', label: '❄️ Cold' },
          ]}
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        />

        {/* Clear Filters */}
        {Object.values(filters).some(v => v !== 'all' && v !== '') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilters({
              search: '',
              stage: 'all',
              priority: 'all',
              counselor: 'all',
              dateRange: 'all',
            })}
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2 mt-3">
        {filters.stage !== 'all' && (
          <Badge>
            Stage: {filters.stage}
            <button onClick={() => setFilters({ ...filters, stage: 'all' })}>
              <XIcon className="w-3 h-3 ml-1" />
            </button>
          </Badge>
        )}
        {/* ... other active filter badges */}
      </div>
    </div>
  )
}
```

### 5. Confirmation Dialogs

```typescript
// components/ui/ConfirmDialog.tsx
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'primary'
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
    >
      <div className="text-center">
        <div className={`
          mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4
          ${variant === 'danger' ? 'bg-red-100' : 'bg-blue-100'}
        `}>
          {variant === 'danger' ? (
            <AlertTriangleIcon className="w-6 h-6 text-red-600" />
          ) : (
            <AlertCircleIcon className="w-6 h-6 text-blue-600" />
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mb-6">
          {description}
        </p>

        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
```

**Confirm Dialog Usage:**

```tsx
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

<ConfirmDialog
  isOpen={showDeleteConfirm}
  onClose={() => setShowDeleteConfirm(false)}
  onConfirm={() => handleDeleteLead()}
  title="Delete Lead?"
  description="This action cannot be undone. All data associated with this lead will be permanently deleted."
  confirmLabel="Delete Lead"
  variant="danger"
/>
```

---

## WhatsApp-First Adaptations

### Design Integration Strategy

Cerebrum's WhatsApp-first approach requires **seamless integration** of WhatsApp green (`#25D366`) with the existing brand colors while maintaining HubSpot's professional aesthetic.

### 1. WhatsApp Color Integration

#### Primary Action Colors

```css
/* Use WhatsApp green for ALL communication-related actions */
--whatsapp-primary: #25D366;
--whatsapp-hover: #1EBE57;
--whatsapp-dark: #128C7E;

/* Application */
- Send Message buttons: WhatsApp green
- Message notifications: WhatsApp green badges
- Online status indicators: WhatsApp green dot
- Communication cards: WhatsApp green accent
```

#### Color Hierarchy

```
Primary Brand (Indigo) → Navigation, branding
WhatsApp Green → All communication actions
HubSpot Coral → Secondary CTAs
Semantic Colors → Status indicators
```

### 2. WhatsApp Message Bubbles

```typescript
// components/counselor/WhatsAppMessageBubble.tsx
interface MessageBubbleProps {
  message: {
    text: string
    timestamp: string
    direction: 'inbound' | 'outbound'
    status?: 'sent' | 'delivered' | 'read'
    mediaUrl?: string
  }
}

export function WhatsAppMessageBubble({ message }: MessageBubbleProps) {
  const isOutbound = message.direction === 'outbound'

  return (
    <div className={`flex ${isOutbound ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`
        max-w-[70%] rounded-lg px-4 py-2
        ${isOutbound
          ? 'bg-whatsapp-500 text-white rounded-br-sm'
          : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
        }
        shadow-sm
      `}>
        {/* Media (if present) */}
        {message.mediaUrl && (
          <img
            src={message.mediaUrl}
            alt="Attachment"
            className="rounded mb-2 max-w-full"
          />
        )}

        {/* Message Text */}
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>

        {/* Timestamp + Status */}
        <div className={`
          flex items-center justify-end gap-1 mt-1
          text-xs ${isOutbound ? 'text-white/70' : 'text-gray-500'}
        `}>
          <span>{message.timestamp}</span>

          {isOutbound && message.status && (
            <MessageStatus status={message.status} />
          )}
        </div>
      </div>
    </div>
  )
}

function MessageStatus({ status }: { status: 'sent' | 'delivered' | 'read' }) {
  const icons = {
    sent: '✓',
    delivered: '✓✓',
    read: '✓✓',
  }

  return (
    <span className={status === 'read' ? 'text-blue-300' : ''}>
      {icons[status]}
    </span>
  )
}
```

### 3. WhatsApp Communication Hub

```typescript
// components/counselor/WhatsAppHub.tsx
export function WhatsAppHub({ leadId }: { leadId: string }) {
  return (
    <Card className="h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar name={lead.name} size="md" />
          <div>
            <h3 className="font-semibold text-gray-900">{lead.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-whatsapp-500 rounded-full animate-pulse" />
              Online
            </div>
          </div>
        </div>

        <Dropdown
          trigger={
            <button className="p-2 hover:bg-gray-100 rounded">
              <MoreVerticalIcon className="w-5 h-5" />
            </button>
          }
          items={[
            { label: 'View Lead Profile', onClick: () => {} },
            { label: 'Message Templates', onClick: () => {} },
            { label: 'Send Media', onClick: () => {} },
          ]}
        />
      </div>

      {/* Messages (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#E5DDD5]">
        {/* WhatsApp-style patterned background */}
        <div className="space-y-2">
          {messages.map(msg => (
            <WhatsAppMessageBubble key={msg.id} message={msg} />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end gap-2">
          {/* Attachment Button */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <PaperclipIcon className="w-5 h-5 text-gray-600" />
          </button>

          {/* Template Button */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <TemplateIcon className="w-5 h-5 text-gray-600" />
          </button>

          {/* Message Input */}
          <textarea
            placeholder="Type a message..."
            className="
              flex-1 px-4 py-2
              border border-gray-300 rounded-lg
              resize-none
              focus:outline-none focus:ring-2 focus:ring-whatsapp-500
              max-h-32
            "
            rows={1}
          />

          {/* Send Button */}
          <button className="
            p-3 bg-whatsapp-500 text-white rounded-full
            hover:bg-whatsapp-600 transition-colors
          ">
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  )
}
```

### 4. Quick Reply Templates

```typescript
// components/counselor/QuickReplyTemplates.tsx
export function QuickReplyTemplates({ onSelect }: { onSelect: (text: string) => void }) {
  const templates = [
    {
      category: 'Greeting',
      templates: [
        'Hi {name}! Thanks for your interest in Cerebrum Biology Academy. How can I help you today?',
        'Hello {name}! I hope you\'re doing well. I wanted to follow up on our previous conversation.',
      ],
    },
    {
      category: 'Fee Plans',
      templates: [
        'Hi {name}! I\'ve created a custom fee plan for you. The total fee is ₹{amount} with {installments} installments. Would you like to proceed?',
        'Your payment of ₹{amount} is due on {date}. Please complete it to continue your access.',
      ],
    },
    {
      category: 'Demo',
      templates: [
        'Your demo class is scheduled for {date} at {time}. Meeting link: {link}',
        'Hi {name}! How was your demo class? Do you have any questions?',
      ],
    },
  ]

  return (
    <div className="space-y-4">
      {templates.map(cat => (
        <div key={cat.category}>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            {cat.category}
          </h4>
          <div className="space-y-2">
            {cat.templates.map((template, idx) => (
              <button
                key={idx}
                onClick={() => onSelect(template)}
                className="
                  w-full text-left p-3
                  bg-white border border-gray-200 rounded-lg
                  hover:border-whatsapp-500 hover:bg-whatsapp-50
                  transition-colors duration-150
                "
              >
                <p className="text-sm text-gray-700">
                  {template}
                </p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
```

### 5. WhatsApp Status Indicators

```typescript
// Visual indicators for message delivery status
export function MessageStatusIndicator({ status }: {
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'
}) {
  const indicators = {
    sending: {
      icon: <ClockIcon className="w-3 h-3 animate-spin" />,
      color: 'text-gray-400',
      label: 'Sending...',
    },
    sent: {
      icon: '✓',
      color: 'text-gray-400',
      label: 'Sent',
    },
    delivered: {
      icon: '✓✓',
      color: 'text-gray-400',
      label: 'Delivered',
    },
    read: {
      icon: '✓✓',
      color: 'text-blue-500',
      label: 'Read',
    },
    failed: {
      icon: <AlertCircleIcon className="w-3 h-3" />,
      color: 'text-red-500',
      label: 'Failed',
    },
  }

  const indicator = indicators[status]

  return (
    <div className={`flex items-center gap-1 ${indicator.color}`}>
      {typeof indicator.icon === 'string' ? (
        <span className="text-xs">{indicator.icon}</span>
      ) : (
        indicator.icon
      )}
      <span className="text-xs">{indicator.label}</span>
    </div>
  )
}
```

### 6. WhatsApp-Style Timeline Entry

```typescript
// In the activity timeline, WhatsApp messages should stand out
export function WhatsAppTimelineEntry({ activity }: { activity: Activity }) {
  return (
    <div className="flex gap-3">
      {/* WhatsApp Icon */}
      <div className="w-8 h-8 bg-whatsapp-500 rounded-full flex items-center justify-center flex-shrink-0">
        <WhatsAppIcon className="w-5 h-5 text-white" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-gray-900">
            WhatsApp Message
          </h4>
          <span className="text-sm text-gray-500">
            {activity.timestamp}
          </span>
        </div>

        <div className="bg-whatsapp-50 border border-whatsapp-200 rounded-lg p-3">
          <p className="text-sm text-gray-700">
            {activity.message}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <MessageStatusIndicator status={activity.status} />
          <span>•</span>
          <span>To: {activity.recipient}</span>
        </div>
      </div>
    </div>
  )
}
```

---

## Layout & Information Architecture

### Page Layout Templates

#### 1. Dashboard Homepage

```typescript
// app/counselor/page.tsx
export default function CounselorDashboard() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Overview of your leads and activities"
        actions={
          <Button variant="whatsapp" leftIcon={<PlusIcon />}>
            New Lead
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Leads"
          value={48}
          change={12}
          trend="up"
          icon={<UsersIcon />}
          color="blue"
        />
        <StatCard
          title="Demo Booked"
          value={15}
          change={5}
          trend="up"
          icon={<CalendarIcon />}
          color="amber"
        />
        <StatCard
          title="Enrolled"
          value={8}
          change={3}
          trend="up"
          icon={<CheckCircleIcon />}
          color="green"
        />
        <StatCard
          title="Revenue"
          value="₹2.4L"
          change={18}
          trend="up"
          icon={<CurrencyRupeeIcon />}
          color="green"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader title="Recent Leads" />
            <RecentLeadsTable />
          </Card>

          <Card>
            <CardHeader title="Upcoming Tasks" />
            <TaskList limit={5} />
          </Card>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Quick Actions" />
            <QuickActionsPanel />
          </Card>

          <Card>
            <CardHeader title="Today's Activity" />
            <ActivityFeed limit={10} />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
```

#### 2. Pipeline Board Page

```typescript
// app/counselor/leads/page.tsx
export default function LeadsPipelinePage() {
  return (
    <DashboardLayout>
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <PageHeader
          title="Lead Pipeline"
          description="Manage leads across different stages"
        />

        <LeadFilters />
      </div>

      {/* Pipeline Board (Full Width) */}
      <div className="py-6">
        <PipelineBoard />
      </div>
    </DashboardLayout>
  )
}
```

#### 3. Lead Detail Page

```typescript
// app/counselor/leads/[id]/page.tsx
export default function LeadDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/counselor' },
          { label: 'Leads', href: '/counselor/leads' },
          { label: lead.name, href: `/counselor/leads/${lead.id}` },
        ]}
      />

      {/* Three-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Sidebar (3 columns) */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader title="Lead Information" />
            <PropertyList properties={leadProperties} />
          </Card>

          <Card>
            <CardHeader title="Quick Actions" />
            <QuickActionsPanel leadId={lead.id} />
          </Card>
        </div>

        {/* Middle Column (6 columns) */}
        <div className="lg:col-span-6">
          <Tabs
            tabs={[
              { id: 'overview', label: 'Overview', content: <OverviewTab /> },
              { id: 'activity', label: 'Activity', content: <ActivityTab /> },
              { id: 'offers', label: 'Offers', content: <OffersTab /> },
              { id: 'payments', label: 'Payments', content: <PaymentsTab /> },
            ]}
          />
        </div>

        {/* Right Sidebar (3 columns) */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader title="About This Lead" />
            <LeadMetadata lead={lead} />
          </Card>

          <Card>
            <CardHeader title="Assigned Counselor" />
            <CounselorInfo counselor={lead.assignedTo} />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
```

### Navigation Structure

```typescript
// components/layout/Sidebar.tsx
const navigation = [
  {
    section: 'Main',
    items: [
      { name: 'Dashboard', href: '/counselor', icon: HomeIcon },
      { name: 'Leads', href: '/counselor/leads', icon: UsersIcon, badge: 48 },
      { name: 'Messages', href: '/counselor/communications', icon: MessageSquareIcon, badge: 5 },
      { name: 'Tasks', href: '/counselor/tasks', icon: CheckSquareIcon, badge: 12 },
    ],
  },
  {
    section: 'Tools',
    items: [
      { name: 'Fee Plans', href: '/counselor/fee-plans', icon: CurrencyRupeeIcon },
      { name: 'Offers', href: '/counselor/offers', icon: TagIcon },
      { name: 'Analytics', href: '/counselor/analytics', icon: BarChartIcon },
    ],
  },
  {
    section: 'Settings',
    items: [
      { name: 'Profile', href: '/counselor/profile', icon: UserIcon },
      { name: 'Settings', href: '/counselor/settings', icon: SettingsIcon },
    ],
  },
]
```

---

## Accessibility Guidelines

### 1. Keyboard Navigation

All interactive elements must be **keyboard accessible**:

```typescript
// Keyboard shortcuts for common actions
const shortcuts = {
  c: 'Create new lead',
  e: 'Edit current item',
  d: 'Delete current item',
  '/': 'Focus search bar',
  Escape: 'Close modal/dropdown',
  Tab: 'Navigate forward',
  'Shift+Tab': 'Navigate backward',
  Enter: 'Submit/activate',
  Space: 'Toggle/select',
  'Arrow keys': 'Navigate lists',
}

// Implementation
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Don't trigger if user is typing in input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return
    }

    switch (e.key) {
      case 'c':
        openCreateLeadModal()
        break
      case '/':
        e.preventDefault()
        searchInputRef.current?.focus()
        break
      // ... other shortcuts
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [])
```

### 2. ARIA Labels

```typescript
// Proper ARIA labels for screen readers
<button
  aria-label="Send WhatsApp message to Priya Sharma"
  className="..."
>
  <WhatsAppIcon aria-hidden="true" />
</button>

<div role="tablist" aria-label="Lead information tabs">
  <button
    role="tab"
    aria-selected={activeTab === 'overview'}
    aria-controls="overview-panel"
  >
    Overview
  </button>
</div>

<div
  role="tabpanel"
  id="overview-panel"
  aria-labelledby="overview-tab"
>
  {/* Content */}
</div>
```

### 3. Color Contrast

**WCAG AAA Standards** (7:1 ratio for normal text, 4.5:1 for large text):

```css
/* Text on white background */
--text-primary: #1f2937; /* 15.3:1 ratio ✓ */
--text-secondary: #4b5563; /* 8.6:1 ratio ✓ */
--text-tertiary: #6b7280; /* 6.4:1 ratio ✓ */

/* White text on colored backgrounds */
--primary-600: #6366f1; /* 4.7:1 ratio ✓ (large text only) */
--whatsapp-500: #25d366; /* 3.2:1 ratio ✗ (use darker shade for text) */
--whatsapp-700: #128c7e; /* 5.1:1 ratio ✓ */
```

**Usage:**

- Body text: `text-gray-700` (8.6:1 ratio)
- Headings: `text-gray-900` (15.3:1 ratio)
- Secondary text: `text-gray-600` (6.4:1 ratio)
- Links: `text-blue-600` with underline on hover

### 4. Focus States

```css
/* Clear focus indicators */
.focusable {
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
}

/* For dark backgrounds */
.focusable-dark {
  @apply focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800;
}

/* Skip to content link (for screen readers) */
.skip-to-content {
  @apply absolute -top-10 left-0 bg-primary-600 text-white px-4 py-2 rounded-md;
  @apply focus:top-4 transition-all;
}
```

### 5. Alternative Text

```typescript
// Images
<img
  src={lead.avatar}
  alt={`Profile picture of ${lead.name}`}
/>

// Decorative images (hide from screen readers)
<img
  src="/decoration.svg"
  alt=""
  aria-hidden="true"
/>

// Icons with meaning
<CheckCircleIcon aria-label="Completed" className="w-5 h-5 text-green-600" />

// Icons that are decorative (next to text)
<button>
  <PlusIcon aria-hidden="true" />
  Create Lead
</button>
```

---

## Implementation Guide (Tailwind CSS)

### Tailwind Configuration

```javascript
// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary (Cerebrum Brand)
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        // WhatsApp
        whatsapp: {
          50: '#E6F9EF',
          100: '#CCEEDE',
          200: '#99DDBD',
          300: '#66CC9C',
          400: '#33BB7B',
          500: '#25D366',
          600: '#1EBE57',
          700: '#128C7E',
          800: '#0C5A52',
          900: '#062926',
        },
        // HubSpot Coral
        coral: {
          50: '#FFF5F2',
          100: '#FFE8E0',
          200: '#FFD1C1',
          300: '#FFB9A3',
          400: '#FFA184',
          500: '#FF7A59',
          600: '#FF5A33',
          700: '#E64014',
          800: '#B3310F',
          900: '#80230B',
        },
      },
      fontFamily: {
        sans: ['var(--font-urbanist)', ...fontFamily.sans],
        mono: ['JetBrains Mono', ...fontFamily.mono],
      },
      fontSize: {
        xs: ['13px', { lineHeight: '1.4' }],
        sm: ['14px', { lineHeight: '1.5' }],
        base: ['15px', { lineHeight: '1.6' }],
        lg: ['18px', { lineHeight: '1.4' }],
        xl: ['20px', { lineHeight: '1.4' }],
        '2xl': ['24px', { lineHeight: '1.3' }],
        '3xl': ['32px', { lineHeight: '1.2' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
```

### Global Styles

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Smooth scrolling */
  html {
    @apply scroll-smooth;
  }

  /* Base body styles */
  body {
    @apply bg-gray-50 text-gray-900 antialiased;
  }

  /* Selection */
  ::selection {
    @apply bg-primary-200 text-primary-900;
  }
}

@layer components {
  /* Card component */
  .card {
    @apply bg-white rounded-lg border border-gray-200 shadow-sm;
  }

  .card-hover {
    @apply transition-all duration-200 hover:shadow-md hover:-translate-y-0.5;
  }

  /* Input field */
  .input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
    @apply disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed;
  }

  /* Button variants */
  .btn {
    @apply px-4 py-2 rounded-md font-medium transition-colors duration-150;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply bg-primary-600 text-white hover:bg-primary-700;
    @apply focus:ring-primary-500;
  }

  .btn-whatsapp {
    @apply bg-whatsapp-500 text-white hover:bg-whatsapp-600;
    @apply focus:ring-whatsapp-500;
  }
}

@layer utilities {
  /* Scrollbar styling */
  .scrollbar-thin {
    scrollbar-width: thin;
  }

  .scrollbar-thin::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .scrollbar-thin::-webkit-scrollbar-track {
    @apply bg-gray-100 rounded;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb {
    @apply bg-gray-300 rounded hover:bg-gray-400;
  }
}
```

### Recommended Libraries

```json
// package.json (dependencies for UI)
{
  "dependencies": {
    "@hello-pangea/dnd": "^16.5.0", // Drag and drop (pipeline)
    "@radix-ui/react-dropdown-menu": "^2.0.6", // Accessible dropdowns
    "@radix-ui/react-dialog": "^1.0.5", // Accessible modals
    "@radix-ui/react-tabs": "^1.0.4", // Accessible tabs
    "@radix-ui/react-select": "^2.0.0", // Accessible select
    "react-hot-toast": "^2.4.1", // Toast notifications
    "framer-motion": "^10.16.16", // Animations
    "lucide-react": "^0.294.0", // Icons
    "date-fns": "^2.30.0", // Date formatting
    "clsx": "^2.0.0", // Conditional classes
    "tailwind-merge": "^2.2.0" // Merge Tailwind classes
  }
}
```

### Utility Functions

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge Tailwind classes without conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount)
}

// Format relative time
import { formatDistanceToNow } from 'date-fns'

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true })
}

// Generate initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
```

---

## Final Recommendations

### Design Priorities

1. **Start with Component Library**
   - Build all reusable UI components first (buttons, cards, inputs)
   - Test components in isolation (use Storybook if possible)
   - Ensure mobile responsiveness from the start

2. **Implement Core Layouts**
   - Dashboard homepage (stat cards + activity)
   - Pipeline board (drag-and-drop kanban)
   - Lead detail page (three-column layout)

3. **WhatsApp Integration**
   - Make WhatsApp actions prominent (green buttons)
   - Design message interface first (counselors will use it most)
   - Test message templates thoroughly

4. **Mobile Testing**
   - Test every screen on mobile devices (iPhone, Android)
   - Ensure touch targets are 44px minimum
   - Check readability at different screen sizes

### Design System Checklist

- [ ] Tailwind config with custom colors
- [ ] Font loading (Urbanist from Google Fonts)
- [ ] Global styles (scrollbar, selection, focus)
- [ ] Base components (Button, Input, Card, Badge)
- [ ] Layout components (Sidebar, Header, Container)
- [ ] Form components (Input, Select, Textarea, Checkbox)
- [ ] Feedback components (Toast, Modal, Alert)
- [ ] Data display (Table, List, Stat Card)
- [ ] Navigation (Sidebar, Breadcrumbs, Tabs)
- [ ] Loading states (Skeleton, Spinner)
- [ ] Empty states (No data placeholders)
- [ ] Error states (Form errors, API errors)

### Key Takeaways

1. **HubSpot's Strength:** Clean information hierarchy, card-based layouts, and subtle interactions
2. **WhatsApp Integration:** Use green (#25D366) for all communication actions, WhatsApp-style bubbles for messages
3. **Education Context:** Focus on student lifecycle (Lead → Demo → Offer → Payment → Enrolled)
4. **Mobile-First:** Counselors will use phones frequently, optimize for small screens
5. **Data Density:** Show important information without overwhelming users
6. **Accessibility:** Keyboard navigation, ARIA labels, color contrast, focus states

---

**Next Steps:**

1. Review this document with stakeholders
2. Get approval on color palette and typography
3. Build component library (start with Button, Card, Input)
4. Implement dashboard homepage as proof-of-concept
5. Iterate based on counselor feedback

**Contact for Questions:**

- Design clarifications
- Component implementation help
- Mobile responsiveness issues
- Accessibility concerns

---

**Document Version:** 1.0
**Last Updated:** November 10, 2025
**Prepared By:** UX/UI Research Agent
**Project:** Counselor Dashboard (CRM-CDA-2025)
