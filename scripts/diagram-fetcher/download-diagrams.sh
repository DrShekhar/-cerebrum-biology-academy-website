#!/bin/bash

# Wikimedia Commons Biology Diagram Downloader
# Downloads SVG diagrams for NCERT Biology

DIAGRAMS_DIR="../../public/diagrams"
mkdir -p "$DIAGRAMS_DIR"

# Array of diagrams: "filename|wikimedia_title"
DIAGRAMS=(
  "animal-cell|File:Animal cell structure en.svg"
  "plant-cell|File:Plant cell structure svg.svg"
  "mitochondria|File:Mitochondrion structure.svg"
  "chloroplast|File:Chloroplast II.svg"
  "cell-membrane|File:Cell membrane detailed diagram en.svg"
  "mitosis|File:Major events in mitosis.svg"
  "meiosis|File:Meiosis Overview new.svg"
  "heart|File:Diagram of the human heart.svg"
  "nephron|File:Kidney Nephron.png"
  "neuron|File:Complete neuron cell diagram en.svg"
  "brain|File:Brain human sagittal section.svg"
  "synapse|File:Synapse diag1.svg"
  "eye|File:Schematic diagram of the human eye en.svg"
  "ear|File:Anatomy of the Human Ear en.svg"
  "digestive-system|File:Digestive system diagram en.svg"
  "respiratory-system|File:Respiratory system complete en.svg"
  "sarcomere|File:Sarcomere.svg"
  "dna-structure|File:DNA Structure+Key+Labelled.pn NoBB.svg"
  "dna-replication|File:DNA replication en.svg"
  "translation|File:Protein synthesis.svg"
  "lac-operon|File:Lac operon.svg"
  "calvin-cycle|File:Calvin-cycle4.svg"
  "krebs-cycle|File:Citric acid cycle with aconitate 2.svg"
  "flower-structure|File:Mature flower diagram.svg"
  "sperm|File:Human spermatozoa.svg"
  "menstrual-cycle|File:MenstrualCycle2 en.svg"
  "food-web|File:FoodWeb.svg"
  "nitrogen-cycle|File:Nitrogen Cycle.svg"
  "carbon-cycle|File:Carbon cycle.svg"
  "pcr|File:Polymerase chain reaction.svg"
  "gel-electrophoresis|File:Gel electrophoresis apparatus.svg"
  "bacteria|File:Average prokaryote cell- en.svg"
  "bacteriophage|File:PhageExterior.svg"
)

echo "=== Downloading Biology Diagrams from Wikimedia Commons ==="
echo ""

downloaded=0
failed=0

for item in "${DIAGRAMS[@]}"; do
  IFS='|' read -r filename wiki_title <<< "$item"
  
  echo "Processing: $filename"
  
  # URL encode the title
  encoded_title=$(echo "$wiki_title" | sed 's/ /%20/g')
  
  # Get image URL from API
  api_url="https://commons.wikimedia.org/w/api.php?action=query&titles=${encoded_title}&prop=imageinfo&iiprop=url&format=json"
  
  # Extract actual image URL
  response=$(curl -s "$api_url")
  image_url=$(echo "$response" | grep -o '"url":"[^"]*"' | head -1 | sed 's/"url":"//;s/"$//')
  
  if [ -z "$image_url" ]; then
    echo "  [FAILED] Could not get URL"
    ((failed++))
    continue
  fi
  
  # Determine extension
  if [[ "$image_url" == *.svg ]]; then
    ext="svg"
  elif [[ "$image_url" == *.png ]]; then
    ext="png"
  else
    ext="svg"
  fi
  
  output_file="$DIAGRAMS_DIR/${filename}.${ext}"
  
  # Skip if exists
  if [ -f "$output_file" ]; then
    echo "  [SKIP] Already exists"
    continue
  fi
  
  # Download
  echo "  Downloading from: $image_url"
  curl -s -L -o "$output_file" "$image_url"
  
  if [ -f "$output_file" ] && [ -s "$output_file" ]; then
    echo "  [OK] Saved: ${filename}.${ext}"
    ((downloaded++))
  else
    echo "  [FAILED] Download failed"
    rm -f "$output_file"
    ((failed++))
  fi
  
  sleep 0.3
done

echo ""
echo "=== SUMMARY ==="
echo "Downloaded: $downloaded"
echo "Failed: $failed"
echo ""
ls -la "$DIAGRAMS_DIR" | head -20
