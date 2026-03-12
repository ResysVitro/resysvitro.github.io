const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const MAX_SIZE_BYTES = 1024 * 1024; // 1MB
const TARGET_WIDTH = 1920; // Max width for web images

async function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

async function findAllImages(dir, images = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await findAllImages(filePath, images);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      images.push(filePath);
    }
  }

  return images;
}

async function compressImage(inputPath) {
  const fileSize = await getFileSizeInBytes(inputPath);
  const relativePath = path.relative(IMAGES_DIR, inputPath);

  // Skip if already under 1MB
  if (fileSize <= MAX_SIZE_BYTES) {
    console.log(`✓ SKIP (already small): ${relativePath} (${(fileSize / 1024 / 1024).toFixed(2)}MB)`);
    return null;
  }

  console.log(`Processing: ${relativePath} (${(fileSize / 1024 / 1024).toFixed(2)}MB)`);

  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const baseName = path.basename(inputPath, ext);
  const outputPath = path.join(dir, `${baseName}.webp`);

  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();

    // Calculate new dimensions (maintain aspect ratio, max width 1920)
    let width = metadata.width;
    let height = metadata.height;

    if (width > TARGET_WIDTH) {
      height = Math.round((TARGET_WIDTH / width) * height);
      width = TARGET_WIDTH;
    }

    // Start with quality 85 and reduce if needed
    let quality = 85;
    let outputSize = Infinity;

    while (quality >= 30 && outputSize > MAX_SIZE_BYTES) {
      await sharp(inputPath)
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality })
        .toFile(outputPath);

      outputSize = await getFileSizeInBytes(outputPath);

      if (outputSize > MAX_SIZE_BYTES) {
        quality -= 10;
      }
    }

    // If still too large, reduce dimensions further
    if (outputSize > MAX_SIZE_BYTES) {
      width = Math.round(width * 0.7);
      height = Math.round(height * 0.7);

      await sharp(inputPath)
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(outputPath);

      outputSize = await getFileSizeInBytes(outputPath);
    }

    const savedMB = ((fileSize - outputSize) / 1024 / 1024).toFixed(2);
    console.log(`  → Compressed to: ${baseName}.webp (${(outputSize / 1024 / 1024).toFixed(2)}MB, saved ${savedMB}MB)`);

    // Delete original file if webp was created successfully
    if (outputPath !== inputPath && fs.existsSync(outputPath)) {
      fs.unlinkSync(inputPath);
      console.log(`  → Deleted original: ${path.basename(inputPath)}`);
    }

    return {
      original: inputPath,
      compressed: outputPath,
      originalSize: fileSize,
      compressedSize: outputSize
    };
  } catch (error) {
    console.error(`  ✗ Error processing ${relativePath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Finding all images...\n');
  const images = await findAllImages(IMAGES_DIR);

  console.log(`Found ${images.length} images\n`);
  console.log('='.repeat(60));

  const results = [];
  let totalSaved = 0;

  for (const imagePath of images) {
    const result = await compressImage(imagePath);
    if (result) {
      results.push(result);
      totalSaved += result.originalSize - result.compressedSize;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\nCompression complete!`);
  console.log(`Processed: ${results.length} images`);
  console.log(`Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
}

main().catch(console.error);
