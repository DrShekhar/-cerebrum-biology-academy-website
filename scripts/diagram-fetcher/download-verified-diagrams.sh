#!/bin/bash

# Verified Wikimedia Diagrams Downloader
# Uses exact, verified Wikimedia Commons file names

DIAGRAMS_DIR="../../public/diagrams"
mkdir -p "$DIAGRAMS_DIR"

# VERIFIED file names from Wikimedia Commons
DIAGRAMS=(
  # Cell Biology - Verified
  "chromosome-structure|File:Chromosome.svg"
  "cilia-9plus2|File:Eukaryotic_cilium_diagram_en.svg"
  "nucleotide-structure|File:Nucleotides.svg"

  # Biomolecules - Verified
  "amino-acid-general|File:AminoAcidball.svg"
  "protein-primary-secondary|File:Protein_structure.png"
  "enzyme-substrate|File:Induced_fit_diagram.svg"

  # Plant Anatomy - Verified
  "xylem-vessel|File:Tracheid_and_Vessel.svg"
  "leaf-cross-section|File:Leaf_Tissue_Structure.svg"
  "stomata-open-closed|File:Stoma.svg"
  "root-cross-section|File:Root-tip.svg"

  # Human Physiology - Verified
  "blood-cell-types|File:Blausen_0909_WhiteBloodCells.png"
  "heart-section|File:Heart_diagram-en.svg"
  "cardiac-conduction|File:Conductionsystemoftheheart.png"
  "ecg-complex|File:SinusRhythmLabels.svg"
  "alveolus-structure|File:Alveolus_diagram.svg"
  "nephron-detailed|File:Nephron_diagram.svg"
  "muscle-fiber|File:Skeletal_muscle.jpg"
  "sarcomere-detail|File:Sarcomere.svg"
  "reflex-arc|File:Afferent_and_efferent_neurons_en.svg"
  "action-potential-graph|File:Action_potential.svg"
  "synapse-detailed|File:Chemical_synapse_schema_cropped.jpg"
  "spinal-cord-cross|File:Spinal_cord_cross_section.svg"
  "cochlea-section|File:Cochlea-crosssection.svg"
  "human-skeleton-labeled|File:Human_skeleton_front_en.svg"
  "synovial-joint-detail|File:Joint.svg"
  "endocrine-system|File:Endocrine_English.svg"

  # Reproduction - Verified
  "male-reproductive-system|File:Male_anatomy_en.svg"
  "female-reproductive-system|File:Female_anatomy.svg"
  "sperm-detailed|File:Complete_diagram_of_a_human_spermatozoa_en.svg"
  "ovary-follicles|File:Gray1163.svg"
  "menstrual-hormones|File:MenstrualCycle2_en.svg"
  "blastocyst-structure|File:Blastocyst.svg"
  "placenta|File:Placenta.svg"
  "pollen-grain|File:Mature_pollen_grain.svg"
  "embryo-sac|File:Ovule-diagram.svg"
  "double-fertilisation|File:Angiosperm_life_cycle_diagram-en.svg"

  # Genetics - Verified
  "dna-replication-fork|File:DNA_replication_en.svg"
  "transcription-process|File:Simple_transcription_elongation1.svg"
  "translation-ribosome|File:Ribosome_mRNA_translation_en.svg"
  "trna-cloverleaf|File:TRNA-Phe_yeast_en.svg"
  "chromatin-packing|File:Chromatin_Structures.png"
  "karyotype|File:NHGRI_human_male_karyotype.png"
  "pedigree-chart|File:Pedigree-chart-example.svg"
  "monohybrid-punnet|File:Punnett_Square.svg"
  "dihybrid-cross|File:Dihybrid_cross.svg"
  "sex-chromosomes|File:X-Y_Sex_determination.svg"

  # Evolution - Verified
  "miller-urey-apparatus|File:Miller-Urey_experiment-en.svg"
  "homologous-limbs|File:Homology_vertebrates-en.svg"
  "human-evolution-skulls|File:Humanevolutionchart.png"
  "darwin-finches|File:Darwin%27s_finches_by_Gould.jpg"
  "natural-selection-types|File:Genetic_Distribution.svg"

  # Biotechnology - Verified
  "restriction-enzymes|File:Restriction_enzyme_BamHI.svg"
  "plasmid-vector|File:Plasmid_(english).svg"
  "pcr-steps|File:Polymerase_chain_reaction.svg"
  "gel-electrophoresis-results|File:Gel_electrophoresis_2.jpg"
  "bioreactor-design|File:Bioreactor_schematic.svg"
  "hiv-structure|File:HI-virus-structure.svg"
  "hiv-lifecycle|File:HIV-replication-cycle.svg"
  "antibody-structure|File:Antibody.svg"

  # Ecology - Verified
  "food-pyramid|File:Ecological_Pyramid.svg"
  "energy-pyramid|File:EcoPyramid.svg"
  "phosphorus-cycle|File:Phosphorus_cycle.svg"
  "population-growth-curves|File:Population_curve.svg"
  "age-pyramids|File:DTM_Pyramids.svg"
  "greenhouse-effect|File:The_greenhouse_effect.svg"
  "ozone-layer|File:Ozone_cycle.svg"

  # Plant Physiology - Verified
  "photosystem-diagram|File:Thylakoid_membrane_3.svg"
  "c4-pathway|File:Hatch-Slack_pathway.svg"
  "glycolysis-pathway|File:Glycolysis.svg"
  "krebs-cycle-detailed|File:Citric_acid_cycle_with_aconitate_2.svg"
  "electron-transport|File:Mitochondrial_electron_transport_chain—Etc4.svg"
  "chemiosmosis-atp|File:ATP_synthase.svg"

  # Microorganisms - Verified
  "plasmodium-lifecycle|File:Plasmodium_life_cycle_PHIL_3405.png"
  "virus-types|File:Virus_classification.svg"
  "amoeba-structure|File:Amoeba_(PSF).svg"
  "paramecium|File:Paramecium_diagram.svg"

  # Plant Kingdom - Verified
  "moss-life-cycle|File:Lifecycle_moss_svg_diagram.svg"
  "fern-life-cycle|File:Fern_life_cycle.svg"
  "alternation-generations|File:Alternation_of_generations.svg"
)

echo "=== Downloading Verified Wikimedia Diagrams ==="
echo "Total diagrams: ${#DIAGRAMS[@]}"
echo ""

downloaded=0
failed=0
skipped=0

for item in "${DIAGRAMS[@]}"; do
  IFS='|' read -r filename wiki_title <<< "$item"

  # Check if already exists
  for ext in svg png jpg jpeg; do
    if [ -f "$DIAGRAMS_DIR/${filename}.${ext}" ]; then
      echo "[SKIP] $filename already exists"
      ((skipped++))
      continue 2
    fi
  done

  echo "Fetching: $filename"

  # URL encode the title (handle special chars)
  encoded_title=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$wiki_title'))" 2>/dev/null || echo "$wiki_title" | sed 's/ /%20/g')

  api_url="https://commons.wikimedia.org/w/api.php?action=query&titles=${encoded_title}&prop=imageinfo&iiprop=url&format=json"

  response=$(curl -s "$api_url")
  image_url=$(echo "$response" | python3 -c "import sys, json; data=json.load(sys.stdin); pages=data.get('query',{}).get('pages',{}); print(next((p.get('imageinfo',[{}])[0].get('url','') for p in pages.values()), ''))" 2>/dev/null)

  if [ -z "$image_url" ]; then
    # Fallback: try grep method
    image_url=$(echo "$response" | grep -o '"url":"[^"]*"' | head -1 | sed 's/"url":"//;s/"$//')
  fi

  if [ -z "$image_url" ]; then
    echo "  [FAILED] Could not get URL"
    ((failed++))
    continue
  fi

  # Get extension from URL
  if [[ "$image_url" == *.svg ]]; then
    ext="svg"
  elif [[ "$image_url" == *.png ]]; then
    ext="png"
  elif [[ "$image_url" == *.jpg ]] || [[ "$image_url" == *.jpeg ]]; then
    ext="jpg"
  else
    ext="png"
  fi

  output_file="$DIAGRAMS_DIR/${filename}.${ext}"

  curl -s -L -o "$output_file" "$image_url"

  if [ -f "$output_file" ] && [ -s "$output_file" ]; then
    size=$(du -h "$output_file" | cut -f1)
    echo "  [OK] Saved: ${filename}.${ext} ($size)"
    ((downloaded++))
  else
    echo "  [FAILED] Download error"
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

total=$(ls -1 "$DIAGRAMS_DIR"/*.{svg,png,jpg} 2>/dev/null | wc -l)
echo "Total diagram files: $total"
