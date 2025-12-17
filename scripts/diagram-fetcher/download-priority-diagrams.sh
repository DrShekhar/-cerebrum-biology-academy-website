#!/bin/bash

# NCERT Priority Diagrams Downloader
# Downloads HIGH priority missing diagrams from Wikimedia Commons

DIAGRAMS_DIR="../../public/diagrams"
mkdir -p "$DIAGRAMS_DIR"

# HIGH PRIORITY DIAGRAMS - Batch 1 (Most Essential)
# Format: "filename|wikimedia_title"
DIAGRAMS=(
  # Classification & Diversity
  "five-kingdom-classification|File:Five_kingdom_classification.svg"
  "plasmodium-lifecycle|File:Plasmodium lifecycle.svg"
  "moss-lifecycle|File:Lifecycle moss svg diagram.svg"
  "fern-lifecycle|File:Pteridophyte lifecycle.svg"

  # Animal Kingdom - Body Organization
  "body-symmetry|File:Animal body symmetry.svg"
  "coelom-types|File:Body cavities types.svg"
  "hydra-structure|File:Hydra anatomy.svg"
  "earthworm-anatomy|File:Earthworm diagram.svg"
  "cockroach-anatomy|File:Cockroach-dorsal.svg"
  "frog-anatomy|File:Frog internal anatomy.svg"

  # Plant Morphology
  "root-types|File:Root types en.svg"
  "root-modifications|File:Root modifications.svg"
  "stem-modifications|File:Modified stems.svg"
  "leaf-venation|File:Leaf venation types.svg"
  "inflorescence-types|File:Inflorescence types.svg"
  "aestivation-types|File:Aestivation types.svg"
  "placentation-types|File:Placentation types.svg"
  "dicot-monocot-seed|File:Monocot vs dicot.svg"
  "floral-diagram|File:Floral diagram.svg"

  # Plant Anatomy
  "plant-tissues|File:Plant tissue types.svg"
  "xylem-phloem|File:Xylem and phloem diagram.svg"
  "dicot-root-ts|File:Dicot root cross section.svg"
  "monocot-root-ts|File:Monocot root.svg"
  "dicot-stem-ts|File:Dicot stem cross section.svg"
  "monocot-stem-ts|File:Monocot stem cross section.svg"
  "dicot-leaf-ts|File:Leaf cross-section.svg"
  "secondary-growth|File:Secondary growth dicot.svg"
  "stomata-structure|File:Stoma diagram open closed.svg"

  # Animal Tissues
  "epithelial-tissue|File:Epithelial tissues.svg"
  "connective-tissue|File:Connective tissue types.svg"
  "muscle-tissue-types|File:Muscle tissue types.svg"

  # Cell Structure
  "cilia-flagella|File:Cilia and flagella.svg"
  "9plus2-arrangement|File:Eukaryotic cilium diagram en.svg"

  # Biomolecules
  "amino-acid|File:Amino acid structure general en.svg"
  "peptide-bond|File:Peptide bond.svg"
  "protein-levels|File:Protein structure levels.svg"
  "nucleotide|File:Nucleotide basic structure.svg"
  "enzyme-lock-key|File:Induced fit diagram.svg"
  "atp-structure|File:ATP structure.svg"

  # Cell Division
  "cell-cycle|File:Cell Cycle 2.svg"
  "chromosome-structure|File:Chromosome diagram.svg"
  "crossing-over|File:Chromosomal crossover.svg"

  # Plant Physiology
  "plasmolysis|File:Plasmolysis.svg"
  "transpiration-pull|File:Transpiration.svg"
  "stomata-opening|File:Stomata opening mechanism.svg"
  "z-scheme|File:Z-scheme.svg"
  "photosystem|File:Photosystems diagram.svg"
  "c4-pathway|File:C4 carbon fixation.svg"
  "kranz-anatomy|File:C4 anatomy.svg"
  "glycolysis|File:Glycolysis.svg"
  "etc-chain|File:Electron transport chain.svg"
  "chemiosmosis|File:Chemiosmosis.svg"

  # Human Physiology - Digestive
  "stomach-structure|File:Stomach diagram.svg"
  "intestine-villi|File:Small intestine villus.svg"
  "liver-pancreas|File:Digestive system diagram.svg"

  # Human Physiology - Respiratory
  "lungs-alveoli|File:Alveoli diagram.svg"
  "breathing-mechanism|File:Inspiration expiration.svg"
  "oxygen-dissociation|File:Oxygen dissociation curve.svg"
  "lung-volumes|File:Lung volumes.svg"

  # Human Physiology - Circulatory
  "blood-cells|File:Blood cells.svg"
  "heart-internal|File:Heart diagram blood flow en.svg"
  "cardiac-cycle|File:Cardiac cycle.svg"
  "ecg-waveform|File:ECG principle slow.svg"
  "double-circulation|File:Double circulation.svg"
  "blood-vessels|File:Blood vessel comparison.svg"

  # Human Physiology - Excretory
  "excretory-system|File:Urinary system.svg"
  "kidney-section|File:Kidney cross section.svg"
  "urine-formation|File:Physiology of Nephron.svg"
  "counter-current|File:Counter current exchange.svg"

  # Human Physiology - Locomotion
  "human-skeleton|File:Human skeleton front en.svg"
  "joint-types|File:Joint types.svg"
  "synovial-joint|File:Synovial joint.svg"
  "skeletal-muscle|File:Skeletal muscle.svg"
  "sliding-filament|File:Sliding filament model.svg"

  # Human Physiology - Neural
  "reflex-arc|File:Reflex arc.svg"
  "action-potential|File:Action potential.svg"
  "brain-lateral|File:Brain human lateral view.svg"
  "spinal-cord-ts|File:Spinal cord cross section.svg"
  "cochlea|File:Cochlea-crosssection.svg"
  "organ-of-corti|File:Organ of corti.svg"

  # Human Physiology - Endocrine
  "endocrine-glands|File:Endocrine system.svg"
  "hypothalamus-pituitary|File:Hypothalamus pituitary.svg"
  "hormone-action|File:Signal transduction pathways.svg"

  # Reproduction - Plant
  "stamen-structure|File:Stamen structure.svg"
  "microsporogenesis|File:Microsporogenesis.svg"
  "pollen-grain|File:Pollen grain structure.svg"
  "pistil-structure|File:Pistil structure.svg"
  "megasporogenesis|File:Megasporogenesis.svg"
  "double-fertilization|File:Double fertilization.svg"
  "embryo-development|File:Plant embryogenesis.svg"

  # Reproduction - Human
  "male-reproductive|File:Male reproductive system.svg"
  "testis-section|File:Testis-histology.svg"
  "spermatogenesis|File:Spermatogenesis.svg"
  "female-reproductive|File:Female reproductive system.svg"
  "ovary-section|File:Ovary and follicle.svg"
  "oogenesis|File:Oogenesis.svg"
  "graafian-follicle|File:Graafian follicle.svg"
  "cleavage-stages|File:Human embryonic development.svg"
  "blastocyst|File:Blastocyst structure.svg"
  "placenta-structure|File:Placental cord.svg"

  # Genetics
  "monohybrid-cross|File:Mendelian inheritance.svg"
  "dihybrid-cross|File:Dihybrid cross.svg"
  "incomplete-dominance|File:Incomplete dominance.svg"
  "sex-determination|File:XY sex determination.svg"
  "pedigree-symbols|File:Pedigree chart symbols.svg"
  "dna-packaging|File:Chromatin structure.svg"
  "replication-fork|File:DNA replication fork.svg"
  "transcription|File:Transcription.svg"
  "mrna-splicing|File:RNA splicing.svg"
  "trna-structure|File:TRNA structure.svg"
  "dna-fingerprinting|File:DNA fingerprinting.svg"

  # Evolution
  "miller-urey|File:Miller-Urey experiment.svg"
  "homologous-organs|File:Homology vertebrates.svg"
  "analogous-organs|File:Analogy insect bird wing.svg"
  "darwin-finches|File:Darwin finches.svg"
  "human-evolution|File:Human evolution.svg"
  "natural-selection|File:Types of selection.svg"

  # Health & Disease
  "hiv-structure|File:HIV structure.svg"
  "hiv-lifecycle|File:HIV replication cycle.svg"
  "antibody-structure|File:Antibody.svg"
  "immune-response|File:Immune response.svg"

  # Biotechnology
  "restriction-enzyme|File:Restriction enzyme.svg"
  "pbr322|File:PBR322.svg"
  "rdna-technology|File:Recombinant DNA.svg"
  "bioreactor|File:Bioreactor.svg"
  "ti-plasmid|File:Ti plasmid.svg"
  "bt-cotton|File:Bt toxin.svg"
  "rnai|File:RNA interference.svg"
  "gene-therapy|File:Gene therapy.svg"

  # Ecology
  "population-growth|File:Population curves.svg"
  "age-pyramid|File:Age pyramid types.svg"
  "ecosystem-structure|File:Ecosystem diagram.svg"
  "ecological-pyramids|File:Ecological pyramid.svg"
  "energy-flow|File:Energy flow ecosystem.svg"
  "phosphorus-cycle|File:Phosphorus cycle.svg"
  "ecological-succession|File:Ecological succession.svg"
  "greenhouse-effect|File:Greenhouse effect.svg"
  "ozone-depletion|File:Ozone cycle.svg"
  "biomagnification|File:Biomagnification.svg"
)

echo "=== Downloading NCERT Priority Diagrams from Wikimedia Commons ==="
echo "Total diagrams to fetch: ${#DIAGRAMS[@]}"
echo ""

downloaded=0
failed=0
skipped=0

for item in "${DIAGRAMS[@]}"; do
  IFS='|' read -r filename wiki_title <<< "$item"

  # Check if exists with any extension
  if [ -f "$DIAGRAMS_DIR/${filename}.svg" ] || [ -f "$DIAGRAMS_DIR/${filename}.png" ]; then
    echo "[SKIP] $filename already exists"
    ((skipped++))
    continue
  fi

  echo "Fetching: $filename"

  # URL encode the title
  encoded_title=$(echo "$wiki_title" | sed 's/ /%20/g')

  # Get image URL from API
  api_url="https://commons.wikimedia.org/w/api.php?action=query&titles=${encoded_title}&prop=imageinfo&iiprop=url&format=json"

  response=$(curl -s "$api_url")
  image_url=$(echo "$response" | grep -o '"url":"[^"]*"' | head -1 | sed 's/"url":"//;s/"$//')

  if [ -z "$image_url" ]; then
    echo "  [FAILED] Could not get URL for $wiki_title"
    ((failed++))
    continue
  fi

  # Determine extension
  if [[ "$image_url" == *.svg ]]; then
    ext="svg"
  elif [[ "$image_url" == *.png ]]; then
    ext="png"
  elif [[ "$image_url" == *.jpg ]] || [[ "$image_url" == *.jpeg ]]; then
    ext="jpg"
  else
    ext="svg"
  fi

  output_file="$DIAGRAMS_DIR/${filename}.${ext}"

  # Download
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
echo "Skipped: $skipped"
echo "Failed: $failed"
echo ""
echo "Total files in diagrams directory:"
ls -1 "$DIAGRAMS_DIR" | wc -l
