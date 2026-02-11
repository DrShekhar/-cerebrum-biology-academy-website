#!/bin/bash

# Bulk Image Generator for Remaining 85 Blog Images
# All images: 1200x630px SVG, Cerebrum brand colors

cd public/blog || exit

# Theme 1: NEET Strategy Images (15 images)
echo "Creating NEET strategy images..."

for img in \
  "neet-100-day-strategy" \
  "neet-4-month-plan" \
  "neet-30-day-revision" \
  "neet-score-improvement" \
  "neet-revision-strategy" \
  "neet-time-management" \
  "avoid-silly-mistakes-neet" \
  "neet-negative-marking" \
  "neet-exam-day-tips" \
  "neet-mental-stress-guide" \
  "neet-drop-year-strategy" \
  "neet-dropper-guide" \
  "neet-dropper-routine" \
  "neet-dropper-batch-2026" \
  "dropper-case-studies"
do
  cat > "${img}.svg" << 'EOF'
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7c3aed;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#5b21b6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#grad)"/>
  <text x="100" y="250" font-family="Arial, sans-serif" font-size="76" font-weight="bold" fill="#ffffff">NEET Strategy</text>
  <text x="100" y="350" font-family="Arial, sans-serif" font-size="48" fill="#fef3c7">Complete Guide 2026</text>
  <circle cx="1050" cy="315" r="80" fill="#22c55e" opacity="0.9"/>
  <text x="1050" y="330" font-family="Arial, sans-serif" font-size="52" font-weight="bold" fill="#ffffff" text-anchor="middle">650+</text>
</svg>
EOF
done

echo "✅ Created 15 NEET strategy images"
echo "Total created: 22/92"
echo "Remaining: 70 images"

