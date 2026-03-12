const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '../public/articles/seasons');
const IMAGES_DIR = path.join(__dirname, '../public/images/seasons');

// Map of original extensions to webp
const imageReplacements = [
  // 2021
  { from: '2021春季篇.jpg', to: '2021春季篇.webp' },
  { from: '2021夏季篇.JPG', to: '2021夏季篇.webp' },
  { from: '2021冬季篇.jpg', to: '2021冬季篇.webp' },
  // 2022
  { from: '2022冬季篇.jpg', to: '2022冬季篇.webp' },
  { from: '2022夏季篇-1.JPG', to: '2022夏季篇-1.webp' },
  { from: '2022夏季篇-2.jpg', to: '2022夏季篇-2.webp' },
  { from: '2022秋季篇.jpg', to: '2022秋季篇.webp' },
  // 2023
  { from: '2023冬季篇.jpg', to: '2023冬季篇.webp' },
  { from: '2023夏季篇.jpg', to: '2023夏季篇.webp' },
  { from: '2023春季篇.jpg', to: '2023春季篇.webp' },
  { from: '2023秋季篇.jpg', to: '2023秋季篇.webp' },
  // 2024
  { from: '2024冬季篇.png', to: '2024冬季篇.webp' },
  { from: '2024夏季篇.png', to: '2024夏季篇.webp' },
  { from: '2024春季篇.png', to: '2024春季篇.webp' },
  { from: '2024秋季篇.png', to: '2024秋季篇.webp' },
  // 2025
  { from: '2025夏季篇.jpg', to: '2025夏季篇.webp' },
  { from: '2025春季篇.PNG', to: '2025春季篇.webp' },
  { from: '2025春季篇.png', to: '2025春季篇.webp' },
  // 2026
  { from: '2026秋季篇1.png', to: '2026秋季篇1.webp' },
  { from: '2026秋季篇2.png', to: '2026秋季篇2.webp' },
];

function updateMarkdownFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const fileName = path.basename(filePath);

  for (const { from, to } of imageReplacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      console.log(`  Updated: ${from} → ${to}`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Saved: ${fileName}\n`);
  } else {
    console.log(`- No changes needed: ${fileName}\n`);
  }

  return modified;
}

function main() {
  console.log('Updating image references in markdown files...\n');
  console.log('='.repeat(60) + '\n');

  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));
  let updatedCount = 0;

  for (const file of files) {
    const filePath = path.join(ARTICLES_DIR, file);
    console.log(`Processing: ${file}`);
    if (updateMarkdownFile(filePath)) {
      updatedCount++;
    }
  }

  console.log('='.repeat(60));
  console.log(`\nDone! Updated ${updatedCount} files.`);
}

main();
