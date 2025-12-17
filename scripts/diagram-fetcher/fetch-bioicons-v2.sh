#!/bin/bash

# Bioicons Fetcher v2
# Downloads biology icons from bioicons.com using proper path structure

DIAGRAMS_DIR="../../public/diagrams/bioicons"
mkdir -p "$DIAGRAMS_DIR"

# Base URL for raw GitHub content
BASE_URL="https://raw.githubusercontent.com/duerrsimon/bioicons/main/static/icons"

# Array of icons: "output_name|license|category|author|icon_name"
# Based on actual icons.json structure
ICONS=(
  # Intracellular components (Servier)
  "mitochondrium-1|cc-by-3.0|Intracellular_components|Servier|mitochondrium-1"
  "mitochondrium-2|cc-by-3.0|Intracellular_components|Servier|mitochondrium-2"
  "nucleus-full|cc-by-3.0|Intracellular_components|Servier|nucleus-full-3d"
  "golgi-3d|cc-by-3.0|Intracellular_components|Servier|golgi-3d-1"
  "endoplasmic-reticulum|cc-by-3.0|Intracellular_components|Servier|endoplasmatic-reticulum-rough"
  "ribosome|cc-by-3.0|Intracellular_components|Servier|ribosome"
  "enzyme-blue|cc-by-3.0|Intracellular_components|Servier|enzyme-blue-3d"
  "protein-structure|cc-by-3.0|Intracellular_components|Servier|protein-2"
  "actin-filament|cc-by-3.0|Intracellular_components|Servier|actine-filament"
  "microtubule|cc-by-3.0|Intracellular_components|Servier|cell-microtubule"

  # Cell membrane (Servier)
  "cell-membrane-lipid|cc-by-3.0|Cell_membrane|Servier|membrane-3d-bluelight"
  "cell-membrane-2d|cc-by-3.0|Cell_membrane|Servier|membrane-2d-bluelight"
  "endocytosis|cc-by-3.0|Cell_membrane|Servier|endocytosis"
  "exocytosis|cc-by-3.0|Cell_membrane|Servier|exocytosis"
  "phagocytosis|cc-by-3.0|Cell_membrane|Servier|phagocytosis"
  "vacuole|cc-by-3.0|Cell_membrane|Servier|vacuole-round"
  "lipid-bilayer|cc-by-3.0|Cell_membrane|Servier|lipid-blue"

  # Lab apparatus (Servier)
  "microscope|cc-by-3.0|Lab_apparatus|Servier|microscope"
  "centrifuge|cc-by-3.0|Lab_apparatus|Servier|centrifuge"
  "gel-electrophoresis|cc-by-3.0|Lab_apparatus|Servier|gel-electrophoresis"
  "spectrophotometer|cc-by-3.0|Lab_apparatus|Servier|spectrophotometer"
  "incubator|cc-by-3.0|Lab_apparatus|Servier|incubator"

  # Chemistry (Servier)
  "test-tube|cc-by-3.0|Chemistry|Servier|testtube-glass"
  "beaker|cc-by-3.0|Chemistry|Servier|beaker-empty"
  "erlenmeyer-flask|cc-by-3.0|Chemistry|Servier|erlenmeyer-glass"
  "pipette|cc-by-3.0|Chemistry|Servier|micropipette"
  "measuring-cylinder|cc-by-3.0|Chemistry|Servier|measuringcylinder-empty"

  # Animals (Servier - model organisms)
  "mouse-lab|cc-by-3.0|Animals|Servier|mouse-gray"
  "drosophila|cc-by-3.0|Animals|Servier|drosophila-redeyes"
  "rat-lab|cc-by-3.0|Animals|Servier|rat-white"
)

echo "=== Downloading Biology Icons from Bioicons (v2) ==="
echo ""

downloaded=0
skipped=0
failed=0

for item in "${ICONS[@]}"; do
  IFS='|' read -r output_name license category author icon_name <<< "$item"

  output_file="$DIAGRAMS_DIR/${output_name}.svg"

  # Skip if exists
  if [ -f "$output_file" ]; then
    echo "[SKIP] $output_name already exists"
    ((skipped++))
    continue
  fi

  # Construct URL: BASE/license/category/author/icon_name.svg
  url="${BASE_URL}/${license}/${category}/${author}/${icon_name}.svg"
  echo "Downloading: $output_name"
  echo "  URL: $url"

  curl -s -L -f -o "$output_file" "$url"

  if [ -f "$output_file" ] && [ -s "$output_file" ]; then
    echo "  [OK] Saved: ${output_name}.svg"
    ((downloaded++))
  else
    echo "  [FAILED] Could not download"
    rm -f "$output_file"
    ((failed++))
  fi

  sleep 0.2
done

echo ""
echo "=== SUMMARY ==="
echo "Downloaded: $downloaded"
echo "Skipped: $skipped"
echo "Failed: $failed"
echo ""

if [ -d "$DIAGRAMS_DIR" ]; then
  count=$(ls -1 "$DIAGRAMS_DIR"/*.svg 2>/dev/null | wc -l)
  echo "Total SVGs in bioicons directory: $count"
fi
