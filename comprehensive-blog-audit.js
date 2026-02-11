const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(process.cwd(), 'content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));

const issues = {
  critical: [],
  high: [],
  medium: [],
  low: [],
  suggestions: []
};

let totalScore = 0;
const blogScores = [];

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content: body } = matter(content);
  
  let score = 100;
  const blogIssues = [];
  
  // 1. METADATA COMPLETENESS (10 points)
  const requiredFields = ['title', 'excerpt', 'author', 'category', 'tags', 'featuredImage', 'publishedAt', 'readTime', 'seoTitle', 'seoDescription'];
  requiredFields.forEach(field => {
    if (!frontmatter[field]) {
      score -= 1;
      blogIssues.push(`Missing ${field}`);
      issues.critical.push(`${file}: Missing required field '${field}'`);
    }
  });
  
  // 2. SEO OPTIMIZATION (15 points)
  if (frontmatter.seoTitle) {
    const titleLen = frontmatter.seoTitle.length;
    if (titleLen < 50 || titleLen > 60) {
      score -= 3;
      blogIssues.push(`SEO title length: ${titleLen} (should be 55-60)`);
      issues.high.push(`${file}: SEO title ${titleLen} chars (target: 55-60)`);
    }
  }
  
  if (frontmatter.seoDescription) {
    const descLen = frontmatter.seoDescription.length;
    if (descLen < 150 || descLen > 160) {
      score -= 3;
      blogIssues.push(`SEO desc length: ${descLen} (should be 155-160)`);
      issues.high.push(`${file}: SEO description ${descLen} chars (target: 155-160)`);
    }
  }
  
  // 3. AUTHOR STANDARDIZATION (5 points)
  if (frontmatter.author?.name !== 'Dr. Shekhar') {
    score -= 2;
    blogIssues.push('Author name not standardized');
    issues.medium.push(`${file}: Author name should be 'Dr. Shekhar'`);
  }
  if (frontmatter.author?.role !== 'Founder & Senior Faculty') {
    score -= 1;
    blogIssues.push('Author role not standardized');
    issues.medium.push(`${file}: Author role should be 'Founder & Senior Faculty'`);
  }
  
  // 4. DATE ACCURACY (10 points)
  if (frontmatter.publishedAt) {
    if (!frontmatter.publishedAt.startsWith('2026')) {
      score -= 5;
      blogIssues.push('Published date not 2026');
      issues.high.push(`${file}: Published date is ${frontmatter.publishedAt} (should be 2026)`);
    }
  }
  
  // 5. CONTENT QUALITY CHECKS (20 points)
  const aiSignatures = [
    'As an AI', 'I am an AI', 'language model', 'I cannot', 'I can help',
    'ChatGPT', 'Claude', 'GPT-4', 'AI assistant'
  ];
  
  aiSignatures.forEach(sig => {
    if (body.includes(sig)) {
      score -= 5;
      blogIssues.push(`AI signature found: "${sig}"`);
      issues.critical.push(`${file}: Contains AI signature "${sig}"`);
    }
  });
  
  // Placeholder content
  const placeholders = ['Lorem ipsum', 'TODO', 'placeholder', '[Insert', 'XXXX', 'TBD'];
  placeholders.forEach(ph => {
    if (body.toLowerCase().includes(ph.toLowerCase())) {
      score -= 3;
      blogIssues.push(`Placeholder found: "${ph}"`);
      issues.high.push(`${file}: Contains placeholder "${ph}"`);
    }
  });
  
  // 6. CONTENT DEPTH (10 points)
  const wordCount = body.split(/\s+/).length;
  if (wordCount < 1500) {
    score -= 3;
    blogIssues.push(`Low word count: ${wordCount}`);
    issues.medium.push(`${file}: Word count ${wordCount} (target: 1500+ for depth)`);
  } else if (wordCount < 1000) {
    score -= 5;
    blogIssues.push(`Very low word count: ${wordCount}`);
    issues.high.push(`${file}: Word count ${wordCount} (minimum: 1000)`);
  }
  
  // 7. STRUCTURE & FORMATTING (10 points)
  const hasH1 = body.includes('# ');
  const hasH2 = body.includes('## ');
  if (!hasH1 || !hasH2) {
    score -= 2;
    blogIssues.push('Missing proper heading structure');
    issues.medium.push(`${file}: Missing heading structure (needs H1 and H2)`);
  }
  
  // 8. IMAGE OPTIMIZATION (5 points)
  if (frontmatter.featuredImage === '/blog/placeholder.webp') {
    score -= 5;
    blogIssues.push('Using placeholder image');
    issues.critical.push(`${file}: Still using placeholder.webp`);
  } else if (frontmatter.featuredImage && !frontmatter.featuredImage.endsWith('.svg')) {
    score -= 1;
    blogIssues.push('Image not SVG format');
    issues.low.push(`${file}: Featured image not SVG (${frontmatter.featuredImage})`);
  }
  
  // 9. DATA ACCURACY - Check for outdated references (10 points)
  const outdatedPatterns = [
    { pattern: /NEET 2024/g, issue: 'References NEET 2024 instead of 2025/2026' },
    { pattern: /2023 cutoff/g, issue: 'References 2023 cutoff' },
    { pattern: /last year/gi, issue: 'Vague "last year" reference' }
  ];
  
  outdatedPatterns.forEach(({ pattern, issue }) => {
    const matches = body.match(pattern);
    if (matches && matches.length > 3) {
      score -= 2;
      blogIssues.push(issue);
      issues.medium.push(`${file}: ${issue} (${matches.length} occurrences)`);
    }
  });
  
  // 10. ENGAGEMENT & VALUE (5 points)
  const hasCallToAction = body.toLowerCase().includes('book') || 
                          body.toLowerCase().includes('join') ||
                          body.toLowerCase().includes('consultation');
  if (!hasCallToAction) {
    score -= 2;
    blogIssues.push('No clear call-to-action');
    issues.suggestions.push(`${file}: Consider adding CTA (book consultation, join course, etc.)`);
  }
  
  blogScores.push({
    file,
    score: Math.max(0, score),
    issues: blogIssues
  });
  
  totalScore += Math.max(0, score);
});

// Generate report
const avgScore = (totalScore / files.length).toFixed(1);

console.log('\n=== COMPREHENSIVE BLOG AUDIT REPORT ===\n');
console.log(`Total Blogs: ${files.length}`);
console.log(`Average Score: ${avgScore}/100\n`);

console.log(`Critical Issues: ${issues.critical.length}`);
console.log(`High Priority: ${issues.high.length}`);
console.log(`Medium Priority: ${issues.medium.length}`);
console.log(`Low Priority: ${issues.low.length}`);
console.log(`Suggestions: ${issues.suggestions.length}\n`);

// Show distribution
const excellent = blogScores.filter(b => b.score >= 90).length;
const good = blogScores.filter(b => b.score >= 80 && b.score < 90).length;
const needsWork = blogScores.filter(b => b.score >= 70 && b.score < 80).length;
const poor = blogScores.filter(b => b.score < 70).length;

console.log('Score Distribution:');
console.log(`  90-100 (Excellent): ${excellent}`);
console.log(`  80-89 (Good): ${good}`);
console.log(`  70-79 (Needs Work): ${needsWork}`);
console.log(`  <70 (Poor): ${poor}\n`);

// Top 10 worst scores
console.log('Bottom 10 Blogs (Lowest Scores):');
blogScores.sort((a, b) => a.score - b.score)
  .slice(0, 10)
  .forEach((blog, i) => {
    console.log(`  ${i+1}. ${blog.file}: ${blog.score}/100`);
    blog.issues.slice(0, 3).forEach(issue => console.log(`     - ${issue}`));
  });

// Save detailed report
const detailedReport = {
  summary: {
    totalBlogs: files.length,
    averageScore: avgScore,
    distribution: { excellent, good, needsWork, poor }
  },
  issues,
  blogScores: blogScores.sort((a, b) => a.score - b.score)
};

fs.writeFileSync('COMPREHENSIVE_BLOG_AUDIT.json', JSON.stringify(detailedReport, null, 2));
console.log('\n✅ Detailed report saved to COMPREHENSIVE_BLOG_AUDIT.json');
