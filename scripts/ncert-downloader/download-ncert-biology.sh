#!/bin/bash

# NCERT Biology Textbook Downloader
# Downloads official PDFs from ncert.nic.in
# These are freely available educational resources

NCERT_DIR="../../resources/ncert-textbooks"
mkdir -p "$NCERT_DIR/class-11"
mkdir -p "$NCERT_DIR/class-12"

BASE_URL="https://ncert.nic.in/textbook/pdf"

echo "=== Downloading NCERT Biology Textbooks ==="
echo ""

# Class 11 Biology (kebo = Biology Class 11)
# Chapters: 01-22
CLASS_11_CHAPTERS=(
  "kebo101|01-The-Living-World"
  "kebo102|02-Biological-Classification"
  "kebo103|03-Plant-Kingdom"
  "kebo104|04-Animal-Kingdom"
  "kebo105|05-Morphology-of-Flowering-Plants"
  "kebo106|06-Anatomy-of-Flowering-Plants"
  "kebo107|07-Structural-Organisation-in-Animals"
  "kebo108|08-Cell-The-Unit-of-Life"
  "kebo109|09-Biomolecules"
  "kebo110|10-Cell-Cycle-and-Cell-Division"
  "kebo111|11-Transport-in-Plants"
  "kebo112|12-Mineral-Nutrition"
  "kebo113|13-Photosynthesis-in-Higher-Plants"
  "kebo114|14-Respiration-in-Plants"
  "kebo115|15-Plant-Growth-and-Development"
  "kebo116|16-Digestion-and-Absorption"
  "kebo117|17-Breathing-and-Exchange-of-Gases"
  "kebo118|18-Body-Fluids-and-Circulation"
  "kebo119|19-Excretory-Products-and-their-Elimination"
  "kebo120|20-Locomotion-and-Movement"
  "kebo121|21-Neural-Control-and-Coordination"
  "kebo122|22-Chemical-Coordination-and-Integration"
)

# Class 12 Biology (lebo = Biology Class 12)
# Chapters: 01-16
CLASS_12_CHAPTERS=(
  "lebo101|01-Reproduction-in-Organisms"
  "lebo102|02-Sexual-Reproduction-in-Flowering-Plants"
  "lebo103|03-Human-Reproduction"
  "lebo104|04-Reproductive-Health"
  "lebo105|05-Principles-of-Inheritance-and-Variation"
  "lebo106|06-Molecular-Basis-of-Inheritance"
  "lebo107|07-Evolution"
  "lebo108|08-Human-Health-and-Disease"
  "lebo109|09-Strategies-for-Enhancement-in-Food-Production"
  "lebo110|10-Microbes-in-Human-Welfare"
  "lebo111|11-Biotechnology-Principles-and-Processes"
  "lebo112|12-Biotechnology-and-its-Applications"
  "lebo113|13-Organisms-and-Populations"
  "lebo114|14-Ecosystem"
  "lebo115|15-Biodiversity-and-Conservation"
  "lebo116|16-Environmental-Issues"
)

downloaded=0
failed=0

echo "=== Downloading Class 11 Biology (22 chapters) ==="
for item in "${CLASS_11_CHAPTERS[@]}"; do
  IFS='|' read -r code name <<< "$item"

  output_file="$NCERT_DIR/class-11/${name}.pdf"

  if [ -f "$output_file" ]; then
    echo "[SKIP] $name already exists"
    continue
  fi

  echo "Downloading: $name"
  curl -s -L -o "$output_file" "${BASE_URL}/${code}.pdf"

  if [ -f "$output_file" ] && [ -s "$output_file" ]; then
    size=$(du -h "$output_file" | cut -f1)
    echo "  [OK] $size"
    ((downloaded++))
  else
    echo "  [FAILED]"
    rm -f "$output_file"
    ((failed++))
  fi

  sleep 0.5
done

echo ""
echo "=== Downloading Class 12 Biology (16 chapters) ==="
for item in "${CLASS_12_CHAPTERS[@]}"; do
  IFS='|' read -r code name <<< "$item"

  output_file="$NCERT_DIR/class-12/${name}.pdf"

  if [ -f "$output_file" ]; then
    echo "[SKIP] $name already exists"
    continue
  fi

  echo "Downloading: $name"
  curl -s -L -o "$output_file" "${BASE_URL}/${code}.pdf"

  if [ -f "$output_file" ] && [ -s "$output_file" ]; then
    size=$(du -h "$output_file" | cut -f1)
    echo "  [OK] $size"
    ((downloaded++))
  else
    echo "  [FAILED]"
    rm -f "$output_file"
    ((failed++))
  fi

  sleep 0.5
done

echo ""
echo "=== SUMMARY ==="
echo "Downloaded: $downloaded"
echo "Failed: $failed"
echo ""
echo "Class 11 chapters:"
ls -la "$NCERT_DIR/class-11/" 2>/dev/null | wc -l
echo "Class 12 chapters:"
ls -la "$NCERT_DIR/class-12/" 2>/dev/null | wc -l
echo ""
echo "Total size:"
du -sh "$NCERT_DIR"
