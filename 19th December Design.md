# Cerebrum Biology Academy - Complete Design System

**Created: 19th December 2025**

---

## 1. Color Palette

### Primary Brand Colors

| Color      | Tailwind                                | Hex       | Usage                                   |
| ---------- | --------------------------------------- | --------- | --------------------------------------- |
| **Blue**   | `blue-500`, `blue-600`, `indigo-600`    | `#3B82F6` | Headers, links, primary CTAs, security  |
| **Green**  | `green-500`, `green-600`, `emerald-500` | `#22C55E` | Botany, success, Enroll button, faculty |
| **Purple** | `purple-600`, `violet-500`              | `#8B5CF6` | Feature sections, stats, accents        |
| **Amber**  | `amber-500`, `orange-500`               | `#F59E0B` | Tips, timings, highlights, ideas        |
| **Red**    | `red-500`, `red-600`                    | `#EF4444` | Zoology, health, high priority          |

### Background Colors

| Type                 | Tailwind                                     | Usage              |
| -------------------- | -------------------------------------------- | ------------------ |
| Hero gradients       | `from-blue-600 via-indigo-600 to-purple-600` | Page headers       |
| Content sections     | `bg-white`                                   | Main content areas |
| Alternating sections | `bg-gray-50`                                 | Visual separation  |
| Footer               | `bg-slate-900`                               | Dark footer        |
| Cards                | `bg-white` + `shadow-sm` / `shadow-lg`       | All cards          |
| Decorative circles   | `bg-purple-100`                              | Emoji backgrounds  |

### Subject Color Coding

| Subject      | Primary Color | Icon BG         | Text Accent       | Badge       |
| ------------ | ------------- | --------------- | ----------------- | ----------- |
| Botany       | Green         | `bg-green-500`  | `text-green-600`  | Green pill  |
| Zoology      | Red           | `bg-red-500`    | `text-red-600`    | Red pill    |
| Both/General | Purple        | `bg-purple-500` | `text-purple-600` | Purple pill |

---

## 2. Icon System

### Style A: Solid Color Squares (Primary)

```
┌─────────┐
│    ♡    │  ← White outline icon (Lucide)
│         │  ← Solid colored background
└─────────┘  ← rounded-2xl corners
```

| Property   | Value                          |
| ---------- | ------------------------------ |
| Shape      | Rounded square (`rounded-2xl`) |
| Size       | `w-12 h-12` to `w-16 h-16`     |
| Icon color | White (`text-white`)           |
| Icon style | Outline/stroke (Lucide React)  |
| Icon size  | `w-6 h-6` inside box           |

### Style B: Light Circle with Emoji (Secondary)

```
    ╭───────╮
   (   🎯   )  ← 3D emoji
    ╰───────╯  ← Light purple circle
```

- Background: `bg-purple-100` or `bg-pink-50`
- Used for decorative/highlight elements

### Icon Color Mapping

| Purpose           | Background      | Icon Example |
| ----------------- | --------------- | ------------ |
| Zoology/Health    | `bg-red-500`    | Heart        |
| Security/Info     | `bg-blue-500`   | Shield       |
| Ideas/Tips        | `bg-amber-500`  | Lightbulb    |
| Faculty/Community | `bg-green-500`  | Users        |
| Goals/Targets     | `bg-purple-100` | 🎯 emoji     |

---

## 3. Component Patterns

### Hero Sections

- Full-width gradient: `from-blue-600 via-indigo-600 to-purple-600`
- White text with breadcrumb navigation
- Quick stat pills below heading
- 3-4 info cards at bottom

```tsx
<section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
  <div className="max-w-7xl mx-auto px-4">
    {/* Breadcrumb */}
    <nav className="text-sm opacity-80 mb-4">Home / Page Name</nav>

    {/* Title */}
    <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Title</h1>

    {/* Description */}
    <p className="text-xl opacity-90 mb-6 max-w-3xl">Description text here</p>

    {/* Stat Pills */}
    <div className="flex flex-wrap gap-3">
      <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Stat 1</span>
      <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Stat 2</span>
    </div>
  </div>
</section>
```

### Feature Cards (6-up grid)

```
┌─────────────────────────┐
│  ■ (icon in colored sq) │
│                         │
│  Bold Title             │
│  Gray description text  │
│  spanning 2-3 lines     │
└─────────────────────────┘
```

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-4">
    <Icon className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-xl font-bold text-gray-900 mb-2">Title</h3>
  <p className="text-gray-600">Description text goes here</p>
</div>
```

### Stat Cards (4-column)

```tsx
<div className="bg-white rounded-xl shadow-sm p-6 text-center">
  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <Icon className="w-7 h-7 text-purple-600" />
  </div>
  <div className="text-3xl font-bold text-purple-600 mb-1">98%</div>
  <div className="font-semibold text-gray-900">Success Rate</div>
  <p className="text-sm text-gray-500 mt-1">Supporting text</p>
</div>
```

### CTA Sections

```tsx
<section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
  <div className="max-w-4xl mx-auto px-4 text-center text-white">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">CTA Heading</h2>
    <p className="text-xl opacity-90 mb-8">Supporting description</p>

    {/* Checkmark List */}
    <ul className="flex flex-wrap justify-center gap-4 mb-8">
      <li className="flex items-center">
        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
        Feature 1
      </li>
    </ul>

    {/* Buttons */}
    <div className="flex flex-wrap justify-center gap-4">
      <Button className="bg-white text-purple-600">Book Demo →</Button>
      <Button className="bg-purple-800 text-white">View Courses</Button>
    </div>
  </div>
</section>
```

### Tables

```tsx
<table className="w-full">
  <thead>
    <tr className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
      <th className="px-6 py-4 text-left font-semibold">Column 1</th>
      <th className="px-6 py-4 text-left font-semibold">Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-6 py-4">Data</td>
      <td className="px-6 py-4">
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">High</span>
      </td>
    </tr>
  </tbody>
</table>
```

### Syllabus Cards (Color-coded)

```tsx
{
  /* Botany Section */
}
;<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
  <div className="flex items-center gap-3 p-4">
    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
      <Leaf className="w-5 h-5 text-green-600" />
    </div>
    <div>
      <h2 className="text-xl font-bold text-gray-900">Class 11 Botany Syllabus</h2>
      <p className="text-sm text-gray-500">Plant Biology from NCERT</p>
    </div>
  </div>

  {/* Unit */}
  <div className="p-4 border-t border-gray-100">
    <h3 className="text-green-600 font-semibold mb-3">Unit 1: Diversity in Living World</h3>

    {/* Chapter Row */}
    <div className="bg-green-50 rounded-lg p-3 flex justify-between items-center">
      <span className="text-gray-800">The Living World</span>
      <div className="flex items-center gap-2">
        <span className="text-gray-500 text-sm">Weightage: 2-3%</span>
        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">2-3 Qs</span>
      </div>
    </div>
  </div>
</div>

{
  /* Zoology Section - Same structure with red colors */
}
```

---

## 4. Typography

| Element          | Classes                                        |
| ---------------- | ---------------------------------------------- |
| Page titles      | `text-4xl md:text-5xl font-bold text-gray-900` |
| Section headings | `text-3xl md:text-4xl font-bold text-gray-900` |
| Card titles      | `text-xl font-bold text-gray-900`              |
| Body text        | `text-base text-gray-600`                      |
| Descriptions     | `text-sm text-gray-500`                        |
| Stat numbers     | `text-2xl md:text-3xl font-bold` + accent      |
| Links            | `text-blue-600 hover:text-blue-700`            |

---

## 5. Spacing & Layout

| Property          | Value                         |
| ----------------- | ----------------------------- |
| Max width         | `max-w-7xl mx-auto`           |
| Section padding   | `py-16` to `py-20`            |
| Card padding      | `p-6` to `p-8`                |
| Grid gap          | `gap-6`                       |
| Card radius       | `rounded-xl` or `rounded-2xl` |
| Icon box radius   | `rounded-2xl`                 |
| Container padding | `px-4`                        |

### Grid Layouts

```tsx
{/* 4-column grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

{/* 3-column grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{/* 2-column grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```

---

## 6. Buttons

### Primary Button (Green - Enroll)

```tsx
<button className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2">
  Enroll Now <ArrowRight className="w-4 h-4" />
</button>
```

### Secondary Button (Outline)

```tsx
<button className="border-2 border-green-500 text-green-600 hover:bg-green-50 font-medium px-6 py-3 rounded-lg flex items-center gap-2">
  <Play className="w-4 h-4" /> Demo Classes
</button>
```

### Ghost Button (White on gradient)

```tsx
<button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-medium px-6 py-3 rounded-lg">
  Book Demo →
</button>
```

---

## 7. Key Design Principles

1. **Subject color coding** - Botany=Green, Zoology=Red consistently
2. **Gradient heroes** - Blue→Purple is signature brand style
3. **Card-based layouts** - 3-4 cards per row, consistent structure
4. **White space** - Generous `py-16`+ between sections
5. **Soft shadows** - `shadow-sm` for subtle, `shadow-lg` for emphasis
6. **Rounded corners** - Everything `rounded-xl` or larger
7. **Semantic icons** - Color matches content meaning
8. **Outline icons** - White Lucide icons on solid color squares

---

## 8. Common Patterns

### Breadcrumb Navigation

```tsx
<nav className="text-sm text-white/80 mb-4">
  <Link href="/" className="hover:text-white">
    Home
  </Link>
  <span className="mx-2">/</span>
  <span>Current Page</span>
</nav>
```

### Badge/Pill

```tsx
{/* Priority badges */}
<span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">Very High</span>
<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">High</span>
<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Medium</span>

{/* Info badges */}
<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">100 Questions</span>
```

### Checkmark Lists

```tsx
<ul className="space-y-2">
  <li className="flex items-center gap-2">
    <CheckCircle className="w-5 h-5 text-green-500" />
    <span className="text-gray-700">Feature item</span>
  </li>
</ul>
```

---

## 9. Footer

```tsx
<footer className="bg-slate-900 text-white py-12">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Brand Column */}
      <div>
        <h3 className="font-bold text-lg mb-4">Cerebrum Biology Academy</h3>
        <p className="text-gray-400 text-sm">Excellence in Biology Education</p>
      </div>

      {/* Links Columns */}
      <div>
        <h4 className="font-semibold mb-4">Courses</h4>
        <ul className="space-y-2 text-gray-400">
          <li>
            <Link href="#" className="hover:text-white">
              NEET 2026
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>
```

---

## 10. Responsive Breakpoints

| Breakpoint | Width  | Usage            |
| ---------- | ------ | ---------------- |
| `sm`       | 640px  | Mobile landscape |
| `md`       | 768px  | Tablet           |
| `lg`       | 1024px | Desktop          |
| `xl`       | 1280px | Large desktop    |

---

## Quick Copy-Paste References

### Hero Gradient

```tsx
className = 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
```

### Feature Card Container

```tsx
className = 'bg-white rounded-xl shadow-sm border border-gray-100 p-6'
```

### Icon Box

```tsx
className = 'w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center'
```

### Section Container

```tsx
className = 'max-w-7xl mx-auto px-4 py-16'
```

### Card Grid

```tsx
className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
```
