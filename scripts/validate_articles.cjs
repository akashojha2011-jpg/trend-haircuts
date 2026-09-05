const fs = require('fs');
const path = require('path');

// Read articles.js content and parse
const articlesPath = path.join(__dirname, '..', 'src', 'data', 'articles.js');
const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(articlesPath)) {
  console.error(`❌ Error: ${articlesPath} does not exist!`);
  process.exit(1);
}

// Extract array using Regex / Function evaluation
const fileContent = fs.readFileSync(articlesPath, 'utf8');

// Convert ES module export to CommonJS module.exports
let articles;
try {
  const cjsCode = fileContent.replace('export const articles =', 'module.exports =');
  const tempFilePath = path.join(__dirname, '_temp_articles.cjs');
  fs.writeFileSync(tempFilePath, cjsCode);
  articles = require(tempFilePath);
  fs.unlinkSync(tempFilePath);
} catch (err) {
  console.error('❌ Failed to parse articles.js:', err.message);
  process.exit(1);
}

console.log(`🔍 Auditing ${articles.length} articles for image-content integrity...\n`);

let totalErrors = 0;
let totalWarnings = 0;

articles.forEach((article, index) => {
  const articleId = article.id || article.slug || `Article #${index + 1}`;
  const title = article.title || 'Untitled';
  const items = article.items || [];

  // Check 1: Title Numbering Alignment
  const titleMatch = title.match(/(\d+)\+/);
  if (titleMatch) {
    const expectedCount = parseInt(titleMatch[1], 10);
    if (items.length < expectedCount) {
      console.warn(`⚠️ [${articleId}] Title specifies ${expectedCount}+ items ("${title}"), but article contains ${items.length} items. Preserving exact user doc title.`);
      totalWarnings++;
    }
  }

  // Check 2: Cover Collage / Hero Image Existence
  if (article.heroImage) {
    const heroPath = path.join(publicDir, article.heroImage.replace(/^\//, ''));
    if (!fs.existsSync(heroPath)) {
      console.error(`❌ [${articleId}] Hero image missing on disk: ${article.heroImage}`);
      totalErrors++;
    }
  } else {
    console.warn(`⚠️ [${articleId}] Missing heroImage field`);
    totalWarnings++;
  }

  // Check 3: Item Integrity & 1:1 Image-Content Binding
  const seenImages = new Set();
  
  items.forEach((item, itemIdx) => {
    const itemNum = itemIdx + 1;
    const itemTitle = item.title || `Item #${itemNum}`;
    
    // 3a. Check if image is missing or empty
    if (!item.image || typeof item.image !== 'string' || item.image.trim() === '') {
      console.error(`❌ [${articleId}] Item ${itemNum} ("${itemTitle}") has NO image assigned!`);
      totalErrors++;
      return;
    }

    // 3b. Check if image physically exists on disk
    const imageDiskPath = path.join(publicDir, item.image.replace(/^\//, ''));
    if (!fs.existsSync(imageDiskPath)) {
      console.error(`❌ [${articleId}] Item ${itemNum} image does NOT exist on disk: ${item.image}`);
      totalErrors++;
    }

    // 3c. Check for duplicate image assignment within same article (indicates copy-paste/shuffling error)
    if (seenImages.has(item.image)) {
      console.error(`❌ [${articleId}] Image DUPLICATED across items (swapped/interchanged): ${item.image}`);
      totalErrors++;
    } else {
      seenImages.add(item.image);
    }

    // 3d. Check text content existence (either description or paragraphs)
    const textContent = item.description || (Array.isArray(item.paragraphs) ? item.paragraphs.join(' ') : '');
    if (!textContent || textContent.trim() === '') {
      console.error(`❌ [${articleId}] Item ${itemNum} ("${itemTitle}") has EMPTY description and paragraphs!`);
      totalErrors++;
    }
  });
});

console.log('\n========================================');
console.log(`📊 Audit Summary:`);
console.log(`   Articles Inspected: ${articles.length}`);
console.log(`   Errors Found:       ${totalErrors}`);
console.log(`   Warnings Found:     ${totalWarnings}`);
console.log('========================================\n');

if (totalErrors > 0) {
  console.error('❌ Validation FAILED: Content-image interchange or integrity issues detected!');
  process.exit(1);
} else {
  console.log('✅ Validation PASSED: All articles maintain strict 1:1 image-content pairing and integrity!');
  process.exit(0);
}
