#!/bin/bash

# Bioicons Fetcher
# Downloads biology icons from bioicons.com (MIT licensed)

DIAGRAMS_DIR="../../public/diagrams/bioicons"
mkdir -p "$DIAGRAMS_DIR"

# Bioicons GitHub raw URL base
BASE_URL="https://raw.githubusercontent.com/duerrsimon/bioicons/main/static/icons"

# Array of icons: "filename|category/iconname"
ICONS=(
  # Cell Biology
  "cell-generic|cell_biology/cell"
  "nucleus-generic|cell_biology/nucleus"
  "membrane|cell_biology/membrane"
  "ribosome|cell_biology/ribosome"
  "vesicle|cell_biology/vesicle"
  "golgi|cell_biology/golgi"
  "er-rough|cell_biology/rough_er"
  "er-smooth|cell_biology/smooth_er"
  "lysosome|cell_biology/lysosome"
  "peroxisome|cell_biology/peroxisome"
  "centriole|cell_biology/centriole"
  "microtubule|cell_biology/microtubule"
  "actin|cell_biology/actin"
  "cytoskeleton|cell_biology/cytoskeleton"

  # Molecular Biology
  "dna-helix|molecular_biology/dna_helix"
  "dna-double-helix|molecular_biology/dna"
  "rna-strand|molecular_biology/rna"
  "mrna|molecular_biology/mrna"
  "trna|molecular_biology/trna"
  "protein-structure|molecular_biology/protein"
  "chromosome|molecular_biology/chromosome"
  "plasmid|molecular_biology/plasmid"
  "gene|molecular_biology/gene"
  "promoter|molecular_biology/promoter"

  # Microorganisms
  "bacteria-rod|microbiology/bacteria_rod"
  "bacteria-cocci|microbiology/bacteria_cocci"
  "virus-generic|microbiology/virus"
  "bacteriophage|microbiology/phage"
  "yeast|microbiology/yeast"

  # Lab Equipment
  "microscope|lab_equipment/microscope"
  "petri-dish|lab_equipment/petri_dish"
  "test-tube|lab_equipment/test_tube"
  "beaker|lab_equipment/beaker"
  "pipette|lab_equipment/pipette"
  "pcr-tube|lab_equipment/pcr_tube"
  "centrifuge|lab_equipment/centrifuge"
  "gel-box|lab_equipment/gel_electrophoresis"

  # Organs
  "heart-icon|anatomy/heart"
  "brain-icon|anatomy/brain"
  "liver-icon|anatomy/liver"
  "kidney-icon|anatomy/kidney"
  "lung-icon|anatomy/lung"
  "stomach-icon|anatomy/stomach"
  "intestine-icon|anatomy/intestine"

  # Plants
  "leaf|plants/leaf"
  "flower-icon|plants/flower"
  "root|plants/root"
  "seed|plants/seed"
  "chloroplast-icon|plants/chloroplast"
)

echo "=== Downloading Biology Icons from Bioicons ==="
echo ""

downloaded=0
failed=0

for item in "${ICONS[@]}"; do
  IFS='|' read -r filename icon_path <<< "$item"

  output_file="$DIAGRAMS_DIR/${filename}.svg"

  # Skip if exists
  if [ -f "$output_file" ]; then
    echo "[SKIP] $filename already exists"
    continue
  fi

  # Try to download
  url="${BASE_URL}/${icon_path}.svg"
  echo "Downloading: $filename from $url"

  curl -s -L -f -o "$output_file" "$url"

  if [ -f "$output_file" ] && [ -s "$output_file" ]; then
    echo "  [OK] Saved: ${filename}.svg"
    ((downloaded++))
  else
    # Try alternate naming conventions
    alt_url="${BASE_URL}/${icon_path}_1.svg"
    curl -s -L -f -o "$output_file" "$alt_url"

    if [ -f "$output_file" ] && [ -s "$output_file" ]; then
      echo "  [OK] Saved: ${filename}.svg (alt)"
      ((downloaded++))
    else
      echo "  [FAILED] Could not download"
      rm -f "$output_file"
      ((failed++))
    fi
  fi

  sleep 0.2
done

echo ""
echo "=== SUMMARY ==="
echo "Downloaded: $downloaded"
echo "Failed: $failed"
echo ""

if [ -d "$DIAGRAMS_DIR" ]; then
  count=$(ls -1 "$DIAGRAMS_DIR"/*.svg 2>/dev/null | wc -l)
  echo "Total SVGs in bioicons directory: $count"
fi
