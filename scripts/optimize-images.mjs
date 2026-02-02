import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'public/images/activite';
const outputDir = 'public/images/activite';

const images = [
  { name: 'hero.jpg', output: 'hero.webp' },
  { name: 'vision.jpg', output: 'vision.webp' },
];

async function optimize() {
  for (const img of images) {
    const inputPath = path.join(inputDir, img.name);
    const outputPath = path.join(outputDir, img.output);

    console.log(`Optimizing ${img.name}...`);

    await sharp(inputPath)
      .resize(1200) // Resize to a reasonable max width
      .webp({ quality: 80 }) // Convert to WebP with 80% quality
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`Finished ${img.output}: ${(stats.size / 1024).toFixed(2)} KB`);
  }
}

optimize().catch(console.error);
