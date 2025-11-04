# Progressive Loading Indicators - Visual Guide

## Component Hierarchy

```
ProgressIndicator (Main Component)
├── Linear Variant
│   ├── Progress Bar (horizontal)
│   ├── Status Text
│   ├── Step Counter (1/5)
│   ├── Percentage (40%)
│   ├── Estimated Time (30s remaining)
│   └── Cancel Button (optional)
│
├── Circular Variant
│   ├── Progress Ring (circular)
│   ├── Center Percentage
│   ├── Status Text (below)
│   ├── Step Counter
│   └── Estimated Time
│
└── Compact Variant
    ├── Mini Progress Ring
    ├── Status Text (inline)
    ├── Progress Percentage
    └── Cancel Button (icon)

StepIndicator (Step-by-Step Component)
├── Horizontal Layout
│   ├── Step 1 ─── Step 2 ─── Step 3 ─── Step 4
│   ├── Connected with animated lines
│   └── Each step shows: Number/Icon + Label + Description
│
└── Vertical Layout
    ├── Step 1
    │   │ (connector)
    ├── Step 2
    │   │ (connector)
    ├── Step 3
    │   │ (connector)
    └── Step 4
```

## Visual States

### Progress States

```
┌─────────────────────────────────────┐
│ Linear Progress Bar                 │
├─────────────────────────────────────┤
│ [████████░░░░░░░░░░░░] 40%         │
│ Processing step 2 of 5...           │
│ Step 2 of 5 • 40% • 30s remaining  │
│                          [Cancel]    │
└─────────────────────────────────────┘
```

```
┌─────────────────────┐
│  Circular Progress  │
│                     │
│       ╭───╮         │
│      ╱     ╲        │
│     │   40%  │      │
│      ╲     ╱        │
│       ╰───╯         │
│                     │
│ Processing step 2   │
│ Step 2 of 5         │
│ 30s remaining       │
└─────────────────────┘
```

```
┌──────────────────────────────────────┐
│ Compact (Inline)                     │
│ ●  Processing... │ 40% │ 2/5    [×] │
└──────────────────────────────────────┘
```

### Step Indicator States

#### Horizontal Layout
```
┌──────────────────────────────────────────────────────┐
│  (✓)────────●────────○────────○                      │
│  Setup   Process   Verify   Complete                 │
│  Done    Running   Pending   Pending                 │
└──────────────────────────────────────────────────────┘

Legend:
(✓) = Completed (green)
 ●  = In Progress (blue, pulsing)
 ○  = Pending (gray)
 ─  = Connector (animated when step completes)
```

#### Vertical Layout
```
┌─────────────────────────┐
│ (✓) Setup               │
│  │  Configuration done  │
│  ├─────────────────────│
│  ●  Process             │
│  │  Running operation  │
│  ├─────────────────────│
│  ○  Verify              │
│  │  Awaiting...        │
│  ├─────────────────────│
│  ○  Complete            │
│     Ready to finish     │
└─────────────────────────┘
```

## Color Themes

### Blue Theme (Default)
```
Progress: ████████ (Blue #3B82F6)
Background: ░░░░░░░░ (Slate #E2E8F0)
Text: Dark Blue (#1E40AF)
```

### Emerald Theme (Success/Upload)
```
Progress: ████████ (Emerald #10B981)
Background: ░░░░░░░░ (Slate #E2E8F0)
Text: Dark Green (#047857)
```

### Purple Theme (Export/Transform)
```
Progress: ████████ (Purple #8B5CF6)
Background: ░░░░░░░░ (Slate #E2E8F0)
Text: Dark Purple (#6D28D9)
```

### Amber Theme (Warning/Bulk)
```
Progress: ████████ (Amber #F59E0B)
Background: ░░░░░░░░ (Slate #E2E8F0)
Text: Dark Amber (#B45309)
```

## Size Variations

### Small (sm)
```
Height: 1.5 (6px)
Circle: 6 (24px)
Text: xs (12px)
Spacing: gap-2 (8px)
```

### Medium (md) - Default
```
Height: 2.5 (10px)
Circle: 8 (32px)
Text: sm (14px)
Spacing: gap-4 (16px)
```

### Large (lg)
```
Height: 3 (12px)
Circle: 10 (40px)
Text: base (16px)
Spacing: gap-6 (24px)
```

## Animation Flow

### Linear Progress Animation
```
Frame 1: [░░░░░░░░░░░░░░░░░░░░] 0%
Frame 2: [██░░░░░░░░░░░░░░░░░░] 10%
Frame 3: [████░░░░░░░░░░░░░░░░] 20%
Frame 4: [██████░░░░░░░░░░░░░░] 30%
Frame 5: [████████░░░░░░░░░░░░] 40%
Frame 6: [██████████░░░░░░░░░░] 50%

Duration: 500ms per step
Easing: ease-out
```

### Circular Progress Animation
```
   0%        25%        50%        75%       100%
   ●         ◔          ◑          ◕          ●

Stroke Animation:
- strokeDasharray: 264
- strokeDashoffset: 264 → 0
- Duration: 500ms
- Rotation: -90deg start
```

### Step Indicator Animation
```
Step Completion Sequence:
1. Circle fills with color (200ms)
2. Check icon fades in (150ms)
3. Connector line animates (300ms)
4. Next step ring pulse (200ms)

Total: ~850ms per step
```

### Indeterminate Animation
```
[    ●→      ] → [     ●→     ] → [      ●→    ]
[   ●→       ] → [    ●→      ] → [     ●→     ]

Continuous loop
Duration: 1.5s per cycle
Width: 40% of bar
Movement: Linear from -100% to 250%
```

## Use Case Patterns

### Pattern 1: Simple Progress
```tsx
// Single operation with known progress
<ProgressIndicator
  current={progress}
  total={100}
  status="Loading..."
  variant="linear"
/>
```

### Pattern 2: Multi-Step Process
```tsx
// Complex workflow with distinct phases
<StepIndicator steps={steps} currentStep={current} />
<ProgressIndicator
  current={current}
  total={steps.length}
  status={steps[current].description}
  variant="linear"
/>
```

### Pattern 3: File Upload
```tsx
// Upload with processing phase
<ProgressIndicator
  current={uploadPhase}
  total={2}
  percentage={uploadProgress}
  status={uploadProgress < 100 ? "Uploading..." : "Processing..."}
  variant="circular"
  color="emerald"
/>
```

### Pattern 4: Bulk Operations
```tsx
// Many items to process
<ProgressIndicator
  current={processed}
  total={totalItems}
  status={`Processing item ${processed} of ${totalItems}`}
  showSteps={false}
  variant="linear"
  color="amber"
/>
```

## Status Message Templates

### Good Status Messages
```
✓ "Generating question 25 of 50..."
✓ "Uploading file... 45%"
✓ "Processing batch 3 of 10..."
✓ "Validating question quality..."
✓ "Formatting test document..."
```

### Avoid
```
✗ "Loading..."  (too generic)
✗ "Please wait"  (no context)
✗ "Working..."  (vague)
✗ "Processing file.pdf..."  (too specific)
```

## Error States

### Error Display
```
┌─────────────────────────────────────┐
│ [████████░░░░░░░░░░░░] ⚠           │
│ ⚠ Failed to upload file             │
│ Connection timeout. Please retry.   │
│                       [Retry] [×]   │
└─────────────────────────────────────┘
```

### Success Display
```
┌─────────────────────────────────────┐
│ [████████████████████] ✓           │
│ ✓ Upload complete!                  │
│ File processed successfully         │
│                      [Download]     │
└─────────────────────────────────────┘
```

## Responsive Behavior

### Desktop (> 1024px)
```
┌──────────────────────────────────────────┐
│ [████████████░░░░░░░░░░░░] 60%          │
│ Step 3 of 5 • 60% • 45s remaining       │
│                              [Cancel]    │
└──────────────────────────────────────────┘
```

### Tablet (768px - 1024px)
```
┌────────────────────────────────┐
│ [████████░░░░░░░░] 60%        │
│ Step 3 of 5 • 45s remaining   │
│                    [Cancel]    │
└────────────────────────────────┘
```

### Mobile (< 768px)
```
┌───────────────────────┐
│ [████░░░░] 60%       │
│ Step 3 of 5          │
│ 45s remaining        │
│        [Cancel]      │
└───────────────────────┘
```

## Integration Checklist

- [ ] Import component
- [ ] Set up progress state
- [ ] Configure variant and color
- [ ] Add status messages
- [ ] Implement cancel handler (if needed)
- [ ] Add error handling
- [ ] Test all states
- [ ] Test on mobile
- [ ] Test accessibility
- [ ] Add loading skeleton (optional)

## Performance Tips

### Good Practice
```tsx
// Update every 100ms
const interval = setInterval(() => {
  setProgress(prev => prev + 1)
}, 100)
```

### Avoid
```tsx
// Too frequent updates (every 10ms)
const interval = setInterval(() => {
  setProgress(prev => prev + 1)
}, 10)  // Performance issue!
```

## Quick Copy-Paste Examples

### Test Generation
```tsx
<ProgressIndicator
  current={currentStep}
  total={5}
  percentage={progress}
  status="Generating questions with AI..."
  estimatedTime={45}
  variant="linear"
  color="blue"
  onCancel={() => cancelGeneration()}
/>
```

### File Upload
```tsx
<ProgressIndicator
  current={1}
  total={1}
  percentage={uploadProgress}
  status="Uploading document.pdf..."
  variant="circular"
  color="emerald"
  size="lg"
/>
```

### Bulk Operations
```tsx
<ProgressIndicator
  current={processedCount}
  total={totalItems}
  status={`Processing ${processedCount}/${totalItems} items`}
  variant="compact"
  color="amber"
  showSteps={false}
/>
```

## Keyboard Shortcuts

When cancel button is focused:
- `Enter` or `Space`: Cancel operation
- `Escape`: Cancel operation (if enabled)
- `Tab`: Navigate away

## ARIA Attributes

Components include:
- `role="progressbar"`
- `aria-valuenow={current}`
- `aria-valuemin="0"`
- `aria-valuemax={total}`
- `aria-label={status}`
- `aria-busy="true"` (when loading)

---

**Visual Guide Version**: 1.0
**Last Updated**: 2025-11-04
