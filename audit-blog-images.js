const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content/blog');
const publicDir = path.join(__dirname, 'public/blog');

const results = {
  total: 0,
  validImages: [],
  placeholders: [],
  missingImages: [],
  nonSVG: [],
  allBlogData: []
};

// Get all MDX files
const mdxFiles = fs.readdirSync(contentDir)
  .filter(file => file.endsWith('.mdx'))
  .sort();

console.log(`Found ${mdxFiles.length} MDX files\n`);

mdxFiles.forEach((file) => {
  const filePath = path.join(contentDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract featuredImage from frontmatter
  const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.log(`⚠️  No frontmatter in ${file}`);
    return;
  }

  const frontmatter = frontmatterMatch[1];
  const imageMatch = frontmatter.match(/featuredImage:\s*["']?([^"'\n]+)["']?/);

  if (!imageMatch) {
    console.log(`⚠️  No featuredImage in ${file}`);
    results.missingImages.push({
      file,
      reason: 'No featuredImage field in frontmatter',
      imagePath: null
    });
    return;
  }

  results.total++;
  const imagePath = imageMatch[1].trim();

  // Remove leading slash and 'blog/' prefix to get filename
  const imageFileName = imagePath.replace(/^\//, '').replace(/^blog\//, '');
  const fullImagePath = path.join(publicDir, imageFileName);

  const blogData = {
    mdxFile: file,
    imagePath,
    imageFileName,
    exists: false,
    isPlaceholder: false,
    isSVG: false
  };

  // Check for placeholders
  if (imagePath.includes('placeholder.webp') || imagePath.includes('placeholder.jpg') || imagePath.includes('placeholder.png')) {
    blogData.isPlaceholder = true;
    results.placeholders.push({
      file,
      imagePath,
      imageFileName
    });
  }
  // Check if file exists
  else if (!fs.existsSync(fullImagePath)) {
    results.missingImages.push({
      file,
      imagePath,
      imageFileName,
      reason: 'File does not exist'
    });
  }
  // Check format
  else {
    blogData.exists = true;
    const ext = path.extname(imagePath).toLowerCase();
    blogData.isSVG = ext === '.svg';

    if (ext === '.svg') {
      results.validImages.push({
        file,
        imagePath,
        imageFileName
      });
    } else {
      results.nonSVG.push({
        file,
        imagePath,
        imageFileName,
        extension: ext
      });
    }
  }

  results.allBlogData.push(blogData);
});

// Generate Report
console.log('\n' + '='.repeat(80));
console.log('BLOG IMAGE AUDIT REPORT');
console.log('='.repeat(80) + '\n');

console.log('📊 SUMMARY:');
console.log(`   Total blogs: ${mdxFiles.length}`);
console.log(`   Blogs with featuredImage field: ${results.total}`);
console.log(`   Blogs with valid SVG images: ${results.validImages.length}`);
console.log(`   Blogs with placeholders: ${results.placeholders.length}`);
console.log(`   Blogs with missing images: ${results.missingImages.length}`);
console.log(`   Blogs with non-SVG formats: ${results.nonSVG.length}`);
console.log(`   Blogs needing image creation: ${results.placeholders.length + results.missingImages.length + results.nonSVG.length}`);

console.log('\n' + '='.repeat(80));
console.log('🚨 CRITICAL ISSUES:');
console.log('='.repeat(80) + '\n');

if (results.placeholders.length > 0) {
  console.log(`\n1. PLACEHOLDER IMAGES (${results.placeholders.length}):`);
  console.log('   These blogs are using placeholder images:\n');
  results.placeholders.forEach(({ file, imagePath }) => {
    console.log(`   ❌ ${file}`);
    console.log(`      Image: ${imagePath}\n`);
  });
}

if (results.missingImages.length > 0) {
  console.log(`\n2. MISSING IMAGES (${results.missingImages.length}):`);
  console.log('   These blogs reference images that don\'t exist:\n');
  results.missingImages.forEach(({ file, imagePath, reason }) => {
    console.log(`   ❌ ${file}`);
    console.log(`      Expected: ${imagePath}`);
    console.log(`      Reason: ${reason}\n`);
  });
}

if (results.nonSVG.length > 0) {
  console.log(`\n3. NON-SVG FORMATS (${results.nonSVG.length}):`);
  console.log('   These blogs use JPG/PNG instead of SVG:\n');
  results.nonSVG.forEach(({ file, imagePath, extension }) => {
    console.log(`   ⚠️  ${file}`);
    console.log(`      Image: ${imagePath} (${extension})\n`);
  });
}

console.log('\n' + '='.repeat(80));
console.log('📋 PRIORITY LIST:');
console.log('='.repeat(80) + '\n');

console.log('PRIORITY 1 - MISSING IMAGES (BROKEN):');
if (results.missingImages.length > 0) {
  results.missingImages.forEach(({ file, imageFileName }, i) => {
    const suggestedName = file.replace('.mdx', '.svg');
    console.log(`${i + 1}. ${file}`);
    console.log(`   Missing: ${imageFileName}`);
    console.log(`   Suggested: ${suggestedName}\n`);
  });
} else {
  console.log('   ✅ None!\n');
}

console.log('\nPRIORITY 2 - PLACEHOLDER IMAGES:');
if (results.placeholders.length > 0) {
  results.placeholders.forEach(({ file, imagePath }, i) => {
    const suggestedName = file.replace('.mdx', '.svg');
    console.log(`${i + 1}. ${file}`);
    console.log(`   Current: ${imagePath}`);
    console.log(`   Suggested: ${suggestedName}\n`);
  });
} else {
  console.log('   ✅ None!\n');
}

console.log('\nPRIORITY 3 - NON-SVG FORMATS:');
if (results.nonSVG.length > 0) {
  results.nonSVG.forEach(({ file, imagePath, extension }, i) => {
    const suggestedName = file.replace('.mdx', '.svg');
    console.log(`${i + 1}. ${file}`);
    console.log(`   Current: ${imagePath} (${extension})`);
    console.log(`   Suggested: ${suggestedName}\n`);
  });
} else {
  console.log('   ✅ None!\n');
}

// Save detailed JSON report
const reportPath = path.join(__dirname, 'blog-image-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(`\n📄 Detailed JSON report saved to: ${reportPath}\n`);

// Save CSV for easy spreadsheet import
const csvPath = path.join(__dirname, 'blog-image-audit-report.csv');
let csv = 'MDX File,Image Path,Exists,Is Placeholder,Is SVG,Status\n';
results.allBlogData.forEach((data) => {
  let status = 'OK';
  if (data.isPlaceholder) status = 'PLACEHOLDER';
  else if (!data.exists) status = 'MISSING';
  else if (!data.isSVG) status = 'NON-SVG';

  csv += `"${data.mdxFile}","${data.imagePath}",${data.exists},${data.isPlaceholder},${data.isSVG},"${status}"\n`;
});
fs.writeFileSync(csvPath, csv);
console.log(`📊 CSV report saved to: ${csvPath}\n`);

console.log('='.repeat(80));
