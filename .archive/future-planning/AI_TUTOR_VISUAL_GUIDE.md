# AI Tutor Chat Interface - Visual Guide

## Interface Preview (Text Description)

### Welcome Screen (Empty State)

```
┌─────────────────────────────────────────────────────────────┐
│  🧠 AI Biology Tutor        [New] [Export] [Clear]          │
│  24/7 NEET Biology Expert                                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                        💡                                    │
│                                                              │
│           Welcome to AI Biology Tutor                        │
│                                                              │
│    Your 24/7 NEET Biology expert is here to help.          │
│    Ask any question about biology, get instant answers      │
│    with NCERT references, and boost your preparation.       │
│                                                              │
│    💡 Try asking:                                           │
│                                                              │
│    ┌────────────────────────────────────────────┐          │
│    │ ❓ What is the powerhouse of the cell?    │          │
│    └────────────────────────────────────────────┘          │
│                                                              │
│    ┌────────────────────────────────────────────┐          │
│    │ ❓ Explain photosynthesis in detail       │          │
│    └────────────────────────────────────────────┘          │
│                                                              │
│    ┌────────────────────────────────────────────┐          │
│    │ ❓ What are the differences between        │          │
│    │    mitosis and meiosis?                    │          │
│    └────────────────────────────────────────────┘          │
│                                                              │
│    ┌────────────────────────────────────────────┐          │
│    │ ❓ Describe the structure of DNA           │          │
│    └────────────────────────────────────────────┘          │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [                Ask your biology question...          ] ▶ │
│                                                              │
│  Press Enter to send, Shift + Enter for new line           │
└─────────────────────────────────────────────────────────────┘
```

### Active Chat (With Messages)

```
┌─────────────────────────────────────────────────────────────┐
│  🧠 AI Biology Tutor        [New] [Export] [Clear]          │
│  24/7 NEET Biology Expert                                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                                    ┌────────────────────┐   │
│                                [Y] │ What is the power- │   │
│                                    │ house of the cell? │   │
│                                    └────────────────────┘   │
│                                    11:30 AM                 │
│                                                              │
│   ┌──────────────────────────────────────────────┐         │
│   │ The mitochondrion is known as the powerhouse │  [AI]   │
│   │ of the cell because it generates most of the │         │
│   │ cell's supply of ATP (adenosine triphosphate),│        │
│   │ which is used as a source of chemical energy. │        │
│   │                                                │         │
│   │ ┌──────────────────────────────────────────┐ │         │
│   │ │ 📚 NCERT References                      │ │         │
│   │ │ • NCERT Class 11, Chapter 8: Cell - The  │ │         │
│   │ │   Unit of Life (Mitochondria section)    │ │         │
│   │ │ • NCERT Class 12, Chapter 14: Respiration│ │         │
│   │ └──────────────────────────────────────────┘ │         │
│   │                                                │         │
│   │ [Mitochondria] [ATP] [Cellular Respiration]   │         │
│   └──────────────────────────────────────────────┘         │
│   11:30 AM • 85% confidence • 342 tokens                   │
│                                                              │
│   💡 Try asking:                                            │
│                                                              │
│   ┌─────────────────────────────────────────────┐          │
│   │ ❓ How does ATP synthesis work?             │          │
│   └─────────────────────────────────────────────┘          │
│                                                              │
│   ┌─────────────────────────────────────────────┐          │
│   │ ❓ What is the structure of mitochondria?   │          │
│   └─────────────────────────────────────────────┘          │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [                Ask your biology question...          ] ▶ │
│                                                              │
│  Press Enter to send, Shift + Enter for new line           │
└─────────────────────────────────────────────────────────────┘
```

### Typing Indicator (AI Thinking)

```
┌─────────────────────────────────────────────────────────────┐
│  ... previous messages ...                                  │
│                                                              │
│   ┌──────────────────┐                                      │
│   │ ● ● ●           │  [AI]                                │
│   └──────────────────┘                                      │
│   AI Tutor is thinking...                                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Error State

```
┌─────────────────────────────────────────────────────────────┐
│  ... previous messages ...                                  │
│                                                              │
│   ┌──────────────────────────────────────────────────────┐ │
│   │ ⚠️ Error                                             │ │
│   │                                                       │ │
│   │ Sorry, something went wrong. Please try again.       │ │
│   │                                                       │ │
│   │ [Try again]                                           │ │
│   └──────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Color Scheme

### Light Mode

```
┌─────────────────────────────────────────────┐
│ STUDENT MESSAGE (Right-aligned)             │
│ Background: Blue gradient                   │
│ (#0ea5e9 → #0284c7)                        │
│ Text: White                                 │
│ Avatar: "Y" in blue circle                  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ AI MESSAGE (Left-aligned)                   │
│ Background: White                           │
│ Text: Gray-900                              │
│ Avatar: "AI" in saffron circle              │
│ (#f97316 → #ea580c)                        │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ NCERT REFERENCE BOX                         │
│ Background: Saffron-50 (#fff7ed)           │
│ Border: Saffron-200 (#fed7aa)              │
│ Icon: Book (saffron-600)                    │
│ Text: Saffron-700                           │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ TOPIC TAGS                                  │
│ Background: Primary-100 (#e0f2fe)          │
│ Text: Primary-800 (#075985)                │
│ Rounded full, small text                    │
└─────────────────────────────────────────────┘
```

### Dark Mode

```
┌─────────────────────────────────────────────┐
│ STUDENT MESSAGE                             │
│ Same as light mode (gradient always visible)│
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ AI MESSAGE                                  │
│ Background: Gray-800                        │
│ Text: Gray-100                              │
│ Avatar: Same saffron gradient               │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ NCERT REFERENCE BOX                         │
│ Background: Saffron-950                     │
│ Border: Saffron-800                         │
│ Text: Saffron-400                           │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ TOPIC TAGS                                  │
│ Background: Primary-900                     │
│ Text: Primary-200                           │
└─────────────────────────────────────────────┘
```

## Mobile View (320px - 768px)

```
┌──────────────────────────┐
│ 🧠 AI Biology Tutor      │
│ 24/7 NEET Biology Expert │
│ [New] [Export] [Clear]   │
├──────────────────────────┤
│                          │
│           💡             │
│                          │
│  Welcome to AI Biology   │
│  Tutor                   │
│                          │
│  Your 24/7 NEET Biology  │
│  expert is here to help. │
│                          │
│  💡 Try asking:          │
│                          │
│  ┌────────────────────┐ │
│  │ ❓ What is the    │ │
│  │ powerhouse of the │ │
│  │ cell?             │ │
│  └────────────────────┘ │
│                          │
│  ┌────────────────────┐ │
│  │ ❓ Explain        │ │
│  │ photosynthesis    │ │
│  │ in detail         │ │
│  └────────────────────┘ │
│                          │
├──────────────────────────┤
│                          │
│ [Ask your biology    ] ▶│
│ [question...         ]  │
│                          │
│ Enter to send           │
└──────────────────────────┘
```

## Component Breakdown

### 1. Header (Sticky Top)

```
Height: 68px
Background: White / Dark Gray-800
Border: Bottom border gray-200
Shadow: Small shadow

Content:
- Left: Logo icon (40px circle) + Title + Subtitle
- Right: 3 action buttons (New, Export, Clear)

Mobile: Stack buttons on second row if needed
```

### 2. Main Chat Area (Scrollable)

```
Height: calc(100vh - header - footer)
Background: Gray-50 / Dark Gray-900
Padding: 24px 16px
Max-width: 1024px (centered)

Content:
- Empty state OR message list
- Auto-scroll to bottom
- Suggested questions
- Error messages
```

### 3. Message Bubble

```
Max-width: 85% of container
Padding: 12px 16px
Border-radius: 16px
Shadow: Mobile-optimized

User (right):
- Flex-end alignment
- Blue gradient background
- White text

AI (left):
- Flex-start alignment
- White/Gray-800 background
- Dark/Light text
- Optional NCERT box
- Optional topic tags
```

### 4. NCERT Reference Box

```
Margin-top: 12px
Padding: 12px
Border: 1px solid saffron-200
Background: Saffron-50
Border-radius: 8px

Header:
- Book icon (16px)
- "NCERT References" label
- Uppercase, small, bold

Content:
- Bulleted list
- Small text (12px)
- Saffron-700 color
```

### 5. Topic Tags

```
Display: Inline-flex
Padding: 2px 10px
Border-radius: Full (9999px)
Font-size: 12px
Gap: 8px between tags

Colors:
- Light: Primary-100 bg, Primary-800 text
- Dark: Primary-900 bg, Primary-200 text
```

### 6. Typing Indicator

```
Layout: Same as AI message
Content: 3 dots (8px each)
Animation: Bounce with stagger
  - Dot 1: 0ms delay
  - Dot 2: 150ms delay
  - Dot 3: 300ms delay

Label: "AI Tutor is thinking..."
```

### 7. Chat Input (Sticky Bottom)

```
Height: Auto (min 56px)
Background: White / Dark Gray-800
Border: Top border gray-200
Padding: 16px
Shadow: Reverse shadow upward

Content:
- Textarea (auto-growing, max 128px)
- Send button (40px circle)
- Character counter (when >900 chars)
- Help text (small, bottom)

States:
- Normal: Gray border
- Focus: Primary-500 border + ring
- Disabled: Opacity 50%, cursor not-allowed
- Error (over limit): Red border + text
```

### 8. Suggested Questions

```
Margin: 24px 0
Gap: 8px between chips

Header:
- Lightbulb icon (16px)
- "Try asking:" label
- Primary-500 color

Question Chip:
- Padding: 8px 16px
- Border: Gray-300
- Background: White
- Border-radius: Full
- Question icon (16px) + Text

Hover:
- Border: Primary-500
- Background: Primary-50
- Shadow: Medium
- Scale: 1.0 (no scale)

Active:
- Scale: 0.95
```

## Animations

### Fade In (Messages)

```css
@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}
Duration: 300ms
Easing: ease-in-out
```

### Bounce (Typing Dots)

```css
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0) }
  40% { transform: translateY(-10px) }
}
Duration: 1400ms (infinite)
Easing: ease-in-out
```

### Slide Up (on mount)

```css
@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
}
Duration: 300ms
Easing: ease-out
```

### Button Press

```css
active:scale-95
Duration: 150ms (CSS transition)
```

## Spacing System

```
4px   → gap-1   (between small elements)
8px   → gap-2   (between chips, tags)
12px  → gap-3   (between message parts)
16px  → gap-4   (between messages)
24px  → gap-6   (sections)
32px  → gap-8   (major sections)
```

## Typography Scale

```
xs:    0.75rem (12px) → Metadata, timestamps
sm:    0.875rem (14px) → Message text, buttons
base:  1rem (16px) → Input text
lg:    1.125rem (18px) → Subheadings
xl:    1.25rem (20px) → Main heading
2xl:   1.5rem (24px) → Welcome heading
```

## Touch Targets (Mobile)

```
Minimum: 44px × 44px (iOS guideline)
Comfortable: 48px × 48px (Material Design)
Thumb-zone: 72px × 72px (one-handed use)

Implementation:
- Send button: 40px (in 48px container)
- Question chips: 40px height minimum
- Clear button: 36px (in 44px container)
```

## Accessibility Tree

```
[main] Chat Interface
├── [banner] Header
│   ├── [img] Logo
│   ├── [heading] Title
│   └── [navigation] Actions
│       ├── [button] New session
│       ├── [button] Export chat
│       └── [button] Clear chat
├── [main] Message area
│   ├── [article] User message
│   ├── [article] AI message
│   ├── [status] Typing indicator
│   └── [region] Suggested questions
│       └── [button] Question chip
└── [contentinfo] Footer
    └── [form] Chat input
        ├── [textbox] Message textarea
        └── [button] Send
```

## Conclusion

This visual guide demonstrates:

- ✅ Clear layout hierarchy
- ✅ Consistent color system
- ✅ Proper spacing and typography
- ✅ Mobile-optimized design
- ✅ Accessible component structure
- ✅ Smooth animations
- ✅ Touch-friendly interactions

The interface is professional, modern, and aligned with Cerebrum's branding while maintaining excellent usability across all devices.
