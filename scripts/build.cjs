const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '..');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  console.log('🚀 Starting clean build...');

  // 1. Sync index.source.html to index.html
  const indexPath = path.join(rootDir, 'index.html');
  const indexSourcePath = path.join(rootDir, 'index.source.html');
  if (fs.existsSync(indexSourcePath)) {
    fs.copyFileSync(indexSourcePath, indexPath);
    console.log('✓ Synced index.source.html -> index.html');
  }

  // 2. Run article validation
  console.log('🔍 Running article validation audit...');
  execSync('node scripts/validate_articles.cjs', { cwd: rootDir, stdio: 'inherit' });

  // 3. Run Vite build using local project binary
  console.log('⚡ Running Vite build...');
  const viteBin = path.join(rootDir, 'node_modules', '.bin', 'vite');
  if (fs.existsSync(viteBin)) {
    execSync(`"${viteBin}" build`, { cwd: rootDir, stdio: 'inherit' });
  } else {
    execSync('npx --no-install vite build || npx vite build', { cwd: rootDir, stdio: 'inherit' });
  }

  // 4. Copy compiled dist/index.html to root index.html
  const distIndexPath = path.join(rootDir, 'dist', 'index.html');
  if (fs.existsSync(distIndexPath)) {
    let htmlContent = fs.readFileSync(distIndexPath, 'utf8');
    const versionStamp = Math.floor(Date.now() / 1000);
    htmlContent = htmlContent
      .replace(/\.js"/g, `.js?v=${versionStamp}"`)
      .replace(/\.css"/g, `.css?v=${versionStamp}"`);
    fs.writeFileSync(indexPath, htmlContent, 'utf8');
    console.log(`✓ Updated root index.html with cache-buster ?v=${versionStamp}`);
  }

  // 5. Copy dist/assets/* to root assets/
  const distAssetsPath = path.join(rootDir, 'dist', 'assets');
  const rootAssetsPath = path.join(rootDir, 'assets');
  if (fs.existsSync(distAssetsPath)) {
    if (!fs.existsSync(rootAssetsPath)) {
      fs.mkdirSync(rootAssetsPath, { recursive: true });
    }
    copyRecursiveSync(distAssetsPath, rootAssetsPath);
    console.log('✓ Synced dist/assets -> root assets/');
  }

  console.log('========================================');
  console.log('🎉 BUILD SUCCESSFUL & READY FOR HOSTINGER!');
  console.log('========================================');

  process.exit(0);
} catch (error) {
  console.error('❌ Build failed with error:', error.message);
  process.exit(1);
}
